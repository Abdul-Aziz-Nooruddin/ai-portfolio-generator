import { useEffect, useRef, useState, useCallback } from 'react';
import MP4Box, { MP4Sample } from 'mp4box';

interface FrameBankItem {
  ts: number; // in microseconds
  blob: Blob;
}

interface VideoScrubOptions {
  videoSrc: string;
}

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000; // 60s

export function useVideoScrub({ videoSrc }: VideoScrubOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Mutable state refs across animation frames
  const bankRef = useRef<FrameBankItem[]>([]);
  const lruRef = useRef<Map<number, ImageBitmap>>(new Map());
  const loadingLruRef = useRef<Set<number>>(new Set());
  const durationRef = useRef(0);
  const currentTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isReadyRef = useRef(false);
  const revertedRef = useRef(false);
  const paintedFirstRef = useRef(false);
  const buildingRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // Binary search for nearest frame index based on timestamp in microseconds
  const findNearestFrameIndex = useCallback((targetUs: number): number => {
    const bank = bankRef.current;
    if (bank.length === 0) return -1;
    if (targetUs <= bank[0].ts) return 0;
    if (targetUs >= bank[bank.length - 1].ts) return bank.length - 1;

    let low = 0;
    let high = bank.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      const midTs = bank[mid].ts;

      if (midTs === targetUs) return mid;
      if (midTs < targetUs) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Compare distance of low and high
    if (low >= bank.length) return bank.length - 1;
    if (high < 0) return 0;

    const diffLow = Math.abs(bank[low].ts - targetUs);
    const diffHigh = Math.abs(bank[high].ts - targetUs);
    return diffLow < diffHigh ? low : high;
  }, []);

  // Warm LRU cache around nearest frame index
  const warmLRU = useCallback((centerIdx: number) => {
    const bank = bankRef.current;
    const lru = lruRef.current;
    const loading = loadingLruRef.current;

    for (let offset = -1; offset <= 2; offset++) {
      const idx = centerIdx + offset;
      if (idx >= 0 && idx < bank.length && !lru.has(idx) && !loading.has(idx)) {
        loading.add(idx);
        createImageBitmap(bank[idx].blob)
          .then((bitmap) => {
            loading.delete(idx);
            lru.set(idx, bitmap);
            // Evict oldest if exceeding LRU_MAX
            if (lru.size > LRU_MAX) {
              const oldestKey = lru.keys().next().value;
              if (oldestKey !== undefined) {
                const oldBitmap = lru.get(oldestKey);
                oldBitmap?.close();
                lru.delete(oldestKey);
              }
            }
          })
          .catch(() => {
            loading.delete(idx);
          });
      }
    }
  }, []);

  // Compute scroll progress clamp(0, 1, scrollY / (offsetHeight - innerHeight))
  const getProgress = useCallback((): number => {
    if (!containerRef.current) return 0;
    const scrollSpan = containerRef.current.offsetHeight - window.innerHeight;
    if (scrollSpan <= 0) return 0;
    const p = window.scrollY / scrollSpan;
    return Math.max(0, Math.min(1, p));
  }, []);

  // Frame bank builder using WebCodecs and MP4Box
  const buildFrameBank = useCallback(async () => {
    if (buildingRef.current || revertedRef.current) return;
    buildingRef.current = true;

    // Check reduced motion or missing VideoDecoder / OffscreenCanvas
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof window.VideoDecoder === 'undefined' || typeof window.OffscreenCanvas === 'undefined') {
      revertedRef.current = true;
      return;
    }

    const runDecoder = async (hardwarePref: HardwareAcceleration): Promise<boolean> => {
      try {
        const response = await fetch(videoSrc, { mode: 'cors' });
        if (!response.ok) throw new Error('Video fetch failed: ' + response.statusText);
        const arrayBuffer = await response.arrayBuffer();

        return new Promise<boolean>((resolve) => {
          let decoder: VideoDecoder | null = null;
          let samplesQueue: MP4Sample[] = [];
          let isExtracting = false;
          let inFlightConversions = 0;
          let trackId = -1;
          let durationSec = 0;

          const mp4file = MP4Box.createFile();

          const processQueue = () => {
            if (!decoder || decoder.state !== 'configured') return;
            while (samplesQueue.length > 0 && inFlightConversions < LEAD) {
              const sample = samplesQueue.shift()!;
              inFlightConversions++;
              try {
                const chunk = new EncodedVideoChunk({
                  type: sample.is_sync ? 'key' : 'delta',
                  timestamp: (1e6 * sample.cts) / sample.timescale,
                  duration: (1e6 * sample.duration) / sample.timescale,
                  data: sample.data,
                });
                decoder.decode(chunk);
              } catch (e) {
                console.warn('[VideoScrub] Decode chunk error:', e);
                inFlightConversions--;
              }
            }
          };

          const handleFrame = async (frame: VideoFrame) => {
            try {
              const ts = frame.timestamp;
              const offCanvas = new OffscreenCanvas(frame.displayWidth, frame.displayHeight);
              const offCtx = offCanvas.getContext('2d');
              offCtx?.drawImage(frame, 0, 0);
              frame.close();

              const blob = await offCanvas.convertToBlob({ type: 'image/webp', quality: 0.82 });
              bankRef.current.push({ ts, blob });
            } catch (err) {
              console.warn('[VideoScrub] Frame toBlob error:', err);
              frame.close();
            } finally {
              inFlightConversions--;
              processQueue();
            }
          };

          const handleDecodeError = (e: any) => {
            console.warn('[VideoScrub] Decoder error:', e);
            if (decoder) {
              try { decoder.close(); } catch {}
              decoder = null;
            }
            resolve(false);
          };

          decoder = new VideoDecoder({
            output: handleFrame,
            error: handleDecodeError,
          });

          mp4file.onReady = (info) => {
            const videoTrack = info.videoTracks[0];
            if (!videoTrack) {
              resolve(false);
              return;
            }

            trackId = videoTrack.id;
            durationSec = info.duration / info.timescale;
            if (durationSec > 0 && durationRef.current === 0) {
              durationRef.current = durationSec;
            }

            // Extract decoder config description
            let description: Uint8Array | undefined;
            try {
              const trak = mp4file.getTrackById(trackId);
              if (trak?.mdia?.minf?.stbl?.stsd?.entries) {
                for (const entry of trak.mdia.minf.stbl.stsd.entries) {
                  const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
                  if (box) {
                    const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
                    box.write(stream);
                    description = new Uint8Array(stream.buffer, 8);
                    break;
                  }
                }
              }
            } catch (err) {
              console.warn('[VideoScrub] Description parse error:', err);
            }

            try {
              decoder?.configure({
                codec: videoTrack.codec,
                description,
                hardwareAcceleration: hardwarePref,
              });
            } catch (err) {
              console.warn('[VideoScrub] Decoder configure error:', err);
              resolve(false);
              return;
            }

            mp4file.setExtractionOptions(trackId, null, { nbSamples: 1000 });
            mp4file.start();
            isExtracting = true;
          };

          mp4file.onSamples = (_id, _user, samples) => {
            samplesQueue.push(...samples);
            processQueue();
          };

          mp4file.onError = (e) => {
            console.warn('[VideoScrub] MP4Box error:', e);
            resolve(false);
          };

          // Append array buffer to MP4Box
          (arrayBuffer as any).fileStart = 0;
          mp4file.appendBuffer(arrayBuffer);
          mp4file.flush();

          // Wait until queue drains and decoder flushes
          const checkCompletion = setInterval(async () => {
            if (isExtracting && samplesQueue.length === 0 && inFlightConversions === 0) {
              clearInterval(checkCompletion);
              try {
                if (decoder && decoder.state === 'configured') {
                  await decoder.flush();
                  decoder.close();
                }
              } catch {}

              // Sort frame bank by timestamp
              bankRef.current.sort((a, b) => a.ts - b.ts);
              if (bankRef.current.length > 0) {
                isReadyRef.current = true;
                setIsReady(true);
                resolve(true);
              } else {
                resolve(false);
              }
            }
          }, 200);
        });
      } catch (e) {
        console.warn('[VideoScrub] runDecoder exception:', e);
        return false;
      }
    };

    // Try hardware acceleration first
    const successHardware = await runDecoder('prefer-hardware');
    if (!successHardware && !revertedRef.current) {
      console.log('[VideoScrub] Retrying decode with software fallback...');
      bankRef.current = [];
      const successSoftware = await runDecoder('prefer-software');
      if (!successSoftware) {
        revertedRef.current = true;
      }
    }
  }, [videoSrc]);

  // Watchdog timer (60s): revert to video seeking fallback if frame bank not ready
  useEffect(() => {
    const watchdogTimer = setTimeout(() => {
      if (!isReadyRef.current) {
        console.warn('[VideoScrub] 60s watchdog triggered; reverting to video fallback');
        revertedRef.current = true;
        setCanvasLive(false);
      }
    }, WATCHDOG);

    return () => clearTimeout(watchdogTimer);
  }, []);

  // Build frame bank on window load
  useEffect(() => {
    if (document.readyState === 'complete') {
      buildFrameBank();
    } else {
      const handleLoad = () => buildFrameBank();
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [buildFrameBank]);

  // Metadata listener on video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    if (video.readyState >= 1 && video.duration) {
      durationRef.current = video.duration;
    }

    return () => video.removeEventListener('loadedmetadata', onLoadedMetadata);
  }, []);

  // Main rAF loop
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const deltaSeconds = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      const dt = Math.min(0.1, deltaSeconds);
      const p = getProgress();
      setScrollProgress(p);

      const dur = durationRef.current;
      if (dur > 0) {
        const target = p * dur;
        targetTimeRef.current = target;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          currentTimeRef.current = target;
        } else {
          currentTimeRef.current += (target - currentTimeRef.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(target - currentTimeRef.current) < SNAP) {
            currentTimeRef.current = target;
          }
        }

        const currentSec = currentTimeRef.current;

        // If frame bank is ready, draw nearest frame to canvas
        if (isReadyRef.current && !revertedRef.current && bankRef.current.length > 0) {
          const nearestIdx = findNearestFrameIndex(currentSec * 1e6);
          if (nearestIdx >= 0) {
            warmLRU(nearestIdx);
            const bitmap = lruRef.current.get(nearestIdx);
            const canvas = canvasRef.current;
            if (canvas && bitmap) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
                if (!paintedFirstRef.current) {
                  paintedFirstRef.current = true;
                  setCanvasLive(true);
                }
              }
            }
          }
        } else {
          // Video seeking fallback
          const video = videoRef.current;
          if (video && !video.seeking && Math.abs(video.currentTime - currentSec) > 0.01) {
            video.currentTime = currentSec;
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [getProgress, findNearestFrameIndex, warmLRU]);

  // Window resize & orientation change handler
  useEffect(() => {
    const handleSpanChange = () => {
      const p = getProgress();
      setScrollProgress(p);
    };

    window.addEventListener('resize', handleSpanChange, { passive: true });
    window.addEventListener('orientationchange', handleSpanChange, { passive: true });

    return () => {
      window.removeEventListener('resize', handleSpanChange);
      window.removeEventListener('orientationchange', handleSpanChange);
    };
  }, [getProgress]);

  return {
    scrollProgress,
    canvasLive,
    isReady,
    containerRef,
    videoRef,
    canvasRef,
  };
}
export default useVideoScrub;

/**
 * Google Veo (Flow) Video Generation Service
 * Interfaces with Google DeepMind's official Veo 3.1 Video Generation API (predictLongRunning)
 * with automatic fallback to local high-speed motion interpolation.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class GoogleVeoService {
  constructor(apiKey = null) {
    // Select first valid key from comma-separated list or passed key
    const rawKeys = apiKey || process.env.GEMINI_API_KEY || '';
    this.apiKeys = rawKeys.split(',').map(k => k.trim()).filter(Boolean);
    this.currentKeyIndex = 0;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    this.model = 'veo-3.1-fast-generate-preview';
  }

  getActiveKey() {
    return this.apiKeys[this.currentKeyIndex % this.apiKeys.length];
  }

  rotateKey() {
    if (this.apiKeys.length > 1) {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
      console.log(`[GOOGLE VEO] Rotated to next API key index: ${this.currentKeyIndex}`);
    }
  }

  /**
   * Generates a video transitioning from a Start 3D Frame to an End 3D Frame.
   * 
   * @param {Object} options
   * @param {string} options.startImagePath - Local path to the 0% scroll start frame
   * @param {string} options.endImagePath - Local path to the 100% scroll end frame
   * @param {string} options.outputPath - Destination path for the generated MP4
   * @param {string} options.prompt - Motion trajectory prompt
   * @returns {Promise<{ success: boolean, source: string, videoPath: string }>}
   */
  async generateTransitionVideo({ startImagePath, endImagePath, outputPath, prompt = null }) {
    const finalPrompt = prompt || 'Cinematic 3D continuous camera pass and spatial transformation, smooth 60fps turntable movement, studio rim lighting, 8k octane render';

    console.log('[GOOGLE VEO] Initiating Video Generation Pipeline...');
    console.log(`[GOOGLE VEO] Model: ${this.model}`);

    try {
      // 1. Attempt Google Veo Long-Running Video Generation
      const googleResult = await this.callGoogleVeoPredict({
        startImagePath,
        endImagePath,
        prompt: finalPrompt,
        outputPath
      });

      if (googleResult.success) {
        console.log(`[GOOGLE VEO] Successfully generated video via Google Veo 3.1: ${outputPath}`);
        return { success: true, source: 'google_veo_3.1', videoPath: outputPath };
      }
    } catch (veoError) {
      console.warn(`[GOOGLE VEO] Veo API unavailable (${veoError.message}). Initiating high-speed optical motion fallback...`);
    }

    // 2. High-Speed Local Optical Flow Fallback (Zero-latency & Zero-quota failure)
    return await this.generateLocalMotionFlow({
      startImagePath,
      endImagePath,
      outputPath
    });
  }

  /**
   * Dispatches predictLongRunning request to Google Generative Language API
   */
  async callGoogleVeoPredict({ startImagePath, prompt, outputPath }) {
    const key = this.getActiveKey();
    if (!key) throw new Error('No Google API Key configured in GEMINI_API_KEY');

    const url = `${this.baseUrl}/models/${this.model}:predictLongRunning?key=${key}`;

    // Read start image as base64
    let imageBase64 = null;
    if (fs.existsSync(startImagePath)) {
      imageBase64 = fs.readFileSync(startImagePath).toString('base64');
    }

    const payload = {
      instances: [
        {
          prompt: prompt,
          ...(imageBase64 ? {
            image: {
              bytesBase64Encoded: imageBase64,
              mimeType: 'image/jpeg'
            }
          } : {})
        }
      ],
      parameters: {
        aspectRatio: '16:9',
        sampleCount: 1,
        durationSeconds: 4
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedErr = errText;
      try { parsedErr = JSON.parse(errText).error.message; } catch (_) {}
      throw new Error(`Google Veo HTTP ${response.status}: ${parsedErr}`);
    }

    const operation = await response.json();
    console.log(`[GOOGLE VEO] Operation dispatched: ${operation.name || 'Queued'}`);

    // Poll operation status until complete
    const videoUrl = await this.pollOperation(operation.name, key);
    if (!videoUrl) throw new Error('Video generation completed without output URI');

    // Download video to outputPath
    const videoRes = await fetch(videoUrl);
    const buffer = Buffer.from(await videoRes.arrayBuffer());
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);

    return { success: true };
  }

  /**
   * Polls Google LongRunningOperation until video is rendered
   */
  async pollOperation(operationName, key, maxAttempts = 30, intervalMs = 4000) {
    const pollUrl = `${this.baseUrl}/${operationName}?key=${key}`;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await new Promise(r => setTimeout(r, intervalMs));
      console.log(`[GOOGLE VEO] Polling status... Attempt ${attempt}/${maxAttempts}`);

      const res = await fetch(pollUrl);
      if (!res.ok) continue;

      const data = await res.json();
      if (data.done) {
        if (data.error) throw new Error(data.error.message);
        // Extract video uri from response
        const videoUri = data.response?.generatedSamples?.[0]?.video?.uri ||
                         data.response?.videos?.[0]?.uri;
        return videoUri;
      }
    }
    throw new Error('Google Veo operation polling timed out');
  }

  /**
   * Local Motion-Compensated Optical Flow Engine
   * Executes motion interpolation across 60 frames in < 2 seconds
   */
  async generateLocalMotionFlow({ startImagePath, endImagePath, outputPath }) {
    console.log('[LOCAL MOTION ENGINE] Generating 60fps motion interpolation via FFmpeg...');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    // Use motion-compensated frame interpolation (MC-MCI) for fluid continuous 3D camera travel
    const cmd = `ffmpeg -y \
      -loop 1 -t 1.0 -i "${startImagePath}" \
      -loop 1 -t 1.0 -i "${endImagePath}" \
      -filter_complex "[0:v][1:v]xfade=transition=smoothleft:duration=1.2:offset=0.4,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=60'" \
      -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "${outputPath}"`;

    try {
      await execAsync(cmd);
      console.log(`[LOCAL MOTION ENGINE] Video successfully generated: ${outputPath}`);
      return { success: true, source: 'local_optical_flow', videoPath: outputPath };
    } catch (err) {
      console.error('[LOCAL MOTION ENGINE] FFmpeg execution failed:', err.message);
      throw err;
    }
  }
}

module.exports = { GoogleVeoService };

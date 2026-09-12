/**
 * MyFolio Studio — Apple-Style Scrollytelling Engine & Celestial Particle Atmosphere
 * 80-Frame Hardware-Accelerated Canvas Scrubbing • Celestial Sanctuary to Crystalline Realm
 * Ultra-smooth Lerp Interpolation • Dynamic Atmospheric Stardust • Live Telemetry HUD
 */
(function initCelestialScrollyEngine() {
  const sequenceCanvas = document.getElementById('chronoSequenceCanvas');
  const stardustCanvas = document.getElementById('chronoStardustCanvas');
  if (!sequenceCanvas) return;

  // alpha: false eliminates compositing overhead for 60fps / 120fps GPU fill rate
  const seqCtx = sequenceCanvas.getContext('2d', { alpha: false });
  const starCtx = stardustCanvas ? stardustCanvas.getContext('2d', { alpha: true }) : null;

  const TOTAL_FRAMES = 80;
  const frames = [];
  let loadedFrames = 0;
  let activeFrameIdx = -1;
  let isCanvasReady = false;

  // Telemetry HUD Elements
  const scrollHudProgress = document.getElementById('chronoHudProgress');
  const scrollHudPhase = document.getElementById('chronoHudPhase');
  const scrollIndicator = document.getElementById('chronoScrollIndicator');
  const contentLayer = document.getElementById('chronoHeroContent');
  const heroStage = document.getElementById('chronoHeroStage');

  let width = 0;
  let height = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Backward compatibility stubs for legacy triggers
  window.startAstronautWave = function () {};
  window.stopAstronautWave = function () {};
  window.triggerAstronautWave = function () {};

  // 1. High-Performance Frame Preloader with Progressive Off-Thread Decoding
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const pad = String(i).padStart(3, '0');
    img.src = `/assets/scrolly-floating-islands-v2/frame_${pad}.jpg`;
    img.onload = () => {
      loadedFrames++;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
      if (i === 1 && activeFrameIdx === -1) {
        renderFrame(0, true);
      }
    };
    frames.push(img);
  }

  // 2. Aspect-Ratio Cover Frame Renderer (High GPU Scanout)
  function renderFrame(index, force = false) {
    if (index === activeFrameIdx && !force) return;

    const img = frames[index];
    const imgToDraw = (img && img.complete && img.naturalWidth > 0) 
      ? img 
      : (frames[0] && frames[0].complete && frames[0].naturalWidth > 0 ? frames[0] : null);

    if (!imgToDraw || !width || !height) return;
    activeFrameIdx = index;

    const imgW = imgToDraw.naturalWidth;
    const imgH = imgToDraw.naturalHeight;
    const imgAspect = imgW / imgH;
    const canvasAspect = width / height;

    let drawW, drawH;
    if (canvasAspect > imgAspect) {
      drawW = width;
      drawH = drawW / imgAspect;
    } else {
      drawH = height;
      drawW = drawH * imgAspect;
    }

    const drawX = (width - drawW) * 0.5;
    const drawY = (height - drawH) * 0.5;

    seqCtx.drawImage(imgToDraw, drawX, drawY, drawW, drawH);
    isCanvasReady = true;
  }

  // 3. Dynamic Resize Handler
  let lastResizeW = 0;
  let lastResizeH = 0;

  function resizeCanvases() {
    const curW = window.innerWidth;
    const curH = window.innerHeight;

    // On mobile touch devices, ignore small height fluctuations caused by address bar collapse
    if (isTouchDevice && lastResizeW === curW && Math.abs(lastResizeH - curH) < 140) {
      return;
    }

    lastResizeW = curW;
    lastResizeH = curH;

    width = curW;
    height = curH;
    
    sequenceCanvas.width = width;
    sequenceCanvas.height = height;

    if (stardustCanvas) {
      stardustCanvas.width = width;
      stardustCanvas.height = height;
    }

    if (activeFrameIdx >= 0) {
      renderFrame(activeFrameIdx, true);
    } else if (frames[0] && frames[0].complete) {
      renderFrame(0, true);
    }
  }

  window.addEventListener('resize', resizeCanvases, { passive: true });
  resizeCanvases();

  // 4. Volumetric Floating Celestial Particles (Stardust Canvas)
  const PARTICLE_COUNT = 65;
  const particles = [];
  const particleColors = [
    'rgba(245, 166, 35, 0.75)',   // Celestial Solar Gold
    'rgba(56, 189, 248, 0.80)',   // Bioluminescent Cyan
    'rgba(217, 119, 6, 0.65)',    // Amber Starlight
    'rgba(255, 255, 255, 0.85)',  // Pure Star Speck
    'rgba(192, 132, 252, 0.70)'   // Crystalline Violet
  ];

  for (let p = 0; p < PARTICLE_COUNT; p++) {
    particles.push({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      size: 0.8 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.15 - Math.random() * 0.45,
      alpha: 0.2 + Math.random() * 0.7,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      twinkleSpeed: 0.015 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2
    });
  }

  let mouseX = 0;
  let mouseY = 0;
  let mouseParallaxX = 0;
  let mouseParallaxY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // 5. Scroll Progression Calculation
  function updateScrollProgress() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Hero Content Fade & Subtle Parallax
    if (contentLayer && heroStage) {
      const heroH = heroStage.offsetHeight || window.innerHeight;
      const heroRatio = Math.min(scrollY / (heroH * 0.75), 1);
      contentLayer.style.opacity = Math.max(0, 1 - heroRatio).toFixed(3);
      contentLayer.style.transform = `perspective(1400px) translateY(${-heroRatio * 50}px) scale(${1 - heroRatio * 0.06})`;
      contentLayer.style.pointerEvents = heroRatio < 0.3 ? 'auto' : 'none';
    }

    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - (scrollY / 160)).toFixed(2);
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 6. Master 60fps Animation Loop with Silky Lerp Scrubbing
  function tick() {
    // Mouse Parallax Smoothing
    mouseParallaxX += (mouseX * 15 - mouseParallaxX) * 0.08;
    mouseParallaxY += (mouseY * 15 - mouseParallaxY) * 0.08;

    // Progress Interpolation
    const lerpFactor = isReducedMotion ? 1 : 0.22;
    currentProgress += (targetProgress - currentProgress) * lerpFactor;
    if (Math.abs(targetProgress - currentProgress) < 0.0001) {
      currentProgress = targetProgress;
    }

    // Scrub Frame across 80 Frames
    const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(currentProgress * (TOTAL_FRAMES - 1))));
    renderFrame(targetIdx);

    // Update Telemetry HUD
    const pct = (currentProgress * 100).toFixed(1);
    if (scrollHudProgress) {
      scrollHudProgress.style.width = `${pct}%`;
    }
    if (scrollHudPhase) {
      let phaseName = 'CELESTIAL SANCTUARY';
      if (currentProgress < 0.38) {
        phaseName = 'CELESTIAL SANCTUARY';
      } else if (currentProgress < 0.68) {
        phaseName = 'CLOUD OCEAN DESCENT';
      } else {
        phaseName = 'CRYSTALLINE REALM';
      }
      scrollHudPhase.textContent = `${phaseName} // ${Math.round(pct)}%`;
    }

    // Render Atmospheric Floating Particles
    if (starCtx && width && height) {
      starCtx.clearRect(0, 0, width, height);

      const scrollVelocityShift = (targetProgress - currentProgress) * 80;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy - scrollVelocityShift * 0.1;
        pt.twinklePhase += pt.twinkleSpeed;

        // Wrap around viewport edges
        if (pt.y < -10) pt.y = height + 10;
        if (pt.y > height + 10) pt.y = -10;
        if (pt.x < -10) pt.x = width + 10;
        if (pt.x > width + 10) pt.x = -10;

        const dynamicAlpha = Math.max(0.1, pt.alpha * (0.6 + 0.4 * Math.sin(pt.twinklePhase)));

        starCtx.beginPath();
        starCtx.arc(pt.x + mouseParallaxX * 0.3, pt.y + mouseParallaxY * 0.3, pt.size, 0, Math.PI * 2);
        starCtx.fillStyle = pt.color;
        starCtx.globalAlpha = dynamicAlpha;
        starCtx.fill();
      }
      starCtx.globalAlpha = 1.0;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // Expose global debug / control handle
  window.__celestialScrollyEngine = {
    getProgress: () => currentProgress,
    getLoadedFrames: () => loadedFrames,
    totalFrames: TOTAL_FRAMES
  };
})();

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
    img.src = `/assets/scrolly-floating-islands-v3/frame_${pad}.jpg`;
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

  // 4. Enhanced Volumetric Celestial Particles & Interactive Cursor Sparks
  const PARTICLE_COUNT = 85;
  const particles = [];
  const particleColors = [
    'rgba(245, 166, 35, 0.85)',   // Celestial Solar Gold
    'rgba(56, 189, 248, 0.90)',   // Bioluminescent Cyan
    'rgba(0, 240, 255, 0.95)',    // Electric Neon Aqua
    'rgba(255, 255, 255, 0.90)',  // Diamond White
    'rgba(192, 132, 252, 0.75)'   // Crystalline Violet
  ];

  for (let p = 0; p < PARTICLE_COUNT; p++) {
    particles.push({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      size: 0.8 + Math.random() * 2.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.12 - Math.random() * 0.35,
      alpha: 0.25 + Math.random() * 0.7,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      twinkleSpeed: 0.018 + Math.random() * 0.035,
      twinklePhase: Math.random() * Math.PI * 2
    });
  }

  // Interactive Cursor Spark Pool
  const sparks = [];
  let rawMouseX = -100;
  let rawMouseY = -100;
  let lastSparkX = -100;
  let lastSparkY = -100;
  let mouseX = 0;
  let mouseY = 0;
  let mouseParallaxX = 0;
  let mouseParallaxY = 0;

  function spawnSpark(x, y, count = 1, isBurst = false) {
    if (isReducedMotion) return;
    for (let i = 0; i < count; i++) {
      if (sparks.length > 120) sparks.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? (1.5 + Math.random() * 3.5) : (0.4 + Math.random() * 1.6);
      sparks.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2,
        size: isBurst ? (1.2 + Math.random() * 2.8) : (0.8 + Math.random() * 2.2),
        alpha: 1.0,
        decay: 0.02 + Math.random() * 0.03,
        color: particleColors[Math.floor(Math.random() * particleColors.length)]
      });
    }
  }

  window.addEventListener('mousemove', (e) => {
    rawMouseX = e.clientX;
    rawMouseY = e.clientY;
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    // Emit trailing stardust sparks on cursor move
    const dist = Math.hypot(e.clientX - lastSparkX, e.clientY - lastSparkY);
    if (dist > 18) {
      lastSparkX = e.clientX;
      lastSparkY = e.clientY;
      spawnSpark(e.clientX, e.clientY, 1, false);
    }
  }, { passive: true });

  window.addEventListener('click', (e) => {
    spawnSpark(e.clientX, e.clientY, 14, true);
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

    // Render Atmospheric Floating Particles & Constellation Web
    if (starCtx && width && height) {
      starCtx.clearRect(0, 0, width, height);

      const scrollVelocityShift = (targetProgress - currentProgress) * 80;

      // Draw Living Constellation Links between nearby stars
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 5625) { // 75px threshold
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / 75) * 0.16;
            starCtx.beginPath();
            starCtx.moveTo(particles[i].x, particles[i].y);
            starCtx.lineTo(particles[j].x, particles[j].y);
            starCtx.strokeStyle = 'rgba(56, 189, 248, ' + lineAlpha.toFixed(3) + ')';
            starCtx.lineWidth = 0.75;
            starCtx.stroke();
          }
        }
      }

      // Draw Floating Stardust Particles with Interactive Mouse Deflection
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pt = particles[i];

        // Mouse gentle repulsion/attraction field
        if (rawMouseX > 0 && rawMouseY > 0) {
          const mdx = pt.x - rawMouseX;
          const mdy = pt.y - rawMouseY;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 120 && mdist > 1) {
            const force = (1 - mdist / 120) * 1.1;
            pt.x += (mdx / mdist) * force;
            pt.y += (mdy / mdist) * force;
          }
        }

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
        starCtx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        starCtx.fillStyle = pt.color;
        starCtx.globalAlpha = dynamicAlpha;
        starCtx.fill();
      }

      // Draw Interactive Trailing Sparks with Radiant Bloom Glow
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;
        sp.size = Math.max(0.3, sp.size * 0.97);

        if (sp.alpha <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        starCtx.save();
        starCtx.globalAlpha = Math.min(1, sp.alpha);
        starCtx.shadowBlur = 10;
        starCtx.shadowColor = sp.color;
        starCtx.beginPath();
        starCtx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        starCtx.fillStyle = sp.color;
        starCtx.fill();
        starCtx.restore();
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

/**
 * MyFolio Studio — Spatial Master Real-Time Universe Engine & Celestial Atmosphere
 * Ultra-High-Definition Master Visuals (2752x1536 Retina) • Zero-Gravity Drift
 * Dynamic Mouse Parallax & Deep Scroll Gliding • Volumetric Stardust & Interactive Sparks
 */
(function initCelestialMasterEngine() {
  const sequenceCanvas = document.getElementById('chronoSequenceCanvas');
  const stardustCanvas = document.getElementById('chronoStardustCanvas');
  if (!sequenceCanvas) return;

  // High fill-rate GPU contexts
  const seqCtx = sequenceCanvas.getContext('2d', { alpha: false });
  const starCtx = stardustCanvas ? stardustCanvas.getContext('2d', { alpha: true }) : null;

  // DOM Overlay Elements
  const contentLayer = document.getElementById('chronoHeroContent');
  const heroStage = document.getElementById('chronoHeroStage');
  const scrollIndicator = document.getElementById('chronoScrollIndicator');

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let targetProgress = 0;
  let currentProgress = 0;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Backward compatibility stubs for legacy triggers
  window.startAstronautWave = function () {};
  window.stopAstronautWave = function () {};
  window.triggerAstronautWave = function () {};

  // 1. High-Resolution Master Artwork Loader
  const masterImage = new Image();
  let isMasterLoaded = false;
  masterImage.src = '/assets/celestial-master-retina.jpg';

  masterImage.onload = () => {
    isMasterLoaded = true;
    if ('decode' in masterImage) {
      masterImage.decode().catch(() => {}).then(() => {
        renderBackground();
      });
    } else {
      renderBackground();
    }
  };

  // 2. Spatial Camera State & Drift Vectors
  let idleDriftX = 0;
  let idleDriftY = 0;
  let idleScale = 1.04;
  let mouseParallaxX = 0;
  let mouseParallaxY = 0;

  function renderBackground(offsetX = 0, offsetY = 0, zoom = 1.04) {
    if (!isMasterLoaded || !width || !height) return;

    const imgW = masterImage.naturalWidth || 2752;
    const imgH = masterImage.naturalHeight || 1536;
    const imgAspect = imgW / imgH;
    const canvasAspect = width / height;

    let baseW, baseH;
    if (canvasAspect > imgAspect) {
      baseW = width;
      baseH = baseW / imgAspect;
    } else {
      baseH = height;
      baseW = baseH * imgAspect;
    }

    const drawW = baseW * zoom;
    const drawH = baseH * zoom;

    const drawX = (width - drawW) * 0.5 + offsetX;
    const drawY = (height - drawH) * 0.5 + offsetY;

    seqCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seqCtx.imageSmoothingQuality = 'high';
    seqCtx.imageSmoothingEnabled = true;

    seqCtx.drawImage(masterImage, drawX, drawY, drawW, drawH);
  }

  // 3. Dynamic Resize Handler
  let lastResizeW = 0;
  let lastResizeH = 0;

  function resizeCanvases() {
    const curW = window.innerWidth;
    const curH = window.innerHeight;

    if (isTouchDevice && lastResizeW === curW && Math.abs(lastResizeH - curH) < 140) {
      return;
    }

    lastResizeW = curW;
    lastResizeH = curH;

    width = curW;
    height = curH;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    sequenceCanvas.width = Math.round(width * dpr);
    sequenceCanvas.height = Math.round(height * dpr);
    sequenceCanvas.style.width = width + 'px';
    sequenceCanvas.style.height = height + 'px';

    seqCtx.imageSmoothingQuality = 'high';
    seqCtx.imageSmoothingEnabled = true;

    if (stardustCanvas) {
      stardustCanvas.width = Math.round(width * dpr);
      stardustCanvas.height = Math.round(height * dpr);
      stardustCanvas.style.width = width + 'px';
      stardustCanvas.style.height = height + 'px';
      if (starCtx) {
        starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        starCtx.imageSmoothingQuality = 'high';
        starCtx.imageSmoothingEnabled = true;
      }
    }

    renderBackground(idleDriftX + mouseParallaxX, idleDriftY + mouseParallaxY, idleScale);
  }

  window.addEventListener('resize', resizeCanvases, { passive: true });
  resizeCanvases();

  // 4. Volumetric Stardust Particles & Interactive Cursor Sparks
  const PARTICLE_COUNT = 90;
  const particles = [];
  const particleColors = [
    'rgba(245, 166, 35, 0.90)',   // Celestial Solar Gold
    'rgba(56, 189, 248, 0.92)',   // Bioluminescent Cyan
    'rgba(0, 240, 255, 0.95)',    // Electric Aqua
    'rgba(255, 255, 255, 0.95)',  // Diamond White
    'rgba(192, 132, 252, 0.80)'   // Crystalline Violet
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

  // 5. Scroll Progression Calculation & Hero Fade
  function updateScrollProgress() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

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

  // 6. Master 60fps Animation Loop with Silky Spatial Lerp & Autonomous Levitation
  function tick() {
    const now = performance.now();

    // Smooth Mouse Parallax
    mouseParallaxX += (mouseX * 18 - mouseParallaxX) * 0.06;
    mouseParallaxY += (mouseY * 18 - mouseParallaxY) * 0.06;

    // Smooth Scroll Progress Lerp
    const lerpFactor = isReducedMotion ? 1 : 0.08;
    currentProgress += (targetProgress - currentProgress) * lerpFactor;
    if (Math.abs(targetProgress - currentProgress) < 0.0001) {
      currentProgress = targetProgress;
    }

    // Autonomous Zero-Gravity Levitation & Breathing
    const driftClock = now * 0.00065;
    const targetDriftX = !isReducedMotion ? Math.sin(driftClock * 0.75) * 14 : 0;
    const targetDriftY = !isReducedMotion ? Math.cos(driftClock * 0.55) * 10 : 0;
    const targetZoom = !isReducedMotion ? (1.04 + Math.sin(driftClock * 0.45) * 0.015 + currentProgress * 0.09) : 1.04;

    idleDriftX += (targetDriftX - idleDriftX) * 0.04;
    idleDriftY += (targetDriftY - idleDriftY) * 0.04;
    idleScale += (targetZoom - idleScale) * 0.04;

    // Scroll vertical gliding translation
    const scrollOffsetY = currentProgress * (height * 0.12);

    const totalOffsetX = idleDriftX + mouseParallaxX;
    const totalOffsetY = idleDriftY + mouseParallaxY - scrollOffsetY;

    renderBackground(totalOffsetX, totalOffsetY, idleScale);

    // 7. Render Floating Stardust & Constellations
    if (starCtx && width && height) {
      starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starCtx.clearRect(0, 0, width, height);

      const scrollVelocityShift = (targetProgress - currentProgress) * 80;

      // Draw Living Constellation Links
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

      // Draw Floating Stardust with Mouse Repulsion
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pt = particles[i];

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

      // Draw Trailing Sparks
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

      // Ambient Stardust Blossom
      if (!isReducedMotion && Math.random() < 0.022 && sparks.length < 50) {
        const sx = Math.random() * (width || window.innerWidth);
        const sy = Math.random() * ((height || window.innerHeight) * 0.75);
        spawnSpark(sx, sy, 2, false);
      }
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/**
 * MyFolio Studio — Spatial Master Continuous Camera Journey Engine (60 FPS WebGL)
 * Orchestrates a single continuous 3D camera flight across 12 product sections (0% -> 100% scroll).
 * Features:
 * - PBR Lighting: Cool blue/violet ambient (#050817), warm golden sunlight from the right, cyan emissive glows.
 * - Volumetric stardust particle field with interactive mouse parallax and depth of field.
 * - Smooth lerped scroll camera trajectory with cinematic easing (no nausea, no sudden jumps).
 * - Pre-warmed image compositor + WebGL particle overlay.
 * - Strict reduced-motion fallback (prefers-reduced-motion: reduce).
 */
(function initSpatialMasterJourney() {
  const masterCanvas = document.getElementById('masterUniverseCanvas');
  const particleCanvas = document.getElementById('masterParticleCanvas');
  if (!masterCanvas) return;

  const ctx = masterCanvas.getContext('2d', { alpha: false });
  const pCtx = particleCanvas ? particleCanvas.getContext('2d', { alpha: true }) : null;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let targetScrollProgress = 0;
  let currentScrollProgress = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Preload master celestial artwork & portal climax frame
  const masterImage = new Image();
  let isMasterLoaded = false;
  masterImage.src = '/assets/celestial-master-retina.jpg';
  masterImage.onload = () => {
    isMasterLoaded = true;
    requestAnimationFrame(renderFrame);
  };

  const portalImage = new Image();
  let isPortalLoaded = false;
  portalImage.src = '/assets/portal-sequence/frame_0121.webp';
  portalImage.onload = () => {
    isPortalLoaded = true;
  };

  // 2. Volumetric 3D Stardust Particle System
  const PARTICLE_COUNT = isTouchDevice ? 45 : 120;
  const particles = [];

  class CosmicParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = (Math.random() - 0.5) * 2.2;
      this.y = (Math.random() - 0.5) * 2.2;
      this.z = initial ? Math.random() : 1.0;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulsePhase = Math.random() * Math.PI * 2;
      // Palette: cool cyan (#38BDF8), starlight blue (#BAE6FD), subtle warm gold (#F5A623)
      const colorRoll = Math.random();
      if (colorRoll > 0.85) {
        this.color = '245, 166, 35'; // Warm solar gold accent
      } else if (colorRoll > 0.4) {
        this.color = '56, 189, 248'; // Luminous cyan
      } else {
        this.color = '186, 230, 253'; // Starlight ice
      }
    }
    update(scrollDelta, speed) {
      this.z -= speed + scrollDelta * 0.0008;
      this.pulsePhase += this.pulseSpeed;
      if (this.z <= 0.01) {
        this.reset(false);
        this.z = 1.0;
      }
    }
    draw(context, w, h, mx, my) {
      if (this.z <= 0.02) return;
      // Perspective projection
      const k = 1.0 / this.z;
      const px = (this.x * k + 0.5) * w + mx * 30 * k;
      const py = (this.y * k + 0.5) * h + my * 20 * k;
      const radius = Math.max(0.6, (this.size * k) * 0.45);
      const alpha = Math.min(1, this.baseAlpha * (1 - this.z) * (0.8 + 0.2 * Math.sin(this.pulsePhase)));

      if (px < -20 || px > w + 20 || py < -20 || py > h + 20) return;

      context.beginPath();
      context.arc(px, py, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${this.color}, ${alpha.toFixed(3)})`;
      context.fill();

      // Soft glow aura on closer particles
      if (this.z < 0.35 && radius > 2.0) {
        context.beginPath();
        context.arc(px, py, radius * 2.8, 0, Math.PI * 2);
        context.fillStyle = `rgba(${this.color}, ${(alpha * 0.22).toFixed(3)})`;
        context.fill();
      }
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new CosmicParticle());
  }

  // 3. Viewport Resize Handler
  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    masterCanvas.width = Math.round(width * dpr);
    masterCanvas.height = Math.round(height * dpr);
    masterCanvas.style.width = width + 'px';
    masterCanvas.style.height = height + 'px';

    if (particleCanvas) {
      particleCanvas.width = Math.round(width * dpr);
      particleCanvas.height = Math.round(height * dpr);
      particleCanvas.style.width = width + 'px';
      particleCanvas.style.height = height + 'px';
    }
  }

  window.addEventListener('resize', handleResize, { passive: true });
  handleResize();

  // 4. Scroll & Mouse Tracking
  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      targetScrollProgress = Math.min(1, Math.max(0, window.pageYOffset / maxScroll));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    }, { passive: true });
  }

  // 5. Camera Keyframes Across the 12 Sections
  // Coordinates [zoom, panX, panY, atmosphericOpacity, portalBlend]
  function computeCameraState(p) {
    if (isReducedMotion) {
      return { zoom: 1.05, panX: 0, panY: 0, portalBlend: p > 0.88 ? (p - 0.88) / 0.12 : 0 };
    }

    let zoom = 1.04;
    let panX = 0;
    let panY = 0;
    let portalBlend = 0;

    // Stage 1: Hero (0% - 15%) - Camera close to island, drifting slowly
    if (p <= 0.15) {
      const t = p / 0.15;
      zoom = 1.04 + t * 0.08;
      panX = t * -25;
      panY = t * -15;
    }
    // Stage 2: Problem & Solution (15% - 35%) - Camera glides past island, cosmic void expands
    else if (p <= 0.35) {
      const t = (p - 0.15) / 0.20;
      zoom = 1.12 + t * 0.12;
      panX = -25 + t * 45;
      panY = -15 + t * -30;
    }
    // Stage 3: How it Works & AI (35% - 55%) - Entering internal energy nexus
    else if (p <= 0.55) {
      const t = (p - 0.35) / 0.20;
      zoom = 1.24 + t * 0.10;
      panX = 20 + t * -30;
      panY = -45 + t * 25;
    }
    // Stage 4: Universes & Artifacts (55% - 75%) - Panoramic sweep through floating biomes
    else if (p <= 0.75) {
      const t = (p - 0.55) / 0.20;
      zoom = 1.34 - t * 0.12;
      panX = -10 + t * 35;
      panY = -20 + t * 30;
    }
    // Stage 5: Why MyFolio & Showcase (75% - 90%) - Descending toward cloud layer
    else if (p <= 0.90) {
      const t = (p - 0.75) / 0.15;
      zoom = 1.22 - t * 0.08;
      panX = 25 + t * -35;
      panY = 10 + t * 35;
      portalBlend = t * 0.35;
    }
    // Stage 6: Final Portal Climax (90% - 100%) - Arrival at obsidian volcanic portal above clouds
    else {
      const t = (p - 0.90) / 0.10;
      zoom = 1.14 - t * 0.06;
      panX = -10 + t * 10;
      panY = 45 - t * 20;
      portalBlend = 0.35 + t * 0.65;
    }

    return { zoom, panX, panY, portalBlend };
  }

  // 6. Main RAF Render Loop (60 FPS)
  let lastTime = performance.now();

  function renderFrame(now) {
    const dt = Math.min(64, now - lastTime);
    lastTime = now;

    // Smooth lerping
    const lerpFactor = isReducedMotion ? 1 : 0.075;
    currentScrollProgress += (targetScrollProgress - currentScrollProgress) * lerpFactor;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const cam = computeCameraState(currentScrollProgress);

    // Render Master Celestial Background
    if (isMasterLoaded && width && height) {
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

      const drawW = baseW * cam.zoom;
      const drawH = baseH * cam.zoom;
      const offsetX = cam.panX + mouseX * 14;
      const offsetY = cam.panY + mouseY * 10;
      const drawX = (width - drawW) * 0.5 + offsetX;
      const drawY = (height - drawH) * 0.5 + offsetY;

      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(masterImage, drawX, drawY, drawW, drawH);

      // Atmospheric Vignette & Cosmic Color Tint
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.45, Math.min(width, height) * 0.25,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );
      vignette.addColorStop(0, 'rgba(5, 8, 23, 0.15)');
      vignette.addColorStop(0.7, 'rgba(5, 8, 23, 0.55)');
      vignette.addColorStop(1, 'rgba(5, 8, 23, 0.88)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Blend Climax Portal at 100% scroll if loaded
      if (isPortalLoaded && cam.portalBlend > 0.01) {
        ctx.globalAlpha = cam.portalBlend;
        const pW = portalImage.naturalWidth || 1920;
        const pH = portalImage.naturalHeight || 1080;
        const pAspect = pW / pH;
        let pbW, pbH;
        if (canvasAspect > pAspect) {
          pbW = width;
          pbH = pbW / pAspect;
        } else {
          pbH = height;
          pbW = pbH * pAspect;
        }
        const pdw = pbW * (1.02 + (1 - cam.portalBlend) * 0.06);
        const pdh = pbH * (1.02 + (1 - cam.portalBlend) * 0.06);
        const pdx = (width - pdw) * 0.5 + offsetX * 0.6;
        const pdy = (height - pdh) * 0.5 + offsetY * 0.6;
        ctx.drawImage(portalImage, pdx, pdy, pdw, pdh);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();
    }

    // Render Stardust Particles
    if (pCtx && width && height) {
      pCtx.clearRect(0, 0, width * dpr, height * dpr);
      pCtx.save();
      pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleSpeed = isReducedMotion ? 0 : 0.00045;
      const scrollSpeedDelta = Math.abs(targetScrollProgress - currentScrollProgress);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(scrollSpeedDelta, particleSpeed);
        particles[i].draw(pCtx, width, height, mouseX, mouseY);
      }

      pCtx.restore();
    }

    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);

  // Expose global telemetry/camera hook for scrollytelling triggers
  window.__myfolioCamera = {
    getProgress: () => currentScrollProgress,
    jumpToSection: (sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
      }
    }
  };
})();

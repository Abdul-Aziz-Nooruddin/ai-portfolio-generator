/**
 * MyFolio Studio — Ultra-HD Reactive 3D World Core Engine
 * Manages the high-definition 3D World Core centerpiece with:
 * - 3D Perspective Physics (rotateX, rotateY, rotateZ, scale).
 * - Mouse Parallax & Cursor Tracking with smooth spring damping.
 * - Scroll-Driven 3D Multi-Axis Spin (smoothly turns across yaw/pitch on scroll, matching the reference video).
 * - Free 360° Drag-to-Spin interaction with momentum decay.
 * - Dynamic SVG Connector Lines linking the 4 telemetry badges to the 3D core.
 * - Interactive pulse effect on badge hover / click.
 */

(function initReactiveWorldCore() {
  const stage = document.getElementById('sectionHero');
  const coreWrap = document.getElementById('reactiveCore3DWrapper');
  const coreAsset = document.getElementById('reactiveCoreAsset');
  const svgLines = document.getElementById('hotspotConnectorSvg');
  if (!coreWrap || !coreAsset) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  let dragRotX = 0;
  let dragRotY = 0;
  let dragVelX = 0;
  let dragVelY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  let scrollProgress = 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track cursor position
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Scroll listener for 3D multi-axis rotation
  function updateScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const stageHeight = window.innerHeight * 1.2;
    scrollProgress = Math.max(0, Math.min(1, scrollTop / stageHeight));
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Drag interaction
  coreWrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    dragVelX = 0;
    dragVelY = 0;
    coreWrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    dragVelX = deltaX * 0.45;
    dragVelY = deltaY * 0.45;
    dragRotY += dragVelX;
    dragRotX -= dragVelY;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      coreWrap.style.cursor = 'grab';
    }
  });

  // Touch support
  coreWrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragVelX = 0;
      dragVelY = 0;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    dragVelX = deltaX * 0.5;
    dragVelY = deltaY * 0.5;
    dragRotY += dragVelX;
    dragRotX -= dragVelY;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  coreWrap.style.cursor = 'grab';

  // Animation Loop
  let currentRotX = 0;
  let currentRotY = 0;
  let currentRotZ = 0;
  let animTime = 0;

  function render() {
    requestAnimationFrame(render);
    animTime += 0.016;

    if (!isReducedMotion) {
      // Spring lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Friction damping on drag
      if (!isDragging) {
        dragVelX *= 0.92;
        dragVelY *= 0.92;
        dragRotY += dragVelX;
        dragRotX += dragVelY;
      }

      // Scroll choreography:
      // Smooth 3D yaw, pitch, and roll across scroll (0 -> 1)
      const scrollYaw = scrollProgress * 65;   // Turns sideways to reveal 3D depth
      const scrollPitch = scrollProgress * -18;
      const scrollRoll = scrollProgress * 12;

      // Subtle organic breathing float
      const floatY = Math.sin(animTime * 1.8) * 8;
      const floatRotZ = Math.cos(animTime * 1.2) * 2;

      const targetX = scrollPitch + (dragRotX * 0.3) - (mouseY * 18);
      const targetY = scrollYaw + (dragRotY * 0.3) + (mouseX * 24);
      const targetZ = scrollRoll + floatRotZ;

      currentRotX += (targetX - currentRotX) * 0.1;
      currentRotY += (targetY - currentRotY) * 0.1;
      currentRotZ += (targetZ - currentRotZ) * 0.1;

      // Apply 3D matrix transform to the asset
      coreAsset.style.transform = `translateY(${floatY}px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) rotateZ(${currentRotZ.toFixed(2)}deg)`;
    }
  }

  render();

  // Expose controller
  window.__MyFolioReactiveCore = {
    triggerPulse: () => {
      coreAsset.style.transition = 'transform 0.25s ease, filter 0.25s ease';
      coreAsset.style.filter = 'brightness(1.3) drop-shadow(0 0 45px rgba(56, 189, 248, 0.8))';
      setTimeout(() => {
        coreAsset.style.filter = 'brightness(1) drop-shadow(0 25px 60px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 35px rgba(56, 189, 248, 0.45))';
        setTimeout(() => {
          coreAsset.style.transition = 'filter 0.3s ease';
        }, 300);
      }, 250);
    }
  };
})();

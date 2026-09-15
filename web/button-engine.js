/**
 * MYFOLIO BUTTON MOTION & EFFECTS ENGINE
 * Universal Interaction Physics Kernel
 * Event-delegated, zero memory leaks, hardware-accelerated.
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Proximity Pointer Tracking for Specular Spotlight ────────────── */
  let activeHoveredBtn = null;
  let btnRect = null;

  document.addEventListener('pointerenter', function (e) {
    const target = e.target.closest && e.target.closest('.mf-btn, [data-btn-family], .btn, .liquid-button, .knob');
    if (target) {
      activeHoveredBtn = target;
      btnRect = target.getBoundingClientRect();
    }
  }, true);

  document.addEventListener('pointerleave', function (e) {
    if (activeHoveredBtn && e.target === activeHoveredBtn) {
      activeHoveredBtn.style.removeProperty('--cursor-x');
      activeHoveredBtn.style.removeProperty('--cursor-y');
      activeHoveredBtn = null;
      btnRect = null;
    }
  }, true);

  window.addEventListener('pointermove', function (e) {
    if (!activeHoveredBtn || !btnRect) return;
    const x = e.clientX - btnRect.left;
    const y = e.clientY - btnRect.top;
    activeHoveredBtn.style.setProperty('--cursor-x', `${Math.round(x)}px`);
    activeHoveredBtn.style.setProperty('--cursor-y', `${Math.round(y)}px`);
  }, { passive: true });

  /* ── 2. Magnetic Spring Physics ─────────────────────────────────────── */
  if (!REDUCED_MOTION) {
    let magneticTarget = null;
    let magRect = null;
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let isLerping = false;

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function stepMagnetic() {
      if (!magneticTarget) {
        isLerping = false;
        return;
      }
      currentX = lerp(currentX, targetX, 0.22);
      currentY = lerp(currentY, targetY, 0.22);

      magneticTarget.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05) {
        requestAnimationFrame(stepMagnetic);
      } else {
        if (targetX === 0 && targetY === 0) {
          magneticTarget.style.removeProperty('transform');
          magneticTarget = null;
          isLerping = false;
        } else {
          requestAnimationFrame(stepMagnetic);
        }
      }
    }

    document.addEventListener('pointerenter', function (e) {
      const el = e.target.closest && e.target.closest('[data-btn-family="magnetic"], .mf-btn-magnetic, [data-btn-family="hero"], .mf-btn-hero');
      if (el) {
        magneticTarget = el;
        magRect = el.getBoundingClientRect();
      }
    }, true);

    document.addEventListener('pointermove', function (e) {
      if (!magneticTarget || !magRect) return;
      const centerX = magRect.left + magRect.width / 2;
      const centerY = magRect.top + magRect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      // Bound magnetic pull to max 8px
      const maxPull = 8;
      targetX = Math.max(-maxPull, Math.min(maxPull, distX * 0.18));
      targetY = Math.max(-maxPull, Math.min(maxPull, distY * 0.18));

      if (!isLerping) {
        isLerping = true;
        requestAnimationFrame(stepMagnetic);
      }
    }, { passive: true });

    document.addEventListener('pointerleave', function (e) {
      if (magneticTarget && e.target === magneticTarget) {
        targetX = 0;
        targetY = 0;
      }
    }, true);
  }

  /* ── 3. Subtle Micro-Sparkle Burst Emitter (Family C & Hero) ─────────── */
  function emitSparkBurst(x, y, color) {
    if (REDUCED_MOTION) return;
    const count = 5;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'mf-sparkle-dot';
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const dist = 14 + Math.random() * 16;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const size = 3 + Math.random() * 2;

      p.style.cssText = `
        position: fixed;
        left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: ${color || '#a855f7'};
        box-shadow: 0 0 6px ${color || '#c084fc'};
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%) scale(1);
        transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
        opacity: 0.9;
      `;
      document.body.appendChild(p);

      requestAnimationFrame(function () {
        p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.2)`;
        p.style.opacity = '0';
      });

      setTimeout(function () {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 500);
    }
  }

  document.addEventListener('click', function (e) {
    const sparkBtn = e.target.closest && e.target.closest('[data-btn-family="spark"], .mf-btn-spark, .ai-quick-btn');
    if (sparkBtn) {
      emitSparkBurst(e.clientX, e.clientY, '#c084fc');
    }
  }, true);

  /* ── 4. Clipboard & Toggle State Helpers ────────────────────────────── */
  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest && e.target.closest('[data-copy-trigger], .btn-copy, .copy-btn');
    if (copyBtn) {
      const textToCopy = copyBtn.getAttribute('data-copy-text') || window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).catch(function () {});
      }
      const origText = copyBtn.innerHTML;
      copyBtn.setAttribute('data-state', 'success');
      copyBtn.innerHTML = '<span>✓ Copied</span>';
      setTimeout(function () {
        copyBtn.removeAttribute('data-state');
        copyBtn.innerHTML = origText;
      }, 2000);
    }
  });

  /* ── 5. Global Initialization Helper ────────────────────────────────── */
  window.MyFolioButtons = {
    emitSpark: emitSparkBurst,
    refresh() {
      // Re-scan if dynamic content is rendered
      document.querySelectorAll('[data-copy-trigger]').forEach(function(b) {
        b.classList.add('mf-btn');
      });
    }
  };

  console.log('⚡ MyFolio Button Motion & Effects Engine active');
})();

/**
 * MyFolio Studio — Master Scroll & Cinematic World Orchestrator
 * Connects Lenis Smooth Scroll + GSAP ScrollTrigger + Three.js PBR Engine
 * Orchestrates continuous bidirectional camera travel and HTML narrative reveals.
 */
(function(window) {
  'use strict';

  class ScrollMasterOrchestrator {
    constructor() {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.isMobile = window.innerWidth <= 768;

      this.scrollProgress = 0;
      this.currentChapterIndex = 0;
      this.clock = new THREE.Clock();

      this.init();
    }

    init() {
      // 1. Initialize Core Three.js Engine
      this.renderer = new window.CoreWorldRenderer('masterUniverseCanvas');
      if (!this.renderer || !this.renderer.scene) return;

      const aspect = window.innerWidth / window.innerHeight;
      this.cameraController = new window.CameraTimelineController(aspect);
      this.objectsManager = new window.SceneObjectsManager(
        this.renderer.scene,
        this.isMobile,
        this.isReducedMotion
      );

      // 2. Initialize Lenis Smooth Scroll
      this.initLenis();

      // 3. Initialize GSAP ScrollTrigger Master Timeline
      this.initScrollTrigger();

      // 4. Bind Window Events
      window.addEventListener('resize', this.handleResize.bind(this), { passive: true });

      // 5. Start Render Animation Loop
      this.animate = this.renderLoop.bind(this);
      requestAnimationFrame(this.animate);
    }

    initLenis() {
      if (typeof Lenis !== 'undefined' && !this.isReducedMotion) {
        try {
          this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.4,
            infinite: false
          });

          window.__folioLenis = this.lenis;

          // Synchronize Lenis with GSAP ScrollTrigger
          if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
            this.lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
              this.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
          }
        } catch (e) {
          console.warn('[ScrollMasterOrchestrator] Lenis init skipped:', e);
        }
      }
    }

    initScrollTrigger() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback native scroll listener if CDN is delayed
        window.addEventListener('scroll', () => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          this.scrollProgress = max > 0 ? (window.scrollY / max) : 0;
          this.updateNarrativeChapters(this.scrollProgress);
        }, { passive: true });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // Master Scroll Track Trigger
      const track = document.getElementById('journeyScrollWrapper') || document.body;

      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: (self) => {
          this.scrollProgress = self.progress;

          // Update Top Progress Bar
          const bar = document.getElementById('scroll-progress-indicator');
          if (bar) {
            bar.style.width = (self.progress * 100).toFixed(1) + '%';
          }

          // Narrative Chapter State Management
          this.updateNarrativeChapters(self.progress);
        }
      });
    }

    updateNarrativeChapters(progress) {
      const p = Math.max(0, Math.min(1, progress));

      // 10 Narrative Chapters:
      // 0: Hero (0.00 - 0.12)
      // 1: The Problem (0.12 - 0.24)
      // 2: The Solution / Convergence (0.24 - 0.36)
      // 3: AI Transformation & Synthesis (0.36 - 0.48)
      // 4: The Living World Hub (0.48 - 0.60)
      // 5: Project Planetoids (0.60 - 0.70)
      // 6: Skill Network & GitHub Mountain (0.70 - 0.80)
      // 7: Experience Corridor & Achievements (0.80 - 0.88)
      // 8: Living Universes Gateway (0.88 - 0.94)
      // 9: Final Climax Departure (0.94 - 1.00)
      const chapterRanges = [
        [0.00, 0.12],
        [0.12, 0.24],
        [0.24, 0.36],
        [0.36, 0.48],
        [0.48, 0.60],
        [0.60, 0.70],
        [0.70, 0.80],
        [0.80, 0.88],
        [0.88, 0.94],
        [0.94, 1.00]
      ];

      let activeIndex = 0;
      for (let i = 0; i < chapterRanges.length; i++) {
        if (p >= chapterRanges[i][0] && p <= chapterRanges[i][1]) {
          activeIndex = i;
          break;
        }
      }

      this.currentChapterIndex = activeIndex;

      // Update PBR Lighting & Atmosphere
      const factor = (p - chapterRanges[activeIndex][0]) / (chapterRanges[activeIndex][1] - chapterRanges[activeIndex][0] || 1);
      this.renderer.setLightingForScene(activeIndex, factor);

      // Manage HTML Chapter Visibility (Strict single active chapter to prevent overlapping text)
      const chapters = document.querySelectorAll('.cinematic-narrative-chapter');
      chapters.forEach((el, idx) => {
        if (idx === activeIndex) {
          el.classList.add('chapter-active');
          el.setAttribute('aria-hidden', 'false');
        } else {
          el.classList.remove('chapter-active');
          el.setAttribute('aria-hidden', 'true');
        }
      });
    }

    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      const aspect = window.innerWidth / window.innerHeight;
      this.cameraController.handleResize(aspect);
    }

    renderLoop() {
      requestAnimationFrame(this.animate);

      const elapsedTime = this.clock.getElapsedTime();

      // 1. Update Camera along 3D Catmull Spline with Mouse Parallax
      this.cameraController.update(this.scrollProgress);

      // 2. Deterministically update all 3D Scene Objects
      this.objectsManager.update(this.scrollProgress, elapsedTime);

      // 3. Render WebGL Frame
      this.renderer.render(this.cameraController.camera);
    }
  }

  // Auto-boot when DOM and libraries are ready
  window.addEventListener('DOMContentLoaded', () => {
    window.__folioOrchestrator = new ScrollMasterOrchestrator();
  });

  window.ScrollMasterOrchestrator = ScrollMasterOrchestrator;
})(window);

/**
 * Universal Scroll Motion Engine (GSAP 3.x + ScrollTrigger)
 * Automatically choreographs 60-120 FPS scroll animations, staggered reveals,
 * parallax depth, and interactive 3D physics across all generated portfolio templates.
 */

class UniversalScrollMotion {
  /**
   * Injects GSAP, ScrollTrigger, and universal scroll animation choreography into any HTML bundle
   * @param {string} html Raw HTML document string
   * @param {string} templateId Template identifier for specialized theme accents
   * @returns {string} HTML with full scroll motion engine wired
   */
  static injectScrollMotion(html, templateId = 'cosmic-astronaut') {
    if (!html || typeof html !== 'string') return html;

    // Check if already injected
    if (html.includes('id="universal-scroll-motion-engine"')) return html;

    const themeColors = {
      'cosmic-astronaut': '#8b5cf6',
      'cyber-crystal': '#a855f7',
      'bioluminescent-wireframe': '#00f2fe',
      'botanical-woodcraft': '#d4a373',
      'bio-digital-fusion': '#00f2fe',
      'eco-tech-steampunk': '#10b981'
    };

    const accentColor = themeColors[templateId] || '#8b5cf6';

    const motionHeadAssets = `
  <!-- GSAP 3.12.5 & ScrollTrigger Core -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <style id="universal-scroll-motion-styles">
    /* Top Scroll Progress Indicator */
    #scroll-progress-indicator {
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3.5px;
      background: linear-gradient(90deg, ${accentColor}, #38bdf8, #ec4899);
      z-index: 100000;
      box-shadow: 0 0 14px ${accentColor}, 0 0 4px #ffffff;
      pointer-events: none;
      transition: width 0.08s linear;
    }

    /* Scroll Velocity Reactive Container */
    .scroll-velocity-item {
      will-change: transform;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Scroll Reveal Baseline */
    .scroll-reveal-init {
      opacity: 0;
      transform: translateY(32px);
      will-change: transform, opacity;
    }

    /* Smooth Floating Card Elevation */
    .project-card, .crystal-project-card, .bio-project-card, .wood-project-card, .fusion-project-card, .curio-case-card, .cosmic-project-card, .sanctuary-project-card, .white-crystal-card {
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, filter 0.35s ease;
      will-change: transform;
    }

    .project-card:hover, .crystal-project-card:hover, .bio-project-card:hover, .wood-project-card:hover, .fusion-project-card:hover, .curio-case-card:hover, .cosmic-project-card:hover, .sanctuary-project-card:hover, .white-crystal-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), 0 0 25px ${accentColor}44;
    }
  </style>
`;

    const motionScript = `
  <!-- Universal Scroll Progress Bar -->
  <div id="scroll-progress-indicator"></div>

  <!-- Universal GSAP ScrollTrigger & Real-Time Velocity Motion Choreographer -->
  <script id="universal-scroll-motion-engine">
    (function() {
      function initScrollAnimations() {
        var lastScrollTop = 0;
        var scrollVelocity = 0;
        var scrollTimeout;
        var ticking = false;

        // 1. Real-time Scroll Velocity & Direction Engine (Up & Down Physics)
        window.addEventListener('scroll', function() {
          var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          var delta = currentScroll - lastScrollTop;
          scrollVelocity = delta;
          lastScrollTop = Math.max(0, currentScroll);

          // Update Progress Indicator
          var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var scrolled = (height > 0) ? (winScroll / height) * 100 : 0;
          var bar = document.getElementById('scroll-progress-indicator');
          if (bar) bar.style.width = scrolled + '%';

          // Apply Dynamic Velocity Skew & Tilt to Cards on Scroll Up/Down
          if (!ticking) {
            window.requestAnimationFrame(function() {
              var clampedVelocity = Math.max(-25, Math.min(25, scrollVelocity));
              var skewAngle = clampedVelocity * 0.08;
              var scaleComp = 1 - Math.min(0.04, Math.abs(clampedVelocity) * 0.0012);

              var velocityElements = document.querySelectorAll('.project-card, .crystal-project-card, .bio-project-card, .wood-project-card, .fusion-project-card, .curio-case-card, .cosmic-project-card, .nano-banana-3d-hero, .sanctuary-project-card, .white-crystal-card');
              velocityElements.forEach(function(el) {
                el.style.transform = 'skewY(' + skewAngle + 'deg) scaleY(' + scaleComp + ')';
              });

              ticking = false;
            });
            ticking = true;
          }

          // Reset velocity skew smoothly when scrolling stops
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(function() {
            var velocityElements = document.querySelectorAll('.project-card, .crystal-project-card, .bio-project-card, .wood-project-card, .fusion-project-card, .curio-case-card, .cosmic-project-card, .nano-banana-3d-hero, .sanctuary-project-card, .white-crystal-card');
            velocityElements.forEach(function(el) {
              el.style.transform = 'skewY(0deg) scaleY(1)';
            });
          }, 120);
        }, { passive: true });

        // 2. GSAP & ScrollTrigger Animations
        if (typeof gsap === 'undefined') return;

        if (typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
        }

        var mm = gsap.matchMedia();

        mm.add("(min-width: 200px)", function() {
          // A. Continuous 3D Model Rotation on Scroll Up and Down
          var hero3D = document.querySelector('.nano-banana-3d-hero, .hero-3d-stage-container, .cosmic-hero-3d-wrapper');
          if (hero3D) {
            gsap.to(hero3D, {
              rotationY: 15,
              rotationZ: -3,
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
              }
            });
          }

          // B. Staggered Hero Entrance
          var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
          var heroBadge = document.querySelector('.cosmic-hero-badge, .crystal-status-pill, .wood-hero-badge, .bio-status-badge, .fusion-status-pill, .curio-brass-badge');
          var heroTitle = document.querySelector('h1, .cosmic-title-gradient, .crystal-glitch-title, .wood-title-gradient, .bio-hero-name, .fusion-hero-name');
          var heroTagline = document.querySelector('.cosmic-tagline, .crystal-hero-desc, .wood-hero-tagline, .bio-hero-bio, .fusion-hero-bio, .hero-bio');
          var heroCta = document.querySelector('.cosmic-cta-row, .crystal-hero-actions, .wood-hero-actions, .bio-hero-actions, .fusion-hero-actions, .hero-actions');

          if (heroBadge) heroTl.fromTo(heroBadge, { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6 });
          if (heroTitle) heroTl.fromTo(heroTitle, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3");
          if (heroTagline) heroTl.fromTo(heroTagline, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4");
          if (heroCta) heroTl.fromTo(heroCta, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, "-=0.3");

          // C. Continuous Parallax Scrub on All Section Headers
          gsap.utils.toArray('.cosmic-section-header, .crystal-section-header, .wood-section-header, .bio-section-header, .fusion-section-header, .curio-section-header, section h2').forEach(function(header) {
            gsap.fromTo(header,
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: header,
                  start: "top 88%",
                  toggleActions: "play none none none"
                }
              }
            );
          });

          // D. Staggered Project Cards Reveal with Continuous Scrub
          var projectCards = gsap.utils.toArray('.project-card, .curio-case-card, .crystal-project-card, .bio-project-card, .wood-project-card, .fusion-project-card, .cosmic-project-card, .sanctuary-project-card, .white-crystal-card');
          if (projectCards.length > 0) {
            ScrollTrigger.batch(projectCards, {
              start: "top 86%",
              onEnter: function(batch) {
                gsap.fromTo(batch,
                  { autoAlpha: 0, y: 50, scale: 0.95 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power2.out",
                    overwrite: "auto"
                  }
                );
              }
            });
          }

          // E. Skills Progress Bars Glide-in on Scroll
          gsap.utils.toArray('.crystal-skill-fill, .wood-skill-fill, .bio-skill-fill, .fusion-skill-fill, .cosmic-skill-fill, .skill-bar-fill').forEach(function(bar) {
            var targetWidth = bar.style.width || '85%';
            gsap.fromTo(bar,
              { width: "0%" },
              {
                width: targetWidth,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: bar,
                  start: "top 92%",
                  toggleActions: "play none none none"
                }
              }
            );
          });

          // F. Experience Timeline Nodes & Cards
          var timelineItems = gsap.utils.toArray('.crystal-timeline-item, .wood-timeline-item, .bio-timeline-item, .fusion-timeline-item, .curio-specimen-node, .cosmic-timeline-item, .timeline-item');
          if (timelineItems.length > 0) {
            ScrollTrigger.batch(timelineItems, {
              start: "top 88%",
              onEnter: function(batch) {
                gsap.fromTo(batch,
                  { autoAlpha: 0, x: -30 },
                  {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out"
                  }
                );
              }
            });
          }

          // G. Resume Dossier 3D Card & Details Elevation
          var resumeVisual = document.querySelector('.resume-3d-wrapper, .cosmic-about-visual-card, .resume-codex-container');
          if (resumeVisual) {
            gsap.fromTo(resumeVisual,
              { autoAlpha: 0, scale: 0.9, y: 40 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: "back.out(1.2)",
                scrollTrigger: {
                  trigger: resumeVisual,
                  start: "top 85%",
                  toggleActions: "play none none none"
                }
              }
            );
          }

          // H. Continuous Interactive 3D Parallax Drift for Background Layers
          gsap.to('.hero-canvas-container, .cosmic-hero-bg, .stars-layer, .matrix-grid-bg', {
            yPercent: 22,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2
            }
          });
        });
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
      } else {
        initScrollAnimations();
      }
    })();
  </script>
`;

    // Inject Head Assets
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${motionHeadAssets}\n</head>`);
    } else {
      html = `${motionHeadAssets}\n${html}`;
    }

    // Inject Body Script
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${motionScript}\n</body>`);
    } else {
      html = `${html}\n${motionScript}`;
    }

    return html;
  }
}

module.exports = { UniversalScrollMotion };

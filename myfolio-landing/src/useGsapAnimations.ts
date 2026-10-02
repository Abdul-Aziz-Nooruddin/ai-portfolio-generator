import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory('manual');
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export function useGsapAnimations() {
  useEffect(() => {
    // Respect accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    document.body.classList.add('gsap-ready');

    const ctx = gsap.context(() => {
      // =========================================================================
      // 1. Top Reading Scroll Progress Bar
      // =========================================================================
      let progressBar = document.getElementById('gsap-scroll-progress');
      if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'gsap-scroll-progress';
        progressBar.style.cssText =
          'position:fixed;top:0;left:0;height:3px;width:100%;background:linear-gradient(90deg, #75C5DE 0%, #22697C 50%, #8fe0fa 100%);z-index:99999;transform-origin:left center;transform:scaleX(0);pointer-events:none;box-shadow:0 0 10px rgba(117,197,222,0.6);';
        document.body.appendChild(progressBar);
      }

      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });

      // =========================================================================
      // 2. Responsive MatchMedia (Desktop Physics & Effects)
      // =========================================================================
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // --- A. Hero Stagger Entrance Sequence ---
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl
          .fromTo(
            '.hero-wordmark',
            { autoAlpha: 0, scale: 0.94, y: -25 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, delay: 0.1 }
          )
          .fromTo(
            '.hero-eyebrow',
            { autoAlpha: 0, y: -16 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            '-=0.7'
          )
          .fromTo(
            '.hero-headline .word-reveal',
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, stagger: 0.025, duration: 0.55 },
            '-=0.45'
          )
          .fromTo(
            '.hero-cta',
            { autoAlpha: 0, y: 26, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 },
            '-=0.3'
          )
          .fromTo(
            '.hero-side-note, .hero-bottom',
            { autoAlpha: 0, y: 15 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15 },
            '-=0.2'
          );

        // --- B. Smooth Parallax Scrub on Hero Art ---
        gsap.to('.hero-art', {
          yPercent: 18,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        // --- C. 3D Card Hover Physics with Specular Glare ---
        const tiltCards = document.querySelectorAll<HTMLElement>(
          '.template-card, .pricing-card, .audience-card, .publishing-preview, .features-section article'
        );

        tiltCards.forEach((card) => {
          card.style.transformStyle = 'preserve-3d';

          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            gsap.to(card, {
              rotateX,
              rotateY,
              y: -4,
              duration: 0.3,
              ease: 'power2.out',
              transformPerspective: 1000,
            });
          };

          const onLeave = () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              duration: 0.65,
              ease: 'elastic.out(1, 0.4)',
            });
          };

          card.addEventListener('mousemove', onMove);
          card.addEventListener('mouseleave', onLeave);
        });

        // --- D. Magnetic Button Physics ---
        const magneticElements = document.querySelectorAll<HTMLElement>(
          '.pill-button, .pricing-cta-btn, .visitor-button, .studio-link, .reveal-toggle'
        );

        magneticElements.forEach((btn) => {
          const onMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
            gsap.to(btn, { x, y, duration: 0.25, ease: 'power2.out' });
          };

          const onMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.35)' });
          };

          btn.addEventListener('mousemove', onMouseMove);
          btn.addEventListener('mouseleave', onMouseLeave);
        });

        // --- E. Process Visual (World Window) Scrub ---
        const worldWindow = document.querySelector('.world-window');
        if (worldWindow) {
          gsap.fromTo(
            worldWindow,
            { y: 50, scale: 0.94, rotateX: 4 },
            {
              y: 0,
              scale: 1,
              rotateX: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '.process-visual',
                start: 'top 85%',
                end: 'center center',
                scrub: 1.1,
              },
            }
          );
        }
      });

      // =========================================================================
      // 3. Staggered Reveals Across All Sections
      // =========================================================================

      // Section Headings & Eyebrows
      const sectionHeadings = gsap.utils.toArray<HTMLElement>(
        '.section-title, .ps-section-heading, .visitor-heading-row, .pricing-heading-row, .about-grid h2, .process-copy h2'
      );
      sectionHeadings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Section Number Badges (01 / THE IDEA, 02 / AUDIENCE, etc.)
      const sectionLabels = gsap.utils.toArray<HTMLElement>('.section-label');
      sectionLabels.forEach((label) => {
        gsap.fromTo(
          label,
          { autoAlpha: 0, x: -20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Bento Feature Cards Stagger
      gsap.fromTo(
        '.features-section article, .audience-card',
        { autoAlpha: 0, y: 40, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section, .audience-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered Template Cards
      gsap.fromTo(
        '.template-card',
        { autoAlpha: 0, y: 50, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.templates-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Process Steps Stagger
      gsap.fromTo(
        '.process-steps li',
        { autoAlpha: 0, x: -35 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered Pricing Cards
      gsap.fromTo(
        '.pricing-card',
        { autoAlpha: 0, y: 45, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Pricing Callout & Trust Bar Reveal
      gsap.fromTo(
        '.pricing-difference-callout, .pricing-trust-bar',
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.pricing-difference-callout',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // FAQ Accordion Stagger
      gsap.fromTo(
        '.faq-item',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Closing Hero Section Reveal
      gsap.fromTo(
        '.closing-section',
        { autoAlpha: 0, scale: 0.98, y: 30 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.closing-section',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Sync and recalculate triggers
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      document.body.classList.remove('gsap-ready');
      const bar = document.getElementById('gsap-scroll-progress');
      if (bar) bar.remove();
    };
  }, []);
}

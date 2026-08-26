---
name: gsap
description: Official GreenSock (GSAP 3.x) animation skills, ScrollTrigger best practices, performance guidelines, and responsive motion architecture.
---

# GreenSock (GSAP) Animation Intelligence Skill

Comprehensive guide and best practices for authoring high-performance 60–120 FPS animations using GSAP 3.x, ScrollTrigger, and WebGL integration.

---

## 1. Core Golden Rules of GSAP Performance

1. **Always Animate GPU Transform Properties**:
   - Use `x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`, and `autoAlpha`.
   - ❌ **NEVER** animate `top`, `left`, `margin`, `padding`, `width`, or `height` (triggers browser layout reflow).
2. **Use `autoAlpha` instead of `opacity`**:
   - `autoAlpha: 0` automatically sets `visibility: hidden`, preventing invisible elements from intercepting mouse clicks.
3. **Register Plugins Once**:
   ```javascript
   if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
     gsap.registerPlugin(ScrollTrigger);
   }
   ```
4. **Responsive Animation with `gsap.matchMedia()`**:
   - Always wrap complex desktop/mobile split triggers inside `gsap.matchMedia()`:
   ```javascript
   let mm = gsap.matchMedia();
   mm.add("(min-width: 768px)", () => {
     // Desktop parallax & 3D tilt
   });
   mm.add("(max-width: 767px)", () => {
     // Touch-friendly lightweight fades
   });
   ```

---

## 2. ScrollTrigger Best Practices

### A. Reveal on Scroll (Cards, Sections, Grids)
```javascript
gsap.utils.toArray('.project-card, .section-reveal').forEach((el) => {
  gsap.fromTo(el, 
    { autoAlpha: 0, y: 35 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});
```

### B. Smooth Scrubbed Parallax
```javascript
gsap.to('.hero-3d-bg', {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1.2
  }
});
```

---

## 3. Staggered Hero Entrance Sequencing

```javascript
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.fromTo('.hero-badge', { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6 })
  .fromTo('.hero-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.3")
  .fromTo('.hero-subtext', { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4")
  .fromTo('.hero-cta-btn', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.1 }, "-=0.3");
```

---

## 4. Magnetic Interactive Hover Physics

```javascript
document.querySelectorAll('.magnetic-target').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  });
});
```

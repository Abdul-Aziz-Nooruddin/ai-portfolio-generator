# LIBERA Web Design & Art Direction Standard

This rule is **MANDATORY** for all portfolio templates, landing pages, and web applications created or modified in MyFolio.

## 1. Visual Art Direction & Spatial Layout
- **Break Free from Generic Grids**: Avoid monotonous `<div>` card stacks with identical borders and icons. Use intentional asymmetry, varied card spans (e.g. 2-column feature spans, 1-column detail spans), and modular bento grids that reflect actual content weight.
- **Editorial Typography Scale**: Pair high-craft display fonts (`Syne`, `Cinzel`, `Cinzel Decorative`, `Playfair Display`, `Orbitron`, `Space Grotesk`) with ultra-legible body typography (`Plus Jakarta Sans`, `Inter`, `Spectral`, `IBM Plex Sans`) and technical monospace fonts (`JetBrains Mono`, `Fira Code`, `Space Mono`).
- **Harmonious Color Physics**: Build palettes around an anchor hue with deliberate light-depth ratios. Avoid raw primary colors. Use tailored HSL / HEX tokens with high-contrast foregrounds and ambient secondary glows.
- **Anti-AI-Slop Directive**: Reject predictable centered purple-and-blue gradients, unmotivated floating blobs, and generic glassmorphism. Every surface must have tactile substance (e.g., brushed titanium, weathered parchment, obsidian stone, frosted nautical glass, or copper traces).

## 2. Motion Choreography & Performance
- **Choreographed Easing**: All entrance reveals, scroll triggers, and parallax transitions must be timed with standard cubic-bezier easing (`power2.out`, `power3.inOut`, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **GPU Acceleration**: Animate only composited properties (`transform`, `opacity`, `filter`). Never animate layout properties (`width`, `height`, `top`, `left`, `margin`).
- **Contextual WebGL Justification**: Three.js/WebGL background scenes (particles, caustic light rays, starfields, wireframe meshes) must be contextually justified by the candidate's domain and aesthetic theme.
- **Accessibility & Reduced Motion**: Always respect `@media (prefers-reduced-motion: reduce)` by disabling canvas render loops, simplifying transitions to instant fades, and zeroing out rotational transforms.

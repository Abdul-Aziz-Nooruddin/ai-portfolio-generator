# Universal Motion, 3D Spatial & Scrollytelling Pipeline Standards

## Mandatory Plugin Stack
Every template generated across the platform must strictly incorporate and support the core motion and 3D visual stack:
- **`lenis`**: Smooth inertial scrolling with high-performance wheel dampening and touch interpolation.
- **`gsap` & `ScrollTrigger`**: Scroll-linked timelines, section pinning, staggered reveals, and velocity-responsive skew.
- **`motion`**: Spring physics for interactive affordances, magnetic button attraction, and smooth modal popups.
- **`three` & `@react-three/fiber` / `@react-three/drei`**: Declarative 3D scene graphs, lighting, shadows, and GLTF/GLB model rendering.
- **`postprocessing` & `@react-three/postprocessing`**: Cinematic shader passes (selective bloom, vignette, chromatic aberration).
- **`@theatre/core` & `@theatre/r3f`**: Scrollytelling animation sheets binding camera positions, lighting intensity, and 3D object rotation directly to scroll progress.

## Universal Scroll Engine Hook
All templates rendered through `TemplateRegistry.render(templateId, candidateProfile)` and `HtmlRenderer.render(blueprint, profile)` automatically receive the unified pipeline via `UniversalScrollMotion.injectScrollMotion(html, templateId)`.

### Core Pipeline Behavior:
1. **Lenis Initialization**:
   - Initialized with `smoothWheel: true` and linked to `gsap.ticker`.
   - `lenis.on('scroll', ScrollTrigger.update)` ensures zero lag between scroll position and GSAP triggers.
2. **Velocity Physics**:
   - Real-time scroll velocity applies dynamic micro-skew to project cards and 3D elements on fast scrolls, resetting cleanly upon resting.
3. **Interactive 3D Card Tilt**:
   - All `.project-card`, `.crystal-project-card`, `.abyss-chest-card`, and vault cards feature hardware-accelerated 3D tilt tracking cursor coordinates (`perspective(1000px) rotateX(...) rotateY(...)`).
4. **Scrollytelling Bridge**:
   - `window.__folioScrollytelling.bindCameraToScroll(camera, spline)` allows 3D camera fly-throughs tied to scroll depth.
5. **Accessibility**:
   - Automatically detects `prefers-reduced-motion: reduce`, instantly disabling smooth wheel and 3D rotations for compliant accessibility.

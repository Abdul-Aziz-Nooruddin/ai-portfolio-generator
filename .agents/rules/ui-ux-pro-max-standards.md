# UI/UX Pro Max Standards & Design Intelligence

This rule governs all UI/UX structure, hierarchy, accessibility, and micro-interactions across the MyFolio platform.

## 1. Structural Architecture & Hierarchy
- **Content-Driven Density**: Every template section must adapt proportionally to the candidate's actual data density. Sparse profiles must feel expansive and curated; dense profiles must feel structured and navigational without visual clutter.
- **Micro-Interactions**: Interactive elements must offer clear visual affordances on hover, focus, and active states:
  - Cards: Elevation lift (`translateY(-4px)` to `-8px`), border glow transition, and internal 3D asset steer.
  - Buttons: Radiant shimmer, scale micro-bounce (`scale(1.02)`), and high-contrast focus rings.
  - Modals / Popups: Backdrop blur, spring entrance animation, and trap focus accessibility.
- **Accessibility Baseline**: Strict compliance with WCAG 2.2 AAA standards:
  - Minimum 4.5:1 text-to-background contrast for body text; 3:1 for large display titles.
  - Visible keyboard `:focus-visible` outlines on all interactive elements.
  - Semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  - Screen-reader friendly alt attributes and ARIA labels on dynamic modals and icon buttons.

## 2. 3D Live Images & Spatial Object Standards
- **Nano Banana High-Fidelity Prompting**: When generating 3D focal assets, use hyper-detailed procedural material descriptors (e.g., iridescent mother-of-pearl, sub-surface scattering translucent resin, brushed titanium, verdigris antique brass, glowing fiber-optic cabling).
- **Clean Alpha Extraction**: All generated 3D visuals must pass through clean alpha isolation (`rembg` / dark-studio matting) yielding authentic `_nobg.png` assets with zero halos, fringing, or clipping boxes.
- **Organic Float Dynamics**: 3D isolated assets must be styled with organic multi-axis CSS keyframe floats (`floatingAsset 6s ease-in-out infinite alternate`) and ambient drop-shadows tailored to the theme's lighting source.

## 3. Heuristic Decision Making for Unmentioned Features
When designing aspects not explicitly specified by the user:
- **Telemetry & Social Proof**: Automatically synthesize meaningful telemetry meters, project count badges, and verified credential pills that bind dynamically to parsed profile data.
- **Responsive Navigation**: Implement sleek sticky floating glass navbars with active section observers, smooth anchor scrolling, and mobile sliding hamburger drawers.
- **Dedicated Route Isolation**: Error states (404), success states, and modals must remain decoupled from the single-page scroll layout and served via dedicated handlers.

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

## 4. Mandatory Custom Typography Architecture (Strict Zero Repetitive Fonts Rule)
- **Zero Repetitive Typography**: Never reuse the same standard system fonts or default pairings (`Inter`, `Plus Jakarta Sans`, or `Syne`) across different portfolios.
- **Strict 3-Tier Font Hierarchy**: Every portfolio MUST load and apply a distinct, tailored 3-tier Google Fonts combination:
  1. **Expressive Display Masthead**: `Orbitron`, `Chakra Petch`, `Cinzel Decorative`, `Playfair Display`, `Syne`, `Syncopate`, `Teko`, `Bebas Neue`, `MedievalSharp`, `Rajdhani`, `Fraunces`, `Clash Display`.
  2. **Tailored Body Typeface**: `Space Grotesk`, `Instrument Serif`, `Spectral`, `IBM Plex Sans`, `Outfit`, `Manrope`, `Epilogue`, `Titillium Web`, `Exo 2`, `Newsreader`.
  3. **Precision Monospace Accents**: `Share Tech Mono`, `JetBrains Mono`, `Fira Code`, `Space Mono`, `IBM Plex Mono`, `Courier Prime`, `VT323`.
- **Persona Alignment**: The typographic tone must directly embody the candidate's professional universe:
  - Systems Architects & Bio-Engineers: `Chakra Petch` + `Space Grotesk` + `Share Tech Mono`
  - High-Finance & Cryptographic Protocol: `Cinzel Decorative` + `Spectral` + `Space Mono`
  - Deep Security & Cypherpunk Hackers: `VT323` + `Share Tech Mono` + `Fira Code`
  - Creative Directors & UX Architects: `Playfair Display` + `Instrument Serif` + `Courier Prime`
  - Climate Tech & Biophilic Founders: `Outfit` + `Plus Jakarta Sans` + `Fira Code`
  - Mechanical & CAD Engineers: `Space Grotesk` + `IBM Plex Sans` + `IBM Plex Mono`
  - Game Developers & Worldbuilders: `MedievalSharp` + `Cinzel` + `Cormorant Garamond`
- **Exhaustive Cycles**: Consecutive portfolio generations must rotate across these distinct typography archetypes with zero repetition until all are exhausted.


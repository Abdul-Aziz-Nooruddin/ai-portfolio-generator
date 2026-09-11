# Mandatory Template Addition Pipeline & Zero Hardcoded Content Rule

Whenever creating or adding a new visual template to the MyFolio platform:

1. **Split into Sections**: Break down the reference design into clean, distinct functional sections (Hero, About, Projects, Skills, Timeline/Experience, Resume/Education, Articles/Stream, Interactive Node, 404 Anomaly, Footer).
2. **Identify 3D Focal Elements & Backgrounds**: Separate foreground 3D models/holograms from the dynamic Three.js canvas and background environment.
3. **Mandatory 4-Step Asset Pipeline (Strict Zero Flat SVGs / Stick Figures Rule)**:
   - **Step A (Extract Reference)**: Crop the exact focal visual from the source portfolio design.
   - **Step B (Nano Banana 3D Recreation & Enhancement)**: Send the extracted reference to Nano Banana (`generate_image` with procedural prompt) to enhance and synthesize a brand-new, ultra-high-definition 3D asset with authentic spatial depth, procedural materials (subsurface scattering, brushed titanium, nacre, glowing neon), and cinematic lighting. Under NO circumstances should flat 2D SVGs, stickmen, or wireframe line drawings be used.
   - **Step C (Background Removal)**: Cleanly extract the alpha channel (`rembg` / dark-studio matting) yielding a transparent `_nobg.png` with zero halos or dark bounding boxes. Deploy to both `public/assets/designs/<theme>/` and `web/assets/designs/<theme>/`.
   - **Step D (Portfolio Insertion)**: Embed the transparent 3D asset into the portfolio template with multi-axis CSS floating keyframes, ambient glow, and dynamic data binding.
4. **Apple Canvas-Like Scrollytelling Standard**:
   - Hero and narrative stages must implement an Apple-style pinned canvas (`ScrollTrigger` with `pin: true` & smooth `scrub: 1.2`), driving 3D camera Z-axis fly-through and spatial transformations in tandem with sequenced narrative telemetry cards.
5. **Living Volumetric Backgrounds**:
   - Backgrounds cannot be plain empty black canvases with isolated revolving dots. They must feature volumetric depth: dynamic neural constellation networks with distance-threshold synaptic connecting lines, deep-field particle nebulae, or interactive caustics.
6. **Strict Zero Hardcoded Content**:
   - **Never display hardcoded template content in generated portfolios**.
   - Strictly bind candidate metadata (`data.name`, `data.title`, `data.bio`, `data.skills`, `data.projects`, `data.experience`, `data.education`, etc.).
   - Dynamically render lists without placeholder mock data leakage.

# Mandatory Template Addition Pipeline & Zero Hardcoded Content Rule

Whenever creating or adding a new visual template to the MyFolio platform:

1. **Split into Sections**: Break down the reference design into clean, distinct functional sections (Hero, About, Projects, Skills, Timeline/Experience, Resume/Education, Articles/Stream, Interactive Node, 404 Anomaly, Footer).
2. **Identify 3D Focal Elements & Backgrounds**: Separate foreground 3D models/holograms from the dynamic Three.js canvas and background environment.
3. **Extract & Recreate with Nano Banana**:
   - Extract reference crops.
   - Recreate high-resolution 3D renders with Nano Banana (`generate_image`) with authentic 3D spatial depth, subsurface scattering materials, and cyber/theme lighting.
4. **Remove Background**:
   - Strip all backgrounds cleanly into alpha channel transparent PNGs (`_nobg.png`) using `rembg` / dark-studio matting.
   - Deploy to both `public/assets/designs/<theme>/` and `web/assets/designs/<theme>/`.
5. **Integrate into Template**:
   - Embed transparent 3D PNGs with CSS drop shadows, ambient glow, and micro-floating animations so they float seamlessly over the WebGL canvas.
6. **Strict Zero Hardcoded Content**:
   - **Never display hardcoded template content in generated portfolios**.
   - Strictly bind candidate metadata (`data.name`, `data.title`, `data.bio`, `data.skills`, `data.projects`, `data.experience`, `data.education`, etc.).
   - Dynamically render lists without placeholder mock data leakage.

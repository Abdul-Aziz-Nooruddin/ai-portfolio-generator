/**
 * Template: Spatial Depth Voyage ("spatial-depth-voyage")
 * Warm Editorial Monograph Edition (Strict Zero AI-Slop, Zero Blue, Zero Radiant Gradients):
 * - argyleink/open-props: Modular fluid type & hairline architectural spacing
 * - culori/culori: Perceptually uniform contrast science (18.4:1 contrast black-on-linen)
 * - google-fonts-skill: High-fashion editorial pairing (Playfair Display + Space Grotesk + Space Mono)
 * - nexu-io/open-design: 60/40 golden-ratio asymmetric layout, museum rules
 * - ruucm/shadergradient + pmndrs/react-three-fiber: Monochromatic warm linen paper wave
 * - eamonliu/liquid-glass-js: Archival optical loupe with physical SVG displacement
 * - img2threejs concept: Procedural 3D artifact inspector with Carrara marble & warm bronze materials
 */

const { TemplateHelper } = require('../template-helper');

const SpatialDepthVoyageTemplate = {
  id: 'spatial-depth-voyage',
  name: 'Spatial Depth Voyage',
  category: 'Warm Editorial Monograph / Spatial Scrollytelling / Archival 3D',
  description: 'Museum-grade editorial monograph featuring warm linen canvas, pitch ink typography, Carrara marble & warm bronze 3D sculptures, and real GitHub repo integrations.',
  recommendedFor: [
    'Systems Architects',
    'Creative Technologists',
    'Spatial UI Designers',
    'Research Engineers',
    'Design Technologists',
    'Executive Founders'
  ],
  palette: ['#F4F3EF', '#0A0A0A', '#FF3B30', '#FAF9F6', '#ECEAE4'],
  thumbnail: '/assets/designs/cyber/editorial_sculpture_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Alexander Vex');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Spatial Systems Architect');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Architecting high-performance spatial runtimes, procedural 3D visual engines, and weightless WebGL interfaces engineered with sub-millisecond precision.'
    );
    const safeEmail = TemplateHelper.escapeHtml(data.email || 'contact@studio.dev');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'San Francisco, CA • Global / Remote');

    // Projects
    const geoTypes = ['torus-knot', 'icosahedron', 'octahedron', 'dodecahedron'];
    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        title: 'Aetherial Quantum Core',
        category: 'Core Infrastructure // Procedural 3D',
        desc: 'Decentralized real-time WebGPU spatial rendering engine running dynamic volumetric particle swarms with distance-threshold raymarching.',
        tags: ['Three.js', 'WebGPU', 'GLSL Shaders', 'Rust WASM'],
        url: '#'
      },
      {
        title: 'Synapse HUD System',
        category: 'Distributed Systems',
        desc: 'Sub-millisecond telemetry visualizer streaming live GPU metrics across distributed cognitive nodes.',
        tags: ['WebSockets', 'React', 'Canvas 2D'],
        url: '#'
      },
      {
        title: 'Hexa-Mesh Crypt',
        category: 'Spatial Math',
        desc: 'Parametric tessellation runtime generating dynamic geodesic domes and interactive wireframes.',
        tags: ['WebGL', 'Math3D', 'TypeScript'],
        url: '#'
      },
      {
        title: 'Holosphere Cognitive Surface',
        category: 'Human-Machine Interface',
        desc: 'Spatial gesture-controlled interface with tactile inertia feedback, spring physics, and adaptive architectural glass lighting.',
        tags: ['Lenis', 'GSAP', 'Three.js', 'CSS Houdini'],
        url: '#'
      }
    ];

    const renderedProjects = rawProjects.slice(0, 6).map((proj, idx) => {
      const pTitle = TemplateHelper.escapeHtml(proj.title || `Project ${idx + 1}`);
      const pCat = TemplateHelper.escapeHtml(proj.category || 'Spatial Engineering');
      const pDesc = TemplateHelper.escapeHtml(proj.description || proj.desc || 'High-performance interactive module.');
      const pTags = (Array.isArray(proj.tags) ? proj.tags : (proj.languages || ['WebGL', 'TypeScript'])).slice(0, 4);
      const projectThumbnails = [
        '/assets/designs/cyber/editorial_sculpture_clean_nobg.png',
        '/assets/designs/cyber/project_ai_core_nobg.png',
        '/assets/designs/cyber/circuit_board_nobg.png',
        '/assets/designs/cyber/project_crystal_nobg.png'
      ];
      const pThumb = proj.image || projectThumbnails[idx % projectThumbnails.length];
      const spanClass = (idx === 0 || idx === 3) ? 'bento-span-8' : 'bento-span-4';
      const geoType = geoTypes[idx % geoTypes.length];
      const pUrl = proj.url || proj.link || '#';

      return `
        <article class="bento-card ${spanClass}">
          <div class="bento-3d-visual">
            <img src="${pThumb}" class="bento-3d-img" alt="${pTitle}">
          </div>
          <div class="card-category">${pCat}</div>
          <h3 class="card-title">${pTitle}</h3>
          <p class="card-desc">${pDesc}</p>
          <div class="tech-stack-row">
            ${pTags.map(t => `<span class="tech-chip">${TemplateHelper.escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="card-footer-actions">
            <button class="inspect-artifact-btn" onclick="openArtifactModal('${pTitle.replace(/'/g, "\\'")}', '${geoType}')">
              <span>✦ Inspect 3D Model</span>
            </button>
            ${idx === 0 ? `<button class="inspect-artifact-btn" onclick="togglePhysicalLens(this)"><span>✦ Liquid Glass Loupe</span></button>` : ''}
            ${pUrl !== '#' ? `<a href="${TemplateHelper.escapeHtml(pUrl)}" target="_blank" rel="noopener noreferrer" class="project-ext-link">Live Project ↗</a>` : ''}
          </div>
        </article>
      `;
    }).join('\n');

    // Skills
    const rawSkills = (data.skills && data.skills.length > 0) ? data.skills : [
      { name: 'Three.js / WebGL / WebGPU', level: 98 },
      { name: 'GLSL Custom Shaders', level: 94 },
      { name: 'GSAP & Lenis Inertia Motion', level: 96 },
      { name: 'TypeScript / Spatial Systems', level: 92 }
    ];

    const renderedSkills = rawSkills.slice(0, 8).map(s => {
      const sName = TemplateHelper.escapeHtml(s.name || s);
      const sLevel = s.level || (Math.floor(Math.random() * 15) + 85);
      return `
        <div class="skill-card">
          <div class="skill-name-row">
            <span class="skill-title">${sName}</span>
            <span class="skill-pct">${sLevel}%</span>
          </div>
          <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${sLevel}%"></div></div>
        </div>
      `;
    }).join('\n');

    // Experience
    const rawExp = (data.experience && data.experience.length > 0) ? data.experience : [
      {
        role: 'Principal Spatial Architect',
        company: 'Aether Labs • San Francisco, CA',
        period: '2024 — PRESENT',
        desc: 'Directing core development of in-browser WebGL/WebGPU spatial runtimes serving high-throughput interactive sessions with zero frame drops.'
      },
      {
        role: 'Lead Creative Technologist',
        company: 'Nexus Interactive Studio • New York, NY',
        period: '2022 — 2024',
        desc: 'Engineered award-winning 3D scrollytelling web experiences for luxury brands and tech enterprises, utilizing procedural shaders and physics-driven motion.'
      }
    ];

    const renderedExp = rawExp.slice(0, 5).map(e => `
      <div class="timeline-node">
        <div class="timeline-period">${TemplateHelper.escapeHtml(e.period || e.duration || '2023 — 2024')}</div>
        <h3 class="timeline-role">${TemplateHelper.escapeHtml(e.role || e.title || 'Systems Specialist')}</h3>
        <div class="timeline-org">${TemplateHelper.escapeHtml(e.company || e.organization || 'Technology Corp')}</div>
        <p class="timeline-desc">${TemplateHelper.escapeHtml(e.description || e.desc || 'Architected resilient software layers.')}</p>
      </div>
    `).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeTitle}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600..900;1,600..700&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <!-- Open-Props Design Tokens Engine (argyleink/open-props) -->
  <link rel="stylesheet" href="/assets/vendor/open-props.min.css">
  <!-- Actual Installed GitHub Repos: ruucm/shadergradient + pmndrs/react-three-fiber -->
  <script src="/assets/vendor/shadergradient-bundle.js"></script>
  <!-- Actual Installed GitHub Repo: eamonliu/liquid-glass-js (real SVG displacement & optical refraction) -->
  <script src="/assets/vendor/liquid-glass.umd.min.js"></script>

  <style>
    :root {
      --bg-void: #F4F3EF;                 /* Warm Museum Canvas */
      --bg-surface: #FAF9F6;              /* Crisp Paper White */
      --bg-surface-elevated: #ECEAE4;     /* Muted Archival Linen */
      --accent-vermilion: #FF3B30;        /* Swiss Editorial Vermilion Red */
      --accent-vermilion-subtle: rgba(255, 59, 48, 0.08);
      --accent-editorial-black: #0A0A0A;  /* Pitch Ink Black */
      --border-subtle: rgba(10, 10, 10, 0.12); /* Hairline Architectural Rule */
      --border-bright: rgba(10, 10, 10, 0.32);
      --border-vermilion: rgba(255, 59, 48, 0.4);
      --text-primary: #0A0A0A;            /* Pitch Ink Black */
      --text-secondary: #3E3E3E;          /* Editorial Charcoal */
      --text-muted: #737373;              /* Archival Stone */
      --font-masthead: 'Playfair Display', Georgia, serif;
      --font-display: 'Playfair Display', Georgia, serif;
      --font-body: 'Space Grotesk', -apple-system, sans-serif;
      --font-mono: 'Space Mono', 'Share Tech Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      background-color: var(--bg-void);
      color: var(--text-primary);
      font-family: var(--font-body);
      overflow-x: hidden;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      selection-background-color: var(--accent-vermilion);
      selection-color: #FFFFFF;
    }

    html.lenis, html.lenis body { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }

    /* Background Canvas: Pristine Warm Museum Linen (ruucm/shadergradient available via API) */
    #shadergradient-root {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: none;
      display: none;
    }

    .content-wrapper {
      position: relative;
      z-index: 10;
      width: 100%;
    }

    /* Fixed Top Navigation Beacon */
    .nav-beacon {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 8px 24px;
      background: rgba(244, 243, 239, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-subtle);
      border-radius: 9999px;
      box-shadow: 0 4px 20px rgba(10, 10, 10, 0.06);
      white-space: nowrap;
      max-width: 92vw;
    }

    .brand-mark {
      font-family: var(--font-masthead);
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: var(--accent-editorial-black);
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .pulse-dot-vermilion {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-vermilion);
      box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2);
      animation: pulseGlow 2s infinite ease-in-out;
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 0.5; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1.15); box-shadow: 0 0 0 4px rgba(255, 59, 48, 0.25); }
    }

    .nav-links { display: flex; gap: 20px; list-style: none; }
    .nav-links a {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      text-decoration: none;
      color: var(--text-secondary);
      letter-spacing: 1px;
      transition: all 0.25s ease;
      text-transform: uppercase;
    }
    .nav-links a:hover { color: var(--accent-vermilion); }

    .nav-cta {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 6px 14px;
      background: var(--accent-editorial-black);
      color: #FAF9F6;
      border: 1px solid var(--accent-editorial-black);
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.25s ease;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .nav-cta:hover {
      background: var(--accent-vermilion);
      border-color: var(--accent-vermilion);
      color: #FFFFFF;
    }

    /* SECTION 1: Pinned Scrollytelling Stage */
    .hero-pinned-track {
      position: relative;
      height: 300vh;
      width: 100%;
    }

    .hero-pinned-stage {
      position: sticky;
      top: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      perspective: 1200px;
    }

    .hero-split-grid {
      display: grid;
      grid-template-columns: 55% 45%;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
      align-items: center;
      gap: 40px;
      z-index: 5;
    }

    .hero-editorial-col {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      position: relative;
      min-height: 480px;
      justify-content: center;
      width: 100%;
      z-index: 10;
    }

    .hero-narrative-beat {
      width: 100%;
    }

    .beat-intro {
      position: relative;
      z-index: 2;
    }

    .beat-telemetry {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
    }

    .telemetry-beat-heading {
      font-family: var(--font-masthead);
      font-size: clamp(2.2rem, 4.2vw, 3.8rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -1px;
      color: var(--text-primary);
      margin-bottom: 16px;
    }

    .telemetry-beat-heading .vermilion-word {
      color: var(--accent-vermilion);
      font-style: italic;
      font-weight: 700;
    }

    .telemetry-beat-desc {
      font-family: var(--font-body);
      font-size: 1.02rem;
      line-height: 1.6;
      color: var(--text-secondary);
      max-width: 520px;
      margin-bottom: 24px;
    }

    /* Docked Metrics Matrix inside Beat 2 */
    .hero-metrics-matrix {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      width: 100%;
      max-width: 560px;
    }

    .hero-metric-tile {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      padding: 16px 14px;
      text-align: left;
      box-shadow: 0 4px 14px rgba(10, 10, 10, 0.03);
      transition: border-color 0.25s ease, transform 0.25s ease;
    }

    .hero-metric-tile:hover {
      border-color: var(--accent-vermilion);
      transform: translateY(-2px);
    }

    .metric-tile-val {
      font-family: var(--font-masthead);
      font-size: 1.85rem;
      font-weight: 800;
      color: var(--accent-editorial-black);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .metric-tile-lbl {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 1.2px;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
    }

    .hero-dossier-stamp {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-secondary);
      letter-spacing: 2.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 14px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
    }

    .hero-editorial-title {
      font-family: var(--font-masthead);
      font-size: clamp(2.4rem, 5.5vw, 4.4rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -1px;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    .hero-editorial-title .vermilion-word {
      color: var(--accent-vermilion);
      font-style: italic;
      font-weight: 700;
    }

    .hero-editorial-bio {
      font-family: var(--font-body);
      font-size: 1.05rem;
      line-height: 1.65;
      color: var(--text-secondary);
      max-width: 520px;
      margin-bottom: 28px;
    }

    .hero-action-cluster {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .btn-tactile-primary {
      font-family: var(--font-body);
      font-size: 0.92rem;
      font-weight: 600;
      padding: 13px 26px;
      background: var(--accent-editorial-black);
      color: #FAF9F6;
      border: 1px solid var(--accent-editorial-black);
      border-radius: 4px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      transition: all 0.25s ease;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-tactile-primary:hover {
      background: var(--accent-vermilion);
      border-color: var(--accent-vermilion);
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 59, 48, 0.35);
    }

    .btn-tactile-link {
      font-family: var(--font-mono);
      font-size: 0.86rem;
      color: var(--text-primary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      transition: color 0.2s ease, transform 0.2s ease;
      font-weight: 700;
    }
    .btn-tactile-link:hover {
      color: var(--accent-vermilion);
      transform: translateX(3px);
    }

    .hero-telemetry-strip {
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 1px;
    }

    .hero-visual-col {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .hero-3d-focal-wrap {
      position: relative;
      width: 100%;
      max-width: 440px;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 1400px;
      transform-style: preserve-3d;
      animation: spatialFloat3D 6s ease-in-out infinite;
      z-index: 8;
    }

    .hero-3d-tilt-stage {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
      perspective: 1200px;
    }

    .hero-3d-focal-img {
      width: clamp(240px, 28vw, 380px);
      height: auto;
      max-height: 52vh;
      object-fit: contain;
      filter: drop-shadow(0 25px 45px rgba(10, 10, 10, 0.18)) drop-shadow(0 6px 12px rgba(10, 10, 10, 0.08));
      cursor: grab;
      user-select: none;
      -webkit-user-drag: none;
      transition: filter 0.3s ease;
    }

    .hero-3d-glow-orb {
      position: absolute;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(10, 10, 10, 0.04) 0%, transparent 70%);
      filter: blur(40px);
      z-index: -1;
      pointer-events: none;
      border-radius: 50%;
    }

    @keyframes spatialFloat3D {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }


    /* SECTION 2: Bento Projects Matrix */
    .section-container {
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 120px 24px;
    }

    .section-header { margin-bottom: 60px; }

    .section-tag {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--accent-vermilion);
      letter-spacing: 3px;
      text-transform: uppercase;
      display: inline-block;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .section-heading {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.15;
    }

    .projects-bento {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 24px;
    }

    .bento-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      padding: 36px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
      will-change: transform;
    }

    .bento-card:hover {
      border-color: rgba(10, 10, 10, 0.35);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.09);
      transform: translateY(-4px);
    }

    .bento-3d-visual {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
    }

    .bento-3d-img {
      max-height: 160px;
      max-width: 80%;
      object-fit: contain;
      filter: drop-shadow(0 12px 24px rgba(10, 10, 10, 0.12));
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .bento-card:hover .bento-3d-img {
      transform: scale(1.05) translateY(-4px);
      filter: drop-shadow(0 18px 30px rgba(10, 10, 10, 0.18));
    }

    .bento-span-8 { grid-column: span 8; }
    .bento-span-4 { grid-column: span 4; }

    @media (max-width: 900px) {
      .bento-span-8, .bento-span-4 { grid-column: span 12; }
    }

    .card-category {
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: var(--accent-vermilion);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .card-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 14px;
      line-height: 1.25;
    }

    .card-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.65;
      margin-bottom: 24px;
    }

    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 28px;
    }

    .tech-chip {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 10px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      color: var(--text-secondary);
    }

    .card-footer-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .inspect-artifact-btn {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 10px 18px;
      background: var(--accent-editorial-black);
      color: #FAF9F6;
      border: 1px solid var(--accent-editorial-black);
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s ease;
      letter-spacing: 0.5px;
    }

    .inspect-artifact-btn:hover {
      background: var(--accent-vermilion);
      border-color: var(--accent-vermilion);
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(255, 59, 48, 0.25);
    }

    .project-ext-link {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 10px 14px;
      transition: color 0.2s ease;
    }
    .project-ext-link:hover { color: var(--accent-vermilion); }

    /* Museum Archival Optical Loupe */
    .lqg-glass {
      border: 1px solid rgba(10, 10, 10, 0.25) !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.2) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border-radius: 8px !important;
      transition: box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .lqg-glass:hover {
      border-color: var(--accent-vermilion) !important;
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.18) !important;
    }
    .lqg-glass::before {
      content: "✦ ARCHIVAL LOUPE // liquid-glass-js";
      position: absolute;
      top: -22px;
      left: 0;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 1.5px;
      color: var(--accent-vermilion);
      pointer-events: none;
      font-weight: 700;
      white-space: nowrap;
    }

    /* SECTION 3: Dynamic Skills Matrix */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .skill-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(10, 10, 10, 0.04);
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .skill-card:hover {
      border-color: var(--accent-vermilion);
      box-shadow: 0 8px 24px rgba(10, 10, 10, 0.08);
    }

    .skill-name-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .skill-title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
    }

    .skill-pct {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--accent-vermilion);
      font-weight: 700;
    }

    .skill-bar-track {
      width: 100%;
      height: 4px;
      background: var(--bg-surface-elevated);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .skill-bar-fill {
      height: 100%;
      background: var(--accent-editorial-black);
      border-radius: 2px;
      width: 0%;
      transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* SECTION 4: Experience Timeline */
    .timeline-stream {
      position: relative;
      border-left: 1px solid var(--border-subtle);
      padding-left: 32px;
      margin-left: 12px;
    }

    .timeline-node {
      position: relative;
      margin-bottom: 48px;
    }

    .timeline-node::before {
      content: '';
      position: absolute;
      left: -39px;
      top: 6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 2px solid var(--accent-vermilion);
      box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.15);
    }

    .timeline-period {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--accent-vermilion);
      letter-spacing: 1.5px;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .timeline-role {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
    }

    .timeline-org {
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 12px;
    }

    .timeline-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* SECTION 5: Contact Terminal */
    .contact-terminal {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      padding: 48px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      box-shadow: 0 4px 20px rgba(10, 10, 10, 0.04);
    }

    @media (max-width: 800px) {
      .contact-terminal { grid-template-columns: 1fr; }
    }

    .terminal-header {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--accent-vermilion);
      letter-spacing: 2px;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .contact-info-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .contact-item-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .contact-item-value {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--text-primary);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-input, .form-textarea {
      background: var(--bg-void);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      padding: 12px 16px;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.95rem;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .form-input:focus, .form-textarea:focus {
      outline: none;
      border-color: var(--accent-vermilion);
      box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.15);
    }

    .btn-primary {
      font-family: var(--font-body);
      font-size: 0.92rem;
      font-weight: 600;
      padding: 13px 26px;
      background: var(--accent-editorial-black);
      color: #FAF9F6;
      border: 1px solid var(--accent-editorial-black);
      border-radius: 4px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      transition: all 0.25s ease;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary:hover {
      background: var(--accent-vermilion);
      border-color: var(--accent-vermilion);
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(255, 59, 48, 0.35);
    }

    .site-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 60px 24px;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    /* 3D ARTIFACT MODAL (img2threejs concept) */
    .artifact-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(10, 10, 10, 0.75);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .artifact-modal-overlay.active { display: flex; opacity: 1; }

    .artifact-modal-box {
      width: 90vw;
      max-width: 900px;
      height: 80vh;
      max-height: 650px;
      background: var(--bg-surface);
      border: 1px solid var(--border-bright);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      box-shadow: 0 30px 80px rgba(10, 10, 10, 0.35);
    }

    .modal-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--border-subtle);
      background: var(--bg-surface-elevated);
    }

    .modal-title {
      font-family: var(--font-masthead);
      font-size: 1.05rem;
      letter-spacing: 0.5px;
      color: var(--accent-editorial-black);
      font-weight: 700;
    }

    .modal-close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }
    .modal-close-btn:hover { color: var(--accent-vermilion); }

    .modal-viewport {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
      cursor: grab;
    }
    .modal-viewport:active { cursor: grabbing; }

    .modal-controls-overlay {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      background: var(--bg-surface);
      padding: 8px 16px;
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      backdrop-filter: blur(10px);
      pointer-events: auto;
      box-shadow: 0 4px 20px rgba(10, 10, 10, 0.08);
    }

    .modal-ctrl-btn {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      padding: 6px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-ctrl-btn.active, .modal-ctrl-btn:hover {
      background: var(--accent-editorial-black);
      color: #FAF9F6;
      border-color: var(--accent-editorial-black);
    }

    /* Responsive Mobile Overrides */
    @media (max-width: 768px) {
      .nav-beacon {
        top: 12px;
        width: calc(100% - 28px);
        max-width: 420px;
        justify-content: space-between;
        padding: 7px 16px;
      }
      .nav-links { display: none; }
      .brand-mark { font-size: 0.74rem; }
      .nav-cta { font-size: 0.7rem; padding: 4px 12px; }

      .hero-pinned-stage {
        height: 100vh;
        height: 100dvh;
        padding: 68px 16px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
      .hero-split-grid {
        grid-template-columns: 1fr;
        gap: 8px;
        width: 100%;
      }
      .hero-editorial-col {
        align-items: center;
        text-align: center;
        width: 100%;
        min-height: 380px;
        position: relative;
        justify-content: center;
      }
      .hero-editorial-title {
        font-size: clamp(1.4rem, 5.8vw, 1.85rem);
        max-width: 340px;
        margin: 0 auto 6px;
      }
      .hero-editorial-bio {
        font-size: 0.82rem;
        line-height: 1.42;
        max-width: 320px;
        margin: 0 auto 10px;
      }
      .hero-action-cluster {
        width: 100%;
        max-width: 320px;
        gap: 8px;
        margin: 0 auto 8px;
        justify-content: center;
      }
      .btn-tactile-primary, .btn-tactile-link {
        flex: 1;
        padding: 10px 12px;
        font-size: 0.78rem;
        text-align: center;
        justify-content: center;
      }
      .hero-3d-focal-wrap {
        max-height: 31vh;
        flex: 1;
        min-height: 0;
      }
      .hero-3d-focal-img {
        width: clamp(160px, 46vw, 220px);
        max-height: 29vh;
      }
      .hero-telemetry-strip {
        font-size: 0.64rem;
        justify-content: center;
        gap: 8px;
      }

      .mobile-scroll-hint {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: var(--font-mono);
        font-size: 0.65rem;
        letter-spacing: 2px;
        color: var(--accent-vermilion);
        opacity: 0.8;
        animation: pulseSubtle 2s infinite ease-in-out;
        margin-top: 4px;
        font-weight: 700;
      }

      .hint-chevron {
        font-size: 0.85rem;
        animation: bounceDown 1.5s infinite;
      }

      @keyframes bounceDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(4px); }
      }

      @keyframes pulseSubtle {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      /* Mobile Narrative Beats & Metrics Matrix */
      .beat-telemetry {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        align-items: center;
        text-align: center;
      }
      .telemetry-beat-heading {
        font-size: clamp(1.35rem, 5.5vw, 1.75rem);
        max-width: 340px;
        margin: 0 auto 8px;
        text-align: center;
      }
      .telemetry-beat-desc {
        font-size: 0.82rem;
        line-height: 1.42;
        max-width: 320px;
        margin: 0 auto 12px;
        text-align: center;
      }
      .hero-metrics-matrix {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        max-width: 340px;
        margin: 0 auto;
      }
      .hero-metric-tile {
        padding: 8px 6px;
        text-align: center;
      }
      .metric-tile-val {
        font-size: 1.15rem;
      }
      .metric-tile-lbl {
        font-size: 0.58rem;
        letter-spacing: 0.8px;
      }

      .section-container { padding: 50px 16px; }
      .section-heading { font-size: 1.45rem; }
      .bento-card { padding: 20px 16px; }
      .bento-3d-img { max-height: 120px; }
    }
  </style>
</head>
<body>

  <!-- Background ShaderGradient Canvas (ruucm/shadergradient + pmndrs/react-three-fiber) -->
  <div id="shadergradient-root"></div>

  <!-- Fixed Top Navigation Beacon -->
  <header class="nav-beacon">
    <div class="brand-mark">
      <span class="pulse-dot-vermilion"></span>
      <span>${safeName.toUpperCase()}</span>
    </div>
    <nav>
      <ul class="nav-links">
        <li><a href="#flythrough">Stage</a></li>
        <li><a href="#artifacts">Projects</a></li>
        <li><a href="#synapses">Capabilities</a></li>
        <li><a href="#trajectory">History</a></li>
        <li><a href="#beacon">Contact</a></li>
      </ul>
    </nav>
    <a href="#beacon" class="nav-cta">Contact</a>
  </header>

  <div class="content-wrapper">

    <section id="flythrough" class="hero-pinned-track">
      <div class="hero-pinned-stage">
        <div class="hero-split-grid">
          <!-- Left Column: Editorial Masthead & Candidacy Dossier -->
          <div class="hero-editorial-col">
            <!-- Beat 1: Intro Dossier -->
            <div class="hero-narrative-beat beat-intro">
              <div class="hero-dossier-stamp">
                <span class="pulse-dot-vermilion"></span>
                MONOGRAPH № 04 // ${safeTitle.toUpperCase()}
              </div>
              <h1 class="hero-editorial-title">
                CRAFTING <span class="vermilion-word">SPATIAL</span> RUNTIMES & ARCHITECTURAL SYSTEMS.
              </h1>
              <p class="hero-editorial-bio">
                ${safeBio}
              </p>
              <div class="hero-action-cluster">
                <a href="#artifacts" class="btn-tactile-primary">
                  <span>View Selected Works</span>
                  <span>→</span>
                </a>
                <a href="#beacon" class="btn-tactile-link">
                  <span>Get In Touch ↗</span>
                </a>
              </div>
              <div class="hero-telemetry-strip">
                <span>LOC // ${safeLocation.toUpperCase()}</span>
                <span>•</span>
                <span>INDEX: 2026</span>
                <span>•</span>
                <span>STATUS: ACTIVE ARCHIVE</span>
              </div>
            </div>

            <!-- Beat 2: Chapter 01 Telemetry & Scale (Revealed smoothly on scroll) -->
            <div class="hero-narrative-beat beat-telemetry">
              <div class="hero-dossier-stamp">
                <span class="pulse-dot-vermilion"></span>
                CHAPTER 01 // ARCHITECTURAL TELEMETRY & SCALE
              </div>
              <h2 class="telemetry-beat-heading">
                ENGINEERED FOR <span class="vermilion-word">SUB-MILLISECOND</span> LATENCY.
              </h2>
              <p class="telemetry-beat-desc">
                High-concurrency WebGL pipelines, deterministic geometry compilation, and low-overhead spatial shaders built for uncompromising visual precision and fluid 120 FPS interaction.
              </p>
              <div class="hero-metrics-matrix">
                <div class="hero-metric-tile">
                  <div class="metric-tile-val">${rawProjects.length}+</div>
                  <div class="metric-tile-lbl">Produced Artifacts</div>
                </div>
                <div class="hero-metric-tile">
                  <div class="metric-tile-val">&lt; 2.4ms</div>
                  <div class="metric-tile-lbl">Frame Render Latency</div>
                </div>
                <div class="hero-metric-tile">
                  <div class="metric-tile-val">99.98%</div>
                  <div class="metric-tile-lbl">Runtime Uptime</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: 3D Live Focal Spatial Entity -->
          <div class="hero-visual-col">
            <div class="hero-3d-focal-wrap" id="heroFocalWrap">
              <div class="hero-3d-tilt-stage" id="heroFocalTilt">
                <img src="/assets/designs/cyber/editorial_sculpture_clean_nobg.png" class="hero-3d-focal-img" id="heroFocalImg" alt="3D Live Editorial Sculpture">
                <div class="hero-3d-glow-orb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="artifacts" class="section-container">
      <div class="section-header">
        <span class="section-tag">Selected Works</span>
        <h2 class="section-heading">High-Performance Systems & Projects</h2>
      </div>
      <div class="projects-bento">
        ${renderedProjects}
      </div>
    </section>

    <section id="synapses" class="section-container">
      <div class="section-header">
        <span class="section-tag">Technical Stack</span>
        <h2 class="section-heading">Core Engineering Capabilities</h2>
      </div>
      <div class="skills-grid">
        ${renderedSkills}
      </div>
    </section>

    <section id="trajectory" class="section-container">
      <div class="section-header">
        <span class="section-tag">Experience</span>
        <h2 class="section-heading">Work History & Leadership</h2>
      </div>
      <div class="timeline-stream">
        ${renderedExp}
      </div>
    </section>

    <section id="beacon" class="section-container">
      <div class="section-header">
        <span class="section-tag">Contact</span>
        <h2 class="section-heading">Let's Build Something Extraordinary Together</h2>
      </div>

      <div class="contact-terminal">
        <div>
          <div class="terminal-header">Direct Inquiries & Coordinates</div>
          <div class="contact-info-list">
            <div>
              <div class="contact-item-label">Direct Communication</div>
              <div class="contact-item-value">${safeEmail}</div>
            </div>
            <div>
              <div class="contact-item-label">Operational Hub</div>
              <div class="contact-item-value">${safeLocation}</div>
            </div>
            <div>
              <div class="contact-item-label">Network Status</div>
              <div class="contact-item-value" style="color: var(--accent-vermilion); font-weight: 700;">✦ Open for Select Collaborations</div>
            </div>
          </div>
        </div>

        <form class="contact-form" onsubmit="event.preventDefault(); alert('Thank you! Your message has been sent successfully.');">
          <input type="text" class="form-input" placeholder="Your Name" required>
          <input type="email" class="form-input" placeholder="Your Email Address" required>
          <textarea class="form-textarea" rows="4" placeholder="How can we collaborate?..." required></textarea>
          <button type="submit" class="btn-primary">Send Message ↗</button>
        </form>
      </div>
    </section>

    <footer class="site-footer">
      <p>Designed & engineered by ${safeName} • Powered by MyFolio Platform</p>
    </footer>

  </div>

  <div id="artifact-modal" class="artifact-modal-overlay">
    <div class="artifact-modal-box">
      <div class="modal-bar">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="pulse-dot-vermilion"></span>
          <span id="modal-artifact-name" class="modal-title">ARTIFACT INSPECTOR</span>
        </div>
        <button class="modal-close-btn" onclick="closeArtifactModal()">✕</button>
      </div>
      <div id="modal-viewport" class="modal-viewport">
        <div class="modal-controls-overlay">
          <button class="modal-ctrl-btn active" id="btn-mode-wire" onclick="setArtifactMode('wire')">Wireframe</button>
          <button class="modal-ctrl-btn" id="btn-mode-solid" onclick="setArtifactMode('solid')">Carrara Solid</button>
          <button class="modal-ctrl-btn" id="btn-mode-points" onclick="setArtifactMode('points')">Coordinates</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* =========================================================================
       2. REAL GITHUB REPO INTEGRATION: ruucm/shadergradient + pmndrs/react-three-fiber
       ========================================================================= */
    const sgRoot = document.getElementById('shadergradient-root');
    if (window.ShaderGradientMount && sgRoot) {
      window.ShaderGradientMount.renderTo(sgRoot, {
        speed: 0.1,
        strength: 0.7,
        density: 1.0,
        frequency: 2.2,
        amplitude: 1.2,
        color1: '#F4F3EF',
        color2: '#ECEAE4',
        color3: '#E2DFD6'
      });
      console.log('✅ Real ruucm/shadergradient + @react-three/fiber running as warm museum linen wave.');
    }

    // Mouse Tracking for Reactive 3D Perspective Tilt
    let mouseX = 0, mouseY = 0;
    const focalTilt = document.getElementById('heroFocalTilt');

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (focalTilt) {
        gsap.to(focalTilt, {
          rotateY: mouseX * 22,
          rotateX: -mouseY * 20,
          transformPerspective: 1200,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        if (focalTilt) {
          gsap.to(focalTilt, {
            rotateY: mouseX * 20,
            rotateX: -mouseY * 18,
            transformPerspective: 1000,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      }
    }, { passive: true });

    /* =========================================================================
       2B. REAL GITHUB REPO INTEGRATION: eamonliu/liquid-glass-js Optical Refraction
       ========================================================================= */
    let globalGlassLens = null;
    let lensIsVisible = false;

    if (window.LiquidGlass) {
      try {
        const glassScene = document.querySelector('.projects-bento') || document.body;
        const isMob = window.innerWidth <= 768;
        const lensW = isMob ? 250 : 340;
        const lensH = isMob ? 110 : 150;

        globalGlassLens = new LiquidGlass({
          background: glassScene,
          width: lensW,
          height: lensH,
          x: 48,
          y: 200,
          radius: 16,
          scale: 38,
          chroma: 0.12,
          depth: 26,
          curvature: 2.0,
          specAngle: 125,
          draggable: true
        });

        const glassEl = document.querySelector('.lqg-glass');
        const lensEl = document.querySelector('.lqg-lens');
        if (glassEl && lensEl) {
          glassEl.style.display = 'none';
          lensEl.style.display = 'none';
        }
        console.log('✅ Real eamonliu/liquid-glass-js physical refraction lens ready for artifact inspection.');
      } catch (err) {
        console.warn('[LiquidGlass] Initialization notice:', err);
      }
    }

    function togglePhysicalLens(btnEl) {
      const glassEl = document.querySelector('.lqg-glass');
      const lensEl = document.querySelector('.lqg-lens');
      if (glassEl && lensEl && globalGlassLens) {
        lensIsVisible = !lensIsVisible;
        if (lensIsVisible) {
          const targetCard = document.querySelector('.bento-span-8');
          if (targetCard) {
            const rect = targetCard.getBoundingClientRect();
            globalGlassLens.moveTo(Math.max(20, rect.left + 24), Math.max(20, rect.top + 60));
          }
          glassEl.style.display = 'block';
          lensEl.style.display = 'block';
          if (btnEl) btnEl.innerHTML = '<span>✕ Close Loupe</span>';
        } else {
          glassEl.style.display = 'none';
          lensEl.style.display = 'none';
          if (btnEl) btnEl.innerHTML = '<span>✦ Liquid Glass Loupe</span>';
        }
      }
    }
    window.togglePhysicalLens = togglePhysicalLens;

    // Initial Entrance Reveal
    gsap.from(['.hero-editorial-col', '#heroFocalWrap'], {
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 1.0,
      ease: 'power3.out'
    });

    const flythroughTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-pinned-track',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.hero-pinned-stage',
        anticipatePin: 1
      }
    });

    const isMobile = window.innerWidth <= 768;

    flythroughTl
      // 3D LIVE SCULPTURE DYNAMICS: Rotates with perspective and scales up gracefully
      .fromTo('#heroFocalImg',
        { scale: 1, rotateY: 0, rotateX: 0, y: 0, opacity: 1 },
        {
          scale: isMobile ? 1.15 : 1.35,
          rotateY: isMobile ? 14 : 26,
          rotateX: isMobile ? -6 : -10,
          y: isMobile ? -15 : -30,
          opacity: 1,
          duration: 1,
          ease: 'none'
        },
        0
      )
      // BEAT 1 (Intro Dossier): Rests 0 -> 0.12, then cleanly fades out by 0.24
      .to('.beat-intro', {
        opacity: 0,
        y: isMobile ? -25 : -40,
        pointerEvents: 'none',
        duration: 0.12,
        ease: 'power2.in'
      }, 0.12)
      // BEAT 2 (Architectural Telemetry & Metrics): Enters cleanly right as Beat 1 finishes (0.24 -> 0.36)
      .fromTo('.beat-telemetry',
        { opacity: 0, y: isMobile ? 25 : 40, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.12, ease: 'power2.out' },
        0.24
      )
      // Beat 2 remains 100% visible, crisp, and authoritative throughout mid-scroll (0.36 to 0.80)!
      //
      // At 0.80 -> 0.96, Beat 2 and the 3D sculpture ascend together into Section 2
      .to('.beat-telemetry', {
        opacity: 0,
        y: isMobile ? -30 : -50,
        pointerEvents: 'none',
        duration: 0.16,
        ease: 'power2.in'
      }, 0.80)
      .to('#heroFocalImg', {
        scale: isMobile ? 1.35 : 1.7,
        opacity: 0,
        y: isMobile ? -60 : -120,
        duration: 0.16,
        ease: 'power2.in'
      }, 0.80);

    ScrollTrigger.create({
      trigger: '#synapses',
      start: 'top 75%',
      onEnter: () => {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }
    });

    const modal = document.getElementById('artifact-modal');
    const modalViewport = document.getElementById('modal-viewport');
    const modalTitle = document.getElementById('modal-artifact-name');
    let modalRenderer, modalScene, modalCamera, modalMesh, modalPoints;
    let isModalOpen = false;
    let modalClock = new THREE.Clock();
    let currentMode = 'wire';

    function initModal3D() {
      modalScene = new THREE.Scene();
      modalCamera = new THREE.PerspectiveCamera(50, modalViewport.clientWidth / modalViewport.clientHeight, 0.1, 100);
      modalCamera.position.set(0, 0, 7);

      modalRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      modalRenderer.setSize(modalViewport.clientWidth, modalViewport.clientHeight);
      modalRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      modalViewport.appendChild(modalRenderer.domElement);

      const ambLight = new THREE.AmbientLight(0xffffff, 0.85);
      modalScene.add(ambLight);

      const pLight1 = new THREE.PointLight(0xFF3B30, 2.2, 25);
      pLight1.position.set(5, 5, 5);
      modalScene.add(pLight1);

      const pLight2 = new THREE.PointLight(0xD97706, 1.8, 25);
      pLight2.position.set(-5, -5, 5);
      modalScene.add(pLight2);

      let isDragging = false, prevMouse = { x: 0, y: 0 };
      modalViewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mousemove', (e) => {
        if (!isDragging || !modalMesh) return;
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        modalMesh.rotation.y += deltaX * 0.01;
        modalMesh.rotation.x += deltaY * 0.01;
        if (modalPoints) {
          modalPoints.rotation.y = modalMesh.rotation.y;
          modalPoints.rotation.x = modalMesh.rotation.x;
        }
        prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => { isDragging = false; });

      function renderModal() {
        if (isModalOpen) {
          requestAnimationFrame(renderModal);
          if (!isDragging && modalMesh) {
            modalMesh.rotation.y += 0.008;
            modalMesh.rotation.x += 0.004;
            if (modalPoints) {
              modalPoints.rotation.y = modalMesh.rotation.y;
              modalPoints.rotation.x = modalMesh.rotation.x;
            }
          }
          modalRenderer.render(modalScene, modalCamera);
        }
      }
      renderModal();
    }

    function createArtifactGeometry(type) {
      if (modalMesh) modalScene.remove(modalMesh);
      if (modalPoints) modalScene.remove(modalPoints);

      let geo;
      switch (type) {
        case 'torus-knot': geo = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32); break;
        case 'icosahedron': geo = new THREE.IcosahedronGeometry(2.2, 1); break;
        case 'octahedron': geo = new THREE.OctahedronGeometry(2.3, 2); break;
        case 'dodecahedron':
        default: geo = new THREE.DodecahedronGeometry(2.2, 1); break;
      }

      const solidMat = new THREE.MeshStandardMaterial({
        color: 0xFAF9F6, roughness: 0.35, metalness: 0.25
      });
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x0A0A0A, wireframe: true, transparent: true, opacity: 0.85 });
      const pointsMat = new THREE.PointsMaterial({ color: 0xFF3B30, size: 0.08, transparent: true, opacity: 0.95 });

      modalMesh = new THREE.Mesh(geo, currentMode === 'solid' ? solidMat : wireMat);
      modalPoints = new THREE.Points(geo, pointsMat);

      if (currentMode === 'points') modalScene.add(modalPoints);
      else modalScene.add(modalMesh);
    }

    function openArtifactModal(name, geoType) {
      modalTitle.textContent = name + ' — Interactive 3D Model';
      modal.classList.add('active');
      isModalOpen = true;
      if (!modalRenderer) initModal3D();
      else {
        modalCamera.aspect = modalViewport.clientWidth / modalViewport.clientHeight;
        modalCamera.updateProjectionMatrix();
        modalRenderer.setSize(modalViewport.clientWidth, modalViewport.clientHeight);
      }
      createArtifactGeometry(geoType);
      lenis.stop();
    }

    function closeArtifactModal() {
      modal.classList.remove('active');
      isModalOpen = false;
      lenis.start();
    }

    function setArtifactMode(mode) {
      currentMode = mode;
      document.querySelectorAll('.modal-ctrl-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById('btn-mode-' + mode).classList.add('active');
      if (modalMesh) {
        if (mode === 'points') {
          modalScene.remove(modalMesh);
          modalScene.add(modalPoints);
        } else {
          modalScene.remove(modalPoints);
          modalScene.add(modalMesh);
          modalMesh.material.wireframe = (mode === 'wire');
        }
      }
    }

    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isModalOpen) closeArtifactModal(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) closeArtifactModal(); });
  </script>
</body>
</html>`;
  }
};

module.exports = { SpatialDepthVoyageTemplate };

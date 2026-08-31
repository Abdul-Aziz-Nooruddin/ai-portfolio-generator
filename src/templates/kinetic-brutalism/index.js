/**
 * Template: KINETIC BRUTALISM
 * Aesthetic: Neobrutalism • High-Contrast • Editorial Zine • Raw Wireframe • Kinetic & Loud
 * Palette: Harsh White (#FFFFFF) / Grid Cream (#FDFBF7), Acid Yellow (#DFFF00), Hot Magenta (#FF007F), Electric Cyan (#00FFFF), Pure Black (#000000).
 * Motifs: 3px-4px black borders, hard black drop shadows (no blur), scrolling marquee tape, sticker tags, shipping labels with barcodes, raw wireframe 3D polyhedrons, and receipt stubs.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const KineticBrutalismTemplate = {
  id: 'kinetic-brutalism',
  name: 'Kinetic Brutalism',
  category: 'Neobrutalism / Editorial Zine / Raw Wireframe',
  description: 'A loud, unapologetic Neobrutalist aesthetic inspired by printed zines, raw wireframes, and poster design. Thick solid black borders, hard shadows, marquee typography, and vibrant primary pops against stark white.',
  recommendedFor: ['Frontend Engineer', 'Creative Technologist', 'Full Stack Developer', 'Design Systems Architect', 'Brand & Web Engineer'],
  palette: ['#FFFFFF', '#DFFF00', '#FF007F', '#00FFFF', '#000000', '#FDFBF7'],

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location);
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const totalExp = data.experience?.length || 1;
    const totalProj = data.projects?.length || 6;
    const totalRepos = data.publicRepos ?? data.projects?.length ?? 6;

    // 03. Projects Cards
    const assignedArtworks = new Set(['/assets/3d/cosmic_astronaut_3d.jpg', '/assets/3d/pristine_glass_cube_workstation_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const cardBgColors = ['#FFFFFF', '#DFFF00', '#00FFFF', '#FF007F', '#FFFFFF', '#DFFF00'];
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const bgCol = cardBgColors[idx % cardBgColors.length];
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="brutal-black-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="brutal-proj-card" style="background-color: ${bgCol};" data-category="${TemplateHelper.escapeHtml(p.category || 'Engineering')}">
          <div class="card-ticket-header">
            <span class="card-ticket-id">FIG_${projNum} // SPEC_DOC</span>
            <span class="card-barcode-strip">||||| | |||| ||</span>
          </div>

          <div class="card-media-box">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'kinetic-brutalism', idx, assignedArtworks, userSeed)}
          </div>

          <div class="card-body-brutal">
            <h3 class="card-title-chunky">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="card-desc-mono">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="tech-pills-row">
              ${techTags}
            </div>

            <div class="card-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="brutal-btn black-fill"><span>RUN PROJECT ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="brutal-btn white-fill"><span>RAW CODE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Skills Bar Chart
    const barColors = ['#00FFFF', '#DFFF00', '#FF007F', '#00FFFF', '#DFFF00', '#FF007F'];
    const skillsBarsHtml = data.skills.map((s, idx) => {
      const pct = 82 + ((idx * 5) % 16);
      const col = barColors[idx % barColors.length];
      return `
        <div class="brutal-skill-row">
          <div class="skill-label-block">
            <span class="skill-name-bold">${TemplateHelper.escapeHtml(s)}</span>
            <span class="skill-pct-mono">${pct}%</span>
          </div>
          <div class="skill-bar-container">
            <div class="skill-bar-fill" style="width: ${pct}%; background-color: ${col};"></div>
          </div>
        </div>
      `;
    }).join('');

    // 05. Experience Staircase Blocks
    const expBgColors = ['#DFFF00', '#FF007F', '#00FFFF', '#FFFFFF'];
    const experienceHtml = data.experience.map((exp, idx) => {
      const bgCol = expBgColors[idx % expBgColors.length];
      return `
        <div class="staircase-exp-step" style="background-color: ${bgCol};">
          <div class="step-ticket-date">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</div>
          <h3 class="step-role-heading">${TemplateHelper.escapeHtml(exp.role)}</h3>
          <div class="step-company-loc">@ ${TemplateHelper.escapeHtml(exp.company)} [${TemplateHelper.escapeHtml(exp.location || safeLocation)}]</div>
          <p class="step-desc-bold">${TemplateHelper.escapeHtml(exp.desc)}</p>
          ${exp.technologies ? `
            <div class="warning-label-box">
              <span class="warning-badge">WARNING:</span>
              <span class="warning-text">${TemplateHelper.escapeHtml(exp.technologies)}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Sticker tags for 02 About
    const focusStickers = ['React Architecture', 'High-Speed WebGL', 'Raw CSS Engines', 'Zero-Latency APIs', 'Kinetic Motion'];

    // Marquee text items
    const marqueeSkills = (data.skills && data.skills.length > 0 ? data.skills : ['TypeScript', 'Three.js', 'Node.js', 'React', 'Tailwind', 'Rust', 'Docker', 'GraphQL']).join(' ★ ');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Kinetic Brutalism Portfolio</title>
  <meta name="description" content="${safeName} — ${safeRole}. Loud, high-contrast Neobrutalist developer portfolio with thick borders, hard shadows, marquee typography, and zine poster aesthetics.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:ital,opsz,wght@0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       KINETIC BRUTALISM DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-canvas: #FDFBF7;
      --pure-white: #FFFFFF;
      --pure-black: #000000;
      --acid-yellow: #DFFF00;
      --hot-magenta: #FF007F;
      --electric-cyan: #00FFFF;

      --border-thick: 3.5px solid #000000;
      --shadow-hard: 5px 5px 0px #000000;
      --shadow-hard-large: 8px 8px 0px #000000;

      --font-display: 'Archivo Black', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'Space Mono', 'JetBrains Mono', monospace;

      --container-max: 1360px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-canvas);
      color: var(--pure-black);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-canvas);
      color: var(--pure-black);
      line-height: 1.55;
      overflow-x: hidden;
      /* Structural 2px Grid Lines */
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.06) 1.5px, transparent 1.5px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1.5px, transparent 1.5px);
      background-size: 40px 40px;
    }

    ::selection {
      background: var(--acid-yellow);
      color: #000000;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .brutal-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed 3D Wireframe Canvas */
    #kinetic-wireframe-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    /* Top Chunky Navigation Bar */
    .brutal-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--pure-white);
      border-bottom: var(--border-thick);
      padding: 14px 0;
    }

    .nav-inner-brutal {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-nr-block {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-display);
      font-size: 1.35rem;
      color: var(--pure-black);
      letter-spacing: -0.02em;
    }

    .nr-logo-box {
      background: var(--pure-black);
      color: var(--acid-yellow);
      padding: 4px 10px;
      border: 2px solid var(--pure-black);
      font-family: var(--font-display);
      font-size: 1.15rem;
      box-shadow: 3px 3px 0px var(--hot-magenta);
    }

    .nav-menu-brutal {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .nav-item-brutal {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--pure-black);
      text-transform: uppercase;
      transition: background-color 0.15s ease;
      padding: 4px 8px;
    }

    .nav-item-brutal:hover, .nav-item-brutal.active {
      background: var(--acid-yellow);
      box-shadow: 2px 2px 0px #000;
    }

    /* Chunky Rectangular Buttons with Hard Shadows */
    .brutal-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 24px;
      font-family: var(--font-mono);
      font-size: 0.92rem;
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      transition: all 0.1s ease;
      position: relative;
    }

    .brutal-btn:hover {
      transform: translate(3px, 3px);
      box-shadow: 2px 2px 0px #000;
    }

    .brutal-btn.acid {
      background: var(--acid-yellow);
      color: #000000;
    }

    .brutal-btn.black-fill {
      background: var(--pure-black);
      color: #FFFFFF;
    }

    .brutal-btn.white-fill {
      background: var(--pure-white);
      color: #000000;
    }

    /* Section Base */
    .brutal-section {
      padding: 90px 0;
      position: relative;
      z-index: 1;
      border-bottom: var(--border-thick);
    }

    .section-badge-box {
      display: inline-block;
      background: var(--pure-black);
      color: var(--pure-white);
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      padding: 6px 14px;
      margin-bottom: 24px;
      box-shadow: 4px 4px 0px var(--hot-magenta);
    }

    /* Full-Width Diagonal / Horizontal Marquee Tape */
    .marquee-tape-strip {
      background: var(--acid-yellow);
      border-top: var(--border-thick);
      border-bottom: var(--border-thick);
      padding: 12px 0;
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      z-index: 2;
    }

    .marquee-track {
      display: inline-block;
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 900;
      text-transform: uppercase;
      animation: marqueeScroll 16s linear infinite;
    }

    @keyframes marqueeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* =========================================================================
       01. HOME PAGE (Poster Layout & Receipt Stat Block)
       ========================================================================= */
    .home-hero-poster-grid {
      display: grid;
      grid-template-columns: 7fr 5fr;
      gap: 48px;
      align-items: center;
      min-height: 540px;
    }

    .huge-brutal-title {
      font-family: var(--font-display);
      font-size: clamp(3.2rem, 7vw, 6rem);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.04em;
      color: var(--pure-black);
      margin-bottom: 18px;
    }

    .role-block-tag {
      display: inline-block;
      background: var(--electric-cyan);
      border: var(--border-thick);
      padding: 6px 14px;
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      box-shadow: 4px 4px 0px #000;
      margin-bottom: 24px;
    }

    .manifesto-intro-text {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--pure-black);
      line-height: 1.6;
      margin-bottom: 32px;
      max-width: 580px;
    }

    .home-polyhedron-viewport {
      width: 100%;
      height: 440px;
      border: var(--border-thick);
      background: var(--pure-white);
      box-shadow: var(--shadow-hard-large);
      position: relative;
      overflow: hidden;
    }

    #home-poly-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Receipt Style Stat Block */
    .receipt-stat-block {
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      padding: 24px;
      margin-top: 48px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      font-family: var(--font-mono);
    }

    .receipt-stat-cell {
      border-right: 2px dashed #000;
      padding-right: 16px;
    }

    .receipt-stat-cell:last-child {
      border-right: none;
    }

    .receipt-label {
      font-size: 0.8rem;
      font-weight: 700;
      color: #666;
    }

    .receipt-val-huge {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 900;
      color: #000;
    }

    /* =========================================================================
       02. ABOUT PAGE (Zine Layout & Scattered Stickers)
       ========================================================================= */
    .about-zine-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
    }

    .about-bio-box {
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      padding: 32px;
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .brutal-meta-table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .brutal-meta-cell {
      background: var(--acid-yellow);
      border: var(--border-thick);
      box-shadow: 3px 3px 0px #000;
      padding: 14px;
    }

    .brutal-meta-title {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
    }

    .brutal-meta-val {
      font-family: var(--font-display);
      font-size: 1.05rem;
      color: #000;
    }

    .stickers-cluster {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 24px;
    }

    .sticker-tag {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 16px;
      border: var(--border-thick);
      box-shadow: 4px 4px 0px #000;
      transform: rotate(-2deg);
    }

    .sticker-tag:nth-child(even) {
      transform: rotate(2deg);
      background: var(--hot-magenta);
      color: #FFFFFF;
    }

    .sticker-tag:nth-child(odd) {
      background: var(--electric-cyan);
      color: #000000;
    }

    .wireframe-cluster-frame {
      width: 100%;
      height: 420px;
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard-large);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .wireframe-svg-box {
      width: 90%;
      height: 90%;
    }

    /* =========================================================================
       03. PROJECTS PAGE (Chunky Cards Grid)
       ========================================================================= */
    .brutal-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 36px;
      margin-top: 36px;
    }

    .brutal-proj-card {
      border: var(--border-thick);
      box-shadow: var(--shadow-hard-large);
      display: flex;
      flex-direction: column;
      transition: all 0.15s ease;
      overflow: hidden;
    }

    .brutal-proj-card:hover {
      transform: translate(4px, 4px);
      box-shadow: 4px 4px 0px #000;
    }

    .card-ticket-header {
      padding: 10px 16px;
      border-bottom: var(--border-thick);
      background: var(--pure-white);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
    }

    .card-media-box {
      width: 100%;
      height: 220px;
      border-bottom: var(--border-thick);
      background: var(--pure-white);
      overflow: hidden;
    }

    .card-body-brutal {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .card-title-chunky {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 900;
      color: #000;
      margin-bottom: 10px;
    }

    .card-desc-mono {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 18px;
    }

    .tech-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 24px;
    }

    .brutal-black-pill {
      background: #000;
      color: #FFF;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 3px 8px;
      font-weight: 700;
    }

    .card-action-row {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. SKILLS PAGE (Blocky Bar Charts & Table)
       ========================================================================= */
    .skills-blocky-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 32px;
    }

    .brutal-skill-row {
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      padding: 16px 20px;
    }

    .skill-label-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .skill-name-bold {
      font-family: var(--font-display);
      font-size: 1.15rem;
    }

    .skill-pct-mono {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
    }

    .skill-bar-container {
      width: 100%;
      height: 20px;
      border: var(--border-thick);
      background: #E5E5E5;
    }

    .skill-bar-fill {
      height: 100%;
      border-right: var(--border-thick);
    }

    /* =========================================================================
       05. EXPERIENCE PAGE (Staircase Timeline)
       ========================================================================= */
    .staircase-timeline-stack {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 36px;
    }

    .staircase-exp-step {
      border: var(--border-thick);
      box-shadow: var(--shadow-hard-large);
      padding: 32px;
    }

    .step-ticket-date {
      display: inline-block;
      background: #000;
      color: #FFF;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      padding: 4px 10px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .step-role-heading {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 900;
      margin-bottom: 6px;
    }

    .step-company-loc {
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .step-desc-bold {
      font-size: 1.05rem;
      font-weight: 700;
      line-height: 1.65;
      margin-bottom: 20px;
    }

    .warning-label-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--pure-white);
      border: var(--border-thick);
      padding: 8px 14px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
    }

    .warning-badge {
      background: #000;
      color: var(--acid-yellow);
      padding: 2px 6px;
    }

    /* =========================================================================
       06. OPEN SOURCE PAGE (Colossal Numbers & Shipping Labels)
       ========================================================================= */
    .open-source-stats-banner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-top: 32px;
    }

    .colossal-num-box {
      background: var(--hot-magenta);
      color: #FFF;
      border: var(--border-thick);
      box-shadow: var(--shadow-hard-large);
      padding: 36px;
      text-align: center;
    }

    .colossal-num-box.cyan {
      background: var(--electric-cyan);
      color: #000;
    }

    .colossal-val {
      font-family: var(--font-display);
      font-size: clamp(3.5rem, 8vw, 6rem);
      font-weight: 900;
      line-height: 1;
    }

    .colossal-label {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 8px;
    }

    /* =========================================================================
       07. RESUME PAGE (Raw Blueprint Receipt)
       ========================================================================= */
    .raw-receipt-resume {
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard-large);
      padding: 44px;
      max-width: 920px;
      margin: 32px auto 0;
    }

    .receipt-header-row {
      display: flex;
      justify-content: space-between;
      border-bottom: 3px dashed #000;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }

    /* =========================================================================
       08. CONTACT PAGE (Oversized Inputs)
       ========================================================================= */
    .brutal-contact-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 32px;
    }

    .warning-sign-cell {
      background: var(--acid-yellow);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      padding: 20px;
      margin-bottom: 16px;
      font-family: var(--font-mono);
      font-weight: 700;
    }

    .brutal-giant-input {
      width: 100%;
      background: var(--pure-white);
      border: var(--border-thick);
      box-shadow: var(--shadow-hard);
      padding: 16px 20px;
      font-family: var(--font-mono);
      font-size: 1.05rem;
      font-weight: 700;
      color: #000;
      margin-bottom: 20px;
      outline: none;
      text-transform: uppercase;
    }

    .brutal-giant-input:focus {
      background: #FDFDFD;
      box-shadow: 8px 8px 0px #000;
    }

    /* Footer */
    .brutal-footer {
      background: var(--pure-white);
      border-top: var(--border-thick);
      padding: 36px 0;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      position: relative;
      z-index: 2;
    }

    @media (max-width: 1024px) {
      .home-hero-poster-grid,
      .about-zine-grid,
      .open-source-stats-banner,
      .brutal-contact-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Fixed 3D Wireframe Canvas -->
  <canvas id="kinetic-wireframe-canvas"></canvas>

  <!-- Top Chunky Navigation Bar -->
  <header class="brutal-navbar">
    <div class="brutal-container">
      <div class="nav-inner-brutal">
        <a href="#home" class="brand-nr-block">
          <div class="nr-logo-box">${initials}</div>
          <span>${safeName}</span>
        </a>

        <nav class="nav-menu-brutal">
          <a href="#home" class="nav-item-brutal active">01 / Hello</a>
          <a href="#about" class="nav-item-brutal">02 / About</a>
          <a href="#projects" class="nav-item-brutal">03 / Projects</a>
          <a href="#skills" class="nav-item-brutal">04 / Skills</a>
          <a href="#experience" class="nav-item-brutal">05 / Exp</a>
          <a href="#opensource" class="nav-item-brutal">06 / Open Source</a>
          <a href="#resume" class="nav-item-brutal">07 / Resume</a>
          <a href="#contact" class="nav-item-brutal">08 / Contact</a>
        </nav>

        <div>
          <button class="brutal-btn acid" onclick="triggerPrintResume()">
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Marquee Skills Tape -->
  <div class="marquee-tape-strip">
    <div class="marquee-track">
      ★ ${marqueeSkills} ★ ${marqueeSkills} ★ ${marqueeSkills} ★
    </div>
  </div>

  <main>
    <!-- =========================================================================
         01. HOME PAGE
         ========================================================================= -->
    <section class="brutal-section" id="home">
      <div class="brutal-container">
        <div class="section-badge-box">01. HELLO</div>

        <div class="home-hero-poster-grid">
          <div>
            <h1 class="huge-brutal-title">${safeName}</h1>
            <div class="role-block-tag">ROLE // ${safeRole}</div>
            
            <p class="manifesto-intro-text">
              ${safeBio || 'Loud, highly opinionated systems engineer rejecting generic corporate minimalism. Constructing heavy-duty web applications, fault-tolerant infrastructure, and expressive user experiences.'}
            </p>

            <div style="display: flex; gap: 16px;">
              <a href="#projects" class="brutal-btn acid"><span>EXPLORE WORK ➔</span></a>
              <a href="#contact" class="brutal-btn black-fill"><span>CONTACT ME</span></a>
            </div>
          </div>

          <div class="home-polyhedron-viewport" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/cosmic_astronaut_3d.jpg" alt="${safeName} 3D Neobrutalist Specimen" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border: 4px solid #000000; box-shadow: 10px 10px 0px #000000; border-radius: 12px;" />
          </div>
        </div>

        <!-- Receipt Stat Block -->
        <div class="receipt-stat-block">
          <div class="receipt-stat-cell">
            <div class="receipt-label">TOTAL EXPERIENCE</div>
            <div class="receipt-val-huge">${totalExp} <span style="font-size: 1.2rem;">YRS</span></div>
          </div>
          <div class="receipt-stat-cell">
            <div class="receipt-label">PROJECTS COMPLETED</div>
            <div class="receipt-val-huge">${totalProj} <span style="font-size: 1.2rem;">PRJ</span></div>
          </div>
          <div class="receipt-stat-cell">
            <div class="receipt-label">PUBLIC REPOSITORIES</div>
            <div class="receipt-val-huge">${totalRepos} <span style="font-size: 1.2rem;">REPOS</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT PAGE
         ========================================================================= -->
    <section class="brutal-section" id="about">
      <div class="brutal-container">
        <div class="section-badge-box">02. ABOUT</div>

        <div class="about-zine-grid">
          <div>
            <div class="about-bio-box">
              ${safeBio}
            </div>

            <div class="brutal-meta-table">
              <div class="brutal-meta-cell">
                <div class="brutal-meta-title">LOC // LOCATION:</div>
                <div class="brutal-meta-val">${safeLocation}</div>
              </div>
              <div class="brutal-meta-cell">
                <div class="brutal-meta-title">NOW // ROLE:</div>
                <div class="brutal-meta-val">${safeRole}</div>
              </div>
              <div class="brutal-meta-cell">
                <div class="brutal-meta-title">COMM // EMAIL:</div>
                <div class="brutal-meta-val" style="font-size: 0.9rem;">${safeEmail}</div>
              </div>
              <div class="brutal-meta-cell">
                <div class="brutal-meta-title">STATUS:</div>
                <div class="brutal-meta-val">AVAILABLE FOR WORK</div>
              </div>
            </div>

            <div class="stickers-cluster">
              ${focusStickers.map(s => `<span class="sticker-tag">★ ${s}</span>`).join('')}
            </div>
          </div>

          <div class="wireframe-cluster-frame" style="display: flex; justify-content: center; align-items: center; border: 4px solid #000; box-shadow: 8px 8px 0 #000; padding: 12px; background: #DFFF00; border-radius: 12px;">
            <img src="/assets/3d/pristine_glass_cube_workstation_3d.jpg" alt="3D Workstation Zine" style="width: 100%; max-width: 320px; border: 3px solid #000; border-radius: 8px;" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS PAGE
         ========================================================================= -->
    <section class="brutal-section" id="projects">
      <div class="brutal-container">
        <div class="section-badge-box">03. PROJECTS</div>
        <p style="font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 24px;">
          HARDWARE &amp; SOFTWARE SPECIFICATION CATALOG
        </p>

        <div class="brutal-projects-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS PAGE
         ========================================================================= -->
    <section class="brutal-section" id="skills">
      <div class="brutal-container">
        <div class="section-badge-box">04. SKILLS</div>
        <p style="font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 24px;">
          RAW CAPABILITY METRICS &amp; ARCHITECTURAL TOOLS
        </p>

        <div class="skills-blocky-grid">
          ${skillsBarsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE PAGE
         ========================================================================= -->
    <section class="brutal-section" id="experience">
      <div class="brutal-container">
        <div class="section-badge-box">05. EXPERIENCE</div>
        <p style="font-family: var(--font-display); font-size: 1.8rem; margin-bottom: 24px;">
          STAIRCASE CHRONOLOGY &amp; CAREER MILESTONES
        </p>

        <div class="staircase-timeline-stack">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE PAGE
         ========================================================================= -->
    <section class="brutal-section" id="opensource">
      <div class="brutal-container">
        <div class="section-badge-box">06. OPEN SOURCE</div>

        <div class="open-source-stats-banner">
          <div class="colossal-num-box">
            <div class="colossal-val">${totalRepos}+</div>
            <div class="colossal-label">TOTAL REPOSITORIES</div>
          </div>
          <div class="colossal-num-box cyan">
            <div class="colossal-val">${data.projects.length * 42}+</div>
            <div class="colossal-label">COMMITS &amp; CONTRIBUTIONS</div>
          </div>
        </div>

        <div style="margin-top: 36px; text-align: center;">
          <a href="${safeGithub}" target="_blank" rel="noopener" class="brutal-btn acid" style="font-size: 1.1rem; padding: 14px 32px;">
            <span>VIEW COMPLETE GITHUB PROFILE ↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         07. RESUME PAGE
         ========================================================================= -->
    <section class="brutal-section" id="resume">
      <div class="brutal-container">
        <div class="section-badge-box">07. RESUME</div>

        <div class="raw-receipt-resume">
          <div class="receipt-header-row">
            <div>
              <h2 style="font-family: var(--font-display); font-size: 2.2rem;">${safeName}</h2>
              <div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700;">${safeRole}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.9rem; text-align: right;">
              <div>${safeEmail}</div>
              <div>${safeLocation}</div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 8px;">// PROFESSIONAL SUMMARY</h3>
            <p style="font-size: 1.05rem; font-weight: 700; line-height: 1.6;">${safeBio}</p>
          </div>

          <div style="margin-bottom: 24px; border-top: 2px dashed #000; padding-top: 18px;">
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 12px;">// ACADEMIC CREDENTIALS</h3>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 3px solid #000; padding-left: 12px;">
                <div style="font-weight: 900; font-size: 1.05rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.9rem;">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 2px dashed #000; padding-top: 18px;">
            <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 12px;">// VERIFIED CERTIFICATIONS</h3>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.9rem;">
                <span class="warning-badge" style="padding: 2px 6px; background: #000; color: #DFFF00;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Standard')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 3px dashed #000; padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 700;">SPECIFICATION STATUS: VERIFIED</span>
            <button class="brutal-btn acid" onclick="triggerPrintResume()">
              <span>DOWNLOAD PDF RECEIPT ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT PAGE
         ========================================================================= -->
    <section class="brutal-section" id="contact" style="border-bottom: none;">
      <div class="brutal-container">
        <div class="section-badge-box">08. CONTACT</div>

        <div class="brutal-contact-grid">
          <div>
            <h2 style="font-family: var(--font-display); font-size: 2.4rem; line-height: 1.1; margin-bottom: 20px;">
              LET'S BUILD SOMETHING LOUD TOGETHER.
            </h2>
            <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 32px;">
              Available for ambitious frontend projects, high-impact design systems, or creative engineering leadership.
            </p>

            <div class="warning-sign-cell">
              <div>COMMUNICATION CHANNEL:</div>
              <a href="mailto:${safeEmail}" style="font-size: 1.1rem; font-weight: 900; text-decoration: underline;">${safeEmail}</a>
            </div>

            <div class="warning-sign-cell" style="background: var(--electric-cyan);">
              <div>GITHUB PROFILE:</div>
              <a href="${safeGithub}" target="_blank" rel="noopener" style="font-size: 1rem; font-weight: 900;">${safeGithub.replace('https://', '')}</a>
            </div>
          </div>

          <div>
            <form onsubmit="handleBrutalSubmit(event)">
              <input type="text" class="brutal-giant-input" placeholder="YOUR FULL NAME" required />
              <input type="email" class="brutal-giant-input" placeholder="YOUR EMAIL ADDRESS" required />
              <input type="text" class="brutal-giant-input" placeholder="PROJECT SUBJECT" required />
              <textarea class="brutal-giant-input" style="min-height: 120px; resize: vertical;" placeholder="PROJECT DETAILS &amp; TIMELINE" required></textarea>
              <button type="submit" class="brutal-btn acid" style="width: 100%; padding: 18px; font-size: 1.1rem;">
                <span>SUBMIT TRANSMISSION ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="brutal-footer">
    <div class="brutal-container">
      <div>© 2026 ${safeName} • KINETIC BRUTALISM DESIGN SYSTEM • ALL RIGHTS RESERVED</div>
    </div>
  </footer>

  <!-- Three.js Chunky 3D Wireframe Polyhedron Script -->
  <script>
    function initHeroWireframe3D() {
      const canvas = document.getElementById('home-poly-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 24;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const group = new THREE.Group();
      scene.add(group);

      // Chunky Icosahedron with thick wireframe and colorful faces
      const icosaGeo = new THREE.IcosahedronGeometry(7, 0);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 4 });
      const fillMat = new THREE.MeshBasicMaterial({ color: 0xDFFF00, transparent: true, opacity: 0.6 });

      const polyWire = new THREE.Mesh(icosaGeo, wireMat);
      const polyFill = new THREE.Mesh(icosaGeo, fillMat);
      group.add(polyWire);
      group.add(polyFill);

      // Outer Torus Ring
      const torusGeo = new THREE.TorusGeometry(10, 0.4, 8, 32);
      const torusMat = new THREE.MeshBasicMaterial({ color: 0xFF007F });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = Math.PI / 3;
      group.add(torus);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);

        polyWire.rotation.x += 0.008;
        polyWire.rotation.y += 0.01;
        polyFill.rotation.x += 0.008;
        polyFill.rotation.y += 0.01;
        torus.rotation.z += 0.015;

        group.rotation.y += mouseX * 0.01;
        group.rotation.x += mouseY * 0.01;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        const w = parent.clientWidth || 400;
        const h = parent.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    }

    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, colors: ['#DFFF00', '#FF007F', '#00FFFF', '#000000'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleBrutalSubmit(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>TRANSMISSION DISPATCHED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroWireframe3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { KineticBrutalismTemplate };

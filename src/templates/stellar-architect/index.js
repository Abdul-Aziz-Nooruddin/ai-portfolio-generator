/**
 * Template: STELLAR ARCHITECT
 * Aesthetic: Cosmic Geometric • Precise Structural • High-End Dark Mode • Editorial Code • Electric Blue & Solar Gold
 * Palette: Deep Space Charcoal (#05080A), Surface Cool Grey (#10141A), Core Text (#F0F4F8), Editorial Text (#AABBCF), Electric Blue (#00A8FF), Solar Gold (#FFC300).
 * Motifs: Star systems, geometric blueprint drawings, glowing orbital trails, constellation star maps, ghost buttons with gold halo.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const StellarArchitectTemplate = {
  id: 'stellar-architect',
  name: 'Stellar Architect',
  category: 'Cosmic Geometric / Blueprint Editorial',
  description: 'A cosmic and structure-focused design where architecture meets space. Blueprints, geometric forms, star-map constellations, and celestial orbital trails in electric blue and solar gold.',
  recommendedFor: ['Distributed Systems Architect', 'AI/ML Engineer', 'Full Stack Developer', 'Cloud Infrastructure Engineer', 'Web3 Protocol Engineer'],
  palette: ['#05080A', '#10141A', '#00A8FF', '#FFC300', '#F0F4F8', '#AABBCF'],

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

    // Metrics calculation
    const totalExpYears = data.experience?.length ? `${data.experience.length}+` : '1+';
    const totalRepos = data.publicRepos ?? data.projects?.length ?? 6;
    const totalProjects = data.projects?.length || 6;

    // 03. Projects Cards
    const assignedArtworks = new Set(['/assets/3d/pristine_crystal_ribbon_hero_3d.jpg', '/assets/3d/pristine_glass_cube_workstation_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="stellar-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="stellar-project-tile" data-category="${TemplateHelper.escapeHtml(p.category || 'Architecture')}">
          <div class="tile-blueprint-viewport">
            <div class="orbital-beacon-sphere"></div>
            <div class="tile-visual-box">
              ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'stellar-architect', idx, assignedArtworks, userSeed)}
            </div>
            <div class="tile-index-tag">SCHEMATIC // ${projNum}</div>
          </div>

          <div class="tile-body-content">
            <div class="tile-category-label">PLANETARY SYSTEM // ${TemplateHelper.escapeHtml(p.category || 'Core Protocol')}</div>
            <h3 class="tile-project-heading">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="tile-project-summary">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="tile-stack-list">
              ${techTags}
            </div>

            <div class="tile-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="stellar-ghost-btn primary"><span>EXPLORE ORBIT ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="stellar-ghost-btn secondary"><span>BLUEPRINT CODE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Star-Map Skill Constellations
    const skillCategories = [
      { name: 'LANGUAGES & RUNTIMES', icon: '✦', skills: data.skills.slice(0, Math.ceil(data.skills.length / 3)) },
      { name: 'FRAMEWORKS & ARCHITECTURE', icon: '◈', skills: data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3)) },
      { name: 'SYSTEMS, CLOUD & WEB3', icon: '⬡', skills: data.skills.slice(Math.ceil((data.skills.length * 2) / 3)) }
    ];

    const skillsConstellationsHtml = skillCategories.map((cat, cIdx) => `
      <div class="constellation-block">
        <div class="constellation-header">
          <span class="constellation-glyph">${cat.icon}</span>
          <span class="constellation-title">${cat.name}</span>
        </div>
        <div class="constellation-stars-row">
          ${cat.skills.map((s, idx) => `
            <div class="star-node-item">
              <span class="solar-gold-star"></span>
              <span class="star-name">${TemplateHelper.escapeHtml(s)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 05. Experience Timeline Data Stream
    const experienceHtml = data.experience.map((exp, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      return `
        <div class="orbital-data-packet">
          <div class="packet-beacon">
            <span class="solar-beacon-dot"></span>
            <span class="packet-index">${num}</span>
          </div>
          <div class="packet-surface-card">
            <div class="packet-time-stamp">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</div>
            <h3 class="packet-role-heading">${TemplateHelper.escapeHtml(exp.role)}</h3>
            <div class="packet-company-meta">@ ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
            <p class="packet-editorial-para">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `<div class="packet-tech-stream">TECH PROTOCOL: ${TemplateHelper.escapeHtml(exp.technologies)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Focus areas for 02 About
    const focusAreas = ['Distributed Cloud Systems', 'Algorithmic Architectures', 'Deterministic Protocols', 'AI & Spatial Compute', 'Precision Infrastructure'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Stellar Architect &amp; Celestial Systems</title>
  <meta name="description" content="${safeName} — ${safeRole}. Cosmic geometric developer portfolio where architecture meets space. Blueprints, star-maps, and celestial orbital dynamics.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       STELLAR ARCHITECT DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-space: #05080A;
      --surface-grey: #10141A;
      --surface-glass: rgba(16, 20, 26, 0.78);
      --border-blue: rgba(0, 168, 255, 0.22);
      --border-blue-solid: #00A8FF;
      --electric-blue: #00A8FF;
      --solar-gold: #FFC300;
      --text-core: #F0F4F8;
      --text-editorial: #AABBCF;
      --text-muted: #7E90A6;

      --font-display: 'Space Grotesk', monospace, sans-serif;
      --font-serif: 'Cormorant Garamond', serif;
      --font-mono: 'JetBrains Mono', monospace;

      --container-max: 1360px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-space);
      color: var(--text-core);
      font-size: 16px;
    }

    body {
      font-family: var(--font-display);
      background-color: var(--bg-space);
      color: var(--text-core);
      line-height: 1.65;
      overflow-x: hidden;
      position: relative;
      /* Precise Architectural Space Grid */
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(0, 168, 255, 0.08) 0%, transparent 60%),
        linear-gradient(to right, rgba(0, 168, 255, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 168, 255, 0.04) 1px, transparent 1px);
      background-size: 100% 100%, 50px 50px, 50px 50px;
    }

    ::selection {
      background: var(--electric-blue);
      color: #05080A;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .stellar-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed Celestial Background Canvas */
    #stellar-bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.9;
    }

    /* Top Navigation Bar */
    .stellar-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(5, 8, 10, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-blue);
      padding: 16px 0;
    }

    .nav-inner-layout {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-nr-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .nr-hexagon {
      width: 34px;
      height: 34px;
      border: 1px solid var(--electric-blue);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--electric-blue);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      background: rgba(0, 168, 255, 0.08);
      box-shadow: 0 0 16px rgba(0, 168, 255, 0.25);
    }

    .nav-menu-cluster {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .nav-link-anchor {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.2s ease;
    }

    .nav-link-anchor:hover, .nav-link-anchor.active {
      color: var(--electric-blue);
      text-shadow: 0 0 10px rgba(0, 168, 255, 0.6);
    }

    /* Ghost Buttons with Gold Halo */
    .stellar-ghost-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 24px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: transparent;
      border: 0.5px solid var(--electric-blue);
      color: var(--electric-blue);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .stellar-ghost-btn:hover {
      background: rgba(0, 168, 255, 0.12);
      border-color: var(--solar-gold);
      color: #FFFFFF;
      box-shadow: 0 0 20px rgba(255, 195, 0, 0.35), 0 0 8px rgba(0, 168, 255, 0.5);
      transform: translateY(-2px);
    }

    .stellar-ghost-btn.primary {
      border-color: var(--electric-blue);
      color: var(--electric-blue);
    }

    /* Section Structure */
    .stellar-section {
      padding: 110px 0;
      position: relative;
      z-index: 1;
      border-bottom: 1px solid var(--border-blue);
    }

    .section-num-header {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--electric-blue);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-num-header::after {
      content: '';
      display: inline-block;
      width: 40px;
      height: 1px;
      background: var(--electric-blue);
      opacity: 0.5;
    }

    .section-editorial-intro {
      font-family: var(--font-serif);
      font-size: 1.35rem;
      font-style: italic;
      color: var(--text-editorial);
      line-height: 1.55;
      margin-bottom: 36px;
      max-width: 680px;
    }

    /* =========================================================================
       01. HOME PAGE
       ========================================================================= */
    .home-hero-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
      min-height: 540px;
    }

    .home-headline-box {
      display: flex;
      flex-direction: column;
    }

    .huge-name-title {
      font-family: var(--font-display);
      font-size: clamp(3rem, 6vw, 5.2rem);
      font-weight: 800;
      line-height: 1.0;
      letter-spacing: -0.04em;
      color: var(--text-core);
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .primary-role-serif {
      font-family: var(--font-serif);
      font-size: clamp(1.6rem, 2.5vw, 2.2rem);
      font-style: italic;
      color: var(--solar-gold);
      margin-bottom: 24px;
      font-weight: 400;
    }

    .home-blueprint-display {
      width: 100%;
      height: 480px;
      position: relative;
      border: 1px solid var(--border-blue);
      background: radial-gradient(circle at center, rgba(0, 168, 255, 0.12) 0%, rgba(5, 8, 10, 0) 70%);
      overflow: hidden;
    }

    #home-star-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .blueprint-telemetry-corner {
      position: absolute;
      bottom: 16px;
      left: 18px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--electric-blue);
      letter-spacing: 0.05em;
      pointer-events: none;
    }

    /* Stats Strip (3 Columns) */
    .home-stats-strip {
      margin-top: 56px;
      border-top: 1px solid var(--border-blue);
      padding-top: 36px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
    }

    .stat-column-cell {
      border-left: 1px solid var(--border-blue);
      padding-left: 24px;
      display: flex;
      flex-direction: column;
    }

    .stat-digit-val {
      font-family: var(--font-display);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--text-core);
      line-height: 1;
      margin-bottom: 6px;
    }

    .stat-digit-val span {
      color: var(--solar-gold);
    }

    .stat-meta-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-editorial);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* =========================================================================
       02. ABOUT PAGE (Light Portal)
       ========================================================================= */
    .about-portal-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
    }

    .light-portal-frame {
      width: 100%;
      height: 440px;
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .portal-blueprint-svg {
      width: 85%;
      height: 85%;
    }

    .focus-areas-stack {
      margin-top: 32px;
      border-top: 1px solid var(--border-blue);
      padding-top: 20px;
    }

    .focus-tags-cluster {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .focus-tag-pill {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      padding: 6px 14px;
      border: 0.5px solid var(--electric-blue);
      color: var(--electric-blue);
      background: rgba(0, 168, 255, 0.06);
    }

    /* =========================================================================
       03. PROJECTS PAGE (Stacked Blueprint Tiles)
       ========================================================================= */
    .projects-stacked-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 36px;
      margin-top: 20px;
    }

    .stellar-project-tile {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stellar-project-tile:hover {
      border-color: var(--electric-blue);
      box-shadow: 0 16px 40px rgba(0, 168, 255, 0.2);
      transform: translateY(-4px);
    }

    .tile-blueprint-viewport {
      width: 100%;
      height: 220px;
      position: relative;
      background: #070B0E;
      overflow: hidden;
    }

    .tile-visual-box {
      width: 100%;
      height: 100%;
    }

    .tile-visual-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .stellar-project-tile:hover .tile-visual-box img {
      transform: scale(1.05);
    }

    .tile-index-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--solar-gold);
      background: rgba(5, 8, 10, 0.85);
      border: 0.5px solid var(--solar-gold);
      padding: 3px 8px;
    }

    .tile-body-content {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .tile-category-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--electric-blue);
      margin-bottom: 8px;
      letter-spacing: 0.08em;
    }

    .tile-project-heading {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--text-core);
      margin-bottom: 12px;
    }

    .tile-project-summary {
      font-family: var(--font-serif);
      font-size: 1.05rem;
      color: var(--text-editorial);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .tile-stack-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }

    .stellar-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-core);
      background: rgba(0, 168, 255, 0.08);
      border: 0.5px solid rgba(0, 168, 255, 0.2);
      padding: 3px 8px;
    }

    .tile-action-row {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. SKILLS PAGE (Star-Map Constellations)
       ========================================================================= */
    .skills-starmap-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      align-items: center;
      margin-top: 20px;
    }

    .starmap-visual-container {
      width: 100%;
      height: 400px;
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
    }

    .constellations-column-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .constellation-block {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      padding: 24px;
    }

    .constellation-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-blue);
      margin-bottom: 16px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--electric-blue);
    }

    .constellation-stars-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .star-node-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: rgba(5, 8, 10, 0.8);
      border: 0.5px solid var(--border-blue);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    .solar-gold-star {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--solar-gold);
      box-shadow: 0 0 8px var(--solar-gold);
    }

    /* =========================================================================
       05. EXPERIENCE PAGE (Orbital Data Stream)
       ========================================================================= */
    .orbital-stream-timeline {
      position: relative;
      padding-left: 48px;
      margin-top: 36px;
    }

    .orbital-stream-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 19px;
      width: 1px;
      background: linear-gradient(180deg, var(--solar-gold) 0%, var(--electric-blue) 100%);
      box-shadow: 0 0 10px rgba(0, 168, 255, 0.4);
    }

    .orbital-data-packet {
      position: relative;
      margin-bottom: 36px;
    }

    .packet-beacon {
      position: absolute;
      left: -48px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .solar-beacon-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--solar-gold);
      box-shadow: 0 0 14px var(--solar-gold);
      border: 2px solid #FFFFFF;
    }

    .packet-surface-card {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      padding: 28px;
    }

    .packet-time-stamp {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--solar-gold);
      margin-bottom: 6px;
    }

    .packet-role-heading {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-core);
      margin-bottom: 4px;
    }

    .packet-company-meta {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--electric-blue);
      margin-bottom: 16px;
    }

    .packet-editorial-para {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      color: var(--text-editorial);
      line-height: 1.65;
      margin-bottom: 16px;
    }

    .packet-tech-stream {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* =========================================================================
       06. OPEN SOURCE PAGE
       ========================================================================= */
    .opensource-constellation-grid {
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 40px;
      margin-top: 24px;
    }

    .metric-constellation-card {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      padding: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .constellation-circle-graphic {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 2px solid var(--electric-blue);
      box-shadow: 0 0 24px rgba(0, 168, 255, 0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .metric-huge-num {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 800;
      color: var(--text-core);
    }

    .opensource-repos-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .repo-surface-card {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* =========================================================================
       07. RESUME PAGE (Structured Blueprint Document)
       ========================================================================= */
    .resume-blueprint-doc {
      background: var(--surface-grey);
      border: 1px solid var(--electric-blue);
      box-shadow: 0 20px 50px rgba(0, 168, 255, 0.15);
      padding: 44px;
      max-width: 960px;
      margin: 30px auto 0;
    }

    .resume-top-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-blue);
      margin-bottom: 28px;
    }

    /* =========================================================================
       08. CONTACT PAGE (Bottom-Border Form & Matrix)
       ========================================================================= */
    .contact-matrix-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 24px;
    }

    .contact-form-matrix {
      background: var(--surface-grey);
      border: 1px solid var(--border-blue);
      padding: 36px;
      position: relative;
    }

    .bottom-border-input {
      width: 100%;
      padding: 14px 4px;
      border: none;
      border-bottom: 1px solid var(--border-blue);
      background: transparent;
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      margin-bottom: 24px;
      outline: none;
      transition: all 0.25s ease;
    }

    .bottom-border-input:focus {
      border-bottom-color: var(--electric-blue);
      box-shadow: 0 4px 16px -4px rgba(0, 168, 255, 0.4);
    }

    /* Footer */
    .stellar-footer {
      padding: 40px 0;
      border-top: 1px solid var(--border-blue);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .home-hero-grid,
      .about-portal-grid,
      .skills-starmap-grid,
      .opensource-constellation-grid,
      .contact-matrix-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Fixed Celestial Background Canvas -->
  <canvas id="stellar-bg-canvas"></canvas>

  <!-- Top Simplified Nav Menu -->
  <header class="stellar-navbar">
    <div class="stellar-container">
      <div class="nav-inner-layout">
        <a href="#home" class="brand-nr-badge">
          <div class="nr-hexagon">${initials}</div>
          <span>${safeName}</span>
        </a>

        <nav class="nav-menu-cluster">
          <a href="#home" class="nav-link-anchor active">01 / Home</a>
          <a href="#about" class="nav-link-anchor">02 / About</a>
          <a href="#projects" class="nav-link-anchor">03 / Projects</a>
          <a href="#skills" class="nav-link-anchor">04 / Skills</a>
          <a href="#experience" class="nav-link-anchor">05 / Experience</a>
          <a href="#opensource" class="nav-link-anchor">06 / Open Source</a>
          <a href="#resume" class="nav-link-anchor">07 / Resume</a>
          <a href="#contact" class="nav-link-anchor">08 / Contact</a>
        </nav>

        <div>
          <button class="stellar-ghost-btn" onclick="triggerPrintResume()">
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         01. HOME PAGE
         ========================================================================= -->
    <section class="stellar-section" id="home">
      <div class="stellar-container">
        <div class="section-num-header">01. HELLO, I'M</div>

        <div class="home-hero-grid">
          <div class="home-headline-box">
            <h1 class="huge-name-title">${safeName}</h1>
            <div class="primary-role-serif">${safeRole}</div>
            
            <p class="section-editorial-intro">
              ${safeBio || 'Architecting resilient planetary computing infrastructures, deterministic software protocols, and celestial algorithmic interfaces.'}
            </p>

            <div style="display: flex; gap: 16px; margin-top: 12px;">
              <a href="#projects" class="stellar-ghost-btn primary"><span>EXPLORE PROJECTS ➔</span></a>
              <a href="#contact" class="stellar-ghost-btn"><span>INITIATE SIGNAL</span></a>
            </div>
          </div>

          <div class="home-blueprint-display" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/pristine_crystal_ribbon_hero_3d.jpg" alt="${safeName} 3D Stellar Blueprint" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border: 2px solid var(--border-blue); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(0,168,255,0.35);" />
          </div>
        </div>

        <!-- 3 Columns Stats Strip -->
        <div class="home-stats-strip">
          <div class="stat-column-cell">
            <div class="stat-digit-val">${totalExpYears} <span>YRS</span></div>
            <div class="stat-meta-label">Total Engineering Experience</div>
          </div>
          <div class="stat-column-cell">
            <div class="stat-digit-val">${totalRepos} <span>REPOS</span></div>
            <div class="stat-meta-label">Public Repositories &amp; Packages</div>
          </div>
          <div class="stat-column-cell">
            <div class="stat-digit-val">${totalProjects} <span>PRJ</span></div>
            <div class="stat-meta-label">Completed Software Architectures</div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT PAGE
         ========================================================================= -->
    <section class="stellar-section" id="about">
      <div class="stellar-container">
        <div class="section-num-header">02. ABOUT ME</div>

        <div class="about-portal-grid">
          <div>
            <p class="section-editorial-intro">
              "Designing and engineering digital systems that bridge mathematical purity, architectural stability, and human utility."
            </p>
            <p style="font-size: 1.02rem; color: var(--text-editorial); line-height: 1.75; margin-bottom: 24px;">
              ${safeBio}
            </p>

            <div class="focus-areas-stack">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--electric-blue); letter-spacing: 0.08em; margin-bottom: 8px;">FOCUS AREAS //</div>
              <div class="focus-tags-cluster">
                ${focusAreas.map(f => `<span class="focus-tag-pill">✦ ${f}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="light-portal-frame" style="display: flex; justify-content: center; align-items: center; padding: 12px; background: rgba(14, 22, 34, 0.7); border: 1px solid var(--border-blue); border-radius: 20px;">
            <img src="/assets/3d/pristine_glass_cube_workstation_3d.jpg" alt="3D Workstation Architecture" style="width: 100%; max-width: 320px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,0.8);" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS PAGE
         ========================================================================= -->
    <section class="stellar-section" id="projects">
      <div class="stellar-container">
        <div class="section-num-header">03. PROJECTS</div>
        <p class="section-editorial-intro">
          A selection of structural architectures, decentralized platforms, and high-load computational systems.
        </p>

        <div class="projects-stacked-container">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS PAGE
         ========================================================================= -->
    <section class="stellar-section" id="skills">
      <div class="stellar-container">
        <div class="section-num-header">04. SKILLS</div>
        <p class="section-editorial-intro">
          Multi-dimensional skill constellations mapped across language runtimes, distributed cloud, and frameworks.
        </p>

        <div class="skills-starmap-grid">
          <div class="starmap-visual-container">
            <!-- Constellation Geometric Chart -->
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
              <!-- Orbit Rings -->
              <circle cx="140" cy="140" r="110" stroke="rgba(0, 168, 255, 0.2)" stroke-width="1" stroke-dasharray="4 4"/>
              <circle cx="140" cy="140" r="70" stroke="rgba(255, 195, 0, 0.3)" stroke-width="1"/>
              <circle cx="140" cy="140" r="30" stroke="rgba(0, 168, 255, 0.4)" stroke-width="1.5"/>

              <!-- Constellation Lines & Stars -->
              <line x1="140" y1="30" x2="230" y2="90" stroke="#00A8FF" stroke-width="1.5"/>
              <line x1="230" y1="90" x2="210" y2="210" stroke="#00A8FF" stroke-width="1.5"/>
              <line x1="210" y1="210" x2="140" y2="250" stroke="#00A8FF" stroke-width="1.5"/>
              <line x1="140" y1="250" x2="60" y2="200" stroke="#00A8FF" stroke-width="1.5"/>
              <line x1="60" y1="200" x2="50" y2="90" stroke="#00A8FF" stroke-width="1.5"/>
              <line x1="50" y1="90" x2="140" y2="30" stroke="#00A8FF" stroke-width="1.5"/>

              <circle cx="140" cy="30" r="5" fill="#FFC300"/>
              <circle cx="230" cy="90" r="5" fill="#00A8FF"/>
              <circle cx="210" cy="210" r="5" fill="#FFC300"/>
              <circle cx="140" cy="250" r="5" fill="#00A8FF"/>
              <circle cx="60" cy="200" r="5" fill="#FFC300"/>
              <circle cx="50" cy="90" r="5" fill="#00A8FF"/>
              <circle cx="140" cy="140" r="7" fill="#FFC300"/>
            </svg>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--electric-blue); margin-top: 14px;">
              STAR-MAP // CONSTELLATION PROFICIENCY
            </div>
          </div>

          <div class="constellations-column-list">
            ${skillsConstellationsHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE PAGE
         ========================================================================= -->
    <section class="stellar-section" id="experience">
      <div class="stellar-container">
        <div class="section-num-header">05. EXPERIENCE</div>
        <p class="section-editorial-intro">
          Professional career milestones modeled as an orbital data stream.
        </p>

        <div class="orbital-stream-timeline">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE PAGE
         ========================================================================= -->
    <section class="stellar-section" id="opensource">
      <div class="stellar-container">
        <div class="section-num-header">06. OPEN SOURCE</div>
        <p class="section-editorial-intro">
          Open-source contributions, developer utility libraries, and protocol implementations.
        </p>

        <div class="opensource-constellation-grid">
          <div class="metric-constellation-card">
            <div class="constellation-circle-graphic">
              <div class="metric-huge-num">${data.projects.length}+</div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--solar-gold);">PUBLIC REPOS</div>
            </div>
            <p style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--text-editorial); margin-bottom: 24px;">
              Actively designing, building, and publishing software tools for global developers.
            </p>
            <a href="${safeGithub}" target="_blank" rel="noopener" class="stellar-ghost-btn primary" style="width: 100%;">
              <span>VIEW GITHUB PROFILE ↗</span>
            </a>
          </div>

          <div class="opensource-repos-stack">
            ${data.projects.slice(0, 3).map(p => `
              <div class="repo-surface-card">
                <div>
                  <h4 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--text-core); margin-bottom: 4px;">${TemplateHelper.escapeHtml(p.name)}</h4>
                  <p style="font-family: var(--font-serif); font-size: 0.95rem; color: var(--text-editorial);">${TemplateHelper.escapeHtml(p.desc)}</p>
                </div>
                <div>
                  ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="stellar-ghost-btn" style="padding: 6px 14px; font-size: 0.75rem;">CODE ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         07. RESUME PAGE
         ========================================================================= -->
    <section class="stellar-section" id="resume">
      <div class="stellar-container">
        <div class="section-num-header">07. RESUME</div>
        <p class="section-editorial-intro">
          Official engineering dossier and structured credentials.
        </p>

        <div class="resume-blueprint-doc">
          <div class="resume-top-row">
            <div>
              <h3 style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--text-core); text-transform: uppercase;">${safeName}</h3>
              <div style="font-family: var(--font-serif); font-size: 1.15rem; font-style: italic; color: var(--solar-gold);">${safeRole}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-editorial); text-align: right;">
              <div>${safeEmail}</div>
              <div>${safeLocation}</div>
            </div>
          </div>

          <div style="margin-bottom: 28px;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--electric-blue); letter-spacing: 0.08em; margin-bottom: 8px;">EXECUTIVE SUMMARY</div>
            <p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--text-editorial); line-height: 1.65;">${safeBio}</p>
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-blue); padding-top: 18px;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--electric-blue); letter-spacing: 0.08em; margin-bottom: 12px;">ACADEMIC BACKGROUND</div>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--electric-blue); padding-left: 12px;">
                <div style="font-weight: 800; color: var(--text-core); font-size: 1rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-editorial);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-blue); padding-top: 18px;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--solar-gold); letter-spacing: 0.08em; margin-bottom: 12px;">VERIFIED CERTIFICATIONS</div>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-core);">
                <span style="background: rgba(56,189,248,0.15); border: 1px solid var(--electric-blue); color: var(--electric-blue); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-blue); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">AUTHENTICATED STELLAR BLUEPRINT DOSSIER</span>
            <button class="stellar-ghost-btn primary" onclick="triggerPrintResume()">
              <span>DOWNLOAD RESUME (PDF) ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT PAGE
         ========================================================================= -->
    <section class="stellar-section" id="contact" style="border-bottom: none;">
      <div class="stellar-container">
        <div class="section-num-header">08. CONTACT</div>
        <p class="section-editorial-intro">
          Transmit inquiries regarding system architecture, technical leadership, or strategic software initiatives.
        </p>

        <div class="contact-matrix-grid">
          <div>
            <h2 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; margin-bottom: 16px; text-transform: uppercase;">ESTABLISH ORBITAL LINK</h2>
            <p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-editorial); line-height: 1.65; margin-bottom: 32px;">
              All communications are routed with guaranteed response time within one solar day.
            </p>

            <div style="display: flex; flex-direction: column; gap: 18px; font-family: var(--font-mono); font-size: 0.88rem;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; display: block;">DIRECT TRANSMISSION:</span>
                <a href="mailto:${safeEmail}" style="color: var(--electric-blue); font-weight: 700;">${safeEmail}</a>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; display: block;">GITHUB COORDINATES:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener" style="color: var(--text-core);">${safeGithub.replace('https://', '')}</a>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.72rem; display: block;">PROFESSIONAL NETWORK:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener" style="color: var(--text-core);">${safeLinkedin.replace('https://', '')}</a>
              </div>
            </div>
          </div>

          <div class="contact-form-matrix">
            <form onsubmit="handleStellarContact(event)">
              <input type="text" class="bottom-border-input" placeholder="IDENTIFIER / YOUR NAME" required />
              <input type="email" class="bottom-border-input" placeholder="TRANSMISSION EMAIL" required />
              <input type="text" class="bottom-border-input" placeholder="SUBJECT / SCOPE OF WORK" required />
              <textarea class="bottom-border-input" style="min-height: 100px; resize: vertical;" placeholder="SIGNAL MESSAGE CONTENT" required></textarea>
              <button type="submit" class="stellar-ghost-btn primary" style="width: 100%;">
                <span>SEND MESSAGE ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="stellar-footer">
    <div class="stellar-container">
      <div>© 2026 ${safeName} • STELLAR ARCHITECT DESIGN SYSTEM • POWERED BY THREE.JS &amp; NANO BANANA</div>
    </div>
  </footer>

  <!-- Three.js Celestial Blueprint Star System Animation Script -->
  <script>
    function initHeroStarSystem3D() {
      const canvas = document.getElementById('home-star-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 26;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Star-System Model with Blueprint Lines & Solar Gold Core
      const group = new THREE.Group();
      scene.add(group);

      const blueLineMat = new THREE.MeshBasicMaterial({ color: 0x00A8FF, wireframe: true, transparent: true, opacity: 0.65 });
      const goldLineMat = new THREE.MeshBasicMaterial({ color: 0xFFC300, wireframe: true, transparent: true, opacity: 0.8 });
      const goldStarMat = new THREE.PointsMaterial({ color: 0xFFC300, size: 0.4 });

      // Central Star Core
      const coreGeo = new THREE.SphereGeometry(3.5, 16, 16);
      const coreMesh = new THREE.Mesh(coreGeo, goldLineMat);
      group.add(coreMesh);

      // Orbital Rings
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(8, 0.08, 16, 64), blueLineMat);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.08, 16, 64), blueLineMat);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.06, 16, 64), goldLineMat);
      ring3.rotation.x = Math.PI / 6;
      group.add(ring3);

      // Orbiting Planet Spheres
      const planet1 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 8, 8), blueLineMat);
      group.add(planet1);

      const planet2 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), goldLineMat);
      group.add(planet2);

      // Particle Field
      const starGeo = new THREE.BufferGeometry();
      const starCount = 180;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 36;
        starPos[i + 1] = (Math.random() - 0.5) * 36;
        starPos[i + 2] = (Math.random() - 0.5) * 36;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starField = new THREE.Points(starGeo, goldStarMat);
      group.add(starField);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      let clock = 0;
      function animate() {
        requestAnimationFrame(animate);
        clock += 0.015;

        group.rotation.y += 0.004;
        group.rotation.x += 0.002;

        planet1.position.x = Math.cos(clock * 0.8) * 8;
        planet1.position.z = Math.sin(clock * 0.8) * 8;

        planet2.position.x = Math.cos(clock * 0.5) * 12;
        planet2.position.y = Math.sin(clock * 0.5) * 12;

        group.rotation.y += mouseX * 0.008;
        group.rotation.x += mouseY * 0.008;

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
        confetti({ particleCount: 70, spread: 60, colors: ['#00A8FF', '#FFC300', '#F0F4F8'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleStellarContact(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>SIGNAL DISPATCHED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroStarSystem3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { StellarArchitectTemplate };

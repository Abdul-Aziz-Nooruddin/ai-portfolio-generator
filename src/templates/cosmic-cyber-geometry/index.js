/**
 * Template: COSMIC CYBER GEOMETRY
 * Aesthetic: Futuristic Minimal • Dark Mode • Cosmic Geometry • Cyber Editorial • Neon Purple & Crimson
 * Palette: Deep Cosmic Black (#080D10), Slate Black (#111318), Deep Blue-Grey (#1A1D26), Neon Crimson (#E21C5F), Neon Purple (#E084FC), Crisp Light (#E5E7EB), Muted (#687280).
 * Motifs: Cosmic geometry, orbit lines, particle clouds, glowing neon dots, tech grids, minimal outline buttons, frosted glass cards.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const CosmicCyberGeometryTemplate = {
  id: 'cosmic-cyber-geometry',
  name: 'Cosmic Cyber Geometry',
  category: 'Futuristic Minimal / Cyber Editorial',
  description: 'Futuristic minimal cyber editorial with cosmic geometry particle fields, neon crimson & purple accents, isometric project schematics, radar capability chart, and frosted glass dossier panels.',
  recommendedFor: ['Full Stack Engineer', 'AI/ML Researcher', 'Creative Technologist', 'Web3 Architect', 'Software Engineer'],
  palette: ['#080D10', '#111318', '#1A1D26', '#E21C5F', '#E084FC', '#E5E7EB'],

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const initials = data.initials;

    // 03. Isometric 3D Projects Showcase
    const assignedArtworks = new Set();
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="neon-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <div class="cyber-project-card" data-category="${TemplateHelper.escapeHtml(p.category || 'Architecture')}">
          <div class="project-isometric-viewport">
            <div class="neon-orbit-ring"></div>
            <div class="project-thumb-box">
              ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'cosmic-cyber-geometry', idx, assignedArtworks, userSeed)}
            </div>
            <span class="project-index-badge">PRJ // ${projNum}</span>
          </div>

          <div class="project-info-body">
            <div class="project-category-tag">${TemplateHelper.escapeHtml(p.category || 'Full Stack Protocol')}</div>
            <h3 class="project-title-heading">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="project-description-text">${TemplateHelper.escapeHtml(p.desc)}</p>
            
            <div class="project-tech-stack-row">
              ${techTags}
            </div>

            <div class="project-action-links">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="neon-outline-btn primary"><span>LIVE DEMO ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="neon-outline-btn secondary"><span>SOURCE CODE ↗</span></a>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 04. Categorized Skills
    const skillCategories = [
      { title: 'LANGUAGES', icon: '⚡', items: data.skills.slice(0, Math.ceil(data.skills.length / 3)) },
      { title: 'FRAMEWORKS & LIBS', icon: '🔮', items: data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3)) },
      { title: 'SYSTEMS & CLOUD', icon: '🌐', items: data.skills.slice(Math.ceil((data.skills.length * 2) / 3)) }
    ];

    const skillsGroupHtml = skillCategories.map((cat, cIdx) => `
      <div class="skills-category-column">
        <div class="cat-header-strip">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-title">${cat.title}</span>
        </div>
        <div class="skills-tag-grid">
          ${cat.items.map((s, idx) => `
            <div class="skill-neon-item">
              <span class="skill-dot"></span>
              <span class="skill-name">${TemplateHelper.escapeHtml(s)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 05. Experience Timeline
    const experienceHtml = data.experience.map((exp, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      return `
        <div class="cosmic-timeline-node">
          <div class="node-indicator">
            <span class="pulse-core"></span>
            <span class="node-num">${num}</span>
          </div>
          <div class="node-glass-card">
            <div class="card-date-meta">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</div>
            <h3 class="card-role-title">${TemplateHelper.escapeHtml(exp.role)}</h3>
            <div class="card-company-name">@ ${TemplateHelper.escapeHtml(exp.company)}</div>
            <p class="card-desc-para">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `<div class="card-tech-meta">STACK: ${TemplateHelper.escapeHtml(exp.technologies)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Focus areas for About
    const focusAreas = ['Cloud Systems', 'Full-Stack Architecture', 'Distributed Consensus', 'AI & Spatial Compute', 'Deterministic Engines'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Cosmic Cyber Geometry Portfolio</title>
  <meta name="description" content="${safeName} — ${safeRole}. Futuristic minimal developer portfolio with cosmic geometry, orbital particle dynamics, and cyber editorial design.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       COSMIC CYBER GEOMETRY DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-cosmic: #080D10;
      --bg-slate: #111318;
      --surface-glass: rgba(26, 29, 38, 0.72);
      --surface-card: rgba(17, 19, 24, 0.88);
      --surface-border: rgba(224, 132, 252, 0.18);
      --surface-glow: rgba(226, 28, 95, 0.25);
      
      --neon-crimson: #E21C5F;
      --neon-purple: #E084FC;
      --neon-lilac: #C084FC;
      --text-main: #E5E7EB;
      --text-muted: #94A3B8;
      --text-dim: #687280;

      --font-display: 'Space Grotesk', -apple-system, sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --container-max: 1380px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-cosmic);
      color: var(--text-main);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-cosmic);
      color: var(--text-main);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      /* Cyber Tech Grid Background */
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(224, 132, 252, 0.08) 0%, transparent 60%),
        linear-gradient(to right, rgba(224, 132, 252, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(224, 132, 252, 0.04) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
    }

    ::selection {
      background: var(--neon-crimson);
      color: #FFFFFF;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .cosmic-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed Background WebGL Canvas */
    #cosmic-bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    /* Header Nav */
    .cosmic-nav-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(8, 13, 16, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--surface-border);
      padding: 16px 0;
    }

    .nav-inner-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-mark-box {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .brand-hexagon-badge {
      width: 32px;
      height: 32px;
      border: 1.5px solid var(--neon-purple);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--neon-purple);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      box-shadow: 0 0 14px rgba(224, 132, 252, 0.35);
      background: rgba(224, 132, 252, 0.1);
    }

    .nav-menu-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .nav-item-link {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      transition: all 0.2s ease;
    }

    .nav-item-link:hover, .nav-item-link.active {
      color: var(--neon-purple);
      text-shadow: 0 0 10px rgba(224, 132, 252, 0.5);
    }

    /* Minimal Outline Buttons */
    .neon-outline-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 22px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .neon-outline-btn.primary {
      border: 1.5px solid var(--neon-crimson);
      color: #FFFFFF;
      background: rgba(226, 28, 95, 0.12);
      box-shadow: 0 0 16px rgba(226, 28, 95, 0.3);
    }

    .neon-outline-btn.primary:hover {
      background: var(--neon-crimson);
      box-shadow: 0 0 28px rgba(226, 28, 95, 0.6);
      transform: translateY(-2px);
    }

    .neon-outline-btn.secondary {
      border: 1.5px solid var(--neon-purple);
      color: var(--neon-purple);
      background: rgba(224, 132, 252, 0.08);
    }

    .neon-outline-btn.secondary:hover {
      background: rgba(224, 132, 252, 0.2);
      box-shadow: 0 0 20px rgba(224, 132, 252, 0.4);
      transform: translateY(-2px);
    }

    /* Section Base */
    .cosmic-section {
      padding: 100px 0;
      position: relative;
      z-index: 1;
      border-bottom: 1px solid var(--surface-border);
    }

    .section-telemetry-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      border: 1px solid var(--neon-purple);
      background: rgba(224, 132, 252, 0.08);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--neon-purple);
      margin-bottom: 24px;
      letter-spacing: 0.08em;
    }

    .section-telemetry-pill .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--neon-crimson);
      box-shadow: 0 0 8px var(--neon-crimson);
    }

    .section-title-large {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 4.5vw, 3.6rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: #FFFFFF;
      margin-bottom: 20px;
    }

    /* =========================================================================
       01. PANEL: HOME / HERO SECTION
       ========================================================================= */
    .hero-panel-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      align-items: center;
      min-height: 560px;
    }

    .hero-content-side {
      display: flex;
      flex-direction: column;
    }

    .hero-name-title {
      font-family: var(--font-display);
      font-size: clamp(2.8rem, 5.5vw, 5rem);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      margin-bottom: 16px;
    }

    .hero-name-title .gradient-neon {
      background: linear-gradient(135deg, var(--neon-crimson) 0%, var(--neon-purple) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 30px rgba(224, 132, 252, 0.3);
    }

    .hero-role-badge {
      font-family: var(--font-mono);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--neon-purple);
      margin-bottom: 24px;
      letter-spacing: 0.04em;
    }

    .hero-intro-text {
      font-size: 1.08rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 32px;
      max-width: 540px;
    }

    .hero-tech-strip {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 36px;
    }

    .tech-item-bubble {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-main);
      background: var(--surface-glass);
      border: 1px solid var(--surface-border);
      padding: 6px 14px;
      border-radius: 4px;
      backdrop-filter: blur(10px);
    }

    .hero-geometry-side {
      width: 100%;
      height: 480px;
      position: relative;
      border-radius: 20px;
      background: radial-gradient(circle at center, rgba(224, 132, 252, 0.12) 0%, rgba(8, 13, 16, 0) 70%);
      border: 1px solid var(--surface-border);
      overflow: hidden;
    }

    #hero-spatial-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .geometry-overlay-telemetry {
      position: absolute;
      bottom: 16px;
      left: 20px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--neon-purple);
      pointer-events: none;
    }

    /* =========================================================================
       02. PANEL: ABOUT (Futuristic Silhouette & Focus Areas)
       ========================================================================= */
    .about-panel-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      align-items: center;
    }

    .silhouette-grid-frame {
      width: 100%;
      height: 440px;
      background: #0B0E14;
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .silhouette-grid-svg {
      width: 80%;
      height: 80%;
      opacity: 0.9;
    }

    .silhouette-scan-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, var(--neon-crimson) 50%, transparent 100%);
      box-shadow: 0 0 14px var(--neon-crimson);
      animation: cyberScanMove 4s ease-in-out infinite alternate;
    }

    @keyframes cyberScanMove {
      0% { top: 5%; }
      100% { top: 95%; }
    }

    .about-content-col {
      display: flex;
      flex-direction: column;
    }

    .bio-quote-statement {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.4;
      margin-bottom: 20px;
      border-left: 3px solid var(--neon-crimson);
      padding-left: 18px;
    }

    .bio-body-text {
      font-size: 1.02rem;
      color: var(--text-muted);
      line-height: 1.75;
      margin-bottom: 28px;
    }

    .focus-areas-container {
      margin-top: 12px;
    }

    .focus-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--neon-purple);
      font-weight: 700;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
      display: block;
    }

    .focus-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .focus-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 6px 14px;
      border-radius: 4px;
      background: rgba(226, 28, 95, 0.1);
      border: 1px solid rgba(226, 28, 95, 0.3);
      color: #FFFFFF;
    }

    /* =========================================================================
       03. PANEL: PROJECTS (Isometric 3D Grid & Neon Rings)
       ========================================================================= */
    .projects-isometric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 32px;
      margin-top: 36px;
    }

    .cyber-project-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(16px);
    }

    .cyber-project-card:hover {
      transform: translateY(-6px);
      border-color: var(--neon-purple);
      box-shadow: 0 16px 40px rgba(224, 132, 252, 0.2);
    }

    .project-isometric-viewport {
      width: 100%;
      height: 210px;
      position: relative;
      background: #06090D;
      overflow: hidden;
    }

    .project-thumb-box {
      width: 100%;
      height: 100%;
    }

    .project-thumb-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .cyber-project-card:hover .project-thumb-box img {
      transform: scale(1.06);
    }

    .project-index-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(8, 13, 16, 0.85);
      border: 1px solid var(--neon-purple);
      padding: 4px 10px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--neon-purple);
    }

    .project-info-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .project-category-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--neon-crimson);
      font-weight: 700;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .project-title-heading {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 10px;
    }

    .project-description-text {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .project-tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 24px;
    }

    .neon-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(26, 29, 38, 0.9);
      border: 1px solid rgba(224, 132, 252, 0.2);
      color: var(--text-main);
      padding: 3px 8px;
      border-radius: 3px;
    }

    .project-action-links {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. PANEL: SKILLS (Radar Spider Visualization & Categorized Cards)
       ========================================================================= */
    .skills-panel-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      align-items: center;
      margin-top: 36px;
    }

    .radar-spider-box {
      width: 100%;
      height: 380px;
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .skills-categorized-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .skills-category-column {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 20px;
    }

    .cat-header-strip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--surface-border);
      margin-bottom: 16px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--neon-purple);
    }

    .skills-tag-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .skill-neon-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 4px;
      background: var(--surface-glass);
      border: 1px solid rgba(224, 132, 252, 0.2);
      font-family: var(--font-mono);
      font-size: 0.82rem;
    }

    .skill-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--neon-crimson);
    }

    /* =========================================================================
       05. PANEL: EXPERIENCE (Cosmic Nebula Timeline)
       ========================================================================= */
    .experience-timeline-stack {
      position: relative;
      padding-left: 48px;
      margin-top: 40px;
    }

    .experience-timeline-stack::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 19px;
      width: 2px;
      background: linear-gradient(180deg, var(--neon-crimson) 0%, var(--neon-purple) 100%);
      box-shadow: 0 0 12px rgba(224, 132, 252, 0.4);
    }

    .cosmic-timeline-node {
      position: relative;
      margin-bottom: 36px;
    }

    .node-indicator {
      position: absolute;
      left: -48px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .pulse-core {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--neon-purple);
      box-shadow: 0 0 12px var(--neon-purple);
      border: 2px solid #FFFFFF;
    }

    .node-glass-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 24px;
      backdrop-filter: blur(16px);
    }

    .card-date-meta {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--neon-crimson);
      margin-bottom: 8px;
    }

    .card-role-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .card-company-name {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--neon-purple);
      margin-bottom: 14px;
    }

    .card-desc-para {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 14px;
    }

    .card-tech-meta {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-dim);
    }

    /* =========================================================================
       06. PANEL: OPEN SOURCE
       ========================================================================= */
    .opensource-panel-grid {
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 36px;
      margin-top: 36px;
    }

    .stat-circular-overview {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .stat-circle-graphic {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 4px solid var(--neon-purple);
      box-shadow: 0 0 24px rgba(224, 132, 252, 0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .stat-big-num {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .github-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .github-repo-card {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* =========================================================================
       07. PANEL: RESUME (Glassmorphic Physical Document)
       ========================================================================= */
    .resume-glass-dossier {
      background: rgba(26, 29, 38, 0.85);
      border: 1.5px solid var(--neon-purple);
      box-shadow: 0 20px 50px rgba(224, 132, 252, 0.15);
      border-radius: 16px;
      padding: 40px;
      max-width: 920px;
      margin: 36px auto 0;
      backdrop-filter: blur(24px);
    }

    .resume-header-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--surface-border);
      margin-bottom: 28px;
    }

    /* =========================================================================
       08. PANEL: CONTACT SHEET
       ========================================================================= */
    .contact-panel-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 36px;
    }

    .contact-form-glass {
      background: var(--surface-card);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 32px;
    }

    .form-input-cosmic {
      width: 100%;
      padding: 14px 16px;
      border-radius: 8px;
      border: 1px solid var(--surface-border);
      background: rgba(8, 13, 16, 0.8);
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      margin-bottom: 20px;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .form-input-cosmic:focus {
      border-color: var(--neon-purple);
      box-shadow: 0 0 16px rgba(224, 132, 252, 0.3);
    }

    /* Footer */
    .cosmic-footer {
      padding: 40px 0;
      border-top: 1px solid var(--surface-border);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-dim);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .hero-panel-grid,
      .about-panel-grid,
      .skills-panel-grid,
      .opensource-panel-grid,
      .contact-panel-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Background Canvas for Interactive Particle Cloud -->
  <canvas id="cosmic-bg-canvas"></canvas>

  <!-- Navigation Bar -->
  <header class="cosmic-nav-bar">
    <div class="cosmic-container">
      <div class="nav-inner-row">
        <a href="#home" class="brand-mark-box">
          <span class="brand-hexagon-badge">${initials}</span>
          <span>${safeName}</span>
        </a>

        <nav class="nav-menu-links">
          <a href="#home" class="nav-item-link active">01 / Home</a>
          <a href="#about" class="nav-item-link">02 / About</a>
          <a href="#projects" class="nav-item-link">03 / Projects</a>
          <a href="#skills" class="nav-item-link">04 / Skills</a>
          <a href="#experience" class="nav-item-link">05 / Experience</a>
          <a href="#opensource" class="nav-item-link">06 / Open Source</a>
          <a href="#resume" class="nav-item-link">07 / Resume</a>
          <a href="#contact" class="nav-item-link">08 / Contact</a>
        </nav>

        <div>
          <a href="#contact" class="neon-outline-btn primary"><span>LET'S CONNECT ➔</span></a>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         PANEL 01: HOME PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="home">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>COSMIC GEOMETRY // CYBER EDITORIAL</span>
        </div>

        <div class="hero-panel-grid">
          <div class="hero-content-side">
            <h1 class="hero-name-title">
              HELLO,<br>
              I'M <span class="gradient-neon">${safeName}</span>
            </h1>
            <div class="hero-role-badge">➔ ${safeRole}</div>
            <p class="hero-intro-text">
              ${safeBio || 'Building scalable cloud architectures, intelligent algorithmic interfaces, and high-performance decentralized systems.'}
            </p>

            <div class="hero-tech-strip">
              ${data.skills.slice(0, 6).map(s => `<span class="tech-item-bubble">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 16px;">
              <a href="#projects" class="neon-outline-btn primary"><span>EXPLORE PROJECTS ➔</span></a>
              <a href="#resume" class="neon-outline-btn secondary"><span>DOWNLOAD CV</span></a>
            </div>
          </div>

          <div class="hero-geometry-side" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/cosmic_astronaut_3d.jpg" alt="${safeName} 3D Cosmic Command" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 28px; border: 2.5px solid var(--surface-border); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 40px rgba(224, 132, 252, 0.4);" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 02: ABOUT PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="about">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>02 // CANDIDATE DOSSIER</span>
        </div>

        <h2 class="section-title-large">ABOUT ME</h2>

        <div class="about-panel-grid">
          <div class="silhouette-grid-frame" style="display: flex; justify-content: center; align-items: center; padding: 12px; background: rgba(18, 10, 36, 0.6); border: 1.5px solid var(--surface-border); border-radius: 24px;">
            <img src="/assets/3d/pristine_glass_cube_workstation_3d.jpg" alt="3D Workstation Dossier" style="width: 100%; max-width: 320px; border-radius: 18px; box-shadow: 0 12px 30px rgba(0,0,0,0.7);" />
          </div>

          <div class="about-content-col">
            <div class="bio-quote-statement">
              "Dedicated to engineering software systems that combine architectural precision, computational power, and human-centric design."
            </div>
            <p class="bio-body-text">${safeBio}</p>
            
            <div class="focus-areas-container">
              <span class="focus-label">FOCUS AREAS //</span>
              <div class="focus-pill-row">
                ${focusAreas.map(f => `<span class="focus-pill">⚡ ${f}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 03: PROJECTS PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="projects">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>03 // FEATURED ENGINEERING ARTIFACTS</span>
        </div>

        <h2 class="section-title-large">PROJECTS</h2>

        <div class="projects-isometric-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 04: SKILLS PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="skills">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>04 // TECHNICAL CAPABILITIES</span>
        </div>

        <h2 class="section-title-large">SKILLS</h2>

        <div class="skills-panel-grid">
          <div class="radar-spider-box">
            <!-- SVG Radar Constellation Chart -->
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none" style="filter: drop-shadow(0 0 12px rgba(224,132,252,0.3));">
              <!-- Concentric Polygons -->
              <polygon points="130,20 225,75 225,185 130,240 35,185 35,75" stroke="rgba(224, 132, 252, 0.2)" stroke-width="1.5" fill="none"/>
              <polygon points="130,50 195,85 195,175 130,210 65,175 65,85" stroke="rgba(224, 132, 252, 0.3)" stroke-width="1" fill="none"/>
              <polygon points="130,80 165,100 165,160 130,180 95,160 95,100" stroke="rgba(224, 132, 252, 0.4)" stroke-width="1" fill="none"/>
              
              <!-- Data Polygon -->
              <polygon points="130,30 215,80 185,170 130,200 45,175 40,80" stroke="#E21C5F" stroke-width="2" fill="rgba(226, 28, 95, 0.25)"/>
              
              <!-- Center Core -->
              <circle cx="130" cy="130" r="4" fill="#E084FC"/>
            </svg>
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-purple); margin-top: 12px;">
              RADAR // MULTI-DISCIPLINARY PROFICIENCY
            </div>
          </div>

          <div class="skills-categorized-grid">
            ${skillsGroupHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 05: EXPERIENCE PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="experience">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>05 // PROFESSIONAL JOURNEY</span>
        </div>

        <h2 class="section-title-large">EXPERIENCE</h2>

        <div class="experience-timeline-stack">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 06: OPEN SOURCE PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="opensource">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>06 // CODEBASE CONTRIBUTIONS</span>
        </div>

        <h2 class="section-title-large">OPEN SOURCE</h2>

        <div class="opensource-panel-grid">
          <div class="stat-circular-overview">
            <div class="stat-circle-graphic">
              <span class="stat-big-num">${data.projects.length}+</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-purple);">PUBLIC REPOS</span>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">
              Active contributor to open-source protocols, tools, and developer libraries.
            </p>
            <a href="${safeGithub}" target="_blank" rel="noopener" class="neon-outline-btn secondary" style="width: 100%;">
              <span>VIEW GITHUB PROFILE ↗</span>
            </a>
          </div>

          <div class="github-cards-stack">
            ${data.projects.slice(0, 3).map((p, idx) => `
              <div class="github-repo-card">
                <div>
                  <h4 style="font-family: var(--font-display); font-size: 1.15rem; color: #FFFFFF; margin-bottom: 4px;">${TemplateHelper.escapeHtml(p.name)}</h4>
                  <p style="font-size: 0.88rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(p.desc)}</p>
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-purple); display: flex; gap: 12px; align-items: center;">
                  <span>★ VERIFIED</span>
                  ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="neon-outline-btn secondary" style="padding: 4px 10px; font-size: 0.75rem;">CODE ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 07: RESUME PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="resume">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>07 // CREDENTIALS &amp; DOSSIER</span>
        </div>

        <h2 class="section-title-large">RESUME</h2>

        <div class="resume-glass-dossier">
          <div class="resume-header-row">
            <div>
              <h3 style="font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: #FFFFFF;">${safeName}</h3>
              <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--neon-purple);">${safeRole}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-align: right;">
              <div>${safeEmail}</div>
              <div>${TemplateHelper.escapeHtml(data.location || 'Remote / Worldwide')}</div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-crimson); margin-bottom: 8px;">PROFILE SUMMARY</h4>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">${safeBio}</p>
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--surface-border); padding-top: 18px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-purple); margin-bottom: 12px;">ACADEMIC BACKGROUND</h4>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--neon-purple); padding-left: 12px;">
                <div style="font-weight: 800; color: #FFFFFF; font-size: 1rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--surface-border); padding-top: 18px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-crimson); margin-bottom: 12px;">VERIFIED CERTIFICATIONS</h4>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: #FFFFFF;">
                <span style="background: rgba(168,85,247,0.15); border: 1px solid var(--neon-purple); color: var(--neon-purple); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--surface-border); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">DOSSIER // AUTHENTICATED SYSTEM SPEC</span>
            <button class="neon-outline-btn primary" onclick="triggerPrintResume()">
              <span>DOWNLOAD RESUME (PDF) ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         PANEL 08: CONTACT PAGE
         ========================================================================= -->
    <section class="cosmic-section" id="contact" style="border-bottom: none;">
      <div class="cosmic-container">
        <div class="section-telemetry-pill">
          <span class="dot"></span>
          <span>08 // TRANSMIT SIGNAL</span>
        </div>

        <div class="contact-panel-grid">
          <div>
            <h2 class="section-title-large">LET'S COLLABORATE.</h2>
            <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px;">
              Ready to discuss high-impact software engineering, architecture consultations, or full-time opportunities.
            </p>

            <div style="display: flex; flex-direction: column; gap: 16px; font-family: var(--font-mono); font-size: 0.9rem;">
              <div>
                <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">DIRECT INBOX:</span>
                <a href="mailto:${safeEmail}" style="color: var(--neon-purple); font-weight: 700;">${safeEmail}</a>
              </div>
              <div>
                <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">GITHUB PROFILE:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener" style="color: #FFFFFF;">${safeGithub.replace('https://', '')}</a>
              </div>
              <div>
                <span style="color: var(--text-dim); font-size: 0.75rem; display: block;">LINKEDIN:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener" style="color: #FFFFFF;">${safeLinkedin.replace('https://', '')}</a>
              </div>
            </div>
          </div>

          <div class="contact-form-glass">
            <form onsubmit="handleCosmicContact(event)">
              <input type="text" class="form-input-cosmic" placeholder="YOUR NAME" required />
              <input type="email" class="form-input-cosmic" placeholder="EMAIL ADDRESS" required />
              <textarea class="form-input-cosmic" style="min-height: 130px; resize: vertical;" placeholder="PROJECT INQUIRY / MESSAGE" required></textarea>
              <button type="submit" class="neon-outline-btn primary" style="width: 100%;">
                <span>SEND MESSAGE ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="cosmic-footer">
    <div class="cosmic-container">
      <div>© 2026 ${safeName} • Cosmic Cyber Geometry Design System • Powered by Three.js &amp; Nano Banana</div>
    </div>
  </footer>

  <!-- Three.js Cosmic Geometry Particle Field & Spatial Specimen -->
  <script>
    function initHeroSpatial3D() {
      const canvas = document.getElementById('hero-spatial-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.z = 24;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Cosmic Geometry: Double Gyroscope Rings + Icosahedron Crystal Core + Orbital Points
      const group = new THREE.Group();
      scene.add(group);

      const purpleWire = new THREE.MeshBasicMaterial({ color: 0xE084FC, wireframe: true, transparent: true, opacity: 0.6 });
      const crimsonWire = new THREE.MeshBasicMaterial({ color: 0xE21C5F, wireframe: true, transparent: true, opacity: 0.5 });
      const dotMat = new THREE.PointsMaterial({ color: 0xE084FC, size: 0.35 });

      // Core
      const coreGeo = new THREE.IcosahedronGeometry(7, 1);
      const coreMesh = new THREE.Mesh(coreGeo, purpleWire);
      group.add(coreMesh);

      // Rings
      const ring1Geo = new THREE.TorusGeometry(10, 0.15, 16, 60);
      const ring1 = new THREE.Mesh(ring1Geo, crimsonWire);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(12, 0.12, 16, 60);
      const ring2 = new THREE.Mesh(ring2Geo, purpleWire);
      ring2.rotation.y = Math.PI / 4;
      group.add(ring2);

      const pts = new THREE.Points(coreGeo, dotMat);
      group.add(pts);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.006;
        group.rotation.x += 0.003;
        ring1.rotation.z += 0.008;
        ring2.rotation.x += 0.005;

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
        confetti({ particleCount: 70, spread: 60, colors: ['#E21C5F', '#E084FC', '#FFFFFF'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleCosmicContact(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>TRANSMITTED SUCCESSFULLY ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroSpatial3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { CosmicCyberGeometryTemplate };

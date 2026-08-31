/**
 * Template 01 / Design Template: ENGINEERING ARCHIVE
 * Style: Industrial Engineering Archive × Swiss Editorial Design × Architectural Blueprint × Technical Laboratory Notebook
 * Palette: Warm Architectural Ivory (#FAF9F5), Near-Black Graphite (#121316), Blueprint Blue (#0A5CFF), Signal Orange (#FF5500), Warm Gray (#6B7280).
 * Motifs: Architectural 12-col grid, blueprint crosshair registration marks (+), measurement ticks, numbered dossiers, engineering specifications.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const EngineeringArchiveTemplate = {
  id: 'engineering-archive',
  name: 'Engineering Archive',
  category: 'Industrial Editorial / Swiss Blueprint',
  description: 'Industrial engineering archive and Swiss editorial publication with architectural 12-column grid, blueprint measurement marks, numbered project dossiers, and technical capability map.',
  recommendedFor: ['Full Stack Engineer', 'Systems Architect', 'AI/ML Researcher', 'Infrastructure Engineer', 'Technical Founder', 'Software Engineer'],
  palette: ['#FAF9F5', '#121316', '#0A5CFF', '#FF5500', '#6B7280'],

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

    // 03. Alternating Project Dossiers HTML
    const assignedArtworks = new Set();
    const userSeed = data.github || data.username || data.name || '';
    const projectDossiersHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const isEven = idx % 2 === 1;
      const isWide = idx % 3 === 2;
      const layoutClass = isWide ? 'dossier-layout-wide' : isEven ? 'dossier-layout-reverse' : 'dossier-layout-standard';
      
      const techPills = p.tech.split(/[,•|]+/).map(t => `<span class="tech-spec-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="project-dossier-item ${layoutClass}" id="dossier-${projNum}" data-category="${TemplateHelper.escapeHtml(p.category || 'Engineering')}">
          <div class="dossier-header-strip">
            <div class="dossier-id-box">
              <span class="crosshair-icon">+</span>
              <span class="dossier-num">PROJECT DOSSIER // ${projNum}</span>
            </div>
            <div class="dossier-status-stamp">SPECIFICATION: VERIFIED</div>
          </div>

          <div class="dossier-body-grid">
            <div class="dossier-meta-col">
              <div class="meta-field-group">
                <span class="field-label">DOMAIN / CATEGORY</span>
                <span class="field-value">${TemplateHelper.escapeHtml(p.category || 'Distributed Systems')}</span>
              </div>
              <div class="meta-field-group">
                <span class="field-label">DEVELOPMENT CYCLE</span>
                <span class="field-value">${TemplateHelper.escapeHtml(p.year || '2024—2026')}</span>
              </div>
              <div class="meta-field-group">
                <span class="field-label">ENGINEERING ROLE</span>
                <span class="field-value">${TemplateHelper.escapeHtml(p.role || safeRole)}</span>
              </div>
            </div>

            <div class="dossier-content-col">
              <h3 class="dossier-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
              <p class="dossier-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
              
              <div class="dossier-tech-stack">
                <span class="field-label">TECHNOLOGY STACK:</span>
                <div class="tech-pill-container">${techPills}</div>
              </div>

              <div class="dossier-actions-row">
                ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="eng-btn eng-btn-primary"><span>DEPLOYED ARTIFACT ↗</span></a>` : ''}
                ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="eng-btn eng-btn-outline"><span>SOURCE ARCHIVE (GITHUB) ↗</span></a>` : ''}
              </div>
            </div>

            <div class="dossier-visual-col">
              <div class="blueprint-frame">
                <div class="blueprint-corner-marks">
                  <span class="c-mark tl">+</span><span class="c-mark tr">+</span>
                  <span class="c-mark bl">+</span><span class="c-mark br">+</span>
                </div>
                <div class="blueprint-media-box">
                  ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'engineering-archive', idx, assignedArtworks, userSeed)}
                </div>
                <div class="blueprint-caption-bar">
                  <span>FIG ${projNum}.0 // ARCHITECTURAL SCHEMATIC</span>
                  <span>SCALE: 1:1</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Categorized Skills Map
    const skillsGroup1 = data.skills.slice(0, Math.ceil(data.skills.length / 3));
    const skillsGroup2 = data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3));
    const skillsGroup3 = data.skills.slice(Math.ceil((data.skills.length * 2) / 3));

    const renderSkillItems = (skills, categoryTitle, codePrefix) => `
      <div class="capability-category-card">
        <div class="category-header">
          <span class="cat-code">[${codePrefix}]</span>
          <h4 class="cat-title">${categoryTitle}</h4>
        </div>
        <div class="capability-list">
          ${skills.map((s, idx) => `
            <div class="capability-item">
              <span class="item-index">${codePrefix}-${String(idx + 1).padStart(2, '0')}</span>
              <span class="item-name">${TemplateHelper.escapeHtml(s)}</span>
              <span class="item-status">VERIFIED</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 05. Experience Timeline
    const experienceTimelineHtml = data.experience.map((exp, idx) => {
      const expNum = String(idx + 1).padStart(2, '0');
      return `
        <div class="timeline-entry-node">
          <div class="timeline-axis-marker">
            <span class="axis-cross">+</span>
            <span class="axis-code">EXP-${expNum}</span>
          </div>
          <div class="timeline-entry-card">
            <div class="entry-meta-header">
              <span class="entry-date-range">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</span>
              <span class="entry-location">${TemplateHelper.escapeHtml(exp.location || 'HYBRID / GLOBAL')}</span>
            </div>
            <h3 class="entry-role-title">${TemplateHelper.escapeHtml(exp.role)}</h3>
            <div class="entry-company-name">@ ${TemplateHelper.escapeHtml(exp.company)}</div>
            <p class="entry-description-text">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `<div class="entry-tech-badge">DISCIPLINE: ${TemplateHelper.escapeHtml(exp.technologies)}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Metrics computation
    const totalProjects = data.projects.length || 8;
    const totalSkills = data.skills.length || 14;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Engineering Archive &amp; Technical Dossier</title>
  <meta name="description" content="${safeName} — ${safeRole}. Comprehensive engineering archive, technical dossier, architectural schematics, and code repository.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  
  <style>
    /* =========================================================================
       ENGINEERING ARCHIVE DESIGN TOKENS (Swiss Editorial / Architectural Blueprint)
       ========================================================================= */
    :root {
      --bg-paper: #FAF9F5;
      --bg-paper-alt: #F2EFE9;
      --surface-panel: #FFFFFF;
      --surface-tint: #F5F3ED;
      --text-graphite: #121316;
      --text-muted: #57534E;
      --text-light: #8C887B;
      --blueprint-blue: #0A5CFF;
      --signal-orange: #FF5500;
      --border-line: #D8D5CC;
      --border-dark: #121316;
      --grid-line-color: rgba(18, 19, 22, 0.05);

      --font-editorial: 'Space Grotesk', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-body: 'Inter', sans-serif;

      --container-width: 1440px;
      --grid-gutter: 24px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
      background-color: var(--bg-paper);
      color: var(--text-graphite);
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-paper);
      color: var(--text-graphite);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      /* Subtle Architectural Blueprint Background Grid */
      background-image: 
        linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Selection Color */
    ::selection {
      background: var(--blueprint-blue);
      color: #FFFFFF;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Container Utility */
    .archive-container {
      width: 100%;
      max-width: var(--container-width);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Top Global Engineering Header */
    .archive-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(250, 249, 245, 0.94);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-line);
      padding: 18px 0;
    }

    .header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-brand-mark {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .brand-square-badge {
      width: 28px;
      height: 28px;
      background: var(--text-graphite);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
    }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .nav-link {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: color 0.2s ease;
      position: relative;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--blueprint-blue);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--blueprint-blue);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    /* Technical Buttons */
    .eng-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border: 1px solid var(--text-graphite);
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .eng-btn-primary {
      background: var(--text-graphite);
      color: #FFFFFF;
    }

    .eng-btn-primary:hover {
      background: var(--blueprint-blue);
      border-color: var(--blueprint-blue);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(10, 92, 255, 0.25);
    }

    .eng-btn-outline {
      background: transparent;
      color: var(--text-graphite);
    }

    .eng-btn-outline:hover {
      background: var(--text-graphite);
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    .eng-btn-orange {
      background: var(--signal-orange);
      color: #FFFFFF;
      border-color: var(--signal-orange);
    }

    .eng-btn-orange:hover {
      background: #D94400;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(255, 85, 0, 0.3);
    }

    /* Section Wrapper */
    .archive-section {
      padding: 96px 0;
      border-bottom: 1px solid var(--border-line);
      position: relative;
    }

    .section-header-tag {
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--blueprint-blue);
      margin-bottom: 32px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .section-header-tag .cross {
      font-size: 1.1rem;
      font-weight: 800;
    }

    .section-main-heading {
      font-family: var(--font-editorial);
      font-size: clamp(2.4rem, 4.5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: var(--text-graphite);
      margin-bottom: 24px;
    }

    /* =========================================================================
       01. HERO / HOME SECTION (12-Col Asymmetric Architectural Grid)
       ========================================================================= */
    .hero-architectural-grid {
      display: grid;
      grid-template-columns: 2fr 6fr 4fr;
      gap: 32px;
      align-items: stretch;
      min-height: 620px;
    }

    .hero-meta-col {
      border-right: 1px solid var(--border-line);
      padding-right: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .meta-tag-item {
      margin-bottom: 28px;
    }

    .meta-tag-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 6px;
    }

    .meta-tag-value {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-graphite);
    }

    .hero-center-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 12px;
    }

    .editorial-hero-statement {
      font-family: var(--font-editorial);
      font-size: clamp(2.8rem, 5.8vw, 5.2rem);
      font-weight: 800;
      line-height: 0.98;
      letter-spacing: -0.04em;
      color: var(--text-graphite);
      margin-bottom: 24px;
      text-transform: uppercase;
    }

    .editorial-hero-statement .highlight-blue {
      color: var(--blueprint-blue);
      display: inline-block;
    }

    .hero-role-spec {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--signal-orange);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hero-bio-para {
      font-size: 1.05rem;
      line-height: 1.65;
      color: var(--text-muted);
      max-width: 620px;
      margin-bottom: 36px;
    }

    .hero-actions-deck {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .hero-specimen-col {
      border: 1px solid var(--border-line);
      background: var(--surface-panel);
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .specimen-canvas-viewport {
      flex: 1;
      width: 100%;
      min-height: 380px;
      position: relative;
      background: #FAF9F5;
      overflow: hidden;
    }

    #specimen-3d-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .specimen-coordinates-overlay {
      position: absolute;
      bottom: 12px;
      left: 14px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-light);
      line-height: 1.4;
      pointer-events: none;
    }

    .specimen-footer-info {
      padding: 16px 20px;
      border-top: 1px solid var(--border-line);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      background: #FFFFFF;
    }

    /* Hero Metrics Strip */
    .hero-metrics-strip {
      margin-top: 48px;
      border-top: 1px solid var(--border-line);
      border-bottom: 1px solid var(--border-line);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: var(--surface-panel);
    }

    .metric-cell {
      padding: 24px 28px;
      border-right: 1px solid var(--border-line);
      display: flex;
      flex-direction: column;
    }

    .metric-cell:last-child {
      border-right: none;
    }

    .metric-digit {
      font-family: var(--font-editorial);
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text-graphite);
      line-height: 1;
      margin-bottom: 6px;
    }

    .metric-label-text {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    /* =========================================================================
       02. ABOUT SECTION (Editorial Dossier)
       ========================================================================= */
    .about-dossier-grid {
      display: grid;
      grid-template-columns: 2fr 6fr 4fr;
      gap: 36px;
    }

    .dossier-index-side {
      font-family: var(--font-editorial);
      font-size: 5rem;
      font-weight: 800;
      line-height: 1;
      color: var(--border-line);
    }

    .dossier-main-text {
      padding-right: 20px;
    }

    .positioning-statement {
      font-family: var(--font-editorial);
      font-size: 1.7rem;
      font-weight: 700;
      line-height: 1.35;
      color: var(--text-graphite);
      margin-bottom: 24px;
      border-left: 3px solid var(--blueprint-blue);
      padding-left: 18px;
    }

    .bio-longform-paragraph {
      font-size: 1.05rem;
      line-height: 1.75;
      color: var(--text-muted);
      margin-bottom: 20px;
    }

    .dossier-spec-card {
      background: var(--surface-panel);
      border: 1px solid var(--border-line);
      padding: 28px;
    }

    .spec-table-row {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
      border-bottom: 1px solid var(--border-line);
      font-family: var(--font-mono);
      font-size: 0.82rem;
    }

    .spec-table-row:last-child {
      border-bottom: none;
    }

    .spec-k {
      color: var(--text-light);
      text-transform: uppercase;
    }

    .spec-v {
      font-weight: 700;
      color: var(--text-graphite);
      text-align: right;
    }

    /* =========================================================================
       03. PROJECTS ARCHIVE (Alternating Numbered Technical Dossiers)
       ========================================================================= */
    .project-dossiers-stack {
      display: flex;
      flex-direction: column;
      gap: 56px;
      margin-top: 40px;
    }

    .project-dossier-item {
      background: var(--surface-panel);
      border: 1px solid var(--border-dark);
      box-shadow: 4px 4px 0px var(--text-graphite);
      padding: 32px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .project-dossier-item:hover {
      transform: translateY(-4px);
      box-shadow: 8px 8px 0px var(--text-graphite);
    }

    .dossier-header-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border-line);
      margin-bottom: 28px;
      font-family: var(--font-mono);
    }

    .dossier-id-box {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.85rem;
    }

    .dossier-status-stamp {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--signal-orange);
      border: 1px solid var(--signal-orange);
      padding: 3px 8px;
      letter-spacing: 0.05em;
    }

    .dossier-body-grid {
      display: grid;
      grid-template-columns: 3fr 5fr 4fr;
      gap: 32px;
      align-items: start;
    }

    .dossier-layout-reverse .dossier-body-grid {
      grid-template-columns: 3fr 4fr 5fr;
    }

    .meta-field-group {
      margin-bottom: 20px;
    }

    .field-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: block;
      margin-bottom: 4px;
    }

    .field-value {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-graphite);
    }

    .dossier-project-title {
      font-family: var(--font-editorial);
      font-size: 1.85rem;
      font-weight: 800;
      line-height: 1.2;
      color: var(--text-graphite);
      margin-bottom: 14px;
    }

    .dossier-project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .tech-pill-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 24px;
    }

    .tech-spec-pill {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
      background: var(--bg-paper-alt);
      border: 1px solid var(--border-line);
      padding: 4px 10px;
      color: var(--text-graphite);
    }

    .dossier-actions-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .blueprint-frame {
      border: 1px solid var(--border-line);
      background: #FAF9F5;
      padding: 12px;
      position: relative;
    }

    .blueprint-corner-marks .c-mark {
      position: absolute;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-light);
    }

    .blueprint-corner-marks .tl { top: 2px; left: 4px; }
    .blueprint-corner-marks .tr { top: 2px; right: 4px; }
    .blueprint-corner-marks .bl { bottom: 2px; left: 4px; }
    .blueprint-corner-marks .br { bottom: 2px; right: 4px; }

    .blueprint-media-box {
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #121316;
    }

    .blueprint-media-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(1.05);
      transition: transform 0.4s ease;
    }

    .project-dossier-item:hover .blueprint-media-box img {
      transform: scale(1.04);
    }

    .blueprint-caption-bar {
      display: flex;
      justify-content: space-between;
      padding-top: 8px;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--text-light);
    }

    /* =========================================================================
       04. SKILLS CAPABILITY MAP
       ========================================================================= */
    .capability-matrix-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
      margin-top: 36px;
    }

    .capability-category-card {
      background: var(--surface-panel);
      border: 1px solid var(--border-line);
      padding: 28px;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-line);
      margin-bottom: 20px;
    }

    .cat-code {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--blueprint-blue);
    }

    .cat-title {
      font-family: var(--font-editorial);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-graphite);
    }

    .capability-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .capability-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px dashed var(--border-line);
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .item-index {
      color: var(--text-light);
      font-size: 0.72rem;
    }

    .item-name {
      font-weight: 700;
      color: var(--text-graphite);
      flex: 1;
      padding: 0 12px;
    }

    .item-status {
      font-size: 0.7rem;
      color: var(--blueprint-blue);
      background: rgba(10, 92, 255, 0.08);
      padding: 2px 6px;
    }

    /* =========================================================================
       05. EXPERIENCE TIMELINE (Continuous Technical Line)
       ========================================================================= */
    .timeline-schematic-track {
      position: relative;
      padding-left: 48px;
      margin-top: 40px;
    }

    .timeline-schematic-track::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 18px;
      width: 2px;
      background: var(--text-graphite);
    }

    .timeline-entry-node {
      position: relative;
      margin-bottom: 48px;
    }

    .timeline-axis-marker {
      position: absolute;
      left: -48px;
      top: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--blueprint-blue);
    }

    .timeline-axis-marker .axis-cross {
      width: 20px;
      height: 20px;
      background: var(--text-graphite);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }

    .timeline-entry-card {
      background: var(--surface-panel);
      border: 1px solid var(--border-line);
      padding: 28px;
    }

    .entry-meta-header {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 12px;
    }

    .entry-date-range {
      font-weight: 700;
      color: var(--signal-orange);
    }

    .entry-role-title {
      font-family: var(--font-editorial);
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-graphite);
      margin-bottom: 4px;
    }

    .entry-company-name {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--blueprint-blue);
      margin-bottom: 16px;
    }

    .entry-description-text {
      font-size: 0.95rem;
      line-height: 1.65;
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .entry-tech-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-light);
      background: var(--bg-paper-alt);
      padding: 6px 12px;
      display: inline-block;
    }

    /* =========================================================================
       06. OPEN SOURCE / CONTRIBUTIONS ARCHIVE
       ========================================================================= */
    .opensource-dossier-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 24px;
      margin-top: 36px;
    }

    .repo-archive-card {
      background: var(--surface-panel);
      border: 1px solid var(--border-line);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .repo-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-light);
      margin-bottom: 16px;
    }

    .repo-name-text {
      font-family: var(--font-editorial);
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-graphite);
      margin-bottom: 10px;
    }

    .repo-desc-text {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .repo-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-line);
      padding-top: 14px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }

    /* =========================================================================
       07. RESUME DOSSIER
       ========================================================================= */
    .resume-paper-dossier {
      background: #FFFFFF;
      border: 2px solid var(--text-graphite);
      box-shadow: 6px 6px 0px var(--text-graphite);
      padding: 48px;
      max-width: 980px;
      margin: 40px auto 0;
    }

    .dossier-top-meta {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid var(--text-graphite);
      padding-bottom: 20px;
      margin-bottom: 32px;
      font-family: var(--font-mono);
    }

    .resume-name-title {
      font-family: var(--font-editorial);
      font-size: 2.4rem;
      font-weight: 800;
      color: var(--text-graphite);
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .resume-role-sub {
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      color: var(--blueprint-blue);
    }

    /* =========================================================================
       08. CONTACT TECHNICAL SHEET
       ========================================================================= */
    .contact-sheet-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 40px;
    }

    .contact-info-col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .contact-coords-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 24px;
    }

    .coord-item {
      font-family: var(--font-mono);
      font-size: 0.9rem;
    }

    .coord-label {
      color: var(--text-light);
      font-size: 0.75rem;
      display: block;
      margin-bottom: 2px;
    }

    .coord-val {
      font-weight: 700;
      color: var(--text-graphite);
    }

    .contact-form-panel {
      background: var(--surface-panel);
      border: 1px solid var(--border-dark);
      padding: 36px;
    }

    .form-group-field {
      margin-bottom: 20px;
    }

    .form-field-label {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-graphite);
      display: block;
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .form-technical-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--border-line);
      background: #FAF9F5;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: var(--text-graphite);
      outline: none;
      transition: border-color 0.2s ease;
    }

    .form-technical-input:focus {
      border-color: var(--blueprint-blue);
      background: #FFFFFF;
    }

    textarea.form-technical-input {
      min-height: 120px;
      resize: vertical;
    }

    /* Footer */
    .archive-footer {
      padding: 48px 0;
      background: var(--surface-panel);
      border-top: 1px solid var(--border-line);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .footer-inner-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    /* Responsive Queries */
    @media (max-width: 1024px) {
      .hero-architectural-grid,
      .about-dossier-grid,
      .contact-sheet-grid {
        grid-template-columns: 1fr;
      }

      .hero-meta-col {
        border-right: none;
        border-bottom: 1px solid var(--border-line);
        padding-bottom: 20px;
      }

      .dossier-body-grid,
      .dossier-layout-reverse .dossier-body-grid {
        grid-template-columns: 1fr;
      }

      .hero-metrics-strip {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .archive-header .header-nav {
        display: none;
      }

      .hero-metrics-strip {
        grid-template-columns: 1fr;
      }

      .resume-paper-dossier {
        padding: 24px;
      }
    }
  </style>
</head>
<body>

  <!-- Top Global Engineering Header -->
  <header class="archive-header">
    <div class="archive-container">
      <div class="header-inner">
        <a href="#hero" class="header-brand-mark">
          <span class="brand-square-badge">${initials}</span>
          <span>${safeName} // EA-01</span>
        </a>

        <nav class="header-nav">
          <a href="#hero" class="nav-link active">01 / Index</a>
          <a href="#about" class="nav-link">02 / Dossier</a>
          <a href="#projects" class="nav-link">03 / Projects</a>
          <a href="#skills" class="nav-link">04 / Capabilities</a>
          <a href="#experience" class="nav-link">05 / Timeline</a>
          <a href="#opensource" class="nav-link">06 / Open Source</a>
          <a href="#resume" class="nav-link">07 / Resume</a>
          <a href="#contact" class="nav-link">08 / Contact</a>
        </nav>

        <div class="header-actions">
          <a href="#contact" class="eng-btn eng-btn-primary"><span>CONNECT ➔</span></a>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         01. HERO / HOME SECTION
         ========================================================================= -->
    <section class="archive-section" id="hero">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>01 // TECHNICAL SPECIFICATION &amp; DEVELOPER INDEX</span>
        </div>

        <div class="hero-architectural-grid">
          <!-- Left Column: Technical Metadata -->
          <div class="hero-meta-col">
            <div>
              <div class="meta-tag-item">
                <span class="meta-tag-label">SYSTEM CLASSIFICATION</span>
                <span class="meta-tag-value">ENGINEERING ARCHIVE</span>
              </div>
              <div class="meta-tag-item">
                <span class="meta-tag-label">DISCIPLINE</span>
                <span class="meta-tag-value">${safeRole}</span>
              </div>
              <div class="meta-tag-item">
                <span class="meta-tag-label">LOCATION</span>
                <span class="meta-tag-value">${TemplateHelper.escapeHtml(data.location || 'GLOBAL / HYBRID')}</span>
              </div>
              <div class="meta-tag-item">
                <span class="meta-tag-label">AVAILABILITY STATUS</span>
                <span class="meta-tag-value" style="color: var(--blueprint-blue);">● OPEN TO INITIATIVES</span>
              </div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-light);">
              REF: ISO-8601 // REV: 2026.04
            </div>
          </div>

          <!-- Center Column: Editorial Name & Bio -->
          <div class="hero-center-col">
            <h1 class="editorial-hero-statement">
              HELLO,<br>
              I'M <span class="highlight-blue">${safeName}</span>.
            </h1>
            <div class="hero-role-spec">
              <span>➔</span>
              <span>${safeRole}</span>
            </div>
            <p class="hero-bio-para">
              ${safeBio || 'Architecting resilient cloud-native infrastructures, scalable full-stack applications, and deterministic computing engines with Swiss editorial precision.'}
            </p>
            <div class="hero-actions-deck">
              <a href="#projects" class="eng-btn eng-btn-primary"><span>EXPLORE PROJECTS ARCHIVE ➔</span></a>
              <a href="#resume" class="eng-btn eng-btn-outline"><span>EXTRACT RESUME DOSSIER</span></a>
            </div>
          </div>

          <!-- Right Column: 3D Engineering Specimen -->
          <div class="hero-specimen-col">
            <div class="specimen-canvas-viewport">
              <canvas id="specimen-3d-canvas"></canvas>
              <div class="specimen-coordinates-overlay">
                <div>SPECIMEN: ARCH-3D-01</div>
                <div>STATUS: ROTATING DYNAMICS</div>
                <div>RENDER: WEBGL PERSPECTIVE</div>
              </div>
            </div>
            <div class="specimen-footer-info">
              <span>FIG 1.0 // WIREFRAME STRUCTURE</span>
              <span style="color: var(--blueprint-blue); font-weight: 700;">INTERACTIVE 3D</span>
            </div>
          </div>
        </div>

        <!-- Metrics Bar -->
        <div class="hero-metrics-strip">
          <div class="metric-cell">
            <span class="metric-digit">${totalProjects}+</span>
            <span class="metric-label-text">ENGINEERING DOSSIERS</span>
          </div>
          <div class="metric-cell">
            <span class="metric-digit">${totalSkills}+</span>
            <span class="metric-label-text">VERIFIED CAPABILITIES</span>
          </div>
          <div class="metric-cell">
            <span class="metric-digit">${data.experience.length || '03'}+</span>
            <span class="metric-label-text">CAREER MILESTONES</span>
          </div>
          <div class="metric-cell">
            <span class="metric-digit">100%</span>
            <span class="metric-label-text">EVIDENCE INTEGRITY</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT / EDITORIAL DOSSIER
         ========================================================================= -->
    <section class="archive-section" id="about">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>02 // CANDIDATE POSITIONING &amp; EDITORIAL DOSSIER</span>
        </div>

        <div class="about-dossier-grid">
          <div class="dossier-index-side">
            02
          </div>

          <div class="dossier-main-text">
            <div class="positioning-statement">
              "I build scalable, deterministic systems that transform complex architectural challenges into high-performance software artifacts."
            </div>
            <p class="bio-longform-paragraph">
              ${safeBio}
            </p>
            <p class="bio-longform-paragraph">
              Every project in this archive represents an intentional engineering artifact—built with strict adherence to modular software patterns, type safety, low-latency data pipelines, and clear architectural boundaries.
            </p>
          </div>

          <div>
            <div class="dossier-spec-card">
              <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; margin-bottom: 16px; border-bottom: 1px solid var(--border-line); padding-bottom: 8px;">
                CANDIDATE SPECIFICATION
              </div>
              <div class="spec-table-row">
                <span class="spec-k">NAME</span>
                <span class="spec-v">${safeName}</span>
              </div>
              <div class="spec-table-row">
                <span class="spec-k">DISCIPLINE</span>
                <span class="spec-v">${safeRole}</span>
              </div>
              <div class="spec-table-row">
                <span class="spec-k">LOCATION</span>
                <span class="spec-v">${TemplateHelper.escapeHtml(data.location || 'GLOBAL')}</span>
              </div>
              <div class="spec-table-row">
                <span class="spec-k">STATUS</span>
                <span class="spec-v" style="color: var(--blueprint-blue);">ACTIVE</span>
              </div>
              <div class="spec-table-row">
                <span class="spec-k">DOSSIER REF</span>
                <span class="spec-v">EA-2026-01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS ARCHIVE
         ========================================================================= -->
    <section class="archive-section" id="projects">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>03 // ENGINEERING PROJECT ARCHIVE (${totalProjects} DOSSIERS)</span>
        </div>

        <h2 class="section-main-heading">CURATED ENGINEERING ARTIFACTS</h2>

        <div class="project-dossiers-stack">
          ${projectDossiersHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS / CAPABILITY MAP
         ========================================================================= -->
    <section class="archive-section" id="skills">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>04 // TECHNICAL CAPABILITY MAP</span>
        </div>

        <h2 class="section-main-heading">SYSTEM DISCIPLINES &amp; COMPETENCIES</h2>

        <div class="capability-matrix-grid">
          ${renderSkillItems(skillsGroup1, 'LANGUAGES & RUNTIMES', 'LANG')}
          ${renderSkillItems(skillsGroup2, 'FRAMEWORKS & ARCHITECTURE', 'FWK')}
          ${renderSkillItems(skillsGroup3, 'CLOUD, DATA & INFRASTRUCTURE', 'INFRA')}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE / VERTICAL TIMELINE
         ========================================================================= -->
    <section class="archive-section" id="experience">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>05 // ENGINEERING CAREER TIMELINE</span>
        </div>

        <h2 class="section-main-heading">CHRONOLOGICAL MILESTONES</h2>

        <div class="timeline-schematic-track">
          ${experienceTimelineHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE / CONTRIBUTIONS ARCHIVE
         ========================================================================= -->
    <section class="archive-section" id="opensource">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>06 // OPEN SOURCE &amp; COMMUNITY CONTRIBUTIONS</span>
        </div>

        <h2 class="section-main-heading">CODEBASE REPOSITORIES &amp; RESEARCH</h2>

        <div class="opensource-dossier-grid">
          ${data.projects.map((p, idx) => `
            <div class="repo-archive-card">
              <div>
                <div class="repo-card-top">
                  <span>REPO // 00${idx + 1}</span>
                  <span style="color: var(--blueprint-blue);">PUBLIC REPOSITORY</span>
                </div>
                <h3 class="repo-name-text">${TemplateHelper.escapeHtml(p.name)}</h3>
                <p class="repo-desc-text">${TemplateHelper.escapeHtml(p.desc)}</p>
              </div>
              <div class="repo-card-footer">
                <span>STARS: ★ VERIFIED</span>
                ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" style="color: var(--blueprint-blue); font-weight: 700;">EXPLORE CODE ↗</a>` : `<span style="color: var(--text-light);">VERIFIED ARTIFACT</span>`}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         07. RESUME DOSSIER
         ========================================================================= -->
    <section class="archive-section" id="resume">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>07 // TECHNICAL RESUME DOSSIER</span>
        </div>

        <div class="resume-paper-dossier">
          <div class="dossier-top-meta">
            <div>
              <h2 class="resume-name-title">${safeName}</h2>
              <div class="resume-role-sub">${safeRole}</div>
            </div>
            <div style="text-align: right; font-size: 0.85rem;">
              <div>EMAIL: ${safeEmail}</div>
              <div>LOC: ${TemplateHelper.escapeHtml(data.location || 'GLOBAL')}</div>
            </div>
          </div>

          <div style="margin-bottom: 28px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.88rem; font-weight: 700; color: var(--blueprint-blue); margin-bottom: 12px;">EXECUTIVE PROFILE</h4>
            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-muted);">${safeBio}</p>
          </div>

          <div style="margin-bottom: 28px; border-top: 1px dashed var(--border-line); padding-top: 18px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.88rem; font-weight: 700; color: var(--blueprint-blue); margin-bottom: 12px;">ACADEMIC BACKGROUND</h4>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--blueprint-blue); padding-left: 12px;">
                <div style="font-weight: 800; font-size: 1rem; color: #000000;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 28px; border-top: 1px dashed var(--border-line); padding-top: 18px;">
            <h4 style="font-family: var(--font-mono); font-size: 0.88rem; font-weight: 700; color: var(--signal-orange); margin-bottom: 12px;">VERIFIED CERTIFICATIONS</h4>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: #000000;">
                <span style="background: rgba(0,87,255,0.1); border: 1px solid var(--blueprint-blue); color: var(--blueprint-blue); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-line); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-light);">
              DOCUMENT REF: EA-RESUME-${initials}-2026
            </div>
            <button class="eng-btn eng-btn-primary" onclick="triggerPrintResume()">
              <span>DOWNLOAD RESUME (PDF) ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT TECHNICAL SHEET
         ========================================================================= -->
    <section class="archive-section" id="contact" style="border-bottom: none;">
      <div class="archive-container">
        <div class="section-header-tag">
          <span class="cross">+</span>
          <span>08 // TECHNICAL CONTACT SHEET</span>
        </div>

        <div class="contact-sheet-grid">
          <div class="contact-info-col">
            <div>
              <h2 class="section-main-heading">LET'S BUILD SOMETHING.</h2>
              <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.65; max-width: 460px;">
                Direct inquiries regarding system architecture, software engineering opportunities, or technical consulting.
              </p>
              
              <div class="contact-coords-list">
                <div class="coord-item">
                  <span class="coord-label">PRIMARY DISPATCH</span>
                  <a href="mailto:${safeEmail}" class="coord-val" style="color: var(--blueprint-blue);">${safeEmail}</a>
                </div>
                <div class="coord-item">
                  <span class="coord-label">GITHUB ARCHIVE</span>
                  <a href="${safeGithub}" target="_blank" rel="noopener" class="coord-val">${safeGithub.replace('https://', '')}</a>
                </div>
                <div class="coord-item">
                  <span class="coord-label">PROFESSIONAL NETWORK</span>
                  <a href="${safeLinkedin}" target="_blank" rel="noopener" class="coord-val">${safeLinkedin.replace('https://', '')}</a>
                </div>
              </div>
            </div>

            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-light); margin-top: 32px;">
              RESPONSE LATENCY: &lt; 24 HOURS
            </div>
          </div>

          <div class="contact-form-panel">
            <form onsubmit="handleContactSubmit(event)">
              <div class="form-group-field">
                <label class="form-field-label">YOUR NAME // IDENTIFIER</label>
                <input type="text" class="form-technical-input" placeholder="e.g. Alex Morgan" required />
              </div>
              <div class="form-group-field">
                <label class="form-field-label">CONTACT EMAIL</label>
                <input type="email" class="form-technical-input" placeholder="e.g. alex@enterprise.com" required />
              </div>
              <div class="form-group-field">
                <label class="form-field-label">ENGINEERING SPECIFICATION / MESSAGE</label>
                <textarea class="form-technical-input" placeholder="Describe the scope, objectives, or engagement..." required></textarea>
              </div>
              <button type="submit" class="eng-btn eng-btn-primary" style="width: 100%;">
                <span>TRANSMIT DISPATCH ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Engineering Footer -->
  <footer class="archive-footer">
    <div class="archive-container">
      <div class="footer-inner-strip">
        <div>
          © 2026 ${safeName} • Engineering Archive Design System • Swiss Technical Standard
        </div>
        <div>
          ISO-8601 COMPLIANT // HOSTED ON GLOBAL EDGE
        </div>
      </div>
    </div>
  </footer>

  <!-- Three.js Interactive Wireframe Specimen Animation Script -->
  <script>
    function initHeroSpecimen3D() {
      const canvas = document.getElementById('specimen-3d-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 380;
      const height = parent.clientHeight || 380;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.z = 18;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Architectural Wireframe Specimen: Geometric Icosahedron with Inner Gyroscope Rings
      const group = new THREE.Group();
      scene.add(group);

      const wireMat = new THREE.MeshBasicMaterial({ color: 0x121316, wireframe: true });
      const blueWireMat = new THREE.MeshBasicMaterial({ color: 0x0A5CFF, wireframe: true });
      const orangeDotMat = new THREE.PointsMaterial({ color: 0xFF5500, size: 0.35 });

      const outerGeo = new THREE.IcosahedronGeometry(7, 1);
      const outerMesh = new THREE.Mesh(outerGeo, wireMat);
      group.add(outerMesh);

      const innerTorus = new THREE.TorusGeometry(5, 0.4, 8, 32);
      const innerMesh = new THREE.Mesh(innerTorus, blueWireMat);
      innerMesh.rotation.x = Math.PI / 4;
      group.add(innerMesh);

      const pts = new THREE.Points(outerGeo, orangeDotMat);
      group.add(pts);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.005;
        group.rotation.x += 0.003;
        innerMesh.rotation.z += 0.008;

        group.rotation.y += mouseX * 0.01;
        group.rotation.x += mouseY * 0.01;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        const w = parent.clientWidth || 380;
        const h = parent.clientHeight || 380;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    }

    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, colors: ['#0A5CFF', '#121316', '#FF5500'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>DISPATCH TRANSMITTED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroSpecimen3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { EngineeringArchiveTemplate };

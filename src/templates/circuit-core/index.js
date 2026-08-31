/**
 * Template: CIRCUIT CORE
 * Aesthetic: Industrial Cyber-Minimal • Dark Mode • Mechanical Geometry • Brutalist Tech • Green & Brass
 * Palette: Deep Obsidian (#0D1117), Matte Black (#1A1F29), Ghost White (#F0F4F8), Circuit Green (#00FF41), Polished Brass (#D4AF37).
 * Motifs: Mechanical gears, pistons, circuit traces, capacitor radar charts, switch dials, and brass plating.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const CircuitCoreTemplate = {
  id: 'circuit-core',
  name: 'Circuit Core',
  category: 'Industrial Cyber-Minimal / Mechanical Geometry',
  description: 'An industrial cyber-minimal aesthetic blending mechanical cogwheels, exposed pistons, and luminous circuit traces with polished brass and deep obsidian.',
  recommendedFor: ['Systems Architect', 'Hardware & Firmware Engineer', 'Robotics & Control Developer', 'Full Stack Engineer', 'Core Protocol Developer'],
  palette: ['#0D1117', '#1A1F29', '#00FF41', '#D4AF37', '#F0F4F8'],

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

    const yearsExp = data.experience?.length ? `${data.experience.length}` : '1';
    const projCount = data.projects?.length || 6;
    const repoCount = data.publicRepos ?? data.projects?.length ?? 6;
    const contribCount = data.projects?.length ? `${data.projects.length * 40}` : '240';

    // 03. Projects (Isometric Circuit Boxes)
    const assignedArtworks = new Set(['/assets/3d/crystal_leaf_hand_3d.jpg', '/assets/3d/steampunk_satellite_bird_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="brass-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="isometric-circuit-card" data-category="${TemplateHelper.escapeHtml(p.category || 'Mechanical')}">
          <div class="circuit-plate-header">
            <span class="gear-cog-icon">⚙</span>
            <span class="circuit-mod-id">MOD_${projNum} // BRASS_CIRCUIT</span>
            <span class="piston-led-dot"></span>
          </div>

          <div class="circuit-wireframe-box">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'circuit-core', idx, assignedArtworks, userSeed)}
            <div class="circuit-trace-lines-svg"></div>
          </div>

          <div class="circuit-card-body">
            <h3 class="circuit-card-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="circuit-card-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="circuit-tech-stack">
              ${techTags}
            </div>

            <div class="circuit-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="circuit-industrial-btn primary"><span>IGNITE MODULE ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="circuit-industrial-btn secondary"><span>SCHEMATICS ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Skills Categories
    const skillCategories = [
      { name: 'LANGUAGES', icon: '⚡', skills: data.skills.slice(0, Math.ceil(data.skills.length / 3)) },
      { name: 'FRAMEWORKS', icon: '⚙️', skills: data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3)) },
      { name: 'SYSTEMS & CLOUD', icon: '🎛️', skills: data.skills.slice(Math.ceil((data.skills.length * 2) / 3)) }
    ];

    const skillsColsHtml = skillCategories.map(cat => `
      <div class="skills-circuit-column">
        <div class="column-brass-header">
          <span>${cat.icon}</span>
          <span>${cat.name}</span>
        </div>
        <div class="column-items-list">
          ${cat.skills.map(s => `
            <div class="capacitor-skill-item">
              <span class="resistor-dot"></span>
              <span class="skill-name-txt">${TemplateHelper.escapeHtml(s)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // 05. Experience Piston Timeline
    const experienceHtml = data.experience.map((exp, idx) => {
      const gearYear = exp.period ? exp.period.split('—')[0].trim() : '2024';
      return `
        <div class="mechanical-piston-row">
          <div class="piston-gear-casing">
            <span class="gear-year-badge">${gearYear}</span>
            <div class="piston-rod-line"></div>
          </div>
          <div class="piston-status-card">
            <div class="piston-card-header">
              <span class="piston-role-title">${TemplateHelper.escapeHtml(exp.role)}</span>
              <span class="piston-period-mono">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</span>
            </div>
            <div class="piston-company-name">@ ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
            <p class="piston-desc-para">${TemplateHelper.escapeHtml(exp.desc)}</p>
            <div class="piston-spec-tags">
              <span class="spec-label">CIRCUIT SPECS:</span>
              <span class="spec-val">${TemplateHelper.escapeHtml(exp.technologies || (data.skills && data.skills.length ? data.skills.slice(0, 3).join(' • ') : 'Core Systems'))}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Focus areas for 02 About
    const focusAreas = ['Hardware Acceleration', 'Low-Level Robotics', 'Distributed Pipelines', 'Mechanical Schematics', 'Fault-Tolerant Logic'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Circuit Core &amp; Mechanical Engineering</title>
  <meta name="description" content="${safeName} — ${safeRole}. Industrial cyber-minimal developer portfolio with rotating 3D gears, piston timelines, and circuit green telemetry.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Fira+Code:wght@400;600;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       CIRCUIT CORE DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-obsidian: #0D1117;
      --surface-matte: #1A1F29;
      --surface-matte-glass: rgba(26, 31, 41, 0.85);
      --ghost-white: #F0F4F8;
      --circuit-green: #00FF41;
      --polished-brass: #D4AF37;
      --border-circuit: rgba(0, 255, 65, 0.25);
      --border-brass: rgba(212, 175, 55, 0.35);
      --text-muted: #8B949E;

      --font-heading: 'Space Grotesk', -apple-system, sans-serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

      --container-max: 1360px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-obsidian);
      color: var(--ghost-white);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-obsidian);
      color: var(--ghost-white);
      line-height: 1.65;
      overflow-x: hidden;
      position: relative;
      /* Industrial Seams and Circuit Mesh */
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(0, 255, 65, 0.08) 0%, transparent 65%),
        linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 255, 65, 0.04) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
    }

    ::selection {
      background: var(--circuit-green);
      color: #000000;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .circuit-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed 3D Gear Canvas */
    #circuit-core-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    /* Top Industrial Navigation Bar */
    .circuit-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(13, 17, 23, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-circuit);
      padding: 14px 0;
    }

    .nav-inner-circuit {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-circuit-core {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-heading);
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--ghost-white);
      letter-spacing: 0.05em;
    }

    .nr-gear-badge {
      width: 34px;
      height: 34px;
      border: 1px solid var(--polished-brass);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--polished-brass);
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 800;
      background: rgba(212, 175, 55, 0.1);
      box-shadow: 0 0 14px rgba(212, 175, 55, 0.3);
    }

    .nav-menu-circuit {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .nav-item-circuit {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.2s ease;
    }

    .nav-item-circuit:hover, .nav-item-circuit.active {
      color: var(--circuit-green);
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.6);
    }

    /* Industrial Outline Buttons */
    .circuit-industrial-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 22px;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: transparent;
      border: 1px solid var(--circuit-green);
      color: var(--circuit-green);
      transition: all 0.2s ease;
    }

    .circuit-industrial-btn:hover {
      background: var(--circuit-green);
      color: #000000;
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.7);
      transform: translateY(-2px);
    }

    .circuit-industrial-btn.brass {
      border-color: var(--polished-brass);
      color: var(--polished-brass);
    }

    .circuit-industrial-btn.brass:hover {
      background: var(--polished-brass);
      color: #000000;
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.7);
    }

    /* Section Base */
    .circuit-section {
      padding: 100px 0;
      position: relative;
      z-index: 1;
      border-bottom: 1px solid var(--border-circuit);
    }

    .section-circuit-header {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--circuit-green);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-circuit-header::after {
      content: '';
      display: inline-block;
      width: 44px;
      height: 1px;
      background: var(--circuit-green);
      box-shadow: 0 0 8px var(--circuit-green);
    }

    /* =========================================================================
       01. HOME PAGE (Central Mechanical Gear & Stat Columns)
       ========================================================================= */
    .home-hero-circuit-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
      min-height: 560px;
    }

    .huge-circuit-title {
      font-family: var(--font-heading);
      font-size: clamp(3rem, 6vw, 5.2rem);
      font-weight: 800;
      line-height: 1.02;
      letter-spacing: -0.03em;
      color: var(--circuit-green);
      margin-bottom: 12px;
      text-shadow: 0 0 24px rgba(0, 255, 65, 0.35);
    }

    .circuit-role-pill {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--polished-brass);
      margin-bottom: 24px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .circuit-manifesto-para {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.75;
      margin-bottom: 32px;
      max-width: 560px;
    }

    .home-gear-viewport {
      width: 100%;
      height: 480px;
      position: relative;
      border: 1px solid var(--border-brass);
      background: var(--surface-matte);
      overflow: hidden;
    }

    #home-gear-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* 4 Stat Columns */
    .circuit-stat-columns {
      margin-top: 54px;
      border-top: 1px solid var(--border-circuit);
      padding-top: 36px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .circuit-stat-box {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 20px;
    }

    .stat-label-mono {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--polished-brass);
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .stat-val-huge {
      font-family: var(--font-heading);
      font-size: 2.4rem;
      font-weight: 800;
      color: var(--ghost-white);
      line-height: 1;
    }

    /* =========================================================================
       02. ABOUT PAGE (Exposed Mechanical Limbs Silhouette)
       ========================================================================= */
    .about-mechanical-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
    }

    .mechanical-silhouette-frame {
      width: 100%;
      height: 440px;
      background: var(--surface-matte);
      border: 1px solid var(--border-brass);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .mechanical-limbs-svg {
      width: 85%;
      height: 85%;
    }

    .diagnostics-matrix-table {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .diag-cell-box {
      background: rgba(13, 17, 23, 0.9);
      border: 1px solid var(--border-circuit);
      padding: 12px 16px;
    }

    .diag-title-mono {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--circuit-green);
      font-weight: 700;
    }

    .diag-val-txt {
      font-family: var(--font-mono);
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--ghost-white);
    }

    .focus-areas-cluster {
      margin-top: 28px;
      border-top: 1px solid var(--border-circuit);
      padding-top: 20px;
    }

    .focus-tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .brass-focus-badge {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 6px 14px;
      border: 1px solid var(--polished-brass);
      color: var(--polished-brass);
      background: rgba(212, 175, 55, 0.08);
    }

    /* =========================================================================
       03. PROJECTS PAGE (Stacked Isometric Circuit Boxes)
       ========================================================================= */
    .isometric-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 36px;
      margin-top: 32px;
    }

    .isometric-circuit-card {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;
    }

    .isometric-circuit-card:hover {
      border-color: var(--polished-brass);
      box-shadow: 0 16px 40px rgba(212, 175, 55, 0.2);
      transform: translateY(-4px);
    }

    .circuit-plate-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-circuit);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(13, 17, 23, 0.8);
    }

    .gear-cog-icon {
      color: var(--polished-brass);
      font-size: 1rem;
    }

    .circuit-mod-id {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--circuit-green);
    }

    .piston-led-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--circuit-green);
      box-shadow: 0 0 8px var(--circuit-green);
    }

    .circuit-wireframe-box {
      width: 100%;
      height: 220px;
      position: relative;
      background: #06090D;
      overflow: hidden;
    }

    .circuit-card-body {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .circuit-card-title {
      font-family: var(--font-heading);
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--ghost-white);
      margin-bottom: 10px;
    }

    .circuit-card-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .circuit-tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 24px;
    }

    .brass-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(212, 175, 55, 0.08);
      border: 1px solid var(--border-brass);
      color: var(--polished-brass);
      padding: 3px 8px;
    }

    .circuit-action-row {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. SKILLS PAGE (Capacitor / Resistor Radar & Column Lists)
       ========================================================================= */
    .skills-circuit-layout {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 40px;
      margin-top: 32px;
      align-items: center;
    }

    .radar-chart-capacitor-frame {
      width: 100%;
      height: 380px;
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .skills-columns-stack {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .skills-circuit-column {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 20px;
    }

    .column-brass-header {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--polished-brass);
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border-circuit);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .column-items-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .capacitor-skill-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.88rem;
    }

    .resistor-dot {
      width: 6px;
      height: 6px;
      background: var(--circuit-green);
      box-shadow: 0 0 6px var(--circuit-green);
    }

    /* =========================================================================
       05. EXPERIENCE PAGE (Exposed Mechanical Pistons Timeline)
       ========================================================================= */
    .mechanical-piston-timeline {
      position: relative;
      padding-left: 54px;
      margin-top: 36px;
    }

    .mechanical-piston-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 21px;
      width: 2px;
      background: var(--polished-brass);
      box-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
    }

    .mechanical-piston-row {
      position: relative;
      margin-bottom: 36px;
    }

    .piston-gear-casing {
      position: absolute;
      left: -54px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gear-year-badge {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-matte);
      border: 2px solid var(--polished-brass);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--polished-brass);
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }

    .piston-status-card {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 28px;
    }

    .piston-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .piston-role-title {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--ghost-white);
    }

    .piston-period-mono {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    .piston-company-name {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--circuit-green);
      margin-bottom: 14px;
    }

    .piston-desc-para {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 16px;
    }

    .piston-spec-tags {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      background: rgba(13, 17, 23, 0.85);
      border: 1px solid var(--border-circuit);
      padding: 10px 14px;
    }

    .spec-label {
      color: var(--polished-brass);
      font-weight: 700;
      margin-right: 6px;
    }

    .spec-val {
      color: var(--ghost-white);
    }

    /* =========================================================================
       06. OPEN SOURCE PAGE (Circuit Plates Data Streams)
       ========================================================================= */
    .circuit-opensource-grid {
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 40px;
      margin-top: 24px;
    }

    .terminal-stats-plate {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .circuit-hub-dial {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 3px solid var(--circuit-green);
      box-shadow: 0 0 24px rgba(0, 255, 65, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .dial-val-huge {
      font-family: var(--font-heading);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--ghost-white);
    }

    .circuit-repos-stream {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .circuit-repo-plate {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* =========================================================================
       07. RESUME PAGE (Gear Watermark & Circuit Border)
       ========================================================================= */
    .circuit-resume-dossier {
      background: var(--surface-matte);
      border: 1px solid var(--border-brass);
      box-shadow: 0 20px 50px rgba(0, 255, 65, 0.15);
      padding: 44px;
      max-width: 960px;
      margin: 30px auto 0;
      position: relative;
    }

    .resume-header-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-circuit);
      margin-bottom: 28px;
    }

    /* =========================================================================
       08. CONTACT PAGE (Switches & Dials Input Form)
       ========================================================================= */
    .circuit-contact-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 24px;
    }

    .industrial-switch-form {
      background: var(--surface-matte);
      border: 1px solid var(--border-circuit);
      padding: 36px;
    }

    .switch-header-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-circuit);
      margin-bottom: 24px;
    }

    .power-toggle-switch {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--circuit-green);
    }

    .toggle-knob {
      width: 28px;
      height: 14px;
      background: #000;
      border: 1px solid var(--circuit-green);
      border-radius: 9999px;
      position: relative;
    }

    .toggle-knob::after {
      content: '';
      position: absolute;
      right: 2px;
      top: 2px;
      width: 8px;
      height: 8px;
      background: var(--circuit-green);
      border-radius: 50%;
    }

    .circuit-input-field {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid var(--border-circuit);
      background: #0D1117;
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      margin-bottom: 20px;
      outline: none;
      transition: all 0.2s ease;
    }

    .circuit-input-field:focus {
      border-color: var(--polished-brass);
      box-shadow: 0 0 16px rgba(212, 175, 55, 0.3);
    }

    /* Footer */
    .circuit-footer {
      padding: 40px 0;
      border-top: 1px solid var(--border-circuit);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-muted);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .home-hero-circuit-grid,
      .about-mechanical-grid,
      .skills-circuit-layout,
      .circuit-opensource-grid,
      .circuit-contact-grid {
        grid-template-columns: 1fr;
      }
      .circuit-stat-columns {
        grid-template-columns: 1fr 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Fixed 3D Gear Canvas -->
  <canvas id="circuit-core-canvas"></canvas>

  <!-- Top Industrial Navigation Bar -->
  <header class="circuit-navbar">
    <div class="circuit-container">
      <div class="nav-inner-circuit">
        <a href="#home" class="brand-circuit-core">
          <div class="nr-gear-badge">⚙</div>
          <span>${safeName}</span>
        </a>

        <nav class="nav-menu-circuit">
          <a href="#home" class="nav-item-circuit active">01 / Core</a>
          <a href="#about" class="nav-item-circuit">02 / Mech</a>
          <a href="#projects" class="nav-item-circuit">03 / Modules</a>
          <a href="#skills" class="nav-item-circuit">04 / Logic</a>
          <a href="#experience" class="nav-item-circuit">05 / Pistons</a>
          <a href="#opensource" class="nav-item-circuit">06 / Stream</a>
          <a href="#resume" class="nav-item-circuit">07 / Specs</a>
          <a href="#contact" class="nav-item-circuit">08 / Switch</a>
        </nav>

        <div>
          <button class="circuit-industrial-btn brass" onclick="triggerPrintResume()">
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
    <section class="circuit-section" id="home">
      <div class="circuit-container">
        <div class="section-circuit-header">01. HELLO, I'M</div>

        <div class="home-hero-circuit-grid">
          <div>
            <h1 class="huge-circuit-title">${safeName}</h1>
            <div class="circuit-role-pill">⚡ [${safeRole}]</div>
            
            <p class="circuit-manifesto-para">
              ${safeBio || 'Forged in industrial cyber-minimal engineering. Constructing high-precision distributed protocols, low-latency firmware pipelines, and heavy-duty logic.'}
            </p>

            <div style="display: flex; gap: 16px;">
              <a href="#projects" class="circuit-industrial-btn"><span>EXPLORE PORTFOLIO ➔</span></a>
              <a href="#contact" class="circuit-industrial-btn brass"><span>CONTACT SWITCH</span></a>
            </div>
          </div>

          <div class="home-gear-viewport" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="${safeName} 3D Circuit Core" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border: 2px solid var(--border-circuit); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.3);" />
          </div>
        </div>

        <!-- 4 Stat Columns -->
        <div class="circuit-stat-columns">
          <div class="circuit-stat-box">
            <div class="stat-label-mono">YEARS_EXPERIENCE</div>
            <div class="stat-val-huge">${yearsExp} <span style="font-size: 1rem; color: var(--polished-brass);">YRS</span></div>
          </div>
          <div class="circuit-stat-box">
            <div class="stat-label-mono">PROJECT_COUNT</div>
            <div class="stat-val-huge">${projCount} <span style="font-size: 1rem; color: var(--circuit-green);">MOD</span></div>
          </div>
          <div class="circuit-stat-box">
            <div class="stat-label-mono">CONTRIBUTIONS</div>
            <div class="stat-val-huge">${contribCount} <span style="font-size: 1rem; color: var(--polished-brass);">COMM</span></div>
          </div>
          <div class="circuit-stat-box">
            <div class="stat-label-mono">REPOSITORIES</div>
            <div class="stat-val-huge">${repoCount} <span style="font-size: 1rem; color: var(--circuit-green);">REPOS</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT PAGE
         ========================================================================= -->
    <section class="circuit-section" id="about">
      <div class="circuit-container">
        <div class="section-circuit-header">02. ABOUT ME</div>

        <div class="about-mechanical-grid">
          <div>
            <p style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 700; color: #FFFFFF; line-height: 1.4; margin-bottom: 20px;">
              "Engineering robust architectures where mechanical precision synchronizes with low-latency algorithmic logic."
            </p>
            <p style="font-size: 1.02rem; color: var(--text-muted); line-height: 1.75; margin-bottom: 24px;">
              ${safeBio}
            </p>

            <div class="diagnostics-matrix-table">
              <div class="diag-cell-box">
                <div class="diag-title-mono">LOCATION //</div>
                <div class="diag-val-txt">${safeLocation}</div>
              </div>
              <div class="diag-cell-box">
                <div class="diag-title-mono">EDUCATION //</div>
                <div class="diag-val-txt">Computer Science &amp; Systems</div>
              </div>
              <div class="diag-cell-box">
                <div class="diag-title-mono">CURRENT_ROLE //</div>
                <div class="diag-val-txt">${safeRole}</div>
              </div>
              <div class="diag-cell-box">
                <div class="diag-title-mono">INTERESTS //</div>
                <div class="diag-val-txt" style="color: var(--polished-brass);">Robotics &amp; Cryptography</div>
              </div>
            </div>

            <div class="focus-areas-cluster">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--polished-brass); font-weight: 700; margin-bottom: 8px;">FOCUS AREAS //</div>
              <div class="focus-tags-row">
                ${focusAreas.map(f => `<span class="brass-focus-badge">⚙ ${f}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="mechanical-silhouette-frame" style="display: flex; justify-content: center; align-items: center; padding: 12px; background: rgba(18, 22, 30, 0.7); border: 1px solid var(--border-circuit); border-radius: 20px;">
            <img src="/assets/3d/steampunk_satellite_bird_3d.jpg" alt="Mechanical Engineering Artifact" style="width: 100%; max-width: 320px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,0.8);" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS PAGE
         ========================================================================= -->
    <section class="circuit-section" id="projects">
      <div class="circuit-container">
        <div class="section-circuit-header">03. PROJECTS</div>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-muted); margin-bottom: 24px;">
          Stacked isometric circuit modules, hardware integrations, and heavy-duty logic.
        </p>

        <div class="isometric-projects-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS PAGE
         ========================================================================= -->
    <section class="circuit-section" id="skills">
      <div class="circuit-container">
        <div class="section-circuit-header">04. SKILLS</div>

        <div class="skills-circuit-layout">
          <div class="radar-chart-capacitor-frame">
            <!-- Radar Chart SVG with Capacitor Nodes -->
            <svg viewBox="0 0 240 240" width="220" height="220">
              <polygon points="120,20 215,75 215,185 120,220 25,185 25,75" stroke="#D4AF37" stroke-width="1.5" fill="none"/>
              <polygon points="120,50 185,85 185,160 120,190 55,160 55,85" stroke="rgba(0,255,65,0.3)" stroke-width="1" fill="none"/>
              <polygon points="120,35 195,80 170,165 120,175 45,150 70,80" stroke="#00FF41" stroke-width="2" fill="rgba(0,255,65,0.15)"/>
              <!-- Capacitor Nodes -->
              <circle cx="120" cy="35" r="5" fill="#D4AF37"/>
              <circle cx="195" cy="80" r="5" fill="#00FF41"/>
              <circle cx="170" cy="165" r="5" fill="#D4AF37"/>
              <circle cx="120" cy="175" r="5" fill="#00FF41"/>
              <circle cx="45" cy="150" r="5" fill="#D4AF37"/>
              <circle cx="70" cy="80" r="5" fill="#00FF41"/>
            </svg>
          </div>

          <div class="skills-columns-stack">
            ${skillsColsHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE PAGE
         ========================================================================= -->
    <section class="circuit-section" id="experience">
      <div class="circuit-container">
        <div class="section-circuit-header">05. EXPERIENCE</div>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--text-muted); margin-bottom: 24px;">
          Exposed mechanical piston timeline verifying industrial career execution.
        </p>

        <div class="mechanical-piston-timeline">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE PAGE
         ========================================================================= -->
    <section class="circuit-section" id="opensource">
      <div class="circuit-container">
        <div class="section-circuit-header">06. OPEN SOURCE</div>

        <div class="circuit-opensource-grid">
          <div class="terminal-stats-plate">
            <div class="circuit-hub-dial">
              <div class="dial-val-huge">${data.projects.length}+</div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--polished-brass);">PUBLIC MODULES</div>
            </div>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">
              Active maintainer of open-source logic circuits and robotics toolchains.
            </p>
            <a href="${safeGithub}" target="_blank" rel="noopener" class="circuit-industrial-btn brass" style="width: 100%;">
              <span>ACCESS GITHUB STREAM ↗</span>
            </a>
          </div>

          <div class="circuit-repos-stream">
            ${data.projects.map(p => `
              <div class="circuit-repo-plate">
                <div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--ghost-white); margin-bottom: 4px;">${TemplateHelper.escapeHtml(p.name)}</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(p.desc)}</p>
                </div>
                <div>
                  ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="circuit-industrial-btn" style="padding: 6px 14px; font-size: 0.78rem;">SOURCE ↗</a>` : ''}
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
    <section class="circuit-section" id="resume">
      <div class="circuit-container">
        <div class="section-circuit-header">07. RESUME</div>

        <div class="circuit-resume-dossier">
          <div class="resume-header-row">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--polished-brass);">${safeName}</h3>
              <div style="font-family: var(--font-mono); font-size: 1rem; color: var(--circuit-green);">OPERATOR: ${safeRole}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-align: right;">
              <div>${safeEmail}</div>
              <div>${safeLocation}</div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--polished-brass); font-weight: 700; margin-bottom: 8px;">// PROFESSIONAL BLUEPRINT</div>
            <p style="font-size: 0.98rem; color: var(--text-muted); line-height: 1.7;">${safeBio}</p>
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-circuit); padding-top: 18px;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--circuit-green); font-weight: 700; margin-bottom: 12px;">// ACADEMIC SCHEMATICS</div>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--circuit-green); padding-left: 12px;">
                <div style="font-weight: 800; color: var(--ghost-white); font-size: 0.98rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-circuit); padding-top: 18px;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--polished-brass); font-weight: 700; margin-bottom: 12px;">// VERIFIED CERTIFICATIONS</div>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--ghost-white);">
                <span style="background: rgba(230,177,92,0.15); border: 1px solid var(--polished-brass); color: var(--polished-brass); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-circuit); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--polished-brass);">SPECIFICATION: 100% VERIFIED</span>
            <button class="circuit-industrial-btn brass" onclick="triggerPrintResume()">
              <span>DOWNLOAD SPECIFICATION (PDF) ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT PAGE
         ========================================================================= -->
    <section class="circuit-section" id="contact" style="border-bottom: none;">
      <div class="circuit-container">
        <div class="section-circuit-header">08. CONTACT</div>

        <div class="circuit-contact-grid">
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; margin-bottom: 16px;">CONNECT CIRCUIT LINE</h2>
            <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px;">
              Direct transmission link for firmware architecture, industrial automation, or high-performance systems engineering.
            </p>

            <div style="display: flex; flex-direction: column; gap: 18px; font-family: var(--font-mono); font-size: 0.9rem;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">DIRECT RELAY:</span>
                <a href="mailto:${safeEmail}" style="color: var(--circuit-green); font-weight: 700;">${safeEmail}</a>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">GITHUB SCHEMATICS:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener" style="color: var(--ghost-white);">${safeGithub.replace('https://', '')}</a>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; display: block;">PROFESSIONAL NETWORK:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener" style="color: var(--ghost-white);">${safeLinkedin.replace('https://', '')}</a>
              </div>
            </div>
          </div>

          <div class="industrial-switch-form">
            <div class="switch-header-strip">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: var(--polished-brass);">INDUSTRIAL INPUT MATRIX</span>
              <div class="power-toggle-switch">
                <span>POWER: ON</span>
                <div class="toggle-knob"></div>
              </div>
            </div>

            <form onsubmit="handleCircuitSend(event)">
              <input type="text" class="circuit-input-field" placeholder="YOUR NAME / IDENTIFIER" required />
              <input type="email" class="circuit-input-field" placeholder="YOUR EMAIL" required />
              <input type="text" class="circuit-input-field" placeholder="SUBJECT" required />
              <textarea class="circuit-input-field" style="min-height: 100px; resize: vertical;" placeholder="TRANSMISSION MESSAGE" required></textarea>
              <button type="submit" class="circuit-industrial-btn" style="width: 100%;">
                <span>SEND MESSAGE ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="circuit-footer">
    <div class="circuit-container">
      <div>© 2026 ${safeName} • CIRCUIT CORE DESIGN SYSTEM • POWERED BY THREE.JS &amp; NANO BANANA</div>
    </div>
  </footer>

  <!-- Three.js Mechanical Gear & Circuit Traces Script -->
  <script>
    function initHeroGear3D() {
      const canvas = document.getElementById('home-gear-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 22;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const group = new THREE.Group();
      scene.add(group);

      const brassMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, wireframe: true });
      const greenMat = new THREE.MeshBasicMaterial({ color: 0x00FF41, wireframe: true });

      // Cogwheel Gear Body
      const gearGeo = new THREE.CylinderGeometry(5.5, 5.5, 1.2, 12);
      const gearMesh = new THREE.Mesh(gearGeo, brassMat);
      gearMesh.rotation.x = Math.PI / 2;
      group.add(gearMesh);

      // Inner Core Ring
      const ringGeo = new THREE.TorusGeometry(3.2, 0.25, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeo, greenMat);
      group.add(ringMesh);

      // Circuit Trace Lines around gear
      const traceCount = 12;
      for (let i = 0; i < traceCount; i++) {
        const angle = (i / traceCount) * Math.PI * 2;
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(angle) * 6, Math.sin(angle) * 6, 0),
          new THREE.Vector3(Math.cos(angle) * 9, Math.sin(angle) * 9, (Math.random() - 0.5) * 3)
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00FF41, transparent: true, opacity: 0.6 });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      }

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);

        gearMesh.rotation.y += 0.008;
        ringMesh.rotation.z -= 0.012;

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
        confetti({ particleCount: 70, spread: 60, colors: ['#00FF41', '#D4AF37', '#F0F4F8'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleCircuitSend(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>CIRCUIT ENGAGED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroGear3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { CircuitCoreTemplate };

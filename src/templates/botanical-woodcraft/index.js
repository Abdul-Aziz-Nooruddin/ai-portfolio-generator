/**
 * Template 04: Warm Botanical Naturalist & Hand-Carved Woodcraft Codex (Image 3)
 * Theme: Warm Antique Parchment (#FBF7EE), Forest Canopy Green (#2D4A3E), Timber Walnut (#5C3A21)
 * 3D Engine: Three.js Floating Gold Pollen Particles, Organic Wave & Sunburst Ambient
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');

const BotanicalWoodcraftTemplate = {
  id: 'botanical-woodcraft',
  name: 'Botanical Woodcraft Codex',
  category: 'Naturalist / Organic Woodcraft',
  description: 'Warm organic naturalist codex featuring hand-illustrated botanical trees, timber wood-grain accents, tree-ring chronology dial, and watercolor messenger bird.',
  thumbnail: '/assets/templates/botanical-woodcraft.jpg',
  palette: {
    bg: '#FBF7EE',
    surface: '#FFFFFF',
    surfaceAlt: '#F5EFE0',
    text: '#2D3748',
    textMuted: '#5C3A21',
    primary: '#2D4A3E',
    accent: '#D4A373',
    border: 'rgba(92, 58, 33, 0.2)',
    glow: 'rgba(212, 163, 115, 0.35)'
  },
  recommendedFor: ['Frontend Engineer', 'UI/UX Designer', 'Creative Technologist', 'Full Stack Developer'],

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location);
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeTwitter = TemplateHelper.escapeHtml(data.twitter);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');
    const assignedArtworks = new Set(['/assets/3d/botanical_woodcraft_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="wood-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="wood-project-thumb-box" style="width: 100%; height: 180px; margin-bottom: 16px; border-radius: 12px; overflow: hidden;">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'botanical-woodcraft', idx, assignedArtworks, userSeed)}
        </div>
        <div class="wood-card-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span class="wood-cat-tag">${TemplateHelper.escapeHtml(p.category)}</span>
        </div>
        <h3 class="wood-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="wood-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="wood-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="wood-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="wood-card-links">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="wood-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="wood-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    const skillBarsHtml = data.skills.slice(0, 6).map((s, idx) => {
      const pct = Math.max(76, 95 - (idx * 3));
      return `
        <div class="wood-skill-row">
          <div class="wood-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span class="wood-skill-pct">${pct}%</span>
          </div>
          <div class="wood-skill-track">
            <div class="wood-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    const expTimelineHtml = data.experience.map(e => `
      <div class="wood-timeline-item">
        <div class="wood-timeline-dot"></div>
        <div class="wood-timeline-content">
          <div class="wood-timeline-period">${TemplateHelper.escapeHtml(e.period)}</div>
          <h4 class="wood-timeline-role">${TemplateHelper.escapeHtml(e.role)}</h4>
          <div class="wood-timeline-company">${TemplateHelper.escapeHtml(e.company)}</div>
          <p class="wood-timeline-desc">${TemplateHelper.escapeHtml(e.desc)}</p>
        </div>
      </div>
    `).join('');

    const eduPrimary = data.education[0];
    const certsDisplay = data.certifications.map(c => c.name).join(', ');

    const blogCardsHtml = data.blogArticles.map(art => `
      <div class="wood-project-card">
        <div class="wood-icon-badge">${art.icon}</div>
        <h3 class="wood-project-title">${TemplateHelper.escapeHtml(art.title)}</h3>
        <p class="wood-project-desc">${TemplateHelper.escapeHtml(art.desc)}</p>
        <span class="wood-cat-tag">${TemplateHelper.escapeHtml(art.tag)}</span>
      </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole}</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght..144,700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    :root {
      --bg: #FBF7EE;
      --surface: #FFFFFF;
      --surface-alt: #F5EFE0;
      --surface-wood: #5C3A21;
      --border: rgba(92, 58, 33, 0.18);
      --border-strong: rgba(92, 58, 33, 0.35);
      --primary: #2D4A3E;
      --accent: #D4A373;
      --timber: #8C5E3C;
      --text: #2D3748;
      --text-muted: #5C3A21;
      --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-heading: 'Fraunces', Georgia, serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      background-color: var(--bg);
      background-image: radial-gradient(#E8DFCE 1px, transparent 1px);
      background-size: 24px 24px;
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: hidden;
      line-height: 1.65;
    }

    .wood-nav-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 16px 36px;
      background: rgba(251, 247, 238, 0.92);
      backdrop-filter: blur(16px);
      border-bottom: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .wood-monogram {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.6rem;
      color: var(--primary);
      text-decoration: none;
    }

    .wood-nav-links {
      display: flex;
      gap: 28px;
      list-style: none;
    }

    .wood-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .wood-nav-link:hover, .wood-nav-link.active {
      color: var(--primary);
      text-decoration: underline;
    }

    .wood-cta-btn {
      background: var(--timber);
      color: #FFFFFF;
      text-decoration: none;
      padding: 8px 22px;
      border-radius: 9999px;
      font-size: 0.86rem;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(92, 58, 33, 0.2);
      transition: all 0.2s ease;
    }

    .wood-cta-btn:hover {
      background: var(--surface-wood);
      transform: translateY(-1px);
    }

    .wood-social-dock {
      position: fixed;
      left: 28px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 100;
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 14px 10px;
      border-radius: 9999px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }

    .wood-social-icon {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, transform 0.2s;
    }

    .wood-social-icon:hover {
      color: var(--primary);
      transform: scale(1.15);
    }

    section {
      padding: 110px 48px 90px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .wood-section-head {
      text-align: center;
      margin-bottom: 54px;
    }

    .wood-section-tag {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--timber);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }

    .wood-section-title {
      font-family: var(--font-heading);
      font-size: clamp(2.2rem, 4.5vw, 3rem);
      font-weight: 800;
      color: var(--primary);
    }

    /* 01. Hero */
    .wood-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 48px;
      min-height: calc(100vh - 100px);
    }

    .wood-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--timber);
      margin-bottom: 20px;
    }

    .wood-hero-name {
      font-family: var(--font-heading);
      font-size: clamp(3rem, 5.5vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      color: var(--primary);
      margin-bottom: 12px;
    }

    .wood-hero-role {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--timber);
      margin-bottom: 20px;
    }

    .wood-hero-desc {
      font-size: 1.05rem;
      color: var(--text);
      max-width: 520px;
      margin-bottom: 34px;
      line-height: 1.75;
    }

    .wood-hero-actions { display: flex; gap: 16px; }

    .wood-btn-solid {
      background: var(--primary);
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(45, 74, 62, 0.25);
      transition: all 0.2s ease;
    }

    .wood-btn-solid:hover {
      background: #1E332A;
      transform: translateY(-2px);
    }

    .wood-btn-outline {
      background: var(--surface);
      border: 1.5px solid var(--timber);
      color: var(--timber);
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .wood-btn-outline:hover {
      background: var(--surface-alt);
    }

    /* 02. About */
    .wood-about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .wood-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 28px;
    }

    .wood-stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 22px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .wood-stat-val {
      font-family: var(--font-heading);
      font-size: 2.3rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .wood-stat-lbl {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--timber);
    }

    /* 03. Projects */
    .wood-filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .wood-filter-pill {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 8px 20px;
      border-radius: 9999px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .wood-filter-pill.active, .wood-filter-pill:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
    }

    .wood-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
    }

    .wood-project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      transition: transform 0.25s, box-shadow 0.25s;
    }

    .wood-project-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(92, 58, 33, 0.12);
    }

    .wood-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .wood-icon-badge { font-size: 1.5rem; }

    .wood-cat-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary);
      background: var(--surface-alt);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .wood-project-title {
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 8px;
    }

    .wood-project-desc {
      font-size: 0.92rem;
      color: var(--text);
      margin-bottom: 18px;
      flex: 1;
      line-height: 1.6;
    }

    .wood-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .wood-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      padding: 3px 8px;
      border-radius: 6px;
      color: var(--timber);
    }

    .wood-card-links { display: flex; gap: 12px; }

    .wood-link-btn {
      flex: 1;
      text-align: center;
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .wood-link-btn.primary {
      background: var(--primary);
      color: #FFFFFF;
    }

    .wood-link-btn.outline {
      background: var(--surface-alt);
      border: 1px solid var(--border);
      color: var(--timber);
    }

    /* 04. Skills */
    .wood-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .wood-skill-row { margin-bottom: 18px; }

    .wood-skill-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.92rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: var(--primary);
    }

    .wood-skill-pct { color: var(--timber); font-family: var(--font-mono); }

    .wood-skill-track {
      height: 8px;
      background: var(--surface-alt);
      border-radius: 9999px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .wood-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 9999px;
    }

    /* 05. Experience */
    .wood-timeline {
      position: relative;
      border-left: 2px solid var(--border);
      margin-left: 20px;
      padding-left: 32px;
    }

    .wood-timeline-item {
      position: relative;
      margin-bottom: 36px;
    }

    .wood-timeline-dot {
      position: absolute;
      left: -39px;
      top: 4px;
      width: 14px;
      height: 14px;
      background: var(--timber);
      border: 3px solid var(--bg);
      border-radius: 50%;
    }

    .wood-timeline-period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--timber);
      margin-bottom: 4px;
    }

    .wood-timeline-role {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 2px;
    }

    .wood-timeline-company {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .wood-timeline-desc {
      font-size: 0.92rem;
      color: var(--text);
      line-height: 1.6;
    }

    /* 06. Resume */
    .wood-resume-card {
      background: var(--surface);
      border: 2px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }

    .wood-resume-item { display: flex; gap: 16px; margin-bottom: 20px; }
    .wood-resume-icon { font-size: 1.6rem; }
    .wood-resume-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--timber);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .wood-resume-val {
      font-size: 1rem;
      font-weight: 600;
      color: var(--primary);
    }

    /* 08. Contact */
    .wood-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .wood-contact-form {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }

    .wood-input-group { margin-bottom: 16px; }
    .wood-input-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--timber);
      margin-bottom: 6px;
    }

    .wood-input, .wood-textarea {
      width: 100%;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      color: var(--text);
      font-family: inherit;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .wood-input:focus, .wood-textarea:focus {
      outline: none;
      border-color: var(--primary);
      background: #FFFFFF;
    }

    #wood-webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.6;
    }

    .nano-banana-3d-hero {
      transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .nano-banana-3d-hero:hover {
      transform: scale(1.03) translateY(-8px);
      border-color: var(--primary) !important;
      box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 50px rgba(212, 163, 115, 0.5) !important;
    }

    @keyframes float3dHero {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(0.8deg); }
    }

    @media (max-width: 900px) {
      .wood-hero-grid, .wood-about-grid, .wood-skills-grid, .wood-contact-grid, .wood-resume-card {
        grid-template-columns: 1fr;
      }
      .wood-nav-links { display: none; }
      .wood-social-dock { display: none; }
      section { padding: 90px 20px 60px; }
    }

    @media (max-width: 640px) {
      .wood-hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .wood-btn-solid, .wood-btn-outline {
        width: 100%;
        justify-content: center;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
      }
      .wood-projects-grid {
        grid-template-columns: 1fr;
      }
      section { padding: 80px 14px 40px; }
    }
  </style>
</head>
<body class="layout-root layout-botanical-woodcraft">

  <div id="wood-webgl-canvas"></div>

  <!-- Header -->
  <header class="wood-nav-header">
    <a href="#home" class="wood-monogram">${initials}</a>
    <ul class="wood-nav-links">
      <li><a href="#home" class="wood-nav-link active">Home</a></li>
      <li><a href="#about" class="wood-nav-link">About</a></li>
      <li><a href="#projects" class="wood-nav-link">Projects</a></li>
      <li><a href="#skills" class="wood-nav-link">Skills</a></li>
      <li><a href="#experience" class="wood-nav-link">Experience</a></li>
      <li><a href="#resume" class="wood-nav-link">Resume</a></li>
      <li><a href="#blog" class="wood-nav-link">Blog</a></li>
      <li><a href="#contact" class="wood-nav-link">Contact</a></li>
    </ul>
    <a href="#contact" class="wood-cta-btn">Let's Talk</a>
  </header>

  <!-- Left Social Dock -->
  ${Template3DVisuals.renderSocialDock({ github: safeGithub, linkedin: safeLinkedin, twitter: safeTwitter, email: safeEmail }, 'wood')}

  <!-- 01. HOME HERO -->
  <section id="home">
    <div class="wood-hero-grid">
      <div>
        <div class="wood-hero-badge">
          <span>🌿 NATURALIST BOTANICAL CODEX</span>
        </div>
        <h1 class="wood-hero-name">Hello, I'm <br><span style="color: var(--primary);">${safeName}</span></h1>
        <div class="wood-hero-role">${safeRole}</div>
        <p class="wood-hero-desc">${safeBio}</p>
        <div class="wood-hero-actions">
          <a href="#projects" class="wood-btn-solid">View My Work</a>
          <a href="#contact" class="wood-btn-outline">Let's Talk</a>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${Template3DVisuals.getBotanicalWoodcraftHeroArtwork(safeName)}
      </div>
    </div>
  </section>

  <!-- 02. ABOUT ME -->
  <section id="about">
    <div class="wood-section-head">
      <span class="wood-section-tag">02. Chronology Deck</span>
      <h2 class="wood-section-title">About Me</h2>
    </div>
    <div class="wood-about-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text); line-height: 1.8;">${safeBio}</p>
        <div class="wood-stats-grid">
          <div class="wood-stat-card">
            <div class="wood-stat-val">${data.metrics.yearsExp}+</div>
            <div class="wood-stat-lbl">Years Experience</div>
          </div>
          <div class="wood-stat-card">
            <div class="wood-stat-val">${data.metrics.projectsCount}+</div>
            <div class="wood-stat-lbl">Projects Built</div>
          </div>
          <div class="wood-stat-card">
            <div class="wood-stat-val">${data.metrics.skillsCount}+</div>
            <div class="wood-stat-lbl">Technologies</div>
          </div>
          <div class="wood-stat-card">
            <div class="wood-stat-val">${data.metrics.certsCount}+</div>
            <div class="wood-stat-lbl">Credentials &amp; Milestones</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 2px solid var(--border); border-radius: var(--radius-lg); padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <div style="font-size: 3.5rem; margin-bottom: 12px;">🪵</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Timber Growth Rings</h3>
          <p style="font-size: 0.88rem; color: var(--timber);">Rooted in meticulous design craftsmanship and sustainable code foundations.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 03. PROJECTS -->
  <section id="projects">
    <div class="wood-section-head">
      <span class="wood-section-tag">03. Hand-Crafted Works</span>
      <h2 class="wood-section-title">My Projects</h2>
    </div>
    <div class="wood-filters">
      <button type="button" class="wood-filter-pill active" onclick="filterWoodProjects('all', this)">All</button>
      <button type="button" class="wood-filter-pill" onclick="filterWoodProjects('Web Apps', this)">Web Apps</button>
      <button type="button" class="wood-filter-pill" onclick="filterWoodProjects('Design', this)">Design</button>
      <button type="button" class="wood-filter-pill" onclick="filterWoodProjects('Tools', this)">Tools</button>
    </div>
    <div class="wood-projects-grid">
      ${projectCardsHtml}
    </div>
  </section>

  <!-- 04. SKILLS -->
  <section id="skills">
    <div class="wood-section-head">
      <span class="wood-section-tag">04. Botanical Oak Tree</span>
      <h2 class="wood-section-title">My Skills</h2>
    </div>
    <div class="wood-skills-grid">
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--primary); margin-bottom: 24px;">Core Capabilities</h3>
        ${skillBarsHtml}
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 2px solid var(--border); border-radius: var(--radius-lg); padding: 36px; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          <div style="font-size: 3.5rem; margin-bottom: 14px;">🌳</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${data.skills.map(s => `<span style="background: var(--surface-alt); border: 1px solid var(--border); color: var(--primary); padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05. EXPERIENCE -->
  <section id="experience">
    <div class="wood-section-head">
      <span class="wood-section-tag">05. Forest Growth Timeline</span>
      <h2 class="wood-section-title">Experience</h2>
    </div>
    <div class="wood-timeline">
      ${expTimelineHtml}
    </div>
  </section>

  <!-- 06. RESUME -->
  <section id="resume">
    <div class="wood-section-head">
      <span class="wood-section-tag">06. Field Guide Credentials</span>
      <h2 class="wood-section-title">My Resume</h2>
    </div>
    <div class="wood-resume-card">
      <div>
        <div class="wood-resume-item">
          <div class="wood-resume-icon">🎓</div>
          <div>
            <div class="wood-resume-label">Education &amp; Degree</div>
            <div class="wood-resume-val">${TemplateHelper.escapeHtml(eduPrimary.degree)} • ${TemplateHelper.escapeHtml(eduPrimary.institution)} ${eduPrimary.grade ? `• ${TemplateHelper.escapeHtml(eduPrimary.grade)}` : ''}</div>
          </div>
        </div>
        <div class="wood-resume-item">
          <div class="wood-resume-icon">🏆</div>
          <div>
            <div class="wood-resume-label">Credentials &amp; Recognition</div>
            <div class="wood-resume-val">${TemplateHelper.escapeHtml(certsDisplay)}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="wood-resume-item">
          <div class="wood-resume-icon">💼</div>
          <div>
            <div class="wood-resume-label">Practice</div>
            <div class="wood-resume-val">${data.metrics.yearsExp}+ Years in ${TemplateHelper.escapeHtml(data.skills.slice(0, 3).join(', '))}</div>
          </div>
        </div>
        <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
          <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="wood-btn-solid">Download PDF ↓</a>
          <a href="${safeWebsite || safeGithub}" target="_blank" rel="noopener" class="wood-btn-outline">View Online ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 07. BLOG -->
  <section id="blog">
    <div class="wood-section-head">
      <span class="wood-section-tag">07. Naturalist Insights</span>
      <h2 class="wood-section-title">My Blog</h2>
    </div>
    <div class="wood-projects-grid">
      ${blogCardsHtml}
    </div>
  </section>

  <!-- 08. CONTACT -->
  <section id="contact">
    <div class="wood-section-head">
      <span class="wood-section-tag">08. Send a Letter</span>
      <h2 class="wood-section-title">Let's Connect</h2>
    </div>
    <div class="wood-contact-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text); margin-bottom: 24px;">Have an initiative or interested in collaborating on crafted software? Let's talk.</p>
        ${safeEmail ? `<div style="margin-bottom: 14px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: var(--primary); text-decoration: none;">${safeEmail}</a></div>` : ''}
        ${safePhone ? `<div style="margin-bottom: 14px;"><strong>Phone:</strong> <span style="color: var(--primary);">${safePhone}</span></div>` : ''}
        <div style="margin-bottom: 14px;"><strong>Location:</strong> <span style="color: var(--primary);">${safeLocation || 'Remote / Worldwide'}</span></div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(45,74,62,0.1); border: 1px solid var(--border); color: var(--primary); padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">
          <span style="width: 8px; height: 8px; background: #10B981; border-radius: 50%;"></span>
          <span>Open for Collaborations</span>
        </div>
      </div>
      <form class="wood-contact-form" action="javascript:void(0);" onsubmit="event.preventDefault();">
        <div class="wood-input-group">
          <label>Your Name</label>
          <input type="text" name="name" class="wood-input" placeholder="Your Name" required>
        </div>
        <div class="wood-input-group">
          <label>Your Email</label>
          <input type="email" name="email" class="wood-input" placeholder="your.email@example.com" required>
        </div>
        <div class="wood-input-group">
          <label>Message</label>
          <textarea name="message" class="wood-textarea" rows="4" placeholder="Tell me about your initiative or opportunity..." required></textarea>
        </div>
        <button type="submit" class="wood-btn-solid" style="width: 100%; border: none; cursor: pointer;">Dispatch Message ➔</button>
      </form>
    </div>
  </section>

  <!-- 3D Three.js Golden Pollen Canvas -->
  <script>
    (function initWoodCanvas() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = document.getElementById('wood-webgl-canvas');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 25;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const count = 500;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0xD4A373, size: 0.35, transparent: true, opacity: 0.5 });
      const points = new THREE.Points(geom, mat);
      scene.add(points);

      function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    function filterWoodProjects(cat, btn) {
      document.querySelectorAll('.wood-filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.wood-project-card');
      cards.forEach(card => {
        const c = card.getAttribute('data-category');
        if (cat === 'all' || (c && c.toLowerCase() === cat.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>`;

    return {
      html,
      css: '',
      js: ''
    };
  }
};

module.exports = { BotanicalWoodcraftTemplate };

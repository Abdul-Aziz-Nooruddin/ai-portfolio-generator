/**
 * Template 03: Bioluminescent Eco-Tech Cyber-Botanical (Image 2)
 * Theme: Midnight Deep Teal (#061118), Bioluminescent Cyan (#00F2FE), Neon Emerald (#10B981)
 * 3D Engine: Three.js Glowing Bioluminescent Sprout Particles, Waveform Rings & Cyber Matrix
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');

const BioluminescentWireframeTemplate = {
  id: 'bioluminescent-wireframe',
  name: 'Bioluminescent Eco-Tech',
  category: 'Eco-Tech / Wireframe',
  description: 'Bioluminescent cyber-botanical universe featuring neon wireframe sprouts, concentric radar rings, circuit-board tree of skills, and origami messenger bird.',
  thumbnail: '/assets/templates/bioluminescent-wireframe.jpg',
  palette: {
    bg: '#061118',
    surface: '#0B1C26',
    surfaceAlt: '#102736',
    text: '#F0FDFA',
    textMuted: '#5EEAD4',
    primary: '#00F2FE',
    accent: '#10B981',
    border: 'rgba(0, 242, 254, 0.25)',
    glow: 'rgba(0, 242, 254, 0.4)'
  },
  recommendedFor: ['Eco-Tech Engineer', 'AI & Machine Learning Developer', 'Full Stack Developer', 'Data Scientist'],

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
    const assignedArtworks = new Set(['/assets/3d/bioluminescent_wireframe_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="bio-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="bio-project-thumb-box" style="width: 100%; height: 180px; margin-bottom: 16px; border-radius: 12px; overflow: hidden;">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'bioluminescent-wireframe', idx, assignedArtworks, userSeed)}
        </div>
        <div class="bio-card-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span class="bio-cat-tag">${TemplateHelper.escapeHtml(p.category)}</span>
        </div>
        <h3 class="bio-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="bio-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="bio-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="bio-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="bio-card-links">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="bio-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="bio-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    const skillBarsHtml = data.skills.slice(0, 6).map((s, idx) => {
      const pct = Math.max(76, 96 - (idx * 3));
      return `
        <div class="bio-skill-row">
          <div class="bio-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span class="bio-skill-pct">${pct}%</span>
          </div>
          <div class="bio-skill-track">
            <div class="bio-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    const expTimelineHtml = data.experience.map(e => `
      <div class="bio-timeline-item">
        <div class="bio-timeline-dot"></div>
        <div class="bio-timeline-content">
          <div class="bio-timeline-period">${TemplateHelper.escapeHtml(e.period)}</div>
          <h4 class="bio-timeline-role">${TemplateHelper.escapeHtml(e.role)}</h4>
          <div class="bio-timeline-company">${TemplateHelper.escapeHtml(e.company)}</div>
          <p class="bio-timeline-desc">${TemplateHelper.escapeHtml(e.desc)}</p>
        </div>
      </div>
    `).join('');

    const eduPrimary = data.education[0];
    const certsDisplay = data.certifications.map(c => c.name).join(', ');

    const blogCardsHtml = data.blogArticles.map(art => `
      <div class="bio-project-card">
        <div class="bio-icon-badge">${art.icon}</div>
        <h3 class="bio-project-title">${TemplateHelper.escapeHtml(art.title)}</h3>
        <p class="bio-project-desc">${TemplateHelper.escapeHtml(art.desc)}</p>
        <span class="bio-cat-tag">${TemplateHelper.escapeHtml(art.tag)}</span>
      </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole}</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    :root {
      --bg: #061118;
      --surface: #0B1C26;
      --surface-alt: #102736;
      --surface-glass: rgba(11, 28, 38, 0.85);
      --border: rgba(0, 242, 254, 0.25);
      --border-glow: rgba(0, 242, 254, 0.55);
      --primary: #00F2FE;
      --accent: #10B981;
      --text: #F0FDFA;
      --text-muted: #5EEAD4;
      --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: hidden;
      line-height: 1.6;
    }

    .bio-nav-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 16px 36px;
      background: var(--surface-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .bio-monogram {
      font-weight: 900;
      font-size: 1.5rem;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 30%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }

    .bio-nav-links {
      display: flex;
      gap: 28px;
      list-style: none;
    }

    .bio-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .bio-nav-link:hover, .bio-nav-link.active {
      color: #FFFFFF;
      text-shadow: 0 0 10px var(--primary);
    }

    .bio-cta-btn {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #041017;
      text-decoration: none;
      padding: 8px 22px;
      border-radius: 9999px;
      font-size: 0.86rem;
      font-weight: 800;
      box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .bio-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 24px rgba(0, 242, 254, 0.6);
    }

    .bio-social-dock {
      position: fixed;
      left: 28px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 100;
      background: var(--surface-glass);
      border: 1px solid var(--border);
      padding: 14px 10px;
      border-radius: 9999px;
      backdrop-filter: blur(16px);
    }

    .bio-social-icon {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, transform 0.2s;
    }

    .bio-social-icon:hover {
      color: #FFFFFF;
      transform: scale(1.15);
    }

    section {
      padding: 110px 48px 90px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .bio-section-head {
      text-align: center;
      margin-bottom: 54px;
    }

    .bio-section-tag {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }

    .bio-section-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 20%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* 01. Hero */
    .bio-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 48px;
      min-height: calc(100vh - 100px);
    }

    .bio-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 242, 254, 0.12);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
    }

    .bio-hero-name {
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .bio-hero-role {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
    }

    .bio-hero-desc {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 520px;
      margin-bottom: 34px;
      line-height: 1.7;
    }

    .bio-hero-actions {
      display: flex;
      gap: 16px;
    }

    .bio-btn-solid {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #041017;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-weight: 800;
      box-shadow: 0 8px 24px rgba(0, 242, 254, 0.4);
      transition: all 0.25s ease;
    }

    .bio-btn-solid:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(0, 242, 254, 0.6);
    }

    .bio-btn-outline {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      transition: all 0.25s ease;
    }

    .bio-btn-outline:hover {
      background: rgba(0, 242, 254, 0.12);
      border-color: var(--primary);
    }

    /* 02. About */
    .bio-about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .bio-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 28px;
    }

    .bio-stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      text-align: center;
      transition: all 0.25s ease;
    }

    .bio-stat-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0, 242, 254, 0.2);
    }

    .bio-stat-val {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .bio-stat-lbl {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    /* 03. Projects */
    .bio-filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .bio-filter-pill {
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

    .bio-filter-pill.active, .bio-filter-pill:hover {
      background: var(--primary);
      color: #041017;
      border-color: var(--primary);
      box-shadow: 0 0 14px rgba(0, 242, 254, 0.4);
    }

    .bio-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
    }

    .bio-project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .bio-project-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 242, 254, 0.25);
    }

    .bio-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .bio-icon-badge { font-size: 1.5rem; }

    .bio-cat-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary);
      background: rgba(0, 242, 254, 0.15);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .bio-project-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #FFFFFF;
    }

    .bio-project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 18px;
      flex: 1;
      line-height: 1.6;
    }

    .bio-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .bio-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 3px 8px;
      border-radius: 6px;
      color: #E2E8F0;
    }

    .bio-card-links {
      display: flex;
      gap: 12px;
    }

    .bio-link-btn {
      flex: 1;
      text-align: center;
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .bio-link-btn.primary {
      background: var(--primary);
      color: #041017;
    }

    .bio-link-btn.outline {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #FFFFFF;
    }

    /* 04. Skills */
    .bio-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .bio-skill-row { margin-bottom: 18px; }

    .bio-skill-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: #FFFFFF;
    }

    .bio-skill-pct {
      color: var(--primary);
      font-family: var(--font-mono);
    }

    .bio-skill-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 9999px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .bio-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 9999px;
      box-shadow: 0 0 10px var(--primary);
    }

    /* 05. Experience */
    .bio-timeline {
      position: relative;
      border-left: 2px solid var(--border);
      margin-left: 20px;
      padding-left: 32px;
    }

    .bio-timeline-item {
      position: relative;
      margin-bottom: 36px;
    }

    .bio-timeline-dot {
      position: absolute;
      left: -39px;
      top: 4px;
      width: 14px;
      height: 14px;
      background: var(--primary);
      border: 3px solid var(--bg);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--primary);
    }

    .bio-timeline-period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .bio-timeline-role {
      font-size: 1.2rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .bio-timeline-company {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .bio-timeline-desc {
      font-size: 0.9rem;
      color: #CBD5E1;
      line-height: 1.6;
    }

    /* 06. Resume */
    .bio-resume-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .bio-resume-item {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    .bio-resume-icon { font-size: 1.6rem; }

    .bio-resume-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }

    .bio-resume-val {
      font-size: 1rem;
      font-weight: 600;
      color: #FFFFFF;
    }

    /* 08. Contact */
    .bio-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .bio-contact-form {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
    }

    .bio-input-group { margin-bottom: 16px; }

    .bio-input-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    .bio-input, .bio-textarea {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      color: #FFFFFF;
      font-family: inherit;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    .bio-input:focus, .bio-textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.3);
    }

    #bio-webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.9;
    }

    .nano-banana-3d-hero {
      transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .nano-banana-3d-hero:hover {
      transform: scale(1.03) translateY(-8px);
      border-color: var(--primary) !important;
      box-shadow: 0 30px 65px rgba(0,0,0,0.95), 0 0 60px rgba(0, 242, 254, 0.6) !important;
    }

    @keyframes float3dHero {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(0.8deg); }
    }

    @media (max-width: 900px) {
      .bio-hero-grid, .bio-about-grid, .bio-skills-grid, .bio-contact-grid, .bio-resume-card {
        grid-template-columns: 1fr;
      }
      .bio-nav-links { display: none; }
      .bio-social-dock { display: none; }
      section { padding: 90px 20px 60px; }
    }

    @media (max-width: 640px) {
      .bio-hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .bio-btn-solid, .bio-btn-outline {
        width: 100%;
        justify-content: center;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
      }
      .bio-projects-grid {
        grid-template-columns: 1fr;
      }
      section { padding: 80px 14px 40px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
      #bio-webgl-canvas { display: none !important; }
    }
  </style>
</head>
<body class="layout-root layout-bioluminescent">

  <div id="bio-webgl-canvas"></div>

  <!-- Top Header -->
  <header class="bio-nav-header">
    <a href="#home" class="bio-monogram">${initials}</a>
    <ul class="bio-nav-links">
      <li><a href="#home" class="bio-nav-link active">Home</a></li>
      <li><a href="#about" class="bio-nav-link">About</a></li>
      <li><a href="#projects" class="bio-nav-link">Projects</a></li>
      <li><a href="#skills" class="bio-nav-link">Skills</a></li>
      <li><a href="#experience" class="bio-nav-link">Experience</a></li>
      <li><a href="#resume" class="bio-nav-link">Resume</a></li>
      <li><a href="#blog" class="bio-nav-link">Blog</a></li>
      <li><a href="#contact" class="bio-nav-link">Contact</a></li>
    </ul>
    <a href="#contact" class="bio-cta-btn">Let's Talk</a>
  </header>

  <!-- Left Social Dock -->
  ${Template3DVisuals.renderSocialDock({ github: safeGithub, linkedin: safeLinkedin, twitter: safeTwitter, email: safeEmail }, 'bio')}

  <!-- 01. HOME HERO -->
  <section id="home">
    <div class="bio-hero-grid">
      <div>
        <div class="bio-hero-badge">
          <span>🌿 BIOLUMINESCENT WIREFRAME</span>
        </div>
        <h1 class="bio-hero-name">Hello, I'm <br><span style="color: var(--primary);">${safeName}</span></h1>
        <div class="bio-hero-role">${safeRole}</div>
        <p class="bio-hero-desc">${safeBio}</p>
        <div class="bio-hero-actions">
          <a href="#projects" class="bio-btn-solid">View My Work</a>
          <a href="#contact" class="bio-btn-outline">Let's Talk</a>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${Template3DVisuals.getBioluminescentHeroArtwork(safeName)}
      </div>
    </div>
  </section>

  <!-- 02. ABOUT ME -->
  <section id="about">
    <div class="bio-section-head">
      <span class="bio-section-tag">02. Telemetry Deck</span>
      <h2 class="bio-section-title">About Me</h2>
    </div>
    <div class="bio-about-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.8;">${safeBio}</p>
        <div class="bio-stats-grid">
          <div class="bio-stat-card">
            <div class="bio-stat-val">${data.metrics.yearsExp}+</div>
            <div class="bio-stat-lbl">Years Experience</div>
          </div>
          <div class="bio-stat-card">
            <div class="bio-stat-val">${data.metrics.projectsCount}+</div>
            <div class="bio-stat-lbl">Projects Built</div>
          </div>
          <div class="bio-stat-card">
            <div class="bio-stat-val">${data.metrics.skillsCount}+</div>
            <div class="bio-stat-lbl">Technologies</div>
          </div>
          <div class="bio-stat-card">
            <div class="bio-stat-val">${data.metrics.certsCount}+</div>
            <div class="bio-stat-lbl">Credentials &amp; Milestones</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🌐</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Concentric Telemetry Rings</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">Monitoring distributed data pipelines, sustainable compute, and modern architectures.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 03. PROJECTS -->
  <section id="projects">
    <div class="bio-section-head">
      <span class="bio-section-tag">03. Selected Artifacts</span>
      <h2 class="bio-section-title">My Projects</h2>
    </div>
    <div class="bio-filters">
      <button type="button" class="bio-filter-pill active" onclick="filterBioProjects('all', this)">All</button>
      <button type="button" class="bio-filter-pill" onclick="filterBioProjects('Web Apps', this)">Web Apps</button>
      <button type="button" class="bio-filter-pill" onclick="filterBioProjects('AI/ML', this)">AI/ML</button>
      <button type="button" class="bio-filter-pill" onclick="filterBioProjects('Tools', this)">Tools</button>
      <button type="button" class="bio-filter-pill" onclick="filterBioProjects('Design', this)">Design</button>
    </div>
    <div class="bio-projects-grid">
      ${projectCardsHtml}
    </div>
  </section>

  <!-- 04. SKILLS -->
  <section id="skills">
    <div class="bio-section-head">
      <span class="bio-section-tag">04. Circuit Tree Matrix</span>
      <h2 class="bio-section-title">My Skills</h2>
    </div>
    <div class="bio-skills-grid">
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px;">Core Capabilities</h3>
        ${skillBarsHtml}
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 36px;">
          <div style="font-size: 3.5rem; margin-bottom: 14px; filter: drop-shadow(0 0 16px #00F2FE);">🌲</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${data.skills.map(s => `<span style="background: rgba(0,242,254,0.15); border: 1px solid var(--border); color: #FFFFFF; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 600;">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05. EXPERIENCE -->
  <section id="experience">
    <div class="bio-section-head">
      <span class="bio-section-tag">05. Professional Journey</span>
      <h2 class="bio-section-title">Experience</h2>
    </div>
    <div class="bio-timeline">
      ${expTimelineHtml}
    </div>
  </section>

  <!-- 06. RESUME -->
  <section id="resume">
    <div class="bio-section-head">
      <span class="bio-section-tag">06. Credentials &amp; Education</span>
      <h2 class="bio-section-title">My Resume</h2>
    </div>
    <div class="bio-resume-card">
      <div>
        <div class="bio-resume-item">
          <div class="bio-resume-icon">🎓</div>
          <div>
            <div class="bio-resume-label">Degree &amp; Institution</div>
            <div class="bio-resume-val">${TemplateHelper.escapeHtml(eduPrimary.degree)} • ${TemplateHelper.escapeHtml(eduPrimary.institution)} ${eduPrimary.grade ? `• ${TemplateHelper.escapeHtml(eduPrimary.grade)}` : ''}</div>
          </div>
        </div>
        <div class="bio-resume-item">
          <div class="bio-resume-icon">🏆</div>
          <div>
            <div class="bio-resume-label">Certifications</div>
            <div class="bio-resume-val">${TemplateHelper.escapeHtml(certsDisplay)}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="bio-resume-item">
          <div class="bio-resume-icon">💼</div>
          <div>
            <div class="bio-resume-label">Technical Breadth</div>
            <div class="bio-resume-val">${data.metrics.yearsExp}+ Years in ${TemplateHelper.escapeHtml(data.skills.slice(0, 3).join(', '))}</div>
          </div>
        </div>
        <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
          <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="bio-btn-solid">Download PDF ↓</a>
          <a href="${safeWebsite || safeGithub}" target="_blank" rel="noopener" class="bio-btn-outline">View Online ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 07. BLOG -->
  <section id="blog">
    <div class="bio-section-head">
      <span class="bio-section-tag">07. Technical Insights</span>
      <h2 class="bio-section-title">My Blog</h2>
    </div>
    <div class="bio-projects-grid">
      ${blogCardsHtml}
    </div>
  </section>

  <!-- 08. CONTACT -->
  <section id="contact">
    <div class="bio-section-head">
      <span class="bio-section-tag">08. Transmission Node</span>
      <h2 class="bio-section-title">Let's Connect</h2>
    </div>
    <div class="bio-contact-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 24px;">Interested in building intelligent, scalable and resilient digital solutions? Let's connect.</p>
        ${safeEmail ? `<div style="margin-bottom: 14px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: var(--primary); text-decoration: none;">${safeEmail}</a></div>` : ''}
        ${safePhone ? `<div style="margin-bottom: 14px;"><strong>Phone:</strong> <span style="color: #FFFFFF;">${safePhone}</span></div>` : ''}
        <div style="margin-bottom: 14px;"><strong>Location:</strong> <span style="color: #FFFFFF;">${safeLocation || 'Remote / Worldwide'}</span></div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0,242,254,0.15); border: 1px solid rgba(0,242,254,0.4); color: #00F2FE; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">
          <span style="width: 8px; height: 8px; background: #00F2FE; border-radius: 50%; box-shadow: 0 0 8px #00F2FE;"></span>
        </div>
      </div>
      <form class="bio-contact-form" action="javascript:void(0);" onsubmit="event.preventDefault();">
        <div class="bio-input-group">
          <label>Your Name</label>
          <input type="text" name="name" class="bio-input" placeholder="Your Name" required>
        </div>
        <div class="bio-input-group">
          <label>Your Email</label>
          <input type="email" name="email" class="bio-input" placeholder="your.email@example.com" required>
        </div>
        <div class="bio-input-group">
          <label>Message</label>
          <textarea name="message" class="bio-textarea" rows="4" placeholder="Tell me about your project or opportunity..." required></textarea>
        </div>
        <button type="submit" class="bio-btn-solid" style="width: 100%; border: none; cursor: pointer;">Send Transmission ➔</button>
      </form>
    </div>
  </section>

  <!-- 3D Three.js Bioluminescent Canvas -->
  <script>
    (function initBioCanvas() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = document.getElementById('bio-webgl-canvas');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const particleCount = 1200;
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 24;
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = Math.sin(theta) * radius;

        if (Math.random() > 0.4) {
          colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 1.0;
        } else {
          colors[i * 3] = 0.06; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.51;
        }
      }

      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.45,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
      });

      const points = new THREE.Points(geom, pMat);
      scene.add(points);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.0015;
        points.rotation.x += 0.0005;
        camera.position.x += (mouseX * 4 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    function filterBioProjects(cat, btn) {
      document.querySelectorAll('.bio-filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.bio-project-card');
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

module.exports = { BioluminescentWireframeTemplate };

/**
 * Template 02: Cyber Crystal Purple Holographic Studio (Image 1)
 * Theme: Obsidian Amethyst (#0B0813), Vivid Crystal Purple (#A855F7), Neon Lilac (#D8B4FE)
 * 3D Engine: Three.js Floating 3D Quartz Clusters, Polyhedral Crystal Core & Amethyst Matrix
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');

const CyberCrystalTemplate = {
  id: 'cyber-crystal',
  name: 'Cyber Crystal Studio',
  category: 'Cyberpunk / Crystalline',
  description: 'Cyberpunk crystalline developer universe with floating quartz clusters, polyhedral skill constellation, hexagonal project cards, and circuit-crystal timeline.',
  thumbnail: '/assets/templates/cyber-crystal.jpg',
  palette: {
    bg: '#0B0813',
    surface: '#130E20',
    surfaceAlt: '#1A142D',
    text: '#F8FAFC',
    textMuted: '#A78BFA',
    primary: '#A855F7',
    accent: '#D8B4FE',
    border: 'rgba(168, 85, 247, 0.3)',
    glow: 'rgba(168, 85, 247, 0.45)'
  },
  recommendedFor: ['AI Developer', 'Full Stack Engineer', 'Game Developer', 'Creative Technologist'],

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

    // Dynamic Projects
    const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');
    const assignedArtworks = new Set(['/assets/3d/cyber_crystal_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="crystal-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="crystal-project-thumb-box" style="width: 100%; height: 180px; margin-bottom: 16px; border-radius: 12px; overflow: hidden;">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'cyber-crystal', idx, assignedArtworks, userSeed)}
        </div>
        <div class="crystal-card-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span class="crystal-cat-tag">${TemplateHelper.escapeHtml(p.category)}</span>
        </div>
        <h3 class="crystal-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="crystal-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="crystal-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="crystal-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="crystal-card-links">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="crystal-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="crystal-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    // Dynamic Skills
    const skillBarsHtml = data.skills.slice(0, 6).map((s, idx) => {
      const pct = Math.max(75, 96 - (idx * 3));
      return `
        <div class="crystal-skill-row">
          <div class="crystal-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span class="crystal-skill-pct">${pct}%</span>
          </div>
          <div class="crystal-skill-track">
            <div class="crystal-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Dynamic Experience Timeline
    const expTimelineHtml = data.experience.map(e => `
      <div class="crystal-timeline-item">
        <div class="crystal-timeline-dot"></div>
        <div class="crystal-timeline-content">
          <div class="crystal-timeline-period">${TemplateHelper.escapeHtml(e.period)}</div>
          <h4 class="crystal-timeline-role">${TemplateHelper.escapeHtml(e.role)}</h4>
          <div class="crystal-timeline-company">${TemplateHelper.escapeHtml(e.company)}</div>
          <p class="crystal-timeline-desc">${TemplateHelper.escapeHtml(e.desc)}</p>
        </div>
      </div>
    `).join('');

    // Dynamic Education & Resume
    const eduPrimary = data.education[0];
    const certsDisplay = data.certifications.map(c => c.name).join(', ');

    // Dynamic Blog Cards
    const blogCardsHtml = data.blogArticles.map(art => `
      <div class="crystal-project-card">
        <div class="crystal-icon-badge">${art.icon}</div>
        <h3 class="crystal-project-title">${TemplateHelper.escapeHtml(art.title)}</h3>
        <p class="crystal-project-desc">${TemplateHelper.escapeHtml(art.desc)}</p>
        <span class="crystal-cat-tag">${TemplateHelper.escapeHtml(art.tag)}</span>
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
      --bg: #0B0813;
      --surface: #130E20;
      --surface-alt: #1A142D;
      --surface-glass: rgba(19, 14, 32, 0.82);
      --border: rgba(168, 85, 247, 0.28);
      --border-glow: rgba(168, 85, 247, 0.6);
      --primary: #A855F7;
      --accent: #D8B4FE;
      --pink: #EC4899;
      --text: #F8FAFC;
      --text-muted: #A78BFA;
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

    .crystal-nav-header {
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

    .crystal-monogram {
      font-family: var(--font-sans);
      font-weight: 900;
      font-size: 1.5rem;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 30%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }

    .crystal-nav-links {
      display: flex;
      gap: 28px;
      list-style: none;
    }

    .crystal-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .crystal-nav-link:hover, .crystal-nav-link.active {
      color: #FFFFFF;
      text-shadow: 0 0 10px var(--primary);
    }

    .crystal-cta-btn {
      background: linear-gradient(135deg, var(--primary), var(--pink));
      color: #FFFFFF;
      text-decoration: none;
      padding: 8px 22px;
      border-radius: 9999px;
      font-size: 0.86rem;
      font-weight: 700;
      box-shadow: 0 0 16px rgba(168, 85, 247, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .crystal-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 24px rgba(168, 85, 247, 0.6);
    }

    .crystal-social-dock {
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

    .crystal-social-icon {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s, transform 0.2s;
    }

    .crystal-social-icon:hover {
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

    .crystal-section-head {
      text-align: center;
      margin-bottom: 54px;
    }

    .crystal-section-tag {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }

    .crystal-section-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 20%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* 01. Hero Section */
    .crystal-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 48px;
      min-height: calc(100vh - 100px);
    }

    .crystal-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(168, 85, 247, 0.15);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 20px;
    }

    .crystal-hero-name {
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .crystal-hero-role {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 20px;
    }

    .crystal-hero-desc {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 520px;
      margin-bottom: 34px;
      line-height: 1.7;
    }

    .crystal-hero-actions {
      display: flex;
      gap: 16px;
    }

    .crystal-btn-solid {
      background: linear-gradient(135deg, var(--primary), var(--pink));
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(168, 85, 247, 0.4);
      transition: all 0.25s ease;
    }

    .crystal-btn-solid:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(168, 85, 247, 0.6);
    }

    .crystal-btn-outline {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      transition: all 0.25s ease;
    }

    .crystal-btn-outline:hover {
      background: rgba(168, 85, 247, 0.15);
      border-color: var(--primary);
    }

    /* 02. About Section */
    .crystal-about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .crystal-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 28px;
    }

    .crystal-stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      text-align: center;
      transition: all 0.25s ease;
    }

    .crystal-stat-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(168, 85, 247, 0.2);
    }

    .crystal-stat-val {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--accent);
      margin-bottom: 4px;
    }

    .crystal-stat-lbl {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    /* 03. Projects Grid */
    .crystal-filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .crystal-filter-pill {
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

    .crystal-filter-pill.active, .crystal-filter-pill:hover {
      background: var(--primary);
      color: #FFFFFF;
      border-color: var(--primary);
      box-shadow: 0 0 14px rgba(168, 85, 247, 0.4);
    }

    .crystal-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
    }

    .crystal-project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .crystal-project-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(168, 85, 247, 0.25);
    }

    .crystal-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .crystal-icon-badge {
      font-size: 1.5rem;
    }

    .crystal-cat-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--accent);
      background: rgba(168, 85, 247, 0.15);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .crystal-project-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 8px;
      color: #FFFFFF;
    }

    .crystal-project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 18px;
      flex: 1;
      line-height: 1.6;
    }

    .crystal-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .crystal-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 3px 8px;
      border-radius: 6px;
      color: #E2E8F0;
    }

    .crystal-card-links {
      display: flex;
      gap: 12px;
    }

    .crystal-link-btn {
      flex: 1;
      text-align: center;
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .crystal-link-btn.primary {
      background: var(--primary);
      color: #FFFFFF;
    }

    .crystal-link-btn.outline {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #FFFFFF;
    }

    /* 04. Skills Section */
    .crystal-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .crystal-skill-row {
      margin-bottom: 18px;
    }

    .crystal-skill-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: #FFFFFF;
    }

    .crystal-skill-pct {
      color: var(--accent);
      font-family: var(--font-mono);
    }

    .crystal-skill-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 9999px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .crystal-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--pink));
      border-radius: 9999px;
      box-shadow: 0 0 10px var(--primary);
    }

    /* 05. Experience Timeline */
    .crystal-timeline {
      position: relative;
      border-left: 2px solid var(--border);
      margin-left: 20px;
      padding-left: 32px;
    }

    .crystal-timeline-item {
      position: relative;
      margin-bottom: 36px;
    }

    .crystal-timeline-dot {
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

    .crystal-timeline-period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 4px;
    }

    .crystal-timeline-role {
      font-size: 1.2rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .crystal-timeline-company {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .crystal-timeline-desc {
      font-size: 0.9rem;
      color: #CBD5E1;
      line-height: 1.6;
    }

    /* 06. Resume Section */
    .crystal-resume-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .crystal-resume-item {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
    }

    .crystal-resume-icon {
      font-size: 1.6rem;
    }

    .crystal-resume-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }

    .crystal-resume-val {
      font-size: 1rem;
      font-weight: 600;
      color: #FFFFFF;
    }

    /* 08. Contact Section */
    .crystal-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .crystal-contact-form {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
    }

    .crystal-input-group {
      margin-bottom: 16px;
    }

    .crystal-input-group label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    .crystal-input, .crystal-textarea {
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

    .crystal-input:focus, .crystal-textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 12px rgba(168, 85, 247, 0.3);
    }

    #crystal-webgl-canvas {
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
      border-color: var(--accent) !important;
      box-shadow: 0 30px 65px rgba(0,0,0,0.95), 0 0 60px rgba(168, 85, 247, 0.6) !important;
    }

    @keyframes float3dHero {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(0.8deg); }
    }

    @media (max-width: 900px) {
      .crystal-hero-grid, .crystal-about-grid, .crystal-skills-grid, .crystal-contact-grid, .crystal-resume-card {
        grid-template-columns: 1fr;
      }
      .crystal-nav-links { display: none; }
      .crystal-social-dock { display: none; }
      section { padding: 90px 20px 60px; }
    }

    @media (max-width: 640px) {
      .crystal-hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .crystal-btn-solid, .crystal-btn-outline {
        width: 100%;
        justify-content: center;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
      }
      .crystal-projects-grid {
        grid-template-columns: 1fr;
      }
      section { padding: 80px 14px 40px; }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
      #crystal-webgl-canvas { display: none !important; }
    }
  </style>
</head>
<body class="layout-root layout-cyber-crystal">

  <div id="crystal-webgl-canvas"></div>

  <!-- Top Navigation Header -->
  <header class="crystal-nav-header">
    <a href="#home" class="crystal-monogram">${initials}</a>
    <ul class="crystal-nav-links">
      <li><a href="#home" class="crystal-nav-link active">Home</a></li>
      <li><a href="#about" class="crystal-nav-link">About</a></li>
      <li><a href="#projects" class="crystal-nav-link">Projects</a></li>
      <li><a href="#skills" class="crystal-nav-link">Skills</a></li>
      <li><a href="#experience" class="crystal-nav-link">Experience</a></li>
      <li><a href="#resume" class="crystal-nav-link">Resume</a></li>
      <li><a href="#blog" class="crystal-nav-link">Blog</a></li>
      <li><a href="#contact" class="crystal-nav-link">Contact</a></li>
    </ul>
    <a href="#contact" class="crystal-cta-btn">Let's Talk</a>
  </header>

  <!-- Fixed Left Social Dock -->
  ${Template3DVisuals.renderSocialDock({ github: safeGithub, linkedin: safeLinkedin, twitter: safeTwitter, email: safeEmail }, 'crystal')}

  <!-- 01. HOME HERO -->
  <section id="home">
    <div class="crystal-hero-grid">
      <div>
        <div class="crystal-hero-badge">
          <span>✨ CYBER CRYSTAL MATRIX</span>
        </div>
        <h1 class="crystal-hero-name">Hello, I'm <br><span style="color: var(--accent);">${safeName}</span></h1>
        <div class="crystal-hero-role">${safeRole}</div>
        <p class="crystal-hero-desc">${safeBio}</p>
        <div class="crystal-hero-actions">
          <a href="#projects" class="crystal-btn-solid">View My Work</a>
          <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="crystal-btn-outline">Download CV</a>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${Template3DVisuals.getCyberCrystalHeroArtwork(safeName)}
      </div>
    </div>
  </section>

  <!-- 02. ABOUT ME -->
  <section id="about">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">02. Intelligence Deck</span>
      <h2 class="crystal-section-title">About Me</h2>
    </div>
    <div class="crystal-about-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.8;">${safeBio}</p>
        <div class="crystal-stats-grid">
          <div class="crystal-stat-card">
            <div class="crystal-stat-val">${data.metrics.yearsExp}+</div>
            <div class="crystal-stat-lbl">Years Experience</div>
          </div>
          <div class="crystal-stat-card">
            <div class="crystal-stat-val">${data.metrics.projectsCount}+</div>
            <div class="crystal-stat-lbl">Projects Built</div>
          </div>
          <div class="crystal-stat-card">
            <div class="crystal-stat-val">${data.metrics.skillsCount}+</div>
            <div class="crystal-stat-lbl">Technologies</div>
          </div>
          <div class="crystal-stat-card">
            <div class="crystal-stat-val">${data.metrics.certsCount}+</div>
            <div class="crystal-stat-lbl">Credentials &amp; Milestones</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔮</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Quantum Command Node</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">Specialized in scalable full-stack development, modern interfaces, and resilient technical architecture.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 03. PROJECTS -->
  <section id="projects">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">03. Selected Portfolio</span>
      <h2 class="crystal-section-title">My Projects</h2>
    </div>
    <div class="crystal-filters">
      <button type="button" class="crystal-filter-pill active" onclick="filterCrystalProjects('all', this)">All</button>
      <button type="button" class="crystal-filter-pill" onclick="filterCrystalProjects('Web Apps', this)">Web Apps</button>
      <button type="button" class="crystal-filter-pill" onclick="filterCrystalProjects('AI/ML', this)">AI/ML</button>
      <button type="button" class="crystal-filter-pill" onclick="filterCrystalProjects('Games', this)">Games</button>
      <button type="button" class="crystal-filter-pill" onclick="filterCrystalProjects('Tools', this)">Tools</button>
    </div>
    <div class="crystal-projects-grid">
      ${projectCardsHtml}
    </div>
  </section>

  <!-- 04. SKILLS -->
  <section id="skills">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">04. Technical Mastery</span>
      <h2 class="crystal-section-title">My Skills</h2>
    </div>
    <div class="crystal-skills-grid">
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px;">Core Capabilities</h3>
        ${skillBarsHtml}
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 36px;">
          <div style="font-size: 3.5rem; margin-bottom: 14px; filter: drop-shadow(0 0 16px #A855F7);">⚛️</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${data.skills.map(s => `<span style="background: rgba(168,85,247,0.15); border: 1px solid var(--border); color: #FFFFFF; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 600;">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05. EXPERIENCE -->
  <section id="experience">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">05. Career Milestones</span>
      <h2 class="crystal-section-title">Experience</h2>
    </div>
    <div class="crystal-timeline">
      ${expTimelineHtml}
    </div>
  </section>

  <!-- 06. RESUME -->
  <section id="resume">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">06. Formal Qualifications</span>
      <h2 class="crystal-section-title">My Resume</h2>
    </div>
    <div class="crystal-resume-card">
      <div>
        <div class="crystal-resume-item">
          <div class="crystal-resume-icon">🎓</div>
          <div>
            <div class="crystal-resume-label">Degree &amp; Institution</div>
            <div class="crystal-resume-val">${TemplateHelper.escapeHtml(eduPrimary.degree)} • ${TemplateHelper.escapeHtml(eduPrimary.institution)} ${eduPrimary.grade ? `• ${TemplateHelper.escapeHtml(eduPrimary.grade)}` : ''}</div>
          </div>
        </div>
        <div class="crystal-resume-item">
          <div class="crystal-resume-icon">🏆</div>
          <div>
            <div class="crystal-resume-label">Certifications &amp; Milestones</div>
            <div class="crystal-resume-val">${TemplateHelper.escapeHtml(certsDisplay)}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="crystal-resume-item">
          <div class="crystal-resume-icon">💼</div>
          <div>
            <div class="crystal-resume-label">Technical Breadth</div>
            <div class="crystal-resume-val">${data.metrics.yearsExp}+ Years in ${TemplateHelper.escapeHtml(data.skills.slice(0, 3).join(', '))}</div>
          </div>
        </div>
        <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
          <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="crystal-btn-solid">Download PDF ↓</a>
          <a href="${safeWebsite || safeGithub}" target="_blank" rel="noopener" class="crystal-btn-outline">View Online ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 07. BLOG -->
  <section id="blog">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">07. Technical Insights</span>
      <h2 class="crystal-section-title">My Blog</h2>
    </div>
    <div class="crystal-projects-grid">
      ${blogCardsHtml}
    </div>
  </section>

  <!-- 08. CONTACT -->
  <section id="contact">
    <div class="crystal-section-head">
      <span class="crystal-section-tag">08. Connect</span>
      <h2 class="crystal-section-title">Let's Connect</h2>
    </div>
    <div class="crystal-contact-grid">
      <div>
        <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 24px;">Have a project in mind or interested in collaborating? Let's build something remarkable.</p>
        ${safeEmail ? `<div style="margin-bottom: 14px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: var(--accent); text-decoration: none;">${safeEmail}</a></div>` : ''}
        ${safePhone ? `<div style="margin-bottom: 14px;"><strong>Phone:</strong> <span style="color: #FFFFFF;">${safePhone}</span></div>` : ''}
        <div style="margin-bottom: 14px;"><strong>Location:</strong> <span style="color: #FFFFFF;">${safeLocation || 'Remote / Worldwide'}</span></div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); color: #86EFAC; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">
          <span style="width: 8px; height: 8px; background: #22C55E; border-radius: 50%; box-shadow: 0 0 8px #22C55E;"></span>
        </div>
      </div>
      <form class="crystal-contact-form" action="javascript:void(0);" onsubmit="event.preventDefault();">
        <div class="crystal-input-group">
          <label>Your Name</label>
          <input type="text" name="name" class="crystal-input" placeholder="Your Name" required>
        </div>
        <div class="crystal-input-group">
          <label>Your Email</label>
          <input type="email" name="email" class="crystal-input" placeholder="your.email@example.com" required>
        </div>
        <div class="crystal-input-group">
          <label>Message</label>
          <textarea name="message" class="crystal-textarea" rows="4" placeholder="Tell me about your project or opportunity..." required></textarea>
        </div>
        <button type="submit" class="crystal-btn-solid" style="width: 100%; border: none; cursor: pointer;">Send Message ➔</button>
      </form>
    </div>
  </section>

  <!-- 3D Three.js Background Script -->
  <script>
    (function initCyberCrystalCanvas() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = document.getElementById('crystal-webgl-canvas');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 25;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const crystalsGroup = new THREE.Group();
      const geom = new THREE.OctahedronGeometry(1.2, 0);
      const mat = new THREE.MeshPhongMaterial({
        color: 0xA855F7,
        emissive: 0x581C87,
        wireframe: false,
        shininess: 90,
        transparent: true,
        opacity: 0.65
      });

      for (let i = 0; i < 40; i++) {
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 30
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        const scale = 0.4 + Math.random() * 1.2;
        mesh.scale.set(scale, scale, scale);
        crystalsGroup.add(mesh);
      }
      scene.add(crystalsGroup);

      const ambientLight = new THREE.AmbientLight(0x2E1065, 2);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xA855F7, 3, 100);
      pointLight1.position.set(10, 15, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xEC4899, 2.5, 100);
      pointLight2.position.set(-15, -10, 10);
      scene.add(pointLight2);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        crystalsGroup.rotation.y += 0.003;
        crystalsGroup.rotation.x += 0.001;
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
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

    function filterCrystalProjects(cat, btn) {
      document.querySelectorAll('.crystal-filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.crystal-project-card');
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

module.exports = { CyberCrystalTemplate };

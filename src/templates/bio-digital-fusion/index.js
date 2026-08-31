/**
 * Template 05: Bio-Digital Circuit Forest Synthesis (Image 5)
 * Theme: Dark Circuit Slate (#0B151A), Neon Aqua Cyan (#00F2FE), Antique Parchment (#F5EFE0)
 * 3D Engine: Three.js Bio-Digital Matrix Waves, Cyber Pollen & Glowing Circuit Vines
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');

const BioDigitalFusionTemplate = {
  id: 'bio-digital-fusion',
  name: 'Bio-Digital Circuit Fusion',
  category: 'Bio-Digital / Hybrid',
  description: 'Hybrid bio-digital synthesis blending dark circuit board cyber-telemetry with warm organic parchment cards and illuminated botanical graphics.',
  thumbnail: '/assets/templates/bio-digital-fusion.jpg',
  palette: {
    bg: '#0B151A',
    surface: '#11222C',
    surfaceAlt: '#F5EFE0',
    text: '#F8FAFC',
    textMuted: '#5EEAD4',
    primary: '#00F2FE',
    accent: '#10B981',
    border: 'rgba(0, 242, 254, 0.28)',
    glow: 'rgba(0, 242, 254, 0.45)'
  },
  recommendedFor: ['Full Stack Developer', 'AI Engineer', 'Creative Coder', 'Solutions Architect'],

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
    const assignedArtworks = new Set(['/assets/3d/bio_digital_fusion_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="fusion-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="fusion-project-thumb-box" style="width: 100%; height: 180px; margin-bottom: 16px; border-radius: 12px; overflow: hidden;">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'bio-digital-fusion', idx, assignedArtworks, userSeed)}
        </div>
        <div class="fusion-card-header" style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
          <span class="fusion-cat-tag">${TemplateHelper.escapeHtml(p.category)}</span>
        </div>
        <h3 class="fusion-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="fusion-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="fusion-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="fusion-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="fusion-card-links">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="fusion-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="fusion-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    const skillBarsHtml = data.skills.slice(0, 6).map((s, idx) => {
      const pct = Math.max(78, 96 - (idx * 3));
      return `
        <div class="fusion-skill-row">
          <div class="fusion-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span class="fusion-skill-pct">${pct}%</span>
          </div>
          <div class="fusion-skill-track">
            <div class="fusion-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    const expTimelineHtml = data.experience.map(e => `
      <div class="fusion-timeline-item">
        <div class="fusion-timeline-dot"></div>
        <div class="fusion-timeline-content">
          <div class="fusion-timeline-period">${TemplateHelper.escapeHtml(e.period)}</div>
          <h4 class="fusion-timeline-role">${TemplateHelper.escapeHtml(e.role)}</h4>
          <div class="fusion-timeline-company">${TemplateHelper.escapeHtml(e.company)}</div>
          <p class="fusion-timeline-desc">${TemplateHelper.escapeHtml(e.desc)}</p>
        </div>
      </div>
    `).join('');

    const eduPrimary = data.education[0];
    const certsDisplay = data.certifications.map(c => c.name).join(', ');

    const blogCardsHtml = data.blogArticles.map(art => `
      <div class="fusion-project-card">
        <div class="fusion-icon-badge">${art.icon}</div>
        <h3 class="fusion-project-title">${TemplateHelper.escapeHtml(art.title)}</h3>
        <p class="fusion-project-desc">${TemplateHelper.escapeHtml(art.desc)}</p>
        <span class="fusion-cat-tag">${TemplateHelper.escapeHtml(art.tag)}</span>
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
      --bg: #0B151A;
      --surface: #11222C;
      --surface-parchment: #F5EFE0;
      --text: #F8FAFC;
      --text-dark: #1E293B;
      --text-muted: #5EEAD4;
      --primary: #00F2FE;
      --accent: #10B981;
      --timber: #8C5E3C;
      --border: rgba(0, 242, 254, 0.28);
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

    .fusion-nav-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      padding: 16px 36px;
      background: rgba(11, 21, 26, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .fusion-monogram {
      font-weight: 900;
      font-size: 1.5rem;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 30%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }

    .fusion-nav-links {
      display: flex;
      gap: 28px;
      list-style: none;
    }

    .fusion-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.86rem;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .fusion-nav-link:hover, .fusion-nav-link.active {
      color: #FFFFFF;
      text-shadow: 0 0 10px var(--primary);
    }

    .fusion-cta-btn {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #041017;
      text-decoration: none;
      padding: 8px 22px;
      border-radius: 9999px;
      font-size: 0.86rem;
      font-weight: 800;
      box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
      transition: all 0.2s;
    }

    .fusion-social-dock {
      position: fixed;
      left: 28px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 16px;
      z-index: 100;
      background: rgba(17, 34, 44, 0.9);
      border: 1px solid var(--border);
      padding: 14px 10px;
      border-radius: 9999px;
      backdrop-filter: blur(16px);
    }

    .fusion-social-icon {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, color 0.2s;
    }

    .fusion-social-icon:hover { color: #FFFFFF; transform: scale(1.15); }

    section {
      padding: 110px 48px 90px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }

    .fusion-section-head { text-align: center; margin-bottom: 54px; }
    .fusion-section-tag {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }

    .fusion-section-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #FFFFFF;
      background: linear-gradient(135deg, #FFFFFF 20%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* 01. Hero */
    .fusion-hero-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 48px;
      min-height: calc(100vh - 100px);
    }

    .fusion-hero-badge {
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

    .fusion-hero-name {
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    .fusion-hero-role {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
    }

    .fusion-hero-desc {
      font-size: 1.05rem;
      color: #94A3B8;
      max-width: 520px;
      margin-bottom: 34px;
      line-height: 1.7;
    }

    .fusion-hero-actions { display: flex; gap: 16px; }

    .fusion-btn-solid {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #041017;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-weight: 800;
      box-shadow: 0 8px 24px rgba(0, 242, 254, 0.4);
      transition: all 0.25s ease;
    }

    .fusion-btn-solid:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0, 242, 254, 0.6); }

    .fusion-btn-outline {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 12px;
      font-weight: 700;
      transition: all 0.25s ease;
    }

    .fusion-btn-outline:hover { background: rgba(0, 242, 254, 0.12); }

    /* 02. About */
    .fusion-about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .fusion-stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 28px;
    }

    .fusion-stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      text-align: center;
    }

    .fusion-stat-val {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .fusion-stat-lbl { font-size: 0.8rem; font-weight: 600; color: #94A3B8; }

    /* 03. Projects */
    .fusion-filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .fusion-filter-pill {
      background: var(--surface);
      border: 1px solid var(--border);
      color: #94A3B8;
      padding: 8px 20px;
      border-radius: 9999px;
      font-size: 0.84rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .fusion-filter-pill.active, .fusion-filter-pill:hover {
      background: var(--primary);
      color: #041017;
      border-color: var(--primary);
      box-shadow: 0 0 14px rgba(0, 242, 254, 0.4);
    }

    .fusion-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
    }

    .fusion-project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
    }

    .fusion-project-card:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 242, 254, 0.25);
    }

    .fusion-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
    }

    .fusion-icon-badge { font-size: 1.5rem; }

    .fusion-cat-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary);
      background: rgba(0, 242, 254, 0.15);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .fusion-project-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; color: #FFFFFF; }
    .fusion-project-desc { font-size: 0.9rem; color: #94A3B8; margin-bottom: 18px; flex: 1; line-height: 1.6; }
    .fusion-tech-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }

    .fusion-tech-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 3px 8px;
      border-radius: 6px;
      color: #E2E8F0;
    }

    .fusion-card-links { display: flex; gap: 12px; }

    .fusion-link-btn {
      flex: 1;
      text-align: center;
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s ease;
    }

    .fusion-link-btn.primary { background: var(--primary); color: #041017; }
    .fusion-link-btn.outline { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border); color: #FFFFFF; }

    /* 04. Skills */
    .fusion-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .fusion-skill-row { margin-bottom: 18px; }
    .fusion-skill-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: #FFFFFF;
    }

    .fusion-skill-pct { color: var(--primary); font-family: var(--font-mono); }

    .fusion-skill-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 9999px;
      overflow: hidden;
      border: 1px solid var(--border);
    }

    .fusion-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      border-radius: 9999px;
      box-shadow: 0 0 10px var(--primary);
    }

    /* 05. Experience */
    .fusion-timeline {
      position: relative;
      border-left: 2px solid var(--border);
      margin-left: 20px;
      padding-left: 32px;
    }

    .fusion-timeline-item { position: relative; margin-bottom: 36px; }
    .fusion-timeline-dot {
      position: absolute;
      left: -39px;
      top: 4px;
      width: 14px;
      height: 14px;
      background: var(--primary);
      border: 3px solid var(--bg);
      border-radius: 50%;
    }

    .fusion-timeline-period { font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: var(--primary); margin-bottom: 4px; }
    .fusion-timeline-role { font-size: 1.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 2px; }
    .fusion-timeline-company { font-size: 0.92rem; color: #94A3B8; margin-bottom: 8px; }
    .fusion-timeline-desc { font-size: 0.9rem; color: #CBD5E1; line-height: 1.6; }

    /* 06. Resume */
    .fusion-resume-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 36px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .fusion-resume-item { display: flex; gap: 16px; margin-bottom: 20px; }
    .fusion-resume-icon { font-size: 1.6rem; }
    .fusion-resume-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .fusion-resume-val { font-size: 1rem; font-weight: 600; color: #FFFFFF; }

    /* 08. Contact */
    .fusion-contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .fusion-contact-form {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 32px;
    }

    .fusion-input-group { margin-bottom: 16px; }
    .fusion-input-group label { display: block; font-size: 0.8rem; font-weight: 700; color: #94A3B8; margin-bottom: 6px; }

    .fusion-input, .fusion-textarea {
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

    .fusion-input:focus, .fusion-textarea:focus { outline: none; border-color: var(--primary); }

    #fusion-webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.8;
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
      .fusion-hero-grid, .fusion-about-grid, .fusion-skills-grid, .fusion-contact-grid, .fusion-resume-card {
        grid-template-columns: 1fr;
      }
      .fusion-nav-links { display: none; }
      .fusion-social-dock { display: none; }
      section { padding: 90px 20px 60px; }
    }

    @media (max-width: 640px) {
      .fusion-hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .fusion-btn-solid, .fusion-btn-outline {
        width: 100%;
        justify-content: center;
        min-height: 48px;
        display: inline-flex;
        align-items: center;
      }
      .fusion-projects-grid {
        grid-template-columns: 1fr;
      }
      section { padding: 80px 14px 40px; }
    }
  </style>
</head>
<body class="layout-root layout-bio-fusion">

  <div id="fusion-webgl-canvas"></div>

  <!-- Header -->
  <header class="fusion-nav-header">
    <a href="#home" class="fusion-monogram">${initials}</a>
    <ul class="fusion-nav-links">
      <li><a href="#home" class="fusion-nav-link active">Home</a></li>
      <li><a href="#about" class="fusion-nav-link">About</a></li>
      <li><a href="#projects" class="fusion-nav-link">Projects</a></li>
      <li><a href="#skills" class="fusion-nav-link">Skills</a></li>
      <li><a href="#experience" class="fusion-nav-link">Experience</a></li>
      <li><a href="#resume" class="fusion-nav-link">Resume</a></li>
      <li><a href="#blog" class="fusion-nav-link">Blog</a></li>
      <li><a href="#contact" class="fusion-nav-link">Contact</a></li>
    </ul>
    <a href="#contact" class="fusion-cta-btn">Let's Talk</a>
  </header>

  <!-- Left Social Dock -->
  ${Template3DVisuals.renderSocialDock({ github: safeGithub, linkedin: safeLinkedin, twitter: safeTwitter, email: safeEmail }, 'fusion')}

  <!-- 01. HOME HERO -->
  <section id="home">
    <div class="fusion-hero-grid">
      <div>
        <div class="fusion-hero-badge">
          <span>🌱 BIO-DIGITAL CIRCUIT SYNTHESIS</span>
        </div>
        <h1 class="fusion-hero-name">Hello, I'm <br><span style="color: var(--primary);">${safeName}</span></h1>
        <div class="fusion-hero-role">${safeRole}</div>
        <p class="fusion-hero-desc">${safeBio}</p>
        <div class="fusion-hero-actions">
          <a href="#projects" class="fusion-btn-solid">View My Work</a>
          <a href="#contact" class="fusion-btn-outline">Let's Talk</a>
        </div>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${Template3DVisuals.getBioDigitalFusionHeroArtwork(safeName)}
      </div>
    </div>
  </section>

  <!-- 02. ABOUT ME -->
  <section id="about">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">02. Telemetry Deck</span>
      <h2 class="fusion-section-title">About Me</h2>
    </div>
    <div class="fusion-about-grid">
      <div>
        <p style="font-size: 1.05rem; color: #94A3B8; line-height: 1.8;">${safeBio}</p>
        <div class="fusion-stats-grid">
          <div class="fusion-stat-card">
            <div class="fusion-stat-val">${data.metrics.yearsExp}+</div>
            <div class="fusion-stat-lbl">Years Experience</div>
          </div>
          <div class="fusion-stat-card">
            <div class="fusion-stat-val">${data.metrics.projectsCount}+</div>
            <div class="fusion-stat-lbl">Projects Built</div>
          </div>
          <div class="fusion-stat-card">
            <div class="fusion-stat-val">${data.metrics.skillsCount}+</div>
            <div class="fusion-stat-lbl">Technologies</div>
          </div>
          <div class="fusion-stat-card">
            <div class="fusion-stat-val">${data.metrics.certsCount}+</div>
            <div class="fusion-stat-lbl">Credentials &amp; Milestones</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🌲</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; margin-bottom: 8px;">Hybrid Circuit Telemetry</h3>
          <p style="font-size: 0.88rem; color: #94A3B8;">Sustainable compute and low-latency full stack engineering.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 03. PROJECTS -->
  <section id="projects">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">03. Selected Artifacts</span>
      <h2 class="fusion-section-title">My Projects</h2>
    </div>
    <div class="fusion-filters">
      <button type="button" class="fusion-filter-pill active" onclick="filterFusionProjects('all', this)">All</button>
      <button type="button" class="fusion-filter-pill" onclick="filterFusionProjects('Web Apps', this)">Web Apps</button>
      <button type="button" class="fusion-filter-pill" onclick="filterFusionProjects('AI/ML', this)">AI/ML</button>
      <button type="button" class="fusion-filter-pill" onclick="filterFusionProjects('Tools', this)">Tools</button>
      <button type="button" class="fusion-filter-pill" onclick="filterFusionProjects('Design', this)">Design</button>
    </div>
    <div class="fusion-projects-grid">
      ${projectCardsHtml}
    </div>
  </section>

  <!-- 04. SKILLS -->
  <section id="skills">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">04. Technical Constellation</span>
      <h2 class="fusion-section-title">My Skills</h2>
    </div>
    <div class="fusion-skills-grid">
      <div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px;">Core Capabilities</h3>
        ${skillBarsHtml}
      </div>
      <div style="text-align: center;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 36px;">
          <div style="font-size: 3.5rem; margin-bottom: 14px;">⚡</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${data.skills.map(s => `<span style="background: rgba(0,242,254,0.15); border: 1px solid var(--border); color: #FFFFFF; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 600;">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 05. EXPERIENCE -->
  <section id="experience">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">05. Career Milestones</span>
      <h2 class="fusion-section-title">Experience</h2>
    </div>
    <div class="fusion-timeline">
      ${expTimelineHtml}
    </div>
  </section>

  <!-- 06. RESUME -->
  <section id="resume">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">06. Credentials &amp; Education</span>
      <h2 class="fusion-section-title">My Resume</h2>
    </div>
    <div class="fusion-resume-card">
      <div>
        <div class="fusion-resume-item">
          <div class="fusion-resume-icon">🎓</div>
          <div>
            <div class="fusion-resume-label">Degree &amp; Institution</div>
            <div class="fusion-resume-val">${TemplateHelper.escapeHtml(eduPrimary.degree)} • ${TemplateHelper.escapeHtml(eduPrimary.institution)} ${eduPrimary.grade ? `• ${TemplateHelper.escapeHtml(eduPrimary.grade)}` : ''}</div>
          </div>
        </div>
        <div class="fusion-resume-item">
          <div class="fusion-resume-icon">🏆</div>
          <div>
            <div class="fusion-resume-label">Certifications</div>
            <div class="fusion-resume-val">${TemplateHelper.escapeHtml(certsDisplay)}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="fusion-resume-item">
          <div class="fusion-resume-icon">💼</div>
          <div>
            <div class="fusion-resume-label">Technical Breadth</div>
            <div class="fusion-resume-val">${data.metrics.yearsExp}+ Years in ${TemplateHelper.escapeHtml(data.skills.slice(0, 3).join(', '))}</div>
          </div>
        </div>
        <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
          <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="fusion-btn-solid">Download PDF ↓</a>
          <a href="${safeWebsite || safeGithub}" target="_blank" rel="noopener" class="fusion-btn-outline">View Online ↗</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 07. BLOG -->
  <section id="blog">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">07. Technical Insights</span>
      <h2 class="fusion-section-title">My Blog</h2>
    </div>
    <div class="fusion-projects-grid">
      ${blogCardsHtml}
    </div>
  </section>

  <!-- 08. CONTACT -->
  <section id="contact">
    <div class="fusion-section-head">
      <span class="fusion-section-tag">08. Transmission</span>
      <h2 class="fusion-section-title">Let's Connect</h2>
    </div>
    <div class="fusion-contact-grid">
      <div>
        <p style="font-size: 1.05rem; color: #94A3B8; margin-bottom: 24px;">Interested in building intelligent, scalable and sustainable digital solutions? Let's connect.</p>
        ${safeEmail ? `<div style="margin-bottom: 14px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: var(--primary); text-decoration: none;">${safeEmail}</a></div>` : ''}
        ${safePhone ? `<div style="margin-bottom: 14px;"><strong>Phone:</strong> <span style="color: #FFFFFF;">${safePhone}</span></div>` : ''}
        <div style="margin-bottom: 14px;"><strong>Location:</strong> <span style="color: #FFFFFF;">${safeLocation || 'Remote / Worldwide'}</span></div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0,242,254,0.15); border: 1px solid rgba(0,242,254,0.4); color: #00F2FE; padding: 6px 14px; border-radius: 9999px; font-size: 0.82rem; font-weight: 700;">
          <span style="width: 8px; height: 8px; background: #00F2FE; border-radius: 50%; box-shadow: 0 0 8px #00F2FE;"></span>
        </div>
      </div>
      <form class="fusion-contact-form" action="javascript:void(0);" onsubmit="event.preventDefault();">
        <div class="fusion-input-group">
          <label>Your Name</label>
          <input type="text" name="name" class="fusion-input" placeholder="Your Name" required>
        </div>
        <div class="fusion-input-group">
          <label>Your Email</label>
          <input type="email" name="email" class="fusion-input" placeholder="your.email@example.com" required>
        </div>
        <div class="fusion-input-group">
          <label>Message</label>
          <textarea name="message" class="fusion-textarea" rows="4" placeholder="Tell me about your project or opportunity..." required></textarea>
        </div>
        <button type="submit" class="fusion-btn-solid" style="width: 100%; border: none; cursor: pointer;">Send Transmission ➔</button>
      </form>
    </div>
  </section>

  <script>
    (function initFusionCanvas() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const container = document.getElementById('fusion-webgl-canvas');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 25;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const count = 700;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0x00F2FE, size: 0.4, transparent: true, opacity: 0.6 });
      const points = new THREE.Points(geom, mat);
      scene.add(points);

      function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.0012;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    function filterFusionProjects(cat, btn) {
      document.querySelectorAll('.fusion-filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const cards = document.querySelectorAll('.fusion-project-card');
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

module.exports = { BioDigitalFusionTemplate };

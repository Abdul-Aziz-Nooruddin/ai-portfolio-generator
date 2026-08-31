/**
 * Template 08: Pristine White Crystal (Claymorphic Warm Sand & Crystal Studio)
 * Authentic 1-to-1 recreation extracted from Documents/Desings/11.jpeg
 * Champagne Sand Studio, Frosted Glass, Coral Orange & Sky Cyan (#EDE7DD, #FFFFFF, #FF6B4A, #0EA5E9).
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const PristineWhiteCrystalTemplate = {
  id: 'pristine-white-crystal',
  name: 'Pristine White Crystal',
  description: 'Luxury warm sand claymorphic studio design with translucent crystal ribbon hero, isometric glass cube workstation, glowing skill cables, and frosted glass UI panels.',
  recommendedFor: ['Frontend Architect', 'Product Designer', 'Creative Technologist', 'Web Artisan', 'UI/UX Specialist'],

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

    // Dynamic Projects Grid with Non-Repeating 3D Artworks
    const assignedArtworks = new Set([
      '/assets/3d/pristine_crystal_ribbon_hero_3d.jpg',
      '/assets/3d/pristine_glass_cube_workstation_3d.jpg',
      '/assets/3d/developer_showcase_portfolio_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="pristine-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="pristine-card-thumb-wrap">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'pristine-white-crystal', idx, assignedArtworks, userSeed)}
        </div>
        <div class="pristine-card-body">
          <div class="pristine-card-meta-row">
            <span class="pristine-cat-badge">${TemplateHelper.escapeHtml(p.category)}</span>
          </div>
          <h3 class="pristine-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
          <p class="pristine-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
          <div class="pristine-tech-pills">
            ${p.tech.split(/[,•|]+/).map(t => `<span class="pristine-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
          </div>
          <div class="pristine-card-actions">
            ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="pristine-btn-live">Live Demo ↗</a>` : ''}
            ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="pristine-btn-git">GitHub ↗</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Dynamic Skills split into two boards
    const halfSkills = Math.ceil(data.skills.length / 2);
    const skillsCol1 = data.skills.slice(0, halfSkills);
    const skillsCol2 = data.skills.slice(halfSkills, halfSkills * 2);

    const renderSkillRow = (s, idx, offset = 0) => {
      const colors = ['#0EA5E9', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];
      const colColor = colors[(idx + offset) % colors.length];
      const pct = Math.max(75, 96 - ((idx + offset) * 3));
      return `
        <div class="pristine-skill-pill-chip">
          <div class="pristine-skill-chip-left">
            <span class="skill-dot-indicator" style="background: ${colColor}; box-shadow: 0 0 10px ${colColor};"></span>
            <span class="skill-name-text">${TemplateHelper.escapeHtml(s)}</span>
          </div>
          <div class="pristine-skill-meter-wrap">
            <div class="pristine-skill-meter-bar" style="width: ${pct}%; background: ${colColor};"></div>
          </div>
          <span class="skill-pct-badge">${pct}%</span>
        </div>
      `;
    };

    const skillsCol1Html = skillsCol1.map((s, idx) => renderSkillRow(s, idx, 0)).join('');
    const skillsCol2Html = skillsCol2.map((s, idx) => renderSkillRow(s, idx, 3)).join('');

    // Dynamic Experience Timeline
    const experienceHtml = data.experience.map((exp, idx) => `
      <div class="pristine-timeline-node">
        <div class="pristine-node-marker">
          <span class="marker-pulse-ring"></span>
          <span class="marker-dot"></span>
        </div>
        <div class="pristine-node-card">
          <div class="node-time-badge">${TemplateHelper.escapeHtml(exp.period || '2023 – Present')}</div>
          <h3 class="node-role-title">${TemplateHelper.escapeHtml(exp.role || 'Senior Software Engineer')}</h3>
          <div class="node-company-tag">${TemplateHelper.escapeHtml(exp.company || 'Technology Studio')}</div>
          <p class="node-desc-text">${TemplateHelper.escapeHtml(exp.desc || 'Architecting high-concurrency systems, WebGL rendering engines, and end-to-end full-stack architectures.')}</p>
        </div>
      </div>
    `).join('');

    const eduPrimary = data.education[0] || { degree: 'B.Tech in Computer Science & Engineering', institution: 'Engineering University' };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole}</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #EDE7DD;
      --bg-warm: #FAF6F0;
      --bg-studio: #E5DED2;
      --surface: #FFFFFF;
      --surface-glass: rgba(255, 255, 255, 0.82);
      --surface-elevated: rgba(255, 255, 255, 0.94);
      --border: rgba(215, 205, 192, 0.85);
      --border-strong: rgba(180, 165, 145, 0.5);
      --primary-coral: #FF6B4A;
      --primary-cyan: #0EA5E9;
      --primary-emerald: #10B981;
      --primary-indigo: #6366F1;
      --text-main: #1C1917;
      --text-muted: #645E56;
      --text-subtle: #8C8479;
      --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-editorial: 'Fraunces', Georgia, serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-sm: 10px;
      --radius-md: 18px;
      --radius-lg: 28px;
      --radius-pill: 9999px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 15px; }

    body {
      background: radial-gradient(circle at 50% 15%, #FAF6F0 0%, #EDE7DD 50%, #E2DBD0 100%);
      color: var(--text-main);
      font-family: var(--font-display);
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient Warm Studio Circuit Tracks */
    .studio-circuit-mesh {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image: 
        radial-gradient(circle at 20% 30%, rgba(255, 107, 74, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.08) 0%, transparent 40%),
        linear-gradient(rgba(180, 165, 145, 0.12) 1px, transparent 1px),
        linear-gradient(90deg, rgba(180, 165, 145, 0.12) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 64px 64px, 64px 64px;
    }

    /* Top Floating Glass Header */
    .pristine-top-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .pristine-header-pill {
      width: 100%;
      max-width: 1140px;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: var(--radius-pill);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(100, 90, 80, 0.08), 0 1px 3px rgba(0,0,0,0.02);
    }

    .pristine-monogram {
      font-weight: 900;
      font-size: 1.3rem;
      letter-spacing: -0.03em;
      color: #0F172A;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .pristine-monogram span {
      background: linear-gradient(135deg, #0EA5E9, #2563EB);
      color: #FFFFFF;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
    }

    .pristine-nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .pristine-nav-link {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }

    .pristine-nav-link:hover {
      color: var(--primary-coral);
    }

    .pristine-talk-btn {
      background: linear-gradient(135deg, #2DD4BF 0%, #0EA5E9 100%);
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 800;
      padding: 8px 22px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .pristine-talk-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(14, 165, 233, 0.45);
    }

    .pristine-container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 110px 24px 80px;
      position: relative;
      z-index: 1;
    }

    /* 01. HOME HERO */
    .pristine-hero-section {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 40px;
      align-items: center;
      min-height: 82vh;
      margin-bottom: 90px;
    }

    .hero-pretitle-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.9);
      padding: 6px 16px;
      border-radius: var(--radius-pill);
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--primary-coral);
      margin-bottom: 20px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }

    .pristine-hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.04;
      letter-spacing: -0.03em;
      color: #1C1917;
      margin-bottom: 12px;
    }

    .pristine-hero-role {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pristine-hero-role::after {
      content: '';
      width: 40px;
      height: 2px;
      background: var(--primary-coral);
      border-radius: 2px;
    }

    .pristine-hero-desc {
      font-size: 1.05rem;
      line-height: 1.65;
      color: var(--text-muted);
      max-width: 520px;
      margin-bottom: 32px;
    }

    .pristine-hero-cta-row {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .btn-coral-hero {
      background: linear-gradient(135deg, #FF6B4A 0%, #EA580C 100%);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 14px 32px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(255, 107, 74, 0.35);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-coral-hero:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(255, 107, 74, 0.5);
    }

    .btn-glass-hero {
      background: rgba(255, 255, 255, 0.9);
      color: #1C1917;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 14px 28px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
      transition: all 0.25s;
    }

    .btn-glass-hero:hover {
      background: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    }

    .hero-3d-visual-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .hero-3d-artwork-img {
      width: 100%;
      max-width: 480px;
      border-radius: 28px;
      box-shadow: 0 24px 60px rgba(100, 90, 80, 0.16);
      border: 2px solid rgba(255, 255, 255, 0.8);
      transition: transform 0.5s ease;
    }

    .hero-3d-artwork-img:hover {
      transform: scale(1.02) translateY(-4px);
    }

    /* Section Number & Heading Style */
    .pristine-section-header {
      text-align: center;
      margin: 80px 0 40px;
    }

    .section-num-tag {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--primary-coral);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .section-main-title {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 900;
      letter-spacing: -0.02em;
      color: #1C1917;
    }

    /* 02. ABOUT SECTION (Isometric Glass Cube + Metrics Grid) */
    .pristine-about-box {
      background: var(--surface-glass);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: var(--radius-lg);
      padding: 40px;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;
      box-shadow: 0 16px 40px rgba(100, 90, 80, 0.08);
      margin-bottom: 80px;
    }

    .about-bio-lead {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--text-muted);
      margin-bottom: 28px;
    }

    .about-metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }

    .metric-pill-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      transition: transform 0.2s;
    }

    .metric-pill-card:hover {
      transform: translateY(-3px);
      border-color: var(--primary-coral);
    }

    .metric-pill-val {
      font-size: 1.45rem;
      font-weight: 900;
      color: var(--primary-coral);
      margin-bottom: 2px;
      font-family: var(--font-mono);
    }

    .metric-pill-lbl {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-subtle);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .about-cube-img {
      width: 100%;
      max-width: 380px;
      border-radius: 20px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.08);
      border: 2px solid rgba(255, 255, 255, 0.9);
      display: block;
      margin: 0 auto;
    }

    /* 03. PROJECTS GRID */
    .pristine-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
      gap: 28px;
      margin-bottom: 80px;
    }

    .pristine-project-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(100, 90, 80, 0.06);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }

    .pristine-project-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 48px rgba(100, 90, 80, 0.12);
      border-color: rgba(14, 165, 233, 0.4);
    }

    .pristine-card-thumb-wrap {
      width: 100%;
      background: #060919;
    }

    .pristine-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .pristine-cat-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--primary-cyan);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }

    .pristine-project-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    .pristine-project-desc {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 16px;
      flex: 1;
    }

    .pristine-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .pristine-pill {
      background: #F1F5F9;
      color: #475569;
      font-size: 0.76rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
    }

    .pristine-card-actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
    }

    .pristine-btn-live {
      background: #0EA5E9;
      color: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition: background 0.2s;
    }

    .pristine-btn-live:hover {
      background: #0284C7;
    }

    .pristine-btn-git {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      color: #334155;
      font-size: 0.82rem;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition: background 0.2s;
    }

    .pristine-btn-git:hover {
      background: #E2E8F0;
    }

    /* 04. SKILLS SECTION (Dual Radial Cable Boards) */
    .pristine-skills-duo-board {
      background: var(--surface-glass);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: var(--radius-lg);
      padding: 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 36px;
      box-shadow: 0 16px 40px rgba(100, 90, 80, 0.08);
      margin-bottom: 80px;
    }

    .skills-col-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pristine-skill-pill-chip {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 12px 16px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }

    .pristine-skill-chip-left {
      width: 120px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.9rem;
      color: #1C1917;
    }

    .skill-dot-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .pristine-skill-meter-wrap {
      flex: 1;
      height: 8px;
      background: #E2E8F0;
      border-radius: var(--radius-pill);
      overflow: hidden;
    }

    .pristine-skill-meter-bar {
      height: 100%;
      border-radius: var(--radius-pill);
    }

    .skill-pct-badge {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 800;
      color: #475569;
    }

    /* 05. EXPERIENCE TIMELINE */
    .pristine-timeline-flow {
      position: relative;
      max-width: 860px;
      margin: 0 auto 80px;
      padding: 20px 0;
    }

    .pristine-timeline-flow::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 24px;
      width: 3px;
      background: linear-gradient(180deg, #FF6B4A 0%, #0EA5E9 100%);
      border-radius: 2px;
    }

    .pristine-timeline-node {
      position: relative;
      margin-bottom: 32px;
      padding-left: 64px;
    }

    .pristine-node-marker {
      position: absolute;
      left: 14px;
      top: 20px;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .marker-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #0EA5E9;
      border: 3px solid #FFFFFF;
      box-shadow: 0 0 12px #0EA5E9;
    }

    .pristine-node-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: 0 8px 24px rgba(100, 90, 80, 0.06);
    }

    .node-time-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--primary-coral);
      margin-bottom: 6px;
    }

    .node-role-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: #0F172A;
      margin-bottom: 4px;
    }

    .node-company-tag {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--primary-cyan);
      margin-bottom: 12px;
    }

    .node-desc-text {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* 06. RESUME SECTION */
    .pristine-resume-card {
      background: var(--surface-glass);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: var(--radius-lg);
      padding: 40px;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 40px;
      align-items: center;
      box-shadow: 0 16px 40px rgba(100, 90, 80, 0.08);
      margin-bottom: 80px;
    }

    .resume-3d-img {
      width: 100%;
      max-width: 360px;
      border-radius: 20px;
      box-shadow: 0 16px 36px rgba(0,0,0,0.08);
      border: 2px solid rgba(255, 255, 255, 0.9);
      display: block;
      margin: 0 auto;
    }

    /* 08. CONTACT CLIPBOARD */
    .pristine-contact-wrap {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 36px;
      margin-bottom: 80px;
    }

    .contact-info-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-detail-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }

    .contact-detail-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(14, 165, 233, 0.1);
      color: #0EA5E9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 800;
    }

    .contact-detail-title {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-subtle);
      text-transform: uppercase;
    }

    .contact-detail-val {
      font-size: 0.95rem;
      font-weight: 700;
      color: #0F172A;
    }

    .contact-clipboard-form {
      background: var(--surface-glass);
      border: 1.5px solid rgba(255, 255, 255, 0.9);
      border-radius: var(--radius-lg);
      padding: 36px;
      box-shadow: 0 16px 40px rgba(100, 90, 80, 0.08);
    }

    .form-input-field {
      width: 100%;
      background: #FFFFFF;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 0.92rem;
      font-family: inherit;
      color: #0F172A;
      margin-bottom: 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input-field:focus {
      outline: none;
      border-color: #0EA5E9;
      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.18);
    }

    .btn-send-message {
      width: 100%;
      background: linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 1rem;
      padding: 14px;
      border-radius: var(--radius-pill);
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35);
      transition: transform 0.2s;
    }

    .btn-send-message:hover {
      transform: translateY(-2px);
    }

    /* Footer */
    .pristine-footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid var(--border);
      font-size: 0.88rem;
      color: var(--text-subtle);
    }

    @media (max-width: 900px) {
      .pristine-hero-section,
      .pristine-about-box,
      .pristine-skills-duo-board,
      .pristine-resume-card,
      .pristine-contact-wrap {
        grid-template-columns: 1fr;
      }
      .pristine-nav-links { display: none; }
    }
  </style>
</head>
<body>
  <!-- Ambient Circuit Grid -->
  <div class="studio-circuit-mesh"></div>

  <!-- Header -->
  <header class="pristine-top-header">
    <div class="pristine-header-pill">
      <a href="#home" class="pristine-monogram">
        <span>${initials}</span>
        <div>${safeName.split(' ')[0] || 'Studio'}</div>
      </a>
      <nav class="pristine-nav-links">
        <a href="#home" class="pristine-nav-link">Home</a>
        <a href="#about" class="pristine-nav-link">About</a>
        <a href="#projects" class="pristine-nav-link">Projects</a>
        <a href="#skills" class="pristine-nav-link">Skills</a>
        <a href="#experience" class="pristine-nav-link">Experience</a>
        <a href="#resume" class="pristine-nav-link">Resume</a>
        <a href="#contact" class="pristine-nav-link">Contact</a>
      </nav>
      <a href="mailto:${safeEmail}" class="pristine-talk-btn">Let's Talk ↗</a>
    </div>
  </header>

  <div class="pristine-container">
    <!-- 01. HOME HERO -->
    <section id="home" class="pristine-hero-section">
      <div>
        <div class="hero-pretitle-tag">✨ Pristine White Crystal • 3D Creative Studio</div>
        <h1 class="pristine-hero-title">${safeName}</h1>
        <div class="pristine-hero-role">${safeRole}</div>
        <p class="pristine-hero-desc">${safeBio}</p>
        <div class="pristine-hero-cta-row">
          <a href="#projects" class="btn-coral-hero">Explore Work ➔</a>
          <a href="mailto:${safeEmail}" class="btn-glass-hero">Download CV ↗</a>
        </div>
      </div>
      <div class="hero-3d-visual-wrap">
        <img src="/assets/3d/pristine_crystal_ribbon_hero_3d.jpg" alt="${safeName} 3D Crystal Ribbon Hero" class="hero-3d-artwork-img" />
      </div>
    </section>

    <!-- 02. ABOUT SECTION -->
    <section id="about">
      <div class="pristine-section-header">
        <div class="section-num-tag">02. ABOUT</div>
        <h2 class="section-main-title">Design Philosophy & Metrics</h2>
      </div>
      <div class="pristine-about-box">
        <div>
          <p class="about-bio-lead">${safeBio}</p>
          <div class="about-metrics-grid">
            <div class="metric-pill-card">
              <div class="metric-pill-val">14+</div>
              <div class="metric-pill-lbl">Teams</div>
            </div>
            <div class="metric-pill-card">
              <div class="metric-pill-val">${Math.max(12, data.projects.length)}+</div>
              <div class="metric-pill-lbl">Projects</div>
            </div>
            <div class="metric-pill-card">
              <div class="metric-pill-val">25+</div>
              <div class="metric-pill-lbl">Freelance</div>
            </div>
            <div class="metric-pill-card">
              <div class="metric-pill-val">21+</div>
              <div class="metric-pill-lbl">Repos</div>
            </div>
            <div class="metric-pill-card">
              <div class="metric-pill-val">1+</div>
              <div class="metric-pill-lbl">Patents</div>
            </div>
            <div class="metric-pill-card">
              <div class="metric-pill-val">5+</div>
              <div class="metric-pill-lbl">Hackathons</div>
            </div>
          </div>
        </div>
        <div>
          <img src="/assets/3d/pristine_glass_cube_workstation_3d.jpg" alt="Glass Cube Studio Workstation" class="about-cube-img" />
        </div>
      </div>
    </section>

    <!-- 03. PROJECTS SECTION -->
    <section id="projects">
      <div class="pristine-section-header">
        <div class="section-num-tag">03. PROJECTS</div>
        <h2 class="section-main-title">Selected 3D Software Engineering</h2>
      </div>
      <div class="pristine-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS SECTION -->
    <section id="skills">
      <div class="pristine-section-header">
        <div class="section-num-tag">04. SKILLS</div>
        <h2 class="section-main-title">Neural Architecture & Code</h2>
      </div>
      <div class="pristine-skills-duo-board">
        <div>
          <div class="skills-col-title">⚡ Core Engineering & Languages</div>
          ${skillsCol1Html}
        </div>
        <div>
          <div class="skills-col-title">🌐 Systems, WebGL & AI</div>
          ${skillsCol2Html}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE SECTION -->
    <section id="experience">
      <div class="pristine-section-header">
        <div class="section-num-tag">05. EXPERIENCE</div>
        <h2 class="section-main-title">Professional Milestones</h2>
      </div>
      <div class="pristine-timeline-flow">
        ${experienceHtml}
      </div>
    </section>

    <!-- 06. RESUME SECTION -->
    <section id="resume">
      <div class="pristine-section-header">
        <div class="section-num-tag">06. RESUME</div>
        <h2 class="section-main-title">Credentials & Education</h2>
      </div>
      <div class="pristine-resume-card">
        <div>
          <img src="/assets/3d/developer_showcase_portfolio_3d.jpg" alt="Career Dossier" class="resume-3d-img" />
        </div>
        <div>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #0F172A; margin-bottom: 8px;">${safeName}</h3>
          <div style="font-size: 1.05rem; color: #0EA5E9; font-weight: 700; margin-bottom: 14px;">${safeRole}</div>

          <div style="margin-bottom: 14px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 6px;">Academic Credentials</div>
            ${data.education.map(edu => `
              <div style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 4px;">
                🎓 <strong>${TemplateHelper.escapeHtml(edu.degree)}</strong> • ${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `(${TemplateHelper.escapeHtml(edu.period)})` : ''}
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 18px;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 6px;">Verified Certifications</div>
            ${data.certifications.map(c => `
              <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">
                📜 <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Authority')}
              </div>
            `).join('')}
          </div>

          <a href="mailto:${safeEmail}" class="btn-coral-hero">Download Complete Resume ➔</a>
        </div>
      </div>
    </section>

    <!-- 08. CONTACT SECTION -->
    <section id="contact">
      <div class="pristine-section-header">
        <div class="section-num-tag">08. CONTACT</div>
        <h2 class="section-main-title">Let's Build Something Exceptional</h2>
      </div>
      <div class="pristine-contact-wrap">
        <div class="contact-info-panel">
          <div class="contact-detail-card">
            <div class="contact-detail-icon">✉️</div>
            <div>
              <div class="contact-detail-title">Direct Email</div>
              <div class="contact-detail-val">${safeEmail}</div>
            </div>
          </div>
          <div class="contact-detail-card">
            <div class="contact-detail-icon">🐙</div>
            <div>
              <div class="contact-detail-title">GitHub Profile</div>
              <div class="contact-detail-val">@${safeGithub.replace('https://github.com/', '') || 'developer'}</div>
            </div>
          </div>
          <div class="contact-detail-card">
            <div class="contact-detail-icon">💼</div>
            <div>
              <div class="contact-detail-title">LinkedIn</div>
              <div class="contact-detail-val">Connected</div>
            </div>
          </div>
        </div>
        <div class="contact-clipboard-form">
          <input type="text" placeholder="Your Name" class="form-input-field" />
          <input type="email" placeholder="Your Email Address" class="form-input-field" />
          <textarea rows="4" placeholder="How can I assist your team or project?" class="form-input-field" style="resize: vertical;"></textarea>
          <button type="button" class="btn-send-message" onclick="window.location.href='mailto:${safeEmail}'">Send Message ➔</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="pristine-footer">
      <div>Crafted with <strong>Pristine White Crystal Studio</strong> by ${safeName}. All rights reserved.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { PristineWhiteCrystalTemplate };

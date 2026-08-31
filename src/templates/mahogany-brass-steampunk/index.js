/**
 * Template 10: Mahogany Brass Steampunk (Dark Walnut Woodcraft & Curio Cabinet)
 * Rich Dark Walnut, Polished Brass & Amber Glow (#2B1B14, #1A0F0A, #C88A3E, #F59E0B).
 * Comprehensive Multi-Section Developer Portfolio Architecture.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const MahoganyBrassSteampunkTemplate = {
  id: 'mahogany-brass-steampunk',
  name: 'Mahogany Brass Steampunk',
  description: 'Rich dark walnut woodcraft with brass toggle switches, curio cabinet projects, astrolabe skills, career chronology timeline, academic background, verified certifications, and interactive brass contact console.',
  recommendedFor: ['Systems Architect', 'Hardware Engineer', 'Backend Specialist', 'Creative Technologist', 'Robotics Designer'],

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
    const safeTwitter = TemplateHelper.escapeHtml(data.twitter);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const assignedArtworks = new Set([
      '/assets/3d/crystal_leaf_hand_3d.jpg',
      '/assets/3d/holographic_resume_codex_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';

    // 01. Dynamic Project Cards
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="mahogany-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="mahogany-thumb-box">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'mahogany-brass-steampunk', idx, assignedArtworks, userSeed)}
        </div>
        <div class="mahogany-card-meta">
          <span class="mahogany-cat-tag">${TemplateHelper.escapeHtml(p.category || 'CHRONO')}</span>
          <span class="mahogany-proj-idx">CURIO // 0${idx + 1}</span>
        </div>
        <h3 class="mahogany-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="mahogany-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="mahogany-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="mahogany-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="mahogany-card-actions">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="mahogany-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="mahogany-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    // 02. Skills Meters
    const skillBarsHtml = data.skills.slice(0, 8).map((s, idx) => {
      const pct = Math.max(78, 96 - (idx * 2));
      return `
        <div class="mahogany-skill-row">
          <div class="mahogany-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span style="color: #F59E0B; font-weight: 800;">${pct}%</span>
          </div>
          <div class="mahogany-skill-track">
            <div class="mahogany-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 03. Experience Timeline
    const experienceTimelineHtml = data.experience.map(exp => `
      <div class="mahogany-timeline-item">
        <div class="mahogany-timeline-node">
          <div class="mahogany-gear-dot"></div>
        </div>
        <div class="mahogany-timeline-content">
          <div class="mahogany-timeline-header">
            <h4 class="mahogany-role-title">${TemplateHelper.escapeHtml(exp.role)}</h4>
            <span class="mahogany-period-badge">${TemplateHelper.escapeHtml(exp.period || '2023 – Present')}</span>
          </div>
          <div class="mahogany-company-name">⚙️ ${TemplateHelper.escapeHtml(exp.company || 'Engineering Guild')}</div>
          <p class="mahogany-exp-desc">${TemplateHelper.escapeHtml(exp.desc)}</p>
        </div>
      </div>
    `).join('');

    // 04. Education
    const educationCardsHtml = data.education.map(edu => `
      <div class="mahogany-edu-card">
        <div class="mahogany-edu-icon">🕰️</div>
        <div>
          <h4 class="mahogany-edu-degree">${TemplateHelper.escapeHtml(edu.degree)}</h4>
          <div class="mahogany-edu-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
          <div class="mahogany-edu-meta">
            ${edu.period ? `<span>📅 ${TemplateHelper.escapeHtml(edu.period)}</span>` : ''}
            ${edu.grade ? `<span class="mahogany-grade-pill">🏆 ${TemplateHelper.escapeHtml(edu.grade)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // 05. Certifications
    const certificationsHtml = data.certifications.map(c => `
      <div class="mahogany-cert-card">
        <div class="mahogany-cert-badge">BRASS GUILD SEAL</div>
        <h4 class="mahogany-cert-name">${TemplateHelper.escapeHtml(c.name)}</h4>
        <div class="mahogany-cert-issuer">Issued by: <strong>${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}</strong></div>
      </div>
    `).join('');

    // 06. Metrics
    const totalProjects = data.projects.length;
    const totalSkills = data.skills.length;
    const totalContribs = data.projects.length ? `${data.projects.length * 60 + 120}+` : '480+';

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole}</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #150C07;
      --surface: #24140D;
      --surface-alt: #2D1A11;
      --surface-glass: rgba(36, 20, 13, 0.9);
      --border: rgba(200, 138, 62, 0.35);
      --primary: #C88A3E;
      --amber: #F59E0B;
      --brass: #E6B15C;
      --text: #FDF8F5;
      --text-muted: #D9C3B0;
      --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
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
      position: relative;
    }

    .mahogany-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .mahogany-header-inner {
      width: 100%;
      max-width: 1160px;
      background: var(--surface-glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 12px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 12px 35px -10px rgba(0,0,0,0.8), 0 0 25px rgba(200, 138, 62, 0.15);
    }

    .mahogany-monogram {
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.04em;
      text-shadow: 0 0 15px rgba(200, 138, 62, 0.6);
    }

    .mahogany-nav {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .mahogany-nav-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .mahogany-nav-link:hover, .mahogany-nav-link.active {
      color: #ffffff;
      text-shadow: 0 0 10px var(--primary);
    }

    .mahogany-talk-btn {
      background: linear-gradient(135deg, var(--primary), var(--amber));
      color: #150C07;
      font-weight: 800;
      font-size: 0.88rem;
      padding: 8px 22px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(200, 138, 62, 0.4);
      transition: transform 0.2s ease;
    }

    .mahogany-talk-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(200, 138, 62, 0.6);
    }

    .mahogany-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1160px;
      margin: 0 auto;
      padding: 130px 24px 80px;
    }

    /* 01. HERO */
    .mahogany-hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
      min-height: 75vh;
      margin-bottom: 60px;
    }

    .mahogany-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(200, 138, 62, 0.12);
      border: 1px solid var(--primary);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba(200, 138, 62, 0.25);
    }

    .mahogany-title-gradient {
      font-size: clamp(2.5rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #ffffff 0%, var(--primary) 60%, var(--amber) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .mahogany-hero-desc {
      font-size: 1.08rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 32px;
    }

    .mahogany-hero-cta-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .mahogany-btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--amber));
      color: #150C07;
      font-weight: 800;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(200, 138, 62, 0.35);
      transition: transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .mahogany-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(200, 138, 62, 0.55);
    }

    .mahogany-btn-outline {
      background: rgba(200, 138, 62, 0.08);
      color: var(--primary);
      border: 1px solid var(--primary);
      font-weight: 700;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .mahogany-btn-outline:hover {
      background: rgba(200, 138, 62, 0.2);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .mahogany-social-links {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .mahogany-social-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 6px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .mahogany-social-pill:hover {
      color: #ffffff;
      border-color: var(--primary);
      background: rgba(200, 138, 62, 0.15);
    }

    /* 02. METRICS BAR */
    .mahogany-metrics-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      margin-bottom: 70px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    }

    .mahogany-metric-item {
      text-align: center;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 12px;
    }

    .mahogany-metric-item:last-child {
      border-right: none;
    }

    .mahogany-metric-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary);
      text-shadow: 0 0 20px rgba(200, 138, 62, 0.4);
      margin-bottom: 4px;
    }

    .mahogany-metric-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* SECTION HEADERS */
    .mahogany-section-header {
      text-align: center;
      margin: 80px 0 45px;
    }

    .mahogany-sec-pill {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
      background: rgba(200, 138, 62, 0.1);
      border: 1px solid rgba(200, 138, 62, 0.3);
      padding: 4px 14px;
      border-radius: 9999px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .mahogany-section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .mahogany-section-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* 03. PROJECTS GRID */
    .mahogany-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
    }

    .mahogany-project-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .mahogany-project-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 16px 40px rgba(200, 138, 62, 0.25);
    }

    .mahogany-thumb-box {
      width: 100%;
      height: 190px;
      margin-bottom: 18px;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(200, 138, 62, 0.35);
      background: #000000;
    }

    .mahogany-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .mahogany-cat-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--amber);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .mahogany-proj-idx {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .mahogany-project-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 10px;
    }

    .mahogany-project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 18px;
      flex-grow: 1;
    }

    .mahogany-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .mahogany-tech-pill {
      background: rgba(200, 138, 62, 0.1);
      border: 1px solid rgba(200, 138, 62, 0.25);
      border-radius: 9999px;
      padding: 4px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--primary);
    }

    .mahogany-card-actions {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .mahogany-link-btn {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .mahogany-link-btn.primary {
      background: var(--primary);
      color: #150C07;
    }

    .mahogany-link-btn.primary:hover {
      background: #ffffff;
      transform: translateY(-2px);
    }

    .mahogany-link-btn.outline {
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .mahogany-link-btn.outline:hover {
      border-color: var(--primary);
      color: #ffffff;
    }

    /* 04. SKILLS */
    .mahogany-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
    }

    .mahogany-skill-row {
      margin-bottom: 20px;
    }

    .mahogany-skill-label {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 8px;
    }

    .mahogany-skill-track {
      height: 8px;
      background: rgba(255,255,255,0.06);
      border-radius: 9999px;
      overflow: hidden;
    }

    .mahogany-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--amber));
      border-radius: 9999px;
      box-shadow: 0 0 12px rgba(200, 138, 62, 0.5);
    }

    /* 05. EXPERIENCE TIMELINE */
    .mahogany-timeline-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .mahogany-timeline-item {
      display: flex;
      gap: 20px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 26px;
      transition: all 0.25s;
    }

    .mahogany-timeline-item:hover {
      border-color: var(--primary);
      box-shadow: 0 12px 30px rgba(200, 138, 62, 0.2);
    }

    .mahogany-timeline-node {
      margin-top: 6px;
      flex-shrink: 0;
    }

    .mahogany-gear-dot {
      width: 14px;
      height: 14px;
      background: var(--primary);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--primary);
    }

    .mahogany-timeline-content {
      flex: 1;
    }

    .mahogany-timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .mahogany-role-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
    }

    .mahogany-period-badge {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--primary);
      background: rgba(200, 138, 62, 0.12);
      border: 1px solid rgba(200, 138, 62, 0.3);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .mahogany-company-name {
      font-size: 0.95rem;
      color: var(--amber);
      font-weight: 600;
      margin-bottom: 12px;
    }

    .mahogany-exp-desc {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* 06. EDUCATION & CERTS */
    .mahogany-two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .mahogany-edu-card, .mahogany-cert-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 18px;
      transition: all 0.25s;
    }

    .mahogany-edu-card {
      display: flex;
      gap: 18px;
      align-items: flex-start;
    }

    .mahogany-edu-icon {
      font-size: 1.8rem;
      background: rgba(200, 138, 62, 0.12);
      padding: 10px;
      border-radius: 12px;
    }

    .mahogany-edu-degree {
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .mahogany-edu-inst {
      font-size: 0.95rem;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .mahogany-edu-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .mahogany-grade-pill {
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: var(--amber);
      padding: 2px 8px;
      border-radius: 6px;
    }

    .mahogany-cert-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      color: #10B981;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 2px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .mahogany-cert-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .mahogany-cert-issuer {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* 07. NARRATIVE DOSSIER */
    .mahogany-resume-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 36px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
      margin-top: 50px;
    }

    /* 08. CONTACT SECTION */
    .mahogany-contact-deck {
      background: linear-gradient(135deg, var(--surface) 0%, var(--surface-alt) 100%);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 50px;
      text-align: center;
      margin-top: 80px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .mahogany-footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .mahogany-hero, .mahogany-skills-grid, .mahogany-two-col-grid, .mahogany-resume-grid {
        grid-template-columns: 1fr;
      }
      .mahogany-nav { display: none; }
      .mahogany-contact-deck { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <header class="mahogany-header">
    <div class="mahogany-header-inner">
      <a href="#home" class="mahogany-monogram">${initials}</a>
      <nav class="mahogany-nav">
        <a href="#home" class="mahogany-nav-link active">Home</a>
        <a href="#projects" class="mahogany-nav-link">Projects</a>
        <a href="#skills" class="mahogany-nav-link">Skills</a>
        <a href="#experience" class="mahogany-nav-link">Experience</a>
        <a href="#education" class="mahogany-nav-link">Education</a>
        <a href="#contact" class="mahogany-nav-link">Contact</a>
      </nav>
      <a href="mailto:${safeEmail}" class="mahogany-talk-btn">Let's Talk ↗</a>
    </div>
  </header>

  <div class="mahogany-container">
    <!-- 01. HERO -->
    <section id="home" class="mahogany-hero">
      <div>
        <div class="mahogany-badge">🕰️ Mahogany Brass Steampunk • Available for Hire</div>
        <h1 class="mahogany-title-gradient">${safeName}</h1>
        <h2 style="font-size: 1.45rem; color: var(--primary); margin-bottom: 16px; font-weight: 700;">${safeRole}</h2>
        <p class="mahogany-hero-desc">${safeBio}</p>
        
        <div class="mahogany-hero-cta-row">
          <a href="#projects" class="mahogany-btn-primary">Explore Curios ➔</a>
          <a href="mailto:${safeEmail}" class="mahogany-btn-outline">Initiate Contact ↗</a>
        </div>

        <div class="mahogany-social-links">
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="mahogany-social-pill">GitHub ↗</a>` : ''}
          ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="mahogany-social-pill">LinkedIn ↗</a>` : ''}
          ${safeTwitter ? `<a href="${safeTwitter}" target="_blank" rel="noopener" class="mahogany-social-pill">Twitter/X ↗</a>` : ''}
          ${safeWebsite ? `<a href="${safeWebsite}" target="_blank" rel="noopener" class="mahogany-social-pill">Website ↗</a>` : ''}
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="${safeName} 3D Steampunk Craft" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 28px; border: 2.5px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.85);" />
      </div>
    </section>

    <!-- 02. KEY TELEMETRY METRICS BAR -->
    <section class="mahogany-metrics-bar">
      <div class="mahogany-metric-item">
        <div class="mahogany-metric-val">${totalProjects}</div>
        <div class="mahogany-metric-label">Curio Deployments</div>
      </div>
      <div class="mahogany-metric-item">
        <div class="mahogany-metric-val">${totalSkills}</div>
        <div class="mahogany-metric-label">Mastered Toolchains</div>
      </div>
      <div class="mahogany-metric-item">
        <div class="mahogany-metric-val">${totalContribs}</div>
        <div class="mahogany-metric-label">Code Contributions</div>
      </div>
      <div class="mahogany-metric-item">
        <div class="mahogany-metric-val">100%</div>
        <div class="mahogany-metric-label">Mechanism Reliability</div>
      </div>
    </section>

    <!-- 03. PROJECTS -->
    <section id="projects">
      <div class="mahogany-section-header">
        <span class="mahogany-sec-pill">Handcrafted Curios</span>
        <h2 class="mahogany-section-title">Engineered Deployments</h2>
        <p class="mahogany-section-subtitle">Real-world applications, distributed protocols, and production systems engineered with modern technologies.</p>
      </div>
      <div class="mahogany-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS -->
    <section id="skills">
      <div class="mahogany-section-header">
        <span class="mahogany-sec-pill">Astrolabe Matrix</span>
        <h2 class="mahogany-section-title">Technical Expertise</h2>
        <p class="mahogany-section-subtitle">Core proficiencies spanning architecture, full-stack development, and cloud computing.</p>
      </div>
      <div class="mahogany-skills-grid">
        <div>
          <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #ffffff;">Full-Stack & Systems Architecture</h3>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">Specialized in developing resilient software systems, predictive machine learning pipelines, and cloud-native microservices with scalable performance.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.skills.map(s => `<span class="mahogany-tech-pill">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
        <div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE TIMELINE -->
    <section id="experience">
      <div class="mahogany-section-header">
        <span class="mahogany-sec-pill">Chronology</span>
        <h2 class="mahogany-section-title">Career Milestones</h2>
        <p class="mahogany-section-subtitle">Professional engineering trajectory, industry experience, and technical leadership.</p>
      </div>
      <div class="mahogany-timeline-container">
        ${experienceTimelineHtml}
      </div>
    </section>

    <!-- 06. EDUCATION & CERTIFICATIONS -->
    <section id="education">
      <div class="mahogany-section-header">
        <span class="mahogany-sec-pill">Credentials</span>
        <h2 class="mahogany-section-title">Academic & Professional Credentials</h2>
      </div>
      <div class="mahogany-two-col-grid">
        <div>
          <h3 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            <span>🎓</span> Academic Background
          </h3>
          ${educationCardsHtml}
        </div>
        <div>
          <h3 style="font-size: 1.35rem; color: #ffffff; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            <span>📜</span> Verified Certifications
          </h3>
          ${certificationsHtml}
        </div>
      </div>
    </section>

    <!-- 07. NARRATIVE DOSSIER -->
    <section class="mahogany-resume-grid" id="resume">
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/holographic_resume_codex_3d.jpg" alt="Resume Hologram" style="width: 100%; max-width: 340px; border-radius: 20px; border: 2px solid var(--border); box-shadow: 0 16px 40px rgba(0,0,0,0.8);" />
      </div>
      <div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 12px;">${safeName}</h3>
        <div style="font-size: 1.1rem; color: var(--primary); font-weight: 700; margin-bottom: 16px;">${safeRole} • ${safeLocation}</div>
        <p style="color: var(--text-muted); line-height: 1.65; margin-bottom: 24px;">Comprehensive technical documentation detailing end-to-end software engineering architectures, algorithmic implementations, and full-stack milestones.</p>
        <a href="mailto:${safeEmail}" class="mahogany-btn-primary">Download Complete Dossier ➔</a>
      </div>
    </section>

    <!-- 08. CONTACT SECTION -->
    <section id="contact" class="mahogany-contact-deck">
      <span class="mahogany-sec-pill">Initialize Connection</span>
      <h2 style="font-size: 2.2rem; font-weight: 900; color: #ffffff; margin-bottom: 14px;">Let's Build Something Exceptional</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
        Interested in collaborating, recruiting, or engineering cutting-edge software? Reach out directly.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="mailto:${safeEmail}" class="mahogany-btn-primary">📧 ${safeEmail}</a>
        ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="mahogany-btn-outline">GitHub ↗</a>` : ''}
        ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="mahogany-btn-outline">LinkedIn ↗</a>` : ''}
      </div>
    </section>

    <footer class="mahogany-footer">
      <div>© ${new Date().getFullYear()} ${safeName} • Built with Mahogany Brass Steampunk Engine.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { MahoganyBrassSteampunkTemplate };

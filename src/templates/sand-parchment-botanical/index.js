/**
 * Template 12: Sand Parchment Botanical (Eco-Parchment & Forest Timber)
 * Warm Sand, Ivory Cream, Pine Timber & Terracotta (#FBF6EE, #1E392A, #8C5338, #D97706).
 * Comprehensive Multi-Section Developer Portfolio Architecture.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const SandParchmentBotanicalTemplate = {
  id: 'sand-parchment-botanical',
  name: 'Sand Parchment Botanical',
  description: 'Warm sand parchment and pine timber woodcraft design with carved botanical tree rings, telemetry metrics, career timeline, academic credentials, verified certifications, and interactive contact console.',
  recommendedFor: ['Full Stack Engineer', 'Creative Developer', 'Environmental Tech', 'UI/UX Specialist', 'Architect'],

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
      <div class="parchment-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="parchment-thumb-box">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'sand-parchment-botanical', idx, assignedArtworks, userSeed)}
        </div>
        <div class="parchment-card-meta">
          <span class="parchment-cat-tag">${TemplateHelper.escapeHtml(p.category || 'BOTANICAL')}</span>
          <span class="parchment-proj-idx">SPECIMEN // 0${idx + 1}</span>
        </div>
        <h3 class="parchment-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="parchment-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="parchment-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="parchment-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="parchment-card-actions">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="parchment-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="parchment-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    // 02. Skills Meters
    const skillBarsHtml = data.skills.slice(0, 8).map((s, idx) => {
      const pct = Math.max(78, 96 - (idx * 2));
      return `
        <div class="parchment-skill-row">
          <div class="parchment-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span style="color: #8C5338; font-weight: 800;">${pct}%</span>
          </div>
          <div class="parchment-skill-track">
            <div class="parchment-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 03. Experience Timeline
    const experienceTimelineHtml = data.experience.map((exp, idx) => `
      <div class="parchment-timeline-item">
        <div class="parchment-timeline-node">
          <div class="parchment-ring-dot"></div>
        </div>
        <div class="parchment-timeline-content">
          <div class="parchment-timeline-header">
            <h4 class="parchment-role-title">${TemplateHelper.escapeHtml(exp.role)}</h4>
            <span class="parchment-period-badge">${TemplateHelper.escapeHtml(exp.period || '2023 – Present')}</span>
          </div>
          <div class="parchment-company-name">🌲 ${TemplateHelper.escapeHtml(exp.company || 'Engineering Practice')}</div>
          <p class="parchment-exp-desc">${TemplateHelper.escapeHtml(exp.desc)}</p>
        </div>
      </div>
    `).join('');

    // 04. Education
    const educationCardsHtml = data.education.map(edu => `
      <div class="parchment-edu-card">
        <div class="parchment-edu-icon">📜</div>
        <div>
          <h4 class="parchment-edu-degree">${TemplateHelper.escapeHtml(edu.degree)}</h4>
          <div class="parchment-edu-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
          <div class="parchment-edu-meta">
            ${edu.period ? `<span>📅 ${TemplateHelper.escapeHtml(edu.period)}</span>` : ''}
            ${edu.grade ? `<span class="parchment-grade-pill">🏆 ${TemplateHelper.escapeHtml(edu.grade)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // 05. Certifications
    const certificationsHtml = data.certifications.map(c => `
      <div class="parchment-cert-card">
        <div class="parchment-cert-badge">VERIFIED CODEX</div>
        <h4 class="parchment-cert-name">${TemplateHelper.escapeHtml(c.name)}</h4>
        <div class="parchment-cert-issuer">Issued by: <strong>${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}</strong></div>
      </div>
    `).join('');

    // 06. Metrics
    const totalProjects = data.projects.length;
    const totalSkills = data.skills.length;
    const totalContribs = data.projects.length ? `${data.projects.length * 60 + 120}+` : '480+';

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="light">
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
      --bg: #FBF7F0;
      --surface: #FFFFFF;
      --surface-alt: #F4ECE1;
      --surface-glass: rgba(251, 247, 240, 0.92);
      --border: rgba(140, 83, 56, 0.25);
      --primary: #1E392A;
      --terracotta: #8C5338;
      --amber: #D97706;
      --text: #1E2922;
      --text-muted: #5A6D63;
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

    .parchment-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .parchment-header-inner {
      width: 100%;
      max-width: 1160px;
      background: var(--surface-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: 9999px;
      padding: 12px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 10px 30px rgba(140, 83, 56, 0.08);
    }

    .parchment-monogram {
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.04em;
    }

    .parchment-nav {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .parchment-nav-link {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .parchment-nav-link:hover, .parchment-nav-link.active {
      color: var(--primary);
    }

    .parchment-talk-btn {
      background: var(--primary);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.88rem;
      padding: 8px 22px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(30, 57, 42, 0.25);
      transition: transform 0.2s ease;
    }

    .parchment-talk-btn:hover {
      transform: translateY(-2px);
      background: #14281D;
    }

    .parchment-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1160px;
      margin: 0 auto;
      padding: 130px 24px 80px;
    }

    /* 01. HERO */
    .parchment-hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
      min-height: 75vh;
      margin-bottom: 60px;
    }

    .parchment-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(140, 83, 56, 0.1);
      border: 1px solid rgba(140, 83, 56, 0.3);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--terracotta);
      margin-bottom: 20px;
    }

    .parchment-title {
      font-size: clamp(2.5rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      color: var(--primary);
    }

    .parchment-hero-desc {
      font-size: 1.08rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 32px;
    }

    .parchment-hero-cta-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .parchment-btn-primary {
      background: var(--primary);
      color: #FFFFFF;
      font-weight: 800;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(30, 57, 42, 0.2);
      transition: transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .parchment-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(30, 57, 42, 0.3);
    }

    .parchment-btn-outline {
      background: rgba(30, 57, 42, 0.06);
      color: var(--primary);
      border: 1.5px solid var(--primary);
      font-weight: 700;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .parchment-btn-outline:hover {
      background: var(--primary);
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    .parchment-social-links {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .parchment-social-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--primary);
      background: rgba(140, 83, 56, 0.08);
      border: 1px solid rgba(140, 83, 56, 0.2);
      padding: 6px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .parchment-social-pill:hover {
      background: var(--primary);
      color: #FFFFFF;
    }

    /* 02. METRICS BAR */
    .parchment-metrics-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 28px;
      margin-bottom: 70px;
      box-shadow: 0 10px 30px rgba(140, 83, 56, 0.06);
    }

    .parchment-metric-item {
      text-align: center;
      border-right: 1px solid rgba(140, 83, 56, 0.15);
      padding: 0 12px;
    }

    .parchment-metric-item:last-child {
      border-right: none;
    }

    .parchment-metric-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .parchment-metric-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--terracotta);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* SECTION HEADERS */
    .parchment-section-header {
      text-align: center;
      margin: 80px 0 45px;
    }

    .parchment-sec-pill {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--terracotta);
      background: rgba(140, 83, 56, 0.1);
      border: 1px solid rgba(140, 83, 56, 0.25);
      padding: 4px 14px;
      border-radius: 9999px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .parchment-section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 900;
      color: var(--primary);
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .parchment-section-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* 03. PROJECTS GRID */
    .parchment-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
    }

    .parchment-project-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .parchment-project-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 16px 40px rgba(140, 83, 56, 0.14);
    }

    .parchment-thumb-box {
      width: 100%;
      height: 190px;
      margin-bottom: 18px;
      border-radius: 14px;
      overflow: hidden;
      border: 1.5px solid rgba(140, 83, 56, 0.3);
      background: #EFE6D9;
    }

    .parchment-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .parchment-cat-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--terracotta);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .parchment-proj-idx {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .parchment-project-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 10px;
    }

    .parchment-project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 18px;
      flex-grow: 1;
    }

    .parchment-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .parchment-tech-pill {
      background: rgba(30, 57, 42, 0.08);
      border: 1px solid rgba(30, 57, 42, 0.2);
      border-radius: 9999px;
      padding: 4px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--primary);
    }

    .parchment-card-actions {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .parchment-link-btn {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .parchment-link-btn.primary {
      background: var(--primary);
      color: #FFFFFF;
    }

    .parchment-link-btn.primary:hover {
      background: #14281D;
      transform: translateY(-2px);
    }

    .parchment-link-btn.outline {
      border: 1.5px solid var(--border);
      color: var(--text-muted);
    }

    .parchment-link-btn.outline:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    /* 04. SKILLS */
    .parchment-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
      box-shadow: 0 10px 30px rgba(140, 83, 56, 0.06);
    }

    .parchment-skill-row {
      margin-bottom: 20px;
    }

    .parchment-skill-label {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 8px;
    }

    .parchment-skill-track {
      height: 8px;
      background: rgba(140, 83, 56, 0.12);
      border-radius: 9999px;
      overflow: hidden;
    }

    .parchment-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--terracotta));
      border-radius: 9999px;
    }

    /* 05. EXPERIENCE TIMELINE */
    .parchment-timeline-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .parchment-timeline-item {
      display: flex;
      gap: 20px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 26px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
      transition: all 0.25s;
    }

    .parchment-timeline-item:hover {
      border-color: var(--primary);
      box-shadow: 0 12px 30px rgba(140, 83, 56, 0.12);
    }

    .parchment-timeline-node {
      margin-top: 6px;
      flex-shrink: 0;
    }

    .parchment-ring-dot {
      width: 14px;
      height: 14px;
      background: var(--terracotta);
      border-radius: 50%;
    }

    .parchment-timeline-content {
      flex: 1;
    }

    .parchment-timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .parchment-role-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--primary);
    }

    .parchment-period-badge {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--terracotta);
      background: rgba(140, 83, 56, 0.1);
      border: 1px solid rgba(140, 83, 56, 0.25);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .parchment-company-name {
      font-size: 0.95rem;
      color: var(--terracotta);
      font-weight: 600;
      margin-bottom: 12px;
    }

    .parchment-exp-desc {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* 06. EDUCATION & CERTS */
    .parchment-two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .parchment-edu-card, .parchment-cert-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 18px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
      transition: all 0.25s;
    }

    .parchment-edu-card {
      display: flex;
      gap: 18px;
      align-items: flex-start;
    }

    .parchment-edu-icon {
      font-size: 1.8rem;
      background: rgba(140, 83, 56, 0.1);
      padding: 10px;
      border-radius: 12px;
    }

    .parchment-edu-degree {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .parchment-edu-inst {
      font-size: 0.95rem;
      color: var(--terracotta);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .parchment-edu-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .parchment-grade-pill {
      background: rgba(30, 57, 42, 0.08);
      border: 1px solid rgba(30, 57, 42, 0.2);
      color: var(--primary);
      padding: 2px 8px;
      border-radius: 6px;
    }

    .parchment-cert-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      color: var(--primary);
      background: rgba(30, 57, 42, 0.1);
      border: 1px solid rgba(30, 57, 42, 0.25);
      padding: 2px 8px;
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .parchment-cert-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .parchment-cert-issuer {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* 07. NARRATIVE DOSSIER */
    .parchment-resume-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 36px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
      margin-top: 50px;
      box-shadow: 0 10px 30px rgba(140, 83, 56, 0.06);
    }

    /* 08. CONTACT */
    .parchment-contact-deck {
      background: var(--surface-alt);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 50px;
      text-align: center;
      margin-top: 80px;
      box-shadow: 0 16px 40px rgba(140, 83, 56, 0.08);
    }

    .parchment-footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid rgba(140, 83, 56, 0.15);
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .parchment-hero, .parchment-skills-grid, .parchment-two-col-grid, .parchment-resume-grid {
        grid-template-columns: 1fr;
      }
      .parchment-nav { display: none; }
      .parchment-contact-deck { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <header class="parchment-header">
    <div class="parchment-header-inner">
      <a href="#home" class="parchment-monogram">${initials}</a>
      <nav class="parchment-nav">
        <a href="#home" class="parchment-nav-link active">Home</a>
        <a href="#projects" class="parchment-nav-link">Projects</a>
        <a href="#skills" class="parchment-nav-link">Skills</a>
        <a href="#experience" class="parchment-nav-link">Experience</a>
        <a href="#education" class="parchment-nav-link">Education</a>
        <a href="#contact" class="parchment-nav-link">Contact</a>
      </nav>
      <a href="mailto:${safeEmail}" class="parchment-talk-btn">Let's Talk ↗</a>
    </div>
  </header>

  <div class="parchment-container">
    <!-- 01. HERO -->
    <section id="home" class="parchment-hero">
      <div>
        <div class="parchment-badge">📜 Botanical Timber Sanctuary • Available for Hire</div>
        <h1 class="parchment-title">${safeName}</h1>
        <h2 style="font-size: 1.45rem; color: var(--terracotta); margin-bottom: 16px; font-weight: 700;">${safeRole}</h2>
        <p class="parchment-hero-desc">${safeBio}</p>
        
        <div class="parchment-hero-cta-row">
          <a href="#projects" class="parchment-btn-primary">Explore Artifacts ➔</a>
          <a href="mailto:${safeEmail}" class="parchment-btn-outline">Initiate Contact ↗</a>
        </div>

        <div class="parchment-social-links">
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="parchment-social-pill">GitHub ↗</a>` : ''}
          ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="parchment-social-pill">LinkedIn ↗</a>` : ''}
          ${safeTwitter ? `<a href="${safeTwitter}" target="_blank" rel="noopener" class="parchment-social-pill">Twitter/X ↗</a>` : ''}
          ${safeWebsite ? `<a href="${safeWebsite}" target="_blank" rel="noopener" class="parchment-social-pill">Website ↗</a>` : ''}
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="${safeName} 3D Botanical Sanctuary" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 28px; border: 2.5px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.15);" />
      </div>
    </section>

    <!-- 02. KEY TELEMETRY METRICS BAR -->
    <section class="parchment-metrics-bar">
      <div class="parchment-metric-item">
        <div class="parchment-metric-val">${totalProjects}</div>
        <div class="parchment-metric-label">Engineered Artifacts</div>
      </div>
      <div class="parchment-metric-item">
        <div class="parchment-metric-val">${totalSkills}</div>
        <div class="parchment-metric-label">Mastered Stacks</div>
      </div>
      <div class="parchment-metric-item">
        <div class="parchment-metric-val">${totalContribs}</div>
        <div class="parchment-metric-label">Code Contributions</div>
      </div>
      <div class="parchment-metric-item">
        <div class="parchment-metric-val">100%</div>
        <div class="parchment-metric-label">Reliability Index</div>
      </div>
    </section>

    <!-- 03. PROJECTS -->
    <section id="projects">
      <div class="parchment-section-header">
        <span class="parchment-sec-pill">Handcrafted Deployments</span>
        <h2 class="parchment-section-title">Engineered Artifacts</h2>
        <p class="parchment-section-subtitle">Production applications, distributed software, and algorithmic implementations.</p>
      </div>
      <div class="parchment-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS -->
    <section id="skills">
      <div class="parchment-section-header">
        <span class="parchment-sec-pill">Timber Matrix</span>
        <h2 class="parchment-section-title">Technical Expertise</h2>
        <p class="parchment-section-subtitle">Core proficiencies across software architecture, systems engineering, and full-stack development.</p>
      </div>
      <div class="parchment-skills-grid">
        <div>
          <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--primary);">Crafted Systems & Toolchains</h3>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">Specialized in developing resilient software systems, predictive machine learning pipelines, and cloud-native microservices with scalable performance.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.skills.map(s => `<span class="parchment-tech-pill">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
        <div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE TIMELINE -->
    <section id="experience">
      <div class="parchment-section-header">
        <span class="parchment-sec-pill">Chronicle</span>
        <h2 class="parchment-section-title">Career Milestones</h2>
        <p class="parchment-section-subtitle">Professional engineering trajectory, industry experience, and technical leadership.</p>
      </div>
      <div class="parchment-timeline-container">
        ${experienceTimelineHtml}
      </div>
    </section>

    <!-- 06. EDUCATION & CERTIFICATIONS -->
    <section id="education">
      <div class="parchment-section-header">
        <span class="parchment-sec-pill">Codex Credentials</span>
        <h2 class="parchment-section-title">Academic & Professional Credentials</h2>
      </div>
      <div class="parchment-two-col-grid">
        <div>
          <h3 style="font-size: 1.35rem; color: var(--primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            <span>🎓</span> Academic Background
          </h3>
          ${educationCardsHtml}
        </div>
        <div>
          <h3 style="font-size: 1.35rem; color: var(--primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
            <span>📜</span> Verified Certifications
          </h3>
          ${certificationsHtml}
        </div>
      </div>
    </section>

    <!-- 07. NARRATIVE DOSSIER -->
    <section class="parchment-resume-grid" id="resume">
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/holographic_resume_codex_3d.jpg" alt="Resume Dossier" style="width: 100%; max-width: 340px; border-radius: 20px; border: 1.5px solid var(--border); box-shadow: 0 16px 36px rgba(0,0,0,0.1);" />
      </div>
      <div>
        <h3 style="font-size: 1.8rem; color: var(--primary); margin-bottom: 12px;">${safeName}</h3>
        <div style="font-size: 1.1rem; color: var(--terracotta); font-weight: 700; margin-bottom: 16px;">${safeRole} • ${safeLocation}</div>
        <p style="color: var(--text-muted); line-height: 1.65; margin-bottom: 24px;">Comprehensive technical documentation detailing end-to-end software engineering architectures, algorithmic implementations, and full-stack milestones.</p>
        <a href="mailto:${safeEmail}" class="parchment-btn-primary">Download Complete Dossier ➔</a>
      </div>
    </section>

    <!-- 08. CONTACT -->
    <section id="contact" class="parchment-contact-deck">
      <span class="parchment-sec-pill">Connect Direct</span>
      <h2 style="font-size: 2.2rem; font-weight: 900; color: var(--primary); margin-bottom: 14px;">Let's Build Something Exceptional</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
        Interested in collaborating, recruiting, or engineering cutting-edge software? Reach out directly.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="mailto:${safeEmail}" class="parchment-btn-primary">📧 ${safeEmail}</a>
        ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="parchment-btn-outline">GitHub ↗</a>` : ''}
        ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="parchment-btn-outline">LinkedIn ↗</a>` : ''}
      </div>
    </section>

    <footer class="parchment-footer">
      <div>© ${new Date().getFullYear()} ${safeName} • Built with Sand Parchment Botanical Engine.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { SandParchmentBotanicalTemplate };

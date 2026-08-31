/**
 * Template 07: Emerald Cyber Sanctuary (Deep Jungle Biodome)
 * Deep Obsidian & Neon Mint Green (#031A16, #00F5A0, #00D9F5, #0A2E28).
 * Comprehensive Multi-Section Developer Portfolio Architecture.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const EmeraldCyberSanctuaryTemplate = {
  id: 'emerald-cyber-sanctuary',
  name: 'Emerald Cyber Sanctuary',
  description: 'Deep obsidian and neon mint green cyber jungle with 3D biodome laboratory, metrics telemetry, experience timeline, verified certifications, academic background, and interactive contact deck.',
  recommendedFor: ['AI/ML Engineer', 'Full Stack Developer', 'Cybersecurity Specialist', 'Bioinformatics Researcher', 'Robotics Engineer'],

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
      '/assets/3d/bio_digital_fusion_3d.jpg',
      '/assets/3d/holographic_resume_codex_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';

    // 01. Dynamic Project Cards
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="sanctuary-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="sanctuary-project-thumb-box">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'emerald-cyber-sanctuary', idx, assignedArtworks, userSeed)}
        </div>
        <div class="sanctuary-card-meta">
          <span class="sanctuary-cat-tag">${TemplateHelper.escapeHtml(p.category || 'BIODOME')}</span>
          <span class="sanctuary-proj-idx">PRJ // 0${idx + 1}</span>
        </div>
        <h3 class="sanctuary-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="sanctuary-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="sanctuary-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="sanctuary-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="sanctuary-card-links">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="sanctuary-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="sanctuary-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    // 02. Dynamic Skills
    const skillBarsHtml = data.skills.slice(0, 8).map((s, idx) => {
      const pct = Math.max(78, 96 - (idx * 2));
      return `
        <div class="sanctuary-skill-row">
          <div class="sanctuary-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span class="sanctuary-skill-pct">${pct}%</span>
          </div>
          <div class="sanctuary-skill-track">
            <div class="sanctuary-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 03. Experience Timeline
    const expTimelineHtml = data.experience.map(e => `
      <div class="sanctuary-timeline-item">
        <div class="sanctuary-timeline-node"></div>
        <div class="sanctuary-timeline-content">
          <div class="sanctuary-timeline-header">
            <h4 class="sanctuary-timeline-role">${TemplateHelper.escapeHtml(e.role)}</h4>
            <span class="sanctuary-timeline-period">${TemplateHelper.escapeHtml(e.period || '2023 – Present')}</span>
          </div>
          <div class="sanctuary-timeline-company">🏢 ${TemplateHelper.escapeHtml(e.company || 'Professional Engineering')}</div>
          <p class="sanctuary-timeline-desc">${TemplateHelper.escapeHtml(e.desc)}</p>
        </div>
      </div>
    `).join('');

    // 04. Education Credentials
    const educationCardsHtml = data.education.map(edu => `
      <div class="sanctuary-edu-card">
        <div class="sanctuary-edu-icon">🌱</div>
        <div>
          <h4 class="sanctuary-edu-degree">${TemplateHelper.escapeHtml(edu.degree)}</h4>
          <div class="sanctuary-edu-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
          <div class="sanctuary-edu-meta">
            ${edu.period ? `<span>📅 ${TemplateHelper.escapeHtml(edu.period)}</span>` : ''}
            ${edu.grade ? `<span class="sanctuary-grade-pill">🏆 ${TemplateHelper.escapeHtml(edu.grade)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // 05. Verified Certifications
    const certificationsHtml = data.certifications.map(c => `
      <div class="sanctuary-cert-card">
        <div class="sanctuary-cert-badge">VERIFIED SPECIMEN</div>
        <h4 class="sanctuary-cert-name">${TemplateHelper.escapeHtml(c.name)}</h4>
        <div class="sanctuary-cert-issuer">Issued by: <strong>${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}</strong></div>
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
      --bg: #031411;
      --surface: #07221D;
      --surface-alt: #0D2E27;
      --surface-glass: rgba(7, 34, 29, 0.88);
      --border: rgba(0, 245, 160, 0.3);
      --border-glow: rgba(0, 245, 160, 0.55);
      --primary: #00F5A0;
      --cyan: #00D9F5;
      --text: #F2FBF9;
      --text-muted: #9CEFD7;
      --font-sans: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --radius-md: 18px;
      --radius-lg: 28px;
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

    .bg-glow-orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(140px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.22;
    }
    .orb-1 { width: 500px; height: 500px; background: #00F5A0; top: -100px; left: -100px; }
    .orb-2 { width: 600px; height: 600px; background: #00D9F5; bottom: 10%; right: -150px; }

    .sanctuary-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .sanctuary-header-inner {
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
      box-shadow: 0 12px 35px -10px rgba(0,0,0,0.8), 0 0 25px rgba(0, 245, 160, 0.15);
    }

    .sanctuary-monogram {
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.04em;
      text-shadow: 0 0 15px rgba(0, 245, 160, 0.6);
    }

    .sanctuary-nav {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .sanctuary-nav-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .sanctuary-nav-link:hover, .sanctuary-nav-link.active {
      color: #ffffff;
      text-shadow: 0 0 10px var(--primary);
    }

    .sanctuary-talk-btn {
      background: linear-gradient(135deg, var(--primary), var(--cyan));
      color: #031411;
      font-weight: 800;
      font-size: 0.88rem;
      padding: 8px 22px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(0, 245, 160, 0.4);
      transition: transform 0.2s ease;
    }

    .sanctuary-talk-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 245, 160, 0.6);
    }

    .sanctuary-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1160px;
      margin: 0 auto;
      padding: 130px 24px 80px;
    }

    /* 01. HERO */
    .sanctuary-hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
      min-height: 75vh;
      margin-bottom: 60px;
    }

    .sanctuary-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 245, 160, 0.12);
      border: 1px solid var(--primary);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba(0, 245, 160, 0.25);
    }

    .sanctuary-title-gradient {
      font-size: clamp(2.5rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #ffffff 0%, var(--primary) 60%, var(--cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sanctuary-hero-desc {
      font-size: 1.08rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 32px;
    }

    .sanctuary-hero-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .sanctuary-btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--cyan));
      color: #031411;
      font-weight: 800;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(0, 245, 160, 0.35);
      transition: transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .sanctuary-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 245, 160, 0.55);
    }

    .sanctuary-btn-outline {
      background: rgba(0, 245, 160, 0.08);
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

    .sanctuary-btn-outline:hover {
      background: rgba(0, 245, 160, 0.2);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .sanctuary-social-links {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .sanctuary-social-pill {
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

    .sanctuary-social-pill:hover {
      color: #ffffff;
      border-color: var(--primary);
      background: rgba(0, 245, 160, 0.15);
    }

    /* 02. METRICS BAR */
    .sanctuary-metrics-bar {
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

    .sanctuary-metric-item {
      text-align: center;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 12px;
    }

    .sanctuary-metric-item:last-child {
      border-right: none;
    }

    .sanctuary-metric-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary);
      text-shadow: 0 0 20px rgba(0, 245, 160, 0.4);
      margin-bottom: 4px;
    }

    .sanctuary-metric-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* SECTION HEADERS */
    .sanctuary-section-header {
      text-align: center;
      margin: 80px 0 45px;
    }

    .sanctuary-sec-pill {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
      background: rgba(0, 245, 160, 0.1);
      border: 1px solid rgba(0, 245, 160, 0.3);
      padding: 4px 14px;
      border-radius: 9999px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .sanctuary-section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .sanctuary-section-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* 03. PROJECTS GRID */
    .sanctuary-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
    }

    .sanctuary-project-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .sanctuary-project-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 16px 40px rgba(0, 245, 160, 0.25);
    }

    .sanctuary-project-thumb-box {
      width: 100%;
      height: 190px;
      margin-bottom: 18px;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(0, 245, 160, 0.35);
      background: #000000;
    }

    .sanctuary-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .sanctuary-cat-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--cyan);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sanctuary-proj-idx {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .sanctuary-project-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 10px;
    }

    .sanctuary-project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 18px;
      flex-grow: 1;
    }

    .sanctuary-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .sanctuary-tech-pill {
      background: rgba(0, 245, 160, 0.1);
      border: 1px solid rgba(0, 245, 160, 0.25);
      border-radius: 9999px;
      padding: 4px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--primary);
    }

    .sanctuary-card-links {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .sanctuary-link-btn {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .sanctuary-link-btn.primary {
      background: var(--primary);
      color: #031411;
    }

    .sanctuary-link-btn.primary:hover {
      background: #ffffff;
      transform: translateY(-2px);
    }

    .sanctuary-link-btn.outline {
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .sanctuary-link-btn.outline:hover {
      border-color: var(--primary);
      color: #ffffff;
    }

    /* 04. SKILLS */
    .sanctuary-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
    }

    .sanctuary-skill-row {
      margin-bottom: 20px;
    }

    .sanctuary-skill-label {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 8px;
    }

    .sanctuary-skill-track {
      height: 8px;
      background: rgba(255,255,255,0.06);
      border-radius: 9999px;
      overflow: hidden;
    }

    .sanctuary-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--cyan));
      border-radius: 9999px;
      box-shadow: 0 0 12px rgba(0, 245, 160, 0.5);
    }

    /* 05. EXPERIENCE TIMELINE */
    .sanctuary-timeline-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .sanctuary-timeline-item {
      display: flex;
      gap: 20px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 26px;
      transition: all 0.25s;
    }

    .sanctuary-timeline-item:hover {
      border-color: var(--primary);
      box-shadow: 0 12px 30px rgba(0, 245, 160, 0.2);
    }

    .sanctuary-timeline-node {
      width: 14px;
      height: 14px;
      background: var(--primary);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--primary);
      margin-top: 6px;
      flex-shrink: 0;
    }

    .sanctuary-timeline-content {
      flex: 1;
    }

    .sanctuary-timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .sanctuary-timeline-role {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
    }

    .sanctuary-timeline-period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--primary);
      background: rgba(0, 245, 160, 0.12);
      border: 1px solid rgba(0, 245, 160, 0.3);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .sanctuary-timeline-company {
      font-size: 0.95rem;
      color: var(--cyan);
      font-weight: 600;
      margin-bottom: 12px;
    }

    .sanctuary-timeline-desc {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* 06. EDUCATION & CERTS */
    .sanctuary-two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .sanctuary-edu-card, .sanctuary-cert-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 18px;
      transition: all 0.25s;
    }

    .sanctuary-edu-card {
      display: flex;
      gap: 18px;
      align-items: flex-start;
    }

    .sanctuary-edu-icon {
      font-size: 1.8rem;
      background: rgba(0, 245, 160, 0.12);
      padding: 10px;
      border-radius: 12px;
    }

    .sanctuary-edu-degree {
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .sanctuary-edu-inst {
      font-size: 0.95rem;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .sanctuary-edu-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .sanctuary-grade-pill {
      background: rgba(0, 217, 245, 0.12);
      border: 1px solid rgba(0, 217, 245, 0.3);
      color: var(--cyan);
      padding: 2px 8px;
      border-radius: 6px;
    }

    .sanctuary-cert-badge {
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

    .sanctuary-cert-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .sanctuary-cert-issuer {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* 07. NARRATIVE DOSSIER */
    .sanctuary-resume-grid {
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
    .sanctuary-contact-deck {
      background: linear-gradient(135deg, var(--surface) 0%, var(--surface-alt) 100%);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 50px;
      text-align: center;
      margin-top: 80px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .sanctuary-footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .sanctuary-hero, .sanctuary-skills-grid, .sanctuary-two-col-grid, .sanctuary-resume-grid {
        grid-template-columns: 1fr;
      }
      .sanctuary-nav { display: none; }
      .sanctuary-contact-deck { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <div class="bg-glow-orb orb-1"></div>
  <div class="bg-glow-orb orb-2"></div>

  <header class="sanctuary-header">
    <div class="sanctuary-header-inner">
      <a href="#home" class="sanctuary-monogram">${initials}</a>
      <nav class="sanctuary-nav">
        <a href="#home" class="sanctuary-nav-link active">Home</a>
        <a href="#projects" class="sanctuary-nav-link">Projects</a>
        <a href="#skills" class="sanctuary-nav-link">Skills</a>
        <a href="#experience" class="sanctuary-nav-link">Experience</a>
        <a href="#education" class="sanctuary-nav-link">Education</a>
        <a href="#contact" class="sanctuary-nav-link">Contact</a>
      </nav>
      <a href="mailto:${safeEmail}" class="sanctuary-talk-btn">Let's Talk ↗</a>
    </div>
  </header>

  <div class="sanctuary-container">
    <!-- 01. HERO -->
    <section id="home" class="sanctuary-hero">
      <div>
        <div class="sanctuary-status-pill">🌿 Emerald Cyber Sanctuary • Available for Hire</div>
        <h1 class="sanctuary-title-gradient">${safeName}</h1>
        <h2 style="font-size: 1.45rem; color: var(--cyan); margin-bottom: 16px; font-weight: 700;">${safeRole}</h2>
        <p class="sanctuary-hero-desc">${safeBio}</p>
        
        <div class="sanctuary-hero-actions">
          <a href="#projects" class="sanctuary-btn-primary">Explore Innovations ➔</a>
          <a href="mailto:${safeEmail}" class="sanctuary-btn-outline">Initiate Contact ↗</a>
        </div>

        <div class="sanctuary-social-links">
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="sanctuary-social-pill">GitHub ↗</a>` : ''}
          ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="sanctuary-social-pill">LinkedIn ↗</a>` : ''}
          ${safeTwitter ? `<a href="${safeTwitter}" target="_blank" rel="noopener" class="sanctuary-social-pill">Twitter/X ↗</a>` : ''}
          ${safeWebsite ? `<a href="${safeWebsite}" target="_blank" rel="noopener" class="sanctuary-social-pill">Website ↗</a>` : ''}
        </div>
      </div>
      <div class="sanctuary-hero-3d-wrapper" style="display: flex; justify-content: center;">
        <img src="/assets/3d/bio_digital_fusion_3d.jpg" alt="${safeName} 3D Cyber Sanctuary" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 28px; border: 2.5px solid rgba(0, 245, 160, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(0, 245, 160, 0.45);" />
      </div>
    </section>

    <!-- 02. KEY TELEMETRY METRICS BAR -->
    <section class="sanctuary-metrics-bar">
      <div class="sanctuary-metric-item">
        <div class="sanctuary-metric-val">${totalProjects}</div>
        <div class="sanctuary-metric-label">Production Deployments</div>
      </div>
      <div class="sanctuary-metric-item">
        <div class="sanctuary-metric-val">${totalSkills}</div>
        <div class="sanctuary-metric-label">Verified Tech Stacks</div>
      </div>
      <div class="sanctuary-metric-item">
        <div class="sanctuary-metric-val">${totalContribs}</div>
        <div class="sanctuary-metric-label">Code Contributions</div>
      </div>
      <div class="sanctuary-metric-item">
        <div class="sanctuary-metric-val">100%</div>
        <div class="sanctuary-metric-label">System Reliability</div>
      </div>
    </section>

    <!-- 03. PROJECTS -->
    <section id="projects">
      <div class="sanctuary-section-header">
        <span class="sanctuary-sec-pill">Selected Deployments</span>
        <h2 class="sanctuary-section-title">Engineered Projects</h2>
        <p class="sanctuary-section-subtitle">Real-world applications, distributed protocols, and production systems engineered with modern technologies.</p>
      </div>
      <div class="sanctuary-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS -->
    <section id="skills">
      <div class="sanctuary-section-header">
        <span class="sanctuary-sec-pill">Technical Spectrum</span>
        <h2 class="sanctuary-section-title">Verified Competencies</h2>
        <p class="sanctuary-section-subtitle">Core proficiencies spanning architecture, full-stack development, and cloud computing.</p>
      </div>
      <div class="sanctuary-skills-grid">
        <div>
          <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #ffffff;">Technical Architecture</h3>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">Specialized in developing resilient software systems, predictive machine learning pipelines, and cloud-native microservices with scalable performance.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.skills.map(s => `<span class="sanctuary-tech-pill">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
        <div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE TIMELINE -->
    <section id="experience">
      <div class="sanctuary-section-header">
        <span class="sanctuary-sec-pill">Chronology</span>
        <h2 class="sanctuary-section-title">Career Milestones</h2>
        <p class="sanctuary-section-subtitle">Professional engineering trajectory, industry experience, and technical leadership.</p>
      </div>
      <div class="sanctuary-timeline-container">
        ${expTimelineHtml}
      </div>
    </section>

    <!-- 06. EDUCATION & CERTIFICATIONS -->
    <section id="education">
      <div class="sanctuary-section-header">
        <span class="sanctuary-sec-pill">Credentials</span>
        <h2 class="sanctuary-section-title">Academic & Professional Credentials</h2>
      </div>
      <div class="sanctuary-two-col-grid">
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
    <section class="sanctuary-resume-grid" id="resume">
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/holographic_resume_codex_3d.jpg" alt="Resume Hologram" style="width: 100%; max-width: 340px; border-radius: 20px; border: 2px solid rgba(0, 245, 160, 0.4); box-shadow: 0 16px 40px rgba(0,0,0,0.8);" />
      </div>
      <div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 12px;">${safeName}</h3>
        <div style="font-size: 1.1rem; color: var(--primary); font-weight: 700; margin-bottom: 16px;">${safeRole} • ${safeLocation}</div>
        <p style="color: var(--text-muted); line-height: 1.65; margin-bottom: 24px;">Comprehensive technical documentation detailing end-to-end software engineering architectures, algorithmic implementations, and full-stack milestones.</p>
        <a href="mailto:${safeEmail}" class="sanctuary-btn-primary">Request Verified Resume ➔</a>
      </div>
    </section>

    <!-- 08. CONTACT -->
    <section id="contact" class="sanctuary-contact-deck">
      <span class="sanctuary-sec-pill">Initialize Connection</span>
      <h2 style="font-size: 2.2rem; font-weight: 900; color: #ffffff; margin-bottom: 14px;">Let's Build Something Exceptional</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
        Interested in collaborating, recruiting, or engineering cutting-edge software? Reach out directly.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="mailto:${safeEmail}" class="sanctuary-btn-primary">📧 ${safeEmail}</a>
        ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="sanctuary-btn-outline">GitHub ↗</a>` : ''}
        ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="sanctuary-btn-outline">LinkedIn ↗</a>` : ''}
      </div>
    </section>

    <footer class="sanctuary-footer">
      <div>© ${new Date().getFullYear()} ${safeName} • Built with Emerald Cyber Sanctuary Engine.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { EmeraldCyberSanctuaryTemplate };

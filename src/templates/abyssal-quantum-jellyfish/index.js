/**
 * Template 09: Abyssal Quantum Jellyfish (Deep Sea Neural Bioluminescence)
 * Deep Teal, Abyssal Obsidian & Neon Cyan/Pink (#021319, #00F2FE, #EC4899, #082F3D).
 * Comprehensive Multi-Section Developer Portfolio Architecture.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const AbyssalQuantumJellyfishTemplate = {
  id: 'abyssal-quantum-jellyfish',
  name: 'Abyssal Quantum Jellyfish',
  description: 'Deep teal abyssal cyberspace with 3D robotic hand holding a glowing bioluminescent jellyfish, quantum telemetry metrics, career timeline, academic credentials, verified certifications, and interactive contact console.',
  recommendedFor: ['AI Researcher', 'Quantum Computing Specialist', 'Backend Systems Engineer', 'Data Scientist', 'Robotics Architect'],

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
      '/assets/3d/algorand_escrow_protocol_3d.jpg',
      '/assets/3d/holographic_resume_codex_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';

    // 01. Dynamic Project Cards
    const projectCardsHtml = data.projects.map((p, idx) => `
      <div class="abyssal-project-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
        <div class="abyssal-thumb-box">
          ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'abyssal-quantum-jellyfish', idx, assignedArtworks, userSeed)}
        </div>
        <div class="abyssal-card-meta">
          <span class="abyssal-cat-tag">${TemplateHelper.escapeHtml(p.category || 'QUANTUM')}</span>
          <span class="abyssal-proj-idx">NODE // 0${idx + 1}</span>
        </div>
        <h3 class="abyssal-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
        <p class="abyssal-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
        <div class="abyssal-tech-pills">
          ${p.tech.split(/[,•|]+/).map(t => `<span class="abyssal-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
        </div>
        <div class="abyssal-card-actions">
          ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="abyssal-link-btn primary">Live Demo ↗</a>` : ''}
          ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="abyssal-link-btn outline">GitHub ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    // 02. Skills Meters
    const skillBarsHtml = data.skills.slice(0, 8).map((s, idx) => {
      const pct = Math.max(78, 96 - (idx * 2));
      return `
        <div class="abyssal-skill-row">
          <div class="abyssal-skill-label">
            <span>${TemplateHelper.escapeHtml(s)}</span>
            <span style="color: #00F2FE; font-weight: 800;">${pct}%</span>
          </div>
          <div class="abyssal-skill-track">
            <div class="abyssal-skill-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 03. Experience Timeline
    const experienceTimelineHtml = data.experience.map(exp => `
      <div class="abyssal-timeline-item">
        <div class="abyssal-timeline-marker">
          <div class="abyssal-pulse-dot"></div>
        </div>
        <div class="abyssal-timeline-content">
          <div class="abyssal-timeline-header">
            <h4 class="abyssal-role-title">${TemplateHelper.escapeHtml(exp.role)}</h4>
            <span class="abyssal-period-badge">${TemplateHelper.escapeHtml(exp.period || '2023 – Present')}</span>
          </div>
          <div class="abyssal-company-name">🌊 ${TemplateHelper.escapeHtml(exp.company || 'Technology Organization')}</div>
          <p class="abyssal-exp-desc">${TemplateHelper.escapeHtml(exp.desc)}</p>
        </div>
      </div>
    `).join('');

    // 04. Education
    const educationCardsHtml = data.education.map(edu => `
      <div class="abyssal-edu-card">
        <div class="abyssal-edu-icon">🪼</div>
        <div>
          <h4 class="abyssal-edu-degree">${TemplateHelper.escapeHtml(edu.degree)}</h4>
          <div class="abyssal-edu-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
          <div class="abyssal-edu-meta">
            ${edu.period ? `<span>📅 ${TemplateHelper.escapeHtml(edu.period)}</span>` : ''}
            ${edu.grade ? `<span class="abyssal-grade-pill">🏆 ${TemplateHelper.escapeHtml(edu.grade)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // 05. Certifications
    const certificationsHtml = data.certifications.map(c => `
      <div class="abyssal-cert-card">
        <div class="abyssal-cert-badge">QUANTUM VERIFIED</div>
        <h4 class="abyssal-cert-name">${TemplateHelper.escapeHtml(c.name)}</h4>
        <div class="abyssal-cert-issuer">Issued by: <strong>${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}</strong></div>
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
      --bg: #021319;
      --surface: #06222D;
      --surface-alt: #082F3D;
      --surface-glass: rgba(6, 34, 45, 0.88);
      --border: rgba(0, 242, 254, 0.3);
      --border-glow: rgba(0, 242, 254, 0.55);
      --primary: #00F2FE;
      --pink: #EC4899;
      --cyan: #38BDF8;
      --text: #F0FDFA;
      --text-muted: #99F6E4;
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
      opacity: 0.25;
    }
    .orb-1 { width: 500px; height: 500px; background: #00F2FE; top: -100px; left: -100px; }
    .orb-2 { width: 600px; height: 600px; background: #EC4899; bottom: 10%; right: -150px; }

    .abyssal-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .abyssal-header-inner {
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
      box-shadow: 0 12px 35px -10px rgba(0,0,0,0.8), 0 0 25px rgba(0, 242, 254, 0.15);
    }

    .abyssal-monogram {
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--primary);
      text-decoration: none;
      letter-spacing: -0.04em;
      text-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
    }

    .abyssal-nav {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .abyssal-nav-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .abyssal-nav-link:hover, .abyssal-nav-link.active {
      color: #ffffff;
      text-shadow: 0 0 10px var(--primary);
    }

    .abyssal-talk-btn {
      background: linear-gradient(135deg, var(--primary), var(--pink));
      color: #021319;
      font-weight: 800;
      font-size: 0.88rem;
      padding: 8px 22px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(0, 242, 254, 0.4);
      transition: transform 0.2s ease;
    }

    .abyssal-talk-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 242, 254, 0.6);
    }

    .abyssal-container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1160px;
      margin: 0 auto;
      padding: 130px 24px 80px;
    }

    /* 01. HERO */
    .abyssal-hero {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
      min-height: 75vh;
      margin-bottom: 60px;
    }

    .abyssal-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 242, 254, 0.12);
      border: 1px solid var(--primary);
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba(0, 242, 254, 0.25);
    }

    .abyssal-title-gradient {
      font-size: clamp(2.5rem, 5.5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
      background: linear-gradient(135deg, #ffffff 0%, var(--primary) 60%, var(--pink) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .abyssal-hero-desc {
      font-size: 1.08rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 32px;
    }

    .abyssal-hero-cta-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .abyssal-btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--pink));
      color: #021319;
      font-weight: 800;
      padding: 12px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(0, 242, 254, 0.35);
      transition: transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .abyssal-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 242, 254, 0.55);
    }

    .abyssal-btn-outline {
      background: rgba(0, 242, 254, 0.08);
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

    .abyssal-btn-outline:hover {
      background: rgba(0, 242, 254, 0.2);
      color: #ffffff;
      transform: translateY(-2px);
    }

    .abyssal-social-links {
      display: flex;
      gap: 14px;
      align-items: center;
    }

    .abyssal-social-pill {
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

    .abyssal-social-pill:hover {
      color: #ffffff;
      border-color: var(--primary);
      background: rgba(0, 242, 254, 0.15);
    }

    /* 02. METRICS BAR */
    .abyssal-metrics-bar {
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

    .abyssal-metric-item {
      text-align: center;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0 12px;
    }

    .abyssal-metric-item:last-child {
      border-right: none;
    }

    .abyssal-metric-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--primary);
      text-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
      margin-bottom: 4px;
    }

    .abyssal-metric-label {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* SECTION HEADERS */
    .abyssal-section-header {
      text-align: center;
      margin: 80px 0 45px;
    }

    .abyssal-sec-pill {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--primary);
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.3);
      padding: 4px 14px;
      border-radius: 9999px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .abyssal-section-title {
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      font-weight: 900;
      color: #ffffff;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .abyssal-section-subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* 03. PROJECTS GRID */
    .abyssal-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
    }

    .abyssal-project-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .abyssal-project-card:hover {
      transform: translateY(-4px);
      border-color: var(--primary);
      box-shadow: 0 16px 40px rgba(0, 242, 254, 0.25);
    }

    .abyssal-thumb-box {
      width: 100%;
      height: 190px;
      margin-bottom: 18px;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(0, 242, 254, 0.35);
      background: #000000;
    }

    .abyssal-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .abyssal-cat-tag {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--pink);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .abyssal-proj-idx {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .abyssal-project-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 10px;
    }

    .abyssal-project-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 18px;
      flex-grow: 1;
    }

    .abyssal-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .abyssal-tech-pill {
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.25);
      border-radius: 9999px;
      padding: 4px 12px;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--primary);
    }

    .abyssal-card-actions {
      display: flex;
      gap: 12px;
      margin-top: auto;
    }

    .abyssal-link-btn {
      font-size: 0.85rem;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 9999px;
      text-decoration: none;
      transition: all 0.2s;
    }

    .abyssal-link-btn.primary {
      background: var(--primary);
      color: #021319;
    }

    .abyssal-link-btn.primary:hover {
      background: #ffffff;
      transform: translateY(-2px);
    }

    .abyssal-link-btn.outline {
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .abyssal-link-btn.outline:hover {
      border-color: var(--primary);
      color: #ffffff;
    }

    /* 04. SKILLS */
    .abyssal-skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 40px;
    }

    .abyssal-skill-row {
      margin-bottom: 20px;
    }

    .abyssal-skill-label {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 0.95rem;
      margin-bottom: 8px;
    }

    .abyssal-skill-track {
      height: 8px;
      background: rgba(255,255,255,0.06);
      border-radius: 9999px;
      overflow: hidden;
    }

    .abyssal-skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--pink));
      border-radius: 9999px;
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.5);
    }

    /* 05. EXPERIENCE TIMELINE */
    .abyssal-timeline-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .abyssal-timeline-item {
      display: flex;
      gap: 20px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 26px;
      transition: all 0.25s;
    }

    .abyssal-timeline-item:hover {
      border-color: var(--primary);
      box-shadow: 0 12px 30px rgba(0, 242, 254, 0.2);
    }

    .abyssal-timeline-marker {
      padding-top: 4px;
    }

    .abyssal-pulse-dot {
      width: 14px;
      height: 14px;
      background: var(--primary);
      border-radius: 50%;
      box-shadow: 0 0 12px var(--primary);
    }

    .abyssal-timeline-content {
      flex: 1;
    }

    .abyssal-timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .abyssal-role-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #ffffff;
    }

    .abyssal-period-badge {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--primary);
      background: rgba(0, 242, 254, 0.12);
      border: 1px solid rgba(0, 242, 254, 0.3);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .abyssal-company-name {
      font-size: 0.95rem;
      color: var(--pink);
      font-weight: 600;
      margin-bottom: 12px;
    }

    .abyssal-exp-desc {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    /* 06. EDUCATION & CERTS */
    .abyssal-two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .abyssal-edu-card, .abyssal-cert-card {
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
      margin-bottom: 18px;
      transition: all 0.25s;
    }

    .abyssal-edu-card {
      display: flex;
      gap: 18px;
      align-items: flex-start;
    }

    .abyssal-edu-icon {
      font-size: 1.8rem;
      background: rgba(0, 242, 254, 0.12);
      padding: 10px;
      border-radius: 12px;
    }

    .abyssal-edu-degree {
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .abyssal-edu-inst {
      font-size: 0.95rem;
      color: var(--primary);
      font-weight: 600;
      margin-bottom: 8px;
    }

    .abyssal-edu-meta {
      display: flex;
      gap: 12px;
      align-items: center;
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .abyssal-grade-pill {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--cyan);
      padding: 2px 8px;
      border-radius: 6px;
    }

    .abyssal-cert-badge {
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

    .abyssal-cert-name {
      font-size: 1.1rem;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .abyssal-cert-issuer {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* 07. NARRATIVE DOSSIER */
    .abyssal-resume-grid {
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
    .abyssal-contact-deck {
      background: linear-gradient(135deg, var(--surface) 0%, var(--surface-alt) 100%);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 50px;
      text-align: center;
      margin-top: 80px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .abyssal-footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      .abyssal-hero, .abyssal-skills-grid, .abyssal-two-col-grid, .abyssal-resume-grid {
        grid-template-columns: 1fr;
      }
      .abyssal-nav { display: none; }
      .abyssal-contact-deck { padding: 30px 20px; }
    }
  </style>
</head>
<body>
  <div class="bg-glow-orb orb-1"></div>
  <div class="bg-glow-orb orb-2"></div>

  <header class="abyssal-header">
    <div class="abyssal-header-inner">
      <a href="#home" class="abyssal-monogram">${initials}</a>
      <nav class="abyssal-nav">
        <a href="#home" class="abyssal-nav-link active">Home</a>
        <a href="#projects" class="abyssal-nav-link">Projects</a>
        <a href="#skills" class="abyssal-nav-link">Skills</a>
        <a href="#experience" class="abyssal-nav-link">Experience</a>
        <a href="#education" class="abyssal-nav-link">Education</a>
        <a href="#contact" class="abyssal-nav-link">Contact</a>
      </nav>
      <a href="mailto:${safeEmail}" class="abyssal-talk-btn">Let's Talk ↗</a>
    </div>
  </header>

  <div class="abyssal-container">
    <!-- 01. HERO -->
    <section id="home" class="abyssal-hero">
      <div>
        <div class="abyssal-badge">🪼 Abyssal Quantum Node • Available for Hire</div>
        <h1 class="abyssal-title-gradient">${safeName}</h1>
        <h2 style="font-size: 1.45rem; color: var(--primary); margin-bottom: 16px; font-weight: 700;">${safeRole}</h2>
        <p class="abyssal-hero-desc">${safeBio}</p>
        
        <div class="abyssal-hero-cta-row">
          <a href="#projects" class="abyssal-btn-primary">Explore Neural Systems ➔</a>
          <a href="mailto:${safeEmail}" class="abyssal-btn-outline">Initiate Contact ↗</a>
        </div>

        <div class="abyssal-social-links">
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="abyssal-social-pill">GitHub ↗</a>` : ''}
          ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="abyssal-social-pill">LinkedIn ↗</a>` : ''}
          ${safeTwitter ? `<a href="${safeTwitter}" target="_blank" rel="noopener" class="abyssal-social-pill">Twitter/X ↗</a>` : ''}
          ${safeWebsite ? `<a href="${safeWebsite}" target="_blank" rel="noopener" class="abyssal-social-pill">Website ↗</a>` : ''}
        </div>
      </div>
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/algorand_escrow_protocol_3d.jpg" alt="${safeName} 3D Quantum Node" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 28px; border: 2.5px solid var(--border); box-shadow: 0 20px 50px rgba(0,0,0,0.85);" />
      </div>
    </section>

    <!-- 02. KEY TELEMETRY METRICS BAR -->
    <section class="abyssal-metrics-bar">
      <div class="abyssal-metric-item">
        <div class="abyssal-metric-val">${totalProjects}</div>
        <div class="abyssal-metric-label">Neural Deployments</div>
      </div>
      <div class="abyssal-metric-item">
        <div class="abyssal-metric-val">${totalSkills}</div>
        <div class="abyssal-metric-label">Verified Tech Stacks</div>
      </div>
      <div class="abyssal-metric-item">
        <div class="abyssal-metric-val">${totalContribs}</div>
        <div class="abyssal-metric-label">Code Contributions</div>
      </div>
      <div class="abyssal-metric-item">
        <div class="abyssal-metric-val">100%</div>
        <div class="abyssal-metric-label">Quantum Stability</div>
      </div>
    </section>

    <!-- 03. PROJECTS -->
    <section id="projects">
      <div class="abyssal-section-header">
        <span class="abyssal-sec-pill">Neural Systems</span>
        <h2 class="abyssal-section-title">Engineered Deployments</h2>
        <p class="abyssal-section-subtitle">Real-world applications, distributed protocols, and production systems engineered with modern technologies.</p>
      </div>
      <div class="abyssal-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS -->
    <section id="skills">
      <div class="abyssal-section-header">
        <span class="abyssal-sec-pill">Quantum Matrix</span>
        <h2 class="abyssal-section-title">Technical Expertise</h2>
        <p class="abyssal-section-subtitle">Core proficiencies spanning architecture, full-stack development, and cloud computing.</p>
      </div>
      <div class="abyssal-skills-grid">
        <div>
          <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #ffffff;">Full-Stack & Systems Architecture</h3>
          <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">Specialized in developing resilient software systems, predictive machine learning pipelines, and cloud-native microservices with scalable performance.</p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${data.skills.map(s => `<span class="abyssal-tech-pill">${TemplateHelper.escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
        <div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE TIMELINE -->
    <section id="experience">
      <div class="abyssal-section-header">
        <span class="abyssal-sec-pill">Chronology</span>
        <h2 class="abyssal-section-title">Career Milestones</h2>
        <p class="abyssal-section-subtitle">Professional engineering trajectory, industry experience, and technical leadership.</p>
      </div>
      <div class="abyssal-timeline-container">
        ${experienceTimelineHtml}
      </div>
    </section>

    <!-- 06. EDUCATION & CERTIFICATIONS -->
    <section id="education">
      <div class="abyssal-section-header">
        <span class="abyssal-sec-pill">Credentials</span>
        <h2 class="abyssal-section-title">Academic & Professional Credentials</h2>
      </div>
      <div class="abyssal-two-col-grid">
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
    <section class="abyssal-resume-grid" id="resume">
      <div style="display: flex; justify-content: center;">
        <img src="/assets/3d/holographic_resume_codex_3d.jpg" alt="Resume Hologram" style="width: 100%; max-width: 340px; border-radius: 20px; border: 2px solid var(--border); box-shadow: 0 16px 40px rgba(0,0,0,0.8);" />
      </div>
      <div>
        <h3 style="font-size: 1.8rem; color: #ffffff; margin-bottom: 12px;">${safeName}</h3>
        <div style="font-size: 1.1rem; color: var(--primary); font-weight: 700; margin-bottom: 16px;">${safeRole} • ${safeLocation}</div>
        <p style="color: var(--text-muted); line-height: 1.65; margin-bottom: 24px;">Comprehensive technical documentation detailing end-to-end software engineering architectures, algorithmic implementations, and full-stack milestones.</p>
        <a href="mailto:${safeEmail}" class="abyssal-btn-primary">Download Complete Dossier ➔</a>
      </div>
    </section>

    <!-- 08. CONTACT SECTION -->
    <section id="contact" class="abyssal-contact-deck">
      <span class="abyssal-sec-pill">Initialize Connection</span>
      <h2 style="font-size: 2.2rem; font-weight: 900; color: #ffffff; margin-bottom: 14px;">Let's Build Something Exceptional</h2>
      <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">
        Interested in collaborating, recruiting, or engineering cutting-edge software? Reach out directly.
      </p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="mailto:${safeEmail}" class="abyssal-btn-primary">📧 ${safeEmail}</a>
        ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="abyssal-btn-outline">GitHub ↗</a>` : ''}
        ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="abyssal-btn-outline">LinkedIn ↗</a>` : ''}
      </div>
    </section>

    <footer class="abyssal-footer">
      <div>© ${new Date().getFullYear()} ${safeName} • Built with Abyssal Quantum Jellyfish Engine.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { AbyssalQuantumJellyfishTemplate };

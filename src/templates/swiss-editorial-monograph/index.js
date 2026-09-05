/**
 * Template: SWISS EDITORIAL MONOGRAPH
 * Aesthetic: Haute Typographie • Archival Monograph • Swiss Grid Minimalist Luxe • Gold Foil & Vermillion
 * Palette: Ebonized Obsidian (#0A0B0E), Deep Carbon (#13151B), Archival Linen (#1A1D24), Swiss Vermillion (#E63946), Imperial Gold Foil (#D4AF37), Museum Alabaster (#F4F2EB), Concrete Grey (#9FA2AD).
 * Motifs: Asymmetric broadsheet grids, archival accession stamps, typographic pull-quotes, exhibition index cards, and 3D origami prism polyhedron.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const SwissEditorialMonographTemplate = {
  id: 'swiss-editorial-monograph',
  name: 'Swiss Editorial Monograph',
  category: 'Haute Typographie / Archival Monograph / Swiss Luxe',
  description: 'An authoritative, high-fashion Swiss editorial aesthetic. Monumental display typography, museum archival accession stamps, asymmetric broadsheet dossiers, gold foil accents, and an interactive 3D WebGL origami polyhedron prism.',
  recommendedFor: ['Creative Technologist', 'Principal Systems Architect', 'VP of Engineering', 'Design Technologist', 'Web3 Protocol Architect', 'Senior Full Stack Artisan'],
  palette: ['#0A0B0E', '#13151B', '#E63946', '#D4AF37', '#F4F2EB'],
  thumbnail: '/assets/3d/chrono_obsidian_sanctuary_3d.jpg',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Global Nexus / Remote');
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const yearsExp = data.experience?.length ? `${Math.max(data.experience.length * 2, 4)}+` : '4+';
    const projCount = data.projects?.length || 6;
    const certsCount = data.certifications?.length || 3;
    const totalRepos = data.publicRepos ?? projCount;
    const totalTokens = projCount * 128 + 420;

    // 01. Exhibition Projects Dossier
    const assignedArtworks = new Set(['/assets/3d/chrono_obsidian_sanctuary_3d.jpg', '/assets/3d/crystal_leaf_hand_3d.jpg', '/assets/3d/steampunk_satellite_bird_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="monograph-tech-tag">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="monograph-exhibit-card" data-idx="${idx}">
          <div class="exhibit-top-bar">
            <div class="accession-stamp">
              <span class="stamp-prefix">EXHIBIT REF</span>
              <span class="stamp-code">CH-MONO-${projNum}</span>
            </div>
            <div class="exhibit-category">${TemplateHelper.escapeHtml(p.category || 'Architected Artifact')}</div>
          </div>

          <div class="exhibit-visual-frame">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'swiss-editorial-monograph', idx, assignedArtworks, userSeed)}
            <div class="frame-accession-seal">VERIFIED ARTIFACT</div>
          </div>

          <div class="exhibit-meta-body">
            <h3 class="exhibit-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="exhibit-summary">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="exhibit-taxonomy">
              ${techTags}
            </div>

            <div class="exhibit-actions">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="monograph-btn vermillion"><span>DEPLOYMENT ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="monograph-btn gold"><span>MONOGRAPH SOURCE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 02. Skills Taxonomy & Precision Meters
    const skillsListHtml = data.skills.map((s, idx) => {
      const mastery = 88 + ((idx * 3) % 11);
      const codeStr = `SYS.${String(idx + 1).padStart(2, '0')}`;
      return `
        <div class="monograph-skill-item">
          <div class="skill-code">${codeStr}</div>
          <div class="skill-name">${TemplateHelper.escapeHtml(s)}</div>
          <div class="skill-meter-rail">
            <div class="skill-meter-fill" style="width: ${mastery}%;"></div>
          </div>
          <div class="skill-pct">${mastery}%</div>
        </div>
      `;
    }).join('');

    // 03. Chronological Career Retrospective
    const expRowsHtml = (data.experience || []).map((exp, idx) => {
      const eraNum = String(idx + 1).padStart(2, '0');
      return `
        <div class="monograph-timeline-entry">
          <div class="timeline-era-col">
            <span class="era-index">ERA // ${eraNum}</span>
            <span class="era-period">${TemplateHelper.escapeHtml(exp.period || 'Contemporary')}</span>
          </div>
          <div class="timeline-bullet-gold"></div>
          <div class="timeline-narrative-col">
            <h4 class="timeline-role">${TemplateHelper.escapeHtml(exp.role || exp.title)}</h4>
            <div class="timeline-institution">${TemplateHelper.escapeHtml(exp.company)}</div>
            <p class="timeline-desc">${TemplateHelper.escapeHtml(exp.desc || exp.summary || '')}</p>
          </div>
        </div>
      `;
    }).join('');

    // 04. Formal Pedagogy & Accreditations
    const eduRowsHtml = (data.education || []).map(edu => `
      <div class="pedagogy-block">
        <div class="pedagogy-title">${TemplateHelper.escapeHtml(edu.degree || 'Advanced Engineering Thesis')}</div>
        <div class="pedagogy-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
        ${edu.grade ? `<div class="pedagogy-grade">CUM LAUDE // ${TemplateHelper.escapeHtml(edu.grade)}</div>` : ''}
      </div>
    `).join('');

    const certBadgesHtml = (data.certifications || []).map(c => `
      <div class="monograph-cert-foil">
        <span class="foil-emblem">✦</span>
        <span class="foil-title">${TemplateHelper.escapeHtml(c.name)}</span>
        <span class="foil-issuer">${TemplateHelper.escapeHtml(c.issuer || 'Authoritative Board')}</span>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Swiss Editorial Monograph</title>
  <meta name="description" content="${safeBio.substring(0, 160)}">
  
  <!-- Modern Typography: Syne, Playfair Display, JetBrains Mono, Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    :root {
      --bg-void: #0A0B0E;
      --bg-surface: #13151B;
      --bg-elevated: #1A1D24;
      --border-subtle: rgba(244, 242, 235, 0.09);
      --border-strong: rgba(244, 242, 235, 0.22);
      --vermillion: #E63946;
      --gold-foil: #D4AF37;
      --alabaster: #F4F2EB;
      --concrete: #9FA2AD;
      --monograph-grey: #636773;
      --container-max: 1360px;
      --font-display: 'Syne', sans-serif;
      --font-serif: 'Playfair Display', serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      background-color: var(--bg-void);
      color: var(--alabaster);
      font-family: var(--font-body);
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--bg-void);
      overflow-x: hidden;
      line-height: 1.6;
      position: relative;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Fixed WebGL 3D Canvas */
    #swiss-monograph-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    .monograph-wrap {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 40px;
    }

    /* 01. Archival Masthead Bar */
    .archival-masthead {
      border-bottom: 1px solid var(--border-subtle);
      padding: 24px 0;
      position: sticky;
      top: 0;
      background: rgba(10, 11, 14, 0.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      z-index: 100;
    }

    .masthead-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .masthead-brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-mark {
      background: var(--vermillion);
      color: var(--alabaster);
      font-weight: 800;
      padding: 4px 10px;
      letter-spacing: 0.05em;
      border-radius: 2px;
    }

    .brand-name-title {
      color: var(--alabaster);
      font-weight: 700;
      font-size: 0.95rem;
    }

    .masthead-nav {
      display: flex;
      gap: 28px;
    }

    .masthead-nav a {
      color: var(--concrete);
      transition: color 0.2s ease;
      position: relative;
    }

    .masthead-nav a:hover {
      color: var(--vermillion);
    }

    .masthead-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--gold-foil);
      color: var(--gold-foil);
      padding: 8px 18px;
      font-size: 0.78rem;
      font-family: var(--font-mono);
      font-weight: 700;
      border-radius: 2px;
      transition: all 0.3s var(--transition-smooth);
    }

    .masthead-cta-btn:hover {
      background: var(--gold-foil);
      color: var(--bg-void);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    }

    /* 02. Monumental Hero Section */
    .monograph-hero {
      padding: 100px 0 80px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .hero-broadsheet-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 60px;
      align-items: start;
    }

    .hero-lead-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .hero-folio-tag {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      color: var(--gold-foil);
      text-transform: uppercase;
    }

    .folio-bullet {
      width: 8px;
      height: 8px;
      background: var(--vermillion);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--vermillion);
    }

    .hero-monumental-name {
      font-family: var(--font-display);
      font-size: clamp(3.2rem, 7vw, 5.8rem);
      font-weight: 800;
      line-height: 0.95;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: var(--alabaster);
    }

    .hero-serif-role {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      color: var(--gold-foil);
      line-height: 1.2;
    }

    .hero-narrative-prose {
      font-size: 1.15rem;
      color: var(--concrete);
      max-width: 600px;
      line-height: 1.7;
    }

    .hero-action-strip {
      display: flex;
      gap: 20px;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    .monograph-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 16px 32px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      border-radius: 2px;
      transition: all 0.3s var(--transition-smooth);
      cursor: pointer;
    }

    .monograph-btn.vermillion {
      background: var(--vermillion);
      color: var(--alabaster);
      border: 1px solid var(--vermillion);
    }

    .monograph-btn.vermillion:hover {
      background: #c92a37;
      box-shadow: 0 8px 30px rgba(230, 57, 70, 0.45);
      transform: translateY(-2px);
    }

    .monograph-btn.gold {
      background: transparent;
      color: var(--gold-foil);
      border: 1px solid var(--gold-foil);
    }

    .monograph-btn.gold:hover {
      background: var(--gold-foil);
      color: var(--bg-void);
      box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
      transform: translateY(-2px);
    }

    /* Hero Dossier Card (Right Column) */
    .hero-dossier-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      padding: 40px;
      position: relative;
      border-radius: 4px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    }

    .dossier-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 16px;
      margin-bottom: 24px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      color: var(--concrete);
    }

    .dossier-status-pill {
      color: #10B981;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dossier-status-pill::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }

    .dossier-stat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
    }

    .stat-metric-card {
      border-left: 2px solid var(--gold-foil);
      padding-left: 14px;
    }

    .stat-big-val {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--alabaster);
      line-height: 1;
    }

    .stat-label-str {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--concrete);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 6px;
    }

    .dossier-coordinates {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--monograph-grey);
      border-top: 1px dashed var(--border-subtle);
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* 03. Broadsheet Metric Strip */
    .metric-broadsheet-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(19, 21, 27, 0.4);
    }

    .broadsheet-cell {
      padding: 36px 30px;
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .broadsheet-cell:last-child {
      border-right: none;
    }

    .broadsheet-num {
      font-family: var(--font-display);
      font-size: 2.6rem;
      font-weight: 800;
      color: var(--alabaster);
      letter-spacing: -0.02em;
    }

    .broadsheet-text {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      text-transform: uppercase;
      color: var(--gold-foil);
      letter-spacing: 0.1em;
    }

    /* 04. Section Typography */
    .section-monograph-title {
      padding: 80px 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 50px;
    }

    .title-left {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .section-super-tag {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--vermillion);
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .section-h2 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 800;
      text-transform: uppercase;
      color: var(--alabaster);
      letter-spacing: -0.02em;
    }

    .section-right-meta {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--concrete);
      text-align: right;
    }

    /* 05. Exhibition Cards Grid */
    .exhibits-dossier-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(390px, 1fr));
      gap: 36px;
      margin-bottom: 80px;
    }

    .monograph-exhibit-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 3px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.4s var(--transition-smooth);
    }

    .monograph-exhibit-card:hover {
      border-color: var(--gold-foil);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
      transform: translateY(-6px);
    }

    .exhibit-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-subtle);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .accession-stamp {
      display: flex;
      gap: 8px;
      color: var(--gold-foil);
      font-weight: 700;
      letter-spacing: 0.1em;
    }

    .exhibit-category {
      color: var(--concrete);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .exhibit-visual-frame {
      position: relative;
      background: #000;
      min-height: 240px;
      overflow: hidden;
    }

    .frame-accession-seal {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(10, 11, 14, 0.85);
      border: 1px solid var(--border-subtle);
      padding: 4px 10px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--alabaster);
      text-transform: uppercase;
    }

    .exhibit-meta-body {
      padding: 30px 26px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 16px;
    }

    .exhibit-title {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 700;
      color: var(--alabaster);
      line-height: 1.25;
    }

    .exhibit-summary {
      font-size: 0.95rem;
      color: var(--concrete);
      line-height: 1.65;
    }

    .exhibit-taxonomy {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
      padding-top: 14px;
    }

    .monograph-tech-tag {
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--concrete);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }

    .exhibit-actions {
      display: flex;
      gap: 12px;
      padding-top: 14px;
    }

    .exhibit-actions .monograph-btn {
      padding: 10px 18px;
      font-size: 0.75rem;
      flex: 1;
    }

    /* 06. Taxonomy Matrix & Meters */
    .taxonomy-matrix-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 90px;
    }

    .monograph-skill-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 20px 24px;
      border-radius: 2px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: auto auto;
      gap: 8px 16px;
      align-items: center;
    }

    .skill-code {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--vermillion);
      letter-spacing: 0.1em;
    }

    .skill-name {
      font-weight: 700;
      font-size: 1rem;
      color: var(--alabaster);
    }

    .skill-pct {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--gold-foil);
      text-align: right;
    }

    .skill-meter-rail {
      grid-column: 1 / -1;
      height: 4px;
      background: var(--bg-elevated);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .skill-meter-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--vermillion), var(--gold-foil));
      border-radius: 2px;
    }

    /* 07. Retrospective Timeline */
    .timeline-retrospective-flow {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-bottom: 90px;
      position: relative;
    }

    .timeline-retrospective-flow::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 170px;
      width: 1px;
      background: var(--border-subtle);
    }

    .monograph-timeline-entry {
      display: grid;
      grid-template-columns: 140px 60px 1fr;
      align-items: start;
      position: relative;
    }

    .timeline-era-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-align: right;
    }

    .era-index {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--vermillion);
      letter-spacing: 0.12em;
    }

    .era-period {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--concrete);
    }

    .timeline-bullet-gold {
      width: 12px;
      height: 12px;
      border: 2px solid var(--gold-foil);
      background: var(--bg-void);
      border-radius: 50%;
      margin: 6px auto 0;
      z-index: 2;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
    }

    .timeline-narrative-col {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 26px 30px;
      border-radius: 2px;
    }

    .timeline-role {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--alabaster);
    }

    .timeline-institution {
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--gold-foil);
      font-size: 1.05rem;
      margin: 4px 0 12px;
    }

    .timeline-desc {
      color: var(--concrete);
      font-size: 0.95rem;
      line-height: 1.65;
    }

    /* 08. Pedagogy & Accreditations */
    .pedagogy-duo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 90px;
    }

    .pedagogy-block {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 24px 28px;
      border-left: 3px solid var(--vermillion);
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }

    .pedagogy-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--alabaster);
    }

    .pedagogy-inst {
      color: var(--concrete);
      font-size: 0.95rem;
    }

    .pedagogy-grade {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--gold-foil);
      letter-spacing: 0.1em;
      margin-top: 4px;
    }

    .certs-foil-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .monograph-cert-foil {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-radius: 2px;
    }

    .foil-emblem {
      color: var(--gold-foil);
      font-size: 1.2rem;
    }

    .foil-title {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--alabaster);
    }

    .foil-issuer {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--concrete);
      margin-left: auto;
    }

    /* 09. Archival Dispatch Contact Form */
    .archival-contact-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-strong);
      padding: 60px 50px;
      margin-bottom: 100px;
      border-radius: 4px;
    }

    .contact-broadsheet-layout {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 60px;
    }

    .contact-manifesto h3 {
      font-family: var(--font-display);
      font-size: 2.4rem;
      text-transform: uppercase;
      line-height: 1.1;
      margin-bottom: 16px;
    }

    .contact-manifesto p {
      color: var(--concrete);
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 30px;
    }

    .contact-coordinates-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .coord-item {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--concrete);
    }

    .coord-item a {
      color: var(--gold-foil);
      transition: color 0.2s;
    }

    .coord-item a:hover {
      color: var(--alabaster);
    }

    .contact-form-monograph {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group-archival {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group-archival label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      color: var(--gold-foil);
      text-transform: uppercase;
    }

    .form-group-archival input,
    .form-group-archival textarea {
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      padding: 14px 18px;
      color: var(--alabaster);
      font-family: var(--font-body);
      font-size: 0.95rem;
      border-radius: 2px;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-group-archival input:focus,
    .form-group-archival textarea:focus {
      border-color: var(--vermillion);
    }

    /* 10. Colophon Footer */
    .monograph-colophon {
      border-top: 1px solid var(--border-subtle);
      padding: 40px 0 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--monograph-grey);
    }

    .colophon-creds {
      color: var(--concrete);
    }

    @media (max-width: 992px) {
      .hero-broadsheet-grid,
      .contact-broadsheet-layout,
      .pedagogy-duo-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .metric-broadsheet-bar {
        grid-template-columns: 1fr 1fr;
      }

      .timeline-retrospective-flow::before {
        left: 20px;
      }

      .monograph-timeline-entry {
        grid-template-columns: 1fr;
        gap: 12px;
        padding-left: 44px;
      }

      .timeline-era-col {
        text-align: left;
      }

      .timeline-bullet-gold {
        position: absolute;
        left: 14px;
        top: 6px;
        margin: 0;
      }

      .masthead-nav {
        display: none;
      }
    }

    @media (max-width: 640px) {
      .monograph-wrap {
        padding: 0 20px;
      }

      .exhibits-dossier-grid {
        grid-template-columns: 1fr;
      }

      .metric-broadsheet-bar {
        grid-template-columns: 1fr;
      }

      .archival-contact-section {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>

  <!-- WebGL 3D Prism Polyhedron Canvas -->
  <canvas id="swiss-monograph-canvas"></canvas>

  <div class="monograph-wrap">

    <!-- 01. Archival Masthead -->
    <header class="archival-masthead">
      <div class="masthead-inner">
        <div class="masthead-brand">
          <span class="brand-mark">CH</span>
          <span class="brand-name-title">${safeName}</span>
        </div>

        <nav class="masthead-nav">
          <a href="#exhibits">EXHIBITS</a>
          <a href="#taxonomy">TAXONOMY</a>
          <a href="#chronology">CHRONOLOGY</a>
          <a href="#dispatch">DISPATCH</a>
        </nav>

        <a href="javascript:void(0)" onclick="triggerPrintMonograph()" class="masthead-cta-btn">
          <span>PRINT DOSSIER</span>
          <span>↓</span>
        </a>
      </div>
    </header>

    <!-- 02. Monumental Broadsheet Hero -->
    <section class="monograph-hero">
      <div class="hero-broadsheet-grid">
        <div class="hero-lead-col">
          <div class="hero-folio-tag">
            <span class="folio-bullet"></span>
            <span>ISSUE NO. 2026 // MONOGRAPH RECORD</span>
          </div>

          <h1 class="hero-monumental-name">${safeName}</h1>
          <div class="hero-serif-role">${safeRole}</div>
          <p class="hero-narrative-prose">${safeBio}</p>

          <div class="hero-action-strip">
            <a href="#dispatch" class="monograph-btn vermillion">COMMISSION ENGAGEMENT ↗</a>
            <a href="#exhibits" class="monograph-btn gold">EXPLORE ARCHIVE ↓</a>
          </div>
        </div>

        <!-- Dossier Quick-Matrix -->
        <div class="hero-dossier-box">
          <div class="dossier-header">
            <span>OPERATIONAL SPECIFICATION</span>
            <span class="dossier-status-pill">ACTIVE NEXUS</span>
          </div>

          <div class="dossier-stat-grid">
            <div class="stat-metric-card">
              <div class="stat-big-val">${yearsExp}</div>
              <div class="stat-label-str">Years of Praxis</div>
            </div>
            <div class="stat-metric-card">
              <div class="stat-big-val">${projCount}</div>
              <div class="stat-label-str">Architected Artifacts</div>
            </div>
            <div class="stat-metric-card">
              <div class="stat-big-val">${totalRepos}</div>
              <div class="stat-label-str">Public Repositories</div>
            </div>
            <div class="stat-metric-card">
              <div class="stat-big-val">${certsCount}</div>
              <div class="stat-label-str">Accreditations</div>
            </div>
          </div>

          <div class="dossier-coordinates">
            <div><strong>LOCATION:</strong> ${safeLocation}</div>
            <div><strong>DISPATCH:</strong> ${safeEmail}</div>
            <div><strong>CANONICAL:</strong> ${safeWebsite || 'https://myfolio.tech'}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. Broadsheet Telemetry Metric Bar -->
    <section class="metric-broadsheet-bar">
      <div class="broadsheet-cell">
        <div class="broadsheet-num">${yearsExp}</div>
        <div class="broadsheet-text">Years Production Praxis</div>
      </div>
      <div class="broadsheet-cell">
        <div class="broadsheet-num">${projCount}</div>
        <div class="broadsheet-text">Curated Production Artifacts</div>
      </div>
      <div class="broadsheet-cell">
        <div class="broadsheet-num">${data.skills.length}</div>
        <div class="broadsheet-text">Core Competencies</div>
      </div>
      <div class="broadsheet-cell">
        <div class="broadsheet-num">99.9%</div>
        <div class="broadsheet-text">Architectural Uptime SLA</div>
      </div>
    </section>

    <!-- 04. Curated Exhibits Dossier -->
    <section id="exhibits">
      <div class="section-monograph-title">
        <div class="title-left">
          <span class="section-super-tag">INDEX OF ARCHITECTED ARTIFACTS</span>
          <h2 class="section-h2">Selected Works & Systems</h2>
        </div>
        <div class="section-right-meta">
          CATALOG NO. 01 — ${projCount} SPECIMENS
        </div>
      </div>

      <div class="exhibits-dossier-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 05. Taxonomy & Mastery Matrix -->
    <section id="taxonomy">
      <div class="section-monograph-title">
        <div class="title-left">
          <span class="section-super-tag">CORE COMPETENCIES</span>
          <h2 class="section-h2">Engineering Taxonomy</h2>
        </div>
        <div class="section-right-meta">
          VERIFIED PROFICIENCY METRIC
        </div>
      </div>

      <div class="taxonomy-matrix-grid">
        ${skillsListHtml}
      </div>
    </section>

    <!-- 06. Chronological Retrospective -->
    <section id="chronology">
      <div class="section-monograph-title">
        <div class="title-left">
          <span class="section-super-tag">CHRONOLOGICAL RETROSPECTIVE</span>
          <h2 class="section-h2">Career Trajectory</h2>
        </div>
        <div class="section-right-meta">
          MILESTONES & LEADERSHIP
        </div>
      </div>

      <div class="timeline-retrospective-flow">
        ${expRowsHtml}
      </div>
    </section>

    <!-- 07. Pedagogy & Accreditations -->
    <section class="pedagogy-duo-grid">
      <div>
        <div class="section-monograph-title" style="padding-top: 0; margin-bottom: 24px;">
          <div class="title-left">
            <span class="section-super-tag">FORMAL PEDAGOGY</span>
            <h2 class="section-h2" style="font-size: 1.8rem;">Academic Credentials</h2>
          </div>
        </div>
        ${eduRowsHtml}
      </div>

      <div>
        <div class="section-monograph-title" style="padding-top: 0; margin-bottom: 24px;">
          <div class="title-left">
            <span class="section-super-tag">HONORS & STANDARDS</span>
            <h2 class="section-h2" style="font-size: 1.8rem;">Accreditations</h2>
          </div>
        </div>
        <div class="certs-foil-list">
          ${certBadgesHtml}
        </div>
      </div>
    </section>

    <!-- 08. Archival Dispatch Contact -->
    <section id="dispatch" class="archival-contact-section">
      <div class="contact-broadsheet-layout">
        <div class="contact-manifesto">
          <span class="section-super-tag">INITIATE CORRESPONDENCE</span>
          <h3>Commission a Consultation</h3>
          <p>Available for high-stakes technical architecture, advisory engagements, and groundbreaking engineering initiatives globally.</p>

          <div class="contact-coordinates-list">
            <div class="coord-item">
              <span>DIRECT INBOX:</span>
              <a href="mailto:${safeEmail}">${safeEmail}</a>
            </div>
            ${safeGithub ? `
              <div class="coord-item">
                <span>GITHUB MONOGRAPH:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener">${safeGithub}</a>
              </div>
            ` : ''}
            ${safeLinkedin ? `
              <div class="coord-item">
                <span>PROFESSIONAL CITATION:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener">${safeLinkedin}</a>
              </div>
            ` : ''}
          </div>
        </div>

        <form class="contact-form-monograph" onsubmit="handleMonographSend(event)">
          <div class="form-group-archival">
            <label>CORRESPONDENT IDENTITY</label>
            <input type="text" placeholder="Your Full Name or Agency" required />
          </div>

          <div class="form-group-archival">
            <label>DIRECT ELECTRONIC ADDRESS</label>
            <input type="email" placeholder="name@organization.com" required />
          </div>

          <div class="form-group-archival">
            <label>BRIEF / PROPOSAL DISPATCH</label>
            <textarea rows="4" placeholder="Detail the scope of the prospective engagement..." required></textarea>
          </div>

          <button type="submit" class="monograph-btn vermillion" style="align-self: flex-start; margin-top: 10px;">
            DISPATCH CORRESPONDENCE ↗
          </button>
        </form>
      </div>
    </section>

    <!-- 09. Colophon -->
    <footer class="monograph-colophon">
      <div>
        <span>SWISS EDITORIAL MONOGRAPH // NO. 2026.09</span>
      </div>
      <div class="colophon-creds">
        <span>Curated for ${safeName} • Generated via MyFolio Architecture</span>
      </div>
    </footer>

  </div>

  <script>
    // 3D WebGL Origami Prism Canvas
    function initMonograph3D() {
      const canvas = document.getElementById('swiss-monograph-canvas');
      if (!canvas || !window.THREE) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 24;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Central Origami Prism (Icosahedron / Dodecahedron wireframe + solid)
      const prismGeo = new THREE.IcosahedronGeometry(7, 0);
      const prismMat = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      });
      const prismMesh = new THREE.Mesh(prismGeo, prismMat);
      scene.add(prismMesh);

      // Inner Vermillion Core
      const innerGeo = new THREE.OctahedronGeometry(3.5, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xE63946,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // Ambient Dust Particles
      const partCount = 120;
      const partGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(partCount * 3);
      for (let i = 0; i < partCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 60;
        posArray[i + 1] = (Math.random() - 0.5) * 60;
        posArray[i + 2] = (Math.random() - 0.5) * 30;
      }
      partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const partMat = new THREE.PointsMaterial({
        size: 0.18,
        color: 0xF4F2EB,
        transparent: true,
        opacity: 0.35
      });
      const particleField = new THREE.Points(partGeo, partMat);
      scene.add(particleField);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        prismMesh.rotation.x += 0.002;
        prismMesh.rotation.y += 0.003;
        innerMesh.rotation.x -= 0.003;
        innerMesh.rotation.y -= 0.004;

        prismMesh.position.x += (mouseX * 2 - prismMesh.position.x) * 0.04;
        prismMesh.position.y += (-mouseY * 2 - prismMesh.position.y) * 0.04;
        innerMesh.position.x = prismMesh.position.x;
        innerMesh.position.y = prismMesh.position.y;

        particleField.rotation.y += 0.0006;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    function triggerPrintMonograph() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 70, colors: ['#E63946', '#D4AF37', '#F4F2EB'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleMonographSend(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 }, colors: ['#E63946', '#D4AF37'] });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>DISPATCH RECORDED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initMonograph3D();

      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.hero-monumental-name', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out' });
        gsap.from('.hero-dossier-box', { opacity: 0, x: 40, duration: 1.2, delay: 0.2, ease: 'power3.out' });
        gsap.from('.monograph-exhibit-card', {
          scrollTrigger: { trigger: '#exhibits', start: 'top 80%' },
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out'
        });
      }
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { SwissEditorialMonographTemplate };

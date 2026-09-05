/**
 * Template: SOLARPUNK HORIZON
 * Aesthetic: Luminous Solarpunk • Biophilic Glasshouse • Aerodynamic Solar Architecture • Verdant Flora & Sun Gold
 * Palette: Alabaster Sunstone (#F6F4ED), Frosted Glass (rgba(255,255,255,0.85)), Solar Gold Amber (#F59E0B, #EAB308), Verdant Moss Green (#059669, #10B981), Midnight Slate (#0F172A), Terrene Sand (#475569).
 * Motifs: Curved solar sail pavilions, frosted biophilic glass, photosynthetic growth telemetry, clean energy metrics, and golden solar ray particle field.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const SolarpunkHorizonTemplate = {
  id: 'solarpunk-horizon',
  name: 'Solarpunk Horizon',
  category: 'Luminous Solarpunk / Biophilic Glasshouse / Solar Architecture',
  description: 'An optimistic, sun-drenched Solarpunk future. Clean curved solar sail architecture, frosted biophilic glasshouse cards, renewable energy telemetry metrics, and an interactive golden solar particle ray field.',
  recommendedFor: ['Climate Tech Engineer', 'Clean Energy Developer', 'Sustainable AI Researcher', 'Full Stack Innovator', 'Next-Gen Frontend Artisan'],
  palette: ['#F6F4ED', '#F59E0B', '#059669', '#0284C7', '#0F172A'],
  thumbnail: '/assets/3d/crystal_leaf_hand_3d.jpg',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Solar Sanctuary / Global');
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const yearsExp = data.experience?.length ? `${Math.max(data.experience.length * 2, 3)}+` : '3+';
    const projCount = data.projects?.length || 6;
    const certsCount = data.certifications?.length || 3;
    const totalRepos = data.publicRepos ?? projCount;

    // 01. Greenhouse Projects Conservatory
    const assignedArtworks = new Set(['/assets/3d/crystal_leaf_hand_3d.jpg', '/assets/3d/steampunk_satellite_bird_3d.jpg', '/assets/3d/chrono_obsidian_sanctuary_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="solar-flora-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="greenhouse-project-card" data-idx="${idx}">
          <div class="card-glass-header">
            <div class="bio-specimen-badge">
              <span class="sun-icon">☀️</span>
              <span>BIO-SYSTEM // NO. ${projNum}</span>
            </div>
            <span class="card-biome-tag">${TemplateHelper.escapeHtml(p.category || 'Renewable Architecture')}</span>
          </div>

          <div class="card-glass-canopy">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'solarpunk-horizon', idx, assignedArtworks, userSeed)}
            <div class="canopy-sun-overlay"></div>
          </div>

          <div class="card-glass-body">
            <h3 class="card-solar-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="card-solar-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="card-tech-grove">
              ${techTags}
            </div>

            <div class="card-solar-actions">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="solar-btn amber"><span>LAUNCH ECOSYSTEM ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="solar-btn green"><span>SOURCE REPO ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 02. Photosynthetic Skills Flora
    const skillsListHtml = data.skills.map((s, idx) => {
      const vitality = 85 + ((idx * 4) % 15);
      return `
        <div class="photosynthetic-skill-pod">
          <div class="pod-header">
            <span class="pod-leaf-symbol">🌿</span>
            <span class="pod-skill-title">${TemplateHelper.escapeHtml(s)}</span>
            <span class="pod-vitality-val">${vitality}% FLUX</span>
          </div>
          <div class="pod-growth-track">
            <div class="pod-growth-fill" style="width: ${vitality}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 03. Sustainable Growth Career Timeline
    const expRowsHtml = (data.experience || []).map((exp, idx) => {
      const eraNum = String(idx + 1).padStart(2, '0');
      return `
        <div class="growth-cycle-step">
          <div class="step-solar-dial">
            <span class="dial-num">${eraNum}</span>
            <span class="dial-year">${TemplateHelper.escapeHtml(exp.period || 'Continuous')}</span>
          </div>
          <div class="step-growth-vine"></div>
          <div class="step-glasshouse-cell">
            <h4 class="cell-role-title">${TemplateHelper.escapeHtml(exp.role || exp.title)}</h4>
            <div class="cell-organization">🏛️ ${TemplateHelper.escapeHtml(exp.company)}</div>
            <p class="cell-narrative">${TemplateHelper.escapeHtml(exp.desc || exp.summary || '')}</p>
          </div>
        </div>
      `;
    }).join('');

    // 04. Academic & Ecological Accreditations
    const eduRowsHtml = (data.education || []).map(edu => `
      <div class="pedagogy-solar-pod">
        <h4 class="solar-edu-degree">${TemplateHelper.escapeHtml(edu.degree || 'B.S. in Computer Science')}</h4>
        <div class="solar-edu-inst">${TemplateHelper.escapeHtml(edu.institution)}</div>
        ${edu.grade ? `<div class="solar-edu-grade">GRADE COHORT: ${TemplateHelper.escapeHtml(edu.grade)}</div>` : ''}
      </div>
    `).join('');

    const certBadgesHtml = (data.certifications || []).map(c => `
      <div class="solar-cert-chip">
        <span class="chip-sun-star">✦</span>
        <div class="chip-info">
          <div class="chip-cert-name">${TemplateHelper.escapeHtml(c.name)}</div>
          <div class="chip-cert-issuer">${TemplateHelper.escapeHtml(c.issuer || 'Solar Authority')}</div>
        </div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Solarpunk Horizon</title>
  <meta name="description" content="${safeBio.substring(0, 160)}">
  
  <!-- Modern Typography: Outfit, Space Mono, Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    :root {
      --bg-sunstone: #F6F4ED;
      --bg-glass: rgba(255, 255, 255, 0.88);
      --bg-glass-card: rgba(255, 255, 255, 0.76);
      --border-solar: rgba(245, 158, 11, 0.28);
      --border-flora: rgba(5, 150, 105, 0.24);
      --border-glass: rgba(255, 255, 255, 0.6);
      --solar-amber: #F59E0B;
      --solar-gold: #EAB308;
      --moss-green: #059669;
      --mint-flora: #10B981;
      --sky-azure: #0284C7;
      --slate-midnight: #0F172A;
      --terrene-sand: #475569;
      --text-muted: #64748B;
      --container-max: 1340px;
      --font-display: 'Outfit', sans-serif;
      --font-mono: 'Space Mono', monospace;
      --font-body: 'Inter', sans-serif;
      --shadow-glass: 0 16px 40px -10px rgba(245, 158, 11, 0.12), 0 8px 24px -6px rgba(5, 150, 105, 0.08);
      --transition-organic: cubic-bezier(0.16, 1, 0.3, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      background-color: var(--bg-sunstone);
      color: var(--slate-midnight);
      font-family: var(--font-body);
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--bg-sunstone);
      overflow-x: hidden;
      line-height: 1.6;
      position: relative;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Fixed WebGL Solar Particle Ray Canvas */
    #solarpunk-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.9;
    }

    .solarpunk-wrap {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 36px;
    }

    /* 01. Solar Sail Glass Navigation */
    .solar-nav-bar {
      position: sticky;
      top: 16px;
      z-index: 100;
      margin-bottom: 30px;
    }

    .solar-nav-glass {
      background: var(--bg-glass);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border-solar);
      border-radius: 999px;
      padding: 14px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-glass);
    }

    .solar-brand-pod {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--slate-midnight);
      letter-spacing: -0.01em;
    }

    .solar-emblem-badge {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--solar-amber), var(--mint-flora));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.95rem;
      box-shadow: 0 0 14px rgba(245, 158, 11, 0.4);
    }

    .solar-nav-links {
      display: flex;
      gap: 28px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .solar-nav-links a {
      color: var(--terrene-sand);
      transition: color 0.2s;
    }

    .solar-nav-links a:hover {
      color: var(--moss-green);
    }

    .solar-cta-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--slate-midnight);
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      padding: 9px 20px;
      border-radius: 999px;
      transition: all 0.3s var(--transition-organic);
    }

    .solar-cta-pill:hover {
      background: var(--moss-green);
      box-shadow: 0 4px 18px rgba(5, 150, 105, 0.35);
      transform: translateY(-1px);
    }

    /* 02. Sun-Drenched Biophilic Hero */
    .solarpunk-hero {
      padding: 40px 0 60px;
    }

    .hero-canopy-grid {
      display: grid;
      grid-template-columns: 1.35fr 1fr;
      gap: 48px;
      align-items: center;
    }

    .hero-solar-lead {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .solar-telemetry-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid var(--border-solar);
      padding: 6px 16px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--moss-green);
      width: fit-content;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .telemetry-pulse {
      width: 7px;
      height: 7px;
      background: var(--mint-flora);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--mint-flora);
      animation: pulseGlow 2s infinite;
    }

    @keyframes pulseGlow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.3); }
    }

    .hero-solar-headline {
      font-family: var(--font-display);
      font-size: clamp(3rem, 6.5vw, 5.2rem);
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.04em;
      color: var(--slate-midnight);
    }

    .hero-solar-sub {
      font-family: var(--font-display);
      font-size: clamp(1.4rem, 2.8vw, 2.2rem);
      font-weight: 700;
      color: var(--moss-green);
      line-height: 1.25;
    }

    .hero-solar-prose {
      font-size: 1.15rem;
      color: var(--terrene-sand);
      line-height: 1.7;
      max-width: 580px;
    }

    .hero-solar-actions {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .solar-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 16px 32px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border-radius: 12px;
      transition: all 0.3s var(--transition-organic);
      cursor: pointer;
    }

    .solar-btn.amber {
      background: linear-gradient(135deg, var(--solar-amber), var(--solar-gold));
      color: #fff;
      box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
    }

    .solar-btn.amber:hover {
      box-shadow: 0 12px 32px rgba(245, 158, 11, 0.45);
      transform: translateY(-2px);
    }

    .solar-btn.green {
      background: var(--bg-glass);
      color: var(--slate-midnight);
      border: 1px solid var(--border-flora);
    }

    .solar-btn.green:hover {
      background: #fff;
      border-color: var(--moss-green);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(5, 150, 105, 0.15);
    }

    /* Solarpunk Glass Pavilion (Right Hero Card) */
    .hero-glass-pavilion {
      background: var(--bg-glass-card);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-solar);
      border-radius: 32px;
      padding: 40px;
      box-shadow: var(--shadow-glass);
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .pavilion-telemetry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--terrene-sand);
      border-bottom: 1px solid rgba(245, 158, 11, 0.2);
      padding-bottom: 16px;
    }

    .pavilion-stat-triad {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .stat-pavilion-cell {
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid var(--border-solar);
      border-radius: 20px;
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-cell-num {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--slate-midnight);
      line-height: 1;
    }

    .stat-cell-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--terrene-sand);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pavilion-solar-flux-meter {
      background: rgba(5, 150, 105, 0.08);
      border: 1px solid var(--border-flora);
      border-radius: 18px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
    }

    .flux-bar-track {
      height: 6px;
      background: rgba(5, 150, 105, 0.15);
      border-radius: 999px;
      overflow: hidden;
    }

    .flux-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--mint-flora), var(--solar-gold));
      border-radius: 999px;
    }

    /* 03. Telemetry HUD Ribbon */
    .solar-telemetry-ribbon {
      background: var(--bg-glass-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-solar);
      border-radius: 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 26px 36px;
      margin: 40px 0 70px;
      box-shadow: var(--shadow-glass);
      gap: 20px;
    }

    .telemetry-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .telemetry-val {
      font-family: var(--font-display);
      font-size: 2.3rem;
      font-weight: 800;
      color: var(--slate-midnight);
    }

    .telemetry-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--moss-green);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* 04. Section Header */
    .solar-section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 40px;
    }

    .solar-section-tag {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--solar-amber);
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .solar-section-h2 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3.8vw, 3rem);
      font-weight: 800;
      color: var(--slate-midnight);
      letter-spacing: -0.02em;
    }

    .solar-section-meta {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--terrene-sand);
    }

    /* 05. Greenhouse Conservatory Projects Grid */
    .greenhouse-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 36px;
      margin-bottom: 90px;
    }

    .greenhouse-project-card {
      background: var(--bg-glass-card);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border-glass);
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-glass);
      transition: all 0.4s var(--transition-organic);
    }

    .greenhouse-project-card:hover {
      border-color: var(--solar-amber);
      transform: translateY(-8px);
      box-shadow: 0 24px 50px -10px rgba(245, 158, 11, 0.22);
    }

    .card-glass-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 24px;
      background: rgba(255, 255, 255, 0.6);
      border-bottom: 1px solid rgba(245, 158, 11, 0.12);
      font-family: var(--font-mono);
      font-size: 0.75rem;
    }

    .bio-specimen-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--moss-green);
      font-weight: 700;
    }

    .card-biome-tag {
      color: var(--terrene-sand);
      text-transform: uppercase;
      font-size: 0.72rem;
    }

    .card-glass-canopy {
      position: relative;
      background: #e2ded5;
      min-height: 230px;
      overflow: hidden;
    }

    .canopy-sun-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(245, 158, 11, 0.05) 0%, rgba(5, 150, 105, 0.1) 100%);
      pointer-events: none;
    }

    .card-glass-body {
      padding: 30px 28px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 16px;
    }

    .card-solar-title {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--slate-midnight);
      line-height: 1.25;
    }

    .card-solar-desc {
      font-size: 0.95rem;
      color: var(--terrene-sand);
      line-height: 1.65;
    }

    .card-tech-grove {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
      padding-top: 10px;
    }

    .solar-flora-pill {
      background: rgba(5, 150, 105, 0.08);
      border: 1px solid var(--border-flora);
      color: var(--moss-green);
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 999px;
    }

    .card-solar-actions {
      display: flex;
      gap: 12px;
      padding-top: 14px;
    }

    .card-solar-actions .solar-btn {
      padding: 10px 18px;
      font-size: 0.76rem;
      flex: 1;
      border-radius: 10px;
    }

    /* 06. Photosynthetic Skills Grid */
    .skills-photosynthesis-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 90px;
    }

    .photosynthetic-skill-pod {
      background: var(--bg-glass-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-flora);
      border-radius: 20px;
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: var(--shadow-glass);
    }

    .pod-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .pod-leaf-symbol {
      font-size: 1.1rem;
    }

    .pod-skill-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--slate-midnight);
    }

    .pod-vitality-val {
      margin-left: auto;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--moss-green);
    }

    .pod-growth-track {
      height: 6px;
      background: rgba(5, 150, 105, 0.12);
      border-radius: 999px;
      overflow: hidden;
    }

    .pod-growth-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--mint-flora), var(--solar-amber));
      border-radius: 999px;
    }

    /* 07. Sustainable Career Milestones */
    .sustainable-growth-flow {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin-bottom: 90px;
      position: relative;
    }

    .sustainable-growth-flow::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 170px;
      width: 2px;
      background: linear-gradient(180deg, var(--solar-amber), var(--mint-flora));
    }

    .growth-cycle-step {
      display: grid;
      grid-template-columns: 140px 60px 1fr;
      align-items: start;
      position: relative;
    }

    .step-solar-dial {
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .dial-num {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--solar-amber);
    }

    .dial-year {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--terrene-sand);
    }

    .step-growth-vine {
      width: 14px;
      height: 14px;
      background: #fff;
      border: 3px solid var(--moss-green);
      border-radius: 50%;
      margin: 6px auto 0;
      z-index: 2;
      box-shadow: 0 0 10px rgba(5, 150, 105, 0.4);
    }

    .step-glasshouse-cell {
      background: var(--bg-glass-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-glass);
      border-radius: 20px;
      padding: 26px 30px;
      box-shadow: var(--shadow-glass);
    }

    .cell-role-title {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--slate-midnight);
    }

    .cell-organization {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--moss-green);
      font-weight: 700;
      margin: 4px 0 10px;
    }

    .cell-narrative {
      color: var(--terrene-sand);
      font-size: 0.95rem;
      line-height: 1.65;
    }

    /* 08. Pedagogy & Accreditations */
    .solar-duo-pedagogy {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 90px;
    }

    .pedagogy-solar-pod {
      background: var(--bg-glass-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-solar);
      border-radius: 20px;
      padding: 24px 28px;
      margin-bottom: 16px;
      box-shadow: var(--shadow-glass);
    }

    .solar-edu-degree {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--slate-midnight);
    }

    .solar-edu-inst {
      color: var(--terrene-sand);
      font-size: 0.95rem;
      margin: 4px 0;
    }

    .solar-edu-grade {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--solar-amber);
      font-weight: 700;
    }

    .solar-certs-container {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .solar-cert-chip {
      background: var(--bg-glass-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-flora);
      border-radius: 18px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-glass);
    }

    .chip-sun-star {
      color: var(--solar-amber);
      font-size: 1.3rem;
    }

    .chip-cert-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--slate-midnight);
    }

    .chip-cert-issuer {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--moss-green);
    }

    /* 09. Solar Contact Hub */
    .solar-contact-hub {
      background: var(--bg-glass-card);
      backdrop-filter: blur(28px);
      border: 1px solid var(--border-solar);
      border-radius: 36px;
      padding: 60px 50px;
      margin-bottom: 90px;
      box-shadow: var(--shadow-glass);
    }

    .hub-grid-layout {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      gap: 60px;
    }

    .hub-manifesto h3 {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--slate-midnight);
      line-height: 1.1;
      margin-bottom: 16px;
    }

    .hub-manifesto p {
      color: var(--terrene-sand);
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    .hub-coordinates {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .hub-coord-row {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--terrene-sand);
    }

    .hub-coord-row a {
      color: var(--moss-green);
      font-weight: 700;
      transition: color 0.2s;
    }

    .hub-coord-row a:hover {
      color: var(--solar-amber);
    }

    .solar-form-element {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .solar-input-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .solar-input-group label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--moss-green);
      text-transform: uppercase;
    }

    .solar-input-group input,
    .solar-input-group textarea {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid var(--border-solar);
      border-radius: 12px;
      padding: 14px 18px;
      font-family: var(--font-body);
      font-size: 0.95rem;
      color: var(--slate-midnight);
      outline: none;
      transition: border-color 0.2s;
    }

    .solar-input-group input:focus,
    .solar-input-group textarea:focus {
      border-color: var(--moss-green);
    }

    /* 10. Colophon */
    .solar-colophon {
      border-top: 1px solid var(--border-solar);
      padding: 36px 0 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    @media (max-width: 992px) {
      .hero-canopy-grid,
      .hub-grid-layout,
      .solar-duo-pedagogy {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .solar-telemetry-ribbon {
        grid-template-columns: 1fr 1fr;
      }

      .sustainable-growth-flow::before {
        left: 20px;
      }

      .growth-cycle-step {
        grid-template-columns: 1fr;
        gap: 12px;
        padding-left: 44px;
      }

      .step-solar-dial {
        text-align: left;
      }

      .step-growth-vine {
        position: absolute;
        left: 14px;
        top: 6px;
        margin: 0;
      }

      .solar-nav-links {
        display: none;
      }
    }

    @media (max-width: 640px) {
      .solarpunk-wrap {
        padding: 0 18px;
      }

      .greenhouse-projects-grid {
        grid-template-columns: 1fr;
      }

      .solar-telemetry-ribbon {
        grid-template-columns: 1fr;
      }

      .solar-contact-hub {
        padding: 32px 20px;
      }
    }
  </style>
</head>
<body>

  <!-- WebGL Solar Ray & Flora Particle Field Canvas -->
  <canvas id="solarpunk-canvas"></canvas>

  <div class="solarpunk-wrap">

    <!-- 01. Solar Sail Navigation -->
    <nav class="solar-nav-bar">
      <div class="solar-nav-glass">
        <div class="solar-brand-pod">
          <div class="solar-emblem-badge">☀️</div>
          <span>${safeName}</span>
        </div>

        <div class="solar-nav-links">
          <a href="#ecosystem">ECOSYSTEM</a>
          <a href="#vitality">VITALITY</a>
          <a href="#growth">GROWTH</a>
          <a href="#dispatch">DISPATCH</a>
        </div>

        <a href="javascript:void(0)" onclick="triggerPrintSolar()" class="solar-cta-pill">
          <span>CURRICULUM VITAE</span>
          <span>↓</span>
        </a>
      </div>
    </nav>

    <!-- 02. Sun-Drenched Hero -->
    <section class="solarpunk-hero">
      <div class="hero-canopy-grid">
        <div class="hero-solar-lead">
          <div class="solar-telemetry-badge">
            <span class="telemetry-pulse"></span>
            <span>SOLARPUNK ARCHITECT // RECIPIENT 2026</span>
          </div>

          <h1 class="hero-solar-headline">${safeName}</h1>
          <div class="hero-solar-sub">${safeRole}</div>
          <p class="hero-solar-prose">${safeBio}</p>

          <div class="hero-solar-actions">
            <a href="#dispatch" class="solar-btn amber">INITIATE COLLABORATION ↗</a>
            <a href="#ecosystem" class="solar-btn green">EXPLORE GREENHOUSE ↓</a>
          </div>
        </div>

        <!-- Right Pavilion HUD Box -->
        <div class="hero-glass-pavilion">
          <div class="pavilion-telemetry-header">
            <span>BIOPHILIC TELEMETRY</span>
            <span style="color: var(--moss-green); font-weight: 700;">STABLE FLUX</span>
          </div>

          <div class="pavilion-stat-triad">
            <div class="stat-pavilion-cell">
              <span class="stat-cell-num">${yearsExp}</span>
              <span class="stat-cell-label">Years Ecological Praxis</span>
            </div>
            <div class="stat-pavilion-cell">
              <span class="stat-cell-num">${projCount}</span>
              <span class="stat-cell-label">Live Systems Deployed</span>
            </div>
            <div class="stat-pavilion-cell">
              <span class="stat-cell-num">${totalRepos}</span>
              <span class="stat-cell-label">Public Repositories</span>
            </div>
            <div class="stat-pavilion-cell">
              <span class="stat-cell-num">${certsCount}</span>
              <span class="stat-cell-label">Industry Standards</span>
            </div>
          </div>

          <div class="pavilion-solar-flux-meter">
            <div style="display: flex; justify-content: space-between;">
              <span>PHOTOVOLTAIC ARCHITECTURE HEALTH</span>
              <span style="color: var(--moss-green); font-weight: 700;">99.4% OPTIMAL</span>
            </div>
            <div class="flux-bar-track">
              <div class="flux-bar-fill" style="width: 94%;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. Telemetry HUD Ribbon -->
    <section class="solar-telemetry-ribbon">
      <div class="telemetry-col">
        <div class="telemetry-val">${yearsExp}</div>
        <div class="telemetry-tag">Years Active Engineering</div>
      </div>
      <div class="telemetry-col">
        <div class="telemetry-val">${projCount}</div>
        <div class="telemetry-tag">Engineered Artifacts</div>
      </div>
      <div class="telemetry-col">
        <div class="telemetry-val">${data.skills.length}</div>
        <div class="telemetry-tag">Technologies Mastered</div>
      </div>
      <div class="telemetry-col">
        <div class="telemetry-val">100%</div>
        <div class="telemetry-tag">Clean Energy Powered</div>
      </div>
    </section>

    <!-- 04. Greenhouse Conservatory Projects -->
    <section id="ecosystem">
      <div class="solar-section-header">
        <div>
          <div class="solar-section-tag">CURATED ECOSYSTEM ARTIFACTS</div>
          <h2 class="solar-section-h2">Architected Systems</h2>
        </div>
        <div class="solar-section-meta">
          CONSERVATORY CATALOG // ${projCount} SPECIMENS
        </div>
      </div>

      <div class="greenhouse-projects-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 05. Photosynthetic Skills Flora -->
    <section id="vitality">
      <div class="solar-section-header">
        <div>
          <div class="solar-section-tag">COMPETENCY FLUX</div>
          <h2 class="solar-section-h2">Technical Taxonomy</h2>
        </div>
        <div class="solar-section-meta">
          PHOTOSYNTHETIC PROFICIENCY
        </div>
      </div>

      <div class="skills-photosynthesis-grid">
        ${skillsListHtml}
      </div>
    </section>

    <!-- 06. Sustainable Growth Chronology -->
    <section id="growth">
      <div class="solar-section-header">
        <div>
          <div class="solar-section-tag">ECOLOGICAL CHRONOLOGY</div>
          <h2 class="solar-section-h2">Career Trajectory</h2>
        </div>
        <div class="solar-section-meta">
          GROWTH & IMPACT MILESTONES
        </div>
      </div>

      <div class="sustainable-growth-flow">
        ${expRowsHtml}
      </div>
    </section>

    <!-- 07. Pedagogy & Accreditations -->
    <section class="solar-duo-pedagogy">
      <div>
        <div class="solar-section-header" style="margin-bottom: 24px;">
          <div>
            <div class="solar-section-tag">FORMAL ACCREDITATION</div>
            <h2 class="solar-section-h2" style="font-size: 1.8rem;">Pedagogy</h2>
          </div>
        </div>
        ${eduRowsHtml}
      </div>

      <div>
        <div class="solar-section-header" style="margin-bottom: 24px;">
          <div>
            <div class="solar-section-tag">VERIFIED MASTERY</div>
            <h2 class="solar-section-h2" style="font-size: 1.8rem;">Accreditations</h2>
          </div>
        </div>
        <div class="solar-certs-container">
          ${certBadgesHtml}
        </div>
      </div>
    </section>

    <!-- 08. Solar Contact Hub -->
    <section id="dispatch" class="solar-contact-hub">
      <div class="hub-grid-layout">
        <div class="hub-manifesto">
          <div class="solar-section-tag">DIRECT CONNECTION</div>
          <h3>Build Sustainable Futures Together</h3>
          <p>Open for visionary engineering initiatives, climate technology platforms, clean energy applications, and resilient technical leadership.</p>

          <div class="hub-coordinates">
            <div class="hub-coord-row">
              <span>SOLAR INBOX:</span>
              <a href="mailto:${safeEmail}">${safeEmail}</a>
            </div>
            ${safeGithub ? `
              <div class="hub-coord-row">
                <span>GITHUB ECOSYSTEM:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener">${safeGithub}</a>
              </div>
            ` : ''}
            ${safeLinkedin ? `
              <div class="hub-coord-row">
                <span>PROFESSIONAL CITATION:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener">${safeLinkedin}</a>
              </div>
            ` : ''}
          </div>
        </div>

        <form class="solar-form-element" onsubmit="handleSolarSend(event)">
          <div class="solar-input-group">
            <label>YOUR NAME OR INITIATIVE</label>
            <input type="text" placeholder="Dr. Jane Doe / Earth Innovations" required />
          </div>

          <div class="solar-input-group">
            <label>COMMUNICATION CHANNEL</label>
            <input type="email" placeholder="contact@sustainable.earth" required />
          </div>

          <div class="solar-input-group">
            <label>PROJECT DISPATCH OR INQUIRY</label>
            <textarea rows="4" placeholder="Describe the mission, timeline, or engineering goals..." required></textarea>
          </div>

          <button type="submit" class="solar-btn amber" style="align-self: flex-start; margin-top: 10px;">
            SEND DISPATCH ↗
          </button>
        </form>
      </div>
    </section>

    <!-- 09. Colophon -->
    <footer class="solar-colophon">
      <div>
        <span>SOLARPUNK HORIZON // REVISION 2026.09</span>
      </div>
      <div>
        <span>Curated for ${safeName} • Powered by Clean Web Architecture</span>
      </div>
    </footer>

  </div>

  <script>
    // 3D WebGL Solar Particle Ray Field Canvas
    function initSolarpunk3D() {
      const canvas = document.getElementById('solarpunk-canvas');
      if (!canvas || !window.THREE) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Central Golden Solar Geometric Ring
      const ringGeo = new THREE.TorusGeometry(8, 0.25, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      scene.add(ringMesh);

      // Secondary Emerald Biosphere Ring
      const bioRingGeo = new THREE.TorusGeometry(11, 0.15, 16, 100);
      const bioRingMat = new THREE.MeshBasicMaterial({
        color: 0x10B981,
        transparent: true,
        opacity: 0.25
      });
      const bioRingMesh = new THREE.Mesh(bioRingGeo, bioRingMat);
      scene.add(bioRingMesh);

      // Photosynthetic Dust Particles
      const particleCount = 180;
      const partGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 80;
        positions[i + 2] = (Math.random() - 0.5) * 40;
      }
      partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const partMat = new THREE.PointsMaterial({
        size: 0.28,
        color: 0xEAB308,
        transparent: true,
        opacity: 0.5
      });
      const particleCloud = new THREE.Points(partGeo, partMat);
      scene.add(particleCloud);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        ringMesh.rotation.x += 0.003;
        ringMesh.rotation.y += 0.004;
        bioRingMesh.rotation.x -= 0.002;
        bioRingMesh.rotation.y -= 0.003;

        ringMesh.position.x += (mouseX * 3 - ringMesh.position.x) * 0.03;
        ringMesh.position.y += (-mouseY * 3 - ringMesh.position.y) * 0.03;
        bioRingMesh.position.x = ringMesh.position.x;
        bioRingMesh.position.y = ringMesh.position.y;

        particleCloud.rotation.y += 0.0008;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    function triggerPrintSolar() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 75, spread: 65, colors: ['#F59E0B', '#10B981', '#EAB308'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleSolarSend(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 85, origin: { y: 0.6 }, colors: ['#F59E0B', '#059669', '#10B981'] });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>DISPATCH HARVESTED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initSolarpunk3D();

      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.hero-solar-headline', { opacity: 0, y: 35, duration: 1.1, ease: 'power3.out' });
        gsap.from('.hero-glass-pavilion', { opacity: 0, x: 35, duration: 1.1, delay: 0.15, ease: 'power3.out' });
        gsap.from('.greenhouse-project-card', {
          scrollTrigger: { trigger: '#ecosystem', start: 'top 80%' },
          opacity: 0,
          y: 45,
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out'
        });
      }
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { SolarpunkHorizonTemplate };

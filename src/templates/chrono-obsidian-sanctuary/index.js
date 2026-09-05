/**
 * Template: CHRONO-OBSIDIAN STEAMPUNK SANCTUARY
 * Aesthetic: Dark Slate Obsidian • Polished Brass Clockwork • Glowing Amber Crystal Spire • Curio Glass Shadowboxes • Ancient Stonecraft
 * Palette: Slate Obsidian (#0D1017, #141923), Polished Brass (#C88A3E), Glowing Amber (#F59E0B, #FBBF24), Weathered Copper (#7D533E), Ghost White (#F1F5F9).
 * Motifs: Carved stone tablets, rotating brass clockwork gears, glowing amber crystal monoliths, curio glass display cases, bronze tree of life, and astrolabe dials.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const ChronoObsidianSanctuaryTemplate = {
  id: 'chrono-obsidian-sanctuary',
  name: 'Chrono-Obsidian Sanctuary',
  category: 'Dark Slate Obsidian / Steampunk Brass / Amber Crystal',
  description: 'An ancient, high-craft aesthetic inspired by carved dark obsidian stonecraft, intricate brass clockwork gears, and illuminated amber crystal spires. Curio glass display shadowboxes, basalt tree of life chronology, and engraved stone resume tablets.',
  recommendedFor: ['Robotic Systems Architect', 'High-Performance Systems Engineer', 'Senior Backend Architect', 'AI & Hardware Engineer', 'Full Stack Artisan'],
  palette: ['#0D1017', '#141923', '#C88A3E', '#F59E0B', '#FBBF24', '#F1F5F9'],
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
    const certsCount = data.certifications?.length || 4;
    const awardsCount = Math.max(2, Math.floor(projCount / 2));
    const totalRepos = data.publicRepos ?? projCount;

    // 03. Curio Projects Specimen Shadowboxes
    const assignedArtworks = new Set(['/assets/3d/chrono_obsidian_sanctuary_3d.jpg', '/assets/3d/crystal_leaf_hand_3d.jpg', '/assets/3d/steampunk_satellite_bird_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="curio-tech-pill">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="curio-specimen-box">
          <div class="curio-box-header">
            <span class="curio-specimen-id">SPECIMEN // NO. ${projNum}</span>
            <span class="curio-gear-icon">⚙</span>
          </div>

          <div class="curio-glass-chamber">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'chrono-obsidian-sanctuary', idx, assignedArtworks, userSeed)}
          </div>

          <div class="curio-box-body">
            <div class="curio-category-badge">${TemplateHelper.escapeHtml(p.category || 'Engineered Artifact')}</div>
            <h3 class="curio-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="curio-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="curio-tech-row">
              ${techTags}
            </div>

            <div class="curio-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="sanctuary-btn primary"><span>LIVE DEMO ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="sanctuary-btn secondary"><span>SOURCE CODE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Skills Obelisk and Slider Rows
    const skillsListHtml = data.skills.map((s, idx) => {
      const pct = 86 + ((idx * 4) % 13);
      return `
        <div class="sanctuary-skill-slider-row">
          <div class="slider-label-strip">
            <span class="slider-skill-name">⚙ ${TemplateHelper.escapeHtml(s)}</span>
            <span class="slider-pct-val">${pct}%</span>
          </div>
          <div class="slider-track-brass">
            <div class="slider-fill-amber" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 05. Experience Tree of Life Milestones
    const experienceHtml = data.experience.map((exp, idx) => {
      const periodStr = TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT');
      return `
        <div class="tree-milestone-plaque">
          <div class="plaque-top-meta">
            <span class="plaque-timestamp">✦ ${periodStr}</span>
            <span class="plaque-rank">CHRONO-RECORD 0${idx + 1}</span>
          </div>
          <h3 class="plaque-role-title">${TemplateHelper.escapeHtml(exp.role)}</h3>
          <div class="plaque-company-sub">@ ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
          <p class="plaque-desc-text">${TemplateHelper.escapeHtml(exp.desc)}</p>
          ${exp.technologies ? `
            <div class="plaque-tech-strip">
              <span class="plaque-tech-label">ENGINES //</span>
              <span class="plaque-tech-val">${TemplateHelper.escapeHtml(exp.technologies)}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Focus specializations for 02 About
    const specializations = ['High-Performance Computing', 'Deterministic Protocol Architecture', '3D WebGL & Shaders', 'Autonomous Agentic Systems', 'Decentralized Fault-Tolerance'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole} | Chrono-Obsidian Sanctuary</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  
  <!-- Google Fonts: Cinzel & Plus Jakarta Sans & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Three.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       00. DESIGN TOKENS & CSS RESET
       ========================================================================= */
    :root {
      --bg-obsidian: #0D1017;
      --bg-slate: #141923;
      --surface-panel: #1A202C;
      --surface-card: rgba(22, 27, 38, 0.85);
      
      --border-brass: #C88A3E;
      --border-stone: #2D3748;
      --border-amber: rgba(245, 158, 11, 0.4);

      --amber-glow: #F59E0B;
      --amber-bright: #FBBF24;
      --brass-gold: #E6B15C;
      --copper-rust: #7D533E;

      --text-main: #F1F5F9;
      --text-muted: #94A3B8;
      --text-dim: #64748B;

      --font-display: 'Cinzel', serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 24px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background-color: #0A0D14;
      color: var(--text-main);
      font-family: var(--font-body);
    }

    body {
      background-color: #0A0D14;
      background-image: 
        radial-gradient(circle at 15% 20%, rgba(200, 138, 62, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 85% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
      position: relative;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .sanctuary-container {
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .sanctuary-section {
      padding: 100px 0;
      border-bottom: 1px solid var(--border-stone);
      position: relative;
      z-index: 2;
    }

    .section-badge-stone {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(200, 138, 62, 0.12);
      border: 1px solid var(--border-brass);
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--brass-gold);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .section-main-heading {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: 0.04em;
      line-height: 1.2;
      margin-bottom: 24px;
    }

    /* =========================================================================
       NAVIGATION BAR (Carved Obsidian Header)
       ========================================================================= */
    .sanctuary-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(13, 16, 23, 0.88);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-stone);
      padding: 18px 0;
    }

    .nav-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-monogram-box {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 900;
      color: var(--brass-gold);
    }

    .brand-gear-badge {
      width: 36px;
      height: 36px;
      background: #141923;
      border: 1.5px solid var(--border-brass);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 12px rgba(200, 138, 62, 0.3);
      font-size: 1rem;
    }

    .nav-links {
      display: flex;
      gap: 24px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .nav-link-item {
      color: var(--text-muted);
      transition: color 0.25s, text-shadow 0.25s;
    }

    .nav-link-item:hover {
      color: var(--amber-bright);
      text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }

    /* Buttons */
    .sanctuary-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .sanctuary-btn.primary {
      background: linear-gradient(135deg, #C88A3E, #F59E0B);
      color: #0D1017;
      border: 1px solid var(--amber-bright);
      box-shadow: 0 4px 16px rgba(200, 138, 62, 0.4);
    }

    .sanctuary-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(245, 158, 11, 0.6);
    }

    .sanctuary-btn.secondary {
      background: #141923;
      color: var(--brass-gold);
      border: 1px solid var(--border-brass);
    }

    .sanctuary-btn.secondary:hover {
      background: rgba(200, 138, 62, 0.15);
      border-color: var(--amber-bright);
      color: #FFFFFF;
    }

    /* =========================================================================
       01. HOME HERO (Carved Stone Frame & 3D Crystal Cage)
       ========================================================================= */
    .hero-carved-frame {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
      align-items: center;
      padding-top: 40px;
    }

    .hero-name-title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 5vw, 3.8rem);
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .hero-role-spire {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--brass-gold);
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 20px;
    }

    .hero-manifesto-text {
      font-size: 1.1rem;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 32px;
      max-width: 540px;
    }

    .hero-3d-crystal-pod {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .hero-3d-img-spire {
      width: 100%;
      max-width: 460px;
      border: 3px solid var(--border-brass);
      border-radius: var(--radius-lg);
      box-shadow: 0 24px 60px rgba(0,0,0,0.9), 0 0 45px rgba(200, 138, 62, 0.4);
      display: block;
      transition: transform 0.4s ease;
    }

    .hero-3d-img-spire:hover {
      transform: scale(1.02);
    }

    /* =========================================================================
       02. ABOUT (Chronometer Status Medallion)
       ========================================================================= */
    .about-medallion-grid {
      display: grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 48px;
      align-items: center;
    }

    .medallion-visual-frame {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      background: #141923;
      border: 2px solid var(--border-brass);
      border-radius: var(--radius-lg);
      box-shadow: 0 16px 40px rgba(0,0,0,0.8), 0 0 30px rgba(200, 138, 62, 0.25);
    }

    .medallion-3d-img {
      width: 100%;
      max-width: 360px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-stone);
    }

    .telemetry-badges-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin: 28px 0;
    }

    .telemetry-badge-item {
      background: #141923;
      border: 1px solid var(--border-brass);
      border-radius: var(--radius-sm);
      padding: 16px 12px;
      text-align: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
    }

    .telemetry-val {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--amber-bright);
    }

    .telemetry-lbl {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 4px;
    }

    .specialization-pills-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }

    .spec-pill {
      background: rgba(200, 138, 62, 0.1);
      border: 1px solid var(--border-brass);
      border-radius: 9999px;
      padding: 6px 14px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--brass-gold);
    }

    /* =========================================================================
       03. PROJECTS (Curio Glass Specimen Display)
       ========================================================================= */
    .curio-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 32px;
    }

    .curio-specimen-box {
      background: var(--surface-card);
      border: 1.5px solid var(--border-stone);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(0,0,0,0.6);
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .curio-specimen-box:hover {
      transform: translateY(-6px);
      border-color: var(--border-brass);
      box-shadow: 0 20px 48px rgba(0,0,0,0.8), 0 0 24px rgba(200, 138, 62, 0.25);
    }

    .curio-box-header {
      padding: 12px 18px;
      background: #141923;
      border-bottom: 1px solid var(--border-stone);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--brass-gold);
    }

    .curio-glass-chamber {
      width: 100%;
      background: #060912;
    }

    .curio-box-body {
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .curio-category-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--amber-glow);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
    }

    .curio-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 10px;
    }

    .curio-desc {
      font-size: 0.94rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 18px;
      flex-grow: 1;
    }

    .curio-tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .curio-tech-pill {
      background: rgba(200, 138, 62, 0.08);
      border: 1px solid rgba(200, 138, 62, 0.3);
      border-radius: 4px;
      padding: 3px 8px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-main);
    }

    .curio-action-row {
      display: flex;
      gap: 10px;
      border-top: 1px solid var(--border-stone);
      padding-top: 16px;
    }

    /* =========================================================================
       04. SKILLS (Obsidian Crystal Monolith & Radial Nodes)
       ========================================================================= */
    .skills-monolith-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    .monolith-diagram-card {
      background: #141923;
      border: 2px solid var(--border-brass);
      border-radius: var(--radius-lg);
      padding: 32px;
      text-align: center;
      box-shadow: 0 16px 40px rgba(0,0,0,0.8);
    }

    .monolith-spire-icon {
      font-size: 3.5rem;
      margin-bottom: 16px;
      filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.6));
    }

    .sanctuary-skill-slider-row {
      margin-bottom: 16px;
    }

    .slider-label-strip {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 6px;
    }

    .slider-track-brass {
      width: 100%;
      height: 8px;
      background: #141923;
      border: 1px solid var(--border-stone);
      border-radius: 4px;
      overflow: hidden;
    }

    .slider-fill-amber {
      height: 100%;
      background: linear-gradient(90deg, #C88A3E, #F59E0B);
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }

    /* =========================================================================
       05. EXPERIENCE (Basalt Tree of Life Chronology)
       ========================================================================= */
    .experience-tree-stack {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .tree-milestone-plaque {
      background: var(--surface-card);
      border: 1.5px solid var(--border-stone);
      border-left: 4px solid var(--border-brass);
      border-radius: var(--radius-sm);
      padding: 24px 28px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: transform 0.25s, border-color 0.25s;
    }

    .tree-milestone-plaque:hover {
      transform: translateX(6px);
      border-color: var(--border-brass);
    }

    .plaque-top-meta {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--amber-glow);
      font-weight: 700;
      margin-bottom: 6px;
    }

    .plaque-role-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .plaque-company-sub {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--brass-gold);
      margin-bottom: 12px;
    }

    .plaque-desc-text {
      color: var(--text-muted);
      font-size: 0.98rem;
      line-height: 1.65;
      margin-bottom: 14px;
    }

    .plaque-tech-strip {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-dim);
    }

    .plaque-tech-label {
      color: var(--brass-gold);
      font-weight: 700;
    }

    /* =========================================================================
       06. RESUME (Engraved Graphite Tablets & Controller Deck)
       ========================================================================= */
    .resume-graphite-deck {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 36px;
    }

    .graphite-tablet-card {
      background: #141923;
      border: 2px solid var(--border-brass);
      border-radius: var(--radius-md);
      padding: 36px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.8);
      position: relative;
    }

    .copper-corner-tl { position: absolute; top: 8px; left: 8px; font-size: 0.75rem; color: var(--border-brass); }
    .copper-corner-tr { position: absolute; top: 8px; right: 8px; font-size: 0.75rem; color: var(--border-brass); }

    .tablet-name {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .tablet-role {
      font-family: var(--font-mono);
      font-size: 1rem;
      color: var(--brass-gold);
      margin-bottom: 20px;
    }

    .tablet-subhead {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--amber-bright);
      margin-bottom: 10px;
    }

    .resume-controller-box {
      background: var(--surface-card);
      border: 1.5px solid var(--border-stone);
      border-radius: var(--radius-md);
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
    }

    /* =========================================================================
       08. CONTACT (Brass Astrolabe & Terminal)
       ========================================================================= */
    .contact-astrolabe-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 48px;
      align-items: center;
    }

    .astrolabe-visual-box {
      background: #141923;
      border: 2px solid var(--border-brass);
      border-radius: var(--radius-lg);
      padding: 24px;
      text-align: center;
      box-shadow: 0 16px 40px rgba(0,0,0,0.8);
    }

    .sanctuary-form-input {
      width: 100%;
      background: #141923;
      border: 1px solid var(--border-stone);
      border-radius: var(--radius-sm);
      padding: 14px 18px;
      font-family: var(--font-mono);
      font-size: 0.92rem;
      color: var(--text-main);
      margin-bottom: 16px;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s;
    }

    .sanctuary-form-input:focus {
      border-color: var(--border-brass);
      box-shadow: 0 0 12px rgba(200, 138, 62, 0.4);
    }

    /* Footer */
    .sanctuary-footer {
      padding: 40px 0;
      background: #080B10;
      border-top: 1px solid var(--border-stone);
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-dim);
    }

    /* Responsive Breakpoints */
    @media (max-width: 900px) {
      .hero-carved-frame,
      .about-medallion-grid,
      .skills-monolith-grid,
      .resume-graphite-deck,
      .contact-astrolabe-grid {
        grid-template-columns: 1fr;
      }
      .telemetry-badges-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .nav-links {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- Live Interactive 3D WebGL Background Canvas -->
  <canvas id="chrono-webgl-canvas" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0;"></canvas>

  <!-- Navigation Header -->
  <header class="sanctuary-header">
    <div class="sanctuary-container">
      <div class="nav-wrap">
        <a href="#home" class="brand-monogram-box">
          <div class="brand-gear-badge">⚙</div>
          <span>${safeName}</span>
        </a>

        <nav class="nav-links">
          <a href="#home" class="nav-link-item">01 // Home</a>
          <a href="#about" class="nav-link-item">02 // About</a>
          <a href="#projects" class="nav-link-item">03 // Projects</a>
          <a href="#skills" class="nav-link-item">04 // Skills</a>
          <a href="#experience" class="nav-link-item">05 // Experience</a>
          <a href="#resume" class="nav-link-item">06 // Resume</a>
          <a href="#contact" class="nav-link-item">08 // Contact</a>
        </nav>

        <div>
          <button class="sanctuary-btn primary" onclick="triggerPrintResume()">
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         01. HOME HERO
         ========================================================================= -->
    <section class="sanctuary-section" id="home" style="padding-top: 140px;">
      <div class="sanctuary-container">
        <div class="hero-carved-frame">
          <div>
            <div class="section-badge-stone">CHRONO-RECORD // SANCTUARY ARCHIVE</div>
            <h1 class="hero-name-title">Hello, I'm <br><span style="color: var(--amber-bright);">${safeName}</span></h1>
            <div class="hero-role-spire">✦ ${safeRole}</div>

            <p class="hero-manifesto-text">
              ${safeBio || 'Crafting intelligent digital systems, blending emerging decentralized protocols with high-performance computational stonecraft.'}
            </p>

            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              <a href="#projects" class="sanctuary-btn primary"><span>EXPLORE INNOVATIONS ➔</span></a>
              <a href="#contact" class="sanctuary-btn secondary"><span>ESTABLISH LINK ↗</span></a>
            </div>
          </div>

          <div class="hero-3d-crystal-pod">
            <img src="/assets/3d/chrono_obsidian_sanctuary_3d.jpg" alt="${safeName} Chrono-Obsidian 3D Artifact" class="hero-3d-img-spire" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT (Chronometer Status Medallion)
         ========================================================================= -->
    <section class="sanctuary-section" id="about">
      <div class="sanctuary-container">
        <div class="section-badge-stone">02. CANDIDATE DOSSIER</div>
        <h2 class="section-main-heading">Chronometer Status Medallion</h2>

        <div class="about-medallion-grid">
          <div class="medallion-visual-frame">
            <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="Amber Crystal Spire 3D" class="medallion-3d-img" />
          </div>

          <div>
            <p style="font-size: 1.08rem; color: var(--text-main); line-height: 1.75; margin-bottom: 20px;">
              ${safeBio}
            </p>

            <div class="telemetry-badges-grid">
              <div class="telemetry-badge-item">
                <div class="telemetry-val">${yearsExp}</div>
                <div class="telemetry-lbl">Years Active</div>
              </div>
              <div class="telemetry-badge-item">
                <div class="telemetry-val">${projCount}</div>
                <div class="telemetry-lbl">Projects Forged</div>
              </div>
              <div class="telemetry-badge-item">
                <div class="telemetry-val">${certsCount}</div>
                <div class="telemetry-lbl">Certifications</div>
              </div>
              <div class="telemetry-badge-item">
                <div class="telemetry-val">${awardsCount}</div>
                <div class="telemetry-lbl">Honors &amp; Titles</div>
              </div>
            </div>

            <div class="specialization-pills-row">
              ${specializations.map(s => `<span class="spec-pill">⚙ ${s}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS (Curio Glass Specimen Display)
         ========================================================================= -->
    <section class="sanctuary-section" id="projects">
      <div class="sanctuary-container">
        <div class="section-badge-stone">03. CURIO SPECIMENS</div>
        <h2 class="section-main-heading">Curio Glass Display Cases</h2>

        <div class="curio-projects-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS (Obsidian Crystal Monolith & Radial Nodes)
         ========================================================================= -->
    <section class="sanctuary-section" id="skills">
      <div class="sanctuary-container">
        <div class="section-badge-stone">04. RUNIC CAPABILITIES</div>
        <h2 class="section-main-heading">Monolith Skills &amp; Proficiency</h2>

        <div class="skills-monolith-grid">
          <div class="monolith-diagram-card">
            <div class="monolith-spire-icon">🏛️</div>
            <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: #FFFFFF; margin-bottom: 8px;">OBSIDIAN MONOLITH</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
              Central algorithmic core radiating copper wire circuit conduits to active runtime proficiencies.
            </p>
          </div>

          <div>
            ${skillsListHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE (Basalt Tree of Life Chronology)
         ========================================================================= -->
    <section class="sanctuary-section" id="experience">
      <div class="sanctuary-container">
        <div class="section-badge-stone">05. TREE OF LIFE</div>
        <h2 class="section-main-heading">Career Chronology &amp; Milestones</h2>

        <div class="experience-tree-stack">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. RESUME (Engraved Graphite Tablets & Controller Deck)
         ========================================================================= -->
    <section class="sanctuary-section" id="resume">
      <div class="sanctuary-container">
        <div class="section-badge-stone">06. OFFICIAL DOSSIER</div>
        <h2 class="section-main-heading">Engraved Graphite Tablets</h2>

        <div class="resume-graphite-deck">
          <div class="graphite-tablet-card">
            <span class="copper-corner-tl">◤</span>
            <span class="copper-corner-tr">◥</span>

            <div class="tablet-name">${safeName}</div>
            <div class="tablet-role">${safeRole} • ${safeEmail}</div>

            <div style="margin-bottom: 24px;">
              <div class="tablet-subhead">// ACADEMIC CREDENTIALS</div>
              ${data.education.map(edu => `
                <div style="margin-bottom: 12px; border-left: 2px solid var(--border-brass); padding-left: 12px;">
                  <div style="font-weight: 800; color: #FFFFFF; font-size: 1rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                  <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
                </div>
              `).join('')}
            </div>

            <div>
              <div class="tablet-subhead">// VERIFIED CERTIFICATIONS</div>
              ${data.certifications.map(c => `
                <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.88rem; color: var(--text-main);">
                  <span style="background: rgba(200, 138, 62, 0.15); border: 1px solid var(--border-brass); color: var(--brass-gold); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                  <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="resume-controller-box">
            <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: #FFFFFF;">MODULAR CONTROLLER</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">Extract full physical dossier formatted for institutional compliance and engineering leadership.</p>

            <button class="sanctuary-btn primary" onclick="triggerPrintResume()" style="width: 100%;">
              <span>DOWNLOAD RESUME (PDF) ➔</span>
            </button>
            <a href="mailto:${safeEmail}" class="sanctuary-btn secondary" style="width: 100%;">
              <span>DIRECT INQUIRY ✉</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT (Brass Astrolabe & Terminal)
         ========================================================================= -->
    <section class="sanctuary-section" id="contact" style="border-bottom: none;">
      <div class="sanctuary-container">
        <div class="section-badge-stone">08. TRANSMIT SIGNAL</div>
        <h2 class="section-main-heading">Astrolabe Transmission Console</h2>

        <div class="contact-astrolabe-grid">
          <div class="astrolabe-visual-box">
            <img src="/assets/3d/steampunk_satellite_bird_3d.jpg" alt="Brass Astrolabe Console" style="width: 100%; max-width: 320px; border-radius: var(--radius-md); margin-bottom: 16px;" />
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--brass-gold);">
              <div>DIRECT RELAY: <a href="mailto:${safeEmail}" style="text-decoration: underline;">${safeEmail}</a></div>
              <div>COORDINATES: ${safeLocation}</div>
            </div>
          </div>

          <div>
            <form onsubmit="handleSanctuarySubmit(event)">
              <input type="text" class="sanctuary-form-input" placeholder="YOUR FULL NAME" required />
              <input type="email" class="sanctuary-form-input" placeholder="YOUR EMAIL FREQUENCY" required />
              <input type="text" class="sanctuary-form-input" placeholder="MISSION SUBJECT" required />
              <textarea class="sanctuary-form-input" style="min-height: 120px; resize: vertical;" placeholder="PROJECT DETAILS &amp; SPECIFICATIONS" required></textarea>
              <button type="submit" class="sanctuary-btn primary" style="width: 100%;">
                <span>TRANSMIT PACKET ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="sanctuary-footer">
    <div class="sanctuary-container">
      <div>© 2026 ${safeName} • CHRONO-OBSIDIAN SANCTUARY • POWERED BY THREE.JS &amp; NANO BANANA</div>
    </div>
  </footer>

  <script>
    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 }, colors: ['#C88A3E', '#F59E0B', '#FBBF24', '#0D1017'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleSanctuarySubmit(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>SIGNAL DISPATCHED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }
    // =========================================================================
    // 3D SPATIAL INTERACTIVE ENGINE (Obsidian Crystal • Brass Astrolabe • Scroll & Hover Reactive)
    // =========================================================================
    function initChronoObsidian3D() {
      const canvas = document.getElementById('chrono-webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 28);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Main 3D Cluster Group
      const cluster = new THREE.Group();
      scene.add(cluster);

      // 1. Faceted Obsidian Crystal Core
      const crystalGeo = new THREE.IcosahedronGeometry(5.8, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x141923,
        roughness: 0.15,
        metalness: 0.92,
        flatShading: true
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      cluster.add(crystalMesh);

      // 2. Brass Clockwork Wireframe Outer Cage
      const wireCageGeo = new THREE.IcosahedronGeometry(6.1, 0);
      const wireCageMat = new THREE.MeshBasicMaterial({
        color: 0xE6B15C,
        wireframe: true,
        transparent: true,
        opacity: 0.55
      });
      const wireCageMesh = new THREE.Mesh(wireCageGeo, wireCageMat);
      cluster.add(wireCageMesh);

      // 3. Glowing Amber Heart
      const heartGeo = new THREE.OctahedronGeometry(2.8, 0);
      const heartMat = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        wireframe: true
      });
      const heartMesh = new THREE.Mesh(heartGeo, heartMat);
      cluster.add(heartMesh);

      // 4. Concentric Astrolabe Brass Rings
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xE6B15C,
        metalness: 0.95,
        roughness: 0.25
      });
      const outerRing = new THREE.Mesh(new THREE.TorusGeometry(9.2, 0.16, 16, 64), ringMat);
      const innerRing = new THREE.Mesh(new THREE.TorusGeometry(7.4, 0.12, 16, 64), ringMat);
      outerRing.rotation.x = Math.PI / 3;
      innerRing.rotation.y = Math.PI / 4;
      cluster.add(outerRing);
      cluster.add(innerRing);

      // 5. Starfield & Glowing Amber Spark Particles
      const particleCount = 1400;
      const posArray = new Float32Array(particleCount * 3);
      const colArray = new Float32Array(particleCount * 3);

      const colorAmber = new THREE.Color(0xF59E0B);
      const colorBrass = new THREE.Color(0xE6B15C);
      const colorObsidian = new THREE.Color(0x94A3B8);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] = (Math.random() - 0.5) * 140;
        posArray[i3 + 1] = (Math.random() - 0.5) * 140;
        posArray[i3 + 2] = (Math.random() - 0.5) * 90;

        const mixRatio = Math.random();
        const chosenCol = mixRatio > 0.6 ? colorAmber : (mixRatio > 0.25 ? colorBrass : colorObsidian);
        colArray[i3] = chosenCol.r;
        colArray[i3 + 1] = chosenCol.g;
        colArray[i3 + 2] = chosenCol.b;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.45,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      // 6. Floating Obsidian Shards
      const shardsGroup = new THREE.Group();
      scene.add(shardsGroup);
      const shardGeo = new THREE.TetrahedronGeometry(1.0, 0);
      const shardMat = new THREE.MeshStandardMaterial({
        color: 0x1E2638,
        roughness: 0.2,
        metalness: 0.85,
        flatShading: true
      });

      const shards = [];
      for (let i = 0; i < 20; i++) {
        const shard = new THREE.Mesh(shardGeo, shardMat);
        const radius = 12 + Math.random() * 25;
        const angle = Math.random() * Math.PI * 2;
        shard.position.set(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 35,
          Math.sin(angle) * radius
        );
        shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        shard.userData = {
          speedX: (Math.random() - 0.5) * 0.02,
          speedY: (Math.random() - 0.5) * 0.02,
          speedZ: (Math.random() - 0.5) * 0.02,
          orbitRadius: radius,
          orbitAngle: angle,
          orbitSpeed: (0.002 + Math.random() * 0.004) * (Math.random() > 0.5 ? 1 : -1)
        };
        shardsGroup.add(shard);
        shards.push(shard);
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(0x1F2937, 2.2);
      scene.add(ambientLight);

      const amberPointLight = new THREE.PointLight(0xF59E0B, 4.0, 70);
      amberPointLight.position.set(0, 0, 2);
      cluster.add(amberPointLight);

      const dirLight = new THREE.DirectionalLight(0xE6B15C, 2.0);
      dirLight.position.set(20, 30, 25);
      scene.add(dirLight);

      const blueRimLight = new THREE.PointLight(0x38BDF8, 1.8, 80);
      blueRimLight.position.set(-25, -20, -10);
      scene.add(blueRimLight);

      // Offset cluster initially to the right
      cluster.position.set(7, 1, 0);

      // Mouse Hover / Parallax Tracking
      let mouseX = 0, mouseY = 0;
      let targetMouseX = 0, targetMouseY = 0;
      window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Scroll Tracking & Depth Velocity
      let scrollY = window.scrollY || 0;
      let targetScrollY = scrollY;
      let scrollVelocity = 0;
      let lastScrollY = scrollY;

      window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY || 0;
      }, { passive: true });

      // Interactive Card Hover Reaction
      let excitationEnergy = 1.0;
      const interactiveElements = document.querySelectorAll('.curio-specimen-box, .sanctuary-btn, .sanctuary-skill-slider-row, .hero-metric-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          excitationEnergy = 2.8;
          amberPointLight.intensity = 6.5;
        });
        el.addEventListener('mouseleave', () => {
          excitationEnergy = 1.0;
        });
      });

      // Resize handler
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Animation Loop
      let clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const dt = clock.getDelta();

        // Smooth mouse lerp
        mouseX += (targetMouseX - mouseX) * 0.06;
        mouseY += (targetMouseY - mouseY) * 0.06;

        // Smooth scroll lerp & velocity
        scrollY += (targetScrollY - scrollY) * 0.08;
        scrollVelocity = Math.abs(scrollY - lastScrollY);
        lastScrollY = scrollY;

        const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
        const scrollFraction = scrollY / maxScroll;

        // Base Rotations modulated by excitation and scroll velocity
        const rotMultiplier = 1 + scrollVelocity * 0.03 + (excitationEnergy - 1) * 0.5;
        crystalMesh.rotation.y += 0.006 * rotMultiplier;
        crystalMesh.rotation.x += 0.003 * rotMultiplier;
        wireCageMesh.rotation.y -= 0.008 * rotMultiplier;
        heartMesh.rotation.z += 0.012 * rotMultiplier;

        outerRing.rotation.z += 0.009 * rotMultiplier;
        innerRing.rotation.x -= 0.007 * rotMultiplier;

        // Cluster tracks mouse & moves with scroll
        cluster.rotation.y = mouseX * 0.45;
        cluster.rotation.x = -mouseY * 0.35;

        // Camera scroll reactive travel
        const targetCamZ = 28 - scrollFraction * 14;
        camera.position.z += (targetCamZ - camera.position.z) * 0.05;
        camera.position.x = mouseX * 1.5 + Math.sin(scrollFraction * Math.PI * 2) * 2;
        camera.position.y = -mouseY * 1.5 - scrollFraction * 6;
        camera.lookAt(cluster.position.x * 0.5, cluster.position.y * 0.5, 0);

        // Slowly ease excitation back
        if (excitationEnergy > 1.0) {
          excitationEnergy -= dt * 1.2;
          if (amberPointLight.intensity > 4.0) {
            amberPointLight.intensity -= dt * 2.5;
          }
        }

        // Particle subtle drift & scroll reaction
        particleSystem.rotation.y += 0.0008 + scrollVelocity * 0.0004;
        particleSystem.rotation.x += 0.0004;

        // Shards orbit
        for (let i = 0; i < shards.length; i++) {
          const s = shards[i];
          s.userData.orbitAngle += s.userData.orbitSpeed * rotMultiplier;
          s.position.x = Math.cos(s.userData.orbitAngle) * s.userData.orbitRadius;
          s.position.z = Math.sin(s.userData.orbitAngle) * s.userData.orbitRadius;
          s.rotation.x += s.userData.speedX;
          s.rotation.y += s.userData.speedY;
          s.rotation.z += s.userData.speedZ;
        }

        renderer.render(scene, camera);
      }

      animate();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initChronoObsidian3D);
    } else {
      initChronoObsidian3D();
    }
  </script>
</body>
</html>`;
  }
};

module.exports = { ChronoObsidianSanctuaryTemplate };

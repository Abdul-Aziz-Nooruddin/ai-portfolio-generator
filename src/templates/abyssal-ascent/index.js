/**
 * Template: ABYSSAL ASCENT
 * Aesthetic: Dark Fantasy Tech • Gamified Progression • Shadow & Neon • Minimalist RPG • Ethereal Purple & Icy Cyan
 * Palette: Abyssal Void (#030407), Obsidian Shadow (#0D1117), Ash White (#E2E8F0), Silver Grey (#94A3B8), Ethereal Purple (#8B5CF6), Icy Cyan (#06B6D4).
 * Motifs: Dimensional portals, shattered gates, glowing runic data-lines, RPG status window HUDs, skill trees, dungeon quest logs.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const AbyssalAscentTemplate = {
  id: 'abyssal-ascent',
  name: 'Abyssal Ascent',
  category: 'Dark Fantasy Tech / Gamified Progression RPG',
  description: 'A dark, progression-focused aesthetic inspired by weak-to-strong fantasy narratives, dungeon portals, and gamified RPG status screens. Monolithic dimensional gates, branching skill trees, and quest log timelines in ethereal purple and icy cyan.',
  recommendedFor: ['Full Stack Engineer', 'AI Systems Architect', 'Smart Contract Developer', 'Game Systems Programmer', 'Core Protocol Engineer'],
  palette: ['#030407', '#0D1117', '#8B5CF6', '#06B6D4', '#E2E8F0', '#94A3B8'],

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
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    // Progression Stats
    const playerLevel = data.experience?.length ? Math.min(99, data.experience.length * 10 + 10) : 20;
    const totalArtifacts = data.projects?.length || 6;
    const dungeonsCleared = data.publicRepos ?? data.projects?.length ?? 6;

    // 03. Artifact Cards
    const assignedArtworks = new Set(['/assets/3d/bio_digital_fusion_3d.jpg', '/assets/3d/developer_showcase_portfolio_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projNum = String(idx + 1).padStart(2, '0');
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="rune-tag">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="abyssal-artifact-card" data-category="${TemplateHelper.escapeHtml(p.category || 'Dungeon')}">
          <div class="artifact-viewport">
            <div class="runic-gate-halo"></div>
            <div class="artifact-thumb-box">
              ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'abyssal-ascent', idx, assignedArtworks, userSeed)}
            </div>
            <div class="artifact-rank-tag">RANK // S-TIER ${projNum}</div>
          </div>

          <div class="artifact-body">
            <div class="artifact-category">GATE SECTOR // ${TemplateHelper.escapeHtml(p.category || 'Classified Domain')}</div>
            <h3 class="artifact-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="artifact-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="runes-used-cluster">
              <span class="runes-header-label">RUNES USED:</span>
              <div class="runes-row">${techTags}</div>
            </div>

            <div class="artifact-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="abyssal-ghost-btn primary"><span>INSPECT ARTIFACT ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="abyssal-ghost-btn secondary"><span>RUNIC SOURCE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. Skill Tree Categories
    const skillCategories = [
      { name: 'CORE COMBAT (LANGUAGES)', icon: '⚔️', skills: data.skills.slice(0, Math.ceil(data.skills.length / 3)) },
      { name: 'DIVINE WEAPONRY (FRAMEWORKS)', icon: '🔮', skills: data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3)) },
      { name: 'DIMENSIONAL RELICS (CLOUD & ARCH)', icon: '🛡️', skills: data.skills.slice(Math.ceil((data.skills.length * 2) / 3)) }
    ];

    const skillTreeNodesHtml = skillCategories.map((cat, cIdx) => `
      <div class="skill-tree-branch">
        <div class="branch-core-node">
          <span class="branch-icon">${cat.icon}</span>
          <span class="branch-name">${cat.name}</span>
        </div>
        <div class="branch-leaves-grid">
          ${cat.skills.map((s, sIdx) => {
            const mastery = 85 + ((sIdx * 7) % 15);
            return `
              <div class="skill-leaf-capsule">
                <div class="capsule-header">
                  <span class="leaf-rune-dot"></span>
                  <span class="leaf-skill-name">${TemplateHelper.escapeHtml(s)}</span>
                </div>
                <div class="mastery-track">
                  <div class="mastery-fill" style="width: ${mastery}%;"></div>
                </div>
                <div class="mastery-val-label">MASTERY LVL: ${mastery}%</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    // 05. Quest Log (Experience)
    const experienceHtml = data.experience.map((exp, idx) => {
      const floorNum = String(idx + 1).padStart(2, '0');
      return `
        <div class="dungeon-floor-entry">
          <div class="floor-fissure-marker">
            <span class="diamond-beacon"></span>
            <span class="floor-num">B${floorNum}F</span>
          </div>
          <div class="floor-status-card">
            <div class="floor-header-strip">
              <span class="floor-tag">CLEARED FLOOR // 0${idx + 1}</span>
              <span class="floor-date-meta">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</span>
            </div>
            <h3 class="floor-role-heading">${TemplateHelper.escapeHtml(exp.role)}</h3>
            <div class="floor-guild-meta">GUILD: ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
            <p class="floor-desc-para">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `
              <div class="loot-acquired-box">
                <span class="loot-label">LOOT ACQUIRED:</span>
                <span class="loot-items">${TemplateHelper.escapeHtml(exp.technologies)}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Focus traits for 02 About
    const equippedTraits = ['Algorithmic Transcendence', 'High-Concurrency Sorcery', 'Autonomous AI Daemons', 'Zero-Knowledge Crypts', 'Fault-Tolerant Bastions'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Abyssal Ascent &amp; RPG Player Status</title>
  <meta name="description" content="${safeName} — ${safeRole}. Gamified dark fantasy developer portfolio with dimensional monoliths, branching skill trees, and quest log floor progression.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Rajdhani:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       ABYSSAL ASCENT DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-abyssal: #030407;
      --surface-obsidian: #0D1117;
      --surface-glass: rgba(13, 17, 23, 0.85);
      --border-cyan: rgba(6, 182, 212, 0.22);
      --border-cyan-solid: #06B6D4;
      --ethereal-purple: #8B5CF6;
      --icy-cyan: #06B6D4;
      --ash-white: #E2E8F0;
      --silver-grey: #94A3B8;
      --shadow-void: rgba(139, 92, 246, 0.35);

      --font-heading: 'Cinzel', serif, -apple-system;
      --font-hud: 'Rajdhani', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --container-max: 1360px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-abyssal);
      color: var(--ash-white);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-abyssal);
      color: var(--ash-white);
      line-height: 1.65;
      overflow-x: hidden;
      position: relative;
      /* Abyssal Fissure Background Pattern */
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 65%),
        linear-gradient(to right, rgba(6, 182, 212, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
    }

    ::selection {
      background: var(--ethereal-purple);
      color: #FFFFFF;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .abyssal-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed 3D Monolith / Void Canvas */
    #abyssal-bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.9;
    }

    /* Top HUD Navigation Bar */
    .abyssal-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(3, 4, 7, 0.9);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-cyan);
      padding: 14px 0;
    }

    .nav-inner-hud {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-nr-hud {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-hud);
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: 0.05em;
    }

    .nr-rune-badge {
      width: 34px;
      height: 34px;
      border: 1px solid var(--icy-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--icy-cyan);
      font-family: var(--font-hud);
      font-size: 0.95rem;
      font-weight: 800;
      background: rgba(6, 182, 212, 0.1);
      box-shadow: 0 0 16px rgba(6, 182, 212, 0.35);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%);
    }

    .nav-menu-hud {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .nav-item-hud {
      font-family: var(--font-hud);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--silver-grey);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.2s ease;
    }

    .nav-item-hud:hover, .nav-item-hud.active {
      color: var(--icy-cyan);
      text-shadow: 0 0 12px rgba(6, 182, 212, 0.6);
    }

    /* Sharp Rectangular Ghost Buttons */
    .abyssal-ghost-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 24px;
      font-family: var(--font-hud);
      font-size: 0.9rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      cursor: pointer;
      background: transparent;
      border: 1px solid var(--icy-cyan);
      color: var(--icy-cyan);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%);
    }

    .abyssal-ghost-btn:hover {
      background: var(--ethereal-purple);
      border-color: var(--ethereal-purple);
      color: #FFFFFF;
      box-shadow: 0 0 24px rgba(139, 92, 246, 0.6);
      transform: translateY(-2px);
    }

    .abyssal-ghost-btn.primary {
      border-color: var(--icy-cyan);
      color: var(--icy-cyan);
    }

    /* Section Base */
    .abyssal-section {
      padding: 110px 0;
      position: relative;
      z-index: 1;
      border-bottom: 1px solid var(--border-cyan);
    }

    .hud-section-header {
      font-family: var(--font-hud);
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--ethereal-purple);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hud-section-header::after {
      content: '';
      display: inline-block;
      width: 48px;
      height: 1px;
      background: var(--ethereal-purple);
      box-shadow: 0 0 8px var(--ethereal-purple);
    }

    /* =========================================================================
       01. HOME PAGE (Player Status Screen & Monolith)
       ========================================================================= */
    .home-hero-hud-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
      min-height: 560px;
    }

    .home-hero-status-side {
      display: flex;
      flex-direction: column;
    }

    .huge-sharp-heading {
      font-family: var(--font-heading);
      font-size: clamp(3rem, 6vw, 5.4rem);
      font-weight: 900;
      line-height: 1.02;
      letter-spacing: -0.02em;
      color: var(--ash-white);
      margin-bottom: 12px;
      text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
    }

    .class-badge-pill {
      font-family: var(--font-hud);
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--icy-cyan);
      margin-bottom: 24px;
      letter-spacing: 0.08em;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .class-badge-pill::before {
      content: '◈';
      color: var(--ethereal-purple);
    }

    .origin-story-para {
      font-size: 1.05rem;
      color: var(--silver-grey);
      line-height: 1.75;
      margin-bottom: 32px;
      max-width: 560px;
    }

    .home-monolith-viewport {
      width: 100%;
      height: 480px;
      position: relative;
      border: 1px solid var(--border-cyan);
      background: radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(3, 4, 7, 0) 70%);
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
    }

    #home-monolith-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .monolith-telemetry-overlay {
      position: absolute;
      bottom: 16px;
      left: 18px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--icy-cyan);
      pointer-events: none;
    }

    /* RPG Stat Block (3 Columns) */
    .rpg-stat-block-strip {
      margin-top: 56px;
      border-top: 1px solid var(--border-cyan);
      padding-top: 36px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    .rpg-stat-cell {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 24px;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    }

    .stat-label-hud {
      font-family: var(--font-hud);
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--ethereal-purple);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
    }

    .stat-val-huge {
      font-family: var(--font-hud);
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--ash-white);
      line-height: 1;
    }

    .stat-val-huge span {
      color: var(--icy-cyan);
    }

    /* =========================================================================
       02. ABOUT PAGE (Status Window & Equipped Traits)
       ========================================================================= */
    .status-window-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
    }

    .awakened-silhouette-frame {
      width: 100%;
      height: 440px;
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
    }

    .silhouette-svg-aura {
      width: 80%;
      height: 80%;
    }

    .hud-meta-table {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .hud-meta-cell {
      background: rgba(13, 17, 23, 0.9);
      border: 1px solid var(--border-cyan);
      padding: 12px 16px;
    }

    .hud-meta-title {
      font-family: var(--font-hud);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--icy-cyan);
      letter-spacing: 0.08em;
    }

    .hud-meta-value {
      font-family: var(--font-hud);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ash-white);
    }

    .equipped-traits-stack {
      margin-top: 28px;
      border-top: 1px solid var(--border-cyan);
      padding-top: 20px;
    }

    .equipped-traits-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .trait-runic-badge {
      font-family: var(--font-hud);
      font-size: 0.82rem;
      font-weight: 700;
      padding: 6px 14px;
      border: 1px solid var(--ethereal-purple);
      color: #FFFFFF;
      background: rgba(139, 92, 246, 0.12);
      box-shadow: 0 0 12px rgba(139, 92, 246, 0.25);
    }

    /* =========================================================================
       03. PROJECTS PAGE (Artifacts Floating in Void)
       ========================================================================= */
    .artifacts-grid-stack {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 36px;
      margin-top: 32px;
    }

    .abyssal-artifact-card {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
    }

    .abyssal-artifact-card:hover {
      border-color: var(--ethereal-purple);
      box-shadow: 0 16px 40px rgba(139, 92, 246, 0.3);
      transform: translateY(-4px);
    }

    .artifact-viewport {
      width: 100%;
      height: 220px;
      position: relative;
      background: #020305;
      overflow: hidden;
    }

    .artifact-thumb-box {
      width: 100%;
      height: 100%;
    }

    .artifact-thumb-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .abyssal-artifact-card:hover .artifact-thumb-box img {
      transform: scale(1.06);
    }

    .artifact-rank-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(3, 4, 7, 0.9);
      border: 1px solid var(--icy-cyan);
      color: var(--icy-cyan);
      font-family: var(--font-hud);
      font-size: 0.78rem;
      font-weight: 800;
      padding: 4px 10px;
      letter-spacing: 0.08em;
    }

    .artifact-body {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .artifact-category {
      font-family: var(--font-hud);
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--ethereal-purple);
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }

    .artifact-title {
      font-family: var(--font-heading);
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--ash-white);
      margin-bottom: 12px;
    }

    .artifact-desc {
      font-size: 0.95rem;
      color: var(--silver-grey);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .runes-used-cluster {
      margin-bottom: 24px;
    }

    .runes-header-label {
      font-family: var(--font-hud);
      font-size: 0.75rem;
      color: var(--icy-cyan);
      font-weight: 700;
      display: block;
      margin-bottom: 8px;
    }

    .runes-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .rune-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(6, 182, 212, 0.08);
      border: 1px solid rgba(6, 182, 212, 0.25);
      color: var(--ash-white);
      padding: 3px 8px;
    }

    .artifact-action-row {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. SKILLS PAGE (Sprawling RPG Skill Tree)
       ========================================================================= */
    .skills-tree-hud-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 24px;
    }

    .skill-tree-branch {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 28px;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    }

    .branch-core-node {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-cyan);
      margin-bottom: 20px;
      font-family: var(--font-hud);
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--icy-cyan);
      letter-spacing: 0.08em;
    }

    .branch-leaves-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
    }

    .skill-leaf-capsule {
      background: rgba(3, 4, 7, 0.85);
      border: 1px solid rgba(139, 92, 246, 0.3);
      padding: 16px;
    }

    .capsule-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }

    .leaf-rune-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--icy-cyan);
      box-shadow: 0 0 10px var(--icy-cyan);
    }

    .leaf-skill-name {
      font-family: var(--font-hud);
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--ash-white);
    }

    .mastery-track {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      overflow: hidden;
      margin-bottom: 6px;
    }

    .mastery-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--ethereal-purple) 0%, var(--icy-cyan) 100%);
      box-shadow: 0 0 8px var(--icy-cyan);
    }

    .mastery-val-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--silver-grey);
    }

    /* =========================================================================
       05. EXPERIENCE PAGE (Quest Log Dungeon Descent)
       ========================================================================= */
    .quest-log-descent-stack {
      position: relative;
      padding-left: 54px;
      margin-top: 36px;
    }

    .quest-log-descent-stack::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 21px;
      width: 2px;
      background: linear-gradient(180deg, var(--ethereal-purple) 0%, var(--icy-cyan) 100%);
      box-shadow: 0 0 14px rgba(6, 182, 212, 0.5);
    }

    .dungeon-floor-entry {
      position: relative;
      margin-bottom: 36px;
    }

    .floor-fissure-marker {
      position: absolute;
      left: -54px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .diamond-beacon {
      width: 14px;
      height: 14px;
      background: var(--icy-cyan);
      transform: rotate(45deg);
      box-shadow: 0 0 14px var(--icy-cyan);
      border: 2px solid #FFFFFF;
    }

    .floor-status-card {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 28px;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
    }

    .floor-header-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .floor-tag {
      font-family: var(--font-hud);
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--ethereal-purple);
      letter-spacing: 0.1em;
    }

    .floor-date-meta {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--silver-grey);
    }

    .floor-role-heading {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--ash-white);
      margin-bottom: 4px;
    }

    .floor-guild-meta {
      font-family: var(--font-hud);
      font-size: 0.9rem;
      color: var(--icy-cyan);
      font-weight: 700;
      margin-bottom: 14px;
    }

    .floor-desc-para {
      font-size: 0.95rem;
      color: var(--silver-grey);
      line-height: 1.65;
      margin-bottom: 16px;
    }

    .loot-acquired-box {
      font-family: var(--font-hud);
      font-size: 0.82rem;
      background: rgba(3, 4, 7, 0.85);
      border: 1px solid rgba(6, 182, 212, 0.25);
      padding: 10px 14px;
    }

    .loot-label {
      color: var(--ethereal-purple);
      font-weight: 800;
      margin-right: 6px;
    }

    .loot-items {
      color: var(--ash-white);
    }

    /* =========================================================================
       06. OPEN SOURCE PAGE (Guild Contributions)
       ========================================================================= */
    .guild-contributions-grid {
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 40px;
      margin-top: 24px;
    }

    .raid-metrics-card {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
    }

    .raid-hud-ring {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 3px solid var(--icy-cyan);
      box-shadow: 0 0 24px rgba(6, 182, 212, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .raid-score-num {
      font-family: var(--font-hud);
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--ash-white);
    }

    .guild-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .guild-repo-card {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
    }

    /* =========================================================================
       07. RESUME PAGE (Holographic Player Dossier)
       ========================================================================= */
    .player-dossier-hologram {
      background: rgba(13, 17, 23, 0.88);
      border: 1px solid var(--icy-cyan);
      box-shadow: 0 20px 50px rgba(139, 92, 246, 0.25);
      padding: 44px;
      max-width: 960px;
      margin: 30px auto 0;
      backdrop-filter: blur(24px);
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
    }

    .dossier-header-row {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-cyan);
      margin-bottom: 28px;
    }

    /* =========================================================================
       08. CONTACT PAGE (Establish Link)
       ========================================================================= */
    .establish-link-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 24px;
    }

    .gamified-form-matrix {
      background: var(--surface-obsidian);
      border: 1px solid var(--border-cyan);
      padding: 36px;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
    }

    .abyssal-bottom-input {
      width: 100%;
      padding: 14px 4px;
      border: none;
      border-bottom: 1px solid var(--border-cyan);
      background: transparent;
      color: #FFFFFF;
      font-family: var(--font-hud);
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 24px;
      outline: none;
      transition: all 0.25s ease;
    }

    .abyssal-bottom-input:focus {
      border-bottom-color: var(--ethereal-purple);
      box-shadow: 0 4px 16px -4px rgba(139, 92, 246, 0.6);
    }

    /* Footer */
    .abyssal-footer {
      padding: 40px 0;
      border-top: 1px solid var(--border-cyan);
      font-family: var(--font-hud);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--silver-grey);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .home-hero-hud-grid,
      .status-window-grid,
      .guild-contributions-grid,
      .establish-link-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Fixed 3D Void Background Canvas -->
  <canvas id="abyssal-bg-canvas"></canvas>

  <!-- Top Simplified HUD Navigation Bar -->
  <header class="abyssal-navbar">
    <div class="abyssal-container">
      <div class="nav-inner-hud">
        <a href="#home" class="brand-nr-hud">
          <div class="nr-rune-badge">${initials}</div>
          <span>${safeName}</span>
        </a>

        <nav class="nav-menu-hud">
          <a href="#home" class="nav-item-hud active">01 / Home</a>
          <a href="#about" class="nav-item-hud">02 / Status</a>
          <a href="#projects" class="nav-item-hud">03 / Artifacts</a>
          <a href="#skills" class="nav-item-hud">04 / Skill Tree</a>
          <a href="#experience" class="nav-item-hud">05 / Quest Log</a>
          <a href="#opensource" class="nav-item-hud">06 / Guild</a>
          <a href="#resume" class="nav-item-hud">07 / Dossier</a>
          <a href="#contact" class="nav-item-hud">08 / Link</a>
        </nav>

        <div>
          <button class="abyssal-ghost-btn" onclick="triggerPrintResume()">
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         01. HOME PAGE
         ========================================================================= -->
    <section class="abyssal-section" id="home">
      <div class="abyssal-container">
        <div class="hud-section-header">01. PLAYER_NAME</div>

        <div class="home-hero-hud-grid">
          <div class="home-hero-status-side">
            <h1 class="huge-sharp-heading">${safeName}</h1>
            <div class="class-badge-pill">CLASS: ${safeRole}</div>
            
            <p class="origin-story-para">
              ${safeBio || 'Forged in complex engineering dungeons. Ascending through high-scale distributed systems, autonomous AI agents, and resilient decentralized protocols.'}
            </p>

            <div style="display: flex; gap: 16px;">
              <a href="#projects" class="abyssal-ghost-btn primary"><span>INSPECT ARTIFACTS ➔</span></a>
              <a href="#contact" class="abyssal-ghost-btn"><span>ESTABLISH LINK</span></a>
            </div>
          </div>

          <div class="home-monolith-viewport" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/bio_digital_fusion_3d.jpg" alt="${safeName} 3D Awakened Monolith" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border: 2px solid var(--border-cyan); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 35px rgba(6,182,212,0.35);" />
          </div>
        </div>

        <!-- RPG Stat Block -->
        <div class="rpg-stat-block-strip">
          <div class="rpg-stat-cell">
            <div class="stat-label-hud">LVL: EXPERIENCE</div>
            <div class="stat-val-huge">${playerLevel} <span>LVL</span></div>
          </div>
          <div class="rpg-stat-cell">
            <div class="stat-label-hud">ARTIFACTS CREATED</div>
            <div class="stat-val-huge">${totalArtifacts} <span>PRJ</span></div>
          </div>
          <div class="rpg-stat-cell">
            <div class="stat-label-hud">DUNGEONS CLEARED</div>
            <div class="stat-val-huge">${dungeonsCleared} <span>REPOS</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT PAGE (Status Window)
         ========================================================================= -->
    <section class="abyssal-section" id="about">
      <div class="abyssal-container">
        <div class="hud-section-header">02. STATUS_WINDOW</div>

        <div class="status-window-grid">
          <div>
            <p style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #FFFFFF; line-height: 1.4; margin-bottom: 20px;">
              "Awakened in algorithmic execution. Engineering architectures with mathematical perfection and absolute stability."
            </p>
            <p style="font-size: 1.02rem; color: var(--silver-grey); line-height: 1.75; margin-bottom: 24px;">
              ${safeBio}
            </p>

            <div class="hud-meta-table">
              <div class="hud-meta-cell">
                <div class="hud-meta-title">BASE SECTOR //</div>
                <div class="hud-meta-value">${safeLocation}</div>
              </div>
              <div class="hud-meta-cell">
                <div class="hud-meta-title">CURRENT GUILD //</div>
                <div class="hud-meta-value">${safeRole}</div>
              </div>
              <div class="hud-meta-cell">
                <div class="hud-meta-title">COMM CHANNEL //</div>
                <div class="hud-meta-value">${safeEmail}</div>
              </div>
              <div class="hud-meta-cell">
                <div class="hud-meta-title">STATUS //</div>
                <div class="hud-meta-value" style="color: var(--icy-cyan);">AWAKENED</div>
              </div>
            </div>

            <div class="equipped-traits-stack">
              <div style="font-family: var(--font-hud); font-size: 0.82rem; color: var(--ethereal-purple); font-weight: 800; letter-spacing: 0.1em; margin-bottom: 8px;">EQUIPPED TRAITS //</div>
              <div class="equipped-traits-tags">
                ${equippedTraits.map(t => `<span class="trait-runic-badge">◈ ${t}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="awakened-silhouette-frame" style="display: flex; justify-content: center; align-items: center; padding: 12px; background: rgba(14, 18, 28, 0.7); border: 1px solid var(--border-cyan); border-radius: 20px;">
            <img src="/assets/3d/developer_showcase_portfolio_3d.jpg" alt="Player Status Dossier" style="width: 100%; max-width: 320px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,0.8);" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS PAGE (Artifacts)
         ========================================================================= -->
    <section class="abyssal-section" id="projects">
      <div class="abyssal-container">
        <div class="hud-section-header">03. ARTIFACTS</div>
        <p style="font-family: var(--font-hud); font-size: 1.15rem; font-weight: 700; color: var(--silver-grey); margin-bottom: 24px;">
          High-tier artifacts, cleared dungeons, and decentralized protocols engineered for high-load realms.
        </p>

        <div class="artifacts-grid-stack">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS PAGE (Sprawling RPG Skill Tree)
         ========================================================================= -->
    <section class="abyssal-section" id="skills">
      <div class="abyssal-container">
        <div class="hud-section-header">04. SKILL_TREE</div>
        <p style="font-family: var(--font-hud); font-size: 1.15rem; font-weight: 700; color: var(--silver-grey); margin-bottom: 24px;">
          Interconnected skill tree branching across language execution, frameworks, and cloud bastions.
        </p>

        <div class="skills-tree-hud-container">
          ${skillTreeNodesHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE PAGE (Quest Log)
         ========================================================================= -->
    <section class="abyssal-section" id="experience">
      <div class="abyssal-container">
        <div class="hud-section-header">05. QUEST_LOG</div>
        <p style="font-family: var(--font-hud); font-size: 1.15rem; font-weight: 700; color: var(--silver-grey); margin-bottom: 24px;">
          Chronological dungeon descent documenting cleared floors and acquired loot.
        </p>

        <div class="quest-log-descent-stack">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE PAGE (Guild Contributions)
         ========================================================================= -->
    <section class="abyssal-section" id="opensource">
      <div class="abyssal-container">
        <div class="hud-section-header">06. GUILD_CONTRIBUTIONS</div>

        <div class="guild-contributions-grid">
          <div class="raid-metrics-card">
            <div class="raid-hud-ring">
              <div class="raid-score-num">${data.projects.length}+</div>
              <div style="font-family: var(--font-hud); font-size: 0.8rem; font-weight: 800; color: var(--ethereal-purple);">TOTAL RAIDS</div>
            </div>
            <p style="font-size: 0.95rem; color: var(--silver-grey); margin-bottom: 24px;">
              Active contributor to open-source protocols, guild toolchains, and developer bastions.
            </p>
            <a href="${safeGithub}" target="_blank" rel="noopener" class="abyssal-ghost-btn primary" style="width: 100%;">
              <span>VIEW GITHUB GUILD ↗</span>
            </a>
          </div>

          <div class="guild-cards-stack">
            ${data.projects.map(p => `
              <div class="guild-repo-card">
                <div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--ash-white); margin-bottom: 4px;">${TemplateHelper.escapeHtml(p.name)}</h4>
                  <p style="font-size: 0.92rem; color: var(--silver-grey);">${TemplateHelper.escapeHtml(p.desc)}</p>
                </div>
                <div>
                  ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="abyssal-ghost-btn" style="padding: 6px 14px; font-size: 0.8rem;">INSPECT ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         07. RESUME PAGE (Player Dossier)
         ========================================================================= -->
    <section class="abyssal-section" id="resume">
      <div class="abyssal-container">
        <div class="hud-section-header">07. PLAYER_DOSSIER</div>

        <div class="player-dossier-hologram">
          <div class="dossier-header-row">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--ash-white);">${safeName}</h3>
              <div style="font-family: var(--font-hud); font-size: 1.2rem; font-weight: 800; color: var(--icy-cyan);">CLASS: ${safeRole}</div>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--silver-grey); text-align: right;">
              <div>${safeEmail}</div>
              <div>${safeLocation}</div>
            </div>
          </div>

          <div style="margin-bottom: 28px;">
            <div style="font-family: var(--font-hud); font-size: 0.85rem; font-weight: 800; color: var(--ethereal-purple); letter-spacing: 0.1em; margin-bottom: 8px;">PLAYER SYNOPSIS</div>
            <p style="font-size: 1rem; color: var(--silver-grey); line-height: 1.7;">${safeBio}</p>
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-cyan); padding-top: 18px;">
            <div style="font-family: var(--font-hud); font-size: 0.85rem; font-weight: 800; color: var(--icy-cyan); letter-spacing: 0.1em; margin-bottom: 12px;">ACADEMIC_CREDENTIALS</div>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--icy-cyan); padding-left: 12px;">
                <div style="font-weight: 800; color: var(--ash-white); font-size: 1rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--silver-grey);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-cyan); padding-top: 18px;">
            <div style="font-family: var(--font-hud); font-size: 0.85rem; font-weight: 800; color: var(--ethereal-purple); letter-spacing: 0.1em; margin-bottom: 12px;">VERIFIED_HUNTER_LICENSES &amp; CERTS</div>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--ash-white);">
                <span style="background: rgba(168,85,247,0.2); border: 1px solid var(--ethereal-purple); color: #D8B4FE; padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Guild Authority')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-cyan); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-family: var(--font-hud); font-size: 0.82rem; font-weight: 700; color: var(--silver-grey);">STATUS: VERIFIED AWAKENED ARCHITECT</span>
            <button class="abyssal-ghost-btn primary" onclick="triggerPrintResume()">
              <span>DOWNLOAD DOSSIER (PDF) ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT PAGE (Establish Link)
         ========================================================================= -->
    <section class="abyssal-section" id="contact" style="border-bottom: none;">
      <div class="abyssal-container">
        <div class="hud-section-header">08. ESTABLISH_LINK</div>

        <div class="establish-link-grid">
          <div>
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; margin-bottom: 16px;">TRANSMIT SIGNAL TO THE VOID</h2>
            <p style="font-size: 1.05rem; color: var(--silver-grey); line-height: 1.7; margin-bottom: 32px;">
              Ready for high-tier guild alliances, technical raid leadership, or strategic systems engineering.
            </p>

            <div style="display: flex; flex-direction: column; gap: 18px; font-family: var(--font-hud); font-size: 0.95rem; font-weight: 700;">
              <div>
                <span style="color: var(--silver-grey); font-size: 0.75rem; display: block;">DIRECT COMM CHANNEL:</span>
                <a href="mailto:${safeEmail}" style="color: var(--icy-cyan); font-weight: 800;">${safeEmail}</a>
              </div>
              <div>
                <span style="color: var(--silver-grey); font-size: 0.75rem; display: block;">GUILD CODE REPOSITORY:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener" style="color: var(--ash-white);">${safeGithub.replace('https://', '')}</a>
              </div>
              <div>
                <span style="color: var(--silver-grey); font-size: 0.75rem; display: block;">PLAYER PROFILE NETWORK:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener" style="color: var(--ash-white);">${safeLinkedin.replace('https://', '')}</a>
              </div>
            </div>
          </div>

          <div class="gamified-form-matrix">
            <form onsubmit="handleAbyssalContact(event)">
              <input type="text" class="abyssal-bottom-input" placeholder="PLAYER IDENTIFIER / YOUR NAME" required />
              <input type="email" class="abyssal-bottom-input" placeholder="COMM CHANNEL EMAIL" required />
              <input type="text" class="abyssal-bottom-input" placeholder="QUEST OBJECTIVE / SUBJECT" required />
              <textarea class="abyssal-bottom-input" style="min-height: 100px; resize: vertical;" placeholder="TRANSMISSION MESSAGE CONTENT" required></textarea>
              <button type="submit" class="abyssal-ghost-btn primary" style="width: 100%;">
                <span>INITIATE TRANSMISSION ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="abyssal-footer">
    <div class="abyssal-container">
      <div>© 2026 ${safeName} • ABYSSAL ASCENT DESIGN SYSTEM • POWERED BY THREE.JS &amp; NANO BANANA</div>
    </div>
  </footer>

  <!-- Three.js Dimensional Monolith & Shadow Particles Canvas Script -->
  <script>
    function initHeroMonolith3D() {
      const canvas = document.getElementById('home-monolith-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 24;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Monolith Mesh + Floating Shadow Crystals + Portal Rings
      const group = new THREE.Group();
      scene.add(group);

      const purpleMat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, wireframe: true, transparent: true, opacity: 0.75 });
      const cyanMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4, wireframe: true, transparent: true, opacity: 0.8 });
      const particleMat = new THREE.PointsMaterial({ color: 0x06B6D4, size: 0.35 });

      // Monolith Pillar
      const monolithGeo = new THREE.BoxGeometry(4, 12, 2);
      const monolith = new THREE.Mesh(monolithGeo, purpleMat);
      group.add(monolith);

      // Portal Ring
      const ringGeo = new THREE.TorusGeometry(8, 0.12, 16, 64);
      const ring = new THREE.Mesh(ringGeo, cyanMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);

      // Orbiting Rune Crystals
      const crystalGeo = new THREE.OctahedronGeometry(1.2);
      const crystal1 = new THREE.Mesh(crystalGeo, cyanMat);
      const crystal2 = new THREE.Mesh(crystalGeo, purpleMat);
      group.add(crystal1);
      group.add(crystal2);

      // Shadow particles
      const partGeo = new THREE.BufferGeometry();
      const pCount = 200;
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 30;
        pos[i + 1] = (Math.random() - 0.5) * 30;
        pos[i + 2] = (Math.random() - 0.5) * 30;
      }
      partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const particleField = new THREE.Points(partGeo, particleMat);
      group.add(particleField);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      let clock = 0;
      function animate() {
        requestAnimationFrame(animate);
        clock += 0.015;

        monolith.rotation.y += 0.005;
        ring.rotation.z += 0.008;

        crystal1.position.x = Math.cos(clock) * 7;
        crystal1.position.z = Math.sin(clock) * 7;
        crystal1.rotation.y += 0.02;

        crystal2.position.x = Math.cos(clock + Math.PI) * 7;
        crystal2.position.z = Math.sin(clock + Math.PI) * 7;
        crystal2.rotation.x += 0.02;

        group.rotation.y += mouseX * 0.008;
        group.rotation.x += mouseY * 0.008;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        const w = parent.clientWidth || 400;
        const h = parent.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    }

    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, colors: ['#8B5CF6', '#06B6D4', '#E2E8F0'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleAbyssalContact(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>TRANSMISSION DISPATCHED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroMonolith3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { AbyssalAscentTemplate };

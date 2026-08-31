/**
 * Template 13: System Awakening (Shadow Monarch Hunter Interface)
 * Inspired by Solo Leveling Hunter System / Shadow Monarch UI aesthetics.
 * Palette: Abyssal Black (#08080C), System Blue (#00E5FF), Shadow Monarch Purple (#8A2BE2), Cold Steel (#2A2D34).
 * Motifs: Translucent glowing Status Windows, chamfered angular panels, quest prompts, mana gauges, rune pillars.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const SystemAwakeningTemplate = {
  id: 'system-awakening',
  name: 'System Awakening',
  category: 'Sci-Fi / Hunter System',
  description: 'Global System Awakening interface with translucent glowing blue holographic Status Windows, angular chamfered panels, Mana Gauges, Quest Logs, and Shadow Monarch purple aura.',
  recommendedFor: ['Full Stack & Web3 Developer', 'AI Systems Architect', 'Smart Contract Engineer', 'Game & Engine Developer', 'Cybersecurity Specialist'],
  palette: ['#08080C', '#00E5FF', '#8A2BE2', '#2A2D34', '#F8FAFC'],

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

    // Difficulty ranks for quests
    const ranks = ['S-Rank', 'A-Rank', 'S-Rank', 'B-Rank', 'A-Rank', 'S-Rank'];

    // 03. Dynamic Quest Board Cards
    const assignedArtworks = new Set([
      '/assets/3d/cosmic_astronaut_3d.jpg',
      '/assets/3d/bio_digital_fusion_3d.jpg',
      '/assets/3d/developer_showcase_portfolio_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const rank = ranks[idx % ranks.length];
      const rankColor = rank.startsWith('S') ? '#FFD700' : rank.startsWith('A') ? '#00E5FF' : '#C084FC';
      return `
        <div class="quest-window-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
          <div class="quest-card-header">
            <div class="quest-header-left">
              <span class="quest-icon">⚔️</span>
              <span class="quest-rank-badge" style="color: ${rankColor}; border-color: ${rankColor}; text-shadow: 0 0 10px ${rankColor};">${rank}</span>
            </div>
            <span class="quest-id-tag">QUEST_LOG#00${idx + 1}</span>
          </div>

          <div class="quest-thumb-container">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'system-awakening', idx, assignedArtworks, userSeed)}
          </div>

          <div class="quest-card-content">
            <h3 class="quest-title-text">${TemplateHelper.escapeHtml(p.name)}</h3>
            <div class="quest-category-label">[Domain: ${TemplateHelper.escapeHtml(p.category || 'System Protocol')}]</div>
            <p class="quest-desc-text">${TemplateHelper.escapeHtml(p.desc)}</p>
            
            <div class="quest-tech-tags">
              ${p.tech.split(/[,•|]+/).map(t => `<span class="quest-item-pill">🔷 ${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
            </div>

            <div class="quest-card-footer">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="quest-btn-action primary"><span class="btn-bracket">[</span>ACCEPT QUEST<span class="btn-bracket">]</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="quest-btn-action outline"><span class="btn-bracket">[</span>VIEW LOG<span class="btn-bracket">]</span></a>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 04. Dynamic Skills: Active Skills & Passive Skills with Mana Gauges
    const halfSkills = Math.ceil(data.skills.length / 2);
    const activeSkills = data.skills.slice(0, halfSkills);
    const passiveSkills = data.skills.slice(halfSkills, halfSkills * 2);

    const renderManaGauge = (s, idx, isPassive = false) => {
      const pct = Math.max(78, 98 - (idx * 4));
      const gaugeColor = isPassive ? 'linear-gradient(90deg, #8A2BE2 0%, #C084FC 100%)' : 'linear-gradient(90deg, #00E5FF 0%, #38BDF8 100%)';
      const shadowColor = isPassive ? 'rgba(138, 43, 226, 0.45)' : 'rgba(0, 229, 255, 0.45)';
      const typeIcon = isPassive ? '🟣' : '🔷';

      return `
        <div class="mana-gauge-row">
          <div class="mana-gauge-info">
            <span class="skill-name-label">${typeIcon} ${TemplateHelper.escapeHtml(s)}</span>
            <span class="skill-pct-label">${pct}% MP</span>
          </div>
          <div class="mana-gauge-track">
            <div class="mana-gauge-fill" style="width: ${pct}%; background: ${gaugeColor}; box-shadow: 0 0 14px ${shadowColor};"></div>
          </div>
        </div>
      `;
    };

    const activeSkillsHtml = activeSkills.map((s, idx) => renderManaGauge(s, idx, false)).join('');
    const passiveSkillsHtml = passiveSkills.map((s, idx) => renderManaGauge(s, idx, true)).join('');

    // 05. Dynamic Experience: Quest History Milestones
    const experienceHtml = data.experience.map((exp, idx) => `
      <div class="quest-history-entry">
        <div class="history-node-bracket">
          <div class="pillar-rune-dot"></div>
          <div class="pillar-milestone-marker">M-0${idx + 1}</div>
        </div>
        <div class="history-card-panel">
          <div class="watermark-clear-stamp">CLEAR</div>
          <div class="history-meta-row">
            <span class="history-time-badge">${TemplateHelper.escapeHtml(exp.period || '2023 – Present')}</span>
            <span class="history-guild-tag">Guild: <strong>${TemplateHelper.escapeHtml(exp.company || 'Shadow Protocol Labs')}</strong></span>
          </div>
          <h3 class="history-role-title">${TemplateHelper.escapeHtml(exp.role || 'Senior System Architect')}</h3>
          <div class="history-objective-block">
            <div class="objective-header">⚔️ Objective Cleared:</div>
            <p class="history-desc-text">${TemplateHelper.escapeHtml(exp.desc || 'Architected high-throughput decentralized protocols, WebGL holographic engines, and resilient distributed microservices.')}</p>
          </div>
        </div>
      </div>
    `).join('');

    const eduPrimary = data.education[0] || { degree: 'B.Tech in Computer Science & Engineering', institution: 'Apex Hunter Academy' };

    const yearsExp = data.experience?.length ? data.experience.length : 1;
    const completedQuests = data.publicRepos ?? data.projects.length;
    const techStackCount = data.skills.length;
    const awardsCount = Math.max(1, Math.floor(data.projects.length / 2));

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player [${safeName}] — ${safeRole} | System Awakening</title>
  <meta name="description" content="System Awakening Hunter Interface for ${safeName}. Class: ${safeRole}.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700;800&family=JetBrains+Mono:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-abyss: #08080C;
      --bg-surface: #0E1017;
      --bg-glass: rgba(14, 16, 23, 0.88);
      --system-blue: #00E5FF;
      --system-blue-glow: rgba(0, 229, 255, 0.35);
      --monarch-purple: #8A2BE2;
      --monarch-purple-glow: rgba(138, 43, 226, 0.35);
      --cold-steel: #2A2D34;
      --cold-steel-border: rgba(42, 45, 52, 0.9);
      --text-white: #F8FAFC;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      --font-system: 'Rajdhani', 'JetBrains Mono', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-ui: 'Plus Jakarta Sans', sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 15px; }

    body {
      background-color: var(--bg-abyss);
      color: var(--text-white);
      font-family: var(--font-ui);
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
      line-height: 1.6;
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(138, 43, 226, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 10% 40%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(138, 43, 226, 0.08) 0%, transparent 50%);
    }

    /* Floating Magical Embers Atmosphere */
    .system-portal-mesh {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background-image: 
        linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Top Status HUD Navigation */
    .system-top-hud {
      position: fixed;
      top: 16px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .system-hud-bar {
      width: 100%;
      max-width: 1140px;
      background: rgba(8, 8, 12, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--system-blue);
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.25), inset 0 0 12px rgba(0, 229, 255, 0.1);
      clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .system-player-tag {
      font-family: var(--font-system);
      font-size: 1.15rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      color: var(--system-blue);
      text-shadow: 0 0 12px var(--system-blue-glow);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .player-rank-cube {
      background: var(--system-blue);
      color: #08080C;
      font-size: 0.75rem;
      font-weight: 900;
      padding: 2px 7px;
      clip-path: polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
    }

    .system-hud-nav {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .system-nav-link {
      font-family: var(--font-system);
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.2s;
    }

    .system-nav-link:hover {
      color: var(--system-blue);
      text-shadow: 0 0 10px var(--system-blue-glow);
    }

    .system-init-btn {
      font-family: var(--font-system);
      font-size: 0.9rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      background: rgba(0, 229, 255, 0.12);
      border: 1px solid var(--system-blue);
      color: var(--system-blue);
      padding: 6px 18px;
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
      text-decoration: none;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.3);
      transition: all 0.25s;
    }

    .system-init-btn:hover {
      background: var(--system-blue);
      color: #08080C;
      box-shadow: 0 0 24px var(--system-blue);
      transform: scale(1.04);
    }

    .system-page-container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 100px 24px 80px;
      position: relative;
      z-index: 1;
    }

    /* ==========================================================================
       01. HERO / HOME SECTION ("System Awakening Domain")
       ========================================================================== */
    .system-hero-section {
      min-height: 88vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      margin-bottom: 90px;
    }

    .hero-portal-bg-layer {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 0;
      opacity: 0.45;
    }

    .portal-graphic-3d {
      width: 100%;
      max-width: 600px;
      filter: drop-shadow(0 0 35px rgba(138, 43, 226, 0.65));
      animation: portalSlowRotate 24s linear infinite;
    }

    @keyframes portalSlowRotate {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.04); }
      100% { transform: rotate(360deg) scale(1); }
    }

    /* Center Holographic System Window */
    .holographic-status-window {
      position: relative;
      z-index: 2;
      max-width: 780px;
      width: 100%;
      background: rgba(8, 10, 18, 0.88);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1.5px solid var(--system-blue);
      box-shadow: 0 0 35px rgba(0, 229, 255, 0.35), inset 0 0 25px rgba(0, 229, 255, 0.15);
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
      padding: 40px;
      text-align: left;
    }

    .status-window-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 229, 255, 0.25);
      padding-bottom: 14px;
      margin-bottom: 24px;
    }

    .system-notification-alert {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--system-blue);
      letter-spacing: 0.14em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .blinking-cursor-indicator {
      display: inline-block;
      width: 8px;
      height: 14px;
      background: var(--system-blue);
      animation: blinkCursor 1s step-end infinite;
    }

    @keyframes blinkCursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .domain-security-level {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--monarch-purple);
      border: 1px solid rgba(138, 43, 226, 0.5);
      padding: 3px 10px;
      border-radius: 4px;
      background: rgba(138, 43, 226, 0.1);
    }

    .hero-greeting-bold {
      font-family: var(--font-system);
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      font-weight: 900;
      line-height: 1.08;
      letter-spacing: -0.01em;
      color: #FFFFFF;
      margin-bottom: 12px;
    }

    .hero-greeting-bold span {
      color: var(--system-blue);
      text-shadow: 0 0 18px var(--system-blue-glow);
    }

    .hero-class-subtitle {
      font-family: var(--font-system);
      font-size: 1.4rem;
      font-weight: 800;
      color: #C084FC;
      letter-spacing: 0.04em;
      margin-bottom: 20px;
    }

    .hero-objective-box {
      background: rgba(0, 0, 0, 0.45);
      border-left: 3px solid var(--system-blue);
      padding: 14px 18px;
      margin-bottom: 32px;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .hero-actions-row {
      display: flex;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }

    .btn-quest-primary {
      font-family: var(--font-system);
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      background: var(--system-blue);
      color: #08080C;
      padding: 14px 34px;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      text-decoration: none;
      box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-quest-primary:hover {
      background: #FFFFFF;
      box-shadow: 0 0 35px #00E5FF;
      transform: translateY(-2px);
    }

    .btn-quest-secondary {
      font-family: var(--font-system);
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      background: rgba(138, 43, 226, 0.15);
      border: 1.5px solid var(--monarch-purple);
      color: #C084FC;
      padding: 12px 30px;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      text-decoration: none;
      box-shadow: 0 0 20px rgba(138, 43, 226, 0.35);
      transition: all 0.25s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-quest-secondary:hover {
      background: var(--monarch-purple);
      color: #FFFFFF;
      box-shadow: 0 0 30px var(--monarch-purple);
      transform: translateY(-2px);
    }

    /* Section Header Template */
    .system-section-header {
      text-align: center;
      margin: 80px 0 40px;
    }

    .system-section-num {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--system-blue);
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .system-section-title {
      font-family: var(--font-system);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      letter-spacing: 0.04em;
      color: #FFFFFF;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    }

    /* ==========================================================================
       02. ABOUT SECTION ("Player Status Screen")
       ========================================================================== */
    .player-status-screen {
      background: rgba(14, 16, 24, 0.85);
      border: 1.5px solid rgba(0, 229, 255, 0.4);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.08);
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
      padding: 40px;
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 40px;
      align-items: center;
      margin-bottom: 90px;
    }

    .status-visual-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .status-wireframe-avatar {
      width: 100%;
      max-width: 380px;
      border-radius: 16px;
      border: 1px solid rgba(138, 43, 226, 0.4);
      box-shadow: 0 0 25px rgba(138, 43, 226, 0.3);
    }

    .status-details-column {
      display: flex;
      flex-direction: column;
    }

    .status-window-label {
      font-family: var(--font-system);
      font-size: 1.6rem;
      font-weight: 900;
      color: var(--system-blue);
      letter-spacing: 0.08em;
      margin-bottom: 14px;
      text-shadow: 0 0 14px var(--system-blue-glow);
    }

    .status-summary-typewriter {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 28px;
      background: rgba(0, 0, 0, 0.4);
      padding: 16px;
      border-left: 3px solid var(--monarch-purple);
    }

    .status-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 28px;
    }

    .stat-block-chip {
      background: rgba(8, 10, 18, 0.85);
      border: 1px solid rgba(0, 229, 255, 0.25);
      padding: 14px;
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
      transition: all 0.2s;
    }

    .stat-block-chip:hover {
      border-color: var(--system-blue);
      box-shadow: 0 0 16px rgba(0, 229, 255, 0.25);
      transform: translateY(-2px);
    }

    .stat-block-name {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 4px;
    }

    .stat-block-value {
      font-family: var(--font-system);
      font-size: 1.5rem;
      font-weight: 900;
      color: #FFFFFF;
    }

    .stat-block-value span {
      color: var(--system-blue);
      font-size: 1.1rem;
    }

    .exp-rank-progress-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .exp-rank-label-row {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: #C084FC;
    }

    .exp-rank-bar-track {
      height: 8px;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(138, 43, 226, 0.4);
      border-radius: 4px;
      overflow: hidden;
    }

    .exp-rank-bar-fill {
      height: 100%;
      width: 88%;
      background: linear-gradient(90deg, #8A2BE2 0%, #00E5FF 100%);
      box-shadow: 0 0 12px rgba(0, 229, 255, 0.5);
    }

    /* ==========================================================================
       03. PROJECTS SECTION ("Quest Board")
       ========================================================================== */
    .quest-board-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
      gap: 28px;
      margin-bottom: 90px;
    }

    .quest-window-card {
      background: rgba(14, 16, 24, 0.88);
      border: 1.5px solid rgba(0, 229, 255, 0.35);
      clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .quest-window-card:hover {
      border-color: var(--system-blue);
      box-shadow: 0 0 28px rgba(0, 229, 255, 0.35);
      transform: translateY(-6px);
    }

    .quest-card-header {
      padding: 12px 18px;
      background: rgba(0, 0, 0, 0.5);
      border-bottom: 1px solid rgba(0, 229, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .quest-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .quest-rank-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 800;
      border: 1px solid;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
    }

    .quest-id-tag {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-dim);
    }

    .quest-thumb-container {
      width: 100%;
      background: #060919;
    }

    .quest-card-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .quest-title-text {
      font-family: var(--font-system);
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .quest-category-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--system-blue);
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    .quest-desc-text {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 18px;
      flex: 1;
    }

    .quest-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 22px;
    }

    .quest-item-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #C084FC;
      background: rgba(138, 43, 226, 0.12);
      border: 1px solid rgba(138, 43, 226, 0.3);
      padding: 3px 9px;
      border-radius: 4px;
    }

    .quest-card-actions {
      display: flex;
      gap: 10px;
      margin-top: auto;
    }

    .quest-btn-action {
      font-family: var(--font-system);
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      padding: 8px 16px;
      text-decoration: none;
      clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
      transition: all 0.2s;
    }

    .quest-btn-action.primary {
      background: var(--system-blue);
      color: #08080C;
    }

    .quest-btn-action.primary:hover {
      background: #FFFFFF;
      box-shadow: 0 0 16px var(--system-blue);
    }

    .quest-btn-action.outline {
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid var(--system-blue);
      color: var(--system-blue);
    }

    .quest-btn-action.outline:hover {
      background: rgba(0, 229, 255, 0.2);
    }

    .btn-bracket {
      opacity: 0.5;
      margin: 0 2px;
    }

    /* ==========================================================================
       04. SKILLS SECTION ("Skill Tree & Mana Gauges")
       ========================================================================== */
    .skills-tree-panel {
      background: rgba(14, 16, 24, 0.85);
      border: 1.5px solid rgba(138, 43, 226, 0.4);
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(138, 43, 226, 0.08);
      padding: 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 90px;
    }

    .skill-branch-title {
      font-family: var(--font-system);
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.05em;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mana-gauge-row {
      margin-bottom: 18px;
    }

    .mana-gauge-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
    }

    .skill-name-label {
      color: #FFFFFF;
    }

    .skill-pct-label {
      color: var(--system-blue);
    }

    .mana-gauge-track {
      height: 9px;
      background: rgba(0, 0, 0, 0.7);
      border: 1px solid var(--cold-steel-border);
      border-radius: 4px;
      overflow: hidden;
    }

    .mana-gauge-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 1s ease-out;
    }

    /* ==========================================================================
       05. EXPERIENCE SECTION ("Quest History")
       ========================================================================== */
    .quest-history-pillar {
      position: relative;
      max-width: 860px;
      margin: 0 auto 90px;
      padding: 20px 0;
    }

    .quest-history-pillar::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 24px;
      width: 3px;
      background: linear-gradient(180deg, var(--system-blue) 0%, var(--monarch-purple) 100%);
      box-shadow: 0 0 12px var(--system-blue-glow);
    }

    .quest-history-entry {
      position: relative;
      margin-bottom: 36px;
      padding-left: 64px;
    }

    .history-node-bracket {
      position: absolute;
      left: 12px;
      top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pillar-rune-dot {
      width: 16px;
      height: 16px;
      background: var(--system-blue);
      border: 3px solid #08080C;
      border-radius: 50%;
      box-shadow: 0 0 14px var(--system-blue);
    }

    .pillar-milestone-marker {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--system-blue);
      margin-top: 4px;
    }

    .history-card-panel {
      background: rgba(14, 16, 24, 0.9);
      border: 1px solid rgba(0, 229, 255, 0.25);
      clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
      padding: 28px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }

    .watermark-clear-stamp {
      position: absolute;
      right: 20px;
      bottom: 10px;
      font-family: var(--font-system);
      font-size: 4.5rem;
      font-weight: 900;
      color: rgba(0, 229, 255, 0.05);
      letter-spacing: 0.1em;
      pointer-events: none;
      transform: rotate(-10deg);
    }

    .history-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .history-time-badge {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 800;
      color: var(--system-blue);
    }

    .history-guild-tag {
      font-family: var(--font-system);
      font-size: 0.92rem;
      color: #C084FC;
    }

    .history-role-title {
      font-family: var(--font-system);
      font-size: 1.35rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 14px;
    }

    .history-objective-block {
      background: rgba(0, 0, 0, 0.4);
      padding: 12px 16px;
      border-left: 2px solid var(--monarch-purple);
    }

    .objective-header {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--monarch-purple);
      margin-bottom: 4px;
    }

    .history-desc-text {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* ==========================================================================
       06. RESUME SECTION ("Hunter License")
       ========================================================================== */
    .hunter-license-panel {
      background: rgba(14, 16, 24, 0.88);
      border: 1.5px solid rgba(0, 229, 255, 0.35);
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
      box-shadow: 0 0 35px rgba(0, 0, 0, 0.8);
      padding: 40px;
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 40px;
      align-items: center;
      margin-bottom: 90px;
    }

    .hunter-card-visual {
      width: 100%;
      max-width: 380px;
      border-radius: 16px;
      border: 1.5px solid var(--system-blue);
      box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
      display: block;
      margin: 0 auto;
    }

    .hunter-license-title {
      font-family: var(--font-system);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--system-blue);
      margin-bottom: 8px;
    }

    .hunter-license-meta {
      font-family: var(--font-mono);
      font-size: 0.92rem;
      color: #C084FC;
      margin-bottom: 18px;
    }

    .hunter-stats-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }

    .hunter-stat-item {
      display: flex;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.5);
      padding: 10px 14px;
      border-left: 3px solid var(--system-blue);
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .btn-extract-pdf {
      font-family: var(--font-mono);
      font-size: 0.92rem;
      font-weight: 800;
      background: var(--system-blue);
      color: #08080C;
      padding: 14px 28px;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      text-decoration: none;
      box-shadow: 0 0 24px var(--system-blue-glow);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s;
    }

    .btn-extract-pdf:hover {
      background: #FFFFFF;
      box-shadow: 0 0 35px var(--system-blue);
      transform: translateY(-2px);
    }

    /* ==========================================================================
       08. CONTACT SECTION ("Summoning Portal")
       ========================================================================== */
    .summoning-portal-wrap {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 40px;
      align-items: center;
      margin-bottom: 90px;
    }

    .portal-info-panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .summoning-info-card {
      background: rgba(14, 16, 24, 0.85);
      border: 1px solid rgba(138, 43, 226, 0.3);
      padding: 20px;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .summoning-icon-box {
      width: 44px;
      height: 44px;
      background: rgba(138, 43, 226, 0.2);
      border: 1px solid var(--monarch-purple);
      color: #C084FC;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .summoning-card-title {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-dim);
      text-transform: uppercase;
    }

    .summoning-card-val {
      font-family: var(--font-system);
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
    }

    .telepathic-form-window {
      background: rgba(14, 16, 24, 0.9);
      border: 1.5px solid var(--system-blue);
      clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
      box-shadow: 0 0 30px rgba(0, 229, 255, 0.25);
      padding: 36px;
    }

    .system-input-field {
      width: 100%;
      background: rgba(8, 8, 12, 0.85);
      border: 1px solid rgba(0, 229, 255, 0.3);
      padding: 14px 18px;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--text-white);
      margin-bottom: 18px;
      transition: all 0.2s;
    }

    .system-input-field:focus {
      outline: none;
      border-color: var(--system-blue);
      box-shadow: 0 0 16px rgba(0, 229, 255, 0.4);
      background: rgba(14, 16, 24, 0.95);
    }

    .btn-transmit-signal {
      width: 100%;
      background: linear-gradient(135deg, var(--system-blue) 0%, #2563EB 100%);
      color: #08080C;
      font-family: var(--font-system);
      font-size: 1.1rem;
      font-weight: 900;
      letter-spacing: 0.08em;
      padding: 16px;
      border: none;
      clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
      cursor: pointer;
      box-shadow: 0 0 25px rgba(0, 229, 255, 0.45);
      transition: all 0.25s;
    }

    .btn-transmit-signal:hover {
      background: #FFFFFF;
      box-shadow: 0 0 40px #00E5FF;
      transform: translateY(-2px);
    }

    /* System Footer */
    .system-footer-bar {
      border-top: 1px solid rgba(0, 229, 255, 0.2);
      padding: 36px 20px;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-dim);
    }

    @media (max-width: 900px) {
      .player-status-screen,
      .skills-tree-panel,
      .hunter-license-panel,
      .summoning-portal-wrap {
        grid-template-columns: 1fr;
      }
      .system-hud-nav { display: none; }
    }
  </style>
</head>
<body>
  <!-- System Background Grid & Particles -->
  <div class="system-portal-mesh"></div>

  <!-- Top System Status HUD Navigation -->
  <header class="system-top-hud">
    <div class="system-hud-bar">
      <a href="#home" class="system-player-tag">
        <span class="player-rank-cube">S-RANK</span>
        <span>PLAYER [${safeName.toUpperCase()}]</span>
      </a>
      <nav class="system-hud-nav">
        <a href="#home" class="system-nav-link">SYSTEM</a>
        <a href="#status" class="system-nav-link">STATUS</a>
        <a href="#quests" class="system-nav-link">QUESTS</a>
        <a href="#skills" class="system-nav-link">SKILL TREE</a>
        <a href="#history" class="system-nav-link">HISTORY</a>
        <a href="#license" class="system-nav-link">LICENSE</a>
        <a href="#summon" class="system-nav-link">SUMMON</a>
      </nav>
      <a href="mailto:${safeEmail}" class="system-init-btn">INITIATE CO-OP ⚡</a>
    </div>
  </header>

  <div class="system-page-container">
    <!-- 01. HERO / HOME SECTION ("System Awakening Domain") -->
    <section id="home" class="system-hero-section">
      <div class="hero-portal-bg-layer">
        <img src="/assets/3d/cosmic_astronaut_3d.jpg" alt="Shadow Monarch Portal" class="portal-graphic-3d" />
      </div>

      <div class="holographic-status-window">
        <div class="status-window-header">
          <div class="system-notification-alert">
            <span class="blinking-cursor-indicator"></span>
            <span>SYSTEM NOTIFICATION // AWAKENING DETECTED</span>
          </div>
          <div class="domain-security-level">DOMAIN: S-RANK</div>
        </div>

        <h1 class="hero-greeting-bold">Player [<span>${safeName}</span>] has entered the domain.</h1>
        <div class="hero-class-subtitle">⚔️ Class: ${safeRole}</div>

        <div class="hero-objective-box">
          <strong>CURRENT OBJECTIVE:</strong> ${safeBio}
        </div>

        <div class="hero-actions-row">
          <a href="#quests" class="btn-quest-primary">
            <span>📦 VIEW INVENTORY / QUESTS</span>
          </a>
          <a href="mailto:${safeEmail}" class="btn-quest-secondary">
            <span>⚡ INITIATE CO-OP PROTOCOL</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 02. ABOUT SECTION ("Player Status Screen") -->
    <section id="status">
      <div class="system-section-header">
        <div class="system-section-num">02. SYSTEM DIAGNOSTIC</div>
        <h2 class="system-section-title">Player Status Screen</h2>
      </div>

      <div class="player-status-screen">
        <div class="status-visual-column">
          <img src="/assets/3d/bio_digital_fusion_3d.jpg" alt="Neural Holographic Avatar" class="status-wireframe-avatar" />
        </div>

        <div class="status-details-column">
          <div class="status-window-label">STATUS WINDOW</div>
          <div class="status-summary-typewriter">
            ${safeBio}
          </div>

          <div class="status-stats-grid">
            <div class="stat-block-chip">
              <div class="stat-block-name">Level (Years Exp)</div>
              <div class="stat-block-value">LVL <span>${yearsExp}</span></div>
            </div>
            <div class="stat-block-chip">
              <div class="stat-block-name">Completed Quests (Projects)</div>
              <div class="stat-block-value"><span>${completedQuests}</span> CLEARED</div>
            </div>
            <div class="stat-block-chip">
              <div class="stat-block-name">Agility (Tech Stack)</div>
              <div class="stat-block-value"><span>${techStackCount}</span> SKILLS</div>
            </div>
            <div class="stat-block-chip">
              <div class="stat-block-name">Titles (Awards)</div>
              <div class="stat-block-value"><span>${awardsCount}</span> TITLES</div>
            </div>
          </div>

          <div class="exp-rank-progress-wrap">
            <div class="exp-rank-label-row">
              <span>EXPERIENCE TO NEXT RANK</span>
              <span>88,400 / 100,000 EXP</span>
            </div>
            <div class="exp-rank-bar-track">
              <div class="exp-rank-bar-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. PROJECTS SECTION ("Quest Board") -->
    <section id="quests">
      <div class="system-section-header">
        <div class="system-section-num">03. ACTIVE BOUNTIES</div>
        <h2 class="system-section-title">Quest Board & Artifacts</h2>
      </div>

      <div class="quest-board-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS SECTION ("Skill Tree & Mana Gauges") -->
    <section id="skills">
      <div class="system-section-header">
        <div class="system-section-num">04. MANA ALLOCATION</div>
        <h2 class="system-section-title">Skill Tree & Mana Gauges</h2>
      </div>

      <div class="skills-tree-panel">
        <div>
          <div class="skill-branch-title">⚡ Active Skills (Engineering & Code)</div>
          ${activeSkillsHtml}
        </div>
        <div>
          <div class="skill-branch-title">🔮 Passive Skills (Architecture & Systems)</div>
          ${passiveSkillsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE SECTION ("Quest History") -->
    <section id="history">
      <div class="system-section-header">
        <div class="system-section-num">05. GUILD CAMPAIGNS</div>
        <h2 class="system-section-title">Quest History & Chronicle</h2>
      </div>

      <div class="quest-history-pillar">
        ${experienceHtml}
      </div>
    </section>

    <!-- 06. RESUME SECTION ("Hunter License") -->
    <section id="license">
      <div class="system-section-header">
        <div class="system-section-num">06. CREDENTIALS</div>
        <h2 class="system-section-title">High-Rank Hunter License</h2>
      </div>

      <div class="hunter-license-panel">
        <div>
          <img src="/assets/3d/developer_showcase_portfolio_3d.jpg" alt="Hunter License Holographic Card" class="hunter-card-visual" />
        </div>
        <div>
          <h3 class="hunter-license-title">${safeName}</h3>
          <div class="hunter-license-meta">Rank: <strong>${safeRole}</strong></div>

          <div style="margin-top: 14px; margin-bottom: 14px;">
            <div style="font-size: 0.82rem; color: var(--system-blue); font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">Academy Accreditation</div>
            ${data.education.map(edu => `
              <div style="font-size: 0.92rem; color: #FFFFFF; margin-bottom: 4px;">
                🎓 <strong>${TemplateHelper.escapeHtml(edu.degree)}</strong> • ${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `(${TemplateHelper.escapeHtml(edu.period)})` : ''}
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 14px; margin-bottom: 14px;">
            <div style="font-size: 0.82rem; color: #C084FC; font-weight: 800; text-transform: uppercase; margin-bottom: 6px;">Verified Hunter Certifications</div>
            ${data.certifications.map(c => `
              <div style="font-size: 0.88rem; color: #E2E8F0; margin-bottom: 4px;">
                📜 <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
              </div>
            `).join('')}
          </div>
          
          <div class="hunter-stats-list">
            <div class="hunter-stat-item">
              <span style="color: var(--text-dim);">Combat Experience:</span>
              <span style="color: var(--system-blue);">${yearsExp}+ Years Active Service</span>
            </div>
            <div class="hunter-stat-item">
              <span style="color: var(--text-dim);">Artifacts Forged:</span>
              <span style="color: #C084FC;">${completedQuests} Software Artifacts</span>
            </div>
            <div class="hunter-stat-item">
              <span style="color: var(--text-dim);">Guild Clearance:</span>
              <span style="color: #10B981;">S-Rank Unrestricted Authorization</span>
            </div>
          </div>

          <a href="mailto:${safeEmail}" class="btn-extract-pdf">
            <span>💾 EXTRACT PROFILE DATA (PDF)</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 08. CONTACT SECTION ("Summoning Portal") -->
    <section id="summon">
      <div class="system-section-header">
        <div class="system-section-num">08. TELEPATHIC CONDUIT</div>
        <h2 class="system-section-title">Summoning Portal & Transceiver</h2>
      </div>

      <div class="summoning-portal-wrap">
        <div class="portal-info-panel">
          <div class="summoning-info-card">
            <div class="summoning-icon-box">⚡</div>
            <div>
              <div class="summoning-card-title">Direct Transmission Mana Line</div>
              <div class="summoning-card-val">${safeEmail}</div>
            </div>
          </div>
          <div class="summoning-info-card">
            <div class="summoning-icon-box">🐙</div>
            <div>
              <div class="summoning-card-title">Guild Repository Nexus</div>
              <div class="summoning-card-val">@${safeGithub.replace('https://github.com/', '') || 'developer'}</div>
            </div>
          </div>
          <div class="summoning-info-card">
            <div class="summoning-icon-box">🛡️</div>
            <div>
              <div class="summoning-card-title">Hunter Association Channel</div>
              <div class="summoning-card-val">Connected &amp; Verified</div>
            </div>
          </div>
        </div>

        <div class="telepathic-form-window">
          <input type="text" placeholder="Hunter Name / Guild ID" class="system-input-field" />
          <input type="email" placeholder="Mana Frequency / Email" class="system-input-field" />
          <textarea rows="4" placeholder="Transmit your mission request or co-op coordinates..." class="system-input-field" style="resize: vertical;"></textarea>
          <button type="button" class="btn-transmit-signal" onclick="window.location.href='mailto:${safeEmail}'">TRANSMIT SIGNAL ➔</button>
        </div>
      </div>
    </section>

    <!-- System Footer -->
    <footer class="system-footer-bar">
      <div>SYSTEM AWAKENING // Hunter Domain Registered by ${safeName}. All rights reserved.</div>
    </footer>
  </div>
</body>
</html>`;

    return { html, css: '', js: '' };
  }
};

module.exports = { SystemAwakeningTemplate };

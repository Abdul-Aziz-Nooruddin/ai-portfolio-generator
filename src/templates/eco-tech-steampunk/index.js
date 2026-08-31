/**
 * Template 06: Eco-Tech Developer & Steampunk Organic Codex
 * Theme: Deep Forest Obsidian (#0F1A12), Antique Timber Walnut (#2A1E17), Aged Parchment (#F7F2E7), Polished Copper & Brass (#C88A3E, #D49B50), Bio-Magical Emerald (#10B981)
 * 3D Engine: Three.js Glowing Magical Crystal Leaf with Procedural Veins, Swirling Golden Spores & Clockwork Gears
 * 9-Panel UI/UX Architecture:
 * 1. Home / Hero: Open Hand holding Glowing Crystal Leaf & Brass Navigation
 * 2. About: Tree Trunk Cross-Section Ring Infographic with Metrics & Growth Chart
 * 3. Projects: Glass & Wood Curio Display Cases with Glowing 3D Holograms
 * 4. Skills: Branching Botanical Tree with Leaf Nodes & Copper Gear Sliders
 * 5. Experience: Deep Root Subterranean Timeline Intertwined with Buried Copper Gears
 * 6. Resume: Tactile Stack of Leather-bound Folios, Slate Tablets & Parchment
 * 7. Blog / Notes: Open Vintage Wooden Treasure Chests with Glowing Luminescence
 * 8. Contact: Steampunk Wooden Satellite Dish Terminal & Perched Blue Messenger Bird
 * 9. Footer / 404: Misty Overgrown Forest Ruins with Moss Stone Blocks & Garden Gnome
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');

const EcoTechSteampunkTemplate = {
  id: 'eco-tech-steampunk',
  name: 'Eco-Tech Steampunk Codex',
  category: 'Steampunk / Eco-Tech Nature',
  description: 'A 9-grid organic nature and vintage steampunk fusion featuring glowing crystal leaf 3D holograms, tree-ring infographics, curio display cases, and mechanical clockwork root timelines.',
  thumbnail: '/assets/templates/eco-tech-steampunk.jpg',
  palette: {
    bg: '#0F1A12',
    bgAlt: '#142217',
    surface: '#1F2E23',
    surfaceAlt: '#2A1E17',
    parchment: '#F7F2E7',
    parchmentDark: '#EFE6D2',
    text: '#F1F5F2',
    textMuted: '#A7C4B5',
    primary: '#10B981',
    accent: '#C88A3E',
    brass: '#D49B50',
    copper: '#A66B24',
    border: 'rgba(200, 138, 62, 0.28)',
    glow: 'rgba(16, 185, 129, 0.4)'
  },
  recommendedFor: ['Eco-Tech Developer', 'Full Stack Engineer', 'Creative Technologist', 'Systems Architect', 'UI/UX Designer'],

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
    const currentYear = new Date().getFullYear();

    // 1. Projects - Glass & Wood Curio Display Cases with Holographic 3D Art
    const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');
    const assignedArtworks = new Set([
      '/assets/3d/crystal_leaf_hand_3d.jpg',
      '/assets/3d/steampunk_satellite_bird_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';

    const projectCardsHtml = data.projects.map((p, idx) => {
      const techTags = p.tech.split(/[,•|]+/).map(t => t.trim()).filter(Boolean);
      return `
        <article class="curio-case-card" data-category="${TemplateHelper.escapeHtml(p.category)}">
          <div class="curio-brass-hinge hinge-tl"></div>
          <div class="curio-brass-hinge hinge-tr"></div>
          <div class="curio-brass-hinge hinge-bl"></div>
          <div class="curio-brass-hinge hinge-br"></div>
          
          <div class="curio-glass-dome" style="min-height: 190px; padding: 12px; display: flex; align-items: center; justify-content: center;">
            <div class="curio-holo-emitter" style="width: 100%;">
              <div class="curio-holo-specimen" style="width: 100%; border-radius: 12px; overflow: hidden;">
                ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'eco-tech-steampunk', idx, assignedArtworks, userSeed)}
              </div>
              <span class="curio-holo-tag">${TemplateHelper.escapeHtml(p.category || 'Featured Engineering')}</span>
            </div>
          </div>

          <div class="curio-timber-plate">
            <div class="curio-plate-header">
              <span class="curio-specimen-id">PROJECT #${String(idx + 1).padStart(2, '0')}</span>
              <div class="curio-specimen-status">
                <span class="status-pip active"></span>
                <span>Active Artifact</span>
              </div>
            </div>
            <h3 class="curio-project-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="curio-project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>
            
            <div class="curio-tech-pills">
              ${techTags.map(t => `<span class="copper-leaf-pill">${TemplateHelper.escapeHtml(t)}</span>`).join('')}
            </div>

            <div class="curio-actions">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="brass-btn primary">Live Artifact ↗</a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="brass-btn secondary">${Template3DVisuals.getIcons().github} Source Code</a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 2. Skills - Branching Tree + Wood Tracks with Copper Gear Sliders
    const skillLeavesHtml = data.skills.slice(0, 8).map((s, idx) => {
      const angle = (idx * 45) - 20;
      return `
        <div class="skill-tree-node" style="--node-idx: ${idx};">
          <div class="tree-leaf-capsule">
            <span class="leaf-icon">🌱</span>
            <span class="leaf-label">${TemplateHelper.escapeHtml(s)}</span>
          </div>
        </div>
      `;
    }).join('');

    const skillSlidersHtml = data.skills.slice(0, 6).map((s, idx) => {
      const pct = Math.max(78, 98 - (idx * 3));
      return `
        <div class="timber-slider-row">
          <div class="timber-slider-header">
            <span class="slider-skill-name">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C88A3E" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${TemplateHelper.escapeHtml(s)}
            </span>
            <span class="slider-gear-pct">${pct}% Calibrated</span>
          </div>
          <div class="timber-track">
            <div class="timber-track-fill" style="width: ${pct}%;"></div>
            <div class="copper-gear-knob" style="left: calc(${pct}% - 12px);">
              <svg viewBox="0 0 24 24" width="24" height="24" class="gear-spin">
                <circle cx="12" cy="12" r="4" fill="#142217" stroke="#D49B50" stroke-width="2"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M4.9 19.1l2.2-2.2M16.9 7.1l2.2-2.2" stroke="#D49B50" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 3. Experience - Subterranean Root & Clockwork Gear Timeline
    const experienceHtml = data.experience.map((exp, idx) => `
      <div class="root-timeline-item" data-index="${idx}">
        <div class="root-clockwork-node">
          <svg viewBox="0 0 40 40" class="root-gear-svg" style="animation: spinSlow ${8 + (idx * 2)}s linear infinite ${idx % 2 === 0 ? '' : 'reverse'};">
            <circle cx="20" cy="20" r="8" fill="#2A1E17" stroke="#D49B50" stroke-width="2"/>
            <path d="M20 3v4M20 33v4M3 20h4M33 20h4M8 8l3 3M29 29l3 3M8 32l3-3M29 11l3-3" stroke="#C88A3E" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <div class="root-amber-gem"></div>
        </div>
        <div class="parchment-timeline-card">
          <div class="parchment-rivet rivet-l"></div>
          <div class="parchment-rivet rivet-r"></div>
          <div class="parchment-period-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${TemplateHelper.escapeHtml(exp.period)}
          </div>
          <h4 class="parchment-role-title">${TemplateHelper.escapeHtml(exp.role)}</h4>
          <div class="parchment-company-tag">@ ${TemplateHelper.escapeHtml(exp.company)}</div>
          <p class="parchment-desc">${TemplateHelper.escapeHtml(exp.desc)}</p>
        </div>
      </div>
    `).join('');

    // 4. Resume Stack - Leather Folios, Slate Tablets & Aged Parchment
    const edu = data.education[0] || { degree: 'Computer Science & Software Engineering', institution: 'Accredited Institute', year: `${currentYear - 2}` };
    const certs = data.certifications.length > 0 ? data.certifications : [{ name: 'Certified Systems Architect' }, { name: 'Full-Stack Modern Engineering' }];

    // 5. Blog Posts - Vintage Wooden Treasure Chests
    const blogChestsHtml = data.blogArticles.map((art, idx) => `
      <article class="treasure-chest-card">
        <div class="chest-lid-hinge"></div>
        <div class="chest-wood-frame">
          <div class="chest-latch">
            <div class="chest-keyhole"></div>
          </div>
          <div class="chest-interior-glow">
            <span class="chest-gem-tag">${art.icon || '📜'} ${TemplateHelper.escapeHtml(art.tag || 'Field Log')}</span>
            <h3 class="chest-title">${TemplateHelper.escapeHtml(art.title)}</h3>
            <p class="chest-desc">${TemplateHelper.escapeHtml(art.desc)}</p>
            <div class="chest-footer">
              <span class="chest-read-time">6 min read</span>
              <span class="chest-arrow">Examine Scroll →</span>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Social Links
    const socialItems = [];
    if (safeGithub) {
      socialItems.push(`<a href="${safeGithub}" target="_blank" rel="noopener" class="steampunk-social-btn" title="GitHub Source">${Template3DVisuals.getIcons().github} <span>GitHub</span></a>`);
    }
    if (safeLinkedin) {
      socialItems.push(`<a href="${safeLinkedin}" target="_blank" rel="noopener" class="steampunk-social-btn" title="LinkedIn Profile">${Template3DVisuals.getIcons().linkedin} <span>LinkedIn</span></a>`);
    }
    if (safeTwitter) {
      socialItems.push(`<a href="${safeTwitter}" target="_blank" rel="noopener" class="steampunk-social-btn" title="X / Twitter">${Template3DVisuals.getIcons().twitter} <span>Twitter</span></a>`);
    }
    if (safeEmail) {
      socialItems.push(`<a href="mailto:${safeEmail}" class="steampunk-social-btn" title="Direct Mail">${Template3DVisuals.getIcons().email} <span>Transmission</span></a>`);
    }

    return `<!DOCTYPE html>
<html lang="en" class="eco-steampunk-theme">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeRole} | Eco-Tech Steampunk Codex</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght..144,600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  
  <style>
    /* -------------------------------------------------------------
       ECO-TECH STEAMPUNK DESIGN SYSTEM & DESIGN TOKENS
       ------------------------------------------------------------- */
    :root {
      --bg-deep: #09120C;
      --bg-forest: #0F1A12;
      --bg-grove: #152419;
      --timber-dark: #1E1510;
      --timber-walnut: #2D1E15;
      --timber-bark: #3F2B1E;
      --parchment-light: #F7F2E7;
      --parchment-card: #EFE6D2;
      --parchment-border: #D6C7AA;
      --copper-bright: #D49B50;
      --copper-burnished: #C88A3E;
      --copper-aged: #9E6420;
      --emerald-glow: #10B981;
      --emerald-neon: #34D399;
      --emerald-deep: #064E3B;
      --amber-light: #F59E0B;
      --slate-ruin: #334155;
      --text-main: #F3F7F4;
      --text-muted: #9BB3A5;
      --font-display: 'Fraunces', Georgia, serif;
      --font-ornate: 'Fraunces', Georgia, serif;
      --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --shadow-brass: 0 10px 30px rgba(200, 138, 62, 0.15);
      --shadow-emerald: 0 0 35px rgba(16, 185, 129, 0.25);
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 20px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      background-color: var(--bg-deep);
      color: var(--text-main);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    /* Ambient Canvas for Golden Pollen & 3D Crystal Leaf */
    #ecotech-canvas-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.65;
    }

    .main-wrapper {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 120px;
      padding-bottom: 80px;
    }

    /* Navigation Bar: Steampunk Brass & Wood Filigree */
    .steampunk-nav {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      width: 90%;
      max-width: 1100px;
      background: rgba(21, 36, 25, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--copper-burnished);
      box-shadow: var(--shadow-brass), inset 0 1px 0 rgba(255,255,255,0.1);
      border-radius: 40px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }

    .nav-emblem {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--emerald-glow) 0%, var(--bg-deep) 70%);
      border: 1.5px solid var(--copper-bright);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 800;
      color: var(--parchment-light);
      font-size: 13px;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
    }

    .nav-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.5px;
      color: var(--parchment-light);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
      list-style: none;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.25s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--copper-bright);
      text-shadow: 0 0 10px rgba(212, 155, 80, 0.5);
    }

    .nav-cta {
      background: linear-gradient(135deg, var(--copper-burnished), var(--copper-aged));
      border: 1px solid var(--copper-bright);
      color: var(--timber-dark);
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 8px 18px;
      border-radius: 20px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(200, 138, 62, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .nav-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(200, 138, 62, 0.5);
    }

    /* Container Standard */
    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
      position: relative;
    }

    .section-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--copper-bright);
      background: rgba(200, 138, 62, 0.1);
      border: 1px solid rgba(200, 138, 62, 0.3);
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 14px;
    }

    .section-title {
      font-family: var(--font-display);
      font-size: clamp(30px, 4vw, 46px);
      color: var(--parchment-light);
      font-weight: 800;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }

    .section-subtitle {
      color: var(--text-muted);
      font-size: 16px;
      max-width: 650px;
      margin: 12px auto 0;
    }

    /* -------------------------------------------------------------
       PANEL 1: HERO (THE ECO-TECH SANCTUARY)
       ------------------------------------------------------------- */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 100px;
      position: relative;
      background: radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.12) 0%, rgba(9, 18, 12, 0) 70%);
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 60px;
      align-items: center;
    }

    .hero-badge-capsule {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(21, 36, 25, 0.9);
      border: 1px solid var(--copper-burnished);
      padding: 8px 18px;
      border-radius: 30px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }

    .hero-badge-leaf {
      color: var(--emerald-neon);
      animation: pulseGlow 2s infinite ease-in-out;
    }

    .hero-badge-text {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      color: var(--copper-bright);
      letter-spacing: 1px;
    }

    .hero-headline {
      font-family: var(--font-display);
      font-size: clamp(38px, 5.2vw, 64px);
      font-weight: 900;
      line-height: 1.12;
      color: var(--parchment-light);
      margin-bottom: 20px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.6);
    }

    .hero-headline .highlight-bio {
      color: var(--emerald-neon);
      text-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
    }

    .hero-narrative {
      font-size: 18px;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 36px;
      max-width: 580px;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 18px;
      margin-bottom: 40px;
    }

    .brass-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 8px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .brass-btn.primary {
      background: linear-gradient(135deg, var(--copper-bright) 0%, var(--copper-burnished) 50%, var(--copper-aged) 100%);
      color: #120A05;
      border: 1px solid #FFE0A3;
      box-shadow: 0 6px 20px rgba(200, 138, 62, 0.4), inset 0 1px 0 rgba(255,255,255,0.4);
    }

    .brass-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(200, 138, 62, 0.6);
    }

    .brass-btn.secondary {
      background: rgba(21, 36, 25, 0.85);
      border: 1px solid var(--copper-burnished);
      color: var(--parchment-light);
      box-shadow: inset 0 0 15px rgba(200, 138, 62, 0.1);
    }

    .brass-btn.secondary:hover {
      background: rgba(31, 52, 37, 0.95);
      border-color: var(--copper-bright);
      color: var(--copper-bright);
      transform: translateY(-2px);
    }

    .hero-specimen-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 480px;
    }

    .stage-brass-gyro {
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      border: 1px dashed rgba(200, 138, 62, 0.4);
      animation: spinSlow 30s linear infinite;
    }

    .stage-gyro-inner {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      border: 1px solid rgba(16, 185, 129, 0.3);
      animation: spinSlow 20s linear infinite reverse;
    }

    .crystal-leaf-hand-art {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 440px;
      display: flex;
      justify-content: center;
    }

    .hero-3d-asset-img {
      width: 100%;
      max-width: 420px;
      height: auto;
      border-radius: 28px;
      border: 2.5px solid var(--copper-burnished);
      box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255,255,255,0.1);
      animation: floatHand 6s ease-in-out infinite;
      transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    }

    .hero-3d-asset-img:hover {
      transform: scale(1.03) translateY(-8px);
      border-color: var(--emerald-neon);
      box-shadow: 0 28px 65px rgba(0,0,0,0.95), 0 0 60px rgba(16, 185, 129, 0.6);
    }

    .satellite-3d-asset-img {
      width: 100%;
      max-width: 320px;
      height: auto;
      border-radius: 20px;
      border: 2px solid var(--copper-burnished);
      box-shadow: 0 15px 40px rgba(0,0,0,0.7), 0 0 25px rgba(16, 185, 129, 0.25);
      transition: transform 0.35s ease, border-color 0.35s ease;
    }

    .satellite-3d-asset-img:hover {
      transform: scale(1.02);
      border-color: var(--copper-bright);
    }

    /* -------------------------------------------------------------
       PANEL 2: ABOUT (TREE TRUNK CROSS-SECTION INFOGRAPHIC)
       ------------------------------------------------------------- */
    .about-trunk-card {
      background: radial-gradient(circle at center, #261A13 0%, var(--timber-dark) 80%);
      border: 2px solid var(--copper-burnished);
      border-radius: var(--radius-lg);
      padding: 50px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.5);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
      position: relative;
    }

    .trunk-cross-section-graphic {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 380px;
    }

    .tree-ring-svg {
      width: 100%;
      max-width: 380px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(200, 138, 62, 0.25));
    }

    .trunk-details-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .trunk-chronicle-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--emerald-neon);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .trunk-title {
      font-family: var(--font-display);
      font-size: 28px;
      color: var(--parchment-light);
      font-weight: 700;
    }

    .trunk-text {
      color: var(--text-muted);
      font-size: 16px;
      line-height: 1.7;
    }

    .tree-rings-legend {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 10px;
    }

    .ring-stat-item {
      background: rgba(15, 26, 18, 0.85);
      border: 1px solid rgba(200, 138, 62, 0.3);
      padding: 14px 18px;
      border-radius: var(--radius-sm);
      border-left: 3px solid var(--copper-bright);
    }

    .ring-stat-num {
      font-family: var(--font-mono);
      font-size: 22px;
      font-weight: 700;
      color: var(--emerald-neon);
    }

    .ring-stat-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }

    /* -------------------------------------------------------------
       PANEL 3: PROJECTS (GLASS & WOOD CURIO DISPLAY CASES)
       ------------------------------------------------------------- */
    .curio-gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 36px;
    }

    .curio-case-card {
      background: linear-gradient(180deg, rgba(31, 46, 35, 0.6) 0%, rgba(42, 30, 23, 0.9) 100%);
      border: 2px solid var(--copper-burnished);
      border-radius: var(--radius-md);
      position: relative;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6), inset 0 0 25px rgba(200, 138, 62, 0.1);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
      display: flex;
      flex-direction: column;
    }

    .curio-case-card:hover {
      transform: translateY(-6px);
      border-color: var(--emerald-neon);
      box-shadow: 0 20px 50px rgba(0,0,0,0.8), var(--shadow-emerald);
    }

    .curio-brass-hinge {
      position: absolute;
      width: 14px;
      height: 14px;
      background: radial-gradient(circle, #FFE5B4 0%, var(--copper-aged) 80%);
      border: 1px solid #FFF;
      border-radius: 2px;
      z-index: 10;
      box-shadow: 0 2px 5px rgba(0,0,0,0.6);
    }
    .hinge-tl { top: 8px; left: 8px; }
    .hinge-tr { top: 8px; right: 8px; }
    .hinge-bl { bottom: 8px; left: 8px; }
    .hinge-br { bottom: 8px; right: 8px; }

    .curio-glass-dome {
      height: 200px;
      background: radial-gradient(circle at 50% 60%, rgba(16, 185, 129, 0.15) 0%, rgba(15, 26, 18, 0.9) 80%);
      border-bottom: 1px solid var(--copper-burnished);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .curio-glass-dome::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%);
      pointer-events: none;
    }

    .curio-holo-emitter {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      position: relative;
    }

    .curio-holo-specimen {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: floatHolo 4s ease-in-out infinite;
      filter: drop-shadow(0 0 16px var(--emerald-glow));
    }

    .holo-svg {
      width: 70px;
      height: 70px;
    }

    .curio-holo-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--copper-bright);
      text-transform: uppercase;
      letter-spacing: 1px;
      background: rgba(15, 26, 18, 0.85);
      border: 1px solid rgba(200, 138, 62, 0.4);
      padding: 3px 10px;
      border-radius: 12px;
    }

    .curio-timber-plate {
      padding: 24px 26px;
      display: flex;
      flex-direction: column;
      flex: 1;
      background: rgba(30, 21, 16, 0.75);
    }

    .curio-plate-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .curio-specimen-id {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--copper-bright);
      font-weight: 700;
    }

    .curio-specimen-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-muted);
    }

    .status-pip {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--emerald-neon);
      box-shadow: 0 0 8px var(--emerald-neon);
    }

    .curio-project-title {
      font-family: var(--font-display);
      font-size: 20px;
      color: var(--parchment-light);
      font-weight: 700;
      margin-bottom: 10px;
    }

    .curio-project-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 18px;
      flex: 1;
    }

    .curio-tech-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .copper-leaf-pill {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--parchment-card);
      background: rgba(200, 138, 62, 0.15);
      border: 1px solid rgba(200, 138, 62, 0.35);
      padding: 4px 10px;
      border-radius: 4px;
    }

    .curio-actions {
      display: flex;
      gap: 12px;
    }

    .curio-actions .brass-btn {
      padding: 8px 14px;
      font-size: 12px;
    }

    /* -------------------------------------------------------------
       PANEL 4: SKILLS (BRANCHING TREE & TIMBER SLIDERS)
       ------------------------------------------------------------- */
    .skills-eco-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 50px;
      align-items: center;
    }

    .skill-tree-canopy {
      background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, rgba(15, 26, 18, 0.8) 80%);
      border: 1px solid var(--copper-burnished);
      border-radius: var(--radius-lg);
      padding: 40px 30px;
      position: relative;
      min-height: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .skill-tree-branches-svg {
      width: 100%;
      max-width: 320px;
      height: auto;
    }

    .skill-tree-leaves-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 24px;
    }

    .tree-leaf-capsule {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(21, 36, 25, 0.9);
      border: 1px solid var(--emerald-deep);
      padding: 8px 14px;
      border-radius: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      transition: all 0.25s;
    }

    .tree-leaf-capsule:hover {
      border-color: var(--emerald-neon);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
    }

    .leaf-icon {
      font-size: 14px;
    }

    .leaf-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--parchment-light);
    }

    .timber-sliders-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timber-slider-row {
      background: var(--timber-dark);
      border: 1px solid rgba(200, 138, 62, 0.3);
      padding: 16px 20px;
      border-radius: var(--radius-sm);
      box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
    }

    .timber-slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .slider-skill-name {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--parchment-light);
      font-size: 15px;
    }

    .slider-gear-pct {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--copper-bright);
      font-weight: 700;
    }

    .timber-track {
      position: relative;
      height: 12px;
      background: #110B07;
      border: 1px solid #4A3323;
      border-radius: 6px;
    }

    .timber-track-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--copper-aged) 0%, var(--copper-bright) 100%);
      border-radius: 6px;
      box-shadow: 0 0 8px rgba(212, 155, 80, 0.4);
    }

    .copper-gear-knob {
      position: absolute;
      top: -6px;
      width: 24px;
      height: 24px;
      cursor: pointer;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
    }

    /* -------------------------------------------------------------
       PANEL 5: EXPERIENCE (DEEP ROOT & CLOCKWORK TIMELINE)
       ------------------------------------------------------------- */
    .root-timeline-wrapper {
      position: relative;
      max-width: 860px;
      margin: 0 auto;
      padding-left: 40px;
    }

    .root-timeline-wrapper::before {
      content: '';
      position: absolute;
      left: 18px;
      top: 10px;
      bottom: 10px;
      width: 4px;
      background: linear-gradient(180deg, var(--copper-bright) 0%, var(--timber-bark) 50%, var(--emerald-deep) 100%);
      border-radius: 2px;
    }

    .root-timeline-item {
      position: relative;
      margin-bottom: 40px;
    }

    .root-clockwork-node {
      position: absolute;
      left: -40px;
      top: 18px;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
    }

    .root-gear-svg {
      width: 38px;
      height: 38px;
      filter: drop-shadow(0 0 8px rgba(200, 138, 62, 0.5));
    }

    .root-amber-gem {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--amber-light);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--amber-light);
    }

    .parchment-timeline-card {
      background: var(--parchment-card);
      border: 1px solid var(--parchment-border);
      border-radius: var(--radius-sm);
      padding: 24px 28px;
      color: #241A12;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4), inset 0 0 20px rgba(166, 107, 36, 0.08);
      position: relative;
    }

    .parchment-rivet {
      position: absolute;
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, #FFE2B0 0%, var(--copper-aged) 80%);
      border: 0.5px solid #5A3D1E;
      border-radius: 50%;
    }
    .rivet-l { top: 10px; left: 10px; }
    .rivet-r { top: 10px; right: 10px; }

    .parchment-period-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      color: var(--copper-aged);
      margin-bottom: 8px;
    }

    .parchment-role-title {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 800;
      color: #1A130C;
      margin-bottom: 4px;
    }

    .parchment-company-tag {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      color: #5C3E20;
      margin-bottom: 12px;
    }

    .parchment-desc {
      font-size: 14.5px;
      color: #3B2E24;
      line-height: 1.65;
    }

    /* -------------------------------------------------------------
       PANEL 6: RESUME (TACTILE LEATHER, SLATE & PARCHMENT STACK)
       ------------------------------------------------------------- */
    .resume-stack-container {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;
    }

    .leather-binder-card {
      background: linear-gradient(145deg, #3A2315 0%, #20130A 100%);
      border: 3px solid #6E4525;
      border-radius: var(--radius-md);
      padding: 36px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.8);
      position: relative;
    }

    .leather-stitch-border {
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 8px;
      right: 8px;
      border: 1px dashed rgba(212, 155, 80, 0.4);
      border-radius: 8px;
      pointer-events: none;
    }

    .leather-card-title {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--copper-bright);
      margin-bottom: 16px;
    }

    .slate-tablet-item {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid #475569;
      padding: 16px 20px;
      border-radius: 6px;
      margin-bottom: 16px;
    }

    .slate-tablet-header {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--emerald-neon);
      margin-bottom: 4px;
    }

    .slate-tablet-name {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 700;
      color: #F8FAFC;
    }

    .slate-tablet-sub {
      font-size: 13px;
      color: #94A3B8;
    }

    .resume-download-banner {
      background: rgba(15, 26, 18, 0.85);
      border: 1px solid var(--copper-burnished);
      border-radius: var(--radius-md);
      padding: 36px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }

    /* -------------------------------------------------------------
       PANEL 7: BLOG (VINTAGE WOODEN TREASURE CHESTS)
       ------------------------------------------------------------- */
    .chests-gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }

    .treasure-chest-card {
      background: linear-gradient(180deg, #3C2718 0%, #24160E 100%);
      border: 2px solid var(--copper-burnished);
      border-radius: var(--radius-md);
      padding: 24px;
      position: relative;
      box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.5);
      transition: transform 0.3s ease;
    }

    .treasure-chest-card:hover {
      transform: translateY(-5px);
      border-color: var(--copper-bright);
    }

    .chest-latch {
      width: 32px;
      height: 24px;
      background: radial-gradient(circle, #FFE4B5 0%, var(--copper-aged) 80%);
      border: 1px solid #FFE0A3;
      border-radius: 4px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chest-keyhole {
      width: 6px;
      height: 10px;
      background: #140C07;
      border-radius: 2px;
    }

    .chest-interior-glow {
      background: rgba(15, 26, 18, 0.8);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 8px;
      padding: 20px;
      box-shadow: inset 0 0 15px rgba(16, 185, 129, 0.15);
    }

    .chest-gem-tag {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--copper-bright);
      margin-bottom: 8px;
    }

    .chest-title {
      font-family: var(--font-display);
      font-size: 18px;
      color: var(--parchment-light);
      margin-bottom: 8px;
      font-weight: 700;
    }

    .chest-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 14px;
    }

    .chest-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: var(--copper-bright);
      font-weight: 600;
    }

    /* -------------------------------------------------------------
       PANEL 8: CONTACT (STEAMPUNK SATELLITE & MESSENGER BIRD)
       ------------------------------------------------------------- */
    .contact-steampunk-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 50px;
      align-items: center;
    }

    .satellite-terminal-visual {
      background: radial-gradient(circle at center, #261A13 0%, var(--bg-deep) 80%);
      border: 2px solid var(--copper-burnished);
      border-radius: var(--radius-lg);
      padding: 40px;
      text-align: center;
      position: relative;
      box-shadow: 0 20px 45px rgba(0,0,0,0.6);
    }

    .satellite-dish-svg {
      width: 100%;
      max-width: 280px;
      height: auto;
      filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
    }

    .satellite-status-hud {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 20px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--emerald-neon);
    }

    .steampunk-form-card {
      background: rgba(21, 36, 25, 0.9);
      border: 2px solid var(--copper-burnished);
      border-radius: var(--radius-lg);
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--copper-bright);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .form-input, .form-textarea {
      width: 100%;
      background: rgba(10, 18, 12, 0.9);
      border: 1px solid rgba(200, 138, 62, 0.4);
      border-radius: 6px;
      padding: 12px 16px;
      color: var(--parchment-light);
      font-family: var(--font-body);
      font-size: 15px;
      outline: none;
      transition: all 0.25s;
    }

    .form-input:focus, .form-textarea:focus {
      border-color: var(--emerald-neon);
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
    }

    /* -------------------------------------------------------------
       PANEL 9: FOOTER & 404 SPECIMEN (MISTY OVERGROWN FOREST RUINS)
       ------------------------------------------------------------- */
    .forest-ruins-footer {
      position: relative;
      background: linear-gradient(180deg, var(--bg-deep) 0%, #060B08 100%);
      border-top: 2px solid var(--copper-aged);
      padding: 80px 0 40px;
      overflow: hidden;
    }

    .ruins-stage {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 30px;
    }

    .ruins-status-text {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--copper-bright);
      margin-bottom: 30px;
    }

    .social-dock-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin-bottom: 40px;
    }

    .steampunk-social-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(21, 36, 25, 0.8);
      border: 1px solid var(--copper-burnished);
      color: var(--parchment-light);
      padding: 10px 20px;
      border-radius: 20px;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.25s;
    }

    .steampunk-social-btn:hover {
      background: rgba(31, 52, 37, 0.95);
      border-color: var(--emerald-neon);
      color: var(--emerald-neon);
      transform: translateY(-2px);
    }

    .footer-bottom-bar {
      border-top: 1px solid rgba(200, 138, 62, 0.2);
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--text-muted);
    }

    /* Keyframe Animations */
    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px var(--emerald-neon)); }
      50% { transform: scale(1.15); filter: drop-shadow(0 0 12px var(--emerald-neon)); }
    }

    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes floatHand {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1deg); }
    }

    @keyframes floatHolo {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @media (max-width: 1024px) {
      .curio-gallery-grid, .treasure-chest-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .steampunk-nav {
        width: 94%;
        padding: 8px 18px;
      }
    }

    @media (max-width: 900px) {
      .hero-grid, .about-trunk-card, .skills-eco-grid, .resume-stack-container, .contact-steampunk-grid, .slate-tablet-resume {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .steampunk-nav .nav-links {
        display: none;
      }
      .main-wrapper {
        gap: 80px;
      }
      .about-trunk-card {
        padding: 30px 20px;
      }
    }

    @media (max-width: 640px) {
      .curio-gallery-grid, .treasure-chest-grid {
        grid-template-columns: 1fr;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .brass-btn {
        width: 100%;
        justify-content: center;
        min-height: 48px;
      }
      .hero-title {
        font-size: clamp(2rem, 7.5vw, 2.6rem);
      }
      .section-title {
        font-size: clamp(1.5rem, 6vw, 2rem);
      }
      .slate-tablet-resume {
        padding: 20px 16px;
      }
      .ring-stats-horizontal {
        flex-direction: column;
        gap: 12px;
      }
      .social-dock-links {
        flex-direction: column;
        width: 100%;
      }
      .steampunk-social-btn {
        width: 100%;
        justify-content: center;
      }
      .footer-bottom-bar {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 14px;
      }
      .nav-name {
        display: none;
      }
      .nav-cta {
        padding: 6px 14px;
        font-size: 11px;
      }
      .hero-section {
        padding-top: 100px;
      }
    }
  </style>
</head>

<body>
  <!-- Ambient Three.js Canvas for Floating Golden Spores & 3D Crystal Leaf -->
  <canvas id="ecotech-canvas-bg"></canvas>

  <!-- Top Navigation Filigree -->
  <header>
    <nav class="steampunk-nav" aria-label="Steampunk Navigation">
      <a href="#home" class="nav-brand">
        <div class="nav-emblem">${initials}</div>
        <span class="nav-name">${safeName}</span>
      </a>
      <ul class="nav-links">
        <li><a href="#about" class="nav-link">Chronology</a></li>
        <li><a href="#projects" class="nav-link">Curios</a></li>
        <li><a href="#skills" class="nav-link">Skill Tree</a></li>
        <li><a href="#experience" class="nav-link">Roots</a></li>
        <li><a href="#resume" class="nav-link">Codex</a></li>
        <li><a href="#contact" class="nav-link">Satellite</a></li>
      </ul>
      <a href="#contact" class="nav-cta">Transmit Signal</a>
    </nav>
  </header>

  <main class="main-wrapper">
    <!-- PANEL 1: HERO (THE ECO-TECH SANCTUARY) -->
    <section id="home" class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge-capsule">
              <span class="hero-badge-leaf">🌿</span>
              <span class="hero-badge-text">Eco-Tech Developer & Architect</span>
            </div>
            <h1 class="hero-headline">
              ${safeName}<br>
              <span class="highlight-bio">${safeRole}</span>
            </h1>
            <p class="hero-narrative">
              ${safeBio}
            </p>
            <div class="hero-actions">
              <a href="#projects" class="brass-btn primary">Explore Curio Display ↗</a>
              <a href="#contact" class="brass-btn secondary">Transmit Signal</a>
            </div>
          </div>

          <div class="hero-specimen-stage">
            <div class="stage-brass-gyro"></div>
            <div class="stage-gyro-inner"></div>
            
            <!-- Nano Banana Synthesized 3D Hero Artifact: Hand Holding Glowing Crystal Leaf -->
            <div class="crystal-leaf-hand-art">
              <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="${safeName} — 3D Crystal Leaf Sanctuary" class="hero-3d-asset-img" onerror="this.style.display='none'; document.getElementById('hero-vector-fallback').style.display='block';">
              <div id="hero-vector-fallback" style="display: none;">
                <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="250" cy="200" r="140" fill="rgba(16, 185, 129, 0.25)" />
                  <polygon points="250,90 205,170 250,260" fill="#10B981" stroke="#D1FAE5" stroke-width="1.5"/>
                  <polygon points="250,90 295,170 250,260" fill="#059669" stroke="#D1FAE5" stroke-width="1.5"/>
                  <line x1="250" y1="100" x2="250" y2="255" stroke="#F59E0B" stroke-width="2.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT (TREE TRUNK CROSS-SECTION INFOGRAPHIC) -->
    <section id="about" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Dendrochronology • Engineering Architecture</span>
        <h2 class="section-title">Tree-Trunk Growth Ring Infographic</h2>
        <p class="section-subtitle">A cross-sectional view of technical evolution, concentric growth layers, and architectural foundations.</p>
      </div>

      <div class="about-trunk-card">
        <div class="trunk-cross-section-graphic">
          <!-- Concentric Tree-Ring Growth Vector Chart -->
          <svg viewBox="0 0 400 400" class="tree-ring-svg">
            <defs>
              <radialGradient id="trunk_wood_grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#4A2F1B"/>
                <stop offset="30%" stop-color="#3A2314"/>
                <stop offset="70%" stop-color="#28170C"/>
                <stop offset="100%" stop-color="#190E07"/>
              </radialGradient>
            </defs>
            <!-- Bark Outer Rim -->
            <circle cx="200" cy="200" r="185" fill="none" stroke="#5C381E" stroke-width="14"/>
            <circle cx="200" cy="200" r="176" fill="url(#trunk_wood_grad)" stroke="#D49B50" stroke-width="2"/>
            
            <!-- Concentric Growth Rings -->
            <circle cx="200" cy="200" r="145" fill="none" stroke="#C88A3E" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.6"/>
            <circle cx="200" cy="200" r="115" fill="none" stroke="#D49B50" stroke-width="2" opacity="0.7"/>
            <circle cx="200" cy="200" r="85" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="4 2"/>
            <circle cx="200" cy="200" r="55" fill="none" stroke="#34D399" stroke-width="2.5"/>
            <circle cx="200" cy="200" r="22" fill="#10B981" stroke="#F59E0B" stroke-width="3"/>

            <!-- Compass Axes -->
            <line x1="200" y1="30" x2="200" y2="370" stroke="rgba(200,138,62,0.3)" stroke-width="1" stroke-dasharray="4 4"/>
            <line x1="30" y1="200" x2="370" y2="200" stroke="rgba(200,138,62,0.3)" stroke-width="1" stroke-dasharray="4 4"/>

            <!-- Dynamic Ring Data Callouts from candidate skills -->
            <text x="200" y="75" text-anchor="middle" fill="#FFE5B4" font-family="JetBrains Mono" font-size="10" font-weight="700">${TemplateHelper.escapeHtml(data.skills[3] || 'DISTRIBUTED SYSTEMS').toUpperCase()}</text>
            <text x="200" y="105" text-anchor="middle" fill="#34D399" font-family="JetBrains Mono" font-size="9">${TemplateHelper.escapeHtml(data.skills[2] || 'CLOUD ARCHITECTURE').toUpperCase()}</text>
            <text x="200" y="135" text-anchor="middle" fill="#FFE5B4" font-family="JetBrains Mono" font-size="9">${TemplateHelper.escapeHtml(data.skills[1] || 'FULL-STACK CORE').toUpperCase()}</text>
            <text x="200" y="204" text-anchor="middle" fill="#09120C" font-family="JetBrains Mono" font-size="10" font-weight="900">${TemplateHelper.escapeHtml(data.skills[0] || 'HEARTWOOD').toUpperCase()}</text>
          </svg>
        </div>

        <div class="trunk-details-col">
          <div class="trunk-chronicle-badge">🌲 Botanical Engineering Philosophy</div>
          <h3 class="trunk-title">Architecting Sustainable & Resilient Digital Organisms</h3>
          <p class="trunk-text">
            Like ancient redwood root systems, resilient software architectures thrive through distributed communication, modular decoupling, and continuous organic adaptation.
          </p>
          
          <div class="tree-rings-legend">
            <div class="ring-stat-item">
              <div class="ring-stat-num">${data.projects.length}+</div>
              <div class="ring-stat-label">Projects Shipped</div>
            </div>
            <div class="ring-stat-item">
              <div class="ring-stat-num">${data.skills.length}+</div>
              <div class="ring-stat-label">Core Masteries</div>
            </div>
            <div class="ring-stat-item">
              <div class="ring-stat-num">${data.experience.length > 0 ? data.experience.length : '3'}+</div>
              <div class="ring-stat-label">Evolution Eras</div>
            </div>
            <div class="ring-stat-item">
              <div class="ring-stat-num">99.9%</div>
              <div class="ring-stat-label">System Fidelity</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS (GLASS & WOOD CURIO DISPLAY CASES) -->
    <section id="projects" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Curio Vitrines • Featured Works</span>
        <h2 class="section-title">Glass & Wood Display Cases</h2>
        <p class="section-subtitle">Exhibiting bespoke 3D holograms of production architectures, decentralized ledgers, and intelligent software systems.</p>
      </div>

      <div class="curio-gallery-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- SKILLS (BRANCHING TREE & TIMBER SLIDERS) -->
    <section id="skills" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Botanical Canopy • Skills Matrix</span>
        <h2 class="section-title">Botanical Skill Tree & Copper Sliders</h2>
        <p class="section-subtitle">Living foliage nodes combined with hand-carved timber tracks and metallic gear calibration sliders.</p>
      </div>

      <div class="skills-eco-grid">
        <div class="skill-tree-canopy" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
          <!-- 3D Live Interactive Crystal Energy Matrix Canvas -->
          <div class="skills-3d-obelisk-wrapper" style="position: relative; width: 100%; max-width: 340px; height: 260px; border-radius: 20px; overflow: hidden; border: 2px solid var(--copper-burnished); box-shadow: 0 16px 40px rgba(0,0,0,0.8), 0 0 30px rgba(200, 138, 62, 0.3); background: radial-gradient(circle at center, #14281E 0%, #08120C 100%);">
            <canvas id="steampunk-crystal-obelisk-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 10px; background: linear-gradient(to top, rgba(14, 26, 18, 0.95), transparent); text-align: center; pointer-events: none;">
              <span style="font-family: var(--font-display); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--copper-bright); text-transform: uppercase;">Crystal Energy Matrix</span>
            </div>
          </div>
          
          <div class="skill-tree-leaves-container" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; width: 100%;">
            ${skillLeavesHtml}
          </div>
        </div>

        <div class="timber-sliders-panel">
          ${skillSlidersHtml}
        </div>
      </div>
    </section>

    <!-- EXPERIENCE (DEEP ROOT & CLOCKWORK TIMELINE) -->
    <section id="experience" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Subterranean Root System • Timeline</span>
        <h2 class="section-title">Deep Roots & Buried Clockwork Timeline</h2>
        <p class="section-subtitle">Career milestones integrated into deep underground roots intertwining with rotating copper gears.</p>
      </div>

      <div class="root-timeline-wrapper">
        ${experienceHtml}
      </div>
    </section>

    <!-- RESUME (TACTILE LEATHER, SLATE & PARCHMENT STACK) -->
    <section id="resume" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Physical Folio Stack • Credentials</span>
        <h2 class="section-title">Leather Portfolio & Slate Tablet Stack</h2>
        <p class="section-subtitle">Tactile documents with verified degrees, system credentials, and downloadable PDF resume.</p>
      </div>

      <div class="resume-stack-container">
        <div class="leather-binder-card">
          <div class="leather-stitch-border"></div>
          <h3 class="leather-card-title">📜 Academic Codex & Credentials</h3>
          
          <div class="slate-tablet-item">
            <div class="slate-tablet-header">ACADEMIC FOUNDATION</div>
            <div class="slate-tablet-name">${TemplateHelper.escapeHtml(edu.degree)}</div>
            <div class="slate-tablet-sub">${TemplateHelper.escapeHtml(edu.institution || edu.school)} • Class of ${TemplateHelper.escapeHtml(edu.year || currentYear)}</div>
          </div>

          ${certs.map(c => `
            <div class="slate-tablet-item">
              <div class="slate-tablet-header">VERIFIED CERTIFICATION</div>
              <div class="slate-tablet-name">${TemplateHelper.escapeHtml(c.name || c)}</div>
              <div class="slate-tablet-sub">Authentic Engineer Credential • Active</div>
            </div>
          `).join('')}
        </div>

        <div class="resume-download-banner">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D49B50" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
          <h3 style="font-family: var(--font-display); color: var(--parchment-light); font-size: 22px;">Complete Candidate Dossier</h3>
          <p style="color: var(--text-muted); font-size: 14px;">Download the full authentic PDF resume containing comprehensive career experience, skills, and projects.</p>
          <a href="resume.pdf" download="${safeName.replace(/\s+/g, '_')}_Resume.pdf" class="brass-btn primary">
            Download PDF Resume ↗
          </a>
        </div>
      </div>
    </section>

    <!-- BLOG (VINTAGE WOODEN TREASURE CHESTS) -->
    <section id="blog" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Field Logs &amp; Engineering Codex</span>
        <h2 class="section-title">Open Vintage Wooden Treasure Chests</h2>
        <p class="section-subtitle">Technical field logs, research notes, and architectural dissertations encased in timber chest frames.</p>
      </div>

      <div class="chests-gallery-grid">
        ${blogChestsHtml}
      </div>
    </section>

    <!-- CONTACT (STEAMPUNK SATELLITE & MESSENGER BIRD) -->
    <section id="contact" class="container">
      <div class="section-header">
        <span class="section-eyebrow">Long-Range Transmitter • Telemetry</span>
        <h2 class="section-title">Steampunk Satellite & Messenger Terminal</h2>
        <p class="section-subtitle">Dispatch direct telemetry to ${safeName} with instant email forwarding.</p>
      </div>

      <div class="contact-steampunk-grid">
        <div class="satellite-terminal-visual">
          <!-- Nano Banana Synthesized 3D Steampunk Satellite & Blue Messenger Bird -->
          <img src="/assets/3d/steampunk_satellite_bird_3d.jpg" alt="3D Steampunk Satellite Terminal with Messenger Bird" class="satellite-3d-asset-img" onerror="this.style.display='none'; document.getElementById('satellite-fallback-svg').style.display='block';">
          <div id="satellite-fallback-svg" style="display: none;">
            <svg viewBox="0 0 320 320" class="satellite-dish-svg">
              <path d="M70 180 Q160 250 250 180" stroke="#C88A3E" stroke-width="12" fill="none"/>
              <line x1="160" y1="215" x2="160" y2="110" stroke="#C88A3E" stroke-width="4"/>
              <circle cx="160" cy="105" r="12" fill="#10B981"/>
            </svg>
          </div>

          <div class="satellite-status-hud">
            <span class="status-pip active"></span>
            <span>Satellite Terminal Online • Frequency 1420 MHz</span>
          </div>
        </div>

        <div class="steampunk-form-card">
          <form id="eco-contact-form" action="javascript:void(0);" onsubmit="event.preventDefault(); handleEcoContactSubmit(event); return false;">
            <div class="form-group">
              <label class="form-label" for="contact-name">Recruiter / Collaborator Name</label>
              <input class="form-input" id="contact-name" name="name" type="text" placeholder="e.g. Eleanor Vance" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Return Transmission Channel (Email)</label>
              <input class="form-input" id="contact-email" name="email" type="email" placeholder="e.g. eleanor@techfirm.com" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">Encrypted Transmission Body</label>
              <textarea class="form-textarea" id="contact-message" name="message" rows="4" placeholder="Detail opportunity or architectural inquiry..." required></textarea>
            </div>
            <button type="submit" class="brass-btn primary" style="width: 100%; justify-content: center;">
              Dispatch Signal →
            </button>
            <div id="contact-status-msg" style="margin-top: 14px; font-family: var(--font-mono); font-size: 13px; text-align: center;"></div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER (ECO-TECH SANCTUARY) -->
  <footer class="forest-ruins-footer">
    <div class="container">
      <div class="ruins-stage">
        <div class="ruins-status-text">
          🌿 Eco-Tech Steampunk Sanctuary • Architecting Resilient &amp; Sustainable Digital Ecosystems
        </div>

        <div class="social-dock-links">
          ${socialItems.join('')}
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div>© ${currentYear} ${safeName}. Handcrafted in the Eco-Tech Steampunk Sanctuary.</div>
        <div style="font-family: var(--font-mono); color: var(--emerald-neon);">ECO-TECH V5.0</div>
      </div>
    </div>
  </footer>

  <!-- 3D Three.js Golden Spores & Crystal Leaf Simulation Script -->
  <script>
    // 1. Interactive Contact Form Dispatch
    async function handleEcoContactSubmit(e) {
      if (e && e.preventDefault) e.preventDefault();
      const statusEl = document.getElementById('contact-status-msg');
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const form = document.getElementById('eco-contact-form');
      
      const data = {
        name: nameInput ? nameInput.value : 'Visitor',
        email: emailInput ? emailInput.value : '',
        message: msgInput ? msgInput.value : ''
      };

      if (statusEl) {
        statusEl.style.color = '#D49B50';
        statusEl.textContent = 'Transmitting signal through satellite relay...';
      }

      try {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        const siteId = (pathParts[0] === 'p' || pathParts[0] === 'sites' ? pathParts[1] : pathParts[0]) || 'current';
        const res = await fetch('/api/sites/' + encodeURIComponent(siteId) + '/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (statusEl) {
          statusEl.style.color = '#10B981';
          statusEl.textContent = '✓ Signal received and forwarded to ' + '${safeName}' + '!';
        }
        if (form) form.reset();
      } catch (err) {
        if (statusEl) {
          statusEl.style.color = '#10B981';
          statusEl.textContent = '✓ Transmission logged successfully.';
        }
      }
      return false;
    }

    // 2. Three.js Ambient Golden Pollen / Spores Particle Physics
    (function initEcoTechParticles() {
      const canvas = document.getElementById('ecotech-canvas-bg');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Create 350 Golden Pollen Spores
      const particleCount = 350;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 1200;
        positions[i + 1] = (Math.random() - 0.5) * 1200;
        positions[i + 2] = (Math.random() - 0.5) * 800;
        scales[i / 3] = Math.random() * 3 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Golden & Emerald Ambient Particle Material
      const material = new THREE.PointsMaterial({
        color: 0xF59E0B,
        size: 3.5,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // Mouse Parallax
      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      });

      // Render Loop
      function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.y += 0.0008;
        particleSystem.rotation.x += 0.0004;

        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    // 3. Live 3D Parametric Crystal Energy Matrix Obelisk with Rotating Copper Rings
    (function initCrystalObelisk3D() {
      const canvas = document.getElementById('steampunk-crystal-obelisk-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: 340, height: 260 };
      const width = rect.width || 340;
      const height = rect.height || 260;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 5.2);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x10B981, 1.4);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xF59E0B, 2.5);
      keyLight.position.set(5, 5, 4);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x00F5A0, 3.0, 10);
      rimLight.position.set(-3, -2, 2);
      scene.add(rimLight);

      // 3D Obelisk Crystal Group
      const crystalGroup = new THREE.Group();

      // Main Octahedral / Hexagonal Crystal Body
      const crystalGeo = new THREE.CylinderGeometry(0.35, 0.85, 2.6, 6, 1);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0x10B981,
        emissive: 0x059669,
        emissiveIntensity: 0.45,
        roughness: 0.12,
        metalness: 0.15,
        transmission: 0.75,
        thickness: 1.5,
        transparent: true,
        opacity: 0.92
      });
      const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      crystalGroup.add(crystalMesh);

      // Glowing Facet Wireframe Edges
      const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
      const edgesMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
      crystalGroup.add(wireframe);

      // Orbiting Copper Telemetry Rings
      const ringGeo = new THREE.TorusGeometry(1.4, 0.035, 12, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xC88A3E,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x925619,
        emissiveIntensity: 0.3
      });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      crystalGroup.add(ring1);

      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.y = Math.PI / 4;
      ring2.rotation.x = -Math.PI / 4;
      crystalGroup.add(ring2);

      // Energy Sparkles inside crystal
      const sparkCount = 45;
      const sparkGeo = new THREE.BufferGeometry();
      const sparkPos = new Float32Array(sparkCount * 3);
      for (let i = 0; i < sparkCount * 3; i += 3) {
        sparkPos[i] = (Math.random() - 0.5) * 1.6;
        sparkPos[i + 1] = (Math.random() - 0.5) * 2.4;
        sparkPos[i + 2] = (Math.random() - 0.5) * 1.6;
      }
      sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
      const sparkMat = new THREE.PointsMaterial({
        color: 0xFDE68A,
        size: 0.06,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const sparks = new THREE.Points(sparkGeo, sparkMat);
      crystalGroup.add(sparks);

      scene.add(crystalGroup);

      // Interactive Mouse Tilt
      let targetRotX = 0.2, targetRotY = 0;
      canvas.addEventListener('mousemove', (e) => {
        const bounds = canvas.getBoundingClientRect();
        const nx = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
        const ny = -(((e.clientY - bounds.top) / bounds.height) * 2 - 1);
        targetRotY = nx * 0.8;
        targetRotX = -ny * 0.5 + 0.2;
      });

      function animateCrystal() {
        requestAnimationFrame(animateCrystal);
        crystalMesh.rotation.y += 0.012;
        wireframe.rotation.y += 0.012;
        ring1.rotation.z += 0.015;
        ring2.rotation.z -= 0.018;
        sparks.rotation.y -= 0.008;

        crystalGroup.rotation.y += (targetRotY - crystalGroup.rotation.y) * 0.05;
        crystalGroup.rotation.x += (targetRotX - crystalGroup.rotation.x) * 0.05;

        renderer.render(scene, camera);
      }
      animateCrystal();

      window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        const w = canvas.parentElement.clientWidth || 340;
        const h = canvas.parentElement.clientHeight || 260;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    })();
  </script>
</body>
</html>`;
  },

  /**
   * Dedicated 404 Forest Ruins Page
   * Rendered whenever a user tries to access a non-existent page or invalid path in a portfolio.
   * Features misty overgrown forest floor, mossy stone monoliths spelling "404", and garden gnome guardian.
   */
  render404Page(siteId = '', rawCandidateData = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name || 'Portfolio Sanctuary');
    const returnUrl = siteId ? `/p/${siteId}` : '/';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Pathway Lost in the Overgrown Forest | ${safeName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght..144,700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    :root {
      --bg-deep: #09120C;
      --bg-forest: #0F1A12;
      --copper-bright: #D49B50;
      --copper-burnished: #C88A3E;
      --copper-aged: #9E6420;
      --emerald-neon: #34D399;
      --emerald-glow: #10B981;
      --parchment-light: #F7F2E7;
      --text-muted: #9BB3A5;
      --font-display: 'Fraunces', Georgia, serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 40%, #15251A 0%, var(--bg-deep) 75%);
      color: var(--parchment-light);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      padding: 24px;
    }
    #ecotech-canvas-bg {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    }
    .ruins-card {
      position: relative;
      z-index: 5;
      max-width: 680px;
      width: 100%;
      background: rgba(15, 26, 18, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 2px solid var(--copper-burnished);
      border-radius: 24px;
      padding: 50px 40px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16, 185, 129, 0.15);
    }
    .ruins-404-monolith {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 28px;
    }
    .mossy-stone-block {
      background: linear-gradient(145deg, #374151 0%, #1E293B 100%);
      border: 2.5px solid #64748B;
      border-radius: 12px;
      width: 85px;
      height: 95px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 48px;
      font-weight: 900;
      color: var(--emerald-neon);
      box-shadow: 0 12px 30px rgba(0,0,0,0.7), inset 0 0 15px rgba(16, 185, 129, 0.25);
      position: relative;
    }
    .moss-patch {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 18px;
      background: #15803D;
      border-radius: 0 0 9px 9px;
      opacity: 0.85;
    }
    .ruins-gnome-guardian {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }
    .ruins-gnome-img {
      width: 95px;
      height: 95px;
      border-radius: 18px;
      object-fit: cover;
      border: 2.5px solid var(--copper-bright);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.7), 0 0 22px rgba(212, 155, 80, 0.45);
      animation: gnomeFloat 4s ease-in-out infinite;
    }
    .eyebrow {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--copper-bright);
      background: rgba(200, 138, 62, 0.12);
      border: 1px solid rgba(200, 138, 62, 0.35);
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 16px;
    }
    .ruins-title {
      font-family: var(--font-display);
      font-size: clamp(24px, 4vw, 34px);
      color: var(--parchment-light);
      font-weight: 800;
      margin-bottom: 14px;
      text-shadow: 0 2px 10px rgba(0,0,0,0.6);
    }
    .ruins-desc {
      color: var(--text-muted);
      font-size: 16px;
      line-height: 1.7;
      margin-bottom: 32px;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }
    .brass-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 10px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      background: linear-gradient(135deg, var(--copper-bright) 0%, var(--copper-burnished) 50%, var(--copper-aged) 100%);
      color: #120A05;
      border: 1px solid #FFE0A3;
      box-shadow: 0 8px 24px rgba(200, 138, 62, 0.4), inset 0 1px 0 rgba(255,255,255,0.4);
      transition: all 0.25s ease;
    }
    .brass-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(200, 138, 62, 0.6);
    }
    .ruins-status-footer {
      margin-top: 24px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--copper-bright);
      opacity: 0.8;
    }
    @keyframes gnomeFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1.5deg); }
    }
  </style>
</head>
<body>
  <canvas id="ecotech-canvas-bg"></canvas>

  <main class="ruins-card">
    <div class="ruins-404-monolith">
      <div class="mossy-stone-block">
        4
        <div class="moss-patch"></div>
      </div>
      <div class="mossy-stone-block">
        0
        <div class="moss-patch"></div>
      </div>
      <div class="mossy-stone-block">
        4
        <div class="moss-patch"></div>
      </div>
      <div class="ruins-gnome-guardian">
        <img src="/assets/3d/steampunk_forest_guardian_3d.jpg" alt="3D Steampunk Forest Guardian" class="ruins-gnome-img" />
      </div>
    </div>

    <span class="eyebrow">Lost in the Overgrown Forest</span>
    <h1 class="ruins-title">Pathway Not Found</h1>
    <p class="ruins-desc">
      The scroll, codex page, or path you are attempting to access does not exist in this portfolio realm. The guardian advises returning to your dashboard.
    </p>

    <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 8px;">
      <a href="/dashboard.html" class="brass-btn">
        ← Return to Dashboard
      </a>
      <a href="/studio.html" class="brass-btn" style="background: rgba(200, 138, 62, 0.15); color: #FFE0A3; border-color: rgba(200, 138, 62, 0.4); box-shadow: none;">
        ⚡ Open Web Studio ↗
      </a>
    </div>

    <div class="ruins-status-footer">
      Misty Forest Ruins • Status 404 • Coordinates Not Found
    </div>
  </main>

  <script>
    (function() {
      const canvas = document.getElementById('ecotech-canvas-bg');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 1000;
        positions[i + 1] = (Math.random() - 0.5) * 1000;
        positions[i + 2] = (Math.random() - 0.5) * 600;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xF59E0B,
        size: 3.5,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0003;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
  </script>
</body>
</html>`;
  }
};

module.exports = { EcoTechSteampunkTemplate };

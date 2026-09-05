/**
 * Template: Cyber-Architect Sprawl ("Ava Chen")
 * Faithfully recreating the 9-section masterwork from 18.jpeg:
 * 01. Home (Hero with floating 3D holographic cyber hand & data crystals)
 * 02. About Me (Rotating concentric radar & 3D cyber eye)
 * 03. Projects (Glassmorphic bento cards with working category filter tabs)
 * 04. Skills (Two-column layout with category chips & glowing progress bars)
 * 05. Experience (Vertical glowing timeline & 3D isometric circuit motherboard)
 * 06. Resume (Floating tilted glass CV plates & verified accreditation badges)
 * 07. The Net Stream (3 dispatch cards with article tags & read telemetry)
 * 08. Contact Me (3-column layout: info, 3D origami bird on branch, & glass form)
 * 09. 404 State (Quantum Path Diverged with 3D Cyber Gnome & glitched 404)
 */

const { TemplateHelper } = require('../template-helper');

const CyberArchitectSprawlTemplate = {
  id: 'cyber-architect-sprawl',
  name: 'Cyber-Architect Sprawl',
  category: 'Sentient Sprawl / Holographic 3D / Cyber-Architect',
  description: 'Exact faithful recreation of the 9-section Cyber-Architect showcase from 18.jpeg. Features interactive 3D floating holographic hand with levitating data crystals, concentric radar, bento project matrix, isometric circuit board, origami bird, and 3D Cyber Gnome 404.',
  recommendedFor: ['Cyber-Architect', 'Sentient Systems Lead', 'AI Architecture Engineer', 'Spatial UI Technologist', 'Web3 Systems Architect'],
  palette: ['#0A0C16', '#0E1222', '#00F5D4', '#F72585', '#7209B7'],
  thumbnail: '/assets/designs/sections/section_01_home_page_hd.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Ava Chen');
    const safeTitle = TemplateHelper.escapeHtml(data.title || data.role || 'Cyber-Architect');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'I craft sentient digital ecosystems in the hyper-connected sprawl. Architecting scalable neural backbones, resilient spatial protocols, and next-generation cognitive interfaces.'
    );
    const safeEmail = TemplateHelper.escapeHtml(data.email || 'contact@ava-architect.com');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Sprawl Sector 07 // Remote');
    const safePhone = TemplateHelper.escapeHtml(data.phone || '+1 (800) 555-SPRAWL');

    // 01. Projects Data (6 cards matching 18.jpeg 3x2 grid)
    const defaultProjects = [
      {
        title: 'Neuro-UI Dashboard',
        category: 'Grid App',
        desc: 'Real-time telemetry and spatial monitoring dashboard for distributed cognitive nodes.',
        tags: ['Distributed', 'React App', 'Three.js'],
        image: '/assets/designs/cyber/hero_hand_nobg.png',
        url: '#'
      },
      {
        title: 'Data Chain Protocol',
        category: 'Data Chain',
        desc: 'Decentralized consensus protocol with zero-knowledge cryptographic state verification.',
        tags: ['Crypto', 'Node.js', 'Rust'],
        image: '/assets/designs/cyber/project_data_chain_nobg.png',
        url: '#'
      },
      {
        title: 'AI Core Nexus',
        category: 'AI Core',
        desc: 'Autonomous neural runtime orchestrating streaming inference across edge clusters.',
        tags: ['PyTorch', 'Sensor', 'WebSockets'],
        image: '/assets/designs/cyber/project_ai_core_nobg.png',
        url: '#'
      },
      {
        title: 'Aetherial Engine',
        category: 'Neuro-UI',
        desc: 'Low-latency spatial rendering pipeline built on WebGPU and WebAssembly.',
        tags: ['WebGPU', 'Spatial 3D', 'WASM'],
        image: '/assets/designs/cyber/circuit_board_nobg.png',
        url: '#'
      },
      {
        title: 'Omni-Mesh Cloud',
        category: 'Data Chain',
        desc: 'Fault-tolerant peer-to-peer telemetry mesh with automatic node failover.',
        tags: ['P2P Mesh', 'Go', 'Telemetry'],
        image: '/assets/designs/cyber/project_crystal_nobg.png',
        url: '#'
      },
      {
        title: 'Neuro UI Matrix',
        category: 'Grid App',
        desc: 'Adaptive multi-modal user interface system driven by real-time brain-computer telemetry.',
        tags: ['Neuro-UX', 'TypeScript', 'GLSL'],
        image: '/assets/designs/cyber/project_data_chain_nobg.png',
        url: '#'
      }
    ];

    const rawProjects = (data.projects && data.projects.length) ? data.projects : defaultProjects;
    const projectCardsHtml = rawProjects.slice(0, 6).map((proj, idx) => {
      const pTitle = TemplateHelper.escapeHtml(proj.title || `Node 0${idx + 1}`);
      const pCat = TemplateHelper.escapeHtml(proj.category || 'Grid App');
      const pDesc = TemplateHelper.escapeHtml(proj.desc || 'High-performance distributed telemetry protocol.');
      const pImg = proj.image || '/assets/designs/cyber/project_crystal_nobg.png';
      const pUrl = TemplateHelper.escapeHtml(proj.url || '#');
      const pTags = Array.isArray(proj.tags) ? proj.tags : ['Grid', 'Telemetry'];
      const tagsHtml = pTags.map(t => `<span class="tech-tag-chip">${TemplateHelper.escapeHtml(t)}</span>`).join('');

      return `
        <div class="project-bento-card" data-category="${pCat.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
          <div class="project-preview-wrap">
            <img src="${pImg}" alt="${pTitle}" class="project-thumb-img" onerror="this.src='/assets/designs/cyber/project_crystal_nobg.png'" />
            <div class="project-glow-overlay"></div>
            <span class="project-cat-badge">${pCat}</span>
          </div>
          <div class="project-meta-box">
            <h4 class="project-card-heading">${pTitle}</h4>
            <p class="project-card-summary">${pDesc}</p>
            <div class="project-tech-tags">
              ${pTags.slice(0, 3).map(t => `<span class="tech-tag-chip">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
            </div>
            <a href="${TemplateHelper.escapeHtml(proj.url || '#')}" class="project-view-link">
              <span>EXPLORE NODE</span>
              <span class="link-arrow">↗</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    // 02. Skills Data
    const defaultSkillBars = [
      { name: 'Frontend Architecture', level: 92 },
      { name: 'Backend & Systems', level: 78 },
      { name: 'Python / Neural AI', level: 90 },
      { name: 'System Architecture', level: 86 },
      { name: 'Three.js / WebGL 3D', level: 95 }
    ];

    const skillBarsHtml = defaultSkillBars.map(sb => `
      <div class="skill-bar-row">
        <div class="skill-label-group">
          <span class="skill-name-txt">${sb.name}</span>
          <span class="skill-pct-txt">${sb.level}%</span>
        </div>
        <div class="skill-track-bg">
          <div class="skill-fill-glow" style="width: ${sb.level}%;"></div>
        </div>
      </div>
    `).join('');

    // 03. Experience Data
    const defaultExperiences = [
      {
        role: 'Principal AI Developer',
        company: 'Sprawl Net',
        period: '2024 — PRESENT',
        summary: 'Directing the architecture of autonomous neural pipelines and ultra-low-latency edge telemetry networks.'
      },
      {
        role: 'Full-Stack Architect',
        company: 'Vance Systems',
        period: '2022 — 2024',
        summary: 'Engineered high-concurrency microservices, WebGL 3D client portals, and secure distributed data pipelines.'
      },
      {
        role: 'Open-Source Core Contributor',
        company: 'Cyber Mesh',
        period: '2020 — 2022',
        summary: 'Authored core cryptographic modules and consensus primitives for decentralized peer-to-peer routing.'
      }
    ];

    const rawExperience = (data.experience && data.experience.length) ? data.experience : defaultExperiences;
    const experienceTimelineHtml = rawExperience.map(exp => `
      <div class="timeline-cyber-node">
        <div class="timeline-indicator">
          <div class="timeline-pip"></div>
          <div class="timeline-stem"></div>
        </div>
        <div class="timeline-content-pod">
          <div class="timeline-date-tag">${TemplateHelper.escapeHtml(exp.period || exp.duration || '2022 — 2024')}</div>
          <h4 class="timeline-role-title">${TemplateHelper.escapeHtml(exp.role || exp.title || 'Architect')}</h4>
          <div class="timeline-company-name">⚡ ${TemplateHelper.escapeHtml(exp.company || 'Enterprise')}</div>
          <p class="timeline-summary-txt">${TemplateHelper.escapeHtml(exp.desc || exp.summary || '')}</p>
        </div>
      </div>
    `).join('');

    // 04. Education & Formal Credentials
    const eduBlocksHtml = (data.education && data.education.length ? data.education : [
      { degree: 'B.Tech in Computer Science', institution: 'Sprawl Institute of Technology', grade: 'CGPA: 9.4' }
    ]).map(edu => `
      <div class="resume-edu-chip">
        <div class="edu-degree-title">✦ ${TemplateHelper.escapeHtml(edu.degree)}</div>
        <div class="edu-school-name">${TemplateHelper.escapeHtml(edu.institution)}</div>
        ${edu.grade ? `<div class="edu-grade-pill">${TemplateHelper.escapeHtml(edu.grade)}</div>` : ''}
      </div>
    `).join('');

    // 05. Certifications & Badges
    const certBadgesHtml = (data.certifications && data.certifications.length ? data.certifications : [
      { name: 'Certified Neural Systems Architect', issuer: 'Quantum Sprawl Consortium' },
      { name: 'AWS Certified Machine Learning Specialist', issuer: 'Amazon Web Services' }
    ]).map(cert => `
      <div class="resume-cert-chip">
        <div class="cert-name-txt">★ ${TemplateHelper.escapeHtml(cert.name || cert.title || 'Specialist')}</div>
        <div class="cert-issuer-txt">${TemplateHelper.escapeHtml(cert.issuer || cert.organization || 'Accredited Board')}</div>
      </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Cyber-Architect Sprawl</title>
  <meta name="description" content="${safeBio.substring(0, 160)}">
  
  <!-- Premium Modern Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    :root {
      --bg-dark: #0A0C16;
      --bg-surface: #0E1222;
      --bg-card: rgba(16, 21, 40, 0.75);
      --bg-glass: rgba(20, 26, 52, 0.65);
      --neon-cyan: #00F5D4;
      --neon-magenta: #F72585;
      --neon-purple: #7209B7;
      --neon-blue: #4CC9F0;
      --border-cyan: rgba(0, 245, 212, 0.28);
      --border-magenta: rgba(247, 37, 133, 0.28);
      --border-card: rgba(255, 255, 255, 0.08);
      --text-main: #FFFFFF;
      --text-sub: #94A3B8;
      --font-display: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-mono: 'Space Grotesk', monospace;
      --font-body: 'Inter', -apple-system, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-body);
      overflow-x: hidden;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient Canvas Background */
    #cyber-sprawl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: none;
      opacity: 0.85;
    }

    /* Top Global Navigation Bar */
    .sprawl-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px 0 90px;
      background: rgba(10, 12, 22, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 245, 212, 0.15);
      z-index: 1000;
    }

    .brand-logo-group {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .brand-avatar-box {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 0.95rem;
      color: #050711;
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.4);
    }

    .brand-name-txt {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .header-nav-menu {
      display: flex;
      align-items: center;
      gap: 24px;
      list-style: none;
    }

    .header-nav-link {
      color: var(--text-sub);
      text-decoration: none;
      font-family: var(--font-body);
      font-size: 0.88rem;
      font-weight: 500;
      transition: all 0.25s ease;
      position: relative;
      padding: 6px 0;
    }

    .header-nav-link:hover, .header-nav-link.active {
      color: var(--neon-cyan);
    }

    .header-nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--neon-cyan);
      box-shadow: 0 0 8px var(--neon-cyan);
    }

    .btn-talk-pill {
      background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
      color: #050711;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.82rem;
      padding: 10px 22px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 0 16px rgba(0, 245, 212, 0.35);
      transition: all 0.25s ease;
      border: none;
      cursor: pointer;
    }

    .btn-talk-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 24px rgba(0, 245, 212, 0.6);
    }

    /* Left Floating Dock */
    .sprawl-vertical-dock {
      position: fixed;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 14px 10px;
      background: rgba(14, 18, 36, 0.75);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-cyan);
      border-radius: 30px;
      z-index: 999;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }

    .dock-icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-sub);
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.25s ease;
    }

    .dock-icon-btn:hover, .dock-icon-btn.active {
      background: rgba(0, 245, 212, 0.15);
      color: var(--neon-cyan);
      box-shadow: 0 0 12px rgba(0, 245, 212, 0.4);
    }

    /* Main Content Wrapper */
    .sprawl-wrapper {
      position: relative;
      z-index: 10;
      padding-left: 90px;
      max-width: 1440px;
      margin: 0 auto;
    }

    .sprawl-section {
      min-height: 100vh;
      padding: 110px 48px 80px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }

    .section-tag-pill {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      color: var(--neon-cyan);
      text-transform: uppercase;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-tag-pill::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--neon-cyan);
      box-shadow: 0 0 8px var(--neon-cyan);
    }

    .section-big-title {
      font-family: var(--font-display);
      font-size: 2.8rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
      background: linear-gradient(180deg, #FFFFFF 30%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* =========================================================
       SECTION 01: HOME (HERO)
       ========================================================= */
    .hero-sprawl-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      gap: 40px;
      min-height: calc(100vh - 150px);
    }

    .hero-lead-kicker {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      color: var(--neon-cyan);
      letter-spacing: 0.04em;
      margin-bottom: 12px;
    }

    .hero-headline-h1 {
      font-family: var(--font-display);
      font-size: 4rem;
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.04em;
      margin-bottom: 20px;
    }

    .hero-headline-name {
      background: linear-gradient(135deg, var(--neon-magenta), #B5179E);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 35px rgba(247, 37, 133, 0.45);
    }

    .hero-headline-role {
      color: #FFFFFF;
    }

    .hero-bio-paragraph {
      font-size: 1.15rem;
      color: var(--text-sub);
      line-height: 1.7;
      max-width: 540px;
      margin-bottom: 32px;
    }

    .hero-action-row {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-bottom: 40px;
    }

    .sprawl-btn {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.88rem;
      padding: 14px 28px;
      border-radius: 12px;
      text-decoration: none;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .sprawl-btn.cyan-outline {
      background: rgba(0, 245, 212, 0.05);
      border: 1px solid var(--neon-cyan);
      color: var(--neon-cyan);
      box-shadow: 0 0 16px rgba(0, 245, 212, 0.2);
    }

    .sprawl-btn.cyan-outline:hover {
      background: rgba(0, 245, 212, 0.15);
      box-shadow: 0 0 25px rgba(0, 245, 212, 0.4);
      transform: translateY(-2px);
    }

    .sprawl-btn.magenta-filled {
      background: linear-gradient(135deg, var(--neon-magenta), var(--neon-purple));
      border: none;
      color: #FFFFFF;
      box-shadow: 0 0 20px rgba(247, 37, 133, 0.4);
    }

    .sprawl-btn.magenta-filled:hover {
      box-shadow: 0 0 30px rgba(247, 37, 133, 0.7);
      transform: translateY(-2px);
    }

    .hero-telemetry-strip {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #64748B;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .status-dot-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--neon-cyan);
      box-shadow: 0 0 10px var(--neon-cyan);
      animation: neonPulse 2s infinite;
    }

    @keyframes neonPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    /* 3D Hero Stage (Floating Cyber Hand & Crystals) */
    .hero-3d-stage {
      position: relative;
      width: 100%;
      height: 520px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-3d-ambient-glow {
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 245, 212, 0.25) 0%, rgba(247, 37, 133, 0.15) 50%, transparent 70%);
      filter: blur(40px);
      z-index: 1;
      pointer-events: none;
    }

    .hero-hand-artwork-container {
      position: relative;
      z-index: 2;
      width: 380px;
      height: 460px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 35px rgba(0, 245, 212, 0.4));
      animation: floatHand 5s ease-in-out infinite;
    }

    @keyframes floatHand {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-16px) rotate(1deg); }
    }

    .hero-hand-clean-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 24px;
    }

    #hero-crystals-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      pointer-events: none;
    }

    /* =========================================================
       SECTION 02: ABOUT ME (Concentric Radar & Cyber Eye)
       ========================================================= */
    .about-sprawl-layout {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      align-items: center;
      gap: 50px;
    }

    .about-visual-rig {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .cyber-eye-floating-pod {
      position: relative;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 35px rgba(0, 245, 212, 0.55)) drop-shadow(0 0 20px rgba(114, 9, 183, 0.45));
      animation: floatEye 4.5s ease-in-out infinite;
      margin-bottom: -25px;
      z-index: 5;
    }

    @keyframes floatEye {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }

    .cyber-eye-clean-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .radar-canvas-pod {
      position: relative;
      width: 360px;
      height: 360px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(14, 18, 36, 0.9) 0%, rgba(10, 12, 22, 0.95) 100%);
      border: 1px solid rgba(0, 245, 212, 0.2);
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 245, 212, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #about-radar-canvas {
      width: 100%;
      height: 100%;
    }

    .about-narrative-box {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .narrative-subtitle {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      color: var(--neon-cyan);
    }

    .about-narrative-text {
      font-size: 1.05rem;
      color: var(--text-sub);
      line-height: 1.7;
    }

    .about-metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 14px;
    }

    .metric-badge-pod {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 18px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .metric-badge-pod:hover {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 20px rgba(0, 245, 212, 0.2);
      transform: translateY(-3px);
    }

    .metric-number-big {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1;
      margin-bottom: 6px;
    }

    .metric-label-txt {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-sub);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .about-domains-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 8px;
    }

    .domain-chip {
      background: rgba(0, 245, 212, 0.06);
      border: 1px solid rgba(0, 245, 212, 0.25);
      border-radius: 9999px;
      padding: 8px 18px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--neon-cyan);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* =========================================================
       SECTION 03: PROJECTS (Glass Bento Cards)
       ========================================================= */
    .filter-tabs-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-pill-btn {
      background: rgba(16, 21, 40, 0.8);
      border: 1px solid var(--border-card);
      color: var(--text-sub);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      padding: 10px 22px;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .filter-pill-btn:hover {
      color: #FFFFFF;
      border-color: rgba(255, 255, 255, 0.2);
    }

    .filter-pill-btn.active {
      background: linear-gradient(135deg, var(--neon-cyan), var(--neon-blue));
      color: #050711;
      border-color: transparent;
      box-shadow: 0 0 16px rgba(0, 245, 212, 0.4);
    }

    .projects-bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .project-bento-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .project-bento-card:hover {
      border-color: var(--neon-cyan);
      box-shadow: 0 12px 30px rgba(0, 245, 212, 0.15);
      transform: translateY(-4px);
    }

    .project-preview-wrap {
      position: relative;
      width: 100%;
      height: 180px;
      background: radial-gradient(circle at center, rgba(0, 245, 212, 0.08) 0%, #070913 75%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .project-thumb-img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      filter: drop-shadow(0 10px 25px rgba(0, 245, 212, 0.35));
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
    }

    .project-bento-card:hover .project-thumb-img {
      transform: scale(1.08) translateY(-4px);
      filter: drop-shadow(0 15px 35px rgba(0, 245, 212, 0.55)) drop-shadow(0 0 25px rgba(247, 37, 133, 0.3));
    }

    .project-cat-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(10, 12, 22, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid var(--border-cyan);
      border-radius: 9999px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--neon-cyan);
      padding: 4px 12px;
    }

    .project-meta-box {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .project-card-heading {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
    }

    .project-card-summary {
      font-size: 0.9rem;
      color: var(--text-sub);
      line-height: 1.55;
      margin-bottom: 16px;
      flex-grow: 1;
    }

    .project-tech-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }

    .tech-tag-chip {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: #CBD5E1;
      padding: 3px 8px;
    }

    .project-view-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--neon-cyan);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: gap 0.2s ease;
    }

    .project-view-link:hover {
      gap: 10px;
    }

    /* =========================================================
       SECTION 04: SKILLS (2-Column Architecture & Glowing Bars)
       ========================================================= */
    .skills-dual-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: flex-start;
    }

    .skills-category-stack {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .skill-cat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 18px 24px;
      display: flex;
      align-items: center;
      gap: 18px;
      transition: all 0.3s ease;
    }

    .skill-cat-card:hover {
      border-color: var(--neon-cyan);
      background: rgba(20, 26, 52, 0.85);
      transform: translateX(4px);
    }

    .skill-cat-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(0, 245, 212, 0.1);
      border: 1px solid var(--border-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--neon-cyan);
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .skill-cat-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.05rem;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .skill-cat-desc {
      font-size: 0.82rem;
      color: var(--text-sub);
    }

    .skills-proficiency-pod {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 32px;
    }

    .skill-bar-row {
      margin-bottom: 22px;
    }

    .skill-bar-row:last-child {
      margin-bottom: 0;
    }

    .skill-label-group {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .skill-name-txt {
      font-family: var(--font-display);
      font-size: 0.92rem;
      font-weight: 600;
      color: #FFFFFF;
    }

    .skill-pct-txt {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--neon-cyan);
    }

    .skill-track-bg {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 9999px;
      overflow: hidden;
    }

    .skill-fill-glow {
      height: 100%;
      border-radius: 9999px;
      background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
      box-shadow: 0 0 12px rgba(0, 245, 212, 0.5);
    }

    /* =========================================================
       SECTION 05: EXPERIENCE (Timeline & Isometric Circuit)
       ========================================================= */
    .experience-sprawl-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .timeline-stream-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .timeline-cyber-node {
      display: flex;
      gap: 16px;
      position: relative;
    }

    .timeline-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: 24px;
    }

    .timeline-pip {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--neon-cyan);
      box-shadow: 0 0 12px var(--neon-cyan);
      border: 2px solid #050711;
      margin-top: 4px;
    }

    .timeline-stem {
      width: 2px;
      flex-grow: 1;
      background: linear-gradient(180deg, var(--neon-cyan), rgba(0, 245, 212, 0.1));
      margin-top: 6px;
    }

    .timeline-content-pod {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 20px 24px;
      flex-grow: 1;
      transition: all 0.3s ease;
    }

    .timeline-content-pod:hover {
      border-color: var(--neon-cyan);
      transform: translateX(4px);
    }

    .timeline-date-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--neon-cyan);
      margin-bottom: 4px;
    }

    .timeline-role-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 2px;
    }

    .timeline-company-name {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--neon-magenta);
      margin-bottom: 8px;
    }

    .timeline-summary-txt {
      font-size: 0.88rem;
      color: var(--text-sub);
      line-height: 1.55;
    }

    .isometric-circuit-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 15px 45px rgba(0, 245, 212, 0.4)) drop-shadow(0 0 35px rgba(114, 9, 183, 0.3));
      animation: floatBoard 6s ease-in-out infinite;
    }

    @keyframes floatBoard {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(0.5deg); }
    }

    .circuit-clean-img {
      width: 100%;
      height: auto;
      max-height: 400px;
      object-fit: contain;
      display: block;
    }

    /* =========================================================
       SECTION 06: RESUME (Floating Tilted Glass Sheets & Badges)
       ========================================================= */
    .resume-sprawl-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .resume-plates-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
    }

    .resume-clean-art-img {
      width: 100%;
      max-width: 440px;
      filter: drop-shadow(0 20px 45px rgba(0, 245, 212, 0.4)) drop-shadow(0 0 35px rgba(247, 37, 133, 0.35));
      transform: rotateY(-8deg) rotateX(4deg);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
    }

    .resume-plates-stage:hover .resume-clean-art-img {
      transform: rotateY(0deg) rotateX(0deg) scale(1.02);
      filter: drop-shadow(0 25px 55px rgba(0, 245, 212, 0.55)) drop-shadow(0 0 45px rgba(247, 37, 133, 0.45));
    }

    .resume-credentials-dossier {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 24px;
      padding: 36px;
    }

    .resume-creds-title {
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 8px;
    }

    .resume-creds-desc {
      color: var(--text-sub);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .resume-edu-section-title {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--neon-cyan);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .resume-edu-chip {
      background: rgba(10, 12, 30, 0.6);
      border: 1px solid var(--border-cyan);
      border-radius: 12px;
      padding: 12px 18px;
      margin-bottom: 10px;
    }

    .edu-degree-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFFFFF;
    }

    .edu-school-name {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--neon-cyan);
    }

    .edu-grade-pill {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--neon-magenta);
      margin-top: 2px;
    }

    .resume-cert-chip {
      background: rgba(10, 12, 30, 0.6);
      border: 1px solid var(--border-magenta);
      border-radius: 12px;
      padding: 12px 18px;
      margin-bottom: 10px;
    }

    .cert-name-txt {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFFFFF;
    }

    .cert-issuer-txt {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--neon-magenta);
    }

    /* =========================================================
       SECTION 07: THE NET STREAM (BLOG)
       ========================================================= */
    .net-stream-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 20px;
    }

    .stream-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.35s ease;
    }

    .stream-card:hover {
      border-color: var(--neon-cyan);
      box-shadow: 0 10px 30px rgba(0, 245, 212, 0.2);
      transform: translateY(-4px);
    }

    .stream-thumb-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .stream-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .stream-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--neon-cyan);
      margin-bottom: 8px;
    }

    .stream-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .stream-excerpt {
      font-size: 0.88rem;
      color: var(--text-sub);
      line-height: 1.6;
      margin-bottom: 16px;
      flex-grow: 1;
    }

    .stream-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: #64748B;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 14px;
    }

    /* =========================================================
       SECTION 08: CONTACT (3-Column: Info, Origami Bird, Form)
       ========================================================= */
    .contact-tri-layout {
      display: grid;
      grid-template-columns: 1fr 0.8fr 1.25fr;
      gap: 32px;
      align-items: center;
    }

    .contact-info-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .contact-info-card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .contact-icon-bubble {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: rgba(0, 245, 212, 0.1);
      border: 1px solid var(--border-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--neon-cyan);
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .contact-bubble-title {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-sub);
      text-transform: uppercase;
    }

    .contact-bubble-val {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFFFFF;
    }

    /* Center Origami Bird Rig */
    .contact-bird-rig {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .origami-bird-clean-img {
      width: 100%;
      max-width: 220px;
      height: auto;
      display: block;
      filter: drop-shadow(0 0 25px rgba(0, 245, 212, 0.5));
      animation: floatBird 4s ease-in-out infinite;
    }

    @keyframes floatBird {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1.5deg); }
    }

    /* Right Glassmorphic Form */
    .contact-form-pod {
      background: var(--bg-card);
      border: 1px solid var(--border-cyan);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }

    .contact-field-wrap {
      margin-bottom: 16px;
    }

    .contact-field-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--neon-cyan);
      letter-spacing: 0.05em;
      margin-bottom: 6px;
      display: block;
    }

    .sprawl-input, .sprawl-textarea {
      width: 100%;
      background: rgba(10, 12, 26, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 12px 16px;
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 0.92rem;
      outline: none;
      transition: all 0.25s ease;
    }

    .sprawl-input:focus, .sprawl-textarea:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 16px rgba(0, 245, 212, 0.25);
    }

    .sprawl-textarea {
      resize: vertical;
      min-height: 100px;
    }

    /* =========================================================
       SECTION 09: 404 QUANTUM ERROR STATE
       ========================================================= */
    .quantum-404-section {
      border-top: 1px solid rgba(247, 37, 133, 0.2);
      background: linear-gradient(180deg, transparent 0%, rgba(247, 37, 133, 0.04) 100%);
    }

    .quantum-404-layout {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      gap: 50px;
    }

    .quantum-404-kicker {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--neon-magenta);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .quantum-404-h1 {
      font-family: var(--font-display);
      font-size: 3.2rem;
      font-weight: 900;
      color: #FFFFFF;
      margin-bottom: 18px;
      line-height: 1.1;
    }

    .quantum-404-desc {
      font-size: 1.1rem;
      color: var(--text-sub);
      line-height: 1.7;
      margin-bottom: 30px;
    }

    .gnome-stage-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .glitch-404-backdrop-txt {
      position: absolute;
      font-family: var(--font-display);
      font-size: 10rem;
      font-weight: 900;
      color: rgba(247, 37, 133, 0.15);
      letter-spacing: -0.05em;
      user-select: none;
      z-index: 1;
    }

    .cyber-gnome-clean-img {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 240px;
      height: auto;
      filter: drop-shadow(0 0 35px rgba(0, 245, 212, 0.4));
      animation: floatGnome 4.5s ease-in-out infinite;
    }

    @keyframes floatGnome {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    /* Modal for 404 Preview */
    .sprawl-404-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(5, 7, 15, 0.88);
      backdrop-filter: blur(25px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .sprawl-404-modal.active {
      display: flex;
    }

    .sprawl-404-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-magenta);
      border-radius: 28px;
      padding: 40px;
      max-width: 680px;
      width: 100%;
      box-shadow: 0 0 60px rgba(247, 37, 133, 0.35);
      position: relative;
      text-align: center;
    }

    /* Footer */
    .sprawl-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 40px 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #64748B;
      font-size: 0.85rem;
    }

    @media (max-width: 960px) {
      .sprawl-header { padding: 0 20px; }
      .header-nav-menu { display: none; }
      .sprawl-vertical-dock { display: none; }
      .sprawl-wrapper { padding-left: 0; }
      .hero-sprawl-grid, .about-sprawl-layout, .skills-dual-grid, 
      .experience-sprawl-grid, .resume-sprawl-grid, .quantum-404-layout {
        grid-template-columns: 1fr;
      }
      .projects-bento-grid, .net-stream-grid {
        grid-template-columns: 1fr;
      }
      .contact-tri-layout {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Background Three.js Holographic Field Canvas -->
  <canvas id="cyber-sprawl-canvas"></canvas>

  <!-- Top Global Navigation Bar -->
  <header class="sprawl-header">
    <a href="#home" class="brand-logo-group">
      <div class="brand-avatar-box">AL</div>
      <span class="brand-name-txt">${safeName}</span>
    </a>

    <ul class="header-nav-menu">
      <li><a href="#home" class="header-nav-link active">Home</a></li>
      <li><a href="#about" class="header-nav-link">About</a></li>
      <li><a href="#projects" class="header-nav-link">Projects</a></li>
      <li><a href="#skills" class="header-nav-link">Skills</a></li>
      <li><a href="#experience" class="header-nav-link">Experience</a></li>
      <li><a href="#resume" class="header-nav-link">Resume</a></li>
      <li><a href="#stream" class="header-nav-link">Net Stream</a></li>
      <li><a href="#contact" class="header-nav-link">Contact</a></li>
    </ul>

    <a href="#contact" class="btn-talk-pill">Let's Talk</a>
  </header>

  <!-- Left Floating Dock Navigation -->
  <aside class="sprawl-vertical-dock">
    <a href="#home" class="dock-icon-btn active" title="Home">⌂</a>
    <a href="#about" class="dock-icon-btn" title="About">👤</a>
    <a href="#projects" class="dock-icon-btn" title="Projects">⊞</a>
    <a href="#skills" class="dock-icon-btn" title="Skills">⚡</a>
    <a href="#experience" class="dock-icon-btn" title="Experience">❖</a>
    <a href="#contact" class="dock-icon-btn" title="Contact">✉</a>
  </aside>

  <!-- Main Multi-Section Layout Wrapper -->
  <div class="sprawl-wrapper">

    <!-- =========================================================
         SECTION 01: HOME (HERO with 3D Floating Hand & Crystals)
         ========================================================= -->
    <section id="home" class="sprawl-section">
      <div class="hero-sprawl-grid">
        <div class="hero-content-col">
          <div class="hero-lead-kicker">Hello, I'm</div>
          <h1 class="hero-headline-h1">
            <span class="hero-headline-name">${safeName}</span>,<br>
            <span class="hero-headline-role">${safeTitle}.</span>
          </h1>
          <p class="hero-bio-paragraph">${safeBio}</p>
          
          <div class="hero-action-row">
            <a href="#projects" class="sprawl-btn cyan-outline">View Networks</a>
            <a href="#contact" class="sprawl-btn magenta-filled">Let's Decode</a>
          </div>

          <div class="hero-telemetry-strip">
            <div class="status-dot-pulse"></div>
            <span>● GRID SYNC: CONNECTED // NODE TELEMETRY ACTIVE</span>
          </div>
        </div>

        <div class="hero-3d-stage">
          <div class="hero-3d-ambient-glow"></div>
          <div class="hero-hand-artwork-container">
            <img src="/assets/designs/cyber/hero_hand_nobg.png" alt="3D Floating Holographic Cyber Hand" class="hero-hand-clean-img" />
            <canvas id="hero-crystals-canvas"></canvas>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         SECTION 02: ABOUT ME (Concentric Radar & Cyber Eye)
         ========================================================= -->
    <section id="about" class="sprawl-section">
      <div class="section-tag-pill">02 // ARCHITECT PROFILE</div>
      <h2 class="section-big-title">About Me</h2>

      <div class="about-sprawl-layout">
        <div class="about-visual-rig">
          <div class="cyber-eye-floating-pod">
            <img src="/assets/designs/cyber/cyber_eye_nobg.png" alt="3D Cyber Eye Iris" class="cyber-eye-clean-img" />
          </div>
          <div class="radar-canvas-pod">
            <canvas id="about-radar-canvas" width="360" height="360"></canvas>
          </div>
        </div>

        <div class="about-narrative-box">
          <div class="narrative-subtitle">Get to know // Mission & Vision</div>
          <p class="about-narrative-text">
            Pioneering the intersection of artificial intelligence, high-performance spatial graphics, and resilient distributed protocols. Every architectural node is forged with sub-millisecond precision, robust fault-tolerance, and human-centric clarity.
          </p>
          <p class="about-narrative-text">
            Operating as a systems builder across the cybernetic sprawl, turning complex computational topologies into fluid, intuitive, and mesmerizing digital experiences.
          </p>

          <div class="about-metrics-row">
            <div class="metric-badge-pod">
              <div class="metric-number-big">4+</div>
              <div class="metric-label-txt">Years Active</div>
            </div>
            <div class="metric-badge-pod">
              <div class="metric-number-big">30+</div>
              <div class="metric-label-txt">Deployed Nodes</div>
            </div>
            <div class="metric-badge-pod">
              <div class="metric-number-big">15+</div>
              <div class="metric-label-txt">Core Protocols</div>
            </div>
          </div>

          <div class="about-domains-row">
            <span class="domain-chip">⚡ [AI] Machine Intelligence</span>
            <span class="domain-chip">❖ [DATA] Distributed Systems</span>
            <span class="domain-chip">⊞ [NET] Mesh Topology</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         SECTION 03: PROJECTS (Bento Matrix)
         ========================================================= -->
    <section id="projects" class="sprawl-section">
      <div class="section-tag-pill">03 // ACTIVE SYSTEMS</div>
      <h2 class="section-big-title">My Projects</h2>

      <div class="filter-tabs-bar">
        <button class="filter-pill-btn active" onclick="filterProjects('all', this)">All</button>
        <button class="filter-pill-btn" onclick="filterProjects('Grid App', this)">Grid App</button>
        <button class="filter-pill-btn" onclick="filterProjects('Data Chain', this)">Data Chain</button>
        <button class="filter-pill-btn" onclick="filterProjects('AI Core', this)">AI Core</button>
        <button class="filter-pill-btn" onclick="filterProjects('Neuro-UI', this)">Neuro-UI</button>
      </div>

      <div class="projects-bento-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- =========================================================
         SECTION 04: SKILLS (2-Column Architecture & Glowing Bars)
         ========================================================= -->
    <section id="skills" class="sprawl-section">
      <div class="section-tag-pill">04 // NEURAL PROFICIENCIES</div>
      <h2 class="section-big-title">My Skills</h2>

      <div class="skills-dual-grid">
        <div class="skills-category-stack">
          <div class="skill-cat-card">
            <div class="skill-cat-icon">⌂</div>
            <div>
              <div class="skill-cat-title">Core Interface</div>
              <div class="skill-cat-desc">Microservices, reactive state management, and high-framerate frontends.</div>
            </div>
          </div>
          <div class="skill-cat-card">
            <div class="skill-cat-icon">⚡</div>
            <div>
              <div class="skill-cat-title">Network Protocols</div>
              <div class="skill-cat-desc">Decentralized mesh telemetry, WebSockets, and peer-to-peer data synchronization.</div>
            </div>
          </div>
          <div class="skill-cat-card">
            <div class="skill-cat-icon">❖</div>
            <div>
              <div class="skill-cat-title">Backend & Systems</div>
              <div class="skill-cat-desc">Distributed compute engines, event buses, and cloud orchestration.</div>
            </div>
          </div>
          <div class="skill-cat-card">
            <div class="skill-cat-icon">✦</div>
            <div>
              <div class="skill-cat-title">Frontend Design</div>
              <div class="skill-cat-desc">Three.js WebGL, modern responsive typography, and tactile motion physics.</div>
            </div>
          </div>
          <div class="skill-cat-card">
            <div class="skill-cat-icon">★</div>
            <div>
              <div class="skill-cat-title">Emerging Tech</div>
              <div class="skill-cat-desc">Edge AI runtime models, spatial UI prototypes, and quantum circuit simulation.</div>
            </div>
          </div>
        </div>

        <div class="skills-proficiency-pod">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 20px;">TELEMETRY PROFICIENCY METRICS</div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================
         SECTION 05: EXPERIENCE (Timeline & Isometric Circuit)
         ========================================================= -->
    <section id="experience" class="sprawl-section">
      <div class="section-tag-pill">05 // CAREER TRAJECTORY</div>
      <h2 class="section-big-title">Experience Page</h2>

      <div class="experience-sprawl-grid">
        <div class="timeline-stream-container">
          ${experienceTimelineHtml}
        </div>

        <div class="isometric-circuit-stage">
          <img src="/assets/designs/cyber/circuit_board_nobg.png" alt="3D Isometric Circuit Board with Cityscape" class="circuit-clean-img" />
        </div>
      </div>
    </section>

    <!-- =========================================================
         SECTION 06: RESUME (Floating Glass Sheets & Accreditation)
         ========================================================= -->
    <section id="resume" class="sprawl-section">
      <div class="section-tag-pill">06 // CURATED CREDENTIALS</div>
      <h2 class="section-big-title">My Resume</h2>

      <div class="resume-sprawl-grid">
        <div class="resume-plates-stage">
          <img src="/assets/designs/cyber/resume_cards_nobg.png" alt="Floating Tilted Glass Resume Sheets" class="resume-clean-art-img" />
        </div>

        <div class="resume-credentials-dossier">
          <h3 class="resume-creds-title">Curated Credentials</h3>
          <p class="resume-creds-desc">
            Verified architectural achievements, systems leadership, and open-source contributions across the sentient digital sprawl.
          </p>

          <div class="resume-edu-section-title">FORMAL ACCREDITATION // EDUCATION</div>
          ${eduBlocksHtml}

          <div class="resume-edu-section-title" style="margin-top: 18px; color: var(--neon-magenta);">VERIFIED BADGES // CERTIFICATIONS</div>
          ${certBadgesHtml}

          <button onclick="triggerDownloadResume()" class="sprawl-btn cyan-outline" style="margin-top: 20px;">
            DOWNLOAD DOSSIER PDF ↓
          </button>
        </div>
      </div>
    </section>

    <!-- =========================================================
         SECTION 07: THE NET STREAM (BLOG)
         ========================================================= -->
    <section id="stream" class="sprawl-section">
      <div class="section-tag-pill">07 // DISPATCH FEED</div>
      <h2 class="section-big-title">The Net Stream</h2>

      <div class="net-stream-grid">
        <article class="stream-card">
          <img src="/assets/designs/cyber/blog_ux_3d.jpg" alt="Hyper-Reality UX" class="stream-thumb-img" />
          <div class="stream-card-body">
            <span class="stream-tag">Hyper-Reality UX</span>
            <h4 class="stream-title">Hyper-Reality: The Future of UX</h4>
            <p class="stream-excerpt">A deep exploration of spatial UI architectures, holographic interfaces, and neural telemetry.</p>
            <div class="stream-meta-row">
              <span>May 11, 2024</span>
              <span>6 min read</span>
            </div>
          </div>
        </article>

        <article class="stream-card">
          <img src="/assets/designs/cyber/blog_api_3d.jpg" alt="Decentralized APIs" class="stream-thumb-img" />
          <div class="stream-card-body">
            <span class="stream-tag">Quantum Mesh</span>
            <h4 class="stream-title">Decentralized APIs & Quantum Mesh</h4>
            <p class="stream-excerpt">Scaling fault-tolerant real-time RPC over low-latency peer-to-peer distributed nodes.</p>
            <div class="stream-meta-row">
              <span>May 17, 2024</span>
              <span>8 min read</span>
            </div>
          </div>
        </article>

        <article class="stream-card">
          <img src="/assets/designs/cyber/blog_ai_3d.jpg" alt="Realtime AI Apps" class="stream-thumb-img" />
          <div class="stream-card-body">
            <span class="stream-tag">AI Systems</span>
            <h4 class="stream-title">Building Realtime AI Apps</h4>
            <p class="stream-excerpt">Integrating low-latency generative pipelines and 3D WebGL streaming canvases.</p>
            <div class="stream-meta-row">
              <span>June 1, 2024</span>
              <span>5 min read</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- =========================================================
         SECTION 08: CONTACT (3-Column: Info, Origami Bird, Form)
         ========================================================= -->
    <section id="contact" class="sprawl-section">
      <div class="section-tag-pill">08 // TRANSMISSION NODE</div>
      <h2 class="section-big-title">Contact Page</h2>

      <div class="contact-tri-layout">
        <div class="contact-info-col">
          <div class="contact-info-card">
            <div class="contact-icon-bubble">✉</div>
            <div>
              <div class="contact-bubble-title">COMMUNICATION NODE</div>
              <div class="contact-bubble-val">${safeEmail}</div>
            </div>
          </div>
          <div class="contact-info-card">
            <div class="contact-icon-bubble">⌖</div>
            <div>
              <div class="contact-bubble-title">SPRAWL SECTOR</div>
              <div class="contact-bubble-val">${safeLocation}</div>
            </div>
          </div>
          <div class="contact-info-card">
            <div class="contact-icon-bubble">☎</div>
            <div>
              <div class="contact-bubble-title">VOICE / TELEMETRY</div>
              <div class="contact-bubble-val">${safePhone}</div>
            </div>
          </div>
          <div class="contact-info-card">
            <div class="contact-icon-bubble">⚡</div>
            <div>
              <div class="contact-bubble-title">NODE AVAILABILITY</div>
              <div class="contact-bubble-val">Open for Architectural Advisory</div>
            </div>
          </div>
        </div>

        <div class="contact-bird-rig">
          <img src="/assets/designs/cyber/origami_bird_nobg.png" alt="3D Low-Poly Origami Bird on Neon Branch" class="origami-bird-clean-img" />
        </div>

        <div class="contact-form-pod">
          <form id="sprawl-contact-form" onsubmit="handleContactSubmit(event)">
            <div class="contact-field-wrap">
              <label class="contact-field-label">NAME</label>
              <input type="text" id="contact-name" class="sprawl-input" placeholder="Your formal identity" required />
            </div>
            <div class="contact-field-wrap">
              <label class="contact-field-label">NICKNAME / HANDLE</label>
              <input type="text" id="contact-handle" class="sprawl-input" placeholder="Cyber alias" />
            </div>
            <div class="contact-field-wrap">
              <label class="contact-field-label">EMAIL</label>
              <input type="email" id="contact-email" class="sprawl-input" placeholder="node@domain.network" required />
            </div>
            <div class="contact-field-wrap">
              <label class="contact-field-label">MESSAGE</label>
              <textarea id="contact-message" class="sprawl-textarea" placeholder="Specify architecture scope..." required></textarea>
            </div>
            <button type="submit" class="sprawl-btn magenta-filled" style="width: 100%; justify-content: center;">
              SEND MESSAGE ✦
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="sprawl-footer">
      <div>© 2026 ${safeName}. Crafted for the sentient digital sprawl.</div>
      <div>SYNCHRONIZATION: 100% // QUANTUM MESH V4.2</div>
    </footer>

  </div>

  <!-- Interactive Scripts & WebGL -->
  <script>
    // 01. Background WebGL Particle Sprawl Canvas
    (function initBackgroundCanvas() {
      const canvas = document.getElementById('cyber-sprawl-canvas');
      if (!canvas || !window.THREE) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 40;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particle Field
      const particleCount = 1200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorCyan = new THREE.Color(0x00F5D4);
      const colorMagenta = new THREE.Color(0xF72585);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const mixed = Math.random() > 0.4 ? colorCyan : colorMagenta;
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.85,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      function animate() {
        requestAnimationFrame(animate);
        particleSystem.rotation.y += 0.0008;
        particleSystem.rotation.x += 0.0004;

        camera.position.x += (mouseX * 5 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 5 - camera.position.y) * 0.04;

        renderer.render(scene, camera);
      }
      animate();
    })();

    // 02. Three.js Floating 3D Crystals over Hero Hand
    (function initHeroCrystals() {
      const canvas = document.getElementById('hero-crystals-canvas');
      if (!canvas || !window.THREE) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 380;
      const height = rect.height || 460;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 5.5);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Group of 6 floating hexagonal data crystals hovering above the hand
      const crystalGroup = new THREE.Group();
      scene.add(crystalGroup);

      const crystals = [];
      const crystalGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.85, 6);
      const wireGeo = new THREE.EdgesGeometry(crystalGeo);

      const crystalMat = new THREE.MeshBasicMaterial({
        color: 0x00F5D4,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });

      const positions = [
        { x: -0.9, y: 1.2, z: 0.2, speed: 0.02 },
        { x: -0.4, y: 1.7, z: -0.3, speed: 0.015 },
        { x: 0.1, y: 2.1, z: 0.1, speed: 0.025 },
        { x: 0.6, y: 1.6, z: -0.2, speed: 0.018 },
        { x: 1.0, y: 1.1, z: 0.3, speed: 0.022 },
        { x: -0.1, y: 0.8, z: 0.5, speed: 0.019 }
      ];

      positions.forEach(pos => {
        const mesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: 0x00F5D4 }));
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.userData = pos;
        crystalGroup.add(mesh);
        crystals.push(mesh);
      });

      let time = 0;
      function animateHeroCrystals() {
        requestAnimationFrame(animateHeroCrystals);
        time += 0.03;

        crystals.forEach((cr, i) => {
          cr.rotation.y += cr.userData.speed;
          cr.rotation.x += cr.userData.speed * 0.5;
          cr.position.y = cr.userData.y + Math.sin(time + i) * 0.12;
        });

        renderer.render(scene, camera);
      }
      animateHeroCrystals();
    })();

    // 03. Section 02: Animated Concentric Radar
    (function initRadar() {
      const canvas = document.getElementById('about-radar-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      const years = ['2021', '2022', '2023', '2024', '2025'];
      const radii = [35, 60, 90, 120, 150];
      let angle = 0;

      function draw() {
        ctx.clearRect(0, 0, w, h);
        angle += 0.012;

        // Draw concentric orbital rings
        radii.forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 245, 212, 0.18)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Year label along the ring
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(-0.4 + idx * 0.3);
          ctx.font = '10px Space Grotesk';
          ctx.fillStyle = 'rgba(0, 245, 212, 0.6)';
          ctx.fillText(years[idx], r + 6, 4);
          ctx.restore();

          // Orbiting data pulse
          const pAngle = angle * (1 + idx * 0.3);
          const px = cx + Math.cos(pAngle) * r;
          const py = cy + Math.sin(pAngle) * r;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#00F5D4' : '#F72585';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Center Pulsing Core
        const corePulse = Math.sin(angle * 2) * 4;
        ctx.beginPath();
        ctx.arc(cx, cy, 14 + corePulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 245, 212, 0.35)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#00F5D4';
        ctx.shadowColor = '#00F5D4';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        requestAnimationFrame(draw);
      }
      draw();
    })();

    // 04. Projects Filter Logic
    function filterProjects(category, btn) {
      const buttons = document.querySelectorAll('.filter-pill-btn');
      buttons.forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');

      const cards = document.querySelectorAll('.project-bento-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          if (window.gsap) {
            gsap.fromTo(card, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 05. Resume Download Trigger
    function triggerDownloadResume() {
      if (window.confetti) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00F5D4', '#F72585', '#4CC9F0']
        });
      }
      window.print();
    }

    // 06. Contact Form Transmission
    function handleContactSubmit(e) {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalTxt = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'TRANSMITTING TELEMETRY...';

      setTimeout(() => {
        submitBtn.innerHTML = 'TELEMETRY RECEIVED ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #00F5D4, #4CC9F0)';
        submitBtn.style.color = '#050711';

        if (window.confetti) {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#00F5D4', '#F72585', '#7209B7']
          });
        }

        setTimeout(() => {
          e.target.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalTxt;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      }, 800);
    }
  </script>
</body>
</html>
    `;
  },

  /**
   * Dedicated 404 Quantum Error State Page
   * Rendered when a user accesses a non-existent route or invalid URL on the portfolio.
   * Features the 3D Cyber Gnome, Quantum Path Diverged hero layout, WebGL particles, and Interactive Anomaly Inspector.
   */
  render404Page(siteId = '', rawCandidateData = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name || 'Quantum Sprawl');
    const returnUrl = siteId ? `/p/${siteId}` : '/';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Quantum Path Diverged | ${safeName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    :root {
      --bg-dark: #060713;
      --bg-surface: #0B0E23;
      --neon-cyan: #00F5D4;
      --neon-magenta: #F72585;
      --neon-purple: #7209B7;
      --text-main: #FFFFFF;
      --text-sub: #94A3B8;
      --border-cyan: rgba(0, 245, 212, 0.35);
      --border-magenta: rgba(247, 37, 133, 0.35);
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
      padding: 24px;
    }

    #quantum-bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.65;
    }

    /* Top branding header */
    .sprawl-404-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 40px;
      z-index: 10;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .brand-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.06em;
      color: #FFFFFF;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-title span {
      color: var(--neon-cyan);
    }

    .header-badge {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--neon-magenta);
      background: rgba(247, 37, 133, 0.1);
      border: 1px solid var(--border-magenta);
      padding: 4px 12px;
      border-radius: 999px;
      letter-spacing: 0.08em;
    }

    /* Main Error Stage */
    .quantum-stage-card {
      position: relative;
      z-index: 5;
      max-width: 1020px;
      width: 100%;
      background: rgba(11, 14, 35, 0.85);
      backdrop-filter: blur(25px);
      -webkit-backdrop-filter: blur(25px);
      border: 1px solid var(--border-magenta);
      border-radius: 28px;
      padding: 56px 48px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(247, 37, 133, 0.15);
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .quantum-404-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      align-items: center;
      gap: 40px;
    }

    .quantum-404-kicker {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--neon-magenta);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .quantum-404-kicker::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--neon-magenta);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--neon-magenta);
      animation: pulseDot 2s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }

    .quantum-404-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 4.5vw, 3.4rem);
      font-weight: 900;
      color: #FFFFFF;
      margin-bottom: 16px;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .quantum-404-desc {
      font-size: 1.05rem;
      color: var(--text-sub);
      line-height: 1.7;
      margin-bottom: 32px;
    }

    .actions-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .sprawl-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 28px;
      border-radius: 12px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid transparent;
    }

    .magenta-filled {
      background: linear-gradient(135deg, var(--neon-magenta), var(--neon-purple));
      color: #FFFFFF;
      box-shadow: 0 0 25px rgba(247, 37, 133, 0.45);
    }

    .magenta-filled:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 35px rgba(247, 37, 133, 0.7);
    }

    .cyan-outline {
      background: rgba(0, 245, 212, 0.05);
      border-color: var(--border-cyan);
      color: var(--neon-cyan);
    }

    .cyan-outline:hover {
      background: rgba(0, 245, 212, 0.15);
      box-shadow: 0 0 25px rgba(0, 245, 212, 0.35);
      transform: translateY(-2px);
    }

    /* Gnome & 404 Stage */
    .gnome-stage-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 280px;
    }

    .glitch-404-backdrop-txt {
      position: absolute;
      font-family: var(--font-display);
      font-size: clamp(7rem, 14vw, 11rem);
      font-weight: 900;
      color: rgba(247, 37, 133, 0.12);
      letter-spacing: -0.05em;
      user-select: none;
      z-index: 1;
      text-shadow: 0 0 40px rgba(247, 37, 133, 0.25);
    }

    .cyber-gnome-clean-img {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 250px;
      height: auto;
      filter: drop-shadow(0 0 35px rgba(0, 245, 212, 0.45));
      animation: floatGnome 4.5s ease-in-out infinite;
    }

    @keyframes floatGnome {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(1deg); }
    }

    /* Status Footer */
    .quantum-status-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px 32px;
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: rgba(148, 163, 184, 0.6);
      letter-spacing: 0.08em;
      backdrop-filter: blur(8px);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      z-index: 10;
    }

    /* Inspector Modal */
    .sprawl-404-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(5, 7, 15, 0.88);
      backdrop-filter: blur(25px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .sprawl-404-modal.active {
      display: flex;
    }

    .sprawl-404-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-magenta);
      border-radius: 28px;
      padding: 40px;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 0 60px rgba(247, 37, 133, 0.35);
      text-align: center;
    }

    .telemetry-code-block {
      background: #050711;
      border: 1px solid rgba(0, 245, 212, 0.2);
      border-radius: 12px;
      padding: 16px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--neon-cyan);
      text-align: left;
      margin: 20px 0;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .quantum-404-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .actions-row {
        justify-content: center;
      }
      .quantum-stage-card {
        padding: 36px 24px;
      }
      .sprawl-404-header {
        padding: 16px 20px;
      }
      .quantum-status-footer {
        flex-direction: column;
        gap: 6px;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <canvas id="quantum-bg-canvas"></canvas>

  <header class="sprawl-404-header">
    <a href="${returnUrl}" class="brand-title">
      ${safeName} <span>// QUANTUM ARCHITECT</span>
    </a>
    <div class="header-badge">STATUS: 404 ANOMALY</div>
  </header>

  <main class="quantum-stage-card">
    <div class="quantum-404-grid">
      <div>
        <div class="quantum-404-kicker">09 // QUANTUM ANOMALY DETECTED</div>
        <h1 class="quantum-404-h1">Quantum Path Diverged.</h1>
        <p class="quantum-404-desc">
          Signal lost in the hyper-connected sprawl. The requested memory address has decoupled from consensus reality.
        </p>
        <div class="actions-row">
          <a href="${returnUrl}" class="sprawl-btn magenta-filled">
            ⌂ Reroute to Base
          </a>
          <button onclick="toggleAnomalyModal(true)" class="sprawl-btn cyan-outline">
            Inspect Error Node ✦
          </button>
        </div>
      </div>

      <div class="gnome-stage-wrap">
        <div class="glitch-404-backdrop-txt">404</div>
        <img src="/assets/designs/cyber/cyber_gnome_nobg.png" alt="3D Cyber Gnome 404 Guardian" class="cyber-gnome-clean-img" />
      </div>
    </div>
  </main>

  <footer class="quantum-status-footer">
    <div>COORDINATES: UNRESOLVED // LATTICE DRIFT</div>
    <div>SYNCHRONIZATION: 0.00% // ANOMALY VECTOR ISOLATED</div>
  </footer>

  <div id="quantum-404-modal" class="sprawl-404-modal">
    <div class="sprawl-404-box">
      <img src="/assets/designs/cyber/cyber_gnome_nobg.png" alt="3D Cyber Gnome" style="width: 130px; margin: 0 auto 16px auto; display: block; filter: drop-shadow(0 0 25px rgba(247, 37, 133, 0.6));" />
      <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin-bottom: 8px;">Quantum Memory Dump</h3>
      <p style="color: var(--text-sub); font-size: 0.95rem;">Vector analysis indicates target coordinate does not exist in this quantum lattice.</p>
      
      <div class="telemetry-code-block">
        &gt; ADDR_LOOKUP: 0x7FFF_QNOD_404<br>
        &gt; STATUS: NULL_PTR_EXCEPTION<br>
        &gt; GUARDIAN: CYBER_GNOME_V2.4 [ACTIVE]<br>
        &gt; ROUTE_RECOMMENDED: /p/${siteId || 'base'}
      </div>

      <button onclick="toggleAnomalyModal(false)" class="sprawl-btn cyan-outline">Close Diagnostics</button>
    </div>
  </div>

  <script>
    function toggleAnomalyModal(show) {
      const modal = document.getElementById('quantum-404-modal');
      if (modal) modal.classList.toggle('active', show);
    }

    (function() {
      const canvas = document.getElementById('quantum-bg-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 450;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const count = 280;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const color1 = new THREE.Color('#00F5D4');
      const color2 = new THREE.Color('#F72585');

      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 1100;
        pos[i + 1] = (Math.random() - 0.5) * 1100;
        pos[i + 2] = (Math.random() - 0.5) * 700;

        const c = Math.random() > 0.5 ? color1 : color2;
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 3.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      const mesh = new THREE.Points(geo, mat);
      scene.add(mesh);

      function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.0008;
        mesh.rotation.x += 0.0004;
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

module.exports = { CyberArchitectSprawlTemplate };

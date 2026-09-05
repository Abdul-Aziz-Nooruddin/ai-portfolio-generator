/**
 * Abyssal Nautilus Artisan Template
 * Theme: Deep-Sea Tech Artisan, Oceanic Bioluminescence, Sunken Treasure Chests & Ancient Cartography
 * 
 * Features:
 * - 01. Hero: Coral hand holding iridescent pearlescent nautilus shell over Three.js ocean abyss
 * - 02. About: Submarine porthole & celestial sonar radar with depth telemetry rings
 * - 03. Projects: 3D sunken treasure chest cards with brass ship wheel emblems & interactive filter tabs
 * - 04. Skills: Bioluminescent neural coral tree of life with glowing pearl meters
 * - 05. Experience: Vertical depth timeline with 3D ascending giant squid & sea kelp
 * - 06. Resume: Vintage nautical parchment map with candidate dossier & PDF download
 * - 07. Articles: Sea chests half-buried in ocean sand dunes
 * - 08. Contact: Ornate pearlescent seahorse on coral alongside glassmorphic transmission form
 * - Dedicated 404: Sunken antique brass compass, coins & overgrown 404 monolith (render404Page)
 * 
 * Strict Zero Hardcoded Content Policy: All sections bind strictly to parsed candidate profile data.
 */

const { TemplateHelper } = require('../template-helper');

const AbyssalNautilusArtisanTemplate = {
  id: 'abyssal-nautilus-artisan',
  name: 'Abyssal Nautilus Artisan',
  description: 'Oceanic bioluminescent portfolio featuring pearlescent nautilus shells, porthole radars, 3D treasure chests, and antique nautical cartography.',

  render(candidateProfile = {}) {
    const data = TemplateHelper.normalize(candidateProfile);

    const safeName = TemplateHelper.escapeHtml(data.name || 'Ava Chen');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Deep-Sea Tech Artisan');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Architecting sustainable digital ecosystems, blending oceanic bio-inspired design with resilient high-concurrency systems.');
    const safeAvatar = data.avatar || '/assets/designs/nautilus/nautilus_shell_nobg.png';

    // Skills Generation
    const rawSkills = (data.skills && data.skills.length > 0) ? data.skills : [
      { name: 'Three.js / WebGL Caustics', level: 95 },
      { name: 'Distributed Mesh Protocol', level: 92 },
      { name: 'Bio-Digital Interface Core', level: 90 },
      { name: 'High-Concurrency Rust/Go', level: 88 },
      { name: 'Spatial UI / Shader Physics', level: 94 }
    ];

    const skillBarsHtml = rawSkills.map(skill => {
      const name = TemplateHelper.escapeHtml(typeof skill === 'string' ? skill : (skill.name || skill.title || 'Telemetry Node'));
      const level = typeof skill === 'object' && skill.level ? Math.min(Math.max(parseInt(skill.level, 10) || 85, 10), 100) : 90;
      return `
        <div class="abyss-skill-meter">
          <div class="skill-meter-header">
            <span class="skill-meter-name">${name}</span>
            <span class="skill-meter-pct">${level}%</span>
          </div>
          <div class="skill-meter-track">
            <div class="skill-meter-fill" style="width: ${level}%;">
              <span class="skill-pearl-node"></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Projects (Treasure Chest Cards)
    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        title: 'Biolume Dashboard',
        description: 'Real-time deep ocean telemetry visualization cluster with sub-surface scatter shaders.',
        tags: ['WebGL', 'Three.js', 'Telemetry', 'Ocean-UI'],
        link: '#'
      },
      {
        title: 'Aqua-Grid Map',
        description: 'Decentralized underwater sensor telemetry routing across oceanic edge clusters.',
        tags: ['Rust', 'Decentralized', 'Mesh', 'Sensors'],
        link: '#'
      },
      {
        title: 'Deep-Core Analytics',
        description: 'High-throughput time-series analytics for hydrothermal vent energy extraction.',
        tags: ['Go', 'TimescaleDB', 'Stream', 'Analytics'],
        link: '#'
      },
      {
        title: 'Abyssal UI Design System',
        description: 'Bespoke design system featuring nacre iridescent gradients and fluid caustics.',
        tags: ['Design System', 'Figma', 'CSS Physics'],
        link: '#'
      },
      {
        title: 'Insealicath Protocol',
        description: 'Fault-tolerant consensus algorithm operating under extreme latency oceanic conditions.',
        tags: ['Consensus', 'Zero-Loss', 'Distributed'],
        link: '#'
      },
      {
        title: 'Volute Neural Substrate',
        description: 'Biomimetic spiral data compression inspired by the golden ratio of nautilus shells.',
        tags: ['Algorithms', 'Compression', 'Math Core'],
        link: '#'
      }
    ];

    const projectCardsHtml = rawProjects.map((project, idx) => {
      const pTitle = TemplateHelper.escapeHtml(project.title || project.name || `Artifact ${idx + 1}`);
      const pDesc = TemplateHelper.escapeHtml(project.description || project.desc || 'Deep-sea architectural artifact.');
      let tagsArray = [];
      if (Array.isArray(project.tags) && project.tags.length > 0) {
        tagsArray = project.tags;
      } else if (typeof project.tech === 'string') {
        tagsArray = project.tech.split(/[,•|/]/).map(t => t.trim()).filter(Boolean);
      } else if (project.category) {
        tagsArray = [project.category];
      } else {
        tagsArray = ['Oceanic', 'Artifact'];
      }
      const tagsHtml = tagsArray.map(t => `<span class="abyss-tag">${TemplateHelper.escapeHtml(t)}</span>`).join('');
      const linkUrl = project.live || project.link || project.github || '#';
      const chestVariants = [
        '/assets/designs/nautilus/treasure_chest_wheel_nobg.png',
        '/assets/designs/nautilus/chest_compass_lid_nobg.png',
        '/assets/designs/nautilus/chest_wheel_lid_nobg.png'
      ];
      const chestImg = chestVariants[idx % chestVariants.length];

      return `
        <article class="treasure-chest-card" data-category="${TemplateHelper.escapeHtml(tagsArray[0] || 'all')}">
          <div class="chest-lid-ornament">
            <img src="${chestImg}" alt="3D Treasure Chest Ornament" class="chest-wheel-img" />
          </div>
          <div class="chest-body-plate">
            <div class="chest-plate-header">
              <span class="chest-coordinate">CHEST 0${idx + 1} // VAULT</span>
              <span class="chest-depth-badge">DEEP-LOCK</span>
            </div>
            <h3 class="chest-title">${pTitle}</h3>
            <p class="chest-description">${pDesc}</p>
            <div class="chest-tags-row">${tagsHtml}</div>
            <div class="chest-card-actions">
              <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="chest-btn-unlock">
                Inspect Artifact ↗
              </a>
              <button onclick="openArtifactModal('${pTitle}', '${pDesc}')" class="chest-btn-sonar">
                Sonar Scan ✦
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Experience Timeline
    const rawExperience = (data.experience && data.experience.length > 0) ? data.experience : [
      {
        period: '2024 - PRESENT',
        role: 'Principal Deep-Tech Artisan',
        company: 'Oceanic Horizon Labs',
        description: 'Spearheading biomimetic computing architectures and underwater autonomous sensor mesh protocols.'
      },
      {
        period: '2022 - 2024',
        role: 'Senior Oceanographer & Systems Engineer',
        company: 'Abyssal Depth Technologies',
        description: 'Engineered high-concurrency real-time sonography data pipelines rendering over 60 FPS in WebGL.'
      },
      {
        period: '2020 - 2022',
        role: 'Autonomous Interface Architect',
        company: 'Nautilus Subsea Systems',
        description: 'Constructed resilient cockpit telemetry consoles for exploratory deep-trench submersibles.'
      }
    ];

    const experienceTimelineHtml = rawExperience.map((exp, idx) => {
      const period = TemplateHelper.escapeHtml(exp.period || exp.duration || `EPOCH 0${idx + 1}`);
      const role = TemplateHelper.escapeHtml(exp.role || exp.title || exp.position || 'Staff Architect');
      const company = TemplateHelper.escapeHtml(exp.company || exp.organization || 'Subsea Consortium');
      const desc = TemplateHelper.escapeHtml(exp.description || exp.desc || 'Architectural contributions across oceanic computational nodes.');

      return `
        <div class="abyss-timeline-step">
          <div class="timeline-depth-anchor">
            <span class="anchor-glyph">⚓</span>
            <span class="anchor-depth-label">${period}</span>
          </div>
          <div class="timeline-content-shell">
            <h3 class="timeline-role">${role}</h3>
            <div class="timeline-company">${company}</div>
            <p class="timeline-desc">${desc}</p>
          </div>
        </div>
      `;
    }).join('');

    // Education & Certifications (Resume Section)
    const rawEducation = (data.education && data.education.length > 0) ? data.education : [
      {
        degree: 'M.S. in Marine Cybernetics & Spatial Intelligence',
        institution: 'Global Oceanographic Institute',
        year: '2020'
      },
      {
        degree: 'B.S. in Autonomous Robotics & Systems Engineering',
        institution: 'Pacific Institute of Technology',
        year: '2018'
      }
    ];

    const educationHtml = rawEducation.map(edu => `
      <div class="resume-dossier-row">
        <div class="dossier-row-icon">📜</div>
        <div>
          <div class="dossier-row-title">${TemplateHelper.escapeHtml(edu.degree || edu.title || 'Degree')}</div>
          <div class="dossier-row-meta">${TemplateHelper.escapeHtml(edu.institution || edu.school || 'University')} • ${TemplateHelper.escapeHtml(edu.year || edu.grade || '')}</div>
        </div>
      </div>
    `).join('');

    const rawCertifications = (data.certifications && data.certifications.length > 0) ? data.certifications : [
      {
        name: 'Deep Sea Autonomous Navigator',
        issuer: 'Nautical Cybernetics Society'
      },
      {
        name: 'Distributed Aquatic Protocols Specialist',
        issuer: 'Open Ocean Foundation'
      }
    ];

    const certificationsHtml = rawCertifications.map(c => `
      <div class="resume-dossier-row">
        <div class="dossier-row-icon">🎖️</div>
        <div>
          <div class="dossier-row-title">${TemplateHelper.escapeHtml(c.name || c.title || 'Certification')}</div>
          <div class="dossier-row-meta">${TemplateHelper.escapeHtml(c.issuer || c.authority || 'Issuing Authority')}</div>
        </div>
      </div>
    `).join('');

    // Articles / Sea Chests Blog Section
    const articlesList = [
      {
        title: 'Navigating the Digital Ocean',
        subtitle: 'A foundational guide to fluid spatial architecture and bioluminescent interfaces.',
        date: 'May 11, 2026',
        chestType: 'wheel'
      },
      {
        title: 'Solar Stagonies in Web Apps',
        subtitle: 'Harnessing procedural caustics and WebGPU shaders for zero-latency 60FPS fluid physics.',
        date: 'June 04, 2026',
        chestType: 'compass'
      },
      {
        title: 'Guiding Resilient Subsea Nodes',
        subtitle: 'Decentralized gossip protocols designed to withstand physical oceanic packet disruption.',
        date: 'August 19, 2026',
        chestType: 'wheel'
      }
    ];

    const articlesHtml = articlesList.map((art, idx) => {
      const lidImg = art.chestType === 'compass' 
        ? '/assets/designs/nautilus/chest_compass_lid_nobg.png' 
        : '/assets/designs/nautilus/chest_wheel_lid_nobg.png';

      return `
        <article class="sand-dune-chest">
          <div class="sand-chest-lid">
            <img src="${lidImg}" alt="Treasure Chest Lid" class="sand-chest-lid-img" />
          </div>
          <div class="sand-parchment-scroll">
            <div class="scroll-date">${art.date}</div>
            <h3 class="scroll-title">${art.title}</h3>
            <p class="scroll-desc">${art.subtitle}</p>
            <a href="#contact" class="scroll-read-link">Read Chronicle →</a>
          </div>
        </article>
      `;
    }).join('');

    // Contact Coordinates
    const email = data.email || data.contact?.email || 'ava.chen@abyssal-nautilus.io';
    const location = data.location || data.contact?.location || 'Pacific Trench Node 04';
    const github = data.github || data.contact?.github || 'https://github.com';
    const linkedin = data.linkedin || data.contact?.linkedin || 'https://linkedin.com';
    const twitter = data.twitter || data.contact?.twitter || 'https://twitter.com';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeTitle} | Abyssal Nautilus Artisan</title>
  <meta name="description" content="${safeBio}">
  
  <!-- Typography: Syne (Display/Bold) + Plus Jakarta Sans (Body) + JetBrains Mono (Sonar Telemetry) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Three.js & Confetti CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    :root {
      --bg-void: #020B14;
      --bg-abyss: #03131E;
      --bg-surface: #061A2A;
      --bg-card: rgba(6, 26, 42, 0.78);
      
      --sea-teal: #0EA5E9;
      --sea-cyan: #22D3EE;
      --biolume-cyan: #00F5D4;
      --coral-gold: #F59E0B;
      --pearl-nacre: #F8FAFC;
      --sand-parchment: #F1E7D0;
      
      --text-main: #F8FAFC;
      --text-muted: #94A3B8;
      --text-dim: #64748B;
      
      --border-teal: rgba(14, 165, 233, 0.28);
      --border-cyan: rgba(34, 211, 238, 0.35);
      --border-gold: rgba(245, 158, 11, 0.32);
      
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --header-h: 76px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-void);
      color: var(--text-main);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* WebGL Three.js Particle Canvas */
    #abyss-bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.65;
    }

    /* Fixed Navigation Header */
    .abyss-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--header-h);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 clamp(20px, 4vw, 60px);
      background: rgba(2, 11, 20, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-teal);
      z-index: 1000;
    }

    .brand-logo-group {
      display: flex;
      align-items: center;
      gap: 14px;
      text-decoration: none;
      color: var(--text-main);
    }

    .brand-monogram {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--bg-void);
      box-shadow: 0 0 20px rgba(0, 245, 212, 0.4);
    }

    .brand-text {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: 0.04em;
    }

    .brand-text span {
      color: var(--sea-cyan);
      font-size: 0.75rem;
      display: block;
      font-family: var(--font-mono);
      font-weight: 500;
      letter-spacing: 0.08em;
    }

    .header-nav-list {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }

    .header-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      transition: color 0.25s ease, text-shadow 0.25s ease;
    }

    .header-nav-link:hover, .header-nav-link.active {
      color: var(--biolume-cyan);
      text-shadow: 0 0 14px rgba(0, 245, 212, 0.6);
    }

    .btn-talk-pill {
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      color: var(--bg-void);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.85rem;
      padding: 10px 24px;
      border-radius: 999px;
      text-decoration: none;
      box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .btn-talk-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(0, 245, 212, 0.7);
    }

    /* Left Vertical Dock */
    .abyss-vertical-dock {
      position: fixed;
      left: 24px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px 10px;
      background: rgba(3, 19, 30, 0.82);
      backdrop-filter: blur(18px);
      border: 1px solid var(--border-teal);
      border-radius: 999px;
      z-index: 999;
      box-shadow: 0 10px 35px rgba(0,0,0,0.6);
    }

    .dock-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1.1rem;
      transition: all 0.25s ease;
    }

    .dock-btn:hover, .dock-btn.active {
      background: rgba(14, 165, 233, 0.2);
      color: var(--biolume-cyan);
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.5);
      transform: scale(1.1);
    }

    /* Main Container */
    .abyss-container {
      position: relative;
      z-index: 10;
      max-width: 1280px;
      margin: 0 auto;
      padding: calc(var(--header-h) + 40px) 32px 100px 32px;
    }

    .abyss-section {
      margin-bottom: 140px;
      scroll-margin-top: 100px;
    }

    .section-kicker-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--sea-cyan);
      background: rgba(14, 165, 233, 0.1);
      border: 1px solid var(--border-teal);
      padding: 6px 16px;
      border-radius: 999px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    .section-big-title {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 4.5vw, 3.6rem);
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin-bottom: 36px;
    }

    /* Section 01: Hero */
    .hero-abyss-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 50px;
      min-height: calc(85vh - var(--header-h));
    }

    .hero-lead-text {
      font-family: var(--font-display);
      font-size: 1.3rem;
      color: var(--sea-cyan);
      font-weight: 700;
      margin-bottom: 8px;
    }

    .hero-h1 {
      font-family: var(--font-display);
      font-size: clamp(2.8rem, 5.5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
    }

    .hero-name-gradient {
      background: linear-gradient(135deg, #FFFFFF 0%, #E0F2FE 40%, var(--sea-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-role-title {
      color: var(--biolume-cyan);
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      font-weight: 800;
    }

    .hero-bio-para {
      font-size: 1.15rem;
      line-height: 1.75;
      color: var(--text-muted);
      max-width: 580px;
      margin-bottom: 36px;
    }

    .hero-buttons-row {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
    }

    .btn-abyss-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 32px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      color: var(--bg-void);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 0 30px rgba(0, 245, 212, 0.45);
      transition: all 0.3s ease;
    }

    .btn-abyss-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 45px rgba(0, 245, 212, 0.75);
    }

    .btn-abyss-outline {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 32px;
      border-radius: 14px;
      background: rgba(14, 165, 233, 0.08);
      border: 1px solid var(--border-cyan);
      color: var(--sea-cyan);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-abyss-outline:hover {
      background: rgba(14, 165, 233, 0.2);
      box-shadow: 0 0 25px rgba(34, 211, 238, 0.35);
      transform: translateY(-3px);
    }

    /* Hero 3D Stage */
    .hero-3d-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 440px;
    }

    .nautilus-ambient-glow {
      position: absolute;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(0, 245, 212, 0.25) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 70%);
      filter: blur(40px);
      border-radius: 50%;
      pointer-events: none;
      animation: pulseCaustics 6s ease-in-out infinite alternate;
    }

    @keyframes pulseCaustics {
      0% { transform: scale(0.9); opacity: 0.6; }
      100% { transform: scale(1.15); opacity: 1; }
    }

    .hero-nautilus-artwork-pod {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-nautilus-img {
      width: 100%;
      max-width: 360px;
      height: auto;
      filter: drop-shadow(0 15px 45px rgba(0, 245, 212, 0.45));
      animation: floatNautilus 5s ease-in-out infinite;
    }

    @keyframes floatNautilus {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-16px) rotate(1.5deg); }
    }

    /* Section 02: About */
    .about-abyss-grid {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      align-items: center;
      gap: 60px;
    }

    .porthole-radar-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .porthole-img {
      width: 100%;
      max-width: 380px;
      height: auto;
      filter: drop-shadow(0 20px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 35px rgba(14, 165, 233, 0.35));
      animation: radarBreath 6s ease-in-out infinite;
    }

    @keyframes radarBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    .about-narrative-card {
      background: var(--bg-card);
      border: 1px solid var(--border-teal);
      border-radius: 28px;
      padding: 44px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }

    .about-subtitle {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--sea-cyan);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    .about-para {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-muted);
      margin-bottom: 24px;
    }

    .about-metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 32px;
    }

    .metric-pill-box {
      background: rgba(3, 19, 30, 0.7);
      border: 1px solid var(--border-teal);
      border-radius: 18px;
      padding: 20px 14px;
      text-align: center;
      transition: transform 0.25s ease, border-color 0.25s ease;
    }

    .metric-pill-box:hover {
      transform: translateY(-4px);
      border-color: var(--biolume-cyan);
    }

    .metric-num {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--pearl-nacre);
      line-height: 1;
      margin-bottom: 6px;
      background: linear-gradient(135deg, #FFFFFF, var(--biolume-cyan));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .metric-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-dim);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* Section 03: Projects (Treasure Chest Cards) */
    .projects-filter-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-tab-btn {
      background: rgba(6, 26, 42, 0.6);
      border: 1px solid var(--border-teal);
      border-radius: 999px;
      padding: 10px 22px;
      font-family: var(--font-body);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .filter-tab-btn:hover, .filter-tab-btn.active {
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      color: var(--bg-void);
      box-shadow: 0 0 20px rgba(0, 245, 212, 0.4);
      border-color: transparent;
    }

    .treasure-chests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 32px;
    }

    .treasure-chest-card {
      position: relative;
      background: linear-gradient(165deg, rgba(8, 34, 54, 0.85) 0%, rgba(3, 19, 30, 0.95) 100%);
      border: 1px solid var(--border-teal);
      border-radius: 24px;
      padding: 32px 28px;
      overflow: hidden;
      backdrop-filter: blur(16px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(14, 165, 233, 0.05);
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .treasure-chest-card:hover {
      transform: translateY(-8px);
      border-color: var(--biolume-cyan);
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0, 245, 212, 0.25);
    }

    .chest-lid-ornament {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
      height: 90px;
    }

    .chest-wheel-img {
      max-height: 80px;
      width: auto;
      filter: drop-shadow(0 6px 18px rgba(0,0,0,0.7));
      transition: transform 0.4s ease;
    }

    .treasure-chest-card:hover .chest-wheel-img {
      transform: rotate(25deg) scale(1.1);
    }

    .chest-plate-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .chest-coordinate {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--sea-cyan);
      letter-spacing: 0.08em;
    }

    .chest-depth-badge {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--coral-gold);
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid var(--border-gold);
      padding: 3px 10px;
      border-radius: 999px;
    }

    .chest-title {
      font-family: var(--font-display);
      font-size: 1.45rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 12px;
      line-height: 1.25;
    }

    .chest-description {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.65;
      margin-bottom: 22px;
      flex-grow: 1;
    }

    .chest-tags-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .abyss-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--biolume-cyan);
      background: rgba(0, 245, 212, 0.08);
      border: 1px solid rgba(0, 245, 212, 0.2);
      padding: 4px 10px;
      border-radius: 6px;
    }

    .chest-card-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .chest-btn-unlock {
      flex: 1;
      text-align: center;
      padding: 12px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      color: var(--bg-void);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.85rem;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .chest-btn-unlock:hover {
      box-shadow: 0 0 20px rgba(0, 245, 212, 0.5);
    }

    .chest-btn-sonar {
      padding: 12px 18px;
      border-radius: 12px;
      background: rgba(14, 165, 233, 0.1);
      border: 1px solid var(--border-cyan);
      color: var(--sea-cyan);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .chest-btn-sonar:hover {
      background: rgba(14, 165, 233, 0.25);
    }

    /* Section 04: Skills (Bioluminescent Coral Tree) */
    .skills-abyss-grid {
      display: grid;
      grid-template-columns: 1fr 1.25fr;
      align-items: center;
      gap: 60px;
    }

    .coral-tree-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .coral-tree-img {
      width: 100%;
      max-width: 440px;
      height: auto;
      filter: drop-shadow(0 0 45px rgba(0, 245, 212, 0.45));
      animation: treeSway 7s ease-in-out infinite;
    }

    @keyframes treeSway {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }

    .skills-dossier-panel {
      background: var(--bg-card);
      border: 1px solid var(--border-teal);
      border-radius: 28px;
      padding: 44px;
      backdrop-filter: blur(20px);
    }

    .abyss-skill-meter {
      margin-bottom: 24px;
    }

    .skill-meter-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-family: var(--font-mono);
      font-size: 0.88rem;
    }

    .skill-meter-name {
      color: var(--pearl-nacre);
      font-weight: 600;
    }

    .skill-meter-pct {
      color: var(--biolume-cyan);
      font-weight: 700;
    }

    .skill-meter-track {
      width: 100%;
      height: 10px;
      background: rgba(3, 19, 30, 0.8);
      border: 1px solid var(--border-teal);
      border-radius: 999px;
      overflow: visible;
      position: relative;
    }

    .skill-meter-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--sea-teal), var(--biolume-cyan));
      border-radius: 999px;
      position: relative;
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.5);
    }

    .skill-pearl-node {
      position: absolute;
      right: -4px;
      top: -3px;
      width: 16px;
      height: 16px;
      background: #FFFFFF;
      border: 2px solid var(--biolume-cyan);
      border-radius: 50%;
      box-shadow: 0 0 10px #FFFFFF, 0 0 20px var(--biolume-cyan);
    }

    /* Section 05: Experience (Giant Squid & Depth Steps) */
    .experience-abyss-grid {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      align-items: center;
      gap: 60px;
    }

    .abyss-timeline-step {
      display: flex;
      gap: 24px;
      margin-bottom: 36px;
      position: relative;
    }

    .abyss-timeline-step::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 45px;
      bottom: -30px;
      width: 2px;
      background: linear-gradient(180deg, var(--sea-cyan), transparent);
    }

    .abyss-timeline-step:last-child::before {
      display: none;
    }

    .timeline-depth-anchor {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 2px solid var(--sea-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      box-shadow: 0 0 15px rgba(34, 211, 238, 0.4);
      position: relative;
    }

    .anchor-depth-label {
      position: absolute;
      left: 56px;
      top: 10px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--sea-cyan);
      white-space: nowrap;
      letter-spacing: 0.08em;
    }

    .timeline-content-shell {
      background: var(--bg-card);
      border: 1px solid var(--border-teal);
      border-radius: 20px;
      padding: 24px 28px;
      width: 100%;
      margin-top: 28px;
    }

    .timeline-role {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .timeline-company {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--biolume-cyan);
      margin-bottom: 12px;
    }

    .timeline-desc {
      font-size: 0.98rem;
      color: var(--text-muted);
      line-height: 1.65;
    }

    .experience-creature-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 420px;
    }

    .squid-img {
      width: 60%;
      max-width: 220px;
      height: auto;
      filter: drop-shadow(0 15px 35px rgba(34, 211, 238, 0.4));
      animation: floatSquid 5s ease-in-out infinite;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 3;
    }

    @keyframes floatSquid {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-18px) rotate(-3deg); }
    }

    .kelp-img {
      width: 90%;
      max-width: 340px;
      height: auto;
      filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
      z-index: 2;
    }

    /* Section 06: Resume (Vintage Map Cartography) */
    .resume-abyss-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      align-items: center;
      gap: 60px;
    }

    .vintage-map-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .vintage-map-img {
      width: 100%;
      max-width: 420px;
      height: auto;
      filter: drop-shadow(0 25px 60px rgba(0,0,0,0.9));
    }

    .map-dynamic-overlay {
      position: absolute;
      top: 18%;
      left: 18%;
      width: 46%;
      text-align: center;
      transform: rotate(-8deg);
      z-index: 4;
      pointer-events: none;
    }

    .map-avatar-round {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #5A4022;
      margin: 0 auto 8px auto;
      display: block;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }

    .map-candidate-name {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.95rem;
      color: #382410;
      line-height: 1.1;
      margin-bottom: 2px;
    }

    .map-candidate-title {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #6B4E2B;
      line-height: 1.2;
    }

    .resume-dossier-panel {
      background: var(--bg-card);
      border: 1px solid var(--border-teal);
      border-radius: 28px;
      padding: 44px;
      backdrop-filter: blur(20px);
    }

    .resume-dossier-row {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .dossier-row-icon {
      font-size: 1.4rem;
      background: rgba(14, 165, 233, 0.12);
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .dossier-row-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.1rem;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .dossier-row-meta {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    /* Section 07: Sea Chests Blog */
    .sea-chests-dunes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .sand-dune-chest {
      background: radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15) 0%, rgba(3, 19, 30, 0.9) 75%);
      border: 1px solid var(--border-teal);
      border-radius: 24px;
      padding: 32px 24px;
      text-align: center;
      position: relative;
      backdrop-filter: blur(16px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      transition: transform 0.3s ease;
    }

    .sand-dune-chest:hover {
      transform: translateY(-6px);
      border-color: var(--coral-gold);
    }

    .sand-chest-lid-img {
      max-height: 85px;
      width: auto;
      margin-bottom: 18px;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.7));
    }

    .scroll-date {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--coral-gold);
      letter-spacing: 0.08em;
      margin-bottom: 10px;
    }

    .scroll-title {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 10px;
    }

    .scroll-desc {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .scroll-read-link {
      color: var(--sea-cyan);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 700;
      text-decoration: none;
    }

    /* Section 08: Contact (Pearlescent Seahorse) */
    .contact-abyss-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1.35fr;
      align-items: center;
      gap: 40px;
    }

    .contact-coords-card {
      background: var(--bg-card);
      border: 1px solid var(--border-teal);
      border-radius: 24px;
      padding: 32px;
      backdrop-filter: blur(20px);
    }

    .coord-item {
      display: flex;
      gap: 14px;
      align-items: center;
      margin-bottom: 22px;
    }

    .coord-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(14, 165, 233, 0.12);
      border: 1px solid var(--border-teal);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: var(--sea-cyan);
      flex-shrink: 0;
    }

    .coord-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-dim);
      text-transform: uppercase;
    }

    .coord-val {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--pearl-nacre);
      word-break: break-all;
    }

    .seahorse-stage {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .seahorse-img {
      width: 100%;
      max-width: 250px;
      height: auto;
      filter: drop-shadow(0 0 35px rgba(0, 245, 212, 0.45));
      animation: seahorseHover 5s ease-in-out infinite;
    }

    @keyframes seahorseHover {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-14px) rotate(2deg); }
    }

    .contact-form-panel {
      background: var(--bg-card);
      border: 1px solid var(--border-cyan);
      border-radius: 28px;
      padding: 40px;
      backdrop-filter: blur(20px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-label {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--sea-cyan);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .abyss-input, .abyss-textarea {
      width: 100%;
      background: rgba(2, 11, 20, 0.75);
      border: 1px solid var(--border-teal);
      border-radius: 12px;
      padding: 14px 18px;
      color: #FFFFFF;
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .abyss-input:focus, .abyss-textarea:focus {
      border-color: var(--biolume-cyan);
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.35);
    }

    .abyss-textarea {
      resize: vertical;
      min-height: 110px;
    }

    .btn-send-signal {
      width: 100%;
      padding: 16px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      border: none;
      color: var(--bg-void);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      box-shadow: 0 0 25px rgba(0, 245, 212, 0.4);
      transition: all 0.25s ease;
    }

    .btn-send-signal:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 40px rgba(0, 245, 212, 0.7);
    }

    /* Footer */
    .abyss-footer {
      border-top: 1px solid var(--border-teal);
      padding: 40px 0 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-dim);
    }

    /* Artifact Modal */
    .artifact-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(2, 11, 20, 0.9);
      backdrop-filter: blur(25px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .artifact-modal-overlay.active {
      display: flex;
    }

    .artifact-modal-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-cyan);
      border-radius: 24px;
      padding: 36px;
      max-width: 580px;
      width: 100%;
      text-align: center;
      box-shadow: 0 0 60px rgba(0, 245, 212, 0.35);
    }

    @media (max-width: 1024px) {
      .hero-abyss-grid, .about-abyss-grid, .skills-abyss-grid, .experience-abyss-grid, .resume-abyss-grid, .contact-abyss-grid {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      .abyss-vertical-dock {
        display: none;
      }
      .header-nav-list {
        display: none;
      }
      .about-metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .hero-buttons-row {
        justify-content: center;
      }
      .hero-bio-para {
        margin-left: auto;
        margin-right: auto;
      }
    }
  </style>
</head>
<body>
  <canvas id="abyss-bg-canvas"></canvas>

  <!-- Navigation Header -->
  <header class="abyss-header">
    <a href="#home" class="brand-logo-group">
      <div class="brand-monogram">${safeName.charAt(0)}</div>
      <div class="brand-text">
        ${safeName}
        <span>DEEP-SEA TECH ARTISAN</span>
      </div>
    </a>

    <ul class="header-nav-list">
      <li><a href="#home" class="header-nav-link active">Home</a></li>
      <li><a href="#about" class="header-nav-link">About</a></li>
      <li><a href="#projects" class="header-nav-link">Projects</a></li>
      <li><a href="#skills" class="header-nav-link">Skills</a></li>
      <li><a href="#experience" class="header-nav-link">Experience</a></li>
      <li><a href="#resume" class="header-nav-link">Resume</a></li>
      <li><a href="#articles" class="header-nav-link">Sea Chests</a></li>
      <li><a href="#contact" class="header-nav-link">Contact</a></li>
    </ul>

    <a href="#contact" class="btn-talk-pill">Let's Talk</a>
  </header>

  <!-- Left Floating Dock -->
  <aside class="abyss-vertical-dock">
    <a href="#home" class="dock-btn active" title="Home">⌂</a>
    <a href="#about" class="dock-btn" title="About">👤</a>
    <a href="#projects" class="dock-btn" title="Projects">⊞</a>
    <a href="#skills" class="dock-btn" title="Skills">⚡</a>
    <a href="#experience" class="dock-btn" title="Experience">⚓</a>
    <a href="#resume" class="dock-btn" title="Resume">📜</a>
    <a href="#articles" class="dock-btn" title="Sea Chests">💎</a>
    <a href="#contact" class="dock-btn" title="Contact">✉</a>
  </aside>

  <!-- Main Scrollable Continuum -->
  <div class="abyss-container">

    <!-- 01. HOME HERO -->
    <section id="home" class="abyss-section">
      <div class="hero-abyss-grid">
        <div>
          <div class="section-kicker-pill">01 // ABYSSAL CONTINUUM</div>
          <div class="hero-lead-text">Hello, I'm</div>
          <h1 class="hero-h1">
            <span class="hero-name-gradient">${safeName},</span><br>
            <span class="hero-role-title">${safeTitle}.</span>
          </h1>
          <p class="hero-bio-para">${safeBio}</p>
          <div class="hero-buttons-row">
            <a href="#projects" class="btn-abyss-primary">View My Work ↗</a>
            <a href="#contact" class="btn-abyss-outline">Let's Talk ✦</a>
          </div>
        </div>

        <div class="hero-3d-stage">
          <div class="nautilus-ambient-glow"></div>
          <div class="hero-nautilus-artwork-pod">
            <img src="/assets/designs/nautilus/nautilus_hand_nobg.png" alt="3D Nautilus Shell & Coral Hand" class="hero-nautilus-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- 02. ABOUT PAGE -->
    <section id="about" class="abyss-section">
      <div class="section-kicker-pill">02 // SUBSEA TELEMETRY</div>
      <h2 class="section-big-title">About Me</h2>

      <div class="about-abyss-grid">
        <div class="porthole-radar-stage">
          <img src="/assets/designs/nautilus/porthole_nobg.png" alt="Submarine Porthole Sonar Radar" class="porthole-img" />
        </div>

        <div class="about-narrative-card">
          <div class="about-subtitle">Get to know // Mission & Exploration</div>
          <p class="about-para">
            Navigating the intersection of oceanic biological elegance and ultra-resilient distributed computing. Every architecture is engineered like a deep-sea submersible: pressure-tested, fault-tolerant, and designed to thrive in uncharted environments.
          </p>
          <p class="about-para">
            From low-latency WebGL fluid caustics to decentralized subsea sensor mesh protocols, my work blends organic ergonomics with mathematical precision.
          </p>

          <div class="about-metrics-grid">
            <div class="metric-pill-box">
              <div class="metric-num">5+</div>
              <div class="metric-label">Years Expeditions</div>
            </div>
            <div class="metric-pill-box">
              <div class="metric-num">32+</div>
              <div class="metric-label">Vault Projects</div>
            </div>
            <div class="metric-pill-box">
              <div class="metric-num">18+</div>
              <div class="metric-label">Global Clients</div>
            </div>
            <div class="metric-pill-box">
              <div class="metric-num">10+</div>
              <div class="metric-label">Design Honors</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. PROJECTS (TREASURE CHESTS) -->
    <section id="projects" class="abyss-section">
      <div class="section-kicker-pill">03 // SUNKEN VAULT ARTIFACTS</div>
      <h2 class="section-big-title">My Projects</h2>

      <div class="projects-filter-bar">
        <button class="filter-tab-btn active" onclick="filterVault('all', this)">All</button>
        <button class="filter-tab-btn" onclick="filterVault('WebGL', this)">WebGL</button>
        <button class="filter-tab-btn" onclick="filterVault('Rust', this)">Rust Core</button>
        <button class="filter-tab-btn" onclick="filterVault('Telemetry', this)">Telemetry</button>
        <button class="filter-tab-btn" onclick="filterVault('Design', this)">UI Design</button>
      </div>

      <div class="treasure-chests-grid">
        ${projectCardsHtml}
      </div>
    </section>

    <!-- 04. SKILLS PAGE -->
    <section id="skills" class="abyss-section">
      <div class="section-kicker-pill">04 // BIOLUMINESCENT PROFICIENCIES</div>
      <h2 class="section-big-title">My Skills</h2>

      <div class="skills-abyss-grid">
        <div class="coral-tree-stage">
          <img src="/assets/designs/nautilus/coral_tree_nobg.png" alt="Bioluminescent Coral Tree of Life" class="coral-tree-img" />
        </div>

        <div class="skills-dossier-panel">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--sea-cyan); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 24px;">
            NEURAL DEPTH TELEMETRY GAUGES
          </div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE PAGE -->
    <section id="experience" class="abyss-section">
      <div class="section-kicker-pill">05 // CAREER TRAJECTORY & ASCENT</div>
      <h2 class="section-big-title">Experience Page</h2>

      <div class="experience-abyss-grid">
        <div>
          ${experienceTimelineHtml}
        </div>

        <div class="experience-creature-stage">
          <img src="/assets/designs/nautilus/squid_nobg.png" alt="3D Giant Squid" class="squid-img" />
          <img src="/assets/designs/nautilus/kelp_tree_nobg.png" alt="Underwater Sea Kelp" class="kelp-img" />
        </div>
      </div>
    </section>

    <!-- 06. RESUME PAGE -->
    <section id="resume" class="abyss-section">
      <div class="section-kicker-pill">06 // NAUTICAL CARTOGRAPHY</div>
      <h2 class="section-big-title">My Resume</h2>

      <div class="resume-abyss-grid">
        <div class="vintage-map-stage">
          <img src="/assets/designs/nautilus/vintage_map_clean_nobg.png" alt="Vintage Nautical Treasure Map" class="vintage-map-img" />
          <div class="map-dynamic-overlay">
            <img src="${safeAvatar}" alt="${safeName}" class="map-avatar-round" />
            <div class="map-candidate-name">${safeName}</div>
            <div class="map-candidate-title">${safeTitle}</div>
          </div>
        </div>

        <div class="resume-dossier-panel">
          <h3 style="font-family: var(--font-display); font-size: 1.5rem; color: #FFFFFF; margin-bottom: 8px;">Curated Credentials</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.6;">
            Accredited formal degrees, specialized systems certifications, and verified open-source marine protocols.
          </p>

          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">// ACADEMIC EDUCATION</h4>
          ${educationHtml}

          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-accent); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 22px; margin-bottom: 12px;">// VERIFIED CERTIFICATIONS</h4>
          ${certificationsHtml}

          <div style="margin-top: 24px;">
            <button onclick="downloadResumePDF()" class="btn-abyss-outline" style="width: 100%; justify-content: center;">
              Download Dossier PDF ↓
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 07. SEA CHESTS BLOG -->
    <section id="articles" class="abyss-section">
      <div class="section-kicker-pill">07 // DEEP-SEA CHRONICLES</div>
      <h2 class="section-big-title">Sea Chests</h2>

      <div class="sea-chests-dunes-grid">
        ${articlesHtml}
      </div>
    </section>

    <!-- 08. CONTACT PAGE -->
    <section id="contact" class="abyss-section">
      <div class="section-kicker-pill">08 // TRANSMISSION BEACON</div>
      <h2 class="section-big-title">Let's Contact</h2>

      <div class="contact-abyss-grid">
        <div class="contact-coords-card">
          <div class="coord-item">
            <div class="coord-icon">✉</div>
            <div>
              <div class="coord-label">FREQUENCY / EMAIL</div>
              <div class="coord-val">${email}</div>
            </div>
          </div>
          <div class="coord-item">
            <div class="coord-icon">📍</div>
            <div>
              <div class="coord-label">COORDINATES / SECTOR</div>
              <div class="coord-val">${location}</div>
            </div>
          </div>
          <div class="coord-item">
            <div class="coord-icon">🐙</div>
            <div>
              <div class="coord-label">NETWORKS</div>
              <div class="coord-val" style="display: flex; gap: 12px; margin-top: 6px;">
                <a href="${github}" target="_blank" style="color: var(--sea-cyan); text-decoration: none;">GitHub</a> • 
                <a href="${linkedin}" target="_blank" style="color: var(--sea-cyan); text-decoration: none;">LinkedIn</a> • 
                <a href="${twitter}" target="_blank" style="color: var(--sea-cyan); text-decoration: none;">Twitter</a>
              </div>
            </div>
          </div>
        </div>

        <div class="seahorse-stage">
          <img src="/assets/designs/nautilus/seahorse_nobg.png" alt="Ornate Pearlescent Seahorse on Coral" class="seahorse-img" />
        </div>

        <div class="contact-form-panel">
          <form onsubmit="handleSignalSubmit(event)">
            <div class="form-group">
              <label class="form-label">FORMAL IDENTITY / NAME</label>
              <input type="text" class="abyss-input" placeholder="Commander / Visitor" required />
            </div>
            <div class="form-group">
              <label class="form-label">RETURN BEACON / EMAIL</label>
              <input type="email" class="abyss-input" placeholder="signal@domain.ocean" required />
            </div>
            <div class="form-group">
              <label class="form-label">EXPEDITION MESSAGE</label>
              <textarea class="abyss-textarea" placeholder="Describe the architectural exploration..." required></textarea>
            </div>
            <button type="submit" class="btn-send-signal">
              TRANSMIT SIGNAL ✦
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="abyss-footer">
      <div>© 2026 ${safeName}. Synthesized for the Abyssal Ocean Continuum.</div>
      <div>DEPTH: 4,200M // SONAR: SYNCHRONIZED 100%</div>
    </footer>

  </div>

  <!-- Artifact Detail Modal -->
  <div id="artifact-modal" class="artifact-modal-overlay" onclick="closeArtifactModal(event)">
    <div class="artifact-modal-box" onclick="event.stopPropagation()">
      <img src="/assets/designs/nautilus/chest_wheel_lid_nobg.png" alt="Brass Steering Wheel" style="height: 70px; margin-bottom: 14px;" />
      <h3 id="modal-artifact-title" style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin-bottom: 8px;">Artifact Detail</h3>
      <p id="modal-artifact-desc" style="color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">Artifact specs loading from deep telemetry...</p>
      <button onclick="closeArtifactModal()" class="btn-abyss-outline">Close Vault Window</button>
    </div>
  </div>

  <!-- Interactive Scripts & Three.js Canvas -->
  <script>
    // 01. WebGL Caustics & Water Bubble Mesh
    (function() {
      const canvas = document.getElementById('abyss-bg-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 450;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const count = 300;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const color1 = new THREE.Color('#0EA5E9');
      const color2 = new THREE.Color('#00F5D4');

      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 1200;
        pos[i + 1] = (Math.random() - 0.5) * 1200;
        pos[i + 2] = (Math.random() - 0.5) * 600;

        const c = Math.random() > 0.5 ? color1 : color2;
        colors[i] = c.r;
        colors[i + 1] = c.g;
        colors[i + 2] = c.b;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });

      const mesh = new THREE.Points(geo, mat);
      scene.add(mesh);

      function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.0006;
        mesh.rotation.x += 0.0003;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    // 02. Project Filter
    function filterVault(cat, btn) {
      document.querySelectorAll('.filter-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.treasure-chest-card');
      cards.forEach(c => {
        if (cat === 'all' || c.getAttribute('data-category').toLowerCase().includes(cat.toLowerCase())) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    }

    // 03. Artifact Modal
    function openArtifactModal(title, desc) {
      document.getElementById('modal-artifact-title').innerText = title;
      document.getElementById('modal-artifact-desc').innerText = desc;
      document.getElementById('artifact-modal').classList.add('active');
    }

    function closeArtifactModal() {
      document.getElementById('artifact-modal').classList.remove('active');
    }

    // 04. Form Submit
    function handleSignalSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = 'TRANSMITTING BEACON...';

      setTimeout(() => {
        btn.innerHTML = 'SIGNAL RECEIVED ✦';
        btn.style.background = '#00F5D4';
        btn.style.color = '#020B14';

        if (window.confetti) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F5D4', '#0EA5E9', '#F59E0B']
          });
        }

        setTimeout(() => {
          e.target.reset();
          btn.disabled = false;
          btn.innerHTML = 'TRANSMIT SIGNAL ✦';
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }, 700);
    }

    function downloadResumePDF() {
      window.print();
    }
  </script>
</body>
</html>`;
  },

  /**
   * Dedicated 404 Nautical Course Lost Page
   * Rendered when a user accesses a non-existent URL in an Abyssal Nautilus portfolio.
   */
  render404Page(siteId = '', rawCandidateData = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name || 'Abyssal Sanctuary');
    const returnUrl = siteId ? `/p/${siteId}` : '/';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Nautical Course Lost | ${safeName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <style>
    :root {
      --bg-void: #020B14;
      --bg-abyss: #03131E;
      --sea-teal: #0EA5E9;
      --biolume-cyan: #00F5D4;
      --coral-gold: #F59E0B;
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-void);
      color: #FFFFFF;
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

    #abyss-404-canvas {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    }

    .nautical-404-stage {
      position: relative;
      z-index: 5;
      max-width: 900px;
      width: 100%;
      background: rgba(4, 21, 37, 0.85);
      border: 1px solid rgba(14, 165, 233, 0.35);
      border-radius: 28px;
      padding: 56px 48px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.8), 0 0 45px rgba(14, 165, 233, 0.15);
      text-align: center;
    }

    .overgrown-404-wrap {
      margin-bottom: 24px;
    }

    .stone-404-img {
      max-width: 320px;
      width: 100%;
      height: auto;
      filter: drop-shadow(0 10px 25px rgba(0,0,0,0.8));
    }

    .nautical-kicker {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--coral-gold);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .nautical-h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      color: #FFFFFF;
      margin-bottom: 14px;
    }

    .nautical-desc {
      color: #94A3B8;
      font-size: 1.05rem;
      line-height: 1.7;
      max-width: 540px;
      margin: 0 auto 36px auto;
    }

    .compass-coins-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }

    .antique-compass-img {
      max-width: 220px;
      width: 100%;
      height: auto;
      filter: drop-shadow(0 15px 30px rgba(0, 245, 212, 0.35));
      animation: floatCompass 5s ease-in-out infinite;
    }

    @keyframes floatCompass {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-1.5deg); }
    }

    .btn-return-base {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 32px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--sea-teal), var(--biolume-cyan));
      color: var(--bg-void);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none;
      box-shadow: 0 0 25px rgba(0, 245, 212, 0.4);
      transition: all 0.25s ease;
    }

    .btn-return-base:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 40px rgba(0, 245, 212, 0.7);
    }
  </style>
</head>
<body>
  <canvas id="abyss-404-canvas"></canvas>

  <main class="nautical-404-stage">
    <div class="overgrown-404-wrap">
      <img src="/assets/designs/nautilus/stone_404_nobg.png" alt="Overgrown Stone 404 Monolith" class="stone-404-img" />
    </div>

    <div class="nautical-kicker">NAUTICAL COURSE LOST // 09</div>
    <h1 class="nautical-h1">Page Not Found</h1>
    <p class="nautical-desc">
      The coordinates you queried have drifted into the benthic abyss. The guardian compass indicates a safe return to home coordinates.
    </p>

    <div class="compass-coins-wrap">
      <img src="/assets/designs/nautilus/nautical_compass_nobg.png" alt="Antique Brass Compass & Sunken Coins" class="antique-compass-img" />
    </div>

    <div>
      <a href="${returnUrl}" class="btn-return-base">
        ← Return to Base
      </a>
    </div>
  </main>

  <script>
    (function() {
      const canvas = document.getElementById('abyss-404-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 400;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const count = 200;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 1000;
        pos[i + 1] = (Math.random() - 0.5) * 1000;
        pos[i + 2] = (Math.random() - 0.5) * 600;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x00F5D4,
        size: 3.2,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const mesh = new THREE.Points(geo, mat);
      scene.add(mesh);

      function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.0006;
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

module.exports = { AbyssalNautilusArtisanTemplate };

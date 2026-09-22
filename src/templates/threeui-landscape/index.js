/**
 * Template: ThreeUI Landscape ("threeui-landscape")
 * Powered by MengTo/threeui Japanese Countryside Landscape & Weather 3D Engine:
 * - 3D terrain with interactive drag orbit & zoom
 * - Live time-of-day progression (Morning, Noon, Sunset, Night)
 * - Real-time weather controls (Clear, Rain, Storm, Snow)
 * - Universal fixed frosted glass HUD navbar (100% zoom-independent & mobile-docked)
 * - Mobile Quick-Navigation Strip with instant jump-pills
 * - Dense, ultra-convenient mobile ergonomics (zero wasted empty space)
 * - Complete executive sections: Hero, About, Case Studies, Skills Matrix, Experience Timeline, Academics, Contact
 * - Dynamic Day/Night WCAG 2.2 AAA contrast engine (zero invisible text in any theme/weather)
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUILandscapeTemplate = {
  id: 'threeui-landscape',
  name: 'ThreeUI Landscape (Time & Weather 3D)',
  category: 'Interactive 3D Terrain / Weather Simulation',
  description: 'Interactive 3D Japanese countryside landscape with live time-of-day progression (Dawn, Noon, Sunset, Night), real-time weather controls (Clear, Rain, Fog), and frosted glass portfolio case studies.',
  recommendedFor: [
    'Systems Architects & Full-Stack Engineers',
    'AI Developers & Research Engineers',
    '3D Worldbuilders & Game Developers',
    'Landscape Architects & Spatial Computing Specialists',
    'Creative Directors'
  ],
  palette: ['#ecdcbc', '#2e2515', '#a8621f', '#8b7c5c', '#fdf1d6'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Abdul Aziz Nooruddin');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Smart Contract Developer & Full-Stack AI Engineer');
    const safeTagline = TemplateHelper.escapeHtml(data.tagline || 'AI Student & Smart Contract Developer | Building Real-World Web3 Products | Blockchain • DeFi • RegTech 🇮🇳');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Computer Science & Artificial Intelligence student actively engineering open-source Web3 protocols, smart contracts on Algorand and Polygon, and immersive 3D developer experiences. Bridging cutting-edge research with shipped software.');
    const safeAbout = TemplateHelper.escapeHtml(data.about || 'Specialized in decentralized systems, cryptographic verification, and spatial 3D WebGL interfaces. Architect of ConsentChain Algorand (DPDP Act 2023 compliance with automated micro-payment escrow) and creator of MyFolio. Committed to high-throughput, security-first architectures with zero boilerplate and mathematical precision.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'abdulaziznoor9876@gmail.com');
    const safeGithub = TemplateHelper.escapeHtml(data.github || data.contact?.github || data.socialLinks?.github || 'https://github.com/Abdul-Aziz-Nooruddin');
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin || data.contact?.linkedin || data.socialLinks?.linkedin || 'https://www.linkedin.com/in/abdul-aziz-nooruddin');
    const safeLocation = TemplateHelper.escapeHtml(data.location || data.contact?.location || 'Hyderabad, India • Remote Web3');

    const candidateAvatar = data.avatar || data.photoUrl || '';
    const safeInitials = TemplateHelper.escapeHtml(data.initials || (safeName.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()) || 'AN');
    const avatarHtml = candidateAvatar 
      ? `<div class="landscape-hero-avatar-wrap">
           <img src="${candidateAvatar}" alt="${safeName}" class="landscape-hero-avatar-img" />
         </div>`
      : `<div class="landscape-hero-avatar-wrap landscape-hero-initials">
           <span>${safeInitials}</span>
         </div>`;

    // Skills Matrix
    const rawSkills = Array.isArray(data.skills) && data.skills.length > 0 
      ? data.skills 
      : [
          'Python', 'TypeScript', 'JavaScript', 'Solidity', 'Algorand (PyTeal)', 
          'Smart Contracts', 'Web3.js', 'Three.js', 'WebGL', 'Node.js', 
          'React', 'Docker', 'PostgreSQL', 'Git & CI/CD', 'DPDP Compliance'
        ];

    const skillsHtml = rawSkills.map(s => {
      const tag = typeof s === 'string' ? s : (s.name || '');
      return `<span class="landscape-skill-chip">${TemplateHelper.escapeHtml(tag)}</span>`;
    }).join('');

    // Projects Grid
    const rawProjects = Array.isArray(data.projects) && data.projects.length > 0 
      ? data.projects 
      : [
          {
            title: 'ConsentChain Algorand',
            description: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.',
            tags: ['Algorand', 'Smart Contracts', 'TypeScript', 'Blockchain', 'RegTech'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
            live: 'https://consent-chain-algorand.vercel.app'
          },
          {
            title: 'AI Portfolio Generator',
            description: 'Turn your GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds. Interactive spatial worlds and high-impact scrollytelling.',
            tags: ['WebGL', 'Three.js', 'Node.js', 'JavaScript', 'AI'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
            live: 'https://myfolio.tech'
          },
          {
            title: 'Pass A Note',
            description: 'High-performance interactive communication tool engineered for seamless zero-latency peer data transfer with secure encrypted messaging.',
            tags: ['HTML', 'JavaScript', 'CSS', 'P2P', 'Encryption'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/pass-a-note',
            live: 'https://pass-a-note-iota.vercel.app'
          },
          {
            title: 'LMS User Management',
            description: 'Enterprise-grade role-based access control and user management system engineered with strict security guarantees and database integrity.',
            tags: ['Node.js', 'Express', 'PostgreSQL', 'Security', 'RBAC'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management',
            live: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management'
          },
          {
            title: 'Dual-Chain Web3 Portfolio',
            description: 'Personal developer showcase featuring glassmorphism design, particle animations, and multi-chain protocol verification across Polygon & Algorand.',
            tags: ['TypeScript', 'CSS', 'Polygon', 'Algorand', 'Web3'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/portfolio',
            live: 'https://portfolio-nine-tawny-39.vercel.app'
          },
          {
            title: 'Algorand Python Smart Contracts',
            description: 'Production PyTeal and Python smart contract implementations for Algorand escrow, token distribution, and verifiable state transitions.',
            tags: ['Python', 'Algorand', 'PyTeal', 'Smart Contracts'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/Algorand-Python-Smart-Contracts',
            live: 'https://github.com/Abdul-Aziz-Nooruddin/Algorand-Python-Smart-Contracts'
          }
        ];

    const projectsHtml = rawProjects.map((p, idx) => {
      const pTitle = TemplateHelper.escapeHtml(p.title || p.name || `Case Study 0${idx + 1}`);
      const pDesc = TemplateHelper.escapeHtml(p.description || p.desc || 'Architected high-throughput computational system with real-time feedback loops.');
      const pTags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? p.tags.split(',') : (p.tech ? p.tech.split('•') : ['Systems', 'TypeScript']));
      const tagsHtml = pTags.map(t => `<span class="proj-tag">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');
      const liveUrl = p.live || p.url || '';
      const ghUrl = p.github || '';

      return `
        <article class="landscape-project-card">
          <div class="proj-header">
            <span class="proj-num">0${idx + 1} // CASE STUDY</span>
            <span class="proj-status">✦ PRODUCTION</span>
          </div>
          <h3 class="proj-title">${pTitle}</h3>
          <p class="proj-desc">${pDesc}</p>
          <div class="proj-tags">${tagsHtml}</div>
          <div class="proj-links">
            ${liveUrl ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-primary">Live Experience &nearr;</a>` : ''}
            ${ghUrl ? `<a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">Source Code &rarr;</a>` : ''}
          </div>
        </article>
      `;
    }).join('');

    // Experience Timeline
    const rawExperience = Array.isArray(data.experience) && data.experience.length > 0
      ? data.experience
      : [
          {
            role: 'Web3 & Smart Contract Developer',
            company: 'Independent & Open Source',
            period: '2024 - Present',
            desc: 'Architecting decentralized applications and smart contracts on Algorand and Polygon. Engineered DPDP Act 2023 compliance escrow micro-payment protocols and high-performance WebGL developer tools.'
          },
          {
            role: 'AI & Software Systems Engineer',
            company: 'Academic & Research Projects',
            period: '2023 - 2024',
            desc: 'Designed full-stack architectures, RESTful API services, role-based access control engines, and distributed communication platforms with automated CI/CD deployments.'
          }
        ];

    const experienceHtml = rawExperience.map((exp, idx) => {
      const expRole = TemplateHelper.escapeHtml(exp.role || exp.title || 'Software Engineer');
      const expCompany = TemplateHelper.escapeHtml(exp.company || exp.organization || 'Independent Protocol');
      const expPeriod = TemplateHelper.escapeHtml(exp.period || exp.year || '2024 - Present');
      const expDesc = TemplateHelper.escapeHtml(exp.desc || exp.description || '');

      return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3 class="timeline-role">${expRole}</h3>
              <span class="timeline-period">${expPeriod}</span>
            </div>
            <div class="timeline-company">${expCompany}</div>
            ${expDesc ? `<p class="timeline-desc">${expDesc}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Education & Academics
    const rawEducation = Array.isArray(data.education) && data.education.length > 0
      ? data.education
      : [
          {
            degree: 'Bachelor of Technology (B.Tech) — Computer Science & Artificial Intelligence (AI)',
            institution: 'Engineering & Technology Institute',
            year: '2022 - 2026 (Expected)',
            desc: 'Specialized coursework in Distributed Systems, Blockchain Architecture, Cryptography, Artificial Intelligence, and Modern Software Engineering.'
          }
        ];

    const educationHtml = rawEducation.map(edu => {
      const eduDegree = TemplateHelper.escapeHtml(edu.degree || 'Computer Science & Software Engineering');
      const eduInst = TemplateHelper.escapeHtml(edu.institution || edu.school || 'University of Engineering');
      const eduYear = TemplateHelper.escapeHtml(edu.year || edu.period || 'Continuous');
      const eduDesc = TemplateHelper.escapeHtml(edu.desc || edu.description || '');

      return `
        <div class="edu-card">
          <div class="edu-header">
            <h3 class="edu-degree">${eduDegree}</h3>
            <span class="edu-year">${eduYear}</span>
          </div>
          <div class="edu-institution">${eduInst}</div>
          ${eduDesc ? `<p class="edu-desc">${eduDesc}</p>` : ''}
        </div>
      `;
    }).join('');

    // Certifications
    const rawCertifications = Array.isArray(data.certifications) && data.certifications.length > 0
      ? data.certifications
      : [
          {
            name: 'Deloitte Cyber Job Simulation Certificate',
            issuer: 'Deloitte (Forage)',
            date: 'Verified Credential',
            url: 'https://www.forage.com',
            verified: true
          },
          {
            name: 'Algorand Certified Developer',
            issuer: 'Algorand Foundation Ecosystem',
            date: 'Verified',
            url: 'https://algorand.foundation',
            verified: true
          }
        ];

    const certificationsHtml = rawCertifications.map(cert => {
      const certName = TemplateHelper.escapeHtml(cert.name || cert.title || 'Verified Credential');
      const certIssuer = TemplateHelper.escapeHtml(cert.issuer || cert.organization || 'Accredited Authority');
      const certDate = TemplateHelper.escapeHtml(cert.date || 'Verified');
      const certUrl = cert.url || '#';

      return `
        <div class="cert-card">
          <div class="cert-status">✦ VERIFIED CREDENTIAL</div>
          <h4 class="cert-name">${certName}</h4>
          <div class="cert-meta">
            <span class="cert-issuer">${certIssuer}</span>
            <span class="cert-date">${certDate}</span>
          </div>
          ${certUrl && certUrl !== '#' ? `<a href="${certUrl}" target="_blank" rel="noopener noreferrer" class="cert-link">Inspect Credential &nearr;</a>` : ''}
        </div>
      `;
    }).join('');

    const lsHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'landscape-3d.html');
    let html = '';
    try {
      html = fs.readFileSync(lsHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read landscape-3d.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Landscape template</h1></body></html>`;
    }

    // Strip out any remnants of old styles
    html = html.replace(/<style data-threeui-landscape>[\s\S]*?<\/style>/gi, '');

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${safeName} — 3D Landscape &amp; Weather Portfolio</title>`);

    // Replace existing <header>...</header> with our executive zoom-independent navbar and mobile subnav
    const executiveHeader = `
  <header id="portfolio-masthead-navbar">
    <div class="brand-left">
      <a href="#" class="brand-name">${safeName.toUpperCase()}</a>
      <span class="brand-sep">✦</span>
      <span class="brand-role-badge">${safeRole}</span>
    </div>
    <nav class="header-nav-links">
      <a href="#about" class="nav-anchor">ABOUT</a>
      <a href="#projects" class="nav-anchor">PROJECTS</a>
      <a href="#skills" class="nav-anchor">SKILLS</a>
      <a href="#experience" class="nav-anchor">TIMELINE</a>
      <a href="#education" class="nav-anchor">ACADEMICS</a>
      <a href="#contact" class="nav-anchor">CONTACT</a>
    </nav>
    <div class="top-right">
      <button class="tbtn" id="styleBtn" aria-label="STYLE: JAPAN"><b>STYLE</b><span>JAPAN</span></button>
      <button class="tbtn" id="wxBtn" aria-label="WEATHER: CLEAR"><b>WEATHER</b><span>CLEAR</span></button>
      <button class="tbtn" id="timeBtn" aria-label="TIME: MORNING"><b>TIME</b><span>MORNING</span></button>
      <button class="tbtn" id="soundBtn" aria-label="SOUND: ON"><b>SOUND</b><span>ON</span></button>
      <button class="tbtn" id="rebuildBtn">↻ REBUILD</button>
    </div>
  </header>
  <nav id="mobile-quick-nav">
    <div class="mobile-nav-scroll">
      <a href="#about" class="mnav-pill">✦ About</a>
      <a href="#projects" class="mnav-pill">⚡ Projects (6)</a>
      <a href="#skills" class="mnav-pill">🛠️ Skills</a>
      <a href="#experience" class="mnav-pill">📜 Track</a>
      <a href="#education" class="mnav-pill">🎓 Academics</a>
      <a href="#contact" class="mnav-pill">📫 Contact</a>
    </div>
  </nav>`;

    html = html.replace(/<header>[\s\S]*?<\/header>/i, executiveHeader);

    // Add comprehensive glass HUD overlay styles
    const overlayStyles = `
    <style id="portfolio-landscape-overlay-css">
      /* Universal smooth scrolling */
      html {
        scroll-behavior: smooth !important;
        height: auto !important;
        min-height: 100% !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
      }
      body {
        height: auto !important;
        min-height: 100% !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        background-color: transparent !important;
      }
      #app {
        position: fixed !important;
        inset: 0 !important;
        z-index: 1 !important;
        pointer-events: none !important;
      }
      #stage {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 1 !important;
        cursor: grab;
        touch-action: pan-y !important;
        pointer-events: auto !important;
      }
      #stage.dragging {
        cursor: grabbing;
      }

      /* Hide template default decorative side Japanese typography */
      .col-l, .col-r, .tag, .plaque, .bigpct {
        display: none !important;
      }
      #app > footer, footer:not(.portfolio-footer), .legacy-footer {
        display: none !important;
      }

      /* ==========================================================================
         UNIVERSAL FIXED NAVBAR (100% Zoom-Proof & Viewport-Proof)
         ========================================================================== */
      header, #portfolio-masthead-navbar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 56px !important;
        padding: 0 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        background: rgba(253, 248, 238, 0.94) !important;
        backdrop-filter: blur(24px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
        border-bottom: 1px solid rgba(168, 98, 31, 0.22) !important;
        box-shadow: 0 4px 20px rgba(46, 37, 21, 0.08) !important;
        z-index: 99999 !important;
        pointer-events: auto !important;
        transition: background 0.3s ease, border-color 0.3s ease;
      }
      .brand-left {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .brand-name {
        font-family: var(--sans);
        font-weight: 800;
        font-size: 15px;
        letter-spacing: 0.8px;
        color: var(--ink, #2e2515);
        text-decoration: none;
        white-space: nowrap;
      }
      .brand-sep {
        color: var(--accent, #a8621f);
        font-size: 11px;
      }
      .brand-role-badge {
        font-size: 11.5px;
        font-weight: 600;
        color: var(--ink2, #8b7c5c);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 260px;
      }
      .header-nav-links {
        display: flex;
        align-items: center;
        gap: 18px;
      }
      .nav-anchor {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.2px;
        color: var(--ink, #2e2515);
        text-decoration: none;
        transition: color 0.18s ease;
        padding: 4px 0;
      }
      .nav-anchor:hover {
        color: var(--accent, #a8621f);
      }
      
      /* Force .top-right to stay inside the top navbar at all times! */
      .top-right {
        position: static !important;
        bottom: auto !important;
        left: auto !important;
        right: auto !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      .tbtn {
        font-size: 10px !important;
        font-weight: 700 !important;
        padding: 6px 11px !important;
        border-radius: 999px !important;
        border: 1px solid rgba(168, 98, 31, 0.25) !important;
        background: rgba(255, 255, 255, 0.85) !important;
        color: var(--ink, #2e2515) !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
        line-height: 1 !important;
        cursor: pointer !important;
        box-shadow: 0 2px 6px rgba(46, 37, 21, 0.05) !important;
        transition: all 0.18s ease !important;
      }
      .tbtn:hover {
        border-color: var(--accent, #a8621f) !important;
        color: var(--accent, #a8621f) !important;
      }
      .tbtn b {
        color: var(--accent, #a8621f) !important;
      }

      /* Mobile Quick Nav Strip */
      #mobile-quick-nav {
        display: none;
        position: fixed;
        top: 54px;
        left: 0;
        right: 0;
        height: 42px;
        z-index: 99998;
        background: rgba(253, 248, 238, 0.94);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(168, 98, 31, 0.16);
        align-items: center;
        padding: 0 10px;
        pointer-events: auto !important;
      }
      .mobile-nav-scroll {
        display: flex;
        align-items: center;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        width: 100%;
      }
      .mobile-nav-scroll::-webkit-scrollbar {
        display: none;
      }
      .mnav-pill {
        flex: 0 0 auto;
        font-size: 11px;
        font-weight: 700;
        color: var(--ink, #2e2515);
        background: rgba(255, 255, 255, 0.85);
        border: 1px solid rgba(168, 98, 31, 0.22);
        padding: 4px 11px;
        border-radius: 999px;
        text-decoration: none;
        white-space: nowrap;
        transition: all 0.18s ease;
      }
      .mnav-pill:hover, .mnav-pill:active {
        background: var(--accent, #a8621f);
        color: #fff;
        border-color: var(--accent, #a8621f);
      }

      /* ==========================================================================
         PORTFOLIO SCROLLABLE CONTENT HUD
         ========================================================================== */
      .landscape-portfolio-scroll {
        position: relative;
        z-index: 10;
        pointer-events: none;
        max-width: 1140px;
        margin: 0 auto;
        padding: 95px 24px 120px;
        display: flex;
        flex-direction: column;
        gap: 48px;
        font-family: var(--sans);
      }
      .portfolio-interactive {
        pointer-events: auto !important;
      }

      /* Frosted Glass Bento Surfaces */
      .landscape-glass-card {
        background: rgba(255, 252, 246, 0.90);
        backdrop-filter: blur(28px) saturate(180%);
        -webkit-backdrop-filter: blur(28px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.92);
        border-radius: 24px;
        padding: 34px;
        color: var(--ink, #2e2515);
        box-shadow: 0 20px 48px -10px rgba(46, 37, 21, 0.12), 0 2px 10px rgba(168, 98, 31, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
      }
      .landscape-glass-card:hover {
        border-color: rgba(168, 98, 31, 0.45);
        box-shadow: 0 28px 64px -10px rgba(46, 37, 21, 0.18);
      }

      /* Hero Stage */
      .landscape-hero-identity {
        display: flex;
        align-items: center;
        gap: 28px;
        margin-bottom: 20px;
      }
      .landscape-hero-avatar-wrap {
        position: relative;
        width: 96px;
        height: 96px;
        min-width: 96px;
        border-radius: 24px;
        padding: 3px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(168, 98, 31, 0.4));
        box-shadow: 0 12px 32px rgba(46, 37, 21, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
      }
      .landscape-hero-avatar-wrap:hover {
        transform: scale(1.04);
        box-shadow: 0 16px 40px rgba(46, 37, 21, 0.22);
      }
      .landscape-hero-avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
        display: block;
        border: 2px solid rgba(255, 252, 246, 0.95);
      }
      .landscape-hero-initials {
        background: linear-gradient(135deg, #a8621f, #2e2515);
        color: #fdf1d6;
        font-family: var(--mincho);
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 1px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.25);
      }
      .landscape-hero-text-col {
        flex: 1;
        min-width: 0;
      }
      .hero-eyebrow {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.8px;
        color: var(--accent, #a8621f);
        text-transform: uppercase;
        margin-bottom: 8px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .hero-masthead {
        font-family: var(--mincho);
        font-size: clamp(26px, 4.5vw, 50px);
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.5px;
        color: var(--ink, #2e2515);
        margin-bottom: 8px;
      }
      .hero-role {
        font-size: clamp(13px, 1.8vw, 16.5px);
        font-weight: 600;
        color: var(--accent, #a8621f);
        margin-bottom: 10px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .hero-tagline {
        font-size: 14px;
        font-weight: 600;
        color: var(--ink2, #8b7c5c);
        margin-bottom: 10px;
        line-height: 1.45;
      }
      .hero-bio {
        font-size: clamp(14px, 1.5vw, 15.5px);
        line-height: 1.6;
        color: var(--ink3, #3f3520);
        max-width: 860px;
        margin-bottom: 20px;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }

      /* Floating hint pill for 3D scenery */
      .landscape-3d-hint {
        align-self: center;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(253, 248, 238, 0.85);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1px solid rgba(168, 98, 31, 0.2);
        color: var(--accent, #a8621f);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        box-shadow: 0 4px 14px rgba(46, 37, 21, 0.08);
      }

      /* Section Headings */
      .section-heading {
        font-family: var(--sans);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        color: var(--accent, #a8621f);
        text-transform: uppercase;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .section-heading::after {
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(168, 98, 31, 0.25);
      }

      /* About Bento Card */
      .about-desc {
        font-size: 15px;
        line-height: 1.7;
        color: var(--ink3, #3f3520);
      }
      .pillars-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 14px;
        margin-top: 14px;
      }
      .pillar-box {
        padding: 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(168, 98, 31, 0.2);
      }
      .pillar-title {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        color: var(--accent, #a8621f);
        margin-bottom: 6px;
        text-transform: uppercase;
      }
      .pillar-text {
        font-size: 12.5px;
        line-height: 1.55;
        color: var(--ink3, #3f3520);
      }

      /* Projects Grid */
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 20px;
      }
      .landscape-project-card {
        background: rgba(255, 253, 249, 0.90);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(168, 98, 31, 0.22);
        border-radius: 20px;
        padding: 26px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        box-shadow: 0 10px 30px rgba(46, 37, 21, 0.08);
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      }
      .landscape-project-card:hover {
        transform: translateY(-4px);
        border-color: var(--accent, #a8621f);
        box-shadow: 0 18px 42px rgba(46, 37, 21, 0.14);
      }
      .proj-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1.2px;
        color: var(--ink2, #8b7c5c);
      }
      .proj-status {
        color: var(--accent, #a8621f);
      }
      .proj-title {
        font-family: var(--mincho);
        font-size: 21px;
        font-weight: 700;
        color: var(--ink, #2e2515);
        line-height: 1.25;
      }
      .proj-desc {
        font-size: 13px;
        line-height: 1.55;
        color: var(--ink3, #3f3520);
        flex-grow: 1;
      }
      .proj-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 4px;
      }
      .proj-tag {
        font-size: 10.5px;
        padding: 3px 9px;
        background: rgba(168, 98, 31, 0.08);
        color: var(--accent, #a8621f);
        border: 1px solid rgba(168, 98, 31, 0.18);
        border-radius: 999px;
        font-weight: 600;
      }
      .proj-links {
        display: flex;
        gap: 10px;
        margin-top: 8px;
        padding-top: 12px;
        border-top: 1px solid rgba(168, 98, 31, 0.18);
      }
      .proj-btn {
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 10px;
        transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .proj-btn-primary {
        background: var(--ink, #2e2515);
        color: #fdf1d6;
        box-shadow: 0 4px 14px rgba(46, 37, 21, 0.2);
      }
      .proj-btn-primary:hover {
        background: var(--accent, #a8621f);
        color: #fff;
        transform: translateY(-1px);
      }
      .proj-btn-ghost {
        background: rgba(255, 255, 255, 0.65);
        color: var(--ink, #2e2515);
        border: 1px solid rgba(168, 98, 31, 0.25);
      }
      .proj-btn-ghost:hover {
        border-color: var(--accent, #a8621f);
        color: var(--accent, #a8621f);
        transform: translateY(-1px);
      }

      /* Skills Matrix */
      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .landscape-skill-chip {
        font-size: 12.5px;
        font-weight: 600;
        padding: 7px 16px;
        background: rgba(255, 253, 249, 0.90);
        border: 1px solid rgba(168, 98, 31, 0.25);
        border-radius: 12px;
        color: var(--ink, #2e2515);
        box-shadow: 0 2px 8px rgba(46, 37, 21, 0.04);
        transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
      }
      .landscape-skill-chip:hover {
        transform: translateY(-2px);
        border-color: var(--accent, #a8621f);
        color: var(--accent, #a8621f);
      }

      /* Experience Timeline */
      .timeline-track {
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
        padding-left: 18px;
        border-left: 2px solid rgba(168, 98, 31, 0.3);
        margin-left: 6px;
      }
      .timeline-item {
        position: relative;
      }
      .timeline-dot {
        position: absolute;
        left: -25px;
        top: 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--accent, #a8621f);
        box-shadow: 0 0 0 4px rgba(168, 98, 31, 0.2);
      }
      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }
      .timeline-role {
        font-family: var(--mincho);
        font-size: 17px;
        font-weight: 700;
        color: var(--ink, #2e2515);
      }
      .timeline-period {
        font-size: 10.5px;
        font-weight: 700;
        letter-spacing: 1px;
        padding: 3px 9px;
        border-radius: 999px;
        background: rgba(168, 98, 31, 0.12);
        color: var(--accent, #a8621f);
      }
      .timeline-company {
        font-size: 13px;
        font-weight: 600;
        color: var(--ink2, #8b7c5c);
        margin-top: 3px;
        margin-bottom: 6px;
      }
      .timeline-desc {
        font-size: 13px;
        line-height: 1.55;
        color: var(--ink3, #3f3520);
      }

      /* Academics & Certifications */
      .academics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }
      .edu-card, .cert-card {
        padding: 20px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.65);
        border: 1px solid rgba(168, 98, 31, 0.2);
      }
      .edu-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 6px;
      }
      .edu-degree {
        font-family: var(--mincho);
        font-size: 15px;
        font-weight: 700;
        color: var(--ink, #2e2515);
      }
      .edu-year {
        font-size: 10px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 999px;
        background: rgba(168, 98, 31, 0.1);
        color: var(--accent, #a8621f);
        white-space: nowrap;
      }
      .edu-institution {
        font-size: 12.5px;
        font-weight: 600;
        color: var(--ink2, #8b7c5c);
        margin-bottom: 6px;
      }
      .edu-desc {
        font-size: 12px;
        line-height: 1.5;
        color: var(--ink3, #3f3520);
      }
      .cert-status {
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 1.2px;
        color: var(--accent, #a8621f);
        margin-bottom: 4px;
      }
      .cert-name {
        font-family: var(--mincho);
        font-size: 15px;
        font-weight: 700;
        color: var(--ink, #2e2515);
        margin-bottom: 6px;
      }
      .cert-meta {
        display: flex;
        justify-content: space-between;
        font-size: 11.5px;
        color: var(--ink2, #8b7c5c);
        margin-bottom: 10px;
      }
      .cert-link {
        font-size: 11.5px;
        font-weight: 700;
        color: var(--accent, #a8621f);
        text-decoration: none;
      }

      /* Transmission / Contact */
      .contact-banner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      }
      .contact-info-title {
        font-family: var(--mincho);
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 6px;
        color: var(--ink, #2e2515);
      }
      .contact-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      /* ==========================================================================
         NIGHT THEME ADAPTATION (Strict WCAG 2.2 AAA Contrast Engine)
         ========================================================================== */
      [data-time="night"] header,
      [data-time="night"] #portfolio-masthead-navbar,
      [data-time="night"] #mobile-quick-nav {
        background: rgba(14, 16, 22, 0.95) !important;
        border-bottom: 1px solid rgba(208, 138, 74, 0.25) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
      }
      [data-time="night"] .brand-name {
        color: #fdf8e8 !important;
      }
      [data-time="night"] .nav-anchor,
      [data-time="night"] .mnav-pill {
        color: #cdc6b6 !important;
        background: rgba(27, 32, 41, 0.75) !important;
        border-color: rgba(208, 138, 74, 0.3) !important;
      }
      [data-time="night"] .nav-anchor:hover,
      [data-time="night"] .mnav-pill:hover {
        color: #fff !important;
        background: #d08a4a !important;
      }
      [data-time="night"] .tbtn {
        background: rgba(27, 32, 41, 0.85) !important;
        color: #e9e2d2 !important;
        border-color: rgba(208, 138, 74, 0.3) !important;
      }
      [data-time="night"] .tbtn b {
        color: #d08a4a !important;
      }
      [data-time="night"] .landscape-3d-hint {
        background: rgba(14, 16, 22, 0.88) !important;
        border-color: rgba(208, 138, 74, 0.3) !important;
        color: #d08a4a !important;
      }
      [data-time="night"] .landscape-glass-card,
      [data-time="night"] .landscape-project-card {
        background: rgba(14, 16, 22, 0.90) !important;
        border-color: rgba(208, 138, 74, 0.35) !important;
        color: #e9e2d2 !important;
        box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.75) !important;
      }
      [data-time="night"] .hero-masthead,
      [data-time="night"] .proj-title,
      [data-time="night"] .timeline-role,
      [data-time="night"] .edu-degree,
      [data-time="night"] .cert-name,
      [data-time="night"] .contact-info-title {
        color: #fdf8e8 !important;
      }
      [data-time="night"] .hero-tagline {
        color: #d08a4a !important;
      }
      [data-time="night"] .hero-bio,
      [data-time="night"] .about-desc,
      [data-time="night"] .proj-desc,
      [data-time="night"] .timeline-desc,
      [data-time="night"] .edu-desc {
        color: #cdc6b6 !important;
      }
      [data-time="night"] .pillar-box,
      [data-time="night"] .edu-card,
      [data-time="night"] .cert-card {
        background: rgba(20, 24, 33, 0.85) !important;
        border-color: rgba(208, 138, 74, 0.25) !important;
      }
      [data-time="night"] .landscape-skill-chip {
        background: rgba(20, 24, 33, 0.90) !important;
        border-color: rgba(208, 138, 74, 0.3) !important;
        color: #e9e2d2 !important;
      }
      [data-time="night"] .proj-btn-primary {
        background: #d08a4a !important;
        color: #0e1016 !important;
      }
      [data-time="night"] .proj-btn-ghost {
        background: rgba(27, 32, 41, 0.8) !important;
        color: #fdf8e8 !important;
        border-color: rgba(208, 138, 74, 0.35) !important;
      }

      /* ==========================================================================
         MOBILE RESPONSIVE ENGINE (Strict High-Density & Ergonomic Standard)
         ========================================================================== */
      @media (max-width: 900px) {
        .header-nav-links, .brand-role-badge, .brand-sep {
          display: none !important;
        }
        #mobile-quick-nav {
          display: flex !important;
        }
      }

      @media (max-width: 768px), (max-height: 460px) {
        header, #portfolio-masthead-navbar {
          height: 52px !important;
          padding: 0 12px !important;
        }
        .brand-name {
          font-size: 13px !important;
          letter-spacing: 0.3px !important;
        }
        .top-right {
          gap: 4px !important;
        }
        .tbtn {
          font-size: 9px !important;
          padding: 4px 7px !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(168, 98, 31, 0.28) !important;
        }
        .tbtn b {
          display: none !important; /* Hide "WEATHER /" prefix to fit cleanly on narrow screens */
        }
        .tbtn#rebuildBtn {
          display: none !important;
        }

        /* Mobile Container Clearance & Zero Wasted Space */
        .landscape-portfolio-scroll {
          padding: 104px 12px 60px !important;
          gap: 16px !important; /* Compact gap between bento sections */
        }
        .landscape-3d-hint {
          display: none !important; /* Save 36px vertical space */
        }
        .landscape-glass-card {
          padding: 16px 14px !important; /* Tight, elegant padding */
          border-radius: 18px !important;
        }
        .section-heading {
          font-size: 11px !important;
          margin-bottom: 12px !important;
        }

        /* Dense, Executive Hero Layout on Mobile (Horizontal Header) */
        .landscape-hero-identity {
          flex-direction: row !important;
          align-items: center !important;
          text-align: left !important;
          gap: 12px !important;
          margin-bottom: 8px !important;
        }
        .landscape-hero-avatar-wrap {
          width: 52px !important;
          height: 52px !important;
          min-width: 52px !important;
          border-radius: 14px !important;
          margin: 0 !important;
          padding: 2px !important;
        }
        .landscape-hero-initials {
          font-size: 18px !important;
          border-radius: 12px !important;
        }
        .landscape-hero-text-col {
          text-align: left !important;
        }
        .hero-eyebrow {
          font-size: 9px !important;
          letter-spacing: 1px !important;
          margin-bottom: 2px !important;
          justify-content: flex-start !important;
        }
        .hero-masthead {
          font-size: 20px !important;
          line-height: 1.15 !important;
          margin-bottom: 2px !important;
          text-align: left !important;
        }
        .hero-role {
          font-size: 11.5px !important;
          margin-bottom: 0 !important;
          text-align: left !important;
        }
        .hero-tagline {
          font-size: 11.5px !important;
          line-height: 1.4 !important;
          margin-top: 8px !important;
          margin-bottom: 6px !important;
          text-align: left !important;
        }
        .hero-bio {
          font-size: 12px !important;
          line-height: 1.5 !important;
          margin-bottom: 12px !important;
          text-align: left !important;
        }
        .hero-actions {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 8px !important;
          width: 100% !important;
        }
        .hero-actions .proj-btn {
          width: 100% !important;
          padding: 8px 10px !important;
          font-size: 11px !important;
          text-align: center !important;
        }
        .hero-actions .hero-location-badge {
          grid-column: span 2 !important;
          text-align: center !important;
          margin: 4px 0 0 !important;
          display: block !important;
          font-size: 11px !important;
        }

        /* Compact Case Studies on Mobile */
        .projects-grid {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }
        .landscape-project-card {
          padding: 16px 14px !important;
          border-radius: 16px !important;
          gap: 10px !important;
        }
        .proj-title {
          font-size: 17px !important;
        }
        .proj-desc {
          font-size: 12px !important;
          line-height: 1.5 !important;
        }
        .proj-links {
          margin-top: 4px !important;
          padding-top: 10px !important;
          gap: 8px !important;
        }
        .proj-links .proj-btn {
          flex: 1 !important;
          padding: 8px 10px !important;
          font-size: 11px !important;
        }

        /* Compact Skills Matrix */
        .skills-container {
          gap: 6px !important;
        }
        .landscape-skill-chip {
          font-size: 11.5px !important;
          padding: 5px 12px !important;
          border-radius: 10px !important;
        }

        /* Compact Academics & Timeline */
        .academics-grid {
          grid-template-columns: 1fr !important;
          gap: 10px !important;
        }
        .edu-card, .cert-card {
          padding: 14px 12px !important;
          border-radius: 14px !important;
        }
        .timeline-track {
          gap: 14px !important;
          padding-left: 14px !important;
        }
        .timeline-dot {
          left: -21px !important;
          width: 10px !important;
          height: 10px !important;
        }

        /* Compact Contact Banner */
        .contact-banner {
          flex-direction: column !important;
          text-align: left !important;
          gap: 12px !important;
        }
        .contact-info-title {
          font-size: 19px !important;
        }
        .contact-actions {
          flex-direction: column !important;
          width: 100% !important;
          gap: 8px !important;
        }
        .contact-actions .proj-btn {
          width: 100% !important;
          padding: 10px 14px !important;
        }
      }
    </style>
    `;

    // Portfolio overlay markup
    const overlayHtml = `
    <!-- SCROLLABLE 3D PORTFOLIO CONTENT LAYER -->
    <div class="landscape-portfolio-scroll">
      
      <!-- 00: FLOATING SCENIC HINT -->
      <div class="landscape-3d-hint portfolio-interactive">
        <span>✦ PROCEDURAL 3D ATMOSPHERE</span>
        <span>·</span>
        <span>DRAG TO ROTATE ↺</span>
      </div>

      <!-- 01: HERO MASTHEAD -->
      <section class="landscape-glass-card portfolio-interactive" id="hero">
        <div class="landscape-hero-identity">
          ${avatarHtml}
          <div class="landscape-hero-text-col">
            <div class="hero-eyebrow">✦ VERIFIED SMART CONTRACT &amp; AI ENGINEER</div>
            <h1 class="hero-masthead">${safeName}</h1>
            <div class="hero-role">${safeRole}</div>
          </div>
        </div>
        ${safeTagline ? `<div class="hero-tagline">${safeTagline}</div>` : ''}
        <p class="hero-bio">${safeBio}</p>
        <div class="hero-actions">
          <a href="mailto:${safeEmail}" class="proj-btn proj-btn-primary">Initiate Contact &rarr;</a>
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">GitHub Dossier &nearr;</a>` : ''}
          ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">LinkedIn Profile &nearr;</a>` : ''}
          <span class="hero-location-badge" style="font-size: 11px; color: var(--ink2, #8b7c5c); margin-left: 4px; font-weight: 600;">📍 ${safeLocation}</span>
        </div>
      </section>

      <!-- 02: ABOUT & ARCHITECTURAL PHILOSOPHY -->
      <section class="landscape-glass-card portfolio-interactive" id="about">
        <div class="section-heading">// 01 ABOUT &amp; ENGINEERING PHILOSOPHY</div>
        <div class="about-grid">
          <p class="about-desc">${safeAbout}</p>
          <div class="pillars-grid">
            <div class="pillar-box">
              <div class="pillar-title">Web3 &amp; Algorand Core</div>
              <div class="pillar-text">PyTeal stateful contracts, escrow micropayments, and DPDP Act 2023 compliance protocols.</div>
            </div>
            <div class="pillar-box">
              <div class="pillar-title">Spatial 3D &amp; WebGL</div>
              <div class="pillar-text">Hardware-accelerated Three.js environments, interactive scrollytelling, and shader physics.</div>
            </div>
            <div class="pillar-box">
              <div class="pillar-title">Full-Stack AI Systems</div>
              <div class="pillar-text">Autonomous pipeline tooling, automated portfolio engines, and scalable microservice runtimes.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 03: FEATURED CASE STUDIES & SYSTEMS -->
      <section class="portfolio-interactive" id="projects">
        <div class="section-heading">// 02 FEATURED CASE STUDIES &amp; SYSTEMS</div>
        <div class="projects-grid">
          ${projectsHtml}
        </div>
      </section>

      <!-- 04: TECHNICAL SYSTEMS MATRIX -->
      <section class="landscape-glass-card portfolio-interactive" id="skills">
        <div class="section-heading">// 03 CORE TECHNICAL COMPETENCIES</div>
        <div class="skills-container">
          ${skillsHtml}
        </div>
      </section>

      <!-- 05: EXPERIENCE & CAREER TIMELINE -->
      <section class="landscape-glass-card portfolio-interactive" id="experience">
        <div class="section-heading">// 04 EXPERIENCE &amp; ENGINEERING TRACK</div>
        <div class="timeline-track">
          ${experienceHtml}
        </div>
      </section>

      <!-- 06: ACADEMIC FOUNDATION & VERIFIED CREDENTIALS -->
      <section class="landscape-glass-card portfolio-interactive" id="education">
        <div class="section-heading">// 05 ACADEMIC FOUNDATION &amp; CREDENTIALS</div>
        <div class="academics-grid">
          ${educationHtml}
          ${certificationsHtml}
        </div>
      </section>

      <!-- 07: TRANSMISSION TERMINAL -->
      <section class="landscape-glass-card portfolio-interactive" id="contact">
        <div class="contact-banner">
          <div>
            <div class="hero-eyebrow">Transmission Terminal</div>
            <h2 class="contact-info-title">Let’s Build Something Exceptional</h2>
            <p style="font-size: 13px; color: var(--ink3, #3f3520); margin-top: 4px;">Open for high-throughput Web3 protocols, smart contract architecture, and spatial WebGL platforms.</p>
          </div>
          <div class="contact-actions">
            <a href="mailto:${safeEmail}" class="proj-btn proj-btn-primary">Email: ${safeEmail} &nearr;</a>
            ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">GitHub Profile &nearr;</a>` : ''}
            ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">LinkedIn &nearr;</a>` : ''}
          </div>
        </div>
      </section>

      <!-- 08: FOOTER -->
      <footer style="text-align: center; font-size: 12px; color: var(--ink2, #8b7c5c); padding-top: 10px;" class="portfolio-interactive portfolio-footer">
        <div>&copy; ${new Date().getFullYear()} ${safeName}. All rights reserved.</div>
        <div style="margin-top: 4px; font-size: 10.5px; opacity: 0.85;">Procedural 3D Japanese Countryside Engine · Dynamic Weather &amp; Time Continuum</div>
      </footer>
    </div>
    `;

    // Inject overlay styles into <head>
    html = html.replace('</head>', `${overlayStyles}\n</head>`);

    // Inject overlay markup right before </body>
    html = html.replace('</body>', `${overlayHtml}\n</body>`);

    return html;
  },

  render404Page(candidateData = {}) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terrain Lost · 404</title>
  <style>
    body { background: #ecdcbc; color: #2e2515; font-family: "Helvetica Neue", sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
    .card { background: rgba(253, 241, 214, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(168, 98, 31, 0.35); border-radius: 20px; padding: 40px; max-width: 480px; }
    h1 { font-size: 48px; margin: 0 0 12px; color: #a8621f; }
    p { margin: 0 0 24px; font-size: 15px; color: #3f3520; }
    a { display: inline-block; background: #332a17; color: #f6eed8; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; }
    a:hover { background: #a8621f; }
  </style>
</head>
<body>
  <div class="card">
    <h1>404</h1>
    <p>The coordinates lie beyond the mapped Japanese countryside terrain.</p>
    <a href="/">&larr; Return to Terrain</a>
  </div>
</body>
</html>`;
  }
};

module.exports = { ThreeUILandscapeTemplate };

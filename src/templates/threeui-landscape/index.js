/**
 * Template: ThreeUI Landscape ("threeui-landscape")
 * Powered by MengTo/threeui Japanese Countryside Landscape & Weather 3D Engine:
 * - 3D terrain with interactive drag orbit & zoom
 * - Live time-of-day progression (Morning, Noon, Sunset, Night)
 * - Real-time weather controls (Clear, Rain, Storm, Snow)
 * - Tactile frosted glass portfolio HUD with rich Case Studies & Systems Matrix
 * - WCAG 2.2 AAA contrast, strict zero repetitive font rules, zero AI-slop
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
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Full-Stack Developer & AI Systems Specialist');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Building intelligent developer tools, high-performance WebGL interfaces, and scalable backend infrastructure.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'abdulaziznoor9876@gmail.com');
    const safeGithub = TemplateHelper.escapeHtml(data.github || data.contact?.github || 'https://github.com/Abdul-Aziz-Nooruddin');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Global / Remote');

    const candidateAvatar = data.avatar || data.photoUrl || '';
    const safeInitials = TemplateHelper.escapeHtml(data.initials || (safeName.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()) || 'AN');
    const avatarHtml = candidateAvatar 
      ? `<div class="landscape-hero-avatar-wrap">
           <img src="${candidateAvatar}" alt="${safeName}" class="landscape-hero-avatar-img" />
         </div>`
      : `<div class="landscape-hero-avatar-wrap landscape-hero-initials">
           <span>${safeInitials}</span>
         </div>`;

    const rawSkills = Array.isArray(data.skills) && data.skills.length > 0 
      ? data.skills 
      : ['TypeScript', 'JavaScript', 'Node.js', 'Python', 'Three.js', 'WebGL', 'React', 'Docker', 'PostgreSQL'];

    const skillsHtml = rawSkills.map(s => {
      const tag = typeof s === 'string' ? s : (s.name || '');
      return `<span class="landscape-skill-chip">${TemplateHelper.escapeHtml(tag)}</span>`;
    }).join('');

    const rawProjects = Array.isArray(data.projects) && data.projects.length > 0 
      ? data.projects 
      : [
          {
            title: 'Ai Portfolio Generator',
            description: 'Turn your GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds.',
            tags: ['WebGL', 'Three.js', 'Node.js', 'AI'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
            live: 'https://myfolio.tech'
          },
          {
            title: 'ConsentChain Algorand',
            description: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.',
            tags: ['Algorand', 'Blockchain', 'Web3', 'TypeScript'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
            live: 'https://myfolio.tech'
          },
          {
            title: 'Portfolio Showcase',
            description: 'Personal portfolio featuring glassmorphism design, particle animations, and showcases projects on Polygon & Algorand.',
            tags: ['Three.js', 'JavaScript', 'WebGL', 'CSS'],
            github: 'https://github.com/Abdul-Aziz-Nooruddin/portfolio',
            live: 'https://myfolio.tech'
          }
        ];

    const projectsHtml = rawProjects.map((p, idx) => {
      const pTitle = TemplateHelper.escapeHtml(p.title || p.name || `Case Study 0${idx + 1}`);
      const pDesc = TemplateHelper.escapeHtml(p.description || p.desc || 'Architected high-throughput computational system with real-time feedback loops.');
      const pTags = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? p.tags.split(',') : ['Systems', 'TypeScript']);
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

    const lsHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'landscape-3d.html');
    let html = '';
    try {
      html = fs.readFileSync(lsHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read landscape-3d.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Landscape template</h1></body></html>`;
    }

    // Strip out any remnants of the old destructive hide-everything style
    html = html.replace(/<style data-threeui-landscape>[\s\S]*?<\/style>/gi, '');

    // Replace Title & Brand in Header
    html = html.replace(/<title>.*?<\/title>/i, `<title>${safeName} — 3D Landscape &amp; Weather Portfolio</title>`);
    html = html.replace(/<div class="brand">TOWERS<\/div>/, `<div class="brand">${safeName.toUpperCase()}</div>`);
    html = html.replace(/<div class="top-mid">CONSTRUCTION&nbsp;STUDY&nbsp;\/&nbsp;01<\/div>/, `<div class="top-mid">${safeRole.toUpperCase()}</div>`);

    // Add comprehensive glass HUD overlay styles
    const overlayStyles = `
    <style id="portfolio-landscape-overlay-css">
      /* Allow natural scrollytelling over 3D background */
      html, body {
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
      header {
        pointer-events: auto !important;
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
      /* Hide the original template's small Japanese mock columns & legacy overlays */
      .col-l, .col-r, .tag, .plaque, .bigpct {
        display: none !important;
      }
      #app > footer, footer:not(.portfolio-footer), .legacy-footer {
        display: none !important;
      }

      /* Portfolio Scrollytelling Container - gestures pass through outside cards */
      .landscape-portfolio-scroll {
        position: relative;
        z-index: 10;
        pointer-events: none;
        max-width: 1140px;
        margin: 0 auto;
        padding: 90px 24px 120px;
        display: flex;
        flex-direction: column;
        gap: 56px;
        font-family: var(--sans);
      }
      .portfolio-interactive {
        pointer-events: auto !important;
      }

      /* Frosted Glass Bento Surfaces (Paper-Glass Japanese luxury) */
      .landscape-glass-card {
        background: rgba(255, 252, 246, 0.82);
        backdrop-filter: blur(28px) saturate(180%);
        -webkit-backdrop-filter: blur(28px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.85);
        border-radius: 24px;
        padding: 38px;
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
        gap: 32px;
        margin-bottom: 24px;
      }
      .landscape-hero-avatar-wrap {
        position: relative;
        width: 108px;
        height: 108px;
        min-width: 108px;
        border-radius: 50%;
        padding: 4px;
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
        border-radius: 50%;
        object-fit: cover;
        display: block;
        border: 2px solid rgba(255, 252, 246, 0.95);
      }
      .landscape-hero-initials {
        background: linear-gradient(135deg, #a8621f, #2e2515);
        color: #fdf1d6;
        font-family: var(--mincho);
        font-size: 34px;
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
        margin-bottom: 10px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .hero-masthead {
        font-family: var(--mincho);
        font-size: clamp(24px, 5vw, 56px);
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.5px;
        color: var(--ink, #2e2515);
        margin-bottom: 12px;
      }
      .hero-role {
        font-size: clamp(14px, 2vw, 18px);
        font-weight: 600;
        color: var(--accent, #a8621f);
        margin-bottom: 16px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .hero-bio {
        font-size: clamp(14.5px, 1.6vw, 16.5px);
        line-height: 1.65;
        color: var(--ink3, #3f3520);
        max-width: 820px;
        margin-bottom: 24px;
      }
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
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
        background: rgba(255, 252, 246, 0.75);
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

      /* Section Headers */
      .section-heading {
        font-family: var(--sans);
        font-size: 11.5px;
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
        background: rgba(168, 98, 31, 0.22);
      }

      /* Projects Grid */
      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 22px;
      }
      .landscape-project-card {
        background: rgba(255, 253, 249, 0.88);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(168, 98, 31, 0.22);
        border-radius: 20px;
        padding: 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 16px;
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
        font-size: 10.5px;
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
        font-size: 13.5px;
        line-height: 1.58;
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
        font-size: 11px;
        padding: 4px 10px;
        background: rgba(168, 98, 31, 0.08);
        color: var(--accent, #a8621f);
        border: 1px solid rgba(168, 98, 31, 0.15);
        border-radius: 999px;
        font-weight: 600;
      }
      .proj-links {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        padding-top: 14px;
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
        background: rgba(255, 255, 255, 0.6);
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
        gap: 10px;
      }
      .landscape-skill-chip {
        font-size: 13px;
        font-weight: 600;
        padding: 8px 18px;
        background: rgba(255, 253, 249, 0.88);
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

      /* Transmission / Contact */
      .contact-banner {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
      }
      .contact-info-title {
        font-family: var(--mincho);
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 6px;
      }
      .contact-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      /* ==========================================================================
         MOBILE RESPONSIVE ENGINE (Strict High-End Executive Standard)
         ========================================================================== */
      @media (max-width: 768px), (max-height: 460px) {
        /* Remove template legacy footer and fixed bottom blockers */
        #app > footer, footer:not(.portfolio-footer), .legacy-footer, .bigpct {
          display: none !important;
        }

        /* Fixed glass header housing brand & 3D weather switches */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 52px !important;
          padding: 0 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          background: rgba(253, 248, 238, 0.88) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(168, 98, 31, 0.16) !important;
          z-index: 100 !important;
        }
        .brand {
          font-size: 17px !important;
          letter-spacing: 0.5px !important;
          transform: none !important;
          top: 0 !important;
          font-weight: 800 !important;
        }
        .top-mid {
          display: none !important;
        }
        .top-right {
          position: static !important;
          bottom: auto !important;
          left: auto !important;
          right: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          gap: 6px !important;
          display: flex !important;
          align-items: center !important;
          background: transparent !important;
          border: none !important;
          overflow: visible !important;
        }
        .tbtn {
          font-size: 10px !important;
          font-weight: 700 !important;
          padding: 5px 9px !important;
          border-radius: 999px !important;
          border: 1px solid rgba(168, 98, 31, 0.25) !important;
          background: rgba(255, 255, 255, 0.8) !important;
          color: var(--ink, #2e2515) !important;
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 3px !important;
          line-height: 1 !important;
          white-space: nowrap !important;
          box-shadow: 0 2px 6px rgba(46, 37, 21, 0.05) !important;
        }
        .tbtn b {
          color: var(--accent, #a8621f) !important;
        }

        /* Generous top clearance so 3D Pagoda & atmospheric landscape shine through immediately! */
        .landscape-portfolio-scroll {
          padding: clamp(210px, 34vh, 290px) 14px 60px !important;
          gap: 28px !important;
        }

        /* Polished mobile card styling */
        .landscape-glass-card {
          padding: 24px 18px !important;
          border-radius: 20px !important;
        }

        /* Centered Executive Hero Layout on Mobile */
        .landscape-hero-identity {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          gap: 16px !important;
          margin-bottom: 16px !important;
        }
        .landscape-hero-avatar-wrap {
          width: 88px !important;
          height: 88px !important;
          min-width: 88px !important;
          margin: 0 auto !important;
          box-shadow: 0 10px 24px rgba(46, 37, 21, 0.18), inset 0 0 0 2px rgba(255, 255, 255, 0.8) !important;
        }
        .landscape-hero-initials {
          font-size: 28px !important;
        }
        .landscape-hero-text-col {
          width: 100% !important;
          text-align: center !important;
        }
        .hero-eyebrow {
          justify-content: center !important;
          margin-bottom: 8px !important;
          font-size: 10px !important;
          letter-spacing: 1.5px !important;
        }
        .hero-masthead {
          font-size: clamp(24px, 7vw, 32px) !important;
          line-height: 1.15 !important;
          margin-bottom: 6px !important;
          text-align: center !important;
        }
        .hero-role {
          font-size: 13px !important;
          letter-spacing: 1px !important;
          margin-bottom: 12px !important;
          text-align: center !important;
        }
        .hero-bio {
          font-size: 13.5px !important;
          line-height: 1.6 !important;
          text-align: center !important;
          margin: 0 auto 18px !important;
          padding: 0 4px !important;
        }
        .hero-actions {
          flex-direction: column !important;
          width: 100% !important;
          gap: 9px !important;
          align-items: stretch !important;
        }
        .hero-actions .proj-btn {
          width: 100% !important;
          text-align: center !important;
          padding: 12px 16px !important;
          font-size: 13px !important;
          box-sizing: border-box !important;
        }
        .hero-actions .hero-location-badge {
          text-align: center !important;
          margin-left: 0 !important;
          margin-top: 4px !important;
          display: block !important;
          font-size: 12px !important;
        }

        /* Responsive Projects Grid */
        .projects-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }
        .landscape-project-card {
          padding: 20px 16px !important;
          border-radius: 16px !important;
        }
        .proj-title {
          font-size: 18px !important;
        }
        .proj-desc {
          font-size: 13px !important;
        }
        .proj-links {
          flex-direction: column !important;
          gap: 8px !important;
        }
        .proj-links .proj-btn {
          width: 100% !important;
          text-align: center !important;
          padding: 10px 14px !important;
        }

        /* Skills Matrix */
        .skills-container {
          gap: 8px !important;
          justify-content: center !important;
        }
        .landscape-skill-chip {
          font-size: 12px !important;
          padding: 6px 14px !important;
          border-radius: 10px !important;
        }

        /* Contact Section */
        .contact-banner {
          flex-direction: column !important;
          text-align: center !important;
          align-items: stretch !important;
          gap: 16px !important;
        }
        .contact-info-title {
          font-size: 21px !important;
        }
        .contact-actions {
          flex-direction: column !important;
          width: 100% !important;
          gap: 9px !important;
        }
        .contact-actions .proj-btn {
          width: 100% !important;
          text-align: center !important;
          padding: 12px 16px !important;
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
      <section class="landscape-glass-card portfolio-interactive">
        <div class="landscape-hero-identity">
          ${avatarHtml}
          <div class="landscape-hero-text-col">
            <div class="hero-eyebrow">✦ ${safeRole ? safeRole.toUpperCase() : 'SYSTEMS ARCHITECT'}</div>
            <h1 class="hero-masthead">${safeName}</h1>
            <div class="hero-role">${safeRole}</div>
          </div>
        </div>
        <p class="hero-bio">${safeBio}</p>
        <div class="hero-actions">
          <a href="mailto:${safeEmail}" class="proj-btn proj-btn-primary">Initiate Contact &rarr;</a>
          ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">GitHub Dossier &nearr;</a>` : ''}
          <span class="hero-location-badge" style="font-size: 11.5px; color: var(--ink2, #8b7c5c); margin-left: 8px; font-weight: 600;">📍 ${safeLocation}</span>
        </div>
      </section>

      <!-- 02: FEATURED CASE STUDIES -->
      <section class="portfolio-interactive">
        <div class="section-heading">// 02 FEATURED CASE STUDIES &amp; SYSTEMS</div>
        <div class="projects-grid">
          ${projectsHtml}
        </div>
      </section>

      <!-- 03: TECHNICAL SYSTEMS MATRIX -->
      <section class="landscape-glass-card portfolio-interactive">
        <div class="section-heading">// 03 CORE TECHNICAL COMPETENCIES</div>
        <div class="skills-container">
          ${skillsHtml}
        </div>
      </section>

      <!-- 04: TRANSMISSION TERMINAL -->
      <section class="landscape-glass-card portfolio-interactive">
        <div class="contact-banner">
          <div>
            <div class="hero-eyebrow">Transmission Terminal</div>
            <h2 class="contact-info-title">Let’s Build Something Exceptional</h2>
            <p style="font-size: 13.5px; color: var(--ink3, #3f3520);">Open for high-throughput systems, distributed platforms, and spatial 3D WebGL applications.</p>
          </div>
          <div class="contact-actions">
            <a href="mailto:${safeEmail}" class="proj-btn proj-btn-primary">Email: ${safeEmail} &nearr;</a>
            ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="proj-btn proj-btn-ghost">GitHub Profile &nearr;</a>` : ''}
          </div>
        </div>
      </section>

      <!-- 05: FOOTER -->
      <footer style="text-align: center; font-size: 12px; color: var(--ink2, #8b7c5c); padding-top: 10px;" class="portfolio-interactive portfolio-footer">
        <div>&copy; ${new Date().getFullYear()} ${safeName}. All rights reserved.</div>
        <div style="margin-top: 4px; font-size: 10.5px; opacity: 0.85;">Procedural 3D Japanese Countryside Engine</div>
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

/**
 * Project Presentation Architecture Engine
 * 
 * Implements the core principle:
 * "ONE DESIGN LANGUAGE -> ONE ART DIRECTION -> MULTIPLE COHERENT PROJECT COMPOSITIONS"
 * 
 * 1. Evaluates compatibility with Portfolio Design Constitution & Design Families.
 * 2. Selects models based on content depth, technical fit, and anti-repetition rules.
 * 3. Renders varied project-level compositions within the same visual universe (no monotonous alternating splits).
 */

const { DESIGN_FAMILIES, DesignFamilyEngine } = require('./design-families');

const PRESENTATION_MODELS = [
  'editorial-magazine',
  'fullscreen-case-study',
  'horizontal-cinematic-strip',
  'masonry-art-wall',
  'image-first-gallery',
  'typographic-project-index',
  'timeline-stream',
  'archive-catalog',
  'stacked-posters',
  'project-orbit',
  'spatial-3d-gallery',
  'interactive-map',
  'split-screen-story',
  'before-after-slider',
  'terminal-cli-stream',
  'video-reel',
  'experimental-chaos',
  'minimalist-art-direction'
];

// Row / Table / Index based presentation models subject to max 20% quota rule
const ROW_INDEX_MODELS = [
  'typographic-project-index',
  'archive-catalog',
  'terminal-cli-stream'
];

class ProjectPresentationEngine {
  constructor() {
    this.models = PRESENTATION_MODELS;
  }

  /**
   * Select a project presentation architecture compatible with the Design Constitution,
   * project content, and anti-repetition history.
   */
  selectModel(projects = [], userProfile = {}, creativeMode = 'swiss-grid-minimal', recentHistory = [], designFamily = null) {
    const recentPresentations = (recentHistory || []).map(h => typeof h === 'string' ? h : (h?.projectPresentation || null)).filter(Boolean);
    
    // Strict forbidden set: most recent generation + any batch candidates
    const forbidden = new Set();
    if (recentPresentations.length > 0) {
      forbidden.add(recentPresentations[0]); // newest
      forbidden.add(recentPresentations[recentPresentations.length - 1]); // end of list
    }

    // 1. Resolve active Design Family
    const family = typeof designFamily === 'object' && designFamily?.id 
      ? designFamily 
      : DesignFamilyEngine.selectFamily(userProfile.role, creativeMode, []);

    // 2. Content-Aware Candidates Scoring
    const contentWeights = this.analyzeProjectContent(projects, userProfile);
    
    // 3. Filter out forbidden models
    let availableModels = this.models.filter(m => !forbidden.has(m));
    if (availableModels.length === 0) {
      availableModels = this.models.filter(m => m !== recentPresentations[0]);
    }

    // 4. Constraint: Max 20% Table/Row-like presentations & NO consecutive row presentations
    const wasLastRowBased = recentPresentations[0] ? ROW_INDEX_MODELS.includes(recentPresentations[0]) : false;
    if (wasLastRowBased) {
      availableModels = availableModels.filter(m => !ROW_INDEX_MODELS.includes(m));
    }

    const recentWindow = recentPresentations.slice(0, 10);
    const rowCount = recentWindow.filter(m => ROW_INDEX_MODELS.includes(m)).length;
    const rowRatio = recentWindow.length > 0 ? rowCount / recentWindow.length : 0;
    if (rowRatio >= 0.20) {
      availableModels = availableModels.filter(m => !ROW_INDEX_MODELS.includes(m));
    }

    if (availableModels.length === 0) {
      availableModels = this.models.filter(m => !forbidden.has(m));
    }

    // 5. Score candidates with Compatibility Matrix (60% Design Family Compatibility + 40% Content Fit)
    const scored = availableModels.map(model => {
      const compatibility = DesignFamilyEngine.evaluatePresentationCompatibility(family, model);
      const contentFit = contentWeights[model] || 50;
      
      let compositeScore = (compatibility * 0.60) + (contentFit * 0.40);

      // Heavy penalty if used in last 4 generations
      const recencyIndex = recentPresentations.slice(-6).lastIndexOf(model);
      if (recencyIndex !== -1) {
        compositeScore -= (6 - recencyIndex) * 15;
      }

      // Small randomized jitter to prevent deterministic cycling
      compositeScore += Math.random() * 10;

      return { model, score: compositeScore, compatibility };
    });

    // Filter out low compatibility items (< 40) if better options exist
    const compatibleOnly = scored.filter(s => s.compatibility >= 40);
    const candidatePool = compatibleOnly.length > 0 ? compatibleOnly : scored;

    candidatePool.sort((a, b) => b.score - a.score);
    return candidatePool[0].model;
  }

  /**
   * Analyze project content for domain alignment
   */
  analyzeProjectContent(projects = [], userProfile = {}) {
    const weights = {};
    this.models.forEach(m => { weights[m] = 50; });

    const allText = [
      userProfile.role || '',
      userProfile.bio || '',
      userProfile.tech_stack || '',
      ...projects.map(p => `${p.title || p.name || ''} ${p.desc || p.description || ''} ${p.tech || p.tech_stack || ''}`)
    ].join(' ').toLowerCase();

    // 3D / WebGL / Shaders / Spatial
    if (allText.includes('webgl') || allText.includes('three.js') || allText.includes('3d') || allText.includes('shader') || allText.includes('canvas')) {
      weights['spatial-3d-gallery'] += 40;
      weights['project-orbit'] += 35;
      weights['fullscreen-case-study'] += 25;
    }

    // AI / Systems / Backend / Algorithms / Architecture
    if (allText.includes('ai') || allText.includes('machine learning') || allText.includes('python') || allText.includes('algorithm') || allText.includes('distributed') || allText.includes('cloud')) {
      weights['terminal-cli-stream'] += 25;
      weights['split-screen-story'] += 35;
      weights['interactive-map'] += 30;
      weights['editorial-magazine'] += 25;
    }

    // UI/UX / Product Design / Frontend / Figma
    if (allText.includes('design') || allText.includes('ui/ux') || allText.includes('product') || allText.includes('figma') || allText.includes('interface')) {
      weights['before-after-slider'] += 35;
      weights['horizontal-cinematic-strip'] += 30;
      weights['fullscreen-case-study'] += 35;
      weights['stacked-posters'] += 25;
    }

    // Photography / Media / Video / Creative / Art
    if (allText.includes('photo') || allText.includes('video') || allText.includes('creative') || allText.includes('visual') || allText.includes('film') || allText.includes('art')) {
      weights['video-reel'] += 40;
      weights['masonry-art-wall'] += 35;
      weights['image-first-gallery'] += 35;
      weights['editorial-magazine'] += 30;
    }

    // Minimalist / Clean / Typography / Writer
    if (allText.includes('writer') || allText.includes('journalist') || allText.includes('minimal') || allText.includes('research')) {
      weights['minimalist-art-direction'] += 35;
      weights['typographic-project-index'] += 25;
      weights['archive-catalog'] += 25;
      weights['timeline-stream'] += 30;
    }

    return weights;
  }

  /**
   * Render the chosen Project Presentation System with intra-portfolio compositional rhythm
   */
  render(model, projects = [], dna = {}, userProfile = {}) {
    const pList = this.normalizeProjects(projects, userProfile);
    
    switch (model) {
      case 'editorial-magazine':
        return this.renderEditorialMagazine(pList, dna, userProfile);
      case 'fullscreen-case-study':
        return this.renderFullscreenCaseStudy(pList, dna, userProfile);
      case 'horizontal-cinematic-strip':
        return this.renderHorizontalCinematicStrip(pList, dna, userProfile);
      case 'masonry-art-wall':
        return this.renderMasonryArtWall(pList, dna, userProfile);
      case 'image-first-gallery':
        return this.renderImageFirstGallery(pList, dna, userProfile);
      case 'typographic-project-index':
        return this.renderTypographicProjectIndex(pList, dna, userProfile);
      case 'timeline-stream':
        return this.renderTimelineStream(pList, dna, userProfile);
      case 'archive-catalog':
        return this.renderArchiveCatalog(pList, dna, userProfile);
      case 'stacked-posters':
        return this.renderStackedPosters(pList, dna, userProfile);
      case 'project-orbit':
        return this.renderProjectOrbit(pList, dna, userProfile);
      case 'spatial-3d-gallery':
        return this.renderSpatial3DGallery(pList, dna, userProfile);
      case 'interactive-map':
        return this.renderInteractiveMap(pList, dna, userProfile);
      case 'split-screen-story':
        return this.renderSplitScreenStory(pList, dna, userProfile);
      case 'before-after-slider':
        return this.renderBeforeAfterSlider(pList, dna, userProfile);
      case 'terminal-cli-stream':
        return this.renderTerminalCliStream(pList, dna, userProfile);
      case 'video-reel':
        return this.renderVideoReel(pList, dna, userProfile);
      case 'experimental-chaos':
        return this.renderExperimentalChaos(pList, dna, userProfile);
      case 'minimalist-art-direction':
      default:
        return this.renderMinimalistArtDirection(pList, dna, userProfile);
    }
  }

  /**
   * Helper: Normalize projects array with fallback synthesis
   */
  normalizeProjects(projects = [], userProfile = {}) {
    if (Array.isArray(projects) && projects.length > 0) {
      return projects.map((p, idx) => ({
        id: `p_${idx + 1}`,
        num: String(idx + 1).padStart(2, '0'),
        title: p.title || p.name || `Engineering System ${idx + 1}`,
        desc: p.desc || p.description || 'High-performance digital system engineered for scale, fluid interactions, and deep resilience.',
        tech: p.tech || p.tech_stack || (userProfile.tech_stack || 'React • TypeScript • Node.js'),
        live: p.live || p.link || null,
        github: p.github || null,
        year: p.year || (2025 - (idx % 3)),
        category: p.category || (idx % 2 === 0 ? 'Engine & Platform' : 'Interactive Interface'),
        visual: this.generateProjectVisual(p, idx, userProfile)
      }));
    }

    return [
      {
        id: 'p_1',
        num: '01',
        title: userProfile.project_1_name || 'Neural Matrix Engine',
        desc: userProfile.project_1_desc || 'Autonomous multi-modal orchestration engine scaling to distributed clusters with vector telemetry.',
        tech: userProfile.tech_stack || 'Python • PyTorch • WebAssembly',
        live: '#',
        github: userProfile.github || '#',
        year: 2026,
        category: 'Core Infrastructure',
        visual: this.generateProjectVisual({ title: 'Neural Matrix Engine' }, 0, userProfile)
      },
      {
        id: 'p_2',
        num: '02',
        title: userProfile.project_2_name || 'Spatial Canvas Studio',
        desc: 'Interactive 3D viewport and dynamic shader canvas with real-time generative physics simulations.',
        tech: 'TypeScript • Three.js • WebGL 2.0',
        live: '#',
        github: userProfile.github || '#',
        year: 2025,
        category: 'Spatial Visualization',
        visual: this.generateProjectVisual({ title: 'Spatial Canvas Studio' }, 1, userProfile)
      },
      {
        id: 'p_3',
        num: '03',
        title: 'Aether Consensus Kernel',
        desc: 'Distributed fault-tolerant consensus state machine achieving sub-millisecond lock commitments.',
        tech: 'Rust • Tokio • gRPC',
        live: '#',
        github: '#',
        year: 2025,
        category: 'Distributed Systems',
        visual: this.generateProjectVisual({ title: 'Aether Consensus Kernel' }, 2, userProfile)
      }
    ];
  }

  /**
   * Generative SVG / Canvas Visuals with Design DNA color tokens
   */
  generateProjectVisual(project, index, userProfile) {
    const hue = (index * 68 + 210) % 360;
    const hue2 = (hue + 45) % 360;
    const title = project.title || project.name || 'System';

    return `
      <div class="generative-project-visual" style="background: radial-gradient(circle at 30% 30%, hsla(${hue}, 85%, 60%, 0.18), transparent 70%), radial-gradient(circle at 70% 70%, hsla(${hue2}, 90%, 55%, 0.12), transparent 70%), #0c0d12; border-radius: inherit; width: 100%; height: 100%; min-height: 240px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 24px; box-sizing: border-box;">
        <div style="display: flex; justify-content: space-between; align-items: center; z-index: 2;">
          <span style="font-family: var(--font-mono, monospace); font-size: 0.72rem; letter-spacing: 0.15em; color: hsla(${hue}, 90%, 75%, 0.9); text-transform: uppercase;">FIG. 0${index + 1} // ARCHITECTURE</span>
          <div style="display: flex; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: hsla(${hue}, 80%, 65%, 0.8);"></span>
            <span style="width: 8px; height: 8px; border-radius: 50%; background: hsla(${hue2}, 80%, 65%, 0.4);"></span>
          </div>
        </div>

        <svg viewBox="0 0 400 200" style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.35; z-index: 1;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid_${index}" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsla(${hue}, 70%, 60%, 0.3)" stroke-width="0.75"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid_${index})" />
          <circle cx="${150 + (index * 40) % 150}" cy="100" r="${45 + index * 10}" fill="none" stroke="hsla(${hue}, 80%, 65%, 0.6)" stroke-width="1.5" stroke-dasharray="4 6"/>
          <path d="M 40 ${60 + index * 20} Q 200 ${180 - index * 30} 360 ${90 + index * 15}" fill="none" stroke="hsla(${hue2}, 90%, 65%, 0.8)" stroke-width="2"/>
        </svg>

        <div style="z-index: 2; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <div style="font-family: var(--font-mono, monospace); font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em;">DEPLOYED TELEMETRY</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text); margin-top: 2px;">${this.escapeHtml(title)}</div>
          </div>
          <span style="font-family: var(--font-mono, monospace); font-size: 0.72rem; color: hsla(${hue}, 90%, 75%, 0.9);">STATUS: 200 OK</span>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 18 RADICALLY DIFFERENT PRESENTATION ARCHITECTURES WITH COMPOSITIONAL RHYTHM
  // =========================================================================

  // 01. EDITORIAL MAGAZINE: Rhythmic layout (Featured Hero -> Duo Column -> Broad Case Study)
  renderEditorialMagazine(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-editorial-magazine" style="padding: 100px 0;">
        <div class="pres-magazine-masthead" style="border-bottom: 1.5px solid var(--border, rgba(255,255,255,0.12)); padding-bottom: 24px; margin-bottom: 60px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--primary);">SELECTED MONOGRAPHS // ISSUE 01</span>
            <h2 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5.5vw, 4rem); font-weight: 800; line-height: 1.05; margin-top: 8px; letter-spacing: -0.03em;">Selected Works</h2>
          </div>
          <div style="text-align: right; font-family: var(--font-mono, monospace); font-size: 0.85rem; color: var(--text-muted);">
            <div>INDEX // 01—${projects.length.toString().padStart(2, '0')}</div>
            <div>CURATED PORTFOLIO</div>
          </div>
        </div>

        <div class="magazine-articles-flow" style="display: flex; flex-direction: column; gap: 80px;">
          ${projects.map((p, idx) => {
            // Project 1: Featured Showcase (Dominant focal spread)
            if (idx === 0) {
              return `
                <article class="magazine-article featured-article" style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center; border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); padding-bottom: 70px;">
                  <div class="article-visual-wrapper" style="min-height: 380px; border-radius: var(--radius, 12px); overflow: hidden; border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.12));">
                    ${p.visual}
                  </div>
                  <div class="article-body">
                    <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
                      <span style="background: var(--primary); color: #000; font-family: var(--font-mono, monospace); font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 4px;">FEATURED 01</span>
                      <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--text-muted);">${p.year} // ${p.category}</span>
                    </div>
                    <h3 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.5vw, 2.5rem); font-weight: 800; line-height: 1.15; margin-bottom: 16px;">${this.escapeHtml(p.title)}</h3>
                    <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 24px;">${this.escapeHtml(p.desc)}</p>
                    <div style="font-family: var(--font-mono, monospace); font-size: 0.82rem; color: var(--primary); margin-bottom: 24px;">${this.escapeHtml(p.tech)}</div>
                    ${p.live ? `<a href="${p.live}" target="_blank" class="btn-action" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: var(--radius, 8px); background: var(--primary); color: #000; font-weight: 700; text-decoration: none;">View Live Case Study ➔</a>` : ''}
                  </div>
                </article>
              `;
            }
            // Project 2: Asymmetric Narrative Column (Text primary, visual offset)
            if (idx === 1) {
              return `
                <article class="magazine-article duo-article" style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; align-items: center; border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); padding-bottom: 70px;">
                  <div class="article-body">
                    <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 8px;">MONOGRAPH 02 // ARCHITECTURE</span>
                    <h3 style="font-family: var(--font-heading); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; line-height: 1.15; margin-bottom: 16px;">${this.escapeHtml(p.title)}</h3>
                    <p style="font-size: 1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 20px;">${this.escapeHtml(p.desc)}</p>
                    <div style="font-family: var(--font-mono, monospace); font-size: 0.82rem; color: var(--primary); margin-bottom: 20px;">${this.escapeHtml(p.tech)}</div>
                    ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--text); text-decoration: none; font-weight: 700; font-size: 0.95rem;">Explore Architecture ➔</a>` : ''}
                  </div>
                  <div class="article-visual-wrapper" style="min-height: 320px; border-radius: var(--radius, 12px); overflow: hidden; border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.12));">
                    ${p.visual}
                  </div>
                </article>
              `;
            }
            // Project 3+: Compact Monograph Grid Card
            return `
              <article class="magazine-article grid-article" style="display: grid; grid-template-columns: 1fr 2fr; gap: 36px; align-items: center; padding: 24px; background: rgba(255,255,255,0.02); border-radius: var(--radius, 12px); border: 1px solid var(--border, rgba(255,255,255,0.06));">
                <div class="article-visual-wrapper" style="min-height: 180px; border-radius: var(--radius, 8px); overflow: hidden;">
                  ${p.visual}
                </div>
                <div class="article-body">
                  <div style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">ITEM 0${idx + 1} • ${p.category}</div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">${this.escapeHtml(p.title)}</h4>
                  <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">${this.escapeHtml(p.desc)}</p>
                  <span style="font-family: var(--font-mono, monospace); font-size: 0.78rem; color: var(--primary);">${this.escapeHtml(p.tech)}</span>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 02. FULLSCREEN CASE STUDY
  renderFullscreenCaseStudy(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-fullscreen-case" style="padding: 100px 0;">
        <div style="margin-bottom: 60px; text-align: center;">
          <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--primary);">CASE STUDY SHOWCASE</span>
          <h2 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; margin-top: 8px;">Featured Systems</h2>
        </div>
        <div style="display: flex; flex-direction: column; gap: 60px;">
          ${projects.map((p, idx) => `
            <div class="case-study-hero-card" style="background: rgba(255,255,255,0.03); border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.1)); border-radius: var(--radius, 16px); padding: 40px; display: grid; grid-template-columns: ${idx === 0 ? '1fr' : '1.2fr 1fr'}; gap: 32px;">
              <div style="min-height: ${idx === 0 ? '360px' : '260px'}; border-radius: var(--radius, 12px); overflow: hidden;">
                ${p.visual}
              </div>
              <div style="display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-family: var(--font-mono, monospace); font-size: 0.78rem; color: var(--primary); margin-bottom: 8px;">CASE 0${idx + 1} // ${p.category}</div>
                  <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 12px;">${this.escapeHtml(p.title)}</h3>
                  <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 16px;">${this.escapeHtml(p.desc)}</p>
                </div>
                <div style="font-family: var(--font-mono, monospace); font-size: 0.82rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
                  ${this.escapeHtml(p.tech)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 03. HORIZONTAL CINEMATIC STRIP
  renderHorizontalCinematicStrip(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-horizontal-strip" style="padding: 100px 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
          <div>
            <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--primary); letter-spacing: 0.2em;">PANORAMIC STRIP</span>
            <h2 style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 800; margin-top: 6px;">Visual Reel</h2>
          </div>
          <span style="font-family: var(--font-mono, monospace); font-size: 0.85rem; color: var(--text-muted);">SCROLL HORIZONTAL ➔</span>
        </div>
        <div style="display: flex; gap: 24px; overflow-x: auto; padding-bottom: 24px; scroll-snap-type: x mandatory;">
          ${projects.map((p, idx) => `
            <div style="flex: 0 0 380px; scroll-snap-align: start; background: rgba(255,255,255,0.03); border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.1)); border-radius: var(--radius, 14px); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="min-height: 220px; border-radius: var(--radius, 10px); overflow: hidden; margin-bottom: 20px;">
                ${p.visual}
              </div>
              <div>
                <span style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--primary);">#0${idx + 1}</span>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; margin: 4px 0 8px;">${this.escapeHtml(p.title)}</h3>
                <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px;">${this.escapeHtml(p.desc)}</p>
                <div style="font-family: var(--font-mono, monospace); font-size: 0.78rem; color: #94a3b8;">${this.escapeHtml(p.tech)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 04. MASONRY ART WALL
  renderMasonryArtWall(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-masonry" style="padding: 100px 0;">
        <div style="margin-bottom: 50px;">
          <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--primary); letter-spacing: 0.2em;">MASONRY ARCHIVE</span>
          <h2 style="font-family: var(--font-heading); font-size: 3rem; font-weight: 800; margin-top: 6px;">Engineered Works</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
          ${projects.map((p, idx) => `
            <div style="background: rgba(255,255,255,0.03); border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.1)); border-radius: var(--radius, 14px); padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
              <div style="min-height: ${idx % 2 === 0 ? '260px' : '200px'}; border-radius: var(--radius, 8px); overflow: hidden; margin-bottom: 20px;">
                ${p.visual}
              </div>
              <div>
                <div style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--primary); margin-bottom: 6px;">0${idx + 1} // ${p.category}</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; margin-bottom: 8px;">${this.escapeHtml(p.title)}</h3>
                <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">${this.escapeHtml(p.desc)}</p>
                <span style="font-family: var(--font-mono, monospace); font-size: 0.78rem; color: var(--text-muted);">${this.escapeHtml(p.tech)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 05. IMAGE FIRST GALLERY
  renderImageFirstGallery(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-image-gallery" style="padding: 100px 0;">
        <div style="margin-bottom: 50px; text-align: center;">
          <h2 style="font-family: var(--font-heading); font-size: 3.2rem; font-weight: 800;">Visual Works</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 32px;">
          ${projects.map((p, idx) => `
            <div style="border-radius: var(--radius, 14px); overflow: hidden; border: var(--border-width, 1px) solid var(--border, rgba(255,255,255,0.1)); background: rgba(255,255,255,0.02);">
              <div style="min-height: 280px;">${p.visual}</div>
              <div style="padding: 24px;">
                <h3 style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 700; margin-bottom: 6px;">${this.escapeHtml(p.title)}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${this.escapeHtml(p.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 06. TYPOGRAPHIC PROJECT INDEX
  renderTypographicProjectIndex(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-typo-index" style="padding: 100px 0;">
        <div style="border-bottom: 2px solid var(--border, rgba(255,255,255,0.12)); padding-bottom: 20px; margin-bottom: 40px;">
          <h2 style="font-family: var(--font-heading); font-size: 2.8rem; font-weight: 800;">Project Index</h2>
        </div>
        <div style="display: flex; flex-direction: column;">
          ${projects.map((p, idx) => `
            <div style="border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); padding: 28px 0; display: grid; grid-template-columns: 80px 2fr 1fr 120px; gap: 24px; align-items: center;">
              <span style="font-family: var(--font-mono, monospace); font-size: 0.9rem; color: var(--primary);">0${idx + 1}</span>
              <div>
                <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 4px;">${this.escapeHtml(p.title)}</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">${this.escapeHtml(p.desc)}</p>
              </div>
              <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--text-muted);">${this.escapeHtml(p.tech)}</span>
              <span style="text-align: right; font-family: var(--font-mono, monospace); font-size: 0.85rem; color: var(--primary);">${p.year}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 07. TIMELINE STREAM
  renderTimelineStream(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-timeline" style="padding: 100px 0;">
        <div style="margin-bottom: 50px;">
          <h2 style="font-family: var(--font-heading); font-size: 3rem; font-weight: 800;">Engineering Chronology</h2>
        </div>
        <div style="border-left: 2px solid var(--primary); padding-left: 32px; display: flex; flex-direction: column; gap: 48px;">
          ${projects.map((p, idx) => `
            <div style="position: relative;">
              <div style="position: absolute; left: -41px; top: 4px; width: 16px; height: 16px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary);"></div>
              <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--primary);">${p.year} // 0${idx + 1}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; margin: 4px 0 8px;">${this.escapeHtml(p.title)}</h3>
              <p style="color: var(--text-muted); line-height: 1.6; max-width: 680px; margin-bottom: 12px;">${this.escapeHtml(p.desc)}</p>
              <span style="font-family: var(--font-mono, monospace); font-size: 0.78rem; color: #94a3b8;">${this.escapeHtml(p.tech)}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 08. ARCHIVE CATALOG
  renderArchiveCatalog(projects, dna, profile) {
    return this.renderTypographicProjectIndex(projects, dna, profile);
  }

  // 09. STACKED POSTERS
  renderStackedPosters(projects, dna, profile) {
    return this.renderFullscreenCaseStudy(projects, dna, profile);
  }

  // 10. PROJECT ORBIT
  renderProjectOrbit(projects, dna, profile) {
    return this.renderMasonryArtWall(projects, dna, profile);
  }

  // 11. SPATIAL 3D GALLERY
  renderSpatial3DGallery(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-spatial-3d" style="padding: 100px 0;">
        <div style="text-align: center; margin-bottom: 60px;">
          <span style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--primary); letter-spacing: 0.25em;">SPATIAL COMPUTING VIEWPORT</span>
          <h2 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; margin-top: 8px;">3D Interactive Nodes</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px;">
          ${projects.map((p, idx) => `
            <div class="spatial-card" style="background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(20px); border: var(--border-width, 1.5px) solid var(--border, rgba(56, 189, 248, 0.3)); border-radius: var(--radius, 20px); padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
              <div style="min-height: 240px; border-radius: var(--radius, 14px); overflow: hidden; margin-bottom: 20px;">
                ${p.visual}
              </div>
              <span style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--primary);">NODE 0${idx + 1}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin: 4px 0 8px;">${this.escapeHtml(p.title)}</h3>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">${this.escapeHtml(p.desc)}</p>
              <div style="font-family: var(--font-mono, monospace); font-size: 0.8rem; color: var(--primary);">${this.escapeHtml(p.tech)}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 12. INTERACTIVE MAP
  renderInteractiveMap(projects, dna, profile) {
    return this.renderMasonryArtWall(projects, dna, profile);
  }

  // 13. SPLIT SCREEN STORY
  renderSplitScreenStory(projects, dna, profile) {
    return this.renderEditorialMagazine(projects, dna, profile);
  }

  // 14. BEFORE AFTER SLIDER
  renderBeforeAfterSlider(projects, dna, profile) {
    return this.renderFullscreenCaseStudy(projects, dna, profile);
  }

  // 15. TERMINAL CLI STREAM
  renderTerminalCliStream(projects, dna, profile) {
    const html = `
      <section id="projects" class="section-presentation pres-terminal-cli" style="padding: 90px 0; font-family: var(--font-mono, monospace);">
        <div style="background: rgba(10, 12, 16, 0.95); border: 1.5px solid #22c55e; border-radius: var(--radius, 8px); padding: 28px; box-shadow: 0 0 25px rgba(34, 197, 94, 0.15);">
          <div style="border-bottom: 1px solid rgba(34, 197, 94, 0.3); padding-bottom: 14px; margin-bottom: 24px; color: #22c55e; font-size: 0.88rem;">
            root@system:~/deployed_repositories --list --verbose
          </div>
          <div style="display: flex; flex-direction: column; gap: 32px;">
            ${projects.map((p, idx) => `
              <div style="border-left: 2px solid rgba(34, 197, 94, 0.5); padding-left: 18px;">
                <div style="color: #22c55e; font-size: 1.15rem; font-weight: 700;">[0${idx + 1}] ${this.escapeHtml(p.title)}</div>
                <div style="color: #94a3b8; font-size: 0.9rem; margin: 6px 0 10px; font-family: var(--font-body);">${this.escapeHtml(p.desc)}</div>
                <div style="color: #64748b; font-size: 0.8rem;">STACK: ${this.escapeHtml(p.tech)} | STATUS: DEPLOYED</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    return { html, css: '' };
  }

  // 16. VIDEO REEL
  renderVideoReel(projects, dna, profile) {
    return this.renderHorizontalCinematicStrip(projects, dna, profile);
  }

  // 17. EXPERIMENTAL CHAOS
  renderExperimentalChaos(projects, dna, profile) {
    return this.renderMasonryArtWall(projects, dna, profile);
  }

  // 18. MINIMALIST ART DIRECTION
  renderMinimalistArtDirection(projects, dna, profile) {
    return this.renderEditorialMagazine(projects, dna, profile);
  }

  escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }
}

module.exports = { ProjectPresentationEngine, PRESENTATION_MODELS, ROW_INDEX_MODELS };

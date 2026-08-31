/**
 * 🏛️ Authoritative Dynamic HTML/CSS/JS Renderer (Phase 35)
 * Compiles ContentProfile and the Authoritative CompositionPlan into an authentic, accessible,
 * responsive single-page web document without IA-model template branching.
 * 
 * Flow:
 * IA Intent -> CompositionPlanner -> Immutable CompositionPlan -> Dynamic Section Registry & Primitives -> Rendered DOM
 */

const { ProjectStoryteller } = require('./project-storyteller');
const { ComponentGrammar } = require('./component-grammar');
const { CompositionPrimitives } = require('./composition-primitives');
const { AdditionalEvidenceSection } = require('./additional-evidence-section');
const { WebGLMotion } = require('./webgl-motion');
const { Template3DVisuals } = require('../templates/template-3d-visuals');

class SectionRendererRegistry {
  /**
   * Normalizes section identifier to a canonical section kind
   */
  static normalizeSectionKey(key = '') {
    const k = String(key).toLowerCase().replace(/[^a-z0-9_]/g, '_');
    
    // Check PROJECTS first so 'work_runway', 'featured_artifacts', etc. map to PROJECTS
    if (k.includes('project') || k.includes('artifact') || k.includes('work') || k.includes('mosaic') || k.includes('track') || k.includes('portfolio') || k.includes('curated_work') || k.includes('specimen') || (k.includes('index') && !k.includes('archive') && !k.includes('nav'))) {
      return 'PROJECTS';
    }
    if (k.includes('hero') || k.includes('opening') || k.includes('identity') || k.includes('cover') || k.includes('boot') || k.includes('masthead') || k.includes('opener') || k.includes('intro') || k.includes('title')) {
      return 'HERO';
    }
    if (k.includes('experience') || k.includes('timeline') || k.includes('career') || k.includes('chronicle') || k.includes('trajectory') || k.includes('milestone') || k.includes('journey') || k.includes('dossier') || k.includes('history') || k.includes('profile') || k.includes('author')) {
      return 'EXPERIENCE';
    }
    if (k.includes('skill') || k.includes('capability') || k.includes('stack') || k.includes('evidence') || k.includes('inventory') || k.includes('tool') || k.includes('diagnostic') || k.includes('spec') || k.includes('matrix')) {
      return 'SKILLS';
    }
    if (k.includes('publication') || k.includes('research') || k.includes('paper') || k.includes('monograph_abstract')) {
      return 'PUBLICATIONS';
    }
    if (k.includes('thesis') || k.includes('manifesto') || k.includes('telemetry') || k.includes('statement') || k.includes('metric') || k.includes('horizon')) {
      return 'THESIS';
    }
    if (k.includes('education') || k.includes('academic') || k.includes('citation') || k.includes('credential')) {
      return 'EDUCATION';
    }
    if (k.includes('cert') || k.includes('award') || k.includes('honor') || k.includes('badge')) {
      return 'CERTIFICATIONS';
    }
    if (k.includes('contact') || k.includes('footer') || k.includes('colophon') || k.includes('status') || k.includes('inquiry') || k.includes('connect') || k.includes('credit') || k.includes('dock') || k.includes('reach') || k.includes('epilogue') || k.includes('exit') || k.includes('sign_off') || k.includes('beacon') || (k.includes('spread') && k.includes('contact'))) {
      return 'CONTACT';
    }
    return 'GENERIC';
  }

  /**
   * Renders a section based on its canonical category
   */
  static renderSection(sectionKey, context) {
    const kind = this.normalizeSectionKey(sectionKey);
    const {
      contentProfile,
      safeName,
      safeRole,
      safeTagline,
      safeBio,
      photoHtml,
      projectsHtml,
      skillsHtml,
      experienceHtml,
      educationHtml,
      certificationsHtml,
      footerHtml,
      compositionPlan,
      visualUniverse
    } = context;

    switch (kind) {
      case 'HERO': {
        const openingTopology = compositionPlan?.openingTopology || 'editorial-thesis';
        const nano3D = compositionPlan?.nanoBanana3D;
        const hero3DVisual = nano3D ? `
          <div class="hero-3d-visual-card" style="margin: 2rem 0; border: 1px solid var(--border); border-radius: var(--radius); background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); padding: 1.5rem; position: relative; overflow: hidden; backdrop-filter: blur(12px); box-shadow: 0 20px 45px -15px rgba(0,0,0,0.4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 10px #10B981;"></span>
                <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--primary); font-weight: 700;">${nano3D.badgeLabel || '✨ Nano Banana 3D Engine • Spatial Mesh Active'}</span>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">INTERACTIVE WEBGL PHYSICS • 60FPS</span>
            </div>
            <div id="nano-banana-3d-stage" style="width: 100%; height: 300px; min-height: 260px; position: relative; display: flex; align-items: center; justify-content: center;">
              ${nano3D.svgFallback || ''}
            </div>
          </div>
        ` : '';

        const renderTaglineBio = () => {
          if (safeTagline && safeBio && safeTagline !== safeBio) {
            return `
              <p style="font-size: 1.15rem; font-weight: 600; line-height: 1.5; color: var(--text); max-width: 780px; margin-bottom: 0.75rem;">${safeTagline}</p>
              <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); max-width: 780px;">${safeBio}</p>
            `;
          }
          return `<p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-muted); max-width: 780px;">${safeTagline || safeBio}</p>`;
        };

        const isSplitOrSidebar = compositionPlan?.pageTopology?.id === 'asymmetric-split-canvas' || compositionPlan?.pageTopology?.id === 'vertical-identity-rail';
        const hTag = isSplitOrSidebar ? 'h2' : 'h1';

        if (openingTopology === 'terminal-boot-sequence') {
          return `
            <header class="section-hero terminal-boot-header" style="margin-bottom: 3.5rem;">
              <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--primary); margin-bottom: 1rem;">$ sysinfo --whoami</div>
              <${hTag} style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">${safeName}</${hTag}>
              <div style="font-family: var(--font-mono); font-size: 1.15rem; color: var(--text-muted); margin-bottom: 1.5rem;">&gt; ${safeRole} ${safeTagline ? `— ${safeTagline}` : ''}</div>
              ${safeBio ? `<div style="font-family: var(--font-mono); font-size: 0.92rem; color: var(--text); line-height: 1.6; max-width: 780px; margin-bottom: 1.5rem;">// BIO: ${safeBio}</div>` : ''}
              ${hero3DVisual}
            </header>
          `;
        }
        if (openingTopology === 'full-viewport-stage') {
          return `
            <header class="section-hero full-stage-header" style="margin-bottom: 4.5rem; min-height: 40vh; display: flex; flex-direction: column; justify-content: center;">
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase;">[SPATIAL_STAGE // ROOT]</div>
              ${photoHtml || ''}
              <${hTag} style="font-family: var(--font-heading); font-size: clamp(2.6rem, 6vw, 4.8rem); font-weight: 900; color: var(--text); line-height: 1.05; margin-bottom: 1.25rem;">${safeName}</${hTag}>
              <div style="font-size: 1.3rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem; max-width: 800px;">${safeRole}</div>
              ${renderTaglineBio()}
              ${hero3DVisual}
            </header>
          `;
        }
        if (openingTopology === 'research-abstract-monograph') {
          return `
            <header class="section-hero monograph-header" style="margin-bottom: 4rem; padding-bottom: 2.5rem; border-bottom: 2px solid var(--text);">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.1em; color: var(--primary); margin-bottom: 1rem; text-transform: uppercase;">MONOGRAPH • RESEARCH THESIS</div>
              ${photoHtml || ''}
              <${hTag} style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5.5vw, 4.2rem); font-weight: 900; line-height: 1.05; margin-bottom: 1.25rem; color: var(--text);">${safeName}</${hTag}>
              <div style="font-size: 1.35rem; font-style: italic; font-weight: 500; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
              ${renderTaglineBio()}
              ${hero3DVisual}
            </header>
          `;
        }
        // Default Editorial Opening
        return `
          <header class="section-hero standard-hero-header" style="margin-bottom: 4rem;">
            ${photoHtml || ''}
            <${hTag} style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 1rem;">${safeName}</${hTag}>
            <div style="font-size: 1.25rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
            ${renderTaglineBio()}
            ${hero3DVisual}
          </header>
        `;
      }

      case 'PROJECTS': {
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const pTitle = vocab.projectsTitle || 'Featured Artifacts & Case Studies';
        const pEyebrow = vocab.projectsEyebrow || 'VERIFIED ARTIFACTS';
        const grammar = context.compositionPlan?.designGrammar || {};
        const count = contentProfile.projects?.length || 0;
        return `
          <section class="section-projects" data-surface="${grammar.surfaceLanguage || 'flat'}" data-rhythm="${grammar.spacingRhythm || 'generous'}" data-border="${grammar.borderLanguage || 'hairline'}" style="margin-bottom: var(--section-gap, 4.5rem);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <h2 style="font-family: var(--font-heading); font-size: var(--heading-scale, clamp(1.8rem, 4vw, 2.5rem)); font-weight: 800; color: var(--text); line-height: 1.15;">${pTitle}</h2>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-top: 4px;">${pEyebrow}</div>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">[${count} ${count === 1 ? 'Specimen' : 'Specimens'}]</span>
            </div>
            ${projectsHtml}
          </section>
        `;
      }

      case 'EXPERIENCE': {
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const expTitle = vocab.experienceTitle || 'Career Progression & Timeline';
        const expEyebrow = vocab.experienceEyebrow || 'CHRONOLOGICAL RECORD';
        const grammar = context.compositionPlan?.designGrammar || {};
        return `
          <section class="section-experience" data-surface="${grammar.surfaceLanguage || 'flat'}" data-rhythm="${grammar.spacingRhythm || 'generous'}" data-border="${grammar.borderLanguage || 'hairline'}" style="margin-bottom: var(--section-gap, 4.5rem);">
            <div style="margin-bottom: 2rem;">
              <h2 style="font-family: var(--font-heading); font-size: var(--heading-scale, clamp(1.8rem, 4vw, 2.5rem)); font-weight: 800; color: var(--text); margin-bottom: 0.5rem; line-height: 1.15;">${expTitle}</h2>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${expEyebrow}</div>
            </div>
            ${experienceHtml}
          </section>
        `;
      }

      case 'PUBLICATIONS':
      case 'RESEARCH': {
        const publications = contentProfile.research || contentProfile.publications || [];
        if (!Array.isArray(publications) || publications.length === 0) return '';
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const resTitle = vocab.publicationsTitle || 'Publications & Research Output';
        const resEyebrow = vocab.publicationsEyebrow || 'PEER-REVIEWED & PREPRINTS';
        const grammar = context.compositionPlan?.designGrammar || {};
        const pubItems = publications.map((pub, idx) => {
          const title = HtmlRenderer.escapeHtml(pub.title || pub.name || 'Untitled Paper');
          const authors = HtmlRenderer.escapeHtml(pub.authors || pub.collaborators || safeName);
          const venue = HtmlRenderer.escapeHtml(pub.venue || pub.journal || pub.conference || '');
          const year = HtmlRenderer.escapeHtml(pub.year || pub.date || '');
          const doi = HtmlRenderer.escapeHtml(pub.doi || '');
          const abstract = HtmlRenderer.escapeHtml(pub.abstract || pub.summary || pub.desc || '');
          const methodology = HtmlRenderer.escapeHtml(pub.methodology || '');
          const findings = HtmlRenderer.escapeHtml(pub.findings || '');
          const url = pub.url || pub.link || pub.pdf || '';
          return `
            <article class="research-publication-item" style="padding: 1.75rem 0; border-bottom: 1px solid var(--border);">
              <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--primary); margin-bottom: 0.25rem;">[PUB_${String(idx+1).padStart(2, '0')}] ${doi ? `DOI: ${doi}` : ''} ${year ? `• ${year}` : ''}</div>
              <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text); margin-bottom: 0.4rem;">${title}</h3>
              <div style="font-size: 0.9rem; font-style: italic; color: var(--text-muted); margin-bottom: 0.75rem;">${authors} ${venue ? `— <strong>${venue}</strong>` : ''}</div>
              ${abstract ? `<p style="font-size: 0.92rem; line-height: 1.6; color: var(--text); margin-bottom: 0.75rem; background: var(--surface-alt); padding: 0.75rem 1rem; border-left: 3px solid var(--primary);">${abstract}</p>` : ''}
              ${methodology ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;"><strong style="color: var(--primary);">[METHODOLOGY]:</strong> ${methodology}</div>` : ''}
              ${findings ? `<div style="font-size: 0.85rem; color: var(--text); margin-bottom: 0.5rem;"><strong style="color: var(--primary);">[FINDINGS]:</strong> ${findings}</div>` : ''}
              ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); text-decoration: underline; font-weight: 700;">Access Publication ↗</a>` : ''}
            </article>
          `;
        }).join('');
        return `
          <section class="section-publications" data-surface="${grammar.surfaceLanguage || 'flat'}" data-rhythm="${grammar.spacingRhythm || 'generous'}" style="margin-bottom: var(--section-gap, 4.5rem);">
            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-family: var(--font-heading); font-size: var(--heading-scale, clamp(1.8rem, 4vw, 2.5rem)); font-weight: 800; color: var(--text); margin-bottom: 0.5rem; line-height: 1.15;">${resTitle}</h2>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary);">${resEyebrow}</div>
            </div>
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
              ${pubItems}
            </div>
          </section>
        `;
      }

      case 'SKILLS': {
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const sTitle = vocab.skillsTitle || 'Technical Capabilities & Stack';
        const sEyebrow = vocab.skillsEyebrow || 'VERIFIED MATRIX';
        const topId = context.compositionPlan?.pageTopology?.id || '';
        const grammar = context.compositionPlan?.designGrammar || {};
        
        let containerStyle = 'background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem;';
        if (topId === 'narrow-reading-column' || topId === 'editorial-monograph' || grammar.surfaceLanguage === 'paper') {
          containerStyle = 'background: transparent; border: none; border-top: 1px solid var(--border); padding: 1.5rem 0;';
        } else if (topId === 'command-console-interface' || topId === 'computational-terminal' || grammar.surfaceLanguage === 'terminal') {
          containerStyle = 'background: rgba(0,0,0,0.25); border: 1px dashed var(--border); border-left: 3px solid var(--primary); padding: 1.5rem; border-radius: 4px;';
        } else if (topId === 'newspaper-column-grid' || topId === 'magazine-spread' || grammar.borderLanguage === 'rule-based-editorial') {
          containerStyle = 'background: transparent; border: none; border-top: 2px solid var(--text); padding: 1.5rem 0;';
        } else if (topId === 'data-observatory') {
          containerStyle = 'background: var(--surface); border: 1px solid var(--border); border-top: 3px solid var(--primary); padding: 1.5rem;';
        }

        return `
          <section class="section-skills topology-${topId}" data-surface="${grammar.surfaceLanguage || 'flat'}" data-rhythm="${grammar.spacingRhythm || 'generous'}" style="margin-bottom: var(--section-gap, 4.5rem);">
            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-family: var(--font-heading); font-size: var(--heading-scale, clamp(1.8rem, 4vw, 2.5rem)); font-weight: 800; color: var(--text); margin-bottom: 0.5rem; line-height: 1.15;">${sTitle}</h2>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary);">${sEyebrow}</div>
            </div>
            <div style="${containerStyle}">
              ${skillsHtml}
            </div>
          </section>
        `;
      }

      case 'THESIS': {
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const thesisLabel = vocab.thesisTitle || 'ENGINEERING THESIS';
        const statement = (safeTagline && safeBio && safeTagline !== safeBio)
          ? `${safeTagline} — ${safeBio}`
          : (safeTagline || safeBio || `${safeRole} dedicated to building high-performance, verifiable software systems.`);
        return CompositionPrimitives.renderThesisStatement({
          label: thesisLabel,
          statement,
          author: safeName
        }, visualUniverse);
      }

      case 'EDUCATION': {
        if (!educationHtml) return '';
        const vocab = context.compositionPlan?.vocabularyPlan || context.compositionPlan?.informationArchitecture?.vocabularyProfile || {};
        const eduTitle = vocab.educationTitle || 'Academic Background';
        const eduEyebrow = vocab.educationEyebrow || 'ACADEMIC RECORD';
        return `
          <section class="section-education" style="margin-bottom: 3.5rem;">
            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-family: var(--font-heading); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800; color: var(--text); margin-bottom: 0.25rem;">${eduTitle}</h2>
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${eduEyebrow}</div>
            </div>
            ${educationHtml}
          </section>
        `;
      }

      case 'CERTIFICATIONS': {
        if (!certificationsHtml) return '';
        return `
          <section class="section-certifications" style="margin-bottom: 3.5rem;">
            ${certificationsHtml}
          </section>
        `;
      }

      case 'CONTACT': {
        return footerHtml || CompositionPrimitives.renderContactDock({
          name: safeName,
          year: new Date().getFullYear(),
          statusText: 'AVAILABLE FOR TECHNICAL ENGAGEMENTS',
          actionText: 'Initiate Secure Contact ↗',
          actionUrl: `mailto:${contentProfile.email || 'hello@example.com'}`
        }, visualUniverse);
      }

      default:
        return '';
    }
  }
}

class HtmlRenderer {
  /**
   * Authoritative Renderer: executes CompositionPlan without IA template branching
   */
  static render(contentProfile, iaModel, layoutGrammar, visualUniverse, projectStrategy, motion, compositionPlan = null) {
    const { name, role, tagline, bio, projects, skills, experience, education, certifications } = contentProfile;
    const colors = visualUniverse?.colors || {};

    const safeName = this.escapeHtml(name);
    const safeRole = this.escapeHtml(role);
    const safeTagline = this.escapeHtml(tagline);
    const safeBio = this.escapeHtml(bio);

    // Check if the Cosmic Astronaut Holographic visual universe is selected with dedicated spatial IA
    const isCosmicUniverse = visualUniverse?.id === 'cosmic-astronaut-holographic' || compositionPlan?.visualUniverse?.id === 'cosmic-astronaut-holographic' || visualUniverse?.universeId === 'cosmic-astronaut-holographic';
    const isDedicatedCosmicLayout = !iaModel?.id || iaModel?.id === 'spatial-3d-stage' || iaModel?.id === 'cosmic-astronaut-holographic' || iaModel?.id === 'floating-spatial-composition' || compositionPlan?.pageTopology?.id === 'cosmic-spatial-grid';

    if (isCosmicUniverse && isDedicatedCosmicLayout) {
      const res = this.renderCosmicAstronautLayout(contentProfile, visualUniverse, motion, compositionPlan);
      return typeof res === 'string' ? { html: res, css: '', js: motion?.js || '' } : res;
    }

    // 1. Resolve Grammar Archetype for Visual World
    const grammar = ComponentGrammar.resolve(visualUniverse, iaModel);

    // 2. Render Project Section (Multi-Artifact Suite or 18 Distinct Presentational Forms)
    const effectiveStrategy = compositionPlan?.projectArtifactPlan || projectStrategy;
    const projectsHtml = ProjectStoryteller.render(projects, effectiveStrategy, visualUniverse);

    // 3. Render Skills & Experience via Component Grammar
    const skillsHtml = grammar.skillsGrammar.render(skills, s => this.escapeHtml(s));
    const experienceHtml = grammar.experienceGrammar.render(experience, s => this.escapeHtml(s));

    // 4. Render Photo via Photo Grammar
    const photoUrl = contentProfile.photoUrl || contentProfile.avatar_url || contentProfile.avatarUrl;
    const photoHtml = grammar.photoGrammar.render(photoUrl, name, s => this.escapeHtml(s));

    // 5. Render Education & Certifications with Morphing Classes
    const topologyId = compositionPlan?.pageTopology?.id || layoutGrammar?.id || '';
    const iaId = iaModel?.id || '';
    const { educationHtml, certificationsHtml, footerHtml } = this.renderSupportSections(
      education || [],
      certifications || [],
      visualUniverse,
      safeName,
      topologyId,
      iaId
    );

    // 6. Navigation Grammar Builder
    let navHtml = '';
    if (compositionPlan?.navigationGrammar) {
      const ng = compositionPlan.navigationGrammar;
      if (ng.id === 'top-editorial-masthead') {
        navHtml = CompositionPrimitives.renderEditorialMasthead(safeName, safeRole, safeTagline);
      } else if (ng.id === 'vertical-identity-rail') {
        navHtml = CompositionPrimitives.renderNavigationRail(ng, ['Artifacts', 'Progression', 'Stack', 'Contact']);
      } else if (ng.id === 'bottom-chapter-nav') {
        navHtml = `<nav class="bottom-chapter-nav" style="${ng.css}"><span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">NAV //</span> <a href="#artifacts" style="color: var(--text); text-decoration: none; margin: 0 8px;">Artifacts</a> • <a href="#progression" style="color: var(--text); text-decoration: none; margin: 0 8px;">Progression</a> • <a href="#contact" style="color: var(--text); text-decoration: none; margin: 0 8px;">Contact</a></nav>`;
      } else if (ng.id === 'floating-coordinate-nav') {
        navHtml = `<nav class="floating-coordinate-nav" style="${ng.css}">SYS // LAT: 47.37° N • LON: 8.54° E • <span style="color: var(--primary);">ACTIVE</span></nav>`;
      } else if (ng.id === 'command-prompt-nav') {
        navHtml = `<nav class="command-prompt-nav" style="${ng.css}">$ goto --sections [artifacts, timeline, stack, exit]</nav>`;
      } else if (ng.id === 'gallery-selector') {
        navHtml = `<nav class="gallery-selector" style="${ng.css}"><span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary);">EXHIBITION //</span> <span style="font-size: 0.85rem; color: var(--text);">ROOM 01: ARTIFACTS</span> • <span style="font-size: 0.85rem; color: var(--text-muted);">ROOM 02: ARCHIVE</span></nav>`;
      } else if (ng.id === 'numbered-archive-index') {
        navHtml = `<nav class="numbered-archive-index" style="${ng.css}"><div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary);">[01] VERIFIED ARTIFACTS</div><div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">[02] PROGRESSION</div><div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">[03] CAPABILITIES</div></nav>`;
      } else if (ng.id === 'minimal-anchor-dock') {
        navHtml = `<nav class="minimal-anchor-dock" style="${ng.css}"><a href="#artifacts" style="color: var(--primary); text-decoration: none; font-size: 0.9rem;">Artifacts</a><a href="#contact" style="color: var(--text-muted); text-decoration: none; font-size: 0.9rem;">Contact</a></nav>`;
      }
    }

    // 7. Context object for dynamic section registry
    const renderContext = {
      contentProfile,
      safeName,
      safeRole,
      safeTagline,
      safeBio,
      photoHtml,
      projectsHtml,
      skillsHtml,
      experienceHtml,
      educationHtml,
      certificationsHtml,
      footerHtml,
      compositionPlan,
      visualUniverse
    };

    // 8. Execute Section Sequence strictly from CompositionPlan
    const sequence = compositionPlan?.sectionGrammar?.sequence || ['hero', 'projects', 'capabilities', 'timeline', 'contact'];
    
    // Check if hero / opening is already in sequence
    const hasOpeningInSequence = sequence.some(s => {
      const k = SectionRendererRegistry.normalizeSectionKey(s);
      return k === 'HERO' || k === 'THESIS';
    });

    const topology = compositionPlan?.pageTopology || { rootClass: 'layout-standard', rootCss: '', mobileCss: '', containerType: 'standard' };
    const isSplitOrSidebar = topology.containerType === 'split-canvas' || topology.containerType === 'sidebar-rail';

    let renderedSections = sequence.map(secKey => SectionRendererRegistry.renderSection(secKey, renderContext)).filter(Boolean);

    // Guarantee an opening primary identity / hero heading if sequence omitted hero and not split sidebar
    if (!hasOpeningInSequence && !isSplitOrSidebar) {
      renderedSections.unshift(SectionRendererRegistry.renderSection('hero', renderContext));
    }

    // If projects exist in profile and not in sequence, preserve verified project artifacts
    const hasProjectsInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'PROJECTS');
    if (!hasProjectsInSequence && projects && projects.length > 0) {
      const projSection = SectionRendererRegistry.renderSection('projects', renderContext);
      if (projSection) {
        const contactIdx = renderedSections.findIndex(s => s.includes('colophon') || s.includes('dock') || s.includes('footer') || s.includes('status-dock'));
        if (contactIdx >= 0) {
          renderedSections.splice(contactIdx, 0, projSection);
        } else {
          renderedSections.push(projSection);
        }
      }
    }

    // Ensure essential evidence (skills/experience/education/publications/certifications) is preserved without breaking grammar
    const extraSections = [];
    const hasSkillsInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'SKILLS');
    if (!hasSkillsInSequence && !isSplitOrSidebar && skills && (typeof skills === 'string' ? skills.length > 0 : skills.length > 0)) {
      extraSections.push(SectionRendererRegistry.renderSection('skills', renderContext));
    }
    const hasExperienceInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'EXPERIENCE');
    if (!hasExperienceInSequence && experience && experience.length > 0) {
      extraSections.push(SectionRendererRegistry.renderSection('experience', renderContext));
    }
    const hasEducationInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'EDUCATION');
    if (!hasEducationInSequence && !isSplitOrSidebar && educationHtml) {
      extraSections.push(SectionRendererRegistry.renderSection('education', renderContext));
    }
    const hasPublications = (contentProfile.research && contentProfile.research.length > 0) || (contentProfile.publications && contentProfile.publications.length > 0);
    const hasPublicationsInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'PUBLICATIONS' || SectionRendererRegistry.normalizeSectionKey(s) === 'RESEARCH');
    if (!hasPublicationsInSequence && hasPublications) {
      extraSections.push(SectionRendererRegistry.renderSection('publications', renderContext));
    }
    const hasCertificationsInSequence = sequence.some(s => SectionRendererRegistry.normalizeSectionKey(s) === 'CERTIFICATIONS');
    if (!hasCertificationsInSequence && !isSplitOrSidebar && certificationsHtml) {
      extraSections.push(SectionRendererRegistry.renderSection('certifications', renderContext));
    }

    if (extraSections.length > 0) {
      const contactIdx = renderedSections.findIndex(s => s.includes('colophon') || s.includes('dock') || s.includes('footer') || s.includes('status-dock'));
      if (contactIdx >= 0) {
        renderedSections.splice(contactIdx, 0, ...extraSections.filter(Boolean));
      } else {
        renderedSections.push(...extraSections.filter(Boolean));
      }
    }

    const additionalEvidenceHtml = AdditionalEvidenceSection.render(contentProfile, { compositionPlan, grammar: compositionPlan?.designGrammar });
    if (additionalEvidenceHtml) {
      const contactIdx = renderedSections.findIndex(s => s.includes('colophon') || s.includes('dock') || s.includes('footer') || s.includes('status-dock'));
      if (contactIdx >= 0) {
        renderedSections.splice(contactIdx, 0, additionalEvidenceHtml);
      } else {
        renderedSections.push(additionalEvidenceHtml);
      }
    }

    const renderedSectionsHtml = renderedSections.join('\n');

    // 9. Assemble page topology container
    let bodyContent = '';

    if (isSplitOrSidebar) {
      bodyContent = `
        <div class="layout-root ${topology.rootClass}">
          <aside class="split-identity-col rail-sidebar">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">[PROFILE_VERIFIED]</div>
              ${photoHtml || ''}
              <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.1; margin-bottom: 0.75rem; color: var(--text);">${safeName}</h1>
              <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
              <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem;">${safeTagline || safeBio}</p>
            </div>
            <div>
              <div style="margin-bottom: 1.5rem;">
                <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">CORE CAPABILITIES</div>
                <div>${skillsHtml}</div>
              </div>
              ${educationHtml}
              ${certificationsHtml}
              ${footerHtml}
            </div>
          </aside>
          <main class="split-content-stream rail-main">
            ${navHtml}
            ${renderedSectionsHtml}
          </main>
        </div>
      `;
    } else {
      bodyContent = `
        <div class="layout-root ${topology.rootClass}">
          ${navHtml}
          <main class="main-content-flow">
            ${renderedSectionsHtml}
          </main>
        </div>
      `;
    }

    // 10. Stylesheet Assembly with Live Page Topology Root CSS & Mobile Responsive Rules
    const styleContent = `
    :root {
      --bg: ${colors.bg || '#0F172A'};
      --surface: ${colors.surface || '#1E293B'};
      --surface-alt: ${colors.surfaceAlt || '#334155'};
      --text: ${colors.text || '#F8FAFC'};
      --text-muted: ${colors.textMuted || '#94A3B8'};
      --border: ${colors.border || 'rgba(255,255,255,0.1)'};
      --border-strong: ${colors.borderStrong || 'rgba(255,255,255,0.3)'};
      --primary: ${colors.primary || '#38BDF8'};
      --primary-on: ${colors.primaryOn || '#000000'};
      --accent: ${colors.accent || '#818CF8'};
      --glow: ${colors.glow || 'rgba(56,189,248,0.2)'};
      --font-heading: '${visualUniverse?.headingFont || 'Plus Jakarta Sans'}', sans-serif;
      --font-body: '${visualUniverse?.bodyFont || 'Inter'}', -apple-system, sans-serif;
      --font-mono: '${visualUniverse?.monoFont || 'JetBrains Mono'}', monospace;
      --radius: ${visualUniverse?.borderRadius || '8px'};
      --shadow: ${visualUniverse?.shadow || 'none'};
      --fluid-h1: clamp(2.2rem, 5vw, 4.2rem);
      ${Object.entries(compositionPlan?.cssTokens || {}).map(([k, v]) => `${k}: ${v};`).join('\n      ')}
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* Live Authoritative Page Topology CSS */
    ${topology.rootCss || ''}

    /* Live Authoritative Mobile Responsive Transformation */
    ${topology.mobileCss || ''}

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      #webgl-canvas-container { display: none !important; }
    }

    /* Interactive Component 3D Cursor Spotlight & Physics */
    .hero-3d-visual-card, .project-visual-container, .mosaic-project-item, .dossier-card, .filmstrip-card, .spatial-orbit-pod {
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
      will-change: transform;
    }
    .hero-3d-visual-card:hover, .project-visual-container:hover, .mosaic-project-item:hover, .dossier-card:hover, .filmstrip-card:hover, .spatial-orbit-pod:hover {
      box-shadow: 0 16px 36px -10px var(--glow, rgba(56,189,248,0.25));
    }
    `;

    const threeJsLib = (motion?.libraries?.includes('three') || !compositionPlan?.nanoBanana3D?.webglCode)
      ? (motion?.libraries?.includes('three') ? '' : '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>')
      : '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';

    const nanoBananaScript = compositionPlan?.nanoBanana3D?.webglCode || '';

    // Cursor Reactivity & 3D Component Tilt Script
    const cursorInteractionScript = `
    (function initCursorCardTilt() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const interactiveCards = document.querySelectorAll('.hero-3d-visual-card, .project-visual-container, .mosaic-project-item, .dossier-card, .filmstrip-card, .spatial-orbit-pod');
      interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = \`perspective(1000px) rotateX(\${-y * 6}deg) rotateY(\${x * 6}deg) translateY(-2px)\`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
      });
    })();
    `;

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="${visualUniverse?.theme || 'dark'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${safeTagline || safeBio}">
  <title>${safeName} — ${safeRole}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?${visualUniverse?.fontUrls || ''}&display=swap" rel="stylesheet">
  ${threeJsLib}
  ${motion?.libraries || ''}

  <style>
    ${styleContent}
  </style>
</head>
<body class="${topology.rootClass}">
  ${motion?.canvasHtml || ''}
  ${bodyContent}
  <script>
    ${motion?.js || ''}
    ${nanoBananaScript}
    ${cursorInteractionScript}
  </script>
</body>
</html>`;

    return {
      html,
      css: styleContent.trim(),
      js: `${motion?.js || ''}\n${nanoBananaScript}\n${cursorInteractionScript}`.trim()
    };
  }

  /**
   * Helper for Education, Certifications and Footer sections with dynamic morphing classes
   */
  static renderSupportSections(education = [], certifications = [], visual = {}, safeName = 'Author', topologyId = '', iaId = '') {
    const year = new Date().getFullYear();
    let educationHtml = '';
    let certificationsHtml = '';

    const isTerminal = topologyId.includes('terminal') || topologyId.includes('console') || iaId.includes('terminal');
    const isDossier = topologyId.includes('split') || topologyId.includes('rail') || iaId.includes('split');
    const isTimeline = topologyId.includes('timeline') || iaId.includes('timeline');
    const isSpatial = topologyId.includes('spatial') || iaId.includes('spatial') || topologyId.includes('stage');

    if (education.length > 0) {
      const formatEduItem = (e) => {
        const extraParts = [];
        if (e.grade) extraParts.push(e.grade);
        if (e.coursework) extraParts.push(Array.isArray(e.coursework) ? e.coursework.join(', ') : e.coursework);
        if (e.details && !extraParts.includes(e.details)) extraParts.push(e.details);
        return extraParts.join(' • ');
      };

      if (isTerminal) {
        const eduLines = education.map(e => {
          const detail = formatEduItem(e);
          return `
            <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); margin-bottom: 0.75rem;">
              <span style="color: var(--primary);">[ACADEMIC_CREDENTIAL] ${this.escapeHtml(e.degree || e.study || 'Degree')}</span> — ${this.escapeHtml(e.school || e.institution || e.university || 'University')} <span style="color: var(--text-muted);">(${this.escapeHtml(e.period || e.year || '')})</span>
              ${detail ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">&gt; ${this.escapeHtml(detail)}</div>` : ''}
            </div>
          `;
        }).join('');
        educationHtml = `
          <div class="morphed-education-block morphed-terminal-education" style="margin-bottom: 2.5rem; background: var(--surface); border: 1px dashed var(--border); padding: 1.5rem; border-radius: var(--radius);">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">$ query --schema=academic_history</div>
            ${eduLines}
          </div>
        `;
      } else if (isDossier) {
        const eduLines = education.map(e => {
          const detail = formatEduItem(e);
          return `
            <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${detail ? `<div style="font-size: 0.82rem; color: var(--text); margin-top: 4px;">${this.escapeHtml(detail)}</div>` : ''}
            </div>
          `;
        }).join('');
        educationHtml = `
          <div class="morphed-education-block morphed-dossier-education" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase;">ACADEMIC BACKGROUND</div>
            ${eduLines}
          </div>
        `;
      } else if (isTimeline) {
        const eduLines = education.map(e => {
          const detail = formatEduItem(e);
          return `
            <div style="margin-bottom: 1.5rem; padding-left: 1.5rem; border-left: 2px solid var(--primary);">
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="color: var(--text-muted); font-size: 0.9rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${detail ? `<div style="font-size: 0.85rem; color: var(--text); margin-top: 4px;">${this.escapeHtml(detail)}</div>` : ''}
            </div>
          `;
        }).join('');
        educationHtml = `
          <div class="morphed-education-block morphed-timeline-education" style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Academic Foundations</h3>
            ${eduLines}
          </div>
        `;
      } else {
        const eduLines = education.map(e => {
          const detail = formatEduItem(e);
          return `
            <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${detail ? `<div style="font-size: 0.82rem; color: var(--text); margin-top: 4px;">${this.escapeHtml(detail)}</div>` : ''}
            </div>
          `;
        }).join('');
        educationHtml = `
          <div class="morphed-education-block ${isSpatial ? 'morphed-spatial-education' : ''}" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase;">ACADEMIC_HISTORY</div>
            ${eduLines}
          </div>
        `;
      }
    }

    if (certifications.length > 0) {
      if (isTerminal) {
        const certLines = certifications.map(c => `
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); margin-bottom: 0.5rem;">
            <span style="color: var(--primary);">[VERIFIED_KEY] ${this.escapeHtml(c.name || 'Certification')}</span> <span style="color: var(--text-muted);">(${this.escapeHtml(c.issuer || '')})</span>
          </div>
        `).join('');
        certificationsHtml = `
          <div class="morphed-certifications-block morphed-terminal-certifications" style="margin-bottom: 2.5rem; background: var(--surface); border: 1px dashed var(--border); padding: 1.5rem; border-radius: var(--radius);">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">$ verify --credentials=all</div>
            ${certLines}
          </div>
        `;
      } else if (isDossier) {
        const certLines = certifications.map(c => `
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); margin-bottom: 0.5rem;">
            <span style="color: var(--primary);">✓</span> ${this.escapeHtml(c.name || 'Certification')} <span style="color: var(--text-muted); font-size: 0.78rem;">(${this.escapeHtml(c.issuer || '')})</span>
          </div>
        `).join('');
        certificationsHtml = `
          <div class="morphed-certifications-block morphed-dossier-certifications" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase;">VERIFIED CERTIFICATIONS</div>
            ${certLines}
          </div>
        `;
      } else if (isTimeline) {
        const certLines = certifications.map(c => `
          <div style="margin-bottom: 1rem; padding-left: 1.5rem; border-left: 2px solid var(--accent);">
            <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(c.name || 'Certification')}</div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">${this.escapeHtml(c.issuer || '')} • ${this.escapeHtml(c.year || '')}</div>
          </div>
        `).join('');
        certificationsHtml = `
          <div class="morphed-certifications-block morphed-timeline-certifications" style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Accredited Milestones</h3>
            ${certLines}
          </div>
        `;
      } else {
        const certLines = certifications.map(c => `
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            <span style="color: var(--primary);">✓</span> ${this.escapeHtml(c.name || 'Certification')} <span style="color: var(--text-muted); font-size: 0.78rem;">(${this.escapeHtml(c.issuer || '')})</span>
          </div>
        `).join('');
        certificationsHtml = `
          <div class="morphed-certifications-block ${isSpatial ? 'morphed-spatial-certifications' : ''}" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase;">VERIFIED_CREDENTIALS</div>
            ${certLines}
          </div>
        `;
      }
    }

    const footerHtml = CompositionPrimitives.renderContactDock({
      name: safeName,
      year,
      status: 'SYSTEM_ONLINE // 200 OK'
    }, visual);

    return { educationHtml, certificationsHtml, footerHtml };
  }

  /**
   * 🚀 Dedicated Cosmic Astronaut Holographic Developer Studio Renderer
   * Implements the comprehensive 9-section cosmic space developer design system.
   */
  static renderCosmicAstronautLayout(contentProfile, visualUniverse = {}, motion = null, compositionPlan = null) {
    const { TemplateHelper } = require('../templates/template-helper');
    const { ProjectArtworkSynthesizer } = require('../templates/project-artwork-synthesizer');
    const data = TemplateHelper.normalize(contentProfile);

    const safeName = this.escapeHtml(data.name);
    const safeRole = this.escapeHtml(data.role);
    const safeBio = this.escapeHtml(data.bio);
    const safeEmail = this.escapeHtml(data.email);
    const safePhone = this.escapeHtml(data.phone);
    const safeLocation = this.escapeHtml(data.location);
    const safeWebsite = this.escapeHtml(data.website);
    const safeGithub = this.escapeHtml(data.github);
    const safeLinkedin = this.escapeHtml(data.linkedin);
    const safeTwitter = this.escapeHtml(data.twitter);
    const initials = data.initials;

    // 1. Projects Category Mapping & Card Generation with Bespoke 3D Project Artwork
    const categorizedProjects = data.projects.map((p, idx) => ({
      ...p,
      category: p.category || 'Web Apps',
      techDisplay: p.tech,
      index: idx + 1
    }));

    // Unique category filter tabs
    const uniqueCategories = ['All', ...new Set(categorizedProjects.map(p => p.category))];
    const filterPillsHtml = uniqueCategories.map((cat, i) => `
      <button class="cosmic-filter-pill ${i === 0 ? 'active' : ''}" onclick="filterCosmicProjects('${cat.toLowerCase()}', this)">${this.escapeHtml(cat)}</button>
    `).join('');

    const assignedArtworks = new Set([
      '/assets/3d/cosmic_astronaut_3d.jpg'
    ]);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = categorizedProjects.map((p, idx) => `
      <div class="cosmic-card cosmic-project-card" data-category="${p.category.toLowerCase()}" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="cosmic-project-thumbnail" style="height: 180px; position: relative; overflow: hidden; border-radius: 12px; margin-bottom: 16px; border: 1px solid var(--border);">
            <div class="cosmic-project-badge" style="position: absolute; top: 12px; right: 12px; z-index: 2;">${p.category}</div>
            <div class="cosmic-project-thumb-art" style="width: 100%; height: 100%;">
              ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'cosmic-astronaut', idx, assignedArtworks, userSeed)}
            </div>
          </div>
          <h3 class="cosmic-project-title">${this.escapeHtml(p.name || p.title || 'Featured Project')}</h3>
          <p class="cosmic-project-desc">${this.escapeHtml(p.desc || p.description || p.problem || 'Production software system engineered with modern practices.')}</p>
        </div>
        <div>
          <div class="cosmic-project-tech">${this.escapeHtml(p.techDisplay)}</div>
          <div class="cosmic-project-actions">
            ${p.live && p.live !== '#' ? `<a href="${this.escapeHtml(p.live)}" target="_blank" rel="noopener" class="cosmic-btn-sm primary">Live Demo ↗</a>` : ''}
            ${p.github && p.github !== '#' ? `<a href="${this.escapeHtml(p.github)}" target="_blank" rel="noopener" class="cosmic-btn-sm outline">GitHub ↗</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // 2. Skills Bars & Categories
    const skillList = data.skills;
    const skillPercentages = [95, 92, 90, 88, 86, 84, 82, 80, 78, 80, 82, 80];

    const skillBarsHtml = skillList.slice(0, 6).map((sk, idx) => {
      const pct = skillPercentages[idx] || (85 - (idx * 2));
      return `
        <div class="cosmic-skill-meter">
          <div class="cosmic-skill-header">
            <span class="cosmic-skill-name">${this.escapeHtml(sk)}</span>
            <span class="cosmic-skill-pct">${pct}%</span>
          </div>
          <div class="cosmic-meter-track">
            <div class="cosmic-meter-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // 3. Experience Timeline Items
    const experienceTimelineHtml = data.experience.map(e => `
      <div class="cosmic-timeline-item">
        <div class="cosmic-timeline-node"></div>
        <div class="cosmic-timeline-content">
          <div class="cosmic-timeline-period">${this.escapeHtml(e.period || '2023 - Present')}</div>
          <h4 class="cosmic-timeline-role">${this.escapeHtml(e.role || safeRole)}</h4>
          <div class="cosmic-timeline-company">${this.escapeHtml(e.company || 'Professional Engineering')}</div>
          <p class="cosmic-timeline-desc">${this.escapeHtml(e.desc || 'Delivering high-performance software and systems architecture.')}</p>
        </div>
      </div>
    `).join('');

    // 4. Education & Resume Highlights
    const eduPrimary = data.education[0];
    const certList = data.certifications;
    const certsDisplay = certList.map(c => typeof c === 'string' ? c : (c.name || c.title || 'Certified Professional')).join(', ');

    const expYears = data.metrics.yearsExp;
    const projectCount = data.projects.length;
    const techCount = data.skills.length;
    const achievementsCount = data.certifications.length;

    // Dynamic Trait Badges
    const traitList = [];
    const allText = (safeRole + ' ' + safeBio + ' ' + skillList.join(' ')).toLowerCase();
    if (allText.includes('ai') || allText.includes('ml') || allText.includes('vision') || allText.includes('learning')) traitList.push('AI/ML Specialist');
    if (allText.includes('full') || allText.includes('react') || allText.includes('next') || allText.includes('node') || allText.includes('web')) traitList.push('Full Stack Engineer');
    if (allText.includes('block') || allText.includes('solidity') || allText.includes('chain') || allText.includes('web3')) traitList.push('Web3 Developer');
    if (traitList.length < 4) traitList.push('Problem Solver', 'Quick Learner', 'Software Architect');
    const traitPillsHtml = traitList.slice(0, 4).map(t => `<span class="cosmic-trait-pill">${this.escapeHtml(t)}</span>`).join('');

    // Dynamic Blog / Insights Articles
    const blogCardsHtml = data.blogArticles.map(art => `
      <div class="cosmic-blog-card">
        <div>
          <div class="cosmic-blog-art">
            <span style="font-size: 2rem;">${art.icon}</span>
          </div>
          <h3 class="cosmic-blog-title">${this.escapeHtml(art.title)}</h3>
          <p class="cosmic-blog-desc">${this.escapeHtml(art.desc)}</p>
        </div>
        <div class="cosmic-blog-date">${this.escapeHtml(art.tag)}</div>
      </div>
    `).join('');

    // Top skills for orbital constellation
    const topSkills = skillList.slice(0, 7);

    // 5. Motion & Three.js Canvas Scripts
    const motionOutput = motion || WebGLMotion.getMotionCode(visualUniverse, { id: 'cosmic-astronaut-holographic' });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} | ${safeRole}</title>
  <meta name="description" content="${safeBio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${motionOutput.libraries || ''}
  <style>
    :root {
      --bg: #08071a;
      --bg-alt: #0b0924;
      --surface: rgba(18, 16, 44, 0.72);
      --surface-alt: rgba(28, 24, 66, 0.55);
      --surface-card: rgba(18, 16, 44, 0.65);
      --text: #ffffff;
      --text-muted: #94a3b8;
      --border: rgba(139, 92, 246, 0.22);
      --border-strong: #a855f7;
      --primary: #8b5cf6;
      --primary-hover: #a855f7;
      --accent: #38bdf8;
      --glow: rgba(139, 92, 246, 0.45);
      --glow-cyan: rgba(56, 189, 248, 0.35);
      --radius: 20px;
      --radius-sm: 12px;
      --radius-pill: 9999px;
      --font-heading: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg);
      background-image: 
        radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.16) 0%, transparent 45%),
        radial-gradient(circle at 15% 55%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 80% 85%, rgba(168, 85, 247, 0.14) 0%, transparent 45%);
      background-attachment: fixed;
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* Fixed Top Glassmorphic Navigation */
    .cosmic-header {
      position: fixed;
      top: 18px;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }

    .cosmic-header-inner {
      width: 100%;
      max-width: 1120px;
      background: rgba(15, 12, 38, 0.78);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 12px 35px -10px rgba(0, 0, 0, 0.6);
    }

    .cosmic-logo {
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .cosmic-monogram {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 900;
      color: #ffffff;
      background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 4px 8px;
      letter-spacing: -0.04em;
    }

    .cosmic-nav {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .cosmic-nav-link {
      font-family: var(--font-body);
      font-size: 0.92rem;
      font-weight: 500;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s ease, text-shadow 0.2s ease;
      position: relative;
      padding: 4px 0;
    }

    .cosmic-nav-link:hover, .cosmic-nav-link.active {
      color: #ffffff;
      text-shadow: 0 0 12px var(--glow);
    }

    .cosmic-nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #38bdf8, #8b5cf6);
      border-radius: 2px;
      box-shadow: 0 0 8px #8b5cf6;
    }

    .cosmic-talk-btn {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: #ffffff;
      font-family: var(--font-body);
      font-size: 0.88rem;
      font-weight: 700;
      padding: 8px 22px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .cosmic-talk-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(139, 92, 246, 0.6);
    }

    /* Fixed Left Social Dock */
    .cosmic-social-dock {
      position: fixed;
      left: 28px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 999;
    }

    .cosmic-social-rail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }

    .cosmic-social-icon {
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(18, 16, 44, 0.6);
      border: 1px solid var(--border);
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      text-decoration: none;
    }

    .cosmic-social-icon:hover {
      color: #ffffff;
      border-color: var(--primary);
      box-shadow: 0 0 16px var(--glow);
      transform: scale(1.12);
    }

    .cosmic-social-line {
      width: 1px;
      height: 60px;
      background: linear-gradient(180deg, var(--border) 0%, transparent 100%);
    }

    /* Layout & Page Container */
    .cosmic-container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 10;
    }

    /* Section Geometry */
    .cosmic-section {
      padding: 100px 0 60px;
      position: relative;
    }

    .cosmic-section-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .cosmic-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
    }

    .cosmic-section-title {
      font-family: var(--font-heading);
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
    }

    /* Section 01: Hero */
    .cosmic-hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 120px;
      padding-bottom: 60px;
      position: relative;
    }

    .cosmic-hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: 40px;
      width: 100%;
    }

    .cosmic-hero-intro {
      font-family: var(--font-body);
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    .cosmic-hero-title {
      font-family: var(--font-heading);
      font-size: clamp(2.8rem, 6vw, 4.4rem);
      font-weight: 900;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: #ffffff;
      margin-bottom: 12px;
    }

    .cosmic-hero-role {
      font-family: var(--font-heading);
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 18px;
    }

    .cosmic-hero-bio {
      font-size: 1.05rem;
      line-height: 1.7;
      color: var(--text-muted);
      max-width: 540px;
      margin-bottom: 32px;
    }

    .cosmic-hero-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 48px;
    }

    .cosmic-btn-primary {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.98rem;
      padding: 13px 32px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      box-shadow: 0 8px 30px rgba(139, 92, 246, 0.45);
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .cosmic-btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 38px rgba(139, 92, 246, 0.65);
    }

    .cosmic-btn-outline {
      background: rgba(18, 16, 44, 0.6);
      color: #ffffff;
      font-weight: 600;
      font-size: 0.98rem;
      padding: 13px 30px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--border);
      text-decoration: none;
      backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .cosmic-btn-outline:hover {
      border-color: var(--primary);
      box-shadow: 0 0 20px var(--glow);
      transform: translateY(-3px);
    }

    .cosmic-scroll-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted);
      text-decoration: none;
    }

    .cosmic-mouse-icon {
      width: 18px;
      height: 28px;
      border: 2px solid var(--text-muted);
      border-radius: 12px;
      position: relative;
    }

    .cosmic-mouse-wheel {
      width: 3px;
      height: 6px;
      background: var(--accent);
      border-radius: 2px;
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      animation: mouseWheel 1.8s infinite;
    }

    @keyframes mouseWheel {
      0% { top: 4px; opacity: 1; }
      100% { top: 14px; opacity: 0; }
    }

    /* Section 02: About Me */
    .cosmic-about-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 48px;
    }

    .cosmic-about-bio {
      font-size: 1.05rem;
      line-height: 1.75;
      color: var(--text-muted);
      margin-bottom: 28px;
    }

    .cosmic-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 28px;
    }

    .cosmic-stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 16px 12px;
      text-align: center;
      backdrop-filter: blur(16px);
      transition: all 0.25s ease;
    }

    .cosmic-stat-card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 20px var(--glow);
      transform: translateY(-3px);
    }

    .cosmic-stat-num {
      font-family: var(--font-heading);
      font-size: 1.7rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.1;
      margin-bottom: 4px;
    }

    .cosmic-stat-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cosmic-traits-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .cosmic-trait-pill {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 500;
      color: #ffffff;
      background: rgba(139, 92, 246, 0.12);
      border: 1px solid var(--border);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
    }

    .cosmic-about-visual-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 45px rgba(0,0,0,0.5);
    }

    /* Section 03: Projects */
    .cosmic-filter-bar {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .cosmic-filter-pill {
      font-family: var(--font-body);
      font-size: 0.88rem;
      font-weight: 600;
      padding: 8px 20px;
      border-radius: var(--radius-pill);
      background: rgba(18, 16, 44, 0.6);
      border: 1px solid var(--border);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cosmic-filter-pill:hover, .cosmic-filter-pill.active {
      color: #ffffff;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      border-color: #8b5cf6;
      box-shadow: 0 4px 18px rgba(139, 92, 246, 0.45);
    }

    .cosmic-projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
      width: 100%;
    }

    .nano-banana-3d-hero {
      transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    }
    .nano-banana-3d-hero:hover {
      transform: scale(1.03) translateY(-8px);
      border-color: var(--accent) !important;
      box-shadow: 0 30px 65px rgba(0,0,0,0.95), 0 0 60px rgba(139, 92, 246, 0.6) !important;
    }

    @keyframes float3dHero {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(0.8deg); }
    }

    .cosmic-card {
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      backdrop-filter: blur(20px);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .cosmic-card:hover {
      border-color: var(--primary);
      box-shadow: 0 16px 40px -10px rgba(139, 92, 246, 0.35);
      transform: translateY(-4px);
    }

    .cosmic-project-thumbnail {
      width: 100%;
      height: 160px;
      border-radius: var(--radius-sm);
      background: linear-gradient(135deg, rgba(30, 24, 70, 0.7) 0%, rgba(12, 10, 30, 0.9) 100%);
      border: 1px solid rgba(139, 92, 246, 0.15);
      margin-bottom: 18px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .cosmic-project-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      color: #ffffff;
      background: rgba(139, 92, 246, 0.6);
      padding: 3px 10px;
      border-radius: var(--radius-pill);
      backdrop-filter: blur(8px);
    }

    .cosmic-project-title {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .cosmic-project-desc {
      font-size: 0.88rem;
      line-height: 1.6;
      color: var(--text-muted);
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cosmic-project-tech {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--accent);
      margin-bottom: 16px;
    }

    .cosmic-project-actions {
      display: flex;
      gap: 10px;
    }

    .cosmic-btn-sm {
      font-family: var(--font-body);
      font-size: 0.8rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      text-decoration: none;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .cosmic-btn-sm.primary {
      background: var(--primary);
      color: #ffffff;
    }

    .cosmic-btn-sm.primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 0 12px var(--glow);
    }

    .cosmic-btn-sm.outline {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .cosmic-btn-sm.outline:hover {
      color: #ffffff;
      border-color: var(--text-muted);
    }

    /* Section 04: Skills */
    .cosmic-skills-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      align-items: center;
      gap: 48px;
    }

    .cosmic-skills-orbit-stage {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      min-height: 380px;
    }

    .cosmic-skill-meter {
      margin-bottom: 22px;
    }

    .cosmic-skill-header {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-heading);
      font-size: 0.95rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .cosmic-skill-pct {
      font-family: var(--font-mono);
      color: var(--accent);
    }

    .cosmic-meter-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      overflow: hidden;
    }

    .cosmic-meter-fill {
      height: 100%;
      background: linear-gradient(90deg, #38bdf8 0%, #8b5cf6 100%);
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
      transition: width 1s ease;
    }

    /* Section 05: Experience Timeline */
    .cosmic-experience-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: 48px;
    }

    .cosmic-timeline {
      position: relative;
      padding-left: 28px;
    }

    .cosmic-timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(180deg, #38bdf8 0%, #8b5cf6 50%, transparent 100%);
    }

    .cosmic-timeline-item {
      position: relative;
      margin-bottom: 36px;
    }

    .cosmic-timeline-node {
      position: absolute;
      left: -28px;
      top: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid #38bdf8;
      box-shadow: 0 0 10px #38bdf8;
    }

    .cosmic-timeline-period {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--accent);
      background: rgba(56, 189, 248, 0.12);
      display: inline-block;
      padding: 3px 10px;
      border-radius: var(--radius-pill);
      margin-bottom: 8px;
    }

    .cosmic-timeline-role {
      font-family: var(--font-heading);
      font-size: 1.2rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }

    .cosmic-timeline-company {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .cosmic-timeline-desc {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--text-muted);
    }

    /* Section 06: Resume */
    .cosmic-resume-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      align-items: center;
      gap: 48px;
    }

    .cosmic-resume-card-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 16px 20px;
      margin-bottom: 14px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
      backdrop-filter: blur(16px);
      transition: all 0.25s ease;
    }

    .cosmic-resume-card-item:hover {
      border-color: var(--primary);
      transform: translateX(4px);
    }

    .cosmic-resume-icon {
      font-size: 1.3rem;
      color: var(--accent);
    }

    .cosmic-resume-label {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }

    .cosmic-resume-val {
      font-size: 0.88rem;
      color: var(--text-muted);
    }

    /* Section 07: Blog */
    .cosmic-blog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }

    .cosmic-blog-card {
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
    }

    .cosmic-blog-card:hover {
      border-color: var(--primary);
      box-shadow: 0 16px 40px -10px rgba(139, 92, 246, 0.35);
      transform: translateY(-4px);
    }

    .cosmic-blog-art {
      width: 100%;
      height: 140px;
      border-radius: var(--radius-sm);
      background: linear-gradient(135deg, rgba(40, 20, 80, 0.8) 0%, rgba(10, 8, 25, 0.9) 100%);
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cosmic-blog-title {
      font-family: var(--font-heading);
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .cosmic-blog-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .cosmic-blog-date {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    /* Section 08: Contact */
    .cosmic-contact-grid {
      display: grid;
      grid-template-columns: 0.85fr 0.5fr 1fr;
      align-items: center;
      gap: 32px;
    }

    .cosmic-contact-info-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 14px 18px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .cosmic-contact-icon {
      font-size: 1.2rem;
      color: var(--primary);
    }

    .cosmic-contact-label {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .cosmic-contact-val {
      font-size: 0.92rem;
      font-weight: 600;
      color: #ffffff;
    }

    .cosmic-avail-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: #10b981;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-top: 8px;
    }

    .cosmic-avail-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
    }

    .cosmic-contact-form {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      backdrop-filter: blur(20px);
    }

    .cosmic-form-group {
      margin-bottom: 18px;
    }

    .cosmic-input, .cosmic-textarea {
      width: 100%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 12px 16px;
      color: #ffffff;
      font-family: var(--font-body);
      font-size: 0.92rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .cosmic-input:focus, .cosmic-textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 16px var(--glow);
      background: rgba(255, 255, 255, 0.07);
    }

    .cosmic-input::placeholder, .cosmic-textarea::placeholder {
      color: rgba(148, 163, 184, 0.6);
    }

    /* Footer */
    .cosmic-footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 60px;
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
      .cosmic-header-inner { padding: 8px 18px; }
      .cosmic-nav { gap: 18px; }
      .cosmic-social-dock { display: none; }
      .cosmic-projects-grid, .cosmic-blog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 900px) {
      .cosmic-hero-grid, .cosmic-about-grid, .cosmic-skills-grid, .cosmic-experience-grid, .cosmic-resume-grid {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .cosmic-contact-grid {
        grid-template-columns: 1fr;
      }
      .cosmic-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .cosmic-container { padding: 0 16px; }
      .cosmic-nav { display: none; }
      .cosmic-hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .cosmic-btn-primary, .cosmic-btn-outline {
        width: 100%;
        justify-content: center;
        min-height: 48px;
      }
      .cosmic-projects-grid, .cosmic-blog-grid {
        grid-template-columns: 1fr;
      }
      .cosmic-stats-grid {
        grid-template-columns: 1fr;
      }
      .cosmic-filter-bar {
        overflow-x: auto;
        padding-bottom: 8px;
        justify-content: flex-start;
      }
      .cosmic-hero-section {
        padding-top: 100px;
        min-height: auto;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      #webgl-canvas-container { display: none !important; }
    }
  </style>
</head>
<body class="layout-root layout-cosmic-spatial ${compositionPlan?.pageTopology?.rootClass || ''}">

  <!-- Three.js Canvas Container (Hero Astronaut, Ringed Planet & Cosmic Starfield) -->
  ${motionOutput.canvasHtml || '<div id="webgl-canvas-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; opacity: 0.95;"></div>'}

  <!-- Fixed Top Header -->
  <header class="cosmic-header">
    <div class="cosmic-header-inner">
      <a href="#home" class="cosmic-logo">
        <div class="cosmic-monogram">${initials}</div>
      </a>
      <nav class="cosmic-nav">
        <a href="#home" class="cosmic-nav-link active">Home</a>
        <a href="#about" class="cosmic-nav-link">About</a>
        <a href="#projects" class="cosmic-nav-link">Projects</a>
        <a href="#skills" class="cosmic-nav-link">Skills</a>
        <a href="#experience" class="cosmic-nav-link">Experience</a>
        <a href="#contact" class="cosmic-nav-link">Contact</a>
      </nav>
      <a href="#contact" class="cosmic-talk-btn">Let's Talk</a>
    </div>
  </header>

  <!-- Left Floating Social Dock -->
  <aside class="cosmic-social-dock">
    <div class="cosmic-social-rail">
      ${safeGithub ? `<a href="${safeGithub}" target="_blank" rel="noopener" class="cosmic-social-icon" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>` : ''}
      ${safeLinkedin ? `<a href="${safeLinkedin}" target="_blank" rel="noopener" class="cosmic-social-icon" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>` : ''}
      ${safeTwitter ? `<a href="${safeTwitter}" target="_blank" rel="noopener" class="cosmic-social-icon" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>` : ''}
      <a href="mailto:${safeEmail}" class="cosmic-social-icon" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
      <div class="cosmic-social-line"></div>
    </div>
  </aside>

  <!-- Main Flow Container -->
  <div class="cosmic-container">

    <!-- 01. HOME / HERO SECTION -->
    <section id="home" class="cosmic-hero-section">
      <div class="cosmic-hero-grid">
        <div class="cosmic-hero-content">
          <div class="cosmic-hero-intro">Hi, I'm</div>
          <h1 class="cosmic-hero-title">${safeName}</h1>
          <div class="cosmic-hero-role">${safeRole}</div>
          <p class="cosmic-hero-bio">${safeBio}</p>
          <div class="cosmic-hero-actions">
            <a href="#projects" class="cosmic-btn-primary">View My Work</a>
            <a href="#resume" class="cosmic-btn-outline">Download CV</a>
          </div>
          <a href="#about" class="cosmic-scroll-indicator">
            <div class="cosmic-mouse-icon"><div class="cosmic-mouse-wheel"></div></div>
            <span>Scroll Down</span>
          </a>
        </div>
        <div id="hero-astronaut-stage" style="width: 100%; min-height: 420px; position: relative; display: flex; align-items: center; justify-content: center;">
          ${Template3DVisuals.getCosmicHeroArtwork()}
        </div>
      </div>
    </section>

    <!-- 02. ABOUT ME SECTION -->
    <section id="about" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Get to know me better</div>
        <h2 class="cosmic-section-title">About Me</h2>
      </div>
      <div class="cosmic-about-grid">
        <div>
          <p class="cosmic-about-bio">${safeBio}</p>
          <div class="cosmic-stats-grid">
            <div class="cosmic-stat-card">
              <div class="cosmic-stat-num">${expYears}+</div>
              <div class="cosmic-stat-label">Years Experience</div>
            </div>
            <div class="cosmic-stat-card">
              <div class="cosmic-stat-num">${projectCount}+</div>
              <div class="cosmic-stat-label">Projects Built</div>
            </div>
            <div class="cosmic-stat-card">
              <div class="cosmic-stat-num">${techCount}+</div>
              <div class="cosmic-stat-label">Technologies</div>
            </div>
            <div class="cosmic-stat-card">
              <div class="cosmic-stat-num">${achievementsCount}+</div>
              <div class="cosmic-stat-label">Hackathons</div>
            </div>
          </div>
          <div class="cosmic-traits-list">
            ${traitPillsHtml}
          </div>
        </div>
        <div class="cosmic-about-visual-card">
          <!-- 3D Isometric Sci-Fi Command Workstation Pod -->
          <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; filter: drop-shadow(0 12px 32px rgba(139,92,246,0.2));">
            <defs>
              <linearGradient id="pod_base" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e1846" />
                <stop offset="100%" stop-color="#0a081a" />
              </linearGradient>
              <linearGradient id="pod_screen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0f172a" />
                <stop offset="100%" stop-color="#1e1b4b" />
              </linearGradient>
              <linearGradient id="pod_glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#38bdf8" />
              </linearGradient>
            </defs>
            <!-- Outer Chamber Pod Glass Shell -->
            <rect x="15" y="15" width="390" height="250" rx="24" fill="url(#pod_base)" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="10 5" opacity="0.95" />
            <!-- Inner Isometric Desk Platform -->
            <polygon points="50,210 210,245 370,210 210,180" fill="#130e2e" stroke="#38bdf8" stroke-width="1.5" />
            <polygon points="50,210 210,245 210,260 50,225" fill="#090714" />
            <polygon points="210,245 370,210 370,225 210,260" fill="#0c0a20" />
            
            <!-- Left Primary Holographic Terminal Screen -->
            <polygon points="75,80 185,60 185,175 75,190" fill="url(#pod_screen)" stroke="#38bdf8" stroke-width="1.8" />
            <line x1="85" y1="95" x2="175" y2="78" stroke="#8b5cf6" stroke-width="1.5" />
            <text x="85" y="118" fill="#38bdf8" font-family="monospace" font-size="10" font-weight="bold">&gt; CORE: ONLINE [60FPS]</text>
            <text x="85" y="138" fill="#a855f7" font-family="monospace" font-size="9">&gt; AI_ENGINE: ACTIVE</text>
            <text x="85" y="158" fill="#22c55e" font-family="monospace" font-size="9">&gt; QUANTUM_READY: TRUE</text>
            
            <!-- Right Secondary Holographic Screen -->
            <polygon points="225,60 345,80 345,190 225,175" fill="url(#pod_screen)" stroke="#a855f7" stroke-width="1.8" />
            <line x1="235" y1="78" x2="335" y2="95" stroke="#38bdf8" stroke-width="1.5" />
            <!-- Waveform Monitor Bars -->
            <rect x="240" y="110" width="8" height="40" rx="3" fill="#8b5cf6" />
            <rect x="255" y="95" width="8" height="55" rx="3" fill="#38bdf8" />
            <rect x="270" y="120" width="8" height="30" rx="3" fill="#ec4899" />
            <rect x="285" y="105" width="8" height="45" rx="3" fill="#38bdf8" />
            <rect x="300" y="125" width="8" height="25" rx="3" fill="#8b5cf6" />
            
            <!-- Central Command Glowing Crystal Dial / Plant -->
            <polygon points="210,140 228,165 210,190 192,165" fill="url(#pod_glow)" style="filter: drop-shadow(0 0 12px #8b5cf6);" />
            <circle cx="210" cy="165" r="5" fill="#ffffff" />
            <ellipse cx="210" cy="192" rx="16" ry="6" fill="#000000" opacity="0.6" />
          </svg>
        </div>
      </div>
    </section>

    <!-- 03. MY PROJECTS SECTION -->
    <section id="projects" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Things I've built so far</div>
        <h2 class="cosmic-section-title">My Projects</h2>
      </div>
      <div class="cosmic-filter-bar">
        ${filterPillsHtml}
      </div>
      <div class="cosmic-projects-grid">
        ${projectCardsHtml}
      </div>
      <div style="text-align: center;">
        <a href="${safeGithub}" target="_blank" rel="noopener" class="cosmic-btn-primary">View All Projects ↗</a>
      </div>
    </section>

    <!-- 04. MY SKILLS SECTION -->
    <section id="skills" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Technologies and tools I work with</div>
        <h2 class="cosmic-section-title">My Skills</h2>
      </div>
      <div class="cosmic-skills-grid">
        <div class="cosmic-skills-orbit-stage">
          <!-- 3D Multi-Ring Planetary Orbital Tech Constellation -->
          <svg viewBox="0 0 340 340" style="width: 100%; height: 100%; max-height: 340px; filter: drop-shadow(0 0 24px rgba(139,92,246,0.25));">
            <defs>
              <linearGradient id="orb_core_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="50%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#ec4899" />
              </linearGradient>
            </defs>
            <!-- 3D Orbiting Rings with depth tilts -->
            <ellipse cx="170" cy="170" rx="150" ry="60" stroke="rgba(139, 92, 246, 0.35)" stroke-width="1.5" stroke-dasharray="6 4" fill="none" transform="rotate(-25 170 170)" />
            <ellipse cx="170" cy="170" rx="150" ry="60" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.5" stroke-dasharray="6 4" fill="none" transform="rotate(35 170 170)" />
            <circle cx="170" cy="170" r="100" stroke="rgba(168, 85, 247, 0.25)" stroke-width="1" fill="none" />
            
            <!-- Central Glowing AI Core Planet -->
            <circle cx="170" cy="170" r="32" fill="url(#orb_core_grad)" style="filter: drop-shadow(0 0 20px #8b5cf6);" />
            <circle cx="160" cy="158" r="10" fill="#ffffff" opacity="0.3" />
            <text x="170" y="174" fill="#ffffff" font-family="monospace" font-size="11" font-weight="900" text-anchor="middle">${this.escapeHtml((topSkills[0] || 'AI/ML').slice(0, 8))}</text>
            
            <!-- Orbiting Tech Spheres with Neon Borders -->
            <g class="orbit-node-1">
              <circle cx="280" cy="120" r="20" fill="#130e2e" stroke="#38bdf8" stroke-width="2" style="filter: drop-shadow(0 0 10px #38bdf8);" />
              <text x="280" y="124" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle">${this.escapeHtml((topSkills[1] || 'React').slice(0, 7))}</text>
            </g>
            <g class="orbit-node-2">
              <circle cx="60" cy="130" r="20" fill="#130e2e" stroke="#8b5cf6" stroke-width="2" style="filter: drop-shadow(0 0 10px #8b5cf6);" />
              <text x="60" y="134" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle">${this.escapeHtml((topSkills[2] || 'Python').slice(0, 7))}</text>
            </g>
            <g class="orbit-node-3">
              <circle cx="170" cy="45" r="19" fill="#130e2e" stroke="#38bdf8" stroke-width="2" style="filter: drop-shadow(0 0 8px #38bdf8);" />
              <text x="170" y="49" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle">${this.escapeHtml((topSkills[3] || 'Next.js').slice(0, 7))}</text>
            </g>
            <g class="orbit-node-4">
              <circle cx="170" cy="295" r="19" fill="#130e2e" stroke="#ec4899" stroke-width="2" style="filter: drop-shadow(0 0 8px #ec4899);" />
              <text x="170" y="299" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="9" text-anchor="middle">${this.escapeHtml((topSkills[4] || 'FastAPI').slice(0, 7))}</text>
            </g>
            <g class="orbit-node-5">
              <circle cx="295" cy="220" r="17" fill="#130e2e" stroke="#8b5cf6" stroke-width="2" />
              <text x="295" y="224" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">${this.escapeHtml((topSkills[5] || 'Three.js').slice(0, 7))}</text>
            </g>
            <g class="orbit-node-6">
              <circle cx="45" cy="220" r="17" fill="#130e2e" stroke="#38bdf8" stroke-width="2" />
              <text x="45" y="224" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="8" text-anchor="middle">${this.escapeHtml((topSkills[6] || 'Node.js').slice(0, 7))}</text>
            </g>
          </svg>
        </div>
        <div>
          ${skillBarsHtml}
        </div>
      </div>
    </section>

    <!-- 05. EXPERIENCE SECTION -->
    <section id="experience" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">My professional journey</div>
        <h2 class="cosmic-section-title">Experience</h2>
      </div>
      <div class="cosmic-experience-grid">
        <div class="cosmic-timeline">
          ${experienceTimelineHtml}
        </div>
        <div class="cosmic-about-visual-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
          <!-- 3D Shaded Chibi Astronaut Planting User Monogram Flag on Cratered Asteroid -->
          <svg viewBox="0 0 280 280" style="width: 100%; max-width: 260px; height: auto; filter: drop-shadow(0 12px 28px rgba(139,92,246,0.25));">
            <defs>
              <linearGradient id="ast_surf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#231b4a" />
                <stop offset="100%" stop-color="#0e0a24" />
              </linearGradient>
              <linearGradient id="ast_visor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <!-- Cratered Asteroid Surface -->
            <ellipse cx="140" cy="225" rx="110" ry="35" fill="url(#ast_surf)" stroke="#8b5cf6" stroke-width="2" />
            <ellipse cx="90" cy="220" rx="14" ry="6" fill="#0a081a" stroke="rgba(139,92,246,0.4)" stroke-width="1" />
            <ellipse cx="180" cy="235" rx="20" ry="8" fill="#0a081a" stroke="rgba(139,92,246,0.4)" stroke-width="1" />
            <ellipse cx="140" cy="210" rx="8" ry="3" fill="#0a081a" />
            
            <!-- Flag Pole & Custom Monogram Pennant -->
            <line x1="85" y1="210" x2="85" y2="50" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
            <polygon points="85,55 165,75 85,95" fill="url(#ast_visor)" stroke="#ffffff" stroke-width="1.2" style="filter: drop-shadow(0 0 10px #8b5cf6);" />
            <text x="110" y="79" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="900">${initials}</text>
            
            <!-- 3D Chibi Astronaut Suit -->
            <!-- Shadow -->
            <ellipse cx="170" cy="215" rx="22" ry="7" fill="#000000" opacity="0.6" />
            <!-- Legs -->
            <rect x="152" y="175" width="12" height="28" rx="6" fill="#e2e8f0" />
            <rect x="174" y="175" width="12" height="28" rx="6" fill="#cbd5e1" />
            <ellipse cx="158" cy="204" rx="8" ry="4" fill="#94a3b8" />
            <ellipse cx="180" cy="204" rx="8" ry="4" fill="#94a3b8" />
            <!-- Torso / Life Support Pack -->
            <rect x="142" y="130" width="54" height="48" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <rect x="156" y="142" width="26" height="18" rx="4" fill="#1e1b4b" />
            <circle cx="163" cy="151" r="3" fill="#38bdf8" />
            <circle cx="175" cy="151" r="3" fill="#22c55e" />
            <!-- Helmet & Glowing Visor -->
            <circle cx="169" cy="100" r="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" />
            <ellipse cx="175" cy="98" rx="18" ry="14" fill="url(#ast_visor)" style="filter: drop-shadow(0 0 8px #38bdf8);" />
            <ellipse cx="170" cy="94" rx="6" ry="3" fill="#ffffff" opacity="0.6" />
            <!-- Arm Planting Flag -->
            <path d="M 144,142 Q 110,135 88,145" fill="none" stroke="#e2e8f0" stroke-width="10" stroke-linecap="round" />
          </svg>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent); margin-top: 14px; font-weight: bold; letter-spacing: 1px;">MISSION_LOG // ACTIVE PROGRESSION</div>
        </div>
      </div>
    </section>

    <!-- 06. MY RESUME SECTION -->
    <section id="resume" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Download or view my complete resume</div>
        <h2 class="cosmic-section-title">My Resume</h2>
      </div>
      <div class="cosmic-resume-grid">
        <div class="cosmic-about-visual-card" style="display: flex; align-items: center; justify-content: center; min-height: 340px; background: transparent; border: none;">
          ${Template3DVisuals.getHolographicResume3DArtwork(safeName)}
        </div>
        <div>
          <div class="cosmic-resume-card-item">
            <div class="cosmic-resume-icon">🎓</div>
            <div>
              <div class="cosmic-resume-label">Education</div>
              <div class="cosmic-resume-val">${this.escapeHtml(eduPrimary.degree || 'B.Tech in Computer Science')} • ${this.escapeHtml(eduPrimary.institution || 'Engineering College')} ${eduPrimary.grade ? `• ${this.escapeHtml(eduPrimary.grade)}` : ''}</div>
            </div>
          </div>
          <div class="cosmic-resume-card-item">
            <div class="cosmic-resume-icon">💼</div>
            <div>
              <div class="cosmic-resume-label">Experience</div>
              <div class="cosmic-resume-val">${expYears}+ Years in ${this.escapeHtml(skillList.slice(0, 3).join(', ') || 'Web Development, AI & Blockchain')}</div>
            </div>
          </div>
          <div class="cosmic-resume-card-item">
            <div class="cosmic-resume-icon">🚀</div>
            <div>
              <div class="cosmic-resume-label">Projects</div>
              <div class="cosmic-resume-val">${projectCount}+ Completed Production Systems & Tooling</div>
            </div>
          </div>
          <div class="cosmic-resume-card-item">
            <div class="cosmic-resume-icon">🏆</div>
            <div>
              <div class="cosmic-resume-label">Achievements & Certifications</div>
              <div class="cosmic-resume-val">${certsDisplay ? this.escapeHtml(certsDisplay) : `${achievementsCount}+ Hackathons, Open Source Contributions & Awards`}</div>
            </div>
          </div>
          <div style="display: flex; gap: 14px; margin-top: 24px; flex-wrap: wrap;">
            <a href="resume.pdf" download="${safeName}_Resume.pdf" target="_blank" class="cosmic-btn-primary">Download PDF ↓</a>
            <a href="${safeWebsite}" target="_blank" rel="noopener" class="cosmic-btn-outline">View Online ↗</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 07. MY BLOG / INSIGHTS SECTION -->
    <section id="blog" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Thoughts, tutorials and insights</div>
        <h2 class="cosmic-section-title">My Blog</h2>
      </div>
      <div class="cosmic-blog-grid">
        ${blogCardsHtml}
      </div>
      <div style="text-align: center;">
        <a href="${safeGithub}" target="_blank" rel="noopener" class="cosmic-btn-primary">View All Articles ↗</a>
      </div>
    </section>

    <!-- 08. LET'S CONNECT (CONTACT) SECTION -->
    <section id="contact" class="cosmic-section">
      <div class="cosmic-section-header">
        <div class="cosmic-eyebrow">Have a project in mind? Let's talk!</div>
        <h2 class="cosmic-section-title">Let's Connect</h2>
      </div>
      <div class="cosmic-contact-grid">
        <div>
          ${safeEmail ? `
          <div class="cosmic-contact-info-card">
            <div class="cosmic-contact-icon">✉️</div>
            <div>
              <div class="cosmic-contact-label">Email</div>
              <div class="cosmic-contact-val"><a href="mailto:${safeEmail}" style="color: inherit; text-decoration: none;">${safeEmail}</a></div>
            </div>
          </div>` : ''}
          ${safePhone ? `
          <div class="cosmic-contact-info-card">
            <div class="cosmic-contact-icon">📞</div>
            <div>
              <div class="cosmic-contact-label">Phone</div>
              <div class="cosmic-contact-val">${safePhone}</div>
            </div>
          </div>` : ''}
          <div class="cosmic-contact-info-card">
            <div class="cosmic-contact-icon">📍</div>
            <div>
              <div class="cosmic-contact-label">Location</div>
              <div class="cosmic-contact-val">${safeLocation || 'Remote / Worldwide'}</div>
            </div>
          </div>
          <div class="cosmic-avail-badge">
            <div class="cosmic-avail-dot"></div>
            <span>Open for opportunities</span>
          </div>
        </div>
        <div style="text-align: center; display: flex; align-items: center; justify-content: center;">
          <!-- 3D Deep-Space Satellite Dish Emitter -->
          <svg viewBox="0 0 200 200" style="width: 100%; max-width: 180px; height: auto; filter: drop-shadow(0 0 20px rgba(56,189,248,0.3));">
            <defs>
              <linearGradient id="dish_metal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1e1b4b" />
                <stop offset="100%" stop-color="#0a071d" />
              </linearGradient>
            </defs>
            <!-- Heavy Base Stand -->
            <polygon points="40,175 160,175 140,190 60,190" fill="#0f0c24" stroke="#8b5cf6" stroke-width="1.5" />
            <line x1="100" y1="175" x2="100" y2="115" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
            
            <!-- Parabolic Dish -->
            <ellipse cx="100" cy="95" rx="65" ry="32" fill="url(#dish_metal)" stroke="#8b5cf6" stroke-width="2.5" transform="rotate(-20 100 95)" />
            <ellipse cx="100" cy="95" rx="42" ry="20" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 3" transform="rotate(-20 100 95)" />
            
            <!-- Central Feed Horn & Glowing Cyan Emitter -->
            <line x1="95" y1="90" x2="125" y2="45" stroke="#38bdf8" stroke-width="3" />
            <circle cx="125" cy="45" r="7" fill="#38bdf8" style="filter: drop-shadow(0 0 12px #38bdf8);" />
            <circle cx="125" cy="45" r="3" fill="#ffffff" />
            
            <!-- Concentric Signal Emission Arcs -->
            <path d="M 138,32 A 22 22 0 0 1 158,60" stroke="#38bdf8" stroke-width="2.5" fill="none" opacity="0.9" />
            <path d="M 150,20 A 38 38 0 0 1 180,68" stroke="#8b5cf6" stroke-width="2" fill="none" opacity="0.6" />
            <path d="M 162,8 A 54 54 0 0 1 200,75" stroke="#ec4899" stroke-width="1.5" fill="none" opacity="0.4" />
          </svg>
        </div>
        <div>
          <form class="cosmic-contact-form">
            <div class="cosmic-form-group">
              <input type="text" name="name" class="cosmic-input" placeholder="Your Name" required>
            </div>
            <div class="cosmic-form-group">
              <input type="email" name="email" class="cosmic-input" placeholder="Your Email" required>
            </div>
            <div class="cosmic-form-group">
              <input type="text" name="subject" class="cosmic-input" placeholder="Subject">
            </div>
            <div class="cosmic-form-group">
              <textarea name="message" class="cosmic-textarea" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="cosmic-btn-primary" style="width: 100%; justify-content: center;">Send Message ➔</button>
          </form>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="cosmic-footer">
      <div>© ${new Date().getFullYear()} ${safeName}. Engineered with AI & Cosmic Space Architecture.</div>
    </footer>

  </div>

  <!-- Interactive Client-side Filter & Navigation Scripts -->
  <script>
    // Project Category Filtering
    function filterCosmicProjects(category, button) {
      document.querySelectorAll('.cosmic-filter-pill').forEach(btn => btn.classList.remove('active'));
      if (button) button.classList.add('active');

      const cards = document.querySelectorAll('.cosmic-project-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || (cardCat && cardCat.toLowerCase() === category.toLowerCase())) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // Interactive Contact Form Handling
    const cosmicForm = document.querySelector('.cosmic-contact-form');
    if (cosmicForm) {
      cosmicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = cosmicForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = 'Message Sent! ✓';
          submitBtn.style.background = '#22c55e';
          submitBtn.style.color = '#ffffff';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            cosmicForm.reset();
          }, 3000);
        }
      });
    }

    // Active Navigation Highlighting on Scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;

      sections.forEach(sec => {
        const sectionHeight = sec.offsetHeight;
        const sectionTop = sec.offsetTop - 150;
        const sectionId = sec.getAttribute('id');
        const navLink = document.querySelector('.cosmic-nav a[href="#' + sectionId + '"]');

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
          } else {
            navLink.classList.remove('active');
          }
        }
      });
    });
  </script>
  ${motionOutput.js ? `<script>${motionOutput.js}</script>` : ''}
</body>
</html>`;

    // Inject Universal GSAP ScrollTrigger Motion
    const { UniversalScrollMotion } = require('./universal-scroll-motion');
    const universeId = blueprint?.visualUniverse?.id || 'cosmic-astronaut';
    html = UniversalScrollMotion.injectScrollMotion(html, universeId);

    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const extractedCss = styleMatch ? styleMatch[1].trim() : '';

    return {
      html,
      css: extractedCss,
      js: motionOutput.js || ''
    };
  }

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

module.exports = { HtmlRenderer, SectionRendererRegistry };

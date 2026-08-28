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
      if (isTerminal) {
        const eduLines = education.map(e => {
          const coursework = e.coursework ? (Array.isArray(e.coursework) ? e.coursework.join(', ') : e.coursework) : '';
          return `
            <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); margin-bottom: 0.75rem;">
              <span style="color: var(--primary);">[ACADEMIC_CREDENTIAL] ${this.escapeHtml(e.degree || e.study || 'Degree')}</span> — ${this.escapeHtml(e.school || e.institution || e.university || 'University')} <span style="color: var(--text-muted);">(${this.escapeHtml(e.period || e.year || '')})</span>
              ${coursework ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">&gt; COURSEWORK: ${this.escapeHtml(coursework)}</div>` : ''}
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
          const coursework = e.coursework ? (Array.isArray(e.coursework) ? e.coursework.join(', ') : e.coursework) : '';
          return `
            <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${coursework ? `<div style="font-size: 0.82rem; color: var(--text); margin-top: 4px;">Coursework: ${this.escapeHtml(coursework)}</div>` : ''}
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
          const coursework = e.coursework ? (Array.isArray(e.coursework) ? e.coursework.join(', ') : e.coursework) : '';
          return `
            <div style="margin-bottom: 1.5rem; padding-left: 1.5rem; border-left: 2px solid var(--primary);">
              <div style="font-weight: 800; font-size: 1.1rem; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="color: var(--text-muted); font-size: 0.9rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${coursework ? `<div style="font-size: 0.85rem; color: var(--text); margin-top: 4px;">Focus: ${this.escapeHtml(coursework)}</div>` : ''}
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
          const coursework = e.coursework ? (Array.isArray(e.coursework) ? e.coursework.join(', ') : e.coursework) : '';
          return `
            <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
              <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
              <div style="font-size: 0.88rem; color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
              ${coursework ? `<div style="font-size: 0.82rem; color: var(--text); margin-top: 4px;">Coursework: ${this.escapeHtml(coursework)}</div>` : ''}
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

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

module.exports = { HtmlRenderer, SectionRendererRegistry };

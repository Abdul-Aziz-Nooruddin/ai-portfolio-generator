/**
 * Central Template Registry & Portfolio Generation Dispatcher
 * Houses the universal default 3D Creator & Engineer Template ('jack-3d-creator'),
 * handles dynamic content replacement, and orchestrates template dispatch across
 * WhatsApp, Web Studio, and API channels.
 */

const { Jack3DCreatorTemplate } = require('./jack-3d-creator');
const { NadiaBrandTemplate } = require('./nadia-brand');

class TemplateRegistry {
  static _templates = {
    'jack-3d-creator': Jack3DCreatorTemplate,
    '3d-creator': Jack3DCreatorTemplate,
    'nadia-brand': NadiaBrandTemplate,
    'nadia-personal-brand': NadiaBrandTemplate
  };

  static templates = new Proxy(TemplateRegistry._templates, {
    get(target, prop) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop];
      }
      if (typeof prop === 'string' && prop !== 'prototype' && prop !== '__proto__') {
        return target['jack-3d-creator'];
      }
      return target[prop];
    },
    has(target, prop) {
      return true;
    },
    ownKeys(target) {
      return Object.keys(target);
    },
    getOwnPropertyDescriptor(target, prop) {
      return Object.getOwnPropertyDescriptor(target, prop) || {
        value: target['jack-3d-creator'],
        writable: true,
        enumerable: false,
        configurable: true
      };
    }
  });

  static defaultTemplateId = 'jack-3d-creator';
  static _cycleIndex = 0;
  static _userHistory = {};

  /**
   * Get template by ID
   */
  static getTemplate(id) {
    if (!id) return this.templates[this.defaultTemplateId];
    return this.templates[id] || this.templates[this.defaultTemplateId];
  }

  // Active curated visual templates present in Web Studio
  static studioTemplateIds = [
    'jack-3d-creator',
    'nadia-brand'
  ];

  /**
   * Get active templates curated for the Web Studio
   */
  static getStudioTemplates() {
    return this.studioTemplateIds
      .map(id => this.templates[id])
      .filter(Boolean)
      .map(t => ({
        id: t.id,
        name: t.name,
        category: t.category,
        description: t.description,
        thumbnail: t.thumbnail,
        palette: t.palette,
        recommendedFor: t.recommendedFor
      }));
  }

  /**
   * Get count of active Web Studio templates
   */
  static getStudioTemplateCount() {
    return this.studioTemplateIds.filter(id => Boolean(this.templates[id])).length;
  }

  /**
   * Get all registered templates with metadata
   */
  static getAllTemplates() {
    return Object.values(this._templates)
      .filter((t, idx, arr) => arr.findIndex(x => x.id === t.id) === idx)
      .map(t => ({
        id: t.id,
        name: t.name,
        category: t.category,
        description: t.description,
        thumbnail: t.thumbnail,
        palette: t.palette,
        recommendedFor: t.recommendedFor
      }));
  }

  /**
   * Universal template selector — routes to Jack 3D Creator or Nadia Personal Brand
   */
  static selectTemplate(requestedId = null, candidateProfile = null, userId = null) {
    if (requestedId && this._templates[requestedId]) {
      return this._templates[requestedId];
    }
    const role = (candidateProfile?.role || candidateProfile?.title || '').toLowerCase();
    if (role.includes('speaker') || role.includes('advisor') || role.includes('writer') || role.includes('author') || role.includes('consultant')) {
      return this._templates['nadia-brand'];
    }
    return this._templates['jack-3d-creator'];
  }

  /**
   * Universal Mobile Responsive CSS — injected into every template at render time.
   * Fixes oversized hero headings, bio text, section titles, and section padding
   * on mobile screens (≤600px) without touching individual template files.
   */
  static getMobileCSS() {
    return `
<style id="myfolio-universal-mobile">
  /* ─── Universal Mobile Override ≤600px ─────────────────────────────────── */
  @media (max-width: 600px) {
    /* Reset base font size so rem units scale down */
    html { font-size: 14px !important; }

    /* Hero headline — cap at a safe mobile size */
    h1,
    [class*="hero-headline"], [class*="hero-h1"], [class*="hero-title"],
    [class*="masthead"], [class*="main-title"], [class*="display-title"],
    [class*="hero-name"], [class*="page-title"], [class*="folio-name"],
    [class*="profile-name"] {
      font-size: clamp(1.6rem, 7vw, 2.4rem) !important;
      line-height: 1.15 !important;
      letter-spacing: -0.02em !important;
    }

    /* Section headings */
    h2, [class*="section-title"], [class*="section-heading"],
    [class*="chapter-title"], [class*="block-title"] {
      font-size: clamp(1.25rem, 5.5vw, 1.8rem) !important;
      line-height: 1.2 !important;
    }

    h3, [class*="card-title"], [class*="project-name"],
    [class*="exp-title"], [class*="role-title"] {
      font-size: clamp(1rem, 4.5vw, 1.35rem) !important;
    }

    /* Body / bio text */
    p, [class*="bio"], [class*="hero-bio"], [class*="subtitle"],
    [class*="intro-text"], [class*="description"], [class*="lead"] {
      font-size: clamp(0.8rem, 3.5vw, 1rem) !important;
      line-height: 1.65 !important;
    }

    /* Tag / badge / mono accent text */
    [class*="tag"], [class*="badge"], [class*="chip"], [class*="label"],
    [class*="kicker"], [class*="mono"], code, pre {
      font-size: clamp(0.65rem, 2.5vw, 0.8rem) !important;
    }

    /* Section padding — prevent edges being clipped on main sections */
    section, .portfolio-section, [class*="section-container"],
    [class*="page-wrapper"], [class*="content-wrapper"], [class*="main-layout"] {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    /* Hero top-level containers — reduce vertical breathing room without polluting inner elements */
    section[class*="hero"], [class*="hero-section"], [class*="hero-stage"], [class*="hero-viewport"], [id="home"] {
      padding-top: 48px !important;
      padding-bottom: 24px !important;
      min-height: auto !important;
    }

    /* Force single-column grids everywhere */
    [style*="grid-template-columns"],
    [class*="grid"]:not(.glyphs):not(.proj-links), [class*="bento"], [class*="dual"],
    [class*="tri-layout"], [class*="two-col"], [class*="three-col"] {
      grid-template-columns: 1fr !important;
    }

    /* Navigation — hide multi-item desktop navs, show only brand */
    [class*="nav-menu"], [class*="header-nav"], [class*="dock"],
    [class*="vertical-dock"], [class*="sidebar-nav"] {
      display: none !important;
    }

    /* Primary CTA buttons — stack cleanly without breaking controls or tags */
    [class*="action-row"], [class*="btn-group"], [class*="cta-row"] {
      flex-direction: column !important;
      gap: 12px !important;
    }
    [class*="cta-btn"], [class*="sprawl-btn"], [class*="hero-btn"],
    .primary-generate-btn {
      width: 100% !important;
      justify-content: center !important;
      padding: 12px 20px !important;
      font-size: 0.82rem !important;
    }

    /* Project / card images */
    [class*="card-img"], [class*="project-img"], [class*="project-image"],
    [class*="artwork"], [class*="thumbnail"] {
      height: 160px !important;
    }

    /* Skill / telemetry numbers — prevent overflow */
    [class*="stat-num"], [class*="metric-value"], [class*="counter"],
    [class*="number-display"] {
      font-size: clamp(1.4rem, 6vw, 2rem) !important;
    }

    /* 404 hero numbers */
    [class*="404"], [class*="error-code"] {
      font-size: clamp(4rem, 20vw, 7rem) !important;
    }

    /* Floating 3D assets — reduce to prevent layout blowout */
    [class*="hero-3d"], [class*="focal-asset"], [class*="floating-asset"],
    [class*="hero-img"], [class*="hero-visual"] {
      max-width: 260px !important;
      width: 70vw !important;
      margin: 24px auto 0 !important;
    }

    /* Canvas backgrounds — don't overflow */
    canvas {
      max-width: 100vw !important;
    }

    /* Footer */
    [class*="footer"] {
      flex-direction: column !important;
      gap: 12px !important;
      padding: 24px 16px !important;
      text-align: center !important;
      font-size: 0.72rem !important;
    }
  }

  /* ─── Tablet override ≤768px ────────────────────────────────────────────── */
  @media (max-width: 768px) {
    html { font-size: 15px !important; }

    h1,
    [class*="hero-headline"], [class*="hero-h1"], [class*="hero-title"],
    [class*="masthead"], [class*="main-title"], [class*="display-title"] {
      font-size: clamp(2rem, 6vw, 3rem) !important;
    }

    h2, [class*="section-title"], [class*="section-heading"] {
      font-size: clamp(1.4rem, 4.5vw, 2rem) !important;
    }

    section, [class*="section"], [class*="-section"] {
      padding-left: 24px !important;
      padding-right: 24px !important;
    }

    [class*="grid"], [class*="bento"],
    [class*="tri-layout"], [class*="three-col"] {
      grid-template-columns: 1fr !important;
    }

    [class*="two-col"], [class*="dual"] {
      grid-template-columns: 1fr !important;
    }
  }

  /* ─── Reduced-motion: disable floating keyframes ───────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>`;
  }

  /**
   * Authoritative Render Method: Replaces all template placeholders with candidate data
   * and automatically injects 60-120 FPS GSAP ScrollTrigger animations.
   */
  static render(templateId, candidateProfile, options = {}) {
    const template = this.getTemplate(templateId);
    const result = template.render(candidateProfile, options);
    let html = typeof result === 'string' ? result : (result.html || '');
    let css = result.css || '';
    if (!css && html) {
      const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      if (match) css = match[1].trim();
    }

    // Automatically inject Universal GSAP ScrollTrigger Motion Engine
    try {
      const { UniversalScrollMotion } = require('../design-engine/universal-scroll-motion');
      html = UniversalScrollMotion.injectScrollMotion(html, templateId || 'jack-3d-creator');
    } catch (e) {
      // Graceful fallback if universal-scroll-motion is optional
    }

    // Automatically inject official myfolio favicon if missing
    if (html && !html.includes('rel="icon"')) {
      html = html.replace('</head>', '  <link rel="icon" type="image/png" href="/assets/favicon.png">\n  <link rel="apple-touch-icon" href="/assets/favicon.png">\n</head>');
    }

    // Inject universal mobile responsive CSS into template
    if (html && html.includes('</body>')) {
      html = html.replace('</body>', `${TemplateRegistry.getMobileCSS()}\n</body>`);
    }

    return {
      html,
      css,
      js: result.js || ''
    };
  }

  /**
   * Render Dedicated 404 Error State Page
   */
  static render404Page(siteId = '', candidateProfile = {}) {
    return Jack3DCreatorTemplate.render404Page(siteId, candidateProfile);
  }
}

module.exports = new Proxy({
  TemplateRegistry,
  Jack3DCreatorTemplate
}, {
  get(target, prop) {
    if (prop in target) return target[prop];
    if (typeof prop === 'string' && prop.endsWith('Template')) {
      return Jack3DCreatorTemplate;
    }
    return target[prop];
  }
});

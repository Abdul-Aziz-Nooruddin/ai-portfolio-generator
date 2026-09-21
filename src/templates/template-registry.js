/**
 * Central Template Registry & Portfolio Generation Dispatcher
 * Houses all 5 visual portfolio templates, handles dynamic content replacement,
 * and orchestrates template selection across WhatsApp, Web Studio, and API channels.
 */

const { CosmicAstronautTemplate } = require('./cosmic-astronaut');
const { CyberCrystalTemplate } = require('./cyber-crystal');
const { BioluminescentWireframeTemplate } = require('./bioluminescent-wireframe');
const { BotanicalWoodcraftTemplate } = require('./botanical-woodcraft');
const { BioDigitalFusionTemplate } = require('./bio-digital-fusion');
const { EcoTechSteampunkTemplate } = require('./eco-tech-steampunk');
const { EmeraldCyberSanctuaryTemplate } = require('./emerald-cyber-sanctuary');
const { PristineWhiteCrystalTemplate } = require('./pristine-white-crystal');
const { AbyssalQuantumJellyfishTemplate } = require('./abyssal-quantum-jellyfish');
const { MahoganyBrassSteampunkTemplate } = require('./mahogany-brass-steampunk');
const { LavenderCyberBridgeTemplate } = require('./lavender-cyber-bridge');
const { SandParchmentBotanicalTemplate } = require('./sand-parchment-botanical');
const { SystemAwakeningTemplate } = require('./system-awakening');
const { EngineeringArchiveTemplate } = require('./engineering-archive');
const { CosmicCyberGeometryTemplate } = require('./cosmic-cyber-geometry');
const { StellarArchitectTemplate } = require('./stellar-architect');
const { AbyssalAscentTemplate } = require('./abyssal-ascent');
const { StealthNodeTemplate } = require('./stealth-node');
const { KineticBrutalismTemplate } = require('./kinetic-brutalism');
const { CircuitCoreTemplate } = require('./circuit-core');
const { NeonAuroraCyberTemplate } = require('./neon-aurora-cyber');
const { ChronoObsidianSanctuaryTemplate } = require('./chrono-obsidian-sanctuary');
const { SwissEditorialMonographTemplate } = require('./swiss-editorial-monograph');
const { SolarpunkHorizonTemplate } = require('./solarpunk-horizon');
const { CyberArchitectSprawlTemplate } = require('./cyber-architect-sprawl');
const { SpatialDepthVoyageTemplate } = require('./spatial-depth-voyage');
const { ThreeUIConstellationTemplate } = require('./threeui-constellation');
const { ThreeUILiquidMetalTemplate } = require('./threeui-liquid-metal');
const { ThreeUIMatrixTemplate } = require('./threeui-matrix');
const { ThreeUIShelfTemplate } = require('./threeui-shelf');
const { ThreeUISylvaTemplate } = require('./threeui-sylva');
const { ThreeUIKageTemplate } = require('./threeui-kage');
const { ThreeUISketchbookTemplate } = require('./threeui-sketchbook');
const { ThreeUILandscapeTemplate } = require('./threeui-landscape');
const { Mesh3DTerminalConsoleTemplate } = require('./mesh3d-terminal-console');
const { PalmoPureWeb3Template } = require('./palmo-pure-web3');

class TemplateRegistry {
  static templates = {
    'palmo-pure-web3': PalmoPureWeb3Template,
    'mesh3d-terminal-console': Mesh3DTerminalConsoleTemplate,
    'threeui-shelf': ThreeUIShelfTemplate,
    'threeui-sylva': ThreeUISylvaTemplate,
    'threeui-kage': ThreeUIKageTemplate,
    'threeui-sketchbook': ThreeUISketchbookTemplate,
    'threeui-landscape': ThreeUILandscapeTemplate,
    'threeui-constellation': ThreeUIConstellationTemplate,
    'threeui-liquid-metal': ThreeUILiquidMetalTemplate,
    'threeui-matrix': ThreeUIMatrixTemplate,
    'spatial-depth-voyage': SpatialDepthVoyageTemplate,
    'cyber-architect-sprawl': CyberArchitectSprawlTemplate,
    'swiss-editorial-monograph': SwissEditorialMonographTemplate,
    'solarpunk-horizon': SolarpunkHorizonTemplate,
    'chrono-obsidian-sanctuary': ChronoObsidianSanctuaryTemplate,
    'neon-aurora-cyber': NeonAuroraCyberTemplate,
    'circuit-core': CircuitCoreTemplate,
    'kinetic-brutalism': KineticBrutalismTemplate,
    'stealth-node': StealthNodeTemplate,
    'abyssal-ascent': AbyssalAscentTemplate,
    'stellar-architect': StellarArchitectTemplate,
    'cosmic-cyber-geometry': CosmicCyberGeometryTemplate,
    'engineering-archive': EngineeringArchiveTemplate,
    'system-awakening': SystemAwakeningTemplate,
    'eco-tech-steampunk': EcoTechSteampunkTemplate,
    'cosmic-astronaut': CosmicAstronautTemplate,
    'cyber-crystal': CyberCrystalTemplate,
    'bioluminescent-wireframe': BioluminescentWireframeTemplate,
    'botanical-woodcraft': BotanicalWoodcraftTemplate,
    'bio-digital-fusion': BioDigitalFusionTemplate,
    'emerald-cyber-sanctuary': EmeraldCyberSanctuaryTemplate,
    'pristine-white-crystal': PristineWhiteCrystalTemplate,
    'abyssal-quantum-jellyfish': AbyssalQuantumJellyfishTemplate,
    'mahogany-brass-steampunk': MahoganyBrassSteampunkTemplate,
    'lavender-cyber-bridge': LavenderCyberBridgeTemplate,
    'sand-parchment-botanical': SandParchmentBotanicalTemplate
  };

  static defaultTemplateId = 'eco-tech-steampunk';
  static _cycleIndex = 0;
  // Tracks used templates per user to avoid repeats
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
    'threeui-shelf',
    'threeui-sylva',
    'threeui-kage',
    'threeui-constellation',
    'threeui-liquid-metal',
    'threeui-matrix',
    'threeui-sketchbook',
    'threeui-landscape',
    'spatial-depth-voyage'
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
    return Object.values(this.templates).map(t => ({
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
   * Intelligent template selector based on user request, candidate role, or non-repeating cycle
   */
  static selectTemplate(requestedId = null, candidateProfile = null, userId = null) {
    // If a specific template is requested and exists, return it directly
    if (requestedId && this.templates[requestedId]) {
      return this.templates[requestedId];
    }

    // Role‑based heuristic – still respects explicit request
    if (candidateProfile && candidateProfile.role) {
      const r = candidateProfile.role.toLowerCase();
      if (r.includes('spatial') || r.includes('3d') || r.includes('webgl') || r.includes('depth') || r.includes('flythrough') || r.includes('creative technologist')) {
        return this.templates['spatial-depth-voyage'];
      }
      if (r.includes('cyber-architect') || r.includes('sprawl') || r.includes('sentient') || r.includes('ava chen')) {
        return this.templates['cyber-architect-sprawl'];
      }
      if (r.includes('editorial') || r.includes('monograph') || r.includes('swiss') || r.includes('director') || r.includes('haute') || r.includes('typography')) {
        return this.templates['swiss-editorial-monograph'];
      }
      if (r.includes('solarpunk') || r.includes('solar') || r.includes('climate') || r.includes('clean energy') || r.includes('sustainable')) {
        return this.templates['solarpunk-horizon'];
      }
      if (r.includes('obsidian') || r.includes('sanctuary') || r.includes('robotic') || r.includes('stonecraft') || r.includes('amber')) {
        return this.templates['chrono-obsidian-sanctuary'];
      }
      if (r.includes('steampunk') || r.includes('eco-tech') || r.includes('vintage') || r.includes('nature') || r.includes('organic')) {
        return this.templates['eco-tech-steampunk'];
      }
      if (r.includes('eco') || r.includes('sustain') || r.includes('green') || r.includes('bio') || r.includes('agri')) {
        return this.templates['bioluminescent-wireframe'];
      }
      if (r.includes('design') || r.includes('wood') || r.includes('craft') || r.includes('art') || r.includes('botan')) {
        return this.templates['botanical-woodcraft'];
      }
      if (r.includes('crystal') || r.includes('game') || r.includes('purple') || r.includes('cyber')) {
        return this.templates['cyber-crystal'];
      }
      if (r.includes('ai') || r.includes('space') || r.includes('cosmic') || r.includes('full stack') || r.includes('cloud')) {
        return this.templates['cosmic-astronaut'];
      }
    }

    // Non‑repeating per‑user cycle
    if (userId) {
      if (!this._userHistory[userId]) {
        this._userHistory[userId] = [];
      }
      const used = new Set(this._userHistory[userId]);
      const keys = Object.keys(this.templates).filter(k => !used.has(k));
      if (keys.length === 0) {
        // All templates used – reset history for this user
        this._userHistory[userId] = [];
        return this.selectTemplate(requestedId, candidateProfile, userId);
      }
      const selectedKey = keys[0]; // pick the first unused template
      this._userHistory[userId].push(selectedKey);
      return this.templates[selectedKey];
    }

    // Fallback global cycle (original behaviour)
    const keys = Object.keys(this.templates);
    const selectedKey = keys[this._cycleIndex % keys.length];
    this._cycleIndex++;
    return this.templates[selectedKey];
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
   * and automatically injects 60-120 FPS GSAP ScrollTrigger animations into every template.
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
    const { UniversalScrollMotion } = require('../design-engine/universal-scroll-motion');
    html = UniversalScrollMotion.injectScrollMotion(html, templateId);

    // Automatically inject official myfolio favicon if missing
    if (html && !html.includes('rel="icon"')) {
      html = html.replace('</head>', '  <link rel="icon" type="image/png" href="/assets/favicon.png">\n  <link rel="apple-touch-icon" href="/assets/favicon.png">\n</head>');
    }

    // Inject universal mobile responsive CSS into every template
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
    const fs = require('fs');
    const path = require('path');

    const targetTemplate = candidateProfile.templateId || '';
    if (targetTemplate === 'cyber-architect-sprawl' || siteId === 'cyber-architect-sprawl') {
      return CyberArchitectSprawlTemplate.render404Page(siteId, candidateProfile);
    }

    if (siteId) {
      const siteFile = path.join(process.cwd(), 'public', 'sites', siteId, 'index.html');
      if (fs.existsSync(siteFile)) {
        try {
          const content = fs.readFileSync(siteFile, 'utf8');
          if (content.includes('cyber-architect-sprawl') || content.includes('sprawl-wrapper') || content.includes('hero_hand_nobg.png')) {
            return CyberArchitectSprawlTemplate.render404Page(siteId, candidateProfile);
          }
        } catch (e) {}
      }
    }

    return EcoTechSteampunkTemplate.render404Page(siteId, candidateProfile);
  }
}

module.exports = {
  TemplateRegistry,
  CyberArchitectSprawlTemplate,
  CosmicAstronautTemplate,
  CyberCrystalTemplate,
  BioluminescentWireframeTemplate,
  BotanicalWoodcraftTemplate,
  BioDigitalFusionTemplate,
  EcoTechSteampunkTemplate,
  EmeraldCyberSanctuaryTemplate,
  PristineWhiteCrystalTemplate,
  AbyssalQuantumJellyfishTemplate,
  MahoganyBrassSteampunkTemplate,
  LavenderCyberBridgeTemplate,
  SandParchmentBotanicalTemplate
};

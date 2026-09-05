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
const { AbyssalNautilusArtisanTemplate } = require('./abyssal-nautilus-artisan');

class TemplateRegistry {
  static templates = {
    'abyssal-nautilus-artisan': AbyssalNautilusArtisanTemplate,
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
    if (targetTemplate === 'abyssal-nautilus-artisan' || siteId === 'abyssal-nautilus-artisan') {
      return AbyssalNautilusArtisanTemplate.render404Page(siteId, candidateProfile);
    }
    if (targetTemplate === 'cyber-architect-sprawl' || siteId === 'cyber-architect-sprawl') {
      return CyberArchitectSprawlTemplate.render404Page(siteId, candidateProfile);
    }

    if (siteId) {
      const siteFile = path.join(process.cwd(), 'public', 'sites', siteId, 'index.html');
      if (fs.existsSync(siteFile)) {
        try {
          const content = fs.readFileSync(siteFile, 'utf8');
          if (content.includes('abyssal-nautilus-artisan') || content.includes('abyss-container') || content.includes('nautilus_hand_nobg.png')) {
            return AbyssalNautilusArtisanTemplate.render404Page(siteId, candidateProfile);
          }
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
  AbyssalNautilusArtisanTemplate,
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

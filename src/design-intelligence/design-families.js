/**
 * Design Families & Compatibility Matrix
 * 
 * Defines the 10 Archetypal Design Families, their compatible secondary influences,
 * and strict compatibility mappings across all 22 design dimensions.
 * Prevents aesthetic soup (e.g. brutalist + glassmorphism + luxury neon).
 */

const DESIGN_FAMILIES = {
  EDITORIAL: {
    id: 'EDITORIAL',
    name: 'High-Fashion & Literary Editorial',
    description: 'Disciplined asymmetric grids, dramatic serif display typography, expansive white space, and editorial storytelling.',
    allowedSecondaries: ['ARCHITECTURAL', 'MINIMAL', 'LUXURY'],
    forbiddenSecondaries: ['BRUTALIST', 'PLAYFUL', 'TECHNICAL'],
    compatibleLayouts: ['asymmetric-editorial', 'bento-canvas-studio', 'swiss-grid-minimal'],
    compatibleHeroes: ['magazine-cover-split', 'giant-typographic-statement', 'minimal-monograph-intro', 'split-runway-hero'],
    compatiblePresentations: ['editorial-magazine', 'fullscreen-case-study', 'image-first-gallery', 'stacked-posters', 'split-screen-story', 'minimalist-art-direction'],
    compatibleFontCategories: ['serif-display', 'grotesk-sans', 'transitional-serif'],
    compatible3D: ['2D Pure', 'fluid-simulation', 'webgl-depth-gallery', 'image-displacement'],
    compatibleMotions: ['editorial-reveal', 'cinematic-pan', 'smooth-inertia'],
    colorPhilosophy: 'warm-neutral-editorial',
    borderPhilosophy: 'hairline-subtle',
    cornerStyle: 'sharp-to-subtle',
    density: 'low-generous'
  },

  BRUTALIST: {
    id: 'BRUTALIST',
    name: 'Neo-Brutalist & Raw Anti-Design',
    description: 'Unapologetic thick black borders, hard offset drop shadows, high contrast, raw monospaced or hyper-bold grotesk typography.',
    allowedSecondaries: ['EXPERIMENTAL', 'TECHNICAL', 'PLAYFUL'],
    forbiddenSecondaries: ['LUXURY', 'MINIMAL', 'ORGANIC'],
    compatibleLayouts: ['neo-brutalist-split', 'figma-community-master', 'terminal-matrix-os'],
    compatibleHeroes: ['marquee-headline-ticker', 'asymmetric-duo-column', 'terminal-cli-boot', 'split-runway-hero'],
    compatiblePresentations: ['masonry-art-wall', 'stacked-posters', 'split-screen-story', 'terminal-cli-stream', 'before-after-slider', 'video-reel'],
    compatibleFontCategories: ['monospaced', 'hyper-bold-grotesk', 'neo-grotesk'],
    compatible3D: ['2D Pure', 'physics-rigid-bodies', 'interactive-torus-refraction'],
    compatibleMotions: ['brutalist-instant', 'mechanical-snapping', 'playful-elastic'],
    colorPhilosophy: 'high-contrast-stark-or-pop',
    borderPhilosophy: 'thick-solid-black',
    cornerStyle: 'sharp-0px-or-hard-pills',
    density: 'medium-high'
  },

  MINIMAL: {
    id: 'MINIMAL',
    name: 'Monastic & Wabi-Sabi Minimalism',
    description: 'Radical restraint, serene negative space, whisper-quiet typography, zero gratuitous ornamentation, and perfect alignment.',
    allowedSecondaries: ['EDITORIAL', 'ARCHITECTURAL', 'ORGANIC'],
    forbiddenSecondaries: ['BRUTALIST', 'PLAYFUL', 'FUTURISTIC'],
    compatibleLayouts: ['swiss-grid-minimal', 'bento-canvas-studio'],
    compatibleHeroes: ['monastic-centered-statement', 'minimal-monograph-intro', 'direct-project-gallery-first'],
    compatiblePresentations: ['minimalist-art-direction', 'typographic-project-index', 'archive-catalog', 'image-first-gallery', 'timeline-stream'],
    compatibleFontCategories: ['humanist-sans', 'transitional-serif', 'grotesk-sans'],
    compatible3D: ['2D Pure', 'noise-field-flow', 'particles-dust'],
    compatibleMotions: ['minimal-quiet', 'editorial-reveal', 'smooth-inertia'],
    colorPhilosophy: 'monochrome-natural-slate',
    borderPhilosophy: 'hairline-or-none',
    cornerStyle: 'subtle-4px',
    density: 'very-low'
  },

  LUXURY: {
    id: 'LUXURY',
    name: 'Haute Horlogerie & Prestige Atelier',
    description: 'Understated matte obsidian/champagne tones, chiseled serif typography, gilded hairline rules, and deep atmosphere.',
    allowedSecondaries: ['EDITORIAL', 'ARCHITECTURAL'],
    forbiddenSecondaries: ['BRUTALIST', 'PLAYFUL', 'TECHNICAL', 'FUTURISTIC'],
    compatibleLayouts: ['asymmetric-editorial', 'bento-canvas-studio'],
    compatibleHeroes: ['magazine-cover-split', 'monastic-centered-statement', 'panoramic-cinematic-stage'],
    compatiblePresentations: ['fullscreen-case-study', 'editorial-magazine', 'image-first-gallery', 'minimalist-art-direction', 'spatial-3d-gallery'],
    compatibleFontCategories: ['luxury-serif', 'geometric-sans'],
    compatible3D: ['2D Pure', 'glass-sculpture', 'webgl-depth-gallery'],
    compatibleMotions: ['cinematic-pan', 'smooth-inertia', 'editorial-reveal'],
    colorPhilosophy: 'obsidian-champagne-gold',
    borderPhilosophy: 'hairline-solid-subtle',
    cornerStyle: 'subtle-4px',
    density: 'low'
  },

  TECHNICAL: {
    id: 'TECHNICAL',
    name: 'Engineering Systems & Cyberdeck CLI',
    description: 'High information density, monospaced metadata, terminal prompts, TRON wireframes, telemetry badges, and mechanical snapping.',
    allowedSecondaries: ['FUTURISTIC', 'BRUTALIST', 'ARCHITECTURAL'],
    forbiddenSecondaries: ['LUXURY', 'PLAYFUL', 'ORGANIC'],
    compatibleLayouts: ['terminal-matrix-os', 'swiss-grid-minimal'],
    compatibleHeroes: ['terminal-cli-boot', 'giant-typographic-statement', 'direct-project-gallery-first'],
    compatiblePresentations: ['terminal-cli-stream', 'typographic-project-index', 'archive-catalog', 'timeline-stream', 'interactive-map'],
    compatibleFontCategories: ['monospaced', 'technical-sans'],
    compatible3D: ['wireframe-architecture', 'point-cloud-lidar', 'constellation-graph', 'procedural-terrain'],
    compatibleMotions: ['mechanical-snapping', 'experimental-glitch', 'smooth-inertia'],
    colorPhilosophy: 'cyberdeck-matrix-dark',
    borderPhilosophy: 'hairline-matrix-grid',
    cornerStyle: 'sharp-0px-or-micro-2px',
    density: 'high'
  },

  FUTURISTIC: {
    id: 'FUTURISTIC',
    name: 'VisionOS Spatial 3D & Volumetric',
    description: 'Frosted spatial glass planes, luminous depth layers, volumetric 3D WebGL meshes, and fluid spring physics.',
    allowedSecondaries: ['TECHNICAL', 'EXPERIMENTAL'],
    forbiddenSecondaries: ['BRUTALIST', 'ORGANIC', 'LUXURY'],
    compatibleLayouts: ['spatial-vision-3d', 'asymmetric-editorial'],
    compatibleHeroes: ['spatial-3d-interactive', 'panoramic-cinematic-stage', 'split-runway-hero'],
    compatiblePresentations: ['spatial-3d-gallery', 'project-orbit', 'fullscreen-case-study', 'interactive-map', 'video-reel'],
    compatibleFontCategories: ['geometric-sans', 'futuristic-display', 'neo-grotesk'],
    compatible3D: ['interactive-torus-refraction', 'neural-network', 'glass-sculpture', 'metaballs-organic'],
    compatibleMotions: ['fluid-spring', 'cinematic-pan', 'smooth-inertia'],
    colorPhilosophy: 'deep-space-specular-glow',
    borderPhilosophy: 'luminous-glass-edge',
    cornerStyle: 'rounded-16px-to-24px',
    density: 'medium'
  },

  ORGANIC: {
    id: 'ORGANIC',
    name: 'Natural Kyoto & Biophilic Craft',
    description: 'Earthy mineral palettes, fluid curves, tactile grain, contemplative pacing, and wabi-sabi balance.',
    allowedSecondaries: ['MINIMAL', 'EDITORIAL'],
    forbiddenSecondaries: ['TECHNICAL', 'BRUTALIST', 'FUTURISTIC'],
    compatibleLayouts: ['bento-canvas-studio', 'asymmetric-editorial'],
    compatibleHeroes: ['monastic-centered-statement', 'minimal-monograph-intro', 'magazine-cover-split'],
    compatiblePresentations: ['editorial-magazine', 'image-first-gallery', 'minimalist-art-direction', 'timeline-stream', 'stacked-posters'],
    compatibleFontCategories: ['humanist-serif', 'humanist-sans', 'transitional-serif'],
    compatible3D: ['2D Pure', 'fluid-simulation', 'noise-field-flow', 'cloth-simulation'],
    compatibleMotions: ['fluid-spring', 'smooth-inertia', 'minimal-quiet'],
    colorPhilosophy: 'mineral-earth-unbleached',
    borderPhilosophy: 'subtle-organic-rule',
    cornerStyle: 'rounded-12px-to-18px',
    density: 'low'
  },

  ARCHITECTURAL: {
    id: 'ARCHITECTURAL',
    name: 'Bauhaus & Swiss Grid Architecture',
    description: 'Strict modular grid alignments, architectural clarity, stark typography contrasts, and chiseled structural balance.',
    allowedSecondaries: ['EDITORIAL', 'MINIMAL', 'TECHNICAL'],
    forbiddenSecondaries: ['PLAYFUL', 'ORGANIC'],
    compatibleLayouts: ['swiss-grid-minimal', 'bento-canvas-studio'],
    compatibleHeroes: ['split-runway-hero', 'asymmetric-duo-column', 'giant-typographic-statement'],
    compatiblePresentations: ['masonry-art-wall', 'typographic-project-index', 'fullscreen-case-study', 'split-screen-story', 'archive-catalog'],
    compatibleFontCategories: ['grotesk-sans', 'monospaced', 'geometric-sans'],
    compatible3D: ['2D Pure', 'wireframe-architecture', 'abstract-geometry', 'procedural-terrain'],
    compatibleMotions: ['mechanical-snapping', 'minimal-quiet', 'editorial-reveal'],
    colorPhilosophy: 'bauhaus-monochrome-accent',
    borderPhilosophy: 'architectural-solid-hairline',
    cornerStyle: 'sharp-0px',
    density: 'medium-low'
  },

  PLAYFUL: {
    id: 'PLAYFUL',
    name: 'Tactile Kinetic & Y2K Digital Pop',
    description: 'Vibrant chromatic clashes, interactive bouncy physics, rounded pill shapes, celebratory micro-interactions, and toy-like joy.',
    allowedSecondaries: ['BRUTALIST', 'EXPERIMENTAL'],
    forbiddenSecondaries: ['LUXURY', 'MINIMAL', 'TECHNICAL', 'EDITORIAL'],
    compatibleLayouts: ['figma-community-master', 'neo-brutalist-split'],
    compatibleHeroes: ['marquee-headline-ticker', 'asymmetric-duo-column', 'split-runway-hero'],
    compatiblePresentations: ['video-reel', 'masonry-art-wall', 'project-orbit', 'before-after-slider', 'stacked-posters'],
    compatibleFontCategories: ['display-sans', 'neo-grotesk'],
    compatible3D: ['2D Pure', 'physics-rigid-bodies', 'liquid-distortion'],
    compatibleMotions: ['playful-elastic', 'fluid-spring'],
    colorPhilosophy: 'vibrant-chromatic-pop',
    borderPhilosophy: 'chunky-or-pill',
    cornerStyle: 'pill-9999px-or-rounded-20px',
    density: 'medium'
  },

  EXPERIMENTAL: {
    id: 'EXPERIMENTAL',
    name: 'Avant-Garde & Deconstructivist Gallery',
    description: 'Deconstructed grid structures, procedural glitch textures, multi-axis typography, and generative spatial tension.',
    allowedSecondaries: ['BRUTALIST', 'FUTURISTIC', 'PLAYFUL'],
    forbiddenSecondaries: ['LUXURY', 'MINIMAL', 'EDITORIAL'],
    compatibleLayouts: ['spatial-vision-3d', 'neo-brutalist-split', 'terminal-matrix-os'],
    compatibleHeroes: ['spatial-3d-interactive', 'marquee-headline-ticker', 'terminal-cli-boot'],
    compatiblePresentations: ['experimental-chaos', 'spatial-3d-gallery', 'interactive-map', 'stacked-posters', 'video-reel'],
    compatibleFontCategories: ['display-sans', 'monospaced', 'futuristic-display'],
    compatible3D: ['generative-topology', 'point-cloud-lidar', 'experimental-glitch', 'interactive-torus-refraction'],
    compatibleMotions: ['experimental-glitch', 'fluid-spring', 'playful-elastic'],
    colorPhilosophy: 'experimental-chromatic-tension',
    borderPhilosophy: 'deconstructed-offset',
    cornerStyle: 'mixed-asymmetric',
    density: 'medium-high'
  }
};

class DesignFamilyEngine {
  /**
   * Determine the most appropriate Design Family from role, brief, or history
   */
  static selectFamily(role = '', briefMode = '', recentFamilies = []) {
    const roleLower = String(role).toLowerCase();
    const briefLower = String(briefMode).toLowerCase();

    // 1. Check explicit brief mapping
    for (const [key, family] of Object.entries(DESIGN_FAMILIES)) {
      if (briefLower.includes(key.toLowerCase()) || briefLower.includes(family.name.toLowerCase())) {
        return family;
      }
    }

    // 2. Role-based affinity score
    const affinities = {
      EDITORIAL: ['writer', 'journalist', 'author', 'content', 'editor', 'creative director', 'fashion', 'brand'],
      BRUTALIST: ['indie hacker', 'builder', 'creator', 'solopreneur', 'rebel', 'frontend creative', 'punk'],
      MINIMAL: ['product designer', 'ux designer', 'minimalist', 'architect', 'ceramist', 'consultant'],
      LUXURY: ['executive', 'strategist', 'atelier', 'director', 'luxury', 'architect', 'vip'],
      TECHNICAL: ['kernel', 'backend', 'devops', 'security', 'systems', 'infra', 'database', 'rust', 'c++', 'go', 'hacker'],
      FUTURISTIC: ['ai', 'ml', 'webgl', 'threejs', '3d', 'vision', 'spatial', 'shader', 'crypto'],
      ORGANIC: ['ecologist', 'designer', 'artist', 'nature', 'botanist', 'craftsman', 'ceramic'],
      ARCHITECTURAL: ['software architect', 'systems engineer', 'industrial designer', 'data scientist', 'structural'],
      PLAYFUL: ['game developer', 'illustrator', 'motion designer', 'animator', 'toy', 'interactive'],
      EXPERIMENTAL: ['creative technologist', 'new media', 'avant-garde', 'generative', 'shader wizard']
    };

    let bestFamilyKey = null;
    let maxAffinity = 0;

    for (const [famKey, keywords] of Object.entries(affinities)) {
      let score = 0;
      for (const kw of keywords) {
        if (roleLower.includes(kw)) score += 2;
      }
      if (score > maxAffinity) {
        maxAffinity = score;
        bestFamilyKey = famKey;
      }
    }

    // 3. Fallback: select from non-recent families to guarantee cross-generation diversity
    if (!bestFamilyKey || recentFamilies.slice(0, 3).includes(bestFamilyKey)) {
      const available = Object.keys(DESIGN_FAMILIES).filter(k => !recentFamilies.slice(0, 4).includes(k));
      bestFamilyKey = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : Object.keys(DESIGN_FAMILIES)[Math.floor(Math.random() * Object.keys(DESIGN_FAMILIES).length)];
    }

    return DESIGN_FAMILIES[bestFamilyKey] || DESIGN_FAMILIES.EDITORIAL;
  }

  /**
   * Evaluate compatibility score (0 to 100) between a Design Family and candidate presentation model
   */
  static evaluatePresentationCompatibility(family, presentationModel) {
    if (!family || !presentationModel) return 50;

    // Direct compatibility whitelist
    if (family.compatiblePresentations.includes(presentationModel)) {
      return 95;
    }

    // Partial compatibility check
    const partiallyCompatible = {
      EDITORIAL: ['timeline-stream', 'archive-catalog', 'before-after-slider'],
      BRUTALIST: ['interactive-map', 'typographic-project-index', 'fullscreen-case-study'],
      MINIMAL: ['editorial-magazine', 'split-screen-story', 'stacked-posters'],
      LUXURY: ['stacked-posters', 'project-orbit', 'horizontal-cinematic-strip'],
      TECHNICAL: ['masonry-art-wall', 'split-screen-story', 'horizontal-cinematic-strip'],
      FUTURISTIC: ['horizontal-cinematic-strip', 'timeline-stream', 'before-after-slider'],
      ORGANIC: ['archive-catalog', 'fullscreen-case-study', 'typographic-project-index'],
      ARCHITECTURAL: ['editorial-magazine', 'timeline-stream', 'image-first-gallery'],
      PLAYFUL: ['interactive-map', 'spatial-3d-gallery', 'timeline-stream'],
      EXPERIMENTAL: ['masonry-art-wall', 'horizontal-cinematic-strip', 'project-orbit']
    };

    if (partiallyCompatible[family.id]?.includes(presentationModel)) {
      return 70;
    }

    // Incompatible combination
    return 25;
  }
}

module.exports = { DESIGN_FAMILIES, DesignFamilyEngine };

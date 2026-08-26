/**
 * Design DNA Model & Synthesizer
 * 
 * Pipeline:
 * 1. PAGE COMPOSITION ARCHETYPE (Spatial Topology & DOM Architecture First)
 * 2. INFORMATION ARCHITECTURE & SECTION ORDER
 * 3. DESIGN FAMILY & CONSTITUTION (Global Laws & Tokens)
 * 4. PROJECT PRESENTATION & COMPOSITION
 * 5. SUB-ENGINE COMPATIBILITY & REPETITION GOVERNANCE
 */

const { TypographyEngine } = require('./typography-engine');
const { ColorEngine } = require('./color-engine');
const { Motion3DEngine } = require('./motion-3d-engine');
const { ProjectPresentationEngine, PRESENTATION_MODELS } = require('./project-presentation-engine');
const { DesignFamilyEngine, DESIGN_FAMILIES } = require('./design-families');
const { DesignConstitution } = require('./design-constitution');
const { PageCompositionEngine, PAGE_ARCHETYPES } = require('./page-composition-engine');

const IA_SEQUENCES = [
  { id: 'standard-editorial', seq: ['hero', 'about', 'skills', 'projects', 'testimonials', 'contact'] },
  { id: 'projects-first', seq: ['hero', 'projects', 'case-studies', 'about', 'contact'] },
  { id: 'work-centric', seq: ['intro', 'projects', 'experience', 'contact'] },
  { id: 'statement-archive', seq: ['editorial-statement', 'selected-work', 'archive', 'about', 'contact'] },
  { id: 'terminal-cli', seq: ['terminal-cli', 'commands', 'projects', 'contact'] },
  { id: 'minimal-monograph', seq: ['minimal-index', 'monograph', 'experience', 'contact'] },
  { id: 'figma-community-master', seq: ['figma-nav', 'header-hero', 'logo-bar', 'skills-bento', 'gallery', 'testimonials', 'contact'] },
  { id: 'technical-case-stream', seq: ['hero', 'architecture-overview', 'deep-dive-projects', 'tech-matrix', 'contact'] },
  { id: 'curated-gallery-first', seq: ['gallery-hero', 'curated-works', 'artist-statement', 'provenance', 'contact'] }
];

const NAV_STYLES = [
  'floating-capsule',
  'vertical-sidebar',
  'minimal-corner-anchors',
  'bottom-dock',
  'editorial-masthead',
  'cli-header',
  'monograph-split-nav',
  'curved-island-bar',
  'invisible-reveal-nav'
];

const HERO_COMPOSITIONS = [
  'spatial-3d-interactive',
  'giant-typographic-statement',
  'split-runway-hero',
  'magazine-cover-split',
  'terminal-cli-boot',
  'minimal-monograph-intro',
  'direct-project-gallery-first',
  'marquee-headline-ticker',
  'panoramic-cinematic-stage',
  'asymmetric-duo-column',
  'monastic-centered-statement'
];

const LAYOUT_ARCHITECTURES = [
  'asymmetric-editorial',
  'spatial-vision-3d',
  'terminal-matrix-os',
  'neo-brutalist-split',
  'swiss-grid-minimal',
  'bento-canvas-studio',
  'figma-community-master'
];

class DesignDNAFactory {
  constructor() {
    this.pageCompositionEngine = new PageCompositionEngine();
    this.typographyEngine = new TypographyEngine();
    this.colorEngine = new ColorEngine();
    this.motion3DEngine = new Motion3DEngine();
    this.projectEngine = new ProjectPresentationEngine();
    this.history = [];
  }

  createDNA(creativeBrief, intelligence = {}, userProfile = {}, memoryHints = {}) {
    const mode = creativeBrief.mode;
    const recentArchetypes = memoryHints?.recentArchetypes || [];
    const recentFamilies = memoryHints?.recentFamilies || [];

    // 1. ARCHITECTURE FIRST: Select Page Composition Archetype (Spatial Topology & DOM Skeleton)
    const pageArchetype = this.pageCompositionEngine.selectArchetype(userProfile, creativeBrief, recentArchetypes);

    // 2. Resolve Primary Design Family & Design Constitution
    const family = DesignFamilyEngine.selectFamily(userProfile.role, mode, recentFamilies);
    const constitutionArtifact = DesignConstitution.formulate(family, null, userProfile);
    const { constitution, visualGrammar } = constitutionArtifact;

    // 3. Resolve Information Architecture (IA) & Section Order from Archetype
    const sectionOrder = pageArchetype.sectionOrder;
    const heroComp = pageArchetype.heroArchitecture || HERO_COMPOSITIONS[0];
    const navStyle = pageArchetype.headerArchitecture || NAV_STYLES[0];
    const layoutArchitecture = pageArchetype.id;

    // 4. Resolve Project Presentation (Coordinated with Design Constitution)
    const recentProjects = memoryHints?.recentProjects || [];
    const projectPres = this.projectEngine.selectModel(
      userProfile?.projects || [],
      userProfile || {},
      mode,
      recentProjects,
      family
    );

    // 5. Sub-engines with Design Memory Anti-Repetition hints
    const recentPairings = memoryHints?.recentPairings || [];
    const recentColorFamilies = memoryHints?.recentColorFamilies || [];
    const recent3D = memoryHints?.recent3D || [];
    const recentMotion = memoryHints?.recentMotion || [];

    const typography = this.typographyEngine.resolve(mode, recentPairings);
    const color = this.colorEngine.resolve(mode, recentColorFamilies);
    const spatialMotion = this.motion3DEngine.resolve(mode, creativeBrief.narrative, recent3D, recentMotion);

    // Filter 3D scene based on Design Family compatibility
    if (spatialMotion.threeScene && spatialMotion.threeScene.enabled) {
      if (family.compatible3D && !family.compatible3D.includes(spatialMotion.threeScene.type) && !family.compatible3D.includes(spatialMotion.threeScene.category)) {
        spatialMotion.threeScene.type = family.compatible3D[0] || '2D Pure';
        spatialMotion.threeScene.enabled = spatialMotion.threeScene.type !== '2D Pure';
      }
    }

    // Generate complete Page Structure Fingerprint
    const structureFingerprint = this.pageCompositionEngine.generateStructureFingerprint(pageArchetype, { projectPresentation: projectPres });

    // Formulate the full 22-Dimension Design Blueprint
    const dna = {
      id: `dna_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      pageArchetype: pageArchetype.id,
      pageComposition: pageArchetype,
      structureFingerprint,
      designFamily: family.id,
      constitution,
      visualGrammar,
      creativeDirection: creativeBrief.conceptTitle || pageArchetype.name,
      creativeMode: mode,
      visualEra: constitution.visualEra,
      brandMood: creativeBrief.brandMood || 'Rigorous & Contemporary',
      narrative: creativeBrief.narrative,
      era: creativeBrief.era,
      layoutArchitecture,
      gridTopology: pageArchetype.gridTopology,
      alignmentSystem: pageArchetype.alignmentSystem,
      contentDensity: pageArchetype.contentDensity,
      sectionRhythm: pageArchetype.sectionRhythm,
      viewportUsage: pageArchetype.viewportUsage,
      informationArchitecture: sectionOrder,
      navigationStyle: navStyle,
      heroComposition: heroComp,
      projectPresentation: projectPres,
      projectInteraction: projectPres.includes('slider') || projectPres.includes('strip') ? 'horizontal-swipe' : 'staggered-reveal',
      projectSectionArchitecture: `${layoutArchitecture}::${projectPres}`,
      typographySystem: typography,
      colorSystem: color,
      motionLanguage: constitution.motionLanguage || spatialMotion.motionLanguage,
      motionFamily: spatialMotion.motionFamily,
      threeScene3D: spatialMotion.threeScene,
      backgroundTreatment: spatialMotion.backgroundTreatment,
      spacingSystem: spatialMotion.spacingSystem,
      borderLanguage: constitution.borderLanguage || spatialMotion.borderLanguage,
      imageTreatment: constitution.imageTreatment || spatialMotion.imageTreatment,
      sectionTransition: spatialMotion.sectionTransition,
      footerArchitecture: spatialMotion.footerArchitecture,
      cursorBehavior: spatialMotion.cursorBehavior,
      buttonLanguage: spatialMotion.buttonLanguage,
      componentsAttribution: intelligence.componentPatterns || [],
      traversyTools: intelligence.traversyTools || []
    };

    return dna;
  }
}

module.exports = {
  DesignDNAFactory,
  PAGE_ARCHETYPES,
  IA_SEQUENCES,
  NAV_STYLES,
  HERO_COMPOSITIONS,
  LAYOUT_ARCHITECTURES,
  PROJECT_PRESENTATIONS: PRESENTATION_MODELS
};

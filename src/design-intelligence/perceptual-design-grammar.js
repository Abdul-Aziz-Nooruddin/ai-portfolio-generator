/**
 * 🏛️ Perceptual Design Grammar Engine (Phase 41)
 * Models 17 independent compositional and visual dimensions, generates candidates,
 * validates cross-dimensional compatibility, and compiles dynamic CSS token contracts.
 * 
 * Flow:
 * Developer Evidence -> Composition Intent -> Multiple Design Candidates ->
 * Coherence & Anti-Repetition Scoring -> Authoritative Design Grammar -> CSS Token Contract
 */

const PERCEPTUAL_DIMENSIONS = {
  PAGE_COMPOSITIONS: ['centered', 'asymmetric', 'split', 'editorial', 'rail-based', 'canvas', 'dossier', 'stacked', 'modular', 'spatial'],
  GRID_GRAMMARS: ['single-column', 'asymmetric-columns', 'editorial-columns', 'offset-grid', 'broken-grid', 'horizontal-runway', 'dense-matrix', 'freeform-spatial'],
  TYPOGRAPHIC_GRAMMARS: ['serif-editorial', 'grotesk', 'mono-technical', 'display-heavy', 'condensed', 'humanist', 'mixed-editorial', 'utilitarian'],
  TYPE_SCALES: ['restrained', 'dramatic', 'editorial', 'technical', 'compressed', 'oversized'],
  SPACING_RHYTHMS: ['compact', 'regular', 'generous', 'dramatic', 'asymmetric'],
  SURFACE_LANGUAGES: ['flat', 'framed', 'paper', 'panel', 'terminal', 'translucent', 'border-led', 'image-led'],
  BORDER_LANGUAGES: ['none', 'hairline', 'heavy', 'sectional', 'underlines', 'rule-based-editorial'],
  SHAPE_LANGUAGES: ['rectangular', 'rounded', 'pill', 'circular', 'irregular', 'sharp-technical'],
  INFORMATION_DENSITIES: ['sparse', 'balanced', 'dense', 'dossier'],
  CONTENT_RHYTHMS: ['narrative', 'index', 'alternating', 'progressive-disclosure', 'evidence-first', 'timeline', 'gallery', 'dossier'],
  PROJECT_LANGUAGES: ['case-study', 'artifact', 'research-paper', 'terminal-log', 'magazine-spread', 'technical-dossier', 'visual-specimen', 'metrics-wall', 'build-journal', 'archive-entry', 'timeline-artifact'],
  NAVIGATION_GRAMMARS: ['top-navigation', 'side-rail', 'floating-navigation', 'index-navigation', 'command-navigation', 'editorial-navigation', 'minimal-navigation'],
  HERO_GRAMMARS: ['masthead', 'split-identity', 'statement', 'project-first', 'monograph', 'terminal', 'index', 'spatial'],
  MEDIA_GRAMMARS: ['image-dominant', 'image-secondary', 'no-image', 'diagram', 'code', 'metrics', 'timeline', 'texture'],
  MOTION_GRAMMARS: ['restrained', 'editorial', 'kinetic', 'scroll-choreography', 'hover-driven', 'spatial', 'terminal-like'],
  MOBILE_GRAMMARS: ['linear-collapse', 'preserved-rail', 'horizontal-story', 'sticky-index', 'accordion-dossier', 'editorial-reflow', 'terminal-stream', 'modular-stack'],
  INTERACTION_GRAMMARS: ['direct', 'exploratory', 'command-like', 'editorial', 'spatial', 'index-driven']
};

class PerceptualDesignGrammar {
  /**
   * Evaluates cross-dimensional compatibility to prevent incoherent collisions
   * while preserving high generative freedom
   */
  static validateCompatibility(grammar = {}) {
    const {
      pageComposition,
      gridGrammar,
      typographicGrammar,
      surfaceLanguage,
      navigationGrammar,
      heroGrammar,
      mobileGrammar
    } = grammar;

    // Terminal surface requires compatible typography and grid
    if (surfaceLanguage === 'terminal') {
      if (typographicGrammar === 'serif-editorial') return false;
      if (gridGrammar === 'horizontal-runway') return false;
    }

    // Split page composition requires side-rail or split-identity hero
    if (pageComposition === 'split' || pageComposition === 'rail-based') {
      if (heroGrammar === 'monograph' && navigationGrammar === 'top-navigation') return false;
    }

    // Editorial monograph prefers editorial typography and readable measure
    if (heroGrammar === 'monograph') {
      if (surfaceLanguage === 'terminal') return false;
    }

    // Spatial composition prefers spatial or floating elements
    if (pageComposition === 'spatial') {
      if (navigationGrammar === 'command-navigation') return false;
    }

    return true;
  }

  /**
   * Generates multiple valid candidate design grammars for a given profile and intent
   */
  static generateCandidates(profile = {}, recentHistory = [], count = 8) {
    const roleLower = String(profile.role || profile.identity?.role?.value || '').toLowerCase();
    const signals = profile.signals || {};
    const candidates = [];

    const isTechnical = roleLower.includes('security') || roleLower.includes('distributed') || roleLower.includes('systems') || roleLower.includes('kernel') || roleLower.includes('backend') || signals.technicalDepth === 'deep';
    const isAcademic = roleLower.includes('research') || roleLower.includes('scientist') || roleLower.includes('phd') || roleLower.includes('academic') || signals.academicEvidence;
    const isCreative = roleLower.includes('3d') || roleLower.includes('creative') || roleLower.includes('photographer') || roleLower.includes('artist') || roleLower.includes('design') || signals.visualDensity === 'high';

    // Build adaptive candidate pools per dimension
    const compPool = isTechnical ? ['split', 'rail-based', 'modular', 'dossier', 'canvas', 'centered'] : (isCreative ? ['canvas', 'spatial', 'asymmetric', 'editorial', 'modular'] : (isAcademic ? ['editorial', 'centered', 'dossier', 'asymmetric', 'split'] : PERCEPTUAL_DIMENSIONS.PAGE_COMPOSITIONS));
    const gridPool = isTechnical ? ['dense-matrix', 'asymmetric-columns', 'offset-grid', 'single-column'] : (isCreative ? ['freeform-spatial', 'broken-grid', 'horizontal-runway', 'offset-grid'] : (isAcademic ? ['editorial-columns', 'single-column', 'asymmetric-columns'] : PERCEPTUAL_DIMENSIONS.GRID_GRAMMARS));
    const typePool = isTechnical ? ['mono-technical', 'grotesk', 'condensed', 'utilitarian'] : (isCreative ? ['display-heavy', 'grotesk', 'mixed-editorial', 'humanist'] : (isAcademic ? ['serif-editorial', 'humanist', 'mixed-editorial', 'grotesk'] : PERCEPTUAL_DIMENSIONS.TYPOGRAPHIC_GRAMMARS));
    const scalePool = ['dramatic', 'restrained', 'editorial', 'technical', 'oversized'];
    const spacingPool = ['generous', 'compact', 'regular', 'dramatic', 'asymmetric'];
    const surfacePool = isTechnical ? ['terminal', 'panel', 'flat', 'framed', 'border-led'] : (isCreative ? ['translucent', 'image-led', 'flat', 'panel'] : (isAcademic ? ['paper', 'flat', 'border-led', 'framed'] : PERCEPTUAL_DIMENSIONS.SURFACE_LANGUAGES));
    const borderPool = ['hairline', 'rule-based-editorial', 'sectional', 'none', 'heavy', 'underlines'];
    const shapePool = isTechnical ? ['sharp-technical', 'rectangular', 'rounded'] : (isCreative ? ['pill', 'irregular', 'rounded', 'circular'] : ['rectangular', 'rounded', 'sharp-technical']);
    const densityPool = isTechnical ? ['dense', 'dossier', 'balanced'] : (isAcademic ? ['dossier', 'balanced', 'dense'] : ['balanced', 'sparse', 'dense']);
    const rhythmPool = ['narrative', 'evidence-first', 'timeline', 'index', 'gallery', 'alternating', 'dossier'];
    const projectPool = isTechnical ? ['technical-dossier', 'terminal-log', 'case-study', 'metrics-wall', 'build-journal'] : (isCreative ? ['visual-specimen', 'case-study', 'artifact', 'magazine-spread'] : (isAcademic ? ['research-paper', 'case-study', 'technical-dossier'] : PERCEPTUAL_DIMENSIONS.PROJECT_LANGUAGES));
    const navPool = isTechnical ? ['command-navigation', 'side-rail', 'index-navigation', 'top-navigation'] : (isCreative ? ['floating-navigation', 'minimal-navigation', 'side-rail', 'index-navigation'] : ['top-navigation', 'index-navigation', 'editorial-navigation', 'side-rail']);
    const heroPool = isTechnical ? ['terminal', 'split-identity', 'masthead', 'statement'] : (isCreative ? ['spatial', 'project-first', 'statement', 'masthead'] : (isAcademic ? ['monograph', 'statement', 'masthead', 'split-identity'] : PERCEPTUAL_DIMENSIONS.HERO_GRAMMARS));
    const mediaPool = isTechnical ? ['code', 'diagram', 'metrics', 'no-image'] : (isCreative ? ['image-dominant', 'texture', 'diagram'] : ['diagram', 'metrics', 'image-secondary', 'no-image']);
    const motionPool = isTechnical ? ['restrained', 'terminal-like', 'hover-driven'] : (isCreative ? ['kinetic', 'spatial', 'scroll-choreography'] : ['restrained', 'editorial', 'scroll-choreography']);
    const mobilePool = isTechnical ? ['terminal-stream', 'preserved-rail', 'modular-stack'] : (isCreative ? ['horizontal-story', 'modular-stack', 'accordion-dossier'] : ['editorial-reflow', 'sticky-index', 'linear-collapse', 'preserved-rail']);
    const interactionPool = isTechnical ? ['command-like', 'direct', 'index-driven'] : (isCreative ? ['exploratory', 'spatial', 'direct'] : ['editorial', 'direct', 'index-driven']);

    const recentFingerprints = (Array.isArray(recentHistory) ? recentHistory : []).map(h => h.designGrammar || h.perceptualFingerprint || h).filter(Boolean);

    for (let attempt = 0; attempt < count * 3 && candidates.length < count; attempt++) {
      const candidate = {
        pageComposition: compPool[Math.floor(Math.random() * compPool.length)],
        gridGrammar: gridPool[Math.floor(Math.random() * gridPool.length)],
        typographicGrammar: typePool[Math.floor(Math.random() * typePool.length)],
        typeScale: scalePool[Math.floor(Math.random() * scalePool.length)],
        spacingRhythm: spacingPool[Math.floor(Math.random() * spacingPool.length)],
        surfaceLanguage: surfacePool[Math.floor(Math.random() * surfacePool.length)],
        borderLanguage: borderPool[Math.floor(Math.random() * borderPool.length)],
        shapeLanguage: shapePool[Math.floor(Math.random() * shapePool.length)],
        informationDensity: densityPool[Math.floor(Math.random() * densityPool.length)],
        contentRhythm: rhythmPool[Math.floor(Math.random() * rhythmPool.length)],
        projectLanguage: projectPool[Math.floor(Math.random() * projectPool.length)],
        navigationGrammar: navPool[Math.floor(Math.random() * navPool.length)],
        heroGrammar: heroPool[Math.floor(Math.random() * heroPool.length)],
        mediaGrammar: mediaPool[Math.floor(Math.random() * mediaPool.length)],
        motionGrammar: motionPool[Math.floor(Math.random() * motionPool.length)],
        mobileGrammar: mobilePool[Math.floor(Math.random() * mobilePool.length)],
        interactionGrammar: interactionPool[Math.floor(Math.random() * interactionPool.length)]
      };

      if (this.validateCompatibility(candidate)) {
        // Calculate repetition penalty against recent history
        let penalty = 0;
        recentFingerprints.slice(-6).forEach(prev => {
          let matches = 0;
          if (prev.pageComposition === candidate.pageComposition) matches += 2;
          if (prev.gridGrammar === candidate.gridGrammar) matches += 2;
          if (prev.typographicGrammar === candidate.typographicGrammar) matches += 2;
          if (prev.surfaceLanguage === candidate.surfaceLanguage) matches += 1;
          if (prev.navigationGrammar === candidate.navigationGrammar) matches += 1.5;
          if (prev.heroGrammar === candidate.heroGrammar) matches += 1.5;
          if (prev.projectLanguage === candidate.projectLanguage) matches += 1;
          penalty += matches;
        });

        candidate.score = 100 - penalty;
        candidates.push(candidate);
      }
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates.slice(0, count);
  }

  /**
   * Selects the authoritative design grammar for a profile
   */
  static selectBestGrammar(profile = {}, recentHistory = [], options = {}) {
    if (options.designGrammar && typeof options.designGrammar === 'object') {
      return options.designGrammar;
    }

    const candidates = this.generateCandidates(profile, recentHistory, 6);
    return candidates[0] || {
      pageComposition: 'editorial',
      gridGrammar: 'asymmetric-columns',
      typographicGrammar: 'grotesk',
      typeScale: 'dramatic',
      spacingRhythm: 'generous',
      surfaceLanguage: 'flat',
      borderLanguage: 'hairline',
      shapeLanguage: 'rectangular',
      informationDensity: 'balanced',
      contentRhythm: 'narrative',
      projectLanguage: 'case-study',
      navigationGrammar: 'top-navigation',
      heroGrammar: 'masthead',
      mediaGrammar: 'diagram',
      motionGrammar: 'editorial',
      mobileGrammar: 'editorial-reflow',
      interactionGrammar: 'direct'
    };
  }

  /**
   * Compiles dynamic CSS token contract from authoritative design grammar
   */
  static computeCssTokens(grammar = {}) {
    const {
      pageComposition = 'centered',
      gridGrammar = 'single-column',
      typeScale = 'dramatic',
      spacingRhythm = 'generous',
      surfaceLanguage = 'flat',
      borderLanguage = 'hairline',
      shapeLanguage = 'rounded',
      informationDensity = 'balanced'
    } = grammar;

    // Layout max width
    let layoutMax = '1280px';
    if (pageComposition === 'split' || pageComposition === 'rail-based') layoutMax = '100vw';
    else if (pageComposition === 'editorial' || gridGrammar === 'single-column') layoutMax = '920px';
    else if (pageComposition === 'centered' && informationDensity === 'sparse') layoutMax = '780px';
    else if (pageComposition === 'canvas' || gridGrammar === 'dense-matrix') layoutMax = '1440px';

    // Content measure
    let contentMeasure = '720px';
    if (typeScale === 'restrained' || informationDensity === 'dossier') contentMeasure = '640px';
    else if (typeScale === 'oversized') contentMeasure = '840px';

    // Section gap & padding
    let sectionGap = '4.5rem';
    let sectionPadding = 'clamp(2rem, 5vw, 6rem)';
    if (spacingRhythm === 'compact') {
      sectionGap = '2.5rem';
      sectionPadding = 'clamp(1.25rem, 3vw, 3rem)';
    } else if (spacingRhythm === 'generous' || spacingRhythm === 'dramatic') {
      sectionGap = '6rem';
      sectionPadding = 'clamp(3rem, 7vw, 8rem)';
    }

    // Grid columns & gap
    let gridColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
    let gridGap = '2rem';
    if (gridGrammar === 'single-column') {
      gridColumns = '1fr';
      gridGap = '2.5rem';
    } else if (gridGrammar === 'dense-matrix') {
      gridColumns = 'repeat(auto-fill, minmax(260px, 1fr))';
      gridGap = '1.25rem';
    } else if (gridGrammar === 'asymmetric-columns') {
      gridColumns = 'minmax(280px, 1fr) minmax(340px, 1.4fr)';
      gridGap = '3rem';
    }

    // Heading scale & line height
    let headingScale = 'clamp(2.4rem, 5.5vw, 4.2rem)';
    let bodyScale = '1.05rem';
    let lineHeight = '1.65';
    if (typeScale === 'restrained') {
      headingScale = 'clamp(1.8rem, 3.5vw, 2.6rem)';
      bodyScale = '0.98rem';
      lineHeight = '1.55';
    } else if (typeScale === 'oversized' || typeScale === 'dramatic') {
      headingScale = 'clamp(3rem, 7vw, 5.5rem)';
      bodyScale = '1.15rem';
      lineHeight = '1.75';
    } else if (typeScale === 'technical') {
      headingScale = 'clamp(2rem, 4vw, 3rem)';
      bodyScale = '0.92rem';
      lineHeight = '1.6';
    }

    // Border width & radius
    let borderWidth = '1px';
    if (borderLanguage === 'none') borderWidth = '0px';
    else if (borderLanguage === 'heavy') borderWidth = '3px';
    else if (borderLanguage === 'hairline') borderWidth = '1px';

    let radius = '8px';
    if (shapeLanguage === 'sharp-technical' || shapeLanguage === 'rectangular') radius = '0px';
    else if (shapeLanguage === 'pill') radius = '9999px';
    else if (shapeLanguage === 'rounded') radius = '12px';

    return {
      '--layout-max': layoutMax,
      '--content-measure': contentMeasure,
      '--section-gap': sectionGap,
      '--section-padding': sectionPadding,
      '--grid-columns': gridColumns,
      '--grid-gap': gridGap,
      '--heading-scale': headingScale,
      '--body-scale': bodyScale,
      '--line-height': lineHeight,
      '--border-width': borderWidth,
      '--radius': radius,
      '--surface-density': informationDensity,
      '--nav-width': pageComposition === 'split' ? '38%' : '100%',
      '--hero-height': grammar.heroGrammar === 'spatial' || grammar.heroGrammar === 'statement' ? '60vh' : 'auto',
      '--project-gap': spacingRhythm === 'compact' ? '1.5rem' : '3.5rem',
      '--media-ratio': grammar.mediaGrammar === 'image-dominant' ? '16/9' : '4/3'
    };
  }
}

module.exports = {
  PerceptualDesignGrammar,
  PERCEPTUAL_DIMENSIONS
};

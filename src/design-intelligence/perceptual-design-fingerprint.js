/**
 * 🏛️ Perceptual Design Fingerprint Engine (Phase 41)
 * Evaluates pure DOM structural geometry, whitespace rhythm, typographic hierarchy,
 * column models, navigation placement, card frequency, and mobile transformations.
 * 
 * Ignores text copy, names, colors, font families, and background images.
 */

class PerceptualDesignFingerprint {
  /**
   * Extracts multi-dimensional structural fingerprint from rendered portfolio
   */
  static extractFingerprint(site = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');
    const plan = site.compositionPlan || site.designBrief?.compositionPlan || {};
    const grammar = plan.designGrammar || {};

    // 1. Topology & Container Geometry
    let topology = grammar.pageComposition || plan.pageTopology?.id || 'standard';
    const topMatch = html.match(/class=["'][^"']*(layout-[a-z0-9-]+)[^"']*["']/i);
    if (topMatch) topology = topMatch[1].replace('layout-', '');

    // 2. Navigation Position & Signature
    let navigation = grammar.navigationGrammar || plan.navigationGrammar?.id || 'top-editorial';
    if (html.includes('split-identity-col') || html.includes('rail-sidebar')) navigation = 'side-rail';
    else if (html.includes('command-prompt-nav')) navigation = 'command-nav';
    else if (html.includes('bottom-chapter-nav')) navigation = 'bottom-dock';
    else if (html.includes('floating-coordinate-nav')) navigation = 'floating-pill';
    else if (html.includes('gallery-selector')) navigation = 'gallery-selector';
    else if (html.includes('numbered-archive-index')) navigation = 'numbered-archive';

    // 3. Hero Opening Geometry
    let hero = grammar.heroGrammar || plan.openingTopology || 'masthead';
    if (html.includes('terminal-boot-header')) hero = 'terminal-boot';
    else if (html.includes('full-stage-header')) hero = 'full-viewport-stage';
    else if (html.includes('monograph-header')) hero = 'monograph-thesis';
    else if (html.includes('split-identity-col')) hero = 'split-identity-rail';
    else if (html.includes('newspaper-front-page')) hero = 'newspaper-front-page';
    else if (html.includes('offset-poster-masthead')) hero = 'offset-poster-masthead';

    // 4. Section Cadence & Ordering
    const sectionMatches = [];
    const secRegex = /<section[^>]*class=["']([^"']+)["']|<header[^>]*class=["']([^"']+)["']|<aside[^>]*class=["']([^"']+)["']/gi;
    let match;
    while ((match = secRegex.exec(html)) !== null) {
      const cls = match[1] || match[2] || match[3] || '';
      if (cls.includes('hero') || cls.includes('identity')) sectionMatches.push('HERO');
      else if (cls.includes('projects') || cls.includes('artifact')) sectionMatches.push('PROJECTS');
      else if (cls.includes('experience') || cls.includes('timeline')) sectionMatches.push('EXPERIENCE');
      else if (cls.includes('skills') || cls.includes('capabilities')) sectionMatches.push('SKILLS');
      else if (cls.includes('thesis')) sectionMatches.push('THESIS');
      else if (cls.includes('education')) sectionMatches.push('EDUCATION');
      else if (cls.includes('cert')) sectionMatches.push('CERTIFICATIONS');
      else if (cls.includes('publications') || cls.includes('research')) sectionMatches.push('PUBLICATIONS');
      else if (cls.includes('contact') || cls.includes('dock') || cls.includes('footer')) sectionMatches.push('CONTACT');
    }
    const sectionSequence = sectionMatches.join(' -> ');

    // 5. Project Presentational Archetype
    let projectArchetype = grammar.projectLanguage || 'case-study';
    if (html.includes('storytelling-code-architecture') || html.includes('presentation-technical-dossier')) projectArchetype = 'technical-dossier';
    else if (html.includes('terminal-session-log') || html.includes('storytelling-terminal-session')) projectArchetype = 'terminal-log';
    else if (html.includes('compact-metrics-table')) projectArchetype = 'metrics-wall';
    else if (html.includes('horizontal-filmstrip')) projectArchetype = 'horizontal-filmstrip';
    else if (html.includes('magazine-editorial-chapter')) projectArchetype = 'magazine-spread';
    else if (html.includes('typographic-index-reveal')) projectArchetype = 'typographic-index';
    else if (html.includes('asymmetric-media-mosaic')) projectArchetype = 'asymmetric-mosaic';

    // 6. Surface & Border Geometry
    let surface = grammar.surfaceLanguage || 'flat';
    if (html.includes('data-surface="terminal"') || html.includes('terminal-skills-matrix')) surface = 'terminal';
    else if (html.includes('data-surface="editorial"') || html.includes('editorial-skills-container')) surface = 'editorial-prose';
    else if (html.includes('architectural-skills-table')) surface = 'blueprint-table';
    else if (html.includes('museum-skills-ledger')) surface = 'museum-ledger';

    // 7. Density Metrics & Structural Geometry
    const headingCount = (html.match(/<h[1-6]/gi) || []).length;
    const pCount = (html.match(/<p/gi) || []).length;
    const articleCount = (html.match(/<article/gi) || []).length;
    const divCount = (html.match(/<div/gi) || []).length;
    const cardClassCount = (html.match(/class=["'][^"']*card[^"']*["']/gi) || []).length;

    const structuralSignatureString = `${topology}::${navigation}::${hero}::${projectArchetype}::${surface}::${sectionSequence}::H${headingCount}_P${pCount}_A${articleCount}_C${cardClassCount}`;

    return {
      topology,
      navigation,
      hero,
      sectionSequence,
      projectArchetype,
      surface,
      headingCount,
      pCount,
      articleCount,
      cardClassCount,
      mobileModel: grammar.mobileGrammar || plan.pageTopology?.mobileTransformation || 'mobile-stack',
      structuralSignatureString
    };
  }

  /**
   * Computes perceptual similarity between two portfolios (0 - 100)
   * 100 = identical visual geometry, 0 = completely distinct
   */
  static computeSimilarity(siteA, siteB) {
    const fpA = this.extractFingerprint(siteA);
    const fpB = this.extractFingerprint(siteB);

    let similarity = 0;

    // Topology: 25 points
    if (fpA.topology === fpB.topology) similarity += 25;

    // Navigation: 15 points
    if (fpA.navigation === fpB.navigation) similarity += 15;

    // Hero: 15 points
    if (fpA.hero === fpB.hero) similarity += 15;

    // Section Sequence: 15 points
    if (fpA.sectionSequence === fpB.sectionSequence) similarity += 15;

    // Project Archetype: 15 points
    if (fpA.projectArchetype === fpB.projectArchetype) similarity += 15;

    // Surface & Border: 10 points
    if (fpA.surface === fpB.surface) similarity += 10;

    // Mobile: 5 points
    if (fpA.mobileModel === fpB.mobileModel) similarity += 5;

    return similarity;
  }

  /**
   * Computes perceptual distance (0 - 100)
   */
  static computePerceptualDistance(siteA, siteB) {
    return Math.max(0, 100 - this.computeSimilarity(siteA, siteB));
  }

  /**
   * Evaluates a cohort for perceptual convergence
   */
  static evaluateBatch(sites = [], options = {}) {
    const maxCollisionRate = options.maxCollisionRate !== undefined ? options.maxCollisionRate : 0.15;
    const minMeanDistance = options.minMeanDistance || 75;

    if (!Array.isArray(sites) || sites.length < 2) {
      return { pass: true, collisionRate: 0, meanDistance: 100, distinctFingerprints: sites.length };
    }

    let totalComparisons = 0;
    let collisions = 0;
    let totalDistance = 0;
    const fingerprints = new Set();

    for (let i = 0; i < sites.length; i++) {
      const fpA = this.extractFingerprint(sites[i]);
      fingerprints.add(fpA.structuralSignatureString);

      for (let j = i + 1; j < sites.length; j++) {
        const d = this.computePerceptualDistance(sites[i], sites[j]);
        totalDistance += d;
        totalComparisons++;
        if (d < 30) {
          collisions++;
        }
      }
    }

    const meanDistance = totalComparisons > 0 ? (totalDistance / totalComparisons) : 100;
    const collisionRate = totalComparisons > 0 ? (collisions / totalComparisons) : 0;
    const distinctFingerprints = fingerprints.size;

    const pass = collisionRate <= maxCollisionRate && meanDistance >= minMeanDistance;

    return {
      pass,
      collisionRate: Number((collisionRate * 100).toFixed(2)),
      meanDistance: Number(meanDistance.toFixed(2)),
      distinctFingerprints,
      totalComparisons,
      collisions
    };
  }
}

module.exports = { PerceptualDesignFingerprint };

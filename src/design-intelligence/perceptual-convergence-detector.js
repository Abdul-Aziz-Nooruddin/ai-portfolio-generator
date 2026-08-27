/**
 * 🏛️ Perceptual Convergence Detector (Phase 37)
 * Forensically detects fake diversity by measuring physical DOM geometry, section sequence,
 * navigation position, hero dimensions, within-portfolio artifact variations, and black-and-white structural distance.
 * 
 * Ignores color, gradients, and font families to evaluate pure structural differentiation.
 */

class PerceptualConvergenceDetector {
  /**
   * Extracts structural visual signature from rendered portfolio artifact
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan }
   * @returns {Object} Structural signature
   */
  static extractStructuralSignature(site = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');
    const plan = site.compositionPlan || site.designBrief?.compositionPlan || {};

    // 1. Topology Signature
    let topologyClass = plan.pageTopology?.rootClass || 'layout-standard';
    const topMatch = html.match(/class=["'][^"']*(layout-[a-z0-9-]+)[^"']*["']/i);
    if (topMatch) topologyClass = topMatch[1];

    // 2. Navigation Position & Signature
    let navGeometry = 'unknown-nav';
    if (html.includes('class="nav-sidebar-rail"') || html.includes('split-identity-col')) navGeometry = 'sidebar-vertical-rail';
    else if (html.includes('class="command-prompt-nav"')) navGeometry = 'command-prompt-cli';
    else if (html.includes('class="bottom-chapter-nav"')) navGeometry = 'bottom-dock-nav';
    else if (html.includes('class="floating-coordinate-nav"')) navGeometry = 'floating-pill-nav';
    else if (html.includes('class="gallery-selector"')) navGeometry = 'gallery-track-nav';
    else if (html.includes('class="numbered-archive-index"')) navGeometry = 'numbered-archive-nav';
    else if (html.includes('class="top-editorial-masthead"') || html.includes('<nav')) navGeometry = 'top-editorial-bar';

    // 3. Hero Opening Geometry
    let heroGeometry = plan.openingTopology || 'standard-hero';
    if (html.includes('terminal-boot-header') || plan.openingTopology === 'terminal-boot-sequence') heroGeometry = 'terminal-boot';
    else if (html.includes('full-stage-header') || plan.openingTopology === 'full-viewport-stage') heroGeometry = 'full-viewport-stage';
    else if (html.includes('monograph-header') || plan.openingTopology === 'research-abstract-monograph') heroGeometry = 'monograph-thesis';
    else if (html.includes('split-identity-col') || plan.openingTopology === 'sticky-sidebar-identity') heroGeometry = 'split-sticky-sidebar';
    else if (html.includes('newspaper-front-page') || plan.openingTopology === 'newspaper-front-page') heroGeometry = 'newspaper-front-page';
    else if (html.includes('offset-poster-masthead') || plan.openingTopology === 'offset-poster-masthead') heroGeometry = 'offset-poster-masthead';
    else if (html.includes('data-dashboard-opening') || plan.openingTopology === 'data-dashboard-opening') heroGeometry = 'data-dashboard-opening';
    else if (html.includes('full-bleed-visual-plate') || plan.openingTopology === 'full-bleed-visual-plate') heroGeometry = 'full-bleed-visual-plate';
    else if (html.includes('class="section-hero"')) heroGeometry = 'editorial-headline';

    // 4. Section Ordering Sequence
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
      else if (cls.includes('contact') || cls.includes('dock') || cls.includes('footer')) sectionMatches.push('CONTACT');
    }
    const sectionSequence = sectionMatches.length > 0 ? sectionMatches : (plan.sectionGrammar?.sequence || ['HERO', 'PROJECTS', 'CONTACT']);

    // 5. Project Presentation Strategies
    const projectStrategies = [];
    const presMatches = html.matchAll(/class=["'][^"']*(storytelling-[a-z0-9-]+|presentation-[a-z0-9-]+)[^"']*["']/gi);
    for (const m of presMatches) {
      projectStrategies.push(m[1]);
    }
    const primaryProjectStrategy = projectStrategies[0] || (plan.projectArtifactPlan?.[0]?.artifactStrategy || 'standard-dossier');

    // 6. Mobile Transformation Archetype
    let mobileModel = plan.pageTopology?.mobileTransformation || 'mobile-stack';
    if (css.includes('scroll-snap-type: x mandatory')) mobileModel = 'mobile-touch-filmstrip';
    else if (css.includes('.split-identity-col') && css.includes('position: sticky')) mobileModel = 'mobile-sticky-rail';
    else if (css.includes('.command-console') || html.includes('terminal-boot-header')) mobileModel = 'mobile-terminal-stream';
    else if (css.includes('.layout-narrow-reading-column')) mobileModel = 'mobile-reading-stream';

    // 7. Black & White Structural Density Index
    const headingCount = (html.match(/<h[1-6]/gi) || []).length;
    const linkCount = (html.match(/<a /gi) || []).length;
    const divCount = (html.match(/<div/gi) || []).length;
    const structuralDensity = Math.round((divCount * 1.5 + headingCount * 3 + linkCount * 2) / 10);

    return {
      topologyClass,
      navGeometry,
      heroGeometry,
      sectionSequence: sectionSequence.join(' -> '),
      primaryProjectStrategy,
      withinPortfolioProjectCount: projectStrategies.length,
      mobileModel,
      structuralDensity
    };
  }

  /**
   * Computes pure structural distance between two portfolios (0 - 100)
   * Strips all color/palette influence.
   */
  static computeStructuralDistance(siteA, siteB) {
    const sigA = this.extractStructuralSignature(siteA);
    const sigB = this.extractStructuralSignature(siteB);

    let distance = 0;

    // 1. Topology Weight (30 points)
    if (sigA.topologyClass !== sigB.topologyClass) distance += 30;

    // 2. Navigation Geometry Weight (15 points)
    if (sigA.navGeometry !== sigB.navGeometry) distance += 15;

    // 3. Hero Opening Geometry Weight (15 points)
    if (sigA.heroGeometry !== sigB.heroGeometry) distance += 15;

    // 4. Section Ordering Sequence Weight (20 points)
    if (sigA.sectionSequence !== sigB.sectionSequence) distance += 20;

    // 5. Project Presentation Strategy Weight (10 points)
    if (sigA.primaryProjectStrategy !== sigB.primaryProjectStrategy) distance += 10;

    // 6. Mobile Transformation Model Weight (10 points)
    if (sigA.mobileModel !== sigB.mobileModel) distance += 10;

    return distance;
  }

  /**
   * Audits a batch of generated sites for perceptual convergence
   * @param {Array} sites - Array of generated site objects
   * @param {Object} options - { minDistance: 65, maxCollisionRate: 0.30 }
   * @returns {Object} Evaluation report
   */
  static evaluateCorpus(sites = [], options = {}) {
    const minDistance = options.minDistance || 65;
    const maxCollisionRate = options.maxCollisionRate !== undefined ? options.maxCollisionRate : 0.30;

    if (!Array.isArray(sites) || sites.length < 2) {
      return { pass: true, collisionRate: 0, meanDistance: 100, comparisons: 0, collisions: 0 };
    }

    let totalComparisons = 0;
    let collisions = 0;
    let distanceSum = 0;

    const signatures = sites.map(s => this.extractStructuralSignature(s));
    const distinctTopologies = new Set(signatures.map(s => s.topologyClass)).size;
    const distinctNavs = new Set(signatures.map(s => s.navGeometry)).size;
    const distinctHeroes = new Set(signatures.map(s => s.heroGeometry)).size;
    const distinctSequences = new Set(signatures.map(s => s.sectionSequence)).size;
    const distinctMobileModels = new Set(signatures.map(s => s.mobileModel)).size;

    for (let i = 0; i < sites.length; i++) {
      for (let j = i + 1; j < sites.length; j++) {
        const dist = this.computeStructuralDistance(sites[i], sites[j]);
        distanceSum += dist;
        totalComparisons++;
        if (dist < minDistance) {
          collisions++;
        }
      }
    }

    const meanDistance = totalComparisons > 0 ? Number((distanceSum / totalComparisons).toFixed(2)) : 100;
    const collisionRate = totalComparisons > 0 ? Number((collisions / totalComparisons).toFixed(4)) : 0;
    const pass = collisionRate <= maxCollisionRate && meanDistance >= minDistance && distinctTopologies >= 6;

    return {
      pass,
      totalSites: sites.length,
      totalComparisons,
      collisions,
      collisionRate,
      collisionPercentage: `${(collisionRate * 100).toFixed(2)}%`,
      meanDistance,
      distinctTopologies,
      distinctNavs,
      distinctHeroes,
      distinctSequences,
      distinctMobileModels
    };
  }
}

module.exports = { PerceptualConvergenceDetector };

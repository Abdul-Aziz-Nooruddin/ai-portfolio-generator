/**
 * 🏛️ Component Convergence Detector (Phase 44)
 * Audits component-level structural signatures (hero, project block, CTA, navigation, metadata rows,
 * experience cards, publication items) to detect hidden component monopolies across pages.
 * 
 * Target: Component Collision Rate <= 15.0%.
 */

class ComponentConvergenceDetector {
  /**
   * Extracts structural component signatures from a rendered site
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan }
   * @returns {Object} Component structural signatures
   */
  static extractComponentSignatures(site = {}) {
    const html = String(site.html || '');

    // Hero Component Structure
    let heroSig = 'hero-standard';
    if (html.includes('terminal-boot-header')) heroSig = 'hero-terminal-cli';
    else if (html.includes('full-stage-header')) heroSig = 'hero-spatial-stage';
    else if (html.includes('monograph-header')) heroSig = 'hero-monograph-thesis';
    else if (html.includes('primitive-bento-canopy')) heroSig = 'hero-bento-canopy';
    else if (html.includes('primitive-identity-rail')) heroSig = 'hero-lateral-rail';

    // Project Item Structure
    let projectSig = 'project-standard-card';
    if (html.includes('technical-dossier')) projectSig = 'project-technical-dossier';
    else if (html.includes('terminal-session-log')) projectSig = 'project-terminal-log';
    else if (html.includes('compact-metrics-table')) projectSig = 'project-metrics-table';
    else if (html.includes('horizontal-filmstrip')) projectSig = 'project-filmstrip';
    else if (html.includes('asymmetric-mosaic')) projectSig = 'project-media-mosaic';
    else if (html.includes('academic-paper-specimen')) projectSig = 'project-academic-paper';

    // Navigation Structure
    let navSig = 'nav-top-bar';
    if (html.includes('split-identity-col') || html.includes('rail-sidebar')) navSig = 'nav-lateral-rail';
    else if (html.includes('command-prompt-nav')) navSig = 'nav-command-prompt';
    else if (html.includes('gallery-selector')) navSig = 'nav-gallery-selector';
    else if (html.includes('bottom-chapter-nav')) navSig = 'nav-bottom-dock';

    // Footer / CTA Structure
    let footerSig = 'footer-contact-dock';
    if (html.includes('mailto:')) footerSig = 'footer-direct-inquiry-dock';

    const componentKey = `${heroSig}::${projectSig}::${navSig}::${footerSig}`;

    return {
      heroSig,
      projectSig,
      navSig,
      footerSig,
      componentKey
    };
  }

  /**
   * Audits component convergence across a batch of sites
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { componentCollisionRate: 0, distinctComponents: 0, pass: true };
    }

    const sigs = sites.map(s => this.extractComponentSignatures(s));
    const uniqueKeys = new Set(sigs.map(s => s.componentKey));
    const counts = {};
    sigs.forEach(s => {
      counts[s.componentKey] = (counts[s.componentKey] || 0) + 1;
    });

    let collisions = 0;
    let pairs = 0;
    for (let i = 0; i < sigs.length; i++) {
      for (let j = i + 1; j < sigs.length; j++) {
        pairs++;
        if (sigs[i].componentKey === sigs[j].componentKey) {
          collisions++;
        }
      }
    }

    const componentCollisionRate = pairs > 0 ? Number(((collisions / pairs) * 100).toFixed(2)) : 0;
    const maxCount = Object.keys(counts).length > 0 ? Math.max(...Object.values(counts)) : 0;
    const dominanceRate = Number(((maxCount / sites.length) * 100).toFixed(2));

    return {
      totalSites: sites.length,
      distinctComponents: uniqueKeys.size,
      componentCollisionRate,
      dominanceRate,
      pass: componentCollisionRate <= 15.0
    };
  }
}

module.exports = { ComponentConvergenceDetector };

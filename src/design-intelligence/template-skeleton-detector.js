/**
 * 🏛️ Anti-Template Skeleton Detector (Phase 43)
 * Extracts pure physical DOM wireframe skeletons (ignoring text, colors, fonts, IDs, class names)
 * and detects whether multiple sites collapse into the same hidden template skeleton.
 * 
 * Invariant: Target Hidden Template Collision Rate <= 5.0%.
 */

class TemplateSkeletonDetector {
  /**
   * Extracts a pure structural wireframe skeleton from HTML markup
   * @param {string|Object} siteOrHtml - HTML string or site object
   * @returns {Object} Structural skeleton signature
   */
  static extractSkeleton(siteOrHtml) {
    const html = typeof siteOrHtml === 'string' ? siteOrHtml : (siteOrHtml?.html || '');

    // 1. Landmark & Container Topology
    const hasSidebar = html.includes('primitive-identity-rail') || html.includes('split-identity-col') || html.includes('rail-sidebar');
    const hasFullStage = html.includes('primitive-spatial-field') || html.includes('full-viewport-stage') || html.includes('canvas-3d');
    const hasReadingCol = html.includes('primitive-reading-column') || html.includes('narrow-reading-column');
    const hasBento = html.includes('primitive-bento-canopy') || html.includes('offset-poster-canvas') || html.includes('bento-grid');

    let layoutSkeleton = 'standard-column';
    if (hasSidebar) layoutSkeleton = 'pinned-lateral-rail';
    else if (hasFullStage) layoutSkeleton = 'spatial-full-stage';
    else if (hasReadingCol) layoutSkeleton = 'monograph-reading-measure';
    else if (hasBento) layoutSkeleton = 'asymmetric-bento-canopy';

    // 2. Navigation Landmark
    let navSkeleton = 'top-bar';
    if (html.includes('split-identity-col') || html.includes('rail-sidebar')) navSkeleton = 'lateral-rail';
    else if (html.includes('command-prompt-nav')) navSkeleton = 'command-dock';
    else if (html.includes('gallery-selector')) navSkeleton = 'floating-gallery';
    else if (html.includes('bottom-chapter-nav')) navSkeleton = 'bottom-dock';

    // 3. Hero Opening Landmark
    let heroSkeleton = 'masthead';
    if (html.includes('terminal-boot-header')) heroSkeleton = 'terminal-boot';
    else if (html.includes('full-stage-header')) heroSkeleton = 'full-stage';
    else if (html.includes('monograph-header')) heroSkeleton = 'monograph-thesis';
    else if (html.includes('primitive-bento-canopy')) heroSkeleton = 'bento-canopy';

    // 4. Section Sequence
    const sectionMatches = [];
    if (html.includes('section-hero') || heroSkeleton !== 'masthead') sectionMatches.push('HERO');
    if (html.includes('section-projects') || html.includes('project-article')) sectionMatches.push('PROJECTS');
    if (html.includes('section-experience') || html.includes('morphed-timeline-experience')) sectionMatches.push('EXPERIENCE');
    if (html.includes('section-publications') || html.includes('academic-paper-specimen')) sectionMatches.push('PUBLICATIONS');
    if (html.includes('section-skills') || html.includes('skills-badge')) sectionMatches.push('SKILLS');
    if (html.includes('primitive-contact-dock')) sectionMatches.push('CONTACT');

    // 5. Project Geometry Archetype
    let projectSkeleton = 'standard-grid';
    if (html.includes('technical-dossier')) projectSkeleton = 'technical-dossier';
    else if (html.includes('terminal-session-log')) projectSkeleton = 'terminal-stream';
    else if (html.includes('compact-metrics-table')) projectSkeleton = 'metrics-table';
    else if (html.includes('horizontal-filmstrip')) projectSkeleton = 'horizontal-filmstrip';
    else if (html.includes('asymmetric-mosaic')) projectSkeleton = 'asymmetric-mosaic';

    const skeletonKey = `${layoutSkeleton}::${navSkeleton}::${heroSkeleton}::${sectionMatches.join('->')}::${projectSkeleton}`;

    return {
      layoutSkeleton,
      navSkeleton,
      heroSkeleton,
      sectionSequence: sectionMatches,
      projectSkeleton,
      skeletonKey
    };
  }

  /**
   * Audits a cohort for hidden template skeleton collisions
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { collisionRate: 0, distinctSkeletons: 0, pass: true };
    }

    const skeletons = sites.map(s => this.extractSkeleton(s));
    const uniqueKeys = new Set(skeletons.map(s => s.skeletonKey));
    const counts = {};
    skeletons.forEach(s => {
      counts[s.skeletonKey] = (counts[s.skeletonKey] || 0) + 1;
    });

    let collisions = 0;
    let pairs = 0;
    for (let i = 0; i < skeletons.length; i++) {
      for (let j = i + 1; j < skeletons.length; j++) {
        pairs++;
        if (skeletons[i].skeletonKey === skeletons[j].skeletonKey) {
          collisions++;
        }
      }
    }
    const collisionRate = pairs > 0 ? Number(((collisions / pairs) * 100).toFixed(2)) : 0;
    const maxSkeletonCount = Object.keys(counts).length > 0 ? Math.max(...Object.values(counts)) : 0;
    const dominanceRate = Number(((maxSkeletonCount / sites.length) * 100).toFixed(2));

    return {
      totalSites: sites.length,
      distinctSkeletons: uniqueKeys.size,
      collisionRate,
      dominanceRate,
      pass: collisionRate <= 5.0 && dominanceRate <= 15.0
    };
  }
}

module.exports = { TemplateSkeletonDetector };

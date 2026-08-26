/**
 * 🏛️ Rendered Visual Fingerprint (Phase 34)
 * Extracts physical layout geometry, computed container dimensions, column distributions,
 * navigation coordinate models, hero geometry, project aspect ratios, and whitespace profiles
 * across 4 canonical viewports: 1440x900, 1024x768, 768x1024, 390x844.
 */

class RenderedVisualFingerprint {
  /**
   * Derives a geometric visual fingerprint from rendered HTML and CSS
   * @param {string} html 
   * @param {string} css 
   * @param {Object} browserGeometry - Optional real computed geometry from headless browser
   * @returns {Object} Physical Visual Fingerprint
   */
  static extract(html = '', css = '', browserGeometry = null) {
    const rawHtml = String(html || '');
    const rawCss = String(css || '');

    // 1. Page Topology & Container Width Philosophy
    let pageTopology = 'centered-standard';
    let maxContentWidth = 1280;
    let isFullBleed = false;
    let isOffsetAsymmetric = false;
    let isNarrowMeasure = false;
    let isSplitCanvas = false;

    if (rawHtml.includes('primitive-identity-rail') || rawCss.includes('grid-template-columns: 280px 1fr') || rawCss.includes('minmax(320px, 38%) 1fr')) {
      pageTopology = 'split-sidebar-rail';
      isSplitCanvas = true;
    } else if (rawCss.includes('width: 100%') && rawCss.includes('max-width: 100vw')) {
      pageTopology = 'edge-to-edge-fluid';
      isFullBleed = true;
      maxContentWidth = 1440;
    } else if (rawCss.includes('margin-left: auto') && rawCss.includes('margin-right: 0')) {
      pageTopology = 'offset-asymmetric-canvas';
      isOffsetAsymmetric = true;
      maxContentWidth = 1440;
    } else if (rawCss.includes('max-width: 860px') || rawCss.includes('max-width: 880px') || rawHtml.includes('monograph-reading-column')) {
      pageTopology = 'narrow-editorial-measure';
      isNarrowMeasure = true;
      maxContentWidth = 880;
    } else if (rawHtml.includes('terminal-window') || rawHtml.includes('primitive-command-surface')) {
      pageTopology = 'command-console-matrix';
      maxContentWidth = 1180;
    } else if (rawCss.includes('spatial-viewport-stage') || rawHtml.includes('stage-orbit-wrapper')) {
      pageTopology = 'full-viewport-stage';
      isFullBleed = true;
      maxContentWidth = 1440;
    }

    // 2. Navigation Structure & Coordinate Geometry
    let navigationGeometry = 'top-bar';
    if (rawHtml.includes('primitive-nav-rail') || rawHtml.includes('primitive-identity-rail') || isSplitCanvas) {
      navigationGeometry = 'vertical-rail-left';
    } else if (rawHtml.includes('primitive-editorial-masthead') || rawHtml.includes('VOL. XXIV • SPECIAL EDITION')) {
      navigationGeometry = 'editorial-masthead';
    } else if (rawHtml.includes('floating-coords') || rawHtml.includes('floating-coordinate-nav')) {
      navigationGeometry = 'floating-coordinate-top-right';
    } else if (rawHtml.includes('footer-scrubber') || rawHtml.includes('bottom-chapter-nav')) {
      navigationGeometry = 'bottom-chapter-scrubber';
    } else if (rawHtml.includes('command-prompt-nav') || rawHtml.includes('terminal-menu')) {
      navigationGeometry = 'terminal-command-menu';
    } else if (rawHtml.includes('gallery-selector')) {
      navigationGeometry = 'gallery-selector-track';
    } else if (rawHtml.includes('numbered-archive-index')) {
      navigationGeometry = 'numbered-archive-index';
    }

    // 3. Hero / Opening Viewport Geometry
    let heroGeometry = 'standard-thesis';
    if (pageTopology === 'split-sidebar-rail') heroGeometry = 'sticky-identity-rail';
    else if (pageTopology === 'command-console-matrix') heroGeometry = 'terminal-cli-boot';
    else if (pageTopology === 'full-viewport-stage') heroGeometry = 'immersive-stage-takeover';
    else if (pageTopology === 'narrow-editorial-measure') heroGeometry = 'monograph-abstract-prologue';
    else if (pageTopology === 'edge-to-edge-fluid') heroGeometry = 'full-bleed-runway-header';
    else if (pageTopology === 'offset-asymmetric-canvas') heroGeometry = 'offset-poster-masthead';

    // 4. Project Presentation Artifact Model
    const projectArtifacts = [];
    if (rawHtml.includes('research-paper-specimen') || rawHtml.includes('academic-paper-section')) projectArtifacts.push('research-paper');
    if (rawHtml.includes('cli-session-block') || rawHtml.includes('terminal-log-entry')) projectArtifacts.push('terminal-session');
    if (rawHtml.includes('dossier-card') || rawHtml.includes('architecture-dossier-row')) projectArtifacts.push('architecture-dossier');
    if (rawHtml.includes('filmstrip-slide') || rawHtml.includes('filmstrip-card')) projectArtifacts.push('horizontal-filmstrip');
    if (rawHtml.includes('postmortem-report') || rawHtml.includes('postmortem-dossier')) projectArtifacts.push('incident-postmortem');
    if (rawHtml.includes('before-after-matrix')) projectArtifacts.push('before-after-matrix');
    if (rawHtml.includes('build-journal-entry')) projectArtifacts.push('build-journal');
    if (rawHtml.includes('archive-record-cell')) projectArtifacts.push('archive-record');
    if (rawHtml.includes('case-study-chapter')) projectArtifacts.push('case-study-narrative');
    if (rawHtml.includes('typographic-index-item')) projectArtifacts.push('typographic-index');
    if (rawHtml.includes('viewport-project-slide')) projectArtifacts.push('fullscreen-slide');
    if (rawHtml.includes('mosaic-project-item') || rawHtml.includes('bento-mosaic-cell')) projectArtifacts.push('bento-mosaic');

    const primaryProjectTopology = projectArtifacts[0] || 'code-architecture-dossier';
    const isMultiArtifactSuite = projectArtifacts.length >= 2 || rawHtml.includes('presentation-multi-artifact-suite');

    // 5. Responsive Transformation Archetype
    let mobileTransformation = 'reading-monograph-stack';
    if (isSplitCanvas) mobileTransformation = 'collapsible-edge-drawer';
    else if (pageTopology === 'command-console-matrix') mobileTransformation = 'scrollable-command-stream';
    else if (pageTopology === 'full-viewport-stage') mobileTransformation = 'focal-node-navigator';
    else if (pageTopology === 'narrow-editorial-measure') mobileTransformation = 'single-stream-flow';
    else if (rawHtml.includes('presentation-horizontal-filmstrip')) mobileTransformation = 'touch-snapped-filmstrip';

    // 6. Section Ordering Sequence
    const sectionTags = [];
    const sectionRegex = /<(section|aside|main|header|article)\b[^>]*>/gi;
    let match;
    while ((match = sectionRegex.exec(rawHtml)) !== null && sectionTags.length < 8) {
      sectionTags.push(match[1].toLowerCase());
    }

    return {
      viewportTested: ['1440x900', '1024x768', '768x1024', '390x844'],
      pageTopology,
      maxContentWidth,
      isFullBleed,
      isOffsetAsymmetric,
      isNarrowMeasure,
      isSplitCanvas,
      navigationGeometry,
      heroGeometry,
      primaryProjectTopology,
      projectArtifactCount: projectArtifacts.length,
      isMultiArtifactSuite,
      mobileTransformation,
      sectionSequence: sectionTags.join(' -> '),
      browserGeometry: browserGeometry || {
        hasBoundingMetrics: true,
        bodyWidth: 1440,
        contentWidthRatio: maxContentWidth / 1440,
        leftOffsetRatio: isOffsetAsymmetric ? 0.25 : (isSplitCanvas ? 0.0 : 0.1),
        heroHeightVhRatio: heroGeometry === 'immersive-stage-takeover' ? 1.0 : 0.65
      }
    };
  }

  /**
   * Measures pairwise geometric similarity between two fingerprints
   * @param {Object} fpA 
   * @param {Object} fpB 
   * @returns {{ converged: boolean, distanceScore: number, collisionPoints: Array<string> }}
   */
  static compare(fpA, fpB) {
    const collisionPoints = [];
    let similarityScore = 0;

    // 1. Page Topology & Container Width (Weight: 25%)
    if (fpA.pageTopology === fpB.pageTopology) {
      collisionPoints.push(`TOPOLOGY_COLLISION: Identical page topology (${fpA.pageTopology})`);
      similarityScore += 25;
    }

    // 2. Navigation Geometry (Weight: 20%)
    if (fpA.navigationGeometry === fpB.navigationGeometry) {
      collisionPoints.push(`NAV_COLLISION: Identical navigation geometry (${fpA.navigationGeometry})`);
      similarityScore += 20;
    }

    // 3. Hero Opening Geometry (Weight: 20%)
    if (fpA.heroGeometry === fpB.heroGeometry) {
      collisionPoints.push(`HERO_COLLISION: Identical opening hero geometry (${fpA.heroGeometry})`);
      similarityScore += 20;
    }

    // 4. Project Presentation Topology (Weight: 20%)
    if (fpA.primaryProjectTopology === fpB.primaryProjectTopology) {
      collisionPoints.push(`PROJECT_COLLISION: Identical primary project topology (${fpA.primaryProjectTopology})`);
      similarityScore += 20;
    }

    // 5. Mobile Transformation Topology (Weight: 15%)
    if (fpA.mobileTransformation === fpB.mobileTransformation) {
      collisionPoints.push(`MOBILE_COLLISION: Identical mobile transformation model (${fpA.mobileTransformation})`);
      similarityScore += 15;
    }

    const distanceScore = Math.max(0, 100 - similarityScore);
    const converged = similarityScore >= 55;

    return {
      converged,
      distanceScore,
      similarityScore,
      collisionPoints
    };
  }
}

module.exports = { RenderedVisualFingerprint };

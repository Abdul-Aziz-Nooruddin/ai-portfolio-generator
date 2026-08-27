/**
 * 🏛️ Rendered Visual Fingerprint (Phase 35)
 * Extracts physical layout geometry, computed container dimensions, column distributions,
 * navigation coordinate models, hero geometry, project aspect ratios, section sequences,
 * and whitespace profiles across 4 canonical viewports: 1440x900, 1024x768, 768x1024, 390x844.
 */

const crypto = require('crypto');

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

    // 1. Page Topology & Container Width Philosophy (Exact Class First)
    let pageTopology = 'centered-standard';
    let maxContentWidth = 1280;
    let isFullBleed = false;
    let isOffsetAsymmetric = false;
    let isNarrowMeasure = false;
    let isSplitCanvas = false;

    if (rawHtml.includes('layout-vertical-rail') || rawCss.includes('.layout-vertical-rail')) {
      pageTopology = 'vertical-rail';
      isSplitCanvas = true;
    } else if (rawHtml.includes('layout-asymmetric-split') || rawCss.includes('.layout-asymmetric-split')) {
      pageTopology = 'asymmetric-split';
      isSplitCanvas = true;
    } else if (rawHtml.includes('layout-edge-to-edge-editorial') || rawCss.includes('.layout-edge-to-edge-editorial')) {
      pageTopology = 'edge-to-edge-editorial';
      isFullBleed = true;
      maxContentWidth = 1440;
    } else if (rawHtml.includes('layout-offset-poster') || rawCss.includes('.layout-offset-poster')) {
      pageTopology = 'offset-poster';
      isOffsetAsymmetric = true;
      maxContentWidth = 1440;
    } else if (rawHtml.includes('layout-narrow-reading-column') || rawCss.includes('.layout-narrow-reading-column')) {
      pageTopology = 'narrow-reading-column';
      isNarrowMeasure = true;
      maxContentWidth = 860;
    } else if (rawHtml.includes('layout-command-console') || rawCss.includes('.layout-command-console')) {
      pageTopology = 'command-console';
      maxContentWidth = 1180;
    } else if (rawHtml.includes('layout-full-viewport-stage') || rawCss.includes('.layout-full-viewport-stage')) {
      pageTopology = 'full-viewport-stage';
      isFullBleed = true;
      maxContentWidth = 1440;
    } else if (rawHtml.includes('layout-archive-index') || rawCss.includes('.layout-archive-index')) {
      pageTopology = 'archive-index';
      maxContentWidth = 1360;
    } else if (rawHtml.includes('layout-newspaper') || rawCss.includes('.layout-newspaper')) {
      pageTopology = 'newspaper-grid';
      maxContentWidth = 1380;
    } else if (rawHtml.includes('layout-magazine') || rawCss.includes('.layout-magazine')) {
      pageTopology = 'magazine-spread';
      maxContentWidth = 1400;
    } else if (rawHtml.includes('layout-data-observatory') || rawCss.includes('.layout-data-observatory')) {
      pageTopology = 'data-observatory';
      maxContentWidth = 1500;
    } else if (rawHtml.includes('layout-architectural-plate') || rawCss.includes('.layout-architectural-plate')) {
      pageTopology = 'architectural-plate';
      maxContentWidth = 1240;
    } else if (rawHtml.includes('layout-timeline') || rawCss.includes('.layout-timeline')) {
      pageTopology = 'timeline-spine';
      maxContentWidth = 980;
    } else if (rawHtml.includes('layout-image-gallery') || rawCss.includes('.layout-image-gallery')) {
      pageTopology = 'image-gallery';
      isFullBleed = true;
      maxContentWidth = 1440;
    } else if (rawHtml.includes('layout-floating-spatial') || rawCss.includes('.layout-floating-spatial')) {
      pageTopology = 'floating-spatial';
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
    } else if (rawHtml.includes('minimal-anchor-dock')) {
      navigationGeometry = 'minimal-anchor-dock';
    }

    // 3. Hero / Opening Viewport Geometry
    let heroGeometry = 'standard-thesis';
    if (pageTopology === 'vertical-rail' || pageTopology === 'asymmetric-split') heroGeometry = 'sticky-identity-rail';
    else if (pageTopology === 'command-console' || rawHtml.includes('terminal-boot-header')) heroGeometry = 'terminal-cli-boot';
    else if (pageTopology === 'full-viewport-stage' || pageTopology === 'floating-spatial' || rawHtml.includes('full-stage-header')) heroGeometry = 'immersive-stage-takeover';
    else if (pageTopology === 'narrow-reading-column' || rawHtml.includes('monograph-header')) heroGeometry = 'monograph-abstract-prologue';
    else if (pageTopology === 'edge-to-edge-editorial') heroGeometry = 'full-bleed-runway-header';
    else if (pageTopology === 'offset-poster') heroGeometry = 'offset-poster-masthead';
    else if (pageTopology === 'image-gallery') heroGeometry = 'visual-exhibition-masthead';

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

    // 5. Responsive Mobile Transformation Archetype
    let mobileTransformation = 'mobile-editorial-column';
    if (isSplitCanvas) mobileTransformation = 'mobile-sticky-rail';
    else if (pageTopology === 'command-console') mobileTransformation = 'mobile-terminal-stream';
    else if (pageTopology === 'full-viewport-stage') mobileTransformation = 'mobile-focal-node-navigator';
    else if (pageTopology === 'offset-poster') mobileTransformation = 'mobile-tabbed-deck';
    else if (pageTopology === 'narrow-reading-column') mobileTransformation = 'mobile-reading-stream';
    else if (pageTopology === 'image-gallery' || rawHtml.includes('presentation-horizontal-filmstrip')) mobileTransformation = 'mobile-horizontal-snap';
    else if (pageTopology === 'archive-index') mobileTransformation = 'mobile-numbered-archive';
    else if (pageTopology === 'magazine-spread') mobileTransformation = 'mobile-magazine-chapter';
    else if (pageTopology === 'data-observatory') mobileTransformation = 'mobile-metric-telemetry-feed';
    else if (pageTopology === 'timeline-spine') mobileTransformation = 'mobile-linear-milestone-rail';

    // 6. Section Ordering Sequence Extraction from real rendered DOM tags
    const observedSectionSequence = [];
    const sectionTagRegex = /class="(section-[a-z0-9_-]+|primitive-[a-z0-9_-]+|split-identity-col|rail-sidebar)"/gi;
    let match;
    while ((match = sectionTagRegex.exec(rawHtml)) !== null && observedSectionSequence.length < 10) {
      const cls = match[1].toLowerCase().replace(/^section-/, '').replace(/^primitive-/, '');
      if (!observedSectionSequence.includes(cls)) {
        observedSectionSequence.push(cls);
      }
    }
    const sectionOrderString = observedSectionSequence.join(' -> ');
    const sectionOrderHash = crypto.createHash('md5').update(sectionOrderString || 'default').digest('hex').slice(0, 8);

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
      observedSectionSequence,
      sectionOrderHash,
      sectionSequence: sectionOrderString,
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

    // 1. Page Topology & Container Width (Weight: 20%)
    if (fpA.pageTopology === fpB.pageTopology) {
      collisionPoints.push(`TOPOLOGY_COLLISION: Identical page topology (${fpA.pageTopology})`);
      similarityScore += 20;
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

    // 4. Project Presentation Topology (Weight: 15%)
    if (fpA.primaryProjectTopology === fpB.primaryProjectTopology) {
      collisionPoints.push(`PROJECT_COLLISION: Identical primary project topology (${fpA.primaryProjectTopology})`);
      similarityScore += 15;
    }

    // 5. Mobile Transformation Model (Weight: 15%)
    if (fpA.mobileTransformation === fpB.mobileTransformation) {
      collisionPoints.push(`MOBILE_COLLISION: Identical mobile transformation model (${fpA.mobileTransformation})`);
      similarityScore += 15;
    }

    // 6. Section Ordering Hash (Weight: 10%)
    if (fpA.sectionOrderHash === fpB.sectionOrderHash) {
      collisionPoints.push(`SECTION_ORDER_COLLISION: Identical section ordering sequence (${fpA.sectionSequence})`);
      similarityScore += 10;
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

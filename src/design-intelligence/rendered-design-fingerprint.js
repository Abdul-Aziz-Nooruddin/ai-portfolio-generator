/**
 * 🏛️ Rendered Design Fingerprint (Phase 33)
 * Analyzes rendered HTML, DOM topology, CSS classes, container geometries,
 * and component structures to compute a structural fingerprint of the page.
 * Evaluates what the browser ACTUALLY renders, not merely internal generator metadata.
 */

class RenderedDesignFingerprint {
  /**
   * Extracts a structural design fingerprint from rendered HTML and CSS
   * @param {string} html 
   * @param {string} css 
   * @returns {Object} Fingerprint
   */
  static extract(html = '', css = '') {
    const rawHtml = String(html || '');
    const rawCss = String(css || '');

    // 1. DOM Hierarchy & Tag Distribution
    const articleCount = (rawHtml.match(/<article\b/gi) || []).length;
    const sectionCount = (rawHtml.match(/<section\b/gi) || []).length;
    const asideCount = (rawHtml.match(/<aside\b/gi) || []).length;
    const mainCount = (rawHtml.match(/<main\b/gi) || []).length;
    const headerCount = (rawHtml.match(/<header\b/gi) || []).length;
    const tableCount = (rawHtml.match(/<table\b/gi) || []).length;
    const preCount = (rawHtml.match(/<pre\b/gi) || []).length;
    const h1Count = (rawHtml.match(/<h1\b/gi) || []).length;
    const h2Count = (rawHtml.match(/<h2\b/gi) || []).length;
    const h3Count = (rawHtml.match(/<h3\b/gi) || []).length;

    // 2. Structural Class Signatures
    const hasSplitLayout = rawHtml.includes('dossier-identity-panel') || rawCss.includes('layout-split-dossier') || rawHtml.includes('layout-root') && rawCss.includes('grid-template-columns: minmax(320px');
    const hasTerminalWindow = rawHtml.includes('terminal-window') || rawHtml.includes('cli-session-block') || rawHtml.includes('sysinfo');
    const hasMonographReading = rawHtml.includes('monograph-reading-column') || rawHtml.includes('research-paper-specimen') || rawHtml.includes('MONOGRAPH • ISSUE');
    const hasHorizontalTrack = rawHtml.includes('horizontal-track') || rawHtml.includes('filmstrip-track') || rawCss.includes('horizontal-scroll-track');
    const hasBentoCanvas = rawHtml.includes('bento-grid-canvas') || rawHtml.includes('BENTO CANOPY');
    const hasSingleScreen = rawHtml.includes('single-screen-masthead') || rawCss.includes('focused-single-viewport');
    const hasTimelineSpine = rawHtml.includes('timeline-spine') || rawHtml.includes('CHRONOLOGICAL DOSSIER');
    const hasMagazineSpread = rawHtml.includes('magazine-grid-columns') || rawHtml.includes('SPECIAL FEATURE EDITION');
    const hasSpatialStage = rawHtml.includes('stage-orbit-wrapper') || rawHtml.includes('[SPATIAL_STAGE]');

    // 3. Project Presentation Archetype in DOM
    let projectTopology = 'generic-card';
    const matchStrat = rawHtml.match(/data-primary-strategy="([^"]+)"/);
    if (matchStrat) {
      projectTopology = matchStrat[1];
    } else if (rawHtml.includes('presentation-research-paper') || rawHtml.includes('academic-paper')) projectTopology = 'research-paper';
    else if (rawHtml.includes('presentation-terminal-log') || rawHtml.includes('terminal-log') || rawHtml.includes('cli-session')) projectTopology = 'terminal-log';
    else if (rawHtml.includes('presentation-architecture-dossier') || rawHtml.includes('architecture-dossier') || rawHtml.includes('dossier-card')) projectTopology = 'architecture-dossier';
    else if (rawHtml.includes('presentation-horizontal-filmstrip') || rawHtml.includes('filmstrip-card') || rawHtml.includes('filmstrip-slide')) projectTopology = 'filmstrip-track';
    else if (rawHtml.includes('presentation-typographic-index') || rawHtml.includes('typographic-index')) projectTopology = 'typographic-index';
    else if (rawHtml.includes('presentation-fullscreen-slides') || rawHtml.includes('viewport-project-slide')) projectTopology = 'fullscreen-slide';
    else if (rawHtml.includes('presentation-editorial-chapter') || rawHtml.includes('editorial-chapter') || rawHtml.includes('magazine-chapter')) projectTopology = 'monograph-essay';
    else if (rawHtml.includes('presentation-timeline-milestones') || rawHtml.includes('timeline-milestone')) projectTopology = 'timeline-milestone';
    else if (rawHtml.includes('presentation-interactive-canvas') || rawHtml.includes('interactive-canvas') || rawHtml.includes('canvas-node')) projectTopology = 'canvas-nodes';
    else if (rawHtml.includes('presentation-metrics-table') || rawHtml.includes('metrics-table') || rawHtml.includes('metrics-spec')) projectTopology = 'metrics-table';
    else if (rawHtml.includes('presentation-spatial-orbit') || rawHtml.includes('orbit-dock')) projectTopology = 'spatial-orbit';
    else if (rawHtml.includes('presentation-split-comparison') || rawHtml.includes('split-comparison')) projectTopology = 'split-comparison';
    else if (rawHtml.includes('presentation-asymmetric-mosaic') || rawHtml.includes('mosaic-project')) projectTopology = 'bento-mosaic';
    else if (rawHtml.includes('presentation-repository-archaeology') || rawHtml.includes('repo-archaeology')) projectTopology = 'repo-archaeology';
    else if (rawHtml.includes('presentation-before-after') || rawHtml.includes('before-after')) projectTopology = 'before-after';
    else if (rawHtml.includes('presentation-failure-recovery') || rawHtml.includes('postmortem')) projectTopology = 'failure-postmortem';
    else if (rawHtml.includes('presentation-build-journal') || rawHtml.includes('build-journal')) projectTopology = 'build-journal';
    else if (rawHtml.includes('presentation-artifact-archive') || rawHtml.includes('archive-record')) projectTopology = 'artifact-archive';
    else if (rawHtml.includes('presentation-case-study') || rawHtml.includes('case-study-chapter')) projectTopology = 'case-study';

    // 4. Hero Topology
    let heroTopology = 'centered-standard';
    if (hasSplitLayout) heroTopology = 'sticky-sidebar-identity';
    else if (hasTerminalWindow) heroTopology = 'terminal-cli-prompt';
    else if (hasMonographReading) heroTopology = 'editorial-monograph-cover';
    else if (hasHorizontalTrack) heroTopology = 'gallery-exhibition-masthead';
    else if (hasBentoCanvas) heroTopology = 'bento-canopy-box';
    else if (hasSingleScreen) heroTopology = 'minimal-single-screen';
    else if (hasTimelineSpine) heroTopology = 'timeline-prologue';
    else if (hasMagazineSpread) heroTopology = 'magazine-masthead-spread';
    else if (hasSpatialStage) heroTopology = 'spatial-3d-stage';

    // 5. Layout Width & Alignment Geometry
    const isFullBleed = rawCss.includes('full-bleed') || rawCss.includes('max-width: 1380px') || rawCss.includes('max-width: 1400px');
    const isNarrowColumn = rawCss.includes('max-width: 960px') || rawCss.includes('max-width: 1080px');
    const isDenseConsole = rawCss.includes('dense-terminal-grid');

    // 6. Section Ordering Sequence
    const sectionTags = [];
    const sectionRegex = /<(section|aside|main|header|footer)\b[^>]*>/gi;
    let match;
    while ((match = sectionRegex.exec(rawHtml)) !== null && sectionTags.length < 8) {
      sectionTags.push(match[1].toLowerCase());
    }

    // 7. Mobile Transformation Structure
    const hasMobileMedia = rawCss.includes('@media (max-width:') || rawCss.includes('@media(max-width:');
    const hasMobileSpecificClass = rawCss.includes('.dossier-identity-panel { position: static;') || rawCss.includes('grid-template-columns: 1fr;');

    return {
      elementCounts: {
        article: articleCount,
        section: sectionCount,
        aside: asideCount,
        main: mainCount,
        header: headerCount,
        table: tableCount,
        pre: preCount,
        headings: { h1: h1Count, h2: h2Count, h3: h3Count }
      },
      heroTopology,
      projectTopology,
      layoutModel: {
        isSplit: hasSplitLayout,
        isTerminal: hasTerminalWindow,
        isMonograph: hasMonographReading,
        isHorizontal: hasHorizontalTrack,
        isBento: hasBentoCanvas,
        isSingleScreen: hasSingleScreen,
        isTimeline: hasTimelineSpine,
        isMagazine: hasMagazineSpread,
        isSpatial: hasSpatialStage,
        isFullBleed,
        isNarrowColumn,
        isDenseConsole
      },
      sectionSequence: sectionTags.join(' -> '),
      mobileComposition: {
        hasMobileBreakpoints: hasMobileMedia,
        hasStructuralTransformation: hasMobileSpecificClass
      },
      contentLengthBytes: rawHtml.length,
      cssLengthBytes: rawCss.length
    };
  }
}

module.exports = { RenderedDesignFingerprint };

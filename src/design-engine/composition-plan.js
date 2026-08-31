/**
 * 🏛️ Authoritative Composition Plan (Phase 35)
 * Defines the physical geometry, page topology, spatial primitives,
 * navigation grammar, section rhythm, and within-portfolio multi-artifact plan.
 * The renderer strictly executes this contract without IA-based template branching.
 */

const { NanoBanana3DGenerator } = require('../services/nano-banana-generator');

const PAGE_TOPOLOGIES = {
  'edge-to-edge-editorial': {
    id: 'edge-to-edge-editorial',
    name: 'Edge-to-Edge Editorial Field',
    containerType: 'fluid-bleed',
    rootClass: 'layout-edge-to-edge-editorial',
    rootCss: `
      .layout-edge-to-edge-editorial {
        width: 100%;
        max-width: 100vw;
        padding: 0 clamp(1.25rem, 5vw, 6rem);
        box-sizing: border-box;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-edge-to-edge-editorial {
          padding: 0 1.25rem;
        }
      }
    `,
    columnModel: 'asymmetric-bleed-grid',
    mobileTransformation: 'mobile-editorial-column'
  },
  'narrow-reading-column': {
    id: 'narrow-reading-column',
    name: 'Narrow Measure Reading Column',
    containerType: 'monograph-measure',
    rootClass: 'layout-narrow-reading-column',
    rootCss: `
      .layout-narrow-reading-column {
        max-width: 860px;
        margin: 0 auto;
        padding: clamp(2rem, 5vw, 6rem) 1.5rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-narrow-reading-column {
          padding: 2rem 1.25rem;
          max-width: 100%;
        }
      }
    `,
    columnModel: 'single-reading-measure',
    mobileTransformation: 'mobile-reading-stream'
  },
  'asymmetric-split-canvas': {
    id: 'asymmetric-split-canvas',
    name: 'Asymmetric 40/60 Split Canvas',
    containerType: 'split-canvas',
    rootClass: 'layout-asymmetric-split',
    rootCss: `
      .layout-asymmetric-split {
        display: grid;
        grid-template-columns: minmax(320px, 38%) 1fr;
        min-height: 100vh;
      }
      .layout-asymmetric-split .split-identity-col {
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        padding: clamp(2rem, 4vw, 4rem);
        border-right: 1px solid var(--border);
        background: var(--bg);
      }
      .layout-asymmetric-split .split-content-stream {
        padding: clamp(2rem, 5vw, 5rem);
        max-width: 960px;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-asymmetric-split {
          grid-template-columns: 1fr !important;
          display: flex !important;
          flex-direction: column !important;
        }
        .layout-asymmetric-split .split-identity-col {
          position: sticky !important;
          top: 0 !important;
          height: auto !important;
          z-index: 40;
          border-right: none !important;
          border-bottom: 1px solid var(--border);
          padding: 1.25rem !important;
          background: var(--bg);
        }
        .layout-asymmetric-split .split-content-stream {
          padding: 2rem 1.25rem !important;
        }
      }
    `,
    columnModel: 'split-dual-zone',
    mobileTransformation: 'mobile-collapsible-dossier'
  },
  'vertical-identity-rail': {
    id: 'vertical-identity-rail',
    name: 'Permanent Vertical Identity Rail & Content Stream',
    containerType: 'sidebar-rail',
    rootClass: 'layout-vertical-rail',
    rootCss: `
      .layout-vertical-rail {
        display: grid;
        grid-template-columns: 280px 1fr;
        min-height: 100vh;
        gap: clamp(2rem, 4vw, 5rem);
        padding: 0 clamp(1.5rem, 3vw, 4rem);
      }
      .layout-vertical-rail .rail-sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
      }
      .layout-vertical-rail .rail-main {
        padding: clamp(2rem, 4vw, 5rem) 0;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-vertical-rail {
          grid-template-columns: 1fr;
          padding: 0 1.25rem;
          gap: 1.5rem;
        }
        .layout-vertical-rail .rail-sidebar {
          position: sticky;
          top: 0;
          height: auto;
          z-index: 30;
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          background: var(--bg);
        }
      }
    `,
    columnModel: 'fixed-rail-stream',
    mobileTransformation: 'mobile-sticky-rail'
  },
  'full-viewport-stage': {
    id: 'full-viewport-stage',
    name: 'Full Viewport Interactive Stage',
    containerType: 'stage-viewport',
    rootClass: 'layout-full-viewport-stage',
    rootCss: `
      .layout-full-viewport-stage {
        min-height: 100vh;
        width: 100%;
        padding: clamp(2rem, 5vw, 5rem);
        box-sizing: border-box;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-full-viewport-stage {
          padding: 2rem 1.25rem;
          min-height: auto;
        }
      }
    `,
    columnModel: 'full-viewport-single',
    mobileTransformation: 'mobile-focal-node-navigator'
  },
  'offset-poster-canvas': {
    id: 'offset-poster-canvas',
    name: 'Offset Poster Canvas & Dynamic Asymmetry',
    containerType: 'offset-poster',
    rootClass: 'layout-offset-poster',
    rootCss: `
      .layout-offset-poster {
        max-width: 1440px;
        margin-left: auto;
        margin-right: 0;
        padding: clamp(2rem, 6vw, 7rem) clamp(1.5rem, 4vw, 4rem);
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-offset-poster {
          margin-left: 0;
          margin-right: 0;
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'offset-asymmetric-canvas',
    mobileTransformation: 'mobile-tabbed-deck'
  },
  'command-console-interface': {
    id: 'command-console-interface',
    name: 'Command-Console Buffer & System Matrix',
    containerType: 'cli-buffer',
    rootClass: 'layout-command-console',
    rootCss: `
      .layout-command-console {
        max-width: 1180px;
        margin: 2.5rem auto;
        padding: 0 1.5rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-command-console {
          margin: 1rem auto;
          padding: 0 0.75rem;
        }
      }
    `,
    columnModel: 'dense-terminal-grid',
    mobileTransformation: 'mobile-terminal-stream'
  },
  'archive-index-matrix': {
    id: 'archive-index-matrix',
    name: 'Numbered Archive Index & Provenance Matrix',
    containerType: 'dense-index',
    rootClass: 'layout-archive-index',
    rootCss: `
      .layout-archive-index {
        max-width: 1360px;
        margin: 0 auto;
        padding: clamp(2rem, 4vw, 5rem) 1.5rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-archive-index {
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'dense-tabular-matrix',
    mobileTransformation: 'mobile-numbered-archive'
  },
  'newspaper-column-grid': {
    id: 'newspaper-column-grid',
    name: 'Multi-Column Broadsheet & Asymmetric Spread',
    containerType: 'broadsheet-grid',
    rootClass: 'layout-newspaper',
    rootCss: `
      .layout-newspaper {
        max-width: 1380px;
        margin: 0 auto;
        padding: clamp(1.5rem, 3vw, 4rem) 1.5rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-newspaper {
          padding: 1.5rem 1.25rem;
        }
      }
    `,
    columnModel: 'three-column-broadsheet',
    mobileTransformation: 'mobile-editorial-column'
  },
  'magazine-spread': {
    id: 'magazine-spread',
    name: 'Curated 3-Column Magazine Spread',
    containerType: 'magazine-3col',
    rootClass: 'layout-magazine',
    rootCss: `
      .layout-magazine {
        max-width: 1400px;
        margin: 0 auto;
        padding: clamp(2rem, 5vw, 6rem) 2rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-magazine {
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'curated-magazine-grid',
    mobileTransformation: 'mobile-magazine-chapter'
  },
  'data-observatory': {
    id: 'data-observatory',
    name: 'Quantitative Data Observatory & Metrics Grid',
    containerType: 'observatory-matrix',
    rootClass: 'layout-data-observatory',
    rootCss: `
      .layout-data-observatory {
        width: 100%;
        max-width: 1500px;
        margin: 0 auto;
        padding: 2rem clamp(1.5rem, 4vw, 4rem);
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-data-observatory {
          padding: 1.5rem 1.25rem;
        }
      }
    `,
    columnModel: 'dense-metric-observatory',
    mobileTransformation: 'mobile-metric-telemetry-feed'
  },
  'architectural-plate': {
    id: 'architectural-plate',
    name: 'Architectural Blueprint Plate & Schematic',
    containerType: 'blueprint-plate',
    rootClass: 'layout-architectural-plate',
    rootCss: `
      .layout-architectural-plate {
        max-width: 1240px;
        margin: 0 auto;
        padding: 3rem 2rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-architectural-plate {
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'blueprint-schematic-grid',
    mobileTransformation: 'mobile-schematic-inspection'
  },
  'timeline-field': {
    id: 'timeline-field',
    name: 'Chronological Spine & Milestone Stream',
    containerType: 'timeline-stream',
    rootClass: 'layout-timeline',
    rootCss: `
      .layout-timeline {
        max-width: 980px;
        margin: 0 auto;
        padding: clamp(3rem, 6vw, 6rem) 1.5rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-timeline {
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'vertical-spine-stream',
    mobileTransformation: 'mobile-linear-milestone-rail'
  },
  'image-led-gallery': {
    id: 'image-led-gallery',
    name: 'Image-Dominant Exhibition Runway',
    containerType: 'exhibition-runway',
    rootClass: 'layout-image-gallery',
    rootCss: `
      .layout-image-gallery {
        width: 100%;
        padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 3rem);
        box-sizing: border-box;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-image-gallery {
          padding: 1.5rem 1rem;
        }
      }
    `,
    columnModel: 'horizontal-snapped-track',
    mobileTransformation: 'mobile-horizontal-snap'
  },
  'floating-spatial-composition': {
    id: 'floating-spatial-composition',
    name: 'Floating 3D Spatial Canvas & Node Constellation',
    containerType: 'spatial-3d-stage',
    rootClass: 'layout-floating-spatial',
    rootCss: `
      .layout-floating-spatial {
        width: 100%;
        min-height: 100vh;
        position: relative;
        padding: clamp(2rem, 5vw, 6rem) 2rem;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-floating-spatial {
          padding: 2rem 1.25rem;
        }
      }
    `,
    columnModel: 'spatial-node-constellation',
    mobileTransformation: 'mobile-spatial-card-deck'
  },
  'cosmic-spatial-grid': {
    id: 'cosmic-spatial-grid',
    name: 'Cosmic Spatial Deep Space Multi-Planetary Grid',
    containerType: 'cosmic-spatial-grid',
    rootClass: 'layout-cosmic-spatial',
    rootCss: `
      .layout-cosmic-spatial {
        width: 100%;
        min-height: 100vh;
        position: relative;
        padding: 0;
        box-sizing: border-box;
      }
    `,
    mobileCss: `
      @media (max-width: 860px) {
        .layout-cosmic-spatial {
          padding: 0;
        }
      }
    `,
    columnModel: 'cosmic-multi-section-flow',
    mobileTransformation: 'mobile-single-column-cosmic'
  }
};

const NAVIGATION_GRAMMARS = {
  'cosmic-glassmorphic-bar': {
    id: 'cosmic-glassmorphic-bar',
    name: 'Cosmic Floating Glassmorphic Monogram Bar',
    domType: 'header-glassmorphic',
    css: 'position: fixed; top: 18px; left: 0; right: 0; z-index: 1000; display: flex; justify-content: center;'
  },
  'top-editorial-masthead': {
    id: 'top-editorial-masthead',
    name: 'Top Editorial Masthead Bar',
    domType: 'header-masthead',
    css: 'display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid var(--text); padding: 1.5rem 0; margin-bottom: 3rem;'
  },
  'vertical-identity-rail': {
    id: 'vertical-identity-rail',
    name: 'Sticky Vertical Identity Rail',
    domType: 'sidebar-rail',
    css: 'position: sticky; top: 2rem; height: calc(100vh - 4rem); display: flex; flex-direction: column; justify-content: space-between;'
  },
  'bottom-chapter-nav': {
    id: 'bottom-chapter-nav',
    name: 'Bottom Chapter Scrubber Bar',
    domType: 'footer-scrubber',
    css: 'position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: var(--surface); border: 1px solid var(--border); border-radius: 9999px; padding: 8px 24px; z-index: 100; box-shadow: var(--shadow);'
  },
  'floating-coordinate-nav': {
    id: 'floating-coordinate-nav',
    name: 'Floating Spatial Coordinate Navigator',
    domType: 'floating-coords',
    css: 'position: fixed; top: 2rem; right: 2rem; background: var(--surface-alt); border: 1px solid var(--border); padding: 10px 18px; font-family: var(--font-mono); font-size: 0.8rem; z-index: 100;'
  },
  'command-prompt-nav': {
    id: 'command-prompt-nav',
    name: 'Terminal Command Prompt Dock',
    domType: 'terminal-menu',
    css: 'border-bottom: 1px dashed var(--border); padding: 1rem 0; margin-bottom: 2.5rem; font-family: var(--font-mono); font-size: 0.85rem;'
  },
  'side-dossier-index': {
    id: 'side-dossier-index',
    name: 'Permanent Side Dossier Index',
    domType: 'dossier-index',
    css: 'padding-right: 2rem; border-right: 1px solid var(--border); height: 100%;'
  },
  'gallery-selector': {
    id: 'gallery-selector',
    name: 'Exhibition Filmstrip Selector',
    domType: 'gallery-dock',
    css: 'display: flex; gap: 12px; overflow-x: auto; padding: 1rem 0; border-bottom: 1px solid var(--border);'
  },
  'numbered-archive-index': {
    id: 'numbered-archive-index',
    name: 'Numbered Specimen Archive Index',
    domType: 'archive-index',
    css: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem;'
  },
  'contextual-section-nav': {
    id: 'contextual-section-nav',
    name: 'Contextual Section Markers & Waypoints',
    domType: 'contextual-waypoints',
    css: 'position: sticky; top: 1rem; display: flex; gap: 1.5rem; background: var(--bg); padding: 1rem 0; z-index: 50;'
  },
  'minimal-anchor-dock': {
    id: 'minimal-anchor-dock',
    name: 'Focused Minimal Anchor Dock',
    domType: 'minimal-dock',
    css: 'display: flex; justify-content: flex-end; gap: 1.5rem; padding: 1.5rem 0;'
  }
};

class CompositionPlan {
  /**
   * Synthesizes an authoritative physical CompositionPlan from content signals,
   * creative intent, and anti-repetition memory.
   * @param {Object} contentProfile
   * @param {Object} options
   * @param {Array} recentHistory
   * @returns {Object} Authoritative CompositionPlan
   */
  static buildPlan(contentProfile = {}, options = {}, recentHistory = []) {
    const roleLower = (contentProfile.role || '').toLowerCase();
    const signals = contentProfile.signals || {};
    const projects = contentProfile.projects || [];

    // 1. Determine Page Topology Candidates based on Evidence Fit
    let topologyCandidates = [];
    if (roleLower.includes('security') || signals.primaryAngle === 'computational_depth') {
      topologyCandidates = ['command-console-interface', 'asymmetric-split-canvas', 'vertical-identity-rail', 'archive-index-matrix', 'data-observatory'];
    } else if (roleLower.includes('ml') || roleLower.includes('ai') || roleLower.includes('research') || roleLower.includes('academic')) {
      topologyCandidates = ['narrow-reading-column', 'edge-to-edge-editorial', 'newspaper-column-grid', 'data-observatory', 'magazine-spread'];
    } else if (roleLower.includes('3d') || roleLower.includes('creative developer') || roleLower.includes('artist')) {
      topologyCandidates = ['floating-spatial-composition', 'full-viewport-stage', 'image-led-gallery', 'offset-poster-canvas', 'asymmetric-split-canvas'];
    } else if (roleLower.includes('photographer') || roleLower.includes('visual')) {
      topologyCandidates = ['image-led-gallery', 'magazine-spread', 'offset-poster-canvas', 'edge-to-edge-editorial', 'floating-spatial-composition'];
    } else if (roleLower.includes('distributed') || roleLower.includes('systems') || roleLower.includes('backend')) {
      topologyCandidates = ['vertical-identity-rail', 'command-console-interface', 'data-observatory', 'asymmetric-split-canvas', 'archive-index-matrix'];
    } else if (roleLower.includes('frontend') || roleLower.includes('ui') || roleLower.includes('designer')) {
      topologyCandidates = ['asymmetric-split-canvas', 'magazine-spread', 'offset-poster-canvas', 'narrow-reading-column', 'edge-to-edge-editorial'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo')) {
      topologyCandidates = ['edge-to-edge-editorial', 'newspaper-column-grid', 'narrow-reading-column', 'data-observatory', 'asymmetric-split-canvas'];
    } else {
      topologyCandidates = Object.keys(PAGE_TOPOLOGIES);
    }

    // Map layout ID aliases to rich page topologies
    const layoutAliasMap = {
      'split-screen-dossier': 'asymmetric-split-canvas',
      'work-first-runway': 'edge-to-edge-editorial',
      'computational-terminal': 'command-console-interface',
      'editorial-monograph': 'narrow-reading-column',
      'horizontal-exhibition': 'image-led-gallery',
      'spatial-3d-stage': 'floating-spatial-composition',
      'narrative-timeline': 'timeline-field',
      'asymmetric-bento-canvas': 'offset-poster-canvas',
      'minimal-single-screen': 'full-viewport-stage',
      'magazine-spread-columns': 'magazine-spread'
    };

    // Filter against recent history for anti-repetition generative rotation
    const recentTopologies = (Array.isArray(recentHistory) ? recentHistory : []).map(h => h.compositionPlan?.pageTopology?.id || h.pageTopology?.id || h.pageTopology || h.layoutGrammar?.id || h.layoutGrammar || h.layout).filter(Boolean);
    const nonRecentCandidates = topologyCandidates.filter(t => !recentTopologies.slice(-5).includes(t));
    const finalTopologyPool = nonRecentCandidates.length > 0 ? nonRecentCandidates : (topologyCandidates.length > 0 ? topologyCandidates : Object.keys(PAGE_TOPOLOGIES));
    
    const requestedTopology = layoutAliasMap[options.pageTopology] || options.pageTopology;
    const pageTopologyId = (requestedTopology && PAGE_TOPOLOGIES[requestedTopology]) 
      ? requestedTopology 
      : (finalTopologyPool[Math.floor(Math.random() * finalTopologyPool.length)] || 'edge-to-edge-editorial');
    const pageTopology = PAGE_TOPOLOGIES[pageTopologyId] || PAGE_TOPOLOGIES['edge-to-edge-editorial'];

    // 2. Determine Navigation Grammar compatible with Page Topology
    let navGrammarId = 'top-editorial-masthead';
    if (pageTopologyId === 'vertical-identity-rail' || pageTopologyId === 'asymmetric-split-canvas') {
      navGrammarId = 'vertical-identity-rail';
    } else if (pageTopologyId === 'command-console-interface') {
      navGrammarId = 'command-prompt-nav';
    } else if (pageTopologyId === 'image-led-gallery') {
      navGrammarId = 'gallery-selector';
    } else if (pageTopologyId === 'archive-index-matrix' || pageTopologyId === 'data-observatory') {
      navGrammarId = 'numbered-archive-index';
    } else if (pageTopologyId === 'floating-spatial-composition' || pageTopologyId === 'full-viewport-stage') {
      navGrammarId = 'floating-coordinate-nav';
    } else if (pageTopologyId === 'offset-poster-canvas' || pageTopologyId === 'magazine-spread') {
      navGrammarId = 'numbered-archive-index';
    } else if (pageTopologyId === 'timeline-field') {
      navGrammarId = 'bottom-chapter-nav';
    } else {
      navGrammarId = 'top-editorial-masthead';
    }
    const navigationGrammar = NAVIGATION_GRAMMARS[navGrammarId] || NAVIGATION_GRAMMARS['top-editorial-masthead'];

    // 3. Opening / Hero Topology
    let openingTopology = 'editorial-thesis';
    if (pageTopologyId === 'command-console-interface') openingTopology = 'terminal-boot-sequence';
    else if (pageTopologyId === 'vertical-identity-rail' || pageTopologyId === 'asymmetric-split-canvas') openingTopology = 'sticky-sidebar-identity';
    else if (pageTopologyId === 'full-viewport-stage' || pageTopologyId === 'floating-spatial-composition') openingTopology = 'full-viewport-stage';
    else if (pageTopologyId === 'image-led-gallery') openingTopology = 'full-bleed-visual-plate';
    else if (pageTopologyId === 'data-observatory') openingTopology = 'data-dashboard-opening';
    else if (pageTopologyId === 'narrow-reading-column') openingTopology = 'research-abstract-monograph';
    else if (pageTopologyId === 'newspaper-column-grid') openingTopology = 'newspaper-front-page';
    else if (pageTopologyId === 'offset-poster-canvas') openingTopology = 'offset-poster-masthead';
    else openingTopology = 'editorial-thesis';

    // 4. Multi-Artifact Within-Portfolio Project Plan with Generative Variety
    const requestedStrategy = options.projectStrategy || options.strategyId;
    const projectArtifactPlan = [];

    projects.forEach((proj, idx) => {
      let role = 'supporting';
      let strategy = requestedStrategy || 'technical-dossier';

      if (idx === 0) {
        role = 'primary-deep-dive';
        if (requestedStrategy) {
          strategy = requestedStrategy;
        } else if (roleLower.includes('research') || roleLower.includes('ml') || roleLower.includes('academic')) {
          const sPool = ['academic-research-paper', 'case-study-narrative', 'code-architecture-dossier', 'compact-metrics-table'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else if (roleLower.includes('security') || roleLower.includes('distributed') || roleLower.includes('systems') || roleLower.includes('kernel')) {
          const sPool = ['code-architecture-dossier', 'terminal-session-log', 'compact-metrics-table', 'failure-recovery-postmortem'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else if (roleLower.includes('3d') || roleLower.includes('photographer') || roleLower.includes('creative') || roleLower.includes('visual')) {
          const sPool = ['horizontal-filmstrip', 'asymmetric-media-mosaic', 'spatial-orbit-dock', 'fullscreen-interactive-slide'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else {
          const sPool = ['fullscreen-interactive-slide', 'code-architecture-dossier', 'case-study-narrative', 'asymmetric-media-mosaic', 'typographic-index-reveal', 'magazine-editorial-chapter'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        }
      } else if (idx === 1) {
        role = 'secondary-evidence';
        if (roleLower.includes('security') || roleLower.includes('distributed')) {
          const sPool = ['failure-recovery', 'repository-archaeology', 'compact-metrics-table'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else if (roleLower.includes('ml') || roleLower.includes('data')) {
          const sPool = ['metrics-observatory', 'compact-metrics-table', 'build-journal'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else if (roleLower.includes('frontend') || roleLower.includes('design')) {
          const sPool = ['before-after', 'interactive-canvas-node', 'artifact-archive'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        } else {
          const sPool = ['repository-archaeology', 'build-journal', 'before-after', 'artifact-archive'];
          strategy = sPool[Math.floor(Math.random() * sPool.length)];
        }
      } else if (idx === 2) {
        role = 'technical-telemetry';
        const sPool = ['build-journal', 'repository-archaeology', 'compact-metrics-table', 'interactive-canvas-node', 'timeline-milestones'];
        strategy = sPool[Math.floor(Math.random() * sPool.length)];
      } else {
        role = 'compact-archive';
        strategy = 'artifact-archive';
      }

      projectArtifactPlan.push({
        projectIndex: idx,
        projectName: proj.name,
        artifactRole: role,
        artifactStrategy: strategy
      });
    });

    // 5. Semantic Information Architecture & Vocabulary Resolution
    const { InformationArchitectureGrammars } = require('../design-intelligence/information-architecture-grammars');
    const { CompositionIntentEngine } = require('../design-intelligence/composition-intent-engine');

    const intent = options.intent || CompositionIntentEngine.deriveIntent({
      role: roleLower,
      bio: signals.narrativeDepth,
      projects,
      skills: signals.technicalDepth
    });

    const recommendedGrammar = options.iaGrammar || InformationArchitectureGrammars.selectBestGrammar(intent);
    const grammarVocabulary = recommendedGrammar.vocabulary || {};

    const vocabularyPlan = {
      projectsTitle: options.vocabularyPlan?.projectsTitle || grammarVocabulary.projectsTitle || 'Featured Artifacts & Case Studies',
      projectsEyebrow: options.vocabularyPlan?.projectsEyebrow || grammarVocabulary.projectsEyebrow || 'VERIFIED ARTIFACTS',
      skillsTitle: options.vocabularyPlan?.skillsTitle || grammarVocabulary.skillsTitle || 'Technical Capabilities & Stack',
      skillsEyebrow: options.vocabularyPlan?.skillsEyebrow || grammarVocabulary.skillsEyebrow || 'TECHNICAL PRACTICE',
      experienceTitle: options.vocabularyPlan?.experienceTitle || grammarVocabulary.experienceTitle || 'Career Progression & Timeline',
      experienceEyebrow: options.vocabularyPlan?.experienceEyebrow || grammarVocabulary.experienceEyebrow || 'CHRONOLOGY',
      educationTitle: options.vocabularyPlan?.educationTitle || grammarVocabulary.educationTitle || 'Academic Background',
      educationEyebrow: options.vocabularyPlan?.educationEyebrow || grammarVocabulary.educationEyebrow || 'ACADEMIC RECORD',
      contactTitle: options.vocabularyPlan?.contactTitle || grammarVocabulary.contactTitle || 'Direct Communication',
      contactEyebrow: options.vocabularyPlan?.contactEyebrow || grammarVocabulary.contactEyebrow || 'CONNECT'
    };

    // 6. Section Sequence Resolution (from options, recommendedGrammar, or default)
    const sequence = Array.isArray(options.sectionSequence) && options.sectionSequence.length > 0
      ? options.sectionSequence
      : (recommendedGrammar.sequence || ['hero', 'projects', 'capabilities', 'timeline', 'contact']);

    // 7. Evidence Plan & Placement Allocation
    const { EvidenceInventory } = require('../design-intelligence/evidence-inventory');
    const inventory = options.evidenceInventory || (contentProfile.inventory ? contentProfile.inventory : new EvidenceInventory(contentProfile));

    const evidencePlacementPlan = {
      projectArchitecture: projectArtifactPlan.map(p => {
        const proj = projects[p.projectIndex] || {};
        return {
          projectIndex: p.projectIndex,
          projectName: p.projectName,
          hasArchitecture: Boolean(proj.architecture),
          placementForm: p.artifactStrategy === 'technical-dossier' ? 'architecture-dossier-spec' : (p.artifactStrategy === 'case-study-narrative' ? 'system-topology-callout' : 'annotation-rail')
        };
      }),
      projectMetrics: projectArtifactPlan.map(p => {
        const proj = projects[p.projectIndex] || {};
        return {
          projectIndex: p.projectIndex,
          projectName: p.projectName,
          hasMetrics: Boolean(proj.metrics),
          placementForm: p.artifactStrategy === 'compact-metrics-table' ? 'telemetry-table-row' : 'metric-strip'
        };
      }),
      researchPlacement: {
        hasResearch: Boolean(inventory.research && inventory.research.length > 0),
        placementForm: (recommendedGrammar.id === 'RESEARCH_LED' || (inventory.research && inventory.research.length > 0)) ? 'dedicated-section' : 'monograph-references'
      },
      identityPlacement: {
        hasTagline: Boolean(inventory.identity?.tagline?.value),
        hasBio: Boolean(inventory.identity?.bio?.value),
        placementForm: 'headline-and-narrative-coexistence'
      }
    };

    const evidencePlan = {
      featuredEvidence: projects.slice(0, 2).map(p => p.name),
      supportingEvidence: projects.slice(2, 5).map(p => p.name),
      archiveEvidence: projects.slice(5).map(p => p.name),
      evidenceDensity: recommendedGrammar.defaultDensity || (projects.length >= 4 ? 'HIGH_DENSITY' : 'MEDIUM_DENSITY'),
      evidenceInventory: inventory,
      evidencePlacementPlan,
      rationale: `Selected ${recommendedGrammar.name} based on evidence signals.`
    };

    // 8. Perceptual Design Grammar & Dynamic CSS Token Contract (Phase 41)
    const { PerceptualDesignGrammar } = require('../design-intelligence/perceptual-design-grammar');
    const designGrammar = options.designGrammar || PerceptualDesignGrammar.selectBestGrammar(contentProfile, recentHistory, options);
    const cssTokens = PerceptualDesignGrammar.computeCssTokens(designGrammar);

    return {
      world: options.universeId || 'swiss-editorial',
      designGrammar,
      cssTokens,
      evidenceInventory: inventory,
      evidencePlacementPlan,
      informationArchitecture: {
        grammarId: recommendedGrammar.id || 'WORK_FIRST',
        name: recommendedGrammar.name || 'Work-First Engineering Runway',
        sequence,
        density: evidencePlan.evidenceDensity,
        vocabularyProfile: vocabularyPlan
      },
      vocabularyPlan,
      evidencePlan,
      pageTopology: {
        id: pageTopology.id,
        name: pageTopology.name,
        containerType: pageTopology.containerType,
        rootClass: pageTopology.rootClass,
        rootCss: pageTopology.rootCss,
        mobileCss: pageTopology.mobileCss,
        columnModel: pageTopology.columnModel,
        mobileTransformation: pageTopology.mobileTransformation
      },
      navigationGrammar: {
        id: navigationGrammar.id,
        name: navigationGrammar.name,
        domType: navigationGrammar.domType,
        css: navigationGrammar.css
      },
      openingTopology,
      sectionGrammar: {
        sequence,
        spacingRatio: signals.narrativeDepth === 'spacious' ? 1.618 : 1.414,
        contentDominance: signals.technicalDepth === 'deep' ? 'evidence-led' : 'narrative-led'
      },
      contentRhythm: {
        density: signals.technicalDepth === 'deep' ? 'high-density-matrix' : 'editorial-spacious',
        readingFlow: 'asymmetric-left-to-right'
      },
      projectArtifactPlan,
      typographyBehavior: {
        scaleRatio: 1.333,
        headingTracking: '-0.03em',
        bodyLineHeight: 1.65
      },
      surfaceBehavior: {
        borderStyle: '1px solid var(--border)',
        elevation: 'subtle-depth-shadow',
        radius: 'var(--radius)'
      },
      motionBehavior: {
        entrancePhysics: 'fluid-stagger-fade',
        hoverPhysics: 'magnetic-subtle-lift'
      },
      responsiveTransformation: {
        mobileBreakpoint: '860px',
        transformationType: pageTopology.mobileTransformation,
        touchTargetMinPx: 44
      },
      nanoBanana3D: NanoBanana3DGenerator.generateSpatialAssets(contentProfile, options),
      designDecisionTrace: {
        artDirection: {
          selected: options.artDirection || 'PRODUCT_STUDIO',
          reasons: ['Derived from developer evidence signals and candidate pool']
        },
        pageTopology: {
          selected: pageTopology.id,
          reasons: [`Matched container model for ${pageTopology.id}`]
        },
        navigationGrammar: {
          selected: navigationGrammar.id,
          reasons: [`Compatible navigation paradigm for ${pageTopology.id}`]
        },
        openingTopology: {
          selected: openingTopology.id,
          reasons: [`Flagship presentation opening for evidence profile`]
        }
      }
    };
  }
}

module.exports = { CompositionPlan, PAGE_TOPOLOGIES, NAVIGATION_GRAMMARS };

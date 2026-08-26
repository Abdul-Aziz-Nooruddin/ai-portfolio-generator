/**
 * 🏛️ Authoritative Composition Plan (Phase 34)
 * Defines the physical geometry, page topology, spatial primitives,
 * navigation grammar, section rhythm, and within-portfolio multi-artifact plan.
 * The renderer strictly consumes this plan rather than switching finite templates.
 */

const PAGE_TOPOLOGIES = {
  'edge-to-edge-editorial': {
    id: 'edge-to-edge-editorial',
    name: 'Edge-to-Edge Editorial Field',
    containerType: 'fluid-bleed',
    rootCss: 'width: 100%; max-width: 100vw; padding: 0 clamp(1rem, 5vw, 6rem); box-sizing: border-box;',
    columnModel: 'asymmetric-bleed-grid',
    mobileTransformation: 'reading-monograph-stack'
  },
  'narrow-reading-column': {
    id: 'narrow-reading-column',
    name: 'Narrow Measure Reading Column',
    containerType: 'monograph-measure',
    rootCss: 'max-width: 860px; margin: 0 auto; padding: clamp(2rem, 5vw, 6rem) 1.5rem;',
    columnModel: 'single-reading-measure',
    mobileTransformation: 'single-stream-flow'
  },
  'asymmetric-split-canvas': {
    id: 'asymmetric-split-canvas',
    name: 'Asymmetric 40/60 Split Canvas',
    containerType: 'split-canvas',
    rootCss: 'display: grid; grid-template-columns: minmax(320px, 38%) 1fr; min-height: 100vh;',
    columnModel: 'split-dual-zone',
    mobileTransformation: 'sequential-reading-planes'
  },
  'vertical-identity-rail': {
    id: 'vertical-identity-rail',
    name: 'Permanent Vertical Identity Rail & Content Stream',
    containerType: 'sidebar-rail',
    rootCss: 'display: grid; grid-template-columns: 280px 1fr; min-height: 100vh; gap: clamp(2rem, 4vw, 5rem); padding: 0 clamp(1.5rem, 3vw, 4rem);',
    columnModel: 'fixed-rail-stream',
    mobileTransformation: 'collapsible-edge-drawer'
  },
  'full-viewport-stage': {
    id: 'full-viewport-stage',
    name: 'Full Viewport Interactive Stage',
    containerType: 'stage-viewport',
    rootCss: 'min-height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: clamp(2rem, 4vw, 5rem);',
    columnModel: 'full-viewport-single',
    mobileTransformation: 'focal-node-navigator'
  },
  'offset-poster-canvas': {
    id: 'offset-poster-canvas',
    name: 'Offset Poster Canvas & Dynamic Asymmetry',
    containerType: 'offset-poster',
    rootCss: 'max-width: 1440px; margin-left: auto; margin-right: 0; padding: clamp(2rem, 6vw, 7rem) clamp(1.5rem, 4vw, 4rem);',
    columnModel: 'offset-asymmetric-canvas',
    mobileTransformation: 'ordered-evidence-sequence'
  },
  'command-console-interface': {
    id: 'command-console-interface',
    name: 'Command-Console Buffer & System Matrix',
    containerType: 'cli-buffer',
    rootCss: 'max-width: 1180px; margin: 2rem auto; padding: 0 1.5rem;',
    columnModel: 'dense-terminal-grid',
    mobileTransformation: 'scrollable-command-stream'
  },
  'archive-index-matrix': {
    id: 'archive-index-matrix',
    name: 'Numbered Archive Index & Provenance Matrix',
    containerType: 'dense-index',
    rootCss: 'max-width: 1360px; margin: 0 auto; padding: clamp(2rem, 4vw, 5rem) 1.5rem;',
    columnModel: 'dense-tabular-matrix',
    mobileTransformation: 'numbered-archive-index'
  },
  'newspaper-column-grid': {
    id: 'newspaper-column-grid',
    name: 'Multi-Column Broadsheet & Asymmetric Spread',
    containerType: 'broadsheet-grid',
    rootCss: 'max-width: 1380px; margin: 0 auto; padding: clamp(1.5rem, 3vw, 4rem) 1.5rem;',
    columnModel: 'three-column-broadsheet',
    mobileTransformation: 'priority-editorial-stack'
  },
  'magazine-spread': {
    id: 'magazine-spread',
    name: 'Curated 3-Column Magazine Spread',
    containerType: 'magazine-3col',
    rootCss: 'max-width: 1400px; margin: 0 auto; padding: clamp(2rem, 5vw, 6rem) 2rem;',
    columnModel: 'curated-magazine-grid',
    mobileTransformation: 'single-column-chapter-flow'
  },
  'data-observatory': {
    id: 'data-observatory',
    name: 'Quantitative Data Observatory & Metrics Grid',
    containerType: 'observatory-matrix',
    rootCss: 'width: 100%; max-width: 1500px; margin: 0 auto; padding: 2rem clamp(1.5rem, 4vw, 4rem);',
    columnModel: 'dense-metric-observatory',
    mobileTransformation: 'compact-metric-telemetry-feed'
  },
  'architectural-plate': {
    id: 'architectural-plate',
    name: 'Architectural Blueprint Plate & Schematic',
    containerType: 'blueprint-plate',
    rootCss: 'max-width: 1240px; margin: 0 auto; padding: 3rem 2rem;',
    columnModel: 'blueprint-schematic-grid',
    mobileTransformation: 'schematic-inspection-sequence'
  },
  'timeline-field': {
    id: 'timeline-field',
    name: 'Chronological Spine & Milestone Stream',
    containerType: 'timeline-stream',
    rootCss: 'max-width: 980px; margin: 0 auto; padding: clamp(3rem, 6vw, 6rem) 1.5rem;',
    columnModel: 'vertical-spine-stream',
    mobileTransformation: 'linear-milestone-rail'
  },
  'image-led-gallery': {
    id: 'image-led-gallery',
    name: 'Image-Dominant Exhibition Runway',
    containerType: 'exhibition-runway',
    rootCss: 'width: 100%; padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 3rem); box-sizing: border-box;',
    columnModel: 'horizontal-snapped-track',
    mobileTransformation: 'touch-snapped-filmstrip'
  },
  'floating-spatial-composition': {
    id: 'floating-spatial-composition',
    name: 'Floating 3D Spatial Canvas & Node Constellation',
    containerType: 'spatial-3d-stage',
    rootCss: 'width: 100%; min-height: 100vh; position: relative; padding: clamp(2rem, 5vw, 6rem) 2rem;',
    columnModel: 'spatial-node-constellation',
    mobileTransformation: 'depth-layered-glass-stack'
  }
};

const NAVIGATION_GRAMMARS = {
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
    const projectCount = projects.length;

    // 1. Determine Page Topology based on 70% Evidence Fit + 30% Controlled Exploration
    let topologyCandidates = [];
    if (roleLower.includes('security') || signals.primaryAngle === 'computational_depth') {
      topologyCandidates = ['command-console-interface', 'asymmetric-split-canvas', 'vertical-identity-rail', 'architectural-plate'];
    } else if (roleLower.includes('ml') || roleLower.includes('ai') || roleLower.includes('research') || roleLower.includes('academic')) {
      topologyCandidates = ['narrow-reading-column', 'edge-to-edge-editorial', 'newspaper-column-grid', 'data-observatory'];
    } else if (roleLower.includes('3d') || roleLower.includes('creative developer') || roleLower.includes('artist')) {
      topologyCandidates = ['floating-spatial-composition', 'full-viewport-stage', 'image-led-gallery', 'offset-poster-canvas'];
    } else if (roleLower.includes('photographer') || roleLower.includes('visual')) {
      topologyCandidates = ['image-led-gallery', 'magazine-spread', 'offset-poster-canvas', 'edge-to-edge-editorial'];
    } else if (roleLower.includes('distributed') || roleLower.includes('systems') || roleLower.includes('backend')) {
      topologyCandidates = ['vertical-identity-rail', 'command-console-interface', 'architectural-plate', 'asymmetric-split-canvas'];
    } else if (roleLower.includes('frontend') || roleLower.includes('ui') || roleLower.includes('designer')) {
      topologyCandidates = ['asymmetric-split-canvas', 'magazine-spread', 'offset-poster-canvas', 'narrow-reading-column'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo')) {
      topologyCandidates = ['edge-to-edge-editorial', 'newspaper-column-grid', 'narrow-reading-column', 'data-observatory'];
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

    const requestedTopology = layoutAliasMap[options.pageTopology] || options.pageTopology;
    const pageTopologyId = requestedTopology && PAGE_TOPOLOGIES[requestedTopology] ? requestedTopology : (finalTopologyPool[Math.floor(Math.random() * finalTopologyPool.length)] || 'edge-to-edge-editorial');
    const pageTopology = PAGE_TOPOLOGIES[pageTopologyId] || PAGE_TOPOLOGIES['edge-to-edge-editorial'];

    // 2. Determine Navigation Grammar compatible with Page Topology
    let navGrammarId = 'top-editorial-masthead';
    if (pageTopologyId === 'vertical-identity-rail' || pageTopologyId === 'asymmetric-split-canvas') {
      navGrammarId = 'vertical-identity-rail';
    } else if (pageTopologyId === 'command-console-interface') {
      navGrammarId = 'command-prompt-nav';
    } else if (pageTopologyId === 'image-led-gallery') {
      navGrammarId = 'gallery-selector';
    } else if (pageTopologyId === 'archive-index-matrix' || pageTopologyId === 'data-observatory' || pageTopologyId === 'magazine-spread') {
      navGrammarId = 'numbered-archive-index';
    } else if (pageTopologyId === 'floating-spatial-composition' || pageTopologyId === 'full-viewport-stage' || pageTopologyId === 'offset-poster-canvas') {
      navGrammarId = 'floating-coordinate-nav';
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
    else openingTopology = 'editorial-thesis';

    // 4. Multi-Artifact Within-Portfolio Project Plan (Phase 34G requirement)
    const requestedStrategy = options.projectStrategy || options.strategyId;
    const projectArtifactPlan = [];
    const availableStrategies = [
      'case-study-narrative',
      'technical-dossier',
      'research-paper',
      'terminal-session',
      'architecture-map',
      'visual-exhibition',
      'failure-recovery',
      'build-journal',
      'metrics-observatory',
      'repository-archaeology',
      'before-after',
      'artifact-archive',
      'minimal-index'
    ];

    projects.forEach((proj, idx) => {
      let role = 'supporting';
      let strategy = requestedStrategy || 'technical-dossier';

      if (idx === 0) {
        role = 'primary-deep-dive';
        if (requestedStrategy) {
          strategy = requestedStrategy;
        } else if (roleLower.includes('research') || roleLower.includes('ml') || roleLower.includes('academic')) {
          strategy = 'research-paper';
        } else if (roleLower.includes('security') || roleLower.includes('distributed')) {
          strategy = 'technical-dossier';
        } else if (roleLower.includes('3d') || roleLower.includes('photographer')) {
          strategy = 'visual-exhibition';
        } else if (roleLower.includes('founder')) {
          strategy = 'case-study-narrative';
        } else {
          strategy = 'case-study-narrative';
        }
      } else if (idx === 1) {
        role = 'secondary-evidence';
        if (roleLower.includes('security') || roleLower.includes('distributed')) strategy = 'failure-recovery';
        else if (roleLower.includes('ml') || roleLower.includes('data')) strategy = 'metrics-observatory';
        else if (roleLower.includes('frontend') || roleLower.includes('design')) strategy = 'before-after';
        else strategy = 'repository-archaeology';
      } else if (idx === 2) {
        role = 'technical-telemetry';
        strategy = 'build-journal';
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

    return {
      world: options.universeId || 'swiss-editorial',
      pageTopology: {
        id: pageTopology.id,
        name: pageTopology.name,
        containerType: pageTopology.containerType,
        rootCss: pageTopology.rootCss,
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
        sequence: options.sectionSequence || ['hero', 'projects', 'capabilities', 'timeline', 'contact'],
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
      }
    };
  }
}

module.exports = { CompositionPlan, PAGE_TOPOLOGIES, NAVIGATION_GRAMMARS };

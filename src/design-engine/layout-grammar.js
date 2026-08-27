/**
 * Spatial Layout Grammar (Phase 36)
 * Consolidated with authoritative CompositionPlan.PAGE_TOPOLOGIES.
 * Eliminates duplicate/divergent layout registries.
 */

const { PAGE_TOPOLOGIES } = require('./composition-plan');

const LAYOUT_GRAMMARS = {
  'split-screen-dossier': {
    id: 'split-screen-dossier',
    name: 'Asymmetric Split Canvas (Fixed Identity Column)',
    containerType: 'split-50-50',
    bodyClass: 'layout-asymmetric-split'
  },
  'work-first-runway': {
    id: 'work-first-runway',
    name: 'Edge-to-Edge Editorial Runway',
    containerType: 'full-bleed-stage',
    bodyClass: 'layout-edge-to-edge-editorial'
  },
  'horizontal-exhibition': {
    id: 'horizontal-exhibition',
    name: 'Image-Led Gallery Exhibition Track',
    containerType: 'horizontal-scroll-track',
    bodyClass: 'layout-image-gallery'
  },
  'editorial-monograph': {
    id: 'editorial-monograph',
    name: 'Narrow Reading Monograph',
    containerType: 'asymmetric-essay',
    bodyClass: 'layout-narrow-reading-column'
  },
  'computational-terminal': {
    id: 'computational-terminal',
    name: 'Command Console Interface & System Matrix',
    containerType: 'dense-terminal-grid',
    bodyClass: 'layout-command-console'
  },
  'spatial-3d-stage': {
    id: 'spatial-3d-stage',
    name: 'Floating Spatial 3D Stage',
    containerType: 'spatial-viewport-stage',
    bodyClass: 'layout-floating-spatial'
  },
  'narrative-timeline': {
    id: 'narrative-timeline',
    name: 'Timeline Spine Milestone Stream',
    containerType: 'narrative-stream',
    bodyClass: 'layout-timeline'
  },
  'minimal-single-screen': {
    id: 'minimal-single-screen',
    name: 'Full Viewport Stage Takeover',
    containerType: 'focused-single-viewport',
    bodyClass: 'layout-full-viewport-stage'
  },
  'asymmetric-bento-canvas': {
    id: 'asymmetric-bento-canvas',
    name: 'Offset Poster Bento Canvas',
    containerType: 'asymmetric-bento',
    bodyClass: 'layout-offset-poster'
  },
  'magazine-spread-columns': {
    id: 'magazine-spread-columns',
    name: '3-Column Asymmetric Magazine Spread',
    containerType: 'magazine-3col',
    bodyClass: 'layout-magazine'
  }
};

// Populate any additional topologies from PAGE_TOPOLOGIES
for (const [id, top] of Object.entries(PAGE_TOPOLOGIES)) {
  if (!LAYOUT_GRAMMARS[id]) {
    LAYOUT_GRAMMARS[id] = {
      id,
      name: top.name,
      containerType: top.containerType,
      bodyClass: top.rootClass
    };
  }
}

class LayoutGrammar {
  static getGrammar(id) {
    return LAYOUT_GRAMMARS[id] || LAYOUT_GRAMMARS['split-screen-dossier'];
  }

  static getAllGrammarIds() {
    return Object.keys(LAYOUT_GRAMMARS);
  }
}

module.exports = { LayoutGrammar, LAYOUT_GRAMMARS };

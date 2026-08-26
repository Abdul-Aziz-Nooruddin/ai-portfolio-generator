/**
 * Spatial Layout Grammar
 * Controls page geometry, column splits, viewport behavior, container widths, and whitespace physics.
 */

const LAYOUT_GRAMMARS = {
  'split-screen-dossier': {
    id: 'split-screen-dossier',
    name: 'Fixed Identity Sidebar & Independent Content Reel',
    containerType: 'split-50-50',
    bodyClass: 'layout-split-dossier',
    cssGrid: `
      .layout-root {
        display: grid;
        grid-template-columns: minmax(320px, 38%) 1fr;
        min-height: 100vh;
      }
      .dossier-identity-panel {
        position: sticky;
        top: 0;
        height: 100vh;
        padding: clamp(2rem, 4vw, 4rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 1px solid var(--border);
        background: var(--bg);
        overflow-y: auto;
      }
      .dossier-scroll-content {
        padding: clamp(2rem, 5vw, 5rem);
        max-width: 900px;
      }
      @media (max-width: 900px) {
        .layout-root { grid-template-columns: 1fr; }
        .dossier-identity-panel { position: static; height: auto; border-right: none; border-bottom: 1px solid var(--border); }
        .dossier-scroll-content { padding: 2rem 1.25rem; }
      }
    `
  },
  'work-first-runway': {
    id: 'work-first-runway',
    name: 'Top Ticker Header with Direct Full-Bleed Work Runway',
    containerType: 'full-bleed-stage',
    bodyClass: 'layout-work-runway',
    cssGrid: `
      .layout-root {
        width: 100%;
        max-width: 100vw;
        margin: 0;
        padding: 0 clamp(1.25rem, 5vw, 5rem);
        box-sizing: border-box;
      }
      .runway-lead-bar {
        padding: 2.5rem 0;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 1rem;
      }
    `
  },
  'horizontal-exhibition': {
    id: 'horizontal-exhibition',
    name: 'Horizontal Gallery Exhibition Track',
    containerType: 'horizontal-scroll-track',
    bodyClass: 'layout-horizontal-exhibition',
    cssGrid: `
      .layout-root {
        width: 100%;
        max-width: 100vw;
        overflow-x: hidden;
        padding: clamp(2rem, 4vw, 4rem) clamp(1rem, 3vw, 3rem);
        box-sizing: border-box;
      }
    `
  },
  'editorial-monograph': {
    id: 'editorial-monograph',
    name: 'Asymmetric Offset Monograph Essay',
    containerType: 'asymmetric-essay',
    bodyClass: 'layout-editorial-monograph',
    cssGrid: `
      .layout-root {
        max-width: 880px;
        margin-left: clamp(1rem, 6vw, 10rem);
        margin-right: auto;
        padding: clamp(2rem, 5vw, 6rem) 1.5rem;
      }
      .monograph-section {
        margin-bottom: clamp(4rem, 8vw, 7rem);
      }
    `
  },
  'computational-terminal': {
    id: 'computational-terminal',
    name: 'Structured Computational Console & System Matrix',
    containerType: 'dense-terminal-grid',
    bodyClass: 'layout-computational-terminal',
    cssGrid: `
      .layout-root {
        max-width: 1180px;
        margin: 2rem auto;
        padding: 0 1.5rem 4rem;
      }
    `
  },
  'spatial-3d-stage': {
    id: 'spatial-3d-stage',
    name: 'Immersive Fullscreen Spatial 3D Stage',
    containerType: 'spatial-viewport-stage',
    bodyClass: 'layout-spatial-stage',
    cssGrid: `
      .layout-root {
        width: 100%;
        min-height: 100vh;
        margin: 0;
        padding: clamp(2rem, 4vw, 5rem) clamp(1.5rem, 4vw, 4rem);
        position: relative;
        z-index: 2;
        box-sizing: border-box;
      }
    `
  },
  'narrative-timeline': {
    id: 'narrative-timeline',
    name: 'Interwoven Chronological Storytelling Stream',
    containerType: 'narrative-stream',
    bodyClass: 'layout-narrative-timeline',
    cssGrid: `
      .layout-root {
        max-width: 960px;
        margin: 0 auto;
        padding: clamp(2.5rem, 5vw, 5rem) 1.5rem;
      }
    `
  },
  'minimal-single-screen': {
    id: 'minimal-single-screen',
    name: 'Focused Single-Screen Index with Drawer Takeover',
    containerType: 'focused-single-viewport',
    bodyClass: 'layout-single-screen',
    cssGrid: `
      .layout-root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
        box-sizing: border-box;
      }
    `
  },
  'asymmetric-bento-canvas': {
    id: 'asymmetric-bento-canvas',
    name: 'Asymmetric Multi-Scale Bento Canvas',
    containerType: 'asymmetric-bento',
    bodyClass: 'layout-bento-canvas',
    cssGrid: `
      .layout-root {
        max-width: 1440px;
        margin-left: auto;
        margin-right: 0;
        padding: clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
        box-sizing: border-box;
      }
    `
  },
  'magazine-spread-columns': {
    id: 'magazine-spread-columns',
    name: '3-Column Asymmetric Magazine Spread',
    containerType: 'magazine-3col',
    bodyClass: 'layout-magazine-spread',
    cssGrid: `
      .layout-root {
        max-width: 1380px;
        margin: 0 auto;
        padding: clamp(2rem, 4vw, 4.5rem) 1.5rem;
      }
    `
  }
};

class LayoutGrammar {
  static getGrammar(id) {
    return LAYOUT_GRAMMARS[id] || LAYOUT_GRAMMARS['work-first-runway'];
  }

  static getAllGrammarIds() {
    return Object.keys(LAYOUT_GRAMMARS);
  }
}

module.exports = { LayoutGrammar, LAYOUT_GRAMMARS };

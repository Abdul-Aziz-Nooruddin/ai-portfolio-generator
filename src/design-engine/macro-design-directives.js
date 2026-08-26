/**
 * Macro Design Directives (Phase 27)
 * High-level art direction philosophies that govern entire page silhouettes,
 * opening viewport geometries, navigation topologies, compositional gravity,
 * density profiles, and content dominance BEFORE individual components are rendered.
 */

const MACRO_DIRECTIVES = {
  'editorial-monograph': {
    id: 'editorial-monograph',
    name: 'Editorial Monograph',
    philosophy: 'Single-volume curated print publication with quiet luxury and high typographical discipline.',
    pageSilhouette: 'single-column-asymmetric-rail',
    contentWidthStrategy: 'narrow-reading-column', // 780px reading measure
    navigationTopology: 'chapter-navigation-bottom',
    heroTopology: 'monumental-typography-cover',
    heroAlignment: 'left-heavy',
    compositionGravity: 'LEFT',
    densityProfile: 'AIRY',
    contentDominance: 'TEXT',
    projectModel: 'magazine-editorial-chapter',
    sectionOrder: ['monograph_cover', 'thesis_statement', 'project_chapters', 'biography_dossier', 'colophon'],
    motionPhilosophy: 'subtle-fade-in-and-page-turn'
  },

  'technical-operating-system': {
    id: 'technical-operating-system',
    name: 'Technical Operating System',
    philosophy: 'Dense, kernel-level utility dashboard prioritizing high information density and monospace telemetry.',
    pageSilhouette: 'split-pane-telemetry-grid',
    contentWidthStrategy: 'full-bleed-workspace',
    navigationTopology: 'status-bar-header',
    heroTopology: 'cli-boot-sequence', // No traditional hero - boots directly into system status
    heroAlignment: 'edge-to-edge',
    compositionGravity: 'DATA_DOMINANT',
    densityProfile: 'COMPACT',
    contentDominance: 'DATA',
    projectModel: 'terminal-session-log',
    sectionOrder: ['system_boot', 'kernel_telemetry', 'executed_projects', 'verified_stack', 'sys_status'],
    motionPhilosophy: 'instantaneous-crt-scan'
  },

  'art-director-portfolio': {
    id: 'art-director-portfolio',
    name: 'Art Director Portfolio',
    philosophy: 'Expansive creative direction with full-viewport typography and cinematic visual prominence.',
    pageSilhouette: 'staggered-canvas-mosaic',
    contentWidthStrategy: 'wide-cinematic-container', // 1440px
    navigationTopology: 'floating-pill-dock',
    heroTopology: 'full-viewport-monogram',
    heroAlignment: 'centered-monumental',
    compositionGravity: 'FULL_BLEED',
    densityProfile: 'POSTER',
    contentDominance: 'PROJECTS',
    projectModel: 'fullscreen-interactive-slide',
    sectionOrder: ['monogram_hero', 'curated_works', 'creative_manifesto', 'awards_archive', 'direct_inquiry'],
    motionPhilosophy: 'fluid-kinetic-inertia'
  },

  'brutalist-poster': {
    id: 'brutalist-poster',
    name: 'Brutalist Poster',
    philosophy: 'Uncompromising raw geometric typography, high-contrast grids, and anti-template asymmetry.',
    pageSilhouette: 'asymmetric-heavy-border-blocks',
    contentWidthStrategy: 'edge-to-edge-bordered',
    navigationTopology: 'corner-badge-navigation',
    heroTopology: 'typographic-poster-lead',
    heroAlignment: 'staggered-diagonal',
    compositionGravity: 'DIAGONAL',
    densityProfile: 'POSTER',
    contentDominance: 'IDENTITY',
    projectModel: 'asymmetric-media-mosaic',
    sectionOrder: ['poster_header', 'raw_projects', 'unfiltered_stack', 'manifesto_text', 'terminal_footer'],
    motionPhilosophy: 'staccato-step-transitions'
  },

  'product-case-study': {
    id: 'product-case-study',
    name: 'Product Case Study Narrative',
    philosophy: 'Deep architectural breakdowns tracing problem, technical execution, and measured impact.',
    pageSilhouette: 'two-column-narrative-flow',
    contentWidthStrategy: 'balanced-case-container', // 1080px
    navigationTopology: 'sticky-chapter-sidebar',
    heroTopology: 'split-screen-dossier',
    heroAlignment: 'split-50-50',
    compositionGravity: 'RIGHT',
    densityProfile: 'BALANCED',
    contentDominance: 'EXPERIENCE',
    projectModel: 'code-architecture-dossier',
    sectionOrder: ['case_opener', 'deep_dive_projects', 'impact_metrics', 'engineering_leadership', 'connect_portal'],
    motionPhilosophy: 'smooth-anchor-scroll'
  },

  'archive-catalog': {
    id: 'archive-catalog',
    name: 'Archive & Catalog Inventory',
    philosophy: 'Indexical inventory with immediate tabular display, strict numbering, and zero fluff.',
    pageSilhouette: 'tabular-inventory-sheet',
    contentWidthStrategy: 'wide-catalog-table', // 1200px
    navigationTopology: 'minimal-index-bar',
    heroTopology: 'no-hero-direct-inventory', // Starts immediately with inventory index
    heroAlignment: 'top-pinned',
    compositionGravity: 'GRID',
    densityProfile: 'ARCHIVAL',
    contentDominance: 'PROJECTS',
    projectModel: 'compact-metrics-table',
    sectionOrder: ['catalog_index', 'project_archive', 'skills_inventory', 'credentials_log', 'colophon'],
    motionPhilosophy: 'instant-filter-sort'
  },

  'magazine-spread': {
    id: 'magazine-spread',
    name: 'Magazine Editorial Spread',
    philosophy: 'Multi-column print magazine layout with bold headers, pull quotes, and visual columns.',
    pageSilhouette: 'three-column-editorial-grid',
    contentWidthStrategy: 'spread-1280px',
    navigationTopology: 'masthead-top-bar',
    heroTopology: 'magazine-special-edition-lead',
    heroAlignment: 'multi-column-spread',
    compositionGravity: 'CENTER',
    densityProfile: 'EDITORIAL',
    contentDominance: 'TEXT',
    projectModel: 'split-screen-comparison',
    sectionOrder: ['magazine_header', 'three_column_portfolio', 'editorial_skills', 'career_chronicle', 'credits'],
    motionPhilosophy: 'editorial-scroll-reveal'
  },

  'spatial-canvas': {
    id: 'spatial-canvas',
    name: 'Spatial 3D Canvas',
    philosophy: 'Interactive volumetric scene with orbiting objects and immersive glassmorphic coordinates.',
    pageSilhouette: 'orbital-canvas-stage',
    contentWidthStrategy: 'full-viewport-stage',
    navigationTopology: 'spatial-orbit-dock',
    heroTopology: 'spatial-3d-stage-hero',
    heroAlignment: 'radial-center',
    compositionGravity: 'CENTER',
    densityProfile: 'AIRY',
    contentDominance: 'IMAGE',
    projectModel: 'spatial-orbit-dock',
    sectionOrder: ['stage_intro', 'orbiting_projects', 'stack_constellation', 'interactive_lab', 'contact_dock'],
    motionPhilosophy: 'threejs-orbit-inertia'
  },

  'minimalist-resume': {
    id: 'minimalist-resume',
    name: 'Minimalist Document Dossier',
    philosophy: 'Pure typographical clarity inspired by Dieter Rams and high-end industrial design sheets.',
    pageSilhouette: 'two-column-sidebar-dossier',
    contentWidthStrategy: 'dossier-compact-960px',
    navigationTopology: 'sidebar-identity-rail',
    heroTopology: 'resume-document-opening',
    heroAlignment: 'left-rail-pinned',
    compositionGravity: 'VERTICAL',
    densityProfile: 'DENSE',
    contentDominance: 'IDENTITY',
    projectModel: 'code-architecture-dossier',
    sectionOrder: ['split_identity', 'featured_artifacts', 'verified_stack', 'career_record', 'direct_reach'],
    motionPhilosophy: 'subtle-opacity-fade'
  },

  'data-journal': {
    id: 'data-journal',
    name: 'Data & Research Journal',
    philosophy: 'Scholarly precision for research fellows, formal methods, and algorithmic contributions.',
    pageSilhouette: 'scholarly-paper-column',
    contentWidthStrategy: 'academic-measure-840px',
    navigationTopology: 'floating-index',
    heroTopology: 'research-abstract-lead',
    heroAlignment: 'left-formal',
    compositionGravity: 'TEXT_DOMINANT',
    densityProfile: 'DENSE',
    contentDominance: 'RESEARCH',
    projectModel: 'magazine-editorial-chapter',
    sectionOrder: ['abstract_hero', 'peer_reviewed_projects', 'formal_verifications', 'publications_archive', 'citations'],
    motionPhilosophy: 'academic-clean-static'
  },

  'storytelling-scroll': {
    id: 'storytelling-scroll',
    name: 'Storytelling Narrative Journey',
    philosophy: 'Chronological timeline tracing progressive breakthroughs, technical evolution, and milestones.',
    pageSilhouette: 'central-spine-timeline',
    contentWidthStrategy: 'spine-timeline-900px',
    navigationTopology: 'timeline-milestone-marker',
    heroTopology: 'prologue-hero-opening',
    heroAlignment: 'centered-flow',
    compositionGravity: 'VERTICAL',
    densityProfile: 'BALANCED',
    contentDominance: 'EXPERIENCE',
    projectModel: 'timeline-milestone-card',
    sectionOrder: ['prologue_hero', 'chronological_milestones', 'mastered_tools', 'future_horizons', 'closing_epilogue'],
    motionPhilosophy: 'timeline-scroll-draw'
  },

  'immersive-exhibition': {
    id: 'immersive-exhibition',
    name: 'Immersive Digital Exhibition',
    philosophy: 'Horizontal gallery track presenting projects like curated museum pavilions.',
    pageSilhouette: 'horizontal-filmstrip-track',
    contentWidthStrategy: 'horizontal-overflow-track',
    navigationTopology: 'gallery-room-selector',
    heroTopology: 'exhibition-title-monument',
    heroAlignment: 'horizontal-pinned',
    compositionGravity: 'EDGE',
    densityProfile: 'AIRY',
    contentDominance: 'PROJECTS',
    projectModel: 'horizontal-filmstrip',
    sectionOrder: ['exhibition_title', 'curated_track', 'skills_archive', 'gallery_dossier', 'patron_contact'],
    motionPhilosophy: 'horizontal-scroll-snap'
  },

  'terminal-system-log': {
    id: 'terminal-system-log',
    name: 'Terminal System Log',
    philosophy: 'Authentic phosphor CLI workstation for low-level systems engineers and kernel architects.',
    pageSilhouette: 'window-frame-terminal',
    contentWidthStrategy: 'terminal-window-1020px',
    navigationTopology: 'command-prompt-bar',
    heroTopology: 'cli-window-terminal',
    heroAlignment: 'left-monospace',
    compositionGravity: 'DATA_DOMINANT',
    densityProfile: 'COMPACT',
    contentDominance: 'DATA',
    projectModel: 'terminal-session-log',
    sectionOrder: ['cli_prompt_hero', 'system_capabilities', 'executed_projects', 'stack_diagnostics', 'exit_session'],
    motionPhilosophy: 'typewriter-cursor-blink'
  },

  'swiss-information-system': {
    id: 'swiss-information-system',
    name: 'Swiss International Information System',
    philosophy: 'Mathematically strict grid hierarchy, objective asymmetric alignment, and universal Helvetica clarity.',
    pageSilhouette: 'strict-12-column-swiss-grid',
    contentWidthStrategy: 'strict-grid-1200px',
    navigationTopology: 'floating-index-badge',
    heroTopology: 'monumental-statement-masthead',
    heroAlignment: 'asymmetric-grid-anchored',
    compositionGravity: 'GRID',
    densityProfile: 'BALANCED',
    contentDominance: 'TEXT',
    projectModel: 'typographic-index-reveal',
    sectionOrder: ['statement_masthead', 'interactive_index', 'status_footer', 'system_spec', 'contact_block'],
    motionPhilosophy: 'strict-geometric-snap'
  },

  'asymmetric-art-board': {
    id: 'asymmetric-art-board',
    name: 'Asymmetric Bento Art Board',
    philosophy: 'Dynamic modular mosaic with intentional scale contrast between primary and secondary tiles.',
    pageSilhouette: 'bento-box-asymmetric-canvas',
    contentWidthStrategy: 'bento-canvas-1320px',
    navigationTopology: 'corner-floating-controls',
    heroTopology: 'bento-grid-canopy',
    heroAlignment: 'asymmetric-mosaic',
    compositionGravity: 'FULL_BLEED',
    densityProfile: 'BALANCED',
    contentDominance: 'PROJECTS',
    projectModel: 'asymmetric-media-mosaic',
    sectionOrder: ['bento_masthead', 'featured_mosaic', 'skill_matrices', 'journey_board', 'reach_tile'],
    motionPhilosophy: 'staggered-tile-lift'
  }
};

class MacroDirectiveManager {
  static recentDirectives = [];

  /**
   * Selects a coherent Macro Directive aligned with the user profile while preventing repetitive collisions
   */
  static selectDirective(contentProfile = {}, roleCategory = 'SOFTWARE_ENGINEER') {
    const roleLower = (contentProfile.role || '').toLowerCase();
    let preferredDirectives = [];

    if (roleLower.includes('research') || roleLower.includes('phd') || roleLower.includes('academic') || roleLower.includes('scientist')) {
      preferredDirectives = ['data-journal', 'editorial-monograph', 'swiss-information-system'];
    } else if (roleLower.includes('security') || roleLower.includes('kernel') || roleLower.includes('systems') || roleLower.includes('distributed')) {
      preferredDirectives = ['technical-operating-system', 'terminal-system-log', 'product-case-study'];
    } else if (roleLower.includes('photographer') || roleLower.includes('artist') || roleLower.includes('spatial') || roleLower.includes('3d')) {
      preferredDirectives = ['immersive-exhibition', 'spatial-canvas', 'art-director-portfolio', 'editorial-monograph'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo') || roleLower.includes('product') || roleLower.includes('lead')) {
      preferredDirectives = ['product-case-study', 'editorial-monograph', 'asymmetric-art-board', 'swiss-information-system'];
    } else if (roleLower.includes('frontend') || roleLower.includes('ui') || roleLower.includes('designer')) {
      preferredDirectives = ['asymmetric-art-board', 'art-director-portfolio', 'brutalist-poster', 'swiss-information-system'];
    } else {
      preferredDirectives = Object.keys(MACRO_DIRECTIVES);
    }

    // Filter out the most recently used directive to guarantee diversity across successive generations
    const available = preferredDirectives.filter(id => !this.recentDirectives.includes(id));
    const chosenId = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : preferredDirectives[Math.floor(Math.random() * preferredDirectives.length)];

    this.recentDirectives.push(chosenId);
    if (this.recentDirectives.length > 5) {
      this.recentDirectives.shift();
    }

    return MACRO_DIRECTIVES[chosenId] || MACRO_DIRECTIVES['editorial-monograph'];
  }

  static getDirective(id) {
    return MACRO_DIRECTIVES[id] || MACRO_DIRECTIVES['editorial-monograph'];
  }

  static getAllDirectives() {
    return { ...MACRO_DIRECTIVES };
  }
}

module.exports = { MACRO_DIRECTIVES, MacroDirectiveManager };

/**
 * Page Composition Engine
 * 
 * Determines the fundamental spatial topology, layout architecture, DOM hierarchy,
 * and section ordering BEFORE applying visual styling or design tokens.
 * 
 * Defines 20+ Fundamentally Distinct Page Composition Archetypes.
 */

const PAGE_ARCHETYPES = [
  {
    id: 'editorial-essay',
    name: 'Editorial Essay & Long-form Narrative',
    heroArchitecture: 'statement-only-minimal',
    headerArchitecture: 'minimal-text-masthead',
    sectionOrder: ['intro-statement', 'essay-narrative', 'embedded-projects', 'technical-philosophy', 'colophon'],
    gridTopology: 'single-column-editorial-reading-line',
    alignmentSystem: 'left-anchored-wide-margins',
    contentDensity: 'spacious-literary',
    sectionRhythm: 'chapter-flow',
    viewportUsage: 'fluid-prose-scroll',
    suitableRoles: ['Research Scientist', 'Software Architect', 'Staff Engineer', 'Creative Director']
  },
  {
    id: 'project-first-runway',
    name: 'Project-First Runway (No Giant Bio)',
    heroArchitecture: 'project-first-hero',
    headerArchitecture: 'compact-identity-bar',
    sectionOrder: ['featured-hero-project', 'selected-work-stream', 'tech-stack-strip', 'about-concise', 'contact-compact'],
    gridTopology: 'full-width-stage-runway',
    alignmentSystem: 'center-stage-focal',
    contentDensity: 'high-impact-visual',
    sectionRhythm: 'project-cadence',
    viewportUsage: 'immediate-work-viewport',
    suitableRoles: ['Full-Stack Developer', 'Frontend Engineer', 'Product Designer', 'Mobile Developer']
  },
  {
    id: 'split-screen-fixed',
    name: 'Split-Screen (Fixed Identity + Scrolling Runway)',
    heroArchitecture: 'split-hero',
    headerArchitecture: 'sidebar-fixed-dock',
    sectionOrder: ['fixed-identity-panel', 'scrolling-project-runway', 'skills-inline', 'contact-modal-trigger'],
    gridTopology: 'dual-pane-fixed-split',
    alignmentSystem: 'bifurcated-split',
    contentDensity: 'dense-multi-column',
    sectionRhythm: 'synchronized-scroll',
    viewportUsage: '100vh-dual-pane',
    suitableRoles: ['UI/UX Designer', 'Frontend Architect', 'Creative Developer']
  },
  {
    id: 'asymmetric-canvas',
    name: 'Asymmetric Multi-Axis Canvas',
    heroArchitecture: 'asymmetric-duo-column',
    headerArchitecture: 'corner-anchors-quadrant',
    sectionOrder: ['asymmetric-identity-header', 'staggered-project-nodes', 'scattered-skill-clouds', 'offset-contact-island'],
    gridTopology: 'asymmetric-12-col-staggered',
    alignmentSystem: 'multi-axis-tension',
    contentDensity: 'dynamic-unbalanced',
    sectionRhythm: 'staggered-jump',
    viewportUsage: 'broad-canvas-spread',
    suitableRoles: ['Creative Technologist', 'Art Director', 'WebGL Developer', 'Graphic Designer']
  },
  {
    id: 'project-index-drawer',
    name: 'Typographic Interactive Index & Live Drawer',
    heroArchitecture: 'minimal-index-hero',
    headerArchitecture: 'top-hairline-nav',
    sectionOrder: ['index-masthead', 'interactive-project-table', 'project-drawer-stage', 'brief-curriculum', 'contact-row'],
    gridTopology: 'tabular-master-detail',
    alignmentSystem: 'rigid-left-tabular',
    contentDensity: 'compact-information-rich',
    sectionRhythm: 'hover-interactive-reveal',
    viewportUsage: 'viewport-bound-index',
    suitableRoles: ['Backend Engineer', 'Systems Architect', 'Security Engineer', 'Data Engineer']
  },
  {
    id: 'timeline-chronology',
    name: 'Vertical Engineering Chronology',
    heroArchitecture: 'timeline-hero',
    headerArchitecture: 'minimal-sticky-year-tracker',
    sectionOrder: ['chronology-opener', 'timeline-milestone-projects', 'historical-experience', 'evolutionary-skills', 'contact-terminal'],
    gridTopology: 'central-spine-timeline',
    alignmentSystem: 'alternating-spine-anchored',
    contentDensity: 'structured-chronological',
    sectionRhythm: 'linear-vertical-descent',
    viewportUsage: 'long-scroll-story',
    suitableRoles: ['Staff Engineer', 'Engineering Manager', 'Senior Developer', 'DevOps Lead']
  },
  {
    id: 'fullscreen-viewport-sections',
    name: '100vh Fullscreen Viewport Snap Runway',
    heroArchitecture: 'fullscreen-slide-hero',
    headerArchitecture: 'floating-pill-dock',
    sectionOrder: ['slide-hero', 'slide-project-01', 'slide-project-02', 'slide-project-03', 'slide-about-contact'],
    gridTopology: '100vh-snap-carousel',
    alignmentSystem: 'centered-monumental',
    contentDensity: 'monumental-single-focal',
    sectionRhythm: 'snap-paginated',
    viewportUsage: '100vh-strict-lock',
    suitableRoles: ['Product Designer', '3D Visualist', 'Spatial Developer', 'Luxury Brand Strategist']
  },
  {
    id: 'immersive-exhibition',
    name: 'Immersive Gallery Exhibition Runway',
    heroArchitecture: 'panoramic-cinematic-stage',
    headerArchitecture: 'transparent-overlay-nav',
    sectionOrder: ['exhibition-curator-statement', 'panoramic-gallery-spaces', 'artwork-provenance', 'artist-biography', 'private-inquiry'],
    gridTopology: 'horizontal-panoramic-track',
    alignmentSystem: 'museum-placard-alignment',
    contentDensity: 'spacious-gallery',
    sectionRhythm: 'panoramic-pacing',
    viewportUsage: 'horizontal-overflow-stage',
    suitableRoles: ['Creative Technologist', 'Photographer', 'Shader Artist', 'Motion Designer']
  },
  {
    id: 'typographic-monograph',
    name: 'Architectural Typographic Monograph',
    heroArchitecture: 'giant-typographic-statement',
    headerArchitecture: 'editorial-masthead',
    sectionOrder: ['monumental-headline-block', 'typographic-case-studies', 'monograph-manifesto', 'spec-index', 'colophon-contact'],
    gridTopology: 'swiss-6-col-typographic',
    alignmentSystem: 'justified-strict-grid',
    contentDensity: 'high-contrast-typographic',
    sectionRhythm: 'bold-monumental-shift',
    viewportUsage: 'architectural-page-spread',
    suitableRoles: ['Brand Designer', 'Frontend Engineer', 'Typography Specialist', 'Creative Lead']
  },
  {
    id: 'architectural-swiss-grid',
    name: 'Modular Swiss Architectural Grid',
    heroArchitecture: 'grid-hero',
    headerArchitecture: 'swiss-split-nav',
    sectionOrder: ['grid-identity-cell', 'modular-project-bento', 'structured-skill-matrix', 'experience-quadrant', 'contact-cell'],
    gridTopology: 'css-grid-named-areas-modular',
    alignmentSystem: 'strict-orthogonal-grid',
    contentDensity: 'structured-bento-dense',
    sectionRhythm: 'modular-compartment',
    viewportUsage: 'compartmentalized-canvas',
    suitableRoles: ['Product Architect', 'Full-Stack Developer', 'UI Engineer', 'Design Engineer']
  },
  {
    id: 'digital-magazine',
    name: 'Digital Magazine Editorial Spread',
    heroArchitecture: 'magazine-cover-split',
    headerArchitecture: 'magazine-issue-bar',
    sectionOrder: ['cover-feature-spread', 'feature-article-project', 'secondary-spreads-grid', 'editor-statement', 'back-cover-contact'],
    gridTopology: 'multi-spread-editorial-columns',
    alignmentSystem: 'asymmetric-magazine-axis',
    contentDensity: 'editorial-magazine-density',
    sectionRhythm: 'page-turn-rhythm',
    viewportUsage: 'editorial-spread-viewports',
    suitableRoles: ['Creative Director', 'Writer', 'UX Strategist', 'Haute Editorialist']
  },
  {
    id: 'dashboard-system',
    name: 'Technical Systems Dashboard & Telemetry',
    heroArchitecture: 'data-stat-hero',
    headerArchitecture: 'telemetry-status-header',
    sectionOrder: ['telemetry-status-bar', 'system-metrics-overview', 'deployed-repositories-grid', 'infrastructure-topology', 'audit-terminal'],
    gridTopology: 'dashboard-multi-widget-grid',
    alignmentSystem: 'dense-tabular-widgets',
    contentDensity: 'high-density-telemetry',
    sectionRhythm: 'monitoring-pulse',
    viewportUsage: 'dense-dashboard-canvas',
    suitableRoles: ['DevOps Engineer', 'Infrastructure Lead', 'Cloud Architect', 'Backend Developer']
  },
  {
    id: 'terminal-computational',
    name: 'Computational Terminal CLI Environment',
    heroArchitecture: 'terminal-cli-boot',
    headerArchitecture: 'cli-header-prompt',
    sectionOrder: ['boot-sequence-terminal', 'executable-projects-stream', 'environment-variables-skills', 'syslog-history', 'ssh-contact-session'],
    gridTopology: 'single-column-terminal-stream',
    alignmentSystem: 'left-monospace-aligned',
    contentDensity: 'monospace-raw-code',
    sectionRhythm: 'command-execution-flow',
    viewportUsage: 'interactive-terminal-viewport',
    suitableRoles: ['Security Researcher', 'Kernel Developer', 'Low-Level Engineer', 'Linux Specialist']
  },
  {
    id: 'curated-catalog',
    name: 'Archival Curated Catalog & Spec Sheets',
    heroArchitecture: 'minimal-hero',
    headerArchitecture: 'catalog-accession-header',
    sectionOrder: ['catalog-index-masthead', 'spec-sheet-project-items', 'technical-inventory', 'provenance-experience', 'acquisition-contact'],
    gridTopology: 'catalog-inventory-strip',
    alignmentSystem: 'catalog-spec-aligned',
    contentDensity: 'orderly-curated',
    sectionRhythm: 'numbered-inventory-cadence',
    viewportUsage: 'document-scroll-canvas',
    suitableRoles: ['Hardware Engineer', 'Industrial Designer', 'Systems Engineer', 'Systems Architect']
  },
  {
    id: 'poster-wall',
    name: 'Graphic Poster Wall Showcase',
    heroArchitecture: 'marquee-headline-ticker',
    headerArchitecture: 'minimal-corner-anchors',
    sectionOrder: ['marquee-header-banner', 'variable-scale-poster-grid', 'sticker-tag-skills', 'manifesto-card', 'contact-badge-footer'],
    gridTopology: 'masonry-variable-posters',
    alignmentSystem: 'staggered-poster-alignment',
    contentDensity: 'bold-graphic-density',
    sectionRhythm: 'poster-staccato',
    viewportUsage: 'wall-gallery-canvas',
    suitableRoles: ['Visual Designer', 'Illustrator', 'Frontend Creative', 'Brand Technologist']
  },
  {
    id: 'narrative-storytelling',
    name: 'Chapter-Based Narrative Storytelling',
    heroArchitecture: 'editorial-hero',
    headerArchitecture: 'chapter-progress-bar',
    sectionOrder: ['prologue-hero', 'chapter-1-origins', 'chapter-2-breakthrough-projects', 'chapter-3-current-systems', 'epilogue-contact'],
    gridTopology: 'narrative-spine-chapters',
    alignmentSystem: 'chapter-centered-reading',
    contentDensity: 'narrative-focused',
    sectionRhythm: 'story-arc-cadence',
    viewportUsage: 'cinematic-chapter-scroll',
    suitableRoles: ['Product Strategist', 'Founder', 'Engineering Leader', 'UX Researcher']
  },
  {
    id: 'minimal-monastic',
    name: 'Radical Minimal Monastic Index',
    heroArchitecture: 'statement-only-minimal',
    headerArchitecture: 'no-traditional-header',
    sectionOrder: ['whisper-identity', 'pure-project-links', 'curriculum-summary', 'direct-email-link'],
    gridTopology: 'monastic-single-column',
    alignmentSystem: 'austere-left-flush',
    contentDensity: 'extreme-whitespace-breathing',
    sectionRhythm: 'silent-contemplation',
    viewportUsage: 'monastic-negative-space',
    suitableRoles: ['Minimalist Designer', 'Writter', 'Mathematician', 'Independent Researcher']
  },
  {
    id: 'image-led-gallery',
    name: 'Image-Led Visual Dominance Gallery',
    heroArchitecture: 'fullscreen-image-hero',
    headerArchitecture: 'floating-capsule',
    sectionOrder: ['fullscreen-hero-visual', 'dominant-project-viewports', 'curated-works-reel', 'compact-credentials', 'contact-overlay'],
    gridTopology: 'full-bleed-media-grid',
    alignmentSystem: 'visual-focal-anchored',
    contentDensity: 'pure-media-density',
    sectionRhythm: 'cinematic-visual-pacing',
    viewportUsage: 'full-bleed-viewports',
    suitableRoles: ['3D Artist', 'Photographer', 'Motion Designer', 'Spatial Computing Engineer']
  },
  {
    id: 'data-led-metrics',
    name: 'Data-Led Engineering & Benchmark Matrix',
    heroArchitecture: 'data-stat-hero',
    headerArchitecture: 'top-hairline-nav',
    sectionOrder: ['metric-highlights-hero', 'benchmark-case-studies', 'architecture-diagram-feed', 'tech-competency-matrix', 'contact-endpoint'],
    gridTopology: 'metric-card-matrix-grid',
    alignmentSystem: 'tabular-metric-aligned',
    contentDensity: 'dense-quantitative',
    sectionRhythm: 'analytical-breakdown',
    viewportUsage: 'data-matrix-canvas',
    suitableRoles: ['Data Scientist', 'Performance Engineer', 'ML Engineer', 'Systems Researcher']
  },
  {
    id: 'experimental-spatial',
    name: 'Experimental Spatial Z-Plane Canvas',
    heroArchitecture: 'interactive-hero',
    headerArchitecture: 'bottom-navigation-dock',
    sectionOrder: ['spatial-interactive-hero', 'floating-zplane-projects', 'orbital-skills-cloud', 'dimensional-experience', 'portal-contact'],
    gridTopology: 'spatial-zplane-overlapping',
    alignmentSystem: 'dimensional-spatial-tension',
    contentDensity: 'interactive-layered',
    sectionRhythm: 'kinetic-spatial-shift',
    viewportUsage: '3d-canvas-stage',
    suitableRoles: ['WebGL Artist', 'Creative Technologist', 'Game Developer', 'Interactive Lead']
  }
];

class PageCompositionEngine {
  constructor() {
    this.archetypes = PAGE_ARCHETYPES;
  }

  /**
   * Select a Page Composition Archetype based on user content and anti-repetition rules
   */
  selectArchetype(userProfile = {}, creativeDirection = null, recentArchetypes = []) {
    const forbidden = new Set(recentArchetypes.slice(0, 3));
    let available = this.archetypes.filter(a => !forbidden.has(a.id));
    if (available.length === 0) available = this.archetypes;

    const role = (userProfile.role || userProfile.service_title || '').toLowerCase();
    const bio = (userProfile.bio || userProfile.tagline || '').toLowerCase();
    const allText = `${role} ${bio}`;

    // Score archetypes by role alignment
    const scored = available.map(arch => {
      let score = 50;

      // Role matching bonus
      const matchesRole = arch.suitableRoles.some(r => allText.includes(r.toLowerCase()));
      if (matchesRole) score += 40;

      // Creative direction alignment if specified
      if (creativeDirection && creativeDirection.mode) {
        const mode = creativeDirection.mode.toLowerCase();
        if (mode.includes('terminal') && arch.id.includes('terminal')) score += 50;
        if (mode.includes('editorial') && arch.id.includes('editorial')) score += 50;
        if (mode.includes('spatial') && arch.id.includes('spatial')) score += 50;
        if (mode.includes('minimal') && arch.id.includes('minimal')) score += 50;
        if (mode.includes('swiss') && arch.id.includes('swiss')) score += 50;
      }

      // Add small jitter
      score += Math.random() * 15;

      return { archetype: arch, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0].archetype;
  }

  /**
   * Extract comprehensive Page Structure Fingerprint
   */
  generateStructureFingerprint(archetype, dna = {}) {
    return {
      pageArchetype: archetype.id,
      name: archetype.name,
      heroArchitecture: archetype.heroArchitecture,
      headerArchitecture: archetype.headerArchitecture,
      sectionOrder: archetype.sectionOrder,
      gridTopology: archetype.gridTopology,
      alignmentSystem: archetype.alignmentSystem,
      contentDensity: archetype.contentDensity,
      sectionRhythm: archetype.sectionRhythm,
      viewportUsage: archetype.viewportUsage,
      projectPresentation: dna.projectPresentation || 'editorial-magazine',
      navigationArchitecture: archetype.headerArchitecture
    };
  }

  /**
   * Detect structural collision with recent portfolio generations
   */
  detectStructuralCollision(candidateFingerprint, recentFingerprints = []) {
    for (let i = 0; i < recentFingerprints.length; i++) {
      const past = recentFingerprints[i];
      const genNum = i + 1;

      // Hard Collision Rule 1: Same Page Archetype + Same Hero Architecture
      if (candidateFingerprint.pageArchetype === past.pageArchetype &&
          candidateFingerprint.heroArchitecture === past.heroArchitecture) {
        return {
          collision: true,
          type: 'PAGE_ARCHETYPE_COLLISION',
          reason: `Repeated Page Archetype ('${candidateFingerprint.pageArchetype}') with same Hero ('${candidateFingerprint.heroArchitecture}') from Gen ${genNum}`
        };
      }

      // Hard Collision Rule 2: Same Grid Topology + Same Section Order
      if (candidateFingerprint.gridTopology === past.gridTopology &&
          JSON.stringify(candidateFingerprint.sectionOrder) === JSON.stringify(past.sectionOrder)) {
        return {
          collision: true,
          type: 'GRID_SECTION_ORDER_COLLISION',
          reason: `Identical Grid Topology ('${candidateFingerprint.gridTopology}') and Section Order from Gen ${genNum}`
        };
      }
    }

    return { collision: false, reason: 'No structural collisions detected' };
  }
}

module.exports = { PageCompositionEngine, PAGE_ARCHETYPES };

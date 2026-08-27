/**
 * 🏛️ Art Direction Model (Phase 43)
 * Introduces high-level visual worldviews as constraint systems rather than rigid templates:
 * EDITORIAL_RESEARCH, TECHNICAL_OBSERVATORY, DIGITAL_WORKSHOP, OPEN_SOURCE_ARCHIVE,
 * PRODUCT_STUDIO, VISUAL_EXHIBITION, PERSONAL_MANIFESTO.
 * 
 * Invariant: An art direction is a coherent constraint system that can produce multiple distinct compositions.
 */

const ART_DIRECTIONS = {
  EDITORIAL_RESEARCH: {
    id: 'EDITORIAL_RESEARCH',
    name: 'Editorial & Academic Research',
    compatibleTopologies: ['narrow-reading-column', 'edge-to-edge-editorial', 'newspaper-column-grid'],
    compatibleNavigations: ['top-editorial-masthead', 'bottom-chapter-nav'],
    compatibleTypographies: ['serif-editorial', 'mixed-editorial', 'humanist'],
    compatibleSurfaces: ['paper', 'editorial-prose', 'flat'],
    readingMeasure: '680px',
    evidenceBias: 'PUBLICATIONS_AND_THESIS'
  },
  TECHNICAL_OBSERVATORY: {
    id: 'TECHNICAL_OBSERVATORY',
    name: 'Technical Systems Observatory',
    compatibleTopologies: ['asymmetric-split-canvas', 'command-console-interface', 'vertical-identity-rail', 'architectural-plate'],
    compatibleNavigations: ['vertical-identity-rail', 'command-prompt-nav'],
    compatibleTypographies: ['mono-technical', 'grotesk'],
    compatibleSurfaces: ['terminal', 'blueprint-table', 'panel'],
    readingMeasure: '780px',
    evidenceBias: 'ARCHITECTURE_AND_TELEMETRY'
  },
  DIGITAL_WORKSHOP: {
    id: 'DIGITAL_WORKSHOP',
    name: 'Digital Workshop & Craft',
    compatibleTopologies: ['edge-to-edge-editorial', 'offset-poster-canvas', 'magazine-spread'],
    compatibleNavigations: ['top-editorial-masthead', 'floating-coordinate-nav'],
    compatibleTypographies: ['grotesk', 'utilitarian'],
    compatibleSurfaces: ['panel', 'framed', 'flat'],
    readingMeasure: '740px',
    evidenceBias: 'PROJECTS_AND_TOOLCHAIN'
  },
  OPEN_SOURCE_ARCHIVE: {
    id: 'OPEN_SOURCE_ARCHIVE',
    name: 'Open Source Archive & Ledger',
    compatibleTopologies: ['vertical-identity-rail', 'archive-index-matrix', 'timeline-field'],
    compatibleNavigations: ['vertical-identity-rail', 'numbered-archive-nav'],
    compatibleTypographies: ['mono-technical', 'grotesk'],
    compatibleSurfaces: ['terminal', 'museum-ledger', 'panel'],
    readingMeasure: '720px',
    evidenceBias: 'REPOSITORIES_AND_COMMITS'
  },
  PRODUCT_STUDIO: {
    id: 'PRODUCT_STUDIO',
    name: 'Product & Interactive Studio',
    compatibleTopologies: ['edge-to-edge-editorial', 'asymmetric-split-canvas', 'magazine-spread'],
    compatibleNavigations: ['top-editorial-masthead', 'floating-coordinate-nav'],
    compatibleTypographies: ['grotesk', 'display-heavy'],
    compatibleSurfaces: ['panel', 'flat', 'translucent'],
    readingMeasure: '760px',
    evidenceBias: 'LIVE_PRODUCTS_AND_METRICS'
  },
  VISUAL_EXHIBITION: {
    id: 'VISUAL_EXHIBITION',
    name: 'Visual Exhibition & Media',
    compatibleTopologies: ['full-viewport-stage', 'image-led-gallery', 'floating-spatial-composition'],
    compatibleNavigations: ['gallery-selector', 'floating-coordinate-nav'],
    compatibleTypographies: ['humanist', 'display-heavy', 'grotesk'],
    compatibleSurfaces: ['image-led', 'translucent', 'flat'],
    readingMeasure: '840px',
    evidenceBias: 'VISUAL_MEDIA_AND_SHADERS'
  },
  PERSONAL_MANIFESTO: {
    id: 'PERSONAL_MANIFESTO',
    name: 'Personal Manifesto & Focus',
    compatibleTopologies: ['narrow-reading-column', 'edge-to-edge-editorial'],
    compatibleNavigations: ['top-editorial-masthead', 'bottom-chapter-nav'],
    compatibleTypographies: ['grotesk', 'serif-editorial'],
    compatibleSurfaces: ['paper', 'flat'],
    readingMeasure: '640px',
    evidenceBias: 'CONCISE_IDENTITY'
  }
};

class ArtDirectionModel {
  /**
   * Selects compatible art directions based on content profile
   */
  static selectArtDirection(profile = {}) {
    const role = (profile.role || '').toLowerCase();
    const publications = Array.isArray(profile.publications || profile.research) ? (profile.publications || profile.research) : [];
    const projects = Array.isArray(profile.projects) ? profile.projects : [];

    if (publications.length > 0 || role.includes('research') || role.includes('scientist')) {
      return ART_DIRECTIONS.EDITORIAL_RESEARCH;
    }
    if (role.includes('security') || role.includes('kernel') || role.includes('systems') || role.includes('distributed')) {
      return ART_DIRECTIONS.TECHNICAL_OBSERVATORY;
    }
    if (role.includes('3d') || role.includes('creative') || role.includes('artist') || role.includes('photographer')) {
      return ART_DIRECTIONS.VISUAL_EXHIBITION;
    }
    if (role.includes('open-source') || role.includes('maintainer')) {
      return ART_DIRECTIONS.OPEN_SOURCE_ARCHIVE;
    }
    if (projects.length <= 2 && !profile.experience) {
      return ART_DIRECTIONS.PERSONAL_MANIFESTO;
    }
    return ART_DIRECTIONS.PRODUCT_STUDIO;
  }
}

module.exports = {
  ArtDirectionModel,
  ART_DIRECTIONS
};

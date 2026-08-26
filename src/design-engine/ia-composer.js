/**
 * Information Architecture (IA) Composer
 * Directs structural section sequences, content hierarchy, and navigation models.
 * Completely eliminates the rigid [Hero -> Bio -> Projects -> Skills -> Experience -> Contact] skeleton.
 */

const IA_MODELS = {
  'work-first-runway': {
    id: 'work-first-runway',
    name: 'Work-First Runway (Projects Precede Bio)',
    layoutId: 'work-first-runway',
    defaultStorytelling: 'fullscreen-interactive-slide',
    sectionOrder: ['work_runway', 'technical_evidence', 'professional_journey', 'creator_statement', 'contact_dock'],
    navigationModel: 'minimal-anchor-bar'
  },
  'split-screen-dossier': {
    id: 'split-screen-dossier',
    name: 'Split-Screen Dossier (Fixed Identity Column)',
    layoutId: 'split-screen-dossier',
    defaultStorytelling: 'code-architecture-dossier',
    sectionOrder: ['split_identity', 'featured_artifacts', 'verified_stack', 'experience_record', 'direct_contact'],
    navigationModel: 'sidebar-live-telemetry'
  },
  'horizontal-exhibition': {
    id: 'horizontal-exhibition',
    name: 'Horizontal Exhibition (Track Gallery Flow)',
    layoutId: 'horizontal-exhibition',
    defaultStorytelling: 'horizontal-filmstrip',
    sectionOrder: ['exhibition_title', 'curated_track', 'skills_archive', 'experience_index', 'contact_gate'],
    navigationModel: 'horizontal-track-scrubber'
  },
  'editorial-monograph': {
    id: 'editorial-monograph',
    name: 'Editorial Monograph (Deep Narrative Chapters)',
    layoutId: 'editorial-monograph',
    defaultStorytelling: 'magazine-editorial-chapter',
    sectionOrder: ['monograph_cover', 'thesis_statement', 'project_chapters', 'trajectory_essay', 'sign_off'],
    navigationModel: 'floating-index-pill'
  },
  'computational-terminal': {
    id: 'computational-terminal',
    name: 'Computational Terminal (CLI Matrix)',
    layoutId: 'computational-terminal',
    defaultStorytelling: 'terminal-session-log',
    sectionOrder: ['cli_prompt_hero', 'system_capabilities', 'executed_projects', 'kernel_history', 'connect_terminal'],
    navigationModel: 'terminal-command-menu'
  },
  'spatial-3d-stage': {
    id: 'spatial-3d-stage',
    name: 'Spatial 3D Stage (Cinematic Waypoints)',
    layoutId: 'spatial-3d-stage',
    defaultStorytelling: 'spatial-orbit-dock',
    sectionOrder: ['stage_intro', 'orbiting_projects', 'stack_constellation', 'career_trajectory', 'beacon_contact'],
    navigationModel: 'spatial-orbit-nav'
  },
  'narrative-timeline': {
    id: 'narrative-timeline',
    name: 'Narrative Timeline (Integrated Chronology)',
    layoutId: 'narrative-timeline',
    defaultStorytelling: 'timeline-milestone-card',
    sectionOrder: ['prologue_hero', 'chronological_milestones', 'mastered_tools', 'epilogue_contact'],
    navigationModel: 'vertical-timeline-tracker'
  },
  'minimal-single-screen': {
    id: 'minimal-single-screen',
    name: 'Minimal Single Screen (Typographic Index)',
    layoutId: 'minimal-single-screen',
    defaultStorytelling: 'typographic-index-reveal',
    sectionOrder: ['statement_masthead', 'interactive_index', 'status_footer'],
    navigationModel: 'keyboard-cursor-dock'
  },
  'asymmetric-bento-canvas': {
    id: 'asymmetric-bento-canvas',
    name: 'Asymmetric Bento Canvas (Variable Geometry)',
    layoutId: 'asymmetric-bento-canvas',
    defaultStorytelling: 'asymmetric-media-mosaic',
    sectionOrder: ['bento_masthead', 'featured_mosaic', 'skill_matrices', 'career_history', 'contact_action'],
    navigationModel: 'floating-glass-bar'
  },
  'magazine-spread-columns': {
    id: 'magazine-spread-columns',
    name: 'Magazine Spread (3-Column Architecture)',
    layoutId: 'magazine-spread-columns',
    defaultStorytelling: 'split-screen-comparison',
    sectionOrder: ['magazine_header', 'three_column_portfolio', 'editorial_skills', 'author_profile', 'contact_spread'],
    navigationModel: 'magazine-header-tabs'
  }
};

class IAComposer {
  static getModel(id) {
    return IA_MODELS[id] || IA_MODELS['work-first-runway'];
  }

  static getAllModelIds() {
    return Object.keys(IA_MODELS);
  }

  static selectModel(contentProfile, preferredLayout = null, recentHistory = []) {
    const layoutAliases = {
      'spatial-3d-cyber': 'spatial-3d-stage',
      'kinetic-3d-glass': 'asymmetric-bento-canvas',
      'terminal-3d-matrix': 'computational-terminal',
      'neo-brutalist-3d': 'magazine-spread-columns',
      'editorial-3d-minimal': 'editorial-monograph'
    };

    const targetLayout = layoutAliases[preferredLayout] || preferredLayout;
    if (targetLayout && IA_MODELS[targetLayout]) {
      return IA_MODELS[targetLayout];
    }

    const { signals } = contentProfile;
    const allIds = Object.keys(IA_MODELS);

    // Filter by content suitability
    let candidates = [...allIds];
    if (signals?.projectCount === 0) {
      candidates = ['minimal-single-screen', 'editorial-monograph', 'narrative-timeline'];
    }

    // Filter against recent history to guarantee comprehensive structural rotation
    const recentIaIds = recentHistory.map(h => h.iaModel || h.informationArchitecture?.modelId || h.modelId || h.structuralFingerprint?.traits?.iaModel).filter(Boolean);
    const nonRecentCandidates = candidates.filter(id => !recentIaIds.slice(-8).includes(id));
    const pool = nonRecentCandidates.length > 0 ? nonRecentCandidates : candidates;

    const chosenId = pool[Math.floor(Math.random() * pool.length)];
    return IA_MODELS[chosenId] || IA_MODELS['work-first-runway'];
  }
}

module.exports = { IAComposer, IA_MODELS };

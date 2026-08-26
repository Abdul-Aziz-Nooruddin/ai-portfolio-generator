/**
 * Section Registry (Phase 23)
 * Maps IA section identifiers to stable semantic metadata, mobility rules, and visibility constraints.
 */

const SECTION_DEFINITIONS = {
  // Hero & Identity
  'work_runway': { id: 'work_runway', label: 'Work Runway Lead', type: 'hero', required: true, movable: false, hideable: false },
  'split_identity': { id: 'split_identity', label: 'Identity Column', type: 'hero', required: true, movable: false, hideable: false },
  'exhibition_title': { id: 'exhibition_title', label: 'Exhibition Header', type: 'hero', required: true, movable: false, hideable: false },
  'monograph_cover': { id: 'monograph_cover', label: 'Monograph Cover', type: 'hero', required: true, movable: false, hideable: false },
  'cli_prompt_hero': { id: 'cli_prompt_hero', label: 'Terminal CLI Prompt', type: 'hero', required: true, movable: false, hideable: false },
  'stage_intro': { id: 'stage_intro', label: 'Spatial Stage Intro', type: 'hero', required: true, movable: false, hideable: false },
  'bento_masthead': { id: 'bento_masthead', label: 'Bento Masthead Box', type: 'hero', required: true, movable: false, hideable: false },
  'statement_masthead': { id: 'statement_masthead', label: 'Statement Masthead', type: 'hero', required: true, movable: false, hideable: false },
  'prologue_hero': { id: 'prologue_hero', label: 'Prologue Header', type: 'hero', required: true, movable: false, hideable: false },
  'magazine_header': { id: 'magazine_header', label: 'Magazine Edition Header', type: 'hero', required: true, movable: false, hideable: false },

  // Projects & Artifacts
  'featured_artifacts': { id: 'featured_artifacts', label: 'Featured Artifacts', type: 'projects', required: true, movable: true, hideable: false },
  'curated_track': { id: 'curated_track', label: 'Curated Track', type: 'projects', required: true, movable: true, hideable: false },
  'project_chapters': { id: 'project_chapters', label: 'Project Chapters', type: 'projects', required: true, movable: true, hideable: false },
  'executed_projects': { id: 'executed_projects', label: 'Executed Projects', type: 'projects', required: true, movable: true, hideable: false },
  'orbiting_projects': { id: 'orbiting_projects', label: 'Orbiting Projects', type: 'projects', required: true, movable: true, hideable: false },
  'featured_mosaic': { id: 'featured_mosaic', label: 'Featured Bento Mosaic', type: 'projects', required: true, movable: true, hideable: false },
  'interactive_index': { id: 'interactive_index', label: 'Interactive Project Index', type: 'projects', required: true, movable: true, hideable: false },
  'chronological_milestones': { id: 'chronological_milestones', label: 'Chronological Milestones', type: 'projects', required: true, movable: true, hideable: false },
  'three_column_portfolio': { id: 'three_column_portfolio', label: 'Three-Column Portfolio', type: 'projects', required: true, movable: true, hideable: false },

  // Skills & Technical Evidence
  'technical_evidence': { id: 'technical_evidence', label: 'Technical Evidence', type: 'skills', required: false, movable: true, hideable: true },
  'verified_stack': { id: 'verified_stack', label: 'Verified Tech Stack', type: 'skills', required: false, movable: true, hideable: true },
  'skills_archive': { id: 'skills_archive', label: 'Skills Archive', type: 'skills', required: false, movable: true, hideable: true },
  'thesis_statement': { id: 'thesis_statement', label: 'Design Thesis', type: 'about', required: false, movable: true, hideable: true },
  'system_capabilities': { id: 'system_capabilities', label: 'System Capabilities', type: 'skills', required: false, movable: true, hideable: true },
  'stack_constellation': { id: 'stack_constellation', label: 'Stack Constellation', type: 'skills', required: false, movable: true, hideable: true },
  'skill_matrices': { id: 'skill_matrices', label: 'Skill Matrices', type: 'skills', required: false, movable: true, hideable: true },
  'mastered_tools': { id: 'mastered_tools', label: 'Mastered Tools', type: 'skills', required: false, movable: true, hideable: true },
  'editorial_skills': { id: 'editorial_skills', label: 'Editorial Skills', type: 'skills', required: false, movable: true, hideable: true },

  // Experience, Biography & Journey
  'professional_journey': { id: 'professional_journey', label: 'Professional Journey', type: 'experience', required: false, movable: true, hideable: true },
  'experience_record': { id: 'experience_record', label: 'Experience Record', type: 'experience', required: false, movable: true, hideable: true },
  'experience_index': { id: 'experience_index', label: 'Experience Index', type: 'experience', required: false, movable: true, hideable: true },
  'trajectory_essay': { id: 'trajectory_essay', label: 'Trajectory Essay', type: 'experience', required: false, movable: true, hideable: true },
  'kernel_history': { id: 'kernel_history', label: 'Kernel History', type: 'experience', required: false, movable: true, hideable: true },
  'trajectory_waypoints': { id: 'trajectory_waypoints', label: 'Trajectory Waypoints', type: 'experience', required: false, movable: true, hideable: true },
  'journey_cells': { id: 'journey_cells', label: 'Journey Cells', type: 'experience', required: false, movable: true, hideable: true },
  'author_profile': { id: 'author_profile', label: 'Author Profile', type: 'about', required: false, movable: true, hideable: true },
  'creator_statement': { id: 'creator_statement', label: 'Creator Statement', type: 'about', required: false, movable: true, hideable: true },

  // Secondary Morphed Sections
  'morphed_credentials': { id: 'morphed_credentials', label: 'Education & Accreditations', type: 'credentials', required: false, movable: true, hideable: true },

  // Contact & Footers
  'contact_dock': { id: 'contact_dock', label: 'Contact Dock', type: 'contact', required: false, movable: true, hideable: false },
  'direct_contact': { id: 'direct_contact', label: 'Direct Contact', type: 'contact', required: false, movable: true, hideable: false },
  'contact_gate': { id: 'contact_gate', label: 'Contact Gate', type: 'contact', required: false, movable: true, hideable: false },
  'sign_off': { id: 'sign_off', label: 'Sign Off', type: 'contact', required: false, movable: true, hideable: false },
  'connect_terminal': { id: 'connect_terminal', label: 'Connect Terminal', type: 'contact', required: false, movable: true, hideable: false },
  'signal_dock': { id: 'signal_dock', label: 'Signal Dock', type: 'contact', required: false, movable: true, hideable: false },
  'bento_contact': { id: 'bento_contact', label: 'Bento Contact Cell', type: 'contact', required: false, movable: true, hideable: false },
  'status_footer': { id: 'status_footer', label: 'Status & Contact', type: 'contact', required: false, movable: true, hideable: false },
  'epilogue_reach': { id: 'epilogue_reach', label: 'Epilogue Reach', type: 'contact', required: false, movable: true, hideable: false },
  'contact_spread': { id: 'contact_spread', label: 'Contact Spread', type: 'contact', required: false, movable: true, hideable: false },
  'morphed_footer': { id: 'morphed_footer', label: 'Footer', type: 'footer', required: true, movable: false, hideable: false }
};

class SectionRegistry {
  static getSectionMeta(sectionId) {
    return SECTION_DEFINITIONS[sectionId] || {
      id: sectionId,
      label: sectionId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      type: 'custom',
      required: false,
      movable: true,
      hideable: true
    };
  }

  static isHideable(sectionId) {
    const meta = this.getSectionMeta(sectionId);
    return meta.hideable && !meta.required;
  }

  static isMovable(sectionId) {
    const meta = this.getSectionMeta(sectionId);
    return meta.movable;
  }
}

module.exports = { SectionRegistry, SECTION_DEFINITIONS };

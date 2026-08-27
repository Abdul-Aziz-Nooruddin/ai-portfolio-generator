/**
 * 🏛️ Content Presentation Contract (Phase 47)
 * Defines the presentation strategy for every ContentAtom and entity based on:
 * - Semantic Type
 * - Importance Level
 * - Evidence Depth
 * - Art Direction / Visual Universe
 * - Page Topology & Information Architecture
 */

const PRESENTATION_STRATEGIES = {
  HERO_EVIDENCE: 'HERO_EVIDENCE',
  NARRATIVE: 'NARRATIVE',
  CASE_STUDY: 'CASE_STUDY',
  TECHNICAL_SPEC: 'TECHNICAL_SPEC',
  METRIC_CALLOUT: 'METRIC_CALLOUT',
  TIMELINE: 'TIMELINE',
  RESEARCH_DOSSIER: 'RESEARCH_DOSSIER',
  ARCHITECTURE_VIEW: 'ARCHITECTURE_VIEW',
  RESPONSIBILITY_LIST: 'RESPONSIBILITY_LIST',
  ACHIEVEMENT_RECORD: 'ACHIEVEMENT_RECORD',
  EDUCATION_RECORD: 'EDUCATION_RECORD',
  PUBLICATION_RECORD: 'PUBLICATION_RECORD',
  LINKED_REFERENCE: 'LINKED_REFERENCE',
  SUPPORTING_DETAIL: 'SUPPORTING_DETAIL',
  CUSTOM_EVIDENCE: 'CUSTOM_EVIDENCE',
  INLINE_CONTEXT: 'INLINE_CONTEXT',
  APPENDIX_REFERENCE: 'APPENDIX_REFERENCE'
};

class ContentPresentationContract {
  /**
   * Selects the optimal presentation strategy for a given content item
   * @param {Object} item - Fact or atom
   * @param {Object} options - Topology and visual grammar options
   * @returns {string} Presentation strategy key
   */
  static selectStrategy(item = {}, options = {}) {
    const category = item.category || '';
    const field = item.field || '';

    if (category === 'identity') return PRESENTATION_STRATEGIES.HERO_EVIDENCE;
    if (field === 'architecture') return PRESENTATION_STRATEGIES.ARCHITECTURE_VIEW;
    if (field === 'metrics' || field === 'outcomes') return PRESENTATION_STRATEGIES.METRIC_CALLOUT;
    if (field === 'challenges' || field === 'decisions' || field === 'tradeoffs') return PRESENTATION_STRATEGIES.TECHNICAL_SPEC;
    if (category === 'experience') return PRESENTATION_STRATEGIES.TIMELINE;
    if (category === 'education') return PRESENTATION_STRATEGIES.EDUCATION_RECORD;
    if (category === 'research' || category === 'publication') return PRESENTATION_STRATEGIES.RESEARCH_DOSSIER;
    if (category === 'custom') return PRESENTATION_STRATEGIES.CUSTOM_EVIDENCE;

    return PRESENTATION_STRATEGIES.CASE_STUDY;
  }
}

module.exports = { ContentPresentationContract, PRESENTATION_STRATEGIES };

/**
 * 🏛️ Content Context Engine (Phase 47)
 * Determines semantic purpose, parent association, labeling requirements, and visual grouping
 * for every piece of information in the candidate portfolio.
 * 
 * Invariant: Every fact must have an unambiguous contextual reason for its placement.
 */

const SEMANTIC_ROLES = {
  IDENTITY_ANCHOR: 'IDENTITY_ANCHOR',
  FLAGSHIP_SUMMARY: 'FLAGSHIP_SUMMARY',
  ENGINEERING_SPEC: 'ENGINEERING_SPEC',
  TELEMETRY_METRIC: 'TELEMETRY_METRIC',
  ARCHITECTURAL_PATTERN: 'ARCHITECTURAL_PATTERN',
  DECISION_RATIONALE: 'DECISION_RATIONALE',
  TRADE_OFF_ANALYSIS: 'TRADE_OFF_ANALYSIS',
  CAREER_RESPONSIBILITY: 'CAREER_RESPONSIBILITY',
  MEASURABLE_OUTCOME: 'MEASURABLE_OUTCOME',
  RESEARCH_METHODOLOGY: 'RESEARCH_METHODOLOGY',
  EMPIRICAL_FINDING: 'EMPIRICAL_FINDING',
  ACADEMIC_CURRICULUM: 'ACADEMIC_CURRICULUM',
  VERIFIED_CREDENTIAL: 'VERIFIED_CREDENTIAL',
  DOMAIN_SPECIFICATION: 'DOMAIN_SPECIFICATION'
};

class ContentContextEngine {
  /**
   * Evaluates and assigns contextual metadata for an atom or fact
   * @param {Object} item - Fact or ContentAtom
   * @param {Object} context - Surrounding profile context
   * @returns {Object} Contextual mapping
   */
  static contextualize(item = {}, context = {}) {
    const field = item.field || '';
    const category = item.category || '';
    const parentEntity = item.parentEntity || context.parentEntity || null;

    let semanticRole = SEMANTIC_ROLES.DOMAIN_SPECIFICATION;
    let requiredLabel = '';
    let visualGrouping = 'STANDARD_CARD';
    let isOrphanRisk = false;

    if (category === 'identity') {
      semanticRole = SEMANTIC_ROLES.IDENTITY_ANCHOR;
      visualGrouping = 'HERO_MASTHEAD';
    } else if (category === 'project' || category.startsWith('projects[')) {
      if (field === 'architecture' || field.includes('architecture')) {
        semanticRole = SEMANTIC_ROLES.ARCHITECTURAL_PATTERN;
        requiredLabel = '[ARCHITECTURE]';
        visualGrouping = 'PROJECT_CASE_STUDY';
      } else if (field === 'metrics' || field.includes('metrics')) {
        semanticRole = SEMANTIC_ROLES.TELEMETRY_METRIC;
        requiredLabel = '[TELEMETRY / PERFORMANCE]';
        visualGrouping = 'PROJECT_TELEMETRY_BLOCK';
      } else if (field === 'challenges' || field.includes('challenges')) {
        semanticRole = SEMANTIC_ROLES.ENGINEERING_SPEC;
        requiredLabel = '[ENGINEERING CHALLENGES]';
        visualGrouping = 'PROJECT_CASE_STUDY';
      } else if (field === 'decisions' || field.includes('decisions')) {
        semanticRole = SEMANTIC_ROLES.DECISION_RATIONALE;
        requiredLabel = '[TECHNICAL DECISIONS]';
        visualGrouping = 'PROJECT_CASE_STUDY';
      } else if (field === 'tradeoffs' || field.includes('tradeoffs')) {
        semanticRole = SEMANTIC_ROLES.TRADE_OFF_ANALYSIS;
        requiredLabel = '[TRADE-OFFS & CONSTRAINTS]';
        visualGrouping = 'PROJECT_CASE_STUDY';
      } else {
        semanticRole = SEMANTIC_ROLES.FLAGSHIP_SUMMARY;
        visualGrouping = 'PROJECT_RUNWAY';
      }
    } else if (category === 'experience' || category.startsWith('experience[')) {
      if (field === 'responsibilities' || field.includes('responsibilities')) {
        semanticRole = SEMANTIC_ROLES.CAREER_RESPONSIBILITY;
        requiredLabel = '[CORE RESPONSIBILITIES]';
        visualGrouping = 'CAREER_TIMELINE';
      } else if (field === 'outcomes' || field.includes('outcomes')) {
        semanticRole = SEMANTIC_ROLES.MEASURABLE_OUTCOME;
        requiredLabel = '[MEASURABLE OUTCOMES]';
        visualGrouping = 'CAREER_TIMELINE';
      } else {
        semanticRole = SEMANTIC_ROLES.CAREER_RESPONSIBILITY;
        visualGrouping = 'CAREER_TIMELINE';
      }
    } else if (category === 'research' || category === 'publication' || category.startsWith('publications[')) {
      if (field === 'methodology' || field.includes('methodology')) {
        semanticRole = SEMANTIC_ROLES.RESEARCH_METHODOLOGY;
        requiredLabel = '[METHODOLOGY]';
        visualGrouping = 'RESEARCH_DOSSIER';
      } else if (field === 'findings' || field.includes('findings')) {
        semanticRole = SEMANTIC_ROLES.EMPIRICAL_FINDING;
        requiredLabel = '[EMPIRICAL FINDINGS]';
        visualGrouping = 'RESEARCH_DOSSIER';
      } else {
        semanticRole = SEMANTIC_ROLES.RESEARCH_METHODOLOGY;
        visualGrouping = 'RESEARCH_DOSSIER';
      }
    } else if (category === 'education' || category.startsWith('education[')) {
      if (field === 'coursework' || field.includes('coursework')) {
        semanticRole = SEMANTIC_ROLES.ACADEMIC_CURRICULUM;
        requiredLabel = '[SPECIALIZED COURSEWORK]';
        visualGrouping = 'ACADEMIC_RECORD';
      } else {
        semanticRole = SEMANTIC_ROLES.ACADEMIC_CURRICULUM;
        visualGrouping = 'ACADEMIC_RECORD';
      }
    }

    // Check orphan risk: child spec without explicit parent entity
    if (!parentEntity && ['architecture', 'metrics', 'challenges', 'decisions', 'tradeoffs', 'responsibilities', 'outcomes', 'methodology', 'findings'].includes(field)) {
      isOrphanRisk = true;
    }

    return {
      field,
      category,
      parentEntity,
      semanticRole,
      requiredLabel,
      visualGrouping,
      isOrphanRisk
    };
  }
}

module.exports = { ContentContextEngine, SEMANTIC_ROLES };

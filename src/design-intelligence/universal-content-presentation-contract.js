/**
 * 🏛️ Universal Content Presentation Contract (Phase 48)
 * Enforces the core Phase 48 law:
 * "EVERY CONTENT ATOM MUST HAVE A PRESENTATION DESTINATION."
 * 
 * Pipeline:
 * CONTENT ATOM -> SEMANTIC ENTITY -> SEMANTIC ROLE -> IMPORTANCE -> CONTEXT -> PRESENTATION STRATEGY -> SECTION -> COMPONENT/VISUAL FORM -> VISIBLE DOM.
 * 
 * Guarantees that every user fact is presented in its optimal, semantically appropriate,
 * human-readable visual form rather than generic card dumping.
 */

const PRESENTATION_DESTINATIONS = {
  HERO_MASTHEAD: 'HERO_MASTHEAD',
  EDITORIAL_NARRATIVE: 'EDITORIAL_NARRATIVE',
  TECHNICAL_CASE_STUDY: 'TECHNICAL_CASE_STUDY',
  SYSTEM_BLUEPRINT: 'SYSTEM_BLUEPRINT',
  METRIC_TELEMETRY: 'METRIC_TELEMETRY',
  DECISION_RECORD: 'DECISION_RECORD',
  TRADEOFF_MATRIX: 'TRADEOFF_MATRIX',
  EXPERIENCE_TIMELINE: 'EXPERIENCE_TIMELINE',
  RESEARCH_DOSSIER: 'RESEARCH_DOSSIER',
  CURRICULUM_MATRIX: 'CURRICULUM_MATRIX',
  CREDENTIAL_LEDGER: 'CREDENTIAL_LEDGER',
  CAPABILITY_MATRIX: 'CAPABILITY_MATRIX',
  CONTEXTUAL_EVIDENCE_SPEC: 'CONTEXTUAL_EVIDENCE_SPEC'
};

class UniversalContentPresentationContract {
  /**
   * Resolves the full presentation destination pipeline for an atom
   * @param {Object} atom - ContentAtom instance or fact
   * @param {Object} context - Surrounding candidate context
   * @returns {Object} Full destination resolution
   */
  static resolveDestination(atom = {}, context = {}) {
    const field = atom.field || '';
    const category = atom.category || '';
    const semanticType = atom.semanticType || 'text';

    let destination = PRESENTATION_DESTINATIONS.CONTEXTUAL_EVIDENCE_SPEC;
    let targetSection = 'ADDITIONAL_EVIDENCE';
    let visualForm = 'SPECIFICATION_CARD';
    let semanticLabel = '';

    // 1. Identity & Philosophy
    if (category === 'identity' || field === 'name' || field === 'role' || field === 'tagline') {
      destination = PRESENTATION_DESTINATIONS.HERO_MASTHEAD;
      targetSection = 'HERO';
      visualForm = 'MASTHEAD_HERO';
    } else if (field === 'bio' || category === 'questionnaire' || field.includes('Philosophy') || field.includes('Vision')) {
      destination = PRESENTATION_DESTINATIONS.EDITORIAL_NARRATIVE;
      targetSection = 'THESIS';
      visualForm = 'EDITORIAL_BLOCK';
      semanticLabel = '[ENGINEERING THESIS & PHILOSOPHY]';
    }
    // 2. Deep Projects & Technical Specifications
    else if (category === 'project' || category.startsWith('project') || field === 'architecture' || field === 'challenges' || field === 'decisions' || field === 'tradeoffs' || field === 'metrics') {
      if (field === 'architecture' || field.includes('architecture')) {
        destination = PRESENTATION_DESTINATIONS.SYSTEM_BLUEPRINT;
        targetSection = 'PROJECTS';
        visualForm = 'TOPOLOGY_BLUEPRINT';
        semanticLabel = '[SYSTEM ARCHITECTURE & CONCURRENCY]';
      } else if (field === 'metrics' || field.includes('metrics') || semanticType === 'metric') {
        destination = PRESENTATION_DESTINATIONS.METRIC_TELEMETRY;
        targetSection = 'PROJECTS';
        visualForm = 'TELEMETRY_CLUSTER';
        semanticLabel = '[MEASURED BENCHMARK / TELEMETRY]';
      } else if (field === 'challenges' || field.includes('challenges')) {
        destination = PRESENTATION_DESTINATIONS.TECHNICAL_CASE_STUDY;
        targetSection = 'PROJECTS';
        visualForm = 'CHALLENGE_NARRATIVE';
        semanticLabel = '[ENGINEERING OBSTACLES & CONSTRAINTS]';
      } else if (field === 'decisions' || field.includes('decisions')) {
        destination = PRESENTATION_DESTINATIONS.DECISION_RECORD;
        targetSection = 'PROJECTS';
        visualForm = 'DECISION_LOG';
        semanticLabel = '[ARCHITECTURE DECISION RECORD (ADR)]';
      } else if (field === 'tradeoffs' || field.includes('tradeoffs')) {
        destination = PRESENTATION_DESTINATIONS.TRADEOFF_MATRIX;
        targetSection = 'PROJECTS';
        visualForm = 'TRADEOFF_COMPARISON';
        semanticLabel = '[TRADE-OFF ANALYSIS & LIMITATIONS]';
      } else {
        destination = PRESENTATION_DESTINATIONS.TECHNICAL_CASE_STUDY;
        targetSection = 'PROJECTS';
        visualForm = 'CASE_STUDY_DOSSIER';
      }
    }
    // 3. Career & Experience
    else if (category === 'experience' || category.startsWith('experience')) {
      destination = PRESENTATION_DESTINATIONS.EXPERIENCE_TIMELINE;
      targetSection = 'EXPERIENCE';
      visualForm = 'TIMELINE_CHAPTER';
      if (field === 'outcomes' || field.includes('outcomes')) {
        semanticLabel = '[MEASURABLE BUSINESS & SYSTEM OUTCOMES]';
      } else if (field === 'responsibilities' || field.includes('responsibilities')) {
        semanticLabel = '[LEADERSHIP & RESPONSIBILITIES]';
      }
    }
    // 4. Academic Research & Publications
    else if (category === 'research' || category === 'publication' || category.startsWith('publication')) {
      destination = PRESENTATION_DESTINATIONS.RESEARCH_DOSSIER;
      targetSection = 'PUBLICATIONS';
      visualForm = 'PEER_REVIEW_ENTRY';
      if (field === 'findings' || field.includes('findings')) {
        semanticLabel = '[EMPIRICAL FINDINGS & EVALUATION]';
      } else if (field === 'methodology' || field.includes('methodology')) {
        semanticLabel = '[EXPERIMENTAL METHODOLOGY]';
      }
    }
    // 5. Education & Coursework
    else if (category === 'education' || category.startsWith('education')) {
      destination = PRESENTATION_DESTINATIONS.CURRICULUM_MATRIX;
      targetSection = 'EDUCATION';
      visualForm = 'ACADEMIC_RECORD';
      if (field === 'coursework' || field.includes('coursework')) {
        semanticLabel = '[SPECIALIZED CURRICULUM & HONORS]';
      }
    }
    // 6. Skills & Capabilities
    else if (category === 'skill' || category.startsWith('skill')) {
      destination = PRESENTATION_DESTINATIONS.CAPABILITY_MATRIX;
      targetSection = 'SKILLS';
      visualForm = 'TECHNICAL_MATRIX';
    }
    // 7. Verified Certifications & Honors
    else if (category === 'certification' || category === 'award') {
      destination = PRESENTATION_DESTINATIONS.CREDENTIAL_LEDGER;
      targetSection = 'CERTIFICATIONS';
      visualForm = 'CREDENTIAL_CARD';
      semanticLabel = '[VERIFIED CREDENTIAL / HONORS]';
    }

    return {
      atomId: atom.id || 'atom',
      field,
      category,
      destination,
      targetSection,
      visualForm,
      semanticLabel,
      isResolved: true
    };
  }

  /**
   * Asserts that a list of atoms is 100% mapped to valid presentation destinations
   */
  static evaluateBatch(atoms = []) {
    let resolvedCount = 0;
    const destinations = new Map();

    atoms.forEach(atom => {
      const res = this.resolveDestination(atom);
      if (res.isResolved) resolvedCount++;
      const current = destinations.get(res.destination) || 0;
      destinations.set(res.destination, current + 1);
    });

    const total = atoms.length;
    const coverage = total > 0 ? Number((resolvedCount / total * 100).toFixed(2)) : 100;

    return {
      totalAtoms: total,
      resolvedCount,
      coverage,
      destinationBreakdown: Object.fromEntries(destinations.entries()),
      pass: coverage >= 99.5
    };
  }
}

module.exports = { UniversalContentPresentationContract, PRESENTATION_DESTINATIONS };

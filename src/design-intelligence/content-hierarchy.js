/**
 * 🏛️ Content Hierarchy Graph (Phase 42)
 * Establishes intentional narrative arcs and reading hierarchy:
 * PRIMARY STORY -> SECONDARY STORY -> SUPPORTING PROOF -> REFERENCE MATERIAL.
 * 
 * Ensures flagship projects, research breakthroughs, and verifiable metrics lead
 * rather than dumping generic skill badge clouds first.
 */

const { ContentImportanceModel } = require('./content-importance-model');

class ContentHierarchy {
  /**
   * Constructs the authoritative content hierarchy graph
   * @param {Object} profile - Normalized developer profile
   * @returns {Object} Narrative arc and structured hierarchy
   */
  static buildHierarchy(profile = {}) {
    const importance = ContentImportanceModel.evaluate(profile);

    let primaryStory = null;
    let secondaryStory = [];
    let supportingProof = [];
    let referenceMaterial = [];

    // 1. Determine Primary Story
    if (importance.primaryFocus === 'RESEARCH_FIRST' && importance.research.length > 0) {
      primaryStory = {
        type: 'RESEARCH_THESIS',
        title: importance.research[0].title,
        eyebrow: 'FLAGSHIP RESEARCH & PUBLICATIONS',
        leadElement: 'PUBLICATIONS'
      };
    } else if (importance.projects.length > 0) {
      primaryStory = {
        type: 'FLAGSHIP_WORK',
        title: importance.projects[0].name,
        eyebrow: 'FLAGSHIP ENGINEERING ARTIFACT',
        leadElement: 'PROJECTS'
      };
    } else {
      primaryStory = {
        type: 'CAREER_IDENTITY',
        title: `${importance.identity.name} — ${importance.identity.role}`,
        eyebrow: 'ENGINEERING PROFILE',
        leadElement: 'HERO'
      };
    }

    // 2. Determine Secondary Story
    if (importance.projects.length > 1) {
      secondaryStory.push({
        type: 'SUPPORTING_PROJECTS',
        items: importance.projects.slice(1).map(p => p.name)
      });
    }
    if (importance.experience.length > 0) {
      secondaryStory.push({
        type: 'CAREER_PROGRESSION',
        items: importance.experience.map(e => `${e.role} @ ${e.company}`)
      });
    }

    // 3. Supporting Proof
    const metricsCount = importance.projects.filter(p => p.hasMetrics).length;
    const archCount = importance.projects.filter(p => p.hasArchitecture).length;
    supportingProof.push({
      type: 'VERIFIED_METRICS',
      count: metricsCount,
      hasDeepArchitecture: archCount > 0
    });

    // 4. Reference Material
    referenceMaterial.push({ type: 'CORE_CAPABILITIES', weight: importance.skillsTier });
    referenceMaterial.push({ type: 'ACADEMIC_CREDENTIALS', weight: importance.educationTier });

    // 5. Derive Optimized Section Sequence based on Evidence Hierarchy
    let recommendedSequence = [];
    if (importance.primaryFocus === 'RESEARCH_FIRST') {
      recommendedSequence = ['HERO', 'PUBLICATIONS', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'EDUCATION', 'CONTACT'];
    } else if (importance.projects.length >= 2) {
      recommendedSequence = ['HERO', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'EDUCATION', 'CONTACT'];
    } else if (importance.experience.length >= 2) {
      recommendedSequence = ['HERO', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'EDUCATION', 'CONTACT'];
    } else {
      recommendedSequence = ['HERO', 'PROJECTS', 'SKILLS', 'EXPERIENCE', 'EDUCATION', 'CONTACT'];
    }

    return {
      primaryStory,
      secondaryStory,
      supportingProof,
      referenceMaterial,
      recommendedSequence,
      importance
    };
  }
}

module.exports = { ContentHierarchy };

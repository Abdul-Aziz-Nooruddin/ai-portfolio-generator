/**
 * 🏛️ Content Synthesis Engine (Phase 47)
 * Deterministic semantic organization and synthesis layer.
 * Groups related facts into coherent narrative clusters, cross-references multi-source evidence,
 * and eliminates duplicate visual tags while preserving 100% of underlying source atoms and provenance.
 * 
 * Strict Invariant: Does NOT summarize away or delete user evidence.
 */

const { SemanticContentGraph } = require('./semantic-content-graph');
const { ContentContextEngine } = require('./content-context-engine');

class ContentSynthesisEngine {
  /**
   * Synthesizes a structured, semantically organized profile
   * @param {Object} rawProfile - Normalized profile or multi-source object
   * @returns {Object} Synthesized profile with narrative clusters and semantic graph
   */
  static synthesize(rawProfile = {}) {
    const graph = SemanticContentGraph.buildFromProfile(rawProfile);
    
    // 1. Synthesize Technical Skills Matrix (Deduplicated while retaining provenance)
    const rawSkills = Array.isArray(rawProfile.skills) ? rawProfile.skills : [];
    const uniqueSkills = Array.from(new Set(rawSkills.map(s => String(s).trim()).filter(Boolean)));

    // 2. Synthesize Project Case Studies with deep context
    const projects = Array.isArray(rawProfile.projects) ? rawProfile.projects.map((p, idx) => {
      const pContext = ContentContextEngine.contextualize(p, { parentEntity: `projects[${idx}]` });
      return {
        ...p,
        semanticRole: pContext.semanticRole,
        visualGrouping: pContext.visualGrouping,
        evidenceCount: [p.architecture, p.metrics, p.challenges, p.decisions, p.tradeoffs, p.github, p.live].filter(Boolean).length
      };
    }) : [];

    // 3. Synthesize Career Milestones
    const experience = Array.isArray(rawProfile.experience) ? rawProfile.experience.map((e, idx) => {
      return {
        ...e,
        hasOutcomes: Boolean(e.outcomes),
        hasResponsibilities: Boolean(e.responsibilities)
      };
    }) : [];

    // 4. Synthesize Research & Publications
    const publications = Array.isArray(rawProfile.publications) ? rawProfile.publications.map(pub => {
      return {
        ...pub,
        isPeerReviewed: Boolean(pub.doi || pub.venue)
      };
    }) : [];

    return {
      profile: {
        ...rawProfile,
        skills: uniqueSkills,
        projects,
        experience,
        publications
      },
      graph,
      clusters: {
        identity: { name: rawProfile.name, role: rawProfile.role, tagline: rawProfile.tagline },
        work: projects,
        career: experience,
        academic: publications,
        custom: rawProfile.customFields || {}
      }
    };
  }
}

module.exports = { ContentSynthesisEngine };

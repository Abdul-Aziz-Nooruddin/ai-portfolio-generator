/**
 * 🏛️ Project Quality Model (Phase 42)
 * Evaluates the authentic evidence depth of each project artifact:
 * MICRO_ARTIFACT -> COMPACT -> STANDARD -> DEEP_CASE_STUDY -> TECHNICAL_DOSSIER -> RESEARCH_ARTIFACT.
 * 
 * Invariant: Never force a sparse project into an artificial case study,
 * and never compress a deep architectural project into a tiny decorative card.
 */

class ProjectQualityModel {
  /**
   * Assesses project evidence depth and selects the most authentic presentational form
   * @param {Object} project - Project data object
   * @returns {Object} Quality assessment and recommended presentation strategy
   */
  static evaluateProject(project = {}) {
    const name = project.name || project.title || 'Untitled Project';
    const desc = project.desc || project.description || '';
    const architecture = project.architecture || project.systemDesign || '';
    const metrics = project.metrics || project.impact || '';
    const decisions = project.decisions || project.challenges || project.tradeoffs || '';
    const live = project.live || project.liveUrl || project.demo || project.url || '';
    const github = project.github || project.repoUrl || project.repo || '';
    const isResearch = Boolean(project.venue || project.doi || project.abstract);

    let depth = 'STANDARD';
    let recommendedStrategy = 'case-study-narrative';

    if (isResearch) {
      depth = 'RESEARCH_ARTIFACT';
      recommendedStrategy = 'academic-research-paper';
    } else if (architecture && metrics && decisions) {
      depth = 'TECHNICAL_DOSSIER';
      recommendedStrategy = 'technical-dossier';
    } else if (architecture) {
      depth = 'DEEP_CASE_STUDY';
      recommendedStrategy = 'case-study-narrative';
    } else if (metrics) {
      depth = 'COMPACT_METRICS';
      recommendedStrategy = 'compact-metrics-table';
    } else if (!architecture && !metrics && desc.length < 80) {
      depth = 'MICRO_ARTIFACT';
      recommendedStrategy = 'typographic-index-reveal';
    }

    return {
      name,
      depth,
      recommendedStrategy,
      hasLiveLink: Boolean(live),
      hasRepoLink: Boolean(github),
      hasMetrics: Boolean(metrics),
      hasArchitecture: Boolean(architecture),
      hasDecisions: Boolean(decisions),
      score: (architecture ? 30 : 0) + (metrics ? 25 : 0) + (decisions ? 20 : 0) + (live || github ? 15 : 0) + (desc.length > 50 ? 10 : 0)
    };
  }

  /**
   * Evaluates an entire suite of projects
   */
  static evaluateSuite(projects = []) {
    return (Array.isArray(projects) ? projects : []).map(p => this.evaluateProject(p));
  }
}

module.exports = { ProjectQualityModel };

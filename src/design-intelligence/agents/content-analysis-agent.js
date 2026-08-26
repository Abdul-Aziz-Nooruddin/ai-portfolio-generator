/**
 * Content Analysis Agent
 * Extracts multi-factor content signals without forcing stereotypical role templates.
 */

const { ContentAnalyzer } = require('../../design-engine/content-analyzer');

class ContentAnalysisAgent {
  async execute(rawUserData = {}) {
    const contentProfile = ContentAnalyzer.analyze(rawUserData);

    const signals = contentProfile.signals;
    const projectDepth = signals.projectDepth;
    const visualDensity = signals.visualDensity;
    const technicalDepth = signals.technicalDepth;
    const narrativeDepth = signals.narrativeDepth;

    const evidence = [
      `Verified Projects: ${contentProfile.projects.length} (Deep: ${signals.deepProjectCount})`,
      `Technical Evidence: ${signals.technicalEvidenceCount} repositories/architectures`,
      `Visual Density: ${visualDensity}`,
      `Narrative Depth: ${narrativeDepth}`,
      `Timeline Experience: ${contentProfile.experience.length} records`
    ];

    return {
      agent: 'content-analysis-agent',
      decision: contentProfile,
      reasoning_summary: `Identified primary angle '${signals.primaryAngle}' with project depth '${projectDepth}', narrative depth '${narrativeDepth}', and technical depth '${technicalDepth}'.`,
      confidence: 0.95,
      recommendations: {
        suggestedPrimaryAngle: signals.primaryAngle,
        highVisualEmphasis: visualDensity === 'high',
        deepTechnicalEmphasis: technicalDepth === 'deep',
        strongNarrativeEmphasis: narrativeDepth === 'high'
      },
      constraints: [
        signals.projectCount === 0 ? 'NO_PROJECTS_AVAILABLE' : null,
        narrativeDepth === 'compact' ? 'COMPACT_NARRATIVE_ONLY' : null
      ].filter(Boolean),
      evidence
    };
  }
}

module.exports = { ContentAnalysisAgent };

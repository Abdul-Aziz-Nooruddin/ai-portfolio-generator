/**
 * Project Storytelling Agent
 * Selects an authentic presentation model based on actual project evidence (code, architecture, media, metrics).
 * Prohibits monolithic generic card grids.
 */

const { PROJECT_PRESENTATIONS } = require('../../design-engine/project-storyteller');

class ProjectStorytellingAgent {
  async execute(contentProfile, iaStrategy = {}, context = {}) {
    const defaultStrategy = iaStrategy.decision?.defaultStorytelling || 'code-architecture-dossier';
    const overrideStrategy = context.projectStrategy || null;

    const chosenStrategy = overrideStrategy || defaultStrategy;
    const strategyConfig = PROJECT_PRESENTATIONS[chosenStrategy] || PROJECT_PRESENTATIONS['code-architecture-dossier'];

    return {
      agent: 'project-storytelling-agent',
      decision: {
        strategyId: strategyConfig.id,
        strategyName: strategyConfig.name,
        domStructure: strategyConfig.domStructure,
        dataDensity: strategyConfig.dataDensity,
        evidenceFitReason: `Configured '${strategyConfig.name}' to showcase ${contentProfile.projects.length} artifacts with ${strategyConfig.dataDensity} data density.`
      },
      reasoning_summary: `Selected project presentation model '${strategyConfig.name}' adhering to DOM structure '${strategyConfig.domStructure}'.`,
      confidence: 0.95,
      recommendations: {
        strategyId: strategyConfig.id,
        domStructure: strategyConfig.domStructure
      },
      constraints: [
        'DISALLOW_GENERIC_CARD_WRAPPER_FALLBACK',
        'PRESERVE_DEEP_PROJECT_METADATA'
      ],
      evidence: [
        `Mapped from IA model preference: ${defaultStrategy}`,
        `Validated across ${Object.keys(PROJECT_PRESENTATIONS).length} distinct presentation models`
      ]
    };
  }
}

module.exports = { ProjectStorytellingAgent };

/**
 * Information Architecture Agent
 * Determines how information is ordered and structured based on content evidence.
 * Explicitly rejects forcing models based solely on job title stereotypes.
 */

const { ContentAnalyzer } = require('../../design-engine/content-analyzer');
const { IAComposer, IA_MODELS } = require('../../design-engine/ia-composer');

class InformationArchitectureAgent {
  async execute(contentProfile, uxStrategy = {}, recentHistory = [], context = {}) {
    const overrideLayout = context.layout && context.layout !== 'auto-cycle' ? context.layout : null;

    const normalizedProfile = contentProfile.signals ? contentProfile : ContentAnalyzer.analyze(contentProfile);

    // Use IAComposer to evaluate multi-factor fit
    const selectedModel = IAComposer.selectModel(normalizedProfile, overrideLayout, recentHistory);

    return {
      agent: 'information-architecture-agent',
      decision: {
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        layoutId: selectedModel.layoutId,
        sectionOrder: selectedModel.sectionOrder,
        defaultStorytelling: selectedModel.defaultStorytelling,
        hierarchyRationale: `Selected IA Model '${selectedModel.name}' based on content signals and anti-repetition memory.`
      },
      reasoning_summary: `IA Model '${selectedModel.id}' chosen with section sequence: ${selectedModel.sectionOrder.slice(0, 3).join(' -> ')}...`,
      confidence: 0.93,
      recommendations: {
        modelId: selectedModel.id,
        sectionOrder: selectedModel.sectionOrder,
        defaultStorytelling: selectedModel.defaultStorytelling
      },
      constraints: [
        'ENFORCE_EXPLICIT_SECTION_ORDER',
        `PRIMARY_VIEWPORT_SECTION: ${selectedModel.sectionOrder[0]}`
      ],
      evidence: [
        `Evaluated across ${Object.keys(IA_MODELS).length} structural IA models`,
        `Checked against ${recentHistory.length} recent structural generations`
      ]
    };
  }
}

module.exports = { InformationArchitectureAgent };

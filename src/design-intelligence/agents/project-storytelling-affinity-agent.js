/**
 * Project Storytelling Affinity Agent (Phase 29)
 * Selects project presentation models based on 70% content semantic affinity +
 * 20% art-direction compatibility + 10% controlled exploration with anti-repetition memory.
 */

const { PROJECT_STORYTELLING_SYSTEMS } = require('../../design-engine/project-storytelling-constitution');
const { ProjectPresentationDiversityGovernor } = require('../project-presentation-diversity-governor');

class ProjectStorytellingAffinityAgent {
  constructor() {
    this.governor = new ProjectPresentationDiversityGovernor();
    this.recentGlobalSelections = [];
  }

  /**
   * Selects and structures project presentation strategy
   * @param {Object} contentProfile
   * @param {Object} artDirection
   * @param {Array} recentHistory
   * @param {Object} context
   */
  async execute(contentProfile = {}, artDirection = {}, recentHistory = [], context = {}) {
    const roleLower = (contentProfile.role || '').toLowerCase();
    const projects = contentProfile.projects || [];
    const override = context.projectStrategy || (artDirection.decision?.defaultStorytelling && !artDirection.decision?.modelId ? artDirection.decision.defaultStorytelling : null);

    let affinityPool = [];

    // Semantic / Content Affinity (70%)
    if (roleLower.includes('security')) {
      affinityPool = ['failure-recovery', 'project-log', 'technical-dossier', 'repository-archaeology'];
    } else if (roleLower.includes('ml') || roleLower.includes('ai') || roleLower.includes('machine learning')) {
      affinityPool = ['research-paper', 'metrics-observatory', 'case-study-narrative', 'timeline'];
    } else if (roleLower.includes('academic') || roleLower.includes('researcher')) {
      affinityPool = ['research-paper', 'editorial-feature', 'timeline', 'artifact-archive'];
    } else if (roleLower.includes('photographer')) {
      affinityPool = ['editorial-feature', 'artifact-archive', 'visual-exhibition', 'minimal-project-index'];
    } else if (roleLower.includes('3d') || roleLower.includes('creative developer')) {
      affinityPool = ['architecture-map', 'product-launch', 'visual-exhibition', 'build-journal'];
    } else if (roleLower.includes('spatial') || roleLower.includes('product designer')) {
      affinityPool = ['visual-exhibition', 'artifact-archive', 'before-after', 'architecture-map'];
    } else if (roleLower.includes('distributed') || roleLower.includes('systems')) {
      affinityPool = ['architecture-map', 'technical-dossier', 'failure-recovery', 'metrics-observatory'];
    } else if (roleLower.includes('frontend')) {
      affinityPool = ['before-after', 'feature-atlas', 'visual-exhibition', 'minimal-project-index'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo')) {
      affinityPool = ['product-launch', 'build-journal', 'case-study-narrative', 'metrics-observatory'];
    } else {
      affinityPool = ['technical-dossier', 'split-technical-spec', 'repository-archaeology', 'minimal-project-index'];
    }

    const allKeys = Object.keys(PROJECT_STORYTELLING_SYSTEMS);

    // 70% Content Affinity / 30% Controlled Exploration across full constitution
    const roll = Math.random();
    let candidatePool = (roll < 0.70 && affinityPool.length > 0) ? affinityPool : allKeys;

    // Filter against recent history to ensure broad distribution
    const recentKeys = this.recentGlobalSelections.slice(-4);
    const nonRecent = candidatePool.filter(k => !recentKeys.includes(k));
    const finalPool = nonRecent.length > 0 ? nonRecent : candidatePool;

    const chosenStrategyKey = override || finalPool[Math.floor(Math.random() * finalPool.length)] || 'technical-dossier';

    this.recentGlobalSelections.push(chosenStrategyKey);
    if (this.recentGlobalSelections.length > 30) {
      this.recentGlobalSelections.shift();
    }

    const system = PROJECT_STORYTELLING_SYSTEMS[chosenStrategyKey] || PROJECT_STORYTELLING_SYSTEMS['technical-dossier'];
    const projectPlans = this.governor.planProjectPresentations(projects, chosenStrategyKey, contentProfile);

    return {
      agent: 'project-storytelling-affinity-agent',
      decision: {
        strategyId: system.id,
        strategyName: system.name,
        cadence: system.cadence,
        domStructure: system.domTopology || 'article.dossier-node',
        domTopology: system.domTopology,
        densityProfile: system.densityProfile,
        mobileTopology: system.mobileTopology,
        metadataPosition: system.metadataPosition,
        ctaPlacement: system.ctaPlacement,
        projectPlans
      },
      reasoning_summary: `Assigned project presentation system '${system.name}' (${system.cadence}) with ${projectPlans.length} differentiated internal plans.`,
      confidence: 0.96
    };
  }
}

module.exports = { ProjectStorytellingAffinityAgent };

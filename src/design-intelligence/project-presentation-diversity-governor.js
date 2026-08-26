/**
 * Project Presentation Diversity Governor (Phase 29)
 * Governs both across-portfolio and within-portfolio project presentation diversity.
 * Prevents identical project card repetition and assigns differentiated presentation
 * topologies to multiple projects within a single portfolio.
 */

const { PROJECT_STORYTELLING_SYSTEMS } = require('../design-engine/project-storytelling-constitution');

class ProjectPresentationDiversityGovernor {
  constructor() {
    this.recentGlobalSelections = [];
  }

  /**
   * Plans presentation models for a list of projects within a single portfolio
   * @param {Array} projects - Raw project items
   * @param {string} primaryStrategyId - Main chosen storytelling strategy
   * @param {Object} contentProfile
   * @returns {Array<Object>} Per-project presentation configurations
   */
  planProjectPresentations(projects = [], primaryStrategyId = 'technical-dossier', contentProfile = {}) {
    if (!Array.isArray(projects) || projects.length === 0) {
      return [];
    }

    const allKeys = Object.keys(PROJECT_STORYTELLING_SYSTEMS);
    const assignedPlans = [];
    const usedStrategiesInPortfolio = new Set();

    projects.forEach((proj, idx) => {
      let chosenKey = primaryStrategyId;

      // Project 1 always anchors the primary strategy
      if (idx === 0) {
        chosenKey = primaryStrategyId;
      } else if (idx === 1 && projects.length >= 3) {
        // Project 2 receives complementary presentation (e.g. split spec, metrics table, or timeline)
        const complementaryPool = ['split-technical-spec', 'metrics-observatory', 'timeline', 'feature-atlas', 'before-after'];
        chosenKey = complementaryPool.find(k => k !== primaryStrategyId && !usedStrategiesInPortfolio.has(k)) || primaryStrategyId;
      } else if (idx >= 2 && projects.length >= 4) {
        // Project 3+ receives concise artifact format
        const compactPool = ['minimal-project-index', 'artifact-archive', 'project-log', 'repository-archaeology'];
        chosenKey = compactPool.find(k => !usedStrategiesInPortfolio.has(k)) || primaryStrategyId;
      }

      usedStrategiesInPortfolio.add(chosenKey);
      const system = PROJECT_STORYTELLING_SYSTEMS[chosenKey] || PROJECT_STORYTELLING_SYSTEMS['technical-dossier'];

      assignedPlans.push({
        projectIndex: idx,
        projectName: proj.name || `Project ${idx + 1}`,
        strategyId: system.id,
        name: system.name,
        cadence: system.cadence,
        domTopology: system.domTopology,
        densityProfile: system.densityProfile,
        mobileTopology: system.mobileTopology,
        metadataPosition: system.metadataPosition,
        ctaPlacement: system.ctaPlacement
      });
    });

    return assignedPlans;
  }

  /**
   * Evaluates within-portfolio project presentation collision
   * @param {Array<Object>} projectPlans
   * @returns {{ collisionRate: number, isDiverse: boolean }}
   */
  static evaluateWithinPortfolioCollision(projectPlans = []) {
    if (projectPlans.length <= 1) {
      return { collisionRate: 0, isDiverse: true };
    }

    let collisions = 0;
    const totalPairs = projectPlans.length - 1;

    for (let i = 0; i < projectPlans.length - 1; i++) {
      if (projectPlans[i].strategyId === projectPlans[i + 1].strategyId) {
        collisions++;
      }
    }

    const collisionRate = totalPairs > 0 ? (collisions / totalPairs) * 100 : 0;
    return {
      collisionRate,
      isDiverse: collisionRate <= 10.0
    };
  }
}

module.exports = { ProjectPresentationDiversityGovernor };

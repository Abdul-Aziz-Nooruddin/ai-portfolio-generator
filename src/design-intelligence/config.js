/**
 * Design Intelligence Ecosystem Configuration
 * Defines operational modes, agent switches, provider preferences, and validation thresholds.
 */

const config = {
  enabled: process.env.DESIGN_INTELLIGENCE_ENABLED !== 'false',
  agentRequired: process.env.DESIGN_AGENT_REQUIRED !== 'false',
  figmaEnabled: process.env.FIGMA_ENABLED !== 'false',
  designResearchEnabled: process.env.DESIGN_RESEARCH_ENABLED !== 'false',
  uxAgentEnabled: process.env.UX_AGENT_ENABLED !== 'false',
  motionAgentEnabled: process.env.MOTION_AGENT_ENABLED !== 'false',
  structuralMemoryEnabled: process.env.STRUCTURAL_MEMORY_ENABLED !== 'false',
  designCriticEnabled: process.env.DESIGN_CRITIC_ENABLED !== 'false',
  
  // Revision & Memory Parameters
  maxRevisionAttempts: parseInt(process.env.MAX_REVISION_ATTEMPTS, 10) || 3,
  memoryWindowSize: parseInt(process.env.MEMORY_WINDOW_SIZE, 10) || 50,
  
  // Performance & Payload Budgets
  performanceBudget: {
    maxHtmlSizeBytes: 350 * 1024,
    maxCssSizeBytes: 100 * 1024,
    maxJsSizeBytes: 200 * 1024,
    webglAllowed: true,
    maxThreeJsScenes: 1
  },

  // Diversity Thresholds
  diversityThresholds: {
    minStructuralDivergence: 0.65,
    maxRecentIdentityOverlap: 0.20
  }
};

module.exports = { config };

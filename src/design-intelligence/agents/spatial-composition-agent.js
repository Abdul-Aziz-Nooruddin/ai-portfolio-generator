/**
 * Spatial Composition Agent
 * Determines layout geometry, grid systems, whitespace distribution, and viewport behavior.
 * Decouples layout geometry from IA models via candidate pool scoring.
 */

const { LayoutGrammar, LAYOUT_GRAMMARS } = require('../../design-engine/layout-grammar');
const { CandidateDesignPool } = require('../candidate-design-pool');

class SpatialCompositionAgent {
  async execute(contentProfile, iaStrategy = {}, recentHistoryOrContext = [], context = {}) {
    const recentHistory = Array.isArray(recentHistoryOrContext) ? recentHistoryOrContext : [];
    const ctx = (recentHistoryOrContext && !Array.isArray(recentHistoryOrContext)) ? recentHistoryOrContext : context;

    const iaId = iaStrategy.decision?.modelId || iaStrategy.modelId || 'split-screen-dossier';
    const explicitLayoutId = ctx.layout || iaStrategy.decision?.layoutId || iaStrategy.layoutId;
    let layoutId = explicitLayoutId;
    
    if (!layoutId) {
      const compatibleLayouts = CandidateDesignPool.getCompatibleLayouts(iaId);
      const recentLayouts = recentHistory.map(h => h.layoutGrammar).filter(Boolean);
      const available = compatibleLayouts.filter(id => !recentLayouts.slice(-3).includes(id));
      const pool = available.length > 0 ? available : compatibleLayouts;
      layoutId = pool[Math.floor(Math.random() * pool.length)];
    }

    const grammar = LayoutGrammar.getGrammar(layoutId);

    const responsiveRules = [
      'Desktop: Strict CSS Grid/Flex geometry with responsive fluid clamp units',
      'Tablet: Break multi-column asymmetric spans into unified reading tracks',
      'Mobile: Linear scroll runway with full-width interactive cards and zero horizontal overflow'
    ];

    return {
      agent: 'spatial-composition-agent',
      decision: {
        layoutId: grammar.id,
        layoutName: grammar.name,
        geometryType: grammar.id,
        bodyClass: grammar.bodyClass,
        viewportBehavior: layoutId.includes('split') ? 'fixed-split-scroll' : (layoutId.includes('horizontal') ? 'snapped-x-axis' : 'fluid-y-axis'),
        responsiveRules
      },
      reasoning_summary: `Applied spatial layout grammar '${grammar.name}' for viewport behavior '${layoutId.includes('split') ? 'fixed-split-scroll' : 'fluid-y-axis'}'.`,
      confidence: 0.96,
      recommendations: {
        layoutId: grammar.id,
        bodyClass: grammar.bodyClass
      },
      constraints: [
        'PREVENT_HORIZONTAL_OVERFLOW_ON_MOBILE',
        'MAINTAIN_GEOMETRIC_ALIGNMENT'
      ],
      evidence: [
        `Decoupled selection from IA model: ${iaId}`,
        `Selected layout '${grammar.id}'`
      ]
    };
  }
}

module.exports = { SpatialCompositionAgent };

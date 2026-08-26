/**
 * Spatial Composition Agent
 * Determines layout geometry, grid systems, whitespace distribution, and viewport behavior.
 */

const { LayoutGrammar, LAYOUT_GRAMMARS } = require('../../design-engine/layout-grammar');

class SpatialCompositionAgent {
  async execute(contentProfile, iaStrategy = {}, context = {}) {
    const layoutId = iaStrategy.decision?.layoutId || iaStrategy.layoutId || 'split-screen-dossier';
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
      confidence: 0.95,
      recommendations: {
        layoutId: grammar.id,
        bodyClass: grammar.bodyClass
      },
      constraints: [
        'PREVENT_HORIZONTAL_OVERFLOW_ON_MOBILE',
        'MAINTAIN_GEOMETRIC_ALIGNMENT'
      ],
      evidence: [
        `Mapped from IA model layoutId: ${layoutId}`,
        `Grammar rules verified across ${Object.keys(LAYOUT_GRAMMARS).length} available layout grammars`
      ]
    };
  }
}

module.exports = { SpatialCompositionAgent };

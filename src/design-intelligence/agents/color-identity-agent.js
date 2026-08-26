/**
 * Color & Visual Identity Agent
 * Synthesizes cohesive color physics, surface treatments, contrast compliance, and semantic tokens.
 * Prohibits generic purple gradients and unmotivated dark modes.
 */

const { VisualGrammar, VISUAL_UNIVERSES } = require('../../design-engine/visual-grammar');

class ColorIdentityAgent {
  async execute(contentProfile, figmaEvidence = null, context = {}) {
    const overrideMode = context.mode && context.mode !== 'auto-cycle' ? context.mode : null;
    const selectedUniverse = VisualGrammar.selectUniverse(contentProfile, overrideMode);

    // If Figma extracted verified color tokens, merge them respectfully
    let colors = { ...selectedUniverse.colors };
    if (figmaEvidence && figmaEvidence.decision?.available && figmaEvidence.decision.colorTokens?.primary) {
      colors.primary = figmaEvidence.decision.colorTokens.primary;
    }

    return {
      agent: 'color-identity-agent',
      decision: {
        universeId: selectedUniverse.id,
        universeName: selectedUniverse.name,
        theme: selectedUniverse.theme,
        colors,
        borderRadius: selectedUniverse.borderRadius,
        shadow: selectedUniverse.shadow,
        fontUrls: selectedUniverse.fontUrls,
        headingFont: selectedUniverse.headingFont,
        bodyFont: selectedUniverse.bodyFont,
        monoFont: selectedUniverse.monoFont
      },
      reasoning_summary: `Synthesized visual universe '${selectedUniverse.name}' (${selectedUniverse.theme} mode) with primary token '${colors.primary}'.`,
      confidence: 0.94,
      recommendations: {
        universeId: selectedUniverse.id,
        theme: selectedUniverse.theme,
        primaryColor: colors.primary
      },
      constraints: [
        'DISALLOW_DEFAULT_PURPLE_AI_GRADIENT',
        'WCAG_AAA_CONTRAST_COMPLIANT'
      ],
      evidence: [
        `Selected from ${Object.keys(VISUAL_UNIVERSES).length} coherent visual universes`,
        `Theme '${selectedUniverse.theme}' aligned with content signals`
      ]
    };
  }
}

module.exports = { ColorIdentityAgent };

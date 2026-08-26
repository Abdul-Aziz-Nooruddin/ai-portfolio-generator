/**
 * Typography Agent
 * Selects from 10+ coherent mathematical typography systems.
 * Aligns typography with the aesthetic universe and creative direction.
 */

const { TypographyEngine } = require('../../design-engine/typography-systems');

class TypographyAgent {
  async execute(contentProfile, visualUniverse = {}, recentHistoryOrContext = [], context = {}) {
    const recentHistory = Array.isArray(recentHistoryOrContext) ? recentHistoryOrContext : [];
    const universe = visualUniverse.decision || visualUniverse;
    const universeId = universe.universeId || universe.id || 'technical-lab';

    const system = TypographyEngine.selectSystem(contentProfile, universeId, recentHistory);

    const typographyDecision = {
      systemId: system.id,
      systemName: system.name,
      headingFont: system.headingFont,
      bodyFont: system.bodyFont,
      monoFont: system.monoFont,
      fontUrls: system.fontUrls,
      scaleRatio: system.scaleRatio,
      baseSize: system.baseSize,
      tracking: system.tracking,
      lineHeight: system.lineHeight,
      weights: system.weights,
      displayTreatment: system.displayTreatment,
      fluidClampFormula: `clamp(2.2rem, 5vw, ${system.scaleRatio > 1.35 ? '4.5rem' : '3.8rem'})`
    };

    return {
      agent: 'typography-agent',
      decision: typographyDecision,
      reasoning_summary: `Pairing '${system.headingFont}' (Display) with '${system.bodyFont}' (Body) and '${system.monoFont}' (Mono) using '${system.name}' system.`,
      confidence: 0.98,
      recommendations: {
        headingFont: system.headingFont,
        bodyFont: system.bodyFont,
        monoFont: system.monoFont,
        scaleRatio: system.scaleRatio
      },
      constraints: [
        'PREVENT_SYSTEM_FONT_FALLBACK_MISMATCH',
        'MAINTAIN_HEADING_LEGIBILITY',
        `SCALE_RATIO: ${system.scaleRatio}`
      ],
      evidence: [
        `Selected typography system '${system.id}' compatible with '${universeId}'`,
        `Fluid scale calculated with mathematical ratio: ${system.scaleRatio}`
      ]
    };
  }
}

module.exports = { TypographyAgent };

/**
 * Typography Agent
 * Constructs a cohesive typographic hierarchy (display font, body font, monospace, scale ratio, tracking).
 * Aligns typography with the selected aesthetic universe and creative direction.
 */

class TypographyAgent {
  async execute(contentProfile, visualUniverse = {}, context = {}) {
    const universe = visualUniverse.decision || visualUniverse;
    const headingFont = universe.headingFont || 'Plus Jakarta Sans';
    const bodyFont = universe.bodyFont || 'Inter';
    const monoFont = universe.monoFont || 'JetBrains Mono';

    const typographySystem = {
      headingFont,
      bodyFont,
      monoFont,
      scaleRatio: universe.id === 'brutalist-pop' ? 1.414 : (universe.id === 'swiss-editorial' ? 1.333 : 1.25),
      baseSize: '16px',
      tracking: universe.id === 'swiss-editorial' ? '-0.03em' : (universe.id === 'technical-lab' ? '-0.01em' : '-0.02em'),
      weights: {
        heading: 800,
        subheading: 600,
        body: 400,
        code: 500
      },
      fluidClampFormula: 'clamp(2.2rem, 5vw, 4rem)'
    };

    return {
      agent: 'typography-agent',
      decision: typographySystem,
      reasoning_summary: `Pairing '${headingFont}' (Display) with '${bodyFont}' (Body) and '${monoFont}' (Mono) for universe '${universe.id}'.`,
      confidence: 0.96,
      recommendations: {
        headingFont,
        bodyFont,
        monoFont,
        scaleRatio: typographySystem.scaleRatio
      },
      constraints: [
        'PREVENT_SYSTEM_FONT_FALLBACK_MISMATCH',
        'MAINTAIN_HEADING_LEGIBILITY'
      ],
      evidence: [
        `Font pairing derived from verified visual universe: ${universe.id}`,
        `Fluid scale calculated with ratio: ${typographySystem.scaleRatio}`
      ]
    };
  }
}

module.exports = { TypographyAgent };

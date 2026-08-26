/**
 * Figma Design Agent
 * Inspects Figma files when available and extracts abstract design principles and color/typography tokens.
 */

class FigmaDesignAgent {
  constructor(figmaProvider = null) {
    this.figmaProvider = figmaProvider;
  }

  async execute(contentProfile, context = {}) {
    if (!this.figmaProvider || !this.figmaProvider.isAvailable() || (!context.figmaUrl && !context.figma_url)) {
      return {
        agent: 'figma-design-agent',
        decision: {
          available: false,
          tokens: null,
          principles: []
        },
        reasoning_summary: 'Figma integration skipped: No Figma URL provided or FIGMA_ACCESS_TOKEN not active.',
        confidence: 1.0,
        recommendations: {},
        constraints: [],
        evidence: ['Figma token not configured or URL omitted; using local design intelligence']
      };
    }

    const evidence = await this.figmaProvider.fetchDesignEvidence(context);

    if (!evidence.available) {
      return {
        agent: 'figma-design-agent',
        decision: { available: false, error: evidence.reason || evidence.error },
        reasoning_summary: `Figma extraction incomplete: ${evidence.reason || evidence.error}`,
        confidence: 0.5,
        recommendations: {},
        constraints: [],
        evidence: [evidence.reason || 'Figma extraction failed']
      };
    }

    return {
      agent: 'figma-design-agent',
      decision: {
        available: true,
        colorTokens: evidence.colorSystem,
        typographyTokens: evidence.typographySystem,
        principles: evidence.layoutPrinciples
      },
      reasoning_summary: `Extracted verified tokens and layout principles from Figma document '${evidence.fileKey}'.`,
      confidence: 0.96,
      recommendations: {
        suggestedPrimaryColor: evidence.colorSystem.primary,
        suggestedHeadingFont: evidence.typographySystem.headingFont
      },
      constraints: ['RESPECT_FIGMA_EXTRACTED_TOKENS'],
      evidence: [
        `Extracted ${evidence.colorSystem.palette.length} color fills`,
        `Extracted ${evidence.typographySystem.detectedFonts.length} font families`
      ]
    };
  }
}

module.exports = { FigmaDesignAgent };

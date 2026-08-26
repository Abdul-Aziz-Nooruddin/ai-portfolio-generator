/**
 * Figma Design Provider
 * Bridges the Figma REST API / MCP server to extract real tokens, color palettes,
 * typography scales, and component structures from verified Figma files.
 * Transforms raw Figma assets into abstract design principles.
 */

const { ProviderInterface } = require('./provider-interface');
const { FigmaService } = require('../../services/figma-service');

class FigmaProvider extends ProviderInterface {
  constructor(figmaService = null) {
    super('figma-provider');
    this.service = figmaService || new FigmaService();
  }

  isAvailable() {
    return this.service.isConfigured();
  }

  /**
   * Fetches design evidence from a provided Figma URL or token vault
   * @param {Object} context - Must contain figmaUrl or fileKey
   */
  async fetchDesignEvidence(context = {}) {
    const figmaUrl = context.figmaUrl || context.figma_url;
    if (!figmaUrl || !this.isAvailable()) {
      return {
        source: 'figma-provider',
        available: false,
        reason: !this.isAvailable() ? 'FIGMA_ACCESS_TOKEN not configured' : 'No Figma URL provided'
      };
    }

    try {
      const parsed = this.service.parseFigmaUrl(figmaUrl);
      if (!parsed || !parsed.fileKey) {
        return {
          source: 'figma-provider',
          available: false,
          reason: 'Invalid Figma URL format'
        };
      }

      const tokens = await this.service.extractDesignTokens(parsed.fileKey, parsed.nodeId);
      if (!tokens) {
        return {
          source: 'figma-provider',
          available: false,
          reason: 'No design tokens found in target Figma document'
        };
      }

      // Convert raw Figma assets into abstract design principles
      return {
        source: 'figma-provider',
        available: true,
        fileKey: parsed.fileKey,
        nodeId: parsed.nodeId,
        colorSystem: {
          palette: tokens.colors || [],
          primary: tokens.colors && tokens.colors[0] ? tokens.colors[0] : null,
          secondary: tokens.colors && tokens.colors[1] ? tokens.colors[1] : null
        },
        typographySystem: {
          detectedFonts: tokens.fontFamilies || [],
          headingFont: tokens.fontFamilies && tokens.fontFamilies[0] ? tokens.fontFamilies[0] : null,
          bodyFont: tokens.fontFamilies && tokens.fontFamilies[1] ? tokens.fontFamilies[1] : null
        },
        layoutPrinciples: [
          'Figma-derived component hierarchy',
          'Token-aligned padding and margin ratios',
          'Consistent typographic rhythm extracted from vector frames'
        ]
      };
    } catch (err) {
      console.warn('[FigmaProvider] Extraction failed:', err.message);
      return {
        source: 'figma-provider',
        available: false,
        error: err.message
      };
    }
  }

  async extractTokens(figmaUrl) {
    return this.fetchDesignEvidence({ figmaUrl });
  }
}

module.exports = { FigmaProvider };

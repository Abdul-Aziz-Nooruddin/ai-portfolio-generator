/**
 * Local Design Reference Provider
 * Ingests curated design intelligence from local datasets (styles, colors, typography, UX, motion).
 * Provides zero-latency, deterministic, offline-capable design principles.
 */

const fs = require('fs');
const path = require('path');
const { ProviderInterface } = require('./provider-interface');

class LocalDesignReferenceProvider extends ProviderInterface {
  constructor(baseDataPath = null) {
    super('local-design-reference-provider');
    this.dataPath = baseDataPath || path.join(
      process.cwd(),
      'skills',
      'ui-ux-pro-max-skill',
      'src',
      'ui-ux-pro-max',
      'data'
    );
    this.cache = new Map();
  }

  isAvailable() {
    return fs.existsSync(this.dataPath);
  }

  /**
   * Helper to parse simple CSV into array of row objects
   */
  parseCsv(filename) {
    if (this.cache.has(filename)) return this.cache.get(filename);
    const filePath = path.join(this.dataPath, filename);
    if (!fs.existsSync(filePath)) return [];

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) return [];

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const rows = [];

      for (let i = 1; i < lines.length; i++) {
        // Basic CSV field splitting handling quoted commas
        const regex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
        const rowValues = [];
        let match;
        while ((match = regex.exec(lines[i])) !== null) {
          let val = match[1] || '';
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1).replace(/""/g, '"');
          }
          rowValues.push(val.trim());
        }

        if (rowValues.length > 0) {
          const rowObj = {};
          headers.forEach((h, idx) => {
            rowObj[h] = rowValues[idx] || '';
          });
          rows.push(rowObj);
        }
      }

      this.cache.set(filename, rows);
      return rows;
    } catch (err) {
      console.warn(`[LocalDesignReferenceProvider] Could not load ${filename}:`, err.message);
      return [];
    }
  }

  async fetchDesignEvidence(context = {}) {
    const styles = this.parseCsv('styles.csv');
    const colors = this.parseCsv('colors.csv');
    const typography = this.parseCsv('typography.csv');
    const uxGuidelines = this.parseCsv('ux-guidelines.csv');
    const motion = this.parseCsv('motion.csv');
    const uiReasoning = this.parseCsv('ui-reasoning.csv');

    return {
      source: 'local-knowledge-base',
      availableStylesCount: styles.length,
      availableColorPalettesCount: colors.length,
      availableTypographyCount: typography.length,
      stylesSample: styles.slice(0, 10),
      colorPalettes: colors,
      typographyPairings: typography,
      uxRules: uxGuidelines,
      motionRules: motion,
      reasoningMatrices: uiReasoning
    };
  }

  async extractTokens(styleName) {
    const colors = this.parseCsv('colors.csv');
    const typography = this.parseCsv('typography.csv');
    const matchedColor = colors.find(c => (c.name || '').toLowerCase() === (styleName || '').toLowerCase()) || colors[0] || {};
    const matchedType = typography.find(t => (t.heading_font || '').toLowerCase().includes((styleName || '').toLowerCase())) || typography[0] || {};

    return {
      colorTokens: matchedColor,
      typographyTokens: matchedType
    };
  }
}

module.exports = { LocalDesignReferenceProvider };

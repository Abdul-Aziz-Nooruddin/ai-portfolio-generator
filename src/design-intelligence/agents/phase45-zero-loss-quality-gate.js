/**
 * 🏛️ Phase 45: Zero-Loss Evidence Quality Gate
 * Evaluates generated portfolios against the Zero-Loss Invariant:
 * Every non-empty user field, custom property, multi-source alternate, and verified artifact
 * must survive into the rendered HTML DOM with zero silent drops.
 * 
 * Fails closed if any evidence is dropped.
 */

const { EvidenceCompletenessScore } = require('../evidence-completeness-score');
const { RenderedQualityScore } = require('../rendered-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase45ZeroLossQualityGate {
  /**
   * Audits a cohort of generated sites against Phase 45 Zero-Loss standards
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Comprehensive evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minRetention = options.minRetention || 99.0;
    const maxSilentDrops = options.maxSilentDrops || 0;
    const minQuality = options.minQuality || 90.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 45 evaluation.'] };
    }

    // 1. Evidence Completeness Audit
    const completeness = EvidenceCompletenessScore.evaluateCohort(sites);

    // 2. Rendered Quality Audit
    const quality = RenderedQualityScore.evaluateCohort(sites);

    // 3. Perceptual Diversity Audit
    const diversity = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: 0.05,
      minMeanDistance: 80.0
    });

    // 4. Fabricated Facts Check
    let fabricatedCount = 0;
    sites.forEach(site => {
      const html = String(site.html || '').toLowerCase();
      if (html.includes('lorem ipsum') || html.includes('{{') || html.includes('}}') || html.includes('[object object]')) {
        fabricatedCount++;
      }
    });

    const reasons = [];
    let passed = true;

    if (completeness.meanRetention < minRetention) {
      passed = false;
      reasons.push(`Mean Evidence Retention ${completeness.meanRetention}% is below required ${minRetention}%`);
    }

    if (completeness.totalSilentDrops > maxSilentDrops) {
      passed = false;
      reasons.push(`Found ${completeness.totalSilentDrops} silent field drops across cohort`);
    }

    if (quality.meanQuality < minQuality) {
      passed = false;
      reasons.push(`Mean Rendered Quality ${quality.meanQuality} is below required ${minQuality}`);
    }

    if (fabricatedCount > 0) {
      passed = false;
      reasons.push(`Found ${fabricatedCount} sites with fabricated facts`);
    }

    return {
      passed,
      reasons,
      completeness: {
        meanRetention: completeness.meanRetention,
        totalSilentDrops: completeness.totalSilentDrops,
        pass: completeness.pass
      },
      quality: {
        meanQuality: quality.meanQuality,
        minQuality: quality.minQuality,
        maxQuality: quality.maxQuality
      },
      diversity: {
        collisionRate: diversity.collisionRate,
        meanDistance: diversity.meanDistance,
        distinctFingerprints: diversity.distinctFingerprints
      },
      truth: {
        fabricatedCount,
        pass: fabricatedCount === 0
      }
    };
  }
}

module.exports = { Phase45ZeroLossQualityGate };

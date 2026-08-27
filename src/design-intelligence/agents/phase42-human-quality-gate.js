/**
 * 🏛️ Phase 42: Human-Centered Design Quality Gate
 * Evaluates both human design excellence AND perceptual diversity.
 * 
 * Fails closed if:
 * - Human quality score < 85
 * - Content hierarchy < 80
 * - Readability < 85
 * - Mobile quality < 85
 * - Accessibility < 90
 * - Project discoverability < 80
 * - CTA clarity < 80
 * - Evidence retention < 98%
 * - Unsupported facts > 0
 * - Perceptual collision > 10%
 * - Mean perceptual distance < 75
 */

const { HumanQualityScore } = require('../human-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase42HumanQualityGate {
  /**
   * Comprehensive evaluation of portfolio cohort
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minMeanQuality = options.minMeanQuality || 85.0;
    const minIndividualQuality = options.minIndividualQuality || 78.0;
    const minHierarchy = options.minHierarchy || 80.0;
    const minReadability = options.minReadability || 85.0;
    const minMobile = options.minMobile || 85.0;
    const minA11y = options.minA11y || 90.0;
    const minDiscoverability = options.minDiscoverability || 80.0;
    const minCta = options.minCta || 80.0;
    const minEvidenceRetention = options.minEvidenceRetention || 98.0;
    const maxCollisionRate = options.maxCollisionRate || 10.0;
    const minMeanDistance = options.minMeanDistance || 75.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return {
        passed: false,
        reasons: ['No portfolios provided for evaluation.']
      };
    }

    // 1. Human Design Quality Evaluation
    const qualityAudit = HumanQualityScore.evaluateCohort(sites);

    // 2. Perceptual Diversity Evaluation
    const diversityAudit = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: maxCollisionRate / 100,
      minMeanDistance
    });

    // 3. Evidence Retention & Truth Verification
    let totalEvidencePassed = 0;
    let unsupportedFactsCount = 0;
    const topologyCounts = {};

    sites.forEach(site => {
      const html = site.html || '';
      const persona = site.persona || site.contentProfile || {};
      const name = persona.name || '';
      if (name && html.includes(name)) {
        totalEvidencePassed++;
      }
      if (html.toLowerCase().includes('lorem ipsum') || html.includes('{{') || html.includes('}}') || html.includes('[object Object]') || html.includes('>undefined<') || html.includes(': undefined;')) {
        unsupportedFactsCount++;
      }

      const fp = PerceptualDesignFingerprint.extractFingerprint(site);
      topologyCounts[fp.topology] = (topologyCounts[fp.topology] || 0) + 1;
    });

    const evidenceRetentionRate = Number(((totalEvidencePassed / sites.length) * 100).toFixed(2));
    const maxTopologyCount = Math.max(...Object.values(topologyCounts));
    const maxTopologyDominance = Number(((maxTopologyCount / sites.length) * 100).toFixed(2));

    const reasons = [];
    let passed = true;

    if (qualityAudit.meanQuality < minMeanQuality) {
      passed = false;
      reasons.push(`Mean Human Quality Score ${qualityAudit.meanQuality} is below required ${minMeanQuality}`);
    }

    if (qualityAudit.minQuality < minIndividualQuality) {
      passed = false;
      reasons.push(`Minimum individual quality score ${qualityAudit.minQuality} is below required ${minIndividualQuality}`);
    }

    if (qualityAudit.meanHierarchy < minHierarchy) {
      passed = false;
      reasons.push(`Content Hierarchy Score ${qualityAudit.meanHierarchy} is below required ${minHierarchy}`);
    }

    if (qualityAudit.meanReadability < minReadability) {
      passed = false;
      reasons.push(`Readability Score ${qualityAudit.meanReadability} is below required ${minReadability}`);
    }

    if (qualityAudit.meanMobile < minMobile) {
      passed = false;
      reasons.push(`Mobile Quality Score ${qualityAudit.meanMobile} is below required ${minMobile}`);
    }

    if (qualityAudit.meanA11y < minA11y) {
      passed = false;
      reasons.push(`Accessibility Score ${qualityAudit.meanA11y} is below required ${minA11y}`);
    }

    if (qualityAudit.meanDiscoverability < minDiscoverability) {
      passed = false;
      reasons.push(`Project Discoverability ${qualityAudit.meanDiscoverability} is below required ${minDiscoverability}`);
    }

    if (qualityAudit.meanCta < minCta) {
      passed = false;
      reasons.push(`CTA Clarity ${qualityAudit.meanCta} is below required ${minCta}`);
    }

    if (evidenceRetentionRate < minEvidenceRetention) {
      passed = false;
      reasons.push(`Evidence retention ${evidenceRetentionRate}% is below required ${minEvidenceRetention}%`);
    }

    if (unsupportedFactsCount > 0) {
      passed = false;
      reasons.push(`Found ${unsupportedFactsCount} sites with unsupported tokens or placeholder slop`);
    }

    if (diversityAudit.collisionRate > maxCollisionRate) {
      passed = false;
      reasons.push(`Perceptual collision rate ${diversityAudit.collisionRate}% exceeds threshold ${maxCollisionRate}%`);
    }

    if (diversityAudit.meanDistance < minMeanDistance) {
      passed = false;
      reasons.push(`Mean perceptual distance ${diversityAudit.meanDistance} is below required ${minMeanDistance}`);
    }

    return {
      passed,
      reasons,
      quality: {
        meanQuality: qualityAudit.meanQuality,
        minQuality: qualityAudit.minQuality,
        maxQuality: qualityAudit.maxQuality,
        meanHierarchy: qualityAudit.meanHierarchy,
        meanReadability: qualityAudit.meanReadability,
        meanMobile: qualityAudit.meanMobile,
        meanA11y: qualityAudit.meanA11y,
        meanDiscoverability: qualityAudit.meanDiscoverability,
        meanCta: qualityAudit.meanCta
      },
      diversity: {
        collisionRate: diversityAudit.collisionRate,
        meanDistance: diversityAudit.meanDistance,
        distinctFingerprints: diversityAudit.distinctFingerprints,
        maxTopologyDominance
      },
      truth: {
        evidenceRetentionRate,
        unsupportedFactsCount
      }
    };
  }
}

module.exports = { Phase42HumanQualityGate };

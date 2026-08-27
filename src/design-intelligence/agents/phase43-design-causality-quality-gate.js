/**
 * 🏛️ Phase 43: Intentional Art Direction & Design Causality Quality Gate
 * Evaluates whether generated portfolios exhibit genuine content-to-design causality,
 * zero hidden template skeleton dominance, coherent art direction, and zero fabricated facts.
 * 
 * Fails closed if any threshold is violated.
 */

const { ContentDesignCausality } = require('../content-design-causality');
const { TemplateSkeletonDetector } = require('../template-skeleton-detector');
const { DesignCoherenceModel } = require('../design-coherence-model');
const { HumanQualityScore } = require('../human-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase43DesignCausalityQualityGate {
  /**
   * Comprehensive audit of portfolio cohort against Phase 43 standards
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minCausality = options.minCausality || 85.0;
    const maxSkeletonCollision = options.maxSkeletonCollision || 5.0;
    const maxIncoherentCount = options.maxIncoherentCount || 0;
    const minHumanQuality = options.minHumanQuality || 90.0;
    const maxPerceptualCollision = options.maxPerceptualCollision || 5.0;
    const minMeanDistance = options.minMeanDistance || 80.0;
    const minEvidenceRetention = options.minEvidenceRetention || 98.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 43 evaluation.'] };
    }

    // 1. Content-to-Design Causality Audit
    const causalityAudit = ContentDesignCausality.evaluateBatch(sites);

    // 2. Anti-Template Skeleton Collision Audit
    const skeletonAudit = TemplateSkeletonDetector.evaluateCohort(sites);

    // 3. Design Coherence Audit
    const coherenceAudit = DesignCoherenceModel.evaluateCohort(sites);

    // 4. Human Quality Audit
    const qualityAudit = HumanQualityScore.evaluateCohort(sites);

    // 5. Perceptual Diversity Audit
    const diversityAudit = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: maxPerceptualCollision / 100,
      minMeanDistance
    });

    // 6. Truth & Fabricated Facts Audit
    let totalEvidenceRetained = 0;
    let fabricatedFactsCount = 0;

    sites.forEach(site => {
      const html = site.html || '';
      const persona = site.persona || site.contentProfile || {};
      const name = persona.name || '';
      if (name && html.includes(name)) {
        totalEvidenceRetained++;
      }
      if (html.toLowerCase().includes('lorem ipsum') || html.includes('{{') || html.includes('}}') || html.includes('[object Object]') || html.includes('>undefined<') || html.includes(': undefined;')) {
        fabricatedFactsCount++;
      }
    });

    const evidenceRetentionRate = Number(((totalEvidenceRetained / sites.length) * 100).toFixed(2));

    const reasons = [];
    let passed = true;

    if (causalityAudit.meanCausality < minCausality) {
      passed = false;
      reasons.push(`Mean Content-to-Design Causality ${causalityAudit.meanCausality}% is below required ${minCausality}%`);
    }

    if (skeletonAudit.collisionRate > maxSkeletonCollision) {
      passed = false;
      reasons.push(`Hidden Template Skeleton Collision Rate ${skeletonAudit.collisionRate}% exceeds threshold ${maxSkeletonCollision}%`);
    }

    if (coherenceAudit.incoherentCount > maxIncoherentCount) {
      passed = false;
      reasons.push(`Found ${coherenceAudit.incoherentCount} incoherent design combinations (Target: 0)`);
    }

    if (qualityAudit.meanQuality < minHumanQuality) {
      passed = false;
      reasons.push(`Mean Human Quality Score ${qualityAudit.meanQuality} is below required ${minHumanQuality}`);
    }

    if (fabricatedFactsCount > 0) {
      passed = false;
      reasons.push(`Found ${fabricatedFactsCount} sites with fabricated decorative facts or placeholder slop`);
    }

    if (evidenceRetentionRate < minEvidenceRetention) {
      passed = false;
      reasons.push(`Evidence retention ${evidenceRetentionRate}% is below required ${minEvidenceRetention}%`);
    }

    if (diversityAudit.collisionRate > maxPerceptualCollision) {
      passed = false;
      reasons.push(`Perceptual collision rate ${diversityAudit.collisionRate}% exceeds threshold ${maxPerceptualCollision}%`);
    }

    if (diversityAudit.meanDistance < minMeanDistance) {
      passed = false;
      reasons.push(`Mean perceptual distance ${diversityAudit.meanDistance} is below required ${minMeanDistance}`);
    }

    return {
      passed,
      reasons,
      causality: {
        meanCausality: causalityAudit.meanCausality
      },
      skeletons: {
        distinctSkeletons: skeletonAudit.distinctSkeletons,
        collisionRate: skeletonAudit.collisionRate,
        dominanceRate: skeletonAudit.dominanceRate
      },
      coherence: {
        incoherentCount: coherenceAudit.incoherentCount,
        meanCoherence: coherenceAudit.meanCoherence
      },
      quality: {
        meanQuality: qualityAudit.meanQuality,
        minQuality: qualityAudit.minQuality,
        maxQuality: qualityAudit.maxQuality
      },
      diversity: {
        collisionRate: diversityAudit.collisionRate,
        meanDistance: diversityAudit.meanDistance,
        distinctFingerprints: diversityAudit.distinctFingerprints
      },
      truth: {
        evidenceRetentionRate,
        fabricatedFactsCount
      }
    };
  }
}

module.exports = { Phase43DesignCausalityQualityGate };

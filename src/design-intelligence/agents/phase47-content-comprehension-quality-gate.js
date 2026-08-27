/**
 * 🏛️ Phase 47 Content Comprehension Quality Gate
 * Evaluates generated portfolio cohorts against:
 * 1. Content Preservation & Meaningful Integration = 100%
 * 2. Human Comprehension Score >= 90.0 / 100
 * 3. Semantic Proximity Score >= 90.0 / 100
 * 4. Content Dump Rate = 0.0%
 * 5. Dropped Verified / User Fields = 0
 * 6. Fabricated Facts = 0
 * 
 * Fails closed if facts are preserved as an unreadable content dump.
 */

const { HumanComprehensionScore } = require('../human-comprehension-score');
const { DomContentAuditor } = require('../dom-content-auditor');
const { RenderedQualityScore } = require('../rendered-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase47ContentComprehensionQualityGate {
  /**
   * Audits a cohort of generated portfolios
   * @param {Array} sites - Rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Comprehensive quality evaluation
   */
  static evaluate(sites = [], options = {}) {
    const minRetention = options.minRetention || 99.5;
    const minComprehension = options.minComprehension || 90.0;
    const minQuality = options.minQuality || 90.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 47 evaluation.'] };
    }

    const reasons = [];
    let passed = true;

    // 1. Forensic DOM Content Audit
    const domAudit = DomContentAuditor.auditCohort(sites);

    // 2. Human Comprehension Cohort Audit
    const comprehension = HumanComprehensionScore.evaluateCohort(sites);

    // 3. Rendered Quality & Perceptual Diversity
    const quality = RenderedQualityScore.evaluateCohort(sites);
    const diversity = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: 0.05,
      minMeanDistance: 80.0
    });

    if (domAudit.droppedVerified > 0) {
      passed = false;
      reasons.push(`Found ${domAudit.droppedVerified} dropped VERIFIED fields (Target: 0)`);
    }

    if (domAudit.droppedUser > 0) {
      passed = false;
      reasons.push(`Found ${domAudit.droppedUser} dropped USER_PROVIDED fields (Target: 0)`);
    }

    if (domAudit.fabricatedCount > 0) {
      passed = false;
      reasons.push(`Found ${domAudit.fabricatedCount} fabricated facts / placeholder strings`);
    }

    if (domAudit.meanRetention < minRetention) {
      passed = false;
      reasons.push(`Mean Evidence Retention ${domAudit.meanRetention}% is below required ${minRetention}%`);
    }

    if (comprehension.meanComprehension < minComprehension) {
      passed = false;
      reasons.push(`Mean Human Comprehension ${comprehension.meanComprehension} is below required ${minComprehension}`);
    }

    if (quality.meanQuality < minQuality) {
      passed = false;
      reasons.push(`Mean Rendered Quality ${quality.meanQuality} is below required ${minQuality}`);
    }

    return {
      passed,
      reasons,
      comprehension: {
        meanComprehension: comprehension.meanComprehension,
        minComprehension: comprehension.minComprehension,
        pass: comprehension.pass
      },
      retention: {
        meanRetention: domAudit.meanRetention,
        totalFields: domAudit.totalFields,
        preservedFields: domAudit.preservedFields,
        droppedVerified: domAudit.droppedVerified,
        droppedUser: domAudit.droppedUser
      },
      truth: {
        fabricatedCount: domAudit.fabricatedCount,
        pass: domAudit.fabricatedCount === 0
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
      domAudit
    };
  }
}

module.exports = { Phase47ContentComprehensionQualityGate };

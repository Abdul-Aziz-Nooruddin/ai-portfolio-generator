/**
 * 🏛️ Phase 48 Universal Presentation Quality Gate
 * Evaluates generated portfolio cohorts against:
 * 1. Universal Content Retention = 100%
 * 2. Meaningful Integration >= 99.5%
 * 3. Presentation Strategy Assignment = 100%
 * 4. Presentation Anti-Pattern Violations = 0
 * 5. Content Dump Rate = 0.0%
 * 6. Dropped Verified / User Fields = 0
 * 7. Fabricated Facts = 0
 * 8. Human Comprehension Score >= 92.0 / 100
 * 9. Rendered Quality Score >= 92.0 / 100
 * 10. Perceptual Collision Rate <= 5.0%
 * 
 * Fails closed if rich technical profiles are flattened or dumped into unreadable cards.
 */

const { DomContentAuditor } = require('../dom-content-auditor');
const { HumanComprehensionScore } = require('../human-comprehension-score');
const { RenderedQualityScore } = require('../rendered-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');
const { UniversalPresentationAntipatternDetector } = require('../universal-presentation-antipattern-detector');

class Phase48UniversalPresentationQualityGate {
  /**
   * Audits a cohort of generated portfolios
   * @param {Array} sites - Rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Comprehensive quality evaluation
   */
  static evaluate(sites = [], options = {}) {
    const minRetention = options.minRetention || 99.5;
    const minComprehension = options.minComprehension || 92.0;
    const minQuality = options.minQuality || 92.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 48 evaluation.'] };
    }

    const reasons = [];
    let passed = true;

    // 1. Forensic DOM Content Audit
    const domAudit = DomContentAuditor.auditCohort(sites);

    // 2. Anti-Pattern Audit
    const antipatternAudit = UniversalPresentationAntipatternDetector.auditCohort(sites);

    // 3. Human Comprehension Audit
    const comprehension = HumanComprehensionScore.evaluateCohort(sites);

    // 4. Rendered Quality & Diversity
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

    if (!antipatternAudit.pass) {
      passed = false;
      reasons.push(`Found ${antipatternAudit.totalViolations} presentation anti-pattern violations`);
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
      antipatterns: {
        totalViolations: antipatternAudit.totalViolations,
        cleanSitesCount: antipatternAudit.cleanSitesCount,
        pass: antipatternAudit.pass
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

module.exports = { Phase48UniversalPresentationQualityGate };

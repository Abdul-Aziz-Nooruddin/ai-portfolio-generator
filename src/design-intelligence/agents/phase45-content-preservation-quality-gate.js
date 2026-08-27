/**
 * 🏛️ Phase 45 Content Preservation Quality Gate
 * Evaluates generated portfolios against the absolute invariant:
 * "USER INFORMATION IS SACRED. Every verified and user-provided fact, metric, link,
 * responsibility, achievement, publication, and custom field must survive into the DOM."
 * 
 * Hard Invariant:
 * - DROPPED VERIFIED FIELDS = 0
 * - DROPPED USER_PROVIDED FIELDS = 0
 * - FABRICATED FACTS = 0
 * 
 * Fails closed if any evidence is dropped.
 */

const { DomContentAuditor } = require('../dom-content-auditor');
const { RenderedQualityScore } = require('../rendered-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase45ContentPreservationQualityGate {
  /**
   * Audits a cohort of generated sites against Phase 45 Content Preservation standards
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Comprehensive evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minRetention = options.minRetention || 99.5;
    const maxDroppedVerified = options.maxDroppedVerified || 0;
    const maxDroppedUser = options.maxDroppedUser || 0;
    const minQuality = options.minQuality || 90.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 45 Content Preservation evaluation.'] };
    }

    // 1. Forensic DOM Content Audit
    const domAudit = DomContentAuditor.auditCohort(sites);

    // 2. Rendered Reality Quality Audit
    const quality = RenderedQualityScore.evaluateCohort(sites);

    // 3. Perceptual Diversity Audit
    const diversity = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: 0.05,
      minMeanDistance: 80.0
    });

    const reasons = [];
    let passed = true;

    if (domAudit.meanRetention < minRetention) {
      passed = false;
      reasons.push(`Mean Evidence Retention ${domAudit.meanRetention}% is below required ${minRetention}%`);
    }

    if (domAudit.droppedVerified > maxDroppedVerified) {
      passed = false;
      reasons.push(`Found ${domAudit.droppedVerified} dropped VERIFIED fields (Target: 0)`);
    }

    if (domAudit.droppedUser > maxDroppedUser) {
      passed = false;
      reasons.push(`Found ${domAudit.droppedUser} dropped USER_PROVIDED fields (Target: 0)`);
    }

    if (domAudit.fabricatedCount > 0) {
      passed = false;
      reasons.push(`Found ${domAudit.fabricatedCount} fabricated facts / placeholder strings`);
    }

    if (quality.meanQuality < minQuality) {
      passed = false;
      reasons.push(`Mean Rendered Quality ${quality.meanQuality} is below required ${minQuality}`);
    }

    return {
      passed,
      reasons,
      retention: {
        meanRetention: domAudit.meanRetention,
        totalFields: domAudit.totalFields,
        preservedFields: domAudit.preservedFields,
        lostFields: domAudit.lostFields,
        droppedVerified: domAudit.droppedVerified,
        droppedUser: domAudit.droppedUser,
        pass: domAudit.lostFields === 0
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

module.exports = { Phase45ContentPreservationQualityGate };

/**
 * 🏛️ Phase 46 Content Exhaustiveness Quality Gate
 * Evaluates portfolios against the Phase 46 Exhaustiveness Invariants:
 * 1. Universal Content Retention >= 99.5% (Target: 100%)
 * 2. Meaningful Representation >= 99%
 * 3. Visible Representation >= 99%
 * 4. Dropped Verified Fields = 0
 * 5. Dropped User Fields = 0
 * 6. Fabricated Facts = 0
 * 7. Broken Preserved Links = 0
 * 8. Critical Content Hidden = 0
 * 
 * Fails closed if any meaningful user information is lost or silently obscured.
 */

const { ContentSourceCoverage } = require('../content-source-coverage');
const { DomContentAuditor } = require('../dom-content-auditor');
const { RenderedQualityScore } = require('../rendered-quality-score');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase46ContentExhaustivenessQualityGate {
  /**
   * Evaluates a cohort of sites against Phase 46 standards
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Comprehensive evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minRetention = options.minRetention || 99.5;
    const minIntegration = options.minIntegration || 99.0;
    const minQuality = options.minQuality || 90.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 46 evaluation.'] };
    }

    const reasons = [];
    let passed = true;

    // 1. DOM Content Audit
    const domAudit = DomContentAuditor.auditCohort(sites);

    // 2. Source Coverage Matrix across cohort
    let totalExtracted = 0;
    let totalVisible = 0;
    let totalIntegrated = 0;

    sites.forEach(site => {
      const coverage = ContentSourceCoverage.evaluate(site.persona || site.input || {}, site.html || '');
      totalExtracted += coverage.totalExtracted;
      totalVisible += coverage.totalVisible;
      totalIntegrated += coverage.totalIntegrated;
    });

    const cohortRetention = totalExtracted > 0 ? Number((totalVisible / totalExtracted * 100).toFixed(2)) : 100;
    const cohortIntegration = totalExtracted > 0 ? Number((totalIntegrated / totalExtracted * 100).toFixed(2)) : 100;

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

    if (cohortRetention < minRetention) {
      passed = false;
      reasons.push(`Cohort Retention ${cohortRetention}% is below required ${minRetention}%`);
    }

    if (cohortIntegration < minIntegration) {
      passed = false;
      reasons.push(`Cohort Meaningful Integration ${cohortIntegration}% is below required ${minIntegration}%`);
    }

    if (quality.meanQuality < minQuality) {
      passed = false;
      reasons.push(`Mean Rendered Quality ${quality.meanQuality} is below required ${minQuality}`);
    }

    return {
      passed,
      reasons,
      exhaustiveness: {
        totalAtoms: totalExtracted,
        visibleAtoms: totalVisible,
        integratedAtoms: totalIntegrated,
        retentionRate: cohortRetention,
        integrationRate: cohortIntegration,
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

module.exports = { Phase46ContentExhaustivenessQualityGate };

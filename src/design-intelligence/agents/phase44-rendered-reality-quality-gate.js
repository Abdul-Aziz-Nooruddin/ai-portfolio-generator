/**
 * 🏛️ Phase 44: Rendered Reality Quality Gate
 * Evaluates the physical browser-rendered output against human perception,
 * component diversity, visual rhythm, above-fold clarity, accessibility, and template smell standards.
 * 
 * Fails closed if any threshold is violated.
 */

const { RenderedQualityScore } = require('../rendered-quality-score');
const { ComponentConvergenceDetector } = require('../component-convergence-detector');
const { VisualRhythmAnalyzer } = require('../visual-rhythm-analyzer');
const { AboveFoldAnalyzer } = require('../above-fold-analyzer');
const { ContentSpaceCausality } = require('../content-space-causality');
const { ContentOverloadDetector } = require('../content-overload-detector');
const { AiTemplateSmellDetector } = require('../ai-template-smell-detector');
const { AccessibilityForensic } = require('../accessibility-forensic');
const { ResponsiveRealityGate } = require('../responsive-reality-gate');
const { ContentDesignCausality } = require('../content-design-causality');
const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');

class Phase44RenderedRealityQualityGate {
  /**
   * Evaluates a cohort of rendered sites against Phase 44 standards
   * @param {Array} sites - Array of rendered site objects
   * @param {Object} options - Threshold overrides
   * @returns {Object} Evaluation report
   */
  static evaluate(sites = [], options = {}) {
    const minMeanQuality = options.minMeanQuality || 90.0;
    const minIndividualQuality = options.minIndividualQuality || 80.0;
    const minAboveFold = options.minAboveFold || 90.0;
    const minA11y = options.minA11y || 95.0;
    const maxComponentCollision = options.maxComponentCollision || 15.0;
    const maxTemplateSmell = options.maxTemplateSmell || 10.0;
    const maxContentOverload = options.maxContentOverload || 5.0;
    const maxPerceptualCollision = options.maxPerceptualCollision || 5.0;
    const minMeanDistance = options.minMeanDistance || 80.0;
    const minCausality = options.minCausality || 90.0;
    const minSpaceCausality = options.minSpaceCausality || 85.0;
    const minRhythm = options.minRhythm || 85.0;
    const minEvidenceRetention = options.minEvidenceRetention || 98.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return { passed: false, reasons: ['No sites provided for Phase 44 evaluation.'] };
    }

    // 1. Rendered Quality Audit
    const qualityAudit = RenderedQualityScore.evaluateCohort(sites);

    // 2. Component Convergence Audit
    const componentAudit = ComponentConvergenceDetector.evaluateCohort(sites);

    // 3. Visual Rhythm Audit
    const rhythmAudit = VisualRhythmAnalyzer.evaluateCohort(sites);

    // 4. Above-Fold Audit
    const foldAudit = AboveFoldAnalyzer.evaluateCohort(sites);

    // 5. Content-to-Space Causality Audit
    const spaceCausalityAudit = ContentSpaceCausality.evaluateCohort(sites);

    // 6. Content Overload Audit
    const overloadAudit = ContentOverloadDetector.evaluateCohort(sites);

    // 7. AI Template Smell Audit
    const smellAudit = AiTemplateSmellDetector.evaluateCohort(sites);

    // 8. Accessibility Audit
    const a11yAudit = AccessibilityForensic.evaluateCohort(sites);

    // 9. Responsive Mobile Audit
    const mobileAudit = ResponsiveRealityGate.evaluateCohort(sites);

    // 10. Content-to-Design Causality Audit
    const causalityAudit = ContentDesignCausality.evaluateBatch(sites);

    // 11. Perceptual Diversity Audit
    const diversityAudit = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: maxPerceptualCollision / 100,
      minMeanDistance
    });

    // 12. Truth & Evidence Retention
    let totalEvidenceRetained = 0;
    let fabricatedFactsCount = 0;

    sites.forEach(site => {
      const html = site.html || '';
      const persona = site.persona || site.contentProfile || {};
      const name = persona.name || '';
      if (name && html.includes(name)) totalEvidenceRetained++;
      if (html.toLowerCase().includes('lorem ipsum') || html.includes('{{') || html.includes('}}') || html.includes('[object Object]')) {
        fabricatedFactsCount++;
      }
    });

    const evidenceRetentionRate = Number(((totalEvidenceRetained / sites.length) * 100).toFixed(2));

    const reasons = [];
    let passed = true;

    if (qualityAudit.meanQuality < minMeanQuality) {
      passed = false;
      reasons.push(`Mean Rendered Quality ${qualityAudit.meanQuality} is below required ${minMeanQuality}`);
    }

    if (qualityAudit.minQuality < minIndividualQuality) {
      passed = false;
      reasons.push(`Minimum individual quality ${qualityAudit.minQuality} is below required ${minIndividualQuality}`);
    }

    if (foldAudit.meanAboveFold < minAboveFold) {
      passed = false;
      reasons.push(`Mean Above-the-Fold Score ${foldAudit.meanAboveFold} is below required ${minAboveFold}`);
    }

    if (a11yAudit.meanAccessibility < minA11y) {
      passed = false;
      reasons.push(`Mean Accessibility Score ${a11yAudit.meanAccessibility} is below required ${minA11y}`);
    }

    if (componentAudit.componentCollisionRate > maxComponentCollision) {
      passed = false;
      reasons.push(`Component Collision Rate ${componentAudit.componentCollisionRate}% exceeds threshold ${maxComponentCollision}%`);
    }

    if (smellAudit.smellRate > maxTemplateSmell) {
      passed = false;
      reasons.push(`AI Template Smell Rate ${smellAudit.smellRate}% exceeds threshold ${maxTemplateSmell}%`);
    }

    if (overloadAudit.overloadRate > maxContentOverload) {
      passed = false;
      reasons.push(`Content Overload Rate ${overloadAudit.overloadRate}% exceeds threshold ${maxContentOverload}%`);
    }

    if (mobileAudit.mobileFailureCount > 0) {
      passed = false;
      reasons.push(`Found ${mobileAudit.mobileFailureCount} mobile layout safety failures`);
    }

    if (causalityAudit.meanCausality < minCausality) {
      passed = false;
      reasons.push(`Content-to-Design Causality ${causalityAudit.meanCausality}% is below required ${minCausality}%`);
    }

    if (spaceCausalityAudit.meanSpaceCausality < minSpaceCausality) {
      passed = false;
      reasons.push(`Content-to-Space Causality ${spaceCausalityAudit.meanSpaceCausality}% is below required ${minSpaceCausality}%`);
    }

    if (rhythmAudit.meanRhythm < minRhythm) {
      passed = false;
      reasons.push(`Visual Rhythm Quality ${rhythmAudit.meanRhythm}% is below required ${minRhythm}%`);
    }

    if (evidenceRetentionRate < minEvidenceRetention) {
      passed = false;
      reasons.push(`Evidence Retention Rate ${evidenceRetentionRate}% is below required ${minEvidenceRetention}%`);
    }

    if (fabricatedFactsCount > 0) {
      passed = false;
      reasons.push(`Found ${fabricatedFactsCount} sites with fabricated decorative facts`);
    }

    return {
      passed,
      reasons,
      quality: {
        meanQuality: qualityAudit.meanQuality,
        minQuality: qualityAudit.minQuality,
        maxQuality: qualityAudit.maxQuality,
        meanAboveFold: foldAudit.meanAboveFold,
        meanAccessibility: a11yAudit.meanAccessibility,
        meanMobile: qualityAudit.meanMobile
      },
      components: {
        componentCollisionRate: componentAudit.componentCollisionRate,
        distinctComponents: componentAudit.distinctComponents
      },
      rhythm: {
        meanRhythm: rhythmAudit.meanRhythm
      },
      causality: {
        meanDesignCausality: causalityAudit.meanCausality,
        meanSpaceCausality: spaceCausalityAudit.meanSpaceCausality
      },
      cleanliness: {
        smellRate: smellAudit.smellRate,
        overloadRate: overloadAudit.overloadRate,
        mobileFailureCount: mobileAudit.mobileFailureCount
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

module.exports = { Phase44RenderedRealityQualityGate };

/**
 * Design Quality Gate (Phase 22)
 * Fail-closed quality enforcement layer ensuring diversity never overrides visual excellence.
 * Evaluates candidates against BrowserVisualQualityAgent, anti-ugly rules, and coherence metrics.
 */

const { BrowserVisualQualityAgent } = require('./browser-visual-quality-agent');
const { PerceptualDesignAuditor } = require('./perceptual-design-auditor');

class DesignQualityGate {
  /**
   * Evaluates a candidate site generation
   * @param {Object} site - Rendered site { html, css, js, designBrief, designBlueprint }
   * @param {Object} contentProfile - Profile data
   * @returns {Object} { passed: boolean, qualityScore: number, reasons: Array<string> }
   */
  static evaluate(site = {}, contentProfile = {}) {
    const reasons = [];

    // 1. Browser Visual Quality Audit
    const visualAudit = BrowserVisualQualityAgent.audit(site, contentProfile);
    if (!visualAudit.isAccepted) {
      reasons.push(`Visual quality score ${visualAudit.qualityScore}/100 is below the 85 threshold.`);
      for (const finding of visualAudit.findings) {
        if (finding.severity === 'CRITICAL' || finding.severity === 'HIGH') {
          reasons.push(`[${finding.severity}] ${finding.rule}: ${finding.desc}`);
        }
      }
    }

    // 2. Coherence Analysis
    const coherence = BrowserVisualQualityAgent.evaluateCoherence(site.designBlueprint || {});
    if (!coherence.isCoherent) {
      reasons.push(`Design coherence penalty: ${coherence.clashingCombinations.join(', ')}`);
    }

    // 3. Perceptual First Impression Check
    const perceptualAudit = PerceptualDesignAuditor.audit(site);
    if (perceptualAudit.firstImpressionScore < 8.0) {
      reasons.push(`First impression score ${perceptualAudit.firstImpressionScore}/10 is below the 8.0 threshold.`);
    }

    // 4. Zero Generic Card Guarantee
    if (!perceptualAudit.hasZeroGenericCards) {
      reasons.push('Detected prohibited generic card fallback.');
    }

    const passed = reasons.length === 0;

    return {
      passed,
      qualityScore: visualAudit.qualityScore,
      coherenceScore: coherence.coherenceScore,
      firstImpressionScore: perceptualAudit.firstImpressionScore,
      reasons,
      visualAudit
    };
  }
}

module.exports = { DesignQualityGate };

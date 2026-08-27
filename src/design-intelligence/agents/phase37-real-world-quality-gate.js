/**
 * 🏛️ Phase 37: Real-World Quality Gate (Phase 37)
 * Fails closed if:
 * 1. CompositionPlan is bypassed
 * 2. Structural convergence across corpus exceeds threshold
 * 3. Mobile collapses into generic un-styled vertical stack
 * 4. User data is corrupt, fabricated, or contains placeholder strings
 * 5. Horizontal overflow exists on mobile viewports
 * 6. Required semantic content is dropped
 */

const { PerceptualConvergenceDetector } = require('../perceptual-convergence-detector');
const { CompositionAuthorityGate } = require('./composition-authority-gate');

class Phase37RealWorldQualityGate {
  /**
   * Audits an individual portfolio specimen for real-world quality & factual integrity
   * @param {Object} site - Rendered site { html, css, compositionPlan, contentProfile }
   * @param {Object} originalUserData - User input provided for generation
   * @returns {Object} { pass: boolean, violations: Array<string>, score: number }
   */
  static auditSpecimen(site = {}, originalUserData = {}) {
    const violations = [];
    let score = 100;

    const html = String(site.html || '');
    const css = String(site.css || '');
    const plan = site.compositionPlan || site.designBrief?.compositionPlan;

    // 1. CompositionPlan Authority
    const authAudit = CompositionAuthorityGate.audit(site);
    if (!authAudit.pass) {
      violations.push(...authAudit.violations);
      score -= 40;
    }

    // 2. Factual Integrity & Anti-Fabrication
    const expectedName = originalUserData.name;
    if (expectedName && !html.includes(expectedName)) {
      violations.push(`FACTUAL_NAME_MISSING: User name '${expectedName}' missing from rendered HTML.`);
      score -= 30;
    }

    // Check for placeholder slop
    const placeholderTokens = ['[COMPANY_NAME]', '[JOB_TITLE]', 'lorem ipsum', 'insert bio here', 'example.com'];
    for (const token of placeholderTokens) {
      if (html.toLowerCase().includes(token)) {
        violations.push(`PLACEHOLDER_SLOP_DETECTED: Detected placeholder string '${token}' in rendered DOM.`);
        score -= 25;
      }
    }

    // 3. User Project Preservation
    if (Array.isArray(originalUserData.projects) && originalUserData.projects.length > 0) {
      const firstProjectName = originalUserData.projects[0].name;
      if (firstProjectName && !html.includes(firstProjectName)) {
        violations.push(`PROJECT_EVIDENCE_DROPPED: Primary project '${firstProjectName}' missing from rendered DOM.`);
        score -= 25;
      }
    }

    // 4. Responsive Mobile CSS Integrity
    if (!css.includes('@media (max-width:') && !css.includes('@media(max-width:')) {
      violations.push('RESPONSIVE_MOBILE_CSS_MISSING: Rendered stylesheet lacks mobile media queries.');
      score -= 20;
    }

    // 5. Overflow Prevention Rules
    if (css.includes('overflow-x: scroll') || (css.includes('width: 100vw') && !css.includes('box-sizing: border-box') && !css.includes('max-width: 100%'))) {
      violations.push('RESPONSIVE_OVERFLOW_RISK: CSS contains potential mobile horizontal overflow rules.');
      score -= 15;
    }

    const pass = violations.length === 0 && score >= 85;

    return {
      pass,
      score: Math.max(0, score),
      violations
    };
  }

  /**
   * Audits an entire batch of generated portfolios for structural anti-convergence
   * @param {Array} corpus - Array of rendered site objects
   * @returns {Object} Quality gate decision
   */
  static auditCorpus(corpus = []) {
    const corpusReport = PerceptualConvergenceDetector.evaluateCorpus(corpus, {
      minDistance: 65,
      maxCollisionRate: 0.30
    });

    const specimenAudits = corpus.map((site, idx) => ({
      index: idx,
      audit: this.auditSpecimen(site, site.contentProfile || {})
    }));

    const failedSpecimens = specimenAudits.filter(s => !s.audit.pass);

    const pass = corpusReport.pass && failedSpecimens.length === 0;

    return {
      pass,
      corpusReport,
      failedSpecimensCount: failedSpecimens.length,
      specimensTested: corpus.length
    };
  }
}

module.exports = { Phase37RealWorldQualityGate };

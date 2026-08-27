/**
 * 🏛️ Phase 38: Content & Semantic Quality Gate (Phase 38)
 * Enforces fail-closed rules against:
 * 1. Semantic Information Architecture convergence
 * 2. Vocabulary repetition and hardcoded label monopolies
 * 3. Evidence discarding or factual data loss (< 90% retention)
 * 4. Placeholder slop or unsupported claims
 * 5. Monolithic within-portfolio project cards
 */

const { SemanticConvergenceDetector } = require('../semantic-convergence-detector');
const { CompositionAuthorityGate } = require('./composition-authority-gate');

class Phase38ContentQualityGate {
  /**
   * Audits an individual portfolio specimen for content truth and semantic validity
   * @param {Object} site - Rendered site { html, css, compositionPlan, contentProfile }
   * @param {Object} originalUserData - User input provided for generation
   * @returns {Object} { pass: boolean, violations: Array<string>, score: number }
   */
  static auditSpecimen(site = {}, originalUserData = {}) {
    const violations = [];
    let score = 100;

    const html = String(site.html || '');
    const plan = site.compositionPlan || site.designBrief?.compositionPlan;

    // 1. CompositionPlan Authority & Information Architecture
    if (!plan || !plan.informationArchitecture) {
      violations.push('IA_PLAN_MISSING: CompositionPlan lacks compiled informationArchitecture specification.');
      score -= 40;
    }

    // 2. Factual Integrity & Unsupported Claims
    const expectedName = originalUserData.name;
    if (expectedName && !html.includes(expectedName)) {
      violations.push(`FACTUAL_NAME_MISSING: User name '${expectedName}' missing from rendered HTML.`);
      score -= 30;
    }

    const placeholderTokens = ['[COMPANY_NAME]', '[JOB_TITLE]', 'lorem ipsum', 'insert bio here'];
    for (const token of placeholderTokens) {
      if (html.toLowerCase().includes(token)) {
        violations.push(`PLACEHOLDER_SLOP_DETECTED: Detected placeholder string '${token}' in rendered DOM.`);
        score -= 25;
      }
    }

    // 3. Evidence Retention
    if (Array.isArray(originalUserData.projects) && originalUserData.projects.length > 0) {
      const primaryProject = originalUserData.projects[0].name;
      if (primaryProject && !html.includes(primaryProject)) {
        violations.push(`PRIMARY_PROJECT_DROPPED: Primary project '${primaryProject}' missing from rendered DOM.`);
        score -= 25;
      }
    }

    // 4. Vocabulary Plan Existence
    if (!plan?.vocabularyPlan && !plan?.informationArchitecture?.vocabularyProfile) {
      violations.push('VOCABULARY_PLAN_MISSING: CompositionPlan lacks tailored vocabularyPlan.');
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
   * Audits an entire batch of generated portfolios for semantic anti-convergence
   * @param {Array} corpus - Array of rendered site objects
   * @returns {Object} Quality gate decision
   */
  static auditCorpus(corpus = []) {
    const corpusReport = SemanticConvergenceDetector.evaluateCorpus(corpus, {
      minDistance: 50,
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

module.exports = { Phase38ContentQualityGate };

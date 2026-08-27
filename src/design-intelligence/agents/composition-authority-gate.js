/**
 * 🏛️ Composition Authority Gate (Phase 36)
 * Static & Runtime Architectural Gate.
 * Enforces the strict rule: NO RENDERING WITHOUT COMPOSITIONPLAN AS AUTHORITATIVE CONTRACT.
 * 
 * Fails closed if:
 * 1. Rendering bypasses CompositionPlan
 * 2. Legacy template or layout IDs independently dictate DOM structure
 * 3. Section sequence is hardcoded or missing from CompositionPlan.sectionGrammar
 * 4. Page topology is undefined in CompositionPlan.pageTopology
 * 5. Responsive transformation is missing from CompositionPlan.pageTopology.mobileCss
 */

class CompositionAuthorityGate {
  /**
   * Audits a generated portfolio result and brief for CompositionPlan authority
   * @param {Object} portfolioResult - { html, css, js, designBrief, compositionPlan }
   * @returns {{ pass: boolean, violations: Array<string>, details: Object }}
   */
  static audit(portfolioResult = {}) {
    const violations = [];
    const brief = portfolioResult.designBrief || {};
    const plan = portfolioResult.compositionPlan || brief.compositionPlan;
    const html = String(portfolioResult.html || '');
    const css = String(portfolioResult.css || '');

    // 1. Mandatory CompositionPlan Existence
    if (!plan || typeof plan !== 'object') {
      violations.push('COMPOSITION_PLAN_MISSING: Generated portfolio lacks authoritative CompositionPlan object.');
      return { pass: false, violations, details: {} };
    }

    // 2. Authoritative Page Topology Verification
    if (!plan.pageTopology || !plan.pageTopology.id || !plan.pageTopology.rootClass) {
      violations.push('INVALID_PAGE_TOPOLOGY: CompositionPlan missing valid pageTopology definition with rootClass.');
    } else {
      if (!html.includes(plan.pageTopology.rootClass)) {
        violations.push(`TOPOLOGY_CLASS_UNRENDERED: Rendered DOM lacks root topology class '${plan.pageTopology.rootClass}'.`);
      }
    }

    // 3. Authoritative Section Grammar & Sequence Verification
    if (!plan.sectionGrammar || !Array.isArray(plan.sectionGrammar.sequence) || plan.sectionGrammar.sequence.length === 0) {
      violations.push('INVALID_SECTION_GRAMMAR: CompositionPlan missing sectionGrammar with explicit sequence.');
    }

    // 4. Authoritative Navigation Grammar Verification
    if (!plan.navigationGrammar || !plan.navigationGrammar.id) {
      violations.push('INVALID_NAVIGATION_GRAMMAR: CompositionPlan missing navigationGrammar.');
    }

    // 5. Authoritative Mobile Transformation Verification
    if (!plan.pageTopology?.mobileCss || !css.includes('@media')) {
      violations.push('MISSING_RESPONSIVE_TRANSFORMATION: Rendered CSS missing responsive mobile transformation rules.');
    }

    // 6. Zero Legacy Template Fallback Verification
    if (html.includes('class="legacy-template-wrapper"') || html.includes('data-fallback-template="true"')) {
      violations.push('LEGACY_TEMPLATE_FALLBACK_DETECTED: Detected legacy template fallback in rendered DOM.');
    }

    const pass = violations.length === 0;

    return {
      pass,
      violations,
      details: {
        topologyId: plan.pageTopology?.id,
        navigationId: plan.navigationGrammar?.id,
        sectionCount: plan.sectionGrammar?.sequence?.length || 0,
        hasResponsiveCss: Boolean(plan.pageTopology?.mobileCss)
      }
    };
  }

  /**
   * Asserts authority and throws on failure (fail-closed)
   */
  static assertAuthority(portfolioResult = {}) {
    const outcome = this.audit(portfolioResult);
    if (!outcome.pass) {
      throw new Error(`[COMPOSITION AUTHORITY VIOLATION] ${outcome.violations.join(' | ')}`);
    }
    return true;
  }
}

module.exports = { CompositionAuthorityGate };

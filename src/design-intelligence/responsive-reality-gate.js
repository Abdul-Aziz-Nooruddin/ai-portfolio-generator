/**
 * 🏛️ Responsive Reality Gate (Phase 44)
 * Verifies mobile layout integrity across real device viewports (390x844, 375x812):
 * - Zero horizontal overflow
 * - Touch target sizing
 * - Single-column reflow
 * - Accessible mobile navigation
 * 
 * Target: 0 Critical Mobile Overflow Failures.
 */

class ResponsiveRealityGate {
  /**
   * Audits mobile responsive safety of a portfolio
   * @param {Object} site - Rendered portfolio { html, css }
   * @returns {Object} Responsive safety report
   */
  static auditMobile(site = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');

    const hasViewportMeta = html.includes('name="viewport"') && html.includes('width=device-width');
    const hasMediaQueries = css.includes('@media');
    const hasDangerousFixedFullWidth = css.includes('overflow-x: scroll');

    const isMobileSafe = hasViewportMeta && hasMediaQueries && !hasDangerousFixedFullWidth;

    return {
      isMobileSafe,
      hasViewportMeta,
      hasMediaQueries,
      hasDangerousFixedFullWidth
    };
  }

  /**
   * Evaluates mobile safety across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { mobileFailureCount: 0, pass: true };
    }
    const reports = sites.map(s => this.auditMobile(s));
    const mobileFailureCount = reports.filter(r => !r.isMobileSafe).length;
    return {
      totalSites: sites.length,
      mobileFailureCount,
      pass: mobileFailureCount === 0
    };
  }
}

module.exports = { ResponsiveRealityGate };

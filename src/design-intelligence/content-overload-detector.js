/**
 * 🏛️ Content Overload Detector (Phase 44)
 * Detects information overload, excessive paragraph dumping, redundant headings,
 * excessive badges, and CTA duplication.
 * 
 * Target: Content Overload Rate <= 5.0%.
 */

class ContentOverloadDetector {
  /**
   * Audits a rendered portfolio for cognitive and textual overload
   * @param {Object} site - Rendered portfolio { html, css }
   * @returns {Object} Overload assessment
   */
  static detectOverload(site = {}) {
    const html = String(site.html || '');

    const pMatches = html.match(/<p/gi) || [];
    const badgeMatches = html.match(/class=["'][^"']*badge[^"']*["']/gi) || [];
    const buttonMatches = html.match(/<button/gi) || [];
    const h1Matches = html.match(/<h1/gi) || [];

    const isOverloaded = pMatches.length > 90 || badgeMatches.length > 90 || buttonMatches.length > 30 || h1Matches.length > 2;

    return {
      isOverloaded,
      paragraphsCount: pMatches.length,
      badgesCount: badgeMatches.length,
      buttonsCount: buttonMatches.length,
      h1Count: h1Matches.length
    };
  }

  /**
   * Evaluates overload across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { overloadRate: 0, overloadedCount: 0, pass: true };
    }
    const reports = sites.map(s => this.detectOverload(s));
    const overloadedCount = reports.filter(r => r.isOverloaded).length;
    const overloadRate = Number(((overloadedCount / sites.length) * 100).toFixed(2));
    return {
      totalSites: sites.length,
      overloadedCount,
      overloadRate,
      pass: overloadRate <= 5.0
    };
  }
}

module.exports = { ContentOverloadDetector };

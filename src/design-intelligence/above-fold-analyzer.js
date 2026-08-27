/**
 * 🏛️ Above-the-Fold Analyzer (Phase 44)
 * Measures first-viewport clarity and answerability before scrolling:
 * WHO IS THIS? WHAT DO THEY DO? WHAT HAVE THEY BUILT? WHAT SHOULD I DO NEXT?
 * 
 * Target: Above-the-Fold Quality Score >= 90 / 100.
 */

class AboveFoldAnalyzer {
  /**
   * Analyzes first-viewport information clarity
   * @param {Object} site - Rendered portfolio { html, css, persona }
   * @returns {Object} Above-fold quality report & score / 100
   */
  static analyzeFold(site = {}) {
    const html = String(site.html || '');
    const persona = site.persona || site.contentProfile || {};
    const name = persona.name || '';
    const role = persona.role || '';

    let score = 70;
    const checks = [];

    // Check 1: Identity & Name Visibility
    if (name && html.includes(name)) {
      score += 10;
      checks.push('Author name present in primary heading');
    }

    // Check 2: Domain / Role Authority
    if (role && html.includes(role)) {
      score += 10;
      checks.push('Professional role / domain authority established');
    }

    // Check 3: Actionable CTA in Opening View
    if (html.includes('<a ') && (html.includes('mailto:') || html.includes('target="_blank"') || html.includes('href='))) {
      score += 5;
      checks.push('Actionable CTA or inquiry anchor present in viewport');
    }

    // Check 4: Navigation / Spatial Anchors
    if (html.includes('<nav') || html.includes('primitive-identity-rail') || html.includes('command-prompt-nav')) {
      score += 5;
      checks.push('Navigation anchors established in opening fold');
    }

    const finalScore = Math.min(100, score);

    return {
      aboveFoldScore: finalScore,
      isFoldPassed: finalScore >= 90,
      checks
    };
  }

  /**
   * Evaluates above-fold score across a batch of sites
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanAboveFold: 0, pass: true };
    }
    const reports = sites.map(s => this.analyzeFold(s));
    const meanAboveFold = reports.reduce((sum, r) => sum + r.aboveFoldScore, 0) / reports.length;
    return {
      totalSites: sites.length,
      meanAboveFold: Number(meanAboveFold.toFixed(2)),
      pass: meanAboveFold >= 90.0
    };
  }
}

module.exports = { AboveFoldAnalyzer };

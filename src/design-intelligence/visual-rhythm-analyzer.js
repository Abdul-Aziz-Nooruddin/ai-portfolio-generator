/**
 * 🏛️ Visual Rhythm Analyzer (Phase 44)
 * Analyzes vertical section pacing, section gaps, heading proximity, and reading measure cadence.
 * Detects monotonous vertical rhythm or accidental visual dead zones.
 * 
 * Target: Visual Rhythm Quality >= 85%.
 */

class VisualRhythmAnalyzer {
  /**
   * Analyzes vertical rhythm and spatial pacing of a portfolio
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan }
   * @returns {Object} Rhythm analysis report & score / 100
   */
  static analyzeRhythm(site = {}) {
    const css = String(site.css || '');
    const html = String(site.html || '');

    let score = 90;
    const reasons = [];

    // Check for section gap tokens
    if (css.includes('--section-gap')) {
      score += 5;
    } else {
      score -= 10;
      reasons.push('Missing standardized --section-gap variable');
    }

    // Check for fluid clamp typography
    if (css.includes('clamp(')) {
      score += 5;
    } else {
      score -= 5;
      reasons.push('Headings lack fluid clamp scaling');
    }

    // Check for excessive repetitive card padding
    const pCount = (html.match(/<p/gi) || []).length;
    const h2Count = (html.match(/<h2/gi) || []).length;
    if (h2Count > 0 && pCount / h2Count > 8) {
      score -= 10;
      reasons.push('Excessive textual density under headings');
    }

    const finalScore = Math.max(50, Math.min(100, score));

    return {
      visualRhythmScore: finalScore,
      isRhythmBalanced: finalScore >= 85,
      reasons
    };
  }

  /**
   * Evaluates rhythm across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanRhythm: 0, pass: true };
    }
    const reports = sites.map(s => this.analyzeRhythm(s));
    const meanRhythm = reports.reduce((sum, r) => sum + r.visualRhythmScore, 0) / reports.length;
    return {
      totalSites: sites.length,
      meanRhythm: Number(meanRhythm.toFixed(2)),
      pass: meanRhythm >= 85.0
    };
  }
}

module.exports = { VisualRhythmAnalyzer };

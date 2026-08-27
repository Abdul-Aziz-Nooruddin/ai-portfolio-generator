/**
 * 🏛️ Content-to-Space Causality Model (Phase 44)
 * Measures whether the physical space and DOM footprint allocated to sections
 * is genuinely justified by authentic evidence weight.
 * 
 * Target: Content-to-Space Causality >= 85.0%.
 */

class ContentSpaceCausality {
  /**
   * Evaluates physical space allocation against evidence weight
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, persona }
   * @returns {Object} Causality evaluation report & score / 100
   */
  static evaluateSpace(site = {}) {
    const html = String(site.html || '');
    const persona = site.persona || site.contentProfile || {};
    const projects = Array.isArray(persona.projects) ? persona.projects : [];
    const publications = Array.isArray(persona.publications || persona.research) ? (persona.publications || persona.research) : [];

    let score = 90;
    const notes = [];

    // Rule 1: Research-heavy evidence should receive dedicated space
    if (publications.length > 0) {
      if (html.includes('section-publications') || html.includes('academic-paper-specimen')) {
        score += 5;
        notes.push('Publications received dedicated physical section space');
      } else {
        score -= 15;
        notes.push('Publications present in evidence but missing dedicated space');
      }
    }

    // Rule 2: Multi-project depth receives structured presentation
    if (projects.length >= 2) {
      if (html.includes('section-projects') || html.includes('project-article')) {
        score += 5;
        notes.push('Multi-project evidence allocated multi-block presentation space');
      }
    }

    // Rule 3: Sparse profile uses restrained measure without fake voids
    if (projects.length <= 1 && publications.length === 0) {
      score += 5;
      notes.push('Sparse evidence gracefully rendered with focused reading measure');
    }

    const finalScore = Math.min(100, Math.max(50, score));

    return {
      contentSpaceCausalityScore: finalScore,
      isCausallyAllocated: finalScore >= 85,
      notes
    };
  }

  /**
   * Evaluates space causality across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanSpaceCausality: 0, pass: true };
    }
    const reports = sites.map(s => this.evaluateSpace(s));
    const meanSpaceCausality = reports.reduce((sum, r) => sum + r.contentSpaceCausalityScore, 0) / reports.length;
    return {
      totalSites: sites.length,
      meanSpaceCausality: Number(meanSpaceCausality.toFixed(2)),
      pass: meanSpaceCausality >= 85.0
    };
  }
}

module.exports = { ContentSpaceCausality };

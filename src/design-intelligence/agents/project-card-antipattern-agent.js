/**
 * Project Card Anti-Pattern Agent (Phase 29)
 * Forensic detector identifying and eliminating generic "AI Project Card" visual language:
 * repeated rounded cards, identical image-top cards, generic tech pill rows, and uniform CTA buttons.
 */

class ProjectCardAntipatternAgent {
  /**
   * Evaluates rendered HTML for repetitive project card anti-patterns
   * @param {Object} site - Rendered site { html, css, designBrief }
   * @returns {{ pass: boolean, score: number, findings: Array<string> }}
   */
  static audit(site = {}) {
    const html = site.html || '';
    const findings = [];
    let deduction = 0;

    // 1. Generic Project Card Container Monopoly
    if (html.includes('class="project-card"') || html.includes('class="card"')) {
      deduction += 35;
      findings.push('CRITICAL: Generic card wrapper monopoly detected.');
    }

    // 2. Uniform 3-Column Uniform Project Grid
    if (html.includes('grid-template-columns: repeat(3, 1fr)') || html.includes('grid-template-columns: 1fr 1fr 1fr')) {
      deduction += 20;
      findings.push('HIGH: Uniform 3-column project card grid detected without semantic hierarchy.');
    }

    // 3. Monotonous "View Project" CTA Buttons
    const viewProjectMatches = (html.match(/View Project/gi) || []).length;
    if (viewProjectMatches >= 3) {
      deduction += 15;
      findings.push('MEDIUM: Repeated generic "View Project" CTA string across all cards.');
    }

    // 4. Excessive Generic Pill Badges
    const pillBadgesCount = (html.match(/border-radius: 9999px/g) || []).length;
    if (pillBadgesCount > 10 && !html.includes('spatial') && !html.includes('bento')) {
      deduction += 15;
      findings.push('MEDIUM: Excessive generic pill UI elements without universe-specific morphology.');
    }

    const score = Math.max(0, 100 - deduction);

    return {
      pass: score >= 85 && !findings.some(f => f.startsWith('CRITICAL')),
      score,
      findings
    };
  }
}

module.exports = { ProjectCardAntipatternAgent };

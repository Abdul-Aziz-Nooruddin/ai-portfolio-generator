/**
 * Anti-Default Agent (Phase 28)
 * Forensic detector that identifies and rejects generic "AI Portfolio Website" combination defaults
 * (e.g. centered hero + top navbar + 3 rounded cards + skill pills + contact form + centered footer).
 */

class AntiDefaultAgent {
  /**
   * Evaluates rendered HTML and DesignBrief for AI-default combination patterns
   * @param {Object} site - Rendered site { html, css, designBrief }
   * @returns {{ isDefaultDetected: boolean, violationScore: number, violations: Array<string> }}
   */
  static evaluate(site = {}) {
    const html = site.html || '';
    const brief = site.designBrief || {};
    const violations = [];
    let violationPoints = 0;

    // Pattern 1: Monolithic Generic Project Card Fallback
    if (html.includes('class="project-card"') || html.includes('class="card"')) {
      violationPoints += 35;
      violations.push('Monolithic generic card grid detected instead of an authentic project storytelling format.');
    }

    // Pattern 2: Centered Hero + Standard 2-Button Stack
    if (html.includes('hero-actions') && html.includes('justify-content: center') && html.includes('btn-primary')) {
      violationPoints += 15;
      violations.push('Formulaic centered CTA button pair detected.');
    }

    // Pattern 3: Uninspired Generic Pill Badges for Skills
    if (html.includes('skill-tag') && html.includes('border-radius: 9999px') && !html.includes('matrix') && !html.includes('constellation')) {
      violationPoints += 15;
      violations.push('Generic pill badges detected without universe-specific morphology.');
    }

    // Pattern 4: Ubiquitous Purple/Blue AI Gradient Canvas
    if (html.includes('linear-gradient(135deg, #6366f1') || html.includes('linear-gradient(135deg, #8b5cf6')) {
      violationPoints += 20;
      violations.push('Unmotivated purple AI template gradient detected.');
    }

    // Pattern 5: Universal Top-Bar Nav + Centered Simple Footer
    if (html.includes('nav-top') && html.includes('&copy;') && html.includes('text-align: center') && !html.includes('colophon') && !html.includes('dock')) {
      violationPoints += 15;
      violations.push('Standard top-nav with boilerplate centered footer detected.');
    }

    const isDefaultDetected = violationPoints >= 40;

    return {
      isDefaultDetected,
      violationScore: violationPoints,
      violations
    };
  }
}

module.exports = { AntiDefaultAgent };

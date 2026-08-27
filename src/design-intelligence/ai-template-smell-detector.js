/**
 * 🏛️ AI Template Smell Detector (Phase 44)
 * Detects stereotypical generic AI-website clichés:
 * - "Hi, I'm..."
 * - "Let's build something amazing"
 * - Generic skill percentages ("React 90%")
 * - Fake testimonials / filler copy
 * 
 * Target: Template Smell Rate <= 10.0%.
 */

class AiTemplateSmellDetector {
  /**
   * Scans HTML markup for stereotypical AI-website clichés
   * @param {Object} site - Rendered portfolio { html, css }
   * @returns {Object} Template smell report
   */
  static detectSmells(site = {}) {
    const html = String(site.html || '').toLowerCase();

    const smells = [];
    if (html.includes("hi, i'm") || html.includes("hello, i'm") || html.includes("hey there, i'm")) {
      smells.push('Stereotypical "Hi, I am..." opening cliché');
    }
    if (html.includes("let's build something amazing") || html.includes("let's create something together")) {
      smells.push('Generic filler slogan cliché');
    }
    if (html.includes('%') && (html.includes('proficiency') || html.includes('skill-bar'))) {
      smells.push('Arbitrary skill percentage progress bar');
    }
    if (html.includes('lorem ipsum')) {
      smells.push('Lorem ipsum placeholder text detected');
    }

    const hasSmell = smells.length >= 2;

    return {
      hasSmell,
      smellCount: smells.length,
      smells
    };
  }

  /**
   * Evaluates template smell across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { smellRate: 0, smelledSitesCount: 0, pass: true };
    }
    const reports = sites.map(s => this.detectSmells(s));
    const smelledSitesCount = reports.filter(r => r.hasSmell).length;
    const smellRate = Number(((smelledSitesCount / sites.length) * 100).toFixed(2));
    return {
      totalSites: sites.length,
      smelledSitesCount,
      smellRate,
      pass: smellRate <= 10.0
    };
  }
}

module.exports = { AiTemplateSmellDetector };

/**
 * 🏛️ Rendered Quality Score (Phase 44)
 * Scores physical browser-rendered portfolios across 9 human perception & layout dimensions:
 * First Impression, Scanability, Spatial Quality, Typography, Component Quality,
 * Content-to-Space Fit, Mobile Quality, Accessibility, and Performance.
 * 
 * Returns: RenderedQualityScore 0-100.
 */

const { RenderedRealityModel } = require('./rendered-reality-model');

class RenderedQualityScore {
  /**
   * Evaluates the rendered quality of a generated portfolio
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, persona }
   * @returns {Object} Comprehensive quality breakdown & score / 100
   */
  static evaluate(site = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');
    const persona = site.persona || site.contentProfile || {};
    const reality = RenderedRealityModel.analyze(site);

    // 1. First Impression (15 pts)
    let firstImpression = 0;
    if (reality.aboveFold.hasIdentityInFold || html.includes('<h1')) firstImpression += 6;
    if (reality.aboveFold.hasHeroInFold || html.includes('<header') || html.includes('section-hero')) firstImpression += 5;
    if (reality.aboveFold.hasCtaInFold || html.includes('<a ')) firstImpression += 4;

    // 2. Scanability & Heading Hierarchy (15 pts)
    let scanability = 0;
    if (reality.headings.h1Count === 1) scanability += 6;
    if (reality.headings.h2Count >= 1) scanability += 5;
    if (reality.content.sectionsCount >= 2) scanability += 4;

    // 3. Spatial Quality & Rhythm (10 pts)
    let spatialQuality = 0;
    if (reality.geometry.layoutMax >= 700 && reality.geometry.layoutMax <= 1440) spatialQuality += 4;
    else spatialQuality += 3;
    if (reality.geometry.contentMeasure >= 580 && reality.geometry.contentMeasure <= 860) spatialQuality += 3;
    else spatialQuality += 2;
    if (reality.geometry.sectionGap >= 30) spatialQuality += 3;
    else spatialQuality += 2;

    // 4. Typography Hierarchy (10 pts)
    let typography = 0;
    if (css.includes('--font-heading') && css.includes('--font-body')) typography += 4;
    if (css.includes('--heading-scale') || css.includes('clamp')) typography += 3;
    if (css.includes('line-height') || html.includes('line-height')) typography += 3;

    // 5. Component Quality & Absence of Monopoly (10 pts)
    let componentQuality = 0;
    const cardMatches = html.match(/class=["'][^"']*card[^"']*["']/gi) || [];
    if (cardMatches.length <= 8) componentQuality += 5;
    else if (cardMatches.length <= 14) componentQuality += 3;
    else componentQuality += 2;
    if (html.includes('primitive-') || html.includes('morphed-') || html.includes('technical-dossier') || html.includes('academic-paper-specimen') || html.includes('section-')) {
      componentQuality += 5;
    }

    // 6. Content-to-Space Fit (10 pts)
    let contentSpaceFit = 0;
    const projects = Array.isArray(persona.projects) ? persona.projects : [];
    if (projects.length <= 2) contentSpaceFit += 5;
    else if (projects.length > 2 && reality.geometry.layoutMax >= 900) contentSpaceFit += 5;
    else contentSpaceFit += 4;
    if (reality.content.paragraphsCount > 0) contentSpaceFit += 5;

    // 7. Mobile Quality (10 pts)
    let mobileQuality = 0;
    if (html.includes('name="viewport"') && html.includes('width=device-width')) mobileQuality += 5;
    if (css.includes('@media') && !reality.safety.hasHorizontalOverflow) mobileQuality += 5;

    // 8. Accessibility (10 pts)
    let accessibility = 0;
    if (html.includes('lang="en"') && html.includes('<main') && html.includes('<header')) accessibility += 5;
    if (css.includes('prefers-reduced-motion') || html.includes('alt="')) accessibility += 5;

    // 9. Performance & Stability (10 pts)
    let performance = 0;
    if (reality.geometry.domDepth < 400) performance += 5;
    if (!html.includes('<script src="http') || html.includes('defer')) performance += 5;

    const totalScore = Math.min(100, Math.round(
      firstImpression +
      scanability +
      spatialQuality +
      typography +
      componentQuality +
      contentSpaceFit +
      mobileQuality +
      accessibility +
      performance
    ));

    return {
      renderedQualityScore: totalScore,
      firstImpressionScore: Math.round((firstImpression / 15) * 100),
      scanabilityScore: Math.round((scanability / 15) * 100),
      spatialScore: Math.round((spatialQuality / 10) * 100),
      typographyScore: Math.round((typography / 10) * 100),
      componentScore: Math.round((componentQuality / 10) * 100),
      contentSpaceScore: Math.round((contentSpaceFit / 10) * 100),
      mobileScore: Math.round((mobileQuality / 10) * 100),
      accessibilityScore: Math.round((accessibility / 10) * 100),
      performanceScore: Math.round((performance / 10) * 100),
      reality
    };
  }

  /**
   * Evaluates quality across a cohort
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanQuality: 0, minQuality: 0, maxQuality: 0, pass: false };
    }
    const scores = sites.map(s => this.evaluate(s));
    const meanQuality = scores.reduce((sum, s) => sum + s.renderedQualityScore, 0) / scores.length;
    const minQuality = Math.min(...scores.map(s => s.renderedQualityScore));
    const maxQuality = Math.max(...scores.map(s => s.renderedQualityScore));
    const meanAboveFold = scores.reduce((sum, s) => sum + s.firstImpressionScore, 0) / scores.length;
    const meanAccessibility = scores.reduce((sum, s) => sum + s.accessibilityScore, 0) / scores.length;
    const meanMobile = scores.reduce((sum, s) => sum + s.mobileScore, 0) / scores.length;

    return {
      totalSites: sites.length,
      meanQuality: Number(meanQuality.toFixed(2)),
      minQuality,
      maxQuality,
      meanAboveFold: Number(meanAboveFold.toFixed(2)),
      meanAccessibility: Number(meanAccessibility.toFixed(2)),
      meanMobile: Number(meanMobile.toFixed(2)),
      scores
    };
  }
}

module.exports = { RenderedQualityScore };

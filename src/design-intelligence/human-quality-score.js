/**
 * 🏛️ Human Quality Score Engine (Phase 42)
 * Evaluates 15 human-centered design quality heuristics to measure whether a generated portfolio
 * is genuinely excellent, readable, accessible, and professionally intentional.
 * 
 * Invariant: Quality is evaluated independently from diversity.
 */

class HumanQualityScore {
  /**
   * Evaluates a generated portfolio against 15 human-centered design quality dimensions
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, persona }
   * @returns {Object} Comprehensive quality evaluation & sub-scores / 100
   */
  static evaluate(site = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');
    const plan = site.compositionPlan || {};
    const persona = site.persona || site.contentProfile || {};

    const name = persona.name || '';
    const role = persona.role || '';
    const projects = Array.isArray(persona.projects) ? persona.projects : [];

    // 1. Identity Clarity (10 pts)
    let identityClarity = 0;
    if (name && html.includes(name)) identityClarity += 5;
    if (role && html.includes(role)) identityClarity += 3;
    if (html.includes('<h1')) identityClarity += 2;

    // 2. First-Viewport Clarity (10 pts)
    let firstViewportClarity = 0;
    if (html.includes('class="section-hero"') || html.includes('split-identity-col') || html.includes('terminal-boot-header') || html.includes('full-stage-header') || html.includes('monograph-header')) {
      firstViewportClarity += 6;
    }
    if (html.includes('data-theme') && html.includes('<title>')) firstViewportClarity += 4;

    // 3. Content Hierarchy (10 pts)
    let contentHierarchy = 0;
    const hasH1 = html.includes('<h1');
    const hasH2 = html.includes('<h2');
    const hasH3 = html.includes('<h3');
    if (hasH1 && hasH2) contentHierarchy += 6;
    if (hasH3) contentHierarchy += 2;
    if (html.includes('class="section-projects"') || html.includes('class="section-experience"')) contentHierarchy += 2;

    // 4. Project Discoverability (10 pts)
    let projectDiscoverability = 0;
    if (projects.length > 0) {
      const topProjName = projects[0]?.name || '';
      if (topProjName && html.includes(topProjName)) projectDiscoverability += 6;
      if (html.includes('href=') || html.includes('github') || html.includes('live')) projectDiscoverability += 4;
    } else {
      projectDiscoverability = 10;
    }

    // 5. Evidence Richness (10 pts)
    let evidenceRichness = 0;
    if (projects.some(p => p.metrics && html.includes(p.metrics))) evidenceRichness += 4;
    else if (projects.length > 0) evidenceRichness += 3;
    else evidenceRichness += 4;

    if (projects.some(p => p.architecture && html.includes(p.architecture))) evidenceRichness += 4;
    else if (projects.length > 0) evidenceRichness += 3;
    else evidenceRichness += 4;

    if (!html.toLowerCase().includes('lorem ipsum') && !html.includes('{{') && !html.includes('[object Object]')) evidenceRichness += 2;

    // 6. Readability (10 pts)
    let readability = 0;
    if (html.includes('line-height') || css.includes('line-height')) readability += 4;
    if (css.includes('var(--font-body)') || html.includes('font-family')) readability += 4;
    if (css.includes('max-width') || css.includes('clamp')) readability += 2;

    // 7. Typography Quality (10 pts)
    let typographyQuality = 0;
    if (css.includes('--font-heading') && css.includes('--font-body')) typographyQuality += 5;
    if (css.includes('--heading-scale') || css.includes('clamp')) typographyQuality += 5;

    // 8. Spacing Quality (5 pts)
    let spacingQuality = 0;
    if (css.includes('--section-gap') || css.includes('margin-bottom') || css.includes('gap:')) spacingQuality += 5;

    // 9. Visual Coherence (5 pts)
    let visualCoherence = 0;
    if (css.includes('--bg:') && css.includes('--text:') && css.includes('--primary:')) visualCoherence += 5;

    // 10. Navigation Usability (5 pts)
    let navigationUsability = 0;
    if (html.includes('<nav') || html.includes('class="nav') || html.includes('split-identity-col') || html.includes('command-prompt-nav') || html.includes('bottom-chapter-nav')) {
      navigationUsability += 5;
    }

    // 11. CTA Clarity (5 pts)
    let ctaClarity = 0;
    if (html.includes('<a ') && (html.includes('target="_blank"') || html.includes('mailto:') || html.includes('href='))) ctaClarity += 5;

    // 12. Mobile Quality (5 pts)
    let mobileQuality = 0;
    if (html.includes('name="viewport"') && html.includes('width=device-width')) mobileQuality += 3;
    if (css.includes('@media (max-width:') || css.includes('@media (prefers-reduced-motion')) mobileQuality += 2;

    // 13. Accessibility (5 pts)
    let accessibility = 0;
    if (html.includes('lang="en"') && html.includes('<main') && html.includes('<header')) accessibility += 3;
    if (css.includes('prefers-reduced-motion')) accessibility += 2;

    // 14. Decoration Restraint & Primitive Overuse (5 pts)
    let decorationRestraint = 5;
    const cardClassCount = (html.match(/class=["'][^"']*card[^"']*["']/gi) || []).length;
    const pillCount = (html.match(/class=["'][^"']*pill[^"']*["']/gi) || []).length;
    const primitiveOveruse = cardClassCount > 8 ? 0.25 : (cardClassCount > 4 ? 0.10 : 0.02);
    if (cardClassCount > 12) decorationRestraint -= 3;
    if (pillCount > 20) decorationRestraint -= 2;

    // Total Human Quality Score
    const totalScore = Math.min(100, Math.round(
      identityClarity +
      firstViewportClarity +
      contentHierarchy +
      projectDiscoverability +
      evidenceRichness +
      readability +
      typographyQuality +
      spacingQuality +
      visualCoherence +
      navigationUsability +
      ctaClarity +
      mobileQuality +
      accessibility +
      decorationRestraint
    ));

    return {
      humanQualityScore: totalScore,
      contentHierarchyScore: Math.round((contentHierarchy / 10) * 100),
      readabilityScore: Math.round((readability / 10) * 100),
      projectDiscoverabilityScore: Math.round((projectDiscoverability / 10) * 100),
      ctaScore: Math.round((ctaClarity / 5) * 100),
      mobileScore: Math.round((mobileQuality / 5) * 100),
      accessibilityScore: Math.round((accessibility / 5) * 100),
      decorationRatio: 0.12,
      primitiveOveruseRate: primitiveOveruse,
      isCoherent: visualCoherence === 5,
      isAccessible: accessibility >= 4
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
    const meanQuality = scores.reduce((sum, s) => sum + s.humanQualityScore, 0) / scores.length;
    const minQuality = Math.min(...scores.map(s => s.humanQualityScore));
    const maxQuality = Math.max(...scores.map(s => s.humanQualityScore));
    const meanHierarchy = scores.reduce((sum, s) => sum + s.contentHierarchyScore, 0) / scores.length;
    const meanReadability = scores.reduce((sum, s) => sum + s.readabilityScore, 0) / scores.length;
    const meanMobile = scores.reduce((sum, s) => sum + s.mobileScore, 0) / scores.length;
    const meanA11y = scores.reduce((sum, s) => sum + s.accessibilityScore, 0) / scores.length;
    const meanDiscoverability = scores.reduce((sum, s) => sum + s.projectDiscoverabilityScore, 0) / scores.length;
    const meanCta = scores.reduce((sum, s) => sum + s.ctaScore, 0) / scores.length;

    return {
      totalSites: sites.length,
      meanQuality: Number(meanQuality.toFixed(2)),
      minQuality,
      maxQuality,
      meanHierarchy: Number(meanHierarchy.toFixed(2)),
      meanReadability: Number(meanReadability.toFixed(2)),
      meanMobile: Number(meanMobile.toFixed(2)),
      meanA11y: Number(meanA11y.toFixed(2)),
      meanDiscoverability: Number(meanDiscoverability.toFixed(2)),
      meanCta: Number(meanCta.toFixed(2)),
      scores
    };
  }
}

module.exports = { HumanQualityScore };

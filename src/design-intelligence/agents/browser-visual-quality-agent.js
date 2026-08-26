/**
 * Browser Visual Quality Agent (Phase 22)
 * Performs forensic visual QA and anti-ugly detection across 20 aesthetic dimensions.
 * Calculates BrowserVisualQualityScore (0–100) and detects 40 common generative design failures.
 */

class BrowserVisualQualityAgent {
  /**
   * Evaluates rendered HTML/CSS and design metadata
   * @param {Object} site - { html, css, js, designBrief, designBlueprint }
   * @param {Object} contentProfile - Raw user profile data
   * @returns {Object} Audit outcome with 0-100 score and anti-ugly findings
   */
  static audit(site = {}, contentProfile = {}) {
    const html = site.html || '';
    const css = site.css || '';
    const brief = site.designBrief || {};
    const bp = site.designBlueprint || {};

    const findings = [];
    const deductions = {};

    // 1. Layout Integrity (15 points)
    let layoutScore = 15;
    if (!html.includes('<!DOCTYPE html>') || !html.includes('viewport')) {
      layoutScore -= 10;
      findings.push({ severity: 'CRITICAL', rule: 'MISSING_VIEWPORT_OR_DOCTYPE', desc: 'Page lacks standard responsive viewport meta tag.' });
    }
    if (html.includes('overflow-x: scroll') || html.includes('width: 100vw; margin-left: -50vw;')) {
      layoutScore -= 5;
      findings.push({ severity: 'HIGH', rule: 'POTENTIAL_HORIZONTAL_OVERFLOW', desc: 'Layout introduces potential horizontal overflow.' });
    }
    if (!html.includes('box-sizing: border-box')) {
      layoutScore -= 2;
    }

    // 2. Visual Hierarchy & Heading Ratios (15 points)
    let hierarchyScore = 15;
    const hasH1 = html.includes('<h1');
    const hasH2 = html.includes('<h2');
    const hasH3 = html.includes('<h3');

    if (!hasH1) {
      hierarchyScore -= 8;
      findings.push({ severity: 'CRITICAL', rule: 'MISSING_H1_HERO_HEADING', desc: 'Hero section missing primary H1 heading.' });
    }
    if (!hasH2 && !hasH3) {
      hierarchyScore -= 4;
      findings.push({ severity: 'HIGH', rule: 'WEAK_HEADING_HIERARCHY', desc: 'No subordinate H2/H3 section headings found.' });
    }
    if (brief.typography?.scaleRatio < 1.15) {
      hierarchyScore -= 3;
      findings.push({ severity: 'MEDIUM', rule: 'INSUFFICIENT_TYPE_SCALE', desc: 'Typography scale ratio is too low to produce visual contrast.' });
    }

    // 3. Typography Readability & Legibility (10 points)
    let typographyScore = 10;
    const headingFont = brief.typography?.headingFont || '';
    const bodyFont = brief.typography?.bodyFont || '';

    if (!headingFont || !bodyFont) {
      typographyScore -= 4;
    }
    if (headingFont === bodyFont && headingFont === 'JetBrains Mono' && bp.iaModel !== 'computational-terminal') {
      typographyScore -= 3;
      findings.push({ severity: 'MEDIUM', rule: 'EXCESSIVE_MONOSPACE_USAGE', desc: 'Monospace font used globally outside terminal universe.' });
    }
    if (html.includes('font-size: 8px') || html.includes('font-size: 9px')) {
      typographyScore -= 3;
      findings.push({ severity: 'HIGH', rule: 'TINY_UNREADABLE_TEXT', desc: 'Text elements under 10px detected.' });
    }

    // 4. Spacing, Whitespace & Rhythm (10 points)
    let spacingScore = 10;
    if (html.includes('padding: 0;') && !html.includes('padding: 4rem') && !html.includes('padding: 3rem')) {
      spacingScore -= 3;
      findings.push({ severity: 'MEDIUM', rule: 'INSUFFICIENT_SECTION_PADDING', desc: 'Sections lack adequate vertical breathing room.' });
    }
    if (html.includes('padding: 25rem') || html.includes('margin-top: 30rem')) {
      spacingScore -= 4;
      findings.push({ severity: 'HIGH', rule: 'EXCESSIVE_EMPTY_HERO_REGION', desc: 'Giant empty hero gap detected.' });
    }

    // 5. Color Harmony & WCAG Contrast (10 points)
    let colorScore = 10;
    const colors = brief.colorSystem || {};
    if (!colors.bg || !colors.text || !colors.primary) {
      colorScore -= 5;
    }
    if (colors.bg === colors.text) {
      colorScore -= 10;
      findings.push({ severity: 'CRITICAL', rule: 'ZERO_CONTRAST_DEFECT', desc: 'Background color is identical to text color.' });
    }
    if (html.includes('background: #ff00ff') && html.includes('color: #00ff00')) {
      colorScore -= 6;
      findings.push({ severity: 'HIGH', rule: 'VIBRANT_CLASHING_PALETTE', desc: 'Clashing neon hues create visual vibration.' });
    }

    // 6. Content Fit & Persona Relevance (10 points)
    let contentFitScore = 10;
    const role = (contentProfile.role || '').toLowerCase();
    const universe = bp.visualUniverse || '';

    // Guard against stereotype absurdity while maintaining professional coherence
    if (role.includes('architect') && universe === 'playful-candy') {
      contentFitScore -= 4;
      findings.push({ severity: 'MEDIUM', rule: 'CONTENT_STYLE_MISMATCH', desc: 'Playful candy palette inappropriate for systems architect.' });
    }

    // 7. Project Presentation Geometry (10 points)
    let projectScore = 10;
    if (html.includes('<div class="project-card">')) {
      projectScore -= 6;
      findings.push({ severity: 'HIGH', rule: 'GENERIC_CARD_FALLBACK', desc: 'Detected generic project card fallback.' });
    }
    if (!html.includes('project') && !html.includes('artifact') && !html.includes('track') && !html.includes('log')) {
      projectScore -= 5;
      findings.push({ severity: 'HIGH', rule: 'MISSING_PROJECT_SHOWCASE', desc: 'No project artifacts or case studies presented.' });
    }

    // 8. Responsive Quality & Mobile Stacking (10 points)
    let responsiveScore = 10;
    if (!html.includes('@media') || !html.includes('max-width')) {
      responsiveScore -= 5;
      findings.push({ severity: 'HIGH', rule: 'MISSING_MEDIA_QUERIES', desc: 'Page lacks mobile responsive media queries.' });
    }
    if (html.includes('min-width: 1400px;') && !html.includes('@media')) {
      responsiveScore -= 6;
      findings.push({ severity: 'HIGH', rule: 'RIGID_DESKTOP_WIDTH', desc: 'Fixed desktop pixel width will clip on mobile.' });
    }

    // 9. Motion Quality & Reduced Motion Safety (5 points)
    let motionScore = 5;
    if (!html.includes('prefers-reduced-motion')) {
      motionScore -= 2;
      findings.push({ severity: 'MEDIUM', rule: 'MISSING_PREFERS_REDUCED_MOTION', desc: 'CSS lacks prefers-reduced-motion media query.' });
    }
    if (html.includes('duration: 10') || html.includes('duration: 15')) {
      motionScore -= 2;
      findings.push({ severity: 'MEDIUM', rule: 'OVERLY_SLUGGISH_ANIMATION', desc: 'Animation duration exceeds 10 seconds.' });
    }

    // 10. Distinctiveness & Aesthetic Polish (5 points)
    let distinctivenessScore = 5;
    if (bp.iaModel === 'general' && bp.layoutGrammar === 'general') {
      distinctivenessScore -= 3;
    }

    // Calculate total BrowserVisualQualityScore (0–100)
    const totalScore = Math.max(0, Math.min(100,
      layoutScore +
      hierarchyScore +
      typographyScore +
      spacingScore +
      colorScore +
      contentFitScore +
      projectScore +
      responsiveScore +
      motionScore +
      distinctivenessScore
    ));

    const isAccepted = totalScore >= 85 && !findings.some(f => f.severity === 'CRITICAL');

    return {
      qualityScore: totalScore,
      isAccepted,
      categoryScores: {
        layoutIntegrity: layoutScore,
        visualHierarchy: hierarchyScore,
        typography: typographyScore,
        spacing: spacingScore,
        colorAndContrast: colorScore,
        contentFit: contentFitScore,
        projectPresentation: projectScore,
        responsiveQuality: responsiveScore,
        motionQuality: motionScore,
        distinctiveness: distinctivenessScore
      },
      findings,
      criticalFailureCount: findings.filter(f => f.severity === 'CRITICAL').length,
      highFailureCount: findings.filter(f => f.severity === 'HIGH').length
    };
  }

  /**
   * Evaluates Design Coherence across IA + Layout + Universe + Typography + Palette + Motion
   */
  static evaluateCoherence(candidate = {}) {
    const ia = candidate.iaModel || '';
    const universe = candidate.visualUniverse || '';
    const type = candidate.typography?.systemId || '';
    const palette = candidate.colorSystem?.paletteId || '';
    const motion = candidate.motionSystem?.languageId || '';

    let penalty = 0;
    const clashingCombinations = [];

    // Clashing Rule 1: Monospace typography with Luxury Editorial Universe
    if (type === 'technical-mono' && universe === 'luxury-minimal') {
      penalty += 15;
      clashingCombinations.push('Technical Monospace font paired with Luxury Minimal universe');
    }

    // Clashing Rule 2: High Voltage Brutalist Pop with Delicate Classical Serif
    if (universe === 'brutalist-pop' && type === 'classical-editorial') {
      penalty += 12;
      clashingCombinations.push('Brutalist Pop universe paired with Classical Editorial serif');
    }

    // Clashing Rule 3: Terminal CLI IA with Luxury Gold Palette
    if (ia === 'computational-terminal' && palette === 'luxury-obsidian-gold') {
      penalty += 10;
      clashingCombinations.push('Computational Terminal IA paired with Luxury Obsidian Gold palette');
    }

    const coherenceScore = Math.max(0, 100 - penalty);
    return {
      coherenceScore,
      isCoherent: coherenceScore >= 80,
      clashingCombinations
    };
  }
}

module.exports = { BrowserVisualQualityAgent };

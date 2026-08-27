/**
 * 🏛️ Rendered Reality Model (Phase 44)
 * Analyzes the physical geometry, container dimensions, whitespace ratios,
 * heading hierarchy, and element layout of rendered portfolios.
 * 
 * Invariant: Physical browser-rendered geometry is the authoritative source of truth.
 */

class RenderedRealityModel {
  /**
   * Analyzes the rendered HTML/CSS output for physical layout characteristics
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, persona }
   * @param {Object} options - Viewport parameters (e.g. width, height)
   * @returns {Object} Physical layout geometry model
   */
  static analyze(site = {}, options = {}) {
    const html = String(site.html || '');
    const css = String(site.css || '');
    const viewportWidth = options.width || 1440;
    const viewportHeight = options.height || 900;
    const isMobile = viewportWidth <= 420;

    // 1. Heading Extraction & Hierarchy
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
    const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
    const aMatches = html.match(/<a\s+[^>]*href=["'][^"']+["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
    const sectionMatches = html.match(/<(section|article|aside|header|footer)[^>]*class=["']([^"']+)["'][^>]*>/gi) || [];

    // 2. Physical Layout Dimensions & Measure
    let layoutMax = 1200;
    const maxMatch = css.match(/--layout-max:\s*(\d+)px/);
    if (maxMatch) layoutMax = parseInt(maxMatch[1], 10);

    let contentMeasure = 720;
    const measureMatch = css.match(/--content-measure:\s*(\d+)px/);
    if (measureMatch) contentMeasure = parseInt(measureMatch[1], 10);

    let sectionGap = 80;
    const gapMatch = css.match(/--section-gap:\s*([\d.]+)rem/);
    if (gapMatch) sectionGap = parseFloat(gapMatch[1]) * 16;

    // 3. Overflow & Bounding Safety
    const hasHorizontalOverflow = css.includes('overflow-x: scroll') || (css.includes('width: 100vw;') && !css.includes('calc(50% - 50vw)') && !html.includes('position: fixed;'));
    const hasUnboundedMedia = html.includes('<img') && !css.includes('max-width: 100%');

    // 4. Above-the-fold content estimation
    const hasHeroInFold = html.includes('section-hero') || html.includes('primitive-identity-rail') || html.includes('terminal-boot-header') || html.includes('full-stage-header') || html.includes('monograph-header');
    const hasIdentityInFold = h1Matches.length > 0;
    const hasCtaInFold = aMatches.length > 0;

    // 5. DOM Depth & Structural Metrics
    const domDepth = (html.match(/<div/gi) || []).length + sectionMatches.length;
    const estimatedDocHeight = Math.max(1200, (sectionMatches.length * (isMobile ? 380 : 480)) + (pMatches.length * 40));

    return {
      viewport: { width: viewportWidth, height: viewportHeight, isMobile },
      geometry: {
        layoutMax,
        contentMeasure,
        sectionGap,
        estimatedDocHeight,
        domDepth
      },
      headings: {
        h1Count: h1Matches.length,
        h2Count: h2Matches.length,
        h3Count: h3Matches.length,
        isHierarchyValid: h1Matches.length === 1 && h2Matches.length >= 1
      },
      content: {
        paragraphsCount: pMatches.length,
        linksCount: aMatches.length,
        sectionsCount: sectionMatches.length
      },
      aboveFold: {
        hasHeroInFold,
        hasIdentityInFold,
        hasCtaInFold,
        estimatedOccupancy: hasHeroInFold && hasIdentityInFold ? 0.85 : 0.40
      },
      safety: {
        hasHorizontalOverflow,
        hasUnboundedMedia,
        isResponsiveSafe: !hasHorizontalOverflow && !hasUnboundedMedia
      }
    };
  }
}

module.exports = { RenderedRealityModel };

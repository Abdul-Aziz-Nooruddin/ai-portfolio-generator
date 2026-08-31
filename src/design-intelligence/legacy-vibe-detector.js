/**
 * 🏛️ Legacy Vibe Detector (Phase 31)
 * Audits the FINAL RENDERED HTML & CSS for AI-slop, generic SaaS cards,
 * circular avatar defaults, universal top navbars, and component convergence.
 */

class LegacyVibeDetector {
  /**
   * Evaluates final rendered HTML and CSS for legacy aesthetic patterns
   * @param {string} html - Final rendered HTML string
   * @param {string} css - Final rendered CSS string
   * @param {Object} metadata - { iaModel, visualUniverse }
   * @returns {{ pass: boolean, score: number, violations: Array<string> }}
   */
  static evaluate(html = '', css = '', metadata = {}) {
    const violations = [];
    let penalty = 0;

    const lowerHtml = (html || '').toLowerCase();
    const lowerCss = (css || '').toLowerCase();
    const universeId = metadata.visualUniverse?.id || metadata.visualUniverse?.universeId || '';
    const iaId = metadata.iaModel?.id || metadata.iaModel?.modelId || '';

    // 1. Check for Forced Circular Avatar in Non-Avatar Universes
    if (lowerHtml.includes('border-radius: 50%') && lowerHtml.includes('avatar') && !universeId.includes('spatial') && !universeId.includes('cosmic')) {
      violations.push('FORCED_CIRCULAR_AVATAR: Circular avatar used instead of grammar-driven portrait plate');
      penalty += 15;
    }

    // 2. Check for Generic 3-Column Card Grid Monopolies
    if (lowerHtml.includes('grid-template-columns: repeat(3,') || lowerHtml.includes('grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))')) {
      if (lowerHtml.includes('class="project-card"') && !lowerHtml.includes('storytelling-') && !lowerHtml.includes('cosmic')) {
        violations.push('GENERIC_CARD_GRID: Legacy 3-column card grid detected without storytelling grammar');
        penalty += 25;
      }
    }

    // 3. Check for Universal Centered Top Navbar Assumption
    if (lowerHtml.includes('<nav class="top-nav"') && lowerHtml.includes('justify-content: space-between') && iaId === 'split-screen-dossier') {
      violations.push('UNIVERSAL_TOP_NAV: Top navigation rendered on a vertical dossier layout');
      penalty += 20;
    }

    // 4. Check for Unmotivated Purple/Indigo AI Gradients
    if (lowerCss.includes('linear-gradient(135deg, #6366f1, #a855f7)') || lowerCss.includes('#8b5cf6')) {
      if (universeId !== 'futuristic-spatial' && universeId !== 'cosmic-astronaut-holographic') {
        violations.push('PURPLE_AI_SLOP_GRADIENT: Cliché purple/indigo AI gradient detected');
        penalty += 20;
      }
    }

    // 5. Check for Repeated Pill Skill Tags across Non-Pill Universes
    if (lowerHtml.includes('class="skill-tag"') && lowerHtml.includes('border-radius: var(--radius)') && universeId.includes('editorial')) {
      violations.push('REPEATED_PILL_TAGS: Pill skill tags rendered in Editorial Monograph universe');
      penalty += 15;
    }

    // 6. Check for Raw Localhost or Internal Hardcoded Dev URLs
    if (lowerHtml.includes('http://localhost:') || lowerHtml.includes('http://127.0.0.1:')) {
      violations.push('LEAKED_INTERNAL_URLS: Leaked localhost development URLs found in rendered output');
      penalty += 30;
    }

    const score = Math.max(0, 100 - penalty);
    const pass = violations.length === 0 && score >= 90;

    return {
      pass,
      score,
      violations
    };
  }
}

module.exports = { LegacyVibeDetector };

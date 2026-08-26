/**
 * Visual World Constitution & World Rules (Phase 28)
 * Establishes immutable visual world rules for each Art Direction profile,
 * ensuring complete internal aesthetic coherence across all visual dimensions.
 */

const { ART_DIRECTION_PROFILES } = require('./art-direction-profiles');

class VisualWorld {
  /**
   * Returns the visual world definition for a given Art Direction profile ID
   * @param {string} profileId
   */
  static getWorld(profileId = 'swiss-international-poster') {
    const profile = ART_DIRECTION_PROFILES[profileId] || ART_DIRECTION_PROFILES['swiss-international-poster'];

    return {
      profileId: profile.id,
      name: profile.name,
      artifactGenre: profile.artifactGenre,
      geometry: {
        pageGeometry: profile.pageGeometry,
        alignment: profile.alignmentPhilosophy,
        focalPoint: profile.visualFocalPoint
      },
      surfaces: {
        backgroundStrategy: profile.backgroundStrategy,
        borderLanguage: profile.borderLanguage,
        decorations: profile.decorativeLanguage
      },
      typography: {
        behavior: profile.typographyBehavior,
        density: profile.contentDensity,
        whitespace: profile.whitespacePhilosophy
      },
      navigation: {
        behavior: profile.navigationBehavior,
        footer: profile.footerBehavior
      },
      projects: {
        model: profile.projectStorytelling,
        mediaTreatment: profile.imageMediaTreatment,
        cta: profile.ctaTreatment
      },
      motion: {
        philosophy: profile.motionPhilosophy,
        interaction: profile.interactionPhilosophy,
        mobile: profile.mobileTransformation
      }
    };
  }

  /**
   * Validates whether a rendered site or brief strictly adheres to its chosen Visual World
   * @param {Object} site - Rendered site with brief/html
   * @param {string} profileId - Art direction profile ID
   * @returns {{ coherent: boolean, score: number, findings: Array }}
   */
  static validateWorldCoherence(site = {}, profileId = 'swiss-international-poster') {
    const world = this.getWorld(profileId);
    const html = site.html || '';
    const brief = site.designBrief || {};
    const findings = [];
    let score = 100;

    // 1. Prohibit monolithic card fallbacks across all worlds
    if (html.includes('class="project-card"')) {
      score -= 30;
      findings.push('CRITICAL: Generic project-card fallback detected, violating visual world constitution.');
    }

    // 2. World-Specific Constraints
    if (profileId === 'terminal-systems-interface' && html.includes('border-radius: 24px')) {
      score -= 20;
      findings.push('Pill-shaped 24px radius violates UNIX terminal monospace world rules.');
    }

    if (profileId === 'brutalist-archive' && html.includes('box-shadow: 0 20px 40px')) {
      score -= 15;
      findings.push('Soft blurred drop-shadows violate raw brutalist world rules.');
    }

    if (profileId === 'minimalist-art-book' && html.includes('background: linear-gradient(135deg')) {
      score -= 15;
      findings.push('Vibrant multi-stop gradients violate silent minimalist white-cube world rules.');
    }

    return {
      coherent: score >= 85,
      score: Math.max(0, score),
      findings
    };
  }
}

module.exports = { VisualWorld };

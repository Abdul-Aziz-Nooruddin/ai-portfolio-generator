/**
 * Visual World Distance Calculator (Phase 28)
 * Calculates true human-perceived visual distance between two portfolios
 * across 11 weighted aesthetic and compositional dimensions.
 */

class VisualWorldDistance {
  /**
   * Calculates perceptual visual distance between Site A and Site B
   * @param {Object} siteA - { artDirection, macroDirective, iaModel, layoutGrammar, projectStrategy, typography, color, motion }
   * @param {Object} siteB
   * @returns {{ distance: number, collision: boolean, dimensionDistances: Object }}
   */
  static calculateDistance(siteA = {}, siteB = {}) {
    const briefA = siteA.designBrief || siteA;
    const briefB = siteB.designBrief || siteB;

    const adA = briefA.artDirection?.id || briefA.macroDirective?.id || '';
    const adB = briefB.artDirection?.id || briefB.macroDirective?.id || '';

    const iaA = briefA.informationArchitecture?.modelId || '';
    const iaB = briefB.informationArchitecture?.modelId || '';

    const layoutA = briefA.layoutGrammar?.layoutId || '';
    const layoutB = briefB.layoutGrammar?.layoutId || '';

    const typeA = briefA.typography?.systemId || '';
    const typeB = briefB.typography?.systemId || '';

    const projectA = briefA.projectStorytelling?.strategyId || '';
    const projectB = briefB.projectStorytelling?.strategyId || '';

    const universeA = briefA.visualUniverse?.universeId || '';
    const universeB = briefB.visualUniverse?.universeId || '';

    const motionA = briefA.motion?.languageId || '';
    const motionB = briefB.motion?.languageId || '';

    // Calculate individual dimension distances (0 = identical, 1 = completely distinct)
    const dGeometry = (adA !== adB ? 0.6 : 0) + (layoutA !== layoutB ? 0.4 : 0);
    const dHierarchy = iaA !== iaB ? 1.0 : 0.0;
    const dTypography = typeA !== typeB ? 1.0 : (adA !== adB ? 0.5 : 0.0);
    const dSpacing = adA !== adB ? 1.0 : 0.0;
    const dProject = projectA !== projectB ? 1.0 : (adA !== adB ? 0.5 : 0.0);
    const dNav = adA !== adB ? 1.0 : 0.0;
    const dSurface = universeA !== universeB ? 1.0 : (adA !== adB ? 0.5 : 0.0);
    const dColor = universeA !== universeB ? 1.0 : 0.0;
    const dMotion = motionA !== motionB ? 1.0 : 0.0;
    const dInteraction = adA !== adB ? 1.0 : 0.0;
    const dDecorations = adA !== adB ? 1.0 : 0.0;

    // Weighted Formula:
    // macro geometry (20%) + hierarchy (15%) + typography (10%) + spacing (10%) +
    // project storytelling (15%) + nav (5%) + surface (5%) + color (5%) + motion (5%) +
    // interaction (5%) + decorations (5%) = 100%
    const totalDistance = (
      (dGeometry * 0.20) +
      (dHierarchy * 0.15) +
      (dTypography * 0.10) +
      (dSpacing * 0.10) +
      (dProject * 0.15) +
      (dNav * 0.05) +
      (dSurface * 0.05) +
      (dColor * 0.05) +
      (dMotion * 0.05) +
      (dInteraction * 0.05) +
      (dDecorations * 0.05)
    );

    // If total distance is < 0.25, the human brain perceives them as the exact same template family
    const isTemplateFamilyCollision = totalDistance < 0.25;

    return {
      distance: Number(totalDistance.toFixed(3)),
      isTemplateFamilyCollision,
      dimensionDistances: {
        macroGeometry: dGeometry,
        hierarchy: dHierarchy,
        typography: dTypography,
        spacing: dSpacing,
        projectStorytelling: dProject,
        navigation: dNav,
        surface: dSurface,
        color: dColor,
        motion: dMotion,
        interaction: dInteraction,
        decorations: dDecorations
      }
    };
  }
}

module.exports = { VisualWorldDistance };

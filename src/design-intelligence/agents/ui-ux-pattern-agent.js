/**
 * UI/UX Pattern Agent
 * Determines navigation models, information hierarchy, usability rules,
 * touch accessibility, and density to prevent visually impressive but unusable interfaces.
 */

class UIUXPatternAgent {
  async execute(contentProfile, researchReport = {}, context = {}) {
    const signals = contentProfile.signals || {};
    const projectCount = contentProfile.projects.length;

    // Determine Information Density
    let density = 'balanced';
    if (signals.technicalDepth === 'deep' || signals.projectDepth === 'deep') {
      density = 'high';
    } else if (signals.narrativeDepth === 'compact' && projectCount <= 2) {
      density = 'spacious';
    }

    // Determine Navigation Strategy mapped to layout context
    const navMap = {
      'split-screen-dossier': 'persistent-dossier-index',
      'work-first-runway': 'top-snapped-track',
      'horizontal-exhibition': 'floating-pill-dock',
      'spatial-3d-stage': 'spatial-orbit-controls',
      'computational-terminal': 'terminal-command-dock',
      'asymmetric-bento-canvas': 'asymmetric-corner-nav',
      'editorial-monograph': 'editorial-sidebar-rail',
      'minimal-single-screen': 'minimal-footer-anchor',
      'magazine-spread-columns': 'magazine-header-bar',
      'narrative-timeline': 'timeline-milestone-nav'
    };

    const targetLayout = context.layout || context.layoutId || '';
    let navigation = navMap[targetLayout] || (density === 'high' ? 'persistent-dossier-index' : 'sticky-minimal-bar');

    // Determine Interaction Model
    let interactionModel = 'scroll-guided-reveal';
    if (signals.interactionPotential === 'high') {
      interactionModel = 'interactive-spatial-nodes';
    } else if (signals.primaryAngle === 'computational_depth') {
      interactionModel = 'command-palette-and-live-logs';
    }

    const accessibilityRules = [
      'WCAG AAA minimum 4.5:1 text contrast ratio',
      'Visible focus outlines on all interactive links and buttons',
      'Keyboard tab-navigation order matching visual reading flow',
      'Semantic header hierarchy (one h1, contextual h2/h3)',
      'Respects prefers-reduced-motion media queries'
    ];

    const responsiveStrategy = {
      desktop: 'Full asymmetric grid or split-screen dossier',
      tablet: 'Collapsible single-column with persistent header',
      mobile: 'Vertical scroll runway with touch-snapped action bars'
    };

    const userJourney = [
      'Immediate Hook: Proof of expertise in first 3 seconds',
      'Exploration: High-signal case studies with tangible evidence',
      'Validation: Verified technical capabilities and career milestones',
      'Action: Direct, friction-free contact point'
    ];

    return {
      agent: 'ui-ux-pattern-agent',
      decision: {
        navigation,
        interactionModel,
        responsiveStrategy,
        accessibilityRules,
        density,
        userJourney
      },
      reasoning_summary: `Selected '${navigation}' navigation and '${density}' density to optimize usability for ${projectCount} projects.`,
      confidence: 0.94,
      recommendations: {
        navigation,
        interactionModel,
        density
      },
      constraints: accessibilityRules,
      evidence: [
        `Density calculated from technicalDepth: ${signals.technicalDepth}`,
        `Navigation aligned with projectCount: ${projectCount}`
      ]
    };
  }
}

module.exports = { UIUXPatternAgent };

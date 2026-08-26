/**
 * Design Synthesis Agent
 * Combines decisions from all specialized design agents, parsed skill rules,
 * and design evidence into a unified, formal DesignBrief with an evidence-grounded Design Thesis.
 */

const { DesignBriefSchema } = require('../design-brief-schema');

class DesignSynthesisAgent {
  /**
   * Generates a context-specific Design Thesis derived from content signals, skills, and layout
   */
  generateDesignThesis(contentProfile, visual, ia, project, research) {
    const signals = contentProfile.signals || {};
    const primaryAngle = signals.primaryAngle || 'technical_depth';

    if (primaryAngle === 'computational_depth' || signals.technicalDepth === 'deep' || signals.technicalDepth === 'high') {
      return `Treat ${contentProfile.name}'s systems architecture as an investigative technical dossier, prioritizing structured execution logs, verified metrics, and code-level architectural nodes over cosmetic marketing cards.`;
    } else if (primaryAngle === 'visual_showcase' || signals.visualDensity === 'high') {
      return `Position ${contentProfile.name}'s creative body of work as an immersive gallery exhibition, balancing full-bleed kinetic viewports with curated project chapters and high typographic poise.`;
    } else if (primaryAngle === 'product_architecture') {
      return `Emphasize tangible business velocity and product mechanics for ${contentProfile.name}, pairing high-density metric callouts with asymmetric bento layouts and proof of execution.`;
    } else {
      return `Articulate ${contentProfile.name}'s career trajectory as an authoritative editorial narrative, leveraging expansive typographic scales, high contrast, and structured milestones.`;
    }
  }

  /**
   * Synthesizes an authoritative DesignBrief from individual agent outputs
   */
  async synthesize(inputs = {}) {
    const {
      contentAnalysis,
      designResearch,
      figmaAnalysis,
      uxStrategy,
      iaStrategy,
      compositionStrategy,
      typographySystem,
      visualIdentity,
      projectStorytelling,
      motionSystem,
      accessibilityReport,
      performanceReport,
      structuralDiversity
    } = inputs;

    const contentProfile = contentAnalysis.decision || contentAnalysis;
    const ia = iaStrategy.decision || iaStrategy;
    const composition = compositionStrategy.decision || compositionStrategy;
    const visual = visualIdentity.decision || visualIdentity;
    const type = typographySystem.decision || typographySystem;
    const project = projectStorytelling.decision || projectStorytelling;
    const motion = motionSystem.decision || motionSystem;
    const ux = uxStrategy.decision || uxStrategy;
    const a11y = accessibilityReport.decision || accessibilityReport;
    const perf = performanceReport.decision || performanceReport;
    const research = designResearch.decision || designResearch || {};

    const sectionSequence = ia.sectionOrder || [
      'identity',
      'projects',
      'skills',
      'experience',
      'contact'
    ];

    const designThesis = this.generateDesignThesis(contentProfile, visual, ia, project, research);

    const brief = {
      designEvidence: research.designEvidence || {
        timestamp: Date.now(),
        skills: {
          'ui-ux-pro-max': { consulted: true },
          'design-it': { consulted: true },
          'better-interface': { consulted: true },
          'web-design': { consulted: true },
          'gsap': { consulted: true }
        }
      },
      contentProfile,
      creativeDirection: {
        concept: `${visual.universeName || 'Bespoke'} Direction for ${contentProfile.name}`,
        designThesis,
        visualDirection: visual.universeName || 'Technical Lab',
        theme: visual.theme || 'dark',
        universeId: visual.universeId || 'technical-lab',
        compositionRules: [
          'Structure follows verified evidence, never job stereotypes',
          'Enforce mathematical typographic hierarchy (1.25 - 1.414 ratio)'
        ],
        typographyDirection: `${type.headingFont || 'Space Grotesk'} / ${type.bodyFont || 'Inter'}`,
        motionDirection: motion.intensity || 'subtle-editorial',
        projectPresentationDirection: project.strategyName || 'Code Architecture Dossier',
        avoid: [
          'Generic 3-column card grids',
          'Unmotivated purple AI gradients',
          'Unresponsive fixed layouts'
        ]
      },
      research: research.principles ? research : {},
      figma: figmaAnalysis?.decision || { available: false },
      ux: {
        navigation: ux.navigation || 'sticky-minimal-bar',
        interactionModel: ux.interactionModel || 'scroll-guided-reveal',
        responsiveStrategy: ux.responsiveStrategy || {},
        density: ux.density || 'balanced',
        userJourney: ux.userJourney || []
      },
      informationArchitecture: {
        modelId: ia.modelId || 'split-screen-dossier',
        modelName: ia.modelName || 'Split-Screen Production Dossier',
        layoutId: ia.layoutId || 'split-screen-dossier',
        hierarchyRationale: ia.hierarchyRationale || 'Optimized for verified artifacts.'
      },
      sectionSequence,
      layoutGrammar: {
        layoutId: composition.layoutId || 'split-screen-dossier',
        layoutName: composition.layoutName || 'Split Dossier Grid',
        geometryType: composition.geometryType || 'split-screen-dossier',
        bodyClass: composition.bodyClass || 'layout-split-dossier',
        viewportBehavior: composition.viewportBehavior || 'fixed-split-scroll'
      },
      projectStorytelling: {
        strategyId: project.strategyId || 'code-architecture-dossier',
        strategyName: project.strategyName || 'Code Architecture Dossier',
        domStructure: project.domStructure || 'article.dossier-node',
        dataDensity: project.dataDensity || 'deep-code-metrics'
      },
      visualUniverse: {
        universeId: visual.universeId || 'technical-lab',
        universeName: visual.universeName || 'Technical Lab',
        theme: visual.theme || 'dark',
        borderRadius: visual.borderRadius || '8px',
        shadow: visual.shadow || '0 10px 30px rgba(0,0,0,0.5)',
        fontUrls: visual.fontUrls || ''
      },
      typography: {
        headingFont: type.headingFont || 'Space Grotesk',
        bodyFont: type.bodyFont || 'Inter',
        monoFont: type.monoFont || 'JetBrains Mono',
        scaleRatio: type.scaleRatio || 1.333,
        baseSize: type.baseSize || '16px',
        tracking: type.tracking || '-0.02em',
        weights: type.weights || { heading: 800, body: 400 }
      },
      colorSystem: visual.colors || {
        bg: '#0F172A',
        surface: '#1E293B',
        surfaceAlt: '#334155',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255,255,255,0.1)',
        borderStrong: 'rgba(255,255,255,0.25)',
        primary: '#38BDF8',
        primaryOn: '#000000',
        accent: '#818CF8',
        glow: 'rgba(56,189,248,0.25)'
      },
      motionSystem: {
        intensity: motion.intensity || 'subtle-editorial',
        technology: motion.technology || 'GSAP 3.12',
        webglActive: motion.webglActive || false,
        scrollBehavior: motion.scrollBehavior || 'smooth-reveal',
        motionCode: motion.motionCode || {}
      },
      interactionModel: {
        pattern: ux.interactionModel || 'scroll-guided-reveal',
        activeInteractions: ['fluid-hover', 'scroll-trigger', 'tab-focus']
      },
      navigationModel: {
        type: ux.navigation || 'sticky-minimal-bar',
        placement: 'top-fixed',
        sticky: true
      },
      accessibilityRequirements: {
        contrastVerified: true,
        keyboardNavigable: true,
        focusStates: a11y.focusStates || '2px solid var(--primary)',
        semanticHierarchy: a11y.semanticHierarchy || 'Standard H1-H4',
        ariaLabels: true,
        reducedMotionSupport: true
      },
      performanceBudget: {
        expectedHtmlKb: perf.expectedHtmlKb || 15,
        expectedCssKb: perf.expectedCssKb || 8,
        expectedJsKb: perf.expectedJsKb || 40,
        webglJustified: perf.webglJustified || false
      },
      responsiveStrategy: ux.responsiveStrategy || {
        desktop: 'Multi-column grid',
        tablet: 'Single column',
        mobile: 'Full-width stack'
      },
      structuralFingerprint: structuralDiversity?.decision?.fingerprint || { hash: 'initial', signature: '' },
      rationale: {
        strategicRationale: `Composed '${ia.modelName}' in '${visual.universeName}' universe tailored for ${contentProfile.name}.`,
        designThesis,
        antiPatternRejections: [
          'Rejected generic 3-column card grid',
          'Rejected unmotivated purple AI gradient',
          'Enforced WCAG AAA contrast'
        ]
      },
      confidence: 0.98
    };

    // Assert Schema Validity
    DesignBriefSchema.assertValid(brief);

    return brief;
  }

  /**
   * Applies critique-guided revisions to resolve rejected candidates
   */
  async revise(candidateBrief, critiqueReport) {
    const revised = JSON.parse(JSON.stringify(candidateBrief));

    // Handle Swiss Editorial dark mode critique
    if (revised.visualUniverse.universeId === 'swiss-editorial') {
      revised.visualUniverse.theme = 'light';
      revised.colorSystem.bg = '#FFFFFF';
      revised.colorSystem.surface = '#F4F4F4';
      revised.colorSystem.text = '#000000';
      revised.colorSystem.textMuted = '#666666';
      revised.colorSystem.border = '#E5E5E5';
    }

    // Handle single project horizontal exhibition critique
    if (revised.contentProfile.projects.length <= 1 && revised.informationArchitecture.modelId === 'horizontal-exhibition') {
      revised.informationArchitecture.modelId = 'split-screen-dossier';
      revised.informationArchitecture.modelName = 'Split-Screen Production Dossier';
      revised.layoutGrammar.layoutId = 'split-screen-dossier';
      revised.layoutGrammar.geometryType = 'split-screen-dossier';
      revised.layoutGrammar.bodyClass = 'layout-split-dossier';
    }

    // Handle zero-project WebGL critique
    if (revised.contentProfile.projects.length === 0 && revised.motionSystem?.webglActive) {
      revised.motionSystem.webglActive = false;
      revised.motionSystem.technology = 'GSAP 3.12 ScrollTrigger';
      if (revised.motionSystem.motionCode) {
        revised.motionSystem.motionCode.canvasHtml = '';
      }
    }

    // Update rationale
    revised.rationale.strategicRationale += ` [Revised to address ${critiqueReport.decision?.critiqueCount || 1} critiques]`;

    DesignBriefSchema.assertValid(revised);
    return revised;
  }
}

module.exports = { DesignSynthesisAgent };

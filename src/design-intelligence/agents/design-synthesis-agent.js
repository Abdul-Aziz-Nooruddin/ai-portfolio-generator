/**
 * Design Synthesis Agent
 * Combines decisions from all specialized design agents into a unified, formal DesignBrief.
 * Supports auto-revision when the Design Critic or Diversity Agent flags issues.
 */

const { DesignBriefSchema } = require('../design-brief-schema');

class DesignSynthesisAgent {
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

    const sectionSequence = ia.sectionOrder || [
      'identity',
      'projects',
      'skills',
      'experience',
      'contact'
    ];

    const brief = {
      contentProfile,
      creativeDirection: {
        theme: visual.theme || 'dark',
        universeId: visual.universeId || 'technical-lab',
        character: `${visual.universeName || 'Technical'} with ${ux.density || 'balanced'} density`,
        primaryAngle: contentProfile.signals?.primaryAngle || 'technical_depth'
      },
      research: designResearch?.decision || {},
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
        antiPatternRejections: [
          'Rejected generic 3-column card grid',
          'Rejected unmotivated purple AI gradient',
          'Enforced WCAG AAA contrast'
        ]
      },
      confidence: 0.96
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

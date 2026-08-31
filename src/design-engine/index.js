/**
 * Generative Design Engine (Phase 36)
 * Consumes the formal DesignBrief produced by the Design Intelligence Ecosystem.
 * The CompositionPlan inside DesignBrief is the SINGLE SOURCE OF TRUTH for runtime composition.
 * 
 * Strict Gate Policy: Direct invocation without a valid DesignBrief is blocked in production.
 */

const { ContentAnalyzer } = require('./content-analyzer');
const { IAComposer, IA_MODELS } = require('./ia-composer');
const { LayoutGrammar, LAYOUT_GRAMMARS } = require('./layout-grammar');
const { VisualGrammar, VISUAL_UNIVERSES } = require('./visual-grammar');
const { WebGLMotion } = require('./webgl-motion');
const { StructuralMemory } = require('./structural-memory');
const { HtmlRenderer } = require('./html-renderer');
const { CompositionPlan } = require('./composition-plan');

class DesignEngine {
  constructor() {
    this.memory = new StructuralMemory(50);
  }

  /**
   * Generates a portfolio adhering strictly to the provided DesignBrief or context
   * @param {Object} userData - User content or ContentProfile
   * @param {Object} designBriefOrOptions - Formal DesignBrief or generation options
   */
  async generatePortfolio(userData = {}, designBriefOrOptions = {}) {
    let contentProfile = userData.signals ? userData : ContentAnalyzer.analyze(userData);
    let iaModel = null;
    let layoutGrammar = null;
    let visualUniverse = null;
    let projectStrategy = null;
    let motion = null;
    let designBrief = null;

    // 1. Check if a formal DesignBrief was provided directly from Design Intelligence
    if (designBriefOrOptions && designBriefOrOptions.informationArchitecture) {
      designBrief = designBriefOrOptions;
      const iaId = designBrief.informationArchitecture.modelId;
      const layoutId = designBrief.layoutGrammar?.layoutId || iaId;
      const universeId = designBrief.visualUniverse?.universeId;
      const strategyId = designBrief.projectStorytelling?.strategyId;

      iaModel = IA_MODELS[iaId] || IA_MODELS['split-screen-dossier'];
      if (Array.isArray(designBrief.sectionSequence)) {
        iaModel = { ...iaModel, sectionOrder: designBrief.sectionSequence };
      }

      layoutGrammar = LayoutGrammar.getGrammar(layoutId);
      
      const baseUniverse = VISUAL_UNIVERSES[universeId] || VISUAL_UNIVERSES['technical-lab'];
      visualUniverse = {
        ...baseUniverse,
        id: baseUniverse.id || universeId,
        theme: designBrief.visualUniverse?.theme || baseUniverse.theme,
        colors: designBrief.colorSystem ? { ...baseUniverse.colors, ...designBrief.colorSystem } : baseUniverse.colors,
        headingFont: designBrief.typography?.headingFont || baseUniverse.headingFont,
        bodyFont: designBrief.typography?.bodyFont || baseUniverse.bodyFont,
        monoFont: designBrief.typography?.monoFont || baseUniverse.monoFont
      };

      projectStrategy = strategyId || (iaModel.id === 'editorial-monograph' ? 'magazine-editorial-chapter' : 'code-architecture-dossier');
      motion = designBrief.motionSystem?.motionCode && Object.keys(designBrief.motionSystem.motionCode).length > 0
        ? designBrief.motionSystem.motionCode
        : WebGLMotion.getMotionCode(visualUniverse, iaModel);
    } else {
      // 2. Production Bypass Guard
      if (!designBriefOrOptions.allowInternalTestMode) {
        throw new Error('[DESIGN ENGINE BLOCKED] Direct invocation without a valid DesignBrief is prohibited in production. Pass candidate through SiteGenerator / DesignGate first.');
      }

      // Internal test fallback loop with CompositionPlan compilation
      const recentHistory = this.memory.getRecentHistory();
      for (let attempt = 0; attempt < 5; attempt++) {
        const selectedIa = IAComposer.selectModel(contentProfile, designBriefOrOptions.layout, recentHistory);
        const selectedLayout = LayoutGrammar.getGrammar(selectedIa.layoutId);
        const selectedUniverse = VisualGrammar.selectUniverse(contentProfile, designBriefOrOptions.mode);
        const selectedStrategy = designBriefOrOptions.projectStrategy || selectedIa.defaultStorytelling;

        const proposed = {
          iaModel: selectedIa,
          layoutGrammar: selectedLayout,
          visualUniverse: selectedUniverse,
          projectStrategy: selectedStrategy
        };

        if (!this.memory.isRepetitive(proposed) || attempt === 4) {
          iaModel = selectedIa;
          layoutGrammar = selectedLayout;
          visualUniverse = selectedUniverse;
          projectStrategy = selectedStrategy;
          break;
        }
      }

      motion = WebGLMotion.getMotionCode(visualUniverse, iaModel);
    }

    // 3. Compile Authoritative CompositionPlan
    const compositionPlan = designBrief?.compositionPlan || CompositionPlan.buildPlan(contentProfile, {
      universeId: visualUniverse.id,
      pageTopology: layoutGrammar.id,
      projectStrategy,
      sectionSequence: iaModel.sectionOrder
    }, this.memory.getRecentHistory());

    // 4. Render HTML/CSS/JS Output via Pure CompositionPlan Execution
    const rendered = HtmlRenderer.render(
      contentProfile,
      iaModel,
      layoutGrammar,
      visualUniverse,
      projectStrategy,
      motion,
      compositionPlan
    );

    // 5. Record in Structural Memory
    this.memory.record({
      iaModel,
      layoutGrammar,
      visualUniverse,
      projectStrategy
    });

    return {
      html: typeof rendered === 'string' ? rendered : (rendered?.html || ''),
      css: typeof rendered === 'string' ? '' : (rendered?.css || ''),
      js: typeof rendered === 'string' ? (motion?.js || '') : (rendered?.js || ''),
      compositionPlan,
      designBlueprint: {
        iaModel: iaModel.id,
        layoutGrammar: layoutGrammar.id,
        visualUniverse: visualUniverse.id,
        projectStrategy,
        sectionOrder: iaModel.sectionOrder
      },
      contentProfile: contentProfile,
      designBrief
    };
  }
}

module.exports = {
  DesignEngine,
  ContentAnalyzer,
  IAComposer,
  LayoutGrammar,
  VisualGrammar,
  WebGLMotion,
  StructuralMemory,
  HtmlRenderer,
  CompositionPlan,
  IA_MODELS,
  LAYOUT_GRAMMARS,
  VISUAL_UNIVERSES
};

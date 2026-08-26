/**
 * Generative Design Engine
 * Consumes the formal DesignBrief produced by the Design Intelligence Ecosystem.
 * The DesignBrief is the SINGLE SOURCE OF TRUTH for information architecture,
 * layout grammar, project storytelling, and visual universe.
 */

const { ContentAnalyzer } = require('./content-analyzer');
const { IAComposer, IA_MODELS } = require('./ia-composer');
const { LayoutGrammar, LAYOUT_GRAMMARS } = require('./layout-grammar');
const { VisualGrammar, VISUAL_UNIVERSES } = require('./visual-grammar');
const { WebGLMotion } = require('./webgl-motion');
const { StructuralMemory } = require('./structural-memory');
const { HtmlRenderer } = require('./html-renderer');

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
      // If sectionOrder was customized by IA Agent, apply it
      if (Array.isArray(designBrief.sectionSequence)) {
        iaModel = { ...iaModel, sectionOrder: designBrief.sectionSequence };
      }

      layoutGrammar = LayoutGrammar.getGrammar(layoutId);
      
      const baseUniverse = VISUAL_UNIVERSES[universeId] || VISUAL_UNIVERSES['technical-lab'];
      visualUniverse = {
        ...baseUniverse,
        theme: designBrief.visualUniverse.theme || baseUniverse.theme,
        colors: designBrief.colorSystem ? { ...baseUniverse.colors, ...designBrief.colorSystem } : baseUniverse.colors,
        headingFont: designBrief.typography?.headingFont || baseUniverse.headingFont,
        bodyFont: designBrief.typography?.bodyFont || baseUniverse.bodyFont,
        monoFont: designBrief.typography?.monoFont || baseUniverse.monoFont
      };

      projectStrategy = strategyId || iaModel.defaultStorytelling;
      motion = designBrief.motionSystem?.motionCode && Object.keys(designBrief.motionSystem.motionCode).length > 0
        ? designBrief.motionSystem.motionCode
        : WebGLMotion.getMotionCode(visualUniverse, iaModel);
    } else {
      // 2. Multi-Candidate Generation Loop with Structural Anti-Repetition
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

    // 3. Render HTML/CSS/JS Output adhering strictly to DesignBrief
    const rendered = HtmlRenderer.render(
      contentProfile,
      iaModel,
      layoutGrammar,
      visualUniverse,
      projectStrategy,
      motion
    );

    // 4. Record in Structural Memory
    this.memory.record({
      iaModel,
      layoutGrammar,
      visualUniverse,
      projectStrategy
    });

    return {
      html: rendered.html,
      css: rendered.css,
      js: rendered.js,
      designBlueprint: {
        iaModel: iaModel.id,
        layoutGrammar: layoutGrammar.id,
        visualUniverse: visualUniverse.id,
        projectStrategy,
        sectionOrder: iaModel.sectionOrder
      },
      contentProfile: contentProfile.signals,
      designBrief
    };
  }
}

const { DesignAgentOrchestrator } = require('./design-agent-orchestrator');

module.exports = {
  DesignEngine,
  DesignAgentOrchestrator,
  ContentAnalyzer,
  IAComposer,
  LayoutGrammar,
  VisualGrammar,
  WebGLMotion,
  StructuralMemory,
  HtmlRenderer,
  IA_MODELS,
  LAYOUT_GRAMMARS,
  VISUAL_UNIVERSES
};

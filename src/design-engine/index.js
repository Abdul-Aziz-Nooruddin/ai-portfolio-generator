/**
 * Generative Design Engine
 * Coordinates Content Intelligence, Information Architecture, Spatial Layout Grammar,
 * Project Storytelling, Coherent Visual Universes, and Structural Anti-Repetition.
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

  async generatePortfolio(userData = {}, options = {}) {
    // 1. Content Intelligence Analysis
    const contentProfile = ContentAnalyzer.analyze(userData);

    // 2. Multi-Candidate Generation Loop with Structural Anti-Repetition
    let candidate = null;
    const recentHistory = this.memory.getRecentHistory();

    for (let attempt = 0; attempt < 5; attempt++) {
      const iaModel = IAComposer.selectModel(contentProfile, options.layout, recentHistory);
      const layoutGrammar = LayoutGrammar.getGrammar(iaModel.layoutId);
      const visualUniverse = VisualGrammar.selectUniverse(contentProfile, options.mode);
      const projectStrategy = options.projectStrategy || iaModel.defaultStorytelling;

      const proposed = {
        iaModel,
        layoutGrammar,
        visualUniverse,
        projectStrategy
      };

      if (!this.memory.isRepetitive(proposed) || attempt === 4) {
        candidate = proposed;
        break;
      }
    }

    // 3. WebGL Motion & Interactivity Strategy
    const motion = WebGLMotion.getMotionCode(candidate.visualUniverse, candidate.iaModel);

    // 4. Render HTML/CSS/JS Output
    const rendered = HtmlRenderer.render(
      contentProfile,
      candidate.iaModel,
      candidate.layoutGrammar,
      candidate.visualUniverse,
      candidate.projectStrategy,
      motion
    );

    // 5. Record in Structural Memory
    this.memory.record(candidate);

    return {
      html: rendered.html,
      css: rendered.css,
      js: rendered.js,
      designBlueprint: {
        iaModel: candidate.iaModel.id,
        layoutGrammar: candidate.layoutGrammar.id,
        visualUniverse: candidate.visualUniverse.id,
        projectStrategy: candidate.projectStrategy,
        sectionOrder: candidate.iaModel.sectionOrder
      },
      contentProfile: contentProfile.signals
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
  IA_MODELS,
  LAYOUT_GRAMMARS,
  VISUAL_UNIVERSES
};

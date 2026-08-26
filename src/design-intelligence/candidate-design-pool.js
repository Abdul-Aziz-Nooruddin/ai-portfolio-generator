/**
 * Candidate Design Pool & Decoupled Architectural Composer
 * Generates and scores diverse candidate configurations across 15 design dimensions.
 * Decouples Information Architecture from Layout Geometry via compatibility matrices.
 * Evaluates candidate pools against Multi-Factor Diversity & Quality Scoring.
 */

const { IA_MODELS } = require('../design-engine/ia-composer');
const { LAYOUT_GRAMMARS } = require('../design-engine/layout-grammar');
const { VISUAL_UNIVERSES } = require('../design-engine/visual-grammar');
const { TYPOGRAPHY_SYSTEMS, TypographyEngine } = require('../design-engine/typography-systems');
const { COLOR_PALETTES, ColorEngine } = require('../design-engine/color-palettes');
const { MOTION_LANGUAGES, MotionEngine } = require('../design-engine/motion-profiles');

const { MACRO_DIRECTIVES, MacroDirectiveManager } = require('../design-engine/macro-design-directives');
const { PROJECT_STORYTELLING_SYSTEMS } = require('../design-engine/project-storytelling-constitution');

class CandidateDesignPool {
  /**
   * Compatibility matrix decoupling IA Models from Layout Grammars
   */
  static getCompatibleLayouts(iaModelId) {
    const matrix = {
      'split-screen-dossier': ['split-screen-dossier', 'asymmetric-bento-canvas', 'work-first-runway', 'computational-terminal'],
      'work-first-runway': ['work-first-runway', 'horizontal-exhibition', 'split-screen-dossier', 'magazine-spread-columns'],
      'horizontal-exhibition': ['horizontal-exhibition', 'work-first-runway', 'asymmetric-bento-canvas'],
      'editorial-monograph': ['editorial-monograph', 'magazine-spread-columns', 'narrative-timeline', 'split-screen-dossier'],
      'computational-terminal': ['computational-terminal', 'split-screen-dossier', 'asymmetric-bento-canvas'],
      'spatial-3d-stage': ['spatial-3d-stage', 'asymmetric-bento-canvas', 'work-first-runway'],
      'narrative-timeline': ['narrative-timeline', 'editorial-monograph', 'split-screen-dossier', 'work-first-runway'],
      'minimal-single-screen': ['minimal-single-screen', 'editorial-monograph', 'split-screen-dossier'],
      'asymmetric-bento-canvas': ['asymmetric-bento-canvas', 'split-screen-dossier', 'magazine-spread-columns'],
      'magazine-spread-columns': ['magazine-spread-columns', 'editorial-monograph', 'asymmetric-bento-canvas', 'work-first-runway']
    };

    return matrix[iaModelId] || Object.keys(LAYOUT_GRAMMARS);
  }

  /**
   * Expanded Visual Universe pool based on content signals
   */
  static getCompatibleUniverses(contentProfile) {
    const signals = contentProfile.signals || {};
    const allUniverses = Object.keys(VISUAL_UNIVERSES);

    if (signals.visualDensity === 'high') {
      return ['contemporary-magazine', 'futuristic-spatial', 'monochrome-gallery', 'expressive-typographic', 'brutalist-pop', 'luxury-minimal'];
    } else if (signals.technicalDepth === 'high' || signals.technicalDepth === 'deep') {
      // Expanded technical pool (7 distinct universes instead of 4)
      return ['technical-lab', 'swiss-editorial', 'cinematic-obsidian', 'brutalist-pop', 'futuristic-spatial', 'monochrome-gallery', 'expressive-typographic'];
    } else if (signals.narrativeDepth === 'high') {
      return ['warm-editorial', 'contemporary-magazine', 'luxury-minimal', 'swiss-editorial', 'editorial-monograph', 'monochrome-gallery'];
    }

    return allUniverses;
  }

  /**
   * Generates a pool of candidate configurations and selects the highest scoring candidate
   */
  static generateCandidates(contentProfile, recentHistory = [], skillEvidence = null, context = {}) {
    const compatibleUniverses = this.getCompatibleUniverses(contentProfile);
    const allIaIds = Object.keys(IA_MODELS);
    const candidates = [];

    // Filter against recent history to ensure broad structural cycling
    const recentIaIds = recentHistory.map(h => h.iaModel).filter(Boolean);
    const availableIaIds = allIaIds.filter(id => !recentIaIds.slice(-5).includes(id));
    const iaPool = availableIaIds.length > 0 ? availableIaIds : allIaIds;

    for (let i = 0; i < 6; i++) {
      const iaId = iaPool[i % iaPool.length];
      const iaModel = IA_MODELS[iaId];

      const compatibleLayouts = this.getCompatibleLayouts(iaId);
      const recentLayoutIds = recentHistory.map(h => h.layoutGrammar).filter(Boolean);
      const availableLayouts = compatibleLayouts.filter(id => !recentLayoutIds.slice(-3).includes(id));
      const layoutId = availableLayouts.length > 0 ? availableLayouts[Math.floor(Math.random() * availableLayouts.length)] : compatibleLayouts[0];
      const layoutGrammar = LAYOUT_GRAMMARS[layoutId];

      const recentUniverseIds = recentHistory.map(h => h.visualUniverse).filter(Boolean);
      const availableUniverses = compatibleUniverses.filter(id => !recentUniverseIds.slice(-3).includes(id));
      const universeId = availableUniverses.length > 0 ? availableUniverses[Math.floor(Math.random() * availableUniverses.length)] : compatibleUniverses[Math.floor(Math.random() * compatibleUniverses.length)];
      const visualUniverse = VISUAL_UNIVERSES[universeId];

      // Decoupled Typography, Color, and Motion Systems
      const typographySystem = TypographyEngine.selectSystem(contentProfile, universeId, recentHistory);
      const colorPalette = ColorEngine.selectPalette(contentProfile, universeId, recentHistory);
      const motionLanguage = MotionEngine.selectLanguage(universeId, iaId, recentHistory);

      const roleLower = (contentProfile.role || '').toLowerCase();
      let affinityPool = ['technical-dossier', 'split-technical-spec'];
      if (roleLower.includes('security')) affinityPool = ['failure-recovery', 'project-log', 'technical-dossier', 'repository-archaeology'];
      else if (roleLower.includes('ml') || roleLower.includes('ai')) affinityPool = ['research-paper', 'metrics-observatory', 'case-study-narrative', 'timeline'];
      else if (roleLower.includes('academic') || roleLower.includes('researcher')) affinityPool = ['research-paper', 'editorial-feature', 'timeline', 'artifact-archive'];
      else if (roleLower.includes('photographer')) affinityPool = ['editorial-feature', 'artifact-archive', 'visual-exhibition', 'minimal-project-index'];
      else if (roleLower.includes('3d') || roleLower.includes('creative developer')) affinityPool = ['architecture-map', 'product-launch', 'visual-exhibition', 'build-journal'];
      else if (roleLower.includes('spatial') || roleLower.includes('product designer')) affinityPool = ['visual-exhibition', 'artifact-archive', 'before-after', 'architecture-map'];
      else if (roleLower.includes('distributed') || roleLower.includes('systems')) affinityPool = ['architecture-map', 'technical-dossier', 'failure-recovery', 'metrics-observatory'];
      else if (roleLower.includes('frontend')) affinityPool = ['before-after', 'feature-atlas', 'visual-exhibition', 'minimal-project-index'];
      else if (roleLower.includes('founder') || roleLower.includes('ceo')) affinityPool = ['product-launch', 'build-journal', 'case-study-narrative', 'metrics-observatory'];

      const allKeys = Object.keys(PROJECT_STORYTELLING_SYSTEMS);
      const chosenPool = Math.random() > 0.80 ? allKeys : affinityPool;
      const projectStrategy = context.projectStrategy || chosenPool[Math.floor(Math.random() * chosenPool.length)] || iaModel.defaultStorytelling;

      // Calculate Multi-Factor Score
      const score = this.calculateCandidateScore({
        iaId,
        layoutId,
        universeId,
        typographyId: typographySystem.id,
        paletteId: colorPalette.id,
        motionId: motionLanguage.id,
        projectStrategy,
        contentProfile,
        recentHistory,
        skillEvidence
      });

      const macroDirective = MacroDirectiveManager.selectDirective(contentProfile);

      candidates.push({
        iaModel,
        layoutGrammar,
        visualUniverse,
        typographySystem,
        colorPalette,
        motionLanguage,
        projectStrategy,
        macroDirective,
        densityProfile: macroDirective.densityProfile,
        compositionGravity: macroDirective.compositionGravity,
        contentDominance: macroDirective.contentDominance,
        score
      });
    }

    // Sort by descending score
    candidates.sort((a, b) => b.score.totalScore - a.score.totalScore);
    return candidates;
  }

  /**
   * Multi-Factor Diversity & Quality Scoring Engine (Phase 11)
   */
  static calculateCandidateScore(candidate) {
    const { iaId, layoutId, universeId, typographyId, paletteId, motionId, contentProfile, recentHistory, skillEvidence } = candidate;

    // 1. Content Fit Score (0.0 - 1.0)
    let contentFit = 0.90;
    const signals = contentProfile.signals || {};
    if (signals.technicalDepth === 'high' && ['technical-lab', 'swiss-editorial', 'cinematic-obsidian', 'brutalist-pop', 'futuristic-spatial'].includes(universeId)) {
      contentFit = 0.98;
    }

    // 2. Diversity & Novelty Score (0.0 - 1.0)
    let diversityScore = 1.0;
    const recentSignatures = recentHistory.map(h => `${h.iaModel}:${h.layoutGrammar}:${h.visualUniverse}:${h.typographySystemId}`);
    const candidateSignature = `${iaId}:${layoutId}:${universeId}:${typographyId}`;
    if (recentSignatures.slice(-5).includes(candidateSignature)) {
      diversityScore = 0.3;
    } else if (recentSignatures.slice(-10).includes(candidateSignature)) {
      diversityScore = 0.6;
    }

    // 3. Design Quality & Coherence Score (0.0 - 1.0)
    let designQuality = 0.95;
    if (iaId === layoutId) {
      // Slight penalty for 1:1 IA/Layout coupling to encourage structural novelty
      designQuality -= 0.05;
    }

    // Coherence Check: Detect clashing system combinations
    let coherenceScore = 1.0;
    if (typography.id === 'technical-mono' && universe.id === 'luxury-minimal') {
      coherenceScore -= 0.25;
    }
    if (universe.id === 'brutalist-pop' && typography.id === 'classical-editorial') {
      coherenceScore -= 0.20;
    }
    if (iaId === 'computational-terminal' && palette.id === 'luxury-obsidian-gold') {
      coherenceScore -= 0.20;
    }

    // 4. Skill Influence Score (0.0 - 1.0)
    let skillInfluence = 0.95;
    if (skillEvidence && skillEvidence.executionRate === 1.0) {
      skillInfluence = 1.0;
    }

    // 5. Accessibility & Contrast Score (0.0 - 1.0)
    const accessibilityScore = 1.0;

    // Quality-Weighted Composite: Diversity must never override design quality
    const totalScore = (
      0.25 * contentFit +
      0.25 * (designQuality * coherenceScore) +
      0.20 * diversityScore +
      0.15 * skillInfluence +
      0.15 * accessibilityScore
    );

    return {
      totalScore,
      contentFit,
      designQuality,
      coherenceScore,
      diversityScore,
      skillInfluence,
      accessibilityScore
    };
  }
}

module.exports = { CandidateDesignPool };

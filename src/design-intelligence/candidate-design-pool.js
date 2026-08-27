/**
 * 🏛️ Candidate Design Intent Pool (Phase 36)
 * Produces and scores candidate design intent and composition characteristics.
 * Feeds semantic signals into CompositionPlanner rather than acting as a rigid template selector.
 * Evaluates candidates against Multi-Factor Diversity & Quality Scoring.
 */

const { CompositionPlan, PAGE_TOPOLOGIES } = require('../design-engine/composition-plan');
const { IA_MODELS } = require('../design-engine/ia-composer');
const { VISUAL_UNIVERSES } = require('../design-engine/visual-grammar');
const { TYPOGRAPHY_SYSTEMS, TypographyEngine } = require('../design-engine/typography-systems');
const { COLOR_PALETTES, ColorEngine } = require('../design-engine/color-palettes');
const { MOTION_LANGUAGES, MotionEngine } = require('../design-engine/motion-profiles');
const { MACRO_DIRECTIVES, MacroDirectiveManager } = require('../design-engine/macro-design-directives');
const { PROJECT_STORYTELLING_SYSTEMS } = require('../design-engine/project-storytelling-constitution');

class CandidateDesignPool {
  /**
   * Returns compatible page topologies for a given content profile and intent
   */
  static getCompatibleTopologies(contentProfile = {}) {
    const roleLower = (contentProfile.role || '').toLowerCase();
    const signals = contentProfile.signals || {};

    if (roleLower.includes('security') || signals.primaryAngle === 'computational_depth') {
      return ['command-console-interface', 'asymmetric-split-canvas', 'vertical-identity-rail', 'architectural-plate'];
    } else if (roleLower.includes('ml') || roleLower.includes('ai') || roleLower.includes('research') || roleLower.includes('academic')) {
      return ['narrow-reading-column', 'edge-to-edge-editorial', 'newspaper-column-grid', 'data-observatory'];
    } else if (roleLower.includes('3d') || roleLower.includes('creative developer') || roleLower.includes('artist')) {
      return ['floating-spatial-composition', 'full-viewport-stage', 'image-led-gallery', 'offset-poster-canvas'];
    } else if (roleLower.includes('photographer') || roleLower.includes('visual')) {
      return ['image-led-gallery', 'magazine-spread', 'offset-poster-canvas', 'edge-to-edge-editorial'];
    } else if (roleLower.includes('distributed') || roleLower.includes('systems') || roleLower.includes('backend')) {
      return ['vertical-identity-rail', 'command-console-interface', 'architectural-plate', 'asymmetric-split-canvas'];
    } else if (roleLower.includes('frontend') || roleLower.includes('ui') || roleLower.includes('designer')) {
      return ['asymmetric-split-canvas', 'magazine-spread', 'offset-poster-canvas', 'narrow-reading-column'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo')) {
      return ['edge-to-edge-editorial', 'newspaper-column-grid', 'narrow-reading-column', 'data-observatory'];
    }

    return Object.keys(PAGE_TOPOLOGIES);
  }

  /**
   * Compatibility matrix mapping IA intent to layout topologies
   */
  static getCompatibleLayouts(iaModelId) {
    const matrix = {
      'split-screen-dossier': ['asymmetric-split-canvas', 'offset-poster-canvas', 'edge-to-edge-editorial', 'command-console-interface'],
      'work-first-runway': ['edge-to-edge-editorial', 'image-led-gallery', 'asymmetric-split-canvas', 'magazine-spread'],
      'horizontal-exhibition': ['image-led-gallery', 'edge-to-edge-editorial', 'offset-poster-canvas'],
      'editorial-monograph': ['narrow-reading-column', 'magazine-spread', 'timeline-field', 'asymmetric-split-canvas'],
      'computational-terminal': ['command-console-interface', 'asymmetric-split-canvas', 'offset-poster-canvas'],
      'spatial-3d-stage': ['floating-spatial-composition', 'full-viewport-stage', 'image-led-gallery'],
      'narrative-timeline': ['timeline-field', 'narrow-reading-column', 'asymmetric-split-canvas', 'edge-to-edge-editorial'],
      'minimal-single-screen': ['full-viewport-stage', 'narrow-reading-column', 'asymmetric-split-canvas'],
      'asymmetric-bento-canvas': ['offset-poster-canvas', 'asymmetric-split-canvas', 'magazine-spread'],
      'magazine-spread-columns': ['magazine-spread', 'narrow-reading-column', 'offset-poster-canvas', 'newspaper-column-grid']
    };

    return matrix[iaModelId] || Object.keys(PAGE_TOPOLOGIES);
  }

  /**
   * Returns compatible visual universes based on content profile signals
   */
  static getCompatibleUniverses(contentProfile = {}) {
    const signals = contentProfile.signals || {};
    const allUniverses = Object.keys(VISUAL_UNIVERSES);

    if (signals.visualDensity === 'high') {
      return ['contemporary-magazine', 'futuristic-spatial', 'monochrome-gallery', 'expressive-typographic', 'brutalist-pop', 'luxury-minimal'];
    } else if (signals.technicalDepth === 'high' || signals.technicalDepth === 'deep') {
      return ['technical-lab', 'swiss-editorial', 'cinematic-obsidian', 'brutalist-pop', 'futuristic-spatial', 'monochrome-gallery', 'expressive-typographic'];
    } else if (signals.narrativeDepth === 'high') {
      return ['warm-editorial', 'contemporary-magazine', 'luxury-minimal', 'swiss-editorial', 'editorial-monograph', 'monochrome-gallery'];
    }

    return allUniverses;
  }

  /**
   * Generates a pool of candidate composition characteristics and returns scored candidates
   */
  static generateCandidates(contentProfile = {}, recentHistory = [], skillEvidence = null, context = {}) {
    const compatibleUniverses = this.getCompatibleUniverses(contentProfile);
    const allIaIds = Object.keys(IA_MODELS);
    const candidates = [];

    const recentIaIds = recentHistory.map(h => h.iaModel).filter(Boolean);
    const availableIaIds = allIaIds.filter(id => !recentIaIds.slice(-5).includes(id));
    const iaPool = availableIaIds.length > 0 ? availableIaIds : allIaIds;

    for (let i = 0; i < 6; i++) {
      const iaId = iaPool[i % iaPool.length];
      const iaModel = IA_MODELS[iaId];

      const compatibleTopologies = this.getCompatibleLayouts(iaId);
      const recentLayoutIds = recentHistory.map(h => h.layoutGrammar).filter(Boolean);
      const availableTopologies = compatibleTopologies.filter(id => !recentLayoutIds.slice(-3).includes(id));
      const pageTopologyId = availableTopologies.length > 0
        ? availableTopologies[Math.floor(Math.random() * availableTopologies.length)]
        : compatibleTopologies[0];

      const recentUniverseIds = recentHistory.map(h => h.visualUniverse).filter(Boolean);
      const availableUniverses = compatibleUniverses.filter(id => !recentUniverseIds.slice(-3).includes(id));
      const universeId = availableUniverses.length > 0
        ? availableUniverses[Math.floor(Math.random() * availableUniverses.length)]
        : compatibleUniverses[Math.floor(Math.random() * compatibleUniverses.length)];
      const visualUniverse = VISUAL_UNIVERSES[universeId];

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

      const score = this.calculateCandidateScore({
        iaId,
        layoutId: pageTopologyId,
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
        pageTopologyId,
        layoutGrammar: { layoutId: pageTopologyId },
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

    candidates.sort((a, b) => b.score.totalScore - a.score.totalScore);
    return candidates;
  }

  /**
   * Multi-Factor Diversity & Quality Scoring Engine
   */
  static calculateCandidateScore(candidate) {
    const { iaId, layoutId, universeId, typographyId, paletteId, contentProfile, recentHistory, skillEvidence } = candidate;

    // 1. Content Fit Score (0.0 - 1.0)
    let contentFit = 0.90;
    const signals = contentProfile?.signals || {};
    if (signals.technicalDepth === 'high' && ['technical-lab', 'swiss-editorial', 'cinematic-obsidian', 'brutalist-pop', 'futuristic-spatial'].includes(universeId)) {
      contentFit = 0.98;
    }

    // 2. Diversity & Novelty Score (0.0 - 1.0)
    let diversityScore = 1.0;
    const recentSignatures = (recentHistory || []).map(h => `${h.iaModel}:${h.layoutGrammar}:${h.visualUniverse}:${h.typographySystemId}`);
    const candidateSignature = `${iaId}:${layoutId}:${universeId}:${typographyId}`;
    if (recentSignatures.slice(-5).includes(candidateSignature)) {
      diversityScore = 0.3;
    } else if (recentSignatures.slice(-10).includes(candidateSignature)) {
      diversityScore = 0.6;
    }

    // 3. Design Quality & Coherence Score (0.0 - 1.0)
    let designQuality = 0.95;
    let coherenceScore = 1.0;
    if (typographyId === 'technical-mono' && universeId === 'luxury-minimal') {
      coherenceScore -= 0.25;
    }
    if (universeId === 'brutalist-pop' && typographyId === 'classical-editorial') {
      coherenceScore -= 0.20;
    }
    if (iaId === 'computational-terminal' && paletteId === 'luxury-obsidian-gold') {
      coherenceScore -= 0.20;
    }

    // 4. Skill Influence Score (0.0 - 1.0)
    let skillInfluence = 0.95;
    if (skillEvidence && skillEvidence.executionRate === 1.0) {
      skillInfluence = 1.0;
    }

    // 5. Accessibility & Contrast Score (0.0 - 1.0)
    const accessibilityScore = 1.0;

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

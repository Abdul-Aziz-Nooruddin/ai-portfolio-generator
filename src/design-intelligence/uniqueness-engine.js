const { AestheticContradictionDetector } = require('./aesthetic-contradiction-detector');
const { DesignFamilyEngine, DESIGN_FAMILIES } = require('./design-families');
const { PageCompositionEngine } = require('./page-composition-engine');

class UniquenessEngine {
  constructor(options = {}) {
    this.history = []; // Rolling window of accepted fingerprints
    this.maxHistorySize = options.maxHistorySize || 50;
    this.structuralSimilarityThreshold = options.structuralSimilarityThreshold || 0.60;
    this.pageCompositionEngine = new PageCompositionEngine();
  }

  /**
   * Create a comprehensive 22-Dimension Design Fingerprint + Page Structure Fingerprint
   */
  generateFingerprint(dna) {
    const pageArchetype = dna.pageArchetype || dna.pageComposition?.id || dna.layoutArchitecture || 'architectural-swiss-grid';

    return {
      id: dna.id || `fp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      pageArchetype,
      gridTopology: dna.gridTopology || dna.structureFingerprint?.gridTopology || 'modular',
      alignmentSystem: dna.alignmentSystem || dna.structureFingerprint?.alignmentSystem || 'left-anchored',
      designFamily: dna.designFamily || 'EDITORIAL',
      creativeDirection: dna.creativeDirection || 'Contemporary Architecture',
      visualEra: dna.visualEra || 'Contemporary Digital',
      brandMood: dna.brandMood || 'Rigorous & Objective',
      layoutArchitecture: pageArchetype,
      informationArchitecture: dna.informationArchitecture || ['hero', 'projects', 'about', 'contact'],
      navigationStyle: dna.navigationStyle || 'floating-capsule',
      heroComposition: dna.heroComposition || 'split-runway-hero',
      projectPresentation: dna.projectPresentation || 'editorial-magazine',
      projectInteraction: dna.projectInteraction || 'staggered-reveal',
      projectSectionArchitecture: `${pageArchetype}::${dna.projectPresentation}`,
      typography: {
        heading: dna.typographySystem?.heading_font || 'Inter',
        body: dna.typographySystem?.body_font || 'Inter',
        scale: dna.typographySystem?.scale_ratio || '1.25'
      },
      color: {
        theme: dna.colorSystem?.theme || 'dark',
        primary: dna.colorSystem?.primary || '#38bdf8',
        bg: dna.colorSystem?.background || '#09090b',
        family: dna.colorSystem?.family || 'contemporary'
      },
      motionLanguage: dna.motionLanguage || 'smooth-inertia',
      motionFamily: dna.motionFamily || 'Cinematic',
      threeScene3D: {
        has3D: !!dna.threeScene3D?.enabled,
        type: dna.threeScene3D?.type || 'none-pure-2d',
        category: dna.threeScene3D?.category || '2D'
      },
      backgroundTreatment: dna.backgroundTreatment || 'monochrome-obsidian',
      spacingSystem: dna.spacingSystem || 'compact-monograph',
      borderLanguage: dna.borderLanguage || 'hairline-solid-subtle',
      imageTreatment: dna.imageTreatment || 'raw-natural-editorial',
      sectionTransition: dna.sectionTransition || 'seamless-subtle-hairline',
      footerArchitecture: dna.footerArchitecture || 'roman-atelier-colophon',
      cursorBehavior: dna.cursorBehavior || 'default-clean',
      buttonLanguage: dna.buttonLanguage || 'minimalist-hairline-border',
      timestamp: Date.now()
    };
  }

  /**
   * Check Hard Repetition & Structural Collision Rules against the last 10 generations
   */
  checkHardRepetitionRules(candidateFp, windowSize = 10) {
    const recentWindow = this.history.slice(-windowSize).reverse();

    for (let i = 0; i < recentWindow.length; i++) {
      const past = recentWindow[i];
      const genNum = this.history.length - i;

      // 1. Hard Structural Collision: Same Page Archetype + Same Hero Architecture
      if (candidateFp.pageArchetype === past.pageArchetype && candidateFp.heroComposition === past.heroComposition) {
        return {
          passed: false,
          collisionType: 'PAGE_ARCHETYPE_COLLISION',
          reason: `Repeated Page Archetype ('${candidateFp.pageArchetype}') with same Hero ('${candidateFp.heroComposition}') from Gen ${genNum}`
        };
      }

      // 2. Hard Structural Collision: Same Grid Topology + Same Section Order
      if (candidateFp.gridTopology === past.gridTopology &&
          JSON.stringify(candidateFp.informationArchitecture) === JSON.stringify(past.informationArchitecture)) {
        return {
          passed: false,
          collisionType: 'GRID_SECTION_ORDER_COLLISION',
          reason: `Identical Grid Topology ('${candidateFp.gridTopology}') and Section Order from Gen ${genNum}`
        };
      }

      // 3. Layout + Project Presentation Collision
      if (candidateFp.layoutArchitecture === past.layoutArchitecture && candidateFp.projectPresentation === past.projectPresentation) {
        return {
          passed: false,
          collisionType: 'LAYOUT_PROJECT_COLLISION',
          reason: `Repeated Layout + Project combo ('${candidateFp.layoutArchitecture}' + '${candidateFp.projectPresentation}') from Gen ${genNum}`
        };
      }

      // 4. Hero + Navigation Collision
      if (candidateFp.heroComposition === past.heroComposition && candidateFp.navigationStyle === past.navigationStyle) {
        return {
          passed: false,
          collisionType: 'HERO_NAV_COLLISION',
          reason: `Repeated Hero + Nav combo ('${candidateFp.heroComposition}' + '${candidateFp.navigationStyle}') from Gen ${genNum}`
        };
      }

      // 5. 3D Scene + Layout Collision
      if (candidateFp.threeScene3D.has3D && past.threeScene3D.has3D &&
          candidateFp.threeScene3D.type === past.threeScene3D.type &&
          candidateFp.layoutArchitecture === past.layoutArchitecture) {
        return {
          passed: false,
          collisionType: '3D_LAYOUT_COLLISION',
          reason: `Repeated 3D Scene + Layout combo ('${candidateFp.threeScene3D.type}' + '${candidateFp.layoutArchitecture}') from Gen ${genNum}`
        };
      }
    }

    return { passed: true, reason: 'All hard repetition rules passed' };
  }

  /**
   * Calculate Portfolio Cohesion Score (Target: 80–95%)
   */
  calculateCohesionScore(dna) {
    let score = 92;
    const familyKey = dna.designFamily || 'EDITORIAL';
    const family = DESIGN_FAMILIES[familyKey] || DESIGN_FAMILIES.EDITORIAL;

    // Project presentation compatibility
    const presCompat = DesignFamilyEngine.evaluatePresentationCompatibility(family, dna.projectPresentation);
    if (presCompat < 50) score -= 15;
    else if (presCompat >= 80) score += 4;

    // Motion compatibility
    if (family.compatibleMotions && family.compatibleMotions.includes(dna.motionLanguage)) {
      score += 2;
    }

    // Contradiction penalty
    const contradictionReport = AestheticContradictionDetector.detectContradictions(dna, dna.constitution);
    score -= contradictionReport.cohesionPenalty;

    return {
      cohesionScore: Math.max(0, Math.min(100, Math.round(score))),
      contradictionReport
    };
  }

  /**
   * Calculate Weighted Structural Similarity (0.0 to 1.0)
   * Dominant structural weight on Page Archetype & Grid Topology (35%)
   */
  calculateStructuralSimilarity(fpA, fpB) {
    let score = 0;

    // 1. Page Archetype & Topology (25%)
    score += (fpA.pageArchetype === fpB.pageArchetype ? 1.0 : 0.0) * 0.25;

    // 2. Grid Topology & Alignment System (15%)
    const gridMatch = fpA.gridTopology === fpB.gridTopology ? 0.6 : 0.0;
    const alignMatch = fpA.alignmentSystem === fpB.alignmentSystem ? 0.4 : 0.0;
    score += (gridMatch + alignMatch) * 0.15;

    // 3. Information Architecture & Section Sequence (15%)
    score += this.calculateSequenceSimilarity(fpA.informationArchitecture, fpB.informationArchitecture) * 0.15;

    // 4. Hero Architecture (10%)
    score += (fpA.heroComposition === fpB.heroComposition ? 1.0 : 0.0) * 0.10;

    // 5. Project Presentation Architecture (15%)
    score += (fpA.projectPresentation === fpB.projectPresentation ? 1.0 : 0.0) * 0.15;

    // 6. Navigation Architecture (8%)
    score += (fpA.navigationStyle === fpB.navigationStyle ? 1.0 : 0.0) * 0.08;

    // 7. Motion & Interaction (7%)
    score += (fpA.motionLanguage === fpB.motionLanguage ? 1.0 : 0.0) * 0.07;

    // 8. 3D Architecture (5%)
    const has3DMatch = fpA.threeScene3D.has3D === fpB.threeScene3D.has3D;
    const type3DMatch = fpA.threeScene3D.type === fpB.threeScene3D.type;
    score += (has3DMatch ? (type3DMatch ? 1.0 : 0.4) : 0.0) * 0.05;

    return Number(score.toFixed(3));
  }

  /**
   * Calculate Visual Surface Similarity (0.0 to 1.0)
   */
  calculateVisualSimilarity(fpA, fpB) {
    let score = 0;
    score += (fpA.typography.heading === fpB.typography.heading ? 0.6 : 0.0 + (fpA.typography.body === fpB.typography.body ? 0.4 : 0.0)) * 0.35;
    score += (fpA.color.bg === fpB.color.bg ? 0.5 : 0.0 + (fpA.color.primary === fpB.color.primary ? 0.5 : 0.0)) * 0.35;
    score += (fpA.borderLanguage === fpB.borderLanguage ? 1.0 : 0.0) * 0.15;
    score += (fpA.imageTreatment === fpB.imageTreatment ? 1.0 : 0.0) * 0.15;
    return Number(score.toFixed(3));
  }

  calculateSequenceSimilarity(seqA = [], seqB = []) {
    if (!seqA.length || !seqB.length) return 0.5;
    if (JSON.stringify(seqA) === JSON.stringify(seqB)) return 1.0;
    let matches = 0;
    const maxLen = Math.max(seqA.length, seqB.length);
    for (let i = 0; i < maxLen; i++) {
      if (seqA[i] && seqB[i] && seqA[i] === seqB[i]) matches++;
    }
    return matches / maxLen;
  }

  /**
   * Evaluate a Candidate against memory history
   */
  validateCandidate(candidateDNA) {
    const candidateFp = this.generateFingerprint(candidateDNA);
    const { cohesionScore, contradictionReport } = this.calculateCohesionScore(candidateDNA);

    if (this.history.length === 0) {
      return {
        accepted: contradictionReport.passed,
        structuralDiversity: 100,
        visualDiversity: 100,
        divergenceScore: 100,
        overallDiversity: 100,
        cohesionScore,
        maxSimilarity: 0,
        hardRulesPassed: true,
        contradictionReport,
        reason: contradictionReport.passed ? 'First generation in session' : 'Rejected: Aesthetic Contradiction detected',
        fingerprint: candidateFp
      };
    }

    // 1. Hard Repetition & Structural Collision Check
    const hardRules = this.checkHardRepetitionRules(candidateFp, 10);
    if (!hardRules.passed) {
      return {
        accepted: false,
        hardRulesPassed: false,
        structuralDiversity: 0,
        visualDiversity: 0,
        divergenceScore: 0,
        overallDiversity: 0,
        cohesionScore,
        maxSimilarity: 1.0,
        collisionType: hardRules.collisionType,
        contradictionReport,
        reason: hardRules.reason,
        fingerprint: candidateFp
      };
    }

    // 2. Reject if Aesthetic Contradictions exist
    if (!contradictionReport.passed) {
      return {
        accepted: false,
        hardRulesPassed: true,
        structuralDiversity: 0,
        visualDiversity: 0,
        divergenceScore: 0,
        overallDiversity: 0,
        cohesionScore,
        maxSimilarity: 1.0,
        collisionType: 'AESTHETIC_CONTRADICTION',
        contradictionReport,
        reason: `Rejected: Aesthetic contradiction: ${contradictionReport.contradictions.join('; ')}`,
        fingerprint: candidateFp
      };
    }

    // 3. Evaluate Max Structural and Visual Similarity across recent generations
    let maxStructuralSim = 0;
    let maxVisualSim = 0;
    let closestGen = 0;

    this.history.slice(-15).forEach((pastFp, idx) => {
      const structSim = this.calculateStructuralSimilarity(candidateFp, pastFp);
      const visualSim = this.calculateVisualSimilarity(candidateFp, pastFp);

      if (structSim > maxStructuralSim) {
        maxStructuralSim = structSim;
        closestGen = this.history.length - idx;
      }
      if (visualSim > maxVisualSim) {
        maxVisualSim = visualSim;
      }
    });

    const structuralDiversity = Math.round((1 - maxStructuralSim) * 100);
    const visualDiversity = Math.round((1 - maxVisualSim) * 100);
    const overallDiversity = Math.round(structuralDiversity * 0.70 + visualDiversity * 0.30);

    // Equilibrium & Collision Acceptance
    let accepted = maxStructuralSim <= this.structuralSimilarityThreshold;
    let rejectionReason = null;

    if (structuralDiversity < 40) {
      accepted = false;
      rejectionReason = `Rejected: Portfolio is structurally identical to recent generation (Structural Diversity only ${structuralDiversity}%)`;
    }

    return {
      accepted,
      hardRulesPassed: true,
      structuralDiversity,
      visualDiversity,
      divergenceScore: overallDiversity,
      overallDiversity,
      cohesionScore,
      maxSimilarity: maxStructuralSim,
      contradictionReport,
      reason: accepted 
        ? `Accepted (Structural Div: ${structuralDiversity}%, Cohesion: ${cohesionScore}%)` 
        : (rejectionReason || `Rejected: Structural similarity (${Math.round(maxStructuralSim * 100)}%) exceeds limit (closest to Gen ${closestGen})`),
      fingerprint: candidateFp
    };
  }

  /**
   * Record accepted design fingerprint into memory
   */
  recordAcceptedDesign(dna) {
    const fp = this.generateFingerprint(dna);
    this.history.push(fp);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
    return fp;
  }

  calculateSimilarity(fpA, fpB) {
    return this.calculateStructuralSimilarity(fpA, fpB);
  }
}

module.exports = { UniquenessEngine };

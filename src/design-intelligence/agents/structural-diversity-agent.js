/**
 * Structural & Perceptual Diversity Agent
 * Computes 19-dimensional structural fingerprints and 20-dimensional perceptual fingerprints.
 * Detects and eliminates False Diversity (superficial token swaps on identical compositions).
 * Enforces hard quality gates against structural and perceptual repetition.
 */

const crypto = require('crypto');

class StructuralDiversityAgent {
  constructor(windowSize = 50) {
    this.windowSize = windowSize;
    this.history = [];
  }

  /**
   * Computes a 19-dimensional structural design fingerprint
   */
  computeStructuralFingerprint(candidate) {
    const raw = [
      candidate.informationArchitecture?.modelId || '',
      (candidate.sectionSequence || []).join('>'),
      candidate.layoutGrammar?.layoutId || '',
      candidate.projectStorytelling?.strategyId || '',
      candidate.visualUniverse?.universeId || '',
      candidate.typography?.systemId || candidate.typography?.headingFont || '',
      candidate.colorSystem?.paletteId || candidate.colorSystem?.bg || '',
      candidate.motionSystem?.languageId || candidate.motionSystem?.intensity || '',
      candidate.ux?.navigation || '',
      candidate.layoutGrammar?.geometryType || '',
      candidate.typography?.scaleRatio || '',
      candidate.colorSystem?.primary || '',
      candidate.visualUniverse?.borderRadius || '',
      candidate.visualUniverse?.shadow || '',
      candidate.motionSystem?.scrollBehavior || '',
      candidate.interactionModel?.pattern || '',
      candidate.educationTreatment || 'morphed-ia-adaptive',
      candidate.certificationTreatment || 'morphed-ia-adaptive',
      candidate.footerTreatment || 'unified-colophon'
    ].join('||');

    const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
    return {
      hash,
      signature: raw,
      dimensions: 19
    };
  }

  /**
   * Computes a 20-dimensional perceptual / visual composition fingerprint (Phase 4)
   */
  computePerceptualFingerprint(candidate) {
    const iaId = candidate.informationArchitecture?.modelId || 'split-screen-dossier';
    const layoutId = candidate.layoutGrammar?.layoutId || 'split-screen-dossier';
    const projectStrategy = candidate.projectStorytelling?.strategyId || 'code-architecture-dossier';
    const universeId = candidate.visualUniverse?.universeId || 'technical-lab';

    // 1. Hero Alignment & Geometry
    const heroAlignment = iaId === 'split-screen-dossier' ? 'sidebar-left' :
      (iaId === 'computational-terminal' ? 'terminal-window-left' :
      (iaId === 'editorial-monograph' ? 'asymmetric-reading-lead' :
      (iaId === 'horizontal-exhibition' ? 'horizontal-marquee-lead' :
      (iaId === 'minimal-single-screen' ? 'monumental-statement-left' :
      (iaId === 'work-first-runway' ? 'runway-top-strip' :
      (iaId === 'asymmetric-bento-canvas' ? 'bento-canopy-box' : 'spatial-orbit-intro'))))));

    // 2. Navigation Geometry
    const navigationGeometry = candidate.ux?.navigation || 
      (iaId === 'split-screen-dossier' ? 'side-rail-sticky' :
      (iaId === 'computational-terminal' ? 'terminal-header-bar' :
      (iaId === 'editorial-monograph' ? 'monograph-masthead-rule' : 'floating-header-dock')));

    // 3. Section Width Strategy
    const sectionWidth = iaId === 'split-screen-dossier' ? 'two-column-split-100vw' :
      (iaId === 'editorial-monograph' ? 'max-w-850px-reading' :
      (iaId === 'horizontal-exhibition' ? 'horizontal-track-100vw' :
      (iaId === 'asymmetric-bento-canvas' ? 'bento-grid-canvas' : 'fluid-viewport-container')));

    // 4. Content Density
    const contentDensity = iaId === 'computational-terminal' ? 'high-density-cli' :
      (iaId === 'editorial-monograph' ? 'spacious-literary' :
      (iaId === 'split-screen-dossier' ? 'dense-split-dossier' : 'balanced-visual-flow'));

    // 5. Project Geometry
    const projectGeometry = projectStrategy;

    // 6. Education Geometry
    const educationGeometry = iaId === 'computational-terminal' ? 'cli-query-block' :
      (iaId === 'split-screen-dossier' ? 'sidebar-metadata-stream' :
      (iaId === 'narrative-timeline' ? 'vertical-timeline-node' : 'structured-academic-panel'));

    // 7. Certification Geometry
    const certificationGeometry = iaId === 'computational-terminal' ? 'cli-key-verify' :
      (iaId === 'split-screen-dossier' ? 'sidebar-verified-list' :
      (iaId === 'narrative-timeline' ? 'timeline-accredited-node' : 'badge-credential-cluster'));

    // 8. Footer Geometry
    const footerGeometry = iaId === 'editorial-monograph' ? 'scholarly-colophon-rule' :
      (iaId === 'computational-terminal' ? 'terminal-status-200' :
      (iaId === 'split-screen-dossier' ? 'sidebar-bottom-meta' : 'unified-colophon-footer'));

    // 9. Border & Surface Language
    const borderLanguage = universeId === 'brutalist-pop' ? 'heavy-solid-black' :
      (universeId === 'computational-terminal' ? 'dashed-code-border' :
      (universeId === 'cinematic-obsidian' ? 'luminous-subtle-border' : 'hairline-solid-rule'));

    // 10. Radius Language
    const radiusLanguage = candidate.visualUniverse?.borderRadius || '8px';

    // 11. Motion Profile
    const motionProfile = candidate.motionSystem?.languageId || 'technical-stagger';

    const perceptualDimensions = [
      heroAlignment,
      navigationGeometry,
      sectionWidth,
      contentDensity,
      projectGeometry,
      educationGeometry,
      certificationGeometry,
      footerGeometry,
      borderLanguage,
      radiusLanguage,
      motionProfile,
      candidate.typography?.systemId || 'swiss-grotesk',
      candidate.colorSystem?.paletteId || 'swiss-light',
      candidate.colorSystem?.theme || 'dark',
      candidate.interactionModel?.pattern || 'scroll-guided-reveal',
      iaId,
      layoutId,
      projectStrategy,
      universeId,
      (candidate.sectionSequence || []).slice(0, 3).join('>')
    ];

    const raw = perceptualDimensions.join('||');
    const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);

    return {
      hash,
      signature: raw,
      dimensions: 20,
      traits: {
        heroAlignment,
        navigationGeometry,
        sectionWidth,
        contentDensity,
        projectGeometry,
        educationGeometry,
        certificationGeometry,
        footerGeometry,
        borderLanguage,
        radiusLanguage,
        motionProfile
      }
    };
  }

  computeCombinedFingerprint(structural, perceptual) {
    const raw = `${structural.hash}:${perceptual.hash}`;
    return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
  }

  async execute(candidateBrief, recentHistory = null) {
    const activeHistory = Array.isArray(recentHistory) ? recentHistory : this.history;
    const structuralFingerprint = this.computeStructuralFingerprint(candidateBrief);
    const perceptualFingerprint = this.computePerceptualFingerprint(candidateBrief);
    const combinedHash = this.computeCombinedFingerprint(structuralFingerprint, perceptualFingerprint);

    let isDuplicate = false;
    let duplicateOf = null;
    let perceptualSimilarityMax = 0;
    let divergenceScore = 1.0;

    if (activeHistory.length > 0) {
      const match = activeHistory.find(h => {
        const hFingerprint = h.structuralFingerprint?.hash || h.hash;
        return hFingerprint === structuralFingerprint.hash;
      });

      if (match) {
        isDuplicate = true;
        duplicateOf = match;
        divergenceScore = 0.0;
        perceptualSimilarityMax = 1.0;
      } else {
        // Multi-dimensional perceptual similarity audit across recent history
        const recentSample = activeHistory.slice(-10);
        let maxOverlap = 0;

        for (const prev of recentSample) {
          let identicalTraits = 0;
          const totalTraits = 7;

          if (prev.iaModel === candidateBrief.informationArchitecture?.modelId) identicalTraits++;
          if (prev.layoutGrammar === candidateBrief.layoutGrammar?.layoutId) identicalTraits++;
          if (prev.projectStrategy === candidateBrief.projectStorytelling?.strategyId) identicalTraits++;
          if (prev.visualUniverse === candidateBrief.visualUniverse?.universeId) identicalTraits++;
          if (prev.typographySystemId === candidateBrief.typography?.systemId) identicalTraits++;
          if (prev.colorPaletteId === candidateBrief.colorSystem?.paletteId) identicalTraits++;
          if (prev.motionProfileId === candidateBrief.motionSystem?.languageId) identicalTraits++;

          const similarity = identicalTraits / totalTraits;
          if (similarity > maxOverlap) maxOverlap = similarity;
        }

        perceptualSimilarityMax = maxOverlap;
        divergenceScore = Math.max(0.1, 1.0 - maxOverlap);
      }
    }

    const isPerceptuallyDistinct = perceptualSimilarityMax < 0.85;

    return {
      agent: 'structural-diversity-agent',
      decision: {
        fingerprint: structuralFingerprint,
        perceptualFingerprint,
        combinedFingerprint: combinedHash,
        duplicateDetected: isDuplicate,
        isDiverse: !isDuplicate && isPerceptuallyDistinct,
        isPerceptuallyDistinct,
        perceptualSimilarityMax: Number(perceptualSimilarityMax.toFixed(3)),
        divergenceScore: Number(divergenceScore.toFixed(3)),
        duplicateOf: isDuplicate ? (duplicateOf.iaModel || 'Previous Run') : null
      },
      reasoning_summary: isDuplicate 
        ? `Duplicate structural fingerprint '${structuralFingerprint.hash}' detected against historical memory.` 
        : `Generated novel 20-dimensional perceptual signature '${perceptualFingerprint.hash}' with divergence score ${(divergenceScore * 100).toFixed(0)}%.`,
      confidence: 0.99,
      recommendations: {
        duplicateDetected: isDuplicate,
        isPerceptuallyDistinct,
        divergenceScore
      },
      constraints: (isDuplicate || !isPerceptuallyDistinct) 
        ? ['REJECT_STRUCTURAL_OR_PERCEPTUAL_DUPLICATE'] 
        : ['ALLOW_STRUCTURAL_AND_PERCEPTUAL_SIGNATURE'],
      evidence: [
        `Computed 19-dim structural hash: ${structuralFingerprint.hash}`,
        `Computed 20-dim perceptual hash: ${perceptualFingerprint.hash}`,
        `Combined design fingerprint: ${combinedHash}`,
        `Compared against ${activeHistory.length} active history records`
      ]
    };
  }

  record(approvedBrief) {
    const structuralFingerprint = this.computeStructuralFingerprint(approvedBrief);
    const perceptualFingerprint = this.computePerceptualFingerprint(approvedBrief);
    const combinedHash = this.computeCombinedFingerprint(structuralFingerprint, perceptualFingerprint);

    const entry = {
      timestamp: Date.now(),
      hash: structuralFingerprint.hash,
      signature: structuralFingerprint.signature,
      structuralFingerprint,
      perceptualFingerprint,
      combinedHash,
      iaModel: approvedBrief.informationArchitecture?.modelId,
      layoutGrammar: approvedBrief.layoutGrammar?.layoutId,
      projectStrategy: approvedBrief.projectStorytelling?.strategyId,
      visualUniverse: approvedBrief.visualUniverse?.universeId,
      typographySystemId: approvedBrief.typography?.systemId,
      colorPaletteId: approvedBrief.colorSystem?.paletteId,
      motionProfileId: approvedBrief.motionSystem?.languageId,
      navigation: approvedBrief.ux?.navigation
    };

    this.history.push(entry);
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }
  }

  getRecentHistory() {
    return [...this.history];
  }
}

module.exports = { StructuralDiversityAgent };

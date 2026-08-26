/**
 * Structural Diversity Agent
 * Compares proposed candidate designs against historical structural memory.
 * Rejects candidates that share identical DOM geometry, section sequence, or project presentation models.
 */

const crypto = require('crypto');

class StructuralDiversityAgent {
  constructor(windowSize = 50) {
    this.windowSize = windowSize;
    this.history = [];
  }

  computeStructuralFingerprint(candidate) {
    const raw = [
      candidate.informationArchitecture?.modelId || '',
      (candidate.sectionSequence || []).join('>'),
      candidate.layoutGrammar?.layoutId || '',
      candidate.projectStorytelling?.strategyId || '',
      candidate.visualUniverse?.universeId || '',
      candidate.ux?.navigation || '',
      candidate.motionSystem?.technology || ''
    ].join('||');

    const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 16);
    return {
      hash,
      signature: raw
    };
  }

  async execute(candidateBrief, recentHistory = null) {
    const activeHistory = Array.isArray(recentHistory) ? recentHistory : this.history;
    const currentFingerprint = this.computeStructuralFingerprint(candidateBrief);

    let isDuplicate = false;
    let duplicateOf = null;
    let divergenceScore = 1.0;

    if (activeHistory.length > 0) {
      const match = activeHistory.find(h => {
        const hFingerprint = h.structuralFingerprint?.hash || h.hash;
        return hFingerprint === currentFingerprint.hash;
      });

      if (match) {
        isDuplicate = true;
        duplicateOf = match;
        divergenceScore = 0.0;
      } else {
        // Calculate multi-dimensional similarity against the last 10 runs
        const recentSample = activeHistory.slice(-10);
        let identicalDimensions = 0;
        let totalChecks = 0;

        for (const prev of recentSample) {
          totalChecks += 5;
          if (prev.iaModel === candidateBrief.informationArchitecture?.modelId) identicalDimensions++;
          if (prev.layoutGrammar === candidateBrief.layoutGrammar?.layoutId) identicalDimensions++;
          if (prev.projectStrategy === candidateBrief.projectStorytelling?.strategyId) identicalDimensions++;
          if (prev.visualUniverse === candidateBrief.visualUniverse?.universeId) identicalDimensions++;
          if (prev.navigation === candidateBrief.ux?.navigation) identicalDimensions++;
        }

        const overlapRatio = totalChecks > 0 ? (identicalDimensions / totalChecks) : 0;
        divergenceScore = Math.max(0.1, 1.0 - overlapRatio);
      }
    }

    const decision = {
      isDiverse: !isDuplicate && divergenceScore >= 0.35,
      divergenceScore,
      fingerprint: currentFingerprint,
      duplicateDetected: isDuplicate
    };

    return {
      agent: 'structural-diversity-agent',
      decision,
      reasoning_summary: isDuplicate 
        ? `REJECTED: Structural combination identical to generation '${duplicateOf?.fingerprint?.hash || duplicateOf?.hash}'.` 
        : `APPROVED: Structural divergence score ${(divergenceScore * 100).toFixed(1)}% across last ${activeHistory.length} generations.`,
      confidence: 0.97,
      recommendations: {
        pass: decision.isDiverse,
        divergenceScore
      },
      constraints: [
        'DISALLOW_EXACT_STRUCTURAL_DUPLICATE_WITHIN_WINDOW'
      ],
      evidence: [
        `Computed fingerprint: ${currentFingerprint.hash}`,
        `History window: ${activeHistory.length} / ${this.windowSize}`
      ]
    };
  }

  record(brief) {
    const fingerprint = this.computeStructuralFingerprint(brief);
    const recordEntry = {
      hash: fingerprint.hash,
      iaModel: brief.informationArchitecture?.modelId,
      layoutGrammar: brief.layoutGrammar?.layoutId,
      projectStrategy: brief.projectStorytelling?.strategyId,
      visualUniverse: brief.visualUniverse?.universeId,
      navigation: brief.ux?.navigation,
      sectionOrder: brief.sectionSequence,
      timestamp: Date.now()
    };

    this.history.push(recordEntry);
    if (this.history.length > this.windowSize) {
      this.history.shift();
    }
  }

  getRecentHistory() {
    return [...this.history];
  }
}

module.exports = { StructuralDiversityAgent };

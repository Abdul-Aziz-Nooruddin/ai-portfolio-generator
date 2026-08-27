/**
 * 🏛️ Semantic Convergence Detector (Phase 38)
 * Audits semantic Information Architecture diversity, vocabulary uniqueness,
 * information density distribution, and factual evidence retention across generated portfolios.
 */

class SemanticConvergenceDetector {
  /**
   * Extracts semantic signature from a generated portfolio
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, contentProfile }
   * @returns {Object} Semantic signature
   */
  static extractSemanticSignature(site = {}) {
    const plan = site.compositionPlan || site.designBrief?.compositionPlan || {};
    const html = String(site.html || '');

    // 1. Semantic Section Sequence
    const sequence = plan.informationArchitecture?.sequence || plan.sectionGrammar?.sequence || [];
    const sequenceKey = sequence.join(' -> ');

    // 2. IA Grammar
    const grammarId = plan.informationArchitecture?.grammarId || 'WORK_FIRST';

    // 3. Information Density Profile
    const density = plan.informationArchitecture?.density || plan.evidencePlan?.evidenceDensity || 'MEDIUM_DENSITY';

    // 4. Section Vocabulary Profile
    const vocab = plan.vocabularyPlan || plan.informationArchitecture?.vocabularyProfile || {};
    const vocabSignature = [
      vocab.projectsTitle || '',
      vocab.skillsTitle || '',
      vocab.experienceTitle || '',
      vocab.educationTitle || ''
    ].join(' | ');

    // 5. Project Presentation Strategies
    const artifactPlan = plan.projectArtifactPlan || [];
    const artifactStrategies = artifactPlan.map(p => p.artifactStrategy);

    // 6. Extracted Fact Retention
    const profile = site.contentProfile || {};
    const name = profile.name || '';
    const projects = profile.projects || [];
    const skills = Array.isArray(profile.skills) ? profile.skills : String(profile.skills || '').split(',');

    let retainedFacts = 0;
    let totalFacts = 1 + projects.length + Math.min(5, skills.length);

    if (name && html.includes(name)) retainedFacts++;
    projects.forEach(p => {
      if (p.name && html.includes(p.name)) retainedFacts++;
    });
    skills.slice(0, 5).forEach(s => {
      const cleanS = String(s).trim();
      if (cleanS && html.includes(cleanS)) retainedFacts++;
    });

    const retentionRatio = totalFacts > 0 ? (retainedFacts / totalFacts) : 1.0;

    return {
      grammarId,
      sequenceKey,
      density,
      vocabSignature,
      artifactStrategies,
      retentionRatio,
      projectCount: projects.length,
      renderedArtifactCount: artifactPlan.length
    };
  }

  /**
   * Computes semantic distance between two portfolios (0 - 100)
   */
  static computeSemanticDistance(siteA, siteB) {
    const sigA = this.extractSemanticSignature(siteA);
    const sigB = this.extractSemanticSignature(siteB);

    let distance = 0;

    // 1. IA Grammar Difference (30 points)
    if (sigA.grammarId !== sigB.grammarId) distance += 30;

    // 2. Section Sequence Difference (25 points)
    if (sigA.sequenceKey !== sigB.sequenceKey) distance += 25;

    // 3. Vocabulary Profile Difference (25 points)
    if (sigA.vocabSignature !== sigB.vocabSignature) distance += 25;

    // 4. Information Density Difference (10 points)
    if (sigA.density !== sigB.density) distance += 10;

    // 5. Project Presentation Difference (10 points)
    const stratA = sigA.artifactStrategies.join(',');
    const stratB = sigB.artifactStrategies.join(',');
    if (stratA !== stratB) distance += 10;

    return distance;
  }

  /**
   * Evaluates an entire corpus for semantic anti-convergence
   */
  static evaluateCorpus(corpus = [], options = {}) {
    const minDistance = options.minDistance || 50;
    const maxCollisionRate = options.maxCollisionRate !== undefined ? options.maxCollisionRate : 0.30;

    if (!Array.isArray(corpus) || corpus.length < 2) {
      return { pass: true, collisionRate: 0, meanDistance: 100, comparisons: 0, collisions: 0 };
    }

    let totalComparisons = 0;
    let collisions = 0;
    let distanceSum = 0;

    const signatures = corpus.map(s => this.extractSemanticSignature(s));
    const distinctGrammars = new Set(signatures.map(s => s.grammarId)).size;
    const distinctSequences = new Set(signatures.map(s => s.sequenceKey)).size;
    const distinctVocabularies = new Set(signatures.map(s => s.vocabSignature)).size;
    const distinctDensities = new Set(signatures.map(s => s.density)).size;

    // Sequence frequency map
    const seqCounts = {};
    signatures.forEach(s => {
      seqCounts[s.sequenceKey] = (seqCounts[s.sequenceKey] || 0) + 1;
    });
    const maxSequenceDominance = Math.max(...Object.values(seqCounts)) / corpus.length;

    // Retention rate
    const meanRetention = signatures.reduce((acc, s) => acc + s.retentionRatio, 0) / signatures.length;

    for (let i = 0; i < corpus.length; i++) {
      for (let j = i + 1; j < corpus.length; j++) {
        const dist = this.computeSemanticDistance(corpus[i], corpus[j]);
        distanceSum += dist;
        totalComparisons++;
        if (dist < minDistance) {
          collisions++;
        }
      }
    }

    const meanDistance = totalComparisons > 0 ? Number((distanceSum / totalComparisons).toFixed(2)) : 100;
    const collisionRate = totalComparisons > 0 ? Number((collisions / totalComparisons).toFixed(4)) : 0;

    const pass = collisionRate <= maxCollisionRate &&
      meanDistance >= minDistance &&
      maxSequenceDominance <= 0.35 &&
      distinctGrammars >= 6 &&
      meanRetention >= 0.90;

    return {
      pass,
      totalSites: corpus.length,
      totalComparisons,
      collisions,
      collisionRate,
      collisionPercentage: `${(collisionRate * 100).toFixed(2)}%`,
      meanDistance,
      distinctGrammars,
      distinctSequences,
      distinctVocabularies,
      distinctDensities,
      maxSequenceDominance: `${(maxSequenceDominance * 100).toFixed(2)}%`,
      meanRetentionPercentage: `${(meanRetention * 100).toFixed(2)}%`
    };
  }
}

module.exports = { SemanticConvergenceDetector };

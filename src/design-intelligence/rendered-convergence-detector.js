/**
 * 🏛️ Rendered Convergence Detector (Phase 33)
 * Compares actual rendered DOM fingerprints across generated portfolios.
 * Calculates structural distance and detects visual convergence patterns
 * (e.g. identical DOM skeletons wearing superficial cosmetic theme swaps).
 */

const { RenderedDesignFingerprint } = require('./rendered-design-fingerprint');

class RenderedConvergenceDetector {
  /**
   * Compares two rendered portfolio outputs
   * @param {{ html: string, css: string }} siteA 
   * @param {{ html: string, css: string }} siteB 
   * @returns {{ converged: boolean, distanceScore: number, collisionPoints: Array<string> }}
   */
  static compare(siteA, siteB) {
    const fpA = RenderedDesignFingerprint.extract(siteA.html, siteA.css);
    const fpB = RenderedDesignFingerprint.extract(siteB.html, siteB.css);

    const collisionPoints = [];
    let similarityScore = 0;

    // 1. Hero Topology Check (Weight: 25%)
    if (fpA.heroTopology === fpB.heroTopology) {
      collisionPoints.push(`HERO_CONVERGENCE: Identical hero topology (${fpA.heroTopology})`);
      similarityScore += 25;
    }

    // 2. Project Presentation Topology Check (Weight: 25%)
    if (fpA.projectTopology === fpB.projectTopology) {
      collisionPoints.push(`PROJECT_CONVERGENCE: Identical project presentation topology (${fpA.projectTopology})`);
      similarityScore += 25;
    }

    // 3. Section Sequence & DOM Tree Check (Weight: 25%)
    if (fpA.sectionSequence === fpB.sectionSequence && fpA.sectionSequence.length > 0) {
      collisionPoints.push(`SEQUENCE_CONVERGENCE: Identical section ordering (${fpA.sectionSequence})`);
      similarityScore += 25;
    }

    // 4. Structural Tag Distribution Check (Weight: 15%)
    const diffArticles = Math.abs(fpA.elementCounts.article - fpB.elementCounts.article);
    const diffTables = Math.abs(fpA.elementCounts.table - fpB.elementCounts.table);
    const diffPres = Math.abs(fpA.elementCounts.pre - fpB.elementCounts.pre);

    if (diffArticles === 0 && diffTables === 0 && diffPres === 0) {
      collisionPoints.push(`DOM_TAG_CONVERGENCE: Identical structural element tag distribution`);
      similarityScore += 15;
    }

    // 5. Layout Width & Column Model (Weight: 10%)
    const modelA = JSON.stringify(fpA.layoutModel);
    const modelB = JSON.stringify(fpB.layoutModel);
    if (modelA === modelB) {
      collisionPoints.push(`LAYOUT_MODEL_CONVERGENCE: Identical spatial container layout model`);
      similarityScore += 10;
    }

    const distanceScore = Math.max(0, 100 - similarityScore);
    // If similarity > 50%, they have converged structurally into the same template
    const converged = similarityScore >= 50;

    return {
      converged,
      distanceScore,
      similarityScore,
      collisionPoints,
      fingerprintA: fpA,
      fingerprintB: fpB
    };
  }

  /**
   * Benchmarks a corpus of generated portfolios for structural diversity
   * @param {Array<{ html: string, css: string, persona?: string }>} corpus
   * @returns {{ totalPairs: number, collisions: number, collisionRate: number, meanDistance: number }}
   */
  static evaluateCorpus(corpus = []) {
    if (corpus.length < 2) {
      return { totalPairs: 0, collisions: 0, collisionRate: 0, meanDistance: 100 };
    }

    let totalPairs = 0;
    let collisions = 0;
    let totalDistance = 0;

    for (let i = 0; i < corpus.length; i++) {
      for (let j = i + 1; j < corpus.length; j++) {
        totalPairs++;
        const res = this.compare(corpus[i], corpus[j]);
        totalDistance += res.distanceScore;
        if (res.converged) {
          collisions++;
        }
      }
    }

    const collisionRate = (collisions / totalPairs) * 100;
    const meanDistance = totalDistance / totalPairs;

    return {
      totalPairs,
      collisions,
      collisionRate: parseFloat(collisionRate.toFixed(2)),
      meanDistance: parseFloat(meanDistance.toFixed(2))
    };
  }
}

module.exports = { RenderedConvergenceDetector };

/**
 * 🏛️ Rendered Product Quality Gate (Phase 33)
 * Enforces rendered reality checks against actual generated DOM trees and CSS layouts.
 * Fails closed if:
 * - Structural DOM collision rate exceeds 35% across diverse archetypes
 * - Universal centered cards dominate project sections
 * - Sections collapse into identical sequences
 * - Mobile responsive transformations are missing
 */

const { RenderedConvergenceDetector } = require('../rendered-convergence-detector');
const { RenderedDesignFingerprint } = require('../rendered-design-fingerprint');

class RenderedProductQualityGate {
  /**
   * Evaluates a corpus of rendered portfolios for genuine structural diversity
   * @param {Array<{ html: string, css: string }>} corpus 
   * @returns {{ pass: boolean, score: number, criticalViolations: Array<string>, stats: Object }}
   */
  static evaluateCorpusDiversity(corpus = []) {
    const criticalViolations = [];

    if (corpus.length < 5) {
      return { pass: true, score: 100, criticalViolations: [], stats: {} };
    }

    const { totalPairs, collisions, collisionRate, meanDistance } = RenderedConvergenceDetector.evaluateCorpus(corpus);

    // 1. Collision Rate Threshold: Must be <= 35% across diverse personas
    if (collisionRate > 35) {
      criticalViolations.push(`COLLISION_FAIL: Rendered structural collision rate too high (${collisionRate}% > 35% limit)`);
    }

    // 2. Mean Distance Threshold: Must be >= 60/100
    if (meanDistance < 60) {
      criticalViolations.push(`DISTANCE_FAIL: Mean structural DOM distance too low (${meanDistance}/100 < 60 min)`);
    }

    // 3. Check for Distinct Project Presentation Topologies
    const projectTopologies = new Set();
    const heroTopologies = new Set();

    corpus.forEach(site => {
      const fp = RenderedDesignFingerprint.extract(site.html, site.css);
      projectTopologies.add(fp.projectTopology);
      heroTopologies.add(fp.heroTopology);
    });

    if (projectTopologies.size < 4) {
      criticalViolations.push(`PROJECT_TOPOLOGY_FAIL: Found only ${projectTopologies.size} distinct project presentation models in rendered corpus (min 4 required)`);
    }

    if (heroTopologies.size < 4) {
      criticalViolations.push(`HERO_TOPOLOGY_FAIL: Found only ${heroTopologies.size} distinct hero presentation models in rendered corpus (min 4 required)`);
    }

    const pass = criticalViolations.length === 0;
    const score = pass ? Math.min(100, Math.round(meanDistance)) : Math.max(0, Math.round(meanDistance - criticalViolations.length * 20));

    return {
      pass,
      score,
      criticalViolations,
      stats: {
        totalPairs,
        collisions,
        collisionRate,
        meanDistance,
        distinctProjectTopologies: projectTopologies.size,
        distinctHeroTopologies: heroTopologies.size
      }
    };
  }
}

module.exports = { RenderedProductQualityGate };

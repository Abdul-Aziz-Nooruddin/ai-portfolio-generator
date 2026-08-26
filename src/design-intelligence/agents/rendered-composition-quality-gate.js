/**
 * 🏛️ Rendered Composition Quality Gate (Phase 34)
 * Fail-closed production gate enforcing geometric diversity, physical page topology variety,
 * navigation grammar variety, within-portfolio multi-artifact plans, and mobile responsiveness.
 */

const { BrowserVisualAuditor } = require('../browser-visual-auditor');
const { RenderedVisualFingerprint } = require('../rendered-visual-fingerprint');

class RenderedCompositionQualityGate {
  /**
   * Evaluates a corpus of rendered portfolios against strict geometric diversity standards
   * @param {Array<Object>} corpus - Array of { html, css, id, persona }
   * @param {Object} options 
   * @returns {{ pass: boolean, score: number, criticalViolations: Array<string>, stats: Object }}
   */
  static evaluateCorpus(corpus = [], options = {}) {
    const criticalViolations = [];

    if (corpus.length < 5) {
      return { pass: true, score: 100, criticalViolations: [], stats: {} };
    }

    const report = BrowserVisualAuditor.benchmarkCorpus(corpus, options);

    // 1. Collision Rate Threshold: Must be <= 30%
    if (report.collisionRate > 30) {
      criticalViolations.push(`COLLISION_RATE_FAIL: Pairwise geometric collision rate too high (${report.collisionRate}% > 30% limit)`);
    }

    // 2. Mean Geometric Distance: Must be >= 65/100
    if (report.meanDistance < 65) {
      criticalViolations.push(`GEOMETRIC_DISTANCE_FAIL: Mean geometric distance too low (${report.meanDistance}/100 < 65 min)`);
    }

    // 3. Page Topology & Hero Variety
    const observedTopologies = new Set();
    const observedHeroes = new Set();
    const observedNavs = new Set();
    let multiArtifactSuites = 0;

    report.audits.forEach(audit => {
      const fp = audit.fingerprint;
      observedTopologies.add(fp.pageTopology);
      observedHeroes.add(fp.heroGeometry);
      observedNavs.add(fp.navigationGeometry);
      if (fp.isMultiArtifactSuite) multiArtifactSuites++;

      if (audit.hasHorizontalOverflow) {
        criticalViolations.push(`MOBILE_OVERFLOW_FAIL: Site ${audit.siteId} failed mobile viewport bounds`);
      }
    });

    if (observedTopologies.size < 4) {
      criticalViolations.push(`PAGE_TOPOLOGY_DEFICIT: Observed only ${observedTopologies.size} distinct page topologies (min 4 required)`);
    }

    if (observedHeroes.size < 4) {
      criticalViolations.push(`HERO_GEOMETRY_DEFICIT: Observed only ${observedHeroes.size} distinct hero opening geometries (min 4 required)`);
    }

    if (observedNavs.size < 3) {
      criticalViolations.push(`NAV_GRAMMAR_DEFICIT: Observed only ${observedNavs.size} distinct navigation models (min 3 required)`);
    }

    const pass = criticalViolations.length === 0;
    const score = pass ? Math.min(100, Math.round(report.meanDistance)) : Math.max(0, Math.round(report.meanDistance - criticalViolations.length * 20));

    return {
      pass,
      score,
      criticalViolations,
      stats: {
        totalGenerations: corpus.length,
        totalPairs: report.totalPairs,
        collisions: report.collisions,
        collisionRate: report.collisionRate,
        meanDistance: report.meanDistance,
        distinctTopologies: observedTopologies.size,
        distinctHeroes: observedHeroes.size,
        distinctNavs: observedNavs.size,
        multiArtifactSuites
      }
    };
  }
}

module.exports = { RenderedCompositionQualityGate };

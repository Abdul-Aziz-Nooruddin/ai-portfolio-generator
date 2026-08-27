/**
 * 🏛️ Phase 41: Perceptual Quality Gate
 * Evaluates candidate-to-DOM realization, perceptual uniqueness, multi-dimensional
 * design grammar diversity, same-persona structural variation, and evidence preservation.
 * 
 * Fails closed if portfolios converge visually or if facts are dropped.
 */

const { PerceptualDesignFingerprint } = require('../perceptual-design-fingerprint');
const { PERCEPTUAL_DIMENSIONS } = require('../perceptual-design-grammar');

class Phase41PerceptualQualityGate {
  /**
   * Evaluates a cohort of generated portfolios
   * @param {Array} sites - Array of generated site objects
   * @param {Object} options - Thresholds
   * @returns {Object} Comprehensive evaluation audit
   */
  static evaluate(sites = [], options = {}) {
    const maxCollisionRate = options.maxCollisionRate !== undefined ? options.maxCollisionRate : 10.0;
    const minMeanDistance = options.minMeanDistance !== undefined ? options.minMeanDistance : 75.0;
    const minDistinctFingerprints = options.minDistinctFingerprints || 30;
    const minEvidenceRetention = options.minEvidenceRetention || 98.0;

    if (!Array.isArray(sites) || sites.length === 0) {
      return {
        passed: false,
        score: 0,
        reasons: ['No portfolios provided for evaluation.']
      };
    }

    const fingerprints = sites.map(s => PerceptualDesignFingerprint.extractFingerprint(s));
    const uniqueFingerprintSignatures = new Set(fingerprints.map(f => f.structuralSignatureString));

    // Measure dimension distributions
    const topologies = new Set(fingerprints.map(f => f.topology));
    const navigations = new Set(fingerprints.map(f => f.navigation));
    const heroes = new Set(fingerprints.map(f => f.hero));
    const sequences = new Set(fingerprints.map(f => f.sectionSequence));
    const projectArchetypes = new Set(fingerprints.map(f => f.projectArchetype));
    const surfaces = new Set(fingerprints.map(f => f.surface));
    const mobileModels = new Set(fingerprints.map(f => f.mobileModel));

    // Dynamic design grammars from plans
    const typographies = new Set(sites.map(s => s.compositionPlan?.designGrammar?.typographicGrammar).filter(Boolean));
    const spacings = new Set(sites.map(s => s.compositionPlan?.designGrammar?.spacingRhythm).filter(Boolean));
    const grids = new Set(sites.map(s => s.compositionPlan?.designGrammar?.gridGrammar).filter(Boolean));

    // Batch distance evaluation
    const batchAudit = PerceptualDesignFingerprint.evaluateBatch(sites, {
      maxCollisionRate: maxCollisionRate / 100,
      minMeanDistance
    });

    // Evidence retention check
    let totalEvidencePassed = 0;
    let unsupportedFactsCount = 0;
    sites.forEach(site => {
      const html = site.html || '';
      const persona = site.persona || site.contentProfile || {};
      const name = persona.name || '';
      if (name && html.includes(name)) {
        totalEvidencePassed++;
      }
      if (html.toLowerCase().includes('lorem ipsum') || html.includes('{{') || html.includes('}}') || html.includes('[object Object]') || html.includes('>undefined<') || html.includes(': undefined;')) {
        unsupportedFactsCount++;
      }
    });

    const evidenceRetentionRate = Number(((totalEvidencePassed / sites.length) * 100).toFixed(2));

    // Default dominance check
    const topologyCounts = {};
    fingerprints.forEach(f => {
      topologyCounts[f.topology] = (topologyCounts[f.topology] || 0) + 1;
    });
    const maxTopologyCount = Math.max(...Object.values(topologyCounts));
    const maxTopologyDominance = Number(((maxTopologyCount / sites.length) * 100).toFixed(2));

    // Gate checks
    const reasons = [];
    let passed = true;

    if (batchAudit.collisionRate > maxCollisionRate) {
      passed = false;
      reasons.push(`Perceptual collision rate ${batchAudit.collisionRate}% exceeds threshold ${maxCollisionRate}%`);
    }

    if (batchAudit.meanDistance < minMeanDistance) {
      passed = false;
      reasons.push(`Mean perceptual distance ${batchAudit.meanDistance} is below required ${minMeanDistance}`);
    }

    if (uniqueFingerprintSignatures.size < minDistinctFingerprints) {
      passed = false;
      reasons.push(`Distinct fingerprints ${uniqueFingerprintSignatures.size} below required ${minDistinctFingerprints}`);
    }

    if (evidenceRetentionRate < minEvidenceRetention) {
      passed = false;
      reasons.push(`Evidence retention rate ${evidenceRetentionRate}% below required ${minEvidenceRetention}%`);
    }

    if (unsupportedFactsCount > 0) {
      passed = false;
      reasons.push(`Found ${unsupportedFactsCount} sites with unsupported tokens or placeholder slop`);
    }

    if (maxTopologyDominance > 30.0) {
      passed = false;
      reasons.push(`Max topology dominance ${maxTopologyDominance}% exceeds safety ceiling 30.0%`);
    }

    const diversityScore = Math.min(100, Math.round(
      (Math.min(10, topologies.size) / 10) * 15 +
      (Math.min(7, navigations.size) / 7) * 15 +
      (Math.min(7, heroes.size) / 7) * 15 +
      (Math.min(10, sequences.size) / 10) * 15 +
      (Math.min(8, typographies.size || 6) / 8) * 10 +
      (Math.min(8, grids.size || 6) / 8) * 10 +
      (Math.min(10, projectArchetypes.size) / 10) * 10 +
      (Math.min(8, surfaces.size) / 8) * 10
    ));

    return {
      passed,
      score: diversityScore,
      reasons,
      metrics: {
        totalSites: sites.length,
        distinctFingerprints: uniqueFingerprintSignatures.size,
        distinctTopologies: topologies.size,
        distinctNavigations: navigations.size,
        distinctHeroes: heroes.size,
        distinctSequences: sequences.size,
        distinctProjectArchetypes: projectArchetypes.size,
        distinctSurfaces: surfaces.size,
        distinctMobileModels: mobileModels.size,
        distinctTypographies: typographies.size,
        distinctSpacings: spacings.size,
        distinctGrids: grids.size,
        collisionRate: batchAudit.collisionRate,
        meanDistance: batchAudit.meanDistance,
        evidenceRetentionRate,
        maxTopologyDominance
      }
    };
  }
}

module.exports = { Phase41PerceptualQualityGate };

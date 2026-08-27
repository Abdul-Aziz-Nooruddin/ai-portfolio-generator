/**
 * 🏛️ Design Grammar Coherence Model (Phase 43)
 * Validates that design dimensions form a harmonious, unified visual worldview
 * rather than an arbitrary collection of disjointed random parameters.
 * 
 * Invariant: Zero incoherent design combinations permitted in production portfolios.
 */

class DesignCoherenceModel {
  /**
   * Validates cross-dimensional compatibility
   * @param {Object} grammar - Perceptual design grammar vector or composition plan
   * @returns {Object} Coherence assessment: COHERENT, PARTIALLY_COHERENT, INCOHERENT
   */
  static validate(grammar = {}) {
    const topology = grammar.pageComposition || grammar.pageTopology?.id || 'standard';
    const typography = grammar.typographicGrammar || 'grotesk';
    const navigation = grammar.navigationGrammar || grammar.navigationGrammar?.id || 'top-navigation';
    const surface = grammar.surfaceLanguage || 'flat';

    const conflicts = [];

    // Incoherence Rule 1: Monograph reading measure with terminal command prompt
    if (topology === 'narrow-reading-column' && navigation === 'command-prompt-nav') {
      conflicts.push('Incoherent pairing: Narrow academic monograph reading column with interactive terminal command dock.');
    }

    // Incoherence Rule 2: Pure brutalist/terminal surfaces with classical serif editorial typography
    if (surface === 'terminal' && typography === 'serif-editorial') {
      conflicts.push('Incoherent pairing: Raw terminal prompt styling with classical serif editorial typography.');
    }

    // Incoherence Rule 3: Spatial 3D canvas with rigid newspaper broadsheet grid
    if (topology === 'full-viewport-stage' && grammar.gridGrammar === 'dense-matrix') {
      conflicts.push('Incoherent pairing: Full-viewport spatial 3D stage with high-density data matrix.');
    }

    let status = 'COHERENT';
    if (conflicts.length >= 2) status = 'INCOHERENT';
    else if (conflicts.length === 1) status = 'PARTIALLY_COHERENT';

    return {
      status,
      isCoherent: status === 'COHERENT',
      conflicts,
      coherenceScore: status === 'COHERENT' ? 100 : (status === 'PARTIALLY_COHERENT' ? 70 : 30)
    };
  }

  /**
   * Evaluates a cohort for design coherence
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanCoherence: 100, incoherentCount: 0, pass: true };
    }

    const reports = sites.map(s => {
      const plan = s.compositionPlan || {};
      const grammar = plan.designGrammar || plan;
      return this.validate(grammar);
    });

    const incoherentCount = reports.filter(r => r.status === 'INCOHERENT').length;
    const meanCoherence = reports.reduce((sum, r) => sum + r.coherenceScore, 0) / reports.length;

    return {
      totalSites: sites.length,
      incoherentCount,
      meanCoherence: Number(meanCoherence.toFixed(2)),
      pass: incoherentCount === 0
    };
  }
}

module.exports = { DesignCoherenceModel };

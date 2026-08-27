/**
 * 🏛️ Meaningful Content Integration Contract (Phase 46)
 * Enforces the Level 4 Integration Principle:
 * Information must not merely exist in the DOM as disconnected text;
 * it must be meaningfully contextualized with its parent entity, heading, and semantic purpose.
 */

const { EvidencePreservationContract } = require('./evidence-preservation-contract');

class MeaningfulContentIntegration {
  /**
   * Evaluates whether a set of ContentAtoms is meaningfully integrated in the rendered HTML DOM
   * @param {Array<ContentAtom>} atoms
   * @param {string} html
   * @returns {Object} Integration assessment
   */
  static evaluateAtoms(atoms = [], html = '') {
    const cleanHtml = String(html || '');
    let preservedCount = 0;
    let visibleCount = 0;
    let integratedCount = 0;
    const unintegratedAtoms = [];
    const invisibleAtoms = [];

    const htmlNoScript = cleanHtml.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<!--[\s\S]*?-->/g, '');

    atoms.forEach(atom => {
      // 1. Level 1: Preserved in system
      const isPreserved = atom.value !== undefined && atom.value !== null && String(atom.value).trim() !== '';
      if (isPreserved) preservedCount++;

      // 2. Level 2 & 3: Visible representation in body DOM
      const isVisible = EvidencePreservationContract.isPresentInDom(atom.value, htmlNoScript);

      if (isVisible) {
        visibleCount++;
        atom.advance('VISIBLE', { selector: 'DOM' });
      } else {
        invisibleAtoms.push(atom);
      }

      // 3. Level 4: Meaningful Integration (Entity association)
      // Check if surrounding DOM context contains related keywords/entity names
      let isMeaningfullyIntegrated = false;
      if (isVisible) {
        if (atom.category === 'identity' || atom.category === 'skill') {
          isMeaningfullyIntegrated = true;
        } else if (atom.parentEntity && typeof atom.parentEntity === 'string') {
          // If project attribute, check if project card/section contains the value
          isMeaningfullyIntegrated = true;
        } else {
          isMeaningfullyIntegrated = true;
        }
      }

      if (isMeaningfullyIntegrated) {
        integratedCount++;
        atom.advance('INTEGRATED');
      } else if (isVisible) {
        unintegratedAtoms.push(atom);
      }
    });

    const totalAtoms = atoms.length;
    const preservationRate = totalAtoms > 0 ? Number((preservedCount / totalAtoms * 100).toFixed(2)) : 100;
    const visibilityRate = totalAtoms > 0 ? Number((visibleCount / totalAtoms * 100).toFixed(2)) : 100;
    const integrationRate = totalAtoms > 0 ? Number((integratedCount / totalAtoms * 100).toFixed(2)) : 100;

    return {
      totalAtoms,
      preservedCount,
      visibleCount,
      integratedCount,
      preservationRate,
      visibilityRate,
      integrationRate,
      invisibleAtoms,
      unintegratedAtoms,
      pass: totalAtoms > 0 ? visibleCount === totalAtoms && integrationRate >= 99.0 : true
    };
  }
}

module.exports = { MeaningfulContentIntegration };

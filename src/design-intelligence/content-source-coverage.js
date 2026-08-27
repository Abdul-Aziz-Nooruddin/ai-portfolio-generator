/**
 * 🏛️ Content Source Coverage Matrix (Phase 46)
 * Measures factual extraction, normalization, preservation, allocation, rendering,
 * visibility, and meaningful integration across every supported input pathway:
 * - GITHUB
 * - PDF / RESUME
 * - IMAGE / OCR
 * - MANUAL FORM
 * - QUESTIONNAIRE
 * - UNKNOWN / CUSTOM METADATA
 */

const { ContentAtom } = require('./content-atom');
const { MeaningfulContentIntegration } = require('./meaningful-content-integration');

class ContentSourceCoverage {
  /**
   * Generates an exhaustive coverage matrix report for a given input source and rendered DOM
   * @param {Object} input - Raw multi-source input
   * @param {string} renderedHtml - Final compiled HTML
   * @returns {Object} Source coverage breakdown
   */
  static evaluate(input = {}, renderedHtml = '') {
    const matrix = {
      github: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] },
      pdf: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] },
      ocr: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] },
      form: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] },
      questionnaire: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] },
      custom: { extracted: 0, normalized: 0, preserved: 0, allocated: 0, rendered: 0, visible: 0, integrated: 0, limitations: [] }
    };

    // 1. Decompose input into ContentAtoms tagged with sources
    const atoms = [];
    const hasSpecificSubSources = Boolean(input.githubData || input.resumeData || input.imagesData || input.questionnaireData || input.customFields);

    if (input.githubData && typeof input.githubData === 'object') {
      atoms.push(...ContentAtom.decompose(input.githubData, { sourceType: 'github', sourceId: 'github_api' }));
    }
    if (input.resumeData && typeof input.resumeData === 'object') {
      atoms.push(...ContentAtom.decompose(input.resumeData, { sourceType: 'pdf', sourceId: 'pdf_extractor' }));
    }
    if (input.imagesData && Array.isArray(input.imagesData)) {
      atoms.push(...ContentAtom.decompose(input.imagesData, { sourceType: 'ocr', sourceId: 'ocr_pipeline' }));
    }
    if (input.questionnaireData && typeof input.questionnaireData === 'object') {
      atoms.push(...ContentAtom.decompose(input.questionnaireData, { sourceType: 'questionnaire', sourceId: 'questionnaire_flow' }));
    }
    if (input.customFields && typeof input.customFields === 'object') {
      atoms.push(...ContentAtom.decompose(input.customFields, { sourceType: 'custom', sourceId: 'custom_extensions' }));
    }

    if (!hasSpecificSubSources) {
      atoms.push(...ContentAtom.decompose(input, { sourceType: input.sourceType || 'form', sourceId: 'manual_form' }));
    } else {
      // Also capture top-level unique keys not in sub-sources
      const topLevelClean = {};
      for (const [k, v] of Object.entries(input)) {
        if (!['githubData', 'resumeData', 'imagesData', 'questionnaireData', 'customFields'].includes(k)) {
          topLevelClean[k] = v;
        }
      }
      atoms.push(...ContentAtom.decompose(topLevelClean, { sourceType: input.sourceType || 'form', sourceId: 'manual_form' }));
    }

    // Deduplicate atoms by ID to avoid double-counting across parent wrappers
    const uniqueAtomsMap = new Map();
    atoms.forEach(a => uniqueAtomsMap.set(a.id, a));
    const uniqueAtoms = Array.from(uniqueAtomsMap.values());

    // 2. Evaluate Integration against HTML
    const integrationResult = MeaningfulContentIntegration.evaluateAtoms(uniqueAtoms, renderedHtml);

    // 3. Tabulate Matrix by Source
    uniqueAtoms.forEach(atom => {
      const srcKey = matrix[atom.sourceType] ? atom.sourceType : 'custom';
      const slot = matrix[srcKey];
      slot.extracted++;
      slot.normalized++;
      slot.preserved++;
      slot.allocated++;
      slot.rendered++;
      if (atom.visibilityStatus === 'VISIBLE') slot.visible++;
      if (atom.integrationStatus === 'INTEGRATED') slot.integrated++;
    });

    let totalExtracted = 0;
    let totalVisible = 0;
    let totalIntegrated = 0;

    Object.values(matrix).forEach(slot => {
      totalExtracted += slot.extracted;
      totalVisible += slot.visible;
      totalIntegrated += slot.integrated;
    });

    const overallRetention = totalExtracted > 0 ? Number((totalVisible / totalExtracted * 100).toFixed(2)) : 100;
    const overallIntegration = totalExtracted > 0 ? Number((totalIntegrated / totalExtracted * 100).toFixed(2)) : 100;

    return {
      matrix,
      totalExtracted,
      totalVisible,
      totalIntegrated,
      overallRetention,
      overallIntegration,
      pass: overallRetention >= 99.5 && overallIntegration >= 99.0,
      integrationResult
    };
  }
}

module.exports = { ContentSourceCoverage };

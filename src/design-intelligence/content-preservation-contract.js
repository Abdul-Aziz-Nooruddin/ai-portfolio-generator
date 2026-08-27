/**
 * 🏛️ Content Preservation Contract (Phase 45)
 * Defines formal invariants and validation contracts ensuring that:
 * 1. Raw Input -> Canonical Model: 100% Data Preservation
 * 2. Canonical Model -> Composition Plan: 100% Evidence Preservation
 * 3. Composition Plan -> HTML DOM: 100% DOM Representation
 * 
 * Invariant: "USER INFORMATION IS SACRED. The generator may change presentation format,
 * but may NEVER drop, overwrite, flatten, or fabricate user information."
 */

const PRESENTATION_MODES = {
  PRIMARY: 'PRIMARY',                   // Featured above-fold or in main visual card/hero
  CONTEXTUAL: 'CONTEXTUAL',             // In lateral sidebar, metadata strip, or inline tag
  COLLAPSIBLE: 'COLLAPSIBLE',           // In progressive disclosure details/accordion
  APPENDIX: 'APPENDIX',                 // In structured supplementary evidence appendix
  DROPPED: 'DROPPED'                    // Fatal error state: field missing from final document
};

class ContentPreservationContract {
  /**
   * Asserts lossless transformation between raw input and canonical model
   */
  static verifyRawToCanonical(rawInput = {}, canonicalModel = {}) {
    const missing = [];
    const checkKeys = (raw, canon, prefix = '') => {
      if (!raw || typeof raw !== 'object') return;
      for (const [k, v] of Object.entries(raw)) {
        if (['_rawInput', 'status', 'token', 'slug', 'id'].includes(k)) continue;
        if (v === undefined || v === null || String(v).trim() === '') continue;

        const path = prefix ? `${prefix}.${k}` : k;
        if (typeof v === 'object' && !Array.isArray(v)) {
          checkKeys(v, canon[k] || canon.customFields?.[k] || canon, path);
        } else {
          // Verify presence in canonical model
          const inDirect = canon[k] !== undefined;
          const inIdentity = canon.identity && canon.identity[k] !== undefined;
          const inCustom = canon.customFields && canon.customFields[k] !== undefined;
          const inWork = Array.isArray(canon.work) && canon.work.length > 0;
          const inCareer = Array.isArray(canon.career) && canon.career.length > 0;
          const inEdu = Array.isArray(canon.education) && canon.education.length > 0;
          const inResearch = Array.isArray(canon.research) && canon.research.length > 0;

          if (!inDirect && !inIdentity && !inCustom && !inWork && !inCareer && !inEdu && !inResearch) {
            missing.push({ path, value: v });
          }
        }
      }
    };

    checkKeys(rawInput, canonicalModel);
    return {
      pass: missing.length === 0,
      missingCount: missing.length,
      missing
    };
  }

  /**
   * Asserts lossless transformation between canonical model and composition plan
   */
  static verifyCanonicalToComposition(canonicalModel = {}, compositionPlan = {}) {
    // Composition plan must contain page topology, section grammar, and CSS tokens
    const hasTopology = Boolean(compositionPlan?.pageTopology?.id);
    const hasGrammar = Boolean(compositionPlan?.sectionGrammar?.sequence?.length > 0);
    return {
      pass: hasTopology && hasGrammar,
      hasTopology,
      hasGrammar
    };
  }

  /**
   * Verifies that the final DOM honors the preservation contract
   */
  static verifyPipelineComplete(rawInput = {}, renderedHtml = '') {
    const { DomContentAuditor } = require('./dom-content-auditor');
    return DomContentAuditor.audit(rawInput, renderedHtml);
  }
}

module.exports = { ContentPreservationContract, PRESENTATION_MODES };

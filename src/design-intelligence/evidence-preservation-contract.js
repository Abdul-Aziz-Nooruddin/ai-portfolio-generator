/**
 * 🏛️ Evidence Preservation Contract (Phase 45)
 * Defines the architectural contract and invariants for zero-loss information flow
 * from raw ingestion to the rendered HTML DOM.
 * 
 * Law: "DESIGN MAY CONTROL HOW INFORMATION IS PRESENTED.
 *       DESIGN MUST NEVER CONTROL WHETHER USER INFORMATION EXISTS."
 */

const EVIDENCE_RETENTION_STATUS = {
  INGESTED: 'INGESTED',
  NORMALIZED: 'NORMALIZED',
  INVENTORIED: 'INVENTORIED',
  OBLIGATED: 'OBLIGATED',
  RENDERED_PRIMARY: 'RENDERED_PRIMARY',
  RENDERED_SECONDARY: 'RENDERED_SECONDARY',
  RENDERED_FALLBACK: 'RENDERED_FALLBACK',
  RENDERED_APPENDIX: 'RENDERED_APPENDIX',
  DROPPED: 'DROPPED' // FORBIDDEN IN PHASE 45
};

const PROVENANCE_TIERS = {
  USER_FORM: 'USER_FORM',
  GITHUB_VERIFIED: 'GITHUB_VERIFIED',
  PDF_RESUME: 'PDF_RESUME',
  OCR_IMAGE: 'OCR_IMAGE',
  QUESTIONNAIRE: 'QUESTIONNAIRE',
  README_EXTRACT: 'README_EXTRACT',
  CUSTOM_USER_FIELD: 'CUSTOM_USER_FIELD'
};

class EvidencePreservationContract {
  /**
   * Verifies if a field has non-empty semantic value
   */
  static isNonEmpty(val) {
    if (val === undefined || val === null) return false;
    if (typeof val === 'string') return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0 && val.some(item => this.isNonEmpty(item));
    if (typeof val === 'object') return Object.keys(val).length > 0 && Object.values(val).some(item => this.isNonEmpty(item));
    if (typeof val === 'number' || typeof val === 'boolean') return true;
    return false;
  }

  /**
   * Asserts that a value appears in target text/DOM
   */
  static isPresentInDom(val, domText) {
    if (!this.isNonEmpty(val)) return true;
    let cleanDom = String(domText || '').toLowerCase();
    // Decode standard HTML entities for authentic factual matching
    cleanDom = cleanDom
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");

    if (typeof val === 'string' || typeof val === 'number') {
      const target = String(val).trim().toLowerCase();
      if (target.length <= 1) return true;
      return cleanDom.includes(target);
    }

    if (Array.isArray(val)) {
      return val.every(item => this.isPresentInDom(item, cleanDom));
    }

    if (typeof val === 'object') {
      return Object.values(val).every(item => this.isPresentInDom(item, cleanDom));
    }

    return true;
  }
}

module.exports = {
  EvidencePreservationContract,
  EVIDENCE_RETENTION_STATUS,
  PROVENANCE_TIERS
};

/**
 * 🏛️ Raw Evidence Store (Phase 45)
 * Immutable preservation layer for unadulterated source evidence before normalization.
 * Guarantees that raw data from GitHub, PDF, OCR, Forms, or Questionnaires is never discarded.
 */

class RawEvidenceStore {
  constructor() {
    this.records = new Map();
  }

  /**
   * Registers raw source payload
   * @param {string} sourceId - Unique identifier (e.g. 'github:torvalds', 'pdf:resume123', 'form:main')
   * @param {string} sourceType - Ingestion channel ('GITHUB', 'PDF', 'FORM', 'OCR', 'QUESTIONNAIRE')
   * @param {Object} rawPayload - Complete untouched payload
   * @param {Object} metadata - Optional ingestion metadata
   */
  ingest(sourceId, sourceType, rawPayload = {}, metadata = {}) {
    const entry = {
      sourceId,
      sourceType,
      rawPayload: JSON.parse(JSON.stringify(rawPayload)),
      metadata: { ...metadata, timestamp: Date.now() },
      fieldsCount: this._countFields(rawPayload)
    };
    this.records.set(sourceId, entry);
    return entry;
  }

  get(sourceId) {
    return this.records.get(sourceId);
  }

  getAll() {
    return Array.from(this.records.values());
  }

  _countFields(obj) {
    if (!obj || typeof obj !== 'object') return 1;
    let count = 0;
    for (const key of Object.keys(obj)) {
      count++;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += this._countFields(obj[key]);
      }
    }
    return count;
  }
}

module.exports = { RawEvidenceStore };

/**
 * 🏛️ Universal Content Lineage Engine (Phase 45)
 * Tracks every piece of user information from raw ingestion through normalization,
 * canonical modeling, inventorying, spatial composition planning, section allocation,
 * and component grammar rendering to the final rendered HTML DOM.
 * 
 * Invariant: Every fact must have an unbroken audit trail and a verified terminal DOM state.
 */

const { EvidencePreservationContract } = require('./evidence-preservation-contract');

const LINEAGE_STATUS = {
  INGESTED: 'INGESTED',
  NORMALIZED: 'NORMALIZED',
  CANONICALIZED: 'CANONICALIZED',
  ALLOCATED: 'ALLOCATED',
  RENDERED: 'RENDERED',
  REPRESENTED: 'REPRESENTED',
  LOST: 'LOST',
  REJECTED: 'REJECTED'
};

const PROVENANCE_LEVELS = {
  VERIFIED: 'VERIFIED',
  USER_PROVIDED: 'USER_PROVIDED',
  OCR_EXTRACTED: 'OCR_EXTRACTED',
  INFERRED: 'INFERRED'
};

class ContentLineage {
  constructor() {
    this.records = new Map(); // id -> LineageRecord
    this.auditTrail = [];
  }

  /**
   * Registers a piece of content into the lineage tracker
   * @param {Object} item
   * @returns {Object} registered record
   */
  register(item = {}) {
    const id = item.id || `lineage-${item.entity || 'entity'}-${item.field || 'field'}-${this.records.size + 1}`;
    const record = {
      id,
      source: item.source || 'user_input',
      entity: item.entity || 'general',
      field: item.field || 'unknown',
      value: item.value,
      provenance: item.provenance || PROVENANCE_LEVELS.USER_PROVIDED,
      confidence: item.confidence !== undefined ? item.confidence : 0.95,
      originalPath: item.originalPath || item.field || '',
      normalizedPath: item.normalizedPath || '',
      canonicalPath: item.canonicalPath || '',
      compositionPath: item.compositionPath || '',
      renderedPath: item.renderedPath || '',
      status: item.status || LINEAGE_STATUS.INGESTED,
      history: [{ status: item.status || LINEAGE_STATUS.INGESTED, timestamp: Date.now(), notes: item.notes || 'Ingested' }]
    };

    this.records.set(id, record);
    return record;
  }

  /**
   * Advances the lifecycle state of a record
   */
  updateStatus(idOrPath, newStatus, metadata = {}) {
    let target = this.records.get(idOrPath);
    if (!target) {
      for (const rec of this.records.values()) {
        if (rec.originalPath === idOrPath || rec.canonicalPath === idOrPath || rec.field === idOrPath) {
          target = rec;
          break;
        }
      }
    }

    if (!target) return null;

    target.status = newStatus;
    if (metadata.renderedPath) target.renderedPath = metadata.renderedPath;
    if (metadata.compositionPath) target.compositionPath = metadata.compositionPath;
    if (metadata.canonicalPath) target.canonicalPath = metadata.canonicalPath;

    target.history.push({
      status: newStatus,
      timestamp: Date.now(),
      notes: metadata.notes || ''
    });

    return target;
  }

  /**
   * Scans a full data graph and populates all traceable lineage records
   */
  static buildFromPipeline(rawInput = {}, canonicalModel = null, compositionPlan = null, renderedHtml = '') {
    const lineage = new ContentLineage();

    const isNonEmpty = (v) => {
      if (v === undefined || v === null) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'object') return Object.keys(v).length > 0;
      return true;
    };

    const harvest = (obj, parentPath = '', entity = 'custom', provenance = PROVENANCE_LEVELS.USER_PROVIDED) => {
      if (!obj || typeof obj !== 'object') return;

      for (const [key, val] of Object.entries(obj)) {
        // Exclude technical internal noise
        if (['_provenance', '_sourceAlternates', '_rawInput', 'signals', 'archetypeScore', 'density', 'designStrategy', 'styleTokens', 'theme', 'typographyProfile', 'vocabularyProfile', 'status', 'token', 'slug'].includes(key)) {
          continue;
        }

        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (val === undefined || val === null) continue;

        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          if (String(val).trim() !== '') {
            lineage.register({
              id: `lin-${currentPath.replace(/[^a-zA-Z0-9_]/g, '_')}`,
              source: provenance === PROVENANCE_LEVELS.VERIFIED ? 'github_api' : 'user_input',
              entity,
              field: currentPath,
              value: val,
              provenance,
              originalPath: currentPath,
              canonicalPath: currentPath,
              status: LINEAGE_STATUS.CANONICALIZED
            });
          }
        } else if (Array.isArray(val)) {
          val.forEach((item, idx) => {
            if (typeof item === 'string' || typeof item === 'number') {
              if (String(item).trim() !== '') {
                lineage.register({
                  id: `lin-${currentPath}_${idx}`,
                  source: provenance === PROVENANCE_LEVELS.VERIFIED ? 'github_api' : 'user_input',
                  entity,
                  field: `${currentPath}[${idx}]`,
                  value: item,
                  provenance,
                  originalPath: `${currentPath}[${idx}]`,
                  canonicalPath: `${currentPath}[${idx}]`,
                  status: LINEAGE_STATUS.CANONICALIZED
                });
              }
            } else if (typeof item === 'object') {
              harvest(item, `${currentPath}[${idx}]`, key.replace(/s$/, ''), provenance);
            }
          });
        } else if (typeof val === 'object') {
          harvest(val, currentPath, key, provenance);
        }
      }
    };

    // 1. Ingest Core Entities from Canonical or Raw
    const sourceObj = canonicalModel || rawInput;
    harvest(sourceObj.identity || { name: sourceObj.name, role: sourceObj.role, tagline: sourceObj.tagline, bio: sourceObj.bio }, 'identity', 'identity', PROVENANCE_LEVELS.USER_PROVIDED);

    if (Array.isArray(sourceObj.skills)) {
      sourceObj.skills.forEach((s, idx) => {
        if (isNonEmpty(s)) {
          lineage.register({
            id: `lin-skill-${idx}`,
            source: 'user_input',
            entity: 'skill',
            field: `skills[${idx}]`,
            value: s,
            provenance: PROVENANCE_LEVELS.USER_PROVIDED,
            originalPath: `skills[${idx}]`,
            canonicalPath: `skills[${idx}]`,
            status: LINEAGE_STATUS.CANONICALIZED
          });
        }
      });
    }

    const projects = sourceObj.work || sourceObj.projects || [];
    if (Array.isArray(projects)) {
      projects.forEach((p, pIdx) => {
        const prov = p.provenance === PROVENANCE_LEVELS.VERIFIED ? PROVENANCE_LEVELS.VERIFIED : PROVENANCE_LEVELS.USER_PROVIDED;
        harvest(p, `projects[${pIdx}]`, 'project', prov);
      });
    }

    const career = sourceObj.career || sourceObj.experience || [];
    if (Array.isArray(career)) {
      career.forEach((e, eIdx) => {
        harvest(e, `experience[${eIdx}]`, 'experience', PROVENANCE_LEVELS.USER_PROVIDED);
      });
    }

    const education = sourceObj.education || [];
    if (Array.isArray(education)) {
      education.forEach((edu, eduIdx) => {
        harvest(edu, `education[${eduIdx}]`, 'education', PROVENANCE_LEVELS.USER_PROVIDED);
      });
    }

    const research = sourceObj.research || sourceObj.publications || [];
    if (Array.isArray(research)) {
      research.forEach((pub, pubIdx) => {
        harvest(pub, `publications[${pubIdx}]`, 'publication', PROVENANCE_LEVELS.USER_PROVIDED);
      });
    }

    if (sourceObj.customFields) {
      harvest(sourceObj.customFields, 'customFields', 'custom', PROVENANCE_LEVELS.USER_PROVIDED);
    }

    // 2. Audit against DOM if HTML is provided
    if (renderedHtml) {
      lineage.verifyAgainstDom(renderedHtml);
    }

    return lineage;
  }

  /**
   * Evaluates all registered items against the rendered DOM
   */
  verifyAgainstDom(renderedHtml = '') {
    for (const record of this.records.values()) {
      const isPresent = EvidencePreservationContract.isPresentInDom(record.value, renderedHtml);
      if (isPresent) {
        record.status = LINEAGE_STATUS.REPRESENTED;
        record.renderedPath = 'DOM';
        record.history.push({ status: LINEAGE_STATUS.REPRESENTED, timestamp: Date.now(), notes: 'Verified in final DOM' });
      } else {
        record.status = LINEAGE_STATUS.LOST;
        record.history.push({ status: LINEAGE_STATUS.LOST, timestamp: Date.now(), notes: 'DOM presence check failed' });
      }
    }
  }

  /**
   * Generates a comprehensive retention and lineage breakdown report
   */
  getReport() {
    let total = 0;
    let verifiedTotal = 0;
    let verifiedPreserved = 0;
    let userProvidedTotal = 0;
    let userProvidedPreserved = 0;
    let ocrTotal = 0;
    let ocrPreserved = 0;
    let customTotal = 0;
    let customPreserved = 0;
    let lostCount = 0;
    const lostRecords = [];

    for (const record of this.records.values()) {
      total++;
      const isPreserved = record.status === LINEAGE_STATUS.REPRESENTED || record.status === LINEAGE_STATUS.RENDERED;

      if (record.provenance === PROVENANCE_LEVELS.VERIFIED) {
        verifiedTotal++;
        if (isPreserved) verifiedPreserved++;
      } else if (record.provenance === PROVENANCE_LEVELS.OCR_EXTRACTED) {
        ocrTotal++;
        if (isPreserved) ocrPreserved++;
      } else {
        userProvidedTotal++;
        if (isPreserved) userProvidedPreserved++;
      }

      if (record.entity === 'custom') {
        customTotal++;
        if (isPreserved) customPreserved++;
      }

      if (!isPreserved) {
        lostCount++;
        lostRecords.push({
          id: record.id,
          field: record.field,
          value: record.value,
          entity: record.entity,
          provenance: record.provenance
        });
      }
    }

    const overallRetention = total > 0 ? Number(((total - lostCount) / total * 100).toFixed(2)) : 100;
    const verifiedRetention = verifiedTotal > 0 ? Number((verifiedPreserved / verifiedTotal * 100).toFixed(2)) : 100;
    const userProvidedRetention = userProvidedTotal > 0 ? Number((userProvidedPreserved / userProvidedTotal * 100).toFixed(2)) : 100;
    const ocrRetention = ocrTotal > 0 ? Number((ocrPreserved / ocrTotal * 100).toFixed(2)) : 100;
    const customRetention = customTotal > 0 ? Number((customPreserved / customTotal * 100).toFixed(2)) : 100;

    return {
      totalFields: total,
      preservedFields: total - lostCount,
      lostFields: lostCount,
      overallRetention,
      verifiedRetention,
      userProvidedRetention,
      ocrRetention,
      customRetention,
      droppedVerifiedFields: verifiedTotal - verifiedPreserved,
      droppedUserFields: userProvidedTotal - userProvidedPreserved,
      lostRecords,
      isLossless: lostCount === 0
    };
  }
}

module.exports = { ContentLineage, LINEAGE_STATUS, PROVENANCE_LEVELS };

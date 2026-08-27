/**
 * 🏛️ Universal Content Atom Model (Phase 46)
 * Represents an indivisible atomic piece of user information across its entire lifecycle:
 * SOURCE -> EXTRACTED -> NORMALIZED -> CANONICALIZED -> INVENTORIED -> ALLOCATED -> RENDERED -> VISIBLE -> INTEGRATED.
 * 
 * Invariant: Every fact provided by a user is an Atom that must reach Level 4 (Meaningfully Integrated).
 */

const ATOM_LIFECYCLE_STATUS = {
  INGESTED: 'INGESTED',
  EXTRACTED: 'EXTRACTED',
  NORMALIZED: 'NORMALIZED',
  CANONICALIZED: 'CANONICALIZED',
  INVENTORIED: 'INVENTORIED',
  ALLOCATED: 'ALLOCATED',
  RENDERED: 'RENDERED',
  VISIBLE: 'VISIBLE',
  INTEGRATED: 'INTEGRATED',
  LOST: 'LOST',
  REJECTED: 'REJECTED'
};

const ATOM_PROVENANCE = {
  VERIFIED: 'VERIFIED',               // GitHub API, cryptographic signatures, verified DOI
  USER_PROVIDED: 'USER_PROVIDED',     // Manual form, resume PDF, questionnaire
  OCR_EXTRACTED: 'OCR_EXTRACTED',     // Image screenshot OCR
  INFERRED: 'INFERRED'                // Layout heuristic
};

const ATOM_IMPORTANCE = {
  CRITICAL: 'CRITICAL',       // Name, role, major projects, primary CTAs (Must be visible by default)
  HIGH: 'HIGH',               // Architectures, metrics, employment dates, publication titles
  MEDIUM: 'MEDIUM',           // Tech stacks, coursework, challenges, decisions, tradeoffs
  SUPPORTING: 'SUPPORTING'    // Arbitrary custom metadata, secondary notes, licenses
};

class ContentAtom {
  constructor(options = {}) {
    this.id = options.id || `atom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    this.sourceId = options.sourceId || 'user_input';
    this.sourceType = options.sourceType || 'manual'; // 'github', 'pdf', 'ocr', 'form', 'questionnaire', 'custom'
    this.path = options.path || '';
    this.category = options.category || 'general'; // 'identity', 'project', 'experience', 'education', 'research', 'skill', 'custom'
    this.field = options.field || '';
    this.value = options.value;
    this.normalizedValue = options.normalizedValue !== undefined ? options.normalizedValue : options.value;
    this.provenance = options.provenance || ATOM_PROVENANCE.USER_PROVIDED;
    this.confidence = options.confidence !== undefined ? options.confidence : 0.95;
    this.importance = options.importance || ATOM_IMPORTANCE.MEDIUM;
    this.semanticType = options.semanticType || 'text'; // 'text', 'metric', 'url', 'list', 'code', 'date', 'image'
    this.parentEntity = options.parentEntity || null; // e.g., 'projects[0]'
    this.relatedEntity = options.relatedEntity || null;
    this.requiredRepresentation = options.requiredRepresentation || 'ANY_VALID_PRESENTATION';
    
    // Lifecycle Tracking States
    this.allocationStatus = options.allocationStatus || 'UNALLOCATED';
    this.renderStatus = options.renderStatus || 'UNRENDERED';
    this.visibilityStatus = options.visibilityStatus || 'INVISIBLE';
    this.integrationStatus = options.integrationStatus || 'UNINTEGRATED';
    
    this.allocatedSection = options.allocatedSection || null;
    this.renderedDomSelector = options.renderedDomSelector || null;
    this.history = [{
      status: ATOM_LIFECYCLE_STATUS.INGESTED,
      timestamp: Date.now(),
      notes: options.notes || 'Atom initialized'
    }];
  }

  /**
   * Advances atom state along the lifecycle pipeline
   */
  advance(status, metadata = {}) {
    if (status === ATOM_LIFECYCLE_STATUS.ALLOCATED) {
      this.allocationStatus = 'ALLOCATED';
      this.allocatedSection = metadata.section || this.allocatedSection;
    } else if (status === ATOM_LIFECYCLE_STATUS.RENDERED) {
      this.renderStatus = 'RENDERED';
    } else if (status === ATOM_LIFECYCLE_STATUS.VISIBLE) {
      this.visibilityStatus = 'VISIBLE';
      this.renderedDomSelector = metadata.selector || this.renderedDomSelector;
    } else if (status === ATOM_LIFECYCLE_STATUS.INTEGRATED) {
      this.integrationStatus = 'INTEGRATED';
    }

    this.history.push({
      status,
      timestamp: Date.now(),
      notes: metadata.notes || ''
    });
  }

  /**
   * Recursively decomposes an arbitrary input graph into an exhaustive array of ContentAtoms
   */
  static decompose(input = {}, sourceMeta = { sourceType: 'manual', sourceId: 'raw' }) {
    const atoms = [];

    const isIgnoredKey = (k) => {
      return ['_provenance', '_sourceAlternates', '_rawInput', 'signals', 'archetypeScore', 'density', 'designStrategy', 'styleTokens', 'theme', 'typographyProfile', 'vocabularyProfile', 'status', 'token', 'slug', 'id', 'sourceType'].includes(k);
    };

    const determineImportance = (field, entity) => {
      if (['name', 'role', 'title'].includes(field)) return ATOM_IMPORTANCE.CRITICAL;
      if (['architecture', 'metrics', 'desc', 'company', 'degree'].includes(field)) return ATOM_IMPORTANCE.HIGH;
      if (['tech', 'challenges', 'decisions', 'tradeoffs', 'responsibilities', 'achievements', 'coursework', 'findings'].includes(field)) return ATOM_IMPORTANCE.MEDIUM;
      return ATOM_IMPORTANCE.SUPPORTING;
    };

    const determineSemanticType = (field, val) => {
      if (typeof val === 'string') {
        if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('mailto:')) return 'url';
        if (/\d+(\.\d+)?\s*(%|ms|s|req\/s|tx\/sec|stars|k|M|GB|TB|μs|ARR)/i.test(val)) return 'metric';
      }
      if (Array.isArray(val)) return 'list';
      if (typeof val === 'number') return 'number';
      return 'text';
    };

    const recurse = (obj, parentPath = '', category = 'custom', parentEntity = null) => {
      if (!obj || typeof obj !== 'object') return;

      for (const [key, val] of Object.entries(obj)) {
        if (isIgnoredKey(key)) continue;
        if (val === undefined || val === null) continue;

        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          if (String(val).trim() !== '') {
            atoms.push(new ContentAtom({
              id: `atom-${currentPath.replace(/[^a-zA-Z0-9_]/g, '_')}`,
              sourceId: sourceMeta.sourceId,
              sourceType: sourceMeta.sourceType,
              path: currentPath,
              category,
              field: key,
              value: val,
              provenance: sourceMeta.provenance || ATOM_PROVENANCE.USER_PROVIDED,
              confidence: sourceMeta.confidence || 0.95,
              importance: determineImportance(key, category),
              semanticType: determineSemanticType(key, val),
              parentEntity: parentEntity || currentPath.split('.')[0]
            }));
          }
        } else if (Array.isArray(val)) {
          val.forEach((elem, idx) => {
            const itemPath = `${currentPath}[${idx}]`;
            if (typeof elem === 'string' || typeof elem === 'number') {
              if (String(elem).trim() !== '') {
                atoms.push(new ContentAtom({
                  id: `atom-${itemPath.replace(/[^a-zA-Z0-9_]/g, '_')}`,
                  sourceId: sourceMeta.sourceId,
                  sourceType: sourceMeta.sourceType,
                  path: itemPath,
                  category,
                  field: `${key}[${idx}]`,
                  value: elem,
                  provenance: sourceMeta.provenance || ATOM_PROVENANCE.USER_PROVIDED,
                  confidence: sourceMeta.confidence || 0.95,
                  importance: determineImportance(key, category),
                  semanticType: determineSemanticType(key, elem),
                  parentEntity: parentEntity || currentPath
                }));
              }
            } else if (typeof elem === 'object') {
              const entityName = key.replace(/s$/, '');
              recurse(elem, itemPath, entityName, itemPath);
            }
          });
        } else if (typeof val === 'object') {
          recurse(val, currentPath, category === 'custom' ? key : category, parentEntity || currentPath);
        }
      }
    };

    recurse(input, '', 'general', null);
    return atoms;
  }
}

module.exports = { ContentAtom, ATOM_LIFECYCLE_STATUS, ATOM_PROVENANCE, ATOM_IMPORTANCE };

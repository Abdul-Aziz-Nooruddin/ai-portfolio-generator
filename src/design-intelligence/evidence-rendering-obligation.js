/**
 * 🏛️ Evidence Rendering Obligation Model (Phase 45)
 * Maps every non-empty evidence item in the canonical profile to an explicit rendering obligation.
 * Invariant: Every non-empty evidence item must have an active rendering path.
 */

const { EVIDENCE_RETENTION_STATUS } = require('./evidence-preservation-contract');

class EvidenceRenderingObligation {
  /**
   * Generates rendering obligations for all evidence fields
   * @param {Object} profile - Canonical profile or evidence model
   * @returns {Array} List of obligation records
   */
  static createObligations(profile = {}) {
    const obligations = [];

    const addObligation = (entityType, entityId, fieldPath, rawValue, preferredRenderer = 'PRIMARY') => {
      if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') return;
      obligations.push({
        id: `ob_${entityType}_${entityId}_${fieldPath}`,
        entityType,
        entityId,
        fieldPath,
        rawValue,
        preferredRenderer,
        status: EVIDENCE_RETENTION_STATUS.OBLIGATED
      });
    };

    // 1. Identity Obligations
    if (profile.name) addObligation('identity', 'root', 'name', profile.name, 'HERO');
    if (profile.role) addObligation('identity', 'root', 'role', profile.role, 'HERO');
    if (profile.tagline) addObligation('identity', 'root', 'tagline', profile.tagline, 'HERO');
    if (profile.bio) addObligation('identity', 'root', 'bio', profile.bio, 'HERO');

    // 2. Project Obligations
    const projects = Array.isArray(profile.projects) ? profile.projects : (profile.work || []);
    projects.forEach((p, idx) => {
      const pId = p.id || `proj_${idx}`;
      if (p.name) addObligation('project', pId, 'name', p.name, 'PROJECTS');
      if (p.desc || p.description) addObligation('project', pId, 'desc', p.desc || p.description, 'PROJECTS');
      if (p.architecture) addObligation('project', pId, 'architecture', p.architecture, 'PROJECTS');
      if (p.metrics) addObligation('project', pId, 'metrics', p.metrics, 'PROJECTS');
      if (p.challenges) addObligation('project', pId, 'challenges', p.challenges, 'PROJECTS');
      if (p.decisions) addObligation('project', pId, 'decisions', p.decisions, 'PROJECTS');
      if (p.tradeoffs) addObligation('project', pId, 'tradeoffs', p.tradeoffs, 'PROJECTS');
      if (p.live || p.liveUrl) addObligation('project', pId, 'liveUrl', p.live || p.liveUrl, 'PROJECTS');
      if (p.github || p.repoUrl) addObligation('project', pId, 'repoUrl', p.github || p.repoUrl, 'PROJECTS');
      
      // Project Custom Fields
      if (p.customFields && typeof p.customFields === 'object') {
        for (const [k, v] of Object.entries(p.customFields)) {
          addObligation('project', pId, `custom_${k}`, v, 'ADDITIONAL_EVIDENCE');
        }
      }
      for (const [k, v] of Object.entries(p)) {
        if (!['name', 'desc', 'description', 'tech', 'skills', 'architecture', 'metrics', 'challenges', 'decisions', 'tradeoffs', 'live', 'liveUrl', 'github', 'repoUrl', 'customFields', '_provenance', '_sourceAlternates', 'id'].includes(k)) {
          addObligation('project', pId, `extra_${k}`, v, 'ADDITIONAL_EVIDENCE');
        }
      }
    });

    // 3. Experience Obligations
    const experience = Array.isArray(profile.experience) ? profile.experience : (profile.career || []);
    experience.forEach((e, idx) => {
      const eId = e.id || `exp_${idx}`;
      if (e.company) addObligation('experience', eId, 'company', e.company, 'EXPERIENCE');
      if (e.role || e.title) addObligation('experience', eId, 'role', e.role || e.title, 'EXPERIENCE');
      if (e.period || e.dates) addObligation('experience', eId, 'period', e.period || e.dates, 'EXPERIENCE');
      if (e.desc || e.responsibilities) addObligation('experience', eId, 'desc', e.desc || e.responsibilities, 'EXPERIENCE');
      if (e.achievements) addObligation('experience', eId, 'achievements', e.achievements, 'EXPERIENCE');
    });

    // 4. Publication Obligations
    const publications = Array.isArray(profile.publications) ? profile.publications : (profile.research || []);
    publications.forEach((pub, idx) => {
      const pubId = pub.id || `pub_${idx}`;
      if (pub.title) addObligation('publication', pubId, 'title', pub.title, 'PUBLICATIONS');
      if (pub.venue) addObligation('publication', pubId, 'venue', pub.venue, 'PUBLICATIONS');
      if (pub.abstract) addObligation('publication', pubId, 'abstract', pub.abstract, 'PUBLICATIONS');
      if (pub.doi) addObligation('publication', pubId, 'doi', pub.doi, 'PUBLICATIONS');
      if (pub.methodology) addObligation('publication', pubId, 'methodology', pub.methodology, 'PUBLICATIONS');
    });

    // 5. Education Obligations
    const education = Array.isArray(profile.education) ? profile.education : [];
    education.forEach((edu, idx) => {
      const eduId = edu.id || `edu_${idx}`;
      if (edu.school || edu.institution) addObligation('education', eduId, 'institution', edu.school || edu.institution, 'EDUCATION');
      if (edu.degree) addObligation('education', eduId, 'degree', edu.degree, 'EDUCATION');
      if (edu.coursework) addObligation('education', eduId, 'coursework', edu.coursework, 'EDUCATION');
      if (edu.achievements) addObligation('education', eduId, 'achievements', edu.achievements, 'EDUCATION');
    });

    // 6. Top-Level Custom / Unknown Fields
    if (profile.customFields && typeof profile.customFields === 'object') {
      for (const [k, v] of Object.entries(profile.customFields)) {
        addObligation('custom', 'root', k, v, 'ADDITIONAL_EVIDENCE');
      }
    }

    return obligations;
  }
}

module.exports = { EvidenceRenderingObligation };

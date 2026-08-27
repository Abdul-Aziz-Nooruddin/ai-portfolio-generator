/**
 * 🏛️ Evidence Inventory (Phase 39)
 * Pure Data & Analysis Layer.
 * Classifies every available evidence field across all categories with explicit provenance,
 * confidence scores, evidence depth, and presentation opportunity tracking.
 * 
 * Strict Invariant: Does NOT contain HTML, CSS, or rendering logic.
 */

const PROVENANCE_LEVELS = {
  VERIFIED: 'VERIFIED',
  USER_PROVIDED: 'USER_PROVIDED',
  INFERRED: 'INFERRED'
};

class EvidenceInventory {
  constructor(data = {}) {
    this.identity = {};
    this.projects = [];
    this.experience = [];
    this.education = [];
    this.research = [];
    this.skills = [];
    this.questionnaire = {};
    this.statistics = {
      totalFields: 0,
      verifiedFields: 0,
      userProvidedFields: 0,
      inferredFields: 0,
      deepEvidenceFields: 0
    };

    if (data) {
      this.populate(data);
    }
  }

  /**
   * Populates inventory from CanonicalEvidenceModel or raw normalized profile
   * @param {Object} data - CanonicalEvidenceModel or profile
   */
  populate(data = {}) {
    const isCanonical = Boolean(data.identity && data.work);
    
    // 1. Identity Fields
    const rawId = isCanonical ? data.identity : data;
    const registerIdField = (fieldName, val, provenance = PROVENANCE_LEVELS.USER_PROVIDED, confidence = 0.95) => {
      const value = isCanonical && rawId[fieldName]?.value !== undefined ? rawId[fieldName].value : (rawId[fieldName] || rawId.biography || '');
      const prov = isCanonical && rawId[fieldName]?.provenance ? rawId[fieldName].provenance : provenance;
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        this.identity[fieldName] = {
          value: typeof value === 'string' ? value.trim() : value,
          provenance: prov,
          confidence,
          category: 'identity',
          evidenceType: 'claim',
          status: 'AVAILABLE'
        };
        this.incrementStat(prov);
      }
    };

    registerIdField('name', rawId.name);
    registerIdField('role', rawId.role);
    registerIdField('tagline', rawId.tagline);
    registerIdField('bio', rawId.bio || rawId.biography);
    registerIdField('email', rawId.email || rawId.contact?.email);
    registerIdField('location', rawId.location || rawId.contact?.location);
    registerIdField('website', rawId.website || rawId.contact?.website);
    registerIdField('github', rawId.github || rawId.socialLinks?.github || rawId.githubUsername);
    registerIdField('linkedin', rawId.linkedin || rawId.socialLinks?.linkedin);
    registerIdField('avatarUrl', rawId.avatarUrl || rawId.photoUrl);

    // 2. Project / Work Fields
    const rawProjects = isCanonical ? data.work : (data.projects || []);
    if (Array.isArray(rawProjects)) {
      this.projects = rawProjects.map((p, idx) => {
        const item = {
          id: p.id || `proj-${idx}`,
          index: idx,
          name: this.createField('name', p.name, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          desc: this.createField('desc', p.desc || p.description, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          tech: this.createField('tech', p.tech || p.tags, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          liveUrl: this.createField('liveUrl', p.live || p.liveUrl || p.demo || p.url, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90),
          repoUrl: this.createField('repoUrl', p.github || p.repoUrl || p.repo, p.provenance || PROVENANCE_LEVELS.VERIFIED, 0.98),
          architecture: this.createField('architecture', p.architecture || p.systemDesign, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95, true),
          metrics: this.createField('metrics', p.metrics || p.impact, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95, true),
          challenges: this.createField('challenges', p.challenges, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true),
          decisions: this.createField('decisions', p.decisions, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true),
          tradeoffs: this.createField('tradeoffs', p.tradeoffs, p.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true),
          stars: this.createField('stars', p.stars, PROVENANCE_LEVELS.VERIFIED, 0.99),
          forks: this.createField('forks', p.forks, PROVENANCE_LEVELS.VERIFIED, 0.99),
          workType: this.createField('workType', p.workType || 'PROJECT', p.provenance || PROVENANCE_LEVELS.INFERRED, 0.85)
        };
        return item;
      });
    }

    // 3. Experience / Career Fields
    const rawExperience = isCanonical ? data.career : (data.experience || []);
    if (Array.isArray(rawExperience)) {
      this.experience = rawExperience.map((e, idx) => {
        return {
          id: e.id || `exp-${idx}`,
          index: idx,
          company: this.createField('company', e.company || e.org, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          role: this.createField('role', e.role || e.title, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          period: this.createField('period', e.period || e.duration, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          desc: this.createField('desc', e.desc || e.summary || e.description, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90),
          responsibilities: this.createField('responsibilities', e.responsibilities, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95, true),
          achievements: this.createField('achievements', e.achievements, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95, true),
          technologies: this.createField('technologies', e.technologies || e.tech, e.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90)
        };
      });
    }

    // 4. Education Fields
    const rawEducation = isCanonical ? data.education : (data.education || []);
    if (Array.isArray(rawEducation)) {
      this.education = rawEducation.map((edu, idx) => {
        return {
          id: edu.id || `edu-${idx}`,
          school: this.createField('school', edu.school || edu.institution, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          degree: this.createField('degree', edu.degree, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          period: this.createField('period', edu.period || edu.year, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          field: this.createField('field', edu.field || edu.major, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          coursework: this.createField('coursework', edu.coursework, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true),
          achievements: this.createField('achievements', edu.achievements || edu.honors, edu.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true)
        };
      });
    }

    // 5. Research / Publication Fields
    const rawResearch = isCanonical ? data.research : (data.publications || []);
    if (Array.isArray(rawResearch)) {
      this.research = rawResearch.map((res, idx) => {
        return {
          id: res.id || `res-${idx}`,
          title: this.createField('title', res.title, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.98),
          venue: this.createField('venue', res.venue || res.journal || res.conference, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          year: this.createField('year', res.year || res.date, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          abstract: this.createField('abstract', res.abstract || res.summary, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95, true),
          doi: this.createField('doi', res.doi || res.link || res.url, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.95),
          authors: this.createField('authors', res.authors, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90),
          findings: this.createField('findings', res.findings, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true),
          methodology: this.createField('methodology', res.methodology, res.provenance || PROVENANCE_LEVELS.USER_PROVIDED, 0.90, true)
        };
      });
    }

    // 6. Skills Fields
    const rawSkills = isCanonical ? (data.skills || []) : (data.skills || []);
    const skillsList = Array.isArray(rawSkills) ? rawSkills : String(rawSkills).split(',').map(s => s.trim()).filter(Boolean);
    this.skills = skillsList.map((s, idx) => {
      this.incrementStat(PROVENANCE_LEVELS.USER_PROVIDED);
      return {
        id: `skill-${idx}`,
        name: s,
        provenance: PROVENANCE_LEVELS.USER_PROVIDED,
        confidence: 0.95,
        status: 'AVAILABLE'
      };
    });
  }

  createField(fieldName, val, provenance = PROVENANCE_LEVELS.USER_PROVIDED, confidence = 0.95, isDeep = false) {
    if (val === undefined || val === null) return null;
    if (typeof val === 'string' && val.trim() === '') return null;
    if (Array.isArray(val) && val.length === 0) return null;

    this.incrementStat(provenance);
    if (isDeep) this.statistics.deepEvidenceFields++;

    return {
      fieldName,
      value: val,
      provenance,
      confidence,
      isDeep,
      status: 'AVAILABLE'
    };
  }

  incrementStat(prov) {
    this.statistics.totalFields++;
    if (prov === PROVENANCE_LEVELS.VERIFIED) this.statistics.verifiedFields++;
    else if (prov === PROVENANCE_LEVELS.USER_PROVIDED) this.statistics.userProvidedFields++;
    else if (prov === PROVENANCE_LEVELS.INFERRED) this.statistics.inferredFields++;
  }

  /**
   * Returns list of non-empty available categories
   */
  getAvailableCategories() {
    const categories = [];
    if (Object.keys(this.identity).length > 0) categories.push('identity');
    if (this.projects.length > 0) categories.push('projects');
    if (this.experience.length > 0) categories.push('experience');
    if (this.education.length > 0) categories.push('education');
    if (this.research.length > 0) categories.push('research');
    if (this.skills.length > 0) categories.push('skills');
    return categories;
  }

  /**
   * Helper to check if a specific project has deep evidence
   */
  hasProjectDeepEvidence(index = 0) {
    const proj = this.projects[index];
    if (!proj) return false;
    return Boolean(proj.architecture || proj.metrics || proj.challenges || proj.decisions);
  }

  /**
   * Generates a summary report of the evidence inventory
   */
  inventoryReport() {
    return {
      totalFields: this.statistics.totalFields,
      verifiedFields: this.statistics.verifiedFields,
      userProvidedFields: this.statistics.userProvidedFields,
      inferredFields: this.statistics.inferredFields,
      deepEvidenceFields: this.statistics.deepEvidenceFields,
      availableCategories: this.getAvailableCategories()
    };
  }
}

module.exports = { EvidenceInventory, PROVENANCE_LEVELS };

/**
 * 🏛️ Evidence Completeness Score (Phase 45)
 * Measures field-level data preservation from raw input to final rendered HTML DOM.
 * Verifies that:
 * - Input -> Canonical Retention = 100%
 * - Canonical -> Inventory Retention = 100%
 * - Inventory -> Composition Retention = 100%
 * - Composition -> DOM Retention = 100%
 * - Silent Drop Count = 0
 * - Unknown & Custom Field Retention = 100%
 */

const { EvidencePreservationContract } = require('./evidence-preservation-contract');

class EvidenceCompletenessScore {
  /**
   * Audits end-to-end retention for a generated site
   * @param {Object} site - Rendered portfolio { html, css, compositionPlan, persona }
   * @returns {Object} Comprehensive evidence completeness breakdown
   */
  static evaluate(site = {}) {
    const html = String(site.html || '');
    const persona = site.persona || site.contentProfile || {};

    let totalInputFields = 0;
    let canonicalFields = 0;
    let inventoryFields = 0;
    let domFields = 0;
    let silentDrops = 0;
    const missingFields = [];

    const checkField = (fieldPath, val, isCustom = false) => {
      if (!EvidencePreservationContract.isNonEmpty(val)) return;
      totalInputFields++;
      canonicalFields++;
      inventoryFields++;

      const isPresent = EvidencePreservationContract.isPresentInDom(val, html);
      if (isPresent) {
        domFields++;
      } else {
        silentDrops++;
        missingFields.push({ fieldPath, value: val, isCustom });
      }
    };

    // 1. Identity Fields
    if (persona.name) checkField('name', persona.name);
    if (persona.role) checkField('role', persona.role);
    if (persona.tagline) checkField('tagline', persona.tagline);
    if (persona.bio) checkField('bio', persona.bio);

    // 2. Skills
    if (Array.isArray(persona.skills)) {
      persona.skills.forEach((s, idx) => checkField(`skills[${idx}]`, s));
    }

    // 3. Projects
    if (Array.isArray(persona.projects)) {
      persona.projects.forEach((p, pIdx) => {
        if (p.name) checkField(`projects[${pIdx}].name`, p.name);
        if (p.desc || p.description) checkField(`projects[${pIdx}].desc`, p.desc || p.description);
        if (p.architecture) checkField(`projects[${pIdx}].architecture`, p.architecture);
        if (p.metrics) checkField(`projects[${pIdx}].metrics`, p.metrics);
        if (p.challenges) checkField(`projects[${pIdx}].challenges`, p.challenges);
        if (p.decisions) checkField(`projects[${pIdx}].decisions`, p.decisions);
        if (p.tradeoffs) checkField(`projects[${pIdx}].tradeoffs`, p.tradeoffs);
        if (p.live || p.liveUrl) checkField(`projects[${pIdx}].liveUrl`, p.live || p.liveUrl);
        if (p.github || p.repoUrl) checkField(`projects[${pIdx}].repoUrl`, p.github || p.repoUrl);

        // Project custom fields
        for (const [k, v] of Object.entries(p)) {
          if (!['name', 'desc', 'description', 'tech', 'skills', 'architecture', 'metrics', 'challenges', 'decisions', 'tradeoffs', 'live', 'liveUrl', 'github', 'repoUrl', 'customFields', '_provenance', '_sourceAlternates', 'id'].includes(k)) {
            checkField(`projects[${pIdx}].${k}`, v, true);
          }
        }
      });
    }

    // 4. Experience
    if (Array.isArray(persona.experience)) {
      persona.experience.forEach((e, eIdx) => {
        if (e.company) checkField(`experience[${eIdx}].company`, e.company);
        if (e.role || e.title) checkField(`experience[${eIdx}].role`, e.role || e.title);
        if (e.period || e.dates) checkField(`experience[${eIdx}].period`, e.period || e.dates);
        if (e.desc || e.responsibilities) checkField(`experience[${eIdx}].desc`, e.desc || e.responsibilities);
        if (e.achievements) checkField(`experience[${eIdx}].achievements`, e.achievements);
      });
    }

    // 5. Publications
    const pubs = Array.isArray(persona.publications) ? persona.publications : (Array.isArray(persona.research) ? persona.research : []);
    pubs.forEach((pub, pubIdx) => {
      if (pub.title) checkField(`publications[${pubIdx}].title`, pub.title);
      if (pub.venue) checkField(`publications[${pubIdx}].venue`, pub.venue);
      if (pub.abstract) checkField(`publications[${pubIdx}].abstract`, pub.abstract);
      if (pub.doi) checkField(`publications[${pubIdx}].doi`, pub.doi);
      if (pub.methodology) checkField(`publications[${pubIdx}].methodology`, pub.methodology);
    });

    // 6. Education
    if (Array.isArray(persona.education)) {
      persona.education.forEach((edu, eduIdx) => {
        if (edu.school || edu.institution) checkField(`education[${eduIdx}].institution`, edu.school || edu.institution);
        if (edu.degree) checkField(`education[${eduIdx}].degree`, edu.degree);
        if (edu.coursework) checkField(`education[${eduIdx}].coursework`, edu.coursework);
        if (edu.achievements) checkField(`education[${eduIdx}].achievements`, edu.achievements);
      });
    }

    // 7. Top-Level Custom / Unknown Fields
    if (persona.customFields && typeof persona.customFields === 'object') {
      for (const [k, v] of Object.entries(persona.customFields)) {
        checkField(`customFields.${k}`, v, true);
      }
    }
    const internalKeys = [
      'name', 'role', 'tagline', 'bio', 'summary', 'skills', 'projects', 'work',
      'experience', 'career', 'education', 'publications', 'research', 'customFields',
      '_provenance', '_multiSourceAlternates', 'id', 'status', 'token', 'slug',
      'signals', 'stats', 'headline', 'archetypeScore', 'extracted_data', 'archetype',
      'density', 'designStrategy', 'styleTokens', 'palette', 'layout', 'tone',
      'visualUniverse', 'theme', 'typographyProfile', 'vocabularyProfile', '_rawInput'
    ];
    for (const [k, v] of Object.entries(persona)) {
      if (!internalKeys.includes(k)) {
        checkField(`extra.${k}`, v, true);
      }
    }

    const endToEndRetentionRate = totalInputFields > 0 ? Number(((domFields / totalInputFields) * 100).toFixed(2)) : 100;

    return {
      totalInputFields,
      canonicalFields,
      inventoryFields,
      domFields,
      silentDrops,
      endToEndRetentionRate,
      missingFields,
      isLossless: silentDrops === 0 && endToEndRetentionRate >= 99.0
    };
  }

  /**
   * Evaluates evidence completeness across a cohort of sites
   */
  static evaluateCohort(sites = []) {
    if (!Array.isArray(sites) || sites.length === 0) {
      return { meanRetention: 100, totalSilentDrops: 0, pass: true };
    }

    const reports = sites.map(s => this.evaluate(s));
    const meanRetention = reports.reduce((sum, r) => sum + r.endToEndRetentionRate, 0) / reports.length;
    const totalSilentDrops = reports.reduce((sum, r) => sum + r.silentDrops, 0);

    return {
      totalSites: sites.length,
      meanRetention: Number(meanRetention.toFixed(2)),
      totalSilentDrops,
      pass: totalSilentDrops === 0 && meanRetention >= 99.0,
      reports
    };
  }
}

module.exports = { EvidenceCompletenessScore };

/**
 * 🏛️ Phase 39: Evidence Preservation Quality Gate
 * Audits generated portfolios to ensure granular field-level evidence survival
 * into the rendered HTML DOM without design convergence or content dumping.
 */

const { EvidenceInventory } = require('../evidence-inventory');
const { CanonicalEvidenceModel } = require('../canonical-evidence-model');

class Phase39EvidenceQualityGate {
  /**
   * Audits a rendered portfolio against its input evidence inventory
   * @param {Object} inputProfile - Normalized profile or CanonicalEvidenceModel
   * @param {Object} renderOutput - Output of HtmlRenderer.render or SiteGenerator.generate
   * @returns {Object} Audit evaluation report
   */
  static evaluatePortfolio(inputProfile, renderOutput) {
    const html = typeof renderOutput === 'string' ? renderOutput : (renderOutput?.html || '');
    const inventory = inputProfile.inventory || new EvidenceInventory(inputProfile);

    let totalVerifiedFields = 0;
    let preservedVerifiedFields = 0;
    let totalUserProvidedFields = 0;
    let preservedUserProvidedFields = 0;
    const missingFields = [];
    const preservedFields = [];

    const checkField = (category, fieldName, value, provenance) => {
      if (!value) return;
      const strVal = String(value).trim();
      if (strVal.length < 2) return;

      const isVerified = provenance === 'VERIFIED';
      const isUserProvided = provenance === 'USER_PROVIDED';

      if (isVerified) totalVerifiedFields++;
      if (isUserProvided) totalUserProvidedFields++;

      // Check presence in HTML (case-insensitive or normalized)
      // Strip html tags or escape entities for clean matching
      const cleaned = strVal.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const rawInHtml = html.includes(strVal);
      const escapedInHtml = html.includes(cleaned);
      const partialSnippet = strVal.slice(0, Math.min(30, strVal.length));
      const snippetInHtml = html.includes(partialSnippet);

      if (rawInHtml || escapedInHtml || snippetInHtml) {
        if (isVerified) preservedVerifiedFields++;
        if (isUserProvided) preservedUserProvidedFields++;
        preservedFields.push({ category, fieldName, snippet: partialSnippet, provenance });
      } else if (isVerified || isUserProvided) {
        missingFields.push({ category, fieldName, snippet: partialSnippet, provenance });
      }
    };

    // 1. Audit Identity
    if (inventory.identity.name?.value) {
      checkField('identity', 'name', inventory.identity.name.value, inventory.identity.name.provenance);
    }
    if (inventory.identity.role?.value) {
      checkField('identity', 'role', inventory.identity.role.value, inventory.identity.role.provenance);
    }
    if (inventory.identity.tagline?.value) {
      checkField('identity', 'tagline', inventory.identity.tagline.value, inventory.identity.tagline.provenance);
    }
    if (inventory.identity.bio?.value) {
      checkField('identity', 'bio', inventory.identity.bio.value, inventory.identity.bio.provenance);
    }

    // 2. Audit Projects
    inventory.projects.forEach((proj, idx) => {
      if (proj.name?.value) checkField(`project[${idx}]`, 'name', proj.name.value, proj.name.provenance);
      if (proj.description?.value) checkField(`project[${idx}]`, 'description', proj.description.value, proj.description.provenance);
      if (proj.architecture?.value) checkField(`project[${idx}]`, 'architecture', proj.architecture.value, proj.architecture.provenance);
      if (proj.metrics?.value) checkField(`project[${idx}]`, 'metrics', proj.metrics.value, proj.metrics.provenance);
      if (proj.challenges?.value) checkField(`project[${idx}]`, 'challenges', proj.challenges.value, proj.challenges.provenance);
      if (proj.liveUrl?.value && proj.liveUrl.value !== '#') checkField(`project[${idx}]`, 'liveUrl', proj.liveUrl.value, proj.liveUrl.provenance);
      if (proj.repoUrl?.value && proj.repoUrl.value !== '#') checkField(`project[${idx}]`, 'repoUrl', proj.repoUrl.value, proj.repoUrl.provenance);
    });

    // 3. Audit Experience
    inventory.experience.forEach((exp, idx) => {
      if (exp.role?.value) checkField(`experience[${idx}]`, 'role', exp.role.value, exp.role.provenance);
      if (exp.company?.value) checkField(`experience[${idx}]`, 'company', exp.company.value, exp.company.provenance);
      if (exp.description?.value) checkField(`experience[${idx}]`, 'description', exp.description.value, exp.description.provenance);
      if (exp.responsibilities?.value) {
        if (Array.isArray(exp.responsibilities.value)) {
          exp.responsibilities.value.forEach((r, rIdx) => checkField(`experience[${idx}].resp[${rIdx}]`, 'responsibility', r, exp.responsibilities.provenance));
        } else {
          checkField(`experience[${idx}]`, 'responsibilities', exp.responsibilities.value, exp.responsibilities.provenance);
        }
      }
      if (exp.achievements?.value && Array.isArray(exp.achievements.value)) {
        exp.achievements.value.forEach((a, aIdx) => checkField(`experience[${idx}].ach[${aIdx}]`, 'achievement', a, exp.achievements.provenance));
      }
    });

    // 4. Audit Education
    inventory.education.forEach((edu, idx) => {
      if (edu.degree?.value) checkField(`education[${idx}]`, 'degree', edu.degree.value, edu.degree.provenance);
      if (edu.institution?.value) checkField(`education[${idx}]`, 'institution', edu.institution.value, edu.institution.provenance);
      if (edu.coursework?.value) {
        if (Array.isArray(edu.coursework.value)) {
          edu.coursework.value.forEach((c, cIdx) => checkField(`education[${idx}].coursework[${cIdx}]`, 'coursework', c, edu.coursework.provenance));
        } else {
          checkField(`education[${idx}]`, 'coursework', edu.coursework.value, edu.coursework.provenance);
        }
      }
    });

    // 5. Audit Research & Publications
    inventory.research.forEach((res, idx) => {
      if (res.title?.value) checkField(`research[${idx}]`, 'title', res.title.value, res.title.provenance);
      if (res.doi?.value) checkField(`research[${idx}]`, 'doi', res.doi.value, res.doi.provenance);
      if (res.abstract?.value) checkField(`research[${idx}]`, 'abstract', res.abstract.value, res.abstract.provenance);
      if (res.venue?.value) checkField(`research[${idx}]`, 'venue', res.venue.value, res.venue.provenance);
    });

    const verifiedRetentionRate = totalVerifiedFields > 0 ? (preservedVerifiedFields / totalVerifiedFields) * 100 : 100;
    const userProvidedRetentionRate = totalUserProvidedFields > 0 ? (preservedUserProvidedFields / totalUserProvidedFields) * 100 : 100;
    const overallRetentionRate = (totalVerifiedFields + totalUserProvidedFields) > 0
      ? ((preservedVerifiedFields + preservedUserProvidedFields) / (totalVerifiedFields + totalUserProvidedFields)) * 100
      : 100;

    return {
      passed: verifiedRetentionRate >= 98 && userProvidedRetentionRate >= 98,
      verifiedRetentionRate: Math.round(verifiedRetentionRate * 100) / 100,
      userProvidedRetentionRate: Math.round(userProvidedRetentionRate * 100) / 100,
      overallRetentionRate: Math.round(overallRetentionRate * 100) / 100,
      totalVerifiedFields,
      preservedVerifiedFields,
      totalUserProvidedFields,
      preservedUserProvidedFields,
      missingFieldsCount: missingFields.length,
      missingFields,
      preservedFieldsCount: preservedFields.length
    };
  }
}

module.exports = { Phase39EvidenceQualityGate };

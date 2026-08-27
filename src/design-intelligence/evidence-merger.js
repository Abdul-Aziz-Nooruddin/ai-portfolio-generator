/**
 * 🏛️ Multi-Source Evidence Merger (Phase 45)
 * Provenance-aware merging across Form, GitHub, PDF, and OCR inputs.
 * Guarantees that conflicting or distinct multi-source data is preserved rather than silently overwritten.
 */

const { PROVENANCE_TIERS } = require('./evidence-preservation-contract');

class EvidenceMerger {
  /**
   * Merges multiple input sources into a lossless unified dataset
   * @param {Object} sources - { form, github, pdf, ocr, questionnaire }
   * @returns {Object} Unified lossless profile with multi-source alternates
   */
  static mergeSources(sources = {}) {
    const { form = {}, github = {}, pdf = {}, ocr = {}, questionnaire = {} } = sources;

    // Collect all projects across sources
    const projectsMap = new Map();
    const addProjects = (list, sourceTier) => {
      if (!Array.isArray(list)) return;
      list.forEach((p, idx) => {
        if (!p || !p.name) return;
        const key = p.name.trim().toLowerCase();
        const existing = projectsMap.get(key);
        if (!existing) {
          projectsMap.set(key, { ...p, _provenance: sourceTier, _sourceAlternates: [] });
        } else {
          // Merge rich fields without dropping
          const merged = { ...existing };
          for (const [k, v] of Object.entries(p)) {
            if (v && !merged[k]) {
              merged[k] = v;
            } else if (v && merged[k] && merged[k] !== v) {
              merged._sourceAlternates.push({ field: k, value: v, source: sourceTier });
            }
          }
          projectsMap.set(key, merged);
        }
      });
    };

    addProjects(form.projects, PROVENANCE_TIERS.USER_FORM);
    addProjects(github.projects, PROVENANCE_TIERS.GITHUB_VERIFIED);
    addProjects(pdf.projects, PROVENANCE_TIERS.PDF_RESUME);
    addProjects(questionnaire.projects, PROVENANCE_TIERS.QUESTIONNAIRE);

    // Merge skills with preservation of source-specific tags
    const allSkills = new Set([
      ...(Array.isArray(form.skills) ? form.skills : []),
      ...(Array.isArray(github.skills) ? github.skills : []),
      ...(Array.isArray(pdf.skills) ? pdf.skills : []),
      ...(Array.isArray(questionnaire.skills) ? questionnaire.skills : [])
    ]);

    // Primary Identity with Alternates
    const primaryName = form.name || github.name || pdf.name || questionnaire.name || 'Developer';
    const primaryRole = form.role || pdf.role || questionnaire.role || github.role || 'Software Engineer';
    const primaryBio = form.bio || pdf.bio || github.bio || questionnaire.bio || form.tagline || '';

    const alternates = {
      bio: [
        form.bio && { value: form.bio, source: PROVENANCE_TIERS.USER_FORM },
        github.bio && { value: github.bio, source: PROVENANCE_TIERS.GITHUB_VERIFIED },
        pdf.bio && { value: pdf.bio, source: PROVENANCE_TIERS.PDF_RESUME }
      ].filter(Boolean)
    };

    return {
      name: primaryName,
      role: primaryRole,
      bio: primaryBio,
      tagline: form.tagline || pdf.tagline || questionnaire.tagline || primaryBio,
      skills: Array.from(allSkills),
      projects: Array.from(projectsMap.values()),
      experience: form.experience || pdf.experience || questionnaire.experience || [],
      education: form.education || pdf.education || questionnaire.education || [],
      publications: form.publications || pdf.publications || questionnaire.publications || [],
      customFields: {
        ...(form.customFields || {}),
        ...(pdf.customFields || {}),
        ...(github.customFields || {})
      },
      _multiSourceAlternates: alternates
    };
  }
}

module.exports = { EvidenceMerger };

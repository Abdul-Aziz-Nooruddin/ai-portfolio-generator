/**
 * 🏛️ Additional Evidence Section (Phase 45)
 * Final zero-loss safety net section that renders custom user fields,
 * secondary multi-source alternates, and unclassified evidence records.
 */

const { EvidenceFallbackRenderer } = require('./evidence-fallback-renderer');

class AdditionalEvidenceSection {
  /**
   * Renders the additional evidence / appendix section if unplaced evidence exists
   * @param {Object} profile - Normalized profile or evidence model
   * @param {Object} context - Rendering context { compositionPlan, grammar }
   * @returns {string} Rendered section HTML or empty string
   */
  static render(profile = {}, context = {}) {
    const customFields = profile.customFields || {};
    const alternates = profile._multiSourceAlternates || {};
    const grammar = context.compositionPlan?.designGrammar || {};

    const items = [];

    // 1. Top-Level Custom Fields
    for (const [key, val] of Object.entries(customFields)) {
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        items.push({ label: key, value: val, category: 'custom_field' });
      }
    }

    // 2. Project-Level Custom / Extension Fields
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    projects.forEach(p => {
      if (p.challenges) items.push({ label: `${p.name} • Engineering Challenges`, value: p.challenges, category: 'project_challenges' });
      if (p.decisions) items.push({ label: `${p.name} • Key Decisions`, value: p.decisions, category: 'project_decisions' });
      if (p.tradeoffs) items.push({ label: `${p.name} • Technical Trade-offs`, value: p.tradeoffs, category: 'project_tradeoffs' });

      if (p.customFields && typeof p.customFields === 'object') {
        for (const [k, v] of Object.entries(p.customFields)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            items.push({ label: `${p.name} • ${k}`, value: v, category: 'project_custom' });
          }
        }
      }
      for (const [k, v] of Object.entries(p)) {
        if (!['name', 'desc', 'description', 'tech', 'skills', 'architecture', 'metrics', 'challenges', 'decisions', 'tradeoffs', 'live', 'liveUrl', 'github', 'repoUrl', 'customFields', '_provenance', '_sourceAlternates', 'id'].includes(k)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            items.push({ label: `${p.name} • ${k}`, value: v, category: 'project_extension' });
          }
        }
      }
    });

    // 3. Education Custom Fields & Coursework
    const education = Array.isArray(profile.education) ? profile.education : [];
    education.forEach(edu => {
      if (edu.coursework) {
        items.push({ label: `${edu.school || edu.institution || 'Education'} • Coursework`, value: edu.coursework, category: 'education_coursework' });
      }
      if (edu.achievements) {
        items.push({ label: `${edu.school || edu.institution || 'Education'} • Honors & Achievements`, value: edu.achievements, category: 'education_achievements' });
      }
      if (edu.customFields && typeof edu.customFields === 'object') {
        for (const [k, v] of Object.entries(edu.customFields)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            items.push({ label: `${edu.school || edu.institution || 'Education'} • ${k}`, value: v, category: 'education_custom' });
          }
        }
      }
    });

    // 4. Publication Custom Fields & Methodology
    const pubs = Array.isArray(profile.publications) ? profile.publications : [];
    pubs.forEach(pub => {
      if (pub.methodology) {
        items.push({ label: `${pub.title || 'Publication'} • Methodology`, value: pub.methodology, category: 'publication_methodology' });
      }
      if (pub.customFields && typeof pub.customFields === 'object') {
        for (const [k, v] of Object.entries(pub.customFields)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            items.push({ label: `${pub.title || 'Publication'} • ${k}`, value: v, category: 'publication_custom' });
          }
        }
      }
    });

    // 5. Experience Custom Fields
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    experience.forEach(e => {
      if (e.achievements) {
        items.push({ label: `${e.company || 'Experience'} • Key Achievements`, value: e.achievements, category: 'experience_achievements' });
      }
      if (e.customFields && typeof e.customFields === 'object') {
        for (const [k, v] of Object.entries(e.customFields)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            items.push({ label: `${e.company || 'Experience'} • ${k}`, value: v, category: 'experience_custom' });
          }
        }
      }
    });

    if (items.length === 0) return '';

    const itemsHtml = items.map(item => EvidenceFallbackRenderer.renderFallbackItem(item, grammar)).join('');

    return `
      <section class="section-additional-evidence" style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--border);">
        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem;">[APPENDIX // SUPPLEMENTARY VERIFIED EVIDENCE]</div>
        <h2 style="font-family: var(--font-heading); font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; color: var(--text); margin-bottom: 2rem;">Additional Technical Specifications</h2>
        <div class="evidence-specimen-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
          ${itemsHtml}
        </div>
      </section>
    `;
  }
}

module.exports = { AdditionalEvidenceSection };

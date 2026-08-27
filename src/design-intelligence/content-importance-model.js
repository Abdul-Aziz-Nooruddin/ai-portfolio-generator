/**
 * 🏛️ Content Importance Model (Phase 42)
 * Semantically evaluates evidence strength, measurable impact, technical depth,
 * uniqueness, and developer identity alignment to classify content fields into:
 * CRITICAL, IMPORTANT, SUPPORTING, SECONDARY, DECORATIVE.
 * 
 * Invariant: Content importance must dictate visual prominence, not template defaults.
 */

const IMPORTANCE_TIERS = {
  CRITICAL: 'CRITICAL',     // Primary identity, strongest flagship project, measurable breakthrough, flagship research
  IMPORTANT: 'IMPORTANT',   // Architectural specs, technical decisions, key responsibilities, live deployment links
  SUPPORTING: 'SUPPORTING', // Tech stack details, supporting project milestones, academic coursework, metrics breakdowns
  SECONDARY: 'SECONDARY',   // Stars, forks, timestamps, secondary tools, certifications
  DECORATIVE: 'DECORATIVE'  // Icons, badges, ornamental line rules, ambient visual nodes
};

class ContentImportanceModel {
  /**
   * Evaluates a developer content profile and produces a semantic importance classification
   * @param {Object} profile - Normalized developer profile / CanonicalEvidenceModel
   * @returns {Object} Importance hierarchy graph
   */
  static evaluate(profile = {}) {
    const name = profile.name || profile.identity?.name?.value || 'Developer';
    const role = profile.role || profile.identity?.role?.value || 'Engineer';
    const tagline = profile.tagline || profile.identity?.tagline?.value || '';
    const bio = profile.bio || profile.identity?.bio?.value || '';
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    const research = Array.isArray(profile.research || profile.publications) ? (profile.research || profile.publications) : [];
    const skills = Array.isArray(profile.skills) ? profile.skills : (typeof profile.skills === 'string' ? profile.skills.split(',').map(s => s.trim()) : []);
    const education = Array.isArray(profile.education) ? profile.education : [];
    const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];

    const classifiedProjects = projects.map((p, idx) => {
      const hasMetrics = Boolean(p.metrics || p.impact);
      const hasArchitecture = Boolean(p.architecture || p.systemDesign);
      const hasDecisions = Boolean(p.decisions || p.challenges || p.tradeoffs);
      const hasLiveOrGithub = Boolean(p.live || p.liveUrl || p.github || p.repo);
      
      let score = 50;
      if (hasMetrics) score += 20;
      if (hasArchitecture) score += 20;
      if (hasDecisions) score += 10;
      if (hasLiveOrGithub) score += 10;
      if (idx === 0) score += 15; // Flagship positioning

      let tier = IMPORTANCE_TIERS.SUPPORTING;
      if (score >= 85 || idx === 0) tier = IMPORTANCE_TIERS.CRITICAL;
      else if (score >= 65) tier = IMPORTANCE_TIERS.IMPORTANT;
      else tier = IMPORTANCE_TIERS.SUPPORTING;

      return {
        index: idx,
        name: p.name || `Project ${idx + 1}`,
        score,
        tier,
        hasMetrics,
        hasArchitecture,
        hasLiveOrGithub,
        storyDepth: hasArchitecture && hasMetrics ? 'TECHNICAL_DOSSIER' : (hasArchitecture ? 'CASE_STUDY' : (hasMetrics ? 'METRICS_TELEMETRY' : 'COMPACT_SPECIMEN'))
      };
    });

    // Classify research
    const classifiedResearch = research.map((r, idx) => ({
      index: idx,
      title: r.title || r.name || 'Research Paper',
      venue: r.venue || r.journal || '',
      hasDoi: Boolean(r.doi || r.url),
      tier: idx === 0 ? IMPORTANCE_TIERS.CRITICAL : IMPORTANCE_TIERS.IMPORTANT
    }));

    // Classify experience
    const classifiedExperience = experience.map((e, idx) => ({
      index: idx,
      role: e.role || e.title || 'Role',
      company: e.company || e.organization || 'Company',
      hasDesc: Boolean(e.desc || e.description || e.achievements),
      tier: idx === 0 ? IMPORTANCE_TIERS.IMPORTANT : IMPORTANCE_TIERS.SUPPORTING
    }));

    // Summary of Critical Anchors
    const criticalAnchors = [];
    criticalAnchors.push({ type: 'IDENTITY', label: `${name} — ${role}`, tier: IMPORTANCE_TIERS.CRITICAL });
    if (classifiedProjects.length > 0 && classifiedProjects[0].tier === IMPORTANCE_TIERS.CRITICAL) {
      criticalAnchors.push({ type: 'FLAGSHIP_PROJECT', label: classifiedProjects[0].name, tier: IMPORTANCE_TIERS.CRITICAL });
    }
    if (classifiedResearch.length > 0) {
      criticalAnchors.push({ type: 'FLAGSHIP_RESEARCH', label: classifiedResearch[0].title, tier: IMPORTANCE_TIERS.CRITICAL });
    }

    return {
      identity: {
        name,
        role,
        taglineTier: tagline ? IMPORTANCE_TIERS.CRITICAL : IMPORTANCE_TIERS.SECONDARY,
        bioTier: bio ? IMPORTANCE_TIERS.IMPORTANT : IMPORTANCE_TIERS.SECONDARY
      },
      criticalAnchors,
      projects: classifiedProjects,
      research: classifiedResearch,
      experience: classifiedExperience,
      skillsTier: skills.length > 0 ? (projects.length > 0 ? IMPORTANCE_TIERS.SUPPORTING : IMPORTANCE_TIERS.IMPORTANT) : IMPORTANCE_TIERS.SECONDARY,
      educationTier: education.length > 0 ? IMPORTANCE_TIERS.SUPPORTING : IMPORTANCE_TIERS.SECONDARY,
      certificationsTier: certifications.length > 0 ? IMPORTANCE_TIERS.SECONDARY : IMPORTANCE_TIERS.SECONDARY,
      primaryFocus: research.length > 0 ? 'RESEARCH_FIRST' : (projects.length > 0 ? 'WORK_FIRST' : 'EXPERIENCE_FIRST')
    };
  }
}

module.exports = {
  ContentImportanceModel,
  IMPORTANCE_TIERS
};

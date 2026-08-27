/**
 * Content Intelligence Engine
 * Evaluates normalized candidate profile data across multidimensional signals.
 * Produces an objective ContentProfile without hardcoded role stereotypes.
 */

class ContentAnalyzer {
  static analyze(data = {}) {
    const name = data.name || 'Creator';
    const role = data.role || data.service_title || 'Specialist';
    const tagline = data.tagline || data.bio || '';
    const bio = data.bio || '';
    let projects = Array.isArray(data.projects) ? [...data.projects] : [];
    if (projects.length === 0) {
      for (let i = 1; i <= 5; i++) {
        if (data[`project_${i}_name`]) {
          projects.push({
            name: data[`project_${i}_name`],
            desc: data[`project_${i}_desc`] || data[`project_${i}_description`] || '',
            tech: data[`project_${i}_tech`] || data[`project_${i}_stack`] || '',
            live: data[`project_${i}_live`] || data[`project_${i}_url`] || '',
            github: data[`project_${i}_github`] || data[`project_${i}_repo`] || ''
          });
        }
      }
    }
    const skills = Array.isArray(data.skills) 
      ? data.skills 
      : (typeof data.tech_stack === 'string' ? data.tech_stack.split(/[,\n]/).map(s => s.trim()).filter(Boolean) : (typeof data.skills === 'string' ? data.skills.split(/[,\n]/).map(s => s.trim()).filter(Boolean) : []));
    const experience = Array.isArray(data.experience) ? data.experience : [];
    const education = Array.isArray(data.education) ? data.education : [];
    const awards = Array.isArray(data.awards) ? data.awards : [];
    const certifications = Array.isArray(data.certifications) ? data.certifications : [];

    // Signal Computations
    const projectCount = projects.length;
    let deepProjectCount = 0;
    let visualAssetCount = 0;
    let technicalEvidenceCount = 0;
    let liveDemoCount = 0;
    let repoCount = 0;

    projects.forEach(p => {
      const desc = p.desc || p.description || '';
      const tech = p.tech || p.tags || '';
      const hasLive = Boolean(p.live || p.demo || p.url);
      const hasRepo = Boolean(p.github || p.repo);
      const hasImage = Boolean(p.image || p.screenshot || p.media);

      if (desc.length > 100 || (Array.isArray(p.highlights) && p.highlights.length > 0)) deepProjectCount++;
      if (hasImage || /image|screenshot|ui|figma|render|visual/i.test(desc)) visualAssetCount++;
      if (hasRepo || /architecture|kernel|database|compiler|algorithm|benchmark|api|backend|distributed|docker|kubernetes/i.test(`${desc} ${tech}`)) technicalEvidenceCount++;
      if (hasLive) liveDemoCount++;
      if (hasRepo) repoCount++;
    });

    const narrativeLength = (bio.length + tagline.length);
    const narrativeDepth = narrativeLength > 300 ? 'high' : (narrativeLength > 100 ? 'medium' : 'compact');
    const projectDepth = deepProjectCount >= 2 ? 'deep' : (projectCount >= 3 ? 'medium' : 'compact');
    const visualDensity = visualAssetCount >= 2 ? 'high' : (visualAssetCount === 1 ? 'medium' : 'low');
    const technicalDepth = technicalEvidenceCount >= 2 || skills.length > 8 ? 'high' : (technicalEvidenceCount === 1 ? 'medium' : 'moderate');
    const timelineDepth = experience.length >= 3 ? 'rich' : (experience.length >= 1 ? 'standard' : 'minimal');

    // Overall Density & Strength
    const contentDensity = (projectCount * 2 + skills.length + experience.length * 2 + (narrativeLength > 200 ? 3 : 1)) > 15 ? 'dense' : 'focused';
    const evidenceStrength = (liveDemoCount + repoCount) >= 2 ? 'verified' : 'standard';
    const interactionPotential = projectCount >= 3 || liveDemoCount >= 1 ? 'high' : 'standard';

    // Primary Storytelling Vector (Determined by real evidence, not role strings)
    let primaryAngle = 'balanced';
    if (visualDensity === 'high' && visualAssetCount >= projectCount / 2) {
      primaryAngle = 'visual-showcase';
    } else if (technicalDepth === 'high' && repoCount >= 2) {
      primaryAngle = 'technical-evidence';
    } else if (narrativeDepth === 'high' && experience.length >= 2) {
      primaryAngle = 'narrative-trajectory';
    } else if (projectCount >= 4) {
      primaryAngle = 'work-portfolio';
    }

    const research = Array.isArray(data.research) ? data.research : (Array.isArray(data.publications) ? data.publications : []);
    const publications = research;
    const customFields = { ...(data.customFields || {}) };
    const questionnaire = data.questionnaire || {};

    for (const [k, v] of Object.entries(data)) {
      if (!['name', 'role', 'tagline', 'bio', 'projects', 'skills', 'experience', 'education', 'certifications', 'awards', 'signals', 'research', 'publications', 'customFields', 'questionnaire', '_provenance', '_multiSourceAlternates', 'id', 'status', 'token', 'slug'].includes(k)) {
        if (v !== undefined && v !== null && String(v).trim() !== '') {
          customFields[k] = v;
        }
      }
    }

    return {
      name,
      role,
      tagline,
      bio,
      projects,
      skills,
      experience,
      education,
      certifications,
      awards,
      research,
      publications,
      customFields,
      questionnaire,
      signals: {
        projectCount,
        deepProjectCount,
        visualAssetCount,
        technicalEvidenceCount,
        liveDemoCount,
        repoCount,
        projectDepth,
        visualDensity,
        technicalDepth,
        narrativeDepth,
        timelineDepth,
        contentDensity,
        evidenceStrength,
        interactionPotential,
        primaryAngle
      }
    };
  }
}

module.exports = { ContentAnalyzer };

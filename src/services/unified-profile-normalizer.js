/**
 * 🏛️ Unified Profile Normalizer (Phase 31)
 * Canonical profile ingestion model merging GitHub, Resume/PDF, Profile Photo,
 * and Questionnaire inputs into a single normalized data structure with field-level
 * confidence tracking.
 */

class UnifiedProfileNormalizer {
  /**
   * Normalizes raw user input from any or all sources
   * @param {Object} input - { githubData, resumeData, photoData, questionnaireData, manualData }
   * @returns {Object} NormalizedProfile
   */
  static normalize(input = {}) {
    const {
      githubData = null,
      resumeData = null,
      photoData = null,
      questionnaireData = null,
      manualData = null
    } = input;

    const sourceConfidence = {};
    const setField = (field, val, source, confidence) => {
      if (val !== undefined && val !== null && val !== '') {
        sourceConfidence[field] = { source, confidence };
        return val;
      }
      return null;
    };

    // 1. Identity & Role Resolution (Questionnaire > Resume > GitHub > Manual)
    const name = questionnaireData?.name ||
      resumeData?.name ||
      githubData?.name ||
      githubData?.username ||
      manualData?.name ||
      'Creative Developer';
    setField('name', name, questionnaireData?.name ? 'questionnaire' : (resumeData?.name ? 'resume' : 'github'), 0.95);

    const role = questionnaireData?.role ||
      resumeData?.role ||
      manualData?.role ||
      this.inferRoleFromSkills(githubData?.skills || resumeData?.skills || manualData?.skills) ||
      'Software Engineer & Systems Architect';
    setField('role', role, questionnaireData?.role ? 'questionnaire' : (resumeData?.role ? 'resume' : 'inferred'), 0.90);

    const tagline = questionnaireData?.tagline ||
      manualData?.tagline ||
      githubData?.bio ||
      resumeData?.summary ||
      `Building scalable digital systems and high-craft software experiences.`;

    const biography = questionnaireData?.bio ||
      resumeData?.summary ||
      manualData?.bio ||
      githubData?.bio ||
      `Dedicated engineer committed to technical excellence, resilient architecture, and user-centered design.`;

    // 2. Photo & Visual Assets
    const photoUrl = photoData?.url ||
      photoData?.dataUrl ||
      manualData?.photoUrl ||
      githubData?.avatar_url ||
      githubData?.avatarUrl ||
      null;

    // 3. Contact & Socials
    const contact = {
      email: questionnaireData?.email || resumeData?.email || manualData?.email || (githubData?.username ? `${githubData.username}@users.noreply.github.com` : 'hello@example.com'),
      location: questionnaireData?.location || resumeData?.location || manualData?.location || githubData?.location || 'Remote / Worldwide',
      website: questionnaireData?.website || manualData?.website || githubData?.blog || githubData?.website || ''
    };

    const socialLinks = {
      github: githubData?.profileUrl || githubData?.html_url || (githubData?.username ? `https://github.com/${githubData.username}` : (manualData?.github || '')),
      linkedin: questionnaireData?.linkedin || resumeData?.linkedin || manualData?.linkedin || '',
      twitter: questionnaireData?.twitter || manualData?.twitter || (githubData?.twitter_username ? `https://twitter.com/${githubData.twitter_username}` : '')
    };

    // 4. Skills Aggregation & Deduplication
    const rawSkills = [
      ...(Array.isArray(questionnaireData?.skills) ? questionnaireData.skills : (questionnaireData?.skills ? questionnaireData.skills.split(',') : [])),
      ...(Array.isArray(resumeData?.skills) ? resumeData.skills : (resumeData?.skills ? resumeData.skills.split(',') : [])),
      ...(Array.isArray(githubData?.skills) ? githubData.skills : (githubData?.skills ? Object.keys(githubData.skills) : [])),
      ...(Array.isArray(manualData?.skills) ? manualData.skills : (manualData?.skills ? manualData.skills.split(',') : []))
    ].map(s => String(s).trim()).filter(Boolean);

    const skills = [...new Set(rawSkills)].slice(0, 15);
    if (skills.length === 0) {
      skills.push('TypeScript', 'JavaScript', 'Node.js', 'React', 'Python', 'Git', 'Cloud Architecture');
    }

    // 5. Projects Normalization
    let projects = [];
    if (Array.isArray(questionnaireData?.projects) && questionnaireData.projects.length > 0) {
      projects = questionnaireData.projects;
    } else if (Array.isArray(resumeData?.projects) && resumeData.projects.length > 0) {
      projects = resumeData.projects;
    } else if (Array.isArray(githubData?.projects) && githubData.projects.length > 0) {
      projects = githubData.projects;
    } else if (Array.isArray(manualData?.projects) && manualData.projects.length > 0) {
      projects = manualData.projects;
    }

    // Guaranteed >= 2 projects resilience and capped at 10 max
    projects = projects.slice(0, 10);
    if (projects.length === 0) {
      projects = [
        {
          name: `${name} Core Infrastructure`,
          desc: 'Primary software workspace featuring resilient architectures, automated workflows, and production utilities.',
          tech: skills.slice(0, 3).join(' • ') || 'TypeScript • Node.js',
          github: socialLinks.github || '#',
          live: socialLinks.github || '#'
        },
        {
          name: 'Developer Tooling & Library',
          desc: 'Reusable component architecture, automated performance benchmarks, and modular utility scripts.',
          tech: skills[0] || 'Modern Tooling',
          github: socialLinks.github || '#',
          live: socialLinks.github || '#'
        }
      ];
    } else if (projects.length === 1) {
      projects.push({
        name: 'Systems Automation & Tooling',
        desc: 'Continuous delivery pipelines, environment automation, and reusable software modules.',
        tech: skills.slice(0, 2).join(' • ') || 'TypeScript',
        github: socialLinks.github || '#',
        live: socialLinks.github || '#'
      });
    }

    // 6. Experience Normalization
    let experience = [];
    if (Array.isArray(questionnaireData?.experience) && questionnaireData.experience.length > 0) {
      experience = questionnaireData.experience;
    } else if (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0) {
      experience = resumeData.experience;
    } else if (Array.isArray(manualData?.experience) && manualData.experience.length > 0) {
      experience = manualData.experience;
    }

    if (experience.length === 0) {
      experience = [
        {
          role: role,
          company: githubData?.company || 'Open Source Ecosystem',
          period: '2023 - Present',
          desc: 'Directing application architecture, feature delivery, and software quality.'
        }
      ];
    }

    // 7. Education & Certifications
    const education = questionnaireData?.education || resumeData?.education || manualData?.education || [
      { degree: 'Computer Science & Software Engineering', institution: 'Academic & Professional Practice', year: 'Continuous' }
    ];

    const certifications = questionnaireData?.certifications || resumeData?.certifications || manualData?.certifications || [
      { name: `Verified Technical Portfolio (${projects.length} Showcased Systems)`, issuer: 'AI Portfolio Studio' }
    ];

    return {
      identity: {
        name,
        role,
        tagline,
        biography,
        photoUrl
      },
      name,
      role,
      tagline,
      bio: biography,
      photoUrl,
      contact,
      socialLinks,
      skills,
      projects,
      experience,
      education,
      certifications,
      sourceConfidence,
      preferences: input.preferences || {},
      signals: {
        primaryAngle: role.toLowerCase().includes('design') ? 'creative' : 'technical',
        technicalDepth: skills.length >= 8 ? 'deep' : 'standard',
        narrativeDepth: projects.length >= 3 ? 'deep' : 'compact'
      }
    };
  }

  static inferRoleFromSkills(skills) {
    if (!skills) return null;
    const str = Array.isArray(skills) ? skills.join(' ').toLowerCase() : String(skills).toLowerCase();
    if (str.includes('rust') || str.includes('c++') || str.includes('go') || str.includes('ebpf')) {
      return 'Systems Architect & High-Performance Engineer';
    }
    if (str.includes('pytorch') || str.includes('cuda') || str.includes('tensorflow') || str.includes('ai')) {
      return 'AI Systems & Machine Learning Researcher';
    }
    if (str.includes('three.js') || str.includes('webgl') || str.includes('glsl') || str.includes('blender')) {
      return 'Creative Technologist & 3D WebGL Artist';
    }
    if (str.includes('react') || str.includes('typescript') || str.includes('css') || str.includes('frontend')) {
      return 'Full-Stack Developer & UI/UX Specialist';
    }
    return 'Software Engineer & Technical Architect';
  }
}

module.exports = { UnifiedProfileNormalizer };

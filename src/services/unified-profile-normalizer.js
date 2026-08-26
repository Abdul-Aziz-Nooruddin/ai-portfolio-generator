/**
 * 🏛️ Unified Profile Normalizer (Phase 32)
 * Canonical profile ingestion and multi-source merging engine.
 * Tracks explicit field-level data provenance (VERIFIED, USER_PROVIDED, INFERRED)
 * across any combination of sources (GitHub, PDF resume, image gallery, guided questions).
 */

const PROVENANCE_LEVELS = {
  VERIFIED: 'VERIFIED',       // From public APIs with cryptographic or server integrity (GitHub API, commit history)
  USER_PROVIDED: 'USER_PROVIDED', // Explicitly typed/uploaded by the user
  INFERRED: 'INFERRED'        // Synthesized or clustered by design intelligence algorithms
};

class UnifiedProfileNormalizer {
  /**
   * Normalizes raw user input from any or all sources
   * @param {Object} input - { githubData, resumeData, photoData, imagesData, questionnaireData, manualData, preferences }
   * @returns {Object} NormalizedProfile with provenance
   */
  static normalize(input = {}) {
    const {
      githubData = null,
      resumeData = null,
      photoData = null,
      imagesData = [],
      questionnaireData = null,
      manualData = null,
      preferences = {}
    } = input;

    const provenance = {};
    const recordProvenance = (field, source, level, confidence = 0.95) => {
      provenance[field] = { source, level, confidence, timestamp: Date.now() };
    };

    // 1. Identity & Name Resolution (Questionnaire > Resume > GitHub > Default)
    let name = 'Creative Developer';
    if (questionnaireData?.name) {
      name = questionnaireData.name.trim();
      recordProvenance('name', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED, 0.98);
    } else if (resumeData?.name) {
      name = resumeData.name.trim();
      recordProvenance('name', 'resume', PROVENANCE_LEVELS.USER_PROVIDED, 0.95);
    } else if (githubData?.name) {
      name = githubData.name.trim();
      recordProvenance('name', 'github', PROVENANCE_LEVELS.VERIFIED, 0.90);
    } else if (githubData?.username) {
      name = githubData.username.trim();
      recordProvenance('name', 'github_username', PROVENANCE_LEVELS.VERIFIED, 0.85);
    } else if (manualData?.name) {
      name = manualData.name.trim();
      recordProvenance('name', 'manual', PROVENANCE_LEVELS.USER_PROVIDED, 0.95);
    } else {
      recordProvenance('name', 'fallback', PROVENANCE_LEVELS.INFERRED, 0.50);
    }

    // 2. Role & Specialization
    let role = 'Software Engineer & Technical Architect';
    if (questionnaireData?.role) {
      role = questionnaireData.role.trim();
      recordProvenance('role', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (resumeData?.role) {
      role = resumeData.role.trim();
      recordProvenance('role', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (manualData?.role) {
      role = manualData.role.trim();
      recordProvenance('role', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    } else {
      const inferredRole = this.inferRoleFromSkills(githubData?.skills || resumeData?.skills || manualData?.skills);
      if (inferredRole) {
        role = inferredRole;
        recordProvenance('role', 'skill_inference', PROVENANCE_LEVELS.INFERRED);
      } else {
        recordProvenance('role', 'fallback', PROVENANCE_LEVELS.INFERRED);
      }
    }

    // 3. Tagline & Narrative Bio
    let tagline = '';
    if (questionnaireData?.tagline) {
      tagline = questionnaireData.tagline.trim();
      recordProvenance('tagline', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (manualData?.tagline) {
      tagline = manualData.tagline.trim();
      recordProvenance('tagline', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (githubData?.bio) {
      tagline = githubData.bio.trim();
      recordProvenance('tagline', 'github', PROVENANCE_LEVELS.VERIFIED);
    } else if (resumeData?.summary) {
      tagline = resumeData.summary.trim().slice(0, 140);
      recordProvenance('tagline', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else {
      tagline = `Building scalable digital systems and high-craft software experiences.`;
      recordProvenance('tagline', 'fallback', PROVENANCE_LEVELS.INFERRED);
    }

    let bio = '';
    if (questionnaireData?.bio) {
      bio = questionnaireData.bio.trim();
      recordProvenance('bio', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (resumeData?.summary) {
      bio = resumeData.summary.trim();
      recordProvenance('bio', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (manualData?.bio) {
      bio = manualData.bio.trim();
      recordProvenance('bio', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (githubData?.bio) {
      bio = githubData.bio.trim();
      recordProvenance('bio', 'github', PROVENANCE_LEVELS.VERIFIED);
    } else {
      bio = `Dedicated professional committed to technical excellence, resilient architecture, and user-centered design.`;
      recordProvenance('bio', 'fallback', PROVENANCE_LEVELS.INFERRED);
    }

    // 4. Visual Material: Profile Photo & Supporting Gallery Images (Max 3)
    const photoUrl = photoData?.url ||
      photoData?.dataUrl ||
      manualData?.photoUrl ||
      githubData?.avatar_url ||
      githubData?.avatarUrl ||
      null;
    if (photoUrl) {
      recordProvenance('photoUrl', photoData?.url ? 'upload' : (githubData?.avatar_url ? 'github' : 'manual'), PROVENANCE_LEVELS.USER_PROVIDED);
    }

    const visualImages = (Array.isArray(imagesData) ? imagesData : [])
      .slice(0, 3)
      .map((img, idx) => ({
        url: typeof img === 'string' ? img : img.url || img.dataUrl,
        caption: img.caption || `Artifact Specimen #${idx + 1}`,
        provenance: PROVENANCE_LEVELS.USER_PROVIDED
      }))
      .filter(img => Boolean(img.url));

    // 5. Contact & Social Channels
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

    // 6. Skills Aggregation
    const rawSkills = [
      ...(Array.isArray(questionnaireData?.skills) ? questionnaireData.skills : (questionnaireData?.skills ? questionnaireData.skills.split(',') : [])),
      ...(Array.isArray(resumeData?.skills) ? resumeData.skills : (resumeData?.skills ? resumeData.skills.split(',') : [])),
      ...(Array.isArray(githubData?.skills) ? githubData.skills : (githubData?.skills ? Object.keys(githubData.skills) : [])),
      ...(Array.isArray(manualData?.skills) ? manualData.skills : (manualData?.skills ? manualData.skills.split(',') : []))
    ].map(s => String(s).trim()).filter(Boolean);

    const skills = [...new Set(rawSkills)].slice(0, 15);
    if (skills.length === 0) {
      skills.push('TypeScript', 'JavaScript', 'Node.js', 'React', 'Python', 'Git', 'Cloud Architecture');
      recordProvenance('skills', 'fallback', PROVENANCE_LEVELS.INFERRED);
    } else {
      recordProvenance('skills', 'multi_source_merge', PROVENANCE_LEVELS.USER_PROVIDED);
    }

    // 7. Projects Normalization (Capped at 10, Guaranteed >= 2)
    let projects = [];
    if (Array.isArray(questionnaireData?.projects) && questionnaireData.projects.length > 0) {
      projects = questionnaireData.projects;
      recordProvenance('projects', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(resumeData?.projects) && resumeData.projects.length > 0) {
      projects = resumeData.projects;
      recordProvenance('projects', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(githubData?.projects) && githubData.projects.length > 0) {
      projects = githubData.projects;
      recordProvenance('projects', 'github', PROVENANCE_LEVELS.VERIFIED);
    } else if (Array.isArray(manualData?.projects) && manualData.projects.length > 0) {
      projects = manualData.projects;
      recordProvenance('projects', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    }

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
      recordProvenance('projects', githubData ? 'github' : 'starter_anchors', githubData ? PROVENANCE_LEVELS.VERIFIED : PROVENANCE_LEVELS.INFERRED);
    } else if (projects.length === 1) {
      projects.push({
        name: 'Systems Automation & Tooling',
        desc: 'Continuous delivery pipelines, environment automation, and reusable software modules.',
        tech: skills.slice(0, 2).join(' • ') || 'TypeScript',
        github: socialLinks.github || '#',
        live: socialLinks.github || '#'
      });
    }

    // 8. Experience Normalization
    let experience = [];
    if (Array.isArray(questionnaireData?.experience) && questionnaireData.experience.length > 0) {
      experience = questionnaireData.experience;
      recordProvenance('experience', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0) {
      experience = resumeData.experience;
      recordProvenance('experience', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(manualData?.experience) && manualData.experience.length > 0) {
      experience = manualData.experience;
      recordProvenance('experience', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
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
      recordProvenance('experience', 'inferred_role_entry', PROVENANCE_LEVELS.INFERRED);
    }

    // 9. Education & Certifications
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
        biography: bio,
        photoUrl,
        images: visualImages
      },
      name,
      role,
      tagline,
      bio,
      photoUrl,
      images: visualImages,
      contact,
      socialLinks,
      skills,
      projects,
      experience,
      education,
      certifications,
      provenance,
      sourceConfidence: provenance, // Backward compatibility
      preferences,
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

module.exports = { UnifiedProfileNormalizer, PROVENANCE_LEVELS };

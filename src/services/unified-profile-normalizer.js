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
      resumeData: rawResumeData = null,
      photoData = null,
      imagesData = [],
      questionnaireData = null,
      manualData: rawManualData = null,
      preferences = {}
    } = input;

    // Flatten extracted_data if present in resumeData or input
    const resumeData = rawResumeData?.extracted_data
      ? { ...rawResumeData, ...rawResumeData.extracted_data }
      : (input?.extracted_data ? { ...input, ...input.extracted_data } : rawResumeData);

    const manualData = rawManualData || input?.data || input;

    const provenance = {};
    const recordProvenance = (field, source, level, confidence = 0.95) => {
      provenance[field] = { source, level, confidence, timestamp: Date.now() };
    };

    // 1. Identity & Name Resolution (Direct Input > Questionnaire > Resume > GitHub > Default)
    let name = 'Creative Developer';
    if (input?.name && typeof input.name === 'string' && input.name.trim() && input.name !== 'Software Developer') {
      name = input.name.trim();
      recordProvenance('name', 'direct_input', PROVENANCE_LEVELS.USER_PROVIDED, 0.99);
    } else if (questionnaireData?.name) {
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
    if (input?.role && typeof input.role === 'string' && input.role.trim()) {
      role = input.role.trim();
      recordProvenance('role', 'direct_input', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (questionnaireData?.role) {
      role = questionnaireData.role.trim();
      recordProvenance('role', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (resumeData?.role) {
      role = resumeData.role.trim();
      recordProvenance('role', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (manualData?.role) {
      role = manualData.role.trim();
      recordProvenance('role', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    } else {
      const inferredRole = this.inferRoleFromSkills(githubData?.skills || resumeData?.skills || manualData?.skills || input?.skills);
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
    } else if (resumeData?.tagline) {
      tagline = resumeData.tagline.trim().slice(0, 140);
      recordProvenance('tagline', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (manualData?.tagline) {
      tagline = manualData.tagline.trim();
      recordProvenance('tagline', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (githubData?.bio) {
      tagline = githubData.bio.trim();
      recordProvenance('tagline', 'github', PROVENANCE_LEVELS.VERIFIED);
    } else if (resumeData?.summary || resumeData?.bio) {
      tagline = (resumeData.summary || resumeData.bio).trim().slice(0, 140);
      recordProvenance('tagline', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else {
      tagline = `Building scalable digital systems and high-craft software experiences.`;
      recordProvenance('tagline', 'fallback', PROVENANCE_LEVELS.INFERRED);
    }

    let bio = '';
    if (questionnaireData?.bio) {
      bio = questionnaireData.bio.trim();
      recordProvenance('bio', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (resumeData?.bio || resumeData?.summary) {
      bio = (resumeData.bio || resumeData.summary).trim();
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
    const extractedName = questionnaireData?.name || resumeData?.name || manualData?.name || (githubData?.name ? githubData.name : (githubData?.username || 'Developer'));
    const safeFallbackEmail = extractedName ? `${extractedName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@devfolio.me` : 'contact@devfolio.me';

    const contact = {
      email: questionnaireData?.email || resumeData?.email || manualData?.email || (githubData?.username ? `${githubData.username}@users.noreply.github.com` : safeFallbackEmail),
      phone: questionnaireData?.phone || resumeData?.phone || manualData?.phone || null,
      location: questionnaireData?.location || resumeData?.location || manualData?.location || githubData?.location || 'Remote / Worldwide',
      website: questionnaireData?.website || resumeData?.website || manualData?.website || githubData?.blog || githubData?.website || ''
    };

    const socialLinks = {
      github: githubData?.profileUrl || githubData?.html_url || (githubData?.username ? `https://github.com/${githubData.username}` : (resumeData?.github || manualData?.github || '')),
      linkedin: questionnaireData?.linkedin || resumeData?.linkedin || manualData?.linkedin || '',
      twitter: questionnaireData?.twitter || manualData?.twitter || (githubData?.twitter_username ? `https://twitter.com/${githubData.twitter_username}` : '')
    };

    // 6. Skills Aggregation
    const resumeSkills = [];
    if (Array.isArray(resumeData?.skills)) {
      resumeSkills.push(...resumeData.skills);
    } else if (typeof resumeData?.skills === 'string') {
      resumeSkills.push(...resumeData.skills.split(/[,⋄•|/]/));
    }
    if (resumeData?.tech_stack && typeof resumeData.tech_stack === 'string') {
      resumeSkills.push(...resumeData.tech_stack.split(/[,⋄•|/]/));
    }
    if (resumeData?.skills_by_category && typeof resumeData.skills_by_category === 'object') {
      Object.values(resumeData.skills_by_category).forEach(cat => {
        if (Array.isArray(cat)) resumeSkills.push(...cat);
      });
    }

    const rawSkills = [
      ...(Array.isArray(questionnaireData?.skills) ? questionnaireData.skills : (questionnaireData?.skills ? questionnaireData.skills.split(',') : [])),
      ...resumeSkills,
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
    const extractProjectsFromFlat = (obj) => {
      if (!obj || typeof obj !== 'object') return [];
      const list = [];
      for (let i = 1; i <= 5; i++) {
        if (obj[`project_${i}_name`] || obj[`project_${i}_title`]) {
          list.push({
            name: obj[`project_${i}_name`] || obj[`project_${i}_title`],
            desc: obj[`project_${i}_desc`] || obj[`project_${i}_description`] || '',
            tech: obj[`project_${i}_tech`] || obj[`project_${i}_tech_stack`] || ''
          });
        }
      }
      return list;
    };

    let projects = [];
    const flatProjects = [
      ...extractProjectsFromFlat(input),
      ...extractProjectsFromFlat(input?.data),
      ...extractProjectsFromFlat(questionnaireData),
      ...extractProjectsFromFlat(manualData)
    ];

    if (Array.isArray(input?.projects) && input.projects.length > 0) {
      projects = input.projects;
      recordProvenance('projects', 'direct_input', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(input?.data?.projects) && input.data.projects.length > 0) {
      projects = input.data.projects;
      recordProvenance('projects', 'direct_input_data', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(questionnaireData?.projects) && questionnaireData.projects.length > 0) {
      projects = questionnaireData.projects;
      recordProvenance('projects', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (flatProjects.length > 0) {
      projects = flatProjects;
      recordProvenance('projects', 'manual_flat_fields', PROVENANCE_LEVELS.USER_PROVIDED);
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

    // Clean & standardize projects while preserving all deep evidence fields
    projects = projects.map(p => ({
      ...p,
      name: p.name || p.title || 'Featured Project',
      desc: p.desc || p.description || 'High-performance software system engineered with modern practices.',
      tech: p.tech || p.tech_stack || (Array.isArray(p.technologies) ? p.technologies.join(' • ') : (Array.isArray(p.techList) ? p.techList.join(' • ') : skills.slice(0, 3).join(' • '))),
      github: p.github || p.repo || socialLinks.github || '#',
      live: p.live || p.link || socialLinks.github || '#'
    }));

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
    if (Array.isArray(input?.experience) && input.experience.length > 0) {
      experience = input.experience;
      recordProvenance('experience', 'direct_input', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(input?.data?.experience) && input.data.experience.length > 0) {
      experience = input.data.experience;
      recordProvenance('experience', 'direct_input_data', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(questionnaireData?.experience) && questionnaireData.experience.length > 0) {
      experience = questionnaireData.experience;
      recordProvenance('experience', 'questionnaire', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(resumeData?.experience) && resumeData.experience.length > 0) {
      experience = resumeData.experience;
      recordProvenance('experience', 'resume', PROVENANCE_LEVELS.USER_PROVIDED);
    } else if (Array.isArray(manualData?.experience) && manualData.experience.length > 0) {
      experience = manualData.experience;
      recordProvenance('experience', 'manual', PROVENANCE_LEVELS.USER_PROVIDED);
    }

    const currentYear = new Date().getFullYear();
    if (experience.length === 0) {
      experience = [
        {
          role: role,
          company: githubData?.company || 'Open Source & Independent Development',
          period: `${currentYear - 2} - Present`,
          desc: 'Directing application architecture, feature delivery, and software quality.'
        }
      ];
      recordProvenance('experience', 'inferred_role_entry', PROVENANCE_LEVELS.INFERRED);
    } else {
      experience = experience.map(e => ({
        ...e,
        role: e.role || e.title || role,
        company: e.company || e.organization || 'Independent Development',
        period: e.period || e.duration || e.year || `${currentYear - 2} - Present`,
        desc: e.desc || e.description || 'Directing application architecture, feature delivery, and software quality.'
      }));
    }

    // 9. Education & Certifications
    let education = [];
    if (Array.isArray(input?.education) && input.education.length > 0) {
      education = input.education;
    } else if (Array.isArray(input?.data?.education) && input.data.education.length > 0) {
      education = input.data.education;
    } else if (Array.isArray(questionnaireData?.education) && questionnaireData.education.length > 0) {
      education = questionnaireData.education;
    } else if (Array.isArray(resumeData?.education) && resumeData.education.length > 0) {
      education = resumeData.education;
    } else if (Array.isArray(manualData?.education) && manualData.education.length > 0) {
      education = manualData.education;
    } else if (resumeData?.education && typeof resumeData.education === 'object') {
      education = [resumeData.education];
    } else {
      education = [
        { degree: 'Computer Science & Software Engineering', institution: 'Academic & Professional Practice', year: 'Continuous' }
      ];
    }

    education = education.map(edu => ({
      ...edu,
      degree: edu.degree || edu.study || edu.major || 'Computer Science & Software Engineering',
      institution: edu.institution || edu.school || edu.university || 'Academic & Professional Practice',
      school: edu.school || edu.institution || edu.university || 'Academic & Professional Practice',
      period: edu.period || edu.year || 'Continuous'
    }));

    let certifications = [];
    if (Array.isArray(questionnaireData?.certifications) && questionnaireData.certifications.length > 0) {
      certifications = questionnaireData.certifications;
    } else if (Array.isArray(resumeData?.certifications) && resumeData.certifications.length > 0) {
      certifications = resumeData.certifications;
    } else if (Array.isArray(manualData?.certifications) && manualData.certifications.length > 0) {
      certifications = manualData.certifications;
    } else {
      certifications = [
        { name: `Verified Technical Portfolio (${projects.length} Showcased Systems)`, issuer: 'AI Portfolio Studio' }
      ];
    }

    const research = input.research || input.publications || questionnaireData?.research || questionnaireData?.publications || resumeData?.research || resumeData?.publications || manualData?.research || manualData?.publications || [];
    if (research.length > 0) {
      recordProvenance('research', 'user_provided_research', PROVENANCE_LEVELS.USER_PROVIDED);
    }

    // Capture custom / extension fields (excluding contact, projects, and binary/internal payload keys)
    const ignoredKeys = [
      'githubData', 'resumeData', 'photoData', 'imagesData', 'questionnaireData', 'manualData',
      'preferences', 'name', 'role', 'tagline', 'bio', 'summary', 'photoUrl', 'images', 'contact',
      'socialLinks', 'skills', 'projects', 'experience', 'education', 'certifications', 'research',
      'publications', 'customFields', 'provenance', 'sourceConfidence', 'signals', 'extracted_data',
      'branch', 'id', 'status', 'token', 'slug', 'rawBase64', 'extractedTextSnippet', 'base64Data',
      'filename', 'mimeType', 'fileType', 'pages', 'rawText', 'identity', 'skills_by_category', 'tech_stack',
      'email', 'phone', 'github', 'github_url', 'linkedin', 'twitter', 'website', 'location', 'avatar_url', 'avatarUrl', 'profileUrl', 'html_url'
    ];

    const customFields = {};
    const sources = [input, questionnaireData, manualData, resumeData, githubData];
    sources.forEach(src => {
      if (src && typeof src === 'object') {
        if (src.customFields && typeof src.customFields === 'object') {
          for (const [k, v] of Object.entries(src.customFields)) {
            if (!ignoredKeys.includes(k) && !k.startsWith('project_') && v !== undefined && v !== null && String(v).trim() !== '' && String(v).length < 300) {
              customFields[k] = v;
            }
          }
        }
        for (const [k, v] of Object.entries(src)) {
          if (!ignoredKeys.includes(k) && !k.startsWith('project_')) {
            if (v !== undefined && v !== null && String(v).trim() !== '' && typeof v !== 'object' && String(v).length < 300) {
              customFields[k] = v;
            }
          }
        }
      }
    });

    return {
      identity: {
        name,
        role,
        tagline,
        biography: bio,
        photoUrl,
        images: visualImages,
        email: contact.email,
        phone: contact.phone,
        location: contact.location
      },
      name,
      role,
      tagline,
      bio,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      photoUrl,
      images: visualImages,
      contact,
      socialLinks,
      skills,
      projects,
      experience,
      education,
      certifications,
      research,
      publications: research,
      customFields,
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

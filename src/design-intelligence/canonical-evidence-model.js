/**
 * 🏛️ Canonical Evidence Model (Phase 38)
 * Rich multi-source developer evidence graph preserving full factual provenance.
 * Eliminates the flat "name + bio + skills + projects" over-simplification.
 */

const { EvidenceInventory } = require('./evidence-inventory');

const PROVENANCE_LEVELS = {
  VERIFIED: 'VERIFIED',           // Cryptographic / API ground truth (GitHub API, commit logs)
  USER_PROVIDED: 'USER_PROVIDED', // Explicit user input (Questionnaire, PDF resume, direct upload)
  INFERRED: 'INFERRED'            // Synthesized heuristic signal with confidence score
};

const WORK_TYPES = {
  PROJECT: 'PROJECT',
  CASE_STUDY: 'CASE_STUDY',
  RESEARCH: 'RESEARCH',
  EXPERIMENT: 'EXPERIMENT',
  OPEN_SOURCE_CONTRIBUTION: 'OPEN_SOURCE_CONTRIBUTION',
  LIBRARY: 'LIBRARY',
  TOOL: 'TOOL',
  AUTOMATION: 'AUTOMATION',
  PROTOCOL: 'PROTOCOL',
  PRODUCT: 'PRODUCT',
  THESIS: 'THESIS',
  ARTICLE: 'ARTICLE',
  ARCHITECTURE: 'ARCHITECTURE',
  SYSTEM: 'SYSTEM',
  CLI: 'CLI',
  DATASET: 'DATASET',
  PROTOTYPE: 'PROTOTYPE',
  VISUAL_WORK: 'VISUAL_WORK',
  POSTMORTEM: 'POSTMORTEM',
  BUILD_JOURNAL: 'BUILD_JOURNAL',
  ARCHIVE_ENTRY: 'ARCHIVE_ENTRY'
};

const IMAGE_ROLES = {
  PROJECT_SCREENSHOT: 'PROJECT_SCREENSHOT',
  PRODUCT_SCREEN: 'PRODUCT_SCREEN',
  UI_DESIGN: 'UI_DESIGN',
  ARCHITECTURE_DIAGRAM: 'ARCHITECTURE_DIAGRAM',
  CERTIFICATE: 'CERTIFICATE',
  PROFILE_IMAGE: 'PROFILE_IMAGE',
  ARTWORK: 'ARTWORK',
  TECHNICAL_DIAGRAM: 'TECHNICAL_DIAGRAM',
  VISUAL_ARTIFACT: 'VISUAL_ARTIFACT'
};

class CanonicalEvidenceModel {
  constructor(data = {}) {
    this.identity = data.identity || {};
    this.work = data.work || [];
    this.career = data.career || [];
    this.education = data.education || [];
    this.research = data.research || [];
    this.visualEvidence = data.visualEvidence || [];
    this.userClaims = data.userClaims || {};
    this.inferences = data.inferences || [];
    this.metadata = data.metadata || {};
    this.skills = data.skills || [];
    this.customFields = data.customFields || {};
    this.inventory = new EvidenceInventory(this);
  }

  /**
   * Constructs a CanonicalEvidenceModel from multi-source raw inputs
   */
  static fromRawInput(input = {}, normalizerResult = null) {
    const {
      githubData = null,
      resumeData = null,
      photoData = null,
      imagesData = [],
      questionnaireData = null,
      manualData = null
    } = input;

    // 1. Identity Resolution
    const name = questionnaireData?.name?.trim() ||
      resumeData?.name?.trim() ||
      githubData?.name?.trim() ||
      githubData?.username?.trim() ||
      manualData?.name?.trim() ||
      input.name?.trim() ||
      'Creative Technologist';

    const role = questionnaireData?.role?.trim() ||
      resumeData?.role?.trim() ||
      manualData?.role?.trim() ||
      input.role?.trim() ||
      'Software Engineer & Technical Architect';

    const tagline = questionnaireData?.tagline?.trim() ||
      manualData?.tagline?.trim() ||
      input.tagline?.trim() ||
      githubData?.bio?.trim() ||
      resumeData?.summary?.trim() ||
      `${role} crafting high-performance, resilient digital systems.`;

    const bio = questionnaireData?.bio?.trim() ||
      resumeData?.bio?.trim() ||
      manualData?.bio?.trim() ||
      input.bio?.trim() ||
      githubData?.bio?.trim() ||
      tagline;

    const identity = {
      name: { value: name, provenance: questionnaireData?.name || input.name ? PROVENANCE_LEVELS.USER_PROVIDED : (githubData?.name ? PROVENANCE_LEVELS.VERIFIED : PROVENANCE_LEVELS.INFERRED) },
      role: { value: role, provenance: questionnaireData?.role || input.role ? PROVENANCE_LEVELS.USER_PROVIDED : PROVENANCE_LEVELS.INFERRED },
      tagline: { value: tagline, provenance: questionnaireData?.tagline || input.tagline ? PROVENANCE_LEVELS.USER_PROVIDED : PROVENANCE_LEVELS.INFERRED },
      bio: { value: bio, provenance: questionnaireData?.bio || input.bio ? PROVENANCE_LEVELS.USER_PROVIDED : PROVENANCE_LEVELS.INFERRED },
      location: { value: questionnaireData?.location || resumeData?.location || input.location || githubData?.location || 'Worldwide', provenance: PROVENANCE_LEVELS.USER_PROVIDED },
      email: { value: questionnaireData?.email || resumeData?.email || input.email || githubData?.email || '', provenance: PROVENANCE_LEVELS.USER_PROVIDED },
      website: { value: questionnaireData?.website || input.website || githubData?.blog || '', provenance: PROVENANCE_LEVELS.USER_PROVIDED },
      githubUsername: { value: githubData?.username || manualData?.github_username || input.github || '', provenance: PROVENANCE_LEVELS.VERIFIED },
      avatarUrl: { value: photoData?.url || input.avatarUrl || input.photoUrl || githubData?.avatar_url || githubData?.avatarUrl || '', provenance: photoData?.url || input.photoUrl ? PROVENANCE_LEVELS.USER_PROVIDED : PROVENANCE_LEVELS.VERIFIED }
    };

    // 2. Semantic Work Items Ingestion & Deduplication
    const workMap = new Map();

    const addWorkItem = (item, sourceLevel) => {
      if (!item || !item.name) return;
      const key = String(item.name).toLowerCase().trim();
      const existing = workMap.get(key);

      const classifiedType = this.classifyWorkType(item);
      const normalizedItem = {
        id: item.id || `work-${key.replace(/[^a-z0-9]/g, '-')}`,
        name: item.name.trim(),
        workType: item.workType || classifiedType,
        desc: item.desc || item.description || item.summary || 'Architectural deployment and technical investigation.',
        tech: Array.isArray(item.tech) ? item.tech.join(' • ') : (item.tech || item.tags || 'TypeScript • Node.js'),
        liveUrl: item.live || item.liveUrl || item.demo || item.url || '',
        repoUrl: item.github || item.repoUrl || item.repo || item.html_url || '',
        stars: item.stars || 0,
        forks: item.forks || 0,
        topics: Array.isArray(item.topics) ? item.topics : [],
        architecture: item.architecture || item.systemDesign || '',
        readmeSnippet: item.readmeSnippet || item.readme || '',
        metrics: item.metrics || item.impact || '',
        challenges: item.challenges || '',
        decisions: item.decisions || '',
        tradeoffs: item.tradeoffs || '',
        commits: item.commits || 0,
        provenance: sourceLevel,
        confidence: sourceLevel === PROVENANCE_LEVELS.VERIFIED ? 0.98 : 0.90
      };

      // Capture custom / extension properties
      const customProps = {};
      for (const [k, v] of Object.entries(item)) {
        if (!['id', 'name', 'workType', 'desc', 'description', 'summary', 'tech', 'tags', 'live', 'liveUrl', 'demo', 'url', 'github', 'repoUrl', 'repo', 'html_url', 'stars', 'forks', 'topics', 'architecture', 'systemDesign', 'readmeSnippet', 'readme', 'metrics', 'impact', 'challenges', 'decisions', 'tradeoffs', 'commits', '_provenance', '_sourceAlternates'].includes(k)) {
          if (v !== undefined && v !== null && String(v).trim() !== '') {
            customProps[k] = v;
          }
        }
      }
      if (Object.keys(customProps).length > 0) {
        normalizedItem.customFields = customProps;
      }

      if (!existing || (sourceLevel === PROVENANCE_LEVELS.VERIFIED && existing.provenance !== PROVENANCE_LEVELS.VERIFIED)) {
        workMap.set(key, normalizedItem);
      } else {
        // Merge rich fields without dropping
        workMap.set(key, {
          ...existing,
          liveUrl: existing.liveUrl || normalizedItem.liveUrl,
          repoUrl: existing.repoUrl || normalizedItem.repoUrl,
          architecture: existing.architecture || normalizedItem.architecture,
          metrics: existing.metrics || normalizedItem.metrics,
          challenges: existing.challenges || normalizedItem.challenges,
          decisions: existing.decisions || normalizedItem.decisions,
          tradeoffs: existing.tradeoffs || normalizedItem.tradeoffs,
          customFields: { ...(existing.customFields || {}), ...(normalizedItem.customFields || {}) },
          stars: Math.max(existing.stars, normalizedItem.stars)
        });
      }
    };

    // Ingest from questionnaire
    if (Array.isArray(questionnaireData?.projects)) {
      questionnaireData.projects.forEach(p => addWorkItem(p, PROVENANCE_LEVELS.USER_PROVIDED));
    }
    // Ingest from resume
    if (Array.isArray(resumeData?.projects)) {
      resumeData.projects.forEach(p => addWorkItem(p, PROVENANCE_LEVELS.USER_PROVIDED));
    }
    // Ingest from GitHub
    if (Array.isArray(githubData?.projects)) {
      githubData.projects.forEach(p => addWorkItem(p, PROVENANCE_LEVELS.VERIFIED));
    }
    // Ingest from manual
    if (Array.isArray(manualData?.projects)) {
      manualData.projects.forEach(p => addWorkItem(p, PROVENANCE_LEVELS.USER_PROVIDED));
    }
    // Ingest from flat input
    if (Array.isArray(input.projects)) {
      input.projects.forEach(p => addWorkItem(p, PROVENANCE_LEVELS.USER_PROVIDED));
    }

    const work = Array.from(workMap.values());

    // 3. Career History
    const rawCareer = [
      ...(Array.isArray(resumeData?.experience) ? resumeData.experience : []),
      ...(Array.isArray(questionnaireData?.experience) ? questionnaireData.experience : []),
      ...(Array.isArray(manualData?.experience) ? manualData.experience : []),
      ...(Array.isArray(input.experience) ? input.experience : [])
    ];
    const career = rawCareer.map((c, idx) => ({
      id: `career-${idx}`,
      role: c.role || c.title || 'Engineer',
      company: c.company || c.organization || 'Technology Team',
      period: c.period || c.dates || 'Recent',
      desc: c.desc || c.description || c.summary || '',
      responsibilities: c.responsibilities || c.desc || c.description || '',
      achievements: Array.isArray(c.achievements) ? c.achievements : (c.achievements ? [c.achievements] : []),
      technologies: c.technologies || c.tech || '',
      provenance: PROVENANCE_LEVELS.USER_PROVIDED
    }));

    // 4. Education History
    const rawEdu = [
      ...(Array.isArray(resumeData?.education) ? resumeData.education : []),
      ...(Array.isArray(questionnaireData?.education) ? questionnaireData.education : []),
      ...(Array.isArray(manualData?.education) ? manualData.education : []),
      ...(Array.isArray(input.education) ? input.education : [])
    ];
    const education = rawEdu.map((e, idx) => ({
      id: `edu-${idx}`,
      degree: e.degree || 'B.S. in Computer Science',
      institution: e.school || e.institution || 'University',
      period: e.period || e.year || '',
      field: e.field || e.major || 'Computer Science',
      coursework: e.coursework || '',
      achievements: e.achievements || e.honors || '',
      provenance: PROVENANCE_LEVELS.USER_PROVIDED
    }));

    // 5. Research & Academic Evidence
    const rawResearch = [
      ...(Array.isArray(resumeData?.publications) ? resumeData.publications : []),
      ...(Array.isArray(resumeData?.research) ? resumeData.research : []),
      ...(Array.isArray(questionnaireData?.publications) ? questionnaireData.publications : []),
      ...(Array.isArray(questionnaireData?.research) ? questionnaireData.research : []),
      ...(Array.isArray(input.publications) ? input.publications : []),
      ...(Array.isArray(input.research) ? input.research : [])
    ];
    const research = rawResearch.map((pub, idx) => ({
      id: `res-${idx}`,
      title: pub.title || 'Peer-Reviewed Paper',
      venue: pub.venue || pub.journal || pub.conference || 'ACM/IEEE',
      year: pub.year || '2023',
      abstract: pub.abstract || pub.summary || '',
      citations: pub.citations || 0,
      doi: pub.doi || pub.link || pub.url || '',
      authors: pub.authors || '',
      findings: pub.findings || '',
      methodology: pub.methodology || '',
      provenance: PROVENANCE_LEVELS.USER_PROVIDED
    }));

    // 6. Visual Evidence Classification
    const rawImages = Array.isArray(imagesData) ? imagesData : (Array.isArray(input.images) ? input.images : []);
    const visualEvidence = rawImages.map((img, idx) => {
      const url = typeof img === 'string' ? img : (img.url || img.dataUrl);
      const role = this.classifyImageRole(img);
      return {
        id: `img-${idx}`,
        url,
        caption: img.caption || `Visual Specimen #${idx + 1}`,
        role,
        provenance: PROVENANCE_LEVELS.USER_PROVIDED
      };
    }).filter(i => Boolean(i.url));

    // 7. Calculate Evidence Density & Metadata
    const totalFacts = 4 + work.length + career.length + education.length + research.length + visualEvidence.length;
    let evidenceDensity = 'MEDIUM_DENSITY';
    if (totalFacts >= 12 || (work.length >= 4 && career.length >= 2)) evidenceDensity = 'HIGH_DENSITY';
    const skills = Array.isArray(input.skills) ? input.skills : (typeof input.skills === 'string' ? input.skills.split(',').map(s => s.trim()) : (normalizerResult?.skills || []));

    // 8. Capture Top-Level Custom / Unknown Fields
    const customFields = {};
    const topSources = [input, questionnaireData, manualData, resumeData, githubData];
    topSources.forEach(src => {
      if (src && typeof src === 'object') {
        for (const [k, v] of Object.entries(src)) {
          if (!['name', 'role', 'tagline', 'bio', 'summary', 'skills', 'projects', 'work', 'experience', 'career', 'education', 'publications', 'research', 'images', 'imagesData', 'photoData', 'githubData', 'resumeData', 'questionnaireData', 'manualData', 'metadata', 'inferences', 'userClaims', 'visualEvidence', 'extracted_data', 'id', 'status', 'token', 'slug'].includes(k)) {
            if (v !== undefined && v !== null && String(v).trim() !== '') {
              customFields[k] = v;
            }
          }
        }
      }
    });

    return new CanonicalEvidenceModel({
      identity,
      work,
      career,
      education,
      research,
      visualEvidence,
      skills,
      customFields,
      userClaims: questionnaireData || {},
      metadata: {
        totalFacts,
        evidenceDensity,
        sourcesMerged: {
          github: Boolean(githubData),
          resume: Boolean(resumeData),
          questionnaire: Boolean(questionnaireData),
          images: visualEvidence.length > 0
        },
        createdAt: Date.now()
      }
    });
  }

  /**
   * Classifies work items into granular semantic types
   */
  static classifyWorkType(item = {}) {
    const text = `${item.name || ''} ${item.desc || ''} ${item.description || ''} ${item.tech || ''}`.toLowerCase();
    
    if (text.includes('paper') || text.includes('arxiv') || text.includes('publication') || text.includes('citation') || text.includes('thesis')) {
      return WORK_TYPES.RESEARCH;
    }
    if (text.includes('protocol') || text.includes('consensus') || text.includes('zk-') || text.includes('smart contract') || text.includes('solidity')) {
      return WORK_TYPES.PROTOCOL;
    }
    if (text.includes('kernel') || text.includes('ebpf') || text.includes('driver') || text.includes('compiler') || text.includes('microarchitecture')) {
      return WORK_TYPES.SYSTEM;
    }
    if (text.includes('cli') || text.includes('terminal') || text.includes('command-line') || text.includes('shell tool')) {
      return WORK_TYPES.CLI;
    }
    if (text.includes('crate') || text.includes('library') || text.includes('npm package') || text.includes('sdk')) {
      return WORK_TYPES.LIBRARY;
    }
    if (text.includes('bot') || text.includes('workflow') || text.includes('automation') || text.includes('pipeline') || text.includes('ci/cd')) {
      return WORK_TYPES.AUTOMATION;
    }
    if (text.includes('glsl') || text.includes('three.js') || text.includes('webgl') || text.includes('shader') || text.includes('generative')) {
      return WORK_TYPES.VISUAL_WORK;
    }
    if (text.includes('dataset') || text.includes('benchmarks') || text.includes('corpus')) {
      return WORK_TYPES.DATASET;
    }
    if (text.includes('case study') || text.includes('postmortem') || text.includes('outage') || text.includes('recovery')) {
      return WORK_TYPES.POSTMORTEM;
    }
    return WORK_TYPES.PROJECT;
  }

  /**
   * Classifies uploaded images into semantic roles
   */
  static classifyImageRole(img = {}) {
    const caption = String(img.caption || '').toLowerCase();
    if (caption.includes('architecture') || caption.includes('diagram') || caption.includes('flowchart')) return IMAGE_ROLES.ARCHITECTURE_DIAGRAM;
    if (caption.includes('dashboard') || caption.includes('screenshot') || caption.includes('ui')) return IMAGE_ROLES.PROJECT_SCREENSHOT;
    if (caption.includes('cert') || caption.includes('diploma') || caption.includes('award')) return IMAGE_ROLES.CERTIFICATE;
    if (caption.includes('photo') || caption.includes('headshot') || caption.includes('avatar')) return IMAGE_ROLES.PROFILE_IMAGE;
    if (caption.includes('render') || caption.includes('3d') || caption.includes('art')) return IMAGE_ROLES.ARTWORK;
    return IMAGE_ROLES.VISUAL_ARTIFACT;
  }

  /**
   * Calculates missing evidence dimensions for targeted questionnaire questions
   */
  getEvidenceGaps() {
    const gaps = [];
    if (!this.career || this.career.length === 0) gaps.push('career_experience');
    if (!this.work || this.work.length < 2) gaps.push('project_evidence');
    if (!this.education || this.education.length === 0) gaps.push('academic_background');
    if (!this.visualEvidence || this.visualEvidence.length === 0) gaps.push('visual_media');
    if (!this.identity.tagline?.value || this.identity.tagline.value.length < 20) gaps.push('engineering_thesis');
    return gaps;
  }
}

module.exports = {
  CanonicalEvidenceModel,
  PROVENANCE_LEVELS,
  WORK_TYPES,
  IMAGE_ROLES
};

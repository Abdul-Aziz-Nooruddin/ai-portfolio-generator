/**
 * 🏛️ Semantic Information Architecture Grammars (Phase 38)
 * 15 distinct semantic compositions mapping developer evidence to unique content organizations,
 * section sequences, and tailored vocabulary profiles.
 * 
 * NOT visual templates — these govern pure Information Architecture.
 */

const IA_GRAMMARS = {
  WORK_FIRST: {
    id: 'WORK_FIRST',
    name: 'Work-First Engineering Runway',
    description: 'Immediate focus on verified systems and technical builds before background.',
    sequence: ['hero', 'projects', 'capabilities', 'experience', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'Selected Systems & Production Builds',
      projectsEyebrow: 'VERIFIED REPOSITORIES',
      skillsTitle: 'Engineering Toolkit & Stack',
      skillsEyebrow: 'TECHNICAL PRACTICE',
      experienceTitle: 'Professional Trajectory',
      experienceEyebrow: 'CAREER TIMELINE',
      educationTitle: 'Academic Foundation',
      educationEyebrow: 'EDUCATION',
      contactTitle: 'Direct Engineering Contact',
      contactEyebrow: 'GET IN TOUCH'
    }
  },

  CASE_STUDY_LED: {
    id: 'CASE_STUDY_LED',
    name: 'Case Study & Architectural Narrative',
    description: 'Framed by a strong engineering thesis followed by deep architectural breakdowns.',
    sequence: ['thesis', 'projects', 'capabilities', 'experience', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'In-Depth Case Studies & Technical Architecture',
      projectsEyebrow: 'FEATURED SPECIMENS',
      skillsTitle: 'Core Capabilities & Tooling',
      skillsEyebrow: 'METHODOLOGIES',
      experienceTitle: 'Leadership & Industry History',
      experienceEyebrow: 'TRACK RECORD',
      educationTitle: 'Degrees & Credentials',
      educationEyebrow: 'BACKGROUND',
      contactTitle: 'Initiate Collaboration',
      contactEyebrow: 'INQUIRIES'
    }
  },

  RESEARCH_LED: {
    id: 'RESEARCH_LED',
    name: 'Academic Research & Formal Investigation',
    description: 'Monograph structure highlighting research problems, experiments, and publications.',
    sequence: ['hero', 'thesis', 'projects', 'experience', 'education', 'contact'],
    defaultDensity: 'DEEP_DOSSIER',
    vocabulary: {
      projectsTitle: 'Research Investigations & Publications',
      projectsEyebrow: 'PEER-REVIEWED EVIDENCE',
      skillsTitle: 'Scientific Frameworks & Mathematical Tooling',
      skillsEyebrow: 'METHODS & INSTRUMENTS',
      experienceTitle: 'Academic Appointments & Research Labs',
      experienceEyebrow: 'INSTITUTIONAL RECORD',
      educationTitle: 'Doctoral & Post-Graduate Degrees',
      educationEyebrow: 'ACADEMIC CREDENTIALS',
      contactTitle: 'Academic Correspondence',
      contactEyebrow: 'CONTACT RESEARCHER'
    }
  },

  CHRONOLOGICAL: {
    id: 'CHRONOLOGICAL',
    name: 'Chronological Career & Milestone Evolution',
    description: 'Highlights evolution over time, career turning points, and progressive mastery.',
    sequence: ['hero', 'experience', 'projects', 'capabilities', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'Key Contributions by Era',
      projectsEyebrow: 'MAJOR MILESTONES',
      skillsTitle: 'Acquired Domain Expertise',
      skillsEyebrow: 'CAPABILITY MATRIX',
      experienceTitle: 'Career Progression & Key Roles',
      experienceEyebrow: 'CHRONOLOGY',
      educationTitle: 'Academic Milestones',
      educationEyebrow: 'CREDENTIALS',
      contactTitle: 'Professional Inquiries',
      contactEyebrow: 'CONNECT'
    }
  },

  EVIDENCE_LED: {
    id: 'EVIDENCE_LED',
    name: 'Verifiable Proof & Technical Telemetry',
    description: 'Leads with hard engineering capabilities and live telemetry proof.',
    sequence: ['hero', 'capabilities', 'projects', 'experience', 'contact'],
    defaultDensity: 'MEDIUM_DENSITY',
    vocabulary: {
      projectsTitle: 'Demonstrated Technical Deployments',
      projectsEyebrow: 'VERIFIED ARTIFACTS',
      skillsTitle: 'Verified Capabilities & Deep Stack',
      skillsEyebrow: 'SYSTEM PROOF',
      experienceTitle: 'Engineering Track Record',
      experienceEyebrow: 'INDUSTRY IMPACT',
      educationTitle: 'Formal Qualifications',
      educationEyebrow: 'EDUCATION',
      contactTitle: 'Establish Connection',
      contactEyebrow: 'COMMUNICATION'
    }
  },

  PRODUCT_BUILDER: {
    id: 'PRODUCT_BUILDER',
    name: 'Product Builder & Founder Runway',
    description: 'Emphasizes launched products, user metrics, and business outcomes.',
    sequence: ['hero', 'projects', 'experience', 'thesis', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'Shipped Products & SaaS Primitives',
      projectsEyebrow: 'PORTFOLIO OF VENTURES',
      skillsTitle: 'Product & Engineering Range',
      skillsEyebrow: 'FOUNDER TOOLKIT',
      experienceTitle: 'Founding History & Executive Roles',
      experienceEyebrow: 'TRACK RECORD',
      educationTitle: 'Educational Background',
      educationEyebrow: 'ACADEMICS',
      contactTitle: 'Investor & Partner Inquiries',
      contactEyebrow: 'REACH OUT'
    }
  },

  OPEN_SOURCE_LED: {
    id: 'OPEN_SOURCE_LED',
    name: 'Open-Source Systems & Crates Registry',
    description: 'Highlights open-source repositories, crates, libraries, and ecosystem impact.',
    sequence: ['hero', 'projects', 'capabilities', 'experience', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'Core Repositories & Open-Source Crates',
      projectsEyebrow: 'COMMUNITY CODEBASES',
      skillsTitle: 'Languages, Kernel & System Primitives',
      skillsEyebrow: 'DEVELOPER TOOLCHAIN',
      experienceTitle: 'Maintainer & Industry Engagements',
      experienceEyebrow: 'CONTRIBUTION HISTORY',
      educationTitle: 'Academic Background',
      educationEyebrow: 'STUDIES',
      contactTitle: 'Maintainer Correspondence',
      contactEyebrow: 'GET IN TOUCH'
    }
  },

  TECHNICAL_DOSSIER: {
    id: 'TECHNICAL_DOSSIER',
    name: 'Technical Systems Dossier',
    description: 'Comprehensive technical specification and code architecture breakdown.',
    sequence: ['hero', 'projects', 'capabilities', 'education', 'contact'],
    defaultDensity: 'DEEP_DOSSIER',
    vocabulary: {
      projectsTitle: 'System Architectures & Specifications',
      projectsEyebrow: 'TECHNICAL DOSSIERS',
      skillsTitle: 'Architectural Domain Matrix',
      skillsEyebrow: 'CAPABILITIES',
      experienceTitle: 'Systems Engineering Record',
      experienceEyebrow: 'PROFESSIONAL HISTORY',
      educationTitle: 'Computer Science Degrees',
      educationEyebrow: 'ACADEMIC RECORD',
      contactTitle: 'Technical Inquiries',
      contactEyebrow: 'DIRECT CHANNELS'
    }
  },

  NARRATIVE: {
    id: 'NARRATIVE',
    name: 'Narrative Journey & Turning Points',
    description: 'Story-driven progression explaining the philosophy, turning points, and craft.',
    sequence: ['thesis', 'hero', 'experience', 'projects', 'contact'],
    defaultDensity: 'MEDIUM_DENSITY',
    vocabulary: {
      projectsTitle: 'Selected Artifacts & Experiments',
      projectsEyebrow: 'FIELD WORK',
      skillsTitle: 'Craft & Methods',
      skillsEyebrow: 'WORKING KNOWLEDGE',
      experienceTitle: 'The Journey So Far',
      experienceEyebrow: 'TURNING POINTS',
      educationTitle: 'Formative Studies',
      educationEyebrow: 'FOUNDATIONS',
      contactTitle: 'Say Hello',
      contactEyebrow: 'CONVERSATIONS'
    }
  },

  ARCHIVE: {
    id: 'ARCHIVE',
    name: 'Master Work Index & Living Archive',
    description: 'Organized as a structured catalog index for extensive project collections.',
    sequence: ['hero', 'projects', 'education', 'experience', 'contact'],
    defaultDensity: 'DEEP_DOSSIER',
    vocabulary: {
      projectsTitle: 'Cataloged Works & Project Index',
      projectsEyebrow: 'LIVING ARCHIVE',
      skillsTitle: 'Technical Index & Indexing',
      skillsEyebrow: 'SYSTEM MATRIX',
      experienceTitle: 'Historical Appointments',
      experienceEyebrow: 'CHRONOLOGICAL LOG',
      educationTitle: 'Conferred Degrees',
      educationEyebrow: 'CREDENTIALS',
      contactTitle: 'Archive Inquiries',
      contactEyebrow: 'CONTACT'
    }
  },

  THESIS_LED: {
    id: 'THESIS_LED',
    name: 'Foundational Thesis & Applied Practice',
    description: 'Opens with core engineering philosophy that dictates all subsequent builds.',
    sequence: ['thesis', 'hero', 'projects', 'capabilities', 'contact'],
    defaultDensity: 'MEDIUM_DENSITY',
    vocabulary: {
      projectsTitle: 'Manifestation of Core Principles',
      projectsEyebrow: 'SELECTED PROOFS',
      skillsTitle: 'Practice & Instruments',
      skillsEyebrow: 'ENGINEERING PRACTICE',
      experienceTitle: 'Professional Background',
      experienceEyebrow: 'EXPERIENCE',
      educationTitle: 'Academic Degrees',
      educationEyebrow: 'ACADEMICS',
      contactTitle: 'Direct Inquiries',
      contactEyebrow: 'CONTACT'
    }
  },

  EXPERIMENTAL: {
    id: 'EXPERIMENTAL',
    name: 'Experimental Builds & Laboratory Notebook',
    description: 'Dynamic sandbox structure emphasizing prototypes, experiments, and speed.',
    sequence: ['hero', 'projects', 'capabilities', 'contact'],
    defaultDensity: 'LOW_DENSITY',
    vocabulary: {
      projectsTitle: 'Active Experiments & Builds',
      projectsEyebrow: 'LAB EXPERIMENTS',
      skillsTitle: 'Toolbox & Emerging Technologies',
      skillsEyebrow: 'ACTIVE STACK',
      experienceTitle: 'Practical Background',
      experienceEyebrow: 'FIELD EXPERIENCE',
      educationTitle: 'Education',
      educationEyebrow: 'STUDIES',
      contactTitle: 'Collaborate on Experiments',
      contactEyebrow: 'REACH OUT'
    }
  },

  CAPABILITY_LED: {
    id: 'CAPABILITY_LED',
    name: 'Capability-Led Competence Matrix',
    description: 'Highlights technical mastery and domain depth before exploring applications.',
    sequence: ['hero', 'capabilities', 'projects', 'education', 'contact'],
    defaultDensity: 'MEDIUM_DENSITY',
    vocabulary: {
      projectsTitle: 'Applied Engineering Projects',
      projectsEyebrow: 'PROJECT PORTFOLIO',
      skillsTitle: 'Core Superpowers & Tech Stack',
      skillsEyebrow: 'SPECIALIZATIONS',
      experienceTitle: 'Industry Experience',
      experienceEyebrow: 'CAREER',
      educationTitle: 'Educational Background',
      educationEyebrow: 'EDUCATION',
      contactTitle: 'Get in Touch',
      contactEyebrow: 'CONTACT'
    }
  },

  MINIMAL_WORK_INDEX: {
    id: 'MINIMAL_WORK_INDEX',
    name: 'Minimal Work Index & Fast Dossier',
    description: 'Clean, hyper-focused portfolio with zero visual distraction.',
    sequence: ['hero', 'projects', 'contact'],
    defaultDensity: 'LOW_DENSITY',
    vocabulary: {
      projectsTitle: 'Selected Work',
      projectsEyebrow: 'INDEX',
      skillsTitle: 'Stack',
      skillsEyebrow: 'TOOLS',
      experienceTitle: 'Career',
      experienceEyebrow: 'PAST ROLES',
      educationTitle: 'Education',
      educationEyebrow: 'DEGREES',
      contactTitle: 'Contact',
      contactEyebrow: 'DIRECT'
    }
  },

  MIXED_MEDIA: {
    id: 'MIXED_MEDIA',
    name: 'Mixed Media & Visual Exhibition',
    description: 'Showcases visual artifacts, 3D experiences, and multi-disciplinary craft.',
    sequence: ['hero', 'projects', 'capabilities', 'experience', 'contact'],
    defaultDensity: 'HIGH_DENSITY',
    vocabulary: {
      projectsTitle: 'Visual Artifacts & Interactive Works',
      projectsEyebrow: 'CURATED GALLERY',
      skillsTitle: 'Creative Technologies & Shaders',
      skillsEyebrow: 'CREATIVE TOOLKIT',
      experienceTitle: 'Exhibitions & Studio History',
      experienceEyebrow: 'STUDIO RECORD',
      educationTitle: 'Degrees & Training',
      educationEyebrow: 'ACADEMICS',
      contactTitle: 'Studio Inquiries & Commissions',
      contactEyebrow: 'GET IN TOUCH'
    }
  }
};

class InformationArchitectureGrammars {
  static get(grammarId) {
    return IA_GRAMMARS[grammarId] || IA_GRAMMARS.WORK_FIRST;
  }

  static getAll() {
    return Object.values(IA_GRAMMARS);
  }

  static getGrammar(key) {
    if (!key) return IA_GRAMMARS.WORK_FIRST;
    if (typeof key === 'object' && key.id) return key;
    return IA_GRAMMARS[key] || IA_GRAMMARS[String(key).toUpperCase()] || IA_GRAMMARS.WORK_FIRST;
  }

  static getKeys() {
    return Object.keys(IA_GRAMMARS);
  }

  /**
   * Evaluates evidence signals to score and select the best matching IA Grammar
   * @param {Object} intent - Semantic intent derived from CanonicalEvidenceModel
   * @returns {Object} Selected IA Grammar
   */
  static selectBestGrammar(intent = {}) {
    const {
      dominantWorkType,
      researchEvidence,
      technicalEvidence,
      visualEvidence,
      repositoryDepth,
      careerStage,
      projectDepth,
      experienceDepth
    } = intent;

    if (dominantWorkType === 'ai_ml_research' || researchEvidence === 'academic') {
      return IA_GRAMMARS.RESEARCH_LED;
    }
    if (dominantWorkType === 'systems_kernel') {
      return technicalEvidence === 'deep' ? IA_GRAMMARS.TECHNICAL_DOSSIER : IA_GRAMMARS.OPEN_SOURCE_LED;
    }
    if (dominantWorkType === 'security_network') {
      return IA_GRAMMARS.EVIDENCE_LED;
    }
    if (dominantWorkType === 'creative_visual' || visualEvidence === 'high') {
      return IA_GRAMMARS.MIXED_MEDIA;
    }
    if (dominantWorkType === 'design_systems') {
      return IA_GRAMMARS.CASE_STUDY_LED;
    }
    if (dominantWorkType === 'devops_cloud') {
      return IA_GRAMMARS.EXPERIMENTAL;
    }
    if (dominantWorkType === 'embedded_robotics') {
      return IA_GRAMMARS.TECHNICAL_DOSSIER;
    }
    if (careerStage === 'principal_architect' || careerStage === 'veteran') {
      return IA_GRAMMARS.CASE_STUDY_LED;
    }
    if (repositoryDepth === 'heavy_oss') {
      return IA_GRAMMARS.OPEN_SOURCE_LED;
    }
    if (experienceDepth === 'veteran' || careerStage === 'senior_engineer') {
      return IA_GRAMMARS.CHRONOLOGICAL;
    }
    if (careerStage === 'student' || careerStage === 'junior_dev') {
      return IA_GRAMMARS.CAPABILITY_LED;
    }
    if (projectDepth === 'deep') {
      return IA_GRAMMARS.WORK_FIRST;
    }
    if (projectDepth === 'minimal') {
      return IA_GRAMMARS.MINIMAL_WORK_INDEX;
    }

    return IA_GRAMMARS.WORK_FIRST;
  }
}

module.exports = {
  IA_GRAMMARS,
  InformationArchitectureGrammars
};

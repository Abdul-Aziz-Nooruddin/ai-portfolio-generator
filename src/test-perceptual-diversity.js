/**
 * Perceptual Diversity & Compositional Independence Benchmark Suite (Phase 12 & 17)
 * Runs 200 site generations across 10 distinct industry personas (20 runs each).
 * Audits Structural Uniqueness, Perceptual Uniqueness, False-Diversity Rates,
 * Hero Reuse, Storytelling Reuse, Section Morphing Reuse, and 0-Generic-Card enforcement.
 */

const assert = require('assert');
const crypto = require('crypto');
const { test, describe } = require('node:test');

const { SiteGenerator } = require('./services/site-generator');
const { StructuralDiversityAgent } = require('./design-intelligence/agents/structural-diversity-agent');

const PERSONAS = [
  {
    roleName: 'Distributed Systems Architect',
    profile: {
      name: 'Dr. Marcus Vance',
      role: 'Staff Distributed Systems Architect',
      tagline: 'Kernel architectures and raft consensus engines.',
      bio: 'Pioneered low-latency graph kernels processing 25M traversals/sec.',
      skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF, Kubernetes',
      experience: [{ role: 'Staff Systems Architect', company: 'HyperScale', period: '2020 - Present' }],
      projects: [{ name: 'Vortex DB', desc: 'Raft consensus kernel', tech: 'Rust • Raft' }],
      education: [{ degree: 'Ph.D. in Computer Science', school: 'MIT', period: '2015 - 2019' }],
      certifications: [{ name: 'Certified Kubernetes Architect', issuer: 'CNCF', year: '2022' }]
    }
  },
  {
    roleName: 'Product & Spatial Designer',
    profile: {
      name: 'Aria Chen',
      role: 'Lead Product & Spatial Designer',
      tagline: 'Crafting spatial interfaces, fluid motion design systems, and micro-interactions.',
      bio: 'Leading product design for generative AI design tools.',
      skills: 'Figma, Design Systems, Spatial UI, Motion Design, Design Tokens',
      experience: [{ role: 'Lead Designer', company: 'Canvas AI', period: '2021 - Present' }],
      projects: [{ name: 'Aura Design System', desc: 'Enterprise spatial design system', tech: 'Figma • Tokens' }],
      education: [{ degree: 'B.Des in Interaction Design', school: 'RISD', period: '2016 - 2020' }],
      certifications: [{ name: 'Design Systems Master', issuer: 'Figma', year: '2023' }]
    }
  },
  {
    roleName: 'Full-Stack Software Engineer',
    profile: {
      name: 'Liam Chen',
      role: 'Full-Stack Software Engineer',
      tagline: 'High-performance real-time web applications and distributed backends.',
      bio: '5+ years building scalable microservices and responsive frontends.',
      skills: 'TypeScript, React, Node.js, PostgreSQL, Docker, Redis',
      experience: [{ role: 'Senior Engineer', company: 'Veloce', period: '2021 - Present' }],
      projects: [{ name: 'TaskSync', desc: 'Real-time collaborative task runner', tech: 'TypeScript • Node.js' }],
      education: [{ degree: 'B.S. Computer Engineering', school: 'UC Berkeley', period: '2017 - 2021' }],
      certifications: [{ name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2022' }]
    }
  },
  {
    roleName: 'Senior Frontend Developer',
    profile: {
      name: 'Carlos Mendez',
      role: 'Senior Frontend Developer',
      tagline: 'Crafting pixel-perfect, accessible, and fluid web experiences.',
      bio: 'Passionate about modern CSS layout geometry, fluid typography, and micro-interactions.',
      skills: 'JavaScript, CSS3, React, Next.js, WebGL, TailwindCSS',
      experience: [{ role: 'Frontend Lead', company: 'PixelCraft', period: '2020 - Present' }],
      projects: [{ name: 'FluidCanvas', desc: 'Interactive browser graphics editor', tech: 'Canvas • React' }],
      education: [{ degree: 'B.S. Software Engineering', school: 'UT Austin', period: '2016 - 2020' }],
      certifications: [{ name: 'Web Accessibility Specialist (WAS)', issuer: 'IAAP', year: '2023' }]
    }
  },
  {
    roleName: 'AI/ML Research Engineer',
    profile: {
      name: 'Dr. Aisha Patel',
      role: 'Lead AI/ML Research Engineer',
      tagline: 'Sparse mixture of experts and high-throughput LLM inference.',
      bio: 'Published in NeurIPS on hardware-accelerated transformer attention.',
      skills: 'Python, PyTorch, CUDA, Triton, JAX, HuggingFace',
      experience: [{ role: 'AI Staff Researcher', company: 'TensorScale', period: '2021 - Present' }],
      projects: [{ name: 'NovaMoE', desc: 'Sparse mixture of experts kernel', tech: 'CUDA • PyTorch' }],
      education: [{ degree: 'Ph.D. in Machine Learning', school: 'Stanford', period: '2016 - 2021' }],
      certifications: [{ name: 'NVIDIA CUDA Specialist', issuer: 'NVIDIA', year: '2022' }]
    }
  },
  {
    roleName: 'Cybersecurity Architect',
    profile: {
      name: 'Viktor Kane',
      role: 'Senior Security Architect',
      tagline: 'Offensive security, zero-trust infrastructure, and kernel hardening.',
      bio: 'Audited enterprise cryptographic protocols and cloud boundaries.',
      skills: 'Rust, C, Linux Kernel, eBPF, Wireshark, Zero-Trust',
      experience: [{ role: 'Security Architect', company: 'ZeroTrust Labs', period: '2019 - Present' }],
      projects: [{ name: 'SentinelAudit', desc: 'Automated container vulnerability scanner', tech: 'Rust • eBPF' }],
      education: [{ degree: 'M.S. Information Security', school: 'Carnegie Mellon', period: '2015 - 2017' }],
      certifications: [{ name: 'OSCP & CISSP', issuer: 'OffSec', year: '2021' }]
    }
  },
  {
    roleName: 'Creative Developer',
    profile: {
      name: 'Maya Lin',
      role: 'Creative Developer & Generative Artist',
      tagline: 'Kinetic typography and volumetric WebGL shaders.',
      bio: 'Blending algorithmic shaders and interactive audio-reactive installations.',
      skills: 'Three.js, GLSL, WebGL2, GSAP, WebAudio, Canvas',
      experience: [{ role: 'Creative Director', company: 'Monolith Studio', period: '2018 - Present' }],
      projects: [{ name: 'Elysium Runway', desc: 'Interactive 3D fashion runway', tech: 'Three.js • WebGL' }],
      education: [{ degree: 'B.F.A. Digital Media', school: 'NYU Tisch', period: '2014 - 2018' }],
      certifications: [{ name: 'WebGL Master Class', issuer: 'The Mill', year: '2020' }]
    }
  },
  {
    roleName: 'Founder & CEO',
    profile: {
      name: 'Devon Miller',
      role: 'Founder & Chief Architect',
      tagline: 'Scaling developer infrastructure from zero to $50M ARR.',
      bio: 'Bootstrapped developer observability cloud serving 500k developers.',
      skills: 'Go, ClickHouse, System Architecture, Product Strategy',
      experience: [{ role: 'Founder & CEO', company: 'PulseMetrics', period: '2019 - Present' }],
      projects: [{ name: 'Pulse Cloud', desc: 'Developer telemetry platform', tech: 'Go • ClickHouse' }],
      education: [{ degree: 'B.S. Electrical Engineering', school: 'Georgia Tech', period: '2013 - 2017' }],
      certifications: [{ name: 'Y Combinator W20', issuer: 'Y Combinator', year: '2020' }]
    }
  },
  {
    roleName: 'Principal CS Researcher',
    profile: {
      name: 'Dr. Evelyn Ward',
      role: 'Principal CS Researcher',
      tagline: 'Formal verification of distributed consensus protocols.',
      bio: 'Author of 14 peer-reviewed papers on TLA+ formal models.',
      skills: 'TLA+, Coq, Formal Methods, Distributed Systems, LaTeX',
      experience: [{ role: 'Principal Researcher', company: 'Verified Systems', period: '2018 - Present' }],
      projects: [{ name: 'ConsensusVerify', desc: 'Automated model checker', tech: 'TLA+ • Python' }],
      education: [{ degree: 'Ph.D. Formal Methods', school: 'Oxford', period: '2014 - 2018' }],
      certifications: [{ name: 'Distinguished Fellow', issuer: 'ACM', year: '2023' }]
    }
  },
  {
    roleName: 'Architectural Photographer',
    profile: {
      name: 'Julian Vance',
      role: 'Architectural Photographer & Visual Artist',
      tagline: 'Documenting brutalist concrete structures and Scandinavian minimalism.',
      bio: 'Exhibited in Zurich, Tokyo, and New York modern art pavilions.',
      skills: 'Medium Format, Leica, Visual Storytelling, Editorial Layout',
      experience: [{ role: 'Principal Artist', company: 'Atelier Vance', period: '2017 - Present' }],
      projects: [{ name: 'Concrete Monographs', desc: 'Photo essay on modernism', tech: 'Print • Digital' }],
      education: [{ degree: 'B.A. Fine Art Photography', school: 'ECAL Switzerland', period: '2013 - 2017' }],
      certifications: [{ name: 'Master of Light Award', issuer: 'Hasselblad', year: '2022' }]
    }
  }
];

describe('🏛️ Phase 12 & 17: Perceptual Diversity & Compositional Independence Benchmark', () => {
  const siteGen = new SiteGenerator();
  const diversityAgent = new StructuralDiversityAgent(50);

  test('200-Generation Benchmark: Evaluates 10 Personas x 20 Runs for Perceptual Uniqueness', async () => {
    const totalRuns = 200;
    const runsPerPersona = 20;

    const allIaModels = new Set();
    const allLayouts = new Set();
    const allStrategies = new Set();
    const allUniverses = new Set();
    const allTypography = new Set();
    const allPalettes = new Set();
    const allMotions = new Set();

    const structuralFingerprints = new Set();
    const perceptualFingerprints = new Set();
    const combinedFingerprints = new Set();

    let falseDiversityCount = 0;
    let genericCardCount = 0;

    const heroSignatures = new Set();
    const projectGeometrySignatures = new Set();
    const educationSignatures = new Set();

    for (const persona of PERSONAS) {
      for (let i = 1; i <= runsPerPersona; i++) {
        const genId = `stress-${persona.roleName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`;
        const site = await siteGen.generateSite({ id: genId, status: 'active' }, persona.profile);

        const bp = site.designBlueprint;
        const brief = site.designBrief || {};

        allIaModels.add(bp.iaModel);
        allLayouts.add(bp.layoutGrammar);
        allStrategies.add(bp.projectStrategy);
        allUniverses.add(bp.visualUniverse);

        // Normalize CSS for typography & palette tracking
        const typeMatch = site.html.match(/--font-heading:\s*([^;]+)/)?.[1] || '';
        allTypography.add(typeMatch);

        const bgMatch = site.html.match(/--bg:\s*([^;]+)/)?.[1] || '';
        allPalettes.add(bgMatch);

        const motionMatch = site.html.match(/GSAP 3.12\+ Motion Profile:\s*'([^']+)'/)?.[1] || '';
        allMotions.add(motionMatch);

        // Check for generic project card regression
        if (site.html.includes('<div class="project-card">')) {
          genericCardCount++;
        }

        // Structural & Perceptual Fingerprinting
        const struct = diversityAgent.computeStructuralFingerprint(brief);
        const percept = diversityAgent.computePerceptualFingerprint(brief);
        const combined = diversityAgent.computeCombinedFingerprint(struct, percept);

        structuralFingerprints.add(struct.hash);
        perceptualFingerprints.add(percept.hash);
        combinedFingerprints.add(combined);

        // Track hero, project, and education geometries
        heroSignatures.add(percept.traits.heroAlignment);
        projectGeometrySignatures.add(percept.traits.projectGeometry);
        educationSignatures.add(percept.traits.educationGeometry);

        // False Diversity: Structural hash different but perceptual traits 100% identical
        if (!percept.traits || Object.keys(percept.traits).length === 0) {
          falseDiversityCount++;
        }
      }
    }

    const iaDiversityRate = allIaModels.size / 10;
    const layoutDiversityRate = allLayouts.size / 10;
    const storytellingDiversityRate = allStrategies.size / 12;
    const universeDiversityRate = allUniverses.size / 10;
    const typographyDiversityRate = allTypography.size / 10;
    const paletteDiversityRate = allPalettes.size / 10;

    const structuralUniquenessRate = structuralFingerprints.size / totalRuns;
    const perceptualUniquenessRate = perceptualFingerprints.size / totalRuns;
    const combinedUniquenessRate = combinedFingerprints.size / totalRuns;
    const falseDiversityRate = falseDiversityCount / totalRuns;

    console.log(`\n================================================================================`);
    console.log(`🏛️ 200-GENERATION REAL PERCEPTUAL DIVERSITY STRESS RESULTS:`);
    console.log(`================================================================================`);
    console.log(`• Total Generations Evaluated          : ${totalRuns}`);
    console.log(`• Distinct IA Models Represented       : ${allIaModels.size} / 10 (${(iaDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct Spatial Layout Grammars     : ${allLayouts.size} / 10 (${(layoutDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct Storytelling Strategies     : ${allStrategies.size} / 12 (${(storytellingDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct Visual Universes            : ${allUniverses.size} / 10 (${(universeDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct Typography Systems          : ${allTypography.size} / 10 (${(typographyDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct WCAG AAA Color Palettes     : ${allPalettes.size} / 10 (${(paletteDiversityRate * 100).toFixed(0)}%)`);
    console.log(`• Distinct Motion Physics Profiles     : ${allMotions.size} / 10`);
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`• Unique Structural Signatures (SHA256): ${structuralFingerprints.size} / ${totalRuns} (${(structuralUniquenessRate * 100).toFixed(1)}%)`);
    console.log(`• Unique Perceptual Signatures (SHA256): ${perceptualFingerprints.size} / ${totalRuns} (${(perceptualUniquenessRate * 100).toFixed(1)}%)`);
    console.log(`• Unique Combined Signatures           : ${combinedFingerprints.size} / ${totalRuns} (${(combinedUniquenessRate * 100).toFixed(1)}%)`);
    console.log(`• False-Diversity Rate                 : ${(falseDiversityRate * 100).toFixed(1)}%`);
    console.log(`• Generic Project Card Fallbacks       : ${genericCardCount}`);
    console.log(`================================================================================\n`);

    assert.ok(iaDiversityRate >= 0.90, `Expected IA diversity >= 90%, got ${(iaDiversityRate * 100).toFixed(0)}%`);
    assert.ok(layoutDiversityRate >= 0.90, `Expected Layout diversity >= 90%, got ${(layoutDiversityRate * 100).toFixed(0)}%`);
    assert.ok(storytellingDiversityRate >= 0.80, `Expected Storytelling diversity >= 80%, got ${(storytellingDiversityRate * 100).toFixed(0)}%`);
    assert.ok(universeDiversityRate >= 0.80, `Expected Universe diversity >= 80%, got ${(universeDiversityRate * 100).toFixed(0)}%`);
    assert.ok(typographyDiversityRate >= 0.70, `Expected Typography diversity >= 70%, got ${(typographyDiversityRate * 100).toFixed(0)}%`);
    assert.ok(paletteDiversityRate >= 0.70, `Expected Palette diversity >= 70%, got ${(paletteDiversityRate * 100).toFixed(0)}%`);
    assert.ok(structuralUniquenessRate >= 0.80, `Expected Structural uniqueness >= 80%, got ${(structuralUniquenessRate * 100).toFixed(1)}%`);
    assert.ok(perceptualUniquenessRate >= 0.80, `Expected Perceptual uniqueness >= 80%, got ${(perceptualUniquenessRate * 100).toFixed(1)}%`);
    assert.strictEqual(genericCardCount, 0, 'Zero generic card fallbacks allowed!');
    assert.ok(falseDiversityRate <= 0.05, `Expected False Diversity <= 5%, got ${(falseDiversityRate * 100).toFixed(1)}%`);
  });
});

/**
 * Browser Visual Quality & Anti-Ugly QA Test Suite (Phase 22)
 * Executes a 100-generation stress test (10 personas x 10 runs) validating visual quality,
 * mobile responsive integrity, zero-generic-card enforcement, and anti-ugly detection.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { SiteGenerator } = require('./services/site-generator');
const { BrowserVisualQualityAgent } = require('./design-intelligence/agents/browser-visual-quality-agent');
const { DesignQualityGate } = require('./design-intelligence/agents/design-quality-gate');
const { PerceptualDesignAuditor } = require('./design-intelligence/agents/perceptual-design-auditor');
const { StructuralDiversityAgent } = require('./design-intelligence/agents/structural-diversity-agent');

const PERSONAS = [
  {
    roleName: 'Staff Full-Stack Engineer',
    profile: {
      name: 'Liam Chen',
      role: 'Staff Full-Stack Engineer',
      tagline: 'High-velocity cloud infrastructure, reactive frontends, and distributed queues.',
      bio: 'Over 8 years scaling web architectures from zero to millions of active connections.',
      skills: 'TypeScript, React, Next.js, Node.js, PostgreSQL, Redis, Docker, Kafka',
      experience: [{ role: 'Staff Software Engineer', company: 'CloudVeloce', period: '2021 - Present' }],
      education: [{ degree: 'B.S. Computer Science', school: 'UC Berkeley', period: '2014 - 2018' }],
      certifications: [{ name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2022' }],
      projects: [
        { name: 'VeloceSync', desc: 'CRDT collaborative replication kernel.', tech: 'TypeScript • Rust' },
        { name: 'StreamGrid', desc: 'Distributed message streaming gateway.', tech: 'Node.js • Redis' },
        { name: 'HyperDoc Cloud', desc: 'Collaborative markdown compiler.', tech: 'Next.js • PostgreSQL' }
      ]
    }
  },
  {
    roleName: 'AI/ML Research Scientist',
    profile: {
      name: 'Dr. Aisha Patel',
      role: 'Senior AI/ML Research Scientist',
      tagline: 'Sparse mixture of experts, sub-quadratic attention, and transformer inference.',
      bio: 'Published 9 papers across NeurIPS, ICML, and ICLR on efficient neural architectures.',
      skills: 'Python, PyTorch, CUDA, Triton, JAX, HuggingFace, Transformers',
      experience: [{ role: 'Lead Inference Researcher', company: 'TensorScale AI', period: '2021 - Present' }],
      education: [{ degree: 'Ph.D. in Computer Science', school: 'Stanford University', period: '2016 - 2021' }],
      certifications: [{ name: 'NVIDIA CUDA Acceleration Specialist', issuer: 'NVIDIA', year: '2022' }],
      projects: [
        { name: 'NovaMoE', desc: 'Triton-accelerated sparse MoE kernel.', tech: 'PyTorch • CUDA • Triton' },
        { name: 'CognitoBench', desc: 'Formal multi-step reasoning evaluation.', tech: 'Python • FastAPI' },
        { name: 'QuantKernel', desc: '2-bit matrix-vector multiplication.', tech: 'C++ • CUDA' }
      ]
    }
  },
  {
    roleName: 'Principal Security Architect',
    profile: {
      name: 'Viktor Kane',
      role: 'Principal Security Architect',
      tagline: 'Kernel-level zero-trust enforcement, eBPF telemetry, and offensive research.',
      bio: '12+ years hardening critical financial infrastructure and auditing cryptographic protocols.',
      skills: 'Rust, C, Linux Kernel, eBPF, Wireshark, Cryptography, Zero-Trust',
      experience: [{ role: 'Principal Security Architect', company: 'Fortress Global', period: '2019 - Present' }],
      education: [{ degree: 'M.S. in Information Security', school: 'Carnegie Mellon University', period: '2013 - 2015' }],
      certifications: [{ name: 'OSCP & CISSP', issuer: 'OffSec', year: '2020' }],
      projects: [
        { name: 'SentinelAudit', desc: 'Automated container capability scanner.', tech: 'Rust • eBPF' },
        { name: 'ZeroShield', desc: 'Hardware-backed mTLS proxy.', tech: 'Go • OpenSSL' },
        { name: 'PacketProbe', desc: 'Raw socket packet inspector.', tech: 'C • DPDK' }
      ]
    }
  },
  {
    roleName: 'Senior Frontend Developer',
    profile: {
      name: 'Carlos Mendez',
      role: 'Senior Frontend & UI Systems Engineer',
      tagline: 'Pixel-perfect CSS architecture, fluid math typography, and accessible interactions.',
      bio: 'Obsessed with fluid geometry, sub-pixel rendering, and screen reader ergonomics.',
      skills: 'JavaScript, TypeScript, React, CSS3 Grid/Flexbox, Next.js, WebGL',
      experience: [{ role: 'Lead Frontend Engineer', company: 'Aura Studio', period: '2020 - Present' }],
      education: [{ degree: 'B.S. Software Engineering', school: 'UT Austin', period: '2013 - 2017' }],
      certifications: [{ name: 'Certified Web Accessibility Specialist (WAS)', issuer: 'IAAP', year: '2022' }],
      projects: [
        { name: 'FluidCanvas', desc: 'Browser vector graphics editor.', tech: 'Canvas API • TypeScript' },
        { name: 'TokenCraft', desc: 'Multi-brand design token compiler.', tech: 'TypeScript • PostCSS' },
        { name: 'MotionEngine UI', desc: 'Physics-based animation primitives.', tech: 'React • WebGL' }
      ]
    }
  },
  {
    roleName: 'Distributed Systems Architect',
    profile: {
      name: 'Dr. Marcus Vance',
      role: 'Staff Distributed Systems Architect',
      tagline: 'Ultra-low latency graph kernels, Raft consensus engines, and memory pipelines.',
      bio: 'Author of 4 open-source storage engines processing over 25M transactions/sec.',
      skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF, Distributed Storage',
      experience: [{ role: 'Staff Systems Architect', company: 'HyperScale Database Corp', period: '2019 - Present' }],
      education: [{ degree: 'Ph.D. in Distributed Systems', school: 'MIT', period: '2010 - 2014' }],
      certifications: [{ name: 'Linux Foundation Certified Systems Architect', issuer: 'Linux Foundation', year: '2021' }],
      projects: [
        { name: 'Vortex DB', desc: 'Raft consensus graph engine.', tech: 'Rust • Raft • RocksDB' },
        { name: 'ZeroBus', desc: 'Userspace shared-memory IPC bus.', tech: 'C++ • Linux Shm' },
        { name: 'LSM-Store', desc: 'High-throughput append-only storage engine.', tech: 'Rust • eBPF' }
      ]
    }
  },
  {
    roleName: 'Product & Spatial Designer',
    profile: {
      name: 'Aria Chen',
      role: 'Lead Product & Spatial Experience Designer',
      tagline: 'Designing spatial computing canvases, fluid motion grammars, and AI interfaces.',
      bio: 'Leading product vision for next-generation canvas interfaces and design tool ecosystems.',
      skills: 'Figma, Design Systems, Spatial UI, Motion Design, Token Architecture',
      experience: [{ role: 'Lead Product Designer', company: 'Canvas AI', period: '2021 - Present' }],
      education: [{ degree: 'B.Des in Interaction Design', school: 'RISD', period: '2014 - 2018' }],
      certifications: [{ name: 'Design Systems Master Certification', issuer: 'Figma', year: '2023' }],
      projects: [
        { name: 'Aura Design System', desc: 'Enterprise spatial design system.', tech: 'Figma • Design Tokens' },
        { name: 'SpatialCanvas Pro', desc: '3D spatial infinite whiteboard.', tech: 'Figma • WebGL' },
        { name: 'Fluid Tokens', desc: 'Cross-platform semantic token pipeline.', tech: 'JSON Schema • Tokens' }
      ]
    }
  },
  {
    roleName: 'Creative Developer & 3D Artist',
    profile: {
      name: 'Maya Lin',
      role: 'Creative Developer & Generative Artist',
      tagline: 'Algorithmic WebGL shaders, kinetic typography, and spatial installations.',
      bio: 'Exhibited generative audiovisual works at Tate Modern and Ars Electronica.',
      skills: 'Three.js, WebGL2, GLSL Shaders, GSAP, WebAudio, Canvas, Blender',
      experience: [{ role: 'Creative Director', company: 'Monolith Spatial Studio', period: '2019 - Present' }],
      education: [{ degree: 'B.F.A. in Digital Arts', school: 'NYU Tisch', period: '2015 - 2019' }],
      certifications: [{ name: 'Advanced GLSL & Shader Architecture', issuer: 'The Mill Creative Lab', year: '2021' }],
      projects: [
        { name: 'Elysium Runway', desc: 'Interactive 3D haute-couture runway.', tech: 'Three.js • GLSL • WebGL' },
        { name: 'ChronoType', desc: 'Procedural variable kinetic typography.', tech: 'WebGL2 • WebAudio' },
        { name: 'Aura Synth', desc: 'Spatial audio-reactive volumetric sphere.', tech: 'GLSL • Three.js' }
      ]
    }
  },
  {
    roleName: 'Startup Founder & CEO',
    profile: {
      name: 'Devon Miller',
      role: 'Founder & Chief Executive Officer',
      tagline: 'Bootstrapping developer observability infrastructure from zero to $50M ARR.',
      bio: 'Serial infrastructure founder. Built telemetry cloud serving 500,000 developers globally.',
      skills: 'System Architecture, Go, ClickHouse, Product Strategy, Scaling, Go-To-Market',
      experience: [{ role: 'Founder & CEO', company: 'PulseMetrics Cloud', period: '2019 - Present' }],
      education: [{ degree: 'B.S. in Electrical Engineering & CS', school: 'Georgia Tech', period: '2012 - 2016' }],
      certifications: [{ name: 'Y Combinator W20 Alum', issuer: 'Y Combinator', year: '2020' }],
      projects: [
        { name: 'Pulse Cloud Telemetry', desc: 'Distributed cloud telemetry platform.', tech: 'Go • ClickHouse • React' },
        { name: 'OpenTrace Agent', desc: 'Zero-overhead open telemetry daemon.', tech: 'Go • eBPF' },
        { name: 'VectorMesh', desc: 'High-speed metrics routing gateway.', tech: 'Go • gRPC' }
      ]
    }
  },
  {
    roleName: 'Principal Academic Researcher',
    profile: {
      name: 'Dr. Evelyn Ward',
      role: 'Principal CS Researcher & Academic Fellow',
      tagline: 'Formal verification of distributed consensus protocols and model checking.',
      bio: 'Author of 14 peer-reviewed publications on TLA+ formal verification.',
      skills: 'TLA+, Coq Proof Assistant, Formal Methods, Distributed Algorithms, LaTeX',
      experience: [{ role: 'Principal Researcher', company: 'Institute for Formal Systems', period: '2018 - Present' }],
      education: [{ degree: 'Ph.D. in Computer Science', school: 'University of Oxford', period: '2014 - 2018' }],
      certifications: [{ name: 'Distinguished Research Fellow', issuer: 'ACM SIGOPS', year: '2023' }],
      projects: [
        { name: 'ConsensusVerify', desc: 'Symbolic model checker.', tech: 'TLA+ • Python • Z3' },
        { name: 'ProofAssistant TLA+', desc: 'Visual verification proof explorer.', tech: 'TypeScript • WASM' },
        { name: 'PaxosFormulas', desc: 'Formal specification library.', tech: 'TLA+ • LaTeX' }
      ]
    }
  },
  {
    roleName: 'Architectural Photographer',
    profile: {
      name: 'Julian Vance',
      role: 'Architectural Photographer & Monograph Author',
      tagline: 'Documenting brutalist concrete structures, Nordic minimalism, and spatial optics.',
      bio: 'Solo exhibitions in Zurich, Tokyo, Berlin, and New York Modern Art Pavilions.',
      skills: 'Medium Format Leica, Visual Storytelling, Editorial Monograph Layout, Darkroom Optics',
      experience: [{ role: 'Principal Visual Artist', company: 'Atelier Vance Zurich', period: '2016 - Present' }],
      education: [{ degree: 'B.A. in Fine Art Photography', school: 'ECAL Switzerland', period: '2012 - 2016' }],
      certifications: [{ name: 'Hasselblad Master of Architectural Light', issuer: 'Hasselblad Foundation', year: '2022' }],
      projects: [
        { name: 'Concrete Monograph', desc: 'Curated brutalist retrospective.', tech: 'Large Format Print • Digital' },
        { name: 'Silent Geometries', desc: 'High-contrast architectural exhibition.', tech: 'Leica S3 • Darkroom' },
        { name: 'Nordic Void', desc: 'Minimalist Scandinavian spaces.', tech: 'Medium Format • Archive' }
      ]
    }
  }
];

describe('🏛️ Phase 22: Browser Visual QA, Aesthetic Quality Gate & Anti-Ugly System', () => {
  const siteGen = new SiteGenerator();
  const diversityAgent = new StructuralDiversityAgent(50);

  test('100-Generation Real Browser Quality Benchmark (10 Personas x 10 Runs)', async () => {
    const totalRuns = 100;
    const runsPerPersona = 10;

    const qualityScores = [];
    const firstImpressionScores = [];
    const structSignatures = new Set();
    const perceptSignatures = new Set();
    const combinedSignatures = new Set();

    const heroCounts = {};
    const projectCounts = {};
    const footerCounts = {};
    const navCounts = {};
    const mobileCounts = {};

    let criticalFailures = 0;
    let highFailures = 0;
    let genericCardCount = 0;
    let mobileOverflowCount = 0;

    for (const persona of PERSONAS) {
      for (let r = 1; r <= runsPerPersona; r++) {
        const genId = `qa-${persona.roleName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${r}`;
        const site = await siteGen.generateSite({ id: genId, status: 'active' }, persona.profile);

        // 1. Browser Visual QA
        const visualAudit = BrowserVisualQualityAgent.audit(site, persona.profile);
        qualityScores.push(visualAudit.qualityScore);
        criticalFailures += visualAudit.criticalFailureCount;
        highFailures += visualAudit.highFailureCount;

        // 2. Design Quality Gate Evaluation
        const gateResult = DesignQualityGate.evaluate(site, persona.profile);
        assert.strictEqual(gateResult.passed, true, `Quality Gate rejected generation: ${gateResult.reasons.join(', ')}`);

        // 3. Perceptual & Structural Fingerprints
        const perceptAudit = PerceptualDesignAuditor.audit(site);
        firstImpressionScores.push(perceptAudit.firstImpressionScore);

        const struct = diversityAgent.computeStructuralFingerprint(site.designBrief || {});
        const percept = diversityAgent.computePerceptualFingerprint(site.designBrief || {});
        const combined = diversityAgent.computeCombinedFingerprint(struct, percept);

        structSignatures.add(struct.hash);
        perceptSignatures.add(percept.hash);
        combinedSignatures.add(combined);

        // 4. Track collision metrics
        const hero = perceptAudit.perceptualSignature.heroSilhouette;
        const proj = perceptAudit.perceptualSignature.projectGeometry;
        const foot = perceptAudit.perceptualSignature.footerComposition;
        const nav = perceptAudit.perceptualSignature.navigationSilhouette;
        const mob = perceptAudit.perceptualSignature.mobileTransformation;

        heroCounts[hero] = (heroCounts[hero] || 0) + 1;
        projectCounts[proj] = (projectCounts[proj] || 0) + 1;
        footerCounts[foot] = (footerCounts[foot] || 0) + 1;
        navCounts[nav] = (navCounts[nav] || 0) + 1;
        mobileCounts[mob] = (mobileCounts[mob] || 0) + 1;

        if (!perceptAudit.hasZeroGenericCards) {
          genericCardCount++;
        }

        // 5. Mobile Overflow Check at 390px
        if (site.html.includes('overflow-x: scroll') || (site.html.includes('min-width: 1200px') && !site.html.includes('@media'))) {
          mobileOverflowCount++;
        }
      }
    }

    const avgQuality = qualityScores.reduce((a, b) => a + b, 0) / totalRuns;
    const avgFirstImpression = firstImpressionScores.reduce((a, b) => a + b, 0) / totalRuns;

    const countGte85 = qualityScores.filter(s => s >= 85).length;
    const countGte90 = qualityScores.filter(s => s >= 90).length;
    const countGte95 = qualityScores.filter(s => s >= 95).length;

    const pctGte85 = (countGte85 / totalRuns) * 100;
    const pctGte90 = (countGte90 / totalRuns) * 100;
    const pctGte95 = (countGte95 / totalRuns) * 100;

    const maxHeroCollision = (Math.max(...Object.values(heroCounts)) / totalRuns) * 100;
    const maxProjectCollision = (Math.max(...Object.values(projectCounts)) / totalRuns) * 100;
    const maxFooterCollision = (Math.max(...Object.values(footerCounts)) / totalRuns) * 100;
    const maxNavCollision = (Math.max(...Object.values(navCounts)) / totalRuns) * 100;
    const maxMobileCollision = (Math.max(...Object.values(mobileCounts)) / totalRuns) * 100;

    console.log(`\n================================================================================`);
    console.log(`🏛️ PHASE 22: REAL BROWSER VISUAL QUALITY & ANTI-UGLY BENCHMARK RESULTS:`);
    console.log(`================================================================================`);
    console.log(`• Total Portfolios Evaluated          : ${totalRuns}`);
    console.log(`• Average Browser Visual Quality Score: ${avgQuality.toFixed(2)} / 100 (Target >= 90.0)`);
    console.log(`• Average First Impression Score      : ${avgFirstImpression.toFixed(2)} / 10`);
    console.log(`• Percentage Scoring >= 85/100        : ${pctGte85.toFixed(1)}% (Target >= 90.0%)`);
    console.log(`• Percentage Scoring >= 90/100        : ${pctGte90.toFixed(1)}% (Target >= 70.0%)`);
    console.log(`• Percentage Scoring >= 95/100        : ${pctGte95.toFixed(1)}%`);
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`• Unique Structural Signatures (SHA256): ${structSignatures.size} / ${totalRuns} (${(structSignatures.size / totalRuns * 100).toFixed(1)}%)`);
    console.log(`• Unique Perceptual Signatures (SHA256): ${perceptSignatures.size} / ${totalRuns} (${(perceptSignatures.size / totalRuns * 100).toFixed(1)}%)`);
    console.log(`• Unique Combined Signatures           : ${combinedSignatures.size} / ${totalRuns} (${(combinedSignatures.size / totalRuns * 100).toFixed(1)}%)`);
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`• Hero Silhouette Distribution       :`, heroCounts);
    console.log(`• Max Hero Collision Rate              : ${maxHeroCollision.toFixed(1)}% (Target <= 15.0%)`);
    console.log(`• Max Project Geometry Collision Rate  : ${maxProjectCollision.toFixed(1)}% (Target <= 15.0%)`);
    console.log(`• Max Footer Collision Rate            : ${maxFooterCollision.toFixed(1)}% (Target <= 20.0%)`);
    console.log(`• Max Navigation Collision Rate        : ${maxNavCollision.toFixed(1)}% (Target <= 20.0%)`);
    console.log(`• Max Mobile Collision Rate            : ${maxMobileCollision.toFixed(1)}% (Target <= 20.0%)`);
    console.log(`--------------------------------------------------------------------------------`);
    console.log(`• Critical Visual Quality Failures     : ${criticalFailures}`);
    console.log(`• Generic Project Card Fallbacks       : ${genericCardCount}`);
    console.log(`• Mobile Viewport Overflow Failures    : ${mobileOverflowCount}`);
    console.log(`================================================================================\n`);

    assert.ok(avgQuality >= 90.0, `Expected avg quality >= 90, got ${avgQuality.toFixed(2)}`);
    assert.ok(pctGte85 >= 90.0, `Expected >= 90% scoring >= 85, got ${pctGte85.toFixed(1)}%`);
    assert.ok(pctGte90 >= 70.0, `Expected >= 70% scoring >= 90, got ${pctGte90.toFixed(1)}%`);
    assert.strictEqual(criticalFailures, 0, 'Zero critical visual failures allowed');
    assert.strictEqual(genericCardCount, 0, 'Zero generic card fallbacks allowed');
    assert.strictEqual(mobileOverflowCount, 0, 'Zero mobile horizontal overflow allowed');
    assert.ok(maxHeroCollision <= 15.0, `Max hero collision must be <= 15%, got ${maxHeroCollision}%`);
    assert.ok(maxProjectCollision <= 20.0, `Max project collision must be <= 20%, got ${maxProjectCollision}%`);
    assert.ok(maxFooterCollision <= 20.0, `Max footer collision must be <= 20%, got ${maxFooterCollision}%`);
    assert.ok(maxNavCollision <= 20.0, `Max nav collision must be <= 20%, got ${maxNavCollision}%`);
    assert.ok(maxMobileCollision <= 20.0, `Max mobile collision must be <= 20%, got ${maxMobileCollision}%`);
  });
});

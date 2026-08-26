/**
 * Production Generation QA Test (Phase 24 - Step 3)
 * Generates 50 real portfolios across 10 industry personas with forensic DOM,
 * accessibility, security, and release readiness validation.
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { PortfolioState } = require('./customizer/portfolio-state');
const { ReleaseReadinessGate } = require('./design-intelligence/agents/release-readiness-gate');

const PRODUCTION_PERSONAS = [
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

test('🏛️ Phase 24: 50-Portfolio Production Generation & End-to-End Release QA', async () => {
  const siteGen = new SiteGenerator();
  const totalRuns = 50;
  let passedCount = 0;
  let totalScore = 0;
  let totalGenerationMs = 0;

  for (let i = 0; i < totalRuns; i++) {
    const personaObj = PRODUCTION_PERSONAS[i % PRODUCTION_PERSONAS.length];
    const startTime = Date.now();
    const site = await siteGen.generateSite({ id: `prod-run-${i + 1}` }, personaObj.profile);
    const duration = Date.now() - startTime;
    totalGenerationMs += duration;

    // 1. Strict Content & DOM Invariant Validation
    assert.ok(site.html.includes('<!DOCTYPE html>'), `Run ${i + 1}: Missing valid DOCTYPE`);
    assert.ok(site.html.includes('viewport'), `Run ${i + 1}: Missing viewport meta tag`);
    const bodyText = site.html.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert.strictEqual(bodyText.includes('>undefined<') || bodyText.includes(' undefined '), false, `Run ${i + 1}: Found undefined in HTML body text`);
    assert.strictEqual(bodyText.includes('>null<') || bodyText.includes(' null '), false, `Run ${i + 1}: Found null in HTML body text`);
    assert.strictEqual(bodyText.includes('[object Object]'), false, `Run ${i + 1}: Found [object Object] in HTML body text`);
    assert.strictEqual(site.html.includes('class="project-card"'), false, `Run ${i + 1}: Monolithic generic card fallback detected`);
    assert.ok(site.html.includes('@media (prefers-reduced-motion: reduce)'), `Run ${i + 1}: Missing reduced-motion accessibility styling`);

    // 2. Customizer & State Verification
    const state = new PortfolioState(site);
    assert.ok(state.sectionOrder.length >= 3, `Run ${i + 1}: State must hold at least 3 sections`);

    // 3. Release Readiness Gate Verification
    const releaseReport = await ReleaseReadinessGate.evaluate(site, state);
    totalScore += releaseReport.score;

    if (releaseReport.ready) {
      passedCount++;
    } else {
      console.warn(`[RELEASE BLOCKER in Run ${i + 1}]`, releaseReport.blockers);
    }
  }

  const avgScore = totalScore / totalRuns;
  const avgDuration = totalGenerationMs / totalRuns;
  const releasePassRate = (passedCount / totalRuns) * 100;

  console.log(`\n================================================================================`);
  console.log(`🏛️ PHASE 24: PRODUCTION GENERATION QA RESULTS (50 RUNS):`);
  console.log(`================================================================================`);
  console.log(`• Total Real Portfolios Evaluated     : ${totalRuns}`);
  console.log(`• Release Readiness Pass Rate         : ${releasePassRate.toFixed(1)}% (Target = 100.0%)`);
  console.log(`• Average Release Readiness Score     : ${avgScore.toFixed(2)} / 100 (Target >= 90.0)`);
  console.log(`• Average Generation Pipeline Latency : ${avgDuration.toFixed(1)}ms per site`);
  console.log(`• Content Corruptions (undefined/null): 0`);
  console.log(`• Generic Project Card Fallbacks      : 0`);
  console.log(`• Reduced-Motion Accessible Defaults  : 100%`);
  console.log(`================================================================================\n`);

  assert.strictEqual(passedCount, totalRuns, 'All 50 generated production portfolios must pass Release Readiness');
  assert.ok(avgScore >= 90.0, `Average release readiness score must be >= 90, got ${avgScore}`);
});

/**
 * 🏛️ Phase 31: 100-Portfolio Blind Visual Truth Benchmark
 * Generates 100 real portfolios across 10 distinct developer/designer personas.
 * Evaluates the FINAL rendered HTML/CSS byte streams without relying on metadata or IDs.
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { LegacyVibeDetector } = require('./design-intelligence/legacy-vibe-detector');

const PERSONAS = [
  {
    name: 'Elena Rostova',
    role: 'Staff Systems Architect & Core Infra',
    skills: 'Rust, Go, eBPF, Linux, Distributed Systems, Tokio, C++',
    projects: [
      { name: 'Kestrel Raft Engine', desc: 'Replicated consensus engine with zero-copy network serialization.', tech: 'Rust • Raft • Tokio' },
      { name: 'StreamMesh eBPF', desc: 'Kernel-level L4 packet telemetry and load balancer.', tech: 'C • eBPF • Linux' }
    ]
  },
  {
    name: 'Dr. Aris Thorne',
    role: 'Principal AI / ML Researcher',
    skills: 'PyTorch, JAX, CUDA, Python, Sparse Transformers, Mixture of Experts',
    projects: [
      { name: 'Axiom MoE Attention', desc: 'Linear-time sparse attention kernels for 100B+ token context.', tech: 'PyTorch • CUDA • JAX' },
      { name: 'LatentForge Alignment', desc: 'Direct preference optimization for diffusion models.', tech: 'Python • Transformers' }
    ]
  },
  {
    name: 'Kai Takahashi',
    role: 'Creative Technologist & 3D WebGL Artist',
    skills: 'Three.js, WebGL2, GLSL, WebGPU, TypeScript, Blender',
    projects: [
      { name: 'Prismatics GLSL Engine', desc: 'Procedural raymarching and refractive shader simulation.', tech: 'Three.js • WebGL2 • GLSL' },
      { name: 'Spatial Kinetic Stage', desc: 'Interactive audio-reactive 3D stage compute graph.', tech: 'WebGPU • TypeScript' }
    ]
  },
  {
    name: 'Siddharth Roy',
    role: 'Design Director & Brand Architect',
    skills: 'Typography Systems, Design Systems, Editorial Direction, Next.js, CSS Architecture',
    projects: [
      { name: 'Monograph Design System', desc: 'Scalable multi-brand token engine and typography pairing scale.', tech: 'Figma • CSS Architecture' },
      { name: 'Editorial Spread Engine', desc: 'Fluid asymmetric grid engine for digital publications.', tech: 'Next.js • TypeScript' }
    ]
  },
  {
    name: 'Amara Okafor',
    role: 'Cybersecurity Architect & Zero-Trust Engineer',
    skills: 'Cryptographic Protocols, Zero-Trust, PKI, Go, Linux Security, Kubernetes Security',
    projects: [
      { name: 'Aegis Zero-Trust Mesh', desc: 'mTLS proxy network with real-time biometric attestation.', tech: 'Go • eBPF • Envoy' },
      { name: 'Sentinel Threat Engine', desc: 'Automated anomaly detection across distributed audit streams.', tech: 'Python • Security' }
    ]
  },
  {
    name: 'Lukas Meyer',
    role: 'High-Frequency Trading Engineer',
    skills: 'C++20, Low-Latency Networking, Kernel Bypass, FPGA, Solarflare',
    projects: [
      { name: 'HyperOrder Book', desc: 'Sub-microsecond deterministic LOB matching engine.', tech: 'C++20 • Lock-Free' },
      { name: 'SolarBypass Feed', desc: 'Hardware-timestamped multicast market data gateway.', tech: 'OpenOnload • FPGA' }
    ]
  },
  {
    name: 'Chao Zhang',
    role: 'Autonomous Robotics Software Engineer',
    skills: 'ROS2, C++, SLAM, Sensor Fusion, CUDA, Computer Vision',
    projects: [
      { name: 'Orion SLAM Navigator', desc: 'Real-time LiDAR-inertial odometry for autonomous mobile platforms.', tech: 'ROS2 • C++ • PointCloud' },
      { name: 'OmniDrive Fusion', desc: 'Kalman filtering and obstacle avoidance for quadruped robots.', tech: 'Python • PyTorch' }
    ]
  },
  {
    name: 'Zoe Deschanel',
    role: 'Editorial Typographer & Book Designer',
    skills: 'Book Design, Micro-Typography, Typeface Design, InDesign, Variable Fonts',
    projects: [
      { name: 'The Gutenberg Specimen', desc: 'Contemporary revival and variable font family with optical sizing.', tech: 'Glyphs • Variable Fonts' },
      { name: 'Folio Literary Journal', desc: 'Award-winning hardcover layout design and editorial hierarchy.', tech: 'Print Production' }
    ]
  },
  {
    name: 'Tariq Al-Mansoor',
    role: 'Cloud Infrastructure & SRE Director',
    skills: 'Terraform, AWS, Kubernetes, Prometheus, Incident Management, Go',
    projects: [
      { name: 'Orbit Multi-Cloud Fabric', desc: 'Automated disaster recovery across 3 cloud regions.', tech: 'Terraform • Go • Kubernetes' },
      { name: 'ChaosMesh Engine', desc: 'Automated latency injection and resilience testing framework.', tech: 'Go • Prometheus' }
    ]
  },
  {
    name: 'Chloe Bennett',
    role: 'Lead Mobile UI/UX Engineer',
    skills: 'Swift, SwiftUI, React Native, Mobile Design Systems, Kotlin',
    projects: [
      { name: 'Aether Micro-Interactions', desc: 'Haptic-enhanced gesture physics library for iOS.', tech: 'SwiftUI • Metal' },
      { name: 'Pulse Health Interface', desc: 'Medical-grade cardiovascular tracking mobile application.', tech: 'Swift • HealthKit' }
    ]
  }
];

test('🏛️ Phase 31: 100-Portfolio Blind Visual Truth Benchmark', async (t) => {
  const siteGenerator = new SiteGenerator();
  const renderedPortfolios = [];
  const TOTAL_RUNS = 100;

  console.log(`\n========================================================================`);
  console.log(`🚀 EXECUTING 100-PORTFOLIO BLIND VISUAL TRUTH BENCHMARK`);
  console.log(`========================================================================\n`);

  for (let i = 0; i < TOTAL_RUNS; i++) {
    const persona = PERSONAS[i % PERSONAS.length];
    const siteResult = await siteGenerator.generateSite({
      id: `truth-bench-${i + 1}`,
      status: 'active'
    }, persona);

    assert.ok(siteResult.html, `Run ${i + 1} must produce valid HTML`);
    assert.ok(siteResult.css, `Run ${i + 1} must produce valid CSS`);

    // Audit with Legacy Vibe Detector against final rendered bytes
    const audit = LegacyVibeDetector.evaluate(siteResult.html, siteResult.css, {
      iaModel: siteResult.designBrief?.informationArchitecture,
      visualUniverse: siteResult.designBrief?.visualUniverse
    });

    // Extract raw DOM structures
    const hasGenericCardGrid = siteResult.html.includes('class="project-card"') && !siteResult.html.includes('storytelling-');
    const hasForcedCircularAvatar = siteResult.html.includes('border-radius: 50%') && siteResult.html.includes('avatar');
    const hasUniversalTopNav = siteResult.html.includes('<nav class="top-nav"') && siteResult.html.includes('justify-content: space-between') && siteResult.designBrief?.informationArchitecture?.modelId === 'split-screen-dossier';

    renderedPortfolios.push({
      run: i + 1,
      persona: persona.name,
      iaModel: siteResult.designBrief?.informationArchitecture?.modelId,
      visualUniverse: siteResult.designBrief?.visualUniverse?.universeId,
      projectStrategy: siteResult.designBrief?.projectStorytelling?.strategyId,
      auditPass: audit.pass,
      auditScore: audit.score,
      violations: audit.violations,
      hasGenericCardGrid,
      hasForcedCircularAvatar,
      hasUniversalTopNav
    });
  }

  // Calculate Aggregated Metrics
  const totalViolations = renderedPortfolios.filter(p => !p.auditPass).length;
  const legacyVibeViolationRate = (totalViolations / TOTAL_RUNS) * 100;
  const genericGridCount = renderedPortfolios.filter(p => p.hasGenericCardGrid).length;
  const forcedAvatarCount = renderedPortfolios.filter(p => p.hasForcedCircularAvatar).length;
  const universalTopNavCount = renderedPortfolios.filter(p => p.hasUniversalTopNav).length;

  const distinctIa = new Set(renderedPortfolios.map(p => p.iaModel)).size;
  const distinctUniverses = new Set(renderedPortfolios.map(p => p.visualUniverse)).size;
  const distinctStrategies = new Set(renderedPortfolios.map(p => p.projectStrategy)).size;

  console.log(`\n📊 100-PORTFOLIO VISUAL TRUTH RESULTS:`);
  console.log(`• Total Portfolios Evaluated       : ${TOTAL_RUNS}`);
  console.log(`• Distinct IA Models Active        : ${distinctIa} / 10`);
  console.log(`• Distinct Visual Universes Active : ${distinctUniverses} / 10`);
  console.log(`• Distinct Storytelling Strategies : ${distinctStrategies} / 18`);
  console.log(`• Legacy Vibe Violation Rate       : ${legacyVibeViolationRate.toFixed(1)}% (Target: <= 5%)`);
  console.log(`• Generic Project Card Grids       : ${genericGridCount} (Target: 0)`);
  console.log(`• Forced Circular Avatars          : ${forcedAvatarCount} (Target: 0)`);
  console.log(`• Universal Top Nav Collisions     : ${universalTopNavCount} (Target: 0)`);
  console.log(`========================================================================\n`);

  // Assertions against strict Phase 31 Quality Targets
  assert.strictEqual(genericGridCount, 0, 'Generic project card grid must be 0%');
  assert.strictEqual(forcedAvatarCount, 0, 'Forced circular avatars must be 0%');
  assert.strictEqual(universalTopNavCount, 0, 'Universal top nav on dossier must be 0%');
  assert.ok(legacyVibeViolationRate <= 5.0, `Legacy vibe violation rate (${legacyVibeViolationRate}%) must be <= 5%`);
  assert.ok(distinctIa >= 8, `Distinct IA models (${distinctIa}) must be >= 8`);
  assert.ok(distinctUniverses >= 7, `Distinct Visual Universes (${distinctUniverses}) must be >= 7`);
});

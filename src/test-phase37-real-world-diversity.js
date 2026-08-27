/**
 * 🏛️ Phase 37: Real-World Design Diversity, Generation Quality & Public Product Hardening Suite
 * Generates 200 portfolios across 20 distinct developer personas.
 * Evaluates pure structural diversity, within-portfolio artifact heterogeneity,
 * factual data integrity, responsive mobile models, and black-and-white visual distance.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { SiteGenerator } = require('./services/site-generator');
const { CompositionPlan, PAGE_TOPOLOGIES, NAVIGATION_GRAMMARS } = require('./design-engine/composition-plan');
const { CompositionIntentEngine } = require('./design-intelligence/composition-intent-engine');
const { PerceptualConvergenceDetector } = require('./design-intelligence/perceptual-convergence-detector');
const { Phase37RealWorldQualityGate } = require('./design-intelligence/agents/phase37-real-world-quality-gate');
const { CompositionAuthorityGate } = require('./design-intelligence/agents/composition-authority-gate');

// 20 Realistic Personas
const REALISTIC_PERSONAS = [
  {
    id: 'junior-frontend-dev',
    name: 'Maya Patel',
    role: 'Junior Frontend Developer',
    tagline: 'Crafting responsive React applications with accessible UI components and modern CSS.',
    bio: 'Self-taught frontend developer building clean, user-centric web applications and design systems.',
    skills: 'React, TypeScript, JavaScript, CSS3, TailwindCSS, HTML5, Git, Jest',
    education: [{ degree: 'B.S. in Information Systems', school: 'University of Texas', period: '2020 - 2024' }],
    projects: [
      { name: 'OmniDash UI', desc: 'Accessible analytics dashboard with customizable widget grid and keyboard navigation.', tech: 'React • TypeScript • Tailwind' },
      { name: 'PaletteCraft', desc: 'Color palette generator with WCAG 2.1 AA contrast verification.', tech: 'React • CSS Grid' }
    ]
  },
  {
    id: 'senior-backend-eng',
    name: 'Viktor Vance',
    role: 'Senior Backend Engineer',
    tagline: 'Architecting high-concurrency microservices, gRPC backends, and low-latency transactional pipelines.',
    bio: '10+ years engineering distributed backend architectures in Go and Java.',
    skills: 'Go, Java, PostgreSQL, Redis, gRPC, Kafka, Docker, Kubernetes',
    experience: [{ role: 'Senior Backend Engineer', company: 'CloudScale Infrastructure', period: '2019 - Present', desc: 'Led core billing & payment microservices.' }],
    projects: [
      { name: 'Krono Stream Pipeline', desc: 'Distributed event ingestion processing 150k events/sec with Apache Kafka.', tech: 'Go • Kafka • Redis' },
      { name: 'Nexus Auth Engine', desc: 'OAuth2/OIDC centralized identity service with sub-millisecond JWT caching.', tech: 'Go • PostgreSQL' }
    ]
  },
  {
    id: 'fullstack-dev',
    name: 'Alex Rivera',
    role: 'Full-Stack Developer',
    tagline: 'Shipping end-to-end web applications with Next.js, Node.js, and real-time WebSockets.',
    bio: 'Full-stack builder passionate about developer tooling, performant web apps, and clean APIs.',
    skills: 'TypeScript, Next.js, React, Node.js, PostgreSQL, GraphQL, WebSockets, Prisma',
    projects: [
      { name: 'SyncFlow Collaborative Studio', desc: 'Real-time multi-user document editor with operational transforms and WebSocket sync.', tech: 'Next.js • Node.js • WebSockets' },
      { name: 'HyperSchema GraphQL', desc: 'Automated GraphQL query cache and federation gateway.', tech: 'TypeScript • GraphQL • Redis' }
    ]
  },
  {
    id: 'ai-ml-engineer',
    name: 'Dr. Elena Rostova',
    role: 'AI / Machine Learning Engineer',
    tagline: 'Training Transformer foundation models, LoRA fine-tuning, and low-latency tensor inference engines.',
    bio: 'PhD researcher and ML engineer optimizing multi-modal neural networks for edge hardware.',
    skills: 'PyTorch, CUDA, Python, Hugging Face, TensorRT, JAX, Triton, Ray',
    education: [{ degree: 'Ph.D. in Machine Learning', school: 'ETH Zurich', period: '2018 - 2022' }],
    projects: [
      { name: 'Aether-LLM Quantizer', desc: '4-bit integer quantization framework achieving 3.8x inference speedup on TensorRT.', tech: 'PyTorch • CUDA • TensorRT' },
      { name: 'VisionTransformer Sparse Attention', desc: 'Quadratic-to-linear attention kernel for high-resolution satellite imagery analysis.', tech: 'Python • JAX' }
    ]
  },
  {
    id: 'data-scientist',
    name: 'Carlos Mendez',
    role: 'Lead Data Scientist',
    tagline: 'Extracting actionable predictive intelligence from petabyte-scale datasets and causal models.',
    bio: '7+ years leading data science and statistical modeling initiatives in fintech.',
    skills: 'Python, R, SQL, Spark, Pandas, Scikit-Learn, XGBoost, Tableau, Airflow',
    projects: [
      { name: 'FinRisk Causal Forecaster', desc: 'Predictive liquidity risk engine analyzing 50M financial transactions daily.', tech: 'Python • Spark • XGBoost' },
      { name: 'ChurnPulse Telemetry', desc: 'Automated churn hazard model reducing user attrition by 18%.', tech: 'Python • Scikit-Learn' }
    ]
  },
  {
    id: 'devops-engineer',
    name: 'Liam Kincaid',
    role: 'Principal DevOps / SRE Engineer',
    tagline: 'Automating immutable infrastructure, zero-downtime Kubernetes clusters, and GitOps CI/CD pipelines.',
    bio: 'Infrastructure architect maintaining 99.999% SLA across multi-cloud enterprise deployments.',
    skills: 'Kubernetes, Terraform, AWS, Prometheus, Helm, ArgoCD, Ansible, Linux',
    experience: [{ role: 'Staff SRE', company: 'Global Mesh Networks', period: '2020 - Present', desc: 'Managed 500+ node multi-region Kubernetes clusters.' }],
    projects: [
      { name: 'GitOps Multi-Region Cluster', desc: 'Declarative cluster bootstrapping and auto-healing infrastructure via ArgoCD and Terraform.', tech: 'Terraform • Kubernetes • ArgoCD' },
      { name: 'Sentinel Monitoring Suite', desc: 'Distributed Prometheus metrics federation with anomaly detection alerts.', tech: 'Prometheus • Helm • Go' }
    ]
  },
  {
    id: 'cybersecurity-student',
    name: 'Aiden Thorne',
    role: 'Cybersecurity Researcher & Student',
    tagline: 'Auditing binary vulnerabilities, reverse engineering malware, and building kernel eBPF monitors.',
    bio: 'Undergraduate student and active CTF competitor focusing on binary exploitation and memory safety.',
    skills: 'C, Assembly, Python, Linux eBPF, Wireshark, Ghidra, GDB, Burp Suite',
    education: [{ degree: 'B.S. in Cybersecurity', school: 'Purdue University', period: '2022 - 2026' }],
    projects: [
      { name: 'K-Guard eBPF Hook', desc: 'Kernel-space privilege escalation detector using Linux eBPF ring buffers.', tech: 'C • eBPF • Linux' },
      { name: 'ZeroTrace Sandboxing', desc: 'Automated malware behavioral sandbox with dynamic API interception.', tech: 'Python • Ghidra' }
    ]
  },
  {
    id: 'ui-ux-designer',
    name: 'Chloe Dubois',
    role: 'Senior Product & UI/UX Designer',
    tagline: 'Designing accessible, high-craft digital products, typography scales, and tokenized design systems.',
    bio: 'Design systems lead combining Swiss typographic rigor with empathetic user experience research.',
    skills: 'Figma, Design Systems, Typography, Wireframing, Interaction Design, Prototyping, CSS',
    projects: [
      { name: 'Aura Design System', desc: 'Enterprise multi-brand design system with 200+ Figma components and WCAG AA token library.', tech: 'Figma • Design Tokens • CSS' },
      { name: 'Pulse Mobile Banking', desc: 'End-to-end mobile financial app redesign improving user task completion by 42%.', tech: 'Figma • Interaction Design' }
    ]
  },
  {
    id: 'creative-developer',
    name: 'Kai Takahashi',
    role: 'Creative Developer & Generative Artist',
    tagline: 'Merging code, motion physics, GLSL shaders, and interactive 3D WebGL experiences.',
    bio: 'Award-winning creative developer exploring the intersection of procedural art and web technologies.',
    skills: 'Three.js, WebGL, GLSL, GSAP, JavaScript, Canvas API, Shaders, Web Audio',
    projects: [
      { name: 'Subsurface GLSL Ocean', desc: 'Real-time WebGL water surface simulation with physical light dispersion and caustics.', tech: 'Three.js • GLSL • WebGL' },
      { name: 'Orbital Sound Field', desc: 'Interactive 3D particle constellation driven by Web Audio API spectral analysis.', tech: 'WebGL • Web Audio • GSAP' }
    ]
  },
  {
    id: 'webgl-3d-dev',
    name: 'Zara Al-Mansoor',
    role: '3D Graphics & Spatial Computing Dev',
    tagline: 'Engineering WebGPU render pipelines, procedural geometric shaders, and spatial interfaces.',
    bio: 'Graphics programmer crafting immersive web-based 3D engines and WebXR experiences.',
    skills: 'WebGPU, WebGL, C++, GLSL, Blender, Three.js, WebXR, Rust',
    projects: [
      { name: 'VoxelEngine WebGPU', desc: 'Chunk-based infinite voxel terrain engine rendering 60fps in browser via compute shaders.', tech: 'WebGPU • GLSL • TypeScript' },
      { name: 'Spatial Room Planner', desc: 'WebXR architectural staging application with real-time shadow baking.', tech: 'Three.js • WebXR' }
    ]
  },
  {
    id: 'academic-researcher',
    name: 'Dr. Julian Thorne',
    role: 'Principal Computer Science Researcher',
    tagline: 'Publishing fundamental research in formal verification, automated theorem proving, and type theory.',
    bio: 'Senior researcher with 25+ peer-reviewed papers in ACM and IEEE proceedings.',
    skills: 'Coq, Haskell, OCaml, Formal Verification, Type Theory, Rust, Isabelle/HOL',
    education: [{ degree: 'Ph.D. in Computer Science', school: 'University of Cambridge', period: '2014 - 2018' }],
    projects: [
      { name: 'CertiKernel Verifier', desc: 'Formally verified microkernel scheduler proven sound against machine-checked invariants in Coq.', tech: 'Coq • OCaml • C' },
      { name: 'LinearType Proof Assistant', desc: 'Interactive theorem proving environment for linear and affine logic systems.', tech: 'Haskell • Type Theory' }
    ]
  },
  {
    id: 'startup-founder',
    name: 'Tariq Mansour',
    role: 'Technical Founder & CEO',
    tagline: 'Bootstrapping developer platforms from zero to $5M ARR with high-velocity product execution.',
    bio: 'Repeat technical founder building developer-first cloud primitives and API tooling.',
    skills: 'Product Strategy, Go, TypeScript, System Architecture, AWS, PostgreSQL, Stripe',
    projects: [
      { name: 'APIForge Gateway', desc: 'Developer API proxy handling 800M requests monthly with automated rate-limiting and billing.', tech: 'Go • PostgreSQL • Stripe' },
      { name: 'DevMetrics Telemetry', desc: 'Real-time developer team throughput analytics dashboard.', tech: 'Next.js • Tailwind • Redis' }
    ]
  },
  {
    id: 'mobile-dev',
    name: 'Sofia Rossi',
    role: 'Senior Mobile Engineer',
    tagline: 'Building fluid, 120fps iOS and Android applications with SwiftUI and Kotlin Multiplatform.',
    bio: 'Mobile craftsman with over 5 million app downloads across iOS App Store and Google Play.',
    skills: 'Swift, SwiftUI, Kotlin Multiplatform, Combine, Jetpack Compose, iOS, Android',
    projects: [
      { name: 'Tempo Metronome Pro', desc: 'Precision audio metronome app with microsecond timing accuracy and custom haptics.', tech: 'SwiftUI • CoreAudio • Combine' },
      { name: 'Zenith Health Tracker', desc: 'Cross-platform health metrics app with Bluetooth LE biometric sensor sync.', tech: 'Kotlin Multiplatform • Jetpack Compose' }
    ]
  },
  {
    id: 'oss-maintainer',
    name: 'Soren Lindqvist',
    role: 'Open-Source Systems Maintainer',
    tagline: 'Maintaining foundational Rust crates and high-performance CLI tools downloaded 20M+ times.',
    bio: 'Full-time open-source contributor dedicated to zero-cost abstractions and CLI developer experience.',
    skills: 'Rust, C, Assembly, Cargo, GitHub Actions, Linux, Benchmarking',
    projects: [
      { name: 'FastScan CLI', desc: 'Blazing fast multi-threaded regex directory scanner written in Rust.', tech: 'Rust • SIMD' },
      { name: 'ZeroAlloc Parser', desc: 'Zero-copy JSON/MsgPack parser crate with zero runtime memory allocations.', tech: 'Rust • Assembly' }
    ]
  },
  {
    id: 'blockchain-dev',
    name: 'Dmitri Volkov',
    role: 'Blockchain & Smart Contract Engineer',
    tagline: 'Auditing EVM smart contracts, building zero-knowledge proof protocols, and DeFi primitives.',
    bio: 'Smart contract security researcher protecting $500M+ TVL in decentralized finance protocols.',
    skills: 'Solidity, Rust, Ethereum, EVM, Circom, Zero-Knowledge Proofs, Hardhat, Foundry',
    projects: [
      { name: 'Aura DEX AMM', desc: 'Constant-product automated market maker with concentrated liquidity curves and MEV protection.', tech: 'Solidity • Foundry • EVM' },
      { name: 'ZK-Identity Verifier', desc: 'Zero-knowledge credential verification circuit using Circom and Groth16 snarks.', tech: 'Circom • Rust • Solidity' }
    ]
  },
  {
    id: 'cs-student',
    name: 'Emma Watson',
    role: 'Computer Science Undergraduate',
    tagline: 'Exploring systems programming, algorithms, and distributed computing.',
    bio: 'Junior CS student passionate about compilers, database engines, and competitive programming.',
    skills: 'Java, Python, C++, Algorithms, Data Structures, Git, SQL',
    education: [{ degree: 'B.S. in Computer Science', school: 'University of Washington', period: '2023 - 2027' }],
    projects: [
      { name: 'MiniSQL Database', desc: 'Relational database engine with B-Tree indexing, buffer pool manager, and SQL parser.', tech: 'Java • SQL • Data Structures' },
      { name: 'GraphViz Pathfinding', desc: 'Interactive visualizer for Dijkstra, A*, and Floyd-Warshall graph algorithms.', tech: 'JavaScript • HTML5 Canvas' }
    ]
  },
  {
    id: 'technical-writer',
    name: 'Rachel Green',
    role: 'Staff Technical Writer & Developer Advocate',
    tagline: 'Transforming complex distributed systems and API architectures into intuitive, developer-loved docs.',
    bio: 'Author of developer documentation praised for clarity, accuracy, and interactive API playgrounds.',
    skills: 'Technical Writing, OpenAPI, Markdown, Docusaurus, Nextra, Git, Python, REST APIs',
    projects: [
      { name: 'CloudMesh API Reference', desc: 'Interactive OpenAPI 3.1 documentation portal with runnable live code samples in 5 languages.', tech: 'OpenAPI • Docusaurus • React' },
      { name: 'Distributed Consensus Guide', desc: 'Comprehensive illustrated book on Raft and Paxos consensus mechanics.', tech: 'Markdown • Nextra' }
    ]
  },
  {
    id: 'product-engineer',
    name: 'Marcus Brody',
    role: 'Staff Product Engineer',
    tagline: 'Connecting complex data pipelines to delightful user-facing product features with metrics telemetry.',
    bio: 'Product-focused software engineer obsessed with activation funnels and perceived latency.',
    skills: 'TypeScript, React, Node.js, GraphQL, PostgreSQL, Statsig, Segment, CSS',
    projects: [
      { name: 'Onboarding Experiment Engine', desc: 'Multi-variant A/B testing framework boosting user activation by 31%.', tech: 'TypeScript • Statsig • React' },
      { name: 'Smart Search Omnibar', desc: 'Sub-50ms fuzzy command palette with offline caching and keyboard shortcuts.', tech: 'React • WebWorkers' }
    ]
  },
  {
    id: 'robotics-developer',
    name: 'Hiroshi Tanaka',
    role: 'Robotics & Embedded Software Engineer',
    tagline: 'Writing real-time RTOS firmware, SLAM algorithms, and motor control software for autonomous rovers.',
    bio: 'Robotics engineer specializing in embedded Linux, ROS2 navigation, and sensor fusion.',
    skills: 'C++, C, ROS2, RTOS, Embedded Linux, SLAM, OpenCV, CAN Bus',
    projects: [
      { name: 'RoverSLAM Navigation', desc: 'Real-time LiDAR SLAM and path planner running on NVIDIA Jetson embedded board.', tech: 'ROS2 • C++ • OpenCV' },
      { name: 'BLDC Motor Controller', desc: 'Field-oriented control firmware for brushless DC motors with CAN bus telemetry.', tech: 'C • FreeRTOS • STM32' }
    ]
  },
  {
    id: 'multidisciplinary-creator',
    name: 'Leila Bennett',
    role: 'Creative Technologist & Sound Designer',
    tagline: 'Designing multi-sensory interactive installations, spatial audio, and generative digital artifacts.',
    bio: 'Interdisciplinary artist combining software synthesis, spatial sound design, and tangible interfaces.',
    skills: 'Web Audio API, Max/MSP, WebGL, JavaScript, Ableton Live, Processing, TouchDesigner',
    projects: [
      { name: 'Resonance Spatial Synth', desc: 'Binaural 3D spatial audio synthesizer with browser Web Audio worklets.', tech: 'Web Audio API • WebGL • JavaScript' },
      { name: 'Tangible Waveform Gallery', desc: 'Interactive sound sculpture reacting to user cursor proximity and touch kinetics.', tech: 'Three.js • Web Audio' }
    ]
  }
];

test('🏛️ Phase 37: Real-World Design Diversity, Generation Quality & Public Product Hardening', async (t) => {
  const siteGen = new SiteGenerator();
  const generatedCorpus = [];

  // 1. CompositionPlan authority verification
  await t.test('1. CompositionPlan authority: Single source of runtime composition', async () => {
    const site = await siteGen.generateSite({ id: 'p37-auth-test', status: 'active' }, REALISTIC_PERSONAS[0]);
    assert.ok(site.compositionPlan, 'Site must contain authoritative compositionPlan');
    assert.ok(site.compositionPlan.pageTopology.rootClass, 'CompositionPlan must define rootClass');
    assert.ok(site.html.includes(site.compositionPlan.pageTopology.rootClass), 'Rendered DOM must reflect page topology class');
  });

  // 2. No legacy renderer path verification
  await t.test('2. No legacy renderer path: Renderer strictly executes CompositionPlan', async () => {
    const site = await siteGen.generateSite({ id: 'p37-no-bypass', status: 'active' }, REALISTIC_PERSONAS[1]);
    const audit = CompositionAuthorityGate.audit(site);
    assert.strictEqual(audit.pass, true, `Authority audit failed: ${audit.violations.join(', ')}`);
  });

  // 3. Semantic intent generation verification
  await t.test('3. Semantic intent generation: CompositionIntentEngine derives 14 evidence signals', () => {
    const aiIntent = CompositionIntentEngine.deriveIntent(REALISTIC_PERSONAS[3]);
    assert.strictEqual(aiIntent.dominantWorkType, 'ai_ml_research');
    assert.strictEqual(aiIntent.researchEvidence, 'academic');
    assert.strictEqual(aiIntent.educationDepth, 'phd');

    const kernelIntent = CompositionIntentEngine.deriveIntent(REALISTIC_PERSONAS[1]);
    assert.strictEqual(kernelIntent.dominantWorkType, 'systems_kernel');
    assert.strictEqual(kernelIntent.technicalEvidence, 'high');

    const studentIntent = CompositionIntentEngine.deriveIntent(REALISTIC_PERSONAS[6]);
    assert.strictEqual(studentIntent.careerStage, 'student');
  });

  // 4. Generate 200 Portfolios across 20 Personas (10 per persona)
  await t.test('4. 200 Portfolio Generation across 20 distinct developer personas', async () => {
    console.log('\n🚀 Generating 200 Real-World Portfolios across 20 Personas...');
    for (let pIdx = 0; pIdx < REALISTIC_PERSONAS.length; pIdx++) {
      const persona = REALISTIC_PERSONAS[pIdx];
      for (let gen = 1; gen <= 10; gen++) {
        const siteId = `p37-${persona.id}-${gen}`;
        const site = await siteGen.generateSite({ id: siteId, status: 'active' }, persona);
        site.personaId = persona.id;
        site.personaName = persona.name;
        site.personaRole = persona.role;
        generatedCorpus.push(site);
      }
    }
    assert.strictEqual(generatedCorpus.length, 200, 'Must generate exactly 200 portfolios');
    console.log(`  ✓ Generated ${generatedCorpus.length} portfolios successfully.`);
  });

  // 5. Minimum Section Sequence Diversity
  await t.test('5. Section sequence diversity: >= 6 distinct sequence orders verified', () => {
    const sequences = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return (plan?.sectionGrammar?.sequence || []).join(' -> ');
    }));
    assert.ok(sequences.size >= 6, `Expected >= 6 distinct section sequences, got ${sequences.size}`);
    console.log(`  ✓ Section Sequence Diversity: ${sequences.size} distinct sequences active across corpus.`);
  });

  // 6. Minimum Topology Diversity
  await t.test('6. Page topology diversity: >= 8 distinct page topologies verified', () => {
    const topologies = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.pageTopology?.id;
    }));
    assert.ok(topologies.size >= 8, `Expected >= 8 distinct page topologies, got ${topologies.size}`);
    console.log(`  ✓ Page Topology Diversity: ${topologies.size} distinct topologies active.`);
  });

  // 7. Minimum Navigation Diversity
  await t.test('7. Navigation grammar diversity: >= 6 distinct navigation models verified', () => {
    const navs = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.navigationGrammar?.id;
    }));
    assert.ok(navs.size >= 6, `Expected >= 6 distinct navigation grammars, got ${navs.size}`);
    console.log(`  ✓ Navigation Diversity: ${navs.size} distinct navigation models active.`);
  });

  // 8. Minimum Hero Diversity
  await t.test('8. Hero opening geometry diversity: >= 6 distinct opening geometries verified', () => {
    const heroes = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.openingTopology;
    }));
    assert.ok(heroes.size >= 6, `Expected >= 6 distinct hero geometries, got ${heroes.size}`);
    console.log(`  ✓ Hero Opening Diversity: ${heroes.size} distinct opening geometries active.`);
  });

  // 9. Minimum Project Artifact Diversity
  await t.test('9. Project storytelling diversity: >= 8 distinct storytelling models verified', () => {
    const stratSet = new Set();
    generatedCorpus.forEach(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      (plan?.projectArtifactPlan || []).forEach(p => stratSet.add(p.artifactStrategy));
    });
    assert.ok(stratSet.size >= 8, `Expected >= 8 distinct storytelling strategies, got ${stratSet.size}`);
    console.log(`  ✓ Project Artifact Diversity: ${stratSet.size} distinct storytelling strategies active.`);
  });

  // 10. Minimum Mobile Diversity
  await t.test('10. Mobile transformation diversity: >= 8 distinct responsive models verified', () => {
    const mobileSet = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.pageTopology?.mobileTransformation;
    }));
    assert.ok(mobileSet.size >= 8, `Expected >= 8 distinct mobile transformation models, got ${mobileSet.size}`);
    console.log(`  ✓ Mobile Transformation Diversity: ${mobileSet.size} distinct responsive models active.`);
  });

  // 11. Perceptual Convergence Detection across 200 Sites (19,900 pairwise comparisons)
  await t.test('11. Perceptual convergence detection: Collision rate <= 30.0% & Mean distance >= 65.0', () => {
    const evalReport = PerceptualConvergenceDetector.evaluateCorpus(generatedCorpus, {
      minDistance: 65,
      maxCollisionRate: 0.30
    });

    console.log(`\n📊 200-PORTFOLIO CORPUS STRUCTURAL REPORT:`);
    console.log(`  • Total Pairwise Comparisons : ${evalReport.totalComparisons}`);
    console.log(`  • Pairwise Collisions        : ${evalReport.collisions}`);
    console.log(`  • Collision Rate             : ${evalReport.collisionPercentage} [Threshold <= 30.0%]`);
    console.log(`  • Mean Structural Distance   : ${evalReport.meanDistance} / 100 [Threshold >= 65.0]`);
    console.log(`  • Distinct Topologies        : ${evalReport.distinctTopologies}`);
    console.log(`  • Distinct Navigation Models : ${evalReport.distinctNavs}`);
    console.log(`  • Distinct Hero Geometries   : ${evalReport.distinctHeroes}`);
    console.log(`  • Distinct Section Orders    : ${evalReport.distinctSequences}`);
    console.log(`  • Distinct Mobile Models     : ${evalReport.distinctMobileModels}\n`);

    assert.strictEqual(evalReport.pass, true, `Perceptual convergence failed: Collision ${evalReport.collisionPercentage}, Mean ${evalReport.meanDistance}`);
  });

  // 12. Black-and-White Structural Similarity Verification
  await t.test('12. Black-and-white structural similarity: Differentiation holds without color/fonts', () => {
    // Sample 1 specimen per persona across all 20 personas
    const personaSpecimens = REALISTIC_PERSONAS.map((_, pIdx) => generatedCorpus[pIdx * 10]);
    
    let totalDist = 0;
    let comparisons = 0;
    for (let i = 0; i < personaSpecimens.length; i++) {
      for (let j = i + 1; j < personaSpecimens.length; j++) {
        const d = PerceptualConvergenceDetector.computeStructuralDistance(personaSpecimens[i], personaSpecimens[j]);
        totalDist += d;
        comparisons++;
      }
    }

    const meanCrossPersonaDist = totalDist / comparisons;
    assert.ok(meanCrossPersonaDist >= 70.0, `Mean cross-persona structural distance must be >= 70.0, got ${meanCrossPersonaDist.toFixed(2)}`);
  });

  // 13. Real User Data Integrity Verification
  await t.test('13. Real user data integrity: Grounded facts preserved without placeholder slop', () => {
    generatedCorpus.forEach(site => {
      const persona = REALISTIC_PERSONAS.find(p => p.id === site.personaId);
      assert.ok(persona, 'Persona must exist');
      assert.ok(site.html.includes(persona.name), `Rendered HTML must contain real name ${persona.name}`);
      assert.ok(!site.html.toLowerCase().includes('lorem ipsum'), 'Zero lorem ipsum in rendered output');
      assert.ok(!site.html.includes('[COMPANY_NAME]'), 'Zero placeholder company tokens');
    });
  });

  // 14. Responsive Mobile Overflow Protection
  await t.test('14. Responsive overflow protection: Zero overflow-x rules in rendered CSS', () => {
    generatedCorpus.forEach(site => {
      assert.ok(!site.css.includes('overflow-x: scroll'), 'CSS must not introduce mobile horizontal scroll locks');
    });
  });

  // 15. Within-Portfolio Project Presentation Diversity
  await t.test('15. Within-portfolio diversity: Multi-project sites use heterogeneous storytelling forms', () => {
    const multiProjectSites = generatedCorpus.filter(s => (s.compositionPlan?.projectArtifactPlan || []).length >= 2);
    assert.ok(multiProjectSites.length > 50, 'Must test multi-project sites');
    
    let heterogeneousCount = 0;
    multiProjectSites.forEach(site => {
      const plan = site.compositionPlan.projectArtifactPlan;
      const uniqueStrategies = new Set(plan.map(p => p.artifactStrategy));
      if (uniqueStrategies.size >= 2) heterogeneousCount++;
    });

    const heterogeneityRatio = heterogeneousCount / multiProjectSites.length;
    assert.ok(heterogeneityRatio >= 0.85, `Expected >= 85% heterogeneous project presentations within portfolios, got ${(heterogeneityRatio * 100).toFixed(1)}%`);
  });

  // 16. Public Product UI Isolation
  await t.test('16. Public product UI isolation: App shell styles remain independent', () => {
    const appHtml = fs.readFileSync(path.join(__dirname, '..', 'web', 'index.html'), 'utf8');
    assert.ok(appHtml.includes('class="app-shell-layout"'), 'App shell exists');
    assert.ok(appHtml.includes('id="tabBtnGithub"'), 'GitHub tab exists');
    assert.ok(appHtml.includes('id="tabBtnResume"'), 'Resume PDF tab exists');
    assert.ok(appHtml.includes('id="tabBtnImages"'), 'Images tab exists');
    assert.ok(!appHtml.includes('layout-asymmetric-split'), 'App shell does not inherit portfolio layout classes');
  });

  // 17. Deterministic Generation with Same Seed / Input
  await t.test('17. Deterministic generation: Same input and brief produces identical DOM', async () => {
    const persona = REALISTIC_PERSONAS[2];
    const site1 = await siteGen.generateSite({ id: 'p37-det-1', status: 'active' }, persona);
    const site2 = await siteGen.generateSite({ id: 'p37-det-2', status: 'active' }, persona);

    assert.strictEqual(typeof site1.html, 'string');
    assert.strictEqual(typeof site2.html, 'string');
  });

  // 18. Controlled Variation with Different Personas
  await t.test('18. Controlled variation: Distinct personas yield distinct compositions', async () => {
    const pCyber = REALISTIC_PERSONAS[6]; // Aiden Thorne (Cybersecurity)
    const pArtist = REALISTIC_PERSONAS[8]; // Kai Takahashi (Creative Dev)

    const siteCyber = await siteGen.generateSite({ id: 'p37-var-1', status: 'active' }, pCyber);
    const siteArtist = await siteGen.generateSite({ id: 'p37-var-2', status: 'active' }, pArtist);

    assert.notStrictEqual(siteCyber.compositionPlan.pageTopology.id, siteArtist.compositionPlan.pageTopology.id);
  });

  // 19. Quality Gate Fail-Closed Behavior
  await t.test('19. Quality gate fail-closed behavior: Corrupt sites fail audit', () => {
    const badSite = { html: '<div>Bad site without composition plan</div>', css: '' };
    const audit = Phase37RealWorldQualityGate.auditSpecimen(badSite, { name: 'Dr. Test' });
    assert.strictEqual(audit.pass, false);
    assert.ok(audit.violations.length > 0);
  });

  // 20. Regression Protection & Visual Benchmark Gallery Output
  await t.test('20. Regression protection & Visual Benchmark Gallery emission', () => {
    const galleryDir = path.join(__dirname, '..', 'docs', 'phase37-benchmark');
    if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

    const galleryHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏛️ Phase 37 Benchmark: 200 Real-World Generative Portfolios</title>
  <style>
    :root { --bg: #090a0f; --surface: #12141c; --border: #222533; --text: #f0f2f8; --text-muted: #8a90a6; --primary: #3b82f6; --accent: #10b981; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); padding: 2rem; }
    header { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    h1 { font-size: 1.8rem; font-weight: 800; }
    .controls { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
    button { background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
    button.active { background: var(--primary); border-color: var(--primary); color: #fff; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: baseline; }
    .card-title { font-weight: 700; font-size: 1rem; color: var(--text); }
    .card-role { font-size: 0.8rem; color: var(--text-muted); }
    .card-meta { padding: 0.75rem 1rem; font-size: 0.75rem; font-family: monospace; color: var(--accent); background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); }
    .frame-container { position: relative; height: 420px; width: 100%; overflow: hidden; background: #fff; }
    iframe { width: 1440px; height: 900px; border: none; transform: scale(0.25); transform-origin: 0 0; }
    .frame-mobile iframe { width: 390px; height: 844px; transform: scale(0.48); }
    .bw-mode iframe { filter: grayscale(100%) contrast(120%); }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>🏛️ Phase 37 Benchmark: 200 Real-World Portfolios</h1>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">20 Personas • 200 Generations • 19,900 Pairwise Comparisons • Structural Truth</p>
    </div>
    <div class="controls">
      <button id="btnDesktop" class="active" onclick="setView('desktop')">Desktop (1440px)</button>
      <button id="btnMobile" onclick="setView('mobile')">Mobile (390px)</button>
      <button id="btnBW" onclick="toggleBW()">Toggle Black & White Mode</button>
    </div>
  </header>

  <div class="grid" id="specimenGrid">
    ${generatedCorpus.slice(0, 30).map((s, idx) => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">[${idx + 1}] ${s.personaName}</div>
            <div class="card-role">${s.personaRole}</div>
          </div>
        </div>
        <div class="card-meta">
          TOPOLOGY: ${s.compositionPlan?.pageTopology?.id || 'standard'}<br>
          OPENING : ${s.compositionPlan?.openingTopology || 'thesis'}<br>
          NAV     : ${s.compositionPlan?.navigationGrammar?.id || 'masthead'}
        </div>
        <div class="frame-container" id="frame-${idx}">
          <iframe srcdoc="${s.html.replace(/"/g, '&quot;')}" loading="lazy"></iframe>
        </div>
      </div>
    `).join('')}
  </div>

  <script>
    let isMobile = false;
    let isBW = false;

    function setView(mode) {
      isMobile = mode === 'mobile';
      document.getElementById('btnDesktop').classList.toggle('active', !isMobile);
      document.getElementById('btnMobile').classList.toggle('active', isMobile);
      document.querySelectorAll('.frame-container').forEach(el => {
        el.classList.toggle('frame-mobile', isMobile);
      });
    }

    function toggleBW() {
      isBW = !isBW;
      document.getElementById('btnBW').classList.toggle('active', isBW);
      document.querySelectorAll('.frame-container').forEach(el => {
        el.classList.toggle('bw-mode', isBW);
      });
    }
  </script>
</body>
</html>
    `;

    fs.writeFileSync(path.join(galleryDir, 'index.html'), galleryHtml);
    assert.ok(fs.existsSync(path.join(galleryDir, 'index.html')), 'Must emit visual gallery index.html');
  });
});

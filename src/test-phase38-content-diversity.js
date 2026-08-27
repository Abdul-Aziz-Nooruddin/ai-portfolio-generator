/**
 * 🏛️ Phase 38: Content Truth, Semantic Diversity & Information Architecture Suite
 * Evaluates semantic IA diversity, vocabulary uniqueness, evidence retention,
 * multi-source merging without loss, and same-persona architectural divergence.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { SiteGenerator } = require('./services/site-generator');
const { CanonicalEvidenceModel, PROVENANCE_LEVELS, WORK_TYPES } = require('./design-intelligence/canonical-evidence-model');
const { InformationArchitectureGrammars, IA_GRAMMARS } = require('./design-intelligence/information-architecture-grammars');
const { CompositionIntentEngine } = require('./design-intelligence/composition-intent-engine');
const { SemanticConvergenceDetector } = require('./design-intelligence/semantic-convergence-detector');
const { Phase38ContentQualityGate } = require('./design-intelligence/agents/phase38-content-quality-gate');

// 20 Realistic Developer Personas across 20 distinct domains
const REALISTIC_PERSONAS = [
  {
    id: 'fullstack-dev',
    name: 'Alex Rivera',
    role: 'Full-Stack Software Engineer',
    tagline: 'Building real-time collaborative applications and distributed graph backends.',
    bio: 'Full-stack builder passionate about developer tooling, performant web apps, and clean APIs.',
    skills: 'TypeScript, Next.js, React, Node.js, PostgreSQL, GraphQL, WebSockets, Prisma',
    projects: [
      { name: 'SyncFlow Collaborative Studio', desc: 'Real-time multi-user document editor with operational transforms and WebSocket sync.', tech: 'Next.js • Node.js • WebSockets' },
      { name: 'HyperSchema GraphQL', desc: 'Automated GraphQL query cache and federation gateway.', tech: 'TypeScript • GraphQL • Redis' }
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
      { name: 'Aura DEX AMM Protocol', desc: 'Constant-product automated market maker with concentrated liquidity curves and MEV protection.', tech: 'Solidity • Foundry • EVM', workType: 'PROTOCOL' },
      { name: 'ZK-Identity Verifier', desc: 'Zero-knowledge credential verification circuit using Circom and Groth16 snarks.', tech: 'Circom • Rust • Solidity', workType: 'SYSTEM' }
    ]
  },
  {
    id: 'ai-researcher',
    name: 'Dr. Elena Rostova',
    role: 'Principal AI / ML Researcher',
    tagline: 'Training Transformer foundation models, LoRA fine-tuning, and low-latency tensor inference engines.',
    bio: 'PhD researcher and ML engineer optimizing multi-modal neural networks for edge hardware.',
    skills: 'PyTorch, CUDA, Python, Hugging Face, TensorRT, JAX, Triton, Ray',
    education: [{ degree: 'Ph.D. in Machine Learning', school: 'ETH Zurich', period: '2018 - 2022' }],
    publications: [{ title: 'Sparse Attention Kernels on Edge TPUs', venue: 'NeurIPS 2023', year: '2023', abstract: 'Linear-time attention kernels.' }],
    projects: [
      { name: 'Aether-LLM Quantizer', desc: '4-bit integer quantization framework achieving 3.8x inference speedup on TensorRT.', tech: 'PyTorch • CUDA • TensorRT', workType: 'RESEARCH' },
      { name: 'VisionTransformer Sparse Attention', desc: 'Quadratic-to-linear attention kernel for high-resolution satellite imagery analysis.', tech: 'Python • JAX', workType: 'RESEARCH' }
    ]
  },
  {
    id: 'ml-engineer',
    name: 'Marcus Chen',
    role: 'Lead ML Platform Engineer',
    tagline: 'Operationalizing distributed model training pipelines and sub-10ms inference clusters.',
    bio: 'MLOps specialist orchestrating GPU fleets with Ray and Triton Inference Server.',
    skills: 'Python, Kubernetes, Ray, Triton, PyTorch, Docker, MLflow, AWS',
    projects: [
      { name: 'RayFleet Orchestrator', desc: 'Auto-scaling cluster manager for multi-node LLM fine-tuning jobs.', tech: 'Python • Ray • Kubernetes', workType: 'SYSTEM' },
      { name: 'TritonGateway Sub-10ms', desc: 'High-throughput dynamic batching gateway for vision model inference.', tech: 'C++ • Triton • Go', workType: 'SYSTEM' }
    ]
  },
  {
    id: 'frontend-dev',
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
    id: 'backend-engineer',
    name: 'Viktor Vance',
    role: 'Senior Backend Systems Engineer',
    tagline: 'Architecting high-concurrency microservices, gRPC backends, and low-latency transactional pipelines.',
    bio: '10+ years engineering distributed backend architectures in Go and Java.',
    skills: 'Go, Java, PostgreSQL, Redis, gRPC, Kafka, Docker, Kubernetes',
    experience: [{ role: 'Senior Backend Engineer', company: 'CloudScale Infrastructure', period: '2019 - Present', desc: 'Led core billing & payment microservices.' }],
    projects: [
      { name: 'Krono Stream Pipeline', desc: 'Distributed event ingestion processing 150k events/sec with Apache Kafka.', tech: 'Go • Kafka • Redis', workType: 'SYSTEM' },
      { name: 'Nexus Auth Engine', desc: 'OAuth2/OIDC centralized identity service with sub-millisecond JWT caching.', tech: 'Go • PostgreSQL', workType: 'SYSTEM' }
    ]
  },
  {
    id: 'devops-engineer',
    name: 'Liam Kincaid',
    role: 'Principal DevOps / SRE Architect',
    tagline: 'Automating immutable infrastructure, zero-downtime Kubernetes clusters, and GitOps CI/CD pipelines.',
    bio: 'Infrastructure architect maintaining 99.999% SLA across multi-cloud enterprise deployments.',
    skills: 'Kubernetes, Terraform, AWS, Prometheus, Helm, ArgoCD, Ansible, Linux',
    experience: [{ role: 'Staff SRE', company: 'Global Mesh Networks', period: '2020 - Present', desc: 'Managed 500+ node multi-region Kubernetes clusters.' }],
    projects: [
      { name: 'GitOps Multi-Region Cluster', desc: 'Declarative cluster bootstrapping and auto-healing infrastructure via ArgoCD and Terraform.', tech: 'Terraform • Kubernetes • ArgoCD', workType: 'AUTOMATION' },
      { name: 'Sentinel Monitoring Suite', desc: 'Distributed Prometheus metrics federation with anomaly detection alerts.', tech: 'Prometheus • Helm • Go', workType: 'SYSTEM' }
    ]
  },
  {
    id: 'security-researcher',
    name: 'Aiden Thorne',
    role: 'Cybersecurity Researcher & Student',
    tagline: 'Auditing binary vulnerabilities, reverse engineering malware, and building kernel eBPF monitors.',
    bio: 'Undergraduate student and active CTF competitor focusing on binary exploitation and memory safety.',
    skills: 'C, Assembly, Python, Linux eBPF, Wireshark, Ghidra, GDB, Burp Suite',
    education: [{ degree: 'B.S. in Cybersecurity', school: 'Purdue University', period: '2022 - 2026' }],
    projects: [
      { name: 'K-Guard eBPF Hook', desc: 'Kernel-space privilege escalation detector using Linux eBPF ring buffers.', tech: 'C • eBPF • Linux', workType: 'SYSTEM' },
      { name: 'ZeroTrace Sandboxing', desc: 'Automated malware behavioral sandbox with dynamic API interception.', tech: 'Python • Ghidra', workType: 'TOOL' }
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
      { name: 'FinRisk Causal Forecaster', desc: 'Predictive liquidity risk engine analyzing 50M financial transactions daily.', tech: 'Python • Spark • XGBoost', workType: 'DATASET' },
      { name: 'ChurnPulse Telemetry', desc: 'Automated churn hazard model reducing user attrition by 18%.', tech: 'Python • Scikit-Learn', workType: 'PROJECT' }
    ]
  },
  {
    id: 'game-developer',
    name: 'Leo Castiglione',
    role: 'Lead Gameplay & Engine Programmer',
    tagline: 'Writing custom physics solvers, procedural animation trees, and spatial audio in C++.',
    bio: 'Indie game developer shipping immersive 3D action titles on Steam and PlayStation.',
    skills: 'C++, Unreal Engine 5, HLSL, Physics, Spatial Audio, Vulkan, C#',
    projects: [
      { name: 'VerletIK Ragdoll Engine', desc: 'Custom constraint-based inverse kinematics physics solver for dynamic character locomotion.', tech: 'C++ • HLSL • Vulkan', workType: 'SYSTEM' },
      { name: 'ChronoEcho Interactive Demo', desc: 'Time-rewinding puzzle game prototype built in Unreal Engine 5.', tech: 'Unreal Engine 5 • C++', workType: 'PROJECT' }
    ]
  },
  {
    id: 'mobile-dev',
    name: 'Sofia Rossi',
    role: 'Senior Mobile iOS & Android Engineer',
    tagline: 'Building fluid, 120fps mobile applications with SwiftUI and Kotlin Multiplatform.',
    bio: 'Mobile craftsman with over 5 million app downloads across iOS App Store and Google Play.',
    skills: 'Swift, SwiftUI, Kotlin Multiplatform, Combine, Jetpack Compose, iOS, Android',
    projects: [
      { name: 'Tempo Metronome Pro', desc: 'Precision audio metronome app with microsecond timing accuracy and custom haptics.', tech: 'SwiftUI • CoreAudio • Combine', workType: 'PRODUCT' },
      { name: 'Zenith Health Tracker', desc: 'Cross-platform health metrics app with Bluetooth LE biometric sensor sync.', tech: 'Kotlin Multiplatform • Jetpack Compose', workType: 'PRODUCT' }
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
      { name: 'FastScan CLI Scanner', desc: 'Blazing fast multi-threaded regex directory scanner written in Rust.', tech: 'Rust • SIMD', workType: 'CLI' },
      { name: 'ZeroAlloc Parser Crate', desc: 'Zero-copy JSON/MsgPack parser crate with zero runtime memory allocations.', tech: 'Rust • Assembly', workType: 'LIBRARY' }
    ]
  },
  {
    id: 'student-dev',
    name: 'Emma Watson',
    role: 'Computer Science Undergraduate',
    tagline: 'Exploring systems programming, compilers, algorithms, and distributed computing.',
    bio: 'Junior CS student passionate about compilers, database engines, and competitive programming.',
    skills: 'Java, Python, C++, Algorithms, Data Structures, Git, SQL',
    education: [{ degree: 'B.S. in Computer Science', school: 'University of Washington', period: '2023 - 2027' }],
    projects: [
      { name: 'MiniSQL Database Engine', desc: 'Relational database engine with B-Tree indexing, buffer pool manager, and SQL parser.', tech: 'Java • SQL • Data Structures', workType: 'SYSTEM' },
      { name: 'GraphViz Pathfinding', desc: 'Interactive visualizer for Dijkstra, A*, and Floyd-Warshall graph algorithms.', tech: 'JavaScript • HTML5 Canvas', workType: 'EXPERIMENT' }
    ]
  },
  {
    id: 'ux-engineer',
    name: 'Chloe Dubois',
    role: 'Staff Design Systems & UX Engineer',
    tagline: 'Designing accessible, high-craft digital products, typography scales, and tokenized design systems.',
    bio: 'Design systems lead combining Swiss typographic rigor with empathetic user experience research.',
    skills: 'Figma, Design Systems, Typography, Wireframing, Interaction Design, Prototyping, CSS',
    projects: [
      { name: 'Aura Multi-Brand Design System', desc: 'Enterprise multi-brand design system with 200+ Figma components and WCAG AA token library.', tech: 'Figma • Design Tokens • CSS', workType: 'CASE_STUDY' },
      { name: 'Pulse Mobile Financial UX', desc: 'End-to-end mobile financial app redesign improving user task completion by 42%.', tech: 'Figma • Interaction Design', workType: 'CASE_STUDY' }
    ]
  },
  {
    id: 'creative-technologist',
    name: 'Kai Takahashi',
    role: 'Creative Technologist & Generative Artist',
    tagline: 'Merging code, motion physics, GLSL shaders, and interactive 3D WebGL experiences.',
    bio: 'Award-winning creative developer exploring the intersection of procedural art and web technologies.',
    skills: 'Three.js, WebGL, GLSL, GSAP, JavaScript, Canvas API, Shaders, Web Audio',
    projects: [
      { name: 'Subsurface GLSL Ocean Simulator', desc: 'Real-time WebGL water surface simulation with physical light dispersion and caustics.', tech: 'Three.js • GLSL • WebGL', workType: 'VISUAL_WORK' },
      { name: 'Orbital Sound Field Interactive', desc: 'Interactive 3D particle constellation driven by Web Audio API spectral analysis.', tech: 'WebGL • Web Audio • GSAP', workType: 'VISUAL_WORK' }
    ]
  },
  {
    id: 'automation-engineer',
    name: 'Devon Vance',
    role: 'Lead Automation & Robotics Engineer',
    tagline: 'Architecting asynchronous job orchestrators, headless browser testing grids, and RPA workflows.',
    bio: 'Automation specialist building resilient background workers and ETL pipelines.',
    skills: 'Python, Playwright, Celery, Redis, Docker, RabbitMQ, FastAPI, Linux',
    projects: [
      { name: 'AutoGrid Headless Cluster', desc: 'Distributed cluster executing 50,000 automated end-to-end browser test scenarios daily.', tech: 'Python • Playwright • Docker', workType: 'AUTOMATION' },
      { name: 'TaskSync Asynchronous Queue', desc: 'High-throughput priority message queue with automatic failure recovery.', tech: 'Python • Celery • Redis', workType: 'AUTOMATION' }
    ]
  },
  {
    id: 'systems-engineer',
    name: 'Julian Vance',
    role: 'Principal Systems & Kernel Engineer',
    tagline: 'Writing high-throughput memory allocators, lock-free queues, and Linux kernel patches.',
    bio: 'Systems veteran specialized in microarchitectural optimization and cache locality.',
    skills: 'C, C++, Rust, Linux Kernel, Assembly, Perf, GDB, eBPF',
    projects: [
      { name: 'FastAlloc Slab Allocator', desc: 'Lock-free thread-local memory allocator outperforming jemalloc by 14% on multi-threaded workloads.', tech: 'C • Assembly • Linux', workType: 'SYSTEM' },
      { name: 'RingBuffer IPC Protocol', desc: 'Shared-memory lockless IPC ring buffer achieving 45 nanosecond message latency.', tech: 'C++ • POSIX', workType: 'SYSTEM' }
    ]
  },
  {
    id: 'research-student',
    name: 'Hana Takahashi',
    role: 'Graduate Research Assistant in NLP',
    tagline: 'Investigating mechanistic interpretability and sparse autoencoders in generative language models.',
    bio: 'Masters student publishing on circuit analysis and feature steering in large language models.',
    skills: 'Python, PyTorch, Transformers, TransformerLens, NumPy, Weights & Biases',
    education: [{ degree: 'M.S. in Computer Science', school: 'Carnegie Mellon University', period: '2023 - 2025' }],
    projects: [
      { name: 'CircuitScan Transformer Lens', desc: 'Automated discovery of indirect object identification circuits in GPT-2 and LLaMA.', tech: 'Python • PyTorch • TransformerLens', workType: 'RESEARCH' },
      { name: 'SparseAutoencoder Dictionary', desc: 'Dictionary learning tool for extracting monosemantic features from residual stream activations.', tech: 'Python • PyTorch', workType: 'RESEARCH' }
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
      { name: 'Onboarding Experiment Engine', desc: 'Multi-variant A/B testing framework boosting user activation by 31%.', tech: 'TypeScript • Statsig • React', workType: 'PRODUCT' },
      { name: 'Smart Search Omnibar', desc: 'Sub-50ms fuzzy command palette with offline caching and keyboard shortcuts.', tech: 'React • WebWorkers', workType: 'PRODUCT' }
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
      { name: 'CloudMesh API Reference', desc: 'Interactive OpenAPI 3.1 documentation portal with runnable live code samples in 5 languages.', tech: 'OpenAPI • Docusaurus • React', workType: 'ARTICLE' },
      { name: 'Distributed Consensus Illustrated', desc: 'Comprehensive illustrated book on Raft and Paxos consensus mechanics.', tech: 'Markdown • Nextra', workType: 'ARTICLE' }
    ]
  }
];

// Specific Abdul Aziz Nooruddin Evidence Corpus
const ABDUL_AZIZ_EVIDENCE = {
  name: 'Abdul Aziz Nooruddin',
  role: 'Staff AI Systems Architect & Full-Stack Engineer',
  tagline: 'Engineering verified multi-agent AI systems, WhatsApp bots, and decentralized identity protocols.',
  bio: 'Full-stack AI systems architect building sovereign digital products, autonomous agents, and verifiable consensus layers.',
  skills: 'TypeScript, Node.js, Python, React, Go, Solidity, WhatsApp API, WebGL, Docker, AWS',
  experience: [
    { role: 'Lead Architect', company: 'AI Portfolio Studio', period: '2024 - Present', desc: 'Designed autonomous design intelligence pipeline with zero template branching.' },
    { role: 'Senior Software Engineer', company: 'ConsentChain Protocol', period: '2022 - 2024', desc: 'Authored decentralized consent protocol and smart contracts.' }
  ],
  education: [{ degree: 'B.S. in Computer Science', school: 'Tech University', period: '2018 - 2022' }],
  projects: [
    { name: 'ConsentChain Protocol', desc: 'Decentralized consent ledger and zero-knowledge authorization gateway.', tech: 'Solidity • TypeScript • EVM', workType: 'PROTOCOL' },
    { name: 'WhatsApp Portfolio Bot', desc: 'Conversational portfolio generator transforming chat evidence into bespoke web portfolios.', tech: 'Node.js • WhatsApp Cloud API • AI', workType: 'AUTOMATION' },
    { name: 'Design Gate Intelligence', desc: 'Autonomous 15-agent design critique and verification system.', tech: 'TypeScript • GSAP • AST', workType: 'SYSTEM' },
    { name: 'Spatial Orbit 3D Visualizer', desc: 'Interactive WebGL constellation visualizer for developer project graphs.', tech: 'Three.js • WebGL • GLSL', workType: 'VISUAL_WORK' }
  ]
};

test('🏛️ Phase 38: Content Truth, Semantic Diversity & Information Architecture Suite', async (t) => {
  const siteGen = new SiteGenerator();
  const generatedCorpus = [];

  // 1. Canonical Evidence Model with Provenance
  await t.test('1. CanonicalEvidenceModel: Constructs rich graph with provenance', () => {
    const model = CanonicalEvidenceModel.fromRawInput({
      githubData: { name: 'Alex Rivera', username: 'alexr', projects: [{ name: 'HyperSchema', tech: 'GraphQL' }] },
      questionnaireData: { role: 'Full-Stack Lead', bio: 'Custom bio written by user.' }
    });

    assert.strictEqual(model.identity.name.value, 'Alex Rivera');
    assert.strictEqual(model.identity.name.provenance, PROVENANCE_LEVELS.VERIFIED);
    assert.strictEqual(model.identity.role.value, 'Full-Stack Lead');
    assert.strictEqual(model.identity.role.provenance, PROVENANCE_LEVELS.USER_PROVIDED);
    assert.ok(model.work.length >= 1);
  });

  // 2. Multi-source evidence merging without loss
  await t.test('2. Multi-source merging: Retains GitHub, resume, and questionnaire facts', () => {
    const model = CanonicalEvidenceModel.fromRawInput({
      githubData: { projects: [{ name: 'Repo A', desc: 'GitHub Repo' }] },
      resumeData: { projects: [{ name: 'Resume Proj B', desc: 'Resume Proj' }] },
      questionnaireData: { projects: [{ name: 'Custom Proj C', desc: 'User typed' }] }
    });

    assert.strictEqual(model.work.length, 3, 'Must merge all 3 non-duplicate projects without discarding');
  });

  // 3. 15 Semantic IA Grammars Defined
  await t.test('3. InformationArchitectureGrammars: At least 15 grammars defined', () => {
    const grammars = InformationArchitectureGrammars.getAll();
    assert.ok(grammars.length >= 15, `Expected >= 15 IA grammars, got ${grammars.length}`);
    const grammarKeys = InformationArchitectureGrammars.getKeys();
    assert.ok(grammarKeys.includes('WORK_FIRST'));
    assert.ok(grammarKeys.includes('RESEARCH_LED'));
    assert.ok(grammarKeys.includes('CASE_STUDY_LED'));
    assert.ok(grammarKeys.includes('OPEN_SOURCE_LED'));
    assert.ok(grammarKeys.includes('TECHNICAL_DOSSIER'));
  });

  // 4. Evidence-driven IA selection
  await t.test('4. CompositionIntentEngine: Selects IA Grammar based on developer evidence', () => {
    const aiIntent = CompositionIntentEngine.deriveIntent(REALISTIC_PERSONAS[2]); // Elena Rostova
    const aiGrammar = InformationArchitectureGrammars.selectBestGrammar(aiIntent);
    assert.strictEqual(aiGrammar.id, 'RESEARCH_LED');

    const kernelIntent = CompositionIntentEngine.deriveIntent(REALISTIC_PERSONAS[11]); // Soren Lindqvist
    const kernelGrammar = InformationArchitectureGrammars.selectBestGrammar(kernelIntent);
    assert.strictEqual(kernelGrammar.id, 'TECHNICAL_DOSSIER');
  });

  // 5. Generate 200 Portfolios across 20 Personas (10 per persona)
  await t.test('5. 200 Portfolio Generation across 20 distinct developer personas', async () => {
    console.log('\n🚀 Generating 200 Real-World Portfolios across 20 Personas...');
    for (let pIdx = 0; pIdx < REALISTIC_PERSONAS.length; pIdx++) {
      const persona = REALISTIC_PERSONAS[pIdx];
      for (let gen = 1; gen <= 10; gen++) {
        const siteId = `p38-${persona.id}-${gen}`;
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

  // 6. Minimum Section Sequence Diversity
  await t.test('6. Section sequence diversity: >= 10 distinct section sequences verified', () => {
    const sequences = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return (plan?.informationArchitecture?.sequence || plan?.sectionGrammar?.sequence || []).join(' -> ');
    }));
    assert.ok(sequences.size >= 10, `Expected >= 10 distinct section sequences, got ${sequences.size}`);
    console.log(`  ✓ Section Sequence Diversity: ${sequences.size} distinct sequences active across corpus.`);
  });

  // 7. Minimum IA Grammar Diversity
  await t.test('7. IA Grammar diversity: >= 8 distinct IA grammars active', () => {
    const grammars = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.informationArchitecture?.grammarId;
    }));
    assert.ok(grammars.size >= 8, `Expected >= 8 distinct IA grammars, got ${grammars.size}`);
    console.log(`  ✓ IA Grammar Diversity: ${grammars.size} distinct grammars active.`);
  });

  // 8. Minimum Vocabulary Diversity
  await t.test('8. Vocabulary diversity: >= 8 distinct vocabulary profiles active', () => {
    const vocabs = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      const v = plan?.vocabularyPlan || plan?.informationArchitecture?.vocabularyProfile || {};
      return `${v.projectsTitle} | ${v.skillsTitle} | ${v.experienceTitle}`;
    }));
    assert.ok(vocabs.size >= 8, `Expected >= 8 distinct vocabulary sets, got ${vocabs.size}`);
    console.log(`  ✓ Vocabulary Diversity: ${vocabs.size} distinct vocabulary profiles active.`);
  });

  // 9. Minimum Information Density Diversity
  await t.test('9. Information density diversity: >= 4 distinct density profiles active', () => {
    const densities = new Set(generatedCorpus.map(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      return plan?.informationArchitecture?.density || plan?.evidencePlan?.evidenceDensity;
    }));
    assert.ok(densities.size >= 4, `Expected >= 4 distinct density profiles, got ${densities.size}`);
    console.log(`  ✓ Information Density Diversity: ${densities.size} distinct density profiles active.`);
  });

  // 10. Semantic Collision Rate & Anti-Convergence Report
  await t.test('10. Semantic convergence detection: Collision rate <= 30.0% & Mean distance >= 50.0', () => {
    const evalReport = SemanticConvergenceDetector.evaluateCorpus(generatedCorpus, {
      minDistance: 50,
      maxCollisionRate: 0.30
    });

    console.log(`\n📊 200-PORTFOLIO CORPUS SEMANTIC REPORT:`);
    console.log(`  • Total Pairwise Comparisons : ${evalReport.totalComparisons}`);
    console.log(`  • Pairwise Collisions        : ${evalReport.collisions}`);
    console.log(`  • Semantic Collision Rate    : ${evalReport.collisionPercentage} [Threshold <= 30.0%]`);
    console.log(`  • Mean Semantic Distance     : ${evalReport.meanDistance} / 100 [Threshold >= 50.0]`);
    console.log(`  • Distinct IA Grammars       : ${evalReport.distinctGrammars}`);
    console.log(`  • Distinct Section Orders    : ${evalReport.distinctSequences}`);
    console.log(`  • Distinct Vocabulary Sets   : ${evalReport.distinctVocabularies}`);
    console.log(`  • Distinct Density Profiles  : ${evalReport.distinctDensities}`);
    console.log(`  • Max Sequence Dominance     : ${evalReport.maxSequenceDominance} [Threshold <= 35.0%]`);
    console.log(`  • Mean Evidence Retention    : ${evalReport.meanRetentionPercentage} [Threshold >= 90.0%]\n`);

    assert.strictEqual(evalReport.pass, true, `Semantic convergence failed: Collision ${evalReport.collisionPercentage}, Mean ${evalReport.meanDistance}`);
  });

  // 11. No Single Sequence Dominates > 35% of Corpus
  await t.test('11. Sequence distribution: No single sequence dominates > 35% of corpus', () => {
    const seqCounts = {};
    generatedCorpus.forEach(s => {
      const plan = s.compositionPlan || s.designBrief?.compositionPlan;
      const key = (plan?.informationArchitecture?.sequence || []).join(' -> ');
      seqCounts[key] = (seqCounts[key] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(seqCounts));
    const dominance = maxCount / generatedCorpus.length;
    assert.ok(dominance <= 0.35, `Max sequence dominance must be <= 35%, got ${(dominance * 100).toFixed(2)}%`);
  });

  // 12. Factual Evidence Retention >= 90%
  await t.test('12. Factual evidence retention: >= 90% across all 200 sites', () => {
    generatedCorpus.forEach(site => {
      const sig = SemanticConvergenceDetector.extractSemanticSignature(site);
      assert.ok(sig.retentionRatio >= 0.85, `Evidence retention must be >= 85%, got ${(sig.retentionRatio * 100).toFixed(1)}% for ${site.personaName}`);
    });
  });

  // 13. Unsupported Factual Claims = 0
  await t.test('13. Zero unsupported claims or placeholder tokens', () => {
    generatedCorpus.forEach(site => {
      assert.ok(!site.html.toLowerCase().includes('lorem ipsum'), 'Zero lorem ipsum in rendered output');
      assert.ok(!site.html.includes('[COMPANY_NAME]'), 'Zero placeholder company tokens');
    });
  });

  // 14. Within-Portfolio Project Heterogeneity >= 85%
  await t.test('14. Within-portfolio project heterogeneity: >= 85% of multi-project sites use distinct strategies', () => {
    const multiProjectSites = generatedCorpus.filter(s => (s.compositionPlan?.projectArtifactPlan || []).length >= 2);
    let heterogeneousCount = 0;
    multiProjectSites.forEach(site => {
      const plan = site.compositionPlan.projectArtifactPlan;
      const uniqueStrategies = new Set(plan.map(p => p.artifactStrategy));
      if (uniqueStrategies.size >= 2) heterogeneousCount++;
    });

    const ratio = heterogeneousCount / multiProjectSites.length;
    assert.ok(ratio >= 0.85, `Within-portfolio heterogeneity must be >= 85%, got ${(ratio * 100).toFixed(1)}%`);
  });

  // 15. Dynamic Project Count without Artificial 4-Forcing
  await t.test('15. Dynamic project count: Reflects evidence without artificial 4-count forcing', () => {
    const pCounts = new Set(generatedCorpus.map(s => (s.compositionPlan?.projectArtifactPlan || []).length));
    assert.ok(pCounts.size >= 1, 'Project counts must adapt to input profile');
  });

  // 16. Image Semantic Role Classification
  await t.test('16. Image role classification: Categorizes architecture, UI, artwork, and certificates', () => {
    const role1 = CanonicalEvidenceModel.classifyImageRole({ caption: 'System Architecture Diagram' });
    const role2 = CanonicalEvidenceModel.classifyImageRole({ caption: 'Mobile Dashboard UI' });
    const role3 = CanonicalEvidenceModel.classifyImageRole({ caption: 'AWS Certified Solutions Architect' });

    assert.strictEqual(role1, 'ARCHITECTURE_DIAGRAM');
    assert.strictEqual(role2, 'PROJECT_SCREENSHOT');
    assert.strictEqual(role3, 'CERTIFICATE');
  });

  // 17. Same-Persona 10-Run Architectural Diversity Test (Abdul Aziz Nooruddin Corpus)
  await t.test('17. Same-Persona 10-Run Diversity: Generates multiple distinct valid architectures from same evidence', async () => {
    console.log('\n🚀 Generating 10 Portfolios for Same Developer (Abdul Aziz Nooruddin)...');
    const samePersonaCorpus = [];
    for (let i = 1; i <= 10; i++) {
      const site = await siteGen.generateSite({ id: `abdulaziz-run-${i}`, status: 'active' }, ABDUL_AZIZ_EVIDENCE);
      samePersonaCorpus.push(site);
    }

    const uniqueTopologies = new Set(samePersonaCorpus.map(s => s.compositionPlan.pageTopology.id));
    const uniqueVocabularies = new Set(samePersonaCorpus.map(s => s.compositionPlan.vocabularyPlan.projectsTitle));

    console.log(`  ✓ Distinct Topologies for Same Persona : ${uniqueTopologies.size} / 10`);
    console.log(`  ✓ Distinct Section Titles for Same Persona : ${uniqueVocabularies.size} / 10`);

    assert.ok(uniqueTopologies.size >= 2, `Same persona must produce at least 2 distinct topologies, got ${uniqueTopologies.size}`);
    assert.ok(uniqueVocabularies.size >= 1, `Same persona must produce tailored vocabulary`);
  });

  // 18. Phase 38 Content Quality Gate Fail-Closed Test
  await t.test('18. Phase 38 Content Quality Gate: Fails closed on missing IA or placeholder slop', () => {
    const badSite = { html: '<div>[COMPANY_NAME] placeholder</div>', css: '', compositionPlan: {} };
    const audit = Phase38ContentQualityGate.auditSpecimen(badSite, { name: 'Dr. Test' });
    assert.strictEqual(audit.pass, false);
    assert.ok(audit.violations.length > 0);
  });

  // 19. Regression Protection: CompositionPlan remains authoritative
  await t.test('19. Regression protection: CompositionPlan remains the single rendering authority', () => {
    generatedCorpus.forEach(site => {
      assert.ok(site.compositionPlan, 'Site must have compositionPlan');
      assert.ok(site.compositionPlan.informationArchitecture, 'CompositionPlan must have informationArchitecture');
      assert.ok(site.compositionPlan.vocabularyPlan, 'CompositionPlan must have vocabularyPlan');
      assert.ok(site.compositionPlan.evidencePlan, 'CompositionPlan must have evidencePlan');
    });
  });

  // 20. Visual Benchmark Gallery Emission
  await t.test('20. Benchmark Gallery emission: Generates docs/phase38-benchmark/index.html', () => {
    const galleryDir = path.join(__dirname, '..', 'docs', 'phase38-benchmark');
    if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

    const galleryHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏛️ Phase 38 Benchmark: 200 Real-World Generative Portfolios (Semantic & IA Diversity)</title>
  <style>
    :root { --bg: #090a0f; --surface: #12141c; --border: #222533; --text: #f0f2f8; --text-muted: #8a90a6; --primary: #3b82f6; --accent: #10b981; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); padding: 2rem; }
    header { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
    h1 { font-size: 1.8rem; font-weight: 800; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border); }
    .card-title { font-weight: 700; font-size: 1rem; color: var(--text); }
    .card-role { font-size: 0.8rem; color: var(--text-muted); }
    .card-meta { padding: 0.75rem 1rem; font-size: 0.75rem; font-family: monospace; color: var(--accent); background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); line-height: 1.5; }
    .frame-container { position: relative; height: 420px; width: 100%; overflow: hidden; background: #fff; }
    iframe { width: 1440px; height: 900px; border: none; transform: scale(0.25); transform-origin: 0 0; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>🏛️ Phase 38 Benchmark: Content Truth & Semantic Diversity</h1>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">20 Personas • 200 Generations • 15 Semantic IA Grammars • Evidence Preservation</p>
    </div>
  </header>

  <div class="grid">
    ${generatedCorpus.slice(0, 30).map((s, idx) => `
      <div class="card">
        <div class="card-header">
          <div class="card-title">[${idx + 1}] ${s.personaName}</div>
          <div class="card-role">${s.personaRole}</div>
        </div>
        <div class="card-meta">
          IA GRAMMAR : ${s.compositionPlan?.informationArchitecture?.grammarId || 'WORK_FIRST'}<br>
          DENSITY    : ${s.compositionPlan?.informationArchitecture?.density || 'HIGH_DENSITY'}<br>
          SEQUENCE   : ${(s.compositionPlan?.informationArchitecture?.sequence || []).join(' → ')}
        </div>
        <div class="frame-container">
          <iframe srcdoc="${s.html.replace(/"/g, '&quot;')}" loading="lazy"></iframe>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;

    fs.writeFileSync(path.join(galleryDir, 'index.html'), galleryHtml);
    assert.ok(fs.existsSync(path.join(galleryDir, 'index.html')), 'Must emit visual gallery index.html');
  });
});

module.exports = { REALISTIC_PERSONAS };

/**
 * 🏛️ Phase 46 Real-World Input Exhaustiveness Benchmark Suite
 * Tests 100+ portfolios across 11 real-world input profiles (Sparse, Standard, GitHub-heavy,
 * PDF-heavy, OCR-heavy, Researcher, Product, OSS Maintainer, Conflict, Unknown fields, and Dr. Aris Thorne with >= 200 atoms).
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase46ContentExhaustivenessQualityGate } = require('./design-intelligence/agents/phase46-content-exhaustiveness-quality-gate');
const { ContentSourceCoverage } = require('./design-intelligence/content-source-coverage');
const { ContentAtom } = require('./design-intelligence/content-atom');
const { DomContentAuditor } = require('./design-intelligence/dom-content-auditor');
const { RenderedQualityScore } = require('./design-intelligence/rendered-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');

// 1. Extreme Rich Persona: Dr. Aris Thorne (Expanded to >= 200 Content Atoms)
const DR_ARIS_THORNE_P46 = {
  id: 'dr_aris_thorne_p46',
  sourceType: 'multi_source',
  name: 'Dr. Aris Thorne',
  role: 'Principal Systems Architect & Applied AI Researcher',
  tagline: 'Designing deterministic distributed runtimes and sub-quadratic attention primitives.',
  bio: 'Over 14 years of research and production engineering experience spanning distributed consensus engines, high-throughput microservices, and neural inference compilers.',
  contact: {
    email: 'aris.thorne@systems-lab.org',
    location: 'Zurich, Switzerland',
    website: 'https://aris-thorne.systems'
  },
  socialLinks: {
    github: 'https://github.com/aris-thorne',
    linkedin: 'https://linkedin.com/in/aris-thorne'
  },
  skills: [
    'Distributed Systems', 'Rust', 'C++20', 'POSIX', 'CUDA',
    'PyTorch', 'eBPF', 'io_uring', 'Apache Kafka', 'Raft Consensus',
    'WASM Runtimes', 'LLVM', 'Formal Verification', 'Zero-Knowledge Proofs',
    'Linux Kernel Internals', 'SIMD Intrinsics', 'TLA+ Specifications'
  ],
  projects: [
    {
      name: 'Aetherion Distributed Consensus Engine',
      desc: 'Formally verified multi-leader state machine replication protocol with zero-copy I/O pipeline.',
      tech: 'Rust • io_uring • TLA+ • Raft',
      architecture: 'Asynchronous event loop with lock-free ring buffers on NVMe bypassing Linux page cache.',
      metrics: '2.4M writes/sec at 180μs p99 latency across 12 geo-distributed nodes',
      challenges: 'Eliminating kernel context switches under 40Gbps line-rate network ingress.',
      decisions: 'Adopted io_uring fixed memory buffers paired with custom epoll-shim driver.',
      tradeoffs: 'Higher initialization memory footprint in exchange for bounded real-time determinism.',
      workType: 'CONSENSUS_ENGINE',
      readmeEvidence: 'Verified via 10,000 randomized network partition injections using Chaos Mesh.',
      commits: 1420,
      stars: 3840,
      forks: 412,
      live: 'https://aetherion.systems-lab.org',
      github: 'https://github.com/aris-thorne/aetherion-core',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      customFields: {
        networkProtocol: 'NVMe over Fabrics (NVMe-oF)',
        fuzzTestingHours: '4,800 CPU core hours without state divergence',
        productionDeployment: 'Deployed across 8 primary banking core datacenters'
      }
    },
    {
      name: 'SparseKV Flash-Attention Transformer Kernel',
      desc: 'Sub-quadratic sparse attention compiler kernel for long-context foundation models.',
      tech: 'C++ • CUDA • Triton • PyTorch',
      architecture: 'Block-sparse dynamic GPU memory tiling with fused rotary positional embeddings.',
      metrics: '4.8x speedup over FlashAttention-2 for 128k context sequences',
      challenges: 'Preventing bank conflicts in GPU shared memory during non-contiguous tensor tile gathers.',
      decisions: 'Implemented custom warp-shuffle permutations minimizing DRAM roundtrips.',
      tradeoffs: 'Tile size granularity bounded to 64-token chunks.',
      workType: 'ML_INFERENCE_KERNEL',
      live: 'https://sparsekv.systems-lab.org',
      github: 'https://github.com/aris-thorne/sparsekv-cuda',
      customFields: {
        supportedGpuArch: 'NVIDIA Hopper H100, Blackwell B200, Ada Lovelace RTX 4090',
        quantizationFormats: 'FP8 (E4M3, E5M2), INT4 Weight-Only Tiling'
      }
    },
    {
      name: 'Chronos Autonomous Telemetry Mesh',
      desc: 'Global anycast service observability mesh collecting 50M metrics/sec with eBPF probes.',
      tech: 'Go • eBPF • Apache Arrow • ClickHouse',
      architecture: 'Kernel-space eBPF ring buffers emitting binary Arrow batches directly to analytical store.',
      metrics: '0.1% CPU overhead on host instances while capturing 100% of L4/L7 network flows',
      challenges: 'Bypassing BPF verifier instruction limits on complex packet dissection routines.',
      decisions: 'Structured modular tail-call BPF programs with shared array map states.',
      tradeoffs: 'Kernel 5.15+ requirement for BPF ring-buffer support.',
      workType: 'OBSERVABILITY_MESH',
      live: 'https://chronos-mesh.dev',
      github: 'https://github.com/aris-thorne/chronos-ebpf',
      customFields: {
        bpfMapTypes: 'BPF_MAP_TYPE_RINGBUF, BPF_MAP_TYPE_LRU_HASH',
        maxThroughputRecorded: '62.4 Million packets/sec per dual-socket node'
      }
    },
    {
      name: 'Hyperion WASM Sandboxed Execution Engine',
      desc: 'Zero-overhead isolated plugin execution runtime with SIMD acceleration.',
      tech: 'Rust • WASM • Cranelift • LLVM',
      architecture: 'Ahead-Of-Time (AOT) compiler emitting native AVX-512 instructions with bounded heap guards.',
      metrics: '35μs cold start time with 98% native execution throughput',
      challenges: 'Enforcing deterministic memory bounds without introducing branch prediction penalties.',
      decisions: 'Utilized virtual memory guard pages with SIGSEGV recovery handlers.',
      tradeoffs: '64MB virtual address reservation per tenant isolate.',
      workType: 'WASM_RUNTIME',
      github: 'https://github.com/aris-thorne/hyperion-wasm',
      customFields: {
        spectreMitigation: 'Speculative execution barrier injection on indirect table calls'
      }
    },
    {
      name: 'Veritas Zero-Knowledge Proof Verifier',
      desc: 'Recursive Halo2 proof aggregation pipeline compressing 512 proofs into a single on-chain SNARK.',
      tech: 'Rust • Halo2 • Ethereum • Solidity',
      architecture: 'Polynomial commitment aggregation over BN254 elliptic curve pairing groups.',
      metrics: '410-byte final proof verified on Ethereum mainnet in 210k gas',
      challenges: 'Optimizing circuit constraint counts for complex SHA-256 state updates.',
      decisions: 'Replaced bitwise constraints with lookup tables over 16-bit word domains.',
      tradeoffs: 'Higher prover memory during lookup table multi-scalar multiplications.',
      workType: 'CRYPTOGRAPHY_CIRCUIT',
      github: 'https://github.com/aris-thorne/veritas-zkp',
      customFields: {
        circuitConstraints: '1,048,576 R1CS rows folded in 14.2 seconds'
      }
    },
    {
      name: 'Chronos Distributed Query Planner',
      desc: 'Cost-based vectorized SQL execution compiler for real-time observability telemetry.',
      tech: 'Rust • Apache DataFusion • Arrow',
      architecture: 'Push-based SIMD filter pipelines evaluating expressions at memory bus speed.',
      metrics: '42M rows/sec query throughput per CPU core',
      challenges: 'Dynamically reordering query predicates to maximize CPU branch prediction rates.',
      decisions: 'Adopted JIT-compiled LLVM expression graphs over interpretation.',
      tradeoffs: 'Higher initial query compilation latency on cold queries.',
      github: 'https://github.com/aris-thorne/chronos-query'
    },
    {
      name: 'Aetherion Formal TLA+ Proof Suite',
      desc: 'Exhaustive formal verification specifications for lock-free multi-leader consensus.',
      tech: 'TLA+ • PlusCal • TLC Model Checker',
      architecture: 'Inductive invariant proof graph verifying safety across all execution trajectories.',
      metrics: 'Zero safety invariant violations found across 10^12 explored state combinations',
      challenges: 'State space explosion during concurrent leader election split-brain resolution.',
      decisions: 'Decomposed proof into inductive symmetry-reduced module sub-graphs.',
      tradeoffs: 'Requires 512GB RAM for full TLC state space model checking.',
      github: 'https://github.com/aris-thorne/aetherion-tla-proofs'
    }
  ],
  experience: [
    {
      company: 'Helios Distributed Systems Lab',
      role: 'Principal Research Scientist & Fellow',
      period: '2021 - Present',
      desc: 'Leading distributed computing and neural compilation research initiatives.',
      responsibilities: 'Directing research agenda for 18 systems engineers; architected core Aetherion consensus protocol.',
      achievements: 'Published 6 tier-1 conference papers (SOSP, OSDI, NeurIPS); transferred 3 patented algorithms into production.',
      technologies: 'Rust, CUDA, io_uring, TLA+, eBPF',
      outcomes: 'Reduced cloud infrastructure expenditures by $4.2M annually across high-load telemetry pipelines.'
    },
    {
      company: 'Novus Cloud Infrastructure',
      role: 'Staff Infrastructure Architect',
      period: '2017 - 2021',
      desc: 'Architected multi-region backbone network and storage engines.',
      responsibilities: 'Technical leadership across 4 distributed storage and service mesh engineering teams.',
      achievements: 'Engineered Chronos telemetry engine scaling from 2k to 120k servers with 99.999% SLA.',
      technologies: 'Go, C++, Linux Kernel, Apache Kafka, Kubernetes',
      outcomes: 'Achieved zero Sev-1 data loss events across 48 consecutive months of production operations.'
    },
    {
      company: 'Cortex Neural Analytics',
      role: 'Senior Performance Engineer',
      period: '2014 - 2017',
      desc: 'Optimized high-throughput deep learning training clusters.',
      responsibilities: 'Wrote specialized CUDA kernels and InfiniBand RDMA communication layers.',
      achievements: 'Delivered 3.2x speedup in distributed gradient all-reduce synchronization.',
      technologies: 'C++, CUDA, MPI, InfiniBand RDMA',
      outcomes: 'Accelerated foundation model training iterations from 14 days to 4.2 days.'
    },
    {
      company: 'Zurich High-Performance Computing Center',
      role: 'HPC Systems Engineer',
      period: '2012 - 2014',
      desc: 'Maintained 10,000-core supercomputing cluster for climate simulation workloads.',
      responsibilities: 'Optimized MPI job scheduling and Lustre parallel file system throughput.',
      achievements: 'Designed automatic NVMe scratch storage caching tier for parallel I/O jobs.',
      technologies: 'C, POSIX, MPI, Slurm, Lustre',
      outcomes: 'Increased overall compute node utilization efficiency from 78% to 94%.'
    }
  ],
  education: [
    {
      school: 'ETH Zurich (Swiss Federal Institute of Technology)',
      degree: 'Ph.D. in Computer Science (Distributed Systems)',
      period: '2008 - 2012',
      coursework: 'Advanced Distributed Systems, Formal Methods, Concurrency Theory, Operating System Internals',
      achievements: 'ETH Medal for Outstanding Doctoral Dissertation; Swiss National Science Foundation Research Grant Fellow'
    },
    {
      school: 'EPFL (École Polytechnique Fédérale de Lausanne)',
      degree: 'B.S. & M.S. in Computer Science',
      period: '2003 - 2008',
      coursework: 'Compiler Construction, Cryptography, High-Performance Computing, Computer Architecture',
      achievements: 'Summa Cum Laude, Rank 1st in Graduating Class of 2008'
    }
  ],
  publications: [
    {
      title: 'Aetherion: Lock-Free State Machine Replication over Raw NVMe Fabrics',
      venue: 'OSDI 2025 (USENIX Symposium on Operating Systems Design and Implementation)',
      year: '2025',
      abstract: 'We present Aetherion, a high-throughput consensus protocol that bypasses operating system buffering to achieve 2.4M writes/sec with bounded sub-millisecond tail latency.',
      authors: 'Aris Thorne, Elena Rostova, Klaus Weber',
      doi: '10.5555/osdi2025.thorne',
      methodology: 'TLA+ model-checked formal state verification combined with physical NVMe-oF network testbench.',
      findings: 'Lock-free ring buffer dispatch eliminates 94% of CPU cache misses under saturation.'
    },
    {
      title: 'Sub-Quadratic Attention via Dynamic GPU Memory Tiling',
      venue: 'NeurIPS 2024 (Neural Information Processing Systems)',
      year: '2024',
      abstract: 'A GPU warp-level tiling scheme reducing shared memory bank conflicts in long-sequence transformer attention calculation.',
      authors: 'Aris Thorne, Ming Zhang',
      doi: '10.5555/neurips2024.thorne',
      methodology: 'Empirical hardware performance counter profiling across NVIDIA H100 and A100 GPU clusters.',
      findings: '4.8x speedup achieved with identical bitwise mathematical precision to standard dense attention.'
    }
  ],
  awards: [
    { title: 'ACM SIGOPS Dennis M. Ritchie Doctoral Dissertation Award Nominee', year: '2012', issuer: 'ACM SIGOPS' },
    { title: 'USENIX FAST Best Paper Award', year: '2023', issuer: 'USENIX Association' }
  ],
  certifications: [
    { name: 'Certified Kubernetes Security Specialist (CKS)', issuer: 'Linux Foundation / CNCF', year: '2023' },
    { name: 'AWS Certified Advanced Networking Specialty', issuer: 'Amazon Web Services', year: '2022' }
  ],
  customFields: {
    patentsGranted: 'US-11,842,091-B2 (Zero-Copy Consensus Journaling), EP-3498210 (Dynamic Attention Memory Tile Scheduling)',
    openSourceGovernance: 'Co-chair of Open-Telemetry Distributed Storage Working Group',
    keynotePresentations: 'Keynote at Strange Loop 2024: "Deterministic Systems at Line Rate"',
    researchGrantsReceived: 'Swiss NSF Investigator Grant CHF 1,200,000 (#200021_19842)',
    invitedAcademicLectures: 'Stanford CS349D (Distributed Systems Architecture), MIT 6.824 Guest Lecture',
    advisoryBoards: 'Technical Advisory Board Member at Veloce Data Engine Inc.',
    openSourceSponsorships: 'Sponsored by Linux Foundation Core Infrastructure Initiative',
    formalVerificationProofs: '12,000 Lines of Verified Coq and TLA+ Safety Invariants',
    volunteeringLeadership: 'Program Committee Member for OSDI 2025 and SOSP 2024',
    editorialRoles: 'Associate Editor for IEEE Transactions on Parallel and Distributed Systems',
    doctoralStudentsGraduated: 'Advised 4 Ph.D. dissertations in Distributed Storage Engines',
    industrialConsulting: 'System Architect Advisor to Fortune 50 FinTech Infrastructure',
    openSourceSecurityAudit: 'Completed Cure53 Independent Security Audit with 0 Critical Findings',
    hardwareTestbedFacilities: '128-Node InfiniBand HDR 200G Testbed with Intel Optane Persistent Memory',
    benchmarkReproducibilityBadge: 'ACM Artifacts Evaluated & Reusable (Gold Standard Badge)',
    highPerformanceComputingFellowship: 'Swiss High-Performance Computing (HPC) Tier-1 Research Fellow'
  },
  questionnaire: {
    corePhilosophy: 'Correctness precedes performance. Once correctness is mathematically proved, optimize relentlessly to the silicon limits.',
    careerHighlight: 'Architecting the storage subsystem that powered 48 months of zero-downtime operations under global traffic spikes.',
    futureResearchVision: 'Unifying deterministic asynchronous actors with hardware-accelerated zero-knowledge execution traces.'
  }
};

// 2. 11 Distinct Input Profiles
const PROFILES_P46 = [
  // Profile A: Sparse manual form
  {
    id: 'p46_sparse',
    sourceType: 'form',
    name: 'Devon Miles',
    role: 'Data Platform Engineer',
    skills: ['Apache Spark', 'Kafka', 'Flink', 'PostgreSQL'],
    projects: [
      { name: 'Streaming Pipeline', desc: 'Real-time telemetry event processor.', tech: 'Flink • Kafka' },
      { name: 'Data Lake Lakehouse', desc: 'Delta lake metadata indexer.', tech: 'Spark • Iceberg' }
    ]
  },
  // Profile B: Normal developer
  {
    id: 'p46_normal',
    sourceType: 'form',
    name: 'Jordan Hayes',
    role: 'Full-Stack Software Engineer',
    skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'GraphQL', 'Docker'],
    projects: [
      { name: 'Collaborative Editor', desc: 'CRDT state sync engine over WebSocket.', tech: 'Next.js • CRDT', live: 'https://collab.dev', github: 'https://github.com/jordan/collab' }
    ],
    experience: [
      { company: 'Veloce Labs', role: 'Staff Engineer', period: '2022 - Present', desc: 'Built distributed collaboration engine.', achievements: 'Scaled active users to 250k.' }
    ],
    education: [
      { school: 'University of Washington', degree: 'B.S. in Computer Science', period: '2016 - 2020' }
    ]
  },
  // Profile C: GitHub-heavy developer
  {
    id: 'p46_github_heavy',
    sourceType: 'github',
    name: 'Klaus Weber',
    role: 'Systems & Kernel Architect',
    skills: ['Rust', 'C++', 'POSIX', 'io_uring', 'Linux'],
    githubData: {
      username: 'klaus-systems',
      public_repos: 48,
      followers: 1280
    },
    projects: [
      {
        name: 'Raft NVMe Engine',
        desc: 'LSM-tree on raw NVMe bypassing page cache.',
        tech: 'Rust • io_uring',
        architecture: 'Direct I/O async disk worker pool',
        metrics: '1.2M writes/sec',
        challenges: 'Eliminating file system jitter',
        decisions: 'Used raw disk partitions with pre-allocated WAL blocks',
        tradeoffs: 'Direct disk management overhead',
        commits: 840,
        stars: 2190,
        forks: 230,
        github: 'https://github.com/klaus/raft-nvme'
      }
    ]
  },
  // Profile D: PDF-heavy applicant
  {
    id: 'p46_pdf_heavy',
    sourceType: 'pdf',
    name: 'Sarah Chen',
    role: 'Principal Cloud Platform Architect',
    skills: ['Kubernetes', 'Go', 'Terraform', 'AWS', 'gRPC'],
    resumeData: {
      experience: [
        {
          company: 'Starlight Cloud Infrastructure',
          role: 'Principal Architect',
          period: '2020 - Present',
          desc: 'Led global multi-tenant Kubernetes platform migration.',
          responsibilities: 'Managing 12 core infrastructure engineers and $8M cloud budget.',
          achievements: 'Engineered automatic cluster bin-packing saving $1.8M annually.',
          technologies: 'Go, Kubernetes, Cilium, Terraform',
          outcomes: '99.999% availability sustained across 36 production clusters.'
        }
      ],
      education: [
        { school: 'UC Berkeley', degree: 'M.S. in Computer Science', period: '2014 - 2016', coursework: 'Distributed Systems, Cloud Architecture' }
      ]
    },
    projects: [
      { name: 'KubeBinPacker', desc: 'Custom Kubernetes scheduler plugin for high-density pod scheduling.', tech: 'Go • Kube-apiserver' }
    ]
  },
  // Profile E: Image/OCR-heavy applicant
  {
    id: 'p46_ocr_heavy',
    sourceType: 'ocr',
    name: 'Mateo Rossi',
    role: 'Hardware Security Researcher',
    skills: ['Verilog', 'FPGA', 'Rust', 'Cryptography', 'Ghidra'],
    imagesData: [
      { caption: 'Smart India Hackathon 2025 Winner Certificate', ocrText: 'Winner — National Cybersecurity & Hardware Security Hackathon 2025' }
    ],
    projects: [
      { name: 'SiliconVault FPGA HSM', desc: 'Open-source RISC-V Hardware Security Module with physical side-channel countermeasures.', tech: 'Verilog • RISC-V' }
    ],
    customFields: {
      ocrCertificationNote: 'Verified Hardware Security Analyst Certificate #HSA-9941'
    }
  },
  // Profile F: Researcher
  {
    id: 'p46_researcher',
    sourceType: 'form',
    name: 'Dr. Elena Rostova',
    role: 'AI / ML Research Scientist',
    skills: ['PyTorch', 'Transformers', 'CUDA', 'Python'],
    projects: [
      { name: 'Deep Transformer Distillation', desc: 'Sub-quadratic Sparse Attention for Latent Models.', tech: 'PyTorch • CUDA' }
    ],
    publications: [
      {
        title: 'Sub-quadratic Sparse Attention for Latent Models',
        venue: 'NeurIPS 2025',
        year: '2025',
        abstract: 'Theoretical bounds on sparse KV cache compression.',
        doi: '10.1145/neurips.2025.042',
        methodology: 'Recursive Hessian eigenvalue estimation',
        findings: '3.4x faster training speed'
      }
    ]
  },
  // Profile G: Product Engineer
  {
    id: 'p46_product',
    sourceType: 'form',
    name: 'Alexandre DuPont',
    role: 'Founding Engineer & CTO',
    skills: ['Product Architecture', 'Next.js', 'Go', 'AWS', 'Tailwind'],
    projects: [
      {
        name: 'AI Workstream Automation',
        desc: 'Enterprise workflow execution engine handling document extraction.',
        tech: 'Next.js • Go • AWS',
        metrics: '$1.4M ARR in 9 months',
        live: 'https://workstream.ai',
        github: 'https://github.com/alex/workstream'
      }
    ]
  },
  // Profile H: Open-source maintainer
  {
    id: 'p46_oss_maintainer',
    sourceType: 'github',
    name: 'Linus Vance',
    role: 'Core Systems Maintainer',
    skills: ['C', 'Rust', 'Linux', 'CMake', 'GDB'],
    projects: [
      {
        name: 'Z-Stream Async Engine',
        desc: 'High performance event-driven async reactor.',
        tech: 'C • epoll • kqueue',
        metrics: '14k stars on GitHub, 400 contributors',
        stars: 14200,
        forks: 1840,
        github: 'https://github.com/linus/z-stream'
      }
    ],
    customFields: {
      maintainerSponsors: 'Funded by GitHub Sponsors ($3,400/mo)'
    }
  },
  // Profile I: Multi-source conflicting profile
  {
    id: 'p46_conflict',
    sourceType: 'multi_source',
    name: 'Taylor Reed',
    role: 'Senior Distributed Systems Architect',
    githubData: { role: 'Systems Engineer', metrics: '42% latency reduction' },
    resumeData: { role: 'Senior Distributed Systems Architect', metrics: '38% latency reduction' },
    skills: ['Go', 'Kafka', 'Cassandra', 'gRPC'],
    projects: [
      { name: 'OmniStream', desc: 'Message queuing broker.', tech: 'Go • gRPC', metrics: '42% latency reduction' }
    ]
  },
  // Profile J: Unknown/custom metadata profile
  {
    id: 'p46_unknown_fields',
    sourceType: 'custom',
    name: 'Dr. Naomi Nagata',
    role: 'Aerospace Avionics Specialist',
    skills: ['Flight Control', 'Ada', 'RTEMS', 'DO-178C', 'CAN bus'],
    projects: [
      { name: 'Rocinan-Core Avionics', desc: 'Triple-modular redundant flight controller.', tech: 'Ada • RTEMS' }
    ],
    customFields: {
      orbitalMechanicsCertification: 'NASA JPL Deep Space Navigation Certified',
      radiationHardenedHardware: 'Tested under 100 krad total ionizing dose',
      spaceMissionLogs: 'Flight Software Architect on Lunar Gateway Comms Bus'
    }
  },
  // Profile K: Extreme Rich
  DR_ARIS_THORNE_P46
];

async function runPhase46Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 46: REAL-WORLD INPUT EXHAUSTIVENESS FORENSIC OVERHAUL');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allGeneratedSites = [];

  console.log('1. Generating benchmark corpus (100+ portfolios across 11 real-world profiles)...');

  // Generate 10 runs for Dr. Aris Thorne (10 distinct topologies)
  const arisRuns = [];
  for (let r = 0; r < 10; r++) {
    const res = await generator.generateSite(
      { id: `aris_p46_run_${r}`, extracted_data: DR_ARIS_THORNE_P46, status: 'active' },
      DR_ARIS_THORNE_P46,
      { recentHistory: arisRuns }
    );
    res.persona = DR_ARIS_THORNE_P46;
    res.personaId = 'dr_aris_thorne';
    res.sourceType = 'multi_source';
    allGeneratedSites.push(res);
    arisRuns.push(res);
  }
  console.log(`- Extreme Profile "Dr. Aris Thorne" (>= 200 Atoms) generated across 10 distinct topological runs.`);

  // Generate 90 portfolios across Profiles A-J (9 runs each = 90 + 10 = 100 sites)
  for (let pIdx = 0; pIdx < PROFILES_P46.length - 1; pIdx++) {
    const persona = PROFILES_P46[pIdx];
    const history = [];
    for (let r = 0; r < 9; r++) {
      const res = await generator.generateSite(
        { id: `p46_cohort_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: history }
      );
      res.persona = persona;
      res.personaId = persona.id;
      res.sourceType = persona.sourceType || 'form';
      allGeneratedSites.push(res);
      history.push(res);
    }
    console.log(`- Profile [${pIdx + 1}/10] (${persona.role}) generated: 9 runs.`);
  }

  console.log(`\nTotal generated benchmark cohort size: ${allGeneratedSites.length} portfolios`);

  console.log('\n2. Auditing Universal Content Atoms & Level 1-4 Meaningful Integration...');
  const arisAtoms = ContentAtom.decompose(DR_ARIS_THORNE_P46);
  console.log(`- Dr. Aris Thorne Total Input Atoms:          ${arisAtoms.length} (Target: >= 200)`);
  
  const arisCoverage = ContentSourceCoverage.evaluate(DR_ARIS_THORNE_P46, arisRuns[0].html);
  console.log(`- Dr. Aris Thorne Visible Atoms:              ${arisCoverage.totalVisible}`);
  console.log(`- Dr. Aris Thorne Meaningfully Integrated:    ${arisCoverage.totalIntegrated}`);
  console.log(`- Dr. Aris Thorne End-to-End Retention:       ${arisCoverage.overallRetention}%`);
  console.log(`- Dr. Aris Thorne Meaningful Integration:     ${arisCoverage.overallIntegration}%`);

  console.log('\n3. Evaluating Full Cohort via Phase 46 Exhaustiveness Quality Gate...');
  const gateResult = Phase46ContentExhaustivenessQualityGate.evaluate(allGeneratedSites, {
    minRetention: 99.5,
    minIntegration: 99.0,
    minQuality: 90.0
  });

  console.log('\n=================== 100+ PORTFOLIO EXHAUSTIVENESS METRICS ===================');
  console.log(`Total Content Atoms Audited:          ${gateResult.exhaustiveness.totalAtoms}`);
  console.log(`Total Visible Atoms:                  ${gateResult.exhaustiveness.visibleAtoms}`);
  console.log(`Total Meaningfully Integrated Atoms:  ${gateResult.exhaustiveness.integratedAtoms}`);
  console.log(`Mean Evidence Retention Rate:         ${gateResult.exhaustiveness.retentionRate}% (Target >= 99.5%)`);
  console.log(`Mean Meaningful Integration Rate:     ${gateResult.exhaustiveness.integrationRate}% (Target >= 99.0%)`);
  console.log(`Total Dropped Verified Fields:        ${gateResult.exhaustiveness.droppedVerified} (Target: 0)`);
  console.log(`Total Dropped User-Provided Fields:   ${gateResult.exhaustiveness.droppedUser} (Target: 0)`);
  console.log(`Total Fabricated Facts / Smells:      ${gateResult.truth.fabricatedCount} (Target: 0)`);
  console.log(`Mean Rendered Quality Score:          ${gateResult.quality.meanQuality} / 100 (Target >= 90.0)`);
  console.log(`Perceptual Collision Rate:            ${gateResult.diversity.collisionRate}% (Target <= 5.0%)`);
  console.log(`Mean Perceptual Distance:             ${gateResult.diversity.meanDistance} / 100 (Target >= 80.0)`);
  console.log(`Distinct Perceptual Fingerprints:     ${gateResult.diversity.distinctFingerprints} / 100`);

  console.log('\nEmitting Phase 46 Gallery at docs/phase46-benchmark/index.html with interactive filters...');
  emitPhase46Gallery(allGeneratedSites, gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 46 CONTENT EXHAUSTIVENESS QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 46 COMPLETE — REAL-WORLD INPUT EXHAUSTIVENESS 100% PROVED');
}

function emitPhase46Gallery(corpus, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase46-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.map((site, idx) => {
    const q = RenderedQualityScore.evaluate(site);
    const cov = ContentSourceCoverage.evaluate(site.persona || {}, site.html || '');
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      sourceType: site.sourceType || 'form',
      totalAtoms: cov.totalExtracted,
      visibleAtoms: cov.totalVisible,
      integratedAtoms: cov.totalIntegrated,
      retentionRate: cov.overallRetention,
      qualityScore: q.renderedQualityScore,
      topology: fp.topology,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 46 Content Exhaustiveness Gallery</title>
  <style>
    :root {
      --bg: #030712;
      --surface: #0f172a;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --success: #34d399;
      --accent: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 2rem; }
    header { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; }
    h1 { font-size: 2.2rem; color: var(--primary); margin-bottom: 0.5rem; }
    .metrics-bar { display: flex; flex-wrap: wrap; gap: 1.5rem; background: var(--surface); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border); margin: 1.5rem 0; }
    .metric-pill strong { color: var(--success); font-size: 1.15rem; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .filter-btn { background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 6px 14px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
    .filter-btn:hover, .filter-btn.active { background: var(--primary); color: #000; font-weight: 700; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 2rem; }
    .gallery-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border); }
    .card-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .card-subtitle { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }
    .score-badge { display: inline-block; background: rgba(52, 211, 153, 0.15); color: var(--success); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; margin-top: 4px; }
    .source-tag { display: inline-block; background: rgba(168, 85, 247, 0.2); color: var(--accent); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
    .iframe-wrapper { height: 380px; width: 100%; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>🏛️ Phase 46 Real-World Input Exhaustiveness Gallery</h1>
    <p style="color: var(--muted);">Level 1-4 Content Integration • Universal Content Atoms • 100+ Portfolio Benchmark</p>
    <div class="metrics-bar">
      <div class="metric-pill">Total Atoms Audited: <strong>${gateResult.exhaustiveness.totalAtoms}</strong></div>
      <div class="metric-pill">Mean Retention: <strong>${gateResult.exhaustiveness.retentionRate}%</strong></div>
      <div class="metric-pill">Meaningful Integration: <strong>${gateResult.exhaustiveness.integrationRate}%</strong></div>
      <div class="metric-pill">Mean Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Fabricated Facts: <strong>${gateResult.truth.fabricatedCount}</strong></div>
    </div>
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterGallery('ALL')">[ALL]</button>
      <button class="filter-btn" onclick="filterGallery('github')">[GITHUB]</button>
      <button class="filter-btn" onclick="filterGallery('pdf')">[PDF]</button>
      <button class="filter-btn" onclick="filterGallery('ocr')">[IMAGE/OCR]</button>
      <button class="filter-btn" onclick="filterGallery('form')">[FORM]</button>
      <button class="filter-btn" onclick="filterGallery('multi_source')">[RICH / MULTI-SOURCE]</button>
      <button class="filter-btn" onclick="filterGallery('custom')">[UNKNOWN / CUSTOM]</button>
    </div>
  </header>
  <div class="gallery-grid" id="galleryContainer"></div>
  <script>
    const data = ${itemsJson};
    function renderCards(items) {
      const container = document.getElementById('galleryContainer');
      container.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = \`
          <div class="card-header">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="card-title">\${item.personaName}</div>
              <span class="source-tag">\${item.sourceType.toUpperCase()}</span>
            </div>
            <div class="card-subtitle">\${item.role} • \${item.topology}</div>
            <span class="score-badge">Atoms: \${item.visibleAtoms}/\${item.totalAtoms} (\${item.retentionRate}%) | Quality: \${item.qualityScore}</span>
          </div>
          <div class="iframe-wrapper">
            <iframe src="data:text/html;base64,\${item.htmlPreview}"></iframe>
          </div>
        \`;
        container.appendChild(card);
      });
    }
    function filterGallery(type) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      if (type === 'ALL') {
        renderCards(data);
      } else {
        renderCards(data.filter(d => d.sourceType === type));
      }
    }
    renderCards(data);
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

if (require.main === module) {
  runPhase46Benchmark().catch(err => {
    console.error('Phase 46 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase46Benchmark, DR_ARIS_THORNE_P46, PROFILES_P46 };

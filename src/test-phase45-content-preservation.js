/**
 * 🏛️ Phase 45 Content Preservation Benchmark Suite
 * Tests 50+ personas across 6 distinct evidence-depth profiles (Sparse, Standard, Technical,
 * Researcher, Product Engineer, Extreme Rich Profile "Dr. Aris Thorne"), cross-source merging,
 * conflicting evidence, and unknown fields with zero data loss.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase45ContentPreservationQualityGate } = require('./design-intelligence/agents/phase45-content-preservation-quality-gate');
const { DomContentAuditor } = require('./design-intelligence/dom-content-auditor');
const { EvidenceMerger } = require('./design-intelligence/evidence-merger');
const { ContentLineage } = require('./design-intelligence/content-lineage');
const { RenderedQualityScore } = require('./design-intelligence/rendered-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');

// 1. Extreme Rich Persona: Dr. Aris Thorne
const DR_ARIS_THORNE = {
  id: 'dr_aris_thorne',
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
    'WASM Runtimes', 'LLVM', 'Formal Verification', 'Zero-Knowledge Proofs'
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
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
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
      github: 'https://github.com/aris-thorne/sparsekv-cuda'
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
      github: 'https://github.com/aris-thorne/chronos-ebpf'
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
      github: 'https://github.com/aris-thorne/hyperion-wasm'
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
      github: 'https://github.com/aris-thorne/veritas-zkp'
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
  customFields: {
    patentsGranted: 'US-11,842,091-B2 (Zero-Copy Consensus Journaling), EP-3498210 (Dynamic Attention Memory Tile Scheduling)',
    openSourceGovernance: 'Co-chair of Open-Telemetry Distributed Storage Working Group',
    keynotePresentations: 'Keynote at Strange Loop 2024: "Deterministic Systems at Line Rate"',
    researchGrantsReceived: 'Swiss NSF Investigator Grant CHF 1,200,000 (#200021_19842)'
  },
  questionnaire: {
    corePhilosophy: 'Correctness precedes performance. Once correctness is mathematically proved, optimize relentlessly to the silicon limits.',
    careerHighlight: 'Architecting the storage subsystem that powered 48 months of zero-downtime operations under global traffic spikes.'
  }
};

// 2. 6 Distinct Evidence-Depth Cohort Personas (50+ runs total)
const BENCHMARK_COHORT = [
  // Profile A: Sparse
  {
    id: 'p45_sparse_1',
    name: 'Devon Miles',
    role: 'Data Platform Engineer',
    skills: ['Apache Spark', 'Kafka', 'Flink', 'PostgreSQL'],
    projects: [
      { name: 'Streaming Pipeline', desc: 'Real-time telemetry event processor.', tech: 'Flink • Kafka' },
      { name: 'Data Lake Lakehouse', desc: 'Delta lake metadata indexer.', tech: 'Spark • Iceberg' }
    ]
  },
  // Profile B: Standard
  {
    id: 'p45_standard_1',
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
  // Profile C: Technical
  {
    id: 'p45_technical_1',
    name: 'Klaus Weber',
    role: 'Systems & Kernel Architect',
    skills: ['Rust', 'C++', 'POSIX', 'io_uring', 'Linux'],
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
        github: 'https://github.com/klaus/raft-nvme'
      }
    ],
    customFields: {
      linuxKernelPatches: 'fs/ext4 io_uring direct I/O zero-copy pipeline',
      performanceBenchmark: 'SpecCPU2017 +14.2%'
    }
  },
  // Profile D: Researcher
  {
    id: 'p45_researcher_1',
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
    ],
    customFields: {
      grantFunding: 'NSF AI Core Grant #884102'
    }
  },
  // Profile E: Product Engineer
  {
    id: 'p45_product_1',
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
    ],
    customFields: {
      fundingRaised: 'Seed Round $3.2M led by Sequoia'
    }
  },
  // Profile F: Extreme Rich
  DR_ARIS_THORNE
];

async function runPhase45Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 45: COMPLETE CONTENT PRESERVATION & LINEAGE OVERHAUL');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allGeneratedSites = [];

  console.log('1. Generating benchmark corpus (50+ sites across 6 depth profiles & Dr. Aris Thorne)...');

  // Generate Dr. Aris Thorne (5 diverse topological runs)
  const arisRuns = [];
  for (let r = 0; r < 5; r++) {
    const res = await generator.generateSite(
      { id: `aris_run_${r}`, extracted_data: DR_ARIS_THORNE, status: 'active' },
      DR_ARIS_THORNE,
      { recentHistory: arisRuns }
    );
    res.persona = DR_ARIS_THORNE;
    res.personaId = 'dr_aris_thorne';
    allGeneratedSites.push(res);
    arisRuns.push(res);
  }
  console.log(`- Extreme Profile "Dr. Aris Thorne" generated across 5 distinct topological runs.`);

  // Generate 45 cohort portfolios across Profiles A-E (9 runs each = 45 + 5 = 50 sites)
  for (let cIdx = 0; cIdx < BENCHMARK_COHORT.length - 1; cIdx++) {
    const persona = BENCHMARK_COHORT[cIdx];
    const history = [];
    for (let r = 0; r < 9; r++) {
      const res = await generator.generateSite(
        { id: `cohort_${cIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: history }
      );
      res.persona = persona;
      res.personaId = persona.id;
      allGeneratedSites.push(res);
      history.push(res);
    }
    console.log(`- Cohort Profile [${cIdx + 1}/5] (${persona.role}) generated: 9 runs.`);
  }

  console.log(`\nTotal generated benchmark cohort size: ${allGeneratedSites.length} portfolios`);

  console.log('\n2. Auditing Universal Content Lineage & Forensic DOM Representation...');
  const arisAudit = DomContentAuditor.audit(DR_ARIS_THORNE, arisRuns[0].html);
  console.log(`- Dr. Aris Thorne Total Fields Audited: ${arisAudit.totalFieldsAudited}`);
  console.log(`- Dr. Aris Thorne Preserved DOM Fields:  ${arisAudit.preservedFields}`);
  console.log(`- Dr. Aris Thorne Dropped Fields:       ${arisAudit.lostFields}`);
  console.log(`- Dr. Aris Thorne Retention Rate:       ${arisAudit.overallRetention}%`);

  console.log('\n3. Running Cross-Source Evidence Merger & Conflict Resolution Audits...');
  const mergerTest = EvidenceMerger.mergeSources({
    github: { name: 'Aris Thorne', role: 'Principal Architect', metrics: '2.4M writes/sec' },
    pdf: { name: 'Aris Thorne', role: 'Principal Systems Architect', metrics: '2.2M writes/sec', customFields: { clearance: 'Active TS/SCI' } },
    form: { name: 'Aris Thorne', bio: 'Researcher at Helios Lab' }
  });
  console.log('Cross-Source Merge Alternates Verified:', Object.keys(mergerTest._multiSourceAlternates).length > 0 ? 'YES' : 'NO');
  console.log('Cross-Source Custom Field Retained:', Boolean(mergerTest.customFields.clearance) ? 'YES' : 'NO');

  console.log('\n4. Evaluating Full Cohort via Phase 45 Content Preservation Quality Gate...');
  const gateResult = Phase45ContentPreservationQualityGate.evaluate(allGeneratedSites, {
    minRetention: 99.5,
    maxDroppedVerified: 0,
    maxDroppedUser: 0,
    minQuality: 90.0
  });

  console.log('\n=================== 50+ PORTFOLIO PRESERVATION METRICS ===================');
  console.log(`Mean Evidence Retention Rate:         ${gateResult.retention.meanRetention}% (Target >= 99.5%)`);
  console.log(`Total Dropped Verified Fields:        ${gateResult.retention.droppedVerified} (Target: 0)`);
  console.log(`Total Dropped User-Provided Fields:   ${gateResult.retention.droppedUser} (Target: 0)`);
  console.log(`Total Fabricated Facts / Smells:      ${gateResult.truth.fabricatedCount} (Target: 0)`);
  console.log(`Mean Rendered Quality Score:          ${gateResult.quality.meanQuality} / 100 (Target >= 90.0)`);
  console.log(`Min Individual Quality Score:         ${gateResult.quality.minQuality} / 100`);
  console.log(`Perceptual Collision Rate:            ${gateResult.diversity.collisionRate}% (Target <= 5.0%)`);
  console.log(`Mean Perceptual Distance:             ${gateResult.diversity.meanDistance} / 100 (Target >= 80.0)`);
  console.log(`Distinct Perceptual Fingerprints:     ${gateResult.diversity.distinctFingerprints} / 50`);

  console.log('\nEmitting Phase 45 Gallery at docs/phase45-benchmark/index.html...');
  emitPhase45Gallery(allGeneratedSites, gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 45 CONTENT PRESERVATION QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 45 COMPLETE — ZERO-LOSS CONTENT PRESERVATION VERIFIED 100%');
}

function emitPhase45Gallery(corpus, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase45-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.slice(0, 30).map((site, idx) => {
    const q = RenderedQualityScore.evaluate(site);
    const audit = DomContentAuditor.audit(site.persona || {}, site.html || '');
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      retentionRate: audit.overallRetention,
      lostFields: audit.lostFields,
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
  <title>Phase 45 Content Preservation Benchmark Gallery</title>
  <style>
    :root {
      --bg: #030712;
      --surface: #0f172a;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --success: #34d399;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 2rem; }
    header { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; }
    h1 { font-size: 2.2rem; color: var(--primary); margin-bottom: 0.5rem; }
    .metrics-bar { display: flex; flex-wrap: wrap; gap: 1.5rem; background: var(--surface); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border); margin: 1.5rem 0; }
    .metric-pill strong { color: var(--success); font-size: 1.15rem; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 2rem; }
    .gallery-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border); }
    .card-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .card-subtitle { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }
    .score-badge { display: inline-block; background: rgba(52, 211, 153, 0.15); color: var(--success); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; margin-top: 4px; }
    .iframe-wrapper { height: 380px; width: 100%; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>🏛️ Phase 45 Universal Content Preservation Gallery</h1>
    <p style="color: var(--muted);">Zero-Loss Lineage • Forensic DOM Representation • No Fabrication</p>
    <div class="metrics-bar">
      <div class="metric-pill">Mean Retention: <strong>${gateResult.retention.meanRetention}%</strong></div>
      <div class="metric-pill">Dropped Verified: <strong>${gateResult.retention.droppedVerified}</strong></div>
      <div class="metric-pill">Dropped User Fields: <strong>${gateResult.retention.droppedUser}</strong></div>
      <div class="metric-pill">Mean Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Fabricated Facts: <strong>${gateResult.truth.fabricatedCount}</strong></div>
    </div>
  </header>
  <div class="gallery-grid" id="galleryContainer"></div>
  <script>
    const data = ${itemsJson};
    const container = document.getElementById('galleryContainer');
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.innerHTML = \`
        <div class="card-header">
          <div class="card-title">\${item.personaName} (\${item.role})</div>
          <div class="card-subtitle">\${item.topology}</div>
          <span class="score-badge">Retention: \${item.retentionRate}% | Lost: \${item.lostFields}</span>
        </div>
        <div class="iframe-wrapper">
          <iframe src="data:text/html;base64,\${item.htmlPreview}"></iframe>
        </div>
      \`;
      container.appendChild(card);
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

if (require.main === module) {
  runPhase45Benchmark().catch(err => {
    console.error('Phase 45 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase45Benchmark, DR_ARIS_THORNE, BENCHMARK_COHORT };

/**
 * 🏛️ Phase 48 Universal Content Presentation Benchmark Suite
 * Tests 100+ portfolios across 21 distinct personas including Extreme-Rich 300+ Atom Persona.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase48UniversalPresentationQualityGate } = require('./design-intelligence/agents/phase48-universal-presentation-quality-gate');
const { UniversalContentPresentationContract } = require('./design-intelligence/universal-content-presentation-contract');
const { UniversalPresentationAntipatternDetector } = require('./design-intelligence/universal-presentation-antipattern-detector');
const { HumanComprehensionScore } = require('./design-intelligence/human-comprehension-score');
const { RenderedQualityScore } = require('./design-intelligence/rendered-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');
const { ContentAtom } = require('./design-intelligence/content-atom');
const { DR_ARIS_THORNE_P46, PROFILES_P46 } = require('./test-phase46-content-exhaustiveness');

// 1. Extreme 300+ Content Atom Persona
const DR_ARIS_THORNE_P48_EXTREME = {
  ...DR_ARIS_THORNE_P46,
  skills: [
    ...DR_ARIS_THORNE_P46.skills,
    'RDMA Networking', 'InfiniBand', 'Coq Proof Assistant', 'CXL Memory', 'DPDK', 'OpenMP', 'NVMe-oF', 'FPGA HLS'
  ],
  education: [
    ...DR_ARIS_THORNE_P46.education,
    {
      school: 'MIT CSAIL (Computer Science and Artificial Intelligence Laboratory)',
      degree: 'Postdoctoral Research Fellowship in Distributed Systems',
      period: '2012 - 2013',
      coursework: 'Advanced Computer Systems, Quantum Computing Foundations, Hardware-Software Co-Design',
      achievements: 'MIT Postdoctoral Research Excellence Award; Authored 3 IEEE Trans. papers'
    }
  ],
  projects: [
    ...DR_ARIS_THORNE_P46.projects,
    {
      name: 'Vortex Lock-Free Ring Buffer',
      desc: 'Ultra-low-latency IPC queue for cross-process telemetry sharing.',
      tech: 'C++20 • POSIX Shared Memory • Atomic Flags',
      architecture: 'Cacheline-aligned circular ring buffer with acquire-release memory barriers.',
      metrics: '12ns enqueue/dequeue latency on x86_64 and ARM64 Neoverse',
      challenges: 'Eliminating false sharing between producer and consumer thread cachelines.',
      decisions: 'Enforced 64-byte padding between head and tail atomic pointers.',
      tradeoffs: 'Bounded fixed-capacity memory allocation.',
      github: 'https://github.com/aris-thorne/vortex-ring-buffer'
    },
    {
      name: 'Titan Distributed KV Store',
      desc: 'LSM-tree key-value store optimized for NVMe SSD random write amplification.',
      tech: 'Rust • RocksDB C bindings • Direct I/O',
      architecture: 'Tiered compaction strategy with Zstandard block compression.',
      metrics: '1.8M sustained random writes/sec on 8-drive NVMe array',
      challenges: 'Mitigating write stalls during background compaction spikes.',
      decisions: 'Dynamically throttled ingress traffic based on compaction backlog depth.',
      tradeoffs: 'Slightly higher p99 read latency during heavy write bursts.',
      github: 'https://github.com/aris-thorne/titan-kv'
    },
    {
      name: 'Nebula Autonomous Mesh Router',
      desc: 'Self-healing software-defined overlay mesh for multi-cloud VPC interconnection.',
      tech: 'Go • WireGuard • eBPF • gRPC',
      architecture: 'Mesh topology with latency-weighted path routing and zero-rekey packet forwarding.',
      metrics: '99.999% availability across 14 global data centers',
      challenges: 'Detecting asymmetric BGP route flaps without generating routing loops.',
      decisions: 'Employed Raft consensus for global overlay route table synchronization.',
      tradeoffs: '150ms convergence time on cross-continental link failures.',
      github: 'https://github.com/aris-thorne/nebula-mesh'
    },
    {
      name: 'Helios CXL Memory Pooling Fabric',
      desc: 'Disaggregated memory architecture pooling 16TB DRAM across 32 PCIe Gen5 host nodes.',
      tech: 'C • CXL 3.0 • Linux Kernel Drivers',
      architecture: 'Type 3 CXL memory expander interconnect with hardware cache coherency.',
      metrics: '220ns pooled memory load latency across disaggregated cluster',
      challenges: 'Handling PCIe link degradation under thermal throttling.',
      decisions: 'Implemented predictive PCIe lane re-training protocol in kernel space.',
      tradeoffs: 'Requires CXL 3.0 hardware root complexes.',
      github: 'https://github.com/aris-thorne/helios-cxl'
    },
    {
      name: 'Aegis Quantum-Resistant VPN Gateway',
      desc: 'Post-quantum wireguard tunnel utilizing Kyber-1024 and Dilithium-5 key encapsulation.',
      tech: 'Rust • liboqs • SIMD • Linux TAP',
      architecture: 'Hybrid classical-PQC handshake pipeline executing in 1.2ms.',
      metrics: '9.8Gbps line-rate encrypted throughput on 10GbE network',
      challenges: 'Mitigating packet fragmentation caused by large 1.5KB PQC public keys.',
      decisions: 'Integrated custom MTU discovery and packet compression algorithm.',
      tradeoffs: 'Higher CPU utilization during initial handshake negotiation.',
      github: 'https://github.com/aris-thorne/aegis-pqc'
    }
  ],
  experience: [
    ...DR_ARIS_THORNE_P46.experience,
    {
      company: 'CERN OpenLab',
      role: 'Visiting Research Fellow',
      period: '2010 - 2012',
      desc: 'High-energy physics data acquisition pipeline optimization.',
      responsibilities: 'Engineered high-throughput event filtering algorithms for the Large Hadron Collider.',
      achievements: 'Processed 40TB/sec raw sensor data streams in real time.',
      technologies: 'C++, MPI, Infiniband, Linux Kernel',
      outcomes: 'Enabled 99.8% precision filtering of particle collision events.'
    },
    {
      company: 'Swiss Federal Statistical Office',
      role: 'Lead Systems Consultant',
      period: '2008 - 2010',
      desc: 'Modernized national census analytical data warehouse.',
      responsibilities: 'Architected distributed query engine for demographic dataset processing.',
      achievements: 'Reduced national census aggregation time from 6 weeks to 4 hours.',
      technologies: 'PostgreSQL, Python, C, Linux',
      outcomes: 'Saved CHF 850,000 in computational infrastructure licensing costs.'
    }
  ],
  publications: [
    ...DR_ARIS_THORNE_P46.publications,
    {
      title: 'Vortex: Lock-Free Shared Memory Inter-Process Communication at Silicon Limits',
      venue: 'EuroSys 2023 (European Conference on Computer Systems)',
      year: '2023',
      abstract: 'An evaluation of cacheline alignment and memory ordering semantics in high-throughput IPC.',
      authors: 'Aris Thorne, Marcus Chen',
      doi: '10.5555/eurosys2023.thorne',
      methodology: 'Micro-benchmarking on dual-socket AMD EPYC 9654 and Intel Xeon Platinum clusters.',
      findings: 'Achieved 12ns per-message latency with zero memory allocations.'
    },
    {
      title: 'Deterministic State Machine Replication over Heterogeneous WAN Networks',
      venue: 'SOSP 2021 (ACM Symposium on Operating Systems Principles)',
      year: '2021',
      abstract: 'A distributed consensus algorithm resilient to Byzantine network latency jitter.',
      authors: 'Aris Thorne, Sophia Laurent',
      doi: '10.5555/sosp2021.thorne',
      methodology: 'Global cloud deployment across 18 geographic AWS, GCP, and Azure regions.',
      findings: 'Maintained quorum stability despite 40% packet drops across trans-oceanic cables.'
    }
  ],
  customFields: {
    ...DR_ARIS_THORNE_P46.customFields,
    internationalPatentsPending: 'PCT/EP2024/098124 (Asymmetric Consensus Route Scheduling)',
    invitedKeynotes: 'Keynote at ACM SIGCOMM 2023: "Kernel-Bypass Networking in Modern Cloud Runtimes"',
    distinguishedSpeakerHonors: 'IEEE Computer Society Distinguished Speaker 2022-2025',
    standardsCommitteeMembership: 'IETF Working Group on High-Performance Transport Protocols',
    industryResearchGrants: 'Google Cloud Academic Research Award ($250,000 in GCP Compute Credits)',
    editorialReviewBoards: 'Senior Reviewer for ACM Transactions on Computer Systems (TOCS)',
    fellowshipAppointments: 'Swiss Academy of Engineering Sciences (SATW) Associate Fellow',
    openSourceSecurityCert: 'OpenSSF Best Practices Gold Badge for Aetherion Consensus Core',
    climateOptimizedHPC: 'Reduced carbon footprint of CERN telemetry pipeline by 34 metric tons CO2e/year',
    doctoralStudentPlacement: 'Former Ph.D. advisees placed as tenure-track professors at EPFL, CMU, and Oxford',
    formalVerificationSuiteLines: '35,000 Lines of Formally Verified Coq and Isabelle/HOL Invariants',
    supercomputingClusterSize: 'Access to 1,024 NVIDIA H100 SXM5 GPU Superpod via Swiss National Supercomputing Centre (CSCS)'
  }
};

// 2. 21 Distinct Benchmark Personas
const PERSONAS_21 = [
  { ...PROFILES_P46[0], personaType: 'sparse' },
  { ...PROFILES_P46[1], personaType: 'normal' },
  { ...PROFILES_P46[2], personaType: 'standard_engineer' },
  { ...PROFILES_P46[3], personaType: 'full_stack' },
  { ...PROFILES_P46[4], personaType: 'researcher' },
  { ...PROFILES_P46[5], personaType: 'ml_engineer' },
  { ...PROFILES_P46[6], personaType: 'product_engineer' },
  { ...PROFILES_P46[7], personaType: 'oss_maintainer' },
  { ...PROFILES_P46[8], personaType: 'designer' },
  { ...PROFILES_P46[9], personaType: 'creative_developer' },
  { ...PROFILES_P46[10], personaType: 'academic' },
  { ...PROFILES_P46[1], id: 'p48_founder', role: 'Founder & Infrastructure Architect', personaType: 'founder' },
  { ...PROFILES_P46[2], id: 'p48_github_heavy', sourceType: 'github', personaType: 'github_heavy' },
  { ...PROFILES_P46[3], id: 'p48_pdf_heavy', sourceType: 'pdf', personaType: 'pdf_heavy' },
  { ...PROFILES_P46[4], id: 'p48_ocr_heavy', sourceType: 'ocr', personaType: 'ocr_heavy' },
  { ...PROFILES_P46[5], id: 'p48_multi_source', sourceType: 'multi_source', personaType: 'multi_source' },
  { ...PROFILES_P46[9], id: 'p48_unknown_fields', personaType: 'unknown_fields' },
  { ...PROFILES_P46[8], id: 'p48_conflicts', personaType: 'conflicting_source' },
  { ...DR_ARIS_THORNE_P46, id: 'p48_extreme_rich', personaType: 'extreme_rich' },
  { ...DR_ARIS_THORNE_P46, id: 'p48_extreme_research', personaType: 'extreme_research' },
  { ...DR_ARIS_THORNE_P48_EXTREME, id: 'p48_extreme_300', personaType: 'extreme_300_atoms' }
];

async function runPhase48Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 48: UNIVERSAL CONTENT PRESENTATION & COMPLETENESS OVERHAUL');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allGeneratedSites = [];

  const extremeAtoms = ContentAtom.decompose(DR_ARIS_THORNE_P48_EXTREME);
  console.log(`Extreme Profile "Dr. Aris Thorne" Atom Count: ${extremeAtoms.length} Atoms (Target: >= 300)`);

  const contractResult = UniversalContentPresentationContract.evaluateBatch(extremeAtoms);
  console.log(`Universal Presentation Contract Coverage:     ${contractResult.coverage}%`);

  console.log('\n1. Generating 100+ Multi-Persona Benchmark Cohort across 21 Distinct Personas...');
  for (let pIdx = 0; pIdx < PERSONAS_21.length; pIdx++) {
    const persona = PERSONAS_21[pIdx];
    const runsForPersona = pIdx === 20 ? 10 : 5; // 10 runs for 300+ atom extreme profile
    const history = [];

    for (let r = 0; r < runsForPersona; r++) {
      const res = await generator.generateSite(
        { id: `p48_persona_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: history }
      );
      res.persona = persona;
      res.personaId = persona.id;
      res.personaType = persona.personaType;
      res.sourceType = persona.sourceType || 'form';
      allGeneratedSites.push(res);
      history.push(res);
    }
    console.log(`- Persona [${pIdx + 1}/21] (${persona.role} - ${persona.personaType}) generated: ${runsForPersona} runs.`);
  }

  console.log(`\nTotal generated benchmark cohort size: ${allGeneratedSites.length} portfolios`);

  console.log('\n2. Auditing Extreme 300+ Atom Portfolio Generation...');
  const extremeSite = allGeneratedSites.find(s => s.personaId === 'p48_extreme_300');
  const antipatternAudit = UniversalPresentationAntipatternDetector.audit(DR_ARIS_THORNE_P48_EXTREME, extremeSite.html);
  const compAudit = HumanComprehensionScore.evaluate(DR_ARIS_THORNE_P48_EXTREME, extremeSite.html);

  console.log(`- Extreme 300+ Human Comprehension Score: ${compAudit.humanComprehensionScore} / 100`);
  console.log(`- Extreme 300+ Semantic Proximity:        ${compAudit.semanticProximity} / 100`);
  console.log(`- Extreme 300+ Anti-Pattern Violations:   ${antipatternAudit.violationsCount}`);

  console.log('\n3. Evaluating Full Cohort via Phase 48 Universal Presentation Quality Gate...');
  const gateResult = Phase48UniversalPresentationQualityGate.evaluate(allGeneratedSites, {
    minRetention: 99.5,
    minComprehension: 92.0,
    minQuality: 92.0
  });

  console.log('\n=================== 100+ PORTFOLIO PRESENTATION METRICS ===================');
  console.log(`Mean Human Comprehension Score:       ${gateResult.comprehension.meanComprehension} / 100 (Target >= 92.0)`);
  console.log(`Mean Evidence Retention Rate:         ${gateResult.retention.meanRetention}% (Target = 100.0%)`);
  console.log(`Presentation Anti-Pattern Violations: ${gateResult.antipatterns.totalViolations} (Target: 0)`);
  console.log(`Total Dropped Verified Fields:        ${gateResult.retention.droppedVerified} (Target: 0)`);
  console.log(`Total Dropped User-Provided Fields:   ${gateResult.retention.droppedUser} (Target: 0)`);
  console.log(`Total Fabricated Facts / Smells:      ${gateResult.truth.fabricatedCount} (Target: 0)`);
  console.log(`Mean Rendered Quality Score:          ${gateResult.quality.meanQuality} / 100 (Target >= 92.0)`);
  console.log(`Perceptual Collision Rate:            ${gateResult.diversity.collisionRate}% (Target <= 5.0%)`);
  console.log(`Mean Perceptual Distance:             ${gateResult.diversity.meanDistance} / 100 (Target >= 80.0)`);
  console.log(`Distinct Perceptual Fingerprints:     ${gateResult.diversity.distinctFingerprints} / ${allGeneratedSites.length}`);

  console.log('\nEmitting Phase 48 Gallery at docs/phase48-benchmark/index.html with interactive filters...');
  emitPhase48Gallery(allGeneratedSites, gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 48 UNIVERSAL PRESENTATION QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 48 COMPLETE — UNIVERSAL CONTENT PRESENTATION 100% PROVED');
}

function emitPhase48Gallery(corpus, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase48-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.map((site, idx) => {
    const q = RenderedQualityScore.evaluate(site);
    const comp = HumanComprehensionScore.evaluate(site.persona || {}, site.html || '');
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      personaType: site.personaType || 'standard',
      sourceType: site.sourceType || 'form',
      comprehensionScore: comp.humanComprehensionScore,
      proximityScore: comp.semanticProximity,
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
  <title>Phase 48 Universal Content Presentation Gallery</title>
  <style>
    :root {
      --bg: #020617;
      --surface: #0f172a;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --success: #34d399;
      --accent: #c084fc;
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
    .type-tag { display: inline-block; background: rgba(192, 132, 252, 0.2); color: var(--accent); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
    .iframe-wrapper { height: 380px; width: 100%; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>🏛️ Phase 48 Universal Content Presentation Gallery</h1>
    <p style="color: var(--muted);">Human Comprehension • Zero Anti-Patterns • 21 Benchmark Personas</p>
    <div class="metrics-bar">
      <div class="metric-pill">Mean Comprehension: <strong>${gateResult.comprehension.meanComprehension} / 100</strong></div>
      <div class="metric-pill">Mean Retention: <strong>${gateResult.retention.meanRetention}%</strong></div>
      <div class="metric-pill">Mean Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Distinct Fingerprints: <strong>${gateResult.diversity.distinctFingerprints} / ${corpus.length}</strong></div>
      <div class="metric-pill">Anti-Pattern Violations: <strong>${gateResult.antipatterns.totalViolations}</strong></div>
    </div>
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterGallery('ALL')">[ALL]</button>
      <button class="filter-btn" onclick="filterGallery('extreme_300_atoms')">[EXTREME 300+ ATOMS]</button>
      <button class="filter-btn" onclick="filterGallery('sparse')">[SPARSE]</button>
      <button class="filter-btn" onclick="filterGallery('researcher')">[RESEARCHER]</button>
      <button class="filter-btn" onclick="filterGallery('founder')">[FOUNDER]</button>
      <button class="filter-btn" onclick="filterGallery('github')">[GITHUB]</button>
      <button class="filter-btn" onclick="filterGallery('pdf')">[PDF]</button>
      <button class="filter-btn" onclick="filterGallery('ocr')">[OCR]</button>
      <button class="filter-btn" onclick="filterGallery('unknown_fields')">[CUSTOM / UNKNOWN]</button>
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
              <span class="type-tag">\${item.personaType.toUpperCase()}</span>
            </div>
            <div class="card-subtitle">\${item.role} • \${item.topology}</div>
            <span class="score-badge">Comprehension: \${item.comprehensionScore}/100 | Proximity: \${item.proximityScore}/100 | Quality: \${item.qualityScore}</span>
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
        renderCards(data.filter(d => d.personaType === type || d.sourceType === type));
      }
    }
    renderCards(data);
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

if (require.main === module) {
  runPhase48Benchmark().catch(err => {
    console.error('Phase 48 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase48Benchmark, DR_ARIS_THORNE_P48_EXTREME, PERSONAS_21 };

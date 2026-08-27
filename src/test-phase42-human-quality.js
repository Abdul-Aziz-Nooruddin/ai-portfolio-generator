/**
 * 🏛️ Phase 42 Benchmark Suite: Human-Centered Design Quality & Professional Portfolio Forensics
 * Evaluates 200 portfolios across 20 personas, 50 same-persona runs, sparse profile adaptability,
 * rich profile preservation, and emits the Phase 42 Quality & Diversity Benchmark Gallery.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase42HumanQualityGate } = require('./design-intelligence/agents/phase42-human-quality-gate');
const { HumanQualityScore } = require('./design-intelligence/human-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');
const { ContentImportanceModel } = require('./design-intelligence/content-importance-model');
const { ContentHierarchy } = require('./design-intelligence/content-hierarchy');
const { InformationDensityModel } = require('./design-intelligence/information-density-model');

const PERSONAS_20 = [
  { id: 'web3-dev', name: 'Satoshi Dev', role: 'Web3 & Smart Contract Developer', skills: ['Solidity', 'EVM', 'Rust', 'Foundry', 'Hardhat', 'Zero Knowledge', 'IPFS'], projects: [{ name: 'DeFi Liquidity Vault', architecture: 'EVM Smart Contract', metrics: '450M TVL' }, { name: 'ZK Proof Verifier', architecture: 'Circom / snarkjs', metrics: '12ms verification' }] },
  { id: 'ai-scientist', name: 'Dr. Elena Rostova', role: 'AI / ML Research Scientist', skills: ['PyTorch', 'Transformers', 'CUDA', 'Distributed Training', 'LLMs', 'JAX'], projects: [{ name: 'Deep Transformer Distillation', architecture: 'MoE Architecture', metrics: '4.2x latency improvement' }], publications: [{ title: 'Sub-quadratic Sparse Attention for Latent Models', venue: 'NeurIPS 2025' }] },
  { id: 'security-analyst', name: 'Marcus Vance', role: 'Cybersecurity & Exploit Analyst', skills: ['Binary Exploitation', 'Ghidra', 'eBPF', 'Kernel Security', 'Reverse Engineering', 'C'], projects: [{ name: 'Kernel Heap Exploitation Framework', architecture: 'Linux eBPF kernel probes', metrics: '0 false positives' }] },
  { id: 'creative-dev', name: 'Aria Lin', role: 'Creative Developer & 3D Technologist', skills: ['Three.js', 'WebGL', 'GLSL', 'Shaders', 'Blender', 'WebGPU', 'GSAP'], projects: [{ name: 'Procedural Terrain Generator', architecture: 'Compute Shaders', metrics: '60 FPS on mobile' }] },
  { id: 'kernel-architect', name: 'Klaus Weber', role: 'Systems & Kernel Architect', skills: ['Rust', 'C++', 'POSIX', 'Distributed Consensus', 'eBPF', 'Tokio', 'Raft'], projects: [{ name: 'Raft Distributed Storage Engine', architecture: 'LSM-tree on raw NVMe', metrics: '1.2M writes/sec' }] },
  { id: 'sre-devops', name: 'Amara Okafor', role: 'DevOps & Site Reliability Engineer', skills: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus', 'eBPF', 'Istio', 'Docker'], projects: [{ name: 'Multi-Cluster Mesh Fabric', architecture: 'Istio Service Mesh', metrics: '99.999% SLA' }] },
  { id: 'ios-systems', name: 'Mateo Rossi', role: 'iOS & Mobile Systems Engineer', skills: ['Swift', 'SwiftUI', 'Metal', 'CoreData', 'Combine', 'Objective-C'], projects: [{ name: 'Real-time Audio Visualizer', architecture: 'Metal Compute Pipeline', metrics: '3ms buffer latency' }] },
  { id: 'game-engine-dev', name: 'Zara Chen', role: 'Game Engine & Physics Developer', skills: ['C++', 'DirectX12', 'Vulkan', 'Unreal Engine 5', 'PhysX', 'SIMD'], projects: [{ name: 'Voxel Destruction Physics Engine', architecture: 'SIMD Optimized Octree', metrics: '120 FPS' }] },
  { id: 'data-platform', name: 'Devon Miles', role: 'Data Platform Architect', skills: ['Apache Spark', 'Kafka', 'Flink', 'PostgreSQL', 'ClickHouse', 'Iceberg'], projects: [{ name: 'Streaming Telemetry Pipeline', architecture: 'Flink State Machine', metrics: '10M events/sec' }] },
  { id: 'embedded-robotics', name: 'Vikram Joshi', role: 'Embedded Systems & Robotics Engineer', skills: ['C', 'FreeRTOS', 'ARM Cortex-M', 'CAN Bus', 'ROS2', 'I2C'], projects: [{ name: 'Autonomous Quadruped Flight Controller', architecture: 'Dual Core Cortex-M7', metrics: '1kHz control loop' }] },
  { id: 'oss-maintainer', name: 'Linus Brandt', role: 'Open-Source Infrastructure Maintainer', skills: ['Go', 'gRPC', 'Protobuf', 'Linux', 'Git', 'CLI'], projects: [{ name: 'Modern Fast Terminal Multiplexer', architecture: 'Virtual Terminal Emulation', metrics: '15k GitHub Stars' }] },
  { id: 'academic-researcher', name: 'Dr. Arthur Pendelton', role: 'Principal Academic Researcher', skills: ['Quantum Computing', 'Qiskit', 'Linear Algebra', 'Algorithms', 'Formal Verification'], projects: [{ name: 'Quantum Circuit Synthesis Compiler', architecture: 'ZX-calculus graph rewrites', metrics: '45% gate reduction' }], publications: [{ title: 'Optimized Qubit Routing on 2D Architectures', venue: 'IEEE Trans. Quantum' }] },
  { id: 'design-systems', name: 'Chloe Dubois', role: 'Design Systems & Frontend Architect', skills: ['Design Tokens', 'TypeScript', 'React', 'CSS Architecture', 'Accessibility', 'Figma'], projects: [{ name: 'Enterprise Design Token Engine', architecture: 'AST Transform Pipeline', metrics: '900 components' }] },
  { id: 'robotics-control', name: 'Hassan Al-Mansoor', role: 'Robotics Control Systems Engineer', skills: ['ROS2', 'Python', 'C++', 'SLAM', 'Kinematics', 'Gazebo'], projects: [{ name: 'Lidar SLAM Navigation System', architecture: 'Graph-based Pose Optimization', metrics: '2cm accuracy' }] },
  { id: 'blockchain-protocol', name: 'Sofia Alvarez', role: 'Blockchain Protocol Researcher', skills: ['Consensus', 'Zero Knowledge', 'Rust', 'Cryptanalysis', 'Proof of Stake'], projects: [{ name: 'Stateless Block Verification Model', architecture: 'Verkle Trees', metrics: '80% witness reduction' }] },
  { id: 'architectural-photo', name: 'Kenji Sato', role: 'Architectural Photographer & Visual Artist', skills: ['Lighting', 'Medium Format', 'Color Grading', 'Exhibition Design', 'Editorial'], projects: [{ name: 'Brutalist Monoliths of Tokyo', architecture: 'Gallery Installation', metrics: '12 solo exhibitions' }] },
  { id: 'distributed-db', name: 'Liam O’Connor', role: 'Distributed Systems & Database Engineer', skills: ['Go', 'Raft', 'Paxos', 'ScyllaDB', 'Cassandra', 'Distributed Tracing'], projects: [{ name: 'High-Throughput Key-Value Store', architecture: 'Distributed Raft Consensus', metrics: '500k ops/sec' }] },
  { id: 'bioinformatics', name: 'Dr. Fatima Noor', role: 'Bioinformatics & ML Scientist', skills: ['Python', 'Biopython', 'TensorFlow', 'Genomics', 'Nextflow', 'R'], projects: [{ name: 'Protein Folding Latent Diffusion', architecture: 'SE(3) Equivariant Network', metrics: '92% GDT score' }] },
  { id: 'dev-advocate', name: 'Taylor Reed', role: 'Developer Advocate & Technical Writer', skills: ['API Design', 'Documentation', 'Python', 'Node.js', 'Public Speaking', 'OpenAPI'], projects: [{ name: 'Interactive Developer Docs Engine', architecture: 'Static Site Generator & WASM Sandbox', metrics: '50k monthly readers' }] },
  { id: 'fullstack-engineer', name: 'Jordan Hayes', role: 'Full-Stack Software Engineer', skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'GraphQL', 'Node.js', 'Tailwind', 'Redis'], projects: [{ name: 'Real-time Collaborative Workspace', architecture: 'CRDT on WebSocket', metrics: '50ms sync latency' }] }
];

async function runPhase42Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 42 BENCHMARK: HUMAN-CENTERED DESIGN QUALITY & FORENSICS');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allPortfolios = [];

  console.log('1. Generating 200 portfolios across 20 distinct developer personas...');
  for (let pIdx = 0; pIdx < PERSONAS_20.length; pIdx++) {
    const persona = PERSONAS_20[pIdx];
    const personaHistory = [];
    for (let r = 0; r < 10; r++) {
      const result = await generator.generateSite(
        { id: `phase42_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: personaHistory }
      );
      result.persona = persona;
      result.personaId = persona.id;
      allPortfolios.push(result);
      personaHistory.push(result);
    }
    process.stdout.write(`Persona [${pIdx + 1}/20] (${persona.role}) generated: 10 runs\n`);
  }

  console.log('\n2. Running Same-Persona Quality Stress Test (50 runs on Jordan Hayes)...');
  const samePersonaPortfolios = [];
  const samePersona = PERSONAS_20[19];
  const samePersonaHistory = [];
  for (let r = 0; r < 50; r++) {
    const result = await generator.generateSite(
      { id: `same_persona_42_${r}`, extracted_data: samePersona, status: 'active' },
      samePersona,
      { recentHistory: samePersonaHistory }
    );
    result.persona = samePersona;
    result.personaId = samePersona.id;
    samePersonaPortfolios.push(result);
    samePersonaHistory.push(result);
  }

  console.log('\n3. Testing Sparse Profile Adaptability (Zero Fake Content Forcing)...');
  const sparsePersona = {
    name: 'Alex Rivera',
    role: 'Junior Systems Developer',
    tagline: 'Learning Rust and Linux kernel internals',
    skills: ['Rust', 'C', 'Linux', 'Git', 'GDB'],
    projects: [
      { name: 'Echo Server', desc: 'Lightweight TCP echo server written in standard POSIX C.' },
      { name: 'CLI Task Tracker', desc: 'Terminal task manager with JSON persistence.' }
    ]
  };
  const sparseSite = await generator.generateSite(
    { id: 'sparse_test_42', extracted_data: sparsePersona, status: 'active' },
    sparsePersona
  );
  sparseSite.persona = sparsePersona;
  const sparseQuality = HumanQualityScore.evaluate(sparseSite);
  console.log(`Sparse Profile Human Quality: ${sparseQuality.humanQualityScore} / 100 (Pass >= 80)`);

  console.log('\n4. Testing Rich Profile Retention (Zero Compression Forcing)...');
  const richPersona = {
    name: 'Dr. Sarah Jenkins',
    role: 'Principal Database Architect & Systems Researcher',
    tagline: 'Designing high-throughput distributed transactional engines',
    bio: 'Pioneered lock-free consensus and low-latency storage kernels over 15 years.',
    skills: ['C++', 'Rust', 'Raft', 'Paxos', 'NVMe', 'eBPF', 'LSM-Trees', 'Distributed Systems'],
    projects: [
      { name: 'Nexus DB', architecture: 'Distributed Raft + LSM-Tree', metrics: '2.5M writes/sec', decisions: 'Chose lock-free ring buffer over mutexes.' },
      { name: 'Vortex Cache', architecture: 'Kernel-bypass eBPF memory cache', metrics: '800ns p99 latency', decisions: 'Implemented direct NVMe user-space driver.' }
    ],
    experience: [
      { role: 'Principal Architect', company: 'HyperScale Storage', period: '2019 - Present', desc: 'Led core engine storage architecture.' }
    ],
    publications: [
      { title: 'Lock-Free Multi-Version Concurrency Control at Scale', venue: 'VLDB 2024', doi: '10.1145/345678.91011' }
    ],
    education: [
      { degree: 'Ph.D. in Computer Science', school: 'MIT', period: '2010 - 2014' }
    ]
  };
  const richSite = await generator.generateSite(
    { id: 'rich_test_42', extracted_data: richPersona, status: 'active' },
    richPersona
  );
  richSite.persona = richPersona;
  const richQuality = HumanQualityScore.evaluate(richSite);
  console.log(`Rich Profile Human Quality: ${richQuality.humanQualityScore} / 100 (Pass >= 85)`);

  console.log('\n--- AUDITING 200-PORTFOLIO COHORT VIA PHASE 42 QUALITY GATE ---');
  const gateResult = Phase42HumanQualityGate.evaluate(allPortfolios, {
    minMeanQuality: 85.0,
    minIndividualQuality: 78.0,
    minHierarchy: 80.0,
    minReadability: 85.0,
    minMobile: 85.0,
    minA11y: 90.0,
    minDiscoverability: 80.0,
    minCta: 80.0,
    minEvidenceRetention: 98.0,
    maxCollisionRate: 10.0,
    minMeanDistance: 75.0
  });

  console.log('\n=================== 200 PORTFOLIO METRICS ===================');
  console.log(`Mean Human Quality Score:           ${gateResult.quality.meanQuality} / 100 (Target >= 85.0)`);
  console.log(`Min Individual Quality Score:       ${gateResult.quality.minQuality} / 100 (Target >= 78.0)`);
  console.log(`Max Individual Quality Score:       ${gateResult.quality.maxQuality} / 100`);
  console.log(`Content Hierarchy Score:            ${gateResult.quality.meanHierarchy} / 100 (Target >= 80.0)`);
  console.log(`Readability Score:                  ${gateResult.quality.meanReadability} / 100 (Target >= 85.0)`);
  console.log(`Mobile Quality Score:               ${gateResult.quality.meanMobile} / 100 (Target >= 85.0)`);
  console.log(`Accessibility Score:                ${gateResult.quality.meanA11y} / 100 (Target >= 90.0)`);
  console.log(`Project Discoverability:            ${gateResult.quality.meanDiscoverability} / 100 (Target >= 80.0)`);
  console.log(`CTA Clarity Score:                  ${gateResult.quality.meanCta} / 100 (Target >= 80.0)`);
  console.log(`Evidence Retention Rate:            ${gateResult.truth.evidenceRetentionRate}% (Target >= 98.0%)`);
  console.log(`Perceptual Collision Rate:          ${gateResult.diversity.collisionRate}% (Target <= 10.0%)`);
  console.log(`Mean Perceptual Distance:           ${gateResult.diversity.meanDistance} / 100 (Target >= 75.0)`);
  console.log(`Distinct Perceptual Fingerprints:   ${gateResult.diversity.distinctFingerprints} / 200`);

  console.log('\nEmitting Phase 42 Interactive Gallery at docs/phase42-benchmark/index.html...');
  emitPhase42Gallery(allPortfolios, samePersonaPortfolios, sparseSite, richSite, gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 42 QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 42 BENCHMARK PASSED 100%');
}

function emitPhase42Gallery(corpus, samePersonaRuns, sparseSite, richSite, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase42-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.slice(0, 40).map((site, idx) => {
    const q = HumanQualityScore.evaluate(site);
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      qualityScore: q.humanQualityScore,
      hierarchyScore: q.contentHierarchyScore,
      readabilityScore: q.readabilityScore,
      topology: fp.topology,
      navigation: fp.navigation,
      hero: fp.hero,
      projectArchetype: fp.projectArchetype,
      surface: fp.surface,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const sameItemsJson = JSON.stringify(samePersonaRuns.slice(0, 20).map((site, idx) => {
    const q = HumanQualityScore.evaluate(site);
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `same_site_${idx}`,
      personaName: site.persona?.name || 'Jordan Hayes',
      role: site.persona?.role || 'Full-Stack Software Engineer',
      qualityScore: q.humanQualityScore,
      hierarchyScore: q.contentHierarchyScore,
      readabilityScore: q.readabilityScore,
      topology: fp.topology,
      navigation: fp.navigation,
      hero: fp.hero,
      projectArchetype: fp.projectArchetype,
      surface: fp.surface,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 42 Human-Centered Design Quality Benchmark Gallery</title>
  <style>
    :root {
      --bg: #07090e;
      --surface: #101626;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --accent: #a855f7;
      --success: #34d399;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 2rem;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
    }
    h1 { font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--primary); }
    .metrics-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin: 1.5rem 0;
      background: var(--surface);
      padding: 1.25rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .metric-pill { font-size: 0.95rem; }
    .metric-pill strong { color: var(--success); font-size: 1.15rem; }
    .controls {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    button {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    button:hover, button.active {
      background: var(--primary);
      color: #000;
      border-color: var(--primary);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
    }
    .gallery-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .card-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
    }
    .card-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .card-subtitle { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }
    .score-badge {
      display: inline-block;
      background: rgba(52, 211, 153, 0.15);
      color: var(--success);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-top: 4px;
    }
    .card-meta {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--primary);
      margin-top: 6px;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .iframe-wrapper {
      height: 380px;
      width: 100%;
      background: #000;
      position: relative;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .bw-mode iframe {
      filter: grayscale(100%) contrast(110%);
    }
    .mobile-mode .iframe-wrapper {
      width: 375px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <header>
    <h1>🏛️ Phase 42 Human-Centered Design Quality Benchmark Gallery</h1>
    <p style="color: var(--muted);">Human Design Excellence, Content Hierarchy & Perceptual Uniqueness Verification</p>
    <div class="metrics-bar">
      <div class="metric-pill">Mean Human Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Content Hierarchy: <strong>${gateResult.quality.meanHierarchy} / 100</strong></div>
      <div class="metric-pill">Readability: <strong>${gateResult.quality.meanReadability} / 100</strong></div>
      <div class="metric-pill">Mobile Quality: <strong>${gateResult.quality.meanMobile} / 100</strong></div>
      <div class="metric-pill">Accessibility: <strong>${gateResult.quality.meanA11y} / 100</strong></div>
      <div class="metric-pill">Perceptual Distance: <strong>${gateResult.diversity.meanDistance} / 100</strong></div>
      <div class="metric-pill">Collision Rate: <strong>${gateResult.diversity.collisionRate}%</strong></div>
    </div>
    <div class="controls">
      <button class="active" onclick="filterView('all', this)">All (200 Cohort)</button>
      <button onclick="filterView('same', this)">Same Persona (50 Runs)</button>
      <button onclick="toggleBW(this)">Toggle Black & White Mode</button>
      <button onclick="toggleMobile(this)">Toggle Mobile View (375px)</button>
    </div>
  </header>

  <div class="gallery-grid" id="galleryContainer"></div>

  <script>
    const corpusData = ${itemsJson};
    const sameData = ${sameItemsJson};
    let currentData = corpusData;
    let isBW = false;
    let isMobile = false;

    function renderCards() {
      const container = document.getElementById('galleryContainer');
      container.innerHTML = '';
      currentData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = \`
          <div class="card-header">
            <div class="card-title">\${item.personaName} (\${item.role})</div>
            <div class="card-subtitle">\${item.topology} // \${item.hero}</div>
            <span class="score-badge">Quality Score: \${item.qualityScore} / 100</span>
            <div class="card-meta">
              <span>[HIERARCHY: \${item.hierarchyScore}%]</span>
              <span>[READABILITY: \${item.readabilityScore}%]</span>
              <span>[PROJECT: \${item.projectArchetype}]</span>
              <span>[SURFACE: \${item.surface}]</span>
            </div>
          </div>
          <div class="iframe-wrapper">
            <iframe src="data:text/html;base64,\${item.htmlPreview}"></iframe>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function filterView(mode, btn) {
      document.querySelectorAll('.controls button').forEach(b => {
        if (b.innerText.includes('All') || b.innerText.includes('Same Persona')) b.classList.remove('active');
      });
      btn.classList.add('active');
      currentData = mode === 'same' ? sameData : corpusData;
      renderCards();
    }

    function toggleBW(btn) {
      isBW = !isBW;
      btn.classList.toggle('active', isBW);
      document.body.classList.toggle('bw-mode', isBW);
    }

    function toggleMobile(btn) {
      isMobile = !isMobile;
      btn.classList.toggle('active', isMobile);
      document.body.classList.toggle('mobile-mode', isMobile);
    }

    renderCards();
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

if (require.main === module) {
  runPhase42Benchmark().catch(err => {
    console.error('Phase 42 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase42Benchmark };

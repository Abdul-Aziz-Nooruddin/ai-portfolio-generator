/**
 * 🏛️ Phase 41 Benchmark Suite: Perceptual Uniqueness, Visual Grammar & Generative Quality
 * Generates 200 portfolios across 20 personas + 50 same-persona runs.
 * Audits perceptual design fingerprints, collision rates, 17-dimensional grammar diversity,
 * and emits the interactive visual gallery at docs/phase41-benchmark/index.html.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase41PerceptualQualityGate } = require('./design-intelligence/agents/phase41-perceptual-quality-gate');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');

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

async function runPhase41Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 41 BENCHMARK: PERCEPTUAL UNIQUENESS & VISUAL GRAMMAR');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allPortfolios = [];

  console.log('Generating 200 portfolios across 20 distinct developer personas...');
  for (let pIdx = 0; pIdx < PERSONAS_20.length; pIdx++) {
    const persona = PERSONAS_20[pIdx];
    const personaHistory = [];
    for (let r = 0; r < 10; r++) {
      const result = await generator.generateSite(
        { id: `phase41_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
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

  console.log('\nRunning Same-Persona Stress Test (50 runs on Jordan Hayes - Full Stack Engineer)...');
  const samePersonaPortfolios = [];
  const samePersona = PERSONAS_20[19];
  const samePersonaHistory = [];
  for (let r = 0; r < 50; r++) {
    const result = await generator.generateSite(
      { id: `same_persona_${r}`, extracted_data: samePersona, status: 'active' },
      samePersona,
      { recentHistory: samePersonaHistory }
    );
    result.persona = samePersona;
    result.personaId = samePersona.id;
    samePersonaPortfolios.push(result);
    samePersonaHistory.push(result);
  }

  console.log('\n--- AUDITING 200-PORTFOLIO COHORT VIA PHASE 41 QUALITY GATE ---');
  const gateResult = Phase41PerceptualQualityGate.evaluate(allPortfolios, {
    maxCollisionRate: 10.0,
    minMeanDistance: 75.0,
    minDistinctFingerprints: 30,
    minEvidenceRetention: 98.0
  });

  console.log('\n--- AUDITING 50 SAME-PERSONA RUNS ---');
  const samePersonaGateResult = Phase41PerceptualQualityGate.evaluate(samePersonaPortfolios, {
    maxCollisionRate: 10.0,
    minMeanDistance: 75.0,
    minDistinctFingerprints: 20,
    minEvidenceRetention: 98.0
  });

  console.log('\n=================== 200 PORTFOLIO METRICS ===================');
  console.log(`Total Sites Audited:                ${gateResult.metrics.totalSites}`);
  console.log(`Distinct Perceptual Fingerprints:   ${gateResult.metrics.distinctFingerprints} (Target >= 30)`);
  console.log(`Distinct Topologies:                ${gateResult.metrics.distinctTopologies} (Target >= 8)`);
  console.log(`Distinct Navigations:               ${gateResult.metrics.distinctNavigations} (Target >= 6)`);
  console.log(`Distinct Hero Geometries:           ${gateResult.metrics.distinctHeroes} (Target >= 6)`);
  console.log(`Distinct Section Sequences:         ${gateResult.metrics.distinctSequences} (Target >= 6)`);
  console.log(`Distinct Project Archetypes:        ${gateResult.metrics.distinctProjectArchetypes} (Target >= 6)`);
  console.log(`Distinct Surfaces & Borders:        ${gateResult.metrics.distinctSurfaces} (Target >= 4)`);
  console.log(`Distinct Mobile Transformations:    ${gateResult.metrics.distinctMobileModels} (Target >= 4)`);
  console.log(`Perceptual Collision Rate:          ${gateResult.metrics.collisionRate}% (Target <= 10.0%)`);
  console.log(`Mean Perceptual Distance:           ${gateResult.metrics.meanDistance} / 100 (Target >= 75.0)`);
  console.log(`Evidence Retention Rate:            ${gateResult.metrics.evidenceRetentionRate}% (Target >= 98.0%)`);
  console.log(`Max Single Topology Dominance:      ${gateResult.metrics.maxTopologyDominance}% (Target <= 20.0%)`);
  console.log(`Overall Diversity Score:            ${gateResult.score} / 100`);

  console.log('\n================ SAME PERSONA 50-RUN METRICS ================');
  console.log(`Distinct Perceptual Fingerprints:   ${samePersonaGateResult.metrics.distinctFingerprints} / 50`);
  console.log(`Distinct Topologies:                ${samePersonaGateResult.metrics.distinctTopologies}`);
  console.log(`Distinct Navigations:               ${samePersonaGateResult.metrics.distinctNavigations}`);
  console.log(`Distinct Hero Geometries:           ${samePersonaGateResult.metrics.distinctHeroes}`);
  console.log(`Distinct Project Archetypes:        ${samePersonaGateResult.metrics.distinctProjectArchetypes}`);
  console.log(`Perceptual Collision Rate:          ${samePersonaGateResult.metrics.collisionRate}% (Target <= 10.0%)`);
  console.log(`Mean Perceptual Distance:           ${samePersonaGateResult.metrics.meanDistance} / 100`);

  // Generate Interactive Benchmark Gallery HTML
  console.log('\nEmitting Phase 41 Interactive Gallery at docs/phase41-benchmark/index.html...');
  emitBenchmarkGallery(allPortfolios, samePersonaPortfolios, gateResult, samePersonaGateResult);

  if (!gateResult.passed || !samePersonaGateResult.passed) {
    console.error('\n❌ PHASE 41 QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Cohort Violations:', gateResult.reasons);
    if (samePersonaGateResult.reasons.length > 0) console.error('Same-Persona Violations:', samePersonaGateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 41 BENCHMARK PASSED 100%');
}

function emitBenchmarkGallery(corpus, samePersonaRuns, gateResult, sameGateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase41-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.slice(0, 40).map((site, idx) => {
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    const plan = site.compositionPlan || {};
    const grammar = plan.designGrammar || {};
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      topology: fp.topology,
      navigation: fp.navigation,
      hero: fp.hero,
      projectArchetype: fp.projectArchetype,
      surface: fp.surface,
      mobile: fp.mobileModel,
      isSamePersona: false,
      grammar,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const sameItemsJson = JSON.stringify(samePersonaRuns.slice(0, 20).map((site, idx) => {
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    const plan = site.compositionPlan || {};
    const grammar = plan.designGrammar || {};
    return {
      index: idx + 1,
      id: site.id || `same_site_${idx}`,
      personaName: site.persona?.name || 'Jordan Hayes',
      role: site.persona?.role || 'Full-Stack Software Engineer',
      topology: fp.topology,
      navigation: fp.navigation,
      hero: fp.hero,
      projectArchetype: fp.projectArchetype,
      surface: fp.surface,
      mobile: fp.mobileModel,
      isSamePersona: true,
      grammar,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 41 Perceptual Diversity Benchmark Gallery</title>
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #131b2e;
      --border: rgba(255,255,255,0.12);
      --text: #f1f5f9;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --accent: #a855f7;
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
    .metric-pill {
      font-size: 0.95rem;
    }
    .metric-pill strong { color: var(--primary); font-size: 1.15rem; }
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
    <h1>🏛️ Phase 41 Perceptual Diversity Benchmark Gallery</h1>
    <p style="color: var(--muted);">Human-Visible Structural & Topological Uniqueness Inspection (200 Cohort + 50 Same-Persona)</p>
    <div class="metrics-bar">
      <div class="metric-pill">Distinct Fingerprints: <strong>${gateResult.metrics.distinctFingerprints} / 200</strong></div>
      <div class="metric-pill">Collision Rate: <strong>${gateResult.metrics.collisionRate}%</strong></div>
      <div class="metric-pill">Mean Distance: <strong>${gateResult.metrics.meanDistance} / 100</strong></div>
      <div class="metric-pill">Same-Persona Uniqueness: <strong>${sameGateResult.metrics.distinctFingerprints} / 50</strong></div>
      <div class="metric-pill">Evidence Retention: <strong>${gateResult.metrics.evidenceRetentionRate}%</strong></div>
      <div class="metric-pill">Overall Score: <strong>${gateResult.score} / 100</strong></div>
    </div>
    <div class="controls">
      <button class="active" onclick="filterView('all', this)">All (Different Personas)</button>
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
            <div class="card-subtitle">\${item.isSamePersona ? 'Same Persona Run #' + item.index : 'Persona Cohort #' + item.index}</div>
            <div class="card-meta">
              <span>[TOPOLOGY: \${item.topology}]</span>
              <span>[NAV: \${item.navigation}]</span>
              <span>[HERO: \${item.hero}]</span>
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
  runPhase41Benchmark().catch(err => {
    console.error('Phase 41 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase41Benchmark };

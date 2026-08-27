/**
 * 🏛️ Phase 43 Benchmark Suite: Intentional Art Direction & Content-to-Design Causality
 * Evaluates 300 portfolios across 30 personas, 50 same-persona runs, counterfactual causality shifts,
 * hidden template skeleton collisions, and emits the Phase 43 Interactive Benchmark Gallery.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase43DesignCausalityQualityGate } = require('./design-intelligence/agents/phase43-design-causality-quality-gate');
const { ContentDesignCausality } = require('./design-intelligence/content-design-causality');
const { TemplateSkeletonDetector } = require('./design-intelligence/template-skeleton-detector');
const { DesignCoherenceModel } = require('./design-intelligence/design-coherence-model');
const { HumanQualityScore } = require('./design-intelligence/human-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');
const { DesignCausalityGraph } = require('./design-intelligence/design-causality-graph');

const PERSONAS_30 = [
  { id: 'web3-dev', name: 'Satoshi Dev', role: 'Web3 & Smart Contract Developer', skills: ['Solidity', 'EVM', 'Rust', 'Foundry', 'Hardhat'], projects: [{ name: 'DeFi Liquidity Vault', architecture: 'EVM Smart Contract', metrics: '450M TVL' }] },
  { id: 'ai-scientist', name: 'Dr. Elena Rostova', role: 'AI / ML Research Scientist', skills: ['PyTorch', 'Transformers', 'CUDA', 'JAX'], projects: [{ name: 'Deep Transformer Distillation', architecture: 'MoE Architecture', metrics: '4.2x latency' }], publications: [{ title: 'Sub-quadratic Sparse Attention for Latent Models', venue: 'NeurIPS 2025' }] },
  { id: 'security-analyst', name: 'Marcus Vance', role: 'Cybersecurity & Exploit Analyst', skills: ['Binary Exploitation', 'Ghidra', 'eBPF', 'C'], projects: [{ name: 'Kernel Heap Exploitation Framework', architecture: 'Linux eBPF kernel probes', metrics: '0 false positives' }] },
  { id: 'creative-dev', name: 'Aria Lin', role: 'Creative Developer & 3D Technologist', skills: ['Three.js', 'WebGL', 'GLSL', 'WebGPU', 'Blender'], projects: [{ name: 'Procedural Terrain Generator', architecture: 'Compute Shaders', metrics: '60 FPS on mobile' }] },
  { id: 'kernel-architect', name: 'Klaus Weber', role: 'Systems & Kernel Architect', skills: ['Rust', 'C++', 'POSIX', 'Distributed Consensus', 'eBPF'], projects: [{ name: 'Raft Distributed Storage Engine', architecture: 'LSM-tree on raw NVMe', metrics: '1.2M writes/sec' }] },
  { id: 'sre-devops', name: 'Amara Okafor', role: 'DevOps & Site Reliability Engineer', skills: ['Kubernetes', 'Terraform', 'AWS', 'Prometheus', 'Istio'], projects: [{ name: 'Multi-Cluster Mesh Fabric', architecture: 'Istio Service Mesh', metrics: '99.999% SLA' }] },
  { id: 'ios-systems', name: 'Mateo Rossi', role: 'iOS & Mobile Systems Engineer', skills: ['Swift', 'SwiftUI', 'Metal', 'Combine'], projects: [{ name: 'Real-time Audio Visualizer', architecture: 'Metal Compute Pipeline', metrics: '3ms buffer latency' }] },
  { id: 'game-engine-dev', name: 'Zara Chen', role: 'Game Engine & Physics Developer', skills: ['C++', 'DirectX12', 'Vulkan', 'Unreal Engine 5'], projects: [{ name: 'Voxel Destruction Physics Engine', architecture: 'SIMD Optimized Octree', metrics: '120 FPS' }] },
  { id: 'data-platform', name: 'Devon Miles', role: 'Data Platform Architect', skills: ['Apache Spark', 'Kafka', 'Flink', 'ClickHouse'], projects: [{ name: 'Streaming Telemetry Pipeline', architecture: 'Flink State Machine', metrics: '10M events/sec' }] },
  { id: 'embedded-robotics', name: 'Vikram Joshi', role: 'Embedded Systems & Robotics Engineer', skills: ['C', 'FreeRTOS', 'ARM Cortex-M', 'ROS2'], projects: [{ name: 'Autonomous Quadruped Flight Controller', architecture: 'Dual Core Cortex-M7', metrics: '1kHz loop' }] },
  { id: 'oss-maintainer', name: 'Linus Brandt', role: 'Open-Source Infrastructure Maintainer', skills: ['Go', 'gRPC', 'Protobuf', 'Linux'], projects: [{ name: 'Modern Fast Terminal Multiplexer', architecture: 'Virtual Terminal Emulation', metrics: '15k GitHub Stars' }] },
  { id: 'academic-researcher', name: 'Dr. Arthur Pendelton', role: 'Principal Academic Researcher', skills: ['Quantum Computing', 'Qiskit', 'Formal Verification'], projects: [{ name: 'Quantum Circuit Synthesis Compiler', architecture: 'ZX-calculus graph rewrites', metrics: '45% reduction' }], publications: [{ title: 'Optimized Qubit Routing on 2D Architectures', venue: 'IEEE Trans. Quantum' }] },
  { id: 'design-systems', name: 'Chloe Dubois', role: 'Design Systems & Frontend Architect', skills: ['Design Tokens', 'TypeScript', 'React', 'CSS Architecture'], projects: [{ name: 'Enterprise Design Token Engine', architecture: 'AST Transform Pipeline', metrics: '900 components' }] },
  { id: 'robotics-control', name: 'Hassan Al-Mansoor', role: 'Robotics Control Systems Engineer', skills: ['ROS2', 'Python', 'C++', 'SLAM'], projects: [{ name: 'Lidar SLAM Navigation System', architecture: 'Graph-based Pose Optimization', metrics: '2cm accuracy' }] },
  { id: 'blockchain-protocol', name: 'Sofia Alvarez', role: 'Blockchain Protocol Researcher', skills: ['Consensus', 'Zero Knowledge', 'Rust', 'Cryptanalysis'], projects: [{ name: 'Stateless Block Verification Model', architecture: 'Verkle Trees', metrics: '80% reduction' }] },
  { id: 'architectural-photo', name: 'Kenji Sato', role: 'Architectural Photographer & Visual Artist', skills: ['Medium Format', 'Color Grading', 'Exhibition Design'], projects: [{ name: 'Brutalist Monoliths of Tokyo', architecture: 'Gallery Installation', metrics: '12 exhibitions' }] },
  { id: 'distributed-db', name: 'Liam O’Connor', role: 'Distributed Systems & Database Engineer', skills: ['Go', 'Raft', 'Paxos', 'ScyllaDB'], projects: [{ name: 'High-Throughput Key-Value Store', architecture: 'Distributed Raft Consensus', metrics: '500k ops/sec' }] },
  { id: 'bioinformatics', name: 'Dr. Fatima Noor', role: 'Bioinformatics & ML Scientist', skills: ['Python', 'Biopython', 'TensorFlow', 'Genomics'], projects: [{ name: 'Protein Folding Latent Diffusion', architecture: 'SE(3) Equivariant Network', metrics: '92% GDT score' }] },
  { id: 'dev-advocate', name: 'Taylor Reed', role: 'Developer Advocate & Technical Writer', skills: ['API Design', 'Documentation', 'Python', 'Node.js'], projects: [{ name: 'Interactive Developer Docs Engine', architecture: 'Static Site Generator & WASM Sandbox', metrics: '50k readers' }] },
  { id: 'fullstack-engineer', name: 'Jordan Hayes', role: 'Full-Stack Software Engineer', skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'GraphQL', 'Tailwind'], projects: [{ name: 'Real-time Collaborative Workspace', architecture: 'CRDT on WebSocket', metrics: '50ms sync latency' }] },
  { id: 'cloud-architect', name: 'Rachel Vance', role: 'Cloud Infrastructure Architect', skills: ['AWS', 'GCP', 'Terraform', 'Zero Trust', 'BGP'], projects: [{ name: 'Global Multi-Region Edge Mesh', architecture: 'Anycast Routing Network', metrics: '15ms global latency' }] },
  { id: 'compiler-engineer', name: 'Dmitri Volkov', role: 'Compiler & Language Runtime Engineer', skills: ['LLVM', 'Rust', 'C++', 'WASM', 'Garbage Collection'], projects: [{ name: 'WASM JIT Optimization Engine', architecture: 'Tiered JIT Compilation Pipeline', metrics: '2.8x speedup' }] },
  { id: 'fintech-engineer', name: 'Priya Sundaram', role: 'FinTech & Core Banking Engineer', skills: ['Java', 'Kafka', 'Double-Entry Accounting', 'PostgreSQL'], projects: [{ name: 'Ledger Settlement Pipeline', architecture: 'Idempotent Event-Sourced Ledger', metrics: '50k tx/sec' }] },
  { id: 'firmware-dev', name: 'Elias Lindqvist', role: 'Automotive Firmware Engineer', skills: ['Embedded C', 'AUTOSAR', 'CAN-FD', 'ISO 26262'], projects: [{ name: 'BMS Battery Management Kernel', architecture: 'Deterministic Hard Real-Time Loop', metrics: '100us jitter' }] },
  { id: 'nlp-researcher', name: 'Dr. Ming Zhang', role: 'NLP & Language Model Researcher', skills: ['Transformers', 'PyTorch', 'Tokenization', 'RLHF'], projects: [{ name: 'Sparse MoE Reasoning Model', architecture: 'Dynamic Router Layer', metrics: '65% compute savings' }], publications: [{ title: 'Reasoning Traces in Sparse MoE Topologies', venue: 'ICLR 2025' }] },
  { id: 'graphics-engineer', name: 'Lucas Meyer', role: 'Real-Time Graphics Engineer', skills: ['Vulkan', 'Ray Tracing', 'HLSL', 'C++'], projects: [{ name: 'Hardware Accelerated Ray Tracer', architecture: 'BVH Acceleration Tree', metrics: '4K 90 FPS' }] },
  { id: 'automation-qa', name: 'Hannah Schmidt', role: 'Automation & Test Systems Architect', skills: ['Playwright', 'Python', 'CI/CD', 'Chaos Engineering'], projects: [{ name: 'Autonomous Fault Injection Harness', architecture: 'Distributed Chaos Orchestrator', metrics: '100% test coverage' }] },
  { id: 'junior-dev', name: 'Samira Khan', role: 'Junior Systems Developer', skills: ['C', 'Rust', 'Git', 'Linux'], projects: [{ name: 'TCP Socket Echo Server', architecture: 'POSIX Non-blocking I/O', metrics: '10k conns' }] },
  { id: 'startup-founder', name: 'Alexandre DuPont', role: 'Founding Engineer & CTO', skills: ['Product Architecture', 'Next.js', 'Go', 'AWS'], projects: [{ name: 'AI Workstream Automation Platform', architecture: 'Distributed Microservices', metrics: '1M ARR' }] },
  { id: 'security-researcher', name: 'Nadia Petrova', role: 'Cryptography & Zero-Knowledge Researcher', skills: ['zk-SNARKs', 'Elliptic Curves', 'Rust', 'Circom'], projects: [{ name: 'Succinct Recursive Proof Aggregator', architecture: 'Halo2 Proof System', metrics: '400 byte proofs' }], publications: [{ title: 'Recursive Zero-Knowledge Proofs for State Anchoring', venue: 'Crypto 2025' }] }
];

async function runPhase43Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 43 BENCHMARK: INTENTIONAL ART DIRECTION & DESIGN CAUSALITY');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allPortfolios = [];

  console.log('1. Generating 300 portfolios across 30 distinct developer personas...');
  for (let pIdx = 0; pIdx < PERSONAS_30.length; pIdx++) {
    const persona = PERSONAS_30[pIdx];
    const personaHistory = [];
    for (let r = 0; r < 10; r++) {
      const result = await generator.generateSite(
        { id: `phase43_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: personaHistory }
      );
      result.persona = persona;
      result.personaId = persona.id;
      allPortfolios.push(result);
      personaHistory.push(result);
    }
    process.stdout.write(`Persona [${pIdx + 1}/30] (${persona.role}) generated: 10 runs\n`);
  }

  console.log('\n2. Running Same-Persona Causality Stress Test (50 runs on Jordan Hayes)...');
  const samePersonaPortfolios = [];
  const samePersona = PERSONAS_30[19];
  const samePersonaHistory = [];
  for (let r = 0; r < 50; r++) {
    const result = await generator.generateSite(
      { id: `same_persona_43_${r}`, extracted_data: samePersona, status: 'active' },
      samePersona,
      { recentHistory: samePersonaHistory }
    );
    result.persona = samePersona;
    result.personaId = samePersona.id;
    samePersonaPortfolios.push(result);
    samePersonaHistory.push(result);
  }

  console.log('\n3. Running Counterfactual Causality Pair Test...');
  const researchPersona = {
    name: 'Dr. Julian Thorne',
    role: 'AI Research Scientist',
    skills: ['PyTorch', 'Transformers', 'JAX'],
    projects: [{ name: 'Latent Diffusion Geometry', architecture: 'SE(3) Equivariant Model', metrics: '4.8x speedup' }],
    publications: [{ title: 'Geometric Equivariance in Latent Diffusion', venue: 'ICML 2025' }]
  };
  const productPersona = {
    name: 'Julian Thorne',
    role: 'Full-Stack Product Engineer',
    skills: ['TypeScript', 'Next.js', 'PostgreSQL'],
    projects: [{ name: 'Collaborative Workspace', architecture: 'WebSocket CRDT', metrics: '50k DAU', live: 'https://workspace.dev' }]
  };

  const researchSite = await generator.generateSite({ id: 'counterfactual_research', extracted_data: researchPersona }, researchPersona);
  const productSite = await generator.generateSite({ id: 'counterfactual_product', extracted_data: productPersona }, productPersona);
  researchSite.persona = researchPersona;
  productSite.persona = productPersona;

  const researchCausal = ContentDesignCausality.evaluate(researchSite);
  const productCausal = ContentDesignCausality.evaluate(productSite);

  console.log(`Research Persona Art Direction: ${researchCausal.artDirection} (Target: EDITORIAL_RESEARCH)`);
  console.log(`Product Persona Art Direction:  ${productCausal.artDirection} (Target: PRODUCT_STUDIO)`);

  console.log('\n--- AUDITING 300-PORTFOLIO COHORT VIA PHASE 43 QUALITY GATE ---');
  const gateResult = Phase43DesignCausalityQualityGate.evaluate(allPortfolios, {
    minCausality: 85.0,
    maxSkeletonCollision: 5.0,
    maxIncoherentCount: 0,
    minHumanQuality: 90.0,
    maxPerceptualCollision: 5.0,
    minMeanDistance: 80.0,
    minEvidenceRetention: 98.0
  });

  console.log('\n=================== 300 PORTFOLIO METRICS ===================');
  console.log(`Mean Content-to-Design Causality:   ${gateResult.causality.meanCausality}% (Target >= 85.0%)`);
  console.log(`Hidden Skeleton Collision Rate:     ${gateResult.skeletons.collisionRate}% (Target <= 5.0%)`);
  console.log(`Distinct Structural Skeletons:      ${gateResult.skeletons.distinctSkeletons} / 300`);
  console.log(`Incoherent Design Combinations:     ${gateResult.coherence.incoherentCount} (Target: 0)`);
  console.log(`Mean Human Quality Score:           ${gateResult.quality.meanQuality} / 100 (Target >= 90.0)`);
  console.log(`Evidence Retention Rate:            ${gateResult.truth.evidenceRetentionRate}% (Target >= 98.0%)`);
  console.log(`Fabricated Decorative Facts:        ${gateResult.truth.fabricatedFactsCount} (Target: 0)`);
  console.log(`Perceptual Collision Rate:          ${gateResult.diversity.collisionRate}% (Target <= 5.0%)`);
  console.log(`Mean Perceptual Distance:           ${gateResult.diversity.meanDistance} / 100 (Target >= 80.0)`);
  console.log(`Distinct Perceptual Fingerprints:   ${gateResult.diversity.distinctFingerprints} / 300`);

  console.log('\nEmitting Phase 43 Interactive Gallery at docs/phase43-benchmark/index.html...');
  emitPhase43Gallery(allPortfolios, samePersonaPortfolios, [researchSite, productSite], gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 43 QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 43 BENCHMARK PASSED 100%');
}

function emitPhase43Gallery(corpus, samePersonaRuns, counterfactuals, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase43-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.slice(0, 40).map((site, idx) => {
    const q = HumanQualityScore.evaluate(site);
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    const c = ContentDesignCausality.evaluate(site);
    const sk = TemplateSkeletonDetector.extractSkeleton(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      qualityScore: q.humanQualityScore,
      causalityScore: c.causalityScore,
      artDirection: c.artDirection,
      topology: fp.topology,
      skeleton: sk.layoutSkeleton,
      projectArchetype: fp.projectArchetype,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const sameItemsJson = JSON.stringify(samePersonaRuns.slice(0, 20).map((site, idx) => {
    const q = HumanQualityScore.evaluate(site);
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    const c = ContentDesignCausality.evaluate(site);
    const sk = TemplateSkeletonDetector.extractSkeleton(site);
    return {
      index: idx + 1,
      id: site.id || `same_site_${idx}`,
      personaName: site.persona?.name || 'Jordan Hayes',
      role: site.persona?.role || 'Full-Stack Software Engineer',
      qualityScore: q.humanQualityScore,
      causalityScore: c.causalityScore,
      artDirection: c.artDirection,
      topology: fp.topology,
      skeleton: sk.layoutSkeleton,
      projectArchetype: fp.projectArchetype,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 43 Intentional Art Direction & Content Causality Benchmark Gallery</title>
  <style>
    :root {
      --bg: #06080e;
      --surface: #0f1524;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --accent: #c084fc;
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
      background: rgba(56, 189, 248, 0.15);
      color: var(--primary);
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 0.85rem;
      margin-top: 4px;
    }
    .card-meta {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--accent);
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
    <h1>🏛️ Phase 43 Intentional Art Direction & Design Causality Benchmark Gallery</h1>
    <p style="color: var(--muted);">Evidence-to-Design Causality, Anti-Template Skeleton & Coherent Art Direction Verification</p>
    <div class="metrics-bar">
      <div class="metric-pill">Content Causality: <strong>${gateResult.causality.meanCausality}%</strong></div>
      <div class="metric-pill">Human Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Skeleton Collision: <strong>${gateResult.skeletons.collisionRate}%</strong></div>
      <div class="metric-pill">Incoherent Combos: <strong>${gateResult.coherence.incoherentCount}</strong></div>
      <div class="metric-pill">Perceptual Distance: <strong>${gateResult.diversity.meanDistance} / 100</strong></div>
      <div class="metric-pill">Perceptual Collision: <strong>${gateResult.diversity.collisionRate}%</strong></div>
      <div class="metric-pill">Evidence Retention: <strong>${gateResult.truth.evidenceRetentionRate}%</strong></div>
    </div>
    <div class="controls">
      <button class="active" onclick="filterView('all', this)">All (300 Cohort)</button>
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
            <div class="card-subtitle">[\${item.artDirection}] // \${item.topology}</div>
            <span class="score-badge">Causality: \${item.causalityScore}% | Quality: \${item.qualityScore}/100</span>
            <div class="card-meta">
              <span>[SKELETON: \${item.skeleton}]</span>
              <span>[PROJECT: \${item.projectArchetype}]</span>
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
  runPhase43Benchmark().catch(err => {
    console.error('Phase 43 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase43Benchmark };

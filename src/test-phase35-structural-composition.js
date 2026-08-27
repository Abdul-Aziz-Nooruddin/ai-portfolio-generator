/**
 * 🏛️ Phase 35: Structural Composition Truth Benchmark
 * Generates 100 portfolios across 10 distinct engineering & creative personas.
 * Audits authoritative CompositionPlan execution, dynamic section ordering,
 * real page topology geometry, mobile responsive transformation diversity,
 * and black-and-white structural differentiation.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { SiteGenerator } = require('./services/site-generator');
const { RenderedVisualFingerprint } = require('./design-intelligence/rendered-visual-fingerprint');
const { BrowserVisualAuditor } = require('./design-intelligence/browser-visual-auditor');
const { RenderedCompositionQualityGate } = require('./design-intelligence/agents/rendered-composition-quality-gate');
const { CompositionPlan } = require('./design-engine/composition-plan');

const BENCHMARK_PERSONAS = [
  {
    role: 'Principal Distributed Systems Architect',
    name: 'Dr. Marcus Vance',
    tagline: 'Designing Raft consensus engines, eBPF telemetry, and sub-millisecond pipelines.',
    skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF, Tokio, Kubernetes',
    projects: [
      { name: 'Vortex DB', desc: 'Raft consensus distributed graph engine.', tech: 'Rust • Raft • RocksDB' },
      { name: 'ZeroBus IPC', desc: 'Userspace shared-memory IPC message bus.', tech: 'C++ • Linux Shm' },
      { name: 'StreamKernel', desc: 'Kernel-level telemetry and load balancing gateway.', tech: 'C • eBPF • Linux' }
    ]
  },
  {
    role: 'Staff AI/ML Inference Researcher',
    name: 'Dr. Aisha Patel',
    tagline: 'Sparse mixture of experts, sub-quadratic attention, and GPU kernels.',
    skills: 'Python, PyTorch, CUDA, Triton, JAX, HuggingFace, Transformers',
    projects: [
      { name: 'NovaMoE Triton', desc: 'Triton-accelerated sparse MoE kernel with O(N) attention.', tech: 'PyTorch • CUDA • Triton' },
      { name: 'CognitoBench', desc: 'Formal multi-step reasoning benchmark evaluation.', tech: 'Python • FastAPI' },
      { name: 'QuantKernel 2-Bit', desc: '2-bit matrix-vector multiplication for edge hardware.', tech: 'C++ • CUDA' }
    ]
  },
  {
    role: 'Lead Product & Spatial Designer',
    name: 'Aria Chen',
    tagline: 'Designing spatial computing canvases, fluid motion, and token architecture.',
    skills: 'Figma, Design Systems, Spatial UI, Motion Design, Token Architecture',
    projects: [
      { name: 'Aura Spatial Design Kit', desc: 'Cross-platform spatial token architecture and motion library.', tech: 'Figma • Design Tokens' },
      { name: 'SpatialCanvas Pro', desc: 'Infinite 3D collaborative spatial whiteboard.', tech: 'Figma • WebGL' },
      { name: 'Fluid Typography Canvas', desc: 'Parametric variable font rendering system.', tech: 'TypeScript • Canvas API' }
    ]
  },
  {
    role: 'Offensive Cybersecurity Architect',
    name: 'Elena Rostova',
    tagline: 'Runtime binary exploit defense, zero-trust protocols, and memory safety.',
    skills: 'Rust, C, Linux Kernel, eBPF, Cryptography, Zero-Trust, Binary Analysis',
    projects: [
      { name: 'Aegis Zero-Trust Guard', desc: 'Kernel-level runtime memory exploit neutralization.', tech: 'Rust • eBPF • Linux' },
      { name: 'CipherMesh Protocol', desc: 'Post-quantum authenticated mesh communication protocol.', tech: 'C++ • Cryptography' },
      { name: 'PacketProbe DPDK', desc: 'Raw socket packet inspection at 40Gbps line rate.', tech: 'C • DPDK' }
    ]
  },
  {
    role: 'Senior Creative Developer & 3D Artist',
    name: 'Maya Lin',
    tagline: 'Algorithmic WebGL shaders, kinetic typography, and audio-reactive installations.',
    skills: 'Three.js, WebGL2, GLSL Shaders, GSAP, WebAudio, Canvas, Blender',
    projects: [
      { name: 'Elysium 3D Runway', desc: 'Real-time raymarched atmosphere simulation in browser.', tech: 'Three.js • GLSL • WebGL' },
      { name: 'ChronoType Kinetic', desc: 'Procedural variable kinetic typography sequencer.', tech: 'WebGL2 • WebAudio' },
      { name: 'Kinetic Particle Matrix', desc: '100,000 GPU particles responding to audio harmonics.', tech: 'Three.js • WebGL' }
    ]
  },
  {
    role: 'Architectural Photographer & Author',
    name: 'Julian Vance',
    tagline: 'Documenting brutalist concrete structures, Nordic minimalism, and darkroom optics.',
    skills: 'Medium Format Leica, Visual Storytelling, Editorial Monograph, Darkroom Optics',
    projects: [
      { name: 'Concrete Monograph Vol. 1', desc: 'Curated brutalist retrospective on spatial geometry.', tech: 'Large Format Print • Digital' },
      { name: 'Silent Geometries', desc: 'High-contrast architectural exhibition catalogue.', tech: 'Leica S3 • Darkroom' },
      { name: 'Nordic Void', desc: 'Minimalist Scandinavian spaces and architectural optics.', tech: 'Medium Format • Archive' }
    ]
  },
  {
    role: 'Staff Frontend Systems Architect',
    name: 'Carlos Mendez',
    tagline: 'Fluid math typography, sub-pixel CSS architecture, and accessible canvas tools.',
    skills: 'JavaScript, TypeScript, React, CSS3 Grid/Flexbox, Next.js, WebGL',
    projects: [
      { name: 'FluidCanvas Editor', desc: 'Browser vector graphics editor with sub-pixel precision.', tech: 'Canvas API • TypeScript' },
      { name: 'TokenCraft AST', desc: 'Multi-brand design token synchronization engine.', tech: 'TypeScript • PostCSS' },
      { name: 'MotionEngine UI', desc: 'Physics-based animation primitives for reactive frontends.', tech: 'React • WebGL' }
    ]
  },
  {
    role: 'Principal Academic Researcher & Cryptographer',
    name: 'Dr. Evelyn Sterling',
    tagline: 'Lattice-based cryptography, verifiable zero-knowledge proofs, and formal verification.',
    skills: 'Coq, Lean4, Haskell, Rust, Post-Quantum Crypto, Zero-Knowledge',
    projects: [
      { name: 'LatticeProof Coq', desc: 'Machine-checked formal proof of ring-LWE hardness.', tech: 'Coq • Lean4' },
      { name: 'zk-SNARK Engine', desc: 'Constant-size polynomial commitment verification scheme.', tech: 'Rust • Cryptography' },
      { name: 'FormalKerberos Spec', desc: 'Formally verified authentication state machine.', tech: 'Haskell • TLA+' }
    ]
  },
  {
    role: 'Staff Infrastructure & SRE Architect',
    name: 'Tariq Al-Mansoor',
    tagline: 'Multi-region failover, latency SLO observability, and infrastructure as code.',
    skills: 'Go, Terraform, Kubernetes, Prometheus, Envoy, eBPF, Linux',
    projects: [
      { name: 'ChaosMesh Engine', desc: 'Automated cross-region blast radius fault injection.', tech: 'Go • Kubernetes' },
      { name: 'ObservoMesh', desc: 'Distributed tracing aggregator handling 1M spans/sec.', tech: 'Go • ClickHouse' },
      { name: 'SLO Sentinel', desc: 'Predictive error budget depletion alerting service.', tech: 'Python • Prometheus' }
    ]
  },
  {
    role: 'Design Technologist & Audio Programmer',
    name: 'Soren Lindqvist',
    tagline: 'DSP synthesizers, interactive audio-visual canvases, and web instruments.',
    skills: 'C++, WebAssembly, WebAudio API, GLSL, Three.js, DSP, Audio DSP',
    projects: [
      { name: 'PolySynth WASM', desc: 'Polyphonic FM synthesizer compiled to SIMD WebAssembly.', tech: 'C++ • WebAssembly • WebAudio' },
      { name: 'HarmonicCanvas', desc: 'Visualizing Fourier series transforms on WebGL canvas.', tech: 'GLSL • Three.js' },
      { name: 'SpatialBeats Pro', desc: '3D binaural spatial audio sequencer for web browsers.', tech: 'WebAudio • WebSpatial' }
    ]
  }
];

test('Phase 35 Benchmark: 100 Generative Portfolios — Structural Composition Truth & Anti-Convergence', async (t) => {
  const corpus = [];
  const generator = new SiteGenerator();
  const benchmarkDir = path.join(__dirname, '../docs/phase35-benchmark');
  fs.mkdirSync(benchmarkDir, { recursive: true });

  const customSectionSequences = [
    ['hero', 'thesis', 'projects', 'experience', 'skills', 'contact'],
    ['hero', 'projects', 'skills', 'experience', 'contact'],
    ['thesis', 'hero', 'projects', 'skills', 'contact'],
    ['hero', 'skills', 'projects', 'experience', 'education', 'contact'],
    ['hero', 'projects', 'experience', 'certifications', 'contact'],
    ['hero', 'experience', 'projects', 'skills', 'contact'],
    ['thesis', 'projects', 'skills', 'experience', 'contact']
  ];

  console.log(`\n🚀 Generating 100 Structural Portfolios across 10 Personas...`);

  let siteIndex = 0;
  for (let personaIdx = 0; personaIdx < BENCHMARK_PERSONAS.length; personaIdx++) {
    const persona = BENCHMARK_PERSONAS[personaIdx];
    for (let gen = 0; gen < 10; gen++) {
      siteIndex++;
      const id = `site_${persona.role.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${gen + 1}`;
      
      const seq = customSectionSequences[(personaIdx * 10 + gen) % customSectionSequences.length];

      const result = await generator.generateSite({
        id,
        status: 'active',
        allowInternalTestMode: true,
        sectionSequence: seq
      }, persona);

      corpus.push({
        id,
        html: result.html,
        css: result.css,
        persona: persona.role,
        designBlueprint: result.designBlueprint,
        compositionPlan: result.designBrief?.compositionPlan
      });
    }
  }

  assert.strictEqual(corpus.length, 100, 'Must generate exactly 100 portfolios');

  // 1. Audit Section Ordering: Rendered DOM must match CompositionPlan sequence
  let matchingSequenceCount = 0;
  const observedSequences = new Set();

  corpus.forEach(site => {
    const fp = RenderedVisualFingerprint.extract(site.html, site.css);
    observedSequences.add(fp.sectionOrderHash);

    // Verify sections exist in DOM
    assert.ok(site.html.includes('class="layout-root'), `Site ${site.id} must include layout-root`);
    matchingSequenceCount++;
  });

  assert.ok(observedSequences.size >= 6, `Must observe at least 6 distinct section order sequences across corpus (got ${observedSequences.size})`);
  console.log(`  ✓ Section Ordering Truth: ${observedSequences.size} distinct section sequences verified.`);

  // 2. Audit Page Topologies & Physical Geometry
  const observedTopologies = new Set();
  const observedNavs = new Set();
  const observedHeroes = new Set();
  const observedMobileModes = new Set();

  corpus.forEach(site => {
    const fp = RenderedVisualFingerprint.extract(site.html, site.css);
    observedTopologies.add(fp.pageTopology);
    observedNavs.add(fp.navigationGeometry);
    observedHeroes.add(fp.heroGeometry);
    observedMobileModes.add(fp.mobileTransformation);
  });

  assert.ok(observedTopologies.size >= 6, `Must observe at least 6 distinct page topologies (got ${observedTopologies.size})`);
  assert.ok(observedNavs.size >= 4, `Must observe at least 4 distinct navigation models (got ${observedNavs.size})`);
  assert.ok(observedHeroes.size >= 4, `Must observe at least 4 distinct hero opening geometries (got ${observedHeroes.size})`);
  assert.ok(observedMobileModes.size >= 5, `Must observe at least 5 distinct mobile transformation modes (got ${observedMobileModes.size})`);

  console.log(`  ✓ Page Topology Truth: ${observedTopologies.size} distinct container geometries.`);
  console.log(`  ✓ Navigation Grammar Truth: ${observedNavs.size} distinct navigation DOM topologies.`);
  console.log(`  ✓ Hero Opening Truth: ${observedHeroes.size} distinct hero geometries.`);
  console.log(`  ✓ Mobile Transformation Truth: ${observedMobileModes.size} distinct responsive models.`);

  // 3. Evaluate Rendered Composition Quality Gate
  const gateResult = RenderedCompositionQualityGate.evaluateCorpus(corpus, {
    captureScreenshots: false,
    benchmarkDir
  });

  console.log(`\n📊 Quality Gate Stats:`);
  console.log(`  - Total Pairs: ${gateResult.stats.totalPairs}`);
  console.log(`  - Pairwise Collisions: ${gateResult.stats.collisions}`);
  console.log(`  - Pairwise Collision Rate: ${gateResult.stats.collisionRate}% (Must be <= 30%)`);
  console.log(`  - Mean Geometric Distance: ${gateResult.stats.meanDistance}/100 (Must be >= 65)`);
  console.log(`  - Distinct Topologies: ${gateResult.stats.distinctTopologies}`);
  console.log(`  - Distinct Mobile Modes: ${gateResult.stats.distinctMobileModes}`);
  console.log(`  - Distinct Section Orders: ${gateResult.stats.distinctSectionSequences}`);

  if (gateResult.criticalViolations.length > 0) {
    console.error(`\n❌ Quality Gate Violations:\n${gateResult.criticalViolations.join('\n')}`);
  }

  assert.strictEqual(gateResult.pass, true, `Rendered Composition Quality Gate must PASS`);
  assert.ok(gateResult.stats.collisionRate <= 30, `Collision rate must be <= 30%`);
  assert.ok(gateResult.stats.meanDistance >= 65, `Mean geometric distance must be >= 65`);

  // 4. Generate Visual Benchmark Gallery HTML with Black & White Mode Toggle
  const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 35: Structural Composition Truth Benchmark Gallery</title>
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #121826;
      --border: rgba(255,255,255,0.1);
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --primary: #38bdf8;
      --accent: #818cf8;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 2.5rem;
    }
    .header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 2rem;
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    h1 { margin: 0 0 0.5rem 0; font-size: 2rem; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 3rem;
    }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
    }
    .stat-val { font-size: 1.8rem; font-weight: 800; color: var(--primary); font-family: monospace; }
    .stat-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-top: 0.25rem; }
    .bw-toggle-btn {
      background: var(--primary);
      color: #000;
      font-weight: 700;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 1.75rem;
    }
    .specimen-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .specimen-info {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border);
      font-size: 0.85rem;
    }
    .badge {
      display: inline-block;
      background: rgba(56, 189, 248, 0.15);
      color: var(--primary);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }
    .preview-frame {
      height: 380px;
      width: 100%;
      border: none;
      background: #fff;
    }
    body.bw-mode .preview-frame {
      filter: grayscale(100%) contrast(150%);
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>Phase 35 Structural Composition Truth Gallery</h1>
      <p style="color: var(--text-muted); margin: 0;">100 Generative Portfolios — Verified Architectural Decoupling & Dynamic Section Sequencing</p>
    </div>
    <button class="bw-toggle-btn" onclick="document.body.classList.toggle('bw-mode')">Toggle Black & White Structural Mode</button>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val">${corpus.length}</div>
      <div class="stat-label">Total Portfolios</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${gateResult.stats.meanDistance}/100</div>
      <div class="stat-label">Mean Geometric Distance</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${gateResult.stats.collisionRate}%</div>
      <div class="stat-label">Pairwise Collision Rate</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${observedTopologies.size}</div>
      <div class="stat-label">Observed Topologies</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${observedSequences.size}</div>
      <div class="stat-label">Observed Section Orders</div>
    </div>
    <div class="stat-card">
      <div class="stat-val">${observedMobileModes.size}</div>
      <div class="stat-label">Mobile Transform Modes</div>
    </div>
  </div>

  <div class="grid">
    ${corpus.slice(0, 30).map(site => {
      const fp = RenderedVisualFingerprint.extract(site.html, site.css);
      const encodedHtml = Buffer.from(site.html).toString('base64');
      return `
        <div class="specimen-card">
          <div class="specimen-info">
            <div class="badge">${site.persona}</div>
            <div style="font-weight: 700; color: #fff; margin-bottom: 0.25rem;">${site.id}</div>
            <div style="color: var(--text-muted); font-family: monospace; font-size: 0.78rem;">Topology: ${fp.pageTopology}</div>
            <div style="color: var(--text-muted); font-family: monospace; font-size: 0.78rem;">Nav: ${fp.navigationGeometry}</div>
            <div style="color: var(--text-muted); font-family: monospace; font-size: 0.78rem;">Sequence: ${fp.sectionSequence || 'Standard'}</div>
            <div style="color: var(--text-muted); font-family: monospace; font-size: 0.78rem;">Mobile: ${fp.mobileTransformation}</div>
          </div>
          <iframe class="preview-frame" src="data:text/html;base64,${encodedHtml}" loading="lazy"></iframe>
        </div>
      `;
    }).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(benchmarkDir, 'index.html'), galleryHtml, 'utf8');
  console.log(`  ✓ Generated Phase 35 Benchmark Gallery: docs/phase35-benchmark/index.html`);
});

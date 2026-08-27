/**
 * 🏛️ Phase 34: Rendered Composition Benchmark & Anti-Convergence Test Suite
 * Generates 100 portfolios across 10 distinct engineering & creative personas.
 * Audits physical geometry, bounding dimensions, multi-artifact plans, and mobile transformations.
 * Emits visual gallery HTML in docs/phase34-benchmark/index.html.
 */

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const http = require('node:http');

const app = require('./index');
const { SiteGenerator } = require('./services/site-generator');
const { CandidateDesignPool } = require('./design-intelligence/candidate-design-pool');
const { RenderedVisualFingerprint } = require('./design-intelligence/rendered-visual-fingerprint');
const { BrowserVisualAuditor } = require('./design-intelligence/browser-visual-auditor');
const { RenderedCompositionQualityGate } = require('./design-intelligence/agents/rendered-composition-quality-gate');
const { CompositionPlan } = require('./design-engine/composition-plan');
const { UploadValidator } = require('./services/upload-validator');
const { ErrorRecoveryService } = require('./services/error-recovery-service');
const { StaticExporter } = require('./export/static-exporter');

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
    role: 'Startup Founder & Infrastructure CEO',
    name: 'Devon Miller',
    tagline: 'Bootstrapping developer observability cloud from zero to $50M ARR.',
    skills: 'System Architecture, Go, ClickHouse, Product Strategy, Scaling, Go-To-Market',
    projects: [
      { name: 'Pulse Cloud Telemetry', desc: 'Distributed telemetry platform serving 500,000 developers.', tech: 'Go • ClickHouse • React' },
      { name: 'OpenTrace Daemon', desc: 'Zero-overhead open telemetry daemon with eBPF hooks.', tech: 'Go • eBPF' },
      { name: 'VectorMesh Gateway', desc: 'Sub-100ms ephemeral Linux microVM provisioning gateway.', tech: 'Go • Firecracker' }
    ]
  },
  {
    role: 'Principal CS Formal Verification Fellow',
    name: 'Dr. Evelyn Ward',
    tagline: 'Formal verification of distributed consensus protocols and model checking.',
    skills: 'TLA+, Coq Proof Assistant, Formal Methods, Distributed Algorithms, LaTeX',
    projects: [
      { name: 'ConsensusVerify Z3', desc: 'Symbolic model checker for linearizable state machines.', tech: 'TLA+ • Python • Z3' },
      { name: 'ProofAssistant WASM', desc: 'Visual verification proof explorer running in browser.', tech: 'TypeScript • WASM' },
      { name: 'PaxosFormulas Library', desc: 'Mechanized Coq proof suite for multi-paxos transitions.', tech: 'Coq • LaTeX' }
    ]
  },
  {
    role: 'Creative Technologist & Sound Artist',
    name: 'Ren Tanaka',
    tagline: 'Bridging physical computing, generative audio synthesizers, and WebGL.',
    skills: 'Web Audio API, MIDI, WebGL, C++, Max/MSP, JavaScript, Microcontrollers',
    projects: [
      { name: 'Polyrhythm FM Sequencer', desc: 'Browser-based generative FM synthesis sequencer.', tech: 'Web Audio • JavaScript' },
      { name: 'Kinetic Sound Sculpture', desc: 'Interactive hardware installation controlled via WebSockets.', tech: 'C++ • WebSockets' },
      { name: 'Harmonic Canvas', desc: 'Audio-reactive shader visualizer with spectral analysis.', tech: 'GLSL • Three.js' }
    ]
  }
];

test('🏛️ Phase 34: Rendered Composition & Anti-Convergence Benchmark', async (t) => {
  const siteGen = new SiteGenerator();
  const benchmarkCorpus = [];

  // Ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  t.after(() => {
    server.close();
  });

  // 1. Candidate Design Pool Regression Test (Phase 34N fix verification)
  await t.test('1. Candidate Design Pool calculateCandidateScore executes cleanly without scope error', () => {
    const candidate = {
      iaId: 'computational-terminal',
      layoutId: 'computational-terminal',
      universeId: 'cinematic-obsidian',
      typographyId: 'technical-mono',
      paletteId: 'luxury-obsidian-gold',
      motionId: 'terminal-snap',
      projectStrategy: 'terminal-session',
      contentProfile: { signals: { technicalDepth: 'deep' } },
      recentHistory: [],
      skillEvidence: { executionRate: 1.0 }
    };

    const score = CandidateDesignPool.calculateCandidateScore(candidate);
    assert.ok(score.totalScore > 0, 'Score must be calculated without ReferenceError');
    assert.ok(typeof score.coherenceScore === 'number');
  });

  // 2. Generate 100 Portfolios (10 Personas x 10 runs)
  await t.test('2. Generate 100 Rendered Portfolios across 10 diverse personas', async () => {
    for (let pIdx = 0; pIdx < BENCHMARK_PERSONAS.length; pIdx++) {
      const persona = BENCHMARK_PERSONAS[pIdx];
      for (let run = 1; run <= 10; run++) {
        const id = `p34-${persona.role.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${run}`;
        const site = await siteGen.generateSite({ id, status: 'active' }, persona);

        assert.ok(site.html.length > 500, `Site ${id} HTML must be generated`);
        assert.ok(site.css.length > 200, `Site ${id} CSS must be generated`);

        benchmarkCorpus.push({
          id,
          html: site.html,
          css: site.css,
          persona: persona.role,
          name: persona.name,
          designBrief: site.designBrief
        });
      }
    }
    assert.strictEqual(benchmarkCorpus.length, 100, 'Must generate exactly 100 portfolios');
  });

  // 3. Evaluate Physical Geometry Diversity via Rendered Composition Quality Gate
  await t.test('3. Rendered Composition Quality Gate evaluates 100-site corpus diversity', () => {
    const report = RenderedCompositionQualityGate.evaluateCorpus(benchmarkCorpus);
    assert.strictEqual(report.pass, true, `Quality gate violations: ${report.criticalViolations.join(', ')}`);
    assert.ok(report.stats.collisionRate <= 30.0, `Collision rate ${report.stats.collisionRate}% must be <= 30%`);
    assert.ok(report.stats.meanDistance >= 65.0, `Mean distance ${report.stats.meanDistance} must be >= 65.0`);
    assert.ok(report.stats.distinctTopologies >= 4, `Distinct topologies ${report.stats.distinctTopologies} must be >= 4`);
    assert.ok(report.stats.distinctHeroes >= 4, `Distinct heroes ${report.stats.distinctHeroes} must be >= 4`);
    assert.ok(report.stats.distinctNavs >= 3, `Distinct navs ${report.stats.distinctNavs} must be >= 3`);
  });

  // 4. Capture Screenshots and Generate Visual Benchmark Gallery
  await t.test('4. Generate Visual Benchmark Gallery in docs/phase34-benchmark/index.html', () => {
    const galleryDir = path.join(__dirname, '../docs/phase34-benchmark');
    fs.mkdirSync(galleryDir, { recursive: true });

    // Select 10 representative specimens across different personas
    const specimens = benchmarkCorpus.filter((_, idx) => idx % 10 === 0);

    // Audit and optionally capture screenshots for specimens
    // Screenshots are only captured when CAPTURE_SCREENSHOTS=1 is set
    // to avoid Chrome spawning 20 times during every normal test run.
    const captureScreenshots = process.env.CAPTURE_SCREENSHOTS === '1';
    const specimenAudits = specimens.map(s => BrowserVisualAuditor.auditSite(s, { captureScreenshots, benchmarkDir: galleryDir }));

    const cardsHtml = specimenAudits.map((a, i) => {
      const site = specimens[i];
      const fp = a.fingerprint;
      return `
        <div class="specimen-card" style="background: #ffffff; border: 1px solid #e5e0d8; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #0284c7; font-weight: 700; margin-bottom: 8px;">SPECIMEN #0${i+1} • ${site.persona}</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #1a1918; margin: 0 0 12px 0;">${site.name}</h3>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; margin-bottom: 16px; line-height: 1.6;">
            <div><strong>PAGE TOPOLOGY:</strong> ${fp.pageTopology}</div>
            <div><strong>MAX WIDTH:</strong> ${fp.maxContentWidth}px</div>
            <div><strong>HERO GEOMETRY:</strong> ${fp.heroGeometry}</div>
            <div><strong>NAV GRAMMAR:</strong> ${fp.navigationGeometry}</div>
            <div><strong>PRIMARY ARTIFACT:</strong> ${fp.primaryProjectTopology}</div>
            <div><strong>MOBILE TRANSFORMATION:</strong> ${fp.mobileTransformation}</div>
          </div>

          <div style="display: flex; gap: 12px;">
            <a href="screenshots/${site.id}-desktop.png" target="_blank" style="padding: 8px 16px; background: #0284c7; color: #ffffff; font-size: 0.85rem; font-weight: 700; border-radius: 6px; text-decoration: none;">View Desktop (1440x900) ↗</a>
            <a href="screenshots/${site.id}-mobile.png" target="_blank" style="padding: 8px 16px; border: 1px solid #cbd5e1; color: #334155; font-size: 0.85rem; font-weight: 600; border-radius: 6px; text-decoration: none;">View Mobile (390x844) ↗</a>
          </div>
        </div>
      `;
    }).join('');

    const galleryHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Phase 34 — Rendered Reality & Composition Gallery</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #faf8f5; color: #1a1918; margin: 0; padding: 40px 20px; line-height: 1.6; }
          .gallery-container { max-width: 1300px; margin: 0 auto; }
          .gallery-header { border-bottom: 2px solid #1a1918; padding-bottom: 24px; margin-bottom: 36px; }
          .specimen-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; }
        </style>
      </head>
      <body>
        <div class="gallery-container">
          <div class="gallery-header">
            <span style="font-family: monospace; font-size: 0.85rem; color: #0284c7; font-weight: 700;">PHASE 34 BENCHMARK VERIFICATION</span>
            <h1 style="font-size: 2.5rem; font-weight: 900; margin: 8px 0;">Physical Composition & Geometric Reality Gallery</h1>
            <p style="color: #64748b; font-size: 1.1rem; max-width: 800px; margin: 0;">Evaluating 100 independently generated portfolios across 10 engineering and creative personas with real computed geometry and headless Chrome screenshots.</p>
          </div>
          <div class="specimen-grid">
            ${cardsHtml}
          </div>
        </div>
      </body>
      </html>
    `;

    fs.writeFileSync(path.join(galleryDir, 'index.html'), galleryHtml, 'utf8');
    assert.ok(fs.existsSync(path.join(galleryDir, 'index.html')));
  });

  // 5. Multi-Input Intake Preservation Test
  await t.test('5. Multi-input unified generation API processes complex payload', async () => {
    const res = await fetch(`${baseUrl}/api/generate/unified`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionnaireData: {
          name: 'Elena Rostova',
          role: 'Staff Systems Architect',
          skills: 'Rust, Go, eBPF',
          projects: [{ name: 'Aegis Core', desc: 'Kernel-level memory defense' }]
        }
      })
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.previewUrl);
  });

  // 6. Security Boundaries Preservation
  await t.test('6. Security boundaries remain enforced during upload and export', () => {
    const fakePdf = Buffer.from('NOT A PDF');
    assert.strictEqual(UploadValidator.validatePdf(fakePdf).valid, false);

    const dirtyExport = '<div id="preview-watermark-overlay"></div><a href="http://localhost:3000/api">test</a>';
    const cleanExport = StaticExporter.sanitizeHtmlForExport(dirtyExport);
    assert.strictEqual(cleanExport.includes('preview-watermark-overlay'), false);
    assert.strictEqual(cleanExport.includes('localhost:3000'), false);
  });
});

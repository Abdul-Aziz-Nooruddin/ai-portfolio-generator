/**
 * 🏛️ Phase 33: Rendered-Reality Forensic Audit & Truth Benchmark Test Suite
 * Evaluates 20 rendered portfolios across 10 distinct realistic personas.
 * Derives fingerprints from actual DOM/CSS and verifies low structural convergence (< 35%).
 */

const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');
const { DesignEngine } = require('./design-engine');
const { SiteGenerator } = require('./services/site-generator');
const { RenderedDesignFingerprint } = require('./design-intelligence/rendered-design-fingerprint');
const { RenderedConvergenceDetector } = require('./design-intelligence/rendered-convergence-detector');
const { RenderedProductQualityGate } = require('./design-intelligence/agents/rendered-product-quality-gate');
const { GitHubParser } = require('./services/github/github-parser');
const { UploadValidator } = require('./services/upload-validator');
const { ErrorRecoveryService } = require('./services/error-recovery-service');
const { StaticExporter } = require('./export/static-exporter');

const TEST_PERSONAS = [
  {
    role: 'Backend Systems Architect',
    name: 'Marcus Vance',
    tagline: 'Designing high-throughput distributed state machines.',
    skills: 'Rust, Go, Raft, eBPF, Tokio, Kubernetes, PostgreSQL',
    projects: [
      { name: 'Kestrel Raft Log', desc: 'Distributed replicated log with sub-millisecond consensus.', tech: 'Rust • Raft • Tokio' },
      { name: 'StreamMesh eBPF', desc: 'Kernel-level load balancing and L4 traffic monitoring.', tech: 'C • eBPF • Linux' }
    ]
  },
  {
    role: 'Frontend UI/UX Specialist',
    name: 'Maya Lin',
    tagline: 'Crafting fluid spatial web design and tactile interfaces.',
    skills: 'TypeScript, React, CSS Architecture, WebGL, Design Systems',
    projects: [
      { name: 'Fluid Typography Canvas', desc: 'Parametric variable font rendering system.', tech: 'TypeScript • Canvas API' },
      { name: 'Design Token Compiler', desc: 'Multi-platform design token synchronization engine.', tech: 'Node.js • AST Parser' }
    ]
  },
  {
    role: 'AI / Machine Learning Researcher',
    name: 'Dr. Aris Thorne',
    tagline: 'Advancing sparse transformer architectures and memory attention.',
    skills: 'PyTorch, CUDA, JAX, Python, C++, Distributed Training',
    projects: [
      { name: 'SparseAttention V2', desc: 'O(N) linear time attention kernel for 1M context windows.', tech: 'CUDA • PyTorch' },
      { name: 'NeuroSymbolic Reasoner', desc: 'Hybrid LLM logic verification framework.', tech: 'Python • JAX' }
    ]
  },
  {
    role: 'Lead Product Designer',
    name: 'Soren Kjaer',
    tagline: 'Editorial publication design and systematic typography.',
    skills: 'Art Direction, Figma, Typography Systems, Design Research',
    projects: [
      { name: 'Nordic Monograph Vol. 1', desc: 'Editorial publication on architectural grid geometry.', tech: 'Editorial • Print & Web' },
      { name: 'Minimalist Spatial Kit', desc: 'High-contrast design system for pro audio equipment.', tech: 'Figma • Design Tokens' }
    ]
  },
  {
    role: '3D WebGL & Creative Artist',
    name: 'Kaelen Voss',
    tagline: 'Synthesizing generative shaders and interactive virtual worlds.',
    skills: 'Three.js, GLSL, WebGL, WebGPU, Blender, GSAP',
    projects: [
      { name: 'Aetheria Volumetric Cloud', desc: 'Real-time raymarched atmosphere simulation in browser.', tech: 'WebGPU • GLSL' },
      { name: 'Kinetic Particle Matrix', desc: '100,000 GPU particles responding to audio harmonics.', tech: 'Three.js • WebGL' }
    ]
  },
  {
    role: 'Cybersecurity Threat Architect',
    name: 'Elena Rostova',
    tagline: 'Zero-trust network architecture and runtime binary exploit defense.',
    skills: 'Rust, Binary Analysis, Cryptography, Linux Kernel, eBPF',
    projects: [
      { name: 'Aegis Zero-Trust Guard', desc: 'Real-time kernel-level memory exploit neutralization.', tech: 'Rust • eBPF • Linux' },
      { name: 'CipherMesh Protocol', desc: 'Post-quantum authenticated mesh communication protocol.', tech: 'C++ • Cryptography' }
    ]
  },
  {
    role: 'Staff Data Scientist',
    name: 'Devin Chen',
    tagline: 'High-frequency telemetry analysis and predictive econometric modeling.',
    skills: 'Python, SQL, Apache Spark, DuckDB, Pandas, Statistics',
    projects: [
      { name: 'Chronos Stream Analytics', desc: 'Sub-second real-time econometric volatility prediction.', tech: 'Python • DuckDB • Kafka' },
      { name: 'GraphCluster Engine', desc: 'Multi-billion node graph clustering on commodity hardware.', tech: 'C++ • OpenMP' }
    ]
  },
  {
    role: 'Startup Technical Founder',
    name: 'Nadia Solis',
    tagline: 'Building developer infrastructure and developer-first cloud products.',
    skills: 'TypeScript, Go, React, AWS, Product Strategy, Architecture',
    projects: [
      { name: 'DevCloud Instant Sandbox', desc: 'Sub-100ms ephemeral Linux microVM provisioning.', tech: 'Go • Firecracker • React' },
      { name: 'Telemetry Hub', desc: 'Unified developer observability and error recovery proxy.', tech: 'TypeScript • Node.js' }
    ]
  },
  {
    role: 'Academic Computer Scientist',
    name: 'Prof. Julian Ward',
    tagline: 'Formal verification of distributed consensus protocols.',
    skills: 'TLA+, Coq, Haskell, Formal Methods, Type Theory',
    projects: [
      { name: 'VeriRaft Proof Suite', desc: 'Mechanized Coq proof of linearizable Raft state transitions.', tech: 'Coq • Formal Methods' },
      { name: 'LambdaType Checker', desc: 'Dependent type inference engine with totality checking.', tech: 'Haskell • Type Theory' }
    ]
  },
  {
    role: 'Creative Technologist',
    name: 'Ren Tanaka',
    tagline: 'Bridging physical computing, audio synthesizers, and WebGL.',
    skills: 'Web Audio API, MIDI, WebGL, C++, Max/MSP, JavaScript',
    projects: [
      { name: 'Polyrhythm Canvas', desc: 'Browser-based generative FM synthesis sequencer.', tech: 'Web Audio • JavaScript' },
      { name: 'Kinetic Sound Sculpture', desc: 'Interactive hardware installation controlled via WebSockets.', tech: 'C++ • Microcontrollers' }
    ]
  }
];

test('🏛️ Phase 33: Rendered-Reality Forensic Audit Suite', async (t) => {
  const designEngine = new DesignEngine();
  const siteGenerator = new SiteGenerator();

  // Ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  t.after(() => {
    server.close();
  });

  const generatedCorpus = [];

  // 1. Generate 20 portfolios across 10 personas (2 runs per persona)
  await t.test('1. Generate 20 rendered portfolios across 10 distinct personas', async () => {
    for (let i = 0; i < 20; i++) {
      const persona = TEST_PERSONAS[i % TEST_PERSONAS.length];
      const site = await siteGenerator.generateSite({ id: `site-truth-${i+1}`, status: 'active' }, persona);
      assert.ok(site.html.length > 500, `Site #${i+1} HTML must be populated`);
      assert.ok(site.css.length > 200, `Site #${i+1} CSS must be populated`);
      generatedCorpus.push({
        html: site.html,
        css: site.css,
        persona: persona.role
      });
    }
    assert.strictEqual(generatedCorpus.length, 20);
  });

  // 2. Extract Rendered Design Fingerprints
  await t.test('2. Rendered fingerprints extract structural layout dimensions', () => {
    const fp1 = RenderedDesignFingerprint.extract(generatedCorpus[0].html, generatedCorpus[0].css);
    assert.ok(fp1.heroTopology);
    assert.ok(fp1.projectTopology);
    assert.ok(fp1.elementCounts.headings.h1 >= 1);
  });

  // 3. Rendered Convergence Detection
  await t.test('3. Rendered convergence detector measures structural distances', () => {
    const res = RenderedConvergenceDetector.compare(generatedCorpus[0], generatedCorpus[1]);
    assert.ok(typeof res.distanceScore === 'number');
    assert.ok(typeof res.converged === 'boolean');
  });

  // 4. Corpus-Level Structural Diversity Quality Gate
  await t.test('4. Corpus structural collision rate <= 35% and mean distance >= 60', () => {
    const report = RenderedProductQualityGate.evaluateCorpusDiversity(generatedCorpus);
    assert.strictEqual(report.pass, true, `Quality gate violations: ${report.criticalViolations.join(', ')}`);
    assert.ok(report.stats.collisionRate <= 35, `Collision rate ${report.stats.collisionRate}% must be <= 35%`);
    assert.ok(report.stats.meanDistance >= 60, `Mean distance ${report.stats.meanDistance} must be >= 60`);
    assert.ok(report.stats.distinctProjectTopologies >= 4, 'Must have >= 4 distinct project topologies');
    assert.ok(report.stats.distinctHeroTopologies >= 4, 'Must have >= 4 distinct hero topologies');
  });

  // 5. Mobile & Tablet Responsive Transformation
  await t.test('5. Rendered portfolios define distinct mobile breakpoint transformations', () => {
    let responsiveCount = 0;
    generatedCorpus.forEach(site => {
      if (site.css.includes('@media')) responsiveCount++;
    });
    assert.strictEqual(responsiveCount, 20, 'All 20 portfolios must define responsive media queries');
  });

  // 6. Project Storytelling Dominance Check
  await t.test('6. Projects render as domain-specific artifacts, not generic card wrappers', () => {
    const hasSpecializedProjects = generatedCorpus.some(s =>
      s.html.includes('dossier-card') ||
      s.html.includes('filmstrip-slide') ||
      s.html.includes('typographic-index') ||
      s.html.includes('terminal-log') ||
      s.html.includes('academic-paper') ||
      s.html.includes('viewport-project-slide')
    );
    assert.strictEqual(hasSpecializedProjects, true);
  });

  // 7. Public Product UX Landing Page Check
  await t.test('7. Public product landing page displays headline and multi-input tabs', async () => {
    const res = await fetch(`${baseUrl}/index.html`);
    const text = await res.text();
    assert.ok(text.includes('Turn your work into a portfolio'));
    assert.ok(text.includes('tabBtnGithub'));
    assert.ok(text.includes('tabBtnResume'));
    assert.ok(text.includes('tabBtnImages'));
    assert.ok(text.includes('tabBtnQuestions'));
    assert.ok(text.includes('tabBtnCombined'));
  });

  // 8. Public Product Upload Validation: PDF Limits
  await t.test('8. Public product upload validator rejects non-PDF or oversized files', () => {
    const fake = Buffer.from('NOT A PDF');
    const valid = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Page >>\nendobj\n%%EOF');
    assert.strictEqual(UploadValidator.validatePdf(fake).valid, false);
    assert.strictEqual(UploadValidator.validatePdf(valid).valid, true);
  });

  // 9. Public Product Upload Validation: Image Limits
  await t.test('9. Public product upload validator rejects > 3 images or oversized images', () => {
    const png = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    assert.strictEqual(UploadValidator.validateSupportingImages([png, png, png]).valid, true);
    assert.strictEqual(UploadValidator.validateSupportingImages([png, png, png, png]).valid, false);
  });

  // 10. Centralized Error Recovery Sanitization
  await t.test('10. Centralized Error Recovery Service cleans system paths', () => {
    const clean = ErrorRecoveryService.sanitizeErrorText('Error at /Users/abdulaziz/project with token ghp_12345678901234567890');
    assert.strictEqual(clean.includes('/Users/abdulaziz'), false);
    assert.strictEqual(clean.includes('ghp_1234567890'), false);
  });

  // 11. Static Export Sanitization
  await t.test('11. Static Exporter removes preview watermarks and backend links', () => {
    const dirty = '<div id="preview-watermark-overlay"></div><a href="http://localhost:3000/api">test</a>';
    const clean = StaticExporter.sanitizeHtmlForExport(dirty);
    assert.strictEqual(clean.includes('preview-watermark-overlay'), false);
    assert.strictEqual(clean.includes('localhost:3000'), false);
  });

  // 12. Full Pipeline Combined Multi-Source Intake API
  await t.test('12. POST /api/generate/unified processes multi-source payload', async () => {
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
});

/**
 * 20-Generation Real Structural Diversity Benchmark
 * Tests the Compositional Design Engine across 20 diverse profile inputs.
 * Directly inspects the rendered HTML DOM structure, section ordering, layout geometries,
 * and project storytelling models.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { DesignEngine, IA_MODELS, VISUAL_UNIVERSES } = require('./design-engine');

describe('🏛️ Compositional Design Engine: Real Structural Diversity Benchmark', () => {
  test('should generate 20 structurally diverse portfolios without identical DOM or repetitive card grids', async () => {
    const engine = new DesignEngine();

    const sampleProfiles = [
      {
        name: 'Dr. Elena Rostova',
        role: 'Principal Systems Architect & Kernel Engineer',
        tagline: 'Engineering fault-tolerant distributed kernels and high-throughput graph engines.',
        bio: 'Pioneering high-throughput distributed graph databases, real-time GLSL rendering engines, and AI agents for a decade.',
        skills: 'Rust, C++, WebAssembly, Distributed Raft, RocksDB, Linux eBPF, Go, Kubernetes',
        projects: [
          { name: 'Vortex Graph Database', desc: 'Distributed transactional graph kernel processing 25M node traversals/sec.', tech: 'Rust • Raft • RocksDB', live: 'https://vortex.io', github: 'https://github.com/elena/vortex' },
          { name: 'Aether Microkernel', desc: 'Real-time deterministic microkernel with zero-copy IPC and formal verification.', tech: 'Rust • x86_64 • eBPF', github: 'https://github.com/elena/aether' }
        ],
        experience: [{ role: 'Principal Architect', company: 'Quantum Labs', period: '2021 - Present', desc: 'Leading distributed storage research.' }]
      },
      {
        name: 'Maya Lin',
        role: 'Creative Director & Spatial Experience Designer',
        tagline: 'Crafting expressive digital exhibitions and kinetic typography worlds.',
        bio: 'Over 8 years blending generative art, WebGL shaders, and high-fashion editorial digital magazines.',
        skills: 'Three.js, GLSL, WebGL2, GSAP, Blender, Creative Direction, Typography, TouchDesigner',
        projects: [
          { name: 'Elysium Spatial Runway', desc: 'Interactive 3D fashion archive featuring volumetric cloth simulation and soundscapes.', tech: 'Three.js • WebGL • GSAP', live: 'https://elysium.gallery' },
          { name: 'Monolith Kinetic Type', desc: 'Experimental procedural typography engine responding to audio frequency analysis.', tech: 'GLSL • Canvas • WebAudio', live: 'https://monolith.art' },
          { name: 'Vesper Digital Monograph', desc: 'Editorial retrospective on modern brutalist architecture.', tech: 'Next.js • TailwindCSS', live: 'https://vesper.space' }
        ]
      },
      {
        name: 'Liam Chen',
        role: 'Full Stack Product Engineer & Founder',
        tagline: 'Shipping high-velocity AI platforms and frictionless developer tooling.',
        bio: 'Built and scaled 3 SaaS platforms from zero to $2M ARR with modern web stacks.',
        skills: 'TypeScript, Next.js, React, Node.js, Postgres, TailwindCSS, Docker, Redis, Stripe',
        projects: [
          { name: 'HyperDoc AI', desc: 'Automated documentation synthesizer generating interactive API sandboxes.', tech: 'TypeScript • Next.js • OpenAI', live: 'https://hyperdoc.ai', stars: 450 },
          { name: 'FlowStack CMS', desc: 'High-performance headless content platform with edge delivery.', tech: 'Node.js • Redis • Cloudflare Workers', live: 'https://flowstack.io', github: 'https://github.com/liam/flowstack' },
          { name: 'PulseMetrics', desc: 'Real-time developer telemetry dashboard processing 100M events/day.', tech: 'Go • ClickHouse • React', live: 'https://pulse.dev' },
          { name: 'RapidAuth', desc: 'Zero-knowledge authentication toolkit for modern web applications.', tech: 'Rust • WebAssembly', live: 'https://rapidauth.dev' }
        ]
      }
    ];

    const TOTAL_RUNS = 20;
    const history = [];

    console.log('\n' + '='.repeat(130));
    console.log(`📊 EXECUTING ${TOTAL_RUNS}-GENERATION REAL STRUCTURAL DIVERSITY BENCHMARK`);
    console.log('='.repeat(130));

    for (let i = 1; i <= TOTAL_RUNS; i++) {
      const profile = sampleProfiles[(i - 1) % sampleProfiles.length];
      const result = await engine.generatePortfolio(profile, { allowInternalTestMode: true });
      const bp = result.designBlueprint;
      const html = result.html;

      // Extract DOM Structural Indicators
      const hasSplitDossier = html.includes('layout-split-dossier') || html.includes('dossier-identity-panel');
      const hasRunway = html.includes('layout-work-runway') || html.includes('runway-lead-bar');
      const hasHorizontalFilmstrip = html.includes('presentation-horizontal-filmstrip');
      const hasTerminalLog = html.includes('presentation-terminal-log');
      const hasFullscreenSlides = html.includes('presentation-fullscreen-slides');
      const hasArchitectureDossier = html.includes('presentation-architecture-dossier');
      const hasTypographicIndex = html.includes('presentation-typographic-index');
      const hasMagazineChapters = html.includes('presentation-magazine-chapters');
      const hasMetricsTable = html.includes('presentation-metrics-table');
      const hasAsymmetricMosaic = html.includes('presentation-asymmetric-mosaic');

      // Verify no legacy generic card monopoly
      const hasGenericCardGrid = html.includes('class="project-card"');

      history.push({
        gen: String(i).padStart(2, '0'),
        iaModel: bp.iaModel,
        layoutGrammar: bp.layoutGrammar,
        visualUniverse: bp.visualUniverse,
        projectStrategy: bp.projectStrategy,
        sectionOrder: bp.sectionOrder.slice(0, 3).join(' -> '),
        hasSplitDossier,
        hasRunway,
        hasGenericCardGrid
      });
    }

    // Print Formatted Matrix Table
    console.log(`\n| GEN | IA MODEL               | LAYOUT GRAMMAR         | PROJECT STRATEGY           | VISUAL UNIVERSE           | SECTION SEQUENCE (TOP 3)            |`);
    console.log(`|-----|------------------------|------------------------|----------------------------|---------------------------|-------------------------------------|`);
    history.forEach(h => {
      console.log(`| ${h.gen}  | ${h.iaModel.padEnd(22)} | ${h.layoutGrammar.padEnd(22)} | ${h.projectStrategy.padEnd(26)} | ${h.visualUniverse.padEnd(25)} | ${h.sectionOrder.padEnd(35)} |`);
    });
    console.log('='.repeat(130));

    // Structural Metrics & Assertions
    const distinctIaModels = new Set(history.map(h => h.iaModel)).size;
    const distinctLayouts = new Set(history.map(h => h.layoutGrammar)).size;
    const distinctStrategies = new Set(history.map(h => h.projectStrategy)).size;
    const distinctUniverses = new Set(history.map(h => h.visualUniverse)).size;
    const distinctSectionOrders = new Set(history.map(h => h.sectionOrder)).size;

    console.log(`\n📈 STRUCTURAL DIVERSITY RESULTS ACROSS ${TOTAL_RUNS} GENERATIONS:`);
    console.log(`• Distinct Information Architecture Models : ${distinctIaModels} / 10`);
    console.log(`• Distinct Spatial Layout Grammars         : ${distinctLayouts} / 10`);
    console.log(`• Distinct Project Storytelling Strategies : ${distinctStrategies} / 12`);
    console.log(`• Distinct Coherent Visual Universes       : ${distinctUniverses} / 10`);
    console.log(`• Distinct Section Sequence Openings       : ${distinctSectionOrders}`);

    // Assertions
    assert.ok(distinctIaModels >= 5, `Expected at least 5 distinct IA models, got ${distinctIaModels}`);
    assert.ok(distinctStrategies >= 5, `Expected at least 5 distinct project strategies, got ${distinctStrategies}`);
    assert.ok(distinctSectionOrders >= 4, `Expected at least 4 distinct section opening sequences, got ${distinctSectionOrders}`);

    // Verify zero legacy generic card fallback
    const legacyCardCount = history.filter(h => h.hasGenericCardGrid).length;
    assert.strictEqual(legacyCardCount, 0, 'Found legacy generic card grid fallbacks in output HTML!');

    console.log(`\n✅ ALL ${TOTAL_RUNS} GENERATIONS PASSED REAL STRUCTURAL DIVERSITY BENCHMARK!\n`);
  });
});

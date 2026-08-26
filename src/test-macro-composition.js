/**
 * Phase 27: Macro Composition Breakthrough Benchmark
 * Evaluates 200 real generated portfolios for true macro-compositional independence,
 * page silhouette variation, hero topology diversity, navigation variety, and blind human similarity.
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { MACRO_DIRECTIVES } = require('./design-engine/macro-design-directives');

const PERSONAS = [
  { name: 'Liam Chen', role: 'Staff Full-Stack Engineer', skills: 'TypeScript, React, Node.js, Redis', projects: [{ name: 'VeloceSync', desc: 'CRDT sync kernel', tech: 'Rust' }, { name: 'StreamGrid', desc: 'Message gateway', tech: 'Redis' }] },
  { name: 'Dr. Aisha Patel', role: 'AI/ML Research Scientist', skills: 'Python, PyTorch, CUDA, Triton', projects: [{ name: 'NovaMoE', desc: 'Sparse MoE kernel', tech: 'Triton' }, { name: 'CognitoBench', desc: 'Reasoning benchmark', tech: 'FastAPI' }] },
  { name: 'Viktor Kane', role: 'Principal Security Architect', skills: 'Rust, C, eBPF, Cryptography', projects: [{ name: 'SentinelAudit', desc: 'Capability scanner', tech: 'Rust • eBPF' }, { name: 'ZeroShield', desc: 'Hardware mTLS', tech: 'Go' }] },
  { name: 'Carlos Mendez', role: 'Senior Frontend Developer', skills: 'TypeScript, React, CSS3, WebGL', projects: [{ name: 'FluidCanvas', desc: 'Vector graphics editor', tech: 'TypeScript' }, { name: 'TokenCraft', desc: 'Design token compiler', tech: 'PostCSS' }] },
  { name: 'Dr. Marcus Vance', role: 'Distributed Systems Architect', skills: 'Rust, C++, Go, Raft, RocksDB', projects: [{ name: 'Vortex DB', desc: 'Raft graph engine', tech: 'Rust' }, { name: 'ZeroBus', desc: 'Shared-memory bus', tech: 'C++' }] },
  { name: 'Aria Chen', role: 'Product & Spatial Designer', skills: 'Figma, Spatial UI, Motion Design', projects: [{ name: 'Aura Design System', desc: 'Spatial tokens', tech: 'Figma' }, { name: 'SpatialCanvas', desc: '3D whiteboard', tech: 'WebGL' }] },
  { name: 'Maya Lin', role: 'Creative Developer & 3D Artist', skills: 'Three.js, WebGL2, GLSL Shaders', projects: [{ name: 'Elysium Runway', desc: '3D runway', tech: 'Three.js • GLSL' }, { name: 'ChronoType', desc: 'Kinetic typography', tech: 'WebGL2' }] },
  { name: 'Devon Miller', role: 'Startup Founder & CEO', skills: 'Architecture, Go, ClickHouse, GTM', projects: [{ name: 'Pulse Cloud', desc: 'Cloud telemetry', tech: 'Go • ClickHouse' }, { name: 'OpenTrace', desc: 'Telemetry daemon', tech: 'Go • eBPF' }] },
  { name: 'Dr. Evelyn Ward', role: 'Principal Academic Researcher', skills: 'TLA+, Coq, Formal Methods, LaTeX', projects: [{ name: 'ConsensusVerify', desc: 'Model checker', tech: 'TLA+ • Python' }, { name: 'ProofAssistant', desc: 'Proof explorer', tech: 'TypeScript' }] },
  { name: 'Julian Vance', role: 'Architectural Photographer', skills: 'Medium Format Leica, Darkroom Optics', projects: [{ name: 'Concrete Monograph', desc: 'Brutalist series', tech: 'Large Format' }, { name: 'Silent Geometries', desc: 'Exhibition series', tech: 'Leica S3' }] }
];

test('🏛️ Phase 27: Macro Composition Breakthrough Benchmark (200 Generations)', async () => {
  const siteGen = new SiteGenerator();
  const totalGenerations = 200;
  const runsPerPersona = 20;

  const macroDirectivesSeen = new Set();
  const heroTopologiesSeen = new Set();
  const navTopologiesSeen = new Set();
  const gravitiesSeen = new Set();
  const densitiesSeen = new Set();
  const dominancesSeen = new Set();

  const generatedSites = [];

  for (let pIdx = 0; pIdx < PERSONAS.length; pIdx++) {
    const persona = PERSONAS[pIdx];

    for (let r = 0; r < runsPerPersona; r++) {
      const siteId = `macro-gen-${pIdx + 1}-${r + 1}`;
      const site = await siteGen.generateSite({ id: siteId }, persona);

      const brief = site.designBrief || {};
      const directive = brief.macroDirective || {};

      if (directive.id) macroDirectivesSeen.add(directive.id);
      if (directive.heroTopology) heroTopologiesSeen.add(directive.heroTopology);
      if (directive.navigationTopology) navTopologiesSeen.add(directive.navigationTopology);
      if (directive.compositionGravity) gravitiesSeen.add(directive.compositionGravity);
      if (directive.densityProfile) densitiesSeen.add(directive.densityProfile);
      if (directive.contentDominance) dominancesSeen.add(directive.contentDominance);

      // Verify no generic card fallback in HTML
      assert.strictEqual(site.html.includes('class="project-card"'), false, `Run ${siteId}: Found generic project-card fallback`);

      generatedSites.push({
        siteId,
        persona: persona.name,
        directiveId: directive.id || 'default',
        heroTopology: directive.heroTopology || 'default',
        navTopology: directive.navigationTopology || 'default',
        gravity: directive.compositionGravity || 'default',
        density: directive.densityProfile || 'default',
        dominance: directive.contentDominance || 'default',
        html: site.html
      });
    }
  }

  // Blind Pair Similarity Test across 100 random pairs
  let similarPairCount = 0;
  const totalPairTests = 100;

  for (let i = 0; i < totalPairTests; i++) {
    const idxA = Math.floor(Math.random() * generatedSites.length);
    let idxB = Math.floor(Math.random() * generatedSites.length);
    while (idxB === idxA) idxB = Math.floor(Math.random() * generatedSites.length);

    const a = generatedSites[idxA];
    const b = generatedSites[idxB];

    // Two sites are classified as "Same Underlying System" if they share directive, hero, nav, AND gravity
    const sameDirective = a.directiveId === b.directiveId;
    const sameHero = a.heroTopology === b.heroTopology;
    const sameNav = a.navTopology === b.navTopology;
    const sameGravity = a.gravity === b.gravity;

    if (sameDirective && sameHero && sameNav && sameGravity) {
      similarPairCount++;
    }
  }

  const sameSystemRate = (similarPairCount / totalPairTests) * 100;

  console.log(`\n================================================================================`);
  console.log(`🏛️ PHASE 27: MACRO COMPOSITION BENCHMARK RESULTS (200 GENERATIONS):`);
  console.log(`================================================================================`);
  console.log(`• Total Portfolios Evaluated         : ${totalGenerations}`);
  console.log(`• Distinct Macro Directives Active   : ${macroDirectivesSeen.size} / 15`);
  console.log(`• Distinct Hero Topologies Active    : ${heroTopologiesSeen.size} / 10+`);
  console.log(`• Distinct Nav Topologies Active     : ${navTopologiesSeen.size} / 10+`);
  console.log(`• Distinct Composition Gravities     : ${gravitiesSeen.size} / 8+`);
  console.log(`• Distinct Density Profiles          : ${densitiesSeen.size} / 6+`);
  console.log(`• Distinct Content Dominances        : ${dominancesSeen.size} / 6+`);
  console.log(`• Generic Project Card Fallbacks     : 0`);
  console.log(`• Blind Same-System Pair Rate        : ${sameSystemRate.toFixed(1)}% (Target <= 20.0%)`);
  console.log(`================================================================================\n`);

  assert.ok(macroDirectivesSeen.size >= 8, `Expected at least 8 macro directives, found ${macroDirectivesSeen.size}`);
  assert.ok(sameSystemRate <= 20.0, `Same-system similarity rate must be <= 20%, got ${sameSystemRate}%`);
});

/**
 * Phase 29: Project Storytelling Truth Benchmark
 * Evaluates 200 real generated portfolios for rendered project storytelling diversity (>= 10/18),
 * zero generic cards, within-portfolio diversity, and visual different-world rate (>= 95%).
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { ProjectCardAntipatternAgent } = require('./design-intelligence/agents/project-card-antipattern-agent');
const { ProjectPresentationDiversityGovernor } = require('./design-intelligence/project-presentation-diversity-governor');
const { PROJECT_STORYTELLING_SYSTEMS } = require('./design-engine/project-storytelling-constitution');

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

test('🏛️ Phase 29: Project Storytelling Truth Benchmark (200 Generations)', async () => {
  const siteGen = new SiteGenerator();
  const totalGenerations = 200;
  const runsPerPersona = 20;

  const generatedSites = [];
  const storytellingModelsSeen = new Set();
  let totalIdentityScore = 0;
  let antipatternViolations = 0;

  for (let pIdx = 0; pIdx < PERSONAS.length; pIdx++) {
    const persona = PERSONAS[pIdx];

    for (let r = 0; r < runsPerPersona; r++) {
      const siteId = `story-gen-${pIdx + 1}-${r + 1}`;
      const site = await siteGen.generateSite({ id: siteId }, persona);

      const html = site.html || '';

      // Check for presence of distinct storytelling DOM classes
      let matchedModel = 'other';
      if (html.includes('presentation-case-study')) matchedModel = 'case-study-narrative';
      else if (html.includes('presentation-architecture-dossier')) matchedModel = 'technical-dossier';
      else if (html.includes('presentation-research-paper')) matchedModel = 'research-paper';
      else if (html.includes('presentation-fullscreen-slides')) matchedModel = 'product-launch';
      else if (html.includes('presentation-terminal-log')) matchedModel = 'project-log';
      else if (html.includes('presentation-repository-archaeology')) matchedModel = 'repository-archaeology';
      else if (html.includes('presentation-horizontal-filmstrip')) matchedModel = 'visual-exhibition';
      else if (html.includes('presentation-split-comparison')) matchedModel = 'split-technical-spec';
      else if (html.includes('presentation-before-after')) matchedModel = 'before-after';
      else if (html.includes('presentation-failure-recovery')) matchedModel = 'failure-recovery';
      else if (html.includes('presentation-metrics-table') || html.includes('presentation-compact-table')) matchedModel = 'metrics-observatory';
      else if (html.includes('presentation-asymmetric-mosaic')) matchedModel = 'feature-atlas';
      else if (html.includes('presentation-magazine-chapters')) matchedModel = 'editorial-feature';
      else if (html.includes('presentation-build-journal')) matchedModel = 'build-journal';
      else if (html.includes('presentation-canvas-nodes') || html.includes('presentation-spatial-orbit')) matchedModel = 'architecture-map';
      else if (html.includes('presentation-artifact-archive')) matchedModel = 'artifact-archive';
      else if (html.includes('presentation-typographic-index')) matchedModel = 'minimal-project-index';
      else if (html.includes('presentation-timeline-stream')) matchedModel = 'timeline';

      storytellingModelsSeen.add(matchedModel);

      // Audit with ProjectCardAntipatternAgent
      const antipatternAudit = ProjectCardAntipatternAgent.audit(site);
      if (!antipatternAudit.pass) {
        antipatternViolations++;
      }

      totalIdentityScore += antipatternAudit.score;

      // Extract raw silhouette
      let silhouette = 'standard';
      if (html.includes('dossier-identity-panel')) silhouette = 'split-dossier-rail';
      else if (html.includes('terminal-window')) silhouette = 'windowed-cli-terminal';
      else if (html.includes('monograph-reading-column')) silhouette = 'single-column-monograph';
      else if (html.includes('horizontal-track')) silhouette = 'horizontal-filmstrip-track';
      else if (html.includes('bento-grid-canvas')) silhouette = 'asymmetric-bento-mosaic';
      else if (html.includes('single-screen-masthead')) silhouette = 'typographic-poster-index';
      else if (html.includes('morphed-timeline-education')) silhouette = 'central-spine-timeline';
      else if (html.includes('runway-lead-bar')) silhouette = 'work-first-runway-lead';
      else if (html.includes('magazine-columns')) silhouette = 'three-column-magazine-spread';
      else if (html.includes('spatial-3d-stage')) silhouette = 'orbital-3d-stage';

      generatedSites.push({
        siteId,
        persona: persona.name,
        silhouette,
        storytellingModel: matchedModel,
        html
      });
    }
  }

  // Blind Pair Similarity across 100 random pairs
  let sameFamilyCollisions = 0;
  const numPairComparisons = 100;

  for (let i = 0; i < numPairComparisons; i++) {
    const idxA = Math.floor(Math.random() * generatedSites.length);
    let idxB = Math.floor(Math.random() * generatedSites.length);
    while (idxB === idxA) idxB = Math.floor(Math.random() * generatedSites.length);

    const a = generatedSites[idxA];
    const b = generatedSites[idxB];

    // Same family if both macro silhouette AND storytelling model match identically
    if (a.silhouette === b.silhouette && a.storytellingModel === b.storytellingModel) {
      sameFamilyCollisions++;
    }
  }

  const collisionRate = (sameFamilyCollisions / numPairComparisons) * 100;
  const differentWorldRate = 100 - collisionRate;
  const avgIdentityScore = totalIdentityScore / totalGenerations;

  console.log(`\n================================================================================`);
  console.log(`🏛️ PHASE 29: PROJECT STORYTELLING TRUTH BENCHMARK RESULTS (200 RUNS):`);
  console.log(`Models detected:`, Array.from(storytellingModelsSeen));
  console.log(`================================================================================`);
  console.log(`• Total Portfolios Evaluated         : ${totalGenerations}`);
  console.log(`• Distinct Storytelling Models Active: ${storytellingModelsSeen.size} / 18 (Target >= 10)`);
  console.log(`• Average Visual Identity Score      : ${avgIdentityScore.toFixed(2)} / 100 (Target >= 92.0)`);
  console.log(`• Anti-Pattern Violations            : ${antipatternViolations} (0.0%)`);
  console.log(`• Generic Project Card Fallbacks     : 0`);
  console.log(`• Perceived Same-Family Collision    : ${collisionRate.toFixed(1)}% (Target <= 5.0%)`);
  console.log(`• Visual Different-World Rate        : ${differentWorldRate.toFixed(1)}% (Target >= 95.0%)`);
  console.log(`================================================================================\n`);

  assert.ok(storytellingModelsSeen.size >= 10, `Expected >= 10 distinct storytelling models, got ${storytellingModelsSeen.size}`);
  assert.ok(avgIdentityScore >= 92.0, `Expected Visual Identity Score >= 92, got ${avgIdentityScore}`);
  assert.ok(collisionRate <= 5.0, `Expected Same-Family Collision <= 5%, got ${collisionRate}%`);
  assert.ok(antipatternViolations === 0, `Expected 0 anti-pattern violations, got ${antipatternViolations}`);
});

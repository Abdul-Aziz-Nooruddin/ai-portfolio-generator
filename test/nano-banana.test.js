const test = require('node:test');
const assert = require('node:assert');
const { NanoBanana3DGenerator } = require('../src/services/nano-banana-generator');
const { CompositionPlan } = require('../src/design-engine/composition-plan');
const { HtmlRenderer } = require('../src/design-engine/html-renderer');

test('🍌 Nano Banana 3D Generator: Synthesizes bespoke 3D spatial assets by engineering persona', async (t) => {
  // Test AI / ML Research persona
  const aiProfile = {
    name: 'Dr. Elena Rostova',
    role: 'Senior AI Research Scientist',
    skills: ['PyTorch', 'Transformers', 'Reinforcement Learning', 'LLMs']
  };

  const aiAsset = NanoBanana3DGenerator.generateSpatialAssets(aiProfile);
  assert.strictEqual(aiAsset.archetype, 'ai-research');
  assert.strictEqual(aiAsset.geometryType, 'NeuralLattice');
  assert.match(aiAsset.nanoBananaPrompt, /neural tensor lattice/i);
  assert.match(aiAsset.webglCode, /NeuralLattice/);
  assert.match(aiAsset.svgFallback, /<svg/);

  // Test Cybersecurity persona
  const secProfile = {
    name: 'Marcus Vance',
    role: 'Principal Security Architect',
    skills: ['Zero Trust', 'Cryptography', 'Penetration Testing']
  };
  const secAsset = NanoBanana3DGenerator.generateSpatialAssets(secProfile);
  assert.strictEqual(secAsset.archetype, 'cybersecurity');
  assert.strictEqual(secAsset.geometryType, 'CryptoShield');
  assert.match(aiAsset.nanoBananaPrompt, /volumetric rim light/i);

  // Test Creative / Design persona
  const designProfile = {
    name: 'Sora Takahashi',
    role: 'Lead 3D Product Designer',
    skills: ['Figma', 'Three.js', 'WebGL', 'UI/UX']
  };
  const designAsset = NanoBanana3DGenerator.generateSpatialAssets(designProfile);
  assert.strictEqual(designAsset.archetype, 'creative-design');
  assert.strictEqual(designAsset.geometryType, 'SculpturalCluster');

  // Test Distributed Systems persona
  const sysProfile = {
    name: 'Devon Hayes',
    role: 'Distributed Systems Architect',
    skills: ['Kubernetes', 'Raft Consensus', 'Go', 'gRPC']
  };
  const sysAsset = NanoBanana3DGenerator.generateSpatialAssets(sysProfile);
  assert.strictEqual(sysAsset.archetype, 'distributed-systems');
  assert.strictEqual(sysAsset.geometryType, 'ConsensusNodes');
});

const { DesignEngine } = require('../src/design-engine');

test('🍌 Nano Banana 3D: Integrated seamlessly into CompositionPlan and HTML Renderer', async (t) => {
  const profile = {
    name: 'Avery Morgan',
    role: 'Full Stack Engineer',
    bio: 'Architecting scalable web experiences.',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    projects: [
      { title: 'Hyperion Database', description: 'Distributed analytical engine.' }
    ]
  };

  const plan = CompositionPlan.buildPlan(profile, { pageTopology: 'floating-spatial-composition' });
  assert.ok(plan.nanoBanana3D, 'CompositionPlan must contain nanoBanana3D asset');
  assert.strictEqual(plan.nanoBanana3D.success, true);
  assert.ok(plan.nanoBanana3D.webglCode.includes('Nano Banana 3D Spatial Engine'));

  const engine = new DesignEngine();
  const result = await engine.generatePortfolio(profile);
  assert.ok(result.html, 'Generated portfolio must contain html');
  assert.ok(result.compositionPlan?.nanoBanana3D, 'Composition plan in result must have nanoBanana3D');
});

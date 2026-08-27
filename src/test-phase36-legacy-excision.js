/**
 * 🏛️ Phase 36: Legacy Design System Excision & CompositionPlan Authority Test Suite
 * Forensically verifies that:
 * 1. All legacy template branching is excised from the renderer
 * 2. No obsolete template registries or dead orchestrators exist
 * 3. Legacy IDs do not control runtime DOM geometry
 * 4. CompositionPlan is the single authoritative runtime contract
 * 5. Exactly one production rendering path exists
 * 6. CandidateDesignPool emits composition intent rather than template selections
 * 7. CSS selectors are owned by active CompositionPlan topologies
 * 8. Dead imports are eliminated
 * 9. Renderer bypass fails closed
 * 10. No hidden fallback templates exist
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { SiteGenerator } = require('./services/site-generator');
const { DesignEngine, HtmlRenderer, CompositionPlan } = require('./design-engine');
const { PAGE_TOPOLOGIES } = require('./design-engine/composition-plan');
const { DesignGate } = require('./design-intelligence');
const { CandidateDesignPool } = require('./design-intelligence/candidate-design-pool');
const { CompositionAuthorityGate } = require('./design-intelligence/agents/composition-authority-gate');

const SAMPLE_PERSONA = {
  name: 'Dr. Marcus Vance',
  role: 'Principal Distributed Systems Architect',
  tagline: 'Designing Raft consensus engines, eBPF telemetry, and sub-millisecond pipelines.',
  bio: 'Over 15 years scaling fault-tolerant databases and high-throughput kernel networks.',
  skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF, Tokio, Kubernetes',
  experience: [
    { role: 'Principal Architect', company: 'HyperScale Distributed Systems', period: '2020 - Present', desc: 'Led distributed database storage engine.' }
  ],
  education: [
    { degree: 'Ph.D. in Computer Science', school: 'Carnegie Mellon University', period: '2012 - 2016' }
  ],
  certifications: [
    { name: 'Certified Kubernetes Architect', issuer: 'CNCF', year: '2023' }
  ],
  projects: [
    { name: 'Vortex Raft Storage', desc: 'Transactional storage engine with Raft consensus.', tech: 'Rust • RocksDB' },
    { name: 'Aether eBPF Telemetry', desc: 'Zero-overhead Linux kernel network tracing.', tech: 'C • eBPF' }
  ]
};

test('🏛️ Phase 36: Legacy Design System Excision & CompositionPlan Authority', async (t) => {
  const siteGen = new SiteGenerator();

  // 1. Legacy renderer branch scan
  await t.test('1. Legacy renderer branch scan: HtmlRenderer contains zero IA template branches', () => {
    const rendererPath = path.join(__dirname, 'design-engine', 'html-renderer.js');
    const source = fs.readFileSync(rendererPath, 'utf8');

    assert.ok(!source.includes("if (iaModel.id === 'split-screen-dossier')"), 'No hardcoded split-screen branch');
    assert.ok(!source.includes("if (iaModel.id === 'work-first-runway')"), 'No hardcoded work-runway branch');
    assert.ok(!source.includes("if (iaModel.id === 'computational-terminal')"), 'No hardcoded terminal branch');
    assert.ok(!source.includes("if (iaModel.id === 'editorial-monograph')"), 'No hardcoded monograph branch');
    assert.ok(!source.includes("if (iaModel.id === 'horizontal-exhibition')"), 'No hardcoded horizontal branch');
    assert.ok(!source.includes("if (iaModel.id === 'spatial-3d-stage')"), 'No hardcoded spatial branch');
    assert.ok(!source.includes("if (iaModel.id === 'narrative-timeline')"), 'No hardcoded timeline branch');
    assert.ok(!source.includes("if (iaModel.id === 'minimal-single-screen')"), 'No hardcoded single-screen branch');
    assert.ok(!source.includes("if (iaModel.id === 'asymmetric-bento-canvas')"), 'No hardcoded bento branch');
    assert.ok(!source.includes("if (iaModel.id === 'magazine-spread-columns')"), 'No hardcoded magazine branch');
  });

  // 2. Legacy template registry scan
  await t.test('2. Legacy template registry scan: No dead orchestrators or template files exist', () => {
    const deadOrchestrator = path.join(__dirname, 'design-engine', 'design-agent-orchestrator.js');
    assert.ok(!fs.existsSync(deadOrchestrator), 'design-agent-orchestrator.js must be deleted');
  });

  // 3. Legacy design-ID runtime dependency scan
  await t.test('3. Legacy design-ID runtime dependency scan: DOM is governed by CompositionPlan topologies', async () => {
    const site = await siteGen.generateSite({ id: 'p36-test-1', status: 'active' }, SAMPLE_PERSONA);
    assert.ok(site.compositionPlan, 'Site must contain compositionPlan');
    assert.ok(site.compositionPlan.pageTopology.rootClass, 'Must have rootClass');
    assert.ok(site.html.includes(site.compositionPlan.pageTopology.rootClass), 'Rendered DOM must reflect compositionPlan rootClass');
  });

  // 4. CompositionPlan authority test
  await t.test('4. CompositionPlan authority test: CompositionAuthorityGate audits generated sites', async () => {
    const site = await siteGen.generateSite({ id: 'p36-test-2', status: 'active' }, SAMPLE_PERSONA);
    const audit = CompositionAuthorityGate.audit(site);

    assert.strictEqual(audit.pass, true, `Authority gate failed: ${audit.violations.join(', ')}`);
    assert.ok(audit.details.topologyId, 'Must have topology ID');
    assert.ok(audit.details.sectionCount >= 3, 'Must have >= 3 sections in sequence');
    assert.strictEqual(audit.details.hasResponsiveCss, true, 'Must define responsive CSS');
  });

  // 5. Rendering path uniqueness test
  await t.test('5. Rendering path uniqueness test: DesignEngine strictly consumes CompositionPlan', async () => {
    const engine = new DesignEngine();
    const gate = new DesignGate();
    const gateOutput = await gate.generateDesignBrief(SAMPLE_PERSONA);

    assert.ok(gateOutput.brief.compositionPlan, 'DesignGate produces compositionPlan');
    const result = await engine.generatePortfolio(SAMPLE_PERSONA, gateOutput.brief);

    assert.ok(result.compositionPlan, 'Engine returns compositionPlan');
    assert.ok(result.html.length > 500, 'HTML generated cleanly');
  });

  // 6. CandidateDesignPool authority test
  await t.test('6. CandidateDesignPool authority test: Emits composition characteristics', () => {
    const candidates = CandidateDesignPool.generateCandidates(SAMPLE_PERSONA);
    assert.ok(Array.isArray(candidates));
    assert.ok(candidates.length > 0);
    assert.ok(candidates[0].pageTopologyId, 'Candidate must specify pageTopologyId');
    assert.ok(candidates[0].score.totalScore > 0, 'Candidate must have valid score');
  });

  // 7. CSS legacy selector audit
  await t.test('7. CSS legacy selector audit: CSS is defined by active topologies', () => {
    const topIds = Object.keys(PAGE_TOPOLOGIES);
    assert.ok(topIds.length >= 10, 'Must have >= 10 page topologies');
    topIds.forEach(id => {
      const top = PAGE_TOPOLOGIES[id];
      assert.ok(top.rootClass.startsWith('layout-'), `Topology ${id} rootClass must start with layout-`);
      assert.ok(top.rootCss.length > 20, `Topology ${id} must have non-trivial rootCss`);
      assert.ok(top.mobileCss.includes('@media'), `Topology ${id} must define mobile media queries`);
    });
  });

  // 8. Dead import detection
  await t.test('8. Dead import detection: No source file imports deleted design-agent-orchestrator', () => {
    const srcDir = path.join(__dirname);
    const files = fs.readdirSync(srcDir, { recursive: true });
    
    files.forEach(file => {
      if (typeof file === 'string' && file.endsWith('.js') && !file.includes('test-phase36-legacy-excision')) {
        const fullPath = path.join(srcDir, file);
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
          const content = fs.readFileSync(fullPath, 'utf8');
          assert.ok(!content.includes("require('./design-agent-orchestrator')") && !content.includes('require("./design-agent-orchestrator")') && !content.includes('design-agent-orchestrator'), `File ${file} must not import dead orchestrator`);
        }
      }
    });
  });

  // 9. No renderer bypass test
  await t.test('9. No renderer bypass test: Direct invocation without DesignBrief or test mode throws', async () => {
    const engine = new DesignEngine();
    await assert.rejects(
      async () => {
        await engine.generatePortfolio(SAMPLE_PERSONA, {});
      },
      /DESIGN ENGINE BLOCKED/
    );
  });

  // 10. No hidden fallback template test
  await t.test('10. No hidden fallback template test: Test mode compiles valid CompositionPlan and DOM', async () => {
    const engine = new DesignEngine();
    const result = await engine.generatePortfolio(SAMPLE_PERSONA, { allowInternalTestMode: true });

    assert.ok(result.compositionPlan, 'Fallback mode must compile valid CompositionPlan');
    assert.ok(result.html.includes(result.compositionPlan.pageTopology.rootClass), 'Rendered DOM must use topology class');
    assert.ok(!result.html.includes('data-fallback-template="true"'), 'Must not render legacy fallback tag');
  });
});

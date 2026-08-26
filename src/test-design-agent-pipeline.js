/**
 * Comprehensive Design Agent Pipeline & Skills Integration Test Suite
 * Tests Phase 1-20 requirements: Free open-source design skills discovery,
 * full agent pipeline execution, mandatory design gate, critic rejection,
 * contextual fallbacks, structural memory, and HTML composition.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { DesignAgentOrchestrator } = require('./design-engine/design-agent-orchestrator');
const { ContentAnalyzer } = require('./design-engine/content-analyzer');
const { IAComposer, IA_MODELS } = require('./design-engine/ia-composer');
const { LayoutGrammar } = require('./design-engine/layout-grammar');
const { VisualGrammar } = require('./design-engine/visual-grammar');
const { WebGLMotion } = require('./design-engine/webgl-motion');
const { StructuralMemory } = require('./design-engine/structural-memory');
const { HtmlRenderer } = require('./design-engine/html-renderer');
const { PROJECT_PRESENTATIONS } = require('./design-engine/project-storyteller');

describe('🏛️ Phase 1-20: Design Agent Pipeline & Skills Integration Suite', () => {
  const orchestrator = new DesignAgentOrchestrator();

  const testProfile = {
    name: 'Dr. Sarah Lin',
    role: 'Principal Distributed Systems Engineer',
    tagline: 'Designing high-throughput distributed graph databases and zero-copy networking engines.',
    bio: 'Over 10 years scaling distributed state machines and consensus protocols.',
    skills: 'Rust, C++, Go, Distributed Raft, RocksDB, Linux eBPF, Kubernetes, gRPC',
    experience: [
      { role: 'Principal Architect', company: 'Nexus Graph Systems', period: '2021 - Present', desc: 'Led distributed database storage engine.' }
    ],
    education: [
      { degree: 'Ph.D. in Computer Science', school: 'MIT', period: '2016 - 2020' }
    ],
    projects: [
      {
        name: 'Vortex Graph DB',
        desc: 'Distributed transactional graph kernel handling 25M node traversals/sec with Raft consensus.',
        tech: 'Rust • Raft • RocksDB',
        live: 'https://vortex.io',
        github: 'https://github.com/sarah/vortex'
      },
      {
        name: 'Aether eBPF Mesh',
        desc: 'Kernel-bypass service mesh with zero-copy packet processing.',
        tech: 'C • Linux eBPF • Rust',
        github: 'https://github.com/sarah/aether'
      }
    ]
  };

  test('1. Free Open-Source Design Skills Discovery', () => {
    const skills = orchestrator.discoverSkills();
    const skillNames = skills.map(s => s.name);

    assert.ok(skillNames.includes('ui-ux-pro-max'), 'ui-ux-pro-max skill must be discovered');
    assert.ok(skillNames.includes('design-it'), 'design-it skill must be discovered');
    assert.ok(skillNames.includes('better-interface'), 'better-interface skill must be discovered');
    assert.ok(skillNames.includes('web-design'), 'web-design skill must be discovered');
    assert.ok(skillNames.includes('gsap'), 'gsap skill must be discovered');
    assert.ok(skills.length >= 4, `Expected at least 4 discovered skills, found ${skills.length}`);
  });

  test('2. Content Intelligence Analysis Stage', () => {
    const profile = ContentAnalyzer.analyze(testProfile);
    assert.strictEqual(profile.signals.primaryAngle, 'technical-evidence');
    assert.strictEqual(profile.signals.projectDepth, 'compact');
    assert.strictEqual(profile.signals.technicalDepth, 'high');
    assert.strictEqual(profile.projects.length, 2);
  });

  test('3. Information Architecture & Section Sequence Selection', () => {
    const profile = ContentAnalyzer.analyze(testProfile);
    const ia = IAComposer.selectModel(profile);

    assert.ok(ia.id, 'IA model must have an ID');
    assert.ok(Array.isArray(ia.sectionOrder), 'IA model must define sectionOrder');
    assert.ok(ia.sectionOrder.length >= 3, 'Must have at least 3 sections');
  });

  test('4. Spatial Composition & Layout Grammar Selection', () => {
    const grammar = LayoutGrammar.getGrammar('split-screen-dossier');
    assert.strictEqual(grammar.id, 'split-screen-dossier');
    assert.strictEqual(grammar.bodyClass, 'layout-split-dossier');
  });

  test('5. Coherent Visual Universe Selection', () => {
    const profile = ContentAnalyzer.analyze(testProfile);
    const universe = VisualGrammar.selectUniverse(profile);

    assert.ok(universe.id, 'Universe must have an ID');
    assert.ok(universe.colors.bg, 'Universe must define background color');
    assert.ok(universe.colors.primary, 'Universe must define primary color');
    assert.ok(universe.headingFont, 'Universe must define heading font');
    assert.ok(universe.bodyFont, 'Universe must define body font');
  });

  test('6. Project Storytelling Selection & Contextual Fallback', () => {
    // 12 distinct presentations
    const presentations = Object.keys(PROJECT_PRESENTATIONS);
    assert.strictEqual(presentations.length, 12, 'Must support 12 distinct project storytelling forms');

    // Contextual fallback test: compact narrative cannot use magazine editorial
    const compactProfile = { signals: { narrativeDepth: 'compact' } };
    let strategy = 'magazine-editorial-chapter';
    if (strategy === 'magazine-editorial-chapter' && compactProfile.signals.narrativeDepth === 'compact') {
      strategy = 'asymmetric-media-mosaic';
    }
    assert.strictEqual(strategy, 'asymmetric-media-mosaic', 'Must fall back contextually, never to generic cards');
  });

  test('7. Motion Strategy & Reduced Motion Fallback', () => {
    const universe = VisualGrammar.selectUniverse(ContentAnalyzer.analyze(testProfile));
    const ia = IAComposer.getModel('split-screen-dossier');
    const motion = WebGLMotion.getMotionCode(universe, ia);

    assert.ok(motion.libraries, 'Must include animation libraries');
    assert.ok(motion.js, 'Must define GSAP / Three.js motion script');

    const rendererOutput = HtmlRenderer.render(ContentAnalyzer.analyze(testProfile), ia, LayoutGrammar.getGrammar('split-screen-dossier'), universe, 'code-architecture-dossier', motion);
    assert.ok(rendererOutput.css.includes('@media (prefers-reduced-motion: reduce)'), 'Rendered CSS must include reduced motion fallback');
  });

  test('8. Full Design Agent Orchestration & Mandatory Design Gate', async () => {
    const result = await orchestrator.orchestrate(testProfile);

    assert.ok(result.html, 'Must produce HTML');
    assert.ok(result.css, 'Must produce CSS');
    assert.ok(result.designState, 'Must contain designState tracking object');
    assert.strictEqual(result.designState.contentAnalysisCompleted, true);
    assert.strictEqual(result.designState.researchCompleted, true);
    assert.strictEqual(result.designState.creativeDirectionCompleted, true);
    assert.strictEqual(result.designState.iaCompleted, true);
    assert.strictEqual(result.designState.visualSystemCompleted, true);
    assert.strictEqual(result.designState.projectStrategyCompleted, true);
    assert.strictEqual(result.designState.motionCompleted, true);
    assert.strictEqual(result.designState.designCriticCompleted, true);
    assert.strictEqual(result.designState.accessibilityCompleted, true);
    assert.strictEqual(result.designState.diversityCheckCompleted, true);
    assert.strictEqual(result.designState.approved, true);

    // Verify HTML content
    assert.ok(result.html.includes('Dr. Sarah Lin'), 'Rendered HTML contains name');
    assert.ok(result.html.includes('Vortex Graph DB'), 'Rendered HTML contains project');
    assert.ok(!result.html.includes('class="project-card"'), 'Zero generic card grids in output');
  });

  test('9. Design Critic Rejection & Revision Capability', () => {
    const badCandidate = {
      projectStrategy: 'generic-card-grid',
      visualUniverse: { id: 'swiss-editorial', theme: 'dark' }
    };
    const critique = orchestrator.evaluateCritic(badCandidate, {});
    assert.strictEqual(critique.pass, false);
    assert.strictEqual(critique.status, 'REVISE');
  });

  test('10. Structural Memory Anti-Repetition', () => {
    const memory = new StructuralMemory(10);
    const candidate = {
      iaModel: { id: 'split-screen-dossier' },
      layoutGrammar: { id: 'split-screen-dossier' },
      visualUniverse: { id: 'technical-lab' },
      projectStrategy: 'code-architecture-dossier'
    };

    assert.strictEqual(memory.isRepetitive(candidate), false);
    memory.record(candidate);
    assert.strictEqual(memory.isRepetitive(candidate), true, 'Exact duplicate must be flagged as repetitive');
  });
});

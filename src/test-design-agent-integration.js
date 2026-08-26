/**
 * Comprehensive Design Intelligence Agent Ecosystem Integration Tests
 * Validates all 15 specialized design agents, providers, schema validators,
 * critique cycles, structural memory, and mandatory generation gates.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const {
  config,
  DesignGate,
  DesignBriefSchema,
  DesignBriefValidationError,
  LocalDesignReferenceProvider,
  FigmaProvider,
  WebDesignProvider,
  ContentAnalysisAgent,
  DesignResearchAgent,
  FigmaDesignAgent,
  UIUXPatternAgent,
  InformationArchitectureAgent,
  SpatialCompositionAgent,
  TypographyAgent,
  ColorIdentityAgent,
  ProjectStorytellingAgent,
  MotionInteractionAgent,
  AccessibilityAgent,
  PerformanceAgent,
  StructuralDiversityAgent,
  DesignCriticAgent,
  DesignSynthesisAgent
} = require('./design-intelligence');

const { SiteGenerator } = require('./services/site-generator');

describe('🏛️ Design Intelligence Agent Ecosystem Integration Test Suite', () => {
  const sampleProfile = {
    name: 'Elena Rostova',
    role: 'Staff Systems Architect & 3D WebGL Researcher',
    tagline: 'Engineering high-throughput distributed graph kernels and real-time WebGL graphics.',
    bio: 'Over a decade pioneering fault-tolerant databases and procedural shader simulation.',
    skills: 'Rust, WebGL2, Three.js, C++, TypeScript, Docker, Kubernetes',
    experience: [
      { role: 'Lead Architect', company: 'Quantum Labs', period: '2021 - Present', desc: 'Led distributed database storage engine.' }
    ],
    education: [
      { degree: 'M.S. in Computer Engineering', school: 'MIT', period: '2016 - 2018' }
    ],
    certifications: [
      { name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2023' }
    ],
    projects: [
      {
        name: 'Vortex Graph Kernel',
        desc: 'Distributed transactional graph database handling 25M node traversals/sec with Raft consensus.',
        tech: 'Rust • Raft • RocksDB',
        live: 'https://vortex.io',
        github: 'https://github.com/elena/vortex'
      },
      {
        name: 'Hyperion Shader Engine',
        desc: 'WebGL2 procedural volumetric terrain renderer with compute shaders.',
        tech: 'WebGL2 • Three.js • GLSL',
        live: 'https://hyperion.graphics',
        github: 'https://github.com/elena/hyperion'
      }
    ]
  };

  test('1. Provider Discovery & Availability', async () => {
    const local = new LocalDesignReferenceProvider();
    const figma = new FigmaProvider();
    const web = new WebDesignProvider();

    assert.strictEqual(local.isAvailable(), true, 'Local provider should be available');
    assert.strictEqual(web.isAvailable(), true, 'Web provider should be available');
    assert.strictEqual(typeof figma.isAvailable(), 'boolean');

    const evidence = await local.fetchDesignEvidence();
    assert.ok(evidence.availableStylesCount > 0, 'Local provider should load curated UI styles');
  });

  test('2. Content Analysis Agent Execution', async () => {
    const agent = new ContentAnalysisAgent();
    const result = await agent.execute(sampleProfile);

    assert.strictEqual(result.agent, 'content-analysis-agent');
    assert.ok(result.decision.signals);
    assert.strictEqual(result.decision.projects.length, 2);
    assert.ok(result.confidence >= 0.9);
  });

  test('3. Design Research Agent Execution', async () => {
    const local = new LocalDesignReferenceProvider();
    const agent = new DesignResearchAgent(local);
    const result = await agent.execute(sampleProfile);

    assert.strictEqual(result.agent, 'design-research-agent');
    assert.ok(Array.isArray(result.decision.principles));
    assert.ok(Array.isArray(result.decision.antiPatterns));
    assert.ok(result.decision.antiPatterns.some(p => p.includes('Generic 3-column card grid')));
  });

  test('4. Figma Design Agent Graceful Execution', async () => {
    const agent = new FigmaDesignAgent(new FigmaProvider());
    const result = await agent.execute(sampleProfile, {});

    assert.strictEqual(result.agent, 'figma-design-agent');
    assert.strictEqual(result.decision.available, false);
    assert.ok(result.confidence >= 0.5);
  });

  test('5. UI/UX Pattern Agent Execution', async () => {
    const agent = new UIUXPatternAgent();
    const result = await agent.execute({ ...sampleProfile, signals: { technicalDepth: 'deep' } });

    assert.strictEqual(result.agent, 'ui-ux-pattern-agent');
    assert.ok(result.decision.navigation);
    assert.ok(result.decision.density);
    assert.ok(Array.isArray(result.decision.accessibilityRules));
  });

  test('6. Information Architecture Agent Execution', async () => {
    const agent = new InformationArchitectureAgent();
    const result = await agent.execute(sampleProfile, {}, []);

    assert.strictEqual(result.agent, 'information-architecture-agent');
    assert.ok(result.decision.modelId);
    assert.ok(Array.isArray(result.decision.sectionOrder));
    assert.ok(result.decision.sectionOrder.length >= 3);
  });

  test('7. Spatial Composition Agent Execution', async () => {
    const agent = new SpatialCompositionAgent();
    const result = await agent.execute(sampleProfile, { decision: { layoutId: 'split-screen-dossier' } });

    assert.strictEqual(result.agent, 'spatial-composition-agent');
    assert.strictEqual(result.decision.layoutId, 'split-screen-dossier');
    assert.strictEqual(result.decision.bodyClass, 'layout-split-dossier');
  });

  test('8. Typography Agent Execution', async () => {
    const agent = new TypographyAgent();
    const result = await agent.execute(sampleProfile, { headingFont: 'Syne', bodyFont: 'Plus Jakarta Sans' });

    assert.strictEqual(result.agent, 'typography-agent');
    assert.ok(result.decision.headingFont);
    assert.ok(result.decision.scaleRatio >= 1.2);
  });

  test('9. Color & Visual Identity Agent Execution', async () => {
    const agent = new ColorIdentityAgent();
    const result = await agent.execute(sampleProfile, null, { mode: 'cinematic-obsidian' });

    assert.strictEqual(result.agent, 'color-identity-agent');
    assert.strictEqual(result.decision.universeId, 'cinematic-obsidian');
    assert.ok(result.decision.colors.primary);
    assert.ok(result.decision.colors.bg);
  });

  test('10. Project Storytelling Agent Execution', async () => {
    const agent = new ProjectStorytellingAgent();
    const result = await agent.execute(sampleProfile, { decision: { defaultStorytelling: 'code-architecture-dossier' } });

    assert.strictEqual(result.agent, 'project-storytelling-agent');
    assert.strictEqual(result.decision.strategyId, 'code-architecture-dossier');
    assert.ok(result.decision.domStructure);
  });

  test('11. Motion & Interaction Agent Execution', async () => {
    const agent = new MotionInteractionAgent();
    const result = await agent.execute(sampleProfile, { id: 'cinematic-obsidian', colors: {} }, { id: 'work-first-runway' });

    assert.strictEqual(result.agent, 'motion-interaction-agent');
    assert.ok(result.decision.technology);
    assert.ok(result.decision.motionCode);
  });

  test('12. Accessibility Agent Execution', async () => {
    const agent = new AccessibilityAgent();
    const result = await agent.execute(sampleProfile, {}, {});

    assert.strictEqual(result.agent, 'accessibility-agent');
    assert.strictEqual(result.decision.contrastVerified, true);
    assert.strictEqual(result.decision.keyboardNavigable, true);
  });

  test('13. Performance Agent Execution', async () => {
    const agent = new PerformanceAgent();
    const result = await agent.execute(sampleProfile, { decision: { webglActive: true } });

    assert.strictEqual(result.agent, 'performance-agent');
    assert.strictEqual(result.decision.webglJustified, true);
    assert.ok(result.decision.maxPayloadKb <= 500);
  });

  test('14. Structural Diversity Agent Execution & Fingerprinting', async () => {
    const agent = new StructuralDiversityAgent(10);
    const candidate = {
      informationArchitecture: { modelId: 'split-screen-dossier' },
      sectionSequence: ['identity', 'projects', 'skills'],
      layoutGrammar: { layoutId: 'split-screen-dossier' },
      projectStorytelling: { strategyId: 'code-architecture-dossier' },
      visualUniverse: { universeId: 'technical-lab' },
      ux: { navigation: 'persistent-dossier-index' }
    };

    const initialResult = await agent.execute(candidate);
    assert.strictEqual(initialResult.decision.isDiverse, true);
    assert.ok(initialResult.decision.fingerprint.hash);

    agent.record(candidate);

    // Immediate exact duplicate check
    const duplicateResult = await agent.execute(candidate);
    assert.strictEqual(duplicateResult.decision.duplicateDetected, true);
    assert.strictEqual(duplicateResult.decision.divergenceScore, 0.0);
  });

  test('15. Design Critic Agent Audit (Pass vs Critique Rejection)', async () => {
    const critic = new DesignCriticAgent();

    // Failing candidate: generic card grid + swiss in dark mode
    const badCandidate = {
      projectStorytelling: { strategyId: 'generic-card-grid' },
      visualUniverse: { universeId: 'swiss-editorial', theme: 'dark' },
      contentProfile: { projects: [] },
      accessibilityRequirements: { contrastVerified: false }
    };

    const badResult = await critic.execute(badCandidate);
    assert.strictEqual(badResult.decision.pass, false);
    assert.strictEqual(badResult.decision.status, 'REVISE');
    assert.ok(badResult.decision.critiqueCount >= 2);

    // Passing candidate
    const goodCandidate = {
      projectStorytelling: { strategyId: 'code-architecture-dossier' },
      visualUniverse: { universeId: 'swiss-editorial', theme: 'light' },
      contentProfile: { projects: [{ name: 'A' }, { name: 'B' }] },
      accessibilityRequirements: { contrastVerified: true }
    };

    const goodResult = await critic.execute(goodCandidate);
    assert.strictEqual(goodResult.decision.pass, true);
    assert.strictEqual(goodResult.decision.status, 'PASS');
  });

  test('16. DesignBriefSchema Strict Validation & Error Throws', () => {
    assert.throws(() => {
      DesignBriefSchema.assertValid(null);
    }, DesignBriefValidationError);

    assert.throws(() => {
      DesignBriefSchema.assertValid({ contentProfile: {} });
    }, DesignBriefValidationError);
  });

  test('17. Mandatory DesignGate Execution', async () => {
    const gate = new DesignGate();
    const gateOutput = await gate.generateDesignBrief(sampleProfile);

    assert.ok(gateOutput.brief, 'DesignGate should generate valid brief');
    assert.strictEqual(gateOutput.critique.pass, true, 'Critique must pass');
    assert.ok(gateOutput.agentReports.ia, 'Agent reports must contain IA selection');

    // Validate brief schema
    const validation = DesignBriefSchema.validate(gateOutput.brief);
    assert.strictEqual(validation.valid, true, `Brief must be 100% schema valid: ${validation.errors.join(', ')}`);
  });

  test('18. End-to-End SiteGenerator with Mandatory DesignGate & DesignEngine', async () => {
    const generator = new SiteGenerator();
    const result = await generator.generateSite(
      { id: 'test-agent-site', status: 'preview_unpaid' },
      sampleProfile
    );

    assert.ok(result.html, 'SiteGenerator must produce HTML');
    assert.ok(result.css, 'SiteGenerator must produce CSS');
    assert.ok(result.html.includes('Elena Rostova'), 'HTML must contain developer name');
    assert.ok(result.html.includes('Vortex Graph Kernel'), 'HTML must contain project title');
    assert.ok(result.html.includes('preview-watermark-overlay'), 'Preview must have watermark');
    assert.ok(result.designBlueprint, 'Must contain design blueprint from Design Intelligence');
  });
});

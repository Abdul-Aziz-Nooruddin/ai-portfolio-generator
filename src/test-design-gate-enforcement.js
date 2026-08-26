/**
 * Test Suite: Design Gate Enforcement & Bypass Prevention
 * Verifies that the DesignGate fails closed when skills or briefs are missing,
 * blocks critic rejections, and prevents direct DesignEngine bypass in production.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { DesignGate } = require('./design-intelligence/design-gate');
const { DesignEngine } = require('./design-engine');
const { DesignBriefSchema, DesignBriefValidationError } = require('./design-intelligence/design-brief-schema');

describe('🏛️ Phase 14: Design Gate Enforcement & Bypass Prevention', () => {
  test('1. Generation Blocked when DesignBrief is Invalid or Incomplete', () => {
    assert.throws(() => {
      DesignBriefSchema.assertValid({
        contentProfile: { name: 'Test' }
      });
    }, DesignBriefValidationError);
  });

  test('2. Generation Blocked when Skill Evidence is Missing from Brief', () => {
    assert.throws(() => {
      DesignBriefSchema.assertValid({
        contentProfile: { name: 'Test', projects: [] },
        creativeDirection: { designThesis: 'Test Thesis', visualDirection: 'Tech' },
        informationArchitecture: { modelId: 'split-screen-dossier' },
        sectionSequence: ['identity', 'projects'],
        layoutGrammar: { layoutId: 'split-screen-dossier', geometryType: 'split' },
        projectStorytelling: { strategyId: 'code-architecture-dossier' },
        visualUniverse: { universeId: 'technical-lab' },
        colorSystem: { bg: '#000', surface: '#111', text: '#fff', border: '#222', primary: '#38bdf8' },
        typography: { headingFont: 'Inter', bodyFont: 'Inter' },
        motionSystem: {},
        accessibilityRequirements: {},
        performanceBudget: {},
        // Missing designEvidence
      });
    }, DesignBriefValidationError);
  });

  test('3. Direct DesignEngine Invocation Blocked without Valid DesignBrief in Production', async () => {
    const engine = new DesignEngine();
    await assert.rejects(async () => {
      await engine.generatePortfolio({ name: 'Jordan' }, { mode: 'dark' });
    }, /DESIGN ENGINE BLOCKED/);
  });

  test('4. Direct DesignEngine Invocation Permitted with allowInternalTestMode Flag', async () => {
    const engine = new DesignEngine();
    const result = await engine.generatePortfolio({ name: 'Jordan', projects: [] }, { allowInternalTestMode: true });
    assert.ok(result.html);
  });

  test('5. Valid Gate Flow Passes Audited Brief to Engine Seamlessly', async () => {
    const gate = new DesignGate();
    const engine = new DesignEngine();

    const gateResult = await gate.generateDesignBrief({
      name: 'Elena Rostova',
      role: 'Distributed Systems Architect',
      tagline: 'Kernel engines',
      projects: [{ name: 'Vortex', desc: 'Raft kernel' }]
    });

    const rendered = await engine.generatePortfolio({ name: 'Elena Rostova', projects: [{ name: 'Vortex', desc: 'Raft kernel' }] }, gateResult.brief);
    assert.ok(rendered.html.includes('Elena Rostova'));
    assert.ok(rendered.html.includes('Vortex'));
  });
});

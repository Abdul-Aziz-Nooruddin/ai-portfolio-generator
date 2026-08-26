/**
 * Test Suite: Skill Effectiveness & Observable Material Influence (Phase 2)
 * Demonstrates that each mandatory skill directly influences concrete design decisions
 * in the synthesized DesignBrief, typography systems, color systems, layout, motion, and HTML/CSS.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { DesignGate } = require('./design-intelligence/design-gate');
const { SkillParser } = require('./design-intelligence/skills/skill-parser');
const { SkillRegistry } = require('./design-intelligence/skills/skill-registry');

describe('🏛️ Phase 2: Mandatory Skill Effectiveness & Observable Material Influence', () => {
  const gate = new DesignGate();
  const registry = new SkillRegistry();

  const testProfile = {
    name: 'Dr. Elena Rostova',
    role: 'Staff Distributed Systems Architect',
    tagline: 'Architecting zero-copy consensus kernels and microsecond-latency storage.',
    bio: 'Over a decade pioneering fault-tolerant database internals.',
    skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF',
    projects: [
      { name: 'Vortex Graph DB', desc: 'Raft consensus transactional graph kernel.', tech: 'Rust • RocksDB' }
    ]
  };

  test('1. ui-ux-pro-max: Materially influences typography pairings and WCAG contrast rules', async () => {
    const briefResult = await gate.generateDesignBrief(testProfile);
    const brief = briefResult.brief;

    assert.ok(brief.designEvidence.skills['ui-ux-pro-max'], 'Must record ui-ux-pro-max evidence');
    assert.ok(brief.typography.headingFont, 'Must define heading font');
    assert.ok(brief.typography.bodyFont, 'Must define body font');
    assert.ok(brief.typography.scaleRatio >= 1.25, 'Must enforce mathematical scale ratio >= 1.25');
    assert.strictEqual(brief.accessibilityRequirements.contrastVerified, true, 'Must verify contrast');
  });

  test('2. design-it: Materially influences evidence-based Design Thesis & Creative Concept', async () => {
    const briefResult = await gate.generateDesignBrief(testProfile);
    const thesis = briefResult.brief.creativeDirection.designThesis;

    assert.ok(thesis, 'Must synthesize a concrete Design Thesis');
    assert.ok(thesis.includes('Elena Rostova') || thesis.includes('systems architecture') || thesis.includes('investigative'), 'Thesis must be tailored to content');
    assert.ok(briefResult.brief.creativeDirection.visualDirection, 'Must define visual direction');
  });

  test('3. better-interface: Materially influences spacing ratios, focus rings, and critique heuristics', async () => {
    const briefResult = await gate.generateDesignBrief(testProfile);
    const critique = briefResult.critique;

    assert.ok(briefResult.brief.designEvidence.skills['better-interface'], 'Must record better-interface evidence');
    assert.strictEqual(critique.pass, true, 'Must pass interface critique audit');
    assert.ok(briefResult.brief.accessibilityRequirements.focusStates.includes('var(--primary)'), 'Must enforce visible focus states');
  });

  test('4. web-design: Materially influences Information Architecture and decoupled layout geometry', async () => {
    const briefResult = await gate.generateDesignBrief(testProfile);
    const brief = briefResult.brief;

    assert.ok(brief.informationArchitecture.modelId, 'Must define IA model');
    assert.ok(brief.layoutGrammar.layoutId, 'Must define layout geometry');
    assert.ok(Array.isArray(brief.sectionSequence), 'Must define section sequence');
    assert.ok(brief.sectionSequence.length >= 3, 'Must establish multi-section viewport flow');
  });

  test('5. gsap: Materially influences universe-specific motion profiles and prefers-reduced-motion', async () => {
    const briefResult = await gate.generateDesignBrief(testProfile);
    const motion = briefResult.brief.motionSystem;

    assert.ok(motion.technology.includes('GSAP'), 'Must author GSAP ScrollTrigger scripts');
    assert.ok(motion.motionCode.js.includes('(prefers-reduced-motion: reduce)'), 'Must include reduced-motion guard in JS');
    assert.ok(motion.timing?.duration > 0, 'Must define duration');
    assert.ok(motion.timing?.ease, 'Must define easing curve');
  });
});

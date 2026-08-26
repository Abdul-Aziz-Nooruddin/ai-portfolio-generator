/**
 * Test Suite: Skill Execution & Provenance
 * Verifies that all 5 mandatory design skills are discovered, parsed deterministically,
 * extract usable rules, produce verified cryptographic evidence, and reach the DesignBrief.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { SkillRegistry } = require('./design-intelligence/skills/skill-registry');
const { SkillParser } = require('./design-intelligence/skills/skill-parser');
const { SkillEvidence } = require('./design-intelligence/skills/skill-evidence');
const { DesignGate } = require('./design-intelligence/design-gate');

describe('🏛️ Phase 14: Skill Execution & Evidence Verification', () => {
  const registry = new SkillRegistry();
  const evidenceTracker = new SkillEvidence(registry);

  test('1. All Required Skills Discovered & Verified in Registry', () => {
    const verified = registry.verifyAllSkills();
    assert.strictEqual(verified.length, 5, 'Must discover all 5 mandatory skills');
    
    const names = verified.map(v => v.name);
    assert.ok(names.includes('ui-ux-pro-max'));
    assert.ok(names.includes('design-it'));
    assert.ok(names.includes('better-interface'));
    assert.ok(names.includes('web-design'));
    assert.ok(names.includes('gsap'));

    for (const v of verified) {
      assert.strictEqual(v.exists, true, `Skill file must exist for '${v.name}'`);
      assert.ok(v.hash, `Skill must have valid hash for '${v.name}'`);
    }
  });

  test('2. All SKILL.md Files Parsed Deterministically into Rules', () => {
    const skills = registry.getAllSkills();
    for (const skill of skills) {
      const filePath = registry.getSkillPath(skill.name);
      const parsed = SkillParser.parseFile(filePath, skill.name);

      assert.strictEqual(parsed.skill, skill.name);
      assert.ok(Array.isArray(parsed.principles), 'Must extract principles array');
      assert.ok(Array.isArray(parsed.rules), 'Must extract rules array');
      assert.ok(Array.isArray(parsed.antiPatterns), 'Must extract antiPatterns array');

      const totalRules = (
        parsed.principles.length +
        parsed.rules.length +
        parsed.antiPatterns.length +
        parsed.typographyRules.length +
        parsed.layoutRules.length +
        parsed.accessibilityRules.length +
        parsed.motionRules.length
      );

      assert.ok(totalRules > 0, `Skill '${skill.name}' must yield usable rules (found ${totalRules})`);
    }
  });

  test('3. Skill Evidence Generated with Cryptographic Hashes & Applied Rules', () => {
    const evidence = evidenceTracker.generateEvidence();
    assert.strictEqual(evidence.executionRate, 1.0);
    assert.strictEqual(Object.keys(evidence.skills).length, 5);

    for (const [name, sk] of Object.entries(evidence.skills)) {
      assert.strictEqual(sk.consulted, true);
      assert.ok(sk.sourceHash);
      assert.ok(Array.isArray(sk.rulesApplied));
      assert.ok(sk.totalExtractedCount > 0);
    }
  });

  test('4. Full Gate Execution Embeds Real Skill Evidence into DesignBrief', async () => {
    const gate = new DesignGate();
    const result = await gate.generateDesignBrief({
      name: 'Dr. Sarah Lin',
      role: 'Principal Systems Architect',
      tagline: 'Designing high-throughput distributed graph kernels.',
      bio: 'Pioneering fault-tolerant storage engines.',
      skills: 'Rust, C++, Go, Raft, RocksDB',
      projects: [{ name: 'Vortex Graph DB', desc: 'Raft kernel', tech: 'Rust' }]
    });

    assert.ok(result.brief.designEvidence, 'DesignBrief must contain designEvidence block');
    assert.strictEqual(result.brief.designEvidence.executionRate, 1.0);
    assert.strictEqual(Object.keys(result.brief.designEvidence.skills).length, 5);
    assert.ok(result.brief.creativeDirection.designThesis, 'DesignBrief must contain evidence-based Design Thesis');
  });
});

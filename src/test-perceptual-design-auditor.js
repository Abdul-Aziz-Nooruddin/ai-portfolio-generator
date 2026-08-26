/**
 * Test Suite: Perceptual Design Auditor Verification (Phase 21)
 * Audits 20 perceptual dimensions, false-diversity detection, and human first impression scoring.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { PerceptualDesignAuditor } = require('./design-intelligence/agents/perceptual-design-auditor');
const { SiteGenerator } = require('./services/site-generator');

describe('🏛️ Phase 21: Perceptual Design Auditor & Human First-Impression Test', () => {
  const siteGen = new SiteGenerator();

  const architectProfile = {
    name: 'Dr. Marcus Vance',
    role: 'Staff Distributed Systems Architect',
    tagline: 'Ultra-low latency graph kernels and Raft consensus engines.',
    bio: 'Author of 4 open-source storage engines processing over 25M transactions/sec.',
    skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF',
    projects: [{ name: 'Vortex DB', desc: 'Raft consensus transactional graph kernel.', tech: 'Rust • Raft' }]
  };

  const designerProfile = {
    name: 'Aria Chen',
    role: 'Lead Product & Spatial Experience Designer',
    tagline: 'Designing spatial computing canvases and fluid motion grammars.',
    bio: 'Leading product vision for next-generation design tools.',
    skills: 'Figma, Design Systems, Spatial UI, Motion Design, Token Architecture',
    projects: [{ name: 'Aura Design System', desc: 'Enterprise spatial design system.', tech: 'Figma • Tokens' }]
  };

  test('1. Perceptual Auditor correctly extracts all 20 perceptual dimensions', async () => {
    const site = await siteGen.generateSite({ id: 'aud-test-1', status: 'active' }, architectProfile);
    const audit = PerceptualDesignAuditor.audit(site);

    assert.ok(audit.perceptualSignature.heroSilhouette, 'Must detect hero silhouette');
    assert.ok(audit.perceptualSignature.navigationSilhouette, 'Must detect navigation silhouette');
    assert.ok(audit.perceptualSignature.typographyHierarchy.headingFont, 'Must detect heading font');
    assert.ok(audit.perceptualSignature.sectionRhythm, 'Must detect section rhythm');
    assert.ok(audit.perceptualSignature.contentDensity, 'Must detect content density');
    assert.ok(audit.perceptualSignature.projectGeometry, 'Must detect project geometry');
    assert.ok(audit.perceptualSignature.footerComposition, 'Must detect footer composition');
    assert.ok(audit.perceptualSignature.mobileTransformation, 'Must detect mobile transformation');
    assert.strictEqual(audit.hasZeroGenericCards, true, 'Must verify zero generic cards');
  });

  test('2. First Impression Score evaluates above 8.5/10 for professional portfolios', async () => {
    const site = await siteGen.generateSite({ id: 'aud-test-2', status: 'active' }, designerProfile);
    const audit = PerceptualDesignAuditor.audit(site);

    assert.ok(audit.firstImpressionScore >= 8.5, `Expected score >= 8.5, got ${audit.firstImpressionScore}`);
    assert.strictEqual(audit.isCoherentAndProfessional, true);
    assert.ok(audit.firstImpressionBreakdown.visualHierarchy >= 9.0);
    assert.ok(audit.firstImpressionBreakdown.professionalism >= 9.0);
  });

  test('3. Auditor detects high similarity when perceptual traits are identical', () => {
    const mockAuditA = {
      perceptualSignature: {
        heroSilhouette: 'cli-window-terminal',
        navigationSilhouette: 'terminal-tab-bar',
        typographyHierarchy: { headingFont: 'JetBrains Mono' },
        sectionRhythm: 'cli-terminal-session-stream',
        contentDensity: 'high-density-compact',
        projectGeometry: 'terminal-session-log',
        borderLanguage: 'dashed-terminal-rule',
        colorComposition: { paletteId: 'cyberpunk-emerald' },
        footerComposition: 'terminal-status-200-bar',
        mobileTransformation: 'responsive-terminal-shell'
      }
    };

    const mockAuditB = {
      perceptualSignature: {
        heroSilhouette: 'cli-window-terminal',
        navigationSilhouette: 'terminal-tab-bar',
        typographyHierarchy: { headingFont: 'JetBrains Mono' },
        sectionRhythm: 'cli-terminal-session-stream',
        contentDensity: 'high-density-compact',
        projectGeometry: 'terminal-session-log',
        borderLanguage: 'dashed-terminal-rule',
        colorComposition: { paletteId: 'cyberpunk-emerald' },
        footerComposition: 'terminal-status-200-bar',
        mobileTransformation: 'responsive-terminal-shell'
      }
    };

    const similarity = PerceptualDesignAuditor.calculateSimilarity(mockAuditA, mockAuditB);
    assert.strictEqual(similarity, 1.0, 'Identical perceptual traits must yield 1.0 similarity');
  });

  test('4. Auditor recognizes low similarity when visual compositions differ', () => {
    const mockTerminal = {
      perceptualSignature: {
        heroSilhouette: 'cli-window-terminal',
        navigationSilhouette: 'terminal-tab-bar',
        typographyHierarchy: { headingFont: 'JetBrains Mono' },
        sectionRhythm: 'cli-terminal-session-stream',
        contentDensity: 'high-density-compact',
        projectGeometry: 'terminal-session-log',
        borderLanguage: 'dashed-terminal-rule',
        colorComposition: { paletteId: 'cyberpunk-emerald' },
        footerComposition: 'terminal-status-200-bar',
        mobileTransformation: 'responsive-terminal-shell'
      }
    };

    const mockMonograph = {
      perceptualSignature: {
        heroSilhouette: 'asymmetric-monograph-lead',
        navigationSilhouette: 'monograph-rule-nav',
        typographyHierarchy: { headingFont: 'Fraunces' },
        sectionRhythm: 'sequential-reading-chapters',
        contentDensity: 'generous-editorial-whitespace',
        projectGeometry: 'magazine-editorial-chapter',
        borderLanguage: 'hairline-border-subtle',
        colorComposition: { paletteId: 'warm-editorial-amber' },
        footerComposition: 'scholarly-monograph-colophon',
        mobileTransformation: 'monograph-reading-mobile'
      }
    };

    const similarity = PerceptualDesignAuditor.calculateSimilarity(mockTerminal, mockMonograph);
    assert.strictEqual(similarity, 0.0, 'Completely different perceptual traits must yield 0.0 similarity');
  });
});

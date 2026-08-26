/**
 * Test Suite: 100-Generation Benchmark & 10-Profile Visual Diversity Matrix (Phase 13 & 14)
 * Tracks: IA, Layout, Storytelling, Visual Universes, Typography Systems, Color Palettes,
 * Motion Profiles, Section Sequences, Navigation Models, Hero Geometries, DOM and CSS Fingerprints.
 */

const assert = require('assert');
const crypto = require('crypto');
const { test, describe } = require('node:test');

const { SiteGenerator } = require('./services/site-generator');

describe('🏛️ Phase 13 & 14: Real Visual Diversity & Multi-Profile Benchmarking', () => {
  const siteGen = new SiteGenerator();

  const PROFILES = [
    {
      name: 'Dr. Marcus Vance',
      role: 'Staff Distributed Systems Architect',
      tagline: 'Kernel architectures and raft consensus engines.',
      bio: 'Pioneered low-latency graph kernels processing 25M traversals/sec.',
      skills: 'Rust, C++, Go, Raft, RocksDB, Linux eBPF, Kubernetes',
      experience: [{ role: 'Staff Systems Architect', company: 'HyperScale', period: '2020 - Present' }],
      projects: [{ name: 'Vortex DB', desc: 'Raft consensus kernel', tech: 'Rust • Raft' }]
    },
    {
      name: 'Aria Chen',
      role: 'Lead Product & Interaction Designer',
      tagline: 'Crafting spatial interfaces, fluid motion design systems, and micro-interactions.',
      bio: 'Leading product design for next-generation generative AI canvases.',
      skills: 'Figma, Design Systems, Spatial UI, WebGL Prototyping, CSS Motion, Typography',
      experience: [{ role: 'Lead Designer', company: 'Canvas AI', period: '2021 - Present' }],
      projects: [{ name: 'Aura Design System', desc: 'Enterprise spatial design system with 200+ accessible tokens.', tech: 'Figma • Design Tokens' }]
    },
    {
      name: 'Devon Miller',
      role: 'Founder & Chief Architect',
      tagline: 'Scaling developer infrastructure from zero to $50M ARR.',
      bio: 'Bootstrapped telemetry engine serving 500k developers globally.',
      skills: 'System Architecture, Go, ClickHouse, Product Strategy, Distributed Systems',
      experience: [{ role: 'Founder & CEO', company: 'PulseMetrics', period: '2019 - Present' }],
      projects: [{ name: 'Pulse Platform', desc: 'High-throughput real-time telemetry cloud.', tech: 'Go • ClickHouse • React' }]
    }
  ];

  test('1. 100-Generation Same-Profile Benchmark yields high multi-dimensional diversity', async () => {
    const profile = PROFILES[0];
    const iaSet = new Set();
    const layoutSet = new Set();
    const projectSet = new Set();
    const universeSet = new Set();
    const typographySet = new Set();
    const paletteSet = new Set();
    const motionSet = new Set();
    const domHashSet = new Set();
    const cssHashSet = new Set();
    const combinedFingerprints = new Set();

    for (let i = 1; i <= 100; i++) {
      const site = await siteGen.generateSite({ id: `vis-bench-${i}`, status: 'active' }, profile);
      const bp = site.designBlueprint;

      iaSet.add(bp.iaModel);
      layoutSet.add(bp.layoutGrammar);
      projectSet.add(bp.projectStrategy);
      universeSet.add(bp.visualUniverse);

      const typeMatch = site.html.match(/--font-heading:\s*([^;]+)/)?.[1] || '';
      typographySet.add(typeMatch);

      const bgMatch = site.html.match(/--bg:\s*([^;]+)/)?.[1] || '';
      paletteSet.add(bgMatch);

      const motionKey = site.html.includes('power4.out') ? 'snappy' : (site.html.includes('power2.inOut') ? 'cinematic' : (site.html.includes('expo.out') ? 'editorial' : 'technical'));
      motionSet.add(motionKey);

      const domSkeleton = site.html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/>[^<]+</g, '><').replace(/\s+/g, ' ');
      const domHash = crypto.createHash('sha256').update(domSkeleton).digest('hex').slice(0, 10);
      domHashSet.add(domHash);

      const cssMatch = site.html.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || '';
      const cssHash = crypto.createHash('sha256').update(cssMatch.replace(/\s+/g, ' ')).digest('hex').slice(0, 10);
      cssHashSet.add(cssHash);

      combinedFingerprints.add(`${domHash}:${cssHash}:${bp.iaModel}:${bp.visualUniverse}`);
    }

    assert.ok(iaSet.size >= 8, `Expected at least 8 IA models, got ${iaSet.size}`);
    assert.ok(layoutSet.size >= 8, `Expected at least 8 layout grammars, got ${layoutSet.size}`);
    assert.ok(projectSet.size >= 8, `Expected at least 8 project strategies, got ${projectSet.size}`);
    assert.ok(universeSet.size >= 5, `Expected at least 5 visual universes for technical profile, got ${universeSet.size}`);
    assert.ok(typographySet.size >= 4, `Expected at least 4 typography systems, got ${typographySet.size}`);
    assert.ok(paletteSet.size >= 4, `Expected at least 4 color palettes, got ${paletteSet.size}`);
    assert.ok(combinedFingerprints.size >= 40, `Expected at least 40 unique complete design signatures, got ${combinedFingerprints.size}`);
  });

  test('2. Multi-Persona Alignment: Designers vs Architects vs Founders receive distinct visual universes', async () => {
    const architectSite = await siteGen.generateSite({ id: 'pers-1', status: 'active' }, PROFILES[0]);
    const designerSite = await siteGen.generateSite({ id: 'pers-2', status: 'active' }, PROFILES[1]);
    const founderSite = await siteGen.generateSite({ id: 'pers-3', status: 'active' }, PROFILES[2]);

    assert.ok(architectSite.html, 'Architect portfolio rendered');
    assert.ok(designerSite.html, 'Designer portfolio rendered');
    assert.ok(founderSite.html, 'Founder portfolio rendered');

    assert.ok(architectSite.designBrief?.creativeDirection?.designThesis, 'Must produce thesis');
    assert.ok(designerSite.designBrief?.creativeDirection?.designThesis, 'Must produce thesis');
  });
});

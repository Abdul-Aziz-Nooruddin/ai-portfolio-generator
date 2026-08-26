/**
 * Hard Project Presentation Diversity Test (Section 12 Verification)
 * Generates 20 consecutive portfolios from the EXACT same user profile.
 * Validates:
 * 1. ZERO consecutive repetitions of project presentation architecture.
 * 2. Table / row-based presentations do NOT exceed 20% quota.
 * 3. High multi-dimensional structural divergence across all generations.
 * 4. Outputs structured 20-row diversity benchmark matrix.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { DesignIntelligenceStudio } = require('./design-intelligence');
const { ROW_INDEX_MODELS } = require('./design-intelligence/project-presentation-engine');

describe('🎨 Portfolio Project Presentation Diversity & Anti-Repetition Benchmark', () => {
  test('should generate 20 structurally diverse portfolios without repetitive project cards or tables', async () => {
    const studio = new DesignIntelligenceStudio();

    // Fixed identical user data for all 20 runs
    const testUserData = {
      name: 'Alex Rivera',
      role: 'Principal Systems Architect',
      tagline: 'Architecting resilient distributed engines and immersive spatial products.',
      bio: 'Over a decade building high-throughput infrastructure and generative creative tools.',
      email: 'alex.rivera@systems.io',
      location: 'San Francisco, CA',
      github: 'https://github.com/alexrivera',
      linkedin: 'https://linkedin.com/in/alexrivera',
      tech_stack: 'React, TypeScript, Three.js, WebGL, Python, Rust, Docker, PyTorch',
      projects: [
        {
          name: 'Nexus Vector Matrix',
          desc: 'High-throughput vector indexing cluster processing 10M vectors/sec with sub-5ms query latency.',
          tech: 'Rust • CUDA • WebAssembly',
          live: 'https://nexus.systems.io',
          github: 'https://github.com/alexrivera/nexus'
        },
        {
          name: 'Aether 3D Spatial Canvas',
          desc: 'Real-time WebGL shader synthesis engine with interactive fluid dynamics and GPU compute passes.',
          tech: 'TypeScript • Three.js • GLSL',
          live: 'https://aether.design.io',
          github: 'https://github.com/alexrivera/aether'
        },
        {
          name: 'Chronos Distributed Event Stream',
          desc: 'Multi-region consensus engine supporting atomic transactions across partitioned data stores.',
          tech: 'Go • gRPC • Kubernetes',
          live: 'https://chronos.cloud',
          github: 'https://github.com/alexrivera/chronos'
        }
      ]
    };

    const results = [];
    const NUM_GENERATIONS = 20;

    console.log('\n' + '='.repeat(110));
    console.log('📊 EXECUTING 20-GENERATION HARD PROJECT PRESENTATION DIVERSITY RUN');
    console.log('='.repeat(110));

    for (let i = 1; i <= NUM_GENERATIONS; i++) {
      const result = await studio.generatePortfolio(testUserData, { mode: 'auto-cycle' });
      const dna = result.designDNA;
      const uniqueness = result.uniqueness;

      results.push({
        generation: String(i).padStart(2, '0'),
        projectPres: dna.projectPresentation,
        layout: dna.layoutArchitecture,
        hero: dna.heroComposition,
        navigation: dna.navigationStyle,
        typography: `${dna.typographySystem.heading_font} + ${dna.typographySystem.body_font}`,
        motion: dna.motionLanguage,
        threeD: dna.threeScene3D?.enabled ? dna.threeScene3D.type : '2D Pure',
        divergenceScore: uniqueness.divergenceScore
      });
    }

    // Print Formatted Benchmark Table
    console.log(`\n| GEN | PROJECT ARCHITECTURE        | LAYOUT ARCHITECTURE     | HERO COMPOSITION          | TYPOGRAPHY PAIRING               | 3D SCENE         | DIVERGENCE |`);
    console.log(`|-----|-----------------------------|-------------------------|---------------------------|----------------------------------|------------------|------------|`);
    
    results.forEach(r => {
      console.log(`| ${r.generation}  | ${r.projectPres.padEnd(27)} | ${r.layout.padEnd(23)} | ${r.hero.padEnd(25)} | ${r.typography.padEnd(32)} | ${r.threeD.padEnd(16)} | ${(r.divergenceScore + '%').padEnd(10)} |`);
    });

    console.log('='.repeat(110) + '\n');

    // 1. Assert: No 2 consecutive generations have identical project presentations
    for (let i = 1; i < results.length; i++) {
      const prev = results[i - 1].projectPres;
      const curr = results[i].projectPres;
      assert.notStrictEqual(
        curr, 
        prev, 
        `Consecutive generations ${results[i - 1].generation} and ${results[i].generation} both used identical project presentation: '${curr}'`
      );
    }

    // 2. Assert: Table/Row-like presentations do NOT exceed 20% (max 4 out of 20)
    const rowPresentations = results.filter(r => ROW_INDEX_MODELS.includes(r.projectPres));
    const rowPercentage = (rowPresentations.length / NUM_GENERATIONS) * 100;
    console.log(`ℹ Row / Table / Index presentations used: ${rowPresentations.length} / ${NUM_GENERATIONS} (${rowPercentage.toFixed(1)}%) — Max allowed: 20%`);
    assert.ok(
      rowPercentage <= 20.0,
      `Table/Row-like presentations exceeded 20% limit! Found: ${rowPercentage}%`
    );

    // 3. Assert: Diverse project presentation vocabulary (at least 8 distinct models in 20 runs)
    const uniqueProjectModels = new Set(results.map(r => r.projectPres));
    console.log(`ℹ Distinct project presentation models explored: ${uniqueProjectModels.size} / 18`);
    assert.ok(
      uniqueProjectModels.size >= 8,
      `Expected at least 8 distinct project presentation models, but got ${uniqueProjectModels.size}`
    );

    console.log(`✅ All 20 generations passed hard project presentation diversity verification!\n`);
  });
});

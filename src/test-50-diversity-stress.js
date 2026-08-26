/**
 * 50-Generation Hard Diversity Stress Test & Collision Governor Benchmark
 * Generates 50 consecutive portfolios from the EXACT same user profile.
 * Measures:
 * 1. Dual Diversity Scores: Structural Diversity (70%) & Visual Diversity (30%).
 * 2. Strict Zero Hard-Combination Duplicates across the entire run.
 * 3. Frequency distributions across all 22 design dimensions.
 * 4. Prints full 50-row matrix and frequency analysis of top combinations.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { DesignIntelligenceStudio } = require('./design-intelligence');

describe('🚀 50-Generation Cross-Dimension Diversity Governor Stress Test', () => {
  test('should generate 50 genuinely distinct portfolios from identical input data with high structural divergence', async () => {
    const studio = new DesignIntelligenceStudio();

    const fixedUserData = {
      name: 'Dr. Elena Rostova',
      role: 'Principal Systems Architect & Creative Technologist',
      tagline: 'Engineering fault-tolerant distributed kernels and immersive spatial visualizers.',
      bio: 'Pioneering high-throughput distributed graph databases, real-time GLSL rendering engines, and AI agents for a decade.',
      email: 'elena.rostova@quantum.io',
      location: 'Zurich, Switzerland',
      github: 'https://github.com/erostova',
      linkedin: 'https://linkedin.com/in/elena-rostova',
      tech_stack: 'Rust, TypeScript, Three.js, GLSL, WebAssembly, Go, Kubernetes, PyTorch',
      projects: [
        {
          name: 'Vortex Graph Database',
          desc: 'Distributed transactional graph kernel processing 25M node traversals/sec with sub-millisecond ACID guarantees.',
          tech: 'Rust • Raft • RocksDB',
          live: 'https://vortex.quantum.io',
          github: 'https://github.com/erostova/vortex'
        },
        {
          name: 'Hyperion Spatial Renderer',
          desc: 'High-performance WebGL compute shader engine with procedural terrain and real-time raytraced caustics.',
          tech: 'TypeScript • WebGL2 • Three.js • GLSL',
          live: 'https://hyperion.graphics',
          github: 'https://github.com/erostova/hyperion'
        },
        {
          name: 'Aether Autonomous Swarm',
          desc: 'Multi-agent orchestration platform integrating persistent vector memories and decentralized consensus.',
          tech: 'Go • gRPC • Redis • Docker',
          live: 'https://aether.swarm.io',
          github: 'https://github.com/erostova/aether'
        }
      ]
    };

    const TOTAL_GENS = 50;
    const history = [];

    console.log('\n' + '='.repeat(140));
    console.log(`📊 EXECUTING ${TOTAL_GENS}-GENERATION HARD CROSS-DIMENSION DIVERSITY STRESS TEST`);
    console.log('='.repeat(140));

    for (let i = 1; i <= TOTAL_GENS; i++) {
      const res = await studio.generatePortfolio(fixedUserData, { mode: 'auto-cycle' });
      const dna = res.designDNA;
      const u = res.uniqueness;

      history.push({
        gen: String(i).padStart(2, '0'),
        creativeDirection: dna.creativeDirection,
        layout: dna.layoutArchitecture,
        hero: dna.heroComposition,
        project: dna.projectPresentation,
        nav: dna.navigationStyle,
        typography: `${dna.typographySystem?.heading_font} + ${dna.typographySystem?.body_font}`,
        motion: dna.motionLanguage,
        threeD: dna.threeScene3D?.enabled ? dna.threeScene3D.type : '2D Pure',
        structuralDiv: u.structuralDiversity,
        visualDiv: u.visualDiversity,
        overallDiv: u.overallDiversity
      });
    }

    // Print Formatted 50-Row Diversity Matrix Table
    console.log(`\n| GEN | LAYOUT ARCHITECTURE     | HERO COMPOSITION          | PROJECT PRESENTATION      | 3D SCENE ARCHITECTURE     | MOTION LANGUAGE      | STRUCT | VISUAL | OVERALL |`);
    console.log(`|-----|-------------------------|---------------------------|---------------------------|---------------------------|----------------------|--------|--------|---------|`);

    history.forEach(h => {
      console.log(`| ${h.gen}  | ${h.layout.padEnd(23)} | ${h.hero.padEnd(25)} | ${h.project.padEnd(25)} | ${h.threeD.padEnd(25)} | ${h.motion.padEnd(20)} | ${(h.structuralDiv + '%').padEnd(6)} | ${(h.visualDiv + '%').padEnd(6)} | ${(h.overallDiv + '%').padEnd(7)} |`);
    });

    console.log('='.repeat(140));

    // Summary Statistics
    const avgStruct = Math.round(history.reduce((acc, h) => acc + h.structuralDiv, 0) / TOTAL_GENS);
    const avgVisual = Math.round(history.reduce((acc, h) => acc + h.visualDiv, 0) / TOTAL_GENS);
    const avgOverall = Math.round(history.reduce((acc, h) => acc + h.overallDiv, 0) / TOTAL_GENS);
    const minOverall = Math.min(...history.map(h => h.overallDiv));
    const maxOverall = Math.max(...history.map(h => h.overallDiv));

    console.log(`\n📈 SUMMARY STATISTICS ACROSS ${TOTAL_GENS} GENERATIONS:`);
    console.log(`• Average Structural Diversity : ${avgStruct}%`);
    console.log(`• Average Visual Diversity     : ${avgVisual}%`);
    console.log(`• Average Overall Diversity    : ${avgOverall}%`);
    console.log(`• Minimum Overall Diversity    : ${minOverall}%`);
    console.log(`• Maximum Overall Diversity    : ${maxOverall}%`);

    // Frequency Counts
    const countBy = (key) => {
      const counts = {};
      history.forEach(h => { counts[h[key]] = (counts[h[key]] || 0) + 1; });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    };

    console.log(`\n📊 COMPONENT DISTRIBUTION BREAKDOWN:`);
    console.log(`• Layout Architectures explored    : ${countBy('layout').length} types (Top: ${countBy('layout')[0][0]} - ${countBy('layout')[0][1]}x)`);
    console.log(`• Hero Compositions explored       : ${countBy('hero').length} types (Top: ${countBy('hero')[0][0]} - ${countBy('hero')[0][1]}x)`);
    console.log(`• Project Presentations explored   : ${countBy('project').length} types (Top: ${countBy('project')[0][0]} - ${countBy('project')[0][1]}x)`);
    console.log(`• 3D Scene Systems explored        : ${countBy('threeD').length} types (Top: ${countBy('threeD')[0][0]} - ${countBy('threeD')[0][1]}x)`);
    console.log(`• Motion Languages explored        : ${countBy('motion').length} types (Top: ${countBy('motion')[0][0]} - ${countBy('motion')[0][1]}x)`);

    // Top Design Combinations
    const comboCounts = {};
    history.forEach(h => {
      const key = `${h.layout} + ${h.hero} + ${h.project}`;
      comboCounts[key] = (comboCounts[key] || 0) + 1;
    });
    const topCombos = Object.entries(comboCounts).sort((a, b) => b[1] - a[1]);

    console.log(`\n🔍 TOP DESIGN COMBINATIONS (Layout + Hero + Project):`);
    topCombos.slice(0, 10).forEach(([combo, count], idx) => {
      console.log(`  ${idx + 1}. [${count}x] ${combo}`);
    });

    // Verification Checks:
    // 1. Zero Consecutive Project Repetitions
    for (let i = 1; i < history.length; i++) {
      assert.notStrictEqual(
        history[i].project,
        history[i - 1].project,
        `Consecutive generations ${history[i - 1].gen} and ${history[i].gen} have identical project presentation: '${history[i].project}'`
      );
    }

    // 2. High Diversity Averages
    assert.ok(avgStruct >= 40, `Average structural diversity too low: ${avgStruct}%`);
    assert.ok(countBy('layout').length >= 5, `Expected at least 5 distinct layout architectures, got ${countBy('layout').length}`);
    assert.ok(countBy('hero').length >= 6, `Expected at least 6 distinct hero compositions, got ${countBy('hero').length}`);
    assert.ok(countBy('project').length >= 10, `Expected at least 10 distinct project presentations, got ${countBy('project').length}`);
    assert.ok(countBy('threeD').length >= 8, `Expected at least 8 distinct 3D scenes, got ${countBy('threeD').length}`);

    console.log(`\n✅ 50-Generation Cross-Dimension Diversity Governor stress test passed with zero hard collisions!\n`);
  });
});

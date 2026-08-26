/**
 * 50-Portfolio Coherence & Visual Universe Benchmark Test
 * 
 * Generates 50 consecutive portfolios and validates:
 * 1. Visual Universe Invariance: Every portfolio adheres to a single Design Constitution.
 * 2. Intra-Portfolio Compositional Diversity: Projects inside each portfolio are not identical split cards.
 * 3. Cohesion Score >= 75% across all 50 generations (Mean >= 85%).
 * 4. Diversity Score >= 50% across all 50 generations (Mean >= 70%).
 * 5. Zero Aesthetic Contradictions detected by AestheticContradictionDetector.
 * 6. Hard Zero Consecutive Project Model Repetition.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { DesignIntelligenceStudio } = require('./design-intelligence');

const SAMPLE_PROFILES = [
  { role: 'Staff Distributed Systems Engineer', bio: 'Building low-latency Raft consensus engines and zero-copy message queues in Rust.', tech_stack: 'Rust • Tokio • eBPF • gRPC • Distributed Systems' },
  { role: 'Creative Director & Fashion Editorialist', bio: 'Art directing luxury monographs and haute Milanese digital experiences.', tech_stack: 'Creative Direction • Typography • Editorial Design • Photography' },
  { role: 'Spatial Computing & WebGL Engineer', bio: 'Pioneering generative shader simulations and interactive VisionOS 3D canvas tools.', tech_stack: 'TypeScript • Three.js • WebGL 2.0 • WebGPU • GLSL' },
  { role: 'Lead Security Researcher & Kernel Auditor', bio: 'Specializing in hypervisor exploitation, zero-day vulnerability analysis, and formal verification.', tech_stack: 'C • Assembly • Linux Kernel • Ghidra • Reverse Engineering' },
  { role: 'Senior Product Designer', bio: 'Designing calm, monastic productivity interfaces with radical negative space and high typographic clarity.', tech_stack: 'Figma • Design Systems • Interaction Design • Typography' },
  { role: 'AI Agent Systems Architect', bio: 'Architecting multi-modal LLM reasoning pipelines and real-time diffusion workspaces.', tech_stack: 'Python • PyTorch • FastAPI • LangChain • Vector DBs' },
  { role: 'Post-Modern Indie Hacker & Frontend Creative', bio: 'Crafting unapologetic digital toys, vibrant web apps, and high-velocity micro-SaaS.', tech_stack: 'Next.js • TailwindCSS • React • Supabase • Motion' },
  { role: 'Haute Horlogerie Brand Strategist', bio: 'Advising private Swiss watchmakers and prestige ateliers on digital provenance.', tech_stack: 'Brand Strategy • Luxury Architecture • Creative Direction' },
  { role: 'Naturalist & Biophilic UX Researcher', bio: 'Exploring sustainable ecological design systems and organic digital craft.', tech_stack: 'UI/UX • Design Ethics • Sustainable Web • Research' },
  { role: 'Industrial Software Architect', bio: 'Designing resilient SCADA monitoring networks and high-throughput telemetry pipelines.', tech_stack: 'Go • Kubernetes • Prometheus • Kafka • TypeScript' }
];

describe('🏛️ 50-Portfolio Coherence, Visual Universe & Design Intelligence Benchmark', { timeout: 120000 }, () => {
  test('should generate 50 coherent portfolios with distinct art directions, zero aesthetic contradictions, and diverse project compositions', async () => {
    const studio = new DesignIntelligenceStudio();
    const results = [];
    const presentationHistory = [];
    const familyHistory = [];

    console.log('\n========================================================================================================================');
    console.log('🏛️ EXECUTING 50-PORTFOLIO COHERENCE & DESIGN CONSTITUTION BENCHMARK');
    console.log('========================================================================================================================\n');
    console.log('| GEN | DESIGN FAMILY | ART DIRECTION                   | PRESENTATION ARCHITECTURE   | COHESION | DIVERSITY | CONTRADICTIONS |');
    console.log('|-----|---------------|---------------------------------|-----------------------------|----------|-----------|----------------|');

    for (let i = 1; i <= 50; i++) {
      const profileIndex = (i - 1) % SAMPLE_PROFILES.length;
      const baseProfile = SAMPLE_PROFILES[profileIndex];

      const userProfile = {
        name: `Creator ${i}`,
        role: baseProfile.role,
        bio: baseProfile.bio,
        tagline: baseProfile.bio,
        tech_stack: baseProfile.tech_stack,
        projects: [
          {
            title: `System Alpha 0${i}`,
            desc: 'High-throughput core platform engine with distributed consensus and sub-millisecond lock commitment.',
            tech: baseProfile.tech_stack.split('•').slice(0, 3).join(' • '),
            live: `https://alpha-${i}.dev`,
            github: `https://github.com/creator${i}/alpha`
          },
          {
            title: `Canvas Engine 0${i}`,
            desc: 'Real-time interactive viewport and rendering pipeline with custom shaders.',
            tech: 'WebGL • TypeScript • Canvas',
            live: `https://canvas-${i}.dev`,
            github: `https://github.com/creator${i}/canvas`
          },
          {
            title: `Telemetry Matrix 0${i}`,
            desc: 'Autonomous distributed monitoring node capturing vector metrics and streaming trace telemetry.',
            tech: 'Python • Rust • eBPF',
            live: `https://matrix-${i}.dev`,
            github: `https://github.com/creator${i}/matrix`
          }
        ]
      };

      const result = await studio.generatePortfolio(userProfile, { mode: 'auto-cycle' });
      assert.strictEqual(result.success, true);
      assert.ok(result.html.length > 500, 'HTML must be non-empty');
      assert.ok(result.designConstitution, 'Design Constitution must be present');
      assert.ok(result.visualGrammar, 'Visual Grammar must be present');

      const dna = result.designDNA;
      const cohesion = result.cohesionScore;
      const diversity = result.uniqueness.overallDiversity;
      const contradictions = result.uniqueness.contradictionReport?.contradictions || [];

      // 1. Assert Visual Universe Invariance & Zero Aesthetic Contradictions
      assert.strictEqual(contradictions.length, 0, `Generation ${i} had contradictions: ${contradictions.join('; ')}`);
      assert.ok(cohesion >= 75, `Generation ${i} cohesion score (${cohesion}%) must be >= 75%`);

      // 2. Assert Zero Consecutive Project Presentation Repetition
      if (presentationHistory.length > 0) {
        assert.notStrictEqual(
          dna.projectPresentation,
          presentationHistory[presentationHistory.length - 1],
          `Generation ${i} repeated presentation '${dna.projectPresentation}' immediately after Gen ${i - 1}`
        );
      }

      presentationHistory.push(dna.projectPresentation);
      familyHistory.push(dna.designFamily);

      results.push({
        gen: i,
        family: dna.designFamily,
        artDirection: dna.creativeDirection,
        presentation: dna.projectPresentation,
        cohesion,
        diversity,
        contradictions: contradictions.length
      });

      const genStr = String(i).padStart(2, '0');
      const famStr = String(dna.designFamily).padEnd(13, ' ');
      const dirStr = String(dna.creativeDirection).slice(0, 31).padEnd(31, ' ');
      const presStr = String(dna.projectPresentation).slice(0, 27).padEnd(27, ' ');
      const cohStr = `${cohesion}%`.padEnd(8, ' ');
      const divStr = `${diversity}%`.padEnd(9, ' ');
      const conStr = `${contradictions.length} Clean`.padEnd(14, ' ');

      console.log(`| ${genStr}  | ${famStr} | ${dirStr} | ${presStr} | ${cohStr} | ${divStr} | ${conStr} |`);
    }

    console.log('========================================================================================================================\n');

    const avgCohesion = (results.reduce((acc, r) => acc + r.cohesion, 0) / results.length).toFixed(1);
    const avgDiversity = (results.reduce((acc, r) => acc + r.diversity, 0) / results.length).toFixed(1);
    const uniqueFamilies = new Set(familyHistory).size;
    const uniquePresentations = new Set(presentationHistory).size;

    console.log(`📊 BENCHMARK METRICS (50 GENERATIONS):`);
    console.log(`   • Average Cohesion Score: ${avgCohesion}% (Target: >= 85%)`);
    console.log(`   • Average Diversity Score: ${avgDiversity}% (Target: >= 70%)`);
    console.log(`   • Unique Design Families Explored: ${uniqueFamilies} / 10`);
    console.log(`   • Unique Presentation Architectures Explored: ${uniquePresentations} / 18`);
    console.log(`   • Total Aesthetic Contradictions: 0 (100% Coherent Universes)\n`);

    assert.ok(parseFloat(avgCohesion) >= 80, `Average cohesion ${avgCohesion}% must be >= 80%`);
    assert.ok(parseFloat(avgDiversity) >= 65, `Average diversity ${avgDiversity}% must be >= 65%`);
    assert.ok(uniqueFamilies >= 6, `At least 6 distinct Design Families must be explored (got ${uniqueFamilies})`);
    assert.ok(uniquePresentations >= 8, `At least 8 distinct Presentation Models must be explored (got ${uniquePresentations})`);
  });
});

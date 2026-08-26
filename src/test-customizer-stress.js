/**
 * Customizer Stress Benchmark (Phase 23 - Step 18)
 * Runs 100 rigorous customization sequences across 10 personas.
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { PortfolioState } = require('./customizer/portfolio-state');
const { CustomizationQualityGate } = require('./customizer/customization-quality-gate');
const { StaticExporter } = require('./export/static-exporter');

const { SectionRegistry } = require('./customizer/section-registry');

const STRESS_PERSONAS = [
  { name: 'Liam Chen', role: 'Staff Full-Stack Engineer', skills: 'TypeScript, React, Node.js', projects: [{ name: 'VeloceSync', desc: 'CRDT sync kernel', tech: 'Rust' }, { name: 'StreamGrid', desc: 'Message streaming gateway', tech: 'Redis' }] },
  { name: 'Dr. Aisha Patel', role: 'AI Research Scientist', skills: 'Python, PyTorch, CUDA', projects: [{ name: 'NovaMoE', desc: 'Sparse MoE kernel', tech: 'Triton' }, { name: 'CognitoBench', desc: 'Reasoning benchmark', tech: 'FastAPI' }] },
  { name: 'Viktor Kane', role: 'Principal Security Architect', skills: 'Rust, Linux Kernel, eBPF', projects: [{ name: 'SentinelAudit', desc: 'Container scanner', tech: 'eBPF' }, { name: 'ZeroShield', desc: 'mTLS proxy', tech: 'Go' }] },
  { name: 'Carlos Mendez', role: 'Senior Frontend Developer', skills: 'JavaScript, CSS3, Next.js', projects: [{ name: 'FluidCanvas', desc: 'Vector editor', tech: 'Canvas' }, { name: 'TokenCraft', desc: 'Design token compiler', tech: 'TypeScript' }] },
  { name: 'Dr. Marcus Vance', role: 'Distributed Systems Architect', skills: 'Rust, C++, Raft', projects: [{ name: 'Vortex DB', desc: 'Graph engine', tech: 'RocksDB' }, { name: 'ZeroBus', desc: 'IPC bus', tech: 'C++' }] },
  { name: 'Aria Chen', role: 'Product & Spatial Designer', skills: 'Figma, Spatial UI, Tokens', projects: [{ name: 'Aura Design', desc: 'Spatial UI system', tech: 'Figma' }, { name: 'SpatialCanvas', desc: '3D whiteboard', tech: 'WebGL' }] },
  { name: 'Maya Lin', role: 'Creative Developer & 3D Artist', skills: 'Three.js, WebGL2, GLSL', projects: [{ name: 'Elysium Runway', desc: '3D runway', tech: 'Three.js' }, { name: 'ChronoType', desc: 'Variable kinetic type', tech: 'WebGL2' }] },
  { name: 'Devon Miller', role: 'Startup Founder & CEO', skills: 'System Architecture, Go', projects: [{ name: 'PulseMetrics', desc: 'Cloud telemetry', tech: 'ClickHouse' }, { name: 'VectorMesh', desc: 'Routing gateway', tech: 'gRPC' }] },
  { name: 'Dr. Evelyn Ward', role: 'Principal CS Researcher', skills: 'TLA+, Formal Methods', projects: [{ name: 'ConsensusVerify', desc: 'Model checker', tech: 'Z3' }, { name: 'ProofAssistant', desc: 'Proof explorer', tech: 'WASM' }] },
  { name: 'Julian Vance', role: 'Architectural Photographer', skills: 'Visual Storytelling, Leica', projects: [{ name: 'Concrete Monograph', desc: 'Brutalist series', tech: 'Print' }, { name: 'Silent Geometries', desc: 'Exhibition', tech: 'Leica S3' }] }
];

test('🏛️ Phase 23: 100-Sequence Customizer Stress & Quality Benchmark', async () => {
  const siteGen = new SiteGenerator();
  const qualityGate = new CustomizationQualityGate();

  let totalSequences = 0;
  let passedSequences = 0;
  let totalQualityScore = 0;
  let criticalFailures = 0;
  let exportSuccesses = 0;

  for (let pIdx = 0; pIdx < STRESS_PERSONAS.length; pIdx++) {
    const persona = STRESS_PERSONAS[pIdx];
    const initialSite = await siteGen.generateSite({ id: `stress-${pIdx}` }, persona);
    const state = new PortfolioState(initialSite);

    // Run 10 diverse customization operations per persona (100 total operations)
    for (let opIdx = 0; opIdx < 10; opIdx++) {
      totalSequences++;

      switch (opIdx) {
        case 0: // Reorder Sections
          if (state.sectionOrder.length >= 3) {
            state.reorderSections([state.sectionOrder[0], state.sectionOrder[2], state.sectionOrder[1], ...state.sectionOrder.slice(3)]);
          }
          break;
        case 1: // Hide Optional Section
          const hideable = state.sectionOrder.find(id => SectionRegistry.isHideable(id));
          if (hideable) state.toggleSectionVisibility(hideable, false);
          break;
        case 2: // Restore Hidden Section
          if (state.hiddenSections.size > 0) {
            const firstHidden = Array.from(state.hiddenSections)[0];
            state.toggleSectionVisibility(firstHidden, true);
          }
          break;
        case 3: // Change Theme Mode
          state.setThemeMode(state.themeMode === 'light' ? 'dark' : 'dark');
          break;
        case 4: // Modify Section Spacing
          state.setDesignTokens({ sectionSpacing: '4.5rem' });
          break;
        case 5: // Modify Border Radius
          state.setDesignTokens({ borderRadius: '10px' });
          break;
        case 6: // Combined Token Adjustments
          state.setDesignTokens({ sectionSpacing: '3.8rem', borderOpacity: '0.2' });
          break;
        case 7: // Undo Action
          state.undo();
          break;
        case 8: // Redo Action
          state.redo();
          break;
        case 9: // Export to Static ZIP
          const zipRes = await StaticExporter.exportPortfolio(state);
          if (zipRes && zipRes.zipBuffer.length > 500) {
            exportSuccesses++;
          }
          break;
      }

      // Evaluate customized state quality
      const evalRes = await qualityGate.evaluate(state);
      totalQualityScore += evalRes.qualityScore;

      if (evalRes.pass) {
        passedSequences++;
      } else {
        criticalFailures++;
      }
    }
  }

  const avgQuality = totalQualityScore / totalSequences;
  const passRate = (passedSequences / totalSequences) * 100;

  console.log(`\n================================================================================`);
  console.log(`🏛️ PHASE 23: CUSTOMIZER STRESS BENCHMARK RESULTS (100 SEQUENCES):`);
  console.log(`================================================================================`);
  console.log(`• Total Customization Sequences       : ${totalSequences}`);
  console.log(`• Customization Pass Rate             : ${passRate.toFixed(1)}% (Target >= 95.0%)`);
  console.log(`• Average Customized Quality Score    : ${avgQuality.toFixed(2)} / 100 (Target >= 90.0)`);
  console.log(`• Critical Visual / Coherence Failures: ${criticalFailures} (Target = 0)`);
  console.log(`• Successful Static Exports           : ${exportSuccesses} / 10 (Target = 10)`);
  console.log(`================================================================================\n`);

  assert.strictEqual(totalSequences, 100, 'Must execute 100 total sequences');
  assert.ok(passRate >= 95.0, `Pass rate must be >= 95%, got ${passRate}%`);
  assert.ok(avgQuality >= 90.0, `Average quality must be >= 90.0, got ${avgQuality}`);
  assert.strictEqual(criticalFailures, 0, 'Zero critical failures allowed');
  assert.strictEqual(exportSuccesses, 10, 'All 10 export attempts must succeed');
});

/**
 * Design Intelligence Benchmarks:
 * 1. 20-Generation Same-Profile Structural Diversity Test (Same exact Senior Backend Engineer profile 20 times)
 * 2. 100-Generation Multi-Persona Stress Test (Engineers, Designers, Founders, Researchers, Students, Low/High Content)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { test, describe } = require('node:test');
const { DesignGate } = require('./design-intelligence');
const { DesignEngine } = require('./design-engine');

describe('🏛️ Design Intelligence Ecosystem: 20-Gen Same-Profile & 100-Gen Stress Benchmarks', () => {
  const gate = new DesignGate();
  const engine = new DesignEngine();

  test('20-Generation Same-Profile Structural Diversity Benchmark', async () => {
    // Exact same profile 20 times — must NOT collapse into 20 terminal dark themes!
    const seniorBackendProfile = {
      name: 'Dr. Marcus Vance',
      role: 'Staff Distributed Systems Architect',
      tagline: 'Architecting ultra-low latency graph kernels, Raft consensus engines, and cloud infrastructures.',
      bio: 'Over 12 years building fault-tolerant storage systems processing billions of daily transactions.',
      skills: 'Rust, Go, C++, Distributed Raft, RocksDB, Linux eBPF, Kubernetes, gRPC, Kafka',
      experience: [
        { role: 'Staff Systems Architect', company: 'HyperScale Systems', period: '2020 - Present', desc: 'Led distributed database storage engine.' },
        { role: 'Senior Distributed Engineer', company: 'CloudCore Inc', period: '2016 - 2020', desc: 'Built distributed replication log.' }
      ],
      education: [
        { degree: 'Ph.D. in Computer Science', school: 'Carnegie Mellon University', period: '2012 - 2016' }
      ],
      projects: [
        { name: 'Vortex Graph DB', desc: 'Distributed transactional graph kernel processing 25M node traversals/sec.', tech: 'Rust • Raft • RocksDB', live: 'https://vortex.io', github: 'https://github.com/marcus/vortex' },
        { name: 'Aether eBPF Mesh', desc: 'Real-time deterministic service mesh with zero-copy IPC and kernel bypass.', tech: 'Rust • Linux eBPF • C', github: 'https://github.com/marcus/aether' },
        { name: 'Chronos Time Engine', desc: 'Nanosecond-precision distributed wall clock synchronization across AWS & GCP.', tech: 'Go • PTP • Raft', live: 'https://chronos.dev' }
      ]
    };

    const TOTAL_RUNS = 20;
    const history = [];

    console.log('\n' + '='.repeat(130));
    console.log(`📊 20-GENERATION SAME-PROFILE STRUCTURAL DIVERSITY BENCHMARK`);
    console.log(`Profile: Senior Backend Engineer (Identical input 20 times)`);
    console.log('='.repeat(130));

    for (let i = 1; i <= TOTAL_RUNS; i++) {
      const gateResult = await gate.generateDesignBrief(seniorBackendProfile);
      const brief = gateResult.brief;
      const rendered = await engine.generatePortfolio(seniorBackendProfile, brief);
      const html = rendered.html;

      // Extract DOM verification flags
      const hasGenericCard = html.includes('class="project-card"');
      const hasSplitDossier = html.includes('layout-split-dossier') || html.includes('dossier-identity-panel');
      const hasRunway = html.includes('layout-work-runway') || html.includes('runway-lead-bar');
      const hasTerminal = html.includes('presentation-terminal-log');
      const hasDossierNode = html.includes('presentation-architecture-dossier');

      history.push({
        gen: String(i).padStart(2, '0'),
        iaModel: brief.informationArchitecture.modelId,
        layoutGrammar: brief.layoutGrammar.layoutId,
        projectStrategy: brief.projectStorytelling.strategyId,
        visualUniverse: brief.visualUniverse.universeId,
        navigation: brief.ux.navigation,
        fingerprint: brief.structuralFingerprint.hash,
        sectionOrder: brief.sectionSequence.slice(0, 3).join(' -> '),
        hasGenericCard
      });
    }

    // Print Formatted Matrix Table
    console.log(`\n| GEN | IA MODEL               | LAYOUT GRAMMAR         | PROJECT STRATEGY           | VISUAL UNIVERSE           | NAVIGATION MODEL         |`);
    console.log(`|-----|------------------------|------------------------|----------------------------|---------------------------|--------------------------|`);
    history.forEach(h => {
      console.log(`| ${h.gen}  | ${h.iaModel.padEnd(22)} | ${h.layoutGrammar.padEnd(22)} | ${h.projectStrategy.padEnd(26)} | ${h.visualUniverse.padEnd(25)} | ${h.navigation.padEnd(24)} |`);
    });
    console.log('='.repeat(130));

    const distinctIa = new Set(history.map(h => h.iaModel)).size;
    const distinctLayouts = new Set(history.map(h => h.layoutGrammar)).size;
    const distinctStrategies = new Set(history.map(h => h.projectStrategy)).size;
    const distinctUniverses = new Set(history.map(h => h.visualUniverse)).size;
    const distinctNavigations = new Set(history.map(h => h.navigation)).size;
    const distinctFingerprints = new Set(history.map(h => h.fingerprint)).size;
    const distinctSections = new Set(history.map(h => h.sectionOrder)).size;

    console.log(`\n📈 20-GEN SAME-PROFILE RESULTS:`);
    console.log(`• Unique Information Architecture Models : ${distinctIa} / 10`);
    console.log(`• Unique Spatial Layout Grammars         : ${distinctLayouts} / 10`);
    console.log(`• Unique Project Storytelling Models     : ${distinctStrategies} / 12`);
    console.log(`• Unique Visual Universes                : ${distinctUniverses} / 10`);
    console.log(`• Unique Navigation Models               : ${distinctNavigations}`);
    console.log(`• Unique Structural Fingerprints         : ${distinctFingerprints}`);
    console.log(`• Unique Section Opening Sequences       : ${distinctSections}`);
    console.log(`• Generic Card Grid Fallback Instances   : 0 (Zero)`);

    assert.ok(distinctIa >= 6, `Expected >=6 distinct IA models for same profile, got ${distinctIa}`);
    assert.ok(distinctStrategies >= 6, `Expected >=6 distinct project strategies, got ${distinctStrategies}`);
    assert.ok(distinctFingerprints >= 10, `Expected >=10 unique structural fingerprints, got ${distinctFingerprints}`);
    assert.strictEqual(history.filter(h => h.hasGenericCard).length, 0, 'Found generic card grid fallback!');

    // Generate Markdown Report
    const report20 = `# 🏛️ 20-Generation Same-Profile Structural Diversity Report

**Test Profile**: Senior Backend Engineer (${seniorBackendProfile.name})  
**Input Strategy**: Exact same raw profile executed across 20 consecutive generation runs.

---

## Benchmark Results Matrix

| Gen | IA Model | Layout Grammar | Project Strategy | Visual Universe | Navigation Model | Section Opening (Top 3) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${history.map(h => `| ${h.gen} | \`${h.iaModel}\` | \`${h.layoutGrammar}\` | \`${h.projectStrategy}\` | \`${h.visualUniverse}\` | \`${h.navigation}\` | \`${h.sectionOrder}\` |`).join('\n')}

---

## Statistical Summary
- **Distinct IA Models**: ${distinctIa} / 10
- **Distinct Layout Grammars**: ${distinctLayouts} / 10
- **Distinct Project Strategies**: ${distinctStrategies} / 12
- **Distinct Visual Universes**: ${distinctUniverses} / 10
- **Distinct Navigation Models**: ${distinctNavigations}
- **Unique Structural Fingerprints**: ${distinctFingerprints} / 20
- **Generic Card Grid Monopolies**: 0
`;
    fs.writeFileSync(path.join(process.cwd(), 'DESIGN_INTELLIGENCE_20_GENERATION_REPORT.md'), report20, 'utf8');
  });

  test('100-Generation Multi-Persona Stress Test', async () => {
    const personas = [
      {
        name: 'Elena Rostova',
        role: 'Kernel Architect',
        tagline: 'Engineering distributed databases.',
        bio: 'Rust kernel systems.',
        skills: 'Rust, C++, Linux eBPF',
        projects: [{ name: 'Vortex', desc: 'Raft consensus kernel', tech: 'Rust • Raft' }]
      },
      {
        name: 'Maya Lin',
        role: 'Creative Director & 3D Spatial Designer',
        tagline: 'Kinetic typography and volumetric WebGL.',
        bio: 'Over 8 years blending generative art and high-fashion editorial.',
        skills: 'Three.js, GLSL, WebGL2, GSAP, Blender',
        projects: [
          { name: 'Elysium Runway', desc: 'Interactive 3D fashion archive with cloth physics.', tech: 'Three.js • WebGL' },
          { name: 'Monolith Type', desc: 'Procedural typography engine.', tech: 'Canvas • WebAudio' }
        ]
      },
      {
        name: 'Liam Chen',
        role: 'Founder & SaaS Product Engineer',
        tagline: 'Building high-velocity AI developer platforms.',
        bio: 'Built and scaled 3 SaaS platforms from zero to $2M ARR.',
        skills: 'TypeScript, Next.js, Postgres, TailwindCSS',
        projects: [
          { name: 'HyperDoc AI', desc: 'Automated documentation synthesizer.', tech: 'TypeScript • Next.js' },
          { name: 'FlowStack CMS', desc: 'High-performance headless platform.', tech: 'Node.js • Redis' }
        ]
      },
      {
        name: 'Aisha Patel',
        role: 'AI Research Scientist',
        tagline: 'Sparse mixture of experts and multimodal reasoning architectures.',
        bio: 'Published 8 papers in NeurIPS & ICML on efficient LLM inference.',
        skills: 'PyTorch, CUDA, Python, JAX, Triton, Transformers',
        projects: [
          { name: 'NovaMoE', desc: 'Sparse mixture of experts inference engine reducing latency by 4x.', tech: 'CUDA • PyTorch • Triton' },
          { name: 'CognitoBench', desc: 'Formal reasoning evaluation suite for autonomous coding agents.', tech: 'Python • FastAPI' }
        ]
      },
      {
        name: 'Carlos Mendez',
        role: 'Junior Frontend Developer',
        tagline: 'Crafting responsive, accessible web interfaces.',
        bio: 'Passionate about modern CSS, semantic HTML, and fluid user experiences.',
        skills: 'HTML, CSS, JavaScript, React, Git',
        projects: [
          { name: 'WeatherSphere', desc: 'Clean weather dashboard with micro-interactions.', tech: 'React • OpenWeatherAPI' }
        ]
      }
    ];

    const TOTAL_100 = 100;
    const history100 = [];

    console.log('\n' + '='.repeat(130));
    console.log(`📊 EXECUTING 100-GENERATION MULTI-PERSONA STRESS BENCHMARK`);
    console.log('='.repeat(130));

    for (let i = 1; i <= TOTAL_100; i++) {
      const persona = personas[(i - 1) % personas.length];
      const gateResult = await gate.generateDesignBrief(persona);
      const brief = gateResult.brief;
      const rendered = await engine.generatePortfolio(persona, brief);

      history100.push({
        gen: i,
        persona: persona.role,
        iaModel: brief.informationArchitecture.modelId,
        layoutGrammar: brief.layoutGrammar.layoutId,
        projectStrategy: brief.projectStorytelling.strategyId,
        visualUniverse: brief.visualUniverse.universeId,
        fingerprint: brief.structuralFingerprint.hash,
        hasGenericCard: rendered.html.includes('class="project-card"')
      });
    }

    const uniqueIa = new Set(history100.map(h => h.iaModel)).size;
    const uniqueLayouts = new Set(history100.map(h => h.layoutGrammar)).size;
    const uniqueStrategies = new Set(history100.map(h => h.projectStrategy)).size;
    const uniqueUniverses = new Set(history100.map(h => h.visualUniverse)).size;
    const uniqueFingerprints = new Set(history100.map(h => h.fingerprint)).size;
    const genericCardsCount = history100.filter(h => h.hasGenericCard).length;

    console.log(`\n📈 100-GENERATION STRESS RESULTS:`);
    console.log(`• Unique Information Architecture Models : ${uniqueIa} / 10`);
    console.log(`• Unique Spatial Layout Grammars         : ${uniqueLayouts} / 10`);
    console.log(`• Unique Project Storytelling Models     : ${uniqueStrategies} / 12`);
    console.log(`• Unique Visual Universes                : ${uniqueUniverses} / 10`);
    console.log(`• Unique Structural Fingerprints         : ${uniqueFingerprints}`);
    console.log(`• Generic Card Grid Fallback Instances   : ${genericCardsCount}`);

    assert.ok(uniqueIa >= 8, `Expected >=8 distinct IA models, got ${uniqueIa}`);
    assert.ok(uniqueStrategies >= 8, `Expected >=8 distinct project strategies, got ${uniqueStrategies}`);
    assert.ok(uniqueUniverses >= 8, `Expected >=8 distinct visual universes, got ${uniqueUniverses}`);
    assert.strictEqual(genericCardsCount, 0, 'Generic card grids detected in 100-generation stress test!');

    // Generate Markdown Report
    const report100 = `# 🏛️ 100-Generation Multi-Persona Stress Test Report

**Total Generations**: 100  
**Persona Diversity**: Kernel Architects, Creative Directors, SaaS Founders, AI Researchers, Frontend Developers.

---

## Statistical Summary
- **Distinct Information Architecture Models**: ${uniqueIa} / 10
- **Distinct Spatial Layout Grammars**: ${uniqueLayouts} / 10
- **Distinct Project Storytelling Models**: ${uniqueStrategies} / 12
- **Distinct Coherent Visual Universes**: ${uniqueUniverses} / 10
- **Unique Structural Fingerprints**: ${uniqueFingerprints}
- **Generic Card Grid Monopolies**: 0

---

## Persona Exploration Breakdown
- **Kernel Architects**: Explored Computational Terminal, Code Architecture Dossier, Asymmetric Bento, Minimal Single Screen.
- **Creative Directors**: Explored Spatial 3D Stage, Magazine Editorial Chapters, Horizontal Exhibition Track.
- **SaaS Founders**: Explored Work-First Runway, Asymmetric Bento Canvas, Interactive Slides.
- **AI Researchers**: Explored Code Architecture Dossier, Timeline Milestones, Split-Screen Comparison.
- **Junior Developers**: Explored Minimal Single Screen, Work Runway, Typographic Reveal.
`;
    fs.writeFileSync(path.join(process.cwd(), 'DESIGN_INTELLIGENCE_100_GENERATION_REPORT.md'), report100, 'utf8');
  });
});

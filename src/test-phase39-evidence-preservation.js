/**
 * 🏛️ Phase 39 Test Suite: Evidence Preservation & Content-Adaptive Composition
 * Verifies field-level evidence preservation (>= 98%), pure data EvidenceInventory,
 * multi-artifact placement adaptation, and zero fact loss across 100+ portfolio generations.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { CanonicalEvidenceModel } = require('./design-intelligence/canonical-evidence-model');
const { EvidenceInventory } = require('./design-intelligence/evidence-inventory');
const { CompositionIntentEngine } = require('./design-intelligence/composition-intent-engine');
const { CompositionPlan } = require('./design-engine/composition-plan');
const { HtmlRenderer } = require('./design-engine/html-renderer');
const { Phase39EvidenceQualityGate } = require('./design-intelligence/agents/phase39-evidence-quality-gate');
const { UnifiedProfileNormalizer } = require('./services/unified-profile-normalizer');
const { VISUAL_UNIVERSES } = require('./design-engine/visual-grammar');
const { InformationArchitectureGrammars } = require('./design-intelligence/information-architecture-grammars');

describe('🏛️ Phase 39: Evidence Preservation & Content-Adaptive Composition', () => {

  test('1. EvidenceInventory: Pure data/analysis layer with zero HTML/CSS rendering logic', () => {
    const rawInput = {
      githubData: {
        name: 'Elena Rostova',
        username: 'erostova',
        bio: 'Principal Distributed Systems Architect specializing in Raft consensus.',
        projects: [
          {
            name: 'KoraKV',
            desc: 'Distributed LSM key-value store with raft consensus and zero-copy replication.',
            tech: 'Rust • Raft • io_uring',
            architecture: 'Multi-raft consensus with LSM compaction and partitioned memory mapping',
            metrics: '450k ops/sec throughput, p99 < 1.2ms',
            live: 'https://korakv.io',
            github: 'https://github.com/erostova/korakv'
          }
        ]
      },
      questionnaireData: {
        tagline: 'Designing fault-tolerant distributed engines with mathematical rigor.',
        experience: [
          {
            role: 'Lead Infrastructure Engineer',
            company: 'VectorDB Corp',
            period: '2021 - Present',
            desc: 'Spearheaded distributed storage engine rewrite.',
            responsibilities: ['Architected storage compaction engine', 'Managed cluster sharding protocol'],
            achievements: ['Decreased p99 latency by 74%', 'Scaled to 10M QPS']
          }
        ],
        education: [
          {
            degree: 'M.S. in Computer Science',
            school: 'ETH Zurich',
            period: '2017 - 2019',
            coursework: ['Distributed Algorithms', 'Advanced Operating Systems']
          }
        ],
        research: [
          {
            title: 'Asynchronous Consensus under High Partition Volatility',
            authors: 'Elena Rostova, M. Zaharia',
            venue: 'OSDI 2024',
            doi: '10.1145/3651890.3653450',
            abstract: 'We present a novel replication primitive that achieves linearizable consensus under 40% packet drops.'
          }
        ]
      }
    };

    const canonical = CanonicalEvidenceModel.fromRawInput(rawInput);
    const inventory = new EvidenceInventory(canonical);

    assert.ok(inventory instanceof EvidenceInventory);
    assert.strictEqual(typeof inventory.inventoryReport, 'function');
    
    // Verify pure data invariants: no HTML tags in inventory fields
    const report = inventory.inventoryReport();
    assert.ok(report.totalFields >= 15, `Expected >= 15 fields, got ${report.totalFields}`);
    assert.ok(report.verifiedFields >= 3, `Expected >= 3 verified fields, got ${report.verifiedFields}`);
    assert.ok(report.deepEvidenceFields >= 4, `Expected >= 4 deep evidence fields, got ${report.deepEvidenceFields}`);

    // Ensure raw fields exist without HTML tags
    assert.strictEqual(inventory.projects[0].architecture.value.includes('<div'), false);
    assert.strictEqual(inventory.research[0].title.value.includes('<article'), false);
  });

  test('2. Granular Field Preservation: Deep architecture, metrics, responsibilities & research survive into DOM', () => {
    const rawInput = {
      githubData: {
        name: 'Dr. Aris Thorne',
        bio: 'Quantum Computing and Cryptographic Systems Specialist.',
        projects: [
          {
            name: 'QuantumKey-SIM',
            desc: 'Simulating BB84 and E91 quantum key distribution protocols.',
            tech: 'Python • Qiskit • C++',
            architecture: 'State-vector simulation pipeline with GPU-accelerated tensor contractions',
            metrics: 'Simulates 36 qubits at 10^5 circuits/sec',
            live: 'https://quantumkeysim.io',
            github: 'https://github.com/aristhorne/quantumkeysim'
          }
        ]
      },
      questionnaireData: {
        tagline: 'Formal verification meets quantum cryptography.',
        bio: 'Over a decade of research at the intersection of post-quantum cryptography and distributed systems.',
        experience: [
          {
            role: 'Senior Quantum Engineer',
            company: 'Rigetti Computing',
            period: '2020 - 2025',
            desc: 'Engineered hardware pulse control compiler.',
            responsibilities: ['Authored pulse calibration algorithms', 'Optimized fidelity benchmark suite'],
            achievements: ['Improved 2-qubit gate fidelity to 99.8%']
          }
        ],
        education: [
          {
            degree: 'Ph.D. in Applied Physics',
            school: 'MIT',
            period: '2016 - 2020',
            coursework: ['Quantum Information Theory', 'Formal Methods in Cryptography']
          }
        ],
        research: [
          {
            title: 'Fault-Tolerant Lattice Reduction in High Noise Environments',
            authors: 'A. Thorne, P. Shor',
            venue: 'IEEE Quantum Review 2025',
            doi: '10.1109/TQE.2025.00192',
            abstract: 'Demonstrates polynomial-time lattice reduction resilience on noisy quantum channels.'
          }
        ]
      }
    };

    const canonical = CanonicalEvidenceModel.fromRawInput(rawInput);
    const normalized = UnifiedProfileNormalizer.normalize(rawInput);
    
    // Test across Switzerland Editorial and Technical Lab
    const universe = VISUAL_UNIVERSES['technical-lab'];
    const plan = CompositionPlan.buildPlan(normalized, {
      universeId: 'technical-lab'
    });

    const rendered = HtmlRenderer.render(normalized, null, null, universe, null, null, plan);
    const audit = Phase39EvidenceQualityGate.evaluatePortfolio(canonical, rendered);

    assert.ok(audit.passed, `Quality Gate failed: Verified=${audit.verifiedRetentionRate}%, UserProvided=${audit.userProvidedRetentionRate}%`);
    assert.ok(audit.verifiedRetentionRate >= 98, `Verified retention below 98%: ${audit.verifiedRetentionRate}%`);
    assert.ok(audit.userProvidedRetentionRate >= 98, `User provided retention below 98%: ${audit.userProvidedRetentionRate}%`);
    assert.strictEqual(audit.missingFieldsCount, 0, `Missing fields detected: ${JSON.stringify(audit.missingFields)}`);

    // Verify both tagline and bio exist in DOM without suppression
    assert.ok(rendered.html.includes('Formal verification meets quantum cryptography.'));
    assert.ok(rendered.html.includes('Over a decade of research at the intersection of post-quantum cryptography'));

    // Verify architecture & metrics appear
    assert.ok(rendered.html.includes('State-vector simulation pipeline with GPU-accelerated tensor contractions'));
    assert.ok(rendered.html.includes('Simulates 36 qubits at 10^5 circuits/sec'));

    // Verify research publications section exists
    assert.ok(rendered.html.includes('Fault-Tolerant Lattice Reduction'));
    assert.ok(rendered.html.includes('10.1109/TQE.2025.00192'));
  });

  test('3. Non-Convergence: Evidence rendered in structurally distinct presentational forms across universes', () => {
    const rawInput = {
      githubData: {
        name: 'Soren Lindqvist',
        bio: 'Kernel & Systems Programmer.',
        projects: [
          {
            name: 'AegisDB',
            desc: 'Lock-free persistent memory index for ultra-low latency transaction processing.',
            tech: 'C++20 • PMEM • eBPF',
            architecture: 'Lock-free B-link tree with persistent memory flush barriers and eBPF tracing',
            metrics: 'Sub-80ns point lookups with 99.999% availability'
          }
        ]
      },
      questionnaireData: {
        tagline: 'Zero-overhead abstractions for modern silicon.',
        bio: 'Focusing on low-level systems programming, Linux kernel interfaces, and memory safety.'
      }
    };

    const canonical = CanonicalEvidenceModel.fromRawInput(rawInput);
    const normalized = UnifiedProfileNormalizer.normalize(rawInput);

    // Build Plan 1: computational-terminal
    const plan1 = CompositionPlan.buildPlan(normalized, {
      universeId: 'futuristic-spatial',
      projectStrategy: 'terminal-session-log',
      iaGrammar: InformationArchitectureGrammars.getGrammar('COMPUTATIONAL_TERMINAL')
    });
    const rendered1 = HtmlRenderer.render(normalized, null, null, VISUAL_UNIVERSES['futuristic-spatial'], 'terminal-session-log', null, plan1);

    // Build Plan 2: swiss-editorial
    const plan2 = CompositionPlan.buildPlan(normalized, {
      universeId: 'swiss-editorial',
      projectStrategy: 'magazine-editorial-chapter',
      iaGrammar: InformationArchitectureGrammars.getGrammar('EDITORIAL_MONOGRAPH')
    });
    const rendered2 = HtmlRenderer.render(normalized, null, null, VISUAL_UNIVERSES['swiss-editorial'], 'magazine-editorial-chapter', null, plan2);

    // Both must pass evidence preservation
    const audit1 = Phase39EvidenceQualityGate.evaluatePortfolio(canonical, rendered1);
    const audit2 = Phase39EvidenceQualityGate.evaluatePortfolio(canonical, rendered2);

    assert.ok(audit1.passed);
    assert.ok(audit2.passed);

    // Verify structural divergence in how architecture is rendered
    // In terminal: terminal console / cli style
    assert.ok(rendered1.html.includes('presentation-terminal-log') || rendered1.html.includes('SYS_ARCH'));
    // In editorial monograph: chapter / magazine narrative style
    assert.ok(rendered2.html.includes('presentation-magazine-chapters') || rendered2.html.includes('System Architecture'));
  });

  test('4. 100-Portfolio Evidence Preservation Benchmark: >= 98% Field Retention Across Corpus', () => {
    const roles = [
      'Principal Distributed Systems Architect',
      'AI / ML Research Scientist',
      'Full-Stack Software Engineer',
      'Creative Developer & 3D WebGL Artist',
      'Cybersecurity & Network Systems Lead'
    ];

    let totalPortfolios = 100;
    let passedCount = 0;
    let sumVerifiedRetention = 0;
    let sumUserProvidedRetention = 0;

    for (let i = 0; i < totalPortfolios; i++) {
      const role = roles[i % roles.length];
      const rawInput = {
        githubData: {
          name: `Developer Specimen ${i + 1}`,
          username: `dev_${i + 1}`,
          bio: `Specialist working in ${role}. Focused on verifiable engineering outputs.`,
          projects: [
            {
              name: `SystemEngine_${i + 1}`,
              desc: `High-assurance production platform designed for ${role}.`,
              tech: 'Rust • TypeScript • Distributed Sync',
              architecture: `Asynchronous actor architecture with deterministic event store #${i + 1}`,
              metrics: `${(i + 1) * 10}k req/sec, p99 < ${Math.max(1, 10 - (i % 8))}ms`,
              live: `https://engine${i + 1}.system.internal`,
              github: `https://github.com/developer/engine_${i + 1}`
            },
            {
              name: `TelemetryKit_${i + 1}`,
              desc: `Real-time observability instrumentation framework.`,
              tech: 'Go • eBPF • OpenTelemetry',
              architecture: `Zero-overhead kernel probe collector with ring-buffer dispatch`,
              metrics: `Overhead < 0.4% CPU`,
              live: `https://telemetry${i + 1}.internal`,
              github: `https://github.com/developer/telemetry_${i + 1}`
            }
          ]
        },
        questionnaireData: {
          tagline: `Pioneering resilient infrastructure #${i + 1}.`,
          bio: `Dedicated engineer with continuous production experience delivering verifiable software.`,
          experience: [
            {
              role: `Lead Architect #${i + 1}`,
              company: `CoreTech Systems ${i + 1}`,
              period: '2022 - Present',
              desc: `Directing core systems engineering and scale.`,
              responsibilities: [`Led platform resilience initiative`, `Architected data ingestion pipeline`],
              achievements: [`Delivered 99.999% uptime`]
            }
          ],
          education: [
            {
              degree: 'B.S. in Computer Science',
              school: 'University of California, Berkeley',
              period: '2018 - 2022',
              coursework: ['Operating Systems', 'Database Architecture']
            }
          ],
          research: i % 2 === 0 ? [
            {
              title: `Formal Verification of Distributed Actor State Machines #${i + 1}`,
              authors: `Dev ${i + 1}, et al.`,
              venue: 'IEEE Concurrency 2026',
              doi: `10.1109/CONCUR.${i + 1}.2026`,
              abstract: `An exploration of TLA+ specifications for decentralized consensus.`
            }
          ] : []
        }
      };

      const canonical = CanonicalEvidenceModel.fromRawInput(rawInput);
      const normalized = UnifiedProfileNormalizer.normalize(rawInput);
      const plan = CompositionPlan.buildPlan(normalized);
      const rendered = HtmlRenderer.render(normalized, null, null, VISUAL_UNIVERSES['swiss-editorial'], null, null, plan);
      const audit = Phase39EvidenceQualityGate.evaluatePortfolio(canonical, rendered);

      if (audit.passed) passedCount++;
      sumVerifiedRetention += audit.verifiedRetentionRate;
      sumUserProvidedRetention += audit.userProvidedRetentionRate;
    }

    const meanVerifiedRetention = sumVerifiedRetention / totalPortfolios;
    const meanUserProvidedRetention = sumUserProvidedRetention / totalPortfolios;

    console.log(`\n================================================================================`);
    console.log(`🏛️ PHASE 39 EVIDENCE PRESERVATION BENCHMARK RESULTS (100 PORTFOLIOS):`);
    console.log(`• Pass Rate (>= 98% retention)       : ${passedCount} / ${totalPortfolios} (${passedCount}%)`);
    console.log(`• Mean Verified Field Retention      : ${meanVerifiedRetention.toFixed(2)}% (Requirement >= 98%)`);
    console.log(`• Mean User-Provided Field Retention : ${meanUserProvidedRetention.toFixed(2)}% (Requirement >= 98%)`);
    console.log(`================================================================================\n`);

    assert.ok(meanVerifiedRetention >= 98, `Mean verified retention ${meanVerifiedRetention}% < 98%`);
    assert.ok(meanUserProvidedRetention >= 98, `Mean user-provided retention ${meanUserProvidedRetention}% < 98%`);
    assert.strictEqual(passedCount, 100, `Expected 100/100 portfolios to pass quality gate, got ${passedCount}`);
  });

});

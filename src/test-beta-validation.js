/**
 * Real-User Beta Validation & Telemetry Test Suite (Phase 25 - Step 17)
 */

const test = require('node:test');
const assert = require('node:assert');
const { ProductTelemetry, EVENT_TYPES, productTelemetry } = require('./analytics/product-events');
const { FunnelAnalyzer } = require('./analytics/funnel-analyzer');
const { FeedbackService, feedbackService } = require('./feedback/feedback-service');
const { SiteGenerator } = require('./services/site-generator');
const { PortfolioState } = require('./customizer/portfolio-state');
const { BetaReadinessGate } = require('./design-intelligence/agents/beta-readiness-gate');

test('🏛️ Phase 25: Real-User Beta Validation, Telemetry & Product Feedback', async (t) => {
  const siteGen = new SiteGenerator();

  await t.test('1. Telemetry Privacy & PII Scrubbing Invariant', () => {
    const rawPayload = {
      role: 'Staff Engineer',
      skills: 'TypeScript, Go',
      password: 'superSecretPassword123',
      api_key: 'sk_live_99998888',
      razorpay_signature: 'hmac_signature_secret',
      nested: {
        authToken: 'jwt_secret_token',
        cleanData: 'Safe metadata'
      }
    };

    const sanitized = ProductTelemetry.sanitizePayload(rawPayload);
    assert.strictEqual(sanitized.password, undefined, 'Passwords must be completely stripped');
    assert.strictEqual(sanitized.api_key, undefined, 'API keys must be stripped');
    assert.strictEqual(sanitized.razorpay_signature, undefined, 'Payment signatures must be stripped');
    assert.strictEqual(sanitized.nested?.authToken, undefined, 'Nested auth tokens must be stripped');
    assert.strictEqual(sanitized.nested?.cleanData, 'Safe metadata', 'Safe metadata must be preserved');

    const event = productTelemetry.recordEvent(EVENT_TYPES.GENERATION_STARTED, 'user_123', rawPayload, 15);
    assert.ok(event.anonymousId.startsWith('anon_'), 'User ID must be hashed to anonymous string');
  });

  await t.test('2. Funnel Analyzer conversion & abandonment computation', () => {
    // Empty events test -> INSUFFICIENT DATA
    const emptyMetrics = FunnelAnalyzer.analyzeFunnel([]);
    assert.strictEqual(emptyMetrics.status, 'INSUFFICIENT DATA');

    // Simulate complete user journey
    const testEvents = [
      { event: EVENT_TYPES.GENERATION_STARTED },
      { event: EVENT_TYPES.GENERATION_COMPLETED },
      { event: EVENT_TYPES.PREVIEW_OPENED },
      { event: EVENT_TYPES.CUSTOMIZER_OPENED },
      { event: EVENT_TYPES.PORTFOLIO_SAVED },
      { event: EVENT_TYPES.EXPORT_STARTED },
      { event: EVENT_TYPES.EXPORT_COMPLETED }
    ];

    const funnel = FunnelAnalyzer.analyzeFunnel(testEvents);
    assert.strictEqual(funnel.counts.completed, 1);
    assert.strictEqual(funnel.generationSuccessRate, '100.0%');
    assert.strictEqual(funnel.exportSuccessRate, '100.0%');
  });

  await t.test('3. Feedback Service ratings and quality disagreement detection', () => {
    feedbackService.clear();

    feedbackService.submitFeedback({
      rating: 'POSITIVE',
      comments: 'Loved the visual universe and animations!',
      generationId: 'gen_001',
      qualityScore: 98
    });

    feedbackService.submitFeedback({
      rating: 'NEGATIVE',
      comments: 'Prefers warmer colors.',
      generationId: 'gen_002',
      qualityScore: 95
    });

    const summary = feedbackService.getSummary();
    assert.strictEqual(summary.sampleSize, 2);
    assert.strictEqual(summary.positiveCount, 1);
    assert.strictEqual(summary.negativeCount, 1);
    assert.strictEqual(summary.disagreements.length, 1, 'High quality score + negative rating must be flagged as disagreement');
  });

  await t.test('4. Real GitHub edge cases & graceful content degradation', async () => {
    const EDGE_CASES = [
      {
        name: 'Empty Projects Profile',
        data: { name: 'Alex Nova', role: 'Systems Analyst', tagline: 'Observability & Metrics', projects: [] }
      },
      {
        name: 'Single Project Profile',
        data: { name: 'Elena Rostova', role: 'Rust Developer', projects: [{ name: 'SoloKernel', desc: 'Microkernel', tech: 'Rust' }] }
      },
      {
        name: 'Unicode & International Profile',
        data: { name: '田中 太郎 (Tarō Tanaka)', role: 'フルスタックエンジニア', tagline: 'ハイパフォーマンスなWebアプリケーション開発', projects: [{ name: 'プロジ 1', desc: '分散システム', tech: 'Go • TypeScript' }] }
      },
      {
        name: '50+ Massive Projects Profile',
        data: {
          name: 'Marcus Vance',
          role: 'Kernel Architect',
          projects: Array.from({ length: 50 }, (_, i) => ({ name: `Project ${i + 1}`, desc: `Kernel subsystem ${i + 1}`, tech: 'C • eBPF' }))
        }
      },
      {
        name: 'Ultra-Long Biography Profile',
        data: {
          name: 'Sarah Connor',
          role: 'Security Engineer',
          bio: 'A'.repeat(1500),
          tagline: 'Defending distributed nodes across multiple global datacenters with hardware security modules and zero-trust verification.',
          projects: [{ name: 'ShieldNet', desc: 'Encrypted mesh', tech: 'Rust' }]
        }
      }
    ];

    for (const ec of EDGE_CASES) {
      const site = await siteGen.generateSite({ id: 'edge-test' }, ec.data);
      assert.ok(site.html.length > 500, `${ec.name}: Generated HTML must not be empty`);
      assert.ok(site.html.includes('<!DOCTYPE html>'), `${ec.name}: Must have valid DOCTYPE`);
      const bodyText = site.html.replace(/<script[\s\S]*?<\/script>/gi, '');
      assert.strictEqual(bodyText.includes('>undefined<') || bodyText.includes(' undefined '), false, `${ec.name}: Found undefined in HTML body text`);
      assert.strictEqual(bodyText.includes('>null<') || bodyText.includes(' null '), false, `${ec.name}: Found null in HTML body text`);
      assert.strictEqual(bodyText.includes('[object Object]'), false, `${ec.name}: Found [object Object] in HTML body text`);
    }
  });

  await t.test('5. Real Wall-Clock Performance & Concurrency Latency Benchmark', async () => {
    const sampleUser = {
      name: 'Dr. Evelyn Ward',
      role: 'Principal CS Researcher',
      tagline: 'Formal verification of distributed consensus protocols.',
      skills: 'TLA+, Coq, Rust',
      projects: [{ name: 'ConsensusVerify', desc: 'Symbolic model checker', tech: 'TLA+ • Python' }]
    };

    // 10 Sequential Runs
    const seqTimes10 = [];
    for (let i = 0; i < 10; i++) {
      const t0 = performance.now();
      await siteGen.generateSite({ id: `seq-10-${i}` }, sampleUser);
      seqTimes10.push(performance.now() - t0);
    }

    // 50 Sequential Runs
    const seqTimes50 = [];
    for (let i = 0; i < 50; i++) {
      const t0 = performance.now();
      await siteGen.generateSite({ id: `seq-50-${i}` }, sampleUser);
      seqTimes50.push(performance.now() - t0);
    }

    // 10 Concurrent Runs
    const t0Conc10 = performance.now();
    await Promise.all(Array.from({ length: 10 }, (_, i) => siteGen.generateSite({ id: `conc-10-${i}` }, sampleUser)));
    const concTime10 = performance.now() - t0Conc10;

    // 50 Concurrent Runs
    const t0Conc50 = performance.now();
    await Promise.all(Array.from({ length: 50 }, (_, i) => siteGen.generateSite({ id: `conc-50-${i}` }, sampleUser)));
    const concTime50 = performance.now() - t0Conc50;

    const calcStats = (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const sum = sorted.reduce((a, b) => a + b, 0);
      return {
        min: sorted[0].toFixed(2),
        max: sorted[sorted.length - 1].toFixed(2),
        avg: (sum / sorted.length).toFixed(2),
        median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
        p95: sorted[Math.floor(sorted.length * 0.95)].toFixed(2),
        p99: sorted[Math.floor(sorted.length * 0.99)].toFixed(2)
      };
    };

    const stats50 = calcStats(seqTimes50);

    console.log(`\n================================================================================`);
    console.log(`🏛️ PHASE 25: REAL WALL-CLOCK PERFORMANCE BENCHMARK RESULTS:`);
    console.log(`================================================================================`);
    console.log(`• 10 Sequential Runs Latency (Avg)   : ${calcStats(seqTimes10).avg}ms`);
    console.log(`• 50 Sequential Runs Latency (Avg)   : ${stats50.avg}ms`);
    console.log(`• 50 Sequential P95 Latency          : ${stats50.p95}ms`);
    console.log(`• 50 Sequential P99 Latency          : ${stats50.p99}ms`);
    console.log(`• 10 Concurrent Runs (Total Wall)    : ${concTime10.toFixed(2)}ms (Avg: ${(concTime10 / 10).toFixed(2)}ms/site)`);
    console.log(`• 50 Concurrent Runs (Total Wall)    : ${concTime50.toFixed(2)}ms (Avg: ${(concTime50 / 50).toFixed(2)}ms/site)`);
    console.log(`================================================================================\n`);

    assert.ok(Number(stats50.avg) < 50.0, `Average generation must be under 50ms, got ${stats50.avg}ms`);
  });

  await t.test('6. Final Beta Readiness Gate Verification', async () => {
    const sampleUser = {
      name: 'Maya Lin',
      role: 'Creative Developer & 3D Artist',
      tagline: 'Algorithmic WebGL shaders and spatial kinetic typography.',
      skills: 'Three.js, WebGL2, GLSL',
      projects: [{ name: 'Elysium Runway', desc: '3D runway', tech: 'Three.js • GLSL' }]
    };

    const site = await siteGen.generateSite({ id: 'beta-gate-sample' }, sampleUser);
    const state = new PortfolioState(site);

    const betaReport = await BetaReadinessGate.evaluate({ sampleSite: site, sampleState: state });
    assert.ok(betaReport.ready, `Beta Readiness Gate must pass: ${betaReport.blockers.join('; ')}`);
    assert.ok(betaReport.score >= 85, `Score must be >= 85, got ${betaReport.score}`);
  });
});

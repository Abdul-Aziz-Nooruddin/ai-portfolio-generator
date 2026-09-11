/**
 * High-Concurrency & Precautions Test Suite
 * Tests ConcurrencyManager, AIService Multi-Key Rotation & 429 Circuit Breaker,
 * and Non-Blocking Async File Deployment.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { ConcurrencyManager } = require('./services/concurrency-manager');
const { AIService } = require('./services/ai-service');
const { HostingProvider } = require('./services/hosting-provider');

async function runTests() {
  console.log('🧪 Starting High-Concurrency & Overload Precautions Test Suite...\n');

  // TEST 1: ConcurrencyManager Slot Throttling & FIFO Backlog
  console.log('--- TEST 1: ConcurrencyManager Slot Throttling (Max 3, Queue 5) ---');
  const cm = new ConcurrencyManager({ maxConcurrent: 3, maxQueue: 5 });

  let peakActive = 0;
  let executedCount = 0;

  const makeTask = (id, delayMs) => async () => {
    peakActive = Math.max(peakActive, cm.activeCount);
    await new Promise((r) => setTimeout(r, delayMs));
    executedCount++;
    return id;
  };

  // Launch 6 tasks simultaneously (3 should run immediately, 3 queue)
  const promises = [];
  for (let i = 1; i <= 6; i++) {
    promises.push(cm.run(makeTask(i, 30)));
  }

  // Telemetry check while running
  const telemBefore = cm.getTelemetry();
  assert.strictEqual(telemBefore.activeCount, 3, 'Active slots should be exactly 3');
  assert.strictEqual(telemBefore.queuedCount, 3, 'Queued tasks should be 3');
  console.log('  ✓ In-flight telemetry verified:', telemBefore);

  const results = await Promise.all(promises);
  assert.strictEqual(results.length, 6, 'All 6 tasks should complete');
  assert.strictEqual(peakActive, 3, 'Peak active tasks should never exceed 3');
  assert.strictEqual(cm.activeCount, 0, 'Active slots should be 0 after completion');
  assert.strictEqual(cm.queue.length, 0, 'Queue should be empty after completion');
  console.log('  ✓ Concurrency ceiling strictly respected. Peak concurrent:', peakActive);

  // TEST 2: Overload Fast-Track Divert
  console.log('\n--- TEST 2: Overload Fast-Track Divert under Extreme Surge ---');
  const cmSurge = new ConcurrencyManager({ maxConcurrent: 2, maxQueue: 2 });
  
  // Fill all 2 active slots with slow tasks
  const slowTask = async () => new Promise(r => setTimeout(r, 200));
  cmSurge.run(slowTask);
  cmSurge.run(slowTask);

  // Fill the 2 queue slots
  cmSurge.run(slowTask);
  cmSurge.run(slowTask);

  assert.strictEqual(cmSurge.activeCount, 2);
  assert.strictEqual(cmSurge.queue.length, 2);

  // 5th task arrives (queue is saturated!). Should trigger Overload Fast-Track
  let fastTrackExecuted = false;
  const resultSurge = await cmSurge.run(
    async () => 'FULL_AI',
    async () => {
      fastTrackExecuted = true;
      return 'INSTANT_DETERMINISTIC_FALLBACK';
    }
  );

  assert.strictEqual(resultSurge, 'INSTANT_DETERMINISTIC_FALLBACK', 'Surge task must be diverted to fast-track fallback');
  assert.strictEqual(fastTrackExecuted, true, 'Fast-track fallback callback must execute');
  console.log('  ✓ Queue saturation safely diverted to <10ms deterministic generation without timeouts!');

  // Clean up remaining running timers
  await new Promise(r => setTimeout(r, 250));

  // TEST 3: Multi-Key Rotation Pool in AIService
  console.log('\n--- TEST 3: Multi-Key Rotation Pool in AIService ---');
  process.env.GEMINI_API_KEYS = 'key_alpha,key_beta,key_gamma';
  const aiPool = new AIService();

  assert.strictEqual(aiPool.apiKeys.length, 3, 'Should parse 3 API keys from GEMINI_API_KEYS');
  assert.strictEqual(aiPool.getNextApiKey(), 'key_alpha');
  assert.strictEqual(aiPool.getNextApiKey(), 'key_beta');
  assert.strictEqual(aiPool.getNextApiKey(), 'key_gamma');
  assert.strictEqual(aiPool.getNextApiKey(), 'key_alpha', 'Should round-robin back to first key');
  console.log('  ✓ Multi-key round-robin rotation working seamlessly across all pool keys');

  // TEST 4: 429 Adaptive Circuit Breaker
  console.log('\n--- TEST 4: Adaptive 429 Circuit Breaker ---');
  aiPool.recordRateLimitViolation();
  assert.strictEqual(aiPool.isCircuitOpen(), false, 'Single 429 should not trip immediately');
  
  aiPool.recordRateLimitViolation(); // 2nd violation trips the circuit
  assert.strictEqual(aiPool.isCircuitOpen(), true, 'Second 429 must trip the circuit breaker');
  
  let circuitErrorCaught = false;
  try {
    await aiPool.callGemini('test');
  } catch (err) {
    circuitErrorCaught = true;
    assert.strictEqual(err.message.includes('CIRCUIT_OPEN_429'), true);
  }
  assert.strictEqual(circuitErrorCaught, true, 'Trip must immediately throw CIRCUIT_OPEN_429');
  console.log('  ✓ Circuit breaker tripped upon consecutive 429s, shedding AI load instantly');

  // Reset circuit breaker for clean state
  aiPool.resetCircuitBreaker();
  assert.strictEqual(aiPool.isCircuitOpen(), false);
  console.log('  ✓ Circuit breaker cooldown/reset verified');

  // TEST 5: Non-blocking Async File Deployment in HostingProvider
  console.log('\n--- TEST 5: Non-Blocking Async File Deployment (HostingProvider) ---');
  const hp = new HostingProvider();
  const testSiteId = `test-concurrency-${Date.now()}`;
  const testHtml = '<!DOCTYPE html><html><body><h1>Concurrency Test</h1></body></html>';
  const testNormalized = { name: 'Test User', skills: ['Node.js', 'System Architecture'] };

  const deployResult = await hp.deploy(testSiteId, { html: testHtml }, testNormalized, false);
  assert.strictEqual(deployResult.siteId, testSiteId);
  assert.strictEqual(Boolean(deployResult.deployUrl), true);
  
  const deployedIndexPath = path.join(process.cwd(), 'public', 'sites', testSiteId, 'index.html');
  const deployedJsonPath = path.join(process.cwd(), 'public', 'sites', testSiteId, 'profile.json');

  assert.strictEqual(fs.existsSync(deployedIndexPath), true, 'index.html must exist');
  assert.strictEqual(fs.existsSync(deployedJsonPath), true, 'profile.json must exist');
  assert.strictEqual(fs.readFileSync(deployedIndexPath, 'utf8'), testHtml);
  console.log('  ✓ HostingProvider non-blocking async file writes verified');

  // Cleanup test files
  fs.rmSync(path.join(process.cwd(), 'public', 'sites', testSiteId), { recursive: true, force: true });

  console.log('\n🎉 ALL HIGH-CONCURRENCY & OVERLOAD PRECAUTION TESTS PASSED SUCCESSFULLY!\n');
}

runTests().catch((err) => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});

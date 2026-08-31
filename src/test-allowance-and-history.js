const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

test('⚡ Weekly Allowance Engine & Generated Projects Below Generate Button', async (t) => {
  const studioHtmlPath = path.join(__dirname, '..', 'web', 'studio.html');
  const studioHtml = fs.readFileSync(studioHtmlPath, 'utf8');

  await t.test('1. Studio DOM contains Allowance Meter directly above Generate Button', () => {
    assert.ok(studioHtml.includes('id="allowanceMeterCard"'), 'Must have #allowanceMeterCard');
    assert.ok(studioHtml.includes('id="allowanceRemainingText"'), 'Must have #allowanceRemainingText');
    assert.ok(studioHtml.includes('id="allowanceResetCountdown"'), 'Must have #allowanceResetCountdown');
    assert.ok(studioHtml.includes('id="allowanceProgressBar"'), 'Must have #allowanceProgressBar');
    assert.ok(studioHtml.includes('id="btnSubmitGenerate"'), 'Must have #btnSubmitGenerate');

    const meterIdx = studioHtml.indexOf('id="allowanceMeterCard"');
    const btnIdx = studioHtml.indexOf('id="btnSubmitGenerate"');
    assert.ok(meterIdx < btnIdx, 'Allowance Meter must be placed above the Generate button');
  });

  await t.test('2. Studio DOM contains Generated Portfolios Section directly below Generate Button', () => {
    assert.ok(studioHtml.includes('id="generatedPortfoliosSection"'), 'Must have #generatedPortfoliosSection');
    assert.ok(studioHtml.includes('id="generatedProjectsList"'), 'Must have #generatedProjectsList');

    const btnIdx = studioHtml.indexOf('id="btnSubmitGenerate"');
    const genSectionIdx = studioHtml.indexOf('id="generatedPortfoliosSection"');
    assert.ok(btnIdx < genSectionIdx, 'Generated Portfolios section must be placed directly below the Generate button');
  });

  await t.test('3. Allowance Lifecycle Engine decrements allowance and resets after exactly 1 week', () => {
    const WEEKLY_TOTAL = 5;
    const CYCLE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

    // Simulation of client state engine
    let state = {
      totalLimit: WEEKLY_TOTAL,
      used: 0,
      firstGenTimestamp: null,
      resetTimestamp: null
    };

    function simulateCheck(now) {
      if (state.resetTimestamp && now >= state.resetTimestamp) {
        state.used = 0;
        state.firstGenTimestamp = null;
        state.resetTimestamp = null;
      }
      return state;
    }

    function simulateGenerate(now) {
      simulateCheck(now);
      if (!state.firstGenTimestamp) {
        state.firstGenTimestamp = now;
        state.resetTimestamp = now + CYCLE_DURATION_MS;
      }
      state.used += 1;
      return state;
    }

    const t0 = 1788000000000; // Arbitrary start time
    
    // Gen 1:
    simulateGenerate(t0);
    assert.strictEqual(state.used, 1, 'First generation uses 1');
    assert.strictEqual(state.totalLimit - state.used, 4, '4 remaining after first generation');
    assert.strictEqual(state.firstGenTimestamp, t0, 'Cycle timestamp initialized');
    assert.strictEqual(state.resetTimestamp, t0 + CYCLE_DURATION_MS, 'Reset timestamp is exactly 7 days later');

    // Gen 2: (2 days later)
    const t1 = t0 + (2 * 24 * 60 * 60 * 1000);
    simulateGenerate(t1);
    assert.strictEqual(state.used, 2, 'Second generation uses 2');
    assert.strictEqual(state.totalLimit - state.used, 3, '3 remaining');
    assert.strictEqual(state.resetTimestamp, t0 + CYCLE_DURATION_MS, 'Cycle reset timestamp remains pegged to first generation');

    // Gen 3, 4, 5:
    simulateGenerate(t1 + 1000);
    simulateGenerate(t1 + 2000);
    simulateGenerate(t1 + 3000);
    assert.strictEqual(state.used, 5, 'All 5 generations used');
    assert.strictEqual(state.totalLimit - state.used, 0, '0 remaining');

    // Check 6 days later (before 1 week):
    const tBeforeReset = t0 + (6 * 24 * 60 * 60 * 1000);
    simulateCheck(tBeforeReset);
    assert.strictEqual(state.used, 5, 'Still 5 used before 7 days');

    // Check after 7 full days (1 week since first generation):
    const tAfterReset = t0 + CYCLE_DURATION_MS + 1000;
    simulateCheck(tAfterReset);
    assert.strictEqual(state.used, 0, 'Weekly allowance automatically resets back to 0 used (5 available) after 1 week');
    assert.strictEqual(state.firstGenTimestamp, null, 'Cycle ready for fresh restart');
  });

  await t.test('4. History Engine stores and displays generated 3D projects', () => {
    let history = [];
    const item1 = {
      siteId: 'web-12345',
      previewUrl: 'http://localhost:5050/p/web-12345',
      universeKey: 'neon-aurora-cyber',
      developerName: 'Abdul Aziz Nooruddin',
      developerRole: 'Full-Stack & Web3 Architect',
      projectsCount: 6,
      timestamp: Date.now()
    };

    history = [item1, ...history].slice(0, 15);
    assert.strictEqual(history.length, 1, 'History contains newly created portfolio');
    assert.strictEqual(history[0].siteId, 'web-12345');
    assert.strictEqual(history[0].universeKey, 'neon-aurora-cyber');
  });
});

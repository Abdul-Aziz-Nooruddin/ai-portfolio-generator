/**
 * Beta Launch & Product Validation Test Suite (Phase 26 - Step 14)
 */

const test = require('node:test');
const assert = require('node:assert');
const { betaSessionManager, ERROR_CATEGORIES } = require('./analytics/beta-session-manager');
const { HumanAiDisagreementAnalyzer } = require('./analytics/human-ai-disagreement');
const { BetaDashboard } = require('./analytics/beta-dashboard');
const { feedbackService } = require('./feedback/feedback-service');
const { productTelemetry, EVENT_TYPES } = require('./analytics/product-events');

test('🏛️ Phase 26: Real Beta Launch, Access Control & Error Monitoring', async (t) => {
  await t.test('1. Beta Invite Code Access Control & Cohort Mapping', () => {
    betaSessionManager.clear();

    // Invalid code
    const invalidRes = betaSessionManager.registerBetaSession('INVALID-CODE-999');
    assert.strictEqual(invalidRes.valid, false, 'Invalid invite codes must be rejected');

    // Valid Alpha Code
    const alphaRes = betaSessionManager.registerBetaSession('ALPHA-DEV-001', 'user_alpha_1');
    assert.strictEqual(alphaRes.valid, true);
    assert.strictEqual(alphaRes.cohort, 'Cohort 1: Alpha');
    assert.ok(alphaRes.sessionId.startsWith('beta_sess_'));

    // Valid Beta Code
    const betaRes = betaSessionManager.registerBetaSession('BETA-LAUNCH-2026', 'user_beta_1');
    assert.strictEqual(betaRes.valid, true);
    assert.strictEqual(betaRes.cohort, 'Cohort 2: Beta');
  });

  await t.test('2. Categorized Error Monitoring & Path/Secret Sanitization', () => {
    betaSessionManager.clear();

    const err = betaSessionManager.logError(
      ERROR_CATEGORIES.GITHUB,
      'Failed fetching repo at /Users/abdulaziz/secret/repo?key=sk_live_12345',
      { username: 'testuser', authToken: 'secret_token_abc' }
    );

    assert.strictEqual(err.category, 'GITHUB');
    assert.strictEqual(err.message.includes('/Users/abdulaziz'), false, 'Internal file paths must be sanitized');
    assert.strictEqual(err.message.includes('sk_live_12345'), false, 'Key parameters must be scrubbed');
    assert.strictEqual(err.context.authToken, undefined, 'Auth token in context must be stripped');

    const summary = betaSessionManager.getErrorSummary();
    assert.strictEqual(summary.totalErrors, 1);
    assert.strictEqual(summary.categoryCounts.GITHUB, 1);
  });

  await t.test('3. Human vs AI Quality Disagreement Analyzer', () => {
    const mockFeedbacks = [
      {
        id: 'fb_1',
        generationId: 'gen_101',
        rating: 'NEGATIVE',
        comments: 'The dark obsidian theme was too harsh for my consulting brand.',
        qualityScore: 98
      },
      {
        id: 'fb_2',
        generationId: 'gen_102',
        rating: 'POSITIVE',
        comments: 'Loved the dense terminal layout!',
        qualityScore: 82
      },
      {
        id: 'fb_3',
        generationId: 'gen_103',
        rating: 'NEGATIVE',
        comments: 'The font was too small to read comfortably on mobile.',
        qualityScore: 95
      }
    ];

    const result = HumanAiDisagreementAnalyzer.analyzeDisagreements(mockFeedbacks);
    assert.strictEqual(result.sampleSize, 3);
    assert.ok(result.disagreementCount >= 2, 'Should identify high-AI/low-human and readability gap patterns');
    assert.ok(result.patterns.some(p => p.type === 'HIGH_AI_LOW_HUMAN'));
    assert.ok(result.patterns.some(p => p.type === 'PERCEIVED_READABILITY_GAP'));
  });

  await t.test('4. Beta Dashboard distinction between Synthetic and Real User Data', () => {
    const reportSynthetic = BetaDashboard.generateReport({ isRealUserData: false });
    assert.strictEqual(reportSynthetic.dataSource, 'SYNTHETIC / AUTOMATED TEST DATA');
    assert.strictEqual(reportSynthetic.realUserSampleSize, 0);

    const reportReal = BetaDashboard.generateReport({ isRealUserData: true });
    assert.strictEqual(reportReal.dataSource, 'REAL PRODUCTION USER DATA');
  });
});

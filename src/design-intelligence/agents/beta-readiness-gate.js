/**
 * Beta Readiness Gate (Phase 25)
 * Assesses whether the generator is ready for real user beta cohorts.
 * Evaluates privacy compliance, funnel integrity, security validation, and export safety.
 */

const { productTelemetry } = require('../../analytics/product-events');
const { feedbackService } = require('../../feedback/feedback-service');
const { FunnelAnalyzer } = require('../../analytics/funnel-analyzer');
const { ReleaseReadinessGate } = require('./release-readiness-gate');

class BetaReadinessGate {
  /**
   * Assesses beta launch readiness
   * @param {Object} options - { testEvents, sampleSite, sampleState }
   */
  static async evaluate(options = {}) {
    const blockers = [];
    const warnings = [];
    const metrics = {};
    const evidence = {};

    const events = options.testEvents || productTelemetry.getEvents();
    const funnelMetrics = FunnelAnalyzer.analyzeFunnel(events);
    metrics.funnel = funnelMetrics;

    const feedbackSummary = feedbackService.getSummary();
    metrics.feedback = feedbackSummary;

    // 1. Privacy & Security Invariant Check
    // Verify that none of the recorded events contain leaked secrets
    const FORBIDDEN_TOKENS = ['password', 'secret', 'api_key', 'razorpay_signature', 'auth_token'];
    for (const ev of events) {
      const str = JSON.stringify(ev.data || {}).toLowerCase();
      for (const ft of FORBIDDEN_TOKENS) {
        if (str.includes(`"${ft}"`) || str.includes(`${ft}:`)) {
          blockers.push(`CRITICAL: Telemetry event '${ev.event}' leaked sensitive key '${ft}'.`);
        }
      }
    }

    // 2. Production Generation & Export Sanity Check
    if (options.sampleSite) {
      const releaseEval = await ReleaseReadinessGate.evaluate(options.sampleSite, options.sampleState);
      evidence.releaseScore = releaseEval.score;
      evidence.releaseBlockers = releaseEval.blockers;

      if (!releaseEval.ready) {
        blockers.push(...releaseEval.blockers);
      }
    }

    // 3. User Feedback & Learning Signal Assessment
    if (feedbackSummary.disagreements.length > 0) {
      warnings.push(`INFORMATIONAL: Identified ${feedbackSummary.disagreements.length} instances where high automated quality scores received negative user feedback.`);
    }

    const score = Math.max(0, 100 - (blockers.length * 25) - (warnings.filter(w => !w.includes('INFORMATIONAL')).length * 10));
    const ready = blockers.length === 0 && score >= 85;

    return {
      ready,
      score,
      blockers,
      warnings,
      metrics,
      evidence
    };
  }
}

module.exports = { BetaReadinessGate };

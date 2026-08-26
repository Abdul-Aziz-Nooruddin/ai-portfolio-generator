/**
 * Beta Session & Error Monitoring Manager (Phase 26)
 * Coordinates beta access control, anonymous session tracking, and categorized error logging
 * without capturing PII, passwords, authentication tokens, API keys, or payment secrets.
 */

const crypto = require('crypto');
const { ProductTelemetry, EVENT_TYPES, productTelemetry } = require('./product-events');

const ERROR_CATEGORIES = {
  INPUT: 'INPUT',
  NETWORK: 'NETWORK',
  GITHUB: 'GITHUB',
  GENERATION: 'GENERATION',
  RENDERING: 'RENDERING',
  CUSTOMIZER: 'CUSTOMIZER',
  EXPORT: 'EXPORT',
  SECURITY: 'SECURITY',
  UNKNOWN: 'UNKNOWN'
};

class BetaSessionManager {
  constructor() {
    this.activeBetaSessions = new Map(); // sessionId -> sessionData
    this.recordedErrors = [];
    this.validInviteCodes = new Set(['BETA-LAUNCH-2026', 'ALPHA-DEV-001', 'EARLY-ACCESS-50']);
  }

  /**
   * Validates a beta invite code and creates an anonymous session
   * @param {string} inviteCode
   * @param {string} rawUserId
   * @returns {{ valid: boolean, sessionId: string, anonymousId: string, cohort: string }}
   */
  registerBetaSession(inviteCode = '', rawUserId = null) {
    const code = (inviteCode || '').trim().toUpperCase();
    if (!this.validInviteCodes.has(code)) {
      return { valid: false, reason: 'Invalid or expired beta invite code.' };
    }

    const sessionId = 'beta_sess_' + crypto.randomBytes(8).toString('hex');
    const anonymousId = ProductTelemetry.hashIdentifier(rawUserId || sessionId);
    const cohort = code.startsWith('ALPHA') ? 'Cohort 1: Alpha' : (code.includes('50') ? 'Cohort 4: Early Access' : 'Cohort 2: Beta');

    const sessionData = {
      sessionId,
      anonymousId,
      cohort,
      startedAt: Date.now(),
      stepsCompleted: ['LANDING']
    };

    this.activeBetaSessions.set(sessionId, sessionData);
    productTelemetry.recordEvent(EVENT_TYPES.USER_SIGNUP, anonymousId, { cohort, sessionId });

    return {
      valid: true,
      sessionId,
      anonymousId,
      cohort
    };
  }

  /**
   * Logs a categorized production error safely without leaking secrets
   */
  logError(category, message, context = {}) {
    const cat = ERROR_CATEGORIES[category] || ERROR_CATEGORIES.UNKNOWN;
    const sanitizedContext = ProductTelemetry.sanitizePayload(context);

    // Strip sensitive stack traces or internal paths
    const cleanMessage = String(message)
      .replace(/\/Users\/[a-zA-Z0-9_-]+\/[^\s]+/g, '[INTERNAL_PATH]')
      .replace(/key=[a-zA-Z0-9_-]+/gi, 'key=[SCRUBBED]');

    const errorEntry = {
      id: 'err_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      category: cat,
      message: cleanMessage,
      context: sanitizedContext,
      timestamp: Date.now()
    };

    this.recordedErrors.push(errorEntry);
    if (this.recordedErrors.length > 500) {
      this.recordedErrors.shift();
    }

    return errorEntry;
  }

  /**
   * Returns error summary by category
   */
  getErrorSummary() {
    const counts = {};
    for (const cat of Object.values(ERROR_CATEGORIES)) {
      counts[cat] = 0;
    }

    for (const err of this.recordedErrors) {
      if (counts[err.category] !== undefined) {
        counts[err.category]++;
      }
    }

    return {
      totalErrors: this.recordedErrors.length,
      categoryCounts: counts,
      recentErrors: this.recordedErrors.slice(-10)
    };
  }

  clear() {
    this.activeBetaSessions.clear();
    this.recordedErrors = [];
  }
}

const betaSessionManager = new BetaSessionManager();

module.exports = { BetaSessionManager, ERROR_CATEGORIES, betaSessionManager };

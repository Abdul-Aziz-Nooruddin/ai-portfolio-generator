/**
 * Product Events & Privacy-First Telemetry (Phase 25)
 * Structured product telemetry for tracking the end-to-end user journey without
 * logging PII, passwords, authentication secrets, payment tokens, or private data.
 */

const crypto = require('crypto');

const EVENT_TYPES = {
  USER_SIGNUP: 'USER_SIGNUP',
  USER_LOGIN: 'USER_LOGIN',
  GENERATION_STARTED: 'GENERATION_STARTED',
  GENERATION_COMPLETED: 'GENERATION_COMPLETED',
  GENERATION_FAILED: 'GENERATION_FAILED',
  PREVIEW_OPENED: 'PREVIEW_OPENED',
  CUSTOMIZER_OPENED: 'CUSTOMIZER_OPENED',
  SECTION_REORDERED: 'SECTION_REORDERED',
  SECTION_HIDDEN: 'SECTION_HIDDEN',
  SECTION_RESTORED: 'SECTION_RESTORED',
  THEME_CHANGED: 'THEME_CHANGED',
  TOKEN_CHANGED: 'TOKEN_CHANGED',
  UNDO_USED: 'UNDO_USED',
  REDO_USED: 'REDO_USED',
  PORTFOLIO_SAVED: 'PORTFOLIO_SAVED',
  EXPORT_STARTED: 'EXPORT_STARTED',
  EXPORT_COMPLETED: 'EXPORT_COMPLETED',
  EXPORT_FAILED: 'EXPORT_FAILED',
  FEEDBACK_SUBMITTED: 'FEEDBACK_SUBMITTED',
  REGENERATION_REQUESTED: 'REGENERATION_REQUESTED'
};

class ProductTelemetry {
  constructor() {
    this.events = [];
    this.maxEventsInMemory = 5000;
  }

  /**
   * Sanitizes payload by stripping any potential PII, passwords, tokens, secrets
   */
  static sanitizePayload(payload = {}) {
    const clean = {};
    const FORBIDDEN_KEYS = [
      'password', 'pass', 'token', 'secret', 'key', 'auth', 'cookie', 
      'authorization', 'razorpay_signature', 'apiKey', 'creditCard', 'cvv'
    ];

    for (const [k, v] of Object.entries(payload)) {
      const lower = k.toLowerCase();
      if (FORBIDDEN_KEYS.some(fk => lower.includes(fk))) {
        continue; // Scrub forbidden credentials
      }
      if (typeof v === 'string' && v.length > 200) {
        clean[k] = v.substring(0, 200) + '...'; // Avoid unbounded payload bloat
      } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        clean[k] = this.sanitizePayload(v);
      } else {
        clean[k] = v;
      }
    }
    return clean;
  }

  /**
   * Hashes an identifier to an anonymous string
   */
  static hashIdentifier(id) {
    if (!id) return 'anon_' + crypto.randomBytes(4).toString('hex');
    return 'anon_' + crypto.createHash('sha256').update(String(id)).digest('hex').substring(0, 16);
  }

  /**
   * Records a product analytics event
   */
  recordEvent(eventType, rawUserId = null, data = {}, durationMs = 0) {
    if (!EVENT_TYPES[eventType]) {
      throw new Error(`Invalid event type '${eventType}'`);
    }

    const anonymousId = ProductTelemetry.hashIdentifier(rawUserId);
    const sanitizedData = ProductTelemetry.sanitizePayload(data);

    const record = {
      event: eventType,
      timestamp: Date.now(),
      anonymousId,
      generationId: data.generationId || null,
      durationMs: Math.max(0, durationMs),
      data: sanitizedData
    };

    this.events.push(record);
    if (this.events.length > this.maxEventsInMemory) {
      this.events.shift();
    }

    return record;
  }

  /**
   * Returns recent telemetry events
   */
  getEvents() {
    return [...this.events];
  }

  /**
   * Clears telemetry in-memory buffer
   */
  clear() {
    this.events = [];
  }
}

const productTelemetry = new ProductTelemetry();

module.exports = { ProductTelemetry, EVENT_TYPES, productTelemetry };

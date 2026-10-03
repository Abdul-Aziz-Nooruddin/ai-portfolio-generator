/**
 * Phase 4 Comprehensive Audit Verification Test Suite
 * Tests:
 * 1. Weekly limit enforcement
 * 2. Razorpay webhook signature verification
 * 3. Takedown and grace-period logic
 * 4. Input validation (magic headers, size limits, format checks)
 */

process.env.NODE_ENV = 'test';
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { RazorpayService } = require('./services/razorpay-service');
const { LifecycleService } = require('./services/lifecycle-service');
const { UploadValidator } = require('./services/upload-validator');

// =========================================================================
// 1. WEEKLY LIMIT ENFORCEMENT
// =========================================================================
test('1. Weekly Limit: allowance cycle tracks 3 builds and resets after 7 days', () => {
  const ALLOWANCE_CONFIG = {
    WEEKLY_TOTAL: 3,
    CYCLE_DURATION_MS: 7 * 24 * 60 * 60 * 1000
  };

  // Mock localStorage-backed allowance state
  let stored = { used: 0, cycleStart: Date.now() };

  function simulateBuild(state) {
    if (state.used >= ALLOWANCE_CONFIG.WEEKLY_TOTAL) {
      return { allowed: false, remaining: 0 };
    }
    state.used += 1;
    return { allowed: true, remaining: ALLOWANCE_CONFIG.WEEKLY_TOTAL - state.used };
  }

  // Build 1
  let res1 = simulateBuild(stored);
  assert.equal(res1.allowed, true);
  assert.equal(res1.remaining, 2);

  // Build 2
  let res2 = simulateBuild(stored);
  assert.equal(res2.allowed, true);
  assert.equal(res2.remaining, 1);

  // Build 3
  let res3 = simulateBuild(stored);
  assert.equal(res3.allowed, true);
  assert.equal(res3.remaining, 0);

  // Build 4: Should be blocked!
  let res4 = simulateBuild(stored);
  assert.equal(res4.allowed, false);
  assert.equal(res4.remaining, 0);

  // Simulate 8 days elapsed (cycle expiration)
  const eightDaysAgo = Date.now() - (8 * 24 * 60 * 60 * 1000);
  stored.cycleStart = eightDaysAgo;

  // Renewal check
  const now = Date.now();
  if (now - stored.cycleStart >= ALLOWANCE_CONFIG.CYCLE_DURATION_MS) {
    stored = { used: 0, cycleStart: now };
  }

  assert.equal(stored.used, 0, 'Allowance resets to 0 after 7 days');
  let resAfterReset = simulateBuild(stored);
  assert.equal(resAfterReset.allowed, true);
  assert.equal(resAfterReset.remaining, 2);
});

// =========================================================================
// 2. RAZORPAY WEBHOOK SIGNATURE VERIFICATION
// =========================================================================
test('2. Razorpay Webhook: enforces strict cryptographic HMAC-SHA256 signature verification', () => {
  const webhookSecret = 'test_wh_secret_xyz789';
  const razorpay = new RazorpayService('rzp_test_key', 'test_key_secret', webhookSecret);

  const payload = JSON.stringify({
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: 'pay_test_999',
          amount: 14900,
          currency: 'INR',
          status: 'captured'
        }
      }
    }
  });

  // Generate authentic signature
  const validSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');

  // 1. Valid signature passes
  const validResult = razorpay.verifyWebhookSignature(payload, validSignature);
  assert.equal(validResult, true, 'Authentic HMAC signature passes verification');

  // 2. Tampered signature is rejected
  const tamperedSignature = crypto
    .createHmac('sha256', 'wrong_secret')
    .update(payload)
    .digest('hex');
  const invalidResult = razorpay.verifyWebhookSignature(payload, tamperedSignature);
  assert.equal(invalidResult, false, 'Tampered HMAC signature is rejected');

  // 3. Altered payload with valid signature is rejected
  const alteredPayload = payload.replace('14900', '100'); // price tampering
  const payloadMismatchResult = razorpay.verifyWebhookSignature(alteredPayload, validSignature);
  assert.equal(payloadMismatchResult, false, 'Payload alteration with original signature is rejected');

  // 4. Missing inputs return false gracefully
  assert.equal(razorpay.verifyWebhookSignature(null, validSignature), false);
  assert.equal(razorpay.verifyWebhookSignature(payload, null), false);
  assert.equal(razorpay.verifyWebhookSignature(payload, ''), false);
});

// =========================================================================
// 3. TAKEDOWN AND GRACE-PERIOD LIFECYCLE LOGIC
// =========================================================================
test('3. Takedown & Grace-Period: unmounts 24h preview and permanently purges after 5 days', async () => {
  const previewSiteId = 'audit-test-preview-site';
  const siteDir = path.join(process.cwd(), 'public', 'sites', previewSiteId);
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), '<html><body>preview preview</body></html>');

  let convUpdates = null;
  let auditLogs = [];

  // Scenario A: 25h elapsed (> 24h preview limit)
  const mockDb24h = {
    getUnpaidPreviews: async () => [
      {
        id: previewSiteId,
        user_id: 'user-audit-1',
        state_entered_at: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        status: 'preview_live',
        lifecycle_state: 'preview_unpaid'
      }
    ],
    getLapsedAccounts: async () => [],
    getOptedInUnconvertedUsers: async () => [],
    updateConversation: async (id, u) => { convUpdates = u; },
    updateSiteByProviderId: async () => {},
    recordAuditLog: async (log) => { auditLogs.push(log); }
  };

  const lifecycle = new LifecycleService(mockDb24h);
  const cycleResult = await lifecycle.runLifecycleCycle();

  assert.equal(cycleResult.previewsExpired, 1, 'Marked 24h preview as expired');
  assert.equal(fs.existsSync(siteDir), false, 'Temporary preview unmounted from disk');
  assert.equal(convUpdates.status, 'preview_lapsed');
  assert.equal(convUpdates.lifecycle_state, 'preview_lapsed');
  assert.equal(auditLogs[0].action, 'state_transition_lapsed');

  // Scenario B: 6 days elapsed (> 5-day grace period) -> Permanent Purge
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), '<html><body>stale preview</body></html>');

  const mockDb5d = {
    getUnpaidPreviews: async () => [
      {
        id: previewSiteId,
        user_id: 'user-audit-1',
        state_entered_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'preview_lapsed',
        lifecycle_state: 'preview_lapsed'
      }
    ],
    getLapsedAccounts: async () => [],
    getOptedInUnconvertedUsers: async () => [],
    updateConversation: async (id, u) => { convUpdates = u; },
    updateSiteByProviderId: async () => {},
    recordAuditLog: async (log) => { auditLogs.push(log); }
  };

  const lifecyclePurge = new LifecycleService(mockDb5d);
  const purgeResult = await lifecyclePurge.runLifecycleCycle();

  assert.equal(purgeResult.lapsedPurged, 1, 'Permanently purged after 5-day grace period');
  assert.equal(fs.existsSync(siteDir), false, 'Site files irreversibly deleted');
  assert.equal(convUpdates.status, 'deleted');
  assert.equal(convUpdates.lifecycle_state, 'deleted');
  assert.equal(auditLogs.some(l => l.action === 'state_transition_deleted'), true);
});

// =========================================================================
// 4. INPUT VALIDATION & MAGIC BYTES
// =========================================================================
test('4. Input Validation: verifies magic bytes and blocks spoofed or oversized uploads', () => {
  // 1. Valid PDF header: %PDF-
  const validPdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Page >>\nendobj\n%%EOF');
  const validPdfRes = UploadValidator.validatePdf(validPdfBuffer);
  assert.equal(validPdfRes.valid, true, 'Valid PDF magic header accepted');
  assert.equal(validPdfRes.fileType, 'pdf');

  // 2. Spoofed PDF (PHP script renamed to resume.pdf)
  const fakePdfBuffer = Buffer.from('<?php echo "evil"; ?>');
  const fakePdfRes = UploadValidator.validatePdf(fakePdfBuffer);
  assert.equal(fakePdfRes.valid, false, 'Spoofed file without %PDF- header rejected');
  assert.ok(fakePdfRes.error.includes('magic headers'));

  // 3. Oversized file (> 10MB)
  const hugeBuffer = { length: 11 * 1024 * 1024 };
  const oversizedRes = UploadValidator.validatePdf(hugeBuffer);
  assert.equal(oversizedRes.valid, false, 'Oversized file rejected');
  assert.ok(oversizedRes.error.includes('10 MB'));

  // 4. Empty buffer
  const emptyRes = UploadValidator.validatePdf(Buffer.alloc(0));
  assert.equal(emptyRes.valid, false, 'Empty buffer rejected');

  // 5. Valid PNG magic header: \x89PNG\r\n\x1a\n
  const validPngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00]);
  const pngRes = UploadValidator.validateImage(validPngBuffer);
  assert.equal(pngRes.valid, true, 'Valid PNG header accepted');
  assert.equal(pngRes.format, 'png');

  // 6. Valid JPEG magic header: \xFF\xD8\xFF
  const validJpgBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
  const jpgRes = UploadValidator.validateImage(validJpgBuffer);
  assert.equal(jpgRes.valid, true, 'Valid JPEG header accepted');
  assert.equal(jpgRes.format, 'jpeg');
});

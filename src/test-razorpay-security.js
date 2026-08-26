/**
 * Razorpay Anti-Tampering & Payment Approval Test Suite
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { RazorpayService } = require('./services/razorpay-service');
const { HostingProvider } = require('./services/hosting-provider');
const app = require('./index');

test('RazorpayService cryptographically verifies valid payment signatures', () => {
  const keySecret = 'test_secret_12345';
  const service = new RazorpayService('rzp_test_123', keySecret, 'wh_secret_123');

  const orderId = 'order_DA123456789';
  const paymentId = 'pay_XY987654321';
  const validSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const isValid = service.verifyPaymentSignature({
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: validSignature
  });

  assert.equal(isValid, true, 'Valid HMAC-SHA256 signature passes verification');

  const isInvalid = service.verifyPaymentSignature({
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: 'fake_tampered_signature_hex'
  });

  assert.equal(isInvalid, false, 'Tampered signature is rejected');
});

test('RazorpayService detects and blocks amount tampering attempts', async () => {
  const keySecret = 'test_secret_12345';
  const service = new RazorpayService('rzp_test_123', keySecret, 'wh_secret_123');

  // Stub getPayment to simulate a tampered payment of ₹1 (100 paise) instead of ₹149 (14900 paise)
  service.getPayment = async (paymentId) => ({
    id: paymentId,
    order_id: 'order_123',
    status: 'captured',
    amount: 100, // Attacker paid ₹1
    currency: 'INR',
    email: 'attacker@evil.com'
  });

  await assert.rejects(
    async () => {
      await service.verifyAndApprovePayment({
        paymentId: 'pay_tampered_1',
        orderId: 'order_123',
        expectedPlan: 'lite',
        expectedAmount: 14900 // ₹149 expected
      });
    },
    (err) => {
      assert.ok(err.message.includes('FRAUD ALERT: Payment amount tampering detected'));
      return true;
    },
    'Blocks payment where amount is lower than required plan price'
  );
});

test('RazorpayService approves verified payment with correct amount and removes watermark', async () => {
  const keySecret = 'test_secret_12345';
  const service = new RazorpayService('rzp_test_123', keySecret, 'wh_secret_123');

  // Stub getPayment to simulate valid captured payment of ₹149 (14900 paise)
  service.getPayment = async (paymentId) => ({
    id: paymentId,
    order_id: 'order_valid_123',
    status: 'captured',
    amount: 14900,
    currency: 'INR',
    email: 'alex@example.com',
    method: 'upi'
  });

  const result = await service.verifyAndApprovePayment({
    paymentId: 'pay_valid_123',
    orderId: 'order_valid_123',
    expectedPlan: 'lite',
    expectedAmount: 14900
  });

  assert.equal(result.approved, true);
  assert.equal(result.amount, 14900);
  assert.equal(result.amountRupees, 149);
  assert.equal(result.status, 'paid');
});

test('HostingProvider approveAndUnwatermark strips preview watermarks and banners', async () => {
  const hosting = new HostingProvider();
  const testSiteId = `test-unwatermark-${Date.now()}`;
  const siteDir = path.join(process.cwd(), 'public', 'sites', testSiteId);
  fs.mkdirSync(siteDir, { recursive: true });

  const watermarkedHtml = `<!DOCTYPE html>
<html>
<head><title>Test Watermark</title></head>
<body>
  <!-- DIAGONAL FRAMED BOX WATERMARK WITH SURROUNDING BOT USERNAME -->
  <div id="preview-watermark-overlay">
    <div class="watermark-main-title">PREVIEW ONLY</div>
  </div>
  <!-- FLOATING BOTTOM CONVERSION & UNLOCK BAR -->
  <div id="preview-floating-bar">
    <a href="/subscribe">Buy Subscription & Remove Watermark</a>
  </div>
  <h1>Alex Developer Portfolio</h1>
  <script>function updateWatermarkLuminance(){}</script>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), watermarkedHtml, 'utf8');

  // Unwatermark
  const res = await hosting.approveAndUnwatermark(testSiteId);
  assert.ok(res.deployUrl);

  const cleanHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  assert.ok(!cleanHtml.includes('preview-watermark-overlay'), 'Watermark overlay removed');
  assert.ok(!cleanHtml.includes('PREVIEW ONLY'), 'PREVIEW ONLY stamp removed');
  assert.ok(!cleanHtml.includes('preview-floating-bar'), 'Floating bar removed');
  assert.ok(cleanHtml.includes('Alex Developer Portfolio'), 'Original portfolio content preserved');

  // Cleanup
  fs.rmSync(siteDir, { recursive: true, force: true });
});

test('POST /api/web/verify-payment verifies payment and unwatermarks site', async () => {
  const testSiteId = `test-api-verify-${Date.now()}`;
  const siteDir = path.join(process.cwd(), 'public', 'sites', testSiteId);
  fs.mkdirSync(siteDir, { recursive: true });

  const watermarkedHtml = `<!DOCTYPE html>
<html>
<body>
  <div id="preview-watermark-overlay"><div class="watermark-main-title">PREVIEW ONLY</div></div>
  <h1>Verified Paid User</h1>
</body>
</html>`;
  fs.writeFileSync(path.join(siteDir, 'index.html'), watermarkedHtml, 'utf8');

  const routes = app._router.stack.filter(r => r.route && r.route.path === '/api/web/verify-payment');
  assert.ok(routes.length > 0, 'Route /api/web/verify-payment exists');
  const endpointHandler = routes[0].route.stack[routes[0].route.stack.length - 1].handle;

  const res = await new Promise((resolve) => {
    const req = {
      body: {
        razorpay_payment_id: 'pay_mock_verified_123',
        razorpay_order_id: 'order_mock_verified_123',
        siteId: testSiteId,
        plan: 'lite'
      }
    };
    const responseObj = {
      statusCode: 200,
      json(data) { resolve({ status: 200, data }); },
      status(c) { this.statusCode = c; return this; }
    };
    endpointHandler(req, responseObj);
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.approved, true);

  const cleanHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  assert.ok(!cleanHtml.includes('PREVIEW ONLY'), 'Watermark stripped on payment approval');

  // Cleanup
  fs.rmSync(siteDir, { recursive: true, force: true });
});

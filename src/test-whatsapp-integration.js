/**
 * Meta WhatsApp Cloud API Integration Test Suite
 * Tests webhook handshake, HMAC verification, message parsing, and generation triggers.
 */

const assert = require('assert');
const crypto = require('crypto');
const { WhatsAppService } = require('./services/whatsapp-service');
const { WhatsAppHandler } = require('./handlers/whatsapp-handler');

async function runTests() {
  console.log('🧪 Starting Meta WhatsApp Cloud API Test Suite...\n');

  // TEST 1: Webhook Handshake Verification
  console.log('--- TEST 1: Webhook Handshake Verification ---');
  const service = new WhatsAppService({
    verifyToken: 'myfolio_test_token_123',
    appSecret: 'test_secret_abc'
  });

  const validChallenge = service.verifyWebhookChallenge('subscribe', 'myfolio_test_token_123', 'challenge_987654');
  assert.strictEqual(validChallenge, 'challenge_987654', 'Valid token must return challenge string');

  const invalidToken = service.verifyWebhookChallenge('subscribe', 'wrong_token', 'challenge_987654');
  assert.strictEqual(invalidToken, null, 'Invalid token must return null');

  const invalidMode = service.verifyWebhookChallenge('unsubscribe', 'myfolio_test_token_123', 'challenge_987654');
  assert.strictEqual(invalidMode, null, 'Invalid mode must return null');
  console.log('  ✓ Webhook handshake challenge verification verified');

  // TEST 2: HMAC-SHA256 Signature Verification
  console.log('\n--- TEST 2: HMAC-SHA256 Payload Signature Verification ---');
  const rawBody = JSON.stringify({ test: 'payload_content' });
  const validHmac = crypto.createHmac('sha256', 'test_secret_abc').update(rawBody).digest('hex');
  const validHeader = `sha256=${validHmac}`;

  assert.strictEqual(service.verifySignature(rawBody, validHeader), true, 'Valid signature must pass');
  assert.strictEqual(service.verifySignature(rawBody, 'sha256=invalid_hash_value'), false, 'Corrupted signature must fail');
  console.log('  ✓ X-Hub-Signature-256 HMAC authentication verified');

  // TEST 3: Phone Number Normalization
  console.log('\n--- TEST 3: Phone Number Normalization ---');
  assert.strictEqual(service.normalizePhoneNumber('+91 98765-43210'), '919876543210');
  assert.strictEqual(service.normalizePhoneNumber('+(1) 415-555-2671'), '14155552671');
  console.log('  ✓ International phone number normalization verified');

  // TEST 4: Outbound Mock Dispatch & Inbound Event Routing
  console.log('\n--- TEST 4: Inbound Event Routing & Deduplication ---');
  const dispatchedMessages = [];
  const mockService = {
    sendTextMessage: async (to, text) => {
      dispatchedMessages.push({ to, text });
      return { success: true, messageId: `msg_${Date.now()}` };
    },
    downloadMedia: async (mediaId) => ({
      buffer: Buffer.from('%PDF-1.4 Mock PDF Content'),
      mimeType: 'application/pdf',
      fileSize: 100
    })
  };

  const handler = new WhatsAppHandler({
    whatsAppService: mockService,
    aiService: null,
    dbService: null,
    hostingProvider: null
  });

  // A. Help message
  const helpPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        field: 'messages',
        value: {
          contacts: [{ profile: { name: 'Arjun' }, wa_id: '919876500001' }],
          messages: [{
            from: '919876500001',
            id: 'wamid.HBgTEST001',
            timestamp: '1726000000',
            text: { body: 'hi' },
            type: 'text'
          }]
        }
      }]
    }]
  };

  await handler.handleWebhookEvent(helpPayload);
  assert.strictEqual(dispatchedMessages.length, 1);
  assert.strictEqual(dispatchedMessages[0].to, '919876500001');
  assert.strictEqual(dispatchedMessages[0].text.includes('Welcome to MyFolio 3D'), true);
  console.log('  ✓ Inbound "hi" command accurately triggers welcome response');

  // B. Message Deduplication Check (Same messageId resent by Meta)
  await handler.handleWebhookEvent(helpPayload);
  assert.strictEqual(dispatchedMessages.length, 1, 'Duplicate messageId must not trigger duplicate replies');
  console.log('  ✓ Message deduplication cache prevents double-processing');

  // C. GitHub Handle Detection
  dispatchedMessages.length = 0;
  const ghPayload = {
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        field: 'messages',
        value: {
          contacts: [{ profile: { name: 'Dev' }, wa_id: '919876500002' }],
          messages: [{
            from: '919876500002',
            id: 'wamid.HBgTEST002',
            timestamp: '1726000001',
            text: { body: 'github.com/torvalds' },
            type: 'text'
          }]
        }
      }]
    }]
  };

  // We spy on generatePortfolioFromGitHub
  let githubGenerated = false;
  handler.generatePortfolioFromGitHub = async (to, name, username) => {
    githubGenerated = true;
    assert.strictEqual(username, 'torvalds');
    assert.strictEqual(to, '919876500002');
    return { siteId: 'wa-torvalds-123', liveUrl: 'https://myfolio.tech/p/wa-torvalds-123' };
  };

  await handler.handleWebhookEvent(ghPayload);
  assert.strictEqual(githubGenerated, true, 'GitHub URL must trigger portfolio generation pipeline');
  console.log('  ✓ GitHub profile URL parsed and routed to portfolio generator');

  // D. Document (PDF Resume) Detection
  let resumeGenerated = false;
  handler.handleResumeUpload = async (to, name, doc) => {
    resumeGenerated = true;
    assert.strictEqual(doc.id, 'media_doc_999');
    assert.strictEqual(to, '919876500003');
  };

  const resumePayload = {
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        field: 'messages',
        value: {
          contacts: [{ profile: { name: 'Sarah' }, wa_id: '919876500003' }],
          messages: [{
            from: '919876500003',
            id: 'wamid.HBgTEST003',
            timestamp: '1726000002',
            type: 'document',
            document: {
              id: 'media_doc_999',
              filename: 'Sarah_Resume.pdf',
              mime_type: 'application/pdf'
            }
          }]
        }
      }]
    }]
  };

  await handler.handleWebhookEvent(resumePayload);
  assert.strictEqual(resumeGenerated, true, 'PDF document attachment must trigger resume synthesis');
  console.log('  ✓ PDF resume attachment correctly identified and routed');

  console.log('\n🎉 ALL META WHATSAPP CLOUD API INTEGRATION TESTS PASSED!\n');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

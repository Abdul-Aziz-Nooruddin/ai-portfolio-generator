/**
 * Lifecycle Automation, State Machine, Email Automation & Rate Limit Tests
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { LifecycleService, LIFECYCLE_STATES } = require('./services/lifecycle-service');
const { EmailService } = require('./services/email-service');
const { DatabaseService } = require('./services/db-service');
const { ConversationEngine, PRICING, STATES } = require('./conversation-engine');

test('Email normalization strips plus tags and lowercases', () => {
  assert.equal(DatabaseService.normalizeEmail('User+Test1@Gmail.com'), 'user@gmail.com');
  assert.equal(DatabaseService.normalizeEmail('  alex.dev+promo@company.org '), 'alex.dev@company.org');
  assert.equal(DatabaseService.normalizeEmail('john.doe@yahoo.com'), 'john.doe@yahoo.com');
});

test('LifecycleService purges unpaid preview after 2 hours', async () => {
  const testSiteId = 'test-unpaid-2hr-site';
  const siteDir = path.join(process.cwd(), 'public', 'sites', testSiteId);
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), '<html>preview</html>');

  let updatedConversation = null;
  let auditLogs = [];

  const mockDb = {
    getUnpaidPreviews: async () => [
      {
        id: testSiteId,
        user_id: 'user-2hr-001',
        state_entered_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago (> 2h)
        status: 'preview_live',
        lifecycle_state: 'preview_unpaid'
      }
    ],
    getLapsedAccounts: async () => [],
    getOptedInUnconvertedUsers: async () => [],
    updateConversation: async (id, updates) => {
      updatedConversation = { id, updates };
    },
    updateSiteByProviderId: async () => {},
    recordAuditLog: async (log) => {
      auditLogs.push(log);
    }
  };

  const lifecycle = new LifecycleService(mockDb);
  const results = await lifecycle.runLifecycleCycle();

  assert.equal(results.previewsExpired, 1);
  assert.equal(fs.existsSync(siteDir), false, 'Site directory was purged from disk');
  assert.equal(updatedConversation.updates.status, 'deleted');
  assert.equal(updatedConversation.updates.lifecycle_state, 'deleted');
  assert.equal(auditLogs.length, 1);
  assert.equal(auditLogs[0].action, 'state_transition_deleted');
});

test('LifecycleService sends grace reminders and purges after 5 days unpaid', async () => {
  const testSiteId = 'test-lapsed-5day-site';
  const siteDir = path.join(process.cwd(), 'public', 'sites', testSiteId);
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), '<html>lapsed</html>');

  let sentEmails = [];
  const mockEmail = {
    sendGraceReminderEmail: async (to, data) => {
      sentEmails.push({ to, milestone: data.milestone });
    },
    sendDeletionConfirmation: async (to, data) => {
      sentEmails.push({ to, milestone: 'deletion' });
    }
  };

  const mockDb = {
    getUnpaidPreviews: async () => [],
    getLapsedAccounts: async () => [
      {
        id: testSiteId,
        user_id: 'user-lapsed-001',
        state_entered_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago (> 5d)
        status: 'preview_lapsed',
        lifecycle_state: 'preview_lapsed',
        users: { email: 'subscriber@example.com' },
        extracted_data: { name: 'Alex' }
      }
    ],
    getOptedInUnconvertedUsers: async () => [],
    updateConversation: async () => {},
    updateSiteByProviderId: async () => {},
    recordAuditLog: async () => {}
  };

  const lifecycle = new LifecycleService(mockDb, mockEmail);
  const results = await lifecycle.runLifecycleCycle();

  assert.equal(results.lapsedPurged, 1);
  assert.equal(fs.existsSync(siteDir), false, 'Lapsed site purged after 5 days');
  assert.equal(sentEmails.some(e => e.milestone === 'deletion'), true);
});

test('LifecycleService admin manual overrides work and record audit trail', async () => {
  let updatedConv = null;
  let auditRecord = null;

  const mockDb = {
    getConversation: async (userId) => ({
      id: 'conv-override-1',
      user_id: userId,
      status: 'preview_lapsed',
      lifecycle_state: 'preview_lapsed'
    }),
    updateConversation: async (id, updates) => {
      updatedConv = { id, updates };
    },
    recordAuditLog: async (log) => {
      auditRecord = log;
    }
  };

  const lifecycle = new LifecycleService(mockDb);
  const res = await lifecycle.overrideGracePeriod('user-123', 3, 'admin-abdulaziz', 'Customer support ticket');

  assert.equal(res.success, true);
  assert.ok(updatedConv.updates.state_entered_at);
  assert.equal(auditRecord.action, 'override_grace_period');
  assert.equal(auditRecord.admin_identifier, 'admin-abdulaziz');
});

test('ConversationEngine enforces weekly limits and clean slate on reset', async () => {
  let updatedData = null;
  const mockDb = {
    checkWeeklyLimit: async (userId, maxLimit) => false, // simulate limit hit
    updateConversation: async (id, updates) => {
      updatedData = updates;
    },
    getSiteAnalytics: async () => ({ totalViews: 42, uniqueVisitors: 28, contactSubmissions: 3 })
  };

  const engine = new ConversationEngine({}, mockDb);

  // 1. Reset cleans state
  const resetRes = await engine.handleState({ id: 'c1' }, 'RESET', null);
  assert.equal(resetRes.action, 'reply');
  assert.equal(updatedData.design_brief, null);
  assert.equal(updatedData.taste_skill_dials, null);

  // 2. Weekly limit message
  const blockedRes = await engine.handleConfirmation({ id: 'c2', user_id: 'u2', phone_number: '111', branch: 'A', extracted_data: {} }, 'YES');
  assert.ok(blockedRes.message.includes('Weekly Free Preview Limit Reached'));

  // 3. Stats command
  const statsRes = await engine.handleState({ id: 'c3' }, 'STATS', null);
  assert.ok(statsRes.message.includes('42'));
  assert.ok(statsRes.message.includes('28'));
});

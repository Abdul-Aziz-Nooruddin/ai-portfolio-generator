/**
 * Lifecycle Service — Deterministic State Machine & Scheduled Automation
 * Enforces strict site lifecycles (2-hour preview takedown, 5-day lapsed grace period, permanent purge)
 * Driven by cron (Section 6) — NOT reasoning/LLM-driven.
 */

const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const LIFECYCLE_STATES = {
  PREVIEW_UNPAID: 'preview_unpaid',
  LIVE: 'live',
  PREVIEW_LAPSED: 'preview_lapsed',
  DELETED: 'deleted'
};

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000; // 24 hours free preview window
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000; // 5 days total retention before permanent deletion

class LifecycleService {
  constructor(dbService, emailService = null, notifier = null, hostingProvider = null) {
    this.db = dbService;
    this.email = emailService;
    this.notifier = notifier;
    this.hostingProvider = hostingProvider;
    this.cronTask = null;
  }

  setNotifier(notifierFn) {
    this.notifier = notifierFn;
  }

  startScheduler(cronExpression = '*/15 * * * *') {
    // Run initial sweep on startup to keep disk clean of sites older than 24 hours
    this.purgeOrphanAndExpiredDiskSites(TWENTY_FOUR_HOURS_MS);

    // Run deterministic check every 15 minutes
    this.cronTask = cron.schedule(cronExpression, async () => {
      console.log('[LIFECYCLE CRON] Running deterministic lifecycle check & disk auto-purge...');
      try {
        await this.runLifecycleCycle();
        this.purgeOrphanAndExpiredDiskSites(TWENTY_FOUR_HOURS_MS);
      } catch (err) {
        console.error('[LIFECYCLE CRON ERROR]:', err);
      }
    });
    console.log(`[LIFECYCLE] Scheduler & Auto-Purge Sweeper started (Cron: ${cronExpression})`);
  }

  /**
   * Ephemeral Auto-Purge Sweeper
   * Automatically deletes expired preview sites from public/sites/ older than maxAgeMs (default 24 hours)
   */
  purgeOrphanAndExpiredDiskSites(maxAgeMs = TWENTY_FOUR_HOURS_MS) {
    const sitesRoot = path.join(process.cwd(), 'public', 'sites');
    if (!fs.existsSync(sitesRoot)) return { purgedCount: 0 };

    let purgedCount = 0;
    const now = Date.now();

    try {
      const entries = fs.readdirSync(sitesRoot, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const dirPath = path.join(sitesRoot, entry.name);

        try {
          const stats = fs.statSync(dirPath);
          const ageMs = now - stats.mtimeMs;

          // If directory is older than maxAgeMs (24 hours), purge it completely
          if (ageMs >= maxAgeMs) {
            fs.rmSync(dirPath, { recursive: true, force: true });
            purgedCount++;
          }
        } catch (dirErr) {
          // Non-blocking
        }
      }

      if (purgedCount > 0) {
        console.log(`🧹 [AUTO-PURGE] Cleaned up ${purgedCount} expired preview portfolio(s) older than 24 hours from disk.`);
      }
    } catch (err) {
      console.warn('[AUTO-PURGE] Disk sweep notice:', err.message);
    }

    return { purgedCount };
  }

  stopScheduler() {
    if (this.cronTask) {
      this.cronTask.stop();
      this.cronTask = null;
    }
  }

  /**
   * Main deterministic cycle executed on every scheduled tick
   */
  async runLifecycleCycle() {
    const results = {
      previewsExpired: 0,
      lapsedRemindersSent: 0,
      lapsedPurged: 0,
      conversionEmailsSent: 0
    };

    const now = Date.now();

    // 1. Process Unpaid Previews (24-hour preview window & 5-day permanent deletion)
    const activePreviews = await this.db.getUnpaidPreviews();
    for (const item of activePreviews) {
      const enteredAt = item.state_entered_at ? new Date(item.state_entered_at).getTime() : new Date(item.created_at).getTime();
      const elapsed = now - enteredAt;

      // If older than 5 days, permanently purge entirely
      if (elapsed >= FIVE_DAYS_MS) {
        console.log(`[LIFECYCLE] Preview ${item.id} exceeded 5-day maximum retention. Permanently deleting.`);
        await this.transitionToDeleted(item, 'unpaid_preview_5day_timeout');
        results.lapsedPurged++;
      } else if (elapsed >= TWENTY_FOUR_HOURS_MS) {
        console.log(`[LIFECYCLE] Preview ${item.id} exceeded 24-hour active window. Marking lapsed.`);
        await this.transitionToLapsed(item, 'unpaid_preview_24hr_timeout');
        results.previewsExpired++;
      }
    }

    // 2. Process Lapsed Subscriptions (5-day grace period & reminders on Day 1, 3, 4.5)
    const lapsedAccounts = await this.db.getLapsedAccounts();
    for (const item of lapsedAccounts) {
      const enteredAt = item.state_entered_at ? new Date(item.state_entered_at).getTime() : new Date(item.updated_at).getTime();
      const elapsed = now - enteredAt;
      const elapsedDays = elapsed / (24 * 60 * 60 * 1000);

      const user = item.users || (item.user_id ? await this.db.getUserById(item.user_id) : null);
      const userEmail = user?.email || item.extracted_data?.email;
      const userName = item.extracted_data?.name || 'there';
      const siteUrl = item.live_url || `${process.env.HOST_URL || 'http://localhost:3000'}/p/${item.id}`;
      const retryUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/payment/retry?userId=${item.user_id}`;

      // Check for 5-day expiration
      if (elapsed >= FIVE_DAYS_MS) {
        console.log(`[LIFECYCLE] Lapsed account ${item.id} exceeded 5-day grace period. Permanently purging.`);
        await this.transitionToDeleted(item, 'lapsed_5day_timeout');
        if (this.email && userEmail) {
          await this.email.sendDeletionConfirmation(userEmail, { userId: item.user_id, name: userName });
        }
        results.lapsedPurged++;
        continue;
      }

      // Check milestones for grace period emails
      if (this.email && userEmail) {
        if (elapsedDays >= 4.5) {
          const sent = await this.db.hasEmailBeenSent(item.user_id, 'grace_reminder_day_4_5');
          if (!sent) {
            await this.email.sendGraceReminderEmail(userEmail, {
              userId: item.user_id,
              name: userName,
              milestone: 'day_4_5',
              daysLeft: '12 hours',
              retryUrl,
              siteUrl
            });
            results.lapsedRemindersSent++;
          }
        } else if (elapsedDays >= 3.0) {
          const sent = await this.db.hasEmailBeenSent(item.user_id, 'grace_reminder_day_3');
          if (!sent) {
            await this.email.sendGraceReminderEmail(userEmail, {
              userId: item.user_id,
              name: userName,
              milestone: 'day_3',
              daysLeft: '2 days',
              retryUrl,
              siteUrl
            });
            results.lapsedRemindersSent++;
          }
        } else if (elapsedDays >= 1.0) {
          const sent = await this.db.hasEmailBeenSent(item.user_id, 'grace_reminder_day_1');
          if (!sent) {
            await this.email.sendGraceReminderEmail(userEmail, {
              userId: item.user_id,
              name: userName,
              milestone: 'day_1',
              daysLeft: '4 days',
              retryUrl,
              siteUrl
            });
            results.lapsedRemindersSent++;
          }
        }
      }
    }

    // 3. Process Conversion Sequence for Opted-in Users (Days 3, 6, 9)
    const unconvertedUsers = await this.db.getOptedInUnconvertedUsers();
    for (const user of unconvertedUsers) {
      const createdAt = new Date(user.created_at).getTime();
      const elapsedDays = (now - createdAt) / (24 * 60 * 60 * 1000);
      const userEmail = user.email;
      const userName = user.name || 'there';
      const subscribeUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/subscribe?userId=${user.id}`;

      if (!userEmail) continue;

      if (elapsedDays >= 30.0) {
        const sentMonthly = await this.db.hasEmailBeenSent(user.id, 'conversion_email_monthly');
        if (!sentMonthly) {
          await this.email.sendMonthlyReengagementEmail(userEmail, { userId: user.id, name: userName });
          results.conversionEmailsSent++;
        }
      } else if (elapsedDays >= 9.0) {
        const sent = await this.db.hasEmailBeenSent(user.id, 'conversion_email_4_day_9');
        if (!sent) {
          await this.email.sendConversionEmail4(userEmail, { userId: user.id, name: userName, subscribeUrl });
          results.conversionEmailsSent++;
        }
      } else if (elapsedDays >= 6.0) {
        const sent = await this.db.hasEmailBeenSent(user.id, 'conversion_email_3_day_6');
        if (!sent) {
          await this.email.sendConversionEmail3(userEmail, { userId: user.id, name: userName, subscribeUrl });
          results.conversionEmailsSent++;
        }
      } else if (elapsedDays >= 3.0) {
        const sent = await this.db.hasEmailBeenSent(user.id, 'conversion_email_2_day_3');
        if (!sent) {
          await this.email.sendConversionEmail2(userEmail, { userId: user.id, name: userName, subscribeUrl });
          results.conversionEmailsSent++;
        }
      }
    }

    return results;
  }

  /**
   * Transition to permanent deleted state and purge design/build artifact
   */
  async transitionToDeleted(item, reason = '') {
    const siteId = item.id;
    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);

    // Purge design & build artifact from disk, Netlify and Supabase CDN
    if (this.hostingProvider) {
      await this.hostingProvider.purge(siteId).catch(() => {});
      console.log(`[LIFECYCLE] Purged site multi-surface deployment for: ${siteId}`);
    } else {
      const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
      if (fs.existsSync(siteDir)) {
        try {
          fs.rmSync(siteDir, { recursive: true, force: true });
          console.log(`[LIFECYCLE] Purged site directory: ${siteDir}`);
        } catch (rmErr) {
          console.warn(`[LIFECYCLE] Error removing site directory ${siteDir}:`, rmErr.message);
        }
      }
    }

    // Update DB record
    await this.db.updateConversation(siteId, {
      status: 'deleted',
      lifecycle_state: LIFECYCLE_STATES.DELETED,
      design_brief: null,
      extracted_data: {},
      state_entered_at: new Date().toISOString()
    });

    try {
      await this.db.updateSiteByProviderId(siteId, {
        status: 'deleted',
        lifecycle_state: LIFECYCLE_STATES.DELETED
      });
    } catch (e) {}

    // Audit log
    await this.db.recordAuditLog({
      admin_identifier: 'system_cron',
      action: 'state_transition_deleted',
      target_user_id: item.user_id,
      reason,
      details: { siteId, previous_state: item.lifecycle_state || item.status }
    });
  }

  // =========================================================================
  // Admin Manual Overrides (Section 7)
  // =========================================================================

  async overrideGracePeriod(userId, extraDays, adminId, reason = 'Customer support request') {
    const extraMs = Number(extraDays) * 24 * 60 * 60 * 1000;
    const conversation = await this.db.getConversation(userId);
    if (!conversation) throw new Error('User conversation not found');

    const currentEntered = conversation.state_entered_at ? new Date(conversation.state_entered_at).getTime() : Date.now();
    const newEnteredAt = new Date(currentEntered + extraMs).toISOString();

    await this.db.updateConversation(conversation.id, {
      state_entered_at: newEnteredAt
    });

    await this.db.recordAuditLog({
      admin_identifier: adminId,
      action: 'override_grace_period',
      target_user_id: userId,
      reason,
      details: { extraDays, newEnteredAt }
    });

    return { success: true, message: `Grace period extended by ${extraDays} days` };
  }

  async forceRestoreAccount(userId, adminId, reason = 'Payment gateway resolution') {
    const conversation = await this.db.getConversation(userId);
    if (!conversation) throw new Error('User conversation not found');

    await this.db.updateConversation(conversation.id, {
      status: 'paid',
      lifecycle_state: LIFECYCLE_STATES.LIVE,
      state_entered_at: new Date().toISOString()
    });

    await this.db.recordAuditLog({
      admin_identifier: adminId,
      action: 'force_restore_account',
      target_user_id: userId,
      reason,
      details: { previous_state: conversation.lifecycle_state }
    });

    return { success: true, message: 'Account force restored to live state' };
  }

  async forceTakedownAccount(userId, adminId, reason = 'Terms of service violation / Chargeback') {
    const conversation = await this.db.getConversation(userId);
    if (!conversation) throw new Error('User conversation not found');

    await this.transitionToDeleted(conversation, reason);

    await this.db.recordAuditLog({
      admin_identifier: adminId,
      action: 'force_takedown_account',
      target_user_id: userId,
      reason,
      details: { siteId: conversation.id }
    });

    return { success: true, message: 'Account forced takedown completed' };
  }
}

module.exports = { LifecycleService, LIFECYCLE_STATES };

/**
 * Email Service - Two-Track Email Automation
 * Track 5a: Transactional / Lifecycle Emails (all users, no opt-in required)
 * Track 5b: Conversion / Promotional Sequence (opt-in users only)
 */

const nodemailer = require('nodemailer');

class EmailService {
  constructor(dbService = null) {
    this.db = dbService;
    this.fromEmail = process.env.FROM_EMAIL || 'Portfolio Bot <hello@devfolio.live>';
    
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      this.isConfigured = true;
    } else {
      this.transporter = null;
      this.isConfigured = false;
    }
  }

  async sendMail({ to, subject, html, text, meta = {} }) {
    if (!to || !to.includes('@')) {
      console.warn('[EMAIL] Skipped sending email: invalid or missing recipient', to);
      return { success: false, reason: 'invalid_email' };
    }

    console.log(`[EMAIL DISPATCH] To: ${to} | Subject: "${subject}" | Type: ${meta.sequence_type || 'system'}`);

    let sendSuccess = true;
    let errorMessage = null;

    if (this.isConfigured && this.transporter) {
      try {
        await this.transporter.sendMail({
          from: this.fromEmail,
          to,
          subject,
          html,
          text: text || html.replace(/<[^>]+>/g, ' ')
        });
      } catch (err) {
        console.error(`[EMAIL ERROR] Failed to send email to ${to}:`, err.message);
        sendSuccess = false;
        errorMessage = err.message;
      }
    } else {
      console.log(`[EMAIL SIMULATED (Dev Mode)] \n--- Subject: ${subject} ---\n${text || html}\n-------------------------`);
    }

    if (this.db && meta.user_id) {
      try {
        await this.db.recordEmailLog({
          user_id: meta.user_id,
          email: to,
          sequence_type: meta.sequence_type || 'transactional',
          email_index: meta.email_index || 0,
          trigger_name: meta.trigger_name || subject,
          status: sendSuccess ? 'sent' : 'failed',
          error_message: errorMessage
        });
      } catch (dbErr) {
        console.warn('[EMAIL LOG] Could not save email log:', dbErr.message);
      }
    }

    return { success: sendSuccess, error: errorMessage };
  }

  // =========================================================================
  // Track 5a: Transactional / Lifecycle Emails (No opt-in needed)
  // =========================================================================

  async sendPaymentFailedEmail(toEmail, { userId, name = 'there', plan = 'Lite', graceExpiryDate = '5 days', retryUrl = '' }) {
    const subject = `⚠️ Action Needed: Payment failed for your ${plan} portfolio subscription`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px;">
        <h2 style="color: #dc2626; margin-top: 0;">Payment Failed</h2>
        <p>Hey ${name},</p>
        <p>We were unable to process your recurring subscription renewal for your portfolio site.</p>
        <p><strong>Your site is currently in a 5-day grace period (until ${graceExpiryDate}).</strong> Your live URL remains accessible during this time, but action is required to avoid takedown and permanent deletion.</p>
        <div style="margin: 28px 0;">
          <a href="${retryUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Update Payment & Keep Site Live &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px;">If you don't renew before the 5 days end, your portfolio design and hosting will be permanently purged.</p>
      </div>
    `;
    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'payment_failed' }
    });
  }

  async sendGraceReminderEmail(toEmail, { userId, name = 'there', milestone = 'day_1', daysLeft = '4 days', retryUrl = '', siteUrl = '' }) {
    let subject = `⏳ ${daysLeft} left to keep your portfolio live`;
    let urgency = 'medium';

    if (milestone === 'day_3') {
      subject = `⚠️ 2 days left: Your portfolio is about to be deleted`;
      urgency = 'high';
    } else if (milestone === 'day_4_5') {
      subject = `🚨 FINAL NOTICE: 12 hours left before permanent portfolio deletion`;
      urgency = 'critical';
    }

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px;">
        <h2 style="color: ${urgency === 'critical' ? '#b91c1c' : '#ea580c'}; margin-top: 0;">Grace Period Notice (${daysLeft} Remaining)</h2>
        <p>Hey ${name},</p>
        <p>This is a reminder that your portfolio subscription renewal is unpaid. You currently have <strong>${daysLeft}</strong> left in your grace window.</p>
        <p>Your portfolio URL (<a href="${siteUrl}">${siteUrl}</a>) is still holding your existing design and resume links. Once this window expires, all hosted files and design data will be permanently purged.</p>
        <div style="margin: 28px 0;">
          <a href="${retryUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Reactivate Portfolio Now &rarr;</a>
        </div>
      </div>
    `;
    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: `grace_reminder_${milestone}` }
    });
  }

  async sendDeletionConfirmation(toEmail, { userId, name = 'there' }) {
    const subject = `Your portfolio site has been deleted`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px;">
        <h2 style="color: #4b5563; margin-top: 0;">Portfolio Takedown Completed</h2>
        <p>Hey ${name},</p>
        <p>As your unpaid grace period has elapsed, your portfolio website has been taken down and its design files purged from our hosting servers in accordance with our deletion policy.</p>
        <p>If you'd like a portfolio in the future, you can visit us anytime and generate a brand new site in seconds.</p>
      </div>
    `;
    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'deletion_confirmation' }
    });
  }

  async sendReactivationConfirmation(toEmail, { userId, name = 'there', siteUrl = '', plan = 'Lite' }) {
    const subject = `🎉 Your portfolio is live again!`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px;">
        <h2 style="color: #16a34a; margin-top: 0;">Reactivation Successful</h2>
        <p>Hey ${name},</p>
        <p>Your payment succeeded and your ${plan} subscription is active again!</p>
        <p>Your portfolio design and original URL have been restored seamlessly:</p>
        <p><a href="${siteUrl}" style="font-weight: 600; color: #2563eb;">${siteUrl}</a></p>
      </div>
    `;
    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'reactivation_confirmation' }
    });
  }

  // =========================================================================
  // Track 5b: Conversion / Promotional Emails (Opt-in only)
  // =========================================================================

  async sendConversionEmail1(toEmail, { userId, name = 'there', previewUrl = '', subscribeUrl = '' }) {
    const subject = "Your portfolio's alive... for 2 hours ⏳";
    const text = `Hey ${name},

Your portfolio just went live — and it looks good. Like, "did I really make this" good.

Small catch: it's on a 2-hour timer right now. Think of it as a really impatient Cinderella situation — except instead of a pumpkin, you get a 404 page.

👉 See your portfolio: ${previewUrl}

If you like what you see, lock it in before the clock runs out — then it's yours, live, for good (well, for as long as your subscription is).

Subscribe here: ${subscribeUrl}

— Devfolio AI`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px; line-height: 1.6;">
        <h2 style="color: #18181b; margin-top: 0;">Your portfolio's alive... for 2 hours ⏳</h2>
        <p>Hey ${name},</p>
        <p>Your portfolio just went live — and it looks good. Like, <em>"did I really make this"</em> good.</p>
        <p>Small catch: it's on a <strong>2-hour timer</strong> right now. Think of it as a really impatient Cinderella situation — except instead of a pumpkin, you get a 404 page.</p>
        <div style="margin: 24px 0;">
          <a href="${previewUrl}" style="background: #18181b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">👉 See Your Portfolio</a>
        </div>
        <p>If you like what you see, lock it in before the clock runs out — then it's yours, live, for good (well, for as long as your monthly subscription is).</p>
        <div style="margin: 20px 0;">
          <a href="${subscribeUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Lock In Portfolio (from ₹149/mo) &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px; margin-top: 32px;">— Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      text,
      meta: { user_id: userId, sequence_type: 'conversion', email_index: 1, trigger_name: 'conversion_email_1_immediate' }
    });
  }

  async sendConversionEmail2(toEmail, { userId, name = 'there', subscribeUrl = '' }) {
    const subject = "Still thinking about your portfolio website?";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px; line-height: 1.6;">
        <h2 style="color: #18181b; margin-top: 0;">Make your next career move stand out</h2>
        <p>Hey ${name},</p>
        <p>A personal portfolio website gets 3x more recruiter engagement than a plain PDF resume.</p>
        <p>With Devfolio, you get lightning-fast hosting, custom domain connection, and effortless live editing starting at just <strong>₹149/month</strong>.</p>
        <div style="margin: 24px 0;">
          <a href="${subscribeUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Publish Your Portfolio Site &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px;">— Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'conversion', email_index: 2, trigger_name: 'conversion_email_2_day_3' }
    });
  }

  async sendConversionEmail3(toEmail, { userId, name = 'there', subscribeUrl = '' }) {
    const subject = "Connect your custom domain in 60 seconds";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px; line-height: 1.6;">
        <h2 style="color: #18181b; margin-top: 0;">Own your digital presence</h2>
        <p>Hey ${name},</p>
        <p>Did you know you can link your own custom domain (like <code>yourname.com</code>) directly to your Devfolio site?</p>
        <p>Everything is handled automatically — SSL certificates, responsive mobile optimization, and interactive project cards.</p>
        <div style="margin: 24px 0;">
          <a href="${subscribeUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Start Your Subscription &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px;">— Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'conversion', email_index: 3, trigger_name: 'conversion_email_3_day_6' }
    });
  }

  async sendConversionEmail4(toEmail, { userId, name = 'there', subscribeUrl = '' }) {
    const subject = "Final check: Ready to launch your portfolio?";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px; line-height: 1.6;">
        <h2 style="color: #18181b; margin-top: 0;">Last check-in on your portfolio</h2>
        <p>Hey ${name},</p>
        <p>This is the final follow-up from our initial welcome series. We'd love to help you showcase your work to clients and hiring managers worldwide.</p>
        <div style="margin: 24px 0;">
          <a href="${subscribeUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Get Started Now &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px;">— Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'conversion', email_index: 4, trigger_name: 'conversion_email_4_day_9' }
    });
  }

  async sendMonthlyReengagementEmail(toEmail, { userId, name = 'there', studioUrl = '' }) {
    const subject = "Ready for a fresh portfolio update?";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181b; background: #fafafa; border-radius: 12px; line-height: 1.6;">
        <h2 style="color: #18181b; margin-top: 0;">Time to polish your portfolio?</h2>
        <p>Hey ${name},</p>
        <p>New projects, new skills, or a new role? Your portfolio is your 24/7 online resume.</p>
        <p>Remember, you can generate a fresh AI portfolio in 60 seconds with our Telegram bot or Web Studio anytime.</p>
        <div style="margin: 24px 0;">
          <a href="${studioUrl || 'https://t.me/ai_portfolio_generator_bot'}" style="background: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Generate a Fresh Preview &rarr;</a>
        </div>
        <p style="color: #71717a; font-size: 14px;">— Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'conversion_monthly', email_index: 5, trigger_name: 'conversion_email_monthly' }
    });
  }

  // =========================================================================
  // Security & Authentication Notifications (Zero Secrets / Clean Links)
  // =========================================================================

  async sendVerificationEmail(toEmail, { userId, name = 'there', verificationUrl = '' }) {
    const subject = "Verify your email address — Portfolio Bot";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #f8fafc; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin-top: 0;">Welcome to Portfolio Bot!</h2>
        <p>Hey ${name},</p>
        <p>Thank you for signing up. Please verify your email address to activate all features of your account and manage your live portfolios.</p>
        <div style="margin: 28px 0;">
          <a href="${verificationUrl}" style="background: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-block;">Verify Email Address &rarr;</a>
        </div>
        <p style="color: #94a3b8; font-size: 13px;">This verification link will expire in 24 hours. If you did not create an account, you can safely disregard this email.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 12px;">Portfolio Bot Security Team • Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'auth_verify_email' }
    });
  }

  async sendPasswordResetEmail(toEmail, { userId, name = 'there', resetUrl = '' }) {
    const subject = "Password Reset Request — Portfolio Bot";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #f8fafc; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
        <h2 style="color: #f59e0b; margin-top: 0;">Password Reset Request</h2>
        <p>Hey ${name},</p>
        <p>We received a request to reset the password for your Portfolio Bot account.</p>
        <div style="margin: 28px 0;">
          <a href="${resetUrl}" style="background: #f59e0b; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-block;">Reset My Password &rarr;</a>
        </div>
        <p style="color: #94a3b8; font-size: 13px;">This link is valid for 1 hour and can only be used once. If you did not request a password reset, please ignore this email or change your password immediately if you suspect unauthorized access.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 12px;">Portfolio Bot Security Team • Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'auth_password_reset' }
    });
  }

  async sendNewLoginAlert(toEmail, { userId, name = 'there', ip = 'Unknown', userAgent = 'Unknown Device', time = new Date().toUTCString() }) {
    const subject = "Security Alert: New Sign-in to your Portfolio Bot account";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #f8fafc; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; margin-top: 0;">Security Alert: New Sign-in</h2>
        <p>Hey ${name},</p>
        <p>Your account was recently accessed from a new device or browser:</p>
        <ul style="background: #1e293b; padding: 16px 24px; border-radius: 8px; list-style: none; color: #cbd5e1; font-size: 14px;">
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>IP Address:</strong> ${ip}</li>
          <li><strong>Device:</strong> ${userAgent}</li>
        </ul>
        <p style="color: #94a3b8; font-size: 13px;">If this was you, no action is needed. If you did not sign in, please log in immediately and use "Log out of all devices" in your Security Settings, then change your password.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 12px;">Portfolio Bot Security Team • Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'security_new_login' }
    });
  }

  async sendPasswordChangedAlert(toEmail, { userId, name = 'there', time = new Date().toUTCString() }) {
    const subject = "Security Notice: Your password was changed";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #f8fafc; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
        <h2 style="color: #10b981; margin-top: 0;">Password Changed Successfully</h2>
        <p>Hey ${name},</p>
        <p>The password for your Portfolio Bot account was successfully updated on <strong>${time}</strong>.</p>
        <p>All previous active sessions have been automatically invalidated for your security.</p>
        <p style="color: #94a3b8; font-size: 13px;">If you did not make this change, please contact support or initiate a password reset immediately.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 12px;">Portfolio Bot Security Team • Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { user_id: userId, sequence_type: 'transactional', trigger_name: 'security_password_changed' }
    });
  }

  async sendAccountDeletedAlert(toEmail, { name = 'there', time = new Date().toUTCString() }) {
    const subject = "Your Portfolio Bot account has been deleted";
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; color: #f8fafc; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
        <h2 style="color: #ef4444; margin-top: 0;">Account Deleted</h2>
        <p>Hey ${name},</p>
        <p>As requested, your Portfolio Bot account and associated session data have been permanently removed from our system on ${time}.</p>
        <p>Thank you for using Portfolio Bot. If you wish to use our services in the future, you are welcome to create a new account anytime.</p>
        <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
        <p style="color: #64748b; font-size: 12px;">Portfolio Bot Security Team • Devfolio AI</p>
      </div>
    `;

    return this.sendMail({
      to: toEmail,
      subject,
      html,
      meta: { sequence_type: 'transactional', trigger_name: 'security_account_deleted' }
    });
  }
}

module.exports = { EmailService };


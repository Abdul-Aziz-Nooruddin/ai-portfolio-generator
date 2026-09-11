/**
 * WhatsApp Inbound Message & Portfolio Generation Handler
 * Processes Meta Cloud API webhooks, parses user commands/GitHub handles/PDF resumes,
 * and delivers bespoke 3D portfolios directly in WhatsApp chat.
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { UnifiedProfileNormalizer } = require('../services/unified-profile-normalizer');
const { TemplateRegistry } = require('../templates/template-registry');
const { SiteGenerator } = require('../services/site-generator');
const { globalConcurrencyManager } = require('../services/concurrency-manager');

class WhatsAppHandler {
  constructor(dependencies = {}) {
    this.whatsAppService = dependencies.whatsAppService;
    this.aiService = dependencies.aiService;
    this.dbService = dependencies.dbService;
    this.hostingProvider = dependencies.hostingProvider;
    this.processedMessages = new Set(); // In-memory deduplication cache
  }

  /**
   * Main entry point for inbound Meta Webhook POST events
   * @param {Object} body - Parsed Meta webhook JSON body
   * @returns {Promise<{ handled: boolean, reason?: string }>}
   */
  async handleWebhookEvent(body) {
    if (body.object !== 'whatsapp_business_account' || !Array.isArray(body.entry)) {
      return { handled: false, reason: 'unrecognized_object' };
    }

    for (const entry of body.entry) {
      if (!Array.isArray(entry.changes)) continue;
      for (const change of entry.changes) {
        if (change.field !== 'messages' || !change.value) continue;

        const value = change.value;
        const messages = value.messages;
        if (!Array.isArray(messages) || messages.length === 0) continue;

        for (const msg of messages) {
          await this.processIncomingMessage(msg, value.contacts?.[0]);
        }
      }
    }

    return { handled: true };
  }

  /**
   * Processes a single inbound user message
   */
  async processIncomingMessage(msg, contact = {}) {
    const msgId = msg.id;
    if (this.processedMessages.has(msgId)) {
      return; // Deduplicate
    }
    this.processedMessages.add(msgId);
    // Keep cache bounded to 1,000 IDs
    if (this.processedMessages.size > 1000) {
      const firstKey = this.processedMessages.keys().next().value;
      this.processedMessages.delete(firstKey);
    }

    const senderPhone = msg.from;
    const senderName = contact.profile?.name || 'Developer';
    const msgType = msg.type;

    try {
      // 1. Interactive Button Reply
      if (msgType === 'interactive' && msg.interactive?.button_reply) {
        const buttonId = msg.interactive.button_reply.id;
        if (buttonId === 'action_help') {
          return this.sendHelpMessage(senderPhone, senderName);
        }
      }

      // 2. Document Attachment (PDF Resume)
      if (msgType === 'document') {
        const doc = msg.document;
        if (doc && (doc.mime_type?.includes('pdf') || doc.filename?.endsWith('.pdf'))) {
          return this.handleResumeUpload(senderPhone, senderName, doc);
        }
      }

      // 3. Text Message Processing
      if (msgType === 'text') {
        const text = (msg.text?.body || '').trim();
        return this.handleTextMessage(senderPhone, senderName, text);
      }

      // 4. Default Fallback
      return this.sendHelpMessage(senderPhone, senderName);
    } catch (err) {
      console.error('[WHATSAPP HANDLER ERROR]', err);
      if (this.whatsAppService) {
        await this.whatsAppService.sendTextMessage(
          senderPhone,
          `⚠️ An error occurred while generating your portfolio: ${err.message || 'Please try again in a few moments.'}`
        ).catch(() => {});
      }
    }
  }

  /**
   * Handles text messages: commands, GitHub URLs, or handles
   */
  async handleTextMessage(to, name, text) {
    const lower = text.toLowerCase();

    if (lower === 'hi' || lower === 'hello' || lower === 'help' || lower === 'start' || lower === 'menu') {
      return this.sendHelpMessage(to, name);
    }

    // Extract GitHub handle from text (e.g. "https://github.com/torvalds", "github.com/torvalds", or "torvalds")
    let githubHandle = null;
    const urlMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-_]+)/i);
    if (urlMatch && urlMatch[1] && !['features', 'explore', 'pricing', 'about', 'topics'].includes(urlMatch[1].toLowerCase())) {
      githubHandle = urlMatch[1];
    } else if (/^[a-zA-Z0-9-_]{1,39}$/.test(text) && !['hi', 'hello', 'help', 'start', 'test', 'yes', 'no'].includes(lower)) {
      githubHandle = text;
    }

    if (githubHandle) {
      return this.generatePortfolioFromGitHub(to, name, githubHandle);
    }

    // Unrecognized input -> Send helpful instructions
    await this.whatsAppService.sendTextMessage(
      to,
      `👋 Hi *${name}*! To generate your 3D portfolio:\n\n👉 Send your *GitHub username* (e.g. \`octocat\` or \`github.com/octocat\`)\n👉 Or attach a *PDF resume* 📄`
    );
  }

  /**
   * Generates a portfolio from a GitHub handle
   */
  async generatePortfolioFromGitHub(to, name, username) {
    if (this.whatsAppService) {
      await this.whatsAppService.sendTextMessage(
        to,
        `🚀 *Synthesizing your 3D Portfolio for @${username}...*\n\nFetching your verified repositories, top languages, and generating a bespoke 3D WebGL universe. One moment!`
      ).catch(() => {});
    }

    return globalConcurrencyManager.run(async () => {
      const { GitHubParser } = require('../services/github/github-parser');
      const { GitHubClient } = require('../services/github/github-client');
      const { GitHubNormalizer } = require('../services/github/github-normalizer');
      const { GitHubProfileSynthesizer } = require('../services/github-profile-synthesizer');

      const parsed = GitHubParser.parse(username);
      if (!parsed.valid) {
        throw new Error(`Invalid GitHub username: "${username}"`);
      }

      const ghClient = new GitHubClient();
      const rawGithub = await ghClient.fetchCompleteProfile(parsed.username);
      const normGithub = GitHubNormalizer.normalize(rawGithub);
      const synth = new GitHubProfileSynthesizer(this.aiService);
      const synthesizedGithub = await synth.synthesize(normGithub);

      const inputPayload = {
        name: synthesizedGithub.name || name,
        githubData: synthesizedGithub,
        preferences: { theme: 'auto' }
      };

      const normalized = UnifiedProfileNormalizer.normalize(inputPayload);
      const selectedTemplate = TemplateRegistry.selectTemplate(null, normalized);

      const cleanHandle = username.toLowerCase().replace(/[^a-z0-9-_]/g, '');
      const siteId = `wa-${cleanHandle}-${Date.now().toString(36)}`;
      const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
      await fs.promises.mkdir(siteDir, { recursive: true });

      const siteGen = new SiteGenerator();
      const siteResult = await siteGen.generateSite({ id: siteId, status: 'active' }, { ...normalized, templateId: selectedTemplate.id }, {
        theme: selectedTemplate.id,
        templateId: selectedTemplate.id,
        creative_mode: selectedTemplate.id
      });

      if (this.hostingProvider) {
        await this.hostingProvider.deploy(siteId, siteResult, normalized, false);
      }

      await Promise.all([
        fs.promises.writeFile(path.join(siteDir, 'index.html'), siteResult.html, 'utf8'),
        fs.promises.writeFile(path.join(siteDir, 'profile.json'), JSON.stringify(normalized, null, 2), 'utf8')
      ]);

      const liveUrl = `https://myfolio.tech/p/${siteId}`;

      const replyText = [
        `🎉 *Your 3D WebGL Portfolio is Ready!*`,
        ``,
        `🔗 *Live Portfolio:* ${liveUrl}`,
        `🎨 *Universe Theme:* ${selectedTemplate.name}`,
        `📦 *Repositories Synthesized:* ${normalized.projects?.length || 0}`,
        `⚡ *Status:* Active & Live worldwide on CDN`,
        ``,
        `_Tip: Send another GitHub username or PDF resume anytime to synthesize a new portfolio!_`
      ].join('\n');

      if (this.whatsAppService) {
        await this.whatsAppService.sendTextMessage(to, replyText, { previewUrl: true });
      }

      return { siteId, liveUrl };
    });
  }

  /**
   * Handles uploaded PDF resumes
   */
  async handleResumeUpload(to, name, doc) {
    if (this.whatsAppService) {
      await this.whatsAppService.sendTextMessage(
        to,
        `📄 *PDF Resume Received!* Analyzing your experience, technical skills, and projects with AI...`
      ).catch(() => {});
    }

    return globalConcurrencyManager.run(async () => {
      let docBuffer = null;
      if (this.whatsAppService && doc.id) {
        const downloaded = await this.whatsAppService.downloadMedia(doc.id);
        docBuffer = downloaded.buffer;
      }

      let parsedResume = null;
      if (docBuffer && this.aiService) {
        parsedResume = await this.aiService.parseResumeDocument(docBuffer, doc.mime_type || 'application/pdf');
      }

      const inputPayload = {
        name: parsedResume?.extracted_data?.name || parsedResume?.name || name,
        resumeData: parsedResume?.extracted_data || parsedResume || {},
        preferences: { theme: 'auto' }
      };

      const normalized = UnifiedProfileNormalizer.normalize(inputPayload);
      const selectedTemplate = TemplateRegistry.selectTemplate(null, normalized);

      const siteId = `wa-resume-${Date.now().toString(36)}`;
      const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
      await fs.promises.mkdir(siteDir, { recursive: true });

      const siteGen = new SiteGenerator();
      const siteResult = await siteGen.generateSite({ id: siteId, status: 'active' }, { ...normalized, templateId: selectedTemplate.id }, {
        theme: selectedTemplate.id,
        templateId: selectedTemplate.id,
        creative_mode: selectedTemplate.id
      });

      if (this.hostingProvider) {
        await this.hostingProvider.deploy(siteId, siteResult, normalized, false);
      }

      await Promise.all([
        fs.promises.writeFile(path.join(siteDir, 'index.html'), siteResult.html, 'utf8'),
        fs.promises.writeFile(path.join(siteDir, 'profile.json'), JSON.stringify(normalized, null, 2), 'utf8')
      ]);

      const liveUrl = `https://myfolio.tech/p/${siteId}`;

      const replyText = [
        `🎉 *Resume Synthesized Successfully!*`,
        ``,
        `🔗 *Live Portfolio:* ${liveUrl}`,
        `🎨 *Universe Theme:* ${selectedTemplate.name}`,
        `👤 *Name:* ${normalized.name}`,
        `🛠️ *Skills Extracted:* ${normalized.skills?.length || 0}`,
        `⚡ *Status:* Active & Live worldwide on CDN`
      ].join('\n');

      if (this.whatsAppService) {
        await this.whatsAppService.sendTextMessage(to, replyText, { previewUrl: true });
      }

      return { siteId, liveUrl };
    });
  }

  /**
   * Sends friendly instructions
   */
  async sendHelpMessage(to, name) {
    if (!this.whatsAppService) return;
    const text = [
      `👋 *Hello ${name}! Welcome to MyFolio 3D*`,
      ``,
      `I create high-end, 3D WebGL developer portfolios instantly.`,
      ``,
      `*How to get your portfolio:*`,
      `1️⃣ *Send your GitHub username* (e.g. \`torvalds\` or \`https://github.com/username\`)`,
      `2️⃣ *Or attach a PDF resume* 📄`,
      ``,
      `_Zero build tools. Zero coding. Ready in under 60 seconds._`
    ].join('\n');

    await this.whatsAppService.sendTextMessage(to, text);
  }
}

module.exports = { WhatsAppHandler };

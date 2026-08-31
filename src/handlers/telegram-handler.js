/**
 * Telegram Bot Handler
 * Manages Telegram bot interactions with debounced callback queries, inline keyboards,
 * media uploads, 3D template selection, GitHub ingestion, and step-by-step back navigation.
 */

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { GitHubGenerationPipeline } = require('../services/github-generation-pipeline');
const { TemplateRegistry } = require('../templates/template-registry');

class TelegramHandler {
  constructor(conversationEngine, aiService, botToken) {
    this.engine = conversationEngine;
    this.ai = aiService;
    this.token = botToken;
    this.bot = null;
    this.githubPipeline = new GitHubGenerationPipeline(aiService);
    this.processingLocks = new Set(); // Prevents duplicate rapid button clicks
    this.awaitingGithubInput = new Set(); // Tracks users currently prompted for GitHub handle

    if (this.token && this.token.trim() !== '') {
      this.initBot();
    } else {
      console.log('ℹ️ [TELEGRAM] TELEGRAM_BOT_TOKEN not set. Telegram bot is idle.');
    }
  }

  async sendSafe(chatId, text, options = {}) {
    if (!this.bot) return;
    try {
      return await this.bot.sendMessage(chatId, text, {
        parse_mode: 'Markdown',
        ...options
      });
    } catch (err) {
      // Fallback: strip markdown symbols if Telegram entity parser rejects URL/underscores
      const cleanText = (text || '').replace(/[*_`]/g, '');
      try {
        return await this.bot.sendMessage(chatId, cleanText, {
          ...options,
          parse_mode: undefined
        });
      } catch (fallbackErr) {
        console.error('[TELEGRAM] sendSafe failed:', fallbackErr.message);
      }
    }
  }

  initBot() {
    try {
      this.bot = new TelegramBot(this.token, {
        polling: {
          interval: 300,
          autoStart: true,
          params: { timeout: 10 }
        }
      });
      console.log('🤖 [TELEGRAM] Bot initialized with polling mode.');

      // Register notifier callback so engine can push site URLs
      this.engine.setNotifier(async (chatId, message, options = {}) => {
        try {
          const liveUrl = options.liveUrl || '';
          const buttons = [];
          if (liveUrl && !liveUrl.includes('localhost') && !liveUrl.includes('127.0.0.1')) {
            buttons.push([{ text: '🌐 Open 3D Live Portfolio', url: liveUrl }]);
          }
          buttons.push([
            { text: '💳 Subscribe & Unlock (₹149/mo)', callback_data: 'pay' }
          ]);
          buttons.push([
            { text: '✏️ Edit Details', callback_data: 'edit' },
            { text: '🔄 Regenerate Design', callback_data: 'YES' }
          ]);

          await this.sendSafe(chatId, message, {
            reply_markup: { inline_keyboard: buttons }
          });
        } catch (err) {
          console.error('[TELEGRAM] Notifier send error:', err.message);
        }
      });

      this.setupListeners();
    } catch (error) {
      console.error('❌ [TELEGRAM] Failed to start bot:', error.message);
    }
  }

  setupListeners() {
    // 1. Handle /start, /restart, /menu
    this.bot.onText(/\/start|\/restart|\/menu/, async (msg) => {
      const chatId = String(msg.chat.id);
      this.awaitingGithubInput.delete(chatId);
      const username = msg.from?.username || '';
      await this.sendWelcomeMenu(chatId, username);
    });

    // 2. Handle /templates
    this.bot.onText(/\/templates/, async (msg) => {
      const chatId = String(msg.chat.id);
      await this.sendTemplatesMenu(chatId);
    });

    // 3. Handle /github <username>
    this.bot.onText(/\/github(?:\s+(.+))?/, async (msg, match) => {
      const chatId = String(msg.chat.id);
      this.awaitingGithubInput.delete(chatId);
      const input = match[1]?.trim();
      if (!input) {
        this.awaitingGithubInput.add(chatId);
        await this.sendSafe(chatId, "🐙 **Instant GitHub Portfolio Generation**\n\nPlease provide your GitHub username or URL:\nExample: `Abdul-Aziz-Nooruddin` or `https://github.com/Abdul-Aziz-Nooruddin`");
        return;
      }
      await this.handleGitHubGeneration(chatId, input);
    });

    // 4. Handle /help
    this.bot.onText(/\/help/, async (msg) => {
      const chatId = String(msg.chat.id);
      const helpText = `🤖 **AI Portfolio Bot — Supported Commands**
      
• /start — Open the main welcome menu
• /github \`<username>\` — Instant 3D portfolio from GitHub
• /templates — Explore all 6 visual 3D design templates
• /stats — View your portfolio generation stats
• /stop — Reset and cancel current session

💡 *You can also send a PDF resume or photo scan directly into this chat!*`;
      await this.sendSafe(chatId, helpText);
    });

    // 5. Handle /stop, /cancel commands
    this.bot.onText(/\/stop|\/cancel|\/reset/, async (msg) => {
      const chatId = String(msg.chat.id);
      this.awaitingGithubInput.delete(chatId);
      try {
        await this.engine.processMessage(chatId, 'start', `stop_${Date.now()}`);
        await this.sendSafe(chatId, "🛑 **Session reset.** Type /start whenever you want to begin!");
      } catch (e) {
        await this.sendSafe(chatId, "🛑 Session reset. Type /start to begin.");
      }
    });

    this.bot.onText(/\/stats|\/analytics/, async (msg) => {
      const chatId = String(msg.chat.id);
      const username = msg.from?.username || '';
      await this.processIncoming(chatId, 'stats', `cmd_${Date.now()}`, null, username);
    });

    // 6. Handle Callback Queries (Inline button clicks)
    this.bot.on('callback_query', async (callbackQuery) => {
      const chatId = String(callbackQuery.message.chat.id);
      const data = callbackQuery.data;
      const messageId = `cb_${callbackQuery.id}`;
      const username = callbackQuery.from?.username || '';

      try {
        await this.bot.answerCallbackQuery(callbackQuery.id);
      } catch (e) {}

      // Debounce lock check
      if (this.processingLocks.has(chatId)) return;

      // Handle direct GitHub callback
      if (data === 'intake_github') {
        this.awaitingGithubInput.add(chatId);
        await this.sendSafe(chatId, "🐙 **Send your GitHub username or profile link:**\n\nExample: `Abdul-Aziz-Nooruddin` or `https://github.com/Abdul-Aziz-Nooruddin`");
        return;
      }

      // Handle direct templates callback
      if (data === 'view_templates') {
        await this.sendTemplatesMenu(chatId);
        return;
      }

      await this.processIncoming(chatId, data, messageId, null, username);
    });

    // 7. Handle Regular Messages
    this.bot.on('message', async (msg) => {
      if (msg.text && msg.text.startsWith('/')) return; // Handled by command listeners

      const chatId = String(msg.chat.id);
      const messageId = `tg_${msg.message_id}`;
      const username = msg.from?.username || '';

      // Handle PDF or document upload
      if (msg.document) {
        this.awaitingGithubInput.delete(chatId);
        await this.handleDocumentMessage(msg);
        return;
      }

      // Handle Photo upload
      if (msg.photo && msg.photo.length > 0) {
        this.awaitingGithubInput.delete(chatId);
        await this.handlePhotoMessage(msg);
        return;
      }

      if (msg.text) {
        const trimmed = msg.text.trim();

        // Check if user is in GitHub intake state or sent a GitHub handle/link
        if (
          this.awaitingGithubInput.has(chatId) ||
          /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/i.test(trimmed) ||
          trimmed.startsWith('github.com/') ||
          (trimmed.startsWith('@') && trimmed.length > 2 && !trimmed.includes(' '))
        ) {
          this.awaitingGithubInput.delete(chatId);
          await this.handleGitHubGeneration(chatId, trimmed);
          return;
        }

        await this.processIncoming(chatId, trimmed, messageId, null, username);
      }
    });

    this.bot.on('polling_error', (error) => {
      // Gracefully suppress 409 duplicate polling conflict warnings during hot reloads
      if (error.message && error.message.includes('409 Conflict')) return;
      console.warn('[TELEGRAM] Polling warning:', error.message);
    });

    this.bot.on('error', (error) => {
      console.warn('[TELEGRAM] General error:', error.message);
    });
  }

  async sendWelcomeMenu(chatId, username = '') {
    const welcomeText = `👋 **Welcome to AI Portfolio Studio!**

I build bespoke, responsive 3D developer portfolios by chatting with you here — no coding required.

🌟 **How would you like to build your portfolio?**`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '🐙 Connect GitHub (Instant)', callback_data: 'intake_github' },
          { text: '📄 Upload PDF Resume', callback_data: 'intake_resume' }
        ],
        [
          { text: '📝 Guided Chat Questions', callback_data: 'intake_manual' },
          { text: '🎨 Browse 3D Templates', callback_data: 'view_templates' }
        ]
      ]
    };

    // Reset user conversation cleanly
    await this.engine.processMessage(chatId, 'start', `init_${Date.now()}`);

    await this.sendSafe(chatId, welcomeText, {
      reply_markup: inlineKeyboard
    });
  }

  async sendTemplatesMenu(chatId) {
    const templates = TemplateRegistry.listTemplates();
    const templateList = templates.map((t, idx) => `• **${idx + 1}. ${t.name}**\n  _${t.description}_`).join('\n\n');

    const message = `🎨 **Available 3D Visual Portfolio Templates**\n\n${templateList}\n\nChoose an onboarding method above or type /start to generate!`;
    const keyboard = {
      inline_keyboard: [
        [
          { text: '🐙 Build from GitHub', callback_data: 'intake_github' },
          { text: '📄 Upload PDF Resume', callback_data: 'intake_resume' }
        ]
      ]
    };

    await this.sendSafe(chatId, message, { reply_markup: keyboard });
  }

  async handleGitHubGeneration(chatId, input) {
    await this.sendSafe(chatId, `🐙 Fetching public repositories & synthesizing 3D developer portfolio for **${input}**...`);
    try { await this.bot.sendChatAction(chatId, 'typing'); } catch (e) {}

    try {
      const result = await this.githubPipeline.generateFromGitHub(input, { mode: 'auto-cycle' });
      const hostUrl = process.env.HOST_URL || `http://localhost:${process.env.PORT || 5050}`;
      const liveUrl = `${hostUrl}/p/${result.siteId}`;

      const pData = result.profileData || result.profile || {};

      // Persist profile to DB conversation so regeneration & edits retain all GitHub evidence
      try {
        let user = await this.engine.db.getUser(chatId);
        if (!user) user = await this.engine.db.createUser(chatId);
        let conversation = await this.engine.db.getConversation(user.id);
        if (!conversation) conversation = await this.engine.db.createConversation(user.id);
        await this.engine.db.updateConversation(conversation.id, {
          extracted_data: pData,
          status: 'preview_live'
        });
      } catch (dbErr) {}

      const reply = `✨ **Your 3D Portfolio is Ready!**

👤 **Developer:** ${pData.name || input}
💼 **Role:** ${pData.role || 'Full-Stack Developer'}
🚀 **Projects Analyzed:** ${pData.projects?.length || 0} repositories

🔗 **Live Preview Link:**
${liveUrl}`;

      const buttons = [
        [{ text: '🌐 Open 3D Live Portfolio', url: liveUrl }],
        [{ text: '💳 Unlock Permanent Domain (₹149/mo)', callback_data: 'pay' }],
        [{ text: '🔄 Regenerate Design', callback_data: 'YES' }]
      ];

      await this.sendSafe(chatId, reply, {
        reply_markup: { inline_keyboard: buttons }
      });
    } catch (err) {
      console.error('[TELEGRAM] GitHub gen error:', err.message);
      await this.sendSafe(chatId, `⚠️ Could not generate portfolio from GitHub: ${err.message}\n\nPlease check the username and try again, or type /start!`);
    }
  }

  async handleDocumentMessage(msg) {
    const chatId = String(msg.chat.id);
    const doc = msg.document;
    const fileName = doc.file_name || 'resume.pdf';

    await this.sendSafe(chatId, `📄 Received **${fileName}**! Reading and extracting your information with AI...`);
    try { await this.bot.sendChatAction(chatId, 'typing'); } catch (e) {}

    try {
      const fileLink = await this.bot.getFileLink(doc.file_id);
      const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);

      let mimeType = doc.mime_type || 'application/pdf';
      if (fileName.toLowerCase().endsWith('.pdf') || mimeType.includes('octet-stream')) {
        mimeType = 'application/pdf';
      }

      const parsed = await this.ai.parseResumeDocument(buffer, mimeType);

      if (parsed && parsed.extracted_data && Object.keys(parsed.extracted_data).length > 0) {
        let user = await this.engine.db.getUser(chatId);
        if (!user) user = await this.engine.db.createUser(chatId);

        let conversation = await this.engine.db.getConversation(user.id);
        if (!conversation) conversation = await this.engine.db.createConversation(user.id);

        const branch = parsed.branch || 'A';
        await this.engine.db.updateConversation(conversation.id, {
          branch: branch,
          extracted_data: parsed.extracted_data,
          status: 'confirming_data'
        });

        const summary = this.engine.formatSummary(parsed.extracted_data, branch);
        const reply = `✨ **Resume Parsed Successfully!**\n\nHere is what I extracted for your portfolio:\n\n${summary}\n\nReady to generate your portfolio?`;

        const keyboard = {
          inline_keyboard: [
            [{ text: '🚀 Build My 3D Portfolio Now', callback_data: 'YES' }],
            [
              { text: '✏️ Edit a Field', callback_data: 'edit' },
              { text: '❌ Start Fresh', callback_data: 'NO' }
            ]
          ]
        };

        await this.sendSafe(chatId, reply, {
          reply_markup: keyboard
        });
      } else {
        const fallbackKeyboard = {
          inline_keyboard: [
            [{ text: '📝 Answer Step-by-Step', callback_data: 'intake_manual' }],
            [{ text: '🔄 Try Uploading PDF Again', callback_data: 'intake_resume' }]
          ]
        };
        await this.sendSafe(chatId, "⚠️ I couldn't extract all details from this file. Would you like to try uploading again or answer a few quick questions?", {
          reply_markup: fallbackKeyboard
        });
      }
    } catch (err) {
      console.error('[TELEGRAM] Document parse error:', err.message);
      const fallbackKeyboard = {
        inline_keyboard: [
          [{ text: '📝 Answer Step-by-Step', callback_data: 'intake_manual' }],
          [{ text: '🔄 Try Uploading PDF Again', callback_data: 'intake_resume' }]
        ]
      };
      await this.sendSafe(chatId, "⚠️ Could not read this document file. Let's continue through chat questions or try uploading another PDF!", {
        reply_markup: fallbackKeyboard
      });
    }
  }

  async handlePhotoMessage(msg) {
    const chatId = String(msg.chat.id);
    const photo = msg.photo[msg.photo.length - 1];
    try {
      const fileLink = await this.bot.getFileLink(photo.file_id);
      await this.processIncoming(chatId, '[Photo uploaded]', `img_${photo.file_id}`, fileLink);
    } catch (e) {
      await this.processIncoming(chatId, '[Photo uploaded]', `img_${Date.now()}`, null);
    }
  }

  async processIncoming(chatId, messageText, messageId, mediaUrl = null, username = null) {
    this.processingLocks.add(chatId);
    try {
      const result = await this.engine.processMessage(chatId, messageText, messageId, mediaUrl, username);

      if (result && result.action === 'reply') {
        const text = result.message;

        let keyboard = null;
        if (text.includes('Just reply with A, B, C, or D')) {
          keyboard = {
            inline_keyboard: [
              [
                { text: '💻 Developer', callback_data: 'A' },
                { text: '🛠️ Freelancer', callback_data: 'B' }
              ],
              [
                { text: '🎓 Student', callback_data: 'C' },
                { text: '💼 Professional', callback_data: 'D' }
              ]
            ]
          };
        } else if (text.includes('How would you like to provide your information?')) {
          keyboard = {
            inline_keyboard: [
              [{ text: '🐙 Connect GitHub (Instant)', callback_data: 'intake_github' }],
              [{ text: '📄 Upload PDF Resume (Auto)', callback_data: 'intake_resume' }],
              [{ text: '📝 Answer Step-by-Step', callback_data: 'intake_manual' }]
            ]
          };
        } else if (text.includes('Here\'s what I collected') || text.includes('Does everything look correct?') || text.includes('Ready to generate')) {
          keyboard = {
            inline_keyboard: [
              [{ text: '🚀 Yes, Build My 3D Portfolio!', callback_data: 'YES' }],
              [
                { text: '✏️ Edit a Field', callback_data: 'edit' },
                { text: '❌ Start Over', callback_data: 'NO' }
              ]
            ]
          };
        } else if (text.includes('Let\'s start!') || text.includes('Got it!') || text.includes('What is your') || text.includes('What\'s your') || text.includes('Tell me about') || text.includes('Moved back to previous')) {
          keyboard = {
            inline_keyboard: [
              [
                { text: '⬅️ Back', callback_data: 'BACK' },
                { text: '⏭️ Skip', callback_data: 'SKIP' }
              ]
            ]
          };
        } else if (text.toLowerCase().includes('or type skip')) {
          keyboard = {
            inline_keyboard: [
              [
                { text: '⬅️ Back', callback_data: 'BACK' },
                { text: '⏭️ Skip this step', callback_data: 'SKIP' }
              ]
            ]
          };
        }

        await this.sendSafe(chatId, text, {
          reply_markup: keyboard || undefined
        });
      }
    } catch (err) {
      console.error('[TELEGRAM] processIncoming error:', err);
      await this.sendSafe(chatId, "⚠️ Something went wrong. Please type /start to restart.");
    } finally {
      this.processingLocks.delete(chatId);
    }
  }
}

module.exports = { TelegramHandler };

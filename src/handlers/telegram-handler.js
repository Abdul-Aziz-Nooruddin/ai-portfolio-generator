/**
 * Telegram Bot Handler
 * Manages Telegram bot interactions with debounced callback queries, inline keyboards,
 * media uploads, step-by-step back navigation, and /stop commands.
 */

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

class TelegramHandler {
  constructor(conversationEngine, aiService, botToken) {
    this.engine = conversationEngine;
    this.ai = aiService;
    this.token = botToken;
    this.bot = null;
    this.processingLocks = new Set(); // Prevents duplicate rapid button clicks

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
      this.bot = new TelegramBot(this.token, { polling: true });
      console.log('🤖 [TELEGRAM] Bot initialized with polling mode.');

      // Register notifier callback so engine can push site URLs
      this.engine.setNotifier(async (chatId, message, options = {}) => {
        try {
          const liveUrl = options.liveUrl || '';
          const buttons = [];
          if (liveUrl && liveUrl.startsWith('https://') && !liveUrl.includes('localhost') && !liveUrl.includes('127.0.0.1')) {
            buttons.push([{ text: '🌐 Open Preview Website', url: liveUrl }]);
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
    // 1. Handle /start, /restart, /reset commands
    this.bot.onText(/\/start|\/restart|\/menu/, async (msg) => {
      const chatId = String(msg.chat.id);
      const username = msg.from?.username || '';
      await this.sendWelcomeMenu(chatId, username);
    });

    // 2. Handle /stop, /cancel commands
    this.bot.onText(/\/stop|\/cancel|\/reset/, async (msg) => {
      const chatId = String(msg.chat.id);
      try {
        await this.engine.processMessage(chatId, 'start', `stop_${Date.now()}`);
        await this.sendSafe(chatId, "🛑 **Session stopped & reset.**\n\nWhenever you're ready to create a new portfolio, simply type /start !");
      } catch (e) {
        await this.sendSafe(chatId, "🛑 Session stopped. Type /start to begin.");
      }
    });

    this.bot.onText(/\/stats|\/analytics/, async (msg) => {
      const chatId = String(msg.chat.id);
      const username = msg.from?.username || '';
      await this.processIncoming(chatId, 'stats', `cmd_${Date.now()}`, null, username);
    });

    // 3. Handle Callback Query (Debounced button clicks)
    this.bot.on('callback_query', async (callbackQuery) => {
      const chatId = String(callbackQuery.message.chat.id);
      const data = callbackQuery.data;
      const messageId = `cb_${callbackQuery.id}`;
      const username = callbackQuery.from?.username || '';

      try {
        await this.bot.answerCallbackQuery(callbackQuery.id);
      } catch (e) {}

      // Debounce lock check
      if (this.processingLocks.has(chatId)) {
        return; // Ignore duplicate concurrent clicks
      }

      await this.processIncoming(chatId, data, messageId, null, username);
    });

    // 4. Handle Regular Messages
    this.bot.on('message', async (msg) => {
      if (msg.text && msg.text.startsWith('/')) return; // Handled by command listeners

      const chatId = String(msg.chat.id);
      const messageId = `tg_${msg.message_id}`;
      const username = msg.from?.username || '';

      // Handle PDF or document upload
      if (msg.document) {
        await this.handleDocumentMessage(msg);
        return;
      }

      // Handle Photo upload
      if (msg.photo && msg.photo.length > 0) {
        await this.handlePhotoMessage(msg);
        return;
      }

      if (msg.text) {
        await this.processIncoming(chatId, msg.text, messageId, null, username);
      }
    });

    this.bot.on('polling_error', (error) => {
      console.warn('[TELEGRAM] Polling warning:', error.message);
    });

    this.bot.on('error', (error) => {
      console.warn('[TELEGRAM] General error:', error.message);
    });
  }

  async sendWelcomeMenu(chatId, username = '') {
    const welcomeText = `👋 **Welcome to AI Portfolio Designer!**

I build bespoke, responsive portfolio websites by chatting with you here — no coding, no laptop needed.

💡 *Tip: You can also send me your PDF resume, and I'll auto-extract your information!*

**What is this portfolio for? Choose below:**`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '💻 Developer / Designer', callback_data: 'A' },
          { text: '🛠️ Freelancer / Gig Worker', callback_data: 'B' }
        ],
        [
          { text: '🎓 Student / Fresher', callback_data: 'C' },
          { text: '💼 General Professional', callback_data: 'D' }
        ]
      ]
    };

    // Reset user conversation cleanly
    await this.engine.processMessage(chatId, 'start', `init_${Date.now()}`);

    await this.sendSafe(chatId, welcomeText, {
      reply_markup: inlineKeyboard
    });
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
            [{ text: '🚀 Build My Portfolio Now', callback_data: 'YES' }],
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
              [{ text: '📝 Answer Step-by-Step', callback_data: 'intake_manual' }],
              [{ text: '📄 Upload PDF Resume (Auto)', callback_data: 'intake_resume' }]
            ]
          };
        } else if (text.includes('Here\'s what I collected') || text.includes('Does everything look correct?') || text.includes('Ready to generate')) {
          keyboard = {
            inline_keyboard: [
              [{ text: '🚀 Yes, Build My Portfolio!', callback_data: 'YES' }],
              [
                { text: '✏️ Edit a Field', callback_data: 'edit' },
                { text: '❌ Start Over', callback_data: 'NO' }
              ]
            ]
          };
        } else if (text.includes('Let\'s start!') || text.includes('Got it!') || text.includes('What is your') || text.includes('What\'s your') || text.includes('Tell me about') || text.includes('Moved back to previous')) {
          // Active step-by-step question prompt: show Back and Skip buttons
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

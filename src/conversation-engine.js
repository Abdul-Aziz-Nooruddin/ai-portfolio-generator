/**
 * Conversation Engine - State Machine
 * Manages the entire interview flow from first contact to site generation
 */

const BRANCHES = {
  A: { name: 'Developer / Designer', questions: require('./questions/branch-a') },
  B: { name: 'Freelancer / Gig Worker', questions: require('./questions/branch-b') },
  C: { name: 'Student / Fresher', questions: require('./questions/branch-c') },
  D: { name: 'General Professional', questions: require('./questions/branch-d') }
};

const STATES = {
  IDLE: 'idle',
  BRANCH_SELECTED: 'branch_selected',
  COLLECTING_FIELDS: 'collecting_fields',
  CONFIRMING_DATA: 'confirming_data',
  GENERATING_SITE: 'generating_site',
  PREVIEW_LIVE: 'preview_live',
  AWAITING_PAYMENT: 'awaiting_payment',
  PAID: 'paid',
  GRACE_PERIOD: 'grace_period',
  SUSPENDED: 'suspended'
};

const PRICING = {
  PREVIEW: { name: 'Preview', price: 0, period: '48 hours' },
  LITE: { name: 'Lite', price: 149, period: 'month', yearlyPrice: 1499 },
  PRO: { name: 'Pro', price: 299, period: 'month', yearlyPrice: 2999 }
};

class ConversationEngine {
  constructor(aiService, dbService) {
    this.ai = aiService;
    this.db = dbService;
  }

  async processMessage(phoneNumber, messageText, messageId, mediaUrl = null) {
    const isDuplicate = await this.db.isMessageProcessed(messageId);
    if (isDuplicate) {
      console.log(`[DEDUP] Message ${messageId} already processed`);
      return { action: 'ignored', reason: 'duplicate' };
    }

    const withinLimit = await this.checkRateLimit(phoneNumber, 'message');
    if (!withinLimit) {
      return {
        action: 'reply',
        message: "You're sending messages too quickly. Please wait a moment."
      };
    }

    let user = await this.db.getUser(phoneNumber);
    if (!user) {
      user = await this.db.createUser(phoneNumber);
    }

    await this.db.markMessageProcessed(messageId, user.id);

    let conversation = await this.db.getConversation(user.id);
    if (!conversation) {
      conversation = await this.db.createConversation(user.id);
    }

    return await this.handleState(conversation, messageText, mediaUrl);
  }

  async handleState(conversation, messageText, mediaUrl) {
    const { status, branch, extracted_data } = conversation;
    const lowerMsg = (messageText || '').toLowerCase().trim();

    // Global reset keywords at any state
    if (['start', 'restart', 'reset', 'menu'].includes(lowerMsg)) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.IDLE,
        extracted_data: {},
        branch: null
      });

      return {
        action: 'reply',
        message: `👋 Welcome! I'm your AI portfolio designer.

I can build you a stunning personal website just by chatting here — no laptop, no forms, no design skills needed.

What's this portfolio for?

A) 💻 Developer / Designer
B) 🛠️ Freelancer / Gig Worker  
C) 🎓 Student / Fresher
D) 💼 General Professional

Just reply with A, B, C, or D.`
      };
    }

    switch (status) {
      case STATES.IDLE:
        return await this.handleIdle(conversation, messageText);
      case STATES.BRANCH_SELECTED:
      case STATES.COLLECTING_FIELDS:
        return await this.handleCollectingFields(conversation, messageText, mediaUrl);
      case STATES.CONFIRMING_DATA:
        return await this.handleConfirmation(conversation, messageText);
      case STATES.PREVIEW_LIVE:
        return await this.handlePreviewLive(conversation, messageText);
      case STATES.GENERATING_SITE:
        return {
          action: 'reply',
          message: "I'm still building your site! This takes about 30-60 seconds. I'll send you the link when it's ready."
        };
      case STATES.PAID:
        return await this.handleEditRequest(conversation, messageText, mediaUrl);
      case STATES.SUSPENDED:
        return await this.handleSuspended(conversation, messageText);
      case STATES.GRACE_PERIOD:
        return await this.handleGracePeriod(conversation, messageText);
      default:
        return {
          action: 'reply',
          message: "Something went wrong. Please type START to begin again."
        };
    }
  }

  async handleIdle(conversation, messageText) {
    const lowerMsg = messageText.toLowerCase().trim();

    if (['start', 'restart', 'hello', 'hi', 'hey'].includes(lowerMsg)) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.IDLE,
        extracted_data: {},
        branch: null
      });

      return {
        action: 'reply',
        message: `👋 Welcome! I'm your AI portfolio designer.

I can build you a stunning personal website just by chatting here — no laptop, no forms, no design skills needed.

What's this portfolio for?

A) 💻 Developer / Designer
B) 🛠️ Freelancer / Gig Worker  
C) 🎓 Student / Fresher
D) 💼 General Professional

Just reply with A, B, C, or D.`
      };
    }

    if (['a', 'b', 'c', 'd'].includes(lowerMsg)) {
      const branchGuess = lowerMsg.toUpperCase();

      await this.db.updateConversation(conversation.id, {
        status: STATES.BRANCH_SELECTED,
        branch: branchGuess,
        extracted_data: {}
      });

      const branchName = BRANCHES[branchGuess].name;
      const firstQuestion = BRANCHES[branchGuess].questions[0];

      return {
        action: 'reply',
        message: `Great! I'll build a portfolio for a **${branchName}**.

Let's start:

${firstQuestion.text}`
      };
    }

    const branchGuess = this.inferBranch(messageText);
    if (branchGuess) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.BRANCH_SELECTED,
        branch: branchGuess
      });

      const branchName = BRANCHES[branchGuess].name;
      const firstQuestion = BRANCHES[branchGuess].questions[0];

      return {
        action: 'reply',
        message: `Great! I'll build a portfolio for a **${branchName}**.

Let's start:

${firstQuestion.text}`
      };
    }

    return {
      action: 'reply',
      message: `I didn't catch that. Please tell me:

A) Developer / Designer
B) Freelancer / Gig Worker
C) Student / Fresher
D) General Professional

Or just describe what you do!`
    };
  }

  inferBranch(text) {
    const lower = text.toLowerCase();
    const devKeywords = ['developer', 'designer', 'coder', 'programmer', 'engineer', 'frontend', 'backend', 'fullstack', 'ui', 'ux', 'web dev', 'app dev', 'software', 'devops', 'data scientist', 'ml engineer'];
    const freelanceKeywords = ['freelancer', 'photographer', 'tutor', 'contractor', 'painter', 'electrician', 'plumber', 'consultant', 'trainer', 'coach', 'makeup', 'wedding', 'caterer', 'designer', 'artist', 'mechanic'];
    const studentKeywords = ['student', 'fresher', 'graduate', 'college', 'university', 'btech', 'mba', 'bcom', 'intern', 'undergrad'];

    if (devKeywords.some(k => lower.includes(k))) return 'A';
    if (freelanceKeywords.some(k => lower.includes(k))) return 'B';
    if (studentKeywords.some(k => lower.includes(k))) return 'C';
    if (lower.includes('professional') || lower.includes('manager') || lower.includes('executive') || lower.includes('director')) return 'D';

    return null;
  }

  async handleCollectingFields(conversation, messageText, mediaUrl) {
    const { branch, extracted_data } = conversation;
    const questions = BRANCHES[branch].questions;

    const answeredKeys = Object.keys(extracted_data);
    const currentQuestion = questions.find(q => !answeredKeys.includes(q.key));

    if (!currentQuestion) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.CONFIRMING_DATA
      });
      return await this.handleConfirmation(conversation, null);
    }

    let answer = messageText;
    if (currentQuestion.type === 'image' && mediaUrl) {
      answer = mediaUrl;
    }

    if (currentQuestion.required && (!answer || answer.trim() === '' || answer.toLowerCase() === 'skip')) {
      return {
        action: 'reply',
        message: `This field is required. ${currentQuestion.text}`
      };
    }

    if (answer.toLowerCase() === 'skip' && !currentQuestion.required) {
      answer = '';
    }

    if (answer.toLowerCase() === 'done' && currentQuestion.type === 'image') {
      answer = '';
    }

    const updatedData = { ...extracted_data, [currentQuestion.key]: answer };
    await this.db.updateConversation(conversation.id, {
      extracted_data: updatedData
    });

    const newAnsweredKeys = Object.keys(updatedData);
    const nextQuestion = questions.find(q => !newAnsweredKeys.includes(q.key));

    if (!nextQuestion) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.CONFIRMING_DATA
      });
      return await this.handleConfirmation(conversation, null);
    }

    return {
      action: 'reply',
      message: `${currentQuestion.confirmation || 'Got it!'}

${nextQuestion.text}`
    };
  }

  async handleConfirmation(conversation, messageText) {
    const { extracted_data, branch } = conversation;

    if (!messageText) {
      const summary = this.formatSummary(extracted_data, branch);
      return {
        action: 'reply',
        message: `Here's what I collected for your **${BRANCHES[branch].name}** portfolio:

${summary}

Does everything look correct? Reply:
✅ YES - Build my portfolio!
✏️ EDIT [field] - Change something (e.g., "EDIT name")
❌ NO - Start over`
      };
    }

    const lower = messageText.toLowerCase().trim();

    if (lower === 'yes' || lower === 'y' || lower === '✅') {
      await this.db.updateConversation(conversation.id, {
        status: STATES.GENERATING_SITE
      });

      this.triggerSiteGeneration(conversation);

      return {
        action: 'reply',
        message: `🚀 Awesome! I'm building your portfolio now. This takes about 30-60 seconds.

I'll design it with:
• Your info and projects
• A stunning animated shader background
• Professional typography and layout
• Mobile-responsive design

Sit tight — I'll send you the preview link soon!`
      };
    }

    if (lower.startsWith('edit')) {
      const field = lower.replace('edit', '').trim();
      const updatedData = { ...extracted_data };
      delete updatedData[field];
      await this.db.updateConversation(conversation.id, {
        status: STATES.COLLECTING_FIELDS,
        extracted_data: updatedData
      });

      return {
        action: 'reply',
        message: `No problem! Let's redo that. What's your correct ${field}?`
      };
    }

    if (lower === 'no' || lower === 'n' || lower === '❌') {
      await this.db.updateConversation(conversation.id, {
        status: STATES.IDLE,
        extracted_data: {},
        branch: null
      });
      return {
        action: 'reply',
        message: `Okay, let's start fresh! What's this portfolio for? (A/B/C/D)`
      };
    }

    return {
      action: 'reply',
      message: `Please reply YES to build, EDIT [field] to change something, or NO to start over.`
    };
  }

  formatSummary(data, branch) {
    const lines = [];
    const questions = BRANCHES[branch].questions;

    for (const q of questions) {
      const val = data[q.key];
      if (val && val.trim() !== '') {
        const display = q.type === 'image' ? '[Photo uploaded]' : 
                       val.length > 50 ? val.substring(0, 50) + '...' : val;
        lines.push(`• ${q.label}: ${display}`);
      }
    }

    return lines.join('\n') || 'No data collected yet.';
  }

  async handlePreviewLive(conversation, messageText) {
    const lower = messageText.toLowerCase().trim();

    if (lower === 'pay' || lower === 'publish' || lower === '₹149' || lower === 'buy' || lower === 'subscribe') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'lite');
      return {
        action: 'reply',
        message: `Perfect! Here's your payment link:

${paymentLink}

Pay ₹${PRICING.LITE.price}/month to:
✅ Remove the watermark
✅ Get your own custom domain
✅ Unlimited edits
✅ Keep your site live forever

Or go Pro for ₹${PRICING.PRO.price}/month and get:
✅ Everything in Lite
✅ Analytics (see who visits your site)
✅ SEO optimization
✅ Priority support`
      };
    }

    if (lower === 'pro' || lower === '₹299') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'pro');
      return {
        action: 'reply',
        message: `Pro plan it is! Here's your payment link:

${paymentLink}

₹${PRICING.PRO.price}/month includes:
✅ Everything in Lite
✅ Visitor analytics
✅ SEO meta tags
✅ Contact form
✅ Priority support`
      };
    }

    if (lower.startsWith('edit')) {
      return await this.handleEditRequest(conversation, messageText, null);
    }

    return {
      action: 'reply',
      message: `Your preview is live! Check it out above 👆

Reply:
💳 PAY - Publish your site (₹${PRICING.LITE.price}/month)
⭐ PRO - Go Pro (₹${PRICING.PRO.price}/month)
✏️ EDIT [field] - Change something`
    };
  }

  async triggerSiteGeneration(conversation) {
    try {
      const { id, branch, extracted_data } = conversation;

      const designBrief = await this.ai.generateDesignBrief(extracted_data, branch);
      const shader = this.selectShader(branch, extracted_data, designBrief);

      await this.db.updateConversation(id, {
        design_brief: designBrief,
        selected_shader: shader.id,
        taste_skill_dials: designBrief.dials
      });

      console.log(`[GENERATED] Portfolio for conversation ${id}`);

    } catch (error) {
      console.error('[GENERATION ERROR]', error);
      await this.db.updateConversation(conversation.id, {
        status: STATES.IDLE
      });
    }
  }

  selectShader(branch, extractedData, designBrief) {
    const SHADERS = {
      'digital-rain': { id: 'digital-rain', name: 'Digital Rain', branch: 'A', vibe: 'code' },
      'event-horizon': { id: 'event-horizon', name: 'Event Horizon', branch: 'A', vibe: 'visual' },
      'feedback-loop': { id: 'feedback-loop', name: 'Feedback Loop', branch: 'A', vibe: 'animation' },
      'clockwork-mind': { id: 'clockwork-mind', name: 'Clockwork Mind', branch: 'A', vibe: 'design' },
      'tesseract-shadow': { id: 'tesseract-shadow', name: 'Tesseract Shadow', branch: 'A', vibe: 'creative-tech' },
      'neon-drive': { id: 'neon-drive', name: 'Neon Drive', branch: 'A', vibe: 'cyberpunk' },
      'rain-on-glass': { id: 'rain-on-glass', name: 'Rain on Glass', branch: 'B', vibe: 'photographer' },
      'aurora-veil': { id: 'aurora-veil', name: 'Aurora Veil', branch: 'B', vibe: 'wedding' },
      'liquid-gold': { id: 'liquid-gold', name: 'Liquid Gold', branch: 'B', vibe: 'luxury' },
      'gilt-mosaic': { id: 'gilt-mosaic', name: 'Gilt Mosaic', branch: 'B', vibe: 'interior' },
      'smolder': { id: 'smolder', name: 'Smolder', branch: 'B', vibe: 'coach' },
      'chromatic-bloom': { id: 'chromatic-bloom', name: 'Chromatic Bloom', branch: 'B', vibe: 'beauty' },
      'flow-field': { id: 'flow-field', name: 'Flow Field', branch: 'C', vibe: 'cs' },
      'phyllotaxis-spiral': { id: 'phyllotaxis-spiral', name: 'Phyllotaxis Spiral', branch: 'C', vibe: 'design' },
      'painted-strata': { id: 'painted-strata', name: 'Painted Strata', branch: 'C', vibe: 'simple' },
      'silk-groove': { id: 'silk-groove', name: 'Silk Groove', branch: 'D', vibe: 'corporate' },
      'ink-calligraphy': { id: 'ink-calligraphy', name: 'Ink Calligraphy', branch: 'D', vibe: 'creative' },
      'signal-decay': { id: 'signal-decay', name: 'Signal Decay', branch: 'D', vibe: 'tech' }
    };

    const branchShaders = Object.values(SHADERS).filter(s => s.branch === branch);
    const allText = JSON.stringify(extractedData).toLowerCase();

    for (const shader of branchShaders) {
      if (allText.includes(shader.vibe)) return shader;
    }

    return branchShaders[0] || SHADERS['flow-field'];
  }

  async handleEditRequest(conversation, messageText, mediaUrl) {
    return {
      action: 'reply',
      message: "Edit feature coming soon! For now, contact support for changes."
    };
  }

  async handleSuspended(conversation, messageText) {
    const lower = messageText.toLowerCase().trim();
    if (lower === 'restore' || lower === 'pay') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'lite');
      return {
        action: 'reply',
        message: `Your site is paused. Pay ₹${PRICING.LITE.price}/month to restore it instantly:

${paymentLink}`
      };
    }
    return {
      action: 'reply',
      message: `Your subscription has expired. Reply RESTORE to reactivate your site for ₹${PRICING.LITE.price}/month.`
    };
  }

  async handleGracePeriod(conversation, messageText) {
    const lower = messageText.toLowerCase().trim();
    if (lower === 'pay' || lower === 'restore') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'lite');
      return {
        action: 'reply',
        message: `Your payment failed. Update it here to keep your site live:

${paymentLink}`
      };
    }
    return {
      action: 'reply',
      message: `Your subscription payment failed. You have 48 hours to update payment before your site pauses. Reply PAY to update.`
    };
  }

  async checkRateLimit(phoneNumber, action) {
    return true;
  }

  async generatePaymentLink(userId, plan) {
    return `https://rzp.io/payment-link-placeholder?plan=${plan}&user=${userId}`;
  }
}

module.exports = { ConversationEngine, STATES, BRANCHES, PRICING };

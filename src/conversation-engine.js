const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { HostingProvider } = require('./services/hosting-provider');
const { CustomDomainService } = require('./services/custom-domain-service');

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
  PREVIEW_UNPAID: 'preview_unpaid',
  AWAITING_PAYMENT: 'awaiting_payment',
  PAID: 'paid',
  PREVIEW_LAPSED: 'preview_lapsed',
  GRACE_PERIOD: 'grace_period',
  SUSPENDED: 'suspended',
  DELETED: 'deleted'
};

const PRICING = {
  PREVIEW: { name: 'Preview', price: 0, period: '2 hours' },
  LITE: { name: 'Lite', price: 149, period: 'month' },
  PRO: { name: 'Pro', price: 299, period: 'month' },
  EXTRA_PREVIEW: { name: 'Extra Preview', price: 49, period: 'one-time' }
};

class ConversationEngine {
  constructor(aiService, dbService, siteGenerator = null, netlifyDeployer = null, razorpayService = null, emailService = null) {
    this.ai = aiService;
    this.db = dbService;
    this.siteGenerator = siteGenerator || new SiteGenerator();
    this.hostingProvider = new HostingProvider(process.env.NETLIFY_TOKEN, process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY);
    this.netlifyDeployer = netlifyDeployer;
    this.razorpayService = razorpayService;
    this.emailService = emailService;
    this.customDomainService = new CustomDomainService(this.db);
    this.notifier = null;
  }

  setNotifier(notifyFn) {
    this.notifier = notifyFn;
  }

  setEmailService(emailService) {
    this.emailService = emailService;
  }

  async processMessage(phoneNumber, messageText, messageId, mediaUrl = null, username = null) {
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
    conversation.phone_number = phoneNumber;
    conversation.username = username;

    return await this.handleState(conversation, messageText, mediaUrl);
  }

  isAdmin(phoneNumber, username) {
    const adminUsernames = (process.env.ADMIN_USERNAMES || 'abdulazizpro1,abdulazizpro').toLowerCase().split(',').map(s => s.trim().replace(/^@/, ''));
    const adminIds = (process.env.ADMIN_IDS || '7535327243').split(',').map(s => s.trim());
    
    if (username && adminUsernames.includes(username.toLowerCase().replace(/^@/, ''))) {
      return true;
    }
    if (phoneNumber && adminIds.includes(String(phoneNumber).trim())) {
      return true;
    }
    return false;
  }

  async handleState(conversation, messageText, mediaUrl) {
    const { status, branch, extracted_data } = conversation;
    const lowerMsg = (messageText || '').toLowerCase().trim();

    // 1. Global reset keywords (Full Clean Slate)
    if (['start', 'restart', 'reset', 'menu'].includes(lowerMsg)) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.IDLE,
        lifecycle_state: STATES.IDLE,
        extracted_data: {},
        branch: null,
        design_brief: null,
        taste_skill_dials: null
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

    // 2. Figma Design Import Detection (Figma MCP)
    const figmaMatch = (messageText || '').match(/https?:\/\/(?:www\.)?figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)[^\s]*/);
    if (figmaMatch) {
      const figmaUrl = figmaMatch[0];
      const updatedData = { ...(extracted_data || {}), figma_url: figmaUrl };
      await this.db.updateConversation(conversation.id, { extracted_data: updatedData });
      return {
        action: 'reply',
        message: `🎨 **Figma Design Detected!**\n\nI have linked your Figma design file to your portfolio generation pipeline.\nI will extract your custom color palette, typography tokens, and UI layout directly from Figma!\n\nWhat is your name and professional title? (e.g. *"Alex Rivera, Full-Stack & 3D WebGL Engineer"*)\n\n*(Or send your GitHub username / resume to autofill)*`
      };
    }

    // 3. Stats / Analytics Command (Pro Feature)
    if (lowerMsg === 'stats' || lowerMsg === '/stats' || lowerMsg === 'analytics') {
      const analytics = await this.db.getSiteAnalytics(conversation.id);
      return {
        action: 'reply',
        message: `📊 **Your Portfolio Live Analytics (Pro):**
 
• **Total Page Views:** ${analytics.totalViews}
• **Unique Visitors:** ${analytics.uniqueVisitors}
• **Contact Form Inquiries:** ${analytics.contactSubmissions}
 
💡 *Share your portfolio link to track more recruiter visits!*`
      };
    }

    // 4. Custom Domain Connection (Pro Feature)
    if (lowerMsg.startsWith('domain ') || lowerMsg.startsWith('/domain ')) {
      const domainInput = lowerMsg.replace(/^\/?domain\s+/, '').trim();
      try {
        const siteRecord = await this.db.getSiteByConversation(conversation.id);
        const siteId = siteRecord?.provider_site_id || conversation.id;
        const res = await this.customDomainService.registerCustomDomain(siteId, domainInput, conversation.user_id);
        return {
          action: 'reply',
          message: `🌐 **Custom Domain Registered: ${res.domain}**\n\nTo connect your domain to your live portfolio, add this **DNS CNAME record** in your domain registrar (GoDaddy, Namecheap, Google Domains):\n\n• **Type:** CNAME\n• **Name / Host:** \`@\` (or \`www\`)\n• **Target / Value:** \`${res.cnameTarget}\`\n\n⏳ *Once you have added the record, type **CHECK DOMAIN** to verify SSL & propagation!*`
        };
      } catch (err) {
        return {
          action: 'reply',
          message: `⚠️ **Domain Error:** ${err.message}`
        };
      }
    }

    // 5. Instant Free Subdomain Claim (e.g. SUBDOMAIN alex)
    if (lowerMsg.startsWith('subdomain ') || lowerMsg.startsWith('/subdomain ')) {
      const handleInput = lowerMsg.replace(/^\/?subdomain\s+/, '').trim();
      try {
        const siteRecord = await this.db.getSiteByConversation(conversation.id);
        const siteId = siteRecord?.provider_site_id || conversation.id;
        const res = await this.customDomainService.claimSubdomain(siteId, handleInput, conversation.user_id);
        return {
          action: 'reply',
          message: `🎉 **Subdomain Claimed & Live!**\n\nYour portfolio is instantly accessible at:\n🔗 **https://${res.domain}**\n\n*(SSL is automatically active)*`
        };
      } catch (err) {
        return {
          action: 'reply',
          message: `⚠️ **Subdomain Error:** ${err.message}`
        };
      }
    }

    // 6. Check DNS Status
    if (lowerMsg === 'check domain' || lowerMsg === 'domain status' || lowerMsg === '/check_domain') {
      const siteRecord = await this.db.getSiteByConversation(conversation.id);
      const siteId = siteRecord?.provider_site_id || conversation.id;
      const info = this.customDomainService.getDomainInfo(siteId);
      if (!info) {
        return {
          action: 'reply',
          message: `ℹ️ No custom domain connected yet.\n\nReply with **DOMAIN [yourname.com]** or **SUBDOMAIN [handle]** to connect one!`
        };
      }
      const check = await this.customDomainService.checkDNSStatus(info.domain);
      return {
        action: 'reply',
        message: `🌐 **Domain Status for ${info.domain}:**\n\n• **Status:** ${check.status.toUpperCase()}\n• **Details:** ${check.message}`
      };
    }

    // 3. Theme Quick Change
    if (lowerMsg.startsWith('theme_') || lowerMsg.startsWith('theme ')) {
      const themeKey = lowerMsg.replace(/^theme[_ ]/, '').trim();
      let themeHint = '';
      let themeLabel = '';

      if (themeKey.includes('terminal') || themeKey.includes('code') || themeKey.includes('dev')) {
        themeHint = 'terminal';
        themeLabel = '💻 Hacker Terminal OS';
      } else if (themeKey.includes('editorial') || themeKey.includes('warm') || themeKey.includes('magazine')) {
        themeHint = 'editorial';
        themeLabel = '📰 Editorial Magazine';
      } else if (themeKey.includes('neo') || themeKey.includes('brutalist')) {
        themeHint = 'neo-brutalist';
        themeLabel = '🎨 Neo-Brutalist Pop';
      } else {
        themeHint = 'glassmorphism';
        themeLabel = '✨ 21st Glassmorphic Aurora';
      }

      const updatedData = { ...(conversation.extracted_data || {}), style_hint: themeHint };
      await this.db.updateConversation(conversation.id, {
        extracted_data: updatedData
      });

      return {
        action: 'reply',
        message: `🎨 Selected template: **${themeLabel}**!\n\nClick **🚀 Build Portfolio Now** to build your portfolio with this template.`
      };
    }

    switch (status) {
      case STATES.IDLE:
        return await this.handleIdle(conversation, messageText);
      case STATES.BRANCH_SELECTED:
        return await this.handleBranchSelected(conversation, messageText);
      case STATES.COLLECTING_FIELDS:
        return await this.handleCollectingFields(conversation, messageText, mediaUrl);
      case STATES.CONFIRMING_DATA:
        return await this.handleConfirmation(conversation, messageText);
      case STATES.PREVIEW_LIVE:
      case STATES.PREVIEW_UNPAID:
        return await this.handlePreviewLive(conversation, messageText);
      case STATES.GENERATING_SITE:
        return {
          action: 'reply',
          message: "I'm still building your site! This takes about 30-60 seconds. I'll send you the link when it's ready."
        };
      case STATES.PAID:
        return await this.handleEditRequest(conversation, messageText, mediaUrl);
      case STATES.SUSPENDED:
      case STATES.PREVIEW_LAPSED:
      case STATES.GRACE_PERIOD:
        return await this.handleGracePeriod(conversation, messageText);
      case STATES.DELETED:
        return {
          action: 'reply',
          message: "Your previous preview has expired and been removed. Type **START** to create a new portfolio!"
        };
      default:
        return {
          action: 'reply',
          message: "Something went wrong. Please type START to begin again."
        };
    }
  }

  async handleBranchSelected(conversation, messageText) {
    const lower = (messageText || '').toLowerCase().trim();

    if (lower === 'intake_resume' || lower === '2' || lower.includes('resume') || lower.includes('pdf')) {
      return {
        action: 'reply',
        message: "📎 Please send your **Resume (PDF file)** now, and I'll extract your information automatically!"
      };
    }

    // Default or 'intake_manual' -> switch to collecting fields and ask Question 1
    await this.db.updateConversation(conversation.id, {
      status: STATES.COLLECTING_FIELDS
    });

    const firstQuestion = BRANCHES[conversation.branch].questions[0];
    return {
      action: 'reply',
      message: `Let's start!

${firstQuestion.text}`
    };
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

      return {
        action: 'reply',
        message: `Great! I'll build a portfolio for a **${branchName}**.

How would you like to provide your information?

1️⃣ 📝 **Answer Questions Step-by-Step**
2️⃣ 📄 **Upload Resume (PDF)** (Instant auto-extraction)`
      };
    }

    const branchGuess = this.inferBranch(messageText);
    if (branchGuess) {
      await this.db.updateConversation(conversation.id, {
        status: STATES.BRANCH_SELECTED,
        branch: branchGuess,
        extracted_data: {}
      });

      const branchName = BRANCHES[branchGuess].name;

      return {
        action: 'reply',
        message: `Great! I'll build a portfolio for a **${branchName}**.

How would you like to provide your information?

1️⃣ 📝 **Answer Questions Step-by-Step**
2️⃣ 📄 **Upload Resume (PDF)** (Instant auto-extraction)`
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

    // Handle Back / Previous button click
    const lowerMsg = (messageText || '').toLowerCase().trim();
    if (lowerMsg === 'back' || lowerMsg === 'previous' || lowerMsg.includes('back')) {
      if (answeredKeys.length === 0) {
        return {
          action: 'reply',
          message: `You are at the first step:\n\n${currentQuestion.text}`
        };
      }
      const lastKey = answeredKeys[answeredKeys.length - 1];
      const updatedData = { ...extracted_data };
      delete updatedData[lastKey];
      await this.db.updateConversation(conversation.id, {
        extracted_data: updatedData
      });
      const prevQuestion = questions.find(q => q.key === lastKey) || questions[0];
      return {
        action: 'reply',
        message: `⬅️ Moved back to previous step:\n\n${prevQuestion.text}`
      };
    }

    if (messageText && (lowerMsg === 'intake_manual' || lowerMsg === 'intake_resume')) {
      return {
        action: 'reply',
        message: `Let's start!\n\n${currentQuestion.text}`
      };
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

    let updatedData = { ...extracted_data, [currentQuestion.key]: answer };

    // Smart cascade skip for optional sections (projects, photos, testimonials)
    const isSkipped = !answer || answer.trim() === '' || answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'done';

    if (isSkipped) {
      if (currentQuestion.key === 'project_2_name' || currentQuestion.key === 'project_2') {
        [
          'project_2_desc', 'project_2_tech', 'project_2_github', 'project_2_live', 'project_2_image', 'project_2_link',
          'project_3_name', 'project_3_desc', 'project_3_tech', 'project_3_github', 'project_3_live'
        ].forEach(k => { updatedData[k] = ''; });
      } else if (currentQuestion.key === 'project_3_name') {
        [
          'project_3_desc', 'project_3_tech', 'project_3_github', 'project_3_live'
        ].forEach(k => { updatedData[k] = ''; });
      } else if (currentQuestion.key === 'photo_2') {
        [
          'photo_2_caption', 'photo_3', 'photo_3_caption', 'photo_4', 'photo_4_caption', 'photo_5', 'photo_5_caption'
        ].forEach(k => { updatedData[k] = ''; });
      } else if (currentQuestion.key === 'photo_3') {
        [
          'photo_3_caption', 'photo_4', 'photo_4_caption', 'photo_5', 'photo_5_caption'
        ].forEach(k => { updatedData[k] = ''; });
      } else if (currentQuestion.key === 'testimonial_2') {
        [
          'testimonial_3'
        ].forEach(k => { updatedData[k] = ''; });
      }
    }

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
      const isUserAdmin = this.isAdmin(conversation.phone_number, conversation.username);

      // Enforce 1 portfolio build per week for regular users (Admins exempt)
      if (!isUserAdmin) {
        const canBuild = await this.db.checkWeeklyLimit(conversation.user_id, 1);
        if (!canBuild) {
          return {
            action: 'reply',
            message: `⏳ **Weekly Free Preview Limit Reached**

Free users can generate **1 free portfolio per week**.
Your next free preview generation will reset next week!

Options:
• Reply **PREVIEW** (₹49) for an additional instant preview generation.
• Reply **PAY** (₹149/mo) to unlock permanent live hosting & your custom domain!`
          };
        }
      }

      await this.db.updateConversation(conversation.id, {
        status: STATES.GENERATING_SITE
      });

      this.triggerSiteGeneration(conversation);

      return {
        action: 'reply',
        message: `🚀 Awesome! I'm building your portfolio now. This takes about 30-60 seconds.

I'll design it with:
• Your info and projects
• A clean, modern visual style
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

    // Basic profile info
    if (data.name) lines.push(`• **Name:** ${data.name}`);
    if (data.role || data.service_title) lines.push(`• **Role:** ${data.role || data.service_title}`);
    if (data.bio || data.tagline) lines.push(`• **Bio:** ${data.bio || data.tagline}`);
    if (data.email) lines.push(`• **Email:** ${data.email}`);
    if (data.github) lines.push(`• **GitHub:** ${data.github}`);
    if (data.tech_stack || data.skills) lines.push(`• **Skills:** ${data.tech_stack || data.skills}`);

    // All Projects
    const projects = [];
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      projects.push(...data.projects);
    } else {
      for (let i = 1; i <= 20; i++) {
        if (data[`project_${i}_name`]) {
          projects.push({
            name: data[`project_${i}_name`],
            tech: data[`project_${i}_tech`],
            github: data[`project_${i}_github`]
          });
        }
      }
    }

    if (projects.length > 0) {
      lines.push(`\n🚀 **Projects (${projects.length} included):**`);
      projects.forEach((p, idx) => {
        const pName = p.name || p.title;
        const pTech = p.tech || p.tech_stack ? ` (${p.tech || p.tech_stack})` : '';
        const pGh = p.github ? ` [Repo: ${p.github}]` : '';
        lines.push(`  ${idx + 1}. **${pName}**${pTech}${pGh}`);
      });
    }

    if (data.experience || data.experience_summary) {
      lines.push(`\n• **Experience:** ${data.experience || data.experience_summary}`);
    }
    if (data.education) {
      lines.push(`• **Education:** ${data.education}`);
    }

    return lines.join('\n') || 'No data collected yet.';
  }

  async handlePreviewLive(conversation, messageText) {
    const lower = messageText.toLowerCase().trim();

    if (lower === 'pay' || lower === 'publish' || lower === '₹149' || lower === 'buy' || lower === 'subscribe' || lower === 'pro' || lower === '₹299') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'lite');
      return {
        action: 'reply',
        message: `Perfect! Here's your All-Access subscription link:

${paymentLink}

Pay ₹${PRICING.LITE.price}/month to get everything:
✅ Remove 2-hour takedown timer & watermarks
✅ Keep your portfolio hosted live 24/7
✅ Real-time visitor analytics & telemetry
✅ Automated SEO, OpenGraph & social cards
✅ Interactive contact form with instant leads
✅ Unlimited live edits & rebuilds`
      };
    }

    if (lower === 'preview' || lower === '₹49' || lower === 'extra') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'extra_preview');
      return {
        action: 'reply',
        message: `Here's your link for an Extra Preview build (₹49):\n\n${paymentLink}`
      };
    }

    if (lower.startsWith('edit')) {
      return await this.handleEditRequest(conversation, messageText, null);
    }

    return {
      action: 'reply',
      message: `Your preview is live! Check it out above 👆

Reply:
💳 PAY - Full Access (₹${PRICING.LITE.price}/month)
✏️ EDIT [field] - Change something`
    };
  }

  async triggerSiteGeneration(conversation) {
    try {
      const { id, branch, extracted_data, user_id } = conversation;

      // 1. Takedown & Purge: If regenerating an existing preview, take down the old site first
      try {
        await this.hostingProvider.purge(id);
      } catch (purgeErr) {}

      // 2. Generate design brief using Gemini AI + UI/UX Pro Max
      const designBrief = await this.ai.generateDesignBrief(extracted_data, branch);

      // 3. Generate HTML/CSS/JS site bundle
      const siteFiles = await this.siteGenerator.generateSite(conversation, extracted_data, designBrief);

      // 4. Deploy via Zero-Credit HostingProvider (Self-Hosted + Supabase CDN)
      const deployRes = await this.hostingProvider.deploy(id, siteFiles, extracted_data);
      const liveUrl = deployRes.deployUrl;
      const hostingProvider = deployRes.provider;
      const providerSiteId = deployRes.siteId;

      // 4. Save client site record to database
      try {
        await this.db.createSite(user_id, hostingProvider, providerSiteId);
      } catch (dbErr) {
        console.warn('[DB] createSite warning:', dbErr.message);
      }

      // 6. Update conversation state with 2-Hour Preview Timer
      const nowIso = new Date().toISOString();
      try {
        await this.db.updateConversation(id, {
          status: STATES.PREVIEW_LIVE,
          lifecycle_state: 'preview_unpaid',
          state_entered_at: nowIso,
          design_brief: designBrief,
          taste_skill_dials: designBrief.dials
        });
      } catch (updErr) {
        console.warn('[DB] updateConversation preview warning:', updErr.message);
      }

      console.log(`[GENERATED & DEPLOYED] Live at ${liveUrl} for conversation ${id}`);

      // Track 5b: Send Email 1 if user provided email and opted in
      if (this.emailService && extracted_data.email) {
        try {
          const user = await this.db.getUserById(user_id);
          if (user && user.email_marketing_opt_in) {
            const subscribeUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/subscribe?userId=${user_id}`;
            await this.emailService.sendConversionEmail1(extracted_data.email, {
              userId: user_id,
              name: extracted_data.name || 'there',
              previewUrl: liveUrl,
              subscribeUrl
            });
          }
        } catch (eErr) {
          console.warn('[EMAIL] Failed sending conversion email 1:', eErr.message);
        }
      }

      // 7. Notify user via Telegram / webhook notifier
      if (this.notifier) {
        let recipient = conversation.phone_number;
        if (!recipient && user_id) {
          try {
            const { data } = await this.db.client.from('users').select('phone_number').eq('id', user_id).single();
            recipient = data?.phone_number;
          } catch (e) {
            console.warn('[NOTIFIER] Error getting user phone number:', e.message);
          }
        }
        if (recipient) {
          const msg = `🎉 **Your Portfolio Preview is Live!** ⏳ *(2-Hour Timer Active)*\n\n🔗 **Preview link:**\n${liveUrl}\n\n⚠️ *This preview will automatically expire in 2 hours unless subscribed.*\n\nKeep your portfolio live forever with full features:\n💳 Reply **PAY** — All-Access (₹149/mo)\n✏️ Reply **EDIT [field]** — 1 free edit`;
          await this.notifier(recipient, msg, { liveUrl });
        } else {
          console.warn('[NOTIFIER] Could not find recipient for conversation', id);
        }
      }

    } catch (error) {
      console.error('[GENERATION ERROR]', error);
      if (this.notifier && conversation.phone_number) {
        try {
          await this.notifier(conversation.phone_number, "⚠️ An error occurred while generating your portfolio. Please type START to try again!");
        } catch (nErr) {}
      }
      try {
        await this.db.updateConversation(conversation.id, {
          status: STATES.IDLE
        });
      } catch (dbE) {}
    }
  }

  async handleEditRequest(conversation, messageText, mediaUrl) {
    const isUserAdmin = this.isAdmin(conversation.phone_number, conversation.username);
    const regensUsed = conversation.extracted_data?._regens_used || 0;

    // Enforce 1 free regeneration limit for regular users (Admins exempt)
    if (!isUserAdmin && regensUsed >= 1) {
      return {
        action: 'reply',
        message: `⚠️ **Regeneration Limit Reached**

You have already used your **1 free portfolio edit & rebuild**.

Reply **PAY** (₹149) to unlock unlimited live edits, remove watermarks, and connect your custom domain!`
      };
    }

    const text = (messageText || '').replace(/^edit\s*/i, '').trim();
    if (!text) {
      return {
        action: 'reply',
        message: "What would you like to edit? For example:\n• `EDIT name Jane Doe`\n• `EDIT bio Building AI tools at scale`\n• `EDIT role Senior Developer`"
      };
    }

    const firstSpace = text.indexOf(' ');
    let field = text;
    let newValue = '';
    if (firstSpace !== -1) {
      field = text.substring(0, firstSpace).toLowerCase();
      newValue = text.substring(firstSpace + 1).trim();
    }

    const updatedData = { ...conversation.extracted_data };
    if (!isUserAdmin) {
      updatedData._regens_used = regensUsed + 1;
    }

    if (newValue) {
      updatedData[field] = newValue;
      await this.db.updateConversation(conversation.id, {
        extracted_data: updatedData,
        status: STATES.CONFIRMING_DATA
      });
      return {
        action: 'reply',
        message: `Updated **${field}** to: "${newValue}"\n\nReply **YES** to rebuild your site, or **EDIT** to change another field.`
      };
    } else {
      delete updatedData[field];
      await this.db.updateConversation(conversation.id, {
        extracted_data: updatedData,
        status: STATES.COLLECTING_FIELDS
      });
      return {
        action: 'reply',
        message: `Let's update ${field}. What is your new ${field}?`
      };
    }
  }

  async handleSuspended(conversation, messageText) {
    const lower = messageText.toLowerCase().trim();
    if (lower === 'restore' || lower === 'pay') {
      const paymentLink = await this.generatePaymentLink(conversation.user_id, 'lite');
      return {
        action: 'reply',
        message: `Your site is paused. Pay ₹${PRICING.LITE.price}/month to restore it instantly:\n\n${paymentLink}`
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
        message: `Your payment failed. Update it here to keep your site live:\n\n${paymentLink}`
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
    if (this.razorpayService && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const linkObj = await this.razorpayService.createPaymentLink(userId, plan);
        if (linkObj && linkObj.shortUrl) return linkObj.shortUrl;
      } catch (err) {
        console.error('[RAZORPAY] Payment link creation error:', err.message);
      }
    }

    const upiId = process.env.PERSONAL_UPI_ID;
    const price = plan === 'pro' ? PRICING.PRO.price : PRICING.LITE.price;
    if (upiId && upiId.trim() !== '') {
      return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=PortfolioBot&am=${price}&cu=INR&tn=Portfolio_${plan}`;
    }
    return `https://rzp.io/payment-link-placeholder?plan=${plan}&user=${userId}`;
  }
}

module.exports = { ConversationEngine, STATES, BRANCHES, PRICING };

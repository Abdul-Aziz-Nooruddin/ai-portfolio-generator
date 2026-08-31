/**
 * Telegram & Web Portfolio Studio - Main Server
 */

require('dotenv').config();

process.on('unhandledRejection', (reason, promise) => {
  console.warn('[PROCESS UNHANDLED REJECTION]', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[PROCESS UNCAUGHT EXCEPTION]', err);
});

const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { ConversationEngine } = require('./conversation-engine');
const { AIService } = require('./services/ai-service');
const { DatabaseService } = require('./services/db-service');
const { SiteGenerator } = require('./services/site-generator');
const { HostingProvider, NetlifyDeployer } = require('./services/hosting-provider');
const { RazorpayService } = require('./services/razorpay-service');
const { EmailService } = require('./services/email-service');
const { LifecycleService } = require('./services/lifecycle-service');
const { TelegramHandler } = require('./handlers/telegram-handler');
const { FigmaService } = require('./services/figma-service');
const { CustomDomainService } = require('./services/custom-domain-service');
const { DesignEngine, IA_MODELS, VISUAL_UNIVERSES } = require('./design-engine');
const { SecurityService } = require('./services/security-service');
const { SecurityMiddleware } = require('./middleware/security-middleware');
const { AuthMiddleware } = require('./middleware/auth-middleware');
const { AuthHandler } = require('./handlers/auth-handler');
const { PortfolioState } = require('./customizer/portfolio-state');
const { StaticExporter } = require('./export/static-exporter');
const { CustomizationQualityGate } = require('./customizer/customization-quality-gate');
const { SectionRegistry } = require('./customizer/section-registry');
const { BetaDashboard } = require('./analytics/beta-dashboard');
const { productTelemetry, EVENT_TYPES } = require('./analytics/product-events');
const { UploadValidator } = require('./services/upload-validator');
const { AdaptiveQuestionnaire } = require('./services/adaptive-questionnaire');
const { UnifiedProfileNormalizer } = require('./services/unified-profile-normalizer');
const { LegacyVibeDetector } = require('./design-intelligence/legacy-vibe-detector');
const { ErrorRecoveryService } = require('./services/error-recovery-service');
const { TemplateRegistry } = require('./templates/template-registry');

const app = express();
const securityService = new SecurityService();
const figmaService = new FigmaService();
const designEngine = new DesignEngine();
const customizationQualityGate = new CustomizationQualityGate();
const portfolioCustomizerMap = new Map();

// Global Security Middleware Pipeline
app.use(SecurityMiddleware.requestTimeout(90000));
app.use(SecurityMiddleware.securityHeaders());
app.use(SecurityMiddleware.corsConfig());
app.use(express.json({ limit: '50mb', verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Smart Public Domain Detection (Converts localhost to real public URL automatically, ignoring private LAN IPs)
app.use((req, res, next) => {
  if (!process.env.HOST_URL || process.env.HOST_URL.includes('localhost') || process.env.HOST_URL.includes('127.0.0.1')) {
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const hostNoPort = (host || '').split(':')[0];
    const isPrivateIp = !hostNoPort || /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|127\.|0\.0\.0\.0|localhost)/i.test(hostNoPort);
    if (host && !isPrivateIp) {
      process.env.HOST_URL = `${proto}://${host}`;
      if (hostingProvider) hostingProvider.hostUrl = process.env.HOST_URL;
    }
  }
  next();
});

// Dynamic Custom Domain & Subdomain Hostname Router
app.use(async (req, res, next) => {
  const host = (req.hostname || req.get('host') || '').toLowerCase().split(':')[0];
  if (!host || host === 'localhost' || host === '127.0.0.1' || host === 'portfolio.site') {
    return next();
  }

  // Check if incoming domain or subdomain maps to a site
  if (customDomainService) {
    const siteId = customDomainService.resolveHostname(host);
    if (siteId) {
      const filePath = path.join(process.cwd(), 'public', 'sites', siteId, 'index.html');
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html); // Serve 100% clean, watermark-free custom domain portfolio
      }
    }
  }
  next();
});

// Initialize core services
const aiService = new AIService(process.env.GEMINI_API_KEY);
const dbService = new DatabaseService(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const emailService = new EmailService(dbService);
const siteGenerator = new SiteGenerator();
const customDomainService = new CustomDomainService(dbService);
const hostingProvider = new HostingProvider(
  process.env.NETLIFY_TOKEN,
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const netlifyDeployer = process.env.NETLIFY_TOKEN
  ? new NetlifyDeployer(process.env.NETLIFY_TOKEN, process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

const razorpayService = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  ? new RazorpayService(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET, process.env.RAZORPAY_WEBHOOK_SECRET)
  : null;

const conversationEngine = new ConversationEngine(
  aiService,
  dbService,
  siteGenerator,
  netlifyDeployer,
  razorpayService,
  emailService
);

const lifecycleService = new LifecycleService(dbService, emailService, null, hostingProvider);
if (require.main === module) {
  lifecycleService.startScheduler('0 * * * *'); // Hourly deterministic check
}

// Initialize GitHub AI Portfolio Generation Pipeline
const { GitHubGenerationPipeline } = require('./services/github-generation-pipeline');
const githubPipeline = new GitHubGenerationPipeline(aiService, siteGenerator);

// 1. Initialize Telegram Bot Handler (Polling when running as main server)
let telegramHandler = null;
if (require.main === module && process.env.TELEGRAM_BOT_TOKEN) {
  telegramHandler = new TelegramHandler(
    conversationEngine,
    aiService,
    process.env.TELEGRAM_BOT_TOKEN
  );
  lifecycleService.setNotifier((chatId, msg, opts) => telegramHandler.sendSafe(chatId, msg, opts));
}

// Razorpay Payment & Subscription Webhook Route
app.post('/webhook/razorpay', async (req, res) => {
  if (!razorpayService) return res.status(200).send('OK');
  try {
    const signature = req.headers['x-razorpay-signature'];
    const isValid = signature && req.rawBody ? razorpayService.verifyWebhookSignature(req.rawBody.toString(), signature) : true;

    if (isValid) {
      const event = req.body;
      const paymentEntity = event.payload?.payment?.entity || event.payload?.payment_link?.entity;
      const subscriptionEntity = event.payload?.subscription?.entity;
      const userId = paymentEntity?.notes?.user_id || subscriptionEntity?.notes?.user_id;

      if (event.event === 'payment.captured' || event.event === 'payment_link.paid' || event.event === 'subscription.charged') {
        if (userId) {
          const plan = paymentEntity?.notes?.plan || subscriptionEntity?.notes?.plan || 'lite';
          await dbService.recordPayment(paymentEntity?.id || event.id, userId, paymentEntity?.amount || 14900, 'razorpay');
          await dbService.updatePaymentStatus(paymentEntity?.id || event.id, 'captured');

          const conversation = await dbService.getConversation(userId);
          if (conversation) {
            await dbService.updateConversation(conversation.id, {
              status: 'paid',
              lifecycle_state: 'live',
              state_entered_at: new Date().toISOString()
            });
            const user = await dbService.getUserById(userId);
            if (user?.email) {
              const liveUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/p/${conversation.id}`;
              await emailService.sendReactivationConfirmation(user.email, {
                userId,
                name: conversation.extracted_data?.name || 'there',
                siteUrl: liveUrl,
                plan: plan.toUpperCase()
              });
            }
          }
          console.log(`[RAZORPAY] Payment captured & subscription activated for user ${userId}`);
        }
      } else if (event.event === 'payment.failed' || event.event === 'subscription.halted') {
        if (userId) {
          const conversation = await dbService.getConversation(userId);
          if (conversation) {
            const now = new Date().toISOString();
            await dbService.updateConversation(conversation.id, {
              status: 'grace_period',
              lifecycle_state: 'preview_lapsed',
              state_entered_at: now
            });
            const user = await dbService.getUserById(userId);
            if (user?.email) {
              const retryUrl = `${process.env.HOST_URL || 'http://localhost:3000'}/payment/retry?userId=${userId}`;
              await emailService.sendPaymentFailedEmail(user.email, {
                userId,
                name: conversation.extracted_data?.name || 'there',
                retryUrl
              });
            }
          }
        }
      }
    }
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('[RAZORPAY WEBHOOK ERROR]', err.message);
    res.status(200).send('OK');
  }
});

// ==========================================
// Web REST API Endpoints (For Vercel & Web Studio)
// ==========================================

const MAX_HOURLY_QUOTA = parseInt(process.env.MAX_GENERATIONS_PER_HOUR, 10) || 60;

// 1. Web Resume PDF & Image Parsing (Protected with 50MB payload limit & per-user/IP quota)
app.post(
  '/api/web/parse-resume',
  SecurityMiddleware.limitBodySize(50 * 1024 * 1024),
  AuthMiddleware.quotaLimiter(dbService, 'resume_parse', MAX_HOURLY_QUOTA),
  async (req, res) => {
    try {
      const { base64Data, mimeType = 'application/pdf' } = req.body;
      if (!base64Data) {
        return res.status(400).json({ error: 'base64Data is required' });
      }

      const buffer = Buffer.from(base64Data, 'base64');
      const parsed = await aiService.parseResumeDocument(buffer, mimeType);
      if (!parsed || !parsed.extracted_data) {
        return res.status(422).json({ error: 'Could not extract portfolio data from document' });
      }

      res.json({
        success: true,
        data: parsed.extracted_data,
        branch: parsed.branch || 'A'
      });
    } catch (err) {
      console.error('[WEB API] parse-resume error:', err);
      res.status(500).json({ error: err.message || 'Resume parsing failed' });
    }
  }
);

// Template Catalog Endpoint: Exposes all 5 visual portfolio templates
app.get('/api/web/templates', (req, res) => {
  const { TemplateRegistry } = require('./templates/template-registry');
  res.json({
    success: true,
    templates: TemplateRegistry.getAllTemplates()
  });
});

// 2. Web Instant Portfolio Generation (Protected with 10MB payload limit, per-user quota & AI Sanitization)
app.post(
  '/api/web/generate',
  SecurityMiddleware.limitBodySize(10 * 1024 * 1024),
  AuthMiddleware.quotaLimiter(dbService, 'ai_generation', 10),
  async (req, res) => {
    try {
      const { data = {}, branch = 'A', styleHint = '', layout = 'auto-cycle', siteId: requestedSiteId, previousSiteId, regenerate = false, templateId } = req.body;
      
      // Takedown & Purge: If regenerating or replacing a previous preview, take down the old site immediately
      const oldSiteToPurge = previousSiteId || (regenerate && requestedSiteId ? requestedSiteId : null);
      if (oldSiteToPurge) {
        await hostingProvider.purge(oldSiteToPurge).catch(() => {});
      }

      let siteId = requestedSiteId;
      if (regenerate || !siteId) {
        siteId = `web-${crypto.randomUUID()}`;
      } else if (!siteId && req.user?.id) {
        const userDash = await dbService.getUserDashboardData(req.user.id);
        if (userDash?.siteId) {
          siteId = userDash.siteId;
        }
      }
      if (!siteId) {
        siteId = `web-${crypto.randomUUID()}`;
      }

      const chosenTemplate = templateId || data.templateId || data.template || (styleHint && TemplateRegistry.templates[styleHint] ? styleHint : (styleHint === 'light-swiss' ? 'engineering-archive' : null));
      const enrichedData = { ...data, style_hint: styleHint, layout, templateId: chosenTemplate };

      // Automated Content Safety & TOS Policy Sentinel
      const tosScan = securityService.evaluateContentSafetyAndTOS(enrichedData);
      if (!tosScan.isCompliant) {
        for (const viol of tosScan.violations) {
          await dbService.recordTosViolation({
            userId: req.user?.id || siteId,
            siteId,
            ruleId: viol.ruleId,
            section: viol.section,
            termTitle: viol.termTitle,
            severity: viol.severity,
            reason: viol.reason,
            evidenceSnippet: viol.evidenceSnippet,
            contentPreview: JSON.stringify(enrichedData).substring(0, 150)
          });
        }
        if (tosScan.violations.some(v => v.severity === 'CRITICAL')) {
          const critical = tosScan.violations.find(v => v.severity === 'CRITICAL');
          return res.status(400).json({
            error: `Terms of Service Violation: ${critical.section}`,
            message: `Your content was flagged under ${critical.termTitle}. Reason: ${critical.reason}`,
            evidence: critical.evidenceSnippet,
            section: critical.section
          });
        }
      }

      const designBrief = { creative_mode: styleHint || 'auto-cycle', layout: layout || 'auto-cycle', templateId: chosenTemplate };
      const rawSite = await siteGenerator.generateSite(
        { extracted_data: enrichedData, branch, id: siteId },
        enrichedData,
        designBrief
      );

      // AI Output Sanitization Boundary: Neutralize unsafe scripts / injections
      const site = securityService.sanitizeAiOutput(rawSite);

      // Deploy / Overwrite existing site directory with identical permanent URL
      const deployRes = await hostingProvider.deploy(siteId, site, enrichedData);
      const localUrl = `/p/${siteId}`;
      const liveUrl = deployRes.deployUrl;

      // If user is authenticated, associate site in DB and persist latest data
      if (req.user?.id) {
        await dbService.createSite(req.user.id, 'self_hosted', siteId).catch(() => { });
        const conversation = await dbService.getConversation(req.user.id);
        if (conversation?.id) {
          await dbService.updateConversation(conversation.id, {
            extracted_data: enrichedData,
            branch
          }).catch(() => {});
        }
      }

      res.json({
        success: true,
        siteId,
        previewUrl: localUrl,
        html: site.html,
        css: site.css,
        js: site.js,
        designBrief
      });
    } catch (err) {
      console.error('[WEB API] generate error:', err);
      res.status(500).json({ error: err.message || 'Generation failed' });
    }
  }
);

// 3. GitHub One-Click AI Portfolio Generation Endpoint
app.post(
  '/api/generate/github',
  SecurityMiddleware.limitBodySize(5 * 1024 * 1024),
  AuthMiddleware.quotaLimiter(dbService, 'ai_generation', MAX_HOURLY_QUOTA),
  async (req, res) => {
    try {
      const { githubUrl, username, mode, creative_mode, theme, layout, projectPresentation, previousSiteId } = req.body;
      const target = githubUrl || username;
      if (!target) {
        return res.status(400).json({ error: 'GitHub profile URL or username is required.' });
      }

      // Takedown & Purge: If regenerating from GitHub, take down the previous preview
      if (previousSiteId) {
        await hostingProvider.purge(previousSiteId).catch(() => {});
      }

      const selectedMode = mode || creative_mode || theme || 'auto-cycle';
      const result = await githubPipeline.generateFromGitHub(target, {
        mode: selectedMode !== 'auto' ? selectedMode : 'auto-cycle',
        layout,
        projectPresentation,
        previousSiteId
      });

      // If user is authenticated, associate site in DB
      if (req.user?.id && result.siteId) {
        await dbService.createSite(req.user.id, 'self_hosted', result.siteId).catch(() => {});
      }

      res.json(result);
    } catch (err) {
      console.error('[API] /api/generate/github error:', err.message);
      res.status(400).json({ error: err.message || 'GitHub portfolio generation failed.' });
    }
  }
);

// 4. GitHub Parse for Interactive Web Builder
app.post(
  '/api/web/parse-github',
  SecurityMiddleware.limitBodySize(5 * 1024 * 1024),
  AuthMiddleware.quotaLimiter(dbService, 'resume_parse', MAX_HOURLY_QUOTA),
  async (req, res) => {
    try {
      const { githubUrl, username } = req.body;
      const target = githubUrl || username;
      if (!target) {
        return res.status(400).json({ error: 'GitHub profile URL or username is required.' });
      }

      const result = await githubPipeline.parseForWebBuilder(target);
      res.json(result);
    } catch (err) {
      console.error('[API] /api/web/parse-github error:', err.message);
      res.status(400).json({ error: err.message || 'GitHub profile parsing failed.' });
    }
  }
);

// 5. GitHub Generation Job Status Endpoint
app.get('/api/generate/github/status/:jobId', (req, res) => {
  const job = githubPipeline.getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Generation job not found.' });
  }
  res.json(job);
});

// Helper to get or initialize PortfolioState for a siteId
function getOrInitPortfolioState(siteId) {
  if (portfolioCustomizerMap.has(siteId)) {
    return portfolioCustomizerMap.get(siteId);
  }
  const sitesBaseDir = path.join(process.cwd(), 'public', 'sites');
  const siteDir = path.join(sitesBaseDir, siteId);
  const htmlPath = path.join(siteDir, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    return null;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const cssPath = path.join(siteDir, 'style.css');
  const jsPath = path.join(siteDir, 'script.js');
  const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
  const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '';
  const state = new PortfolioState({ html, css, js, id: siteId });
  portfolioCustomizerMap.set(siteId, state);
  return state;
}

// 6. Portfolio Customizer State Endpoint (GET)
app.get('/api/portfolio/:siteId/customizer', (req, res) => {
  try {
    const { siteId } = req.params;
    const state = getOrInitPortfolioState(siteId);
    if (!state) {
      return res.status(404).json({ error: 'Portfolio not found or expired.' });
    }

    res.json({
      success: true,
      siteId,
      sections: state.getSectionsSummary(),
      hiddenSections: Array.from(state.hiddenSections),
      canUndo: state.canUndo(),
      canRedo: state.canRedo(),
      tokens: {
        sectionSpacing: state.designTokens.sectionSpacing || 'medium',
        borderIntensity: state.designTokens.borderOpacity || 'subtle',
        typeScale: state.designTokens.typeScale || 'balanced',
        theme: state.themeMode || 'auto'
      }
    });
  } catch (err) {
    console.error('[API] /api/portfolio/:siteId/customizer GET error:', err);
    res.status(500).json({ error: 'Could not load customizer state.' });
  }
});

// 7. Portfolio Customizer Action Endpoint (POST)
app.post('/api/portfolio/:siteId/customizer', async (req, res) => {
  try {
    const { siteId } = req.params;
    const { action, newOrder, sectionId, visible, token, value } = req.body;

    const state = getOrInitPortfolioState(siteId);
    if (!state) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    let validationResult = { valid: true };

    if (action === 'reorder') {
      validationResult = customizationQualityGate.validateReorder(state, newOrder);
      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.reason, code: 'INVALID_REORDER' });
      }
      state.reorderSections(newOrder);
    } else if (action === 'toggle_visibility') {
      validationResult = customizationQualityGate.validateVisibility(state, sectionId, visible);
      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.reason, code: 'PROTECTED_SECTION' });
      }
      state.toggleSectionVisibility(sectionId, visible);
    } else if (action === 'modify_token') {
      validationResult = customizationQualityGate.validateToken(state, token, value);
      if (!validationResult.valid) {
        return res.status(400).json({ error: validationResult.reason, code: 'INVALID_TOKEN' });
      }
      state.setToken(token, value);
    } else if (action === 'undo') {
      if (!state.undo()) {
        return res.status(400).json({ error: 'No further undo steps available.' });
      }
    } else if (action === 'redo') {
      if (!state.redo()) {
        return res.status(400).json({ error: 'No further redo steps available.' });
      }
    } else if (action === 'reset') {
      state.reset();
    } else {
      return res.status(400).json({ error: 'Invalid customization action.' });
    }

    // Render updated HTML/CSS/JS and update hosting provider
    const rendered = state.render();
    await hostingProvider.deploy(siteId, rendered);

    res.json({
      success: true,
      siteId,
      previewUrl: `/p/${siteId}?v=${Date.now()}`,
      sections: state.getSectionsSummary(),
      hiddenSections: Array.from(state.hiddenSections),
      canUndo: state.canUndo(),
      canRedo: state.canRedo(),
      tokens: {
        sectionSpacing: state.designTokens.sectionSpacing || 'medium',
        borderIntensity: state.designTokens.borderOpacity || 'subtle',
        typeScale: state.designTokens.typeScale || 'balanced',
        theme: state.themeMode || 'auto'
      }
    });
  } catch (err) {
    console.error('[API] /api/portfolio/:siteId/customizer POST error:', err);
    res.status(500).json({ error: err.message || 'Customization failed.' });
  }
});

// 8. Static ZIP Export Endpoint (POST)
app.post('/api/portfolio/:siteId/export', async (req, res) => {
  try {
    const { siteId } = req.params;
    const state = getOrInitPortfolioState(siteId);
    if (!state) {
      return res.status(404).json({ error: 'Portfolio not found or expired.' });
    }

    const zipBuffer = await StaticExporter.exportToZipBuffer(state, {
      siteId,
      exportedAt: new Date().toISOString()
    });

    if (req.query.format === 'json') {
      return res.json({
        success: true,
        siteId,
        sizeBytes: zipBuffer.length,
        deploymentGuides: {
          vercel: ['Download ZIP', 'Run vercel deploy or drag onto Vercel dashboard', 'Your site is live globally on Edge CDN'],
          netlify: ['Download ZIP', 'Drag project folder into Netlify Drop (app.netlify.com/drop)', 'Instant HTTPS static deployment'],
          githubPages: ['Download ZIP', 'Push files to a new GitHub repo', 'Go to Settings -> Pages -> Deploy from Main branch']
        }
      });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${siteId}-portfolio.zip"`);
    res.setHeader('X-Export-Guarantees', 'zero-localhost,zero-watermark,sanitized');
    res.send(zipBuffer);
  } catch (err) {
    console.error('[API] /api/portfolio/:siteId/export error:', err);
    res.status(500).json({ error: 'Could not package portfolio ZIP.' });
  }
});

// 9. Demo & Sample Portfolios Endpoint
app.get('/api/demo/samples', (req, res) => {
  const templates = TemplateRegistry.getAllTemplates();
  const samples = templates.map(t => ({
    id: t.id,
    name: t.name,
    role: t.category,
    badge: t.category,
    description: t.description,
    techStack: t.recommendedFor,
    previewUrl: `/p/${t.id}`
  }));
  res.json({ success: true, samples });
});

// 10. Admin Observability & Health Telemetry Endpoints
app.get('/api/admin/observability', (req, res) => {
  try {
    const report = BetaDashboard.generateReport({ isRealUserData: true });
    res.json({
      success: true,
      report
    });
  } catch (err) {
    console.error('[API] /api/admin/observability error:', err);
    res.status(500).json({ error: 'Failed to generate observability report.' });
  }
});

app.get('/api/admin/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    features: {
      githubSynthesis: true,
      customizer: true,
      staticExport: true,
      supabasePersistence: !!dbService,
      originIsolation: true
    }
  });
});

// 11. Multi-Input Upload & Adaptive Questionnaire Endpoints (Phase 31)
app.post('/api/upload/resume', async (req, res) => {
  try {
    const { base64Data, filename } = req.body || {};
    if (!base64Data) {
      return res.status(400).json({ error: 'No resume data provided.' });
    }

    const cleanBase64 = base64Data.replace(/^data:[a-zA-Z0-9/.-]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const validation = UploadValidator.validateResumeFile(buffer, { originalName: filename });

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Extract clean digital text from PDF or text buffer
    let resumeText = '';
    if (validation.mimeType === 'application/pdf' || (filename && filename.toLowerCase().endsWith('.pdf'))) {
      try {
        const pdfParse = require('pdf-parse');
        const pdfData = await pdfParse(buffer);
        resumeText = (pdfData && pdfData.text) ? pdfData.text.trim() : '';
      } catch (pdfErr) {
        console.warn('[API] PDF parse error in upload route:', pdfErr.message);
      }
    }
    if (!resumeText) {
      resumeText = buffer.toString('utf8').replace(/[^\x20-\x7E\n]/g, ' ').slice(0, 4000);
    }

    let deepParsed = {};
    if (aiService) {
      try {
        const rawParsed = await aiService.parseResumeDocument(buffer, validation.mimeType || 'application/pdf');
        if (rawParsed && rawParsed.extracted_data) {
          deepParsed = rawParsed.extracted_data;
        } else if (rawParsed) {
          deepParsed = rawParsed;
        }
      } catch (parseErr) {
        console.warn('[API] Deep resume parser fallback:', parseErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Resume validated and analyzed successfully',
      fileType: validation.fileType,
      mimeType: validation.mimeType,
      pages: validation.pages || 1,
      resumeData: {
        ...deepParsed,
        rawBase64: cleanBase64,
        mimeType: validation.mimeType
      }
    });
  } catch (err) {
    console.error('[API] /api/upload/resume error:', err);
    res.status(500).json({ error: 'Failed to process resume upload.' });
  }
});

app.post('/api/upload/photo', (req, res) => {
  try {
    const { base64Data, filename } = req.body || {};
    if (!base64Data) {
      return res.status(400).json({ error: 'No image data provided.' });
    }

    const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const validation = UploadValidator.validateImage(buffer, { originalName: filename });

    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const dataUrl = `data:image/${validation.format};base64,${cleanBase64}`;
    res.json({
      success: true,
      format: validation.format,
      dataUrl
    });
  } catch (err) {
    console.error('[API] /api/upload/photo error:', err);
    res.status(500).json({ error: 'Failed to process photo upload.' });
  }
});

app.post('/api/upload/images', (req, res) => {
  try {
    const { images = [] } = req.body || {};
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided.' });
    }
    if (images.length > 3) {
      return res.status(400).json({ error: 'Maximum 3 images allowed.' });
    }

    const validatedImages = [];
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      const rawBase64 = typeof item === 'string' ? item : item.base64Data || item.url || '';
      const cleanBase64 = rawBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');
      const validation = UploadValidator.validateImage(buffer, { originalName: item.filename || `image-${i + 1}` });

      if (!validation.valid) {
        return res.status(400).json({ error: `Image #${i + 1} is invalid: ${validation.error}` });
      }

      validatedImages.push({
        url: `data:image/${validation.format};base64,${cleanBase64}`,
        format: validation.format,
        caption: item.caption || `Artifact Specimen #${i + 1}`
      });
    }

    res.json({
      success: true,
      count: validatedImages.length,
      images: validatedImages
    });
  } catch (err) {
    console.error('[API] /api/upload/images error:', err);
    const recovery = ErrorRecoveryService.mapError(err, 'image');
    res.status(500).json({ error: recovery.whatHappened, recovery });
  }
});

app.post('/api/questionnaire/adaptive', (req, res) => {
  try {
    const currentProfile = req.body?.currentProfile || {};
    const questions = AdaptiveQuestionnaire.getAdaptiveQuestions(currentProfile);
    res.json({
      success: true,
      questions
    });
  } catch (err) {
    console.error('[API] /api/questionnaire/adaptive error:', err);
    res.status(500).json({ error: 'Failed to generate adaptive questions.' });
  }
});

app.post('/api/generate/unified', async (req, res) => {
  try {
    const input = req.body || {};

    // 1. If GitHub username is provided, fetch complete GitHub profile & synthesize real case studies
    if (input.githubData?.username) {
      try {
        const { GitHubParser } = require('./services/github/github-parser');
        const { GitHubClient } = require('./services/github/github-client');
        const { GitHubNormalizer } = require('./services/github/github-normalizer');
        const { GitHubProfileSynthesizer } = require('./services/github-profile-synthesizer');

        const parsed = GitHubParser.parse(input.githubData.username);
        if (parsed.valid) {
          const ghClient = new GitHubClient();
          const rawGithub = await ghClient.fetchCompleteProfile(parsed.username);
          const normGithub = GitHubNormalizer.normalize(rawGithub);
          const synth = new GitHubProfileSynthesizer(aiService);
          const synthesizedGithub = await synth.synthesize(normGithub);

          input.githubData = { ...input.githubData, ...synthesizedGithub };
        }
      } catch (ghErr) {
        console.warn('[API] GitHub deep fetch fallback:', ghErr.message);
      }
    }

    // 2. If resume was provided with rawBase64 or extractedTextSnippet, run deep parser if not yet done
    if (input.resumeData?.rawBase64 && (!input.resumeData.skills || input.resumeData.skills.length === 0 || !input.resumeData.projects || input.resumeData.projects.length === 0) && aiService) {
      try {
        const buffer = Buffer.from(input.resumeData.rawBase64, 'base64');
        const rawParsed = await aiService.parseResumeDocument(buffer, input.resumeData.mimeType || 'application/pdf');
        if (rawParsed && rawParsed.extracted_data) {
          input.resumeData = { ...input.resumeData, ...rawParsed.extracted_data };
        } else if (rawParsed) {
          input.resumeData = { ...input.resumeData, ...rawParsed };
        }
      } catch (resErr) {
        console.warn('[API] Deep resume parse fallback:', resErr.message);
      }
    }

    const normalized = UnifiedProfileNormalizer.normalize(input);
    const { TemplateRegistry } = require('./templates/template-registry');
    const chosenTemplate = (input.preferences?.theme && input.preferences.theme !== 'auto') ? input.preferences.theme : null;
    const selectedTemplate = TemplateRegistry.selectTemplate(chosenTemplate, normalized);

    const siteGen = new SiteGenerator();
    const siteResult = await siteGen.generateSite({
      id: `unified-${Date.now()}`,
      status: 'active'
    }, { ...normalized, templateId: selectedTemplate.id }, {
      theme: selectedTemplate.id,
      templateId: selectedTemplate.id,
      creative_mode: selectedTemplate.id
    });

    const siteId = `web-${crypto.randomUUID()}`;
    await hostingProvider.deploy(siteId, siteResult, normalized);

    // Also write to filesystem for local preview serving if needed
    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
    fs.mkdirSync(siteDir, { recursive: true });
    fs.writeFileSync(path.join(siteDir, 'index.html'), siteResult.html, 'utf8');
    fs.writeFileSync(path.join(siteDir, 'profile.json'), JSON.stringify(normalized, null, 2), 'utf8');

    // Audit with Legacy Vibe Detector
    const vibeAudit = LegacyVibeDetector.evaluate(siteResult.html, siteResult.css, {
      iaModel: siteResult.designBrief?.informationArchitecture,
      visualUniverse: siteResult.designBrief?.visualUniverse
    });

    // Record Telemetry
    productTelemetry.recordEvent(EVENT_TYPES.GENERATION_COMPLETED, null, {
      siteId,
      source: 'unified',
      vibeScore: vibeAudit.score
    });

    res.json({
      success: true,
      siteId,
      previewUrl: `/p/${siteId}`,
      profileData: normalized,
      vibeAudit,
      designBlueprint: siteResult.designBlueprint
    });
  } catch (err) {
    console.error('[API] /api/generate/unified error:', err);
    res.status(500).json({ error: err.message || 'Failed to synthesize portfolio from unified input.' });
  }
});

/// Studio & Design Engine API Endpoints
app.get('/api/design-resources', (req, res) => {
  res.json({
    success: true,
    totalCount: 0,
    categories: ['UI Design', 'Color Palettes', 'Typography', '3D & Motion'],
    resultsCount: 0,
    resources: []
  });
});

app.post('/api/design-resources/generate', async (req, res) => {
  try {
    const config = req.body || {};
    const templateId = config.templateId || config.theme || 'cosmic-astronaut';
    const result = TemplateRegistry.render(templateId, config);

    res.json({
      success: true,
      html: result.html,
      css: result.css || '',
      js: result.js || '',
      designBlueprint: {
        templateId,
        templateName: TemplateRegistry.getTemplate(templateId)?.name || 'Custom Template',
        palette: TemplateRegistry.getTemplate(templateId)?.palette || {}
      },
      contentProfile: config
    });
  } catch (err) {
    console.error('[DESIGN STUDIO API] generate error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/studio/modes', (req, res) => {
  res.json({
    success: true,
    modes: Object.keys(VISUAL_UNIVERSES),
    universes: VISUAL_UNIVERSES,
    iaModels: IA_MODELS
  });
});

app.get('/api/studio/history', (req, res) => {
  res.json({ success: true, history: designEngine.memory.getRecentHistory() });
});

// Figma MCP & Design API Routes
app.post('/api/figma/import', async (req, res) => {
  try {
    const { figmaUrl } = req.body;
    if (!figmaUrl) return res.status(400).json({ error: 'Figma URL is required' });

    const parsed = figmaService.parseFigmaUrl(figmaUrl);
    if (!parsed?.fileKey) {
      return res.status(400).json({ error: 'Invalid Figma URL format' });
    }

    const tokens = await figmaService.extractDesignTokens(parsed.fileKey, parsed.nodeId);
    res.json({ success: true, tokens });
  } catch (err) {
    console.error('[FIGMA API] Import error:', err.message);
    res.status(500).json({ error: err.message || 'Figma import failed' });
  }
});

app.post('/api/figma/generate', async (req, res) => {
  try {
    const { figmaUrl, data = {} } = req.body;
    const enrichedData = { ...data, figma_url: figmaUrl };
    const designBrief = { creative_mode: 'auto-cycle', layout: 'auto-cycle' };
    const site = await siteGenerator.generateSite(
      { extracted_data: enrichedData },
      enrichedData,
      designBrief
    );

    res.json({
      success: true,
      html: site.html,
      css: site.css,
      js: site.js,
      designBrief
    });
  } catch (err) {
    console.error('[FIGMA API] Generation error:', err.message);
    res.status(500).json({ error: err.message || 'Figma portfolio generation failed' });
  }
});

// 3. Web Razorpay Payment Order
app.post('/api/web/create-order', async (req, res) => {
  try {
    const { siteId, plan = 'lite' } = req.body;
    const PRICING_MAP = {
      lite: 14900,
      pro: 14900,
      all_access: 14900
    };
    const amountInPaise = PRICING_MAP[String(plan).toLowerCase()] || 14900;

    if (!razorpayService) {
      return res.json({
        success: true,
        isCustomCheckout: false,
        paymentUrl: process.env.PERSONAL_UPI_ID
          ? `upi://pay?pa=${process.env.PERSONAL_UPI_ID}&pn=PortfolioBot&am=${amountInPaise / 100}&cu=INR`
          : 'https://razorpay.me/@portfoliobot',
        amount: amountInPaise,
        plan
      });
    }

    try {
      // 1. Try Razorpay Orders API for in-page Checkout modal
      const order = await razorpayService.createOrder(
        amountInPaise,
        'INR',
        `rcpt_${String(siteId || 'web').slice(0, 8)}_${Date.now()}`,
        { siteId: siteId || 'web-user', plan, userId: req.user?.id || siteId }
      );

      return res.json({
        success: true,
        isCustomCheckout: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        plan,
        siteId
      });
    } catch (orderErr) {
      console.warn('[RAZORPAY ORDER FALLBACK]', orderErr.message);
      // 2. Fallback to Payment Link if Orders API is rate limited
      try {
        const paymentLink = await razorpayService.createPaymentLink(
          siteId || 'web-user',
          plan,
          amountInPaise,
          'INR'
        );

        return res.json({
          success: true,
          isCustomCheckout: false,
          paymentUrl: paymentLink.shortUrl || paymentLink.url,
          orderId: paymentLink.paymentLinkId,
          amount: amountInPaise,
          plan
        });
      } catch (rzpErr) {
        console.warn('[RAZORPAY LINK FALLBACK]', rzpErr.message);
        return res.json({
          success: true,
          isCustomCheckout: false,
          paymentUrl: process.env.PERSONAL_UPI_ID
            ? `upi://pay?pa=${process.env.PERSONAL_UPI_ID}&pn=PortfolioBot&am=${amountInPaise / 100}&cu=INR`
            : 'https://razorpay.me/@portfoliobot',
          amount: amountInPaise,
          plan
        });
      }
    }
  } catch (err) {
    console.error('[WEB API] create-order error:', err);
    res.status(500).json({ error: err.message || 'Order creation failed' });
  }
});

// 4. Web Razorpay Payment Verification & Anti-Tampering Approval
app.post('/api/web/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      siteId,
      plan = 'lite'
    } = req.body;

    if (!razorpay_payment_id) {
      return res.status(400).json({ error: 'Missing razorpay_payment_id' });
    }

    const PRICING_MAP = {
      lite: 14900,
      pro: 14900,
      all_access: 14900
    };
    const expectedAmount = PRICING_MAP[String(plan).toLowerCase()] || 14900;

    // Test runner mock payment support
    if ((process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') && razorpay_payment_id.startsWith('pay_mock_')) {
      const deployResult = await hostingProvider.approveAndUnwatermark(siteId);
      return res.json({
        success: true,
        approved: true,
        message: 'Payment approved (Test Mode)',
        paymentId: razorpay_payment_id,
        amount: expectedAmount,
        plan,
        liveUrl: deployResult.deployUrl || `/p/${siteId}`,
        siteId
      });
    }

    if (!razorpayService) {
      // Mock / Dev approval fallback
      const unwatermarked = await hostingProvider.approveAndUnwatermark(siteId);
      return res.json({
        success: true,
        approved: true,
        message: 'Payment approved (Development Mode)',
        liveUrl: unwatermarked.deployUrl || `/p/${siteId}`,
        plan
      });
    }

    // Anti-Tampering Validation & Approval Engine
    const verification = await razorpayService.verifyAndApprovePayment({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      expectedPlan: plan,
      expectedAmount
    });

    if (!verification.approved) {
      return res.status(400).json({ error: 'Payment could not be verified' });
    }

    // 1. Record payment in database
    const userId = req.user?.id || siteId || 'web-user';
    await dbService.recordPayment(razorpay_payment_id, userId, verification.amount, 'razorpay').catch(() => {});
    await dbService.updatePaymentStatus(razorpay_payment_id, 'captured').catch(() => {});

    if (req.user?.id) {
      await dbService.updateUser(req.user.id, { role: 'pro', subscription_status: 'active' }).catch(() => {});
    }

    // 2. Mark site / conversation as active & paid
    if (siteId) {
      await dbService.updateConversation(siteId, {
        status: 'paid',
        lifecycle_state: 'live',
        state_entered_at: new Date().toISOString()
      }).catch(() => {});
    }

    // 3. Remove preview watermark and re-deploy cleanly
    const deployResult = await hostingProvider.approveAndUnwatermark(siteId);

    res.json({
      success: true,
      approved: true,
      message: 'Payment verified and approved! Preview watermark has been removed.',
      paymentId: verification.paymentId,
      amount: verification.amount,
      plan: verification.plan,
      liveUrl: deployResult.deployUrl || `/p/${siteId}`,
      siteId
    });
  } catch (err) {
    console.error('[WEB API] verify-payment error:', err.message);
    res.status(400).json({ error: err.message || 'Payment verification failed' });
  }
});

// ==========================================
// Custom Domain & Subdomain API Endpoints
// ==========================================
app.post('/api/domain/register', async (req, res) => {
  try {
    const { siteId, domain, type = 'custom', userId } = req.body;
    if (!siteId || !domain) {
      return res.status(400).json({ error: 'siteId and domain are required' });
    }
    let record;
    if (type === 'subdomain') {
      record = await customDomainService.claimSubdomain(siteId, domain, userId);
    } else {
      record = await customDomainService.registerCustomDomain(siteId, domain, userId);
    }
    res.json({ success: true, record });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/domain/status/:domain', async (req, res) => {
  try {
    const status = await customDomainService.checkDNSStatus(req.params.domain);
    res.json({ success: true, ...status });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/domain/info/:siteId', (req, res) => {
  const info = customDomainService.getDomainInfo(req.params.siteId);
  res.json({ success: true, info });
});

// ==========================================
// Lifecycle Automation & Cron Endpoint (Section 6)
// ==========================================
app.all('/api/cron/lifecycle', async (req, res) => {
  try {
    const cronSecret = req.headers['authorization'] || req.query.secret;
    if (process.env.CRON_SECRET && cronSecret !== `Bearer ${process.env.CRON_SECRET}` && cronSecret !== process.env.CRON_SECRET) {
      return res.status(401).json({ error: 'Unauthorized cron request' });
    }
    const results = await lifecycleService.runLifecycleCycle();
    res.json({ success: true, timestamp: new Date().toISOString(), results });
  } catch (err) {
    console.error('[CRON API ERROR]', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Authentication & Security Middleware Pipeline
// ==========================================
app.use(AuthMiddleware.authenticate(dbService, securityService));
app.use(SecurityMiddleware.csrfProtection());

const authHandler = new AuthHandler(dbService, securityService, emailService);

// Strict rate limiter for brute-force sensitive auth routes
const authLimiter = SecurityMiddleware.rateLimiter({
  max: 30,
  windowMs: 15 * 60 * 1000,
  actionName: 'auth_strict'
});

// Standard rate limiter for authenticated endpoints
const standardApiLimiter = SecurityMiddleware.rateLimiter({
  max: 60,
  windowMs: 60 * 1000,
  actionName: 'standard_api'
});

// Direct Page Routing for Authentication UI
app.get(['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'], (req, res) => {
  const viewMap = {
    '/login': 'login',
    '/signup': 'signup',
    '/forgot-password': 'forgot',
    '/reset-password': 'reset',
    '/verify-email': 'verify'
  };
  const view = viewMap[req.path] || 'login';
  const queryStr = req.url.includes('?') ? '&' + req.url.split('?')[1] : '';
  res.redirect(`/auth.html?view=${view}${queryStr}`);
});

app.get(['/dashboard', '/dash'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'web/dashboard.html'));
});

app.get(['/studio', '/studio.html', '/builder', '/generator'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'web/studio.html'));
});

app.get(['/profile', '/account', '/settings'], (req, res) => {
  res.sendFile(path.join(process.cwd(), 'web/profile.html'));
});

// ==========================================
// Authentication REST API Endpoints
// ==========================================

// 1. Sign Up
app.post(
  '/api/auth/signup',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.signup(req, res)
);

// 2. Sign In (with Progressive Delays on Failed Attempts)
app.post(
  '/api/auth/login',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.login(req, res)
);

// 2b. Social Sign In & Sign Up (Google & GitHub)
app.post(
  '/api/auth/social',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.social(req, res)
);

// 2c. Google OAuth 2.0 Account Chooser Redirect & Callback Flow
app.get(
  '/api/auth/google',
  (req, res) => authHandler.googleRedirect(req, res)
);

app.get(
  '/api/auth/google/callback',
  (req, res) => authHandler.googleCallback(req, res)
);

// 2d. GitHub OAuth 2.0 Redirect & Callback Flow
app.get(
  '/api/auth/github',
  (req, res) => authHandler.githubRedirect(req, res)
);

app.get(
  '/api/auth/github/callback',
  (req, res) => authHandler.githubCallback(req, res)
);

// 2d. Google OAuth 2.0 Identity Services Config & Token Verification
app.get(
  '/api/auth/google/config',
  (req, res) => authHandler.getGoogleConfig(req, res)
);

app.post(
  '/api/auth/google/verify',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.googleVerify(req, res)
);

// 3. Sign Out (Destroys DB session & Clears HttpOnly Cookie)
app.post(
  '/api/auth/logout',
  AuthMiddleware.requireAuth,
  (req, res) => authHandler.logout(req, res)
);

// 4. Current Authenticated Profile
app.get(
  '/api/auth/me',
  AuthMiddleware.requireAuth,
  (req, res) => authHandler.getMe(req, res)
);

// 5. Active Sessions & Device Management (Security Settings)
app.get(
  '/api/auth/sessions',
  AuthMiddleware.requireAuth,
  (req, res) => authHandler.getSessions(req, res)
);

// 6. Revoke Specific Active Session
app.delete(
  '/api/auth/sessions/:id',
  AuthMiddleware.requireAuth,
  (req, res) => authHandler.revokeSession(req, res)
);

// 7. Revoke All Other Active Sessions ("Log out of all devices")
app.delete(
  '/api/auth/sessions/all',
  AuthMiddleware.requireAuth,
  (req, res) => authHandler.revokeAllOtherSessions(req, res)
);

// 8. Secure Account Deletion (Re-authentication required)
app.post(
  '/api/auth/delete-account',
  AuthMiddleware.requireAuth,
  SecurityMiddleware.limitBodySize(50 * 1024),
  (req, res) => authHandler.deleteAccount(req, res)
);

// 9. Forgot Password (Anti-Enumeration Generic Response)
app.post(
  '/api/auth/forgot-password',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.forgotPassword(req, res)
);

// 10. Reset Password (Single-use Token Hash Validation)
app.post(
  '/api/auth/reset-password',
  SecurityMiddleware.limitBodySize(50 * 1024),
  authLimiter,
  (req, res) => authHandler.resetPassword(req, res)
);

// 11. Email Verification
app.post(
  '/api/auth/verify-email',
  SecurityMiddleware.limitBodySize(50 * 1024),
  (req, res) => authHandler.verifyEmail(req, res)
);

// ==========================================
// Admin Panel Endpoints & Manual Overrides (Protected with requireAdmin)
// ==========================================
app.get('/api/admin/overview', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const stats = await dbService.getAdminOverviewStats();
    const logs = await dbService.getRecentAuditLogs(15);
    res.json({ success: true, stats, logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/users', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const users = await dbService.getAllAdminUsers(100);
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/logs', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const logs = await dbService.getRecentAuditLogs(50);
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/override-grace', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const { userId, extraDays = 5, adminId = 'admin', reason = 'Support override' } = req.body;
    const result = await lifecycleService.overrideGracePeriod(userId, extraDays, adminId, reason);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/force-restore', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const { userId, adminId = 'admin', reason = 'Admin manual restore' } = req.body;
    const result = await lifecycleService.forceRestoreAccount(userId, adminId, reason);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/force-takedown', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const { userId, adminId = 'admin', reason = 'TOS violation' } = req.body;
    const result = await lifecycleService.forceTakedownAccount(userId, adminId, reason);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/violations', AuthMiddleware.requireAdmin, async (req, res) => {
  try {
    const violations = await dbService.getTosViolations(50);
    res.json({ success: true, violations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// User Dashboard Endpoint (Protected against IDOR - Derived strictly from server session)
// ==========================================
app.get('/api/web/dashboard', AuthMiddleware.requireAuth, async (req, res) => {
  try {
    // Strictly derive target userId from trusted server session (IDOR Defense)
    const targetUserId = req.user.id;
    const data = await dbService.getUserDashboardData(targetUserId);
    if (!data || !data.user) {
      return res.status(404).json({ error: 'User dashboard not found' });
    }

    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Pro Portfolio: Contact Lead & Analytics Beacon
// ==========================================
app.post('/api/sites/:siteId/contact', async (req, res) => {
  try {
    const { siteId } = req.params;
    const { name, email, message, subject } = req.body;

    // Record lead in analytics events
    await dbService.recordAnalyticsEvent(siteId, 'contact_submit', null, null, { name, email, message, subject });

    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);

    // 1. Send instant alert to site owner on Telegram if available
    if (telegramHandler) {
      const user = await dbService.getUser(siteId) || await dbService.getUserById(siteId);
      if (user?.phone_number) {
        const leadMsg = `📬 **New Client Lead from your Portfolio!**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** "${message}"`;
        await telegramHandler.sendSafe(user.phone_number, leadMsg);
      }
    }

    // 2. Send direct email notification to the portfolio owner
    let ownerEmail = null;
    let ownerName = 'Portfolio Creator';

    // A. Lookup from database
    try {
      const { data: siteRecord } = await dbService.client.from('sites').select('*, users(*)').eq('provider_site_id', siteId).single();
      if (siteRecord?.users?.email) {
        ownerEmail = siteRecord.users.email;
        ownerName = siteRecord.users.name || siteRecord.users.username || ownerName;
      }
    } catch (e) {}

    // B. Lookup from siteDir profile.json fallback
    if (!ownerEmail && fs.existsSync(path.join(siteDir, 'profile.json'))) {
      try {
        const profile = JSON.parse(fs.readFileSync(path.join(siteDir, 'profile.json'), 'utf8'));
        ownerEmail = profile.email || profile.identity?.email || profile.contact?.email;
        ownerName = profile.name || profile.identity?.name || ownerName;
      } catch (e) {}
    }

    if (ownerEmail && emailService) {
      await emailService.sendMail({
        to: ownerEmail,
        subject: `📬 New Inquiry from your Portfolio: ${name || 'Recruiter / Client'}`,
        html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #0B0F19; color: #FFFFFF; border-radius: 16px; border: 1px solid rgba(255,255,255,0.15);">
            <div style="font-size: 0.85rem; color: #38BDF8; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Portfolio Lead Alert</div>
            <h2 style="color: #FFFFFF; margin: 0 0 16px 0; font-size: 1.5rem;">📬 New Message from your Portfolio</h2>
            <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.5;">Hi <strong>${ownerName}</strong>, someone just reached out to you through your online portfolio!</p>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #38BDF8;">
              <p style="margin: 0 0 10px 0; font-size: 0.95rem;"><strong>From / Recruiter:</strong> ${name || 'Prospective Client'}</p>
              <p style="margin: 0 0 10px 0; font-size: 0.95rem;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a></p>
              ${subject ? `<p style="margin: 0 0 10px 0; font-size: 0.95rem;"><strong>Subject:</strong> ${subject}</p>` : ''}
              <p style="margin: 0 0 6px 0; font-size: 0.95rem;"><strong>Message:</strong></p>
              <p style="margin: 0; color: #E2E8F0; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${email}?subject=Re: Portfolio Inquiry" style="display: inline-block; background: #22C55E; color: #000000; font-weight: 800; font-size: 0.95rem; padding: 12px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 14px rgba(34,197,94,0.4);">
                Reply Directly to ${name || 'Sender'} ➔
              </a>
            </div>
          </div>
        `,
        meta: { sequence_type: 'portfolio_contact_lead' }
      });
    }

    res.json({ success: true, message: 'Message delivered directly to creator!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sites/:siteId/analytics', async (req, res) => {
  try {
    const { siteId } = req.params;
    const { eventType = 'page_view', visitorHash = null, referrer = null } = req.body;
    await dbService.recordAnalyticsEvent(siteId, eventType, visitorHash, referrer);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Direct Portfolio Web Hosting Route
app.use('/sites', express.static(path.join(process.cwd(), 'public', 'sites')));

// Serve Web Studio
app.use(express.static(path.join(process.cwd(), 'web')));

// ==========================================
// Portfolio Owner Resume PDF Download Route
// ==========================================
app.get(['/p/:siteId/resume.pdf', '/api/sites/:siteId/resume.pdf'], async (req, res) => {
  const siteId = req.params.siteId;
  const sitesBaseDir = path.join(process.cwd(), 'public', 'sites');

  if (!siteId || !/^[a-zA-Z0-9_-]+$/.test(siteId) || !securityService.isPathSafe(sitesBaseDir, siteId)) {
    return res.status(400).send('Invalid portfolio identifier.');
  }

  const siteDir = path.join(sitesBaseDir, siteId);
  const pdfPath = path.join(siteDir, 'resume.pdf');
  const profilePath = path.join(siteDir, 'profile.json');

  let profile = {};
  if (fs.existsSync(profilePath)) {
    try {
      profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    } catch (e) {}
  }

  const candidateName = profile.name || 'Candidate';
  const sanitizedFileName = `${candidateName.replace(/[^a-zA-Z0-9_-]/g, '_')}_Resume.pdf`;

  if (fs.existsSync(pdfPath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);
    return fs.createReadStream(pdfPath).pipe(res);
  }

  try {
    const { ResumePdfGenerator } = require('./services/resume-pdf-generator');
    const pdfBuf = await ResumePdfGenerator.generateResumePdfBuffer(profile);
    fs.mkdirSync(siteDir, { recursive: true });
    fs.writeFileSync(pdfPath, pdfBuf);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);
    return res.send(pdfBuf);
  } catch (err) {
    console.error('[PDF] Generation error:', err);
    return res.status(500).send('Failed to generate resume PDF.');
  }
});

// ==========================================
// Portfolio Live & Preview Route (/p/:siteId)
// Injects Diagonal Watermark & Floating Bar for Unpaid Previews
// Serves Clean, Pristine Website for Subscribed/Paid Users
// ==========================================
app.get('/p/:siteId', async (req, res) => {
  const siteId = req.params.siteId;
  const sitesBaseDir = path.join(process.cwd(), 'public', 'sites');

  // Strict identifier validation & Path Traversal check
  if (!siteId || !/^[a-zA-Z0-9_-]+$/.test(siteId) || !securityService.isPathSafe(sitesBaseDir, siteId)) {
    return res.status(400).send('Invalid portfolio identifier.');
  }

  const filePath = path.join(sitesBaseDir, siteId, 'index.html');
  if (!fs.existsSync(filePath)) {
    // If siteId is a registered template ID, render a rich live demo showcase on the fly
    const template = TemplateRegistry.templates[siteId];
    if (template) {
      const demoData = {
        name: 'Alex Vance',
        title: `${template.name} Live Showcase`,
        headline: template.description || 'Full-Stack & Distributed Systems Architect',
        role: template.category || 'Lead Engineer',
        bio: `Explore the immersive 3D spatial interface crafted in the ${template.name} theme. Integrating real-time WebGL physics, glassmorphic HUD telemetry, and interactive project showcases.`,
        about: `Senior Systems & Frontend Architect with over 7 years of engineering experience across WebGL, cloud infrastructure, and modern design systems.`,
        skills: ['TypeScript', 'Three.js', 'React', 'Node.js', 'Rust', 'WebGL', 'Docker', 'GraphQL', 'TailwindCSS'],
        projects: [
          {
            title: 'Neural Matrix Visualization',
            name: 'Neural Matrix Visualization',
            description: 'Real-time multi-dimensional neural network topological map with 60 FPS GPU-accelerated node shaders.',
            desc: 'Real-time multi-dimensional neural network topological map with 60 FPS GPU-accelerated node shaders.',
            tags: ['WebGL', 'Three.js', 'TypeScript', 'GLSL'],
            tech: ['WebGL', 'Three.js', 'TypeScript', 'GLSL'],
            link: 'https://github.com/Abdul-Aziz-Nooruddin',
            url: 'https://github.com/Abdul-Aziz-Nooruddin'
          },
          {
            title: 'Algorand Escrow Protocol',
            name: 'Algorand Escrow Protocol',
            description: 'Decentralized multi-signature smart contract settlement architecture with sub-second execution guarantees.',
            desc: 'Decentralized multi-signature smart contract settlement architecture with sub-second execution guarantees.',
            tags: ['Rust', 'Algorand', 'Solidity', 'Web3'],
            tech: ['Rust', 'Algorand', 'Solidity', 'Web3'],
            link: 'https://github.com/Abdul-Aziz-Nooruddin',
            url: 'https://github.com/Abdul-Aziz-Nooruddin'
          },
          {
            title: 'Autonomous Edge Telemetry',
            name: 'Autonomous Edge Telemetry',
            description: 'Distributed IoT sensory streaming platform handling 250k events/second with automated anomaly detection.',
            desc: 'Distributed IoT sensory streaming platform handling 250k events/second with automated anomaly detection.',
            tags: ['Go', 'Kafka', 'Docker', 'Kubernetes'],
            tech: ['Go', 'Kafka', 'Docker', 'Kubernetes'],
            link: 'https://github.com/Abdul-Aziz-Nooruddin',
            url: 'https://github.com/Abdul-Aziz-Nooruddin'
          }
        ],
        experience: [
          {
            company: 'Nexus Cybernetics',
            role: 'Lead Systems Engineer',
            period: '2023 — Present',
            description: 'Architecting next-generation 3D spatial interfaces and microservices for high-frequency telemetry.'
          },
          {
            company: 'Apex Horizon Labs',
            role: 'Senior Full-Stack Developer',
            period: '2021 — 2023',
            description: 'Built real-time collaborative workspace platforms and WebGL data visualization dashboards.'
          }
        ],
        contact: {
          email: 'alex.vance@myfolio.tech',
          github: 'https://github.com/Abdul-Aziz-Nooruddin',
          linkedin: 'https://linkedin.com',
          telegram: 'https://t.me/ai_portfolio_generator_bot'
        },
        social: {
          github: 'https://github.com/Abdul-Aziz-Nooruddin',
          linkedin: 'https://linkedin.com'
        }
      };

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src *; frame-ancestors *;");
      res.setHeader('X-Content-Type-Options', 'nosniff');
      const rendered = template.render(demoData);
      const htmlOutput = typeof rendered === 'string' ? rendered : (rendered?.html || '');
      return res.send(htmlOutput);
    }

    // If it is a web preview site ID that was auto-purged after the 24-hour window, render friendly expired page
    if (siteId.startsWith('web-') || siteId.includes('-')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24-Hour Free Preview Expired — myfolio.tech</title>
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #0F172A 0%, #020617 100%);
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .expired-card {
      max-width: 580px;
      width: 100%;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 28px;
      padding: clamp(28px, 5vw, 44px);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(2, 132, 199, 0.15);
      backdrop-filter: blur(20px);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .badge-expired {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      color: #FBBF24;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .expired-title {
      font-size: clamp(1.6rem, 3.5vw, 2.1rem);
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.2;
      color: #FFFFFF;
    }
    .expired-desc {
      color: #94A3B8;
      font-size: 0.96rem;
      line-height: 1.6;
    }
    .features-list {
      width: 100%;
      background: rgba(2, 6, 23, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 20px;
      text-align: left;
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .feature-row {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #CBD5E1;
    }
    .feature-row span { color: #38BDF8; font-weight: bold; }
    .btn-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      margin-top: 8px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 1rem;
      padding: 14px 24px;
      border-radius: 14px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(2, 132, 199, 0.5);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #E2E8F0;
      font-weight: 700;
      font-size: 0.92rem;
      padding: 12px 20px;
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
    }
  </style>
</head>
<body>
  <div class="expired-card">
    <div class="badge-expired">⏳ 24-Hour Preview Expired</div>
    <h1 class="expired-title">Free Preview Window Has Concluded</h1>
    <p class="expired-desc">
      Free preview websites stay live for 24 hours (with a 5-day grace period before permanent deletion). Your profile data and preferences are safely saved in Studio!
    </p>

    <div class="features-list">
      <div class="feature-row"><span>✓</span> <b>Instant Re-activation:</b> Re-launch fresh 3D preview in 1 click in Web Studio.</div>
      <div class="feature-row"><span>✓</span> <b>Lifetime Starter (₹149):</b> 24/7 Permanent Netlify CDN hosting + ZIP export.</div>
      <div class="feature-row"><span>✓</span> <b>Zero Watermarks:</b> Clean production domain for recruiters and clients.</div>
    </div>

    <div class="btn-actions">
      <a href="/studio.html" class="btn-primary">⚡ Re-activate Fresh 3D Studio Preview</a>
      <a href="/subscribe" class="btn-secondary">💎 Unlock Permanent Netlify Hosting (₹149 one-time)</a>
    </div>
  </div>
</body>
</html>`);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(TemplateRegistry.render404Page(siteId));
  }

  // Set permissive CSP allowing API beacons, Three.js CDNs, fonts, and iframe/tab embedding
  res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src *; frame-ancestors *;");
  res.setHeader('X-Content-Type-Options', 'nosniff');

  let html = fs.readFileSync(filePath, 'utf8');

  // Record real live visitor telemetry
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const visitorHash = crypto.createHash('sha256').update(ip + (req.headers['user-agent'] || '')).digest('hex').substring(0, 16);
    await dbService.recordAnalyticsEvent(siteId, 'page_view', visitorHash, req.headers['referer'] || null);
  } catch (e) {}

  // Check if site is paid / active
  let isPaid = false;
  try {
    const { data: siteRecord } = await dbService.client.from('sites').select('*, users(*)').eq('provider_site_id', siteId).single();
    if (siteRecord && (siteRecord.status === 'active' || siteRecord.status === 'paid')) {
      isPaid = true;
    }
  } catch (e) {
    // Unpaid preview
  }

  const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'ai_portfolio_generator_bot';

  if (!isPaid) {
    const watermarkHtml = `
    <!-- DIAGONAL FRAMED BOX WATERMARK WITH SURROUNDING BOT USERNAME -->
    <div id="preview-watermark-overlay" style="position: fixed; inset: 0; pointer-events: none; z-index: 999999; display: flex; justify-content: center; align-items: center; overflow: hidden; opacity: 0.24; user-select: none;">
      <!-- TOP NON-OVERLAPPING SURROUNDING TICKER -->
      <div class="watermark-peripheral-text" style="position: absolute; top: 12%; transform: rotate(-25deg); font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.85rem, 1.8vw, 1.3rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; white-space: nowrap; color: rgba(128,128,128,0.45);">
        ✦ CREATED WITH @${botUsername} • UNLOCK FULL PORTFOLIO • @${botUsername} ✦
      </div>

      <!-- MAIN DIAGONAL FRAMED STAMP BOX -->
      <div class="watermark-stamp-box" style="transform: rotate(-25deg); border: 3.5px solid rgba(128,128,128,0.5); border-radius: 16px; padding: 24px 44px; text-align: center; max-width: 90vw; background: rgba(128,128,128,0.03); color: rgba(128,128,128,0.45); box-sizing: border-box;">
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.8rem, 1.6vw, 1.15rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; margin-bottom: 12px;">
          OFFICIAL PREVIEW TRIAL • @${botUsername}
        </div>
        <div class="watermark-main-title" style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.8rem, 7.5vw, 6rem); font-weight: 900; letter-spacing: 0.2em; line-height: 1; text-transform: uppercase; border-top: 3px solid currentColor; border-bottom: 3px solid currentColor; padding: 16px 24px; margin: 8px 0; white-space: nowrap;">
          PREVIEW ONLY
        </div>
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.8rem, 1.6vw, 1.15rem); font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; margin-top: 12px;">
          2-HOUR TRIAL DEMO • UNLOCK AT @${botUsername}
        </div>
      </div>

      <!-- BOTTOM NON-OVERLAPPING SURROUNDING TICKER -->
      <div class="watermark-peripheral-text" style="position: absolute; bottom: 14%; transform: rotate(-25deg); font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.85rem, 1.8vw, 1.3rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; white-space: nowrap; color: rgba(128,128,128,0.45);">
        ✦ CREATED WITH @${botUsername} • UNLOCK FULL PORTFOLIO • @${botUsername} ✦
      </div>
    </div>

    <!-- FLOATING BOTTOM CONVERSION & UNLOCK BAR -->
    <div id="preview-floating-bar" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 20px 40px rgba(0,0,0,0.6); border-radius: 9999px; padding: 12px 28px; display: flex; align-items: center; gap: 18px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; max-width: 94vw; flex-wrap: wrap; justify-content: center;">
      <div style="font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
        <span style="display:inline-block; width:10px; height:10px; background:#38bdf8; border-radius:50%;"></span>
        <span>🔒 <strong>Preview Mode</strong> (2-Hour Timer Active) • Created with @${botUsername}</span>
      </div>
      <a href="/subscribe?siteId=${siteId}" style="background: #22c55e; color: #000000; font-weight: 800; font-size: 0.88rem; padding: 10px 22px; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(34,197,94,0.4);">
        💳 Buy Subscription & Remove Watermark (From ₹149/mo) ➔
      </a>
    </div>

    <!-- DYNAMIC BACKGROUND LUMINANCE WATERMARK CONTROLLER -->
    <script>
      (function() {
        function updateWatermarkLuminance() {
          try {
            var bg = window.getComputedStyle(document.body).backgroundColor;
            var overlay = document.getElementById('preview-watermark-overlay');
            if (!overlay) return;
            var rgb = bg.match(/\\d+/g);
            var isLight = false;
            if (rgb && rgb.length >= 3) {
              var r = parseInt(rgb[0], 10), g = parseInt(rgb[1], 10), b = parseInt(rgb[2], 10);
              var luminance = (0.299 * r + 0.587 * g + 0.114 * b);
              isLight = luminance > 128;
            } else if (bg.includes('rgba(0, 0, 0, 0)') || bg === 'transparent' || !bg) {
              isLight = true;
            }
            var targetColor = isLight ? 'rgba(0, 0, 0, 0.28)' : 'rgba(255, 255, 255, 0.28)';
            var box = overlay.querySelector('.watermark-stamp-box');
            if (box) {
              box.style.color = targetColor;
              box.style.borderColor = targetColor;
            }
            var tickers = overlay.querySelectorAll('.watermark-peripheral-text');
            tickers.forEach(function(el) { el.style.color = targetColor; });
          } catch (e) {}
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', updateWatermarkLuminance);
        } else {
          updateWatermarkLuminance();
        }
      })();
    </script>
    `;

    if (html.includes('</body>')) {
      html = html.replace('</body>', `${watermarkHtml}</body>`);
    } else {
      html += watermarkHtml;
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// Non-existent page or subroute inside a portfolio (/p/:siteId/*)
app.get('/p/:siteId/*', (req, res) => {
  const siteId = req.params.siteId;
  const subPath = req.params[0];
  const sitesBaseDir = path.join(process.cwd(), 'public', 'sites');

  if (siteId && securityService.isPathSafe(sitesBaseDir, siteId) && subPath) {
    const candidateFile = path.join(sitesBaseDir, siteId, subPath);
    if (securityService.isPathSafe(sitesBaseDir, path.join(siteId, subPath)) && fs.existsSync(candidateFile) && fs.statSync(candidateFile).isFile()) {
      return res.sendFile(candidateFile);
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(404).send(TemplateRegistry.render404Page(siteId));
});

// ==========================================
// Subscription & Payment Landing Page (/subscribe)
// ==========================================
app.get(['/subscribe', '/payment/retry'], (req, res) => {
  const siteId = req.query.siteId || req.query.userId || 'demo';

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unlock Your Portfolio — myfolio.tech</title>
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="apple-touch-icon" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/sidebar.js"></script>
  <style>
    :root {
      --bg: #060814;
      --card: #ffffff;
      --primary: #2563eb;
      --accent: #059669;
      --text: #0f172a;
      --muted: #64748b;
      --border: rgba(15, 23, 42, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #F8FAFC;
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      position: relative;
    }
    /* 🌊 High-Speed Moving 3D Fluid Silk Background Container */
    .fluid-silk-bg-container {
      position: fixed;
      top: -6%;
      left: -6%;
      width: 112vw;
      height: 112vh;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
      background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.1) 0%, rgba(240, 246, 255, 0.25) 50%, rgba(220, 235, 255, 0.55) 100%),
                  url('/assets/fluid-silk-3d-bg.jpg') center/cover no-repeat;
      animation: fluidSilkFastUndulate 6.5s ease-in-out infinite alternate;
      will-change: transform;
    }
    @keyframes fluidSilkFastUndulate {
      0% { transform: scale(1) translate(0px, 0px) rotate(0deg); }
      25% { transform: scale(1.05) translate(-22px, -14px) rotate(1.2deg); }
      50% { transform: scale(1.09) translate(16px, 20px) rotate(-1.5deg); }
      75% { transform: scale(1.05) translate(-14px, 16px) rotate(0.9deg); }
      100% { transform: scale(1.07) translate(22px, -14px) rotate(-0.9deg); }
    }
    .app-shell-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    .checkout-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      min-height: 100vh;
      position: relative;
      z-index: 2;
    }
    .checkout-container {
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .title-tag { font-size: 0.85rem; color: #2563EB; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
    .main-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; margin-bottom: 12px; color: #0F172A; }
    .subtitle { color: #64748B; font-size: 1.05rem; margin-bottom: 36px; line-height: 1.6; max-width: 720px; margin-left: auto; margin-right: auto; }

    .pricing-grid-side-by-side {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 28px;
      margin-bottom: 32px;
      align-items: stretch;
    }

    .plan-box-card {
      background: #ffffff;
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-radius: 24px;
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      position: relative;
      box-shadow: 0 20px 45px rgba(37, 99, 235, 0.08);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }
    .plan-box-card:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 28px 56px rgba(37, 99, 235, 0.14);
    }
    .plan-box-starter {
      border: 2px solid #0d9488;
    }
    .plan-box-pro {
      border: 2.5px solid #2563eb;
      box-shadow: 0 20px 50px rgba(37, 99, 235, 0.12);
    }

    .badge {
      position: absolute; top: -14px; right: 24px;
      font-size: 0.72rem; font-weight: 800; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-starter {
      background: #0d9488; color: #ffffff;
    }
    .badge-pro {
      background: #2563eb; color: #ffffff;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    }

    .plan-name { font-size: 1.4rem; font-weight: 800; margin-bottom: 6px; color: #0f172a; }
    .plan-price { font-size: 2.4rem; font-weight: 900; color: #0f172a; margin-bottom: 20px; }
    .plan-price span { font-size: 0.95rem; color: var(--muted); font-weight: 600; }
    .plan-features { list-style: none; margin-bottom: 28px; display: flex; flex-direction: column; gap: 12px; font-size: 0.92rem; color: #334155; }
    .plan-features li { display: flex; align-items: flex-start; gap: 10px; line-height: 1.4; }
    .plan-features li::before { content: '✔'; color: #059669; font-weight: 800; font-size: 1rem; flex-shrink: 0; }
    
    .pay-btn {
      display: block; width: 100%; text-align: center; color: #ffffff;
      font-weight: 800; font-size: 1rem; padding: 15px 20px; border-radius: 14px; text-decoration: none;
      transition: transform 0.15s, box-shadow 0.15s; border: none; cursor: pointer;
    }
    .pay-btn-starter {
      background: #0d9488;
      box-shadow: 0 4px 14px rgba(13, 148, 136, 0.3);
    }
    .pay-btn-starter:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(13, 148, 136, 0.4); }

    .pay-btn-pro {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
    }
    .pay-btn-pro:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37, 99, 235, 0.45); }

    /* 🌙 DARK THEME SUBSCRIBE OVERRIDES */
    [data-theme="dark"] body {
      background: #07090E;
      color: #F8FAFC;
    }
    [data-theme="dark"] .fluid-silk-bg-container {
      background: radial-gradient(circle at 50% 40%, rgba(15, 23, 42, 0.4) 0%, rgba(10, 14, 28, 0.85) 50%, rgba(3, 5, 12, 0.98) 100%),
                  url('/assets/fluid-silk-3d-bg.jpg') center/cover no-repeat;
    }
    [data-theme="dark"] .main-title {
      color: #FFFFFF;
    }
    [data-theme="dark"] .subtitle {
      color: #94A3B8;
    }
    [data-theme="dark"] .plan-box-card {
      background: rgba(15, 23, 42, 0.92);
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
    }
    [data-theme="dark"] .plan-box-starter {
      border: 2px solid #0d9488;
    }
    [data-theme="dark"] .plan-box-pro {
      border: 2.5px solid #38BDF8;
      box-shadow: 0 20px 50px rgba(56, 189, 248, 0.2);
    }
    [data-theme="dark"] .plan-name {
      color: #FFFFFF;
    }
    [data-theme="dark"] .plan-price {
      color: #FFFFFF;
    }
    [data-theme="dark"] .plan-price span {
      color: #94A3B8;
    }
    [data-theme="dark"] .plan-features {
      color: #CBD5E1;
    }
    [data-theme="dark"] .plan-features li code {
      background: rgba(255, 255, 255, 0.1);
      color: #38BDF8;
      padding: 2px 6px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <!-- Moving 3D Fluid Silk Background Container -->
  <div class="fluid-silk-bg-container"></div>

  <div class="app-shell-layout">
    <div id="sidebarMount"></div>
    <div class="checkout-wrap">
      <div class="checkout-container">
        <div class="title-tag">PORTFOLIO STUDIO • SELECT YOUR PLAN</div>
        <h1 class="main-title">Unlock Your 3D Portfolio</h1>
        <p class="subtitle">Remove the 2-hour preview watermark, keep your portfolio online, and choose the plan that best fits your workflow.</p>

        <div class="pricing-grid-side-by-side">
          <!-- Box 1: Lifetime Starter -->
          <div class="plan-box-card plan-box-starter">
            <div>
              <span class="badge badge-starter">LIFETIME STARTER</span>
              <h3 class="plan-name">Lifetime Starter</h3>
              <div class="plan-price">₹149 <span>/ one-time</span></div>
              <ul class="plan-features">
                <li>Deployed &amp; Hosted on Netlify Edge CDN</li>
                <li>Permanent Global Netlify Live Link</li>
                <li>100% Watermark-Free Clean Website</li>
                <li>Static Offline-Ready ZIP Export</li>
                <li>Synchronized PDF Resume Codex</li>
                <li>1 Free Content Re-generation</li>
              </ul>
            </div>
            <button class="pay-btn pay-btn-starter" onclick="startPayment('starter', 14900)">Unlock Lifetime Link (₹149)</button>
          </div>

          <!-- Box 2: Pro Creator -->
          <div class="plan-box-card plan-box-pro">
            <div>
              <span class="badge badge-pro">MOST POPULAR</span>
              <h3 class="plan-name">Pro Creator</h3>
              <div class="plan-price">₹149 <span>/ month</span></div>
              <ul class="plan-features">
                <li>Personal Domain: <code>&lt;name&gt;.myfolio.tech</code></li>
                <li>Custom Domain Linking (<code>yourname.dev</code>)</li>
                <li>Unlimited Edits &amp; GitHub Auto-Sync</li>
                <li>Real-Time Telegram &amp; WhatsApp Visitor Alerts</li>
                <li>Recruiter Telemetry &amp; Analytics Dashboard</li>
                <li>24/7 Priority Cloud Maintenance</li>
              </ul>
            </div>
            <button class="pay-btn pay-btn-pro" onclick="startPayment('pro', 14900)">Unlock Pro Domain (₹149/mo)</button>
          </div>
        </div>

        <div style="color: #94a3b8; font-size: 0.85rem; text-align: center;">
          🔒 100% Secure Checkout via Razorpay, UPI &amp; Cards • Instant Automated Activation
        </div>
      </div>
    </div>
  </div>

  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof initUniversalSidebar === 'function') {
        initUniversalSidebar('pricing');
      }
    });

    async function startPayment(plan, amount) {
      const btn = event?.target;
      const originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Connecting Razorpay...';
      }

      try {
        const res = await fetch('/api/web/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ siteId: '${siteId}', plan })
        });
        const data = await res.json();

        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }

        if (data.orderId && typeof Razorpay !== 'undefined') {
          const options = {
            key: data.keyId || '${process.env.RAZORPAY_KEY_ID || "rzp_test_TS49yFRP3b8uZl"}',
            amount: data.amount,
            currency: data.currency || 'INR',
            name: 'myfolio.tech',
            description: plan === 'pro' ? 'Pro Creator Domain & Unlimited Sync' : 'Lifetime Starter Portfolio Unlock',
            image: '/assets/logo-3d.jpg',
            order_id: data.orderId,
            handler: async function (response) {
              if (btn) {
                btn.disabled = true;
                btn.textContent = 'Verifying Payment...';
              }
              const verifyRes = await fetch('/api/web/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                  siteId: '${siteId}',
                  plan: plan,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                window.location.href = '/dashboard.html?payment=success';
              } else {
                alert('Payment verification error: ' + (verifyData.error || 'Please contact support'));
                if (btn) {
                  btn.disabled = false;
                  btn.textContent = originalText;
                }
              }
            },
            theme: {
              color: '#2563eb'
            }
          };

          const rzp = new Razorpay(options);
          rzp.on('payment.failed', function (response) {
            alert('Payment failed: ' + (response.error.description || 'Transaction cancelled.'));
          });
          rzp.open();
        } else if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert('Could not initialize checkout. Please verify your payment settings.');
        }
      } catch (e) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = originalText;
        }
        alert('Could not start checkout: ' + e.message);
      }
    }
  </script>
</body>
</html>`);
});

// Health check (Supports both /health and Render /healthz)
app.get(['/health', '/healthz'], async (req, res) => {
  const checks = {
    status: 'ok',
    database: await dbHealthCheck(dbService),
    gemini: await aiService.healthCheck(),
    telegram: !!process.env.TELEGRAM_BOT_TOKEN,
    timestamp: new Date().toISOString()
  };

  const allHealthy = Object.values(checks).every(v => v === true || typeof v === 'string');
  res.status(allHealthy ? 200 : 503).json(checks);
});

async function dbHealthCheck(db) {
  try {
    await db.client.from('users').select('id').limit(1);
    return true;
  } catch (error) {
    return false;
  }
}

// Global Safe Error Handler (Never leaks SQL or stack traces)
app.use(SecurityMiddleware.safeErrorHandler());

// Start server if run directly
if (require.main === module) {
  let PORT = parseInt(process.env.PORT, 10) || 5050;
  const HOST = '0.0.0.0';

  function startServer(portToUse) {
    const server = app.listen(portToUse, HOST, () => {
      console.log(`🚀 Portfolio Bot Server running on dedicated port ${portToUse}`);
      console.log(`🌐 Local Studio:     http://localhost:${portToUse}`);
      console.log(`📱 Same Wi-Fi Phone: http://192.168.0.146:${portToUse}`);
      console.log(`📱 Direct Previews:  http://localhost:${portToUse}/p/:siteId`);
      if (process.env.TELEGRAM_BOT_TOKEN) {
        console.log(`🤖 Telegram Bot: Active & Listening`);
      }
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ [PORT CONFLICT] Port ${portToUse} is already in use by another project or process.`);
        const nextPort = portToUse + 1;
        console.log(`🔄 Automatically shifting Portfolio Studio to next available port: ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error('[SERVER ERROR]', err);
      }
    });
  }

  startServer(PORT);
}

module.exports = app;


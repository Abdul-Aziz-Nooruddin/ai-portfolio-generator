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

// Smart Public Domain Detection (Converts localhost to real public URL automatically)
app.use((req, res, next) => {
  if (!process.env.HOST_URL || process.env.HOST_URL.includes('localhost')) {
    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host');
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
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

// 2. Web Instant Portfolio Generation (Protected with 10MB payload limit, per-user quota & AI Sanitization)
app.post(
  '/api/web/generate',
  SecurityMiddleware.limitBodySize(10 * 1024 * 1024),
  AuthMiddleware.quotaLimiter(dbService, 'ai_generation', 10),
  async (req, res) => {
    try {
      const { data = {}, branch = 'A', styleHint = '', layout = 'auto-cycle', siteId: requestedSiteId, previousSiteId, regenerate = false } = req.body;
      
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

      const enrichedData = { ...data, style_hint: styleHint, layout };

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

      const designBrief = { creative_mode: 'auto-cycle', layout: 'auto-cycle' };
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
  const samples = [
    {
      id: 'demo-systems-architect',
      name: 'Elena Rostova',
      role: 'Staff Systems Architect & Core Infra',
      badge: 'Systems & Terminal',
      description: 'Distributed consensus engines, low-latency network protocols, and Linux eBPF telemetry.',
      techStack: ['Rust', 'Go', 'eBPF', 'Tokio', 'Docker', 'Kubernetes'],
      previewUrl: '/p/demo-systems-architect'
    },
    {
      id: 'demo-ai-researcher',
      name: 'Dr. Aris Thorne',
      role: 'Principal AI / ML Researcher',
      badge: 'Research & Academics',
      description: 'Sparse mixture-of-experts architectures, attention latency reduction, and diffusion model alignment.',
      techStack: ['PyTorch', 'JAX', 'CUDA', 'Python', 'Transformers'],
      previewUrl: '/p/demo-ai-researcher'
    },
    {
      id: 'demo-3d-creative',
      name: 'Kai Takahashi',
      role: 'Creative Technologist & 3D Artist',
      badge: '3D & Spatial',
      description: 'Procedural GLSL shader simulations, WebGL compute graphs, and interactive spatial stages.',
      techStack: ['Three.js', 'WebGL2', 'GLSL', 'TypeScript', 'Blender', 'WebGPU'],
      previewUrl: '/p/demo-3d-creative'
    },
    {
      id: 'demo-editorial-monograph',
      name: 'Siddharth Roy',
      role: 'Design Director & Brand Architect',
      badge: 'Editorial & Monograph',
      description: 'Typography systems, award-winning editorial spreads, and bespoke design engineering.',
      techStack: ['Design Systems', 'Figma', 'Typography', 'Next.js', 'CSS Architecture'],
      previewUrl: '/p/demo-editorial-monograph'
    }
  ];
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
app.post('/api/upload/resume', (req, res) => {
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

    // Extract basic text hints from buffer safely if text exists
    const textContent = buffer.toString('latin1');
    const emailMatch = textContent.match(/[\w.-]+@[\w.-]+\.\w+/);
    const resumeText = textContent.replace(/[^\x20-\x7E\n]/g, ' ').slice(0, 4000);

    res.json({
      success: true,
      message: 'Resume validated successfully',
      fileType: validation.fileType,
      mimeType: validation.mimeType,
      pages: validation.pages || 1,
      resumeData: {
        extractedTextSnippet: resumeText.slice(0, 500),
        email: emailMatch ? emailMatch[0] : null,
        rawBase64: validation.fileType === 'image' ? cleanBase64 : null,
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
    const recovery = ErrorRecoveryService.mapError(err, 'image');
    res.status(500).json({ error: recovery.whatHappened, recovery });
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
    const normalized = UnifiedProfileNormalizer.normalize(input);
    const siteGen = new SiteGenerator();

    const siteResult = await siteGen.generateSite({
      id: `unified-${Date.now()}`,
      status: 'active'
    }, normalized, {
      theme: input.preferences?.theme || 'auto',
      creative_mode: input.preferences?.theme !== 'auto' ? input.preferences?.theme : null
    });

    const siteId = `web-${crypto.randomUUID()}`;
    await hostingProvider.deploy(siteId, siteResult, normalized);

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

    const userProfile = {
      name: config.name || 'Creative Developer',
      role: config.role || 'Full Stack & 3D WebGL Architect',
      tagline: config.tagline || 'Building resilient distributed systems, interactive 3D graphics, and intelligent agent workflows.',
      skills: Array.isArray(config.skills) ? config.skills.join(', ') : (config.skills || 'TypeScript, React, Python, Three.js, Node.js, WebGL'),
      email: config.email || 'hello@example.com',
      github: config.github || 'https://github.com',
      linkedin: config.linkedin || 'https://linkedin.com',
      location: config.location || 'San Francisco, CA',
      projects: config.projects || [
        {
          name: 'Hyperion Spatial Renderer',
          desc: 'High-performance WebGL compute shader engine with procedural terrain and real-time raytraced caustics.',
          tech: 'TypeScript • WebGL2 • Three.js • GLSL',
          live: 'https://hyperion.graphics',
          github: 'https://github.com/example/hyperion'
        },
        {
          name: 'Vortex Distributed Graph',
          desc: 'Distributed transactional graph database processing 25M node traversals/sec with sub-millisecond latency.',
          tech: 'Rust • Raft • RocksDB',
          live: 'https://vortex.quantum.io',
          github: 'https://github.com/example/vortex'
        }
      ]
    };

    const options = {
      layout: config.layout,
      mode: config.mode
    };

    const result = await designEngine.generatePortfolio(userProfile, options);

    res.json({
      success: true,
      html: result.html,
      css: result.css,
      js: result.js,
      designBlueprint: result.designBlueprint,
      contentProfile: result.contentProfile
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

// Strict rate limiter for brute-force sensitive auth routes (5 requests per 15 min with progressive delays)
const authLimiter = SecurityMiddleware.rateLimiter({
  max: 5,
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
    const { name, email, message } = req.body;

    // Record lead in analytics events
    await dbService.recordAnalyticsEvent(siteId, 'contact_submit', null, null, { name, email, message });

    // Send instant alert to site owner on Telegram if available
    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
    if (telegramHandler) {
      const user = await dbService.getUser(siteId) || await dbService.getUserById(siteId);
      if (user?.phone_number) {
        const leadMsg = `📬 **New Client Lead from your Portfolio!**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** "${message}"`;
        await telegramHandler.sendSafe(user.phone_number, leadMsg);
      }
    }

    res.json({ success: true, message: 'Message sent directly to the site owner!' });
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
    return res.status(404).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Portfolio Not Found</title></head>
      <body style="font-family:sans-serif; text-align:center; padding:50px; background:#090d16; color:#fff;">
        <h2>Portfolio in progress or not found</h2>
        <p style="color:#94a3b8;">Your portfolio is currently building or does not exist yet. Please check your bot chat!</p>
      </body>
      </html>
    `);
  }

  // Set restrictive origin isolation CSP for previewed websites
  // connect-src 'none' strictly prevents untrusted portfolio scripts from fetching authenticated backend APIs
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.jsdelivr.net https://unpkg.com data: blob:; connect-src 'none'; frame-ancestors 'self';");
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
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
  <title>Unlock Your Portfolio — Subscription Checkout</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
  <script src="/sidebar.js"></script>
  <style>
    :root {
      --bg: #f8fafc;
      --card: #ffffff;
      --primary: #2563eb;
      --accent: #059669;
      --text: #0f172a;
      --muted: #64748b;
      --border: rgba(15, 23, 42, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
    }
    .checkout-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .checkout-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 24px;
      max-width: 620px;
      width: 100%;
      padding: 40px 32px;
      box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
      text-align: center;
    }
    .title-tag { font-size: 0.8rem; color: var(--primary); font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
    .main-title { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; line-height: 1.2; margin-bottom: 12px; color: #0f172a; }
    .subtitle { color: var(--muted); font-size: 0.95rem; margin-bottom: 28px; line-height: 1.5; }

    .plan-box {
      border: 2px solid rgba(37, 99, 235, 0.4);
      border-radius: 18px;
      padding: 28px 24px;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      text-align: left;
      position: relative;
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
    }
    .badge {
      position: absolute; top: -12px; right: 20px; background: #2563eb; color: #ffffff;
      font-size: 0.72rem; font-weight: 800; padding: 3px 12px; border-radius: 9999px; text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .plan-name { font-size: 1.25rem; font-weight: 800; margin-bottom: 4px; color: #0f172a; }
    .plan-price { font-size: 2rem; font-weight: 900; color: #0f172a; margin-bottom: 16px; }
    .plan-price span { font-size: 0.9rem; color: var(--muted); font-weight: 500; }
    .plan-features { list-style: none; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; font-size: 0.9rem; color: #334155; }
    .plan-features li { display: flex; align-items: center; gap: 8px; }
    .plan-features li::before { content: '✔'; color: #059669; font-weight: 800; }
    
    .pay-btn {
      display: block; width: 100%; text-align: center; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff;
      font-weight: 800; font-size: 1rem; padding: 14px 20px; border-radius: 12px; text-decoration: none;
      transition: transform 0.15s, box-shadow 0.15s; border: none; cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
    }
    .pay-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35); }
  </style>
</head>
<body>
  <div class="app-shell-layout">
    <div id="sidebarMount"></div>
    <div class="checkout-wrap">
      <div class="checkout-card">
        <div class="title-tag">PORTFOLIO STUDIO • SUBSCRIPTION CHECKOUT</div>
        <h1 class="main-title">Unlock Your Live Portfolio Forever</h1>
        <p class="subtitle">Remove the 2-hour preview watermark, keep your portfolio online 24/7, get live recruiter analytics, and custom domain mapping.</p>

        <div class="plan-box">
          <span class="badge">Complete All-Access</span>
          <h3 class="plan-name">Portfolio All-Access</h3>
          <div class="plan-price">₹149 <span>/ month</span></div>
          <ul class="plan-features">
            <li>100% Watermark-Free &amp; Ad-Free Clean Website</li>
            <li>Permanent 24/7 High-Speed Edge CDN Hosting</li>
            <li>Real-Time Recruiter &amp; Visitor Analytics Tracker</li>
            <li>Interactive Contact Form with Instant Alerts</li>
            <li>Automated SEO, OpenGraph &amp; Social Sharing Cards</li>
            <li>Unlimited Live Edits, Rebuilds &amp; 3D Archetypes</li>
          </ul>
          <button class="pay-btn" onclick="startPayment('lite', 14900)">Subscribe All-Access (₹149/mo)</button>
        </div>

        <div style="color: var(--muted); font-size: 0.82rem;">
          🔒 100% Secure Checkout via Razorpay &amp; UPI • Instant Automated Activation
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
      try {
        const res = await fetch('/api/web/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ siteId: '${siteId}', plan })
        });
        const data = await res.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert('Initializing checkout...');
        }
      } catch (e) {
        alert('Could not start checkout: ' + e.message);
      }
    }
  </script>
</body>
</html>`);
});

// Health check
app.get('/health', async (req, res) => {
  const checks = {
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
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio Bot Server running on port ${PORT}`);
    console.log(`🌐 Web Studio Landing: http://localhost:${PORT}`);
    console.log(`📱 Direct Web Previews: http://localhost:${PORT}/p/:siteId`);
    if (process.env.TELEGRAM_BOT_TOKEN) {
      console.log(`🤖 Telegram Bot: Active & Listening`);
    }
  });
}

module.exports = app;


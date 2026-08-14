/**
 * WhatsApp Portfolio Bot - Main Entry Point
 */

require('dotenv').config();
const express = require('express');
const { ConversationEngine } = require('./conversation-engine');
const { AIService } = require('./services/ai-service');
const { DatabaseService } = require('./services/db-service');
const { WebhookHandler } = require('./handlers/webhook-handler');

const app = express();
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// Initialize services
const aiService = new AIService(process.env.GEMINI_API_KEY);
const dbService = new DatabaseService(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const conversationEngine = new ConversationEngine(aiService, dbService);

const webhookConfig = {
  token: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  verifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
  appSecret: process.env.WHATSAPP_APP_SECRET
};

const webhookHandler = new WebhookHandler(conversationEngine, webhookConfig);

// Routes
app.get('/webhook', (req, res) => webhookHandler.verifyWebhook(req, res));
app.post('/webhook', (req, res) => webhookHandler.handleIncoming(req, res));

// Health check
app.get('/health', async (req, res) => {
  const checks = {
    database: await dbHealthCheck(dbService),
    gemini: await aiService.healthCheck(),
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Portfolio Bot running on port ${PORT}`);
  console.log(`📱 Webhook URL: https://your-domain.com/webhook`);
});

module.exports = app;

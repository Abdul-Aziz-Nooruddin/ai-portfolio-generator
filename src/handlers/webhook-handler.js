/**
 * WhatsApp Webhook Handler
 * Receives messages from Meta, validates, and routes to conversation engine
 */

const crypto = require('crypto');

class WebhookHandler {
  constructor(conversationEngine, config) {
    this.engine = conversationEngine;
    this.config = config;
  }

  /**
   * Express middleware for webhook verification (GET)
   */
  verifyWebhook(req, res) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === this.config.verifyToken) {
      console.log('[WEBHOOK] Verified');
      res.status(200).send(challenge);
    } else {
      console.error('[WEBHOOK] Verification failed');
      res.sendStatus(403);
    }
  }

  /**
   * Express handler for incoming messages (POST)
   * CRITICAL: Must return 200 within 20 seconds to prevent Meta retries
   */
  async handleIncoming(req, res) {
    // 1. Respond immediately to prevent timeout
    res.status(200).send('OK');

    try {
      const entry = req.body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      console.log('[WEBHOOK] Incoming event:', {
        object: req.body.object,
        field: changes?.field,
        hasMessages: !!value?.messages?.length,
        hasStatuses: !!value?.statuses?.length
      });

      // 2. Validate payload signature
      const signature = req.headers['x-hub-signature-256'];
      if (!this.validateSignature(req.rawBody, signature)) {
        console.error('[WEBHOOK] Invalid signature signature check failed.');
        if (process.env.NODE_ENV === 'production') {
          return;
        } else {
          console.warn('[WEBHOOK] Continuing in development mode despite signature mismatch.');
        }
      }

      // 3. Extract message data
      if (!value?.messages || value.messages.length === 0) {
        if (value?.statuses?.length) {
          console.log('[WEBHOOK] Status update only, ignoring delivery status event');
        }
        return; // Not a message event (could be status update)
      }

      const message = value.messages[0];
      const phoneNumber = message.from; // Sender's WhatsApp number
      const messageId = message.id;

      // 4. Extract text or media
      let messageText = '';
      let mediaUrl = null;

      if (message.type === 'text') {
        messageText = message.text.body;
      } else if (message.type === 'image') {
        messageText = '[Image uploaded]';
        mediaUrl = await this.getMediaUrl(message.image.id);
      } else if (message.type === 'document') {
        messageText = '[Document uploaded]';
      }

      console.log(`[WEBHOOK] Message from ${phoneNumber}: ${messageText.substring(0, 50)}`);

      // 5. Route to conversation engine (async - don't await)
      this.engine.processMessage(phoneNumber, messageText, messageId, mediaUrl)
        .then(response => {
          if (response && response.action === 'reply') {
            this.sendWhatsAppMessage(phoneNumber, response.message);
          }
        })
        .catch(error => {
          console.error('[WEBHOOK] Processing error:', error);
          this.sendWhatsAppMessage(phoneNumber, 
            "Sorry, something went wrong. Please try again or type START to restart."
          );
        });

    } catch (error) {
      console.error('[WEBHOOK] Handler error:', error);
    }
  }

  /**
   * Validate webhook signature from Meta
   */
  validateSignature(rawBody, signature) {
    if (!this.config.appSecret) return true;
    if (!signature || !rawBody) return false;

    const expected = crypto
      .createHmac('sha256', this.config.appSecret)
      .update(rawBody)
      .digest('hex');

    const received = signature.replace('sha256=', '');
    if (received.length !== expected.length) return false;

    return crypto.timingSafeEqual(
      Buffer.from(received, 'hex'),
      Buffer.from(expected, 'hex')
    );
  }

  /**
   * Get media URL from Meta's CDN
   */
  async getMediaUrl(mediaId) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${mediaId}`, {
        headers: { Authorization: `Bearer ${this.config.token}` }
      });
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('[WEBHOOK] Failed to get media URL:', error);
      return null;
    }
  }

  /**
   * Send WhatsApp message back to user
   */
  async sendWhatsAppMessage(phoneNumber, message) {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.config.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phoneNumber,
            type: 'text',
            text: { body: message }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[WEBHOOK] Failed to send message (HTTP ${response.status}):`, errorText);

        if (response.status === 401 || errorText.includes('"code":190') || errorText.includes('"code": 190')) {
          console.error('❌ [CRITICAL ERROR] WHATSAPP_TOKEN is expired or invalid (OAuth error 190). Please generate a fresh token at https://developers.facebook.com and update WHATSAPP_TOKEN in .env!');
        } else if (errorText.includes('131030') || errorText.includes('Recipient phone number not in allowed list')) {
          console.error(`⚠️ [NOTICE] Recipient ${phoneNumber} is not in Meta test allowed list. (This is normal when Meta Developer Console sends simulated webhooks from fake test numbers like 16315551181).`);
        }
      } else {
        console.log(`[WEBHOOK] Message successfully sent to ${phoneNumber}`);
      }
    } catch (error) {
      console.error('[WEBHOOK] Send message network error:', error);
    }
  }
}

module.exports = { WebhookHandler };

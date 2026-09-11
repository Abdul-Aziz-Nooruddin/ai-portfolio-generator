/**
 * Meta Official WhatsApp Cloud API Service (Graph API v21.0)
 * Handles outbound message sending, media downloads, and webhook signature verification.
 */

const crypto = require('crypto');

class WhatsAppService {
  constructor(options = {}) {
    this.accessToken = options.accessToken || process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = options.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.verifyToken = options.verifyToken || process.env.WHATSAPP_VERIFY_TOKEN || 'myfolio_wa_verify_2026';
    this.appSecret = options.appSecret || process.env.WHATSAPP_APP_SECRET || '';
    this.apiVersion = options.apiVersion || 'v21.0';
    this.baseUrl = `https://graph.facebook.com/${this.apiVersion}`;
  }

  /**
   * Validates Meta's initial webhook verification handshake
   * @param {string} mode - hub.mode
   * @param {string} token - hub.verify_token
   * @param {string} challenge - hub.challenge
   * @returns {string|null} Challenge string if valid, null otherwise
   */
  verifyWebhookChallenge(mode, token, challenge) {
    if (mode === 'subscribe' && token === this.verifyToken) {
      return challenge;
    }
    return null;
  }

  /**
   * Verifies X-Hub-Signature-256 HMAC header from Meta
   * @param {string|Buffer} rawBody - Raw unparsed request body
   * @param {string} signatureHeader - Header 'sha256=...'
   * @returns {boolean}
   */
  verifySignature(rawBody, signatureHeader) {
    if (!this.appSecret || !signatureHeader) return true; // Optional if secret not provided
    try {
      const parts = signatureHeader.split('=');
      const sigHash = parts[1];
      if (!sigHash) return false;

      const expectedHash = crypto
        .createHmac('sha256', this.appSecret)
        .update(rawBody)
        .digest('hex');

      return crypto.timingSafeEqual(Buffer.from(sigHash), Buffer.from(expectedHash));
    } catch (e) {
      return false;
    }
  }

  /**
   * Cleans phone number to standard E.164 without leading '+' or special chars
   */
  normalizePhoneNumber(phone) {
    return String(phone || '').replace(/[^0-9]/g, '');
  }

  /**
   * Sends a standard text message with optional link preview
   * @param {string} to - Recipient phone number
   * @param {string} text - Message text (supports WhatsApp markdown *bold*, _italic_)
   * @param {Object} [options={}] - { previewUrl: boolean }
   */
  async sendTextMessage(to, text, options = {}) {
    const recipient = this.normalizePhoneNumber(to);
    if (!recipient || !text) {
      throw new Error('Recipient and text are required to send a WhatsApp message.');
    }

    if (!this.accessToken || !this.phoneNumberId) {
      console.warn('[WHATSAPP SERVICE] Outbound skipped: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not set.');
      return { success: false, reason: 'credentials_missing' };
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipient,
      type: 'text',
      text: {
        preview_url: options.previewUrl !== false,
        body: text
      }
    };

    const url = `${this.baseUrl}/${this.phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errMsg = data.error?.message || response.statusText;
      console.error('[WHATSAPP SEND ERROR]', data.error || data);
      throw new Error(`WhatsApp API Error (${response.status}): ${errMsg}`);
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
      data
    };
  }

  /**
   * Sends an interactive button message (up to 3 action buttons)
   * @param {string} to - Recipient phone number
   * @param {string} bodyText - Main message body
   * @param {Array<{ id: string, title: string }>} buttons - Max 3 buttons
   */
  async sendInteractiveButtons(to, bodyText, buttons = []) {
    const recipient = this.normalizePhoneNumber(to);
    if (!recipient || !bodyText || buttons.length === 0) {
      throw new Error('Recipient, body text, and at least one button are required.');
    }

    if (!this.accessToken || !this.phoneNumberId) {
      console.warn('[WHATSAPP SERVICE] Outbound buttons skipped: credentials missing.');
      return { success: false, reason: 'credentials_missing' };
    }

    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipient,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: {
          text: bodyText
        },
        action: {
          buttons: buttons.slice(0, 3).map((b) => ({
            type: 'reply',
            reply: {
              id: b.id,
              title: b.title.slice(0, 20) // WhatsApp max 20 chars for button title
            }
          }))
        }
      }
    };

    const url = `${this.baseUrl}/${this.phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errMsg = data.error?.message || response.statusText;
      console.error('[WHATSAPP BUTTONS ERROR]', data.error || data);
      throw new Error(`WhatsApp API Error (${response.status}): ${errMsg}`);
    }

    return {
      success: true,
      messageId: data.messages?.[0]?.id,
      data
    };
  }

  /**
   * Downloads media attachment (PDF resume, image) using Meta media ID
   * @param {string} mediaId 
   * @returns {Promise<{ buffer: Buffer, mimeType: string, fileSize: number }>}
   */
  async downloadMedia(mediaId) {
    if (!mediaId || !this.accessToken) {
      throw new Error('mediaId and accessToken are required to download WhatsApp media.');
    }

    // 1. Retrieve temporary download URL
    const metaUrl = `${this.baseUrl}/${mediaId}`;
    const metaRes = await fetch(metaUrl, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });

    if (!metaRes.ok) {
      throw new Error(`Failed to retrieve media metadata for ID ${mediaId}`);
    }

    const mediaMeta = await metaRes.json();
    if (!mediaMeta.url) {
      throw new Error(`No download URL provided for media ID ${mediaId}`);
    }

    // 2. Download binary payload
    const downloadRes = await fetch(mediaMeta.url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });

    if (!downloadRes.ok) {
      throw new Error(`Failed to download binary media for ID ${mediaId}`);
    }

    const arrayBuf = await downloadRes.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuf),
      mimeType: mediaMeta.mime_type || downloadRes.headers.get('content-type') || 'application/octet-stream',
      fileSize: mediaMeta.file_size || arrayBuf.byteLength
    };
  }
}

module.exports = { WhatsAppService };

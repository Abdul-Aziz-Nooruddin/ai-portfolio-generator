const crypto = require('crypto');
const fetch = require('node-fetch');

class RazorpayService {
  constructor(keyId, keySecret, webhookSecret) {
    this.keyId = keyId;
    this.keySecret = keySecret;
    this.webhookSecret = webhookSecret;
    this.baseUrl = 'https://api.razorpay.com/v1';
    this.auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  }

  async createPaymentLink(userId, plan, amount, currency = 'INR') {
    const planConfig = {
      lite: { name: 'Lite Plan', description: 'Monthly portfolio hosting', amount: 14900 },
      pro: { name: 'Pro Plan', description: 'Monthly portfolio hosting with analytics', amount: 29900 }
    };
    
    const config = planConfig[plan] || planConfig.lite;
    
    const response = await fetch(`${this.baseUrl}/payment_links`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: config.amount,
        currency,
        accept_partial: false,
        description: config.description,
        customer: { name: userId },
        notify: { sms: true, email: true },
        reminder_enable: true,
        callback_url: `${process.env.APP_URL}/payment/success`,
        callback_method: 'get',
        notes: { user_id: userId, plan }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Razorpay create payment link failed: ${error}`);
    }

    const data = await response.json();
    return {
      paymentLinkId: data.id,
      shortUrl: data.short_url,
      url: data.short_url
    };
  }

  async createSubscription(userId, plan) {
    const planIds = {
      lite: process.env.RAZORPAY_LITE_PLAN_ID,
      pro: process.env.RAZORPAY_PRO_PLAN_ID
    };
    
    const planId = planIds[plan];
    if (!planId) {
      throw new Error(`Razorpay plan ID not configured for ${plan}`);
    }

    const response = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12,
        notes: { user_id: userId, plan }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Razorpay create subscription failed: ${error}`);
    }

    return response.json();
  }

  verifyWebhookSignature(payload, signature) {
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  parseWebhookEvent(payload) {
    const event = JSON.parse(payload);
    return {
      event: event.event,
      payment: event.payload?.payment?.entity,
      subscription: event.payload?.subscription?.entity,
      invoice: event.payload?.invoice?.entity
    };
  }

  async getPayment(paymentId) {
    const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
      headers: { Authorization: `Basic ${this.auth}` }
    });
    
    if (!response.ok) {
      throw new Error(`Razorpay get payment failed: ${await response.text()}`);
    }
    
    return response.json();
  }

  async getSubscription(subscriptionId) {
    const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
      headers: { Authorization: `Basic ${this.auth}` }
    });
    
    if (!response.ok) {
      throw new Error(`Razorpay get subscription failed: ${await response.text()}`);
    }
    
    return response.json();
  }

  async cancelSubscription(subscriptionId) {
    const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: { Authorization: `Basic ${this.auth}` }
    });
    
    if (!response.ok) {
      throw new Error(`Razorpay cancel subscription failed: ${await response.text()}`);
    }
    
    return response.json();
  }
}

module.exports = { RazorpayService };
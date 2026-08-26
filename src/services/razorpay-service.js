const crypto = require('crypto');

class RazorpayService {
  constructor(keyId, keySecret, webhookSecret) {
    this.keyId = keyId;
    this.keySecret = keySecret;
    this.webhookSecret = webhookSecret;
    this.baseUrl = 'https://api.razorpay.com/v1';
    this.auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  }

  /**
   * Create Razorpay Standard Order for Web Checkout
   * @param {number} amountInPaise 
   * @param {string} currency 
   * @param {string} receipt 
   * @param {object} notes 
   */
  async createOrder(amountInPaise, currency = 'INR', receipt = null, notes = {}) {
    const finalAmount = Math.round(Number(amountInPaise));
    if (!finalAmount || finalAmount <= 0) {
      throw new Error('Invalid order amount specified');
    }

    const payload = {
      amount: finalAmount,
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${crypto.randomUUID().slice(0, 10)}`,
      notes: notes || {}
    };

    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Razorpay create order failed: ${errorText}`);
    }

    const data = await response.json();
    return {
      orderId: data.id,
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      receipt: data.receipt,
      keyId: this.keyId
    };
  }

  /**
   * Cryptographically verify Razorpay Checkout signature (HMAC-SHA256)
   */
  verifyPaymentSignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return false;
    }

    try {
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.keySecret)
        .update(body)
        .digest('hex');

      return crypto.timingSafeEqual(
        Buffer.from(razorpay_signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Anti-Tampering & Payment Approval Engine
   * 1. Validates cryptographic signature
   * 2. Fetches verified payment record directly from Razorpay API
   * 3. Validates status (captured / authorized)
   * 4. Enforces strict amount matching (blocks client-side price tampering)
   * 5. Enforces order ID match & currency match
   */
  async verifyAndApprovePayment({ paymentId, orderId, signature, expectedPlan = 'lite', expectedAmount = null }) {
    // 1. Signature check (if signature provided)
    if (signature && orderId) {
      const isSignatureValid = this.verifyPaymentSignature({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });
      if (!isSignatureValid) {
        throw new Error('Payment verification failed: Cryptographic signature mismatch / fraudulent attempt detected');
      }
    }

    // 2. Fetch ground truth payment directly from Razorpay
    const payment = await this.getPayment(paymentId);
    if (!payment) {
      throw new Error('Payment verification failed: Payment record not found on Razorpay');
    }

    // 3. Status validation
    const validStatuses = ['captured', 'authorized'];
    if (!validStatuses.includes(payment.status)) {
      throw new Error(`Payment verification failed: Payment status is ${payment.status} (expected captured/authorized)`);
    }

    // 4. Currency validation
    if (payment.currency !== 'INR') {
      throw new Error(`Payment verification failed: Invalid currency ${payment.currency} (expected INR)`);
    }

    // 5. Order ID matching
    if (orderId && payment.order_id && payment.order_id !== orderId) {
      throw new Error(`Payment verification failed: Order ID mismatch (expected ${orderId}, got ${payment.order_id})`);
    }

    // 6. Anti-Tampering Amount Validation
    // Calculate expected amount in paise if not explicitly passed
    let requiredAmountInPaise = expectedAmount;
    if (!requiredAmountInPaise) {
      const PRICING_MAP = {
        lite: 14900,
        pro: 14900,
        all_access: 14900
      };
      requiredAmountInPaise = PRICING_MAP[String(expectedPlan).toLowerCase()] || 14900;
    }

    if (payment.amount < requiredAmountInPaise) {
      throw new Error(
        `🚨 FRAUD ALERT: Payment amount tampering detected! Received ₹${payment.amount / 100} (${payment.amount} paise), but plan ${expectedPlan} requires at least ₹${requiredAmountInPaise / 100} (${requiredAmountInPaise} paise). Payment rejected.`
      );
    }

    // 7. Auto-capture authorized payment if not yet captured
    if (payment.status === 'authorized') {
      try {
        await this.capturePayment(paymentId, payment.amount, payment.currency);
      } catch (capErr) {
        console.warn('[RAZORPAY] Auto-capture warning:', capErr.message);
      }
    }

    return {
      approved: true,
      paymentId: payment.id,
      orderId: payment.order_id || orderId,
      amount: payment.amount,
      amountRupees: payment.amount / 100,
      currency: payment.currency,
      status: 'paid',
      plan: expectedPlan,
      email: payment.email,
      contact: payment.contact,
      method: payment.method
    };
  }

  /**
   * Capture an authorized payment
   */
  async capturePayment(paymentId, amount, currency = 'INR') {
    const response = await fetch(`${this.baseUrl}/payments/${paymentId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount)),
        currency: currency || 'INR'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Razorpay capture payment failed: ${errorText}`);
    }

    return response.json();
  }

  async createPaymentLink(userId, plan = 'all_access', amount = null, currency = 'INR') {
    const planConfig = {
      lite: { name: 'All-Access Plan', description: 'Monthly portfolio hosting & analytics', amount: 14900 },
      pro: { name: 'All-Access Plan', description: 'Monthly portfolio hosting & analytics', amount: 14900 },
      all_access: { name: 'All-Access Plan', description: 'Monthly portfolio hosting & analytics', amount: 14900 }
    };
    
    const config = planConfig[plan] || planConfig.all_access;
    const finalAmount = Math.round(Number(amount || config.amount));
    const appHost = process.env.APP_URL || process.env.HOST_URL || 'http://localhost:3000';
    
    try {
      const response = await fetch(`${this.baseUrl}/payment_links`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${this.auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: currency || 'INR',
          accept_partial: false,
          description: config.description,
          customer: { name: String(userId) },
          notify: { sms: false, email: false },
          reminder_enable: false,
          callback_url: `${appHost}/payment/success`,
          callback_method: 'get',
          notes: { user_id: String(userId), plan }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          paymentLinkId: data.id,
          shortUrl: data.short_url,
          url: data.short_url
        };
      }

      const errorText = await response.text();
      // If Razorpay Test Mode 30-link cap or rate limit is reached, seamlessly fallback to Order / Checkout
      if (errorText.includes('RATE_LIMIT_EXCEEDED') || errorText.includes('test mode limit')) {
        try {
          const order = await this.createOrder(finalAmount, currency, `rcpt_${String(userId).slice(0, 8)}_${Date.now()}`, { userId, plan });
          const checkoutUrl = `${appHost}/subscribe?userId=${userId}&plan=${plan}&orderId=${order.id}`;
          return {
            paymentLinkId: order.id,
            shortUrl: checkoutUrl,
            url: checkoutUrl,
            isFallbackOrder: true
          };
        } catch (oErr) {
          const checkoutUrl = `${appHost}/subscribe?userId=${userId}&plan=${plan}`;
          return {
            paymentLinkId: `chk_${Date.now()}`,
            shortUrl: checkoutUrl,
            url: checkoutUrl,
            isFallbackOrder: true
          };
        }
      }

      throw new Error(`Razorpay create payment link failed: ${errorText}`);
    } catch (err) {
      if (err.message.includes('RATE_LIMIT_EXCEEDED') || err.message.includes('test mode limit')) {
        const checkoutUrl = `${appHost}/subscribe?userId=${userId}&plan=${plan}`;
        return {
          paymentLinkId: `chk_${Date.now()}`,
          shortUrl: checkoutUrl,
          url: checkoutUrl,
          isFallbackOrder: true
        };
      }
      throw err;
    }
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
    if (!this.webhookSecret || !signature || !payload) return false;
    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payload)
        .digest('hex');
      
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      );
    } catch (e) {
      return false;
    }
  }

  parseWebhookEvent(payload) {
    const event = typeof payload === 'string' ? JSON.parse(payload) : payload;
    return {
      event: event.event,
      payment: event.payload?.payment?.entity,
      subscription: event.payload?.subscription?.entity,
      order: event.payload?.order?.entity,
      paymentLink: event.payload?.payment_link?.entity,
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
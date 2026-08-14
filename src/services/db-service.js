/**
 * Database Service - Supabase Wrapper
 * All database operations go through here
 */

const { createClient } = require('@supabase/supabase-js');

class DatabaseService {
  constructor(supabaseUrl, supabaseKey) {
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async getUser(phoneNumber) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createUser(phoneNumber) {
    const { data, error } = await this.client
      .from('users')
      .insert({ phone_number: phoneNumber })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getConversation(userId) {
    const { data, error } = await this.client
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createConversation(userId) {
    const { data, error } = await this.client
      .from('conversations')
      .insert({ user_id: userId, status: 'idle' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateConversation(conversationId, updates) {
    const { error } = await this.client
      .from('conversations')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    if (error) throw error;
  }

  async isMessageProcessed(messageId) {
    const { data, error } = await this.client
      .from('processed_messages')
      .select('message_id')
      .eq('message_id', messageId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }

  async markMessageProcessed(messageId, userId = null) {
    const isValidUuid = typeof userId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
    const safeUserId = isValidUuid ? userId : null;

    const { error } = await this.client
      .from('processed_messages')
      .insert({ message_id: messageId, user_id: safeUserId })
      .single();

    if (error && error.code !== '23505') throw error;
  }

  async createSite(userId, provider, providerSiteId) {
    const { data, error } = await this.client
      .from('client_sites')
      .insert({
        user_id: userId,
        hosting_provider: provider,
        provider_site_id: providerSiteId,
        status: 'preview'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateSite(siteId, updates) {
    const { error } = await this.client
      .from('client_sites')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', siteId);

    if (error) throw error;
  }

  async recordPayment(paymentId, userId, amount, gateway) {
    const { error } = await this.client
      .from('payments')
      .insert({
        payment_id: paymentId,
        user_id: userId,
        amount,
        gateway,
        status: 'pending'
      });

    if (error) throw error;
  }

  async getPayment(paymentId) {
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('payment_id', paymentId)
      .single();

    if (error) throw error;
    return data;
  }

  async updatePaymentStatus(paymentId, status) {
    const { error } = await this.client
      .from('payments')
      .update({ status, processed_at: new Date().toISOString() })
      .eq('payment_id', paymentId);

    if (error) throw error;
  }

  async checkRateLimit(userId, action, maxCount = 10, windowMinutes = 1) {
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from('rate_limits')
      .select('*')
      .eq('user_id', userId)
      .eq('action', action)
      .gte('window_start', windowStart)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (!data) {
      await this.client
        .from('rate_limits')
        .upsert({
          user_id: userId,
          action,
          count: 1,
          window_start: new Date().toISOString()
        });
      return true;
    }

    if (data.count >= maxCount) return false;

    await this.client
      .from('rate_limits')
      .update({ count: data.count + 1 })
      .eq('user_id', userId)
      .eq('action', action);

    return true;
  }

  async getExpiredPreviews() {
    const { data, error } = await this.client
      .from('client_sites')
      .select('*, conversations(*)')
      .eq('status', 'preview')
      .lt('preview_expires_at', new Date().toISOString());

    if (error) throw error;
    return data || [];
  }

  async getGracePeriodExpired() {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await this.client
      .from('conversations')
      .select('*, client_sites(*)')
      .eq('status', 'grace_period')
      .lt('updated_at', threeDaysAgo);

    if (error) throw error;
    return data || [];
  }
}

module.exports = { DatabaseService };

/**
 * Database Setup Script
 * Run this once to initialize your Supabase tables
 */

const { createClient } = require('@supabase/supabase-js');

const schema = `
-- Users (identified by phone number)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations (state machine)
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'idle',
    branch TEXT,
    extracted_data JSONB DEFAULT '{}',
    design_brief JSONB,
    taste_skill_dials JSONB,
    selected_shader TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Message Deduplication
CREATE TABLE IF NOT EXISTS processed_messages (
    message_id TEXT PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    processed_at TIMESTAMP DEFAULT NOW()
);

-- Client Sites (hosting)
CREATE TABLE IF NOT EXISTS client_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    hosting_provider TEXT NOT NULL DEFAULT 'netlify',
    provider_site_id TEXT,
    status TEXT NOT NULL DEFAULT 'preview',
    custom_domain TEXT,
    preview_deployed_at TIMESTAMP,
    preview_expires_at TIMESTAMP,
    live_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments (idempotency)
CREATE TABLE IF NOT EXISTS payments (
    payment_id TEXT PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    amount INTEGER,
    status TEXT NOT NULL DEFAULT 'pending',
    gateway TEXT,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    plan TEXT NOT NULL,
    billing_cycle TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Rate Limits
CREATE TABLE IF NOT EXISTS rate_limits (
    user_id UUID REFERENCES users(id),
    action TEXT,
    count INTEGER DEFAULT 0,
    window_start TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, action)
);
`;

async function setup() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
    process.exit(1);
  }

  const client = createClient(supabaseUrl, supabaseKey);

  console.log('🗄️ Setting up database...');

  // Execute schema
  const { error } = await client.rpc('exec_sql', { sql: schema });

  if (error) {
    console.error('❌ Error:', error.message);
    console.log('Please run the SQL manually in Supabase SQL Editor');
    console.log(schema);
  } else {
    console.log('✅ Database setup complete!');
  }
}

setup();

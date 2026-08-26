/**
 * Database Setup Script
 * Run this to initialize your Supabase tables
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf-8');

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
    console.error('ℹ️ Automatic RPC exec_sql is restricted on default Supabase instances.');
    console.log('👉 Please copy the contents of schema.sql and paste them into your Supabase SQL Editor:');
    console.log(`\n${schema}\n`);
  } else {
    console.log('✅ Database setup complete!');
  }
}

if (require.main === module) {
  setup();
}

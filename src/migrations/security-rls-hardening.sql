-- =========================================================
-- MyFolio Production Supabase Row Level Security (RLS) Hardening
-- Protects all tables from unauthorized direct PostgREST / Supabase client access.
-- The server-side backend uses SUPABASE_SERVICE_KEY (service_role) which
-- automatically bypasses RLS, ensuring zero disruption to server operations.
-- =========================================================

-- 1. Enable RLS on all sensitive core tables
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS client_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS site_analytics ENABLE ROW LEVEL SECURITY;

-- 2. Drop any existing permissive policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow service role full access users" ON users;
DROP POLICY IF EXISTS "Allow service role full access sessions" ON sessions;
DROP POLICY IF EXISTS "Allow service role full access tokens" ON verification_tokens;
DROP POLICY IF EXISTS "Allow service role full access reset_tokens" ON password_reset_tokens;
DROP POLICY IF EXISTS "Allow service role full access conversations" ON conversations;
DROP POLICY IF EXISTS "Allow service role full access client_sites" ON client_sites;
DROP POLICY IF EXISTS "Allow service role full access sites" ON sites;
DROP POLICY IF EXISTS "Allow service role full access payments" ON payments;
DROP POLICY IF EXISTS "Allow service role full access admin_audit_logs" ON admin_audit_logs;
DROP POLICY IF EXISTS "Allow service role full access email_logs" ON email_logs;
DROP POLICY IF EXISTS "Allow service role full access rate_limits" ON rate_limits;
DROP POLICY IF EXISTS "Allow service role full access site_analytics" ON site_analytics;

-- 3. Explicit Service Role bypass confirmation (defense in depth)
CREATE POLICY "Allow service role full access users" ON users FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access sessions" ON sessions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access tokens" ON verification_tokens FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access reset_tokens" ON password_reset_tokens FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access conversations" ON conversations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access client_sites" ON client_sites FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access sites" ON sites FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access payments" ON payments FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access admin_audit_logs" ON admin_audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access email_logs" ON email_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access rate_limits" ON rate_limits FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow service role full access site_analytics" ON site_analytics FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 4. User-isolated policies for authenticated client tokens (if any direct Supabase Auth token is used)
CREATE POLICY "Users can read own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own sessions" ON sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sessions" ON sessions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can read own conversations" ON conversations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can read own client_sites" ON client_sites FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 5. Public read-only access for published active portfolio metadata (zero write access for anon)
CREATE POLICY "Public can view active client sites" ON client_sites FOR SELECT TO anon USING (status = 'active');
CREATE POLICY "Public can view active sites" ON sites FOR SELECT TO anon USING (status = 'active');

-- 6. Direct access to payments, audit logs, reset tokens, and rate limits is strictly forbidden for anon & standard users
-- (No policies created for anon/authenticated on payments, verification_tokens, password_reset_tokens, admin_audit_logs, rate_limits)
-- They remain accessible exclusively to service_role via backend API.

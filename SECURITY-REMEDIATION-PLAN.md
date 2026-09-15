# MyFolio — Security Remediation & Hardening Plan

**Target Application**: MyFolio (`https://myfolio.tech/`)  
**Workspace Root**: `/Users/abdulaziz/Desktop/myfolio-platform`  
**Security Lead / Engineer**: Antigravity Security Engineering  
**Date**: September 15, 2026  
**Status**: APPROVED FOR EXECUTION  

---

## 1. System Architecture Overview

MyFolio is a full-stack platform that transforms resumes, GitHub repositories, and user profiles into interactive 3D portfolio websites with live customization, custom domains, and instant deployments.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                                  │
│  web/*.html (Tailored Typography, 3D WebGL / Three.js, GSAP & Lenis)     │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ HTTPS / Cookies / JSON
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    EDGE & REVERSE PROXY LAYER                             │
│  Cloudflare CDN (DDoS, SSL Termination) ──► Render PaaS (Linux Container) │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ Port 5050 (Node.js Express 4.21)
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     EXPRESS APPLICATION SERVER                            │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Security Middleware Pipeline:                                       │  │
│  │ RequestTimeout(90s) • SecurityHeaders • CorsConfig • BodyLimit      │  │
│  │ AuthMiddleware.authenticate (Cookie Hash ──► Session ──► req.user)  │  │
│  └──────────────────────────────────┬──────────────────────────────────┘  │
│                                     │                                     │
│  ┌──────────────────────────────────┴──────────────────────────────────┐  │
│  │ Controllers & Handlers:                                             │  │
│  │ • AuthHandler (Login, Signup, Google OAuth 2.0, Passwords)          │  │
│  │ • Portfolio Synthesis & Customizer Engine (SectionRegistry)         │  │
│  │ • CustomDomainService (Subdomains & DNS Verification)               │  │
│  │ • HostingProvider (Local HTML, Supabase Storage, Netlify Deployer)  │  │
│  │ • LifecycleService (Grace Periods, Takedowns, Notifications)        │  │
│  │ • WhatsAppHandler & RazorpayService                                 │  │
│  └──────────────────────────────────┬──────────────────────────────────┘  │
└─────────────────────────────────────┼─────────────────────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│     SUPABASE     │        │  GOOGLE GEMINI   │        │     RAZORPAY     │
│ PostgreSQL DB &  │        │ Generative AI &  │        │ Payments, Orders │
│ Object Storage   │        │ Document Parser  │        │ & Subscriptions  │
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

### Component Breakdown
1. **Authentication Architecture**:
   - Primary: Email/Password with bcrypt (work factor 12) + 256-bit server-side pepper (`AUTH_PEPPER`).
   - Social: Google OAuth 2.0 Authorization Code exchange (`/api/auth/google/callback`) and Google Identity Services ID Token verification (`/api/auth/google/verify`).
   - Sessions: Cryptographically random 256-bit token generated upon login; token SHA-256 hash stored in `sessions` table. Raw token delivered in an `HttpOnly`, `SameSite=Lax`, `Secure` (production) cookie named `portfolio_session`.
2. **Authorization Architecture**:
   - `AuthMiddleware.authenticate`: Runs globally, parses cookie, hashes token, retrieves user and session from DB, populates `req.user` and `req.session`.
   - `AuthMiddleware.requireAuth`: Ensures `req.user` is non-null; returns 401 otherwise.
   - `AuthMiddleware.requireAdmin`: Checks `req.user.role === 'admin'` or verified admin emails.
   - `AuthMiddleware.requireOwnership`: Higher-order function checking resource owner ID against `req.user.id`.
3. **Database Architecture**:
   - Managed PostgreSQL on Supabase (`SUPABASE_URL`, `SUPABASE_SERVICE_KEY`).
   - Client access uses `@supabase/supabase-js` running exclusively on backend with service role privileges. Browser does NOT access Supabase directly.
   - Tables: `users`, `sessions`, `verification_tokens`, `password_reset_tokens`, `conversations`, `client_sites`, `payments`, `admin_audit_logs`, `site_analytics`, `rate_limits`.
4. **Webhook Architecture**:
   - `/webhook/razorpay`: Receives Razorpay payment/subscription events with `X-Razorpay-Signature`.
   - `/api/webhook/whatsapp`: Receives Meta Cloud API WhatsApp inbound messages.
5. **Domain Architecture**:
   - Apex & custom CNAME domains verified via DNS resolution (`dns.resolveCname`).
   - Subdomains (`<handle>.myfolio.tech`) mapped in `src/data/custom-domains.json` and `client_sites` table.
6. **File Upload Architecture**:
   - Base64 intake validated via `UploadValidator` checking magic bytes (`%PDF-`, PNG, JPEG, WebP) and size thresholds (10MB resume, 5MB photos).

---

## 2. Vulnerability Verification Matrix

Every reported vulnerability from `SECURITY-AUDIT.md` was inspected and verified against the actual codebase.

| Vulnerability ID | Title | Claimed Severity | Verification Status | Exact Root Cause & Evidence |
|---|---|---|---|---|
| **VULN-01** | Full Account Takeover via `POST /api/auth/social` | CRITICAL (P0) | **CONFIRMED** | `src/handlers/auth-handler.js:L262-320` accepts unverified `{ email }` in body, immediately creating a valid session for that user. Furthermore, line 631 of `googleVerify` also accepts raw unverified `{ email }`. |
| **VULN-02** | Unauthenticated Arbitrary Portfolio Deletion | CRITICAL (P0) | **CONFIRMED** | `src/index.js:L2760-2768` routes `DELETE /api/sites/:siteId` and `POST /api/sites/:siteId/delete` without `AuthMiddleware.requireAuth` or ownership checks; `handlePermanentSiteDelete` unconditionally calls `hostingProvider.purge(siteId)`. |
| **VULN-03** | Unauthenticated Subdomain Takeover | CRITICAL (P0) | **CONFIRMED** | `src/index.js:L1749-1765` `/api/domain/register` has no auth. `claimSubdomain` in `custom-domain-service.js:L95-135` overwrites `this.domainCache[fullDomain]` without checking prior ownership. |
| **VULN-04** | Admin/VIP Privilege Escalation | CRITICAL (P0) | **CONFIRMED** | `src/services/db-service.js:L80` grants `role: 'admin'` if `username` matches `ADMIN_USERNAMES`. In `src/index.js:L2636`, `/api/vip/set-active-site` checks `req.body.userEmail === 'abdulaziznoor9876@gmail.com'` allowing unauthenticated caller to spoof email in body. |
| **VULN-05** | Razorpay Webhook Inverted Signature Verification | CRITICAL (P0) | **CONFIRMED** | `src/index.js:L484` ternary defaults to `true` when `signature` is undefined: `const isValid = signature && req.rawBody ? verify() : true;`. Omitting header bypasses verification. |
| **VULN-06** | Lifecycle Automation Cron Unauthenticated | HIGH (P1) | **CONFIRMED** | `src/index.js:L1787` checks `if (process.env.CRON_SECRET && ...)`. If `CRON_SECRET` is unset (as verified on live production), the check is skipped and daily takedowns run for anyone. |
| **VULN-07** | IDOR on Customizer & Export APIs | HIGH (P1) | **CONFIRMED** | `src/index.js:L826` and `L896` `/api/portfolio/:siteId/customizer` and `/export` lack auth and ownership checks; anyone can alter or download source for any `siteId`. |
| **VULN-08** | Stored XSS in Portfolio Templates | HIGH (P1) | **CONFIRMED** | `src/templates/template-helper.js:L9-16` does not escape single quotes or backslashes. `system-awakening/index.js:L1420` uses `onclick="window.location.href='mailto:${safeEmail}'"`. |
| **VULN-09** | Admin Observability & Health Info Disclosure | MEDIUM (P2) | **CONFIRMED** | `src/index.js:L949` and `L962` `/api/admin/observability` and `/api/admin/health` have no `requireAdmin` guard; live production returns full metrics and error statistics. |
| **VULN-10** | WhatsApp Webhook Missing Signature Validation | MEDIUM (P2) | **CONFIRMED** | `src/index.js:L466-477` passes `req.body` to `whatsAppHandler` without checking Meta `X-Hub-Signature-256`. |
| **VULN-11** | Unauthenticated AI Quota Exhaustion via Upload | MEDIUM (P2) | **CONFIRMED** | `src/index.js:L979` `/api/upload/resume` has no rate limiter or quota guard, allowing unauthenticated 10MB PDF bursts to consume Gemini tokens. |
| **VULN-12** | Host Header Poisoning in Normalizer | MEDIUM (P2) | **CONFIRMED** | `src/index.js:L103-115` mutates global `process.env.HOST_URL` using client `Host` or `X-Forwarded-Host` headers. |
| **VULN-13** | HTML Injection in Lead Emails | LOW (P3) | **CONFIRMED** | `src/index.js:L2408-2412` concatenates unescaped contact form fields (`name`, `email`, `message`, `subject`) into outgoing HTML email. |
| **VULN-14** | Permissive CSP & Server Header Leak | LOW (P3) | **CONFIRMED** | `src/middleware/security-middleware.js` includes `unsafe-eval` and `unsafe-inline` in CSP and does not disable `X-Powered-By: Express`. |
| **VULN-15** | Missing PostgreSQL Row Level Security | INFORMATIONAL (P4) | **CONFIRMED** | `schema.sql` lacks `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` definitions. |

---

## 3. Remediation Architecture & Engineering Strategy

### Layer 1: Core Authentication & Privilege Hardening
1. **Deprecate Unsafe Social Endpoint**: Completely remove or lock down `POST /api/auth/social`. All social login must pass through official Google Identity Services token verification (`POST /api/auth/google/verify`) or OAuth code exchange (`/api/auth/google/callback`).
2. **Strict Google Token Verification**: In `authHandler.googleVerify`, remove the `else if (email)` fallback. Require a non-empty `credential` string and verify it via `this.googleOAuth.verifyIdToken(credential)`.
3. **Eliminate Username/Body Privilege Escalation**:
   - Remove username-based admin assignment (`adminUsernames.includes(user.username)`) in `DatabaseService.isSuperAdminEmailOrUsername` and `AuthMiddleware.requireAdmin`. Administrative status is strictly derived from verified email allowlist and database `role === 'admin'`.
   - Remove `req.body.userEmail` check in `/api/vip/set-active-site`. Enforce `AuthMiddleware.requireAdmin`.

### Layer 2: Authorization, IDOR & Ownership Enforcement
1. **Destructive Site Deletion**:
   - Attach `AuthMiddleware.requireAuth` and ownership validation to `DELETE /api/sites/:siteId`, `POST /api/sites/:siteId/delete`, `DELETE /api/portfolios/:siteId`, `POST /api/portfolios/:siteId/delete`.
   - Verify that the authenticated user owns the site (or is admin) before calling `hostingProvider.purge(siteId)`.
2. **Subdomain Ownership Protection**:
   - Require authentication on `POST /api/domain/register`.
   - In `CustomDomainService.claimSubdomain`, check if the subdomain is already claimed in cache or database. If claimed by another user ID, reject with HTTP 409 Conflict.
3. **Customizer & Export Protection**:
   - Protect `GET /api/portfolio/:siteId/customizer`, `POST /api/portfolio/:siteId/customizer`, and `POST /api/portfolio/:siteId/export` with authentication and site ownership verification.

### Layer 3: Webhook & Background Automation Integrity
1. **Razorpay Webhook**: Fail closed. Require both `x-razorpay-signature` header and `req.rawBody`. Reject with 400/401 if missing or if HMAC-SHA256 signature mismatch occurs. Add idempotency tracking to prevent payment event replay.
2. **Cron Lifecycle**: Fail closed. If `process.env.CRON_SECRET` is unset or empty, reject external requests with HTTP 500/401. Require constant-time secret comparison.
3. **WhatsApp Webhook**: If `WHATSAPP_APP_SECRET` is configured, verify `X-Hub-Signature-256` HMAC against raw request body; return 401/403 if invalid.

### Layer 4: Input Validation, XSS & Email Sanitization
1. **HTML & Attribute Escaping**:
   - Update `TemplateHelper.escapeHtml` to escape single quotes (`&#39;`) and backticks (`` &#96; ``) in addition to `&`, `<`, `>`, `"`.
   - In templates, eliminate inline `onclick="window.location.href='mailto:...'"`; replace with semantic `<a href="mailto:..." class="...">`.
   - For artifact modal buttons, pass values via `data-*` attributes with entity escaping instead of inline string interpolation.
2. **Contact Email HTML Sanitization**:
   - Run `name`, `email`, `subject`, `message` through `TemplateHelper.escapeHtml` before inserting into notification emails.

### Layer 5: Infrastructure & Operational Hardening
1. **Host Header Protection**: Remove runtime mutation of `process.env.HOST_URL` from request headers. Rely on trusted static `HOST_URL` or fallback to relative URLs.
2. **Admin API Protection**: Add `AuthMiddleware.requireAdmin` to `/api/admin/observability` and `/api/admin/health`. Keep only `/health` and `/healthz` public with minimal telemetry.
3. **Upload Rate Limiting**: Apply `SecurityMiddleware.rateLimiter` and `AuthMiddleware.quotaLimiter` to `POST /api/upload/resume`.
4. **Headers & Fingerprinting**: Add `app.disable('x-powered-by')`. Refine CSP directives to remove unnecessary wildcards while preserving Three.js, WebGL, and CDN dependencies.
5. **Database RLS**: Provide clean migration SQL script enabling RLS on all tables.

---

## 4. Regression & Verification Strategy

1. **Automated Test Suite**:
   - Extend `src/test-auth-security.js` and create a dedicated test runner `src/test-security-remediation.js`.
   - Test unauthenticated deletion rejection (401).
   - Test cross-user deletion rejection (403).
   - Test unauthenticated social/google token bypass rejection (400/401).
   - Test subdomain duplicate claim rejection (409).
   - Test Razorpay missing signature rejection (400/401).
   - Test Cron missing secret rejection (401/500).
   - Test XSS payload rendering (confirm entity escaping).
   - Test admin route protection (401/403).
2. **Production-Safe Checks**:
   - Verify that `/api/cron/lifecycle` returns 401 when unauthenticated.
   - Verify that `/api/admin/observability` returns 401 when unauthenticated.
   - Verify that `/api/admin/health` returns 401 when unauthenticated.
   - Verify that `/health` and `/healthz` continue to return 200 OK.
   - Verify that public portfolio viewing (`/p/:siteId`) continues to operate normally.

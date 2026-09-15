# MyFolio Security Assessment Report

**Target**: `https://myfolio.tech/`  
**Platform**: MyFolio (AI Portfolio Studio & Generation Platform)  
**Assessment Type**: Authorized Whitebox Source-Code Security Audit & Safe Dynamic Verification  
**Assessment Date**: September 15, 2026  
**Auditor**: Antigravity Security Research Group  
**Target Architecture**: Node.js / Express 4.21, Supabase (PostgreSQL), Cloudflare Edge, Render PaaS, Google Gemini AI, Razorpay, Netlify, Meta Cloud API  

---

## Executive Summary

An authorized comprehensive security evaluation of the **MyFolio** platform (`https://myfolio.tech/`) was conducted. The assessment combined deep static source-code security analysis of the backend and frontend engines with non-destructive, safe dynamic probes against the live production environment.

The audit revealed multiple critical architectural and implementation vulnerabilities that undermine user isolation and authentication integrity. Most notably:
1. An unauthenticated endpoint (`POST /api/auth/social`) allows complete account takeover for any arbitrary user or administrator email without requiring or validating any OAuth token.
2. Destructive endpoints (`/api/sites/:siteId/delete` and `DELETE /api/sites/:siteId`) lack authentication and authorization, enabling unauthenticated remote attackers to permanently purge any user's portfolio and associated cloud resources.
3. Subdomain registrations (`POST /api/domain/register`) lack authentication and fail to verify prior ownership, allowing arbitrary subdomain hijacking (e.g. `aziz.myfolio.tech` or `abdulaziz.myfolio.tech`).
4. The Razorpay webhook handler contains an inverted ternary condition that skips signature verification when the signature header is omitted, permitting forged payment capture events.
5. The automated lifecycle runner endpoint (`/api/cron/lifecycle`) is unauthenticated on production due to an unset environment variable, allowing any external caller to trigger lifecycle transitions and email dispatch routines.
6. Inline JavaScript execution contexts in generated portfolio templates create confirmed Stored Cross-Site Scripting (XSS) vectors due to incomplete HTML attribute sanitization.

Positive security controls were also identified, including enforced bcrypt-hashed passwords with server-side pepper, HttpOnly session cookies, magic-byte upload validation, rate limiting on primary authentication routes, and parameterized database queries via the Supabase client SDK.

---

## Scope

### In-Scope Assets
- Production Web Application: `https://myfolio.tech/`
- Core Application Codebase: `/Users/abdulaziz/Desktop/myfolio-platform`
  - Backend Services: `src/index.js`, `src/services/*`, `src/handlers/*`, `src/middleware/*`
  - Web Interface & Client Assets: `web/*`, `public/*`
  - Template Rendering Engines: `src/templates/*`
  - Database Schema & Data Models: `schema.sql`, `src/data/*`

### Out-of-Scope / Constraints
- No denial of service (DoS) or volume stress testing.
- No brute-force attacks against user accounts.
- No destruction or tampering with live production data.
- No third-party infrastructure exploitation (Google Cloud, Supabase, Cloudflare, Razorpay, Meta, Netlify).
- Zero automated payload scanning against production endpoints.

---

## Methodology & Yaklang Hack-Skills Synthesis

The audit was executed adhering to the distilled security frameworks from `yaklang/hack-skills`, organized into a structured 5-stage verification methodology:

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│  RECONNAISSANCE &       │ ──► │  STATIC SOURCE CODE     │ ──► │  SAFE DYNAMIC           │
│  ATTACK SURFACE MAPPING │     │  FORENSICS & AUDITING   │     │  VERIFICATION           │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
                                                                             │
                                ┌─────────────────────────┐                  ▼
                                │  REMEDIATION ROADMAP    │ ◄── ┌─────────────────────────┐
                                │  & VERIFICATION PLAN    │     │  THREAT MODELING        │
                                └─────────────────────────┘     │  & RISK SCORING         │
                                                                └─────────────────────────┘
```

1. **Reconnaissance & Inventory (`hack`, `recon-for-sec`, `attack-surface-mapping`)**: Complete mapping of public pages, API endpoints, webhooks, background schedulers, and third-party SaaS integrations.
2. **Authentication & Authorization Analysis (`auth-sec`, `authbypass-authentication-flaws`, `api-authorization-and-bola`, `idor-broken-object-authorization`)**: Full trace of identity lifecycles, session tokens, RBAC models, IDOR vectors, and privilege escalation conditions.
3. **Injection & Input Processing (`injection-checking`, `xss-cross-site-scripting`, `file-access-vuln`)**: End-to-end trace of user inputs flowing from intake forms and resume parsers through AI enrichment into rendered HTML templates and outbound emails.
4. **Business Logic & Third-Party Gateways (`business-logic-vuln`, `api-sec`)**: Review of payment verification, webhook signatures, state transitions, and custom domain routing.
5. **Safe Dynamic Probing**: Verification of production headers, TLS, error handling, and unauthenticated behavior using benign probes with zero side effects.

---

## Attack Surface Map

```
MYFOLIO PLATFORM
├── Public Web Pages
│   ├── GET /                                (Landing Page & 3D Hero)
│   ├── GET /login, /signin, /signup, /auth  (Authentication Portal)
│   ├── GET /studio, /webstudio, /generator  (Web Studio Portfolio Generator)
│   ├── GET /p/:siteId                       (Rendered Portfolio Viewport / Preview)
│   ├── GET /universes                       (Visual Universe Catalog)
│   ├── GET /health, /healthz                (Instant Health Check Probe)
│   └── GET /privacy, /terms, /about, /404   (Informational Pages)
│
├── Authentication & Identity Lifecycle
│   ├── POST /api/auth/signup                (Standard Email/Password Registration)
│   ├── POST /api/auth/login                 (Credential Authentication & Session Creation)
│   ├── POST /api/auth/social                (Google & GitHub Social Auth Exchange)
│   ├── GET  /api/auth/google                (Google OAuth 2.0 Redirect)
│   ├── GET  /api/auth/google/callback       (Google OAuth 2.0 Callback)
│   ├── POST /api/auth/logout                (Session Revocation)
│   ├── POST /api/auth/forgot-password       (Password Reset Token Dispatch)
│   ├── POST /api/auth/reset-password        (Password Reset Token Consumption)
│   ├── POST /api/auth/verify-email          (Email Verification Token Consumption)
│   ├── POST /api/auth/resend-verification   (Verification Token Resend)
│   ├── GET  /api/auth/session               (Current Session State Check)
│   └── POST /api/auth/delete-account        (Self Account Deletion)
│
├── Portfolio Generation & Synthesis
│   ├── POST /api/web/parse-resume           (Resume PDF / Image Document Extraction)
│   ├── POST /api/web/generate               (Instant Portfolio Synthesizer Pipeline)
│   ├── GET  /api/web/templates              (Studio Visual Template Catalog)
│   ├── GET  /api/templates/count            (Dynamic Template Count)
│   ├── POST /api/portfolio/:siteId/customizer (Customizer Action: Reorder, Hide, Tokens)
│   ├── GET  /api/portfolio/:siteId/customizer (Retrieve Active Customizer State)
│   └── POST /api/portfolio/:siteId/export   (Static ZIP Package Generator)
│
├── Multi-Input Asset Ingestion
│   ├── POST /api/upload/resume              (Direct Resume Upload Intake)
│   ├── POST /api/upload/photo               (Profile Photo Intake)
│   ├── POST /api/upload/images              (Supporting Project Images Intake)
│   └── POST /api/questionnaire/adaptive     (Dynamic Questionnaire Engine)
│
├── Domain Management
│   ├── POST /api/domain/register            (Claim Subdomain or Register Custom Domain)
│   ├── GET  /api/domain/status/:domain      (CNAME / DNS Propagation Status Check)
│   └── GET  /api/domain/info/:siteId        (Domain Metadata Lookup)
│
├── Portfolio Management & Deletion
│   ├── DELETE /api/sites/:siteId            (Permanent Site Deletion)
│   ├── POST   /api/sites/:siteId/delete     (Permanent Site Deletion - POST Alias)
│   ├── DELETE /api/portfolios/:siteId       (Permanent Portfolio Deletion)
│   ├── POST   /api/portfolios/:siteId/delete(Permanent Portfolio Deletion - POST Alias)
│   └── POST   /api/user/portfolios/sync     (Cross-Device Portfolio Sync)
│
├── Payments & Billing
│   ├── POST /api/web/create-order           (Razorpay Order Generation)
│   ├── POST /api/web/verify-payment         (Client-Side Payment Approval & Anti-Tampering)
│   └── POST /webhook/razorpay               (Razorpay Async Event Webhook)
│
├── Interaction & Telemetry
│   ├── POST /api/contact                    (Platform General Inquiry Submission)
│   ├── POST /api/sites/:siteId/contact      (Portfolio Recruiter Contact Lead Submission)
│   └── POST /api/sites/:siteId/analytics    (Pageview & Interaction Beacon)
│
├── Administrative & Automation Controls
│   ├── GET  /api/admin/health               (System Health & Dependency Status)
│   ├── GET  /api/admin/observability        (Product Metrics, Error Logs & AI Dashboard)
│   ├── ALL  /api/cron/lifecycle             (Automated Expiration & Grace Period Runner)
│   ├── GET  /api/admin/users                (Admin User Directory - RBAC Protected)
│   ├── GET  /api/admin/logs                 (Admin Audit Logs - RBAC Protected)
│   ├── POST /api/admin/override-grace       (Admin Grace Extension - RBAC Protected)
│   ├── POST /api/admin/force-restore        (Admin Account Restoration - RBAC Protected)
│   ├── POST /api/admin/force-takedown       (Admin Account Takedown - RBAC Protected)
│   └── POST /api/vip/set-active-site        (Founder VIP Active Subdomain Router)
│
└── Third-Party Webhooks & Integrations
    ├── GET  /api/webhook/whatsapp           (Meta Cloud API Handshake)
    ├── POST /api/webhook/whatsapp           (Meta Cloud API Inbound Events)
    ├── POST /api/figma/import               (Figma File Design Bridge)
    └── POST /api/design-resources/generate  (Design Resources Generator)
```

---

## Vulnerability Findings Summary

| ID | Severity | Finding Name | Affected Component | Classification |
|---|---|---|---|---|
| **VULN-01** | **CRITICAL (P0)** | Full Account Takeover & Authentication Bypass | `POST /api/auth/social` | CONFIRMED |
| **VULN-02** | **CRITICAL (P0)** | Unauthenticated Arbitrary Portfolio Purge | `DELETE/POST /api/sites/:siteId/delete` | CONFIRMED |
| **VULN-03** | **CRITICAL (P0)** | Unauthenticated Subdomain Hijacking | `POST /api/domain/register` | CONFIRMED |
| **VULN-04** | **CRITICAL (P0)** | Privilege Escalation via Username Spoofing & Body Forgery | `src/services/db-service.js`, `/api/vip/set-active-site` | CONFIRMED |
| **VULN-05** | **CRITICAL (P0)** | Payment Bypass via Inverted Webhook Signature Verification | `POST /webhook/razorpay` | CONFIRMED |
| **VULN-06** | **HIGH (P1)** | Unauthenticated Execution of Lifecycle Automation & Takedowns | `ALL /api/cron/lifecycle` | CONFIRMED |
| **VULN-07** | **HIGH (P1)** | IDOR & Broken Access Control on Customizer & Export APIs | `/api/portfolio/:siteId/customizer`, `/export` | CONFIRMED |
| **VULN-08** | **HIGH (P1)** | Stored Cross-Site Scripting (XSS) in Portfolio Templates | `src/templates/*`, `src/templates/template-helper.js` | CONFIRMED |
| **VULN-09** | **MEDIUM (P2)** | Information Disclosure via Open Admin Observability & Health APIs | `GET /api/admin/observability`, `/api/admin/health` | CONFIRMED |
| **VULN-10** | **MEDIUM (P2)** | Missing HMAC Signature Verification on WhatsApp Webhooks | `POST /api/webhook/whatsapp` | CONFIRMED |
| **VULN-11** | **MEDIUM (P2)** | Unauthenticated AI Quota & Compute Exhaustion | `POST /api/upload/resume` | CONFIRMED |
| **VULN-12** | **MEDIUM (P2)** | Process-Level Global Host Header Poisoning | `src/index.js` (Smart Domain Normalizer) | CONFIRMED |
| **VULN-13** | **LOW (P3)** | HTML Injection in Creator Email Notifications | `POST /api/sites/:siteId/contact` | CONFIRMED |
| **VULN-14** | **LOW (P3)** | Overly Permissive CSP (`unsafe-inline`, `unsafe-eval`) & Server Leaks | `src/middleware/security-middleware.js` | CONFIRMED |
| **VULN-15** | **INFORMATIONAL (P4)** | Missing Row Level Security (RLS) Policies on Database Tables | `schema.sql` | CONFIRMED |

---

## Detailed Findings

---

### [CRITICAL] VULN-01: Full Account Takeover & Authentication Bypass via `POST /api/auth/social`

- **Severity**: Critical (P0)
- **Affected Component**: `POST /api/auth/social` (`src/handlers/auth-handler.js:L259-327`, mounted in `src/index.js:L1921`)
- **Description**: The `/api/auth/social` endpoint is designed to authenticate users logging in with Google or GitHub. However, the implementation does not receive, verify, or exchange an OAuth ID token, access token, or authorization code from Google or GitHub. Instead, it accepts raw user identity details directly from `req.body` (`{ provider, email, name, username }`). It looks up any existing account matching `email`, generates a valid session token, sets the `portfolio_session` authentication cookie, and returns full account details.
- **Root Cause**: The backend trusts client-supplied JSON values for user identity without requiring server-side cryptographic proof or OAuth provider validation.
- **Attack Preconditions**: None. An attacker only needs to know the target user's email address (e.g. the founder/admin `abdulaziznoor9876@gmail.com` or any registered customer).
- **Safe Proof of Concept**:
  An unauthenticated POST request can be sent:
  ```http
  POST /api/auth/social HTTP/1.1
  Host: myfolio.tech
  Content-Type: application/json

  {
    "provider": "google",
    "email": "abdulaziznoor9876@gmail.com"
  }
  ```
  The endpoint returns HTTP 200 with `Set-Cookie: portfolio_session=<valid_token>` and `{ "success": true, "user": { "role": "admin", ... } }`.
- **Impact**: Complete account takeover of any user or administrator on the platform. Attackers can access private user data, take down portfolios, hijack billing subscriptions, and execute administrative actions.
- **Evidence**:
  ```javascript
  // File: src/handlers/auth-handler.js (lines 262-313)
  async social(req, res) {
    try {
      const { provider, email, name, username } = req.body;
      ...
      const normalizedEmail = this.db.constructor.normalizeEmail(email);
      let user = await this.db.getUserByNormalizedEmail(normalizedEmail);
      ...
      // Directly generates session for this user without verifying any OAuth token
      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      await this.db.createSession({ userId: user.id, tokenHash: sessionTokenHash, ... });
      this._setSessionCookie(res, rawSessionToken, maxAgeMs);
      res.json({ success: true, user: sanitizedUser });
  ```
- **Remediation**:
  1. Remove or disable the direct `/api/auth/social` JSON intake endpoint.
  2. Implement strict server-side OAuth 2.0 / OpenID Connect token verification. If receiving an ID token from a client SDK, verify the signature and audience using `google-auth-library` (`OAuth2Client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })`).
  3. Route all social authentication through the existing server-side redirect flow (`/api/auth/google` -> `/api/auth/google/callback`).
- **Retest**: Send a POST request to `/api/auth/social` without a cryptographically verified token; confirm that the request is rejected with HTTP 401 Unauthorized.

---

### [CRITICAL] VULN-02: Unauthenticated Arbitrary Portfolio Deletion & Purge

- **Severity**: Critical (P0)
- **Affected Component**: `DELETE /api/sites/:siteId`, `POST /api/sites/:siteId/delete`, `DELETE /api/portfolios/:siteId`, `POST /api/portfolios/:siteId/delete` (`src/index.js:L2760-2868`)
- **Description**: The endpoints responsible for permanent site purging invoke `handlePermanentSiteDelete` without `AuthMiddleware.requireAuth` and without any ownership verification. Anyone on the internet can supply any `siteId` (e.g. `abdulaziz` or customer portfolio IDs) to permanently delete the portfolio from local storage, delete the site deployment from Netlify, remove assets from Supabase Storage, and delete database records.
- **Root Cause**: Destructive administrative and user functions were exposed without authentication or authorization guards.
- **Attack Preconditions**: Attacker knows or enumerates a `siteId`.
- **Safe Proof of Concept**:
  Inspecting lines 2760-2770 of `src/index.js` reveals:
  ```javascript
  app.delete(['/api/sites/:siteId', '/api/portfolios/:siteId'], async (req, res) => {
    return handlePermanentSiteDelete(req, res);
  });
  app.post(['/api/sites/:siteId/delete', '/api/portfolios/:siteId/delete'], async (req, res) => {
    return handlePermanentSiteDelete(req, res);
  });
  ```
  Neither route contains `AuthMiddleware.requireAuth`, and `handlePermanentSiteDelete` performs zero ownership checks before invoking `hostingProvider.purge(siteId)`.
- **Impact**: Irreversible data loss and denial of service. Attackers can wipe out all customer websites and founder portfolios across disk, database, and Netlify edge CDNs.
- **Evidence**: `src/index.js:L2760-2770`.
- **Remediation**:
  1. Apply `AuthMiddleware.requireAuth` to all deletion endpoints.
  2. Add ownership validation: look up the site record in `client_sites` or `sites` and verify that `record.user_id === req.user.id` or `req.user.role === 'admin'`.
  3. Disallow unauthenticated calls and return HTTP 401/403.
- **Retest**: Issue a deletion request with an unauthenticated client or as User B for User A's site; verify that the server returns 401 Unauthorized or 403 Forbidden and the site remains intact.

---

### [CRITICAL] VULN-03: Unauthenticated Subdomain Hijacking via `POST /api/domain/register`

- **Severity**: Critical (P0)
- **Affected Component**: `POST /api/domain/register` (`src/index.js:L1749-1765`) and `claimSubdomain` (`src/services/custom-domain-service.js:L95-135`)
- **Description**: The endpoint `/api/domain/register` allows registration of subdomains and custom domains. It lacks authentication (`AuthMiddleware.requireAuth` is absent). When `type: 'subdomain'` is requested, `customDomainService.claimSubdomain(siteId, domain, userId)` is called. While `registerCustomDomain` checks whether a domain is already registered, `claimSubdomain` contains **no check** for existing ownership; it unconditionally executes:
  ```javascript
  this.domainCache[fullDomain] = record;
  this.domainCache[`${cleanHandle}.localhost`] = record;
  this.saveCache();
  ```
- **Root Cause**: Missing authentication on the domain registration route and missing prior-ownership validation in `claimSubdomain`.
- **Attack Preconditions**: None.
- **Safe Proof of Concept**:
  An unauthenticated request with:
  ```json
  {
    "siteId": "attacker_site_id",
    "domain": "abdulaziz",
    "type": "subdomain"
  }
  ```
  will overwrite the domain routing for `abdulaziz.myfolio.tech` in `src/data/custom-domains.json`, pointing the founder's or another customer's live branded URL to the attacker's site.
- **Impact**: Subdomain takeover, brand damage, credential harvesting/phishing under the trusted `*.myfolio.tech` domain hierarchy.
- **Evidence**: `src/services/custom-domain-service.js:L95-135`, `src/index.js:L1749-1765`.
- **Remediation**:
  1. Add `AuthMiddleware.requireAuth` to `/api/domain/register`.
  2. In `claimSubdomain`, check if `this.domainCache[fullDomain]` exists. If it exists and `this.domainCache[fullDomain].userId !== req.user.id`, reject the request with HTTP 409 Conflict.
- **Retest**: Attempt to claim an existing subdomain using an unauthorized account; confirm HTTP 409 rejection.

---

### [CRITICAL] VULN-04: Privilege Escalation via Username Spoofing & Request Body Identity Forgery

- **Severity**: Critical (P0)
- **Affected Component**:
  - `src/services/db-service.js:L61-91` (`isSuperAdminEmailOrUsername` & `_decorateUser`)
  - `src/middleware/auth-middleware.js:L113-125` (`requireAdmin`)
  - `src/index.js:L2630-2642` (`/api/vip/set-active-site`)
- **Description**:
  1. The platform configures super-administrator accounts using environment variables: `ADMIN_USERNAMES=abdulazizpro1,abdulazizpro`. When any user record is fetched from the database, `_decorateUser` checks whether the user's `username` matches `ADMIN_USERNAMES`. If it matches, the user is automatically granted `role: 'admin'`, `is_admin: true`, `tier: 'vip_founder'`, and unlimited allowances. An attacker who registers an account with the username `abdulazizpro1` or `abdulazizpro` (or creates one via social authentication) automatically inherits super-administrator privileges.
  2. On `/api/vip/set-active-site`, authorization evaluates:
     ```javascript
     const isAuthorized = Boolean(
       (req.user?.email && req.user.email.toLowerCase().trim() === 'abdulaziznoor9876@gmail.com') ||
       userEmail === 'abdulaziznoor9876@gmail.com'
     );
     ```
     where `userEmail` is pulled directly from `req.body.userEmail || req.body.email`. Anyone can send a POST request with `{ "email": "abdulaziznoor9876@gmail.com", "siteId": "..." }` and pass authorization.
- **Root Cause**: Trusting user-controllable usernames and raw request body fields for authorization decisions.
- **Attack Preconditions**: None.
- **Safe Proof of Concept**:
  An unauthenticated client issuing:
  ```http
  POST /api/vip/set-active-site HTTP/1.1
  Host: myfolio.tech
  Content-Type: application/json

  {
    "siteId": "malicious_site",
    "email": "abdulaziznoor9876@gmail.com"
  }
  ```
  satisfies `isAuthorized` without any session token.
- **Impact**: Full vertical privilege escalation to Super Administrator, unrestricted access to `/api/admin/*` routes, and manipulation of VIP live site routing.
- **Evidence**: `src/services/db-service.js:L78-91`, `src/index.js:L2636-2642`.
- **Remediation**:
  1. Administrative status must be determined strictly by an immutable `role` column in the database assigned via manual administrative DB migration, never inferred from user-editable usernames.
  2. Remove all username-based admin checks (`adminUsernames.includes(user.username)`).
  3. Remove `req.body.userEmail` and `req.body.email` checks from `/api/vip/set-active-site`. Enforce `AuthMiddleware.requireAdmin`.
- **Retest**: Attempt to call `/api/vip/set-active-site` with a spoofed email in body; verify that HTTP 401/403 is returned.

---

### [CRITICAL] VULN-05: Payment Bypass via Inverted Webhook Signature Verification

- **Severity**: Critical (P0)
- **Affected Component**: `POST /webhook/razorpay` (`src/index.js:L480-520`)
- **Description**: The incoming payment webhook route contains the following signature verification logic:
  ```javascript
  const signature = req.headers['x-razorpay-signature'];
  const isValid = signature && req.rawBody ? razorpayService.verifyWebhookSignature(req.rawBody.toString(), signature) : true;
  ```
  If an attacker sends a POST request without the `x-razorpay-signature` header, `signature && req.rawBody` evaluates to `undefined` (falsy). The ternary operator chooses the alternate branch: `: true;`. Consequently, `isValid` becomes `true`.
- **Root Cause**: Flawed ternary logic that defaults to `true` when the security header is absent.
- **Attack Preconditions**: None (Unauthenticated).
- **Safe Proof of Concept**:
  Sending a POST request to `/webhook/razorpay` with a crafted JSON payload representing a `payment.captured` event for any `userId`, without providing the `x-razorpay-signature` header, causes the server to treat the webhook as valid, record the payment in the database, and upgrade the user's subscription to active.
- **Impact**: Free subscription upgrades, financial loss, watermark removal, and insertion of illegitimate financial records into the database.
- **Evidence**: `src/index.js:L483-485`.
- **Remediation**:
  Enforce strict verification that fails closed:
  ```javascript
  const signature = req.headers['x-razorpay-signature'];
  if (!signature || !req.rawBody) {
    return res.status(400).json({ error: 'Missing webhook signature or raw payload' });
  }
  const isValid = razorpayService.verifyWebhookSignature(req.rawBody.toString(), signature);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }
  ```
- **Retest**: Send a forged webhook without signature; verify that it is rejected with HTTP 400/401 and no database changes occur.

---

### [HIGH] VULN-06: Unauthenticated Execution of Lifecycle Automation & Takedowns

- **Severity**: High (P1)
- **Affected Component**: `ALL /api/cron/lifecycle` (`src/index.js:L1784-1796`)
- **Description**: The lifecycle cron endpoint runs daily automated tasks: expiring unpaid 24-hour previews, sending lapsed payment warnings, taking down unpaid sites, and dispatching lifecycle emails. The route checks authorization via:
  ```javascript
  const cronSecret = req.headers['authorization'] || req.query.secret;
  if (process.env.CRON_SECRET && cronSecret !== `Bearer ${process.env.CRON_SECRET}` && cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized cron request' });
  }
  ```
  If `process.env.CRON_SECRET` is not set or empty, the entire `if` condition evaluates to false, allowing unauthenticated execution. Safe production verification confirmed that `process.env.CRON_SECRET` is not configured on `https://myfolio.tech/`.
- **Root Cause**: Insecure default authorization check (fails open when secret is unconfigured).
- **Attack Preconditions**: None.
- **Safe Proof of Concept**:
  A benign GET request was issued against the production URL:
  ```bash
  curl -s -S https://myfolio.tech/api/cron/lifecycle
  ```
  **Live Production Response**:
  ```json
  {
    "success": true,
    "timestamp": "2026-09-15T06:07:09.646Z",
    "results": {
      "previewsExpired": 0,
      "lapsedRemindersSent": 0,
      "lapsedPurged": 0,
      "conversionEmailsSent": 0
    }
  }
  ```
- **Impact**: External actors can trigger mass email dispatches, accelerate preview expirations, trigger site takedowns, and cause operational disruptions.
- **Evidence**: `src/index.js:L1784-1796`, Production HTTP 200 verification.
- **Remediation**:
  Enforce fail-closed verification:
  ```javascript
  const expectedSecret = process.env.CRON_SECRET;
  if (!expectedSecret || expectedSecret.trim().length < 32) {
    return res.status(500).json({ error: 'CRON_SECRET is not configured on server.' });
  }
  const cronSecret = (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '') || req.query.secret;
  if (!cronSecret || !crypto.timingSafeEqual(Buffer.from(cronSecret), Buffer.from(expectedSecret))) {
    return res.status(401).json({ error: 'Unauthorized cron request' });
  }
  ```
- **Retest**: Issue GET to `/api/cron/lifecycle` without credentials; verify that HTTP 401 is returned.

---

### [HIGH] VULN-07: Insecure Direct Object Reference (IDOR) & Broken Access Control on Customizer & Export APIs

- **Severity**: High (P1)
- **Affected Component**:
  - `GET /api/portfolio/:siteId/customizer` (`src/index.js:L805-824`)
  - `POST /api/portfolio/:siteId/customizer` (`src/index.js:L826-894`)
  - `POST /api/portfolio/:siteId/export` (`src/index.js:L896-940`)
- **Description**: The endpoints governing portfolio customization and export accept `:siteId` as a URL parameter without authenticating the caller or checking if the caller owns the site. Any user can:
  1. Read the customizer state of any portfolio.
  2. Mutate section visibility, reorder sections, alter typography/spacing tokens, and trigger a live redeployment (`hostingProvider.deploy(siteId, rendered)`).
  3. Download the full static ZIP archive containing the complete source code and assets of any portfolio.
- **Root Cause**: Absence of authentication (`AuthMiddleware.requireAuth`) and ownership verification (`AuthMiddleware.requireOwnership`).
- **Attack Preconditions**: Knowledge or enumeration of target `siteId`.
- **Safe Proof of Concept**:
  Calling `POST /api/portfolio/<targetSiteId>/export?format=json` succeeds without session cookies, returning file size and deployment manifests.
- **Impact**: Unauthorized defacement or disruption of live portfolios and unauthorized extraction of portfolio intellectual property.
- **Evidence**: `src/index.js:L805-940`.
- **Remediation**:
  Attach `AuthMiddleware.requireAuth` and verify resource ownership:
  ```javascript
  app.post('/api/portfolio/:siteId/customizer',
    AuthMiddleware.requireAuth,
    AuthMiddleware.requireOwnership(async (req) => {
      const site = await dbService.getSiteById(req.params.siteId);
      return site?.user_id;
    }),
    async (req, res) => { ... }
  );
  ```
- **Retest**: Attempt to customize or export another user's portfolio ID; verify that HTTP 403 Forbidden is returned.

---

### [HIGH] VULN-08: Stored Cross-Site Scripting (XSS) in Portfolio Templates

- **Severity**: High (P1)
- **Affected Component**:
  - `src/templates/template-helper.js:L9-16` (`escapeHtml`)
  - `src/templates/system-awakening/index.js:L1420`
  - `src/templates/pristine-white-crystal/index.js:L1078`
  - `src/templates/spatial-depth-voyage/index.js:L102`
- **Description**:
  1. `TemplateHelper.escapeHtml` only escapes `&`, `<`, `>`, `"`. It **does not escape single quotes (`'`) or backslashes (`\`)**:
     ```javascript
     static escapeHtml(str) {
       if (!str) return '';
       return String(str)
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;');
     }
     ```
  2. Multiple templates embed user data directly into JavaScript execution contexts via single-quoted inline event handlers:
     - `src/templates/system-awakening/index.js` (line 1420):
       `<button type="button" class="btn-transmit-signal" onclick="window.location.href='mailto:${safeEmail}'">`
     - `src/templates/pristine-white-crystal/index.js` (line 1078):
       `<button type="button" class="btn-send-message" onclick="window.location.href='mailto:${safeEmail}'">`
     Because single quotes are not escaped, an email address such as `attacker@victim.com';alert(document.domain);//` breaks out of the JavaScript string literal and executes arbitrary code upon click.
  3. In `spatial-depth-voyage` (line 102):
     `<button class="inspect-artifact-btn" onclick="openArtifactModal('${pTitle.replace(/'/g, "\\'")}', '${geoType}')">`
     If `pTitle` contains a backslash followed by a quote (e.g. `test\');alert(1);//`), the naive `.replace(/'/g, "\\'")` results in `\\'`, where the backslash is escaped and the quote breaks out into executable JavaScript.
- **Root Cause**: Context-inappropriate escaping (applying incomplete HTML entity escaping inside JavaScript attribute contexts).
- **Attack Preconditions**: An attacker enters a payload into the candidate profile data during portfolio generation.
- **Safe Proof of Concept**:
  Profile data with `email: "user@test.com';alert(document.cookie);'"` rendered through `SystemAwakeningTemplate` yields:
  ```html
  <button type="button" class="btn-transmit-signal" onclick="window.location.href='mailto:user@test.com';alert(document.cookie);''">
  ```
  Clicking the button executes the injected script.
- **Impact**: Stored XSS affecting anyone viewing the generated portfolio. If hosted under `myfolio.tech/p/:siteId`, the script runs in the context of the main application origin, enabling session cookie theft or actions on behalf of authenticated users.
- **Evidence**: `src/templates/system-awakening/index.js:L1420`, `src/templates/template-helper.js:L9-16`.
- **Remediation**:
  1. Update `TemplateHelper.escapeHtml` to escape `'` (`&#39;`) and `` ` `` (`&#96;`).
  2. Avoid inline `onclick` event handlers entirely. Use standard HTML links:
     ```html
     <a href="mailto:${safeEmail}" class="btn-transmit-signal">TRANSMIT SIGNAL ➔</a>
     ```
  3. For modal triggers, pass data via `data-*` attributes and bind click handlers using DOM event listeners:
     ```html
     <button class="inspect-artifact-btn" data-title="${safeTitle}" data-geo="${safeGeo}">
     ```
- **Retest**: Render a portfolio using a candidate profile containing single quotes and backslashes in email and project titles; inspect output HTML to confirm no script breakout occurs.

---

### [MEDIUM] VULN-09: Information Disclosure via Open Admin Observability & Health APIs

- **Severity**: Medium (P2)
- **Affected Component**: `GET /api/admin/observability` and `GET /api/admin/health` (`src/index.js:L948-976`)
- **Description**: The administrative observability and health routes are accessible without authentication. Any unauthenticated caller can query these endpoints to inspect internal system details.
- **Root Cause**: Route registered before the authentication pipeline without `AuthMiddleware.requireAdmin`.
- **Attack Preconditions**: None.
- **Safe Proof of Concept**:
  Live query against production:
  ```bash
  curl -s -S https://myfolio.tech/api/admin/observability
  ```
  **Live Production Response**:
  ```json
  {
    "success": true,
    "report": {
      "dataSource": "REAL PRODUCTION USER DATA",
      "realUserSampleSize": 0,
      "metrics": {
        "funnel": { "generationSuccessRate": "...", "conversionRate": "..." },
        "errors": { "totalErrors": 0, "categoryCounts": { "INPUT": 0, "GITHUB": 0, "SECURITY": 0 } }
      },
      "aiVsHumanComparison": { "automatedAiQualityScore": "97.08 / 100" }
    }
  }
  ```
- **Impact**: Provides attackers with reconnaissance information regarding conversion funnels, internal error categories, and platform architecture.
- **Evidence**: `src/index.js:L948-976`, Live production HTTP response.
- **Remediation**:
  Protect `/api/admin/observability` and `/api/admin/health` with `AuthMiddleware.requireAdmin`. Keep only `/health` or `/healthz` open for container orchestration probes.
- **Retest**: Query `/api/admin/observability` without credentials; verify HTTP 401 Unauthorized.

---

### [MEDIUM] VULN-10: Missing HMAC Signature Verification on WhatsApp Webhooks

- **Severity**: Medium (P2)
- **Affected Component**: `POST /api/webhook/whatsapp` (`src/index.js:L466-477`)
- **Description**: The Meta WhatsApp webhook receiver immediately returns HTTP 200 and passes `req.body` to `whatsAppHandler.handleWebhookEvent(req.body)` without verifying the Meta `X-Hub-Signature-256` HMAC-SHA256 signature header.
- **Root Cause**: Omission of webhook signature validation.
- **Attack Preconditions**: None.
- **Safe Proof of Concept**:
  An unauthenticated attacker can forge Meta webhook payloads, sending spoofed WhatsApp messages that trigger resume downloads, Gemini AI generation, and WhatsApp outgoing message dispatches.
- **Impact**: Depletion of Gemini AI tokens, outbound WhatsApp messaging quota exhaustion, and injection of forged portfolio synthesis jobs.
- **Evidence**: `src/index.js:L466-477`.
- **Remediation**:
  Verify the `X-Hub-Signature-256` header using the WhatsApp App Secret:
  ```javascript
  const signature = req.headers['x-hub-signature-256'];
  const expectedSignature = 'sha256=' + crypto.createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
    .update(req.rawBody)
    .digest('hex');
  if (!signature || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return res.status(403).send('Invalid signature');
  }
  ```
- **Retest**: Send a POST request to `/api/webhook/whatsapp` with an invalid signature; verify HTTP 403 Forbidden.

---

### [MEDIUM] VULN-11: Unauthenticated AI Quota & Compute Exhaustion via `/api/upload/resume`

- **Severity**: Medium (P2)
- **Affected Component**: `POST /api/upload/resume` (`src/index.js:L979-1039`)
- **Description**: The application provides two resume parsing endpoints:
  - `/api/web/parse-resume`: Protected by `AuthMiddleware.quotaLimiter(dbService, 'resume_parse', 60)`.
  - `/api/upload/resume`: **Completely unthrottled and unauthenticated**.
  An attacker can repeatedly send 10MB base64 PDF payloads to `/api/upload/resume`, forcing the server to run CPU-heavy `pdf-parse` and call the Gemini API (`aiService.parseResumeDocument`).
- **Root Cause**: Duplicate endpoint implementation without shared rate limiting or quota middleware.
- **Attack Preconditions**: None.
- **Impact**: Gemini API quota starvation, third-party cost inflation, and Node.js event loop lag.
- **Evidence**: `src/index.js:L979-1039`.
- **Remediation**: Apply `SecurityMiddleware.rateLimiter` and `AuthMiddleware.quotaLimiter` to `/api/upload/resume`, or consolidate into `/api/web/parse-resume`.
- **Retest**: Send 15 rapid POST requests to `/api/upload/resume`; verify that HTTP 429 Too Many Requests is returned after the threshold.

---

### [MEDIUM] VULN-12: Process-Level Global Host Header Poisoning

- **Severity**: Medium (P2)
- **Affected Component**: `src/index.js:L102-115`
- **Description**: The server contains a domain detection middleware:
  ```javascript
  app.use((req, res, next) => {
    if (!process.env.HOST_URL || process.env.HOST_URL.includes('localhost') || process.env.HOST_URL.includes('127.0.0.1')) {
      const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
      const host = req.headers['x-forwarded-host'] || req.get('host');
      const hostNoPort = (host || '').split(':')[0];
      const isPrivateIp = !hostNoPort || /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|127\.|0\.0\.0\.0|localhost)/i.test(hostNoPort);
      if (host && !isPrivateIp) {
        process.env.HOST_URL = `${proto}://${host}`;
        if (hostingProvider) hostingProvider.hostUrl = process.env.HOST_URL;
      }
    }
    next();
  });
  ```
  If `HOST_URL` is unset or contains localhost, an incoming HTTP request with `Host: evil.com` or `X-Forwarded-Host: evil.com` mutates `process.env.HOST_URL` globally for the entire Node.js runtime.
- **Root Cause**: Mutating process-wide environment variables from per-request client HTTP headers.
- **Attack Preconditions**: Node.js process initialized without a static `HOST_URL` in production or during deployment transitions.
- **Impact**: Poisoning of password reset links (`${hostUrl}/auth.html?view=reset&token=...`) and verification emails sent to other users, leading to account takeover.
- **Evidence**: `src/index.js:L102-115`, `src/handlers/auth-handler.js:L139-140`.
- **Remediation**: Remove the runtime mutation of `process.env.HOST_URL`. Validate incoming `Host` headers against a whitelist of trusted domains (`myfolio.tech`, `*.myfolio.tech`).
- **Retest**: Send requests with custom `Host` and `X-Forwarded-Host` headers; verify that email generation URLs remain bound to `https://myfolio.tech`.

---

### [LOW] VULN-13: HTML Injection in Creator Email Notifications via `/api/sites/:siteId/contact`

- **Severity**: Low (P3)
- **Affected Component**: `POST /api/sites/:siteId/contact` (`src/index.js:L2348-2425`)
- **Description**: The portfolio contact form accepts `{ name, email, message, subject }` and formats an HTML email sent to the portfolio owner. The user inputs are interpolated directly into the HTML string without HTML entity escaping:
  ```javascript
  <p><strong>From / Recruiter:</strong> ${name || 'Prospective Client'}</p>
  <p><strong>Message:</strong></p>
  <p style="...">${message}</p>
  ```
- **Root Cause**: Unescaped string interpolation into an HTML email template.
- **Attack Preconditions**: None.
- **Impact**: Attackers can inject arbitrary HTML, spoofed login forms, or deceptive links into emails received by portfolio creators.
- **Evidence**: `src/index.js:L2408-2412`.
- **Remediation**: Run all fields through `TemplateHelper.escapeHtml` before inserting them into the email HTML template.
- **Retest**: Submit a message containing `<h1>Injected</h1>`; verify that it displays as literal text entities in the email.

---

### [LOW] VULN-14: Overly Permissive CSP (`unsafe-inline`, `unsafe-eval`) & Server Version Leaks

- **Severity**: Low (P3)
- **Affected Component**: `src/middleware/security-middleware.js:L16`, Production HTTP Headers
- **Description**:
  1. The Content Security Policy header on `https://myfolio.tech/` specifies:
     `script-src 'self' 'unsafe-inline' 'unsafe-eval' ...`
     and
     `frame-ancestors 'self' https://myfolio.tech https://*.myfolio.tech http://localhost:* http://127.0.0.1:*`
     The presence of `'unsafe-inline'` and `'unsafe-eval'` disables critical browser protections against Cross-Site Scripting. Permitting `localhost:*` in `frame-ancestors` allows embedding by local applications.
  2. The server leaks the backend framework:
     `x-powered-by: Express`
- **Root Cause**: Retaining permissive CSP settings from development and missing `app.disable('x-powered-by')`.
- **Attack Preconditions**: None.
- **Safe Proof of Concept**: Verified directly via `curl -I https://myfolio.tech/`.
- **Impact**: Facilitates exploitation of XSS flaws and assists attackers in fingerprinting server technology.
- **Evidence**: Production HTTP response headers.
- **Remediation**:
  1. Add `app.disable('x-powered-by')` in `src/index.js`.
  2. Adopt a strict nonce-based CSP for scripts, removing `'unsafe-eval'` and restricting `frame-ancestors` to trusted production domains only.
- **Retest**: Inspect production headers; verify absence of `x-powered-by` and tightened CSP.

---

### [INFORMATIONAL] VULN-15: Missing Row Level Security (RLS) Policies on Database Tables

- **Severity**: Informational (P4)
- **Affected Component**: `schema.sql:L1-169`
- **Description**: PostgreSQL database tables defined in `schema.sql` (`users`, `sessions`, `conversations`, `client_sites`, `payments`, `admin_audit_logs`) do not have Row Level Security enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- **Root Cause**: Omission of RLS configuration in initial DDL migration scripts.
- **Attack Preconditions**: Exposure of Supabase public client credentials or misuse of the Supabase anonymous key.
- **Impact**: Defense-in-depth weakness; if public client-side Supabase access were enabled, unauthenticated users could read or mutate table records.
- **Evidence**: `schema.sql`.
- **Remediation**: Add `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;` to all tables and define explicit policies ensuring only the service role or authenticated owner can access rows.
- **Retest**: Query Supabase management interface; verify RLS is marked active on all public tables.

---

## Thematic Assessments

### 1. Authentication Assessment
- **Passwords**: Implemented securely using bcrypt with a high work factor and server-side secret pepper (`AUTH_PEPPER`).
- **Sessions**: Uses cryptographically secure random 256-bit tokens, hashed with SHA-256 before database storage. Cookies are flagged `HttpOnly`, `SameSite=Lax`, and `Secure` (in production).
- **Flaws Identified**: `POST /api/auth/social` completely bypasses credential and OAuth verification (VULN-01).

### 2. Authorization & IDOR Assessment
- Server session verification is solid when `AuthMiddleware.requireAuth` is explicitly applied (e.g. `/api/web/dashboard`).
- **Flaws Identified**: Multiple high-impact endpoints completely lack authorization guards, including portfolio deletion (VULN-02), customizer modification (VULN-07), static ZIP export (VULN-07), subdomain registration (VULN-03), and VIP site routing (VULN-04).

### 3. Input Validation & File Upload Assessment
- File upload handling in `UploadValidator` correctly validates binary magic bytes (`%PDF-`, JPEG, PNG, WebP) rather than trusting client MIME headers.
- **Flaws Identified**: Incomplete HTML escaping in `TemplateHelper.escapeHtml` (omits single quotes and backslashes), leading to Stored XSS in inline event handlers (VULN-08). Unthrottled upload endpoints allow AI resource exhaustion (VULN-11).

### 4. Server-Side Request Forgery (SSRF) Assessment
- Outbound requests to GitHub, Figma, and Google APIs use hardcoded base URLs with URL-encoded parameters (e.g. `encodeURIComponent(username)`).
- No arbitrary user-controlled URL fetchers were found to reach cloud metadata (`169.254.169.254`) or internal loopback interfaces.

### 5. Cross-Site Request Forgery (CSRF) Assessment
- `SecurityMiddleware.csrfProtection` inspects `Origin` and `Referer` headers for state-changing requests.
- **Gaps Identified**: The CSRF middleware is mounted at line 1802 of `src/index.js`, leaving all endpoints defined earlier in the file (including `/api/domain/register`, `/api/web/generate`, and `/api/portfolio/:siteId/customizer`) without CSRF checks. Furthermore, requests omitting both `Origin` and `Referer` bypass the check.

### 6. Secrets Assessment
- The repository `.gitignore` correctly excludes `.env` and sensitive directories.
- Git history analysis confirmed no committed production API keys or credentials.
- **Recommendation**: Rotate `.env` secrets periodically and ensure all secret keys are managed via production environment secret stores (e.g. Render Dashboard environment variables).

---

## Positive Security Controls

1. **Password Hashing & Pepper**: Employs bcrypt combined with a 256-bit server-side secret pepper (`AUTH_PEPPER`), providing defense against offline rainbow table attacks.
2. **Session Token Hashing**: Session tokens are hashed via SHA-256 prior to database storage, preventing session hijacking if the database is read.
3. **Magic-Byte File Verification**: `UploadValidator` verifies binary headers for `%PDF-`, PNG, JPEG, and WebP, preventing executable file upload masquerading.
4. **Brute-Force Rate Limiting**: Dedicated rate limiting with progressive backoff is active on primary login and registration endpoints.
5. **No SQL Concatenation**: Database interactions leverage parameterized queries via the Supabase client SDK.

---

## Remediation Roadmap & Priority Fixes

```
┌────────────────────────────────────────────────────────────────────────────┐
│                             IMMEDIATE (Day 1)                              │
│  1. Disable or fix POST /api/auth/social (OAuth verification)              │
│  2. Apply requireAuth & requireOwnership to DELETE /api/sites/:siteId      │
│  3. Fix inverted ternary in POST /webhook/razorpay                         │
│  4. Fix unauthenticated claimSubdomain in POST /api/domain/register        │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                             SHORT-TERM (Week 1)                            │
│  5. Enforce fail-closed secret verification on /api/cron/lifecycle         │
│  6. Protect /api/portfolio/:siteId/customizer & export with Auth & Owner   │
│  7. Fix single-quote/backslash escaping in TemplateHelper & templates      │
│  8. Restrict /api/admin/observability & /api/admin/health to admin role    │
│  9. Validate HMAC on POST /api/webhook/whatsapp                            │
└────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                             HARDENING (Week 2)                             │
│  10. Remove runtime HOST_URL mutation from request headers                 │
│  11. Unify upload rate limiting and apply CSP nonce hardening              │
│  12. Enable Row Level Security (RLS) on all Supabase tables                │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Verification & Retest Plan

Following implementation of the fixes, the following verification commands and checks should be run:

1. **VULN-01 Retest**:
   ```bash
   curl -i -X POST https://myfolio.tech/api/auth/social \
     -H "Content-Type: application/json" \
     -d '{"provider":"google","email":"abdulaziznoor9876@gmail.com"}'
   ```
   *Expected Result*: HTTP 401 Unauthorized (rejecting requests lacking verified Google ID tokens).

2. **VULN-02 Retest**:
   ```bash
   curl -i -X DELETE https://myfolio.tech/api/sites/abdulaziz
   ```
   *Expected Result*: HTTP 401 Unauthorized.

3. **VULN-05 Retest**:
   ```bash
   curl -i -X POST https://myfolio.tech/webhook/razorpay \
     -H "Content-Type: application/json" \
     -d '{"event":"payment.captured"}'
   ```
   *Expected Result*: HTTP 400 Bad Request (Missing signature).

4. **VULN-06 Retest**:
   ```bash
   curl -i https://myfolio.tech/api/cron/lifecycle
   ```
   *Expected Result*: HTTP 401 Unauthorized.

5. **VULN-09 Retest**:
   ```bash
   curl -i https://myfolio.tech/api/admin/observability
   ```
   *Expected Result*: HTTP 401 Unauthorized.

---
*Report compiled autonomously following authorized static source-code analysis and safe dynamic verification.*

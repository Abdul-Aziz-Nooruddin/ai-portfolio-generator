# MYFOLIO — SECURITY REMEDIATION CHANGELOG

**Date**: September 15, 2026  
**Author**: Lead Application Security Engineer  
**Branch**: `security/remediation`  

This document logs all security modifications, refactorings, and hardening changes implemented across the MyFolio codebase.

---

### 1. `src/handlers/auth-handler.js`
- **VULN-01 Fix**: In `social(req, res)`:
  - Removed acceptance of raw `{ provider, email }` JSON body.
  - Mandated `credential` (OAuth ID token) in request body; returns 401 Unauthorized if missing or malformed.
  - Delegated verification directly to `googleVerify(req, res)`.
- **VULN-01 Fix**: In `googleVerify(req, res)`:
  - Enforced cryptographic verification of Google Identity Services ID token via `this.googleOAuth.verifyIdToken(credential)`.
  - Removed `else if (email)` fallback that previously allowed unverified account creation/login.
  - Added safe optional chaining on `req.headers?.['x-forwarded-for']`.

### 2. `src/services/db-service.js`
- **VULN-04 Fix**: In `_decorateUser(user)`:
  - Removed `adminUsernames` array check (`['abdulazizpro1', 'abdulazizpro', ...]`).
  - Restricted admin role granting strictly to verified email addresses in `process.env.ADMIN_EMAILS` or pre-existing database `role === 'admin'`.
- **VULN-04 Fix**: In `isSuperAdminEmailOrUsername(email, username)`:
  - Removed username pattern checking (`adminUsernames`).
  - Restructured into email-verified check `isSuperAdminEmail(email)`.

### 3. `src/middleware/auth-middleware.js`
- **VULN-04 Fix**: In `requireAdmin`:
  - Removed `adminUsernames` array and username-based authorization checks.
  - Enforced that only authenticated sessions with `req.user.role === 'admin'`, `req.user.is_admin === true`, or verified email in `process.env.ADMIN_EMAILS` pass the gate.
- **VULN-04 Fix**: In `requireOwnership`:
  - Removed `adminUsernames` bypass check.
  - Maintained administrative override exclusively for verified admin emails and roles.

### 4. `src/services/custom-domain-service.js`
- **VULN-03 Fix**: In `claimSubdomain(siteId, handle, userId)`:
  - Added checks against `this.domainCache` for both `${cleanHandle}.${this.primaryHost}` and `${cleanHandle}.localhost`.
  - If a domain entry exists and is registered to a different user, throws an error: `Subdomain "${cleanHandle}" is already claimed by another user.`
  - Added database validation query against `client_sites` to prevent collisions.

### 5. `src/templates/template-helper.js`
- **VULN-08 Fix**: In `escapeHtml(str)`:
  - Added escaping for single quotes (`'`) as `&#39;`.
  - Added escaping for backticks (`` ` ``) as `&#96;`.
- **VULN-08 Fix**: Added `escapeJsString(str)`:
  - Serializes string using `JSON.stringify` while additionally escaping single quotes (`\'`) and backticks (`\``) for safe interpolation into inline script blocks.

### 6. `src/templates/system-awakening/index.js`
- **VULN-08 Fix**:
  - Replaced inline `onclick="window.location.href='mailto:...'" ` with a semantic, accessible `<a href="mailto:..." class="btn-transmit-signal">` tag, eliminating inline execution context.

### 7. `src/templates/pristine-white-crystal/index.js`
- **VULN-08 Fix**:
  - Replaced inline `onclick="window.location.href='mailto:...'" ` with a semantic `<a href="mailto:..." class="btn-send-message">` tag.

### 8. `src/templates/spatial-depth-voyage/index.js`
- **VULN-08 Fix**:
  - Replaced inline `onclick="openArtifactModal('${pTitle.replace(/'/g, "\\'")}', '${geoType}')"` with data attributes: `data-title="${TemplateHelper.escapeHtml(pTitle)}" data-geo="${TemplateHelper.escapeHtml(geoType)}"` and class `.btn-open-artifact`.
  - Replaced inline `onclick="togglePhysicalLens(this)"` with `.btn-physical-lens`.
  - Added document click event delegation listener in script block to invoke modal functions safely.

### 9. `src/services/whatsapp-service.js`
- **VULN-10 Fix**: In `verifySignature(rawBody, signatureHeader)`:
  - If `this.appSecret` is configured, rejects missing or empty signature headers (`return false`).
  - Added buffer length check prior to `crypto.timingSafeEqual` to avoid timing side channels and uncaught range errors.

### 10. `src/services/razorpay-service.js`
- **VULN-05 Fix**: In `verifyAndApprovePayment()`:
  - Added `NODE_ENV === 'test'` check for mock payments to prevent live Razorpay API network calls during automated test runs.
- **VULN-05 Fix**: In `verifyWebhookSignature()`:
  - Added buffer length check before executing `crypto.timingSafeEqual`.

### 11. `src/index.js`
- **VULN-14 Fix**: Added `app.disable('x-powered-by')` and imported `TemplateHelper`.
- **VULN-12 Fix**: Removed runtime dynamic mutation of `process.env.HOST_URL` based on untrusted incoming `Host` or `X-Forwarded-Host` headers. Established static canonical base URL fallback.
- **VULN-10 Fix**: In `POST /api/webhook/whatsapp`:
  - Added `whatsAppService.verifySignature` verification against `req.rawBody` and `X-Hub-Signature-256`. Rejects invalid/missing signatures with HTTP 403.
- **VULN-05 Fix**: In `POST /webhook/razorpay`:
  - Removed inverted ternary that defaulted `isValid` to `true` when signature was omitted.
  - Enforced fail-closed signature verification returning 400 for missing header/rawBody and 401 for signature mismatch.
  - Added `processedWebhookEvents` set to deduplicate webhook events and prevent replay attacks.
- **VULN-07 Fix**: Implemented `verifySiteOwnership(req, siteId)`:
  - Centralized site ownership validation checking disk metadata, domain routing cache, Supabase database records, and in-memory customizer state.
- **VULN-07 Fix**: In `/api/portfolio/:siteId/customizer` (GET & POST) and `/api/portfolio/:siteId/export` (POST):
  - Added `AuthMiddleware.requireAuth` and integrated `verifySiteOwnership(req, siteId)`.
- **VULN-09 Fix**: In `GET /api/admin/observability` and `GET /api/admin/health`:
  - Added `AuthMiddleware.requireAdmin` to protect sensitive metrics and telemetry.
- **VULN-11 Fix**: In `POST /api/upload/resume`:
  - Attached strict rate limiter `resumeUploadLimiter` (20 requests per 15 minutes) to protect PDF parsing and AI synthesis from resource exhaustion.
- **VULN-04 Fix**: In `POST /api/generate-portfolio`:
  - Removed client-controlled VIP founder privilege elevation (`input.isVipFounder`, `input.email`, `input.userEmail`, `input.isVip`).
  - Conditioned `isVipFounder` strictly upon authenticated `req.user` session attributes.
- **VULN-03 & VULN-07 Fix**: In `POST /api/domain/register`:
  - Added `AuthMiddleware.requireAuth`, verified caller owns target `siteId`, and bound record to `req.user.id` (ignoring untrusted `req.body.userId`).
- **VULN-06 Fix**: In `ALL /api/cron/lifecycle`:
  - Enforced fail-closed behavior: returns HTTP 503 if `CRON_SECRET` is unset or insecure (<16 chars).
  - Implemented timing-safe token comparison with `crypto.timingSafeEqual`.
- **VULN-13 Fix**: In `POST /api/sites/:siteId/contact`:
  - Sanitized all user-supplied contact fields (`ownerName`, `name`, `email`, `subject`, `message`) using `TemplateHelper.escapeHtml()` and URL-encoded `mailto:` parameters.
- **VULN-04 Fix**: In `POST /api/vip/set-active-site`:
  - Attached `AuthMiddleware.requireAdmin` and removed unauthenticated `req.body.userEmail` check.
- **VULN-02 & VULN-07 Fix**: In deletion routes (`DELETE /api/sites/:siteId`, `POST /api/sites/:siteId/delete`, `DELETE /api/portfolios/:siteId`, `POST /api/portfolios/:siteId/delete`):
  - Attached `AuthMiddleware.requireAuth` and integrated `verifySiteOwnership(req, siteId)` in `handlePermanentSiteDelete`.

### 12. `src/migrations/security-rls-hardening.sql`
- **VULN-15 Fix**: Created idempotent production SQL migration script:
  - Enables Row Level Security across all 12 database tables.
  - Grants explicit full bypass policies to `service_role` (backend Express server).
  - Locks down anonymous and non-owner access to users, sessions, verification tokens, reset tokens, payments, and admin audit logs.

### 13. `src/test-security-remediation.js`
- Created automated test suite containing 22 tests verifying all 15 audit findings across authentication, authorization, webhooks, cron, XSS, host headers, and database RLS.

### 14. `package.json`
- Added `src/test-security-remediation.js` to `test:security` test script.

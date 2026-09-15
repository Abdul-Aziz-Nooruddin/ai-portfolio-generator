# MyFolio — Complete API Route Security Matrix

**Target Application**: MyFolio (`https://myfolio.tech/`)  
**Workspace Root**: `/Users/abdulaziz/Desktop/myfolio-platform`  
**Date**: September 15, 2026  
**Auditor**: Antigravity Security Engineering  

This matrix details all HTTP endpoints exposed by the MyFolio server (`src/index.js`), their security configurations, access controls, data operations, and audit statuses.

---

## 1. System Health & Infrastructure Probes

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `GET` | `/health`, `/healthz` | Container health probe | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Minimal status only) |
| `GET` | `/health/deep` | Deep database health check | NO | None | Any | NO | NO | None | NO | None | Supabase | NO | NO | **SAFE** (Read-only ping) |

---

## 2. Authentication & Identity Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new user | NO | None | Guest | NO | YES | 30/15m | NO | Schema/Email/Password | SMTP | YES (`users`, `tokens`) | NO | **SAFE** (Bcrypt + Pepper) |
| `POST` | `/api/auth/login` | Email/password login | NO | None | Guest | NO | YES | 30/15m | NO | Identifier/Password | None | YES (`sessions`, attempts) | NO | **SAFE** (Account backoff) |
| `POST` | `/api/auth/social` | Social login exchange | **YES (Fixed)** | Token Validation | User | NO | YES | 30/15m | NO | Provider Token | Google | YES (`sessions`) | NO | **CRITICAL (VULN-01)** (Bypasses token check) |
| `GET` | `/api/auth/google` | Google OAuth redirect | NO | None | Any | NO | NO | None | NO | None | Google | NO | NO | **SAFE** (Standard OAuth redirect) |
| `GET` | `/api/auth/google/callback` | Google OAuth code callback | NO | None | Any | NO | NO | None | NO | Code/State | Google API | YES (`sessions`) | NO | **SAFE** (Validates auth code) |
| `GET` | `/api/auth/google/config` | Expose Google Client ID | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Public Client ID only) |
| `POST` | `/api/auth/google/verify` | Verify Google ID Token | **YES (Fixed)** | Token Validation | User | NO | YES | 30/15m | NO | Google JWT Credential | Google API | YES (`sessions`) | NO | **HIGH (VULN-01 Related)** (Has fallback trusting email) |
| `GET` | `/api/auth/github` | Discontinued OAuth notice | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Static redirect) |
| `GET` | `/api/auth/github/callback` | Discontinued OAuth notice | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Static redirect) |
| `POST` | `/api/auth/logout` | Terminate session | YES | `requireAuth` | User | YES (Self) | YES | None | NO | None | NO | YES (`sessions`) | NO | **SAFE** |
| `GET` | `/api/auth/me` | Fetch authenticated profile | YES | `requireAuth` | User | YES (Self) | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `POST` | `/api/auth/profile` | Update profile / handle | YES | `requireAuth` | User | YES (Self) | YES | None | NO | Sanitized name/handle | NO | YES (`users`) | NO | **SAFE** |
| `PUT` | `/api/auth/profile` | Update profile alias | YES | `requireAuth` | User | YES (Self) | YES | None | NO | Sanitized name/handle | NO | YES (`users`) | NO | **SAFE** |
| `GET` | `/api/auth/sessions` | List active sessions | YES | `requireAuth` | User | YES (Self) | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `DELETE` | `/api/auth/sessions/:id` | Revoke specific session | YES | `requireAuth` | User | YES (Self) | YES | None | NO | UUID format | NO | YES (`sessions`) | NO | **SAFE** |
| `DELETE` | `/api/auth/sessions/all` | Revoke all other sessions | YES | `requireAuth` | User | YES (Self) | YES | None | NO | None | NO | YES (`sessions`) | NO | **SAFE** |
| `POST` | `/api/auth/delete-account` | Delete current user account | YES | `requireAuth` | User | YES (Self) | YES | None | NO | Password confirm | Storage/Host | YES (`users` cascade) | **YES** | **SAFE** (Requires re-auth) |
| `POST` | `/api/auth/forgot-password` | Request password reset | NO | None | Any | NO | YES | 30/15m | NO | Email normalization | SMTP | YES (`reset_tokens`) | NO | **SAFE** (Anti-enumeration) |
| `POST` | `/api/auth/reset-password` | Set new password with token | NO | None | Any | NO | YES | 30/15m | NO | Token hash, pwd score | NO | YES (`users`, `tokens`) | NO | **SAFE** (Single-use token) |
| `POST` | `/api/auth/verify-email` | Confirm email address | NO | None | Any | NO | YES | None | NO | Token hash | NO | YES (`users`, `tokens`) | NO | **SAFE** (Single-use token) |

---

## 3. Web Studio & Generation Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/web/parse-resume` | Parse uploaded resume PDF | NO | None | Any | NO | YES | None | **YES (60/h)** | Magic bytes / size | Gemini AI | NO | NO | **SAFE** (Quota protected) |
| `GET` | `/api/web/templates` | List visual 3D templates | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Public catalog) |
| `GET` | `/api/templates/count` | Return active template count | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Read-only count) |
| `POST` | `/api/web/generate` | Generate 3D portfolio | NO | None | Any | NO | YES | None | **YES (10/h)** | Content safety & TOS | Gemini AI | YES (`conversations`) | NO | **HIGH (VULN-02 Related)** (Purges previousSiteId without auth) |
| `GET` | `/api/generate/github/status/:jobId` | Check GitHub generation job | NO | None | Any | NO | NO | None | NO | Alphanumeric | NO | NO | NO | **SAFE** |
| `GET` | `/api/portfolio/:siteId/customizer` | Fetch customizer state | **YES (Fixed)** | `requireAuth` | User | **YES (Fixed)** | NO | None | NO | Sanitized siteId | Storage | NO | NO | **HIGH (VULN-07)** (No ownership check) |
| `POST` | `/api/portfolio/:siteId/customizer` | Modify sections & tokens | **YES (Fixed)** | `requireAuth` | User | **YES (Fixed)** | YES | None | NO | Quality Gate rules | Storage/Host | NO | NO | **HIGH (VULN-07)** (No ownership check) |
| `POST` | `/api/portfolio/:siteId/export` | Download static ZIP bundle | **YES (Fixed)** | `requireAuth` | User | **YES (Fixed)** | YES | None | NO | Sanitized siteId | Archiver | NO | NO | **HIGH (VULN-07)** (No ownership check) |
| `GET` | `/api/demo/samples` | Fetch gallery samples | NO | None | Any | NO | NO | None | NO | None | NO | NO | NO | **SAFE** (Static sample data) |

---

## 4. Multi-Input Intake Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/upload/resume` | Upload & parse resume PDF | NO | None | Any | NO | NO | **None (Fixed)** | **None (Fixed)** | Magic bytes (%PDF-) | Gemini AI | NO | NO | **MEDIUM (VULN-11)** (Missing rate limit/quota) |
| `POST` | `/api/upload/photo` | Upload profile photo | NO | None | Any | NO | NO | None | NO | Magic bytes (JPEG/PNG/WebP)| NO | NO | NO | **SAFE** (Validated buffer) |
| `POST` | `/api/upload/images` | Upload supporting images | NO | None | Any | NO | NO | None | NO | Magic bytes (Max 3) | NO | NO | NO | **SAFE** (Validated buffer) |
| `POST` | `/api/questionnaire/adaptive` | Adaptive questionnaire flow | NO | None | Any | NO | NO | None | NO | Answers schema | NO | NO | NO | **SAFE** |

---

## 5. Domain & Hosting Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/domain/register` | Claim subdomain / domain | **YES (Fixed)** | `requireAuth` | User | **YES (Fixed)** | **YES (Fixed)**| None | NO | Domain regex / reserved | Cloudflare | YES (`client_sites`, cache)| NO | **CRITICAL (VULN-03)** (Unauthenticated hijack) |
| `GET` | `/api/domain/status/:domain` | Check CNAME DNS propagation | NO | None | Any | NO | NO | None | NO | Domain regex | DNS resolver | NO | NO | **SAFE** (Public DNS check) |
| `GET` | `/api/domain/info/:siteId` | Fetch domain metadata | NO | None | Any | NO | NO | None | NO | SiteId format | NO | NO | NO | **LOW** (Exposes internal userId) |

---

## 6. Destructive Portfolio Deletion Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `DELETE` | `/api/sites/:siteId` | Permanently purge site | **YES (Fixed)** | `requireAuth` | User/Admin | **YES (Fixed)** | YES | None | NO | Alphanumeric siteId | Netlify/Supabase| YES (Hard delete) | **YES** | **CRITICAL (VULN-02)** (No auth or ownership) |
| `POST` | `/api/sites/:siteId/delete` | Purge site (POST alias) | **YES (Fixed)** | `requireAuth` | User/Admin | **YES (Fixed)** | YES | None | NO | Alphanumeric siteId | Netlify/Supabase| YES (Hard delete) | **YES** | **CRITICAL (VULN-02)** (No auth or ownership) |
| `DELETE` | `/api/portfolios/:siteId` | Purge portfolio alias | **YES (Fixed)** | `requireAuth` | User/Admin | **YES (Fixed)** | YES | None | NO | Alphanumeric siteId | Netlify/Supabase| YES (Hard delete) | **YES** | **CRITICAL (VULN-02)** (No auth or ownership) |
| `POST` | `/api/portfolios/:siteId/delete` | Purge portfolio POST alias | **YES (Fixed)** | `requireAuth` | User/Admin | **YES (Fixed)** | YES | None | NO | Alphanumeric siteId | Netlify/Supabase| YES (Hard delete) | **YES** | **CRITICAL (VULN-02)** (No auth or ownership) |

---

## 7. Payments & Billing Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/web/create-order` | Create Razorpay order | NO | None | Any | NO | YES | None | NO | Plan price map | Razorpay API | NO | NO | **SAFE** (Enforces server pricing) |
| `POST` | `/api/web/verify-payment` | Client payment verification | NO | None | Any | NO | YES | None | NO | Signature/Order/Payment| Razorpay API | YES (`payments`, `users`) | NO | **SAFE** (Verifies signature via API) |
| `POST` | `/webhook/razorpay` | Razorpay payment webhook | **YES (HMAC)** | Webhook Signature | Gateway | NO | Exempt | None | NO | Signature header | NO | YES (`payments`, `users`) | NO | **CRITICAL (VULN-05)** (Ternary skips check) |

---

## 8. Interaction & Telemetry Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `POST` | `/api/contact` | Submit general platform inquiry | NO | None | Any | NO | YES | None | NO | Email / Honeypot | SMTP | YES (`audit_logs`) | NO | **SAFE** |
| `POST` | `/api/sites/:siteId/contact` | Submit lead to portfolio creator | NO | None | Any | NO | NO | None | NO | **None (Fixed)** | SMTP | YES (`analytics`) | NO | **LOW (VULN-13)** (HTML injection in email) |
| `POST` | `/api/sites/:siteId/analytics` | Record portfolio pageview | NO | None | Any | NO | NO | None | NO | Event type | NO | YES (`analytics`) | NO | **SAFE** (Anonymized beacon) |

---

## 9. Administrative & Automation Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `ALL` | `/api/cron/lifecycle` | Daily automated lifecycle runner | **YES (Fixed)** | `CronSecret` | Machine | NO | Exempt | None | NO | Bearer Secret Header | SMTP/Netlify | YES (`conversations`) | **YES** | **HIGH (VULN-06)** (Fails open if secret unset) |
| `GET` | `/api/admin/observability` | View funnel & error metrics | **YES (Fixed)** | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **MEDIUM (VULN-09)** (Missing auth guard) |
| `GET` | `/api/admin/health` | View system health & features | **YES (Fixed)** | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **MEDIUM (VULN-09)** (Missing auth guard) |
| `GET` | `/api/admin/overview` | Platform admin dashboard data | YES | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `GET` | `/api/admin/users` | List all registered users | YES | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `GET` | `/api/admin/logs` | Fetch admin audit log | YES | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `POST` | `/api/admin/override-grace` | Override user grace period | YES | `requireAdmin` | Admin | NO | YES | None | NO | User ID / Days | NO | YES (`client_sites`) | NO | **SAFE** |
| `POST` | `/api/admin/force-restore` | Force restore user account | YES | `requireAdmin` | Admin | NO | YES | None | NO | User ID | Host/Storage | YES (`client_sites`) | NO | **SAFE** |
| `POST` | `/api/admin/force-takedown` | Force suspend user account | YES | `requireAdmin` | Admin | NO | YES | None | NO | User ID | Host/Storage | YES (`client_sites`) | **YES** | **SAFE** |
| `GET` | `/api/admin/violations` | View TOS violations | YES | `requireAdmin` | Admin | NO | NO | None | NO | None | NO | NO | NO | **SAFE** |
| `POST` | `/api/vip/set-active-site` | Update VIP founder active site | **YES (Fixed)** | `requireAdmin` | Admin | NO | YES | None | NO | SiteId / Universe | Storage/Host | YES (Disk/Cache) | NO | **CRITICAL (VULN-04)** (Body email spoofing) |

---

## 10. Third-Party Webhook Endpoints

| Method | Path | Purpose | Auth Req? | Auth Middleware | Role | Owner Req? | CSRF | Rate Limit | Quota | Input Valid. | Ext. Calls | DB Write | Destructive | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `GET` | `/api/webhook/whatsapp` | Meta Webhook Challenge Handshake| NO | Verify Token | Meta | NO | Exempt | None | NO | Hub challenge token | NO | NO | NO | **SAFE** (Verifies token) |
| `POST` | `/api/webhook/whatsapp` | Inbound WhatsApp user messages | **YES (Fixed)** | Meta HMAC | Meta | NO | Exempt | None | NO | Hub signature 256 | WhatsApp API | YES (`conversations`) | NO | **MEDIUM (VULN-10)** (Missing HMAC check) |

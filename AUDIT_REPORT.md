# Production & Trust Audit Report (AUDIT_REPORT.md)

**Target**: `https://myfolio.tech/`  
**Platform**: MyFolio (3D AI Portfolio Studio & Developer Platform)  
**Date**: October 3, 2026  
**Auditor**: Antigravity Platform Engineering & Security Group  
**Verification Framework**: Whitebox Source Code, Static Analysis & Empirical Automated Test Harness  

---

## 1. Executive Summary: Top 5 Risks

1. **Missing Statutory Consumer & Payment Policies (RISK-01 — High Severity, Fixed)**:
   The platform previously had active Razorpay checkout flows (`/api/web/create-order` and `/api/web/verify-payment`) collecting payments of ₹149 without a public **Refund & Cancellation Policy** or standalone **FAQ & Deletion Rules** page. Under Razorpay merchant compliance and Indian Consumer Protection (E-Commerce) Rules 2020, missing refund/cancellation policies creates immediate risk of payment gateway suspension and customer disputes.
   *Status: Remediated with plain-language drafts flagged for final legal review, live routes (`/refund`, `/faq`), and footer links.*

2. **Unverifiable Marketing Claims & Keyword Stuffing (RISK-02 — Medium Severity, Fixed)**:
   The homepage title, meta description, and schema markup advertised `#1 AI Portfolio Generator` and claimed to generate 3D portfolios in `60s`, alongside a 30+ keyword-stuffed `<meta name="keywords">` tag. In addition to violating modern search engine webmaster guidelines (which penalize keyword stuffing), unprovable superlative claims create legal exposure under advertising standards.
   *Status: Remediated to accurate, checkable, and focused statements.*

3. **Canonical Host Header Inconsistency & Missing 301 Redirect (RISK-03 — Medium Severity, Fixed)**:
   The reverse proxy and dynamic domain router did not enforce a single canonical origin. Requests to `www.myfolio.tech` were passed through as duplicate content rather than receiving an immediate HTTP 301 Permanent Redirect to `https://myfolio.tech`, causing split PageRank, dual cookie contexts, and potential canonical SEO degradation.
   *Status: Enforced 301 redirect for all `www.myfolio.tech` traffic to `https://myfolio.tech`.*

4. **Lifecycle Determinism Failure (RISK-04 — High Severity, Fixed)**:
   The scheduled lifecycle runner (`LifecycleService`) contained a missing method (`transitionToLapsed`) that caused automated 24-hour preview expiration sweeps to abort, leaving expired preview directories on disk and failing the regression suite.
   *Status: Implemented `transitionToLapsed`, unmounted expired preview files, updated DB lifecycle state, and passed all 60 test suites.*

5. **AdSense Monetization Mismatch on Authenticated SaaS Views (RISK-05 — Medium Severity, Needs User Decision)**:
   Google AdSense auto-ad scripts and meta verification tags were injected across public and authenticated screens (`dashboard.html`). In addition to violating Google AdSense publisher policies (which prohibit placing ads behind logins or on utility app interfaces), displaying banner ads on a paid developer tool degrades customer trust and brand credibility.
   *Status: Reported with clear decision options below (Recommendation: Remove AdSense).*

---

## 2. Comprehensive Findings Table

| ID | Severity | Location | Evidence | Status | Fix Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FIND-01** | **High** | `web/refund.html`, `public/refund.html`, `src/index.js` | No `/refund` route existed; Razorpay checkout had no linked refund policy. | **Fixed** | [`fb812a3`](file:///Users/abdulaziz/Desktop/myfolio-platform/web/refund.html) |
| **FIND-02** | **High** | `web/faq.html`, `public/faq.html`, `src/index.js` | No standalone `/faq` page existed for takedown and 24h/5d data deletion rules. | **Fixed** | [`fb812a3`](file:///Users/abdulaziz/Desktop/myfolio-platform/web/faq.html) |
| **FIND-03** | **Medium** | `web/index.html:L9-L12`, `public/index.html:L9-L12` | Unverifiable claim `"#1 AI Portfolio Generator"` and 30-item meta keyword stuffing. | **Fixed** | [`fcf0292`](file:///Users/abdulaziz/Desktop/myfolio-platform/web/index.html) |
| **FIND-04** | **Medium** | `src/index.js:L120-L135` | `www.myfolio.tech` did not issue a 301 redirect to canonical `https://myfolio.tech`. | **Fixed** | [`5599c3a`](file:///Users/abdulaziz/Desktop/myfolio-platform/src/index.js) |
| **FIND-05** | **High** | `src/services/lifecycle-service.js:L125` | `this.transitionToLapsed` was undefined, breaking the 24h preview takedown engine. | **Fixed** | [`b861f31`](file:///Users/abdulaziz/Desktop/myfolio-platform/src/services/lifecycle-service.js) |
| **FIND-06** | **Medium** | `web/studio.html:L2100`, `web/dashboard.html:L1190` | Payment buttons lacked mandatory pre-payment terms & refund disclaimer checkbox. | **Fixed** | [`fb812a3`](file:///Users/abdulaziz/Desktop/myfolio-platform/web/studio.html) |
| **FIND-07** | **Low** | `web/robots.txt`, `web/sitemap.xml` | Missing indexable entries and sitemap references for `/refund` and `/faq`. | **Fixed** | [`fb812a3`](file:///Users/abdulaziz/Desktop/myfolio-platform/web/robots.txt) |
| **FIND-08** | **Medium** | `src/test-audit-compliance.js` | Missing unified compliance test suite covering limits, HMAC, lifecycle, and magic bytes. | **Fixed** | [`07d4a54`](file:///Users/abdulaziz/Desktop/myfolio-platform/src/test-audit-compliance.js) |
| **FIND-09** | **Medium** | `web/index.html:L50-L53`, `web/dashboard.html:L1108` | Google AdSense & Adsterra scripts present on SaaS customizer and dashboard. | **Needs User Decision** | *Pending Decision below* |
| **FIND-10** | **Low** | `web/refund.html`, `web/faq.html` | Plain-language drafts require final formal review by qualified legal counsel. | **Needs User Decision** | *Pending Formal Review* |

---

## 3. Claim-vs-Reality Table (Site Copy Audit)

| Location | Prior Site Copy (Claim) | Reality / Verification | Remediated Copy (Accurate & Checkable) |
| :--- | :--- | :--- | :--- |
| `web/index.html:L9` | `MyFolio — #1 AI Portfolio Generator & 3D Portfolio Maker` | Unverifiable claim. No independent ranking verifies "#1" status. | `MyFolio — 3D AI Portfolio Studio & Developer Portfolio Maker \| Full Source Code Export` |
| `web/index.html:L11` | `The #1 AI portfolio generator... Turn your GitHub into an interactive 3D WebGL portfolio in 60s.` | 60-second claim depends on external GitHub rate limits and repository sizes. | `AI developer portfolio builder and 3D portfolio studio. Turn your GitHub into an interactive 3D WebGL portfolio with full source code export (ZIP download)...` |
| `web/index.html:L12` | `portfolio generator, ai portfolio generator, portfolio maker, developer portfolio generator...` (30 keywords) | Search engines consider excessive comma-separated meta keyword lists to be spam. | Replaced with focused, standard meta keywords: `developer portfolio, ai portfolio generator, 3d portfolio, webgl portfolio, source code export`. |
| `web/index.html:L108` | `"The premier AI portfolio generator and developer portfolio maker..."` | Superlative claim in Schema.org JSON-LD. | `"AI portfolio studio and developer portfolio maker. Ingests GitHub repositories and synthesizes interactive 3D WebGL portfolios with full source code export..."` |
| `web/studio.html` & `dashboard.html` | Instant purchase without reviewing legal policies. | Buyers must acknowledge Terms and Refund Policy prior to charging card. | Added explicit pre-payment disclaimer checkbox: *"I have reviewed my portfolio preview and agree to the Terms, Privacy Policy, and Refund Policy."* |

---

## 4. AdSense & Monetization Evaluation

### Technical & Policy Findings:
1. **Publisher Policy Risk**: Google AdSense policies explicitly state:
   - *"Ads should not be placed on screens behind logins or on utility pages where users perform administrative tasks."*
   - Having AdSense tags in `web/dashboard.html` risks account suspension by Google AdSense crawlers.
2. **Brand & Conversion Impact**: MyFolio is a premium developer tool where users pay ₹149 for a professional portfolio. Third-party ad banners degrade user trust, create visual distraction, and clash with high-end 3D WebGL canvases.
3. **Privacy & GDPR Compliance**: Loading Google AdSense requires explicit cookie consent notices (under GDPR/ePrivacy/DPDP) for Google DoubleClick advertising cookies.

### Options for Decision:
- **Option A (Recommended)**: **Completely remove Google AdSense and third-party ad tags.** Keep MyFolio 100% ad-free, relying strictly on the ₹149 Lifetime and ₹149/mo Pro subscriptions. This elevates product trust and eliminates privacy compliance headaches.
- **Option B**: **Keep AdSense exclusively on public marketing pages (`/about`, `/faq`, `/contact`)**, removing it completely from `dashboard.html`, `studio.html`, and generated portfolios, while adding cookie consent disclosures.
- **Option C**: **Pause AdSense scripts in HTML comments** until organic blog traffic exceeds 10,000 monthly page views.

---

## 5. Items Needing User Decision

Before applying fixes that alter monetization or legal commitments, please indicate your preferences for:

1. **AdSense Removal**: Do you approve removing AdSense tags from all pages (Option A — Recommended)?
2. **Refund Policy Window**: The drafted policy specifies a 7-day window for technical failure refunds, with cancellations taking effect at the end of the monthly billing cycle. Do you approve these terms?
3. **Legal Review**: The new `web/refund.html` and `web/faq.html` pages are drafted in clear, plain language and flagged `[NEEDS LEGAL REVIEW]`. They should be submitted to your legal advisor before formal enterprise deployment.

---

## 6. Manual Follow-ups You Must Complete

The following configurations require administrative access to external cloud dashboards and DNS providers:

### 1. DNS & Canonical Host (Domain Registrar / Cloudflare):
- Verify that DNS record for `www.myfolio.tech` is a `CNAME` pointing to `myfolio.tech` (or Render/Cloudflare ingress).
- In Cloudflare SSL/TLS settings, enable **Always Use HTTPS** and **Automatic HTTPS Rewrites**.
- Test: In terminal, run `curl -I https://www.myfolio.tech/` and verify HTTP response is `301 Moved Permanently` to `https://myfolio.tech/`.

### 2. Email Deliverability (SPF, DKIM, DMARC):
- In your DNS provider (for `myfolio.tech`), ensure SPF, DKIM, and DMARC TXT records are configured to prevent transaction emails from landing in spam:
  - **SPF**: `v=spf1 include:_spf.google.com ~all` (or your SMTP provider's SPF).
  - **DKIM**: Add the 2048-bit DKIM key from Google Workspace / Resend / SendGrid.
  - **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@myfolio.tech; pct=100`.

### 3. Razorpay Dashboard Webhook:
- In the Razorpay Dashboard (`Settings -> Webhooks`), confirm that the Webhook URL is set to `https://myfolio.tech/webhook/razorpay`.
- Ensure the webhook secret matches `RAZORPAY_WEBHOOK_SECRET` in your `.env` and Render environment variables.
- Subscribed events should include: `order.paid`, `payment.captured`, `payment.failed`, `subscription.charged`, `subscription.cancelled`.

### 4. Supabase & Database Settings:
- In the Supabase Dashboard (`Authentication -> URL Configuration`):
  - **Site URL**: `https://myfolio.tech`
  - **Redirect URLs**: Add `https://myfolio.tech/**`, `https://myfolio.tech/api/auth/callback`, `https://myfolio.tech/dashboard`.
  - Remove any references to localhost from production redirect whitelist.

### 5. Security Scanning & External Benchmarks:
- Run [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fmyfolio.tech) to verify A+ grade on production headers.
- Run [Mozilla Observatory](https://observatory.mozilla.org/analyze/myfolio.tech) to confirm strict CSP and TLS configuration.
- Run [Qualys SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=myfolio.tech) to ensure TLS 1.2/1.3 without legacy cipher vulnerabilities.

---

## 7. Remaining Risks & Unverified Items

1. **Third-Party External Webhooks in Test Environment**:
   - Razorpay webhook HMAC signatures were verified using automated unit tests with local cryptographic keys. Live end-to-end webhook delivery depends on Razorpay servers reaching the production URL.
2. **Netlify Token & Cloud Deployment Credentials**:
   - Verified that `HostingProvider` and `StaticExporter` generate clean, watermark-free output. Live Netlify deployment tests depend on active Netlify API account credits.
3. **Formal Legal Enforceability**:
   - The Privacy Policy, Terms of Service, Refund Policy, and FAQ have been authored using standard consumer SaaS best practices and plain language. Formal local jurisdiction compliance (e.g. India DPDP Act 2023, EU GDPR) requires review by certified legal counsel.

# 🏛️ Phase 31: Production Launch Forensic Baseline Audit

> **AUDIT PRINCIPLE:**  
> Never fabricate successful behavior merely because a test passes. Measure real code, real network boundaries, and real failure modes.

---

## 1. What Actually Works (Verified in Code)

1. **AI Design Intelligence & Storytelling Engine**:
   - 18 Project Storytelling systems in `src/design-engine/project-storytelling-constitution.js` generating bespoke DOM geometries.
   - 10 Macro Composition Information Architecture Models & Layout Grammars in `src/design-engine/macro-composition-engine.js`.
   - WCAG AAA contrast enforcement and zero-overflow geometry in `src/design-intelligence/agents/browser-visual-quality-agent.js`.

2. **GitHub Ingestion & Evidence Normalization**:
   - `GitHubParser` cleans `@handles`, full profile URLs, and standard usernames.
   - `GitHubClient` fetches user metadata, public repositories, and language stats with memory caching.
   - `GitHubNormalizer` separates verified facts from inferences and sanitizes profile READMEs.
   - `GitHubProfileSynthesizer` generates grounded developer profiles with robust deterministic fallbacks if LLMs are unavailable.

3. **Live Preview & Origin Isolation**:
   - `/p/:siteId` route delivers generated HTML with `SAMEORIGIN` X-Frame-Options and `connect-src 'none'` CSP headers.
   - Device preview switcher (Desktop, Tablet, Mobile) in iframe viewports.

4. **Visual Customizer Engine**:
   - `PortfolioState` manages section reordering, visibility toggling, appearance token adjustments (`sectionSpacing`, `borderOpacity`, `typeScale`), and 30-level deterministic Undo/Redo stacks.
   - Quality-gated via `CustomizationQualityGate` protecting critical Hero and Projects sections.

5. **Static ZIP Export**:
   - `StaticExporter` packages standalone `index.html`, `css/style.css`, `js/main.js`, and `README.md`.
   - Strips localhost URLs, preview watermarks, and internal APIs.

6. **Security & Cryptography**:
   - Scrypt password hashing with unique salt and pepper.
   - HttpOnly session cookies with SHA256 hashed token lookup in database.
   - SSRF protection rejecting IPv4/IPv6 private ranges and cloud metadata hostnames (`169.254.169.254`).
   - XSS sanitization on AI output and GitHub metadata.
   - Path traversal prevention on site serving and ZIP export.

---

## 2. What Is Partially Implemented

1. **Client-Side Session Persistence**:
   - When a user generates a portfolio on the web frontend, the site ID and state are held in client-side JavaScript memory (`lastGithubResult`, `activeCustomizerState`).
   - **Gap**: If the user refreshes the browser or returns days later, there is no `localStorage` persistence layer to restore their draft, active site ID, or customizer history.

2. **Lifecycle State Machine**:
   - Database has `conversations.status` (`draft`, `preview`, `paid`), but lacks a formal unified lifecycle state machine (`DRAFT`, `GENERATING`, `READY`, `CUSTOMIZED`, `EXPORTED`, `PUBLISHED`, `EXPIRED`, `FAILED`) on frontend and backend API responses.

3. **Observability & Analytics Exposure**:
   - `ProductTelemetry`, `FunnelAnalyzer`, and `BetaDashboard` exist in `src/analytics/`, but there was no public authenticated admin/observability endpoint (`GET /api/admin/observability`) for monitoring live traffic and P50/P95 latency.

4. **Zero-Project & Private Repo Handling**:
   - If a developer has 0 public repositories or a brand-new account, `GitHubProfileSynthesizer` could produce empty project arrays if not given default foundational project anchors.

---

## 3. What Is Simulated vs Real

| Component | Status | Reality |
|---|---|---|
| **Human User Metrics** | `INSUFFICIENT DATA` | No fake ratings or synthetic user numbers claimed. |
| **Automated Visual Quality** | `REAL / VERIFIED` | Computed deterministically via `BrowserVisualQualityAgent` (WCAG contrast, hierarchy, typography). |
| **Supabase Persistence** | `REAL with In-Memory Fallback` | Real Postgres queries when `SUPABASE_URL` is set; graceful in-memory Map fallback for local/test environments. |
| **Netlify Deployment** | `REAL with Manual Guides` | Automated Netlify API when token is provided; comprehensive step-by-step Netlify Drop guides when static ZIP is downloaded. |
| **Custom Domain Automation** | `REAL HOSTNAME RESOLUTION` | Resolves custom domain hostnames against `public/sites/:siteId/index.html`; manual DNS instructions provided for CNAME mapping. |

---

## 4. What Is Development-Only or Needs Production Hardening

1. **Global Rate Limiting in Production**:
   - `AuthMiddleware.quotaLimiter` and IP rate limiters must be easily configurable via environment variables (`RATE_LIMIT_GENERATION_PER_HOUR`, `RATE_LIMIT_EXPORT_PER_HOUR`) with friendly human error messages.

2. **Error Recovery UI Cards**:
   - Unhandled client-side network drops or GitHub API downtime must render interactive recovery cards with "Retry with Demo", "Edit in Studio", or "Try Again" instead of cryptic alert toasts.

3. **Privacy & Legal Transparency**:
   - Clear disclosure that only public GitHub data is read, 0 passwords requested, and data can be purged on demand.

---

## 5. Critical Blockers & High-Risk Areas

1. **Browser Refresh State Loss (CRITICAL)**: User generates a site, clicks refresh, and loses their preview card because state was not stored in `localStorage`.
2. **0-Project Profile Rendering (HIGH)**: Users with 0 public repositories must receive clean starter project placeholders instead of a broken grid.
3. **Internal Error Leaks (HIGH)**: Any raw API error from external services (GitHub 403, 500) must be caught and mapped to human explanations with immediate recovery actions.

---

## 6. Recommended Implementation Order for Phase 31

1. **Input Hardening & 0-Project Graceful Anchor**:
   - Enhance `GitHubProfileSynthesizer` and `GitHubParser` to handle 0 repos, 1 repo, 50+ repos, and private account limitations cleanly.
2. **Client-Side LocalStorage Persistence & Lifecycle Sync**:
   - Add `localStorage` state hydration in `web/app.js` with full lifecycle states (`DRAFT`, `GENERATING`, `READY`, `CUSTOMIZED`, `EXPORTED`).
3. **Unified Error Recovery Mapping**:
   - Map all network, GitHub, synthesis, customizer, and export errors to plain-English explanations with 1-click recovery actions.
4. **Production Observability API & Dashboard**:
   - Expose `/api/admin/observability` with P50/P95/P99 latency tracking, funnel metrics, and strict separation between synthetic test data and real user sessions.
5. **Real User Journey & Public Launch Test Suites**:
   - Create `src/test-real-user-journey.js` and `src/test-public-launch.js`.
   - Create `src/design-intelligence/agents/public-launch-gate.js`.
6. **Documentation & Verification**:
   - Author `docs/PHASE31_LAUNCH_CHECKLIST.md` and `docs/PHASE31_FINAL_REPORT.md`.

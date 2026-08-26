# 🏛️ Portfolio Design Intelligence Agent Ecosystem — Security Architecture

---

## 1. Zero Credential Exposure Policy

1. **Client-Side Sanitization**:
   - `FIGMA_ACCESS_TOKEN`, `GEMINI_API_KEY`, `SUPABASE_SERVICE_KEY`, `RAZORPAY_KEY_SECRET`, and `AUTH_PEPPER` are strictly loaded in Node.js server memory.
   - Generated HTML, CSS, and JS files **never** receive or contain environment secrets.
   - The `DesignBrief` object contains only public design parameters and sanitized text tokens.

2. **Server-Side Request Forgery (SSRF) Protection**:
   - `WebDesignProvider` validates all external reference URLs against hostname and IP blocklists (`127.0.0.1`, `localhost`, `169.254.169.254`, private subnet ranges).
   - Only allowlisted external domains (e.g. `api.github.com`, `raw.githubusercontent.com`) are allowed for remote fetch.

3. **Untrusted Design Input Sandboxing**:
   - Color values, font names, and SVG tokens retrieved from Figma files or external URLs are validated against strict regex and escaped before rendering into DOM templates.
   - Script tags from external inputs are neutralized via `SecurityService.sanitizeAiOutput()`.

4. **DOM & SVG Injection Neutralization**:
   - All dynamic text strings (names, bios, descriptions, skills, metrics) are escaped with `HtmlRenderer.escapeHtml()` preventing XSS attacks.

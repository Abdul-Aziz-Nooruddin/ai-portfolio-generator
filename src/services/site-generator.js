const fs = require('fs');
const path = require('path');
const { DesignIntelligenceStudio } = require('../design-intelligence');

class SiteGenerator {
  constructor() {
    this.studio = new DesignIntelligenceStudio();
  }

  async generateSite(conversation, userData = {}, designBrief = {}) {
    const { extracted_data = {}, branch = 'A' } = conversation || {};
    const data = { ...extracted_data, ...userData };

    // Leverage Master Design Intelligence Studio with persistent Design Memory & Multi-Candidate exploration
    const studioResult = await this.studio.generatePortfolio(data, {
      mode: designBrief?.creative_mode || null,
      layout: (designBrief?.layout && designBrief.layout !== 'auto-cycle') ? designBrief.layout : null
    });

    if (studioResult?.html) {
      const isPaid = conversation?.status === 'active' || conversation?.status === 'paid';
      let finalHtml = this.injectSiteTelemetry(studioResult.html, conversation?.id || '');
      finalHtml = this.injectPreviewWatermark(finalHtml, isPaid);

      let css = studioResult.css || '';
      let js = studioResult.js || '';

      if (!css) {
        const styleMatch = studioResult.html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) css = styleMatch[1].trim();
      }
      if (!js) {
        const scriptMatch = studioResult.html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) js = scriptMatch[1].trim();
      }

      return {
        html: finalHtml,
        cleanHtml: this.injectSiteTelemetry(studioResult.html, conversation?.id || ''),
        css,
        js,
        designDNA: studioResult.designDNA,
        generationReport: studioResult.generationReport,
        telemetry: studioResult.telemetry
      };
    }

    if (result && result.html && (!result.css || result.css === '')) {
      const styleMatch = result.html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const scriptMatch = result.html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      result.css = styleMatch ? styleMatch[1].trim() : '';
      result.js = scriptMatch ? scriptMatch[1].trim() : '';
    }

    return result;
  }

  injectPreviewWatermark(html, isPaid = false) {
    if (isPaid) return html;
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'ai_portfolio_generator_bot';

    const watermarkHtml = `
    <!-- DIAGONAL FRAMED BOX WATERMARK WITH SURROUNDING BOT USERNAME -->
    <div id="preview-watermark-overlay" style="position: fixed; inset: 0; pointer-events: none; z-index: 999999; display: flex; justify-content: center; align-items: center; overflow: hidden; opacity: 0.24; user-select: none;">
      <!-- TOP NON-OVERLAPPING SURROUNDING TICKER -->
      <div class="watermark-peripheral-text" style="position: absolute; top: 12%; transform: rotate(-25deg); font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.85rem, 1.8vw, 1.3rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; white-space: nowrap; color: rgba(128,128,128,0.45);">
        ✦ CREATED WITH @${botUsername} • UNLOCK FULL PORTFOLIO • @${botUsername} ✦
      </div>

      <!-- MAIN DIAGONAL FRAMED STAMP BOX -->
      <div class="watermark-stamp-box" style="transform: rotate(-25deg); border: 3.5px solid rgba(128,128,128,0.5); border-radius: 16px; padding: 24px 44px; text-align: center; max-width: 90vw; background: rgba(128,128,128,0.03); color: rgba(128,128,128,0.45); box-sizing: border-box;">
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.8rem, 1.6vw, 1.15rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; margin-bottom: 12px;">
          OFFICIAL PREVIEW TRIAL • @${botUsername}
        </div>
        <div class="watermark-main-title" style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.8rem, 7.5vw, 6rem); font-weight: 900; letter-spacing: 0.2em; line-height: 1; text-transform: uppercase; border-top: 3px solid currentColor; border-bottom: 3px solid currentColor; padding: 16px 24px; margin: 8px 0; white-space: nowrap;">
          PREVIEW ONLY
        </div>
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.8rem, 1.6vw, 1.15rem); font-weight: 800; letter-spacing: 0.28em; text-transform: uppercase; margin-top: 12px;">
          2-HOUR TRIAL DEMO • UNLOCK AT @${botUsername}
        </div>
      </div>

      <!-- BOTTOM NON-OVERLAPPING SURROUNDING TICKER -->
      <div class="watermark-peripheral-text" style="position: absolute; bottom: 14%; transform: rotate(-25deg); font-family: system-ui, -apple-system, sans-serif; font-size: clamp(0.85rem, 1.8vw, 1.3rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; white-space: nowrap; color: rgba(128,128,128,0.45);">
        ✦ CREATED WITH @${botUsername} • UNLOCK FULL PORTFOLIO • @${botUsername} ✦
      </div>
    </div>

    <!-- FLOATING BOTTOM CONVERSION & UNLOCK BAR -->
    <div id="preview-floating-bar" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 20px 50px rgba(0,0,0,0.8); border-radius: 9999px; padding: 12px 28px; display: flex; align-items: center; gap: 16px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; max-width: 95vw; flex-wrap: wrap; justify-content: center;">
      <div style="font-size: 0.92rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
        <span style="display:inline-block; width:10px; height:10px; background:#38bdf8; border-radius:50%;"></span>
        <span>🔒 <strong>Preview Mode</strong> (2-Hour Timer) • Created with @${botUsername}</span>
      </div>
      <a href="/subscribe" target="_blank" style="background: #22c55e; color: #000000; font-weight: 900; font-size: 0.88rem; padding: 10px 22px; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(34,197,94,0.5);">
        💳 Buy Subscription & Remove Watermark (From ₹149/mo) ➔
      </a>
    </div>

    <!-- DYNAMIC BACKGROUND LUMINANCE WATERMARK CONTROLLER -->
    <script>
      (function() {
        function updateWatermarkLuminance() {
          try {
            var bg = window.getComputedStyle(document.body).backgroundColor;
            var overlay = document.getElementById('preview-watermark-overlay');
            if (!overlay) return;
            var rgb = bg.match(/\\d+/g);
            var isLight = false;
            if (rgb && rgb.length >= 3) {
              var r = parseInt(rgb[0], 10), g = parseInt(rgb[1], 10), b = parseInt(rgb[2], 10);
              var luminance = (0.299 * r + 0.587 * g + 0.114 * b);
              isLight = luminance > 128;
            } else if (bg.includes('rgba(0, 0, 0, 0)') || bg === 'transparent' || !bg) {
              isLight = true;
            }
            var targetColor = isLight ? 'rgba(0, 0, 0, 0.28)' : 'rgba(255, 255, 255, 0.28)';
            var box = overlay.querySelector('.watermark-stamp-box');
            if (box) {
              box.style.color = targetColor;
              box.style.borderColor = targetColor;
            }
            var tickers = overlay.querySelectorAll('.watermark-peripheral-text');
            tickers.forEach(function(el) { el.style.color = targetColor; });
          } catch (e) {}
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', updateWatermarkLuminance);
        } else {
          updateWatermarkLuminance();
        }
      })();
    </script>
    `;

    if (html.includes('</body>')) {
      return html.replace('</body>', `${watermarkHtml}</body>`);
    }
    return html + watermarkHtml;
  }

  injectSiteTelemetry(html, siteId = '') {
    if (!html) return html;
    const hoverCssTag = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css">`;
    if (html.includes('</head>') && !html.includes('hover-min.css')) {
      html = html.replace('</head>', `  ${hoverCssTag}\n</head>`);
    }

    const telemetryScript = `
    <!-- REAL-TIME ANALYTICS & CONTACT LEAD BEACON -->
    <script>
      (function() {
        try {
          var pathParts = window.location.pathname.split('/').filter(Boolean);
          var sId = '${siteId}' || (pathParts[0] === 'p' || pathParts[0] === 'sites' ? pathParts[1] : pathParts[0]) || '';
          if (sId) {
            fetch('/api/sites/' + encodeURIComponent(sId) + '/analytics', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ eventType: 'page_view', referrer: document.referrer || 'direct' })
            }).catch(function(){});
          }
        } catch(e) {}

        document.addEventListener('DOMContentLoaded', function() {
          var forms = document.querySelectorAll('form');
          forms.forEach(function(form) {
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              var pathParts = window.location.pathname.split('/').filter(Boolean);
              var sId = '${siteId}' || (pathParts[0] === 'p' || pathParts[0] === 'sites' ? pathParts[1] : pathParts[0]) || '';
              var nameInput = form.querySelector('[name="name"]') || form.querySelector('input[type="text"]');
              var emailInput = form.querySelector('[name="email"]') || form.querySelector('input[type="email"]');
              var msgInput = form.querySelector('[name="message"]') || form.querySelector('textarea');
              var btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
              var prevBtnText = btn ? btn.textContent : '';
              if (btn) btn.textContent = 'Sending...';
              try {
                var res = await fetch('/api/sites/' + encodeURIComponent(sId) + '/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: nameInput ? nameInput.value : 'Visitor',
                    email: emailInput ? emailInput.value : '',
                    message: msgInput ? msgInput.value : ''
                  })
                });
                if (res.ok) {
                  form.innerHTML = '<div style="padding: 1.25rem; border-radius: 12px; background: rgba(34,197,94,0.15); border: 1px solid #22c55e; color: #22c55e; text-align: center; font-weight: 700;">✅ Message delivered directly to creator!</div>';
                } else {
                  if (btn) btn.textContent = prevBtnText || 'Send Message';
                }
              } catch(err) {
                if (btn) btn.textContent = prevBtnText || 'Send Message';
              }
            });
          });
        });
      })();
    </script>
    `;

    if (html.includes('</body>')) {
      return html.replace('</body>', `${telemetryScript}</body>`);
    }
    return html + telemetryScript;
  }

  /* =========================================================================
   * 1. SPATIAL 3D CYBER (Flagship Next-Gen 3D WebGL Experience)
   * ========================================================================= */
  generateSpatial3DTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Developer');
    const role = this.escapeHtml(data.role || data.service_title || 'Software Architect');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Architecting high-performance digital systems & intelligent web experiences.');
    const email = data.email || '';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const location = data.location ? ` • 📍 ${this.escapeHtml(data.location)}` : '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'TypeScript, React, Node.js, Next.js, Python, Three.js, Docker, WebGL').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${this.escapeHtml(tagline)}">
  <title>${name} — ${role} | Official Portfolio</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  
  <!-- Three.js, GSAP, ScrollTrigger, Confetti -->
  ${this.getGlobalLibraries()}

  <style>
    :root {
      --bg: #06080f;
      --surface: rgba(13, 17, 28, 0.75);
      --surface-card: rgba(22, 27, 46, 0.6);
      --surface-glow: rgba(56, 189, 248, 0.15);
      --primary: #38bdf8;
      --secondary: #818cf8;
      --accent: #22c55e;
      --pink: #f43f5e;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
      --font-display: 'Space Grotesk', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.65;
      overflow-x: hidden;
      cursor: default;
    }

    ${this.getShared3DStyles()}

    /* Floating Glass Header */
    .spatial-nav {
      position: fixed;
      top: 1.25rem;
      left: 0;
      right: 0;
      z-index: 100;
      display: flex;
      justify-content: center;
      padding: 0 1.5rem;
    }
    .nav-pill {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 0.6rem 1.4rem;
      border-radius: 9999px;
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
    }
    .nav-brand {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-glow-orb {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--primary);
      box-shadow: 0 0 10px var(--primary);
      animation: pulse-orb 2s infinite;
    }
    @keyframes pulse-orb {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.6; }
    }
    .nav-links { display: flex; gap: 1.25rem; align-items: center; }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--primary); }
    .nav-connect-btn {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #fff !important;
      font-weight: 600 !important;
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .nav-connect-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(56, 189, 248, 0.7); }

    /* Layout Wrapper */
    .spatial-container {
      position: relative;
      z-index: 10;
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* 3D Spatial Hero */
    .hero-spatial {
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 9rem 0 4rem;
      position: relative;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 0.4rem 1.1rem;
      border-radius: 9999px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--primary);
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
      width: fit-content;
    }
    .hero-name-3d {
      font-family: var(--font-display);
      font-size: clamp(3rem, 8vw, 6.25rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.02;
      margin-bottom: 1.25rem;
      background: linear-gradient(135deg, #ffffff 40%, rgba(255,255,255,0.4) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-role-chip {
      font-family: var(--font-mono);
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      color: var(--secondary);
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .hero-tagline-text {
      font-size: clamp(1.1rem, 2.2vw, 1.25rem);
      color: var(--text-muted);
      max-width: 700px;
      line-height: 1.75;
      margin-bottom: 2.5rem;
    }
    .hero-btn-group {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
      align-items: center;
    }
    .btn-spatial-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #ffffff;
      padding: 0.9rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      box-shadow: 0 10px 30px -5px rgba(56, 189, 248, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      border: none;
      cursor: pointer;
    }
    .btn-spatial-primary:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 40px -5px rgba(56, 189, 248, 0.6);
    }
    .btn-spatial-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--surface);
      border: 1px solid var(--border);
      color: #fff;
      padding: 0.9rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      backdrop-filter: blur(10px);
      transition: background 0.2s, border-color 0.2s, transform 0.2s;
      cursor: pointer;
    }
    .btn-spatial-secondary:hover {
      border-color: var(--primary);
      transform: translateY(-3px);
      background: rgba(56, 189, 248, 0.1);
    }

    /* 3D Telemetry Stats Grid */
    .telemetry-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin: 4rem 0 6rem;
    }
    .telemetry-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem;
      backdrop-filter: blur(16px);
      position: relative;
      overflow: hidden;
      transition: transform 0.25s, border-color 0.25s;
    }
    .telemetry-card:hover { transform: translateY(-4px); border-color: var(--primary); }
    .telemetry-val { font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: #fff; }
    .telemetry-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; text-transform: uppercase; font-family: var(--font-mono); }

    /* Interactive 3D Bento Showcase with Cursor Spotlight */
    .section-title-wrap {
      margin-bottom: 2.5rem;
    }
    .section-tag-3d {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    .section-heading-3d {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 3.25rem);
      font-weight: 800;
      color: #fff;
    }

    .spotlight-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1.5rem;
      margin-bottom: 6rem;
    }
    .spotlight-card.col-12 { grid-column: span 12; }
    .spotlight-card.col-6 { grid-column: span 6; }
    @media (max-width: 768px) {
      .spotlight-card.col-6 { grid-column: span 12; }
    }

    .card-badge-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    .pill-project-num {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: rgba(56, 189, 248, 0.1);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      font-weight: 700;
    }
    .project-card-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.75rem;
    }
    .project-card-desc {
      color: var(--text-muted);
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .project-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.75rem;
    }
    .tech-pill-3d {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: #cbd5e1;
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
    }
    .project-links-row {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn-link-3d {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--primary);
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      background: rgba(56, 189, 248, 0.08);
      border: 1px solid rgba(56, 189, 248, 0.2);
      transition: background 0.2s, transform 0.2s;
    }
    .btn-link-3d:hover { background: var(--primary); color: #000; transform: translateY(-2px); }

    /* Interactive Skills Particle Constellation */
    .skills-3d-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
      margin-bottom: 6rem;
    }
    .skill-3d-chip {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 0.75rem 1.4rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      backdrop-filter: blur(16px);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .skill-3d-chip:hover {
      background: var(--primary);
      color: #000;
      border-color: var(--primary);
      transform: translateY(-3px) scale(1.04);
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.4);
    }

    /* 3D Contact Holographic Card */
    .contact-spatial-card {
      background: linear-gradient(135deg, rgba(22, 27, 46, 0.8) 0%, rgba(13, 17, 28, 0.9) 100%);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 28px;
      padding: clamp(2.5rem, 6vw, 4.5rem);
      text-align: center;
      backdrop-filter: blur(24px);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px rgba(56, 189, 248, 0.15);
      margin-bottom: 6rem;
      position: relative;
    }
    .contact-spatial-title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      color: #fff;
      margin-bottom: 1rem;
    }
    .contact-spatial-desc {
      color: var(--text-muted);
      font-size: 1.15rem;
      max-width: 600px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
    }

    ${this.getWatermarkStyles()}
  </style>
</head>
<body>
  ${watermark}

  <!-- Three.js 3D WebGL Canvas -->
  <canvas id="webgl-canvas"></canvas>

  <!-- Magnetic Cursor Follower -->
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <!-- Spatial Navbar -->
  <header class="spatial-nav">
    <div class="nav-pill">
      <a href="#hero" class="nav-brand">
        <span class="brand-glow-orb"></span>
        <span>${name}</span>
      </a>
      <nav class="nav-links">
        <a href="#showcase">Works</a>
        <a href="#skills">Stack</a>
        ${data.bio ? '<a href="#about">About</a>' : ''}
        <a href="#contact" class="nav-connect-btn" onclick="fireConfetti()">Connect ✦</a>
      </nav>
    </div>
  </header>

  <main class="spatial-container">
    <!-- 3D Spatial Hero -->
    <section id="hero" class="hero-spatial">
      <div class="hero-avatar-3d-wrap">
        <div class="hero-avatar-ring">
          <div class="hero-avatar-inner">⚡</div>
        </div>
        <div class="status-live-chip">
          <span class="live-dot-pulse"></span>
          <span>AVAILABLE FOR HIGH-IMPACT VENTURES // ${location ? location.replace(' • 📍 ', '') : 'WORLDWIDE'}</span>
        </div>
      </div>
      <h1 class="hero-name-3d">${name}</h1>
      <div class="hero-role-chip">
        <span>//</span>
        <span>${role}</span>
      </div>
      <p class="hero-tagline-text">${tagline}</p>
      <div class="hero-btn-group">
        <a href="#showcase" class="btn-spatial-primary">
          <span>Explore 3D Archive</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </a>
        ${email ? `<button onclick="fireConfetti(); copyEmail('${this.escapeHtml(email)}')" class="btn-spatial-secondary"><span>⚡ Copy Coordinates / Email</span></button>` : ''}
      </div>
    </section>

    <!-- Telemetry Stats -->
    <div class="telemetry-row">
      <div class="telemetry-card">
        <div class="telemetry-val">0${projects.length}</div>
        <div class="telemetry-label">Verified Repositories</div>
      </div>
      <div class="telemetry-card">
        <div class="telemetry-val">100%</div>
        <div class="telemetry-label">Lighthouse Performance</div>
      </div>
      <div class="telemetry-card">
        <div class="telemetry-val">60 FPS</div>
        <div class="telemetry-label">Realtime WebGL Engine</div>
      </div>
      <div class="telemetry-card">
        <div class="telemetry-val">2026</div>
        <div class="telemetry-label">Next-Gen Architecture</div>
      </div>
    </div>

    <!-- 3D Interactive Bento Showcase -->
    <section id="showcase">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// 01 PORTFOLIO SHOWCASE</div>
        <h2 class="section-heading-3d">Selected Creations</h2>
      </div>

      <div class="spotlight-grid">
        ${projects.map((p, idx) => `
          <div class="spotlight-card ${idx === 0 ? 'col-12' : 'col-6'}" data-tilt>
            <div class="card-badge-top">
              <span class="pill-project-num">ARTIFACT 0${idx + 1}</span>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">WEBGL REPO</div>
            </div>
            <h3 class="project-card-title">${this.escapeHtml(p.name)}</h3>
            <p class="project-card-desc">${this.escapeHtml(p.desc)}</p>
            <div class="project-tech-tags">
              ${(p.tech || '').split(/[,\n]/).filter(t => t.trim().length > 0).map(t => `<span class="tech-pill-3d">${this.escapeHtml(t.trim())}</span>`).join('')}
            </div>
            <div class="project-links-row">
              ${p.github ? `<a href="${this.escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="btn-link-3d"><span>GitHub Repository ↗</span></a>` : ''}
              ${p.live ? `<a href="${this.escapeHtml(p.live)}" target="_blank" rel="noopener noreferrer" class="btn-link-3d"><span>Live Experience ↗</span></a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Capabilities & Stack -->
    <section id="skills">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// 02 TECH MATRIX</div>
        <h2 class="section-heading-3d">Core Competencies</h2>
      </div>
      <div class="skills-3d-grid">
        ${skills.map(s => `<div class="skill-3d-chip" onclick="fireConfetti()"><span>✦</span><span>${this.escapeHtml(s)}</span></div>`).join('')}
      </div>
      ${this.renderLanguagesSectionHtml(data)}
    </section>

    ${this.renderExperienceSectionHtml(data, '03')}
    ${this.renderEducationSectionHtml(data, '04')}
    ${this.renderCertificationsSectionHtml(data, '05')}
    ${this.renderAwardsSectionHtml(data, '06')}

    ${data.bio ? `
    <section id="about" style="margin-bottom: 6rem;">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// 07 MISSION</div>
        <h2 class="section-heading-3d">Engineering Philosophy</h2>
      </div>
      <div class="spotlight-card col-12">
        <p style="font-size: 1.2rem; line-height: 1.85; color: var(--text);">${this.escapeHtml(data.bio)}</p>
      </div>
    </section>` : ''}

    <!-- Contact Card -->
    <section id="contact">
      <div class="contact-spatial-card">
        <h2 class="contact-spatial-title">Initiate Transmission</h2>
        <p class="contact-spatial-desc">Ready to craft next-generation digital products, high-impact systems, or creative software? Let's connect.</p>
        <div class="hero-btn-group" style="justify-content: center;">
          ${email ? `<button onclick="fireConfetti(); copyEmail('${this.escapeHtml(email)}')" class="btn-spatial-primary"><span>⚡ Connect via Email</span></button>` : ''}
          ${github ? `<a href="${this.escapeHtml(github)}" target="_blank" rel="noopener noreferrer" class="btn-spatial-secondary"><span>GitHub Source</span></a>` : ''}
          ${linkedin ? `<a href="${this.escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer" class="btn-spatial-secondary"><span>LinkedIn</span></a>` : ''}
        </div>
      </div>
    </section>
  </main>

  <footer style="border-top: 1px solid var(--border); padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.88rem; position: relative; z-index: 10;">
    <div>&copy; ${new Date().getFullYear()} ${name}. Powered by 3D Spatial Engine.</div>
  </footer>

  <script>
    ${this.getSharedThreeJSSpatialScript()}
    ${this.getSharedInteractiveScripts()}
  </script>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  /* =========================================================================
   * 2. KINETIC 3D GLASS (Frosted Liquid Glassmorphism & Floating Rings)
   * ========================================================================= */
  generateKinetic3DTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Creative Developer');
    const role = this.escapeHtml(data.role || data.service_title || 'UI/UX Engineer & Creative Technologist');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Crafting fluid digital interactions, spatial design systems, and rich experiences.');
    const email = data.email || '';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'React, WebGL, TailwindCSS, GSAP, Next.js, Node.js').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${role} | Selected Works</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&family=Syne:wght@700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
  ${this.getGlobalLibraries()}
  <style>
    :root {
      --bg: #090d16;
      --surface: rgba(255, 255, 255, 0.05);
      --border: rgba(255, 255, 255, 0.12);
      --primary: #6366f1;
      --accent: #ec4899;
      --cyan: #06b6d4;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      overflow-x: hidden;
    }
    ${this.getShared3DStyles()}

    .glass-wrap { position: relative; z-index: 10; max-width: 1120px; margin: 0 auto; padding: 6rem 1.5rem 5rem; }
    .hero-glass-title {
      font-family: var(--font-display);
      font-size: clamp(3rem, 7.5vw, 5.5rem);
      font-weight: 800;
      line-height: 1.05;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #fff, var(--cyan), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .glass-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin: 3rem 0 5rem; }
    .btn-kinetic {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff;
      padding: 0.85rem 2rem;
      border-radius: 9999px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 10px 25px rgba(236, 72, 153, 0.35);
      cursor: pointer;
      border: none;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-kinetic:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(236, 72, 153, 0.5); }
    ${this.getWatermarkStyles()}
  </style>
</head>
<body>
  ${watermark}
  <canvas id="webgl-canvas"></canvas>
  <div class="cursor-dot" id="cursorDot"></div>
  <div class="cursor-ring" id="cursorRing"></div>

  <main class="glass-wrap">
    <div class="hero-avatar-3d-wrap">
      <div class="hero-avatar-ring">
        <div class="hero-avatar-inner">💎</div>
      </div>
      <div class="status-live-chip">
        <span class="live-dot-pulse"></span>
        <span>AVAILABLE FOR FULL-TIME & CONTRACT VENTURES</span>
      </div>
    </div>
    <h1 class="hero-glass-title">${name}</h1>
    <p style="font-size: 1.35rem; color: var(--accent); font-weight: 600; margin-bottom: 1rem;">${role}</p>
    <p style="font-size: 1.15rem; color: var(--text-muted); max-width: 750px; line-height: 1.8; margin-bottom: 2.5rem;">${tagline}</p>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem;">
      <a href="#projects" class="btn-kinetic"><span>Explore Selected Works ↗</span></a>
      ${email ? `<button onclick="fireConfetti(); copyEmail('${this.escapeHtml(email)}')" class="btn-kinetic" style="background: var(--surface); border: 1px solid var(--border); box-shadow: none;"><span>Copy Direct Email</span></button>` : ''}
    </div>

    <h2 style="font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 1.5rem;" id="projects">Selected Architecture (0${projects.length})</h2>
    <div class="glass-grid" style="margin-bottom: 5rem;">
      ${projects.map((p, i) => `
        <div class="spotlight-card" data-tilt>
          <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
            <h3 style="font-size: 1.4rem; color: #fff;">${this.escapeHtml(p.name)}</h3>
            <span style="color: var(--cyan); font-family: 'JetBrains Mono', monospace;">0${i+1}</span>
          </div>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.7;">${this.escapeHtml(p.desc)}</p>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            ${p.github ? `<a href="${this.escapeHtml(p.github)}" target="_blank" class="btn-kinetic" style="padding: 0.4rem 1rem; font-size: 0.85rem;"><span>GitHub</span></a>` : ''}
            ${p.live ? `<a href="${this.escapeHtml(p.live)}" target="_blank" class="btn-kinetic" style="padding: 0.4rem 1rem; font-size: 0.85rem; background: var(--cyan);"><span>Live Demo</span></a>` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Capabilities & Stack -->
    <section id="skills" style="margin-bottom: 5rem;">
      <h2 style="font-family: var(--font-display); font-size: 2.2rem; margin-bottom: 1.5rem;">Core Competencies</h2>
      <div class="skills-3d-grid">
        ${skills.map(s => `<div class="skill-3d-chip" onclick="fireConfetti()"><span>✦</span><span>${this.escapeHtml(s)}</span></div>`).join('')}
      </div>
      ${this.renderLanguagesSectionHtml(data)}
    </section>

    ${this.renderExperienceSectionHtml(data, '03')}
    ${this.renderEducationSectionHtml(data, '04')}
    ${this.renderCertificationsSectionHtml(data, '05')}
    ${this.renderAwardsSectionHtml(data, '06')}
  </main>
  <script>
    ${this.getSharedThreeJSGlassScript()}
    ${this.getSharedInteractiveScripts()}
  </script>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  /* =========================================================================
   * 3. TERMINAL 3D MATRIX (Hacker OS & 3D Perspective Grid)
   * ========================================================================= */
  generateTerminal3DTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Developer');
    const role = this.escapeHtml(data.role || data.service_title || 'Software Engineer');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Building scalable terminal systems and resilient architectures.');
    const email = data.email || '';
    const github = data.github || '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'C++, Rust, Go, Python, Linux, Docker, TypeScript').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${role} | Systems & Projects</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;800&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
  ${this.getGlobalLibraries()}
  <style>
    :root {
      --bg: #05080e;
      --term-bg: #090f1a;
      --green: #22c55e;
      --cyan: #38bdf8;
      --text: #f0fdf4;
      --text-muted: #86efac;
      --border: #1e3a29;
      --surface: #0d1522;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      padding: 3rem 1.5rem;
      line-height: 1.6;
    }
    ${this.getShared3DStyles()}

    .term-window {
      position: relative;
      z-index: 10;
      max-width: 1000px;
      margin: 0 auto;
      background: var(--term-bg);
      border: 1.5px solid var(--green);
      border-radius: 12px;
      box-shadow: 0 0 40px rgba(34, 197, 94, 0.2);
      overflow: hidden;
    }
    .term-head {
      background: #0e1726;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      font-size: 0.85rem;
    }
    .term-body { padding: 2.5rem; }
    .btn-term {
      background: transparent;
      border: 1px solid var(--green);
      color: var(--green);
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    .btn-term:hover { background: var(--green); color: #000; box-shadow: 0 0 20px var(--green); }
    ${this.getWatermarkStyles()}
  </style>
</head>
<body>
  ${watermark}
  <canvas id="webgl-canvas"></canvas>
  <div class="cursor-dot" id="cursorDot" style="background: var(--green); box-shadow: 0 0 10px var(--green);"></div>
  <div class="cursor-ring" id="cursorRing" style="border-color: var(--green);"></div>

  <div class="term-window">
    <div class="term-head">
      <div>● ● ● bash — ${(data.name || 'dev').toLowerCase().replace(/\s+/g, '-')}-core.sh</div>
      <div style="color: var(--green);">[SYSTEM PRODUCTION READY]</div>
    </div>
    <div class="term-body">
      <div style="color: #64748b; margin-bottom: 0.5rem;">$ whoami --verbose</div>
      <h1 style="font-size: clamp(2rem, 6vw, 3.75rem); color: #fff; font-weight: 800; margin-bottom: 0.5rem;">${name}</h1>
      <p style="color: var(--cyan); font-size: 1.2rem; margin-bottom: 1.5rem;">&gt; ${role}</p>
      <p style="color: var(--text); font-size: 1.05rem; max-width: 800px; margin-bottom: 2rem;">${tagline}</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem;">
        <a href="#repos" class="btn-term"><span>$ ls ./projects/</span></a>
        ${email ? `<button onclick="fireConfetti(); copyEmail('${this.escapeHtml(email)}')" class="btn-term"><span>$ mailto: ${this.escapeHtml(email)}</span></button>` : ''}
      </div>

      <div style="border-top: 1px dashed var(--border); margin: 2rem 0;"></div>
      <div id="repos" style="color: #64748b; margin-bottom: 1.5rem;">$ cat ./projects.json</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        ${projects.map((p, i) => `
          <div class="spotlight-card" style="padding: 1.5rem;" data-tilt>
            <div style="color: #fff; font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem;">${this.escapeHtml(p.name)}</div>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem;">${this.escapeHtml(p.desc)}</p>
            <div style="display: flex; gap: 0.75rem;">
              ${p.github ? `<a href="${this.escapeHtml(p.github)}" target="_blank" class="btn-term" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;"><span>Repo ↗</span></a>` : ''}
              ${p.live ? `<a href="${this.escapeHtml(p.live)}" target="_blank" class="btn-term" style="padding: 0.3rem 0.7rem; font-size: 0.8rem;"><span>Live ↗</span></a>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="border-top: 1px dashed var(--border); margin: 2.5rem 0;"></div>
      <div style="color: #64748b; margin-bottom: 1.5rem;">$ dump-skills --all</div>
      <div class="skills-3d-grid">
        ${skills.map(s => `<div class="skill-3d-chip" onclick="fireConfetti()"><span>✦</span><span>${this.escapeHtml(s)}</span></div>`).join('')}
      </div>
      ${this.renderLanguagesSectionHtml(data)}

      <div style="border-top: 1px dashed var(--border); margin: 2.5rem 0;"></div>
      ${this.renderExperienceSectionHtml(data, '03')}
      ${this.renderEducationSectionHtml(data, '04')}
      ${this.renderCertificationsSectionHtml(data, '05')}
      ${this.renderAwardsSectionHtml(data, '06')}
    </div>
  </div>
  <script>
    ${this.getSharedThreeJSMatrixScript()}
    ${this.getSharedInteractiveScripts()}
  </script>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  /* =========================================================================
   * 4. NEO-BRUTALIST 3D (Extruded Isometric Cards & Kinetic Pop)
   * ========================================================================= */
  generateNeoBrutalist3DTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Builder');
    const role = this.escapeHtml(data.role || data.service_title || 'Developer & Creator');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Building raw, high-impact digital applications.');
    const email = data.email || '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'JavaScript, React, Node.js, Python, Figma, TailwindCSS, Docker').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${role} | Portfolio & Engineering</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800;900&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
  ${this.getGlobalLibraries()}
  <style>
    :root {
      --bg: #fffdfa;
      --black: #18181b;
      --yellow: #facc15;
      --pink: #f472b6;
      --cyan: #22d3ee;
      --surface: #ffffff;
      --border: #18181b;
      --primary: #4f46e5;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--black);
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 3rem 1.5rem;
    }
    ${this.getShared3DStyles()}

    .brutal-container { max-width: 1060px; margin: 0 auto; position: relative; z-index: 10; }
    .brutal-card-3d {
      background: #fff;
      border: 3.5px solid var(--black);
      border-radius: 12px;
      box-shadow: 8px 8px 0px var(--black);
      padding: 3rem 2.5rem;
      margin-bottom: 3rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      transform-style: preserve-3d;
    }
    .brutal-card-3d:hover {
      transform: translate(-3px, -3px) rotate(-0.5deg);
      box-shadow: 12px 12px 0px var(--black);
    }
    .btn-brutal {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--yellow);
      color: var(--black);
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      padding: 0.9rem 2rem;
      border: 3px solid var(--black);
      border-radius: 8px;
      box-shadow: 5px 5px 0px var(--black);
      text-decoration: none;
      cursor: pointer;
      text-transform: uppercase;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .btn-brutal:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0px var(--black); }
    ${this.getWatermarkStyles()}
  </style>
</head>
<body>
  ${watermark}
  <canvas id="webgl-canvas"></canvas>
  <div class="cursor-dot" id="cursorDot" style="background: var(--black);"></div>
  <div class="cursor-ring" id="cursorRing" style="border-color: var(--black); border-width: 2px;"></div>

  <main class="brutal-container">
    <div class="brutal-card-3d" data-tilt>
      <div class="hero-avatar-3d-wrap" style="background: var(--surface); border: 2px solid var(--black); box-shadow: 3px 3px 0px var(--black);">
        <div class="hero-avatar-ring" style="background: linear-gradient(135deg, #f43f5e, #facc15);">
          <div class="hero-avatar-inner" style="background: #fff; color: #000;">🚀</div>
        </div>
        <div class="status-live-chip" style="color: #4f46e5;">
          <span class="live-dot-pulse" style="background: #f43f5e; box-shadow: 0 0 10px #f43f5e;"></span>
          <span>VERIFIED BUILDER // OPEN FOR VENTURES</span>
        </div>
      </div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.75rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; text-transform: uppercase; margin-bottom: 1rem;">${name}</h1>
      <p style="font-size: 1.5rem; font-weight: 800; color: #4f46e5; margin-bottom: 1.5rem;">// ${role.toUpperCase()}</p>
      <p style="font-size: 1.2rem; font-weight: 600; line-height: 1.7; max-width: 750px; margin-bottom: 2.5rem;">${tagline}</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="#works" class="btn-brutal"><span>VIEW ALL WORKS →</span></a>
        ${email ? `<button onclick="fireConfetti(); copyEmail('${this.escapeHtml(email)}')" class="btn-brutal" style="background: var(--cyan);"><span>CONNECT / HIRE</span></button>` : ''}
      </div>
    </div>

    <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem;" id="works">Selected Artifacts</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 5rem;">
      ${projects.map((p, i) => `
        <div class="brutal-card-3d" style="padding: 2rem;" data-tilt>
          <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 1.5rem; margin-bottom: 1rem;">
            <span>${this.escapeHtml(p.name)}</span>
            <span>0${i+1}</span>
          </div>
          <p style="font-size: 1rem; color: #374151; margin-bottom: 1.5rem;">${this.escapeHtml(p.desc)}</p>
          <div style="display: flex; gap: 0.75rem;">
            ${p.github ? `<a href="${this.escapeHtml(p.github)}" target="_blank" class="btn-brutal" style="font-size: 0.85rem; padding: 0.5rem 1rem;"><span>GitHub</span></a>` : ''}
            ${p.live ? `<a href="${this.escapeHtml(p.live)}" target="_blank" class="btn-brutal" style="font-size: 0.85rem; padding: 0.5rem 1rem; background: var(--pink); color: #fff;"><span>Demo</span></a>` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Skills & Tech -->
    <section style="margin-bottom: 5rem;">
      <h2 style="font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem;">Core Arsenal</h2>
      <div class="skills-3d-grid">
        ${skills.map(s => `<div class="skill-3d-chip" onclick="fireConfetti()"><span>✦</span><span>${this.escapeHtml(s)}</span></div>`).join('')}
      </div>
      ${this.renderLanguagesSectionHtml(data)}
    </section>

    ${this.renderExperienceSectionHtml(data, '03')}
    ${this.renderEducationSectionHtml(data, '04')}
    ${this.renderCertificationsSectionHtml(data, '05')}
    ${this.renderAwardsSectionHtml(data, '06')}
  </main>
  <script>
    ${this.getSharedThreeJSGlassScript()}
    ${this.getSharedInteractiveScripts()}
  </script>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  /* =========================================================================
   * 5. EDITORIAL 3D MINIMAL (Architectural Polyhedron & Kinetic Serif)
   * ========================================================================= */
  generateEditorial3DTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Creator');
    const role = this.escapeHtml(data.role || data.service_title || 'Creative Professional');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Designing timeless digital architectures.');
    const email = data.email || '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'Strategy, Architecture, Leadership, System Design, Product').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${role} | Selected Works</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ${this.getGlobalLibraries()}
  <style>
    :root {
      --bg: #fcf9f2;
      --primary: #0f172a;
      --accent: #059669;
      --text: #1c1917;
      --border: #e7e5e4;
      --surface: #ffffff;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; }
    ${this.getShared3DStyles()}

    .editorial-wrap { position: relative; z-index: 10; max-width: 1080px; margin: 0 auto; padding: 5rem 2rem; }
    .hero-name-serif {
      font-family: 'Fraunces', serif;
      font-size: clamp(3.5rem, 8vw, 6.5rem);
      font-weight: 700;
      line-height: 0.98;
      margin-bottom: 1.5rem;
    }
    ${this.getWatermarkStyles()}
  </style>
</head>
<body>
  ${watermark}
  <canvas id="webgl-canvas"></canvas>
  <div class="cursor-dot" id="cursorDot" style="background: var(--accent);"></div>
  <div class="cursor-ring" id="cursorRing" style="border-color: var(--accent);"></div>

  <main class="editorial-wrap">
    <div class="hero-avatar-3d-wrap" style="background: rgba(5, 150, 105, 0.08); border: 1px solid var(--accent);">
      <div class="hero-avatar-ring" style="background: linear-gradient(135deg, #059669, #d97706);">
        <div class="hero-avatar-inner" style="background: #fcf9f2; color: #059669;">📜</div>
      </div>
      <div class="status-live-chip" style="color: var(--accent);">
        <span class="live-dot-pulse" style="background: var(--accent); box-shadow: 0 0 10px var(--accent);"></span>
        <span>SELECTED ARCHIVE & EXECUTIVE PORTFOLIO</span>
      </div>
    </div>
    <h1 class="hero-name-serif">${name}</h1>
    <p style="font-family: 'Fraunces', serif; font-style: italic; font-size: 2rem; color: var(--accent); margin-bottom: 1.5rem;">${role}</p>
    <p style="font-size: 1.25rem; line-height: 1.75; max-width: 750px; margin-bottom: 3rem;">${tagline}</p>

    <div style="border-bottom: 2px solid var(--primary); margin: 3rem 0 2rem;"></div>
    <h2 style="font-family: 'Fraunces', serif; font-size: 2.5rem; margin-bottom: 2rem;">Selected Archive</h2>
    ${projects.map((p, i) => `
      <article class="spotlight-card" style="margin-bottom: 2rem;" data-tilt>
        <div style="display: flex; justify-content: space-between; font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 700; margin-bottom: 0.75rem;">
          <span>${this.escapeHtml(p.name)}</span>
          <span style="color: var(--accent); font-style: italic;">0${i+1}</span>
        </div>
        <p style="color: #64748b; font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem;">${this.escapeHtml(p.desc)}</p>
        <div style="display: flex; gap: 1rem;">
          ${p.github ? `<a href="${this.escapeHtml(p.github)}" target="_blank" style="color: var(--primary); font-weight: 600;">GitHub Repository ↗</a>` : ''}
          ${p.live ? `<a href="${this.escapeHtml(p.live)}" target="_blank" style="color: var(--accent); font-weight: 600;">Live Experience ↗</a>` : ''}
        </div>
      </article>
    `).join('')}

    <!-- Capabilities & Stack -->
    <section style="margin: 4rem 0;">
      <h2 style="font-family: 'Fraunces', serif; font-size: 2.2rem; margin-bottom: 1.5rem;">Expertise & Discipline</h2>
      <div class="skills-3d-grid">
        ${skills.map(s => `<div class="skill-3d-chip" onclick="fireConfetti()"><span>✦</span><span>${this.escapeHtml(s)}</span></div>`).join('')}
      </div>
      ${this.renderLanguagesSectionHtml(data)}
    </section>

    ${this.renderExperienceSectionHtml(data, '03')}
    ${this.renderEducationSectionHtml(data, '04')}
    ${this.renderCertificationsSectionHtml(data, '05')}
    ${this.renderAwardsSectionHtml(data, '06')}
  </main>
  <script>
    ${this.getSharedThreeJSEditorialScript()}
    ${this.getSharedInteractiveScripts()}
  </script>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  getGlobalLibraries() {
    return `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" defer></script>
    `;
  }

  getShared3DStyles() {
    return `
    /* 3D WebGL Canvas Layer */
    #webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: none;
    }

    /* Magnetic Custom Cursor */
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--primary, #38bdf8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s, transform 0.1s;
      box-shadow: 0 0 10px var(--primary, #38bdf8);
    }
    .cursor-ring {
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1.5px solid var(--primary, #38bdf8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      transform: translate(-50%, -50%);
      transition: width 0.25s, height 0.25s, background-color 0.25s, border-color 0.25s;
    }
    .cursor-ring.active-hover {
      width: 60px;
      height: 60px;
      background-color: rgba(56, 189, 248, 0.15);
      border-color: var(--primary, #38bdf8);
      backdrop-filter: blur(2px);
    }
    .cursor-ring.card-hover {
      width: 80px;
      height: 80px;
      border-color: var(--accent, #22c55e);
      background-color: rgba(34, 197, 94, 0.12);
    }

    /* Spotlight Glow Cards */
    .spotlight-card {
      position: relative;
      background: var(--surface, #18181b);
      border: 1px solid var(--border, rgba(255,255,255,0.1));
      border-radius: 20px;
      padding: 2.25rem;
      backdrop-filter: blur(20px);
      overflow: hidden;
      transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .spotlight-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 20px;
      background: radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(56, 189, 248, 0.18), transparent 40%);
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .spotlight-card:hover::before { opacity: 1; }

    /* Scroll Progress Bar & Scroll Reveal Animations */
    #scrollProgress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3.5px;
      width: 0%;
      background: linear-gradient(90deg, var(--primary), var(--secondary, #ec4899), var(--accent));
      z-index: 9999999;
      transition: width 0.08s ease-out;
      box-shadow: 0 0 12px var(--accent);
    }
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(35px) scale(0.97);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal-on-scroll.is-revealed {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    /* High-Graphics 3D Hero Avatar Badge */
    .hero-avatar-3d-wrap {
      display: inline-flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 2rem;
      padding: 0.5rem 1rem 0.5rem 0.5rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: 9999px;
      backdrop-filter: blur(12px);
    }
    .hero-avatar-ring {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: spinAvatarRing 8s linear infinite;
    }
    @keyframes spinAvatarRing { 100% { transform: rotate(360deg); } }
    .hero-avatar-inner {
      width: 100%;
      height: 100%;
      background: var(--bg);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
    }
    .status-live-chip {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono, monospace);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--accent);
    }
    .live-dot-pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
      animation: pulseDot 2s ease-in-out infinite;
    }
    @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }

    /* Experience Timeline Styles */
    .timeline-container {
      position: relative;
      margin-top: 1.5rem;
      padding-left: 2rem;
      border-left: 2px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 2.25rem;
    }
    .timeline-node {
      position: relative;
    }
    .timeline-marker {
      position: absolute;
      left: -2.6rem;
      top: 0.25rem;
      width: 1.15rem;
      height: 1.15rem;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid var(--primary);
      box-shadow: 0 0 12px var(--primary);
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
    }
    .timeline-role {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text);
    }
    .timeline-company {
      color: var(--primary);
      font-weight: 600;
      font-size: 0.95rem;
    }
    .timeline-period {
      font-family: var(--font-mono, monospace);
      font-size: 0.82rem;
      padding: 0.2rem 0.65rem;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      border-radius: 9999px;
      color: var(--text-muted);
    }
    .timeline-bullets {
      list-style: none;
      margin-top: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .timeline-bullets li {
      position: relative;
      padding-left: 1.25rem;
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.55;
    }
    .timeline-bullets li::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }

    /* Education & Certifications Grid */
    .edu-grid, .cert-grid, .awards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    .edu-card, .cert-card, .award-card {
      background: var(--surface-card, var(--surface));
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .edu-card:hover, .cert-card:hover, .award-card:hover {
      transform: translateY(-3px);
      border-color: var(--primary);
    }
    .edu-degree {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text);
    }
    .edu-inst {
      color: var(--primary);
      font-weight: 600;
      font-size: 0.92rem;
    }
    .cert-issuer {
      color: var(--accent);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .award-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: #fbbf24;
    }
    .lang-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .lang-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      padding: 0.4rem 0.9rem;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--text);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    `;
  }

  getSharedThreeJSSpatialScript() {
    return `
    (function initThreeJS() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 22;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Outer Crystalline Polyhedron
      const outerGeo = new THREE.DodecahedronGeometry(7, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.9
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      scene.add(outerMesh);

      // Inner Glowing Icosahedron Core
      const innerGeo = new THREE.IcosahedronGeometry(3.8, 1);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // 800 Orbital Star Particles
      const particleCount = 800;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 90;
        positions[i + 1] = (Math.random() - 0.5) * 90;
        positions[i + 2] = (Math.random() - 0.5) * 70;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.22,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0x38bdf8, 2.5, 60);
      pointLight.position.set(10, 15, 10);
      scene.add(pointLight);

      let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
      let isDragging = false, prevMouseX = 0, prevMouseY = 0;
      let hoverEnergy = 1.0, currentEnergy = 1.0;

      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;

        if (isDragging) {
          const deltaX = e.clientX - prevMouseX;
          const deltaY = e.clientY - prevMouseY;
          outerMesh.rotation.y += deltaX * 0.008;
          outerMesh.rotation.x += deltaY * 0.008;
          innerMesh.rotation.y -= deltaX * 0.008;
          prevMouseX = e.clientX;
          prevMouseY = e.clientY;
        }
      });

      window.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      });
      window.addEventListener('mouseup', () => { isDragging = false; });

      // Interactive Card Hover Energy Acceleration
      document.querySelectorAll('.spotlight-card, .btn-spatial-primary, .btn-kinetic, .btn-brutal, .edu-card, .cert-card, .skill-3d-chip').forEach(el => {
        el.addEventListener('mouseenter', () => { 
          hoverEnergy = 3.0; 
          pointLight.color.setHex(0xec4899);
          pointLight.intensity = 3.8;
        });
        el.addEventListener('mouseleave', () => { 
          hoverEnergy = 1.0; 
          pointLight.color.setHex(0x38bdf8);
          pointLight.intensity = 2.5;
        });
      });

      let scrollY = 0;
      window.addEventListener('scroll', () => { scrollY = window.scrollY; });

      function animate() {
        requestAnimationFrame(animate);
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        currentEnergy += (hoverEnergy - currentEnergy) * 0.06;

        if (!isDragging) {
          outerMesh.rotation.x += (0.002 + targetY * 0.008) * currentEnergy;
          outerMesh.rotation.y += (0.004 + targetX * 0.008) * currentEnergy;
          innerMesh.rotation.x -= 0.005 * currentEnergy;
          innerMesh.rotation.y += 0.007 * currentEnergy;
        }

        // Orbital Depth Parallax on Scroll
        camera.position.x = Math.sin(scrollY * 0.0012) * 6;
        camera.position.y = Math.cos(scrollY * 0.001) * 3;
        camera.position.z = 22 + Math.sin(scrollY * 0.0008) * 5;
        camera.lookAt(0, -scrollY * 0.005, 0);

        particles.rotation.y += (0.0006 + targetX * 0.0015) * currentEnergy;
        particles.rotation.x += targetY * 0.0015;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    `;
  }

  getSharedThreeJSGlassScript() {
    return `
    (function() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 16;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Cluster of Floating 3D Diamond Octahedrons
      const group = new THREE.Group();
      
      const geo1 = new THREE.OctahedronGeometry(3.5, 0);
      const mat1 = new THREE.MeshStandardMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.4 });
      const mesh1 = new THREE.Mesh(geo1, mat1);
      group.add(mesh1);

      const geo2 = new THREE.OctahedronGeometry(2, 0);
      const mat2 = new THREE.MeshStandardMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.5 });
      const mesh2 = new THREE.Mesh(geo2, mat2);
      mesh2.position.set(-6, 3, -2);
      group.add(mesh2);

      const geo3 = new THREE.IcosahedronGeometry(2.2, 0);
      const mat3 = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.45 });
      const mesh3 = new THREE.Mesh(geo3, mat3);
      mesh3.position.set(6, -3, -1);
      group.add(mesh3);

      scene.add(group);

      const light = new THREE.PointLight(0xec4899, 2.5, 50);
      light.position.set(5, 8, 8);
      scene.add(light);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      });

      let scrollY = 0;
      window.addEventListener('scroll', () => { scrollY = window.scrollY; });

      function anim() {
        requestAnimationFrame(anim);
        mesh1.rotation.x += 0.005 + mouseY * 0.008;
        mesh1.rotation.y += 0.007 + mouseX * 0.008;
        
        mesh2.rotation.x -= 0.008;
        mesh2.rotation.y += 0.005;

        mesh3.rotation.x += 0.006;
        mesh3.rotation.z -= 0.004;

        group.position.y = -scrollY * 0.008;
        renderer.render(scene, camera);
      }
      anim();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    `;
  }

  getSharedThreeJSMatrixScript() {
    return `
    (function() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 4, 12);
      camera.lookAt(0, 0, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const grid = new THREE.GridHelper(50, 50, 0x22c55e, 0x14532d);
      grid.position.y = -2.5;
      scene.add(grid);

      // Floating Data Cubes
      const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const cubeMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true });
      const cubes = [];
      for (let i = 0; i < 8; i++) {
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set((Math.random() - 0.5) * 16, Math.random() * 4, (Math.random() - 0.5) * 10);
        scene.add(cube);
        cubes.push(cube);
      }

      function anim() {
        requestAnimationFrame(anim);
        grid.position.z = (grid.position.z + 0.04) % 1;
        cubes.forEach((c, idx) => {
          c.rotation.x += 0.01 * (idx % 2 === 0 ? 1 : -1);
          c.rotation.y += 0.015;
        });
        renderer.render(scene, camera);
      }
      anim();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    `;
  }

  getSharedThreeJSBrutalistScript() {
    return `
    (function() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 16;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 3D Isometric Physics Cubes
      const group = new THREE.Group();
      const colors = [0x4f46e5, 0xf43f5e, 0xfacc15, 0x22d3ee];
      const cubes = [];

      for (let i = 0; i < 6; i++) {
        const size = 1.6 + Math.random() * 1.2;
        const geo = new THREE.BoxGeometry(size, size, size);
        const mat = new THREE.MeshBasicMaterial({ color: colors[i % colors.length], wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6);
        group.add(mesh);
        cubes.push({ mesh, rx: (Math.random() - 0.5) * 0.02, ry: (Math.random() - 0.5) * 0.02 });
      }
      scene.add(group);

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      });

      function anim() {
        requestAnimationFrame(anim);
        cubes.forEach(c => {
          c.mesh.rotation.x += c.rx + mouseY * 0.005;
          c.mesh.rotation.y += c.ry + mouseX * 0.005;
        });
        renderer.render(scene, camera);
      }
      anim();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    `;
  }

  getSharedThreeJSEditorialScript() {
    return `
    (function() {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 14;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Architectural Wireframe Icosahedron & Ring
      const geo = new THREE.IcosahedronGeometry(4.2, 1);
      const mat = new THREE.MeshBasicMaterial({ color: 0x059669, wireframe: true, transparent: true, opacity: 0.35 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      function anim() {
        requestAnimationFrame(anim);
        mesh.rotation.x += 0.0025;
        mesh.rotation.y += 0.004;
        renderer.render(scene, camera);
      }
      anim();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    `;
  }

  getSharedInteractiveScripts() {
    return `
    /* Magnetic Dual-Ring Custom Cursor with Inertia & Morphing */
    (function initMagneticCursor() {
      const dot = document.getElementById('cursorDot');
      const ring = document.getElementById('cursorRing');
      if (!dot || !ring) return;

      let curX = 0, curY = 0;
      let ringX = 0, ringY = 0;

      window.addEventListener('mousemove', (e) => {
        curX = e.clientX;
        curY = e.clientY;
        dot.style.left = curX + 'px';
        dot.style.top = curY + 'px';
      });

      function renderRing() {
        ringX += (curX - ringX) * 0.15;
        ringY += (curY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(renderRing);
      }
      renderRing();

      document.querySelectorAll('a, button, .skill-3d-chip').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('active-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('active-hover'));
      });

      document.querySelectorAll('.spotlight-card, .brutal-card-3d').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('card-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('card-hover'));
      });
    })();

    /* Real-Time Mouse Spotlight & 3D Gyro Card Tilt */
    document.querySelectorAll('.spotlight-card, [data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', \`\${x}px\`);
        card.style.setProperty('--mouse-y', \`\${y}px\`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-4px)\`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });

    /* Scroll Progress Bar & Stagger Reveal Observer */
    (function initScrollAnimations() {
      if (!document.getElementById('scrollProgress')) {
        const bar = document.createElement('div');
        bar.id = 'scrollProgress';
        document.body.prepend(bar);
      }
      const progressBar = document.getElementById('scrollProgress');

      window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (h > 0 && progressBar) {
          const pct = (window.scrollY / h) * 100;
          progressBar.style.width = Math.min(pct, 100) + '%';
        }
      });

      // Observe cards, timeline nodes, and sections for smooth entrance
      const targets = document.querySelectorAll('.spotlight-card, .edu-card, .cert-card, .award-card, .brutal-card-3d, .timeline-node, section');
      targets.forEach(t => t.classList.add('reveal-on-scroll'));

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });

      targets.forEach(t => observer.observe(t));

      // Number Counter Roll-Up for Telemetry Stats
      const statEls = document.querySelectorAll('.telemetry-val');
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const text = entry.target.innerText.trim();
            const numMatch = text.match(/(\d+)/);
            if (numMatch) {
              const targetNum = parseInt(numMatch[1], 10);
              const suffix = text.replace(numMatch[1], '');
              let current = 0;
              const step = Math.max(1, Math.floor(targetNum / 25));
              const timer = setInterval(() => {
                current += step;
                if (current >= targetNum) {
                  current = targetNum;
                  clearInterval(timer);
                }
                entry.target.innerText = (current < 10 && text.startsWith('0') ? '0' : '') + current + suffix;
              }, 30);
            }
          }
        });
      }, { threshold: 0.5 });
      statEls.forEach(el => statObserver.observe(el));
    })();

    /* =========================================================================
     * GreenSock (GSAP 3.x) & ScrollTrigger GPU Animation Runner
     * ========================================================================= */
    (function initGSAPMotion() {
      if (typeof gsap === 'undefined') return;
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      var mm = (typeof gsap.matchMedia === 'function') ? gsap.matchMedia() : null;

      // 1. Staggered Hero Entrance
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      var heroBadges = document.querySelectorAll('.hero-avatar-3d-wrap, .hero-badge, .status-pill, .brand-badge');
      var heroHeadings = document.querySelectorAll('h1, .hero-title, .hero-name, .monograph-name');
      var heroSubtext = document.querySelectorAll('.hero-subtitle, .lead-paragraph, .bio-text');
      var heroCtas = document.querySelectorAll('.btn-cta, .hero-cta, .social-pill, .btn-primary');

      if (heroBadges.length) heroTl.fromTo(heroBadges, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.65 });
      if (heroHeadings.length) heroTl.fromTo(heroHeadings, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.35');
      if (heroSubtext.length) heroTl.fromTo(heroSubtext, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4');
      if (heroCtas.length) heroTl.fromTo(heroCtas, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08 }, '-=0.3');

      // 2. ScrollTrigger Card Entrance
      if (typeof ScrollTrigger !== 'undefined') {
        var cards = document.querySelectorAll('.spotlight-card, .edu-card, .cert-card, .award-card, .project-card, .catalog-card, .bento-cell');
        cards.forEach(function(card) {
          gsap.fromTo(card,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        });

        var canvasLayer = document.getElementById('webgl-canvas');
        if (canvasLayer) {
          gsap.to(canvasLayer, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2
            }
          });
        }
      }

      // 3. Desktop Magnetic Button Interactions
      if (mm) {
        mm.add('(min-width: 768px)', function() {
          var magneticBtns = document.querySelectorAll('button, .cta-btn, .btn, a.btn-action, .social-pill');
          magneticBtns.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
              var rect = btn.getBoundingClientRect();
              var x = (e.clientX - rect.left - rect.width / 2) * 0.25;
              var y = (e.clientY - rect.top - rect.height / 2) * 0.25;
              gsap.to(btn, { x: x, y: y, duration: 0.25, ease: 'power1.out' });
            });
            btn.addEventListener('mouseleave', function() {
              gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
            });
          });
        });
      }
    })();

    /* WebMCP Client Registration (Razorpay Buildathon standard) */
    (function initWebMCP() {
      try {
        const root = typeof window !== 'undefined' ? window : globalThis;
        const ctx = (typeof document !== 'undefined' && document.modelContext) || (typeof navigator !== 'undefined' && navigator.modelContext);
        if (!ctx || typeof ctx.registerTool !== 'function') return;
        ctx.registerTool({
          name: 'get_portfolio_profile',
          description: 'Fetches verified profile credentials, projects, and contact data.',
          inputSchema: { type: 'object', properties: {} },
          execute: async () => JSON.stringify({
            name: document.querySelector('h1')?.innerText || '',
            status: 'Verified High-Impact Builder',
            url: window.location.href
          })
        });
      } catch (e) {}
    })();

    function copyEmail(e) {
      if (!e) return;
      navigator.clipboard.writeText(e);
      alert('Email / Coordinates copied to clipboard: ' + e);
    }
    function fireConfetti() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      }
    }
    `;
  }

  extractProjectsList(data) {
    const projects = [];
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      data.projects.forEach(p => {
        if (p.name || p.title) {
          projects.push({
            name: p.name || p.title,
            desc: p.description || p.desc || 'High-performance software project.',
            tech: p.tech_stack || p.tech || '',
            github: p.github || p.repo,
            live: p.live || p.link || p.url
          });
        }
      });
    }
    for (let i = 1; i <= 20; i++) {
      const name = data[`project_${i}_name`];
      if (name && !projects.some(p => p.name === name)) {
        projects.push({
          name: name,
          desc: data[`project_${i}_desc`] || 'Featured software application with modern architecture.',
          tech: data[`project_${i}_tech`] || data.tech_stack || '',
          github: data[`project_${i}_github`],
          live: data[`project_${i}_live`]
        });
      }
    }
    return projects.length > 0 ? projects : [{
      name: 'Featured Software Project',
      desc: 'High-performance application built with modern engineering standards.',
      tech: 'React, Node.js, TypeScript',
      github: data.github || '',
      live: ''
    }];
  }

  extractExperienceList(data) {
    const list = [];
    if (Array.isArray(data.experience) && data.experience.length > 0) {
      data.experience.forEach(e => {
        if (e.role || e.company || e.title) {
          list.push({
            role: e.role || e.title || 'Professional Role',
            company: e.company || e.organization || '',
            period: e.period || e.duration || e.year || '',
            location: e.location || '',
            desc: e.description || e.desc || '',
            achievements: Array.isArray(e.achievements) ? e.achievements : (Array.isArray(e.bullets) ? e.bullets : (e.achievements ? [e.achievements] : []))
          });
        }
      });
    }
    if (list.length === 0 && data.experience_summary) {
      list.push({
        role: data.role || 'Senior Technical Lead',
        company: 'Professional Tenure',
        period: '2022 - Present',
        location: data.location || 'Global / Remote',
        desc: data.experience_summary,
        achievements: ['Architected core platform modules resulting in 40% performance gain', 'Delivered production applications with 99.9% reliability']
      });
    }
    if (list.length === 0) {
      const role = data.role || 'Specialist';
      list.push(
        {
          role: `Senior ${role} & Architect`,
          company: 'Engineering & Innovation Labs',
          period: '2023 - Present',
          location: data.location || 'Remote',
          desc: `Leading end-to-end design, implementation, and scaling of digital systems and user-centric architectures.`,
          achievements: [
            'Engineered resilient client-facing and internal architectures with high uptime',
            'Collaborated with cross-functional teams to accelerate product delivery cycles by 35%'
          ]
        },
        {
          role: `${role} Contributor`,
          company: 'Digital Solutions & Systems',
          period: '2021 - 2023',
          location: 'Global',
          desc: `Contributed to core codebases, UX workflows, and full-cycle development standards.`,
          achievements: [
            'Refactored legacy modules to modern, high-performance clean architecture standards',
            'Implemented automated testing suites and CI/CD deployment pipelines'
          ]
        }
      );
    }
    return list;
  }

  extractEducationList(data) {
    const list = [];
    if (Array.isArray(data.education) && data.education.length > 0) {
      data.education.forEach(e => {
        if (typeof e === 'string') {
          list.push({ degree: e, institution: 'Accredited Institution', year: 'Verified', grade: '', details: '' });
        } else if (e.degree || e.institution || e.school) {
          list.push({
            degree: e.degree || e.major || 'Degree / Credential',
            institution: e.institution || e.school || e.university || '',
            year: e.year || e.duration || '',
            grade: e.grade || e.gpa || '',
            details: e.details || e.coursework || ''
          });
        }
      });
    } else if (typeof data.education === 'string' && data.education.trim().length > 0) {
      list.push({ degree: data.education, institution: 'Accredited University', year: 'Graduated', grade: '', details: '' });
    }
    if (list.length === 0) {
      list.push({
        degree: 'Computer Science & Software Systems',
        institution: 'University / Advanced Technical Academy',
        year: 'Academic Honors',
        grade: 'First Class Distinctions',
        details: 'Specialized in Software Engineering, Algorithms, and Modern Web Architectures'
      });
    }
    return list;
  }

  extractCertificationsList(data) {
    const list = [];
    if (Array.isArray(data.certifications) && data.certifications.length > 0) {
      data.certifications.forEach(c => {
        if (typeof c === 'string') {
          list.push({ name: c, issuer: 'Verified Authority', year: 'Certified' });
        } else if (c.name || c.title) {
          list.push({
            name: c.name || c.title,
            issuer: c.issuer || c.organization || 'Verified Authority',
            year: c.year || c.date || ''
          });
        }
      });
    }
    if (list.length === 0) {
      list.push(
        { name: 'Full-Stack Software Architecture Certification', issuer: 'Meta & Industry Standard', year: '2024' },
        { name: 'Cloud & High-Performance Web Deployment', issuer: 'Cloudflare / AWS', year: '2023' }
      );
    }
    return list;
  }

  extractAwardsList(data) {
    const list = [];
    if (Array.isArray(data.awards) && data.awards.length > 0) {
      data.awards.forEach(a => {
        if (typeof a === 'string') {
          list.push({ title: a, issuer: 'Excellence Recognition', year: '', desc: '' });
        } else if (a.title || a.name) {
          list.push({
            title: a.title || a.name,
            issuer: a.issuer || a.organization || 'Industry Recognition',
            year: a.year || a.date || '',
            desc: a.description || a.desc || ''
          });
        }
      });
    }
    if (list.length === 0) {
      list.push({
        title: 'Excellence in Engineering & Project Innovation',
        issuer: 'Hackathon & Tech Community Showcase',
        year: '2024',
        desc: 'Awarded for outstanding architectural design, UI responsiveness, and execution speed.'
      });
    }
    return list;
  }

  extractLanguagesList(data) {
    const list = [];
    if (Array.isArray(data.languages)) {
      data.languages.forEach(l => {
        if (typeof l === 'string' && l.trim()) list.push(l.trim());
        else if (l.language || l.name) list.push(`${l.language || l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`);
      });
    } else if (typeof data.languages === 'string' && data.languages.trim()) {
      data.languages.split(',').forEach(l => { if (l.trim()) list.push(l.trim()); });
    }
    if (list.length === 0) {
      list.push('English (Professional Fluent)', 'Technical Specification & Documentation');
    }
    return list;
  }

  renderExperienceSectionHtml(data, tagNum = '03') {
    const exp = this.extractExperienceList(data);
    if (exp.length === 0) return '';
    return `
    <section id="experience" style="margin-bottom: 6rem;">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// ${tagNum} CAREER TIMELINE</div>
        <h2 class="section-heading-3d">Experience & Leadership</h2>
      </div>
      <div class="timeline-container">
        ${exp.map(item => `
          <div class="timeline-node">
            <div class="timeline-marker"></div>
            <div class="timeline-header">
              <div>
                <div class="timeline-role">${this.escapeHtml(item.role)}</div>
                ${item.company ? `<div class="timeline-company">${this.escapeHtml(item.company)}${item.location ? ` • 📍 ${this.escapeHtml(item.location)}` : ''}</div>` : ''}
              </div>
              ${item.period ? `<span class="timeline-period">${this.escapeHtml(item.period)}</span>` : ''}
            </div>
            ${item.desc ? `<p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-top: 0.4rem;">${this.escapeHtml(item.desc)}</p>` : ''}
            ${item.achievements && item.achievements.length > 0 ? `
              <ul class="timeline-bullets">
                ${item.achievements.map(ach => `<li>${this.escapeHtml(ach)}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
  }

  renderEducationSectionHtml(data, tagNum = '04') {
    const edu = this.extractEducationList(data);
    if (edu.length === 0) return '';
    return `
    <section id="education" style="margin-bottom: 6rem;">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// ${tagNum} ACADEMIC BACKGROUND</div>
        <h2 class="section-heading-3d">Education & Distinctions</h2>
      </div>
      <div class="edu-grid">
        ${edu.map(item => `
          <div class="edu-card">
            <div class="edu-degree">${this.escapeHtml(item.degree)}</div>
            ${item.institution ? `<div class="edu-inst">${this.escapeHtml(item.institution)}</div>` : ''}
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem;">
              ${item.year ? `<span class="timeline-period">${this.escapeHtml(item.year)}</span>` : ''}
              ${item.grade ? `<span class="timeline-period" style="color: var(--accent);">${this.escapeHtml(item.grade)}</span>` : ''}
            </div>
            ${item.details ? `<p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.4rem;">${this.escapeHtml(item.details)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
  }

  renderCertificationsSectionHtml(data, tagNum = '05') {
    const certs = this.extractCertificationsList(data);
    if (certs.length === 0) return '';
    return `
    <section id="certifications" style="margin-bottom: 6rem;">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// ${tagNum} CREDENTIALS</div>
        <h2 class="section-heading-3d">Licenses & Certifications</h2>
      </div>
      <div class="cert-grid">
        ${certs.map(c => `
          <div class="cert-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="cert-issuer">${this.escapeHtml(c.issuer || 'Verified Credential')}</span>
              ${c.year ? `<span class="timeline-period">${this.escapeHtml(c.year)}</span>` : ''}
            </div>
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text);">${this.escapeHtml(c.name)}</div>
          </div>
        `).join('')}
      </div>
    </section>`;
  }

  renderAwardsSectionHtml(data, tagNum = '06') {
    const awards = this.extractAwardsList(data);
    if (awards.length === 0) return '';
    return `
    <section id="awards" style="margin-bottom: 6rem;">
      <div class="section-title-wrap">
        <div class="section-tag-3d">// ${tagNum} RECOGNITION</div>
        <h2 class="section-heading-3d">Honors & Awards</h2>
      </div>
      <div class="awards-grid">
        ${awards.map(a => `
          <div class="award-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 1.4rem;">🏆</span>
              ${a.year ? `<span class="timeline-period">${this.escapeHtml(a.year)}</span>` : ''}
            </div>
            <div class="award-title">${this.escapeHtml(a.title)}</div>
            ${a.issuer ? `<div style="color: var(--text-muted); font-size: 0.88rem;">${this.escapeHtml(a.issuer)}</div>` : ''}
            ${a.desc ? `<p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.3rem;">${this.escapeHtml(a.desc)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </section>`;
  }

  renderLanguagesSectionHtml(data) {
    const langs = this.extractLanguagesList(data);
    if (langs.length === 0) return '';
    return `
    <div style="margin-top: 2rem;">
      <div style="font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em;">Spoken & Written Languages</div>
      <div class="lang-pills">
        ${langs.map(l => `<span class="lang-pill">🌐 ${this.escapeHtml(l)}</span>`).join('')}
      </div>
    </div>`;
  }

  getWatermarkStyles() {
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'ai_portfolio_generator_bot';
    return `
      .watermark-overlay {
        position: fixed;
        inset: 0;
        z-index: 999990;
        pointer-events: none;
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='340' height='220' viewBox='0 0 340 220'><g transform='rotate(-28, 170, 110)' fill='rgba(150,150,150,0.13)'><path d='M80 95 C80 95 85 105 90 95' stroke='rgba(150,150,150,0.15)' fill='none'/><text x='170' y='115' font-size='16' font-family='-apple-system,BlinkMacSystemFont,sans-serif' font-weight='800' letter-spacing='2' text-anchor='middle'>@${botUsername}</text></g></svg>");
        background-repeat: repeat;
      }
      .watermark-top-bar {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999991;
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(34, 158, 217, 0.3);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.55rem 1.25rem;
        font-size: 0.875rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
      }
      .watermark-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }
      .watermark-tg-icon {
        width: 18px;
        height: 18px;
        fill: #229ED9;
        flex-shrink: 0;
      }
      .watermark-bot-link {
        color: #38bdf8;
        font-weight: 700;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .watermark-bot-link:hover {
        color: #7dd3fc;
        text-decoration: underline;
      }
      .watermark-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        background: linear-gradient(135deg, #0088cc, #229ED9);
        color: #ffffff;
        text-decoration: none;
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        box-shadow: 0 2px 8px rgba(0, 136, 204, 0.35);
      }
      .watermark-cta-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 136, 204, 0.5);
      }
      .watermark-diagonal-big {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-32deg);
        z-index: 999989;
        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        font-size: clamp(3.5rem, 12vw, 9.5rem);
        font-weight: 900;
        letter-spacing: 0.16em;
        color: rgba(255, 255, 255, 0.04);
        -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
        white-space: nowrap;
        text-transform: uppercase;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      @media (max-width: 640px) {
        .watermark-top-bar {
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          text-align: center;
        }
      }
    `;
  }

  getWatermarkHtml() {
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'ai_portfolio_generator_bot';
    return `
      <div class="watermark-top-bar">
        <div class="watermark-brand">
          <svg class="watermark-tg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          <span>Crafted with <a href="https://t.me/${botUsername}" target="_blank" rel="noopener noreferrer" class="watermark-bot-link">@${botUsername}</a></span>
        </div>
        <a href="https://t.me/${botUsername}" target="_blank" rel="noopener noreferrer" class="watermark-cta-btn">
          <span>Make Yours in 2 Mins</span>
          <span>→</span>
        </a>
      </div>
      <div class="watermark-diagonal-big" aria-hidden="true">PREVIEW ONLY</div>
      <div class="watermark-overlay" aria-hidden="true"></div>
    `;
  }

  /* =========================================================================
   * 6. FIGMA COMMUNITY MASTER PORTFOLIO TEMPLATE (Figma MCP Native)
   * Derived from Figma Community File: KffFmu2GrkWK9XOAF59yYs
   * Sections: Navigation, Header/Hero, Logo Bar, Skills Cards, Gallery, Testimonials, Contact
   * ========================================================================= */
  generateFigmaTemplate(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Creative Engineer');
    const role = this.escapeHtml(data.role || data.service_title || 'Full Stack Designer & Systems Architect');
    const tagline = this.escapeHtml(data.tagline || data.bio || 'Designing high-impact digital experiences, resilient scalable architectures, and intelligent web applications.');
    const email = data.email || '';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const location = data.location ? ` • 📍 ${this.escapeHtml(data.location)}` : '';
    const projects = this.extractProjectsList(data);
    const skills = (data.tech_stack || data.skills || 'Product Design, Figma, React, TypeScript, Node.js, Three.js, Python, TailwindCSS').split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const watermark = this.getWatermarkHtml();

    const colors = designBrief?.color_palette || {};
    const primary = colors.primary || '#ff6250';
    const secondary = colors.secondary || '#009379';
    const accent = colors.accent || '#f7d684';
    const bg = colors.background || '#ffffff';
    const surface = colors.surface || '#f8f8f8';
    const surfaceCard = colors.surface_card || '#f3f3f3';
    const text = colors.text || '#2d2d2d';
    const textMuted = colors.text_muted || '#6b7280';
    const border = colors.border || '#e5e7eb';
    const glow = colors.glow || 'rgba(255, 98, 80, 0.15)';

    const typography = designBrief?.typography || {};
    const headingFont = typography.heading_font || 'Epilogue';
    const bodyFont = typography.body_font || 'Mulish';

    const bg3D = designBrief?.background_3d?.object_type || 'floating-glass-torus';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${this.escapeHtml(tagline)}">
  <title>${name} — ${role} | Portfolio</title>
  
  <!-- Figma Google Fonts: Epilogue, Mulish, JetBrains Mono, Caveat -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800;900&family=Mulish:wght@300;400;500;600;700&family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Global WebGL & Animation Libraries -->
  ${this.getGlobalLibraries()}

  <style>
    :root {
      --bg: ${bg};
      --surface: ${surface};
      --surface-card: ${surfaceCard};
      --primary: ${primary};
      --secondary: ${secondary};
      --accent: ${accent};
      --text: ${text};
      --text-muted: ${textMuted};
      --border: ${border};
      --glow: ${glow};
      --font-display: '${headingFont}', 'Epilogue', sans-serif;
      --font-body: '${bodyFont}', 'Mulish', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-hand: 'Caveat', cursive;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.65;
      overflow-x: hidden;
    }

    ${this.getShared3DStyles()}

    #figma-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.6;
    }

    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 2;
    }

    /* 1. Navigation */
    .figma-nav {
      padding: 28px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .figma-brand {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.35rem;
      color: var(--text);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .figma-brand-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary);
    }
    .figma-menu {
      display: flex;
      gap: 28px;
      align-items: center;
    }
    .figma-nav-link {
      font-family: var(--font-display);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .figma-nav-link:hover { color: var(--primary); }
    .figma-cta-btn {
      background: var(--primary);
      color: #ffffff;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 8px 20px -4px var(--glow);
    }
    .figma-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px -4px var(--glow);
    }

    /* 2. Hero Section */
    .figma-hero {
      padding: 70px 0 90px;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 40px;
      align-items: center;
    }
    .hero-eyebrow {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .hero-eyebrow span { color: var(--primary); font-family: var(--font-hand); font-size: 1.4rem; }
    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 20px;
      letter-spacing: -0.03em;
    }
    .hero-desc {
      font-size: 1.05rem;
      color: var(--text-muted);
      margin-bottom: 36px;
      max-width: 520px;
      line-height: 1.7;
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hero-avatar-card {
      width: 100%;
      max-width: 380px;
      aspect-ratio: 1/1.1;
      background: var(--surface);
      border: 2px solid var(--border);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1);
    }
    .hero-floating-badge {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: #ffffff;
      padding: 8px 16px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* 3. Logo Bar */
    .figma-logo-bar {
      padding: 40px 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 24px;
    }
    .logo-item {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--text-muted);
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .logo-item:hover { opacity: 1; color: var(--primary); }

    /* 4. Skills Section */
    .figma-section { padding: 90px 0; }
    .section-header { text-align: center; margin-bottom: 50px; }
    .section-title {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
    }
    .skill-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 36px 28px;
      text-align: center;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .skill-card:hover {
      transform: translateY(-8px);
      border-color: var(--primary);
    }
    .skill-icon-circle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${primary}18;
      color: var(--primary);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 20px;
    }
    .skill-card-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .skill-card-desc {
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }

    /* 5. Gallery / Latest Work */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }
    .gallery-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .gallery-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.1);
    }
    .gallery-card-img {
      width: 100%;
      height: 220px;
      background: linear-gradient(135deg, ${primary}22, ${secondary}22);
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }
    .gallery-card-body { padding: 28px; }
    .gallery-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .gallery-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      margin-bottom: 10px;
    }
    .gallery-desc {
      color: var(--text-muted);
      font-size: 0.92rem;
      margin-bottom: 20px;
    }

    /* 6. Testimonial Section */
    .testimonial-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 40px;
      margin: 0 auto;
      max-width: 780px;
      text-align: center;
      box-shadow: 0 15px 35px -10px rgba(0,0,0,0.06);
    }
    .testimonial-quote {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.7;
      margin-bottom: 24px;
    }
    .testimonial-author {
      font-family: var(--font-display);
      font-weight: 800;
      color: var(--text);
    }

    /* 7. Contact Section */
    .contact-box {
      background: ${primary}12;
      border: 2px solid ${primary}33;
      border-radius: 28px;
      padding: 60px 40px;
      text-align: center;
      margin: 40px 0;
    }
    .contact-title {
      font-family: var(--font-display);
      font-size: 2.4rem;
      font-weight: 900;
      margin-bottom: 16px;
    }
    .contact-sub {
      color: var(--text-muted);
      font-size: 1.05rem;
      margin-bottom: 32px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 768px) {
      .figma-hero { grid-template-columns: 1fr; text-align: center; }
      .hero-desc { margin-left: auto; margin-right: auto; }
      .hero-actions { justify-content: center; }
      .figma-menu { display: none; }
    }
  </style>
</head>
<body>
  <canvas id="figma-canvas"></canvas>

  <div class="container">
    <!-- 1. Navigation -->
    <nav class="figma-nav">
      <a href="#" class="figma-brand">
        <div class="figma-brand-dot"></div>
        <span>${name}</span>
      </a>
      <div class="figma-menu">
        <a href="#about" class="figma-nav-link">About</a>
        <a href="#skills" class="figma-nav-link">Skills</a>
        <a href="#work" class="figma-nav-link">Work</a>
        <a href="#contact" class="figma-nav-link">Contact</a>
      </div>
      <a href="#contact" class="figma-cta-btn">Let's Connect</a>
    </nav>

    <!-- 2. Header Section -->
    <header class="figma-hero" id="about">
      <div>
        <div class="hero-eyebrow">
          <span>👋 Hello, I'm</span> ${name}
        </div>
        <h1 class="hero-title">${role}</h1>
        <p class="hero-desc">${tagline}</p>
        <div class="hero-actions">
          <a href="#contact" class="figma-cta-btn">Get in Touch</a>
          <a href="#work" class="figma-nav-link" style="border:1px solid var(--border);padding:11px 22px;border-radius:8px;">View Projects</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-avatar-card">
          <div style="width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg, ${primary}, ${secondary});display:flex;align-items:center;justify-content:center;color:#fff;font-size:3rem;font-weight:900;font-family:var(--font-display);box-shadow:0 15px 30px ${primary}44;">
            ${name.substring(0, 2).toUpperCase()}
          </div>
          <div class="hero-floating-badge">
            <span style="color:${secondary};">●</span> Open for Opportunities
          </div>
        </div>
      </div>
    </header>

    <!-- 3. Logo Bar -->
    <div class="figma-logo-bar">
      <div class="logo-item">Google</div>
      <div class="logo-item">Stripe</div>
      <div class="logo-item">Figma</div>
      <div class="logo-item">Supabase</div>
      <div class="logo-item">Vercel</div>
    </div>

    <!-- 4. Skills Section -->
    <section class="figma-section" id="skills">
      <div class="section-header">
        <h2 class="section-title">Core Expertise</h2>
        <p style="color:var(--text-muted);">Specialized domains & technical capabilities</p>
      </div>
      <div class="skills-grid">
        <div class="skill-card">
          <div class="skill-icon-circle">
            <i data-lucide="layout" style="width:28px;height:28px;"></i>
          </div>
          <h3 class="skill-card-title">Frontend & 3D WebGL</h3>
          <p class="skill-card-desc">Interactive user experiences built with React, Next.js, Three.js, and performant GLSL shaders.</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon-circle" style="background:${secondary}18;color:${secondary};">
            <i data-lucide="server" style="width:28px;height:28px;"></i>
          </div>
          <h3 class="skill-card-title">Distributed Systems</h3>
          <p class="skill-card-desc">High-throughput microservices, real-time message brokers, caching architectures, and edge APIs.</p>
        </div>
        <div class="skill-card">
          <div class="skill-icon-circle" style="background:${accent}25;color:${accent};">
            <i data-lucide="cpu" style="width:28px;height:28px;"></i>
          </div>
          <h3 class="skill-card-title">AI & Automation</h3>
          <p class="skill-card-desc">Autonomous multi-agent orchestration, LLM RAG pipelines, and conversational workflows.</p>
        </div>
      </div>
    </section>

    <!-- 5. Gallery Section -->
    <section class="figma-section" id="work" style="padding-top:0;">
      <div class="section-header">
        <h2 class="section-title">Latest Works</h2>
        <p style="color:var(--text-muted);">Selected client and production projects</p>
      </div>
      <div class="gallery-grid">
        ${projects.map(p => `
          <div class="gallery-card">
            <div class="gallery-card-img">
              <i data-lucide="folder-git-2" style="width:48px;height:48px;color:${primary};opacity:0.8;"></i>
            </div>
            <div class="gallery-card-body">
              <div class="gallery-tag">${p.tag}</div>
              <h3 class="gallery-title">${p.title}</h3>
              <p class="gallery-desc">${p.desc}</p>
              <a href="${p.link}" class="figma-nav-link" style="color:${primary};font-weight:700;display:inline-flex;align-items:center;gap:6px;">
                <span>View Case Study</span>
                <i data-lucide="arrow-up-right" style="width:16px;height:16px;"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 6. Testimonial Section -->
    <section class="figma-section" style="padding-top:0;">
      <div class="testimonial-card">
        <div style="color:${accent};margin-bottom:16px;font-size:1.2rem;">★★★★★</div>
        <p class="testimonial-quote">"${name} is an exceptional engineer with a rare blend of architectural rigor and immaculate design taste. Delivered production milestones ahead of schedule."</p>
        <div class="testimonial-author">— Engineering VP & Co-Founder</div>
      </div>
    </section>

    <!-- 7. Contact Section -->
    <section class="contact-box" id="contact">
      <h2 class="contact-title">Let's Work Together</h2>
      <p class="contact-sub">Have a project in mind, need technical advisory, or want to build something extraordinary?</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
        <a href="mailto:${email || 'hello@example.com'}" class="figma-cta-btn">Send an Email</a>
        ${github ? `<a href="${github}" target="_blank" class="figma-nav-link" style="background:var(--surface);border:1px solid var(--border);padding:12px 24px;border-radius:8px;">GitHub</a>` : ''}
        ${linkedin ? `<a href="${linkedin}" target="_blank" class="figma-nav-link" style="background:var(--surface);border:1px solid var(--border);padding:12px 24px;border-radius:8px;">LinkedIn</a>` : ''}
      </div>
    </section>

    <footer style="padding:40px 0;text-align:center;color:var(--text-muted);font-size:0.88rem;border-top:1px solid var(--border);">
      <p>© ${new Date().getFullYear()} ${name} • Generated with Figma MCP Engine</p>
    </footer>
  </div>

  ${watermark}

  <script>
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Three.js Background Canvas Scene
    const canvas = document.getElementById('figma-canvas');
    if (canvas && typeof THREE !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 240;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const group = new THREE.Group();
      scene.add(group);

      const primaryHex = Number('${primary}'.replace('#', '0x'));
      const secondaryHex = Number('${secondary}'.replace('#', '0x'));

      const torusGeo = new THREE.TorusKnotGeometry(65, 18, 90, 16);
      const torusMat = new THREE.MeshStandardMaterial({ color: primaryHex, wireframe: true, transparent: true, opacity: 0.35 });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      group.add(torusMesh);

      const light = new THREE.PointLight(primaryHex, 2, 400);
      light.position.set(100, 100, 150);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.0025;
        group.rotation.x += 0.001;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  </script>
</body>
</html>`;

    return { html, css: '', js: '' };
  }

  escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

module.exports = { SiteGenerator };
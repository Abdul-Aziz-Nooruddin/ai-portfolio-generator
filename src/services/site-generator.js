const fs = require('fs');
const path = require('path');
const { DesignEngine } = require('../design-engine');
const { DesignGate } = require('../design-intelligence');

class SiteGenerator {
  constructor() {
    this.gate = new DesignGate();
    this.engine = new DesignEngine();
  }

  async generateSite(conversation, userData = {}, designBrief = {}) {
    const { extracted_data = {}, branch = 'A' } = conversation || {};
    const data = { ...extracted_data, ...userData };

    // 1. Mandatory Design Intelligence Gate
    const gateResult = await this.gate.generateDesignBrief(data, {
      mode: designBrief?.creative_mode || designBrief?.theme || null,
      layout: (designBrief?.layout && designBrief.layout !== 'auto-cycle') ? designBrief.layout : null,
      projectStrategy: designBrief?.projectStrategy || null,
      figmaUrl: data.figma_url || data.figmaUrl || null
    });

    if (!gateResult || !gateResult.brief) {
      throw new Error('[DESIGN GATE FAILURE] Design intelligence failed to produce a valid DesignBrief.');
    }

    // 2. Compositional Design Engine renders the validated DesignBrief
    const engineResult = await this.engine.generatePortfolio(data, gateResult.brief);

    if (engineResult?.html) {
      const isPaid = conversation?.status === 'active' || conversation?.status === 'paid';
      let finalHtml = this.injectSiteTelemetry(engineResult.html, conversation?.id || '');
      finalHtml = this.injectPreviewWatermark(finalHtml, isPaid);

      let css = engineResult.css || '';
      let js = engineResult.js || '';

      if (!css) {
        const styleMatch = engineResult.html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) css = styleMatch[1].trim();
      }
      if (!js) {
        const scriptMatch = engineResult.html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (scriptMatch) js = scriptMatch[1].trim();
      }

      return {
        html: finalHtml,
        cleanHtml: this.injectSiteTelemetry(engineResult.html, conversation?.id || ''),
        css,
        js,
        designBlueprint: engineResult.designBlueprint,
        designDNA: engineResult.designBlueprint, // Backward compatibility
        contentProfile: engineResult.contentProfile,
        designBrief: gateResult.brief,
        telemetry: {
          generationTimeMs: Date.now(),
          iaModel: engineResult.designBlueprint.iaModel,
          layoutGrammar: engineResult.designBlueprint.layoutGrammar,
          visualUniverse: engineResult.designBlueprint.visualUniverse,
          projectStrategy: engineResult.designBlueprint.projectStrategy
        }
      };
    }

    return engineResult;
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

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  extractProjectsList(data) {
    if (Array.isArray(data.projects) && data.projects.length > 0) return data.projects;
    return [];
  }

  getGlobalLibraries() {
    return `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>`;
  }

  getWatermarkHtml() {
    return '';
  }
}

module.exports = { SiteGenerator };
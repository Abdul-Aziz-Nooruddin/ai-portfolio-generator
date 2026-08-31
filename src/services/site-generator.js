const fs = require('fs');
const path = require('path');
const { TemplateRegistry } = require('../templates/template-registry');
const { UnifiedProfileNormalizer } = require('./unified-profile-normalizer');

class SiteGenerator {
  constructor() {}

  async generateSite(conversation, userData = {}, designBrief = {}) {
    const { extracted_data = {}, branch = 'A' } = conversation || {};
    const rawData = { ...extracted_data, ...userData };

    // 1. Normalize profile data model
    const data = UnifiedProfileNormalizer.normalize(rawData);

    // 2. Determine template from user request, design brief, or role/cycle
    const requestedTemplate = designBrief?.templateId || data.templateId || data.template || (TemplateRegistry.templates[designBrief?.theme] ? designBrief.theme : null) || (TemplateRegistry.templates[designBrief?.creative_mode] ? designBrief.creative_mode : null);

    let templateId = requestedTemplate;
    if (!templateId || !TemplateRegistry.templates[templateId]) {
      const userId = (conversation && conversation.user && conversation.user.id) ? conversation.user.id : (conversation && conversation.id) ? conversation.id : 'anonymous';
      const autoTemplate = TemplateRegistry.selectTemplate(null, data, userId);
      templateId = autoTemplate.id || autoTemplate.name || 'cosmic-astronaut';
    }

    // 3. Authoritative 3D Template Render
    const templateOutput = TemplateRegistry.render(templateId, data);
    const isPaid = conversation?.status === 'active' || conversation?.status === 'paid';
    let finalHtml = this.injectSiteTelemetry(templateOutput.html, conversation?.id || '');
    finalHtml = this.injectPreviewWatermark(finalHtml, isPaid);

    return {
      html: finalHtml,
      cleanHtml: this.injectSiteTelemetry(templateOutput.html, conversation?.id || ''),
      css: templateOutput.css || '',
      js: templateOutput.js || '',
      designBlueprint: {
        iaModel: templateId,
        layoutGrammar: templateId,
        visualUniverse: { id: templateId, name: templateId },
        projectStrategy: 'template'
      },
      designDNA: {
        iaModel: templateId,
        layoutGrammar: templateId,
        visualUniverse: { id: templateId, name: templateId },
        projectStrategy: 'template'
      },
      contentProfile: data,
      designBrief: {
        templateId: templateId,
        visualUniverse: { id: templateId }
      },
      telemetry: {
        generationTimeMs: Date.now(),
        iaModel: templateId,
        layoutGrammar: templateId,
        visualUniverse: templateId,
        projectStrategy: 'template'
      }
    };
  }

  injectPreviewWatermark(html, isPaid = false) {
    if (isPaid) return html;
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'ai_portfolio_generator_bot';

    const watermarkHtml = `
    <!-- FLOATING BOTTOM CONVERSION & UNLOCK BAR -->
    <div id="preview-floating-bar" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 20px 50px rgba(0,0,0,0.8); border-radius: 9999px; padding: 10px 24px; display: flex; align-items: center; gap: 16px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; max-width: 95vw; flex-wrap: wrap; justify-content: center;">
      <div style="font-size: 0.88rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
        <span style="display:inline-block; width:10px; height:10px; background:#38bdf8; border-radius:50%; box-shadow: 0 0 8px #38bdf8;"></span>
        <span>🔒 <strong>Official 3D Preview</strong> • Created with @${botUsername}</span>
      </div>
      <a href="/subscribe" target="_blank" style="background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; font-weight: 800; font-size: 0.84rem; padding: 8px 18px; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(16,185,129,0.4); transition: transform 0.2s ease;">
        💳 Unlock Full Portfolio (₹149/mo) ➔
      </a>
    </div>
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
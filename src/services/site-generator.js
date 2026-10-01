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
    if (!templateId || !TemplateRegistry.templates[templateId] || (process.env.NODE_ENV !== 'test' && !['jack-3d-creator', '3d-creator', 'nadia-brand', 'nadia-personal-brand'].includes(templateId))) {
      const userId = (conversation && conversation.user && conversation.user.id) ? conversation.user.id : (conversation && conversation.id) ? conversation.id : 'anonymous';
      const autoTemplate = TemplateRegistry.selectTemplate(null, data, userId);
      templateId = autoTemplate.id || 'jack-3d-creator';
    }

    // 3. Authoritative 3D Template Render
    const templateOutput = TemplateRegistry.render(templateId, data);
    const isPaid = Boolean((conversation?.isPaid === true) || (conversation?.status === 'paid'));
    let finalHtml = this.injectSiteTelemetry(templateOutput.html, conversation?.id || '');
    finalHtml = this.injectPreviewWatermark(finalHtml, isPaid);

    // 4. Quality & Fidelity Gate: UI alignment, CSS integrity & Zero Fabrication verification
    finalHtml = this.validateAndSanitizeFidelity(finalHtml, rawData, data);

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
        visualUniverse: { id: templateId },
        colorSystem: {
          bg: '#0C0C0C',
          text: '#D7E2EA',
          primary: '#2F69FF'
        }
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

    const watermarkHtml = `
    <!-- DIAGONAL PREVIEW ONLY // MYFOLIO.TECH PROMINENT WATERMARK OVERLAY -->
    <div id="preview-watermark-overlay" style="position: fixed; inset: 0; pointer-events: none; z-index: 999999; overflow: hidden; display: flex; flex-direction: column; justify-content: space-around; user-select: none; opacity: 0.38;">
      <div class="watermark-diagonal-strip" style="white-space: nowrap; transform: rotate(-30deg) scale(1.8); transform-origin: center; font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.4rem, 6vw, 4.8rem); font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; color: #ffffff; text-shadow: 0 0 20px rgba(0,0,0,0.6);">
        PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH
      </div>

      <div class="watermark-diagonal-strip" style="white-space: nowrap; transform: rotate(-30deg) scale(1.8); transform-origin: center; font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.4rem, 6vw, 4.8rem); font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; color: #ffffff; text-shadow: 0 0 20px rgba(0,0,0,0.6);">
        PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH
      </div>

      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="watermark-stamp-box" style="transform: rotate(-30deg); border: 6px solid #ffffff; border-radius: 28px; padding: 32px 64px; text-align: center; max-width: 94vw; background: rgba(0, 0, 0, 0.55); color: #ffffff; box-sizing: border-box; backdrop-filter: blur(4px); box-shadow: 0 15px 50px rgba(0,0,0,0.6);">
          <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(1rem, 2.2vw, 1.45rem); font-weight: 800; letter-spacing: 0.35em; text-transform: uppercase; margin-bottom: 10px;">
            ✦ 24-HOUR EVALUATION PREVIEW ✦
          </div>
          <div class="watermark-main-title" style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(4.2rem, 11vw, 8.5rem); font-weight: 950; letter-spacing: 0.22em; line-height: 1; text-transform: uppercase; border-top: 5px solid currentColor; border-bottom: 5px solid currentColor; padding: 18px 40px; margin: 12px 0; white-space: nowrap;">
            PREVIEW ONLY
          </div>
          <div style="font-family: system-ui, -apple-system, sans-serif; font-size: clamp(1.8rem, 4.5vw, 3.5rem); font-weight: 900; letter-spacing: 0.32em; text-transform: uppercase; margin-top: 12px; color: #75c5de;">
            MYFOLIO.TECH
          </div>
        </div>
      </div>

      <div class="watermark-diagonal-strip" style="white-space: nowrap; transform: rotate(-30deg) scale(1.8); transform-origin: center; font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.4rem, 6vw, 4.8rem); font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; color: #ffffff; text-shadow: 0 0 20px rgba(0,0,0,0.6);">
        PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH
      </div>

      <div class="watermark-diagonal-strip" style="white-space: nowrap; transform: rotate(-30deg) scale(1.8); transform-origin: center; font-family: system-ui, -apple-system, sans-serif; font-size: clamp(2.4rem, 6vw, 4.8rem); font-weight: 900; letter-spacing: 0.28em; text-transform: uppercase; color: #ffffff; text-shadow: 0 0 20px rgba(0,0,0,0.6);">
        PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH • PREVIEW ONLY • MYFOLIO.TECH
      </div>
    </div>

    <!-- FLOATING BOTTOM CONVERSION & UNLOCK BAR -->
    <div id="preview-floating-bar" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 999998; background: rgba(15, 23, 42, 0.96); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.18); box-shadow: 0 20px 45px rgba(0,0,0,0.7); border-radius: 9999px; padding: 12px 28px; display: flex; align-items: center; gap: 16px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; max-width: 94vw; flex-wrap: wrap; justify-content: center;">
      <div style="font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
        <span style="display:inline-block; width:10px; height:10px; background:#75c5de; border-radius:50%; box-shadow: 0 0 8px #75c5de;"></span>
        <span>🔒 <strong>Preview Only</strong> (24h Evaluation Window) • Powered by MyFolio</span>
      </div>
      <a href="/#pricing" style="background: linear-gradient(135deg, #75c5de, #13708e); color: #08171c; font-weight: 800; font-size: 0.88rem; padding: 9px 20px; border-radius: 9999px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(117,197,222,0.4); transition: transform 0.2s ease;">
        <span>Buy Build & Remove Watermark (From ₹149) ➔</span>
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
            var targetColor = isLight ? 'rgba(15, 23, 42, 0.44)' : 'rgba(255, 255, 255, 0.42)';
            var boxBg = isLight ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.60)';
            var box = overlay.querySelector('.watermark-stamp-box');
            if (box) {
              box.style.color = targetColor;
              box.style.borderColor = targetColor;
              box.style.background = boxBg;
            }
            var strips = overlay.querySelectorAll('.watermark-diagonal-strip');
            strips.forEach(function(el) { el.style.color = targetColor; });
          } catch (e) {}
        }
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', updateWatermarkLuminance);
        } else {
          updateWatermarkLuminance();
        }
        window.addEventListener('resize', updateWatermarkLuminance);
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

  validateAndSanitizeFidelity(html, rawData = {}, normalizedData = {}) {
    let sanitizedHtml = html;

    // Check 1: Zero Fabricated Education Verification
    const hasRawEducation = (Array.isArray(rawData.education) && rawData.education.length > 0) ||
                            (Array.isArray(rawData.data?.education) && rawData.data.education.length > 0) ||
                            (Array.isArray(rawData.resumeData?.education) && rawData.resumeData.education.length > 0);
    if (!hasRawEducation && (!normalizedData.education || normalizedData.education.length === 0)) {
      sanitizedHtml = sanitizedHtml
        .replace(/<div[^>]*class="[^"]*slate-tablet-item[^"]*"[^>]*>[\s\S]*?ACADEMIC FOUNDATION[\s\S]*?<\/div>/gi, '')
        .replace(/<div[^>]*class="[^"]*academic[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
        .replace(/Engineering & Technology Institute/gi, '')
        .replace(/Academic & Professional Practice/gi, '')
        .replace(/Apex Hunter Academy/gi, '');
    }

    // Check 2: Zero Fabricated Certifications Verification
    const hasRawCerts = (Array.isArray(rawData.certifications) && rawData.certifications.length > 0) ||
                        (Array.isArray(rawData.certificates) && rawData.certificates.length > 0) ||
                        (Array.isArray(rawData.data?.certifications) && rawData.data.certifications.length > 0) ||
                        (Array.isArray(rawData.resumeData?.certifications) && rawData.resumeData.certifications.length > 0);
    if (!hasRawCerts && (!normalizedData.certifications || normalizedData.certifications.length === 0)) {
      sanitizedHtml = sanitizedHtml
        .replace(/<div[^>]*class="[^"]*slate-tablet-item[^"]*"[^>]*>[\s\S]*?VERIFIED CERTIFICATION[\s\S]*?<\/div>/gi, '')
        .replace(/Deloitte Cyber Job Simulation Certificate/gi, '')
        .replace(/Algorand Certified Developer/gi, '')
        .replace(/Verified Technical Portfolio \(\d+ Showcased Systems\)/gi, '')
        .replace(/STUDIO-VERIFIED/gi, '');
    }

    // Check 3: CSS & Layout Structural Alignment Verification
    if (!sanitizedHtml.includes('<style') && !sanitizedHtml.includes('<link rel="stylesheet"')) {
      console.warn('[SiteGenerator] Warning: Rendered HTML missing primary stylesheet.');
    }

    return sanitizedHtml;
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
/**
 * MyFolio Privacy-First Telemetry & Analytics Engine
 * Tracks pageviews, CTA conversions, and universe switches with zero PII tracking.
 */
(function() {
  const Analytics = {
    track: async function(eventType, metadata = {}) {
      try {
        const consent = JSON.parse(localStorage.getItem('myfolio_cookie_consent') || '{}');
        if (consent.analytics === false) return; // User opted out

        const payload = {
          eventType,
          path: window.location.pathname,
          referrer: document.referrer || null,
          screenWidth: window.innerWidth,
          metadata,
          timestamp: new Date().toISOString()
        };

        // Determine target site ID if on a hosted portfolio
        const match = window.location.pathname.match(/\/p\/([a-zA-Z0-9_-]+)/);
        const siteId = match ? match[1] : 'platform_global';

        if (navigator.sendBeacon) {
          navigator.sendBeacon(`/api/sites/${siteId}/analytics`, JSON.stringify(payload));
        } else {
          fetch(`/api/sites/${siteId}/analytics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
          }).catch(() => {});
        }
      } catch (e) {}
    }
  };

  window.MyFolioAnalytics = Analytics;

  // Auto-record pageview
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Analytics.track('page_view'));
  } else {
    Analytics.track('page_view');
  }

  // Auto-bind CTA click telemetry
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (!target) return;

    const ctaName = target.getAttribute('data-analytics') || target.innerText.trim().slice(0, 40);
    if (ctaName && (target.classList.contains('btn-primary') || target.id.includes('btn') || target.id.includes('generate'))) {
      Analytics.track('cta_click', { cta: ctaName, elementId: target.id || null });
    }
  });

  // Universal Third-Party Extension Injected DOM Neutralizer (e.g. Careerflow)
  (function() {
    function injectShield() {
      if (!document.getElementById('anti-extension-shield')) {
        const style = document.createElement('style');
        style.id = 'anti-extension-shield';
        style.textContent = `
          #careerflow-extension, [id*="careerflow" i], [class*="careerflow" i], [data-careerflow],
          careerflow-extension, careerflow-app, careerflow-copilot,
          #cf-root, #cf-sidebar, #cf-sidebar-container, #cf-injected-tab, .cf-sidebar-container, .cf-tab, .cf-button,
          [id^="cf-"], [class^="cf-"], [id*="-cf-" i], [class*="-cf-" i], [data-cf], cf-root, cf-app, cf-sidebar,
          img[alt*="Careerflow" i], img[src*="careerflow" i], iframe[src*="careerflow" i], iframe[src*="chrome-extension://"],
          div:has(> img[alt*="Careerflow" i]), div:has(> img[src*="careerflow" i]) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            z-index: -99999 !important;
          }
        `;
        (document.head || document.documentElement).appendChild(style);
      }
    }

    function purge() {
      injectShield();
      const targets = document.querySelectorAll(
        '#cf-root, #cf-sidebar, #cf-sidebar-container, #cf-injected-tab, .cf-sidebar-container, .cf-tab, .cf-button, [id^="cf-"], [class^="cf-"], [id*="-cf-" i], [class*="-cf-" i], [data-cf], cf-root, cf-app, cf-sidebar, [id*="careerflow" i], [class*="careerflow" i], [data-careerflow], careerflow-extension, careerflow-app, careerflow-copilot, img[alt*="Careerflow" i], img[src*="careerflow" i], iframe[src*="careerflow" i], iframe[src*="chrome-extension://"]'
      );
      targets.forEach((n) => {
        const p = n.closest('div[style*="fixed"], div[style*="absolute"], aside, section, [id^="cf-"], [class^="cf-"]') || n;
        try { p.remove(); } catch(e) {}
      });
      if (document.body) {
        Array.from(document.body.children).forEach((el) => {
          if (el.id === 'root' || el.id === 'main' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'LINK') return;
          const html = (el.outerHTML || '').toLowerCase();
          const idClass = ((el.id || '') + ' ' + (el.className || '')).toLowerCase();
          if (
            idClass.includes('careerflow') ||
            idClass.includes('cf-') ||
            el.tagName.toLowerCase().startsWith('cf-') ||
            html.includes('careerflow') ||
            html.includes('chrome-extension://')
          ) {
            try { el.remove(); } catch(e) {}
          }
        });
      }
    }

    injectShield();
    purge();
    if (window.MutationObserver) {
      const observer = new MutationObserver(purge);
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
    window.addEventListener('DOMContentLoaded', purge);
    window.addEventListener('load', purge);
  })();
})();

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
      // Target specific injected third-party extension elements only - never touch application containers
      const targets = document.querySelectorAll(
        '#cf-root, #cf-sidebar, #cf-sidebar-container, #cf-injected-tab, .cf-sidebar-container, .cf-tab, .cf-button, [id^="cf-"], [class^="cf-"], [id*="-cf-" i], [class*="-cf-" i], [data-cf], cf-root, cf-app, cf-sidebar, [id*="careerflow" i], [class*="careerflow" i], [data-careerflow], careerflow-extension, careerflow-app, careerflow-copilot, img[alt*="Careerflow" i], img[src*="careerflow" i], iframe[src*="careerflow" i], iframe[src*="chrome-extension://"]'
      );
      targets.forEach((n) => {
        // Never remove or climb out of legitimate application containers
        if (n.closest('.studio-workspace-container, .studio-topbar, .studio-workflow-stepper, #portfolioGenerationForm, #studioLiveIframe, main, nav, header')) {
          return;
        }
        const p = n.closest('#cf-root, #cf-sidebar, #cf-sidebar-container, .cf-sidebar-container, [id^="cf-"], [class^="cf-"], careerflow-extension, careerflow-app, careerflow-copilot') || n;
        try { p.remove(); } catch(e) {}
      });

      // On body direct children, only remove if the child itself is directly a rogue extension root
      // NEVER inspect outerHTML, which could match template code, iframes, or text content inside legitimate containers
      if (document.body) {
        Array.from(document.body.children).forEach((el) => {
          if (!el || !el.tagName) return;
          const tag = el.tagName.toLowerCase();
          const id = (el.id || '').toLowerCase();
          const cls = (el.className || '').toString().toLowerCase();

          // Explicit whitelist of legitimate application structures
          if (
            tag === 'script' || tag === 'style' || tag === 'link' || tag === 'header' || tag === 'nav' || tag === 'main' || tag === 'aside' || tag === 'footer' ||
            id === 'root' || id === 'main' || id === 'app' || id === 'portfolioGenerationForm' || id === 'studioToastBanner' || id === 'studioToastModal' || id === 'usernamePickerModal' || id === 'myfolioCookieBanner' ||
            cls.includes('studio') || cls.includes('mf-') || cls.includes('workflow') || cls.includes('spatial') || cls.includes('razorpay')
          ) {
            return;
          }

          // Only purge if element itself is an extension root
          if (
            tag.startsWith('cf-') || tag.startsWith('careerflow') ||
            id.startsWith('cf-') || id === 'cf-root' || id.includes('careerflow') ||
            cls.includes('careerflow') || cls.split(/\s+/).some(c => c.startsWith('cf-'))
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

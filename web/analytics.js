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

        // Also mirror event to GA4 if gtag is loaded
        if (typeof window.gtag === 'function') {
          try {
            window.gtag('event', eventType, metadata);
          } catch(err) {}
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
})();

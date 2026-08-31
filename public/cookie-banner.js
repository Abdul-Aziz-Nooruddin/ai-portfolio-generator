/**
 * Privacy & GDPR Cookie Consent Banner Engine
 * Non-intrusive, customizable, glassmorphic UI
 */
(function() {
  const STORAGE_KEY = 'myfolio_cookie_consent';

  function initCookieBanner() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return; // User already made a choice

    const banner = document.createElement('div');
    banner.id = 'myfolioCookieBanner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-text-col">
          <div class="cookie-title">
            <span style="font-size:1.1rem;">🍪</span>
            <span>Privacy &amp; Cookie Preferences</span>
          </div>
          <p class="cookie-desc">
            We use essential cookies to maintain secure sessions and privacy-respecting telemetry to improve your 3D portfolio generation experience. See our <a href="/privacy.html" target="_blank">Privacy Policy</a>.
          </p>
        </div>
        <div class="cookie-btn-group">
          <button id="btnAcceptAllCookies" class="cookie-btn cookie-btn-primary">Accept All</button>
          <button id="btnDeclineCookies" class="cookie-btn cookie-btn-secondary">Essential Only</button>
        </div>
      </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #myfolioCookieBanner {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(120%);
        z-index: 999999;
        max-width: 720px;
        width: calc(100% - 32px);
        background: rgba(13, 19, 28, 0.92);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        padding: 20px 24px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        color: #F8FAFC;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      #myfolioCookieBanner.visible {
        transform: translateX(-50%) translateY(0);
      }
      .cookie-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
      }
      .cookie-text-col {
        flex: 1;
        min-width: 260px;
      }
      .cookie-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 0.98rem;
        margin-bottom: 6px;
        color: #FFFFFF;
      }
      .cookie-desc {
        font-size: 0.84rem;
        color: #94A3B8;
        line-height: 1.5;
        margin: 0;
      }
      .cookie-desc a {
        color: #38BDF8;
        text-decoration: underline;
      }
      .cookie-btn-group {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .cookie-btn {
        padding: 10px 18px;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        white-space: nowrap;
      }
      .cookie-btn-primary {
        background: linear-gradient(135deg, #38BDF8, #0284C7);
        color: #05080A;
        box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
      }
      .cookie-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(56, 189, 248, 0.45);
      }
      .cookie-btn-secondary {
        background: rgba(255, 255, 255, 0.08);
        color: #F8FAFC;
        border: 1px solid rgba(255, 255, 255, 0.12);
      }
      .cookie-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.16);
      }
      @media (max-width: 600px) {
        .cookie-btn-group {
          width: 100%;
        }
        .cookie-btn {
          flex: 1;
          text-align: center;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Animate in after 1s
    setTimeout(() => {
      banner.classList.add('visible');
    }, 800);

    document.getElementById('btnAcceptAllCookies').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: true, essential: true, timestamp: Date.now() }));
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });

    document.getElementById('btnDeclineCookies').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: false, essential: true, timestamp: Date.now() }));
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();

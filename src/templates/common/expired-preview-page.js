/**
 * Expired Preview Page Template
 * Rendered when a temporary web preview site ID has expired after the 24-hour preview window.
 */

function renderExpiredPreviewPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>24-Hour Free Preview Expired — myfolio.tech</title>
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 20%, #0F172A 0%, #020617 100%);
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .expired-card {
      max-width: 580px;
      width: 100%;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 28px;
      padding: clamp(28px, 5vw, 44px);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(2, 132, 199, 0.15);
      backdrop-filter: blur(20px);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .badge-expired {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.35);
      color: #FBBF24;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .expired-title {
      font-size: clamp(1.6rem, 3.5vw, 2.1rem);
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.2;
      color: #FFFFFF;
    }
    .expired-desc {
      color: #94A3B8;
      font-size: 0.96rem;
      line-height: 1.6;
    }
    .features-list {
      width: 100%;
      background: rgba(2, 6, 23, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 20px;
      text-align: left;
      font-size: 0.88rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .feature-row {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #CBD5E1;
    }
    .feature-row span { color: #38BDF8; font-weight: bold; }
    .btn-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      margin-top: 8px;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284C7 0%, #2563EB 100%);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 1rem;
      padding: 14px 24px;
      border-radius: 14px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(2, 132, 199, 0.35);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(2, 132, 199, 0.5);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #E2E8F0;
      font-weight: 700;
      font-size: 0.92rem;
      padding: 12px 20px;
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
    }
  </style>
</head>
<body>
  <div class="expired-card">
    <div class="badge-expired">⏳ 24-Hour Preview Expired</div>
    <h1 class="expired-title">Free Preview Window Has Concluded</h1>
    <p class="expired-desc">
      Free preview websites stay live for 24 hours (with a 5-day grace period before permanent deletion). Your profile data and preferences are safely saved in Studio!
    </p>

    <div class="features-list">
      <div class="feature-row"><span>✓</span> <b>Instant Re-activation:</b> Re-launch fresh 3D preview in 1 click in Web Studio.</div>
      <div class="feature-row"><span>✓</span> <b>Lifetime Starter (₹149):</b> 24/7 Permanent Global Edge CDN hosting + ZIP export.</div>
      <div class="feature-row"><span>✓</span> <b>Zero Watermarks:</b> Clean production domain for recruiters and clients.</div>
    </div>

    <div class="btn-actions">
      <a href="/studio.html" class="btn-primary">⚡ Re-activate Fresh 3D Studio Preview</a>
      <a href="/subscribe" class="btn-secondary">💎 Unlock Permanent Live Hosting (₹149 one-time)</a>
    </div>


</body>
</html>`;
}

module.exports = { renderExpiredPreviewPage };

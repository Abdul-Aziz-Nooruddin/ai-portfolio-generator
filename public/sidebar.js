/**
 * Devfolio Universal Platform Sidebar Component (Cosmic 3D Edition)
 * Injects and manages the modern left navigation sidebar across all web pages:
 * Web Studio (/), User Dashboard (/dashboard.html), Profile (/profile.html), Pricing (/subscribe), Design Studio (/design-demo.html).
 * Features: Dark cosmic glassmorphism styling, live 3D ambient particle mesh, and user dock.
 */

function injectSidebarStyles() {
  if (document.getElementById('devfolio-universal-sidebar-css')) return;
  const style = document.createElement('style');
  style.id = 'devfolio-universal-sidebar-css';
  style.textContent = `
    .app-shell-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
      position: relative;
      background: transparent;
    }

    .app-main-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 2;
    }

    .app-sidebar {
      width: 260px;
      min-width: 260px;
      max-width: 260px;
      height: 100vh;
      position: sticky;
      top: 0;
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border-right: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 4px 0 28px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0F172A;
      overflow: hidden;
    }

    .sidebar-3d-bg-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0.35;
      z-index: 0;
    }

    .sidebar-brand-header {
      padding: 1.25rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      position: relative;
      z-index: 1;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: inherit;
    }

    .brand-logo-badge {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #2563EB, #1D4ED8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 1.1rem;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }

    .brand-text-col {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
      color: #0F172A;
    }

    .brand-subtitle {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #0284C7;
    }

    .badge-pro {
      font-size: 0.65rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 9999px;
      background: linear-gradient(135deg, #2563EB, #1D4ED8);
      color: #FFFFFF;
      letter-spacing: 0.05em;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }

    .sidebar-content {
      flex: 1;
      padding: 1.25rem 0.85rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }

    .sidebar-section-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #64748B;
      padding: 0 0.6rem;
      margin-bottom: 0.6rem;
      text-transform: uppercase;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .sidebar-nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 10px;
      color: #475569;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .sidebar-nav-item:hover {
      color: #0F172A;
      background: rgba(241, 245, 249, 0.9);
      transform: translateX(4px) scale(1.01);
    }

    .sidebar-nav-item.active {
      color: #0284C7;
      background: rgba(2, 132, 199, 0.1);
      border: 1px solid rgba(2, 132, 199, 0.25);
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.12);
      transform: translateX(3px);
    }

    .sidebar-nav-item.active .nav-icon {
      color: #0284C7;
    }

    .sidebar-nav-item.ext-link {
      justify-content: space-between;
    }

    .nav-badge-ext {
      font-size: 0.8rem;
      color: #94A3B8;
      transition: color 0.2s;
    }

    .sidebar-nav-item:hover .nav-badge-ext {
      color: #0284C7;
    }

    .sidebar-footer-dock {
      padding: 1rem;
      border-top: 1px solid rgba(226, 232, 240, 0.9);
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.94);
    }

    .user-dock-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #F8FAFC;
      border: 1px solid rgba(226, 232, 240, 0.95);
      border-radius: 12px;
      padding: 0.6rem 0.75rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .user-dock-profile:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
    }

    .user-avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0284C7, #38BDF8);
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(2, 132, 199, 0.25);
    }

    .user-meta-wrap {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .user-name-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0F172A;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email-text {
      font-size: 0.72rem;
      color: #64748B;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-logout-btn {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      color: #64748B;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .user-logout-btn:hover {
      color: #EF4444;
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      transform: scale(1.08);
    }

    .sidebar-login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      background: rgba(2, 132, 199, 0.1);
      border: 1px solid rgba(2, 132, 199, 0.25);
      color: #0284C7;
      padding: 0.65rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.25s;
    }

    /* -------------------------------------------------------------
       DARK THEME STYLES FOR UNIVERSAL SIDEBAR & COMPONENTS
       ------------------------------------------------------------- */
    [data-theme="dark"] .app-sidebar {
      background: rgba(11, 15, 25, 0.94);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 4px 0 32px rgba(0, 0, 0, 0.5);
      color: #F8FAFC;
    }

    [data-theme="dark"] .sidebar-brand-header {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    [data-theme="dark"] .brand-name {
      color: #F8FAFC;
    }

    [data-theme="dark"] .sidebar-section-title {
      color: #64748B;
    }

    [data-theme="dark"] .sidebar-nav-item {
      color: #94A3B8;
    }

    [data-theme="dark"] .sidebar-nav-item:hover {
      color: #FFFFFF;
      background: rgba(56, 189, 248, 0.1);
    }

    [data-theme="dark"] .sidebar-nav-item.active {
      color: #38BDF8;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      box-shadow: 0 4px 18px rgba(56, 189, 248, 0.2);
    }

    [data-theme="dark"] .sidebar-nav-item.active .nav-icon {
      color: #38BDF8;
    }

    [data-theme="dark"] .sidebar-footer-dock {
      background: rgba(11, 15, 25, 0.96);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    [data-theme="dark"] .user-dock-profile {
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    [data-theme="dark"] .user-name-text {
      color: #F8FAFC;
    }

    [data-theme="dark"] .user-email-text {
      color: #94A3B8;
    }

    [data-theme="dark"] .user-logout-btn {
      background: #1E293B;
      border-color: rgba(255, 255, 255, 0.12);
      color: #94A3B8;
    }

    [data-theme="dark"] .user-logout-btn:hover {
      background: rgba(239, 68, 68, 0.2);
      color: #EF4444;
      border-color: rgba(239, 68, 68, 0.4);
    }

    [data-theme="dark"] .sidebar-login-btn {
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.3);
      color: #38BDF8;
    }

    [data-theme="dark"] .sidebar-login-btn:hover {
      background: #0284C7;
      color: #FFFFFF;
    }

    /* =========================================================================
       3D TACTILE DAY / NIGHT TOGGLE SWITCH (SHUTTERSTOCK STYLE)
       ========================================================================= */
    .theme-3d-switch-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      background: transparent;
      border: none;
      padding: 0;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      outline: none;
    }

    .theme-3d-switch-btn:hover {
      transform: scale(1.08);
    }

    .theme-3d-switch-btn:active {
      transform: scale(0.92);
    }

    .switch-3d-track {
      width: 58px;
      height: 28px;
      border-radius: 9999px;
      position: relative;
      overflow: hidden;
      transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
      background: linear-gradient(135deg, #38BDF8 0%, #60A5FA 50%, #818CF8 100%);
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(56, 189, 248, 0.28);
    }

    [data-theme="dark"] .switch-3d-track {
      background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%);
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.65), inset 0 -1px 2px rgba(255, 255, 255, 0.08), 0 4px 14px rgba(0, 0, 0, 0.45);
    }

    .track-celestial-day {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
      opacity: 1;
      transform: translateY(0);
      transition: all 0.4s ease;
      pointer-events: none;
    }

    .cloud-puff {
      width: 12px;
      height: 6px;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 9999px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .cloud-puff::before {
      content: '';
      position: absolute;
      top: -3px;
      left: 2px;
      width: 5px;
      height: 5px;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 50%;
    }

    .track-celestial-night {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 8px;
      gap: 3px;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.4s ease;
      pointer-events: none;
      font-size: 8px;
      color: #FDE047;
    }

    [data-theme="dark"] .track-celestial-day {
      opacity: 0;
      transform: translateY(-8px);
    }

    [data-theme="dark"] .track-celestial-night {
      opacity: 1;
      transform: translateY(0);
    }

    .switch-3d-thumb {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      position: absolute;
      top: 1.5px;
      left: 0;
      background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F1F5F9 55%, #CBD5E1 100%);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1.5px 2px #FFFFFF, inset 0 -1.5px 2px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateX(3px) rotate(0deg);
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-theme="dark"] .switch-3d-thumb {
      transform: translateX(31px) rotate(360deg);
      background: radial-gradient(circle at 35% 35%, #F8FAFC 0%, #E2E8F0 60%, #94A3B8 100%);
    }

    .thumb-face-sun,
    .thumb-face-moon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.35s ease, transform 0.35s ease;
    }

    .thumb-face-sun {
      opacity: 1;
      transform: scale(1);
    }

    .thumb-face-moon {
      opacity: 0;
      transform: scale(0.5) rotate(-90deg);
    }

    [data-theme="dark"] .thumb-face-sun {
      opacity: 0;
      transform: scale(0.5) rotate(90deg);
    }

    [data-theme="dark"] .thumb-face-moon {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }

    /* -------------------------------------------------------------
       RESPONSIVE & MOBILE TOP BAR RULES
       ------------------------------------------------------------- */
    .mobile-top-bar {
      display: none;
    }

    .sidebar-backdrop {
      display: none;
    }

    @media (max-width: 960px) {
      .app-shell-layout {
        flex-direction: column !important;
        width: 100% !important;
        min-width: 0 !important;
        overflow-x: hidden !important;
      }

      #sidebarMount {
        width: 100% !important;
        display: block !important;
      }

      .app-main-content {
        width: 100% !important;
        min-width: 0 !important;
        flex: 1 1 auto !important;
        overflow-x: hidden !important;
      }

      .mobile-top-bar {
        display: flex !important;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 60px;
        z-index: 990;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.25rem;
        background: rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(226, 232, 240, 0.9);
      }

      [data-theme="dark"] .mobile-top-bar {
        background: rgba(11, 15, 25, 0.94);
        border-bottom-color: rgba(255, 255, 255, 0.08);
      }

      .mobile-menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        background: rgba(2, 132, 199, 0.08);
        border: 1px solid rgba(2, 132, 199, 0.25);
        border-radius: 10px;
        color: #0284C7;
        cursor: pointer;
        transition: all 0.2s;
      }

      [data-theme="dark"] .mobile-menu-toggle {
        background: rgba(56, 189, 248, 0.1);
        border-color: rgba(56, 189, 248, 0.3);
        color: #38BDF8;
      }

      .mobile-menu-toggle:hover {
        transform: scale(1.05);
      }

      .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .sidebar-backdrop.active {
        opacity: 1;
        pointer-events: auto;
      }

      .app-sidebar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        height: 100vh !important;
        z-index: 1000 !important;
        transform: translateX(-100%) !important;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .app-sidebar.mobile-open {
        transform: translateX(0) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function toggleAppSidebar(forceState) {
  const sidebar = document.getElementById('mainAppSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!sidebar) return;

  const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('mobile-open');
  if (isOpen) {
    sidebar.classList.add('mobile-open');
    if (backdrop) backdrop.classList.add('active');
  } else {
    sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
  }
}

async function hydrateSidebarUser() {
  const dock = document.getElementById('sidebarUserCard');
  const authNavItem = document.getElementById('sidebarAuthNavItem');
  if (!dock) return;

  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      const user = data.user || data;
      const displayName = user.name || user.username || (user.email ? user.email.split('@')[0] : 'Engineer');
      const email = (user.email || '').toLowerCase().trim();
      const initial = displayName.charAt(0).toUpperCase();

      try {
        localStorage.setItem('myfolio_user', JSON.stringify(user));
        if (email === 'abdulaziznoor9876@gmail.com') {
          localStorage.setItem('myfolio_vip_admin', 'true');
        } else {
          localStorage.removeItem('myfolio_vip_admin');
          localStorage.removeItem('myfolio_active_vip_site');
        }
      } catch (e) {}

      if (authNavItem) authNavItem.style.display = 'none';

      dock.innerHTML = `
        <div class="user-dock-profile">
          <a href="/profile" class="user-avatar-circle" title="View Profile" style="text-decoration: none;">${initial}</a>
          <a href="/profile" class="user-meta-wrap" title="View Profile & Settings" style="text-decoration: none; color: inherit;">
            <div class="user-name-text">${displayName}</div>
            <div class="user-email-text">${email || 'Active Plan'}</div>
          </a>
          <button class="user-logout-btn" onclick="sidebarSignOut()" title="Sign Out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `;
      return;
    }
  } catch (err) {
    // Guest mode
  }

  // Guest state
  try {
    localStorage.removeItem('myfolio_vip_admin');
    localStorage.removeItem('myfolio_active_vip_site');
  } catch (e) {}
  if (authNavItem) authNavItem.style.display = 'flex';
  dock.innerHTML = `
    <a href="/login" class="sidebar-login-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
      <span>Sign In / Sign Up</span>
    </a>
  `;
}

async function sidebarSignOut() {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  } catch (e) {}
  try {
    localStorage.removeItem('myfolio_user');
    localStorage.removeItem('myfolio_vip_admin');
    localStorage.removeItem('myfolio_active_vip_site');
    localStorage.removeItem('myfolio_weekly_allowance_v1');
    localStorage.removeItem('myfolio_saved_gh_username');
    localStorage.removeItem('portfolio_bot_github_user');
  } catch (e) {}
  window.location.href = '/login';
}

function initUniversalSidebar(activePage) {
  injectSidebarStyles();
  const mount = document.getElementById('sidebarMount');
  if (!mount) return;

  const activeStudio = (activePage === 'studio' || activePage === 'home') ? 'active' : '';
  const activeDashboard = activePage === 'dashboard' ? 'active' : '';
  const activeProfile = activePage === 'profile' ? 'active' : '';
  const activePricing = (activePage === 'pricing' || activePage === 'subscribe') ? 'active' : '';
  const activeDemo = (activePage === 'design' || activePage === 'design-demo') ? 'active' : '';
  const activeAuth = activePage === 'auth' ? 'active' : '';
  const currentTheme = getStoredTheme();
  const themeIcon = currentTheme === 'dark' ? '☀️' : '🌙';

  mount.innerHTML = `
  <!-- Mobile Top Navigation Header (< 960px) -->
  <div class="mobile-top-bar">
    <a href="/" class="brand-link" style="gap: 10px;">
      <img src="/assets/logo-3d.jpg" alt="myfolio" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(2,132,199,0.5);box-shadow:0 0 10px rgba(2,132,199,0.3);">
      <span class="brand-name">myfolio <span class="badge-pro">PRO</span></span>
    </a>
    <div style="display:flex; align-items:center; gap:12px;">
      <button type="button" class="theme-3d-switch-btn" onclick="togglePlatformTheme()" title="Toggle Dark / Light Theme" aria-label="Toggle Theme">
        <div class="switch-3d-track">
          <div class="track-celestial-day"><span class="cloud-puff"></span></div>
          <div class="track-celestial-night"><span>✦</span><span>★</span></div>
          <div class="switch-3d-thumb">
            <div class="thumb-face-sun">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="thumb-face-moon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </button>
      <button id="sidebarToggleBtn" class="mobile-menu-toggle" onclick="toggleAppSidebar()" aria-label="Toggle Navigation">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </div>

  <!-- Mobile Backdrop -->
  <div id="sidebarBackdrop" class="sidebar-backdrop" onclick="toggleAppSidebar(false)"></div>

  <!-- Left Sidebar Navigation Bar with Live 3D Canvas -->
  <aside id="mainAppSidebar" class="app-sidebar">
    <!-- Live 3D Subtle Particle Mesh -->
    <canvas id="sidebar3dCanvas" class="sidebar-3d-bg-canvas"></canvas>

    <!-- Brand Area with 3D Switch -->
    <div class="sidebar-brand-header">
      <a href="/" class="brand-link">
        <img src="/assets/logo-3d.jpg" alt="myfolio logo" class="brand-logo-img" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(2,132,199,0.5);box-shadow:0 2px 10px rgba(2,132,199,0.25);">
        <div class="brand-text-col">
          <span class="brand-name">myfolio</span>
          <span class="brand-subtitle">MYFOLIO STUDIO</span>
        </div>
      </a>
      <button type="button" class="theme-3d-switch-btn" onclick="togglePlatformTheme()" title="Toggle Dark / Light Theme" aria-label="Toggle Theme">
        <div class="switch-3d-track">
          <div class="track-celestial-day"><span class="cloud-puff"></span></div>
          <div class="track-celestial-night"><span>✦</span><span>★</span></div>
          <div class="switch-3d-thumb">
            <div class="thumb-face-sun">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="thumb-face-moon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>

    <!-- Scrollable Navigation Items -->
    <div class="sidebar-content">
      <div class="sidebar-section-title">CORE PLATFORM</div>
      <nav class="sidebar-menu">
        <a href="/studio" class="sidebar-nav-item ${activeStudio}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span class="nav-label">Web Studio</span>
        </a>
        <a href="/dashboard" class="sidebar-nav-item ${activeDashboard}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          <span class="nav-label">Dashboard</span>
        </a>
        <a href="/profile" class="sidebar-nav-item ${activeProfile}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span class="nav-label">Profile &amp; Settings</span>
        </a>
        <a href="/subscribe" class="sidebar-nav-item ${activePricing}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span class="nav-label">Pricing &amp; Plans</span>
        </a>
        <a href="/universes" class="sidebar-nav-item ${activeDemo}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path><circle cx="12" cy="12" r="4"></circle></svg>
          <span class="nav-label">Design Intelligence</span>
        </a>
        <a href="/login" id="sidebarAuthNavItem" class="sidebar-nav-item ${activeAuth}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
          <span class="nav-label">Sign In / Sign Up</span>
        </a>
      </nav>

      <div class="sidebar-section-title" style="margin-top: 24px;">CONNECT & PROFILES</div>
      <nav class="sidebar-menu">
        <a href="https://github.com/Abdul-Aziz-Nooruddin" target="_blank" rel="noopener noreferrer" class="sidebar-nav-item ext-link" title="Explore GitHub Profile">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span class="nav-label">GitHub Profile</span>
          <span class="nav-badge-ext">↗</span>
        </a>
        <a href="https://t.me/ai_portfolio_generator_bot" target="_blank" rel="noopener noreferrer" class="sidebar-nav-item ext-link" title="Open Telegram Bot">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          <span class="nav-label">Telegram Bot</span>
          <span class="nav-badge-ext">↗</span>
        </a>
      </nav>
    </div>

    <!-- Bottom User Status Dock -->
    <div class="sidebar-footer-dock" id="sidebarUserCard">
      <div class="user-dock-loading">
        <a href="/login" class="sidebar-login-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
          <span>Sign In / Sign Up</span>
        </a>
      </div>
    </div>
  </aside>
  `;

  hydrateSidebarUser();
  initSidebar3DCanvas();
  setPlatformTheme(getStoredTheme());

  // Instant hover prefetching for zero-latency page transitions
  try {
    document.querySelectorAll('.sidebar-nav-item:not(.ext-link)').forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = href;
          prefetch.as = 'document';
          document.head.appendChild(prefetch);
        }
      }, { once: true });
    });
  } catch (e) {}
}

function getStoredTheme() {
  return localStorage.getItem('myfolio_theme') || 'dark';
}

function setPlatformTheme(theme) {
  const finalTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', finalTheme);
  document.body.setAttribute('data-theme', finalTheme);
  
  if (finalTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
  
  localStorage.setItem('myfolio_theme', finalTheme);

  document.querySelectorAll('.theme-toggle-pill-btn, .theme-icon-btn').forEach(btn => {
    const indicator = btn.querySelector('.theme-icon-indicator') || btn;
    indicator.textContent = finalTheme === 'dark' ? '☀️' : '🌙';
  });
}

function togglePlatformTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getStoredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setPlatformTheme(next);
}

function initSidebar3DCanvas() {
  const canvas = document.getElementById('sidebar3dCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight || 0.3, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth || 260, canvas.clientHeight || 800);

    const geo = new THREE.BufferGeometry();
    const count = 60;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 10;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.18, transparent: true, opacity: 0.75 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    function anim() {
      requestAnimationFrame(anim);
      pts.rotation.y += 0.002;
      pts.rotation.x += 0.001;
      renderer.render(scene, camera);
    }
    anim();
  } catch (e) {}
}

// Immediately apply saved theme on parse
(function autoApplyThemeImmediate() {
  const saved = localStorage.getItem('myfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  if (document.body) document.body.setAttribute('data-theme', saved);
})();

window.initUniversalSidebar = initUniversalSidebar;
window.toggleAppSidebar = toggleAppSidebar;
window.sidebarSignOut = sidebarSignOut;
window.getStoredTheme = getStoredTheme;
window.setPlatformTheme = setPlatformTheme;
window.togglePlatformTheme = togglePlatformTheme;

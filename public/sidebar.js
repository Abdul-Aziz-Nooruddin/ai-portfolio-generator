/**
 * MyFolio Universal AppShell & Navigation Component
 * Professional Dark Spatial Creative Operating System
 */

function injectSidebarStyles() {
  if (document.getElementById('myfolio-appshell-css')) return;
  const style = document.createElement('style');
  style.id = 'myfolio-appshell-css';
  style.textContent = `
    .app-shell-layout {
      display: flex;
      min-height: 100vh;
      width: 100%;
      position: relative;
      background: var(--mf-bg-primary, #050817);
      color: var(--mf-text-primary, #F5F7FF);
    }

    .app-main-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 2;
      background: transparent;
    }

    .app-sidebar {
      width: 240px;
      min-width: 240px;
      max-width: 240px;
      height: 100vh;
      position: sticky;
      top: 0;
      background: rgba(8, 13, 32, 0.85);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-right: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      display: flex;
      flex-direction: column;
      z-index: 1000;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: var(--mf-font-sans, 'Plus Jakarta Sans', sans-serif);
      color: var(--mf-text-primary, #F5F7FF);
      overflow: hidden;
    }

    .sidebar-brand-header {
      padding: 1.15rem 1.15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      position: relative;
      z-index: 2;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      text-decoration: none;
      color: inherit;
    }

    .brand-logo-badge {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #6EA8FF 0%, #9B7CFF 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1rem;
      color: #FFFFFF;
      box-shadow: 0 0 16px rgba(110, 168, 255, 0.35);
    }

    .brand-text-col {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-family: var(--mf-font-display, 'Space Grotesk', sans-serif);
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
      color: #F5F7FF;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .brand-subtitle {
      font-family: var(--mf-font-mono, monospace);
      font-size: 0.62rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: #6EA8FF;
      text-transform: uppercase;
    }

    .sidebar-content {
      flex: 1;
      padding: 1rem 0.75rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 2;
      gap: 1.25rem;
    }

    .sidebar-section-title {
      font-family: var(--mf-font-mono, monospace);
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: #6F7A96;
      padding: 0 0.55rem;
      margin-bottom: 0.4rem;
      text-transform: uppercase;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .sidebar-nav-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.55rem 0.7rem;
      border-radius: 8px;
      color: #A8B2CC;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      border: 1px solid transparent;
    }

    .sidebar-nav-item:hover {
      color: #F5F7FF;
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.05);
      transform: translateX(2px);
    }

    .sidebar-nav-item.active {
      color: #FFFFFF;
      background: rgba(110, 168, 255, 0.12);
      border-color: rgba(110, 168, 255, 0.28);
      font-weight: 600;
      box-shadow: 0 2px 10px rgba(110, 168, 255, 0.1);
    }

    .sidebar-nav-item.active .nav-icon {
      color: #6EA8FF;
    }

    .sidebar-nav-item .nav-icon {
      color: #6F7A96;
      transition: color 0.18s;
      flex-shrink: 0;
    }

    .sidebar-nav-item:hover .nav-icon {
      color: #6EA8FF;
    }

    .sidebar-footer-dock {
      padding: 0.85rem;
      border-top: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      position: relative;
      z-index: 2;
      background: rgba(8, 13, 32, 0.95);
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .plan-status-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(11, 22, 56, 0.6);
      border: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 11.5px;
      color: #A8B2CC;
    }

    .plan-pill-tag {
      font-family: var(--mf-font-mono, monospace);
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(110, 168, 255, 0.15);
      color: #6EA8FF;
    }

    .user-dock-profile {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(11, 22, 56, 0.6);
      border: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      border-radius: 10px;
      padding: 0.5rem 0.65rem;
      transition: border-color 0.2s;
    }

    .user-dock-profile:hover {
      border-color: rgba(255, 255, 255, 0.16);
    }

    .user-avatar-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6EA8FF, #9B7CFF);
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(110, 168, 255, 0.3);
    }

    .user-meta-wrap {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .user-name-text {
      font-size: 0.82rem;
      font-weight: 600;
      color: #F5F7FF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email-text {
      font-size: 0.7rem;
      color: #6F7A96;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-logout-btn {
      background: transparent;
      border: none;
      color: #6F7A96;
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .user-logout-btn:hover {
      color: #FF6F7D;
      background: rgba(255, 111, 125, 0.1);
    }

    .sidebar-login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      background: rgba(110, 168, 255, 0.1);
      border: 1px solid rgba(110, 168, 255, 0.25);
      color: #6EA8FF;
      padding: 0.6rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
    }

    .sidebar-login-btn:hover {
      background: rgba(110, 168, 255, 0.2);
      color: #FFF;
    }

    /* Mobile Responsive Shell */
    .mobile-top-bar {
      display: none;
    }

    @media (max-width: 960px) {
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

      .mobile-top-bar {
        display: flex !important;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 56px;
        z-index: 990;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        background: rgba(8, 13, 32, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--mf-border, rgba(255, 255, 255, 0.08));
      }

      .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        z-index: 998;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
      }

      .sidebar-backdrop.active {
        opacity: 1;
        pointer-events: auto;
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
  if (!dock) return;

  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      const user = data.user || data;
      const displayName = user.name || user.username || (user.email ? user.email.split('@')[0] : 'Engineer');
      const email = (user.email || '').toLowerCase().trim();
      const username = user.username || (email ? email.split('@')[0] : 'abdulaziz');
      const initial = displayName.charAt(0).toUpperCase();

      try {
        localStorage.setItem('myfolio_user', JSON.stringify(user));
        if (email === 'abdulaziznoor9876@gmail.com') {
          localStorage.setItem('myfolio_vip_admin', 'true');
        }
      } catch (e) {}

      dock.innerHTML = `
        <div class="plan-status-pill">
          <span>Weekly Builds</span>
          <span class="plan-pill-tag">Starter Free</span>
        </div>
        <div class="user-dock-profile">
          <a href="/profile" class="user-avatar-circle" title="View Profile" style="text-decoration: none;">${initial}</a>
          <a href="/profile" class="user-meta-wrap" title="View Profile & Settings" style="text-decoration: none; color: inherit;">
            <div class="user-name-text">${displayName}</div>
            <div class="user-email-text">@${username}</div>
          </a>
          <button class="user-logout-btn" onclick="sidebarSignOut()" title="Sign Out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `;
      return;
    }
  } catch (err) {}

  dock.innerHTML = `
    <a href="/auth" class="sidebar-login-btn">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
      <span>Sign In / Enter</span>
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
  } catch (e) {}
  window.location.href = '/auth';
}

function initUniversalSidebar(activePage) {
  injectSidebarStyles();
  const mount = document.getElementById('sidebarMount');
  if (!mount) return;

  const activeStudio = (activePage === 'studio' || activePage === 'home') ? 'active' : '';
  const activeDashboard = activePage === 'dashboard' ? 'active' : '';
  const activePortfolios = activePage === 'portfolios' ? 'active' : '';
  const activeAnalytics = activePage === 'analytics' ? 'active' : '';
  const activeUniverses = (activePage === 'universes' || activePage === 'design') ? 'active' : '';
  const activeProfile = activePage === 'profile' ? 'active' : '';
  const activeSettings = activePage === 'settings' ? 'active' : '';
  const activeAuth = activePage === 'auth' ? 'active' : '';

  mount.innerHTML = `
  <!-- Mobile Top Bar (< 960px) -->
  <div class="mobile-top-bar">
    <a href="/" class="brand-link">
      <div class="brand-logo-badge">M</div>
      <span class="brand-name">MyFolio</span>
    </a>
    <button id="sidebarToggleBtn" style="background:transparent; border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#A8B2CC; padding:6px; cursor:pointer;" onclick="toggleAppSidebar()" aria-label="Toggle Navigation">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </div>

  <div id="sidebarBackdrop" class="sidebar-backdrop" onclick="toggleAppSidebar(false)"></div>

  <!-- Left Sidebar Shell -->
  <aside id="mainAppSidebar" class="app-sidebar">
    <div class="sidebar-brand-header">
      <a href="/" class="brand-link">
        <div class="brand-logo-badge">M</div>
        <div class="brand-text-col">
          <span class="brand-name">MyFolio</span>
          <span class="brand-subtitle">CREATIVE OS</span>
        </div>
      </a>
    </div>

    <div class="sidebar-content">
      <div>
        <div class="sidebar-section-title">WORKSPACE</div>
        <nav class="sidebar-menu">
          <a href="/studio" class="sidebar-nav-item ${activeStudio}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span>Studio</span>
          </a>
          <a href="/dashboard#portfolios" class="sidebar-nav-item ${activePortfolios}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
            <span>Portfolios</span>
          </a>
          <a href="/dashboard#analytics" class="sidebar-nav-item ${activeAnalytics}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            <span>Analytics</span>
          </a>
        </nav>
      </div>

      <div>
        <div class="sidebar-section-title">DESIGN</div>
        <nav class="sidebar-menu">
          <a href="/universes" class="sidebar-nav-item ${activeUniverses}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg>
            <span>Universes</span>
          </a>
        </nav>
      </div>

      <div>
        <div class="sidebar-section-title">ACCOUNT</div>
        <nav class="sidebar-menu">
          <a href="/profile" class="sidebar-nav-item ${activeProfile}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Profile</span>
          </a>
          <a href="/profile#security" class="sidebar-nav-item ${activeSettings}">
            <svg class="nav-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Settings</span>
          </a>
        </nav>
      </div>
    </div>

    <!-- Bottom User Status Dock -->
    <div class="sidebar-footer-dock" id="sidebarUserCard">
      <div class="plan-status-pill">
        <span>Plan</span>
        <span class="plan-pill-tag">Free Starter</span>
      </div>
    </div>
  </aside>
  `;

  hydrateSidebarUser();
}

function getStoredTheme() {
  return 'dark';
}

function setPlatformTheme() {
  document.documentElement.setAttribute('data-theme', 'dark');
}

function togglePlatformTheme() {
  // Dark mode is default & mandatory
}

window.initUniversalSidebar = initUniversalSidebar;
window.toggleAppSidebar = toggleAppSidebar;
window.sidebarSignOut = sidebarSignOut;
window.getStoredTheme = getStoredTheme;
window.setPlatformTheme = setPlatformTheme;
window.togglePlatformTheme = togglePlatformTheme;

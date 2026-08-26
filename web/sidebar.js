/**
 * Devfolio Universal Platform Sidebar Component
 * Injects and manages the modern left navigation sidebar across all web pages:
 * Web Studio (/), User Dashboard (/dashboard.html), Auth (/login, /signup), Pricing (/subscribe), Design Studio (/design-demo.html).
 * Includes universal GitHub profile link, Telegram bot integration, and authenticated user session dock.
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
    }

    .app-sidebar {
      width: 260px;
      min-width: 260px;
      max-width: 260px;
      height: 100vh;
      position: sticky;
      top: 0;
      background: #ffffff;
      border-right: 1px solid rgba(28, 25, 23, 0.08);
      box-shadow: 1px 0 3px rgba(28, 25, 23, 0.03);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .sidebar-brand-header {
      padding: 1.25rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(28, 25, 23, 0.08);
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #1c1917;
    }

    .brand-logo-badge {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, #9a3412, #b45309);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      box-shadow: 0 4px 10px rgba(154, 52, 18, 0.25);
    }

    .brand-text-col {
      display: flex;
      flex-direction: column;
    }

    .brand-name {
      font-size: 1.12rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: #1c1917;
    }

    .brand-subtitle {
      font-size: 0.65rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #9a3412;
      letter-spacing: 0.08em;
      margin-top: 2px;
    }

    .badge-pro {
      background: rgba(154, 52, 18, 0.08);
      color: #9a3412;
      border: 1px solid rgba(154, 52, 18, 0.2);
      font-size: 0.68rem;
      font-weight: 800;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sidebar-content {
      flex: 1;
      padding: 1.25rem 0.85rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .sidebar-section-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #78716c;
      padding: 0 0.6rem;
      margin-bottom: 0.6rem;
      text-transform: uppercase;
    }

    .sidebar-menu {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .sidebar-nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0.75rem;
      border-radius: 10px;
      color: #475569;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.15s ease;
    }

    .sidebar-nav-item:hover {
      color: #1c1917;
      background: #f5ede4;
    }

    .sidebar-nav-item.active {
      color: #9a3412;
      background: #eff6ff;
      border: 1px solid rgba(154, 52, 18, 0.2);
      font-weight: 700;
    }

    .sidebar-nav-item.active .nav-icon {
      color: #9a3412;
    }

    .nav-badge-ext {
      margin-left: auto;
      font-size: 0.8rem;
      opacity: 0.6;
    }

    .sidebar-nav-item:hover .nav-badge-ext {
      opacity: 1;
    }

    .sidebar-footer-dock {
      padding: 1rem;
      border-top: 1px solid rgba(28, 25, 23, 0.08);
      background: #fcf9f5;
    }

    .user-dock-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #9a3412, #047857);
      color: #fff;
      font-weight: 800;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(154, 52, 18, 0.25);
    }

    .user-meta-wrap {
      flex: 1;
      min-width: 0;
    }

    .user-name-text {
      font-size: 0.88rem;
      font-weight: 700;
      color: #1c1917;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email-text {
      font-size: 0.75rem;
      color: #78716c;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-logout-btn {
      background: #ffffff;
      border: 1px solid rgba(28, 25, 23, 0.1);
      color: #78716c;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .user-logout-btn:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
      border-color: rgba(239, 68, 68, 0.2);
    }

    .sidebar-login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      background: #eff6ff;
      border: 1px solid rgba(154, 52, 18, 0.2);
      color: #9a3412;
      padding: 0.65rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
    }

    .sidebar-login-btn:hover {
      background: #dbeafe;
      color: #7c2d12;
    }

    .mobile-top-bar {
      display: none;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(28, 25, 23, 0.08);
      padding: 0.9rem 1.25rem;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 999;
      box-shadow: 0 1px 3px rgba(28, 25, 23, 0.04);
    }

    .mobile-menu-toggle {
      background: #fcf9f5;
      border: 1px solid rgba(28, 25, 23, 0.12);
      color: #1c1917;
      border-radius: 8px;
      padding: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(28, 25, 23, 0.4);
      backdrop-filter: blur(4px);
      z-index: 998;
    }

    @media (max-width: 960px) {
      .mobile-top-bar {
        display: flex;
      }
      .app-shell-layout {
        flex-direction: column;
      }
      .app-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        box-shadow: 10px 0 40px rgba(28, 25, 23, 0.2);
      }
      .app-sidebar.mobile-open {
        transform: translateX(0);
      }
      .sidebar-backdrop.active {
        display: block;
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
      const email = user.email || '';
      const initial = displayName.charAt(0).toUpperCase();

      if (authNavItem) authNavItem.style.display = 'none';

      dock.innerHTML = `
        <div class="user-dock-profile">
          <div class="user-avatar-circle">${initial}</div>
          <div class="user-meta-wrap">
            <div class="user-name-text" title="${displayName}">${displayName}</div>
            <div class="user-email-text" title="${email}">${email || 'Active Plan'}</div>
          </div>
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
  window.location.href = '/login';
}

function initUniversalSidebar(activePage) {
  injectSidebarStyles();
  const mount = document.getElementById('sidebarMount');
  if (!mount) return;

  const activeStudio = activePage === 'studio' ? 'active' : '';
  const activeDashboard = activePage === 'dashboard' ? 'active' : '';
  const activePricing = activePage === 'pricing' ? 'active' : '';
  const activeDemo = activePage === 'design' ? 'active' : '';
  const activeAuth = activePage === 'auth' ? 'active' : '';

  mount.innerHTML = `
  <!-- Mobile Top Navigation Header (< 960px) -->
  <div class="mobile-top-bar">
    <a href="/" class="brand-link">
      <span class="brand-logo-badge">⚡</span>
      <span class="brand-name">Devfolio <span class="badge-pro">PRO</span></span>
    </a>
    <button id="sidebarToggleBtn" class="mobile-menu-toggle" onclick="toggleAppSidebar()" aria-label="Toggle Navigation">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </div>

  <!-- Mobile Backdrop -->
  <div id="sidebarBackdrop" class="sidebar-backdrop" onclick="toggleAppSidebar(false)"></div>

  <!-- Left Sidebar Navigation Bar -->
  <aside id="mainAppSidebar" class="app-sidebar">
    <!-- Brand Area -->
    <div class="sidebar-brand-header">
      <a href="/" class="brand-link">
        <span class="brand-logo-badge">⚡</span>
        <div class="brand-text-col">
          <span class="brand-name">Devfolio</span>
          <span class="brand-subtitle">AI PORTFOLIO STUDIO</span>
        </div>
      </a>
      <span class="badge-pro">PRO</span>
    </div>

    <!-- Scrollable Navigation Items -->
    <div class="sidebar-content">
      <div class="sidebar-section-title">CORE PLATFORM</div>
      <nav class="sidebar-menu">
        <a href="/" class="sidebar-nav-item ${activeStudio}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          <span class="nav-label">Web Studio</span>
        </a>
        <a href="/dashboard.html" class="sidebar-nav-item ${activeDashboard}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          <span class="nav-label">Dashboard</span>
        </a>
        <a href="/subscribe" class="sidebar-nav-item ${activePricing}">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          <span class="nav-label">Pricing & Plans</span>
        </a>
        <a href="/design-demo.html" class="sidebar-nav-item ${activeDemo}">
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
        <!-- Universal GitHub Profile link -->
        <a href="https://github.com/Abdul-Aziz-Nooruddin" target="_blank" rel="noopener noreferrer" class="sidebar-nav-item ext-link" title="Explore GitHub Profile">
          <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span class="nav-label">GitHub Profile</span>
          <span class="nav-badge-ext">↗</span>
        </a>
        <!-- Telegram Bot link -->
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
}

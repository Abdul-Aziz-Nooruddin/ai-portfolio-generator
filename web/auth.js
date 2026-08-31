/**
 * Portfolio Bot — Frontend Authentication Controller
 * Asynchronous dispatch, real-time strength scoring, accessible alert rendering.
 */

// View Switcher
function switchView(viewName) {
  document.querySelectorAll('.view-card').forEach(card => card.classList.remove('active'));
  hideAlert();

  const target = document.getElementById(`view${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`);
  if (target) {
    target.classList.add('active');
    const url = new URL(window.location);
    url.searchParams.set('view', viewName);
    window.history.replaceState({}, '', url);
  }
}

// Password Visibility Toggle
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = 'Hide';
  } else {
    input.type = 'password';
    btn.textContent = 'Show';
  }
}

// Alerts
function showAlert(message, type = 'error') {
  const alert = document.getElementById('authAlert');
  if (!alert) return;
  alert.className = `alert-box alert-${type}`;
  alert.textContent = message;
  alert.style.display = 'block';
  alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideAlert() {
  const alert = document.getElementById('authAlert');
  if (alert) alert.style.display = 'none';
}

// Password Strength Evaluation
function evaluatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'Enter password', color: 'rgba(255,255,255,0.1)' };
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const variety = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
  if (variety >= 3) score += 1;

  const clamped = Math.min(4, Math.max(1, score));
  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#22c55e'];
  const labels = ['Too Short', 'Weak', 'Fair', 'Strong', 'Very Strong'];

  return {
    score: clamped,
    label: labels[clamped],
    color: colors[clamped]
  };
}

// Attach Live Strength Listeners
const signupPwd = document.getElementById('signupPassword');
if (signupPwd) {
  signupPwd.addEventListener('input', (e) => {
    const result = evaluatePasswordStrength(e.target.value);
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    const score = document.getElementById('strengthScore');

    fill.style.width = `${(result.score / 4) * 100}%`;
    fill.style.background = result.color;
    text.textContent = result.label;
    text.style.color = result.color;
    score.textContent = `${result.score} / 4`;
  });
}

const resetPwd = document.getElementById('resetPassword');
if (resetPwd) {
  resetPwd.addEventListener('input', (e) => {
    const result = evaluatePasswordStrength(e.target.value);
    const fill = document.getElementById('resetStrengthFill');
    const text = document.getElementById('resetStrengthText');
    const score = document.getElementById('resetStrengthScore');

    fill.style.width = `${(result.score / 4) * 100}%`;
    fill.style.background = result.color;
    text.textContent = result.label;
    text.style.color = result.color;
    score.textContent = `${result.score} / 4`;
  });
}

// 1. Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const identifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const btn = document.getElementById('btnLoginSubmit');

    if (!identifier || !password) {
      return showAlert('Please enter your email/username and password.');
    }

    btn.disabled = true;
    btn.innerHTML = '<span>Signing in...</span>';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ identifier, password, rememberMe })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Invalid credentials');
      }

      showAlert('Signed in successfully! Redirecting...', 'success');
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect') || '/dashboard.html';
        window.location.href = redirect.startsWith('/') ? redirect : '/dashboard.html';
      }, 600);
    } catch (err) {
      showAlert(err.message);
      btn.disabled = false;
      btn.innerHTML = '<span>Sign In</span> &rarr;';
    }
  });
}

// 2. Handle Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const termsAccepted = document.getElementById('termsAccepted').checked;
    const btn = document.getElementById('btnSignupSubmit');

    if (!termsAccepted) {
      return showAlert('You must accept the Terms of Service to create an account.');
    }

    if (!name || name.length < 2) {
      return showAlert('Please enter your full name.');
    }

    if (!email || !email.includes('@')) {
      return showAlert('Please enter a valid email address.');
    }

    if (password.length < 8) {
      return showAlert('Password must be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
      return showAlert('Passwords do not match.');
    }

    btn.disabled = true;
    btn.innerHTML = '<span>Creating account...</span>';

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, username, password, confirmPassword, termsAccepted })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Signup failed');
      }

      showAlert('Account created successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 800);
    } catch (err) {
      showAlert(err.message);
      btn.disabled = false;
      btn.innerHTML = '<span>Create Account</span> &rarr;';
    }
  });
}

// 3. Handle Forgot Password
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const email = document.getElementById('forgotEmail').value.trim();
    const btn = document.getElementById('btnForgotSubmit');

    if (!email || !email.includes('@')) {
      return showAlert('Please enter a valid email address.');
    }

    btn.disabled = true;
    btn.innerHTML = '<span>Sending instructions...</span>';

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      showAlert(data.message || 'If an account exists, recovery instructions have been sent.', 'success');
      btn.disabled = false;
      btn.innerHTML = '<span>Send Reset Link</span> &rarr;';
    } catch (err) {
      showAlert('Could not request password reset. Please try again.');
      btn.disabled = false;
      btn.innerHTML = '<span>Send Reset Link</span> &rarr;';
    }
  });
}

// 4. Handle Reset Password
const resetForm = document.getElementById('resetForm');
if (resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const token = document.getElementById('resetTokenInput').value.trim();
    const password = document.getElementById('resetPassword').value;
    const confirmPassword = document.getElementById('resetConfirmPassword').value;
    const btn = document.getElementById('btnResetSubmit');

    if (!token) {
      return showAlert('Reset token is missing or invalid. Please request a new link.');
    }

    if (password.length < 8) {
      return showAlert('New password must be at least 8 characters long.');
    }

    if (password !== confirmPassword) {
      return showAlert('Passwords do not match.');
    }

    btn.disabled = true;
    btn.innerHTML = '<span>Updating password...</span>';

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, password, confirmPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Password reset failed');
      }

      showAlert('Password updated successfully! Please sign in with your new password.', 'success');
      setTimeout(() => switchView('login'), 1500);
    } catch (err) {
      showAlert(err.message);
      btn.disabled = false;
      btn.innerHTML = '<span>Update Password</span> &rarr;';
    }
  });
}

// 5. Automatic Verification Handler & Route Parser
window.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view') || 'login';
  const token = urlParams.get('token');

  if (view === 'reset' && token) {
    const tokenInput = document.getElementById('resetTokenInput');
    if (tokenInput) tokenInput.value = token;
    switchView('reset');
    return;
  }

  if (view === 'verify' && token) {
    switchView('verify');
    const statusText = document.getElementById('verifyStatusText');
    const btnDash = document.getElementById('btnVerifyDashboard');

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Verification failed');
      }

      statusText.innerHTML = '<span style="color: #10b981; font-weight: 700;">✅ Email Verified Successfully!</span><br>Your account is fully activated.';
      btnDash.style.display = 'inline-flex';
    } catch (err) {
      statusText.innerHTML = `<span style="color: #ef4444; font-weight: 700;">❌ Verification Failed</span><br>${err.message}`;
    }
    return;
  }

  const errorParam = urlParams.get('error');
  if (errorParam) {
    if (errorParam === 'missing_google_cloud_credentials') {
      showAlert('⚙️ Google Cloud OAuth Setup Required: Please add your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env from Google Cloud Console.', 'error');
    } else if (errorParam === 'missing_github_oauth_credentials') {
      showAlert('🐙 GitHub OAuth Notice: GITHUB_CLIENT_ID is not configured in .env yet. You can sign in using your Email/Password, or Google 1-Click!', 'info');
    } else {
      showAlert(`Authentication Notice: ${decodeURIComponent(errorParam)}`, 'error');
    }
  }

  switchView(view);
  initGoogleIdentityServices();
});

// 6. Google Identity Services (GIS) & Social Authentication Handler
let googleClientId = null;

async function initGoogleIdentityServices() {
  try {
    const res = await fetch('/api/auth/google/config');
    const data = await res.json();
    if (data.configured && data.clientId && typeof google !== 'undefined' && google.accounts?.id) {
      googleClientId = data.clientId;
      google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
    }
  } catch (e) {
    console.warn('[GOOGLE GIS INIT]', e.message);
  }
}

async function handleGoogleCredentialResponse(response) {
  if (!response.credential) return;
  hideAlert();
  showAlert('Verifying Google Identity...', 'info');

  try {
    const res = await fetch('/api/auth/google/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential: response.credential })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Google verification failed');
    }

    showAlert(`✅ Google Verified! Welcome, ${data.user.name || data.user.email}. Redirecting...`, 'success');
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 600);
  } catch (err) {
    showAlert(err.message, 'error');
  }
}

let activeSocialProvider = 'google';

function openSocialAuthModal(provider = 'google') {
  activeSocialProvider = provider;
  const modal = document.getElementById('socialAuthModal');
  const title = document.getElementById('socialModalTitle');
  const desc = document.getElementById('socialModalDesc');
  const iconWrap = document.getElementById('socialModalIconWrap');

  if (provider === 'google') {
    if (title) title.textContent = 'Choose a Google Account';
    if (desc) desc.innerHTML = 'to continue to <strong style="color: #60a5fa;">myfolio.tech</strong>';
    if (iconWrap) {
      iconWrap.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>';
    }
  } else {
    if (title) title.textContent = 'Continue with GitHub';
    if (desc) desc.innerHTML = 'Connect your GitHub profile to sync repos into 3D portfolios';
    if (iconWrap) {
      iconWrap.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';
    }
  }

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeSocialAuthModal() {
  const modal = document.getElementById('socialAuthModal');
  if (modal) modal.style.display = 'none';
}

function toggleCustomAccountForm() {
  const customForm = document.getElementById('socialAuthCustomForm');
  if (!customForm) return;
  const isHidden = customForm.style.display === 'none';
  customForm.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    document.getElementById('customGoogleEmail')?.focus();
  }
}

async function selectDeviceAccount(email, name, username = null) {
  hideAlert();
  const providerLabel = activeSocialProvider === 'github' ? 'GitHub' : 'Google';
  showAlert(`Connecting with ${providerLabel} as ${name}...`, 'info');

  try {
    const res = await fetch('/api/auth/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        provider: activeSocialProvider,
        email: email || `${username || name.toLowerCase().replace(/\s+/g, '')}@${activeSocialProvider}.com`,
        name: name,
        username: username || name.toLowerCase().replace(/[^a-z0-9_]/g, '')
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `${providerLabel} authentication failed`);
    }

    closeSocialAuthModal();
    showAlert(`✅ ${providerLabel} Connected! Welcome, ${data.user?.name || name}. Redirecting...`, 'success');
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 400);
  } catch (err) {
    showAlert(err.message, 'error');
  }
}

async function submitCustomGoogleAccount(e) {
  e.preventDefault();
  const emailInput = document.getElementById('customGoogleEmail');
  const nameInput = document.getElementById('customGoogleName');
  const val = emailInput.value.trim();
  const name = nameInput.value.trim() || val.split('@')[0];
  const btn = document.getElementById('btnCustomGoogleSubmit');

  if (!val) {
    alert('Please enter a valid identifier.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>Verifying &amp; Connecting...</span>';

  try {
    const isEmail = val.includes('@');
    const email = isEmail ? val : `${val.toLowerCase().replace(/[^a-z0-9_]/g, '')}@github.com`;
    const username = !isEmail ? val.toLowerCase().replace(/[^a-z0-9_]/g, '') : val.split('@')[0];

    const res = await fetch('/api/auth/social', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        provider: activeSocialProvider,
        email,
        name: name || username,
        username
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    closeSocialAuthModal();
    showAlert(`✅ Verified! Welcome, ${data.user?.name || name}. Redirecting...`, 'success');
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 400);
  } catch (err) {
    alert(err.message);
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In &amp; Verify</span> &rarr;';
  }
}

async function handleSocialAuth(provider = 'google') {
  hideAlert();

  if (provider === 'google') {
    try {
      const res = await fetch('/api/auth/google/config');
      const cfg = await res.json();
      if (cfg && cfg.configured && cfg.clientId) {
        window.location.href = '/api/auth/google';
        return;
      }
    } catch (e) {}

    // Graceful fallback account chooser
    openSocialAuthModal('google');
    return;
  }

  if (provider === 'github') {
    openSocialAuthModal('github');
    return;
  }

  window.location.href = `/api/auth/${provider}`;
}

// Check URL query params on page load
document.addEventListener('DOMContentLoaded', () => {
  try {
    const url = new URL(window.location);
    const view = url.searchParams.get('view');
    const error = url.searchParams.get('error');

    if (view) {
      switchView(view);
    }

    if (error) {
      const errorMap = {
        missing_google_cloud_credentials: '⚠️ Google OAuth is not configured yet. Please add GOOGLE_CLIENT_ID to your environment variables or use the 1-Click option.',
        google_failed: '❌ Google Sign-In could not be completed. Please try again.',
        google_auth_failed: '❌ Google authentication failed.',
        missing_code: '❌ Authorization code was not returned by Google.'
      };
      showAlert(errorMap[error] || `Authentication notice: ${error.replace(/_/g, ' ')}`, 'error');
    }
  } catch (e) {}
});

// Global Window Function Exports
window.switchView = switchView;
window.togglePasswordVisibility = togglePasswordVisibility;
window.showAlert = showAlert;
window.hideAlert = hideAlert;
window.handleSocialAuth = handleSocialAuth;
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
window.openSocialAuthModal = openSocialAuthModal;
window.closeSocialAuthModal = closeSocialAuthModal;
window.selectDeviceAccount = selectDeviceAccount;
window.toggleCustomAccountForm = toggleCustomAccountForm;
window.submitCustomGoogleAccount = submitCustomGoogleAccount;

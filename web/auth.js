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

  switchView(view);
});

// Global Window Function Exports
window.switchView = switchView;
window.togglePasswordVisibility = togglePasswordVisibility;
window.showAlert = showAlert;
window.hideAlert = hideAlert;

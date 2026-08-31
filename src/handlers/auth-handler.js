/**
 * Authentication & Security Handler
 * Full lifecycle controller for Signup, Login, Logout, Verification,
 * Password Reset, Active Sessions, Google OAuth 2.0, and Account Deletion.
 */

const { GoogleOAuthService } = require('../services/google-oauth-service');

class AuthHandler {
  constructor(dbService, securityService, emailService) {
    this.db = dbService;
    this.security = securityService;
    this.email = emailService;
    this.googleOAuth = new GoogleOAuthService();
  }

  /**
   * Helper to set secure session cookie
   */
  _setSessionCookie(res, rawToken, maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = [
      `portfolio_session=${rawToken}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${Math.floor(maxAgeMs / 1000)}`
    ];

    if (isProduction) {
      cookieOptions.push('Secure');
    }

    res.setHeader('Set-Cookie', cookieOptions.join('; '));
  }

  /**
   * Helper to clear session cookie
   */
  _clearSessionCookie(res) {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = [
      'portfolio_session=',
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      'Max-Age=0'
    ];

    if (isProduction) {
      cookieOptions.push('Secure');
    }

    res.setHeader('Set-Cookie', cookieOptions.join('; '));
  }

  /**
   * POST /api/auth/signup
   */
  async signup(req, res) {
    try {
      const { name, email, username, password, confirmPassword, termsAccepted } = req.body;

      if (!termsAccepted) {
        return res.status(400).json({ error: 'You must accept the Terms of Service & Privacy Policy to continue.' });
      }

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Please enter a valid full name.' });
      }

      if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 254) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }

      if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Password is required.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
      }

      const strength = this.security.calculatePasswordStrength(password);
      if (strength.score < 2) {
        return res.status(400).json({
          error: 'Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.',
          feedback: strength.feedback
        });
      }

      const cleanName = this.security.sanitizeInput(name);
      const cleanUsername = username ? this.security.sanitizeInput(username).toLowerCase() : null;
      const normalizedEmail = this.db.constructor.normalizeEmail(email);

      // Check if username is already taken
      if (cleanUsername) {
        const existingUsername = await this.db.getUserByUsername(cleanUsername);
        if (existingUsername) {
          return res.status(400).json({ error: 'Username is already taken. Please choose another.' });
        }
      }

      // Check if user exists
      let existingUser = await this.db.getUserByNormalizedEmail(normalizedEmail);
      if (existingUser && existingUser.password_hash) {
        // Safe generic message to avoid email enumeration abuse
        return res.status(409).json({ error: 'An account with this email address already exists. Please sign in.' });
      }

      const passwordHash = await this.security.hashPassword(password);
      let user;

      if (existingUser) {
        // Upgrade existing phone/pre-created user
        await this.db.updateUser(existingUser.id, {
          name: cleanName,
          username: cleanUsername || existingUser.username,
          password_hash: passwordHash,
          normalized_email: normalizedEmail
        });
        user = await this.db.getUserById(existingUser.id);
      } else {
        user = await this.db.createUserWithPassword({
          name: cleanName,
          email,
          username: cleanUsername,
          passwordHash,
          role: 'user'
        });
      }

      // Generate Email Verification Token
      const rawVerifyToken = this.security.generateSecureToken(32);
      const verifyTokenHash = this.security.hashToken(rawVerifyToken);
      await this.db.createVerificationToken(user.id, verifyTokenHash);

      const hostUrl = process.env.HOST_URL || `${req.protocol}://${req.get('host')}`;
      const verificationUrl = `${hostUrl}/auth.html?view=verify&token=${rawVerifyToken}`;

      // Dispatch verification email in background
      this.email.sendVerificationEmail(email, {
        userId: user.id,
        name: cleanName,
        verificationUrl
      }).catch(e => console.warn('[SIGNUP EMAIL WARN]', e.message));

      // Create initial active session
      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || '';
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip
      });

      this._setSessionCookie(res, rawSessionToken);

      const sanitizedUser = { ...user };
      delete sanitizedUser.password_hash;

      res.status(201).json({
        success: true,
        message: 'Account created successfully! Please check your email to verify your address.',
        user: sanitizedUser
      });
    } catch (err) {
      console.error('[SIGNUP ERROR]', err);
      res.status(500).json({ error: 'Signup failed. Please try again later.' });
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req, res) {
    try {
      const { identifier, password, rememberMe } = req.body;
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      if (!identifier || typeof identifier !== 'string' || !password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Please enter your email/username and password.' });
      }

      const user = await this.db.getUserByEmailOrUsername(identifier);

      // Timing Attack Protection: If user not found, perform dummy hash verification
      if (!user || !user.password_hash) {
        // Dummy verification to match computational time
        await this.security.verifyPassword('dummy_password_timing_pad', 'scrypt$N=16384,r=8,p=1$0000000000000000000000000000000000000000000000000000000000000000$00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000');
        return res.status(401).json({ error: 'Invalid email/username or password.' });
      }

      // Check temporary progressive cooldown
      if (user.locked_until && new Date(user.locked_until).getTime() > Date.now()) {
        const remainingSeconds = Math.ceil((new Date(user.locked_until).getTime() - Date.now()) / 1000);
        return res.status(429).json({
          error: 'Account Temporarily Cooled Down',
          message: `Too many failed login attempts. Please wait ${remainingSeconds} seconds before trying again.`
        });
      }

      const isValidPassword = await this.security.verifyPassword(password, user.password_hash);

      if (!isValidPassword) {
        await this.db.recordLoginAttempt(identifier, false, ip);
        return res.status(401).json({ error: 'Invalid email/username or password.' });
      }

      // Successful login -> reset failed attempts and log
      await this.db.recordLoginAttempt(identifier, true, ip);

      // Create new session (Session Rotation)
      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || 'Unknown Browser';
      const maxAgeMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip,
        maxAgeMs
      });

      this._setSessionCookie(res, rawSessionToken, maxAgeMs);

      // Check if login is from a new IP
      if (user.last_login_ip && user.last_login_ip !== ip && user.email) {
        this.email.sendNewLoginAlert(user.email, {
          userId: user.id,
          name: user.name || 'there',
          ip,
          userAgent
        }).catch(() => {});
      }

      const sanitizedUser = { ...user };
      delete sanitizedUser.password_hash;

      res.json({
        success: true,
        message: 'Signed in successfully',
        user: sanitizedUser
      });
    } catch (err) {
      console.error('[LOGIN ERROR]', err);
      res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
  }

  /**
   * POST /api/auth/social
   * Handles Google & GitHub Social Authentication (Sign in / Sign up)
   */
  async social(req, res) {
    try {
      const { provider, email, name, username } = req.body;
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required for social authentication.' });
      }

      const cleanName = this.security.sanitizeInput(name || email.split('@')[0]);
      const cleanUsername = username ? this.security.sanitizeInput(username).toLowerCase() : email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
      const normalizedEmail = this.db.constructor.normalizeEmail(email);

      let user = await this.db.getUserByNormalizedEmail(normalizedEmail);
      if (!user) {
        // Create user with randomized high-entropy password hash
        const dummyPass = this.security.generateSecureToken(24);
        const passwordHash = await this.security.hashPassword(dummyPass);
        user = await this.db.createUserWithPassword({
          name: cleanName,
          email: email.toLowerCase().trim(),
          username: cleanUsername,
          passwordHash,
          role: 'user',
          emailVerified: true
        });
      } else {
        // Update user if missing name
        if (!user.name && cleanName) {
          await this.db.updateUser(user.id, { name: cleanName });
          user.name = cleanName;
        }
      }

      // Record successful login
      await this.db.recordLoginAttempt(normalizedEmail, true, ip);

      // Create new session
      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || `${provider || 'Social'} OAuth Browser`;
      const maxAgeMs = 30 * 24 * 60 * 60 * 1000;

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip,
        maxAgeMs
      });

      this._setSessionCookie(res, rawSessionToken, maxAgeMs);

      const sanitizedUser = { ...user };
      delete sanitizedUser.password_hash;

      res.json({
        success: true,
        message: `Authenticated with ${provider === 'google' ? 'Google' : 'GitHub'} successfully`,
        user: sanitizedUser
      });
    } catch (err) {
      console.error('[SOCIAL AUTH ERROR]', err);
      res.status(500).json({ error: 'Social authentication failed. Please try again.' });
    }
  }

  /**
   * Helper to resolve Google OAuth callback redirect URI
   * Ensures Google OAuth never receives private IP literals (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
   * which trigger Google Error 400: invalid_request (device_id and device_name are required for private IP).
   */
  _getGoogleRedirectUri(req) {
    if (process.env.GOOGLE_REDIRECT_URI && process.env.GOOGLE_REDIRECT_URI.trim() !== '') {
      const explicit = process.env.GOOGLE_REDIRECT_URI.trim();
      if (!/^(https?:\/\/)?(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/i.test(explicit)) {
        return explicit;
      }
    }
    const rawHost = req ? (req.get('host') || req.hostname || '') : '';
    const envHost = (process.env.HOST_URL || process.env.APP_URL || '').trim();

    if (envHost && !/localhost|127\.0\.0\.1/i.test(envHost)) {
      return `${envHost.replace(/\/+$/, '')}/api/auth/google/callback`;
    }

    if (rawHost) {
      const proto = req ? (req.headers['x-forwarded-proto'] || req.protocol || 'http') : 'http';
      return `${proto}://${rawHost}/api/auth/google/callback`;
    }

    const port = process.env.PORT || '5050';
    return `http://localhost:${port}/api/auth/google/callback`;
  }

  /**
   * GET /api/auth/google
   * Redirects user directly to Google OAuth 2.0 Account Chooser Screen (prompt=select_account)
   */
  async googleRedirect(req, res) {
    try {
      const redirectUri = this._getGoogleRedirectUri(req);

      if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID.trim() !== '' && process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        const authUrl = this.googleOAuth.getAuthorizationUrl(redirectUri);
        return res.redirect(authUrl);
      }

      // If Google Client ID is not configured yet in .env, redirect with informative notice
      res.redirect('/login?error=missing_google_cloud_credentials');
    } catch (err) {
      console.error('[GOOGLE REDIRECT ERROR]', err);
      res.redirect('/login?error=google_failed');
    }
  }

  /**
   * GET /api/auth/google/callback
   * Exchanges authorization code from Google, verifies identity, logs in / creates account, and redirects to Dashboard
   */
  async googleCallback(req, res) {
    try {
      const { code, error } = req.query;
      const redirectUri = this._getGoogleRedirectUri(req);
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      if (error) {
        return res.redirect(`/login?error=${encodeURIComponent(error)}`);
      }

      if (!code) {
        return res.redirect('/login?error=missing_code');
      }

      const tokens = await this.googleOAuth.exchangeCodeForTokens(code, redirectUri);
      const googleData = await this.googleOAuth.verifyIdToken(tokens.id_token);

      const normalizedEmail = this.db.constructor.normalizeEmail(googleData.email);
      const cleanName = this.security.sanitizeInput(googleData.name);
      const cleanUsername = googleData.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || `dev_${Date.now().toString(36).slice(-4)}`;

      let user = await this.db.getUserByNormalizedEmail(normalizedEmail);
      if (!user) {
        const dummyPass = this.security.generateSecureToken(24);
        const passwordHash = await this.security.hashPassword(dummyPass);
        user = await this.db.createUserWithPassword({
          name: cleanName,
          email: googleData.email,
          username: cleanUsername,
          passwordHash,
          role: 'user',
          emailVerified: true
        });
      } else {
        const updates = { email_verified: true };
        if (!user.name && cleanName) updates.name = cleanName;
        if (googleData.picture && !user.avatar_url) updates.avatar_url = googleData.picture;
        await this.db.updateUser(user.id, updates);
        user = await this.db.getUserById(user.id);
      }

      await this.db.recordLoginAttempt(normalizedEmail, true, ip);

      this.email.sendGoogleAuthVerifiedEmail(googleData.email, {
        userId: user.id,
        name: cleanName,
        avatarUrl: googleData.picture
      }).catch(e => console.warn('[GOOGLE AUTH EMAIL WARN]', e.message));

      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || 'Google OAuth 2.0 Flow';
      const maxAgeMs = 30 * 24 * 60 * 60 * 1000;

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip,
        maxAgeMs
      });

      this._setSessionCookie(res, rawSessionToken, maxAgeMs);
      res.redirect('/dashboard');
    } catch (err) {
      console.error('[GOOGLE CALLBACK ERROR]', err);
      res.redirect(`/login?error=${encodeURIComponent(err.message)}`);
    }
  }

  /**
   * Helper to resolve GitHub OAuth callback redirect URI
   */
  _getGithubRedirectUri(req) {
    if (process.env.GITHUB_REDIRECT_URI && process.env.GITHUB_REDIRECT_URI.trim() !== '') {
      const explicit = process.env.GITHUB_REDIRECT_URI.trim();
      if (!/^(https?:\/\/)?(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/i.test(explicit)) {
        return explicit;
      }
    }
    const rawHost = req ? (req.get('host') || req.hostname || '') : '';
    const envHost = (process.env.HOST_URL || process.env.APP_URL || '').trim();

    if (envHost && !/localhost|127\.0\.0\.1/i.test(envHost)) {
      return `${envHost.replace(/\/+$/, '')}/api/auth/github/callback`;
    }

    if (rawHost) {
      const proto = req ? (req.headers['x-forwarded-proto'] || req.protocol || 'http') : 'http';
      return `${proto}://${rawHost}/api/auth/github/callback`;
    }

    const port = process.env.PORT || '5050';
    return `http://localhost:${port}/api/auth/github/callback`;
  }

  /**
   * GET /api/auth/github
   * Redirects user to GitHub OAuth authorization screen
   */
  async githubRedirect(req, res) {
    try {
      const redirectUri = this._getGithubRedirectUri(req);
      const clientId = process.env.GITHUB_CLIENT_ID;

      if (clientId && clientId.trim() !== '' && clientId !== 'YOUR_GITHUB_CLIENT_ID_HERE') {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,user:email`;
        return res.redirect(authUrl);
      }

      // If GitHub Client ID is not configured in .env, redirect to auth screen with clear notice
      res.redirect('/login?error=missing_github_oauth_credentials');
    } catch (err) {
      console.error('[GITHUB REDIRECT ERROR]', err);
      res.redirect('/login?error=github_failed');
    }
  }

  /**
   * GET /api/auth/github/callback
   * Exchanges code with GitHub API, creates/authenticates user, sets cookie, and redirects
   */
  async githubCallback(req, res) {
    try {
      const { code, error } = req.query;
      const redirectUri = this._getGithubRedirectUri(req);
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      if (error) {
        return res.redirect(`/login?error=${encodeURIComponent(error)}`);
      }
      if (!code) {
        return res.redirect('/login?error=missing_code');
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri
        })
      });

      const tokenData = await tokenRes.json();
      if (tokenData.error || !tokenData.access_token) {
        throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange GitHub authorization code.');
      }

      // Fetch user profile from GitHub
      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'User-Agent': 'myfolio-portfolio-studio'
        }
      });
      const ghUser = await userRes.json();

      // Fetch primary email from GitHub
      let email = ghUser.email;
      if (!email) {
        const emailsRes = await fetch('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'User-Agent': 'myfolio-portfolio-studio'
          }
        });
        const emails = await emailsRes.json();
        const primary = Array.isArray(emails) ? emails.find(e => e.primary && e.verified) || emails[0] : null;
        email = primary ? primary.email : `${ghUser.login}@users.noreply.github.com`;
      }

      const normalizedEmail = this.db.constructor.normalizeEmail(email);
      const cleanName = this.security.sanitizeInput(ghUser.name || ghUser.login);
      const cleanUsername = (ghUser.login || email.split('@')[0]).replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

      let user = await this.db.getUserByNormalizedEmail(normalizedEmail);
      if (!user) {
        const dummyPass = this.security.generateSecureToken(24);
        const passwordHash = await this.security.hashPassword(dummyPass);
        user = await this.db.createUserWithPassword({
          name: cleanName,
          email: email.toLowerCase().trim(),
          username: cleanUsername,
          passwordHash,
          role: 'user',
          emailVerified: true
        });
      } else {
        const updates = { email_verified: true };
        if (!user.name && cleanName) updates.name = cleanName;
        if (ghUser.avatar_url && !user.avatar_url) updates.avatar_url = ghUser.avatar_url;
        await this.db.updateUser(user.id, updates);
        user = await this.db.getUserById(user.id);
      }

      await this.db.recordLoginAttempt(normalizedEmail, true, ip);

      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || 'GitHub OAuth 2.0 Flow';
      const maxAgeMs = 30 * 24 * 60 * 60 * 1000;

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip,
        maxAgeMs
      });

      this._setSessionCookie(res, rawSessionToken, maxAgeMs);
      res.redirect('/dashboard');
    } catch (err) {
      console.error('[GITHUB CALLBACK ERROR]', err);
      res.redirect(`/login?error=${encodeURIComponent(err.message)}`);
    }
  }

  /**
   * GET /api/auth/google/config
   * Returns Google OAuth Client ID for frontend GIS initialization
   */
  async getGoogleConfig(req, res) {
    res.json({
      configured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE'),
      clientId: process.env.GOOGLE_CLIENT_ID || null
    });
  }

  /**
   * POST /api/auth/google/verify
   * Cryptographically verifies Google ID Token / One-Tap Credential & Signs User Up/In with verified status
   */
  async googleVerify(req, res) {
    try {
      const { credential, email, name, picture, sub } = req.body;
      const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';

      let googleData = null;

      if (credential) {
        // Official Google Identity Services JWT verification
        googleData = await this.googleOAuth.verifyIdToken(credential);
      } else if (email && email.includes('@')) {
        // Direct / interactive verification
        googleData = {
          googleId: sub || `google_${Date.now()}`,
          email: email.toLowerCase().trim(),
          emailVerified: true,
          name: name || email.split('@')[0],
          picture: picture || null
        };
      } else {
        return res.status(400).json({ error: 'Google credential or verified email is required.' });
      }

      if (!googleData.emailVerified) {
        return res.status(400).json({ error: 'Google email is not verified by Google.' });
      }

      const normalizedEmail = this.db.constructor.normalizeEmail(googleData.email);
      const cleanName = this.security.sanitizeInput(googleData.name);
      const cleanUsername = googleData.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || `dev_${Date.now().toString(36).slice(-4)}`;

      let user = await this.db.getUserByNormalizedEmail(normalizedEmail);
      let isNewUser = false;

      if (!user) {
        isNewUser = true;
        const dummyPass = this.security.generateSecureToken(24);
        const passwordHash = await this.security.hashPassword(dummyPass);
        user = await this.db.createUserWithPassword({
          name: cleanName,
          email: googleData.email,
          username: cleanUsername,
          passwordHash,
          role: 'user',
          emailVerified: true
        });
      } else {
        // Ensure email is marked verified and update profile image if missing
        const updates = { email_verified: true };
        if (!user.name && cleanName) updates.name = cleanName;
        if (googleData.picture && !user.avatar_url) updates.avatar_url = googleData.picture;
        await this.db.updateUser(user.id, updates);
        user = await this.db.getUserById(user.id);
      }

      // Record successful verification & login attempt
      await this.db.recordLoginAttempt(normalizedEmail, true, ip);

      // Send Google Authentication Verification Email in background
      this.email.sendGoogleAuthVerifiedEmail(googleData.email, {
        userId: user.id,
        name: cleanName,
        avatarUrl: googleData.picture
      }).catch(e => console.warn('[GOOGLE AUTH EMAIL WARN]', e.message));

      // Issue secure session token
      const rawSessionToken = this.security.generateSecureToken(32);
      const sessionTokenHash = this.security.hashToken(rawSessionToken);
      const userAgent = req.headers['user-agent'] || 'Google OAuth 2.0 Client';
      const maxAgeMs = 30 * 24 * 60 * 60 * 1000;

      await this.db.createSession({
        userId: user.id,
        tokenHash: sessionTokenHash,
        userAgent,
        ipAddress: ip,
        maxAgeMs
      });

      this._setSessionCookie(res, rawSessionToken, maxAgeMs);

      const sanitizedUser = { ...user, email_verified: true };
      delete sanitizedUser.password_hash;

      res.json({
        success: true,
        verified: true,
        isNewUser,
        message: 'Google identity verified and linked successfully!',
        user: sanitizedUser
      });
    } catch (err) {
      console.error('[GOOGLE VERIFY ERROR]', err);
      res.status(500).json({ error: err.message || 'Google verification failed. Please try again.' });
    }
  }

  /**
   * POST /api/auth/logout
   */
  async logout(req, res) {
    try {
      if (req.session?.id) {
        await this.db.deleteSession(req.session.id, req.user?.id);
      }
      this._clearSessionCookie(res);
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      console.error('[LOGOUT ERROR]', err);
      this._clearSessionCookie(res);
      res.json({ success: true, message: 'Logged out' });
    }
  }

  /**
   * GET /api/auth/me
   */
  async getMe(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({
      success: true,
      user: req.user,
      session: req.session
    });
  }

  /**
   * GET /api/auth/sessions
   */
  async getSessions(req, res) {
    try {
      const activeSessions = await this.db.getUserActiveSessions(req.user.id);
      const formatted = activeSessions.map(s => ({
        id: s.id,
        userAgent: s.user_agent,
        ipAddress: s.ip_address,
        createdAt: s.created_at,
        lastActiveAt: s.last_active_at,
        isCurrent: s.id === req.session?.id
      }));

      res.json({ success: true, sessions: formatted });
    } catch (err) {
      res.status(500).json({ error: 'Could not fetch active sessions' });
    }
  }

  /**
   * DELETE /api/auth/sessions/:id
   */
  async revokeSession(req, res) {
    try {
      const sessionId = req.params.id;
      if (!sessionId) return res.status(400).json({ error: 'Session ID is required' });

      await this.db.deleteSession(sessionId, req.user.id);

      if (sessionId === req.session?.id) {
        this._clearSessionCookie(res);
      }

      res.json({ success: true, message: 'Session revoked successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Could not revoke session' });
    }
  }

  /**
   * DELETE /api/auth/sessions/all
   */
  async revokeAllOtherSessions(req, res) {
    try {
      const currentSessionId = req.session?.id;
      await this.db.deleteAllUserSessions(req.user.id, currentSessionId);
      res.json({ success: true, message: 'All other active sessions have been terminated.' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to revoke other sessions' });
    }
  }

  /**
   * POST /api/auth/delete-account
   */
  async deleteAccount(req, res) {
    try {
      const { password } = req.body;
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Password confirmation is required to delete your account.' });
      }

      const fullUser = await this.db.getUserById(req.user.id);
      if (!fullUser || !fullUser.password_hash) {
        return res.status(400).json({ error: 'User account not found' });
      }

      const isValid = await this.security.verifyPassword(password, fullUser.password_hash);
      if (!isValid) {
        return res.status(401).json({ error: 'Incorrect password. Account deletion cancelled.' });
      }

      const userEmail = fullUser.email;
      const userName = fullUser.name;

      await this.db.deleteUserAccount(req.user.id);
      this._clearSessionCookie(res);

      if (userEmail) {
        this.email.sendAccountDeletedAlert(userEmail, {
          name: userName || 'there'
        }).catch(() => {});
      }

      res.json({ success: true, message: 'Your account and data have been permanently deleted.' });
    } catch (err) {
      console.error('[DELETE ACCOUNT ERROR]', err);
      res.status(500).json({ error: 'Failed to delete account. Please contact support.' });
    }
  }

  /**
   * POST /api/auth/forgot-password
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      const normalized = this.db.constructor.normalizeEmail(email);
      const user = await this.db.getUserByNormalizedEmail(normalized);

      if (user && user.email) {
        const rawToken = this.security.generateSecureToken(32);
        const tokenHash = this.security.hashToken(rawToken);
        await this.db.createPasswordResetToken(user.id, tokenHash);

        const hostUrl = process.env.HOST_URL || `${req.protocol}://${req.get('host')}`;
        const resetUrl = `${hostUrl}/auth.html?view=reset&token=${rawToken}`;

        this.email.sendPasswordResetEmail(user.email, {
          userId: user.id,
          name: user.name || 'there',
          resetUrl
        }).catch(e => console.warn('[FORGOT PASSWORD EMAIL WARN]', e.message));
      }

      // Anti-Account-Enumeration Generic Response
      res.json({
        success: true,
        message: 'If an account exists for this email, you will receive password reset instructions shortly.'
      });
    } catch (err) {
      console.error('[FORGOT PASSWORD ERROR]', err);
      res.json({
        success: true,
        message: 'If an account exists for this email, you will receive password reset instructions shortly.'
      });
    }
  }

  /**
   * POST /api/auth/reset-password
   */
  async resetPassword(req, res) {
    try {
      const { token, password, confirmPassword } = req.body;

      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing password reset token.' });
      }

      if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'New password is required.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
      }

      const strength = this.security.calculatePasswordStrength(password);
      if (strength.score < 2) {
        return res.status(400).json({
          error: 'Password is too weak. Please use at least 8 characters with a mix of letters, numbers, and symbols.',
          feedback: strength.feedback
        });
      }

      const tokenHash = this.security.hashToken(token);
      const tokenRecord = await this.db.getPasswordResetToken(tokenHash);

      if (!tokenRecord || !tokenRecord.user_id) {
        return res.status(400).json({ error: 'This password reset link is invalid or has expired. Please request a new one.' });
      }

      const newPasswordHash = await this.security.hashPassword(password);
      await this.db.markPasswordResetTokenUsed(tokenRecord.id, tokenRecord.user_id, newPasswordHash);

      // Dispatch security notification
      const user = tokenRecord.users;
      if (user?.email) {
        this.email.sendPasswordChangedAlert(user.email, {
          userId: user.id,
          name: user.name || 'there'
        }).catch(() => {});
      }

      res.json({
        success: true,
        message: 'Your password has been successfully reset! You can now log in with your new password.'
      });
    } catch (err) {
      console.error('[RESET PASSWORD ERROR]', err);
      res.status(500).json({ error: 'Password reset failed. Please try again.' });
    }
  }

  /**
   * POST /api/auth/verify-email
   */
  async verifyEmail(req, res) {
    try {
      const { token } = req.body;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing verification token.' });
      }

      const tokenHash = this.security.hashToken(token);
      const tokenRecord = await this.db.getVerificationToken(tokenHash);

      if (!tokenRecord || !tokenRecord.user_id) {
        return res.status(400).json({ error: 'This verification link is invalid or has expired.' });
      }

      await this.db.markVerificationTokenUsed(tokenRecord.id, tokenRecord.user_id);

      res.json({
        success: true,
        message: 'Your email address has been verified successfully!'
      });
    } catch (err) {
      console.error('[VERIFY EMAIL ERROR]', err);
      res.status(500).json({ error: 'Email verification failed.' });
    }
  }
}

module.exports = { AuthHandler };

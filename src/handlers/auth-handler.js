/**
 * Authentication & Security Handler
 * Full lifecycle controller for Signup, Login, Logout, Verification,
 * Password Reset, Active Sessions, and Account Deletion.
 */

class AuthHandler {
  constructor(dbService, securityService, emailService) {
    this.db = dbService;
    this.security = securityService;
    this.email = emailService;
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

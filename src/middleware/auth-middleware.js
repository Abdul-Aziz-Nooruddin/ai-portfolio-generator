/**
 * Authentication & Authorization Middleware
 * Session extraction from HttpOnly cookies, RBAC, IDOR defense, and per-user quotas.
 */

class AuthMiddleware {
  /**
   * Helper to parse cookie string from headers without requiring external dependency
   * @param {string} cookieHeader 
   * @returns {Record<string, string>}
   */
  static parseCookies(cookieHeader = '') {
    const list = {};
    if (!cookieHeader) return list;

    cookieHeader.split(';').forEach(cookie => {
      let [name, ...rest] = cookie.split('=');
      name = name?.trim();
      if (!name) return;
      const value = rest.join('=').trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });

    return list;
  }

  /**
   * Primary Authenticator
   * Reads HttpOnly cookie -> Hashes -> Validates against DB -> Attaches req.user & req.session
   */
  static authenticate(dbService, securityService) {
    return async (req, res, next) => {
      try {
        const cookies = AuthMiddleware.parseCookies(req.headers.cookie);
        let rawToken = cookies.portfolio_session;

        // Fallback for API clients sending Bearer token
        if (!rawToken && req.headers.authorization) {
          const authHeader = req.headers.authorization;
          if (authHeader.startsWith('Bearer ')) {
            rawToken = authHeader.slice(7).trim();
          }
        }

        if (!rawToken) {
          req.user = null;
          req.session = null;
          return next();
        }

        const tokenHash = securityService.hashToken(rawToken);
        const sessionRecord = await dbService.getSessionByTokenHash(tokenHash);

        if (!sessionRecord || !sessionRecord.users) {
          req.user = null;
          req.session = null;
          return next();
        }

        // Sanitize user object (never leak password hash)
        const user = { ...sessionRecord.users };
        delete user.password_hash;

        req.user = user;
        req.session = {
          id: sessionRecord.id,
          userId: sessionRecord.user_id,
          createdAt: sessionRecord.created_at,
          lastActiveAt: sessionRecord.last_active_at,
          userAgent: sessionRecord.user_agent,
          ipAddress: sessionRecord.ip_address
        };

        // Asynchronously touch last_active_at
        dbService.touchSession(sessionRecord.id).catch(() => {});

        next();
      } catch (err) {
        console.error('[AUTH MIDDLEWARE ERROR]', err.message);
        req.user = null;
        req.session = null;
        next();
      }
    };
  }

  /**
   * Guard: Rejects unauthenticated requests
   */
  static requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required. Please sign in.'
      });
    }
    next();
  }

  /**
   * Guard: Enforces Admin Role
   */
  static requireAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required.' });
    }

    const adminUsernames = (process.env.ADMIN_USERNAMES || 'abdulazizpro1')
      .split(',')
      .map(u => u.trim().toLowerCase());

    const isAdmin =
      req.user.role === 'admin' ||
      (req.user.username && adminUsernames.includes(req.user.username.toLowerCase()));

    if (!isAdmin) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Administrator privileges required for this resource.'
      });
    }

    next();
  }

  /**
   * IDOR Defense Guard: Verifies ownership of requested resource
   * @param {Function} getResourceOwnerIdFn - (req) => Promise<string|null>
   */
  static requireOwnership(getResourceOwnerIdFn) {
    return async (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const ownerId = await getResourceOwnerIdFn(req);
        if (!ownerId) {
          return res.status(404).json({ error: 'Resource not found' });
        }

        // Allow owner or Admin
        const isAdmin = req.user.role === 'admin';
        if (ownerId !== req.user.id && !isAdmin) {
          return res.status(403).json({
            error: 'Forbidden',
            message: 'You do not have permission to access or modify this resource.'
          });
        }

        next();
      } catch (err) {
        return res.status(500).json({ error: 'Authorization check failed' });
      }
    };
  }

  /**
   * Per-User Resource Quota Guard (for AI Generation & PDF Parsing)
   */
  static quotaLimiter(dbService, actionName = 'ai_generation', maxPerHour = 10) {
    return async (req, res, next) => {
      const identifier = req.user?.id || req.ip || 'anonymous';
      const windowHours = 1;

      try {
        const allowed = await dbService.checkRateLimit(
          identifier,
          actionName,
          maxPerHour,
          windowHours * 60
        );

        if (!allowed) {
          return res.status(429).json({
            error: 'Quota Exceeded',
            message: `You have reached the maximum quota of ${maxPerHour} ${actionName.replace('_', ' ')} requests per hour. Please wait or upgrade your plan.`
          });
        }

        next();
      } catch (err) {
        // Fail-safe: allow request if rate limit table error occurs, log warning
        console.warn('[QUOTA LIMITER WARN]', err.message);
        next();
      }
    };
  }
}

module.exports = { AuthMiddleware };

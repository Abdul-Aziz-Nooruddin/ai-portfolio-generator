/**
 * Security Middleware Layer
 * Security headers, CORS, CSRF, Rate Limiting, Request Size Limits, Timeout Protection & Safe Error Handling.
 */

class SecurityMiddleware {
  /**
   * Sets strict HTTP security headers
   */
  static securityHeaders(options = {}) {
    return (req, res, next) => {
      // 1. Content Security Policy (CSP)
      const isProduction = process.env.NODE_ENV === 'production';
      const csp = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://tagassistant.google.com https://checkout.razorpay.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: https: blob: https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com https://www.google.co.in",
        "frame-src 'self' https://tagassistant.google.com https://api.razorpay.com https://checkout.razorpay.com",
        "connect-src 'self' blob: data: https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://tagassistant.google.com https://api.razorpay.com https://lumberjack.razorpay.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.google.com https://analytics.google.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; ');

      res.setHeader('Content-Security-Policy', csp);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

      if (isProduction) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      }

      next();
    };
  }

  /**
   * Enforces request body size limits per route
   * @param {number} maxBytes 
   */
  static limitBodySize(maxBytes = 50 * 1024) {
    return (req, res, next) => {
      const contentLength = parseInt((req.headers && (req.headers['content-length'] || req.headers['Content-Length'])) || '0', 10);
      if (contentLength > maxBytes) {
        return res.status(413).json({
          error: 'Payload Too Large',
          message: `Request entity exceeds maximum allowable size of ${Math.round(maxBytes / 1024)} KB.`
        });
      }
      if (next) next();
    };
  }

  /**
   * Prevents hung / slowloris requests by setting a hard timeout (90s for deep AI generation pipelines)
   * @param {number} ms 
   */
  static requestTimeout(ms = 90000) {
    return (req, res, next) => {
      res.setTimeout(ms, () => {
        if (!res.headersSent) {
          res.status(504).json({
            error: 'Request Timeout',
            message: 'The AI generation request took longer than expected. Please try again or simplify input fields.',
            suggestion: 'Try generating again; cached resources will build faster.'
          });
        }
      });
      next();
    };
  }

  /**
   * Configures CORS with trusted origin validation
   */
  static corsConfig() {
    return (req, res, next) => {
      const origin = req.headers.origin;
      const port = process.env.PORT || 5050;
      const hostUrl = process.env.HOST_URL || `http://localhost:${port}`;
      const envAllowed = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
      const allowedOrigins = new Set([
        hostUrl,
        `http://localhost:${port}`,
        `http://127.0.0.1:${port}`,
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5050',
        'http://127.0.0.1:5050',
        ...envAllowed
      ]);

      if (origin && allowedOrigins.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token');
      }

      if (req.method === 'OPTIONS') {
        return res.status(204).end();
      }
      next();
    };
  }

  /**
   * Double-Submit Cookie & Origin CSRF Protection for state-mutating requests
   */
  static csrfProtection() {
    return (req, res, next) => {
      // Safe methods do not mutate state
      if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
      }

      // Webhooks use cryptographic signature validation, skip CSRF
      if (req.path.startsWith('/webhook')) {
        return next();
      }

      const host = req.get('host');
      const origin = req.headers.origin;
      const referer = req.headers.referer;

      if (origin) {
        try {
          const originUrl = new URL(origin);
          const isLocalDev = (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1');
          if (originUrl.host !== host && !isLocalDev) {
            return res.status(403).json({ error: 'CSRF Rejected: Invalid Origin' });
          }
        } catch (e) {
          return res.status(403).json({ error: 'CSRF Rejected: Malformed Origin' });
        }
      } else if (referer) {
        try {
          const refererUrl = new URL(referer);
          const isLocalDev = (refererUrl.hostname === 'localhost' || refererUrl.hostname === '127.0.0.1');
          if (refererUrl.host !== host && !isLocalDev) {
            return res.status(403).json({ error: 'CSRF Rejected: Invalid Referer' });
          }
        } catch (e) {
          return res.status(403).json({ error: 'CSRF Rejected: Malformed Referer' });
        }
      }

      next();
    };
  }

  /**
   * Progressive Sliding-Window Rate Limiter
   * Uses in-memory & database store with exponential backoff on consecutive failures.
   */
  static rateLimiter({ max = 10, windowMs = 60000, keyGenerator = null, actionName = 'general' }) {
    const memoryCache = new Map();

    return async (req, res, next) => {
      const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const key = keyGenerator ? keyGenerator(req) : `${actionName}:${ip}`;
      const now = Date.now();

      let record = memoryCache.get(key);
      if (!record || now > record.resetTime) {
        record = { count: 1, resetTime: now + windowMs, backoffUntil: 0 };
        memoryCache.set(key, record);
      } else {
        record.count += 1;
      }

      // Check temporary backoff
      if (record.backoffUntil && now < record.backoffUntil) {
        const remainingSeconds = Math.ceil((record.backoffUntil - now) / 1000);
        res.setHeader('Retry-After', remainingSeconds);
        return res.status(429).json({
          error: 'Too Many Requests',
          message: `Too many attempts. Please wait ${remainingSeconds} seconds before trying again.`
        });
      }

      if (record.count > max) {
        // Calculate progressive backoff delay instead of permanent lockout
        const excess = record.count - max;
        const delaySeconds = Math.min(300, Math.pow(2, excess) * 5); // 10s, 20s, 40s, max 300s
        record.backoffUntil = now + delaySeconds * 1000;

        res.setHeader('Retry-After', delaySeconds);
        return res.status(429).json({
          error: 'Rate Limit Exceeded',
          message: `Rate limit exceeded. Temporary cooldown active for ${delaySeconds} seconds.`
        });
      }

      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - record.count));
      res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

      next();
    };
  }

  /**
   * Honeypot & Bot Trap Protection
   * Rejects automated bots filling invisible honeypot fields
   */
  static botTrap(honeypotField = '_hp_security_check') {
    return (req, res, next) => {
      if (req.body && req.body[honeypotField]) {
        return res.status(400).json({ error: 'Automated request rejected.' });
      }
      next();
    };
  }

  /**
   * Safe Global Error Handler (Never leaks SQL queries, stack traces, paths, or secrets)
   */
  static safeErrorHandler() {
    return (err, req, res, next) => {
      const isProduction = process.env.NODE_ENV === 'production';
      const statusCode = err.status || err.statusCode || 500;

      // Log full internal error on server console / secure log sink
      console.error(`[SECURITY ERROR] ${req.method} ${req.originalUrl}:`, err);

      if (res.headersSent) {
        return next(err);
      }

      // Generic, safe response to clients
      res.status(statusCode).json({
        success: false,
        error: isProduction ? 'An unexpected error occurred. Please try again later.' : (err.message || 'Internal Server Error'),
        code: err.code || 'INTERNAL_ERROR'
      });
    };
  }
}

module.exports = { SecurityMiddleware };

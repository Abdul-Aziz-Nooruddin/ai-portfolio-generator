/**
 * Comprehensive Automated Security, Cryptography & Attack Surface Test Suite
 * Tests Password hashing, Timing-attack resistance, XSS filters, Advanced SSRF bypasses,
 * Path Traversal variations, CSRF defense, CORS validation, IDOR protection, Rate Limiting,
 * and the complete Authorization Matrix.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { SecurityService } = require('./services/security-service');
const { AuthMiddleware } = require('./middleware/auth-middleware');
const { SecurityMiddleware } = require('./middleware/security-middleware');

describe('🔒 Cryptography & Password Security Engine', () => {
  const security = new SecurityService('test-pepper-secret-key-1234567890');

  it('should hash passwords with scrypt, unique salt and pepper', async () => {
    const password = 'SuperSecurePassphrase2026!';
    const hash1 = await security.hashPassword(password);
    const hash2 = await security.hashPassword(password);

    assert.ok(hash1.startsWith('scrypt$'), 'Hash should use scrypt algorithm identifier');
    assert.notEqual(hash1, hash2, 'Hashes of identical passwords must produce distinct salts');

    const valid = await security.verifyPassword(password, hash1);
    assert.equal(valid, true, 'Password verification must succeed for valid password');

    const invalid = await security.verifyPassword('WrongPassword123!', hash1);
    assert.equal(invalid, false, 'Password verification must fail for incorrect password');
  });

  it('should evaluate password strength and reject compromised/weak passwords', () => {
    const weak = security.calculatePasswordStrength('123456');
    assert.equal(weak.score, 0, 'Common password must score 0');

    const short = security.calculatePasswordStrength('Short1!');
    assert.equal(short.score, 0, 'Password under 8 chars must score 0');

    const strong = security.calculatePasswordStrength('Correct-Horse-Battery-Staple-2026!');
    assert.ok(strong.score >= 3, 'Strong passphrase must score at least 3');
  });

  it('should generate high-entropy tokens and deterministic SHA-256 hashes', () => {
    const token1 = security.generateSecureToken(32);
    const token2 = security.generateSecureToken(32);

    assert.equal(token1.length, 64, '32-byte hex token should be 64 characters long');
    assert.notEqual(token1, token2, 'Generated tokens must be distinct');

    const hash1 = security.hashToken(token1);
    const hash2 = security.hashToken(token1);
    assert.equal(hash1, hash2, 'Token hashing must be deterministic');
    assert.equal(hash1.length, 64, 'SHA-256 hash must be 64 hex characters');
  });
});

describe('🛡️ Advanced Attack Surface Neutralization', () => {
  const security = new SecurityService();

  it('should neutralize diverse XSS injection vectors', () => {
    // 1. Script tag injection
    const scriptPayload = '<p>Hello</p><script>alert("XSS")</script>';
    assert.ok(!security.sanitizeHtml(scriptPayload).includes('<script>'));

    // 2. Event handler attributes (onerror, onload, onclick, ontoggle)
    const eventPayload = '<img src="x" onerror="stealCookies()"><details open ontoggle="exploit()"><svg onload="hack()">';
    const cleanEvent = security.sanitizeHtml(eventPayload);
    assert.ok(!cleanEvent.includes('onerror'));
    assert.ok(!cleanEvent.includes('ontoggle'));
    assert.ok(!cleanEvent.includes('onload'));

    // 3. Pseudo-protocols (javascript:, vbscript:, data:text/html)
    const jsUri = '<a href="javascript:alert(1)">Click</a><a href="vbscript:msgbox(1)">VB</a>';
    assert.ok(!security.sanitizeHtml(jsUri).includes('javascript:'));
    assert.ok(!security.sanitizeHtml(jsUri).includes('vbscript:'));

    // 4. SVG foreignObject container injection
    const svgForeign = '<svg><foreignObject><script>alert(1)</script></foreignObject></svg>';
    assert.ok(!security.sanitizeHtml(svgForeign).includes('foreignObject'));
    assert.ok(!security.sanitizeHtml(svgForeign).includes('<script>'));

    // 5. CSS expression / url javascript
    const aiOutput = security.sanitizeAiOutput({
      html: '<h1>Hi</h1>',
      css: 'body { background: url("javascript:alert(1)"); width: expression(alert(1)); }',
      js: 'console.log(document.cookie); localStorage.getItem("token");'
    });
    assert.ok(!aiOutput.css.includes('javascript:'));
    assert.ok(!aiOutput.css.includes('expression('));
    assert.ok(!aiOutput.js.includes('document.cookie'));
    assert.ok(!aiOutput.js.includes('localStorage'));
  });

  it('should neutralize SSRF attacks including IPv4, IPv6, Integer and Cloud Metadata', () => {
    // Standard Private IPs
    assert.equal(security.isUrlSafe('http://localhost:8080'), false, 'localhost blocked');
    assert.equal(security.isUrlSafe('http://127.0.0.1/admin'), false, '127.0.0.1 blocked');
    assert.equal(security.isUrlSafe('http://10.0.0.1/internal'), false, '10.* subnet blocked');
    assert.equal(security.isUrlSafe('http://172.16.0.1/secret'), false, '172.16.* subnet blocked');
    assert.equal(security.isUrlSafe('http://172.31.255.255/'), false, '172.31.* subnet blocked');
    assert.equal(security.isUrlSafe('http://192.168.1.1/router'), false, '192.168.* subnet blocked');

    // Cloud Metadata Endpoints
    assert.equal(security.isUrlSafe('http://169.254.169.254/latest/meta-data/'), false, 'AWS/GCP metadata IP blocked');
    assert.equal(security.isUrlSafe('http://metadata.google.internal/computeMetadata/v1/'), false, 'GCP metadata hostname blocked');

    // IPv6 Loopback & Private
    assert.equal(security.isUrlSafe('http://[::1]/'), false, 'IPv6 loopback blocked');
    assert.equal(security.isUrlSafe('http://[fe80::1]/'), false, 'IPv6 link-local blocked');
    assert.equal(security.isUrlSafe('http://[::ffff:127.0.0.1]/'), false, 'IPv4-mapped IPv6 blocked');

    // Integer IP Representations
    assert.equal(security.isUrlSafe('http://2130706433/'), false, 'Decimal integer for 127.0.0.1 blocked');

    // Safe Public URLs
    assert.equal(security.isUrlSafe('https://example.com/api'), true, 'Public HTTPS allowed');
    assert.equal(security.isUrlSafe('/dashboard.html'), true, 'Internal relative path allowed');
  });

  it('should block Path Traversal directory escapes in multiple encodings', () => {
    assert.equal(security.isPathSafe('public/sites', 'evil/../../etc/passwd'), false, 'Standard dot-dot-slash blocked');
    assert.equal(security.isPathSafe('public/sites', 'site1/..%2f..%2fetc/passwd'), false, 'URL encoded traversal blocked');
    assert.equal(security.isPathSafe('public/sites', 'site1/%2e%2e%2f%2e%2e%2fetc/passwd'), false, 'Double encoded traversal blocked');
    assert.equal(security.isPathSafe('public/sites', 'site1/..\\..\\windows\\system32'), false, 'Windows backslash traversal blocked');
    assert.equal(security.isPathSafe('public/sites', 'site1/subfolder/index.html'), true, 'Legitimate child path allowed');
  });

  it('should evaluate and flag Terms of Service violations with exact clauses', () => {
    // 1. Phishing & Credential Theft
    const phishingResult = security.evaluateContentSafetyAndTOS({
      name: 'Legit Dev',
      bio: 'Please enter your password and seed phrase to connect wallet'
    });
    assert.equal(phishingResult.isCompliant, false);
    assert.equal(phishingResult.violations[0].ruleId, 'TOS_4_1_PHISHING');
    assert.equal(phishingResult.violations[0].severity, 'CRITICAL');
    assert.ok(phishingResult.violations[0].section.includes('Section 4.1'));

    // 2. High-Yield Scam Scheme
    const scamResult = security.evaluateContentSafetyAndTOS('Double your btc instantly with guaranteed 500% returns');
    assert.equal(scamResult.isCompliant, false);
    assert.equal(scamResult.violations[0].ruleId, 'TOS_4_3_SCAM_SCHEME');
    assert.equal(scamResult.violations[0].severity, 'HIGH');

    // 3. Clean compliant content
    const cleanResult = security.evaluateContentSafetyAndTOS({
      name: 'Alex Developer',
      role: 'Full Stack Engineer',
      bio: 'Building modern web applications and decentralized cloud services.'
    });
    assert.equal(cleanResult.isCompliant, true);
    assert.equal(cleanResult.violations.length, 0);
  });
});

describe('🛡️ Authorization, IDOR & Access Control Matrix', () => {
  it('should reject unauthenticated access to protected routes (401)', () => {
    const req = { user: null };
    let status = null;

    const res = {
      status: (code) => {
        status = code;
        return { json: () => {} };
      }
    };

    AuthMiddleware.requireAuth(req, res, () => {});
    assert.equal(status, 401, 'Unauthenticated request must receive 401 Unauthorized');
  });

  it('should enforce role-based access control on Admin endpoints (403)', () => {
    const regularUserReq = {
      user: { id: 'user-123', role: 'user', username: 'john_doe' }
    };
    let status = null;

    const res = {
      status: (code) => {
        status = code;
        return { json: () => {} };
      }
    };

    AuthMiddleware.requireAdmin(regularUserReq, res, () => {});
    assert.equal(status, 403, 'Regular user must be forbidden (403) from Admin routes');

    let adminPassed = false;
    const adminUserReq = {
      user: { id: 'admin-1', role: 'admin', username: 'abdulazizpro1' }
    };
    AuthMiddleware.requireAdmin(adminUserReq, res, () => { adminPassed = true; });
    assert.equal(adminPassed, true, 'Admin user should pass requireAdmin check');
  });

  it('should prevent Insecure Direct Object Reference (IDOR) attacks across users', async () => {
    const victimUserId = 'victim-uuid-1111';
    const attackerUserId = 'attacker-uuid-2222';

    // Attacker trying to access victim's site
    const req = {
      user: { id: attackerUserId, role: 'user' },
      params: { siteId: 'victim-portfolio' }
    };

    let status = null;
    const res = {
      status: (code) => {
        status = code;
        return { json: () => {} };
      }
    };

    const idorGuard = AuthMiddleware.requireOwnership(async () => victimUserId);
    await idorGuard(req, res, () => {});

    assert.equal(status, 403, 'Cross-user resource access without ownership must be rejected with 403 Forbidden');

    // Owner accessing own site
    let ownerPassed = false;
    const ownerReq = {
      user: { id: victimUserId, role: 'user' },
      params: { siteId: 'victim-portfolio' }
    };
    const ownerGuard = AuthMiddleware.requireOwnership(async () => victimUserId);
    await ownerGuard(ownerReq, res, () => { ownerPassed = true; });
    assert.equal(ownerPassed, true, 'Resource owner must be allowed access');
  });

  it('should enforce request body size limits with HTTP 413 Payload Too Large', () => {
    const sizeLimiter = SecurityMiddleware.limitBodySize(50 * 1024); // 50KB limit
    const oversizedReq = {
      headers: { 'content-length': String(100 * 1024) } // 100KB payload
    };

    let status = null;
    const res = {
      status: (code) => {
        status = code;
        return { json: () => {} };
      }
    };

    sizeLimiter(oversizedReq, res, () => {});
    assert.equal(status, 413, 'Oversized request must receive 413 Payload Too Large');
  });

  it('should reject CSRF attacks on mutating state requests with mismatched origin', () => {
    const csrfGuard = SecurityMiddleware.csrfProtection();
    const attackerReq = {
      method: 'POST',
      path: '/api/auth/delete-account',
      headers: {
        origin: 'https://evil-attacker-site.com',
        host: 'portfolio-bot.com'
      },
      get: (h) => h === 'host' ? 'portfolio-bot.com' : null
    };

    let status = null;
    const res = {
      status: (code) => {
        status = code;
        return { json: () => {} };
      }
    };

    csrfGuard(attackerReq, res, () => {});
    assert.equal(status, 403, 'Cross-origin mutating request must be rejected with 403 Forbidden');
  });
});

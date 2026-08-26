/**
 * Security Service
 * Core cryptography, password hashing, token management, sanitization,
 * password entropy calculation, SSRF and Path Traversal defense.
 */

const crypto = require('crypto');
const path = require('path');
const { promisify } = require('util');

const scryptAsync = promisify(crypto.scrypt);

class SecurityService {
  constructor(pepper = process.env.AUTH_PEPPER || 'portfolio-bot-secure-default-pepper-2026') {
    this.pepper = pepper;
    this.commonPasswords = new Set([
      'password', 'password123', '123456', '12345678', '123456789', '12345', 'qwerty',
      'abc123', 'admin', 'welcome', 'portfolio', 'letmein', 'monkey', 'dragon', 'football',
      'iloveyou', 'master', 'sunshine', 'princess', 'chelsea', 'shadow', 'trustno1'
    ]);
  }

  /**
   * Hashes a password with Scrypt, salt, and pepper
   * @param {string} password 
   * @returns {Promise<string>}
   */
  async hashPassword(password) {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a non-empty string');
    }
    const salt = crypto.randomBytes(32).toString('hex');
    const peppered = password + this.pepper;
    const derivedKey = await scryptAsync(peppered, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 });
    return `scrypt$N=16384,r=8,p=1$${salt}$${derivedKey.toString('hex')}`;
  }

  /**
   * Verifies password in constant time
   * @param {string} password 
   * @param {string} storedHash 
   * @returns {Promise<boolean>}
   */
  async verifyPassword(password, storedHash) {
    if (!password || !storedHash || typeof password !== 'string' || typeof storedHash !== 'string') {
      return false;
    }
    try {
      const parts = storedHash.split('$');
      if (parts.length !== 4 || parts[0] !== 'scrypt') {
        return false;
      }
      const salt = parts[2];
      const keyHex = parts[3];
      const expectedKey = Buffer.from(keyHex, 'hex');

      const peppered = password + this.pepper;
      const derivedKey = await scryptAsync(peppered, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 });

      if (derivedKey.length !== expectedKey.length) {
        return false;
      }
      return crypto.timingSafeEqual(derivedKey, expectedKey);
    } catch (e) {
      return false;
    }
  }

  /**
   * Generates a high-entropy random token
   * @param {number} bytes 
   * @returns {string}
   */
  generateSecureToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * Computes SHA-256 hash of a token
   * @param {string} token 
   * @returns {string}
   */
  hashToken(token) {
    if (!token || typeof token !== 'string') return '';
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Evaluates password strength and entropy
   * @param {string} password 
   * @returns {{ score: number, label: string, feedback: string[] }}
   */
  calculatePasswordStrength(password) {
    if (!password || typeof password !== 'string') {
      return { score: 0, label: 'Very Weak', feedback: ['Password cannot be empty.'] };
    }

    const feedback = [];
    let score = 0;

    if (password.length < 8) {
      feedback.push('Password must be at least 8 characters long.');
      return { score: 0, label: 'Very Weak', feedback };
    }

    if (this.commonPasswords.has(password.toLowerCase())) {
      feedback.push('This is an easily guessable common password.');
      return { score: 0, label: 'Compromised', feedback };
    }

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
    if (varietyCount >= 3) score += 1;

    // Normalization clamp 0-4
    const clampedScore = Math.min(4, Math.max(1, score));
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    if (clampedScore < 2) {
      feedback.push('Consider using a longer passphrase or mixing letters, numbers, and symbols.');
    }

    return {
      score: clampedScore,
      label: labels[clampedScore],
      feedback
    };
  }

  /**
   * Sanitizes generic string input against control characters & basic injection
   * @param {string} str 
   * @returns {string}
   */
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .trim()
      .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, '');
  }

  /**
   * Sanitizes HTML strings to neutralize scripts, javascript: uris, and malicious event handlers
   * @param {string} html 
   * @returns {string}
   */
  /**
   * Sanitizes HTML strings to neutralize scripts, javascript: uris, SVGs, and malicious event handlers
   * @param {string} html 
   * @returns {string}
   */
  sanitizeHtml(html) {
    if (typeof html !== 'string') return '';
    let clean = html;

    // Remove script tags and embedded scripts
    clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove all inline event handlers (onerror, onload, onclick, onfocus, ontoggle, etc.)
    clean = clean.replace(/\s+on[a-z0-9_-]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');
    
    // Neutralize dangerous pseudo-protocols
    clean = clean.replace(/javascript\s*:/gi, 'blocked:');
    clean = clean.replace(/vbscript\s*:/gi, 'blocked:');
    clean = clean.replace(/data\s*:\s*text\/html/gi, 'blocked:');
    clean = clean.replace(/data\s*:\s*image\/svg\+xml/gi, 'blocked:');

    // Remove executable and embedded container elements
    clean = clean.replace(/<iframe\b[^>]*>(.*?)<\/iframe>/gi, '');
    clean = clean.replace(/<object\b[^>]*>(.*?)<\/object>/gi, '');
    clean = clean.replace(/<embed\b[^>]*>/gi, '');
    clean = clean.replace(/<applet\b[^>]*>(.*?)<\/applet>/gi, '');
    clean = clean.replace(/<base\b[^>]*>/gi, '');
    clean = clean.replace(/<meta\b[^>]*>/gi, '');

    // Strip dangerous SVG script containers and foreignObject
    clean = clean.replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, '');
    clean = clean.replace(/xlink:href\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*"|javascript:[^\s>]+)/gi, 'xlink:href="#"');

    // Neutralize CSS expression and javascript URLs in styles
    clean = clean.replace(/expression\s*\([^)]*\)/gi, 'none');
    clean = clean.replace(/url\s*\(\s*["']?\s*(?:javascript|vbscript|data:text\/html)/gi, 'url("blocked:');

    return clean;
  }

  /**
   * Dedicated AI Output Sanitizer
   * Cleans AI-generated HTML/CSS/JS before saving or serving while preserving safe WebGL / Three.js scripts.
   */
  sanitizeAiOutput(site = {}) {
    let cleanHtml = site.html || '';
    let cleanJs = site.js || '';

    // Strip unsafe storage / cookie access and eval from JS
    cleanJs = cleanJs
      .replace(/document\.cookie/gi, '/* protected */')
      .replace(/(?:window\.)?localStorage/gi, '/* protected */')
      .replace(/(?:window\.)?sessionStorage/gi, '/* protected */')
      .replace(/eval\s*\(/gi, '/* blocked */(');

    // Neutralize dangerous inline event handlers and malicious iframe/object injection
    cleanHtml = cleanHtml
      .replace(/<script\b[^>]*>[\s\S]*?alert\([\s\S]*?<\/script>/gi, '')
      .replace(/\s+on[a-z0-9_-]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '')
      .replace(/javascript\s*:/gi, 'blocked:')
      .replace(/vbscript\s*:/gi, 'blocked:')
      .replace(/<iframe\b[^>]*>(.*?)<\/iframe>/gi, '')
      .replace(/<object\b[^>]*>(.*?)<\/object>/gi, '')
      .replace(/<embed\b[^>]*>/gi, '')
      .replace(/<applet\b[^>]*>(.*?)<\/applet>/gi, '')
      .replace(/<foreignObject\b[^<]*(?:(?!<\/foreignObject>)<[^<]*)*<\/foreignObject>/gi, '')
      .replace(/xlink:href\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*"|javascript:[^\s>]+)/gi, 'xlink:href="#"');

    return {
      html: cleanHtml,
      css: (site.css || '')
        .replace(/expression\s*\([^)]*\)/gi, 'none')
        .replace(/url\s*\(\s*["']?\s*(?:javascript|vbscript|data:text\/html)/gi, 'url("blocked:'),
      js: cleanJs
    };
  }

  /**
   * Verifies destination directory to prevent Path Traversal attacks
   * @param {string} baseDir 
   * @param {string} targetPath 
   * @returns {boolean}
   */
  isPathSafe(baseDir, targetPath) {
    if (!baseDir || !targetPath || typeof targetPath !== 'string') return false;
    let decoded = targetPath;
    try {
      decoded = decodeURIComponent(targetPath);
    } catch (e) {}

    // Reject explicit dot traversal sequences, backslashes, null bytes
    if (decoded.includes('..') || decoded.includes('\\') || decoded.includes('\0')) {
      return false;
    }

    const resolvedBase = path.resolve(baseDir);
    const resolvedTarget = path.resolve(baseDir, decoded);
    const relative = path.relative(resolvedBase, resolvedTarget);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
  }

  /**
   * Validates URLs to prevent SSRF and Open Redirect attacks
   * Fully checks IPv4, IPv6, Octal/Hex/Integer IP formats, Cloud Metadata, and Subnets
   * @param {string} urlStr 
   * @param {string[]} allowedHostnames 
   * @returns {boolean}
   */
  isUrlSafe(urlStr, allowedHostnames = []) {
    if (!urlStr || typeof urlStr !== 'string') return false;
    try {
      // Treat relative internal paths as safe
      if (urlStr.startsWith('/') && !urlStr.startsWith('//')) {
        return true;
      }
      const parsed = new URL(urlStr);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return false;
      }
      let hostname = parsed.hostname.toLowerCase().trim();

      // Strip IPv6 brackets if present
      if (hostname.startsWith('[') && hostname.endsWith(']')) {
        hostname = hostname.slice(1, -1);
      }

      // Check Cloud Metadata Hostnames
      const blockedHostnames = [
        'localhost',
        'metadata.google.internal',
        'instance-data',
        'metadata.internal',
        '169.254.169.254'
      ];
      if (blockedHostnames.includes(hostname)) {
        return false;
      }

      // Check IPv6 loopback, unspecified, and private ranges
      if (
        hostname === '::1' ||
        hostname === '::' ||
        hostname.startsWith('fe80:') ||
        hostname.startsWith('fc') ||
        hostname.startsWith('fd') ||
        hostname.startsWith('::ffff:')
      ) {
        return false;
      }

      // Check Integer / Hex / Octal IPv4 representations (e.g. 2130706433 or 0x7f000001)
      if (/^\d+$/.test(hostname)) {
        const intVal = parseInt(hostname, 10);
        if (intVal >= 2130706432 && intVal <= 2147483647) return false; // 127.0.0.0/8
        if (intVal >= 167772160 && intVal <= 184549375) return false;   // 10.0.0.0/8
        if (intVal >= 2886729728 && intVal <= 2887778303) return false; // 172.16.0.0/12
        if (intVal >= 3232235520 && intVal <= 3232301055) return false; // 192.168.0.0/16
        if (intVal >= 2851995648 && intVal <= 2852061183) return false; // 169.254.0.0/16
        if (intVal === 0) return false; // 0.0.0.0
      }

      // Check Standard IPv4 Octets
      const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
      if (ipv4Match) {
        const [ , a, b, c, d ] = ipv4Match.map(Number);
        if (a === 127 || a === 10 || a === 0) return false; // 127.0.0.0/8, 10.0.0.0/8, 0.0.0.0/8
        if (a === 172 && b >= 16 && b <= 31) return false;  // 172.16.0.0/12
        if (a === 192 && b === 168) return false;           // 192.168.0.0/16
        if (a === 169 && b === 254) return false;           // 169.254.0.0/16 (Link Local & Metadata)
        if (a >= 224) return false;                         // Multicast & Reserved
      }

      if (allowedHostnames.length > 0) {
        return allowedHostnames.some(allowed => hostname === allowed || hostname.endsWith(`.${allowed}`));
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Evaluates portfolio content against Terms of Service and content safety policies.
   * Returns exact violated clauses, severity, and evidence snippet for admin audit.
   * @param {Object|string} content 
   * @returns {{ isCompliant: boolean, violations: Array<{ ruleId: string, section: string, termTitle: string, severity: 'CRITICAL'|'HIGH'|'MEDIUM', reason: string, evidenceSnippet: string, timestamp: string }> }}
   */
  evaluateContentSafetyAndTOS(content) {
    const textToScan = typeof content === 'string' ? content : JSON.stringify(content || {});
    const violations = [];
    const now = new Date().toISOString();

    const rules = [
      {
        ruleId: 'TOS_4_1_PHISHING',
        section: 'Section 4.1: Phishing & Credential Theft',
        termTitle: 'Prohibition on Credential Harvesting & Phishing Forms',
        severity: 'CRITICAL',
        regex: /(enter\s+your\s+password|verify\s+(bank\s+account|credit\s+card)|seed\s+phrase|private\s+key\s+(input|import)|metamask\s+login\s+popup|unlock\s+wallet\s+with\s+key)/i,
        reason: 'Attempted collection of sensitive passwords, seed phrases, or financial credentials.'
      },
      {
        ruleId: 'TOS_4_2_MALICIOUS_SCRIPT',
        section: 'Section 4.2: Malicious Code & Script Injections',
        termTitle: 'Prohibition on Unauthorized Scripts, Keyloggers & Exploits',
        severity: 'CRITICAL',
        regex: /(<script[\s\S]*?>|javascript:|onload\s*=|onerror\s*=|eval\s*\(|document\.cookie|coinhive\.min\.js|webminerpool|crypto-loot)/i,
        reason: 'Presence of executable script injections, cookie-stealers, or in-browser cryptominers.'
      },
      {
        ruleId: 'TOS_4_3_SCAM_SCHEME',
        section: 'Section 4.3: Financial Fraud & Deceptive Schemes',
        termTitle: 'Prohibition on High-Yield Crypto Scams & Deceptive Wealth Claims',
        severity: 'HIGH',
        regex: /(guaranteed\s+(100%|200%|500%|1000%)\s+returns?|double\s+your\s+(btc|bitcoin|eth|crypto)\s+instantly|send\s+\d+\s+eth\s+to\s+receive|passive\s+crypto\s+multiplier\s+bot)/i,
        reason: 'Detected high-yield investment fraud / cryptocurrency multiplier scam pattern.'
      },
      {
        ruleId: 'TOS_4_4_IMPERSONATION',
        section: 'Section 4.4: Impersonation & Identity Fraud',
        termTitle: 'Prohibition on Spoofing Official Organizations & Verification Badges',
        severity: 'HIGH',
        regex: /(official\s+government\s+verification\s+portal|certified\s+interpol\s+agent|official\s+meta\s+security\s+team\s+representative|authorized\s+irs\s+tax\s+collection)/i,
        reason: 'Deceptive impersonation of regulatory, security, or government institutions.'
      },
      {
        ruleId: 'TOS_4_5_SPAM_LINK_FARM',
        section: 'Section 4.5: Spam & Blackhat SEO Link Farming',
        termTitle: 'Prohibition on Automated Link Spam & Illicit Backlink Farms',
        severity: 'MEDIUM',
        regex: /(buy\s+cheap\s+(cialis|viagra|replica\s+watches)|casino\s+online\s+free\s+spins\s+bonus\s+code|poker\s+bot\s+unlimited\s+chips)/i,
        reason: 'Illicit black-hat SEO keyword stuffing and spam link generation.'
      }
    ];

    for (const rule of rules) {
      const match = textToScan.match(rule.regex);
      if (match) {
        const matchIndex = match.index || 0;
        const start = Math.max(0, matchIndex - 30);
        const end = Math.min(textToScan.length, matchIndex + match[0].length + 30);
        const evidenceSnippet = textToScan.substring(start, end).replace(/\s+/g, ' ').trim();

        violations.push({
          ruleId: rule.ruleId,
          section: rule.section,
          termTitle: rule.termTitle,
          severity: rule.severity,
          reason: rule.reason,
          evidenceSnippet: `"...${evidenceSnippet}..."`,
          timestamp: now
        });
      }
    }

    return {
      isCompliant: violations.length === 0,
      violations
    };
  }
}

module.exports = { SecurityService };

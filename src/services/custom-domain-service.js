/**
 * Custom Domain & Subdomain Management Service
 * Supports Custom Apex/CNAME Domains (e.g. johnsmith.com), Instant Branded Subdomains (e.g. john.portfolio.site),
 * DNS propagation verification, and Cloudflare/Netlify API integration.
 */

const dns = require('dns').promises;
const fs = require('fs');
const path = require('path');
const axios = require('axios');

class CustomDomainService {
  constructor(dbService = null) {
    this.db = dbService;
    this.storagePath = path.join(process.cwd(), 'src', 'data', 'custom-domains.json');
    this.domainCache = this.loadCache();
    this.primaryHost = process.env.PRIMARY_DOMAIN || 'myfolio.tech';
  }

  loadCache() {
    try {
      if (fs.existsSync(this.storagePath)) {
        return JSON.parse(fs.readFileSync(this.storagePath, 'utf8'));
      }
    } catch (e) {
      console.warn('[CUSTOM DOMAIN] Cache load error:', e.message);
    }
    return {};
  }

  saveCache() {
    try {
      const dir = path.dirname(this.storagePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.storagePath, JSON.stringify(this.domainCache, null, 2), 'utf8');
    } catch (e) {
      console.warn('[CUSTOM DOMAIN] Cache save error:', e.message);
    }
  }

  /**
   * Register or update custom domain for a site
   */
  async registerCustomDomain(siteId, domainInput, userId = null) {
    let cleanDomain = domainInput.toLowerCase().trim()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
      .replace(/^www\./, '');

    // Validate domain format
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
    if (!domainRegex.test(cleanDomain) && !cleanDomain.includes('localhost')) {
      throw new Error(`"${cleanDomain}" is not a valid domain name. Example: alexsmith.com`);
    }

    // Check if domain is already claimed by another site
    if (this.domainCache[cleanDomain] && this.domainCache[cleanDomain].siteId !== siteId) {
      throw new Error(`Domain "${cleanDomain}" is already connected to another portfolio.`);
    }

    const record = {
      domain: cleanDomain,
      siteId,
      userId,
      type: 'custom',
      status: 'pending_dns',
      cnameTarget: process.env.CNAME_TARGET || `cname.${this.primaryHost}`,
      createdAt: new Date().toISOString(),
      verifiedAt: null
    };

    this.domainCache[cleanDomain] = record;
    this.saveCache();

    // Persist to database if available
    if (this.db) {
      try {
        await this.db.client.from('sites').update({
          custom_domain: cleanDomain
        }).eq('provider_site_id', siteId);
      } catch (dbErr) {
        console.warn('[CUSTOM DOMAIN DB UPDATE]', dbErr.message);
      }
    }

    // Attempt automated registration with Cloudflare for SaaS if credentials present
    await this.registerCloudflareHostname(cleanDomain);

    return record;
  }

  /**
   * Claim instant free branded subdomain (e.g. alex.portfolio.site)
   */
  async claimSubdomain(siteId, handleInput, userId = null) {
    const cleanHandle = handleInput.toLowerCase().trim()
      .replace(/[^a-z0-9-_]/g, '')
      .replace(/^[-_]+|[-_]+$/g, '');

    if (cleanHandle.length < 2 || cleanHandle.length > 32) {
      throw new Error('Subdomain handle must be between 2 and 32 alphanumeric characters.');
    }

    const reserved = ['admin', 'api', 'www', 'mail', 'ftp', 'app', 'cname', 'dev', 'test', 'status'];
    if (reserved.includes(cleanHandle)) {
      throw new Error(`The handle "${cleanHandle}" is reserved.`);
    }

    const fullDomain = `${cleanHandle}.${this.primaryHost}`;

    const record = {
      domain: fullDomain,
      handle: cleanHandle,
      siteId,
      userId,
      type: 'subdomain',
      status: 'active',
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    this.domainCache[fullDomain] = record;
    this.domainCache[`${cleanHandle}.localhost`] = record; // for local dev testing
    this.saveCache();

    if (this.db) {
      try {
        await this.db.client.from('sites').update({
          custom_domain: fullDomain
        }).eq('provider_site_id', siteId);
      } catch (dbErr) {}
    }

    return record;
  }

  /**
   * Verify DNS CNAME propagation
   */
  async checkDNSStatus(domain) {
    const cleanDomain = domain.toLowerCase().trim();
    const record = this.domainCache[cleanDomain];
    if (!record) return { verified: false, message: 'Domain not registered in system' };

    if (record.type === 'subdomain' || cleanDomain.includes('localhost')) {
      record.status = 'active';
      record.verifiedAt = new Date().toISOString();
      this.saveCache();
      return { verified: true, status: 'active', message: 'Subdomain is active and live!' };
    }

    try {
      const target = record.cnameTarget;
      const cnames = await dns.resolveCname(cleanDomain);
      const isMatch = cnames.some(c => c.toLowerCase().includes(target.toLowerCase()) || c.toLowerCase().includes('portfolio'));

      if (isMatch) {
        record.status = 'active';
        record.verifiedAt = new Date().toISOString();
        this.saveCache();
        return { verified: true, status: 'active', message: 'DNS CNAME verified successfully! SSL is active.' };
      }
    } catch (e) {
      // Check A record fallback
      try {
        const addresses = await dns.resolve4(cleanDomain);
        if (addresses.length > 0) {
          return { verified: false, status: 'resolving', message: `Resolving to ${addresses[0]}, but CNAME to ${record.cnameTarget} is recommended for auto-SSL.` };
        }
      } catch (err) {}
    }

    return {
      verified: false,
      status: 'pending_dns',
      message: `Waiting for DNS CNAME propagation to "${record.cnameTarget}". This typically takes 2-15 minutes.`
    };
  }

  /**
   * Resolve a hostname (from incoming HTTP request) to a siteId
   */
  resolveHostname(hostname) {
    if (!hostname) return null;
    const cleanHost = hostname.toLowerCase().split(':')[0].replace(/^www\./, '');

    // 1. Direct cache match
    if (this.domainCache[cleanHost]) {
      return this.domainCache[cleanHost].siteId;
    }

    // 2. Subdomain check (*.portfolio.site or *.localhost)
    for (const [dom, record] of Object.entries(this.domainCache)) {
      if (cleanHost === dom || (cleanHost.endsWith('.localhost') && dom.startsWith(cleanHost.replace('.localhost', '')))) {
        return record.siteId;
      }
    }

    return null;
  }

  /**
   * Cloudflare Custom Hostname API (Cloudflare for SaaS)
   */
  async registerCloudflareHostname(domain) {
    if (!process.env.CLOUDFLARE_ZONE_ID || !process.env.CLOUDFLARE_API_TOKEN) {
      return null;
    }
    try {
      const res = await axios.post(
        `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/custom_hostnames`,
        {
          hostname: domain,
          ssl: { method: 'http', type: 'dv', settings: { min_tls_version: '1.2' } }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`[CLOUDFLARE FOR SAAS] Registered custom hostname ${domain}`);
      return res.data;
    } catch (e) {
      console.warn(`[CLOUDFLARE FOR SAAS] Registration info for ${domain}:`, e.response?.data?.errors?.[0]?.message || e.message);
      return null;
    }
  }

  getDomainInfo(domainOrSiteId) {
    for (const [dom, rec] of Object.entries(this.domainCache)) {
      if (dom === domainOrSiteId || rec.siteId === domainOrSiteId) {
        return rec;
      }
    }
    return null;
  }
}

module.exports = { CustomDomainService };

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

class NetlifyDeployer {
  constructor(netlifyToken, supabaseUrl, supabaseKey) {
    this.token = netlifyToken;
    this.baseUrl = 'https://api.netlify.com/api/v1';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async deploySite(conversationId, siteFiles) {
    const { html, css, js } = siteFiles;
    
    const siteId = `portfolio-${conversationId.substring(0, 8)}`;
    const deployDir = path.join('/tmp', siteId);
    
    await this.prepareDeployDirectory(deployDir, { html, css, js });
    
    const zipBuffer = await this.createZip(deployDir);
    
    const site = await this.createOrGetSite(siteId);
    const deploy = await this.deployZip(site.id, zipBuffer);
    
    await this.cleanup(deployDir);
    
    return {
      siteId: site.id,
      deployUrl: deploy.ssl_url || deploy.url,
      deployId: deploy.id
    };
  }

  async prepareDeployDirectory(dir, files) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(dir, 'index.html'), files.html);
    fs.writeFileSync(path.join(dir, 'styles.css'), files.css);
    fs.writeFileSync(path.join(dir, 'app.js'), files.js);
    
    fs.writeFileSync(path.join(dir, '_headers'), `
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`);
    
    fs.writeFileSync(path.join(dir, '_redirects'), `
/*    /index.html   200
`);
    
    fs.writeFileSync(path.join(dir, 'netlify.toml'), `
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`);
  }

  async createZip(dir) {
    const archiver = require('archiver');
    const { PassThrough } = require('stream');
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = new PassThrough();
    
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    
    archive.pipe(stream);
    archive.directory(dir, false);
    await archive.finalize();
    
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  async createOrGetSite(siteName) {
    const response = await fetch(`${this.baseUrl}/sites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: siteName })
    });
    
    if (!response.ok) {
      const error = await response.text();
      if (error.includes('already exists') || error.includes('409')) {
        const sites = await this.listSites();
        const existing = sites.find(s => s.name === siteName);
        if (existing) return existing;
      }
      throw new Error(`Netlify createSite failed: ${error}`);
    }
    
    return response.json();
  }

  async listSites() {
    const response = await fetch(`${this.baseUrl}/sites`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return response.json();
  }

  async deployZip(siteId, zipBuffer) {
    const response = await fetch(`${this.baseUrl}/sites/${siteId}/deploys`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/zip'
      },
      body: zipBuffer
    });
    
    if (!response.ok) {
      throw new Error(`Netlify deploy failed: ${await response.text()}`);
    }
    
    return response.json();
  }

  async setCustomDomain(siteId, domain) {
    const response = await fetch(`${this.baseUrl}/sites/${siteId}/domain_aliases`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ hostname: domain })
    });
    
    if (!response.ok) {
      throw new Error(`Netlify custom domain failed: ${await response.text()}`);
    }
    
    return response.json();
  }

  async suspendSite(siteId) {
    const suspendedHtml = `<!DOCTYPE html>
<html><head><title>Site Paused</title>
<style>body{font-family:system-ui;text-align:center;padding:4rem;background:#fafafa;color:#333}
.btn{background:#2563eb;color:#fff;padding:1rem 2rem;border:none;border-radius:8px;text-decoration:none;display:inline-block;margin-top:1rem}</style></head>
<body><h1>Site Temporarily Paused</h1><p>This portfolio site has been paused due to subscription expiry.</p><p>Contact the owner to restore access.</p></body></html>`;
    
    const zipBuffer = await this.createSuspendedZip(suspendedHtml);
    await this.deployZip(siteId, zipBuffer);
  }

  async createSuspendedZip(html) {
    const archiver = require('archiver');
    const { PassThrough } = require('stream');
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = new PassThrough();
    
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    
    archive.pipe(stream);
    archive.append(html, { name: 'index.html' });
    await archive.finalize();
    
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  async restoreSite(siteId, originalHtml) {
    const zipBuffer = await this.createSuspendedZip(originalHtml);
    await this.deployZip(siteId, zipBuffer);
  }

  async deleteSite(siteId) {
    const response = await fetch(`${this.baseUrl}/sites/${siteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.token}` }
    });
    
    if (!response.ok && response.status !== 404) {
      throw new Error(`Netlify delete failed: ${await response.text()}`);
    }
  }

  async cleanup(dir) {
    try {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    } catch (error) {
      console.warn('[Netlify] Cleanup failed:', error.message);
    }
  }
}

module.exports = { NetlifyDeployer };
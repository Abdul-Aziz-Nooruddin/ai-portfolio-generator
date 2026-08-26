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

  cleanSlug(text) {
    if (!text) return '';
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 32);
  }

  generateCandidateSubdomains(name, role = '') {
    const baseName = this.cleanSlug(name) || 'portfolio';
    const cleanRole = this.cleanSlug(role);

    const candidates = [
      `${baseName}-portfolio`,
      baseName,
      cleanRole ? `${baseName}-${cleanRole}` : null,
      `${baseName}-dev`,
      `${baseName}-studio`,
      `${baseName}-site`,
      `${baseName}-${Math.floor(100 + Math.random() * 900)}`
    ].filter(Boolean);

    return [...new Set(candidates)];
  }

  async deploySite(conversationId, siteFilesOrHtml, maybeCss, maybeJs, maybeUserData) {
    let html, css, js, userData = {};
    if (typeof siteFilesOrHtml === 'object' && siteFilesOrHtml !== null && siteFilesOrHtml.html) {
      html = siteFilesOrHtml.html;
      css = siteFilesOrHtml.css || '';
      js = siteFilesOrHtml.js || '';
      userData = maybeCss || {};
    } else {
      html = siteFilesOrHtml || '';
      css = maybeCss || '';
      js = maybeJs || '';
      userData = maybeUserData || {};
    }

    const userName = userData.name || (userData.extracted_data && userData.extracted_data.name) || '';
    const userRole = userData.role || (userData.extracted_data && userData.extracted_data.role) || '';

    const siteId = `portfolio-${conversationId.substring(0, 8)}`;
    const deployDir = path.join('/tmp', siteId);
    
    await this.prepareDeployDirectory(deployDir, { html, css, js });
    
    const zipBuffer = await this.createZip(deployDir);
    
    const site = await this.createOrGetSite(siteId, userName, userRole);
    const deploy = await this.deployZip(site.id, zipBuffer);
    
    await this.cleanup(deployDir);
    
    const finalUrl = deploy.ssl_url || deploy.url || site.ssl_url || site.url || `https://${site.name}.netlify.app`;
    return {
      siteId: site.id,
      deployUrl: finalUrl,
      url: finalUrl,
      name: site.name,
      deployId: deploy.id
    };
  }

  async createOrGetSite(siteName, userName = '', userRole = '') {
    const candidates = this.generateCandidateSubdomains(userName || siteName, userRole);
    
    for (const nameCandidate of candidates) {
      try {
        const response = await fetch(`${this.baseUrl}/sites`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: nameCandidate })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`[NETLIFY] Created clean site: https://${nameCandidate}.netlify.app`);
          return data;
        }
      } catch (err) {
        console.warn(`[NETLIFY] Candidate "${nameCandidate}" unavailable, trying next candidate...`);
      }
    }

    // Fallback if named candidates are all taken
    const fallbackRes = await fetch(`${this.baseUrl}/sites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    if (fallbackRes.ok) return fallbackRes.json();

    const error = await fallbackRes.text();
    throw new Error(`Netlify createSite failed: ${error}`);
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
    
    return new Promise((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const stream = new PassThrough();
      const chunks = [];
      
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
      archive.on('error', reject);
      
      archive.pipe(stream);
      archive.directory(dir, false);
      archive.finalize();
    });
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
    
    return new Promise((resolve, reject) => {
      const archive = archiver('zip', { zlib: { level: 9 } });
      const stream = new PassThrough();
      const chunks = [];
      
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
      archive.on('error', reject);
      
      archive.pipe(stream);
      archive.append(html, { name: 'index.html' });
      archive.finalize();
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
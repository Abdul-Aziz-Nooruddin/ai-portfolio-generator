const { NetlifyDeployer } = require('./netlify-deployer');

class HostingProvider {
  constructor(netlifyToken, supabaseUrl, supabaseKey) {
    this.deployer = new NetlifyDeployer(netlifyToken, supabaseUrl, supabaseKey);
  }

  async createSite(clientId, siteConfig) {
    return { siteId: `portfolio-${clientId}`, url: null };
  }

  async deploy(clientId, siteFiles) {
    const result = await this.deployer.deploySite(clientId, siteFiles);
    return { deployUrl: result.deployUrl, siteId: result.siteId };
  }

  async setCustomDomain(siteId, domain) {
    return this.deployer.setCustomDomain(siteId, domain);
  }

  async suspend(clientId) {
    const siteId = `portfolio-${clientId}`;
    return this.deployer.suspendSite(siteId);
  }

  async restore(clientId, originalHtml) {
    const siteId = `portfolio-${clientId}`;
    return this.deployer.restoreSite(siteId, originalHtml);
  }

  async delete(clientId) {
    const siteId = `portfolio-${clientId}`;
    return this.deployer.deleteSite(siteId);
  }
}

module.exports = { HostingProvider, NetlifyDeployer };
/**
 * Web Design Provider
 * Provides access to external web design references and inspiration patterns with SSRF protection.
 */

const axios = require('axios');
const { ProviderInterface } = require('./provider-interface');

class WebDesignProvider extends ProviderInterface {
  constructor() {
    super('web-design-provider');
    this.allowedHosts = ['api.github.com', 'raw.githubusercontent.com'];
  }

  isAvailable() {
    return true;
  }

  isUrlAllowed(urlString) {
    try {
      const parsed = new URL(urlString);
      // Disallow private IPs, localhost, metadata IP
      if (
        parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '169.254.169.254' ||
        parsed.hostname.startsWith('192.168.') ||
        parsed.hostname.startsWith('10.')
      ) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  async fetchDesignEvidence(context = {}) {
    const referenceUrl = context.referenceUrl;
    if (!referenceUrl || !this.isUrlAllowed(referenceUrl)) {
      return {
        source: 'web-design-provider',
        available: false,
        patterns: [
          'Editorial typography with generous vertical rhythm',
          'Split-screen responsive dossier layout',
          'Monochrome high-contrast minimalism'
        ]
      };
    }

    try {
      const res = await axios.get(referenceUrl, { timeout: 3000, maxContentLength: 100 * 1024 });
      return {
        source: 'web-design-provider',
        available: true,
        data: typeof res.data === 'object' ? res.data : { rawLength: res.data.length }
      };
    } catch (err) {
      return {
        source: 'web-design-provider',
        available: false,
        error: err.message
      };
    }
  }

  async extractTokens(target) {
    return this.fetchDesignEvidence({ referenceUrl: target });
  }
}

module.exports = { WebDesignProvider };

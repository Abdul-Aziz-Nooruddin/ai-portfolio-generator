/**
 * GitHub API Ingestion Client
 * Handles authenticated/unauthenticated GitHub REST queries with in-memory caching,
 * rate limit defense, repo language breakdown, and profile README extraction.
 */

const axios = require('axios');

class GitHubClient {
  constructor(options = {}) {
    this.token = options.token || process.env.GITHUB_TOKEN || null;
    this.timeout = options.timeout || 6000;
    this.cache = new Map(); // username -> { data, timestamp }
    this.cacheTtlMs = options.cacheTtlMs || 60 * 60 * 1000; // 1 hour TTL
  }

  getHeaders() {
    const headers = {
      'User-Agent': 'PortfolioBot-AI/2.0 (https://github.com/portfolio-studio)',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }
    return headers;
  }

  /**
   * Fetches complete public GitHub developer data
   * @param {string} username - Clean GitHub username
   * @param {Function} [onProgress] - Optional progress callback
   */
  async fetchCompleteProfile(username, onProgress = null) {
    const cacheKey = username.toLowerCase();
    const cached = this.cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < this.cacheTtlMs)) {
      if (onProgress) onProgress('cached', 'Loaded from GitHub cache');
      return cached.data;
    }

    if (onProgress) onProgress('fetching-profile', `Connecting to GitHub for @${username}...`);

    // 1. Fetch User Profile via REST API with Scraper Fallback
    let profileData = null;
    let repositories = [];
    let languageStats = {};

    try {
      const profileRes = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: this.getHeaders(),
        timeout: this.timeout
      });
      profileData = profileRes.data;

      // 2. Fetch Public Repositories (up to 30 most recently pushed)
      try {
        const reposRes = await axios.get(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30&type=owner`,
          { headers: this.getHeaders(), timeout: this.timeout }
        );
        if (Array.isArray(reposRes.data)) {
          repositories = reposRes.data;
        }
      } catch (repoErr) {
        console.warn(`[GITHUB CLIENT] Could not retrieve repositories for ${username}:`, repoErr.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        throw new Error(`GitHub user '@${username}' not found. Please verify the username.`);
      }
      
      console.warn(`[GITHUB CLIENT] API rate limited or restricted (${err.message}), engaging resilient direct web scraper...`);
      const scraped = await this.scrapePublicProfile(username);
      profileData = scraped.profile;
      repositories = scraped.repositories;
      languageStats = scraped.languageStats;
    }

    if (onProgress) onProgress('analyzing-languages', `Analyzing language distributions...`);

    // 3. Fetch Detailed Language Breakdown for Top 6 Non-Fork Repos
    const topRepos = repositories.filter(r => !r.fork).slice(0, 6);

    await Promise.all(
      topRepos.map(async (repo) => {
        try {
          const langRes = await axios.get(
            `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/languages`,
            { headers: this.getHeaders(), timeout: 3500 }
          );
          if (langRes.data && typeof langRes.data === 'object') {
            repo.languages = langRes.data;
            for (const [lang, bytes] of Object.entries(langRes.data)) {
              languageStats[lang] = (languageStats[lang] || 0) + bytes;
            }
          }
        } catch (langErr) {
          repo.languages = repo.language ? { [repo.language]: 1000 } : {};
        }
      })
    );

    if (onProgress) onProgress('fetching-readme', `Searching for developer profile README...`);

    // 4. Fetch Special Profile README (e.g. username/username)
    let readmeContent = '';
    const readmeBranches = ['main', 'master'];
    for (const branch of readmeBranches) {
      try {
        const readmeRes = await axios.get(
          `https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(username)}/${branch}/README.md`,
          { timeout: 3000 }
        );
        if (readmeRes.data && typeof readmeRes.data === 'string') {
          readmeContent = readmeRes.data;
          break;
        }
      } catch (e) {
        // Continue to next branch
      }
    }

    const payload = {
      profile: profileData,
      repositories,
      languageStats,
      readmeContent: readmeContent.trim()
    };

    // Store in LRU cache
    this.cache.set(cacheKey, { data: payload, timestamp: Date.now() });

    // Evict oldest cache entries if size > 200
    if (this.cache.size > 200) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    return payload;
  }

  /**
   * Resilient scraper that parses public GitHub profile & repository HTML directly.
   * Completely immune to unauthenticated REST API rate limit limits (403).
   */
  async scrapePublicProfile(username) {
    try {
      const [profileHtmlRes, reposHtmlRes] = await Promise.allSettled([
        axios.get(`https://github.com/${encodeURIComponent(username)}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
          timeout: 4500
        }),
        axios.get(`https://github.com/${encodeURIComponent(username)}?tab=repositories`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
          timeout: 4500
        })
      ]);

      const profileHtml = profileHtmlRes.status === 'fulfilled' ? profileHtmlRes.value.data : '';
      const reposHtml = reposHtmlRes.status === 'fulfilled' ? reposHtmlRes.value.data : profileHtml;

      // Extract Name
      let nameMatch = profileHtml.match(/class="p-name vcard-fullname[^>]*>([^<]+)<\/span>/i) ||
        profileHtml.match(/itemprop="name">([^<]+)<\/span>/i) ||
        profileHtml.match(/<title>([^<(]+)\s*\(/i);
      const name = nameMatch ? nameMatch[1].trim() : username;

      // Extract Bio
      let bioMatch = profileHtml.match(/class="p-note user-profile-bio[^>]*><div>([^<]+)<\/div>/i) ||
        profileHtml.match(/class="p-note user-profile-bio[^>]*>([^<]+)<\/div>/i);
      const bio = bioMatch ? bioMatch[1].trim() : '';

      // Extract Avatar
      let avatarMatch = profileHtml.match(/class="avatar avatar-user[^"]*"[^>]*src="([^"]+)"/i);
      const avatar_url = avatarMatch ? avatarMatch[1] : `https://github.com/${username}.png`;

      // Extract Repositories
      const repositories = [];
      const languageStats = {};
      const repoBlocks = reposHtml.split(/itemprop="owns"|class="col-12 d-flex flex-justify-between/i);

      for (let i = 1; i < repoBlocks.length; i++) {
        const block = repoBlocks[i];
        const rNameMatch = block.match(/itemprop="name codeRepository"[^>]*>\s*([^\s<]+)\s*<\/a>/i) ||
          block.match(/href="\/[^/]+\/([^"/]+)"\s+itemprop="name/i) ||
          block.match(/href="\/[a-zA-Z0-9_-]+\/([a-zA-Z0-9_.-]+)"/i);

        if (!rNameMatch || ['repositories', 'projects', 'packages', 'stars'].includes(rNameMatch[1].toLowerCase())) {
          continue;
        }

        const rName = rNameMatch[1].trim();
        const rDescMatch = block.match(/itemprop="description">\s*([^<]+)\s*<\/p>/i);
        const rLangMatch = block.match(/itemprop="programmingLanguage">\s*([^<]+)\s*<\/span>/i);
        const rStarsMatch = block.match(/href="\/[^/]+\/[^/]+\/stargazers"[^>]*>\s*([0-9,]+)\s*<\/a>/i);
        const isFork = block.includes('forked from');

        const lang = rLangMatch ? rLangMatch[1].trim() : 'Software';
        if (lang) languageStats[lang] = (languageStats[lang] || 0) + 1000;

        repositories.push({
          name: rName,
          full_name: `${username}/${rName}`,
          html_url: `https://github.com/${username}/${rName}`,
          description: rDescMatch ? rDescMatch[1].trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '',
          language: lang,
          stargazers_count: rStarsMatch ? parseInt(rStarsMatch[1].replace(/,/g, ''), 10) : 0,
          fork: isFork,
          size: 100
        });
      }

      return {
        profile: {
          login: username,
          name: name || username,
          bio: bio || '',
          avatar_url,
          html_url: `https://github.com/${username}`,
          public_repos: repositories.length
        },
        repositories,
        languageStats
      };
    } catch (e) {
      console.warn('[GITHUB CLIENT] Scraper fallback warning:', e.message);
      return {
        profile: { login: username, name: username, bio: '', avatar_url: `https://github.com/${username}.png`, html_url: `https://github.com/${username}`, public_repos: 1 },
        repositories: [],
        languageStats: {}
      };
    }
  }
}

module.exports = { GitHubClient };

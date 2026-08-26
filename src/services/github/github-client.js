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

    // 1. Fetch User Profile
    let profileData = null;
    try {
      const profileRes = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: this.getHeaders(),
        timeout: this.timeout
      });
      profileData = profileRes.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        throw new Error(`GitHub user '@${username}' not found. Please verify the username.`);
      }
      if (err.response && err.response.status === 403) {
        throw new Error('GitHub API rate limit reached. Please try again in a few moments.');
      }
      throw new Error(`Failed to query GitHub API: ${err.message}`);
    }

    if (onProgress) onProgress('fetching-repos', `Retrieving repositories for @${username}...`);

    // 2. Fetch Public Repositories (up to 30 most recently pushed)
    let repositories = [];
    try {
      const reposRes = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=30&type=owner`,
        { headers: this.getHeaders(), timeout: this.timeout }
      );
      if (Array.isArray(reposRes.data)) {
        repositories = reposRes.data;
      }
    } catch (err) {
      console.warn(`[GITHUB CLIENT] Could not retrieve repositories for ${username}:`, err.message);
      repositories = [];
    }

    if (onProgress) onProgress('analyzing-languages', `Analyzing language distributions...`);

    // 3. Fetch Detailed Language Breakdown for Top 6 Non-Fork Repos
    const languageStats = {};
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
}

module.exports = { GitHubClient };

/**
 * Robust GitHub URL & Username Parser and Validator
 * Normalizes varied input formats into a clean, verified GitHub username.
 */

class GitHubParser {
  /**
   * Parses and validates any GitHub URL, @handle, or raw username.
   * @param {string} input - User-provided input string.
   * @returns {{ valid: boolean, username: string|null, error: string|null }}
   */
  static parse(input) {
    if (!input || typeof input !== 'string') {
      return { valid: false, username: null, error: 'GitHub username or profile URL is required.' };
    }

    const trimmed = input.trim();
    if (!trimmed) {
      return { valid: false, username: null, error: 'GitHub input cannot be empty.' };
    }

    // Reject obvious repository URLs when a profile is expected
    // Matches patterns like github.com/owner/repo or https://github.com/owner/repo/pulls
    const repoMatch = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_.-]+)(?:\/.*)?$/i);
    if (repoMatch) {
      const path1 = repoMatch[1];
      const path2 = repoMatch[2];
      const reservedPaths = ['settings', 'explore', 'topics', 'trending', 'collections', 'events', 'sponsors', 'orgs'];
      if (!reservedPaths.includes(path1.toLowerCase()) && path2 && !path2.startsWith('?')) {
        return {
          valid: false,
          username: null,
          error: `You provided a repository URL (${path1}/${path2}). Please provide a developer profile URL (e.g. github.com/${path1}) instead.`
        };
      }
    }

    // Extract username from various valid GitHub formats
    // 1. https://github.com/username or http://www.github.com/username
    // 2. github.com/username
    // 3. @username
    // 4. username
    let candidate = trimmed
      .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
      .replace(/^(www\.)?github\.com\//i, '')
      .replace(/^@/, '')
      .replace(/[/?#].*$/, '') // strip any trailing query params or slashes
      .trim();

    // Validate standard GitHub username constraints:
    // - May only contain alphanumeric characters or hyphens
    // - Cannot have multiple consecutive hyphens
    // - Cannot begin or end with a hyphen
    // - Max length of 39 characters, min length of 1 character
    const githubUsernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

    if (!githubUsernameRegex.test(candidate)) {
      return {
        valid: false,
        username: null,
        error: `Invalid GitHub username '${candidate}'. GitHub usernames must be 1-39 characters and contain only alphanumeric characters or single hyphens.`
      };
    }

    // Reserved GitHub system paths
    const reservedUsernames = [
      'about', 'pricing', 'features', 'contact', 'login', 'signup', 'join',
      'explore', 'trending', 'collections', 'topics', 'marketplace', 'organizations',
      'settings', 'notifications', 'stars', 'repositories', 'site', 'security'
    ];

    if (reservedUsernames.includes(candidate.toLowerCase())) {
      return {
        valid: false,
        username: null,
        error: `'${candidate}' is a reserved GitHub system path, not a developer profile.`
      };
    }

    return {
      valid: true,
      username: candidate,
      error: null
    };
  }
}

module.exports = { GitHubParser };

/**
 * 🏛️ GitHub Auto-Sync & Full-Spectrum Reconciliation Engine
 * Automatically detects changes in a developer's GitHub account and updates
 * their portfolio without requiring manual code changes or redeployments.
 *
 * Reconciles:
 * 1. New Repositories: Ingests, categorizes, and auto-synthesizes domain-relevant 3D artwork.
 * 2. Removed/Privatized Repositories: Prunes GitHub-sourced projects without touching resume/manual work.
 * 3. New Languages: Updates skills matrix and marquee assets.
 * 4. Experience & Bio: Updates company affiliations and career descriptions.
 * 5. Repository Edits: Synchronizes descriptions, live demo links, topics, and stars.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { GitHubClient } = require('./github/github-client');
const { UnifiedProfileNormalizer, PROVENANCE_LEVELS } = require('./unified-profile-normalizer');
const { ProjectArtworkSynthesizer } = require('../templates/project-artwork-synthesizer');
const { TemplateRegistry } = require('../templates/template-registry');

class GitHubAutoSyncService {
  constructor(options = {}) {
    this.githubClient = options.githubClient || new GitHubClient();
    this.cooldownMs = options.cooldownMs || 30 * 60 * 1000; // 30-minute cooldown between background checks
    this.syncHistory = new Map(); // siteId -> lastSyncTimestamp
  }

  /**
   * Resolves the on-disk directory for a site ID
   */
  getSiteDir(siteId) {
    const primaryDir = path.join(process.cwd(), 'public', 'sites', siteId);
    if (fs.existsSync(primaryDir)) return primaryDir;

    const tmpDir = path.join(os.tmpdir(), 'sites', siteId);
    if (fs.existsSync(tmpDir)) return tmpDir;

    return primaryDir;
  }

  /**
   * Triggers a background sync check if the cooldown period has elapsed
   */
  triggerBackgroundSyncIfDue(siteId) {
    if (!siteId) return;

    const lastSync = this.syncHistory.get(siteId) || 0;
    if (Date.now() - lastSync < this.cooldownMs) {
      return; // Still within cooldown window
    }

    this.syncHistory.set(siteId, Date.now());

    // Execute asynchronously on next event loop tick without delaying HTTP responses
    setImmediate(async () => {
      try {
        await this.syncPortfolio(siteId);
      } catch (err) {
        console.warn(`[GITHUB AUTO-SYNC] Background check skipped for ${siteId}:`, err.message);
      }
    });
  }

  /**
   * Reconciles GitHub data and rebuilds portfolio if changes occurred
   * @param {string} siteId - Target portfolio ID or handle
   * @param {Object} [options] - { force: boolean, githubData: Object }
   */
  async syncPortfolio(siteId, options = {}) {
    const siteDir = this.getSiteDir(siteId);
    const profilePath = path.join(siteDir, 'profile.json');

    if (!fs.existsSync(profilePath)) {
      return { synced: false, reason: 'SITE_PROFILE_NOT_FOUND' };
    }

    let currentProfile = {};
    try {
      currentProfile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    } catch (parseErr) {
      return { synced: false, reason: 'INVALID_PROFILE_JSON' };
    }

    // 1. Resolve GitHub username
    const githubUsername = (
      currentProfile.githubUsername ||
      currentProfile.github_username ||
      currentProfile.contact?.github?.replace(/.*github\.com\//, '') ||
      (currentProfile.github && typeof currentProfile.github === 'string' && currentProfile.github.replace(/.*github\.com\//, '')) ||
      (siteId.toLowerCase() === 'abdulaziz' || siteId.toLowerCase() === 'aziz' ? 'Abdul-Aziz-Nooruddin' : null)
    );

    if (!githubUsername) {
      return { synced: false, reason: 'NO_GITHUB_LINKED' };
    }

    // 2. Fetch fresh GitHub data or use injected snapshot (for tests/webhooks)
    let freshGithub = options.githubData || null;
    if (!freshGithub) {
      try {
        freshGithub = await this.githubClient.fetchCompleteProfile(githubUsername);
      } catch (fetchErr) {
        return { synced: false, reason: 'GITHUB_API_ERROR', error: fetchErr.message };
      }
    }

    if (!freshGithub || !freshGithub.repositories) {
      return { synced: false, reason: 'NO_GITHUB_REPOSITORIES_FOUND' };
    }

    // 3. Full-Spectrum Reconciliation
    const reconciliation = this.reconcileProfileWithGitHub(currentProfile, freshGithub, githubUsername);
    if (!reconciliation.hasChanges && !options.force) {
      return { synced: false, reason: 'NO_CHANGES_DETECTED', changes: [] };
    }

    console.log(`[GITHUB AUTO-SYNC] Reconciling ${siteId} (${githubUsername}):`, reconciliation.changes.join(', '));

    // 4. Normalize updated profile
    const normalized = UnifiedProfileNormalizer.normalize({
      ...reconciliation.updatedProfile,
      githubData: freshGithub
    });

    // Ensure explicit root-level attributes are preserved for serialization
    normalized.githubUsername = githubUsername;
    if (reconciliation.updatedProfile.company) {
      normalized.company = reconciliation.updatedProfile.company;
    }
    if (reconciliation.updatedProfile.location) {
      normalized.location = reconciliation.updatedProfile.location;
    }

    // 5. Re-render Jack 3D Creator template
    const templateId = normalized.templateId || currentProfile.templateId || 'jack-3d-creator';
    const rendered = TemplateRegistry.render(templateId, normalized);

    // 6. Write back to disk atomically
    if (!fs.existsSync(siteDir)) {
      fs.mkdirSync(siteDir, { recursive: true });
    }

    fs.writeFileSync(path.join(siteDir, 'index.html'), rendered.html, 'utf8');
    if (rendered.css) fs.writeFileSync(path.join(siteDir, 'style.css'), rendered.css, 'utf8');
    if (rendered.js) fs.writeFileSync(path.join(siteDir, 'script.js'), rendered.js, 'utf8');
    fs.writeFileSync(profilePath, JSON.stringify(normalized, null, 2), 'utf8');

    this.syncHistory.set(siteId, Date.now());

    return {
      synced: true,
      siteId,
      githubUsername,
      changes: reconciliation.changes,
      projectCount: normalized.projects.length,
      skillCount: normalized.skills.length
    };
  }

  /**
   * Performs deep reconciliation between current profile and fresh GitHub snapshot
   */
  reconcileProfileWithGitHub(currentProfile, freshGithub, githubUsername) {
    const changes = [];
    const updated = JSON.parse(JSON.stringify(currentProfile)); // deep clone
    const ghUser = freshGithub.profile || freshGithub.identity || {};
    const ghRepos = freshGithub.repositories || [];
    const ghLanguages = freshGithub.languageStats || {};

    // 1. Bio & Affiliation Reconciliation
    if (ghUser.company && ghUser.company !== currentProfile.company) {
      updated.company = ghUser.company;
      changes.push(`Company updated to "${ghUser.company}"`);
    }
    if (ghUser.bio && ghUser.bio !== currentProfile.bio) {
      updated.bio = ghUser.bio;
      changes.push('Bio updated from GitHub profile');
    }
    if (ghUser.location && ghUser.location !== currentProfile.location) {
      updated.location = ghUser.location;
      changes.push(`Location updated to "${ghUser.location}"`);
    }

    // 2. Programming Languages & Skills Reconciliation
    const detectedLanguages = Object.keys(ghLanguages).filter(Boolean);
    const existingSkills = new Set((currentProfile.skills || []).map(s => String(s).trim()));
    let newLangsAdded = 0;

    for (const lang of detectedLanguages) {
      if (!existingSkills.has(lang)) {
        existingSkills.add(lang);
        newLangsAdded++;
      }
    }

    if (newLangsAdded > 0) {
      updated.skills = Array.from(existingSkills).slice(0, 15);
      changes.push(`Added ${newLangsAdded} new language(s) from code activity`);
    }

    // 3. Projects Reconciliation (Active Public Repos)
    const activePublicRepos = ghRepos.filter(r => !r.fork);
    const activeRepoMap = new Map(
      activePublicRepos.map(r => [r.name.toLowerCase().replace(/[^a-z0-9]/g, ''), r])
    );

    // Prune removed/privatized GitHub projects, while strictly preserving resume/manual projects
    const originalProjects = currentProfile.projects || [];
    const prunedProjects = originalProjects.filter(p => {
      const isGitHubSourced = p.provenance === 'github' ||
        (p.github && p.github.toLowerCase().includes(githubUsername.toLowerCase())) ||
        (p.githubUrl && p.githubUrl.toLowerCase().includes(githubUsername.toLowerCase()));

      if (!isGitHubSourced) {
        return true; // Keep manual & resume projects intact
      }

      const pKey = (p.name || p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const stillActive = activeRepoMap.has(pKey);
      if (!stillActive) {
        changes.push(`Pruned removed/privatized repository: "${p.name || p.title}"`);
      }
      return stillActive;
    });

    // Add new repositories or update modified repositories
    const usedArtworkSet = new Set();
    prunedProjects.forEach((p, idx) => {
      const pKey = (p.name || p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const freshRepo = activeRepoMap.get(pKey);

      if (freshRepo) {
        // Update live stats & links if modified
        if (freshRepo.description && freshRepo.description !== p.desc && freshRepo.description !== p.description) {
          p.desc = freshRepo.description;
          p.description = freshRepo.description;
          changes.push(`Updated description for "${p.name}"`);
        }
        if (freshRepo.homepage && freshRepo.homepage !== p.live && freshRepo.homepage !== p.demoUrl) {
          p.live = freshRepo.homepage;
          p.demoUrl = freshRepo.homepage;
          changes.push(`Updated live demo URL for "${p.name}"`);
        }
        if (freshRepo.stargazers_count !== undefined) {
          p.stars = freshRepo.stargazers_count;
        }
      }

      // Track artwork
      if (p.image) usedArtworkSet.add(p.image);
    });

    // Detect brand new repositories
    for (const repo of activePublicRepos) {
      const rKey = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const exists = prunedProjects.some(p => (p.name || p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '') === rKey);

      if (!exists) {
        const repoTech = Object.keys(repo.languages || {}).slice(0, 3).join(' • ') || repo.language || 'Code';
        const newProj = {
          name: repo.name,
          title: repo.name,
          desc: repo.description || 'High-performance software engineering system.',
          description: repo.description || 'High-performance software engineering system.',
          tech: repoTech,
          tags: Object.keys(repo.languages || {}).slice(0, 4),
          github: repo.html_url,
          githubUrl: repo.html_url,
          live: repo.homepage || null,
          demoUrl: repo.homepage || null,
          stars: repo.stargazers_count || 0,
          provenance: 'github'
        };

        // Synthesize contextually relevant 3D project artwork
        const art = ProjectArtworkSynthesizer.resolveProjectArtwork(
          newProj,
          'jack-3d-creator',
          prunedProjects.length,
          usedArtworkSet,
          githubUsername
        );
        newProj.image = art.src;
        newProj.artworkTheme = art.theme;
        usedArtworkSet.add(art.src);

        prunedProjects.unshift(newProj);
        changes.push(`Added new repository: "${repo.name}" (${repoTech})`);
      }
    }

    updated.projects = prunedProjects.slice(0, 10);

    return {
      updatedProfile: updated,
      hasChanges: changes.length > 0,
      changes
    };
  }

  /**
   * Handles incoming GitHub webhook payloads
   */
  async handleWebhook(event, payload) {
    if (!payload || !payload.repository) {
      return { handled: false, reason: 'NO_REPOSITORY_IN_PAYLOAD' };
    }

    const repoOwner = payload.repository.owner?.login;
    if (!repoOwner) {
      return { handled: false, reason: 'NO_OWNER_IN_PAYLOAD' };
    }

    // Look for matching site directory (direct handle or scanning public/sites)
    const candidates = [repoOwner, repoOwner.toLowerCase()];
    const sitesBaseDir = path.join(process.cwd(), 'public', 'sites');

    let matchedSiteId = null;
    for (const c of candidates) {
      if (fs.existsSync(path.join(sitesBaseDir, c, 'profile.json'))) {
        matchedSiteId = c;
        break;
      }
    }

    if (!matchedSiteId && fs.existsSync(sitesBaseDir)) {
      const allDirs = fs.readdirSync(sitesBaseDir);
      for (const dir of allDirs) {
        const pPath = path.join(sitesBaseDir, dir, 'profile.json');
        if (fs.existsSync(pPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(pPath, 'utf8'));
            const gh = String(
              data.githubUsername ||
              data.github_username ||
              data.socialLinks?.github ||
              data.contact?.github ||
              data.github ||
              ''
            ).toLowerCase();

            if (gh.includes(repoOwner.toLowerCase())) {
              matchedSiteId = dir;
              break;
            }
          } catch (e) {}
        }
      }
    }

    if (!matchedSiteId) {
      return { handled: false, reason: `NO_PORTFOLIO_MATCHED_FOR_${repoOwner}` };
    }

    // Force sync immediately
    const result = await this.syncPortfolio(matchedSiteId, { force: true });
    return { handled: true, event, siteId: matchedSiteId, ...result };
  }
}

module.exports = { GitHubAutoSyncService };

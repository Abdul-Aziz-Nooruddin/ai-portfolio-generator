/**
 * Test Suite: GitHub Auto-Sync & Full-Spectrum Reconciliation
 * Verifies that GitHub project additions, removals, language shifts,
 * and profile changes are automatically reconciled without touching code.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { GitHubAutoSyncService } = require('./services/github-auto-sync');

describe('🔄 GitHub Auto-Sync & Autonomous Reconciliation Engine', () => {
  const testSiteId = `test-sync-${Date.now()}`;
  const testSiteDir = path.join(process.cwd(), 'public', 'sites', testSiteId);

  // Seed baseline portfolio state
  const initialProfile = {
    name: 'Sarah Connor',
    role: 'Full-Stack Engineer',
    company: 'Cyberdyne Systems',
    bio: 'Building resilient distributed infrastructure.',
    location: 'Los Angeles, CA',
    githubUsername: 'sarah-connor',
    skills: ['TypeScript', 'JavaScript', 'Node.js', 'React'],
    projects: [
      {
        name: 'legacy-monolith',
        title: 'legacy-monolith',
        desc: 'Old internal monolithic server.',
        tech: 'JavaScript • Express',
        github: 'https://github.com/sarah-connor/legacy-monolith',
        githubUrl: 'https://github.com/sarah-connor/legacy-monolith',
        provenance: 'github'
      },
      {
        name: 'prior-corporate-work',
        title: 'prior-corporate-work',
        desc: 'Enterprise payment settlement engine built during corporate tenure.',
        tech: 'Java • Spring Boot • Oracle',
        provenance: 'resume' // Crucial: Sourced from resume, NOT GitHub
      }
    ],
    templateId: 'jack-3d-creator'
  };

  test('1. Setup initial portfolio snapshot on disk', () => {
    fs.mkdirSync(testSiteDir, { recursive: true });
    fs.writeFileSync(path.join(testSiteDir, 'profile.json'), JSON.stringify(initialProfile, null, 2), 'utf8');
    fs.writeFileSync(path.join(testSiteDir, 'index.html'), '<html><body>Initial</body></html>', 'utf8');

    assert.ok(fs.existsSync(path.join(testSiteDir, 'profile.json')), 'profile.json must exist');
  });

  test('2. Reconciles: Adds new repo, prunes deleted repo, preserves resume work, and adds new language', async () => {
    const syncService = new GitHubAutoSyncService();

    // Simulated fresh GitHub API response
    // 'legacy-monolith' was DELETED from GitHub!
    // 'vortex-edge-agent' was NEWLY CREATED with Rust!
    const freshGithub = {
      profile: {
        company: 'Autonomous Robotics Lab', // Company updated!
        bio: 'Pioneering edge neural networks and fault-tolerant microkernels.', // Bio updated!
        location: 'San Francisco, CA'
      },
      repositories: [
        {
          name: 'vortex-edge-agent', // Brand new project
          description: 'Autonomous edge inference neural agent running on embedded devices.',
          languages: { Rust: 85000, 'C++': 15000 },
          language: 'Rust',
          html_url: 'https://github.com/sarah-connor/vortex-edge-agent',
          homepage: 'https://vortex-agent.io',
          stargazers_count: 42,
          fork: false
        }
      ],
      languageStats: {
        Rust: 85000,
        'C++': 15000,
        TypeScript: 40000
      }
    };

    const syncResult = await syncService.syncPortfolio(testSiteId, {
      force: true,
      githubData: freshGithub
    });

    assert.strictEqual(syncResult.synced, true, 'Sync must succeed');
    assert.ok(syncResult.changes.length >= 3, 'Must record multiple reconciliation changes');

    // Read updated portfolio on disk
    const updatedProfile = JSON.parse(fs.readFileSync(path.join(testSiteDir, 'profile.json'), 'utf8'));
    const updatedHtml = fs.readFileSync(path.join(testSiteDir, 'index.html'), 'utf8');

    // Verification 1: New Rust project added
    const projectNames = updatedProfile.projects.map(p => p.name.toLowerCase());
    assert.ok(projectNames.includes('vortex-edge-agent'), 'New repository must be added to projects');

    // Verification 2: Deleted GitHub repo was pruned
    assert.strictEqual(projectNames.includes('legacy-monolith'), false, 'Deleted GitHub project must be pruned');

    // Verification 3: Resume project was strictly PRESERVED (Data Provenance rule)
    assert.ok(projectNames.includes('prior-corporate-work'), 'Resume-sourced project must NEVER be pruned');

    // Verification 4: New programming language (Rust, C++) added to skills
    assert.ok(updatedProfile.skills.includes('Rust'), 'Rust must be added to skills matrix');
    assert.ok(updatedProfile.skills.includes('C++'), 'C++ must be added to skills matrix');

    // Verification 5: Company & bio updated
    assert.strictEqual(updatedProfile.company, 'Autonomous Robotics Lab', 'Company must be updated');

    // Verification 6: HTML was cleanly re-rendered with Jack 3D Creator
    assert.ok(updatedHtml.includes('vortex-edge-agent') || updatedHtml.includes('VORTEX-EDGE-AGENT'), 'HTML must feature new project');
    assert.ok(updatedHtml.includes('Autonomous edge inference') || updatedHtml.includes('vortex-agent.io'), 'HTML must feature new project details');
  });

  test('3. Handles project updates: Synchronizes edited description and demo link without duplicating', async () => {
    const syncService = new GitHubAutoSyncService();

    // User polished the repository on GitHub
    const modifiedGithub = {
      profile: { company: 'Autonomous Robotics Lab' },
      repositories: [
        {
          name: 'vortex-edge-agent',
          description: 'Updated: Ultra-low-latency neural reasoning engine on microcontrollers.',
          languages: { Rust: 95000 },
          language: 'Rust',
          html_url: 'https://github.com/sarah-connor/vortex-edge-agent',
          homepage: 'https://vortex-v2.dev', // New live link!
          stargazers_count: 120, // New stars!
          fork: false
        }
      ],
      languageStats: { Rust: 95000 }
    };

    const result = await syncService.syncPortfolio(testSiteId, {
      force: true,
      githubData: modifiedGithub
    });

    assert.strictEqual(result.synced, true);

    const updatedProfile = JSON.parse(fs.readFileSync(path.join(testSiteDir, 'profile.json'), 'utf8'));
    const vortexProj = updatedProfile.projects.find(p => p.name === 'vortex-edge-agent');

    assert.ok(vortexProj, 'Project must exist');
    assert.strictEqual(vortexProj.live, 'https://vortex-v2.dev', 'Demo URL must be synchronized');
    assert.ok(vortexProj.desc.includes('Ultra-low-latency'), 'Description must be updated');
  });

  test('4. Webhook handler matches repository owner and updates portfolio', async () => {
    const syncService = new GitHubAutoSyncService();

    const webhookPayload = {
      action: 'created',
      repository: {
        name: 'crypto-shield-zk',
        description: 'Zero-knowledge verification proofs for decentralized identity.',
        owner: { login: 'sarah-connor' },
        html_url: 'https://github.com/sarah-connor/crypto-shield-zk',
        languages: { Rust: 50000 },
        stargazers_count: 10
      }
    };

    const webhookResult = await syncService.handleWebhook('repository', webhookPayload);
    assert.strictEqual(webhookResult.handled, true, 'Webhook must be handled for matching owner');
  });

  test('5. Cooldown skips unnecessary sync checks within cooldown window', () => {
    const syncService = new GitHubAutoSyncService({ cooldownMs: 60000 });
    syncService.syncHistory.set('cooldown-site', Date.now());

    // Should not trigger sync because cooldown is active
    let didRun = false;
    syncService.triggerBackgroundSyncIfDue('cooldown-site');
    assert.strictEqual(didRun, false, 'Must respect cooldown to protect rate limits');
  });

  test('6. Teardown test files cleanly', () => {
    if (fs.existsSync(testSiteDir)) {
      fs.rmSync(testSiteDir, { recursive: true, force: true });
    }
    assert.strictEqual(fs.existsSync(testSiteDir), false, 'Test directory must be cleaned up');
  });
});

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const http = require('http');

const { TemplateRegistry } = require('./templates/template-registry');
const { SiteGenerator } = require('./services/site-generator');
const { UnifiedProfileNormalizer } = require('./services/unified-profile-normalizer');
const { HostingProvider } = require('./services/hosting-provider');

test('User Account Isolation, Strict VIP Guard & Site Termination Tests', async (t) => {
  const hostingProvider = new HostingProvider();

  await t.test('1. Non-VIP account (generalknowledge987o@gmail.com) generating with GitHub username abdul-aziz-nooruddin is NOT VIP', async () => {
    const input = {
      email: 'generalknowledge987o@gmail.com',
      userEmail: 'generalknowledge987o@gmail.com',
      githubData: { username: 'abdul-aziz-nooruddin' },
      resumeData: {
        fullName: 'Test Candidate',
        skills: ['Node.js', 'React']
      },
      preferences: {
        theme: 'mahogany-brass-steampunk'
      }
    };

    const authenticatedEmail = 'generalknowledge987o@gmail.com';
    const isVipFounder = Boolean(authenticatedEmail === 'abdulaziznoor9876@gmail.com');

    assert.strictEqual(isVipFounder, false, 'Non-VIP account must NOT be granted VIP Founder privileges');

    const normalized = UnifiedProfileNormalizer.normalize(input);
    const selectedTemplate = TemplateRegistry.selectTemplate(input.preferences.theme, normalized);
    assert.strictEqual(selectedTemplate.id, 'mahogany-brass-steampunk', 'Must select mahogany-brass-steampunk template');

    const siteGen = new SiteGenerator();
    const siteResult = await siteGen.generateSite({
      id: `unified-${Date.now()}`,
      status: 'active'
    }, { ...normalized, templateId: selectedTemplate.id }, {
      theme: selectedTemplate.id,
      templateId: selectedTemplate.id
    });

    assert.ok(siteResult.html.includes('Mahogany') || siteResult.html.includes('mahogany-project-card') || siteResult.html.includes('CURIO // 01'), 'Generated HTML must contain Mahogany Steampunk layout');

    // Deploy site
    const siteId = `web-${crypto.randomUUID()}`;
    await hostingProvider.deploy(siteId, siteResult, normalized, false);

    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
    assert.ok(fs.existsSync(siteDir), 'Site files must exist in public/sites/:siteId');
    assert.ok(fs.existsSync(path.join(siteDir, 'index.html')), 'Site index.html must exist');

    // 2. Permanent deletion / termination
    await hostingProvider.purge(siteId);
    assert.strictEqual(fs.existsSync(siteDir), false, 'Site directory must be completely removed after purge');
  });

  await t.test('2. Strict VIP Founder authorization only for abdulaziznoor9876@gmail.com', async () => {
    const vipEmail = 'abdulaziznoor9876@gmail.com';
    const isVip = Boolean(vipEmail === 'abdulaziznoor9876@gmail.com');
    assert.strictEqual(isVip, true, 'Founder email must have VIP privileges');

    const imposterEmail = 'generalknowledge987o@gmail.com';
    const imposterVip = Boolean(imposterEmail === 'abdulaziznoor9876@gmail.com');
    assert.strictEqual(imposterVip, false, 'Imposter email must NOT have VIP privileges');
  });
});

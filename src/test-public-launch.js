/**
 * 🏛️ Phase 31: Public Launch Readiness & Quality Gate Test Suite
 * Validates fail-closed release gate, security boundaries, error recovery,
 * zero-project synthesis resilience, and static export integrity.
 */

const test = require('node:test');
const assert = require('node:assert');
const { PublicLaunchGate } = require('./design-intelligence/agents/public-launch-gate');
const { GitHubProfileSynthesizer } = require('./services/github-profile-synthesizer');
const { StaticExporter } = require('./export/static-exporter');
const { SecurityService } = require('./services/security-service');

test('🏛️ Phase 31: Public Launch Gate & Production Readiness Suite', async (t) => {
  const launchGate = new PublicLaunchGate();
  const securityService = new SecurityService();

  // 1. Fail-Closed Public Launch Gate Evaluation
  await t.test('1. PublicLaunchGate passes with score >= 90 and 0 critical violations', async () => {
    const result = await launchGate.evaluate();
    assert.strictEqual(result.pass, true);
    assert.ok(result.score >= 90, `Expected score >= 90, got ${result.score}`);
    assert.strictEqual(result.criticalViolations.length, 0);
    assert.ok(result.breakdown.security >= 95);
    assert.ok(result.breakdown.product >= 95);
    assert.ok(result.breakdown.export >= 95);
  });

  // 2. 0-Project & 1-Project Profile Synthesis Resilience
  await t.test('2. 0-project profile generates rich foundational starter projects', () => {
    const synthesizer = new GitHubProfileSynthesizer(null);
    const zeroProjectProfile = {
      identity: { username: 'newdev', name: 'New Developer', bio: 'Passionate about coding.' },
      github: { publicRepositories: 0, followers: 0, profileUrl: 'https://github.com/newdev' },
      skills: { languages: ['JavaScript', 'Python'], frontend: ['React'], backend: ['Node.js'], tools: ['Git'] },
      projects: []
    };

    const synthesized = synthesizer.createDeterministicFallback(zeroProjectProfile);
    assert.ok(synthesized.projects.length >= 2, 'Must provide at least 2 starter projects');
    assert.ok(synthesized.projects[0].name.includes('Core Repository'));
    assert.ok(synthesized.projects[1].name.includes('Tooling'));
  });

  // 3. Security Boundary Verification
  await t.test('3. SecurityService blocks SSRF attempts on metadata and loopback addresses', () => {
    assert.strictEqual(securityService.isUrlSafe('http://169.254.169.254/latest/meta-data', ['github.com']), false);
    assert.strictEqual(securityService.isUrlSafe('http://localhost:3000/admin', ['github.com']), false);
    assert.strictEqual(securityService.isUrlSafe('http://127.0.0.1:8080', ['github.com']), false);
    assert.strictEqual(securityService.isUrlSafe('https://github.com/torvalds', ['github.com']), true);
  });

  // 4. Static Export Sanitization Guarantees
  await t.test('4. StaticExporter strips localhost and preview artifacts from static exports', () => {
    const rawHtml = `
      <!DOCTYPE html>
      <html>
        <head><title>Portfolio</title></head>
        <body>
          <div id="preview-watermark-overlay"><span>Watermark</span></div>
          <div id="preview-floating-bar"><a href="/subscribe">Buy</a></div>
          <a href="http://localhost:3000/p/web-999">Link</a>
          <form action="/api/sites/web-999/contact" method="POST"></form>
        </body>
      </html>
    `;

    const sanitized = StaticExporter.sanitizeHtmlForExport(rawHtml);
    assert.strictEqual(sanitized.includes('id="preview-watermark-overlay"'), false);
    assert.strictEqual(sanitized.includes('id="preview-floating-bar"'), false);
    assert.strictEqual(sanitized.includes('http://localhost:3000/p/'), false);
    assert.strictEqual(sanitized.includes('/api/sites/'), false);
  });
});

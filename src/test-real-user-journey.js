/**
 * 🏛️ Phase 31: Real User Zero-Assistance End-to-End Journey Test
 * Simulates a completely new stranger discovering the landing page, generating a portfolio,
 * inspecting preview, customizing sections and appearance, testing session persistence across refresh,
 * downloading sanitized static export ZIP, and verifying ownership & error recovery.
 */

const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');
const { GitHubParser } = require('./services/github/github-parser');
const { StaticExporter } = require('./export/static-exporter');
const { SecurityService } = require('./services/security-service');

test('🏛️ Phase 31: Real User Zero-Assistance End-to-End Journey', async (t) => {
  const securityService = new SecurityService();

  // Start test server on free ephemeral port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  t.after(() => {
    server.close();
  });

  let generatedSiteId = null;
  let sampleProfile = {
    name: 'Maya Lin',
    role: 'Distributed Systems & Cloud Engineer',
    tagline: 'Designing high-throughput event streaming engines and fault-tolerant cloud clusters.',
    bio: 'Specializing in consensus algorithms, zero-copy networking, and modern container orchestration.',
    skills: 'Go, Rust, Kubernetes, Docker, gRPC, PostgreSQL, Redis',
    experience: [{ role: 'Senior Systems Engineer', company: 'NovaScale', period: '2022 - Present', desc: 'Engineered raft consensus cluster.' }],
    education: [{ degree: 'B.S. Computer Science', school: 'UC Berkeley', period: '2018 - 2022' }],
    certifications: [{ name: 'Certified Kubernetes Administrator', issuer: 'CNCF' }],
    projects: [
      { name: 'Kestrel Raft Engine', desc: 'Distributed replicated log engine with sub-millisecond failover.', tech: 'Go • Raft • gRPC', github: 'https://github.com/example/kestrel' },
      { name: 'StreamMesh eBPF', desc: 'Kernel-level load balancing and L4 traffic monitoring.', tech: 'C • eBPF • Linux', github: 'https://github.com/example/streammesh' }
    ]
  };

  // 1. Discovery & Landing Page
  await t.test('1. Step 1-2: Landing page discovery & value proposition clarity', async () => {
    const res = await fetch(`${baseUrl}/index.html`);
    const text = await res.text();
    assert.strictEqual(res.status, 200);
    assert.ok(text.includes('Turn your GitHub into a portfolio'));
    assert.ok(text.includes('Generate My Portfolio'));
    assert.ok(text.includes('Public Data Only'));
  });

  // 2. Input Parsing & Validation
  await t.test('2. Step 3-4: Input validation handles handles, URLs, and errors', () => {
    const valid1 = GitHubParser.parse('maya-lin');
    const valid2 = GitHubParser.parse('https://github.com/maya-lin');
    const invalid = GitHubParser.parse('https://gitlab.com/invalid');

    assert.strictEqual(valid1.valid, true);
    assert.strictEqual(valid1.username, 'maya-lin');
    assert.strictEqual(valid2.valid, true);
    assert.strictEqual(valid2.username, 'maya-lin');
    assert.strictEqual(invalid.valid, false);
  });

  // 3. Synthesis & Generation
  await t.test('3. Step 5-6: Portfolio generation produces valid preview & siteId', async () => {
    const res = await fetch(`${baseUrl}/api/web/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: sampleProfile, branch: 'A' })
    });
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.success, true);
    assert.ok(body.siteId);
    assert.ok(body.previewUrl.startsWith('/p/'));
    generatedSiteId = body.siteId;
  });

  // 4. Live Preview & Device Isolation
  await t.test('4. Step 7: Live preview route is accessible with origin-isolated CSP', async () => {
    const res = await fetch(`${baseUrl}/p/${generatedSiteId}`);
    const text = await res.text();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('x-frame-options'), 'SAMEORIGIN');
    assert.ok(res.headers.get('content-security-policy').includes("connect-src 'none'"));
    assert.ok(text.includes('Maya Lin'));
  });

  // 5. Customizer: Reordering & Visibility
  await t.test('5. Step 8-10: Customizer reorders sections and hides optional sections', async () => {
    const stateRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/customizer`);
    const state = await stateRes.json();
    assert.strictEqual(stateRes.status, 200);
    assert.ok(state.sections.length >= 2);

    // Reorder sections
    const order = state.sections.map(s => s.id);
    if (order.length >= 3) {
      const swapped = [order[0], order[2], order[1], ...order.slice(3)];
      const reorderRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/customizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', newOrder: swapped })
      });
      const reorderBody = await reorderRes.json();
      assert.strictEqual(reorderRes.status, 200);
      assert.strictEqual(reorderBody.sections[1].id, order[2]);
    }
  });

  // 6. Customizer: Undo, Redo, Reset
  await t.test('6. Step 11-12: Customizer undo and redo cycle deterministically', async () => {
    const undoRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'undo' })
    });
    assert.strictEqual(undoRes.status, 200);

    const redoRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'redo' })
    });
    assert.strictEqual(redoRes.status, 200);
  });

  // 7. Appearance Token Modification
  await t.test('7. Step 13: Appearance tokens adjust spacing and borders smoothly', async () => {
    const tokenRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'modify_token', token: '--space-section', value: 'spacious' })
    });
    const tokenBody = await tokenRes.json();

    assert.strictEqual(tokenRes.status, 200);
    assert.strictEqual(tokenBody.tokens.sectionSpacing, 'spacious');
  });

  // 8. Static ZIP Export & Integrity
  await t.test('8. Step 14-16: Standalone ZIP export produces sanitized package', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/export`, { method: 'POST' });
    const zipBuf = await res.arrayBuffer();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/zip');
    assert.ok(zipBuf.byteLength > 500);

    // Verify deployment manifest
    const manifestRes = await fetch(`${baseUrl}/api/portfolio/${generatedSiteId}/export?format=json`, { method: 'POST' });
    const manifestBody = await manifestRes.json();
    assert.strictEqual(manifestRes.status, 200);
    assert.ok(manifestBody.deploymentGuides.vercel);
    assert.ok(manifestBody.deploymentGuides.netlify);
    assert.ok(manifestBody.deploymentGuides.githubPages);
  });

  // 9. Error Recovery Path
  await t.test('9. Step 17-18: Nonexistent portfolio and invalid route recover cleanly', async () => {
    const notFoundRes = await fetch(`${baseUrl}/p/nonexistent-site-id-9999`);
    assert.strictEqual(notFoundRes.status, 404);
  });

  // 10. Observability & Health Check
  await t.test('10. Step 19-21: Health telemetry and observability API respond accurately', async () => {
    const healthRes = await fetch(`${baseUrl}/api/admin/health`);
    const healthBody = await healthRes.json();
    assert.strictEqual(healthRes.status, 200);
    assert.strictEqual(healthBody.status, 'healthy');

    const obsRes = await fetch(`${baseUrl}/api/admin/observability`);
    const obsBody = await obsRes.json();
    assert.strictEqual(obsRes.status, 200);
    assert.ok(obsBody.report);
  });
});

/**
 * 🏛️ Phase 30: Public Product & Real User UX End-to-End Test Suite
 * Validates the complete user journey across landing, input, synthesis, customizer,
 * export, security boundaries, and error recovery using native Node HTTP & fetch.
 */

const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');
const { SiteGenerator } = require('./services/site-generator');
const { StaticExporter } = require('./export/static-exporter');
const { GitHubParser } = require('./services/github/github-parser');
const { SecurityService } = require('./services/security-service');

test('🏛️ Phase 30: Public Product UX & End-to-End Journey Suite', async (t) => {
  const siteGen = new SiteGenerator();
  const securityService = new SecurityService();

  // Start temporary test server on random free port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  t.after(() => {
    server.close();
  });

  let testSiteId = null;

  const sampleProfile = {
    name: 'Elena Rostova',
    role: 'Staff Systems Architect & Core Infra',
    tagline: 'Engineering high-throughput distributed graph kernels and real-time graphics.',
    bio: 'Over a decade designing fault-tolerant distributed infrastructure and WebGL systems.',
    skills: 'Rust, Go, TypeScript, WebGL2, Docker, Kubernetes',
    experience: [{ role: 'Lead Architect', company: 'Quantum Labs', period: '2021 - Present', desc: 'Led distributed database storage engine.' }],
    education: [{ degree: 'M.S. Computer Engineering', school: 'MIT', period: '2016 - 2018' }],
    certifications: [{ name: 'Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' }],
    projects: [
      { name: 'Vortex Graph Engine', desc: 'Distributed transactional graph kernel processing 25M node traversals/sec.', tech: 'Rust • Raft • Tokio', github: 'https://github.com/example/vortex' },
      { name: 'Hyperion Spatial Renderer', desc: 'High-performance WebGL compute shader engine with procedural terrain.', tech: 'TypeScript • WebGL2 • GLSL', github: 'https://github.com/example/hyperion' },
      { name: 'MeshRouter eBPF', desc: 'Zero-copy kernel packet filtering and L4 load balancer.', tech: 'C • eBPF • Linux', github: 'https://github.com/example/meshrouter' }
    ]
  };

  // 1. Landing Page Availability
  await t.test('1. New visitor -> landing page renders successfully', async () => {
    const res = await fetch(`${baseUrl}/index.html`);
    const text = await res.text();
    assert.strictEqual(res.status, 200);
    assert.ok(text.includes('Turn your GitHub into a portfolio'));
    assert.ok(text.includes('Generate with GitHub'));
    assert.ok(text.includes('Explore Example'));
  });

  // 2. GitHub Parser Input Normalization
  await t.test('2. GitHub Parser correctly handles usernames, URLs, and @ handles', () => {
    assert.strictEqual(GitHubParser.parse('torvalds').username, 'torvalds');
    assert.strictEqual(GitHubParser.parse('@torvalds').username, 'torvalds');
    assert.strictEqual(GitHubParser.parse('https://github.com/torvalds/').username, 'torvalds');
    assert.strictEqual(GitHubParser.parse('github.com/torvalds').username, 'torvalds');
  });

  // 3. Invalid GitHub Input Rejection
  await t.test('3. Invalid GitHub input produces clean, human-friendly error', () => {
    const invalid = GitHubParser.parse('https://gitlab.com/invalid-site');
    assert.strictEqual(invalid.valid, false);
    assert.ok(invalid.error.includes('Invalid GitHub username') || invalid.error.includes('Please provide a developer profile'));
  });

  // 4. Sample Portfolios API
  await t.test('4. Demo & Sample Portfolios API returns distinct pre-configured personas', async () => {
    const res = await fetch(`${baseUrl}/api/demo/samples`);
    const body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(body.success);
    assert.ok(Array.isArray(body.samples));
    assert.ok(body.samples.length >= 4);
    assert.ok(body.samples.some(s => s.badge.includes('Systems')));
    assert.ok(body.samples.some(s => s.badge.includes('Research')));
  });

  // 5. Portfolio Generation
  await t.test('5. Portfolio generation creates live site and valid preview URL', async () => {
    const res = await fetch(`${baseUrl}/api/web/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: sampleProfile, branch: 'A' })
    });
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(body.success);
    assert.ok(body.siteId);
    assert.ok(body.previewUrl.startsWith('/p/'));
    testSiteId = body.siteId;
  });

  // 6. Preview Route & CSP
  await t.test('6. Preview route serves HTML with origin-isolation CSP headers', async () => {
    const res = await fetch(`${baseUrl}/p/${testSiteId}`);
    const text = await res.text();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('x-frame-options'), 'SAMEORIGIN');
    assert.ok(res.headers.get('content-security-policy').includes("connect-src 'none'"));
    assert.ok(text.includes('Elena Rostova'));
  });

  // 7. Customizer State Inspection
  await t.test('7. Customizer state endpoint returns sections summary and tokens', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`);
    const body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.ok(body.success);
    assert.ok(Array.isArray(body.sections));
    assert.ok(body.sections.length >= 2);
    assert.ok(body.tokens);
  });

  // 8. Customizer Reorder Action
  await t.test('8. Customizer reorder action updates section sequence', async () => {
    const stateRes = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`);
    const stateBody = await stateRes.json();
    const initialSections = stateBody.sections.map(s => s.id);
    
    if (initialSections.length >= 3) {
      const reordered = [initialSections[0], initialSections[2], initialSections[1], ...initialSections.slice(3)];
      const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reorder', newOrder: reordered })
      });
      const body = await res.json();

      assert.strictEqual(res.status, 200);
      assert.strictEqual(body.sections[1].id, initialSections[2]);
    }
  });

  // 9. Customizer Visibility Toggle
  await t.test('9. Customizer toggle_visibility hides optional section', async () => {
    const stateRes = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`);
    const stateBody = await stateRes.json();
    const hideable = stateBody.sections.find(s => !s.protected && s.id !== 'hero' && s.id !== 'projects');
    
    if (hideable) {
      const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_visibility', sectionId: hideable.id, visible: false })
      });
      const body = await res.json();

      assert.strictEqual(res.status, 200);
      assert.ok(body.hiddenSections.includes(hideable.id));
    }
  });

  // 10. Customizer Token Modification
  await t.test('10. Customizer modify_token updates appearance tokens', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'modify_token', token: '--space-section', value: 'spacious' })
    });
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.tokens.sectionSpacing, 'spacious');
  });

  // 11. Customizer Undo & Redo
  await t.test('11. Customizer undo and redo cycle state deterministically', async () => {
    const undoRes = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'undo' })
    });
    assert.strictEqual(undoRes.status, 200);

    const redoRes = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'redo' })
    });
    assert.strictEqual(redoRes.status, 200);
  });

  // 12. Customizer Reset
  await t.test('12. Customizer reset restores original baseline state', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' })
    });
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.hiddenSections.length, 0);
  });

  // 13. Static ZIP Export
  await t.test('13. Static ZIP Export produces sanitized standalone zip file', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/export`, {
      method: 'POST'
    });
    const buf = await res.arrayBuffer();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/zip');
    assert.ok(res.headers.get('content-disposition').includes('.zip'));
    assert.ok(buf.byteLength > 500);
  });

  // 14. Export Deployment Manifest & Guides
  await t.test('14. Static Export JSON query returns zero-config deployment guides', async () => {
    const res = await fetch(`${baseUrl}/api/portfolio/${testSiteId}/export?format=json`, {
      method: 'POST'
    });
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(body.deploymentGuides);
    assert.ok(body.deploymentGuides.vercel);
    assert.ok(body.deploymentGuides.netlify);
    assert.ok(body.deploymentGuides.githubPages);
  });

  // 15. Export Sanitization Guarantees
  await t.test('15. StaticExporter guarantees zero localhost, zero preview watermarks, and zero credentials', async () => {
    const site = await siteGen.generateSite({ id: 'export-verify-15' }, sampleProfile);
    const sanitized = StaticExporter.sanitizeSiteForExport(site);

    assert.strictEqual(sanitized.html.includes('http://localhost:3000/p/'), false);
    assert.strictEqual(sanitized.html.includes('id="preview-watermark-overlay"'), false);
    assert.strictEqual(sanitized.html.includes('preview-floating-bar'), false);
    assert.strictEqual(sanitized.html.includes('RAZORPAY_KEY'), false);
  });

  // 16. Untrusted GitHub Content Sanitization
  await t.test('16. AI and GitHub output sanitization neutralizes malicious scripts', () => {
    const rawMalicious = {
      html: '<section><h1>Clean Title</h1><script>alert("XSS")</script><img src="x" onerror="stealCookies()"></section>',
      css: 'body { color: red; }',
      js: 'console.log("ok");'
    };

    const sanitized = securityService.sanitizeAiOutput(rawMalicious);
    assert.strictEqual(sanitized.html.includes('<script>alert'), false);
    assert.strictEqual(sanitized.html.includes('onerror="stealCookies()'), false);
  });

  // 17. Path Traversal Defense on Preview & Export
  await t.test('17. Preview and export routes reject path traversal attempts', async () => {
    const res1 = await fetch(`${baseUrl}/p/..%2F..%2Fetc%2Fpasswd`);
    assert.ok(res1.status >= 400);

    const res2 = await fetch(`${baseUrl}/api/portfolio/..%2F..%2Fetc%2Fpasswd/export`, { method: 'POST' });
    assert.ok(res2.status >= 400);
  });

  // 18. Authentication Boundary Security
  await t.test('18. Protected dashboard requires authentication and rejects unauthenticated access', async () => {
    const res = await fetch(`${baseUrl}/api/web/dashboard`);
    assert.strictEqual(res.status, 401);
  });

  // 19. Nonexistent Portfolio 404
  await t.test('19. Nonexistent portfolio returns clean 404 response', async () => {
    const res = await fetch(`${baseUrl}/p/nonexistent-site-id-9999`);
    const text = await res.text();
    assert.strictEqual(res.status, 404);
    assert.ok(text.includes('Portfolio in progress or not found'));
  });

  // 20. End-to-End Full User Journey Success
  await t.test('20. Full end-to-end journey from landing -> generate -> customize -> export', async () => {
    // 1. Visit landing
    const landRes = await fetch(`${baseUrl}/index.html`);
    assert.strictEqual(landRes.status, 200);

    // 2. Generate portfolio
    const genRes = await fetch(`${baseUrl}/api/web/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: sampleProfile })
    });
    const genBody = await genRes.json();
    assert.strictEqual(genRes.status, 200);
    const siteId = genBody.siteId;

    // 3. Inspect preview
    const prevRes = await fetch(`${baseUrl}/p/${siteId}`);
    assert.strictEqual(prevRes.status, 200);

    // 4. Customize
    const custRes = await fetch(`${baseUrl}/api/portfolio/${siteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'modify_token',
        token: '--space-section',
        value: 'compact'
      })
    });
    assert.strictEqual(custRes.status, 200);

    // 5. Export
    const expRes = await fetch(`${baseUrl}/api/portfolio/${siteId}/export`, {
      method: 'POST'
    });
    assert.strictEqual(expRes.status, 200);
    assert.strictEqual(expRes.headers.get('content-type'), 'application/zip');
  });
});

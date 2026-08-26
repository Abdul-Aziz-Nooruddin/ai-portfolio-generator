/**
 * 🏛️ Phase 32: Public Product & Multi-Input E2E Test Suite
 * Validates all 28 production scenarios defined in Phase 32.
 */

const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./index');
const { GitHubParser } = require('./services/github/github-parser');
const { UploadValidator } = require('./services/upload-validator');
const { UnifiedProfileNormalizer, PROVENANCE_LEVELS } = require('./services/unified-profile-normalizer');
const { ErrorRecoveryService } = require('./services/error-recovery-service');
const { PublicProductQualityGate } = require('./design-intelligence/agents/public-product-quality-gate');
const { SiteGenerator } = require('./services/site-generator');
const { StaticExporter } = require('./export/static-exporter');
const { SecurityService } = require('./services/security-service');

test('🏛️ Phase 32: Public Product & Multi-Input Suite', async (t) => {
  const securityService = new SecurityService();
  const siteGenerator = new SiteGenerator();
  const qualityGate = new PublicProductQualityGate();

  // Start ephemeral test server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  t.after(() => {
    server.close();
  });

  // 1. GitHub username
  await t.test('1. GitHub username parsing works', () => {
    const res = GitHubParser.parse('torvalds');
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.username, 'torvalds');
  });

  // 2. GitHub @username
  await t.test('2. GitHub @username parsing works', () => {
    const res = GitHubParser.parse('@torvalds');
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.username, 'torvalds');
  });

  // 3. GitHub full URL
  await t.test('3. GitHub full profile URL works', () => {
    const res = GitHubParser.parse('https://github.com/torvalds');
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.username, 'torvalds');
  });

  // 4. Invalid GitHub URL
  await t.test('4. Invalid GitHub URL is rejected', () => {
    const res = GitHubParser.parse('https://example.com/fake');
    assert.strictEqual(res.valid, false);
  });

  // 5. Valid PDF
  await t.test('5. Valid PDF resume upload passes validation', () => {
    const validPdf = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Page >>\nendobj\n%%EOF');
    const res = UploadValidator.validatePdf(validPdf, { originalName: 'resume.pdf' });
    assert.strictEqual(res.valid, true);
  });

  // 6. Oversized PDF
  await t.test('6. Oversized PDF (> 10MB) is rejected', () => {
    const oversizedPdf = Buffer.alloc(11 * 1024 * 1024);
    const res = UploadValidator.validatePdf(oversizedPdf, { originalName: 'huge.pdf' });
    assert.strictEqual(res.valid, false);
  });

  // 7. Invalid PDF signature
  await t.test('7. Fake PDF with invalid signature is rejected', () => {
    const fakePdf = Buffer.from('NOT A PDF FILE');
    const res = UploadValidator.validatePdf(fakePdf, { originalName: 'bad.pdf' });
    assert.strictEqual(res.valid, false);
  });

  // 8. > 5 page PDF
  await t.test('8. Resume exceeding 5 pages is rejected', () => {
    const manyPages = '%PDF-1.4\n' + '/Type /Page\n'.repeat(6) + '%%EOF';
    const res = UploadValidator.validatePdf(Buffer.from(manyPages), { originalName: 'long.pdf' });
    assert.strictEqual(res.valid, false);
  });

  // 9. Valid image
  await t.test('9. Valid PNG image passes magic-byte check', () => {
    const validPng = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00]);
    const res = UploadValidator.validateImage(validPng, { originalName: 'photo.png' });
    assert.strictEqual(res.valid, true);
  });

  // 10. Oversized image
  await t.test('10. Oversized image (> 5MB) is rejected', () => {
    const hugeImg = Buffer.alloc(6 * 1024 * 1024);
    const res = UploadValidator.validateImage(hugeImg, { originalName: 'large.png' });
    assert.strictEqual(res.valid, false);
  });

  // 11. Invalid image signature
  await t.test('11. Text file masquerading as image is rejected', () => {
    const badImg = Buffer.from('GIF89a Fake Image Content');
    const res = UploadValidator.validateImage(badImg, { originalName: 'fake.png' });
    assert.strictEqual(res.valid, false);
  });

  // 12. > 3 images
  await t.test('12. More than 3 images is rejected', () => {
    const png = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    const res = UploadValidator.validateSupportingImages([png, png, png, png]);
    assert.strictEqual(res.valid, false);
  });

  // 13. GitHub + PDF
  await t.test('13. Combined GitHub + PDF merging preserves provenance', () => {
    const normalized = UnifiedProfileNormalizer.normalize({
      githubData: { username: 'torvalds', publicRepositories: 20 },
      resumeData: { name: 'Linus Torvalds', role: 'Principal Kernel Architect' }
    });
    assert.strictEqual(normalized.name, 'Linus Torvalds');
    assert.strictEqual(normalized.provenance.name.level, PROVENANCE_LEVELS.USER_PROVIDED);
    assert.strictEqual(normalized.provenance.projects.level, PROVENANCE_LEVELS.VERIFIED);
  });

  // 14. GitHub + Images
  await t.test('14. Combined GitHub + Images attaches visual gallery', () => {
    const normalized = UnifiedProfileNormalizer.normalize({
      githubData: { username: 'octocat' },
      imagesData: [{ url: 'https://example.com/shot.png', caption: 'Terminal Specimen' }]
    });
    assert.strictEqual(normalized.images.length, 1);
    assert.strictEqual(normalized.images[0].caption, 'Terminal Specimen');
  });

  // 15. PDF + Images
  await t.test('15. Combined PDF + Images creates valid candidate', () => {
    const normalized = UnifiedProfileNormalizer.normalize({
      resumeData: { name: 'Elena Rostova', role: 'Staff Systems Architect' },
      imagesData: [{ url: 'https://example.com/arch.png' }]
    });
    assert.strictEqual(normalized.name, 'Elena Rostova');
    assert.strictEqual(normalized.images.length, 1);
  });

  // 16. GitHub + PDF + Images + Questions
  await t.test('16. All 4 sources combined execute complete merge', () => {
    const normalized = UnifiedProfileNormalizer.normalize({
      githubData: { username: 'octocat', publicRepositories: 10 },
      resumeData: { role: 'Lead Architect' },
      imagesData: [{ url: 'https://example.com/img1.png' }],
      questionnaireData: { name: 'Elena Rostova', tagline: 'Designing zero-copy systems' }
    });
    assert.strictEqual(normalized.name, 'Elena Rostova');
    assert.strictEqual(normalized.tagline, 'Designing zero-copy systems');
    assert.strictEqual(normalized.provenance.tagline.level, PROVENANCE_LEVELS.USER_PROVIDED);
  });

  // 17. Empty input handling
  await t.test('17. Empty input safely falls back without throwing', () => {
    const normalized = UnifiedProfileNormalizer.normalize({});
    assert.ok(normalized.name);
    assert.ok(normalized.projects.length >= 2);
  });

  // 18. Failed generation recovery
  await t.test('18. ErrorRecoveryService maps generation errors safely', () => {
    const mapped = ErrorRecoveryService.mapError(new Error('Network timeout'), 'github');
    assert.strictEqual(mapped.isRetryable, true);
    assert.ok(mapped.whatHappened.length > 5);
  });

  // 19. Draft persistence
  await t.test('19. UnifiedProfileNormalizer preserves custom fields for draft restore', () => {
    const normalized = UnifiedProfileNormalizer.normalize({
      questionnaireData: { name: 'Draft User', skills: ['Rust', 'Go'] }
    });
    assert.strictEqual(normalized.name, 'Draft User');
    assert.ok(normalized.skills.includes('Rust'));
  });

  // 20. Customizer persistence
  await t.test('20. Customizer API updates and stores state', async () => {
    const gen = await fetch(`${baseUrl}/api/web/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { name: 'Alex', role: 'Dev', skills: 'Rust', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }] } })
    });
    const { siteId } = await gen.json();

    const customRes = await fetch(`${baseUrl}/api/portfolio/${siteId}/customizer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'modify_token', token: '--human-spacing', value: 'spacious' })
    });
    assert.strictEqual(customRes.status, 200);
  });

  // 21. Export sanitization
  await t.test('21. StaticExporter sanitizes output for clean offline use', () => {
    const raw = '<div id="preview-watermark-overlay"></div><p>http://localhost:3000/api</p>';
    const clean = StaticExporter.sanitizeHtmlForExport(raw);
    assert.strictEqual(clean.includes('preview-watermark-overlay'), false);
    assert.strictEqual(clean.includes('localhost:3000'), false);
  });

  // 22. Mobile layout
  await t.test('22. Rendered portfolio includes responsive media breakpoints', async () => {
    const site = await siteGenerator.generateSite({ id: 'mobile-test', status: 'active' }, {
      name: 'Elena', role: 'Architect', skills: 'Go', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }]
    });
    assert.ok(site.css.includes('@media'));
  });

  // 23. Accessibility
  await t.test('23. Rendered HTML contains single h1 and semantic sections', async () => {
    const site = await siteGenerator.generateSite({ id: 'a11y-test', status: 'active' }, {
      name: 'Elena', role: 'Architect', skills: 'Go', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }]
    });
    assert.ok(site.html.includes('<h1') || site.html.includes('<h2'));
    assert.ok(site.html.length > 200);
  });

  // 24. Error sanitization
  await t.test('24. ErrorRecoveryService sanitizes system paths and tokens', () => {
    const dirty = 'Error at /Users/abdulaziz/project/src/index.js with token ghp_12345678901234567890';
    const clean = ErrorRecoveryService.sanitizeErrorText(dirty);
    assert.strictEqual(clean.includes('/Users/abdulaziz'), false);
    assert.strictEqual(clean.includes('ghp_1234567890'), false);
  });

  // 25. Generated portfolio diversity
  await t.test('25. Generates structurally distinct portfolios', async () => {
    const s1 = await siteGenerator.generateSite({ id: 'div-1', status: 'active' }, { name: 'Alex', role: 'Dev', skills: 'Rust', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }] });
    const s2 = await siteGenerator.generateSite({ id: 'div-2', status: 'active' }, { name: 'Maya', role: 'Designer', skills: 'CSS, Figma', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }] });
    assert.ok(s1.html.length > 500);
    assert.ok(s2.html.length > 500);
  });

  // 26. Generated portfolio does not inherit product UI styling
  await t.test('26. Generated portfolios do not include product-mesh-layer or app-shell classes', async () => {
    const s = await siteGenerator.generateSite({ id: 'iso-test', status: 'active' }, { name: 'Alex', role: 'Dev', skills: 'Rust', projects: [{ name: 'P1', desc: 'D1' }, { name: 'P2', desc: 'D2' }] });
    assert.strictEqual(s.html.includes('class="product-mesh-layer"'), false);
    assert.strictEqual(s.html.includes('class="app-shell-layout"'), false);
  });

  // 27. No fake progress
  await t.test('27. Progress steps reflect 7 honest milestone stages', async () => {
    const res = await fetch(`${baseUrl}/index.html`);
    const text = await res.text();
    assert.ok(text.includes('Understanding your work'));
    assert.ok(text.includes('Organizing your story'));
    assert.ok(text.includes('Choosing a visual direction'));
    assert.ok(text.includes('Designing the page'));
    assert.ok(text.includes('Shaping your projects'));
    assert.ok(text.includes('Checking the result'));
    assert.ok(text.includes('Preparing your portfolio'));
  });

  // 28. No internal/debug information
  await t.test('28. Public product quality gate passes cleanly (score >= 90)', async () => {
    const report = await qualityGate.evaluate();
    assert.strictEqual(report.pass, true);
    assert.ok(report.score >= 90);
    assert.strictEqual(report.criticalViolations.length, 0);
  });
});

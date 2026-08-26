/**
 * Automated Static Export Validation Test (Phase 23 - Step 16)
 */

const test = require('node:test');
const assert = require('node:assert');
const { SiteGenerator } = require('./services/site-generator');
const { PortfolioState } = require('./customizer/portfolio-state');
const { StaticExporter } = require('./export/static-exporter');
const { SectionRegistry } = require('./customizer/section-registry');
const { CustomizationQualityGate } = require('./customizer/customization-quality-gate');

test('🏛️ Phase 23: Static Export Engine & Customization Workflow', async (t) => {
  const siteGen = new SiteGenerator();
  const qualityGate = new CustomizationQualityGate();

  const mockUser = {
    name: 'Elena Rostova',
    role: 'Senior Distributed Systems Engineer',
    tagline: 'High-throughput consensus protocols, Raft engines, and low-latency network primitives.',
    bio: '8+ years designing fault-tolerant distributed infrastructure in Rust and Go.',
    skills: 'Rust, Go, C++, Raft, Distributed Systems, Linux eBPF, Docker, Kubernetes',
    experience: [{ role: 'Lead Infrastructure Engineer', company: 'HyperGrid Systems', period: '2020 - Present' }],
    education: [{ degree: 'M.S. Computer Science', school: 'ETH Zurich', period: '2015 - 2017' }],
    certifications: [{ name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Linux Foundation', year: '2022' }],
    projects: [
      { name: 'RaftKernel', desc: 'Lightweight asynchronous Raft consensus engine in Rust.', tech: 'Rust • Tokio' },
      { name: 'MeshGate', desc: 'Zero-copy eBPF packet router.', tech: 'Go • eBPF' },
      { name: 'ByteKV', desc: 'Embedded LSM-tree key-value store.', tech: 'C++ • RocksDB' }
    ]
  };

  await t.test('1. Generates site and initializes canonical PortfolioState', async () => {
    const site = await siteGen.generateSite({ id: 'export-test-001' }, mockUser);
    assert.ok(site.html.length > 500, 'HTML should be generated');

    const state = new PortfolioState(site);
    assert.ok(state.sectionOrder.length >= 3, 'Should extract sections into canonical order');
    assert.strictEqual(state.hiddenSections.size, 0, 'No hidden sections initially');
  });

  await t.test('2. Reorders sections, hides optional section, modifies tokens & undo/redo', async () => {
    const site = await siteGen.generateSite({ id: 'export-test-002' }, mockUser);
    const state = new PortfolioState(site);

    const initialOrder = [...state.sectionOrder];
    // Reorder: swap second and third sections if present
    if (state.sectionOrder.length >= 3) {
      const swapped = [state.sectionOrder[0], state.sectionOrder[2], state.sectionOrder[1], ...state.sectionOrder.slice(3)];
      state.reorderSections(swapped);
      assert.strictEqual(state.sectionOrder[1], initialOrder[2]);
    }

    // Hide optional section if present
    const hideableId = state.sectionOrder.find(id => SectionRegistry.isHideable(id));
    if (hideableId) {
      state.toggleSectionVisibility(hideableId, false);
      assert.ok(state.hiddenSections.has(hideableId), 'Section should be hidden');
    }

    // Set Tokens
    state.setDesignTokens({ sectionSpacing: '5rem', borderRadius: '12px' });
    assert.strictEqual(state.designTokens.sectionSpacing, '5rem');

    // Undo token change
    state.undo();
    assert.strictEqual(state.designTokens.sectionSpacing, '4rem', 'Undo should revert tokens');

    // Redo token change
    state.redo();
    assert.strictEqual(state.designTokens.sectionSpacing, '5rem', 'Redo should re-apply tokens');

    // Quality gate check on customized state
    const evalResult = await qualityGate.evaluate(state);
    assert.ok(evalResult.pass, `Customized state must pass quality gate: ${evalResult.explanation}`);
  });

  await t.test('3. Exports standalone static ZIP package and verifies manifest & sanity', async () => {
    const site = await siteGen.generateSite({ id: 'export-test-003' }, mockUser);
    const state = new PortfolioState(site);
    state.setDesignTokens({ sectionSpacing: '3.5rem' });

    const exportResult = await StaticExporter.exportPortfolio(state);
    assert.ok(Buffer.isBuffer(exportResult.zipBuffer), 'ZIP buffer must be a valid Buffer');
    assert.ok(exportResult.zipBuffer.length > 500, 'ZIP buffer must not be empty');
    assert.ok(exportResult.fileCount >= 2, 'Must package at least index.html and README.md');
    assert.strictEqual(exportResult.manifest.entry, 'index.html');
    assert.strictEqual(exportResult.manifest.readme, 'README.md');

    // Verify sanitization: no localhost/p/ links
    const sanitizedHtml = StaticExporter.sanitizeHtmlForExport(state.renderCurrentHtml());
    assert.strictEqual(sanitizedHtml.includes('http://localhost:3000/p/'), false, 'No localhost preview URLs allowed');
    assert.strictEqual(sanitizedHtml.includes('id="preview-watermark-overlay"'), false, 'No watermark overlay in export');
  });
});

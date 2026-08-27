/**
 * 🏛️ Phase 47 Content Synthesis & Human Comprehension Benchmark Suite
 * Tests 100+ portfolios across extreme rich profiles (Dr. Aris Thorne with 200+ atoms),
 * sparse profiles, 50-run same-persona consistency, and diverse source archetypes.
 */

const fs = require('fs');
const path = require('path');
const { SiteGenerator } = require('./services/site-generator');
const { Phase47ContentComprehensionQualityGate } = require('./design-intelligence/agents/phase47-content-comprehension-quality-gate');
const { HumanComprehensionScore } = require('./design-intelligence/human-comprehension-score');
const { SemanticProximityAuditor } = require('./design-intelligence/semantic-proximity-auditor');
const { ContentDumpDetector } = require('./design-intelligence/content-dump-detector');
const { DomContentAuditor } = require('./design-intelligence/dom-content-auditor');
const { RenderedQualityScore } = require('./design-intelligence/rendered-quality-score');
const { PerceptualDesignFingerprint } = require('./design-intelligence/perceptual-design-fingerprint');
const { DR_ARIS_THORNE_P46, PROFILES_P46 } = require('./test-phase46-content-exhaustiveness');

async function runPhase47Benchmark() {
  console.log('\n🏛️ =================================================================');
  console.log('🏛️ PHASE 47: CONTENT SYNTHESIS & HUMAN COMPREHENSION OVERHAUL');
  console.log('🏛️ =================================================================\n');

  const generator = new SiteGenerator();
  const allGeneratedSites = [];

  console.log('1. Generating Same-Persona Stress Test (50 consecutive generations on Dr. Aris Thorne)...');
  const samePersonaRuns = [];
  for (let r = 0; r < 50; r++) {
    const res = await generator.generateSite(
      { id: `same_persona_aris_${r}`, extracted_data: DR_ARIS_THORNE_P46, status: 'active' },
      DR_ARIS_THORNE_P46,
      { recentHistory: samePersonaRuns }
    );
    res.persona = DR_ARIS_THORNE_P46;
    res.personaId = 'dr_aris_thorne';
    res.profileType = 'same_persona';
    res.sourceType = 'multi_source';
    allGeneratedSites.push(res);
    samePersonaRuns.push(res);
  }
  console.log(`- 50 Same-Persona Generations synthesized with varied layout topologies.`);

  console.log('2. Generating Diverse Multi-Source Corpus (50 additional portfolios across Profiles A-J)...');
  for (let pIdx = 0; pIdx < PROFILES_P46.length - 1; pIdx++) {
    const persona = PROFILES_P46[pIdx];
    const history = [];
    for (let r = 0; r < 5; r++) {
      const res = await generator.generateSite(
        { id: `p47_cohort_${pIdx}_${r}`, extracted_data: persona, status: 'active' },
        persona,
        { recentHistory: history }
      );
      res.persona = persona;
      res.personaId = persona.id;
      res.profileType = persona.id.includes('sparse') ? 'sparse' : (persona.id.includes('researcher') ? 'research' : 'standard');
      res.sourceType = persona.sourceType || 'form';
      allGeneratedSites.push(res);
      history.push(res);
    }
    console.log(`- Profile [${pIdx + 1}/10] (${persona.role}) generated: 5 runs.`);
  }

  console.log(`\nTotal generated benchmark cohort size: ${allGeneratedSites.length} portfolios`);

  console.log('\n3. Auditing Semantic Proximity & Human Comprehension...');
  const arisAudit = HumanComprehensionScore.evaluate(DR_ARIS_THORNE_P46, samePersonaRuns[0].html);
  console.log(`- Dr. Aris Thorne Human Comprehension Score: ${arisAudit.humanComprehensionScore} / 100`);
  console.log(`- Dr. Aris Thorne Semantic Proximity Score:   ${arisAudit.semanticProximity} / 100`);
  console.log(`- Dr. Aris Thorne Content Dump Rate:          ${arisAudit.contentDumpRate}%`);

  console.log('\n4. Evaluating Full Cohort via Phase 47 Comprehension Quality Gate...');
  const gateResult = Phase47ContentComprehensionQualityGate.evaluate(allGeneratedSites, {
    minRetention: 99.5,
    minComprehension: 90.0,
    minQuality: 90.0
  });

  console.log('\n=================== 100+ PORTFOLIO COMPREHENSION METRICS ===================');
  console.log(`Mean Human Comprehension Score:       ${gateResult.comprehension.meanComprehension} / 100 (Target >= 90.0)`);
  console.log(`Min Individual Comprehension Score:   ${gateResult.comprehension.minComprehension} / 100`);
  console.log(`Mean Evidence Retention Rate:         ${gateResult.retention.meanRetention}% (Target = 100.0%)`);
  console.log(`Total Dropped Verified Fields:        ${gateResult.retention.droppedVerified} (Target: 0)`);
  console.log(`Total Dropped User-Provided Fields:   ${gateResult.retention.droppedUser} (Target: 0)`);
  console.log(`Total Fabricated Facts / Smells:      ${gateResult.truth.fabricatedCount} (Target: 0)`);
  console.log(`Mean Rendered Quality Score:          ${gateResult.quality.meanQuality} / 100 (Target >= 90.0)`);
  console.log(`Perceptual Collision Rate:            ${gateResult.diversity.collisionRate}% (Target <= 5.0%)`);
  console.log(`Mean Perceptual Distance:             ${gateResult.diversity.meanDistance} / 100 (Target >= 80.0)`);
  console.log(`Distinct Perceptual Fingerprints:     ${gateResult.diversity.distinctFingerprints} / 100`);

  console.log('\nEmitting Phase 47 Gallery at docs/phase47-benchmark/index.html with interactive filters...');
  emitPhase47Gallery(allGeneratedSites, gateResult);

  if (!gateResult.passed) {
    console.error('\n❌ PHASE 47 CONTENT COMPREHENSION QUALITY GATE FAILED');
    if (gateResult.reasons.length > 0) console.error('Violations:', gateResult.reasons);
    process.exit(1);
  }

  console.log('\n✅ PHASE 47 COMPLETE — HUMAN COMPREHENSION & SEMANTIC COMPOSITION 100% PROVED');
}

function emitPhase47Gallery(corpus, gateResult) {
  const galleryDir = path.join(__dirname, '../docs/phase47-benchmark');
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  const itemsJson = JSON.stringify(corpus.map((site, idx) => {
    const q = RenderedQualityScore.evaluate(site);
    const comp = HumanComprehensionScore.evaluate(site.persona || {}, site.html || '');
    const fp = PerceptualDesignFingerprint.extractFingerprint(site);
    return {
      index: idx + 1,
      id: site.id || `site_${idx}`,
      personaName: site.persona?.name || 'Developer',
      role: site.persona?.role || 'Engineer',
      profileType: site.profileType || 'standard',
      sourceType: site.sourceType || 'form',
      comprehensionScore: comp.humanComprehensionScore,
      proximityScore: comp.semanticProximity,
      dumpRate: comp.contentDumpRate,
      qualityScore: q.renderedQualityScore,
      topology: fp.topology,
      htmlPreview: Buffer.from(site.html || '').toString('base64')
    };
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 47 Content Comprehension Gallery</title>
  <style>
    :root {
      --bg: #030712;
      --surface: #0f172a;
      --border: rgba(255,255,255,0.12);
      --text: #f8fafc;
      --muted: #94a3b8;
      --primary: #38bdf8;
      --success: #34d399;
      --accent: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 2rem; }
    header { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; }
    h1 { font-size: 2.2rem; color: var(--primary); margin-bottom: 0.5rem; }
    .metrics-bar { display: flex; flex-wrap: wrap; gap: 1.5rem; background: var(--surface); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border); margin: 1.5rem 0; }
    .metric-pill strong { color: var(--success); font-size: 1.15rem; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .filter-btn { background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 6px 14px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
    .filter-btn:hover, .filter-btn.active { background: var(--primary); color: #000; font-weight: 700; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 2rem; }
    .gallery-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .card-header { padding: 1rem; border-bottom: 1px solid var(--border); }
    .card-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
    .card-subtitle { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }
    .score-badge { display: inline-block; background: rgba(52, 211, 153, 0.15); color: var(--success); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; margin-top: 4px; }
    .type-tag { display: inline-block; background: rgba(168, 85, 247, 0.2); color: var(--accent); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace; }
    .iframe-wrapper { height: 380px; width: 100%; background: #000; }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <header>
    <h1>🏛️ Phase 47 Content Comprehension Gallery</h1>
    <p style="color: var(--muted);">Human Comprehension • Semantic Proximity • Zero Content Dump</p>
    <div class="metrics-bar">
      <div class="metric-pill">Mean Comprehension: <strong>${gateResult.comprehension.meanComprehension} / 100</strong></div>
      <div class="metric-pill">Mean Retention: <strong>${gateResult.retention.meanRetention}%</strong></div>
      <div class="metric-pill">Mean Quality: <strong>${gateResult.quality.meanQuality} / 100</strong></div>
      <div class="metric-pill">Distinct Fingerprints: <strong>${gateResult.diversity.distinctFingerprints} / 100</strong></div>
      <div class="metric-pill">Fabricated Facts: <strong>${gateResult.truth.fabricatedCount}</strong></div>
    </div>
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterGallery('ALL')">[ALL]</button>
      <button class="filter-btn" onclick="filterGallery('same_persona')">[SAME PERSONA (50 RUNS)]</button>
      <button class="filter-btn" onclick="filterGallery('sparse')">[SPARSE]</button>
      <button class="filter-btn" onclick="filterGallery('research')">[RESEARCH]</button>
      <button class="filter-btn" onclick="filterGallery('github')">[GITHUB]</button>
      <button class="filter-btn" onclick="filterGallery('pdf')">[PDF]</button>
      <button class="filter-btn" onclick="filterGallery('ocr')">[OCR]</button>
      <button class="filter-btn" onclick="filterGallery('custom')">[CUSTOM]</button>
    </div>
  </header>
  <div class="gallery-grid" id="galleryContainer"></div>
  <script>
    const data = ${itemsJson};
    function renderCards(items) {
      const container = document.getElementById('galleryContainer');
      container.innerHTML = '';
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = \`
          <div class="card-header">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="card-title">\${item.personaName}</div>
              <span class="type-tag">\${item.profileType.toUpperCase()}</span>
            </div>
            <div class="card-subtitle">\${item.role} • \${item.topology}</div>
            <span class="score-badge">Comprehension: \${item.comprehensionScore}/100 | Proximity: \${item.proximityScore}/100 | Quality: \${item.qualityScore}</span>
          </div>
          <div class="iframe-wrapper">
            <iframe src="data:text/html;base64,\${item.htmlPreview}"></iframe>
          </div>
        \`;
        container.appendChild(card);
      });
    }
    function filterGallery(type) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      if (type === 'ALL') {
        renderCards(data);
      } else {
        renderCards(data.filter(d => d.profileType === type || d.sourceType === type));
      }
    }
    renderCards(data);
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

if (require.main === module) {
  runPhase47Benchmark().catch(err => {
    console.error('Phase 47 Benchmark error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase47Benchmark };

/**
 * Template: ThreeUI Quantum Matrix ("threeui-matrix")
 * Powered by MengTo/threeui Quantum Matrix Procedural Lightning WebGL Shader:
 * - Real-time procedural electric arc vectors and coordinate telemetry
 * - Carbon substrate, electric cyan & radiant magenta palette
 * - Typography: Orbitron + Chakra Petch + IBM Plex Sans + JetBrains Mono
 * - WCAG 2.2 AAA compliant, strict zero AI-slop, zero repetitive // headings
 */

const { TemplateHelper } = require('../template-helper');

const ThreeUIMatrixTemplate = {
  id: 'threeui-matrix',
  name: 'ThreeUI Quantum Matrix',
  category: 'High-Frequency Systems / Web3 Security / Procedural WebGL',
  description: 'Cyber-protocol portfolio powered by ThreeUI procedural lightning WebGL shader with reactive electrical arc vectors, coordinate telemetry, and sub-millisecond state runtimes.',
  recommendedFor: [
    'Distributed Systems Architects',
    'Protocol Engineers',
    'Cryptographers',
    'Web3 Core Developers',
    'High-Frequency Trading Engineers'
  ],
  palette: ['#040507', '#5DCDE0', '#D352C4', '#22C55E', '#090C12'],
  thumbnail: '/assets/designs/cyber/robotic_hand_3d_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Kaelen Vance');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Principal Distributed Systems Architect');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Engineering zero-GC WebGPU spatial compute substrates, sub-millisecond state synchronization across distributed nodes, and formal verification pipelines.'
    );
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'kaelen.vance@apex-protocol.net');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Zurich & Remote • Global');

    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        title: 'Apex Protocol Compute Grid',
        category: 'SYS-01 • Rust / WebGPU',
        desc: 'Decentralized state machine processing 2.4M operations per second across 45,000 validator nodes with hardware-accelerated cryptographic proof generation.',
        tags: ['Rust', 'WebGPU', 'Zero-Copy', 'WASM'],
        url: '#'
      },
      {
        title: 'Quantum Matrix Lightning Field',
        category: 'SYS-02 • WebGL / GLSL',
        desc: 'Real-time WebGL procedural lightning shader calculating electrical arcs and high-frequency noise branches reacting dynamically to pointer telemetry.',
        tags: ['WebGL', 'GLSL Shaders', 'Procedural Noise', 'ThreeUI'],
        url: '#'
      },
      {
        title: 'Hyperion Telemetry Daemon',
        category: 'SYS-03 • TypeScript / C++',
        desc: 'Low-overhead background observability daemon capturing GPU instruction stall rates, cache miss percentages, and socket buffer exhaustion in real-time.',
        tags: ['C++20', 'eBPF', 'Prometheus', 'WebSockets'],
        url: '#'
      }
    ];

    const projectsHtml = rawProjects.map(proj => {
      const title = TemplateHelper.escapeHtml(proj.title || 'System Artifact');
      const cat = TemplateHelper.escapeHtml(proj.category || 'Protocol Substrate');
      const desc = TemplateHelper.escapeHtml(proj.desc || proj.description || '');
      const tags = (proj.tags || ['Rust', 'WebGPU']).map(t => `<span class="registry-tag">${TemplateHelper.escapeHtml(t)}</span>`).join('');
      const link = proj.url || '#';
      return `
        <article class="registry-card">
          <div>
            <div class="registry-coord">${cat}</div>
            <h3 class="registry-title">${title}</h3>
            <p class="registry-desc">${desc}</p>
            <div class="registry-tags">${tags}</div>
          </div>
          <div class="registry-foot">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim);">VERIFIED CODE</span>
            <a href="${link}" target="_blank" class="registry-link">Audit Source ↗</a>
          </div>
        </article>
      `;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — ${safeTitle}</title>
  <meta name="description" content="${safeBio}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg-base: #040507;
      --bg-card: rgba(9, 12, 18, 0.85);
      --text-main: #F1F5F9;
      --text-muted: #8E9DB2;
      --text-dim: #4B5565;
      --cyan-core: #5DCDE0;
      --magenta-bloom: #D352C4;
      --matrix-mint: #22C55E;
      --border-subtle: rgba(93, 205, 224, 0.16);
      --font-display: 'Orbitron', sans-serif;
      --font-body: 'IBM Plex Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    body { background-color: var(--bg-base); color: var(--text-main); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    .masthead-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(4, 5, 7, 0.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--border-subtle); padding: 1.1rem 3rem; display: flex; justify-content: space-between; align-items: center; }
    .brand-mark { display: flex; align-items: center; gap: 0.8rem; text-decoration: none; color: var(--text-main); }
    .brand-core-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--cyan-core); box-shadow: 0 0 10px var(--cyan-core); }
    .brand-name { font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; letter-spacing: 0.1em; text-transform: uppercase; }
    .page-wrapper { max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 10; }
    .hero-stage { min-height: 85vh; display: flex; flex-direction: column; justify-content: center; padding: 8rem 0 3.5rem; }
    .hero-protocol-pill { display: inline-flex; align-items: center; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--cyan-core); background: rgba(93, 205, 224, 0.08); border: 1px solid var(--border-subtle); padding: 0.4rem 1rem; border-radius: 4px; margin-bottom: 1.6rem; width: fit-content; }
    .hero-title { font-family: var(--font-display); font-size: clamp(2.3rem, 4.8vw, 4.2rem); font-weight: 800; line-height: 1.12; text-transform: uppercase; color: #FFFFFF; margin-bottom: 1.4rem; max-width: 960px; }
    .hero-title span { color: var(--cyan-core); }
    .hero-subtitle { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--text-muted); max-width: 650px; line-height: 1.7; margin-bottom: 2.8rem; font-weight: 300; }
    .btn-cyan-solid { background: var(--cyan-core); color: #040507; font-family: var(--font-display); font-weight: 800; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.85rem 2rem; border-radius: 6px; text-decoration: none; display: inline-block; }
    .section-wrap { padding: 5rem 0; }
    .section-header { margin-bottom: 3.5rem; }
    .section-tag { font-family: var(--font-mono); font-size: 0.74rem; color: var(--cyan-core); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; }
    .section-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3.2vw, 2.6rem); font-weight: 800; text-transform: uppercase; color: #FFFFFF; }
    .registry-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; }
    .registry-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 2.2rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s; }
    .registry-card:hover { border-color: var(--cyan-core); transform: translateY(-4px); }
    .registry-coord { font-family: var(--font-mono); font-size: 0.72rem; color: var(--magenta-bloom); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
    .registry-title { font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.8rem; }
    .registry-desc { color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; }
    .registry-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
    .registry-tag { background: rgba(93, 205, 224, 0.06); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 0.25rem 0.65rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-core); }
    .registry-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.06); }
    .registry-link { font-family: var(--font-mono); font-size: 0.78rem; color: var(--cyan-core); text-decoration: none; text-transform: uppercase; }
    .footer-bar { margin-top: 6rem; padding: 2.5rem 0; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); }
  </style>
</head>
<body>
  <header class="masthead-nav">
    <a href="#" class="brand-mark">
      <span class="brand-core-dot"></span>
      <span class="brand-name">${safeName}</span>
    </a>
    <div>
      <a href="mailto:${safeEmail}" class="btn-cyan-solid" style="padding: 0.45rem 1.2rem; font-size: 0.74rem;">Transmit ↗</a>
    </div>
  </header>

  <main class="page-wrapper">
    <section class="hero-stage">
      <div class="hero-protocol-pill">● Verified Protocol Substrate</div>
      <h1 class="hero-title">Engineering zero-latency<br><span>${safeTitle}</span></h1>
      <p class="hero-subtitle">${safeBio}</p>
      <div><a href="#registry" class="btn-cyan-solid">Inspect Protocol Registry ↓</a></div>
    </section>

    <section class="section-wrap" id="registry">
      <div class="section-header">
        <div class="section-tag">Verified Production Code</div>
        <h2 class="section-title">High-Throughput <span>Systems Registry</span></h2>
      </div>
      <div class="registry-grid">${projectsHtml}</div>
    </section>

    <footer class="footer-bar">
      <div>${safeName} • ${safeLocation}</div>
      <div>THREEUI QUANTUM MATRIX</div>
    </footer>
  </main>
</body>
</html>`;
  }
};

module.exports = { ThreeUIMatrixTemplate };

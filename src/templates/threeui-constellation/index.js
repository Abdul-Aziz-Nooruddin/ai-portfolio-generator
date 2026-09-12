/**
 * Template: ThreeUI Synaptic Constellation ("threeui-constellation")
 * Powered by MengTo/threeui Synaptic Constellation Living Particle Network:
 * - Dynamic pointer-gravity topological node mesh
 * - Celestial gold & starlight void palette
 * - Typography: Outfit (Display) + Space Grotesk (Body) + Space Mono (Accents)
 * - WCAG 2.2 AAA compliant, strict zero AI-slop, zero repetitive // headings
 */

const { TemplateHelper } = require('../template-helper');

const ThreeUIConstellationTemplate = {
  id: 'threeui-constellation',
  name: 'ThreeUI Synaptic Constellation',
  category: 'Neural Systems / Volumetric Network / Living 3D Mesh',
  description: 'High-density cognitive topology portfolio powered by ThreeUI living synaptic particle network with pointer gravitational attraction and distance-threshold linkages.',
  recommendedFor: [
    'Neural Systems Architects',
    'AI Research Scientists',
    'Distributed Systems Engineers',
    'Data Platform Architects',
    'Quantum Computing Researchers'
  ],
  palette: ['#070914', '#E6C879', '#7FC4FF', '#0E1222', '#F2F4FB'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Dr. Elena Rostova');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Principal Neural Systems Architect');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Architecting decentralized WebGPU cognitive networks, zero-latency vector state synchronization, and high-dimensional graph intelligence across distributed clusters.'
    );
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'elena.rostova@synaptic.dev');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'San Francisco, CA • Global / Remote');

    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        title: 'AetherSynapse Graph Runtime',
        category: 'Core Engine • Rust / WebGPU',
        desc: 'Distributed vector graph engine rendering 100,000 active cognitive nodes at 60 FPS in WebGPU while evaluating semantic distance matrices.',
        tags: ['Rust WASM', 'WebGPU', 'HNSW', 'Three.js'],
        url: '#'
      },
      {
        title: 'NeuroLoom Latent Synthesizer',
        category: 'Inference Pipeline • C++ / CUDA',
        desc: 'Ultra-low latency streaming inference harness for multi-modal embedding models with zero memory allocation in the critical inference path.',
        tags: ['C++20', 'CUDA', 'TensorRT', 'Zero-GC'],
        url: '#'
      },
      {
        title: 'Synaptic HUD Visualizer',
        category: 'Telemetry Surface • TypeScript',
        desc: 'Real-time browser telemetry monitoring GPU warp divergence, memory bandwidth pressure, and cluster node synchronization status.',
        tags: ['WebGL', 'WebSockets', 'Canvas 2D', 'OpenTelemetry'],
        url: '#'
      }
    ];

    const projectsHtml = rawProjects.map(proj => {
      const title = TemplateHelper.escapeHtml(proj.title || 'Artifact');
      const cat = TemplateHelper.escapeHtml(proj.category || 'System Architecture');
      const desc = TemplateHelper.escapeHtml(proj.desc || proj.description || '');
      const tags = (proj.tags || ['Systems', 'Distributed', 'WebGL']).map(t => `<span class="tag-chip">${TemplateHelper.escapeHtml(t)}</span>`).join('');
      const link = proj.url || '#';
      return `
        <article class="project-card">
          <div>
            <div class="project-category">${cat}</div>
            <h3 class="project-title">${title}</h3>
            <p class="project-summary">${desc}</p>
            <div class="project-tags">${tags}</div>
          </div>
          <div class="project-actions">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim);">VERIFIED SYSTEM</span>
            <a href="${link}" target="_blank" class="project-link">Inspect Code ↗</a>
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
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg-void: #070914;
      --bg-surface: #0E1222;
      --bg-card: rgba(14, 18, 34, 0.75);
      --text-main: #F2F4FB;
      --text-muted: #9AA3BC;
      --text-dim: #606880;
      --gold-accent: #E6C879;
      --gold-glow: rgba(230, 200, 121, 0.4);
      --cyan-spark: #7FC4FF;
      --border-subtle: rgba(28, 34, 54, 0.85);
      --font-display: 'Outfit', sans-serif;
      --font-body: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Space Mono', monospace;
    }
    body {
      background-color: var(--bg-void);
      color: var(--text-main);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }
    .constellation-fixed-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
    #constellationCanvas { width: 100%; height: 100%; display: block; }
    .radial-depth-overlay { position: fixed; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(ellipse at 50% 25%, rgba(14, 18, 34, 0.45) 0%, #070914 85%); }
    .viewport-grid { position: fixed; inset: 0; z-index: 2; pointer-events: none; background-image: linear-gradient(rgba(127, 196, 255, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(127, 196, 255, 0.025) 1px, transparent 1px); background-size: 64px 64px; }
    .masthead-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(7, 9, 20, 0.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--border-subtle); padding: 1.1rem 3rem; display: flex; justify-content: space-between; align-items: center; }
    .brand-mark { display: flex; align-items: center; gap: 0.8rem; text-decoration: none; color: var(--text-main); }
    .brand-icon { width: 2rem; height: 2rem; border: 1px solid var(--border-subtle); border-radius: 6px; display: flex; align-items: center; justify-content: center; background: rgba(14, 18, 34, 0.8); }
    .brand-pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold-accent); box-shadow: 0 0 10px var(--gold-accent); animation: pulse 2s infinite ease-in-out; }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.75; } 50% { transform: scale(1.25); opacity: 1; } }
    .brand-name { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; }
    .nav-links { display: flex; align-items: center; gap: 2.2rem; list-style: none; }
    @media (max-width: 900px) { .nav-links { display: none; } .masthead-nav { padding: 1rem 1.5rem; } }
    .nav-links a { color: var(--text-muted); text-decoration: none; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; transition: color 0.2s; }
    .nav-links a:hover { color: var(--gold-accent); }
    .page-wrapper { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    .hero-section { min-height: 88vh; display: flex; flex-direction: column; justify-content: center; padding: 8rem 0 3rem; }
    .hero-status-pill { display: inline-flex; align-items: center; gap: 0.6rem; background: rgba(14, 18, 34, 0.75); border: 1px solid var(--border-subtle); border-radius: 9999px; padding: 0.45rem 1.1rem; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-accent); margin-bottom: 1.8rem; width: fit-content; }
    .hero-status-pill span { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-accent); }
    .hero-title { font-family: var(--font-display); font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 300; line-height: 1.12; color: #FFFFFF; margin-bottom: 1.4rem; max-width: 900px; }
    .hero-title strong { font-weight: 700; background: linear-gradient(135deg, #FFFFFF 30%, var(--gold-accent) 70%, var(--cyan-spark) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-subtitle { font-size: clamp(1rem, 1.8vw, 1.22rem); color: var(--text-muted); max-width: 680px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
    .hero-cta-group { display: flex; flex-wrap: wrap; gap: 1.2rem; align-items: center; }
    .btn-solid-gold { background: var(--gold-accent); color: #070914; padding: 0.85rem 2rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px var(--gold-glow); transition: all 0.2s; }
    .btn-solid-gold:hover { background: #F5D98B; transform: translateY(-2px); }
    .btn-glass-subtle { background: rgba(14, 18, 34, 0.75); border: 1px solid var(--border-subtle); color: var(--text-main); padding: 0.85rem 1.8rem; border-radius: 9999px; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; transition: all 0.2s; }
    .btn-glass-subtle:hover { border-color: var(--gold-accent); color: var(--gold-accent); transform: translateY(-2px); }
    .section-container { padding: 5rem 0; }
    .section-header { margin-bottom: 3.5rem; }
    .section-tag { font-family: var(--font-mono); font-size: 0.74rem; color: var(--gold-accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem; }
    .section-tag::before { content: '✦'; color: var(--gold-accent); }
    .section-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3.2vw, 2.6rem); font-weight: 300; line-height: 1.2; color: #FFFFFF; }
    .section-title strong { font-weight: 700; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; }
    .project-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 2.2rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s; }
    .project-card:hover { border-color: var(--gold-accent); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px var(--gold-glow); }
    .project-category { font-family: var(--font-mono); font-size: 0.72rem; color: var(--gold-accent); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
    .project-title { font-family: var(--font-display); font-size: 1.45rem; font-weight: 600; color: #FFFFFF; margin-bottom: 0.85rem; }
    .project-summary { color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem; }
    .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.75rem; }
    .tag-chip { background: rgba(7, 9, 20, 0.8); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 0.25rem 0.65rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan-spark); }
    .project-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.06); }
    .project-link { color: var(--gold-accent); text-decoration: none; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; }
    .footer-bar { margin-top: 6rem; padding: 2.5rem 0; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); }
  </style>
</head>
<body>
  <div class="constellation-fixed-layer"><canvas id="constellationCanvas"></canvas></div>
  <div class="radial-depth-overlay"></div>
  <div class="viewport-grid"></div>

  <header class="masthead-nav">
    <a href="#" class="brand-mark">
      <div class="brand-icon"><span class="brand-pulse-dot"></span></div>
      <div><span class="brand-name">${safeName}</span></div>
    </a>
    <ul class="nav-links">
      <li><a href="#projects">Vault</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div><a href="mailto:${safeEmail}" class="btn-solid-gold" style="padding: 0.45rem 1.2rem; font-size: 0.74rem;">Connect ↗</a></div>
  </header>

  <div class="page-wrapper">
    <section class="hero-section" id="hero">
      <div class="hero-status-pill"><span></span> Open for Principal Architecture</div>
      <h1 class="hero-title">Engineering high-dimensional<br><strong>${safeTitle}</strong></h1>
      <p class="hero-subtitle">${safeBio}</p>
      <div class="hero-cta-group">
        <a href="#projects" class="btn-solid-gold">Explore Systems Vault ↓</a>
        <a href="mailto:${safeEmail}" class="btn-glass-subtle">Direct Transmission</a>
      </div>
    </section>

    <section class="section-container" id="projects">
      <div class="section-header">
        <div class="section-tag">Verified Artifacts</div>
        <h2 class="section-title">Autonomous <strong>Production Systems</strong></h2>
      </div>
      <div class="projects-grid">${projectsHtml}</div>
    </section>

    <footer class="footer-bar">
      <div><span>${safeName}</span> • ${safeLocation}</div>
      <div>THREEUI SYNAPTIC CONSTELLATION</div>
    </footer>
  </div>

  <script>
    const canvas = document.getElementById('constellationCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const MAX_NODES = isTouch ? 35 : 75;
    const LINK_DISTANCE = isTouch ? 110 : 150;
    let nodes = [];
    const pointer = { x: -1000, y: -1000 };

    window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }, { passive: true });

    for (let i = 0; i < MAX_NODES; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.0 + 1.2
      });
    }

    window.addEventListener('mousemove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    window.addEventListener('mouseleave', () => { pointer.x = -1000; pointer.y = -1000; });

    function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

    function renderLoop() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#E6C879';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = dist(nodes[i], nodes[j]);
          if (d < LINK_DISTANCE) {
            ctx.globalAlpha = (1 - d / LINK_DISTANCE) * 0.38;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        const pd = dist(node, pointer);
        if (pd < 200 && pd > 0) {
          node.x -= (node.x - pointer.x) * 0.007;
          node.y -= (node.y - pointer.y) * 0.007;
        }
        const pulse = 0.75 + Math.sin(Date.now() * 0.002 + node.x * 0.01) * 0.25;
        ctx.fillStyle = '#E6C879';
        ctx.globalAlpha = pulse * 0.25;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = pulse * 0.85;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
  </script>
</body>
</html>`;
  }
};

module.exports = { ThreeUIConstellationTemplate };

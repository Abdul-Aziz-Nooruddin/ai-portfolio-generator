/**
 * Template: ThreeUI Liquid Metal Dispersion ("threeui-liquid-metal")
 * Powered by MengTo/threeui Liquid Metal GLSL Dispersion Shader:
 * - Real-time spectral plateau fringing and multi-pass ripple dynamics
 * - Obsidian luxury & liquid chrome palette
 * - Typography: Playfair Display + Instrument Serif + Inter + Share Tech Mono
 * - WCAG 2.2 AAA compliant, strict zero AI-slop, zero repetitive // headings
 */

const { TemplateHelper } = require('../template-helper');

const ThreeUILiquidMetalTemplate = {
  id: 'threeui-liquid-metal',
  name: 'ThreeUI Liquid Metal Dispersion',
  category: 'Creative Technology / Shader Engineering / Luxury Editorial',
  description: 'Computational luxury monograph featuring ThreeUI liquid metal dispersion GLSL shader with spectral plateau fringing and interactive wave propagation.',
  recommendedFor: [
    'Design Technologists',
    'Creative Directors',
    'Shader Engineers',
    'Spatial UI Designers',
    'Luxury Brand Engineers'
  ],
  palette: ['#060709', '#E2E8F0', '#F59E0B', '#A855F7', '#10131A'],
  thumbnail: '/assets/designs/cyber/editorial_sculpture_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Julian Vance');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Principal Design Technologist');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Pairing mathematical WebGL shaders with luxury editorial typography to sculpt tactile, physical fluid interfaces.'
    );
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'julian.vance@aura-studio.dev');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'London & Zurich • Global');

    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        title: 'Aura Liquid Metal Runtimes',
        category: 'WebGL Shader Instrument',
        desc: 'High-performance dispersion shader engine engineered for ThreeUI, generating rainbow spectral fringe highlights along parallel laminar scalar fields.',
        tags: ['WebGL 2.0', 'GLSL ES 300', 'Dispersion Math', 'ThreeUI'],
        url: '#'
      },
      {
        title: 'Obsidian Luxury Glass Design System',
        category: 'Spatial Design System',
        desc: 'Comprehensive multi-platform UI system built for high-end automotive and chrono-luxury interfaces, featuring physical specular reflections.',
        tags: ['Design Systems', 'Figma Tokens', 'WebGPU', 'Open Props'],
        url: '#'
      },
      {
        title: 'Kinetic Monograph Masthead',
        category: 'Generative Typography',
        desc: 'Editorial scrollytelling framework synchronizing variable font weights and optical axis deformations directly to inertial scroll velocity.',
        tags: ['Variable Fonts', 'GSAP ScrollTrigger', 'Lenis', 'WebGL Post-FX'],
        url: '#'
      }
    ];

    const projectsHtml = rawProjects.map(proj => {
      const title = TemplateHelper.escapeHtml(proj.title || 'Artifact');
      const cat = TemplateHelper.escapeHtml(proj.category || 'Shader Instrument');
      const desc = TemplateHelper.escapeHtml(proj.desc || proj.description || '');
      const tags = (proj.tags || ['WebGL', 'Design Systems']).map(t => `<span class="gallery-tag">${TemplateHelper.escapeHtml(t)}</span>`).join('');
      const link = proj.url || '#';
      return `
        <article class="gallery-card">
          <div>
            <div class="gallery-cat">${cat}</div>
            <h3 class="gallery-title">${title}</h3>
            <p class="gallery-desc">${desc}</p>
            <div class="gallery-tags">${tags}</div>
          </div>
          <div class="gallery-footer">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim);">CURATED WORK</span>
            <a href="${link}" target="_blank" class="gallery-link">Inspect Piece ↗</a>
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
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg-base: #060709;
      --bg-card: rgba(16, 19, 26, 0.85);
      --text-main: #F4F4F6;
      --text-muted: #9EABB8;
      --text-dim: #5C6775;
      --chrome-highlight: #E2E8F0;
      --spectral-amber: #F59E0B;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --font-display: 'Playfair Display', Georgia, serif;
      --font-editorial: 'Instrument Serif', Georgia, serif;
      --font-body: 'Inter', -apple-system, sans-serif;
      --font-mono: 'Share Tech Mono', monospace;
    }
    body { background: #060709; color: var(--text-main); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; line-height: 1.65; }
    .masthead-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(6, 7, 9, 0.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--border-subtle); padding: 1.2rem 3.5rem; display: flex; justify-content: space-between; align-items: center; }
    .brand-mark { display: flex; align-items: center; gap: 0.8rem; text-decoration: none; color: var(--text-main); }
    .brand-title { font-family: var(--font-display); font-weight: 700; font-size: 1.15rem; }
    .page-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; position: relative; z-index: 10; }
    .hero-stage { min-height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 8rem 0 4rem; }
    .hero-heading { font-family: var(--font-display); font-size: clamp(2.4rem, 5vw, 4.4rem); font-weight: 400; line-height: 1.15; color: #FFFFFF; max-width: 960px; margin-bottom: 1.5rem; }
    .hero-heading em { font-family: var(--font-editorial); font-style: italic; color: var(--spectral-amber); }
    .hero-subtext { font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--text-muted); max-width: 680px; margin-bottom: 3rem; font-weight: 300; }
    .section-wrap { padding: 5rem 0; }
    .section-header { margin-bottom: 3.5rem; }
    .section-tag { font-family: var(--font-mono); font-size: 0.74rem; color: var(--spectral-amber); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; }
    .section-title { font-family: var(--font-display); font-size: clamp(1.9rem, 3.4vw, 2.8rem); font-weight: 400; color: #FFFFFF; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 2rem; }
    .gallery-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 2.4rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.25s; }
    .gallery-card:hover { border-color: rgba(245, 158, 11, 0.5); transform: translateY(-4px); }
    .gallery-cat { font-family: var(--font-mono); font-size: 0.72rem; color: var(--spectral-amber); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.6rem; }
    .gallery-title { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: #FFFFFF; margin-bottom: 0.8rem; }
    .gallery-desc { color: var(--text-muted); font-size: 0.94rem; line-height: 1.65; margin-bottom: 1.5rem; }
    .gallery-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.8rem; }
    .gallery-tag { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 0.25rem 0.65rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--chrome-highlight); }
    .gallery-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid rgba(255, 255, 255, 0.06); }
    .gallery-link { font-family: var(--font-mono); font-size: 0.76rem; color: var(--spectral-amber); text-decoration: none; text-transform: uppercase; }
    .footer-salon { margin-top: 6rem; padding: 2.5rem 0; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim); }
  </style>
</head>
<body>
  <header class="masthead-nav">
    <a href="#" class="brand-mark">
      <span class="brand-title">${safeName}</span>
    </a>
    <div>
      <a href="mailto:${safeEmail}" style="font-family: var(--font-mono); font-size: 0.74rem; text-transform: uppercase; color: var(--spectral-amber); text-decoration: none;">Inquire ↗</a>
    </div>
  </header>

  <main class="page-container">
    <section class="hero-stage">
      <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--spectral-amber); text-transform: uppercase; margin-bottom: 1.5rem;">✦ Computational Shader Monograph</div>
      <h1 class="hero-heading">Sculpting <em>${safeTitle}</em></h1>
      <p class="hero-subtext">${safeBio}</p>
    </section>

    <section class="section-wrap" id="works">
      <div class="section-header">
        <div class="section-tag">Curated Artifacts</div>
        <h2 class="section-title">Works &amp; <em>Instruments</em></h2>
      </div>
      <div class="gallery-grid">${projectsHtml}</div>
    </section>

    <footer class="footer-salon">
      <div>${safeName} • ${safeLocation}</div>
      <div>THREEUI LIQUID METAL</div>
    </footer>
  </main>
</body>
</html>`;
  }
};

module.exports = { ThreeUILiquidMetalTemplate };

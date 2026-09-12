/**
 * Template: ThreeUI Sylva Living World ("threeui-sylva")
 * Powered by MengTo/threeui Sylva Living World 3D Engine:
 * - 4 Seasonal themes: Living Green, Sakura Sunset, Maple Autumn, Sequoia Mist
 * - Procedural mathematical boughs with wind vertex displacement & moss shaders
 * - Animated 3D fluttering butterfly that tracks pointer proximity
 * - Floating glassmorphic HUD telemetry cards & scrollytelling depth
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUISylvaTemplate = {
  id: 'threeui-sylva',
  name: 'ThreeUI Sylva (Living World 3D)',
  category: 'Living Nature / Procedural Boughs / Interactive Fauna',
  description: 'Living 3D nature environment featuring procedural spline branches, wind vertex displacement, animated fluttering butterfly, volumetric motes, and 4-season real-time switching.',
  recommendedFor: [
    'Spatial Computing Architects',
    'CleanTech & Climate Engineers',
    'Biotech Founders & Researchers',
    'Creative Technologists',
    'Interaction Designers'
  ],
  palette: ['#383b34', '#86efac', '#f472b6', '#fb923c', '#38bdf8'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Dr. Aris Thorne');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Principal Spatial & Ecological Systems Architect');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Architecting real-time WebGL ecosystems, spatial interfaces, and agentic environmental physics models.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'aris.thorne@spatial-ecology.io');

    const livingHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'portfolio-living-world.html');
    let html = '';
    try {
      html = fs.readFileSync(livingHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read portfolio-living-world.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Sylva template</h1></body></html>`;
    }

    html = html.replace(/Dr\. Aris Thorne/g, safeName);
    html = html.replace(/ARIS THORNE/g, safeName.toUpperCase());
    html = html.replace(/SPATIAL COMPUTING & ECOLOGICAL SIMULATION/g, safeRole.toUpperCase());
    html = html.replace(/Principal Spatial & Ecological Systems Architect/g, safeRole);
    html = html.replace(/aris\.thorne@spatial-ecology\.io/g, safeEmail);

    // Dynamic Projects replacement
    const rawProjects = data.projects || [];
    if (rawProjects.length > 0) {
      const projectsCards = rawProjects.map((p, idx) => {
        const title = TemplateHelper.escapeHtml(p.title || p.name || `Project 0${idx + 1}`);
        const desc = TemplateHelper.escapeHtml(p.description || p.brief || '');
        const category = TemplateHelper.escapeHtml(p.category || 'Spatial Engineering');
        const year = TemplateHelper.escapeHtml(p.year || '2026');
        const rawTech = p.technologies || p.tech || p.tags || ['TypeScript', 'Three.js'];
        const techList = Array.isArray(rawTech) ? rawTech : (typeof rawTech === 'string' ? rawTech.split(',').map(s => s.trim()) : ['TypeScript', 'Three.js']);
        const tags = techList.map(t => `<span class="tag">${TemplateHelper.escapeHtml(t)}</span>`).join('');
        return `
      <!-- Project ${idx + 1} -->
      <article class="project-card">
        <div>
          <div class="project-meta">
            <span class="project-category">${category}</span>
            <span class="project-year">${year}</span>
          </div>
          <h3 class="project-name">${title}</h3>
          <p class="project-brief">${desc}</p>
        </div>
        <div class="project-tags">
          ${tags}
        </div>
      </article>`;
      }).join('\n');

      html = html.replace(/<div class="projects-grid">[\s\S]*?<\/div>\s*<\/section>/, `<div class="projects-grid">\n${projectsCards}\n    </div>\n  </section>`);
    }

    return html;
  },

  render404Page(candidateData = {}) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Canopy Lost · 404</title>
  <style>
    body { margin: 0; background: #383b34; color: #ffffff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1rem; color: #86efac; }
    p { font-size: 1.2rem; color: rgba(255,255,255,0.7); max-width: 480px; margin: 0 auto 2rem; }
    a { display: inline-block; padding: 12px 24px; border: 1px solid #86efac; color: #86efac; text-decoration: none; border-radius: 999px; }
    a:hover { background: #86efac; color: #111827; }
  </style>
</head>
<body>
  <div>
    <h1>Canopy Path Lost</h1>
    <p>The requested route has drifted outside the living canopy coordinate system.</p>
    <a href="/">Return to Living World</a>
  </div>
</body>
</html>`;
  }
};

module.exports = { ThreeUISylvaTemplate };

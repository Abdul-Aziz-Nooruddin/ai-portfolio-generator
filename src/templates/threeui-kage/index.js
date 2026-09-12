/**
 * Template: ThreeUI Kage Shrine ("threeui-kage")
 * Powered by MengTo/threeui Kage Japanese Mountain Temple Engine:
 * - Real-time WebGL charred cypress, 3D pagoda, vermilion moon, and swaying tall grass
 * - Illuminated stone lanterns and five-chapter night walk narrative
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUIKageTemplate = {
  id: 'threeui-kage',
  name: 'ThreeUI Kage (Kyoto Mountain Shrine)',
  category: 'Japanese Atmospheric WebGL / Night Walk Shrine',
  description: 'Immersive night walk through a Kyoto mountain temple rendered live in WebGL with charred cypress, vermilion moon, swaying tall grass, and illuminated lanterns.',
  recommendedFor: [
    'Narrative Directors',
    'Game Developers & 3D Worldbuilders',
    'Creative Directors & Illustrators',
    'Cultural Heritage Technologists',
    'Audio & Interaction Designers'
  ],
  palette: ['#05070a', '#dfe7e0', '#e0231c', '#c9a24a', '#ff5a3c'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Kyoto Night Walk');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Interactive 3D Architect');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Enter Kyoto through quiet thresholds where ritual, craft, and memory shape the path.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'contact@myfolio.tech');
    const rawProjects = data.projects || [];

    const kageHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'kage-living-world.html');
    let html = '';
    try {
      html = fs.readFileSync(kageHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read kage-living-world.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Kage template</h1></body></html>`;
    }

    html = html.replace(/<title>Kage — Where stillness reveals the unseen<\/title>/, `<title>${safeName} — Kyoto Night Walk</title>`);
    html = html.replace(/Enter Kyoto through its quiet thresholds, where ritual,\s*craft, and memory shape the path\./, `${safeName} · ${safeRole}. ${safeBio}`);
    html = html.replace(/© 2026 Kage — Kage no Michi/, `© 2026 ${safeName} — ${safeEmail}`);

    if (rawProjects.length > 0) {
      const projectLessons = rawProjects.slice(0, 5).map((p, i) => {
        const pTitle = TemplateHelper.escapeHtml(p.title || p.name || `Artifact 0${i + 1}`);
        const pDesc = TemplateHelper.escapeHtml(p.description || p.brief || '');
        const pCat = TemplateHelper.escapeHtml(p.category || 'System');
        const pYear = TemplateHelper.escapeHtml(p.year || '2026');
        return `
    <div class="les" data-les="${i}" data-cursor>
      <span class="k">0${i + 1}</span>
      <h3>${pTitle}<em class="jp">${pCat}</em></h3>
      <p>${pDesc}</p>
      <span class="t">${pYear}</span><i class="bar"></i>
    </div>`;
      }).join('\n');

      html = html.replace(/<div class="cur" id="cur">[\s\S]*?<\/div>\s*<\/section>/, `<div class="cur" id="cur">\n${projectLessons}\n  </div>\n</section>`);
    }

    return html;
  },

  render404Page(candidateData = {}) {
    return `<!DOCTYPE html><html><body style="background:#05070a;color:#dfe7e0;font-family:sans-serif;text-align:center;padding-top:20vh;"><h1>Shadow Path Diverged · 404</h1><p>The mountain path is obscured in shadow.</p><a href="/" style="color:#e0231c;">Return to Shrine</a></body></html>`;
  }
};

module.exports = { ThreeUIKageTemplate };

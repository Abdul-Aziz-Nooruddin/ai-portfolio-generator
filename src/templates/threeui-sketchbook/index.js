/**
 * Template: ThreeUI Sketchbook ("threeui-sketchbook")
 * Powered by MengTo/threeui 3D Architectural Watercolor Sketchbook:
 * - Physical page-turning 3D flipbook with watercolor architectural monuments
 * - Interactive magnifying glass inspection lens
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUISketchbookTemplate = {
  id: 'threeui-sketchbook',
  name: 'ThreeUI Sketchbook (3D Watercolor Flipbook)',
  category: 'Spatial Flipbooks & Curios / Watercolor 3D Book',
  description: 'Physical 3D architectural flipbook with turning pages, watercolor monuments, and an interactive magnifying inspection lens.',
  recommendedFor: [
    'Illustrators & Editorial Designers',
    'Architects & Urban Planners',
    'Creative Directors & Visual Artists',
    'Design Technologists'
  ],
  palette: ['#ece7dc', '#2b2721', '#9a6a3e', '#7c6d59', '#f0ece2'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Meng To');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Designer, Creator & Visual Technologist');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Exploring the seam between craft and code in physical 3D and watercolor.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'hello@myfolio.tech');
    const rawProjects = data.projects || [];

    const sbHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'sketchbook-3d.html');
    let html = '';
    try {
      html = fs.readFileSync(sbHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read sketchbook-3d.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Sketchbook template</h1></body></html>`;
    }

    html = html.replace(/<title>Meng To<\/title>/, `<title>${safeName} — 3D Sketchbook</title>`);
    html = html.replace(/<a class="name" href="#">Meng To<\/a>/, `<a class="name" href="#">${safeName}</a>`);
    html = html.replace(/<p class="hero-kicker">[^<]+<\/p>/, `<p class="hero-kicker">${safeRole}</p>`);
    html = html.replace(/<p class="bio">[\s\S]*?<\/p>/, `<p class="bio">${safeBio}</p>`);
    html = html.replace(/hello@mengto\.com/g, safeEmail);

    if (rawProjects.length > 0) {
      const platesList = rawProjects.map((p, idx) => {
        const pName = TemplateHelper.escapeHtml(p.title || p.name || `Plate 0${idx + 1}`);
        const pDesc = TemplateHelper.escapeHtml(p.description || p.brief || '');
        const pYear = TemplateHelper.escapeHtml(p.year || '2026');
        return `
      <li class="plate-item">
        <span class="plate-num">0${idx + 1}</span>
        <div class="plate-info">
          <h4>${pName}</h4>
          <p>${pDesc}</p>
        </div>
        <span class="plate-year">${pYear}</span>
      </li>`;
      }).join('\n');

      html = html.replace(/<ol class="plate-list" id="plateList"><\/ol>/, `<ol class="plate-list" id="plateList">\n${platesList}\n    </ol>`);
    }

    return html;
  },

  render404Page(candidateData = {}) {
    return `<!DOCTYPE html><html><body style="background:#ece7dc;color:#2b2721;font-family:serif;text-align:center;padding-top:20vh;"><h1>Page Not Sketched · 404</h1><p>This spread has not yet been drawn into the folio.</p><a href="/" style="color:#9a6a3e;">Return to Sketchbook</a></body></html>`;
  }
};

module.exports = { ThreeUISketchbookTemplate };

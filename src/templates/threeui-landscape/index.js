/**
 * Template: ThreeUI Landscape ("threeui-landscape")
 * Powered by MengTo/threeui Japanese Country Landscape 3D Engine:
 * - 3D terrain with interactive drag orbit
 * - Live time-of-day progression & weather simulation
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUILandscapeTemplate = {
  id: 'threeui-landscape',
  name: 'ThreeUI Landscape (Time & Weather 3D)',
  category: 'Interactive 3D Terrain / Weather Simulation',
  description: 'Interactive 3D Japanese countryside landscape with live time-of-day progression (Dawn, Noon, Sunset, Night) and real-time weather controls (Clear, Rain, Fog).',
  recommendedFor: [
    'Environmental Scientists & GIS Engineers',
    '3D Worldbuilders & Game Developers',
    'Landscape Architects & Urban Planners',
    'Creative Directors'
  ],
  palette: ['#ecdcbc', '#2e2515', '#a8621f', '#8b7c5c', '#fdf1d6'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Landscape Simulation');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'Architectural Simulation Specialist');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Stone, timber and tile converge into place, assembling spatial environments from the ground up.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'contact@myfolio.tech');
    const rawProjects = data.projects || [];
    const firstProject = rawProjects[0] ? TemplateHelper.escapeHtml(rawProjects[0].title || rawProjects[0].name || 'Project 01') : 'PORTFOLIO';

    const lsHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'landscape-3d.html');
    let html = '';
    try {
      html = fs.readFileSync(lsHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read landscape-3d.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Landscape template</h1></body></html>`;
    }

    html = html.replace(/<title>Landscape — Time & Weather<\/title>/, `<title>${safeName} — 3D Landscape & Weather</title>`);
    html = html.replace(/<div class="brand">TOWERS<\/div>/, `<div class="brand">${safeName.toUpperCase()}</div>`);
    html = html.replace(/<div class="top-mid">CONSTRUCTION&nbsp;STUDY&nbsp;\/&nbsp;01<\/div>/, `<div class="top-mid">${safeRole.toUpperCase()}</div>`);
    html = html.replace(/<div class="quote">[\s\S]*?<\/div>/, `<div class="quote"><div><i>“${safeBio}”</i></div></div>`);
    html = html.replace(/<div class="tag">ORIGINAL<br>RECONSTRUCTION<\/div>/, `<div class="tag">${safeEmail}<br>${firstProject}</div>`);

    return html;
  },

  render404Page(candidateData = {}) {
    return `<!DOCTYPE html><html><body style="background:#ecdcbc;color:#2e2515;font-family:sans-serif;text-align:center;padding-top:20vh;"><h1>Terrain Lost · 404</h1><p>The coordinates lie beyond the mapped landscape.</p><a href="/" style="color:#a8621f;">Return to Terrain</a></body></html>`;
  }
};

module.exports = { ThreeUILandscapeTemplate };

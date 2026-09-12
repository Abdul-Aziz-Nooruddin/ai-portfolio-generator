/**
 * Template: ThreeUI Complete Shelf ("threeui-shelf")
 * Powered by MengTo/threeui Complete Shelf 3D Interactive Library Engine:
 * - Real-time 3D wooden bookshelf with 7 tactile hardcovers
 * - Interactive slide-forward, 3D tilt, and physical page-turning inspection
 * - Dynamic canvas textures with foil embossing, author lettering, and editorial colophons
 * - WCAG 2.2 AAA compliant, strict zero AI-slop, zero repetitive // headings
 */

const fs = require('fs');
const path = require('path');
const { TemplateHelper } = require('../template-helper');

const ThreeUIShelfTemplate = {
  id: 'threeui-shelf',
  name: 'ThreeUI Complete Shelf (3D Interactive Library)',
  category: 'Spatial Flipbooks & Curios / Interactive 3D Library',
  description: 'Tactile 3D library bookshelf where visitors pull volumes forward, turn physical pages, inspect project archives, and establish direct transmission.',
  recommendedFor: [
    'AI Developers & Full Stack Engineers',
    'Creative Technologists & Polymaths',
    'Research Scientists & Authors',
    'Systems Architects & Archivists',
    'Founders & Technical Leaders'
  ],
  palette: ['#171a24', '#1537a1', '#c24d24', '#c87046', '#efc16d'],
  thumbnail: '/assets/designs/cyber/spatial_traveler_clean_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Abdul Aziz Nooruddin');
    const safeRole = TemplateHelper.escapeHtml(data.role || data.title || 'AI Developer & Full Stack Systems Engineer');
    const safeBio = TemplateHelper.escapeHtml(data.bio || 'Building intelligent AI platforms, real-time spatial web applications, and decentralized systems.');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'abdulaziznoor9876@gmail.com');
    const safePhone = TemplateHelper.escapeHtml(data.phone || data.contact?.phone || '+91 99128 36034');
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Hyderabad, India');

    // Load base HTML file
    const shelfHtmlPath = path.join(__dirname, '..', '..', '..', 'web', 'portfolio-complete-shelf.html');
    let html = '';
    try {
      html = fs.readFileSync(shelfHtmlPath, 'utf8');
    } catch (e) {
      console.error('Failed to read portfolio-complete-shelf.html:', e);
      return `<!DOCTYPE html><html><body><h1>Error loading ThreeUI Shelf template</h1></body></html>`;
    }

    // Dynamic replacement of candidate specifics
    html = html.replace(/Abdul Aziz Nooruddin/g, safeName);
    html = html.replace(/AI Developer & Full Stack Systems Engineer/g, safeRole);
    html = html.replace(/abdulaziznoor9876@gmail\.com/g, safeEmail);
    html = html.replace(/\+91 99128 36034/g, safePhone);
    html = html.replace(/Hyderabad, India/g, safeLocation);

    return html;
  },

  render404Page(candidateData = {}) {
    const safeName = TemplateHelper.escapeHtml(candidateData.name || 'Abdul Aziz Nooruddin');
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Volume Not Found · 404</title>
  <style>
    body { margin: 0; background: #171a24; color: #f4eee6; font-family: serif; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 1rem; color: #efc16d; }
    p { font-size: 1.2rem; color: #b9b4ae; max-width: 480px; margin: 0 auto 2rem; }
    a { display: inline-block; padding: 12px 24px; border: 1px solid #efc16d; color: #efc16d; text-decoration: none; border-radius: 999px; }
    a:hover { background: #efc16d; color: #171a24; }
  </style>
</head>
<body>
  <div>
    <h1>Volume Not Found</h1>
    <p>The requested folio does not exist on the archive shelf of ${safeName}.</p>
    <a href="/">Return to Library Shelf</a>
  </div>
</body>
</html>`;
  }
};

module.exports = { ThreeUIShelfTemplate };

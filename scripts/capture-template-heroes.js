const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');

const { TemplateRegistry } = require('../src/templates/template-registry');

async function captureTemplateHeroes() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  console.log('Using Chrome binary at:', chromePath);

  // Set up a temporary Express server on a safe dynamic port (e.g. 54321)
  const app = express();
  const PORT = 54321; // Never use 3000

  // Serve static assets from both public and web
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.static(path.join(__dirname, '..', 'web')));

  // Render endpoints for each template
  app.get('/preview/:templateId', (req, res) => {
    const templateId = req.params.templateId;
    const result = TemplateRegistry.render(templateId, {}, { isStaticPreview: true });
    const html = typeof result === 'string' ? result : (result.html || '');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  });

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Preview server running on port ${PORT}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1600,900',
      '--enable-webgl',
      '--use-gl=swiftshader',
      '--allow-file-access-from-files'
    ]
  });

  const templates = [
    { id: 'jack-3d-creator', filename: 'jack-3d-creator-hero.webp', fallbackJpg: 'jack-3d-creator-hero.jpg' },
    { id: 'nadia-brand', filename: 'nadia-brand-hero.webp', fallbackJpg: 'nadia-brand-hero.jpg' },
    { id: 'kage-temple', filename: 'kage-temple-hero.webp', fallbackJpg: 'kage-temple-hero.jpg' }
  ];

  const targetDirs = [
    path.join(__dirname, '..', 'public', 'assets', 'templates'),
    path.join(__dirname, '..', 'web', 'assets', 'templates')
  ];

  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  for (const t of templates) {
    console.log(`Capturing hero section for template: ${t.id}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });

    const url = `http://localhost:${PORT}/preview/${t.id}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for fonts, images, WebGL canvases, and initial animations to mount
    await new Promise((r) => setTimeout(r, 2500));

    // Capture the top hero viewport
    for (const dir of targetDirs) {
      const webpPath = path.join(dir, t.filename);
      const jpgPath = path.join(dir, t.fallbackJpg);

      await page.screenshot({
        path: webpPath,
        type: 'webp',
        quality: 92,
        clip: { x: 0, y: 0, width: 1600, height: 900 }
      });

      await page.screenshot({
        path: jpgPath,
        type: 'jpeg',
        quality: 92,
        clip: { x: 0, y: 0, width: 1600, height: 900 }
      });

      console.log(`Saved ${t.id} hero capture to ${webpPath} & ${jpgPath}`);
    }

    await page.close();
  }

  await browser.close();
  server.close();
  console.log('Finished capturing all template hero preview images successfully!');
}

captureTemplateHeroes().catch((err) => {
  console.error('Error capturing template hero previews:', err);
  process.exit(1);
});

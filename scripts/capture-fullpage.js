const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  console.log('Launching Chrome from:', chromePath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log('Navigating to https://www.myfolio.tech/ ...');
  await page.goto('https://www.myfolio.tech/', { waitUntil: 'networkidle2', timeout: 60000 });

  console.log('Waiting for initial animations...');
  await new Promise((r) => setTimeout(r, 2500));

  // Slowly scroll down the page to trigger all IntersectionObservers and lazy loads
  console.log('Surfing and scrolling through the entire page...');
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 400;
  for (let top = 0; top < scrollHeight; top += step) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await new Promise((r) => setTimeout(r, 80));
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));

  const outDir = path.join(__dirname, '..', 'brag-output');
  const compDir = path.join(outDir, 'composition', 'assets', 'images');
  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

  const targetJpg = path.join(outDir, 'fullpage_scroll.jpg');
  const compJpg = path.join(compDir, 'fullpage_scroll.jpg');

  console.log('Capturing full page screenshot...');
  await page.screenshot({
    path: targetJpg,
    type: 'jpeg',
    quality: 95,
    fullPage: true
  });

  fs.copyFileSync(targetJpg, compJpg);
  console.log('Saved fullpage screenshot to:', targetJpg);
  console.log('Copied to:', compJpg);

  // Also capture viewport screenshots of key scroll moments
  const heroJpg = path.join(compDir, 'hero_view.jpg');
  await page.screenshot({ path: heroJpg, type: 'jpeg', quality: 95 });

  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise((r) => setTimeout(r, 500));
  const ideaJpg = path.join(compDir, 'idea_view.jpg');
  await page.screenshot({ path: ideaJpg, type: 'jpeg', quality: 95 });

  await page.evaluate(() => window.scrollTo(0, 2200));
  await new Promise((r) => setTimeout(r, 500));
  const templatesJpg = path.join(compDir, 'templates_view.jpg');
  await page.screenshot({ path: templatesJpg, type: 'jpeg', quality: 95 });

  await page.evaluate(() => window.scrollTo(0, 3600));
  await new Promise((r) => setTimeout(r, 500));
  const pricingJpg = path.join(compDir, 'pricing_view.jpg');
  await page.screenshot({ path: pricingJpg, type: 'jpeg', quality: 95 });

  await browser.close();
  console.log('Done capturing all homepage views!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});

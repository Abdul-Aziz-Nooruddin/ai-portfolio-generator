const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert');

function getMd5(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(data).digest('hex');
}

console.log('▶ 🎨 Verifying 22 Visual Themes Artwork Uniqueness in design-demo.html');

const html = fs.readFileSync(path.join(__dirname, '../web/design-demo.html'), 'utf8');

// 1. Extract all card <img> src paths
const cardImgMatches = [...html.matchAll(/<div class="universe-hub-card[^>]*id="card-([^"]+)"[^>]*>[\s\S]*?<img src="([^"]+)"/g)];

console.log(`Found ${cardImgMatches.length} universe cards.`);
assert.strictEqual(cardImgMatches.length, 22, 'Must have exactly 22 universe cards in gallery');

const seenSrcs = new Set();
const seenMd5s = new Map();

for (const match of cardImgMatches) {
  const themeId = match[1];
  const src = match[2];
  console.log(`- Checking Card [${themeId}]: ${src}`);

  assert(!seenSrcs.has(src), `Duplicate image path found for card [${themeId}]: ${src}`);
  seenSrcs.add(src);

  // Verify file exists on disk
  const localPath = path.join(__dirname, '../public', src.replace(/^\//, ''));
  assert(fs.existsSync(localPath), `File does not exist on disk: ${localPath}`);

  const hash = getMd5(localPath);
  assert(!seenMd5s.has(hash), `MD5 collision between [${themeId}] and [${seenMd5s.get(hash)}]!`);
  seenMd5s.set(hash, themeId);
}

// 2. Extract themeBackgrounds dictionary
const bgDictMatch = html.match(/const themeBackgrounds = \{([\s\S]*?)\};/);
assert(bgDictMatch, 'themeBackgrounds dictionary must exist in design-demo.html');

const lines = bgDictMatch[1].split('\n').filter(l => l.includes(':'));
console.log(`Found ${lines.length} background entries in themeBackgrounds.`);
assert.strictEqual(lines.length, 22, 'Must have exactly 22 themeBackgrounds entries');

for (const line of lines) {
  const parts = line.split(':');
  const theme = parts[0].trim().replace(/['"]/g, '');
  const url = parts[1].trim().replace(/['",]/g, '');

  const localPath = path.join(__dirname, '../public', url.replace(/^\//, ''));
  assert(fs.existsSync(localPath), `Background image does not exist on disk for [${theme}]: ${localPath}`);
}

console.log('✔ All 22 themes have distinct, valid, non-duplicate 3D artworks on disk!');

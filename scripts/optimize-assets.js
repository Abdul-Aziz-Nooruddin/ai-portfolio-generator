const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIRS_TO_PROCESS = [
  path.join(__dirname, '..', 'web', 'assets'),
  path.join(__dirname, '..', 'public', 'assets')
];

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const webpPath = path.join(dirPath, `${baseName}.webp`);

        try {
          const stats = fs.statSync(fullPath);
          const origSizeKb = Math.round(stats.size / 1024);

          // 1. Generate WebP version if missing or if original was modified recently
          let generateWebp = !fs.existsSync(webpPath);
          if (!generateWebp) {
            const webpStats = fs.statSync(webpPath);
            if (webpStats.mtimeMs < stats.mtimeMs) {
              generateWebp = true;
            }
          }

          if (generateWebp) {
            const isTransparentPng = ext === '.png';
            let pipeline = sharp(fullPath);
            if (isTransparentPng) {
              await pipeline
                .webp({ quality: 85, effort: 4, alphaQuality: 90 })
                .toFile(webpPath);
            } else {
              await pipeline
                .webp({ quality: 82, effort: 4 })
                .toFile(webpPath);
            }
            const newStats = fs.statSync(webpPath);
            const newSizeKb = Math.round(newStats.size / 1024);
            const savedPct = Math.round((1 - newStats.size / stats.size) * 100);
            console.log(`[WEBP] ${entry.name}: ${origSizeKb}KB -> ${newSizeKb}KB (-${savedPct}%)`);
          }

          // 2. Also optimize large PNGs in-place if > 500KB and not yet optimized
          if (ext === '.png' && stats.size > 500 * 1024) {
            try {
              const optBuffer = await sharp(fullPath)
                .png({ quality: 85, compressionLevel: 9, effort: 7 })
                .toBuffer();
              if (optBuffer.length < stats.size * 0.92) {
                fs.writeFileSync(fullPath, optBuffer);
                const optKb = Math.round(optBuffer.length / 1024);
                console.log(`[PNG OPT] ${entry.name}: ${origSizeKb}KB -> ${optKb}KB`);
              }
            } catch (pngErr) {
              // skip if pngquant error
            }
          }
        } catch (err) {
          console.warn(`[WARN] Skipping ${entry.name}:`, err.message);
        }
      }
    }
  }
}

async function syncAssets() {
  // Sync web/assets/designs -> public/assets/designs
  const webDesigns = path.join(__dirname, '..', 'web', 'assets', 'designs');
  const pubDesigns = path.join(__dirname, '..', 'public', 'assets', 'designs');
  if (fs.existsSync(webDesigns)) {
    fs.cpSync(webDesigns, pubDesigns, { recursive: true });
    console.log('[SYNC] Synced web/assets/designs to public/assets/designs');
  }

  for (const dir of DIRS_TO_PROCESS) {
    console.log(`\n▶ Optimizing images in: ${dir}`);
    await processDirectory(dir);
  }
  console.log('\n✔ All 3D and platform assets optimized with WebP variants!');
}

syncAssets().catch(console.error);

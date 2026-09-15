/**
 * Verification Test Suite for the MyFolio Button Motion, Color & Effect System
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🧪 Running Button Motion & Effects System Test Suite...\n');

let failed = false;
function assert(desc, condition) {
  if (condition) {
    console.log(`✅ PASS: ${desc}`);
  } else {
    console.error(`❌ FAIL: ${desc}`);
    failed = true;
  }
}

// 1. Verify CSS System
const cssPath = path.join(__dirname, '..', 'web', 'button-system.css');
assert('button-system.css exists', fs.existsSync(cssPath));
const cssContent = fs.readFileSync(cssPath, 'utf8');

const families = [
  'FAMILY A: PRIMARY HERO CTA',
  'FAMILY B: LIQUID / FLUID',
  'FAMILY C: SPARK / AI GENERATIVE',
  'FAMILY D: SHIMMER / LIGHT-SWEEP',
  'FAMILY E: MAGNETIC NAV',
  'FAMILY F: GLASS & AURORA',
  'FAMILY G: NEON / CYBER ENERGY',
  'FAMILY H: 3D SPATIAL DEPTH',
  'FAMILY I: ORBIT & CAMERA ROTARY',
  'FAMILY J: KINETIC TOGGLE & SWITCH',
  'FAMILY K: MINIMALIST ICON ACTION',
  'FAMILY L: TACTILE COMMAND CHIP',
  'FAMILY M: CONTROLLED DESTRUCTIVE',
  'FAMILY N: SUCCESS & STATE MORPH'
];

families.forEach(f => {
  assert(`Contains ${f}`, cssContent.includes(f));
});

const themes = ['[data-theme="sylva"]', '[data-theme="liquid"]', '[data-theme="quantum"]', '[data-theme="constellation"]', '[data-theme="palmo"]'];
themes.forEach(t => {
  assert(`Contains theme scope ${t}`, cssContent.includes(t));
});

assert('Includes prefers-reduced-motion fallback', cssContent.includes('prefers-reduced-motion: reduce'));

// 2. Verify JS Engine
const jsPath = path.join(__dirname, '..', 'web', 'button-engine.js');
assert('button-engine.js exists', fs.existsSync(jsPath));
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert('Engine has pointer proximity tracking (--cursor-x, --cursor-y)', jsContent.includes('--cursor-x') && jsContent.includes('--cursor-y'));
assert('Engine has magnetic lerp loop', jsContent.includes('stepMagnetic') && jsContent.includes('requestAnimationFrame'));
assert('Engine has micro-spark burst emitter', jsContent.includes('emitSparkBurst'));
assert('Engine has clipboard morph trigger', jsContent.includes('✓ Copied'));

// 3. Verify All 41 HTML Platform Pages
const webDir = path.join(__dirname, '..', 'web');
const htmlFiles = fs.readdirSync(webDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

console.log(`\nVerifying injection across ${htmlFiles.length} HTML pages...`);
let allInjected = true;
htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join(webDir, f), 'utf8');
  const hasCSS = content.includes('button-system.css');
  const hasJS = content.includes('button-engine.js');
  if (!hasCSS || !hasJS) {
    console.error(`Missing injection in ${f}: CSS=${hasCSS}, JS=${hasJS}`);
    allInjected = false;
  }
});
assert(`All ${htmlFiles.length} pages include button-system.css and button-engine.js`, allInjected);

// 4. Live Server HTTP Verification on PORT 5050
function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5050${route}`, (res) => {
      resolve({ route, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function runHttpTests() {
  console.log('\nVerifying live server delivery on port 5050...');
  const routes = [
    '/button-system.css',
    '/button-engine.js',
    '/',
    '/dashboard',
    '/studio',
    '/sylva-living-world',
    '/portfolio-mesh3d-terminal',
    '/experiences-catalog'
  ];

  for (const r of routes) {
    const res = await checkRoute(r);
    assert(`Route ${r} returns HTTP 200`, res.status === 200);
  }

  if (failed) {
    console.error('\n❌ SOME CHECKS FAILED');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL BUTTON MOTION, COLOR & EFFECT SYSTEM TESTS PASSED!');
  }
}

runHttpTests();

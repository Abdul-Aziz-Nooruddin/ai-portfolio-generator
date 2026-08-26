/**
 * Layout Composer & Page Composition Renderer
 * 
 * Implements 20 Fundamentally Distinct Page Composition Archetypes.
 * Embeds bespoke 3D WebGL / Three.js scenes, dynamic animations, and
 * integrates the 18 diverse project presentations from ProjectPresentationEngine.
 */

const { ProjectPresentationEngine } = require('./project-presentation-engine');
const { PAGE_ARCHETYPES } = require('./page-composition-engine');

class LayoutComposer {
  constructor() {
    this.projectEngine = new ProjectPresentationEngine();
  }

  /**
   * Main entry point: Composes the full portfolio HTML, CSS, and JS
   */
  compose(dna, userProfile) {
    const archetypeId = dna.pageArchetype || dna.pageComposition?.id || dna.layoutArchitecture || 'architectural-swiss-grid';

    let result;
    switch (archetypeId) {
      case 'editorial-essay':
      case 'japanese-minimal':
      case 'editorial-3d-minimal':
      case 'asymmetric-editorial':
        result = this.composeEditorialEssay(dna, userProfile);
        break;

      case 'project-first-runway':
        result = this.composeProjectFirstRunway(dna, userProfile);
        break;

      case 'split-screen-fixed':
        result = this.composeSplitScreenFixed(dna, userProfile);
        break;

      case 'asymmetric-canvas':
      case 'neo-brutalist-3d':
      case 'neo-brutalist-split':
        result = this.composeAsymmetricCanvas(dna, userProfile);
        break;

      case 'project-index-drawer':
        result = this.composeProjectIndexDrawer(dna, userProfile);
        break;

      case 'timeline-chronology':
        result = this.composeTimelineChronology(dna, userProfile);
        break;

      case 'fullscreen-viewport-sections':
        result = this.composeFullscreenViewportSections(dna, userProfile);
        break;

      case 'immersive-exhibition':
        result = this.composeImmersiveExhibition(dna, userProfile);
        break;

      case 'typographic-monograph':
        result = this.composeTypographicMonograph(dna, userProfile);
        break;

      case 'digital-magazine':
        result = this.composeDigitalMagazine(dna, userProfile);
        break;

      case 'dashboard-system':
        result = this.composeDashboardSystem(dna, userProfile);
        break;

      case 'terminal-computational':
      case 'terminal-matrix-os':
        result = this.composeTerminalComputational(dna, userProfile);
        break;

      case 'curated-catalog':
        result = this.composeCuratedCatalog(dna, userProfile);
        break;

      case 'poster-wall':
        result = this.composePosterWall(dna, userProfile);
        break;

      case 'narrative-storytelling':
        result = this.composeNarrativeStorytelling(dna, userProfile);
        break;

      case 'minimal-monastic':
        result = this.composeMinimalMonastic(dna, userProfile);
        break;

      case 'image-led-gallery':
        result = this.composeImageLedGallery(dna, userProfile);
        break;

      case 'data-led-metrics':
        result = this.composeDataLedMetrics(dna, userProfile);
        break;

      case 'experimental-spatial':
      case 'spatial-vision-3d':
      case 'spatial-3d-cyber':
        result = this.composeExperimentalSpatial(dna, userProfile);
        break;

      case 'architectural-swiss-grid':
      case 'swiss-modernism':
      case 'swiss-grid-minimal':
      case 'bento-canvas-studio':
      case 'figma-community-master':
      default:
        result = this.composeArchitecturalSwissGrid(dna, userProfile);
        break;
    }

    if (result && result.html) {
      const styleMatch = result.html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const scriptMatch = result.html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      result.css = styleMatch ? styleMatch[1].trim() : ':root { --fluid-h1: clamp(2rem, 5vw, 4rem); }';
      result.js = scriptMatch ? scriptMatch[1].trim() : '';
    }

    return result;
  }

  // =========================================================================
  // 1. EDITORIAL ESSAY
  // =========================================================================
  composeEditorialEssay(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'editorial-magazine');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Monograph</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.8; padding: 60px 24px; position: relative; min-height: 100vh; }
    .essay-container { max-width: 900px; margin: 0 auto; position: relative; z-index: 2; }
    .essay-header { border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 16px; }
    .author-mark { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text); }
    .author-meta { font-size: 0.85rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
    .essay-statement { font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 32px; color: var(--text); }
    .essay-intro-lead { font-size: 1.2rem; line-height: 1.8; color: var(--text); margin-bottom: 40px; font-weight: 400; border-left: 3px solid var(--primary); padding-left: 20px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="essay-container">
    <header class="essay-header">
      <div class="author-mark">${data.name}</div>
      <div class="author-meta">// ${data.role}</div>
    </header>

    <main>
      <h1 class="essay-statement">${data.tagline || data.bio}</h1>
      <div class="essay-intro-lead">${data.bio}</div>

      <section class="projects-section" style="margin: 50px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 28px; color: var(--text);">Selected Architecture & Case Studies</h2>
        ${projectHtml}
      </section>

      <section style="margin: 40px 0;">
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 12px; color: var(--text);">Technical Competencies</h3>
        <p style="font-family: monospace; font-size: 0.95rem; color: var(--primary); line-height: 1.8;">${data.tech_stack || data.skills.join(' • ')}</p>
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 2. PROJECT FIRST RUNWAY
  // =========================================================================
  composeProjectFirstRunway(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'fullscreen-case-study');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Engineering Runway</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 32px 24px; position: relative; min-height: 100vh; }
    .runway-wrapper { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
    .compact-identity-bar { display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg); backdrop-filter: blur(12px); margin-bottom: 40px; }
    .identity-name { font-size: 1.15rem; font-weight: 800; font-family: var(--font-heading); color: var(--text); }
    .identity-role { font-size: 0.85rem; color: var(--muted); font-family: monospace; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="runway-wrapper">
    <nav class="compact-identity-bar">
      <div>
        <div class="identity-name">${data.name}</div>
        <div class="identity-role">${data.role} // ${data.skills.slice(0, 3).join(', ')}</div>
      </div>
      <div style="font-size: 0.88rem; font-family: monospace; color: var(--primary);">● SYSTEM LIVE</div>
    </nav>

    <main>
      <section class="project-runway-container">
        ${projectHtml}
      </section>

      <section style="margin: 60px 0; padding: 32px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg);">
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 12px;">Engineering Philosophy & Core Bio</h3>
        <p style="color: var(--muted); line-height: 1.8; margin-bottom: 20px;">${data.bio}</p>
        <div style="font-family: monospace; font-size: 0.9rem; color: var(--primary);">PRIMARY STACK: ${data.tech_stack}</div>
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 3. SPLIT-SCREEN FIXED (50/50 Dual-Pane Viewport)
  // =========================================================================
  composeSplitScreenFixed(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'split-screen-story');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; min-height: 100vh; position: relative; }
    .split-layout { display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 2; }
    @media (min-width: 1024px) {
      .split-layout { flex-direction: row; }
      .split-fixed-pane { width: 42%; height: 100vh; position: sticky; top: 0; padding: 60px 48px; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid var(--border); }
      .split-scroll-pane { width: 58%; padding: 60px 48px; }
    }
    .split-title { font-family: var(--font-heading); font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 900; line-height: 1.1; margin-bottom: 16px; }
    .split-role { font-size: 1.2rem; color: var(--primary); font-family: monospace; margin-bottom: 24px; }
    .split-bio { color: var(--muted); font-size: 1.05rem; line-height: 1.8; margin-bottom: 32px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="split-layout">
    <aside class="split-fixed-pane" style="padding: 40px 24px;">
      <div>
        <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); margin-bottom: 12px;">● PORTFOLIO // 2026</div>
        <h1 class="split-title">${data.name}</h1>
        <div class="split-role">${data.role}</div>
        <p class="split-bio">${data.tagline || data.bio}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: var(--muted); line-height: 1.8;">
          <div>CORE DOMAIN: ${data.tech_stack}</div>
          <div style="margin-top: 8px;">LOCATION: Global / Remote</div>
        </div>
      </div>
      <div style="margin-top: 32px;">
        ${this.renderFooter(data)}
      </div>
    </aside>

    <main class="split-scroll-pane" style="padding: 40px 24px;">
      <section style="margin-bottom: 50px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 24px;">Featured Implementations</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 4. ASYMMETRIC CANVAS (Multi-Axis Staggered Spatial Canvas)
  // =========================================================================
  composeAsymmetricCanvas(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'masonry-art-wall');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Asymmetric Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 60px 24px; position: relative; min-height: 100vh; }
    .asymmetric-canvas { max-width: 1300px; margin: 0 auto; position: relative; z-index: 2; }
    .canvas-hero { display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 70px; }
    @media (min-width: 900px) {
      .canvas-hero { grid-template-columns: 1.4fr 0.8fr; align-items: end; }
    }
    .canvas-headline { font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 4.8rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; }
    .canvas-sidebar { border-left: 2px solid var(--primary); padding-left: 24px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="asymmetric-canvas">
    <header class="canvas-hero">
      <div>
        <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); margin-bottom: 12px;">ASYMMETRIC CANVAS // ${data.role.toUpperCase()}</div>
        <h1 class="canvas-headline">${data.name}</h1>
      </div>
      <div class="canvas-sidebar">
        <p style="color: var(--text); font-size: 1.15rem; line-height: 1.7; margin-bottom: 16px;">${data.tagline || data.bio}</p>
        <div style="font-family: monospace; font-size: 0.85rem; color: var(--muted);">${data.tech_stack}</div>
      </div>
    </header>

    <main>
      <section style="margin-bottom: 70px;">
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 5. PROJECT INDEX DRAWER (Tabular Master-Detail & Live Drawer)
  // =========================================================================
  composeProjectIndexDrawer(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'typographic-project-index');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Project Index</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 50px 24px; position: relative; min-height: 100vh; }
    .index-container { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
    .index-header { border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 16px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="index-container">
    <header class="index-header">
      <div>
        <h1 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800;">${data.name}</h1>
        <div style="font-size: 0.9rem; color: var(--muted); font-family: monospace;">// ${data.role}</div>
      </div>
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary);">${data.skills.slice(0, 3).join(' • ')}</div>
    </header>

    <main>
      <section style="margin-bottom: 40px;">
        <p style="font-size: 1.15rem; color: var(--text); line-height: 1.8; max-width: 800px;">${data.bio}</p>
      </section>

      <section style="margin: 50px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 20px; color: var(--text);">PROJECT DIRECTORY & SPECIMENS</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 6. TIMELINE CHRONOLOGY (Vertical Engineering Spine)
  // =========================================================================
  composeTimelineChronology(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'timeline-stream');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Engineering Chronology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 60px 24px; position: relative; min-height: 100vh; }
    .timeline-container { max-width: 960px; margin: 0 auto; position: relative; z-index: 2; }
    .timeline-hero { text-align: center; margin-bottom: 60px; }
    .timeline-title { font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; margin-bottom: 16px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="timeline-container">
    <header class="timeline-hero">
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); margin-bottom: 8px;">ENGINEERING CHRONOLOGY</div>
      <h1 class="timeline-title">${data.name}</h1>
      <div style="font-size: 1.15rem; color: var(--primary); font-family: monospace; margin-bottom: 16px;">${data.role}</div>
      <p style="color: var(--muted); max-width: 650px; margin: 0 auto; line-height: 1.8;">${data.tagline || data.bio}</p>
    </header>

    <main>
      <section style="margin-bottom: 60px;">
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 7. FULLSCREEN VIEWPORT SECTIONS (100vh Snap Runway)
  // =========================================================================
  composeFullscreenViewportSections(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'fullscreen-case-study');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; position: relative; min-height: 100vh; }
    .snap-stage { max-width: 1200px; margin: 0 auto; padding: 60px 24px; position: relative; z-index: 2; }
    .hero-slide { min-height: 70vh; display: flex; flex-direction: column; justify-content: center; margin-bottom: 60px; }
    .slide-headline { font-family: var(--font-heading); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 24px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="snap-stage">
    <section class="hero-slide">
      <div style="font-family: monospace; font-size: 0.9rem; color: var(--primary); margin-bottom: 16px;">● ACTIVE STAGE // ${data.role.toUpperCase()}</div>
      <h1 class="slide-headline">${data.name}</h1>
      <p style="font-size: 1.3rem; color: var(--muted); max-width: 750px; line-height: 1.8; margin-bottom: 32px;">${data.tagline || data.bio}</p>
      <div style="font-family: monospace; font-size: 0.95rem; color: var(--primary);">${data.tech_stack}</div>
    </section>

    <main>
      <section style="margin-bottom: 80px;">
        <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 32px;">Selected Works</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 8. IMMERSIVE EXHIBITION
  // =========================================================================
  composeImmersiveExhibition(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'spatial-3d-gallery');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Exhibition</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.7; padding: 60px 24px; position: relative; min-height: 100vh; }
    .exhibition-wrap { max-width: 1250px; margin: 0 auto; position: relative; z-index: 2; }
    .exhibition-masthead { text-align: center; padding: 60px 20px; border-bottom: 1px solid var(--border); margin-bottom: 60px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="exhibition-wrap">
    <header class="exhibition-masthead">
      <div style="font-family: monospace; font-size: 0.85rem; letter-spacing: 0.25em; color: var(--primary); text-transform: uppercase; margin-bottom: 16px;">IMMERSIVE DIGITAL EXHIBITION</div>
      <h1 style="font-family: var(--font-heading); font-size: clamp(3rem, 6vw, 5rem); font-weight: 800; margin-bottom: 16px;">${data.name}</h1>
      <div style="font-size: 1.2rem; color: var(--muted); font-family: monospace; margin-bottom: 24px;">// ${data.role}</div>
      <p style="font-size: 1.15rem; color: var(--text); max-width: 700px; margin: 0 auto; line-height: 1.8;">${data.bio}</p>
    </header>

    <main>
      <section style="margin-bottom: 70px;">
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 9. TYPOGRAPHIC MONOGRAPH
  // =========================================================================
  composeTypographicMonograph(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'minimalist-art-direction');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Typographic Monograph</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.8; padding: 60px 24px; position: relative; min-height: 100vh; }
    .mono-container { max-width: 920px; margin: 0 auto; position: relative; z-index: 2; }
    .monograph-title { font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 4.6rem); font-weight: 900; line-height: 1.1; margin-bottom: 24px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="mono-container">
    <header style="border-bottom: 2px solid var(--primary); padding-bottom: 30px; margin-bottom: 50px;">
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--muted); margin-bottom: 12px;">VOLUME NO. 01 // ARCHITECTURAL ESSAY</div>
      <h1 class="monograph-title">${data.name}</h1>
      <div style="font-size: 1.25rem; font-family: monospace; color: var(--primary);">${data.role}</div>
    </header>

    <main>
      <section style="margin-bottom: 50px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 16px;">Core Thesis</h2>
        <p style="font-size: 1.2rem; color: var(--text); line-height: 1.9; margin-bottom: 24px;">${data.bio}</p>
        <p style="font-family: monospace; font-size: 0.95rem; color: var(--primary);">SPECIALIZATION: ${data.tech_stack}</p>
      </section>

      <section style="margin: 60px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 28px;">Selected Implementations</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 10. DIGITAL MAGAZINE
  // =========================================================================
  composeDigitalMagazine(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'editorial-magazine');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Digital Magazine</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.7; padding: 50px 24px; position: relative; min-height: 100vh; }
    .mag-wrap { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
    .mag-masthead { border-top: 3px solid var(--primary); border-bottom: 1px solid var(--border); padding: 24px 0; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="mag-wrap">
    <header class="mag-masthead">
      <div style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; letter-spacing: 0.05em;">THE ${data.name.toUpperCase()} CHRONICLE</div>
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--muted);">${new Date().getFullYear()} ISSUE // ${data.role.toUpperCase()}</div>
    </header>

    <main>
      <section style="display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px;">
        <div>
          <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.15; margin-bottom: 20px;">${data.tagline || data.bio}</h1>
          <p style="font-size: 1.15rem; color: var(--muted); line-height: 1.8;">${data.bio}</p>
        </div>
      </section>

      <section style="margin: 60px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 28px;">Featured Projects & Spreads</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 11. DASHBOARD SYSTEM (Developer OS Control HUD)
  // =========================================================================
  composeDashboardSystem(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'terminal-cli-stream');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | OS Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', monospace;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 32px 24px; position: relative; min-height: 100vh; }
    .dash-wrap { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }
    .dash-hud { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .hud-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; backdrop-filter: blur(12px); }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="dash-wrap">
    <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 32px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="font-family: monospace; font-size: 0.8rem; color: var(--primary);">DEV_OS v4.2 // CLUSTER_STATUS: HEALTHY</div>
        <h1 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800;">${data.name}</h1>
      </div>
      <div style="font-family: monospace; font-size: 0.88rem; color: var(--muted);">${data.role}</div>
    </header>

    <div class="dash-hud">
      <div class="hud-card">
        <div style="font-size: 0.75rem; font-family: monospace; color: var(--muted);">PRIMARY STACK</div>
        <div style="font-weight: 700; font-size: 0.95rem; margin-top: 6px; color: var(--primary);">${data.skills.slice(0, 3).join(' • ')}</div>
      </div>
      <div class="hud-card">
        <div style="font-size: 0.75rem; font-family: monospace; color: var(--muted);">DEPLOYED SYSTEMS</div>
        <div style="font-weight: 700; font-size: 1.3rem; margin-top: 4px;">${data.projects.length} Repositories</div>
      </div>
      <div class="hud-card">
        <div style="font-size: 0.75rem; font-family: monospace; color: var(--muted);">AVAILABILITY</div>
        <div style="font-weight: 700; font-size: 0.95rem; margin-top: 6px; color: #22c55e;">● Available for Hire</div>
      </div>
    </div>

    <main>
      <section style="margin-bottom: 40px; background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px;">
        <h3 style="font-family: monospace; font-size: 0.9rem; color: var(--primary); margin-bottom: 8px;">// OPERATOR_BIO</h3>
        <p style="color: var(--text); line-height: 1.8;">${data.bio}</p>
      </section>

      <section style="margin-bottom: 50px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 20px;">System Services & Implementations</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 12. TERMINAL COMPUTATIONAL (Matrix CLI OS)
  // =========================================================================
  composeTerminalComputational(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'terminal-cli-stream');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Terminal OS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: #050505;
      --text: #22c55e;
      --muted: #15803d;
      --primary: #22c55e;
      --border: rgba(34, 197, 94, 0.25);
      --card-bg: rgba(5, 15, 5, 0.7);
      --font-heading: 'Fira Code', monospace;
      --font-body: 'Fira Code', monospace;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 40px 20px; position: relative; min-height: 100vh; }
    .term-window { max-width: 1000px; margin: 0 auto; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg); box-shadow: 0 0 30px rgba(34, 197, 94, 0.1); position: relative; z-index: 2; }
    .term-header { background: rgba(34, 197, 94, 0.1); border-bottom: 1px solid var(--border); padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; }
    .term-body { padding: 32px 24px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, { ...colors, primary: '#22c55e' })}
  <div class="term-window">
    <div class="term-header">
      <div style="display: flex; gap: 8px;">
        <span style="width:10px; height:10px; border-radius:50%; background:#ef4444; display:inline-block;"></span>
        <span style="width:10px; height:10px; border-radius:50%; background:#f59e0b; display:inline-block;"></span>
        <span style="width:10px; height:10px; border-radius:50%; background:#22c55e; display:inline-block;"></span>
      </div>
      <div style="font-size: 0.8rem; letter-spacing: 0.1em;">${data.name.toLowerCase().replace(/\s+/g, '')}@matrix-terminal:~</div>
      <div style="font-size: 0.8rem;">SSH-256</div>
    </div>

    <div class="term-body">
      <div style="margin-bottom: 24px;">
        <div>$ whoami</div>
        <h1 style="font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 8px 0; color: #fff;">${data.name}</h1>
        <div style="color: #86efac;">ROLE: ${data.role}</div>
      </div>

      <div style="margin-bottom: 32px; border-left: 2px solid var(--primary); padding-left: 16px;">
        <div style="color: var(--muted); font-size: 0.85rem;">$ cat bio.txt</div>
        <p style="color: #dcfce7; margin-top: 6px; line-height: 1.7;">${data.bio}</p>
      </div>

      <div style="margin-bottom: 32px;">
        <div style="color: var(--muted); font-size: 0.85rem; margin-bottom: 12px;">$ ls -la ./projects</div>
        ${projectHtml}
      </div>

      ${this.renderCredentialsBlock(data)}
      ${this.renderFooter(data)}
    </div>
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 13. CURATED CATALOG (Luxury Archival Specimen Catalog)
  // =========================================================================
  composeCuratedCatalog(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'archive-catalog');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Curated Catalog</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.7; padding: 60px 24px; position: relative; min-height: 100vh; }
    .catalog-wrap { max-width: 1180px; margin: 0 auto; position: relative; z-index: 2; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="catalog-wrap">
    <header style="border-bottom: 2px solid var(--text); padding-bottom: 24px; margin-bottom: 50px; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
      <div>
        <div style="font-family: monospace; font-size: 0.8rem; letter-spacing: 0.15em; color: var(--primary);">ARCHIVAL CATALOG // 2026</div>
        <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800;">${data.name}</h1>
      </div>
      <div style="font-family: monospace; font-size: 0.9rem; color: var(--muted);">${data.role}</div>
    </header>

    <main>
      <section style="margin-bottom: 50px;">
        <p style="font-size: 1.2rem; color: var(--text); max-width: 800px; line-height: 1.8;">${data.bio}</p>
      </section>

      <section style="margin: 60px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 28px;">Curated Specimen Works</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 14. POSTER WALL (Monolithic High-Contrast Architectural Posters)
  // =========================================================================
  composePosterWall(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'stacked-posters');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Poster Wall</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 50px 24px; position: relative; min-height: 100vh; }
    .poster-wrap { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
    .poster-headline { font-family: var(--font-heading); font-size: clamp(3.2rem, 8vw, 6.5rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.04em; text-transform: uppercase; margin-bottom: 24px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="poster-wrap">
    <header style="margin-bottom: 60px; border-bottom: 3px solid var(--text); padding-bottom: 32px;">
      <div style="font-family: monospace; font-size: 0.9rem; color: var(--primary); margin-bottom: 12px;">MONOLITHIC POSTER SERIES</div>
      <h1 class="poster-headline">${data.name}</h1>
      <div style="font-size: 1.4rem; font-weight: 700; color: var(--primary); margin-bottom: 16px;">// ${data.role}</div>
      <p style="font-size: 1.15rem; color: var(--muted); max-width: 750px; line-height: 1.8;">${data.bio}</p>
    </header>

    <main>
      <section style="margin-bottom: 70px;">
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 15. NARRATIVE STORYTELLING (Chapter-Based Engineering Memoir)
  // =========================================================================
  composeNarrativeStorytelling(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'video-reel');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Narrative Memoir</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.8; padding: 60px 24px; position: relative; min-height: 100vh; }
    .narrative-wrap { max-width: 950px; margin: 0 auto; position: relative; z-index: 2; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="narrative-wrap">
    <header style="margin-bottom: 60px; text-align: center;">
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px;">CHAPTER I: THE FOUNDATION</div>
      <h1 style="font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 4.5rem); font-weight: 800; margin-bottom: 16px;">${data.name}</h1>
      <div style="font-size: 1.2rem; color: var(--muted); font-family: monospace;">${data.role}</div>
    </header>

    <main>
      <section style="margin-bottom: 60px; font-size: 1.2rem; line-height: 1.9; color: var(--text);">
        <p>${data.bio}</p>
      </section>

      <section style="margin: 60px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 28px;">Chapter II: The Artifacts & Engines</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 16. MINIMAL MONASTIC (Japanese Serene Whitespace)
  // =========================================================================
  composeMinimalMonastic(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'minimalist-art-direction');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Monastic Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.9; padding: 80px 24px; position: relative; min-height: 100vh; }
    .monastic-wrap { max-width: 820px; margin: 0 auto; position: relative; z-index: 2; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="monastic-wrap">
    <header style="margin-bottom: 70px;">
      <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; letter-spacing: -0.02em; margin-bottom: 12px;">${data.name}</h1>
      <div style="font-size: 1rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase;">${data.role}</div>
    </header>

    <main>
      <section style="margin-bottom: 60px;">
        <p style="font-size: 1.25rem; color: var(--text); line-height: 2;">${data.bio}</p>
      </section>

      <section style="margin: 70px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 400; margin-bottom: 30px; letter-spacing: 0.05em;">SELECTED WORKS</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 17. IMAGE-LED GALLERY
  // =========================================================================
  composeImageLedGallery(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'image-first-gallery');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Visual Gallery</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 40px 24px; position: relative; min-height: 100vh; }
    .gallery-wrap { max-width: 1300px; margin: 0 auto; position: relative; z-index: 2; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="gallery-wrap">
    <header style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 50px; flex-wrap: wrap;">
      <div>
        <h1 style="font-family: var(--font-heading); font-size: 2.4rem; font-weight: 800;">${data.name}</h1>
        <div style="color: var(--primary); font-family: monospace;">// ${data.role}</div>
      </div>
      <div style="font-family: monospace; font-size: 0.9rem; color: var(--muted);">${data.tech_stack}</div>
    </header>

    <main>
      <section style="margin-bottom: 60px;">
        <p style="font-size: 1.2rem; color: var(--muted); line-height: 1.8; max-width: 800px;">${data.bio}</p>
      </section>

      <section style="margin-bottom: 70px;">
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 18. DATA-LED METRICS
  // =========================================================================
  composeDataLedMetrics(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'data-led-metrics');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Engineering Metrics</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', monospace;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 50px 24px; position: relative; min-height: 100vh; }
    .metrics-wrap { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="metrics-wrap">
    <header style="margin-bottom: 50px; border-bottom: 1px solid var(--border); padding-bottom: 24px;">
      <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); margin-bottom: 8px;">PERFORMANCE BENCHMARKS & TELEMETRY</div>
      <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800;">${data.name}</h1>
      <div style="font-size: 1.15rem; color: var(--muted); font-family: monospace;">${data.role}</div>
    </header>

    <main>
      <section style="margin-bottom: 50px; background: var(--card-bg); padding: 24px; border: 1px solid var(--border); border-radius: var(--radius);">
        <p style="font-size: 1.15rem; line-height: 1.8;">${data.bio}</p>
      </section>

      <section style="margin: 60px 0;">
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 24px;">Engineered Systems & KPIs</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 19. EXPERIMENTAL SPATIAL (Floating 3D Orbit Node Viewport)
  // =========================================================================
  composeExperimentalSpatial(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'project-orbit');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — Spatial Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 60px 24px; position: relative; min-height: 100vh; }
    .spatial-wrap { max-width: 1250px; margin: 0 auto; position: relative; z-index: 2; }
    .spatial-hero { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; margin-bottom: 60px; }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="spatial-wrap">
    <header class="spatial-hero">
      <div style="font-family: monospace; font-size: 0.9rem; color: var(--primary); margin-bottom: 16px;">✦ SPATIAL 3D COMPUTING PLATFORM</div>
      <h1 style="font-family: var(--font-heading); font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; line-height: 1.05;">${data.name}</h1>
      <div style="font-size: 1.4rem; color: var(--primary); font-family: monospace; margin: 16px 0;">// ${data.role}</div>
      <p style="font-size: 1.25rem; color: var(--muted); max-width: 750px; line-height: 1.8;">${data.tagline || data.bio}</p>
    </header>

    <main>
      <section style="margin-bottom: 80px;">
        <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 32px;">Orbital Deployments & Systems</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // 20. ARCHITECTURAL SWISS GRID (Bento Canvas Studio)
  // =========================================================================
  composeArchitecturalSwissGrid(dna, userProfile) {
    const data = this.extractData(userProfile);
    const { colors, typo, radius } = this.getTokens(dna);
    const projectHtml = this.renderProjects(dna, data.projects, data, 'image-first-gallery');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.role} | Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typo.import_url}" rel="stylesheet">
  <style>
    :root {
      --bg: ${colors.background};
      --text: ${colors.text_primary};
      --muted: ${colors.text_muted};
      --primary: ${colors.primary};
      --border: ${colors.border};
      --card-bg: ${colors.cardBg};
      --font-heading: '${typo.heading_font}', sans-serif;
      --font-body: '${typo.body_font}', sans-serif;
      --radius: ${radius};
      --fluid-h1: clamp(2.4rem, 6vw, 4.5rem);
      --fluid-h2: clamp(1.8rem, 3.5vw, 2.8rem);
      --fluid-body: clamp(0.95rem, 1.2vw, 1.15rem);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.6; padding: 50px 24px; position: relative; min-height: 100vh; }
    .bento-wrap { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; }
    .bento-grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
    @media (min-width: 900px) {
      .bento-grid { grid-template-columns: 1.5fr 1fr; }
    }
    .bento-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; backdrop-filter: blur(12px); }
  </style>
</head>
<body>
  ${this.render3DSceneBackground(dna, colors)}
  <div class="bento-wrap">
    <header class="bento-grid">
      <div class="bento-card">
        <div style="font-family: monospace; font-size: 0.85rem; color: var(--primary); margin-bottom: 12px;">SWISS BENTO STUDIO // ${data.role.toUpperCase()}</div>
        <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 900; line-height: 1.1; margin-bottom: 16px;">${data.name}</h1>
        <p style="font-size: 1.15rem; color: var(--muted); line-height: 1.8;">${data.bio}</p>
      </div>
      <div class="bento-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-family: monospace; font-size: 0.85rem; color: var(--muted); margin-bottom: 8px;">TECHNICAL DOMAIN</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--primary); line-height: 1.6;">${data.tech_stack}</div>
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border); font-family: monospace; font-size: 0.85rem; color: var(--muted);">
          STATUS: Available for engineering leadership & bespoke development.
        </div>
      </div>
    </header>

    <main>
      <section style="margin-bottom: 60px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 24px;">Selected Projects & Artifacts</h2>
        ${projectHtml}
      </section>

      ${this.renderCredentialsBlock(data)}
    </main>

    ${this.renderFooter(data)}
  </div>
</body>
</html>`;
    return { html, css: '', js: '' };
  }

  // =========================================================================
  // PEACHWEB-GRADE INTERACTIVE 3D WEBGL SPATIAL ENGINE & CARD PHYSICS
  // =========================================================================
  render3DSceneBackground(dna = {}, colors = {}) {
    const sceneType = dna.threeScene3D?.type || 'particles-dust';
    const primaryHex = colors.primary || '#ff5938';
    const secondaryHex = colors.secondary || '#6366f1';
    const accentHex = colors.accent || '#38bdf8';

    return `
    <!-- PEACHWEB-GRADE 3D SPATIAL CANVAS BACKGROUND -->
    <canvas id="canvas3d-scene" style="position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 1; opacity: 0.92;"></canvas>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    
    <script>
      (function initPeachWeb3D() {
        const canvas = document.getElementById('canvas3d-scene');
        if (!canvas || typeof THREE === 'undefined') return;

        // 1. Scene, Camera & WebGL Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 32);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const primaryCol = new THREE.Color('${primaryHex}');
        const secondaryCol = new THREE.Color('${secondaryHex}');
        const accentCol = new THREE.Color('${accentHex}');

        // 2. Multi-Color Specular Dynamic Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(primaryCol, 3.5, 90);
        pointLight1.position.set(15, 20, 20);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(secondaryCol, 3.0, 90);
        pointLight2.position.set(-15, -15, 15);
        scene.add(pointLight2);

        const group = new THREE.Group();
        scene.add(group);

        const sceneType = '${sceneType}';

        // 3. Volumetric Atmospheric Depth Dust (PeachWeb Signature Particle Mist)
        const dustCount = 220;
        const dustGeom = new THREE.BufferGeometry();
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount * 3; i += 3) {
          dustPos[i] = (Math.random() - 0.5) * 110;
          dustPos[i + 1] = (Math.random() - 0.5) * 110;
          dustPos[i + 2] = (Math.random() - 0.5) * 60;
        }
        dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
          color: primaryCol,
          size: 1.8,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending
        });
        const dustField = new THREE.Points(dustGeom, dustMat);
        group.add(dustField);

        // 4. Primary 3D Spatial Geometry Architectures
        // A. Torus Knot / Glass Refraction
        if (sceneType === 'interactive-torus-refraction' || sceneType === 'glass-sculpture') {
          const geom = new THREE.TorusKnotGeometry(8.5, 2.6, 140, 20);
          const mat = new THREE.MeshStandardMaterial({
            color: primaryCol,
            metalness: 0.2,
            roughness: 0.15,
            wireframe: true,
            transparent: true,
            opacity: 0.42
          });
          const mesh = new THREE.Mesh(geom, mat);
          group.add(mesh);

          const innerGeom = new THREE.IcosahedronGeometry(4.5, 2);
          const innerMat = new THREE.MeshStandardMaterial({
            color: secondaryCol,
            metalness: 0.4,
            roughness: 0.2,
            wireframe: true,
            transparent: true,
            opacity: 0.3
          });
          const innerMesh = new THREE.Mesh(innerGeom, innerMat);
          group.add(innerMesh);
        }
        // B. Neural Synapse / Constellation Matrix
        else if (sceneType === 'neural-network' || sceneType === 'constellation-graph') {
          const count = 90;
          const pointsGeom = new THREE.BufferGeometry();
          const positions = new Float32Array(count * 3);
          for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 70;
            positions[i + 1] = (Math.random() - 0.5) * 70;
            positions[i + 2] = (Math.random() - 0.5) * 35;
          }
          pointsGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          const pMat = new THREE.PointsMaterial({ color: primaryCol, size: 2.2, transparent: true, opacity: 0.9 });
          const points = new THREE.Points(pointsGeom, pMat);
          group.add(points);

          const lineMat = new THREE.LineBasicMaterial({ color: secondaryCol, transparent: true, opacity: 0.25 });
          const linePositions = [];
          for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
              const dx = positions[i*3] - positions[j*3];
              const dy = positions[i*3+1] - positions[j*3+1];
              const dz = positions[i*3+2] - positions[j*3+2];
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
              if (dist < 18) {
                linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
              }
            }
          }
          const linesGeom = new THREE.BufferGeometry();
          linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
          const lines = new THREE.LineSegments(linesGeom, lineMat);
          group.add(lines);
        }
        // C. Procedural Topography / Wireframe Terrain Grid
        else if (sceneType === 'procedural-terrain' || sceneType === 'wireframe-architecture' || sceneType === 'generative-topology') {
          const planeGeom = new THREE.PlaneGeometry(100, 100, 32, 32);
          const pos = planeGeom.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const u = pos.getX(i);
            const v = pos.getY(i);
            pos.setZ(i, (Math.sin(u * 0.12) + Math.cos(v * 0.12)) * 3.5);
          }
          planeGeom.computeVertexNormals();
          const planeMat = new THREE.MeshStandardMaterial({ color: primaryCol, wireframe: true, transparent: true, opacity: 0.35 });
          const plane = new THREE.Mesh(planeGeom, planeMat);
          plane.rotation.x = -Math.PI / 2.8;
          plane.position.y = -12;
          group.add(plane);
        }
        // D. Floating Platonian Gyro Crystals & Orbital Rings
        else {
          const geom1 = new THREE.IcosahedronGeometry(7.5, 1);
          const mat1 = new THREE.MeshStandardMaterial({ color: primaryCol, wireframe: true, transparent: true, opacity: 0.4 });
          const mesh1 = new THREE.Mesh(geom1, mat1);
          group.add(mesh1);

          const ringGeom = new THREE.TorusGeometry(12, 0.3, 16, 100);
          const ringMat = new THREE.MeshBasicMaterial({ color: secondaryCol, transparent: true, opacity: 0.28 });
          const ringMesh = new THREE.Mesh(ringGeom, ringMat);
          ringMesh.rotation.x = Math.PI / 3;
          group.add(ringMesh);

          const ringGeom2 = new THREE.TorusGeometry(15, 0.25, 16, 100);
          const ringMat2 = new THREE.MeshBasicMaterial({ color: accentCol, transparent: true, opacity: 0.2 });
          const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
          ringMesh2.rotation.y = Math.PI / 4;
          group.add(ringMesh2);
        }

        // 5. Interactive Gyro Cursor Physics
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
          pointLight1.position.x = mouseX * 25 + 10;
          pointLight1.position.y = mouseY * 25 + 10;
        });

        // 6. Scroll-Driven 3D Camera Flythrough
        let scrollProgress = 0;
        window.addEventListener('scroll', () => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          scrollProgress = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
        });

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 7. Render Loop with Smooth Damping
        function animate() {
          requestAnimationFrame(animate);
          targetX += (mouseX - targetX) * 0.04;
          targetY += (mouseY - targetY) * 0.04;

          group.rotation.x += 0.0015 + targetY * 0.008;
          group.rotation.y += 0.0025 + targetX * 0.008;

          // Scroll camera flythrough
          camera.position.z = 32 - scrollProgress * 12;
          camera.position.y = targetY * 3 - scrollProgress * 8;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        }
        animate();

        // 8. Universal 3D Interactive Card Tilt Physics (PeachWeb-Style Tilt)
        document.querySelectorAll('.project-card, .skill-card, .bento-card, .editorial-project-card, .gallery-card, .case-study-card').forEach(card => {
          card.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.2s ease';
          card.style.transformStyle = 'preserve-3d';

          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.025, 1.025, 1.025)\`;
            card.style.boxShadow = \`0 20px 40px -15px rgba(0,0,0,0.3), 0 0 30px \${'${primaryHex}'}22\`;
          });

          card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
          });
        });
      })();
    </script>`;
  }

  renderProjects(dna, projects, profile, fallbackModel = 'editorial-magazine') {
    const model = dna.projectPresentation || fallbackModel;
    const res = this.projectEngine.render(model, projects, dna, profile);
    if (typeof res === 'string') return res;
    if (res && typeof res.html === 'string') return res.html;
    return '';
  }

  // =========================================================================
  // HELPER DATA EXTRACTORS & SHARED FOOTER
  // =========================================================================
  extractData(profile = {}) {
    let projectsList = [];
    if (Array.isArray(profile.projects) && profile.projects.length > 0) {
      projectsList = profile.projects;
    } else if (profile.project_1_name || profile.project_2_name || profile.project_3_name || profile.project_name) {
      if (profile.project_1_name) projectsList.push({ title: profile.project_1_name, desc: profile.project_1_desc || profile.project_1_description || 'Production system deployment.', tech: profile.tech_stack || 'React • Node.js', live: '#' });
      if (profile.project_2_name) projectsList.push({ title: profile.project_2_name, desc: profile.project_2_desc || profile.project_2_description || 'Interactive engineering platform.', tech: profile.tech_stack || 'TypeScript • WebGL', live: '#' });
      if (profile.project_3_name) projectsList.push({ title: profile.project_3_name, desc: profile.project_3_desc || profile.project_3_description || 'High-performance computing engine.', tech: profile.tech_stack || 'Go • Rust', live: '#' });
      if (profile.project_name && !profile.project_1_name) projectsList.push({ title: profile.project_name, desc: profile.project_desc || 'Production application.', tech: profile.tech_stack || 'Node.js', live: '#' });
    }

    if (projectsList.length === 0) {
      projectsList = [
        { title: 'Neural Matrix Engine', desc: 'Autonomous multi-modal orchestration engine scaling to distributed clusters.', tech: 'Python • PyTorch • Rust', live: '#' },
        { title: 'Spatial Canvas Studio', desc: 'Real-time interactive 3D viewport and dynamic WebGL shaders.', tech: 'TypeScript • Three.js • WebGL', live: '#' },
        { title: 'Aether Consensus Kernel', desc: 'Distributed fault-tolerant consensus state machine achieving sub-millisecond locks.', tech: 'Rust • Tokio • gRPC', live: '#' }
      ];
    }

    // Normalize experience
    let expList = [];
    if (Array.isArray(profile.experience)) expList = profile.experience;
    else if (typeof profile.experience === 'string') expList = [{ role: profile.experience, company: 'Industry Leader', desc: profile.experience }];

    // Normalize education
    let eduList = [];
    if (Array.isArray(profile.education)) eduList = profile.education;
    else if (typeof profile.education === 'string') eduList = [{ degree: profile.education, school: profile.education, year: '2024' }];

    // Normalize certifications
    let certList = [];
    if (Array.isArray(profile.certifications)) certList = profile.certifications;
    else if (typeof profile.certifications === 'string') certList = [profile.certifications];

    // Normalize GitHub URL
    let githubUrl = profile.github || profile.github_url || null;
    if (!githubUrl && profile.github_username) {
      const cleanUser = String(profile.github_username).replace(/^@/, '').trim();
      if (cleanUser) githubUrl = `https://github.com/${cleanUser}`;
    }
    if (!githubUrl && profile.username) {
      const cleanUser = String(profile.username).replace(/^@/, '').trim();
      if (cleanUser && !cleanUser.includes(' ') && !cleanUser.includes('@')) {
        githubUrl = `https://github.com/${cleanUser}`;
      }
    }
    if (!githubUrl) {
      githubUrl = 'https://github.com';
    }

    return {
      name: profile.name || 'Software Creator',
      role: profile.role || profile.service_title || 'Systems Architect',
      tagline: profile.tagline || profile.bio || 'Architecting resilient high-scale computing platforms.',
      bio: profile.bio || profile.tagline || 'Specializing in distributed infrastructure, low-latency microservices, and reactive user interfaces.',
      tech_stack: profile.tech_stack || 'TypeScript • Rust • Python • React • WebGL',
      skills: Array.isArray(profile.skills) ? profile.skills : ['TypeScript', 'Rust', 'Python', 'React', 'Distributed Systems'],
      projects: projectsList,
      experience: expList,
      education: eduList,
      certifications: certList,
      email: profile.email || 'developer@portfolio.dev',
      github: githubUrl,
      linkedin: profile.linkedin || null
    };
  }

  getTokens(dna = {}) {
    const colors = dna.colorSystem || {};
    const bg = colors.background || '#09090b';
    
    // Calculate Luminance to guarantee optimal text contrast
    const isLightBg = colors.theme === 'light' || this.isLightColor(bg);
    const textPrimary = isLightBg ? (colors.text || '#09090b') : (colors.text || '#f8fafc');
    const textMuted = isLightBg ? (colors.text_muted || '#52525b') : (colors.text_muted || '#94a3b8');
    const border = isLightBg ? (colors.border || 'rgba(0,0,0,0.12)') : (colors.border || 'rgba(255,255,255,0.12)');
    const cardBg = isLightBg ? (colors.surface_card || '#ffffff') : (colors.surface_card || 'rgba(255,255,255,0.03)');
    const primary = colors.primary || (isLightBg ? '#0284c7' : '#38bdf8');

    return {
      colors: {
        background: bg,
        text_primary: textPrimary,
        text_muted: textMuted,
        primary,
        border,
        cardBg,
        theme: isLightBg ? 'light' : 'dark'
      },
      typo: dna.typographySystem || { heading_font: 'Inter', body_font: 'Inter', import_url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap' },
      radius: dna.visualGrammar?.borderRadius || '12px'
    };
  }

  isLightColor(hex) {
    if (!hex || typeof hex !== 'string') return false;
    let cleanHex = hex.replace('#', '').trim();
    if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(c => c + c).join('');
    if (cleanHex.length !== 6) return false;
    const r = parseInt(cleanHex.substr(0, 2), 16);
    const g = parseInt(cleanHex.substr(2, 2), 16);
    const b = parseInt(cleanHex.substr(4, 2), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.45;
  }

  renderCredentialsBlock(data) {
    let output = '';
    if (data.experience && data.experience.length > 0) {
      output += `<section style="margin: 40px 0;">
        <h3 style="font-family: var(--font-heading, sans-serif); font-size: 1.4rem; margin-bottom: 16px; color: var(--text);">Professional Experience</h3>
        ${data.experience.map(e => `<div style="margin-bottom: 16px; padding: 16px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg);"><strong>${this.escape(e.role || e.title || e)}</strong> ${e.company ? `— ${this.escape(e.company)}` : ''} ${e.description ? `<p style="color: var(--muted); font-size: 0.9rem; margin-top: 6px; line-height: 1.6;">${this.escape(e.description)}</p>` : ''}</div>`).join('')}
      </section>`;
    }
    if (data.education && data.education.length > 0) {
      output += `<section style="margin: 40px 0;">
        <h3 style="font-family: var(--font-heading, sans-serif); font-size: 1.4rem; margin-bottom: 16px; color: var(--text);">Education & Background</h3>
        ${data.education.map(e => `<div style="margin-bottom: 12px; padding: 14px 18px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card-bg);"><strong>${this.escape(e.degree || e.title || '')}</strong> ${e.institution || e.school ? `— ${this.escape(e.institution || e.school)}` : (typeof e === 'string' ? this.escape(e) : '')}</div>`).join('')}
      </section>`;
    }
    if (data.certifications && data.certifications.length > 0) {
      output += `<section style="margin: 40px 0;">
        <h3 style="font-family: var(--font-heading, sans-serif); font-size: 1.4rem; margin-bottom: 16px; color: var(--text);">Accreditations & Certifications</h3>
        ${data.certifications.map(c => `<div style="margin-bottom: 10px; font-family: monospace; font-size: 0.9rem; color: var(--primary);">✦ ${this.escape(c.name || c.title || c)} ${c.issuer ? `(${this.escape(c.issuer)})` : ''}</div>`).join('')}
      </section>`;
    }
    return output;
  }

  renderFooter(data) {
    const ghUrl = (data.github && data.github !== 'https://github.com') ? data.github : null;
    const ghLabel = ghUrl ? (ghUrl.replace(/^https?:\/\/github\.com\/?/i, '') || 'GitHub') : null;

    return `<footer class="portfolio-global-footer" style="border-top: 1px solid var(--border, rgba(255,255,255,0.08)); margin-top: 60px; padding: 32px 0 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; font-size: 0.88rem; color: var(--muted, #94a3b8);">
      <div style="font-family: monospace; font-size: 0.82rem; letter-spacing: 0.05em;">
        © ${new Date().getFullYear()} ${this.escape(data.name)} // ${this.escape(data.role)}
      </div>
      <div style="display: flex; align-items: center; gap: 24px;">
        ${ghUrl ? `
        <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 7px; color: var(--text, #f8fafc); text-decoration: none; font-weight: 600; font-size: 0.9rem;" title="GitHub Profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>${this.escape(ghLabel)}</span>
        </a>` : ''}
        ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" rel="noopener noreferrer" style="color: var(--muted); text-decoration: none; font-weight: 500;">LinkedIn</a>` : ''}
        ${data.email ? `<a href="mailto:${data.email}" style="color: var(--muted); text-decoration: none; font-weight: 500;">Contact</a>` : ''}
      </div>
    </footer>`;
  }

  escape(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }
}

module.exports = { LayoutComposer };

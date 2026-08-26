/**
 * HTML/CSS/JS Renderer with Dynamic Section Morphing, Hero Geometry Archetypes & Perceptual Independence
 * Compiles ContentProfile, IA Model, LayoutGrammar, ProjectStrategy, TypographySystem, and ColorPalette
 * into an authentic, accessible, responsive single-page web document.
 */

const { ProjectStoryteller } = require('./project-storyteller');
const { ComponentGrammar } = require('./component-grammar');

class HtmlRenderer {
  static render(contentProfile, iaModel, layoutGrammar, visualUniverse, projectStrategy, motion) {
    const { name, role, tagline, bio, projects, skills, experience, education, certifications } = contentProfile;
    const colors = visualUniverse.colors || {};

    const safeName = this.escapeHtml(name);
    const safeRole = this.escapeHtml(role);
    const safeTagline = this.escapeHtml(tagline);
    const safeBio = this.escapeHtml(bio);

    // Resolve Grammar Archetype for Visual World
    const grammar = ComponentGrammar.resolve(visualUniverse, iaModel);

    // 1. Render Project Section (18 Distinct Presentational Forms)
    const projectsHtml = ProjectStoryteller.render(projects, projectStrategy, visualUniverse);

    // 2. Render Skills via Component Grammar (No generic pill tag monopoly)
    const skillsHtml = grammar.skillsGrammar.render(skills, s => this.escapeHtml(s));

    // 3. Render Experience via Component Grammar (No identical stacked rows)
    const experienceHtml = grammar.experienceGrammar.render(experience, s => this.escapeHtml(s));

    // 4. Render Photo Specimen via Photo Grammar (No forced circular avatars)
    const photoUrl = contentProfile.photoUrl || contentProfile.avatar_url || contentProfile.avatarUrl;
    const photoHtml = grammar.photoGrammar.render(photoUrl, name, s => this.escapeHtml(s));

    // 5. Section Morphing: Education & Certifications tailored across all 10 IA Models
    const { morphedEducationHtml, morphedCertificationsHtml, morphedFooterHtml } = this.renderMorphedSections(
      education || [],
      certifications || [],
      iaModel.id,
      visualUniverse,
      safeName
    );

    // 6. Dynamic Body Layout Builder based on 8 Distinct Hero Archetypes & 10 IA Models
    let bodyContent = '';

    if (iaModel.id === 'split-screen-dossier') {
      bodyContent = `
        <div class="layout-root">
          <aside class="dossier-identity-panel">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">[PROFILE_VERIFIED]</div>
              ${photoHtml}
              <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.1; margin-bottom: 0.75rem; color: var(--text);">${safeName}</h1>
              <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
              <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 2rem;">${safeTagline || safeBio}</p>
            </div>
            <div>
              <div style="margin-bottom: 1.5rem;">
                <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">CORE CAPABILITIES</div>
                <div>${skillsHtml}</div>
              </div>
              ${morphedEducationHtml}
              ${morphedCertificationsHtml}
              ${morphedFooterHtml}
            </div>
          </aside>
          <main class="dossier-evidence-stream">
            <section style="margin-bottom: 4rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5rem;">
                <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text);">Verified Artifacts</h2>
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary);">${projects.length} System Records</span>
              </div>
              ${projectsHtml}
            </section>
            <section>
              <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Engineering Timeline</h2>
              ${experienceHtml}
            </section>
          </main>
        </div>
      `;
    } else if (iaModel.id === 'work-first-runway') {
      bodyContent = `
        <div class="layout-root">
          <div class="runway-lead-bar" style="border-bottom: 1px solid var(--border); padding: 1.5rem 0; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">ACTIVE PORTFOLIO RUNWAY</span>
              <h1 style="font-family: var(--font-heading); font-size: 1.7rem; font-weight: 800; color: var(--text);">${safeName}</h1>
            </div>
            <div style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">${safeRole}</div>
          </div>
          <section style="margin-bottom: 5rem;">
            <div style="margin-bottom: 2rem;">
              <h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 1rem;">Featured Systems & Case Studies</h2>
              <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 700px;">${safeTagline || safeBio}</p>
            </div>
            ${projectsHtml}
          </section>
          <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Career Progression</h3>
              ${experienceHtml}
            </div>
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Core Stack</h3>
              <div style="margin-bottom: 2rem;">${skillsHtml}</div>
              ${morphedEducationHtml}
              ${morphedCertificationsHtml}
            </div>
          </section>
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'computational-terminal') {
      bodyContent = `
        <div class="layout-root">
          <div class="terminal-window" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);">
            <div style="background: var(--surface-alt); padding: 12px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #ef4444;"></span>
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #f59e0b;"></span>
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #10b981;"></span>
              <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); margin-left: 12px;">session://user/${safeName.toLowerCase().replace(/\s+/g, '-')}/system.sh</span>
            </div>
            <div style="padding: 2.5rem 2rem;">
              <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--primary); margin-bottom: 1rem;">$ sysinfo --whoami</div>
              <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">${safeName}</h1>
              <div style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem;">&gt; ${safeRole} — ${safeTagline}</div>
              
              <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--primary); margin-bottom: 1.5rem;">$ list --category=artifacts</div>
              <div style="margin-bottom: 3.5rem;">${projectsHtml}</div>

              <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--primary); margin-bottom: 1.5rem;">$ cat /var/log/career_timeline</div>
              <div style="margin-bottom: 3.5rem;">${experienceHtml}</div>

              ${morphedEducationHtml}
              ${morphedCertificationsHtml}

              ${morphedFooterHtml}
            </div>
          </div>
        </div>
      `;
    } else if (iaModel.id === 'editorial-monograph') {
      bodyContent = `
        <div class="layout-root monograph-reading-column">
          <header style="margin-bottom: 4rem; padding-bottom: 2.5rem; border-bottom: 2px solid var(--text);">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.1em; color: var(--primary); margin-bottom: 1rem; text-transform: uppercase;">MONOGRAPH • ISSUE VOL. I</div>
            ${photoHtml}
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5.5vw, 4.2rem); font-weight: 900; line-height: 1.05; margin-bottom: 1.25rem; color: var(--text);">${safeName}</h1>
            <div style="font-size: 1.35rem; font-style: italic; font-weight: 500; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
            <p style="font-size: 1.15rem; line-height: 1.75; color: var(--text); max-width: 780px;">${safeTagline || safeBio}</p>
          </header>
          <main>
            <section style="margin-bottom: 5rem;">
              <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--text); margin-bottom: 2rem;">Curated Works</h2>
              ${projectsHtml}
            </section>
            <section style="margin-bottom: 4rem;">
              <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 900; color: var(--text); margin-bottom: 2rem;">Professional Trajectory</h2>
              ${experienceHtml}
            </section>
            ${morphedEducationHtml}
            ${morphedCertificationsHtml}
          </main>
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'horizontal-exhibition') {
      bodyContent = `
        <div class="layout-root horizontal-track">
          <header style="margin-bottom: 3rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">GALLERY EXHIBITION</div>
            ${photoHtml}
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 800; color: var(--text);">${safeName}</h1>
            <div style="font-size: 1.2rem; color: var(--text-muted);">${safeRole} — ${safeTagline}</div>
          </header>
          <section style="margin-bottom: 4rem;">
            ${projectsHtml}
          </section>
          <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Trajectory</h3>
              ${experienceHtml}
            </div>
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Stack & Expertise</h3>
              <div style="margin-bottom: 2rem;">${skillsHtml}</div>
              ${morphedEducationHtml}
              ${morphedCertificationsHtml}
            </div>
          </section>
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'asymmetric-bento-canvas') {
      bodyContent = `
        <div class="layout-root bento-grid-canvas">
          <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2.5rem; margin-bottom: 2.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem;">BENTO CANOPY</div>
            ${photoHtml}
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 1rem;">${safeName}</h1>
            <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 750px; margin-bottom: 1.5rem;">${safeTagline || safeBio}</p>
            <div>${skillsHtml}</div>
          </div>
          <section style="margin-bottom: 3.5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Featured Artifacts</h2>
            ${projectsHtml}
          </section>
          <section style="margin-bottom: 3.5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Career Nodes</h2>
            ${experienceHtml}
          </section>
          ${morphedEducationHtml}
          ${morphedCertificationsHtml}
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'minimal-single-screen') {
      bodyContent = `
        <div class="layout-root single-screen-masthead">
          <header style="margin-bottom: 3.5rem;">
            ${photoHtml}
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 900; color: var(--text); line-height: 1.0; margin-bottom: 1rem;">${safeName}</h1>
            <div style="font-size: 1.3rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1rem;">${safeRole}</div>
            <p style="font-size: 1.1rem; color: var(--text-muted); max-width: 700px;">${safeTagline || safeBio}</p>
          </header>
          <main style="margin-bottom: 4rem;">
            ${projectsHtml}
          </main>
          <section style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Experience Archive</h3>
            ${experienceHtml}
          </section>
          ${morphedEducationHtml}
          ${morphedCertificationsHtml}
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'narrative-timeline') {
      bodyContent = `
        <div class="layout-root timeline-spine">
          <header style="margin-bottom: 4rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem;">CHRONOLOGICAL DOSSIER</div>
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 1rem;">${safeName}</h1>
            <div style="font-size: 1.25rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${safeRole}</div>
            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); max-width: 750px; margin-bottom: 1.5rem;">${safeTagline || safeBio}</p>
            <div>${skillsHtml}</div>
          </header>
          <section style="margin-bottom: 4.5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 2rem;">Milestone Projects</h2>
            ${projectsHtml}
          </section>
          <section style="margin-bottom: 3.5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 2rem;">Timeline</h2>
            ${experienceHtml}
          </section>
          ${morphedEducationHtml}
          ${morphedCertificationsHtml}
          ${morphedFooterHtml}
        </div>
      `;
    } else if (iaModel.id === 'magazine-spread-columns') {
      bodyContent = `
        <div class="layout-root magazine-grid-columns">
          <header style="margin-bottom: 3.5rem; border-bottom: 1px solid var(--border); padding-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">SPECIAL FEATURE EDITION</div>
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.6rem, 5.5vw, 4.5rem); font-weight: 900; color: var(--text); line-height: 1.05; margin-bottom: 1rem;">${safeName}</h1>
            <div style="font-size: 1.3rem; font-weight: 600; color: var(--text-muted);">${safeRole} • ${safeTagline}</div>
          </header>
          <section style="margin-bottom: 4.5rem;">
            ${projectsHtml}
          </section>
          <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; margin-bottom: 3.5rem;">
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Career Record</h3>
              ${experienceHtml}
            </div>
            <div>
              <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Skills & Credentials</h3>
              <div style="margin-bottom: 2rem;">${skillsHtml}</div>
              ${morphedEducationHtml}
              ${morphedCertificationsHtml}
            </div>
          </section>
          ${morphedFooterHtml}
        </div>
      `;
    } else {
      // Spatial 3D Stage & General Structural Composition
      bodyContent = `
        <div class="layout-root stage-orbit-wrapper">
          <header style="margin-bottom: 4.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">[SPATIAL_STAGE]</div>
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5.5vw, 4.5rem); font-weight: 800; color: var(--text); line-height: 1.05; margin-bottom: 1.25rem;">${safeName}</h1>
            <div style="font-size: 1.3rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.75rem; max-width: 800px;">${safeRole}</div>
            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); max-width: 750px; margin-bottom: 2rem;">${safeTagline || safeBio}</p>
            <div style="margin-top: 1.5rem;">${skillsHtml}</div>
          </header>
          <section style="margin-bottom: 5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 2rem;">Orbiting Artifacts</h2>
            ${projectsHtml}
          </section>
          <section style="margin-bottom: 4rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Experience</h2>
            ${experienceHtml}
          </section>
          ${morphedEducationHtml}
          ${morphedCertificationsHtml}
          ${morphedFooterHtml}
        </div>
      `;
    }

    const styleContent = `
    :root {
      --bg: ${colors.bg || '#0F172A'};
      --surface: ${colors.surface || '#1E293B'};
      --surface-alt: ${colors.surfaceAlt || '#334155'};
      --text: ${colors.text || '#F8FAFC'};
      --text-muted: ${colors.textMuted || '#94A3B8'};
      --border: ${colors.border || 'rgba(255,255,255,0.1)'};
      --border-strong: ${colors.borderStrong || 'rgba(255,255,255,0.3)'};
      --primary: ${colors.primary || '#38BDF8'};
      --primary-on: ${colors.primaryOn || '#000000'};
      --accent: ${colors.accent || '#818CF8'};
      --glow: ${colors.glow || 'rgba(56,189,248,0.2)'};
      --font-heading: '${visualUniverse.headingFont || 'Plus Jakarta Sans'}', sans-serif;
      --font-body: '${visualUniverse.bodyFont || 'Inter'}', -apple-system, sans-serif;
      --font-mono: '${visualUniverse.monoFont || 'JetBrains Mono'}', monospace;
      --radius: ${visualUniverse.borderRadius || '8px'};
      --shadow: ${visualUniverse.shadow || 'none'};
      --fluid-h1: clamp(2.2rem, 5vw, 4.2rem);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    ${layoutGrammar.cssGrid}

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      #webgl-canvas-container { display: none !important; }
    }
    `;

    const html = `<!DOCTYPE html>
<html lang="en" data-theme="${visualUniverse.theme || 'dark'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${safeTagline || safeBio}">
  <title>${safeName} — ${safeRole}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?${visualUniverse.fontUrls}&display=swap" rel="stylesheet">
  ${motion.libraries}

  <style>
    ${styleContent}
  </style>
</head>
<body class="${layoutGrammar.bodyClass}">
  ${motion.canvasHtml}
  ${bodyContent}
  <script>
    ${motion.js}
  </script>
</body>
</html>`;

    return {
      html,
      css: styleContent.trim(),
      js: motion.js
    };
  }

  /**
   * Section Morphing Engine across all 10 IA Models
   */
  static renderMorphedSections(education, certifications, iaModelId, visual, safeName = 'Author') {
    const year = new Date().getFullYear();
    let morphedEducationHtml = '';
    let morphedCertificationsHtml = '';
    let morphedFooterHtml = `<footer class="colophon-footer" style="padding: 3rem 0; border-top: 1px solid var(--border); margin-top: 4rem; display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);"><span>&copy; ${year} ${safeName}</span><span>Live Generative Build</span></footer>`;

    if (iaModelId === 'computational-terminal') {
      if (education.length > 0) {
        const eduLines = education.map(e => `
          <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); margin-bottom: 0.5rem;">
            [ACADEMIC_CREDENTIAL] ${this.escapeHtml(e.degree || e.study || 'Degree')} --institution="${this.escapeHtml(e.school || e.institution || e.university || 'University')}" --year="${this.escapeHtml(e.period || e.year || '')}"
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-terminal-education" style="margin-bottom: 2.5rem; background: var(--surface-alt); padding: 1.25rem; border: 1px dashed var(--border); border-radius: var(--radius);">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 0.5rem;">$ query --schema=academic_history</div>
            ${eduLines}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certLines = certifications.map(c => `
          <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--text); margin-bottom: 0.5rem;">
            [VERIFIED_KEY] ${this.escapeHtml(c.name || 'Certification')} (Issuer: ${this.escapeHtml(c.issuer || 'Authority')}, Year: ${this.escapeHtml(c.year || '')})
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-terminal-certifications" style="margin-bottom: 2.5rem; background: var(--surface-alt); padding: 1.25rem; border: 1px dashed var(--border); border-radius: var(--radius);">
            <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 0.5rem;">$ verify --credentials=all</div>
            ${certLines}
          </div>
        `;
      }
      morphedFooterHtml = `<div class="morphed-terminal-footer" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 2rem; border-top: 1px dashed var(--border); padding-top: 1rem;">[STATUS: 200 OK] Shell session active &copy; ${year} ${safeName}.</div>`;
    } else if (iaModelId === 'split-screen-dossier') {
      if (education.length > 0) {
        const eduItems = education.map(e => `
          <div style="margin-bottom: 0.75rem; font-size: 0.88rem;">
            <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || 'Degree')}</div>
            <div style="color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || '')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-dossier-education" style="margin-bottom: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">ACADEMIC BACKGROUND</div>
            ${eduItems}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certItems = certifications.map(c => `
          <div style="margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
            <span style="color: var(--primary); font-family: var(--font-mono);">✓</span> ${this.escapeHtml(c.name || 'Certification')} <span style="font-size: 0.78rem;">(${this.escapeHtml(c.issuer || '')})</span>
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-dossier-certifications" style="margin-bottom: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">VERIFIED CERTIFICATIONS</div>
            ${certItems}
          </div>
        `;
      }
      morphedFooterHtml = `<div class="morphed-dossier-footer" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-top: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">&copy; ${year} ${safeName} • Live Dossier Record</div>`;
    } else if (iaModelId === 'editorial-monograph') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <p style="margin-bottom: 0.85rem; font-size: 1.05rem; line-height: 1.6; color: var(--text);">
            <span style="font-weight: 700;">${this.escapeHtml(e.degree || 'Degree')}</span>, ${this.escapeHtml(e.school || e.institution || e.university || 'University')} <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">(${this.escapeHtml(e.period || '')})</span>
          </p>
        `).join('');
        morphedEducationHtml = `
          <section class="morphed-monograph-education" style="margin-bottom: 3.5rem; border-left: 2px solid var(--text); padding-left: 1.5rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 900; color: var(--text); margin-bottom: 1rem; text-transform: uppercase;">Scholarly Background</h3>
            ${eduHtml}
          </section>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <span style="display: inline-block; margin-right: 1.5rem; font-size: 0.95rem; color: var(--text-muted); font-style: italic;">
            — ${this.escapeHtml(c.name || 'Certification')} (${this.escapeHtml(c.issuer || 'Authority')})
          </span>
        `).join('');
        morphedCertificationsHtml = `
          <section class="morphed-monograph-certifications" style="margin-bottom: 4rem; padding-top: 1rem; border-top: 1px solid var(--border);">
            <h4 style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">Accreditations & Honors</h4>
            <div>${certHtml}</div>
          </section>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-monograph-footer" style="margin-top: 5rem; padding-top: 2rem; border-top: 2px solid var(--text); display: flex; justify-content: space-between; font-family: var(--font-heading); font-size: 0.95rem; color: var(--text);"><span>MONOGRAPH ISSUE VOL. I</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'asymmetric-bento-canvas') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; margin-bottom: 1rem;">
            <div style="font-weight: 800; color: var(--text); font-size: 1rem;">${this.escapeHtml(e.degree || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.88rem;">${this.escapeHtml(e.school || e.institution || 'University')} • ${this.escapeHtml(e.period || '')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-bento-education" style="margin-bottom: 2.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem;">ACADEMIC NODE</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">${eduHtml}</div>
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.75rem 1rem; font-size: 0.85rem; color: var(--text);">
            <span style="color: var(--accent); font-weight: 700;">●</span> ${this.escapeHtml(c.name || 'Cert')}
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-bento-certifications" style="margin-bottom: 3rem;">
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">${certHtml}</div>
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-bento-footer" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);"><span>BENTO CANOPY DOCK</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'narrative-timeline') {
      if (education.length > 0) {
        const eduMilestones = education.map(e => `
          <div style="padding-left: 1.5rem; border-left: 2px solid var(--primary); margin-bottom: 1.5rem; position: relative;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">${this.escapeHtml(e.period || 'Milestone')}</div>
            <div style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--text);">${this.escapeHtml(e.degree || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-timeline-education" style="margin-bottom: 3.5rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Academic Foundations</h3>
            ${eduMilestones}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certNodes = certifications.map(c => `
          <div style="padding-left: 1.5rem; border-left: 2px solid var(--accent); margin-bottom: 1rem; position: relative;">
            <div style="font-weight: 700; color: var(--text); font-size: 0.95rem;">${this.escapeHtml(c.name || 'Certification')}</div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">Issued by ${this.escapeHtml(c.issuer || 'Authority')} • ${this.escapeHtml(c.year || '')}</div>
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-timeline-certifications" style="margin-bottom: 3.5rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Accredited Milestones</h3>
            ${certNodes}
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-timeline-footer" style="padding: 2.5rem 0; border-top: 2px solid var(--primary); margin-top: 4rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);"><span>TIMELINE HORIZON</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'work-first-runway') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="padding: 1rem 0; border-bottom: 1px solid var(--border);">
            <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.88rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-runway-education" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">ACADEMIC QUALIFICATIONS</div>
            ${eduHtml}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <span style="display: inline-block; background: var(--surface-alt); border: 1px solid var(--border); padding: 4px 10px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text); margin: 0 6px 6px 0;">
            ✓ ${this.escapeHtml(c.name || 'Cert')}
          </span>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-runway-certifications" style="margin-bottom: 2rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">VERIFIED BADGES</div>
            <div>${certHtml}</div>
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-runway-footer" style="padding: 2rem 0; border-top: 1px solid var(--border); margin-top: 4rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);"><span>RUNWAY TELEMETRY PIPELINE</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'horizontal-exhibition') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
            <div style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.85rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} (${this.escapeHtml(e.period || e.year || '')})</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-gallery-education" style="margin-bottom: 2rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">Academic Records</h4>
            ${eduHtml}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); padding: 4px 0;">
            [EXHIBIT_KEY] ${this.escapeHtml(c.name || 'Cert')} (${this.escapeHtml(c.issuer || '')})
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-gallery-certifications" style="margin-bottom: 2rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">Accredited Badges</h4>
            ${certHtml}
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-gallery-footer" style="padding: 2.5rem 0; border-top: 1px solid var(--border); margin-top: 4rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);"><span>GALLERY ARCHIVE CATALOG</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'minimal-single-screen') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border); font-size: 0.9rem;">
            <span style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</span>
            <span style="color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</span>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-minimal-education" style="margin-bottom: 2.5rem;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem;">Credentials</h4>
            ${eduHtml}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <span style="display: inline-block; font-size: 0.85rem; color: var(--text-muted); margin-right: 1rem;">
            ● ${this.escapeHtml(c.name || 'Cert')}
          </span>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-minimal-certifications" style="margin-bottom: 2.5rem;">
            <div>${certHtml}</div>
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-minimal-footer" style="padding: 2rem 0; border-top: 1px solid var(--border); margin-top: 3rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);"><span>INDEX SYSTEM #001</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else if (iaModelId === 'magazine-spread-columns') {
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="margin-bottom: 0.75rem; font-size: 0.95rem;">
            <span style="font-weight: 700; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</span> — <span style="color: var(--text-muted);">${this.escapeHtml(e.school || e.institution || e.university || 'University')} (${this.escapeHtml(e.period || e.year || '')})</span>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-magazine-education" style="margin-bottom: 2rem; border-top: 1px solid var(--border); padding-top: 1rem;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">Academic Formation</div>
            ${eduHtml}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <span style="display: inline-block; margin-right: 1rem; font-size: 0.85rem; color: var(--text-muted);">
            ★ ${this.escapeHtml(c.name || 'Cert')} (${this.escapeHtml(c.issuer || '')})
          </span>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-magazine-certifications" style="margin-bottom: 2rem;">
            <div>${certHtml}</div>
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-magazine-footer" style="padding: 2rem 0; border-top: 1px solid var(--border); margin-top: 4rem; display: flex; justify-content: space-between; font-family: var(--font-heading); font-size: 0.85rem; color: var(--text);"><span>SPECIAL FEATURE PUBLICATION IMPRINT</span><span>&copy; ${year} ${safeName}</span></footer>`;
    } else {
      // Spatial 3D Stage & General Structured Layout
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text);">${this.escapeHtml(e.degree || e.study || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || e.year || '')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-spatial-education" style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Spatial Coordinates & Education</h3>
            ${eduHtml}
          </div>
        `;
      }
      if (certifications.length > 0) {
        const certHtml = certifications.map(c => `
          <div style="display: inline-block; margin: 0 10px 10px 0; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 16px; font-size: 0.88rem; color: var(--text);">
            <span style="color: var(--primary); font-weight: 700;">★</span> ${this.escapeHtml(c.name || 'Certification')} <span style="color: var(--text-muted); font-size: 0.8rem;">(${this.escapeHtml(c.issuer || '')})</span>
          </div>
        `).join('');
        morphedCertificationsHtml = `
          <div class="morphed-spatial-certifications" style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Accredited Constellations</h3>
            ${certHtml}
          </div>
        `;
      }
      morphedFooterHtml = `<footer class="morphed-spatial-footer" style="padding: 2.5rem 0; border-top: 1px solid var(--border); margin-top: 4rem; display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);"><span>SPATIAL STAGE TELEMETRY</span><span>&copy; ${year} ${safeName}</span></footer>`;
    }

    return { morphedEducationHtml, morphedCertificationsHtml, morphedFooterHtml };
  }

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

module.exports = { HtmlRenderer };

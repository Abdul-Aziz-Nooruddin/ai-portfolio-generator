/**
 * HTML/CSS/JS Renderer with Dynamic Section Morphing
 * Compiles ContentProfile, IA Model, LayoutGrammar, ProjectStrategy, and VisualUniverse
 * into an authentic, accessible, responsive single-page web document.
 * 
 * Implements Section Morphing: Education & Certifications dynamically morph their DOM
 * structure and visual presentation to match the active Information Architecture model.
 */

const { ProjectStoryteller } = require('./project-storyteller');

class HtmlRenderer {
  static render(contentProfile, iaModel, layoutGrammar, visualUniverse, projectStrategy, motion) {
    const { name, role, tagline, bio, projects, skills, experience, education, certifications } = contentProfile;
    const colors = visualUniverse.colors;

    const safeName = this.escapeHtml(name);
    const safeRole = this.escapeHtml(role);
    const safeTagline = this.escapeHtml(tagline);
    const safeBio = this.escapeHtml(bio);

    // 1. Render Project Section (12 Distinct Presentational Forms)
    const projectsHtml = ProjectStoryteller.render(projects, projectStrategy, visualUniverse);

    // 2. Render Skills Badges / Matrix
    const skillsHtml = skills.map(s => `
      <span class="skill-tag" style="display: inline-block; padding: 6px 14px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.85rem; font-weight: 600; color: var(--text); margin: 0 6px 8px 0;">${this.escapeHtml(s)}</span>
    `).join('');

    // 3. Render Experience List
    const experienceHtml = experience.map((exp) => `
      <div class="experience-entry" style="padding: 1.5rem 0; border-bottom: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 0.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text); margin: 0;">${this.escapeHtml(exp.role || exp.title || 'Role')} <span style="color: var(--primary);">@ ${this.escapeHtml(exp.company || exp.org || 'Organization')}</span></h4>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${this.escapeHtml(exp.period || exp.duration || 'Present')}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin: 0;">${this.escapeHtml(exp.desc || exp.summary || '')}</p>
      </div>
    `).join('');

    // 4. Section Morphing: Education & Certifications tailored to active IA Model
    const { morphedEducationHtml, morphedCertificationsHtml } = this.renderMorphedSections(
      education || [],
      certifications || [],
      iaModel.id,
      visualUniverse
    );

    // 5. Dynamic Body Layout Builder based on IA Model
    let bodyContent = '';

    if (iaModel.id === 'split-screen-dossier') {
      bodyContent = `
        <div class="layout-root">
          <aside class="dossier-identity-panel">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">[PROFILE_VERIFIED]</div>
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
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-top: 1.5rem;">
                &copy; ${new Date().getFullYear()} ${safeName} • Live Dossier
              </div>
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
        </div>
      `;
    } else if (iaModel.id === 'computational-terminal') {
      bodyContent = `
        <div class="layout-root">
          <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow);">
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

              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 2rem;">[STATUS: 200 OK] Shell session active.</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // General Structural Composition
      bodyContent = `
        <div class="layout-root">
          <header style="margin-bottom: 4.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">[IDENTITY_CANVAS]</div>
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 5.5vw, 4.5rem); font-weight: 800; color: var(--text); line-height: 1.05; margin-bottom: 1.25rem;">${safeName}</h1>
            <div style="font-size: 1.3rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.75rem; max-width: 800px;">${safeRole}</div>
            <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); max-width: 750px; margin-bottom: 2rem;">${safeTagline || safeBio}</p>
            <div style="margin-top: 1.5rem;">${skillsHtml}</div>
          </header>
          <section style="margin-bottom: 5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 2rem;">Featured Work</h2>
            ${projectsHtml}
          </section>
          <section style="margin-bottom: 4rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 1.5rem;">Experience</h2>
            ${experienceHtml}
          </section>
          ${morphedEducationHtml}
          ${morphedCertificationsHtml}
        </div>
      `;
    }

    const styleContent = `
    :root {
      --bg: ${colors.bg};
      --surface: ${colors.surface};
      --surface-alt: ${colors.surfaceAlt};
      --text: ${colors.text};
      --text-muted: ${colors.textMuted};
      --border: ${colors.border};
      --border-strong: ${colors.borderStrong};
      --primary: ${colors.primary};
      --primary-on: ${colors.primaryOn};
      --accent: ${colors.accent};
      --glow: ${colors.glow};
      --font-heading: '${visualUniverse.headingFont}', sans-serif;
      --font-body: '${visualUniverse.bodyFont}', -apple-system, sans-serif;
      --font-mono: '${visualUniverse.monoFont}', monospace;
      --radius: ${visualUniverse.borderRadius};
      --shadow: ${visualUniverse.shadow};
      --fluid-h1: clamp(2.2rem, 5vw, 4rem);
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
<html lang="en" data-theme="${visualUniverse.theme}">
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
   * Section Morphing Engine
   * Morphs Education and Certification sections to match the active IA model
   */
  static renderMorphedSections(education, certifications, iaModelId, visual) {
    if ((!education || education.length === 0) && (!certifications || certifications.length === 0)) {
      return { morphedEducationHtml: '', morphedCertificationsHtml: '' };
    }

    let morphedEducationHtml = '';
    let morphedCertificationsHtml = '';

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
    } else {
      // General Structured Layout
      if (education.length > 0) {
        const eduHtml = education.map(e => `
          <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text);">${this.escapeHtml(e.degree || 'Degree')}</div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">${this.escapeHtml(e.school || e.institution || e.university || 'University')} • ${this.escapeHtml(e.period || '')}</div>
          </div>
        `).join('');
        morphedEducationHtml = `
          <div class="morphed-general-education" style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Education & Background</h3>
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
          <div class="morphed-general-certifications" style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">Certifications & Accreditations</h3>
            ${certHtml}
          </div>
        `;
      }
    }

    return { morphedEducationHtml, morphedCertificationsHtml };
  }

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

module.exports = { HtmlRenderer };

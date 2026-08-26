/**
 * HTML/CSS/JS Renderer
 * Compiles the selected ContentProfile, IA Model, LayoutGrammar, ProjectStrategy, and VisualUniverse
 * into an authentic, accessible, responsive single-page web document.
 */

const { ProjectStoryteller } = require('./project-storyteller');

class HtmlRenderer {
  static render(contentProfile, iaModel, layoutGrammar, visualUniverse, projectStrategy, motion) {
    const { name, role, tagline, bio, projects, skills, experience, education } = contentProfile;
    const colors = visualUniverse.colors;

    const safeName = this.escapeHtml(name);
    const safeRole = this.escapeHtml(role);
    const safeTagline = this.escapeHtml(tagline);
    const safeBio = this.escapeHtml(bio);

    // Render Project Section
    const projectsHtml = ProjectStoryteller.render(projects, projectStrategy, visualUniverse);

    // Render Skills Badges / Matrix
    const skillsHtml = skills.map(s => `
      <span class="skill-tag" style="display: inline-block; padding: 6px 14px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.85rem; font-weight: 600; color: var(--text); margin: 0 6px 8px 0;">${this.escapeHtml(s)}</span>
    `).join('');

    // Render Experience List
    const experienceHtml = experience.map((exp, i) => `
      <div class="experience-entry" style="padding: 1.5rem 0; border-bottom: 1px solid var(--border);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 0.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text); margin: 0;">${this.escapeHtml(exp.role || exp.title || 'Role')} <span style="color: var(--primary);">@ ${this.escapeHtml(exp.company || exp.org || 'Organization')}</span></h4>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${this.escapeHtml(exp.period || exp.duration || 'Present')}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin: 0;">${this.escapeHtml(exp.desc || exp.summary || '')}</p>
      </div>
    `).join('');

    // Dynamic Body Layout Builder based on IA Model
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
              <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
                &copy; ${new Date().getFullYear()} ${safeName} • Live Dossier
              </div>
            </div>
          </aside>
          <main class="dossier-scroll-content">
            <section style="margin-bottom: 4rem;">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">// 01 FEATURED PRODUCTION ARTIFACTS</div>
              ${projectsHtml}
            </section>
            ${experience.length > 0 ? `
              <section style="margin-bottom: 4rem;">
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1rem;">// 02 CAREER RECORD & HIGHLIGHTS</div>
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
                  ${experienceHtml}
                </div>
              </section>
            ` : ''}
            <section id="contact" style="padding: 2.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);">
              <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text);">Get in Touch</h3>
              <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.5rem;">Direct inquiry dispatch or scheduling.</p>
              <form style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
                <input type="text" name="name" placeholder="Your Name" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);">
                <input type="email" name="email" placeholder="Your Email" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);">
                <textarea name="message" placeholder="Project or Opportunity Details" rows="3" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);"></textarea>
                <button type="submit" style="padding: 12px 24px; background: var(--primary); color: var(--primary-on); font-weight: 700; border: none; border-radius: var(--radius); cursor: pointer; align-self: flex-start;">Send Message ➔</button>
              </form>
            </section>
          </main>
        </div>
      `;
    } else if (iaModel.id === 'work-first-runway') {
      bodyContent = `
        <div class="layout-root">
          <header class="runway-lead-bar">
            <div>
              <span style="font-family: var(--font-heading); font-weight: 800; font-size: 1.3rem; color: var(--text);">${safeName}</span>
              <span style="color: var(--text-muted); margin-left: 8px;">— ${safeRole}</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary);">
              LIVE WORK RUNWAY // ${projects.length} ARTIFACTS
            </div>
          </header>
          <main style="padding: 3rem 0;">
            <section style="margin-bottom: 4rem;">
              ${projectsHtml}
            </section>
            ${experience.length > 0 ? `
              <section style="margin-bottom: 4rem;">
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--text);">Experience Record</h3>
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
                  ${experienceHtml}
                </div>
              </section>
            ` : ''}
            <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 4rem; padding: 3rem 0; border-top: 1px solid var(--border);">
              <div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; color: var(--text);">About & Philosophy</h3>
                <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">${safeBio || safeTagline}</p>
              </div>
              <div>
                <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; color: var(--text);">Mastered Stack</h3>
                <div>${skillsHtml}</div>
              </div>
            </section>
            <footer style="border-top: 1px solid var(--border); padding: 2.5rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
              <div style="font-size: 0.9rem; color: var(--text-muted);">&copy; ${new Date().getFullYear()} ${safeName}</div>
              <a href="#top" style="color: var(--primary); font-family: var(--font-mono); font-size: 0.85rem; text-decoration: none;">↑ Back to Top</a>
            </footer>
          </main>
        </div>
      `;
    } else {
      // General Flexible Composition (Editorial, Terminal, Spatial, Timeline, Bento, Single-Screen)
      bodyContent = `
        <div class="layout-root">
          <header style="padding: clamp(2.5rem, 6vw, 5rem) 0 3rem; border-bottom: 1px solid var(--border); margin-bottom: 3.5rem;">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); margin-bottom: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;">// ${iaModel.name}</div>
            <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 800; line-height: 1.1; color: var(--text); margin-bottom: 1rem;">${safeName}</h1>
            <p style="font-size: clamp(1.1rem, 1.6vw, 1.4rem); color: var(--text-muted); max-width: 800px; line-height: 1.6;">${safeRole} — ${safeTagline || safeBio}</p>
          </header>
          <main>
            <section style="margin-bottom: 4.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem;">
                <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin: 0;">Featured Work</h2>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${projects.length} Active Deployments</span>
              </div>
              ${projectsHtml}
            </section>
            <section style="margin-bottom: 4rem;">
              <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.25rem;">Technical Capabilities</h2>
              <div style="padding: 1.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);">${skillsHtml}</div>
            </section>
            ${experience.length > 0 ? `
              <section style="margin-bottom: 4rem;">
                <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.25rem;">Experience Record</h2>
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
                  ${experienceHtml}
                </div>
              </section>
            ` : ''}
            <section style="padding: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 4rem;">
              <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 0.5rem;">Initiate Collaboration</h2>
              <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Available for high-impact technical initiatives.</p>
              <form style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
                <input type="text" name="name" placeholder="Your Name" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);">
                <input type="email" name="email" placeholder="Your Email" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);">
                <textarea name="message" placeholder="Project Brief" rows="3" required style="padding: 12px 16px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); font-family: var(--font-body);"></textarea>
                <button type="submit" style="padding: 12px 24px; background: var(--primary); color: var(--primary-on); font-weight: 700; border: none; border-radius: var(--radius); cursor: pointer; align-self: flex-start;">Send Message ➔</button>
              </form>
            </section>
          </main>
          <footer style="border-top: 1px solid var(--border); padding: 2rem 0; display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.88rem;">
            <div>&copy; ${new Date().getFullYear()} ${safeName}. All rights reserved.</div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem;">ENGINEERED // DESIGN STUDIO</div>
          </footer>
        </div>
      `;
    }

    const educationList = Array.isArray(education) ? education : [];
    const educationHtml = educationList.map((edu, i) => `
      <div class="education-entry" style="padding: 1.25rem 0; border-bottom: 1px solid var(--border);">
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--text); margin: 0;">${this.escapeHtml(edu.degree || edu.title || 'Degree')}</h4>
        <div style="color: var(--primary); font-size: 0.9rem;">${this.escapeHtml(edu.school || edu.institution || 'Institution')}</div>
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${this.escapeHtml(edu.period || edu.year || '')}</span>
      </div>
    `).join('');

    const certificationsList = Array.isArray(contentProfile.certifications) ? contentProfile.certifications : [];
    const certificationsHtml = certificationsList.map((cert, i) => `
      <div class="certification-entry" style="padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
        <div style="font-family: var(--font-heading); font-weight: 700; color: var(--text);">${this.escapeHtml(cert.name || cert.title || '')}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">${this.escapeHtml(cert.issuer || '')} ${cert.year ? `• ${this.escapeHtml(cert.year)}` : ''}</div>
      </div>
    `).join('');

    const certificationsSection = certificationsList.length > 0 ? `
      <section style="margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.25rem;">Certifications & Credentials</h2>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
          ${certificationsHtml}
        </div>
      </section>
    ` : '';

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
  ${educationHtml ? `
    <section style="margin-bottom: 4rem; max-width: 1200px; margin-left: auto; margin-right: auto; padding: 0 1.5rem;">
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1.25rem;">Education & Background</h2>
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem 2rem;">
        ${educationHtml}
      </div>
    </section>
  ` : ''}
  ${certificationsSection ? `
    <section style="margin-bottom: 4rem; max-width: 1200px; margin-left: auto; margin-right: auto; padding: 0 1.5rem;">
      ${certificationsSection}
    </section>
  ` : ''}
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

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

module.exports = { HtmlRenderer };

/**
 * 🏛️ Composition Primitives (Phase 35)
 * Modular spatial structures that control physical DOM topology, coordinate relationships,
 * content placement, whitespace, and responsive transformations.
 * Completely replaces monolithic template switching with authoritative dynamic composition.
 */

class CompositionPrimitives {
  /**
   * 1. Identity Rail Primitive (Permanent Sidebar / Anchor)
   */
  static renderIdentityRail(content, visual = {}) {
    const { name, role, tagline, photoHtml } = content;
    return `
      <aside class="primitive-identity-rail" style="padding: clamp(2rem, 4vw, 4rem) 0; display: flex; flex-direction: column; justify-content: space-between; border-right: 1px solid var(--border); min-height: 100vh; position: sticky; top: 0; background: var(--bg); box-sizing: border-box;">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 1.25rem;">[IDENTITY_RAIL // VERIFIED]</div>
          ${photoHtml || ''}
          <h1 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 4vw, 3.4rem); font-weight: 800; line-height: 1.1; margin-bottom: 0.75rem; color: var(--text);">${name}</h1>
          <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${role}</div>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); max-width: 280px;">${tagline}</p>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 1.5rem;">
          <div>NODE_STATUS: ACTIVE</div>
          <div>COORDINATES: LATERAL_STREAM</div>
        </div>
      </aside>
    `;
  }

  /**
   * 2. Full Bleed Field Primitive
   */
  static renderFullBleedField(content, visual = {}) {
    const { heading, subheading, bodyHtml } = content;
    return `
      <section class="primitive-full-bleed-field" style="width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 6rem); background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); box-sizing: border-box;">
        <div style="max-width: 1380px; margin: 0 auto;">
          ${heading ? `<h2 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 900; line-height: 1.1; margin-bottom: 1rem; color: var(--text);">${heading}</h2>` : ''}
          ${subheading ? `<p style="font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin-bottom: 3rem;">${subheading}</p>` : ''}
          ${bodyHtml || ''}
        </div>
      </section>
    `;
  }

  /**
   * 3. Reading Column Primitive (Narrow Measure)
   */
  static renderReadingColumn(content, visual = {}) {
    const { title, text, pullQuote, notes } = content;
    return `
      <article class="primitive-reading-column" style="max-width: 780px; margin: 0 auto; padding: clamp(3rem, 6vw, 6rem) 1.5rem; font-size: 1.15rem; line-height: 1.8; color: var(--text);">
        ${title ? `<h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.15; margin-bottom: 2rem; letter-spacing: -0.02em;">${title}</h2>` : ''}
        <div style="margin-bottom: 2.5rem;">${text || ''}</div>
        ${pullQuote ? `
          <blockquote style="border-left: 3px solid var(--primary); margin: 3rem 0; padding: 1rem 0 1rem 2rem; font-family: var(--font-heading); font-style: italic; font-size: 1.4rem; line-height: 1.4; color: var(--text);">
            "${pullQuote}"
          </blockquote>
        ` : ''}
        ${notes ? `<div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 1.5rem; margin-top: 3rem;">${notes}</div>` : ''}
      </article>
    `;
  }

  /**
   * 4. Split Pane Primitive
   */
  static renderSplitPane(leftHtml, rightHtml, leftWidth = '40%') {
    return `
      <div class="primitive-split-pane" style="display: grid; grid-template-columns: ${leftWidth} 1fr; gap: clamp(2rem, 4vw, 5rem); align-items: start; margin-bottom: 4rem;">
        <div class="split-pane-left">${leftHtml}</div>
        <div class="split-pane-right">${rightHtml}</div>
      </div>
    `;
  }

  /**
   * 5. Command Surface Primitive (Terminal Window)
   */
  static renderCommandSurface(content, visual = {}) {
    const { sessionTitle, promptText, outputHtml } = content;
    return `
      <div class="primitive-command-surface" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); margin-bottom: 4rem; font-family: var(--font-mono);">
        <div style="background: var(--surface-alt); padding: 12px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 8px;">
            <span style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
            <span style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
            <span style="width: 12px; height: 12px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
          </div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${sessionTitle || 'terminal://console.sh'}</span>
          <span style="font-size: 0.75rem; color: var(--primary);">200 OK</span>
        </div>
        <div style="padding: 2.5rem 2rem;">
          ${promptText ? `<div style="color: var(--primary); font-size: 0.9rem; margin-bottom: 1.5rem;">$ ${promptText}</div>` : ''}
          ${outputHtml || ''}
        </div>
      </div>
    `;
  }

  /**
   * 6. Navigation Rail Primitive
   */
  static renderNavigationRail(navGrammar = {}, sections = []) {
    return `
      <nav class="primitive-nav-rail" style="${navGrammar.css || ''}">
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--primary); margin-bottom: 1rem; text-transform: uppercase;">INDEX_WAYPOINTS</div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
          ${sections.map((s, idx) => `
            <li>
              <a href="#${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-decoration: none; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--primary); font-size: 0.75rem;">0${idx + 1}</span>
                <span>${s}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </nav>
    `;
  }

  /**
   * 7. Editorial Masthead Primitive
   */
  static renderEditorialMasthead(name, role, tagline) {
    return `
      <header class="primitive-editorial-masthead" style="border-bottom: 2px solid var(--text); padding: 2rem 0; margin-bottom: 4rem; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1.5rem;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.1em; color: var(--primary); text-transform: uppercase; font-weight: 700;">VOL. XXIV • SPECIAL EDITION</span>
          <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 900; line-height: 1; margin: 0.5rem 0; color: var(--text);">${name}</h1>
        </div>
        <div style="text-align: right; max-width: 420px;">
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--text); margin-bottom: 0.25rem;">${role}</div>
          <div style="font-size: 0.95rem; color: var(--text-muted);">${tagline}</div>
        </div>
      </header>
    `;
  }

  /**
   * 8. Data Table / Matrix Primitive
   */
  static renderDataTable(headers = [], rows = []) {
    return `
      <div class="primitive-data-table" style="overflow-x: auto; margin-bottom: 3.5rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface);">
        <table style="width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.85rem; text-align: left;">
          <thead>
            <tr style="background: var(--surface-alt); border-bottom: 1px solid var(--border);">
              ${headers.map(h => `<th style="padding: 14px 18px; color: var(--primary); font-weight: 700;">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => `
              <tr style="border-bottom: 1px solid var(--border);">
                ${r.map(cell => `<td style="padding: 14px 18px; color: var(--text);">${cell}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * 9. Thesis Statement / Manifesto Primitive
   */
  static renderThesisStatement(content, visual = {}) {
    const { label, statement, author, metrics } = content;
    return `
      <section class="primitive-thesis-statement" style="padding: clamp(3rem, 6vw, 6rem) 0; margin-bottom: 4rem; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem;">[01 // ${label || 'DESIGN THESIS'}]</div>
        <h2 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; color: var(--text); max-width: 960px; margin-bottom: 2rem;">${statement}</h2>
        ${metrics ? `<div style="display: flex; gap: 2.5rem; flex-wrap: wrap; margin-top: 2rem;">${metrics}</div>` : ''}
        ${author ? `<div style="font-size: 1rem; color: var(--text-muted); font-style: italic;">— ${author}</div>` : ''}
      </section>
    `;
  }

  /**
   * 10. Offset Poster Block Primitive
   */
  static renderOffsetBlock(content, visual = {}) {
    const { title, subtitle, bodyHtml, badge } = content;
    return `
      <section class="primitive-offset-block" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(2rem, 5vw, 4rem); margin-left: clamp(0px, 4vw, 6rem); margin-bottom: 4rem; box-shadow: var(--shadow);">
        ${badge ? `<div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 1rem;">${badge}</div>` : ''}
        ${title ? `<h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 900; line-height: 1.1; color: var(--text); margin-bottom: 1rem;">${title}</h2>` : ''}
        ${subtitle ? `<div style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem;">${subtitle}</div>` : ''}
        ${bodyHtml || ''}
      </section>
    `;
  }

  /**
   * 11. Spatial Stage / Node Field Primitive
   */
  static renderSpatialNodeField(content, visual = {}) {
    const { title, subtitle, itemsHtml } = content;
    return `
      <section class="primitive-spatial-field" style="position: relative; padding: clamp(3rem, 6vw, 6rem) 0; margin-bottom: 4rem;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); text-transform: uppercase; margin-bottom: 1rem;">[SPATIAL_STAGE // ORBIT_NODES]</div>
        ${title ? `<h2 style="font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 800; color: var(--text); margin-bottom: 1rem;">${title}</h2>` : ''}
        ${subtitle ? `<p style="font-size: 1.15rem; color: var(--text-muted); max-width: 760px; margin-bottom: 3rem;">${subtitle}</p>` : ''}
        <div class="spatial-node-grid">${itemsHtml || ''}</div>
      </section>
    `;
  }

  /**
   * 12. Bento Mosaic Canopy Primitive
   */
  static renderBentoCanopy(content, visual = {}) {
    const { name, role, tagline, photoHtml, skillsHtml } = content;
    return `
      <section class="primitive-bento-canopy" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: clamp(2rem, 4vw, 3.5rem); margin-bottom: 3.5rem;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.75rem;">BENTO CANOPY // EXECUTIVE ROOT</div>
        ${photoHtml || ''}
        <h1 style="font-family: var(--font-heading); font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 800; color: var(--text); line-height: 1.1; margin-bottom: 0.75rem;">${name}</h1>
        <div style="font-size: 1.2rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.5rem;">${role}</div>
        <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; max-width: 750px; margin-bottom: 2rem;">${tagline}</p>
        ${skillsHtml ? `<div>${skillsHtml}</div>` : ''}
      </section>
    `;
  }

  /**
   * 13. Contact & Telemetry Dock Primitive
   */
  static renderContactDock(content, visual = {}) {
    const { name, year, status } = content;
    const email = content.email || 'contact@verified.dev';
    return `
      <footer class="primitive-contact-dock" style="padding: 3rem 0; border-top: 1px solid var(--border); margin-top: 5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">
        <div>&copy; ${year || new Date().getFullYear()} ${name || 'Author'} • Live Generative Build</div>
        <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
          <a href="mailto:${email}" style="color: var(--primary); text-decoration: underline; font-weight: 700;">Direct Inquiries ↗</a>
          <span style="color: var(--primary);">${status || 'SYSTEM_ONLINE // STATUS: 200 OK'}</span>
        </div>
      </footer>
    `;
  }
}

module.exports = { CompositionPrimitives };

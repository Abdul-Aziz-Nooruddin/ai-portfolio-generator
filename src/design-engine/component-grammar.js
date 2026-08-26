/**
 * 🏛️ Component Grammar Engine (Phase 31)
 * Defines the material expression, DOM topology, and semantic patterns
 * for secondary sections (Skills, Experience, Education, Contact, Photo)
 * across all cohesive Visual Universes and Macro Information Architecture models.
 * 
 * Eliminates renderer-level convergence: NO generic pill tags, NO identical stacked experience rows.
 */

class ComponentGrammar {
  /**
   * Resolves the component grammar for a given visual universe and IA model
   * @param {Object} visualUniverse
   * @param {Object} iaModel
   * @returns {Object} Component Grammar rules
   */
  static resolve(visualUniverse = {}, iaModel = {}) {
    const universeId = visualUniverse.id || visualUniverse.universeId || 'technical-lab';
    const iaId = iaModel.id || 'split-screen-dossier';

    // 1. Determine Grammar Archetype
    let archetype = 'MINIMAL_LEDGER';

    if (universeId.includes('editorial') || universeId.includes('luxury') || universeId.includes('magazine')) {
      archetype = 'EDITORIAL_MONOGRAPH';
    } else if (universeId.includes('terminal') || universeId.includes('obsidian') || universeId.includes('systems') || universeId.includes('technical') || universeId.includes('lab')) {
      archetype = 'TERMINAL_CONSOLE';
    } else if (universeId.includes('swiss') || universeId.includes('bauhaus') || universeId.includes('structural')) {
      archetype = 'ARCHITECTURAL_BLUEPRINT';
    } else if (universeId.includes('monochrome') || universeId.includes('gallery')) {
      archetype = 'MUSEUM_CATALOG';
    } else if (universeId.includes('brutalist') || universeId.includes('pop')) {
      archetype = 'BRUTALIST_SPECIMEN';
    } else if (universeId.includes('spatial') || universeId.includes('futuristic')) {
      archetype = 'SPATIAL_HUD';
    }

    return {
      archetype,
      universeId,
      iaId,
      skillsGrammar: this.getSkillsGrammar(archetype),
      experienceGrammar: this.getExperienceGrammar(archetype),
      photoGrammar: this.getPhotoGrammar(archetype, visualUniverse),
      educationGrammar: this.getEducationGrammar(archetype)
    };
  }

  static getSkillsGrammar(archetype) {
    switch (archetype) {
      case 'EDITORIAL_MONOGRAPH':
        return {
          type: 'prose-index',
          containerClass: 'editorial-skills-prose',
          render: (skills, escape) => `
            <div class="editorial-skills-container" style="font-family: var(--font-body); font-size: 1.05rem; line-height: 2; color: var(--text);">
              <p style="margin: 0;">
                ${skills.map((s, idx) => `
                  <strong style="color: var(--text); font-weight: 700;">${escape(s)}</strong>${idx < skills.length - 1 ? ' <span style="color: var(--text-muted); opacity: 0.6; margin: 0 8px;">—</span> ' : ''}
                `).join('')}
              </p>
            </div>
          `
        };

      case 'TERMINAL_CONSOLE':
        return {
          type: 'cli-flags',
          containerClass: 'terminal-capabilities-stream',
          render: (skills, escape) => `
            <div class="terminal-skills-matrix" style="font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.8; background: rgba(0,0,0,0.3); border: 1px solid var(--border); padding: 1.25rem; border-radius: var(--radius);">
              <div style="color: var(--text-muted); margin-bottom: 0.75rem; font-size: 0.75rem;">$ sys.capabilities --inspect --all</div>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px;">
                ${skills.map(s => `
                  <div style="display: flex; align-items: center; gap: 8px; color: var(--text);">
                    <span style="color: var(--primary); font-weight: 800;">[OK]</span>
                    <span>${escape(s)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `
        };

      case 'ARCHITECTURAL_BLUEPRINT':
        return {
          type: 'dimensioned-matrix',
          containerClass: 'architectural-skills-grid',
          render: (skills, escape) => `
            <div class="architectural-skills-table" style="font-family: var(--font-mono); font-size: 0.82rem; border-top: 2px solid var(--text); border-bottom: 2px solid var(--text);">
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
                ${skills.map((s, idx) => `
                  <div style="border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text); font-weight: 700;">${escape(s)}</span>
                    <span style="color: var(--text-muted); font-size: 0.72rem;">#0${(idx + 1).toString().padStart(2, '0')}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `
        };

      case 'MUSEUM_CATALOG':
        return {
          type: 'provenance-index',
          containerClass: 'museum-skills-catalog',
          render: (skills, escape) => `
            <div class="museum-skills-ledger" style="font-family: var(--font-heading); font-size: 0.95rem; border-left: 2px solid var(--primary); padding-left: 1.5rem;">
              <div style="font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1rem;">Mastered Disciplines & Tooling</div>
              <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                ${skills.map(s => `
                  <span style="border-bottom: 1px dashed var(--border); padding-bottom: 4px; color: var(--text); font-style: italic;">${escape(s)}</span>
                `).join('')}
              </div>
            </div>
          `
        };

      case 'BRUTALIST_SPECIMEN':
        return {
          type: 'monolithic-blocks',
          containerClass: 'brutalist-skills-monolith',
          render: (skills, escape) => `
            <div class="brutalist-skills-grid" style="display: flex; flex-wrap: wrap; gap: 6px; font-family: var(--font-mono); font-size: 0.9rem;">
              ${skills.map(s => `
                <div style="background: var(--text); color: var(--bg); padding: 8px 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid var(--text);">
                  ${escape(s)}
                </div>
              `).join('')}
            </div>
          `
        };

      case 'SPATIAL_HUD':
      default:
        return {
          type: 'spatial-nodes',
          containerClass: 'spatial-skills-nodes',
          render: (skills, escape) => `
            <div class="spatial-skills-stream" style="display: flex; flex-wrap: wrap; gap: 10px; font-family: var(--font-body);">
              ${skills.map(s => `
                <div style="background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); padding: 8px 18px; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; color: var(--text); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                  <span style="color: var(--primary); margin-right: 6px;">✦</span>${escape(s)}
                </div>
              `).join('')}
            </div>
          `
        };
    }
  }

  static getExperienceGrammar(archetype) {
    switch (archetype) {
      case 'EDITORIAL_MONOGRAPH':
        return {
          type: 'chapter-chronicle',
          render: (expList, escape) => expList.map(exp => `
            <article class="editorial-exp-chapter" style="margin-bottom: 3.5rem; position: relative;">
              <header style="display: grid; grid-template-columns: 140px 1fr; gap: 24px; align-items: baseline; margin-bottom: 1rem;">
                <time style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${escape(exp.period || exp.duration || 'Present')}</time>
                <div>
                  <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin: 0 0 4px;">${escape(exp.role || exp.title || 'Role')}</h3>
                  <div style="font-size: 1rem; font-style: italic; color: var(--primary);">${escape(exp.company || exp.org || 'Company')}</div>
                </div>
              </header>
              <div style="padding-left: 164px; font-size: 0.98rem; line-height: 1.7; color: var(--text); max-width: 680px;">
                <p style="margin: 0;">${escape(exp.desc || exp.summary || '')}</p>
              </div>
            </article>
          `).join('')
        };

      case 'TERMINAL_CONSOLE':
        return {
          type: 'execution-trace',
          render: (expList, escape) => expList.map((exp, idx) => `
            <div class="terminal-exp-trace" style="font-family: var(--font-mono); font-size: 0.88rem; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <div style="color: var(--text-muted); font-size: 0.78rem; margin-bottom: 4px;">// TRACE_ENTRY_0${idx + 1} :: ${escape(exp.period || 'ACTIVE')}</div>
              <div style="display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap;">
                <span style="color: var(--primary); font-weight: 800;">${escape(exp.role || 'ROLE')}</span>
                <span style="color: var(--text);">@</span>
                <span style="color: #38bdf8; text-decoration: underline;">${escape(exp.company || 'ORG')}</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.5; margin: 8px 0 0 0;">${escape(exp.desc || '')}</p>
            </div>
          `).join('')
        };

      case 'ARCHITECTURAL_BLUEPRINT':
        return {
          type: 'phase-spec',
          render: (expList, escape) => expList.map((exp, idx) => `
            <div class="architectural-exp-block" style="border: 1px solid var(--border); margin-bottom: 1.5rem; background: var(--surface);">
              <div style="display: flex; justify-content: space-between; background: var(--surface-alt); padding: 8px 16px; border-bottom: 1px solid var(--border); font-family: var(--font-mono); font-size: 0.75rem;">
                <span>PHASE_${(idx + 1).toString().padStart(2, '0')}</span>
                <span style="color: var(--primary);">${escape(exp.period || '')}</span>
              </div>
              <div style="padding: 18px 20px;">
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; margin: 0 0 6px;">${escape(exp.role)} <span style="font-weight: 400; color: var(--text-muted);">— ${escape(exp.company)}</span></h4>
                <p style="font-family: var(--font-body); font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); margin: 0;">${escape(exp.desc)}</p>
              </div>
            </div>
          `).join('')
        };

      case 'MUSEUM_CATALOG':
      case 'BRUTALIST_SPECIMEN':
      case 'SPATIAL_HUD':
      default:
        return {
          type: 'standard-ledger',
          render: (expList, escape) => expList.map(exp => `
            <div class="standard-exp-row" style="padding: 1.5rem 0; border-bottom: 1px solid var(--border);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 0.5rem;">
                <h4 style="font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: var(--text); margin: 0;">${escape(exp.role)} <span style="color: var(--primary);">@ ${escape(exp.company)}</span></h4>
                <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${escape(exp.period || 'Present')}</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin: 0;">${escape(exp.desc)}</p>
            </div>
          `).join('')
        };
    }
  }

  static getPhotoGrammar(archetype, visualUniverse) {
    return {
      render: (photoUrl, name, escape) => {
        if (!photoUrl) return '';
        const safeUrl = escape(photoUrl);
        const safeName = escape(name);

        switch (archetype) {
          case 'EDITORIAL_MONOGRAPH':
            return `
              <figure class="editorial-portrait-plate" style="margin: 0 0 2rem 0; position: relative;">
                <img src="${safeUrl}" alt="${safeName}" style="width: 100%; max-width: 380px; aspect-ratio: 4/5; object-fit: cover; filter: grayscale(15%) contrast(105%); border: 1px solid var(--border);" loading="lazy">
                <figcaption style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 8px; text-transform: uppercase; letter-spacing: 0.1em;">FIG. 01 — IDENTITY SPECIMEN (${safeName})</figcaption>
              </figure>
            `;

          case 'TERMINAL_CONSOLE':
            return `
              <div class="terminal-portrait-specimen" style="margin: 0 0 1.5rem 0; display: inline-block; border: 1px solid var(--primary); padding: 4px; background: rgba(0,0,0,0.5);">
                <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--primary); margin-bottom: 4px;">// AVATAR_BITMAP_FEED</div>
                <img src="${safeUrl}" alt="${safeName}" style="width: 140px; height: 140px; object-fit: cover; filter: contrast(120%) brightness(95%); border-radius: 4px;" loading="lazy">
              </div>
            `;

          case 'ARCHITECTURAL_BLUEPRINT':
            return `
              <div class="architectural-portrait-frame" style="border: 2px solid var(--text); padding: 12px; margin-bottom: 2rem; display: inline-block; background: var(--surface);">
                <img src="${safeUrl}" alt="${safeName}" style="width: 180px; height: 220px; object-fit: cover; filter: grayscale(100%); display: block;" loading="lazy">
                <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text); margin-top: 6px; text-align: center;">ELEVATION // 01</div>
              </div>
            `;

          case 'BRUTALIST_SPECIMEN':
            return `
              <div class="brutalist-portrait-block" style="border: 4px solid var(--text); margin-bottom: 2rem; display: inline-block; box-shadow: 8px 8px 0 var(--text);">
                <img src="${safeUrl}" alt="${safeName}" style="width: 220px; height: 260px; object-fit: cover; display: block;" loading="lazy">
              </div>
            `;

          case 'MUSEUM_CATALOG':
          case 'SPATIAL_HUD':
          default:
            return `
              <div class="spatial-portrait-badge" style="margin-bottom: 1.5rem; display: inline-block;">
                <img src="${safeUrl}" alt="${safeName}" style="width: 160px; height: 160px; object-fit: cover; border-radius: 20px; border: 2px solid var(--primary); box-shadow: 0 8px 32px rgba(0,0,0,0.2);" loading="lazy">
              </div>
            `;
        }
      }
    };
  }

  static getEducationGrammar(archetype) {
    return {
      render: (eduList, escape) => {
        if (!eduList || eduList.length === 0) return '';
        return `
          <div class="education-grammar-container" style="margin-top: 2rem;">
            ${eduList.map(edu => `
              <div style="margin-bottom: 1.25rem;">
                <div style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--text);">${escape(edu.degree || edu.name || 'Degree')}</div>
                <div style="font-size: 0.88rem; color: var(--text-muted); font-family: var(--font-mono);">${escape(edu.institution || edu.school || 'Institution')} ${edu.year ? `• ${escape(edu.year)}` : ''}</div>
              </div>
            `).join('')}
          </div>
        `;
      }
    };
  }
}

module.exports = { ComponentGrammar };

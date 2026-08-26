/**
 * Project Storytelling Engine
 * Renders 12 structurally distinct project presentation compositions with unique DOM trees.
 * Eliminates the universal `<div class="project-card">` monopoly.
 */

class ProjectStoryteller {
  static render(projects = [], strategy = 'asymmetric-media-mosaic', visual = {}) {
    if (!Array.isArray(projects) || projects.length === 0) {
      return `<div class="empty-projects" style="padding: 3rem; text-align: center; color: var(--text-muted);">No featured projects selected.</div>`;
    }

    const safeProjects = projects.map(p => ({
      name: this.escapeHtml(p.name || 'Untitled Project'),
      desc: this.escapeHtml(p.desc || p.description || 'Architectural project case study and live deployment.'),
      tech: this.escapeHtml(p.tech || p.tags || 'TypeScript • Node.js • WebGL'),
      live: p.live || p.demo || p.url || '',
      github: p.github || p.repo || '',
      image: p.image || p.screenshot || '',
      stars: p.stars ? `★ ${p.stars}` : '',
      metrics: p.metrics || p.impact || ''
    }));

    // Multi-Artifact Within-Portfolio Strategy Plan
    if (Array.isArray(strategy) && strategy.length > 0 && strategy[0].artifactStrategy) {
      const primaryStratKey = strategy[0].artifactStrategy || 'technical-dossier';
      const renderedArtifacts = safeProjects.map((p, idx) => {
        const itemPlan = strategy[idx] || strategy[strategy.length - 1];
        const stratKey = itemPlan.artifactStrategy || 'technical-dossier';
        return this.renderSingleProject(p, idx, stratKey, visual, itemPlan.artifactRole);
      });
      return `<div class="story-presentation presentation-multi-artifact-suite presentation-${primaryStratKey}" data-primary-strategy="${primaryStratKey}">${renderedArtifacts.join('')}</div>`;
    }

    const strategyKey = typeof strategy === 'string' ? strategy : (strategy?.strategyId || strategy?.id || 'asymmetric-media-mosaic');

    switch (strategyKey) {
      case 'case-study-narrative':
        return this.renderCaseStudyNarrative(safeProjects, visual);
      case 'technical-dossier':
      case 'code-architecture-dossier':
        return this.renderCodeArchitectureDossier(safeProjects, visual);
      case 'visual-exhibition':
      case 'horizontal-filmstrip':
        return this.renderHorizontalFilmstrip(safeProjects, visual);
      case 'minimal-project-index':
      case 'typographic-index-reveal':
        return this.renderTypographicIndexReveal(safeProjects, visual);
      case 'project-log':
      case 'terminal-session-log':
        return this.renderTerminalSessionLog(safeProjects, visual);
      case 'editorial-feature':
      case 'magazine-editorial-chapter':
        return this.renderMagazineEditorialChapters(safeProjects, visual);
      case 'timeline':
      case 'timeline-milestone-card':
        return this.renderTimelineMilestones(safeProjects, visual);
      case 'architecture-map':
      case 'interactive-canvas-node':
        return this.renderInteractiveCanvasNodes(safeProjects, visual);
      case 'metrics-observatory':
      case 'compact-metrics-table':
        return this.renderCompactMetricsTable(safeProjects, visual);
      case 'spatial-orbit-dock':
        return this.renderSpatialOrbitDock(safeProjects, visual);
      case 'split-technical-spec':
      case 'split-screen-comparison':
        return this.renderSplitScreenComparison(safeProjects, visual);
      case 'research-paper':
        return this.renderAcademicResearchPaper(safeProjects, visual);
      case 'repository-archaeology':
        return this.renderRepositoryArchaeology(safeProjects, visual);
      case 'before-after':
        return this.renderBeforeAfterMatrix(safeProjects, visual);
      case 'failure-recovery':
        return this.renderFailureRecoveryPostmortem(safeProjects, visual);
      case 'build-journal':
        return this.renderBuildJournal(safeProjects, visual);
      case 'artifact-archive':
        return this.renderArtifactArchive(safeProjects, visual);
      case 'product-launch':
      case 'fullscreen-interactive-slide':
        return this.renderFullscreenSlides(safeProjects, visual);
      case 'feature-atlas':
      case 'asymmetric-media-mosaic':
      default:
        return this.renderAsymmetricMediaMosaic(safeProjects, visual);
    }
  }

  static renderSingleProject(p, idx, stratKey, visual, role = 'primary') {
    switch (stratKey) {
      case 'case-study-narrative':
        return this.renderCaseStudyNarrative([p], visual);
      case 'technical-dossier':
      case 'code-architecture-dossier':
        return this.renderCodeArchitectureDossier([p], visual);
      case 'research-paper':
        return this.renderAcademicResearchPaper([p], visual);
      case 'failure-recovery':
        return this.renderFailureRecoveryPostmortem([p], visual);
      case 'metrics-observatory':
      case 'compact-metrics-table':
        return this.renderCompactMetricsTable([p], visual);
      case 'build-journal':
        return this.renderBuildJournal([p], visual);
      case 'repository-archaeology':
        return this.renderRepositoryArchaeology([p], visual);
      case 'before-after':
        return this.renderBeforeAfterMatrix([p], visual);
      case 'artifact-archive':
        return this.renderArtifactArchive([p], visual);
      case 'minimal-project-index':
      case 'typographic-index-reveal':
        return this.renderTypographicIndexReveal([p], visual);
      case 'visual-exhibition':
      case 'horizontal-filmstrip':
        return this.renderHorizontalFilmstrip([p], visual);
      case 'project-log':
      case 'terminal-session-log':
        return this.renderTerminalSessionLog([p], visual);
      case 'spatial-orbit-dock':
        return this.renderSpatialOrbitDock([p], visual);
      case 'split-technical-spec':
      case 'split-screen-comparison':
        return this.renderSplitScreenComparison([p], visual);
      case 'fullscreen-interactive-slide':
      case 'product-launch':
        return this.renderFullscreenSlides([p], visual);
      case 'editorial-feature':
      case 'magazine-editorial-chapter':
        return this.renderMagazineEditorialChapters([p], visual);
      default:
        return this.renderAsymmetricMediaMosaic([p], visual);
    }
  }

  // 1. Fullscreen Viewport Slide Takeover
  static renderFullscreenSlides(projects, visual) {
    const slidesHtml = projects.map((p, i) => `
      <article class="viewport-project-slide" id="project-slide-${i+1}" style="min-height: 85vh; display: flex; flex-direction: column; justify-content: flex-end; padding: clamp(2rem, 5vw, 4.5rem); margin-bottom: 3rem; background: ${i % 2 === 0 ? 'var(--surface)' : 'var(--surface-alt)'}; border: 1px solid var(--border); border-radius: var(--radius); position: relative; overflow: hidden;">
        <div class="slide-watermark-number" style="position: absolute; top: -10px; right: 20px; font-size: clamp(6rem, 15vw, 12rem); font-weight: 900; opacity: 0.04; font-family: var(--font-heading); line-height: 1; user-select: none;">0${i+1}</div>
        <div class="slide-content-stage" style="position: relative; z-index: 2; max-width: 850px;">
          <div class="slide-badge-row" style="display: flex; gap: 10px; align-items: center; margin-bottom: 1.25rem;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em;">Case 0${i+1}</span>
            <span style="display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: var(--text-muted);"></span>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${p.tech}</span>
            ${p.stars ? `<span style="margin-left: auto; font-family: var(--font-mono); font-size: 0.8rem; color: #eab308; font-weight: 700;">${p.stars}</span>` : ''}
          </div>
          <h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem; color: var(--text);">${p.name}</h2>
          <p style="font-size: clamp(1rem, 1.3vw, 1.25rem); color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem; max-width: 720px;">${p.desc}</p>
          <div class="slide-actions-row" style="display: flex; gap: 14px; flex-wrap: wrap;">
            ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="btn-primary-action" style="padding: 12px 28px; background: var(--primary); color: var(--primary-on); font-weight: 700; text-decoration: none; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px;"><span>Live Demo</span> ↗</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary-action" style="padding: 12px 24px; background: transparent; color: var(--text); border: 1px solid var(--border); font-weight: 600; text-decoration: none; border-radius: var(--radius); display: inline-flex; align-items: center; gap: 8px;"><span>Source Code</span> ↗</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');

    return `<div class="story-presentation presentation-fullscreen-slides">${slidesHtml}</div>`;
  }

  // 2. Code & Architecture Dossier
  static renderCodeArchitectureDossier(projects, visual) {
    const itemsHtml = projects.map((p, i) => `
      <div class="dossier-card architecture-dossier-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2.5rem 0; border-bottom: 1px solid var(--border);">
        <div class="dossier-specs-column">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">[MODULE_SPEC_${i+1}]</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">${p.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${p.desc}</p>
          <div style="display: flex; gap: 12px;">
            ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); font-family: var(--font-mono); font-size: 0.88rem; font-weight: 700; text-decoration: underline;">deploy://live ↗</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" style="color: var(--text-muted); font-family: var(--font-mono); font-size: 0.88rem; text-decoration: underline;">src://repo ↗</a>` : ''}
          </div>
        </div>
        <div class="dossier-telemetry-box" style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; font-family: var(--font-mono); font-size: 0.85rem;">
          <div style="border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; color: var(--text-muted);">
            <span>SYSTEM_COMPONENTS</span>
            <span>STATUS: ACTIVE</span>
          </div>
          <div style="color: var(--text); margin-bottom: 1rem; line-height: 1.8;">
            <div>&gt; STACK: ${p.tech}</div>
            <div>&gt; PIPELINE: Production Verified</div>
            ${p.stars ? `<div>&gt; REPO_SIGNAL: ${p.stars}</div>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-architecture-dossier">${itemsHtml}</div>`;
  }

  // 3. Horizontal Filmstrip Runway
  static renderHorizontalFilmstrip(projects, visual) {
    const cardsHtml = projects.map((p, i) => `
      <div class="filmstrip-slide filmstrip-card" style="flex: 0 0 clamp(320px, 45vw, 550px); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2.2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow);">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 1rem;">RUNWAY // 0${i+1}</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">${p.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">${p.desc}</p>
        </div>
        <div style="border-top: 1px solid var(--border); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${p.tech}</span>
          <div style="display: flex; gap: 8px;">
            ${p.live ? `<a href="${p.live}" target="_blank" style="padding: 6px 14px; background: var(--primary); color: var(--primary-on); font-size: 0.8rem; font-weight: 700; border-radius: var(--radius); text-decoration: none;">Live ↗</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" style="padding: 6px 12px; border: 1px solid var(--border); color: var(--text); font-size: 0.8rem; border-radius: var(--radius); text-decoration: none;">Code</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="story-presentation presentation-horizontal-filmstrip" style="overflow-x: auto; display: flex; gap: 1.75rem; padding-bottom: 1.5rem; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
        ${cardsHtml}
      </div>
    `;
  }

  // 4. Typographic Index Reveal
  static renderTypographicIndexReveal(projects, visual) {
    const listHtml = projects.map((p, i) => `
      <div class="typographic-index-item" style="border-bottom: 1px solid var(--border); padding: 2rem 0; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 1rem; transition: padding 0.2s ease;">
        <div style="display: flex; align-items: baseline; gap: 1.5rem;">
          <span style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--primary); font-weight: 700;">0${i+1}</span>
          <h3 style="font-family: var(--font-heading); font-size: clamp(1.6rem, 3vw, 2.5rem); font-weight: 700; color: var(--text); margin: 0;">${p.name}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">${p.tech}</span>
          ${p.live ? `<a href="${p.live}" target="_blank" style="padding: 6px 16px; border: 1px solid var(--border); color: var(--text); border-radius: var(--radius); text-decoration: none; font-size: 0.85rem; font-weight: 600;">Explore Project ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-typographic-index">${listHtml}</div>`;
  }

  // 5. Terminal Session Log
  static renderTerminalSessionLog(projects, visual) {
    const terminalRows = projects.map((p, i) => `
      <div class="terminal-log-entry" style="margin-bottom: 1.75rem; padding-bottom: 1.5rem; border-bottom: 1px dashed var(--border);">
        <div style="color: var(--primary); font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 0.4rem;">$ cat /projects/${p.name.toLowerCase().replace(/\\s+/g, '-')}.meta</div>
        <div style="color: var(--text); font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;"># ${p.name}</div>
        <div style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">${p.desc}</div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">[STACK] &gt;&gt; ${p.tech}</div>
        <div style="display: flex; gap: 12px; font-family: var(--font-mono); font-size: 0.85rem;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); text-decoration: none;">[RUN DEMO] ↗</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" style="color: var(--text-muted); text-decoration: none;">[VIEW SRC] ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    return `
      <div class="story-presentation presentation-terminal-log" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; font-family: var(--font-mono);">
        <div style="display: flex; gap: 8px; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
          <span style="width: 12px; height: 12px; border-radius: 50%; background: #22c55e; display: inline-block;"></span>
          <span style="margin-left: 12px; font-size: 0.8rem; color: var(--text-muted);">project_manifest.sh — bash — 80x24</span>
        </div>
        ${terminalRows}
      </div>
    `;
  }

  // 6. Magazine Editorial Chapters
  static renderMagazineEditorialChapters(projects, visual) {
    const chaptersHtml = projects.map((p, i) => `
      <article class="magazine-chapter" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; padding: 3rem 0; border-top: 1px solid var(--border);">
        <div class="chapter-lead">
          <span style="font-family: var(--font-heading); font-style: italic; font-size: 1.1rem; color: var(--primary); display: block; margin-bottom: 0.5rem;">Chapter 0${i+1}</span>
          <h3 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; line-height: 1.15; color: var(--text);">${p.name}</h3>
        </div>
        <div class="chapter-body">
          <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">${p.desc}</p>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em;">${p.tech}</div>
          <div style="display: flex; gap: 14px;">
            ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--text); font-weight: 700; text-decoration: underline;">Visit Live Platform ↗</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" style="color: var(--text-muted); text-decoration: underline;">Read Teardown</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');

    return `<div class="story-presentation presentation-magazine-chapters">${chaptersHtml}</div>`;
  }

  // 7. Timeline Milestone Stream
  static renderTimelineMilestones(projects, visual) {
    const nodesHtml = projects.map((p, i) => `
      <div class="timeline-project-node" style="position: relative; padding-left: 2.5rem; margin-bottom: 3rem; border-left: 2px solid var(--border);">
        <div style="position: absolute; left: -9px; top: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--bg); border: 3px solid var(--primary);"></div>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.4rem;">MILESTONE 0${i+1}</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem;">${p.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem; max-width: 650px;">${p.desc}</p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">${p.tech}</div>
        <div style="display: flex; gap: 12px;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="font-size: 0.85rem; font-weight: 700; color: var(--primary); text-decoration: none;">View Deployment ↗</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" style="font-size: 0.85rem; color: var(--text-muted); text-decoration: none;">Source Repository</a>` : ''}
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-timeline-stream" style="padding: 1rem 0;">${nodesHtml}</div>`;
  }

  // 8. Interactive Canvas Node System
  static renderInteractiveCanvasNodes(projects, visual) {
    const nodesHtml = projects.map((p, i) => `
      <div class="canvas-project-module" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; margin-bottom: 1.5rem; box-shadow: var(--shadow);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text);">${p.name}</h3>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; padding: 4px 8px; background: var(--surface-alt); border-radius: 4px; color: var(--primary);">NODE_${i+1}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.25rem;">${p.desc}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">${p.tech}</span>
          ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); font-weight: 700; font-size: 0.85rem; text-decoration: none;">Connect ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-canvas-nodes" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">${nodesHtml}</div>`;
  }

  // 9. Compact High-Density Metrics Table
  static renderCompactMetricsTable(projects, visual) {
    const rowsHtml = projects.map((p, i) => `
      <tr style="border-bottom: 1px solid var(--border);">
        <td style="padding: 1.25rem 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); font-weight: 700;">0${i+1}</td>
        <td style="padding: 1.25rem 1rem;">
          <div style="font-family: var(--font-heading); font-weight: 700; color: var(--text); font-size: 1.1rem;">${p.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${p.desc}</div>
        </td>
        <td style="padding: 1.25rem 1rem; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">${p.tech}</td>
        <td style="padding: 1.25rem 1rem; text-align: right; white-space: nowrap;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="padding: 6px 12px; background: var(--primary); color: var(--primary-on); font-size: 0.8rem; font-weight: 700; border-radius: var(--radius); text-decoration: none; margin-right: 6px;">Live ↗</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" style="padding: 6px 10px; border: 1px solid var(--border); color: var(--text); font-size: 0.8rem; border-radius: var(--radius); text-decoration: none;">Code</a>` : ''}
        </td>
      </tr>
    `).join('');

    return `
      <div class="story-presentation presentation-metrics-table" style="overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border); background: var(--surface-alt); font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">
              <th style="padding: 1rem;">ID</th>
              <th style="padding: 1rem;">Project & Overview</th>
              <th style="padding: 1rem;">Technical Stack</th>
              <th style="padding: 1rem; text-align: right;">Deployment</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }

  // 10. Spatial Orbit Dock
  static renderSpatialOrbitDock(projects, visual) {
    const docksHtml = projects.map((p, i) => `
      <div class="spatial-orbit-pod" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2.2rem; position: relative; overflow: hidden; backdrop-filter: blur(16px); box-shadow: var(--shadow);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--primary); letter-spacing: 0.1em;">ORBIT_SECTOR_${i+1}</span>
          ${p.stars ? `<span style="font-family: var(--font-mono); font-size: 0.8rem; color: #f59e0b;">${p.stars}</span>` : ''}
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">${p.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">${p.desc}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">${p.tech}</span>
          ${p.live ? `<a href="${p.live}" target="_blank" style="padding: 8px 16px; background: var(--primary); color: var(--primary-on); border-radius: var(--radius); font-size: 0.82rem; font-weight: 700; text-decoration: none;">Launch ↗</a>` : ''}
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-spatial-dock" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.75rem;">${docksHtml}</div>`;
  }

  // 11. Split-Screen Comparison
  static renderSplitScreenComparison(projects, visual) {
    const blocksHtml = projects.map((p, i) => `
      <div class="split-comparison-unit" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; padding: 2.5rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);">
        <div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">CASE // 0${i+1}</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 1rem;">${p.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${p.desc}</p>
        </div>
        <div style="background: var(--surface-alt); border-radius: var(--radius); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">CORE_SPECIFICATIONS</div>
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); line-height: 1.7; margin-bottom: 1rem;">${p.tech}</div>
          </div>
          <div style="display: flex; gap: 10px;">
            ${p.live ? `<a href="${p.live}" target="_blank" style="flex: 1; text-align: center; padding: 10px; background: var(--primary); color: var(--primary-on); border-radius: var(--radius); font-weight: 700; text-decoration: none; font-size: 0.85rem;">Live Build ↗</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" style="padding: 10px 16px; border: 1px solid var(--border); color: var(--text); border-radius: var(--radius); font-size: 0.85rem; text-decoration: none;">Repo</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `<div class="story-presentation presentation-split-comparison">${blocksHtml}</div>`;
  }

  // 12. Asymmetric Media Mosaic
  static renderAsymmetricMediaMosaic(projects, visual) {
    const mosaicHtml = projects.map((p, i) => {
      const isHeroProject = i === 0;
      return `
        <div class="mosaic-project-item ${isHeroProject ? 'hero-mosaic' : 'sub-mosaic'}" style="${isHeroProject ? 'grid-column: 1 / -1;' : ''} background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: ${isHeroProject ? '3rem' : '2rem'}; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">${isHeroProject ? '★ FEATURED ARTIFACT' : `0${i+1}`}</span>
              ${p.stars ? `<span style="font-family: var(--font-mono); font-size: 0.8rem; color: #f59e0b;">${p.stars}</span>` : ''}
            </div>
            <h3 style="font-family: var(--font-heading); font-size: ${isHeroProject ? 'clamp(1.8rem, 3.5vw, 2.5rem)' : '1.4rem'}; font-weight: 800; color: var(--text); margin-bottom: 1rem; line-height: 1.2;">${p.name}</h3>
            <p style="color: var(--text-muted); font-size: ${isHeroProject ? '1.05rem' : '0.92rem'}; line-height: 1.6; margin-bottom: 1.5rem; max-width: ${isHeroProject ? '750px' : '100%'};">${p.desc}</p>
          </div>
          <div style="border-top: 1px solid var(--border); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${p.tech}</span>
            <div style="display: flex; gap: 10px;">
              ${p.live ? `<a href="${p.live}" target="_blank" style="padding: 8px 18px; background: var(--primary); color: var(--primary-on); border-radius: var(--radius); font-size: 0.85rem; font-weight: 700; text-decoration: none;">Launch ↗</a>` : ''}
              ${p.github ? `<a href="${p.github}" target="_blank" style="padding: 8px 14px; border: 1px solid var(--border); color: var(--text); border-radius: var(--radius); font-size: 0.85rem; text-decoration: none;">Source</a>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `<div class="story-presentation presentation-asymmetric-mosaic" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">${mosaicHtml}</div>`;
  }

  // 13. Academic Research Paper Presentation
  static renderAcademicResearchPaper(projects, visual) {
    const papersHtml = projects.map((p, i) => `
      <div class="academic-paper-section" style="padding: 2.5rem 0; border-bottom: 2px solid var(--border); margin-bottom: 2.5rem;">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">[PUB-DOI: 10.1145/${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.2026]</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">${p.name}: A Methodological Framework</h3>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">KEYWORDS: ${p.tech}</div>
        <div style="background: var(--surface-alt); border-left: 3px solid var(--primary); padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.7; color: var(--text);">
          <strong style="color: var(--primary);">ABSTRACT:</strong> ${p.desc}
        </div>
        <div style="display: flex; gap: 14px; align-items: center;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--primary); font-weight: 700; text-decoration: underline;">[Download PDF Spec ↗]</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); text-decoration: underline;">[Replication Artifacts ↗]</a>` : ''}
        </div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-research-paper">${papersHtml}</div>`;
  }

  // 14. Repository Archaeology
  static renderRepositoryArchaeology(projects, visual) {
    const treesHtml = projects.map((p, i) => `
      <div class="repo-archaeology-tree" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; margin-bottom: 2rem; font-family: var(--font-mono);">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem; font-size: 0.85rem; color: var(--text-muted);">
          <span>COMMIT_TREE: 0x${Math.abs(p.name.split('').reduce((a,c)=>a+c.charCodeAt(0),0)).toString(16).padStart(6, '0')}</span>
          <span style="color: var(--primary);">EVOLUTION: VERIFIED</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem;">tree://${p.name}</h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">${p.desc}</p>
        <div style="background: var(--surface-alt); padding: 0.75rem 1rem; border-radius: var(--radius); font-size: 0.8rem; margin-bottom: 1rem; color: var(--text);">
          <div>$ git log -n 1 --oneline</div>
          <div style="color: var(--primary);">&gt; feat(core): implement ${p.tech} pipeline</div>
        </div>
        <div style="display: flex; gap: 12px;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); font-size: 0.85rem; text-decoration: underline;">git://checkout ↗</a>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" style="color: var(--text-muted); font-size: 0.85rem; text-decoration: underline;">view://diff</a>` : ''}
        </div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-repository-archaeology">${treesHtml}</div>`;
  }

  // 15. Before / After Comparison Matrix
  static renderBeforeAfterMatrix(projects, visual) {
    const matricesHtml = projects.map((p, i) => `
      <div class="before-after-matrix" style="border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 2.5rem; background: var(--surface);">
        <div style="padding: 1.5rem; border-bottom: 1px solid var(--border); background: var(--surface-alt); display: flex; justify-content: space-between; align-items: baseline;">
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text); margin: 0;">${p.name}</h3>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary);">${p.tech}</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0;">
          <div style="padding: 2rem; border-right: 1px solid var(--border); background: rgba(239, 68, 68, 0.03);">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #ef4444; font-weight: 700; margin-bottom: 0.5rem;">[PRE-INTERVENTION STATE]</div>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin: 0;">Legacy architecture constrained by performance bottlenecks and unscalable synchronization.</p>
          </div>
          <div style="padding: 2rem; background: rgba(16, 185, 129, 0.03);">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; font-weight: 700; margin-bottom: 0.5rem;">[DEPLOYED TRANSFORMATION]</div>
            <p style="font-size: 0.9rem; color: var(--text); line-height: 1.6; margin: 0;">${p.desc}</p>
          </div>
        </div>
        <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 12px;">
          ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; text-decoration: none;">Verify Outcome ↗</a>` : ''}
        </div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-before-after">${matricesHtml}</div>`;
  }

  // 16. Failure / Recovery Postmortem
  static renderFailureRecoveryPostmortem(projects, visual) {
    const postmortemsHtml = projects.map((p, i) => `
      <div class="postmortem-dossier" style="background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--primary); border-radius: var(--radius); padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); font-weight: 700;">INCIDENT_POSTMORTEM // 0${i+1}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 3px 8px; border-radius: 4px;">RESOLVED</span>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem;">${p.name}</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">${p.desc}</p>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text); border-top: 1px solid var(--border); padding-top: 1rem; display: flex; justify-content: space-between;">
          <span>TOOLING: ${p.tech}</span>
          ${p.live ? `<a href="${p.live}" target="_blank" style="color: var(--primary); text-decoration: underline;">Postmortem Resolution ↗</a>` : ''}
        </div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-failure-recovery">${postmortemsHtml}</div>`;
  }

  // 17. Build Journal & Dispatch
  static renderBuildJournal(projects, visual) {
    const journalsHtml = projects.map((p, i) => `
      <div class="build-journal-entry" style="padding: 2rem 0; border-bottom: 1px solid var(--border);">
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--primary); margin-bottom: 0.5rem;">DISPATCH_ENTRY • DAY 0${i+1}</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem;">${p.name}</h3>
        <p style="font-size: 0.98rem; color: var(--text); line-height: 1.7; margin-bottom: 1rem;">${p.desc}</p>
        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">INSTRUMENTATION: ${p.tech}</div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-build-journal">${journalsHtml}</div>`;
  }

  // 18. Artifact Archive & Provenance
  static renderArtifactArchive(projects, visual) {
    const archiveHtml = projects.map((p, i) => `
      <div class="archive-record-cell" style="background: var(--surface); border: 1px solid var(--border); padding: 1.75rem; margin-bottom: 1.5rem; display: grid; grid-template-columns: 80px 1fr; gap: 1.5rem; align-items: baseline;">
        <div style="font-family: var(--font-mono); font-size: 1.2rem; font-weight: 800; color: var(--primary);">#${String(i+1).padStart(3, '0')}</div>
        <div>
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem;">${p.name}</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">${p.desc}</p>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">SPEC: ${p.tech}</div>
        </div>
      </div>
    `).join('');
    return `<div class="story-presentation presentation-artifact-archive">${archiveHtml}</div>`;
  }

  // 19. Case Study Narrative
  static renderCaseStudyNarrative(projects, visual) {
    const caseStudiesHtml = projects.map((p, i) => `
      <section class="case-study-chapter" style="padding: 3rem 0; border-bottom: 1px solid var(--border); margin-bottom: 3rem;">
        <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--primary); text-transform: uppercase; margin-bottom: 0.75rem;">CASE STUDY NO. 0${i+1}</div>
        <h3 style="font-family: var(--font-heading); font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; color: var(--text); margin-bottom: 1.25rem;">${p.name}</h3>
        <p style="font-size: 1.1rem; color: var(--text); line-height: 1.75; max-width: 800px; margin-bottom: 1.75rem;">${p.desc}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.25rem;">
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">Stack: ${p.tech}</span>
          ${p.live ? `<a href="${p.live}" target="_blank" style="font-weight: 700; color: var(--primary); text-decoration: none;">Read Deep Dive ↗</a>` : ''}
        </div>
      </section>
    `).join('');
    return `<div class="story-presentation presentation-case-study">${caseStudiesHtml}</div>`;
  }

  static escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

const PROJECT_PRESENTATIONS = {
  'fullscreen-interactive-slide': { id: 'fullscreen-interactive-slide', name: 'Fullscreen Interactive Slide', domStructure: 'section.slide-stage', dataDensity: 'high-visual' },
  'code-architecture-dossier': { id: 'code-architecture-dossier', name: 'Code Architecture Dossier', domStructure: 'article.dossier-node', dataDensity: 'deep-code-metrics' },
  'horizontal-filmstrip': { id: 'horizontal-filmstrip', name: 'Horizontal Snapped Filmstrip', domStructure: 'div.filmstrip-track', dataDensity: 'curated-highlights' },
  'typographic-index-reveal': { id: 'typographic-index-reveal', name: 'Typographic Index Reveal', domStructure: 'ul.interactive-index-list', dataDensity: 'ultra-minimal' },
  'terminal-session-log': { id: 'terminal-session-log', name: 'Terminal Session Log', domStructure: 'div.terminal-console', dataDensity: 'cli-technical' },
  'magazine-editorial-chapter': { id: 'magazine-editorial-chapter', name: 'Magazine Editorial Chapters', domStructure: 'section.editorial-chapter', dataDensity: 'rich-narrative' },
  'timeline-milestone-card': { id: 'timeline-milestone-card', name: 'Chronological Timeline Milestones', domStructure: 'div.timeline-track', dataDensity: 'evolutionary-career' },
  'interactive-canvas-node': { id: 'interactive-canvas-node', name: 'Interactive Graph Nodes', domStructure: 'div.canvas-node-grid', dataDensity: 'relational-systems' },
  'compact-metrics-table': { id: 'compact-metrics-table', name: 'Compact Engineering Metrics Table', domStructure: 'table.metrics-spec', dataDensity: 'dense-tabular' },
  'spatial-orbit-dock': { id: 'spatial-orbit-dock', name: 'Spatial Orbiting Dock', domStructure: 'div.orbit-dock-stage', dataDensity: '3d-spatial' },
  'split-screen-comparison': { id: 'split-screen-comparison', name: 'Split-Screen Comparison', domStructure: 'div.split-comparison-grid', dataDensity: 'comparative-dual' },
  'asymmetric-media-mosaic': { id: 'asymmetric-media-mosaic', name: 'Asymmetric Bento Media Mosaic', domStructure: 'div.asymmetric-mosaic-grid', dataDensity: 'asymmetric-rich' }
};

module.exports = { ProjectStoryteller, PROJECT_PRESENTATIONS };

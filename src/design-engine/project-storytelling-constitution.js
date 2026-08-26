/**
 * Project Storytelling Constitution (Phase 29)
 * 18 genuinely distinct presentation systems that redefine how project evidence is articulated,
 * structured, ordered, and rendered across desktop, tablet, and mobile viewports.
 */

const PROJECT_STORYTELLING_SYSTEMS = {
  'case-study-narrative': {
    id: 'case-study-narrative',
    name: 'Case Study Narrative',
    cadence: 'Problem → Decision → Process → Result',
    domTopology: 'section.case-study-chapter',
    densityProfile: 'EDITORIAL',
    mobileTopology: 'stacked-narrative-flow',
    metadataPosition: 'top-inline-lede',
    ctaPlacement: 'bottom-right-anchor',
    evidenceType: 'deep-problem-solution'
  },
  'technical-dossier': {
    id: 'technical-dossier',
    name: 'Technical Dossier',
    cadence: 'Architecture → Stack → Constraints → Implementation → Evidence',
    domTopology: 'article.architecture-dossier-row',
    densityProfile: 'DENSE',
    mobileTopology: 'spec-sheet-accordion',
    metadataPosition: 'split-right-telemetry-box',
    ctaPlacement: 'spec-inline-links',
    evidenceType: 'architectural-specs'
  },
  'timeline': {
    id: 'timeline',
    name: 'Timeline Chronology',
    cadence: 'Milestone → Event → Decision → Outcome',
    domTopology: 'div.timeline-milestone-node',
    densityProfile: 'BALANCED',
    mobileTopology: 'vertical-step-rail',
    metadataPosition: 'timeline-left-node',
    ctaPlacement: 'card-footer-action',
    evidenceType: 'chronological-milestones'
  },
  'research-paper': {
    id: 'research-paper',
    name: 'Research Paper Layout',
    cadence: 'Abstract → Method → Findings → Discussion → Result',
    domTopology: 'div.academic-paper-section',
    densityProfile: 'DENSE',
    mobileTopology: 'single-column-abstract-scroll',
    metadataPosition: 'doi-header-bar',
    ctaPlacement: 'pdf-citation-badge',
    evidenceType: 'academic-findings'
  },
  'product-launch': {
    id: 'product-launch',
    name: 'Product Launch Showcase',
    cadence: 'Problem → Product → Features → Traction → Outcome',
    domTopology: 'article.viewport-project-slide',
    densityProfile: 'AIRY',
    mobileTopology: 'swipe-card-stage',
    metadataPosition: 'hero-floating-watermark',
    ctaPlacement: 'heroic-button-pair',
    evidenceType: 'product-traction'
  },
  'project-log': {
    id: 'project-log',
    name: 'Project Log & Terminal Session',
    cadence: 'Date → Action → Observation → Result',
    domTopology: 'div.terminal-session-log',
    densityProfile: 'COMPACT',
    mobileTopology: 'terminal-stream-feed',
    metadataPosition: 'command-prefix-log',
    ctaPlacement: 'inline-exec-command',
    evidenceType: 'execution-logs'
  },
  'repository-archaeology': {
    id: 'repository-archaeology',
    name: 'Repository Archaeology',
    cadence: 'Commit → File → Architecture → Decision → Evolution',
    domTopology: 'div.repo-archaeology-tree',
    densityProfile: 'DENSE',
    mobileTopology: 'commit-diff-stream',
    metadataPosition: 'commit-sha-badge',
    ctaPlacement: 'git-tree-link',
    evidenceType: 'git-provenance'
  },
  'visual-exhibition': {
    id: 'visual-exhibition',
    name: 'Visual Exhibition Track',
    cadence: 'Large artifact → caption → context → artifact',
    domTopology: 'div.filmstrip-card',
    densityProfile: 'AIRY',
    mobileTopology: 'horizontal-snap-carousel',
    metadataPosition: 'plinth-caption-bottom',
    ctaPlacement: 'gallery-inspect-link',
    evidenceType: 'visual-optics'
  },
  'split-technical-spec': {
    id: 'split-technical-spec',
    name: 'Split Technical Spec',
    cadence: 'Left: system info | Right: implementation evidence',
    domTopology: 'div.split-screen-pair',
    densityProfile: 'BALANCED',
    mobileTopology: 'two-pane-vertical-stack',
    metadataPosition: 'left-pane-fixed',
    ctaPlacement: 'right-pane-footer',
    evidenceType: 'system-evidence'
  },
  'before-after': {
    id: 'before-after',
    name: 'Before / After Comparison',
    cadence: 'Initial state → intervention → final state',
    domTopology: 'div.before-after-matrix',
    densityProfile: 'BALANCED',
    mobileTopology: 'slider-toggle-card',
    metadataPosition: 'state-diff-badges',
    ctaPlacement: 'case-summary-action',
    evidenceType: 'state-transformation'
  },
  'failure-recovery': {
    id: 'failure-recovery',
    name: 'Failure / Recovery Postmortem',
    cadence: 'Failure → diagnosis → solution → lesson',
    domTopology: 'div.postmortem-dossier',
    densityProfile: 'DENSE',
    mobileTopology: 'incident-card-stack',
    metadataPosition: 'incident-severity-header',
    ctaPlacement: 'postmortem-resolution-link',
    evidenceType: 'reliability-outcomes'
  },
  'metrics-observatory': {
    id: 'metrics-observatory',
    name: 'Metrics Observatory',
    cadence: 'Metric → chart → interpretation → result',
    domTopology: 'table.compact-metrics-table',
    densityProfile: 'COMPACT',
    mobileTopology: 'metric-card-row',
    metadataPosition: 'table-column-headers',
    ctaPlacement: 'table-row-action-link',
    evidenceType: 'quantitative-metrics'
  },
  'feature-atlas': {
    id: 'feature-atlas',
    name: 'Feature Atlas',
    cadence: 'Feature → implementation → evidence',
    domTopology: 'div.asymmetric-mosaic-grid',
    densityProfile: 'BALANCED',
    mobileTopology: 'feature-grid-stack',
    metadataPosition: 'cell-pill-tag',
    ctaPlacement: 'card-hover-arrow',
    evidenceType: 'feature-specifications'
  },
  'editorial-feature': {
    id: 'editorial-feature',
    name: 'Editorial Feature Article',
    cadence: 'Large thesis → supporting sections → project evidence',
    domTopology: 'article.magazine-chapter-block',
    densityProfile: 'EDITORIAL',
    mobileTopology: 'monograph-article-scroll',
    metadataPosition: 'chapter-drop-cap-header',
    ctaPlacement: 'italic-editorial-link',
    evidenceType: 'narrative-depth'
  },
  'build-journal': {
    id: 'build-journal',
    name: 'Build Journal & Dispatch',
    cadence: 'Idea → prototype → iteration → final build',
    domTopology: 'div.build-journal-entry',
    densityProfile: 'BALANCED',
    mobileTopology: 'dispatch-feed',
    metadataPosition: 'timestamp-entry-left',
    ctaPlacement: 'dispatch-wire-btn',
    evidenceType: 'evolutionary-process'
  },
  'architecture-map': {
    id: 'architecture-map',
    name: 'Architecture Map & DAG',
    cadence: 'System nodes → relationships → implementation details',
    domTopology: 'div.spatial-orbit-dock',
    densityProfile: 'AIRY',
    mobileTopology: 'node-list-navigator',
    metadataPosition: 'node-hud-overlay',
    ctaPlacement: 'waypoint-action-button',
    evidenceType: 'system-topologies'
  },
  'artifact-archive': {
    id: 'artifact-archive',
    name: 'Artifact Archive & Provenance',
    cadence: 'Artifact → metadata → provenance → commentary',
    domTopology: 'div.archive-record-cell',
    densityProfile: 'ARCHIVAL',
    mobileTopology: 'numbered-archive-card',
    metadataPosition: 'catalog-number-stamp',
    ctaPlacement: 'provenance-view-link',
    evidenceType: 'archival-records'
  },
  'minimal-project-index': {
    id: 'minimal-project-index',
    name: 'Minimal Project Index',
    cadence: 'Project name → one-line thesis → selected evidence',
    domTopology: 'div.index-reveal-item',
    densityProfile: 'POSTER',
    mobileTopology: 'touch-index-accordion',
    metadataPosition: 'index-number-prefix',
    ctaPlacement: 'minimal-arrow-symbol',
    evidenceType: 'typographic-distinction'
  },
  // Backward compatibility aliases
  'code-architecture-dossier': { id: 'code-architecture-dossier', name: 'Code Architecture Dossier', domTopology: 'article.architecture-dossier-row', cadence: 'Architecture → Stack → Constraints → Implementation → Evidence', densityProfile: 'DENSE', mobileTopology: 'spec-sheet-accordion', metadataPosition: 'split-right-telemetry-box', ctaPlacement: 'spec-inline-links' },
  'horizontal-filmstrip': { id: 'horizontal-filmstrip', name: 'Horizontal Snapped Filmstrip', domTopology: 'div.filmstrip-card', cadence: 'Large artifact → caption → context → artifact', densityProfile: 'AIRY', mobileTopology: 'horizontal-snap-carousel', metadataPosition: 'plinth-caption-bottom', ctaPlacement: 'gallery-inspect-link' },
  'typographic-index-reveal': { id: 'typographic-index-reveal', name: 'Typographic Index Reveal', domTopology: 'div.index-reveal-item', cadence: 'Project name → one-line thesis → selected evidence', densityProfile: 'POSTER', mobileTopology: 'touch-index-accordion', metadataPosition: 'index-number-prefix', ctaPlacement: 'minimal-arrow-symbol' },
  'terminal-session-log': { id: 'terminal-session-log', name: 'Terminal Session Log', domTopology: 'div.terminal-session-log', cadence: 'Date → Action → Observation → Result', densityProfile: 'COMPACT', mobileTopology: 'terminal-stream-feed', metadataPosition: 'command-prefix-log', ctaPlacement: 'inline-exec-command' },
  'magazine-editorial-chapter': { id: 'magazine-editorial-chapter', name: 'Magazine Editorial Chapters', domTopology: 'article.magazine-chapter-block', cadence: 'Large thesis → supporting sections → project evidence', densityProfile: 'EDITORIAL', mobileTopology: 'monograph-article-scroll', metadataPosition: 'chapter-drop-cap-header', ctaPlacement: 'italic-editorial-link' },
  'timeline-milestone-card': { id: 'timeline-milestone-card', name: 'Timeline Milestones', domTopology: 'div.timeline-milestone-node', cadence: 'Milestone → Event → Decision → Outcome', densityProfile: 'BALANCED', mobileTopology: 'vertical-step-rail', metadataPosition: 'timeline-left-node', ctaPlacement: 'card-footer-action' },
  'interactive-canvas-node': { id: 'interactive-canvas-node', name: 'Interactive Graph Nodes', domTopology: 'div.spatial-orbit-dock', cadence: 'System nodes → relationships → implementation details', densityProfile: 'AIRY', mobileTopology: 'node-list-navigator', metadataPosition: 'node-hud-overlay', ctaPlacement: 'waypoint-action-button' },
  'compact-metrics-table': { id: 'compact-metrics-table', name: 'Compact Metrics Table', domTopology: 'table.compact-metrics-table', cadence: 'Metric → chart → interpretation → result', densityProfile: 'COMPACT', mobileTopology: 'metric-card-row', metadataPosition: 'table-column-headers', ctaPlacement: 'table-row-action-link' },
  'split-screen-comparison': { id: 'split-screen-comparison', name: 'Split-Screen Comparison', domTopology: 'div.split-screen-pair', cadence: 'Left: system info | Right: implementation evidence', densityProfile: 'BALANCED', mobileTopology: 'two-pane-vertical-stack', metadataPosition: 'left-pane-fixed', ctaPlacement: 'right-pane-footer' },
  'asymmetric-media-mosaic': { id: 'asymmetric-media-mosaic', name: 'Asymmetric Bento Media Mosaic', domTopology: 'div.asymmetric-mosaic-grid', cadence: 'Feature → implementation → evidence', densityProfile: 'BALANCED', mobileTopology: 'feature-grid-stack', metadataPosition: 'cell-pill-tag', ctaPlacement: 'card-hover-arrow' },
  'fullscreen-interactive-slide': { id: 'fullscreen-interactive-slide', name: 'Fullscreen Interactive Slide', domTopology: 'article.viewport-project-slide', cadence: 'Problem → Product → Features → Traction → Outcome', densityProfile: 'AIRY', mobileTopology: 'swipe-card-stage', metadataPosition: 'hero-floating-watermark', ctaPlacement: 'heroic-button-pair' }
};

module.exports = { PROJECT_STORYTELLING_SYSTEMS };

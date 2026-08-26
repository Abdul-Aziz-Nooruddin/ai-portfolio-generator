# 🏛️ PHASE 29: PROJECT STORYTELLING ARCHITECTURE

## 1. The 18 Project Storytelling Systems

The Project Storytelling Constitution (`src/design-engine/project-storytelling-constitution.js`) establishes 18 distinct presentation formats:

| ID | Name | Story Cadence | DOM Topology | Density Profile | Mobile Topology |
|---|---|---|---|---|---|
| `01` | **Case Study Narrative** | Problem → Decision → Process → Result | `section.case-study-chapter` | `EDITORIAL` | `stacked-narrative-flow` |
| `02` | **Technical Dossier** | Architecture → Stack → Constraints → Implementation → Evidence | `article.architecture-dossier-row` | `DENSE` | `spec-sheet-accordion` |
| `03` | **Timeline Chronology** | Milestone → Event → Decision → Outcome | `div.timeline-milestone-node` | `BALANCED` | `vertical-step-rail` |
| `04` | **Research Paper** | Abstract → Method → Findings → Discussion → Result | `div.academic-paper-section` | `DENSE` | `single-column-abstract-scroll` |
| `05` | **Product Launch** | Problem → Product → Features → Traction → Outcome | `article.viewport-project-slide` | `AIRY` | `swipe-card-stage` |
| `06` | **Project Log** | Date → Action → Observation → Result | `div.terminal-session-log` | `COMPACT` | `terminal-stream-feed` |
| `07` | **Repository Archaeology** | Commit → File → Architecture → Decision → Evolution | `div.repo-archaeology-tree` | `DENSE` | `commit-diff-stream` |
| `08` | **Visual Exhibition** | Large artifact → caption → context → artifact | `div.filmstrip-card` | `AIRY` | `horizontal-snap-carousel` |
| `09` | **Split Technical Spec** | Left: system info \| Right: implementation evidence | `div.split-screen-pair` | `BALANCED` | `two-pane-vertical-stack` |
| `10` | **Before / After** | Initial state → intervention → final state | `div.before-after-matrix` | `BALANCED` | `slider-toggle-card` |
| `11` | **Failure / Recovery** | Failure → diagnosis → solution → lesson | `div.postmortem-dossier` | `DENSE` | `incident-card-stack` |
| `12` | **Metrics Observatory** | Metric → chart → interpretation → result | `table.compact-metrics-table` | `COMPACT` | `metric-card-row` |
| `13` | **Feature Atlas** | Feature → implementation → evidence | `div.asymmetric-mosaic-grid` | `BALANCED` | `feature-grid-stack` |
| `14` | **Editorial Feature** | Large thesis → supporting sections → project evidence | `article.magazine-chapter-block` | `EDITORIAL` | `monograph-article-scroll` |
| `15` | **Build Journal** | Idea → prototype → iteration → final build | `div.build-journal-entry` | `BALANCED` | `dispatch-feed` |
| `16` | **Architecture Map** | System nodes → relationships → implementation details | `div.spatial-orbit-dock` | `AIRY` | `node-list-navigator` |
| `17` | **Artifact Archive** | Artifact → metadata → provenance → commentary | `div.archive-record-cell` | `ARCHIVAL` | `numbered-archive-card` |
| `18` | **Minimal Project Index** | Project name → one-line thesis → selected evidence | `div.index-reveal-item` | `POSTER` | `touch-index-accordion` |

---

## 2. Content Affinity & Selection Model

The selection engine (`ProjectStorytellingAffinityAgent`) allocates project formats using:
- **70% Content/Persona Affinity**: Derived from role keywords, code complexity, research papers, visual artifacts, or operational metrics.
- **30% Controlled Constitutional Exploration**: Cycles through the entire 18-system constitution with anti-repetition memory over recent generations.

---

## 3. Within-Portfolio Presentation Diversity Governor

`ProjectPresentationDiversityGovernor` differentiates presentation models within a single portfolio:
- **Project 01**: Anchored by the primary chosen strategy (e.g. Full Editorial Feature or Architecture Dossier).
- **Project 02**: Receives complementary comparative layout (e.g. Split Technical Spec or Metrics Table).
- **Project 03+**: Receives compact artifact layout (e.g. Minimal Index or Archive Record).

Result: Portfolios avoid monolithic "card, card, card" repetition while maintaining art-direction coherence.

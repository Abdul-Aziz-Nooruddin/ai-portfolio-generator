# PHASE 34 — COMPOSITION ARCHITECTURE

## 1. Architectural Philosophy
In Phase 34, portfolio website generation is no longer treated as "choosing a template and styling cards with color themes." Instead, it is governed by an authoritative **CompositionPlan** generated directly from user evidence, semantic signals, and creative intent.

```
USER EVIDENCE
  ↓
CONTENT MODEL & SIGNALS
  ↓
CREATIVE INTENT & DESIGN THESIS
  ↓
COMPOSITION PLAN (Authoritative Geometry)
  ↓
PAGE TOPOLOGY (15 Physical Models)
  ↓
NAVIGATION GRAMMAR (10 Structural Models)
  ↓
SECTION RHYTHM & OPENING SILHOUETTE
  ↓
PROJECT ARTIFACT PLAN (Heterogeneous Multi-Artifact Suite)
  ↓
TYPOGRAPHY, SURFACE & MOTION BEHAVIOR
  ↓
RESPONSIVE TRANSFORMATION
  ↓
RENDERED REALITY (HTML / CSS / JS)
```

---

## 2. The 15 Page Topologies
Instead of wrapping every page in a centered `max-width: 1280px; margin: 0 auto;` container, Phase 34 establishes 15 physical container geometries:

| Topology ID | Name | Physical Geometry | Mobile Transformation |
|---|---|---|---|
| `edge-to-edge-editorial` | Fluid Edge-to-Edge Field | `width: 100%; max-width: 100vw; padding: 0 5vw;` | Reading Monograph Stack |
| `narrow-reading-column` | Narrow Measure Monograph | `max-width: 860px; margin: 0 auto;` | Single Reading Stream |
| `asymmetric-split-canvas` | Asymmetric 40/60 Split Canvas | `grid-template-columns: minmax(320px, 38%) 1fr;` | Sequential Reading Planes |
| `vertical-identity-rail` | Sticky Identity Rail | `grid-template-columns: 280px 1fr;` | Collapsible Edge Drawer |
| `full-viewport-stage` | Full Viewport Stage | `min-height: 100vh; flex-direction: column;` | Focal Node Navigator |
| `offset-poster-canvas` | Asymmetric Right-Anchored Canvas | `max-width: 1440px; margin-left: auto;` | Ordered Evidence Sequence |
| `command-console-interface` | System Buffer Matrix | `max-width: 1180px; font-family: mono;` | Scrollable Command Stream |
| `archive-index-matrix` | Dense Tabular Matrix | `max-width: 1360px;` | Numbered Archive Index |
| `newspaper-column-grid` | 3-Column Broadsheet Grid | `max-width: 1380px;` | Priority Editorial Stack |
| `magazine-spread` | Curated 3-Column Spread | `max-width: 1400px;` | Single Column Flow |
| `data-observatory` | Quantitative Telemetry Matrix | `max-width: 1500px;` | Compact Telemetry Feed |
| `architectural-plate` | Blueprint Schematic | `max-width: 1240px;` | Schematic Inspection Flow |
| `timeline-field` | Chronological Spine | `max-width: 980px;` | Linear Milestone Rail |
| `image-led-gallery` | Exhibition Runway Track | `width: 100vw; overflow-x: hidden;` | Touch-Snapped Filmstrip |
| `floating-spatial-composition` | 3D Node Constellation | `width: 100%; min-height: 100vh;` | Depth Layered Stack |

---

## 3. The 10 Navigation Grammars
Navigation is no longer a generic top floating bar restyled in different colors. The DOM topology of navigation genuinely changes:

1. **Top Editorial Masthead** (`primitive-editorial-masthead`): Broad typographic header with volume/issue numbers and metadata.
2. **Vertical Identity Rail** (`primitive-nav-rail`): Sticky lateral navigational column with numbered waypoints.
3. **Bottom Chapter Scrubber** (`bottom-chapter-nav`): Floating pill navigation docked to viewport bottom center.
4. **Floating Coordinate Navigator** (`floating-coordinate-nav`): Spatial telemetry badge anchored to top-right viewport.
5. **Command Prompt Dock** (`command-prompt-nav`): CLI-interactive command prompt string.
6. **Side Dossier Index** (`side-dossier-index`): Vertical index borders embedded directly into identity sidebar.
7. **Exhibition Filmstrip Selector** (`gallery-selector`): Horizontal scroll track for gallery room navigation.
8. **Numbered Specimen Archive Index** (`numbered-archive-index`): Tabular index grid with bracketed specimen numbering.
9. **Contextual Section Waypoints** (`contextual-waypoints`): Sticky in-page anchor waypoints.
10. **Focused Minimal Anchor Dock** (`minimal-dock`): Flush right navigation links with zero background chrome.

---

## 4. Multi-Artifact Within-Portfolio Diversity
Each generated portfolio possesses a heterogeneous `projectArtifactPlan` allocating distinct artifact roles:
- **Primary Deep-Dive**: In-depth case study chapter or peer-reviewed research paper.
- **Secondary Evidence**: Failure postmortem, metrics observatory, or before-and-after matrix.
- **Technical Telemetry**: Interactive build journal or repository archaeology.
- **Compact Archive**: Specimen index record or minimal metadata reveal.

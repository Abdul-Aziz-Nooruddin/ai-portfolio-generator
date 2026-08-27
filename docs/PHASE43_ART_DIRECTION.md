# 🏛️ Phase 43 — Art Direction Constraint Systems

## 1. The 7 Worldviews of Art Direction

Rather than picking 17 independent random values, the generator selects from 7 coherent art direction constraint systems (`src/design-intelligence/art-direction-model.js`):

1. **`EDITORIAL_RESEARCH`**:
   - Focus: Peer-reviewed publications, academic theses, citation metrics.
   - Compatible Topologies: `narrow-reading-column`, `edge-to-edge-editorial`, `newspaper-column-grid`.
   - Typography: `serif-editorial`, `mixed-editorial`, `humanist`.
   - Surfaces: `paper`, `editorial-prose`, `flat`.
   - Reading Measure: `680px`.
2. **`TECHNICAL_OBSERVATORY`**:
   - Focus: Distributed systems, kernel architecture, live telemetry.
   - Compatible Topologies: `asymmetric-split-canvas`, `command-console-interface`, `vertical-identity-rail`.
   - Typography: `mono-technical`, `grotesk`.
   - Surfaces: `terminal`, `blueprint-table`, `panel`.
3. **`DIGITAL_WORKSHOP`**:
   - Focus: Engineering craft, toolchain visibility, build journals.
   - Compatible Topologies: `edge-to-edge-editorial`, `offset-poster-canvas`, `magazine-spread`.
4. **`OPEN_SOURCE_ARCHIVE`**:
   - Focus: Public repository ledger, commit activity, contribution logs.
   - Compatible Topologies: `vertical-identity-rail`, `archive-index-matrix`, `timeline-field`.
5. **`PRODUCT_STUDIO`**:
   - Focus: Production software, user outcomes, live demos, and business metrics.
   - Compatible Topologies: `edge-to-edge-editorial`, `asymmetric-split-canvas`.
6. **`VISUAL_EXHIBITION`**:
   - Focus: 3D shaders, WebGL, media viewports, creative coding.
   - Compatible Topologies: `full-viewport-stage`, `image-led-gallery`.
7. **`PERSONAL_MANIFESTO`**:
   - Focus: Concise developer identity, direct statements, zero empty padding.
   - Compatible Topologies: `narrow-reading-column`.

---

## 2. Invariant: Art Direction is a Constraint System, Not a Fixed Template
The same art direction (e.g. `EDITORIAL_RESEARCH`) generates multiple distinct visual solutions (monograph column, newspaper broadsheet, or split dossier) across successive runs, all adhering to the same high-level worldview.

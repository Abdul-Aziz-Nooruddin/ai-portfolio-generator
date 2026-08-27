# 🏛️ Phase 42 — Information Density & Cognitive Load Balancing

## 1. Density Profiles

The `InformationDensityModel` (`src/design-intelligence/information-density-model.js`) balances cognitive load against physical viewport capacity:

| Profile Mode | Data Points | Max Container | Reading Measure | Section Gap | Description |
|---|:---:|:---:|:---:|:---:|---|
| **`SPARSE_RESTRAINED`** | $\le 8$ | `860px` | `680px` | `4rem` | High-focus monograph measure, zero artificial empty space |
| **`BALANCED`** | $9 - 23$ | `1200px` | `720px` | `5rem` | Comfortable editorial and bento layouts with clear section rhythm |
| **`RICH_COMPREHENSIVE`** | $\ge 24$ | `1440px` | `840px` | `6.5rem` | Multi-zone split canvases, telemetry tables, and dedicated publications |

---

## 2. Anti-Underdesign & Anti-Overdesign Rules
- **Anti-Underdesign**: When a developer has sparse evidence (e.g. 2 projects), the layout uses narrow reading columns and focused typography so the page feels polished, restrained, and intentional.
- **Anti-Overdesign**: When a developer has massive evidence, the layout uses tabular specs, sidebar rails, and clear section breaks so it never turns into an unreadable wall of text.

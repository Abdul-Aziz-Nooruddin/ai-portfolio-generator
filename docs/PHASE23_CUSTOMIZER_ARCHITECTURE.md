# Phase 23 Architecture: Real User Interactive Customizer & Design Coherence System

## 1. Executive Summary

Phase 23 establishes the **Canonical Portfolio State Architecture and Design Coherence Customizer**.

The customizer empowers users to modify section ordering, hide/restore optional sections, toggle themes, and refine design tokens while strictly preventing arbitrary, clashing, or broken transformations that would compromise Design DNA.

---

## 2. Core Architecture Pipeline

```
USER INTERACTION (Reorder / Hide / Theme / Token)
              ↓
   Canonical PortfolioState (Snapshot in History Stack)
              ↓
   Dynamic Token & Visibility Override Generator (< 5ms)
              ↓
   CustomizationQualityGate (BrowserVisualQualityAgent + Coherence Rules)
              ↓
  [PASS] → Apply to Live Preview
  [FAIL] → Reject with Actionable Explanation & Revert
```

---

## 3. Key Components

### A. Canonical Portfolio State (`src/customizer/portfolio-state.js`)
- **State Representation**:
  - `designBlueprint`: IA model, layout grammar, visual universe, storytelling strategy, and section order.
  - `sections`: Map of section IDs to metadata and HTML blocks.
  - `sectionOrder`: User-adjusted sequence of visible and movable sections.
  - `hiddenSections`: Set of deactivated optional sections.
  - `themeMode`: Semantic theme mode (`'light'`, `'dark'`, `'auto'`).
  - `designTokens`: Controlled tokens (`sectionSpacing`, `borderRadius`, `borderOpacity`, `typeScale`, `primaryColor`, `accentColor`).
  - `history` & `future`: Undo/Redo transaction snapshots (max depth: 30).
- **Instant Client/Server Re-rendering**: `< 5ms` per operation by applying dynamic `:root` CSS custom properties, layout flexbox order, and visibility rules without re-running AI/LLM ingestion.

### B. Section Registry (`src/customizer/section-registry.js`)
- Defines semantic section properties across all 10 IA models:
  - `required`: Non-removable core identity/work anchors (`split_identity`, `featured_artifacts`, `work_runway`, `exhibition_title`, `monograph_cover`, etc.).
  - `movable`: Allows user drag-and-drop or keyboard-accessible reordering.
  - `hideable`: Disallows hiding critical sections if portfolio integrity would break.

### C. Customization Quality Gate (`src/customizer/customization-quality-gate.js`)
- Re-evaluates transformed portfolios using `BrowserVisualQualityAgent`.
- Minimum quality threshold: **$85/100$**.
- Enforces coherence rules:
  - Disallows light mode on dark-exclusive universes (`cinematic-obsidian`).
  - Disallows pill border radiuses ($> 20$px) on computational monospace terminal designs.
  - Disallows removing so many sections that fewer than 2 visible sections remain.

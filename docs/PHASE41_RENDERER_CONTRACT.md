# 🏛️ Phase 41 — Renderer Contract & Materialization Architecture

## 1. Single Authority Contract

The renderer (`src/design-engine/html-renderer.js`) acts strictly as a **materialization engine** for the authoritative `CompositionPlan`. It does not invent layouts or overwrite design decisions with hardcoded defaults.

### Responsibility Separation:
- **`CompositionPlan`**: Owns all compositional decisions (`designGrammar`, `pageTopology`, `openingTopology`, `navigationGrammar`, `projectArtifactPlan`, `cssTokens`).
- **`HtmlRenderer`**: Translates data + composition plan into clean semantic HTML5 markup.
- **`SectionRendererRegistry`**: Employs grammar data attributes (`data-surface`, `data-rhythm`, `data-border`) to render bespoke surface treatments.
- **CSS Stylesheet**: Reads `:root` tokens and applies layout, grid, and typography transformations.

---

## 2. Prohibition of Legacy Workarounds
- No renderer may silently force a standard hero above a non-hero opening section (`work_runway`, `cli_prompt_hero`, `monograph_cover`).
- No renderer may wrap sections in hardcoded card styles when `surfaceLanguage` is `paper`, `terminal`, `panel`, or `flat`.
- Zero placeholder slop or mock data allowed into the rendered output.

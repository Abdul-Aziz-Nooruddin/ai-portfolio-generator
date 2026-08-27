# 🏛️ Phase 36: Deleted Legacy Systems & Excision Catalog

## 1. Inventory of Permanently Deleted & Refactored Systems

| Deleted / Refactored Component | File Location | Rationale & Previous Role | Replacement in Phase 36 |
|---|---|---|---|
| **`DesignAgentOrchestrator`** | `src/design-engine/design-agent-orchestrator.js` | **DELETED**. Early monolithic pipeline coordinator from Phase 1-20 that coupled skills to hardcoded generation workflows. | Replaced by `DesignGate` (`src/design-intelligence/design-gate.js`) and 15 specialized design agents. |
| **`HtmlRenderer` Template Branches** | `src/design-engine/html-renderer.js` | **DELETED**. 10 `if (iaModel.id === '...')` template branches with hardcoded section sequences and duplicate layouts. | Replaced by `SectionRendererRegistry` executing `compositionPlan.sectionGrammar.sequence` dynamically. |
| **Legacy Layout Grids Registry** | `src/design-engine/layout-grammar.js` | **EXCISED & CONSOLIDATED**. Duplicate CSS grid snippets and hardcoded layout classes. | Consolidated into `CompositionPlan.PAGE_TOPOLOGIES` with authoritative `rootClass`, `rootCss`, and `mobileCss`. |
| **`CandidateDesignPool` Template Selector** | `src/design-intelligence/candidate-design-pool.js` | **REWRITTEN**. Previously acted as a 1-of-N template selector generating fixed tuples. | Rewritten to emit semantic composition intent and topology characteristics for `CompositionPlanner`. |
| **`SiteGenerator` Legacy DNA Dependency** | `src/services/site-generator.js` | **CLEANED**. Exposing `compositionPlan` directly alongside telemetry. | `SiteGenerator` exposes `compositionPlan` as the primary contract. |

---

## 2. Zero Dead Code & Zero Orphaned Imports Guarantee

1. `design-agent-orchestrator.js` has been permanently deleted from the filesystem (`rm -f`).
2. Zero active JavaScript files contain `require('./design-agent-orchestrator')` or reference dead orchestrators.
3. Test suite `src/test-phase36-legacy-excision.js` automatically verifies via recursive AST/string scans that no source file imports deleted symbols.

# 🏛️ Phase 36: Forensic Audit of Legacy Design Systems & Symbols

## 1. Executive Summary & Audit Mandate

This forensic audit catalogs every legacy design system, template registry, obsolete layout ID, legacy design DNA/fingerprint field, and compatibility wrapper across the codebase prior to migration.

### Classification Categories:
- **A. CURRENT AUTHORITATIVE SYSTEM**: Genuine parts of the Phase 34/35 decoupled architecture (`CompositionPlan`, `CompositionPrimitives`, `SectionRendererRegistry`, etc.).
- **B. REQUIRED DATA/SEMANTIC FIELD**: Legitimate content or profile signals (`role`, `skills`, `projects`, `contentDensity`, etc.).
- **C. LEGACY DESIGN SYSTEM**: Obsolete design models, finite template registries, template switch statements.
- **D. LEGACY COMPATIBILITY CODE**: Aliases, wrappers, and fallbacks maintaining backward compatibility with legacy IDs.
- **E. DEAD CODE**: Unused orchestrators, orphaned helpers, obsolete files.
- **F. TEST-ONLY LEGACY COUPLING**: Test fixtures or assertions expecting legacy structures.
- **G. UNKNOWN — REQUIRES TRACE**: Ambiguous symbols analyzed during migration.

---

## 2. Complete Inventory of Discovered Legacy Symbols & Systems

| File Path | Symbol / Construct | Classification | Importers / Callers | Runtime Impact | Action / Replacement Path |
|---|---|---|---|---|---|
| `src/design-engine/design-agent-orchestrator.js` | `DesignAgentOrchestrator` | **E. DEAD CODE / C. LEGACY** | `src/design-engine/index.js`, `test-design-agent-pipeline.js` | None in production (superseded by `DesignGate`). | **DELETE FILE**. Migrate test to verify `DesignGate`. |
| `src/design-engine/layout-grammar.js` | `LAYOUT_GRAMMARS`, `LayoutGrammar` | **C. LEGACY DESIGN SYSTEM** | `src/design-engine/index.js`, `spatial-composition-agent.js`, tests | Secondary lookup for legacy layout IDs. | **REPLACE & EXCEDE**. Consolidate into `CompositionPlan.PAGE_TOPOLOGIES`. |
| `src/design-intelligence/candidate-design-pool.js` | `CandidateDesignPool` (template selector mode) | **C. LEGACY DESIGN SYSTEM** | `spatial-composition-agent.js`, `color-identity-agent.js` | Selects tuples of `(iaId, layoutId, universeId)`. | **REFACTOR**. Transform into design intent candidate pool for `CompositionPlanner`. |
| `src/design-engine/index.js` (lines 68–98) | `generatePortfolio` internal test fallback loop | **D. LEGACY COMPATIBILITY** | Internal test runs | Bypasses `DesignGate` with legacy selector loop. | **REWRITE**. Ensure all generation routes compile and execute `CompositionPlan`. |
| `src/services/site-generator.js` (line 54) | `designDNA: engineResult.designBlueprint` | **D. LEGACY COMPATIBILITY** | `test-github-generator.js` | Backward compatibility alias for legacy callers. | **REMOVE / CLEAN**. Expose `compositionPlan` and `telemetry`. |
| `src/design-intelligence/agents/spatial-composition-agent.js` | `LayoutGrammar.getGrammar` call | **D. LEGACY COMPATIBILITY** | `DesignGate` | Resolves legacy layout grammar object. | **REFACTOR**. Return `CompositionPlan` topology intent directly. |
| `src/design-engine/ia-composer.js` | `layoutId` field on `IA_MODELS` | **D. LEGACY COMPATIBILITY** | `spatial-composition-agent.js`, `ia-composer.js` | Coupled IA models to 1:1 legacy layout names. | **REFACTOR**. Separate structural IA sequencing from topology compilation. |
| `src/design-intelligence/legacy-vibe-detector.js` | `LegacyVibeDetector` | **A. CURRENT SYSTEM (Observer)** | `test-phase31-visual-truth.js` | Pure post-render forensic auditor (no rendering control). | **PRESERVE**. Maintains anti-slop quality validation. |
| `src/design-engine/visual-world.js` | `VisualWorld` | **A. CURRENT SYSTEM (Observer)** | `test-art-direction-blind.js`, `art-direction-agent.js` | Validates internal visual world coherence. | **PRESERVE**. Pure observer. |
| `src/design-engine/html-renderer.js` | `SectionRendererRegistry` | **A. CURRENT AUTHORITATIVE SYSTEM** | `DesignEngine`, `HtmlRenderer` | Executes `compositionPlan.sectionGrammar.sequence` dynamically. | **PRESERVE & ENFORCE**. |
| `src/design-engine/composition-plan.js` | `CompositionPlan`, `PAGE_TOPOLOGIES` | **A. CURRENT AUTHORITATIVE SYSTEM** | `DesignSynthesisAgent`, `HtmlRenderer`, `DesignEngine` | Single authoritative runtime composition contract. | **PRESERVE & STRENGTHEN**. |
| `src/design-engine/composition-primitives.js` | `CompositionPrimitives` | **A. CURRENT AUTHORITATIVE SYSTEM** | `HtmlRenderer` | Modular DOM rendering primitives. | **PRESERVE & EXPAND**. |

---

## 3. Rendering Authority Verification Invariant

```mermaid
graph TD
    UI[Raw User Data & Context] --> CA[Content Analysis Agent]
    CA --> IA[IA & Macro Intent Selection]
    IA --> CP[CompositionPlanner Compiler]
    CP --> ICP[Immutable CompositionPlan Contract]
    ICP --> SEC[SectionRendererRegistry]
    ICP --> TOP[PAGE_TOPOLOGIES (rootCss & mobileCss)]
    ICP --> NAV[NAVIGATION_GRAMMARS]
    SEC --> DOM[Rendered Single-Page Document]
    TOP --> DOM
    NAV --> DOM
```

**Architectural Rule**: No legacy template ID, universe ID, palette ID, or layout switch may bypass `CompositionPlan` or directly dictate DOM geometry.

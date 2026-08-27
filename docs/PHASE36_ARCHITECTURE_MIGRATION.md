# 🏛️ Phase 36: Architecture Migration & Runtime Authority

## 1. Executive Summary

Phase 36 establishes a single, unified, decoupled pipeline for portfolio generation. All legacy template branching, monolithic layout selectors, and obsolete orchestrators have been completely excised from the repository.

```mermaid
flowchart TD
    UI[1. User Intake & Profile Normalization] --> DI[2. Design Intelligence & Agent Ecosystem]
    DI --> INT[3. Design Intent & IA Selection]
    INT --> CP[4. CompositionPlanner Compiler]
    CP --> ICP[5. Immutable CompositionPlan Contract]
    ICP --> PRIM[6. Composition Primitives & SectionRendererRegistry]
    PRIM --> HR[7. HtmlRenderer (Pure Execution)]
    HR --> DOM[8. Rendered Single-Page Portfolio]
    DOM --> OBS[9. Forensic Observers & Quality Gates]
```

---

## 2. Before vs After Architecture Comparison

| Architectural Aspect | Pre-Phase 36 (Legacy Architecture) | Post-Phase 36 (Authoritative CompositionPlan) |
|---|---|---|
| **Rendering Authority** | Scattered across `IA_MODELS[id]`, hardcoded template switches, and `LAYOUT_GRAMMARS`. | **`CompositionPlan`**: Single authoritative runtime contract containing `pageTopology`, `sectionGrammar`, `navigationGrammar`, and `projectArtifactPlan`. |
| **Renderer Implementation** | 10 `if (iaModel.id === '...')` template branches with hardcoded section orderings. | **`SectionRendererRegistry`**: Traverses `compositionPlan.sectionGrammar.sequence` dynamically with zero IA branching. |
| **Layout Geometries** | Disconnected CSS snippet strings in `layout-grammar.js`. | **`PAGE_TOPOLOGIES`**: Authoritative root classes, container grid styles, and mobile responsive CSS rules in `CompositionPlan`. |
| **Candidate Design Selection** | `CandidateDesignPool` acting as a 1-of-N template selector. | **`CandidateDesignPool`**: Generates and scores semantic design intent and composition characteristics. |
| **Static Guarding** | Ad-hoc post-generation checks. | **`CompositionAuthorityGate`**: Fails closed if any site is rendered without a valid `CompositionPlan` or attempts legacy bypass. |
| **Orchestration Model** | Redundant monolithic `DesignAgentOrchestrator`. | **`DesignGate` + `DesignSynthesisAgent`**: 15 specialized design agents feeding into `CompositionPlan`. |

---

## 3. Production Rendering Pipeline Verification

In production, exactly ONE execution path exists:
1. `SiteGenerator.generateSite(conversation, rawUserData)` normalizes user inputs.
2. `DesignGate.generateDesignBrief(contentProfile)` coordinates intelligence agents.
3. `DesignSynthesisAgent` compiles `CompositionPlan.buildPlan`.
4. `DesignEngine.generatePortfolio(contentProfile, designBrief)` passes `brief.compositionPlan` to `HtmlRenderer.render`.
5. `HtmlRenderer.render` executes `SectionRendererRegistry` in dynamic sequence order.
6. `CompositionAuthorityGate.audit` validates runtime composition authority.

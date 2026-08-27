# 🏛️ Phase 37: Forensic Repository Audit & Structural Reality Verification

## 1. Executive Summary

This forensic audit investigates whether the AI Portfolio Studio's generative pipeline produces genuinely diverse, authentic, and high-craft portfolios tailored to real user evidence, or whether residual template patterns create perceptual convergence across generated sites.

---

## 2. Forensic Findings & Architectural Inventory

| Finding ID | Description / Finding | File & Line Reference | Severity | Affects Rendering? | Affects UX? | Affects Diversity? | Recommended Action |
|---|---|---|---|---|---|---|---|
| **F-01** | **Implicit Layout Alias Fallback in CompositionPlan**: `CompositionPlan.buildPlan` contains a fallback dictionary mapping legacy IDs to page topologies if requested. | `src/design-engine/composition-plan.js:498-509` | Low | Yes | No | Neutral | Retain as semantic mapping input; strengthen primary evidence-driven candidate selection. |
| **F-02** | **Need for Multi-Dimensional Semantic Intent Engine**: Evidence signals (`technicalDepth`, `narrativeDepth`, `projectDepth`) in `ContentAnalyzer` should be expanded to include `researchEvidence`, `writingDepth`, `careerStage`, `dominantWorkType`, `imageAvailability`, and `repositoryDepth`. | `src/design-engine/content-analyzer.js:30-80` | Medium | Yes | Yes | High | Build `src/design-intelligence/composition-intent-engine.js` to derive 14 deep semantic dimensions. |
| **F-03** | **Within-Portfolio Project Presentation Heterogeneity**: Single-project portfolios currently default to single strategies. Multi-project portfolios must enforce heterogeneous storytelling forms across project indices (e.g. Project 1: deep-dive case study, Project 2: failure postmortem, Project 3: telemetry metrics wall). | `src/design-engine/project-storyteller.js:25-33` | Medium | Yes | Yes | High | Formalize `projectArtifactPlan` dynamic synthesis in `CompositionIntentEngine` and `CompositionPlan`. |
| **F-04** | **Perceptual Convergence Detection beyond Tokens**: Previous visual fingerprints relied on CSS class names and hashes. Need physical DOM geometry, bounding box distribution, content width, hero dimensions, and black-and-white structural distance metrics. | `src/design-intelligence/rendered-visual-fingerprint.js` | Medium | No | No | High | Implement `src/design-intelligence/perceptual-convergence-detector.js` with physical DOM & monochrome structural distance. |
| **F-05** | **Zero Hardcoded Template Branches in HtmlRenderer**: Verified that `HtmlRenderer.render` uses `SectionRendererRegistry.renderSection(key, context)` and iterates strictly over `compositionPlan.sectionGrammar.sequence`. | `src/design-engine/html-renderer.js:275-325` | Resolved (P35/P36) | Yes | Yes | High | Enforce via `CompositionAuthorityGate` and `Phase37RealWorldQualityGate`. |
| **F-06** | **Product UI Separation**: Verified that `web/index.html`, `web/style.css`, and `web/app.js` are self-contained and completely independent from generated portfolio styles. | `web/index.html:1-506`, `web/style.css` | Verified Clean | No | Yes | Neutral | Maintain strict isolation between app shell and generated portfolio canvas. |

---

## 3. Forensic Conclusion

The runtime rendering pipeline is decoupled and governed by `CompositionPlan`. To elevate real-world diversity from architectural decoupling to profound perceptual differentiation, Phase 37 must introduce:
1. `CompositionIntentEngine` deriving deep multi-dimensional developer evidence.
2. `PerceptualConvergenceDetector` computing structural geometric distance in monochrome.
3. Enhanced heterogeneous within-portfolio project artifact synthesis.
4. Comprehensive 20-persona evaluation corpus generating 200 distinct portfolios across desktop and mobile.

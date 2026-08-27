# 🏛️ Phase 36: Design DNA & Fingerprint Migration

## 1. Separation of Concerns: Observation vs Rendering Authority

A critical violation in legacy generative engines is using **Design DNA** or **Design Fingerprints** as runtime template controllers.

In Phase 36:
- **`CompositionPlan` is the Rendering Authority**: It specifies DOM structure, container grids, section sequences, and responsive CSS.
- **Fingerprints & Auditors are Observers**: They measure, audit, and score the rendered DOM *after* compilation without dictating template switches.

```
+-------------------------------------------------------------------------------+
|  CORRECT (Phase 36 Architecture):                                             |
|  CompositionPlan ──> HtmlRenderer ──> Rendered DOM ──> Fingerprint / Auditor  |
+-------------------------------------------------------------------------------+
|  INCORRECT (Legacy Architecture - DELETED):                                   |
|  Design DNA ──> Template ID ──> Hardcoded Switch ──> Rendered DOM             |
+-------------------------------------------------------------------------------+
```

---

## 2. Observer Architecture Inventory

1. **`RenderedVisualFingerprint` (`src/design-intelligence/rendered-visual-fingerprint.js`)**:
   - Parses final rendered DOM and CSS.
   - Extracts class-first topology signatures (`layout-*`), section sequence order MD5 hashes, mobile media query rules, and typography font stacks.
   - Computes pairwise geometric distances across generative site batches.

2. **`RenderedDesignFingerprint` (`src/design-intelligence/rendered-design-fingerprint.js`)**:
   - Analyzes DOM component density, navigation geometry, hero silhouette, and project artifact structures.

3. **`LegacyVibeDetector` (`src/design-intelligence/legacy-vibe-detector.js`)**:
   - Audits rendered HTML/CSS for anti-patterns (forced circular avatars in non-avatar themes, generic 3-column card grids without storytelling grammar, unmotivated purple AI gradients).

4. **`BrowserVisualAuditor` (`src/design-intelligence/browser-visual-auditor.js`)**:
   - Validates viewport rendering across 1440px, 1024px, 768px, and 390px geometries.

---

## 3. Forensic Guarantee

No fingerprinting, auditing, or DNA module in the codebase possesses rendering control. All rendering control is strictly governed by `CompositionPlan`.

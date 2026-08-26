# 🏛️ Phase 32: Forensic Product Audit & Old-Vibe Root Cause Analysis

## Executive Summary

This forensic audit investigates why earlier iterations of the portfolio generator, despite possessing deep visual diversity engines (10 IA models, 10 Visual Universes, 18 Storytelling Models), could still feel like an engineered AI developer tool or a generic AI SaaS product rather than a polished, trustworthy public product.

---

## 1. Separation of Concerns: Product UI vs Generated Portfolios

| System | Visual Responsibility | Aesthetic Imperative | Common Anti-Pattern to Avoid |
| :--- | :--- | :--- | :--- |
| **Product UI** (Generator) | The consumer/prosumer web application interface where users input data, customize, preview, and export. | Calm, editorial, tactile, typography-led, low-chrome, intentional whitespace, warm paper-white surfaces (`#FDFBF7`), ink typography. | Neon gradients, glassmorphism, purple AI glows, giant marketing buzzwords ("22 dimensions"), complex engineering dashboards. |
| **Generated Portfolio** | The user's output single-page website synthesized by Design Intelligence. | Governed strictly by Art Direction, Visual Worlds, Macro Composition, and Storytelling Constitutions (e.g. Swiss, Brutalist, Terminal, Editorial, Museum, Spatial). | Leaking generator product styles into the user's generated site, or forcing all sites into identical 1200px centered card grids. |

---

## 2. Identified Root Causes of "Old Vibe" in Previous UI

### A. Jargon Overload vs User Value
- **Problem**: UI previously exposed internal subsystem names (`Art Direction Engine`, `Macro Composition Matrix`, `Density Profiles`, `Component Grammar`).
- **Correction**: Translate all UI copy into human actions:
  - *"How do you want to build your portfolio?"*
  - *Option A: Start with GitHub*
  - *Option B: Upload your CV / Resume (PDF)*
  - *Option C: Add Visual Material (Images)*
  - *Option D: Answer 6 Quick Questions*
  - *Option E: Combine Sources*

### B. Confusing Mutually-Exclusive Tabs vs Combined Sources
- **Problem**: Earlier interfaces treated GitHub and Resume as isolated, siloed paths.
- **Correction**: Unified profile intake with explicit data provenance (`VERIFIED`, `INFERRED`, `USER-PROVIDED`). A user can connect GitHub, attach a PDF resume for missing employment history, upload project screenshots, and answer guided questions.

### C. Developer-Tool Dashboard Clutter
- **Problem**: Preview screen was wrapped in heavy sidebar panels with telemetry charts, debug IDs, and internal stats.
- **Correction**: Fullscreen canvas where the generated portfolio dominates the viewport. The top bar contains only necessary controls (`[Back]`, `[Portfolio Name]`, `[Device Switcher]`, `[Customize]`, `[Regenerate]`, `[Export Static ZIP]`).

### D. Generic Customizer Controls
- **Problem**: Customizer exposed raw token names (`--space-section`, `--border-opacity`).
- **Correction**: Human-friendly options:
  - Spacing: *Compact / Balanced / Spacious*
  - Corners: *Sharp / Soft / Rounded*
  - Typography: *Quiet / Editorial / Bold*
  - Motion: *Still / Subtle / Expressive*
  - Layout: *Focused / Balanced / Expansive*

---

## 3. Provenance & Integrity Rules

Every fact ingested by the system must track its origin:
1. **`VERIFIED`**: Directly extracted from authoritative sources (e.g. public GitHub repositories, commit timestamps, live URLs).
2. **`USER-PROVIDED`**: Explicitly typed by the user in the guided questionnaire or customizer.
3. **`INFERRED`**: Guessed by the AI/synthesis engine based on skill clustering. Inferred data must NEVER be presented as verified historical fact.
4. **Conflict Resolution**: User-provided inputs always override inferred conjectures.

---

## 4. Remediation Plan

1. Create `ErrorRecoveryService` mapping all errors to structured `{ whatHappened, why, whatYouCanDo }`.
2. Upgrade `UnifiedProfileNormalizer` and `UploadValidator` for provenance tracking, multi-image intake, and strict magic-byte security.
3. Rebuild `web/index.html`, `web/style.css`, and `web/app.js` with the calm, editorial Product Design Constitution.
4. Implement `PublicProductQualityGate` with fail-closed security and accessibility invariants.
5. Create comprehensive 28-scenario test suite in `src/test-phase32-public-product.js`.

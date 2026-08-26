# 🏛️ Phase 31: Full Repository Forensic Runtime Audit

> **AUDIT PRINCIPLE:**  
> Never assume previous phase reports or passing tests prove true runtime independence. Trace the actual execution pipeline from raw input to byte-level rendered HTML and CSS.

---

## 1. Executive Answers to the 13 Forensic Questions

### 1. Which function actually generates the final portfolio?
- **Entry point**: `SiteGenerator.generateSite(conversation, userData, designBrief)` in `src/services/site-generator.js`.
- **Gate execution**: Calls `DesignGate.generateDesignBrief(data, options)` which runs the agent pipeline and candidate pool.
- **Engine execution**: Passes validated `DesignBrief` to `DesignEngine.generatePortfolio(data, brief)` in `src/design-engine/index.js`.
- **Renderer execution**: `HtmlRenderer.render(contentProfile, iaModel, layoutGrammar, visualUniverse, projectStrategy, motion)`.

### 2. Which function actually chooses the IA?
- In `DesignGate`: `InformationArchitectureAgent.evaluate()` and `CandidateDesignPool.generatePool()`.
- **Legacy Smell**: In `src/design-engine/design-agent-orchestrator.js` and `src/design-engine/index.js` (fallback mode), `IAComposer.selectModel()` was still invoked with legacy hard-coded defaults.

### 3. Which function actually chooses visual identity?
- In `DesignGate`: `ColorIdentityAgent`, `TypographyAgent`, and `ArtDirectionAgent` produce color tokens and typography pairings into `DesignBrief`.
- **Legacy Smell**: `HtmlRenderer` generated base CSS from `VISUAL_UNIVERSES[universeId]` and only partially overrode custom tokens.

### 4. Which function actually chooses macro composition?
- `SpatialCompositionAgent` and `CandidateDesignPool` determine the `macroComposition` and `layoutGrammar`.

### 5. Which function actually chooses project storytelling?
- `ProjectStorytellingAffinityAgent` and `ProjectPresentationDiversityGovernor`.
- **Legacy Smell**: If `strategyId` was undefined or had slight naming mismatches, `DesignEngine` fell back silently to `iaModel.defaultStorytelling` instead of consulting the `ProjectStorytellingConstitution`.

### 6. Which function actually produces final HTML?
- `HtmlRenderer.render()` in `src/design-engine/html-renderer.js` and `ProjectStoryteller.render()` in `src/design-engine/project-storyteller.js`.

### 7. Which function actually produces final CSS?
- `HtmlRenderer.generateCss()` in `src/design-engine/html-renderer.js`.

### 8. Which legacy systems remain active?
- `IAComposer.selectModel()` / `VisualGrammar.selectUniverse()` in orchestrators.
- Hardcoded card templates in fallback paths.
- Hardcoded circular avatars and pill tags.
- Disconnected WhatsApp question sets (`src/questions/branch-*.js`) that did not share the normalized profile schema.

### 9. Which Phase 27/28/29 systems are merely metadata rather than actual rendering authorities?
- `densityProfile`, `compositionGravity`, `contentDominance`, and `componentGrammar` were generated into the `DesignBrief` but were ignored or underutilized in `HtmlRenderer.render()`, which used a static `if (iaModel.id === ...)` branch structure.

### 10. Where does template convergence still happen?
- **Skills rendering**: Rendered as identical rounded pill badges `<span class="skill-tag">` across all 10 IA models and visual universes.
- **Experience rendering**: Rendered as identical stacked `<div class="experience-entry">` blocks with top borders.
- **Header & Navigation**: Generic top nav assumption across non-dossier layouts.
- **Container constraints**: Universal centered container widths.

### 11. Which hard-coded CSS/HTML structures force visual similarity?
- Static CSS classes `.skill-tag`, `.experience-entry`, `.section-heading` with identical flexbox and border-radius rules.
- Lack of grammar-driven component rendering for Editorial, Terminal, Architectural, Museum, Newspaper, and Field Notes worlds.

### 12. Which UI components of the generator itself feel outdated?
- `web/index.html` lacked multi-input support (PDF resume upload with page/size validation, profile photo upload with MIME/magic-byte checks, adaptive progressive questionnaire).
- Error messages were previously basic toasts rather than unified interactive recovery flows.

### 13. Which existing Phase 30 claims are not actually true in runtime behavior?
- "100% Component Grammar independence": While project storytelling had 18 DOM grammars, secondary sections (skills, experience, education, photo presentation) still shared identical DOM primitives.
- "Photo intelligence": User photos were either forced into circular avatars or ignored by the macro layout.

---

## 2. Architectural Blueprint for Phase 31 Product Experience Rebuild

```
                                    USER INPUT
        [GitHub URL / @User]  [PDF Resume Upload]  [Profile Photo]  [Adaptive Questionnaire]
                                        │
                                        ▼
                           UNIFIED PROFILE NORMALIZER
                        (Source Confidence & Field Tracking)
                                        │
                                        ▼
                              DESIGN CONSTITUTION
                (Single Authoritative DesignDecision Object)
    ┌───────────────────────────────────┴───────────────────────────────────┐
    ▼                                   ▼                                   ▼
Art Direction & Visual World     Macro IA & Layout Grammar          Component Grammar & Storytelling
(Typography, Palettes, CSS)     (Topology, Geometry, Density)       (Editorial, Terminal, Museum, etc.)
    └───────────────────────────────────┬───────────────────────────────────┘
                                        │
                                        ▼
                        COMPOSITION-DRIVEN HTML RENDERER
                     (Faithful Grammar-Aware Primitives)
                                        │
                                        ▼
                             LEGACY VIBE DETECTOR
                     (Byte-Level Final Rendered HTML Gate)
                                        │
                                        ▼
                          FINAL VERIFIED PORTFOLIO
```

---

## 3. Implementation Plan

1. **`src/design-engine/component-grammar.js`**: Create component grammar engine defining structural material expressions across all visual universes (Editorial, Terminal, Architectural, Museum, Newspaper, Field Notes, Spatial, Minimal, Brutalist).
2. **`src/design-engine/design-agent-orchestrator.js` & `src/design-engine/index.js`**: Establish single authoritative `DesignDecision` pipeline. Renderer consumes `DesignDecision` and executes its grammar faithfully without making independent aesthetic decisions.
3. **`src/design-engine/html-renderer.js`**: Refactor into composition-driven primitives (`renderIdentity`, `renderNavigation`, `renderOpening`, `renderSection`, `renderProjectArtifact`, `renderExperience`, `renderSkills`, `renderEducation`, `renderContact`, `renderFooter`, `renderBackground`) parameterized by `ComponentGrammar` and `DesignDecision`.
4. **`src/services/unified-profile-normalizer.js`**: Unified profile ingestion model supporting GitHub, PDF Resume, Profile Photo, and Adaptive Questionnaire with per-field confidence scoring.
5. **`src/services/upload-validator.js`**: Strict magic-byte, MIME, page count, and dimension validation for PDF (max 10MB/5 pages), Photo (max 5MB), and supporting images (max 3 x 5MB).
6. **`src/services/adaptive-questionnaire.js`**: Progressive questionnaire asking only missing/unknown/ambiguous high-value questions.
7. **`src/design-intelligence/legacy-vibe-detector.js`**: Detector running on final rendered HTML/CSS calculating legacy vibe violations (generic cards, universal top navbar, repeated pills, circular avatars).
8. **`web/index.html`, `web/style.css`, `web/app.js`**: Complete redesign into a premium creative portfolio studio with 4 input tabs, live progress stages, live preview switcher, and intuitive customizer.
9. **`src/test-phase31-visual-truth.js`**: 100-portfolio benchmark across 10+ personas validating final rendered HTML truth (violations $\le 5\%$).

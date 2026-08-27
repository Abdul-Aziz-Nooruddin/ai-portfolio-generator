# 🏛️ Phase 41 — Perceptual Design Grammar

## 1. The 17 Independent Generative Dimensions

The Perceptual Design Grammar (`src/design-intelligence/perceptual-design-grammar.js`) replaces rigid template selection with a 17-dimensional generative decision space:

1. **`pageComposition`**: `centered`, `asymmetric`, `split`, `editorial`, `rail-based`, `canvas`, `dossier`, `stacked`, `modular`, `spatial`
2. **`gridGrammar`**: `single-column`, `asymmetric-columns`, `editorial-columns`, `offset-grid`, `broken-grid`, `horizontal-runway`, `dense-matrix`, `freeform-spatial`
3. **`typographicGrammar`**: `serif-editorial`, `grotesk`, `mono-technical`, `display-heavy`, `condensed`, `humanist`, `mixed-editorial`, `utilitarian`
4. **`typeScale`**: `restrained`, `dramatic`, `editorial`, `technical`, `compressed`, `oversized`
5. **`spacingRhythm`**: `compact`, `regular`, `generous`, `dramatic`, `asymmetric`
6. **`surfaceLanguage`**: `flat`, `framed`, `paper`, `panel`, `terminal`, `translucent`, `border-led`, `image-led`
7. **`borderLanguage`**: `none`, `hairline`, `heavy`, `sectional`, `underlines`, `rule-based-editorial`
8. **`shapeLanguage`**: `rectangular`, `rounded`, `pill`, `circular`, `irregular`, `sharp-technical`
9. **`informationDensity`**: `sparse`, `balanced`, `dense`, `dossier`
10. **`contentRhythm`**: `narrative`, `index`, `alternating`, `progressive-disclosure`, `evidence-first`, `timeline`, `gallery`, `dossier`
11. **`projectLanguage`**: `case-study`, `artifact`, `research-paper`, `terminal-log`, `magazine-spread`, `technical-dossier`, `visual-specimen`, `metrics-wall`, `build-journal`, `archive-entry`, `timeline-artifact`
12. **`navigationGrammar`**: `top-navigation`, `side-rail`, `floating-navigation`, `index-navigation`, `command-navigation`, `editorial-navigation`, `minimal-navigation`
13. **`heroGrammar`**: `masthead`, `split-identity`, `statement`, `project-first`, `monograph`, `terminal`, `index`, `spatial`
14. **`mediaGrammar`**: `image-dominant`, `image-secondary`, `no-image`, `diagram`, `code`, `metrics`, `timeline`, `texture`
15. **`motionGrammar`**: `restrained`, `editorial`, `kinetic`, `scroll-choreography`, `hover-driven`, `spatial`, `terminal-like`
16. **`mobileGrammar`**: `linear-collapse`, `preserved-rail`, `horizontal-story`, `sticky-index`, `accordion-dossier`, `editorial-reflow`, `terminal-stream`, `modular-stack`
17. **`interactionGrammar`**: `direct`, `exploratory`, `command-like`, `editorial`, `spatial`, `index-driven`

---

## 2. Multi-Candidate Generation & Scoring

Instead of selecting a single design path deterministically, `PerceptualDesignGrammar.generateCandidates()` generates 6–8 candidate vectors, scores them against:
1. **Evidence Fit** (adapts to technical depth, academic publications, or visual projects)
2. **Cross-Dimensional Coherence** (`validateCompatibility()`)
3. **Anti-Repetition Penalty** (penalizes repeated dimension choices from recent history)

The winning candidate is attached directly to the authoritative `CompositionPlan`.

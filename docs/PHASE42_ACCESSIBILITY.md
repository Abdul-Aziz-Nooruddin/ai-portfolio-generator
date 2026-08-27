# 🏛️ Phase 42 — Accessibility & Semantic Truth

## 1. Accessibility Invariants

- **Semantic Landmark HTML5 Elements**: Proper usage of `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **Heading Hierarchy**: Strict sequential progression (`h1` $\to$ `h2` $\to$ `h3`) without skipping levels.
- **Color Contrast**: All text elements adhere to WCAG 2.1 AA contrast ratios ($\ge 4.5:1$ for normal text, $\ge 3:1$ for large text).
- **Reduced Motion Support**: Complete `@media (prefers-reduced-motion: reduce)` block disables heavy animations and canvas effects.
- **Link & Button Semantics**: All interactive elements feature descriptive accessible labels and direct URL anchors.

# 🏛️ Phase 41 — Dynamic CSS Token Contract

## 1. Per-CompositionPlan Dynamic CSS Variables

Rather than static global styling, the `PerceptualDesignGrammar` generates 16 live CSS tokens compiled dynamically for each portfolio:

```css
:root {
  /* Dynamic Layout Geometry */
  --layout-max: 1280px;            /* 780px (sparse) | 920px (editorial) | 1440px (canvas) | 100vw (split) */
  --content-measure: 720px;        /* 640px (restrained) | 720px (balanced) | 840px (oversized) */
  --section-gap: 6rem;             /* 2.5rem (compact) | 4.5rem (regular) | 6rem (generous) | 8rem (dramatic) */
  --section-padding: clamp(3rem, 7vw, 8rem);
  
  /* Dynamic Grid System */
  --grid-columns: minmax(280px, 1fr) minmax(340px, 1.4fr); /* single-column | dense-matrix | asymmetric */
  --grid-gap: 3rem;
  
  /* Dynamic Typographic Rhythm */
  --heading-scale: clamp(2.8rem, 6.5vw, 4.8rem);
  --body-scale: 1.08rem;
  --line-height: 1.65;
  
  /* Dynamic Surface & Border Primitives */
  --border-width: 1px;             /* 0px (none) | 1px (hairline) | 3px (heavy) */
  --radius: 8px;                   /* 0px (technical) | 8px (standard) | 12px (rounded) | 9999px (pill) */
  --surface-density: balanced;     /* sparse | balanced | dense | dossier */
  
  /* Dynamic Navigation & Media */
  --nav-width: 100%;               /* 38% (split rail) | 100% (top bar) */
  --hero-height: auto;             /* 60vh (spatial) | auto (editorial) */
  --project-gap: 3.5rem;
  --media-ratio: 16/9;             /* 16/9 | 4/3 | 1/1 */
}
```

---

## 2. Invariant Token Realization
- Renderers MUST NOT use hardcoded pixel values for section margins or container widths.
- All section headers use `var(--heading-scale)` and `var(--section-gap)`.
- All containers respect `var(--layout-max)` and `var(--content-measure)`.

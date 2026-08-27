# 🏛️ Phase 44 — CSS Forensics & Token Contract Integrity

## 1. Physical Layout Token Contract

Physical layout dimensions are driven dynamically by live tokens rather than hardcoded global overrides:

- `--layout-max`: Scaled between `780px` (sparse monograph) and `1440px` (rich multi-zone canvas).
- `--content-measure`: Bounded between `600px` and `840px` for reading comfort.
- `--section-gap`: Bounded fluidly with `clamp(2.5rem, 5vw, 6rem)`.
- `--border-width` & `--radius`: Derived per art direction (e.g. `0px` sharp technical vs `8px` editorial).

---

## 2. Invariant: Elimination of Fixed Height Hazards
No project container, reading article, or identity rail uses fixed `height: [px]` or `overflow: hidden` as a band-aid. Content flows naturally with fluid clamp padding.

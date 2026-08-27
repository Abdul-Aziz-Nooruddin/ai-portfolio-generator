# 🏛️ Phase 42 — Spacing Quality & Spatial Rhythm

## 1. Spatial Rhythm Hierarchy

Spacing communicates semantic relationships rather than arbitrary gaps:

$$\text{Major Section Gap } (4\text{rem} - 6.5\text{rem}) > \text{Module Header Gap } (1.5\text{rem} - 2\text{rem}) > \text{Element Gap } (0.75\text{rem} - 1.25\text{rem})$$

- `--section-gap`: Controls macro-spacing between major chapters (`PROJECTS`, `EXPERIENCE`, `PUBLICATIONS`, `SKILLS`).
- `--grid-gap`: Controls micro-spacing between columns and cards.
- `--section-padding`: Bounded fluidly with `clamp(...)` to eliminate edge collisions on mobile.

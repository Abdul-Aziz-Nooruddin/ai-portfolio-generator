# 🏛️ Phase 42 — Content Importance Model

## 1. Multi-Tier Semantic Evidence Classification

The `ContentImportanceModel` (`src/design-intelligence/content-importance-model.js`) classifies all developer data into 5 semantic importance tiers:

1. **`CRITICAL`**: Primary developer identity, flagship engineering project, breakthrough research paper, verified production metrics.
2. **`IMPORTANT`**: Architecture diagrams, technical decisions, trade-offs, live deployment URLs, repository links, career responsibilities.
3. **`SUPPORTING`**: Tech stack breakdown, secondary project specimens, academic credentials, metrics telemetry details.
4. **`SECONDARY`**: Star counts, fork counts, dates/timestamps, minor coursework, industry certifications.
5. **`DECORATIVE`**: Ornamental badges, ambient grid lines, background canvas particles.

---

## 2. Invariant Rules
- A field's tier is not determined solely by its JSON type; it is scored on **evidence strength**, **measurable impact** (e.g. "450M TVL", "800ns p99"), and **technical depth**.
- `CRITICAL` and `IMPORTANT` fields receive primary visual weight, larger heading scales, and immediate viewport visibility.
- `SECONDARY` and `DECORATIVE` fields never compete with or distract from primary proof.

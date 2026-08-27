# 🏛️ Phase 42 — Project Presentation Quality & Depth Matching

## 1. Project Evidence Depth Levels

The `ProjectQualityModel` (`src/design-intelligence/project-quality-model.js`) analyzes the evidence available for each project item and assigns one of 6 authentic presentational forms:

1. **`TECHNICAL_DOSSIER`**: For projects with full architectural blueprints, verified benchmarks, and technical trade-off decisions (e.g. `technical-dossier`).
2. **`DEEP_CASE_STUDY`**: For complex applications with multi-tier architectures and narrative problems/solutions (e.g. `case-study-narrative`).
3. **`METRICS_TELEMETRY`**: For high-throughput infrastructure projects where quantitative KPIs define the achievement (e.g. `compact-metrics-table`).
4. **`RESEARCH_ARTIFACT`**: For published algorithms, conference papers, and theoretical proofs (e.g. `academic-research-paper`).
5. **`STANDARD`**: For production web applications with live links and repository provenance (e.g. `fullscreen-interactive-slide` / `asymmetric-media-mosaic`).
6. **`MICRO_ARTIFACT`**: For minimal utility scripts or compact tools (e.g. `typographic-index-reveal`).

---

## 2. Invariant Rules
- A minimal project with only a name and one-line description is never inflated into a fake multi-paragraph case study.
- A deep system architecture project is never compressed into a tiny decorative card.

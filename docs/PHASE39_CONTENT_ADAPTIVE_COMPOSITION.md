# 🏛️ Phase 39: Content-Adaptive Composition Architecture

## 1. Principle of Content Adaptation without Visual Convergence
Traditional generative templates fail when confronted with varying evidence density:
- If a user provides deep architecture notes, templates either truncate the text or dump it into unreadable walls of text.
- If a user has research papers, rigid designs break or hide the publications.

**Content-Adaptive Composition** solves this by separating **evidence preservation** from **visual presentation**. The `CompositionPlan` decides *where* and *in what visual form* evidence lives based on the aesthetic universe and information architecture, rather than dropping fields.

---

## 2. Multi-Form Presentation Mapping

### A. Project Architecture Adaptation
Depending on the active `VisualUniverse` and `InformationArchitectureGrammar`, project architecture is rendered in distinct styles:

| Visual Universe / IA | Architecture Presentation Form | HTML DOM Signature |
|---|---|---|
| **Terminal / Obsidian** | CLI Command & System Specification | `<div style="font-family: var(--font-mono)">[SYS_ARCH] >> ...</div>` |
| **Swiss Minimal / Editorial** | Architectural Spec Callout | `<div style="font-style: italic; border-left: 2px solid var(--primary)"><strong>System Architecture:</strong> ...</div>` |
| **Technical Lab / Dossier** | Technical Blueprint Spec Row | `<div class="spec-row"><strong>ARCHITECTURE:</strong> ...</div>` |
| **Spatial / Futuristic** | Orbital Topology Metadata | `<div class="orbit-spec">ORBIT_SPEC: ...</div>` |
| **Academic / Research** | Methodological Framework Summary | `<div class="research-methodology"><strong style="color: var(--primary)">METHODOLOGY & ARCHITECTURE:</strong> ...</div>` |

### B. Telemetry & Metrics Adaptation
Telemetry and quantitative impact adapt dynamically:

| Visual Universe / IA | Metrics Presentation Form | HTML DOM Signature |
|---|---|---|
| **Terminal / CLI** | Telemetry Stream | `<div style="color: #4ade80">[TELEMETRY] >> 450k ops/sec...</div>` |
| **Data Observatory** | Tabular Spec Cell | `<td class="metric-cell">METRICS: 99.999% uptime</td>` |
| **Editorial Monograph** | Performance Lead Note | `<div class="perf-telemetry"><strong>Performance Telemetry:</strong> ...</div>` |
| **Timeline Stream** | Impact Milestone Badge | `<div class="timeline-impact">IMPACT: ...</div>` |

### C. Narrative Identity Coexistence (Dual Tagline & Bio)
- **Tagline**: Rendered as the crisp identity creed / prominent headline.
- **Biography**: Rendered as the contextual supporting narrative / professional statement.
- **Invariant**: Both coexist in harmonious typographic hierarchy without mutual suppression.

---

## 3. Evidence Placement Plan in CompositionPlan

When `CompositionPlan.buildPlan` executes:
```javascript
evidencePlacementPlan: {
  projectArchitecture: [
    { projectIndex: 0, hasArchitecture: true, placementForm: 'architecture-dossier-spec' }
  ],
  projectMetrics: [
    { projectIndex: 0, hasMetrics: true, placementForm: 'telemetry-table-row' }
  ],
  researchPlacement: {
    hasResearch: true,
    placementForm: 'dedicated-peer-reviewed-section'
  }
}
```
This guarantees that renderers receive exact placement directives, ensuring complete factual survival with zero template convergence.

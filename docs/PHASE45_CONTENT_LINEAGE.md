# 🏛️ Phase 45 Universal Content Lineage Tracking

## Purpose
`ContentLineage` provides an unbroken audit trail for every distinct user claim, metric, link, artifact, responsibility, achievement, and custom property from source ingestion to terminal DOM representation.

---

## 1. Lineage Record Structure
Every piece of information is registered as a traceable record:
```javascript
{
  id: "lin-project-0-architecture",
  source: "github_api",
  entity: "project",
  field: "projects[0].architecture",
  value: "Asynchronous event loop with lock-free ring buffers on NVMe",
  provenance: "VERIFIED",
  confidence: 0.98,
  originalPath: "projects[0].architecture",
  canonicalPath: "work[0].architecture",
  compositionPath: "compositionPlan.sectionGrammar.projects[0].spec",
  renderedPath: "DOM > article.case-study > div.slide-architecture",
  status: "REPRESENTED",
  history: [
    { status: "INGESTED", timestamp: 1772120000000, notes: "Extracted from GitHub README" },
    { status: "CANONICALIZED", timestamp: 1772120001000, notes: "Mapped to CanonicalEvidenceModel.work" },
    { status: "REPRESENTED", timestamp: 1772120002000, notes: "Verified in final DOM" }
  ]
}
```

---

## 2. Lineage Lifecycle States
1. **`INGESTED`**: Raw payload captured in `RawEvidenceStore`.
2. **`NORMALIZED`**: Standardized by `UnifiedProfileNormalizer`.
3. **`CANONICALIZED`**: Indexed into `CanonicalEvidenceModel` and `EvidenceInventory`.
4. **`ALLOCATED`**: Assigned to a primary or supplementary presentation slot in `CompositionPlan`.
5. **`RENDERED`**: Serialized into HTML/CSS string components.
6. **`REPRESENTED`**: Verified via semantic DOM inspection by `DomContentAuditor`.
7. **`LOST` (FATAL)**: Triggered if DOM presence assertion fails.

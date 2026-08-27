# 🏛️ Phase 45 Unknown Field Forward-Compatibility Policy

## 1. The Forward-Compatibility Mandate
The portfolio engine must not break or drop data when new, non-standard, or domain-specific metadata fields are supplied by users or new extraction adapters.

---

## 2. Dynamic Field Handling Policy
1. **Dynamic Capture**: Any property on an input object not matching known keywords (`name`, `role`, `projects`, `experience`, etc.) is dynamically captured into `customFields`.
2. **Recursive Inspection**: Nested objects (e.g. `project.technical.infrastructure.deployment`) are flattened into semantic dot-notated paths (`project.technical.infrastructure.deployment`).
3. **Universal Fallback Rendering**: `EvidenceFallbackRenderer` formats unknown keys into styled specification cards that inherit the active visual universe's CSS tokens (`--surface`, `--primary`, `--border`, `--font-mono`).
4. **Zero Code Changes for New Keys**: Introducing new fields (e.g. `securityClearance`, `cveDisclosures`, `onCallHistory`) requires zero code changes to guarantee 100% rendering and retention.

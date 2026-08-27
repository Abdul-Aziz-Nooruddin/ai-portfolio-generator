# 🏛️ Phase 39: Renderer Evidence Preservation Contract

## 1. Scope and Obligation
All rendering subsystems in AI Portfolio Studio (`ProjectStoryteller`, `ComponentGrammar`, `HtmlRenderer`, `SectionRendererRegistry`) operate under an immutable contract:

> **The Preservation Invariant**: No renderer may silently omit verified or user-provided evidence fields. Every supplied fact must be represented in a visually native, universe-appropriate manner.

---

## 2. Mandatory Renderer Contracts

### A. Project Storytelling Strategies (All 18 Presentational Forms)
Every project storytelling renderer must handle:
1. `name` (Headline / Project Title)
2. `desc` (Overview / Abstract / Case Summary)
3. `tech` (Stack / Instrumentation / Keywords)
4. `architecture` (Topology / Blueprint / Architecture Spec)
5. `metrics` (Measured Impact / Telemetry / Latency / Throughput)
6. `live` (Live Build / Production URL / Deployment Link)
7. `github` (Source Code / Repository / Commit Tree)

### B. Experience & Career Grammars (All 6 Archetypes)
Every experience grammar renderer must handle:
1. `role` & `company` & `period`
2. `desc` (Narrative context)
3. `responsibilities` (Core operational duties / leadership initiatives)
4. `achievements` (Quantitative outcomes & milestones)
5. `technologies` / `skills` (Domain tools utilized)

### C. Academic & Education Grammar
Must render:
1. `degree` & `institution` & `year`
2. `coursework` / `modules` (Specialized study areas)
3. `achievements` / `honors` (Academic distinctions)

### D. Research & Peer-Reviewed Publications Section
Must render:
1. `title` & `venue` & `year`
2. `authors`
3. `abstract`
4. `doi` / `url`
5. `citations` (when available)

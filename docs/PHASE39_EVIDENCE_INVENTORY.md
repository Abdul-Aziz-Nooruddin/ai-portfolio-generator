# 🏛️ Phase 39: Evidence Inventory Specification

## 1. Overview
`EvidenceInventory` (`src/design-intelligence/evidence-inventory.js`) serves as the pure data and analysis layer of the AI Portfolio Studio design pipeline.

### Core Architectural Invariant
> **Strict Invariant**: `EvidenceInventory` is strictly decoupled from HTML markup, CSS styling, and DOM rendering. It analyzes facts, classifies provenance, and evaluates presentation opportunities.

---

## 2. Provenance Taxonomy

Every field within `EvidenceInventory` is tagged with an explicit provenance level and confidence score:

1. **`VERIFIED`** (Confidence: $0.90 - 1.00$):
   - Cryptographic or API ground truth directly fetched from public endpoints (e.g. GitHub API, commit timestamps, repo telemetry, package registries).
2. **`USER_PROVIDED`** (Confidence: $0.95 - 0.98$):
   - Explicit user declarations from interactive onboarding questionnaires, uploaded PDF resumes, or manual edits.
3. **`INFERRED`** (Confidence: $0.50 - 0.85$):
   - Algorithmic inferences synthesized by design intelligence (e.g. role specialization derived from language vectors, primary visual angle).

---

## 3. Schema Structure

```javascript
class EvidenceInventory {
  identity: {
    name: FieldDescriptor,
    role: FieldDescriptor,
    tagline: FieldDescriptor,
    bio: FieldDescriptor,
    photoUrl: FieldDescriptor,
    contact: FieldDescriptor
  },
  projects: Array<ProjectEvidenceDescriptor>,
  experience: Array<ExperienceEvidenceDescriptor>,
  education: Array<EducationEvidenceDescriptor>,
  research: Array<ResearchEvidenceDescriptor>,
  skills: Array<SkillEvidenceDescriptor>,
  statistics: {
    totalFields: Number,
    verifiedFields: Number,
    userProvidedFields: Number,
    inferredFields: Number,
    deepEvidenceFields: Number
  }
}
```

### FieldDescriptor Interface
```typescript
interface FieldDescriptor {
  value: any;
  provenance: 'VERIFIED' | 'USER_PROVIDED' | 'INFERRED';
  confidence: number;
  depth: 'SHALLOW' | 'STANDARD' | 'DEEP';
  presentationOpportunities: string[];
  status: 'AVAILABLE' | 'ALLOCATED' | 'SUPPRESSED';
}
```

---

## 4. Ingestion & Aggregation Logic

`EvidenceInventory` inspects and normalizes:
- **Work Items**: Identifies deep technical signals (`architecture`, `metrics`, `challenges`, `decisions`, `tradeoffs`, `benchmarks`).
- **Experience Items**: Maps organizational responsibilities, quantitative achievements, leadership scopes, and tech stacks.
- **Academic & Research**: Extracts publication venues, citations, abstracts, DOIs, theses, and coursework modules.
- **Visual Signals**: Assesses gallery specimens, diagrams, screenshots, and prototype demos.

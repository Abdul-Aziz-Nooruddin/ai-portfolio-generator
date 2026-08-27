# 🏛️ Phase 38: 15 Semantic Information Architecture Grammars

## 1. Concept

Information Architecture (IA) governs how content is structured, ordered, and presented.
IA Grammars are **NOT visual styling templates**; they are structural logic specifications that define:
- Dynamic section sequencing
- Information density model (`LOW_DENSITY`, `MEDIUM_DENSITY`, `HIGH_DENSITY`, `DEEP_DOSSIER`)
- Vocabulary profile (tailored section headings and eyebrow tags)

---

## 2. The 15 Semantic IA Grammars

| IA Grammar Key | Name & Description | Section Sequence | Default Density | Tailored Projects Title | Tailored Skills Title |
|---|---|---|---|---|---|
| **`WORK_FIRST`** | Work-First Engineering Runway | `hero -> projects -> capabilities -> experience -> contact` | `HIGH_DENSITY` | Selected Systems & Production Builds | Engineering Toolkit & Stack |
| **`CASE_STUDY_LED`** | Case Study & Architectural Narrative | `thesis -> projects -> capabilities -> experience -> contact` | `HIGH_DENSITY` | In-Depth Case Studies & Architecture | Core Capabilities & Tooling |
| **`RESEARCH_LED`** | Academic Research & Formal Investigation | `hero -> thesis -> projects -> experience -> education -> contact` | `DEEP_DOSSIER` | Research Investigations & Papers | Scientific Frameworks & Instruments |
| **`CHRONOLOGICAL`** | Chronological Career Evolution | `hero -> experience -> projects -> capabilities -> contact` | `HIGH_DENSITY` | Key Contributions by Era | Acquired Domain Expertise |
| **`EVIDENCE_LED`** | Verifiable Proof & Technical Telemetry | `hero -> capabilities -> projects -> experience -> contact` | `MEDIUM_DENSITY`| Demonstrated Technical Deployments | Verified Capabilities & Deep Stack |
| **`PRODUCT_BUILDER`** | Product Builder & Founder Runway | `hero -> projects -> experience -> thesis -> contact` | `HIGH_DENSITY` | Shipped Products & SaaS Primitives | Product & Engineering Range |
| **`OPEN_SOURCE_LED`** | Open-Source Systems & Crates Registry | `hero -> projects -> capabilities -> experience -> contact` | `HIGH_DENSITY` | Core Repositories & Crates | Languages & System Primitives |
| **`TECHNICAL_DOSSIER`** | Technical Systems Dossier | `hero -> projects -> capabilities -> education -> contact` | `DEEP_DOSSIER` | System Architectures & Specs | Architectural Domain Matrix |
| **`NARRATIVE`** | Narrative Journey & Turning Points | `thesis -> hero -> experience -> projects -> contact` | `MEDIUM_DENSITY`| Selected Artifacts & Experiments | Craft & Methods |
| **`ARCHIVE`** | Master Work Index & Living Archive | `hero -> projects -> education -> experience -> contact` | `DEEP_DOSSIER` | Cataloged Works & Project Index | Technical Index & Indexing |
| **`THESIS_LED`** | Foundational Thesis & Applied Practice | `thesis -> hero -> projects -> capabilities -> contact` | `MEDIUM_DENSITY`| Manifestation of Core Principles | Practice & Instruments |
| **`EXPERIMENTAL`** | Experimental Builds & Laboratory Log | `hero -> projects -> capabilities -> contact` | `LOW_DENSITY` | Active Experiments & Builds | Toolbox & Emerging Technologies |
| **`CAPABILITY_LED`** | Capability-Led Competence Matrix | `hero -> capabilities -> projects -> education -> contact` | `MEDIUM_DENSITY`| Applied Engineering Projects | Core Superpowers & Tech Stack |
| **`MINIMAL_WORK_INDEX`** | Minimal Work Index & Fast Dossier | `hero -> projects -> contact` | `LOW_DENSITY` | Selected Work | Stack |
| **`MIXED_MEDIA`** | Mixed Media & Visual Exhibition | `hero -> projects -> capabilities -> experience -> contact` | `HIGH_DENSITY` | Visual Artifacts & Interactive Works | Creative Technologies & Shaders |

---

## 3. Dynamic Compilation into `CompositionPlan`

When `CompositionPlan.buildPlan` compiles the portfolio:
1. `informationArchitecture` is stored in the plan.
2. `vocabularyPlan` is extracted directly from the selected IA grammar.
3. `HtmlRenderer` queries `compositionPlan.vocabularyPlan` dynamically rather than rendering hardcoded text strings.

# 🏛️ Phase 38: Adaptive Questionnaire & Evidence Gap Resolution

## 1. Targeted Gap Discovery

Rather than asking all users the same static list of questions or duplicating information already available from GitHub or a resume, `CanonicalEvidenceModel.getEvidenceGaps()` computes missing dimensions before generating questions.

---

## 2. Evidence Gap Matrix

| Missing Dimension Detected | Condition | Targeted Questionnaire Prompt | Resolved Signal |
|---|---|---|---|
| **`career_experience`** | GitHub provided, but zero employment history | *"What professional roles or engineering teams have you contributed to?"* | Populates career chronology without fabrication. |
| **`project_evidence`** | Resume provided with sparse project details | *"What problem did your strongest engineering project solve?"* | Deepens project architectural case study. |
| **`academic_background`** | GitHub provided without education data | *"What formal degrees, bootcamps, or studies shaped your foundation?"* | Conferred degree and institution grounding. |
| **`engineering_thesis`** | No bio or short generic tagline | *"What core philosophy or thesis drives your technical work?"* | Crafts opening monograph statement. |
| **`visual_media`** | No uploaded images or repository screenshots | *"Do you have architecture diagrams, UI mockups, or screenshots to feature?"* | Activates image-led visual plates. |

---

## 3. Provenance Safeguards

User-provided questionnaire answers receive `PROVENANCE_LEVELS.USER_PROVIDED` and take precedence over inferred defaults.
Missing information is never filled with fake placeholder companies or fabricated metrics.

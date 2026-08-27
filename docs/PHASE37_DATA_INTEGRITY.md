# 🏛️ Phase 37: Real User Data Integrity & Grounding Guarantees

## 1. Principles of Factual Grounding

In generative design systems, visual creativity must never sacrifice factual truth. The engine strictly prohibits hallucinating fake companies, job titles, achievements, invented metrics, or placeholder tokens.

---

## 2. Ingestion & Provenance Matrix

| Source Channel | Grounded Facts Extracted | Conflict Resolution Rules | Inferred Signals |
|---|---|---|---|
| **GitHub Ingestion** | Repositories, stars, languages, commit timestamps, release tags, README summaries. | Direct GitHub data overrides inferred technical skills. | Technical depth, repository scale, dominant programming languages. |
| **PDF Resume Upload** | Full name, contact links, employment history, company names, degrees, verified certifications. | Direct resume text overrides generic fallbacks. | Career stage, experience depth, education depth. |
| **Image Uploads** | Architectural screenshots, UI mockups, photo dimensions, file metadata. | Uploaded images override stock placeholders. | Visual media availability, image density. |
| **Guided Questions** | High-priority user answers (name, primary role, key projects, superpowers). | Direct user answers have highest precedence over all inferences. | Primary angle, creative preferences. |

---

## 3. Anti-Fabrication & Anti-Slop Safeguards

`Phase37RealWorldQualityGate` enforces automated scans on every rendered HTML document to detect and reject:
1. Placeholder slop strings (`[COMPANY_NAME]`, `[JOB_TITLE]`, `Lorem ipsum`, `insert bio here`).
2. Dropped user project names.
3. Dropped user names or degree citations.
4. Hallucinated external links.

Every specimen failing these checks fails closed and is blocked from deployment.

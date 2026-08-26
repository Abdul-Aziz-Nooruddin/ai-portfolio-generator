# PHASE 33 — PUBLIC PRODUCT UX REDESIGN

## 1. Product Design Constitution

The public generator interface (`web/index.html`, `web/style.css`, `web/app.js`) is strictly decoupled from the generated portfolio styles:

- **Surface Aesthetic**: Editorial, calm, tactile, warm paper (`#FAF8F5`), rich charcoal ink (`#1A1918`), subtle olive borders (`#E5E0D8`), zero neon AI purple gradients.
- **Typography Hierarchy**: Newsreader / Fraunces editorial display paired with Inter body.
- **Instant Clarity**: Headline *"Turn your work into a portfolio that feels like you."* conveys the core value proposition within 3 seconds.

---

## 2. Multi-Input Intake Architecture

Users can start through any of 5 distinct intake tabs:
1. **GitHub Ingestion**: Paste any GitHub profile URL or username (`https://github.com/torvalds`).
2. **Resume PDF Ingestion**: Drag & drop or upload a PDF resume (magic-byte validated with client and server sanitization).
3. **Supporting Media Upload**: Attach up to 3 visual artifacts, diagrams, or project screenshots.
4. **Adaptive Guided Questionnaire**: 6 high-signal questions focusing on authentic engineering achievements and craft.
5. **Combined Synthesis Intake**: Merge GitHub + PDF + images + answers into a single unified profile normalizer.

---

## 3. Honest Wall-Clock Progress Tracking

The generator UI does not use fake looping spinners. It tracks 7 real generation milestones:
1. `Parsing raw multi-source input...`
2. `Evaluating engineering proof & evidence...`
3. `Consulting design skill intelligence...`
4. `Generating bespoke visual universe & layout...`
5. `Composing domain-specific project artifacts...`
6. `Auditing contrast & perceptual diversity...`
7. `Deploying live preview instance...`

# 🏛️ Portfolio Design Generation Workflow

---

## Complete End-to-End Workflow Diagram

```
USER DATA
   ↓
CONTENT INTELLIGENCE
   ↓
DESIGN RESEARCH (Consults free skills)
   ↓
CREATIVE DIRECTOR
   ↓
IA / UX DESIGN
   ↓
VISUAL SYSTEM
   ↓
PROJECT STORYTELLING (12 Presentation Models)
   ↓
MOTION & INTERACTION (GSAP 3.12 + WebGL)
   ↓
COMPOSITIONAL ENGINE
   ↓
IMPLEMENTATION
   ↓
DESIGN CRITIC (Pass / Revise Cycle)
   ↓
ACCESSIBILITY (WCAG AAA Verification)
   ↓
STRUCTURAL DIVERSITY (DOM Fingerprint Comparison)
   ↓
MANDATORY APPROVAL GATE
   ↓
PREVIEW WATERMARK & TELEMETRY INJECTION
   ↓
FINAL DEPLOYABLE PORTFOLIO
```

---

## Stage-by-Stage Breakdown

### 1. User Data Ingestion
- Ingests raw inputs from GitHub repositories, uploaded PDF resumes, Telegram bot conversations, or Web Studio forms.
- Data is normalized into developer identity, verified projects, skills, and career timeline.

### 2. Content Intelligence Analysis
- Analyzes multi-factor content signals without job-title stereotyping:
  - `projectDepth` (compact vs deep)
  - `technicalDepth` (verified repositories, architectures, code snippets)
  - `visualDensity` (media-heavy vs text-heavy)
  - `narrativeDepth` (timeline records, executive statements)

### 3. Design Research
- Consults free open-source design skills in `.agents/skills/`:
  - `ui-ux-pro-max` (84 UI styles, 192 color palettes, 73 typography pairings)
  - `design-it` (art direction and aesthetic exploration)
  - `better-interface` (typography scales, contrast heuristics)
  - `web-design` (LIBERA layout systems, motion choreography)
- Discovers design principles and enforces anti-pattern blacklists (rejecting generic 3-column cards and default purple gradients).

### 4. Creative Direction & Information Architecture
- Evaluates 10 distinct IA models:
  1. `work-first-runway`
  2. `split-screen-dossier`
  3. `horizontal-exhibition`
  4. `editorial-monograph`
  5. `computational-terminal`
  6. `spatial-3d-stage`
  7. `narrative-timeline`
  8. `minimal-single-screen`
  9. `asymmetric-bento-canvas`
  10. `magazine-spread-columns`

### 5. Visual System & Typography
- Pairs display typefaces (`Space Grotesk`, `Syne`, `Playfair Display`, `Plus Jakarta Sans`, `Cabinet Grotesk`, `JetBrains Mono`) with high-legibility body fonts.
- Sets mathematical type scales (1.25 to 1.414 ratio) with responsive `clamp()` formulas.
- Configures 10 curated visual universes with AAA contrast ratios.

### 6. Project Storytelling Selection
- Selects from 12 distinct presentation models based on actual project evidence:
  1. `fullscreen-interactive-slide`
  2. `split-screen-comparison`
  3. `code-architecture-dossier`
  4. `horizontal-filmstrip`
  5. `typographic-index-reveal`
  6. `spatial-orbit-dock`
  7. `terminal-session-log`
  8. `magazine-editorial-chapter`
  9. `timeline-milestone-card`
  10. `interactive-canvas-node`
  11. `compact-metrics-table`
  12. `asymmetric-media-mosaic`
- Includes contextual fallbacks (e.g. low-text editorial falls back to media mosaic, low-tech terminal falls back to code dossier).

### 7. Motion & Interaction
- Applies GSAP 3.12 micro-interactions and scroll reveals.
- Selectively injects lightweight Three.js ambient canvases only when justified by aesthetic direction.
- Enforces `@media (prefers-reduced-motion: reduce)` fallback across all animations.

### 8. Design Critic & Mandatory Gate
- Audits candidate before final generation.
- Rejects candidate if anti-patterns or contradictions are detected.
- Supports up to 3 automatic revision attempts.
- Evaluates structural uniqueness against `StructuralMemory` history.
- Mandatory Gate confirms all 11 stages completed before releasing final HTML/CSS/JS.

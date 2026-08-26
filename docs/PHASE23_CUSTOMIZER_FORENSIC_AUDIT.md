# Phase 23 Forensic Audit: Existing Customizer, Preview & Persistence Architecture

## 1. System Architecture Audit

This forensic audit analyzes the existing portfolio preview system, site generator, design blueprint, renderer, API routes, and persistence layer prior to implementing the Phase 23 interactive customizer and static export system.

---

## 2. Key Forensic Findings

### A. Preview Architecture
- **Preview Path**: `/p/:siteId` served directly via Express.
- **Disk Persistence**: Files are written to `public/sites/:siteId/index.html`, `style.css`, and `script.js` via `HostingProvider.deploy()`.
- **Isolation & Security**: Strict Content Security Policy (`connect-src 'none'`, `X-Frame-Options: SAMEORIGIN`, and identifier regex sanitization) isolates previewed portfolios from authenticated backend routes.
- **Watermarking**: Unpaid previews have a floating diagonal watermark injected via `SiteGenerator.injectPreviewWatermark()`; paid/active subscribers receive clean, unwatermarked HTML.

### B. Representation of Design Blueprint & Sections
- `DesignEngine` compiles portfolios using 10 Information Architecture (IA) models:
  - `work-first-runway` (`['work_runway', 'technical_evidence', 'professional_journey', 'creator_statement', 'contact_dock']`)
  - `split-screen-dossier` (`['split_identity', 'featured_artifacts', 'verified_stack', 'experience_record', 'direct_contact']`)
  - `horizontal-exhibition` (`['exhibition_title', 'curated_track', 'skills_archive', 'experience_index', 'contact_gate']`)
  - `editorial-monograph` (`['monograph_cover', 'thesis_statement', 'project_chapters', 'trajectory_essay', 'sign_off']`)
  - `computational-terminal` (`['cli_prompt_hero', 'system_capabilities', 'executed_projects', 'kernel_history', 'connect_terminal']`)
  - `spatial-3d-stage` (`['stage_intro', 'orbiting_projects', 'stack_constellation', 'trajectory_waypoints', 'signal_dock']`)
  - `asymmetric-bento-canvas` (`['bento_masthead', 'featured_mosaic', 'skill_matrices', 'journey_cells', 'bento_contact']`)
  - `minimal-single-screen` (`['statement_masthead', 'interactive_index', 'status_footer']`)
  - `narrative-timeline` (`['prologue_hero', 'chronological_milestones', 'mastered_tools', 'epilogue_reach']`)
  - `magazine-spread-columns` (`['magazine_header', 'three_column_portfolio', 'editorial_skills', 'author_profile', 'contact_spread']`)
- The output structure includes `designBlueprint` (`iaModel`, `layoutGrammar`, `visualUniverse`, `projectStrategy`, `sectionOrder`) and `designBrief`.

### C. State Mutation & Customization Gaps
- Currently, when a user changes settings on `/api/web/generate`, the entire site is re-generated through the pipeline, which takes ~50–100ms on local runs and triggers full gate verification.
- There is currently no canonical `PortfolioState` model with:
  - Client-side / in-memory instant reordering of sections without invoking full LLM/AI pipelines.
  - Section-level visibility toggles (`hiddenSections`).
  - Controlled design token adjustments (`--space-section`, `--radius-card`, `--type-scale`, `--motion-intensity`).
  - Undo/Redo transaction snapshots.
  - Standalone offline Static ZIP Export packaging.

---

## 3. Plan of Execution for Phase 23
1. **Canonical Portfolio State (`src/customizer/portfolio-state.js`)**: Encapsulates sections, ordering, visibility, theme modes, tokens, and history stack.
2. **Section Registry (`src/customizer/section-registry.js`)**: Exposes semantic IDs, movable/hideable flags, and mobile behavior.
3. **Customization Quality Gate (`src/customizer/customization-quality-gate.js`)**: Validates every token and layout modification with `BrowserVisualQualityAgent` and `DesignQualityGate`.
4. **Static Export Engine (`src/export/static-exporter.js`)**: Assembles standalone static ZIP packages containing clean `index.html`, bundled CSS/JS, assets, and `README.md` with zero localhost/backend dependencies.
5. **Automated Validation**: `src/test-static-export.js` and `src/test-customizer-stress.js`.

# 🏛️ Phase 30: Beta User Testing Protocol & Usability Measurement Plan

## 1. Objective & Philosophy

The objective of the Phase 30 Beta User Test Plan is to evaluate real human usability, task completion friction, and qualitative clarity.

> **CRITICAL REPORTING INTEGRITY RULE:**
> Do NOT create fake human metrics or fabricated beta user quotes. Until real human cohorts have executed these test protocols in supervised or telemetry-monitored sessions, the official status must remain:
> **`REAL USER VALIDATION: INSUFFICIENT DATA (AWAITING COHORT 1 EXECUTION)`**

---

## 2. Target User Cohorts (Sample Size: $N=25$)

| Cohort | Profile Description | Key Evaluation Target |
|---|---|---|
| **Cohort A (Backend / Systems)** | Go / Rust / Python engineers with minimal frontend CSS experience | Can they enter their username and get an authoritative portfolio without touching frontend code? |
| **Cohort B (AI / ML Researchers)** | PyTorch / Python researchers with publications and GitHub repos | Does the narrative thesis and repository metrics present technical rigor accurately? |
| **Cohort C (Frontend / Creative Devs)** | TypeScript / React / WebGL creators who are highly design-sensitive | Do the typography scales, motion intensity, and layout geometries meet aesthetic standards? |
| **Cohort D (Junior Devs / Career Switchers)** | Developers building their first professional portfolio | Are the onboarding instructions, customizer controls, and export steps clear? |

---

## 3. Test Scenarios & Success Criteria

### Scenario 1: One-Click GitHub Generation (First-Time User)
- **Task**: Enter GitHub username on landing page and obtain a live preview.
- **Max Friction Time**: $< 45$ seconds.
- **Success Criteria**: User reaches interactive preview with 0 assistance or confusion.

### Scenario 2: Visual Customization
- **Task**: Open Customizer Drawer, adjust section order, change section spacing to "Spacious", and use Undo.
- **Max Friction Time**: $< 60$ seconds.
- **Success Criteria**: User successfully modifies appearance and confirms preview updates without breaking layout.

### Scenario 3: Static Export & Self-Hosting
- **Task**: Open Export dialog, download standalone ZIP archive, inspect contents, and identify deployment steps for GitHub Pages or Netlify.
- **Max Friction Time**: $< 90$ seconds.
- **Success Criteria**: User understands that the site is 100% static and requires 0 backend servers.

---

## 4. Friction Telemetry & Drop-Off Tracking Points

All telemetry is strictly anonymized and scrubbed of any PII, credentials, or repository tokens:

1. `landing_visit` $\to$ `input_focus` (Measures value proposition clarity).
2. `generation_started` $\to$ `preview_rendered` (Measures synthesis reliability and latency).
3. `customizer_opened` $\to$ `customizer_action_applied` (Measures discoverability of customization controls).
4. `export_modal_opened` $\to$ `zip_download_completed` (Measures export conversion and perceived ownership).

---

## 5. Official Status & Next Cohort Milestone

- **Automated E2E Product Verification**: `100% PASS` (21/21 user journey test scenarios verified in `src/test-public-product.js`).
- **Real Human User Validation**: `INSUFFICIENT DATA (AWAITING COHORT 1 EXECUTION)`
- **Target Launch Date for Cohort 1 ($N=25$)**: Next Scheduled Beta Release Wave.

# Phase 25 Beta Test Plan: Real-User Product Validation

## 1. Overview & Objectives

This document establishes the practical test plan for rolling out the AI Portfolio Studio to cohorts of **5 internal users**, **10 beta users**, **25 beta users**, and **50 beta users**.

---

## 2. Beta Cohort Progression

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 5 Internal Devs │ ──> │  10 Alpha Users │ ──> │  25 Beta Users  │ ──> │ 50 Early Access │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 3. Standard Tester User Journey Script

Every participant in the beta cohort completes this exact 12-step script:

1. **Account Creation**: Sign up using email or anonymous session.
2. **Profile Submission**: Ingest resume PDF/image or link GitHub profile (`username` or `https://github.com/username`).
3. **Design Review**: Inspect the generated portfolio in the interactive preview.
4. **Theme Customization**: Toggle between light and dark modes.
5. **Section Reordering**: Move a secondary section (e.g. Experience above Skills).
6. **Visibility Toggle**: Hide an optional section (e.g. Certifications) and restore it.
7. **Design Token Refinement**: Adjust section spacing or border radius.
8. **Undo/Redo Stress**: Perform 2 undos and 2 redos.
9. **Save**: Save customized portfolio state.
10. **Static ZIP Export**: Download standalone ZIP archive.
11. **Local Static Test**: Extract ZIP and double-click `index.html` via `file:///`.
12. **Submit Feedback**: Rate with 👍, 😐, or 👎 and provide optional comments.

---

## 4. Telemetry & Success Metrics to Monitor

- **Generation Success Rate**: $\ge 99.0\%$
- **Average Generation Duration**: $< 50$ms
- **Export Success Rate**: $100.0\%$
- **Customizer Error Rate**: $0.0\%$
- **User Satisfaction (👍 + 😐)**: $\ge 90.0\%$

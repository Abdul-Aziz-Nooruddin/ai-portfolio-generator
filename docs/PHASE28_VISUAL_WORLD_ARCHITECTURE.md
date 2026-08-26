# Phase 28: Visual World Architecture & Design Constitution

## 1. Executive Summary

Phase 28 re-architects the portfolio creation pipeline to make **Art Direction** the highest-level decision in the generative hierarchy.

---

## 2. Updated Generative Decision Pipeline

```
USER / PROFILE SIGNALS
          ↓
  Creative Direction Analysis (70% Semantic Affinity + 30% Controlled Exploration)
          ↓
  ART DIRECTION PROFILE (1 of 20 Systems)
          ↓
  VISUAL WORLD CONSTITUTION (Geometry, Surfaces, Typography, Navigation, Projects, Motion)
          ↓
  Information Architecture (10 Models)
          ↓
  Macro Composition & Layout Grammar (15 Layouts)
          ↓
  Project Storytelling (12 Presentational Strategies)
          ↓
  Typography & Color Palettes (WCAG AAA)
          ↓
  Motion Physics & Reduced Motion
          ↓
  HtmlRenderer (Dynamic DOM Compilation)
          ↓
  Browser Visual Quality Agent + Anti-Default Agent (Fail-Closed)
          ↓
  Visual World Distance Verification (Template Collision <= 10%)
```

---

## 3. The 11 Dimensions of Visual World Distance

Distance between two portfolios is calculated using the weighted formula in [`src/design-intelligence/visual-world-distance.js`](file:///Users/abdulaziz/Desktop/whatsapp-portfolio-bot/src/design-intelligence/visual-world-distance.js):

$$\text{Distance} = 0.20 \cdot D_{\text{geom}} + 0.15 \cdot D_{\text{hier}} + 0.10 \cdot D_{\text{type}} + 0.10 \cdot D_{\text{space}} + 0.15 \cdot D_{\text{proj}} + 0.05 \cdot D_{\text{nav}} + 0.05 \cdot D_{\text{surf}} + 0.05 \cdot D_{\text{col}} + 0.05 \cdot D_{\text{mot}} + 0.05 \cdot D_{\text{inter}} + 0.05 \cdot D_{\text{decor}}$$

A distance score $< 0.25$ triggers a **Template Family Collision** warning.

---
name: web-design
description: LIBERA Web Design Skill — Visual art direction, layout systems, typography, color harmony, motion choreography, design audit, and anti-AI-slop design.
---

# LIBERA Web Design Skill

## 1. Overview
LIBERA Web Design encapsulates high-craft digital art direction, choreography of viewport motion, editorial typography, and anti-AI-slop design heuristics.

## 2. Motion & Layout Principles
- **Choreographed Motion**: All entrance reveals, scroll triggers, and parallax transitions must be timed with standard cubic bezier easing (`power2.out`, `power3.inOut`).
- **WebGL Justification**: Three.js ambient scenes are permitted only when contextually justified by the user's creative or technical direction (e.g. 3D researchers, creative directors).
- **Reduced Motion Fallback**: Always respect `prefers-reduced-motion: reduce` by zeroing out transitions and disabling canvas render loops.
- **Reference-Study Principle**: When reference URLs or images are provided, extract underlying structural geometry and typography principles rather than cloning pixel-for-pixel.

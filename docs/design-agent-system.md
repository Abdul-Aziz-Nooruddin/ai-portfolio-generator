# 🏛️ Free Design-Agent & Skills System Architecture

---

## 1. Installed Open-Source Skills

The generator uses free, open-source design skills located in `.agents/skills/`:

| Skill Name | Source Repository | Purpose |
| :--- | :--- | :--- |
| **`ui-ux-pro-max`** | [nicohodt/claude-code-ui-ux-skill](https://github.com/nicohodt/claude-code-ui-ux-skill) | 84 UI styles, 192 color palettes, 73 typography pairings, UX rules, accessibility standards, anti-AI-slop guidance. |
| **`design-it`** | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | Creative art direction, visual style exploration, and avoiding repetitive visual combinations. |
| **`better-interface`** | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | Interface critique heuristics, typography pairing rules, color contrast physics, and spatial balance auditing. |
| **`web-design`** | [liberastudio-mx/skill-web-design](https://github.com/liberastudio-mx/skill-web-design) | LIBERA visual art direction, motion choreography, viewport animations, and reference-study principles. |
| **`gsap`** | Official GreenSock Skill | GSAP 3.12+ ScrollTrigger best practices, micro-interaction physics, and reduced-motion architecture. |

---

## 2. Zero-Cost & Free-First Technology Policy

- **Zero Paid Dependencies**: The design pipeline runs purely offline on local JavaScript / Node.js modules and local CSV/JSON knowledge bases.
- **Zero API Keys Required for Design Intelligence**: No paid design APIs, no mandatory image generation subscriptions, no paid website builders.
- **Local Data Storage**: Located in `.agents/skills/` and `skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/`.

---

## 3. The 15 Specialized Design Agent Roles

```
RAW USER DATA
     ↓
[1. Content Analysis Agent]      -> Extracts project depth, technical depth, visual density, narrative signals
     ↓
[2. Design Research Agent]       -> Consults free open-source skills (.agents/skills/*)
     ↓
[3. Figma Design Agent]          -> Token extraction when Figma URL is provided (optional)
     ↓
[4. UI/UX Pattern Agent]         -> Navigation models, density, touch targets, accessibility
     ↓
[5. IA Agent]                    -> Selects from 10 distinct Information Architecture models
     ↓
[6. Spatial Composition Agent]   -> Selects from 10 Layout Grammars (CSS Grid / Flex)
     ↓
[7. Typography Agent]            -> Display / Body / Mono pairing & fluid scale
     ↓
[8. Color / Identity Agent]      -> Selects from 10 Visual Universes (WCAG AAA compliant)
     ↓
[9. Project Storytelling Agent]  -> Selects from 12 distinct presentation DOM trees
     ↓
[10. Motion & Interaction Agent] -> GSAP 3.12 + Selective Three.js WebGL
     ↓
[11. Accessibility Agent]        -> WCAG 2.2 AAA audit, focus outlines, prefers-reduced-motion
     ↓
[12. Performance Agent]          -> Payload budgets (<50KB HTML, <30KB CSS, <200KB JS)
     ↓
[13. Structural Diversity Agent] -> DOM fingerprint check against structural memory
     ↓
[14. Design Synthesis Agent]     -> Compiles unified DesignBrief & executes auto-revisions
     ↓
[15. Design Critic Agent]        -> Multi-stage critique & anti-pattern rejection (Pass vs Revise)
     ↓
[MANDATORY DESIGN GATE]
     ↓
[COMPOSITIONAL DESIGN ENGINE]
     ↓
FINAL RESPONSIVE HTML/CSS/JS
```

---

## 4. Mandatory Design Gate & State Tracking

Every generation creates a strict `designState` verification object:

```javascript
{
  contentAnalysisCompleted: true,
  researchCompleted: true,
  creativeDirectionCompleted: true,
  iaCompleted: true,
  visualSystemCompleted: true,
  projectStrategyCompleted: true,
  motionCompleted: true,
  implementationCompleted: true,
  designCriticCompleted: true,
  accessibilityCompleted: true,
  diversityCheckCompleted: true,
  approved: true
}
```

If **any** stage is incomplete or the critic rejects the candidate after maximum revision attempts, the generator throws an explicit structured error and **blocks portfolio creation**.

---

## 5. Structural Anti-Repetition & Memory

The `StructuralMemory` module stores recent design fingerprints across the last 10–50 runs:
- IA model
- Layout grammar
- Project storytelling strategy
- Visual universe
- Navigation model
- Section order

If an identical combination is generated within the active window, the candidate is automatically rejected and re-rolled.

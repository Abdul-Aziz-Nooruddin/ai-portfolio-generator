# 🏛️ Portfolio Design Intelligence Agent Ecosystem — Architecture

---

## 1. System Overview & Core Philosophy

The **Portfolio Design Intelligence Ecosystem** introduces a formal, multi-agent reasoning layer before website composition and rendering.

### The Central Tenet:
> **NO DESIGN INTELLIGENCE $\to$ NO PORTFOLIO GENERATION**
> 
> *Design Agents decide WHAT should be designed.*  
> *Design Engine decides HOW to implement that design.*  
> *Design Critic challenges and validates the design.*  
> *Structural Memory prevents repetition across runs.*  
> *No valid DesignBrief = Generation stops with an explicit structured error.*

---

## 2. Complete Execution Pipeline

```
                              RAW USER DATA
                   (GitHub / PDF Resume / Form Q&A)
                                   │
                                   ▼
                       [1. Content Analysis Agent]
                        Extracts verified signals:
                       • Project depth & evidence
                       • Technical depth & repos
                       • Visual density & media
                       • Narrative & timeline depth
                                   │
                                   ▼
                       [2. Design Research Agent]
                       • Curated design datasets
                       • Abstract principles
                       • Anti-pattern avoidance
                                   │
                                   ▼
        ┌──────────────────────────────────────────────────────┐
        │                 SPECIALIZED AGENTS                   │
        │                                                      │
        │ • 3. Figma Design Agent (FigmaProvider tokens)       │
        │ • 4. UI/UX Pattern Agent (UX rules & density)        │
        │ • 5. IA Agent (10 distinct IA models)                │
        │ • 6. Spatial Composition Agent (10 layout grammars)  │
        │ • 7. Typography Agent (Scales & font pairings)       │
        │ • 8. Color / Identity Agent (10 visual universes)    │
        │ • 9. Project Storytelling Agent (12 presentation     │
        │      models with distinct DOM structures)            │
        │ • 10. Motion & Interaction Agent (GSAP / WebGL)      │
        │ • 11. Accessibility Agent (WCAG AAA verification)    │
        │ • 12. Performance Agent (Payload budgets)            │
        │ • 13. Structural Diversity Agent (DOM fingerprints)  │
        └──────────────────────────┬───────────────────────────┘
                                   │
                                   ▼
                      [14. Design Synthesis Agent]
                       Combines all agent decisions
                                   │
                                   ▼
                        FORMAL DESIGN BRIEF
                                   │
                                   ▼
                       [15. Design Critic Agent]
                       Pass vs Revise Audit:
                       • Visual coherence
                       • Anti-pattern detection
                       • Content-to-IA fit
                       • Accessibility compliance
                                   │
                         PASS ─────┴───── REVISE
                          │                  │
                          │                  ▼
                          │         [Synthesis Auto-Revise]
                          │                  │
                          ▼ ◄────────────────┘
                     MANDATORY GATE
                          │
                          ▼
             COMPOSITIONAL DESIGN ENGINE
                (`src/design-engine/`)
                          │
                          ▼
                RESPONSIVE HTML/CSS/JS
```

---

## 3. The 15 Specialized Agent Roles

| Agent | File | Responsibility |
| :--- | :--- | :--- |
| **1. Content Analysis** | `content-analysis-agent.js` | Evaluates multi-factor content signals without job title stereotypes. |
| **2. Design Research** | `design-research-agent.js` | Ingests UI style datasets, extracts abstract principles, and flags anti-patterns. |
| **3. Figma Design** | `figma-design-agent.js` | Connects via `FigmaProvider` to extract authentic color/type tokens from Figma frames. |
| **4. UI/UX Pattern** | `ui-ux-pattern-agent.js` | Determines navigation models, information density, and accessibility rules. |
| **5. Information Architecture** | `information-architecture-agent.js` | Selects from 10 distinct IA models with anti-repetition memory. |
| **6. Spatial Composition** | `spatial-composition-agent.js` | Governs CSS Grid/Flex geometry, viewport behavior, and whitespace rhythm. |
| **7. Typography** | `typography-agent.js` | Selects display/body/mono font pairings and fluid clamp scales. |
| **8. Color & Identity** | `color-identity-agent.js` | Selects from 10 visual universes with WCAG AAA contrast compliance. |
| **9. Project Storytelling** | `project-storytelling-agent.js` | Maps projects to 12 presentation models with distinct DOM hierarchies. |
| **10. Motion & Interaction** | `motion-interaction-agent.js` | Manages GSAP 3.12 ScrollTriggers and selective Three.js WebGL scenes. |
| **11. Accessibility** | `accessibility-agent.js` | Audits contrast, keyboard navigation, focus indicators, and reduced-motion. |
| **12. Performance** | `performance-agent.js` | Enforces HTML (<50KB), CSS (<30KB), JS (<200KB), and WebGL budgets. |
| **13. Structural Diversity** | `structural-diversity-agent.js` | Computes structural fingerprints and rejects structural duplicates across 50 runs. |
| **14. Design Critic** | `design-critic-agent.js` | Audits candidate briefs, rejecting template convergence and unmotivated decoration. |
| **15. Design Synthesis** | `design-synthesis-agent.js` | Compiles decisions into a single formal `DesignBrief` and executes auto-revisions. |

---

## 4. Provider Abstraction Layer

All external data sources connect through `src/design-intelligence/providers/`:
- **`ProviderInterface`**: Standard contract (`isAvailable()`, `fetchDesignEvidence()`, `extractTokens()`).
- **`LocalDesignReferenceProvider`**: Direct zero-latency access to 84 UI styles, 192 color palettes, and 73 typography pairings.
- **`FigmaProvider`**: Server-side bridge to Figma REST API and MCP.
- **`WebDesignProvider`**: HTTP design reference source with SSRF protection.

# 🏛️ AI Portfolio Studio & Design Intelligence Engine

<div align="center">

[![Test Suite](https://img.shields.io/badge/Tests-159%20Passing-brightgreen.svg)](https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator)
[![Design Intelligence](https://img.shields.io/badge/Design%20Intelligence-18%20Storytelling%20Models-blue.svg)](https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)

**Turn your GitHub or resume into an award-winning, 3D interactive portfolio in 60 seconds.**  
*No cookie-cutter templates or generic cards. Powered by deep visual design intelligence, 18 bespoke storytelling grammars, and instant static ZIP export.*

[Live Features](#-key-features) • [Quick Start](#-quick-start) • [Design Architecture](#-design-intelligence-architecture) • [Static Exporter](#-static-zip-export--deployment) • [API Reference](#-api-reference)

</div>

---

## ✨ Key Features

### ⚡ 1-Click GitHub Portfolio Synthesis
- **Evidence-Grounded Ingestion**: Deeply inspects public repositories, star ratings, languages, and profile READMEs.
- **Zero-Project & 1-Project Resilience**: Automatically provisions structured starter project anchors for new accounts.
- **Anti-Hallucination Guardrails**: Distinguishes verified repository evidence from inferred roles.

### 🎨 Design Intelligence & Macro Composition
- **10 Macro Information Architecture Models**: *Minimal Single-Screen, Split-Screen Dossier, Asymmetric Bento Canvas, Computational Terminal, Editorial Monograph, Narrative Timeline, Work-First Runway, Spatial 3D Stage, Horizontal Exhibition, Magazine Spread.*
- **18 Project Storytelling Systems**: Bespoke DOM architectures for every technical discipline (*Interactive Terminal Session Logs, Code Architecture Dossiers, Spatial Orbit Docks, Metric Dashboards, Split Comparison Carousels*).
- **WebGL 3D Interactive Stages**: Custom Three.js GLSL shaders, particle constellations, dynamic canvas ink, and spatial geometry.
- **Anti-AI-Slop Constitution**: Enforces WCAG AAA contrast ratios, typography pairings, and zero repetitive card grids.

### 🛠️ Real-Time Visual Customizer
- **Section Reordering & Visibility**: Move sections up/down, toggle optional modules with structural safety gates.
- **Appearance Tokens**: Dynamically tune section spacing (`compact`, `medium`, `spacious`), border intensity (`subtle`, `medium`, `sharp`), and typography scale.
- **Deterministic 30-Level Undo/Redo**: Full history stack with instant live preview iframe synchronization.
- **Client Session Persistence**: LocalStorage draft and active site hydration across browser refreshes.

### 📦 Standalone Clean Static ZIP Export
- **100% Dependency-Free Export**: Generates standalone `index.html`, `css/style.css`, and `js/main.js`.
- **Sanitized Output**: 0 localhost URLs, 0 preview watermarks, 0 internal API endpoints.
- **Zero-Config Deployment Guides**: Pre-formatted deployment instructions for Vercel, Netlify Drop, and GitHub Pages.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** or higher
- **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator.git
cd ai-portfolio-generator
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env
```
*(The studio runs out-of-the-box with deterministic fallbacks. Set `GEMINI_API_KEY` for Google Gemini AI synthesis or `GITHUB_TOKEN` for higher GitHub API rate limits).*

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Comprehensive Verification Suite

The repository includes 159 rigorous tests across 22 test suites covering security, visual quality, design intelligence, customizer stress, static export sanitization, and full user journeys.

```bash
# Run the entire test suite (159 passing tests)
npm test

# Run real user zero-assistance journey test
npm run test:journey

# Run fail-closed public launch gate
npm run test:launch

# Run public product & customizer E2E tests
npm run test:product
```

---

## 🏛️ Design Intelligence Architecture

```
ai-portfolio-generator/
├── src/
│   ├── index.js                                    # Express API server & routes
│   ├── analytics/                                  # Privacy-first telemetry & dashboard
│   │   ├── product-events.js                       # Sanitized telemetry logger
│   │   ├── funnel-analyzer.js                      # Step-by-step conversion analytics
│   │   └── beta-dashboard.js                       # Admin observability metrics
│   ├── customizer/                                 # Visual Customizer Engine
│   │   ├── portfolio-state.js                      # Section tree, tokens & undo/redo
│   │   ├── customization-quality-gate.js           # Structural safety validation
│   │   └── section-registry.js                     # Canonical component schemas
│   ├── design-engine/                              # Visual Design & Composition Core
│   │   ├── ia-composer.js                          # Macro composition generator
│   │   ├── macro-composition-engine.js             # 10 IA models & layout grammars
│   │   ├── project-storytelling-constitution.js    # 18 bespoke storytelling strategies
│   │   ├── visual-world.js                         # 10 cohesive visual universes
│   │   ├── color-palettes.js                       # WCAG AAA tailored palettes
│   │   ├── typography-systems.js                   # Font pairings & scale ratios
│   │   ├── motion-profiles.js                      # GSAP & WebGL motion dynamics
│   │   └── html-renderer.js                        # Semantic HTML5 compiler
│   ├── design-intelligence/                        # Autonomous Design Agents & Gates
│   │   ├── agents/public-launch-gate.js            # Fail-closed production release gate
│   │   ├── agents/browser-visual-quality-agent.js  # Contrast & visual truth auditor
│   │   ├── agents/anti-default-agent.js            # Anti-slop & non-repetition governor
│   │   └── project-presentation-diversity-governor.js
│   ├── export/                                     # Static Export Engine
│   │   └── static-exporter.js                      # Sanitized ZIP compiler
│   └── services/
│       ├── github-profile-synthesizer.js           # Grounded developer profile synthesizer
│       ├── github/                                 # GitHub REST client, parser, ranker
│       ├── security-service.js                     # SSRF, XSS, Path Traversal & Scrypt auth
│       └── hosting-provider.js                     # Instant origin-isolated site serving
├── web/                                            # Web Studio Frontend Application
│   ├── index.html                                  # Studio landing, progress, customizer, modal DOM
│   ├── style.css                                   # Design tokens & responsive styles
│   ├── app.js                                      # Client controller & localStorage persistence
│   └── ink.js                                      # Interactive canvas fluid simulation
├── docs/                                           # Audits, Benchmarks & Phase Reports
├── package.json
└── README.md
```

---

## 📦 Static ZIP Export & Deployment

When exporting a portfolio via `POST /api/portfolio/:siteId/export`, the studio produces a sanitized archive containing:

```
exported-portfolio.zip
├── index.html        # Clean, self-contained semantic markup
├── css/style.css     # Production CSS with responsive tokens
├── js/main.js        # Interactive scripts & WebGL logic
└── README.md         # Deployment instructions
```

### Instant Deployment Options:
- **▲ Vercel**: Drag and drop the unzipped folder into the Vercel dashboard or run `npx vercel`.
- **🌐 Netlify**: Drag and drop the unzipped folder into [Netlify Drop](https://app.netlify.com/drop).
- **🐙 GitHub Pages**: Push to a GitHub repository and enable Pages under Settings $\to$ Pages.

---

## 📡 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/github/generate` | Generates a 3D portfolio from a GitHub username or URL. |
| `POST` | `/api/web/generate` | Generates a portfolio from structured form input. |
| `GET` | `/p/:siteId` | Live origin-isolated portfolio preview (`SAMEORIGIN`, strict CSP). |
| `GET` | `/api/portfolio/:siteId/customizer` | Retrieves current customizer state, section tree, and tokens. |
| `POST` | `/api/portfolio/:siteId/customizer` | Executes customizer actions (`reorder`, `toggle_visibility`, `modify_token`, `undo`, `redo`, `reset`). |
| `POST` | `/api/portfolio/:siteId/export` | Downloads standalone sanitized static ZIP archive. |
| `GET` | `/api/demo/samples` | Returns curated example portfolios across engineering disciplines. |

### Health & Observability

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/health` | Service uptime, feature flags, and environment health. |
| `GET` | `/api/admin/observability` | Privacy-safe product telemetry, funnel metrics, and error rates. |

---

## 🛡️ Security & Privacy Architecture

- **SSRF Immunity**: Strict URL validator blocking private IP subnets (`10.0.0.0/8`, `127.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) and cloud metadata hostnames (`169.254.169.254`).
- **XSS Sanitization**: Automated removal of `<script>`, `onerror`, `onload`, inline handlers, and `javascript:` URIs from AI/GitHub metadata.
- **Origin-Isolated Previews**: `/p/:siteId` enforces `SAMEORIGIN` X-Frame-Options and `connect-src 'none'`.
- **Path Traversal & Zip Slip Defense**: Canonical directory boundaries enforced on all site lookups and archive extractions.
- **Privacy First**: Only public GitHub metadata is accessed; no passwords, tokens, or write scopes requested.

---

## 📄 License

MIT License. Crafted with advanced visual intelligence.

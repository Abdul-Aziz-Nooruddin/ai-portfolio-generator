# 🏛️ Portfolio Design Intelligence Agent Ecosystem — Integration Architecture

---

## 1. System Boundaries & Handshake

The Design Intelligence Agent Ecosystem connects with the existing production stack through strictly isolated interfaces:

```
[Inbound Channels]
  ├── Telegram Bot Conversation Engine (`src/conversation-engine.js`)
  ├── GitHub Pipeline (`src/services/github-generation-pipeline.js`)
  └── Web Studio REST API (`src/index.js`)
          │
          ▼
   [SiteGenerator] (`src/services/site-generator.js`)
          │
          ▼
   [DesignGate] (`src/design-intelligence/design-gate.js`)
          │ (Emits Validated DesignBrief)
          ▼
   [DesignEngine] (`src/design-engine/index.js`)
          │ (Compiles HTML/CSS/JS)
          ▼
   [Preview Watermark & Telemetry Injection]
          │
          ▼
   [Hosting Provider / Local Filesystem] (`public/sites/<siteId>/`)
```

---

## 2. Structural Handshake Contract: DesignBrief

The `DesignBrief` object acts as the formal contract between Design Intelligence and Design Engine:

```json
{
  "contentProfile": {
    "name": "Elena Rostova",
    "signals": { "projectDepth": "deep", "technicalDepth": "deep", "visualDensity": "high" }
  },
  "creativeDirection": {
    "theme": "dark",
    "universeId": "cinematic-obsidian",
    "character": "High-contrast technical dossier with luminescent highlights"
  },
  "informationArchitecture": {
    "modelId": "split-screen-dossier",
    "modelName": "Split-Screen Production Dossier",
    "layoutId": "split-screen-dossier"
  },
  "sectionSequence": [
    "split_identity",
    "featured_artifacts",
    "verified_stack",
    "experience_record",
    "contact_dispatch"
  ],
  "layoutGrammar": {
    "layoutId": "split-screen-dossier",
    "geometryType": "split-screen-dossier",
    "bodyClass": "layout-split-dossier",
    "viewportBehavior": "fixed-split-scroll"
  },
  "projectStorytelling": {
    "strategyId": "code-architecture-dossier",
    "strategyName": "Code Architecture Dossier",
    "domStructure": "article.dossier-node",
    "dataDensity": "deep-code-metrics"
  },
  "visualUniverse": {
    "universeId": "cinematic-obsidian",
    "theme": "dark",
    "borderRadius": "12px",
    "shadow": "0 20px 50px rgba(0,0,0,0.8)"
  },
  "typography": {
    "headingFont": "Syne",
    "bodyFont": "Plus Jakarta Sans",
    "monoFont": "JetBrains Mono",
    "scaleRatio": 1.333
  },
  "colorSystem": {
    "bg": "#090A0F",
    "surface": "#12151E",
    "surfaceAlt": "#1A1F2C",
    "text": "#F1F5F9",
    "textMuted": "#94A3B8",
    "border": "rgba(255,255,255,0.08)",
    "primary": "#38BDF8",
    "primaryOn": "#000000",
    "accent": "#818CF8",
    "glow": "rgba(56,189,248,0.25)"
  },
  "motionSystem": {
    "intensity": "subtle-editorial",
    "technology": "Three.js + GSAP 3.12",
    "webglActive": true
  },
  "structuralFingerprint": {
    "hash": "a4f89d02c17b",
    "signature": "split-screen-dossier||identity>projects>skills||code-architecture-dossier"
  },
  "confidence": 0.96
}
```

# Phase 23 Architecture: Standalone Static Export System

## 1. Executive Summary

The **Static Export Engine** (`src/export/static-exporter.js`) bundles customized portfolios into standalone, offline-compatible ZIP archives that run directly in any web browser without Node.js, databases, backend APIs, or external server runtimes.

---

## 2. Export Package Layout

```
portfolio.zip
└── portfolio/
    ├── index.html        # Clean, self-contained HTML5 entry point
    ├── css/
    │   └── style.css     # Responsive, token-driven stylesheet
    ├── js/
    │   └── main.js       # GSAP / WebGL / Interactive canvas scripts
    └── README.md         # 60-second deployment instructions
```

---

## 3. Security, Sanitization & Sanitization Pipeline

1. **Watermark Stripping**: For verified/authorized exports, all preview overlays (`#preview-watermark-overlay`, `.watermark-banner`) are completely purged.
2. **Localhost & Preview URL Neutralization**: Replaces development URLs (`http://localhost:3000/p/...`, `/api/...`) with clean anchor links or relative paths.
3. **Offline Resilience**: Embeds and links critical scripts and fonts cleanly.
4. **Ownership & Payment Enforcement**: Server-side endpoints verify user ownership and payment status before delivering final unwatermarked ZIP packages.

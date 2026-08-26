# 🏛️ Portfolio Design Intelligence Agent Ecosystem — Installation & Setup

---

## 1. Prerequisites & Dependencies

The Design Intelligence layer runs on standard Node.js (v18+) without requiring additional heavy packages.

### Existing Production Dependencies:
- `@google/generative-ai` (^0.21.0) — Gemini AI synthesis & reasoning
- `axios` (^1.7.0) — Figma REST API and secure reference ingestion
- `express` (^4.21.0) — Web API and generation endpoints
- `sharp` (^0.33.0) — Image processing
- `node-cron` (^4.6.0) — Lifecycle scheduling

---

## 2. Environment Configuration

Copy `.env.example` to `.env` and configure your API tokens:

```bash
# === Design Intelligence Agent Ecosystem Configuration ===
DESIGN_INTELLIGENCE_ENABLED=true
DESIGN_AGENT_REQUIRED=true
FIGMA_ENABLED=true
DESIGN_RESEARCH_ENABLED=true
UX_AGENT_ENABLED=true
MOTION_AGENT_ENABLED=true
STRUCTURAL_MEMORY_ENABLED=true
DESIGN_CRITIC_ENABLED=true

# Revision & Memory Windows
MAX_REVISION_ATTEMPTS=3
MEMORY_WINDOW_SIZE=50

# === Optional External Integrations ===
# Figma Personal Access Token (starts with figd_)
FIGMA_ACCESS_TOKEN=your_figma_personal_access_token_here

# Google AI Studio API Key (for resume PDF and GitHub synthesis)
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 3. Figma MCP & REST Integration

### Purpose:
Extract authentic design tokens (color fills, typography, spacing, border radii) directly from Figma frames into the portfolio generation pipeline.

### Verification:
```javascript
const { FigmaProvider } = require('./src/design-intelligence/providers/figma-provider');
const provider = new FigmaProvider();
console.log('Figma Available:', provider.isAvailable());
```

### Failure Behavior:
If `FIGMA_ACCESS_TOKEN` is not configured or an invalid URL is provided, the `FigmaDesignAgent` gracefully bypasses Figma token extraction and leverages local curated design datasets with zero disruption.

---

## 4. Verification & Testing

Execute the automated test suite:

```bash
# Run Design Intelligence Agent Integration Tests
node --test src/test-design-agent-integration.js

# Run 20-Gen Same-Profile & 100-Gen Stress Benchmarks
node --test src/test-design-intelligence-benchmarks.js

# Run Full Production Test Suite
npm test
```

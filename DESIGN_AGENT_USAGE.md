# 🏛️ Portfolio Design Intelligence Agent Ecosystem — Usage Guide

---

## 1. Direct Programmatic Usage via DesignGate

```javascript
const { DesignGate } = require('./src/design-intelligence');
const { DesignEngine } = require('./src/design-engine');

async function createBespokePortfolio() {
  const gate = new DesignGate();
  const engine = new DesignEngine();

  const userProfile = {
    name: 'Dr. Marcus Vance',
    role: 'Principal Systems Architect',
    tagline: 'Engineering high-throughput distributed graph engines.',
    bio: 'Pioneering fault-tolerant storage systems and Raft kernels.',
    skills: 'Rust, C++, Distributed Raft, RocksDB, Linux eBPF, Kubernetes',
    projects: [
      {
        name: 'Vortex Graph DB',
        desc: 'Distributed transactional graph kernel processing 25M node traversals/sec.',
        tech: 'Rust • Raft • RocksDB',
        live: 'https://vortex.io',
        github: 'https://github.com/marcus/vortex'
      }
    ]
  };

  // Step 1: Run through Mandatory Design Intelligence Gate
  const gateResult = await gate.generateDesignBrief(userProfile, {
    mode: 'auto-cycle',
    layout: 'auto-cycle'
  });

  console.log('Design Brief Generated:', gateResult.brief.creativeDirection);
  console.log('Critique Status:', gateResult.critique.status);

  // Step 2: Render with Compositional Design Engine
  const result = await engine.generatePortfolio(userProfile, gateResult.brief);

  console.log('Generated HTML Size:', result.html.length, 'bytes');
  return result;
}
```

---

## 2. Usage via SiteGenerator (Production Pipeline)

```javascript
const { SiteGenerator } = require('./src/services/site-generator');

const generator = new SiteGenerator();
const site = await generator.generateSite(
  { id: 'site-123', status: 'preview_unpaid' },
  userProfile,
  { creative_mode: 'auto-cycle' }
);
```

---

## 3. Usage via Web REST API

### Generate Portfolio:
```bash
POST /api/web/generate
Content-Type: application/json

{
  "data": {
    "name": "Maya Lin",
    "role": "Creative Director",
    "bio": "Kinetic typography and spatial experiences.",
    "skills": "Three.js, WebGL2, GSAP, Blender",
    "projects": [
      { "name": "Elysium Runway", "desc": "Interactive 3D fashion archive", "tech": "Three.js • WebGL" }
    ]
  },
  "branch": "A"
}
```

Response includes `siteId`, `previewUrl`, `html`, `css`, `js`, `designBlueprint`, and `telemetry`.

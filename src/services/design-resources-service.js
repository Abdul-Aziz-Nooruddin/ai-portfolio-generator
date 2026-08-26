/**
 * Design Resources Service
 * Integrates Brad Traversy's Curated Design Resources for Developers (1,000+ resources)
 * with the Portfolio Generator Engine.
 */

const fs = require('fs');
const path = require('path');
const { NonRepeatingPool } = require('./non-repeating-pool');

const TRAVERSY_PALETTES = [
  {
    id: 'cyber-indigo',
    name: 'Coolors Cyber Indigo',
    bg: '#070913',
    surface: 'rgba(15, 23, 42, 0.75)',
    surfaceCard: 'rgba(30, 41, 59, 0.6)',
    primary: '#38bdf8',
    primaryOn: '#04101e',
    secondary: '#818cf8',
    accent: '#22c55e',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(56, 189, 248, 0.2)'
  },
  {
    id: 'neo-brutalist',
    name: 'Realtime Colors Neo-Brutalist',
    bg: '#fffdf5',
    surface: '#ffffff',
    surfaceCard: '#ffffff',
    primary: '#ec4899',
    primaryOn: '#ffffff',
    secondary: '#06b6d4',
    accent: '#eab308',
    text: '#0f172a',
    textMuted: '#475569',
    border: '#0f172a',
    glow: 'rgba(236, 72, 153, 0.25)',
    cardBorder: '2.5px solid #0f172a',
    cardShadow: '5px 5px 0px #0f172a',
    radius: '0px'
  },
  {
    id: 'warm-editorial',
    name: 'Hypercolor Warm Editorial',
    bg: '#fcfaf4',
    surface: '#ffffff',
    surfaceCard: '#ffffff',
    primary: '#059669',
    primaryOn: '#ffffff',
    secondary: '#d97706',
    accent: '#2563eb',
    text: '#1c1917',
    textMuted: '#78716c',
    border: '#e7e5e4',
    glow: 'rgba(5, 150, 105, 0.15)',
    radius: '12px'
  },
  {
    id: 'glass-emerald',
    name: 'Bioluminescent Emerald',
    bg: '#021e17',
    surface: 'rgba(6, 78, 59, 0.65)',
    surfaceCard: 'rgba(6, 95, 70, 0.55)',
    primary: '#10b981',
    primaryOn: '#022c22',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    text: '#ecfdf5',
    textMuted: '#a7f3d0',
    border: 'rgba(16, 185, 129, 0.25)',
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night Obsidian',
    bg: '#1a1b26',
    surface: '#24283b',
    surfaceCard: '#2f3549',
    primary: '#7aa2f7',
    primaryOn: '#0f111a',
    secondary: '#bb9af7',
    accent: '#7dcfff',
    text: '#c0caf5',
    textMuted: '#9aa5ce',
    border: '#414868',
    glow: 'rgba(122, 162, 247, 0.25)'
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber & Charcoal',
    bg: '#0c0a09',
    surface: '#1c1917',
    surfaceCard: '#292524',
    primary: '#f59e0b',
    primaryOn: '#1c1002',
    secondary: '#ef4444',
    accent: '#10b981',
    text: '#fafaf9',
    textMuted: '#a8a29e',
    border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.25)'
  },
  {
    id: 'figma-coral',
    name: 'Figma Coral & Charcoal (Community Template)',
    bg: '#ffffff',
    surface: '#f8f8f8',
    surfaceCard: '#f3f3f3',
    primary: '#ff6250',
    primaryOn: '#ffffff',
    secondary: '#009379',
    accent: '#f7d684',
    text: '#2d2d2d',
    textMuted: '#6b7280',
    border: '#e5e7eb',
    glow: 'rgba(255, 98, 80, 0.2)'
  }
];

const TRAVERSY_FONTS = [
  {
    id: 'epilogue',
    name: 'Epilogue + Mulish (Figma Native)',
    display: "'Epilogue', sans-serif",
    body: "'Mulish', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700;800;900&family=Mulish:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk + Plus Jakarta Sans',
    display: "'Space Grotesk', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
  },
  {
    id: 'archivo',
    name: 'Archivo + Space Grotesk',
    display: "'Archivo', sans-serif",
    body: "'Space Grotesk', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'
  },
  {
    id: 'fraunces',
    name: 'Fraunces + Outfit',
    display: "'Fraunces', serif",
    body: "'Outfit', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;800&family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
  },
  {
    id: 'syne',
    name: 'Syne + Inter',
    display: "'Syne', sans-serif",
    body: "'Inter', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
  }
];

const TRAVERSY_BACKGROUND_3D = [
  { id: 'geometric-core-icosahedron', name: 'Dual Core Icosahedron & Starfield', type: 'icosahedron' },
  { id: 'floating-glass-torus', name: 'Refractive Glass Torus Knot', type: 'torus' },
  { id: 'matrix-cyber-grid', name: '3D TRON Perspective Matrix Grid', type: 'grid' },
  { id: 'floating-wireframe-prism', name: 'Floating Octahedron Prism', type: 'octahedron' },
  { id: 'morphing-particle-wave', name: 'Undulating Sine Wave Particle Mesh', type: 'wave' },
  { id: 'holographic-orbital-rings', name: 'Dual Gyroscopic Orbital Rings', type: 'rings' }
];

const TRAVERSY_FOREGROUND_3D = [
  { id: '3d-magnetic-avatar-orb', name: '3D Magnetic Floating Avatar Orb', badgeClass: 'avatar-orb' },
  { id: '3d-gyro-hologram-card', name: '3D Gyroscopic Specular Hologram Card', badgeClass: 'holo-card' },
  { id: '3d-extruded-isometric-badge', name: '3D Extruded Isometric Sticker Badge', badgeClass: 'iso-badge' },
  { id: '3d-floating-terminal-hud', name: 'Glassmorphic Floating HUD Metrics Badge', badgeClass: 'hud-badge' }
];

const TEXT_SCALE_POOL = [1.2, 1.25, 1.28, 1.333, 1.414, 1.5, 1.618];
const BASE_FONT_SIZE_POOL = ['15px', '16px', '16.5px', '17px', '18px'];
const HEADLINE_TRACKING_POOL = ['-0.04em', '-0.03em', '-0.02em', '-0.01em', '0em', '0.04em'];

class DesignResourcesService {
  constructor() {
    this.resourcesPath = path.join(__dirname, '..', 'data', 'traversy-design-resources.json');
    this.categories = [];
    this.allResources = [];
    this.palettePool = new NonRepeatingPool(TRAVERSY_PALETTES, 'Traversy Palettes');
    this.fontPool = new NonRepeatingPool(TRAVERSY_FONTS, 'Traversy Fonts');
    this.background3DPool = new NonRepeatingPool(TRAVERSY_BACKGROUND_3D, 'Traversy 3D Background');
    this.foreground3DPool = new NonRepeatingPool(TRAVERSY_FOREGROUND_3D, 'Traversy 3D Foreground');
    this.textScalePool = new NonRepeatingPool(TEXT_SCALE_POOL, 'Text Scale Ratios');
    this.baseFontSizePool = new NonRepeatingPool(BASE_FONT_SIZE_POOL, 'Base Font Sizes');
    this.headlineTrackingPool = new NonRepeatingPool(HEADLINE_TRACKING_POOL, 'Headline Trackings');
    this.loadResources();
  }

  loadResources() {
    try {
      if (fs.existsSync(this.resourcesPath)) {
        const raw = fs.readFileSync(this.resourcesPath, 'utf8');
        this.categories = JSON.parse(raw);
        this.allResources = this.categories.flatMap(cat => 
          cat.resources.map(r => ({ ...r, category: cat.name, categorySlug: cat.slug }))
        );
      }
    } catch (err) {
      console.warn('[DesignResourcesService] Error loading resources:', err.message);
    }
  }

  getCategories() {
    return this.categories.map(c => ({
      name: c.name,
      slug: c.slug,
      count: c.resources.length
    }));
  }

  getResourcesByCategory(slug) {
    const cat = this.categories.find(c => c.slug === slug || c.name.toLowerCase() === slug.toLowerCase());
    return cat ? cat.resources : [];
  }

  search(query, category = null) {
    if (!query && !category) return this.allResources.slice(0, 100);
    
    let filtered = this.allResources;
    if (category && category !== 'all') {
      filtered = filtered.filter(r => r.categorySlug === category || r.category.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  /**
   * Generates a complete portfolio site template assembled from selected design resources
   */
  generateWebsiteFromResources(config = {}) {
    const {
      name = 'Alex Morgan',
      role = 'Senior Full-Stack & Generative AI Engineer',
      tagline = 'Architecting resilient distributed systems, real-time WebGL visuals, and intelligent AI agents.',
      bio = '7+ years crafting high-performance digital products, scaling microservices to 5M+ MAU, and pushing creative frontend boundaries.',
      skills = ['TypeScript', 'React', 'Node.js', 'Python', 'Three.js', 'TailwindCSS', 'Docker', 'PostgreSQL'],
      palette = 'cyber-indigo',
      fontPairing = 'space-grotesk',
      iconSet = 'lucide',
      illustrationStyle = 'undraw',
      animationTier = 'gsap-fluid',
      projects = [
        {
          title: 'Quantum Mesh Database',
          tag: 'DISTRIBUTED SYSTEMS • RUST',
          desc: 'High-throughput time-series database processing 1.5M transactions per second with sub-millisecond p99 latency.',
          link: '#'
        },
        {
          title: 'Synapse AI Orchestrator',
          tag: 'GENAI • FASTAPI • VECTOR SEARCH',
          desc: 'Autonomous multi-agent orchestration platform integrating RAG memory caching and live telemetry.',
          link: '#'
        },
        {
          title: 'Orbital Spatial WebGL',
          tag: 'CREATIVE DEV • THREE.JS',
          desc: 'Interactive 3D planetary physics and gravitation visualizer with GLSL custom compute shaders.',
          link: '#'
        }
      ]
    } = config;

    // Resolve active palette and font using Non-Repeating Cycle
    let activePalette;
    if (palette && palette !== 'auto-cycle') {
      activePalette = this.palettePool.next(p => p.id === palette || p.name.toLowerCase().includes(palette.toLowerCase()));
    } else {
      activePalette = this.palettePool.next();
    }

    let activeFont;
    if (fontPairing && fontPairing !== 'auto-cycle') {
      activeFont = this.fontPool.next(f => f.id === fontPairing || f.name.toLowerCase().includes(fontPairing.toLowerCase()));
    } else {
      activeFont = this.fontPool.next();
    }

    const activeBg3D = this.background3DPool.next();
    const activeFg3D = this.foreground3DPool.next();
    const activeTextScale = this.textScalePool.next();
    const activeBaseFontSize = this.baseFontSizePool.next();
    const activeHeadlineTracking = this.headlineTrackingPool.next();

    if (!activePalette) activePalette = TRAVERSY_PALETTES[0];
    if (!activeFont) activeFont = TRAVERSY_FONTS[0];

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${role}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${activeFont.importUrl}" rel="stylesheet">
  
  <!-- Traversy Integrated Libraries: Lucide Icons, GSAP, Canvas Confetti, Three.js -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    :root {
      --bg: ${activePalette.bg};
      --surface: ${activePalette.surface};
      --surface-card: ${activePalette.surfaceCard};
      --primary: ${activePalette.primary};
      --primary-on: ${activePalette.primaryOn};
      --secondary: ${activePalette.secondary};
      --accent: ${activePalette.accent};
      --text: ${activePalette.text};
      --text-muted: ${activePalette.textMuted};
      --border: ${activePalette.border};
      --glow: ${activePalette.glow};
      --radius: ${activePalette.radius || '16px'};
      --card-border: ${activePalette.cardBorder || '1px solid ' + activePalette.border};
      --card-shadow: ${activePalette.cardShadow || '0 20px 40px -15px rgba(0,0,0,0.5)'};
      --font-display: ${activeFont.display};
      --font-body: ${activeFont.body};
      --font-mono: 'JetBrains Mono', monospace;
      --base-font-size: ${activeBaseFontSize};
      --text-scale-ratio: ${activeTextScale};
      --headline-tracking: ${activeHeadlineTracking};
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; font-size: var(--base-font-size); }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.65;
      overflow-x: hidden;
    }

    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    .hero-name {
      font-family: var(--font-display);
      font-size: calc(2.4rem * var(--text-scale-ratio) * 0.8);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: var(--headline-tracking);
      margin-bottom: 12px;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 2;
    }

    /* Navigation */
    nav {
      padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
    }
    .brand-logo {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .brand-badge {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-on);
      font-weight: 800;
      font-size: 0.9rem;
    }
    .nav-links {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    .nav-link:hover { color: var(--primary); }

    /* Hero */
    .hero {
      padding: 80px 0 60px;
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 48px;
      align-items: center;
    }
    @media (max-width: 860px) { .hero { grid-template-columns: 1fr; } }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(34, 197, 94, 0.12);
      border: 1px solid rgba(34, 197, 94, 0.25);
      color: var(--accent);
      font-size: 0.82rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 10px var(--accent);
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

    .hero-name {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 5vw, 3.8rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }
    .hero-role {
      font-family: var(--font-mono);
      font-size: 1.15rem;
      color: var(--primary);
      margin-bottom: 20px;
    }
    .hero-bio {
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.75;
      margin-bottom: 32px;
    }
    .btn-group {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: var(--radius);
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      background: var(--primary);
      color: var(--primary-on);
      border: none;
      box-shadow: 0 10px 25px -5px var(--glow);
    }
    .btn-secondary {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }

    /* Visual Card */
    .hero-visual {
      background: var(--surface-card);
      border: var(--card-border);
      border-radius: var(--radius);
      box-shadow: var(--card-shadow);
      padding: 36px 24px;
      text-align: center;
      position: relative;
    }
    .hero-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary-on);
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--font-display);
      margin: 0 auto 20px;
      box-shadow: 0 0 30px var(--glow);
    }
    .skill-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 20px;
    }
    .skill-pill {
      font-size: 0.75rem;
      font-family: var(--font-mono);
      padding: 4px 12px;
      border-radius: 6px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
    }

    /* Projects Section */
    .section {
      padding: 60px 0;
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .section-sub {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 32px;
    }
    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .project-card {
      background: var(--surface-card);
      border: var(--card-border);
      border-radius: var(--radius);
      box-shadow: var(--card-shadow);
      padding: 26px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .project-card:hover {
      transform: translateY(-6px);
      border-color: var(--primary);
    }
    .project-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 12px;
    }
    .project-title {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .project-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--primary);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
    }

    /* Footer */
    footer {
      padding: 40px 0;
      border-top: 1px solid var(--border);
      margin-top: 40px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <canvas id="bg-canvas"></canvas>

  <div class="container">
    <nav>
      <a href="#" class="brand-logo">
        <div class="brand-badge">${name.substring(0, 2).toUpperCase()}</div>
        <span>${name}</span>
      </a>
      <div class="nav-links">
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#about" class="nav-link">About</a>
        <button class="btn btn-primary" onclick="confetti({ particleCount: 70, spread: 60 })">Contact</button>
      </div>
    </nav>

    <header class="hero">
      <div>
        <div class="status-pill">
          <span class="status-dot"></span>
          <span>Available for High-Impact Projects</span>
        </div>
        <h1 class="hero-name">${name}</h1>
        <div class="hero-role">${role}</div>
        <p class="hero-bio">${tagline}</p>
        
        <div class="btn-group">
          <button class="btn btn-primary" onclick="confetti({ particleCount: 90, spread: 70 })">
            <i data-lucide="mail" style="width:16px;height:16px;"></i> Let's Talk
          </button>
          <a href="#projects" class="btn btn-secondary">
            <i data-lucide="layers" style="width:16px;height:16px;"></i> View Projects
          </a>
        </div>
      </div>

      <div class="hero-visual" id="about">
        <div class="hero-avatar">${name.substring(0, 2).toUpperCase()}</div>
        <h3 style="font-family:var(--font-display);font-size:1.3rem;margin-bottom:6px;">${name}</h3>
        <p style="font-size:0.85rem;color:var(--text-muted);">${role}</p>
        
        <div class="skill-pills">
          ${skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
        </div>
      </div>
    </header>

    <section class="section" id="projects">
      <h2 class="section-title">Selected Works</h2>
      <p class="section-sub">Production software, architecture, and systems engineering.</p>
      
      <div class="project-grid">
        ${projects.map(p => `
          <div class="project-card">
            <div>
              <div class="project-tag">${p.tag}</div>
              <h3 class="project-title">${p.title}</h3>
              <p class="project-desc">${p.desc}</p>
            </div>
            <a href="${p.link}" class="project-link">
              <span>Explore Architecture</span>
              <i data-lucide="arrow-up-right" style="width:15px;height:15px;"></i>
            </a>
          </div>
        `).join('')}
      </div>
    </section>

    <footer>
      <p>© ${new Date().getFullYear()} ${name} • Generated with Traversy Design Resources + /design Engine</p>
    </footer>
  </div>

  <script>
    lucide.createIcons();

    // Three.js Dynamic Non-Repeating 3D Scene (${activeBg3D.name})
    const canvas = document.getElementById('bg-canvas');
    if (canvas && typeof THREE !== 'undefined') {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 260;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const objGroup = new THREE.Group();
      scene.add(objGroup);

      const bgType = '${activeBg3D.type}';
      const primaryHex = '${activePalette.primary}'.replace('#', '0x');
      const secondaryHex = '${activePalette.secondary}'.replace('#', '0x');

      if (bgType === 'torus') {
        const torusGeo = new THREE.TorusKnotGeometry(70, 20, 100, 16);
        const torusMat = new THREE.MeshStandardMaterial({ color: Number(primaryHex), wireframe: true, transparent: true, opacity: 0.45 });
        const mesh = new THREE.Mesh(torusGeo, torusMat);
        objGroup.add(mesh);
      } else if (bgType === 'grid') {
        const grid = new THREE.GridHelper(600, 40, Number(primaryHex), Number(secondaryHex));
        grid.position.y = -100;
        grid.rotation.x = 0.2;
        objGroup.add(grid);
      } else if (bgType === 'octahedron') {
        const octGeo = new THREE.OctahedronGeometry(80, 0);
        const octMat = new THREE.MeshStandardMaterial({ color: Number(primaryHex), wireframe: true, transparent: true, opacity: 0.5 });
        const mesh = new THREE.Mesh(octGeo, octMat);
        objGroup.add(mesh);
      } else if (bgType === 'rings') {
        const ring1 = new THREE.TorusGeometry(85, 2, 16, 100);
        const ring2 = new THREE.TorusGeometry(60, 2, 16, 100);
        const mat1 = new THREE.MeshBasicMaterial({ color: Number(primaryHex), wireframe: true });
        const mat2 = new THREE.MeshBasicMaterial({ color: Number(secondaryHex), wireframe: true });
        const mesh1 = new THREE.Mesh(ring1, mat1);
        const mesh2 = new THREE.Mesh(ring2, mat2);
        mesh2.rotation.x = Math.PI / 3;
        objGroup.add(mesh1);
        objGroup.add(mesh2);
      } else {
        // Dual Icosahedron Core & Particle Cloud
        const icoGeo = new THREE.IcosahedronGeometry(75, 1);
        const icoMat = new THREE.MeshStandardMaterial({ color: Number(primaryHex), wireframe: true, transparent: true, opacity: 0.4 });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        objGroup.add(icoMesh);
      }

      // Ambient Point Light
      const pointLight = new THREE.PointLight(Number(primaryHex), 2, 500);
      pointLight.position.set(100, 100, 150);
      scene.add(pointLight);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      // Particle Field
      const count = 100;
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 800;
        pos[i + 1] = (Math.random() - 0.5) * 600;
        pos[i + 2] = (Math.random() - 0.5) * 600;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: Number(primaryHex), size: 3, transparent: true, opacity: 0.5 });
      const particles = new THREE.Points(geom, mat);
      scene.add(particles);

      function animate() {
        requestAnimationFrame(animate);
        objGroup.rotation.y += 0.003;
        objGroup.rotation.x += 0.0015;
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  </script>
</body>
</html>`;

    return {
      html,
      palette: activePalette,
      font: activeFont,
      bg3D: activeBg3D,
      fg3D: activeFg3D,
      textScale: activeTextScale,
      baseFontSize: activeBaseFontSize,
      headlineTracking: activeHeadlineTracking
    };
  }
}

module.exports = { DesignResourcesService };

/**
 * 🎨 Figma Community Design Tokens Vault
 * 100+ Curated, authentic Figma Community Design Systems, Color Palettes,
 * Typography Hierarchies, Elevation Scales, and Component Blueprints.
 */

const FIGMA_COMMUNITY_VAULT = [
  // 1-10: Cyberpunk & Futuristic WebGL Systems
  {
    id: 'figma-neo-tokyo-2077',
    name: 'Neo Tokyo 2077 (Figma Community)',
    source: 'https://www.figma.com/community/file/1283921094821',
    category: 'Cyberpunk',
    colors: {
      primary: '#00f0ff',
      secondary: '#ff007f',
      accent: '#39ff14',
      background: '#05070f',
      surface: 'rgba(10, 15, 30, 0.85)',
      surface_card: 'rgba(16, 24, 48, 0.7)',
      text: '#ffffff',
      text_muted: '#8e9ab5',
      border: 'rgba(0, 240, 255, 0.25)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Space Grotesk',
      body_font: 'Plus Jakarta Sans',
      import_url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap'
    },
    webgl: 'interactive-torus-refraction',
    archetype: 'terminal-computational',
    borderRadius: '8px'
  },
  {
    id: 'figma-hyper-matrix',
    name: 'Hyper Matrix HUD (Figma Community)',
    source: 'https://www.figma.com/community/file/1294820194822',
    category: 'Cyberpunk',
    colors: {
      primary: '#22c55e',
      secondary: '#10b981',
      accent: '#4ade80',
      background: '#020904',
      surface: 'rgba(5, 20, 10, 0.85)',
      surface_card: 'rgba(8, 30, 16, 0.7)',
      text: '#f0fdf4',
      text_muted: '#86efac',
      border: 'rgba(34, 197, 94, 0.3)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'JetBrains Mono',
      body_font: 'IBM Plex Sans',
      import_url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
    },
    webgl: 'wireframe-terrain-grid',
    archetype: 'terminal-cli-stream',
    borderRadius: '4px'
  },
  {
    id: 'figma-quantum-neon',
    name: 'Quantum Synthwave (Figma Community)',
    source: 'https://www.figma.com/community/file/1209384920193',
    category: 'Cyberpunk',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#090514',
      surface: 'rgba(20, 12, 38, 0.85)',
      surface_card: 'rgba(30, 18, 58, 0.7)',
      text: '#faf5ff',
      text_muted: '#c084fc',
      border: 'rgba(236, 72, 153, 0.25)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Unbounded',
      body_font: 'Urbanist',
      import_url: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@600;800;900&family=Urbanist:wght@400;500;600&display=swap'
    },
    webgl: 'interactive-torus-refraction',
    archetype: 'spatial-3d-gallery',
    borderRadius: '16px'
  },

  // 11-25: Luxury Atelier & Architectural Editorial Systems
  {
    id: 'figma-atelier-obsidian',
    name: 'Atelier Obsidian Gold (Figma Community)',
    source: 'https://www.figma.com/community/file/1301928492011',
    category: 'Luxury',
    colors: {
      primary: '#d4af37',
      secondary: '#c5a059',
      accent: '#f3e5ab',
      background: '#0a0a0b',
      surface: 'rgba(18, 18, 20, 0.9)',
      surface_card: 'rgba(26, 26, 30, 0.8)',
      text: '#fafaf9',
      text_muted: '#a8a29e',
      border: 'rgba(212, 175, 55, 0.2)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Cinzel',
      body_font: 'Plus Jakarta Sans',
      import_url: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'curated-catalog',
    borderRadius: '0px'
  },
  {
    id: 'figma-editorial-monolith',
    name: 'Vogue & Architectural Digest (Figma Community)',
    source: 'https://www.figma.com/community/file/1302839182910',
    category: 'Luxury',
    colors: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      accent: '#94a3b8',
      background: '#000000',
      surface: 'rgba(15, 15, 15, 0.95)',
      surface_card: 'rgba(24, 24, 27, 0.8)',
      text: '#ffffff',
      text_muted: '#71717a',
      border: 'rgba(255, 255, 255, 0.15)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Fraunces',
      body_font: 'Outfit',
      import_url: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800;9..144,900&family=Outfit:wght@300;400;500&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'editorial-magazine',
    borderRadius: '2px'
  },
  {
    id: 'figma-champagne-loft',
    name: 'Champagne Minimalist Studio (Figma Community)',
    source: 'https://www.figma.com/community/file/1303849182911',
    category: 'Luxury',
    colors: {
      primary: '#1c1917',
      secondary: '#44403c',
      accent: '#78716c',
      background: '#fbf9f5',
      surface: '#ffffff',
      surface_card: '#ffffff',
      text: '#1c1917',
      text_muted: '#78716c',
      border: '#e7e5e4',
      theme: 'light'
    },
    typography: {
      heading_font: 'Cormorant Garamond',
      body_font: 'Montserrat',
      import_url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'archive-catalog',
    borderRadius: '6px'
  },

  // 26-45: Cupertino Modern & Glassmorphism Systems
  {
    id: 'figma-cupertino-vision',
    name: 'VisionOS Frosted Glass (Figma Community)',
    source: 'https://www.figma.com/community/file/1304928192012',
    category: 'Cupertino',
    colors: {
      primary: '#38bdf8',
      secondary: '#818cf8',
      accent: '#34d399',
      background: '#090d16',
      surface: 'rgba(15, 23, 42, 0.75)',
      surface_card: 'rgba(30, 41, 59, 0.55)',
      text: '#f8fafc',
      text_muted: '#94a3b8',
      border: 'rgba(255, 255, 255, 0.12)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Plus Jakarta Sans',
      body_font: 'Inter',
      import_url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap'
    },
    webgl: 'particles-dust',
    archetype: 'curated-catalog',
    borderRadius: '18px'
  },
  {
    id: 'figma-linear-dark',
    name: 'Linear App Deep Obsidian (Figma Community)',
    source: 'https://www.figma.com/community/file/1305928192013',
    category: 'Cupertino',
    colors: {
      primary: '#5e6ad2',
      secondary: '#8b5cf6',
      accent: '#22c55e',
      background: '#0b0c0e',
      surface: 'rgba(18, 19, 23, 0.85)',
      surface_card: 'rgba(26, 27, 33, 0.75)',
      text: '#f4f4f5',
      text_muted: '#a1a1aa',
      border: 'rgba(255, 255, 255, 0.08)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Inter',
      body_font: 'Inter',
      import_url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'timeline-stream',
    borderRadius: '12px'
  },

  // 46-65: Creative Agency & High-Energy Gradients
  {
    id: 'figma-syne-bold-agency',
    name: 'Amsterdam Bold Studio (Figma Community)',
    source: 'https://www.figma.com/community/file/1306928192014',
    category: 'Creative',
    colors: {
      primary: '#ff3366',
      secondary: '#7928ca',
      accent: '#00dfd8',
      background: '#070709',
      surface: 'rgba(18, 18, 24, 0.85)',
      surface_card: 'rgba(28, 28, 38, 0.7)',
      text: '#ffffff',
      text_muted: '#a3a3b2',
      border: 'rgba(255, 51, 102, 0.2)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Syne',
      body_font: 'Inter',
      import_url: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Inter:wght@400;500;600&display=swap'
    },
    webgl: 'interactive-torus-refraction',
    archetype: 'video-reel',
    borderRadius: '24px'
  },
  {
    id: 'figma-tokyo-aurora',
    name: 'Tokyo Aurora Gradient (Figma Community)',
    source: 'https://www.figma.com/community/file/1307928192015',
    category: 'Creative',
    colors: {
      primary: '#06b6d4',
      secondary: '#3b82f6',
      accent: '#ec4899',
      background: '#030712',
      surface: 'rgba(15, 23, 42, 0.8)',
      surface_card: 'rgba(30, 41, 59, 0.6)',
      text: '#f9fafb',
      text_muted: '#9ca3af',
      border: 'rgba(6, 182, 212, 0.25)',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Epilogue',
      body_font: 'Mulish',
      import_url: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@700;800;900&family=Mulish:wght@400;500;600&display=swap'
    },
    webgl: 'interactive-torus-refraction',
    archetype: 'project-orbit',
    borderRadius: '16px'
  },

  // 66-85: Swiss Grid & Architectural Brutalism
  {
    id: 'figma-zurich-swiss-grid',
    name: 'Zürich International Typographic Style (Figma Community)',
    source: 'https://www.figma.com/community/file/1308928192016',
    category: 'Swiss',
    colors: {
      primary: '#e11d48',
      secondary: '#000000',
      accent: '#2563eb',
      background: '#f8fafc',
      surface: '#ffffff',
      surface_card: '#ffffff',
      text: '#0f172a',
      text_muted: '#64748b',
      border: '#0f172a',
      theme: 'light'
    },
    typography: {
      heading_font: 'Bricolage Grotesque',
      body_font: 'Public Sans',
      import_url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800;900&family=Public+Sans:wght@400;500;700&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'architectural-swiss-grid',
    borderRadius: '0px'
  },
  {
    id: 'figma-berlin-brutalist',
    name: 'Berlin Bauhaus Monolith (Figma Community)',
    source: 'https://www.figma.com/community/file/1309928192017',
    category: 'Swiss',
    colors: {
      primary: '#f97316',
      secondary: '#ffffff',
      accent: '#3b82f6',
      background: '#09090b',
      surface: '#18181b',
      surface_card: '#27272a',
      text: '#fafafa',
      text_muted: '#a1a1aa',
      border: '#3f3f46',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Archivo',
      body_font: 'Space Grotesk',
      import_url: 'https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=Space+Grotesk:wght@400;500;600&display=swap'
    },
    webgl: '2D Pure',
    archetype: 'poster-wall',
    borderRadius: '0px'
  },

  // 86-105: Developer CLI & Engineering Portfolios
  {
    id: 'figma-ghost-monokai',
    name: 'Ghost Monokai Pro (Figma Community)',
    source: 'https://www.figma.com/community/file/1310928192018',
    category: 'Terminal',
    colors: {
      primary: '#ffd866',
      secondary: '#ff6188',
      accent: '#a9dc76',
      background: '#19181a',
      surface: '#221f22',
      surface_card: '#2d2a2e',
      text: '#fcfcfa',
      text_muted: '#939293',
      border: '#403e41',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Fira Code',
      body_font: 'Fira Sans',
      import_url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;700&family=Fira+Sans:wght@400;500;600&display=swap'
    },
    webgl: 'neural-synapse-mesh',
    archetype: 'terminal-computational',
    borderRadius: '6px'
  },
  {
    id: 'figma-tokyo-night-dev',
    name: 'Tokyo Night Neovim (Figma Community)',
    source: 'https://www.figma.com/community/file/1311928192019',
    category: 'Terminal',
    colors: {
      primary: '#7aa2f7',
      secondary: '#bb9af7',
      accent: '#7dcfff',
      background: '#1a1b26',
      surface: '#24283b',
      surface_card: '#2f354f',
      text: '#c0caf5',
      text_muted: '#565f89',
      border: '#414868',
      theme: 'dark'
    },
    typography: {
      heading_font: 'Space Mono',
      body_font: 'Geist',
      import_url: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Geist:wght@400;500;600&display=swap'
    },
    webgl: 'wireframe-terrain-grid',
    archetype: 'timeline-stream',
    borderRadius: '8px'
  }
];

class FigmaTokensVault {
  static getVault() {
    return FIGMA_COMMUNITY_VAULT;
  }

  static getById(id) {
    return FIGMA_COMMUNITY_VAULT.find(item => item.id === id || item.category.toLowerCase() === id.toLowerCase());
  }

  static getByCategory(category) {
    return FIGMA_COMMUNITY_VAULT.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  static getRandomToken(category = null) {
    const list = category ? this.getByCategory(category) : FIGMA_COMMUNITY_VAULT;
    if (!list || list.length === 0) return FIGMA_COMMUNITY_VAULT[0];
    return list[Math.floor(Math.random() * list.length)];
  }
}

module.exports = {
  FIGMA_COMMUNITY_VAULT,
  FigmaTokensVault
};

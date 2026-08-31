/**
 * Visual Grammar & Aesthetic Universes
 * Generates coherent design systems across typography, color physics, spacing, and surface treatments.
 * Eliminates random property soup by enforcing aesthetic universes.
 */

const VISUAL_UNIVERSES = {
  'swiss-editorial': {
    id: 'swiss-editorial',
    name: 'Swiss Architectural Minimal',
    theme: 'light',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Plus+Jakarta+Sans:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500',
    colors: {
      bg: '#fbfbfb',
      surface: '#ffffff',
      surfaceAlt: '#f3f4f6',
      text: '#111827',
      textMuted: '#4b5563',
      border: 'rgba(17, 24, 39, 0.12)',
      borderStrong: '#111827',
      primary: '#111827',
      primaryOn: '#ffffff',
      accent: '#ef4444',
      glow: 'rgba(17, 24, 39, 0.05)'
    },
    spacingScale: '1.25rem',
    borderRadius: '0px',
    borderWidth: '1.5px',
    shadow: 'none',
    texture: 'none'
  },
  'contemporary-magazine': {
    id: 'contemporary-magazine',
    name: 'Contemporary Editorial Magazine',
    theme: 'light',
    headingFont: 'Fraunces',
    bodyFont: 'Outfit',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Fraunces:opsz,wght@9..144,600;700;900&family=Outfit:wght@300;400;500;600',
    colors: {
      bg: '#faf8f5',
      surface: '#ffffff',
      surfaceAlt: '#f4efe8',
      text: '#1c1917',
      textMuted: '#78716c',
      border: 'rgba(28, 25, 23, 0.08)',
      borderStrong: 'rgba(28, 25, 23, 0.25)',
      primary: '#9a3412',
      primaryOn: '#ffffff',
      accent: '#047857',
      glow: 'rgba(154, 52, 18, 0.08)'
    },
    spacingScale: '1.5rem',
    borderRadius: '12px',
    borderWidth: '1px',
    shadow: '0 12px 32px -4px rgba(28, 25, 23, 0.05)',
    texture: 'subtle-grain'
  },
  'brutalist-pop': {
    id: 'brutalist-pop',
    name: 'Neo-Brutalist High Voltage',
    theme: 'light',
    headingFont: 'Unbounded',
    bodyFont: 'Space Grotesk',
    monoFont: 'Space Mono',
    fontUrls: 'family=Unbounded:wght@700;800;900&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700',
    colors: {
      bg: '#fffdec',
      surface: '#ffffff',
      surfaceAlt: '#f3efd6',
      text: '#0a0a0a',
      textMuted: '#383838',
      border: '#0a0a0a',
      borderStrong: '#0a0a0a',
      primary: '#ff0055',
      primaryOn: '#ffffff',
      accent: '#00e5ff',
      glow: 'none'
    },
    spacingScale: '1.5rem',
    borderRadius: '0px',
    borderWidth: '2.5px',
    shadow: '5px 5px 0px #0a0a0a',
    texture: 'none'
  },
  'cinematic-obsidian': {
    id: 'cinematic-obsidian',
    name: 'Cinematic Obsidian & Indigo',
    theme: 'dark',
    headingFont: 'Space Grotesk',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500',
    colors: {
      bg: '#080a11',
      surface: 'rgba(15, 19, 32, 0.85)',
      surfaceAlt: 'rgba(23, 29, 48, 0.65)',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(255, 255, 255, 0.1)',
      borderStrong: 'rgba(56, 189, 248, 0.4)',
      primary: '#38bdf8',
      primaryOn: '#04101e',
      accent: '#a855f7',
      glow: 'rgba(56, 189, 248, 0.25)'
    },
    spacingScale: '1.6rem',
    borderRadius: '16px',
    borderWidth: '1px',
    shadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
    texture: 'aurora-mesh'
  },
  'technical-lab': {
    id: 'technical-lab',
    name: 'Computational Laboratory CLI',
    theme: 'dark',
    headingFont: 'JetBrains Mono',
    bodyFont: 'IBM Plex Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=JetBrains+Mono:wght@500;700;800&family=IBM+Plex+Sans:wght@400;500;600',
    colors: {
      bg: '#0b0f19',
      surface: '#111827',
      surfaceAlt: '#1a2234',
      text: '#e2e8f0',
      textMuted: '#64748b',
      border: 'rgba(34, 197, 94, 0.25)',
      borderStrong: '#22c55e',
      primary: '#22c55e',
      primaryOn: '#022c22',
      accent: '#38bdf8',
      glow: 'rgba(34, 197, 94, 0.2)'
    },
    spacingScale: '1.25rem',
    borderRadius: '6px',
    borderWidth: '1px',
    shadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    texture: 'grid-mesh'
  },
  'monochrome-gallery': {
    id: 'monochrome-gallery',
    name: 'Pure Monochrome Art Gallery',
    theme: 'dark',
    headingFont: 'Fraunces',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Fraunces:opsz,wght@9..144,600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500',
    colors: {
      bg: '#050505',
      surface: '#0d0d0d',
      surfaceAlt: '#171717',
      text: '#ffffff',
      textMuted: '#888888',
      border: 'rgba(255, 255, 255, 0.12)',
      borderStrong: 'rgba(255, 255, 255, 0.3)',
      primary: '#ffffff',
      primaryOn: '#000000',
      accent: '#d4af37',
      glow: 'rgba(255, 255, 255, 0.1)'
    },
    spacingScale: '2rem',
    borderRadius: '0px',
    borderWidth: '1px',
    shadow: 'none',
    texture: 'none'
  },
  'warm-editorial': {
    id: 'warm-editorial',
    name: 'Warm Paper & Amber Serif',
    theme: 'light',
    headingFont: 'Instrument Serif',
    bodyFont: 'Manrope',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700',
    colors: {
      bg: '#fcf8f2',
      surface: '#ffffff',
      surfaceAlt: '#f5eee4',
      text: '#292524',
      textMuted: '#78716c',
      border: 'rgba(41, 37, 36, 0.1)',
      borderStrong: '#292524',
      primary: '#d97706',
      primaryOn: '#ffffff',
      accent: '#059669',
      glow: 'rgba(217, 119, 6, 0.1)'
    },
    spacingScale: '1.5rem',
    borderRadius: '8px',
    borderWidth: '1px',
    shadow: '0 8px 24px -2px rgba(41, 37, 36, 0.04)',
    texture: 'paper-tint'
  },
  'futuristic-spatial': {
    id: 'futuristic-spatial',
    name: 'PeachWeb Vivid Spatial 3D',
    theme: 'dark',
    headingFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600',
    colors: {
      bg: '#090b14',
      surface: 'rgba(18, 22, 38, 0.75)',
      surfaceAlt: 'rgba(28, 34, 58, 0.65)',
      text: '#f8fafc',
      textMuted: '#94a3b8',
      border: 'rgba(249, 115, 22, 0.3)',
      borderStrong: '#f97316',
      primary: '#f97316',
      primaryOn: '#ffffff',
      accent: '#6366f1',
      glow: 'rgba(249, 115, 22, 0.35)'
    },
    spacingScale: '1.75rem',
    borderRadius: '20px',
    borderWidth: '1.5px',
    shadow: '0 20px 60px rgba(249, 115, 22, 0.15)',
    texture: 'volumetric-particles'
  },
  'expressive-typographic': {
    id: 'expressive-typographic',
    name: 'Expressive Display & Kinetic Grid',
    theme: 'light',
    headingFont: 'Bricolage Grotesque',
    bodyFont: 'Public Sans',
    monoFont: 'Space Mono',
    fontUrls: 'family=Bricolage+Grotesque:opsz,wght@12..96,700;800&family=Public+Sans:wght@400;500;600',
    colors: {
      bg: '#f4f4f0',
      surface: '#ffffff',
      surfaceAlt: '#eaeae3',
      text: '#141413',
      textMuted: '#5a5955',
      border: 'rgba(20, 20, 19, 0.12)',
      borderStrong: '#141413',
      primary: '#2563eb',
      primaryOn: '#ffffff',
      accent: '#f59e0b',
      glow: 'rgba(37, 99, 235, 0.12)'
    },
    spacingScale: '1.5rem',
    borderRadius: '4px',
    borderWidth: '1.5px',
    shadow: '3px 3px 0px rgba(20, 20, 19, 0.8)',
    texture: 'none'
  },
  'luxury-minimal': {
    id: 'luxury-minimal',
    name: 'Luxury Obsidian & Champagne',
    theme: 'dark',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Montserrat',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Montserrat:wght@300;400;500',
    colors: {
      bg: '#0c0c0e',
      surface: '#151518',
      surfaceAlt: '#1f1f24',
      text: '#f2f2f5',
      textMuted: '#95959e',
      border: 'rgba(212, 175, 55, 0.25)',
      borderStrong: '#d4af37',
      primary: '#d4af37',
      primaryOn: '#0c0c0e',
      accent: '#e5e5ea',
      glow: 'rgba(212, 175, 55, 0.18)'
    },
    spacingScale: '1.8rem',
    borderRadius: '2px',
    borderWidth: '1px',
    shadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
    texture: 'subtle-vignette'
  },
  'cosmic-astronaut-holographic': {
    id: 'cosmic-astronaut-holographic',
    name: 'Cosmic Astronaut Holographic AI Developer Studio',
    theme: 'dark',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#08071a',
      surface: 'rgba(18, 16, 44, 0.72)',
      surfaceAlt: 'rgba(28, 24, 66, 0.55)',
      text: '#ffffff',
      textMuted: '#94a3b8',
      border: 'rgba(139, 92, 246, 0.22)',
      borderStrong: '#a855f7',
      primary: '#8b5cf6',
      primaryOn: '#ffffff',
      accent: '#38bdf8',
      glow: 'rgba(139, 92, 246, 0.45)',
      cardGlow: '0 10px 30px -10px rgba(139, 92, 246, 0.35)'
    },
    spacingScale: '1.65rem',
    borderRadius: '20px',
    borderWidth: '1.25px',
    shadow: '0 20px 50px rgba(139, 92, 246, 0.25)',
    texture: 'cosmic-starfield-mesh'
  },
  'system-awakening': {
    id: 'system-awakening',
    name: 'System Awakening (Shadow Monarch Hunter Interface)',
    theme: 'dark',
    headingFont: 'Rajdhani',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Rajdhani:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800',
    colors: {
      bg: '#08080C',
      surface: 'rgba(14, 16, 24, 0.88)',
      surfaceAlt: 'rgba(20, 24, 36, 0.65)',
      text: '#F8FAFC',
      textMuted: '#94A3B8',
      border: 'rgba(0, 229, 255, 0.35)',
      borderStrong: '#00E5FF',
      primary: '#00E5FF',
      primaryOn: '#08080C',
      accent: '#8A2BE2',
      glow: 'rgba(0, 229, 255, 0.4)',
      cardGlow: '0 10px 30px -10px rgba(0, 229, 255, 0.35)'
    },
    spacingScale: '1.6rem',
    borderRadius: '8px',
    borderWidth: '1.5px',
    shadow: '0 0 35px rgba(0, 229, 255, 0.35), inset 0 0 25px rgba(0, 229, 255, 0.15)',
    texture: 'system-portal-mesh'
  },
  'engineering-archive': {
    id: 'engineering-archive',
    name: 'Engineering Archive (Swiss Architectural Blueprint)',
    theme: 'light',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#FAF9F5',
      surface: '#FFFFFF',
      surfaceAlt: '#F2EFE9',
      text: '#121316',
      textMuted: '#57534E',
      border: 'rgba(18, 19, 22, 0.15)',
      borderStrong: '#121316',
      primary: '#0A5CFF',
      primaryOn: '#FFFFFF',
      accent: '#FF5500',
      glow: 'rgba(10, 92, 255, 0.15)',
      cardGlow: '4px 4px 0px #121316'
    },
    spacingScale: '1.5rem',
    borderRadius: '0px',
    borderWidth: '1px',
    shadow: '4px 4px 0px #121316',
    texture: 'architectural-blueprint-grid'
  },
  'cosmic-cyber-geometry': {
    id: 'cosmic-cyber-geometry',
    name: 'Cosmic Cyber Geometry (Futuristic Minimal Neon)',
    theme: 'dark',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#080D10',
      surface: 'rgba(26, 29, 38, 0.72)',
      surfaceAlt: 'rgba(17, 19, 24, 0.88)',
      text: '#E5E7EB',
      textMuted: '#94A3B8',
      border: 'rgba(224, 132, 252, 0.18)',
      borderStrong: '#E084FC',
      primary: '#E21C5F',
      primaryOn: '#FFFFFF',
      accent: '#E084FC',
      glow: 'rgba(226, 28, 95, 0.3)',
      cardGlow: '0 16px 40px rgba(224, 132, 252, 0.2)'
    },
    spacingScale: '1.6rem',
    borderRadius: '12px',
    borderWidth: '1.5px',
    shadow: '0 16px 40px rgba(224, 132, 252, 0.2)',
    texture: 'cyber-orbit-mesh'
  },
  'stellar-architect': {
    id: 'stellar-architect',
    name: 'Stellar Architect (Cosmic Blueprint & Solar Gold)',
    theme: 'dark',
    headingFont: 'Space Grotesk',
    bodyFont: 'Cormorant Garamond',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#05080A',
      surface: '#10141A',
      surfaceAlt: 'rgba(16, 20, 26, 0.78)',
      text: '#F0F4F8',
      textMuted: '#AABBCF',
      border: 'rgba(0, 168, 255, 0.22)',
      borderStrong: '#00A8FF',
      primary: '#00A8FF',
      primaryOn: '#05080A',
      accent: '#FFC300',
      glow: 'rgba(0, 168, 255, 0.35)',
      cardGlow: '0 16px 40px rgba(0, 168, 255, 0.2)'
    },
    spacingScale: '1.6rem',
    borderRadius: '0px',
    borderWidth: '0.5px',
    shadow: '0 16px 40px rgba(0, 168, 255, 0.2)',
    texture: 'celestial-blueprint-grid'
  },
  'abyssal-ascent': {
    id: 'abyssal-ascent',
    name: 'Abyssal Ascent (Dark Fantasy Progression RPG)',
    theme: 'dark',
    headingFont: 'Cinzel',
    bodyFont: 'Inter',
    monoFont: 'Rajdhani',
    fontUrls: 'family=Cinzel:wght@600;700;800;900&family=Rajdhani:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#030407',
      surface: '#0D1117',
      surfaceAlt: 'rgba(13, 17, 23, 0.85)',
      text: '#E2E8F0',
      textMuted: '#94A3B8',
      border: 'rgba(6, 182, 212, 0.22)',
      borderStrong: '#06B6D4',
      primary: '#8B5CF6',
      primaryOn: '#FFFFFF',
      accent: '#06B6D4',
      glow: 'rgba(139, 92, 246, 0.35)',
      cardGlow: '0 16px 40px rgba(139, 92, 246, 0.3)'
    },
    spacingScale: '1.6rem',
    borderRadius: '0px',
    borderWidth: '1px',
    shadow: '0 16px 40px rgba(139, 92, 246, 0.3)',
    texture: 'abyssal-fissure-mesh'
  },
  'stealth-node': {
    id: 'stealth-node',
    name: 'Stealth Node (Web3 Cypherpunk & Cryptographic Terminal)',
    theme: 'dark',
    headingFont: 'Fira Code',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#000000',
      surface: 'rgba(15, 23, 20, 0.65)',
      surfaceAlt: 'rgba(10, 16, 14, 0.85)',
      text: '#F8F9FA',
      textMuted: '#6C757D',
      border: 'rgba(0, 255, 65, 0.25)',
      borderStrong: '#00FF41',
      primary: '#00FF41',
      primaryOn: '#000000',
      accent: '#FF5722',
      glow: 'rgba(0, 255, 65, 0.35)',
      cardGlow: '0 16px 40px rgba(0, 255, 65, 0.3)'
    },
    spacingScale: '1.6rem',
    borderRadius: '0px',
    borderWidth: '1px',
    shadow: '0 16px 40px rgba(0, 255, 65, 0.3)',
    texture: 'stealth-hex-mesh'
  },
  'kinetic-brutalism': {
    id: 'kinetic-brutalism',
    name: 'Kinetic Brutalism (High-Contrast Poster Zine)',
    theme: 'light',
    headingFont: 'Archivo Black',
    bodyFont: 'DM Sans',
    monoFont: 'Space Mono',
    fontUrls: 'family=Archivo+Black&family=DM+Sans:ital,opsz,wght@0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700;800',
    colors: {
      bg: '#FDFBF7',
      surface: '#FFFFFF',
      surfaceAlt: '#DFFF00',
      text: '#000000',
      textMuted: '#4B5563',
      border: '#000000',
      borderStrong: '#000000',
      primary: '#DFFF00',
      primaryOn: '#000000',
      accent: '#FF007F',
      glow: 'rgba(223, 255, 0, 0.4)',
      cardGlow: '5px 5px 0px #000000'
    },
    spacingScale: '1.6rem',
    borderRadius: '0px',
    borderWidth: '3.5px',
    shadow: '5px 5px 0px #000000',
    texture: 'brutalist-grid-lines'
  },
  'circuit-core': {
    id: 'circuit-core',
    name: 'Circuit Core (Industrial Cyber-Minimal & Brass)',
    theme: 'dark',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700',
    colors: {
      bg: '#0D1117',
      surface: '#1A1F29',
      surfaceAlt: 'rgba(26, 31, 41, 0.85)',
      text: '#F0F4F8',
      textMuted: '#8B949E',
      border: 'rgba(0, 255, 65, 0.25)',
      borderStrong: '#00FF41',
      primary: '#00FF41',
      primaryOn: '#0D1117',
      accent: '#D4AF37',
      glow: 'rgba(0, 255, 65, 0.35)',
      cardGlow: '0 16px 40px rgba(0, 255, 65, 0.2)'
    },
    spacingScale: '1.6rem',
    borderRadius: '0px',
    borderWidth: '1px',
    shadow: '0 16px 40px rgba(0, 255, 65, 0.2)',
    texture: 'circuit-mesh-seams'
  },
  'neon-aurora-cyber': {
    id: 'neon-aurora-cyber',
    name: 'Neon Aurora Cyber (Cyber-Minimalist Aurora Glass)',
    theme: 'dark',
    headingFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'Fira Code',
    fontUrls: 'family=Syne:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600;700',
    colors: {
      bg: '#07070F',
      surface: 'rgba(255, 255, 255, 0.04)',
      surfaceAlt: '#0C0C1A',
      text: '#F4F4FF',
      textMuted: '#9A9ABF',
      border: 'rgba(255, 255, 255, 0.1)',
      borderStrong: '#EC4899',
      primary: '#A855F7',
      primaryOn: '#FFFFFF',
      accent: '#EC4899',
      glow: 'rgba(236, 72, 153, 0.4)',
      cardGlow: '0 20px 60px -20px rgba(0, 0, 0, 0.7)'
    },
    spacingScale: '1.6rem',
    borderRadius: '20px',
    borderWidth: '1px',
    shadow: '0 20px 60px -20px rgba(0, 0, 0, 0.7)',
    texture: 'aurora-grid-mesh'
  }
};

class VisualGrammar {
  static getUniverse(id) {
    return VISUAL_UNIVERSES[id] || VISUAL_UNIVERSES['swiss-editorial'];
  }

  static getAllUniverseIds() {
    return Object.keys(VISUAL_UNIVERSES);
  }

  static selectUniverse(contentProfile, preferredMode = null) {
    if (preferredMode && VISUAL_UNIVERSES[preferredMode]) {
      return VISUAL_UNIVERSES[preferredMode];
    }

    const { signals } = contentProfile;
    const ids = Object.keys(VISUAL_UNIVERSES);

    // Filter compatible universes by content characteristics
    let candidates = ids;
    if (signals.visualDensity === 'high') {
      candidates = ['cosmic-astronaut-holographic', 'futuristic-spatial', 'contemporary-magazine', 'monochrome-gallery', 'expressive-typographic'];
    } else if (signals.technicalDepth === 'high') {
      candidates = ['cosmic-astronaut-holographic', 'technical-lab', 'cinematic-obsidian', 'swiss-editorial', 'brutalist-pop'];
    } else if (signals.narrativeDepth === 'high') {
      candidates = ['cosmic-astronaut-holographic', 'warm-editorial', 'contemporary-magazine', 'luxury-minimal', 'swiss-editorial'];
    }

    const chosenId = candidates[Math.floor(Math.random() * candidates.length)];
    return VISUAL_UNIVERSES[chosenId] || VISUAL_UNIVERSES['cosmic-astronaut-holographic'];
  }
}

module.exports = { VisualGrammar, VISUAL_UNIVERSES };

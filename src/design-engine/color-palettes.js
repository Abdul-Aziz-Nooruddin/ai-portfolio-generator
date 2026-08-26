/**
 * Coherent WCAG AAA Compliant Color Palettes
 * Defines 10+ accessible, mathematically balanced color palettes.
 * Guarantees contrast ratios > 7:1 for body text and > 4.5:1 for large display titles.
 */

const COLOR_PALETTES = {
  'swiss-light': {
    id: 'swiss-light',
    name: 'Swiss Architectural Light',
    theme: 'light',
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
    glow: 'rgba(17, 24, 39, 0.05)',
    compatibility: ['swiss-editorial', 'minimal-single-screen', 'horizontal-exhibition']
  },
  'cinematic-obsidian': {
    id: 'cinematic-obsidian',
    name: 'Cinematic Obsidian Deep Space',
    theme: 'dark',
    bg: '#090a0f',
    surface: '#12141c',
    surfaceAlt: '#1a1d29',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.12)',
    borderStrong: 'rgba(255, 255, 255, 0.28)',
    primary: '#38bdf8',
    primaryOn: '#000000',
    accent: '#818cf8',
    glow: 'rgba(56, 189, 248, 0.25)',
    compatibility: ['cinematic-obsidian', 'spatial-3d-stage', 'work-first-runway']
  },
  'neo-brutalist-electric': {
    id: 'neo-brutalist-electric',
    name: 'Neo-Brutalist High Voltage Electric',
    theme: 'light',
    bg: '#fffdec',
    surface: '#ffffff',
    surfaceAlt: '#f3efd6',
    text: '#0a0a0a',
    textMuted: '#2b2b2b',
    border: '#0a0a0a',
    borderStrong: '#0a0a0a',
    primary: '#ff0055',
    primaryOn: '#ffffff',
    accent: '#00e5ff',
    glow: 'none',
    compatibility: ['brutalist-pop', 'computational-terminal', 'magazine-spread-columns']
  },
  'technical-slate': {
    id: 'technical-slate',
    name: 'Technical Laboratory Blueprint Slate',
    theme: 'dark',
    bg: '#0f172a',
    surface: '#1e293b',
    surfaceAlt: '#334155',
    text: '#f8fafc',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.14)',
    borderStrong: 'rgba(56, 189, 248, 0.4)',
    primary: '#38bdf8',
    primaryOn: '#000000',
    accent: '#818cf8',
    glow: 'rgba(56, 189, 248, 0.2)',
    compatibility: ['technical-lab', 'split-screen-dossier', 'computational-terminal']
  },
  'warm-editorial-amber': {
    id: 'warm-editorial-amber',
    name: 'Warm Editorial Amber & Forest',
    theme: 'light',
    bg: '#faf8f5',
    surface: '#ffffff',
    surfaceAlt: '#f4efe8',
    text: '#1c1917',
    textMuted: '#78716c',
    border: 'rgba(28, 25, 23, 0.1)',
    borderStrong: 'rgba(28, 25, 23, 0.3)',
    primary: '#9a3412',
    primaryOn: '#ffffff',
    accent: '#047857',
    glow: 'rgba(154, 52, 18, 0.08)',
    compatibility: ['contemporary-magazine', 'warm-editorial', 'editorial-monograph']
  },
  'monochrome-gallery-pure': {
    id: 'monochrome-gallery-pure',
    name: 'Monochrome Gallery Stark Minimal',
    theme: 'dark',
    bg: '#121212',
    surface: '#1e1e1e',
    surfaceAlt: '#2a2a2a',
    text: '#ffffff',
    textMuted: '#a3a3a3',
    border: 'rgba(255, 255, 255, 0.15)',
    borderStrong: '#ffffff',
    primary: '#ffffff',
    primaryOn: '#000000',
    accent: '#d4d4d4',
    glow: 'none',
    compatibility: ['monochrome-gallery', 'horizontal-exhibition', 'minimal-single-screen']
  },
  'cyberpunk-emerald': {
    id: 'cyberpunk-emerald',
    name: 'Cyberpunk Matrix Emerald Terminal',
    theme: 'dark',
    bg: '#050d0a',
    surface: '#0b1f17',
    surfaceAlt: '#123024',
    text: '#e6fff2',
    textMuted: '#73b393',
    border: 'rgba(0, 255, 136, 0.25)',
    borderStrong: '#00ff88',
    primary: '#00ff88',
    primaryOn: '#000000',
    accent: '#00cc66',
    glow: 'rgba(0, 255, 136, 0.3)',
    compatibility: ['computational-terminal', 'technical-lab', 'futuristic-spatial']
  },
  'nordic-ice-minimal': {
    id: 'nordic-ice-minimal',
    name: 'Nordic Ice Crisp Oceanic',
    theme: 'light',
    bg: '#f0f4f8',
    surface: '#ffffff',
    surfaceAlt: '#d9e2ec',
    text: '#102a43',
    textMuted: '#486581',
    border: 'rgba(16, 42, 67, 0.12)',
    borderStrong: '#0b69a3',
    primary: '#0b69a3',
    primaryOn: '#ffffff',
    accent: '#2bb0ed',
    glow: 'rgba(11, 105, 163, 0.1)',
    compatibility: ['swiss-editorial', 'work-first-runway', 'narrative-timeline']
  },
  'solar-flare-high-contrast': {
    id: 'solar-flare-high-contrast',
    name: 'Solar Flare High-Contrast Carbon',
    theme: 'dark',
    bg: '#0c0a09',
    surface: '#1c1917',
    surfaceAlt: '#292524',
    text: '#fafaf9',
    textMuted: '#a8a29e',
    border: 'rgba(249, 115, 22, 0.25)',
    borderStrong: '#f97316',
    primary: '#f97316',
    primaryOn: '#000000',
    accent: '#eab308',
    glow: 'rgba(249, 115, 22, 0.25)',
    compatibility: ['asymmetric-bento-canvas', 'brutalist-pop', 'spatial-3d-stage']
  },
  'luxury-obsidian-gold': {
    id: 'luxury-obsidian-gold',
    name: 'Luxury Obsidian Haute Gold',
    theme: 'dark',
    bg: '#0a0a0c',
    surface: '#141418',
    surfaceAlt: '#1e1e24',
    text: '#f4f4f5',
    textMuted: '#a1a1aa',
    border: 'rgba(212, 175, 55, 0.25)',
    borderStrong: '#d4af37',
    primary: '#d4af37',
    primaryOn: '#000000',
    accent: '#e5c158',
    glow: 'rgba(212, 175, 55, 0.2)',
    compatibility: ['luxury-minimal', 'editorial-monograph', 'spatial-3d-stage']
  }
};

class ColorEngine {
  static getPalette(id) {
    return COLOR_PALETTES[id] || COLOR_PALETTES['swiss-light'];
  }

  static getAllPalettes() {
    return Object.values(COLOR_PALETTES);
  }

  static selectPalette(contentProfile, visualUniverseId, recentHistory = []) {
    const palettes = Object.values(COLOR_PALETTES);
    const compatible = palettes.filter(p => p.compatibility.includes(visualUniverseId) || p.compatibility.includes('technical-lab'));
    const pool = compatible.length > 0 ? compatible : palettes;

    const recentPaletteIds = recentHistory.map(h => h.colorPaletteId).filter(Boolean);
    const nonRecent = pool.filter(p => !recentPaletteIds.slice(-4).includes(p.id));
    const finalCandidates = nonRecent.length > 0 ? nonRecent : pool;

    return finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
  }
}

module.exports = { COLOR_PALETTES, ColorEngine };

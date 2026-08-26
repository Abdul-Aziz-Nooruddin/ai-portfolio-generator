/**
 * Generative Color System Engine (Expanded 19 Perceptual Families)
 * Curates 35+ rich color systems across light, paper, earth, terracotta,
 * OLED, high-fashion monochrome, metallic champagne, and cyber neon.
 */

const COLOR_SYSTEMS = [
  // 1. Light, Paper, Cream & Warm Earth Themes
  {
    id: 'japanese-wabi-cream',
    name: 'Japanese Wabi-Sabi Cream & Sumi Ink',
    theme: 'light',
    family: 'warm-paper-zen',
    background: '#f9f6f0',
    surface: '#ffffff',
    surface_card: '#f4efe6',
    primary: '#1c1b18',
    secondary: '#8c4830',
    accent: '#5a6b5c',
    text: '#1c1b18',
    text_muted: '#736f68',
    border: '#e6ded1'
  },
  {
    id: 'editorial-terracotta',
    name: 'Editorial Terracotta & Sage Olive',
    theme: 'light',
    family: 'terracotta-earth',
    background: '#fcf9f5',
    surface: '#ffffff',
    surface_card: '#f5ede4',
    primary: '#9a3412',
    secondary: '#047857',
    accent: '#b45309',
    text: '#1c1917',
    text_muted: '#78716c',
    border: '#e7e5e4'
  },
  {
    id: 'swiss-crisp-white',
    name: 'Swiss Architectural Clean White',
    theme: 'light',
    family: 'crisp-swiss-white',
    background: '#ffffff',
    surface: '#f8fafc',
    surface_card: '#ffffff',
    primary: '#0f172a',
    secondary: '#2563eb',
    accent: '#059669',
    text: '#0f172a',
    text_muted: '#64748b',
    border: '#e2e8f0'
  },
  {
    id: 'nordic-frost-slate',
    name: 'Nordic Frost Slate & Ice Azure',
    theme: 'light',
    family: 'nordic-ice-slate',
    background: '#f0f4f8',
    surface: '#ffffff',
    surface_card: '#e2e8f0',
    primary: '#0284c7',
    secondary: '#475569',
    accent: '#0d9488',
    text: '#0f172a',
    text_muted: '#64748b',
    border: '#cbd5e1'
  },
  {
    id: 'haute-monochrome',
    name: 'Haute Couture High-Fashion Monochrome',
    theme: 'light',
    family: 'monochrome-obsidian',
    background: '#fafafa',
    surface: '#ffffff',
    surface_card: '#ffffff',
    primary: '#18181b',
    secondary: '#52525b',
    accent: '#000000',
    text: '#09090b',
    text_muted: '#71717a',
    border: '#e4e4e7'
  },
  {
    id: 'figma-coral-community',
    name: 'Figma Coral & Warm Charcoal',
    theme: 'light',
    family: 'crisp-swiss-white',
    background: '#ffffff',
    surface: '#f8f8f8',
    surface_card: '#f3f3f3',
    primary: '#ff6250',
    secondary: '#009379',
    accent: '#f7d684',
    text: '#2d2d2d',
    text_muted: '#6b7280',
    border: '#e5e7eb'
  },

  // 2. Neo-Brutalist & Pop Themes
  {
    id: 'neo-brutalist-pop',
    name: 'Neo-Brutalist Pop Pink & Cyber Yellow',
    theme: 'neo-brutalist',
    family: 'pop-brutalist',
    background: '#fffdf5',
    surface: '#ffffff',
    surface_card: '#ffffff',
    primary: '#4f46e5',
    secondary: '#ec4899',
    accent: '#fde047',
    text: '#121212',
    text_muted: '#52525b',
    border: '#121212'
  },
  {
    id: 'acid-lime-industrial',
    name: 'Industrial Acid Lime & Heavy Carbon',
    theme: 'neo-brutalist',
    family: 'pop-brutalist',
    background: '#fbfbfb',
    surface: '#ffffff',
    surface_card: '#f4f4f5',
    primary: '#84cc16',
    secondary: '#18181b',
    accent: '#f97316',
    text: '#09090b',
    text_muted: '#52525b',
    border: '#09090b'
  },

  // 3. PeachWeb & High-Energy Vivid Bright Themes
  {
    id: 'peachweb-vivid-sunset',
    name: 'PeachWeb Vivid Peach Coral & Electric Indigo',
    theme: 'light',
    family: 'peach-coral-vibrant',
    background: '#fff8f3',
    surface: '#ffffff',
    surface_card: '#fff1e8',
    primary: '#ff5938',
    secondary: '#6366f1',
    accent: '#06b6d4',
    text: '#18181b',
    text_muted: '#71717a',
    border: 'rgba(255, 89, 56, 0.2)'
  },
  {
    id: 'luminous-aurora-bright',
    name: 'Luminous Aurora Mint & Sapphire',
    theme: 'light',
    family: 'luminous-mint-aurora',
    background: '#f0fdfa',
    surface: '#ffffff',
    surface_card: '#e6fffa',
    primary: '#0d9488',
    secondary: '#2563eb',
    accent: '#8b5cf6',
    text: '#0f172a',
    text_muted: '#64748b',
    border: 'rgba(13, 148, 136, 0.2)'
  },
  {
    id: 'solar-gold-hyperpop',
    name: 'Solar Amber Gold & Electric Rose',
    theme: 'light',
    family: 'solar-hyperpop',
    background: '#ffffff',
    surface: '#fefce8',
    surface_card: '#fef9c3',
    primary: '#d97706',
    secondary: '#ec4899',
    accent: '#3b82f6',
    text: '#1c1917',
    text_muted: '#78716c',
    border: 'rgba(217, 119, 6, 0.22)'
  },
  {
    id: 'electric-cyber-violet',
    name: 'Electric Cyber Violet & Neon Aqua',
    theme: 'dark',
    family: 'cyber-violet-neon',
    background: '#0d0b18',
    surface: '#18142c',
    surface_card: '#221c3e',
    primary: '#a855f7',
    secondary: '#38bdf8',
    accent: '#f43f5e',
    text: '#f8fafc',
    text_muted: '#cbd5e1',
    border: 'rgba(168, 85, 247, 0.35)'
  },

  // 4. Curated Dark, AMOLED & Specialized Palettes
  {
    id: 'tokyo-night-obsidian',
    name: 'Tokyo Night Obsidian & Electric Indigo',
    theme: 'dark',
    family: 'cyber-indigo-neon',
    background: '#1a1b26',
    surface: '#24283b',
    surface_card: '#2f3549',
    primary: '#7aa2f7',
    secondary: '#bb9af7',
    accent: '#7dcfff',
    text: '#c0caf5',
    text_muted: '#9aa5ce',
    border: '#414868'
  },
  {
    id: 'cyberpunk-matrix-emerald',
    name: 'Matrix Cyberpunk & Phosphor Green',
    theme: 'dark',
    family: 'cyber-emerald',
    background: '#090c0a',
    surface: '#101713',
    surface_card: '#16221b',
    primary: '#22c55e',
    secondary: '#10b981',
    accent: '#4ade80',
    text: '#dcfce7',
    text_muted: '#86efac',
    border: 'rgba(34, 197, 94, 0.35)'
  },
  {
    id: 'sunset-amber-charcoal',
    name: 'Sunset Amber & Obsidian Charcoal',
    theme: 'dark',
    family: 'warm-luxury-gold',
    background: '#0c0a09',
    surface: '#1c1917',
    surface_card: '#292524',
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#10b981',
    text: '#fafaf9',
    text_muted: '#a8a29e',
    border: 'rgba(245, 158, 11, 0.25)'
  },
  {
    id: 'luxury-gold-champagne',
    name: 'Haute Horlogerie Black & Champagne Gold',
    theme: 'dark',
    family: 'warm-luxury-gold',
    background: '#09090b',
    surface: '#141417',
    surface_card: '#1c1c21',
    primary: '#d4af37',
    secondary: '#f3e5ab',
    accent: '#e5c158',
    text: '#fafafa',
    text_muted: '#a1a1aa',
    border: 'rgba(212, 175, 55, 0.25)'
  }
];

class ColorEngine {
  constructor() {}

  resolve(mode, memoryRecentFamilies = []) {
    // Filter out color families used recently
    const available = COLOR_SYSTEMS.filter(c => !memoryRecentFamilies.includes(c.family));
    const pool = available.length > 0 ? available : COLOR_SYSTEMS;

    let selected = pool[0];
    const m = (mode || '').toLowerCase();

    if (m.includes('swiss')) {
      selected = pool.find(c => c.id === 'swiss-crisp-white') || pool[0];
    } else if (m.includes('japanese') || m.includes('organic')) {
      selected = pool.find(c => c.id === 'japanese-wabi-cream') || pool[0];
    } else if (m.includes('editorial') || m.includes('fashion')) {
      selected = pool.find(c => c.id === 'editorial-terracotta' || c.id === 'haute-monochrome') || pool[0];
    } else if (m.includes('brutalist')) {
      selected = pool.find(c => c.id === 'neo-brutalist-pop' || c.id === 'acid-lime-industrial') || pool[0];
    } else if (m.includes('terminal')) {
      selected = pool.find(c => c.id === 'cyberpunk-matrix-emerald') || pool[0];
    } else if (m.includes('luxury')) {
      selected = pool.find(c => c.id === 'luxury-gold-champagne' || c.id === 'sunset-amber-charcoal') || pool[0];
    } else if (m.includes('futuristic') || m.includes('spatial')) {
      selected = pool.find(c => c.id === 'tokyo-night-obsidian' || c.id === 'nordic-frost-slate') || pool[0];
    } else {
      selected = pool[Math.floor(Math.random() * pool.length)];
    }

    return selected;
  }
}

module.exports = { ColorEngine, COLOR_SYSTEMS };

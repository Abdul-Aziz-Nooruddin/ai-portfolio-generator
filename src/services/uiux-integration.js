/**
 * UI/UX Pro Max + 21st.dev Generative Design Engine
 * Generates distinct Light, Warm Paper, Neo-Brutalist, and Dark themes with interactive components.
 */

const PALETTES = [
  {
    name: 'Modern Crisp Light (Swiss Minimal)',
    theme: 'light',
    primary: '#2563eb', secondary: '#4f46e5', accent: '#059669',
    background: '#f8fafc', surface: '#ffffff', surface_card: '#ffffff',
    text: '#0f172a', text_muted: '#64748b', border: '#e2e8f0',
    glow: 'rgba(37, 99, 235, 0.12)', card_shadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
  },
  {
    name: 'Warm Paper & Editorial Serif (Light Cream)',
    theme: 'light',
    primary: '#059669', secondary: '#d97706', accent: '#2563eb',
    background: '#fcf9f2', surface: '#ffffff', surface_card: '#ffffff',
    text: '#1c1917', text_muted: '#78716c', border: '#e7e5e4',
    glow: 'rgba(5, 150, 105, 0.12)', card_shadow: '0 10px 30px -10px rgba(28, 25, 23, 0.06)'
  },
  {
    name: 'Neo-Brutalist Pop (Bold & Chunky)',
    theme: 'neo-brutalist',
    primary: '#4f46e5', secondary: '#ec4899', accent: '#f59e0b',
    background: '#fffdfa', surface: '#ffffff', surface_card: '#ffffff',
    text: '#18181b', text_muted: '#52525b', border: '#18181b',
    glow: 'rgba(79, 70, 229, 0.15)', card_shadow: '5px 5px 0px #18181b'
  },
  {
    name: 'Tokyo Night Obsidian (Dark)',
    theme: 'dark',
    primary: '#7aa2f7', secondary: '#bb9af7', accent: '#7dcfff',
    background: '#1a1b26', surface: '#24283b', surface_card: '#2f3549',
    text: '#c0caf5', text_muted: '#9aa5ce', border: '#414868',
    glow: 'rgba(122, 162, 247, 0.25)', card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
  },
  {
    name: 'Cyberpunk Synthwave Neon (Dark)',
    theme: 'dark',
    primary: '#00ffff', secondary: '#ff007f', accent: '#ffe600',
    background: '#0d0221', surface: '#190a3a', surface_card: '#261447',
    text: '#ffffff', text_muted: '#a390e4', border: 'rgba(255, 0, 127, 0.35)',
    glow: 'rgba(0, 255, 255, 0.3)', card_shadow: '0 0 25px rgba(255, 0, 127, 0.25)'
  },
  {
    name: 'Catppuccin Mocha Studio (Dark)',
    theme: 'dark',
    primary: '#cba6f7', secondary: '#89b4fa', accent: '#a6e3a1',
    background: '#11111b', surface: '#1e1e2e', surface_card: '#313244',
    text: '#cdd6f4', text_muted: '#a6adc8', border: '#45475a',
    glow: 'rgba(203, 166, 247, 0.25)', card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
  },
  {
    name: 'Nordic Frost Slate (Light)',
    theme: 'light',
    primary: '#5e81ac', secondary: '#88c0d0', accent: '#bf616a',
    background: '#eceff4', surface: '#ffffff', surface_card: '#e5e9f0',
    text: '#2e3440', text_muted: '#4c566a', border: '#d8dee9',
    glow: 'rgba(94, 129, 172, 0.15)', card_shadow: '0 10px 25px -5px rgba(46, 52, 64, 0.08)'
  },
  {
    name: 'Solarized Desert Warm (Light)',
    theme: 'light',
    primary: '#268bd2', secondary: '#2aa198', accent: '#b58900',
    background: '#fdf6e3', surface: '#eee8d5', surface_card: '#ffffff',
    text: '#073642', text_muted: '#586e75', border: '#d33682',
    glow: 'rgba(38, 139, 210, 0.15)', card_shadow: '0 10px 25px -5px rgba(7, 54, 66, 0.08)'
  },
  {
    name: 'Bioluminescent Abyss (Dark Emerald)',
    theme: 'dark',
    primary: '#10b981', secondary: '#06b6d4', accent: '#f59e0b',
    background: '#022c22', surface: '#064e3b', surface_card: '#065f46',
    text: '#ecfdf5', text_muted: '#a7f3d0', border: 'rgba(16, 185, 129, 0.3)',
    glow: 'rgba(16, 185, 129, 0.25)', card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
  },
  {
    name: 'Sunset Amber & Charcoal (Dark)',
    theme: 'dark',
    primary: '#f59e0b', secondary: '#ef4444', accent: '#10b981',
    background: '#0c0a09', surface: '#1c1917', surface_card: '#292524',
    text: '#fafaf9', text_muted: '#a8a29e', border: 'rgba(245, 158, 11, 0.25)',
    glow: 'rgba(245, 158, 11, 0.25)', card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
  },
  {
    name: 'Figma Coral & Charcoal (Community Template)',
    theme: 'light',
    primary: '#ff6250', secondary: '#009379', accent: '#f7d684',
    background: '#ffffff', surface: '#f8f8f8', surface_card: '#f3f3f3',
    text: '#2d2d2d', text_muted: '#6b7280', border: '#e5e7eb',
    glow: 'rgba(255, 98, 80, 0.15)', card_shadow: '0 12px 30px -8px rgba(0, 0, 0, 0.08)'
  },
  {
    name: 'Figma Emerald & Warm Cream (Community Template)',
    theme: 'light',
    primary: '#009379', secondary: '#ff6250', accent: '#f7d684',
    background: '#fcf9f2', surface: '#ffffff', surface_card: '#ffffff',
    text: '#2d2d2d', text_muted: '#71717a', border: '#e4e4e7',
    glow: 'rgba(0, 147, 121, 0.15)', card_shadow: '0 12px 30px -8px rgba(0, 0, 0, 0.06)'
  },
  {
    name: 'Figma Dark Velvet & Coral Glow (Community Template)',
    theme: 'dark',
    primary: '#ff6250', secondary: '#009379', accent: '#f7d684',
    background: '#18181b', surface: '#27272a', surface_card: '#3f3f46',
    text: '#f4f4f5', text_muted: '#a1a1aa', border: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(255, 98, 80, 0.25)', card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
  }
];

const FONT_PAIRINGS = [
  { heading_font: 'Epilogue', body_font: 'Mulish', scale_ratio: 1.25 },
  { heading_font: 'Space Grotesk', body_font: 'Inter', scale_ratio: 1.25 },
  { heading_font: 'Syne', body_font: 'Plus Jakarta Sans', scale_ratio: 1.28 },
  { heading_font: 'JetBrains Mono', body_font: 'IBM Plex Sans', scale_ratio: 1.2 },
  { heading_font: 'Fraunces', body_font: 'Outfit', scale_ratio: 1.3 },
  { heading_font: 'Outfit', body_font: 'Plus Jakarta Sans', scale_ratio: 1.25 },
  { heading_font: 'DM Sans', body_font: 'Manrope', scale_ratio: 1.25 },
  { heading_font: 'Bebas Neue', body_font: 'Inter', scale_ratio: 1.35 }
];

/**
 * 6 genuinely distinct 3D & interactive visual archetypes.
 * Each layout produces a completely unique 3D WebGL scene, DOM architecture, and animation style.
 */
const LAYOUT_TEMPLATES = [
  'figma-portfolio-master', // Direct authentic implementation of the Figma Community Template
  'spatial-3d-cyber',       // Three.js interactive 3D geometric core, glowing neural matrix, dynamic cursor lighting
  'kinetic-3d-glass',        // Three.js floating glass toruses, liquid frosted bento, cursor spotlight borders
  'terminal-3d-matrix',      // 3D Matrix perspective ground grid floor, live interactive terminal OS, cyber glitch
  'neo-brutalist-3d',        // 3D isometric extruded cards, interactive bouncy physics, sticker follower cursor
  'editorial-3d-minimal'     // Architectural 3D floating wireframe prism, kinetic typography, magnetic smooth scroll
];

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { NonRepeatingPool } = require('./non-repeating-pool');

const TEXT_SCALE_RATIOS = [1.2, 1.25, 1.28, 1.333, 1.414, 1.5, 1.618];
const BASE_FONT_SIZES = ['15px', '16px', '16.5px', '17px', '18px'];
const HEADLINE_TRACKINGS = ['-0.04em', '-0.03em', '-0.02em', '-0.01em', '0em', '0.04em'];

const BACKGROUND_3D_OBJECTS = [
  'geometric-core-icosahedron',  // Glowing inner Icosahedron inside Dodecahedron wireframe
  'floating-glass-torus',        // Floating glass Torus Knot with refraction
  'matrix-cyber-grid',          // TRON perspective ground grid with floating data cubes
  'isometric-bento-cubes',      // Tumbling physics boxes with gravity
  'floating-wireframe-prism',   // Floating Octahedron & kinetic wireframe prisms
  'morphing-particle-wave',     // Undulating Sine wave particle mesh
  'holographic-orbital-rings',  // Concentric gyroscopic orbital rings
  'dna-helix-mesh'              // Double-helix particle cascade
];

const FOREGROUND_3D_OBJECTS = [
  '3d-magnetic-avatar-orb',      // 3D floating avatar with pulse glow & hover torque
  '3d-gyro-hologram-card',       // 3D gyroscope card with dynamic specular light reflection
  '3d-extruded-isometric-badge', // 3D extruded sticker badge that rotates on hover
  '3d-floating-terminal-hud',    // Glassmorphic floating HUD metrics badge
  '3d-bouncy-physics-chips'      // Bouncy interactive physics chips
];

const CURSOR_INTERACTIONS = [
  'magnetic-dot-follower',
  'glow-spotlight-tracer',
  'isometric-sticker-follower',
  'minimal-crosshair-pointer',
  'fluid-trail-particle'
];

const CONFETTI_STYLES = [
  'neon-burst',
  'geometric-ribbons',
  'golden-sparks',
  'star-confetti'
];

const { FigmaService } = require('./figma-service');

class UIUXIntegration {
  constructor() {
    this.cache = new Map();
    this.figmaService = new FigmaService();
    this.skillScriptPath = path.join(
      process.cwd(),
      'skills',
      'ui-ux-pro-max-skill',
      'src',
      'ui-ux-pro-max',
      'scripts',
      'search.py'
    );

    // Non-Repeating Design Pools (Every font, color, text size, 3D background object, 3D foreground object repeats ONLY ONCE per cycle)
    this.palettePool = new NonRepeatingPool(PALETTES, 'Color Palettes');
    this.fontPool = new NonRepeatingPool(FONT_PAIRINGS, 'Font Pairings');
    this.layoutPool = new NonRepeatingPool(LAYOUT_TEMPLATES, 'Layout Structures');
    this.textScalePool = new NonRepeatingPool(TEXT_SCALE_RATIOS, 'Text Scale Ratios');
    this.baseFontSizePool = new NonRepeatingPool(BASE_FONT_SIZES, 'Base Font Sizes');
    this.headlineTrackingPool = new NonRepeatingPool(HEADLINE_TRACKINGS, 'Headline Trackings');
    this.background3DPool = new NonRepeatingPool(BACKGROUND_3D_OBJECTS, 'Background 3D Objects');
    this.foreground3DPool = new NonRepeatingPool(FOREGROUND_3D_OBJECTS, 'Foreground 3D Objects');
    this.cursorPool = new NonRepeatingPool(CURSOR_INTERACTIONS, 'Cursor Interactions');
    this.confettiPool = new NonRepeatingPool(CONFETTI_STYLES, 'Confetti Styles');
  }

  getPoolStats() {
    return {
      palettes: this.palettePool.getStatus(),
      fonts: this.fontPool.getStatus(),
      layouts: this.layoutPool.getStatus(),
      textScales: this.textScalePool.getStatus(),
      baseFontSizes: this.baseFontSizePool.getStatus(),
      headlineTrackings: this.headlineTrackingPool.getStatus(),
      background3D: this.background3DPool.getStatus(),
      foreground3D: this.foreground3DPool.getStatus(),
      cursors: this.cursorPool.getStatus(),
      confetti: this.confettiPool.getStatus()
    };
  }

  async getEnhancedDesignBrief(extractedData = {}, branch = 'A') {
    const role = extractedData.role || extractedData.service_title || 'Developer';
    const styleHint = extractedData.style_hint || '';
    const tech = extractedData.tech_stack || '';
    const query = `${role} ${styleHint} ${branch === 'A' ? 'developer' : branch === 'B' ? 'creative freelancer' : 'professional'} portfolio`.trim();

    // 1. Attempt dynamic search via UI/UX Pro Max Skill & Figma MCP
    let proMaxTokens = null;
    let figmaTokens = null;

    if (extractedData.figma_url && this.figmaService.isConfigured()) {
      try {
        const parsed = this.figmaService.parseFigmaUrl(extractedData.figma_url);
        if (parsed?.fileKey) {
          figmaTokens = await this.figmaService.extractDesignTokens(parsed.fileKey, parsed.nodeId);
          console.log('[FIGMA MCP] Successfully extracted design tokens from Figma:', figmaTokens?.name);
        }
      } catch (figmaErr) {
        console.warn('[FIGMA MCP] Extraction warning:', figmaErr.message);
      }
    }

    if (fs.existsSync(this.skillScriptPath)) {
      try {
        const cleanQuery = query.replace(/["'\\]/g, '').substring(0, 100);
        const output = execSync(`python3 "${this.skillScriptPath}" "${cleanQuery}" --design-system`, {
          encoding: 'utf-8',
          timeout: 3000
        });
        proMaxTokens = this.parseProMaxOutput(output);
      } catch (err) {
        console.warn('[UI/UX PRO MAX] Query warning (using fallback palette):', err.message);
      }
    }

    // 2. Resolve Non-Repeating Color Palette, Font, Layout, 3D Objects, Text Size, and Cursors
    let matchedPalette = null;
    let matchedLayout = null;

    const lowerHint = styleHint.toLowerCase();
    const lowerRole = role.toLowerCase();
    const lowerTech = tech.toLowerCase();

    if (figmaTokens?.colors?.primary) {
      matchedPalette = {
        name: `Figma: ${figmaTokens.name}`,
        theme: figmaTokens.colors.background === '#ffffff' ? 'light' : 'dark',
        primary: figmaTokens.colors.primary,
        secondary: figmaTokens.colors.secondary || '#818cf8',
        accent: figmaTokens.colors.accent || '#22c55e',
        background: figmaTokens.colors.background,
        surface: figmaTokens.colors.background === '#ffffff' ? '#ffffff' : 'rgba(15, 23, 42, 0.85)',
        surface_card: figmaTokens.colors.background === '#ffffff' ? '#ffffff' : 'rgba(30, 41, 59, 0.65)',
        text: figmaTokens.colors.background === '#ffffff' ? '#0f172a' : '#f8fafc',
        text_muted: figmaTokens.colors.background === '#ffffff' ? '#64748b' : '#94a3b8',
        border: figmaTokens.colors.background === '#ffffff' ? '#e2e8f0' : 'rgba(255, 255, 255, 0.12)',
        glow: 'rgba(56, 189, 248, 0.2)'
      };
      matchedLayout = this.layoutPool.next();
    } else if (lowerHint.includes('neo') || lowerHint.includes('brutalist')) {
      matchedPalette = this.palettePool.next(p => p.theme === 'neo-brutalist');
      matchedLayout = this.layoutPool.next(l => l.includes('neo-brutalist'));
    } else if (lowerHint.includes('warm') || lowerHint.includes('editorial') || lowerHint.includes('minimal') || lowerHint.includes('cream')) {
      matchedPalette = this.palettePool.next(p => p.name.includes('Warm Paper') || p.theme === 'light');
      matchedLayout = this.layoutPool.next(l => l.includes('editorial'));
    } else if (lowerHint.includes('terminal') || lowerHint.includes('code') || lowerHint.includes('hacker') || lowerHint.includes('matrix')) {
      matchedPalette = this.palettePool.next(p => p.name.includes('Cyberpunk') || p.name.includes('Tokyo') || p.theme === 'dark');
      matchedLayout = this.layoutPool.next(l => l.includes('terminal'));
    } else if (lowerHint.includes('glass') || lowerHint.includes('kinetic') || lowerHint.includes('liquid')) {
      matchedPalette = this.palettePool.next(p => p.name.includes('Catppuccin') || p.name.includes('Modern') || p.name.includes('Nordic'));
      matchedLayout = this.layoutPool.next(l => l.includes('kinetic'));
    } else if (lowerHint.includes('dark') || lowerHint.includes('cyber') || lowerHint.includes('spatial') || lowerHint.includes('3d')) {
      matchedPalette = this.palettePool.next(p => p.theme === 'dark');
      matchedLayout = this.layoutPool.next(l => l.includes('spatial'));
    } else {
      // Exhaustive non-repeating cycle for layout and palette
      matchedPalette = this.palettePool.next();
      matchedLayout = this.layoutPool.next();
    }

    // Draw non-repeating typography font pairing, text sizing scale, 3D objects, and interactions
    const matchedFont = this.fontPool.next();
    const matchedTextScale = this.textScalePool.next();
    const matchedBaseFontSize = this.baseFontSizePool.next();
    const matchedHeadlineTracking = this.headlineTrackingPool.next();
    const matchedBackground3D = this.background3DPool.next();
    const matchedForeground3D = this.foreground3DPool.next();
    const matchedCursor = this.cursorPool.next();
    const matchedConfetti = this.confettiPool.next();

    const basePalette = matchedPalette || PALETTES[0];
    const baseFont = matchedFont || FONT_PAIRINGS[0];
    const layoutTemplate = matchedLayout || LAYOUT_TEMPLATES[0];

    const isLight = basePalette.theme === 'light';
    const isNeo = basePalette.theme === 'neo-brutalist' || layoutTemplate === 'neo-brutalist-3d';

    const primaryColor = basePalette.primary;
    const secondaryColor = basePalette.secondary;
    const accentColor = basePalette.accent;
    const bgColor = basePalette.background;
    const surfaceColor = basePalette.surface;
    const textColor = basePalette.text;

    const headingFont = proMaxTokens?.heading_font || baseFont.heading_font;
    const bodyFont = proMaxTokens?.body_font || baseFont.body_font;

    return {
      color_palette: {
        theme: isLight ? 'light' : isNeo ? 'neo-brutalist' : 'dark',
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        background: bgColor,
        surface: surfaceColor,
        surface_card: basePalette.surface_card || surfaceColor,
        text: textColor,
        text_muted: isLight ? (basePalette.text_muted || '#64748b') : (basePalette.text_muted || '#a1a1aa'),
        border: basePalette.border || (isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.08)'),
        glow: basePalette.glow || (isLight ? 'rgba(37, 99, 235, 0.12)' : 'rgba(56, 189, 248, 0.22)'),
        card_shadow: isNeo ? '6px 6px 0px var(--text)' : (basePalette.card_shadow || (isLight ? '0 10px 30px -10px rgba(0,0,0,0.08)' : '0 20px 40px -15px rgba(0,0,0,0.7)')),
        card_radius: isNeo ? '8px' : (layoutTemplate === 'terminal-3d-matrix' ? '12px' : '20px'),
        card_border_width: isNeo ? '2.5px' : '1px'
      },
      typography: {
        heading_font: headingFont,
        body_font: bodyFont,
        base_size: matchedBaseFontSize,
        scale_ratio: matchedTextScale,
        headline_tracking: matchedHeadlineTracking,
        line_height: 1.65
      },
      layout: layoutTemplate,
      background_3d: {
        object_type: matchedBackground3D,
        scene_type: matchedBackground3D
      },
      foreground_3d: {
        object_type: matchedForeground3D,
        interactive_type: matchedForeground3D
      },
      interactions: {
        threejs_3d: true,
        background_object: matchedBackground3D,
        foreground_object: matchedForeground3D,
        cursor_style: matchedCursor,
        confetti_style: matchedConfetti,
        magnetic_cursor: true,
        spotlight_tracker: true,
        scroll_parallax: true,
        tilt_cards: !isNeo,
        sparkles: !isLight,
        aurora: !isLight,
        confetti: true,
        filter_tabs: true,
        skill_highlight: true,
        smooth_scroll: true
      },
      palette_name: proMaxTokens?.styleName || basePalette.name
    };
  }

  parseProMaxOutput(raw) {
    if (!raw) return null;
    const getMatch = (regex) => {
      const m = raw.match(regex);
      return m ? m[1].trim() : null;
    };

    const primary = getMatch(/Primary:\s*(#[0-9A-Fa-f]{6})/);
    const secondary = getMatch(/Secondary:\s*(#[0-9A-Fa-f]{6})/);
    const accent = getMatch(/Accent\/CTA:\s*(#[0-9A-Fa-f]{6})/);
    const background = getMatch(/Background:\s*(#[0-9A-Fa-f]{6})/);
    const foreground = getMatch(/Foreground:\s*(#[0-9A-Fa-f]{6})/);
    const card = getMatch(/Card:\s*(#[0-9A-Fa-f]{6})/);
    const border = getMatch(/Border:\s*(#[0-9A-Fa-f]{6})/);

    let headingFont = null;
    let bodyFont = null;
    const fontMatch = raw.match(/TYPOGRAPHY[^\n]*\n[│\s]*([^\n│]+)/);
    if (fontMatch) {
      const parts = fontMatch[1].split('/');
      if (parts.length >= 2) {
        headingFont = parts[0].trim();
        bodyFont = parts[1].trim();
      } else {
        headingFont = parts[0].trim();
      }
    }

    const isLight = background && (background.toUpperCase() === '#FFFFFF' || background.toUpperCase() === '#F8FAFC' || background.toUpperCase().startsWith('#F'));

    return {
      primary,
      secondary,
      accent,
      background,
      foreground,
      card,
      border,
      heading_font: headingFont,
      body_font: bodyFont,
      theme: isLight ? 'light' : 'dark',
      styleName: getMatch(/Name:\s*([^\n\r│]+)/)
    };
  }
}

module.exports = { UIUXIntegration };
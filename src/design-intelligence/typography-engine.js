/**
 * Generative Typography Engine (Expanded Multi-Category Google & Variable Font Pool)
 * Curates 30+ bespoke font pairings across Serif, Sans, Display, Monospace, and Experimental families.
 */

const TYPOGRAPHY_PAIRINGS = [
  // 1. Haute & Literary Serifs
  {
    heading_font: 'Fraunces',
    body_font: 'Outfit',
    category: 'Editorial Serif + Geometric Sans',
    scale_ratio: 1.333,
    base_size: '16px',
    tracking: '-0.02em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap'
  },
  {
    heading_font: 'Cormorant Garamond',
    body_font: 'Montserrat',
    category: 'Haute Luxury Serif + Clean Sans',
    scale_ratio: 1.414,
    base_size: '16.5px',
    tracking: '0.01em',
    line_height: 1.7,
    import_url: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Instrument Serif',
    body_font: 'Manrope',
    category: 'Modern Craft Serif + Contemporary Sans',
    scale_ratio: 1.35,
    base_size: '16px',
    tracking: '-0.015em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap'
  },
  {
    heading_font: 'Libre Baskerville',
    body_font: 'Figtree',
    category: 'Heritage Literary + Humanist Sans',
    scale_ratio: 1.28,
    base_size: '16px',
    tracking: '-0.01em',
    line_height: 1.7,
    import_url: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Figtree:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'DM Serif Display',
    body_font: 'Work Sans',
    category: 'Bold Poster Serif + Functional Sans',
    scale_ratio: 1.38,
    base_size: '16px',
    tracking: '-0.02em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Work+Sans:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Bodoni Moda',
    body_font: 'Urbanist',
    category: 'High-Fashion Didone + Modern Geometric',
    scale_ratio: 1.45,
    base_size: '16px',
    tracking: '0.02em',
    line_height: 1.68,
    import_url: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;0,6..96,800;1,6..96,400&family=Urbanist:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Cinzel',
    body_font: 'Plus Jakarta Sans',
    category: 'Classical Monumental Roman + Modern Tech',
    scale_ratio: 1.3,
    base_size: '16px',
    tracking: '0.04em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap'
  },

  // 2. Modern Swiss, Grotesk & Kinetic Tech
  {
    heading_font: 'Syne',
    body_font: 'Inter',
    category: 'Avant-Garde Kinetic + Structured Sans',
    scale_ratio: 1.333,
    base_size: '16.5px',
    tracking: '-0.02em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Inter:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Space Grotesk',
    body_font: 'Sora',
    category: 'Spatial Tech Grotesk + Precision Sans',
    scale_ratio: 1.25,
    base_size: '16px',
    tracking: '-0.03em',
    line_height: 1.6,
    import_url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Sora:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Bricolage Grotesque',
    body_font: 'Public Sans',
    category: 'Idiosyncratic Neo-Grotesque + Clean Body',
    scale_ratio: 1.3,
    base_size: '16px',
    tracking: '-0.025em',
    line_height: 1.62,
    import_url: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Public+Sans:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Archivo',
    body_font: 'Space Grotesk',
    category: 'Heavy Brutalist Block + Tech Mono',
    scale_ratio: 1.414,
    base_size: '17px',
    tracking: '-0.04em',
    line_height: 1.55,
    import_url: 'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap'
  },
  {
    heading_font: 'Bebas Neue',
    body_font: 'DM Sans',
    category: 'Industrial Poster Display + Clean Sans',
    scale_ratio: 1.5,
    base_size: '16px',
    tracking: '0.02em',
    line_height: 1.6,
    import_url: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap'
  },
  {
    heading_font: 'Unbounded',
    body_font: 'Urbanist',
    category: 'Futuristic Ultra-Wide Display + Clean Sans',
    scale_ratio: 1.28,
    base_size: '15.5px',
    tracking: '-0.02em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800;900&family=Urbanist:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Epilogue',
    body_font: 'Mulish',
    category: 'Figma Community Native Display + Soft Sans',
    scale_ratio: 1.28,
    base_size: '16px',
    tracking: '-0.025em',
    line_height: 1.65,
    import_url: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700;800;900&family=Mulish:wght@300;400;500;600;700&display=swap'
  },

  // 3. Technical Monospaced & Cyberpunk
  {
    heading_font: 'JetBrains Mono',
    body_font: 'IBM Plex Sans',
    category: 'Developer CLI Monospace + Technical Sans',
    scale_ratio: 1.2,
    base_size: '15px',
    tracking: '-0.01em',
    line_height: 1.7,
    import_url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Fira Code',
    body_font: 'Fira Sans',
    category: 'Hacker Code Monospace + Clean Body',
    scale_ratio: 1.22,
    base_size: '15px',
    tracking: '0.0em',
    line_height: 1.68,
    import_url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@600;700&family=Fira+Sans:wght@300;400;500;600&display=swap'
  },
  {
    heading_font: 'Space Mono',
    body_font: 'Geist',
    category: 'Retro Sci-Fi Monospace + Minimal Sans',
    scale_ratio: 1.25,
    base_size: '15.5px',
    tracking: '-0.01em',
    line_height: 1.7,
    import_url: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,700;1,400&family=Geist:wght@300;400;500;600&display=swap'
  },

  // 4. Japanese Calligraphic & Wabi-Sabi
  {
    heading_font: 'Shippori Mincho',
    body_font: 'Zen Kaku Gothic New',
    category: 'Japanese Mincho Calligraphic + Quiet Gothic',
    scale_ratio: 1.28,
    base_size: '16px',
    tracking: '0.03em',
    line_height: 1.8,
    import_url: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@600;700;800&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap'
  },
  {
    heading_font: 'Noto Serif JP',
    body_font: 'Plus Jakarta Sans',
    category: 'Tokyo Zen Serif + Global Modern',
    scale_ratio: 1.25,
    base_size: '16px',
    tracking: '0.02em',
    line_height: 1.75,
    import_url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap'
  }
];

class TypographyEngine {
  constructor() {
    this.usedHistory = [];
  }

  resolve(mode, memoryRecentPairings = []) {
    // Filter out pairings that were used in recent generations
    const available = TYPOGRAPHY_PAIRINGS.filter(p => {
      const key = `${p.heading_font} + ${p.body_font}`;
      return !memoryRecentPairings.includes(key);
    });

    const pool = available.length > 0 ? available : TYPOGRAPHY_PAIRINGS;

    let selected = pool[0];
    const m = (mode || '').toLowerCase();

    if (m.includes('editorial') || m.includes('magazine')) {
      selected = pool.find(p => p.heading_font === 'Fraunces' || p.heading_font === 'Instrument Serif' || p.heading_font === 'DM Serif Display') || pool[0];
    } else if (m.includes('luxury') || m.includes('fashion')) {
      selected = pool.find(p => p.heading_font === 'Cormorant Garamond' || p.heading_font === 'Bodoni Moda' || p.heading_font === 'Cinzel') || pool[0];
    } else if (m.includes('terminal') || m.includes('technical')) {
      selected = pool.find(p => p.heading_font === 'JetBrains Mono' || p.heading_font === 'Fira Code' || p.heading_font === 'Space Mono') || pool[0];
    } else if (m.includes('japanese') || m.includes('zen') || m.includes('organic')) {
      selected = pool.find(p => p.heading_font === 'Shippori Mincho' || p.heading_font === 'Noto Serif JP' || p.heading_font === 'Libre Baskerville') || pool[0];
    } else if (m.includes('brutalist')) {
      selected = pool.find(p => p.heading_font === 'Archivo' || p.heading_font === 'Bebas Neue' || p.heading_font === 'Bricolage Grotesque') || pool[0];
    } else if (m.includes('futuristic') || m.includes('spatial')) {
      selected = pool.find(p => p.heading_font === 'Unbounded' || p.heading_font === 'Space Grotesk' || p.heading_font === 'Syne') || pool[0];
    } else if (m.includes('swiss')) {
      selected = pool.find(p => p.heading_font === 'Syne' || p.heading_font === 'Bricolage Grotesque' || p.heading_font === 'Epilogue') || pool[0];
    } else {
      selected = pool[Math.floor(Math.random() * pool.length)];
    }

    return selected;
  }
}

module.exports = { TypographyEngine, TYPOGRAPHY_PAIRINGS };

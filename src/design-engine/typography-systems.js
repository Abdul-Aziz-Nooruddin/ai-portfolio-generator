/**
 * Coherent Typographic Systems
 * Defines 10+ mathematical, legible, and aesthetically distinct typography pairings.
 * Each system specifies display font, body font, monospace font, scale ratio, weight hierarchy, and tracking.
 */

const TYPOGRAPHY_SYSTEMS = {
  'swiss-grotesk': {
    id: 'swiss-grotesk',
    name: 'Swiss International Grotesk',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500',
    scaleRatio: 1.333,
    baseSize: '16px',
    tracking: '-0.03em',
    lineHeight: 1.5,
    weights: { heading: 800, subheading: 600, body: 400, code: 500 },
    displayTreatment: 'tight-uppercase-accent',
    compatibility: ['swiss-editorial', 'technical-lab', 'monochrome-gallery', 'minimal-single-screen']
  },
  'contemporary-editorial': {
    id: 'contemporary-editorial',
    name: 'Contemporary Editorial Serif & Sans',
    headingFont: 'Fraunces',
    bodyFont: 'Outfit',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Fraunces:opsz,wght@9..144,600;700;800;900&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.414,
    baseSize: '16px',
    tracking: '-0.02em',
    lineHeight: 1.6,
    weights: { heading: 900, subheading: 500, body: 400, code: 400 },
    displayTreatment: 'italic-accent-serif',
    compatibility: ['contemporary-magazine', 'warm-editorial', 'editorial-monograph', 'magazine-spread-columns']
  },
  'neo-brutalist-display': {
    id: 'neo-brutalist-display',
    name: 'Neo-Brutalist High Voltage Display',
    headingFont: 'Unbounded',
    bodyFont: 'Space Grotesk',
    monoFont: 'Space Mono',
    fontUrls: 'family=Unbounded:wght@700;800;900&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700',
    scaleRatio: 1.414,
    baseSize: '16px',
    tracking: '-0.04em',
    lineHeight: 1.4,
    weights: { heading: 900, subheading: 700, body: 500, code: 700 },
    displayTreatment: 'monumental-solid-caps',
    compatibility: ['brutalist-pop', 'computational-terminal', 'asymmetric-bento-canvas']
  },
  'technical-mono-sans': {
    id: 'technical-mono-sans',
    name: 'Technical Laboratory Mono & Humanist Sans',
    headingFont: 'JetBrains Mono',
    bodyFont: 'IBM Plex Sans',
    monoFont: 'Fira Code',
    fontUrls: 'family=JetBrains+Mono:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=Fira+Code:wght@400;500',
    scaleRatio: 1.25,
    baseSize: '15px',
    tracking: '-0.01em',
    lineHeight: 1.65,
    weights: { heading: 700, subheading: 600, body: 400, code: 500 },
    displayTreatment: 'cli-prompt-code',
    compatibility: ['technical-lab', 'computational-terminal', 'split-screen-dossier']
  },
  'cinematic-grotesk': {
    id: 'cinematic-grotesk',
    name: 'Cinematic Obsidian Grotesk',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.333,
    baseSize: '16px',
    tracking: '-0.02em',
    lineHeight: 1.55,
    weights: { heading: 700, subheading: 600, body: 400, code: 400 },
    displayTreatment: 'luminous-glow-heading',
    compatibility: ['cinematic-obsidian', 'futuristic-spatial', 'spatial-3d-stage', 'work-first-runway']
  },
  'high-contrast-editorial': {
    id: 'high-contrast-editorial',
    name: 'High-Contrast Scholarly Serif',
    headingFont: 'Playfair Display',
    bodyFont: 'Source Sans 3',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.414,
    baseSize: '16px',
    tracking: '-0.015em',
    lineHeight: 1.65,
    weights: { heading: 800, subheading: 600, body: 400, code: 400 },
    displayTreatment: 'classic-serif-dropcap',
    compatibility: ['warm-editorial', 'editorial-monograph', 'contemporary-magazine']
  },
  'geometric-modernist': {
    id: 'geometric-modernist',
    name: 'Geometric Modernist Clean',
    headingFont: 'Outfit',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.25,
    baseSize: '16px',
    tracking: '-0.025em',
    lineHeight: 1.5,
    weights: { heading: 800, subheading: 600, body: 400, code: 400 },
    displayTreatment: 'clean-geometric-minimal',
    compatibility: ['minimal-single-screen', 'asymmetric-bento-canvas', 'swiss-editorial']
  },
  'condensed-monograph': {
    id: 'condensed-monograph',
    name: 'Condensed Heavy Architectural',
    headingFont: 'Oswald',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Oswald:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.333,
    baseSize: '16px',
    tracking: '0.01em',
    lineHeight: 1.55,
    weights: { heading: 700, subheading: 600, body: 400, code: 500 },
    displayTreatment: 'condensed-all-caps-lead',
    compatibility: ['monochrome-gallery', 'horizontal-exhibition', 'work-first-runway']
  },
  'kinetic-spatial-display': {
    id: 'kinetic-spatial-display',
    name: 'Kinetic Spatial Wide Display',
    headingFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    monoFont: 'Space Mono',
    fontUrls: 'family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Mono:wght@400',
    scaleRatio: 1.414,
    baseSize: '16px',
    tracking: '-0.03em',
    lineHeight: 1.45,
    weights: { heading: 800, subheading: 600, body: 400, code: 400 },
    displayTreatment: 'wide-tracking-cyber',
    compatibility: ['futuristic-spatial', 'spatial-3d-stage', 'brutalist-pop']
  },
  'humanist-engineering': {
    id: 'humanist-engineering',
    name: 'Humanist Engineering Dossier',
    headingFont: 'Epilogue',
    bodyFont: 'Work Sans',
    monoFont: 'JetBrains Mono',
    fontUrls: 'family=Epilogue:wght@700;800&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400',
    scaleRatio: 1.25,
    baseSize: '16px',
    tracking: '-0.02em',
    lineHeight: 1.6,
    weights: { heading: 800, subheading: 600, body: 400, code: 500 },
    displayTreatment: 'dossier-annotated-header',
    compatibility: ['split-screen-dossier', 'narrative-timeline', 'technical-lab']
  }
};

class TypographyEngine {
  static getSystem(id) {
    return TYPOGRAPHY_SYSTEMS[id] || TYPOGRAPHY_SYSTEMS['swiss-grotesk'];
  }

  static getAllSystems() {
    return Object.values(TYPOGRAPHY_SYSTEMS);
  }

  static selectSystem(contentProfile, visualUniverseId, recentHistory = []) {
    const systems = Object.values(TYPOGRAPHY_SYSTEMS);
    const compatible = systems.filter(s => s.compatibility.includes(visualUniverseId) || s.compatibility.includes('technical-lab'));
    const pool = compatible.length > 0 ? compatible : systems;

    // Rotate against recent history
    const recentSystemIds = recentHistory.map(h => h.typographySystemId).filter(Boolean);
    const nonRecent = pool.filter(s => !recentSystemIds.slice(-4).includes(s.id));
    const finalCandidates = nonRecent.length > 0 ? nonRecent : pool;

    return finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
  }
}

module.exports = { TYPOGRAPHY_SYSTEMS, TypographyEngine };

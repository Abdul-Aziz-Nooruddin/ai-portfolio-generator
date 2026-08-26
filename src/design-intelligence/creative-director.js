/**
 * Creative Director Engine & Design World Synthesizer
 * Formulates coherent artistic visions, visual eras, brand moods, and architectural compatibility.
 * Operates on the principle of COHERENT NOVELTY (no random garbage, genuine distinct art direction).
 */

const CREATIVE_MODES = [
  {
    id: 'Swiss',
    name: 'Swiss Modernism 2.0',
    era: 'Contemporary European International Style',
    brandMood: 'Architectural, Disciplined, Objective, Rigorous',
    narrative: 'Architectural clarity, asymmetric grid precision, stark high-contrast typography, and purposeful negative space.',
    compatibleLayouts: ['swiss-grid-minimal', 'bento-canvas-studio'],
    compatibleMotions: ['mechanical-snapping', 'minimal-quiet', 'editorial-reveal'],
    suitableRoles: ['Developer', 'Architect', 'Product Designer', 'Director', 'Systems Engineer']
  },
  {
    id: 'Editorial',
    name: 'High-Fashion Editorial Magazine',
    era: 'Contemporary Milanese Editorial',
    brandMood: 'Dramatic, Cultured, Editorial, Haute',
    narrative: 'Dramatic serif headlines, asymmetric column spans, cinematic whitespace, and editorial pull-quotes.',
    compatibleLayouts: ['asymmetric-editorial', 'bento-canvas-studio'],
    compatibleMotions: ['editorial-reveal', 'cinematic-pan'],
    suitableRoles: ['Creative Technologist', 'Art Director', 'Writer', 'Photographer', 'Designer']
  },
  {
    id: 'Futuristic',
    name: 'VisionOS Spatial 3D Interface',
    era: 'Near-Future Spatial Computing & Glassmorphism',
    brandMood: 'Luminous, Volumetric, Fluid, Dimensional',
    narrative: 'Floating frosted spatial windows, luminous depth layering, interactive 3D WebGL meshes, and dynamic specular lighting.',
    compatibleLayouts: ['spatial-vision-3d', 'asymmetric-editorial'],
    compatibleMotions: ['cinematic-pan', 'fluid-spring'],
    suitableRoles: ['3D WebGL Engineer', 'AI Researcher', 'Full-Stack Developer', 'Game Developer']
  },
  {
    id: 'Terminal',
    name: 'Cyberpunk Terminal OS & Matrix Grid',
    era: 'Retro-Futuristic Cyberdeck CLI',
    brandMood: 'Raw, Technical, Cryptographic, Uncompromising',
    narrative: 'Monospaced command-line interface, interactive command parser, 3D perspective TRON grid, and CRT phosphorescence.',
    compatibleLayouts: ['terminal-matrix-os', 'swiss-grid-minimal'],
    compatibleMotions: ['mechanical-snapping', 'experimental-glitch'],
    suitableRoles: ['Security Auditor', 'Systems Programmer', 'DevOps Architect', 'Kernel Engineer', 'Hacker']
  },
  {
    id: 'Neo-Brutalist',
    name: 'Neo-Brutalist Pop Studio',
    era: 'Post-Modern Digital Pop & Anti-Design',
    brandMood: 'Hyper-Tactile, Energetic, Unapologetic, Bold',
    narrative: 'Unapologetic chunky black outlines, hard offset drop shadows, vibrant high-saturation pills, and tactile bouncy physics.',
    compatibleLayouts: ['neo-brutalist-split', 'figma-community-master'],
    compatibleMotions: ['brutalist-instant', 'playful-elastic'],
    suitableRoles: ['Frontend Developer', 'Motion Designer', 'Product Builder', 'Indie Hacker', 'Creator']
  },
  {
    id: 'Luxury',
    name: 'Luxury Architectural Atelier',
    era: 'Haute Horlogerie & Private Commissions',
    brandMood: 'Refined, Monastic, Obsidian, Prestigious',
    narrative: 'Understated matte textures, champagne/gold foil accents, generous breathing room, and whisper-quiet cinematic micro-transitions.',
    compatibleLayouts: ['asymmetric-editorial', 'bento-canvas-studio'],
    compatibleMotions: ['cinematic-pan', 'editorial-reveal'],
    suitableRoles: ['Architect', 'Interior Designer', 'Executive Consultant', 'Luxury Brand Strategist']
  },
  {
    id: 'Japanese Minimal',
    name: 'Japanese Wabi-Sabi Minimalism',
    era: 'Organic Kyoto Monograph & Zen Craft',
    brandMood: 'Serene, Earthy, Contemplative, Unhurried',
    narrative: 'Imperfect natural balance, warm unbleached paper tones, refined vertical Japanese typography accents, and organic calm.',
    compatibleLayouts: ['bento-canvas-studio', 'asymmetric-editorial'],
    compatibleMotions: ['minimal-quiet', 'editorial-reveal'],
    suitableRoles: ['Designer', 'Full-Stack Engineer', 'Ceramist', 'Product Architect', 'Photographer']
  },
  {
    id: 'Cinematic',
    name: 'Cinematic Visual Monograph',
    era: 'Anamorphic Film & Director Archive',
    brandMood: 'Atmospheric, Panoramic, Immersive, Monumental',
    narrative: 'Letterbox aspect ratios, panoramic project showcases, smooth inertia scrolling, and high-impact hero statements.',
    compatibleLayouts: ['asymmetric-editorial', 'spatial-vision-3d'],
    compatibleMotions: ['cinematic-pan', 'fluid-spring'],
    suitableRoles: ['Motion Designer', 'Creative Director', 'Filmmaker', 'Digital Artist']
  },
  {
    id: 'Playful',
    name: 'Playful Kinetic Sandbox',
    era: 'Y2K Creative Toy & Generative Playground',
    brandMood: 'Whimsical, Joyful, Tactile, Animated',
    narrative: 'Interactive draggable physics cards, vibrant pastel color clashes, whimsical micro-animations, and celebratory confetti triggers.',
    compatibleLayouts: ['figma-community-master', 'neo-brutalist-split'],
    compatibleMotions: ['playful-elastic', 'fluid-spring'],
    suitableRoles: ['UI/UX Designer', 'Frontend Creative', 'Game Developer', 'Illustrator']
  },
  {
    id: 'Experimental',
    name: 'Avant-Garde Digital Gallery',
    era: 'Contemporary Net-Art & Deconstructivism',
    brandMood: 'Disruptive, Generative, Provocative, Raw',
    narrative: 'Deconstructed grid layouts, interactive cursor distortion, morphing procedural wireframes, and horizontal-vertical dual axes.',
    compatibleLayouts: ['spatial-vision-3d', 'neo-brutalist-split', 'terminal-matrix-os'],
    compatibleMotions: ['experimental-glitch', 'fluid-spring'],
    suitableRoles: ['Creative Developer', 'New Media Artist', 'WebGL Wizard', 'AI Engineer']
  },
  {
    id: 'Nordic Stone',
    name: 'Nordic Slate Architectural Monolith',
    era: 'Scandinavian Industrial Architecture',
    brandMood: 'Monolithic, Chiseled, Minimalist, Subdued',
    narrative: 'Chiseled slate typography, hairline structural divisions, muted mineral palette, and disciplined grid architecture.',
    compatibleLayouts: ['swiss-grid-minimal', 'bento-canvas-studio'],
    compatibleMotions: ['minimal-quiet', 'mechanical-snapping'],
    suitableRoles: ['Systems Engineer', 'Industrial Designer', 'Data Scientist']
  },
  {
    id: 'Tokyo Neon',
    name: 'Tokyo Cybernetic Shinjuku Night',
    era: 'Neo-Tokyo Cybernetic Glass',
    brandMood: 'Electric, Dynamic, Saturated, Synthetic',
    narrative: 'Deep obsidian backdrop illuminated by emerald and indigo neon beams, high-density telemetry, and rapid-response interaction.',
    compatibleLayouts: ['terminal-matrix-os', 'spatial-vision-3d'],
    compatibleMotions: ['mechanical-snapping', 'cinematic-pan'],
    suitableRoles: ['Security Specialist', 'Full-Stack Developer', 'Infrastructure Lead']
  }
];

class CreativeDirector {
  constructor() {
    this.modeHistory = [];
  }

  /**
   * Synthesize a bespoke Creative Direction based on user profile and non-repeating cycle
   */
  direct(userProfile = {}, explicitModeHint = null, recentModes = []) {
    const role = userProfile.role || userProfile.service_title || 'Software Architect';
    const personality = userProfile.bio || userProfile.tagline || '';

    let selectedMode;

    if (explicitModeHint && explicitModeHint !== 'auto-cycle') {
      selectedMode = CREATIVE_MODES.find(m => m.id.toLowerCase() === explicitModeHint.toLowerCase()) || CREATIVE_MODES[0];
    } else {
      // Exclude recent modes to prevent repetitive clustering
      const forbidden = new Set(recentModes.slice(0, 4));
      const availableModes = CREATIVE_MODES.filter(m => !forbidden.has(m.id) && !this.modeHistory.slice(-4).includes(m.id));
      const pool = availableModes.length > 0 ? availableModes : CREATIVE_MODES;
      
      // Match role preferences if available
      const roleMatches = pool.filter(m => m.suitableRoles.some(r => role.toLowerCase().includes(r.toLowerCase())));
      selectedMode = roleMatches.length > 0 
        ? roleMatches[Math.floor(Math.random() * roleMatches.length)]
        : pool[Math.floor(Math.random() * pool.length)];
    }

    this.modeHistory.push(selectedMode.id);
    if (this.modeHistory.length > 12) this.modeHistory.shift();

    return {
      mode: selectedMode.id,
      conceptTitle: selectedMode.name,
      era: selectedMode.era,
      brandMood: selectedMode.brandMood,
      narrative: selectedMode.narrative,
      compatibleLayouts: selectedMode.compatibleLayouts,
      compatibleMotions: selectedMode.compatibleMotions,
      roleAlignment: role
    };
  }
}

module.exports = { CreativeDirector, CREATIVE_MODES };

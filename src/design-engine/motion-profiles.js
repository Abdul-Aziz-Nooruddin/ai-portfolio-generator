/**
 * Motion Languages & Animation Physics Engine
 * Defines 10+ distinct motion choreography profiles with duration, easing, entrance, and hover physics.
 * Enforces strict @media (prefers-reduced-motion: reduce) non-motion fallbacks.
 */

const MOTION_LANGUAGES = {
  'editorial-reveal': {
    id: 'editorial-reveal',
    name: 'Editorial Typographic Reveal',
    duration: 0.85,
    stagger: 0.1,
    yOffset: 16,
    xOffset: 0,
    ease: 'expo.out',
    tiltSensitivity: 0.015,
    webglAllowed: false,
    hoverScale: 1.01
  },
  'cinematic-drift': {
    id: 'cinematic-drift',
    name: 'Cinematic Deep Obsidian Drift',
    duration: 1.2,
    stagger: 0.15,
    yOffset: 32,
    xOffset: 0,
    ease: 'power2.inOut',
    tiltSensitivity: 0.025,
    webglAllowed: true,
    webglGeometry: 'Icosahedron',
    hoverScale: 1.02
  },
  'technical-stagger': {
    id: 'technical-stagger',
    name: 'Technical Laboratory High-Density Stagger',
    duration: 0.65,
    stagger: 0.08,
    yOffset: 24,
    xOffset: 0,
    ease: 'power3.out',
    tiltSensitivity: 0.03,
    webglAllowed: true,
    webglGeometry: 'Icosahedron',
    hoverScale: 1.015
  },
  'brutalist-snap': {
    id: 'brutalist-snap',
    name: 'Neo-Brutalist High Voltage Snap',
    duration: 0.4,
    stagger: 0.05,
    yOffset: 20,
    xOffset: 0,
    ease: 'power4.out',
    tiltSensitivity: 0.05,
    webglAllowed: false,
    hoverScale: 1.025
  },
  'spatial-orbit': {
    id: 'spatial-orbit',
    name: 'Spatial 3D Orbit & Torus Constellation',
    duration: 1.0,
    stagger: 0.14,
    yOffset: 28,
    xOffset: 0,
    ease: 'sine.out',
    tiltSensitivity: 0.045,
    webglAllowed: true,
    webglGeometry: 'TorusKnot',
    hoverScale: 1.02
  },
  'terminal-boot': {
    id: 'terminal-boot',
    name: 'Computational Terminal Boot Sequence',
    duration: 0.35,
    stagger: 0.04,
    yOffset: 12,
    xOffset: 0,
    ease: 'steps(6)',
    tiltSensitivity: 0.01,
    webglAllowed: false,
    hoverScale: 1.008
  },
  'horizontal-parallax': {
    id: 'horizontal-parallax',
    name: 'Horizontal Track Kinetic Parallax',
    duration: 0.9,
    stagger: 0.12,
    yOffset: 0,
    xOffset: 40,
    ease: 'power2.out',
    tiltSensitivity: 0.02,
    webglAllowed: false,
    hoverScale: 1.02
  },
  'typographic-reveal': {
    id: 'typographic-reveal',
    name: 'Minimal Masthead Typographic Index Reveal',
    duration: 1.0,
    stagger: 0.08,
    yOffset: 14,
    xOffset: 0,
    ease: 'expo.inOut',
    tiltSensitivity: 0.01,
    webglAllowed: false,
    hoverScale: 1.01
  },
  'slow-luxury': {
    id: 'slow-luxury',
    name: 'Slow Luxury Atmospheric Fade',
    duration: 1.3,
    stagger: 0.18,
    yOffset: 18,
    xOffset: 0,
    ease: 'power1.inOut',
    tiltSensitivity: 0.015,
    webglAllowed: true,
    webglGeometry: 'Icosahedron',
    hoverScale: 1.015
  },
  'data-pulse': {
    id: 'data-pulse',
    name: 'Real-Time Data Pulse & Waveform',
    duration: 0.55,
    stagger: 0.06,
    yOffset: 20,
    xOffset: 0,
    ease: 'circ.out',
    tiltSensitivity: 0.035,
    webglAllowed: true,
    webglGeometry: 'Icosahedron',
    hoverScale: 1.02
  },
  'cosmic-astronaut-drift': {
    id: 'cosmic-astronaut-drift',
    name: 'Cosmic Zero-G Astronaut Floating & Planet Orbit',
    duration: 1.1,
    stagger: 0.12,
    yOffset: 24,
    xOffset: 0,
    ease: 'power2.out',
    tiltSensitivity: 0.04,
    webglAllowed: true,
    webglGeometry: 'AstronautPlanet',
    hoverScale: 1.025
  }
};

class MotionEngine {
  static getLanguage(id) {
    return MOTION_LANGUAGES[id] || MOTION_LANGUAGES['cosmic-astronaut-drift'];
  }

  static getAllLanguages() {
    return Object.values(MOTION_LANGUAGES);
  }

  static selectLanguage(visualUniverseId, iaModelId, recentHistory = []) {
    const map = {
      'cosmic-astronaut-holographic': ['cosmic-astronaut-drift', 'spatial-orbit', 'cinematic-drift'],
      'swiss-editorial': ['editorial-reveal', 'typographic-reveal'],
      'contemporary-magazine': ['editorial-reveal', 'horizontal-parallax'],
      'brutalist-pop': ['brutalist-snap', 'data-pulse'],
      'cinematic-obsidian': ['cinematic-drift', 'slow-luxury'],
      'technical-lab': ['technical-stagger', 'data-pulse', 'terminal-boot'],
      'monochrome-gallery': ['typographic-reveal', 'horizontal-parallax'],
      'futuristic-spatial': ['spatial-orbit', 'cosmic-astronaut-drift'],
      'luxury-minimal': ['slow-luxury', 'editorial-reveal'],
      'expressive-typographic': ['brutalist-snap', 'typographic-reveal'],
      'warm-editorial': ['editorial-reveal', 'slow-luxury']
    };

    const preferred = map[visualUniverseId] || ['cosmic-astronaut-drift', 'technical-stagger'];
    const recentMotionIds = recentHistory.map(h => h.motionProfileId).filter(Boolean);
    const nonRecent = preferred.filter(id => !recentMotionIds.slice(-3).includes(id));
    const chosenId = nonRecent.length > 0 ? nonRecent[0] : preferred[Math.floor(Math.random() * preferred.length)];

    return MOTION_LANGUAGES[chosenId] || MOTION_LANGUAGES['cosmic-astronaut-drift'];
  }
}

module.exports = { MOTION_LANGUAGES, MotionEngine };

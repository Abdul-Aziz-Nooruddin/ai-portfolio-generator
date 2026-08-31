/**
 * Template 01: Cosmic Astronaut Holographic Developer Studio (Image 4)
 * Theme: Deep Space Obsidian (#060814), Neon Violet (#8B5CF6), Electric Cyan (#38BDF8)
 * 3D Engine: Three.js Chibi Astronaut, Glowing Ringed Planet & 1,400 Particle Starfield
 */

const { HtmlRenderer } = require('../../design-engine/html-renderer');
const { WebGLMotion } = require('../../design-engine/webgl-motion');

const CosmicAstronautTemplate = {
  id: 'cosmic-astronaut',
  name: 'Cosmic Astronaut Studio',
  category: '3D Spatial / Sci-Fi',
  description: 'Futuristic space developer studio featuring a 3D Chibi Astronaut, orbiting planetary tech constellation, command desk pod, and quantum satellite transmitter.',
  thumbnail: '/assets/templates/cosmic-astronaut.jpg',
  palette: {
    bg: '#060814',
    surface: '#0B0D19',
    surfaceAlt: '#121526',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    primary: '#8B5CF6',
    accent: '#38BDF8',
    border: 'rgba(139, 92, 246, 0.25)',
    glow: 'rgba(139, 92, 246, 0.35)'
  },
  recommendedFor: ['AI/ML Engineer', 'Full Stack Developer', 'Creative Technologist', 'Web3 / Blockchain Developer'],

  /**
   * Render method: Ingests candidate profile and replaces all dynamic content
   */
  render(candidateData = {}, options = {}) {
    const visualUniverse = {
      id: 'cosmic-astronaut-holographic',
      name: 'Cosmic Astronaut Holographic',
      colors: this.palette,
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      borderRadius: '16px'
    };

    const motionOutput = WebGLMotion.getMotionCode(visualUniverse, { id: 'cosmic-spatial-canvas' });
    const motion = {
      libraries: motionOutput.libraries || '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
      canvasHtml: motionOutput.canvasHtml || '',
      js: motionOutput.js || options.motionJs || ''
    };

    const raw = HtmlRenderer.renderCosmicAstronautLayout(candidateData, visualUniverse, motion, options.compositionPlan || null);
    const html = typeof raw === 'string' ? raw : (raw.html || '');
    return {
      html,
      css: '',
      js: motion.js
    };
  }
};

module.exports = { CosmicAstronautTemplate };

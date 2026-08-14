/**
 * Shader Template Loader
 * Loads and customizes Radiant Shaders for portfolio backgrounds
 */

const SHADER_REGISTRY = {
  'digital-rain': {
    id: 'digital-rain',
    name: 'Digital Rain',
    file: 'digital-rain.glsl',
    mobileFriendly: true,
    intensity: 'medium'
  },
  'event-horizon': {
    id: 'event-horizon',
    name: 'Event Horizon',
    file: 'event-horizon.glsl',
    mobileFriendly: false,
    intensity: 'high'
  },
  'rain-on-glass': {
    id: 'rain-on-glass',
    name: 'Rain on Glass',
    file: 'rain-on-glass.glsl',
    mobileFriendly: true,
    intensity: 'medium'
  },
  'flow-field': {
    id: 'flow-field',
    name: 'Flow Field',
    file: 'flow-field.glsl',
    mobileFriendly: true,
    intensity: 'low'
  },
  'silk-groove': {
    id: 'silk-groove',
    name: 'Silk Groove',
    file: 'silk-groove.glsl',
    mobileFriendly: true,
    intensity: 'low'
  },
  'painted-strata': {
    id: 'painted-strata',
    name: 'Painted Strata',
    file: 'painted-strata.glsl',
    mobileFriendly: true,
    intensity: 'low'
  },
  'liquid-gold': {
    id: 'liquid-gold',
    name: 'Liquid Gold',
    file: 'liquid-gold.glsl',
    mobileFriendly: true,
    intensity: 'medium'
  },
  'chromatic-bloom': {
    id: 'chromatic-bloom',
    name: 'Chromatic Bloom',
    file: 'chromatic-bloom.glsl',
    mobileFriendly: true,
    intensity: 'medium'
  },
  'aurora-veil': {
    id: 'aurora-veil',
    name: 'Aurora Veil',
    file: 'aurora-veil.glsl',
    mobileFriendly: true,
    intensity: 'low'
  }
};

class ShaderLoader {
  constructor() {
    this.shaders = new Map();
  }

  /**
   * Load shader and customize colors
   */
  async loadShader(shaderId, colorPalette) {
    const registry = SHADER_REGISTRY[shaderId];
    if (!registry) {
      console.warn(`[Shader] Unknown shader ${shaderId}, falling back to flow-field`);
      return this.loadShader('flow-field', colorPalette);
    }

    // In production, load from file system or CDN
    // For now, return the shader wrapper HTML
    return this.generateShaderHTML(registry, colorPalette);
  }

  /**
   * Generate shader canvas HTML with color customization
   */
  generateShaderHTML(shader, palette) {
    const primary = palette.primary || '#2563eb';
    const secondary = palette.secondary || '#7c3aed';
    const background = palette.background || '#fafaf9';

    return `
<!-- ${shader.name} Shader Background -->
<canvas id="shader-bg" class="shader-background"></canvas>
<script>
(function() {
  const canvas = document.getElementById('shader-bg');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    // WebGL not supported - show static gradient fallback
    canvas.style.background = 'linear-gradient(135deg, ${primary}22, ${secondary}22)';
    return;
  }

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.background = 'linear-gradient(135deg, ${primary}15, ${secondary}15)';
    return;
  }

  // Resize canvas
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  // Shader program would be loaded here
  // For production, inject the actual GLSL from radiant-shaders.com

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause rendering loop
    } else {
      // Resume rendering loop
    }
  });
})();
</script>
<style>
  .shader-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
</style>`;
  }

  /**
   * Get shader info for a given branch
   */
  getShaderForBranch(branch, vibe = '') {
    const vibeLower = vibe.toLowerCase();

    const branchMap = {
      'A': {  // Developer
        'code': 'digital-rain',
        'visual': 'event-horizon',
        'animation': 'event-horizon',
        'design': 'flow-field',
        'creative': 'event-horizon',
        'cyberpunk': 'digital-rain',
        'default': 'digital-rain'
      },
      'B': {  // Freelancer
        'photographer': 'rain-on-glass',
        'wedding': 'aurora-veil',
        'luxury': 'liquid-gold',
        'interior': 'liquid-gold',
        'coach': 'silk-groove',
        'beauty': 'chromatic-bloom',
        'default': 'silk-groove'
      },
      'C': {  // Student
        'cs': 'flow-field',
        'design': 'flow-field',
        'simple': 'painted-strata',
        'default': 'painted-strata'
      },
      'D': {  // General Professional
        'corporate': 'silk-groove',
        'creative': 'painted-strata',
        'tech': 'flow-field',
        'default': 'silk-groove'
      }
    };

    const branchShaders = branchMap[branch] || branchMap['D'];

    for (const [key, shaderId] of Object.entries(branchShaders)) {
      if (key !== 'default' && vibeLower.includes(key)) {
        return SHADER_REGISTRY[shaderId];
      }
    }

    return SHADER_REGISTRY[branchShaders.default];
  }
}

module.exports = { ShaderLoader, SHADER_REGISTRY };

/**
 * Motion & Interaction Agent
 * Determines meaningful, physics-grounded animations, scroll triggers, and selective WebGL scenes.
 * Strictly avoids unmotivated decoration and enforces reduced-motion fallbacks.
 */

const { WebGLMotion } = require('../../design-engine/webgl-motion');

class MotionInteractionAgent {
  async execute(contentProfile, visualUniverse = {}, iaStrategy = {}, context = {}) {
    const universe = visualUniverse.decision || visualUniverse;
    const iaModel = iaStrategy.decision || iaStrategy;

    const motionResult = WebGLMotion.getMotionCode(universe, iaModel);

    const hasProjects = Array.isArray(contentProfile.projects) && contentProfile.projects.length > 0;
    const isWebGLActive = hasProjects && Boolean(motionResult.canvasHtml && motionResult.canvasHtml.trim().length > 0);

    return {
      agent: 'motion-interaction-agent',
      decision: {
        intensity: universe.id === 'brutalist-pop' || universe.id === 'futuristic-spatial' ? 'expressive' : 'subtle-editorial',
        technology: isWebGLActive ? 'Three.js + GSAP 3.12' : 'GSAP 3.12 ScrollTrigger',
        webglActive: isWebGLActive,
        scrollBehavior: 'smooth-reveal-on-scroll',
        hoverEffects: 'fluid-scale-and-border-glow',
        reducedMotionFallback: 'prefers-reduced-motion: zero-duration transitions',
        motionCode: motionResult
      },
      reasoning_summary: `Synthesized motion system with ${isWebGLActive ? 'ambient Three.js scene and ' : ''}GSAP 3.12 ScrollTriggers for universe '${universe.id}'.`,
      confidence: 0.93,
      recommendations: {
        webglActive: isWebGLActive,
        motionIntensity: universe.id === 'brutalist-pop' ? 'high' : 'medium'
      },
      constraints: [
        'ENFORCE_PREFERS_REDUCED_MOTION_SUPPORT',
        'LIMIT_THREEJS_SCENE_COUNT_TO_ONE'
      ],
      evidence: [
        `WebGL justified: ${isWebGLActive ? 'YES (aligned with aesthetic universe ' + universe.id + ')' : 'NO (pure CSS/GSAP used)'}`
      ]
    };
  }
}

module.exports = { MotionInteractionAgent };

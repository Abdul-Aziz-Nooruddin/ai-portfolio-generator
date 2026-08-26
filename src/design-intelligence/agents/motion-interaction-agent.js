/**
 * Motion & Interaction Agent
 * Selects from 10+ distinct motion languages and animation physics.
 * Authors GSAP ScrollTrigger timelines and selective Three.js canvases with reduced-motion compliance.
 */

const { MotionEngine } = require('../../design-engine/motion-profiles');
const { WebGLMotion } = require('../../design-engine/webgl-motion');

class MotionInteractionAgent {
  async execute(contentProfile, visualIdentity = {}, iaStrategy = {}, recentHistoryOrContext = [], context = {}) {
    const recentHistory = Array.isArray(recentHistoryOrContext) ? recentHistoryOrContext : [];
    const universe = visualIdentity.decision || visualIdentity;
    const universeId = universe.universeId || universe.id || 'technical-lab';
    const ia = iaStrategy.decision || iaStrategy;
    const iaId = ia.modelId || 'split-screen-dossier';

    const motionLanguage = MotionEngine.selectLanguage(universeId, iaId, recentHistory);
    const motionCode = WebGLMotion.getMotionCode(universe, ia, motionLanguage);

    return {
      agent: 'motion-interaction-agent',
      decision: {
        languageId: motionLanguage.id,
        languageName: motionLanguage.name,
        intensity: motionLanguage.id,
        technology: 'GSAP 3.12+ ScrollTrigger',
        webglActive: motionLanguage.webglAllowed,
        scrollBehavior: 'smooth-reveal',
        motionCode,
        duration: motionLanguage.duration,
        ease: motionLanguage.ease,
        timing: {
          duration: motionLanguage.duration,
          stagger: motionLanguage.stagger,
          ease: motionLanguage.ease
        }
      },
      reasoning_summary: `Applied '${motionLanguage.name}' with duration ${motionLanguage.duration}s and ease '${motionLanguage.ease}'.`,
      confidence: 0.97,
      recommendations: {
        languageId: motionLanguage.id,
        webglActive: motionLanguage.webglAllowed
      },
      constraints: [
        'ENFORCE_PREFERS_REDUCED_MOTION',
        `EASING: ${motionLanguage.ease}`
      ],
      evidence: [
        `Selected motion language '${motionLanguage.id}' from 10 physics profiles`,
        `Reduced-motion media query embedded in JavaScript and CSS`
      ]
    };
  }
}

module.exports = { MotionInteractionAgent };

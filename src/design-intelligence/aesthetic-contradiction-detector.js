/**
 * Aesthetic Contradiction Detector
 * 
 * Inspects candidate portfolios for visual incoherence, aesthetic soup,
 * and contradictory design choices.
 * Triggers AESTHETIC_CONTRADICTION when incompatible elements are combined.
 */

class AestheticContradictionDetector {
  /**
   * Evaluate a Design DNA and its Design Constitution for contradictory choices
   */
  static detectContradictions(dna, constitution) {
    const contradictions = [];
    const familyId = constitution?.familyId || dna?.designFamily || 'EDITORIAL';
    const fontHeading = String(dna?.typographySystem?.heading_font || '').toLowerCase();
    const fontBody = String(dna?.typographySystem?.body_font || '').toLowerCase();
    const threeDType = String(dna?.threeScene3D?.type || '').toLowerCase();
    const motion = String(dna?.motionLanguage || '').toLowerCase();
    const layout = String(dna?.layoutArchitecture || '').toLowerCase();
    const presentation = String(dna?.projectPresentation || '').toLowerCase();
    const primaryColor = String(dna?.colorSystem?.primary || '').toLowerCase();
    const bgColor = String(dna?.colorSystem?.background || '').toLowerCase();

    // 1. Luxury Contradictions: No aggressive electric neon or bouncy chaotic physics
    if (familyId === 'LUXURY') {
      if (primaryColor.includes('#22c55e') || primaryColor.includes('#06b6d4') || primaryColor.includes('#f43f5e')) {
        contradictions.push('Luxury Art Direction combined with aggressive high-saturation neon color');
      }
      if (motion === 'playful-elastic' || motion === 'experimental-glitch') {
        contradictions.push('Luxury Art Direction combined with chaotic/bouncy motion physics');
      }
      if (presentation === 'experimental-chaos' || presentation === 'terminal-cli-stream') {
        contradictions.push('Luxury Art Direction combined with terminal/glitch presentation');
      }
    }

    // 2. Minimal Contradictions: No heavy decorative 3D or chaotic layouts
    if (familyId === 'MINIMAL') {
      if (dna?.threeScene3D?.has3D && threeDType !== 'none-pure-2d' && threeDType !== 'noise-field-flow' && threeDType !== 'particles-dust') {
        contradictions.push('Monastic Minimal Art Direction combined with heavy volumetric 3D scene');
      }
      if (presentation === 'experimental-chaos' || presentation === 'video-reel') {
        contradictions.push('Minimal Art Direction combined with chaotic media presentation');
      }
      if (fontHeading.includes('fira code') || fontHeading.includes('space mono')) {
        contradictions.push('Minimal Art Direction combined with loud developer monospace display');
      }
    }

    // 3. Brutalist Contradictions: No soft luxury serifs or delicate ethereal glassmorphism
    if (familyId === 'BRUTALIST') {
      if (fontHeading.includes('cormorant') || fontHeading.includes('cinzel') || fontHeading.includes('bodoni')) {
        contradictions.push('Brutalist Art Direction combined with delicate luxury serif display');
      }
      if (presentation === 'minimalist-art-direction' || presentation === 'fullscreen-case-study') {
        contradictions.push('Brutalist Art Direction combined with quiet monastic presentation');
      }
      if (motion === 'minimal-quiet') {
        contradictions.push('Brutalist Art Direction combined with silent quiet motion');
      }
    }

    // 4. Technical / Cyberdeck Contradictions: No classical roman serifs or luxury gold
    if (familyId === 'TECHNICAL') {
      if (fontHeading.includes('cormorant') || fontHeading.includes('fraunces') || fontHeading.includes('cinzel')) {
        contradictions.push('Technical Cyberdeck Art Direction combined with classical haute serif display');
      }
      if (layout === 'neo-brutalist-split') {
        contradictions.push('Technical CLI Art Direction combined with neo-brutalist pop layout');
      }
    }

    // 5. Editorial Contradictions: No terminal CRT or raw hacker fonts
    if (familyId === 'EDITORIAL') {
      if (fontHeading.includes('space mono') || fontHeading.includes('fira code')) {
        contradictions.push('High-Fashion Editorial Art Direction combined with raw monospace code display');
      }
      if (threeDType === 'interactive-torus-refraction' || threeDType === 'point-cloud-lidar') {
        contradictions.push('Editorial Art Direction combined with raw sci-fi point cloud');
      }
    }

    // 6. Architectural Contradictions: No playful comic or toy physics
    if (familyId === 'ARCHITECTURAL') {
      if (motion === 'playful-elastic') {
        contradictions.push('Swiss Architectural Art Direction combined with toy-like elastic bounce');
      }
    }

    // 7. Typography Mismatch Contradiction
    if ((fontHeading.includes('cormorant') || fontHeading.includes('cinzel')) && (fontBody.includes('fira code') || fontBody.includes('space mono'))) {
      contradictions.push('Incoherent Typography: Classical Roman Display paired with Raw Monospace Body');
    }

    const hasContradictions = contradictions.length > 0;
    const penalty = contradictions.length * 25;

    return {
      passed: !hasContradictions,
      contradictions,
      penalty,
      cohesionPenalty: Math.min(60, penalty)
    };
  }
}

module.exports = { AestheticContradictionDetector };

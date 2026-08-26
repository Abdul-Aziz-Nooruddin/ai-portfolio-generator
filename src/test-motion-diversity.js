/**
 * Test Suite: Motion Diversity & Physics Profiles
 * Verifies that motion profiles vary duration, easing, and stagger per Visual Universe,
 * enforce GSAP ScrollTriggers, maintain strict reduced-motion fallbacks, and respect WebGL budgets.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { WebGLMotion } = require('./design-engine/webgl-motion');
const { VISUAL_UNIVERSES } = require('./design-engine/visual-grammar');
const { IAComposer } = require('./design-engine/ia-composer');
const { HtmlRenderer } = require('./design-engine/html-renderer');
const { LayoutGrammar } = require('./design-engine/layout-grammar');

describe('🏛️ Phase 14: Motion Diversity & Physics Profiles', () => {
  const ia = IAComposer.getModel('work-first-runway');

  test('1. Motion Profiles Vary Easing and Durations across Universes', () => {
    const obsidian = VISUAL_UNIVERSES['cinematic-obsidian'];
    const brutalist = VISUAL_UNIVERSES['brutalist-pop'];
    const swiss = VISUAL_UNIVERSES['swiss-editorial'];

    const motionObsidian = WebGLMotion.getMotionCode(obsidian, ia);
    const motionBrutalist = WebGLMotion.getMotionCode(brutalist, ia);
    const motionSwiss = WebGLMotion.getMotionCode(swiss, ia);

    assert.strictEqual(motionObsidian.profileName, 'cinematic-drift');
    assert.strictEqual(motionBrutalist.profileName, 'brutalist-snap');
    assert.strictEqual(motionSwiss.profileName, 'editorial-reveal');

    // Obsidian has slow cinematic ease (power2.inOut), Brutalist has snappy (power4.out)
    assert.ok(motionObsidian.js.includes('power2.inOut'), 'Obsidian must feature cinematic power2.inOut');
    assert.ok(motionBrutalist.js.includes('power4.out'), 'Brutalist must feature snappy power4.out');
    assert.ok(motionSwiss.js.includes('expo.out'), 'Swiss must feature typographic expo.out');
  });

  test('2. GSAP Integration Included in All Outputs', () => {
    for (const [key, universe] of Object.entries(VISUAL_UNIVERSES)) {
      const motion = WebGLMotion.getMotionCode(universe, ia);
      assert.ok(motion.libraries.includes('gsap.min.js'), `Universe '${key}' must load GSAP`);
      assert.ok(motion.js.includes('gsap.from'), `Universe '${key}' must configure GSAP entrance timeline`);
    }
  });

  test('3. Strict Prefers-Reduced-Motion Media Queries in CSS & JS', () => {
    const obsidian = VISUAL_UNIVERSES['cinematic-obsidian'];
    const motion = WebGLMotion.getMotionCode(obsidian, ia);

    assert.ok(motion.js.includes('(prefers-reduced-motion: reduce)'), 'JS must check prefers-reduced-motion');

    const sampleProfile = {
      name: 'Dr. Lin',
      role: 'Engineer',
      projects: [{ name: 'A', desc: 'B' }],
      skills: ['Rust'],
      experience: [],
      education: [],
      certifications: []
    };

    const rendered = HtmlRenderer.render(sampleProfile, ia, LayoutGrammar.getGrammar(ia.layoutId), obsidian, 'code-architecture-dossier', motion);
    assert.ok(rendered.css.includes('@media (prefers-reduced-motion: reduce)'), 'Rendered CSS must contain reduced motion query');
    assert.ok(rendered.css.includes('animation-duration: 0.01ms !important'), 'Must zero animation durations on reduced motion');
  });

  test('4. WebGL Budget Allocation Respected (Max 1 Scene)', () => {
    const obsidian = VISUAL_UNIVERSES['cinematic-obsidian'];
    const motion = WebGLMotion.getMotionCode(obsidian, ia);

    const occurrences = (motion.canvasHtml.match(/id="webgl-canvas-container"/g) || []).length;
    assert.ok(occurrences <= 1, 'Cannot allocate more than 1 WebGL canvas container');
  });
});

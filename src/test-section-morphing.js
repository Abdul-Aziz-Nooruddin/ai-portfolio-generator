/**
 * Test Suite: Section Morphing Engine
 * Verifies that Education and Certification sections dynamically morph their DOM structure
 * to match the active Information Architecture model rather than rendering generic bottom boxes.
 */

const assert = require('assert');
const { test, describe } = require('node:test');

const { HtmlRenderer } = require('./design-engine/html-renderer');
const { IAComposer } = require('./design-engine/ia-composer');
const { LayoutGrammar } = require('./design-engine/layout-grammar');
const { VisualGrammar } = require('./design-engine/visual-grammar');
const { WebGLMotion } = require('./design-engine/webgl-motion');

const { ContentAnalyzer } = require('./design-engine/content-analyzer');

describe('🏛️ Phase 14: Dynamic Section Morphing Verification', () => {
  const profileWithCredentials = {
    name: 'Dr. Marcus Vance',
    role: 'Principal Systems Architect',
    tagline: 'Kernel architectures',
    bio: 'Distributed consensus systems',
    skills: ['Rust', 'C++', 'Go'],
    projects: [{ name: 'Vortex DB', desc: 'Raft kernel' }],
    experience: [{ role: 'Architect', company: 'HyperScale', period: '2020 - Present', desc: 'Led storage' }],
    education: [{ degree: 'Ph.D. in Computer Science', school: 'Carnegie Mellon University', period: '2012 - 2016' }],
    certifications: [{ name: 'Certified Kubernetes Architect', issuer: 'CNCF', year: '2023' }]
  };

  const profile = ContentAnalyzer.analyze(profileWithCredentials);
  const visual = VisualGrammar.selectUniverse(profile);

  test('1. Section Morphing in Computational Terminal IA Model', () => {
    const ia = IAComposer.getModel('computational-terminal');
    const layout = LayoutGrammar.getGrammar(ia.layoutId);
    const motion = WebGLMotion.getMotionCode(visual, ia);

    const rendered = HtmlRenderer.render(profileWithCredentials, ia, layout, visual, 'terminal-session-log', motion);
    const html = rendered.html;

    assert.ok(html.includes('morphed-terminal-education'), 'Must contain morphed terminal education element');
    assert.ok(html.includes('$ query --schema=academic_history'), 'Terminal education must feature CLI query prompt');
    assert.ok(html.includes('[ACADEMIC_CREDENTIAL] Ph.D. in Computer Science'), 'Must format credential as CLI stream');

    assert.ok(html.includes('morphed-terminal-certifications'), 'Must contain morphed terminal certifications element');
    assert.ok(html.includes('$ verify --credentials=all'), 'Terminal certifications must feature CLI verify prompt');
    assert.ok(html.includes('[VERIFIED_KEY] Certified Kubernetes Architect'), 'Must format certification as key record');
  });

  test('2. Section Morphing in Split-Screen Dossier IA Model', () => {
    const ia = IAComposer.getModel('split-screen-dossier');
    const layout = LayoutGrammar.getGrammar(ia.layoutId);
    const motion = WebGLMotion.getMotionCode(visual, ia);

    const rendered = HtmlRenderer.render(profileWithCredentials, ia, layout, visual, 'code-architecture-dossier', motion);
    const html = rendered.html;

    assert.ok(html.includes('morphed-dossier-education'), 'Must contain morphed dossier education element');
    assert.ok(html.includes('ACADEMIC BACKGROUND'), 'Must format as dossier sidebar section');
    assert.ok(html.includes('morphed-dossier-certifications'), 'Must contain morphed dossier certifications element');
    assert.ok(html.includes('VERIFIED CERTIFICATIONS'), 'Must format as dossier sidebar section');
  });

  test('3. Section Morphing in Narrative Timeline IA Model', () => {
    const ia = IAComposer.getModel('narrative-timeline');
    const layout = LayoutGrammar.getGrammar(ia.layoutId);
    const motion = WebGLMotion.getMotionCode(visual, ia);

    const rendered = HtmlRenderer.render(profileWithCredentials, ia, layout, visual, 'timeline-milestone-card', motion);
    const html = rendered.html;

    assert.ok(html.includes('morphed-timeline-education'), 'Must contain morphed timeline education element');
    assert.ok(html.includes('Academic Foundations'), 'Must feature timeline academic heading');
    assert.ok(html.includes('morphed-timeline-certifications'), 'Must contain morphed timeline certifications element');
    assert.ok(html.includes('Accredited Milestones'), 'Must feature timeline accreditation heading');
  });

  test('4. Zero Generic Card Fallback in Secondary Sections', () => {
    const ia = IAComposer.getModel('split-screen-dossier');
    const layout = LayoutGrammar.getGrammar(ia.layoutId);
    const motion = WebGLMotion.getMotionCode(visual, ia);

    const rendered = HtmlRenderer.render(profileWithCredentials, ia, layout, visual, 'code-architecture-dossier', motion);
    const html = rendered.html;

    assert.ok(!html.includes('class="project-card"'), 'Must never contain generic card classes');
  });
});

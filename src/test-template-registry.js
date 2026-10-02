/**
 * Test Suite: Template Registry & Jack 3D Creator Candidate Data Replacement
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { TemplateRegistry, Jack3DCreatorTemplate } = require('./templates/template-registry');

describe('🏛️ Template Registry & Jack 3D Creator Dynamic Content Replacement', () => {
  const sampleCandidate = {
    name: 'Abdul Aziz Nooruddin',
    role: 'AI Developer & Full Stack Engineer',
    bio: 'Building intelligent AI platforms and decentralized systems.',
    email: 'abdulaziznoor9876@gmail.com',
    phone: '+91 99128 36034',
    location: 'Hyderabad, India',
    skills: ['Python', 'React', 'Next.js', 'FastAPI', 'Three.js', 'Solidity'],
    projects: [
      { name: 'ConsentChain', desc: 'Blockchain consent platform on Polygon.', tech: 'Solidity • Next.js', category: 'Tools' },
      { name: 'WordRun', desc: 'Multiplayer vocabulary game.', tech: 'Next.js • Firebase', category: 'Web Apps' }
    ],
    experience: [
      { role: 'AI Developer', company: 'Tech Innovation', period: '2024 - Present', desc: 'Built high-scale web tools.' }
    ],
    education: [
      { degree: 'B.Tech in Computer Science', institution: 'Lords Institute of Engineering and Technology', grade: 'CGPA: 9.23' }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' }
    ]
  };

  test('1. TemplateRegistry discovers and lists Jack 3D Creator, Nadia Brand, and Kage Temple templates', () => {
    const templates = TemplateRegistry.getAllTemplates();
    assert.ok(templates.length >= 3, 'Must contain at least 3 visual templates');

    const jack = templates.find(t => t.id === 'jack-3d-creator');
    assert.ok(jack, 'Template jack-3d-creator must be registered');
    assert.strictEqual(jack.id, 'jack-3d-creator');

    const nadia = templates.find(t => t.id === 'nadia-brand');
    assert.ok(nadia, 'Template nadia-brand must be registered');
    assert.strictEqual(nadia.id, 'nadia-brand');

    const kage = templates.find(t => t.id === 'kage-temple');
    assert.ok(kage, 'Template kage-temple must be registered');
    assert.strictEqual(kage.id, 'kage-temple');
  });

  test('2. TemplateRegistry.selectTemplate returns Jack 3D Creator for technical roles and Nadia for speaker/advisor roles', () => {
    const tpl = TemplateRegistry.selectTemplate();
    assert.strictEqual(tpl.id, 'jack-3d-creator');

    const tplTech = TemplateRegistry.selectTemplate(null, { role: 'Software Engineer' });
    assert.strictEqual(tplTech.id, 'jack-3d-creator');

    const tplSpeaker = TemplateRegistry.selectTemplate(null, { role: 'Keynote Speaker & Advisor' });
    assert.strictEqual(tplSpeaker.id, 'nadia-brand');
  });

  test('3. Jack 3D Creator dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('jack-3d-creator', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('WordRun'), 'Must contain second project name');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
  });

  test('4. Nadia Brand dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('nadia-brand', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain talk or project name');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
  });

  test('5. Jack 3D Creator & Nadia Brand render 404 pages gracefully', () => {
    const page404 = TemplateRegistry.render404Page('my-site', sampleCandidate, 'jack-3d-creator');
    assert.ok(page404.includes('404'), 'Must contain 404');
    assert.ok(page404.includes('Return to Base'), 'Must contain Return to Base CTA');
    assert.ok(page404.includes('/p/my-site'), 'Must contain return link to site');
  });
});

/**
 * Test Suite: Multi-Template Catalog & Candidate Data Replacement
 * Verifies all 5 portfolio templates:
 * 1. cosmic-astronaut (Image 4)
 * 2. cyber-crystal (Image 1)
 * 3. bioluminescent-wireframe (Image 2)
 * 4. botanical-woodcraft (Image 3)
 * 5. bio-digital-fusion (Image 5)
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const { TemplateRegistry } = require('./templates/template-registry');

describe('🏛️ Multi-Template Catalog & Dynamic Content Replacement', () => {
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

  test('1. TemplateRegistry discovers and lists all visual portfolio templates', () => {
    const templates = TemplateRegistry.getAllTemplates();
    assert.ok(templates.length >= 6, 'Must contain at least 6 visual templates');

    const expectedIds = ['eco-tech-steampunk', 'cosmic-astronaut', 'cyber-crystal', 'bioluminescent-wireframe', 'botanical-woodcraft', 'bio-digital-fusion'];
    expectedIds.forEach(id => {
      const found = templates.find(t => t.id === id);
      assert.ok(found, `Template ${id} must be registered`);
      assert.ok(found.name, `Template ${id} must have a title`);
      assert.ok(found.palette, `Template ${id} must have a palette`);
    });
  });

  test('2. Template: Eco-Tech Steampunk dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('eco-tech-steampunk', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('ecotech-canvas-bg'), 'Must include 3D WebGL canvas container');
    assert.ok(res.html.includes('Lords Institute of Engineering and Technology'), 'Must contain education');
  });

  test('3. Template 01: Cosmic Astronaut Studio dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('cosmic-astronaut', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('AI Developer &amp; Full Stack Engineer') || res.html.includes('AI Developer & Full Stack Engineer'), 'Must contain candidate role');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('Lords Institute of Engineering and Technology'), 'Must contain education');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
  });

  test('4. Template 02: Cyber Crystal Studio dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('cyber-crystal', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
  });

  test('5. Template 03: Bioluminescent Eco-Tech dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('bioluminescent-wireframe', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
  });

  test('6. Template 04: Botanical Woodcraft Codex dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('botanical-woodcraft', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
  });

  test('7. Template 05: Bio-Digital Circuit Fusion dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('bio-digital-fusion', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
  });

  test('8. Template 14: Engineering Archive (Swiss Blueprint) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('engineering-archive', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('PROJECT DOSSIER // 01'), 'Must contain numbered project dossier');
    assert.ok(res.html.includes('CAPABILITY MAP'), 'Must contain capability map');
    assert.ok(res.html.includes('specimen-3d-canvas'), 'Must include 3D wireframe canvas');
  });

  test('9. Template 15: Cosmic Cyber Geometry dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('cosmic-cyber-geometry', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('hero-spatial-canvas'), 'Must contain 3D spatial canvas');
    assert.ok(res.html.includes('RADAR // MULTI-DISCIPLINARY PROFICIENCY'), 'Must contain radar chart');
  });

  test('10. Template 16: Stellar Architect (Cosmic Blueprint) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('stellar-architect', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('home-star-canvas'), 'Must contain 3D star system canvas');
    assert.ok(res.html.includes('STAR-MAP // CONSTELLATION PROFICIENCY'), 'Must contain star-map chart');
    assert.ok(res.html.includes('AUTHENTICATED STELLAR BLUEPRINT DOSSIER'), 'Must contain resume dossier');
  });

  test('11. Template 17: Abyssal Ascent (Dark Fantasy RPG) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('abyssal-ascent', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('home-monolith-canvas'), 'Must contain 3D monolith canvas');
    assert.ok(res.html.includes('CORE COMBAT (LANGUAGES)'), 'Must contain skill tree branch');
    assert.ok(res.html.includes('LVL: EXPERIENCE'), 'Must contain RPG stat block');
  });

  test('12. Template 18: Stealth Node (Web3 Cypherpunk) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('stealth-node', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('home-node-canvas'), 'Must contain 3D node canvas');
    assert.ok(res.html.includes('INITIALIZING_NODE'), 'Must contain boot sequence');
    assert.ok(res.html.includes('BLOCK_HEIGHT'), 'Must contain ledger stat block');
  });

  test('13. Template 19: Kinetic Brutalism (High-Contrast Zine) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('kinetic-brutalism', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('home-poly-canvas'), 'Must contain 3D wireframe poly canvas');
    assert.ok(res.html.includes('ROLE //'), 'Must contain role block');
    assert.ok(res.html.includes('TOTAL EXPERIENCE'), 'Must contain receipt stat block');
  });

  test('14. Template 20: Circuit Core (Industrial Cyber-Minimal) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('circuit-core', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('home-gear-canvas'), 'Must contain 3D gear canvas');
    assert.ok(res.html.includes('YEARS_EXPERIENCE'), 'Must contain stat column');
    assert.ok(res.html.includes('CIRCUIT SPECS:'), 'Must contain spec tag');
  });

  test('15. Template 21: Neon Aurora Cyber (Cyber-Minimalist Aurora) dynamically binds candidate data', () => {
    const res = TemplateRegistry.render('neon-aurora-cyber', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('aurora-webgl-canvas'), 'Must contain 3D aurora canvas');
    assert.ok(res.html.includes('Syne'), 'Must contain upgraded Syne font');
    assert.ok(res.html.includes('Plus Jakarta Sans'), 'Must contain Plus Jakarta Sans font');
    assert.ok(res.html.includes('heatmap'), 'Must contain activity heatmap');
  });

  test('16. Intelligent Template Selection matches by role or non-repeating cycle', () => {
    const steampunkMatch = TemplateRegistry.selectTemplate(null, { role: 'Steampunk Systems Engineer' });
    assert.strictEqual(steampunkMatch.id, 'eco-tech-steampunk', 'Must match steampunk role to eco-tech-steampunk template');

    const craftMatch = TemplateRegistry.selectTemplate(null, { role: 'UI/UX Botanical Designer' });
    assert.strictEqual(craftMatch.id, 'botanical-woodcraft', 'Must match botanical design role to woodcraft template');

    const aiMatch = TemplateRegistry.selectTemplate(null, { role: 'AI Cloud Architect' });
    assert.strictEqual(aiMatch.id, 'cosmic-astronaut', 'Must match AI role to cosmic astronaut template');
  });

  test('17. Real custom user data is strictly bound with zero dummy fallback leakage', () => {
    const customUser = {
      name: 'Dr. Marcus Vance',
      role: 'Quantum Computing & Distributed Systems Scientist',
      bio: 'Pioneering fault-tolerant quantum algorithms and distributed consensus engines.',
      email: 'marcus.vance@quantumlab.io',
      phone: '+1 (415) 889-2041',
      location: 'San Francisco, CA',
      skills: ['Q#', 'Rust', 'Python', 'CUDA', 'Distributed Consensus', 'gRPC'],
      projects: [
        { name: 'QuantumVortex', desc: 'Simulated 128-qubit quantum state annealing in Rust.', tech: 'Rust • CUDA • Q#', category: 'Tools' },
        { name: 'SynapseMesh', desc: 'Zero-knowledge fault-tolerant state machine.', tech: 'Rust • gRPC', category: 'Web Apps' }
      ]
    };

    const templates = ['cosmic-astronaut', 'cyber-crystal', 'bioluminescent-wireframe', 'botanical-woodcraft', 'bio-digital-fusion', 'system-awakening', 'engineering-archive', 'cosmic-cyber-geometry', 'stellar-architect', 'abyssal-ascent', 'stealth-node', 'kinetic-brutalism', 'circuit-core', 'neon-aurora-cyber'];
    templates.forEach(templateId => {
      const result = TemplateRegistry.render(templateId, customUser);
      assert.ok(result.html.includes('Dr. Marcus Vance'), `${templateId} must include custom candidate name`);
      assert.ok(result.html.includes('QuantumVortex'), `${templateId} must include custom project`);
      assert.ok(!result.html.includes('Sarah Jenkins'), `${templateId} must NOT leak Sarah Jenkins`);
      assert.ok(!result.html.includes('Lords Institute'), `${templateId} must NOT leak Lords Institute`);
      assert.ok(!result.html.includes('ConsentChain'), `${templateId} must NOT leak ConsentChain`);
    });
  });

  test('18. Template: Swiss Editorial Monograph dynamically binds candidate data & 3D canvas', () => {
    const res = TemplateRegistry.render('swiss-editorial-monograph', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('swiss-monograph-canvas'), 'Must include 3D origami prism canvas');
    assert.ok(res.html.includes('Lords Institute of Engineering and Technology'), 'Must contain education');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
  });

  test('19. Template: Solarpunk Horizon dynamically binds candidate data & 3D canvas', () => {
    const res = TemplateRegistry.render('solarpunk-horizon', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('solarpunk-canvas'), 'Must include 3D solar ray canvas');
    assert.ok(res.html.includes('Lords Institute of Engineering and Technology'), 'Must contain education');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
  });

  test('20. Template: Cyber-Architect Sprawl dynamically binds sections, 3D canvas, and dedicated 404 page', () => {
    const res = TemplateRegistry.render('cyber-architect-sprawl', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('cyber-sprawl-canvas'), 'Must include 3D holographic canvas');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
    assert.ok(!res.html.includes('id="error404"'), 'Homepage must not include inline 404 section');

    // Verify Dedicated 404 Page
    const page404 = TemplateRegistry.render404Page('cyber-architect-sprawl', sampleCandidate);
    assert.ok(page404.includes('quantum-404-modal'), '404 page must include 404 quantum anomaly modal');
    assert.ok(page404.includes('cyber_gnome_nobg.png'), '404 page must include 3D Cyber Gnome');
    assert.ok(page404.includes('Quantum Path Diverged'), '404 page must include Quantum Path Diverged title');
  });

  test('21. Template: Abyssal Nautilus Artisan dynamically binds 3D treasure chests, cartography, and dedicated 404', () => {
    const res = TemplateRegistry.render('abyssal-nautilus-artisan', sampleCandidate);
    assert.ok(res.html.includes('Abdul Aziz Nooruddin'), 'Must contain candidate name');
    assert.ok(res.html.includes('ConsentChain'), 'Must contain project name');
    assert.ok(res.html.includes('abyss-bg-canvas'), 'Must include 3D ocean caustics canvas');
    assert.ok(res.html.includes('treasure-chest-card'), 'Must include 3D treasure chest project cards');
    assert.ok(res.html.includes('chest_wheel_lid_nobg.png'), 'Must include 3D ship wheel chest lid');
    assert.ok(res.html.includes('porthole_nobg.png'), 'Must include 3D porthole sonar radar');
    assert.ok(res.html.includes('coral_tree_nobg.png'), 'Must include 3D coral tree');
    assert.ok(res.html.includes('vintage_map_clean_nobg.png'), 'Must include clean vintage map');
    assert.ok(res.html.includes('seahorse_nobg.png'), 'Must include 3D pearlescent seahorse');
    assert.ok(res.html.includes('abdulaziznoor9876@gmail.com'), 'Must contain email');
    assert.ok(!res.html.includes('NAUTICAL COURSE LOST'), 'Homepage must not include inline 404 section');

    // Dedicated 404 Verification
    const page404 = TemplateRegistry.render404Page('abyssal-nautilus-artisan', sampleCandidate);
    assert.ok(page404.includes('nautical_compass_nobg.png'), '404 must include 3D antique compass');
    assert.ok(page404.includes('stone_404_nobg.png'), '404 must include overgrown 404 stone');
    assert.ok(page404.includes('Return to Base'), '404 must include return button');
  });
});

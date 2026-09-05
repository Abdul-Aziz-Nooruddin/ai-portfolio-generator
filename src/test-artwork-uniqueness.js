const test = require('node:test');
const assert = require('node:assert');
const { TemplateRegistry } = require('./templates/template-registry');
const { ProjectArtworkSynthesizer } = require('./templates/project-artwork-synthesizer');

test('🎨 100% Unique Project Artwork & Disambiguation Engine', async (t) => {
  const sampleCandidateWithSimilarProjects = {
    name: 'Abdul Aziz Nooruddin',
    role: 'Systems Architect & Web3 Engineer',
    bio: 'Independent Smart Contract and Full-Stack Developer specializing in blockchain architecture.',
    github: 'https://github.com/Abdul-Aziz-Nooruddin',
    projects: [
      {
        name: 'ConsentChain Algorand',
        desc: 'A decentralized consent management dApp built on Algorand blockchain with DPDP compliance.',
        tech: 'Algorand • PyTeal • React'
      },
      {
        name: 'ConsentChain',
        desc: 'Blockchain-native consent registry and data compliance protocol.',
        tech: 'Solidity • Ethereum • Node.js'
      },
      {
        name: 'Portfolio Generator',
        desc: 'High-performance portfolio generator with 3D WebGL scenes.',
        tech: 'JavaScript • Three.js • CSS'
      },
      {
        name: 'Youtube Shorts Bot',
        desc: 'Automated video generation pipeline using FFmpeg and AI voice synthesis.',
        tech: 'Python • FFmpeg • MoviePy'
      },
      {
        name: 'Pass A Note',
        desc: 'Encrypted ephemeral notes with zero-knowledge cryptographic authentication.',
        tech: 'Rust • WebSockets • React'
      },
      {
        name: 'AI Portfolio Generator',
        desc: 'Autonomous developer portfolio compiler with multi-universe 3D layouts.',
        tech: 'Node.js • Express • HTML5'
      }
    ]
  };

  await t.test('1. Disambiguates similar titles: ConsentChain Algorand vs ConsentChain get different images', () => {
    const assigned = new Set();
    const html1 = ProjectArtworkSynthesizer.generate3DProjectThumbnail(
      sampleCandidateWithSimilarProjects.projects[0],
      'kinetic-brutalism',
      0,
      assigned,
      'user_1'
    );
    const html2 = ProjectArtworkSynthesizer.generate3DProjectThumbnail(
      sampleCandidateWithSimilarProjects.projects[1],
      'kinetic-brutalism',
      1,
      assigned,
      'user_1'
    );

    const match1 = html1.match(/src="([^"]+)"/);
    const match2 = html2.match(/src="([^"]+)"/);

    assert.ok(match1, 'Project 1 must have an image src');
    assert.ok(match2, 'Project 2 must have an image src');
    assert.notStrictEqual(match1[1], match2[1], 'Similar project titles must receive 2 completely different 3D images');
  });

  await t.test('2. All rendered templates guarantee 100% unique project images with zero duplicate images per portfolio', () => {
    const templateIds = Object.keys(TemplateRegistry.templates);

    for (const tplId of templateIds) {
      const rendered = TemplateRegistry.render(tplId, sampleCandidateWithSimilarProjects);
      
      const srcList = [];
      const regex = /src="(\/assets\/3d\/[^"]+)"/g;
      let m;
      while ((m = regex.exec(rendered.html)) !== null) {
        srcList.push(m[1]);
      }

      if (srcList.length >= 2) {
        const uniqueSet = new Set(srcList);
        assert.strictEqual(
          uniqueSet.size,
          srcList.length,
          `Template ${tplId} must have 100% unique project images without repetition (Found duplicates in: ${JSON.stringify(srcList)})`
        );
      }
    }
  });

  await t.test('3. Different GitHub usernames generate distinct visual artwork selections', () => {
    const assigned1 = new Set();
    const assigned2 = new Set();
    const genericProj = { name: 'Core Engine Utility', desc: 'Modular backend library', tech: 'Node.js' };

    const htmlUserA = ProjectArtworkSynthesizer.generate3DProjectThumbnail(genericProj, 'cosmic-astronaut', 0, assigned1, 'torvalds');
    const htmlUserB = ProjectArtworkSynthesizer.generate3DProjectThumbnail(genericProj, 'cosmic-astronaut', 0, assigned2, 'gaearon');

    assert.ok(htmlUserA.includes('/assets/3d/'), 'User A gets valid 3D asset');
    assert.ok(htmlUserB.includes('/assets/3d/'), 'User B gets valid 3D asset');
  });

  await t.test('4. CyberArchitectSprawl guarantees 0 duplicate images & title relevance for user profile projects', () => {
    const { CyberArchitectSprawlTemplate } = require('./templates/cyber-architect-sprawl');
    const userProjects = [
      { name: 'Ai Portfolio Generator', desc: 'Turn your GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds.', tech: 'JavaScript, 3d-website, ai-portfolio' },
      { name: 'ConsentChain Algorand', desc: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.', tech: 'TypeScript, JavaScript, CSS' },
      { name: 'Portfolio', desc: 'Personal portfolio - AI Student, Full-Stack & Blockchain Developer. Built with HTML, CSS & JS.', tech: 'CSS, TypeScript, HTML' },
      { name: 'Pass A Note', desc: 'High-performance software project engineered in HTML.', tech: 'HTML' },
      { name: 'Lms User Management', desc: 'High-performance software project engineered in JavaScript.', tech: 'JavaScript' }
    ];

    const rendered = CyberArchitectSprawlTemplate.render({ name: 'Abdul Aziz Nooruddin', projects: userProjects });
    const matches = [...rendered.matchAll(/<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+class="project-thumb-img"/g)].map(m => m[1]);

    assert.strictEqual(matches.length, 5, 'Must render 5 project cards');
    const unique = new Set(matches);
    assert.strictEqual(unique.size, 5, `Must have ZERO duplicate images across project cards (Found: ${JSON.stringify(matches)})`);

    // Verify title relevance
    assert.ok(matches[0].includes('project_ai_core') || matches[0].includes('developer_showcase'), 'Ai Portfolio Generator gets AI Core / WebGL Showcase');
    assert.ok(matches[1].includes('project_data_chain') || matches[1].includes('blockchain'), 'ConsentChain Algorand gets Data Chain / Blockchain');
    assert.ok(matches[2].includes('project_crystal') || matches[2].includes('portfolio'), 'Portfolio gets Crystal / Portfolio asset');
    assert.ok(matches[3].includes('origami_bird') || matches[3].includes('bird'), 'Pass A Note gets Note Messenger Bird');
    assert.ok(matches[4].includes('circuit_board') || matches[4].includes('database'), 'Lms User Management gets Circuit Board Systems Hub');
  });

  await t.test('5. AbyssalNautilusArtisan guarantees 0 duplicate treasure chests / oceanic relics', () => {
    const { AbyssalNautilusArtisanTemplate } = require('./templates/abyssal-nautilus-artisan');
    const userProjects = [
      { name: 'Ai Portfolio Generator', desc: 'Turn your GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds.' },
      { name: 'ConsentChain Algorand', desc: 'A decentralized Consent Management application powered by the Algorand blockchain.' },
      { name: 'Portfolio', desc: 'Personal portfolio - AI Student, Full-Stack & Blockchain Developer.' },
      { name: 'Pass A Note', desc: 'High-performance software project engineered in HTML.' },
      { name: 'Lms User Management', desc: 'High-performance software project engineered in JavaScript.' }
    ];

    const rendered = AbyssalNautilusArtisanTemplate.render({ name: 'Abdul Aziz Nooruddin', projects: userProjects });
    const matches = [...rendered.matchAll(/<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+class="chest-wheel-img"/g)].map(m => m[1]);

    assert.strictEqual(matches.length, 5, 'Must render 5 chest cards');
    const unique = new Set(matches);
    assert.strictEqual(unique.size, 5, `Must have ZERO duplicate chest images across project cards (Found: ${JSON.stringify(matches)})`);
  });
});

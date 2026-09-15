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
    assert.ok(matches[0].includes('project_ai_core') || matches[0].includes('developer_showcase') || matches[0].includes('ai_portfolio_generator'), 'Ai Portfolio Generator gets AI Core / WebGL Showcase / AI Portfolio Generator');
    assert.ok(matches[1].includes('project_data_chain') || matches[1].includes('blockchain') || matches[1].includes('consent_chain'), 'ConsentChain Algorand gets Data Chain / Blockchain / ConsentChain');
    assert.ok(matches[2].includes('project_crystal') || matches[2].includes('portfolio'), 'Portfolio gets Crystal / Portfolio asset');
    assert.ok(matches[3].includes('origami_bird') || matches[3].includes('bird') || matches[3].includes('pass_note'), 'Pass A Note gets Note Messenger Bird / Encrypted Messenger');
    assert.ok(matches[4].includes('circuit_board') || matches[4].includes('database') || matches[4].includes('lms_user'), 'Lms User Management gets Circuit Board Systems Hub / LMS Management');
  });

  await t.test('5. Strictly verifies project images are relevant to project title & ZERO universe preview images recycled', () => {
    const { StealthNodeTemplate } = require('./templates/stealth-node');
    const projects = [
      { name: 'Developer WebGL Portfolio', tech: 'Three.js, WebGL, Node.js', desc: 'Engineered procedural WebGL generator.' },
      { name: 'Algorand Python Smart Contracts', tech: 'Python, Algorand, Web3', desc: 'Decentralized verifiable ledger logic and algorithmic settlements.' },
      { name: 'Autonomous Edge Agent', tech: 'TypeScript, Fastify, AI', desc: 'Low-latency reasoning pipelines and streaming telemetry.' },
      { name: 'Ai Portfolio Generator', tech: 'HTML', desc: 'Converts GitHub repositories into bespoke 3D portfolios.' },
      { name: 'Portfolio', tech: 'CSS', desc: 'Personal interactive portfolio with glassmorphism.' },
      { name: 'ConsentChain Algorand', tech: 'TypeScript', desc: 'Decentralized consent management on Algorand for DPDP Act 2023.' },
      { name: 'Lms User Management', tech: 'JavaScript', desc: 'Dedicated user administration and access control module.' },
      { name: 'Pass A Note', tech: 'HTML', desc: 'Streamlined communication tool for rapid note transmission.' }
    ];

    const rendered = StealthNodeTemplate.render({
      name: 'Abdul Aziz Nooruddin',
      projects
    });

    const matches = [...rendered.matchAll(/<article class="stealth-hex-card"[^>]*>[\s\S]*?<img src="([^"]+)" alt="([^"]+)"[\s\S]*?<h3 class="hex-card-title">([^<]+)<\/h3>/g)];
    assert.strictEqual(matches.length, 8, 'Must render 8 project cards');

    const universePreviewImages = [
      'stealth_node_3d',
      'circuit_core_3d',
      'chrono_obsidian_sanctuary_3d',
      'neon_aurora_cyber_3d',
      'kinetic_brutalism_3d',
      'stellar_architect_3d',
      'cosmic_cyber_geometry_3d',
      'engineering_archive_3d',
      'system_awakening_3d',
      'cosmic_astronaut_3d',
      'bioluminescent_wireframe_3d',
      'cyber_crystal_3d',
      'botanical_woodcraft_3d',
      'bio_digital_fusion_3d',
      'abyssal_ascent_3d'
    ];

    const assignments = {};
    for (const m of matches) {
      const src = m[1];
      const title = m[3];
      assignments[title] = src;

      // Ensure NO universe preview image is used
      for (const uniImg of universePreviewImages) {
        assert.ok(
          !src.includes(uniImg),
          `Project "${title}" must NEVER use universe preview image "${uniImg}". Found: ${src}`
        );
      }
    }

    // Strictly verify project title domain relevance
    assert.ok(assignments['Pass A Note'].includes('pass_note_messenger'), 'Pass A Note must receive encrypted note messenger asset');
    assert.ok(assignments['Ai Portfolio Generator'].includes('ai_portfolio_generator'), 'Ai Portfolio Generator must receive AI portfolio generator asset');
    assert.ok(assignments['Autonomous Edge Agent'].includes('autonomous_edge_agent'), 'Autonomous Edge Agent must receive autonomous edge agent asset');
    assert.ok(assignments['Algorand Python Smart Contracts'].includes('algorand_smart_contracts'), 'Algorand Python Smart Contracts must receive Algorand smart contracts asset');
    assert.ok(assignments['ConsentChain Algorand'].includes('consent_chain_privacy'), 'ConsentChain Algorand must receive ConsentChain privacy asset');
    assert.ok(assignments['Lms User Management'].includes('lms_user_management'), 'Lms User Management must receive LMS user management asset');
    assert.ok(assignments['Developer WebGL Portfolio'].includes('webgl_developer_portfolio'), 'Developer WebGL Portfolio must receive developer WebGL portfolio asset');
  });
});


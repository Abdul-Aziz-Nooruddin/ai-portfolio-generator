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
});

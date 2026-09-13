/**
 * Script: Generate Abdul Aziz Nooruddin's Real GitHub Portfolio in Palmo Coconut Co. Style
 * Uses the new Palmo Organic Pure Web3 template (palmo-pure-web3)
 * Exact design recreation of https://mesh3d.gallery/website/palmo-coconut-co-pure-coconut-water
 */

const fs = require('fs');
const path = require('path');
const { GitHubClient } = require('../src/services/github/github-client');
const { GitHubNormalizer } = require('../src/services/github/github-normalizer');
const { TemplateRegistry } = require('../src/templates/template-registry');

async function generate() {
  console.log('🥥 Ingesting live GitHub profile for @Abdul-Aziz-Nooruddin...');
  const client = new GitHubClient();
  const raw = await client.fetchCompleteProfile('Abdul-Aziz-Nooruddin');
  
  console.log('⚙️ Normalizing GitHub evidence data model...');
  const normalized = GitHubNormalizer.normalize(raw);

  const candidateData = {
    name: raw.profile.name || 'Abdul Aziz Nooruddin',
    role: 'Smart Contract Developer & AI Student',
    title: 'Smart Contract Developer & AI Student',
    tagline: 'AI Student & Smart Contract Developer | Building real-world Web3 products | Blockchain • DeFi • RegTech 🇮🇳',
    bio: 'Computer Science & AI student actively engineering open-source Web3 protocols, smart contracts on Algorand and Polygon, and immersive 3D developer experiences. Bridging cutting-edge research with shipped software.',
    email: raw.profile.email || 'Abdul-Aziz-Nooruddin@users.noreply.github.com',
    location: raw.profile.location || 'Hyderabad, India • Remote Web3',
    github: 'https://github.com/Abdul-Aziz-Nooruddin',
    website: 'https://myfolio.tech',
    skills: normalized.skills && normalized.skills.length > 0 ? normalized.skills : [
      'Smart Contracts', 'Algorand', 'Polygon', 'Solidity', 'JavaScript', 'TypeScript', 'Three.js', 'WebGL', 'Node.js', 'Web3.js'
    ],
    projects: [
      {
        name: 'ConsentChain Algorand',
        flavor: 'FLAVOUR 01 • REGTECH & ESCROW',
        desc: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.',
        tech: 'Algorand • TypeScript • Smart Contracts • Blockchain',
        badge: 'DPDP ACT 2023 COMPLIANT',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
        live: 'https://consent-chain-algorand.vercel.app'
      },
      {
        name: 'Ai Portfolio Generator',
        flavor: 'FLAVOUR 02 • WEBGL & AI STUDIO',
        desc: 'Turn your GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds. Interactive spatial worlds and high-impact scrollytelling.',
        tech: 'HTML • JavaScript • WebGL • Three.js • Node.js',
        badge: '100% REAL GITHUB DATA',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
        live: 'https://myfolio.tech'
      },
      {
        name: 'Portfolio',
        flavor: 'FLAVOUR 03 • MULTI-CHAIN EXPERIMENTAL',
        desc: 'Personal portfolio featuring glassmorphism design, particle animations, and showcases decentralized applications deployed across Polygon & Algorand.',
        tech: 'TypeScript • CSS • HTML • Polygon • Algorand',
        badge: 'DUAL-CHAIN VERIFIED',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/portfolio',
        live: 'https://portfolio-nine-tawny-39.vercel.app'
      },
      {
        name: 'Pass A Note',
        flavor: 'FLAVOUR 04 • PEER-TO-PEER DATA',
        desc: 'High-performance interactive communication tool engineered for seamless zero-latency peer data transfer.',
        tech: 'HTML • JavaScript • CSS',
        badge: 'ZERO INTERMEDIARIES',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/pass-a-note',
        live: 'https://pass-a-note-iota.vercel.app'
      },
      {
        name: 'Lms User Management',
        flavor: 'FLAVOUR 05 • IDENTITY & RBAC',
        desc: 'Enterprise-grade role-based access control and user management system engineered with strict security guarantees.',
        tech: 'JavaScript • Node.js • Express',
        badge: 'AUTHENTICATED ACCESS',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management',
        live: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management'
      }
    ]
  };

  console.log(`✨ Rendering template 'palmo-pure-web3' for ${candidateData.name}...`);
  const template = TemplateRegistry.getTemplate('palmo-pure-web3');
  if (!template) {
    throw new Error('Template palmo-pure-web3 not found in TemplateRegistry');
  }

  const html = template.render(candidateData);

  // Write outputs
  const webPath = path.join(__dirname, '..', 'web', 'portfolio-palmo-pure.html');
  const publicPath = path.join(__dirname, '..', 'public', 'portfolio-palmo-pure.html');

  fs.writeFileSync(webPath, html, 'utf8');
  console.log(`✅ Written to ${webPath}`);

  if (fs.existsSync(path.join(__dirname, '..', 'public'))) {
    fs.writeFileSync(publicPath, html, 'utf8');
    console.log(`✅ Written to ${publicPath}`);
  }

  const userShowcaseDir = path.join(__dirname, '..', 'web', 'showcase', 'abdul-aziz');
  fs.mkdirSync(userShowcaseDir, { recursive: true });
  fs.writeFileSync(path.join(userShowcaseDir, 'palmo.html'), html, 'utf8');
  console.log(`✅ Written to ${userShowcaseDir}/palmo.html`);

  console.log('🎉 Palmo Style Generation Complete! Live at /portfolio-palmo-pure.html and /palmo');
}

generate().catch(err => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});

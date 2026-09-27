/**
 * Script: Generate Abdul Aziz Nooruddin's PeachWeb 3D Interactive Portfolio
 * Modeled 1:1 after PeachWeb.io with authentic 3D WebGL clownfish and scroll physics
 */

const fs = require('fs');
const path = require('path');
const { TemplateRegistry } = require('../src/templates/template-registry');

async function generate() {
  console.log('🐟 Generating PeachWeb 3D Interactive Portfolio for Abdul Aziz Nooruddin...');

  const candidateData = {
    name: 'Abdul Aziz Nooruddin',
    role: 'Smart Contract Developer & Web3 Engineer',
    title: 'Smart Contract Developer & Web3 Engineer',
    tagline: 'Building real-world Web3 products | Blockchain • DeFi • RegTech 🇮🇳',
    bio: 'Computer Science & AI student actively engineering open-source Web3 protocols, smart contracts on Algorand and Polygon, and immersive 3D developer experiences. Dedicated to building decentralized infrastructure that bridges formal verification with effortless digital elegance.',
    email: 'Abdul-Aziz-Nooruddin@users.noreply.github.com',
    location: 'Hyderabad, India • Global Web3',
    github: 'https://github.com/Abdul-Aziz-Nooruddin',
    website: 'https://myfolio.tech',
    skills: [
      'Smart Contracts', 'Algorand', 'Polygon', 'Solidity', 'PyTeal', 'Python',
      'TypeScript', 'JavaScript', 'Three.js', 'WebGL', 'Node.js', 'Web3.js', 'PostgreSQL', 'Docker'
    ],
    projects: [
      {
        name: 'ConsentChain Algorand',
        category: 'REGTECH & BLOCKCHAIN ESCROW',
        desc: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.',
        tech: 'Algorand • Python • TypeScript • PyTeal • Smart Contracts',
        metrics: 'DPDP 2023 Compliant • Instant Settlement • Zero-Knowledge Verification',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
        live: 'https://consent-chain-algorand.vercel.app'
      },
      {
        name: 'Pass-A-Note',
        category: 'CRYPTOGRAPHIC DISPATCH',
        desc: 'Decentralized peer-to-peer encrypted messaging transmission platform. Implements end-to-end zero-knowledge ciphering with client-side ephemeral security.',
        tech: 'Node.js • WebSockets • Web Cryptography API • P2P Mesh',
        metrics: 'Zero Server Retention • Client-Side Encryption • Real-Time P2P',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/pass-a-note',
        live: 'https://pass-a-note.vercel.app'
      },
      {
        name: 'AI Portfolio Generator',
        category: 'SPATIAL WEBGL STUDIO',
        desc: 'Autonomous WebGL portfolio synthesis platform. Turns engineering repositories and GitHub evidence into high-impact 3D interactive portfolio worlds in minutes.',
        tech: 'Three.js • WebGL • GSAP • Lenis • Node.js',
        metrics: 'Interactive 3D Viewports • 100% Real Evidence • Scrollytelling',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
        live: 'https://myfolio.tech'
      },
      {
        name: 'LMS User Management',
        category: 'ENTERPRISE RBAC',
        desc: 'Comprehensive educational identity administration system featuring granular role-based access control, encrypted session verification, and high-concurrency database queries.',
        tech: 'Node.js • Express • PostgreSQL • JWT • REST API',
        metrics: 'Granular Role Tiers • Audit-Logged Operations • Sub-50ms Latency',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management',
        live: null
      }
    ]
  };

  const template = TemplateRegistry.getTemplate('peachweb-interactive');
  if (!template) {
    throw new Error('Template peachweb-interactive not found in TemplateRegistry');
  }

  const html = template.render(candidateData);

  // Write outputs
  const publicPath = path.join(__dirname, '..', 'public', 'peachweb-3d-portfolio.html');
  const webPath = path.join(__dirname, '..', 'web', 'peachweb-3d-portfolio.html');

  fs.writeFileSync(publicPath, html, 'utf8');
  console.log(`✅ Written to ${publicPath}`);

  fs.writeFileSync(webPath, html, 'utf8');
  console.log(`✅ Written to ${webPath}`);

  // Also create a showcase path
  const showcaseDir = path.join(__dirname, '..', 'web', 'showcase', 'abdul-aziz');
  fs.mkdirSync(showcaseDir, { recursive: true });
  fs.writeFileSync(path.join(showcaseDir, 'peachweb.html'), html, 'utf8');
  console.log(`✅ Written to ${showcaseDir}/peachweb.html`);

  console.log('🎉 Generation Succeeded! Access at /peachweb-3d-portfolio.html');
}

generate().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});

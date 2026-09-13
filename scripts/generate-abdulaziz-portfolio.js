/**
 * Script: Generate Abdul Aziz Nooruddin's Real GitHub Portfolio
 * Uses the new Mesh3D Cyber Terminal Console template (mesh3d-terminal-console)
 * Inspired by mesh3d.gallery (glucas.dev)
 */

const fs = require('fs');
const path = require('path');
const { GitHubClient } = require('../src/services/github/github-client');
const { GitHubNormalizer } = require('../src/services/github/github-normalizer');
const { TemplateRegistry } = require('../src/templates/template-registry');

async function generate() {
  console.log('🐙 Fetching live GitHub profile for @Abdul-Aziz-Nooruddin...');
  const client = new GitHubClient();
  const raw = await client.fetchCompleteProfile('Abdul-Aziz-Nooruddin');
  
  console.log('⚙️ Normalizing GitHub evidence data model...');
  const normalized = GitHubNormalizer.normalize(raw);

  // Assemble full candidate model
  const candidateData = {
    name: raw.profile.name || 'Abdul Aziz Nooruddin',
    role: 'Smart Contract Developer & Web3 Engineer',
    title: 'Smart Contract Developer & Web3 Engineer',
    tagline: raw.profile.bio || 'Building real-world Web3 products | Blockchain • DeFi • RegTech 🇮🇳',
    bio: raw.profile.bio ? `${raw.profile.bio}. Dedicated to decentralized infrastructure, automated compliance, and high-impact digital products.` : normalized.summary,
    email: raw.profile.email || 'Abdul-Aziz-Nooruddin@users.noreply.github.com',
    location: raw.profile.location || 'Hyderabad, India • Remote Web3',
    github: 'https://github.com/Abdul-Aziz-Nooruddin',
    website: 'https://myfolio.tech',
    skills: normalized.skills && normalized.skills.length > 0 ? normalized.skills : [
      'Smart Contracts', 'Algorand', 'Polygon', 'Solidity', 'JavaScript', 'TypeScript', 'Three.js', 'WebGL', 'Node.js', 'Web3.js'
    ],
    projects: normalized.projects.map(p => ({
      name: p.name,
      desc: p.description || 'Verified open-source repository.',
      tech: (p.techStack && p.techStack.length > 0) ? p.techStack.join(' • ') : p.primaryLanguage || 'JavaScript',
      github: p.repositoryUrl || `https://github.com/Abdul-Aziz-Nooruddin/${p.name.toLowerCase().replace(/\\s+/g, '-')}`,
      live: p.homepageUrl || null
    }))
  };

  console.log(`✨ Rendering template 'mesh3d-terminal-console' for ${candidateData.name}...`);
  const template = TemplateRegistry.getTemplate('mesh3d-terminal-console');
  if (!template) {
    throw new Error('Template mesh3d-terminal-console not found in TemplateRegistry');
  }

  const html = template.render(candidateData);

  // Write to web/ and public/
  const webPath = path.join(__dirname, '..', 'web', 'portfolio-mesh3d-terminal.html');
  const publicPath = path.join(__dirname, '..', 'public', 'portfolio-mesh3d-terminal.html');

  fs.writeFileSync(webPath, html, 'utf8');
  console.log(`✅ Written to ${webPath}`);

  if (fs.existsSync(path.join(__dirname, '..', 'public'))) {
    fs.writeFileSync(publicPath, html, 'utf8');
    console.log(`✅ Written to ${publicPath}`);
  }

  // Also create a standalone showcase index
  const userShowcaseDir = path.join(__dirname, '..', 'web', 'showcase', 'abdul-aziz');
  fs.mkdirSync(userShowcaseDir, { recursive: true });
  fs.writeFileSync(path.join(userShowcaseDir, 'index.html'), html, 'utf8');
  console.log(`✅ Written to ${userShowcaseDir}/index.html`);

  console.log('🎉 Generation Complete! Live at /portfolio-mesh3d-terminal.html and /abdul-aziz');
}

generate().catch(err => {
  console.error('❌ Generation failed:', err);
  process.exit(1);
});

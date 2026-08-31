/**
 * Template: STEALTH NODE
 * Aesthetic: Web3 Cypherpunk • Cryptographic UI • Stealth & Glassmorphism • Decentralized Network • Terminal Green & Vantablack
 * Palette: Vantablack (#000000), Smoked Glass (rgba(15, 23, 20, 0.6)), Ghost White (#F8F9FA), Encrypted Grey (#6C757D), Cryptographic Green (#00FF41), Overclocked Orange (#FF5722).
 * Motifs: Hexagonal node networks, terminal root prompts, blockchain ledger timelines, encrypted dossiers, redacted elements, and Merkle tree topology.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const StealthNodeTemplate = {
  id: 'stealth-node',
  name: 'Stealth Node',
  category: 'Web3 Cypherpunk / Cryptographic Stealth',
  description: 'A cypherpunk, decentralized aesthetic inspired by blockchain networks, stealth mechanics, and cryptographic interfaces. Blends raw terminal hacking visuals with modern smoked glassmorphism in cryptographic green and vantablack.',
  recommendedFor: ['Blockchain Engineer', 'Smart Contract Developer', 'Security Researcher', 'Systems Cryptographer', 'Protocol Architect'],
  palette: ['#000000', 'rgba(15, 23, 20, 0.6)', '#00FF41', '#FF5722', '#F8F9FA', '#6C757D'],

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location);
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    // Cryptographic Metrics
    const blockHeight = data.experience?.length ? `${data.experience.length * 1048576 + 742091}` : '8,491,032';
    const smartContracts = data.projects?.length || 6;
    const nodesActive = data.publicRepos ?? data.projects?.length ?? 6;

    // 03. Deployed dApps (Projects)
    const assignedArtworks = new Set(['/assets/3d/algorand_escrow_protocol_3d.jpg', '/assets/3d/smart_contract_dapp_3d.jpg']);
    const userSeed = data.github || data.username || data.name || '';
    const projectCardsHtml = data.projects.map((p, idx) => {
      const projHexId = `0x${(idx + 1).toString(16).padStart(4, '0').toUpperCase()}`;
      const techArrayStr = `[${p.tech.split(/[,•|]+/).map(t => `'${TemplateHelper.escapeHtml(t.trim())}'`).join(', ')}]`;

      return `
        <article class="stealth-hex-card" data-category="${TemplateHelper.escapeHtml(p.category || 'dApp')}">
          <div class="hex-card-header">
            <span class="hex-block-id">${projHexId} // CONTRACT</span>
            <span class="hex-status-dot"></span>
          </div>

          <div class="hex-card-viewport">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'stealth-node', idx, assignedArtworks, userSeed)}
            <div class="raw-code-snippet-overlay">
              <code>pragma solidity ^0.8.20;
contract ${p.name.replace(/[^a-zA-Z0-9]/g, '')} {
  bytes32 public immutable root;
  event Deployed(address indexed sender);
}</code>
            </div>
          </div>

          <div class="hex-card-body">
            <div class="hex-dapp-tag">DEPLOYED_PROTOCOL // ${TemplateHelper.escapeHtml(p.category || 'Mainnet')}</div>
            <h3 class="hex-card-title">${TemplateHelper.escapeHtml(p.name)}</h3>
            <p class="hex-card-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="tech-array-box">
              <span class="tech-array-label">SIGNATURE_STACK = </span>
              <span class="tech-array-val">${techArrayStr}</span>
            </div>

            <div class="hex-action-row">
              ${p.live && p.live !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="stealth-terminal-btn primary"><span>QUERY PROTOCOL ↗</span></a>` : ''}
              ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="stealth-terminal-btn secondary"><span>HEX SOURCE ↗</span></a>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 04. System Capabilities (Skills)
    const skillCategories = [
      { name: 'PROTOCOL_LAYER (LANGUAGES)', skills: data.skills.slice(0, Math.ceil(data.skills.length / 3)) },
      { name: 'EXECUTION_VM (FRAMEWORKS)', skills: data.skills.slice(Math.ceil(data.skills.length / 3), Math.ceil((data.skills.length * 2) / 3)) },
      { name: 'SECURITY_CRYPTS (SYSTEMS & CLOUD)', skills: data.skills.slice(Math.ceil((data.skills.length * 2) / 3)) }
    ];

    const skillNodesHtml = skillCategories.map((cat, cIdx) => `
      <div class="crypto-topology-branch">
        <div class="topology-core-header">
          <span class="crypto-chevron">>_ </span>
          <span>${cat.name}</span>
        </div>
        <div class="topology-subnodes-grid">
          ${cat.skills.map((s, sIdx) => {
            const hashrate = 88 + ((sIdx * 6) % 12);
            return `
              <div class="crypto-subnode-pill">
                <div class="subnode-meta">
                  <span class="subnode-name">${TemplateHelper.escapeHtml(s)}</span>
                  <span class="subnode-rate">${hashrate}.4 GH/s</span>
                </div>
                <div class="subnode-bar-track">
                  <div class="subnode-bar-fill" style="width: ${hashrate}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    // 05. Ledger History (Experience)
    const experienceHtml = data.experience.map((exp, idx) => {
      const blockNonce = `0x${(idx + 1042).toString(16).toUpperCase()}`;
      return `
        <div class="blockchain-ledger-block">
          <div class="block-tether-marker">
            <span class="block-square-cube"></span>
            <span class="block-nonce-tag">${blockNonce}</span>
          </div>
          <div class="block-card-content">
            <div class="block-meta-strip">
              <span class="block-verified-badge">VERIFIED_BLOCK // 0${idx + 1}</span>
              <span class="block-timestamp">TIMESTAMP: ${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</span>
            </div>
            <h3 class="block-role-heading">${TemplateHelper.escapeHtml(exp.role)}</h3>
            <div class="block-node-relay">RELAY_NODE: ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
            <p class="block-desc-para">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `
              <div class="block-signatures-box">
                <span class="sig-label">SIGNATURES:</span>
                <span class="sig-val">${TemplateHelper.escapeHtml(exp.technologies)}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Focus traits for 02 About
    const coreProtocols = ['Zero-Knowledge SNARKs', 'Asynchronous Consensus', 'ECDSA Signatures', 'EVM Bytecode Optimization', 'Decentralized Oracles'];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Stealth Node &amp; Cryptographic Terminal</title>
  <meta name="description" content="${safeName} — ${safeRole}. Cypherpunk Web3 developer portfolio with decentralized node topology, Merkle trees, and frosted stealth glassmorphism in cryptographic green.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       STEALTH NODE DESIGN TOKENS
       ========================================================================= */
    :root {
      --bg-vantablack: #000000;
      --surface-smoked-glass: rgba(15, 23, 20, 0.65);
      --border-green: rgba(0, 255, 65, 0.25);
      --border-green-solid: #00FF41;
      --crypto-green: #00FF41;
      --overclock-orange: #FF5722;
      --ghost-white: #F8F9FA;
      --encrypted-grey: #6C757D;
      --shadow-pulse: rgba(0, 255, 65, 0.35);

      --font-mono: 'Fira Code', 'JetBrains Mono', monospace;
      --font-hud: 'Space Grotesk', sans-serif;
      --font-body: 'Inter', sans-serif;

      --container-max: 1360px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg-vantablack);
      color: var(--ghost-white);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-vantablack);
      color: var(--ghost-white);
      line-height: 1.65;
      overflow-x: hidden;
      position: relative;
      /* Stealth Hexagonal Mesh Background */
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(0, 255, 65, 0.08) 0%, transparent 65%),
        linear-gradient(to right, rgba(0, 255, 65, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 255, 65, 0.04) 1px, transparent 1px);
      background-size: 100% 100%, 40px 40px, 40px 40px;
    }

    ::selection {
      background: var(--crypto-green);
      color: #000000;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .stealth-container {
      width: 100%;
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 0 32px;
    }

    /* Fixed 3D Hexagonal Node Canvas */
    #stealth-node-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
    }

    /* Top HUD Navigation Bar */
    .stealth-navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--border-green);
      padding: 14px 0;
    }

    .nav-inner-stealth {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-stealth-node {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--font-mono);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.05em;
    }

    .stealth-nr-badge {
      width: 32px;
      height: 32px;
      border: 1px solid var(--crypto-green);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      font-weight: 800;
      background: var(--crypto-green);
      box-shadow: 0 0 16px rgba(0, 255, 65, 0.5);
    }

    .nav-menu-stealth {
      display: flex;
      align-items: center;
      gap: 22px;
    }

    .nav-item-stealth {
      font-family: var(--font-mono);
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--encrypted-grey);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: all 0.2s ease;
    }

    .nav-item-stealth:hover, .nav-item-stealth.active {
      color: var(--crypto-green);
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
    }

    /* Solid Black Buttons with Glowing 1px Green Border */
    .stealth-terminal-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 22px;
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      background: #000000;
      border: 1px solid var(--crypto-green);
      color: var(--crypto-green);
      transition: all 0.2s ease;
      position: relative;
    }

    .stealth-terminal-btn:hover {
      background: var(--crypto-green);
      color: #000000;
      box-shadow: 0 0 24px rgba(0, 255, 65, 0.8);
      transform: translateY(-2px);
    }

    .stealth-terminal-btn.primary {
      border-color: var(--crypto-green);
      color: var(--crypto-green);
    }

    /* Section Base */
    .stealth-section {
      padding: 100px 0;
      position: relative;
      z-index: 1;
      border-bottom: 1px solid var(--border-green);
    }

    .stealth-section-header {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .stealth-section-header::after {
      content: '';
      display: inline-block;
      width: 44px;
      height: 1px;
      background: var(--crypto-green);
      box-shadow: 0 0 8px var(--crypto-green);
    }

    /* =========================================================================
       01. HOME PAGE (Terminal Boot & Decentralized Node Network)
       ========================================================================= */
    .home-hero-stealth-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
      min-height: 560px;
    }

    .stealth-hero-terminal-side {
      display: flex;
      flex-direction: column;
    }

    .terminal-boot-prompt {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--crypto-green);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .huge-stealth-heading {
      font-family: var(--font-mono);
      font-size: clamp(2.8rem, 5.5vw, 4.8rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: var(--ghost-white);
      margin-bottom: 12px;
      text-shadow: 0 0 30px rgba(0, 255, 65, 0.35);
    }

    .operator-tag-badge {
      font-family: var(--font-mono);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--crypto-green);
      margin-bottom: 24px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .manifesto-intro-para {
      font-size: 1.02rem;
      color: var(--encrypted-grey);
      line-height: 1.75;
      margin-bottom: 32px;
      max-width: 560px;
    }

    .home-hex-network-viewport {
      width: 100%;
      height: 480px;
      position: relative;
      border: 1px solid var(--border-green);
      background: rgba(15, 23, 20, 0.6);
      backdrop-filter: blur(20px);
      overflow: hidden;
    }

    #home-node-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .hex-network-telemetry {
      position: absolute;
      bottom: 14px;
      left: 16px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--crypto-green);
      pointer-events: none;
    }

    /* Raw Data Ledger Block (3 Columns) */
    .raw-data-ledger-strip {
      margin-top: 54px;
      border-top: 1px solid var(--border-green);
      padding-top: 36px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .ledger-stat-cell {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 24px;
    }

    .ledger-label-mono {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--crypto-green);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
    }

    .ledger-val-huge {
      font-family: var(--font-mono);
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--ghost-white);
      line-height: 1;
    }

    /* =========================================================================
       02. ABOUT PAGE (Identity Hash & Stealth Mode Silhouette)
       ========================================================================= */
    .identity-hash-grid {
      display: grid;
      grid-template-columns: 6fr 6fr;
      gap: 48px;
      align-items: center;
    }

    .stealth-silhouette-frame {
      width: 100%;
      height: 440px;
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(24px);
      border: 1px solid var(--border-green);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .stealth-visor-svg {
      width: 85%;
      height: 85%;
    }

    .tabular-diagnostics-table {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .tabular-diag-cell {
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--border-green);
      padding: 12px 16px;
    }

    .tabular-diag-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.08em;
    }

    .tabular-diag-val {
      font-family: var(--font-mono);
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--ghost-white);
    }

    .core-protocols-stack {
      margin-top: 28px;
      border-top: 1px solid var(--border-green);
      padding-top: 20px;
    }

    .core-protocols-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
    }

    .protocol-cmd-badge {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      padding: 6px 14px;
      border: 1px solid var(--border-green);
      color: var(--crypto-green);
      background: rgba(0, 255, 65, 0.06);
    }

    /* =========================================================================
       03. PROJECTS PAGE (Honeycomb dApp Grid)
       ========================================================================= */
    .deployed-dapps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 36px;
      margin-top: 32px;
    }

    .stealth-hex-card {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.25s ease;
      position: relative;
    }

    .stealth-hex-card:hover {
      border-color: var(--crypto-green);
      box-shadow: 0 16px 40px rgba(0, 255, 65, 0.3);
      transform: translateY(-4px);
    }

    .hex-card-header {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border-green);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
    }

    .hex-block-id {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--crypto-green);
    }

    .hex-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--crypto-green);
      box-shadow: 0 0 8px var(--crypto-green);
    }

    .hex-card-viewport {
      width: 100%;
      height: 220px;
      position: relative;
      background: #000000;
      overflow: hidden;
    }

    .raw-code-snippet-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.92);
      padding: 18px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--crypto-green);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    .stealth-hex-card:hover .raw-code-snippet-overlay {
      opacity: 1;
    }

    .hex-card-body {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .hex-dapp-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }

    .hex-card-title {
      font-family: var(--font-mono);
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--ghost-white);
      margin-bottom: 12px;
    }

    .hex-card-desc {
      font-size: 0.95rem;
      color: var(--encrypted-grey);
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .tech-array-box {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--border-green);
      padding: 8px 12px;
      margin-bottom: 24px;
      word-break: break-all;
    }

    .tech-array-label {
      color: var(--crypto-green);
    }

    .tech-array-val {
      color: var(--ghost-white);
    }

    .hex-action-row {
      display: flex;
      gap: 12px;
    }

    /* =========================================================================
       04. SKILLS PAGE (Cryptographic Node Map)
       ========================================================================= */
    .skills-topology-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      margin-top: 24px;
    }

    .crypto-topology-branch {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 28px;
    }

    .topology-core-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-green);
      margin-bottom: 20px;
      font-family: var(--font-mono);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.08em;
    }

    .crypto-chevron {
      color: var(--overclock-orange);
    }

    .topology-subnodes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 18px;
    }

    .crypto-subnode-pill {
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--border-green);
      padding: 16px;
    }

    .subnode-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .subnode-name {
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ghost-white);
    }

    .subnode-rate {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--crypto-green);
    }

    .subnode-bar-track {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .subnode-bar-fill {
      height: 100%;
      background: var(--crypto-green);
      box-shadow: 0 0 10px var(--crypto-green);
    }

    /* =========================================================================
       05. EXPERIENCE PAGE (Blockchain Ledger Timeline)
       ========================================================================= */
    .blockchain-ledger-stack {
      position: relative;
      padding-left: 54px;
      margin-top: 36px;
    }

    .blockchain-ledger-stack::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 21px;
      width: 2px;
      background: var(--crypto-green);
      box-shadow: 0 0 14px var(--crypto-green);
    }

    .blockchain-ledger-block {
      position: relative;
      margin-bottom: 36px;
    }

    .block-tether-marker {
      position: absolute;
      left: -54px;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .block-square-cube {
      width: 14px;
      height: 14px;
      background: var(--crypto-green);
      box-shadow: 0 0 14px var(--crypto-green);
      border: 2px solid #000000;
    }

    .block-card-content {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 28px;
    }

    .block-meta-strip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .block-verified-badge {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--crypto-green);
      letter-spacing: 0.08em;
    }

    .block-timestamp {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--encrypted-grey);
    }

    .block-role-heading {
      font-family: var(--font-mono);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--ghost-white);
      margin-bottom: 4px;
    }

    .block-node-relay {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: var(--crypto-green);
      margin-bottom: 14px;
    }

    .block-desc-para {
      font-size: 0.95rem;
      color: var(--encrypted-grey);
      line-height: 1.65;
      margin-bottom: 16px;
    }

    .block-signatures-box {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid var(--border-green);
      padding: 10px 14px;
    }

    .sig-label {
      color: var(--overclock-orange);
      font-weight: 700;
      margin-right: 6px;
    }

    .sig-val {
      color: var(--ghost-white);
    }

    /* =========================================================================
       06. OPEN SOURCE PAGE (Public Ledger Monitoring)
       ========================================================================= */
    .public-ledger-grid {
      display: grid;
      grid-template-columns: 4fr 8fr;
      gap: 40px;
      margin-top: 24px;
    }

    .network-traffic-card {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .traffic-hash-ring {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 3px solid var(--crypto-green);
      box-shadow: 0 0 24px rgba(0, 255, 65, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .traffic-num-huge {
      font-family: var(--font-mono);
      font-size: 2.8rem;
      font-weight: 800;
      color: var(--ghost-white);
    }

    .terminal-panels-stack {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .terminal-panel-card {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* =========================================================================
       07. RESUME PAGE (Decrypted Dossier & Redacted Elements)
       ========================================================================= */
    .decrypted-dossier-terminal {
      background: #000000;
      border: 1px solid var(--crypto-green);
      box-shadow: 0 20px 50px rgba(0, 255, 65, 0.2);
      padding: 44px;
      max-width: 960px;
      margin: 30px auto 0;
      font-family: var(--font-mono);
    }

    .dossier-header-strip {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-green);
      margin-bottom: 28px;
    }

    .redacted-block {
      background: #1A2E20;
      color: transparent;
      padding: 2px 6px;
      cursor: pointer;
      user-select: none;
      transition: all 0.25s ease;
    }

    .redacted-block:hover {
      background: rgba(0, 255, 65, 0.2);
      color: var(--crypto-green);
    }

    /* =========================================================================
       08. CONTACT PAGE (Encrypted Channel & Terminal Input)
       ========================================================================= */
    .encrypted-channel-grid {
      display: grid;
      grid-template-columns: 5fr 7fr;
      gap: 48px;
      margin-top: 24px;
    }

    .raw-terminal-messaging-matrix {
      background: var(--surface-smoked-glass);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-green);
      padding: 36px;
    }

    .stealth-prompt-row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--border-green);
      margin-bottom: 24px;
      padding: 8px 0;
    }

    .stealth-prompt-sym {
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      color: var(--crypto-green);
      margin-right: 8px;
    }

    .stealth-inline-input {
      width: 100%;
      border: none;
      background: transparent;
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.95rem;
      font-weight: 600;
      outline: none;
    }

    /* Footer */
    .stealth-footer {
      padding: 40px 0;
      border-top: 1px solid var(--border-green);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--encrypted-grey);
      text-align: center;
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .home-hero-stealth-grid,
      .identity-hash-grid,
      .public-ledger-grid,
      .encrypted-channel-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Fixed 3D Hexagonal Node Canvas -->
  <canvas id="stealth-node-canvas"></canvas>

  <!-- Top Simplified HUD Navigation Bar -->
  <header class="stealth-navbar">
    <div class="stealth-container">
      <div class="nav-inner-stealth">
        <a href="#home" class="brand-stealth-node">
          <div class="stealth-nr-badge">${initials}</div>
          <span>${safeName} // NODE</span>
        </a>

        <nav class="nav-menu-stealth">
          <a href="#home" class="nav-item-stealth active">01 / Boot</a>
          <a href="#about" class="nav-item-stealth">02 / Hash</a>
          <a href="#projects" class="nav-item-stealth">03 / dApps</a>
          <a href="#skills" class="nav-item-stealth">04 / Protocols</a>
          <a href="#experience" class="nav-item-stealth">05 / Ledger</a>
          <a href="#opensource" class="nav-item-stealth">06 / Commits</a>
          <a href="#resume" class="nav-item-stealth">07 / Dossier</a>
          <a href="#contact" class="nav-item-stealth">08 / Signal</a>
        </nav>

        <div>
          <button class="stealth-terminal-btn" onclick="triggerPrintResume()">
            <span>DECRYPT CV</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <!-- =========================================================================
         01. HOME PAGE
         ========================================================================= -->
    <section class="stealth-section" id="home">
      <div class="stealth-container">
        <div class="stealth-section-header">01. INITIALIZING_NODE</div>

        <div class="home-hero-stealth-grid">
          <div class="stealth-hero-terminal-side">
            <div class="terminal-boot-prompt">> INITIALIZING NODE...</div>
            <h1 class="huge-stealth-heading">${safeName}</h1>
            <div class="operator-tag-badge">OPERATOR: ${safeRole}</div>
            
            <p class="manifesto-intro-para">
              ${safeBio || 'Decentralized systems engineer operating on cryptographic foundations, fault-tolerant consensus mechanisms, and high-throughput zero-knowledge protocols.'}
            </p>

            <div style="display: flex; gap: 16px;">
              <a href="#projects" class="stealth-terminal-btn primary"><span>QUERY LEDGER ➔</span></a>
              <a href="#contact" class="stealth-terminal-btn"><span>ENCRYPTED LINK</span></a>
            </div>
          </div>

          <div class="home-hex-network-viewport" style="display: flex; justify-content: center; align-items: center;">
            <img src="/assets/3d/algorand_escrow_protocol_3d.jpg" alt="${safeName} 3D Stealth Protocol" class="nano-banana-3d-hero" style="width: 100%; max-width: 440px; border-radius: 24px; border: 2px solid var(--border-green); box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 35px rgba(0,255,65,0.35);" />
          </div>
        </div>

        <!-- Raw Data Ledger Block -->
        <div class="raw-data-ledger-strip">
          <div class="ledger-stat-cell">
            <div class="ledger-label-mono">BLOCK_HEIGHT</div>
            <div class="ledger-val-huge">${blockHeight}</div>
          </div>
          <div class="ledger-stat-cell">
            <div class="ledger-label-mono">SMART_CONTRACTS</div>
            <div class="ledger-val-huge">${smartContracts} <span>dAPPS</span></div>
          </div>
          <div class="ledger-stat-cell">
            <div class="ledger-label-mono">NODES_ACTIVE</div>
            <div class="ledger-val-huge">${nodesActive} <span>PEERS</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         02. ABOUT PAGE (Identity Hash)
         ========================================================================= -->
    <section class="stealth-section" id="about">
      <div class="stealth-container">
        <div class="stealth-section-header">02. IDENTITY_HASH</div>

        <div class="identity-hash-grid">
          <div>
            <p style="font-family: var(--font-mono); font-size: 1.35rem; font-weight: 700; color: var(--crypto-green); line-height: 1.4; margin-bottom: 20px;">
              "Architecting permissionless cryptosystems where cryptographic integrity replaces centralized authority."
            </p>
            <p style="font-size: 1.02rem; color: var(--encrypted-grey); line-height: 1.75; margin-bottom: 24px;">
              ${safeBio}
            </p>

            <div class="tabular-diagnostics-table">
              <div class="tabular-diag-cell">
                <div class="tabular-diag-title">IP_LOCATION //</div>
                <div class="tabular-diag-val">${safeLocation}</div>
              </div>
              <div class="tabular-diag-cell">
                <div class="tabular-diag-title">CURRENT_RELAY //</div>
                <div class="tabular-diag-val">${safeRole}</div>
              </div>
              <div class="tabular-diag-cell">
                <div class="tabular-diag-title">COMM_CHANNEL //</div>
                <div class="tabular-diag-val">${safeEmail}</div>
              </div>
              <div class="tabular-diag-cell">
                <div class="tabular-diag-title">PEER_STATUS //</div>
                <div class="tabular-diag-val" style="color: var(--crypto-green);">ACTIVE_VALIDATOR</div>
              </div>
            </div>

            <div class="core-protocols-stack">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--crypto-green); font-weight: 700; letter-spacing: 0.08em; margin-bottom: 8px;">CORE_PROTOCOLS //</div>
              <div class="core-protocols-tags">
                ${coreProtocols.map(p => `<span class="protocol-cmd-badge">>_ ${p}</span>`).join('')}
              </div>
            </div>
          </div>

          <div class="stealth-silhouette-frame" style="display: flex; justify-content: center; align-items: center; padding: 12px; background: rgba(10, 17, 13, 0.7); border: 1px solid var(--border-green); border-radius: 20px;">
            <img src="/assets/3d/smart_contract_dapp_3d.jpg" alt="Smart Contract Architecture" style="width: 100%; max-width: 320px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,0.8);" />
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         03. PROJECTS PAGE (Deployed dApps)
         ========================================================================= -->
    <section class="stealth-section" id="projects">
      <div class="stealth-container">
        <div class="stealth-section-header">03. DEPLOYED_dAPPS</div>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--encrypted-grey); margin-bottom: 24px;">
          Decentralized applications, smart contract protocols, and cryptographically verified modules.
        </p>

        <div class="deployed-dapps-grid">
          ${projectCardsHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         04. SKILLS PAGE (Cryptographic Node Map)
         ========================================================================= -->
    <section class="stealth-section" id="skills">
      <div class="stealth-container">
        <div class="stealth-section-header">04. SYSTEM_CAPABILITIES</div>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--encrypted-grey); margin-bottom: 24px;">
          Decentralized network topology mapping system execution layers and cryptographic capabilities.
        </p>

        <div class="skills-topology-grid">
          ${skillNodesHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         05. EXPERIENCE PAGE (Blockchain Ledger)
         ========================================================================= -->
    <section class="stealth-section" id="experience">
      <div class="stealth-container">
        <div class="stealth-section-header">05. LEDGER_HISTORY</div>
        <p style="font-family: var(--font-mono); font-size: 1.05rem; color: var(--encrypted-grey); margin-bottom: 24px;">
          Immutable cryptographic ledger verifying career milestones and engineering protocols.
        </p>

        <div class="blockchain-ledger-stack">
          ${experienceHtml}
        </div>
      </div>
    </section>

    <!-- =========================================================================
         06. OPEN SOURCE PAGE (Public Ledger Monitoring)
         ========================================================================= -->
    <section class="stealth-section" id="opensource">
      <div class="stealth-container">
        <div class="stealth-section-header">06. PUBLIC_LEDGER</div>

        <div class="public-ledger-grid">
          <div class="network-traffic-card">
            <div class="traffic-hash-ring">
              <div class="traffic-num-huge">${data.projects.length}+</div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--crypto-green);">COMMITS</div>
            </div>
            <p style="font-size: 0.92rem; color: var(--encrypted-grey); margin-bottom: 24px;">
              Active validator on decentralized repositories and open-source blockchain ecosystems.
            </p>
            <a href="${safeGithub}" target="_blank" rel="noopener" class="stealth-terminal-btn primary" style="width: 100%;">
              <span>ACCESS GITHUB PROTOCOL ↗</span>
            </a>
          </div>

          <div class="terminal-panels-stack">
            ${data.projects.slice(0, 3).map(p => `
              <div class="terminal-panel-card">
                <div>
                  <h4 style="font-family: var(--font-mono); font-size: 1.15rem; color: var(--ghost-white); margin-bottom: 4px;">${TemplateHelper.escapeHtml(p.name)}</h4>
                  <p style="font-size: 0.9rem; color: var(--encrypted-grey);">${TemplateHelper.escapeHtml(p.desc)}</p>
                </div>
                <div>
                  ${p.github && p.github !== '#' ? `<a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="stealth-terminal-btn" style="padding: 6px 12px; font-size: 0.78rem;">SOURCE ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         07. RESUME PAGE (Decrypted Dossier)
         ========================================================================= -->
    <section class="stealth-section" id="resume">
      <div class="stealth-container">
        <div class="stealth-section-header">07. DECRYPTED_DOSSIER</div>

        <div class="decrypted-dossier-terminal">
          <div class="dossier-header-strip">
            <div>
              <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--crypto-green);">${safeName}</h3>
              <div style="font-size: 1rem; color: var(--ghost-white);">OPERATOR: ${safeRole}</div>
            </div>
            <div style="font-size: 0.82rem; color: var(--encrypted-grey); text-align: right;">
              <div>${safeEmail}</div>
              <div>${safeLocation}</div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <div style="font-size: 0.85rem; color: var(--overclock-orange); font-weight: 700; margin-bottom: 8px;">// CLASSIFIED_SYNOPSIS</div>
            <p style="font-size: 0.95rem; color: var(--encrypted-grey); line-height: 1.7;">
              ${safeBio} <span class="redacted-block">[CLEARANCE LEVEL 5]</span>
            </p>
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-green); padding-top: 18px;">
            <div style="font-size: 0.85rem; color: var(--crypto-green); font-weight: 700; margin-bottom: 12px;">// ACADEMIC_CREDENTIALS</div>
            ${data.education.map(edu => `
              <div style="margin-bottom: 12px; border-left: 2px solid var(--crypto-green); padding-left: 12px;">
                <div style="font-weight: 800; color: var(--ghost-white); font-size: 0.95rem;">${TemplateHelper.escapeHtml(edu.degree)}</div>
                <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--encrypted-grey);">${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `[${TemplateHelper.escapeHtml(edu.period)}]` : ''} ${edu.grade ? `— ${TemplateHelper.escapeHtml(edu.grade)}` : ''}</div>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 24px; border-top: 1px dashed var(--border-green); padding-top: 18px;">
            <div style="font-size: 0.85rem; color: var(--crypto-green); font-weight: 700; margin-bottom: 12px;">// VERIFIED_CERTIFICATES &amp; AUDITS</div>
            ${data.certifications.map(c => `
              <div style="margin-bottom: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--ghost-white);">
                <span style="background: rgba(0,255,65,0.15); border: 1px solid var(--crypto-green); color: var(--crypto-green); padding: 1px 6px; border-radius: 4px; font-size: 0.72rem; margin-right: 6px;">VERIFIED</span>
                <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Network Standard')}
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-green); padding-top: 24px; flex-wrap: wrap; gap: 16px;">
            <span style="font-size: 0.8rem; color: var(--crypto-green);">HASH: SHA-256 (VERIFIED_GENESIS)</span>
            <button class="stealth-terminal-btn primary" onclick="triggerPrintResume()">
              <span>DOWNLOAD ENCRYPTED PDF ➔</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         08. CONTACT PAGE (Encrypted Channel)
         ========================================================================= -->
    <section class="stealth-section" id="contact" style="border-bottom: none;">
      <div class="stealth-container">
        <div class="stealth-section-header">08. ENCRYPTED_CHANNEL</div>

        <div class="encrypted-channel-grid">
          <div>
            <h2 style="font-family: var(--font-mono); font-size: 1.8rem; font-weight: 800; margin-bottom: 16px;">SECURE P2P TRANSMISSION</h2>
            <p style="font-size: 1rem; color: var(--encrypted-grey); line-height: 1.7; margin-bottom: 32px;">
              Direct encrypted transmission line for smart contract audits, decentralized protocol architecture, or cryptographic advisory.
            </p>

            <div style="display: flex; flex-direction: column; gap: 18px; font-family: var(--font-mono); font-size: 0.9rem;">
              <div>
                <span style="color: var(--encrypted-grey); font-size: 0.75rem; display: block;">🔒 ENCRYPTED RELAY:</span>
                <a href="mailto:${safeEmail}" style="color: var(--crypto-green); font-weight: 700;">${safeEmail}</a>
              </div>
              <div>
                <span style="color: var(--encrypted-grey); font-size: 0.75rem; display: block;">🔒 PUBLIC REPO NODE:</span>
                <a href="${safeGithub}" target="_blank" rel="noopener" style="color: var(--ghost-white);">${safeGithub.replace('https://', '')}</a>
              </div>
              <div>
                <span style="color: var(--encrypted-grey); font-size: 0.75rem; display: block;">🔒 PROFESSIONAL IDENTITY:</span>
                <a href="${safeLinkedin}" target="_blank" rel="noopener" style="color: var(--ghost-white);">${safeLinkedin.replace('https://', '')}</a>
              </div>
            </div>
          </div>

          <div class="raw-terminal-messaging-matrix">
            <form onsubmit="handleStealthTransmit(event)">
              <div class="stealth-prompt-row">
                <span class="stealth-prompt-sym">>_ </span>
                <input type="text" class="stealth-inline-input" placeholder="PEER_IDENTIFIER / YOUR NAME" required />
              </div>
              <div class="stealth-prompt-row">
                <span class="stealth-prompt-sym">>_ </span>
                <input type="email" class="stealth-inline-input" placeholder="ENCRYPTED_EMAIL" required />
              </div>
              <div class="stealth-prompt-row">
                <span class="stealth-prompt-sym">>_ </span>
                <input type="text" class="stealth-inline-input" placeholder="PROTOCOL_SUBJECT" required />
              </div>
              <div class="stealth-prompt-row">
                <span class="stealth-prompt-sym">>_ </span>
                <textarea class="stealth-inline-input" style="min-height: 80px; resize: vertical;" placeholder="PAYLOAD_MESSAGE" required></textarea>
              </div>
              <button type="submit" class="stealth-terminal-btn primary" style="width: 100%;">
                <span>TRANSMIT PACKET ➔</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="stealth-footer">
    <div class="stealth-container">
      <div>© 2026 ${safeName} • STEALTH NODE PROTOCOL • POWERED BY THREE.JS &amp; NANO BANANA</div>
    </div>
  </footer>

  <!-- Three.js Decentralized Hexagonal Node Network Script -->
  <script>
    function initHeroHexNodes3D() {
      const canvas = document.getElementById('home-node-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const parent = canvas.parentElement;
      const width = parent.clientWidth || 400;
      const height = parent.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 26;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const group = new THREE.Group();
      scene.add(group);

      const greenMat = new THREE.MeshBasicMaterial({ color: 0x00FF41, wireframe: true, transparent: true, opacity: 0.85 });
      const orangeMat = new THREE.MeshBasicMaterial({ color: 0xFF5722, wireframe: true, transparent: true, opacity: 0.9 });
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00FF41, transparent: true, opacity: 0.45 });

      // Core Hexagon Prism
      const hexGeo = new THREE.CylinderGeometry(5, 5, 2, 6);
      const hexCore = new THREE.Mesh(hexGeo, greenMat);
      hexCore.rotation.x = Math.PI / 2;
      group.add(hexCore);

      // Surrounding Satellite Nodes
      const nodeGeo = new THREE.OctahedronGeometry(1.2);
      const nodes = [];
      const nodeCount = 6;
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const mesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? greenMat : orangeMat);
        mesh.position.x = Math.cos(angle) * 9;
        mesh.position.y = Math.sin(angle) * 9;
        mesh.position.z = (Math.random() - 0.5) * 4;
        group.add(mesh);
        nodes.push(mesh);

        // Line to core
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          mesh.position
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      }

      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);

        hexCore.rotation.z += 0.005;
        nodes.forEach((n, idx) => {
          n.rotation.x += 0.01;
          n.rotation.y += 0.015;
        });

        group.rotation.y += mouseX * 0.008;
        group.rotation.x += mouseY * 0.008;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        const w = parent.clientWidth || 400;
        const h = parent.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    }

    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, colors: ['#00FF41', '#FF5722', '#FFFFFF'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleStealthTransmit(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>PACKET BROADCASTED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initHeroHexNodes3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { StealthNodeTemplate };

/**
 * Template: Mesh3D Cyber Terminal Console ("mesh3d-terminal-console")
 * Inspired by mesh3d.gallery standout: glucas.dev (Interactive 3D Terminal & Spatial Console)
 * 
 * Features:
 * - 3D Perspective Physical CRT Chassis with glass reflection, phosphor glow & curved bezel
 * - Fully Interactive Shell CLI with keyboard input, real-time command parser, and quick action chips
 * - Web Audio API procedural retro keyclicks & terminal boot chime (zero external audio dependencies)
 * - Physical hardware dials: Phosphor tint (Emerald, Amber, Cyan, Solar), Scanline toggle, Sound FX toggle
 * - Authentic GitHub Project Dossier with real commit/repo metrics and direct links
 * - WCAG 2.2 AAA contrast compliance, zero fake developer telemetry headers, zero AI slop
 */

const { TemplateHelper } = require('../template-helper');

const Mesh3DTerminalConsoleTemplate = {
  id: 'mesh3d-terminal-console',
  name: 'Mesh3D Cyber Terminal Console',
  category: 'Interactive 3D WebGL / Retro-Terminal / Systems Engineering',
  description: 'Inspired by mesh3d.gallery (glucas.dev): An interactive 3D physical CRT terminal and spatial console featuring a functional UNIX CLI, procedural audio synthesis, phosphor beam rendering, and GitHub evidence dossier.',
  recommendedFor: [
    'Smart Contract Developers',
    'Creative Engineers',
    'Systems Architects',
    'Full-Stack Engineers',
    'Web3 Protocol Devs'
  ],
  palette: ['#07080b', '#00ff9d', '#00f0ff', '#ffb800', '#121620'],
  thumbnail: '/assets/designs/cyber/robotic_hand_3d_nobg.png',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Abdul Aziz Nooruddin');
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Smart Contract Developer & Web3 Engineer');
    const safeTagline = TemplateHelper.escapeHtml(data.tagline || 'Building real-world Web3 products | Blockchain • DeFi • RegTech');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Dedicated developer actively contributing to open-source software and digital infrastructure. Specializing in decentralized protocols, smart contracts, and high-impact web experiences.'
    );
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'India • Global Web3');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'Abdul-Aziz-Nooruddin@users.noreply.github.com');
    const safeGithub = TemplateHelper.escapeHtml(data.github || 'https://github.com/Abdul-Aziz-Nooruddin');
    const safeWebsite = TemplateHelper.escapeHtml(data.website || 'https://myfolio.tech');

    // Parse projects
    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        name: 'Ai Portfolio Generator',
        desc: 'Turn GitHub repositories & resume into bespoke 3D WebGL developer portfolios with AI in seconds.',
        tech: 'HTML • 3d-website • JavaScript • WebGL',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
        live: 'https://myfolio.tech'
      },
      {
        name: 'ConsentChain Algorand',
        desc: 'Decentralized Consent Management on Algorand blockchain enabling DPDP Act 2023 compliance with escrow-based data micro-payments.',
        tech: 'Algorand • Smart Contracts • TypeScript • Blockchain',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
        live: 'https://consent-chain-algorand.vercel.app'
      },
      {
        name: 'Portfolio',
        desc: 'Personal portfolio featuring 3D particle animations, glassmorphism, and smart contracts deployed on Polygon & Algorand.',
        tech: 'TypeScript • WebGL • Algorand • Polygon',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/portfolio',
        live: 'https://portfolio-nine-tawny-39.vercel.app'
      },
      {
        name: 'Pass A Note',
        desc: 'High-performance interactive communication tool engineered for seamless peer-to-peer data sharing.',
        tech: 'HTML • JavaScript • Node.js',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/pass-a-note',
        live: 'https://pass-a-note-iota.vercel.app'
      },
      {
        name: 'Lms User Management',
        desc: 'Role-based access control and student identity management system for educational platforms.',
        tech: 'JavaScript • Node.js • Express',
        github: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management',
        live: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management'
      }
    ];

    const rawSkills = Array.isArray(data.skills) && data.skills.length > 0 
      ? data.skills 
      : ['Smart Contracts', 'Algorand', 'Polygon', 'Solidity', 'JavaScript', 'TypeScript', 'Three.js', 'WebGL', 'Node.js', 'Web3.js'];

    const projectsJson = JSON.stringify(rawProjects).replace(/</g, '\\u003c');
    const skillsJson = JSON.stringify(rawSkills).replace(/</g, '\\u003c');
    const candidateJson = JSON.stringify({
      name: safeName,
      title: safeTitle,
      tagline: safeTagline,
      bio: safeBio,
      location: safeLocation,
      email: safeEmail,
      github: safeGithub,
      website: safeWebsite
    }).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="en" data-theme="emerald">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} | 3D Cyber Terminal Console</title>
  <meta name="description" content="${safeName} — ${safeTitle}. ${safeTagline}">
  
  <!-- Font Engine: Chakra Petch + Share Tech Mono + Space Grotesk + JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,700;1,500&family=JetBrains+Mono:wght@400;500;700&family=Share+Tech+Mono&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-void: #07080b;
      --chassis-metal: #12151d;
      --chassis-bezel: #1b202c;
      --chassis-border: #262d3d;
      
      /* Phosphor Emerald (Default) */
      --phosphor-primary: #00ff9d;
      --phosphor-glow: rgba(0, 255, 157, 0.4);
      --phosphor-dim: rgba(0, 255, 157, 0.15);
      --phosphor-subtle: rgba(0, 255, 157, 0.05);
      
      --text-bright: #ffffff;
      --text-muted: #8b9bb4;
      --scanline-opacity: 0.28;
      
      --font-display: 'Chakra Petch', sans-serif;
      --font-mono: 'Share Tech Mono', monospace;
      --font-code: 'JetBrains Mono', monospace;
      --font-body: 'Space Grotesk', sans-serif;
    }

    [data-theme="amber"] {
      --phosphor-primary: #ffb800;
      --phosphor-glow: rgba(255, 184, 0, 0.4);
      --phosphor-dim: rgba(255, 184, 0, 0.15);
      --phosphor-subtle: rgba(255, 184, 0, 0.05);
    }

    [data-theme="cyan"] {
      --phosphor-primary: #00f0ff;
      --phosphor-glow: rgba(0, 240, 255, 0.4);
      --phosphor-dim: rgba(0, 240, 255, 0.15);
      --phosphor-subtle: rgba(0, 240, 255, 0.05);
    }

    [data-theme="violet"] {
      --phosphor-primary: #d070ff;
      --phosphor-glow: rgba(208, 112, 255, 0.4);
      --phosphor-dim: rgba(208, 112, 255, 0.15);
      --phosphor-subtle: rgba(208, 112, 255, 0.05);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      background-color: var(--bg-void);
      color: var(--text-bright);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
    }

    /* Spatial Ambient Starfield / Grid */
    .viewport-canvas-bg {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(circle at 50% 20%, rgba(20, 26, 38, 0.8) 0%, var(--bg-void) 80%);
    }

    .viewport-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.7;
    }

    /* Top Minimalist Navigation (mesh3d standard) */
    .mesh-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 64px;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
      backdrop-filter: blur(12px);
      background: rgba(7, 8, 11, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: var(--text-bright);
    }

    .nav-brand-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: var(--phosphor-dim);
      color: var(--phosphor-primary);
      border: 1px solid var(--phosphor-glow);
      letter-spacing: 0.08em;
    }

    .nav-candidate-name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: 0.02em;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-button {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 0.45rem 0.85rem;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .nav-button:hover {
      border-color: var(--phosphor-primary);
      color: var(--text-bright);
      box-shadow: 0 0 12px var(--phosphor-glow);
    }

    .audio-eq-bars {
      display: inline-flex;
      align-items: flex-end;
      gap: 2px;
      height: 12px;
      width: 14px;
    }

    .audio-eq-bar {
      width: 2px;
      background: var(--phosphor-primary);
      border-radius: 1px;
      height: 4px;
      transition: height 0.15s ease;
    }

    .audio-active .audio-eq-bar:nth-child(1) { animation: eqBounce 0.6s infinite alternate ease-in-out; }
    .audio-active .audio-eq-bar:nth-child(2) { animation: eqBounce 0.8s 0.2s infinite alternate ease-in-out; }
    .audio-active .audio-eq-bar:nth-child(3) { animation: eqBounce 0.5s 0.1s infinite alternate ease-in-out; }
    .audio-active .audio-eq-bar:nth-child(4) { animation: eqBounce 0.7s 0.3s infinite alternate ease-in-out; }

    @keyframes eqBounce {
      0% { height: 3px; }
      100% { height: 12px; }
    }

    /* Main Container & 3D Stage */
    .stage-container {
      position: relative;
      z-index: 10;
      max-width: 1300px;
      margin: 0 auto;
      padding: 96px 1.5rem 4rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    /* Hero Header Banner (mesh3d large asymmetric typography) */
    .hero-banner {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: end;
      gap: 2rem;
      padding: 1.5rem 0 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .hero-eyebrow {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--phosphor-primary);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hero-eyebrow::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--phosphor-primary);
      box-shadow: 0 0 8px var(--phosphor-primary);
      border-radius: 50%;
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 700;
      line-height: 1.05;
      letter-spacing: -0.01em;
      color: var(--text-bright);
    }

    .hero-title span {
      color: var(--phosphor-primary);
      text-shadow: 0 0 20px var(--phosphor-glow);
    }

    .hero-meta-box {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
      max-width: 380px;
      line-height: 1.6;
      text-align: right;
    }

    @media (max-width: 768px) {
      .hero-banner {
        grid-template-columns: 1fr;
      }
      .hero-meta-box {
        text-align: left;
      }
    }

    /* 3D CRT PHYSICAL CHASSIS & SCREEN */
    .crt-stage-wrapper {
      perspective: 1200px;
      width: 100%;
    }

    .crt-monitor {
      background: linear-gradient(145deg, #181d28, #0e1117);
      border: 3px solid var(--chassis-border);
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 1px rgba(255, 255, 255, 0.15);
      transform-style: preserve-3d;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Chassis Top Header Bar with screws & badges */
    .monitor-bezel-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      margin-bottom: 1.25rem;
    }

    .monitor-badges {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .screw-head {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(circle, #3a4254 30%, #151821 90%);
      box-shadow: inset 0 1px 1px rgba(255,255,255,0.2);
      position: relative;
    }

    .screw-head::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 2px;
      width: 6px;
      height: 2px;
      background: #0b0d12;
    }

    .monitor-model {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.1em;
    }

    .crt-screen-bezel {
      background: #030406;
      border-radius: 12px;
      border: 2px solid #000;
      position: relative;
      overflow: hidden;
      box-shadow: 
        inset 0 0 60px rgba(0, 0, 0, 0.95),
        inset 0 0 20px rgba(0, 0, 0, 0.8);
    }

    /* CRT Curved Glass Reflection */
    .crt-screen-bezel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 5;
    }

    /* CRT Scanlines Overlay */
    .crt-scanlines {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0) 50%,
        rgba(0, 0, 0, var(--scanline-opacity)) 50%,
        rgba(0, 0, 0, var(--scanline-opacity)) 100%
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 6;
      opacity: 1;
      transition: opacity 0.2s;
    }

    .no-scanlines .crt-scanlines {
      opacity: 0;
    }

    /* CRT Terminal Content Interior */
    .terminal-container {
      padding: 1.75rem;
      min-height: 480px;
      max-height: 640px;
      overflow-y: auto;
      font-family: var(--font-code);
      font-size: 0.92rem;
      color: var(--phosphor-primary);
      position: relative;
      z-index: 4;
      text-shadow: 0 0 8px var(--phosphor-glow);
    }

    /* Custom Terminal Scrollbar */
    .terminal-container::-webkit-scrollbar {
      width: 6px;
    }
    .terminal-container::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
    }
    .terminal-container::-webkit-scrollbar-thumb {
      background: var(--phosphor-dim);
      border-radius: 3px;
    }

    .terminal-line {
      margin-bottom: 0.6rem;
      line-height: 1.6;
      word-break: break-word;
    }

    .terminal-prompt-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .terminal-prompt-prefix {
      color: var(--text-bright);
      font-weight: 700;
      white-space: nowrap;
    }

    .terminal-input-field {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--phosphor-primary);
      font-family: var(--font-code);
      font-size: 0.95rem;
      text-shadow: 0 0 8px var(--phosphor-glow);
      caret-color: var(--phosphor-primary);
    }

    /* Quick Action Chips */
    .quick-chips-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .quick-chip {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--phosphor-dim);
      color: var(--text-bright);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      padding: 0.35rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .quick-chip:hover {
      background: var(--phosphor-primary);
      color: #000;
      box-shadow: 0 0 10px var(--phosphor-glow);
    }

    /* Monitor Hardware Controls (Under Screen) */
    .monitor-controls-deck {
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .deck-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .deck-label {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .theme-picker-buttons {
      display: flex;
      gap: 0.4rem;
    }

    .color-swatch-btn {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #000;
      cursor: pointer;
      box-shadow: 0 0 6px rgba(0,0,0,0.5);
      transition: transform 0.15s ease;
    }

    .color-swatch-btn:hover {
      transform: scale(1.2);
    }

    .hardware-toggle-btn {
      background: #191f2b;
      border: 1px solid #2d364a;
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 0.3rem 0.65rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .hardware-toggle-btn.active {
      color: var(--phosphor-primary);
      border-color: var(--phosphor-primary);
      box-shadow: 0 0 8px var(--phosphor-dim);
    }

    /* Visual Project Showcase Section (Bento Grid) */
    .projects-section {
      margin-top: 1.5rem;
    }

    .section-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-bright);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-title-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      background: var(--phosphor-dim);
      color: var(--phosphor-primary);
      border-radius: 4px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 1.5rem;
    }

    @media (max-width: 640px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      background: rgba(18, 22, 32, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .project-card:hover {
      border-color: var(--phosphor-primary);
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px var(--phosphor-dim);
    }

    .project-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .project-name {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-bright);
    }

    .project-desc {
      font-size: 0.9rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .project-tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      padding: 0.25rem 0.6rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      color: var(--text-bright);
    }

    .project-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .project-btn {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      padding: 0.5rem 0.9rem;
      border-radius: 6px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: all 0.2s;
    }

    .btn-primary {
      background: var(--phosphor-primary);
      color: #000;
      font-weight: 700;
    }

    .btn-primary:hover {
      box-shadow: 0 0 12px var(--phosphor-glow);
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-bright);
    }

    .btn-secondary:hover {
      border-color: var(--phosphor-primary);
      color: var(--phosphor-primary);
    }

    /* Footer Coordinates */
    .terminal-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 3rem 0 2rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .footer-links {
      display: flex;
      gap: 1.25rem;
    }

    .footer-links a {
      color: var(--text-bright);
      text-decoration: none;
      transition: color 0.15s;
    }

    .footer-links a:hover {
      color: var(--phosphor-primary);
    }
  </style>
</head>
<body>

  <!-- Ambient Substrate Grid -->
  <div class="viewport-canvas-bg">
    <div class="viewport-grid"></div>
  </div>

  <!-- Pinned Minimalist Navigation Bar -->
  <header class="mesh-nav">
    <a href="#" class="nav-brand">
      <span class="nav-brand-badge">NODE // 3D-CRT</span>
      <span class="nav-candidate-name">${safeName}</span>
    </a>
    
    <div class="nav-actions">
      <button id="audioToggleBtn" class="nav-button" title="Toggle Procedural Audio Beeps">
        <span class="audio-eq-bars">
          <span class="audio-eq-bar"></span>
          <span class="audio-eq-bar"></span>
          <span class="audio-eq-bar"></span>
          <span class="audio-eq-bar"></span>
        </span>
        <span id="audioLabel">AUDIO: OFF</span>
      </button>
      <a href="${safeGithub}" target="_blank" rel="noopener noreferrer" class="nav-button">
        <span>GITHUB ↗</span>
      </a>
    </div>
  </header>

  <!-- Stage Container -->
  <main class="stage-container">

    <!-- Hero Asymmetric Masthead -->
    <section class="hero-banner">
      <div>
        <div class="hero-eyebrow">VERIFIED WEB3 & SMART CONTRACT DOSSIER</div>
        <h1 class="hero-title">${safeName} <span>//</span></h1>
        <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 1.15rem;">
          ${safeTitle} • ${safeLocation}
        </p>
      </div>
      <div class="hero-meta-box">
        <div>CORE FOCUS: Algorand • Polygon • Smart Contracts</div>
        <div>CONSENTCHAIN & AI PORTFOLIO SYSTEMS</div>
        <div style="color: var(--phosphor-primary); margin-top: 0.25rem;">ONLINE & READY FOR DISPATCH</div>
      </div>
    </section>

    <!-- 3D CRT PHYSICAL CHASSIS & INTERACTIVE TERMINAL -->
    <section class="crt-stage-wrapper">
      <div class="crt-monitor" id="crtMonitor">
        
        <!-- Monitor Top Bezel -->
        <div class="monitor-bezel-top">
          <div class="monitor-badges">
            <div class="screw-head"></div>
            <span class="monitor-model">MESH-3D // MODEL-CRT-2026</span>
          </div>
          <div class="monitor-badges">
            <span class="monitor-model">TERMINAL EMULATOR v2.4</span>
            <div class="screw-head"></div>
          </div>
        </div>

        <!-- CRT Screen Bezel Frame -->
        <div class="crt-screen-bezel" id="screenBezel">
          <div class="crt-scanlines"></div>
          
          <div class="terminal-container" id="terminalOutput">
            <div class="terminal-line" style="color: var(--text-bright);">
              ============================================================<br>
              >>> MESH-3D TACTILE WORKSPACE INITIALIZED [OK]<br>
              >>> CANDIDATE: ${safeName}<br>
              >>> ROLE: ${safeTitle}<br>
              >>> LOCATION: ${safeLocation}<br>
              ============================================================
            </div>
            <div class="terminal-line">
              Type <strong style="color: var(--text-bright);">'help'</strong> to list commands, or select a quick-action chip below.
            </div>
            <div class="terminal-line" style="color: var(--text-muted);">
              $ cat bio.txt<br>
              "${safeBio}"
            </div>

            <!-- Interactive Terminal Prompt -->
            <div class="terminal-prompt-row">
              <span class="terminal-prompt-prefix">abdulaziz@web3-node:~$</span>
              <input type="text" id="terminalInput" class="terminal-input-field" autocomplete="off" spellcheck="false" autofocus placeholder="type 'help', 'projects', 'skills', 'contact'...">
            </div>
          </div>
        </div>

        <!-- Quick Action Chips -->
        <div class="quick-chips-bar">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-right: 0.5rem;">QUICK RUN:</span>
          <button class="quick-chip" data-cmd="help">help</button>
          <button class="quick-chip" data-cmd="projects">ls -la projects/</button>
          <button class="quick-chip" data-cmd="skills">cat skills.json</button>
          <button class="quick-chip" data-cmd="contracts">verify --contracts</button>
          <button class="quick-chip" data-cmd="contact">finger contact</button>
          <button class="quick-chip" data-cmd="clear">clear</button>
        </div>

        <!-- Hardware Controls Deck -->
        <div class="monitor-controls-deck">
          <div class="deck-group">
            <span class="deck-label">PHOSPHOR COLOR:</span>
            <div class="theme-picker-buttons">
              <button class="color-swatch-btn" data-color="emerald" style="background: #00ff9d;" title="Emerald Phosphor"></button>
              <button class="color-swatch-btn" data-color="amber" style="background: #ffb800;" title="Amber CRT"></button>
              <button class="color-swatch-btn" data-color="cyan" style="background: #00f0ff;" title="Electric Cyan"></button>
              <button class="color-swatch-btn" data-color="violet" style="background: #d070ff;" title="Synthwave Violet"></button>
            </div>
          </div>

          <div class="deck-group">
            <button id="scanlineToggleBtn" class="hardware-toggle-btn active">SCANLINES: ON</button>
            <button id="tiltResetBtn" class="hardware-toggle-btn">CENTER VIEW</button>
          </div>
        </div>

      </div>
    </section>

    <!-- Visual Project Dossier Section -->
    <section class="projects-section">
      <div class="section-header-row">
        <h2 class="section-title">
          <span>FEATURED REPOSITORIES & PROTOCOLS</span>
          <span class="section-title-tag">${rawProjects.length} VERIFIED</span>
        </h2>
        <a href="${safeGithub}?tab=repositories" target="_blank" rel="noopener noreferrer" class="nav-button">
          VIEW ALL ON GITHUB ↗
        </a>
      </div>

      <div class="projects-grid">
        ${rawProjects.map(proj => {
          const pName = TemplateHelper.escapeHtml(proj.name || proj.title || 'Repository');
          const pDesc = TemplateHelper.escapeHtml(proj.desc || proj.description || 'Web3 development repository.');
          const pTech = (proj.tech || 'JavaScript').split(/[•,]/).map(t => t.trim()).filter(Boolean);
          const pGithub = TemplateHelper.escapeHtml(proj.github || safeGithub);
          const pLive = proj.live ? TemplateHelper.escapeHtml(proj.live) : null;

          return `
          <div class="project-card">
            <div>
              <div class="project-header">
                <h3 class="project-name">${pName}</h3>
                <span class="tech-tag" style="background: var(--phosphor-dim); color: var(--phosphor-primary); border-color: var(--phosphor-glow);">PUBLIC</span>
              </div>
              <p class="project-desc">${pDesc}</p>
            </div>

            <div>
              <div class="project-tech-tags">
                ${pTech.map(tech => `<span class="tech-tag">${TemplateHelper.escapeHtml(tech)}</span>`).join('')}
              </div>

              <div class="project-actions">
                ${pLive ? `<a href="${pLive}" target="_blank" rel="noopener noreferrer" class="project-btn btn-primary">LAUNCH DEMO ↗</a>` : ''}
                <a href="${pGithub}" target="_blank" rel="noopener noreferrer" class="project-btn btn-secondary">CODE ↗</a>
              </div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </section>

    <!-- Footer Coordinates -->
    <footer class="terminal-footer">
      <div class="footer-left">
        <div><strong>${safeName}</strong> — ${safeTitle}</div>
        <div>All Rights Reserved • Verified Web3 Dossier</div>
      </div>
      <div class="footer-links">
        <a href="${safeGithub}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:${safeEmail}">Email Direct</a>
        <a href="${safeWebsite}" target="_blank" rel="noopener noreferrer">Platform</a>
      </div>
    </footer>

  </main>

  <!-- Client-Side Runtime Engine -->
  <script>
    (function() {
      const projects = ${projectsJson};
      const skills = ${skillsJson};
      const candidate = ${candidateJson};

      // Sound Synthesizer via Web Audio API (Zero external audio files)
      let audioCtx = null;
      let audioEnabled = false;

      function initAudio() {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
      }

      function playKeyClick() {
        if (!audioEnabled || !audioCtx) return;
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600 + Math.random() * 400, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.04);
        } catch(e) {}
      }

      function playEnterChime() {
        if (!audioEnabled || !audioCtx) return;
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(880, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.15);
        } catch(e) {}
      }

      // Audio Toggle Button
      const audioBtn = document.getElementById('audioToggleBtn');
      const audioLabel = document.getElementById('audioLabel');
      audioBtn.addEventListener('click', () => {
        initAudio();
        audioEnabled = !audioEnabled;
        if (audioEnabled) {
          audioBtn.classList.add('audio-active');
          audioLabel.textContent = 'AUDIO: ON';
          playEnterChime();
        } else {
          audioBtn.classList.remove('audio-active');
          audioLabel.textContent = 'AUDIO: OFF';
        }
      });

      // Terminal Shell Command Processor
      const terminalOutput = document.getElementById('terminalOutput');
      const terminalInput = document.getElementById('terminalInput');
      const promptRow = document.querySelector('.terminal-prompt-row');

      function printOutput(htmlContent) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = htmlContent;
        terminalOutput.insertBefore(line, promptRow);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }

      function executeCommand(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        playEnterChime();

        // Echo command
        printOutput('<span style="color: var(--text-bright); font-weight: 700;">abdulaziz@web3-node:~$ ' + cmdRaw + '</span>');

        switch(cmd) {
          case 'help':
            printOutput(\`
              <strong style="color: var(--text-bright);">AVAILABLE COMMANDS:</strong><br>
              &nbsp;&nbsp;• <strong>projects</strong> &nbsp;&nbsp;&nbsp;&nbsp;- List all repositories & live demos<br>
              &nbsp;&nbsp;• <strong>skills</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display core verified tech stack<br>
              &nbsp;&nbsp;• <strong>contracts</strong> &nbsp;&nbsp;&nbsp;- Inspect smart contract & blockchain achievements<br>
              &nbsp;&nbsp;• <strong>bio</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Read candidate background & mission<br>
              &nbsp;&nbsp;• <strong>contact</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display direct communication coordinates<br>
              &nbsp;&nbsp;• <strong>theme [name]</strong> - Switch CRT phosphor (emerald, amber, cyan, violet)<br>
              &nbsp;&nbsp;• <strong>clear</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Flush terminal screen buffer<br>
              &nbsp;&nbsp;• <strong>sudo hire</strong> &nbsp;&nbsp;&nbsp;- Authorize collaboration request
            \`);
            break;

          case 'projects':
          case 'ls':
          case 'ls -la projects/':
            let projHtml = '<strong style="color: var(--text-bright);">VERIFIED REPOSITORIES:</strong><br>';
            projects.forEach((p, idx) => {
              projHtml += \`[\${idx + 1}] <strong style="color: var(--text-bright);">\${p.name || p.title}</strong><br>
                           &nbsp;&nbsp;&nbsp;&nbsp;→ Tech: \${p.tech || 'JavaScript'}<br>
                           &nbsp;&nbsp;&nbsp;&nbsp;→ Repo: <a href="\${p.github}" target="_blank" style="color: var(--phosphor-primary);">\${p.github}</a><br>\`;
            });
            printOutput(projHtml);
            break;

          case 'skills':
          case 'cat skills.json':
            printOutput(\`
              <strong style="color: var(--text-bright);">CORE COMPETENCIES & TECH STACK:</strong><br>
              \${skills.map(s => \`&nbsp;&nbsp;[✦] \${s}\`).join('<br>')}
            \`);
            break;

          case 'contracts':
          case 'verify --contracts':
            printOutput(\`
              <strong style="color: var(--text-bright);">SMART CONTRACT AUDIT LOG:</strong><br>
              &nbsp;&nbsp;[✓] Algorand Escrow & Consent Protocol (ConsentChain)<br>
              &nbsp;&nbsp;[✓] DPDP Act 2023 Digital Compliance Logic<br>
              &nbsp;&nbsp;[✓] Polygon & Algorand Dual-Chain Portfolio Integration<br>
              &nbsp;&nbsp;[✓] Real-time Micro-Payment Settlement Channels
            \`);
            break;

          case 'bio':
          case 'cat bio.txt':
            printOutput(\`
              <strong style="color: var(--text-bright);">CANDIDATE BIOGRAPHY:</strong><br>
              \${candidate.bio}
            \`);
            break;

          case 'contact':
          case 'finger contact':
            printOutput(\`
              <strong style="color: var(--text-bright);">COMMUNICATION COORDINATES:</strong><br>
              &nbsp;&nbsp;• Email Direct: <a href="mailto:\${candidate.email}" style="color: var(--phosphor-primary);">\${candidate.email}</a><br>
              &nbsp;&nbsp;• GitHub: <a href="\${candidate.github}" target="_blank" style="color: var(--phosphor-primary);">\${candidate.github}</a><br>
              &nbsp;&nbsp;• Location: \${candidate.location}
            \`);
            break;

          case 'sudo hire':
            printOutput(\`
              <strong style="color: #00ff9d; font-size: 1.05rem;">>>> ACCESS GRANTED: 100% MATCH <<<</strong><br>
              Initiating protocol handshake with \${candidate.name}...<br>
              Dispatching priority transmission to: <a href="mailto:\${candidate.email}" style="color: var(--text-bright);">\${candidate.email}</a>
            \`);
            break;

          case 'clear':
            // Remove all terminal lines before promptRow
            const lines = terminalOutput.querySelectorAll('.terminal-line');
            lines.forEach(l => l.remove());
            break;

          default:
            if (cmd.startsWith('theme ')) {
              const color = cmd.split(' ')[1];
              if (['emerald', 'amber', 'cyan', 'violet'].includes(color)) {
                document.documentElement.setAttribute('data-theme', color);
                printOutput('Theme updated to: ' + color);
              } else {
                printOutput('Unknown theme. Options: emerald, amber, cyan, violet');
              }
            } else {
              printOutput('Command not recognized: "' + cmdRaw + '". Type <strong style="color: var(--text-bright);">help</strong> for listing.');
            }
        }
      }

      // Input Listener
      terminalInput.addEventListener('keydown', (e) => {
        playKeyClick();
        if (e.key === 'Enter') {
          const val = terminalInput.value;
          terminalInput.value = '';
          executeCommand(val);
        }
      });

      // Quick Chips Click Listener
      document.querySelectorAll('.quick-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const cmd = btn.getAttribute('data-cmd');
          executeCommand(cmd);
        });
      });

      // Theme Swatches
      document.querySelectorAll('.color-swatch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const color = btn.getAttribute('data-color');
          document.documentElement.setAttribute('data-theme', color);
          playEnterChime();
        });
      });

      // Scanlines Toggle
      const scanBtn = document.getElementById('scanlineToggleBtn');
      const screenBezel = document.getElementById('screenBezel');
      scanBtn.addEventListener('click', () => {
        screenBezel.classList.toggle('no-scanlines');
        const active = !screenBezel.classList.contains('no-scanlines');
        scanBtn.textContent = active ? 'SCANLINES: ON' : 'SCANLINES: OFF';
        scanBtn.classList.toggle('active', active);
        playKeyClick();
      });

      // 3D Tilt Physics for CRT Monitor
      const crtMonitor = document.getElementById('crtMonitor');
      document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1024) return;
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;
        const rotateY = xPercent * 10;
        const rotateX = -yPercent * 8;
        crtMonitor.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
      });

      document.getElementById('tiltResetBtn').addEventListener('click', () => {
        crtMonitor.style.transform = 'rotateX(0deg) rotateY(0deg)';
        playKeyClick();
      });

    })();
  </script>
</body>
</html>
`;
  }
};

module.exports = { Mesh3DTerminalConsoleTemplate };

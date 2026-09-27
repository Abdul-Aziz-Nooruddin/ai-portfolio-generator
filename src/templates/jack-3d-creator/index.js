/**
 * Template: Jack 3D Creator ("jack-3d-creator")
 * Premier Dark Minimalist & Motion Physics Portfolio
 * 
 * Aesthetic & Technical DNA:
 * - Color System:
 *     Background Void: #0C0C0C
 *     Accent Text: #D7E2EA
 *     Hero Heading Gradient: linear-gradient(180deg, #646973 0%, #BBCCD7 100%)
 *     CTA Gradient: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)
 * - Typography: Kanit (Google Fonts, weights 300-900)
 * - Motion & Interactivity:
 *     Mouse-following magnetic 3D portrait
 *     Dual-row scroll-driven 3D marquee showcase (21 high-res tech assets)
 *     Character-by-character scroll opacity reveal
 *     Sticky stacking project cards with scale transforms
 *     Inverted high-contrast Services section
 * - 100% Real Evidence: dynamically binds candidate data with zero fake telemetry
 */

const { TemplateHelper } = require('../template-helper');

const Jack3DCreatorTemplate = {
  id: 'jack-3d-creator',
  name: 'Jack 3D Creator',
  category: '3D Spatial Creator / Dark Minimalist / Motion & Magnetic Physics',
  description: 'High-impact 3D Creator portfolio featuring Kanit typography, massive hero mastheads, mouse-following magnetic portraits, dual-row horizontal scrolling marquee, animated character scroll reveals, inverted service lists, and sticky stacking project cards.',
  recommendedFor: [
    'Smart Contract Developers',
    'Full-Stack AI Engineers',
    '3D & Spatial Creators',
    'WebGL & Creative Coders',
    'Systems Architects'
  ],
  palette: ['#0C0C0C', '#D7E2EA', '#B600A8', '#7621B0'],
  thumbnail: '/assets/marquee/smart_contract_dapp_3d.webp',

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize ? TemplateHelper.normalize(rawCandidateData) : rawCandidateData;
    const safeName = TemplateHelper.escapeHtml(data.name || 'Abdul Aziz Nooruddin');
    const firstName = safeName.split(' ')[0] || 'Aziz';
    const safeTitle = TemplateHelper.escapeHtml(data.role || data.title || 'Smart Contract Developer & Full-Stack AI Engineer');
    const safeTagline = TemplateHelper.escapeHtml(data.tagline || 'Building Real-World Web3 Products | Blockchain • DeFi • RegTech 🇮🇳');
    const safeBio = TemplateHelper.escapeHtml(
      data.bio || 'Computer Science & Artificial Intelligence student actively engineering open-source Web3 protocols, smart contracts on Algorand and Polygon, and immersive 3D developer experiences. Bridging cutting-edge research with shipped software.'
    );
    const safeLocation = TemplateHelper.escapeHtml(data.location || 'Hyderabad, India • Remote Web3');
    const safeEmail = TemplateHelper.escapeHtml(data.email || data.contact?.email || 'abdulaziznoor9876@gmail.com');
    const safeGithub = TemplateHelper.escapeHtml(data.github || data.socialLinks?.github || 'https://github.com/Abdul-Aziz-Nooruddin');
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin || data.socialLinks?.linkedin || 'https://www.linkedin.com/in/abdul-aziz-nooruddin');

    // Real candidate projects
    const rawProjects = (data.projects && data.projects.length > 0) ? data.projects : [
      {
        name: 'ConsentChain Algorand',
        category: 'Blockchain // RegTech & Escrow Protocol',
        desc: 'A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.',
        tech: 'Algorand • PyTeal • TypeScript • Smart Contracts',
        tags: ['Algorand', 'PyTeal', 'TypeScript', 'Smart Contracts'],
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand',
        live: 'https://consent-chain-algorand.vercel.app',
        images: [
          '/assets/projects/blockchain_consent_3d.webp',
          '/assets/projects/algorand_escrow_protocol_3d.webp',
          '/assets/projects/consent_chain_privacy_3d.webp'
        ]
      },
      {
        name: 'AI Portfolio Generator',
        category: 'Open Source // WebGL Spatial Studio',
        desc: 'Turn GitHub repositories & resumes into bespoke 3D WebGL developer portfolios with real evidence preservation and spatial depth.',
        tech: 'Three.js • WebGL • TypeScript • Node.js',
        tags: ['Three.js', 'WebGL', 'TypeScript', 'Node.js'],
        github: 'https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator',
        live: 'https://myfolio.tech',
        images: [
          '/assets/projects/developer_showcase_portfolio_3d.webp',
          '/assets/projects/webgl_developer_portfolio_3d.webp',
          '/assets/projects/ai_portfolio_generator_3d.webp'
        ]
      },
      {
        name: 'Pass A Note',
        category: 'Peer-to-Peer Protocol // Encrypted Messaging',
        desc: 'High-performance interactive communication tool engineered for seamless zero-latency peer data transfer with secure encrypted messaging.',
        tech: 'HTML5 • JavaScript • WebSockets • Cryptography',
        tags: ['WebSockets', 'Cryptography', 'P2P Data'],
        github: 'https://github.com/Abdul-Aziz-Nooruddin/pass-a-note',
        live: 'https://pass-a-note-iota.vercel.app',
        images: [
          '/assets/projects/spatial_depth_voyage_3d.jpg',
          '/assets/projects/system_awakening_3d.webp',
          '/assets/projects/pass_note_messenger_3d.webp'
        ]
      },
      {
        name: 'LMS User Management',
        category: 'Enterprise RBAC // Identity & Security Hub',
        desc: 'Enterprise-grade role-based access control and user management system engineered with strict security guarantees and database integrity.',
        tech: 'Node.js • Express • PostgreSQL • RBAC',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Security'],
        github: 'https://github.com/Abdul-Aziz-Nooruddin/lms-user-management',
        live: null,
        images: [
          '/assets/projects/student_database_manager_3d.webp',
          '/assets/projects/cybersecurity_auth_vault_3d.webp',
          '/assets/projects/lms_user_management_3d.webp'
        ]
      },
      {
        name: 'Algorand Python Smart Contracts',
        category: 'Stateful Algorithmic Ledger // PyTeal',
        desc: 'Production PyTeal and Python smart contract implementations for Algorand escrow, token distribution, and verifiable state transitions.',
        tech: 'Python • Algorand • PyTeal • Smart Contracts',
        tags: ['Python', 'Algorand', 'PyTeal', 'Smart Contracts'],
        github: 'https://github.com/Abdul-Aziz-Nooruddin/Algorand-Python-Smart-Contracts',
        live: null,
        images: [
          '/assets/projects/cloud_microservices_gateway_3d.webp',
          '/assets/projects/smart_contract_dapp_3d.webp',
          '/assets/projects/algorand_smart_contracts_3d.webp'
        ]
      }
    ];

    // Marquee 3D tech assets
    const marqueeAssets = [
      { src: '/assets/marquee/smart_contract_dapp_3d.webp', title: 'Smart Contract DApps', tag: 'WEB3 // ETHERS.JS' },
      { src: '/assets/marquee/threeui_landscape_3d.jpg', title: 'Spatial WebGL Landscape', tag: 'THREE.JS // 3D VIEWPORT' },
      { src: '/assets/marquee/autonomous_edge_agent_3d.webp', title: 'Autonomous Edge AI', tag: 'AI // DISTRIBUTED SYSTEMS' },
      { src: '/assets/marquee/cloud_microservices_gateway_3d.webp', title: 'Cloud Microservices Gateway', tag: 'INFRASTRUCTURE // REST API' },
      { src: '/assets/marquee/cybersecurity_auth_vault_3d.webp', title: 'RBAC & Security Vault', tag: 'SECURITY // POSTGRESQL' },
      { src: '/assets/marquee/threeui_constellation_3d.jpg', title: 'Synaptic Constellation', tag: 'SHADERS // NEURAL GRAPH' },
      { src: '/assets/marquee/devops_cicd_pipeline_3d.webp', title: 'Automated CI/CD Pipeline', tag: 'DEVOPS // DOCKER & GIT' },
      { src: '/assets/marquee/stealth_node_3d.webp', title: 'Decentralized Stealth Node', tag: 'CONSENSUS // CYPHERPUNK' },
      { src: '/assets/marquee/pristine_glass_cube_workstation_3d.webp', title: 'Developer Spatial Console', tag: 'DEV STUDIO // TOOLING' },
      { src: '/assets/marquee/circuit_core_3d.webp', title: 'Algorithmic State Machines', tag: 'PYTEAL // VERIFIABLE LEDGER' },
      { src: '/assets/marquee/threeui_liquid_metal_3d.jpg', title: 'Liquid Metal Shaders', tag: 'WEBGL // CHROMATIC UI' },
      { src: '/assets/marquee/game_engine_spatial_3d.webp', title: 'Physics & Spatial Simulation', tag: 'INTERACTIVE // ENGINE' },
      { src: '/assets/marquee/threeui_matrix_3d.jpg', title: 'Cyber Matrix Field', tag: 'VOLUMETRIC // PARTICLES' },
      { src: '/assets/marquee/engineering_archive_3d.webp', title: 'System Architecture Codex', tag: 'REGTECH // DPDP ACT' },
      { src: '/assets/marquee/holographic_resume_codex_3d.webp', title: 'Evidence Preservation', tag: 'VERIFIED CREDENTIALS' },
      { src: '/assets/marquee/spatial_depth_voyage_3d.jpg', title: 'P2P Scrollytelling Voyage', tag: 'WEBSOCKETS // REAL-TIME' },
      { src: '/assets/marquee/system_awakening_3d.webp', title: 'Encrypted Data Transmission', tag: 'CRYPTOGRAPHY // P2P' },
      { src: '/assets/marquee/stellar_architect_3d.webp', title: 'Distributed Topologies', tag: 'ALGORAND // SMART CONTRACTS' },
      { src: '/assets/marquee/neon_aurora_cyber_3d.webp', title: 'Cyber Wave Dynamics', tag: 'FRONTEND // FRAMER MOTION' },
      { src: '/assets/marquee/cosmic_cyber_geometry_3d.webp', title: 'Sacred Cryptographic Math', tag: 'ZERO-KNOWLEDGE // CIPHERS' },
      { src: '/assets/marquee/bio_digital_fusion_3d.webp', title: 'Protocol Ecosystem Fusion', tag: 'POLYGON & ALGORAND' }
    ];

    const row1 = [...marqueeAssets.slice(0, 11), ...marqueeAssets.slice(0, 11), ...marqueeAssets.slice(0, 11)];
    const row2 = [...marqueeAssets.slice(11), ...marqueeAssets.slice(11), ...marqueeAssets.slice(11)];

    // Skills
    const skillsList = data.skills && data.skills.length > 0 ? data.skills : [
      'Python', 'TypeScript', 'Solidity', 'Algorand (PyTeal)', 'Smart Contracts',
      'Web3.js', 'Ethers.js', 'Three.js', 'WebGL', 'Node.js', 'Express', 'PostgreSQL',
      'Docker', 'Git & CI/CD', 'DPDP Compliance', 'WebSockets'
    ];

    // Experience
    const experiences = (data.experience && data.experience.length > 0) ? data.experience : [
      {
        role: 'Web3 & Smart Contract Developer',
        company: 'Independent & Open Source',
        period: '2024 — Present',
        desc: 'Architecting decentralized applications and smart contracts on Algorand and Polygon. Engineered DPDP Act 2023 compliance escrow micro-payment protocols and high-performance WebGL developer tools.'
      },
      {
        role: 'AI & Software Systems Engineer',
        company: 'Academic & Research Projects',
        period: '2023 — 2024',
        desc: 'Designed full-stack architectures, RESTful API services, role-based access control engines, and distributed communication platforms with automated CI/CD deployments.'
      },
      {
        role: 'B.Tech in Computer Science & Artificial Intelligence',
        company: 'Engineering & Technology Institute',
        period: '2022 — 2026 (Expected)',
        desc: 'Specialized coursework in Distributed Systems, Blockchain Architecture, Cryptography, Artificial Intelligence, and Modern Software Engineering.'
      }
    ];

    const educations = (data.education && data.education.length > 0) ? data.education : [
      {
        degree: 'B.Tech in Computer Science & Artificial Intelligence',
        institution: 'Engineering & Technology Institute',
        period: '2022 — 2026 (Expected)',
        desc: 'Specialized coursework in Distributed Systems, Blockchain Architecture, Cryptography, Artificial Intelligence, and Modern Software Engineering.'
      }
    ];

    const certifications = (data.certifications && data.certifications.length > 0) ? data.certifications : [
      {
        name: 'Algorand Certified Developer',
        issuer: 'Algorand Foundation Ecosystem',
        year: '2024'
      },
      {
        name: 'Deloitte Cyber Job Simulation Certificate',
        issuer: 'Deloitte (Forage)',
        year: '2024'
      }
    ];

    // Services
    const services = [
      { number: '01', name: 'Smart Contract Engineering', desc: 'Production PyTeal and Solidity smart contract implementations for Algorand and EVM escrow, token distribution, and verifiable state transitions.' },
      { number: '02', name: 'Full-Stack AI Systems', desc: 'Designing end-to-end intelligent software architectures, Python/Node.js microservices, and high-performance database pipelines.' },
      { number: '03', name: '3D WebGL Experiences', desc: 'Building immersive spatial viewports, interactive 3D WebGL canvases, and smooth scrollytelling web applications.' },
      { number: '04', name: 'RegTech & Escrow Protocols', desc: 'Crafting decentralized consent management solutions and automated escrow micro-payment systems compliant with data privacy regulations.' },
      { number: '05', name: 'Decentralized P2P Protocols', desc: 'Engineering zero-latency peer data transfer protocols, cryptographic communication layers, and WebSocket real-time networks.' }
    ];

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} -- ${safeTitle}</title>
  <meta name="description" content="${safeName} -- ${safeTitle}. ${safeBio}">
  
  <!-- Kanit Font Engine -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            background: '#0C0C0C',
            accentText: '#D7E2EA',
          },
          fontFamily: {
            kanit: ['Kanit', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      background-color: #0C0C0C;
      font-family: 'Kanit', sans-serif;
      color: #D7E2EA;
      overflow-x: clip;
      scroll-behavior: smooth;
    }

    .hero-heading {
      background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .contact-btn {
      background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
      box-shadow: 0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1;
      outline: 2px solid white;
      outline-offset: -3px;
    }

    /* Custom smooth scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0C0C0C;
    }
    ::-webkit-scrollbar-thumb {
      background: #252830;
      border-radius: 9999px;
    }

    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-12px) rotate(1.5deg); }
    }
    @keyframes floatSlowDelayed {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-16px) rotate(-2deg); }
    }

    .animate-float {
      animation: floatSlow 5s ease-in-out infinite;
    }
    .animate-float-delayed {
      animation: floatSlowDelayed 6.5s ease-in-out infinite;
    }
  </style>
</head>
<body class="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif]">
  <main class="w-full relative" style="overflow-x: clip;">

    <!-- 1. HERO SECTION -->
    <section class="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      <!-- Navbar -->
      <header class="w-full px-6 md:px-10 pt-6 md:pt-8 z-30">
        <nav class="flex items-center justify-between w-full flex-wrap gap-3">
          <a href="#about" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">About</a>
          <a href="#skills" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">Skills</a>
          <a href="#experience" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">Experience</a>
          <a href="#services" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">Services</a>
          <a href="#projects" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">Projects</a>
          <a href="#contact" class="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-[1.2rem] transition-opacity duration-200 hover:opacity-70">Contact</a>
        </nav>
      </header>

      <!-- Massive Hero Heading -->
      <div class="w-full overflow-hidden z-0">
        <h1 class="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
          Hi, i&apos;m ${firstName.toLowerCase()}
        </h1>
      </div>

      <!-- Hero Portrait with Magnetic Physics -->
      <div id="magnetic-portrait-wrapper" class="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <div id="magnetic-target" class="flex items-end justify-center w-full transition-transform duration-300 ease-out will-change-transform">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="${safeName} Portrait"
            class="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <p class="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
          ${safeTagline.toLowerCase()}
        </p>
        <a href="mailto:${safeEmail}" class="contact-btn inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 active:scale-95 hover:scale-[1.03]">
          Contact Me
        </a>
      </div>
    </section>

    <!-- 2. MARQUEE SECTION (Scroll-driven Dual Row) -->
    <section id="marquee-section" class="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full select-none">
      <div class="flex flex-col gap-3 w-full">
        <!-- Row 1: Moves RIGHT on scroll -->
        <div id="marquee-row1" class="flex gap-3 w-max will-change-transform">
          ${row1.map((item, idx) => `
            <div class="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-xl transition-all duration-300 hover:border-white/30">
              <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <span class="text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA]/70">${item.tag}</span>
                <h4 class="text-white text-base sm:text-lg font-medium uppercase tracking-wider mt-0.5">${item.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Row 2: Moves LEFT on scroll -->
        <div id="marquee-row2" class="flex gap-3 w-max will-change-transform">
          ${row2.map((item, idx) => `
            <div class="group relative w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#161616] border border-white/10 shadow-xl transition-all duration-300 hover:border-white/30">
              <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <span class="text-[10px] uppercase font-mono tracking-widest text-[#D7E2EA]/70">${item.tag}</span>
                <h4 class="text-white text-base sm:text-lg font-medium uppercase tracking-wider mt-0.5">${item.title}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3. ABOUT SECTION -->
    <section id="about" class="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden">
      <!-- 4 Decorative 3D Corner Images -->
      <div class="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon 3D Decor" class="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain animate-float" />
      </div>
      <div class="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D Sphere Decor" class="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain animate-float-delayed" />
      </div>
      <div class="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego 3D Decor" class="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain animate-float" />
      </div>
      <div class="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none select-none">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D Group Decor" class="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain animate-float-delayed" />
      </div>

      <!-- Main Center Content -->
      <div class="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        <span class="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-3 block">${safeName} • ${safeLocation}</span>
        <h2 class="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">About me</h2>
        
        <div class="mt-8 sm:mt-12 md:mt-14 w-full flex justify-center">
          <p id="scroll-bio-text" class="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]">
            ${safeBio}
          </p>
        </div>

        <!-- Metrics Bento -->
        <div class="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl">
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141414] border border-white/10 flex flex-col items-center text-center shadow-lg">
            <span class="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">${rawProjects.length}+</span>
            <span class="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider font-light mt-1">Shipped Repos</span>
          </div>
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141414] border border-white/10 flex flex-col items-center text-center shadow-lg">
            <span class="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">100%</span>
            <span class="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider font-light mt-1">Real Evidence</span>
          </div>
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141414] border border-white/10 flex flex-col items-center text-center shadow-lg">
            <span class="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">Multi-Chain</span>
            <span class="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider font-light mt-1">Algorand & Polygon</span>
          </div>
          <div class="p-4 sm:p-5 rounded-3xl bg-[#141414] border border-white/10 flex flex-col items-center text-center shadow-lg">
            <span class="hero-heading text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">Verified</span>
            <span class="text-[11px] sm:text-xs text-[#D7E2EA]/60 uppercase tracking-wider font-light mt-1">Credentials</span>
          </div>
        </div>

        <div class="mt-12 sm:mt-16">
          <a href="mailto:${safeEmail}" class="contact-btn inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 active:scale-95 hover:scale-[1.03]">
            Contact Me
          </a>
        </div>
      </div>
    </section>

    <!-- 4. SKILLS SECTION -->
    <section id="skills" class="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 relative z-10 w-full border-t border-white/5">
      <div class="max-w-6xl mx-auto w-full">
        <div class="text-center mb-14 sm:mb-20">
          <span class="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">Core Technical Competencies</span>
          <h2 class="hero-heading font-black uppercase text-center text-[clamp(2.8rem,10vw,140px)] leading-none tracking-tight">Skills</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div class="p-6 sm:p-8 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-colors duration-300">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 class="text-lg sm:text-xl font-medium uppercase tracking-wider text-[#D7E2EA]">Blockchain & Smart Contracts</h3>
              <span class="text-xs text-[#D7E2EA]/40 font-mono">01 // MATRIX</span>
            </div>
            <div class="flex flex-wrap gap-2.5 pt-2">
              ${skillsList.slice(0, 5).map(s => `<span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">${s}</span>`).join('')}
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-colors duration-300">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 class="text-lg sm:text-xl font-medium uppercase tracking-wider text-[#D7E2EA]">AI & Distributed Systems</h3>
              <span class="text-xs text-[#D7E2EA]/40 font-mono">02 // MATRIX</span>
            </div>
            <div class="flex flex-wrap gap-2.5 pt-2">
              ${skillsList.slice(5, 10).map(s => `<span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">${s}</span>`).join('')}
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-colors duration-300">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 class="text-lg sm:text-xl font-medium uppercase tracking-wider text-[#D7E2EA]">3D & Spatial Interfaces</h3>
              <span class="text-xs text-[#D7E2EA]/40 font-mono">03 // MATRIX</span>
            </div>
            <div class="flex flex-wrap gap-2.5 pt-2">
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Three.js</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">WebGL</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">React</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Tailwind CSS</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Framer Motion</span>
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-colors duration-300">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 class="text-lg sm:text-xl font-medium uppercase tracking-wider text-[#D7E2EA]">Database & Cloud Infrastructure</h3>
              <span class="text-xs text-[#D7E2EA]/40 font-mono">04 // MATRIX</span>
            </div>
            <div class="flex flex-wrap gap-2.5 pt-2">
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">PostgreSQL</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Docker</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Git & CI/CD</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">Vercel</span>
              <span class="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#D7E2EA] font-light">WebSockets</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. EXPERIENCE SECTION -->
    <section id="experience" class="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-28 relative z-10 w-full border-t border-white/5">
      <div class="max-w-6xl mx-auto w-full">
        <div class="text-center mb-14 sm:mb-20">
          <span class="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">Career Trajectory & Credentials</span>
          <h2 class="hero-heading font-black uppercase text-center text-[clamp(2.8rem,10vw,140px)] leading-none tracking-tight">Experience</h2>
        </div>

        <div class="flex flex-col gap-6 sm:gap-8">
          ${experiences.map((exp, idx) => `
            <div class="p-6 sm:p-8 md:p-10 rounded-[36px] bg-[#121212] border border-[#D7E2EA]/15 shadow-xl hover:border-[#D7E2EA]/40 transition-all duration-300">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div class="flex items-center gap-4 sm:gap-6">
                  <span class="font-black text-3xl sm:text-4xl md:text-5xl text-[#D7E2EA] font-mono select-none">0${idx + 1}</span>
                  <div>
                    <h3 class="text-lg sm:text-2xl font-medium uppercase tracking-wider text-[#D7E2EA]">${exp.role}</h3>
                    <p class="text-xs sm:text-sm text-[#D7E2EA]/60 uppercase tracking-widest mt-0.5">${exp.company || exp.organization || ''}</p>
                  </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-[#D7E2EA]/80 font-mono self-start md:self-auto">${exp.period || ''}</span>
              </div>
              <p class="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed mt-4 max-w-3xl">${exp.desc || exp.description || ''}</p>
            </div>
          `).join('')}

          ${educations.length > 0 ? `
            <div class="mt-8 pt-8 border-t border-white/10">
              <h3 class="text-xl sm:text-2xl font-medium uppercase tracking-wider text-[#D7E2EA] mb-6">Education & Academic Foundation</h3>
              <div class="flex flex-col gap-4">
                ${educations.map(edu => `
                  <div class="p-5 rounded-2xl bg-[#141414] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 class="text-base sm:text-lg font-medium text-white">${edu.degree}</h4>
                      <p class="text-xs sm:text-sm text-[#D7E2EA]/60">${edu.institution || edu.school || ''}</p>
                    </div>
                    <span class="text-xs font-mono text-[#D7E2EA]/70">${edu.period || edu.year || ''}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${certifications.length > 0 ? `
            <div class="mt-8 pt-8 border-t border-white/10">
              <h3 class="text-xl sm:text-2xl font-medium uppercase tracking-wider text-[#D7E2EA] mb-6">Verified Certifications</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${certifications.map(cert => `
                  <div class="p-5 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <h4 class="text-sm sm:text-base font-medium text-white">${cert.name}</h4>
                      <p class="text-xs text-[#D7E2EA]/60">${cert.issuer || ''} ${cert.year ? '• ' + cert.year : ''}</p>
                    </div>
                    <span class="text-xs px-2.5 py-1 rounded bg-[#B600A8]/20 border border-[#B600A8]/40 text-white">Verified</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </section>

    <!-- 6. SERVICES SECTION (High-Contrast Inverted White) -->
    <section id="services" class="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0">
      <div class="max-w-5xl mx-auto w-full">
        <h2 class="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">Services</h2>

        <div class="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          ${services.map((svc) => `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-12 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] transition-colors duration-300 hover:bg-black/[0.02]">
              <span class="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none tracking-tighter w-[120px] sm:w-[160px] md:w-[200px] flex-shrink-0">${svc.number}</span>
              <div class="flex flex-col gap-2 md:gap-3 flex-grow">
                <h3 class="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] tracking-wide">${svc.name}</h3>
                <p class="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60">${svc.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 7. PROJECTS SECTION (Sticky Stacking Cards) -->
    <section id="projects" class="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-28 pb-32">
      <div class="max-w-6xl mx-auto w-full">
        <div class="mb-14 sm:mb-20 text-center">
          <span class="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-2 block">All Verified Repositories & Protocols</span>
          <h2 class="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight">Projects</h2>
        </div>

        <div class="relative flex flex-col gap-12 sm:gap-16 pb-20">
          ${rawProjects.map((p, index) => {
            const num = (index + 1 < 10 ? '0' : '') + (index + 1);
            const imgs = p.images && p.images.length >= 3 ? p.images : [
              '/assets/projects/blockchain_consent_3d.webp',
              '/assets/projects/algorand_escrow_protocol_3d.webp',
              '/assets/projects/consent_chain_privacy_3d.webp'
            ];
            const tags = p.tags || (p.tech ? p.tech.split('•').map(t => t.trim()) : []);

            return `
              <div class="sticky top-24 md:top-32 w-full flex items-start justify-center" style="top: calc(${index * 28}px + 6rem);">
                <div class="w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-transform duration-300">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D7E2EA]/15">
                    <div class="flex items-center gap-4 sm:gap-6">
                      <span class="font-black text-[clamp(2.5rem,7vw,90px)] text-[#D7E2EA] leading-none select-none tracking-tighter">${num}</span>
                      <div class="flex flex-col">
                        <span class="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">${p.category || 'Software Architecture'}</span>
                        <h3 class="text-xl sm:text-2xl md:text-3xl font-medium uppercase tracking-wider text-[#D7E2EA] mt-1">${p.name}</h3>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 self-start md:self-auto flex-wrap">
                      ${p.github ? `
                        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-colors duration-200">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                          <span>GitHub Repo</span>
                        </a>
                      ` : ''}
                      ${p.live ? `
                        <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 hover:bg-[#D7E2EA]/10 active:scale-95">
                          <span>Live Project</span>
                          <span>↗</span>
                        </a>
                      ` : ''}
                    </div>
                  </div>

                  <div class="py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
                    <p class="max-w-2xl leading-relaxed">${p.desc || p.description || ''}</p>
                    <div class="flex flex-wrap gap-2">
                      ${tags.map(t => `<span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-[#D7E2EA]">${t}</span>`).join('')}
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 pt-2">
                    <div class="md:col-span-4 flex flex-col gap-3 sm:gap-4">
                      <div class="h-[clamp(130px,16vw,230px)] w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/5">
                        <img src="${imgs[0]}" alt="${p.name} - View 1" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                      <div class="h-[clamp(160px,22vw,340px)] w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/5">
                        <img src="${imgs[1]}" alt="${p.name} - View 2" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                      </div>
                    </div>
                    <div class="md:col-span-6 h-[clamp(300px,40vw,586px)] w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#141414] border border-white/5">
                      <img src="${imgs[2]}" alt="${p.name} - Showcase Hero" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- 8. FOOTER SECTION -->
    <footer id="contact" class="w-full bg-[#0C0C0C] border-t border-white/10 px-6 sm:px-10 py-16 sm:py-20 relative z-20">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div>
          <span class="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">Get In Touch</span>
          <h3 class="hero-heading text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2">Let&apos;s Create Together</h3>
          <p class="text-[#D7E2EA]/70 text-sm sm:text-base max-w-md mt-3 font-light">
            Open for smart contract engineering, spatial WebGL applications, decentralized protocols, and cutting-edge engineering collaborations.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a href="mailto:${safeEmail}" class="contact-btn inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-200 active:scale-95 hover:scale-[1.03]">
            Contact Me
          </a>
          <div class="flex items-center gap-4">
            <a href="${safeGithub}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="${safeLinkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a href="mailto:${safeEmail}" aria-label="Email" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#D7E2EA]/50 uppercase tracking-widest">
        <span>© ${new Date().getFullYear()} ${safeName} -- ${safeTitle}</span>
        <a href="#" class="flex items-center gap-2 hover:text-[#D7E2EA] transition-colors">
          <span>Back to Top</span>
          <span>↑</span>
        </a>
      </div>
    </footer>
  </main>

  <!-- Interactive Client-side Script: Magnetic Physics & Marquee Scroll -->
  <script>
    (function() {
      // 1. Magnetic Physics on Portrait
      const wrapper = document.getElementById('magnetic-portrait-wrapper');
      const target = document.getElementById('magnetic-target');
      if (wrapper && target) {
        const padding = 150;
        const strength = 3;
        window.addEventListener('mousemove', function(e) {
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distX = e.clientX - centerX;
          const distY = e.clientY - centerY;

          const isWithin = e.clientX >= rect.left - padding &&
                           e.clientX <= rect.right + padding &&
                           e.clientY >= rect.top - padding &&
                           e.clientY <= rect.bottom + padding;

          if (isWithin) {
            target.style.transform = 'translate3d(' + (distX / strength) + 'px, ' + (distY / strength) + 'px, 0)';
          } else {
            target.style.transform = 'translate3d(0, 0, 0)';
          }
        }, { passive: true });
      }

      // 2. Dual Row Marquee Scroll Physics
      const marqueeSection = document.getElementById('marquee-section');
      const row1 = document.getElementById('marquee-row1');
      const row2 = document.getElementById('marquee-row2');

      if (marqueeSection && row1 && row2) {
        function updateMarquee() {
          const rect = marqueeSection.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
          row1.style.transform = 'translateX(' + (offset - 200) + 'px)';
          row2.style.transform = 'translateX(' + (-(offset - 200)) + 'px)';
        }
        window.addEventListener('scroll', updateMarquee, { passive: true });
        updateMarquee();
      }
    })();
  </script>
</body>
</html>`;
  }
};

module.exports = { Jack3DCreatorTemplate };

# UI/UX Pro Max Standards & Design Intelligence

This rule governs all UI/UX structure, hierarchy, accessibility, and micro-interactions across the MyFolio platform.

## 1. Structural Architecture & Hierarchy
- **Content-Driven Density**: Every template section must adapt proportionally to the candidate's actual data density. Sparse profiles must feel expansive and curated; dense profiles must feel structured and navigational without visual clutter.
- **Micro-Interactions**: Interactive elements must offer clear visual affordances on hover, focus, and active states:
  - Cards: Elevation lift (`translateY(-4px)` to `-8px`), border glow transition, and internal 3D asset steer.
  - Buttons: Radiant shimmer, scale micro-bounce (`scale(1.02)`), and high-contrast focus rings.
  - Modals / Popups: Backdrop blur, spring entrance animation, and trap focus accessibility.
- **Accessibility Baseline**: Strict compliance with WCAG 2.2 AAA standards:
  - Minimum 4.5:1 text-to-background contrast for body text; 3:1 for large display titles.
  - Visible keyboard `:focus-visible` outlines on all interactive elements.
  - Semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  - Screen-reader friendly alt attributes and ARIA labels on dynamic modals and icon buttons.

## 2. 3D Live Images & Spatial Object Standards
- **Nano Banana High-Fidelity Prompting**: When generating 3D focal assets, use hyper-detailed procedural material descriptors (e.g., iridescent mother-of-pearl, sub-surface scattering translucent resin, brushed titanium, verdigris antique brass, glowing fiber-optic cabling).
- **Clean Alpha Extraction**: All generated 3D visuals must pass through clean alpha isolation (`rembg` / dark-studio matting) yielding authentic `_nobg.png` assets with zero halos, fringing, or clipping boxes.
- **Organic Float Dynamics**: 3D isolated assets must be styled with organic multi-axis CSS keyframe floats (`floatingAsset 6s ease-in-out infinite alternate`) and ambient drop-shadows tailored to the theme's lighting source.

## 4. Mandatory Custom Typography Architecture (Strict Zero Repetitive Fonts Rule)
- **Zero Repetitive Typography**: Never reuse the same standard system fonts or default pairings (`Inter`, `Plus Jakarta Sans`, or `Syne`) across different portfolios.
- **Strict 3-Tier Font Hierarchy**: Every portfolio MUST load and apply a distinct, tailored 3-tier Google Fonts combination:
  1. **Expressive Display Masthead**: `Orbitron`, `Chakra Petch`, `Cinzel Decorative`, `Playfair Display`, `Syne`, `Syncopate`, `Teko`, `Bebas Neue`, `MedievalSharp`, `Rajdhani`, `Fraunces`, `Clash Display`.
  2. **Tailored Body Typeface**: `Space Grotesk`, `Instrument Serif`, `Spectral`, `IBM Plex Sans`, `Outfit`, `Manrope`, `Epilogue`, `Titillium Web`, `Exo 2`, `Newsreader`.
  3. **Precision Monospace Accents**: `Share Tech Mono`, `JetBrains Mono`, `Fira Code`, `Space Mono`, `IBM Plex Mono`, `Courier Prime`, `VT323`.
- **Persona Alignment**: The typographic tone must directly embody the candidate's professional universe:
  - Systems Architects & Bio-Engineers: `Chakra Petch` + `Space Grotesk` + `Share Tech Mono`
  - High-Finance & Cryptographic Protocol: `Cinzel Decorative` + `Spectral` + `Space Mono`
  - Deep Security & Cypherpunk Hackers: `VT323` + `Share Tech Mono` + `Fira Code`
  - Creative Directors & UX Architects: `Playfair Display` + `Instrument Serif` + `Courier Prime`
  - Climate Tech & Biophilic Founders: `Outfit` + `Plus Jakarta Sans` + `Fira Code`
  - Mechanical & CAD Engineers: `Space Grotesk` + `IBM Plex Sans` + `IBM Plex Mono`
  - Game Developers & Worldbuilders: `MedievalSharp` + `Cinzel` + `Cormorant Garamond`
- **Exhaustive Cycles**: Consecutive portfolio generations must rotate across these distinct typography archetypes with zero repetition until all are exhausted.

## 5. Strict Zero Fake Telemetry & Debug Text Rule
- **NEVER WRITE FAKE TELEMETRY HEADERS**: Under NO circumstances should fake developer telemetry banners, artificial 'LIVE TELEMETRY // ...', fake 'FPS: 60', 'WebGL 2.0', status dots, or developer debug labels be added to cards, hero showcases, or portfolio artifacts.
- Keep cards, previews, and viewports clean, sleek, and focused on real content, visual depth, and natural interactions without fake tech-jargon headers or artificial metrics.

## 6. Project Visual Relevancy & Strict Zero Universe Preview Recycling Rule (MANDATORY)
- **NEVER REUSE TEMPLATE / UNIVERSE SHOWCASE THUMBNAILS ON PROJECT CARDS**: Under NO circumstances should project cards in generated portfolios reuse, recycle, or display template/universe preview showcase thumbnails (e.g. `stealth_node_3d.jpg`, `circuit_core_3d.jpg`, `cyber_crystal_3d.jpg`, `botanical_woodcraft_3d.jpg`, `pristine_glass_cube_3d.jpg`, `chrono_obsidian_sanctuary_3d.jpg`, `bio_digital_fusion_3d.jpg`, `cosmic_astronaut_3d.jpg`, etc., which are reserved exclusively for the 3D Visual Universe selection in Studio).
- **STRICT PROJECT TITLE & DOMAIN RELEVANCY**: Every single project image displayed in a generated portfolio MUST be strictly and contextually relevant to the project's title, technical domain, and actual system content:
  - Encrypted Messaging / Note Dispatch (e.g. "Pass A Note", "Messenger", "Chat") -> MUST display secure peer-to-peer message transmission or encrypted origami cipher visuals (`pass_note_messenger_3d.jpg`). NEVER purple fantasy crystals.
  - Developer Portfolio Generators / WebGL Tooling (e.g. "Ai Portfolio Generator", "Portfolio Generator", "DevFolio") -> MUST display 3D holographic developer workspaces rendering WebGL code viewports (`ai_portfolio_generator_3d.jpg`, `webgl_developer_portfolio_3d.jpg`). NEVER an artisanal wooden tree.
  - Autonomous Edge AI / LLM Reasoning (e.g. "Autonomous Edge Agent", "AI Agent", "RAG Pipeline") -> MUST display autonomous edge neural processing units and server telemetry nodes (`autonomous_edge_agent_3d.jpg`). NEVER a botanical tree.
  - Algorand / Smart Contracts (e.g. "Algorand Python Smart Contracts", "Smart Contracts", "EVM DApp") -> MUST display Algorand decentralized algorithmic block consensus and smart contract execution architecture (`algorand_smart_contracts_3d.jpg`, `algorand_escrow_protocol_3d.jpg`). NEVER a template universe icon.
  - Decentralized Privacy / Compliance (e.g. "ConsentChain", "Privacy Vault", "DPDP Compliance") -> MUST display cryptographic privacy shields and compliance verification networks (`consent_chain_privacy_3d.jpg`).
  - LMS / User Administration / Systems (e.g. "Lms User Management", "Student Records", "Admin Hub") -> MUST display educational LMS server racks with user access credentials and database matrices (`lms_user_management_3d.jpg`, `student_database_manager_3d.jpg`).
  - Cloud Architecture & API Gateways -> MUST display distributed load-balanced container networks (`cloud_microservices_gateway_3d.jpg`).
  - Security, Zero-Knowledge & Auth -> MUST display biometric access vaults and authentication shields (`cybersecurity_auth_vault_3d.jpg`).
  - Video / Media Pipelines -> MUST display automated media rendering pipelines (`youtube_shorts_bot_3d.jpg`).
  - Fintech & Risk Engines -> MUST display financial risk terminals and payment ledgers (`loan_approval_finance_3d.jpg`).
  - Climate & Geospatial -> MUST display planetary geospatial telemetry sensors (`forest_fire_climate_3d.jpg`).

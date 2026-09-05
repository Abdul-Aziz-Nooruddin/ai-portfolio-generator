# AGENTS.md

## Mandatory Lifetime Frameworks: /web-design, /ui-ux-pro-max, and /agy-customizations

You MUST strictly consult and apply the following three authoritative design and architecture engines **EVERY SINGLE TIME** when generating, deciding, or refining template structures, styling, 3D live visuals, effects, and any unmentioned architectural features:

1. **Template Structure & Section Geometry**:
   - Apply `/web-design` & `/ui-ux-pro-max` principles to break free from cookie-cutter card grids.
   - Use intentional asymmetry, varied modular bento spans, and content-driven density that scales with the candidate's actual profile data.
   - Decouple dedicated error routes (404), interactive modals, and sub-systems from the main single-page scroll flow.

2. **Styling, Color Physics & Typography**:
   - Enforce WCAG 2.2 AAA contrast standards (minimum 4.5:1 text-to-background).
   - Use curated typography scales: expressive display mastheads (`Syne`, `Cinzel Decorative`, `Playfair Display`, `Orbitron`, `Space Grotesk`), ultra-legible body fonts (`Plus Jakarta Sans`, `Inter`, `Spectral`, `IBM Plex Sans`), and precision monospace accents (`JetBrains Mono`, `Fira Code`, `Space Mono`).
   - Anti-AI-slop heuristics: Reject unmotivated purple/blue gradients, centered hero repetition, and arbitrary glassmorphism. Give every surface authentic material weight (brushed titanium, weathered parchment, obsidian stone, frosted nautical glass, or copper traces).

3. **3D Live Images & Procedural Materials**:
   - Extract reference crops and recreate 3D focal assets using high-end Nano Banana prompts with authentic spatial depth and procedural materials (subsurface scattering, brushed titanium, verdigris brass, iridescent mother-of-pearl, holographic glyphs).
   - Process all 3D assets through alpha background removal (`rembg` / dark-studio alpha matting) yielding clean transparent `_nobg.png` assets with zero halos or dark clipping.
   - Implement organic multi-axis CSS floating keyframes and directional ambient drop-shadows tailored to the theme's lighting source.

4. **Motion Choreography, Shaders & Effects**:
   - Use standard cubic-bezier easing (`power2.out`, `power3.inOut`, `cubic-bezier(0.16, 1, 0.3, 1)`) for all scroll triggers and entrance reveals.
   - Ensure contextual justification for Three.js WebGL/WebGPU canvases (e.g. caustics, starfields, cyber-grids, particle trees).
   - Always implement reduced-motion fallbacks (`prefers-reduced-motion: reduce`) by halting canvas render loops and zeroing out rotational transforms.

5. **Architectural Decisions for Unmentioned Features**:
   - Apply `/agy-customizations` to ensure all new templates, components, and rules are immediately codified in `AGENTS.md` and `.agents/rules/`.
   - Never leak dummy/hardcoded fallback data into generated portfolios.
   - Automatically provide interactive micro-affordances: card lift on hover, interactive sonar/detail modals, live telemetry counters, audio toggle triggers, and downloadable resume dossiers.

## Standard Operating Procedure for Template Additions

For **ANY** future template addition or redesign, you MUST strictly follow this mandatory pipeline:

1. **Section Breakdown**:
   - Split the source design/reference into distinct semantic sections (e.g., 01 Hero Stage, 02 About Sonar / Mission, 03 Project Chests / Vaults, 04 Skills Matrix / Tree, 05 Experience Timeline / Nautical Drift, 06 Resume Cartography / Dossier, 07 Articles / Sea Chests, 08 Contact Beacon / Terminal, 09 Dedicated 404 Spatial Monolith, Footer).

2. **3D Asset & Background Identification**:
   - Identify all primary 3D visual focal points (e.g., robotic hands, cyber iris lenses, isometric circuit motherboards, floating glass credentials, low-poly creatures, quantum cores, 3D characters, iridescent nautilus shells, submarine portholes, brass treasure chests, bioluminescent coral trees, giant squids, antique compasses).
   - Identify the background environment (Three.js canvas, particle field, radial space grid, cyber sprawl, underwater ocean caustic mesh).

3. **Asset Extraction & Nano Banana 3D Recreation**:
   - Extract the reference crop/bounding box of the 3D element.
   - Recreate the asset with **Nano Banana** (`generate_image` / high-end 3D spatial prompt) with ultra-high quality, authentic depth, procedural materials (subsurface scattering glass, brushed titanium, glowing neon wiring, holographic glyphs, iridescent mother-of-pearl, antique nautical brass, verdigris moss), and cinematic studio lighting.

4. **Background Removal**:
   - Process all generated 3D images through the clean background removal pipeline (`rembg` / dark-studio alpha matting).
   - Output authentic transparent alpha PNGs (`_nobg.png`) with zero dark halos, clipping, or bounding boxes.
   - Deploy the transparent PNGs to both `public/assets/designs/<theme>/` and `web/assets/designs/<theme>/`.

5. **3D Treasure Chest Multi-Variant Standard**:
   - In oceanic, curio, exploration, and archival templates, **each project card MUST be rendered as an authentic 3D Treasure Chest / Vault**.
   - Cycle through distinct 3D lid/chest variants (`treasure_chest_wheel_nobg.png`, `chest_compass_lid_nobg.png`, `chest_wheel_lid_nobg.png`) across project items so no two adjacent cards look identical.
   - Include authentic physical micro-interactions: rotational steer on hover, subtle chest opening/glow elevation, "Inspect Artifact ↗", and modal "Sonar Scan ✦".

6. **Dedicated 404 Route Decoupling**:
   - **NEVER append the 404 error page to the main single-page scroll layout.**
   - The 404 page is rendered exclusively on 404 HTTP routes via `TemplateRegistry.render404Page(templateId, candidateData)`.
   - The 404 page must feature its own themed 3D center focal asset (e.g. `stone_404_nobg.png` with nautical compass, or `quantum_cube_nobg.png`), themed error typography ("NAUTICAL COURSE LOST // 404"), and a clear "Return to Base" action.

7. **Strict Zero Hardcoded Content Policy**:
   - **NO hardcoded dummy/mock content** may be displayed in generated portfolios.
   - All text, candidate titles, biographies, skill tags, project cards, experience items, education, verified certifications, contact coordinates, and social links MUST dynamically bind to the user's parsed candidate data (`data.name`, `data.title`, `data.bio`, `data.skills`, `data.projects`, `data.experience`, `data.education`, `data.certifications`, `data.contact`).
   - If optional fields are absent, gracefully omit or adapt the section without leaking dummy placeholder text.

---

## Visual Template Model Knowledge Base (Catalog & Persona Matrix)

Antigravity models must draw from this standardized catalog when generating, matching, or styling portfolios:

### 1. Abyssal Nautilus Artisan (`abyssal-nautilus-artisan`)
- **Aesthetic DNA**: Deep ocean abyss, bioluminescent cyber-aquatic artisan, procedural caustics.
- **Color Palette**: Background `#020B14`, Sea Cyan `#0EA5E9`, Biolume Cyan `#00F5D4`, Coral Gold `#F59E0B`, Pearlescent Shell `#F1F5F9`.
- **Typography**: Display `Cinzel Decorative` & `Space Grotesk`, Body `Plus Jakarta Sans`, Mono `JetBrains Mono`.
- **3D Assets**: `nautilus_hand_nobg.png`, `porthole_nobg.png`, `treasure_chest_wheel_nobg.png`, `chest_compass_lid_nobg.png`, `coral_tree_nobg.png`, `squid_nobg.png`, `kelp_tree_nobg.png`, `vintage_map_clean_nobg.png`, `seahorse_nobg.png`, `nautical_compass_nobg.png`, `stone_404_nobg.png`.
- **Key Features**: 3D Treasure Chests on every project card, Submarine porthole radar with concentric range rings, bioluminescent tree of life skills matrix, vintage nautical map cartography with candidate portrait overlay, interactive sand dune blog chests.
- **Recommended For**: Oceanographers, Marine Biotech, AI Environmental Scientists, Full-Stack Artisans, Distributed Systems Architects.

### 2. Cyber-Architect Sprawl (`cyber-architect-sprawl`)
- **Aesthetic DNA**: High-fidelity cyberpunk engineering sprawl, isometric architecture, glowing holographic schematics.
- **Color Palette**: Void `#05050A`, Neon Magenta `#FF007A`, Electric Cyan `#00F0FF`, Circuit Amber `#FFB800`, Grid Slate `#1F293D`.
- **Typography**: Display `Syne` & `Orbitron`, Body `Inter`, Mono `JetBrains Mono`.
- **3D Assets**: `robotic_hand_3d_nobg.png`, `cyber_iris_lens_nobg.png`, `circuit_motherboard_nobg.png`, `quantum_core_3d_nobg.png`.
- **Key Features**: Holographic 3D cyber hand stage, live ping terminal, interactive holographic blueprints, floating credential badges, spatial audio switch.
- **Recommended For**: Systems Architects, DevOps/SRE, Web3 Core Devs, Game Engine Engineers, Cyber Security Specialists.

### 3. Swiss Editorial Monograph (`swiss-editorial-monograph`)
- **Aesthetic DNA**: High-fashion editorial brutalism, strict typographic grid, museum exhibition curation.
- **Color Palette**: Warm Canvas `#F4F3EF`, Editorial Black `#0A0A0A`, Vermilion Accent `#FF3B30`, Muted Stone `#8E8E93`.
- **Typography**: Display `Playfair Display`, Body `Instrument Serif` & `Inter`, Mono `Space Mono`.
- **Key Features**: Asymmetric typographic mastheads, stark high-contrast imagery, archival index cards, tactile scroll progress bar.
- **Recommended For**: Creative Directors, UX Architects, Design Technologists, Editorial Writers, Typographic Designers.

### 4. Solarpunk Horizon (`solarpunk-horizon`)
- **Aesthetic DNA**: Lush utopian ecology, solar-powered clean technology, biophilic stained glass.
- **Color Palette**: Eco Obsidian `#0C1810`, Leaf Emerald `#10B981`, Solar Amber `#F59E0B`, Sky Aqua `#06B6D4`, Sunlight Cream `#FEF3C7`.
- **Typography**: Display `Outfit`, Body `Plus Jakarta Sans`, Mono `Fira Code`.
- **Key Features**: Biophilic foliage animations, floating solar rings, energy telemetry gauges, greenhouse project vitrines.
- **Recommended For**: Climate Tech Engineers, Green Energy Researchers, Biotech Founders, Sustainable AI Pioneers.

### 5. Chrono-Obsidian Sanctuary (`chrono-obsidian-sanctuary`)
- **Aesthetic DNA**: Temporal dark luxury, astronomical timekeeping, obsidian stone with liquid gold.
- **Color Palette**: Obsidian Void `#070709`, Celestial Gold `#D4AF37`, Horizon Azure `#38BDF8`, Starlight White `#F8FAFC`.
- **Typography**: Display `Cinzel`, Body `Inter`, Mono `Space Mono`.
- **Key Features**: Astrolabe gear telemetry, chronological career pendulum, etched gold runes, starlight particles.
- **Recommended For**: AI Researchers, FinTech Quants, Blockchain Protocol Engineers, Luxury Brand Technologists.

### 6. Neon Aurora Cyber (`neon-aurora-cyber`)
- **Aesthetic DNA**: Cyber-minimalist aurora borealis, midnight velvet with flowing wave fields.
- **Color Palette**: Midnight `#0A051B`, Aurora Violet `#8B5CF6`, Cyan Flare `#06B6D4`, Electric Pink `#EC4899`.
- **Typography**: Display `Syncopate`, Body `Plus Jakarta Sans`, Mono `JetBrains Mono`.
- **Recommended For**: Frontend Wizards, Creative Coders, Generative Artists, Interaction Designers.

### 7. Circuit Core (`circuit-core`)
- **Aesthetic DNA**: Industrial hardware engineering, copper PCB traces, dark solder mask, polished brass.
- **Color Palette**: Substrate `#080C0E`, Polished Brass `#D97706`, Trace Teal `#14B8A6`, Soldermask Green `#047857`.
- **Typography**: Display `Chakra Petch`, Body `IBM Plex Sans`, Mono `IBM Plex Mono`.
- **Recommended For**: Embedded Systems, Robotics Engineers, Firmware Developers, IoT Architects.

### 8. Kinetic Brutalism (`kinetic-brutalism`)
- **Aesthetic DNA**: Bold high-contrast zine aesthetic, stark yellow and black, thick neo-brutalist borders.
- **Color Palette**: Acid Yellow `#FDE047`, Ink Black `#09090B`, Clean White `#FFFFFF`, Halftone Red `#EF4444`.
- **Typography**: Display `Syne` (Black 900), Body `Space Grotesk`, Mono `Space Mono`.
- **Recommended For**: Full-Stack Hackers, Indie Hackers, Growth Engineers, High-Energy Founders.

### 9. Stealth Node (`stealth-node`)
- **Aesthetic DNA**: Web3 cypherpunk command line interface, phosphor green CRT phosphor glow, dark telemetry.
- **Color Palette**: Terminal Void `#040D06`, Phosphor Green `#22C55E`, Matrix Mint `#86EFAC`, Signal Amber `#F59E0B`.
- **Typography**: Display `VT323` & `Share Tech Mono`, Body `Fira Code`, Mono `JetBrains Mono`.
- **Recommended For**: Cryptographers, Smart Contract Auditors, Penetration Testers, Security Researchers.

### 10. Abyssal Ascent (`abyssal-ascent`)
- **Aesthetic DNA**: Dark fantasy RPG codex, gilded dungeon stone, runic gold sigils, deep velvet crimson.
- **Color Palette**: Dungeon Ash `#0A080C`, Runic Gold `#EAB308`, Crimson Blood `#991B1B`, Relic Parchment `#E2E8F0`.
- **Typography**: Display `MedievalSharp` / `Cinzel`, Body `Spectral`, Mono `Cormorant Garamond`.
- **Recommended For**: Game Developers, Narrative Designers, Fantasy Illustrators, 3D Worldbuilders.

### 11. Stellar Architect (`stellar-architect`)
- **Aesthetic DNA**: Deep navy celestial blueprint, astronomical coordinates, astrolabe rings, orbital mechanics.
- **Color Palette**: Deep Cosmos `#04091A`, Cyan Blueprint `#38BDF8`, Solar Gold `#FBBF24`, Deep Void `#02040A`.
- **Typography**: Display `Orbitron`, Body `Outfit`, Mono `Space Mono`.
- **Recommended For**: Aerospace Engineers, Data Visualization Scientists, Cloud Infrastructure Engineers.

### 12. Cosmic Cyber Geometry (`cosmic-cyber-geometry`)
- **Aesthetic DNA**: Sacred cyber geometry, prismatic amethyst crystals, floating platonic polyhedra.
- **Color Palette**: Obsidian `#05020C`, Amethyst Prism `#A855F7`, Hologram Cyan `#22D3EE`, Neon Crimson `#F43F5E`.
- **Typography**: Display `Rajdhani`, Body `Inter`, Mono `JetBrains Mono`.
- **Recommended For**: 3D Graphics Engineers, Shader Artists, Computer Vision Engineers.

### 13. Engineering Archive (`engineering-archive`)
- **Aesthetic DNA**: Swiss blueprint technical drafting, millimeter grid paper, cyan cyanotype, crisp registration marks.
- **Color Palette**: Blueprint Blue `#0B2545`, Drafting Cyan `#134074`, Grid White `#EEF4F8`, Signal Orange `#EE6C4D`.
- **Typography**: Display `Space Grotesk`, Body `Inter`, Mono `Space Mono`.
- **Recommended For**: Mechanical Engineers, CAD Specialists, Structural Designers, Precision Engineers.

### 14. System Awakening (`system-awakening`)
- **Aesthetic DNA**: Solo Leveling hunter status window, glowing purple mana runes, quest log telemetry.
- **Color Palette**: Mana Void `#080417`, Hunter Violet `#8B5CF6`, S-Rank Gold `#F59E0B`, Shadow Black `#02010A`.
- **Typography**: Display `Teko` & `Orbitron`, Body `Inter`, Mono `Fira Code`.
- **Recommended For**: Competitive Programmers, Full-Stack Powerhouses, Algorithm Specialists.

### 15. Eco-Tech Steampunk (`eco-tech-steampunk`)
- **Aesthetic DNA**: Hand-turned brass gears, vacuum tubes, mossy copper, warm glowing Edison bulbs.
- **Color Palette**: Dark Walnut `#1A1108`, Antique Brass `#C59B27`, Copper Patina `#2E8B57`, Edison Amber `#FFB703`.
- **Typography**: Display `Cinzel Decorative`, Body `Cinzel`, Mono `Courier Prime`.
- **Recommended For**: Hardware Hackers, Maker Culture, Vintage Enthusiasts, Creative Engineers.

### 16. Cosmic Astronaut Studio (`cosmic-astronaut`)
- **Aesthetic DNA**: Deep interstellar nebula, floating 3D astronaut helmet, zero-gravity orbital dust.
- **Color Palette**: Space Dark `#030712`, Starlight Blue `#38BDF8`, Solar Flare `#F97316`, Nebula Purple `#A855F7`.
- **Typography**: Display `Syne`, Body `Inter`, Mono `JetBrains Mono`.
- **Recommended For**: Explorers, Space Tech, High-Altitude Telemetry, Mission-Driven Founders.

### 17. Cyber Crystal Studio (`cyber-crystal`)
- **Aesthetic DNA**: Prismatic quartz crystals, dark glassmorphism, iridescent refractions.
- **Color Palette**: Dark Obsidian `#0B0F19`, Crystal Ice `#E0F2FE`, Neon Indigo `#6366F1`, Emerald Spark `#10B981`.
- **Typography**: Display `Outfit`, Body `Plus Jakarta Sans`, Mono `JetBrains Mono`.
- **Recommended For**: Product Designers, Web3 Builders, SaaS Founders.

### 18. Bioluminescent Eco-Tech (`bioluminescent-wireframe`)
- **Aesthetic DNA**: Deep ocean neon wireframes, glowing particle networks, underwater bio-intelligence.
- **Color Palette**: Ocean Trench `#020B14`, Neon Mint `#00F5D4`, Deep Blue `#0369A1`, Biolume Green `#4ADE80`.
- **Typography**: Display `Chakra Petch`, Body `Inter`, Mono `Space Mono`.
- **Recommended For**: Data Scientists, Bioinformaticians, Network Engineers.

### 19. Botanical Woodcraft Codex (`botanical-woodcraft`)
- **Aesthetic DNA**: Warm cedar timber, hand-carved leaf veins, organic earth tones, tactile woodwork.
- **Color Palette**: Deep Forest `#0F1A12`, Warm Cedar `#8B5A2B`, Leaf Green `#2D6A4F`, Parchment Gold `#D4A373`.
- **Typography**: Display `Playfair Display`, Body `Plus Jakarta Sans`, Mono `Courier Prime`.
- **Recommended For**: Craft Artisans, Sustainability Advocates, Organic Brands.

### 20. Bio-Digital Circuit Fusion (`bio-digital-fusion`)
- **Aesthetic DNA**: Synaptic neuron tree, glowing cyber DNA helix, electric teal and lime circuits.
- **Color Palette**: Neuro Void `#050D10`, Synapse Teal `#06B6D4`, Neural Lime `#84CC16`, Core White `#F8FAFC`.
- **Typography**: Display `Syne`, Body `Inter`, Mono `JetBrains Mono`.
- **Recommended For**: Neuroscientists, AI Bio-Engineers, Computational Biologists.

### 21. Emerald Cyber Sanctuary (`emerald-cyber-sanctuary`)
- **Aesthetic DNA**: Deep obsidian and neon mint cyber jungle with 3D biodome laboratory.
- **Color Palette**: Obsidian Jungle `#040D08`, Neon Mint `#10B981`, Bio Gold `#F59E0B`, Dark Glass `#0B2014`.
- **Typography**: Display `Plus Jakarta Sans`, Body `Inter`, Mono `Fira Code`.
- **Recommended For**: CleanTech, Environmental AI, Forestry Telemetry.

### 22. Pristine White Crystal (`pristine-white-crystal`)
- **Aesthetic DNA**: Ultra-clean architectural titanium white, floating diamond facets, crisp shadows.
- **Color Palette**: Pure Titanium `#F8FAFC`, Crisp Slate `#0F172A`, Diamond Aqua `#0EA5E9`, Soft Platinum `#E2E8F0`.
- **Typography**: Display `Syne`, Body `Plus Jakarta Sans`, Mono `JetBrains Mono`.
- **Recommended For**: Minimalist Architects, Executive Founders, FinTech Leaders.

### 23. Abyssal Quantum Jellyfish (`abyssal-quantum-jellyfish`)
- **Aesthetic DNA**: Deep oceanic abyss, translucent glowing jellyfish, floating depth particles.
- **Color Palette**: Oceanic Abyss `#010814`, Jellyfish Cyan `#22D3EE`, Quantum Violet `#C084FC`, Deep Navy `#031E38`.
- **Typography**: Display `Cinzel Decorative`, Body `Inter`, Mono `Space Mono`.
- **Recommended For**: Deep Learning Researchers, Marine Scientists, Cloud Architects.

### 24. Mahogany Brass Steampunk (`mahogany-brass-steampunk`)
- **Aesthetic DNA**: Rich dark walnut woodcraft, brass toggle switches, curio cabinet projects.
- **Color Palette**: Dark Walnut `#180E08`, Polished Brass `#D97706`, Curio Green `#166534`, Amber Glass `#F59E0B`.
- **Typography**: Display `Cinzel`, Body `Spectral`, Mono `Courier Prime`.
- **Recommended For**: Hardware Artisans, Antique Collectors, Mechanical Engineers.

### 25. Lavender Cyber Bridge (`lavender-cyber-bridge`)
- **Aesthetic DNA**: Cybernetic command bridge, lavender cyber avatar, crystal icosahedron.
- **Color Palette**: Deep Space `#0B0817`, Hologram Lavender `#C084FC`, Bridge Azure `#38BDF8`, Warp Pink `#F472B6`.
- **Typography**: Display `Orbitron`, Body `Inter`, Mono `JetBrains Mono`.
- **Recommended For**: VR/AR Developers, Metaverse Architects, Creative Technologists.

### 26. Sand Parchment Botanical (`sand-parchment-botanical`)
- **Aesthetic DNA**: Warm sand parchment, pine timber woodcraft, carved botanical rings.
- **Color Palette**: Warm Sand `#F7F4EB`, Pine Bark `#3E2723`, Sage Leaf `#558B2F`, Sun Amber `#FF8F00`.
- **Typography**: Display `Playfair Display`, Body `Plus Jakarta Sans`, Mono `Courier Prime`.
- **Recommended For**: Herbalists, Botanical Researchers, Traditional Craft Makers.

---

## Website Creation Guidelines

When building or scaffolding a website, landing page, portfolio, or web application:
- **Use the `/design` command**: Always trigger `/design` (or the UI/UX design intelligence workflow) before writing markup or code.
- **Figma MCP Integration**: Whenever a user provides a Figma URL or references a Figma design, leverage the Figma MCP / `FigmaService` to extract authentic color tokens, typography scales, vector SVGs, and component structures directly into the frontend.
- **Design System First**: Generate and establish the design system (color palette, typography pairings, spacing scale, UI style, animation tokens, and UX guidelines).
- **Adhere to Tokens**: Build the frontend strictly adhering to the generated design tokens for maximum visual quality and consistency.
- **Non-Repeating Exhaustive Cycles**: When generating portfolios iteratively, cycle through distinct color palettes, typography scales, and 3D WebGL background/foreground objects without repeating any element until all alternatives are exhausted.

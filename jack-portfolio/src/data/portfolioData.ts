export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  col1Image1?: string;
  col1Image2?: string;
  col2Image?: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface ExperienceItem {
  number: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  badge?: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const USER_PROFILE = {
  nickname: "abdul aziz",
  firstName: "Abdul",
  middleName: "Aziz",
  fullName: "Abdul Aziz Nooruddin",
  title: "Full-Stack AI & Smart Contract Engineer",
  tagline: "AI Student & Smart Contract Developer | Building Real-World Web3 Products | Blockchain • DeFi • RegTech 🇮🇳",
  bio: "Computer Science & Artificial Intelligence student actively engineering open-source Web3 protocols, smart contracts on Algorand and Polygon, and immersive 3D developer experiences. Bridging cutting-edge research with shipped software.",
  aboutExtended: "Full-stack engineer and researcher focused on decentralized systems, cryptographic verification, and spatial 3D WebGL interfaces. Architect of ConsentChain Algorand (DPDP Act 2023 compliance with automated micro-payment escrow) and creator of MyFolio. Committed to high-throughput, security-first architectures with zero boilerplate and mathematical precision.",
  email: "abdulaziznoor9876@gmail.com",
  location: "Hyderabad, India • Remote Web3",
  github: "https://github.com/Abdul-Aziz-Nooruddin",
  linkedin: "https://www.linkedin.com/in/abdul-aziz-nooruddin",
  stats: [
    { label: "Shipped Projects", value: "05+" },
    { label: "Real Evidence", value: "100%" },
    { label: "Multi-Chain", value: "Algorand & Polygon" },
    { label: "Verified Credentials", value: "Deloitte & Algorand" },
  ]
};

export interface MarqueeItem {
  src: string;
  title: string;
  tag: string;
}

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { src: "/assets/marquee/smart_contract_dapp_3d.webp", title: "Smart Contract DApps", tag: "WEB3 // ETHERS.JS" },
  { src: "/assets/marquee/threeui_landscape_3d.jpg", title: "Spatial WebGL Landscape", tag: "THREE.JS // 3D VIEWPORT" },
  { src: "/assets/marquee/autonomous_edge_agent_3d.webp", title: "Autonomous Edge AI", tag: "AI // DISTRIBUTED SYSTEMS" },
  { src: "/assets/marquee/cloud_microservices_gateway_3d.webp", title: "Cloud Microservices Gateway", tag: "INFRASTRUCTURE // REST API" },
  { src: "/assets/marquee/cybersecurity_auth_vault_3d.webp", title: "RBAC & Security Vault", tag: "SECURITY // POSTGRESQL" },
  { src: "/assets/marquee/threeui_constellation_3d.jpg", title: "Synaptic Constellation", tag: "SHADERS // NEURAL GRAPH" },
  { src: "/assets/marquee/devops_cicd_pipeline_3d.webp", title: "Automated CI/CD Pipeline", tag: "DEVOPS // DOCKER & GIT" },
  { src: "/assets/marquee/stealth_node_3d.webp", title: "Decentralized Stealth Node", tag: "CONSENSUS // CYPHERPUNK" },
  { src: "/assets/marquee/pristine_glass_cube_workstation_3d.webp", title: "Developer Spatial Console", tag: "DEV STUDIO // TOOLING" },
  { src: "/assets/marquee/circuit_core_3d.webp", title: "Algorithmic State Machines", tag: "PYTEAL // VERIFIABLE LEDGER" },
  { src: "/assets/marquee/threeui_liquid_metal_3d.jpg", title: "Liquid Metal Shaders", tag: "WEBGL // CHROMATIC UI" },
  { src: "/assets/marquee/game_engine_spatial_3d.webp", title: "Physics & Spatial Simulation", tag: "INTERACTIVE // ENGINE" },
  { src: "/assets/marquee/threeui_matrix_3d.jpg", title: "Cyber Matrix Field", tag: "VOLUMETRIC // PARTICLES" },
  { src: "/assets/marquee/engineering_archive_3d.webp", title: "System Architecture Codex", tag: "REGTECH // DPDP ACT" },
  { src: "/assets/marquee/holographic_resume_codex_3d.webp", title: "Evidence Preservation", tag: "VERIFIED CREDENTIALS" },
  { src: "/assets/marquee/spatial_depth_voyage_3d.jpg", title: "P2P Scrollytelling Voyage", tag: "WEBSOCKETS // REAL-TIME" },
  { src: "/assets/marquee/system_awakening_3d.webp", title: "Encrypted Data Transmission", tag: "CRYPTOGRAPHY // P2P" },
  { src: "/assets/marquee/stellar_architect_3d.webp", title: "Distributed Topologies", tag: "ALGORAND // SMART CONTRACTS" },
  { src: "/assets/marquee/neon_aurora_cyber_3d.webp", title: "Cyber Wave Dynamics", tag: "FRONTEND // FRAMER MOTION" },
  { src: "/assets/marquee/cosmic_cyber_geometry_3d.webp", title: "Sacred Cryptographic Math", tag: "ZERO-KNOWLEDGE // CIPHERS" },
  { src: "/assets/marquee/bio_digital_fusion_3d.webp", title: "Protocol Ecosystem Fusion", tag: "POLYGON & ALGORAND" },
];

export const MARQUEE_IMAGES: string[] = MARQUEE_ITEMS.map((item) => item.src);

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Blockchain & Smart Contracts",
    skills: ["Algorand (PyTeal)", "Solidity", "Smart Contracts", "Web3.js & Ethers.js", "Escrow Protocols", "Polygon DeFi", "DPDP Act Compliance"],
  },
  {
    title: "AI & Distributed Systems",
    skills: ["Python", "TypeScript", "Node.js & Express", "Distributed Systems", "RESTful APIs", "Role-Based Access Control", "Micro-payments"],
  },
  {
    title: "3D & Spatial Interfaces",
    skills: ["Three.js", "WebGL", "React 18", "Tailwind CSS", "Framer Motion", "Scrollytelling", "Canvas Shaders"],
  },
  {
    title: "Database & Cloud Infrastructure",
    skills: ["PostgreSQL", "Docker", "Git & CI/CD", "Vercel", "Cryptographic Hashing", "WebSockets P2P"],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    number: "01",
    role: "Web3 & Smart Contract Developer",
    organization: "Independent & Open Source",
    period: "2024 — Present",
    badge: "Active Production",
    description: "Architecting decentralized applications and smart contracts on Algorand and Polygon. Engineered DPDP Act 2023 compliance escrow micro-payment protocols and high-performance WebGL developer tools.",
    skills: ["Algorand", "PyTeal", "TypeScript", "Escrow Protocols", "Smart Contracts"],
  },
  {
    number: "02",
    role: "AI & Software Systems Engineer",
    organization: "Academic & Research Projects",
    period: "2023 — 2024",
    badge: "Core Engineering",
    description: "Designed full-stack architectures, RESTful API services, role-based access control engines, and distributed communication platforms with automated CI/CD deployments.",
    skills: ["Python", "Node.js", "PostgreSQL", "RBAC Security", "Docker"],
  },
  {
    number: "03",
    role: "B.Tech in Computer Science & Artificial Intelligence",
    organization: "Engineering & Technology Institute",
    period: "2022 — 2026 (Expected)",
    badge: "Degree Candidate",
    description: "Specialized coursework in Distributed Systems, Blockchain Architecture, Cryptography, Artificial Intelligence, and Modern Software Engineering.",
    skills: ["Distributed Computing", "Cryptography", "Algorithms", "AI Systems"],
  },
];

export const CERTIFICATIONS_DATA = [
  {
    name: "Algorand Certified Developer",
    issuer: "Algorand Foundation Ecosystem",
    badge: "Verified Credential",
    link: "https://algorand.foundation",
  },
  {
    name: "Deloitte Cyber Job Simulation Certificate",
    issuer: "Deloitte (Forage)",
    badge: "Verified Credential",
    link: "https://www.forage.com",
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    name: "Smart Contract Engineering",
    description: "Production PyTeal and Solidity smart contract implementations for Algorand and EVM escrow, token distribution, and verifiable state transitions.",
  },
  {
    number: "02",
    name: "Full-Stack AI Systems",
    description: "Designing end-to-end intelligent software architectures, Python/Node.js microservices, and high-performance database pipelines.",
  },
  {
    number: "03",
    name: "3D WebGL Experiences",
    description: "Building immersive spatial viewports, interactive 3D WebGL canvases, and smooth scrollytelling web applications.",
  },
  {
    number: "04",
    name: "RegTech & Escrow Protocols",
    description: "Crafting decentralized consent management solutions and automated escrow micro-payment systems compliant with data privacy regulations.",
  },
  {
    number: "05",
    name: "Decentralized P2P Protocols",
    description: "Engineering zero-latency peer data transfer protocols, cryptographic communication layers, and WebSocket real-time networks.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "consentchain-algorand",
    number: "01",
    name: "ConsentChain Algorand",
    category: "Blockchain // RegTech & Escrow Protocol",
    description: "A decentralized Consent Management application powered by the Algorand blockchain, enabling DPDP Act 2023 compliance with an escrow-based data micro-payment system.",
    tech: ["Algorand", "PyTeal", "TypeScript", "Smart Contracts", "RegTech"],
    liveUrl: "https://consent-chain-algorand.vercel.app",
    githubUrl: "https://github.com/Abdul-Aziz-Nooruddin/ConsentChain-Algorand",
    image: "/assets/projects/consent_chain_privacy_3d.webp",
  },
  {
    id: "ai-portfolio-generator",
    number: "02",
    name: "AI Portfolio Generator",
    category: "Open Source // WebGL Spatial Studio",
    description: "Turn GitHub repositories & resumes into bespoke 3D WebGL developer portfolios with real evidence preservation and spatial depth.",
    tech: ["Three.js", "WebGL", "TypeScript", "Node.js", "AI Pipeline"],
    liveUrl: "https://myfolio.tech",
    githubUrl: "https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator",
    image: "/assets/projects/ai_portfolio_generator_3d.webp",
  },
  {
    id: "pass-a-note",
    number: "03",
    name: "Pass A Note",
    category: "Peer-to-Peer Protocol // Encrypted Messaging",
    description: "High-performance interactive communication tool engineered for seamless zero-latency peer data transfer with secure encrypted messaging.",
    tech: ["HTML5", "JavaScript", "WebSockets", "Cryptography", "P2P"],
    liveUrl: "https://pass-a-note-iota.vercel.app",
    githubUrl: "https://github.com/Abdul-Aziz-Nooruddin/pass-a-note",
    image: "/assets/projects/pass_note_messenger_3d.webp",
  },
  {
    id: "lms-user-management",
    number: "04",
    name: "LMS User Management",
    category: "Enterprise RBAC // Identity & Security Hub",
    description: "Enterprise-grade role-based access control and user management system engineered with strict security guarantees and database integrity.",
    tech: ["Node.js", "Express", "PostgreSQL", "RBAC", "Security"],
    liveUrl: "https://github.com/Abdul-Aziz-Nooruddin/lms-user-management",
    githubUrl: "https://github.com/Abdul-Aziz-Nooruddin/lms-user-management",
    image: "/assets/projects/student_database_manager_3d.webp",
  },
  {
    id: "algorand-python-smart-contracts",
    number: "05",
    name: "Algorand Python Smart Contracts",
    category: "Stateful Algorithmic Ledger // PyTeal",
    description: "Production PyTeal and Python smart contract implementations for Algorand escrow, token distribution, and verifiable state transitions.",
    tech: ["Python", "Algorand", "PyTeal", "Smart Contracts", "Blockchain"],
    liveUrl: "https://github.com/Abdul-Aziz-Nooruddin/Algorand-Python-Smart-Contracts",
    githubUrl: "https://github.com/Abdul-Aziz-Nooruddin/Algorand-Python-Smart-Contracts",
    image: "/assets/projects/algorand_smart_contracts_3d.webp",
  },
];

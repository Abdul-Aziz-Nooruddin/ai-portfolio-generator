/**
 * 🍌 Nano Banana 3D Spatial Visual Synthesis Engine
 * Generates bespoke 3D spatial assets, interactive WebGL physics meshes,
 * and isometric domain artifacts tailored to user engineering and design personas.
 *
 * Employs the structured Nano Banana prompting formula:
 * [SUBJECT] + [SPATIAL ACTION] + [3D ISOMETRIC / WEBGL SPECIFICATION] + [ART DIRECTION & LIGHTING CONTEXT]
 */

class NanoBanana3DGenerator {
  /**
   * Synthesizes 3D spatial visual assets and interactive WebGL shaders for a user profile
   * @param {Object} profile - User profile data (name, role, skills, projects, theme)
   * @param {Object} options - Customization options
   * @returns {Object} 3D spatial asset specification with WebGL code & SVG fallbacks
   */
  static generateSpatialAssets(profile = {}, options = {}) {
    const role = (profile.role || profile.bio || 'Software Engineer').toLowerCase();
    const skills = Array.isArray(profile.skills) ? profile.skills : [];
    const skillsStr = skills.join(', ').toLowerCase();

    // 1. Determine Archetype Spatial Domain
    let archetype = 'systems';
    if (/ai|machine learning|deep learning|research|scientist|neural|nlp|cv|llm/i.test(role + skillsStr)) {
      archetype = 'ai-research';
    } else if (/design|creative|art|visual|3d|frontend|ui|ux|product designer/i.test(role + skillsStr)) {
      archetype = 'creative-design';
    } else if (/security|cryptography|reverse|penetration|auth/i.test(role + skillsStr)) {
      archetype = 'cybersecurity';
    } else if (/cloud|devops|infrastructure|kubernetes|distributed|backend|storage|database/i.test(role + skillsStr)) {
      archetype = 'distributed-systems';
    }

    // 2. Build Structured Nano Banana Prompt & Spatial Descriptors
    const spatialConfigs = {
      'ai-research': {
        subject: 'Interconnected neural tensor lattice and glowing multidimensional floating matrices',
        action: 'pulsing with latent space vector weights and gradient descent flow lines',
        material: 'iridescent frosted glass spheres, sub-surface scattering cyan and lavender neon filaments',
        lighting: 'volumetric rim light, soft indigo studio ambient glow, dark navy contrast',
        geometryType: 'NeuralLattice',
        primaryColor: '#818CF8',
        accentColor: '#38BDF8',
        lightBg: 'rgba(129, 140, 248, 0.15)'
      },
      'creative-design': {
        subject: 'Cluster of glossy sculptural geometric capsules, torus rings, and wavy fluid cylinders',
        action: 'suspended in zero-gravity with dynamic spatial parallax rotation',
        material: 'high-refraction crystal glass, chrome metalness, vivid electric cobalt and violet glaze',
        lighting: 'dramatic key lighting, soft caustic reflections, warm violet highlights',
        geometryType: 'SculpturalCluster',
        primaryColor: '#3B33D1',
        accentColor: '#EC4899',
        lightBg: 'rgba(59, 51, 209, 0.12)'
      },
      'cybersecurity': {
        subject: 'Hexagonal cryptographic shield matrices and floating encrypted telemetry prisms',
        action: 'verifying zero-knowledge proofs with radiating scanning laser rings',
        material: 'smoked obsidian glass, emerald neon traces, brushed titanium frames',
        lighting: 'deep midnight black contrast, high-intensity green and cyan edge highlights',
        geometryType: 'CryptoShield',
        primaryColor: '#10B981',
        accentColor: '#06B6D4',
        lightBg: 'rgba(16, 185, 129, 0.12)'
      },
      'distributed-systems': {
        subject: 'Modular low-latency consensus nodes and interconnected Raft cluster cubes',
        action: 'synchronizing zero-copy memory pipelines across distributed mesh orbits',
        material: 'semi-transparent sapphire glass blocks, copper trace conduits, matte slate bases',
        lighting: 'precision technical illumination, royal blue ambient wash, cool white highlights',
        geometryType: 'ConsensusNodes',
        primaryColor: '#3B82F6',
        accentColor: '#6366F1',
        lightBg: 'rgba(59, 130, 246, 0.12)'
      },
      'systems': {
        subject: 'Abstract dynamic 3D polyhedral core with orbiting data rings and floating glyphs',
        action: 'gently oscillating with smooth physics-based inertia and micro-rotations',
        material: 'frosted borosilicate glass, electric indigo glow, metallic accents',
        lighting: 'studio balanced ambient light with directional soft shadows',
        geometryType: 'PolyhedralCore',
        primaryColor: '#4F46E5',
        accentColor: '#0284C7',
        lightBg: 'rgba(79, 70, 229, 0.12)'
      }
    };

    const config = spatialConfigs[archetype] || spatialConfigs['systems'];
    const nanoBananaPrompt = `3D digital spatial asset: ${config.subject}, ${config.action}. Rendered in ${config.material}. Lighting: ${config.lighting}. Octane render style, 8k resolution, ultra-clean presentation.`;

    // 3. Generate Interactive Three.js WebGL Interactive Scene Code
    const webglCode = this.generateWebGLSceneCode(config, profile);

    // 4. Generate SVG 3D Isometric Fallback for Offline / Reduced Motion
    const svgFallback = this.generateSvgIsometricFallback(config);

    return {
      success: true,
      archetype,
      nanoBananaPrompt,
      geometryType: config.geometryType,
      primaryColor: config.primaryColor,
      accentColor: config.accentColor,
      webglCode,
      svgFallback,
      badgeLabel: `✨ Nano Banana 3D • ${config.geometryType}`
    };
  }

  /**
   * Generates production-ready Three.js WebGL script string for embedding in user portfolios
   */
  static generateWebGLSceneCode(config, profile) {
    const primaryHex = config.primaryColor.replace('#', '0x');
    const accentHex = config.accentColor.replace('#', '0x');
    const safeSkills = Array.isArray(profile.skills) ? profile.skills.slice(0, 6) : ['React', 'Python', 'TypeScript', 'Node.js', 'Next.js', 'AI / ML'];
    const skillsJson = JSON.stringify(safeSkills);
    const photoUrl = profile.photoUrl || profile.photo || '';
    const hasPhoto = Boolean(photoUrl && photoUrl.trim().length > 0);

    return `
    // 🍌 Nano Banana 3D Spatial Engine (${config.geometryType} • Character & Spatial Physics)
    (function initNanoBanana3D() {
      if (typeof THREE === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const container = document.getElementById('nano-banana-3d-stage') || document.getElementById('webgl-canvas-container');
      if (!container) return;

      // Hide SVG fallback upon Three.js initialization
      const svgFallback = container.querySelector('.nano-banana-svg-3d');
      if (svgFallback) svgFallback.style.display = 'none';

      const stageWidth = container.clientWidth || 600;
      const stageHeight = container.clientHeight || 320;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, stageWidth / stageHeight, 0.1, 1000);
      camera.position.set(0, 1.2, 16);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(stageWidth, stageHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.appendChild(renderer.domElement);

      // Lighting & Volumetric Studio Setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(6, 12, 10);
      scene.add(keyLight);

      const pointLight1 = new THREE.PointLight(${primaryHex}, 3.0, 40);
      pointLight1.position.set(8, 6, 8);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(${accentHex}, 2.5, 40);
      pointLight2.position.set(-8, -4, 8);
      scene.add(pointLight2);

      // Master Character & Spatial Container Group
      const masterGroup = new THREE.Group();
      scene.add(masterGroup);

      // Holographic Stage Platform / Floor Grid
      const platformGeo = new THREE.CylinderGeometry(5.5, 6.0, 0.3, 32);
      const platformMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.2,
        metalness: 0.85,
        wireframe: false
      });
      const platform = new THREE.Mesh(platformGeo, platformMat);
      platform.position.y = -3.8;
      masterGroup.add(platform);

      // Glowing Holographic Floor Ring
      const ringGeo = new THREE.TorusGeometry(5.8, 0.08, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: ${primaryHex}, transparent: true, opacity: 0.85 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -3.7;
      masterGroup.add(ringMesh);

      // Main Character Anchor
      const characterAnchor = new THREE.Group();
      masterGroup.add(characterAnchor);

      const hasCustomPhoto = ${hasPhoto};
      const customPhotoSrc = "${photoUrl ? photoUrl.replace(/"/g, '\\"') : ''}";

      if (hasCustomPhoto && customPhotoSrc) {
        // --- MODE A: 3D HOLOGRAPHIC PERSONA SCULPTURE ---
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(customPhotoSrc, (tex) => {
          tex.generateMipmaps = true;
          const photoGeo = new THREE.PlaneGeometry(4.2, 5.2, 16, 16);
          const photoMat = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.3,
            metalness: 0.1,
            side: THREE.DoubleSide
          });
          const photoMesh = new THREE.Mesh(photoGeo, photoMat);
          photoMesh.position.set(0, 0.4, 0);
          characterAnchor.add(photoMesh);

          // Glass Hologram Backing Plate
          const backGeo = new THREE.BoxGeometry(4.4, 5.4, 0.2);
          const backMat = new THREE.MeshPhysicalMaterial({
            color: ${primaryHex},
            transparent: true,
            opacity: 0.35,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5
          });
          const backMesh = new THREE.Mesh(backGeo, backMat);
          backMesh.position.set(0, 0.4, -0.15);
          characterAnchor.add(backMesh);

          // Neon Border Frame
          const borderGeo = new THREE.BoxGeometry(4.5, 5.5, 0.25);
          const borderMat = new THREE.MeshBasicMaterial({ color: ${accentHex}, wireframe: true, transparent: true, opacity: 0.75 });
          const borderMesh = new THREE.Mesh(borderGeo, borderMat);
          borderMesh.position.set(0, 0.4, 0);
          characterAnchor.add(borderMesh);
        });
      } else {
        // --- MODE B: INTERACTIVE 3D HUMAN DEVELOPER CHARACTER MODEL ---
        // 1. Torso / Developer Hoodie
        const torsoGeo = new THREE.CylinderGeometry(1.6, 2.0, 3.4, 20);
        const torsoMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35, metalness: 0.4 });
        const torso = new THREE.Mesh(torsoGeo, torsoMat);
        torso.position.set(0, -0.6, 0);
        characterAnchor.add(torso);

        // Hoodie Zipper / Cybernetic Trim
        const trimGeo = new THREE.BoxGeometry(0.12, 3.3, 0.2);
        const trimMat = new THREE.MeshBasicMaterial({ color: ${primaryHex} });
        const trim = new THREE.Mesh(trimGeo, trimMat);
        trim.position.set(0, -0.6, 1.05);
        characterAnchor.add(trim);

        // 2. Chest Cyber Reactor Core
        const coreGeo = new THREE.OctahedronGeometry(0.45, 0);
        const coreMat = new THREE.MeshBasicMaterial({ color: ${accentHex} });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(0, 0.2, 1.0);
        characterAnchor.add(core);

        // 3. Shoulders and Stylized Arms
        const shoulderGeo = new THREE.SphereGeometry(0.65, 16, 16);
        const shoulderL = new THREE.Mesh(shoulderGeo, torsoMat);
        shoulderL.position.set(-2.0, 0.6, 0);
        characterAnchor.add(shoulderL);

        const shoulderR = new THREE.Mesh(shoulderGeo, torsoMat);
        shoulderR.position.set(2.0, 0.6, 0);
        characterAnchor.add(shoulderR);

        const armGeo = new THREE.CylinderGeometry(0.5, 0.45, 2.2, 16);
        const armL = new THREE.Mesh(armGeo, torsoMat);
        armL.position.set(-2.1, -0.6, 0.4);
        armL.rotation.z = Math.PI / 10;
        armL.rotation.x = Math.PI / 8;
        characterAnchor.add(armL);

        const armR = new THREE.Mesh(armGeo, torsoMat);
        armR.position.set(2.1, -0.6, 0.4);
        armR.rotation.z = -Math.PI / 10;
        armR.rotation.x = Math.PI / 8;
        characterAnchor.add(armR);

        // 4. Head Group (Tracks Cursor with Look-At)
        const headGroup = new THREE.Group();
        headGroup.position.set(0, 2.2, 0);
        characterAnchor.add(headGroup);

        const headGeo = new THREE.SphereGeometry(1.2, 32, 32);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.3 });
        const head = new THREE.Mesh(headGeo, headMat);
        headGroup.add(head);

        // Cybernetic Visor / Glasses
        const visorGeo = new THREE.BoxGeometry(1.6, 0.45, 0.7);
        const visorMat = new THREE.MeshStandardMaterial({
          color: ${accentHex},
          emissive: ${accentHex},
          emissiveIntensity: 0.9,
          roughness: 0.1,
          metalness: 0.9
        });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 0.15, 0.95);
        headGroup.add(visor);

        // Developer Tech Headset
        const bandGeo = new THREE.TorusGeometry(1.3, 0.1, 12, 32, Math.PI);
        const bandMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.rotation.x = -Math.PI / 2;
        band.position.set(0, 0.5, 0);
        headGroup.add(band);

        const cupGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
        const cupL = new THREE.Mesh(cupGeo, trimMat);
        cupL.rotation.z = Math.PI / 2;
        cupL.position.set(-1.3, 0.1, 0);
        headGroup.add(cupL);

        const cupR = new THREE.Mesh(cupGeo, trimMat);
        cupR.rotation.z = Math.PI / 2;
        cupR.position.set(1.3, 0.1, 0);
        headGroup.add(cupR);
      }

      // --- FLOATING 3D SKILL BADGE BILLBOARDS ---
      const skills = ${skillsJson};
      const skillMeshes = [];

      function createSkillBadgeTexture(text) {
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 80;
        const ctx = c.getContext('2d');
        
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.roundRect ? ctx.roundRect(8, 8, 240, 64, 16) : ctx.rect(8, 8, 240, 64);
        ctx.fill();

        ctx.strokeStyle = "${config.accentColor}";
        ctx.lineWidth = 4;
        ctx.roundRect ? ctx.roundRect(8, 8, 240, 64, 16) : ctx.strokeRect(8, 8, 240, 64);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 40);

        const tex = new THREE.CanvasTexture(c);
        tex.minFilter = THREE.LinearFilter;
        return tex;
      }

      skills.forEach((skillName, idx) => {
        const badgeTex = createSkillBadgeTexture(skillName);
        const badgeMat = new THREE.SpriteMaterial({ map: badgeTex, transparent: true, opacity: 0.95 });
        const sprite = new THREE.Sprite(badgeMat);
        sprite.scale.set(3.2, 1.0, 1.0);

        const angle = (idx / skills.length) * Math.PI * 2;
        const radius = 4.8;
        const height = (idx % 2 === 0 ? 1.5 : -0.5) + (Math.sin(idx) * 0.8);
        sprite.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
        masterGroup.add(sprite);

        skillMeshes.push({ sprite, angle, radius, height, speed: 0.008 + idx * 0.002 });
      });

      // --- MOUSE CURSOR TRACKING (LOOK-AT PHYSICS) ---
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;

      window.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotY = mouseX * 0.45;
        targetRotX = -mouseY * 0.35;
      });

      // --- SCROLL DYNAMICS ---
      let scrollProgress = 0;
      window.addEventListener('scroll', () => {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollProgress = window.scrollY / maxScroll;
      });

      // --- RENDER LOOP ---
      const clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Cursor Look-At Interpolation with Spring Damping
        characterAnchor.rotation.y += (targetRotY - characterAnchor.rotation.y) * 0.06;
        characterAnchor.rotation.x += (targetRotX - characterAnchor.rotation.x) * 0.06;

        // Subtle Idle Breathing
        characterAnchor.position.y = Math.sin(elapsed * 1.8) * 0.08;

        // Scroll-Driven Multi-Axis Rotation and Scale
        masterGroup.rotation.y = scrollProgress * Math.PI * 1.2;
        masterGroup.position.z = Math.sin(scrollProgress * Math.PI) * 1.5;

        // Orbital Skill Billboards Animation
        skillMeshes.forEach(s => {
          s.angle += s.speed;
          s.sprite.position.x = Math.cos(s.angle) * s.radius;
          s.sprite.position.z = Math.sin(s.angle) * s.radius;
          s.sprite.position.y = s.height + Math.sin(elapsed * 2.0 + s.angle) * 0.25;
        });

        // Floor Ring Pulse
        ringMesh.rotation.z += 0.005;

        renderer.render(scene, camera);
      }
      animate();

      // Responsive Resize
      window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 320;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    })();
    `;
  }

  /**
   * 🍌 Synthesizes a live, interactive 3D visual card tailored to any project's exact title & description
   * @param {Object} project { name, desc, tech, category }
   * @param {string} theme Template visual universe theme
   * @returns {string} Interactive 3D HTML/SVG markup with dynamic hover triggers and 3D depth physics
   */
  static synthesizeProjectVisual(project = {}, theme = 'cosmic-astronaut') {
    const nameText = (project.name || '').toLowerCase();
    const descText = (project.desc || project.description || '').toLowerCase();
    const techText = (project.tech || '').toLowerCase();
    const coreText = `${nameText} ${descText} ${techText}`.toLowerCase();
    const fullText = `${coreText} ${project.category || ''}`.toLowerCase();
    
    const hasCore = (regex) => new RegExp(regex, 'i').test(coreText);
    const hasFull = (regex) => new RegExp(regex, 'i').test(fullText);

    // Dynamic Archetype Classification from Title & Description
    let domain = 'developer-core';
    let label = '3D ARCHITECTURAL SYSTEM PRISM';
    let icon = '⚡';
    let primary = '#818cf8';
    let secondary = '#38bdf8';
    // 1. Blockchain, Web3, Smart Contracts & Consent Management
    if (hasCore('\\b(consent|algorand|blockchain|solidity|contract|polygon|web3|crypto|ledger|dpdp|token|dapp|nft|dao)\\b')) {
      domain = 'crypto-ledger';
      label = '3D DECENTRALIZED PROTOCOL & CONSENT VAULT';
      icon = '⛓️';
      primary = '#00f2fe';
      secondary = '#4facfe';
      accent = '#10b981';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- Interlocking 3D Cryptographic Polyhedrons -->
          <polygon points="-30,-30 0,-45 30,-30 0,-15" fill="${primary}" opacity="0.85" />
          <polygon points="30,-30 30,10 0,25 0,-15" fill="${secondary}" opacity="0.75" />
          <polygon points="-30,-30 0,-15 0,25 -30,10" fill="#0284c7" opacity="0.7" />
          <!-- Encrypted Proof Links -->
          <line x1="0" y1="-15" x2="0" y2="45" stroke="${accent}" stroke-width="3" stroke-dasharray="4 2" />
          <circle cx="0" cy="45" r="8" fill="${accent}" />
          <ellipse cx="0" cy="-5" rx="60" ry="24" fill="none" stroke="${primary}" stroke-width="1" opacity="0.6" transform="rotate(-20)" />
        </g>
      `;
    } else if (hasCore('\\b(youtube|video|shorts|reel|stream|film|movie|media|ffmpeg|audiovisual)\\b')) {
      domain = 'media-engine';
      label = '3D AUTOMATED MEDIA PIPELINE';
      icon = '🎬';
      primary = '#ef4444';
      secondary = '#f59e0b';
      accent = '#8b5cf6';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Floating Video Camera & Film Prism -->
          <polygon points="-40,-30 10,-30 30,-10 -20,-10" fill="${primary}" opacity="0.85" />
          <polygon points="10,-30 40,-15 40,25 10,10" fill="${secondary}" opacity="0.75" />
          <polygon points="-40,-30 10,10 10,50 -40,10" fill="#991b1b" opacity="0.8" />
          <!-- Camera Lens Iris -->
          <circle cx="-15" cy="-10" r="18" fill="#0f172a" stroke="${secondary}" stroke-width="2" />
          <circle cx="-15" cy="-10" r="8" fill="${accent}" />
          <!-- Play Vector -->
          <polygon points="-18,-15 -10,-10 -18,-5" fill="#ffffff" />
          <!-- Orbiting Film Frame Track -->
          <ellipse cx="0" cy="0" rx="65" ry="25" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.6" transform="rotate(15)" />
        </g>
      `;
    } else if (hasCore('\\b(ai|ml|neural|deep learning|scikit|machine learning|model|classifier|predict|tensor|vision|nlp|intelligence|pandas|jupyter|llm|gpt)\\b')) {
      domain = 'ai-neural-core';
      label = '3D NEURAL COGNITIVE MATRIX';
      icon = '🧠';
      primary = '#818cf8';
      secondary = '#c084fc';
      accent = '#38bdf8';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Neural Tensor Octahedron -->
          <polygon points="0,-42 35,-18 0,6 -35,-18" fill="${primary}" opacity="0.9" />
          <polygon points="35,-18 35,22 0,46 0,6" fill="${secondary}" opacity="0.75" />
          <polygon points="-35,-18 0,6 0,46 -35,22" fill="#4338ca" opacity="0.7" />
          <!-- Neural Synaptic Lattice -->
          <circle cx="-45" cy="-20" r="5" fill="${accent}" />
          <circle cx="45" cy="-20" r="5" fill="${accent}" />
          <circle cx="-25" cy="35" r="4" fill="${primary}" />
          <circle cx="25" cy="35" r="4" fill="${primary}" />
          <line x1="0" y1="-42" x2="-45" y2="-20" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 2" />
          <line x1="0" y1="-42" x2="45" y2="-20" stroke="${accent}" stroke-width="1.5" stroke-dasharray="3 2" />
          <ellipse cx="0" cy="0" rx="65" ry="24" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.5" transform="rotate(25)" />
        </g>
      `;
    } else if (hasCore('\\b(student|database|management|sql|postgres|mongodb|mysql|sqlite|crud|backend|server|admin|spring boot|django|fastapi)\\b')) {
      domain = 'database-codex';
      label = '3D SECURE DATA CODEX & ENGINE';
      icon = '🗄️';
      primary = '#3b82f6';
      secondary = '#10b981';
      accent = '#f59e0b';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Database Cylinder Stack -->
          <ellipse cx="0" cy="-30" rx="45" ry="14" fill="${primary}" opacity="0.85" />
          <ellipse cx="0" cy="-10" rx="45" ry="14" fill="${secondary}" opacity="0.8" />
          <ellipse cx="0" cy="10" rx="45" ry="14" fill="${accent}" opacity="0.75" />
          <ellipse cx="0" cy="30" rx="45" ry="14" fill="${primary}" opacity="0.9" />
          <ellipse cx="0" cy="0" rx="65" ry="22" fill="none" stroke="${secondary}" stroke-width="1.5" opacity="0.6" transform="rotate(-15)" />
        </g>
      `;
    } else if (hasCore('\\b(finance|loan|credit|bank|trading|stock|investment|fintech|payment|risk|fraud)\\b')) {
      domain = 'finance-analytics';
      label = '3D FINANCIAL ANALYTICS MATRIX';
      icon = '📈';
      primary = '#10b981';
      secondary = '#38bdf8';
      accent = '#f59e0b';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Financial Bar Graph & Trend Axis -->
          <polygon points="-40,30 -25,10 -25,30 -40,40" fill="${primary}" opacity="0.85" />
          <polygon points="-15,30 0,-15 0,30 -15,40" fill="${secondary}" opacity="0.85" />
          <polygon points="10,30 25,-35 25,30 10,40" fill="${accent}" opacity="0.9" />
          <line x1="-45" y1="20" x2="35" y2="-40" stroke="#ffffff" stroke-width="2.5" />
          <circle cx="35" cy="-40" r="5" fill="${accent}" />
        </g>
      `;
    } else if (hasCore('\\b(climate|forest|fire|wildfire|nature|weather|earth|green|solar|sustainability|geospatial)\\b')) {
      domain = 'geospatial-climate';
      label = '3D GEOSPATIAL CLIMATE MATRIX';
      icon = '🌍';
      primary = '#f59e0b';
      secondary = '#10b981';
      accent = '#ef4444';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Globe with Orbital Climate Ring -->
          <circle cx="0" cy="0" r="38" fill="rgba(16, 185, 129, 0.25)" stroke="${secondary}" stroke-width="2" />
          <ellipse cx="0" cy="0" rx="58" ry="18" fill="none" stroke="${primary}" stroke-width="1.8" transform="rotate(-25)" />
          <circle cx="45" cy="-18" r="5" fill="${accent}" />
        </g>
      `;
    } else if (hasCore('\\b(profile|portfolio|central|repository|workspace|dotfiles|config|developer|source|showcase|cv|resume)\\b')) {
      domain = 'developer-core';
      label = '3D HOLOGRAPHIC CAREER CODEX';
      icon = '💎';
      primary = '#a855f7';
      secondary = '#38bdf8';
      accent = '#f43f5e';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <!-- 3D Polyhedral Core Workspace -->
          <polygon points="0,-40 38,-18 0,4 -38,-18" fill="${primary}" opacity="0.85" />
          <polygon points="38,-18 38,24 0,46 0,4" fill="${secondary}" opacity="0.75" />
          <polygon points="-38,-18 0,4 0,46 -38,24" fill="#581c87" opacity="0.7" />
          <!-- Orbiting Satellite Modules -->
          <ellipse cx="0" cy="4" rx="66" ry="24" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.6" transform="rotate(-20)" />
          <circle cx="-50" cy="18" r="4.5" fill="${primary}" />
          <circle cx="48" cy="-18" r="4.5" fill="${secondary}" />
        </g>
      `;
    } else if (hasCore('\\b(user management|auth|authentication|jwt|rbac|login|signup|identity|security|iam|cipher)\\b')) {
      domain = 'user-auth-security';
      label = '3D IDENTITY & ACCESS SECURITY SHIELD';
      icon = '🛡️';
      primary = '#10b981';
      secondary = '#38bdf8';
      accent = '#f59e0b';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <path d="M0,-45 C25,-40 40,-35 40,-15 C40,25 20,45 0,55 C-20,45 -40,25 -40,-15 C-40,-35 -25,-40 0,-45 Z" fill="rgba(16, 185, 129, 0.25)" stroke="${primary}" stroke-width="2.5" />
          <circle cx="0" cy="-10" r="11" fill="${secondary}" />
          <path d="M-18,18 C-18,6 18,6 18,18 Z" fill="${secondary}" opacity="0.85" />
          <circle cx="0" cy="-10" r="18" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 3" />
        </g>
      `;
    } else if (hasCore('\\b(game|games|arcade|gaming|unity|unreal|play|canvas game|physics engine|sprite|retro)\\b')) {
      domain = 'game-arcade';
      label = '3D KINETIC GAME PHYSICS ENGINE';
      icon = '🎮';
      primary = '#ec4899';
      secondary = '#a855f7';
      accent = '#22d3ee';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <polygon points="-45,-25 0,-45 45,-25 0,-5" fill="${primary}" opacity="0.85" />
          <polygon points="45,-25 45,15 0,35 0,-5" fill="${secondary}" opacity="0.75" />
          <polygon points="-45,-25 0,-5 0,35 -45,15" fill="#831843" opacity="0.8" />
          <circle cx="-20" cy="-12" r="5" fill="#ffffff" />
          <circle cx="20" cy="-12" r="4" fill="${accent}" />
        </g>
      `;
    } else if (hasCore('\\b(leetcode|algorithm|algorithms|data structure|interview|dsa|hashing|graph|tree|sorting|leet|leethub)\\b')) {
      domain = 'algorithm-tree';
      label = '3D ALGORITHM & BINARY GRAPH MATRIX';
      icon = '🧩';
      primary = '#38bdf8';
      secondary = '#818cf8';
      accent = '#10b981';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <circle cx="0" cy="-35" r="12" fill="${accent}" />
          <text x="0" y="-31" font-size="10" font-family="monospace" fill="#0f172a" text-anchor="middle" font-weight="900">1</text>
          <line x1="0" y1="-35" x2="-35" y2="5" stroke="${secondary}" stroke-width="2.5" />
          <circle cx="-35" cy="5" r="10" fill="${primary}" />
          <line x1="0" y1="-35" x2="35" y2="5" stroke="${secondary}" stroke-width="2.5" />
          <circle cx="35" cy="5" r="10" fill="${primary}" />
        </g>
      `;
    } else {
      domain = 'frontend-ui';
      label = '3D INTERACTIVE UI CANVAS & PRISM';
      icon = '🎨';
      primary = '#38bdf8';
      secondary = '#a855f7';
      accent = '#f43f5e';
      geometrySvg = `
        <g transform="translate(180, 90)">
          <g transform="translate(10, 10) skewY(-8)">
            <rect x="-45" y="-32" width="90" height="64" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="${primary}" stroke-width="2" />
            <circle cx="-32" cy="-20" r="3" fill="#ef4444" />
            <circle cx="-22" cy="-20" r="3" fill="#f59e0b" />
            <circle cx="-12" cy="-20" r="3" fill="#10b981" />
            <rect x="-35" y="-8" width="40" height="24" rx="4" fill="${primary}" opacity="0.3" />
          </g>
        </g>
      `;
    }

    const cardId = 'nb_p3d_' + Math.abs(Math.floor(Math.random() * 1000000));

    return `
    <div class="nano-banana-live-3d-card" id="${cardId}" style="
      width: 100%;
      height: 190px;
      position: relative;
      overflow: hidden;
      border-radius: 14px;
      background: radial-gradient(circle at 50% 40%, rgba(30, 41, 59, 0.95), #090d16);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 0 25px rgba(0,0,0,0.4);
      perspective: 800px;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    "
    onmousemove="
      const r = this.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      const inner = this.querySelector('.nb-3d-inner');
      if (inner) inner.style.transform = 'rotateY(' + (x * 24) + 'deg) rotateX(' + (-y * 24) + 'deg) translateZ(15px)';
      this.style.borderColor = '${primary}';
      this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.8), 0 0 25px ${primary}44';
    "
    onmouseleave="
      const inner = this.querySelector('.nb-3d-inner');
      if (inner) inner.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
      this.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6), inset 0 0 25px rgba(0,0,0,0.4)';
    ">
      <!-- 3D Perspective Layer -->
      <div class="nb-3d-inner" style="
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.2s ease-out;
      ">
        <!-- SVG Vector 3D Geometric Scene -->
        <svg viewBox="0 0 360 180" width="100%" height="100%" fill="none" style="display: block; width: 100%; height: 100%;">
          <defs>
            <radialGradient id="${cardId}_glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${primary}" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#000000" stop-opacity="0" />
            </radialGradient>
          </defs>
          <!-- Background Ambient Glow -->
          <circle cx="180" cy="90" r="85" fill="url(#${cardId}_glow)" />
          ${geometrySvg}
        </svg>

        <!-- Top Telemetry Badge -->
        <div style="
          position: absolute;
          top: 10px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 3px 8px;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        ">
          <span style="font-size: 0.8rem;">${icon}</span>
          <span style="color: ${primary}; font-family: monospace;">${label}</span>
        </div>

        <!-- Live Trigger Indicator -->
        <div style="
          position: absolute;
          bottom: 10px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(0, 0, 0, 0.6);
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 0.62rem;
          font-family: monospace;
          color: ${accent};
          border: 1px solid ${accent}44;
        ">
          <span style="display: inline-block; width: 6px; height: 6px; background: ${accent}; border-radius: 50%; box-shadow: 0 0 6px ${accent};"></span>
          <span>LIVE 3D TRIGGER</span>
        </div>
      </div>
    </div>
    `;
  }
}

module.exports = { NanoBanana3DGenerator };

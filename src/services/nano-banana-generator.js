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

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, (container.clientWidth || window.innerWidth) / (container.clientHeight || 320), 0.1, 1000);
      camera.position.set(0, 1.2, 16);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || 320);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
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
   * Generates vector isometric 3D SVG as high-fidelity fallback
   */
  static generateSvgIsometricFallback(config) {
    return `
    <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" class="nano-banana-svg-3d">
      <defs>
        <linearGradient id="nb-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${config.primaryColor}" />
          <stop offset="100%" stop-color="${config.accentColor}" />
        </linearGradient>
        <linearGradient id="nb-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${config.accentColor}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="${config.primaryColor}" stop-opacity="0.2" />
        </linearGradient>
        <filter id="nb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Background Ambient Glow -->
      <circle cx="200" cy="200" r="140" fill="url(#nb-grad1)" opacity="0.15" filter="url(#nb-glow)" />
      <!-- Outer Orbit Ring -->
      <ellipse cx="200" cy="200" rx="160" ry="70" stroke="${config.accentColor}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.4" transform="rotate(-25 200 200)" />
      <!-- Isometric Core Polyhedron -->
      <g transform="translate(200, 200)" filter="url(#nb-glow)">
        <!-- Top Face -->
        <polygon points="0,-70 60,-35 0,0 -60,-35" fill="url(#nb-grad1)" opacity="0.9" />
        <!-- Right Face -->
        <polygon points="60,-35 60,35 0,70 0,0" fill="${config.primaryColor}" opacity="0.75" />
        <!-- Left Face -->
        <polygon points="-60,-35 0,0 0,70 -60,35" fill="${config.accentColor}" opacity="0.6" />
        <!-- Inner Lattice Edges -->
        <line x1="0" y1="-70" x2="0" y2="70" stroke="#FFFFFF" stroke-width="1.5" opacity="0.6" />
        <line x1="-60" y1="-35" x2="60" y2="35" stroke="#FFFFFF" stroke-width="1" opacity="0.4" />
        <line x1="60" y1="-35" x2="-60" y2="35" stroke="#FFFFFF" stroke-width="1" opacity="0.4" />
      </g>
      <!-- Orbiting Satellite Spheres -->
      <circle cx="90" cy="140" r="12" fill="url(#nb-grad1)" filter="url(#nb-glow)" />
      <circle cx="310" cy="260" r="10" fill="${config.accentColor}" filter="url(#nb-glow)" />
      <circle cx="280" cy="110" r="8" fill="${config.primaryColor}" />
    </svg>
    `;
  }
}

module.exports = { NanoBanana3DGenerator };

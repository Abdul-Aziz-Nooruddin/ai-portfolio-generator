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

    return `
    // 🍌 Nano Banana 3D Spatial Engine (${config.geometryType})
    (function initNanoBanana3D() {
      if (typeof THREE === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const container = document.getElementById('nano-banana-3d-stage') || document.getElementById('webgl-canvas-container');
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, (container.clientWidth || window.innerWidth) / (container.clientHeight || 480), 0.1, 1000);
      camera.position.set(0, 0, 18);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || 480);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(${primaryHex}, 2.5, 50);
      pointLight1.position.set(10, 10, 10);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(${accentHex}, 2.0, 50);
      pointLight2.position.set(-10, -10, 10);
      scene.add(pointLight2);

      // Group Object for 3D Geometry
      const group = new THREE.Group();
      scene.add(group);

      // Main Core Geometry based on Nano Banana Archetype
      let coreGeo;
      if ('${config.geometryType}' === 'NeuralLattice') {
        coreGeo = new THREE.IcosahedronGeometry(4.5, 1);
      } else if ('${config.geometryType}' === 'ConsensusNodes') {
        coreGeo = new THREE.BoxGeometry(4, 4, 4);
      } else if ('${config.geometryType}' === 'CryptoShield') {
        coreGeo = new THREE.OctahedronGeometry(4.5, 0);
      } else {
        coreGeo = new THREE.TorusKnotGeometry(3.5, 1.1, 100, 16);
      }

      const coreMat = new THREE.MeshPhysicalMaterial({
        color: ${primaryHex},
        emissive: ${primaryHex},
        emissiveIntensity: 0.15,
        roughness: 0.15,
        metalness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        wireframe: false
      });

      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Outer Wireframe Accent
      const wireMat = new THREE.MeshBasicMaterial({
        color: ${accentHex},
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const wireMesh = new THREE.Mesh(coreGeo, wireMat);
      wireMesh.scale.set(1.08, 1.08, 1.08);
      group.add(wireMesh);

      // Floating Satellite Nodes
      const nodeGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({ color: ${accentHex}, roughness: 0.2, metalness: 0.8 });
      const satellites = [];

      for (let i = 0; i < 6; i++) {
        const sat = new THREE.Mesh(nodeGeo, nodeMat);
        const angle = (i / 6) * Math.PI * 2;
        const radius = 6.5;
        sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 3);
        group.add(sat);
        satellites.push({ mesh: sat, angle, radius, speed: 0.01 + i * 0.003 });
      }

      // Mouse Interaction Tilt
      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      });

      // Render Loop
      let clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        group.rotation.x += 0.004;
        group.rotation.y += 0.006;

        group.rotation.x += (mouseY * 0.4 - group.rotation.x) * 0.05;
        group.rotation.y += (mouseX * 0.4 - group.rotation.y) * 0.05;

        satellites.forEach(s => {
          s.angle += s.speed;
          s.mesh.position.x = Math.cos(s.angle) * s.radius;
          s.mesh.position.y = Math.sin(s.angle) * s.radius;
        });

        renderer.render(scene, camera);
      }
      animate();

      // Resize Handler
      window.addEventListener('resize', () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 480;
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

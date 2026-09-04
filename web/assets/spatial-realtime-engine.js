/**
 * MyFolio Studio — Real-Time 3D Spatial Universe Engine (Three.js WebGL)
 * Native Retina Resolution • True 3D Astronaut GLTF • Procedural Stargate Portal
 * 3D Holographic Wireframe Universes • Interactive Mouse Tilt & Scroll Choreography
 */
(function initSpatialRealTimeEngine() {
  const canvas = document.getElementById('chronoSequenceCanvas');
  if (!canvas) return;

  // Fallback check for Three.js
  if (typeof THREE === 'undefined') {
    console.warn('[3D Engine] Three.js not loaded yet, retrying...');
    setTimeout(initSpatialRealTimeEngine, 100);
    return;
  }

  // Hide 2D stardust canvas since Three.js provides unified 3D particle vortex
  const stardust2D = document.getElementById('chronoStardustCanvas');
  if (stardust2D) stardust2D.style.display = 'none';

  // HUD Elements
  const contentLayer = document.getElementById('chronoHeroContent');
  const heroStage = document.getElementById('chronoHeroStage');
  const scrollHudProgress = document.getElementById('chronoHudProgress');
  const scrollHudPhase = document.getElementById('chronoHudPhase');
  const scrollIndicator = document.getElementById('chronoScrollIndicator');

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04060E, 0.045);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5.4);

  // 2. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  // 3. Lighting Architecture
  const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
  scene.add(ambientLight);

  // Radiant Solar Portal PointLight (Center of Event Horizon)
  const portalPointLight = new THREE.PointLight(0xF5A623, 3.5, 20);
  portalPointLight.position.set(0, 0.3, -2.5);
  scene.add(portalPointLight);

  // Key Sunlight (Front-Left)
  const sunLight = new THREE.DirectionalLight(0xFFD67A, 2.0);
  sunLight.position.set(-3, 4, 4);
  scene.add(sunLight);

  // Sci-Fi Cyan Rim Backlight (Outlining astronaut silhouette)
  const rimLight = new THREE.DirectionalLight(0x38BDF8, 1.8);
  rimLight.position.set(3, -2, -3);
  scene.add(rimLight);

  // 4. Stargate Dimensional Portal Assembly
  const portalGroup = new THREE.Group();
  portalGroup.position.set(0, 0.2, -3.2);
  scene.add(portalGroup);

  // Outer Heavy Mechanical Gate Ring
  const outerRingGeo = new THREE.TorusGeometry(3.6, 0.16, 24, 120);
  const outerRingMat = new THREE.MeshStandardMaterial({
    color: 0x141A28,
    roughness: 0.35,
    metalness: 0.95
  });
  const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
  portalGroup.add(outerRing);

  // Inner Concentric Glowing Energy Rings
  const plasmaRingGeo1 = new THREE.TorusGeometry(3.3, 0.07, 16, 100);
  const plasmaRingMat1 = new THREE.MeshBasicMaterial({
    color: 0xF5A623,
    transparent: true,
    opacity: 0.95
  });
  const plasmaRing1 = new THREE.Mesh(plasmaRingGeo1, plasmaRingMat1);
  portalGroup.add(plasmaRing1);

  const plasmaRingGeo2 = new THREE.TorusGeometry(3.0, 0.045, 16, 90);
  const plasmaRingMat2 = new THREE.MeshBasicMaterial({
    color: 0xFFB020,
    transparent: true,
    opacity: 0.85
  });
  const plasmaRing2 = new THREE.Mesh(plasmaRingGeo2, plasmaRingMat2);
  portalGroup.add(plasmaRing2);

  // Rotating Runic Chevron Satellites
  const chevronsGroup = new THREE.Group();
  const chevronCount = 14;
  const chevronGeo = new THREE.BoxGeometry(0.14, 0.34, 0.42);
  const chevronMat = new THREE.MeshStandardMaterial({
    color: 0xF5A623,
    emissive: 0xF5A623,
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.8
  });

  for (let i = 0; i < chevronCount; i++) {
    const angle = (i / chevronCount) * Math.PI * 2;
    const ch = new THREE.Mesh(chevronGeo, chevronMat);
    ch.position.set(Math.cos(angle) * 3.6, Math.sin(angle) * 3.6, 0);
    ch.rotation.z = angle + Math.PI / 2;
    chevronsGroup.add(ch);
  }
  portalGroup.add(chevronsGroup);

  // Swirling Event Horizon Disc
  const vortexGeo = new THREE.RingGeometry(0.3, 2.95, 48, 8);
  const vortexMat = new THREE.MeshBasicMaterial({
    color: 0xF5A623,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    wireframe: true
  });
  const vortexDisc = new THREE.Mesh(vortexGeo, vortexMat);
  portalGroup.add(vortexDisc);

  // 5. 3D Holographic Wireframe Universes (Archetypes Cluster)
  const polyhedraGroup = new THREE.Group();
  scene.add(polyhedraGroup);

  const archetypes = [
    { geo: new THREE.IcosahedronGeometry(0.32, 0), color: 0xF5A623, pos: [1.6, 0.4, 0.2], speed: 0.015 },
    { geo: new THREE.DodecahedronGeometry(0.28, 0), color: 0x38BDF8, pos: [-1.7, 0.6, 0.1], speed: -0.018 },
    { geo: new THREE.OctahedronGeometry(0.30, 0), color: 0xC084FC, pos: [1.4, -0.9, 0.3], speed: 0.022 },
    { geo: new THREE.TetrahedronGeometry(0.26, 0), color: 0x34D399, pos: [-1.5, -0.7, 0.2], speed: -0.016 }
  ];

  const polyhedronMeshes = [];
  archetypes.forEach(arch => {
    const wireMat = new THREE.MeshBasicMaterial({
      color: arch.color,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const mesh = new THREE.Mesh(arch.geo, wireMat);
    mesh.position.set(...arch.pos);
    mesh.userData = { ...arch, basePos: [...arch.pos] };

    // Glowing core inside each polyhedron
    const coreGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({
      color: arch.color,
      transparent: true,
      opacity: 0.65
    });
    mesh.add(new THREE.Mesh(coreGeo, coreMat));

    polyhedraGroup.add(mesh);
    polyhedronMeshes.push(mesh);
  });

  // 6. Volumetric 3D Stardust Vortex
  const starCount = 1800;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const colorPalette = [
    new THREE.Color(0xF5A623), // Solar gold
    new THREE.Color(0xFFB020), // Solar flare
    new THREE.Color(0x38BDF8), // Cyan starlight
    new THREE.Color(0xFFFFFF)  // Pure white
  ];

  for (let i = 0; i < starCount; i++) {
    const radius = 0.5 + Math.random() * 6.5;
    const theta = Math.random() * Math.PI * 2;
    const z = (Math.random() - 0.5) * 20;

    starPos[i * 3] = Math.cos(theta) * radius;
    starPos[i * 3 + 1] = Math.sin(theta) * radius;
    starPos[i * 3 + 2] = z;

    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors[i * 3] = col.r;
    starColors[i * 3 + 1] = col.g;
    starColors[i * 3 + 2] = col.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.042,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // 7. Load Real-Time 3D Animated Astronaut (GLTF / GLB with Skeletal Animation)
  const astronautRoot = new THREE.Group();
  astronautRoot.position.set(0, -1.05, 0.4);
  scene.add(astronautRoot);

  let astronautModel = null;
  let mixer = null;
  const actions = {};
  let currentAction = null;
  const gltfLoader = typeof THREE.GLTFLoader !== 'undefined' ? new THREE.GLTFLoader() : null;

  function setAstronautAction(name, crossFadeDuration = 0.4) {
    if (!actions[name]) return;
    const nextAction = actions[name];
    if (currentAction === nextAction) return;

    if (currentAction) {
      currentAction.fadeOut(crossFadeDuration);
    }
    nextAction.reset().fadeIn(crossFadeDuration).play();
    currentAction = nextAction;
  }

  // Expose wave trigger on astronaut or interactive hover
  window.triggerAstronautWave = function () {
    if (actions['wave']) {
      setAstronautAction('wave', 0.35);
      setTimeout(() => {
        setAstronautAction('floating', 0.6);
      }, 3000);
    }
  };

  if (gltfLoader) {
    // Attempt loading newly added rigged animated astronaut, fallback to classic Astronaut.glb
    const primaryModelPath = '/assets/astronaut-animated.glb';
    const fallbackModelPath = '/assets/Astronaut.glb';

    function initAstronaut(gltf, isRigged) {
      astronautModel = gltf.scene;

      if (isRigged) {
        // Walking astronaut.glb is ~237cm tall, scale 0.012 brings it to ~2.85 units
        const scale = 0.0125;
        astronautModel.scale.set(scale, scale, scale);
        // Center torso pivot (bounds min: -0.05, max: 237)
        astronautModel.position.set(0, -1.18, 0);

        // Setup skeletal AnimationMixer
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(astronautModel);
          gltf.animations.forEach(clip => {
            const act = mixer.clipAction(clip);
            actions[clip.name] = act;
          });

          // Play default weightless floating animation
          if (actions['floating']) {
            actions['floating'].play();
            currentAction = actions['floating'];
          } else if (gltf.animations[0]) {
            const first = mixer.clipAction(gltf.animations[0]);
            first.play();
            currentAction = first;
          }

          console.log('✨ [3D Engine] Loaded rigged astronaut animations:', Object.keys(actions));
        }
      } else {
        // Classic static model scale
        astronautModel.scale.set(1.55, 1.55, 1.55);
        astronautModel.position.set(0, 0, 0);
      }

      // Enhance materials with PBR reflection properties
      astronautModel.traverse(child => {
        if (child.isMesh && child.material) {
          child.castShadow = false;
          child.receiveShadow = false;
          if (child.material.isMeshStandardMaterial) {
            // Golden reflective visor
            const matName = (child.material.name || '').toLowerCase();
            if (matName.includes('visor') || matName.includes('glass') || child.material.metalness > 0.4) {
              child.material.metalness = 0.95;
              child.material.roughness = 0.08;
              child.material.color = new THREE.Color(0xFFD700);
            } else {
              child.material.roughness = Math.max(0.4, child.material.roughness);
            }
          }
        }
      });

      astronautRoot.add(astronautModel);

      // Entrance animation
      const targetScale = isRigged ? 0.0125 : 1.55;
      astronautModel.scale.set(targetScale * 0.05, targetScale * 0.05, targetScale * 0.05);
      let s = targetScale * 0.05;
      const entryAnim = () => {
        s += (targetScale - s) * 0.08;
        astronautModel.scale.set(s, s, s);
        if (Math.abs(targetScale - s) > targetScale * 0.01) {
          requestAnimationFrame(entryAnim);
        } else {
          astronautModel.scale.set(targetScale, targetScale, targetScale);
        }
      };
      entryAnim();

      // Hook hover wave triggers on hero buttons and interactive elements
      const waveTriggers = document.querySelectorAll('.btn-solar-primary, .btn-solar-outline, .chrono-console-card, .chrono-hero-badge');
      waveTriggers.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (window.triggerAstronautWave) window.triggerAstronautWave();
        }, { passive: true });
      });
    }

    gltfLoader.load(
      primaryModelPath,
      function (gltf) {
        initAstronaut(gltf, true);
      },
      undefined,
      function (err) {
        console.warn('[3D Engine] Animated model loading error, falling back:', err);
        gltfLoader.load(
          fallbackModelPath,
          function (fallbackGltf) {
            initAstronaut(fallbackGltf, false);
          }
        );
      }
    );
  }

  // 8. Interaction State (Mouse Look-At Tilt + Scroll Progression)
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let scrollProgress = 0;

  // Target Camera & Stage Coordinates
  let camTargetX = 0;
  let camTargetY = 0;
  let camTargetZ = 5.4;
  let astroTargetX = 0;
  let astroTargetY = -1.05;
  let astroTargetRotY = 0;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetMouseX = (e.clientX - cx) / cx;
    targetMouseY = (e.clientY - cy) / cy;
  }, { passive: true });

  // 9. Scroll Progression & Choreography
  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Hero Content Fade & Parallax
    if (contentLayer && heroStage) {
      const heroH = heroStage.offsetHeight || window.innerHeight;
      const heroRatio = Math.min(scrollY / (heroH * 0.75), 1);
      contentLayer.style.opacity = Math.max(0, 1 - heroRatio).toFixed(3);
      contentLayer.style.transform = `perspective(1400px) translateY(${-heroRatio * 50}px) scale(${1 - heroRatio * 0.06})`;
      contentLayer.style.pointerEvents = heroRatio < 0.3 ? 'auto' : 'none';
    }

    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 1 - (scrollY / 150)).toFixed(2);
    }

    // Camera & Spatial Staging Choreography
    if (scrollProgress < 0.25) {
      // Beat 1: Hero Stage — Centered Event Horizon Emergence
      const p = scrollProgress / 0.25;
      camTargetX = 0;
      camTargetY = 0;
      camTargetZ = 5.4 - p * 0.4;
      astroTargetX = 0;
      astroTargetY = -1.05 + p * 0.15;
      astroTargetRotY = 0;
    } else if (scrollProgress < 0.55) {
      // Beat 2: Spatial Architecture — Astronaut shifts right to frame 3 Feature Pillars
      const p = (scrollProgress - 0.25) / 0.30;
      camTargetX = -0.55 * p;
      camTargetY = -0.15 * p;
      camTargetZ = 5.0 - p * 0.3;
      astroTargetX = 1.15 * p;
      astroTargetY = -0.90 + p * 0.2;
      astroTargetRotY = -0.35 * p;
    } else if (scrollProgress < 0.80) {
      // Beat 3: 22 Universes — Return toward center, polyhedrons expand
      const p = (scrollProgress - 0.55) / 0.25;
      camTargetX = -0.55 * (1 - p);
      camTargetY = -0.15 + p * 0.2;
      camTargetZ = 4.7 + p * 0.4;
      astroTargetX = 1.15 * (1 - p);
      astroTargetY = -0.70;
      astroTargetRotY = -0.35 * (1 - p);
    } else {
      // Beat 4: Launch Studio — Dramatic hero staging behind launch buttons
      const p = (scrollProgress - 0.80) / 0.20;
      camTargetX = 0;
      camTargetY = 0.15 - p * 0.25;
      camTargetZ = 5.1 - p * 0.5;
      astroTargetX = 0;
      astroTargetY = -0.70 - p * 0.25;
      astroTargetRotY = 0;
    }

    // Dynamic Skeletal Animation Transition on Scroll
    if (mixer) {
      if (scrollProgress > 0.22 && scrollProgress < 0.70) {
        if (actions['moon_walk']) setAstronautAction('moon_walk', 0.6);
      } else {
        if (actions['floating']) setAstronautAction('floating', 0.6);
      }
    }

    // Top Telemetry HUD
    if (scrollHudProgress) {
      scrollHudProgress.style.width = `${(scrollProgress * 100).toFixed(1)}%`;
    }
    if (scrollHudPhase) {
      const pct = Math.round(scrollProgress * 100);
      let phase = 'PORTAL HORIZON';
      if (scrollProgress < 0.25) phase = 'PORTAL HORIZON';
      else if (scrollProgress < 0.55) phase = 'SPATIAL ARCHITECTURE';
      else if (scrollProgress < 0.80) phase = '22 GENERATIVE UNIVERSES';
      else phase = 'LAUNCH STUDIO';
      scrollHudPhase.textContent = `${phase} // ${pct}%`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    onScroll();
  });

  // 10. Animation Loop (60–120 FPS Hardware Render)
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.getElapsedTime();

    // Advance Skeletal Animation Mixer
    if (mixer) {
      mixer.update(delta);
    }

    // Lerp Mouse for Silky-Smooth Parallax
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    // Camera Interpolation
    camera.position.x += (camTargetX + mouseX * 0.45 - camera.position.x) * 0.06;
    camera.position.y += (camTargetY - mouseY * 0.35 - camera.position.y) * 0.06;
    camera.position.z += (camTargetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);

    // Stargate Rotations & Plasma Pulsing
    chevronsGroup.rotation.z = -elapsed * 0.12;
    plasmaRing1.rotation.z = elapsed * 0.22;
    plasmaRing2.rotation.z = -elapsed * 0.18;
    vortexDisc.rotation.z = elapsed * 0.08;

    const pulseIntensity = 3.0 + Math.sin(elapsed * 3.0) * 0.8;
    portalPointLight.intensity = pulseIntensity;

    // Weightless Astronaut Micro-Physics
    astronautRoot.position.x += (astroTargetX - astronautRoot.position.x) * 0.06;
    astronautRoot.position.y += (astroTargetY + Math.sin(elapsed * 1.6) * 0.07 - astronautRoot.position.y) * 0.06;

    const targetRotX = -mouseY * 0.22;
    const targetRotY = astroTargetRotY + mouseX * 0.38;
    astronautRoot.rotation.x += (targetRotX - astronautRoot.rotation.x) * 0.06;
    astronautRoot.rotation.y += (targetRotY - astronautRoot.rotation.y) * 0.06;
    astronautRoot.rotation.z = Math.sin(elapsed * 0.9) * 0.02;

    // Wireframe Universes Orbital Physics & Expansion
    const polyExpansion = scrollProgress > 0.5 && scrollProgress < 0.85 ? 1.45 : 1.0;
    polyhedronMeshes.forEach((mesh, idx) => {
      mesh.rotation.x += mesh.userData.speed;
      mesh.rotation.y += mesh.userData.speed * 1.3;

      const base = mesh.userData.basePos;
      const wave = Math.sin(elapsed * 2.0 + idx) * 0.08;
      mesh.position.x = base[0] * polyExpansion;
      mesh.position.y = (base[1] + wave) * polyExpansion;
      mesh.position.z = base[2] * polyExpansion;
    });

    // Stardust Particle Stream Motion
    const positions = starGeo.attributes.position.array;
    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 2] += 0.025; // Flow forward along Z
      if (positions[i * 3 + 2] > 6) {
        positions[i * 3 + 2] = -14;
      }
    }
    starGeo.attributes.position.needsUpdate = true;
    starField.rotation.z = elapsed * 0.02;

    renderer.render(scene, camera);
  }

  animate();
  onScroll();
  console.log('⚡ [3D SPATIAL ENGINE] Real-time Three.js WebGL Universe online.');
})();

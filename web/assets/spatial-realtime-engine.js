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

  // 1. Scene & Camera Setup (Pure Deep Space — No Fog)
  const scene = new THREE.Scene();
  scene.fog = null;

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
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
  renderer.toneMappingExposure = 1.35;

  // 2.5 360 Realistic Deep-Space Galaxy Skybox
  let galaxySkyDome = null;
  let galaxyTexture = null;
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/assets/galaxy-hdri-bg.webp', (galaxyTex) => {
    galaxyTexture = galaxyTex;
    galaxyTex.mapping = THREE.EquirectangularReflectionMapping;
    galaxyTex.wrapS = THREE.RepeatWrapping;
    galaxyTex.wrapT = THREE.ClampToEdgeWrapping;
    if (THREE.SRGBColorSpace) galaxyTex.colorSpace = THREE.SRGBColorSpace;

    // Set directly on Three.js scene background & environment for reflective visor
    scene.background = galaxyTex;
    scene.environment = galaxyTex;

    // Enclosing 360 celestial sky dome with fog explicitly disabled
    const skyGeo = new THREE.SphereGeometry(85, 60, 40);
    const skyMat = new THREE.MeshBasicMaterial({
      map: galaxyTex,
      side: THREE.BackSide,
      fog: false,
      depthWrite: false
    });
    galaxySkyDome = new THREE.Mesh(skyGeo, skyMat);
    galaxySkyDome.rotation.y = 1.15;
    scene.add(galaxySkyDome);
    console.log('🌌 [3D Engine] Deep space galaxy skybox fully active & illuminated.');
  });

  // 3. Lighting Architecture
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambientLight);

  // Direct Key Lights on Foreground Astronaut
  const astroFrontLight = new THREE.DirectionalLight(0xffffff, 2.8);
  astroFrontLight.position.set(0, 2, 5.5);
  scene.add(astroFrontLight);

  const astroFillLight = new THREE.DirectionalLight(0xF5A623, 2.0);
  astroFillLight.position.set(-3.5, 0.5, 3.5);
  scene.add(astroFillLight);

  // Gold visor specular highlight light
  const visorGoldLight = new THREE.PointLight(0xF5A623, 2.6, 8);
  visorGoldLight.position.set(1.2, 0.4, 2.5);
  scene.add(visorGoldLight);

  // Key Sunlight (Front-Left)
  const sunLight = new THREE.DirectionalLight(0xFFD67A, 2.2);
  sunLight.position.set(-3, 4, 4);
  scene.add(sunLight);

  // Sci-Fi Cyan Rim Backlight (Outlining astronaut silhouette)
  const rimLight = new THREE.DirectionalLight(0x38BDF8, 2.2);
  rimLight.position.set(3, -2, -3);
  scene.add(rimLight);

  // 4. Clean Spatial Staging (Portal removed per user request: pure Galaxy & Astronaut focus)

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

  // 7. Load Real-Time 3D Animated Astronaut (GLTF / GLB with Progressive LOD)
  const astronautRoot = new THREE.Group();
  // Positioned cleanly on the far right of hero stage (x = 1.85) facing left towards hero content
  astronautRoot.position.set(1.85, -0.42, 1.20);
  astronautRoot.rotation.y = -0.55;
  scene.add(astronautRoot);

  let astronautModel = null;
  let mixer = null;
  const actions = {};
  let currentAction = null;
  let isAnimatedActive = false;
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

  function getResponsiveAstronautScale() {
    const w = window.innerWidth;
    if (w < 640) return 0.38;
    if (w < 1024) return 0.56;
    return 0.72;
  }

  if (gltfLoader) {
    const fastModelPath = '/assets/Astronaut.glb';
    const animatedModelPath = '/assets/astronaut-animated.glb';

    function initAstronaut(gltf, isRigged) {
      // If rigged model already arrived, ignore slower static model fallback
      if (isAnimatedActive && !isRigged) return;

      // Remove existing model if upgrading from fast static to rigged animated
      if (astronautModel) {
        astronautRoot.remove(astronautModel);
      }

      astronautModel = gltf.scene;

      const baseScale = getResponsiveAstronautScale();

      if (isRigged) {
        isAnimatedActive = true;
        // Rigged animated astronaut scale & pivot
        const scale = baseScale;
        astronautModel.scale.set(scale, scale, scale);
        astronautModel.position.set(0, -0.92, 0);

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
        // Fast static model scale & centering
        const scale = baseScale * 1.04;
        astronautModel.scale.set(scale, scale, scale);
        astronautModel.position.set(0, -0.9, 0);
      }

      // Enhance materials with PBR metallic reflection properties
      astronautModel.traverse(child => {
        if (child.isMesh && child.material) {
          child.castShadow = false;
          child.receiveShadow = false;
          // Ensure material is visible & vibrant
          if (child.material.isMeshStandardMaterial) {
            const matName = (child.material.name || '').toLowerCase();
            if (matName.includes('visor') || matName.includes('glass') || child.material.metalness > 0.4) {
              child.material.metalness = 0.95;
              child.material.roughness = 0.08;
              child.material.color = new THREE.Color(0xFFD700);
            } else {
              child.material.roughness = Math.max(0.35, child.material.roughness);
            }
          }
        }
      });

      astronautRoot.add(astronautModel);

      // Hook hover wave triggers on hero buttons and interactive elements
      const waveTriggers = document.querySelectorAll('.btn-solar-primary, .btn-solar-outline, .chrono-console-card, .chrono-hero-badge');
      waveTriggers.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (window.triggerAstronautWave) window.triggerAstronautWave();
        }, { passive: true });
      });
    }

    // 1. Immediately load fast 2.8MB model (loads in <150ms so scene is NEVER empty)
    gltfLoader.load(
      fastModelPath,
      function (gltf) {
        initAstronaut(gltf, false);
      },
      undefined,
      function (err) {
        console.warn('[3D Engine] Fast model load issue:', err);
      }
    );

    // 2. Concurrently load full 46MB rigged animated astronaut and upgrade seamlessly
    gltfLoader.load(
      animatedModelPath,
      function (gltf) {
        initAstronaut(gltf, true);
      },
      undefined,
      function (err) {
        console.warn('[3D Engine] Rigged model load issue, fast model stays active:', err);
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
  let camTargetY = -0.05;
  let camTargetZ = 5.2;
  let astroTargetX = 1.85;
  let astroTargetY = -0.42;
  let astroTargetZ = 1.25;
  let astroTargetRotY = -0.55;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetMouseX = (e.clientX - cx) / cx;
    targetMouseY = (e.clientY - cy) / cy;
  }, { passive: true });

  // DOM Section References for Dynamic Scroll Anchoring
  const secOverviewEl = document.getElementById('sectionOverview');
  const secUniversesEl = document.getElementById('sectionUniverses');
  const secLaunchEl = document.getElementById('sectionLaunch');

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

    // Dynamic Multi-Waypoint Zig-Zag Choreography:
    // Sections alternate Left / Right across the viewport.
    // When content is on LEFT, astronaut floats on RIGHT facing LEFT (rotY ~ -0.55).
    // When content is on RIGHT, astronaut floats on LEFT facing RIGHT (rotY ~ +0.55).
    const vh = window.innerHeight;
    const viewCenter = scrollY + vh * 0.5;

    // Calculate actual live document center offsets of each section
    const heroCenter = heroStage ? (heroStage.offsetTop + heroStage.offsetHeight * 0.5) : (vh * 0.5);
    const overviewCenter = secOverviewEl ? (secOverviewEl.offsetTop + secOverviewEl.offsetHeight * 0.5) : (heroCenter + vh);
    const universesCenter = secUniversesEl ? (secUniversesEl.offsetTop + secUniversesEl.offsetHeight * 0.5) : (overviewCenter + vh);
    const launchCenter = secLaunchEl ? (secLaunchEl.offsetTop + secLaunchEl.offsetHeight * 0.5) : (universesCenter + vh);

    const isMobile = window.innerWidth < 768;
    const stages = isMobile ? [
      // Mobile choreography: scaled-down ambient astronaut in upper sky corners, never colliding with centered text cards
      { y: heroCenter, x: 0.65, yOffset: 0.42, z: 0.15, rotY: -0.45, anim: 'floating' },
      { y: overviewCenter, x: -0.65, yOffset: 0.46, z: 0.15, rotY: 0.45, anim: 'moon_walk' },
      { y: universesCenter, x: 0.65, yOffset: 0.42, z: 0.15, rotY: -0.45, anim: 'moon_walk' },
      { y: launchCenter, x: -0.65, yOffset: 0.46, z: 0.15, rotY: 0.45, anim: 'floating' }
    ] : [
      // Desktop choreography: bold perimeter docking opposite the active section
      { y: heroCenter, x: 1.85, yOffset: -0.42, z: 1.25, rotY: -0.55, anim: 'floating' },
      { y: overviewCenter, x: -1.85, yOffset: -0.26, z: 1.30, rotY: 0.55, anim: 'moon_walk' },
      { y: universesCenter, x: 1.85, yOffset: -0.34, z: 1.25, rotY: -0.55, anim: 'moon_walk' },
      { y: launchCenter, x: -1.85, yOffset: -0.28, z: 1.30, rotY: 0.55, anim: 'floating' }
    ];

    let s0 = stages[0];
    let s1 = stages[stages.length - 1];
    let t = 0;

    if (viewCenter <= stages[0].y) {
      s0 = stages[0];
      s1 = stages[0];
      t = 0;
    } else if (viewCenter >= stages[stages.length - 1].y) {
      s0 = stages[stages.length - 1];
      s1 = stages[stages.length - 1];
      t = 0;
    } else {
      for (let i = 0; i < stages.length - 1; i++) {
        if (viewCenter >= stages[i].y && viewCenter <= stages[i + 1].y) {
          s0 = stages[i];
          s1 = stages[i + 1];
          const span = Math.max(1, s1.y - s0.y);
          const raw = (viewCenter - s0.y) / span;
          // Dead-zone plateau: keep astronaut parked on the opposite side when user is viewing each section,
          // only animate crossing smoothly between 0.20 and 0.80 of transition
          if (raw <= 0.20) {
            t = 0;
          } else if (raw >= 0.80) {
            t = 1;
          } else {
            const p = (raw - 0.20) / 0.60;
            t = p * p * (3 - 2 * p); // smooth cubic hermite curve
          }
          break;
        }
      }
    }

    astroTargetX = s0.x + (s1.x - s0.x) * t;
    astroTargetY = s0.yOffset + (s1.yOffset - s0.yOffset) * t;
    astroTargetZ = s0.z + (s1.z - s0.z) * t;
    astroTargetRotY = s0.rotY + (s1.rotY - s0.rotY) * t;

    camTargetX = 0;
    camTargetY = -0.05;
    camTargetZ = 5.2;

    // Dynamic Skeletal Animation Transition on Scroll
    const activeAnim = t < 0.5 ? s0.anim : s1.anim;
    if (mixer && actions[activeAnim]) {
      setAstronautAction(activeAnim, 0.5);
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
    if (astronautModel) {
      const baseScale = getResponsiveAstronautScale();
      const scale = isAnimatedActive ? baseScale : (baseScale * 1.04);
      astronautModel.scale.set(scale, scale, scale);
    }
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

    // 360 Deep-Space Galaxy Skybox Motion on Mouse & Scroll
    if (galaxySkyDome) {
      galaxySkyDome.rotation.y = 1.15 + scrollProgress * Math.PI * 1.5 + elapsed * 0.012;
      galaxySkyDome.rotation.x = -mouseY * 0.05 + scrollProgress * 0.12;
      galaxySkyDome.position.y = -scrollProgress * 6;
    }
    if (galaxyTexture) {
      galaxyTexture.offset.x = (scrollProgress * 0.45) + (elapsed * 0.003);
    }

    // Lerp Mouse for Silky-Smooth Parallax
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    // Camera Interpolation
    camera.position.x += (camTargetX + mouseX * 0.45 - camera.position.x) * 0.06;
    camera.position.y += (camTargetY - mouseY * 0.35 - camera.position.y) * 0.06;
    camera.position.z += (camTargetZ - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);

    // Weightless Astronaut Micro-Physics & Scroll Motion
    astronautRoot.position.x += (astroTargetX - astronautRoot.position.x) * 0.06;
    astronautRoot.position.y += (astroTargetY + Math.sin(elapsed * 1.6) * 0.08 - astronautRoot.position.y) * 0.06;
    astronautRoot.position.z += (astroTargetZ - astronautRoot.position.z) * 0.06;

    const targetRotX = -mouseY * 0.22 + (scrollProgress * 0.15);
    const targetRotY = astroTargetRotY + mouseX * 0.38;
    astronautRoot.rotation.x += (targetRotX - astronautRoot.rotation.x) * 0.06;
    astronautRoot.rotation.y += (targetRotY - astronautRoot.rotation.y) * 0.06;
    astronautRoot.rotation.z = Math.sin(elapsed * 0.9) * 0.03;

    // Stardust Particle Stream Motion (floating through galaxy)
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

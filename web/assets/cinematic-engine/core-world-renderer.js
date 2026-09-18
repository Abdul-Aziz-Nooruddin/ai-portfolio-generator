/**
 * MyFolio Studio — Core World WebGL Renderer (60–120 FPS PBR Engine)
 * Manages Three.js WebGL context, cinematic PBR lighting, atmospheric fog,
 * adaptive DPR scaling, and frame execution lifecycle.
 */
(function(window) {
  'use strict';

  class CoreWorldRenderer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.error('[CoreWorldRenderer] Canvas #' + canvasId + ' not found.');
        return;
      }

      this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      this.isMobile = window.innerWidth <= 768;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2);

      this.initScene();
      this.initRenderer();
      this.initLighting();
      this.initFog();
      this.bindEvents();
    }

    initScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x040714);
    }

    initRenderer() {
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: !this.isMobile,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true
        });

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(this.dpr);

        // Cinematic ACES Film Tone Mapping
        if (THREE.ACESFilmicToneMapping) {
          this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
          this.renderer.toneMappingExposure = 1.18;
        }
        if (THREE.sRGBEncoding) {
          this.renderer.outputEncoding = THREE.sRGBEncoding;
        }

        // Soft Shadow Mapping
        this.renderer.shadowMap.enabled = !this.isMobile;
        if (this.renderer.shadowMap.enabled) {
          this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
      } catch (err) {
        console.warn('[CoreWorldRenderer] WebGL context unavailable, falling back gracefully:', err);
        this.renderer = null;
      }
    }

    initLighting() {
      // 1. Deep Space Ambient Light
      this.ambientLight = new THREE.AmbientLight(0x0a1435, 1.4);
      this.scene.add(this.ambientLight);

      // 2. Celestial Sun Directional Light (Warm Solar Accent)
      this.sunLight = new THREE.DirectionalLight(0xfffaed, 2.6);
      this.sunLight.position.set(60, 80, 45);
      if (!this.isMobile) {
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 1024;
        this.sunLight.shadow.mapSize.height = 1024;
        this.sunLight.shadow.camera.near = 10;
        this.sunLight.shadow.camera.far = 300;
        this.sunLight.shadow.bias = -0.0005;
      }
      this.scene.add(this.sunLight);

      // 3. Electric Cyan Rim Light
      this.rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
      this.rimLight.position.set(-50, -20, -40);
      this.scene.add(this.rimLight);

      // 4. Violet Atmospheric Backlight
      this.backLight = new THREE.DirectionalLight(0x8b5cf6, 1.3);
      this.backLight.position.set(0, -60, 60);
      this.scene.add(this.backLight);

      // 5. Dynamic Core Point Light for Interactive Pulses
      this.corePulseLight = new THREE.PointLight(0x38bdf8, 2.0, 120, 2);
      this.corePulseLight.position.set(0, 0, 0);
      this.scene.add(this.corePulseLight);
    }

    initFog() {
      // Atmospheric depth fog that gently occludes distant objects
      this.scene.fog = new THREE.FogExp2(0x040714, 0.0042);
    }

    bindEvents() {
      this.onResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.onResize, { passive: true });
    }

    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.isMobile = this.width <= 768;
      this.dpr = Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2);

      if (this.renderer) {
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(this.dpr);
      }
    }

    setLightingForScene(sceneIndex, factor) {
      // Dynamic lighting orchestration per narrative scene
      // sceneIndex: 0 (Hero), 1 (Fragments), 2 (Convergence), 3 (Synthesis),
      // 4 (World), 5 (Projects), 6 (Skills/GitHub), 7 (Experience), 8 (Universes), 9 (Final Portal)
      switch (sceneIndex) {
        case 0: // Hero: Crisp celestial starlight
          this.ambientLight.color.setHex(0x0a1435);
          this.ambientLight.intensity = 1.4;
          this.sunLight.intensity = 2.6;
          this.rimLight.color.setHex(0x38bdf8);
          this.scene.fog.density = 0.0040;
          break;
        case 1: // Scattered Data: Dark void with crisp laser highlights
          this.ambientLight.color.setHex(0x060b1e);
          this.ambientLight.intensity = 1.0;
          this.sunLight.intensity = 2.0;
          this.rimLight.color.setHex(0x38bdf8);
          this.scene.fog.density = 0.0055;
          break;
        case 2: // Convergence: Intensifying energy core
          this.ambientLight.color.setHex(0x0c1a40);
          this.ambientLight.intensity = 1.5;
          this.corePulseLight.intensity = 3.2;
          this.scene.fog.density = 0.0045;
          break;
        case 3: // AI Synthesis: High-energy amber & cyan matrix
          this.ambientLight.color.setHex(0x131233);
          this.sunLight.color.setHex(0xf5a623);
          this.rimLight.color.setHex(0x00f0ff);
          this.sunLight.intensity = 3.0;
          this.scene.fog.density = 0.0035;
          break;
        case 4: // Living Portfolio World: Balanced rich PBR illumination
          this.ambientLight.color.setHex(0x0d2038);
          this.ambientLight.intensity = 1.7;
          this.sunLight.color.setHex(0xfffaed);
          this.sunLight.intensity = 2.8;
          this.scene.fog.density = 0.0030;
          break;
        case 5: // Project Worlds: Dramatic directional shadows showcasing miniature structures
          this.ambientLight.intensity = 1.3;
          this.sunLight.intensity = 3.2;
          this.rimLight.color.setHex(0x38bdf8);
          this.scene.fog.density = 0.0032;
          break;
        case 6: // Skills & GitHub: Deep basalt contrast with glowing copper & neon traces
          this.ambientLight.color.setHex(0x060f1c);
          this.ambientLight.intensity = 1.1;
          this.sunLight.color.setHex(0x10b981);
          this.sunLight.intensity = 2.2;
          this.scene.fog.density = 0.0048;
          break;
        case 7: // Experience Corridor: Rhythmic temporal lighting
          this.ambientLight.color.setHex(0x0e1124);
          this.ambientLight.intensity = 1.3;
          this.rimLight.color.setHex(0xd4af37);
          this.scene.fog.density = 0.0038;
          break;
        case 8: // Universe Gate: Prismatic multi-chromatic portal radiance
          this.ambientLight.color.setHex(0x1a0f30);
          this.ambientLight.intensity = 1.8;
          this.rimLight.color.setHex(0xa855f7);
          this.sunLight.color.setHex(0x38bdf8);
          this.scene.fog.density = 0.0028;
          break;
        case 9: // Climax Departure: Epic high-key celestial gateway
          this.ambientLight.color.setHex(0x162248);
          this.ambientLight.intensity = 2.2;
          this.sunLight.color.setHex(0xffffff);
          this.sunLight.intensity = 3.6;
          this.corePulseLight.intensity = 4.5;
          this.scene.fog.density = 0.0022;
          break;
      }
    }

    render(camera) {
      if (this.renderer && this.scene && camera) {
        this.renderer.render(this.scene, camera);
      }
    }

    dispose() {
      window.removeEventListener('resize', this.onResize);
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }

  window.CoreWorldRenderer = CoreWorldRenderer;
})(window);

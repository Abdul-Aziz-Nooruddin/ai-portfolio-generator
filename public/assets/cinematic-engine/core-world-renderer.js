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
      // Natural Atmospheric Twilight Sky (Deep Indigo to Horizon Gradient)
      this.scene.background = new THREE.Color(0x091428);
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
          this.renderer.toneMappingExposure = 1.22;
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
      // 1. Natural Sky Hemisphere Ambient Light (Soft Blue Sky + Warm Earth Bounce)
      this.ambientLight = new THREE.AmbientLight(0x1a2b4c, 1.8);
      this.scene.add(this.ambientLight);

      // 2. Realistic Directional Sunlight (Warm Solar Key Light with Shadows)
      this.sunLight = new THREE.DirectionalLight(0xfffaed, 3.2);
      this.sunLight.position.set(50, 95, 55);
      if (!this.isMobile) {
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 1024;
        this.sunLight.shadow.mapSize.height = 1024;
        this.sunLight.shadow.camera.near = 10;
        this.sunLight.shadow.camera.far = 400;
        this.sunLight.shadow.bias = -0.0004;
      }
      this.scene.add(this.sunLight);

      // 3. Skyfill Rim Light (Cool Horizon Rim)
      this.rimLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
      this.rimLight.position.set(-60, 20, -40);
      this.scene.add(this.rimLight);

      // 4. Warm Interior Architectural Fill Light
      this.backLight = new THREE.DirectionalLight(0xfef3c7, 1.2);
      this.backLight.position.set(0, 30, -80);
      this.scene.add(this.backLight);

      // 5. Dynamic Workstation & Terminal Practical Light
      this.corePulseLight = new THREE.PointLight(0x38bdf8, 2.2, 80, 2);
      this.corePulseLight.position.set(0, 4, -42);
      this.scene.add(this.corePulseLight);
    }

    initFog() {
      // Realistic atmospheric perspective depth fog matching horizon haze
      this.scene.fog = new THREE.FogExp2(0x0b172a, 0.0036);
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
      // Photorealistic Architectural Lighting Progression
      switch (sceneIndex) {
        case 0: // Hero: Crisp Natural Daylight on Research Campus Exterior
          this.ambientLight.color.setHex(0x1a2b4c);
          this.ambientLight.intensity = 1.9;
          this.sunLight.color.setHex(0xfffaed);
          this.sunLight.intensity = 3.2;
          this.rimLight.color.setHex(0x93c5fd);
          this.scene.fog.density = 0.0034;
          this.corePulseLight.intensity = 0.5;
          break;
        case 1: // Telemetry Workspace: Warm interior developer task lighting & dual monitor radiance
          this.ambientLight.color.setHex(0x162238);
          this.ambientLight.intensity = 1.8;
          this.sunLight.intensity = 2.4;
          this.corePulseLight.position.set(0, 3.5, 42);
          this.corePulseLight.color.setHex(0x38bdf8);
          this.corePulseLight.intensity = 2.6;
          this.scene.fog.density = 0.0035;
          break;
        case 2: // Data Operations Room: Cool infrastructure lighting & central processing machine
          this.ambientLight.color.setHex(0x101a2e);
          this.ambientLight.intensity = 1.7;
          this.sunLight.intensity = 2.0;
          this.corePulseLight.position.set(0, 3.0, 18);
          this.corePulseLight.color.setHex(0x10b981);
          this.corePulseLight.intensity = 3.0;
          this.scene.fog.density = 0.0036;
          break;
        case 3: // AI Research Lab: High-density GPU compute racks & progress readout
          this.ambientLight.color.setHex(0x0f182c);
          this.ambientLight.intensity = 1.6;
          this.sunLight.color.setHex(0x38bdf8);
          this.sunLight.intensity = 2.2;
          this.corePulseLight.position.set(0, 3.0, -8);
          this.corePulseLight.color.setHex(0x38bdf8);
          this.corePulseLight.intensity = 3.2;
          this.scene.fog.density = 0.0032;
          break;
        case 4: // Living World Hub: Rich natural daylight through floor-to-ceiling glass
          this.ambientLight.color.setHex(0x1a2e42);
          this.ambientLight.intensity = 2.0;
          this.sunLight.color.setHex(0xfffaed);
          this.sunLight.intensity = 3.0;
          this.corePulseLight.position.set(0, 3.0, -32);
          this.corePulseLight.intensity = 1.8;
          this.scene.fog.density = 0.0028;
          break;
        case 5: // Project Workstations: Intimate developer lab task lighting & monitor radiance
          this.ambientLight.color.setHex(0x101726);
          this.ambientLight.intensity = 1.6;
          this.sunLight.intensity = 2.0;
          this.corePulseLight.position.set(0, 3.0, -56);
          this.corePulseLight.color.setHex(0x38bdf8);
          this.corePulseLight.intensity = 3.0;
          this.rimLight.color.setHex(0x38bdf8);
          this.scene.fog.density = 0.0032;
          break;
        case 6: // Hyperscale Data Center: Cool server aisle ambient with green/amber LED glow
          this.ambientLight.color.setHex(0x0a1424);
          this.ambientLight.intensity = 1.4;
          this.sunLight.color.setHex(0x10b981);
          this.sunLight.intensity = 1.8;
          this.corePulseLight.position.set(0, 3.0, -84);
          this.corePulseLight.color.setHex(0x10b981);
          this.corePulseLight.intensity = 3.0;
          this.scene.fog.density = 0.0040;
          break;
        case 7: // Suspended Skybridge: Outdoor alpine lighting on glass balustrades
          this.ambientLight.color.setHex(0x16223a);
          this.ambientLight.intensity = 1.8;
          this.sunLight.color.setHex(0xfef3c7);
          this.sunLight.intensity = 2.8;
          this.corePulseLight.position.set(0, 3.0, -114);
          this.corePulseLight.intensity = 1.5;
          this.scene.fog.density = 0.0035;
          break;
        case 8: // Universes Gallery: Architectural exhibition downlights
          this.ambientLight.color.setHex(0x131a2c);
          this.ambientLight.intensity = 1.7;
          this.rimLight.color.setHex(0xa855f7);
          this.sunLight.intensity = 2.4;
          this.corePulseLight.position.set(0, 4.0, -150);
          this.corePulseLight.color.setHex(0xa855f7);
          this.corePulseLight.intensity = 2.8;
          this.scene.fog.density = 0.0030;
          break;
        case 9: // Summit Observatory: Twilight panoramic horizon with warm solar beacon
          this.ambientLight.color.setHex(0x15223e);
          this.ambientLight.intensity = 2.1;
          this.sunLight.color.setHex(0xf5a623);
          this.sunLight.intensity = 3.4;
          this.corePulseLight.position.set(0, 15, -186);
          this.corePulseLight.color.setHex(0xf5a623);
          this.corePulseLight.intensity = 3.5;
          this.scene.fog.density = 0.0025;
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

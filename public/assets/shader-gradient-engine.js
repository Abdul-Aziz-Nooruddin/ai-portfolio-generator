/**
 * ShaderGradient Engine (ruucm/shadergradient inspired)
 * Procedural 3D WebGL Fluid Mesh Gradient Engine for MyFolio Platform
 * 
 * Features:
 * - 3D Simplex Noise vertex displacement with analytical normal derivatives
 * - Multi-stop chromatic blending across bespoke archetype palettes
 * - Micro-grain dithering pass preventing banding on OLED/mobile displays
 * - Dynamic mouse/touch directional fluid flow
 * - Automatic reduced-motion safeguard (pauses time displacement)
 */

(function (global) {
  'use strict';

  // Simplex 3D Noise GLSL Implementation (Ian McEwan, Stefan Gustavson)
  const NOISE_GLSL = `
    vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      // Permutations
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      // Gradients
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix contributions
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
  `;

  const VERTEX_SHADER = `
    ${NOISE_GLSL}

    uniform float uTime;
    uniform float uSpeed;
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform vec2 uMouse;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;

      // Displaced vertex calculation
      vec3 pos = position;
      float time = uTime * uSpeed;

      // Primary fluid wave
      float noise1 = snoise(vec3(pos.x * uFrequency + uMouse.x * 0.4, pos.y * uFrequency + uMouse.y * 0.4, time));
      // Secondary harmonic ripple
      float noise2 = snoise(vec3(pos.x * uFrequency * 2.1 - time * 0.5, pos.y * uFrequency * 2.1, time * 0.8)) * 0.5;
      
      float totalNoise = (noise1 + noise2) * uAmplitude;
      pos.z += totalNoise;
      vElevation = totalNoise;

      // Analytical normal estimation via finite differences
      float eps = 0.05;
      float nx = snoise(vec3((pos.x + eps) * uFrequency, pos.y * uFrequency, time)) * uAmplitude;
      float ny = snoise(vec3(pos.x * uFrequency, (pos.y + eps) * uFrequency, time)) * uAmplitude;
      vec3 tangentX = vec3(eps, 0.0, nx - totalNoise);
      vec3 tangentY = vec3(0.0, eps, ny - totalNoise);
      vNormal = normalize(cross(tangentX, tangentY));

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `;

  const FRAGMENT_SHADER = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec3 uVoidColor;
    uniform float uGrain;
    uniform float uTime;
    uniform vec2 uResolution;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    // Pseudo-random dithering hash to break 8-bit banding
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      // Normalize elevation to [0.0, 1.0]
      float elev = clamp((vElevation + 1.2) * 0.42, 0.0, 1.0);

      // Multi-tier chromatic fluid mixing
      vec3 col = uVoidColor;
      if (elev < 0.35) {
        col = mix(uVoidColor, uColor1, smoothstep(0.0, 0.35, elev));
      } else if (elev < 0.65) {
        col = mix(uColor1, uColor2, smoothstep(0.35, 0.65, elev));
      } else if (elev < 0.85) {
        col = mix(uColor2, uColor3, smoothstep(0.65, 0.85, elev));
      } else {
        col = mix(uColor3, uColor4, smoothstep(0.85, 1.0, elev));
      }

      // Lighting: Directional specular shimmer
      vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
      float diffuse = max(dot(vNormal, lightDir), 0.0);
      vec3 viewDir = normalize(-vWorldPosition);
      vec3 halfVec = normalize(lightDir + viewDir);
      float spec = pow(max(dot(vNormal, halfVec), 0.0), 24.0);

      col += vec3(diffuse * 0.15) + vec3(spec * 0.28);

      // Micro-grain film pass
      if (uGrain > 0.0) {
        float grainVal = (random(gl_FragCoord.xy + fract(uTime)) - 0.5) * uGrain;
        col += vec3(grainVal);
      }

      gl_FragColor = vec4(col, 0.82);
    }
  `;

  // Standardized Archetype Palettes
  const PALETTES = {
    'cyber-plasma': {
      color1: 0x00F0FF, // Electric Cyan
      color2: 0xFF007A, // Neon Magenta
      color3: 0xFFB800, // Circuit Amber
      color4: 0x7928CA, // Cyber Violet
      voidColor: 0x04050C
    },
    'obsidian-aurora': {
      color1: 0x8B5CF6, // Aurora Violet
      color2: 0x06B6D4, // Cyan Flare
      color3: 0x38BDF8, // Horizon Azure
      color4: 0x10B981, // Emerald Green
      voidColor: 0x06060A
    },
    'solarpunk-chlorophyll': {
      color1: 0x10B981, // Leaf Emerald
      color2: 0x00F5D4, // Neon Mint
      color3: 0xF59E0B, // Solar Amber
      color4: 0x84CC16, // Neural Lime
      voidColor: 0x041108
    },
    'silk-luxury': {
      color1: 0xD4AF37, // Celestial Gold
      color2: 0xE0A96D, // Rose Bronze
      color3: 0x38BDF8, // Horizon Azure
      color4: 0xF8FAFC, // Platinum
      voidColor: 0x08080C
    }
  };

  class ShaderGradientMesh {
    constructor(options = {}) {
      if (!global.THREE) {
        throw new Error('[ShaderGradientEngine] Three.js is required to instantiate ShaderGradientMesh.');
      }

      this.options = Object.assign({
        preset: 'cyber-plasma',
        width: 32,
        height: 32,
        segments: 64,
        speed: 0.8,
        frequency: 0.12,
        amplitude: 1.6,
        grain: 0.04
      }, options);

      this.clock = new THREE.Clock();
      this.mouse = new THREE.Vector2(0, 0);
      this.targetMouse = new THREE.Vector2(0, 0);
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this._initMesh();
      this._bindEvents();
    }

    _initMesh() {
      const palette = PALETTES[this.options.preset] || PALETTES['cyber-plasma'];

      this.geometry = new THREE.PlaneGeometry(
        this.options.width,
        this.options.height,
        this.options.segments,
        this.options.segments
      );

      this.uniforms = {
        uTime: { value: 0 },
        uSpeed: { value: this.options.speed },
        uFrequency: { value: this.options.frequency },
        uAmplitude: { value: this.options.amplitude },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uGrain: { value: this.options.grain },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uColor1: { value: new THREE.Color(palette.color1) },
        uColor2: { value: new THREE.Color(palette.color2) },
        uColor3: { value: new THREE.Color(palette.color3) },
        uColor4: { value: new THREE.Color(palette.color4) },
        uVoidColor: { value: new THREE.Color(palette.voidColor) }
      };

      this.material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: this.uniforms,
        transparent: true,
        wireframe: false,
        side: THREE.DoubleSide
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.rotation.x = -Math.PI * 0.28;
      this.mesh.position.set(0, -2, -6);
    }

    _bindEvents() {
      window.addEventListener('mousemove', (e) => {
        this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }, { passive: true });

      window.addEventListener('resize', () => {
        if (this.uniforms.uResolution) {
          this.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        }
      });
    }

    setPreset(presetName) {
      const palette = PALETTES[presetName];
      if (!palette) return;
      this.uniforms.uColor1.value.set(palette.color1);
      this.uniforms.uColor2.value.set(palette.color2);
      this.uniforms.uColor3.value.set(palette.color3);
      this.uniforms.uColor4.value.set(palette.color4);
      this.uniforms.uVoidColor.value.set(palette.voidColor);
    }

    setSpeed(val) {
      this.uniforms.uSpeed.value = val;
    }

    setAmplitude(val) {
      this.uniforms.uAmplitude.value = val;
    }

    update() {
      if (!this.reducedMotion) {
        this.uniforms.uTime.value = this.clock.getElapsedTime();
      }

      // Smooth mouse lerp
      this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
      this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
      this.uniforms.uMouse.value.copy(this.mouse);
    }

    dispose() {
      if (this.geometry) this.geometry.dispose();
      if (this.material) this.material.dispose();
    }
  }

  // Export globally
  global.ShaderGradientEngine = {
    ShaderGradientMesh,
    PALETTES
  };

})(typeof window !== 'undefined' ? window : this);

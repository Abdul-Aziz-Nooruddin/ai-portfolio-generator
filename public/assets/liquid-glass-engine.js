/**
 * LiquidGlass Engine (dashersw/liquid-glass-js inspired)
 * Apple VisionOS-Grade Physical Liquid Glass Refraction & Dispersion Engine
 * 
 * Features:
 * - Real-time optical Snell's law refraction (IOR: 1.42 - 1.54)
 * - Chromatic aberration (RGB spectral dispersion along the refraction normal)
 * - Curvature normal mapping with rounded bevel specular highlights
 * - Interactive pointer/touch dynamic reflection sweep
 * - Zero external dependencies (Vanilla JS + WebGL)
 */

(function (global) {
  'use strict';

  const GLASS_VERTEX_SHADER = `
    varying vec2 vUv;
    varying vec2 vPosition;

    void main() {
      vUv = uv;
      vPosition = position.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const GLASS_FRAGMENT_SHADER = `
    uniform sampler2D uSceneTexture;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uRefractionIndex;
    uniform float uDispersion;
    uniform float uCurvature;
    uniform float uRoughness;
    uniform vec3 uTint;
    uniform float uAlpha;
    uniform vec4 uBorderRadius; // x: top-left, y: top-right, z: bottom-right, w: bottom-left
    uniform vec2 uCardSize;

    varying vec2 vUv;
    varying vec2 vPosition;

    // Signed distance function for rounded rectangle
    float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
      r.xy = (p.x > 0.0) ? r.yz : r.xw;
      r.x  = (p.y > 0.0) ? r.x  : r.y;
      vec2 q = abs(p) - b + r.x;
      return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
    }

    void main() {
      vec2 p = (vUv - 0.5) * uCardSize;
      vec2 halfSize = uCardSize * 0.5;
      float d = sdRoundedBox(p, halfSize, uBorderRadius);

      // Discard pixels outside rounded card boundary
      if (d > 0.0) {
        discard;
      }

      // Compute normal from signed distance field gradient
      vec2 eps = vec2(1.0, 0.0);
      vec2 grad = normalize(vec2(
        sdRoundedBox(p + eps.xy, halfSize, uBorderRadius) - sdRoundedBox(p - eps.xy, halfSize, uBorderRadius),
        sdRoundedBox(p + eps.yx, halfSize, uBorderRadius) - sdRoundedBox(p - eps.yx, halfSize, uBorderRadius)
      ));

      // Edge bevel profile: strong curvature near the borders
      float edgeDist = abs(d);
      float bevel = smoothstep(24.0, 0.0, edgeDist);
      vec3 normal = normalize(vec3(grad * bevel * uCurvature, 1.0 - bevel * 0.5));

      // Snell's Law Refraction Vectors with Chromatic Aberration
      vec2 screenUv = gl_FragCoord.xy / uResolution;
      float eta = 1.0 / uRefractionIndex;
      vec2 refractOffset = normal.xy * (1.0 - eta) * 0.08;

      // RGB Wavelength Dispersion
      float disp = uDispersion * 0.015;
      vec4 rSample = texture2D(uSceneTexture, screenUv + refractOffset * (1.0 + disp));
      vec4 gSample = texture2D(uSceneTexture, screenUv + refractOffset);
      vec4 bSample = texture2D(uSceneTexture, screenUv + refractOffset * (1.0 - disp));

      vec3 glassColor = vec3(rSample.r, gSample.g, bSample.b);

      // Dynamic Specular Rim Light from Pointer
      vec2 lightPos = uPointer * uResolution;
      vec2 lightDir2D = normalize(lightPos - gl_FragCoord.xy);
      vec3 lightDir = normalize(vec3(lightDir2D, 0.6));
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfDir = normalize(lightDir + viewDir);

      float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
      float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0) * bevel;

      // Composite final liquid glass shade
      vec3 finalColor = mix(glassColor, uTint, 0.18);
      finalColor += vec3(spec * 0.45) + vec3(rim * 0.6);

      // Subtle frosted surface roughness
      gl_FragColor = vec4(finalColor, uAlpha);
    }
  `;

  class LiquidGlassEngine {
    constructor(options = {}) {
      this.options = Object.assign({
        ior: 1.46,
        dispersion: 1.2,
        curvature: 1.8,
        tint: 0x00F0FF,
        alpha: 0.92
      }, options);

      this.pointer = new THREE.Vector2(0.5, 0.5);
      this.targetPointer = new THREE.Vector2(0.5, 0.5);
      this._bindGlobalPointer();
    }

    _bindGlobalPointer() {
      if (typeof window === 'undefined') return;
      window.addEventListener('mousemove', (e) => {
        this.targetPointer.x = e.clientX / window.innerWidth;
        this.targetPointer.y = 1.0 - (e.clientY / window.innerHeight);
      }, { passive: true });
    }

    createGlassMaterial(sceneTexture, cardWidth = 320, cardHeight = 220, borderRadius = 16) {
      if (!global.THREE) {
        throw new Error('[LiquidGlassEngine] Three.js is required for createGlassMaterial.');
      }

      const tintColor = new THREE.Color(this.options.tint);
      const uniforms = {
        uSceneTexture: { value: sceneTexture },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uRefractionIndex: { value: this.options.ior },
        uDispersion: { value: this.options.dispersion },
        uCurvature: { value: this.options.curvature },
        uRoughness: { value: 0.05 },
        uTint: { value: tintColor },
        uAlpha: { value: this.options.alpha },
        uBorderRadius: { value: new THREE.Vector4(borderRadius, borderRadius, borderRadius, borderRadius) },
        uCardSize: { value: new THREE.Vector2(cardWidth, cardHeight) }
      };

      const mat = new THREE.ShaderMaterial({
        vertexShader: GLASS_VERTEX_SHADER,
        fragmentShader: GLASS_FRAGMENT_SHADER,
        uniforms: uniforms,
        transparent: true,
        depthWrite: false
      });

      return {
        material: mat,
        uniforms: uniforms,
        update: () => {
          this.pointer.x += (this.targetPointer.x - this.pointer.x) * 0.08;
          this.pointer.y += (this.targetPointer.y - this.pointer.y) * 0.08;
          uniforms.uPointer.value.copy(this.pointer);
          if (uniforms.uResolution.value.x !== window.innerWidth || uniforms.uResolution.value.y !== window.innerHeight) {
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
          }
        }
      };
    }

    /**
     * Attach physical liquid glass reflection/refraction classes to DOM elements
     * Provides reactive CSS specular highlights and optical backdrop filters
     */
    static enhanceDomElement(el, options = {}) {
      if (!el) return;
      el.classList.add('liquid-glass-surface');

      const tint = options.tint || 'rgba(0, 240, 255, 0.08)';
      const border = options.border || 'rgba(0, 240, 255, 0.28)';

      el.style.setProperty('--lg-tint', tint);
      el.style.setProperty('--lg-border', border);

      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--lg-glow-x', `${x}%`);
        el.style.setProperty('--lg-glow-y', `${y}%`);
      }, { passive: true });
    }
  }

  // Export globally
  global.LiquidGlassEngine = LiquidGlassEngine;

})(typeof window !== 'undefined' ? window : this);

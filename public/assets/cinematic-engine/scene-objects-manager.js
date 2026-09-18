/**
 * MyFolio Studio — Spatial Scene Objects & Real-World Environment Manager
 * Integrates RealWorldVisualGenerator to synthesize authentic physical architecture,
 * alpine terrain, developer workstations, hyperscale server rooms, skybridges,
 * and summit observatories along the continuous 3D camera journey.
 */
(function(window) {
  'use strict';

  class SceneObjectsManager {
    constructor(scene, isMobile, isReducedMotion) {
      this.scene = scene;
      this.isMobile = isMobile;
      this.isReducedMotion = isReducedMotion;

      this.materials = [];
      this.geometries = [];

      // 1. Natural Atmospheric Particle Dust Field (Subtle ambient depth)
      this.initAtmosphericDust();

      // 2. Real-World Visual Generator (Architecture, Terrain, Workstations, Server Room, Skybridge)
      if (typeof window.RealWorldVisualGenerator !== 'undefined') {
        this.realWorldGenerator = new window.RealWorldVisualGenerator(
          this.scene,
          this.isMobile,
          this.isReducedMotion
        );
      } else {
        console.warn('[SceneObjectsManager] RealWorldVisualGenerator not yet loaded, waiting...');
      }
    }

    track(res) {
      if (res.isMaterial) this.materials.push(res);
      if (res.isGeometry || res.isBufferGeometry) this.geometries.push(res);
      return res;
    }

    /* ─── Subtle Atmospheric Dust & Sunlight Motes ──────────────────────────── */
    initAtmosphericDust() {
      const count = this.isMobile ? 250 : 600;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const colorPalette = [
        new THREE.Color(0xfffaed), // Warm Sunlight Mote
        new THREE.Color(0x93c5fd), // Sky Cyan Mote
        new THREE.Color(0xfde68a), // Golden Ray Mote
        new THREE.Color(0xe2e8f0)  // Atmospheric White
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 1] = Math.random() * 80 - 10;
        positions[i * 3 + 2] = 110 - Math.random() * 320;

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geom = this.track(new THREE.BufferGeometry());
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = this.track(new THREE.PointsMaterial({
        size: this.isMobile ? 1.2 : 1.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true
      }));

      this.dustField = new THREE.Points(geom, mat);
      this.scene.add(this.dustField);
    }

    /* ─── Scroll Progress & Animation Loop ──────────────────────────────────── */
    update(scrollProgress, time) {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // 1. Subtle natural drift of atmospheric dust motes
      if (this.dustField && !this.isReducedMotion) {
        this.dustField.rotation.y = time * 0.015;
      }

      // 2. Update Real-World Physical World Generator
      if (this.realWorldGenerator) {
        this.realWorldGenerator.update(p, time);
      }
    }

    dispose() {
      if (this.realWorldGenerator) {
        this.realWorldGenerator.dispose();
      }
      this.geometries.forEach((g) => g.dispose());
      this.materials.forEach((m) => m.dispose());
    }
  }

  window.SceneObjectsManager = SceneObjectsManager;
})(window);

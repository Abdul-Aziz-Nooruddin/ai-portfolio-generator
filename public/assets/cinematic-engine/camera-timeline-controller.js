/**
 * MyFolio Studio — Camera Timeline & Spline Flight Controller
 * Maps continuous scroll progress (0.0 -> 1.0) deterministically to 3D camera
 * position, yaw, pitch, and lookAt targets with smooth cubic easing and mouse parallax.
 */
(function(window) {
  'use strict';

  class CameraTimelineController {
    constructor(aspectRatio) {
      this.isMobile = window.innerWidth <= 768;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 45° FOV on desktop for cinematic compression, 56° on mobile for spatial breathing room
      const fov = this.isMobile ? 56 : 45;
      this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 800);

      // Current smooth coordinates
      this.currentPos = new THREE.Vector3(0, 8, 95);
      this.currentLook = new THREE.Vector3(0, 0, 0);

      // Target coordinates
      this.targetPos = new THREE.Vector3(0, 8, 95);
      this.targetLook = new THREE.Vector3(0, 0, 0);

      // Mouse Parallax
      this.mouseX = 0;
      this.mouseY = 0;
      this.smoothMouseX = 0;
      this.smoothMouseY = 0;

      // 10 Key Waypoints traveling through the real-world architectural campus:
      // progress: [0.0 -> 1.0]
      this.waypoints = [
        { progress: 0.00, pos: [0, 9, 95],     look: [0, 2, 40] },      // 00 Hero: Panoramic Valley & Research Campus
        { progress: 0.12, pos: [0, 6, 75],     look: [0, 3, 25] },      // 01 Roadway: Approaching Contemporary Pavilion
        { progress: 0.22, pos: [6, 3.8, 56],   look: [0, 2, 36] },      // 02 Plaza: Entrance Steps & Slate Paving
        { progress: 0.32, pos: [-2, 2.8, 40],  look: [0, 1.8, 16] },    // 03 Atrium: Reception Lounge & Terminals
        { progress: 0.44, pos: [0, 1.6, 22],   look: [0, 1.2, -6] },    // 04 Studio: Computational Synthesis Lab
        { progress: 0.55, pos: [0, 2.5, 6],    look: [0, 2.0, -22] },   // 05 Living Hub: Biophilic Glass Pavilion
        { progress: 0.67, pos: [0, 1.8, -22],  look: [0, 1.2, -45] },   // 06 Projects: Walking Developer Lab Aisle
        { progress: 0.78, pos: [0, 2.2, -54],  look: [0, 2.0, -72] },   // 07 Data Center: Hyperscale Server Rack Corridor
        { progress: 0.88, pos: [0, 2.8, -84],  look: [0, 2.2, -112] },  // 08 Skybridge: Suspended Glass Bridge Walkway
        { progress: 0.94, pos: [0, 3.5, -125], look: [0, 2.5, -150] },  // 09 Gallery: Architectural Exhibition Pavilion
        { progress: 1.00, pos: [0, 15, -158],  look: [0, 8, -188] }     // 10 Summit: Panoramic Observatory & Beacon Terrace
      ];

      this.initMouseListener();
    }

    initMouseListener() {
      if (this.isReducedMotion) return;

      window.addEventListener('mousemove', (e) => {
        this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });
    }

    handleResize(aspectRatio) {
      this.isMobile = window.innerWidth <= 768;
      this.camera.aspect = aspectRatio;
      this.camera.fov = this.isMobile ? 56 : 45;
      this.camera.updateProjectionMatrix();
    }

    /**
     * Interpolates waypoints based on normalized scroll progress (0.0 - 1.0)
     */
    update(scrollProgress, immediate = false) {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // Find waypoint bracket
      let prevWp = this.waypoints[0];
      let nextWp = this.waypoints[this.waypoints.length - 1];

      for (let i = 0; i < this.waypoints.length - 1; i++) {
        if (p >= this.waypoints[i].progress && p <= this.waypoints[i + 1].progress) {
          prevWp = this.waypoints[i];
          nextWp = this.waypoints[i + 1];
          break;
        }
      }

      // Smooth step factor between the two waypoints
      const span = nextWp.progress - prevWp.progress || 1;
      const rawT = (p - prevWp.progress) / span;
      // Cubic-bezier smooth hermite interpolation: 3t^2 - 2t^3
      const t = rawT * rawT * (3 - 2 * rawT);

      // Compute target position and lookAt
      this.targetPos.set(
        prevWp.pos[0] + (nextWp.pos[0] - prevWp.pos[0]) * t,
        prevWp.pos[1] + (nextWp.pos[1] - prevWp.pos[1]) * t,
        prevWp.pos[2] + (nextWp.pos[2] - prevWp.pos[2]) * t
      );

      this.targetLook.set(
        prevWp.look[0] + (nextWp.look[0] - prevWp.look[0]) * t,
        prevWp.look[1] + (nextWp.look[1] - prevWp.look[1]) * t,
        prevWp.look[2] + (nextWp.look[2] - prevWp.look[2]) * t
      );

      // Smooth mouse parallax damping
      this.smoothMouseX += (this.mouseX - this.smoothMouseX) * 0.05;
      this.smoothMouseY += (this.mouseY - this.smoothMouseY) * 0.05;

      const parallaxFactorX = this.isMobile ? 0.8 : 2.8;
      const parallaxFactorY = this.isMobile ? 0.5 : 1.8;

      const px = this.targetPos.x + this.smoothMouseX * parallaxFactorX;
      const py = this.targetPos.y - this.smoothMouseY * parallaxFactorY;
      const pz = this.targetPos.z;

      if (immediate || this.isReducedMotion) {
        this.camera.position.set(px, py, pz);
        this.camera.lookAt(this.targetLook);
      } else {
        // Continuous organic damping
        this.camera.position.x += (px - this.camera.position.x) * 0.12;
        this.camera.position.y += (py - this.camera.position.y) * 0.12;
        this.camera.position.z += (pz - this.camera.position.z) * 0.12;

        this.currentLook.lerp(this.targetLook, 0.12);
        this.camera.lookAt(this.currentLook);
      }
    }
  }

  window.CameraTimelineController = CameraTimelineController;
})(window);

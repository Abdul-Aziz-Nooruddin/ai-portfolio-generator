/**
 * WebGL & Motion Architecture with Universe-Specific Motion Profiles
 * Authors high-performance GSAP 3.12+ motion choreography and selective Three.js scenes.
 * Adapts duration, stagger, and easing curves based on the selected Motion Profile.
 * Guarantees strict prefers-reduced-motion compliance.
 */

const { MOTION_LANGUAGES } = require('./motion-profiles');

class WebGLMotion {
  /**
   * Generates motion scripts and libraries tailored to the visual universe, IA model, and motion profile
   */
  static getMotionCode(visualUniverse = {}, iaModel = {}, motionProfile = null) {
    const universeId = visualUniverse.id || 'technical-lab';
    const universeToLanguage = {
      'cinematic-obsidian': 'cinematic-drift',
      'brutalist-pop': 'brutalist-snap',
      'swiss-editorial': 'editorial-reveal',
      'technical-lab': 'technical-stagger',
      'futuristic-spatial': 'spatial-orbit',
      'monochrome-gallery': 'typographic-reveal',
      'luxury-minimal': 'slow-luxury'
    };

    const defaultLanguageId = universeToLanguage[universeId] || 'technical-stagger';
    const profile = motionProfile || MOTION_LANGUAGES[defaultLanguageId] || MOTION_LANGUAGES['technical-stagger'];
    const isSpatialOrDark = visualUniverse.theme === 'dark' && profile.webglAllowed;

    // Core GSAP Micro-Interactions Script using selected Motion Profile
    const gsapScript = `
      // GSAP 3.12+ Motion Profile: '${profile.name}'
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof gsap !== 'undefined') {
          // Check prefers-reduced-motion
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
          }

          gsap.from('.layout-root > *', {
            opacity: 0,
            y: ${profile.yOffset || 20},
            x: ${profile.xOffset || 0},
            duration: ${profile.duration || 0.7},
            stagger: ${profile.stagger || 0.08},
            ease: '${profile.ease || 'power2.out'}'
          });

          // 3D Card Hover Physics
          document.querySelectorAll('.filmstrip-card, .mosaic-project-item, .spatial-orbit-pod, .canvas-project-module, .dossier-node, .article-chapter-node').forEach(card => {
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = \`perspective(1000px) rotateX(\${-y * ${profile.tiltSensitivity || 0.02}}deg) rotateY(\${x * ${profile.tiltSensitivity || 0.02}}deg) scale3d(${profile.hoverScale || 1.015}, ${profile.hoverScale || 1.015}, ${profile.hoverScale || 1.015})\`;
            });
            card.addEventListener('mouseleave', () => {
              card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
          });
        }
      });
    `;

    if (!isSpatialOrDark) {
      return {
        profileId: profile.id,
        profileName: profile.id,
        profileTitle: profile.name,
        libraries: `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>`,
        js: gsapScript,
        canvasHtml: ''
      };
    }

    // Three.js WebGL Spatial Canvas for Dark / Spatial Universes
    const primaryHex = (visualUniverse.colors?.primary || '#38bdf8').replace('#', '0x');
    const accentHex = (visualUniverse.colors?.accent || '#818cf8').replace('#', '0x');
    const isTorus = profile.webglGeometry === 'TorusKnot';

    const threeJsScript = `
      ${gsapScript}

      // Three.js WebGL Spatial Canvas (${profile.webglGeometry})
      (function() {
        if (typeof THREE === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = document.getElementById('webgl-canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 24;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Ambient & Dynamic Point Lights
        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambient);

        const pointLight1 = new THREE.PointLight(${primaryHex}, 3, 50);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(${accentHex}, 2.5, 45);
        pointLight2.position.set(-10, -10, 8);
        scene.add(pointLight2);

        // Core 3D Mesh
        const geometry = ${isTorus ? 'new THREE.TorusKnotGeometry(7, 2.2, 120, 18)' : 'new THREE.IcosahedronGeometry(7, 2)'};
        const material = new THREE.MeshPhysicalMaterial({
          color: ${primaryHex},
          emissive: ${accentHex},
          emissiveIntensity: 0.15,
          roughness: 0.18,
          metalness: 0.85,
          clearcoat: 0.8,
          wireframe: ${!isTorus}
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(window.innerWidth > 900 ? 9 : 0, 0, 0);
        scene.add(mesh);

        let animationFrameId;
        function animate() {
          animationFrameId = requestAnimationFrame(animate);
          mesh.rotation.x += 0.003;
          mesh.rotation.y += 0.005;
          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          mesh.position.set(window.innerWidth > 900 ? 9 : 0, 0, 0);
        });
      })();
    `;

    return {
      profileId: profile.id,
      profileName: profile.id,
      profileTitle: profile.name,
      libraries: `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
      `,
      js: threeJsScript,
      canvasHtml: `<div id="webgl-canvas-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; opacity: 0.85;"></div>`
    };
  }
}

module.exports = { WebGLMotion };

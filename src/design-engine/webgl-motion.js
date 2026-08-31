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
    const universeId = visualUniverse.id || 'cosmic-astronaut-holographic';
    const universeToLanguage = {
      'cosmic-astronaut-holographic': 'cosmic-astronaut-drift',
      'cinematic-obsidian': 'cinematic-drift',
      'brutalist-pop': 'brutalist-snap',
      'swiss-editorial': 'editorial-reveal',
      'technical-lab': 'technical-stagger',
      'futuristic-spatial': 'spatial-orbit',
      'monochrome-gallery': 'typographic-reveal',
      'luxury-minimal': 'slow-luxury'
    };

    const defaultLanguageId = universeToLanguage[universeId] || 'cosmic-astronaut-drift';
    const profile = motionProfile || MOTION_LANGUAGES[defaultLanguageId] || MOTION_LANGUAGES['cosmic-astronaut-drift'];
    const isSpatialOrDark = (visualUniverse.theme === 'dark' || universeId === 'cosmic-astronaut-holographic') && profile.webglAllowed;

    // Core GSAP Micro-Interactions Script using selected Motion Profile
    const gsapScript = `
      // GSAP 3.12+ Motion Profile: '${profile.name}'
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof gsap !== 'undefined') {
          // Check prefers-reduced-motion
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
          }

          gsap.from('.cosmic-hero-content, .cosmic-section-header, .cosmic-card', {
            opacity: 0,
            y: ${profile.yOffset || 24},
            duration: ${profile.duration || 0.75},
            stagger: 0.04,
            ease: '${profile.ease || 'power2.out'}',
            clearProps: 'all'
          });

          // 3D Card Hover Physics
          document.querySelectorAll('.cosmic-card, .filmstrip-card, .mosaic-project-item, .spatial-orbit-pod, .canvas-project-module, .dossier-node, .article-chapter-node').forEach(card => {
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = \`perspective(1000px) rotateX(\${-y * 0.02}deg) rotateY(\${x * 0.02}deg) scale3d(1.02, 1.02, 1.02)\`;
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

    // Three.js WebGL Spatial Canvas for Cosmic / Dark Universes
    const primaryHex = (visualUniverse.colors?.primary || '#8b5cf6').replace('#', '0x');
    const accentHex = (visualUniverse.colors?.accent || '#38bdf8').replace('#', '0x');
    const isCosmicAstronaut = universeId === 'cosmic-astronaut-holographic' || profile.id === 'cosmic-astronaut-drift' || profile.webglGeometry === 'AstronautPlanet';
    const isTorus = profile.webglGeometry === 'TorusKnot';

    const cosmicOrSpatialScript = isCosmicAstronaut ? `
      ${gsapScript}

      // Three.js Cosmic Starfield & Stardust Nebula Experience (Non-obstructive)
      (function() {
        if (typeof THREE === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = document.getElementById('webgl-canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 30);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 1. Cosmic Starfield Particles
        const starGeo = new THREE.BufferGeometry();
        const starCount = 1200;
        const starPos = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
          starPos[i] = (Math.random() - 0.5) * 160;
          starPos[i + 1] = (Math.random() - 0.5) * 160;
          starPos[i + 2] = (Math.random() - 0.5) * 160;

          const r = Math.random();
          if (r > 0.6) {
            starColors[i] = 0.55; starColors[i + 1] = 0.36; starColors[i + 2] = 0.96; // Purple
          } else if (r > 0.3) {
            starColors[i] = 0.22; starColors[i + 1] = 0.74; starColors[i + 2] = 0.97; // Cyan
          } else {
            starColors[i] = 1.0; starColors[i + 1] = 1.0; starColors[i + 2] = 1.0; // White
          }
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        const starMat = new THREE.PointsMaterial({
          size: 0.85,
          vertexColors: true,
          transparent: true,
          opacity: 0.65
        });
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        // 2. Ambient Lights
        const ambient = new THREE.AmbientLight(0x2d1b69, 1.5);
        scene.add(ambient);

        // Mouse Parallax
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Resize handler
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation Loop
        let clock = new THREE.Clock();
        function animate() {
          requestAnimationFrame(animate);
          const t = clock.getElapsedTime();

          ringMesh.rotation.z = t * 0.02;

          // Astronaut zero-g floating hover physics
          astronautGroup.position.y = Math.sin(t * 1.6) * 0.55;
          astronautGroup.rotation.y = mouseX * 0.45 + Math.sin(t * 0.8) * 0.15;
          astronautGroup.rotation.x = -mouseY * 0.35 + Math.cos(t * 1.1) * 0.08;
          astronautGroup.rotation.z = Math.sin(t * 0.9) * 0.06;

          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          const isWide = window.innerWidth > 960;
          planetGroup.position.set(isWide ? 11 : 0, 1.5, -4);
          astronautGroup.position.set(isWide ? 9.5 : 0, 0, 6);
        });
      })();
    ` : `
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
      js: cosmicOrSpatialScript,
      canvasHtml: `<div id="webgl-canvas-container" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; opacity: 0.95;"></div>`
    };
  }
}

module.exports = { WebGLMotion };

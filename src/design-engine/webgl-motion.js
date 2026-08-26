/**
 * WebGL & Motion Architecture
 * Selectively injects high-performance Three.js scenes and GSAP 3.12+ motion curves.
 * Only applies 3D when it enhances the chosen aesthetic universe (no gratuitous WebGL).
 */

class WebGLMotion {
  static getMotionCode(visualUniverse, iaModel) {
    const isSpatialOrDark = visualUniverse.theme === 'dark' || iaModel.id === 'spatial-3d-stage' || visualUniverse.id === 'futuristic-spatial';
    
    // Core GSAP Micro-Interactions Script
    const gsapScript = `
      // GSAP 3.12+ Micro-Interactions & Scroll Animations
      document.addEventListener('DOMContentLoaded', () => {
        if (typeof gsap !== 'undefined') {
          gsap.from('.layout-root > *', {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out'
          });

          // 3D Card Hover Physics
          document.querySelectorAll('.filmstrip-card, .mosaic-project-item, .spatial-orbit-pod, .canvas-project-module').forEach(card => {
            card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = \`perspective(1000px) rotateX(\${-y * 0.03}deg) rotateY(\${x * 0.03}deg) scale3d(1.015, 1.015, 1.015)\`;
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
        libraries: `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>`,
        js: gsapScript,
        canvasHtml: ''
      };
    }

    // Three.js WebGL Spatial Canvas for Dark / Spatial Universes
    const primaryHex = visualUniverse.colors.primary.replace('#', '0x');
    const accentHex = (visualUniverse.colors.accent || '#38bdf8').replace('#', '0x');
    const isPeachSpatial = visualUniverse.id === 'futuristic-spatial';

    const threeJsScript = `
      ${gsapScript}

      // Three.js WebGL Spatial Canvas
      (function() {
        if (typeof THREE === 'undefined') return;
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

        // Core 3D Mesh (Torus Knot / Geodesic Sphere)
        const geometry = ${isPeachSpatial ? 'new THREE.TorusKnotGeometry(7, 2.2, 120, 18)' : 'new THREE.IcosahedronGeometry(7, 2)'};
        const material = new THREE.MeshPhysicalMaterial({
          color: ${primaryHex},
          emissive: ${accentHex},
          emissiveIntensity: 0.15,
          roughness: 0.18,
          metalness: 0.85,
          clearcoat: 0.8,
          wireframe: ${!isPeachSpatial}
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(window.innerWidth > 900 ? 9 : 0, 0, 0);
        scene.add(mesh);

        // Particle Mist
        const particleCount = 180;
        const partGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 60;
        }
        partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const partMat = new THREE.PointsMaterial({
          size: 0.18,
          color: ${accentHex},
          transparent: true,
          opacity: 0.4
        });
        const particles = new THREE.Points(partGeo, partMat);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        let scrollY = 0;
        window.addEventListener('scroll', () => {
          scrollY = window.scrollY;
        });

        function animate() {
          requestAnimationFrame(animate);
          mesh.rotation.x += 0.003;
          mesh.rotation.y += 0.005;
          mesh.position.x = (window.innerWidth > 900 ? 9 : 0) + mouseX * 1.5;
          mesh.position.y = -mouseY * 1.5 - (scrollY * 0.005);
          camera.position.z = 24 - Math.min(scrollY * 0.01, 8);
          particles.rotation.y += 0.0008;
          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      })();
    `;

    return {
      libraries: `
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
      `,
      js: threeJsScript,
      canvasHtml: `<div id="webgl-canvas-container" style="position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.7;"></div>`
    };
  }
}

module.exports = { WebGLMotion };

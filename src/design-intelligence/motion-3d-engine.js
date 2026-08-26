/**
 * Motion, 3D Architecture, Spatial Environment & Micro-Interaction Engine
 * Resolves 22+ 3D Scenes, 8 Motion Families, 17+ Background Treatments,
 * 12+ Section Transitions, Spacing, Borders, Cursors, and Footers.
 */

const THREE_SCENE_ARCHITECTURES = [
  { id: 'none-pure-2d', name: 'Pure 2D Typographic Architecture (Zero 3D Distortion)', category: '2D' },
  { id: 'particles-dust', name: 'Ambient Atmospheric Particle Field & Depth Drift', category: 'Ambient' },
  { id: 'fluid-simulation', name: 'GPU-Computed Navier-Stokes Fluid Simulation', category: 'Simulation' },
  { id: 'metaballs-organic', name: 'Raymarched Organic Metaball Liquid Blobs', category: 'Raymarching' },
  { id: 'procedural-terrain', name: 'Perlin-Noise Vector Wireframe Terrain Grid', category: 'Wireframe' },
  { id: 'point-cloud-lidar', name: 'Architectural LiDAR Point Cloud Scan', category: 'Point Cloud' },
  { id: 'abstract-geometry', name: 'Floating Platonian Solids & Dynamic Shadow Casting', category: 'Geometry' },
  { id: 'wireframe-architecture', name: 'Isometric CAD Structural Wireframe Skeleton', category: 'Wireframe' },
  { id: 'cloth-simulation', name: 'Verlet-Integrated Silk Cloth Flutter Simulation', category: 'Simulation' },
  { id: 'shader-gradient-mesh', name: 'GLSL Chromatic Gradient Fluid Mesh', category: 'Shaders' },
  { id: 'noise-field-flow', name: 'Simplex Vector Noise Vector Curl Flow Field', category: 'Particles' },
  { id: 'liquid-distortion', name: 'Screen-Space Liquid Refraction & Ripple Distortion', category: 'Shaders' },
  { id: 'glass-sculpture', name: 'Transmission & Caustic Glass Icosahedron Sculpture', category: 'Glass' },
  { id: 'orbital-system', name: 'Gyroscopic Multi-Axis Planetary Orbital Rings', category: 'Orbital' },
  { id: 'neural-network', name: 'Synaptic Graph Node Constellation with Pulse Beams', category: 'Network' },
  { id: 'constellation-graph', name: 'Interactive Celestial Node & Star Chart Matrix', category: 'Network' },
  { id: 'typographic-3d', name: 'Extruded 3D Kinetic Typographic Mesh Letters', category: 'Typography' },
  { id: 'physics-rigid-bodies', name: 'Cannon-Engine Interactive Gravity Physics Blocks', category: 'Physics' },
  { id: 'generative-topology', name: 'Dynamic Topographical Contour Heightfield', category: 'Procedural' },
  { id: 'image-displacement', name: 'Depth-Map WebGL RGB Displaced Photo Plane', category: 'Shaders' },
  { id: 'interactive-torus-refraction', name: 'Refractive Glass Torus Knot & Specular Lights', category: 'Glass' },
  { id: 'webgl-depth-gallery', name: 'Tunnel Depth Perspective Orthographic Gallery', category: 'Perspective' }
];

const MOTION_FAMILIES = [
  { id: 'editorial-reveal', name: 'Editorial (Masked typography, slow clip-path reveals, stagger fades)', family: 'Editorial' },
  { id: 'mechanical-snapping', name: 'Mechanical (Rigid stepped movement, monospace terminal cursor typing, 0ms snap)', family: 'Mechanical' },
  { id: 'fluid-spring', name: 'Fluid (Spring physics, liquid inertia, organic deformation on hover)', family: 'Fluid' },
  { id: 'cinematic-pan', name: 'Cinematic (Long bezier cubic easing, camera dolly-in, layered depth parallax)', family: 'Cinematic' },
  { id: 'playful-elastic', name: 'Playful (Overshoot bounce, springy micro-interactions, cursor sticker magnetism)', family: 'Playful' },
  { id: 'brutalist-instant', name: 'Brutalist (Instant cut transitions, heavy marquee ticker, zero damping)', family: 'Brutalist' },
  { id: 'minimal-quiet', name: 'Minimal (Subtle 0.15s opacity shifts, serene stillness, zero gratuitous motion)', family: 'Minimal' },
  { id: 'experimental-glitch', name: 'Experimental (Kinetic skewing, chromatic aberration jitter, non-linear scroll)', family: 'Experimental' }
];

const BACKGROUND_TREATMENTS = [
  'paper-wabi-sabi',
  'raw-canvas-linen',
  'editorial-crisp-white',
  'monochrome-obsidian',
  'photographic-atmospheric-wash',
  'gradient-mesh-aurora',
  'noise-texture-grain',
  'architectural-grid-field',
  'blueprint-cyan-cad',
  'terminal-crt-scanline',
  'atmospheric-deep-fog',
  'procedural-glsl-shader',
  'brutalist-flat-pigment',
  'brushed-metallic-titanium',
  'frosted-glass-backdrop',
  'pure-whitespace-monograph',
  'slate-nordic-stone'
];

const SECTION_TRANSITIONS = [
  'horizontal-runway-pan',
  'full-screen-curtain-wipe',
  'overlapping-layer-stack',
  'diagonal-angular-slice',
  'pinned-sticky-scroll',
  'continuous-infinite-canvas',
  'chapter-monograph-divider',
  'typography-hero-takeover',
  'image-portal-zoom',
  '3d-camera-perspective-orbit',
  'split-screen-accordion',
  'seamless-subtle-hairline'
];

const SPACING_SYSTEMS = [
  'compact-monograph',
  'expansive-atelier',
  'asymmetric-modular',
  'golden-ratio-scale',
  'dense-technical-grid',
  'fluid-dynamic-viewport',
  'minimal-padded-serenity',
  'architectural-swiss-12col'
];

const BORDER_LANGUAGES = [
  'hairline-solid-subtle',
  'heavy-4px-brutalist-solid',
  'dotted-architectural-cad',
  'zero-border-pure-organic',
  'frosted-glass-bevel',
  'double-frame-atelier',
  'hard-offset-shadow-border',
  'subtle-emerald-glow'
];

const IMAGE_TREATMENTS = [
  'duotone-film-grain',
  'raw-natural-editorial',
  'high-contrast-monochrome',
  'desaturated-muted-matte',
  'glass-refraction-blur',
  'neo-pop-saturated-chroma',
  'architectural-blueprint-invert',
  'warm-sepia-atelier'
];

const CURSOR_BEHAVIORS = [
  'default-clean',
  'magnetic-spotlight',
  'monospace-crosshair',
  'fluid-blob-follower',
  'trailing-stardust-particle',
  'inverted-circular-lens'
];

const BUTTON_LANGUAGES = [
  'pill-capsule-solid',
  'sharp-brutalist-black-block',
  'underline-ghost-link',
  'minimalist-hairline-border',
  'gradient-glow-shimmer',
  'monospace-terminal-prompt'
];

const FOOTER_ARCHITECTURES = [
  'roman-atelier-colophon',
  'monograph-minimal-line',
  'terminal-system-reboot-shell',
  'massive-typographic-signoff',
  'split-column-curated-directory',
  'multi-tier-bento-footer'
];

class Motion3DEngine {
  constructor() {
    this.history = [];
  }

  resolve(mode = 'swiss-grid-minimal', narrative = '', recent3D = [], recentMotion = []) {
    const m = (mode || '').toLowerCase();

    // 1. Determine 3D Scene Eligibility (Diverse pool of 22 scenes, with deliberate 2D selections)
    const isExplicitMinimal = m.includes('swiss') || m.includes('japanese') || m.includes('minimal') || m.includes('monograph');
    const isExplicit3D = m.includes('spatial') || m.includes('futuristic') || m.includes('3d') || m.includes('cyber');

    let eligible3D = [...THREE_SCENE_ARCHITECTURES];

    // Exclude recently used 3D scenes to prevent dodecahedron/torus repetition
    const recent3DIds = recent3D.map(r => typeof r === 'string' ? r : r?.type).filter(Boolean);
    const last3D = recent3DIds[0] || null;
    if (last3D) {
      eligible3D = eligible3D.filter(s => s.id !== last3D);
    }

    let selected3D;
    if (isExplicitMinimal && Math.random() < 0.65) {
      selected3D = THREE_SCENE_ARCHITECTURES[0]; // 'none-pure-2d'
    } else if (isExplicit3D) {
      const spatialPool = eligible3D.filter(s => s.id !== 'none-pure-2d');
      selected3D = spatialPool[Math.floor(Math.random() * spatialPool.length)] || THREE_SCENE_ARCHITECTURES[1];
    } else {
      // Varied selection from full pool
      selected3D = eligible3D[Math.floor(Math.random() * eligible3D.length)];
    }

    // 2. Resolve Motion Family
    let eligibleMotion = [...MOTION_FAMILIES];
    const recentMotionIds = recentMotion.map(r => typeof r === 'string' ? r : r?.id).filter(Boolean);
    const lastMotion = recentMotionIds[0] || null;
    if (lastMotion) {
      eligibleMotion = eligibleMotion.filter(mf => mf.id !== lastMotion);
    }

    let motion;
    if (m.includes('terminal')) {
      motion = MOTION_FAMILIES.find(f => f.id === 'mechanical-snapping') || MOTION_FAMILIES[1];
    } else if (m.includes('editorial') || m.includes('luxury')) {
      motion = MOTION_FAMILIES.find(f => f.id === 'editorial-reveal') || MOTION_FAMILIES[0];
    } else if (m.includes('brutalist')) {
      motion = MOTION_FAMILIES.find(f => f.id === 'brutalist-instant') || MOTION_FAMILIES[5];
    } else if (m.includes('japanese') || m.includes('minimal')) {
      motion = MOTION_FAMILIES.find(f => f.id === 'minimal-quiet') || MOTION_FAMILIES[6];
    } else if (m.includes('spatial') || m.includes('futuristic')) {
      motion = MOTION_FAMILIES.find(f => f.id === 'cinematic-pan') || MOTION_FAMILIES[3];
    } else {
      motion = eligibleMotion[Math.floor(Math.random() * eligibleMotion.length)];
    }

    // 3. Resolve Background Treatment
    let bgTreatment = BACKGROUND_TREATMENTS[Math.floor(Math.random() * BACKGROUND_TREATMENTS.length)];
    if (m.includes('japanese')) bgTreatment = 'paper-wabi-sabi';
    else if (m.includes('terminal')) bgTreatment = 'terminal-crt-scanline';
    else if (m.includes('brutalist')) bgTreatment = 'brutalist-flat-pigment';
    else if (m.includes('luxury')) bgTreatment = 'monochrome-obsidian';
    else if (m.includes('spatial')) bgTreatment = 'atmospheric-deep-fog';

    // 4. Resolve Section Transition
    const sectionTransition = SECTION_TRANSITIONS[Math.floor(Math.random() * SECTION_TRANSITIONS.length)];

    // 5. Micro-Interactions & Styling Systems
    const spacingSystem = SPACING_SYSTEMS[Math.floor(Math.random() * SPACING_SYSTEMS.length)];
    const borderLanguage = BORDER_LANGUAGES[Math.floor(Math.random() * BORDER_LANGUAGES.length)];
    const imageTreatment = IMAGE_TREATMENTS[Math.floor(Math.random() * IMAGE_TREATMENTS.length)];
    const cursorBehavior = CURSOR_BEHAVIORS[Math.floor(Math.random() * CURSOR_BEHAVIORS.length)];
    const buttonLanguage = BUTTON_LANGUAGES[Math.floor(Math.random() * BUTTON_LANGUAGES.length)];
    const footerArchitecture = FOOTER_ARCHITECTURES[Math.floor(Math.random() * FOOTER_ARCHITECTURES.length)];

    return {
      threeScene: {
        enabled: selected3D.id !== 'none-pure-2d',
        type: selected3D.id,
        name: selected3D.name,
        category: selected3D.category
      },
      motionLanguage: motion.id,
      motionName: motion.name,
      motionFamily: motion.family,
      backgroundTreatment: bgTreatment,
      sectionTransition,
      spacingSystem,
      borderLanguage,
      imageTreatment,
      cursorBehavior,
      buttonLanguage,
      footerArchitecture
    };
  }

  generateGsapRuntimeScript(motionProfile = {}) {
    return `
    /* =========================================================================
     * GreenSock (GSAP 3.x) & ScrollTrigger Responsive Animation Engine
     * ========================================================================= */
    (function() {
      if (typeof gsap === 'undefined') return;
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      var mm = (typeof gsap.matchMedia === 'function') ? gsap.matchMedia() : null;

      // 1. Initial Staggered Hero Entrance Timeline
      var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      var heroBadges = document.querySelectorAll('.hero-badge, .header-badge, .status-pill');
      var heroTitles = document.querySelectorAll('h1, .hero-title, .monograph-name, .headline');
      var heroSubtitles = document.querySelectorAll('.hero-subtext, .tagline, .lead-paragraph');
      var heroCtas = document.querySelectorAll('.cta-btn, .btn-primary, .social-pill, .btn-action');

      if (heroBadges.length) heroTl.fromTo(heroBadges, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.6 });
      if (heroTitles.length) heroTl.fromTo(heroTitles, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.35');
      if (heroSubtitles.length) heroTl.fromTo(heroSubtitles, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.4');
      if (heroCtas.length) heroTl.fromTo(heroCtas, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.08 }, '-=0.3');

      // 2. ScrollTrigger Reveal for Project Cards & Section Blocks
      if (typeof ScrollTrigger !== 'undefined') {
        var revealCards = document.querySelectorAll('.project-card, .spec-card, .catalog-card, .timeline-item, .bento-cell, .skill-tag');
        revealCards.forEach(function(card) {
          gsap.fromTo(card,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
              }
            }
          );
        });

        // Background WebGL Layer Scrubbing
        var canvasLayer = document.getElementById('webgl-canvas') || document.querySelector('canvas');
        if (canvasLayer) {
          gsap.to(canvasLayer, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: 'body',
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.2
            }
          });
        }
      }

      // 3. Desktop Magnetic Button Interactions
      if (mm) {
        mm.add('(min-width: 768px)', function() {
          var magneticBtns = document.querySelectorAll('button, .cta-btn, .btn, a.btn-action');
          magneticBtns.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
              var rect = btn.getBoundingClientRect();
              var x = (e.clientX - rect.left - rect.width / 2) * 0.25;
              var y = (e.clientY - rect.top - rect.height / 2) * 0.25;
              gsap.to(btn, { x: x, y: y, duration: 0.25, ease: 'power1.out' });
            });
            btn.addEventListener('mouseleave', function() {
              gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
            });
          });
        });
      }
    })();
    `;
  }
}

module.exports = {
  Motion3DEngine,
  THREE_SCENE_ARCHITECTURES,
  MOTION_FAMILIES,
  BACKGROUND_TREATMENTS,
  SECTION_TRANSITIONS,
  SPACING_SYSTEMS,
  BORDER_LANGUAGES,
  IMAGE_TREATMENTS,
  CURSOR_BEHAVIORS,
  BUTTON_LANGUAGES,
  FOOTER_ARCHITECTURES
};

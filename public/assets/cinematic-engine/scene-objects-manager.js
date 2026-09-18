/**
 * MyFolio Studio — Spatial Scene Objects & 3D Environment Manager
 * Constructs and animates all physical 3D objects, celestial terrain, project planetoids,
 * skill networks, basalt GitHub mountain, time corridors, and universe portals.
 */
(function(window) {
  'use strict';

  class SceneObjectsManager {
    constructor(scene, isMobile, isReducedMotion) {
      this.scene = scene;
      this.isMobile = isMobile;
      this.isReducedMotion = isReducedMotion;

      this.groups = {};
      this.materials = [];
      this.geometries = [];

      this.initStarfield();
      this.initHeroWorld();
      this.initDataFragments();
      this.initSynthesisGrid();
      this.initPortfolioWorld();
      this.initProjectPlanetoids();
      this.initSkillNetwork();
      this.initGitHubMountain();
      this.initTimeCorridor();
      this.initUniverseGateway();
      this.initFinalBeacon();
    }

    track(res) {
      if (res.isMaterial) this.materials.push(res);
      if (res.isGeometry || res.isBufferGeometry) this.geometries.push(res);
      return res;
    }

    /* ─── 0. Universal Volumetric Starfield ─────────────────────────────────── */
    initStarfield() {
      const count = this.isMobile ? 450 : 1200;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      const colorPalette = [
        new THREE.Color(0x38bdf8), // Cyan
        new THREE.Color(0xbae6fd), // Ice Blue
        new THREE.Color(0xf5a623), // Solar Amber
        new THREE.Color(0x8b5cf6), // Violet
        new THREE.Color(0xffffff)  // Pure Starlight
      ];

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 260;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 220;
        positions[i * 3 + 2] = 120 - Math.random() * 380;

        const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3 + 0] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geom = this.track(new THREE.BufferGeometry());
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const mat = this.track(new THREE.PointsMaterial({
        size: this.isMobile ? 1.6 : 2.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true
      }));

      this.starfield = new THREE.Points(geom, mat);
      this.scene.add(this.starfield);
    }

    /* ─── 1. Hero World Core & Atmosphere ──────────────────────────────────── */
    initHeroWorld() {
      this.heroGroup = new THREE.Group();
      this.heroGroup.position.set(0, 0, 0);

      // Central Celestial Sphere
      const sphereGeom = this.track(new THREE.SphereGeometry(18, 36, 36));
      const sphereMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0a1c3d,
        roughness: 0.35,
        metalness: 0.65,
        emissive: 0x051329,
        emissiveIntensity: 0.8
      }));
      this.heroSphere = new THREE.Mesh(sphereGeom, sphereMat);
      this.heroGroup.add(this.heroSphere);

      // Outer Holographic Wireframe Shell
      const wireGeom = this.track(new THREE.IcosahedronGeometry(20.5, 2));
      const wireMat = this.track(new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      }));
      this.heroWireShell = new THREE.Mesh(wireGeom, wireMat);
      this.heroGroup.add(this.heroWireShell);

      // Celestial Ring 1 (Horizontal Yaw)
      const ring1Geom = this.track(new THREE.TorusGeometry(26, 0.4, 16, 80));
      const ring1Mat = this.track(new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.55
      }));
      this.heroRing1 = new THREE.Mesh(ring1Geom, ring1Mat);
      this.heroRing1.rotation.x = Math.PI * 0.42;
      this.heroGroup.add(this.heroRing1);

      // Celestial Ring 2 (Tilted Solar Accent)
      const ring2Geom = this.track(new THREE.TorusGeometry(31, 0.25, 16, 80));
      const ring2Mat = this.track(new THREE.MeshBasicMaterial({
        color: 0xf5a623,
        transparent: true,
        opacity: 0.45
      }));
      this.heroRing2 = new THREE.Mesh(ring2Geom, ring2Mat);
      this.heroRing2.rotation.x = Math.PI * 0.25;
      this.heroRing2.rotation.y = Math.PI * 0.35;
      this.heroGroup.add(this.heroRing2);

      this.scene.add(this.heroGroup);
    }

    /* ─── 2. Scattered Data Fragments & Convergence Vortex ─────────────────── */
    initDataFragments() {
      this.fragmentsGroup = new THREE.Group();
      this.fragmentsGroup.position.set(0, 0, 15);
      this.fragments = [];

      const fragmentTypes = [
        { label: 'GitHub Code', color: 0x38bdf8, shape: 'plate' },
        { label: 'PDF Resume',  color: 0xf8fafc, shape: 'sheet' },
        { label: 'Live Demos',  color: 0x10b981, shape: 'cube' },
        { label: 'Skill Matrix',color: 0x8b5cf6, shape: 'crystal' },
        { label: 'Architecture',color: 0xf5a623, shape: 'tablet' },
        { label: 'Achievements',color: 0xec4899, shape: 'star' }
      ];

      const fragCount = this.isMobile ? 18 : 36;
      for (let i = 0; i < fragCount; i++) {
        const type = fragmentTypes[i % fragmentTypes.length];
        let geom;
        if (type.shape === 'plate') geom = this.track(new THREE.BoxGeometry(4.5, 3.2, 0.3));
        else if (type.shape === 'sheet') geom = this.track(new THREE.BoxGeometry(3.2, 4.4, 0.15));
        else if (type.shape === 'crystal') geom = this.track(new THREE.OctahedronGeometry(2.0));
        else geom = this.track(new THREE.BoxGeometry(3.0, 3.0, 0.8));

        const mat = this.track(new THREE.MeshStandardMaterial({
          color: 0x081329,
          roughness: 0.2,
          metalness: 0.85,
          emissive: type.color,
          emissiveIntensity: 0.35,
          transparent: true,
          opacity: 0.95
        }));

        const mesh = new THREE.Mesh(geom, mat);
        // Scattered radius in cylinder space
        const angle = Math.random() * Math.PI * 2;
        const radius = 22 + Math.random() * 32;
        const initY = (Math.random() - 0.5) * 28;
        const initZ = (Math.random() - 0.5) * 45;

        mesh.position.set(Math.cos(angle) * radius, initY, initZ);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

        // Store initial positions for convergence trajectory
        mesh.userData = {
          initX: mesh.position.x,
          initY: mesh.position.y,
          initZ: mesh.position.z,
          rotSpeedX: (Math.random() - 0.5) * 0.02,
          rotSpeedY: (Math.random() - 0.5) * 0.02,
          angle: angle,
          radius: radius,
          convergeSpeed: 0.8 + Math.random() * 0.5
        };

        this.fragments.push(mesh);
        this.fragmentsGroup.add(mesh);
      }

      this.scene.add(this.fragmentsGroup);
    }

    /* ─── 3. AI Synthesis Terraforming Grid ────────────────────────────────── */
    initSynthesisGrid() {
      this.synthesisGroup = new THREE.Group();
      this.synthesisGroup.position.set(0, -6, -12);

      // Horizon terraforming wireframe plane
      const planeGeom = this.track(new THREE.PlaneGeometry(80, 80, 24, 24));
      const planeMat = this.track(new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.0
      }));
      this.synthesisPlane = new THREE.Mesh(planeGeom, planeMat);
      this.synthesisPlane.rotation.x = -Math.PI * 0.45;
      this.synthesisGroup.add(this.synthesisPlane);

      // Pulsing Genesis Core Node
      const coreGeom = this.track(new THREE.IcosahedronGeometry(4.2, 3));
      const coreMat = this.track(new THREE.MeshStandardMaterial({
        color: 0xf5a623,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0xf5a623,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.0
      }));
      this.synthesisCore = new THREE.Mesh(coreGeom, coreMat);
      this.synthesisGroup.add(this.synthesisCore);

      this.scene.add(this.synthesisGroup);
    }

    /* ─── 4. The Living Portfolio World Hub ────────────────────────────────── */
    initPortfolioWorld() {
      this.worldGroup = new THREE.Group();
      this.worldGroup.position.set(0, -2, -30);

      // Terraformed Island Disc
      const islandGeom = this.track(new THREE.CylinderGeometry(24, 18, 5, 32));
      const islandMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x07152b,
        roughness: 0.5,
        metalness: 0.4,
        emissive: 0x040e1e,
        emissiveIntensity: 0.5
      }));
      this.islandDisc = new THREE.Mesh(islandGeom, islandMat);
      this.worldGroup.add(this.islandDisc);

      // Living Tree of Knowledge (Procedural Stem + Emerald Canopy Nodes)
      const trunkGeom = this.track(new THREE.CylinderGeometry(0.8, 1.6, 12, 12));
      const trunkMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.8
      }));
      this.treeTrunk = new THREE.Mesh(trunkGeom, trunkMat);
      this.treeTrunk.position.set(0, 8, 0);
      this.worldGroup.add(this.treeTrunk);

      // Canopy Foliage Clusters (Bioluminescent Nodes)
      const canopyCount = 8;
      for (let i = 0; i < canopyCount; i++) {
        const leafGeom = this.track(new THREE.SphereGeometry(2.2, 16, 16));
        const leafMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x10b981,
          roughness: 0.2,
          emissive: 0x10b981,
          emissiveIntensity: 0.65,
          transparent: true,
          opacity: 0.85
        }));
        const leaf = new THREE.Mesh(leafGeom, leafMat);
        const a = (i / canopyCount) * Math.PI * 2;
        const r = 3.5 + (i % 3) * 1.5;
        leaf.position.set(Math.cos(a) * r, 12 + (i % 4) * 1.2, Math.sin(a) * r);
        this.worldGroup.add(leaf);
      }

      this.scene.add(this.worldGroup);
    }

    /* ─── 5. Project Planetoids (Miniature Worlds) ─────────────────────────── */
    initProjectPlanetoids() {
      this.projectsGroup = new THREE.Group();
      this.projectsGroup.position.set(0, 0, -42);

      this.projectWorlds = [];

      const configs = [
        { name: 'Systems Architecture', color: 0x38bdf8, pos: [-16, 2, 0], ring: true,  radius: 4.8 },
        { name: 'Smart Contract DApp',  color: 0xf5a623, pos: [0, 4, -4],   ring: false, radius: 4.2 },
        { name: 'Autonomous AI Engine', color: 0x10b981, pos: [16, -1, 2],  ring: true,  radius: 4.5 }
      ];

      configs.forEach((cfg) => {
        const pGroup = new THREE.Group();
        pGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);

        const bodyGeom = this.track(new THREE.SphereGeometry(cfg.radius, 28, 28));
        const bodyMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x0a1426,
          roughness: 0.3,
          metalness: 0.7,
          emissive: cfg.color,
          emissiveIntensity: 0.4
        }));
        const body = new THREE.Mesh(bodyGeom, bodyMat);
        pGroup.add(body);

        if (cfg.ring) {
          const ringGeom = this.track(new THREE.TorusGeometry(cfg.radius * 1.6, 0.18, 12, 48));
          const ringMat = this.track(new THREE.MeshBasicMaterial({
            color: cfg.color,
            transparent: true,
            opacity: 0.6
          }));
          const ring = new THREE.Mesh(ringGeom, ringMat);
          ring.rotation.x = Math.PI * 0.4;
          pGroup.add(ring);
        }

        this.projectWorlds.push(pGroup);
        this.projectsGroup.add(pGroup);
      });

      this.scene.add(this.projectsGroup);
    }

    /* ─── 6. Skill Neural Network ──────────────────────────────────────────── */
    initSkillNetwork() {
      this.skillsGroup = new THREE.Group();
      this.skillsGroup.position.set(12, 2, -66);

      const nodeCount = 14;
      const nodePositions = [];
      const nodeMeshes = [];

      for (let i = 0; i < nodeCount; i++) {
        const geom = this.track(new THREE.SphereGeometry(0.9 + (i % 3) * 0.3, 16, 16));
        const mat = this.track(new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.8
        }));
        const node = new THREE.Mesh(geom, mat);
        const x = (Math.random() - 0.5) * 22;
        const y = (Math.random() - 0.5) * 14;
        const z = (Math.random() - 0.5) * 14;
        node.position.set(x, y, z);

        nodePositions.push(node.position);
        nodeMeshes.push(node);
        this.skillsGroup.add(node);
      }

      // Interconnecting Synaptic Neural Lines
      const linePositions = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < 10) {
            linePositions.push(
              nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
              nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
            );
          }
        }
      }

      const lineGeom = this.track(new THREE.BufferGeometry());
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = this.track(new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.4
      }));
      this.skillLines = new THREE.LineSegments(lineGeom, lineMat);
      this.skillsGroup.add(this.skillLines);

      this.scene.add(this.skillsGroup);
    }

    /* ─── 7. Basalt GitHub Mountain ────────────────────────────────────────── */
    initGitHubMountain() {
      this.mountainGroup = new THREE.Group();
      this.mountainGroup.position.set(-14, -6, -66);

      // Low-poly Geological Mountain Cone
      const coneGeom = this.track(new THREE.ConeGeometry(14, 20, 7));
      const coneMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x09101c,
        roughness: 0.85,
        metalness: 0.25,
        flatShading: true
      }));
      this.mountainMesh = new THREE.Mesh(coneGeom, coneMat);
      this.mountainMesh.position.y = 10;
      this.mountainGroup.add(this.mountainMesh);

      // Glowing Copper Commit Veins
      const veinGeom = this.track(new THREE.TorusGeometry(8, 0.2, 8, 24));
      const veinMat = this.track(new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.85
      }));
      const vein1 = new THREE.Mesh(veinGeom, veinMat);
      vein1.position.y = 6;
      vein1.rotation.x = Math.PI * 0.5;
      this.mountainGroup.add(vein1);

      const vein2 = new THREE.Mesh(veinGeom, veinMat);
      vein2.position.y = 12;
      vein2.scale.set(0.6, 0.6, 0.6);
      vein2.rotation.x = Math.PI * 0.45;
      this.mountainGroup.add(vein2);

      this.scene.add(this.mountainGroup);
    }

    /* ─── 8. Experience Time Corridor ──────────────────────────────────────── */
    initTimeCorridor() {
      this.corridorGroup = new THREE.Group();
      this.corridorGroup.position.set(0, 2, -92);
      this.corridorRings = [];

      const years = ['2022', '2023', '2024', '2025', 'NOW'];
      years.forEach((yr, idx) => {
        const ringGeom = this.track(new THREE.TorusGeometry(12, 0.35, 16, 48));
        const ringMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x0b1736,
          roughness: 0.3,
          metalness: 0.8,
          emissive: idx === years.length - 1 ? 0xf5a623 : 0x38bdf8,
          emissiveIntensity: 0.65
        }));
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.position.z = -idx * 16;
        this.corridorRings.push(ring);
        this.corridorGroup.add(ring);
      });

      this.scene.add(this.corridorGroup);
    }

    /* ─── 9. The Universe Gateway ──────────────────────────────────────────── */
    initUniverseGateway() {
      this.gateGroup = new THREE.Group();
      this.gateGroup.position.set(0, 4, -148);

      // Colossal Dimensional Arch
      const archGeom = this.track(new THREE.TorusGeometry(18, 1.2, 24, 64));
      const archMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x070c1e,
        roughness: 0.25,
        metalness: 0.9,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.5
      }));
      this.gateArch = new THREE.Mesh(archGeom, archMat);
      this.gateGroup.add(this.gateArch);

      // Inner Swirling Event Horizon Disc
      const discGeom = this.track(new THREE.CircleGeometry(16.5, 36));
      const discMat = this.track(new THREE.MeshBasicMaterial({
        color: 0x0e1b42,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide
      }));
      this.gateHorizon = new THREE.Mesh(discGeom, discMat);
      this.gateGroup.add(this.gateHorizon);

      // 8 Orbiting Universe Portal Orbs
      this.portalOrbs = [];
      const universeColors = [
        0xd4af37, // Shelf (Gold)
        0x10b981, // Sylva (Emerald)
        0xec4899, // Kage (Sakura Pink)
        0x38bdf8, // Cosmic Astronaut (Cyan)
        0xa855f7, // Cyber Crystal (Purple)
        0x00f5d4, // Bioluminescent (Turquoise)
        0xd97706, // Chrono Obsidian (Amber)
        0x8b5cf6  // Neon Aurora (Violet)
      ];

      for (let i = 0; i < 8; i++) {
        const orbGeom = this.track(new THREE.SphereGeometry(1.8, 20, 20));
        const orbMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x091226,
          roughness: 0.2,
          emissive: universeColors[i],
          emissiveIntensity: 0.8
        }));
        const orb = new THREE.Mesh(orbGeom, orbMat);
        const a = (i / 8) * Math.PI * 2;
        orb.position.set(Math.cos(a) * 24, Math.sin(a) * 24, 0);
        this.portalOrbs.push(orb);
        this.gateGroup.add(orb);
      }

      this.scene.add(this.gateGroup);
    }

    /* ─── 10. Final Climax Departure Beacon ────────────────────────────────── */
    initFinalBeacon() {
      this.beaconGroup = new THREE.Group();
      this.beaconGroup.position.set(0, 0, -182);

      // Ascending Light Column
      const colGeom = this.track(new THREE.CylinderGeometry(3.5, 6, 80, 24, 1, true));
      const colMat = this.track(new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      }));
      this.beaconColumn = new THREE.Mesh(colGeom, colMat);
      this.beaconColumn.position.y = 40;
      this.beaconGroup.add(this.beaconColumn);

      // Glowing Ground Portal Ring
      const groundRingGeom = this.track(new THREE.RingGeometry(8, 12, 36));
      const groundRingMat = this.track(new THREE.MeshBasicMaterial({
        color: 0xf5a623,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      }));
      this.groundRing = new THREE.Mesh(groundRingGeom, groundRingMat);
      this.groundRing.rotation.x = -Math.PI * 0.5;
      this.beaconGroup.add(this.groundRing);

      this.scene.add(this.beaconGroup);
    }

    /* ─── Deterministic Animation per Scroll Progress (0.0 -> 1.0) ────────── */
    update(scrollProgress, time) {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // 1. Hero World Core & Rings Rotation
      if (this.heroGroup) {
        this.heroSphere.rotation.y = time * 0.15 + p * 4.0;
        this.heroWireShell.rotation.y = -time * 0.12 - p * 3.0;
        this.heroRing1.rotation.z = time * 0.25 + p * 5.0;
        this.heroRing2.rotation.z = -time * 0.20 - p * 4.0;

        // Shrink gently as camera travels past (0.15 -> 0.35)
        const heroScale = Math.max(0.01, 1.0 - Math.max(0, p - 0.15) * 2.5);
        this.heroGroup.scale.set(heroScale, heroScale, heroScale);
      }

      // 2. Scattered Fragments & Convergence (0.12 -> 0.38)
      if (this.fragments) {
        const convergeProgress = Math.max(0, Math.min(1, (p - 0.20) / 0.16));
        this.fragments.forEach((frag) => {
          if (!this.isReducedMotion) {
            frag.rotation.x += frag.userData.rotSpeedX;
            frag.rotation.y += frag.userData.rotSpeedY;
          }

          // Inward spiral vortex pull
          const curRadius = frag.userData.radius * (1 - convergeProgress * 0.85);
          const curAngle = frag.userData.angle + convergeProgress * 3.5;
          frag.position.x = Math.cos(curAngle) * curRadius;
          frag.position.z = frag.userData.initZ * (1 - convergeProgress) + Math.sin(curAngle) * curRadius * 0.4;
          frag.position.y = frag.userData.initY * (1 - convergeProgress * 0.7);

          // Fade fragments out as synthesis completes (0.38+)
          if (frag.material) {
            frag.material.opacity = Math.max(0, 0.95 - Math.max(0, p - 0.36) * 10);
          }
        });
      }

      // 3. AI Synthesis Grid (0.32 -> 0.50)
      if (this.synthesisGroup) {
        const synthFactor = Math.max(0, Math.min(1, (p - 0.30) / 0.12));
        const fadeOut = Math.max(0, (p - 0.48) / 0.10);
        this.synthesisPlane.material.opacity = Math.max(0, synthFactor * 0.75 - fadeOut * 0.75);
        this.synthesisCore.material.opacity = Math.max(0, synthFactor * 0.95 - fadeOut * 0.95);
        this.synthesisCore.rotation.y = time * 0.4 + p * 6.0;
      }

      // 4. Portfolio World Island & Tree (0.45 -> 0.65)
      if (this.worldGroup) {
        this.worldGroup.rotation.y = time * 0.08 + p * 1.5;
      }

      // 5. Project Planetoids (0.58 -> 0.75)
      if (this.projectWorlds) {
        this.projectWorlds.forEach((pw, idx) => {
          pw.rotation.y = time * (0.2 + idx * 0.1) + p * 2.0;
        });
      }

      // 6. Skill Network & Mountain (0.68 -> 0.85)
      if (this.skillsGroup) {
        this.skillsGroup.rotation.y = time * 0.12 + p * 1.2;
      }

      // 7. Universe Gateway (0.85 -> 1.0)
      if (this.gateGroup) {
        this.gateArch.rotation.z = time * 0.15 + p * 2.0;
        this.gateHorizon.rotation.z = -time * 0.25;

        // Orbiting portal orbs
        this.portalOrbs.forEach((orb, i) => {
          const a = (i / 8) * Math.PI * 2 + time * 0.3 + p * 4.0;
          orb.position.x = Math.cos(a) * 24;
          orb.position.y = Math.sin(a) * 24;
        });
      }

      // 8. Final Climax Beacon
      if (this.beaconGroup) {
        this.groundRing.rotation.z = time * 0.4;
        this.beaconColumn.rotation.y = -time * 0.2;
      }
    }

    dispose() {
      this.geometries.forEach((g) => g.dispose());
      this.materials.forEach((m) => m.dispose());
    }
  }

  window.SceneObjectsManager = SceneObjectsManager;
})(window);

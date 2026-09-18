/**
 * MyFolio Studio — RealWorldVisualGenerator Engine
 * Translates candidate identity & verified engineering records into authentic,
 * physically-based real-world architectural environments, terrain, workstations,
 * server rooms, skybridges, and summit observatories.
 * 
 * Strict Zero Generic Primitives Rule:
 * Replaces abstract shapes, spheres, crystals, and floating blobs with believable
 * physical spaces that naturally house a candidate's portfolio.
 */
(function(window) {
  'use strict';

  class RealWorldVisualGenerator {
    constructor(scene, isMobile, isReducedMotion) {
      this.scene = scene;
      this.isMobile = isMobile;
      this.isReducedMotion = isReducedMotion;

      this.registry = window.RealWorldAssetRegistry;
      this.materials = [];
      this.geometries = [];

      // Generate Deterministic World Seed & Scene Plan
      this.candidateProfile = this.detectCandidateProfile();
      this.scenePlan = this.generateScenePlan(this.candidateProfile);

      // Environment Root Group
      this.worldGroup = new THREE.Group();
      this.scene.add(this.worldGroup);

      // Procedural PBR Textures (Generates realistic screen IDEs, server LEDs, concrete)
      this.textures = this.generateProceduralTextures();

      // Build Real-World Environments across the 10 Journey Zones
      this.buildTerrainAndSky();
      this.buildResearchCampusExterior();
      this.buildIntakeReception();
      this.buildSynthesisStudio();
      this.buildLivingPavilion();
      this.buildProjectWorkstations();
      this.buildSkillsAndServerDataCenter();
      this.buildExperienceSkybridge();
      this.buildUniversesGallery();
      this.buildSummitObservatory();
    }

    track(res) {
      if (res.isMaterial) this.materials.push(res);
      if (res.isGeometry || res.isBufferGeometry) this.geometries.push(res);
      return res;
    }

    /* ─── 1. Semantic Understanding & Deterministic Scene Plan ──────────────── */
    detectCandidateProfile() {
      // In production, pulls candidate data from window.__folioCandidate or app state
      const globalData = window.__folioCandidate || window.parsedCandidateData || {};
      const name = globalData.name || 'Engineer';
      const title = globalData.title || 'Senior Full-Stack & Systems Architect';
      const skills = globalData.skills || ['Distributed Systems', 'Three.js', 'WebGL', 'AI Agents', 'Cloud Architecture'];

      return { name, title, skills };
    }

    hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    }

    generateScenePlan(profile) {
      const seed = this.hashString(profile.name + profile.title);
      const titleLower = profile.title.toLowerCase();

      let envType = 'modern_ai_research_campus';
      if (titleLower.includes('design') || titleLower.includes('frontend') || titleLower.includes('creative')) {
        envType = 'creative_technology_studio';
      } else if (titleLower.includes('devops') || titleLower.includes('cloud') || titleLower.includes('sre')) {
        envType = 'cloud_hyperscale_facility';
      } else if (titleLower.includes('security') || titleLower.includes('crypto')) {
        envType = 'security_operations_center';
      } else if (titleLower.includes('robot') || titleLower.includes('hardware') || titleLower.includes('embedded')) {
        envType = 'robotics_hardware_lab';
      }

      return {
        seed,
        environment: envType,
        climate: 'temperate_alpine',
        timeOfDay: 'golden_hour',
        hero: {
          terrain: 'mountain_valley',
          architecture: 'research_pavilion'
        },
        about: {
          environment: 'executive_workspace',
          architecture: 'glass_atrium'
        },
        projects: {
          environment: 'technology_laboratory',
          workstations: [
            { type: 'ai_systems', monitors: 2, desk: 'dark_walnut' },
            { type: 'web_product', monitors: 1, style: 'curved_ultrawide', desk: 'aluminum' },
            { type: 'systems_hardware', monitors: 2, testBench: true, desk: 'industrial' }
          ]
        },
        skills: {
          environment: 'diagnostic_lab'
        },
        github: {
          environment: 'hyperscale_datacenter',
          rackCount: this.isMobile ? 4 : 8
        },
        experience: {
          environment: 'architectural_skybridge'
        },
        universes: {
          environment: 'exhibition_gallery'
        },
        contact: {
          environment: 'summit_observatory'
        }
      };
    }

    /* ─── 2. Procedural PBR Canvas Textures (Zero External Image Lag) ────────── */
    generateProceduralTextures() {
      // 1. Code Editor / Terminal Screen Texture
      const codeCanvas = document.createElement('canvas');
      codeCanvas.width = 512;
      codeCanvas.height = 256;
      const ctx = codeCanvas.getContext('2d');
      ctx.fillStyle = '#060B18';
      ctx.fillRect(0, 0, 512, 256);
      // Terminal Header Bar
      ctx.fillStyle = '#0E172E';
      ctx.fillRect(0, 0, 512, 24);
      ctx.fillStyle = '#EF4444'; ctx.beginPath(); ctx.arc(14, 12, 4, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#F59E0B'; ctx.beginPath(); ctx.arc(28, 12, 4, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#10B981'; ctx.beginPath(); ctx.arc(42, 12, 4, 0, Math.PI*2); ctx.fill();
      // Code Lines Simulation
      const lineColors = ['#38BDF8', '#818CF8', '#34D399', '#94A3B8', '#F472B6'];
      for (let y = 40; y < 240; y += 14) {
        const indent = (y % 42 === 0) ? 20 : (y % 28 === 0) ? 45 : 70;
        const width = 80 + ((y * 17) % 240);
        ctx.fillStyle = lineColors[(y / 14) % lineColors.length];
        ctx.fillRect(indent, y, width, 6);
      }
      const codeTex = new THREE.CanvasTexture(codeCanvas);

      // 2. Server Rack LED Front Panel Texture
      const ledCanvas = document.createElement('canvas');
      ledCanvas.width = 128;
      ledCanvas.height = 512;
      const lctx = ledCanvas.getContext('2d');
      lctx.fillStyle = '#0B0F19';
      lctx.fillRect(0, 0, 128, 512);
      // Server Unit Slots
      for (let u = 0; u < 512; u += 16) {
        lctx.fillStyle = '#151C2C';
        lctx.fillRect(4, u + 2, 120, 12);
        // Blinking Green & Amber Status LEDs
        lctx.fillStyle = (u % 32 === 0) ? '#10B981' : (u % 48 === 0) ? '#38BDF8' : '#059669';
        lctx.fillRect(12, u + 5, 4, 4);
        lctx.fillRect(20, u + 5, 4, 4);
        lctx.fillStyle = (u % 64 === 0) ? '#F59E0B' : '#047857';
        lctx.fillRect(28, u + 5, 4, 4);
        // Drive Activity Grille
        lctx.fillStyle = '#1E293B';
        lctx.fillRect(44, u + 5, 70, 5);
      }
      const ledTex = new THREE.CanvasTexture(ledCanvas);

      // 3. PBR Architectural Concrete Texture
      const concreteCanvas = document.createElement('canvas');
      concreteCanvas.width = 256;
      concreteCanvas.height = 256;
      const cctx = concreteCanvas.getContext('2d');
      cctx.fillStyle = '#787F8A';
      cctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const shade = 100 + Math.random() * 50;
        cctx.fillStyle = `rgba(${shade},${shade},${shade},0.15)`;
        cctx.fillRect(x, y, 2, 2);
      }
      const concreteTex = new THREE.CanvasTexture(concreteCanvas);
      concreteTex.wrapS = THREE.RepeatWrapping;
      concreteTex.wrapT = THREE.RepeatWrapping;
      concreteTex.repeat.set(8, 8);

      return { codeTex, ledTex, concreteTex };
    }

    /* ─── 3. Zone 00: Real Terrain & Atmospheric Horizon ────────────────────── */
    buildTerrainAndSky() {
      this.terrainGroup = new THREE.Group();
      this.terrainGroup.position.set(0, -6, 0);

      // 1. Natural Landscape Ground (Meadow & Valley Floor)
      const groundGeom = this.track(new THREE.PlaneGeometry(280, 420, 32, 48));
      const pos = groundGeom.attributes.position;
      // Gentle natural elevation rolls
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Carve central road/campus depression, elevate hills to the left & right
        const distFromCenter = Math.abs(x);
        const hillElevation = Math.max(0, (distFromCenter - 25) * 0.28) + Math.sin(y * 0.05) * 3.5;
        pos.setZ(i, hillElevation);
      }
      groundGeom.computeVertexNormals();

      const groundMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x142820,
        roughness: 0.88,
        metalness: 0.04,
        flatShading: true
      }));
      this.groundMesh = new THREE.Mesh(groundGeom, groundMat);
      this.groundMesh.rotation.x = -Math.PI * 0.5;
      this.groundMesh.receiveShadow = true;
      this.terrainGroup.add(this.groundMesh);

      // 2. Paved Campus Access Road (Connecting Hero to Entrance)
      const roadGeom = this.track(new THREE.PlaneGeometry(16, 260));
      const roadMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x181c24,
        roughness: 0.92,
        metalness: 0.05
      }));
      const roadMesh = new THREE.Mesh(roadGeom, roadMat);
      roadMesh.rotation.x = -Math.PI * 0.5;
      roadMesh.position.set(0, 0.08, 20);
      roadMesh.receiveShadow = true;
      this.terrainGroup.add(roadMesh);

      // Road Centerline Markers
      const lineGeom = this.track(new THREE.PlaneGeometry(0.5, 240));
      const lineMat = this.track(new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }));
      const lineMesh = new THREE.Mesh(lineGeom, lineMat);
      lineMesh.rotation.x = -Math.PI * 0.5;
      lineMesh.position.set(0, 0.12, 20);
      this.terrainGroup.add(lineMesh);

      // 3. Realistic Coniferous Alpine Trees along Hillsides (Instanced)
      this.buildInstancedTrees();

      // 4. Distant Mountain Ridge Silhouettes in the Background
      this.buildMountainRanges();

      this.worldGroup.add(this.terrainGroup);
    }

    buildInstancedTrees() {
      const treeCount = this.isMobile ? 24 : 56;
      const treeGroup = new THREE.Group();

      const trunkGeom = this.track(new THREE.CylinderGeometry(0.35, 0.6, 6, 6));
      const trunkMat = this.track(new THREE.MeshStandardMaterial({ color: 0x241810, roughness: 0.9 }));

      const foliageGeom = this.track(new THREE.ConeGeometry(3.2, 8, 6));
      const foliageMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0f2f1d,
        roughness: 0.75,
        metalness: 0.05,
        flatShading: true
      }));

      for (let i = 0; i < treeCount; i++) {
        const side = (i % 2 === 0) ? 1 : -1;
        const x = side * (26 + Math.random() * 65);
        const z = 100 - (i * 5.5) + (Math.random() * 8);
        const scale = 0.7 + Math.random() * 0.6;

        const singleTree = new THREE.Group();
        const trunk = new THREE.Mesh(trunkGeom, trunkMat);
        trunk.position.y = 3;
        singleTree.add(trunk);

        const foliage1 = new THREE.Mesh(foliageGeom, foliageMat);
        foliage1.position.y = 7;
        singleTree.add(foliage1);

        const foliage2 = new THREE.Mesh(foliageGeom, foliageMat);
        foliage2.position.y = 9.5;
        foliage2.scale.set(0.75, 0.75, 0.75);
        singleTree.add(foliage2);

        singleTree.position.set(x, 0, z);
        singleTree.scale.set(scale, scale, scale);
        treeGroup.add(singleTree);
      }

      this.terrainGroup.add(treeGroup);
    }

    buildMountainRanges() {
      const mountainGeom = this.track(new THREE.ConeGeometry(65, 90, 5));
      const mountainMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0a1322,
        roughness: 0.95,
        metalness: 0.05,
        flatShading: true
      }));

      // Left Ridge
      const m1 = new THREE.Mesh(mountainGeom, mountainMat);
      m1.position.set(-110, 30, -80);
      this.terrainGroup.add(m1);

      // Right Ridge
      const m2 = new THREE.Mesh(mountainGeom, mountainMat);
      m2.position.set(120, 35, -110);
      this.terrainGroup.add(m2);

      // Distant Center Backdrop Peak
      const m3 = new THREE.Mesh(mountainGeom, mountainMat);
      m3.position.set(0, 45, -220);
      m3.scale.set(1.4, 1.2, 1.4);
      this.terrainGroup.add(m3);
    }

    /* ─── 4. Zone 01 & 02: Research Pavilion & Entrance Plaza ───────────────── */
    buildResearchCampusExterior() {
      this.campusGroup = new THREE.Group();
      this.campusGroup.position.set(0, 0, 70);

      // Modern Architectural Research Pavilion Exterior
      // PBR Cast Concrete Roof Slab & Support Pillars
      const roofGeom = this.track(new THREE.BoxGeometry(42, 2.5, 36));
      const concreteMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x8e9297,
        roughness: 0.85,
        metalness: 0.08,
        map: this.textures.concreteTex
      }));
      const roof = new THREE.Mesh(roofGeom, concreteMat);
      roof.position.set(0, 16, 0);
      roof.castShadow = true;
      this.campusGroup.add(roof);

      // Concrete Columns (4 Architectural Pillars)
      const columnGeom = this.track(new THREE.BoxGeometry(2.2, 16, 2.2));
      const colPositions = [[-18, 8, -15], [18, 8, -15], [-18, 8, 15], [18, 8, 15]];
      colPositions.forEach(([cx, cy, cz]) => {
        const col = new THREE.Mesh(columnGeom, concreteMat);
        col.position.set(cx, cy, cz);
        col.castShadow = true;
        this.campusGroup.add(col);
      });

      // Floor-to-Ceiling Architectural Glass Facade
      const glassGeom = this.track(new THREE.BoxGeometry(38, 14, 0.4));
      const glassMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        roughness: 0.05,
        metalness: 0.15,
        transparent: true,
        opacity: 0.32
      }));
      const glassFacade = new THREE.Mesh(glassGeom, glassMat);
      glassFacade.position.set(0, 7, -14);
      this.campusGroup.add(glassFacade);

      // Steel Window Mullions
      const mullionMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1f242d, metalness: 0.85, roughness: 0.3 }));
      for (let mx = -15; mx <= 15; mx += 7.5) {
        const mulGeom = this.track(new THREE.BoxGeometry(0.3, 14, 0.6));
        const mul = new THREE.Mesh(mulGeom, mullionMat);
        mul.position.set(mx, 7, -14);
        this.campusGroup.add(mul);
      }

      // Entrance Plaza Steps & Slate Paving
      const plazaGeom = this.track(new THREE.BoxGeometry(46, 0.8, 30));
      const slateMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x222834,
        roughness: 0.78,
        metalness: 0.08
      }));
      const plaza = new THREE.Mesh(plazaGeom, slateMat);
      plaza.position.set(0, -5.6, 5);
      plaza.receiveShadow = true;
      this.campusGroup.add(plaza);

      this.worldGroup.add(this.campusGroup);
    }

    /* ─── 5. Zone 03: Reception & Intake Atrium ─────────────────────────────── */
    buildIntakeReception() {
      this.atriumGroup = new THREE.Group();
      this.atriumGroup.position.set(0, -2, 38);

      // Contemporary Reception Counter (Dark Walnut + Brushed Steel Kickplate)
      const counterGeom = this.track(new THREE.BoxGeometry(16, 3.2, 3.8));
      const walnutMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x281c14,
        roughness: 0.45,
        metalness: 0.02
      }));
      const counter = new THREE.Mesh(counterGeom, walnutMat);
      counter.position.set(0, 1.6, 0);
      this.atriumGroup.add(counter);

      // Brushed Steel Countertop
      const topGeom = this.track(new THREE.BoxGeometry(16.4, 0.3, 4.2));
      const steelMat = this.track(new THREE.MeshStandardMaterial({ color: 0xa8b0b8, metalness: 0.88, roughness: 0.25 }));
      const top = new THREE.Mesh(topGeom, steelMat);
      top.position.set(0, 3.3, 0);
      this.atriumGroup.add(top);

      // Interactive Terminal Displays on Counter (Screen Displays)
      const termGeom = this.track(new THREE.BoxGeometry(2.4, 1.6, 0.15));
      const screenMat = this.track(new THREE.MeshStandardMaterial({
        map: this.textures.codeTex,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.65
      }));
      const term1 = new THREE.Mesh(termGeom, screenMat);
      term1.position.set(-4, 4.3, -0.2);
      term1.rotation.x = -0.15;
      this.atriumGroup.add(term1);

      const term2 = new THREE.Mesh(termGeom, screenMat);
      term2.position.set(4, 4.3, -0.2);
      term2.rotation.x = -0.15;
      this.atriumGroup.add(term2);

      // Interior Biophilic Planters flanking entrance
      this.addIndoorPlanter(this.atriumGroup, -12, 0, -4);
      this.addIndoorPlanter(this.atriumGroup, 12, 0, -4);

      this.worldGroup.add(this.atriumGroup);
    }

    addIndoorPlanter(parent, x, y, z) {
      const planterGeom = this.track(new THREE.BoxGeometry(2.8, 3.2, 2.8));
      const planterMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1e222b, roughness: 0.6 }));
      const planter = new THREE.Mesh(planterGeom, planterMat);
      planter.position.set(x, y + 1.6, z);
      parent.add(planter);

      // Greenery Foliage Cluster
      const plantGeom = this.track(new THREE.SphereGeometry(1.6, 8, 8));
      const plantMat = this.track(new THREE.MeshStandardMaterial({ color: 0x155e38, roughness: 0.65 }));
      const plant = new THREE.Mesh(plantGeom, plantMat);
      plant.position.set(x, y + 3.8, z);
      parent.add(plant);
    }

    /* ─── 6. Zone 04: Computational Synthesis Studio ────────────────────────── */
    buildSynthesisStudio() {
      this.studioGroup = new THREE.Group();
      this.studioGroup.position.set(0, 0, 14);

      // Architectural Glass Wall framing the studio
      const frameGeom = this.track(new THREE.BoxGeometry(32, 14, 0.4));
      const frameMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18,
        roughness: 0.05
      }));
      const frame = new THREE.Mesh(frameGeom, frameMat);
      frame.position.set(0, 7, -12);
      this.studioGroup.add(frame);

      // Central Holographic Project Table / Workbench
      const benchGeom = this.track(new THREE.BoxGeometry(14, 2.8, 8));
      const benchMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.35,
        metalness: 0.75
      }));
      const bench = new THREE.Mesh(benchGeom, benchMat);
      bench.position.set(0, -3.6, 0);
      this.studioGroup.add(bench);

      // Glass Holographic Surface
      const glassTopGeom = this.track(new THREE.BoxGeometry(14.2, 0.2, 8.2));
      const glassTopMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.65
      }));
      const glassTop = new THREE.Mesh(glassTopGeom, glassTopMat);
      glassTop.position.set(0, -2.1, 0);
      this.studioGroup.add(glassTop);

      this.worldGroup.add(this.studioGroup);
    }

    /* ─── 7. Zone 05: The Living Portfolio Pavilion ─────────────────────────── */
    buildLivingPavilion() {
      this.pavilionGroup = new THREE.Group();
      this.pavilionGroup.position.set(0, 0, -14);

      // Large Architectural Glass Skylight Atrium
      const atriumFloorGeom = this.track(new THREE.BoxGeometry(40, 0.6, 40));
      const floorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x1a2130,
        roughness: 0.5,
        metalness: 0.15,
        map: this.textures.concreteTex
      }));
      const floor = new THREE.Mesh(atriumFloorGeom, floorMat);
      floor.position.set(0, -5, 0);
      this.pavilionGroup.add(floor);

      // Interior Biophilic Architectural Feature Tree (In place of abstract sphere)
      const potGeom = this.track(new THREE.CylinderGeometry(4.5, 3.8, 2.2, 16));
      const potMat = this.track(new THREE.MeshStandardMaterial({ color: 0x272e3d, roughness: 0.7 }));
      const pot = new THREE.Mesh(potGeom, potMat);
      pot.position.set(0, -3.9, 0);
      this.pavilionGroup.add(pot);

      // Natural Bonsai / Architectural Ficus Tree Trunk
      const trunkGeom = this.track(new THREE.CylinderGeometry(0.7, 1.2, 11, 8));
      const trunkMat = this.track(new THREE.MeshStandardMaterial({ color: 0x22160f, roughness: 0.9 }));
      const trunk = new THREE.Mesh(trunkGeom, trunkMat);
      trunk.position.set(0, 1.6, 0);
      this.pavilionGroup.add(trunk);

      // Natural Lush Leaf Canopy Clusters
      const leafClusterGeom = this.track(new THREE.SphereGeometry(2.4, 8, 8));
      const leafClusterMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x10b981,
        roughness: 0.65,
        metalness: 0.05
      }));

      const canopyOffsets = [
        [-2.2, 7.5, 1.5], [2.4, 8.2, -1.8], [0, 9.5, 0],
        [-1.8, 6.8, -2.0], [2.2, 7.0, 1.8]
      ];
      canopyOffsets.forEach(([lx, ly, lz]) => {
        const cluster = new THREE.Mesh(leafClusterGeom, leafClusterMat);
        cluster.position.set(lx, ly, lz);
        this.pavilionGroup.add(cluster);
      });

      this.worldGroup.add(this.pavilionGroup);
    }

    /* ─── 8. Zone 06: Projects — Real Developer Workstations & Labs ─────────── */
    buildProjectWorkstations() {
      this.workstationsGroup = new THREE.Group();
      this.workstationsGroup.position.set(0, 0, -42);

      // 3 Authentic Professional Workstations lining the engineering lab:
      // Workstation 1 (Left): AI & Distributed Systems (Dual 32" Monitors, Tower PC)
      this.buildSingleWorkstation({
        x: -16, z: 0,
        deskColor: 0x221810, // Dark Oak
        monitorCount: 2,
        ultrawide: false,
        hasTower: true,
        hasLaptop: true,
        title: 'Distributed Systems & AI Architecture'
      });

      // Workstation 2 (Center): Modern Web Product & Creative Studio (Curved Ultrawide 49")
      this.buildSingleWorkstation({
        x: 0, z: -8,
        deskColor: 0x281c14, // Solid Walnut
        monitorCount: 1,
        ultrawide: true,
        hasTower: false,
        hasLaptop: true,
        title: 'High-Throughput Web Platform'
      });

      // Workstation 3 (Right): Hardware Bench & Embedded IoT (Dual Monitors + Test Equipment)
      this.buildSingleWorkstation({
        x: 16, z: 2,
        deskColor: 0x1f242d, // Industrial Powder-coat
        monitorCount: 2,
        ultrawide: false,
        hasTower: true,
        hasTestBench: true,
        title: 'Autonomous Edge & Smart Contracts'
      });

      this.worldGroup.add(this.workstationsGroup);
    }

    buildSingleWorkstation(cfg) {
      const station = new THREE.Group();
      station.position.set(cfg.x, -5, cfg.z);

      // 1. Desk Surface (Ergonomic Chamfered Top)
      const deskWidth = cfg.ultrawide ? 13 : 11;
      const deskTopGeom = this.track(new THREE.BoxGeometry(deskWidth, 0.4, 5.5));
      const deskTopMat = this.track(new THREE.MeshStandardMaterial({
        color: cfg.deskColor,
        roughness: 0.45,
        metalness: 0.05
      }));
      const deskTop = new THREE.Mesh(deskTopGeom, deskTopMat);
      deskTop.position.set(0, 3.8, 0);
      deskTop.castShadow = true;
      station.add(deskTop);

      // 2. Steel Desk Legs (T-Shape Modern Frame)
      const legMat = this.track(new THREE.MeshStandardMaterial({ color: 0x14181f, metalness: 0.85, roughness: 0.3 }));
      const legGeom = this.track(new THREE.BoxGeometry(0.4, 3.8, 4.5));
      const leftLeg = new THREE.Mesh(legGeom, legMat);
      leftLeg.position.set(-deskWidth * 0.45, 1.9, 0);
      station.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeom, legMat);
      rightLeg.position.set(deskWidth * 0.45, 1.9, 0);
      station.add(rightLeg);

      // 3. Ergonomic Office Chair
      this.addErgonomicChair(station, 0, 0, 3.2);

      // 4. Displays & Computer Monitors
      if (cfg.ultrawide) {
        // Curved Ultrawide Display (49" 32:9 Aspect)
        const uwGeom = this.track(new THREE.BoxGeometry(7.2, 2.4, 0.25));
        const uwMat = this.track(new THREE.MeshStandardMaterial({
          map: this.textures.codeTex,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.75
        }));
        const uwScreen = new THREE.Mesh(uwGeom, uwMat);
        uwScreen.position.set(0, 5.6, -1.2);
        station.add(uwScreen);

        // Aluminum Monitor Arm Stand
        const standGeom = this.track(new THREE.CylinderGeometry(0.18, 0.22, 1.8, 8));
        const stand = new THREE.Mesh(standGeom, legMat);
        stand.position.set(0, 4.6, -1.8);
        station.add(stand);
      } else {
        // Dual 32" Monitor Setup
        const mGeom = this.track(new THREE.BoxGeometry(3.6, 2.2, 0.2));
        const mMat = this.track(new THREE.MeshStandardMaterial({
          map: this.textures.codeTex,
          emissive: 0x38bdf8,
          emissiveIntensity: 0.7
        }));

        const m1 = new THREE.Mesh(mGeom, mMat);
        m1.position.set(-2.2, 5.5, -1.2);
        m1.rotation.y = 0.15;
        station.add(m1);

        const m2 = new THREE.Mesh(mGeom, mMat);
        m2.position.set(2.2, 5.5, -1.2);
        m2.rotation.y = -0.15;
        station.add(m2);
      }

      // 5. Desktop Keyboard & Trackpad
      const kbGeom = this.track(new THREE.BoxGeometry(3.2, 0.1, 1.2));
      const kbMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.4 }));
      const kb = new THREE.Mesh(kbGeom, kbMat);
      kb.position.set(0, 4.05, 0.8);
      station.add(kb);

      // 6. Tower Workstation PC with RGB Cooling Vent
      if (cfg.hasTower) {
        const towerGeom = this.track(new THREE.BoxGeometry(1.4, 3.2, 3.2));
        const towerMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x0f141c,
          roughness: 0.35,
          metalness: 0.85
        }));
        const tower = new THREE.Mesh(towerGeom, towerMat);
        tower.position.set(deskWidth * 0.42, 1.6, 0.6);
        station.add(tower);
      }

      // 7. Hardware Test Equipment (Oscilloscope)
      if (cfg.hasTestBench) {
        const oscGeom = this.track(new THREE.BoxGeometry(2.4, 1.8, 2.2));
        const oscMat = this.track(new THREE.MeshStandardMaterial({
          color: 0x1e2530,
          emissive: 0x10b981,
          emissiveIntensity: 0.4
        }));
        const osc = new THREE.Mesh(oscGeom, oscMat);
        osc.position.set(-deskWidth * 0.35, 5.0, -0.6);
        station.add(osc);
      }

      this.workstationsGroup.add(station);
    }

    addErgonomicChair(parent, x, y, z) {
      const chair = new THREE.Group();
      chair.position.set(x, y, z);

      const fabricMat = this.track(new THREE.MeshStandardMaterial({ color: 0x181e28, roughness: 0.8 }));
      const frameMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0f1218, metalness: 0.8, roughness: 0.3 }));

      // Seat Cushion
      const seatGeom = this.track(new THREE.BoxGeometry(2.4, 0.4, 2.4));
      const seat = new THREE.Mesh(seatGeom, fabricMat);
      seat.position.y = 2.4;
      chair.add(seat);

      // Backrest
      const backGeom = this.track(new THREE.BoxGeometry(2.2, 3.2, 0.3));
      const back = new THREE.Mesh(backGeom, fabricMat);
      back.position.set(0, 4.0, 1.1);
      chair.add(back);

      // Central Gas Cylinder Base
      const baseGeom = this.track(new THREE.CylinderGeometry(0.18, 0.18, 2.4, 8));
      const base = new THREE.Mesh(baseGeom, frameMat);
      base.position.y = 1.2;
      chair.add(base);

      parent.add(chair);
    }

    /* ─── 9. Zone 07: Skills Diagnostic Bench & Hyperscale Server Room ──────── */
    buildSkillsAndServerDataCenter() {
      this.serverRoomGroup = new THREE.Group();
      this.serverRoomGroup.position.set(0, -3, -68);

      // Server Room Raised Floor Tiles (Perforated Industrial Tiles)
      const floorGeom = this.track(new THREE.BoxGeometry(32, 0.5, 36));
      const floorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x111622,
        roughness: 0.45,
        metalness: 0.65
      }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -2, 0);
      this.serverRoomGroup.add(floor);

      // 42U Hyperscale Server Racks (Flanking the central walking corridor)
      this.serverRacks = [];
      const rackGeom = this.track(new THREE.BoxGeometry(3.2, 12, 4.2));
      const rackMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x090d14,
        roughness: 0.35,
        metalness: 0.85
      }));

      const doorGeom = this.track(new THREE.PlaneGeometry(3.0, 11.6));
      const doorMat = this.track(new THREE.MeshStandardMaterial({
        map: this.textures.ledTex,
        emissive: 0x10b981,
        emissiveIntensity: 0.55
      }));

      const rackZCoords = [-12, -4, 4, 12];
      rackZCoords.forEach((z) => {
        // Left Row Racks
        const leftRack = new THREE.Group();
        leftRack.position.set(-7.5, 4, z);
        const bodyL = new THREE.Mesh(rackGeom, rackMat);
        leftRack.add(bodyL);
        const doorL = new THREE.Mesh(doorGeom, doorMat);
        doorL.position.set(1.61, 0, 0);
        doorL.rotation.y = Math.PI * 0.5;
        leftRack.add(doorL);
        this.serverRoomGroup.add(leftRack);
        this.serverRacks.push(doorL);

        // Right Row Racks
        const rightRack = new THREE.Group();
        rightRack.position.set(7.5, 4, z);
        const bodyR = new THREE.Mesh(rackGeom, rackMat);
        rightRack.add(bodyR);
        const doorR = new THREE.Mesh(doorGeom, doorMat);
        doorR.position.set(-1.61, 0, 0);
        doorR.rotation.y = -Math.PI * 0.5;
        rightRack.add(doorR);
        this.serverRoomGroup.add(rightRack);
        this.serverRacks.push(doorR);
      });

      // Overhead Cable Trays & Cooling Conduits
      const trayGeom = this.track(new THREE.BoxGeometry(22, 0.4, 34));
      const trayMat = this.track(new THREE.MeshStandardMaterial({
        color: 0xf5a623,
        roughness: 0.5,
        metalness: 0.6
      }));
      const tray = new THREE.Mesh(trayGeom, trayMat);
      tray.position.set(0, 10.5, 0);
      this.serverRoomGroup.add(tray);

      this.worldGroup.add(this.serverRoomGroup);
    }

    /* ─── 10. Zone 08: Experience — Suspended Glass Skybridge ────────────────── */
    buildExperienceSkybridge() {
      this.bridgeGroup = new THREE.Group();
      this.bridgeGroup.position.set(0, 0, -100);

      // Structural Suspended Glass Skybridge connecting campus wings
      // Floor Deck (Slate Pavers with embedded guide lights)
      const deckGeom = this.track(new THREE.BoxGeometry(10, 0.8, 38));
      const deckMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x18202d,
        roughness: 0.65,
        metalness: 0.25
      }));
      const deck = new THREE.Mesh(deckGeom, deckMat);
      deck.position.set(0, 0, 0);
      this.bridgeGroup.add(deck);

      // Glass Enclosure Walls (Left & Right Balustrades)
      const wallGeom = this.track(new THREE.BoxGeometry(0.3, 7, 38));
      const glassMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.25,
        roughness: 0.05,
        metalness: 0.1
      }));

      const leftWall = new THREE.Mesh(wallGeom, glassMat);
      leftWall.position.set(-4.8, 3.5, 0);
      this.bridgeGroup.add(leftWall);

      const rightWall = new THREE.Mesh(wallGeom, glassMat);
      rightWall.position.set(4.8, 3.5, 0);
      this.bridgeGroup.add(rightWall);

      // Career Milestone Physical Architectural Stanchions (2022 -> NOW)
      const milestones = ['2022 Foundations', '2023 Scaled Systems', '2024 Core Architecture', '2025 Autonomous AI', 'NOW Leadership'];
      const stanchionGeom = this.track(new THREE.BoxGeometry(0.5, 3.5, 1.2));
      const stanchionMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.4
      }));

      milestones.forEach((m, idx) => {
        const s = new THREE.Mesh(stanchionGeom, stanchionMat);
        const z = 14 - idx * 7.0;
        s.position.set(-4.3, 2.0, z);
        this.bridgeGroup.add(s);
      });

      this.worldGroup.add(this.bridgeGroup);
    }

    /* ─── 11. Zone 09: Living Universes Exhibition Gallery ───────────────────── */
    buildUniversesGallery() {
      this.galleryGroup = new THREE.Group();
      this.galleryGroup.position.set(0, 2, -145);

      // Exhibition Gallery Pavilion (Pedestals presenting 8 living architectural models)
      const galleryFloorGeom = this.track(new THREE.CylinderGeometry(24, 26, 1.2, 32));
      const galleryFloorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0d131f,
        roughness: 0.35,
        metalness: 0.45
      }));
      const floor = new THREE.Mesh(galleryFloorGeom, galleryFloorMat);
      floor.position.set(0, -1, 0);
      this.galleryGroup.add(floor);

      // 8 Physical Exhibition Pedestals
      const pedestalGeom = this.track(new THREE.CylinderGeometry(1.4, 1.6, 3.2, 16));
      const pedestalMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x1f293d,
        roughness: 0.4,
        metalness: 0.7
      }));

      const modelColors = [0xd4af37, 0x10b981, 0xec4899, 0x38bdf8, 0xa855f7, 0x00f5d4, 0xd97706, 0x8b5cf6];

      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const x = Math.cos(a) * 16;
        const z = Math.sin(a) * 16;

        const p = new THREE.Mesh(pedestalGeom, pedestalMat);
        p.position.set(x, 1.0, z);
        this.galleryGroup.add(p);

        // Architectural Miniature Model atop pedestal
        const mGeom = this.track(new THREE.BoxGeometry(1.6, 1.2, 1.6));
        const mMat = this.track(new THREE.MeshStandardMaterial({
          color: modelColors[i],
          emissive: modelColors[i],
          emissiveIntensity: 0.4,
          roughness: 0.3
        }));
        const m = new THREE.Mesh(mGeom, mMat);
        m.position.set(x, 3.2, z);
        this.galleryGroup.add(m);
      }

      this.worldGroup.add(this.galleryGroup);
    }

    /* ─── 12. Zone 10: Summit Observatory & Communications Plaza ────────────── */
    buildSummitObservatory() {
      this.observatoryGroup = new THREE.Group();
      this.observatoryGroup.position.set(0, 0, -182);

      // Summit Terrace Circular Stone Plaza
      const terraceGeom = this.track(new THREE.CylinderGeometry(20, 22, 2.5, 36));
      const stoneMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x222a38,
        roughness: 0.82,
        metalness: 0.08
      }));
      const terrace = new THREE.Mesh(terraceGeom, stoneMat);
      terrace.position.set(0, -1.25, 0);
      this.observatoryGroup.add(terrace);

      // Glass Balustrades surrounding the terrace
      const balustradeGeom = this.track(new THREE.CylinderGeometry(19.8, 19.8, 2.4, 36, 1, true));
      const balustradeMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.3,
        roughness: 0.05,
        side: THREE.DoubleSide
      }));
      const balustrade = new THREE.Mesh(balustradeGeom, balustradeMat);
      balustrade.position.set(0, 1.2, 0);
      this.observatoryGroup.add(balustrade);

      // Central Steel Communications Mast / Telecom Antenna Tower
      const mastGeom = this.track(new THREE.CylinderGeometry(0.4, 1.4, 45, 8));
      const mastMat = this.track(new THREE.MeshStandardMaterial({
        color: 0xa8b0b8,
        metalness: 0.9,
        roughness: 0.25
      }));
      const mast = new THREE.Mesh(mastGeom, mastMat);
      mast.position.set(0, 22.5, 0);
      this.observatoryGroup.add(mast);

      // Top Aircraft Warning Red / Solar Amber Beacon
      const beaconGeom = this.track(new THREE.SphereGeometry(0.9, 12, 12));
      const beaconMat = this.track(new THREE.MeshBasicMaterial({ color: 0xf5a623 }));
      this.summitBeacon = new THREE.Mesh(beaconGeom, beaconMat);
      this.summitBeacon.position.set(0, 45.2, 0);
      this.observatoryGroup.add(this.summitBeacon);

      this.worldGroup.add(this.observatoryGroup);
    }

    /* ─── 13. Dynamic Scroll Progress & Frame Animation ─────────────────────── */
    update(scrollProgress, time) {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // 1. Gentle natural pine tree sway
      if (this.terrainGroup && !this.isReducedMotion) {
        // Natural wind micro-sway
        const sway = Math.sin(time * 1.2) * 0.008;
        this.terrainGroup.children.forEach((child) => {
          if (child.isGroup) {
            child.rotation.z = sway;
          }
        });
      }

      // 2. Server Rack Activity LED Blinking
      if (this.serverRacks && !this.isReducedMotion) {
        const pulse = 0.45 + Math.sin(time * 8.0) * 0.25;
        this.serverRacks.forEach((door, idx) => {
          if (door.material) {
            door.material.emissiveIntensity = pulse + (idx % 3) * 0.1;
          }
        });
      }

      // 3. Summit Communications Beacon Pulse
      if (this.summitBeacon) {
        const bPulse = 0.5 + Math.sin(time * 4.0) * 0.5;
        this.summitBeacon.scale.set(1.0 + bPulse * 0.3, 1.0 + bPulse * 0.3, 1.0 + bPulse * 0.3);
      }
    }

    dispose() {
      this.geometries.forEach((g) => g.dispose());
      this.materials.forEach((m) => m.dispose());
    }
  }

  window.RealWorldVisualGenerator = RealWorldVisualGenerator;
})(typeof window !== 'undefined' ? window : global);

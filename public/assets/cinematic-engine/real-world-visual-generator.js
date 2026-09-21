/**
 * MyFolio Studio — RealWorldVisualGenerator Engine (Photorealistic Spatial Architecture)
 * Combines high-resolution environmental backdrops, PBR photographic materials,
 * physical developer workstations, transparent central processing units, AI research labs,
 * hyperscale server halls, suspended glass skybridges, and summit observatories into a
 * continuous, scroll-driven real-world journey.
 *
 * "MYFOLIO IS A PLACE, NOT A COLLECTION OF 3D OBJECTS."
 */
(function(window) {
  'use strict';

  class RealWorldVisualGenerator {
    constructor(scene, isMobile, isReducedMotion) {
      this.scene = scene;
      this.isMobile = isMobile;
      this.isReducedMotion = isReducedMotion;

      this.materials = [];
      this.geometries = [];
      this.textures = [];

      // World Group
      this.worldGroup = new THREE.Group();
      this.scene.add(this.worldGroup);

      // Texture Loader with sRGB encoding
      this.loader = new THREE.TextureLoader();

      // Load Photorealistic Environmental Assets
      this.loadTextures();

      // Build the 10 Real-World Connected Environments
      this.buildSkyboxPanorama();
      this.buildTerrainAndRoad();
      this.buildResearchPavilionExterior();
      this.buildTelemetryWorkspace();
      this.buildDataOperationsRoom();
      this.buildAILaboratory();
      this.buildLivingWorldHub();
      this.buildProjectWorkstations();
      this.buildDataCenterServerHall();
      this.buildCampusSkybridge();
      this.buildUniversesGallery();
      this.buildSummitObservatory();
    }

    track(res) {
      if (res.isMaterial) this.materials.push(res);
      if (res.isGeometry || res.isBufferGeometry) this.geometries.push(res);
      if (res.isTexture) this.textures.push(res);
      return res;
    }

    loadTextures() {
      const loadTex = (url) => {
        const t = this.track(this.loader.load(url));
        if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
        return t;
      };

      this.envValleyTex = loadTex('/assets/world/env_alpine_valley.jpg');
      this.envLabTex = loadTex('/assets/world/env_lab_workstations.jpg');
      this.envDataCenterTex = loadTex('/assets/world/env_datacenter_hall.jpg');
      this.envSkybridgeTex = loadTex('/assets/world/env_campus_skybridge.jpg');
      this.envSummitTex = loadTex('/assets/world/env_summit_observatory.jpg');

      // Generate High-Fidelity Procedural Screen Textures
      this.githubScreenTex = this.generateGithubScreenTexture();
      this.resumeScreenTex = this.generateResumeScreenTexture();
      this.deploymentScreenTex = this.generateDeploymentScreenTexture();
      this.aiLabScreenTex = this.generateAILabScreenTexture();
      this.project1ScreenTex = this.generateProjectScreenTexture('Distributed Microservices', 'gRPC • Kafka • Go', '1.1ms latency', '42k req/s');
      this.project2ScreenTex = this.generateProjectScreenTexture('Cryptographic Escrow', 'Solidity • Algorand • Python', 'Zero-Knowledge', 'Audited 100%');
      this.project3ScreenTex = this.generateProjectScreenTexture('Autonomous Edge Agent', 'PyTorch • ONNX • WebGL', '18ms inference', 'Neural 8-bit');
    }

    /* ─── Procedural Screen Texture 1: GitHub Telemetry Screen ──────────────── */
    generateGithubScreenTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Background
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 1024, 512);

      // Window Header
      ctx.fillStyle = '#161b22';
      ctx.fillRect(0, 0, 1024, 40);
      ctx.fillStyle = '#ff5f56'; ctx.beginPath(); ctx.arc(20, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffbd2e'; ctx.beginPath(); ctx.arc(40, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#27c93f'; ctx.beginPath(); ctx.arc(60, 20, 6, 0, Math.PI * 2); ctx.fill();

      // Profile Bar
      ctx.fillStyle = '#58a6ff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText('github.com/developer • 1,842 contributions in the last year', 90, 26);

      // Contribution Heat Map Title
      ctx.fillStyle = '#c9d1d9';
      ctx.font = 'bold 18px -apple-system, sans-serif';
      ctx.fillText('Contribution Activity & Cadence', 32, 75);

      // Render 52-week Contribution Heatmap Grid
      const greenPalette = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
      const cellWidth = 14;
      const cellGap = 3.5;
      const startX = 32;
      const startY = 95;

      for (let w = 0; w < 50; w++) {
        for (let d = 0; d < 7; d++) {
          const rand = Math.sin(w * 0.4 + d * 0.7) * 0.5 + 0.5;
          let level = 0;
          if (rand > 0.35) level = 1;
          if (rand > 0.6) level = 2;
          if (rand > 0.8) level = 3;
          if (rand > 0.92) level = 4;

          ctx.fillStyle = greenPalette[level];
          ctx.fillRect(startX + w * (cellWidth + cellGap), startY + d * (cellWidth + cellGap), cellWidth, cellWidth);
        }
      }

      // Month Markers below grid
      ctx.fillStyle = '#8b949e';
      ctx.font = '12px monospace';
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      months.forEach((m, idx) => {
        ctx.fillText(m, startX + idx * 72, 235);
      });

      // Top Repositories Grid (2 Cards)
      // Card 1
      ctx.fillStyle = '#161b22';
      ctx.strokeStyle = '#30363d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(32, 260, 460, 130, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#58a6ff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText('📦 distributed-consensus-cluster', 50, 292);

      ctx.fillStyle = '#8b949e';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.fillText('Fault-tolerant Raft consensus protocol running at 40k ops/sec.', 50, 318);

      ctx.fillStyle = '#3178c6'; ctx.beginPath(); ctx.arc(55, 355, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c9d1d9';
      ctx.font = '13px monospace';
      ctx.fillText('TypeScript  ★ 1,420   ⑂ 240', 68, 359);

      // Card 2
      ctx.fillStyle = '#161b22';
      ctx.beginPath();
      ctx.roundRect(512, 260, 480, 130, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#58a6ff';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.fillText('⚡ autonomous-edge-neural-agent', 530, 292);

      ctx.fillStyle = '#8b949e';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.fillText('Edge inference pipeline for spatial 3D WebGL reasoning.', 530, 318);

      ctx.fillStyle = '#3572A5'; ctx.beginPath(); ctx.arc(535, 355, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c9d1d9';
      ctx.font = '13px monospace';
      ctx.fillText('Python  ★ 920   ⑂ 110', 548, 359);

      // Bottom Commit Ticker
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 410, 1024, 102);
      ctx.fillStyle = '#3fb950';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('✔ Latest Commit: 4f981ae [main] Merge pull request #89: PBR spatial depth pipeline', 32, 445);
      ctx.fillStyle = '#8b949e';
      ctx.fillText('Verified cryptographic signature • All 48 tests passing in 820ms', 32, 475);

      const t = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
      return t;
    }

    /* ─── Procedural Screen Texture 2: Resume Dossier Screen ─────────────────── */
    generateResumeScreenTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Dossier Background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1024, 512);

      // Document Sheet Simulation
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(24, 20, 976, 472, 8);
      ctx.fill();

      // Resume Header
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.fillText('ABDUL AZIZ NOORUDDIN', 56, 68);

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('SYSTEMS ARCHITECT & MACHINE LEARNING RESEARCHER', 56, 92);

      ctx.fillStyle = '#64748b';
      ctx.font = '13px -apple-system, sans-serif';
      ctx.fillText('abdulaziz@myfolio.tech  •  myfolio.tech  •  San Francisco & Global Remote', 56, 114);

      // Divider
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(56, 126);
      ctx.lineTo(968, 126);
      ctx.stroke();

      // Left Column: Experience
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px -apple-system, sans-serif';
      ctx.fillText('EXPERIENCE', 56, 155);

      const exp = [
        { role: 'Principal Architect — MyFolio Studio', period: '2023–Present', desc: 'Engineered sub-60s autonomous 3D WebGL synthesis and PBR spatial engine.' },
        { role: 'Senior Systems Engineer — Cloud Infrastructure', period: '2021–2023', desc: 'Scaled microservices to 120,000 req/sec across distributed multi-region clusters.' },
        { role: 'AI Systems Specialist — Edge Inference', period: '2019–2021', desc: 'Designed low-latency model quantification pipelines with 18ms response times.' }
      ];

      exp.forEach((e, idx) => {
        const y = 182 + idx * 64;
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 13px -apple-system, sans-serif';
        ctx.fillText(e.role, 56, y);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px monospace';
        ctx.fillText(e.period, 440, y);
        ctx.fillStyle = '#334155';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillText(e.desc, 56, y + 20);
      });

      // Right Column: Core Competencies & Verification
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px -apple-system, sans-serif';
      ctx.fillText('CORE COMPETENCIES & STACK', 600, 155);

      const skills = [
        'Architecture: Distributed Systems, High-Concurrency WebGL, Microservices',
        'Languages: TypeScript, Go, Python, Rust, C++, SQL',
        'Frameworks: Three.js, React, Node.js, Docker, Kubernetes',
        'Cloud & AI: AWS, Supabase, Gemini LLM, ONNX, Edge TPU'
      ];

      skills.forEach((s, idx) => {
        ctx.fillStyle = '#334155';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillText('• ' + s, 600, 185 + idx * 30);
      });

      // Verified Dossier Seal Badge
      ctx.fillStyle = '#ecfdf5';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(600, 315, 368, 70, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#059669';
      ctx.font = 'bold 14px -apple-system, sans-serif';
      ctx.fillText('🛡️ VERIFIED EVIDENCE DOSSIER', 620, 345);
      ctx.fillStyle = '#047857';
      ctx.font = '12px monospace';
      ctx.fillText('100% Provenance: GitHub commits + Production Deploys', 620, 368);

      // Bottom Bar
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(24, 440, 976, 52);
      ctx.fillStyle = '#475569';
      ctx.font = '12px monospace';
      ctx.fillText('Dossier ID: MF-9821-AZIZ  •  Cryptographically verified PDF export ready', 56, 470);

      const t = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
      return t;
    }

    /* ─── Procedural Screen Texture 3: Production Deployment Dashboard ──────── */
    generateDeploymentScreenTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#080c14';
      ctx.fillRect(0, 0, 1024, 512);

      // Top Status Banner
      ctx.fillStyle = '#0e1626';
      ctx.fillRect(0, 0, 1024, 48);
      ctx.fillStyle = '#10b981';
      ctx.beginPath(); ctx.arc(28, 24, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('PRODUCTION CLUSTERS: ALL SYSTEMS OPERATIONAL (99.998% UPTIME)', 48, 30);

      // 4 Edge Node Gauges
      const regions = [
        { name: 'US-EAST (N. Virginia)', lat: '1.2ms', stat: 'Healthy', load: '42%' },
        { name: 'EU-WEST (Frankfurt)', lat: '2.4ms', stat: 'Healthy', load: '38%' },
        { name: 'AP-SOUTH (Mumbai)', lat: '1.8ms', stat: 'Healthy', load: '55%' },
        { name: 'AP-EAST (Tokyo)', lat: '3.1ms', stat: 'Healthy', load: '29%' }
      ];

      regions.forEach((r, idx) => {
        const x = 32 + idx * 240;
        ctx.fillStyle = '#101a2e';
        ctx.strokeStyle = '#1e293b';
        ctx.beginPath();
        ctx.roundRect(x, 70, 220, 100, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillText(r.name, x + 16, 96);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(r.lat, x + 16, 130);

        ctx.fillStyle = '#10b981';
        ctx.font = '12px monospace';
        ctx.fillText('● ' + r.stat + ' (' + r.load + ')', x + 16, 154);
      });

      // Throughput Chart Area
      ctx.fillStyle = '#0e1626';
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(32, 190, 960, 190, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 14px -apple-system, sans-serif';
      ctx.fillText('Global Request Ingestion Stream — 48,200 req/sec', 52, 220);

      // Draw Waveform
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 920; i += 10) {
        const y = 300 + Math.sin(i * 0.03) * 35 + Math.cos(i * 0.08) * 15;
        if (i === 0) ctx.moveTo(52 + i, y);
        else ctx.lineTo(52 + i, y);
      }
      ctx.stroke();

      // Bottom Terminal Strip
      ctx.fillStyle = '#05070d';
      ctx.fillRect(0, 400, 1024, 112);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '13px monospace';
      ctx.fillText('deploy@edge-cluster-01:~$ ctl status --all-services', 32, 435);
      ctx.fillStyle = '#10b981';
      ctx.fillText('✔ 12 Edge workers reconciled. Global DNS propagated across 34 edge points.', 32, 465);

      const t = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
      return t;
    }

    /* ─── Procedural Screen Texture 4: AI Research Lab Readout Screen ───────── */
    generateAILabScreenTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, 1024, 512);

      // Header Bar
      ctx.fillStyle = '#0b1326';
      ctx.fillRect(0, 0, 1024, 46);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('⚡ MYFOLIO AI RESEARCH LABORATORY — AUTONOMOUS REASONING NODE', 32, 30);

      // Real-Time Analysis Readout exactly per specification:
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('ANALYZING CANDIDATE DATA', 48, 90);

      const rows = [
        { label: 'GitHub Repositories & Commits', pct: '100%', status: 'VERIFIED' },
        { label: 'Resume Credentials & Dossier', pct: '100%', status: 'PARSED' },
        { label: 'Project Architecture Proofs', pct: '100%', status: 'CONFIRMED' },
        { label: 'Career Milestone Evidence', pct: '100%', status: 'VALIDATED' }
      ];

      rows.forEach((r, idx) => {
        const y = 130 + idx * 36;
        ctx.fillStyle = '#f8fafc';
        ctx.font = '15px monospace';
        ctx.fillText(r.label.padEnd(34, '.'), 48, y);
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(r.pct + ' [' + r.status + ']', 460, y);
      });

      // Progress Bar Section
      ctx.fillStyle = '#f5a623';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('GENERATING PORTFOLIO WORLD', 48, 300);

      // Large Visual Progress Bar
      ctx.fillStyle = '#16233d';
      ctx.fillRect(48, 320, 720, 32);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(48, 320, 720 * 0.87, 32);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('████████████████░░░ 87%', 56, 343);

      // Diagnostic Metrics Box
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(800, 70, 192, 360, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('TELEMETRY', 820, 100);

      const stats = [
        'PBR: 120 FPS',
        'Mesh: 142 Nodes',
        'Vibe: Real-World',
        'Shaders: ACES',
        'Splines: 10 Zones',
        'Subsurface: On',
        'Memory: 44MB'
      ];
      stats.forEach((s, idx) => {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText(s, 820, 135 + idx * 32);
      });

      // Bottom Message
      ctx.fillStyle = '#0a1020';
      ctx.fillRect(0, 420, 1024, 92);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '14px monospace';
      ctx.fillText('✦ Terraforming real-world architectural pavilion directly from candidate DNA.', 48, 465);

      const t = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
      return t;
    }

    /* ─── Procedural Screen Texture 5: Project Workstation Screen ───────────── */
    generateProjectScreenTexture(title, stack, spec1, spec2) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#090d18';
      ctx.fillRect(0, 0, 1024, 512);

      // Window Header
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, 1024, 40);
      ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(20, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(40, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(60, 20, 6, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('SYSTEM PROJECT WORKSTATION // ' + title.toUpperCase(), 90, 26);

      // Project Title Card
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.fillText(title, 40, 90);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(stack + '  •  ' + spec1 + '  •  ' + spec2, 40, 120);

      // Architecture Topology Blueprint
      ctx.fillStyle = '#0c1322';
      ctx.strokeStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(40, 145, 944, 210, 8);
      ctx.fill();
      ctx.stroke();

      // Draw Node Diagram
      const nodeX = [120, 360, 600, 840];
      const nodeY = [250, 210, 290, 250];
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nodeX[0], nodeY[0]);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(nodeX[i], nodeY[i]);
      }
      ctx.stroke();

      const nodeLabels = ['Client Gateway', 'Consensus Engine', 'State Database', 'Edge Cache'];
      nodeX.forEach((nx, idx) => {
        const ny = nodeY[idx];
        ctx.fillStyle = '#0369a1';
        ctx.beginPath(); ctx.arc(nx, ny, 22, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(String(idx + 1), nx - 4, ny + 4);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.fillText(nodeLabels[idx], nx - 35, ny + 44);
      });

      // Terminal Logs at Bottom
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 380, 1024, 132);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('root@workstation:~$ ./bin/benchmark --concurrency=500', 40, 415);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('✔ Completed 500,000 requests with zero dropped frames. P99 Latency: 1.4ms', 40, 445);
      ctx.fillStyle = '#64748b';
      ctx.fillText('All automated test suites passing. Live deployment ready at https://myfolio.tech', 40, 475);

      const t = new THREE.CanvasTexture(canvas);
      if (THREE.sRGBEncoding) t.encoding = THREE.sRGBEncoding;
      return t;
    }

    /* ─── 1. Panoramic Environmental Sky Cylinder (Zone 00 - Outdoor) ───────── */
    buildSkyboxPanorama() {
      const skyGeom = this.track(new THREE.CylinderGeometry(300, 300, 220, 48, 1, true));
      const skyMat = this.track(new THREE.MeshBasicMaterial({
        map: this.envValleyTex,
        side: THREE.BackSide,
        depthWrite: false
      }));

      this.skyCylinder = new THREE.Mesh(skyGeom, skyMat);
      this.skyCylinder.position.set(0, 30, -50);
      this.worldGroup.add(this.skyCylinder);
    }

    /* ─── 2. Landscape Terrain & Paved Campus Road (Zone 00 - Approach) ──────── */
    buildTerrainAndRoad() {
      this.terrainGroup = new THREE.Group();
      this.terrainGroup.position.set(0, -6, 0);

      // Alpine Valley Ground
      const groundGeom = this.track(new THREE.PlaneGeometry(380, 480, 36, 48));
      const pos = groundGeom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.abs(x);
        const elevation = Math.max(0, (dist - 28) * 0.35) + Math.sin(y * 0.04) * 4.0;
        pos.setZ(i, elevation);
      }
      groundGeom.computeVertexNormals();

      const groundMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x162c20,
        roughness: 0.9,
        metalness: 0.02,
        flatShading: true
      }));
      const ground = new THREE.Mesh(groundGeom, groundMat);
      ground.rotation.x = -Math.PI * 0.5;
      ground.receiveShadow = true;
      this.terrainGroup.add(ground);

      // Paved Access Roadway
      const roadGeom = this.track(new THREE.PlaneGeometry(18, 280));
      const roadMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x1b2029,
        roughness: 0.88,
        metalness: 0.06
      }));
      const road = new THREE.Mesh(roadGeom, roadMat);
      road.rotation.x = -Math.PI * 0.5;
      road.position.set(0, 0.1, 20);
      road.receiveShadow = true;
      this.terrainGroup.add(road);

      // Granite Curbs
      const curbMat = this.track(new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.7 }));
      const curbGeom = this.track(new THREE.BoxGeometry(0.6, 0.3, 280));

      const leftCurb = new THREE.Mesh(curbGeom, curbMat);
      leftCurb.position.set(-9.3, 0.25, 20);
      this.terrainGroup.add(leftCurb);

      const rightCurb = new THREE.Mesh(curbGeom, curbMat);
      rightCurb.position.set(9.3, 0.25, 20);
      this.terrainGroup.add(rightCurb);

      // Road Centerline Striping
      const lineGeom = this.track(new THREE.PlaneGeometry(0.4, 260));
      const lineMat = this.track(new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }));
      const line = new THREE.Mesh(lineGeom, lineMat);
      line.rotation.x = -Math.PI * 0.5;
      line.position.set(0, 0.15, 20);
      this.terrainGroup.add(line);

      // Coniferous Pine Trees
      this.buildPineTrees();

      this.worldGroup.add(this.terrainGroup);
    }

    buildPineTrees() {
      const treeCount = this.isMobile ? 24 : 56;
      const treeGroup = new THREE.Group();

      const trunkGeom = this.track(new THREE.CylinderGeometry(0.3, 0.5, 6, 6));
      const trunkMat = this.track(new THREE.MeshStandardMaterial({ color: 0x22160e, roughness: 0.9 }));

      const coneGeom = this.track(new THREE.ConeGeometry(3.0, 7.5, 6));
      const foliageMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0e2c1b,
        roughness: 0.8,
        flatShading: true
      }));

      for (let i = 0; i < treeCount; i++) {
        const side = (i % 2 === 0) ? 1 : -1;
        const x = side * (24 + Math.random() * 65);
        const z = 100 - (i * 5.6) + (Math.random() * 6);
        const scale = 0.75 + Math.random() * 0.5;

        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(trunkGeom, trunkMat);
        trunk.position.y = 3;
        tree.add(trunk);

        const f1 = new THREE.Mesh(coneGeom, foliageMat);
        f1.position.y = 6.5;
        tree.add(f1);

        const f2 = new THREE.Mesh(coneGeom, foliageMat);
        f2.position.y = 9.0;
        f2.scale.set(0.75, 0.75, 0.75);
        tree.add(f2);

        tree.position.set(x, 0, z);
        tree.scale.set(scale, scale, scale);
        treeGroup.add(tree);
      }

      this.terrainGroup.add(treeGroup);
    }

    /* ─── 3. Zone 01: Research Pavilion Exterior (Hero) ─────────────────────── */
    buildResearchPavilionExterior() {
      this.pavilionGroup = new THREE.Group();
      this.pavilionGroup.position.set(0, 0, 75);

      // Cantilevered Cast Concrete Roof Canopy
      const roofGeom = this.track(new THREE.BoxGeometry(48, 2.8, 38));
      const concreteMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x888e96,
        roughness: 0.82,
        metalness: 0.08
      }));
      const roof = new THREE.Mesh(roofGeom, concreteMat);
      roof.position.set(0, 16.5, 0);
      roof.castShadow = true;
      this.pavilionGroup.add(roof);

      // 4 Main Structural Steel Architectural Columns
      const colGeom = this.track(new THREE.BoxGeometry(2.4, 16.5, 2.4));
      const colMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1f242e, metalness: 0.85, roughness: 0.25 }));
      [[-20, 8.25, -16], [20, 8.25, -16], [-20, 8.25, 16], [20, 8.25, 16]].forEach(([cx, cy, cz]) => {
        const col = new THREE.Mesh(colGeom, colMat);
        col.position.set(cx, cy, cz);
        col.castShadow = true;
        this.pavilionGroup.add(col);
      });

      // Floor-to-Ceiling Structural Architectural Glass
      const glassGeom = this.track(new THREE.BoxGeometry(44, 14, 0.4));
      const glassMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        roughness: 0.04,
        metalness: 0.2,
        transparent: true,
        opacity: 0.32
      }));
      const glass = new THREE.Mesh(glassGeom, glassMat);
      glass.position.set(0, 7, -15);
      this.pavilionGroup.add(glass);

      // Steel Mullions
      for (let mx = -18; mx <= 18; mx += 6) {
        const mulGeom = this.track(new THREE.BoxGeometry(0.3, 14, 0.5));
        const mul = new THREE.Mesh(mulGeom, colMat);
        mul.position.set(mx, 7, -15);
        this.pavilionGroup.add(mul);
      }

      // Slate Paved Entrance Plaza with Steps
      const plazaGeom = this.track(new THREE.BoxGeometry(52, 0.8, 34));
      const slateMat = this.track(new THREE.MeshStandardMaterial({ color: 0x232936, roughness: 0.75, metalness: 0.08 }));
      const plaza = new THREE.Mesh(plazaGeom, slateMat);
      plaza.position.set(0, -5.6, 6);
      plaza.receiveShadow = true;
      this.pavilionGroup.add(plaza);

      this.worldGroup.add(this.pavilionGroup);
    }

    /* ─── 4. Zone 02: Telemetry Developer Workspace (Chapter 1) ─────────────── */
    buildTelemetryWorkspace() {
      this.telemetryGroup = new THREE.Group();
      this.telemetryGroup.position.set(0, -2, 44);

      // Polished Dark Concrete Flooring
      const floorGeom = this.track(new THREE.BoxGeometry(36, 0.4, 28));
      const floorMat = this.track(new THREE.MeshStandardMaterial({ color: 0x161e2e, roughness: 0.4, metalness: 0.1 }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -3.2, 0);
      floor.receiveShadow = true;
      this.telemetryGroup.add(floor);

      // Large Solid American Walnut Executive Developer Desk
      const deskTopGeom = this.track(new THREE.BoxGeometry(16, 0.4, 7));
      const walnutMat = this.track(new THREE.MeshStandardMaterial({ color: 0x24160f, roughness: 0.45, metalness: 0.02 }));
      const desk = new THREE.Mesh(deskTopGeom, walnutMat);
      desk.position.set(0, 1.6, 0);
      desk.castShadow = true;
      this.telemetryGroup.add(desk);

      // Steel Desk Legs with Cable Grommets
      const legMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0f141c, metalness: 0.9, roughness: 0.25 }));
      const legGeom = this.track(new THREE.BoxGeometry(0.5, 4.8, 6.2));
      const l1 = new THREE.Mesh(legGeom, legMat); l1.position.set(-7.5, -0.8, 0); this.telemetryGroup.add(l1);
      const l2 = new THREE.Mesh(legGeom, legMat); l2.position.set(7.5, -0.8, 0); this.telemetryGroup.add(l2);

      // 3 Display Monitors on Desk:
      // Left Monitor: GitHub Screen (Heatmap, Repos, Activity)
      const mGeom = this.track(new THREE.BoxGeometry(4.6, 2.8, 0.2));
      const ghMat = this.track(new THREE.MeshStandardMaterial({
        map: this.githubScreenTex,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.75,
        roughness: 0.2
      }));
      const ghScreen = new THREE.Mesh(mGeom, ghMat);
      ghScreen.position.set(-5.0, 3.4, -1.2);
      ghScreen.rotation.y = 0.25;
      this.telemetryGroup.add(ghScreen);

      // Center Monitor: Resume PDF Dossier Document on Display
      const resumeMat = this.track(new THREE.MeshStandardMaterial({
        map: this.resumeScreenTex,
        emissive: 0xffffff,
        emissiveIntensity: 0.85,
        roughness: 0.15
      }));
      const resumeScreen = new THREE.Mesh(mGeom, resumeMat);
      resumeScreen.position.set(0, 3.5, -1.6);
      this.telemetryGroup.add(resumeScreen);

      // Right Monitor: Production Deployment Dashboard
      const deployMat = this.track(new THREE.MeshStandardMaterial({
        map: this.deploymentScreenTex,
        emissive: 0x10b981,
        emissiveIntensity: 0.75,
        roughness: 0.2
      }));
      const deployScreen = new THREE.Mesh(mGeom, deployMat);
      deployScreen.position.set(5.0, 3.4, -1.2);
      deployScreen.rotation.y = -0.25;
      this.telemetryGroup.add(deployScreen);

      // Monitor Aluminum Desk Mount Arms
      const armGeom = this.track(new THREE.CylinderGeometry(0.12, 0.12, 2.0, 8));
      const armMat = this.track(new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 }));
      [-5.0, 0, 5.0].forEach((ax) => {
        const arm = new THREE.Mesh(armGeom, armMat);
        arm.position.set(ax, 2.4, -1.4);
        this.telemetryGroup.add(arm);
      });

      // Desktop Accessories: Keyboard, Mouse, Notebook, Lamp
      this.addDesktopProps(this.telemetryGroup, 0, 1.8, 1.0);

      // Ergonomic Office Task Chair
      this.addErgonomicChair(this.telemetryGroup, 0, -3.2, 4.5);

      // Architectural Biophilic Planters
      this.addPlanter(this.telemetryGroup, -12, -3.2, 0);
      this.addPlanter(this.telemetryGroup, 12, -3.2, 0);

      this.worldGroup.add(this.telemetryGroup);
    }

    addDesktopProps(parent, x, y, z) {
      // Backlit Keyboard
      const kbGeom = this.track(new THREE.BoxGeometry(3.6, 0.12, 1.4));
      const kbMat = this.track(new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 }));
      const kb = new THREE.Mesh(kbGeom, kbMat);
      kb.position.set(x, y + 0.06, z);
      parent.add(kb);

      // Ergonomic Mouse
      const mouseGeom = this.track(new THREE.BoxGeometry(0.6, 0.18, 0.9));
      const mouse = new THREE.Mesh(mouseGeom, kbMat);
      mouse.position.set(x + 2.6, y + 0.09, z);
      parent.add(mouse);

      // Physical Paper Notebook with Pen
      const nbGeom = this.track(new THREE.BoxGeometry(1.6, 0.08, 2.2));
      const nbMat = this.track(new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 }));
      const nb = new THREE.Mesh(nbGeom, nbMat);
      nb.position.set(x - 2.8, y + 0.04, z - 0.2);
      nb.rotation.y = 0.1;
      parent.add(nb);

      // Ceramic Coffee Tumbler
      const cupGeom = this.track(new THREE.CylinderGeometry(0.3, 0.25, 0.8, 12));
      const cupMat = this.track(new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 }));
      const cup = new THREE.Mesh(cupGeom, cupMat);
      cup.position.set(x + 4.2, y + 0.4, z - 0.5);
      parent.add(cup);

      // Architect Task Desk Lamp with Warm Spotlight
      const lampBase = this.track(new THREE.CylinderGeometry(0.6, 0.6, 0.1, 12));
      const lampMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 }));
      const lMesh = new THREE.Mesh(lampBase, lampMat);
      lMesh.position.set(x - 5.5, y + 0.05, z - 1.2);
      parent.add(lMesh);

      const lampArm = this.track(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 8));
      const lArm = new THREE.Mesh(lampArm, lampMat);
      lArm.position.set(x - 5.2, y + 1.3, z - 0.8);
      lArm.rotation.z = -0.3;
      parent.add(lArm);

      const lampShade = this.track(new THREE.ConeGeometry(0.6, 0.9, 12));
      const lShade = new THREE.Mesh(lampShade, lampMat);
      lShade.position.set(x - 4.2, y + 2.2, z - 0.4);
      lShade.rotation.x = 0.6;
      parent.add(lShade);

      const taskLight = new THREE.PointLight(0xfffaed, 1.6, 12, 2);
      taskLight.position.set(x - 4.2, y + 2.0, z - 0.4);
      parent.add(taskLight);
    }

    addErgonomicChair(parent, x, y, z) {
      const chair = new THREE.Group();
      chair.position.set(x, y, z);

      const plasticMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }));
      const meshMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));

      // Star Base with Casters
      const baseGeom = this.track(new THREE.CylinderGeometry(1.6, 1.6, 0.2, 5));
      const base = new THREE.Mesh(baseGeom, plasticMat);
      base.position.y = 0.5;
      chair.add(base);

      // Hydraulic Stem
      const stemGeom = this.track(new THREE.CylinderGeometry(0.2, 0.2, 2.2, 8));
      const chromeMat = this.track(new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 }));
      const stem = new THREE.Mesh(stemGeom, chromeMat);
      stem.position.y = 1.6;
      chair.add(stem);

      // Ergonomic Seat Cushion
      const seatGeom = this.track(new THREE.BoxGeometry(2.8, 0.4, 2.8));
      const seat = new THREE.Mesh(seatGeom, meshMat);
      seat.position.y = 2.8;
      chair.add(seat);

      // Curved Backrest
      const backGeom = this.track(new THREE.BoxGeometry(2.6, 3.6, 0.3));
      const back = new THREE.Mesh(backGeom, meshMat);
      back.position.set(0, 4.8, 1.2);
      chair.add(back);

      // Armrests
      [-1.5, 1.5].forEach((ax) => {
        const armG = this.track(new THREE.BoxGeometry(0.3, 1.2, 1.6));
        const arm = new THREE.Mesh(armG, plasticMat);
        arm.position.set(ax, 3.6, 0.3);
        chair.add(arm);
      });

      parent.add(chair);
    }

    /* ─── 5. Zone 03: Data Convergence / Operations Room (Chapter 2) ────────── */
    buildDataOperationsRoom() {
      this.dataOpsGroup = new THREE.Group();
      this.dataOpsGroup.position.set(0, -2, 18);

      // Concrete Floor
      const floorGeom = this.track(new THREE.BoxGeometry(40, 0.4, 24));
      const floorMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0c1322, roughness: 0.4, metalness: 0.4 }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -3.2, 0);
      this.dataOpsGroup.add(floor);

      // Central Processing Machine Cabinet (Transparent Server Core)
      const coreCabinetGeom = this.track(new THREE.BoxGeometry(7.0, 9.0, 5.0));
      const glassCoreMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
        roughness: 0.05,
        metalness: 0.3
      }));
      const coreCabinet = new THREE.Mesh(coreCabinetGeom, glassCoreMat);
      coreCabinet.position.set(0, 1.5, 0);
      this.dataOpsGroup.add(coreCabinet);

      // Internal Glowing Motherboards & Processors
      const boardGeom = this.track(new THREE.BoxGeometry(5.8, 8.0, 0.3));
      const boardMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        emissive: 0x10b981,
        emissiveIntensity: 0.45,
        metalness: 0.6
      }));
      [-1.2, 0, 1.2].forEach((bz) => {
        const b = new THREE.Mesh(boardGeom, boardMat);
        b.position.set(0, 1.5, bz);
        this.dataOpsGroup.add(b);
      });

      // Copper Cooling Conduits running into cabinet
      const pipeGeom = this.track(new THREE.CylinderGeometry(0.25, 0.25, 9.5, 8));
      const copperMat = this.track(new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.85, roughness: 0.2 }));
      [-2.8, 2.8].forEach((px) => {
        const p = new THREE.Mesh(pipeGeom, copperMat);
        p.position.set(px, 1.5, 0);
        this.dataOpsGroup.add(p);
      });

      // Flanking Diagnostic Glass Panels
      const glassWallGeom = this.track(new THREE.BoxGeometry(0.3, 8.0, 18.0));
      const wallMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1
      }));
      [-12, 12].forEach((wx) => {
        const w = new THREE.Mesh(glassWallGeom, wallMat);
        w.position.set(wx, 1.5, 0);
        this.dataOpsGroup.add(w);
      });

      // Yellow Overhead Fiber Optic Trays
      const trayGeom = this.track(new THREE.BoxGeometry(24, 0.3, 20));
      const trayMat = this.track(new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.5 }));
      const tray = new THREE.Mesh(trayGeom, trayMat);
      tray.position.set(0, 6.8, 0);
      this.dataOpsGroup.add(tray);

      this.worldGroup.add(this.dataOpsGroup);
    }

    /* ─── 6. Zone 04: AI Research Laboratory (Chapter 3) ────────────────────── */
    buildAILaboratory() {
      this.aiLabGroup = new THREE.Group();
      this.aiLabGroup.position.set(0, -2, -8);

      // Lab Floor
      const floorGeom = this.track(new THREE.BoxGeometry(44, 0.4, 26));
      const floorMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35, metalness: 0.3 }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -3.2, 0);
      this.aiLabGroup.add(floor);

      // AI Synthesis Workstation Bench
      const benchTopGeom = this.track(new THREE.BoxGeometry(18, 0.4, 5.5));
      const steelBenchMat = this.track(new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.75, roughness: 0.3 }));
      const bench = new THREE.Mesh(benchTopGeom, steelBenchMat);
      bench.position.set(0, 1.6, 0);
      this.aiLabGroup.add(bench);

      // Dual High-Resolution AI Laboratory Readout Monitors
      const labMonGeom = this.track(new THREE.BoxGeometry(6.4, 3.4, 0.2));
      const aiScreenMat = this.track(new THREE.MeshStandardMaterial({
        map: this.aiLabScreenTex,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.85,
        roughness: 0.15
      }));
      const aiScreen = new THREE.Mesh(labMonGeom, aiScreenMat);
      aiScreen.position.set(0, 3.8, -1.2);
      this.aiLabGroup.add(aiScreen);

      // High-End Compute GPU Towers flanking bench
      const towerGeom = this.track(new THREE.BoxGeometry(2.0, 4.4, 3.8));
      const towerMat = this.track(new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9, roughness: 0.2 }));
      [-7.5, 7.5].forEach((tx) => {
        const tower = new THREE.Mesh(towerGeom, towerMat);
        tower.position.set(tx, 0.8, 0);
        this.aiLabGroup.add(tower);
      });

      // Digital Oscilloscope on Bench
      const oscGeom = this.track(new THREE.BoxGeometry(2.6, 1.8, 2.2));
      const oscMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x10b981, emissiveIntensity: 0.5 }));
      const osc = new THREE.Mesh(oscGeom, oscMat);
      osc.position.set(-5.5, 2.7, 0.2);
      this.aiLabGroup.add(osc);

      this.worldGroup.add(this.aiLabGroup);
    }

    /* ─── 7. Zone 05: The Living World Hub (Chapter 4) ──────────────────────── */
    buildLivingWorldHub() {
      this.livingHubGroup = new THREE.Group();
      this.livingHubGroup.position.set(0, -2, -32);

      // Photorealistic Mountain Lab Panoramic Backdrop Plate
      const labBackdropGeom = this.track(new THREE.PlaneGeometry(88, 48));
      const labBackdropMat = this.track(new THREE.MeshBasicMaterial({
        map: this.envLabTex,
        side: THREE.DoubleSide
      }));
      const labBackdrop = new THREE.Mesh(labBackdropGeom, labBackdropMat);
      labBackdrop.position.set(0, 10, -26);
      this.livingHubGroup.add(labBackdrop);

      // Polished Architectural Stone Floor
      const floorGeom = this.track(new THREE.BoxGeometry(50, 0.4, 24));
      const floorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x151f30,
        roughness: 0.38,
        metalness: 0.15
      }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -3.2, 0);
      this.livingHubGroup.add(floor);

      // Biophilic Indoor Trees & Planters
      this.addPlanter(this.livingHubGroup, -15, -3.2, -6);
      this.addPlanter(this.livingHubGroup, 15, -3.2, -6);

      this.worldGroup.add(this.livingHubGroup);
    }

    /* ─── 8. Zone 06: Active Project Workstations & Labs (Chapter 5) ─────────── */
    buildProjectWorkstations() {
      this.studioGroup = new THREE.Group();
      this.studioGroup.position.set(0, 0, -56);

      // Polished Floor
      const floorGeom = this.track(new THREE.BoxGeometry(60, 0.5, 36));
      const floorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x131a28,
        roughness: 0.42,
        metalness: 0.15
      }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -5, 0);
      floor.receiveShadow = true;
      this.studioGroup.add(floor);

      // Station 1: Distributed Microservices (Left)
      this.buildProjectStation({
        x: -16, z: 2,
        title: 'Distributed Microservices',
        screenTex: this.project1ScreenTex,
        deskColor: 0x1e242e
      });

      // Station 2: Cryptographic Escrow & Web3 (Center)
      this.buildProjectStation({
        x: 0, z: -4,
        title: 'Cryptographic Escrow',
        screenTex: this.project2ScreenTex,
        deskColor: 0x241710
      });

      // Station 3: Autonomous Edge AI Agents (Right)
      this.buildProjectStation({
        x: 16, z: 4,
        title: 'Autonomous Edge AI',
        screenTex: this.project3ScreenTex,
        deskColor: 0x1a2130
      });

      this.worldGroup.add(this.studioGroup);
    }

    buildProjectStation(cfg) {
      const ws = new THREE.Group();
      ws.position.set(cfg.x, -5, cfg.z);

      const deskTopGeom = this.track(new THREE.BoxGeometry(11, 0.4, 5.5));
      const deskTopMat = this.track(new THREE.MeshStandardMaterial({ color: cfg.deskColor, roughness: 0.45, metalness: 0.05 }));
      const desk = new THREE.Mesh(deskTopGeom, deskTopMat);
      desk.position.set(0, 3.8, 0);
      ws.add(desk);

      // Steel Desk Legs
      const legMat = this.track(new THREE.MeshStandardMaterial({ color: 0x111620, metalness: 0.85, roughness: 0.3 }));
      const legGeom = this.track(new THREE.BoxGeometry(0.4, 3.8, 4.8));
      const legL = new THREE.Mesh(legGeom, legMat); legL.position.set(-4.8, 1.9, 0); ws.add(legL);
      const legR = new THREE.Mesh(legGeom, legMat); legR.position.set(4.8, 1.9, 0); ws.add(legR);

      // Project Monitor with Realistic Dedicated Project Screen
      const mGeom = this.track(new THREE.BoxGeometry(5.2, 2.9, 0.2));
      const screenMat = this.track(new THREE.MeshStandardMaterial({
        map: cfg.screenTex,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.8,
        roughness: 0.2
      }));
      const screen = new THREE.Mesh(mGeom, screenMat);
      screen.position.set(0, 5.6, -1.2);
      ws.add(screen);

      // Keyboard & Task Chair
      const kbGeom = this.track(new THREE.BoxGeometry(3.2, 0.1, 1.2));
      const kbMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.4 }));
      const kb = new THREE.Mesh(kbGeom, kbMat);
      kb.position.set(0, 4.05, 0.8);
      ws.add(kb);

      this.addChair(ws, 0, 0, 3.2);

      this.studioGroup.add(ws);
    }

    addChair(parent, x, y, z) {
      const chair = new THREE.Group();
      chair.position.set(x, y, z);

      const fabricMat = this.track(new THREE.MeshStandardMaterial({ color: 0x181e28, roughness: 0.8 }));
      const seatGeom = this.track(new THREE.BoxGeometry(2.4, 0.4, 2.4));
      const seat = new THREE.Mesh(seatGeom, fabricMat);
      seat.position.y = 2.4;
      chair.add(seat);

      const backGeom = this.track(new THREE.BoxGeometry(2.2, 3.2, 0.3));
      const back = new THREE.Mesh(backGeom, fabricMat);
      back.position.set(0, 4.0, 1.1);
      chair.add(back);

      parent.add(chair);
    }

    addPlanter(parent, x, y, z) {
      const potGeom = this.track(new THREE.BoxGeometry(3.0, 3.4, 3.0));
      const potMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1c212b, roughness: 0.6 }));
      const pot = new THREE.Mesh(potGeom, potMat);
      pot.position.set(x, y + 1.7, z);
      parent.add(pot);

      const foliageGeom = this.track(new THREE.SphereGeometry(1.8, 8, 8));
      const foliageMat = this.track(new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.7 }));
      const foliage = new THREE.Mesh(foliageGeom, foliageMat);
      foliage.position.set(x, y + 4.2, z);
      parent.add(foliage);
    }

    /* ─── 9. Zone 07: Hyperscale Server Hall & Data Center (Chapter 6) ──────── */
    buildDataCenterServerHall() {
      this.dcGroup = new THREE.Group();
      this.dcGroup.position.set(0, -3, -84);

      // Deep Perspective Data Center Aisle Backdrop Plate
      const dcBackdropGeom = this.track(new THREE.PlaneGeometry(64, 38));
      const dcBackdropMat = this.track(new THREE.MeshBasicMaterial({
        map: this.envDataCenterTex,
        side: THREE.DoubleSide
      }));
      const dcBackdrop = new THREE.Mesh(dcBackdropGeom, dcBackdropMat);
      dcBackdrop.position.set(0, 11, -30);
      this.dcGroup.add(dcBackdrop);

      // Raised Server Room Floor Tiles
      const floorGeom = this.track(new THREE.BoxGeometry(32, 0.5, 40));
      const floorMat = this.track(new THREE.MeshStandardMaterial({ color: 0x111622, roughness: 0.45, metalness: 0.65 }));
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.set(0, -2, 0);
      this.dcGroup.add(floor);

      // 42U Server Cabinets with Blinking Green & Amber Status LEDs
      this.serverLeds = [];
      const rackGeom = this.track(new THREE.BoxGeometry(3.4, 12.5, 4.4));
      const rackMat = this.track(new THREE.MeshStandardMaterial({ color: 0x0a0e16, metalness: 0.85, roughness: 0.3 }));

      const ledGeom = this.track(new THREE.PlaneGeometry(0.15, 11.8));
      const ledMat = this.track(new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.8 }));

      [-14, -5, 5, 14].forEach((z) => {
        // Left Rack
        const leftRack = new THREE.Group();
        leftRack.position.set(-8.5, 4.25, z);
        leftRack.add(new THREE.Mesh(rackGeom, rackMat));

        const ledL = new THREE.Mesh(ledGeom, ledMat);
        ledL.position.set(1.71, 0, 0);
        ledL.rotation.y = Math.PI * 0.5;
        leftRack.add(ledL);
        this.serverLeds.push(ledL);
        this.dcGroup.add(leftRack);

        // Right Rack
        const rightRack = new THREE.Group();
        rightRack.position.set(8.5, 4.25, z);
        rightRack.add(new THREE.Mesh(rackGeom, rackMat));

        const ledR = new THREE.Mesh(ledGeom, ledMat);
        ledR.position.set(-1.71, 0, 0);
        ledR.rotation.y = -Math.PI * 0.5;
        rightRack.add(ledR);
        this.serverLeds.push(ledR);
        this.dcGroup.add(rightRack);
      });

      // Overhead Yellow Fiber Optic Cable Trays
      const trayGeom = this.track(new THREE.BoxGeometry(20, 0.4, 38));
      const trayMat = this.track(new THREE.MeshStandardMaterial({ color: 0xf5a623, roughness: 0.5, metalness: 0.6 }));
      const tray = new THREE.Mesh(trayGeom, trayMat);
      tray.position.set(0, 11.5, 0);
      this.dcGroup.add(tray);

      this.worldGroup.add(this.dcGroup);
    }

    /* ─── 10. Zone 08: Suspended Architectural Glass Skybridge (Chapter 7) ──── */
    buildCampusSkybridge() {
      this.bridgeGroup = new THREE.Group();
      this.bridgeGroup.position.set(0, 0, -114);

      // Panoramic Skybridge Corridor Backdrop Plate
      const bridgeBackdropGeom = this.track(new THREE.PlaneGeometry(68, 38));
      const bridgeBackdropMat = this.track(new THREE.MeshBasicMaterial({
        map: this.envSkybridgeTex,
        side: THREE.DoubleSide
      }));
      const bridgeBackdrop = new THREE.Mesh(bridgeBackdropGeom, bridgeBackdropMat);
      bridgeBackdrop.position.set(0, 11, -30);
      this.bridgeGroup.add(bridgeBackdrop);

      // Slate Walkway Deck
      const deckGeom = this.track(new THREE.BoxGeometry(11, 0.8, 42));
      const deckMat = this.track(new THREE.MeshStandardMaterial({ color: 0x18202d, roughness: 0.65, metalness: 0.25 }));
      const deck = new THREE.Mesh(deckGeom, deckMat);
      deck.position.set(0, 0, 0);
      this.bridgeGroup.add(deck);

      // Glass Balustrades with Stainless Handrails
      const glassGeom = this.track(new THREE.BoxGeometry(0.3, 7.5, 42));
      const glassMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.28,
        roughness: 0.05,
        metalness: 0.15
      }));

      const leftGlass = new THREE.Mesh(glassGeom, glassMat);
      leftGlass.position.set(-5.3, 3.75, 0);
      this.bridgeGroup.add(leftGlass);

      const rightGlass = new THREE.Mesh(glassGeom, glassMat);
      rightGlass.position.set(5.3, 3.75, 0);
      this.bridgeGroup.add(rightGlass);

      // Career Milestone Architectural Stanchions (2022 -> NOW)
      const milestones = ['2022 Foundations', '2023 Scaled Systems', '2024 Core Architecture', '2025 Autonomous AI', 'NOW Leadership'];
      const stanchionGeom = this.track(new THREE.BoxGeometry(0.6, 3.6, 1.4));
      const stanchionMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.5
      }));

      milestones.forEach((m, idx) => {
        const s = new THREE.Mesh(stanchionGeom, stanchionMat);
        const z = 16 - idx * 7.5;
        s.position.set(-4.8, 2.2, z);
        this.bridgeGroup.add(s);
      });

      this.worldGroup.add(this.bridgeGroup);
    }

    /* ─── 11. Zone 09: Living Universes Exhibition Gallery (Chapter 8) ──────── */
    buildUniversesGallery() {
      this.galleryGroup = new THREE.Group();
      this.galleryGroup.position.set(0, 2, -150);

      // Circular Stone Floor
      const galleryFloorGeom = this.track(new THREE.CylinderGeometry(25, 27, 1.4, 32));
      const galleryFloorMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x0d131f,
        roughness: 0.35,
        metalness: 0.45
      }));
      const floor = new THREE.Mesh(galleryFloorGeom, galleryFloorMat);
      floor.position.set(0, -1, 0);
      this.galleryGroup.add(floor);

      // 8 Physical Exhibition Pedestals with Distinct Archetypes
      const pedestalGeom = this.track(new THREE.CylinderGeometry(1.4, 1.6, 3.2, 16));
      const pedestalMat = this.track(new THREE.MeshStandardMaterial({ color: 0x1f293d, roughness: 0.4, metalness: 0.7 }));
      const modelColors = [0xd4af37, 0x10b981, 0xec4899, 0x38bdf8, 0xa855f7, 0x00f5d4, 0xd97706, 0x8b5cf6];

      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const x = Math.cos(a) * 16;
        const z = Math.sin(a) * 16;

        const p = new THREE.Mesh(pedestalGeom, pedestalMat);
        p.position.set(x, 1.0, z);
        this.galleryGroup.add(p);

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

    /* ─── 12. Zone 10: Summit Observatory & Departure (Chapter 9) ───────────── */
    buildSummitObservatory() {
      this.observatoryGroup = new THREE.Group();
      this.observatoryGroup.position.set(0, 0, -186);

      // Panoramic Summit Terrace Backdrop Plate (Golden hour mountain peaks)
      const summitBackdropGeom = this.track(new THREE.PlaneGeometry(84, 46));
      const summitBackdropMat = this.track(new THREE.MeshBasicMaterial({
        map: this.envSummitTex,
        side: THREE.DoubleSide
      }));
      const summitBackdrop = new THREE.Mesh(summitBackdropGeom, summitBackdropMat);
      summitBackdrop.position.set(0, 16, -26);
      this.observatoryGroup.add(summitBackdrop);

      // Circular Stone Pavement Observation Deck
      const terraceGeom = this.track(new THREE.CylinderGeometry(20, 22, 2.5, 36));
      const stoneMat = this.track(new THREE.MeshStandardMaterial({ color: 0x242c3b, roughness: 0.82, metalness: 0.08 }));
      const terrace = new THREE.Mesh(terraceGeom, stoneMat);
      terrace.position.set(0, -1.25, 0);
      this.observatoryGroup.add(terrace);

      // Curved Glass Balustrades with Stainless Steel Handrails
      const balustradeGeom = this.track(new THREE.CylinderGeometry(19.8, 19.8, 2.6, 36, 1, true));
      const balustradeMat = this.track(new THREE.MeshStandardMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.32,
        roughness: 0.04,
        side: THREE.DoubleSide
      }));
      const balustrade = new THREE.Mesh(balustradeGeom, balustradeMat);
      balustrade.position.set(0, 1.3, 0);
      this.observatoryGroup.add(balustrade);

      // Central Telecom Mast Tower
      const mastGeom = this.track(new THREE.CylinderGeometry(0.35, 1.2, 45, 8));
      const mastMat = this.track(new THREE.MeshStandardMaterial({ color: 0xa8b0b8, metalness: 0.9, roughness: 0.25 }));
      const mast = new THREE.Mesh(mastGeom, mastMat);
      mast.position.set(0, 22.5, 0);
      this.observatoryGroup.add(mast);

      // Pulsating Amber Warning Beacon
      const beaconGeom = this.track(new THREE.SphereGeometry(1.0, 12, 12));
      const beaconMat = this.track(new THREE.MeshBasicMaterial({ color: 0xf5a623 }));
      this.summitBeacon = new THREE.Mesh(beaconGeom, beaconMat);
      this.summitBeacon.position.set(0, 45.2, 0);
      this.observatoryGroup.add(this.summitBeacon);

      this.worldGroup.add(this.observatoryGroup);
    }

    /* ─── Frame Animation Loop ──────────────────────────────────────────────── */
    update(scrollProgress, time) {
      const p = Math.max(0, Math.min(1, scrollProgress));

      // 1. Natural Wind Micro-Sway on Pine Trees
      if (this.terrainGroup && !this.isReducedMotion) {
        const sway = Math.sin(time * 1.4) * 0.006;
        this.terrainGroup.children.forEach((c) => {
          if (c.isGroup) c.rotation.z = sway;
        });
      }

      // 2. Server Rack LED Status Pulsing
      if (this.serverLeds && !this.isReducedMotion) {
        const pulse = 0.5 + Math.sin(time * 6.0) * 0.3;
        this.serverLeds.forEach((led, idx) => {
          if (led.material) {
            led.material.emissiveIntensity = pulse + (idx % 2) * 0.2;
          }
        });
      }

      // 3. Summit Communications Beacon Pulse
      if (this.summitBeacon) {
        const bPulse = 0.5 + Math.sin(time * 3.5) * 0.5;
        this.summitBeacon.scale.set(1.0 + bPulse * 0.3, 1.0 + bPulse * 0.3, 1.0 + bPulse * 0.3);
      }

      // 4. Subtle Parallax Rotation on Sky Panorama
      if (this.skyCylinder && !this.isReducedMotion) {
        this.skyCylinder.rotation.y = time * 0.005 + p * 0.15;
      }
    }

    dispose() {
      this.geometries.forEach((g) => g.dispose());
      this.materials.forEach((m) => m.dispose());
      this.textures.forEach((t) => t.dispose());
    }
  }

  window.RealWorldVisualGenerator = RealWorldVisualGenerator;
})(typeof window !== 'undefined' ? window : global);

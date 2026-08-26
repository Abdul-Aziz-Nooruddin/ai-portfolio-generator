/**
 * Design Memory & Multi-Dimensional Anti-Repetition Registry
 * Tracks rich 22-dimension fingerprints with recency decay penalties
 * and provides memory hints to candidate generation pipelines.
 */

const fs = require('fs');
const path = require('path');

const MEMORY_FILE_PATH = path.join(__dirname, '..', '..', '.design_memory.json');

class DesignMemory {
  constructor(options = {}) {
    this.maxHistorySize = options.maxHistorySize || 50;
    this.history = [];
    this.loadMemory();
  }

  loadMemory() {
    try {
      if (fs.existsSync(MEMORY_FILE_PATH)) {
        const raw = fs.readFileSync(MEMORY_FILE_PATH, 'utf8');
        this.history = JSON.parse(raw);
      }
    } catch (e) {
      this.history = [];
    }
  }

  saveMemory() {
    try {
      fs.writeFileSync(MEMORY_FILE_PATH, JSON.stringify(this.history.slice(-this.maxHistorySize), null, 2));
    } catch (e) {
      // Memory persistence failure should not crash execution
    }
  }

  /**
   * Record a generated portfolio's visual fingerprint into memory
   */
  record(dna) {
    const entry = {
      generationId: dna.id || `gen_${Date.now()}`,
      timestamp: Date.now(),
      creativeMode: dna.creativeMode,
      creativeDirection: dna.creativeDirection,
      visualEra: dna.visualEra,
      brandMood: dna.brandMood,
      layoutArchitecture: dna.layoutArchitecture,
      informationArchitecture: dna.informationArchitecture,
      navigationStyle: dna.navigationStyle,
      heroComposition: dna.heroComposition,
      projectPresentation: dna.projectPresentation,
      fonts: {
        heading: dna.typographySystem?.heading_font,
        body: dna.typographySystem?.body_font,
        pairingKey: `${dna.typographySystem?.heading_font} + ${dna.typographySystem?.body_font}`
      },
      colorSystem: {
        id: dna.colorSystem?.id,
        name: dna.colorSystem?.name,
        theme: dna.colorSystem?.theme,
        family: this.classifyColorFamily(dna.colorSystem),
        background: dna.colorSystem?.background,
        primary: dna.colorSystem?.primary
      },
      motionLanguage: dna.motionLanguage,
      motionFamily: dna.motionFamily,
      threeDStyle: dna.threeScene3D?.enabled ? (dna.threeScene3D.type || 'generic-3d') : 'none-pure-2d',
      backgroundTreatment: dna.backgroundTreatment,
      sectionTransition: dna.sectionTransition,
      spacingSystem: dna.spacingSystem,
      borderLanguage: dna.borderLanguage,
      cursorBehavior: dna.cursorBehavior,
      buttonLanguage: dna.buttonLanguage,
      footerArchitecture: dna.footerArchitecture
    };

    this.history.push(entry);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
    this.saveMemory();
    return entry;
  }

  /**
   * Classify color system into perceptual families
   */
  classifyColorFamily(cs = {}) {
    const bg = (cs.background || '').toLowerCase();
    const primary = (cs.primary || '').toLowerCase();
    const theme = (cs.theme || '').toLowerCase();

    if (theme === 'neo-brutalist' || primary.includes('#ec4899') || primary.includes('#fde047')) return 'pop-brutalist';
    if (bg === '#f9f6f0' || bg.includes('#fcf9f5') || bg.includes('#f4efe6') || cs.name?.toLowerCase().includes('wabi') || cs.name?.toLowerCase().includes('cream')) return 'warm-paper-zen';
    if (bg === '#ffffff' || bg === '#fafafa' || bg === '#f8fafc') return 'crisp-swiss-white';
    if (primary.includes('#22c55e') || primary.includes('#10b981') || cs.name?.toLowerCase().includes('matrix')) return 'cyber-emerald';
    if (primary.includes('#d4af37') || primary.includes('#f59e0b') || cs.name?.toLowerCase().includes('gold') || cs.name?.toLowerCase().includes('luxury')) return 'warm-luxury-gold';
    if (bg.includes('#070913') || primary.includes('#38bdf8') || primary.includes('#7aa2f7')) return 'cyber-indigo-neon';
    if (primary.includes('#9a3412') || primary.includes('#ea580c')) return 'terracotta-earth';
    if (primary.includes('#0284c7') || bg.includes('#f0f4f8')) return 'nordic-ice-slate';
    if (theme === 'dark' || bg === '#09090b' || bg === '#18181b') return 'monochrome-obsidian';
    return 'contemporary-hybrid';
  }

  /**
   * Calculate Multi-Dimensional Visual Novelty Score (0 - 100)
   */
  evaluateNovelty(candidateDNA) {
    if (this.history.length === 0) {
      return {
        overallNovelty: 100,
        breakdown: { fonts: 100, colors: 100, layout: 100, hero: 100, projectPres: 100, threeD: 100, motion: 100 },
        penalties: []
      };
    }

    const candidatePairing = `${candidateDNA.typographySystem?.heading_font} + ${candidateDNA.typographySystem?.body_font}`;
    const candidateHeading = candidateDNA.typographySystem?.heading_font;
    const candidateColorFamily = this.classifyColorFamily(candidateDNA.colorSystem);
    const candidateMode = candidateDNA.creativeMode;
    const candidateLayout = candidateDNA.layoutArchitecture;
    const candidateHero = candidateDNA.heroComposition;
    const candidateProjectPres = candidateDNA.projectPresentation;
    const candidateMotion = candidateDNA.motionLanguage;
    const candidate3D = candidateDNA.threeScene3D?.enabled ? candidateDNA.threeScene3D.type : 'none-pure-2d';

    let fontPenalty = 0;
    let colorPenalty = 0;
    let layoutPenalty = 0;
    let heroPenalty = 0;
    let projectPenalty = 0;
    let threeDPenalty = 0;
    let motionPenalty = 0;
    const penalties = [];

    const recentWindow = this.history.slice(-12).reverse();

    recentWindow.forEach((past, index) => {
      const recencyWeight = Math.max(0.1, 1.0 - index * 0.18);

      // Layout Recency
      if (past.layoutArchitecture === candidateLayout) {
        const p = 50 * recencyWeight;
        layoutPenalty += p;
        penalties.push(`Layout '${candidateLayout}' used ${index + 1} gen(s) ago (-${Math.round(p)})`);
      }

      // Hero Recency
      if (past.heroComposition === candidateHero) {
        const p = 45 * recencyWeight;
        heroPenalty += p;
        penalties.push(`Hero '${candidateHero}' used ${index + 1} gen(s) ago (-${Math.round(p)})`);
      }

      // Project Presentation Recency
      if (past.projectPresentation === candidateProjectPres) {
        const p = 55 * recencyWeight;
        projectPenalty += p;
        penalties.push(`Project Pres '${candidateProjectPres}' used ${index + 1} gen(s) ago (-${Math.round(p)})`);
      }

      // Font Pairing Recency
      if (past.fonts?.pairingKey === candidatePairing) {
        const p = 40 * recencyWeight;
        fontPenalty += p;
      }

      // 3D Scene Recency
      if (past.threeDStyle === candidate3D && candidate3D !== 'none-pure-2d') {
        const p = 35 * recencyWeight;
        threeDPenalty += p;
      }

      // Motion Recency
      if (past.motionLanguage === candidateMotion) {
        const p = 25 * recencyWeight;
        motionPenalty += p;
      }
    });

    const layoutScore = Math.max(10, Math.round(100 - layoutPenalty));
    const heroScore = Math.max(10, Math.round(100 - heroPenalty));
    const projectScore = Math.max(10, Math.round(100 - projectPenalty));
    const fontScore = Math.max(10, Math.round(100 - fontPenalty));
    const threeDScore = Math.max(10, Math.round(100 - threeDPenalty));
    const motionScore = Math.max(10, Math.round(100 - motionPenalty));
    const colorScore = Math.max(10, Math.round(100 - colorPenalty));

    const overallNovelty = Math.round(
      layoutScore * 0.25 +
      projectScore * 0.20 +
      heroScore * 0.18 +
      fontScore * 0.15 +
      threeDScore * 0.10 +
      motionScore * 0.07 +
      colorScore * 0.05
    );

    return {
      overallNovelty,
      breakdown: {
        layout: layoutScore,
        hero: heroScore,
        projectPres: projectScore,
        fonts: fontScore,
        threeD: threeDScore,
        motion: motionScore,
        colors: colorScore
      },
      penalties: penalties.slice(0, 4)
    };
  }

  getRecentSummary(limit = 10) {
    return this.history.slice(-limit).reverse().map(h => ({
      mode: h.creativeMode,
      layout: h.layoutArchitecture,
      hero: h.heroComposition,
      projectPresentation: h.projectPresentation,
      fonts: h.fonts?.pairingKey,
      colorFamily: h.colorSystem?.family,
      threeD: h.threeDStyle,
      motion: h.motionLanguage,
      nav: h.navigationStyle,
      ia: h.informationArchitecture
    }));
  }
}

module.exports = { DesignMemory };

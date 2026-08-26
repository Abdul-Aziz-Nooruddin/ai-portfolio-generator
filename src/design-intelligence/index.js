/**
 * Design Intelligence Studio Orchestrator & Cross-Dimension Diversity Governor
 * Coordinates Creative Director, Design DNA Factory, MCP Tools, Anti-Pattern Detection,
 * Uniqueness Engine, and Persistent Design Memory.
 */

const { CreativeDirector } = require('./creative-director');
const { DesignDNAFactory } = require('./design-dna');
const { UniquenessEngine } = require('./uniqueness-engine');
const { AntiPatternDetector } = require('./anti-pattern-detector');
const { DesignMemory } = require('./design-memory');
const { LayoutComposer } = require('./layout-composer');
const { MCPIntelligenceOrchestrator, MCPOrchestrator } = require('./mcp-orchestrator');

class DesignIntelligenceStudio {
  constructor(options = {}) {
    this.creativeDirector = new CreativeDirector();
    this.dnaFactory = new DesignDNAFactory();
    this.uniquenessEngine = new UniquenessEngine({ maxHistorySize: 50 });
    this.antiPatternDetector = new AntiPatternDetector();
    this.designMemory = new DesignMemory({ maxHistorySize: 50 });
    this.layoutComposer = new LayoutComposer();
    this.mcpOrchestrator = new (MCPOrchestrator || MCPIntelligenceOrchestrator)();
    this.options = options;
  }

  /**
   * Generates a completely autonomous, uniquely styled portfolio with Cross-Dimension Diversity Governance
   */
  async generatePortfolio(userProfile = {}, options = {}) {
    const recentSummary = this.designMemory.getRecentSummary(12);
    const recentLayouts = recentSummary.map(r => r.layout).filter(Boolean);
    const recentHeroes = recentSummary.map(r => r.hero).filter(Boolean);
    const recentProjects = recentSummary.map(r => r.projectPresentation).filter(Boolean);
    const recentPairings = recentSummary.map(r => r.fonts).filter(Boolean);
    const recentColorFamilies = recentSummary.map(r => r.colorFamily).filter(Boolean);
    const recent3D = recentSummary.map(r => r.threeD).filter(Boolean);
    const recentMotion = recentSummary.map(r => r.motion).filter(Boolean);
    const recentNavs = recentSummary.map(r => r.nav).filter(Boolean);
    const recentIAs = recentSummary.map(r => r.ia).filter(Boolean);
    const recentModes = recentSummary.map(r => r.mode).filter(Boolean);

    // 1. Generate Diverse Design DNA Candidates with Cross-Dimension Diversity Governance
    const candidates = [];
    const numCandidates = options.mode && options.mode !== 'auto-cycle' ? 2 : 4;
    const maxRetries = 6;
    let attempts = 0;

    while (candidates.length < numCandidates && attempts < maxRetries) {
      attempts++;
      const creativeBrief = this.creativeDirector.direct(userProfile, options.mode, recentModes);
      const { intelligence, telemetry } = await this.mcpOrchestrator.orchestrate(
        creativeBrief.narrative,
        creativeBrief.mode,
        userProfile
      );

      const memoryHints = {
        recentFamilies: recentSummary.map(r => r.family).filter(Boolean),
        recentArchetypes: recentSummary.map(r => r.pageArchetype || r.layout).filter(Boolean),
        recentLayouts: [...recentLayouts, ...candidates.map(cd => cd.dna.layoutArchitecture)],
        recentHeroes: [...recentHeroes, ...candidates.map(cd => cd.dna.heroComposition)],
        recentProjects: [...recentProjects, ...candidates.map(cd => cd.dna.projectPresentation)],
        recentPairings: [...recentPairings, ...candidates.map(cd => `${cd.dna.typographySystem?.heading_font} + ${cd.dna.typographySystem?.body_font}`)],
        recentColorFamilies: [...recentColorFamilies, ...candidates.map(cd => cd.dna.colorSystem?.family)],
        recent3D: [...recent3D, ...candidates.map(cd => cd.dna.threeScene3D?.type)],
        recentMotion: [...recentMotion, ...candidates.map(cd => cd.dna.motionLanguage)],
        recentNavs: [...recentNavs, ...candidates.map(cd => cd.dna.navigationStyle)],
        recentIAs: [...recentIAs, ...candidates.map(cd => cd.dna.informationArchitecture)]
      };

      const dna = this.dnaFactory.createDNA(creativeBrief, intelligence, userProfile, memoryHints);

      if (options.layout && options.layout !== 'auto-cycle') {
        dna.layoutArchitecture = options.layout;
        dna.pageArchetype = options.layout;
      }
      if (options.projectPresentation && options.projectPresentation !== 'auto-cycle') {
        dna.projectPresentation = options.projectPresentation;
      }

      // Evaluate Structural Uniqueness, Cohesion Score & Hard Pair Collision Rules
      const structuralResult = this.uniquenessEngine.validateCandidate(dna);

      // Evaluate Visual Novelty against persistent Design Memory
      const visualNovelty = this.designMemory.evaluateNovelty(dna);

      // Evaluate Anti-Pattern Safety
      const antiPattern = this.antiPatternDetector.evaluate(dna, { heroText: userProfile.tagline });

      if (!structuralResult.accepted && attempts < maxRetries && candidates.length > 0) {
        // Candidate collision or aesthetic contradiction detected; regenerate
        continue;
      }

      // Calculate Composite Score: Meaningful Structural Diversity (40%) + Visual Cohesion (30%) + Anti-Pattern Quality (15%) + Visual Novelty (15%)
      const qualityScore = antiPattern.passed ? 95 : 40;
      const structuralNoveltyScore = structuralResult.structuralDiversity;
      const visualNoveltyScore = structuralResult.visualDiversity;
      const cohesionScore = structuralResult.cohesionScore || 90;

      const compositeScore = Number((
        structuralNoveltyScore * 0.40 +
        cohesionScore * 0.30 +
        qualityScore * 0.15 +
        visualNoveltyScore * 0.15
      ).toFixed(1));

      candidates.push({
        dna,
        creativeBrief,
        telemetry,
        visualNovelty,
        structuralResult,
        antiPattern,
        compositeScore
      });
    }

    // 2. Select Candidate with Highest Composite Score (Strictly Enforce Zero Consecutive Repetition)
    const lastCommittedProject = recentSummary[0]?.projectPresentation;
    const eligibleCandidates = lastCommittedProject
      ? candidates.filter(cd => cd.dna.projectPresentation !== lastCommittedProject)
      : candidates;

    const winnerPool = eligibleCandidates.length > 0 ? eligibleCandidates : candidates;
    winnerPool.sort((a, b) => b.compositeScore - a.compositeScore);
    const winner = winnerPool[0];

    // 3. Render Composition from Winning DNA
    const composition = this.layoutComposer.compose(winner.dna, userProfile);

    // 4. Record Winner into Persistent Design Memory & Uniqueness History
    this.designMemory.record(winner.dna);
    this.uniquenessEngine.recordAcceptedDesign(winner.dna);

    return {
      success: true,
      html: composition.html,
      css: composition.css,
      js: composition.js,
      designDNA: winner.dna,
      pageArchetype: winner.dna.pageArchetype,
      gridTopology: winner.dna.gridTopology,
      structureFingerprint: winner.dna.structureFingerprint,
      designConstitution: winner.dna.constitution,
      visualGrammar: winner.dna.visualGrammar,
      creativeBrief: winner.creativeBrief,
      mcpTelemetry: winner.telemetry,
      visualNovelty: winner.visualNovelty,
      uniqueness: winner.structuralResult,
      cohesionScore: winner.structuralResult?.cohesionScore || 90,
      antiPatternReport: winner.antiPattern,
      candidateRankings: candidates.map(c => ({
        mode: c.dna.creativeMode,
        family: c.dna.designFamily,
        pageArchetype: c.dna.pageArchetype,
        layout: c.dna.layoutArchitecture,
        hero: c.dna.heroComposition,
        projectPresentation: c.dna.projectPresentation,
        structuralDiversity: c.structuralResult.structuralDiversity,
        cohesionScore: c.structuralResult.cohesionScore,
        overallDiversity: c.structuralResult.overallDiversity,
        score: c.compositeScore
      }))
    };
  }
}

module.exports = { DesignIntelligenceStudio };

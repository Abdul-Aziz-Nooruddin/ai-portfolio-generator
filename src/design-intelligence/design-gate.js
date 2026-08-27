/**
 * Mandatory Design Intelligence Gate
 * Enforces the strict rule: NO DESIGN INTELLIGENCE -> NO PORTFOLIO GENERATION.
 * Coordinates all 15 specialized design agents, enforces skill parsing,
 * runs iterative critique revisions, and passes the validated DesignBrief to DesignEngine.
 */

const { config } = require('./config');
const { DesignBriefSchema } = require('./design-brief-schema');
const { SkillRegistry } = require('./skills/skill-registry');
const { SkillEvidence } = require('./skills/skill-evidence');

const { LocalDesignReferenceProvider } = require('./providers/local-design-reference-provider');
const { FigmaProvider } = require('./providers/figma-provider');
const { WebDesignProvider } = require('./providers/web-design-provider');

const { ContentAnalysisAgent } = require('./agents/content-analysis-agent');
const { DesignResearchAgent } = require('./agents/design-research-agent');
const { FigmaDesignAgent } = require('./agents/figma-design-agent');
const { UIUXPatternAgent } = require('./agents/ui-ux-pattern-agent');
const { InformationArchitectureAgent } = require('./agents/information-architecture-agent');
const { SpatialCompositionAgent } = require('./agents/spatial-composition-agent');
const { TypographyAgent } = require('./agents/typography-agent');
const { ColorIdentityAgent } = require('./agents/color-identity-agent');
const { ProjectStorytellingAgent } = require('./agents/project-storytelling-agent');
const { MotionInteractionAgent } = require('./agents/motion-interaction-agent');
const { AccessibilityAgent } = require('./agents/accessibility-agent');
const { PerformanceAgent } = require('./agents/performance-agent');
const { StructuralDiversityAgent } = require('./agents/structural-diversity-agent');
const { DesignCriticAgent } = require('./agents/design-critic-agent');
const { DesignSynthesisAgent } = require('./agents/design-synthesis-agent');

class DesignGate {
  constructor(options = {}) {
    this.registry = new SkillRegistry();
    this.evidenceTracker = new SkillEvidence(this.registry);

    this.localProvider = new LocalDesignReferenceProvider();
    this.figmaProvider = new FigmaProvider();
    this.webProvider = new WebDesignProvider();

    this.contentAgent = new ContentAnalysisAgent();
    this.researchAgent = new DesignResearchAgent(this.localProvider, this.webProvider);
    this.figmaAgent = new FigmaDesignAgent(this.figmaProvider);
    this.uxAgent = new UIUXPatternAgent();
    this.iaAgent = new InformationArchitectureAgent();
    this.compositionAgent = new SpatialCompositionAgent();
    this.typographyAgent = new TypographyAgent();
    this.colorAgent = new ColorIdentityAgent();
    this.storytellingAgent = new ProjectStorytellingAgent();
    this.motionAgent = new MotionInteractionAgent();
    this.a11yAgent = new AccessibilityAgent();
    this.perfAgent = new PerformanceAgent();
    this.diversityAgent = new StructuralDiversityAgent(config.memoryWindowSize);
    this.criticAgent = new DesignCriticAgent();
    this.synthesisAgent = new DesignSynthesisAgent();
  }

  /**
   * Generates a fully audited, validated, and critiqued DesignBrief from raw user input
   * @param {Object} rawUserData
   * @param {Object} context
   * @returns {Promise<Object>} Validated DesignBrief
   */
  async generateDesignBrief(rawUserData = {}, context = {}) {
    if (!config.enabled && config.agentRequired) {
      throw new Error('[DESIGN GATE BLOCKED] Design Intelligence is disabled but mandatory (DESIGN_AGENT_REQUIRED=true).');
    }

    // 0. Pre-Flight Skill Registry Verification (Fail-Closed)
    this.registry.verifyAllSkills();

    // 1. Content Analysis Agent
    const contentAnalysis = await this.contentAgent.execute(rawUserData);
    const contentProfile = contentAnalysis.decision;

    // Multi-attempt candidate loop to ensure structural diversity & critique pass
    let candidateBrief = null;
    let critiqueReport = null;
    const recentHistory = (context.recentHistory && context.recentHistory.length > 0) ? context.recentHistory : this.diversityAgent.getRecentHistory();

    for (let attempt = 1; attempt <= config.maxRevisionAttempts; attempt++) {
      // 2. Design Research Agent (Parses active SKILL.md rules + CSV datasets)
      const designResearch = await this.researchAgent.execute(contentProfile, context);

      // 3. Figma Design Agent (Extracts tokens if Figma URL provided)
      const figmaAnalysis = await this.figmaAgent.execute(contentProfile, context);

      // 4. UI/UX Pattern Agent
      const uxStrategy = await this.uxAgent.execute(contentProfile, designResearch.decision, context);

      // 5. Information Architecture Agent (Selects model with anti-repetition memory)
      const iaStrategy = await this.iaAgent.execute(contentProfile, uxStrategy.decision, recentHistory, context);

      // 6. Spatial Composition Agent (Decoupled from IA)
      const compositionStrategy = await this.compositionAgent.execute(contentProfile, iaStrategy, recentHistory, context);

      // 7. Color / Visual Identity Agent (10+ Accessible Palettes)
      const visualIdentity = await this.colorAgent.execute(contentProfile, figmaAnalysis, recentHistory, context);

      // 8. Typography Agent (10+ Mathematical Typography Systems)
      const typographySystem = await this.typographyAgent.execute(contentProfile, visualIdentity, recentHistory, context);

      // 9. Project Storytelling Agent
      const projectStorytelling = await this.storytellingAgent.execute(contentProfile, iaStrategy, context);

      // 10. Motion & Interaction Agent (10+ Motion Physics Profiles)
      const motionSystem = await this.motionAgent.execute(contentProfile, visualIdentity, iaStrategy, recentHistory, context);

      // 11. Accessibility Agent
      const accessibilityReport = await this.a11yAgent.execute(contentProfile, visualIdentity, typographySystem);

      // 12. Performance Agent
      const performanceReport = await this.perfAgent.execute(contentProfile, motionSystem, visualIdentity);

      // 13. Structural Diversity Agent
      const structuralDiversity = await this.diversityAgent.execute({
        informationArchitecture: iaStrategy.decision,
        sectionSequence: iaStrategy.decision.sectionOrder,
        layoutGrammar: compositionStrategy.decision,
        projectStorytelling: projectStorytelling.decision,
        visualUniverse: visualIdentity.decision,
        ux: uxStrategy.decision,
        motionSystem: motionSystem.decision
      }, recentHistory);

      // If structural duplicate detected and attempts remain, re-roll IA candidate
      if (structuralDiversity.decision.duplicateDetected && attempt < config.maxRevisionAttempts) {
        continue;
      }

      // 14. Design Synthesis Agent (Combines all agents into validated DesignBrief)
      candidateBrief = await this.synthesisAgent.synthesize({
        contentAnalysis,
        designResearch,
        figmaAnalysis,
        uxStrategy,
        iaStrategy,
        compositionStrategy,
        typographySystem,
        visualIdentity,
        projectStorytelling,
        motionSystem,
        accessibilityReport,
        performanceReport,
        structuralDiversity
      });

      // 15. Design Critic Agent Audit
      critiqueReport = await this.criticAgent.execute(candidateBrief);

      if (critiqueReport.decision.pass) {
        break;
      } else {
        // Auto-revise candidate brief based on critique findings
        candidateBrief = await this.synthesisAgent.revise(candidateBrief, critiqueReport);
        const recheckCritique = await this.criticAgent.execute(candidateBrief);
        if (recheckCritique.decision.pass) {
          critiqueReport = recheckCritique;
          break;
        }
      }
    }

    if (!critiqueReport || !critiqueReport.decision.pass) {
      throw new Error(`[DESIGN CRITIC REJECTED] Candidate failed critique audit: ${critiqueReport?.decision?.critiqueSummary || 'Unknown rejection'}`);
    }

    // Record verified structural fingerprint in history
    this.diversityAgent.record(candidateBrief);

    return {
      brief: candidateBrief,
      critique: critiqueReport.decision,
      agentReports: {
        content: contentAnalysis.reasoning_summary,
        ia: candidateBrief.informationArchitecture.modelName,
        layout: candidateBrief.layoutGrammar.layoutName,
        universe: candidateBrief.visualUniverse.universeName,
        storytelling: candidateBrief.projectStorytelling.strategyName
      }
    };
  }

  getStructuralHistory() {
    return this.diversityAgent.getRecentHistory();
  }
}

module.exports = { DesignGate };

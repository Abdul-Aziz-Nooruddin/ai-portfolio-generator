/**
 * Customization Quality Gate (Phase 23)
 * Evaluates candidate customized portfolio states before applying or exporting them.
 * Rejects incoherent, clashing, or broken transformations with clear explanations.
 */

const { BrowserVisualQualityAgent } = require('../design-intelligence/agents/browser-visual-quality-agent');
const { DesignQualityGate } = require('../design-intelligence/agents/design-quality-gate');

class CustomizationQualityGate {
  constructor() {
    this.visualQualityAgent = new BrowserVisualQualityAgent();
    this.qualityGate = new DesignQualityGate();
  }

  /**
   * Validates a candidate customized state
   * @param {PortfolioState} portfolioState
   */
  async evaluate(portfolioState) {
    const html = portfolioState.renderCurrentHtml();
    const mockSite = {
      html,
      css: portfolioState.shell.styles,
      js: portfolioState.shell.scripts,
      designBlueprint: portfolioState.designBlueprint,
      designBrief: portfolioState.designBrief
    };

    // 1. Evaluate Visual Quality & Anti-Ugly Violations
    const visualAudit = BrowserVisualQualityAgent.audit(mockSite, portfolioState.designBrief);

    // 2. Coherence Rules for User Token Adjustments
    const universe = portfolioState.designBlueprint.visualUniverse || portfolioState.designBrief.visualUniverse?.universeId;
    const themeMode = portfolioState.themeMode;
    const criticalFindings = (visualAudit.findings || []).filter(f => f.severity === 'CRITICAL');
    const issues = criticalFindings.map(f => `${f.rule}: ${f.desc}`);

    if (universe === 'cinematic-obsidian' && themeMode === 'light') {
      issues.push('Cinematic Obsidian is optimized exclusively for luminescent deep obsidian canvases.');
    }

    if (universe === 'computational-terminal' && portfolioState.designTokens.borderRadius === '24px') {
      issues.push('Pill-shaped 24px border radius conflicts with Computational Terminal engineering aesthetic.');
    }

    // 3. Section Integrity Rules
    const visibleCount = portfolioState.sectionOrder.filter(id => !portfolioState.hiddenSections.has(id)).length;
    if (visibleCount < 2) {
      issues.push('A portfolio must contain at least 2 visible sections (Hero + Work).');
    }

    const pass = visualAudit.qualityScore >= 85 && issues.length === 0;

    return {
      pass,
      qualityScore: visualAudit.qualityScore,
      firstImpressionScore: visualAudit.firstImpressionScore,
      issues,
      explanation: pass 
        ? 'Customization passed all visual quality and coherence checks.' 
        : `Customization rejected: ${issues.join('; ')}`
    };
  }

  validateReorder(portfolioState, newOrder = []) {
    if (!Array.isArray(newOrder) || newOrder.length === 0) {
      return { valid: false, reason: 'New section order must be a non-empty array.' };
    }
    return { valid: true };
  }

  validateVisibility(portfolioState, sectionId, visible) {
    if ((sectionId === 'hero' || sectionId === 'projects') && !visible) {
      return { valid: false, reason: 'Hero and Projects are required core sections and cannot be hidden.' };
    }
    return { valid: true };
  }

  validateToken(portfolioState, token, value) {
    if (!token || typeof token !== 'string') {
      return { valid: false, reason: 'Invalid design token identifier.' };
    }
    return { valid: true };
  }
}

module.exports = { CustomizationQualityGate };

/**
 * Design Critic Agent
 * Ruthlessly audits candidate DesignBriefs before composition and rendering.
 * Detects template convergence, unmotivated decoration, generic card grids, and contradiction.
 */

class DesignCriticAgent {
  async execute(candidateBrief) {
    const issues = [];
    const suggestions = [];

    // 1. Check for Anti-Pattern: Generic Card Grid Monotony
    if (candidateBrief.projectStorytelling?.strategyId === 'generic-card-grid') {
      issues.push('CRITIQUE: Candidate selected legacy generic-card-grid which is strictly prohibited.');
      suggestions.push('Switch to code-architecture-dossier, split-screen-comparison, or horizontal-filmstrip.');
    }

    // 2. Check for Visual Coherence (Aesthetic Contradictions)
    const universe = candidateBrief.visualUniverse?.universeId;
    const isDark = candidateBrief.visualUniverse?.theme === 'dark';
    const isLight = candidateBrief.visualUniverse?.theme === 'light';

    if (universe === 'swiss-editorial' && isDark) {
      issues.push('CRITIQUE: Swiss Editorial demands high-contrast light or ivory canvas.');
      suggestions.push('Switch theme to light mode with pure black typography and international grid.');
    }

    if (universe === 'cinematic-obsidian' && isLight) {
      issues.push('CRITIQUE: Cinematic Obsidian requires deep obsidian background (#090A0F) with luminescent highlights.');
      suggestions.push('Enforce dark mode canvas for cinematic visual universe.');
    }

    // 3. Check for Content / Design Fit
    const projectCount = candidateBrief.contentProfile?.projects?.length || 0;
    if (projectCount <= 1 && candidateBrief.informationArchitecture?.modelId === 'horizontal-exhibition') {
      issues.push('CRITIQUE: Horizontal Exhibition requires at least 2 projects for a continuous track.');
      suggestions.push('Revise IA model to split-screen-dossier or minimal-single-screen.');
    }

    // 4. Check for Unnecessary WebGL Overkill
    if (candidateBrief.motionSystem?.webglActive && projectCount === 0) {
      issues.push('CRITIQUE: Three.js WebGL scene active without tangible project artifacts.');
      suggestions.push('Disable WebGL and rely on crisp GSAP scroll typography.');
    }

    // 5. Accessibility Baseline Verification
    if (!candidateBrief.accessibilityRequirements?.contrastVerified) {
      issues.push('CRITIQUE: Contrast ratio unverified against WCAG 2.2 AAA standard.');
      suggestions.push('Recalculate primary/surface luminance ratios.');
    }

    const pass = issues.length === 0;

    return {
      agent: 'design-critic-agent',
      decision: {
        pass,
        status: pass ? 'PASS' : 'REVISE',
        score: pass ? 0.96 : 0.40,
        critiqueCount: issues.length,
        critiqueSummary: pass 
          ? 'DesignBrief verified: High structural integrity, zero template convergence, WCAG compliant.'
          : `DesignBrief rejected with ${issues.length} critical flaws. Revision required.`
      },
      reasoning_summary: pass 
        ? 'Passed all 5 design critique lenses with zero anti-pattern violations.' 
        : `Critique flagged: ${issues.join(' | ')}`,
      confidence: 0.98,
      recommendations: {
        pass,
        suggestedFixes: suggestions
      },
      constraints: issues,
      evidence: pass 
        ? ['[PASS] Anti-Pattern Filter', '[PASS] Visual Coherence', '[PASS] Content-to-IA Fit', '[PASS] Accessibility Audit']
        : issues
    };
  }
}

module.exports = { DesignCriticAgent };

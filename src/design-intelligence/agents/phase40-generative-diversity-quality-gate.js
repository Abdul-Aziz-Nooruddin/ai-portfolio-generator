/**
 * 🏛️ Phase 40 Generative Decision Diversity Quality Gate
 * Enforces strict non-convergence, multi-factor decision variance,
 * physical information-density geometry, and black/white wireframe structural differentiation.
 */

class Phase40GenerativeDiversityQualityGate {
  static evaluateBatch(portfolios = [], options = {}) {
    const minSample = options.minSample || 20;
    if (!Array.isArray(portfolios) || portfolios.length < minSample) {
      return {
        pass: false,
        score: 0,
        violations: [`Sample size ${portfolios.length} below minimum required ${minSample}`],
        metrics: {}
      };
    }

    const violations = [];
    const topologies = new Set();
    const navigations = new Set();
    const heroGeometries = new Set();
    const sectionSequences = new Set();
    const storytellingStrategies = new Set();
    const mobileTransformations = new Set();
    const wireframeHashes = new Set();

    let totalEvidenceRetained = 0;
    let totalItemsAudited = 0;

    portfolios.forEach((p, idx) => {
      const plan = p.compositionPlan || {};
      const bp = p.designBlueprint || {};

      // 1. Check CompositionPlan Authority
      if (!plan.pageTopology || !plan.navigationGrammar || !plan.sectionGrammar) {
        violations.push(`Portfolio #${idx+1} missing authoritative CompositionPlan contract.`);
      }

      // Track Unique Visual & Structural Dimensions
      if (plan.pageTopology?.id) topologies.add(plan.pageTopology.id);
      if (plan.navigationGrammar?.id) navigations.add(plan.navigationGrammar.id);
      if (plan.openingTopology) heroGeometries.add(plan.openingTopology);
      if (plan.sectionGrammar?.sequence) sectionSequences.add(JSON.stringify(plan.sectionGrammar.sequence));
      if (plan.pageTopology?.mobileTransformation) mobileTransformations.add(plan.pageTopology.mobileTransformation);

      if (Array.isArray(plan.projectArtifactPlan)) {
        plan.projectArtifactPlan.forEach(art => {
          if (art.artifactStrategy) storytellingStrategies.add(art.artifactStrategy);
        });
      }

      // Compute black-and-white structural wireframe signature
      const rawHtml = p.html || '';
      const wireframeSignature = this.computeWireframeSignature(rawHtml);
      wireframeHashes.add(wireframeSignature);

      // Evidence retention check
      const profile = p.contentProfile || {};
      const expectedProjects = (profile.projects || []).length;
      totalItemsAudited += expectedProjects;
      const foundProjects = (profile.projects || []).filter(proj => rawHtml.includes(this.escapeRegex(proj.name))).length;
      totalEvidenceRetained += foundProjects;
    });

    const total = portfolios.length;
    const distinctTopologiesCount = topologies.size;
    const distinctNavigationsCount = navigations.size;
    const distinctHeroCount = heroGeometries.size;
    const distinctSequencesCount = sectionSequences.size;
    const distinctStrategiesCount = storytellingStrategies.size;
    const distinctMobileCount = mobileTransformations.size;
    const distinctWireframesCount = wireframeHashes.size;

    const structuralCollisionRate = ((total - distinctWireframesCount) / total) * 100;
    const evidenceRetentionRate = totalItemsAudited > 0 ? (totalEvidenceRetained / totalItemsAudited) * 100 : 100;

    // Thresholds
    if (distinctTopologiesCount < 4) {
      violations.push(`Insufficient distinct topologies active: ${distinctTopologiesCount} (Required >= 4)`);
    }
    if (distinctNavigationsCount < 3) {
      violations.push(`Insufficient distinct navigation models: ${distinctNavigationsCount} (Required >= 3)`);
    }
    if (distinctHeroCount < 3) {
      violations.push(`Insufficient hero opening topologies: ${distinctHeroCount} (Required >= 3)`);
    }
    if (distinctSequencesCount < 3) {
      violations.push(`Insufficient section sequence diversity: ${distinctSequencesCount} (Required >= 3)`);
    }
    if (distinctStrategiesCount < 5) {
      violations.push(`Insufficient project storytelling strategies: ${distinctStrategiesCount} (Required >= 5)`);
    }
    if (distinctMobileCount < 3) {
      violations.push(`Insufficient mobile transformation models: ${distinctMobileCount} (Required >= 3)`);
    }
    if (structuralCollisionRate > 35) {
      violations.push(`High structural collision rate: ${structuralCollisionRate.toFixed(1)}% (Threshold <= 35%)`);
    }
    if (evidenceRetentionRate < 95) {
      violations.push(`Evidence retention dropped to ${evidenceRetentionRate.toFixed(1)}% (Required >= 95%)`);
    }

    const pass = violations.length === 0;
    const score = Math.max(0, 100 - (violations.length * 15) - (structuralCollisionRate * 0.5));

    return {
      pass,
      score: Math.round(score),
      violations,
      metrics: {
        totalPortfoliosAudited: total,
        distinctTopologies: distinctTopologiesCount,
        distinctNavigations: distinctNavigationsCount,
        distinctHeroGeometries: distinctHeroCount,
        distinctSectionSequences: distinctSequencesCount,
        distinctStorytellingStrategies: distinctStrategiesCount,
        distinctMobileTransformations: distinctMobileCount,
        distinctStructuralWireframes: distinctWireframesCount,
        structuralCollisionRatePercent: Number(structuralCollisionRate.toFixed(2)),
        evidenceRetentionRatePercent: Number(evidenceRetentionRate.toFixed(2))
      }
    };
  }

  static computeWireframeSignature(html = '') {
    // Extract body content only
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : html;

    // Strip styles, scripts, inline styling, and text copy to isolate pure physical layout geometry
    const structuralGeometry = bodyContent
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/style="[^"]*"/gi, '')
      .replace(/id="[^"]*"/gi, '')
      .replace(/class="([^"]*)"/gi, (match, classes) => {
        // Retain structural layout, grid, topology, archetype and card grammar classes
        const layoutClasses = classes.split(/\s+/).filter(c => 
          c.startsWith('layout-') || 
          c.startsWith('section-') || 
          c.startsWith('topology-') || 
          c.startsWith('editorial-') || 
          c.startsWith('terminal-') || 
          c.startsWith('architectural-') || 
          c.startsWith('museum-') || 
          c.startsWith('spatial-') || 
          c.startsWith('project-') || 
          c.includes('rail') || 
          c.includes('split') || 
          c.includes('grid') || 
          c.includes('track') || 
          c.includes('stream') || 
          c.includes('card')
        );
        return layoutClasses.length > 0 ? `class="${layoutClasses.join(' ')}"` : '';
      })
      .replace(/>([^<]+)</g, '><') // Strip inner text copy
      .replace(/\s+/g, ' ')
      .trim();

    return structuralGeometry;
  }

  static escapeRegex(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/'/g, '(&#39;|\'|’)')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = { Phase40GenerativeDiversityQualityGate };

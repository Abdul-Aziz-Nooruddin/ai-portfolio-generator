/**
 * Structural Memory & Anti-Repetition Gate
 * Records actual structural parameters (IA model, section sequence, layout grammar, project presentation strategy).
 * Rejects structurally repetitive candidates across consecutive generation runs.
 */

class StructuralMemory {
  constructor(maxHistory = 50) {
    this.history = [];
    this.maxHistory = maxHistory;
  }

  record(blueprint) {
    if (!blueprint) return;
    const entry = {
      timestamp: Date.now(),
      iaModel: blueprint.iaModel?.id || 'work-first-runway',
      layoutGrammar: blueprint.layoutGrammar?.id || 'work-first-runway',
      projectStrategy: blueprint.projectStrategy || 'asymmetric-media-mosaic',
      visualUniverse: blueprint.visualUniverse?.id || 'swiss-editorial',
      sectionOrder: Array.isArray(blueprint.iaModel?.sectionOrder) ? blueprint.iaModel.sectionOrder.join('->') : '',
      domSignature: `${blueprint.iaModel?.id}::${blueprint.projectStrategy}::${blueprint.visualUniverse?.id}`
    };

    this.history.unshift(entry);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
  }

  isRepetitive(candidate) {
    if (!candidate || this.history.length === 0) return false;

    const candidateIa = candidate.iaModel?.id;
    const candidateStrategy = candidate.projectStrategy;
    const candidateSections = Array.isArray(candidate.iaModel?.sectionOrder) ? candidate.iaModel.sectionOrder.join('->') : '';

    // Check last 3 runs for identical IA model + project strategy collision
    const recent = this.history.slice(0, 3);
    for (const h of recent) {
      if (h.iaModel === candidateIa && h.projectStrategy === candidateStrategy) {
        return true; // Exact structural duplicate
      }
      if (h.sectionOrder === candidateSections && h.projectStrategy === candidateStrategy) {
        return true; // Exact section order & card strategy duplicate
      }
    }

    return false;
  }

  getRecentHistory() {
    return [...this.history];
  }

  clear() {
    this.history = [];
  }
}

module.exports = { StructuralMemory };

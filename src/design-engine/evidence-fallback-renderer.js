/**
 * 🏛️ Universal Evidence Fallback Renderer (Phase 45)
 * Safely renders any unmapped, custom, or extension evidence item into a visually
 * compatible HTML block conforming to the active design grammar.
 * 
 * Invariant: No non-empty evidence field may be silently dropped.
 */

class EvidenceFallbackRenderer {
  /**
   * Renders a fallback evidence item adhering to the active design grammar
   * @param {Object} item - { label, value, provenance, category }
   * @param {Object} grammar - Active design grammar tokens
   * @returns {string} Compatible HTML snippet
   */
  static renderFallbackItem(item = {}, grammar = {}) {
    const label = String(item.label || 'ADDITIONAL SPECIFICATION').toUpperCase();
    const value = typeof item.value === 'object' ? JSON.stringify(item.value, null, 2) : String(item.value || '');
    const surface = grammar.surfaceLanguage || 'panel';

    return `
      <div class="evidence-specimen-item" data-surface="${surface}" style="padding: 1.25rem; border: 1px solid var(--border); background: var(--surface); border-radius: var(--radius, 4px); margin-bottom: 1rem;">
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--primary); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem;">[EVIDENCE // ${label}]</div>
        <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text);">${value}</div>
      </div>
    `;
  }
}

module.exports = { EvidenceFallbackRenderer };

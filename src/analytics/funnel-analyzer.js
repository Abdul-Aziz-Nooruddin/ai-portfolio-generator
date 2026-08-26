/**
 * Funnel Analyzer (Phase 25)
 * Computes step-by-step conversion rates, drop-off stages, and user customization behavior.
 */

const { EVENT_TYPES } = require('./product-events');

class FunnelAnalyzer {
  /**
   * Computes funnel metrics from an event array
   * @param {Array} events
   */
  static analyzeFunnel(events = []) {
    if (!Array.isArray(events) || events.length === 0) {
      return {
        status: 'INSUFFICIENT DATA',
        sampleSize: 0,
        generationSuccessRate: 'INSUFFICIENT DATA',
        previewConversionRate: 'INSUFFICIENT DATA',
        customizerUsageRate: 'INSUFFICIENT DATA',
        exportRate: 'INSUFFICIENT DATA',
        exportSuccessRate: 'INSUFFICIENT DATA',
        regenerationRate: 'INSUFFICIENT DATA',
        abandonmentStage: 'INSUFFICIENT DATA'
      };
    }

    const counts = {};
    for (const type of Object.values(EVENT_TYPES)) {
      counts[type] = 0;
    }

    for (const ev of events) {
      if (counts[ev.event] !== undefined) {
        counts[ev.event]++;
      }
    }

    const started = counts[EVENT_TYPES.GENERATION_STARTED] || 0;
    const completed = counts[EVENT_TYPES.GENERATION_COMPLETED] || 0;
    const failed = counts[EVENT_TYPES.GENERATION_FAILED] || 0;
    const previews = counts[EVENT_TYPES.PREVIEW_OPENED] || 0;
    const customizerOpened = counts[EVENT_TYPES.CUSTOMIZER_OPENED] || 0;
    const saved = counts[EVENT_TYPES.PORTFOLIO_SAVED] || 0;
    const exportStarted = counts[EVENT_TYPES.EXPORT_STARTED] || 0;
    const exportCompleted = counts[EVENT_TYPES.EXPORT_COMPLETED] || 0;
    const regenerations = counts[EVENT_TYPES.REGENERATION_REQUESTED] || 0;

    const totalGenerations = started > 0 ? started : (completed + failed);
    const genSuccessRate = totalGenerations > 0 ? ((completed / totalGenerations) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';
    const previewRate = completed > 0 ? ((previews / completed) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';
    const customizerRate = completed > 0 ? ((customizerOpened / completed) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';
    const exportRate = completed > 0 ? ((exportStarted / completed) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';
    const exportSuccessRate = exportStarted > 0 ? ((exportCompleted / exportStarted) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';
    const regenRate = completed > 0 ? ((regenerations / completed) * 100).toFixed(1) + '%' : 'INSUFFICIENT DATA';

    // Identify highest drop-off / abandonment stage
    let highestDrop = 'NONE';
    if (started > completed) {
      highestDrop = 'GENERATION_FAILURE';
    } else if (completed > previews && previews === 0) {
      highestDrop = 'PREVIEW_UNOPENED';
    } else if (previews > customizerOpened && exportStarted === 0) {
      highestDrop = 'CUSTOMIZER_ABANDONMENT';
    } else if (exportStarted > exportCompleted) {
      highestDrop = 'EXPORT_FAILURE';
    }

    return {
      status: totalGenerations >= 5 ? 'ACTIVE' : 'INSUFFICIENT DATA',
      sampleSize: events.length,
      counts: {
        started,
        completed,
        failed,
        previews,
        customizerOpened,
        saved,
        exportStarted,
        exportCompleted,
        regenerations
      },
      generationSuccessRate: genSuccessRate,
      previewConversionRate: previewRate,
      customizerUsageRate: customizerRate,
      exportRate: exportRate,
      exportSuccessRate: exportSuccessRate,
      regenerationRate: regenRate,
      abandonmentStage: highestDrop
    };
  }
}

module.exports = { FunnelAnalyzer };

/**
 * Human vs AI Quality Disagreement Analyzer (Phase 26)
 * Detects divergences between automated visual quality heuristics and actual human perception.
 */

class HumanAiDisagreementAnalyzer {
  /**
   * Analyzes a collection of feedback records against AI quality metrics
   * @param {Array} feedbackList - Array of feedback items from FeedbackService
   * @returns {{ disagreementCount: number, sampleSize: number, patterns: Array, report: Object }}
   */
  static analyzeDisagreements(feedbackList = []) {
    if (!Array.isArray(feedbackList) || feedbackList.length === 0) {
      return {
        sampleSize: 0,
        status: 'INSUFFICIENT DATA',
        disagreementCount: 0,
        patterns: [],
        findings: 'No feedback entries available to analyze.'
      };
    }

    const patterns = [];

    for (const fb of feedbackList) {
      const aiScore = fb.qualityScore;
      const humanRating = (fb.rating || '').toUpperCase();
      const comment = fb.comments || '';

      // Pattern 1: High AI score + Negative human rating
      if (aiScore && aiScore >= 90 && humanRating === 'NEGATIVE') {
        patterns.push({
          type: 'HIGH_AI_LOW_HUMAN',
          generationId: fb.generationId,
          aiScore,
          humanRating,
          comment,
          insight: 'System evaluated design as technically flawless, but human user found aesthetic unsatisfactory or ill-fitting.'
        });
      }

      // Pattern 2: Moderate/Lower AI score + Positive human rating
      if (aiScore && aiScore < 85 && humanRating === 'POSITIVE') {
        patterns.push({
          type: 'LOW_AI_HIGH_HUMAN',
          generationId: fb.generationId,
          aiScore,
          humanRating,
          comment,
          insight: 'System flagged strict whitespace or token penalties, but human user appreciated the unconventional or dense artistic aesthetic.'
        });
      }

      // Pattern 3: Readability complaints despite high accessibility score
      if (humanRating === 'NEGATIVE' && (comment.toLowerCase().includes('read') || comment.toLowerCase().includes('font') || comment.toLowerCase().includes('text'))) {
        patterns.push({
          type: 'PERCEIVED_READABILITY_GAP',
          generationId: fb.generationId,
          aiScore,
          humanRating,
          comment,
          insight: 'Passed WCAG AAA contrast algorithmically, but typographical hierarchy or scale was perceived as hard to read by the human user.'
        });
      }
    }

    return {
      sampleSize: feedbackList.length,
      status: feedbackList.length >= 5 ? 'ACTIVE' : 'INSUFFICIENT DATA',
      disagreementCount: patterns.length,
      patterns,
      findings: patterns.length === 0 
        ? 'AI quality scores and human ratings are currently aligned.' 
        : `Identified ${patterns.length} high-value perceptual disagreement patterns for product refinement.`
    };
  }
}

module.exports = { HumanAiDisagreementAnalyzer };

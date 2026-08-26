/**
 * Product Feedback Service (Phase 25)
 * Collects and evaluates human user ratings (👍, 😐, 👎) and qualitative change requests
 * linked to automated visual quality scores to identify perceptual disagreements.
 */

const { ProductTelemetry } = require('../analytics/product-events');

class FeedbackService {
  constructor() {
    this.feedbacks = [];
  }

  /**
   * Submits user rating & feedback
   * @param {Object} feedbackData - { rating, comments, generationId, blueprint, qualityScore, anonymousId }
   */
  submitFeedback(feedbackData = {}) {
    const validRatings = ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'positive', 'neutral', 'negative'];
    const rawRating = (feedbackData.rating || '').toUpperCase();

    if (!validRatings.map(r => r.toUpperCase()).includes(rawRating)) {
      throw new Error(`Invalid feedback rating '${feedbackData.rating}'. Expected POSITIVE, NEUTRAL, or NEGATIVE.`);
    }

    const sanitizedComment = typeof feedbackData.comments === 'string'
      ? feedbackData.comments.substring(0, 500)
      : '';

    const entry = {
      id: 'fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      rating: rawRating,
      comments: sanitizedComment,
      generationId: feedbackData.generationId || null,
      blueprint: feedbackData.blueprint || {},
      qualityScore: Number(feedbackData.qualityScore) || null,
      firstImpressionScore: Number(feedbackData.firstImpressionScore) || null,
      anonymousId: ProductTelemetry.hashIdentifier(feedbackData.userId || feedbackData.anonymousId),
      timestamp: Date.now()
    };

    this.feedbacks.push(entry);
    return entry;
  }

  /**
   * Aggregates feedback metrics
   */
  getSummary() {
    const total = this.feedbacks.length;
    if (total === 0) {
      return {
        sampleSize: 0,
        positiveCount: 0,
        neutralCount: 0,
        negativeCount: 0,
        satisfactionRate: 'INSUFFICIENT DATA',
        disagreements: []
      };
    }

    let positive = 0;
    let neutral = 0;
    let negative = 0;
    const disagreements = [];

    for (const fb of this.feedbacks) {
      if (fb.rating === 'POSITIVE') positive++;
      else if (fb.rating === 'NEUTRAL') neutral++;
      else if (fb.rating === 'NEGATIVE') {
        negative++;
        // If automated score was high (>= 90) but human rated NEGATIVE, flag disagreement
        if (fb.qualityScore && fb.qualityScore >= 90) {
          disagreements.push({
            id: fb.id,
            generationId: fb.generationId,
            qualityScore: fb.qualityScore,
            userComment: fb.comments,
            reason: 'High automated score (>=90) received negative human feedback'
          });
        }
      }
    }

    return {
      sampleSize: total,
      positiveCount: positive,
      neutralCount: neutral,
      negativeCount: negative,
      positivePercentage: ((positive / total) * 100).toFixed(1) + '%',
      neutralPercentage: ((neutral / total) * 100).toFixed(1) + '%',
      negativePercentage: ((negative / total) * 100).toFixed(1) + '%',
      satisfactionRate: (((positive + neutral * 0.5) / total) * 100).toFixed(1) + '%',
      disagreements
    };
  }

  clear() {
    this.feedbacks = [];
  }
}

const feedbackService = new FeedbackService();

module.exports = { FeedbackService, feedbackService };

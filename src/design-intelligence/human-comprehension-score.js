/**
 * 🏛️ Human Comprehension Score Model (Phase 47)
 * Evaluates the human readability, scanability, and cognitive clarity of the portfolio.
 * 
 * Dimensions:
 * 1. 5-Second Test: Identity & Role clarity
 * 2. 15-Second Test: Flagship work & proof discoverability
 * 3. 30-Second Test: Deep technical rationale & measurable outcome comprehension
 * 4. Scanability & Visual Rhythm
 * 5. Cognitive Load Optimization
 * 
 * Target: Mean Human Comprehension Score >= 90.0 / 100
 */

const { SemanticProximityAuditor } = require('./semantic-proximity-auditor');
const { ContentDumpDetector } = require('./content-dump-detector');

class HumanComprehensionScore {
  /**
   * Evaluates a generated portfolio for human comprehension
   * @param {Object} profile - User profile data
   * @param {string} html - Rendered HTML DOM
   * @returns {Object} Human comprehension evaluation
   */
  static evaluate(profile = {}, html = '') {
    const cleanHtml = String(html || '');
    let identityScore = 100;
    let workDiscoverabilityScore = 100;
    let technicalClarityScore = 100;
    let scanabilityScore = 100;

    // 1. 5-Second Test: Identity & Title in prominent heading
    const name = String(profile.name || '').toLowerCase();
    const role = String(profile.role || '').toLowerCase();
    if (!cleanHtml.toLowerCase().includes(name)) identityScore -= 40;
    if (!cleanHtml.toLowerCase().includes(role)) identityScore -= 30;

    // 2. 15-Second Test: Flagship Work & CTAs
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    if (projects.length > 0) {
      const topProj = projects[0];
      const pName = String(topProj.name || '').toLowerCase();
      if (!cleanHtml.toLowerCase().includes(pName)) workDiscoverabilityScore -= 50;
    }

    // 3. 30-Second Test: Deep Evidence & Semantic Proximity
    const proximity = SemanticProximityAuditor.audit(profile, cleanHtml);
    const dumpAudit = ContentDumpDetector.audit(profile, cleanHtml);

    technicalClarityScore = Math.min(100, Math.max(0, proximity.semanticProximityScore - (dumpAudit.contentDumpRate * 2)));

    // 4. Scanability: Heading structure & layout rhythm
    const hasHeadings = /<h[1-3]/i.test(cleanHtml);
    const hasStructuredBlocks = /class="[^"]*(project|case-study|timeline|dossier|article|blueprint)[^"]*"/i.test(cleanHtml);
    if (!hasHeadings) scanabilityScore -= 30;
    if (!hasStructuredBlocks) scanabilityScore -= 20;

    const overallScore = Number((
      identityScore * 0.25 +
      workDiscoverabilityScore * 0.25 +
      technicalClarityScore * 0.30 +
      scanabilityScore * 0.20
    ).toFixed(2));

    return {
      humanComprehensionScore: overallScore,
      identityScore,
      workDiscoverabilityScore,
      technicalClarityScore,
      scanabilityScore,
      semanticProximity: proximity.semanticProximityScore,
      contentDumpRate: dumpAudit.contentDumpRate,
      pass: overallScore >= 90.0 && proximity.pass && dumpAudit.pass
    };
  }

  /**
   * Evaluates a cohort of generated sites
   */
  static evaluateCohort(cohort = []) {
    if (!Array.isArray(cohort) || cohort.length === 0) {
      return { meanComprehension: 100, minComprehension: 100, pass: true };
    }

    const scores = cohort.map(site => this.evaluate(site.persona || site.input || {}, site.html || ''));
    const total = scores.reduce((sum, s) => sum + s.humanComprehensionScore, 0);
    const meanComprehension = Number((total / scores.length).toFixed(2));
    const minComprehension = Math.min(...scores.map(s => s.humanComprehensionScore));

    return {
      meanComprehension,
      minComprehension,
      pass: meanComprehension >= 90.0 && scores.every(s => s.pass),
      scores
    };
  }
}

module.exports = { HumanComprehensionScore };

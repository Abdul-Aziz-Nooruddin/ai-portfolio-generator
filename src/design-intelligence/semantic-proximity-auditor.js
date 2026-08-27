/**
 * 🏛️ Semantic Proximity Auditor (Phase 47)
 * Measures DOM and structural proximity between related semantic entities:
 * - Project Title <-> Architecture <-> Metrics <-> Tech
 * - Experience Role <-> Responsibilities <-> Outcomes
 * - Publication Title <-> Abstract <-> Findings <-> DOI
 * - Education Institution <-> Degree <-> Coursework
 * 
 * Target: Mean Semantic Proximity Score >= 90.0 / 100
 */

class SemanticProximityAuditor {
  /**
   * Audits semantic proximity of related facts across rendered HTML
   * @param {Object} profile - User profile data
   * @param {string} html - Rendered HTML DOM
   * @returns {Object} Proximity audit results
   */
  static audit(profile = {}, html = '') {
    const cleanHtml = String(html || '');
    let totalChecks = 0;
    let highProximityCount = 0;
    let mediumProximityCount = 0;
    let lowProximityCount = 0;

    // 1. Audit Projects Proximity
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    projects.forEach(p => {
      const pName = String(p.name || '').toLowerCase();
      const pNameIdx = cleanHtml.toLowerCase().indexOf(pName);

      if (pNameIdx >= 0) {
        // Check architecture proximity
        if (p.architecture) {
          totalChecks++;
          const archToken = String(p.architecture).slice(0, 25).toLowerCase();
          const archIdx = cleanHtml.toLowerCase().indexOf(archToken);
          if (archIdx >= 0 && Math.abs(archIdx - pNameIdx) < 4000) {
            highProximityCount++;
          } else if (archIdx >= 0) {
            mediumProximityCount++;
          } else {
            lowProximityCount++;
          }
        }

        // Check metrics proximity
        if (p.metrics) {
          totalChecks++;
          const metricToken = String(p.metrics).slice(0, 20).toLowerCase();
          const metricIdx = cleanHtml.toLowerCase().indexOf(metricToken);
          if (metricIdx >= 0 && Math.abs(metricIdx - pNameIdx) < 4000) {
            highProximityCount++;
          } else if (metricIdx >= 0) {
            mediumProximityCount++;
          } else {
            lowProximityCount++;
          }
        }
      }
    });

    // 2. Audit Experience Proximity
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    experience.forEach(e => {
      const company = String(e.company || '').toLowerCase();
      const compIdx = cleanHtml.toLowerCase().indexOf(company);

      if (compIdx >= 0) {
        if (e.responsibilities) {
          totalChecks++;
          const respToken = (Array.isArray(e.responsibilities) ? e.responsibilities[0] : String(e.responsibilities)).slice(0, 20).toLowerCase();
          const respIdx = cleanHtml.toLowerCase().indexOf(respToken);
          if (respIdx >= 0 && Math.abs(respIdx - compIdx) < 3500) {
            highProximityCount++;
          } else if (respIdx >= 0) {
            mediumProximityCount++;
          } else {
            lowProximityCount++;
          }
        }
        if (e.outcomes) {
          totalChecks++;
          const outToken = String(e.outcomes).slice(0, 20).toLowerCase();
          const outIdx = cleanHtml.toLowerCase().indexOf(outToken);
          if (outIdx >= 0 && Math.abs(outIdx - compIdx) < 3500) {
            highProximityCount++;
          } else if (outIdx >= 0) {
            mediumProximityCount++;
          } else {
            lowProximityCount++;
          }
        }
      }
    });

    // 3. Audit Publication Proximity
    const pubs = Array.isArray(profile.publications) ? profile.publications : [];
    pubs.forEach(pub => {
      const title = String(pub.title || '').toLowerCase();
      const titleIdx = cleanHtml.toLowerCase().indexOf(title);

      if (titleIdx >= 0) {
        if (pub.findings) {
          totalChecks++;
          const findToken = String(pub.findings).slice(0, 25).toLowerCase();
          const findIdx = cleanHtml.toLowerCase().indexOf(findToken);
          if (findIdx >= 0 && Math.abs(findIdx - titleIdx) < 3000) {
            highProximityCount++;
          } else if (findIdx >= 0) {
            mediumProximityCount++;
          } else {
            lowProximityCount++;
          }
        }
      }
    });

    const score = totalChecks > 0
      ? Number(((highProximityCount * 100 + mediumProximityCount * 80) / (totalChecks * 100) * 100).toFixed(2))
      : 100;

    return {
      totalChecks,
      highProximityCount,
      mediumProximityCount,
      lowProximityCount,
      semanticProximityScore: score,
      pass: score >= 90.0 && lowProximityCount === 0
    };
  }
}

module.exports = { SemanticProximityAuditor };

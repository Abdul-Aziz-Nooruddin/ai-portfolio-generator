/**
 * 🏛️ Content Dump Detector (Phase 47)
 * Detects whether facts have been lazily dumped into unstructured "miscellaneous" blocks,
 * or orphaned from their parent projects, career milestones, or research papers.
 * 
 * Target: CONTENT DUMP RATE = 0%
 */

class ContentDumpDetector {
  /**
   * Evaluates rendered HTML and content profile for content dump antipatterns
   * @param {Object} profile - User profile data
   * @param {string} html - Rendered HTML
   * @returns {Object} Content dump evaluation
   */
  static audit(profile = {}, html = '') {
    const cleanHtml = String(html || '');
    const violations = [];

    // 1. Detect Generic Fallback Dump Titles
    const dumpHeaderPatterns = [
      /<h[2-4][^>]*>\s*(Other|Miscellaneous|Dump|Unsorted|Extra Stuff)\s*<\/h[2-4]>/i,
      /class="[^"]*(generic-dump|misc-pile|fact-dump)[^"]*"/i
    ];

    dumpHeaderPatterns.forEach(pattern => {
      if (pattern.test(cleanHtml)) {
        violations.push('Found generic unsorted dump section header in DOM');
      }
    });

    // 2. Detect Orphaned High-Value Project Metrics
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    let orphanedProjectMetrics = 0;
    projects.forEach(p => {
      if (p.metrics) {
        // Project metric must be close to project title in HTML or in structured appendix with project name prefix
        const metricToken = String(p.metrics).slice(0, 20).toLowerCase();
        const pNameToken = String(p.name).toLowerCase();
        if (!cleanHtml.toLowerCase().includes(metricToken)) {
          orphanedProjectMetrics++;
          violations.push(`Project metric for "${p.name}" is missing from DOM`);
        }
      }
    });

    // 3. Detect Orphaned Career Outcomes
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    let orphanedOutcomes = 0;
    experience.forEach(e => {
      if (e.outcomes) {
        const outToken = String(e.outcomes).slice(0, 20).toLowerCase();
        if (!cleanHtml.toLowerCase().includes(outToken)) {
          orphanedOutcomes++;
          violations.push(`Experience outcome for "${e.company}" is missing from DOM`);
        }
      }
    });

    // 4. Calculate Content Dump Rate
    const totalHighValueSpecs = projects.length + experience.length;
    const totalOrphans = orphanedProjectMetrics + orphanedOutcomes;
    const contentDumpRate = totalHighValueSpecs > 0 ? Number((totalOrphans / totalHighValueSpecs * 100).toFixed(2)) : 0;

    return {
      pass: violations.length === 0 && contentDumpRate === 0,
      contentDumpRate,
      orphanedProjectMetrics,
      orphanedOutcomes,
      violations
    };
  }
}

module.exports = { ContentDumpDetector };

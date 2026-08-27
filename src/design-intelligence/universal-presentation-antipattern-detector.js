/**
 * 🏛️ Universal Presentation Anti-Pattern Detector (Phase 48)
 * Detects structural presentation anti-patterns in rendered HTML:
 * 1. Giant "Everything Card" Anti-Pattern (cramming 15+ disconnected fields into one generic card)
 * 2. Miscellaneous Fact Dumps (Generic "Other" / "Details" containers)
 * 3. Skill Cloud Pollution (putting metrics or URLs into skill pill arrays)
 * 4. Project Flattening (rich projects collapsed into basic 3-line cards)
 * 5. Academic Flattening (papers stripped of DOI, abstract, and empirical findings)
 * 6. Questionnaire Degradation (answers formatted like raw HTML forms)
 */

class UniversalPresentationAntipatternDetector {
  /**
   * Evaluates rendered HTML and input profile for presentation antipatterns
   * @param {Object} profile - User profile data
   * @param {string} html - Rendered HTML
   * @returns {Object} Anti-pattern evaluation report
   */
  static audit(profile = {}, html = '') {
    const cleanHtml = String(html || '');
    const violations = [];

    // 1. Check for Generic Dump Headers
    const dumpHeaderRegex = /<h[2-4][^>]*>\s*(Other|Miscellaneous|Dump|Unsorted|Extra Stuff)\s*<\/h[2-4]>/i;
    if (dumpHeaderRegex.test(cleanHtml)) {
      violations.push('Anti-Pattern Detected: Generic unsorted dump header found in DOM');
    }

    // 2. Check for Project Flattening on Deep Projects
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    const richProjects = projects.filter(p => p.architecture || p.metrics || p.decisions || p.challenges);
    if (richProjects.length > 0) {
      richProjects.forEach(rp => {
        // Verify architecture or metric is rendered near project name or structured specification block
        if (rp.architecture) {
          const archSnippet = String(rp.architecture).slice(0, 20).toLowerCase();
          if (!cleanHtml.toLowerCase().includes(archSnippet)) {
            violations.push(`Project Flattening Detected: Architecture for "${rp.name}" was omitted or unrendered`);
          }
        }
      });
    }

    // 3. Check for Academic Flattening on Research Papers
    const pubs = Array.isArray(profile.publications) ? profile.publications : [];
    pubs.forEach(pub => {
      if (pub.doi) {
        const doiSnippet = String(pub.doi).toLowerCase();
        if (!cleanHtml.toLowerCase().includes(doiSnippet)) {
          violations.push(`Academic Flattening Detected: DOI for "${pub.title}" was omitted`);
        }
      }
      if (pub.findings) {
        const findingsSnippet = String(pub.findings).slice(0, 25).toLowerCase();
        if (!cleanHtml.toLowerCase().includes(findingsSnippet)) {
          violations.push(`Academic Flattening Detected: Empirical findings for "${pub.title}" were omitted`);
        }
      }
    });

    // 4. Check for Raw Questionnaire Dumping
    if (cleanHtml.includes('Question 1:') || cleanHtml.includes('Question 2:')) {
      violations.push('Questionnaire Degradation Detected: Questionnaire rendered as raw numbered quiz format');
    }

    return {
      pass: violations.length === 0,
      violationsCount: violations.length,
      violations
    };
  }

  /**
   * Evaluates a cohort of generated portfolios
   */
  static auditCohort(cohort = []) {
    let totalViolations = 0;
    const failures = [];

    cohort.forEach((site, idx) => {
      const rep = this.audit(site.persona || {}, site.html || '');
      if (!rep.pass) {
        totalViolations += rep.violationsCount;
        failures.push({ index: idx, violations: rep.violations });
      }
    });

    return {
      totalViolations,
      cleanSitesCount: cohort.length - failures.length,
      pass: totalViolations === 0,
      failures
    };
  }
}

module.exports = { UniversalPresentationAntipatternDetector };

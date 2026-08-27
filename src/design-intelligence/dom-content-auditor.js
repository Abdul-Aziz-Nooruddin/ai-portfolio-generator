/**
 * 🏛️ DOM Content Auditor (Phase 45)
 * Performs forensic inspection of the final rendered HTML DOM against all input facts.
 * Normalizes visible DOM text, decodes HTML entities, inspects semantic attributes (href, alt, src, data-*),
 * and verifies that 100% of verified and user-provided facts are represented in the output DOM.
 * 
 * Also audits for forbidden fabricated facts (hallucinated metrics, fake testimonials, lorem ipsum).
 */

const { ContentLineage } = require('./content-lineage');
const { EvidencePreservationContract } = require('./evidence-preservation-contract');

class DomContentAuditor {
  /**
   * Audits a rendered portfolio against the raw input/canonical model
   * @param {Object} input - Raw input or CanonicalEvidenceModel
   * @param {string} renderedHtml - Final compiled HTML
   * @returns {Object} Comprehensive DOM Content Audit Report
   */
  static audit(input = {}, renderedHtml = '') {
    const html = String(renderedHtml || '');

    // 1. Build and evaluate universal ContentLineage
    const lineage = ContentLineage.buildFromPipeline(input, null, null, html);
    const lineageReport = lineage.getReport();

    // 2. Semantic URL & Link Presence Check
    const extractedUrls = [];
    const collectUrls = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string' && (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('mailto:'))) {
          extractedUrls.push({ field: k, url: v });
        } else if (typeof v === 'object') {
          collectUrls(v);
        }
      }
    };
    collectUrls(input);

    const missingUrls = [];
    extractedUrls.forEach(item => {
      const urlToken = item.url.toLowerCase().trim();
      const cleanHtml = html.toLowerCase();
      if (!cleanHtml.includes(urlToken)) {
        // Also check if domain or slug is linked
        try {
          const parsed = new URL(item.url);
          const domainSlug = (parsed.hostname + parsed.pathname).toLowerCase();
          if (!cleanHtml.includes(domainSlug)) {
            missingUrls.push(item);
          }
        } catch (_) {
          missingUrls.push(item);
        }
      }
    });

    // 3. Fabrication & Hallucination Check
    const fabricatedFacts = [];
    const forbiddenPatterns = [
      { pattern: /10k\+\s+users/i, label: 'Unverified "10K+ Users" claim' },
      { pattern: /99\.9%\s+uptime/i, label: 'Unverified "99.9% Uptime" claim' },
      { pattern: /trusted by 50\+/i, label: 'Unverified "Trusted by 50+" claim' },
      { pattern: /lorem ipsum/i, label: 'Placeholder Lorem Ipsum detected' },
      { pattern: /\{\{[^}]+\}\}/i, label: 'Unrendered template token {{...}} detected' },
      { pattern: /\[object object\]/i, label: 'Unserialized [object Object] detected' }
    ];

    forbiddenPatterns.forEach(({ pattern, label }) => {
      if (pattern.test(html)) {
        // Only trigger if the user input did NOT explicitly contain this phrase
        const inputStr = JSON.stringify(input);
        if (!pattern.test(inputStr)) {
          fabricatedFacts.push(label);
        }
      }
    });

    // 4. Determine Overall Audit Status
    const pass = lineageReport.isLossless && missingUrls.length === 0 && fabricatedFacts.length === 0;

    return {
      pass,
      totalFieldsAudited: lineageReport.totalFields,
      preservedFields: lineageReport.preservedFields,
      lostFields: lineageReport.lostFields,
      verifiedRetention: lineageReport.verifiedRetention,
      userProvidedRetention: lineageReport.userProvidedRetention,
      ocrRetention: lineageReport.ocrRetention,
      customRetention: lineageReport.customRetention,
      overallRetention: lineageReport.overallRetention,
      droppedVerifiedFields: lineageReport.droppedVerifiedFields,
      droppedUserFields: lineageReport.droppedUserFields,
      missingUrls,
      fabricatedFacts,
      fabricatedCount: fabricatedFacts.length,
      lostRecords: lineageReport.lostRecords,
      lineage
    };
  }

  /**
   * Evaluates a cohort of sites
   */
  static auditCohort(cohort = []) {
    if (!Array.isArray(cohort) || cohort.length === 0) {
      return { pass: true, meanRetention: 100, totalLost: 0, totalFabricated: 0 };
    }

    const reports = cohort.map(item => this.audit(item.persona || item.input || {}, item.html || ''));
    const totalFields = reports.reduce((sum, r) => sum + r.totalFieldsAudited, 0);
    const preservedFields = reports.reduce((sum, r) => sum + r.preservedFields, 0);
    const lostFields = reports.reduce((sum, r) => sum + r.lostFields, 0);
    const droppedVerified = reports.reduce((sum, r) => sum + r.droppedVerifiedFields, 0);
    const droppedUser = reports.reduce((sum, r) => sum + r.droppedUserFields, 0);
    const fabricatedCount = reports.reduce((sum, r) => sum + r.fabricatedCount, 0);
    const meanRetention = reports.reduce((sum, r) => sum + r.overallRetention, 0) / reports.length;

    return {
      totalSites: cohort.length,
      totalFields,
      preservedFields,
      lostFields,
      droppedVerified,
      droppedUser,
      fabricatedCount,
      meanRetention: Number(meanRetention.toFixed(2)),
      pass: lostFields === 0 && fabricatedCount === 0,
      reports
    };
  }
}

module.exports = { DomContentAuditor };

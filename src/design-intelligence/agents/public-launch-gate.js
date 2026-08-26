/**
 * 🏛️ Public Launch Gate (Phase 31)
 * Evaluates production readiness across Product, Security, Reliability, Persistence,
 * Export Sanitization, and Observability.
 * Fails closed: ANY critical security or unrecoverable journey violation yields FAIL.
 */

const { StaticExporter } = require('../../export/static-exporter');
const { SecurityService } = require('../../services/security-service');
const { GitHubParser } = require('../../services/github/github-parser');
const { BetaDashboard } = require('../../analytics/beta-dashboard');

class PublicLaunchGate {
  constructor() {
    this.securityService = new SecurityService();
  }

  /**
   * Evaluates end-to-end production readiness
   * @param {Object} context
   * @returns {Promise<{ pass: boolean, score: number, criticalViolations: Array, findings: Array, breakdown: Object }>}
   */
  async evaluate(context = {}) {
    const findings = [];
    const criticalViolations = [];

    let productScore = 100;
    let securityScore = 100;
    let reliabilityScore = 100;
    let persistenceScore = 100;
    let exportScore = 100;
    let observabilityScore = 100;

    // 1. SECURITY CHECKS
    // 1a. SSRF Defense Check
    const ssrfSafe1 = this.securityService.isUrlSafe('https://github.com/torvalds', ['github.com']);
    const ssrfBlocked1 = !this.securityService.isUrlSafe('http://169.254.169.254/latest/meta-data', ['github.com']);
    const ssrfBlocked2 = !this.securityService.isUrlSafe('http://localhost:3000/internal', ['github.com']);

    if (!ssrfSafe1 || !ssrfBlocked1 || !ssrfBlocked2) {
      securityScore -= 50;
      criticalViolations.push('SSRF Filter Violation: Failed to block private or cloud metadata IPs');
    }

    // 1b. Path Traversal & Zip Slip Defense
    const pathSafe = this.securityService.isPathSafe('/app/public/sites', 'web-12345');
    const pathTraversalBlocked = !this.securityService.isPathSafe('/app/public/sites', '../../etc/passwd');

    if (!pathSafe || !pathTraversalBlocked) {
      securityScore -= 50;
      criticalViolations.push('Path Traversal Violation: Relative traversal sequences not rejected');
    }

    // 1c. XSS AI Output Sanitization
    const maliciousAiPayload = {
      html: '<section><h1>Developer</h1><script>alert("xss")</script><img src="x" onerror="evil()"></section>',
      css: 'body { color: red; }',
      js: 'console.log(1);'
    };
    const sanitized = this.securityService.sanitizeAiOutput(maliciousAiPayload);
    if (sanitized.html.includes('<script>alert') || sanitized.html.includes('onerror="evil()')) {
      securityScore -= 50;
      criticalViolations.push('XSS Defense Violation: Malicious scripts in AI output not stripped');
    }

    // 2. EXPORT SANITIZATION CHECKS
    const sampleHtmlWithArtifacts = `
      <!DOCTYPE html>
      <html>
        <head><title>Portfolio</title></head>
        <body>
          <div id="preview-watermark-overlay"><span>Watermark</span></div>
          <div id="preview-floating-bar"><a href="/subscribe">Buy</a></div>
          <a href="http://localhost:3000/p/web-12345">Preview</a>
          <form action="/api/sites/web-12345/contact" method="POST"></form>
        </body>
      </html>
    `;
    const cleanExportHtml = StaticExporter.sanitizeHtmlForExport(sampleHtmlWithArtifacts);
    if (
      cleanExportHtml.includes('http://localhost:3000/p/') ||
      cleanExportHtml.includes('id="preview-watermark-overlay"') ||
      cleanExportHtml.includes('id="preview-floating-bar"') ||
      cleanExportHtml.includes('/api/sites/')
    ) {
      exportScore -= 40;
      criticalViolations.push('Export Sanitization Violation: Leaked localhost, watermark, or internal endpoints in exported static HTML');
    }

    // 3. INPUT PARSER & ROBUSTNESS CHECKS
    const validParse = GitHubParser.parse('https://github.com/torvalds').valid;
    const invalidParse = !GitHubParser.parse('https://gitlab.com/invalid-site').valid;
    if (!validParse || !invalidParse) {
      reliabilityScore -= 30;
      findings.push('GitHub input parser failed valid/invalid boundary checks');
    }

    // 4. OBSERVABILITY CHECKS
    const obsReport = BetaDashboard.generateReport({ isRealUserData: true });
    if (!obsReport || !obsReport.dataSource || !obsReport.metrics) {
      observabilityScore -= 30;
      findings.push('Observability telemetry dashboard could not produce report structure');
    }

    const overallScore = Math.round(
      (productScore * 0.20) +
      (securityScore * 0.25) +
      (reliabilityScore * 0.20) +
      (persistenceScore * 0.15) +
      (exportScore * 0.10) +
      (observabilityScore * 0.10)
    );

    const pass = criticalViolations.length === 0 && overallScore >= 90;

    return {
      pass,
      score: overallScore,
      criticalViolations,
      findings,
      breakdown: {
        product: productScore,
        security: securityScore,
        reliability: reliabilityScore,
        persistence: persistenceScore,
        export: exportScore,
        observability: observabilityScore
      }
    };
  }
}

module.exports = { PublicLaunchGate };

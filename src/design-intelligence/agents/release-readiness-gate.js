/**
 * Release Readiness Gate (Phase 24)
 * Fail-closed gate assessing production launch readiness across Security, Visual Quality,
 * HTML Validity, Static Export Sanitization, Responsive Mobile Integrity, and Resilience.
 */

const { BrowserVisualQualityAgent } = require('./browser-visual-quality-agent');
const { DesignQualityGate } = require('./design-quality-gate');
const { StaticExporter } = require('../../export/static-exporter');

class ReleaseReadinessGate {
  /**
   * Assesses overall release readiness of a generated/customized portfolio
   * @param {Object} site - { html, css, js, designBrief, designBlueprint }
   * @param {Object} portfolioState - Optional PortfolioState instance
   * @returns {Promise<{ ready: boolean, score: number, blockers: string[], warnings: string[], evidence: Object }>}
   */
  static async evaluate(site = {}, portfolioState = null) {
    const blockers = [];
    const warnings = [];
    const evidence = {};

    const html = site.html || (portfolioState && portfolioState.renderCurrentHtml ? portfolioState.renderCurrentHtml() : '');
    const css = site.css || (portfolioState?.shell?.styles) || '';
    const js = site.js || (portfolioState?.shell?.scripts) || '';

    // 1. HTML5 Validity & Sanity Checks
    if (!html || html.length < 500) {
      blockers.push('CRITICAL: Empty or truncated HTML document.');
    }
    if (!html.includes('<!DOCTYPE html>') || !html.includes('viewport')) {
      blockers.push('CRITICAL: Missing valid HTML5 DOCTYPE or responsive viewport meta tag.');
    }
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, '');
    if (bodyText.includes('>undefined<') || bodyText.includes(' undefined ') || bodyText.includes('>null<') || bodyText.includes('[object Object]')) {
      blockers.push('CRITICAL: Corrupted content detected in rendered DOM text (found unrendered undefined/null/[object Object]).');
    }

    // 2. Security & Sanitization Audit
    if (html.includes('javascript:') || html.includes('<script>eval(')) {
      blockers.push('CRITICAL: Potential XSS / unsafe javascript: URI or eval execution detected.');
    }
    if (html.includes('http://localhost:3000/p/') && !html.includes('preview-watermark-overlay')) {
      warnings.push('HIGH: Development localhost URLs present in production markup.');
    }

    // 3. Visual Quality & Anti-Ugly Evaluation
    const visualAudit = BrowserVisualQualityAgent.audit(site, site.designBrief || portfolioState?.designBrief || {});
    evidence.qualityScore = visualAudit.qualityScore;
    evidence.categoryScores = visualAudit.categoryScores;
    evidence.antiUglyFindings = visualAudit.findings;

    if (visualAudit.qualityScore < 85) {
      blockers.push(`CRITICAL: Visual quality score ${visualAudit.qualityScore}/100 is below the production threshold of 85.`);
    }
    const criticalFindings = visualAudit.findings.filter(f => f.severity === 'CRITICAL');
    if (criticalFindings.length > 0) {
      for (const cf of criticalFindings) {
        blockers.push(`CRITICAL: Anti-ugly failure - ${cf.rule}: ${cf.desc}`);
      }
    }

    // 4. Responsive & Layout Integrity
    if (html.includes('overflow-x: scroll') || html.includes('width: 100vw; margin-left: -50vw;')) {
      warnings.push('MEDIUM: Potential horizontal scroll overflow in mobile viewports.');
    }

    // 5. Static Export Validation
    if (portfolioState) {
      try {
        const exportRes = await StaticExporter.exportPortfolio(portfolioState);
        evidence.exportSize = exportRes.zipBuffer.length;
        evidence.exportFiles = exportRes.fileCount;

        if (exportRes.zipBuffer.length < 500) {
          blockers.push('CRITICAL: Static ZIP export generated an empty or corrupted archive.');
        }
      } catch (expErr) {
        blockers.push(`CRITICAL: Static ZIP export failed: ${expErr.message}`);
      }
    }

    // Compute Overall Release Readiness Score (0–100)
    let score = Math.max(0, visualAudit.qualityScore - (blockers.length * 20) - (warnings.length * 5));
    const ready = blockers.length === 0 && score >= 85;

    return {
      ready,
      score,
      blockers,
      warnings,
      evidence
    };
  }
}

module.exports = { ReleaseReadinessGate };

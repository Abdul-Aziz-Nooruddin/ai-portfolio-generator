/**
 * 🎖️ Test Suite: Certificate & Candidate Photo Ingestion
 * Validates:
 * 1. AI & heuristics certificate parsing (Deloitte, AWS, Coursera, Google)
 * 2. Multi-source certificate merging in UnifiedProfileNormalizer
 * 3. Photo & avatar propagation into candidate profiles and template rendering
 */

const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { AIService } = require('./services/ai-service');
const { UnifiedProfileNormalizer } = require('./services/unified-profile-normalizer');
const { TemplateHelper } = require('./templates/template-helper');
const { TemplateRegistry } = require('./templates/template-registry');

describe('🎖️ Certificate & Candidate Photo Ingestion Pipeline', () => {
  const aiService = new AIService();

  it('1. Parses certificate buffer or heuristics correctly', async () => {
    const certPath = '/Users/abdulaziz/Downloads/deloitte..pdf';
    let certBuf = null;
    if (fs.existsSync(certPath)) {
      certBuf = fs.readFileSync(certPath);
    } else {
      certBuf = Buffer.from('Deloitte Cyber Job Simulation Certificate completed by Abdul Aziz Nooruddin');
    }

    const parsed = await aiService.parseCertificateDocument(certBuf, 'application/pdf', 'deloitte..pdf');
    assert.ok(parsed, 'Parsed result must not be null');
    assert.ok(parsed.issuer, 'Issuer must be extracted');
    assert.strictEqual(parsed.issuer.toLowerCase(), 'deloitte', 'Issuer must be Deloitte');
  });

  it('2. UnifiedProfileNormalizer preserves certificates and extracts candidate avatar', () => {
    const input = {
      name: 'Abdul Aziz Nooruddin',
      role: 'AI Systems Architect',
      photoUrl: '/sites/test-site/avatar.png',
      certificates: [
        {
          name: 'Cyber Job Simulation',
          issuer: 'Deloitte',
          date: 'September 2026',
          id: '6a9ee8531c45172ff2f40f06',
          url: '/sites/test-site/certificates/deloitte.pdf',
          verified: true
        }
      ]
    };

    const normalized = UnifiedProfileNormalizer.normalize(input);
    assert.strictEqual(normalized.avatar, '/sites/test-site/avatar.png');
    assert.strictEqual(normalized.photoUrl, '/sites/test-site/avatar.png');
    assert.strictEqual(normalized.certifications.length, 1);
    assert.strictEqual(normalized.certifications[0].name, 'Cyber Job Simulation');
    assert.strictEqual(normalized.certifications[0].issuer, 'Deloitte');
    assert.strictEqual(normalized.certifications[0].url, '/sites/test-site/certificates/deloitte.pdf');
  });

  it('3. TemplateHelper.normalize maintains avatar and certification metadata', () => {
    const candidateData = {
      name: 'Abdul Aziz Nooruddin',
      avatar: '/sites/test-site/avatar.png',
      certifications: [
        {
          name: 'AWS Solutions Architect Associate',
          issuer: 'Amazon Web Services',
          date: '2026',
          id: 'AWS-123456',
          url: 'https://aws.amazon.com/verify/123456',
          verified: true
        }
      ]
    };

    const data = TemplateHelper.normalize(candidateData);
    assert.strictEqual(data.avatar, '/sites/test-site/avatar.png');
    assert.strictEqual(data.photoUrl, '/sites/test-site/avatar.png');
    assert.strictEqual(data.certifications.length, 1);
    assert.strictEqual(data.certifications[0].name, 'AWS Solutions Architect Associate');
    assert.strictEqual(data.certifications[0].issuer, 'Amazon Web Services');
    assert.strictEqual(data.certifications[0].url, 'https://aws.amazon.com/verify/123456');
  });

  it('4. Generated templates render both photo avatar and certificates', () => {
    const candidateData = {
      name: 'Abdul Aziz Nooruddin',
      avatar: '/sites/test-site/avatar.png',
      certifications: [
        {
          name: 'Cyber Job Simulation',
          issuer: 'Deloitte',
          date: 'September 2026',
          id: '6a9ee8531c45172ff2f40f06',
          url: '/sites/test-site/certificates/deloitte.pdf',
          verified: true
        }
      ]
    };

    const normalized = UnifiedProfileNormalizer.normalize(candidateData);

    // Test across several templates
    ['cyber-architect-sprawl', 'abyssal-nautilus-artisan', 'neon-aurora-cyber'].forEach(templateId => {
      const template = TemplateRegistry.templates[templateId];
      assert.ok(template, `Template ${templateId} must exist in registry`);
      const html = template.render(normalized);

      assert.ok(html.includes('Deloitte'), `Template ${templateId} must render Deloitte certificate`);
      assert.ok(html.includes('/sites/test-site/avatar.png'), `Template ${templateId} must render candidate avatar`);
    });
  });
});

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { CustomDomainService } = require('./services/custom-domain-service');
const { TemplateRegistry } = require('./templates/template-registry');

async function testVipDomainRouting() {
  console.log('▶ Testing VIP Founder Domain Routing and Dynamic Design Switching...');

  const customDomainService = new CustomDomainService();
  
  // 1. Verify custom domain service can store and retrieve universeKey
  const testSiteId = 'abdulaziz-test-' + Date.now();
  const testUniverse = 'jack-3d-creator';
  
  customDomainService.domainCache['abdulaziz.myfolio.tech'] = {
    domain: 'abdulaziz.myfolio.tech',
    handle: 'abdulaziz',
    siteId: testSiteId,
    universeKey: testUniverse,
    userId: 'abdulaziz_founder',
    type: 'subdomain',
    status: 'active',
    updatedAt: new Date().toISOString()
  };
  customDomainService.saveCache();

  // Reload cache to verify persistence
  const reloadedService = new CustomDomainService();
  const resolved = reloadedService.resolveHostname('abdulaziz.myfolio.tech');
  assert.strictEqual(resolved, testSiteId, 'Must resolve to latest siteId');
  const record = reloadedService.domainCache['abdulaziz.myfolio.tech'];
  assert.strictEqual(record.universeKey, testUniverse, 'Must preserve universeKey');
  console.log('✔ 1. CustomDomainService stores and reloads universeKey correctly');

  // 2. Verify fallback uses stored universeKey
  const domainRecord = reloadedService.domainCache['abdulaziz.myfolio.tech'];
  const activeUniverse = domainRecord?.universeKey || 'jack-3d-creator';
  const template = TemplateRegistry.templates[activeUniverse];
  assert.ok(template, `Template for ${activeUniverse} must exist in TemplateRegistry`);
  assert.strictEqual(template.id, 'jack-3d-creator', 'Must resolve to jack-3d-creator');
  console.log('✔ 2. Dynamic synthesis fallback resolves active universe:', template.id);

  // 3. Verify jack-3d-creator renders with Abdul Aziz profile
  const html = template.render({
    name: 'Abdul Aziz Nooruddin',
    role: 'AI Systems Specialist',
    projects: [
      { name: 'Ai Portfolio Generator', desc: 'Turn your GitHub repositories into 3D portfolios.' }
    ]
  });
  assert.ok(html.includes('Abdul Aziz'), 'Rendered HTML must contain Abdul Aziz');
  console.log('✔ 3. Dynamic template render produces correct bespoke experience');

  // 4. Test universal fallback
  const bioTemplate = TemplateRegistry.templates['3d-creator'];
  assert.ok(bioTemplate, '3d-creator must be available');
  const bioRes = bioTemplate.render({
    name: 'Abdul Aziz Nooruddin',
    role: 'AI Systems Specialist',
    skills: ['Three.js', 'WebGL', 'AI']
  });
  const bioHtml = typeof bioRes === 'string' ? bioRes : (bioRes.html || '');
  assert.ok(bioHtml.includes('Abdul Aziz'), 'Template renders candidate name');
  console.log('✔ 4. Universal 3D Creator renders dynamically');

  console.log('\n🎉 ALL VIP DOMAIN ROUTING CHECKS PASSED!\n');
}

testVipDomainRouting().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

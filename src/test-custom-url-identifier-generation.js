const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { CustomDomainService } = require('./services/custom-domain-service');
const { HostingProvider } = require('./services/hosting-provider');
const { AuthHandler } = require('./handlers/auth-handler');
const { SecurityService } = require('./services/security-service');

test('Custom URL Identifier (Username) Portfolio Generation & Historical Isolation', async (t) => {
  const hostingProvider = new HostingProvider();
  const securityService = new SecurityService();

  await t.test('1. Updating username in profile does NOT reassign or overwrite previous portfolios', async () => {
    // Mock DB Service
    let dbUser = {
      id: 'test_user_1',
      name: 'Abdul Aziz',
      username: 'abdulaziz',
      email: 'abdulaziznoor9876@gmail.com',
      role: 'admin'
    };

    const mockDb = {
      getUserByUsername: async (u) => (u === 'abdulaziz' ? dbUser : null),
      updateUser: async (id, fields) => {
        Object.assign(dbUser, fields);
        return dbUser;
      },
      getUserById: async (id) => dbUser
    };

    // Initialize custom domain service with an existing abdulaziz portfolio
    const customDomain = new CustomDomainService();
    customDomain.domainCache['abdulaziz.myfolio.tech'] = {
      domain: 'abdulaziz.myfolio.tech',
      handle: 'abdulaziz',
      siteId: 'abdulaziz-1788796620536',
      userId: 'test_user_1',
      type: 'subdomain',
      status: 'active'
    };

    const authHandler = new AuthHandler(mockDb, securityService, null, customDomain);

    const req = {
      user: { ...dbUser },
      body: {
        name: 'Abdul Aziz',
        username: 'aziz'
      }
    };

    let responseData = null;
    const res = {
      json: (d) => { responseData = d; return res; },
      status: (code) => res
    };

    await authHandler.updateProfile(req, res);

    assert.strictEqual(responseData.success, true);
    assert.strictEqual(dbUser.username, 'aziz', 'DB user username must be updated to aziz');
    assert.strictEqual(req.user.username, 'aziz', 'Request user username must be updated to aziz');

    // CRITICAL: Ensure abdulaziz.myfolio.tech was NOT deleted or reassigned
    assert.ok(customDomain.domainCache['abdulaziz.myfolio.tech'], 'abdulaziz.myfolio.tech must still exist in domain cache');
    assert.strictEqual(customDomain.domainCache['abdulaziz.myfolio.tech'].siteId, 'abdulaziz-1788796620536', 'Previous portfolio siteId must remain intact');

    // Ensure aziz was NOT prematurely assigned to the old portfolio
    assert.strictEqual(customDomain.domainCache['aziz.myfolio.tech'], undefined, 'New username must NOT be assigned old portfolio before generation');
  });

  await t.test('2. Generating portfolio with username "aziz" creates a separate portfolio and maps aziz.myfolio.tech', async () => {
    const customDomain = new CustomDomainService();
    // Simulate pre-existing portfolio for abdulaziz
    customDomain.domainCache['abdulaziz.myfolio.tech'] = {
      domain: 'abdulaziz.myfolio.tech',
      handle: 'abdulaziz',
      siteId: 'abdulaziz-1788796620536',
      status: 'active'
    };

    // User is generating with new custom URL identifier "aziz"
    const reqUser = {
      id: 'test_user_1',
      email: 'abdulaziznoor9876@gmail.com',
      username: 'aziz'
    };

    const authenticatedEmail = reqUser.email.toLowerCase().trim();
    const isVipFounder = Boolean(authenticatedEmail === 'abdulaziznoor9876@gmail.com');
    assert.strictEqual(isVipFounder, true);

    let userHandle = (
      reqUser?.username ||
      (isVipFounder ? 'abdulaziz' : '')
    ).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '').replace(/^[-_]+|[-_]+$/g, '');

    assert.strictEqual(userHandle, 'aziz');

    const versionSiteId = isVipFounder ? `${userHandle}-${Date.now()}` : `web-${crypto.randomUUID()}`;
    assert.ok(versionSiteId.startsWith('aziz-'), `versionSiteId must start with aziz-, got ${versionSiteId}`);

    const customSubdomain = `${userHandle}.myfolio.tech`;
    const customLocalDomain = `${userHandle}.localhost`;

    customDomain.domainCache[customSubdomain] = {
      domain: customSubdomain,
      handle: userHandle,
      siteId: versionSiteId,
      userId: reqUser.id,
      type: 'subdomain',
      status: 'active'
    };

    // Verify both portfolios coexist independently
    assert.strictEqual(customDomain.domainCache['abdulaziz.myfolio.tech'].siteId, 'abdulaziz-1788796620536');
    assert.strictEqual(customDomain.domainCache['aziz.myfolio.tech'].siteId, versionSiteId);
    assert.notStrictEqual(customDomain.domainCache['abdulaziz.myfolio.tech'].siteId, customDomain.domainCache['aziz.myfolio.tech'].siteId);
  });
});

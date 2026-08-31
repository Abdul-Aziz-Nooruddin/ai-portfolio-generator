/**
 * Test Google OAuth 2.0 & Verification System
 */

const test = require('node:test');
const assert = require('node:assert');
const http = require('http');

const PORT = 5050;

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

test('🛡️ Google OAuth 2.0 & Verification System', async (t) => {
  let sessionCookie = '';

  await t.test('1. GET /api/auth/google/config returns Google OAuth status', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/google/config',
      method: 'GET'
    });

    assert.strictEqual(res.status, 200);
    assert.ok('configured' in res.body);
  });

  await t.test('2. POST /api/auth/google/verify rejects empty payload with 400', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/google/verify',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {});

    assert.strictEqual(res.status, 400);
    assert.ok(res.body.error);
  });

  await t.test('3. POST /api/auth/google/verify creates verified user & sets session cookie', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/google/verify',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'alex.creator.verified@gmail.com',
      name: 'Alex Creator',
      picture: 'https://lh3.googleusercontent.com/a/sample_avatar',
      sub: 'google_oauth_sub_12345'
    });

    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.verified, true);
    assert.strictEqual(res.body.user.email, 'alex.creator.verified@gmail.com');
    assert.strictEqual(res.body.user.email_verified, true);

    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie, 'Expected Set-Cookie header');
    sessionCookie = setCookie[0].split(';')[0];
  });

  await t.test('4. GET /api/auth/me confirms authenticated session with verified status', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        'Cookie': sessionCookie
      }
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.email, 'alex.creator.verified@gmail.com');
    assert.strictEqual(res.body.user.email_verified, true);
  });

  await t.test('5. Re-authenticating existing Google user signs in immediately with verified state', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/google/verify',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'alex.creator.verified@gmail.com',
      name: 'Alex Creator Updated'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.verified, true);
  });
});

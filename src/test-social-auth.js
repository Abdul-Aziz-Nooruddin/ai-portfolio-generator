/**
 * Test Social Authentication Flow (Google & GitHub)
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

test('🔐 Google & GitHub Social Authentication Flow', async (t) => {
  let googleCookie = '';
  let githubCookie = '';

  await t.test('1. POST /api/auth/social with Google links account and sets session cookie', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/social',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      provider: 'google',
      email: 'test_google_dev@gmail.com',
      name: 'Google Dev Tester',
      username: 'google_tester'
    });

    assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}: ${JSON.stringify(res.body)}`);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.email, 'test_google_dev@gmail.com');
    assert.strictEqual(res.body.user.name, 'Google Dev Tester');

    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie, 'Expected Set-Cookie header');
    googleCookie = setCookie[0].split(';')[0];
    assert.ok(googleCookie.startsWith('portfolio_session='), 'Expected portfolio_session cookie');
  });

  await t.test('2. GET /api/auth/me verifies Google authenticated session', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        'Cookie': googleCookie
      }
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.email, 'test_google_dev@gmail.com');
  });

  await t.test('3. POST /api/auth/social with GitHub links account and sets session cookie', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/social',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      provider: 'github',
      email: 'test_github_dev@github.com',
      name: 'GitHub Dev Tester',
      username: 'github_tester'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.email, 'test_github_dev@github.com');

    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie, 'Expected Set-Cookie header');
    githubCookie = setCookie[0].split(';')[0];
  });

  await t.test('4. GET /api/auth/me verifies GitHub authenticated session', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/me',
      method: 'GET',
      headers: {
        'Cookie': githubCookie
      }
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.email, 'test_github_dev@github.com');
  });

  await t.test('5. Re-authenticating existing Google user succeeds without conflict', async () => {
    const res = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/social',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      provider: 'google',
      email: 'test_google_dev@gmail.com',
      name: 'Google Dev Tester Updated',
      username: 'google_tester'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.email, 'test_google_dev@gmail.com');
  });
});

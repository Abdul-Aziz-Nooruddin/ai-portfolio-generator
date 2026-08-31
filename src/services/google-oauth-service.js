/**
 * Google OAuth 2.0 & Identity Verification Service
 * Handles Google ID Token verification, OAuth Code Exchange with Account Chooser, and Account Verification.
 */

const https = require('https');

class GoogleOAuthService {
  constructor(clientId = process.env.GOOGLE_CLIENT_ID, clientSecret = process.env.GOOGLE_CLIENT_SECRET) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Generates Google OAuth 2.0 Authorization URL with 'select_account' prompt to force device account chooser
   */
  getAuthorizationUrl(redirectUri, state = 'google_oauth') {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      client_id: this.clientId || '',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
      prompt: 'select_account', // Forces Google to display the device account chooser screen
      access_type: 'offline',
      include_granted_scopes: 'true',
      state
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }

  /**
   * Exchange OAuth 2.0 Authorization Code for Google ID Token & Access Token
   */
  async exchangeCodeForTokens(code, redirectUri) {
    if (!code) throw new Error('Authorization code is required');

    return new Promise((resolve, reject) => {
      const postData = new URLSearchParams({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }).toString();

      const options = {
        hostname: 'oauth2.googleapis.com',
        port: 443,
        path: '/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.error) {
              return reject(new Error(data.error_description || data.error));
            }
            resolve(data);
          } catch (e) {
            reject(new Error('Failed to parse token exchange response'));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Verify Google ID Token (from Google Identity Services SDK, One-Tap, or Token Exchange)
   * @param {string} idToken - The JWT credential token returned by Google
   * @returns {Promise<Object>} The verified payload (email, name, picture, sub, email_verified)
   */
  async verifyIdToken(idToken) {
    if (!idToken || typeof idToken !== 'string') {
      throw new Error('Google ID Token is missing or invalid.');
    }

    return new Promise((resolve, reject) => {
      const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
      
      https.get(url, (res) => {
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(rawData);
            if (data.error || data.error_description) {
              return reject(new Error(data.error_description || data.error || 'Google Token verification failed'));
            }

            // Verify audience if GOOGLE_CLIENT_ID is configured
            if (this.clientId && this.clientId !== 'YOUR_GOOGLE_CLIENT_ID_HERE' && data.aud !== this.clientId) {
              return reject(new Error('Token audience mismatch: Token was not issued for this client.'));
            }

            // Ensure email is verified by Google
            const isEmailVerified = data.email_verified === 'true' || data.email_verified === true;

            resolve({
              googleId: data.sub,
              email: (data.email || '').toLowerCase().trim(),
              emailVerified: isEmailVerified,
              name: data.name || data.given_name || data.email?.split('@')[0] || 'Google User',
              picture: data.picture || null,
              locale: data.locale || 'en'
            });
          } catch (err) {
            reject(new Error('Failed to parse Google verification response: ' + err.message));
          }
        });
      }).on('error', (err) => {
        reject(new Error('Network error verifying Google ID Token: ' + err.message));
      });
    });
  }
}

module.exports = { GoogleOAuthService };

/**
 * Vercel Serverless Function Entrypoint
 * Bridges incoming Vercel HTTP requests to Express.js app
 */

const app = require('../src/index.js');

module.exports = app;

/**
 * GitHub to AI Portfolio Generation Pipeline Orchestrator
 * Connects GitHub Ingestion -> Normalization -> Evidence-Grounded AI Synthesis ->
 * Design Intelligence Studio -> 22D Fingerprint -> Diversity Governor ->
 * Project Presentation Engine -> Site Generation & Preview.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { GitHubParser } = require('./github/github-parser');
const { GitHubClient } = require('./github/github-client');
const { GitHubNormalizer } = require('./github/github-normalizer');
const { GitHubProfileSynthesizer } = require('./github-profile-synthesizer');
const { DesignIntelligenceStudio } = require('../design-intelligence');
const { SiteGenerator } = require('./site-generator');

class GitHubGenerationPipeline {
  constructor(aiService, siteGenerator = null, options = {}) {
    this.aiService = aiService;
    this.githubClient = new GitHubClient();
    this.synthesizer = new GitHubProfileSynthesizer(aiService);
    this.studio = new DesignIntelligenceStudio(options);
    this.siteGenerator = siteGenerator || new SiteGenerator();
    this.jobs = new Map(); // jobId -> { status, progress, stage, result, error }
  }

  /**
   * Generates a complete portfolio directly from a GitHub profile URL or username
   * @param {string} input - GitHub URL, @handle, or username
   * @param {Object} [options={}] - Mode or layout overrides
   * @returns {Promise<Object>} Generation result with live siteId and preview URL
   */
  async generateFromGitHub(input, options = {}) {
    const jobId = `github-gen-${crypto.randomUUID().slice(0, 8)}`;
    this.updateJob(jobId, 'queued', 'Queued for processing', 5);

    // 1. Parse and Validate GitHub Input
    const parseResult = GitHubParser.parse(input);
    if (!parseResult.valid) {
      this.updateJob(jobId, 'failed', parseResult.error, 0, parseResult.error);
      throw new Error(parseResult.error);
    }
    const username = parseResult.username;

    // 2. Fetch Complete Public GitHub Data
    this.updateJob(jobId, 'fetching-github', `Connecting to GitHub API for @${username}`, 15);
    const rawData = await this.githubClient.fetchCompleteProfile(username, (stage, msg) => {
      this.updateJob(jobId, stage, msg, 30);
    });

    // 3. Normalize Evidence Data Model
    this.updateJob(jobId, 'analyzing-repositories', `Ranking repositories and analyzing language distribution`, 45);
    const normalized = GitHubNormalizer.normalize(rawData);

    // 4. Evidence-Grounded AI Synthesis
    this.updateJob(jobId, 'synthesizing-content', `Synthesizing professional narrative and project case studies`, 65);
    const synthesizedProfile = await this.synthesizer.synthesize(normalized);

    // 5. Design Intelligence Studio & 22-Dimension Diversity Governor
    this.updateJob(jobId, 'selecting-design', `Synthesizing 22-Dimension Design Fingerprint & checking Diversity Governor`, 80);
    const studioResult = await this.studio.generatePortfolio(synthesizedProfile, {
      mode: options.mode || 'auto-cycle',
      layout: options.layout || 'auto-cycle',
      projectPresentation: options.projectPresentation || 'auto-cycle'
    });

    // 6. Generate and Save Site HTML/CSS/JS
    this.updateJob(jobId, 'generating-site', `Rendering bespoke WebGL 3D, typography, and responsive styles`, 92);
    const siteId = `web-${crypto.randomUUID()}`;
    const siteDir = path.join(process.cwd(), 'public', 'sites', siteId);
    fs.mkdirSync(siteDir, { recursive: true });

    // Inject preview watermark overlay
    const finalHtml = this.siteGenerator.injectPreviewWatermark(studioResult.html, false);
    fs.writeFileSync(path.join(siteDir, 'index.html'), finalHtml, 'utf8');

    const previewUrl = `/p/${siteId}`;

    const result = {
      success: true,
      jobId,
      siteId,
      previewUrl,
      username,
      profileData: synthesizedProfile,
      designDNA: studioResult.designDNA,
      uniqueness: studioResult.uniqueness,
      visualNovelty: studioResult.visualNovelty,
      candidateRankings: studioResult.candidateRankings
    };

    this.updateJob(jobId, 'completed', 'Your portfolio is ready!', 100, null, result);
    return result;
  }

  /**
   * Parses and synthesizes a GitHub profile without immediately rendering a website,
   * for users who want to tweak in the Web Builder first.
   */
  async parseForWebBuilder(input) {
    const parseResult = GitHubParser.parse(input);
    if (!parseResult.valid) {
      throw new Error(parseResult.error);
    }
    const username = parseResult.username;
    const rawData = await this.githubClient.fetchCompleteProfile(username);
    const normalized = GitHubNormalizer.normalize(rawData);
    const synthesizedProfile = await this.synthesizer.synthesize(normalized);
    return {
      success: true,
      username,
      data: synthesizedProfile,
      normalized
    };
  }

  updateJob(jobId, stage, message, progress = 0, error = null, result = null) {
    this.jobs.set(jobId, {
      jobId,
      stage,
      message,
      progress,
      error,
      result,
      updatedAt: Date.now()
    });
  }

  getJob(jobId) {
    return this.jobs.get(jobId) || null;
  }
}

module.exports = { GitHubGenerationPipeline };

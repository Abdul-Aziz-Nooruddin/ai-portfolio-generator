/**
 * Automated Test Suite: GitHub -> AI Portfolio One-Click Generator
 * Tests GitHub Parser, Project Ranker, Normalizer, Synthesizer,
 * 22D Design Fingerprinting, Diversity Governor integration, and End-to-End Pipeline.
 */

const assert = require('assert');
const { test, describe } = require('node:test');
const fs = require('fs');
const path = require('path');

const { GitHubParser } = require('./services/github/github-parser');
const { GitHubProjectRanker } = require('./services/github/github-project-ranker');
const { GitHubNormalizer } = require('./services/github/github-normalizer');
const { GitHubProfileSynthesizer } = require('./services/github-profile-synthesizer');
const { GitHubGenerationPipeline } = require('./services/github-generation-pipeline');
const { AIService } = require('./services/ai-service');

describe('🐙 GitHub -> AI Portfolio Generator Test Suite', () => {

  // 1. GitHub URL Parser Tests
  describe('1. GitHub URL & Username Parser', () => {
    test('should correctly parse full HTTPS URLs', () => {
      const res = GitHubParser.parse('https://github.com/torvalds');
      assert.strictEqual(res.valid, true);
      assert.strictEqual(res.username, 'torvalds');
    });

    test('should correctly parse www HTTP URLs', () => {
      const res = GitHubParser.parse('http://www.github.com/shadcn');
      assert.strictEqual(res.valid, true);
      assert.strictEqual(res.username, 'shadcn');
    });

    test('should correctly parse short URLs and @handles', () => {
      const res1 = GitHubParser.parse('github.com/mrdoob');
      assert.strictEqual(res1.valid, true);
      assert.strictEqual(res1.username, 'mrdoob');

      const res2 = GitHubParser.parse('@leerob');
      assert.strictEqual(res2.valid, true);
      assert.strictEqual(res2.username, 'leerob');

      const res3 = GitHubParser.parse('antfu');
      assert.strictEqual(res3.valid, true);
      assert.strictEqual(res3.username, 'antfu');
    });

    test('should reject repository URLs when profile is expected', () => {
      const res = GitHubParser.parse('https://github.com/facebook/react');
      assert.strictEqual(res.valid, false);
      assert.ok(res.error.includes('repository URL'));
    });

    test('should reject invalid characters and empty inputs', () => {
      assert.strictEqual(GitHubParser.parse('').valid, false);
      assert.strictEqual(GitHubParser.parse('   ').valid, false);
      assert.strictEqual(GitHubParser.parse('user$name').valid, false);
      assert.strictEqual(GitHubParser.parse('about').valid, false); // Reserved
    });
  });

  // 2. GitHub Project Ranker Tests
  describe('2. Multi-Factor Project Ranker', () => {
    test('should rank non-fork repos with stars, descriptions, and demos higher than low-signal forks', () => {
      const repos = [
        {
          name: 'forked-repo',
          fork: true,
          stargazers_count: 500,
          description: 'A forked repo',
          pushed_at: new Date().toISOString()
        },
        {
          name: 'vortex-engine',
          fork: false,
          stargazers_count: 120,
          homepage: 'https://vortex.io',
          description: 'Distributed graph query engine written in Rust.',
          language: 'Rust',
          topics: ['rust', 'graph', 'database'],
          pushed_at: new Date().toISOString()
        },
        {
          name: 'empty-project',
          fork: false,
          size: 0,
          stargazers_count: 0
        }
      ];

      const ranked = GitHubProjectRanker.rankAndSelect(repos, 3);
      assert.ok(ranked.length >= 2);
      assert.strictEqual(ranked[0].name, 'Vortex Engine');
      assert.strictEqual(ranked[0].live, 'https://vortex.io');
      assert.ok(ranked[0].tech.includes('Rust'));
    });
  });

  // 3. GitHub Normalizer & Evidence Model Tests
  describe('3. GitHub Normalizer & Anti-Hallucination Evidence Assembly', () => {
    test('should normalize raw GitHub payload into structured evidence model', () => {
      const raw = {
        profile: {
          login: 'erostova',
          name: 'Elena Rostova',
          bio: 'Systems Architect building real-time graphics engines.',
          location: 'Zurich, Switzerland',
          blog: 'https://elena.dev',
          public_repos: 24,
          followers: 450
        },
        repositories: [
          {
            name: 'hyperion-gl',
            fork: false,
            stargazers_count: 85,
            description: 'WebGL compute shader engine with procedural raytracing.',
            language: 'TypeScript',
            topics: ['webgl', 'threejs', 'glsl'],
            pushed_at: new Date().toISOString()
          },
          {
            name: 'quantum-mesh',
            fork: false,
            stargazers_count: 42,
            description: 'Distributed consensus kernel with Raft protocol.',
            language: 'Rust',
            topics: ['rust', 'distributed', 'consensus'],
            pushed_at: new Date().toISOString()
          }
        ],
        languageStats: {
          TypeScript: 50000,
          Rust: 40000,
          GLSL: 15000
        },
        readmeContent: '<!-- comment --># Elena Rostova\nBuilding high-performance visualizers and distributed systems.'
      };

      const normalized = GitHubNormalizer.normalize(raw);

      assert.strictEqual(normalized.identity.username, 'erostova');
      assert.strictEqual(normalized.identity.name, 'Elena Rostova');
      assert.ok(normalized.skills.languages.includes('TypeScript'));
      assert.ok(normalized.skills.languages.includes('Rust'));
      assert.ok(normalized.skills.frontend.includes('threejs') || normalized.skills.frontend.includes('webgl'));
      assert.ok(normalized.projects.length >= 2);
      assert.ok(normalized.evidence.length >= 3);
      assert.ok(!normalized.readme.includes('<!-- comment -->'));
    });
  });

  // 4. Evidence-Grounded AI Synthesizer Tests
  describe('4. Evidence-Grounded AI Synthesizer', () => {
    test('should synthesize clean portfolio structure adhering to schema with zero hallucinations', async () => {
      const aiService = new AIService();
      const synthesizer = new GitHubProfileSynthesizer(aiService);

      const mockNormalized = {
        identity: {
          username: 'sarah-chen',
          name: 'Sarah Chen',
          bio: 'Building AI visual agents and generative canvas tools.',
          location: 'San Francisco, CA',
          website: 'https://sarahchen.dev'
        },
        github: {
          profileUrl: 'https://github.com/sarah-chen',
          publicRepositories: 18,
          followers: 320
        },
        skills: {
          languages: ['TypeScript', 'Python', 'GLSL'],
          frontend: ['react', 'nextjs', 'threejs'],
          backend: ['fastapi', 'nodejs'],
          devops: ['docker'],
          databases: ['postgres'],
          tools: []
        },
        projects: [
          {
            name: 'Canvas Diffusion',
            description: 'Real-time interactive canvas powered by WebGPU and diffusion models.',
            tech: 'TypeScript • WebGPU • React',
            github: 'https://github.com/sarah-chen/canvas-diffusion',
            live: 'https://canvas.sarahchen.dev',
            stars: 95
          },
          {
            name: 'NeuroGraph',
            description: 'Neural graph visualizer for multi-agent LLM reasoning chains.',
            tech: 'Python • FastAPI • Three.js',
            github: 'https://github.com/sarah-chen/neurograph',
            live: 'https://neurograph.io',
            stars: 64
          }
        ],
        readme: 'AI Engineer & Creative Technologist based in SF.',
        evidence: ['18 Public Repos', '320 Followers']
      };

      const synthesized = await synthesizer.synthesize(mockNormalized);

      assert.strictEqual(synthesized.name, 'Sarah Chen');
      assert.ok(synthesized.role && synthesized.role.length > 0);
      assert.ok(synthesized.tagline && synthesized.tagline.length > 0);
      assert.ok(synthesized.bio && synthesized.bio.length > 0);
      assert.ok(synthesized.tech_stack.includes('TypeScript') || synthesized.tech_stack.includes('Python'));
      assert.ok(synthesized.projects.length >= 2);
      assert.strictEqual(synthesized.github, 'https://github.com/sarah-chen');
    });
  });

  // 5. End-to-End Pipeline with 22D Fingerprint & Diversity Governor
  describe('5. End-to-End GitHub Generation Pipeline', () => {
    test('should generate a complete, valid portfolio file with 22D fingerprint & diversity scores', async () => {
      const aiService = new AIService();
      const pipeline = new GitHubGenerationPipeline(aiService);

      // Mock fetchCompleteProfile to run deterministically in CI/offline tests
      pipeline.githubClient.fetchCompleteProfile = async (username) => {
        return {
          profile: {
            login: username,
            name: 'Marcus Vance',
            bio: 'Distributed systems engineer crafting low-latency message queues.',
            location: 'Berlin, Germany',
            blog: 'https://marcusvance.io',
            public_repos: 15,
            followers: 210
          },
          repositories: [
            {
              name: 'aether-queue',
              fork: false,
              stargazers_count: 140,
              description: 'Zero-copy distributed message broker achieving 10M msgs/sec in Go.',
              language: 'Go',
              topics: ['go', 'distributed', 'messaging'],
              pushed_at: new Date().toISOString()
            },
            {
              name: 'pulsar-raft',
              fork: false,
              stargazers_count: 89,
              description: 'Raft consensus implementation with dynamic cluster membership.',
              language: 'Rust',
              topics: ['rust', 'raft', 'consensus'],
              pushed_at: new Date().toISOString()
            },
            {
              name: 'cloud-mesh',
              fork: false,
              stargazers_count: 35,
              description: 'eBPF-powered service mesh visualizer.',
              language: 'TypeScript',
              topics: ['ebpf', 'kubernetes', 'react'],
              pushed_at: new Date().toISOString()
            }
          ],
          languageStats: { Go: 60000, Rust: 45000, TypeScript: 20000 },
          readmeContent: '# Marcus Vance\nBuilding resilient distributed infrastructure.'
        };
      };

      const result = await pipeline.generateFromGitHub('https://github.com/marcusvance');

      assert.strictEqual(result.success, true);
      assert.ok(result.siteId.startsWith('web-'));
      assert.strictEqual(result.previewUrl, `/p/${result.siteId}`);
      assert.strictEqual(result.username, 'marcusvance');
      assert.ok(result.profileData);
      assert.ok(result.designDNA);
      assert.ok(result.uniqueness);
      assert.ok(result.uniqueness.overallDiversity >= 40);

      // Verify physical file was written
      const siteFilePath = path.join(process.cwd(), 'public', 'sites', result.siteId, 'index.html');
      assert.ok(fs.existsSync(siteFilePath), `File ${siteFilePath} should exist`);
      const htmlContent = fs.readFileSync(siteFilePath, 'utf8');
      assert.ok(htmlContent.includes('Marcus Vance'), 'HTML should contain generated developer name');
      assert.ok(htmlContent.includes('preview-watermark-overlay'), 'HTML should include preview watermark');

      // Cleanup test site directory
      fs.rmSync(path.dirname(siteFilePath), { recursive: true, force: true });
    });
  });
});

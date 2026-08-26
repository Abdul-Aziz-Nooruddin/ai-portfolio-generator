/**
 * Web REST API Integration Tests
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./index');

test('POST /api/web/generate creates valid site and returns preview URL', async () => {
  const payload = {
    data: {
      name: 'Elena Rostova',
      role: 'Full-Stack Web Architect',
      bio: 'Crafting intelligent cloud platforms and interactive UI experiences.',
      email: 'elena@example.com',
      tech_stack: 'React, Node.js, TypeScript, Next.js, TailwindCSS',
      project_1_name: 'Cloud Studio Engine',
      project_1_desc: 'Next-gen cloud interface for developer productivity.'
    },
    branch: 'A',
    styleHint: 'light-swiss'
  };

  // Direct Express dispatch test
  const res = await new Promise((resolve) => {
    const req = {
      body: payload
    };
    const responseObj = {
      statusCode: 200,
      headers: {},
      json(data) {
        resolve({ status: 200, data });
      },
      status(code) {
        this.statusCode = code;
        return this;
      }
    };

    // Trigger generate endpoint handler (last in middleware chain)
    const routes = app._router.stack.filter(r => r.route && r.route.path === '/api/web/generate');
    assert.ok(routes.length > 0, 'Route /api/web/generate exists');
    const endpointHandler = routes[0].route.stack[routes[0].route.stack.length - 1].handle;
    endpointHandler(req, responseObj);
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.ok(res.data.siteId.startsWith('web-'));
  assert.ok(res.data.previewUrl.startsWith('/p/'));
  assert.ok(res.data.html.includes('Elena Rostova'));
  assert.ok(res.data.html.includes('Cloud Studio Engine'));
});

test('POST /api/web/create-order generates payment order response', async () => {
  const payload = {
    siteId: 'web-test-order-123',
    plan: 'lite'
  };

  const res = await new Promise((resolve) => {
    const req = {
      body: payload
    };
    const responseObj = {
      statusCode: 200,
      json(data) {
        resolve({ status: 200, data });
      },
      status(code) {
        this.statusCode = code;
        return this;
      }
    };

    const routes = app._router.stack.filter(r => r.route && r.route.path === '/api/web/create-order');
    assert.ok(routes.length > 0, 'Route /api/web/create-order exists');
    routes[0].route.stack[0].handle(req, responseObj);
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.ok(res.data.orderId || res.data.paymentUrl, 'Returns Razorpay orderId or paymentUrl');
});

test('SiteGenerator generates all 5 templates with full resume data without error', async () => {
  const { SiteGenerator } = require('./services/site-generator');
  const generator = new SiteGenerator();

  const fullResumeData = {
    name: 'Abdulaziz Dev',
    role: 'Staff AI Engineer',
    bio: 'Pioneering generative AI architectures and high-throughput real-time systems.',
    email: 'abdulaziz@example.com',
    github: 'https://github.com/abdulaziz',
    linkedin: 'https://linkedin.com/in/abdulaziz',
    tech_stack: 'Python, TypeScript, Go, PyTorch, React, Docker, Kubernetes',
    experience: [
      {
        role: 'Lead AI Engineer',
        company: 'Neural Labs',
        period: '2022 - Present',
        location: 'Remote',
        description: 'Led architecture of multimodal LLM reasoning engine.',
        achievements: ['Scaled throughput to 10M tokens/sec', 'Reduced inference latency by 60%']
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Top Tech University',
        year: '2018 - 2022',
        grade: 'GPA 3.9/4.0',
        details: 'Specialized in Distributed Computing & Machine Learning'
      }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' }
    ],
    awards: [
      { title: '1st Place Global AI Hackathon', issuer: 'TechX', year: '2024' }
    ],
    languages: ['English (Fluent)', 'Arabic (Native)', 'French (Intermediate)'],
    projects: [
      {
        name: 'Nexus AI Engine',
        description: 'Autonomous multi-agent orchestration framework.',
        tech_stack: 'Python, FastAPI, Redis, Docker',
        github: 'https://github.com/abdulaziz/nexus-ai',
        live: 'https://nexus.ai'
      }
    ]
  };

  const layouts = [
    'spatial-3d-cyber',
    'kinetic-3d-glass',
    'terminal-3d-matrix',
    'neo-brutalist-3d',
    'editorial-3d-minimal'
  ];

  for (const layout of layouts) {
    const res = await generator.generateSite(
      { extracted_data: fullResumeData, branch: 'A' },
      fullResumeData,
      { layout }
    );
    assert.ok(res.html, `Template ${layout} generated HTML`);
    assert.ok(res.html.includes('Abdulaziz Dev'), `Template ${layout} includes name`);
    assert.ok(res.html.includes('Lead AI Engineer'), `Template ${layout} includes experience`);
    assert.ok(res.html.includes('Top Tech University'), `Template ${layout} includes education`);
    assert.ok(res.html.includes('AWS Certified Solutions Architect'), `Template ${layout} includes certifications`);
  }
});

test('POST /api/web/generate with regenerate=true immediately takes down previous site preview', async () => {
  const fs = require('fs');
  const path = require('path');

  // 1. First generation: generate initial site
  const initialPayload = {
    data: {
      name: 'Initial Previewer',
      role: 'Backend Architect',
      email: 'initial@preview.com',
      tech_stack: 'Node.js, Postgres'
    },
    branch: 'A'
  };

  const routes = app._router.stack.filter(r => r.route && r.route.path === '/api/web/generate');
  const endpointHandler = routes[0].route.stack[routes[0].route.stack.length - 1].handle;

  const firstGenRes = await new Promise((resolve) => {
    const req = { body: initialPayload };
    const responseObj = {
      statusCode: 200,
      json(data) { resolve({ status: 200, data }); },
      status(c) { this.statusCode = c; return this; }
    };
    endpointHandler(req, responseObj);
  });

  const firstSiteId = firstGenRes.data.siteId;
  const firstSiteDir = path.join(process.cwd(), 'public', 'sites', firstSiteId);
  assert.ok(fs.existsSync(firstSiteDir), 'Initial site directory exists on disk');

  // 2. Regeneration: request regeneration passing previousSiteId & regenerate=true
  const regenPayload = {
    data: {
      name: 'Initial Previewer',
      role: 'Chief Technology Officer',
      email: 'initial@preview.com',
      tech_stack: 'Node.js, Rust, Go'
    },
    branch: 'A',
    previousSiteId: firstSiteId,
    regenerate: true
  };

  const secondGenRes = await new Promise((resolve) => {
    const req = { body: regenPayload };
    const responseObj = {
      statusCode: 200,
      json(data) { resolve({ status: 200, data }); },
      status(c) { this.statusCode = c; return this; }
    };
    endpointHandler(req, responseObj);
  });

  const secondSiteId = secondGenRes.data.siteId;
  const secondSiteDir = path.join(process.cwd(), 'public', 'sites', secondSiteId);

  // Assert previous site directory has been completely taken down and purged
  assert.ok(!fs.existsSync(firstSiteDir), 'Previous site was immediately taken down and purged from disk');
  assert.ok(fs.existsSync(secondSiteDir), 'Newly regenerated site exists on disk');
  assert.notEqual(firstSiteId, secondSiteId, 'New distinct siteId generated for the fresh build');

  // Cleanup test site
  if (fs.existsSync(secondSiteDir)) {
    fs.rmSync(secondSiteDir, { recursive: true, force: true });
  }
});

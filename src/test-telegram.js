/**
 * Telegram & Site Generation Pipeline Test
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ConversationEngine, STATES } = require('./conversation-engine');
const { SiteGenerator } = require('./services/site-generator');

test('SiteGenerator creates valid HTML/CSS/JS with mobile responsive styling', async () => {
  const generator = new SiteGenerator();

  const conversation = {
    id: 'test-conv-123',
    branch: 'A',
    extracted_data: {
      name: 'Alex Developer',
      role: 'Full Stack Engineer',
      bio: 'Building modern web applications and AI tools.',
      email: 'alex@example.com',
      github: 'https://github.com/alexdev',
      tech_stack: 'React, Node.js, TypeScript, PostgreSQL',
      project_1_name: 'AI Agent System',
      project_1_desc: 'Autonomous multi-agent platform for developers.',
      project_1_tech: 'Node.js, Express, Gemini API'
    }
  };

  const designBrief = {
    dials: { design_variance: 6, motion_intensity: 5, visual_density: 5 },
    color_palette: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F8FAFC',
      text_muted: '#94A3B8'
    },
    typography: {
      heading_font: 'Space Grotesk',
      body_font: 'Inter',
      scale_ratio: 1.25
    },
    component_selection: {
      hero: 'centered-text',
      projects: 'card-grid',
      about: 'timeline',
      contact: 'simple-form'
    }
  };

  const site = await generator.generateSite(conversation, conversation.extracted_data, designBrief);

  assert.ok(site.html.includes('Alex Developer'), 'HTML contains user name');
  assert.ok(site.html.includes('Full Stack Engineer'), 'HTML contains role');
  assert.ok(site.html.includes('AI Agent System'), 'HTML contains project name');
  assert.ok(site.css.includes(':root'), 'CSS contains root custom properties');
  assert.ok(site.css.includes('clamp('), 'CSS uses responsive fluid typography');
});

test('ConversationEngine saves generated site locally for instant preview', async () => {
  const mockAI = {
    generateDesignBrief: async () => ({
      dials: { design_variance: 5, motion_intensity: 5, visual_density: 5 },
      color_palette: { primary: '#6366F1', background: '#0F172A', text: '#FFFFFF', surface: '#1E293B', text_muted: '#94A3B8' },
      typography: { heading_font: 'Poppins', body_font: 'Inter', scale_ratio: 1.2 }
    })
  };

  const mockDb = {
    updateConversation: async () => {},
    createSite: async () => ({ id: 'mock-site' }),
    client: {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: { phone_number: '123456789' } })
          })
        })
      })
    }
  };

  let notifiedMessage = '';
  let notifiedOptions = null;

  const engine = new ConversationEngine(mockAI, mockDb);
  engine.setNotifier(async (recipient, msg, opts) => {
    notifiedMessage = msg;
    notifiedOptions = opts;
  });

  const testConv = {
    id: 'test-site-preview-001',
    user_id: '11111111-2222-3333-4444-555555555555',
    branch: 'A',
    extracted_data: {
      name: 'Jordan Fresher',
      role: 'Frontend Developer',
      bio: 'Creating delightful user interfaces.',
      email: 'jordan@test.com',
      tech_stack: 'Vue, Tailwind, JavaScript'
    }
  };

  await engine.triggerSiteGeneration(testConv);

  const localIndexPath = path.join(process.cwd(), 'public', 'sites', testConv.id, 'index.html');
  assert.ok(fs.existsSync(localIndexPath), 'Local site index.html was created');

  const content = fs.readFileSync(localIndexPath, 'utf-8');
  assert.ok(content.includes('Jordan Fresher'), 'Saved file contains generated content');
  assert.ok(notifiedMessage.includes('Portfolio Preview is Live') || notifiedMessage.includes('Live'), 'Notifier was triggered');
  assert.ok(notifiedOptions && notifiedOptions.liveUrl.includes(testConv.id), 'Notifier received live URL');

  // Clean up test folder
  fs.rmSync(path.join(process.cwd(), 'public', 'sites', testConv.id), { recursive: true, force: true });
});

test('ConversationEngine cascade skips sub-questions when parent project is skipped', async () => {
  let savedData = null;
  const mockDb = {
    updateConversation: async (id, updates) => {
      if (updates.extracted_data) savedData = updates.extracted_data;
    }
  };

  const engine = new ConversationEngine({}, mockDb);

  const questions = require('./questions/branch-a');
  const extractedData = {};
  for (const q of questions) {
    if (q.key === 'project_2_name') break;
    extractedData[q.key] = 'answered';
  }

  const conversation = {
    id: 'test-cascade-conv',
    branch: 'A',
    extracted_data: extractedData
  };

  // Skip project_2_name
  const result = await engine.handleCollectingFields(conversation, 'skip');

  assert.ok(savedData['project_2_desc'] === '', 'project_2_desc was automatically skipped');
  assert.ok(savedData['project_2_tech'] === '', 'project_2_tech was automatically skipped');
  assert.ok(savedData['project_3_name'] === '', 'project_3_name was automatically skipped');
  assert.ok(result.message.includes('Work Experience') || result.message.includes('experience'), 'Next asked question jumped straight past project 2 & 3 to experience');
});

test('ConversationEngine enforces 1 generation per week & 1 regeneration limit with admin exemption', async () => {
  let rateLimitCalls = 0;
  const mockDb = {
    checkWeeklyLimit: async (userId, maxCount) => {
      rateLimitCalls++;
      return false; // simulate weekly limit reached
    },
    updateConversation: async () => {}
  };

  const engine = new ConversationEngine({}, mockDb);

  // 1. Admin exemption check
  assert.equal(engine.isAdmin('999', 'abdulazizpro1'), true, 'Recognizes @abdulazizpro1 as admin');
  assert.equal(engine.isAdmin('999', '@abdulazizpro1'), true, 'Recognizes with @ symbol');
  assert.equal(engine.isAdmin('7535327243', 'someuser'), true, 'Recognizes admin ID');
  assert.equal(engine.isAdmin('111222333', 'regular_user'), false, 'Regular user is not admin');

  // 2. Regular user weekly limit test
  const regularConv = {
    id: 'reg-conv-1',
    user_id: 'user-123',
    phone_number: '111222333',
    username: 'regular_user',
    branch: 'A',
    extracted_data: { name: 'Regular User' }
  };

  const blockedRes = await engine.handleConfirmation(regularConv, 'YES');
  assert.ok(blockedRes.message.includes('Weekly Free Preview Limit Reached'), 'Blocks regular user when weekly limit reached');

  // 3. Regular user regeneration limit test
  regularConv.extracted_data._regens_used = 1;
  const regenBlockedRes = await engine.handleEditRequest(regularConv, 'EDIT name New Name');
  assert.ok(regenBlockedRes.message.includes('Regeneration Limit Reached'), 'Blocks regular user after 1 free regeneration');

  // 4. Admin bypass test
  const adminConv = {
    id: 'admin-conv-1',
    user_id: 'admin-123',
    phone_number: '7535327243',
    username: 'abdulazizpro1',
    branch: 'A',
    extracted_data: { name: 'Abdulaziz Admin', _regens_used: 5 }
  };

  engine.triggerSiteGeneration = () => {}; // mock trigger
  const adminRes = await engine.handleConfirmation(adminConv, 'YES');
  assert.ok(adminRes.message.includes("building your portfolio now"), 'Admin bypasses daily rate limit');

  const adminRegenRes = await engine.handleEditRequest(adminConv, 'EDIT name Brand New Name');
  assert.ok(adminRegenRes.message.includes('Updated **name** to: "Brand New Name"'), 'Admin bypasses regeneration limit');
});

test('AIService parseJsonResponse handles markdown fences and dirty formatting', () => {
  const { AIService } = require('./services/ai-service');
  const ai = new AIService('dummy-key');

  const textWithFence = '```json\n{"branch": "A", "extracted_data": {"name": "Test User"}}\n```';
  const res1 = ai.parseJsonResponse(textWithFence);
  assert.equal(res1.branch, 'A');
  assert.equal(res1.extracted_data.name, 'Test User');

  const textWithExtraText = 'Here is the JSON you requested:\n```\n{"branch": "B", "extracted_data": {"name": "Freelancer Bob",}}\n```\nHope this helps!';
  const res2 = ai.parseJsonResponse(textWithExtraText);
  assert.equal(res2.branch, 'B');
  assert.equal(res2.extracted_data.name, 'Freelancer Bob');
});



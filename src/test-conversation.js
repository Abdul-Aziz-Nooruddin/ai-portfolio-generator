require('dotenv').config();
const { AIService } = require('./services/ai-service');

async function test() {
  const ai = new AIService(process.env.GEMINI_API_KEY);

  console.log('=== Key Info ===');
  console.log('Key starts with:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
  console.log('Is AQ auth key:', ai.isAuthKey);
  console.log('');

  // Test 1: Branch classification
  console.log('=== Test 1: Classify Branch ===');
  const branch = await ai.classifyBranch('I am a full stack developer who builds web apps');
  console.log('Branch:', branch);

  // Test 2: Design brief generation
  console.log('\n=== Test 2: Design Brief ===');
  const brief = await ai.generateDesignBrief({
    name: 'Rahul Sharma',
    role: 'Full Stack Developer',
    bio: 'I build scalable web apps with React and Node.js',
    tech_stack: 'React, Node.js, MongoDB, Tailwind'
  }, 'A');
  console.log('Design Brief:', JSON.stringify(brief, null, 2));

  // Test 3: Health check
  console.log('\n=== Test 3: Health Check ===');
  const healthy = await ai.healthCheck();
  console.log('Gemini Healthy:', healthy);
}

test().catch(console.error);

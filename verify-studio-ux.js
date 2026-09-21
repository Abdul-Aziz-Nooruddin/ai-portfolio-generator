const http = require('http');

http.get('http://localhost:5050/studio', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    const checks = [
      ['Workflow Stepper', data.includes('studio-workflow-stepper')],
      ['Stepper: CONTENT', data.includes('CONTENT')],
      ['Stepper: WORLD', data.includes('WORLD')],
      ['Stepper: GENERATE', data.includes('GENERATE')],
      ['Stepper: EDIT', data.includes('EDIT')],
      ['Stepper: PUBLISH', data.includes('PUBLISH')],
      ['Step 1 Heading', data.includes('1. Add your information')],
      ['Step 2 Heading', data.includes('2. Choose your visual world')],
      ['Curated World: Architectural', data.includes('Architectural') && data.includes('"Premium, structured and editorial."')],
      ['Curated World: Biophilic', data.includes('Biophilic') && data.includes('"Nature, technology and organic movement."')],
      ['Curated World: Laboratory', data.includes('Laboratory') && data.includes('"Research, AI and engineering."')],
      ['Curated World: Workspace', data.includes('Workspace') && data.includes('"Focused, technical and code-first."')],
      ['Curated World: Cyber Infrastructure', data.includes('Cyber Infrastructure') && data.includes('"High-scale, telemetry and systems."')],
      ['Curated World: Cosmic', data.includes('Cosmic') && data.includes('"Expansive, experimental and futuristic."')],
      ['Explore all worlds toggle', data.includes('Explore all 36+ worlds')],
      ['Confirmation Summary box', data.includes('confirmation-summary-box')],
      ['✓ GitHub connected', data.includes('GitHub connected')],
      ['✓ Projects found', data.includes('Projects found')],
      ['✓ Skills detected', data.includes('Skills detected')],
      ['✓ Experience detected', data.includes('Experience detected')],
      ['✓ Resume analyzed', data.includes('Resume analyzed')],
      ['Ready text', data.includes('Your portfolio is ready to generate.')],
      ['Primary CTA button', data.includes('Generate My Portfolio &rarr;')],
      ['Advanced Editor: Content', data.includes('subtabBtnContent') && data.includes('Hero &amp; Identity')],
      ['Advanced Editor: Visual World', data.includes('subtabBtnWorld') && data.includes('Typography Engine')],
      ['Advanced Editor: AI Assistant', data.includes('subtabBtnAi')],
      ['Right Col: AI Assistant', data.includes('AI ASSISTANT') && data.includes('Role &amp; Positioning')],
      ['No Universe Resonance', !data.includes('Universe Resonance')],
      ['No Target Recruiter Persona', !data.includes('Target Recruiter Persona')],
      ['No Narrative Polish', !data.includes('Narrative Polish')],
      ['No STEP 03 Jargon', !data.includes('STEP 03 // CHOOSE MY WORLD')]
    ];

    let allPassed = true;
    for (const [name, passed] of checks) {
      console.log(`${passed ? '✅' : '❌'} ${name}`);
      if (!passed) allPassed = false;
    }

    if (!allPassed) {
      console.error('Some checks failed!');
      process.exit(1);
    } else {
      console.log('\n🎉 ALL 31 STUDIO UX REQUIREMENTS VALIDATED SUCCESSFULLY!');
    }
  });
}).on('error', (err) => {
  console.error('Request failed:', err);
  process.exit(1);
});

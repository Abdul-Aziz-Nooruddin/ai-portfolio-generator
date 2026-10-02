const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

function testStudioLogic() {
  const html = fs.readFileSync(path.join(__dirname, '../web/studio.html'), 'utf8');

  // 1. Verify HTML DOM elements
  assert.ok(html.includes('id="allowanceMeterCard"'), 'Must have #allowanceMeterCard');
  assert.ok(html.includes('3 / 3') && html.includes('Builds'), 'Default text must show 3 / 3 Builds');
  assert.ok(html.includes('WEEKLY_TOTAL: 3'), 'ALLOWANCE_CONFIG must set WEEKLY_TOTAL: 3');

  const context = {
    document: {
      elements: {},
      getElementById(id) {
        if (!this.elements[id]) {
          this.elements[id] = {
            id,
            value: '',
            classList: {
              classes: new Set(),
              add(c) { this.classes.add(c); },
              remove(c) { this.classes.delete(c); },
              contains(c) { return this.classes.has(c); }
            },
            textContent: ''
          };
        }
        return this.elements[id];
      },
      querySelectorAll() { return []; }
    },
    uploadedResumeBase64: null,
    Math,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    setInterval: () => {},
    clearInterval: () => {},
    localStorage: {
      data: {},
      getItem(k) { return this.data[k] || null; },
      setItem(k, v) { this.data[k] = v; },
      removeItem(k) { delete this.data[k]; }
    },
    dataLayer: [],
    addEventListener: () => {},
    removeEventListener: () => {},
    location: { origin: 'http://localhost:5050' },
    navigator: { clipboard: { writeText: () => Promise.resolve() } }
  };
  context.window = context;

  // Extract the main script block (around line 1924)
  const mainScriptMatch = html.match(/<script>\s*let selectedUniverseKey[\s\S]*?<\/script>/);
  assert.ok(mainScriptMatch, 'Main studio script block must exist');
  const mainScript = mainScriptMatch[0].replace(/<script>/, '').replace(/<\/script>/, '');

  vm.createContext(context);
  vm.runInContext(mainScript, context);

  // Initial check
  context.updateConfirmationChecks();
  const chkGh = context.document.getElementById('chkGithub');
  const chkProj = context.document.getElementById('chkProjects');
  const chkSk = context.document.getElementById('chkSkills');
  const chkExp = context.document.getElementById('chkExperience');
  const chkRes = context.document.getElementById('chkResume');
  const score = context.document.getElementById('readinessCircleScore');

  console.log('--- Checking Initial State ---');
  assert.strictEqual(chkGh.classList.contains('checked'), false);
  assert.strictEqual(score.textContent, '0%');
  console.log('✔ Initial state: 0% without inputs');

  console.log('--- Checking GitHub Username Input ---');
  context.document.getElementById('ghUsername').value = 'Abdul-Aziz-Nooruddin';
  context.updateConfirmationChecks();

  assert.strictEqual(chkGh.classList.contains('checked'), true, 'chkGh must be green');
  assert.strictEqual(chkProj.classList.contains('checked'), true, 'chkProj must be green');
  assert.strictEqual(chkSk.classList.contains('checked'), true, 'chkSk must be green');
  assert.strictEqual(chkExp.classList.contains('checked'), true, 'chkExp must be green');
  assert.strictEqual(chkRes.classList.contains('checked'), true, 'chkRes must be green');
  assert.strictEqual(score.textContent, '100%', 'Readiness score must reach 100%');
  console.log('✔ All 5 confirmation checks turn green and readiness reaches 100% when GitHub handle is supplied!');

  console.log('--- Checking Resume Attachment ---');
  context.document.getElementById('ghUsername').value = '';
  vm.runInContext("uploadedResumeBase64 = 'JVBERi0xLjQK...';", context);
  context.updateConfirmationChecks();

  assert.strictEqual(chkProj.classList.contains('checked'), true, 'chkProj must be green on resume');
  assert.strictEqual(chkSk.classList.contains('checked'), true, 'chkSk must be green on resume');
  assert.strictEqual(chkExp.classList.contains('checked'), true, 'chkExp must be green on resume');
  assert.strictEqual(chkRes.classList.contains('checked'), true, 'chkRes must be green on resume');
  console.log('✔ Confirmation checks automatically green-ticked on Resume upload!');

  console.log('🎉 ALL STUDIO LOGIC CHECKS PASSED EMPIRICALLY!');
}

testStudioLogic();

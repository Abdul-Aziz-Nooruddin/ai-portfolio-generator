const test = require('node:test');
const assert = require('node:assert');
const { TemplateRegistry } = require('./templates/template-registry');

test('🌟 Comprehensive Multi-Section Verification Across All Visual Templates', async (t) => {
  const templates = TemplateRegistry.getAllTemplates();
  assert.ok(templates.length >= 6, 'Should have registered templates');

  const fullCandidateData = {
    name: 'Gulam Mahmood Hamza',
    role: 'CSE-AIML Student & Software Developer',
    bio: 'Passionate software developer specializing in AI, Machine Learning, and Full-Stack Engineering.',
    tagline: 'Engineering next-gen AI systems.',
    email: 'gulam.hamza@example.com',
    phone: '+91 9876543210',
    location: 'Hyderabad, India',
    github: 'https://github.com/gulamhamza',
    linkedin: 'https://linkedin.com/in/gulamhamza',
    twitter: 'https://x.com/gulamhamza',
    skills: ['Python', 'Machine Learning', 'Data Science', 'PyTorch', 'Django', 'React', 'Git', 'Cloud'],
    projects: [
      {
        name: 'Student Profile Manager',
        desc: 'Automated Python desktop application using Tkinter and SQL.',
        tech: 'Python, Tkinter, SQLite',
        category: 'Systems',
        live: 'https://example.com/demo1',
        github: 'https://github.com/gulamhamza/proj1'
      },
      {
        name: 'Loan Approval Prediction',
        desc: 'End-to-end classification system deployed with Flask.',
        tech: 'Python, Scikit-learn, Flask',
        category: 'Machine Learning',
        live: 'https://example.com/demo2',
        github: 'https://github.com/gulamhamza/proj2'
      },
      {
        name: 'Forest Fire Prediction',
        desc: 'Deep learning wildfire prevention model with real-time alerting.',
        tech: 'Python, PyTorch, OpenCV',
        category: 'AI / CV',
        live: 'https://example.com/demo3',
        github: 'https://github.com/gulamhamza/proj3'
      }
    ],
    experience: [
      {
        role: 'AI / Software Engineering Intern',
        company: 'Innovate AI Labs',
        period: '2023 – 2024',
        desc: 'Trained and deployed transformer models and built high-performance REST APIs.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Engineering (B.E.) in CSE (AIML)',
        institution: 'Lords Institute of Engineering & Technology',
        period: '2021 – 2025',
        grade: 'Distinction'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Machine Learning Specialist',
        issuer: 'Amazon Web Services'
      },
      {
        name: 'Deep Learning Specialization',
        issuer: 'Coursera / DeepLearning.AI'
      }
    ]
  };

  for (const tpl of templates) {
    await t.test(`Template: ${tpl.name || tpl.id} renders all meaningful sections without omission`, () => {
      const result = TemplateRegistry.render(tpl.id, fullCandidateData);
      const html = typeof result === 'string' ? result : (result.html || '');

      // 1. Name & Role
      assert.ok(html.includes('Gulam Mahmood Hamza'), `Must render candidate name in ${tpl.id}`);
      assert.ok(html.includes('CSE-AIML Student & Software Developer') || html.includes('Software Developer'), `Must render role in ${tpl.id}`);

      // 2. All Projects
      assert.ok(html.includes('Student Profile Manager'), `Must render Project 1 in ${tpl.id}`);
      assert.ok(html.includes('Loan Approval Prediction'), `Must render Project 2 in ${tpl.id}`);
      assert.ok(html.includes('Forest Fire Prediction'), `Must render Project 3 in ${tpl.id}`);

      // 3. Technical Skills
      assert.ok(html.includes('Python') || html.includes('Machine Learning'), `Must render skills in ${tpl.id}`);

      // 4. Experience Timeline
      assert.ok(html.includes('Innovate AI Labs') || html.includes('AI / Software Engineering Intern'), `Must render Experience in ${tpl.id}`);

      // 5. Education Credentials
      assert.ok(html.includes('Lords Institute of Engineering & Technology') || html.includes('Bachelor of Engineering'), `Must render Education in ${tpl.id}`);

      // 6. Verified Certifications
      assert.ok(html.includes('AWS Certified Machine Learning Specialist') || html.includes('Deep Learning Specialization'), `Must render Certifications in ${tpl.id}`);

      // 7. Contact Details
      assert.ok(html.includes('gulam.hamza@example.com'), `Must render email in ${tpl.id}`);
    });
  }
});

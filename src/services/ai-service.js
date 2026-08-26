/**
 * AI Service - Google Gemini Integration
 * Supports BOTH old AIzaSy... keys AND new AQ.Ab... authorized keys
 * Falls back to direct REST API if SDK fails
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
let pdfParse = null;
try {
  const p = require('pdf-parse');
  pdfParse = typeof p === 'function' ? p : (p && typeof p.default === 'function' ? p.default : null);
} catch (e) {
  pdfParse = null;
}
const ACTIVE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest'
];

class AIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.isAuthKey = apiKey && apiKey.startsWith('AQ.');
    this.genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
    this.sdkAvailable = !!this.genAI;
  }

  async callGemini(prompt) {
    if (!this.apiKey || this.apiKey.includes('test') || this.apiKey === 'placeholder') {
      throw new Error('Gemini API key not configured.');
    }

    // Multi-model rotating fallback with ultra-fast priority
    for (const modelName of ACTIVE_MODELS) {
      if (this.sdkAvailable) {
        try {
          const model = this.genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 2048,
              responseMimeType: 'application/json'
            }
          });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          const parsed = this.parseJsonResponse(text);
          if (parsed && (parsed.extracted_data || parsed.branch || parsed.status || Object.keys(parsed).length > 0)) {
            return parsed;
          }
        } catch (sdkError) {
          console.warn(`[AI] Model ${modelName} fallback (${sdkError.message}), trying next...`);
        }
      }

      // REST fallback for this model
      try {
        const restResult = await this.callGeminiRest(prompt, modelName);
        if (restResult && (restResult.extracted_data || restResult.branch || restResult.status || Object.keys(restResult).length > 0)) {
          return restResult;
        }
      } catch (restError) {
        console.warn(`[AI] REST ${modelName} fallback: ${restError.message}`);
      }
    }

    throw new Error('All Gemini AI models currently busy or unreachable. Please try again in a moment!');
  }

  async callGeminiRest(prompt, modelName = 'gemini-3.5-flash-lite') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorSummary = errorText;
      try {
        const parsedErr = JSON.parse(errorText);
        errorSummary = parsedErr.error?.message || errorText;
      } catch (e) {}
      throw new Error(`Gemini API error (${response.status}): ${errorSummary}`);
    }

    const data = await response.json();
    if (data.error) throw new Error(`Gemini API error: ${data.error.message}`);

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return this.parseJsonResponse(text);
  }

  parseJsonResponse(text) {
    if (!text || typeof text !== 'string') return { raw: '' };
    let cleanText = text.trim();

    // 1. Remove markdown code fences if present
    const codeBlockMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch) {
      cleanText = codeBlockMatch[1].trim();
    } else {
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }
    }

    // 2. Standard JSON parse
    try {
      return JSON.parse(cleanText);
    } catch (e1) {
      // 3. Extract outermost { ... }
      const jsonObjectMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonObjectMatch) {
        try {
          const sanitized = jsonObjectMatch[0].replace(/,(\s*[}\]])/g, '$1');
          return JSON.parse(sanitized);
        } catch (e2) {
          // fall through
        }
      }
      console.warn('[AI] Failed to parse JSON, returning raw text:', cleanText.substring(0, 100));
      return { raw: cleanText };
    }
  }

  async classifyBranch(messageText) {
    const prompt = `You are a portfolio bot intake classifier. Read the user's message and classify them into one branch.

Branches:
A = Developer / Designer (codes, designs, builds software, UI/UX, 3D, animation)
B = Freelancer / Gig Worker (photographer, tutor, contractor, service provider, trainer, consultant)
C = Student / Fresher (in college, recent graduate, looking for first job)
D = General Professional (working professional, manager, non-tech role, executive)

User message: "${messageText}"

Respond ONLY with valid JSON:
{
  "branch": "A|B|C|D",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation"
}`;

    try {
      const result = await this.callGemini(prompt);
      return result.branch || null;
    } catch (error) {
      console.error('[AI] Branch classification failed:', error.message);
      return null;
    }
  }

  async extractField(question, userAnswer, currentData, branch) {
    const prompt = `You are extracting structured data for a portfolio website.

Branch: ${branch}
Question: "${question.text}"
Question key: "${question.key}"
User's answer: "${userAnswer}"

Current extracted data: ${JSON.stringify(currentData)}

Extract the answer into a clean, structured format. If the answer is vague or incomplete, note that.

Respond ONLY with valid JSON:
{
  "extracted_value": "the clean extracted value",
  "is_valid": true|false,
  "needs_clarification": true|false,
  "clarification_question": "question to ask if needs_clarification is true",
  "confidence": 0.0-1.0
}`;

    try {
      const result = await this.callGemini(prompt);
      return {
        extracted_value: result.extracted_value || userAnswer,
        is_valid: result.is_valid !== false,
        needs_clarification: result.needs_clarification === true,
        clarification_question: result.clarification_question || null,
        confidence: result.confidence || 0.5
      };
    } catch (error) {
      console.error('[AI] Field extraction failed:', error.message);
      return {
        extracted_value: userAnswer,
        is_valid: true,
        needs_clarification: false,
        confidence: 0.5
      };
    }
  }

  async generateDesignBrief(extractedData, branch) {
    try {
      return await this.generateAIDesignBrief(extractedData, branch);
    } catch (error) {
      return {
        creative_mode: 'auto-cycle',
        layout: 'auto-cycle'
      };
    }
  }

  async generateAIDesignBrief(extractedData, branch) {
    const prompt = `You are a portfolio design director. Generate a design brief based on user data.

User data: ${JSON.stringify(extractedData)}
Branch: ${branch}

Apply these rules:

1. TASTE-SKILL DIALS (1-10 scale):
   - DESIGN_VARIANCE: layout experimentation (1=centered/clean, 10=asymmetric/modern)
   - MOTION_INTENSITY: animation depth (1=hover only, 10=scroll/magnetic)
   - VISUAL_DENSITY: info per viewport (1=spacious, 10=dense)

2. IMPECCABLE ANTI-PATTERNS (strictly forbidden):
   - No Inter, Arial, or system-default fonts
   - No purple-to-blue gradients
   - No cards nested in cards
   - No pure black (#000) or pure gray
   - No gray text on colored backgrounds
   - No bounce/elastic easing
   - No rounded-square icon tiles above every heading

3. COLOR PALETTE:
   - Primary: choose based on user's vibe
   - Secondary: complementary
   - Accent: high-contrast highlight
   - Background: tinted (never pure white or pure black)

4. TYPOGRAPHY:
   - Heading font: distinctive, not overused
   - Body font: readable, pairs well with heading
   - Scale: intentional hierarchy

Respond ONLY with valid JSON:
{
  "dials": {
    "design_variance": 1-10,
    "motion_intensity": 1-10,
    "visual_density": 1-10
  },
  "color_palette": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "background": "#hex",
    "surface": "#hex",
    "text": "#hex",
    "text_muted": "#hex"
  },
  "typography": {
    "heading_font": "font name",
    "body_font": "font name",
    "scale_ratio": 1.25
  },
  "layout_notes": "brief description of layout approach",
  "animation_notes": "brief description of motion approach",
  "component_selection": {
    "hero": "component type",
    "projects": "component type",
    "about": "component type",
    "contact": "component type"
  }
}`;

    try {
      const result = await this.callGemini(prompt);
      return this.validateDesignBrief(result);
    } catch (error) {
      console.error('[AI] Design brief generation failed:', error.message);
      return this.getDefaultDesignBrief();
    }
  }

  validateDesignBrief(brief = {}) {
    const defaults = this.getDefaultDesignBrief();
    const cp = brief.color_palette || {};
    const typo = brief.typography || {};

    return {
      layout: brief.layout || defaults.layout,
      palette_name: brief.palette_name || defaults.palette_name,
      dials: {
        design_variance: brief.dials?.design_variance || defaults.dials.design_variance,
        motion_intensity: brief.dials?.motion_intensity || defaults.dials.motion_intensity,
        visual_density: brief.dials?.visual_density || defaults.dials.visual_density
      },
      color_palette: {
        theme: cp.theme || defaults.color_palette.theme,
        primary: cp.primary || defaults.color_palette.primary,
        secondary: cp.secondary || defaults.color_palette.secondary,
        accent: cp.accent || defaults.color_palette.accent,
        background: cp.background || defaults.color_palette.background,
        surface: cp.surface || defaults.color_palette.surface,
        surface_card: cp.surface_card || cp.surface || defaults.color_palette.surface_card,
        text: cp.text || defaults.color_palette.text,
        text_muted: cp.text_muted || defaults.color_palette.text_muted,
        border: cp.border || defaults.color_palette.border,
        glow: cp.glow || defaults.color_palette.glow,
        card_shadow: cp.card_shadow || defaults.color_palette.card_shadow,
        card_radius: cp.card_radius || defaults.color_palette.card_radius,
        card_border_width: cp.card_border_width || defaults.color_palette.card_border_width
      },
      typography: {
        heading_font: typo.heading_font || defaults.typography.heading_font,
        body_font: typo.body_font || defaults.typography.body_font,
        scale_ratio: typo.scale_ratio || defaults.typography.scale_ratio,
        base_size: typo.base_size || '16px',
        line_height: typo.line_height || 1.65
      },
      interactions: brief.interactions || defaults.interactions,
      layout_notes: brief.layout_notes || defaults.layout_notes,
      animation_notes: brief.animation_notes || defaults.animation_notes,
      component_selection: {
        hero: brief.component_selection?.hero || defaults.component_selection.hero,
        projects: brief.component_selection?.projects || defaults.component_selection.projects,
        about: brief.component_selection?.about || defaults.component_selection.about,
        contact: brief.component_selection?.contact || defaults.component_selection.contact
      }
    };
  }

  getDefaultDesignBrief() {
    return {
      layout: 'bento-dashboard',
      palette_name: 'Cyberpunk Neon Studio',
      dials: { design_variance: 7, motion_intensity: 6, visual_density: 5 },
      color_palette: {
        theme: 'dark',
        primary: '#38bdf8',
        secondary: '#818cf8',
        accent: '#22c55e',
        background: '#09090b',
        surface: '#18181b',
        surface_card: '#27272a',
        text: '#fafafa',
        text_muted: '#a1a1aa',
        border: 'rgba(255, 255, 255, 0.08)',
        glow: 'rgba(56, 189, 248, 0.22)',
        card_shadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        card_radius: '20px',
        card_border_width: '1px'
      },
      typography: {
        heading_font: 'Space Grotesk',
        body_font: 'Inter',
        scale_ratio: 1.25,
        base_size: '16px',
        line_height: 1.65
      },
      interactions: {
        tilt_cards: true,
        sparkles: true,
        aurora: true,
        confetti: true,
        filter_tabs: true,
        skill_highlight: true,
        smooth_scroll: true
      },
      layout_notes: 'Clean, centered layout with generous whitespace',
      animation_notes: 'Subtle hover effects and scroll-triggered fades',
      component_selection: {
        hero: 'centered-text',
        projects: 'card-grid',
        about: 'timeline',
        contact: 'simple-form'
      }
    };
  }

  async parseResumeDocument(buffer, mimeType = 'application/pdf') {
    if (!buffer) return null;

    // 1. Normalize/sanitize MIME type
    let normalizedMime = (mimeType || 'application/pdf').toLowerCase();
    if (normalizedMime.includes('pdf') || normalizedMime.includes('octet-stream') || normalizedMime.includes('binary')) {
      normalizedMime = 'application/pdf';
    } else if (normalizedMime.includes('png')) {
      normalizedMime = 'image/png';
    } else if (normalizedMime.includes('jpeg') || normalizedMime.includes('jpg')) {
      normalizedMime = 'image/jpeg';
    } else if (normalizedMime.includes('webp')) {
      normalizedMime = 'image/webp';
    } else {
      normalizedMime = 'application/pdf';
    }

    const extractionInstructions = `You are an expert AI resume parser and portfolio builder.
Extract ALL information from this resume thoroughly and comprehensively.

Infer the best branch:
A = Developer / Designer (software, web, app, UI/UX, tech)
B = Freelancer / Gig Worker (consultant, coach, photographer, services)
C = Student / Fresher (college, recent grad, intern)
D = General Professional (manager, executive, non-tech)

CRITICAL REQUIREMENT FOR PROJECTS:
- Extract EVERY SINGLE PROJECT mentioned anywhere in the resume (do NOT stop at 1 or 2; extract 3, 4, 5, 6, 7+ projects if present).
- For each project, extract its full name, comprehensive description, tech stack, GitHub repository link (if present), and live demo link (if present).

Extract into this exact JSON structure:
{
  "branch": "A|B|C|D",
  "extracted_data": {
    "name": "Full Name",
    "role": "Current or Desired Title",
    "tagline": "Short punchy 1-line summary",
    "bio": "2-3 sentence engaging professional summary",
    "email": "Email address",
    "phone": "Phone number if present",
    "github": "GitHub profile URL (e.g. https://github.com/username)",
    "linkedin": "LinkedIn URL if present",
    "website": "Personal URL or portfolio link if present",
    "location": "City, Country or Remote",
    "tech_stack": "Comma separated list of top skills/tools/technologies",
    "skills_by_category": {
      "languages": ["JavaScript", "Python", "..."],
      "frameworks": ["React", "Node.js", "..."],
      "cloud_tools": ["Docker", "AWS", "Git", "..."],
      "databases": ["PostgreSQL", "MongoDB", "..."]
    },
    "experience": [
      {
        "role": "Job Title",
        "company": "Company Name",
        "period": "Start - End Date (e.g. 2022 - Present)",
        "location": "City / Remote",
        "description": "Overview of role and impact",
        "achievements": [
          "Key measurable achievement or responsibility 1",
          "Key measurable achievement 2"
        ]
      }
    ],
    "education": [
      {
        "degree": "Degree / Major (e.g. B.S. in Computer Science)",
        "institution": "University or College Name",
        "year": "Graduation Year (e.g. 2020 - 2024)",
        "grade": "GPA / Grade / Honors if mentioned",
        "details": "Relevant coursework, clubs, or distinctions"
      }
    ],
    "projects": [
      {
        "name": "Project Name 1",
        "description": "Detailed multi-sentence explanation of what it is, problem solved, and architecture",
        "tech_stack": "Tech used (e.g. React, Node.js, PostgreSQL)",
        "github": "https://github.com/...",
        "live": "https://..."
      }
    ],
    "certifications": [
      {
        "name": "Certification Name",
        "issuer": "Issuing Organization (e.g. AWS, Google, Meta)",
        "year": "Year obtained"
      }
    ],
    "awards": [
      {
        "title": "Award or Honor Title",
        "issuer": "Issuing Entity / Event",
        "year": "Year"
      }
    ],
    "languages": [
      "English (Fluent)", "Spanish (Conversational)"
    ],
    "experience_summary": "Brief 1-line highlight of career tenure and focus"
  }
}

Respond ONLY with valid JSON.`;

    let parsedResult = null;

    // 2. PRIMARY STRATEGY: Extract raw digital text using pdf-parse
    if (normalizedMime === 'application/pdf' && pdfParse) {
      try {
        const pdfData = await pdfParse(buffer);
        const extractedText = (pdfData && pdfData.text) ? pdfData.text.trim() : '';

        if (extractedText.length > 30) {
          console.log(`[AI] Extracted ${extractedText.length} characters of digital text from PDF. Parsing with Gemini...`);
          const textPrompt = `${extractionInstructions}\n\n--- RESUME CONTENT ---\n${extractedText.substring(0, 30000)}\n--- END RESUME CONTENT ---`;

          const textResult = await this.callGemini(textPrompt);
          if (textResult && textResult.extracted_data && Object.keys(textResult.extracted_data).length > 0) {
            parsedResult = textResult;
          }
        } else {
          console.log('[AI] PDF has no/minimal selectable text (likely scanned image). Falling back to multimodal vision...');
        }
      } catch (pdfErr) {
        console.warn('[AI] Local pdf-parse warning, attempting multimodal parse:', pdfErr.message);
      }
    }

    // 3. SECONDARY STRATEGY: Multimodal Gemini Vision (inlineData)
    if (!parsedResult) {
      const candidateModels = ['gemini-flash-latest', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-pro-latest'];
      const base64Data = buffer.toString('base64');

      for (const mName of candidateModels) {
        try {
          if (this.sdkAvailable) {
            const m = this.genAI.getGenerativeModel({
              model: mName,
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 8192,
                responseMimeType: 'application/json'
              }
            });
            const result = await m.generateContent([
              {
                inlineData: {
                  data: base64Data,
                  mimeType: normalizedMime
                }
              },
              extractionInstructions
            ]);
            const parsed = this.parseJsonResponse(result.response.text());
            if (parsed && parsed.extracted_data && Object.keys(parsed.extracted_data).length > 0) {
              parsedResult = parsed;
              break;
            }
          } else {
            // REST API fallback for multimodal
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${mName}:generateContent?key=${this.apiKey}`;
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [
                    { inlineData: { mimeType: normalizedMime, data: base64Data } },
                    { text: extractionInstructions }
                  ]
                }],
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: 8192,
                  responseMimeType: 'application/json'
                }
              })
            });
            if (response.ok) {
              const data = await response.json();
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              const parsed = this.parseJsonResponse(text);
              if (parsed && parsed.extracted_data && Object.keys(parsed.extracted_data).length > 0) {
                parsedResult = parsed;
                break;
              }
            }
          }
        } catch (err) {
          console.warn(`[AI] Resume multimodal parse attempt with ${mName} failed: ${err.message}. Trying next model...`);
        }
      }
    }

    if (!parsedResult || !parsedResult.extracted_data) {
      // 4. ULTIMATE LOCAL FALLBACK: If external AI servers are down, extract with local heuristics
      if (normalizedMime === 'application/pdf' && pdfParse) {
        try {
          const pdfData = await pdfParse(buffer);
          const rawText = pdfData?.text || '';
          if (rawText.length > 30) {
            console.log('[AI] Using resilient local heuristic parser for resume...');
            parsedResult = this.parseResumeHeuristics(rawText);
          }
        } catch (hErr) { }
      }
    }

    if (!parsedResult || !parsedResult.extracted_data) return null;

    // 5. Post-processing: Normalize all projects & enrich with GitHub Repos
    return await this.normalizeAndEnrichExtractedData(parsedResult);
  }

  parseResumeHeuristics(rawText) {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const emailMatch = rawText.match(/[\w.-]+@[\w.-]+\.\w+/);
    const githubMatch = rawText.match(/github\.com\/([\w-]+)/i);
    const linkedinMatch = rawText.match(/linkedin\.com\/in\/([\w-]+)/i);

    const name = lines[0] || 'Professional';
    const role = lines.length > 1 ? lines[1] : 'Developer';

    return {
      branch: 'A',
      extracted_data: {
        name,
        role,
        tagline: `${role} crafting digital solutions`,
        bio: `${name} is an experienced ${role} specializing in modern software development.`,
        email: emailMatch ? emailMatch[0] : '',
        github: githubMatch ? `https://github.com/${githubMatch[1]}` : '',
        linkedin: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : '',
        tech_stack: 'JavaScript, TypeScript, React, Node.js, Python',
        projects: []
      }
    };
  }

  async normalizeAndEnrichExtractedData(parsedResult) {
    const data = parsedResult.extracted_data || {};
    const projects = [];

    if (Array.isArray(data.projects)) {
      for (const p of data.projects) {
        if (p && (p.name || p.title)) {
          projects.push({
            name: p.name || p.title,
            desc: p.description || p.desc || 'High-performance software project.',
            tech: p.tech_stack || p.tech || (Array.isArray(p.technologies) ? p.technologies.join(', ') : ''),
            github: p.github || p.repo || '',
            live: p.live || p.link || ''
          });
        }
      }
    }

    // Check project_1_name, project_2_name, etc.
    for (let i = 1; i <= 20; i++) {
      const name = data[`project_${i}_name`];
      if (name && !projects.some(p => p.name === name)) {
        projects.push({
          name: name,
          desc: data[`project_${i}_desc`] || 'Featured software application with modern architecture.',
          tech: data[`project_${i}_tech`] || data.tech_stack || '',
          github: data[`project_${i}_github`] || '',
          live: data[`project_${i}_live`] || ''
        });
      }
    }

    // If GitHub URL is provided, fetch public repos to enrich missing projects or add repo links
    const githubUrl = data.github || data.github_url;
    if (githubUrl) {
      try {
        const ghRepos = await this.fetchGitHubRepos(githubUrl);
        if (Array.isArray(ghRepos) && ghRepos.length > 0) {
          for (const repo of ghRepos) {
            // Match with existing project or append
            const existing = projects.find(p => p.name.toLowerCase().includes(repo.name.toLowerCase()) || repo.name.toLowerCase().includes(p.name.toLowerCase()));
            if (existing) {
              if (!existing.github) existing.github = repo.github;
              if (!existing.live && repo.live && repo.live !== repo.github) existing.live = repo.live;
            } else if (projects.length < 8) {
              projects.push(repo);
            }
          }
        }
      } catch (ghErr) {
        console.warn('[AI] GitHub enrichment warning:', ghErr.message);
      }
    }

    // Flatten back into project_1_name, project_2_name, etc.
    data.projects = projects;
    projects.forEach((p, idx) => {
      const num = idx + 1;
      data[`project_${num}_name`] = p.name;
      data[`project_${num}_desc`] = p.desc || p.description;
      data[`project_${num}_tech`] = p.tech || p.tech_stack;
      data[`project_${num}_github`] = p.github;
      data[`project_${num}_live`] = p.live;
    });

    parsedResult.extracted_data = data;
    return parsedResult;
  }

  async fetchGitHubRepos(githubUrlOrUsername) {
    if (!githubUrlOrUsername) return [];
    try {
      const axios = require('axios');
      let username = githubUrlOrUsername
        .replace(/https?:\/\/(www\.)?github\.com\//i, '')
        .replace(/\/.*$/, '')
        .replace('@', '')
        .trim();
      if (!username) return [];

      const res = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=8`, {
        headers: { 'User-Agent': 'PortfolioBot-AI' },
        timeout: 1200
      });

      if (Array.isArray(res.data)) {
        return res.data.filter(r => !r.fork).slice(0, 6).map(r => ({
          name: r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          desc: r.description || 'Open source software project hosted on GitHub.',
          tech: r.language || 'Code',
          github: r.html_url,
          live: r.homepage || r.html_url
        }));
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        // Safe graceful fallback when resume contains a placeholder or non-existent GitHub handle
        console.log(`[GITHUB API] GitHub username '${username}' not found (404), using extracted resume project data.`);
      } else {
        console.warn('[GITHUB API] Error fetching repos:', e.message);
      }
    }
    return [];
  }

  async healthCheck() {
    try {
      const result = await this.callGemini('Say "OK" in JSON: {"status": "ok"}');
      return result.status === 'ok' || result.raw?.includes('OK');
    } catch (error) {
      console.error('[AI] Health check failed:', error.message);
      return false;
    }
  }
}

module.exports = { AIService };

/**
 * AI Service - Google Gemini Integration
 * Supports BOTH old AIzaSy... keys AND new AQ.Ab... authorized keys
 * Falls back to direct REST API if SDK fails
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { UIUXIntegration } = require('./uiux-integration');

class AIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.isAuthKey = apiKey && apiKey.startsWith('AQ.');
    this.uiux = new UIUXIntegration();

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-3.5-flash',
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json'
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      });
      this.sdkAvailable = true;
    } catch (error) {
      console.warn('[AI] SDK init failed, will use REST API:', error.message);
      this.sdkAvailable = false;
    }
  }

  async callGemini(prompt) {
    if (this.sdkAvailable) {
      try {
        const result = await this.model.generateContent(prompt);
        const text = result.response.text();
        return this.parseJsonResponse(text);
      } catch (sdkError) {
        console.warn('[AI] SDK call failed, falling back to REST API:', sdkError.message);
      }
    }
    return this.callGeminiRest(prompt);
  }

  async callGeminiRest(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json'
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (data.error) throw new Error(`Gemini API error: ${data.error.message}`);

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return this.parseJsonResponse(text);
  }

  parseJsonResponse(text) {
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }
    try {
      return JSON.parse(cleanText);
    } catch (error) {
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
      const enhancedBrief = await this.uiux.getEnhancedDesignBrief(extractedData, branch);
      return this.validateDesignBrief(enhancedBrief);
    } catch (error) {
      console.error('[AI] UI/UX Pro Max design brief generation failed:', error.message);
      console.warn('[AI] Falling back to AI-generated design brief');
      return this.generateAIDesignBrief(extractedData, branch);
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

5. SHADER SELECTION:
   - Pick one shader that matches the user's personality
   - Options: digital-rain, event-horizon, rain-on-glass, flow-field, silk-groove, painted-strata, liquid-gold, chromatic-bloom, aurora-veil

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
  "selected_shader": "shader-id",
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

  validateDesignBrief(brief) {
    const defaults = this.getDefaultDesignBrief();
    return {
      dials: {
        design_variance: brief.dials?.design_variance || defaults.dials.design_variance,
        motion_intensity: brief.dials?.motion_intensity || defaults.dials.motion_intensity,
        visual_density: brief.dials?.visual_density || defaults.dials.visual_density
      },
      color_palette: {
        primary: brief.color_palette?.primary || defaults.color_palette.primary,
        secondary: brief.color_palette?.secondary || defaults.color_palette.secondary,
        accent: brief.color_palette?.accent || defaults.color_palette.accent,
        background: brief.color_palette?.background || defaults.color_palette.background,
        surface: brief.color_palette?.surface || defaults.color_palette.surface,
        text: brief.color_palette?.text || defaults.color_palette.text,
        text_muted: brief.color_palette?.text_muted || defaults.color_palette.text_muted
      },
      typography: {
        heading_font: brief.typography?.heading_font || defaults.typography.heading_font,
        body_font: brief.typography?.body_font || defaults.typography.body_font,
        scale_ratio: brief.typography?.scale_ratio || defaults.typography.scale_ratio
      },
      selected_shader: brief.selected_shader || defaults.selected_shader,
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
      dials: { design_variance: 5, motion_intensity: 4, visual_density: 5 },
      color_palette: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        accent: '#f59e0b',
        background: '#fafaf9',
        surface: '#ffffff',
        text: '#1c1917',
        text_muted: '#78716c'
      },
      typography: {
        heading_font: 'Space Grotesk',
        body_font: 'Inter',
        scale_ratio: 1.25
      },
      selected_shader: 'flow-field',
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

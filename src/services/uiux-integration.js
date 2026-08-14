const { spawn } = require('child_process');
const path = require('path');

class UIUXIntegration {
  constructor() {
    this.skillPath = path.join(__dirname, '..', '..', '.opencode', 'skills', 'ui-ux-pro-max');
    this.scriptsPath = path.join(this.skillPath, 'scripts');
    this.cache = new Map();
  }

  async generateDesignSystem(query, projectName, options = {}) {
    const cacheKey = `${query}:${projectName}:${JSON.stringify(options)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--design-system',
      '-p', projectName,
      '-f', 'markdown'
    ];

    if (options.variance) args.push('--variance', options.variance);
    if (options.motion) args.push('--motion', options.motion);
    if (options.density) args.push('--density', options.density);

    const result = await this.runPythonScript(args);
    const parsed = this.parseDesignSystemOutput(result);
    
    this.cache.set(cacheKey, parsed);
    return parsed;
  }

  async searchStyle(query) {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--domain', 'style',
      '--max-results', '3',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  async searchColors(query) {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--domain', 'color',
      '--max-results', '2',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  async searchTypography(query) {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--domain', 'typography',
      '--max-results', '2',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  async searchLanding(query) {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--domain', 'landing',
      '--max-results', '2',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  async searchProduct(query) {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--domain', 'product',
      '--max-results', '1',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  async searchStackGuidelines(query, stack = 'html-tailwind') {
    const args = [
      path.join(this.scriptsPath, 'search.py'),
      query,
      '--stack', stack,
      '--max-results', '3',
      '--json'
    ];
    const result = await this.runPythonScript(args);
    return JSON.parse(result);
  }

  runPythonScript(args) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', args, {
        cwd: this.scriptsPath,
        env: { ...process.env, PYTHONPATH: this.scriptsPath }
      });

      let stdout = '';
      let stderr = '';

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python script failed: ${stderr}`));
        } else {
          resolve(stdout);
        }
      });
    });
  }

  parseDesignSystemOutput(output) {
    const result = {
      pattern: {},
      style: {},
      colors: {},
      typography: {},
      keyEffects: '',
      antiPatterns: '',
      dials: {},
      motionSnippet: null,
      spacingScale: null,
      rawOutput: output
    };

    const lines = output.split('\n');
    let currentSection = null;
    let inCodeBlock = false;

    for (const line of lines) {
      if (line.startsWith('## Design Dials')) {
        currentSection = 'dials';
        continue;
      }
      if (line.startsWith('### Pattern')) {
        currentSection = 'pattern';
        continue;
      }
      if (line.startsWith('### Style')) {
        currentSection = 'style';
        continue;
      }
      if (line.startsWith('### Colors')) {
        currentSection = 'colors';
        continue;
      }
      if (line.startsWith('### Typography')) {
        currentSection = 'typography';
        continue;
      }
      if (line.startsWith('### Key Effects')) {
        currentSection = 'keyEffects';
        continue;
      }
      if (line.startsWith('### Motion')) {
        currentSection = 'motion';
        continue;
      }
      if (line.startsWith('### Avoid')) {
        currentSection = 'antiPatterns';
        continue;
      }
      if (line.startsWith('### Pre-Delivery')) {
        currentSection = null;
        continue;
      }
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }

      if (currentSection === 'dials') {
        if (line.includes('Variance:')) {
          const match = line.match(/Variance:\s*(\d+)\/10\s*[—-]\s*(.+)/);
          if (match) {
            result.dials.variance = parseInt(match[1]);
            result.dials.varianceLabel = match[2].trim();
          }
        }
        if (line.includes('Motion:')) {
          const match = line.match(/Motion:\s*(\d+)\/10\s*[—-]\s*(.+)/);
          if (match) {
            result.dials.motion = parseInt(match[1]);
            result.dials.motionLabel = match[2].trim();
          }
        }
        if (line.includes('Density:')) {
          const match = line.match(/Density:\s*(\d+)\/10\s*[—-]\s*(.+)/);
          if (match) {
            result.dials.density = parseInt(match[1]);
            result.dials.densityLabel = match[2].trim();
          }
        }
      }

      if (currentSection === 'pattern') {
        if (line.includes('**Name:**')) {
          result.pattern.name = line.replace('**Name:**', '').trim();
        }
        if (line.includes('**Conversion Focus:**')) {
          result.pattern.conversion = line.replace('**Conversion Focus:**', '').trim();
        }
        if (line.includes('**CTA Placement:**')) {
          result.pattern.ctaPlacement = line.replace('**CTA Placement:**', '').trim();
        }
        if (line.includes('**Color Strategy:**')) {
          result.pattern.colorStrategy = line.replace('**Color Strategy:**', '').trim();
        }
        if (line.includes('**Sections:**')) {
          result.pattern.sections = line.replace('**Sections:**', '').trim();
        }
      }

      if (currentSection === 'style') {
        if (line.includes('**Name:**')) {
          result.style.name = line.replace('**Name:**', '').trim();
        }
        if (line.includes('**Mode Support:**')) {
          result.style.modeSupport = line.replace('**Mode Support:**', '').trim();
        }
        if (line.includes('**Keywords:**')) {
          result.style.keywords = line.replace('**Keywords:**', '').trim();
        }
        if (line.includes('**Best For:**')) {
          result.style.bestFor = line.replace('**Best For:**', '').trim();
        }
      }

      if (currentSection === 'colors') {
        const colorMatch = line.match(/\|\s*(\w+(?:\s+\w+)*)\s*\|\s*`(#[0-9a-fA-F]+)`\s*\|\s*`([^`]+)`/);
        if (colorMatch) {
          const [, role, hex, cssVar] = colorMatch;
          const key = role.toLowerCase().replace(/\s+/g, '_').replace('on_primary', 'on_primary').replace('on_secondary', 'on_secondary').replace('on_accent', 'on_accent');
          result.colors[key] = { hex, cssVar };
        }
      }

      if (currentSection === 'typography') {
        if (line.includes('**Heading:**')) {
          result.typography.heading = line.replace('**Heading:**', '').trim();
        }
        if (line.includes('**Body:**')) {
          result.typography.body = line.replace('**Body:**', '').trim();
        }
        if (line.includes('**Mood:**')) {
          result.typography.mood = line.replace('**Mood:**', '').trim();
        }
        if (line.includes('**Best For:**')) {
          result.typography.bestFor = line.replace('**Best For:**', '').trim();
        }
        if (line.includes('**Google Fonts:**')) {
          const match = line.match(/\((https?:\/\/[^)]+)\)/);
          if (match) {
            result.typography.googleFontsUrl = match[1];
          }
        }
        if (inCodeBlock && line.trim() && !line.includes('```')) {
          result.typography.cssImport = (result.typography.cssImport || '') + line + '\n';
        }
      }

      if (currentSection === 'keyEffects') {
        if (line.trim() && !line.startsWith('###')) {
          result.keyEffects += (result.keyEffects ? ' ' : '') + line.trim();
        }
      }

      if (currentSection === 'motion') {
        if (!result.motionSnippet) result.motionSnippet = {};
        if (line.includes('**Category') || line.includes('**Intensity')) {
          const match = line.match(/\*\*(.+?)\*\*\s*(\(.+?\))?\s*[—-]\s*(.+)/);
          if (match) {
            result.motionSnippet.category = match[1];
            result.motionSnippet.tier = match[2] ? match[2].replace(/[()]/g, '') : '';
            result.motionSnippet.details = match[3];
          }
        }
        if (inCodeBlock && line.trim()) {
          result.motionSnippet.gsapSnippet = (result.motionSnippet.gsapSnippet || '') + line + '\n';
        }
      }

      if (currentSection === 'antiPatterns') {
        if (line.trim() && line.startsWith('- ')) {
          result.antiPatterns += (result.antiPatterns ? ' + ' : '') + line.replace('- ', '').trim();
        }
      }
    }

    return result;
  }

  async getEnhancedDesignBrief(extractedData, branch) {
    const branchNames = {
      'A': 'Developer / Designer',
      'B': 'Freelancer / Gig Worker',
      'C': 'Student / Fresher',
      'D': 'General Professional'
    };

    const projectType = this.mapBranchToProductType(branch, extractedData);
    const query = `${projectType} portfolio ${branchNames[branch].toLowerCase()}`;
    const projectName = extractedData.name || 'Portfolio';

    const dials = this.calculateDials(extractedData, branch);

    const designSystem = await this.generateDesignSystem(query, projectName, dials);

    const enhancedBrief = {
      dials: {
        design_variance: designSystem.dials.variance || dials.variance,
        motion_intensity: designSystem.dials.motion || dials.motion,
        visual_density: designSystem.dials.density || dials.density
      },
      color_palette: this.convertColors(designSystem.colors),
      typography: {
        heading_font: designSystem.typography.heading || 'Space Grotesk',
        body_font: designSystem.typography.body || 'Inter',
        scale_ratio: 1.25
      },
      selected_shader: this.selectShaderFromDesignSystem(designSystem, branch),
      layout_notes: designSystem.pattern.sections || 'Hero > About > Projects > Contact',
      animation_notes: designSystem.keyEffects || 'Subtle hover effects and scroll-triggered fades',
      component_selection: this.getComponentSelection(designSystem),
      uiux_design_system: designSystem
    };

    return enhancedBrief;
  }

  mapBranchToProductType(branch, extractedData) {
    const techStack = (extractedData.tech_stack || extractedData.skills || '').toLowerCase();
    const role = (extractedData.role || extractedData.service_title || '').toLowerCase();

    if (branch === 'A') {
      if (techStack.includes('3d') || techStack.includes('webgl') || techStack.includes('three')) return '3D web developer portfolio';
      if (techStack.includes('ai') || techStack.includes('ml')) return 'AI engineer portfolio';
      if (techStack.includes('frontend') || techStack.includes('react') || techStack.includes('vue')) return 'frontend developer portfolio';
      if (techStack.includes('backend') || techStack.includes('node') || techStack.includes('python')) return 'backend developer portfolio';
      if (role.includes('designer') || techStack.includes('ui') || techStack.includes('ux')) return 'UI/UX designer portfolio';
      if (techStack.includes('fullstack') || techStack.includes('full stack')) return 'full stack developer portfolio';
      return 'software developer portfolio';
    }
    if (branch === 'B') {
      if (role.includes('photo')) return 'photographer portfolio';
      if (role.includes('design')) return 'freelance designer portfolio';
      if (role.includes('writer') || role.includes('content')) return 'writer portfolio';
      if (role.includes('consultant')) return 'consultant portfolio';
      return 'freelancer portfolio';
    }
    if (branch === 'C') {
      return 'student developer portfolio';
    }
    return 'professional portfolio';
  }

  calculateDials(extractedData, branch) {
    let variance = 5, motion = 4, density = 5;

    const techStack = (extractedData.tech_stack || extractedData.skills || '').toLowerCase();
    const bio = (extractedData.bio || '').toLowerCase();

    if (branch === 'A') {
      if (techStack.includes('3d') || techStack.includes('webgl') || techStack.includes('three') || techStack.includes('shader')) {
        variance = 8; motion = 9; density = 6;
      } else if (techStack.includes('creative') || bio.includes('creative') || bio.includes('experimental')) {
        variance = 7; motion = 7; density = 6;
      } else if (techStack.includes('minimal') || bio.includes('clean') || bio.includes('simple')) {
        variance = 3; motion = 2; density = 4;
      } else {
        variance = 6; motion = 5; density = 5;
      }
    } else if (branch === 'B') {
      if (bio.includes('luxury') || bio.includes('premium') || bio.includes('high-end')) {
        variance = 4; motion = 3; density = 4;
      } else if (bio.includes('vibrant') || bio.includes('colorful') || bio.includes('bold')) {
        variance = 7; motion = 6; density = 6;
      } else {
        variance = 5; motion = 4; density = 5;
      }
    } else if (branch === 'C') {
      variance = 4; motion = 3; density = 5;
    } else {
      variance = 3; motion = 2; density = 4;
    }

    return { variance, motion, density };
  }

  selectShaderFromDesignSystem(designSystem, branch) {
    const styleName = designSystem.style.name?.toLowerCase() || '';
    const effects = designSystem.keyEffects?.toLowerCase() || '';
    const category = designSystem.pattern?.name?.toLowerCase() || '';

    if (styleName.includes('3d') || styleName.includes('hyperrealism') || effects.includes('3d') || effects.includes('webgl')) {
      return 'event-horizon';
    }
    if (styleName.includes('glassmorphism') || styleName.includes('liquid glass')) {
      return 'rain-on-glass';
    }
    if (styleName.includes('brutalism') || styleName.includes('neubrutalism')) {
      return 'digital-rain';
    }
    if (styleName.includes('cyberpunk') || styleName.includes('hud') || styleName.includes('sci-fi')) {
      return 'neon-drive';
    }
    if (styleName.includes('aurora') || styleName.includes('gradient mesh')) {
      return 'aurora-veil';
    }
    if (styleName.includes('claymorphism') || styleName.includes('soft ui')) {
      return 'silk-groove';
    }
    if (styleName.includes('vaporwave') || styleName.includes('retro') || styleName.includes('y2k')) {
      return 'chromatic-bloom';
    }
    if (styleName.includes('motion') || styleName.includes('kinetic')) {
      return 'flow-field';
    }
    if (branch === 'A') return 'event-horizon';
    if (branch === 'B') return 'liquid-gold';
    if (branch === 'C') return 'flow-field';
    return 'silk-groove';
  }

  convertColors(colors) {
    const defaults = {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#fafaf9',
      surface: '#ffffff',
      text: '#1c1917',
      text_muted: '#78716c'
    };

    const mapping = {
      primary: 'primary',
      secondary: 'secondary',
      accent: 'accent',
      background: 'background',
      surface: 'card',
      text: 'foreground',
      text_muted: 'muted'
    };

    const result = { ...defaults };
    for (const [targetKey, sourceKey] of Object.entries(mapping)) {
      if (colors[sourceKey]?.hex) {
        result[targetKey] = colors[sourceKey].hex;
      }
    }
    return result;
  }

  getComponentSelection(designSystem) {
    const pattern = designSystem.pattern?.sections?.toLowerCase() || '';
    const style = designSystem.style?.name?.toLowerCase() || '';

    let hero = 'centered-text';
    if (pattern.includes('hero') && style.includes('hero')) hero = 'hero-centric';
    else if (pattern.includes('demo') || style.includes('interactive')) hero = 'interactive-demo';

    let projects = 'card-grid';
    if (style.includes('bento')) projects = 'bento-grid';
    else if (style.includes('showcase') || style.includes('feature-rich')) projects = 'feature-showcase';

    let about = 'timeline';
    if (style.includes('minimal')) about = 'simple-grid';
    else if (style.includes('storytelling')) about = 'narrative';

    let contact = 'simple-form';
    if (style.includes('conversion')) contact = 'conversion-form';

    return { hero, projects, about, contact };
  }
}

module.exports = { UIUXIntegration };
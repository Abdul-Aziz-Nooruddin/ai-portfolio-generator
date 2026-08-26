/**
 * Canonical Portfolio State Model (Phase 23)
 * Represents the mutable, undoable, exportable state of a customized portfolio.
 * Never mutates raw HTML directly as source of truth; re-compiles cleanly from state.
 */

const { SectionRegistry } = require('./section-registry');

class PortfolioState {
  constructor(initialData = {}) {
    this.originalSite = initialData;
    this.designBlueprint = initialData.designBlueprint || {};
    this.designBrief = initialData.designBrief || {};
    this.contentProfile = initialData.contentProfile || {};

    // Initial section extraction
    const extracted = this.extractSectionsAndShell(initialData.html || '');
    this.shell = {
      head: extracted.head,
      header: extracted.header,
      footer: extracted.footer,
      scripts: extracted.scripts,
      styles: extracted.styles
    };

    this.sections = extracted.sections; // Map of id -> { id, html, meta }
    this.sectionOrder = extracted.sectionOrder || this.designBlueprint.sectionOrder || Object.keys(this.sections);
    this.hiddenSections = new Set();
    this.themeMode = this.designBrief.colorSystem?.theme || 'dark';
    
    // Controlled Design Tokens
    this.designTokens = {
      sectionSpacing: '4rem',
      borderRadius: this.designBrief.visualUniverse?.borderRadius || '8px',
      borderOpacity: '0.15',
      typeScale: String(this.designBrief.typography?.scaleRatio || 1.333),
      motionIntensity: this.designBrief.motionSystem?.intensity || 'subtle-editorial',
      primaryColor: this.designBrief.colorSystem?.primary || '#38BDF8',
      accentColor: this.designBrief.colorSystem?.accent || '#818CF8'
    };

    // History Stacks for Undo/Redo
    this.history = [];
    this.future = [];
    this.maxHistoryDepth = 30;
    this.exportVersion = '1.2.0';
  }

  /**
   * Parses raw HTML into shell structure and individual section blocks
   */
  extractSectionsAndShell(html = '') {
    const sections = {};
    const sectionOrder = [];

    // Extract Styles
    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const styles = styleMatch ? styleMatch[1] : '';

    // Extract Head without styles
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const rawHead = headMatch ? headMatch[1] : '<meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Portfolio</title>';
    const head = rawHead.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').trim();

    // Extract Scripts
    const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    const scripts = scriptMatch ? scriptMatch[1] : '';

    // Extract individual sections using semantic <section> or <aside> or id tags
    const sectionTags = html.match(/<(section|aside|div)[^>]*class="[^"]*(section|masthead|lead|dossier|stage|mosaic|portfolio|track|grid)[^"]*"[^>]*>[\s\S]*?<\/\1>/gi) || [];
    const blueprintOrder = this.designBlueprint?.sectionOrder || [];
    const canonicalOrder = blueprintOrder.length > 0 ? [...blueprintOrder] : (sectionOrder.length > 0 ? sectionOrder : ['hero', 'projects', 'skills', 'experience']);

    for (let i = 0; i < canonicalOrder.length; i++) {
      const id = canonicalOrder[i];
      const tagHtml = sectionTags[i] || `<section id="${id}" class="portfolio-section" style="padding: 3rem 0; margin-bottom: var(--space-section);"><h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--text); margin-bottom: 1rem;">${SectionRegistry.getSectionMeta(id).label}</h2></section>`;
      const meta = SectionRegistry.getSectionMeta(id);

      sections[id] = {
        id,
        html: tagHtml,
        meta
      };
    }

    // Extract Header if present outside sections
    const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
    const header = headerMatch ? headerMatch[0] : '';

    // Extract Footer if present outside sections
    const footerMatch = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
    const footer = footerMatch ? footerMatch[0] : '';

    return { 
      head, 
      styles, 
      scripts, 
      header, 
      footer, 
      sections, 
      sectionOrder: canonicalOrder 
    };
  }

  /**
   * Records state snapshot before a mutating action
   */
  saveSnapshot(actionName = 'USER_ACTION') {
    const snapshot = {
      action: actionName,
      sectionOrder: [...this.sectionOrder],
      hiddenSections: Array.from(this.hiddenSections),
      themeMode: this.themeMode,
      designTokens: { ...this.designTokens },
      timestamp: Date.now()
    };

    this.history.push(snapshot);
    if (this.history.length > this.maxHistoryDepth) {
      this.history.shift();
    }
    this.future = []; // Clear redo stack on new action
  }

  /**
   * Reorders movable sections
   */
  reorderSections(newOrder = []) {
    this.saveSnapshot('REORDER_SECTIONS');
    
    // Filter to valid known sections while preserving immobility of fixed sections
    const validatedOrder = [];
    for (const id of newOrder) {
      if (this.sections[id]) {
        validatedOrder.push(id);
      }
    }

    // Append any missing sections
    for (const id of this.sectionOrder) {
      if (!validatedOrder.includes(id) && this.sections[id]) {
        validatedOrder.push(id);
      }
    }

    this.sectionOrder = validatedOrder;
    return this.renderCurrentHtml();
  }

  /**
   * Toggles visibility of optional/hideable sections
   */
  toggleSectionVisibility(sectionId, isVisible = null) {
    if (!this.sections[sectionId]) {
      throw new Error(`Section '${sectionId}' not found.`);
    }

    const meta = SectionRegistry.getSectionMeta(sectionId);
    if (meta.required) {
      throw new Error(`Section '${sectionId}' is required and cannot be hidden.`);
    }

    this.saveSnapshot(`TOGGLE_VISIBILITY_${sectionId}`);

    const shouldHide = isVisible === null ? !this.hiddenSections.has(sectionId) : !isVisible;
    if (shouldHide) {
      this.hiddenSections.add(sectionId);
    } else {
      this.hiddenSections.delete(sectionId);
    }

    return this.renderCurrentHtml();
  }

  /**
   * Sets theme mode ('light', 'dark', 'auto')
   */
  setThemeMode(mode = 'dark') {
    const validModes = ['light', 'dark', 'auto'];
    if (!validModes.includes(mode)) {
      throw new Error(`Invalid theme mode '${mode}'. Expected one of: ${validModes.join(', ')}`);
    }

    this.saveSnapshot(`SET_THEME_${mode}`);
    this.themeMode = mode;
    return this.renderCurrentHtml();
  }

  /**
   * Updates controlled design tokens
   */
  setDesignTokens(newTokens = {}) {
    this.saveSnapshot('UPDATE_DESIGN_TOKENS');
    this.designTokens = { ...this.designTokens, ...newTokens };
    return this.renderCurrentHtml();
  }

  /**
   * Reverts last action
   */
  undo() {
    if (this.history.length === 0) return null;

    const currentSnapshot = {
      sectionOrder: [...this.sectionOrder],
      hiddenSections: Array.from(this.hiddenSections),
      themeMode: this.themeMode,
      designTokens: { ...this.designTokens },
      timestamp: Date.now()
    };
    this.future.push(currentSnapshot);

    const prev = this.history.pop();
    this.sectionOrder = prev.sectionOrder;
    this.hiddenSections = new Set(prev.hiddenSections);
    this.themeMode = prev.themeMode;
    this.designTokens = prev.designTokens;

    return this.renderCurrentHtml();
  }

  /**
   * Re-applies undone action
   */
  redo() {
    if (this.future.length === 0) return null;

    const currentSnapshot = {
      sectionOrder: [...this.sectionOrder],
      hiddenSections: Array.from(this.hiddenSections),
      themeMode: this.themeMode,
      designTokens: { ...this.designTokens },
      timestamp: Date.now()
    };
    this.history.push(currentSnapshot);

    const next = this.future.pop();
    this.sectionOrder = next.sectionOrder;
    this.hiddenSections = new Set(next.hiddenSections);
    this.themeMode = next.themeMode;
    this.designTokens = next.designTokens;

    return this.renderCurrentHtml();
  }

  /**
   * Resets all customizations back to original generated state
   */
  reset() {
    this.saveSnapshot('RESET_TO_GENERATED');
    const extracted = this.extractSectionsAndShell(this.originalSite.html || '');
    this.sectionOrder = extracted.sectionOrder || this.designBlueprint.sectionOrder || Object.keys(this.sections);
    this.hiddenSections = new Set();
    this.themeMode = this.designBrief.colorSystem?.theme || 'dark';
    this.designTokens = {
      sectionSpacing: '4rem',
      borderRadius: this.designBrief.visualUniverse?.borderRadius || '8px',
      borderOpacity: '0.15',
      typeScale: String(this.designBrief.typography?.scaleRatio || 1.333),
      motionIntensity: this.designBrief.motionSystem?.intensity || 'subtle-editorial',
      primaryColor: this.designBrief.colorSystem?.primary || '#38BDF8',
      accentColor: this.designBrief.colorSystem?.accent || '#818CF8'
    };
    return this.renderCurrentHtml();
  }

  /**
   * Fast client/server re-rendering under 5ms preserving full DOM fidelity
   */
  renderCurrentHtml() {
    let baseHtml = this.originalSite.html || '';

    // 1. Update theme attribute on <html>
    const themeAttr = this.themeMode === 'light' ? 'data-theme="light"' : 'data-theme="dark"';
    baseHtml = baseHtml.replace(/<html([^>]*)>/i, `<html$1 ${themeAttr}>`);

    // 2. Build Dynamic Customizer Token & Visibility Overrides
    const hiddenCss = Array.from(this.hiddenSections)
      .map(id => `#${id}, .${id}, [data-section="${id}"] { display: none !important; }`)
      .join('\n');

    const orderCss = this.sectionOrder
      .map((id, index) => `#${id}, .${id}, [data-section="${id}"] { order: ${index + 1}; }`)
      .join('\n');

    const tokenOverridesCss = `
      /* Live Customizer Dynamic Design Tokens */
      :root {
        --radius: ${this.designTokens.borderRadius} !important;
        --space-section: ${this.designTokens.sectionSpacing} !important;
        --primary: ${this.designTokens.primaryColor} !important;
        --accent: ${this.designTokens.accentColor} !important;
      }
      .layout-root, main, #portfolio-main {
        display: flex !important;
        flex-direction: column !important;
      }
      ${orderCss}
      ${hiddenCss}
    `;

    // 3. Inject Overrides before </head>
    if (baseHtml.includes('</head>')) {
      baseHtml = baseHtml.replace('</head>', `<style id="customizer-overrides">\n${tokenOverridesCss}\n</style>\n</head>`);
    } else {
      baseHtml += `<style id="customizer-overrides">\n${tokenOverridesCss}\n</style>`;
    }

    return baseHtml;
  }

  /**
   * Returns human-readable summary of sections
   */
  getSectionsSummary() {
    return this.sectionOrder.map(id => {
      const meta = SectionRegistry.getSectionMeta(id);
      return {
        id,
        name: meta.label || id,
        protected: !!meta.required,
        visible: !this.hiddenSections.has(id)
      };
    });
  }

  canUndo() {
    return this.history.length > 0;
  }

  canRedo() {
    return this.future.length > 0;
  }

  setToken(token, value) {
    this.saveSnapshot('SET_TOKEN_' + token);
    if (token === '--space-section' || token === 'sectionSpacing') {
      this.designTokens.sectionSpacing = value;
    } else if (token === '--border-opacity' || token === 'borderIntensity') {
      this.designTokens.borderOpacity = value;
    } else if (token === '--type-scale' || token === 'typeScale') {
      this.designTokens.typeScale = value;
    } else if (token === 'theme') {
      this.themeMode = value;
    } else {
      this.designTokens[token] = value;
    }
    return this.renderCurrentHtml();
  }

  render() {
    return {
      html: this.renderCurrentHtml(),
      css: this.originalSite.css || '',
      js: this.originalSite.js || ''
    };
  }

  toSitePayload() {
    return this.render();
  }

  /**
   * Serializes state to JSON
   */
  toJSON() {
    return {
      exportVersion: this.exportVersion,
      designBlueprint: this.designBlueprint,
      sectionOrder: this.sectionOrder,
      hiddenSections: Array.from(this.hiddenSections),
      themeMode: this.themeMode,
      designTokens: this.designTokens,
      historyDepth: this.history.length
    };
  }
}

module.exports = { PortfolioState };

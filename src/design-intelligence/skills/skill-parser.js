/**
 * Deterministic Skill Parser
 * Parses markdown SKILL.md documents into machine-actionable design rules,
 * anti-patterns, typography scales, layout heuristics, and motion constraints.
 */

const fs = require('fs');

class SkillParser {
  /**
   * Parses a SKILL.md file into structured design intelligence
   * @param {string} filePath - Absolute path to SKILL.md
   * @param {string} skillName - Name of the skill
   * @returns {Object} Structured knowledge model
   */
  static parseFile(filePath, skillName = 'unknown-skill') {
    if (!fs.existsSync(filePath)) {
      throw new Error(`[SKILL PARSER ERROR] File not found: ${filePath}`);
    }

    const rawContent = fs.readFileSync(filePath, 'utf8');
    return this.parseContent(rawContent, skillName, filePath);
  }

  /**
   * Deterministically parses Markdown content
   */
  static parseContent(markdown = '', skillName = 'unknown-skill', sourcePath = '') {
    const lines = markdown.split('\n');

    const result = {
      skill: skillName,
      source: sourcePath,
      principles: [],
      rules: [],
      antiPatterns: [],
      typographyRules: [],
      layoutRules: [],
      interactionRules: [],
      accessibilityRules: [],
      motionRules: [],
      constraints: []
    };

    let currentSection = 'general';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Detect Headings
      if (line.startsWith('#')) {
        const headingText = line.replace(/^#+\s*/, '').toLowerCase();
        if (headingText.includes('principle')) currentSection = 'principles';
        else if (headingText.includes('rule')) currentSection = 'rules';
        else if (headingText.includes('anti-pattern') || headingText.includes('anti-ai-slop') || headingText.includes('avoid')) currentSection = 'antiPatterns';
        else if (headingText.includes('typograph')) currentSection = 'typography';
        else if (headingText.includes('layout') || headingText.includes('geometry') || headingText.includes('spatial')) currentSection = 'layout';
        else if (headingText.includes('interaction') || headingText.includes('touch') || headingText.includes('ergonomic')) currentSection = 'interaction';
        else if (headingText.includes('accessib') || headingText.includes('wcag') || headingText.includes('contrast')) currentSection = 'accessibility';
        else if (headingText.includes('motion') || headingText.includes('animation') || headingText.includes('scrolltrigger') || headingText.includes('gsap')) currentSection = 'motion';
        else currentSection = 'general';
        continue;
      }

      // Extract Bullet Points and Numbered Items
      const isBullet = line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s+/.test(line);
      if (isBullet) {
        const itemText = line.replace(/^[-*]\s+|\d+\.\s+/, '').replace(/\*\*/g, '').trim();
        if (itemText.length > 5) {
          // Categorize item
          const lower = itemText.toLowerCase();

          if (lower.includes('avoid') || lower.includes('no generic') || lower.includes('reject') || lower.includes('never') || lower.includes('❌') || currentSection === 'antiPatterns') {
            result.antiPatterns.push(itemText);
          } else if (currentSection === 'principles') {
            result.principles.push(itemText);
          } else if (currentSection === 'typography' || lower.includes('font') || lower.includes('scale ratio') || lower.includes('tracking')) {
            result.typographyRules.push(itemText);
          } else if (currentSection === 'layout' || lower.includes('grid') || lower.includes('split-screen') || lower.includes('asymmetric')) {
            result.layoutRules.push(itemText);
          } else if (currentSection === 'accessibility' || lower.includes('contrast') || lower.includes('wcag') || lower.includes('focus')) {
            result.accessibilityRules.push(itemText);
          } else if (currentSection === 'motion' || lower.includes('gsap') || lower.includes('reduced-motion') || lower.includes('scrolltrigger')) {
            result.motionRules.push(itemText);
          } else if (currentSection === 'interaction' || lower.includes('touch target') || lower.includes('hover')) {
            result.interactionRules.push(itemText);
          } else {
            result.rules.push(itemText);
          }

          if (lower.includes('must') || lower.includes('always') || lower.includes('enforce') || lower.includes('minimum')) {
            result.constraints.push(itemText);
          }
        }
      }
    }

    // Default fallbacks if sections were sparse
    if (result.principles.length === 0 && result.rules.length > 0) {
      result.principles = result.rules.slice(0, 3);
    }

    return result;
  }
}

module.exports = { SkillParser };

/**
 * Formal Design Brief Schema & Deterministic Validator
 * The DesignBrief is the SINGLE SOURCE OF TRUTH for all visual and structural decisions.
 * Rejects incomplete, contradictory, or unvalidated design briefs before reaching DesignEngine.
 */

class DesignBriefValidationError extends Error {
  constructor(message, validationErrors = [], stage = 'SCHEMA_VALIDATION') {
    super(message);
    this.name = 'DesignBriefValidationError';
    this.validationErrors = validationErrors;
    this.stage = stage;
  }
}

class DesignBriefSchema {
  /**
   * Strictly validates a candidate DesignBrief object
   * @param {Object} brief - The synthesized design brief
   * @returns {{ valid: boolean, errors: Array<string> }}
   */
  static validate(brief) {
    const errors = [];

    if (!brief || typeof brief !== 'object') {
      errors.push('DesignBrief must be a non-null object.');
      return { valid: false, errors };
    }

    // 1. Content Profile Validation
    if (!brief.contentProfile || typeof brief.contentProfile !== 'object') {
      errors.push('Missing or invalid contentProfile.');
    } else {
      if (!brief.contentProfile.name) errors.push('contentProfile.name is required.');
      if (!Array.isArray(brief.contentProfile.projects)) errors.push('contentProfile.projects must be an array.');
      if (!brief.contentProfile.signals || typeof brief.contentProfile.signals !== 'object') {
        errors.push('contentProfile.signals must be an object.');
      }
    }

    // 2. Information Architecture & Section Sequence Validation
    if (!brief.informationArchitecture || typeof brief.informationArchitecture !== 'object') {
      errors.push('informationArchitecture must be an object.');
    } else {
      if (!brief.informationArchitecture.modelId) errors.push('informationArchitecture.modelId is required.');
    }

    if (!Array.isArray(brief.sectionSequence) || brief.sectionSequence.length < 2) {
      errors.push('sectionSequence must be an array of at least 2 section IDs.');
    }

    // 3. Layout Grammar Validation
    if (!brief.layoutGrammar || typeof brief.layoutGrammar !== 'object') {
      errors.push('layoutGrammar must be an object.');
    } else {
      if (!brief.layoutGrammar.layoutId) errors.push('layoutGrammar.layoutId is required.');
      if (!brief.layoutGrammar.geometryType) errors.push('layoutGrammar.geometryType is required.');
    }

    // 4. Project Storytelling Validation
    if (!brief.projectStorytelling || typeof brief.projectStorytelling !== 'object') {
      errors.push('projectStorytelling must be an object.');
    } else {
      if (!brief.projectStorytelling.strategyId) errors.push('projectStorytelling.strategyId is required.');
    }

    // 5. Visual Universe & Color System Validation
    if (!brief.visualUniverse || typeof brief.visualUniverse !== 'object') {
      errors.push('visualUniverse must be an object.');
    } else {
      if (!brief.visualUniverse.universeId) errors.push('visualUniverse.universeId is required.');
    }

    if (!brief.colorSystem || typeof brief.colorSystem !== 'object') {
      errors.push('colorSystem must be an object.');
    } else {
      const requiredColors = ['bg', 'surface', 'text', 'border', 'primary'];
      for (const colorKey of requiredColors) {
        if (!brief.colorSystem[colorKey]) {
          errors.push(`colorSystem.${colorKey} is missing.`);
        }
      }
    }

    // 6. Typography System Validation
    if (!brief.typography || typeof brief.typography !== 'object') {
      errors.push('typography must be an object.');
    } else {
      if (!brief.typography.headingFont) errors.push('typography.headingFont is required.');
      if (!brief.typography.bodyFont) errors.push('typography.bodyFont is required.');
    }

    // 7. Motion & Interaction Validation
    if (!brief.motionSystem || typeof brief.motionSystem !== 'object') {
      errors.push('motionSystem must be an object.');
    }

    // 8. Accessibility & Performance Requirements
    if (!brief.accessibilityRequirements || typeof brief.accessibilityRequirements !== 'object') {
      errors.push('accessibilityRequirements must be an object.');
    }

    if (!brief.performanceBudget || typeof brief.performanceBudget !== 'object') {
      errors.push('performanceBudget must be an object.');
    }

    // 9. Responsive Strategy Validation
    if (!brief.responsiveStrategy || typeof brief.responsiveStrategy !== 'object') {
      errors.push('responsiveStrategy must be an object defining mobile/tablet/desktop transformations.');
    }

    // 10. Rationale & Confidence
    if (typeof brief.confidence !== 'number' || brief.confidence < 0 || brief.confidence > 1) {
      errors.push('confidence must be a number between 0 and 1.');
    }

    if (!brief.rationale || typeof brief.rationale !== 'object') {
      errors.push('rationale must be an object explaining design decisions.');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Asserts validity or throws a structured error
   */
  static assertValid(brief) {
    const result = this.validate(brief);
    if (!result.valid) {
      throw new DesignBriefValidationError(
        `DesignBrief validation failed: ${result.errors.join('; ')}`,
        result.errors,
        'DESIGN_BRIEF_VALIDATION'
      );
    }
  }
}

module.exports = {
  DesignBriefSchema,
  DesignBriefValidationError
};

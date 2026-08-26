/**
 * Provider Interface for Design Intelligence External Sources
 * Defines the contract that all design reference providers must implement.
 */

class ProviderInterface {
  constructor(name = 'abstract-provider') {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  /**
   * Checks whether the provider is currently configured and operational
   * @returns {boolean}
   */
  isAvailable() {
    throw new Error('ProviderInterface.isAvailable() must be implemented by subclasses.');
  }

  /**
   * Retrieves design principles, tokens, or evidence for a given content profile
   * @param {Object} context - ContentProfile and extraction options
   * @returns {Promise<Object>} Normalized design evidence
   */
  async fetchDesignEvidence(context = {}) {
    throw new Error('ProviderInterface.fetchDesignEvidence() must be implemented by subclasses.');
  }

  /**
   * Extracts design tokens from a target asset/reference
   * @param {string|Object} target
   * @returns {Promise<Object>}
   */
  async extractTokens(target) {
    throw new Error('ProviderInterface.extractTokens() must be implemented by subclasses.');
  }
}

module.exports = { ProviderInterface };

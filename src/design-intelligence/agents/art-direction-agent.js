/**
 * Art Direction Agent (Phase 28)
 * Determines the foundational Art-Direction profile and designed artifact genre
 * using 70% semantic affinity + 30% controlled exploration to prevent aesthetic monotony.
 */

const { ART_DIRECTION_PROFILES } = require('../../design-engine/art-direction-profiles');
const { VisualWorld } = require('../../design-engine/visual-world');

class ArtDirectionAgent {
  constructor() {
    this.recentArtDirections = [];
  }

  /**
   * Executes Art-Direction selection based on role, signals, and affinity
   * @param {Object} contentProfile
   * @param {Array} recentHistory
   * @param {Object} context
   */
  async execute(contentProfile = {}, recentHistory = [], context = {}) {
    const roleLower = (contentProfile.role || '').toLowerCase();
    const signals = contentProfile.signals || {};

    let affinityProfiles = [];

    // Semantic Affinity Mapping (70% weight)
    if (roleLower.includes('photographer') || roleLower.includes('curator') || roleLower.includes('artist')) {
      affinityProfiles = ['architectural-monograph', 'museum-exhibition-catalog', 'fashion-lookbook', 'minimalist-art-book', 'documentary-portfolio'];
    } else if (roleLower.includes('security') || roleLower.includes('systems') || roleLower.includes('kernel') || roleLower.includes('distributed')) {
      affinityProfiles = ['terminal-systems-interface', 'industrial-technical-manual', 'data-observatory', 'brutalist-archive', 'swiss-international-poster'];
    } else if (roleLower.includes('researcher') || roleLower.includes('scientist') || roleLower.includes('phd') || roleLower.includes('academic')) {
      affinityProfiles = ['academic-research-journal', 'editorial-art-magazine', 'swiss-international-poster', 'newspaper-broadsheet'];
    } else if (roleLower.includes('designer') || roleLower.includes('ui') || roleLower.includes('creative') || roleLower.includes('3d') || roleLower.includes('spatial')) {
      affinityProfiles = ['luxury-creative-studio', 'spatial-3d-environment', 'experimental-digital-lab', 'experimental-typography-poster', 'generative-digital-canvas'];
    } else if (roleLower.includes('founder') || roleLower.includes('ceo') || roleLower.includes('lead') || roleLower.includes('product')) {
      affinityProfiles = ['startup-product-narrative', 'editorial-art-magazine', 'personal-field-notes', 'swiss-international-poster'];
    } else {
      affinityProfiles = Object.keys(ART_DIRECTION_PROFILES);
    }

    // 70% Semantic Affinity vs 30% Controlled Exploration
    const allProfileIds = Object.keys(ART_DIRECTION_PROFILES);
    const useAffinity = Math.random() < 0.70;
    const candidatePool = useAffinity ? affinityProfiles : allProfileIds;

    // Filter against recent history to ensure broad non-repeating visual worlds
    const recentIds = this.recentArtDirections.slice(-5);
    const available = candidatePool.filter(id => !recentIds.includes(id));
    const chosenId = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : candidatePool[Math.floor(Math.random() * candidatePool.length)];

    this.recentArtDirections.push(chosenId);
    if (this.recentArtDirections.length > 10) {
      this.recentArtDirections.shift();
    }

    const profile = ART_DIRECTION_PROFILES[chosenId] || ART_DIRECTION_PROFILES['swiss-international-poster'];
    const visualWorld = VisualWorld.getWorld(chosenId);

    return {
      agent: 'art-direction-agent',
      decision: {
        profileId: profile.id,
        name: profile.name,
        artifactGenre: profile.artifactGenre,
        visualWorld,
        profile
      }
    };
  }
}

module.exports = { ArtDirectionAgent };

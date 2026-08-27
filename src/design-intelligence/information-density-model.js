/**
 * 🏛️ Information Density Model (Phase 42)
 * Dynamically balances cognitive load and physical viewport capacity.
 * 
 * Invariants:
 * - Sparse profiles are styled with elegant, restrained reading measure (never fake empty space).
 * - Rich profiles are given structured multi-zone containers and tabular telemetry (never compressed into card grids).
 */

class InformationDensityModel {
  /**
   * Computes optimal information density profile from developer evidence
   * @param {Object} profile - Normalized developer profile
   * @returns {Object} Density profile & viewport layout recommendations
   */
  static computeDensityProfile(profile = {}) {
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    const research = Array.isArray(profile.research || profile.publications) ? (profile.research || profile.publications) : [];
    const skills = Array.isArray(profile.skills) ? profile.skills : (typeof profile.skills === 'string' ? profile.skills.split(',') : []);

    let totalDataPoints = projects.length * 4 + experience.length * 3 + research.length * 4 + Math.min(10, skills.length);

    let profileMode = 'BALANCED';
    let containerMax = '1200px';
    let readingMeasure = '720px';
    let sectionGap = '5rem';

    if (totalDataPoints <= 8) {
      profileMode = 'SPARSE_RESTRAINED';
      containerMax = '860px';
      readingMeasure = '680px';
      sectionGap = '4rem';
    } else if (totalDataPoints >= 24) {
      profileMode = 'RICH_COMPREHENSIVE';
      containerMax = '1440px';
      readingMeasure = '840px';
      sectionGap = '6.5rem';
    }

    return {
      profileMode,
      totalDataPoints,
      containerMax,
      readingMeasure,
      sectionGap,
      isSparse: profileMode === 'SPARSE_RESTRAINED',
      isRich: profileMode === 'RICH_COMPREHENSIVE'
    };
  }
}

module.exports = { InformationDensityModel };

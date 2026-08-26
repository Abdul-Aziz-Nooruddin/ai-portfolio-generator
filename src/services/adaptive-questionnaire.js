/**
 * 🏛️ Adaptive Questionnaire Engine (Phase 31)
 * Inspects already known profile data (from GitHub, Resume, or previous answers)
 * and dynamically asks ONLY missing, ambiguous, or high-value questions.
 */

class AdaptiveQuestionnaire {
  /**
   * Generates tailored question sequence based on current profile completeness
   * @param {Object} currentProfile - partial profile data
   * @returns {Array<Object>} List of targeted questions
   */
  static getAdaptiveQuestions(currentProfile = {}) {
    const knownFields = new Set();
    const questions = [];

    if (currentProfile.name && currentProfile.name !== 'Creative Developer') knownFields.add('name');
    if (currentProfile.role && currentProfile.role.length > 3) knownFields.add('role');
    if (currentProfile.skills && currentProfile.skills.length >= 4) knownFields.add('skills');
    if (currentProfile.projects && currentProfile.projects.length >= 2) knownFields.add('projects');
    if (currentProfile.experience && currentProfile.experience.length >= 1) knownFields.add('experience');
    if (currentProfile.tagline || currentProfile.bio) knownFields.add('bio');

    // 1. Name Question (If missing)
    if (!knownFields.has('name')) {
      questions.push({
        id: 'name',
        title: "What's your full name?",
        placeholder: 'e.g. Maya Lin',
        type: 'text',
        required: true
      });
    }

    // 2. Role & Discipline (If missing or generic)
    if (!knownFields.has('role')) {
      questions.push({
        id: 'role',
        title: "What's your primary role or technical specialization?",
        placeholder: 'e.g. Distributed Systems Engineer / 3D Creative Developer',
        type: 'text',
        required: true
      });
    }

    // 3. Best Project Highlight (Always valuable for storytelling)
    if (!knownFields.has('projects')) {
      questions.push({
        id: 'flagship_project',
        title: 'Tell us about your best project or technical achievement:',
        placeholder: 'Project name, what real-world problem it solved, and the key technologies used...',
        type: 'textarea',
        required: true
      });
      questions.push({
        id: 'project_tech',
        title: 'What core technologies or tools powered this project?',
        placeholder: 'e.g. Rust, Tokio, eBPF, WebGL',
        type: 'text',
        required: false
      });
    }

    // 4. Core Strengths & Skills (If missing)
    if (!knownFields.has('skills')) {
      questions.push({
        id: 'skills',
        title: 'What are your top 5 technical skills or tools?',
        placeholder: 'e.g. TypeScript, React, Go, Docker, Kubernetes',
        type: 'text',
        required: true
      });
    }

    // 5. Narrative / Opportunities (High-value differentiator)
    if (!knownFields.has('bio')) {
      questions.push({
        id: 'tagline',
        title: 'In one sentence, what makes your work unique or what are you building next?',
        placeholder: 'e.g. Designing low-latency distributed databases with zero-copy networking.',
        type: 'text',
        required: false
      });
    }

    return questions;
  }
}

module.exports = { AdaptiveQuestionnaire };

const { ProjectStorytellingAffinityAgent } = require('./project-storytelling-affinity-agent');

class ProjectStorytellingAgent {
  constructor() {
    this.affinityAgent = new ProjectStorytellingAffinityAgent();
  }

  async execute(contentProfile, iaStrategy = {}, context = {}) {
    const res = await this.affinityAgent.execute(contentProfile, iaStrategy, [], context);
    return {
      ...res,
      agent: 'project-storytelling-agent'
    };
  }
}

module.exports = { ProjectStorytellingAgent };

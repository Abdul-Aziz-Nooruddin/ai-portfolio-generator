/**
 * 🏛️ Semantic Content Graph Engine (Phase 47)
 * Models explicit semantic and structural relationships between entities and facts.
 * Guarantees that child facts (architectures, metrics, challenges, decisions, tradeoffs,
 * responsibilities, outcomes, coursework, findings) remain structurally bound to their parent entities.
 * 
 * Invariant: No child fact may exist as an orphan without an explicit parent entity edge.
 */

const { ContentAtom } = require('./content-atom');

const NODE_TYPES = {
  PERSON: 'PERSON',
  IDENTITY: 'IDENTITY',
  PROJECT: 'PROJECT',
  EXPERIENCE: 'EXPERIENCE',
  EDUCATION: 'EDUCATION',
  PUBLICATION: 'PUBLICATION',
  SKILL: 'SKILL',
  CUSTOM_EVIDENCE: 'CUSTOM_EVIDENCE',
  QUESTIONNAIRE: 'QUESTIONNAIRE'
};

const EDGE_TYPES = {
  OWNS: 'OWNS',
  HAS_ARCHITECTURE: 'HAS_ARCHITECTURE',
  HAS_METRIC: 'HAS_METRIC',
  HAS_DECISION: 'HAS_DECISION',
  HAS_CHALLENGE: 'HAS_CHALLENGE',
  HAS_TRADEOFF: 'HAS_TRADEOFF',
  HAS_RESPONSIBILITY: 'HAS_RESPONSIBILITY',
  HAS_OUTCOME: 'HAS_OUTCOME',
  HAS_COURSEWORK: 'HAS_COURSEWORK',
  HAS_METHODOLOGY: 'HAS_METHODOLOGY',
  HAS_FINDINGS: 'HAS_FINDINGS',
  EVIDENCED_BY: 'EVIDENCED_BY',
  SUPPORTS: 'SUPPORTS'
};

class SemanticContentGraph {
  constructor() {
    this.nodes = new Map(); // nodeId -> Node
    this.edges = [];        // Array of { from, to, type, metadata }
  }

  addNode(id, type, data = {}) {
    const node = { id, type, data, edges: [] };
    this.nodes.set(id, node);
    return node;
  }

  addEdge(fromId, toId, type, metadata = {}) {
    const edge = { from: fromId, to: toId, type, metadata };
    this.edges.push(edge);
    if (this.nodes.has(fromId)) {
      this.nodes.get(fromId).edges.push(edge);
    }
    return edge;
  }

  getNode(id) {
    return this.nodes.get(id);
  }

  /**
   * Builds a Semantic Content Graph from a normalized profile or raw input
   */
  static buildFromProfile(profile = {}) {
    const graph = new SemanticContentGraph();
    const rootPersonId = 'node-person-root';
    graph.addNode(rootPersonId, NODE_TYPES.PERSON, {
      name: profile.name || 'Developer',
      role: profile.role || 'Engineer',
      tagline: profile.tagline || '',
      bio: profile.bio || ''
    });

    // 1. Identity Sub-Graph
    const identityId = 'node-identity';
    graph.addNode(identityId, NODE_TYPES.IDENTITY, {
      contact: profile.contact || {},
      socialLinks: profile.socialLinks || {},
      location: profile.location || profile.contact?.location || ''
    });
    graph.addEdge(rootPersonId, identityId, EDGE_TYPES.OWNS);

    // 2. Project Sub-Graph
    const projects = Array.isArray(profile.projects) ? profile.projects : [];
    projects.forEach((proj, pIdx) => {
      const projId = `node-project-${pIdx}`;
      graph.addNode(projId, NODE_TYPES.PROJECT, {
        index: pIdx,
        name: proj.name,
        desc: proj.desc || proj.description || '',
        tech: proj.tech || proj.tags || '',
        live: proj.live || proj.liveUrl || '',
        github: proj.github || proj.repoUrl || ''
      });
      graph.addEdge(rootPersonId, projId, EDGE_TYPES.OWNS);

      if (proj.architecture) {
        const archId = `${projId}-arch`;
        graph.addNode(archId, NODE_TYPES.CUSTOM_EVIDENCE, { text: proj.architecture });
        graph.addEdge(projId, archId, EDGE_TYPES.HAS_ARCHITECTURE);
      }
      if (proj.metrics) {
        const metricId = `${projId}-metric`;
        graph.addNode(metricId, NODE_TYPES.CUSTOM_EVIDENCE, { text: proj.metrics });
        graph.addEdge(projId, metricId, EDGE_TYPES.HAS_METRIC);
      }
      if (proj.challenges) {
        const challId = `${projId}-challenge`;
        graph.addNode(challId, NODE_TYPES.CUSTOM_EVIDENCE, { text: proj.challenges });
        graph.addEdge(projId, challId, EDGE_TYPES.HAS_CHALLENGE);
      }
      if (proj.decisions) {
        const decId = `${projId}-decision`;
        graph.addNode(decId, NODE_TYPES.CUSTOM_EVIDENCE, { text: proj.decisions });
        graph.addEdge(projId, decId, EDGE_TYPES.HAS_DECISION);
      }
      if (proj.tradeoffs) {
        const tradeId = `${projId}-tradeoff`;
        graph.addNode(tradeId, NODE_TYPES.CUSTOM_EVIDENCE, { text: proj.tradeoffs });
        graph.addEdge(projId, tradeId, EDGE_TYPES.HAS_TRADEOFF);
      }
    });

    // 3. Experience Sub-Graph
    const experience = Array.isArray(profile.experience) ? profile.experience : [];
    experience.forEach((exp, eIdx) => {
      const expId = `node-exp-${eIdx}`;
      graph.addNode(expId, NODE_TYPES.EXPERIENCE, {
        index: eIdx,
        company: exp.company || exp.org,
        role: exp.role || exp.title,
        period: exp.period || exp.duration,
        desc: exp.desc || exp.summary || ''
      });
      graph.addEdge(rootPersonId, expId, EDGE_TYPES.OWNS);

      if (exp.responsibilities) {
        const respId = `${expId}-resp`;
        graph.addNode(respId, NODE_TYPES.CUSTOM_EVIDENCE, { text: exp.responsibilities });
        graph.addEdge(expId, respId, EDGE_TYPES.HAS_RESPONSIBILITY);
      }
      if (exp.achievements) {
        const achId = `${expId}-ach`;
        graph.addNode(achId, NODE_TYPES.CUSTOM_EVIDENCE, { text: exp.achievements });
        graph.addEdge(expId, achId, EDGE_TYPES.HAS_METRIC);
      }
      if (exp.outcomes) {
        const outId = `${expId}-outcome`;
        graph.addNode(outId, NODE_TYPES.CUSTOM_EVIDENCE, { text: exp.outcomes });
        graph.addEdge(expId, outId, EDGE_TYPES.HAS_OUTCOME);
      }
    });

    // 4. Education Sub-Graph
    const education = Array.isArray(profile.education) ? profile.education : [];
    education.forEach((edu, eduIdx) => {
      const eduId = `node-edu-${eduIdx}`;
      graph.addNode(eduId, NODE_TYPES.EDUCATION, {
        school: edu.school || edu.institution,
        degree: edu.degree,
        period: edu.period || edu.year
      });
      graph.addEdge(rootPersonId, eduId, EDGE_TYPES.OWNS);

      if (edu.coursework) {
        const courseId = `${eduId}-coursework`;
        graph.addNode(courseId, NODE_TYPES.CUSTOM_EVIDENCE, { text: edu.coursework });
        graph.addEdge(eduId, courseId, EDGE_TYPES.HAS_COURSEWORK);
      }
    });

    // 5. Research & Publications Sub-Graph
    const pubs = Array.isArray(profile.publications) ? profile.publications : (Array.isArray(profile.research) ? profile.research : []);
    pubs.forEach((pub, pubIdx) => {
      const pubId = `node-pub-${pubIdx}`;
      graph.addNode(pubId, NODE_TYPES.PUBLICATION, {
        title: pub.title,
        venue: pub.venue,
        year: pub.year,
        doi: pub.doi,
        abstract: pub.abstract
      });
      graph.addEdge(rootPersonId, pubId, EDGE_TYPES.OWNS);

      if (pub.methodology) {
        const methId = `${pubId}-methodology`;
        graph.addNode(methId, NODE_TYPES.CUSTOM_EVIDENCE, { text: pub.methodology });
        graph.addEdge(pubId, methId, EDGE_TYPES.HAS_METHODOLOGY);
      }
      if (pub.findings) {
        const findId = `${pubId}-findings`;
        graph.addNode(findId, NODE_TYPES.CUSTOM_EVIDENCE, { text: pub.findings });
        graph.addEdge(pubId, findId, EDGE_TYPES.HAS_FINDINGS);
      }
    });

    // 6. Custom Fields Sub-Graph
    if (profile.customFields && typeof profile.customFields === 'object') {
      for (const [k, v] of Object.entries(profile.customFields)) {
        if (v !== undefined && v !== null && String(v).trim() !== '') {
          const custId = `node-custom-${k}`;
          graph.addNode(custId, NODE_TYPES.CUSTOM_EVIDENCE, { key: k, value: v });
          graph.addEdge(rootPersonId, custId, EDGE_TYPES.SUPPORTS);
        }
      }
    }

    return graph;
  }
}

module.exports = { SemanticContentGraph, NODE_TYPES, EDGE_TYPES };

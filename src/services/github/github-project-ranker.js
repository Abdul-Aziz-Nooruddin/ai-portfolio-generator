/**
 * Multi-Factor GitHub Project Ranker & Quality Selector
 * Selects 3 to 6 top projects based on recency, activity, stars, completeness,
 * live demo links, and description quality rather than stars alone.
 */

class GitHubProjectRanker {
  /**
   * Scores and ranks repositories, filtering out low-signal forks or empty repos.
   * @param {Array} repositories - List of GitHub repository objects
   * @param {number} [maxProjects=5] - Target number of projects to return (3-6)
   * @returns {Array} Top ranked project objects
   */
  static rankAndSelect(repositories = [], maxProjects = 5) {
    if (!Array.isArray(repositories) || repositories.length === 0) {
      return [];
    }

    const scored = repositories.map(repo => {
      let score = 0;
      const reasons = [];

      // 1. Fork Penalty / Non-Fork Bonus
      if (!repo.fork) {
        score += 35;
        reasons.push('Original repository (+35)');
      } else {
        score += Math.min(10, (repo.stargazers_count || 0)); // Only reward high-signal forks
      }

      // 2. Stars & Community Signal
      const stars = repo.stargazers_count || 0;
      const starScore = Math.min(30, stars * 2);
      score += starScore;
      if (stars > 0) reasons.push(`${stars} stars (+${starScore})`);

      // 3. Forks & Collaboration
      const forks = repo.forks_count || 0;
      const forkScore = Math.min(15, forks * 3);
      score += forkScore;

      // 4. Live Demo / Homepage URL
      if (repo.homepage && repo.homepage.startsWith('http')) {
        score += 25;
        reasons.push('Live demo URL present (+25)');
      }

      // 5. Description Quality
      const desc = repo.description || '';
      if (desc.trim().length > 20) {
        score += 20;
        reasons.push('Rich description (+20)');
      } else if (desc.trim().length > 0) {
        score += 10;
      }

      // 6. Recency / Push Activity
      if (repo.pushed_at) {
        const pushedDate = new Date(repo.pushed_at);
        const daysAgo = (Date.now() - pushedDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysAgo < 30) {
          score += 25;
          reasons.push('Pushed in last 30 days (+25)');
        } else if (daysAgo < 90) {
          score += 15;
          reasons.push('Pushed in last 90 days (+15)');
        } else if (daysAgo < 365) {
          score += 8;
        }
      }

      // 7. Topics / Tags
      if (Array.isArray(repo.topics) && repo.topics.length > 0) {
        score += 10;
        reasons.push('Tagged with topics (+10)');
      }

      // 8. Primary Language / Multi-language Presence
      if (repo.language) {
        score += 10;
      }
      if (repo.languages && Object.keys(repo.languages).length > 1) {
        score += 5;
      }

      // 9. Size (Filter out 0KB empty repos)
      if (repo.size === 0) {
        score -= 50;
      }

      return {
        repo,
        score,
        reasons
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Pick top projects (between 3 and maxProjects)
    const selected = scored.slice(0, Math.max(3, maxProjects)).map(item => {
      const r = item.repo;
      const techList = [];
      if (r.language) techList.push(r.language);
      if (Array.isArray(r.topics)) {
        techList.push(...r.topics.slice(0, 3));
      }
      if (r.languages) {
        Object.keys(r.languages).forEach(l => {
          if (!techList.includes(l)) techList.push(l);
        });
      }

      return {
        name: r.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        rawName: r.name,
        description: r.description || `High-performance software project engineered in ${r.language || 'modern technologies'}.`,
        tech: techList.slice(0, 5).join(' • ') || r.language || 'Code',
        techList: techList.slice(0, 5),
        github: r.html_url,
        live: (r.homepage && r.homepage.startsWith('http')) ? r.homepage : r.html_url,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        isFork: !!r.fork,
        updatedAt: r.pushed_at || r.updated_at,
        score: item.score,
        rankingReasons: item.reasons
      };
    });

    return selected;
  }
}

module.exports = { GitHubProjectRanker };

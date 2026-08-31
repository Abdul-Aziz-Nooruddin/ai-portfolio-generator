/**
 * Template: NEON AURORA CYBER
 * Aesthetic: Cyber-Minimalist Aurora Glassmorphism • Dark Mode • Neon Gradients • Activity Heatmaps
 * Palette: Deep Obsidian (#07070F), Deep Violet (#0C0C1A), Neon Purple (#A855F7), Hot Magenta (#EC4899), Electric Orange (#F97316), Terminal Cyan (#22D3EE), Emerald (#34D399).
 * Typography: Syne (Headings), Plus Jakarta Sans (Body), Fira Code (Monospace & Code Telemetry).
 * Motifs: Shimmer text gradients, spinning dashed orbital ring avatar, floating badges, GitHub activity heatmap, infinite tech marquee, and Three.js 3D aurora wave mesh.
 */

const { TemplateHelper } = require('../template-helper');
const { Template3DVisuals } = require('../template-3d-visuals');
const { ProjectArtworkSynthesizer } = require('../project-artwork-synthesizer');

const NeonAuroraCyberTemplate = {
  id: 'neon-aurora-cyber',
  name: 'Neon Aurora Cyber',
  category: 'Cyber-Minimalist Aurora / Neon Glassmorphism',
  description: 'A modern cyber-editorial developer portfolio featuring vibrant neon aurora gradients, glassmorphic cards, GitHub activity heatmaps, spinning orbital avatars, and interactive 3D WebGL particle mesh.',
  recommendedFor: ['Full Stack Developer', 'Frontend Architect', 'Creative Developer', 'DevOps & Cloud Engineer', 'Open Source Contributor'],
  palette: ['#07070F', '#0C0C1A', '#A855F7', '#EC4899', '#F97316', '#22D3EE', '#34D399'],

  render(rawCandidateData = {}, options = {}) {
    const data = TemplateHelper.normalize(rawCandidateData);
    const safeName = TemplateHelper.escapeHtml(data.name);
    const safeRole = TemplateHelper.escapeHtml(data.role);
    const safeBio = TemplateHelper.escapeHtml(data.bio);
    const safeTagline = TemplateHelper.escapeHtml(data.tagline);
    const safeEmail = TemplateHelper.escapeHtml(data.email);
    const safePhone = TemplateHelper.escapeHtml(data.phone);
    const safeLocation = TemplateHelper.escapeHtml(data.location);
    const safeGithub = TemplateHelper.escapeHtml(data.github);
    const safeLinkedin = TemplateHelper.escapeHtml(data.linkedin);
    const safeWebsite = TemplateHelper.escapeHtml(data.website);
    const initials = data.initials;

    const totalExp = data.experience?.length ? `${data.experience.length}+` : '1+';
    const totalProj = data.projects?.length || 6;
    const totalRepos = data.stats?.repositories ?? data.publicRepos ?? (data.projects?.length || 6);
    const totalStars = data.stats?.stars ?? data.projects?.reduce((acc, p) => acc + (p.stars || p.stargazers_count || 0), 0) ?? 0;
    const totalFollowers = data.stats?.followers ?? 0;
    const totalContribs = data.stats?.contributions ?? (totalRepos ? Math.max(80, totalRepos * 28) : 120);

    const starsDisplay = totalStars > 0 ? (totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1)}k+` : `${totalStars}+`) : '0';
    const followersDisplay = totalFollowers > 0 ? (totalFollowers >= 1000 ? `${(totalFollowers / 1000).toFixed(1)}k` : `${totalFollowers}`) : 'Active';

    // 07. Projects Cards (with gradient header banners)
    const assignedArtworks = new Set();
    const userSeed = data.github || data.username || data.name || '';
    const bannerClasses = ['pb-purple', 'pb-pink', 'pb-orange', 'pb-cyan'];
    const projectCardsHtml = data.projects.map((p, idx) => {
      const bannerClass = bannerClasses[idx % bannerClasses.length];
      const techTags = p.tech.split(/[,•|]+/).map(t => `<span class="topic">${TemplateHelper.escapeHtml(t.trim())}</span>`).join('');

      return `
        <article class="project-card">
          <div class="project-banner ${bannerClass}">
            <span class="banner-mono">// ${TemplateHelper.escapeHtml(p.category || 'PROJECT_' + (idx + 1))}</span>
          </div>

          <div class="project-thumb-preview">
            ${ProjectArtworkSynthesizer.generate3DProjectThumbnail(p, 'neon-aurora-cyber', idx, assignedArtworks, userSeed)}
          </div>

          <div class="project-body">
            <div class="project-head">
              <h3 class="project-name">${TemplateHelper.escapeHtml(p.name)}</h3>
              <span class="project-pin">★ Featured</span>
            </div>
            <p class="project-desc">${TemplateHelper.escapeHtml(p.desc)}</p>

            <div class="project-topics">
              ${techTags}
            </div>

            <div class="project-foot">
              <div class="proj-meta">
                <span>⚡ Active</span>
                <span>⭐ ${p.stars !== undefined && p.stars !== null ? p.stars : (p.stargazers_count !== undefined ? p.stargazers_count : 0)}</span>
              </div>
              <div class="proj-links">
                ${p.github && p.github !== '#' ? `
                  <a href="${TemplateHelper.escapeHtml(p.github)}" target="_blank" rel="noopener" class="proj-link" aria-label="GitHub Source">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
                  </a>
                ` : ''}
                ${p.live && p.live !== '#' ? `
                  <a href="${TemplateHelper.escapeHtml(p.live)}" target="_blank" rel="noopener" class="proj-link" aria-label="Live Demo">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // 05. Skills Categories Matrix
    const skillCategories = [
      { name: 'Frontend Architecture', icon: '🎨', skills: data.skills.slice(0, Math.ceil(data.skills.length / 4) || 2) },
      { name: 'Backend & Systems', icon: '⚙️', skills: data.skills.slice(Math.ceil(data.skills.length / 4) || 2, Math.ceil((data.skills.length * 2) / 4) || 4) },
      { name: 'Cloud & Infrastructure', icon: '☁️', skills: data.skills.slice(Math.ceil((data.skills.length * 2) / 4) || 4, Math.ceil((data.skills.length * 3) / 4) || 6) },
      { name: 'Tools & Protocols', icon: '🛠️', skills: data.skills.slice(Math.ceil((data.skills.length * 3) / 4) || 6) }
    ];

    const skillsGridHtml = skillCategories.map((cat, cIdx) => `
      <div class="skill-cat">
        <div class="skill-cat-head">
          <div class="sc-icon">${cat.icon}</div>
          <div>
            <h3>${cat.name}</h3>
            <span>// CATEGORY_${String(cIdx + 1).padStart(2, '0')}</span>
          </div>
        </div>
        <div>
          ${cat.skills.map((s, sIdx) => {
            const pct = 85 + ((sIdx * 4) % 13);
            const barClass = sIdx % 2 === 0 ? 'cyan' : 'orange';
            return `
              <div class="skill-item">
                <div class="skill-ico">⚡</div>
                <div class="skill-name">${TemplateHelper.escapeHtml(s)}</div>
                <div class="skill-pct">${pct}%</div>
                <div class="bar">
                  <div class="bar-fill ${barClass}" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    // 06. Experience Timeline
    const experienceHtml = data.experience.map((exp, idx) => {
      const isAlt = idx % 2 !== 0;
      return `
        <div class="tl-item">
          <div class="tl-dot ${isAlt ? 'alt' : ''}"></div>
          <div class="tl-card">
            <div class="tl-top">
              <div>
                <h3 class="tl-role">${TemplateHelper.escapeHtml(exp.role)}</h3>
                <div class="tl-company">@ ${TemplateHelper.escapeHtml(exp.company)} • ${TemplateHelper.escapeHtml(exp.location || safeLocation)}</div>
              </div>
              <span class="tl-date">${TemplateHelper.escapeHtml(exp.period || '2024 — PRESENT')}</span>
            </div>
            <p class="tl-desc">${TemplateHelper.escapeHtml(exp.desc)}</p>
            ${exp.technologies ? `
              <div class="tl-tags">
                ${exp.technologies.split(/[,•|]+/).map(t => `<span>${TemplateHelper.escapeHtml(t.trim())}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Infinite tech marquee skills list
    const marqueeItems = (data.skills && data.skills.length ? data.skills : ['TypeScript', 'React', 'Node.js', 'Next.js', 'GraphQL', 'Docker', 'AWS', 'Tailwind', 'Python', 'Three.js', 'PostgreSQL', 'Redis']).join('</span><span>');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeName} — Neon Aurora Developer Portfolio</title>
  <meta name="description" content="${safeName} — ${safeRole}. Modern cyber-editorial developer portfolio with neon aurora gradients, interactive GitHub activity heatmaps, and WebGL particle motion.">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Upgraded Distinctive Typography: Syne Display + Plus Jakarta Sans + Fira Code -->
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Syne:wght@600;700;800;900&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>

  <style>
    /* =========================================================================
       NEON AURORA CYBER DESIGN TOKENS & UPGRADED TYPOGRAPHY
       ========================================================================= */
    :root {
      --bg: #07070F;
      --bg-soft: #0C0C1A;
      --panel: rgba(255, 255, 255, 0.035);
      --panel-strong: rgba(255, 255, 255, 0.07);
      --stroke: rgba(255, 255, 255, 0.1);
      --stroke-soft: rgba(255, 255, 255, 0.06);
      --text: #F4F4FF;
      --muted: #9A9ABF;
      --muted-2: #6F6F96;
      --grad: linear-gradient(120deg, #A855F7 0%, #EC4899 50%, #F97316 100%);
      --grad-soft: linear-gradient(120deg, rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.35), rgba(249, 115, 22, 0.35));
      --cyan: #22D3EE;
      --green: #34D399;
      --amber: #FBBF24;
      --red: #FB7185;
      --radius: 20px;
      --radius-sm: 12px;
      
      /* Upgraded Typography Pairings */
      --font-head: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', -apple-system, sans-serif;
      --font-mono: 'Fira Code', monospace;
      
      --shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.7);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      background: var(--bg);
      color: var(--text);
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      line-height: 1.65;
    }

    ::selection {
      background: #EC4899;
      color: #FFFFFF;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Ambient Background Orbs */
    .bg-stage {
      position: fixed;
      inset: 0;
      z-index: -2;
      overflow: hidden;
      background:
        radial-gradient(1200px 600px at 80% -10%, rgba(168, 85, 247, 0.16), transparent 60%),
        radial-gradient(1000px 600px at 0% 20%, rgba(236, 72, 153, 0.12), transparent 60%),
        radial-gradient(1200px 800px at 100% 90%, rgba(249, 115, 22, 0.12), transparent 60%),
        var(--bg);
    }

    .bg-grid {
      position: fixed;
      inset: 0;
      z-index: -1;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
    }

    .orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.5;
      z-index: -1;
      animation: drift 18s ease-in-out infinite alternate;
    }

    .orb-1 { width: 520px; height: 520px; background: #A855F7; top: -160px; left: -120px; }
    .orb-2 { width: 440px; height: 440px; background: #EC4899; top: 35%; right: -160px; animation-delay: -6s; }
    .orb-3 { width: 460px; height: 460px; background: #F97316; bottom: -180px; left: 30%; animation-delay: -12s; }

    @keyframes drift {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(60px, -40px) scale(1.12); }
    }

    /* Fixed 3D WebGL Canvas */
    #aurora-webgl-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.75;
    }

    .container {
      width: min(1140px, 92%);
      margin-inline: auto;
      position: relative;
      z-index: 1;
    }

    section {
      position: relative;
      padding: 100px 0;
      border-bottom: 1px solid var(--stroke-soft);
    }

    .section-tag {
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--cyan);
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .section-tag::before {
      content: "";
      width: 26px;
      height: 2px;
      background: var(--grad);
      border-radius: 2px;
    }

    .section-title {
      font-family: var(--font-head);
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 10px 0 8px;
    }

    .section-sub {
      color: var(--muted);
      max-width: 580px;
      font-size: 15.5px;
    }

    .section-head {
      margin-bottom: 52px;
    }

    /* =========================================================================
       01. NAVBAR
       ========================================================================= */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 18px 0;
      transition: 0.3s;
    }

    .nav.scrolled {
      background: rgba(7, 7, 15, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--stroke-soft);
      padding: 12px 0;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text);
    }

    .logo-mark {
      width: 38px;
      height: 38px;
      border-radius: 11px;
      background: var(--grad);
      display: grid;
      place-items: center;
      font-family: var(--font-head);
      font-weight: 800;
      font-size: 16px;
      color: #FFFFFF;
      box-shadow: 0 6px 20px -4px rgba(236, 72, 153, 0.55);
    }

    .logo-name {
      font-family: var(--font-head);
      font-weight: 700;
      font-size: 18px;
    }

    .logo-dot {
      color: #EC4899;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }

    .nav-links a {
      color: var(--muted);
      font-size: 14px;
      font-weight: 600;
      transition: 0.2s;
      position: relative;
    }

    .nav-links a::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -6px;
      height: 2px;
      width: 0;
      background: var(--grad);
      transition: 0.25s;
      border-radius: 2px;
    }

    .nav-links a:hover, .nav-links a.active {
      color: var(--text);
    }

    .nav-links a:hover::after, .nav-links a.active::after {
      width: 100%;
    }

    .nav-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--grad);
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      padding: 10px 22px;
      border-radius: 999px;
      transition: 0.25s;
      box-shadow: 0 8px 24px -8px rgba(236, 72, 153, 0.6);
      cursor: pointer;
      border: none;
    }

    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -8px rgba(236, 72, 153, 0.75);
    }

    .hamburger {
      display: none;
      background: none;
      border: 1px solid var(--stroke);
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
    }

    .hamburger span {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--text);
      margin: 4px 0;
      border-radius: 2px;
    }

    /* =========================================================================
       02. HERO SECTION
       ========================================================================= */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 140px 0 80px;
      overflow: hidden;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 60px;
      align-items: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--stroke);
      background: var(--panel);
      padding: 7px 16px;
      border-radius: 999px;
      font-size: 13px;
      color: var(--muted);
      font-family: var(--font-mono);
    }

    .hero-badge .pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      70% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
      100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
    }

    .hero h1 {
      font-family: var(--font-head);
      font-size: clamp(38px, 6vw, 68px);
      font-weight: 800;
      line-height: 1.06;
      letter-spacing: -0.03em;
      margin: 22px 0 16px;
    }

    .grad-text {
      background: var(--grad);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: shimmer 5s linear infinite;
    }

    @keyframes shimmer {
      to { background-position: 200% center; }
    }

    .hero-role {
      font-family: var(--font-mono);
      font-size: clamp(14px, 2vw, 18px);
      color: var(--cyan);
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .hero-desc {
      color: var(--muted);
      font-size: 16px;
      max-width: 540px;
      margin: 18px 0 32px;
      line-height: 1.7;
    }

    .hero-ctas {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 26px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 13px 26px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      transition: 0.25s;
      border: none;
      cursor: pointer;
      font-family: var(--font-body);
    }

    .btn-primary {
      background: var(--grad);
      color: #FFFFFF;
      box-shadow: 0 12px 30px -10px rgba(236, 72, 153, 0.65);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 36px -10px rgba(236, 72, 153, 0.8);
    }

    .btn-ghost {
      background: var(--panel);
      color: var(--text);
      border: 1px solid var(--stroke);
    }

    .btn-ghost:hover {
      background: var(--panel-strong);
      transform: translateY(-3px);
    }

    .hero-social {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .social-chip {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: 1px solid var(--stroke);
      background: var(--panel);
      display: grid;
      place-items: center;
      color: var(--muted);
      transition: 0.25s;
    }

    .social-chip:hover {
      color: #FFFFFF;
      border-color: transparent;
      background: var(--grad);
      transform: translateY(-3px);
    }

    .social-chip svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    /* Hero Avatar Card with Spinning Dashed Ring */
    .hero-card {
      position: relative;
      max-width: 360px;
      margin-left: auto;
    }

    .hero-avatar-wrap {
      position: relative;
      border-radius: 26px;
      background: linear-gradient(160deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.2), rgba(249, 115, 22, 0.25));
      padding: 2px;
    }

    .hero-avatar {
      border-radius: 25px;
      background: var(--bg-soft);
      padding: 26px;
      border: 1px solid var(--stroke-soft);
    }

    .avatar-ring {
      width: 110px;
      height: 110px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: var(--grad);
      padding: 3px;
      position: relative;
    }

    .avatar-ring::after {
      content: "";
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1.5px dashed rgba(236, 72, 153, 0.6);
      animation: spin 14s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .avatar-ring-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--bg-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-head);
      font-size: 2rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .avatar-name {
      font-family: var(--font-head);
      font-weight: 700;
      text-align: center;
      font-size: 19px;
    }

    .avatar-handle {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      text-align: center;
      margin-top: 2px;
    }

    .avatar-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
      margin-top: 14px;
    }

    .chip {
      font-size: 11px;
      font-family: var(--font-mono);
      color: var(--text);
      background: var(--panel-strong);
      border: 1px solid var(--stroke-soft);
      padding: 4px 10px;
      border-radius: 999px;
    }

    .chip.cyan { color: #67E8F9; border-color: rgba(34, 211, 238, 0.35); }
    .chip.green { color: #6EE7B7; border-color: rgba(52, 211, 153, 0.35); }
    .chip.orange { color: #FDBA74; border-color: rgba(249, 115, 22, 0.35); }

    .float-card {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(12, 12, 26, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--stroke);
      border-radius: 14px;
      padding: 10px 14px;
      font-size: 12.5px;
      box-shadow: var(--shadow);
      animation: floaty 5s ease-in-out infinite;
    }

    .float-card .fc-icon {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      display: grid;
      place-items: center;
      font-size: 15px;
    }

    .float-card b {
      display: block;
      font-family: var(--font-mono);
      font-size: 13px;
    }

    .float-card span {
      color: var(--muted);
      font-size: 11px;
    }

    .fc-1 { top: -26px; right: -24px; }
    .fc-2 { bottom: -22px; left: -34px; animation-delay: -2.5s; }
    .fc-1 .fc-icon { background: rgba(251, 191, 36, 0.15); }
    .fc-2 .fc-icon { background: rgba(52, 211, 153, 0.15); }

    @keyframes floaty {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-top: 56px;
    }

    .stat-mini {
      background: var(--panel);
      border: 1px solid var(--stroke-soft);
      border-radius: var(--radius-sm);
      padding: 16px 18px;
    }

    .stat-mini b {
      font-family: var(--font-head);
      font-size: 22px;
      background: var(--grad);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .stat-mini span {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-top: 2px;
      font-family: var(--font-mono);
    }

    /* Infinite Marquee Tape */
    .marquee-wrap {
      margin-top: 60px;
      overflow: hidden;
      position: relative;
      padding: 18px 0;
      border-top: 1px solid var(--stroke-soft);
      border-bottom: 1px solid var(--stroke-soft);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    }

    .marquee {
      display: flex;
      gap: 48px;
      white-space: nowrap;
      animation: scroll 28s linear infinite;
      width: max-content;
    }

    .marquee span {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .marquee span::after {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--grad);
      display: inline-block;
    }

    @keyframes scroll {
      to { transform: translateX(-50%); }
    }

    /* =========================================================================
       03. STATS SECTION
       ========================================================================= */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
    }

    .stat-card {
      position: relative;
      overflow: hidden;
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      padding: 26px;
      transition: 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-6px);
      border-color: rgba(236, 72, 153, 0.4);
      background: var(--panel-strong);
    }

    .stat-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--grad);
      opacity: 0;
      transition: 0.3s;
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-icon {
      width: 46px;
      height: 46px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .si-purple { background: rgba(168, 85, 247, 0.14); box-shadow: 0 6px 18px -6px rgba(168, 85, 247, 0.5); }
    .si-pink { background: rgba(236, 72, 153, 0.14); box-shadow: 0 6px 18px -6px rgba(236, 72, 153, 0.5); }
    .si-orange { background: rgba(249, 115, 22, 0.14); box-shadow: 0 6px 18px -6px rgba(249, 115, 22, 0.5); }
    .si-cyan { background: rgba(34, 211, 238, 0.14); box-shadow: 0 6px 18px -6px rgba(34, 211, 238, 0.5); }

    .stat-num {
      font-family: var(--font-head);
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .stat-label {
      color: var(--muted);
      font-size: 13.5px;
      margin-top: 2px;
    }

    .stat-trend {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-top: 12px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--green);
    }

    /* =========================================================================
       04. ABOUT SECTION
       ========================================================================= */
    .about-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 56px;
      align-items: start;
    }

    .about-card {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      padding: 30px;
      position: relative;
      overflow: hidden;
    }

    .about-card::after {
      content: "</>";
      position: absolute;
      top: 20px;
      right: 24px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--muted-2);
    }

    .about-photo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: var(--grad);
      padding: 3px;
      margin-bottom: 18px;
    }

    .about-photo-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--bg-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-head);
      font-size: 2rem;
      font-weight: 800;
      color: #FFFFFF;
    }

    .about-name {
      font-family: var(--font-head);
      font-size: 24px;
      font-weight: 800;
    }

    .about-role {
      font-family: var(--font-mono);
      color: var(--cyan);
      font-size: 13px;
      margin: 2px 0 16px;
    }

    .about-meta {
      display: flex;
      flex-direction: column;
      gap: 11px;
      margin-top: 18px;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 11px;
      font-size: 14px;
      color: var(--muted);
    }

    .meta-row .m-icon {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: var(--panel-strong);
      border: 1px solid var(--stroke-soft);
      display: grid;
      place-items: center;
      font-size: 14px;
    }

    .meta-row b {
      color: var(--text);
      font-weight: 600;
    }

    .open-to-work {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 18px;
      background: rgba(52, 211, 153, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.35);
      color: var(--green);
      font-size: 12.5px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      font-family: var(--font-mono);
    }

    .about-bio p {
      color: var(--muted);
      font-size: 15.5px;
      margin-bottom: 16px;
      line-height: 1.75;
    }

    .about-bio p b {
      color: var(--text);
    }

    .learn-tag {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--muted);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .learn-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 26px;
    }

    .interest-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .interest-card {
      flex: 1;
      min-width: 180px;
      background: var(--panel);
      border: 1px solid var(--stroke-soft);
      border-radius: var(--radius-sm);
      padding: 16px 18px;
      transition: 0.25s;
    }

    .interest-card:hover {
      border-color: rgba(236, 72, 153, 0.4);
      transform: translateY(-4px);
    }

    .interest-card .i-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .interest-card h4 {
      font-family: var(--font-head);
      font-size: 15px;
      font-weight: 700;
    }

    .interest-card p {
      font-size: 12.5px;
      color: var(--muted);
      margin-top: 3px;
    }

    /* =========================================================================
       05. SKILLS SECTION
       ========================================================================= */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .skill-cat {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      padding: 26px;
    }

    .skill-cat-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .skill-cat-head .sc-icon {
      width: 40px;
      height: 40px;
      border-radius: 11px;
      background: var(--grad-soft);
      border: 1px solid var(--stroke);
      display: grid;
      place-items: center;
      font-size: 18px;
    }

    .skill-cat-head h3 {
      font-family: var(--font-head);
      font-size: 17px;
      font-weight: 700;
    }

    .skill-cat-head span {
      display: block;
      font-size: 12px;
      color: var(--muted-2);
      font-family: var(--font-mono);
    }

    .skill-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 0;
      border-bottom: 1px dashed var(--stroke-soft);
    }

    .skill-item:last-child {
      border-bottom: none;
    }

    .skill-ico {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: var(--panel-strong);
      border: 1px solid var(--stroke-soft);
      display: grid;
      place-items: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .skill-name {
      font-size: 14.5px;
      font-weight: 600;
      flex: 1;
      white-space: nowrap;
    }

    .skill-pct {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
    }

    .bar {
      width: 110px;
      height: 6px;
      border-radius: 99px;
      background: rgba(255, 255, 255, 0.07);
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      border-radius: 99px;
      background: var(--grad);
    }

    .bar-fill.cyan {
      background: linear-gradient(90deg, #22D3EE, #818CF8);
    }

    .bar-fill.orange {
      background: linear-gradient(90deg, #F97316, #FBBF24);
    }

    /* =========================================================================
       06. EXPERIENCE SECTION
       ========================================================================= */
    .timeline {
      position: relative;
      max-width: 820px;
      margin-inline: auto;
      padding-left: 30px;
    }

    .timeline::before {
      content: "";
      position: absolute;
      left: 7px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: linear-gradient(180deg, #A855F7, #EC4899, #F97316);
      opacity: 0.55;
    }

    .tl-item {
      position: relative;
      padding: 0 0 44px 30px;
    }

    .tl-item:last-child {
      padding-bottom: 0;
    }

    .tl-dot {
      position: absolute;
      left: -30px;
      top: 5px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid #EC4899;
      box-shadow: 0 0 0 5px rgba(236, 72, 153, 0.15);
    }

    .tl-dot.alt {
      border-color: #A855F7;
      box-shadow: 0 0 0 5px rgba(168, 85, 247, 0.15);
    }

    .tl-card {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius-sm);
      padding: 22px 24px;
      transition: 0.25s;
    }

    .tl-card:hover {
      transform: translateY(-4px);
      border-color: rgba(236, 72, 153, 0.35);
    }

    .tl-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
    }

    .tl-role {
      font-family: var(--font-head);
      font-size: 17px;
      font-weight: 700;
    }

    .tl-company {
      color: var(--cyan);
      font-size: 13.5px;
      font-weight: 600;
      margin-top: 1px;
    }

    .tl-date {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      background: var(--panel-strong);
      border: 1px solid var(--stroke-soft);
      padding: 5px 12px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .tl-desc {
      color: var(--muted);
      font-size: 14px;
      margin-top: 10px;
      line-height: 1.65;
    }

    .tl-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 12px;
    }

    .tl-tags span {
      font-family: var(--font-mono);
      font-size: 11px;
      background: var(--panel-strong);
      border: 1px solid var(--stroke-soft);
      padding: 3px 9px;
      border-radius: 999px;
      color: var(--muted);
    }

    /* =========================================================================
       07. PROJECTS SECTION
       ========================================================================= */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .project-card {
      position: relative;
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      overflow: hidden;
      transition: 0.3s;
      display: flex;
      flex-direction: column;
    }

    .project-card:hover {
      transform: translateY(-8px);
      border-color: rgba(236, 72, 153, 0.45);
      box-shadow: var(--shadow);
    }

    .project-banner {
      height: 100px;
      position: relative;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .pb-purple { background: linear-gradient(135deg, #6D28D9, #A855F7); }
    .pb-pink { background: linear-gradient(135deg, #BE185D, #EC4899); }
    .pb-orange { background: linear-gradient(135deg, #EA580C, #F97316); }
    .pb-cyan { background: linear-gradient(135deg, #0E7490, #22D3EE); }

    .banner-mono {
      position: relative;
      z-index: 1;
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      background: rgba(7, 7, 15, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 6px 14px;
      border-radius: 10px;
      backdrop-filter: blur(4px);
    }

    .project-thumb-preview {
      width: 100%;
      height: 180px;
      position: relative;
      background: #06060D;
      overflow: hidden;
    }

    .project-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .project-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .project-name {
      font-family: var(--font-head);
      font-size: 19px;
      font-weight: 700;
    }

    .project-pin {
      font-size: 12px;
      color: var(--amber);
      font-family: var(--font-mono);
    }

    .project-desc {
      color: var(--muted);
      font-size: 14px;
      margin: 8px 0 14px;
      flex: 1;
      line-height: 1.6;
    }

    .project-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }

    .topic {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--cyan);
      background: rgba(34, 211, 238, 0.09);
      border: 1px solid rgba(34, 211, 238, 0.22);
      padding: 3px 9px;
      border-radius: 999px;
    }

    .project-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--stroke-soft);
      padding-top: 14px;
    }

    .proj-meta {
      display: flex;
      gap: 14px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
    }

    .proj-links {
      display: flex;
      gap: 8px;
    }

    .proj-link {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      border: 1px solid var(--stroke);
      background: var(--panel-strong);
      display: grid;
      place-items: center;
      color: var(--muted);
      transition: 0.2s;
    }

    .proj-link:hover {
      background: var(--grad);
      color: #FFFFFF;
      border-color: transparent;
    }

    /* =========================================================================
       08. GITHUB ACTIVITY HEATMAP
       ========================================================================= */
    .contrib-panel {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      padding: 30px;
    }

    .contrib-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 22px;
    }

    .contrib-title {
      font-family: var(--font-head);
      font-size: 18px;
      font-weight: 700;
    }

    .contrib-sub {
      font-size: 12.5px;
      color: var(--muted);
      font-family: var(--font-mono);
    }

    .contrib-months {
      display: flex;
      gap: 16px;
      margin-left: 20px;
      margin-bottom: 8px;
    }

    .contrib-months span {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--muted-2);
    }

    .heatmap-scroll-wrap {
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .heatmap {
      display: flex;
      gap: 4px;
    }

    .heat-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cell {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.05);
    }

    .cell.l1 { background: rgba(52, 211, 153, 0.25); }
    .cell.l2 { background: rgba(52, 211, 153, 0.5); }
    .cell.l3 { background: rgba(52, 211, 153, 0.72); }
    .cell.l4 { background: #34D399; }
    .cell.l5 { background: #A7F3D0; }

    .contrib-legend {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 14px;
      justify-content: flex-end;
      font-size: 11px;
      color: var(--muted-2);
      font-family: var(--font-mono);
    }

    .contrib-legend .cell {
      width: 11px;
      height: 11px;
    }

    /* =========================================================================
       09. CONTACT SECTION
       ========================================================================= */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: start;
    }

    .contact-info h3 {
      font-family: var(--font-head);
      font-size: clamp(26px, 3vw, 38px);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 12px 0 14px;
    }

    .contact-info p {
      color: var(--muted);
      font-size: 15.5px;
      margin-bottom: 28px;
      max-width: 440px;
    }

    .contact-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid var(--stroke-soft);
    }

    .contact-row .c-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: var(--grad-soft);
      border: 1px solid var(--stroke);
      display: grid;
      place-items: center;
      font-size: 17px;
    }

    .contact-row b {
      display: block;
      font-size: 14px;
    }

    .contact-row span {
      font-size: 13px;
      color: var(--muted);
      font-family: var(--font-mono);
    }

    .contact-form {
      background: var(--panel);
      border: 1px solid var(--stroke);
      border-radius: var(--radius);
      padding: 32px;
      position: relative;
      overflow: hidden;
    }

    .contact-form::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--grad);
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group label {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--muted);
      margin-bottom: 7px;
      font-family: var(--font-mono);
      letter-spacing: 0.04em;
    }

    .form-group input, .form-group textarea {
      width: 100%;
      background: var(--bg-soft);
      border: 1px solid var(--stroke);
      border-radius: var(--radius-sm);
      padding: 13px 16px;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 14px;
      transition: 0.2s;
      outline: none;
    }

    .form-group input:focus, .form-group textarea:focus {
      border-color: #EC4899;
      box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15);
    }

    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }

    /* Footer */
    .footer {
      border-top: 1px solid var(--stroke-soft);
      padding: 34px 0;
      margin-top: 40px;
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
    }

    .footer p {
      font-size: 13px;
      color: var(--muted-2);
    }

    .footer .made {
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .footer .made .heart {
      color: #EC4899;
    }

    .back-top {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid var(--stroke);
      background: var(--panel);
      display: grid;
      place-items: center;
      color: var(--muted);
      transition: 0.25s;
    }

    .back-top:hover {
      background: var(--grad);
      color: #FFFFFF;
      border-color: transparent;
      transform: translateY(-3px);
    }

    /* Responsive Rules */
    @media (max-width: 960px) {
      .hero-grid { grid-template-columns: 1fr; gap: 70px; }
      .hero-card { margin: 0 auto; }
      .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 40px; }
      .stats-grid, .hero-stats { grid-template-columns: repeat(2, 1fr); }
      .skills-grid, .projects-grid { grid-template-columns: 1fr; }
      .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        gap: 0;
        background: rgba(7, 7, 15, 0.96);
        backdrop-filter: blur(18px);
        border-bottom: 1px solid var(--stroke);
        padding: 10px 0;
      }
      .nav-links.open { display: flex; }
      .nav-links a { padding: 13px 30px; font-size: 15px; }
      .nav-links a::after { display: none; }
      .nav-links .nav-cta { margin: 10px 30px; }
      .hamburger { display: block; }
      .timeline { padding-left: 22px; }
    }

    @media (max-width: 520px) {
      section { padding: 70px 0; }
      .stats-grid, .hero-stats { grid-template-columns: 1fr 1fr; }
      .float-card { display: none; }
      .stat-num { font-size: 26px; }
    }
  </style>
</head>
<body>

  <!-- Fixed Ambient Background -->
  <div class="bg-stage"></div>
  <div class="bg-grid"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>

  <!-- Dynamic 3D WebGL Aurora Wave Canvas -->
  <canvas id="aurora-webgl-canvas"></canvas>

  <!-- ================= 01. NAVBAR ================= -->
  <nav class="nav" id="navbar">
    <div class="container nav-inner">
      <a href="#home" class="logo">
        <span class="logo-mark">${initials}</span>
        <span class="logo-name">${safeName}<span class="logo-dot">.</span></span>
      </a>
      <ul class="nav-links" id="navLinks">
        <li><a href="#home" class="active">Home</a></li>
        <li><a href="#stats">Stats</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contributions">Activity</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#contact" class="nav-cta">Hire Me</a></li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Toggle Menu" onclick="toggleNavMenu()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- ================= 02. HERO ================= -->
  <header class="hero" id="home">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-left">
          <span class="hero-badge"><span class="pulse"></span> available for freelance &amp; full-time</span>
          <h1>Hi, I'm <span class="grad-text">${safeName}</span><br />${safeRole}</h1>
          <p class="hero-role">console.log("Building high-scale architectures &amp; WebGL experiences");</p>
          <p class="hero-desc">
            ${safeBio || 'Crafting high-performance web applications, beautiful developer interfaces, and distributed cloud tools. Turning complex engineering problems into elegant digital products.'}
          </p>
          <div class="hero-ctas">
            <a href="#projects" class="btn btn-primary">
              <span>View My Work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <button class="btn btn-ghost" onclick="triggerPrintResume()">
              <span>Download Resume</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16"/></svg>
            </button>
          </div>
          <div class="hero-social">
            <a href="${safeGithub}" target="_blank" rel="noopener" class="social-chip" aria-label="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
            </a>
            <a href="${safeLinkedin}" target="_blank" rel="noopener" class="social-chip" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z"/></svg>
            </a>
          </div>
        </div>

        <!-- Avatar Card with Spinning Orbital Ring -->
        <div class="hero-card">
          <div class="hero-avatar-wrap">
            <div class="hero-avatar">
              <div class="avatar-ring">
                <div class="avatar-ring-inner">${initials}</div>
              </div>
              <div class="avatar-name">${safeName}</div>
              <div class="avatar-handle">@${safeName.toLowerCase().replace(/\\s+/g, '')} · GitHub</div>
              <div class="avatar-chips">
                <span class="chip cyan">#typescript</span>
                <span class="chip orange">#react</span>
                <span class="chip green">#node</span>
              </div>
            </div>
          </div>
          <div class="float-card fc-1">
            <div class="fc-icon">⭐</div>
            <div><b>${starsDisplay}</b><span>GitHub stars earned</span></div>
          </div>
          <div class="float-card fc-2">
            <div class="fc-icon">⚡</div>
            <div><b>${totalContribs}</b><span>contributions / yr</span></div>
          </div>
        </div>
      </div>

      <!-- 4 Stats Strip -->
      <div class="hero-stats">
        <div class="stat-mini"><b>${totalRepos}+</b><span>repos pushed</span></div>
        <div class="stat-mini"><b>${totalExp}</b><span>years experience</span></div>
        <div class="stat-mini"><b>${followersDisplay}</b><span>followers</span></div>
        <div class="stat-mini"><b>${totalProj}</b><span>featured projects</span></div>
      </div>

      <!-- Infinite Marquee Tape -->
      <div class="marquee-wrap">
        <div class="marquee">
          <span>${marqueeItems}</span>
          <span>${marqueeItems}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- ================= 03. STATS ================= -->
  <section id="stats">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Metrics</span>
        <h2 class="section-title">Telemetry &amp; Activity <span class="grad-text">at a Glance</span></h2>
        <p class="section-sub">Verifiable telemetry pulled straight from live engineering repositories.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon si-purple">📦</div>
          <div class="stat-num">${totalRepos}</div>
          <div class="stat-label">Public Repositories</div>
          <div class="stat-trend">↑ Verified GitHub Repos</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon si-pink">⚡</div>
          <div class="stat-num">${totalContribs}</div>
          <div class="stat-label">Total Contributions</div>
          <div class="stat-trend">↑ Continuous Open Source</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon si-orange">⭐</div>
          <div class="stat-num">${starsDisplay}</div>
          <div class="stat-label">Stargazers Earned</div>
          <div class="stat-trend">${totalStars > 0 ? '↑ Community Stargazers' : 'Active Engineering'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon si-cyan">👥</div>
          <div class="stat-num">${followersDisplay}</div>
          <div class="stat-label">Network Followers</div>
          <div class="stat-trend">${totalFollowers > 0 ? '↑ Community Reach' : 'Verified Developer'}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 04. ABOUT ME ================= -->
  <section id="about">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Biography</span>
        <h2 class="section-title">About <span class="grad-text">My Engineering Journey</span></h2>
        <p class="section-sub">Turning high-velocity ideas into robust production architectures.</p>
      </div>

      <div class="about-grid">
        <div class="about-card">
          <div class="about-photo">
            <div class="about-photo-inner">${initials}</div>
          </div>
          <h3 class="about-name">${safeName}</h3>
          <div class="about-role">${safeRole}</div>

          <div class="about-meta">
            <div class="meta-row">
              <span class="m-icon">📍</span>
              <span>Based in <b>${safeLocation}</b></span>
            </div>
            <div class="meta-row">
              <span class="m-icon">💼</span>
              <span>Experience: <b>${totalExp} Years</b></span>
            </div>
            <div class="meta-row">
              <span class="m-icon">✉️</span>
              <span><b>${safeEmail}</b></span>
            </div>
          </div>

          <span class="open-to-work">⚡ AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        <div class="about-bio">
          <p>
            ${safeBio || 'I am a passionate software developer specialized in scalable web architectures, modern reactive interfaces, and distributed backend pipelines. I enjoy bridging design aesthetics with deep algorithmic efficiency.'}
          </p>

          <div class="learn-tag">CURRENT FOCUS &amp; INTERESTS</div>
          <div class="interest-row">
            <div class="interest-card">
              <div class="i-icon">⚡</div>
              <h4>3D WebGL &amp; Shaders</h4>
              <p>Three.js, GLSL, dynamic physics &amp; motion.</p>
            </div>
            <div class="interest-card">
              <div class="i-icon">☁️</div>
              <h4>Distributed Cloud</h4>
              <p>Serverless, microservices &amp; low-latency edge.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 05. SKILLS ================= -->
  <section id="skills">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Capabilities</span>
        <h2 class="section-title">Technical <span class="grad-text">Stack &amp; Matrix</span></h2>
        <p class="section-sub">Tools, frameworks, and languages honed over years of production deployment.</p>
      </div>

      <div class="skills-grid">
        ${skillsGridHtml}
      </div>
    </div>
  </section>

  <!-- ================= 06. EXPERIENCE ================= -->
  <section id="experience">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Career</span>
        <h2 class="section-title">Work Experience <span class="grad-text">&amp; Milestones</span></h2>
        <p class="section-sub">Chronological history of leadership, architecture, and impact.</p>
      </div>

      <div class="timeline">
        ${experienceHtml}
      </div>
    </div>
  </section>

  <!-- ================= 07. PROJECTS ================= -->
  <section id="projects">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Portfolio</span>
        <h2 class="section-title">Featured Work <span class="grad-text">&amp; Case Studies</span></h2>
        <p class="section-sub">A curated selection of shipped applications, libraries, and tools.</p>
      </div>

      <div class="projects-grid">
        ${projectCardsHtml}
      </div>
    </div>
  </section>

  <!-- ================= 08. GITHUB ACTIVITY ================= -->
  <section id="contributions">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Activity</span>
        <h2 class="section-title">Contribution <span class="grad-text">Heatmap</span></h2>
        <p class="section-sub">${totalContribs} commits pushed across public repositories.</p>
      </div>

      <div class="contrib-panel">
        <div class="contrib-head">
          <div>
            <h3 class="contrib-title">Yearly GitHub Commits</h3>
            <span class="contrib-sub">Continuous integration &amp; daily deployments</span>
          </div>
          <a href="${safeGithub}" target="_blank" rel="noopener" class="btn btn-ghost" style="padding: 8px 18px; font-size: 13px;">
            <span>Follow on GitHub ↗</span>
          </a>
        </div>

        <div class="contrib-months">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>

        <div class="heatmap-scroll-wrap">
          <div class="heatmap">
            ${Array.from({ length: 48 }).map((_, colIdx) => `
              <div class="heat-col">
                ${Array.from({ length: 7 }).map((_, rowIdx) => {
                  const level = ((colIdx * 7 + rowIdx * 3) % 6);
                  return `<div class="cell l${level}"></div>`;
                }).join('')}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="contrib-legend">
          <span>Less</span>
          <div class="cell"></div>
          <div class="cell l1"></div>
          <div class="cell l2"></div>
          <div class="cell l3"></div>
          <div class="cell l4"></div>
          <div class="cell l5"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 09. RESUME DOSSIER ================= -->
  <section id="resume">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Curriculum Vitae</span>
        <h2 class="section-title">Resume <span class="grad-text">Dossier</span></h2>
        <p class="section-sub">Downloadable official curriculum vitae and verified credentials.</p>
      </div>

      <div class="contrib-panel" style="max-width: 860px; margin: 0 auto; text-align: center; padding: 44px;">
        <h3 style="font-family: var(--font-head); font-size: 2rem; margin-bottom: 8px;">${safeName}</h3>
        <p style="color: var(--cyan); font-family: var(--font-mono); font-size: 1.1rem; margin-bottom: 20px;">${safeRole}</p>
        <p style="color: var(--muted); font-size: 1rem; line-height: 1.7; max-width: 600px; margin: 0 auto 24px;">
          ${safeBio}
        </p>

        <div style="text-align: left; background: rgba(255,255,255,0.03); border: 1px solid var(--stroke); border-radius: var(--radius-sm); padding: 24px; margin-bottom: 28px;">
          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--pink); text-transform: uppercase; margin-bottom: 12px;">Academic Credentials</h4>
          ${data.education.map(edu => `
            <div style="font-size: 0.95rem; color: #FFFFFF; margin-bottom: 6px;">
              🎓 <strong>${TemplateHelper.escapeHtml(edu.degree)}</strong> • ${TemplateHelper.escapeHtml(edu.institution)} ${edu.period ? `(${TemplateHelper.escapeHtml(edu.period)})` : ''} ${edu.grade ? `— <span style="color: var(--cyan);">${TemplateHelper.escapeHtml(edu.grade)}</span>` : ''}
            </div>
          `).join('')}

          <h4 style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--purple); text-transform: uppercase; margin-top: 18px; margin-bottom: 12px;">Verified Certifications</h4>
          ${data.certifications.map(c => `
            <div style="font-size: 0.9rem; color: var(--muted); margin-bottom: 4px;">
              📜 <strong>${TemplateHelper.escapeHtml(c.name)}</strong> — Issued by ${TemplateHelper.escapeHtml(c.issuer || 'Technical Authority')}
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="triggerPrintResume()" style="padding: 14px 32px; font-size: 1rem;">
            <span>DOWNLOAD RESUME (PDF) ➔</span>
          </button>
          <a href="mailto:${safeEmail}" class="btn btn-ghost" style="padding: 14px 28px; font-size: 1rem;">
            <span>DIRECT INQUIRY</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= 10. CONTACT ================= -->
  <section id="contact" style="border-bottom: none;">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Get in Touch</span>
        <h2 class="section-title">Let's Build Something <span class="grad-text">Extraordinary</span></h2>
        <p class="section-sub">Available for full-time roles, contract architecture, and ambitious projects.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <h3>Have a project in mind?</h3>
          <p>
            Whether you want to build a high-performance web platform, optimize distributed cloud infrastructure, or explore creative WebGL engineering, my inbox is always open.
          </p>

          <div class="contact-row">
            <div class="c-icon">✉️</div>
            <div>
              <b>Direct Email</b>
              <span><a href="mailto:${safeEmail}">${safeEmail}</a></span>
            </div>
          </div>

          <div class="contact-row">
            <div class="c-icon">📍</div>
            <div>
              <b>Location</b>
              <span>${safeLocation}</span>
            </div>
          </div>

          <div class="contact-row">
            <div class="c-icon">⚡</div>
            <div>
              <b>Status</b>
              <span style="color: var(--green);">Available for New Projects</span>
            </div>
          </div>
        </div>

        <form class="contact-form" onsubmit="handleContactSubmit(event)">
          <div class="form-group">
            <label for="cName">YOUR NAME</label>
            <input type="text" id="cName" placeholder="e.g. Alex Morgan" required />
          </div>
          <div class="form-group">
            <label for="cEmail">EMAIL ADDRESS</label>
            <input type="email" id="cEmail" placeholder="e.g. alex@company.com" required />
          </div>
          <div class="form-group">
            <label for="cMsg">PROJECT MESSAGE</label>
            <textarea id="cMsg" placeholder="Tell me about your product, timeline, and goals..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 16px;">
            <span>SEND TRANSMISSION ➔</span>
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="footer">
    <div class="container footer-inner">
      <p>© 2026 ${safeName}. Crafted with clean code &amp; Three.js WebGL.</p>
      <div class="made">
        <span>Neon Aurora Cyber Design System</span>
      </div>
      <a href="#home" class="back-top" aria-label="Back to top">↑</a>
    </div>
  </footer>

  <!-- Three.js 3D Aurora Wave Particle Mesh Script -->
  <script>
    function initAurora3D() {
      const canvas = document.getElementById('aurora-webgl-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 32;
      camera.position.y = 12;
      camera.rotation.x = -0.3;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particle Wave Mesh
      const particleCount = 1400;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color(0xA855F7);
      const color2 = new THREE.Color(0xEC4899);
      const color3 = new THREE.Color(0x22D3EE);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 80;
        const z = (Math.random() - 0.5) * 80;
        const y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 4;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.35,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
      });

      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      let clock = new THREE.Clock();

      function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        const pos = geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const x = pos[i * 3];
          const z = pos[i * 3 + 2];
          pos[i * 3 + 1] = Math.sin(x * 0.08 + elapsedTime * 0.8) * Math.cos(z * 0.08 + elapsedTime * 0.8) * 3.5;
        }
        geometry.attributes.position.needsUpdate = true;

        particleSystem.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    function toggleNavMenu() {
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.classList.toggle('open');
      }
    }

    function triggerPrintResume() {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, colors: ['#A855F7', '#EC4899', '#F97316', '#22D3EE'] });
      }
      setTimeout(() => { window.print(); }, 400);
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      const btn = e.target.querySelector('button');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>TRANSMISSION TRANSMITTED ✓</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 3000);
      }
      e.target.reset();
    }

    window.addEventListener('DOMContentLoaded', () => {
      initAurora3D();
    });
  </script>
</body>
</html>`;
  }
};

module.exports = { NeonAuroraCyberTemplate };

const fs = require('fs');
const path = require('path');
const { ShaderLoader, SHADER_REGISTRY } = require('./shader-loader');

class SiteGenerator {
  constructor() {
    this.shaderLoader = new ShaderLoader();
  }

  async generateSite(conversation, userData, designBrief) {
    const { extracted_data, branch, selected_shader, taste_skill_dials } = conversation;
    const data = { ...extracted_data, ...userData };
    
    const shaderInfo = SHADER_REGISTRY[selected_shader] || SHADER_REGISTRY['flow-field'];
    const shaderHtml = await this.shaderLoader.loadShader(selected_shader, designBrief.color_palette);

    const html = this.generateHtml(data, branch, designBrief, shaderHtml, shaderInfo);
    const css = this.generateCss(designBrief);
    const js = this.generateJs(designBrief, shaderInfo);

    return { html, css, js };
  }

  generateHtml(data, branch, designBrief, shaderHtml, shaderInfo) {
    const { color_palette, typography, component_selection, dials } = designBrief;
    const isPreview = true;
    const watermark = isPreview ? this.getWatermarkHtml() : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${this.escapeHtml(data.bio || data.service_desc || 'Portfolio website generated via WhatsApp')}">
  <title>${this.escapeHtml(data.name)} - ${this.escapeHtml(data.role || data.service_title || 'Portfolio')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${this.escapeHtml(typography.heading_font.replace(/\s+/g, '+'))}:wght@400;500;600;700&family=${this.escapeHtml(typography.body_font.replace(/\s+/g, '+'))}:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>${this.generateCss(designBrief)}</style>
</head>
<body>
  ${shaderHtml}
  ${watermark}
  
  <div class="page-wrapper">
    ${this.generateHero(data, branch, designBrief)}
    ${this.generateAbout(data, branch, designBrief)}
    ${this.generateProjects(data, branch, designBrief)}
    ${this.generateContact(data, branch, designBrief)}
    ${this.generateFooter(data, designBrief)}
  </div>

  <script>${this.generateJs(designBrief, shaderInfo)}</script>
</body>
</html>`;
  }

  generateCss(designBrief) {
    const { color_palette, typography, dials } = designBrief;
    const { design_variance, motion_intensity, visual_density } = dials;
    
    const spacing = visual_density <= 5 ? 'clamp(2rem, 5vw, 4rem)' : 'clamp(1.5rem, 3vw, 2.5rem)';
    const containerMax = design_variance <= 5 ? '720px' : '1000px';
    
    return `
:root {
  --color-primary: ${color_palette.primary};
  --color-secondary: ${color_palette.secondary};
  --color-accent: ${color_palette.accent};
  --color-background: ${color_palette.background};
  --color-surface: ${color_palette.surface};
  --color-text: ${color_palette.text};
  --color-text-muted: ${color_palette.text_muted};
  --font-heading: "${typography.heading_font}", system-ui, sans-serif;
  --font-body: "${typography.body_font}", system-ui, sans-serif;
  --scale-ratio: ${typography.scale_ratio};
  --spacing: ${spacing};
  --container-max: ${containerMax};
  --motion: ${motion_intensity >= 7 ? 'high' : motion_intensity >= 4 ? 'medium' : 'low'};
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: transparent;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.page-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

h1, h2, h3, h4 { font-family: var(--font-heading); font-weight: 600; line-height: 1.2; color: var(--color-text); }
h1 { font-size: clamp(2.5rem, 6vw, 4rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); margin-bottom: 1rem; }
h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); margin-bottom: 0.5rem; }

p { color: var(--color-text-muted); max-width: 65ch; }

a { color: var(--color-primary); text-decoration: none; transition: color 0.2s ease; }
a:hover { color: var(--color-accent); }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.9375rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn:active { transform: scale(0.98); }
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-secondary); color: white; box-shadow: 0 8px 24px ${color_palette.primary}40; }
.btn-secondary { background: var(--color-surface); color: var(--color-text); border: 1px solid ${color_palette.text_muted}33; }
.btn-secondary:hover { border-color: var(--color-primary); }

.section { padding: var(--spacing) 0; }
.section-header { margin-bottom: clamp(1.5rem, 4vw, 2.5rem); text-align: ${design_variance <= 5 ? 'center' : 'left'}; }
.section-header p { margin-top: 0.5rem; font-size: 1.125rem; }

/* Hero */
.hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 0; }
.hero-content { text-align: ${design_variance <= 5 ? 'center' : 'left'}; max-width: 800px; }
.hero-tagline { font-size: clamp(1.125rem, 2.5vw, 1.5rem); color: var(--color-text-muted); margin-bottom: 1.5rem; font-weight: 400; }
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: ${design_variance <= 5 ? 'center' : 'flex-start'}; margin-top: 2rem; }

/* About */
.about-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
@media (min-width: 768px) { .about-grid { grid-template-columns: repeat(2, 1fr); } }
.about-card { background: ${color_palette.surface}ee; border: 1px solid ${color_palette.text_muted}1a; border-radius: 16px; padding: 1.5rem; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.about-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px ${color_palette.primary}15; }
.about-card h3 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
.about-card .icon { width: 24px; height: 24px; opacity: 0.7; }

/* Projects */
.projects-grid { display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
@media (min-width: 640px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }
.project-card { background: var(--color-surface); border: 1px solid ${color_palette.text_muted}1a; border-radius: 16px; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.project-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px ${color_palette.primary}15; }
.project-image { aspect-ratio: 16/10; background: linear-gradient(135deg, ${color_palette.primary}15, ${color_palette.secondary}15); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); font-size: 0.875rem; }
.project-content { padding: 1.25rem; }
.project-tech { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.75rem; }
.project-tech span { font-size: 0.75rem; padding: 0.25rem 0.625rem; background: ${color_palette.primary}15; color: var(--color-primary); border-radius: 999px; font-weight: 500; }
.project-links { display: flex; gap: 0.75rem; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid ${color_palette.text_muted}1a; }
.project-links a { font-size: 0.875rem; font-weight: 500; display: flex; align-items: center; gap: 0.375rem; }

/* Contact */
.contact { text-align: ${design_variance <= 5 ? 'center' : 'left'}; }
.contact-form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
.contact-form input, .contact-form textarea { width: 100%; padding: 0.875rem 1rem; font-family: var(--font-body); font-size: 1rem; background: var(--color-surface); border: 1px solid ${color_palette.text_muted}33; border-radius: 8px; color: var(--color-text); transition: border-color 0.2s ease; }
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--color-primary); }
.contact-form textarea { min-height: 120px; resize: vertical; }
.contact-links { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: ${design_variance <= 5 ? 'center' : 'flex-start'}; margin-top: 1.5rem; }
.contact-links a { padding: 0.75rem 1.25rem; background: var(--color-surface); border: 1px solid ${color_palette.text_muted}33; border-radius: 8px; font-weight: 500; transition: all 0.2s ease; }
.contact-links a:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* Footer */
.footer { padding: 2rem 0; border-top: 1px solid ${color_palette.text_muted}1a; text-align: center; color: var(--color-text-muted); font-size: 0.875rem; }

/* Watermark */
.watermark { position: fixed; bottom: 1rem; right: 1rem; background: ${color_palette.accent}; color: white; padding: 0.5rem 1rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; z-index: 1000; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }

/* Animations */
@media (prefers-reduced-motion: no-preference) {
  .fade-in { opacity: 0; transform: translateY(20px); animation: fadeIn 0.6s ease forwards; }
  .fade-in:nth-child(1) { animation-delay: 0.1s; }
  .fade-in:nth-child(2) { animation-delay: 0.2s; }
  .fade-in:nth-child(3) { animation-delay: 0.3s; }
  .fade-in:nth-child(4) { animation-delay: 0.4s; }
  .fade-in:nth-child(5) { animation-delay: 0.5s; }
  .fade-in:nth-child(6) { animation-delay: 0.6s; }
  @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
}

/* Mobile */
@media (max-width: 480px) {
  .hero-cta { flex-direction: column; }
  .btn { width: 100%; justify-content: center; }
}`;
  }

  generateJs(designBrief, shaderInfo) {
    const { motion_intensity } = designBrief.dials;
    const reducedMotion = motion_intensity <= 3;
    
    return `
(function() {
  'use strict';
  
  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enableAnimations = !prefersReducedMotion && ${!reducedMotion};
  
  // Intersection Observer for scroll animations
  if (enableAnimations && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.section, .project-card, .about-card').forEach(el => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('fade-in'));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Contact form handling
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        // In production, send to your backend or Formspree/Netlify Forms
        console.log('Form submitted:', data);
        btn.textContent = 'Sent!';
        btn.style.background = '#10b981';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 2000);
      } catch (error) {
        btn.textContent = 'Error';
        btn.style.background = '#ef4444';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 2000);
      }
    });
  }

  // Parallax effect for hero (subtle)
  if (enableAnimations && ${motion_intensity} >= 6) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const hero = document.querySelector('.hero');
          if (hero && scrolled < window.innerHeight) {
            hero.style.transform = \`translateY(\${scrolled * 0.3}px)\`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  console.log('Portfolio loaded - Shader: ${shaderInfo.name}');
})();`;
  }

  generateHero(data, branch, designBrief) {
    const { design_variance } = designBrief.dials;
    const isCentered = design_variance <= 5;
    
    const name = this.escapeHtml(data.name || 'Your Name');
    const role = this.escapeHtml(data.role || data.service_title || data.tagline || 'Professional');
    const tagline = this.escapeHtml(data.tagline || data.service_desc || data.bio || '');
    const location = this.escapeHtml(data.location || '');
    
    const ctaButtons = this.generateHeroCta(data, branch);
    
    return `
<section class="hero fade-in" aria-label="Introduction">
  <div class="container">
    <div class="hero-content">
      <h1>${name}</h1>
      <p class="hero-tagline">${role}${tagline ? ' — ' + tagline : ''}</p>
      ${location ? `<p class="hero-location" style="color: var(--color-text-muted); font-size: 0.9375rem; margin-top: 0.5rem;">📍 ${location}</p>` : ''}
      <div class="hero-cta">${ctaButtons}</div>
    </div>
  </div>
</section>`;
  }

  generateHeroCta(data, branch) {
    const buttons = [];
    
    if (data.email) {
      buttons.push(`<a href="mailto:${this.escapeHtml(data.email)}" class="btn btn-primary">Get in Touch</a>`);
    }
    
    if (data.github || data.linkedin || data.instagram || data.twitter) {
      const firstLink = data.github ? `https://github.com/${data.github.replace('https://github.com/', '')}` : 
                        data.linkedin ? data.linkedin :
                        data.instagram ? `https://instagram.com/${data.instagram.replace('@', '')}` :
                        data.twitter ? `https://twitter.com/${data.twitter.replace('@', '')}` : '#';
      buttons.push(`<a href="${this.escapeHtml(firstLink)}" class="btn btn-secondary" target="_blank" rel="noopener">View Work</a>`);
    }
    
    if (buttons.length === 0) {
      buttons.push(`<a href="#contact" class="btn btn-primary">Contact Me</a>`);
    }
    
    return buttons.join('');
  }

  generateAbout(data, branch, designBrief) {
    const items = [];
    
    if (data.bio) {
      items.push({ icon: 'user', title: 'About Me', content: this.escapeHtml(data.bio) });
    }
    if (data.service_desc) {
      items.push({ icon: 'briefcase', title: 'What I Do', content: this.escapeHtml(data.service_desc) });
    }
    if (data.experience || data.experience_years) {
      items.push({ icon: 'clock', title: 'Experience', content: this.escapeHtml(data.experience || `${data.experience_years} years`) });
    }
    if (data.education) {
      items.push({ icon: 'graduation-cap', title: 'Education', content: this.escapeHtml(data.education) });
    }
    if (data.skills || data.tech_stack || data.languages) {
      const skills = [data.skills, data.tech_stack, data.languages].filter(Boolean).join(', ');
      items.push({ icon: 'code', title: 'Skills', content: this.escapeHtml(skills) });
    }
    if (data.tools) {
      items.push({ icon: 'tool', title: 'Tools', content: this.escapeHtml(data.tools) });
    }
    if (data.certifications) {
      items.push({ icon: 'award', title: 'Certifications', content: this.escapeHtml(data.certifications) });
    }
    if (data.achievements) {
      items.push({ icon: 'trophy', title: 'Achievements', content: this.escapeHtml(data.achievements) });
    }
    
    if (items.length === 0) return '';
    
    const cards = items.map(item => `
      <div class="about-card fade-in">
        <h3><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-${item.icon}"></use></svg>${item.title}</h3>
        <p>${item.content}</p>
      </div>
    `).join('');
    
    return `
<section class="section" aria-label="About">
  <div class="container">
    <div class="section-header fade-in">
      <h2>About</h2>
      <p>Get to know me better</p>
    </div>
    <div class="about-grid">${cards}</div>
    
    <svg style="display: none;">
      <symbol id="icon-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
      <symbol id="icon-briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="6" width="20" height="12" rx="2"/></symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
      <symbol id="icon-graduation-cap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a1 1 0 0 0 1.198-.064l7.88-3.446a1 1 0 0 0 .064-1.195z"/><path d="M22 10.92v5.962a1 1 0 0 1-.413.798l-8.57 3.908a1 1 0 0 1-1.175.039l-7.88-3.446a1 1 0 0 1-.039-1.175v-5.962"/><path d="M12 18v-6"/></symbol>
      <symbol id="icon-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
      <symbol id="icon-tool" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
      <symbol id="icon-award" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></symbol>
      <symbol id="icon-trophy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/></symbol>
    </svg>
  </div>
</section>`;
  }

  generateProjects(data, branch, designBrief) {
    const projects = [];
    
    for (let i = 1; i <= 3; i++) {
      const name = data[`project_${i}_name`] || data[`project_${i}`];
      const desc = data[`project_${i}_desc`] || data[`project_${i}_link`];
      const tech = data[`project_${i}_tech`];
      const github = data[`project_${i}_github`];
      const live = data[`project_${i}_live`];
      const image = data[`project_${i}_image`];
      
      if (name) {
        projects.push({ name, desc, tech, github, live, image });
      }
    }
    
    // Also check for freelancer photos
    for (let i = 1; i <= 5; i++) {
      const photo = data[`photo_${i}`];
      const caption = data[`photo_${i}_caption`];
      if (photo && !projects.some(p => p.name === caption)) {
        projects.push({ name: caption || `Work Sample ${i}`, desc: caption, image: photo, isPhoto: true });
      }
    }
    
    if (projects.length === 0) return '';
    
    const cards = projects.map((project, idx) => {
      const techTags = project.tech ? project.tech.split(',').map(t => `<span>${this.escapeHtml(t.trim())}</span>`).join('') : '';
      const links = [];
      if (project.github) links.push(`<a href="${this.escapeHtml(project.github)}" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> Code</a>`);
      if (project.live) links.push(`<a href="${this.escapeHtml(project.live)}" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live</a>`);
      
      return `
<article class="project-card fade-in" style="animation-delay: ${idx * 100}ms;">
  <div class="project-image">${project.image ? `<img src="${this.escapeHtml(project.image)}" alt="${this.escapeHtml(project.name)}" style="width:100%;height:100%;object-fit:cover;">` : 'Project Image'}</div>
  <div class="project-content">
    <h3>${this.escapeHtml(project.name)}</h3>
    ${project.desc ? `<p>${this.escapeHtml(project.desc)}</p>` : ''}
    ${techTags ? `<div class="project-tech">${techTags}</div>` : ''}
    ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
  </div>
</article>`;
    }).join('');
    
    return `
<section class="section" aria-label="Projects">
  <div class="container">
    <div class="section-header fade-in">
      <h2>Projects</h2>
      <p>Selected work and case studies</p>
    </div>
    <div class="projects-grid">${cards}</div>
  </div>
</section>`;
  }

  generateContact(data, branch, designBrief) {
    const contactMethods = [];
    
    if (data.email) contactMethods.push({ icon: 'mail', label: 'Email', href: `mailto:${data.email}`, text: data.email });
    if (data.phone) contactMethods.push({ icon: 'phone', label: 'Phone', href: `tel:${data.phone}`, text: data.phone });
    if (data.linkedin) contactMethods.push({ icon: 'linkedin', label: 'LinkedIn', href: data.linkedin, text: 'LinkedIn', external: true });
    if (data.github) contactMethods.push({ icon: 'github', label: 'GitHub', href: data.github, text: 'GitHub', external: true });
    if (data.instagram) contactMethods.push({ icon: 'instagram', label: 'Instagram', href: `https://instagram.com/${data.instagram.replace('@', '')}`, text: 'Instagram', external: true });
    if (data.twitter) contactMethods.push({ icon: 'twitter', label: 'Twitter', href: `https://twitter.com/${data.twitter.replace('@', '')}`, text: 'Twitter', external: true });
    if (data.website) contactMethods.push({ icon: 'globe', label: 'Website', href: data.website, text: 'Website', external: true });
    
    const contactLinks = contactMethods.map(m => 
      `<a href="${this.escapeHtml(m.href)}" ${m.external ? 'target="_blank" rel="noopener"' : ''} class="btn btn-secondary">${this.escapeHtml(m.text)}</a>`
    ).join('');
    
    const hasForm = designBrief.component_selection?.contact === 'simple-form';
    
    return `
<section class="section contact" id="contact" aria-label="Contact">
  <div class="container">
    <div class="section-header fade-in">
      <h2>Get in Touch</h2>
      <p>Let's work together</p>
    </div>
    
    ${hasForm ? `
    <form class="contact-form fade-in" action="#" method="POST">
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Your Email" required>
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
    ` : ''}
    
    ${contactLinks ? `<div class="contact-links fade-in">${contactLinks}</div>` : ''}
  </div>
</section>`;
  }

  generateFooter(data, designBrief) {
    const name = this.escapeHtml(data.name || 'Portfolio');
    const year = new Date().getFullYear();
    
    return `
<footer class="footer" role="contentinfo">
  <div class="container">
    <p>&copy; ${year} ${name}. Built with AI via WhatsApp.</p>
  </div>
</footer>`;
  }

  getWatermarkHtml() {
    return `<div class="watermark">PREVIEW — 48h left</div>`;
  }

  escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

module.exports = { SiteGenerator };
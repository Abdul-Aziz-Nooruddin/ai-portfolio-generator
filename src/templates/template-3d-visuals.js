/**
 * 3D Visual Artworks & Section Graphics Engine (Nano Banana 3D Integrated)
 * Synthesizes high-fidelity 3D spatial visual assets, interactive WebGL physics meshes,
 * and Octane-rendered 3D hero specimens for all portfolio universes.
 */

class Template3DVisuals {
  /**
   * Official Brand SVG Icons (no emojis)
   */
  static getIcons() {
    return {
      github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
      linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
      twitter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
    };
  }

  /**
   * Helper to build official social rail
   */
  static renderSocialDock(socials = {}, themeClass = 'cosmic') {
    const icons = this.getIcons();
    const items = [];
    if (socials.github) {
      items.push(`<a href="${socials.github}" target="_blank" rel="noopener" class="${themeClass}-social-icon" aria-label="GitHub" title="GitHub">${icons.github}</a>`);
    }
    if (socials.linkedin) {
      items.push(`<a href="${socials.linkedin}" target="_blank" rel="noopener" class="${themeClass}-social-icon" aria-label="LinkedIn" title="LinkedIn">${icons.linkedin}</a>`);
    }
    if (socials.twitter) {
      items.push(`<a href="${socials.twitter}" target="_blank" rel="noopener" class="${themeClass}-social-icon" aria-label="X / Twitter" title="X / Twitter">${icons.twitter}</a>`);
    }
    if (socials.email) {
      items.push(`<a href="mailto:${socials.email}" class="${themeClass}-social-icon" aria-label="Email" title="Email">${icons.email}</a>`);
    }
    return `
      <aside class="${themeClass}-social-dock">
        <div class="${themeClass}-social-rail">
          ${items.join('\n          ')}
          <div class="${themeClass}-social-line"></div>
        </div>
      </aside>
    `;
  }

  /**
   * 01. COSMIC ASTRONAUT 3D VISUAL (Nano Banana 3D Render)
   */
  static getCosmicHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="cosmic-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/cosmic_astronaut_3d.jpg" alt="${candidateName} — 3D Cosmic Space Explorer" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(168, 85, 247, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(168, 85, 247, 0.45); animation: float3dHero 6s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 02. CYBER CRYSTAL 3D VISUAL (Nano Banana 3D Render)
   */
  static getCyberCrystalHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="crystal-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/cyber_crystal_3d.jpg" alt="${candidateName} — 3D Cyber Crystal Core" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(168, 85, 247, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(216, 180, 254, 0.45); animation: float3dHero 7s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 03. BIOLUMINESCENT ECO-TECH 3D VISUAL (Nano Banana 3D Render)
   */
  static getBioluminescentHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="bio-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/bioluminescent_wireframe_3d.jpg" alt="${candidateName} — 3D Bioluminescent Radar Sprout" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(0, 242, 254, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(0, 242, 254, 0.45); animation: float3dHero 6s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 04. BOTANICAL WOODCRAFT 3D VISUAL (Nano Banana 3D Render)
   */
  static getBotanicalWoodcraftHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="wood-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/botanical_woodcraft_3d.jpg" alt="${candidateName} — 3D Botanical Woodcraft Tree" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(212, 163, 115, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 35px rgba(212, 163, 115, 0.35); animation: float3dHero 6s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 05. BIO-DIGITAL FUSION 3D VISUAL (Nano Banana 3D Render)
   */
  static getBioDigitalFusionHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="fusion-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/bio_digital_fusion_3d.jpg" alt="${candidateName} — 3D Cyber-Digital Circuit Tree" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(0, 242, 254, 0.4); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(0, 242, 254, 0.45); animation: float3dHero 6s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 06. ECO-TECH STEAMPUNK 3D VISUAL (Nano Banana 3D Render)
   */
  static getEcoTechSteampunkHeroArtwork(candidateName = 'Developer') {
    return `
      <div class="ecotech-hero-3d-wrapper" style="width: 100%; height: 100%; min-height: 420px; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 440px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/crystal_leaf_hand_3d.jpg" alt="${candidateName} — 3D Crystal Leaf Sanctuary" class="nano-banana-3d-hero" style="width: 100%; max-width: 420px; height: auto; border-radius: 28px; border: 2.5px solid rgba(200, 138, 62, 0.5); box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 45px rgba(16, 185, 129, 0.4); animation: float3dHero 6s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }

  /**
   * 07. HOLOGRAPHIC RESUME & CAREER DOSSIER 3D VISUAL (Nano Banana 3D Render)
   */
  static getHolographicResume3DArtwork(candidateName = 'Developer') {
    return `
      <div class="resume-3d-wrapper" style="width: 100%; display: flex; align-items: center; justify-content: center; position: relative;">
        <div class="hero-3d-stage-container" style="position: relative; max-width: 380px; width: 100%; display: flex; justify-content: center;">
          <img src="/assets/3d/holographic_resume_codex_3d.jpg" alt="${candidateName} — 3D Holographic Career Dossier" class="nano-banana-3d-hero" style="width: 100%; max-width: 360px; height: auto; border-radius: 20px; border: 2px solid rgba(139, 92, 246, 0.45); box-shadow: 0 16px 40px rgba(0,0,0,0.85), 0 0 35px rgba(139, 92, 246, 0.4); animation: float3dHero 6.5s ease-in-out infinite;" />
        </div>
      </div>
    `;
  }
}

module.exports = { Template3DVisuals };

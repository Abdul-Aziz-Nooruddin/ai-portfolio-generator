/**
 * 3D Visual Artworks & Section Graphics Engine (Nano Banana 3D Integrated)
 * Synthesizes high-fidelity 3D spatial visual assets, interactive WebGL physics meshes,
 * R3F/Three.js spatial viewports, and Octane-rendered 3D hero specimens for all portfolio universes.
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
   * 3D Spatial R3F / Three.js Viewport Wrapper
   */
  static renderSpatialStage(canvasId = 'spatial-hero-canvas', options = {}) {
    const { minHeight = '460px', theme = 'cosmic' } = options;
    return `
      <div class="${theme}-spatial-stage-wrapper" style="width: 100%; height: 100%; min-height: ${minHeight}; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <canvas id="${canvasId}" class="spatial-webgl-canvas" style="position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: auto;"></canvas>
        <div class="spatial-stage-content" style="position: relative; z-index: 2; pointer-events: none;">
          ${options.overlayHtml || ''}
        </div>
      </div>
    `;
  }

  /**
   * 3D Multi-Variant Treasure Chest Cycle (Oceanic / Archival standard)
   */
  static get3DTreasureChestVariants() {
    return [
      '/assets/designs/nautilus/treasure_chest_wheel_nobg.png',
      '/assets/designs/nautilus/chest_compass_lid_nobg.png',
      '/assets/designs/nautilus/chest_wheel_lid_nobg.png'
    ];
  }

}

module.exports = { Template3DVisuals };

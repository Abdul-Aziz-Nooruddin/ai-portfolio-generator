/**
 * Figma MCP & API Design Bridge Service
 * Integrates Figma design files, components, tokens, and image assets
 * directly into the Portfolio Bot and Website Generator.
 */

const axios = require('axios');

class FigmaService {
  constructor(token = process.env.FIGMA_ACCESS_TOKEN) {
    this.token = token;
    this.baseUrl = 'https://api.figma.com/v1';
  }

  isConfigured() {
    return !!this.token && this.token.startsWith('figd_');
  }

  /**
   * Parse a standard Figma URL to extract File Key and Node ID
   * Examples:
   * - https://www.figma.com/design/abcdef123456/Portfolio-UI?node-id=10-45
   * - https://www.figma.com/file/abcdef123456/Portfolio-UI?node-id=10:45
   */
  parseFigmaUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    if (!match) return null;

    const fileKey = match[1];
    let nodeId = null;
    const nodeMatch = url.match(/node-id=([a-zA-Z0-9%:-]+)/);
    if (nodeMatch) {
      nodeId = decodeURIComponent(nodeMatch[1]).replace('-', ':');
    }

    return { fileKey, nodeId };
  }

  /**
   * Fetch file metadata and document hierarchy
   */
  async getFile(fileKey, options = {}) {
    if (!this.isConfigured()) throw new Error('FIGMA_ACCESS_TOKEN is not configured.');
    const params = {};
    if (options.depth) params.depth = options.depth;
    if (options.nodeIds) params.ids = options.nodeIds.join(',');

    const res = await axios.get(`${this.baseUrl}/files/${fileKey}`, {
      headers: { 'X-Figma-Token': this.token },
      params
    });
    return res.data;
  }

  /**
   * Fetch specific nodes by ID
   */
  async getNodes(fileKey, nodeIds = []) {
    if (!this.isConfigured()) throw new Error('FIGMA_ACCESS_TOKEN is not configured.');
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    const res = await axios.get(`${this.baseUrl}/files/${fileKey}/nodes`, {
      headers: { 'X-Figma-Token': this.token },
      params: { ids }
    });
    return res.data;
  }

  /**
   * Render high-resolution image or SVG export for nodes
   */
  async renderImage(fileKey, nodeIds = [], format = 'svg', scale = 2) {
    if (!this.isConfigured()) throw new Error('FIGMA_ACCESS_TOKEN is not configured.');
    const ids = Array.isArray(nodeIds) ? nodeIds.join(',') : nodeIds;
    const res = await axios.get(`${this.baseUrl}/images/${fileKey}`, {
      headers: { 'X-Figma-Token': this.token },
      params: { ids, format, scale }
    });
    return res.data.images;
  }

  /**
   * Extract design tokens (colors, typography, spacing, border radii) from a Figma file or node
   */
  async extractDesignTokens(fileKey, nodeId = null) {
    const fileData = nodeId ? await this.getNodes(fileKey, [nodeId]) : await this.getFile(fileKey, { depth: 3 });
    const colors = new Set();
    const fontFamilies = new Set();

    const rootNode = nodeId ? fileData.nodes[nodeId]?.document : fileData.document;
    if (!rootNode) return null;

    this.traverseNode(rootNode, (node) => {
      // 1. Extract Color Fills
      if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const hex = this.rgbaToHex(fill.color.r, fill.color.g, fill.color.b);
            if (hex) colors.add(hex);
          }
        });
      }

      // 2. Extract Typography
      if (node.style && node.style.fontFamily) {
        fontFamilies.add(node.style.fontFamily);
      }
    });

    const colorList = Array.from(colors);
    const fontsList = Array.from(fontFamilies);

    return {
      name: fileData.name || 'Figma Design System',
      colors: {
        primary: colorList[0] || '#38bdf8',
        secondary: colorList[1] || '#818cf8',
        accent: colorList[2] || '#22c55e',
        background: colorList.find(c => c.toLowerCase() === '#06080f' || c.toLowerCase() === '#ffffff') || (colorList[0] ? this.getLuminance(colorList[0]) < 0.5 ? '#06080f' : '#ffffff' : '#06080f'),
        palette: colorList
      },
      typography: {
        heading_font: fontsList[0] || 'Space Grotesk',
        body_font: fontsList[1] || fontsList[0] || 'Plus Jakarta Sans',
        allFonts: fontsList
      },
      fileKey,
      nodeId
    };
  }

  traverseNode(node, callback) {
    if (!node) return;
    callback(node);
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => this.traverseNode(child, callback));
    }
  }

  rgbaToHex(r, g, b) {
    const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  getLuminance(hex) {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16) / 255;
    const g = parseInt(c.substr(2, 2), 16) / 255;
    const b = parseInt(c.substr(4, 2), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}

module.exports = { FigmaService };

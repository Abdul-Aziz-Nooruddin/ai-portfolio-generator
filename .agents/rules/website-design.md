# Website Design Rule

Always use the `/design` command, Figma MCP, and UI/UX design workflow when creating a website, portfolio, landing page, or web UI.

### Guidelines:
1. Run `/design` (or the `ui-ux-pro-max` search with `--design-system`) before generating website templates or code.
2. **Figma MCP**: If a Figma link or design file is provided, query the Figma MCP / `FigmaService` to pull exact color tokens, typography scales, vector SVGs, and layout trees into the portfolio.
3. Establish design tokens for typography, colors, spacing, and 3D WebGL background/foreground objects.
4. Adhere to non-repeating cycle rules across generative runs.
5. Validate WCAG AA contrast and responsiveness.

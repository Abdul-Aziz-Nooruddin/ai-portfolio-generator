# AGENTS.md

## Website Creation Guidelines

When building or scaffolding a website, landing page, portfolio, or web application:
- **Use the `/design` command**: Always trigger `/design` (or the UI/UX design intelligence workflow) before writing markup or code.
- **Figma MCP Integration**: Whenever a user provides a Figma URL or references a Figma design, leverage the Figma MCP / `FigmaService` to extract authentic color tokens, typography scales, vector SVGs, and component structures directly into the frontend.
- **Design System First**: Generate and establish the design system (color palette, typography pairings, spacing scale, UI style, animation tokens, and UX guidelines).
- **Adhere to Tokens**: Build the frontend strictly adhering to the generated design tokens for maximum visual quality and consistency.
- **Non-Repeating Exhaustive Cycles**: When generating portfolios iteratively, cycle through distinct color palettes, typography scales, and 3D WebGL background/foreground objects without repeating any element until all alternatives are exhausted.

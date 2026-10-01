# MyFolio — Your work. Your world.

A standalone React + TypeScript + Vite landing page inspired by the supplied creative-studio reference, with Tailwind CSS and custom motion styling. This project is independent of the VANGUARD application in the parent folder.

## Run locally

Requires Node.js 22.12+ (or a compatible newer version) and npm.

```bash
cd myfolio-landing
npm install
npm run dev
```

Open **http://127.0.0.1:5174**. Port 5174 is deliberately separate from the parent application's port 5173.

```bash
npm run build       # Strict TypeScript check + optimized dist/
npm run preview     # Preview production output on port 4174
npm run typecheck   # TypeScript only
npm test            # Playwright browser tests
```

Browser tests use installed Google Chrome (`channel: 'chrome'`). If needed, install it with `npx playwright install chrome`. To use Playwright's bundled Chromium instead, run `npx playwright install chromium` and remove `channel: 'chrome'` from `playwright.config.ts`.

## Included

- Reference-inspired blue split-screen entrance, word-by-word headline, oversized background wordmark, and expanding two-part pill CTAs.
- Locally optimized WebP character artwork and live-template screenshots.
- Smooth cursor spotlight revealing the alternate character. The mask is a CSS radial gradient; no per-frame canvas encoding. Rendering stops when idle, outside the hero, or when the tab is hidden.
- A separate touch/keyboard reveal toggle, independent of hover.
- Responsive disclosure navigation with focus handling, Escape/outside-click dismissal, `aria-expanded`, and inert closed content.
- Working category filters, live template previews, accessible FAQ accordion, in-page navigation, and back-to-top link.
- Reduced-motion support and a skip-to-content link.
- Eight responsive viewport checks plus interaction, asset, link, reduced-motion, and axe accessibility tests.

## Live-platform integration

This is a **frontend landing page**, not a reimplementation of the MyFolio backend. Build/sign-in links open `https://myfolio.tech/dashboard`; editor links open the existing MyFolio Studio. Template cards open the real Jack and Nadia demos. Contact, privacy, terms, and GitHub links go to the verified existing destinations. No account creation, payment processing, or portfolio generation is simulated locally, and no secret/API key is required.

The page copy was adapted from the live platform. The 24-hour preview and other product details should be kept in sync with current MyFolio offerings.

## Files

- `src/App.tsx` — sections, navigation, filters, FAQ, and interactions.
- `src/useSpotlight.ts` — pointer reveal with requestAnimationFrame lifecycle cleanup.
- `src/index.css` — reference-inspired layout, responsive styles, and motion.
- `public/images/` — local optimized artwork and template previews.
- `tests/landing.spec.ts` — browser regression and accessibility tests.

## Artwork provenance

The two character images come from the Figma-hosted URLs supplied in the reference. The Jack and Nadia previews are captures of `https://myfolio.tech/jack-3d` and `https://myfolio.tech/nadia`. The character PNGs were converted to WebP with transparency retained. Confirm usage rights for supplied third-party artwork before a public/commercial launch. The MyFolio wordmark and simple geometric mark are implemented in this project; no unrelated studio branding or contact details are reused.

Inter is loaded through Google Fonts with a system-font fallback. No other runtime image CDN is required.

## Deploy

Run `npm run build` and serve **this folder's `dist/`** on any static hosting platform. There is no client-side router and no rewrite configuration is needed. The default asset URLs assume a domain-root deployment; configure Vite's `base` and asset URLs if hosting under a subpath.

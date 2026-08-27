# 🏛️ Phase 41 — Perceptual Design Fingerprint Architecture

## 1. Methodology & Blind Perception Extraction

The `PerceptualDesignFingerprint` (`src/design-intelligence/perceptual-design-fingerprint.js`) ignores text content, names, colors, font families, and images. It measures pure physical geometry:

$$\text{Perceptual Fingerprint} = \langle \text{Topology}, \text{Navigation}, \text{Hero}, \text{Sequence}, \text{Project Archetype}, \text{Surface}, \text{Mobile}, \text{Structural Density} \rangle$$

### Dimensions Evaluated in Structural Signature:
1. **Container Topology**: `split`, `narrow-reading-column`, `edge-to-edge`, `terminal`, `stage`, etc.
2. **Navigation Signature**: `side-rail`, `top-editorial`, `command-nav`, `floating-pill`, `gallery-selector`, `numbered-archive`.
3. **Hero Opening Geometry**: `terminal-boot`, `full-viewport-stage`, `monograph-thesis`, `split-identity-rail`, `newspaper-front-page`, `offset-poster-masthead`.
4. **Section Cadence**: Ordering vector of primary and secondary modules.
5. **Project Presentational Archetype**: `technical-dossier`, `terminal-log`, `metrics-wall`, `horizontal-filmstrip`, `magazine-spread`, `typographic-index`, `asymmetric-mosaic`.
6. **Surface Language**: `terminal`, `editorial-prose`, `blueprint-table`, `museum-ledger`, `flat`.
7. **Element Density**: Heading count, paragraph count, article count, and card class frequency.
8. **Mobile Transformation**: `mobile-sticky-rail`, `mobile-terminal-stream`, `mobile-touch-filmstrip`, `mobile-reading-stream`, `mobile-editorial-column`.

---

## 2. Similarity & Distance Formulas

$$\text{Similarity}(A, B) = \sum_{k \in \text{Dimensions}} W_k \cdot \mathbb{I}(A_k = B_k)$$
$$\text{Perceptual Distance}(A, B) = 100 - \text{Similarity}(A, B)$$

Where:
- Topology Weight: 25 points
- Navigation Weight: 15 points
- Hero Opening Weight: 15 points
- Section Sequence Weight: 15 points
- Project Archetype Weight: 15 points
- Surface & Border Weight: 10 points
- Mobile Transformation: 5 points

A collision is recorded if $\text{Perceptual Distance} < 30.0$.

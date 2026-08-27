# 🏛️ Phase 45 Universal Evidence Fallback Renderer

## Philosophy
When user evidence cannot be integrated into a primary layout grammar (e.g. an obscure custom attribute or complex nested metadata), the system must never drop the data. `EvidenceFallbackRenderer` adapts arbitrary user data structures into the active visual design tokens of the site.

---

## 1. Adaptive Fallback Styling
`EvidenceFallbackRenderer` supports multiple data types:
- **String & Number**: Styled specification key-value cards with monospace prefixes.
- **URLs & Links**: Interactive anchor buttons with domain extraction.
- **Arrays & Lists**: Tag cloud chips styled with `--primary` and `--surface-alt`.
- **Objects & Maps**: Nested key-value data tables formatted with `--font-mono`.

---

## 2. Integration
Rendered cards are styled using CSS variables from the active visual universe (`--bg`, `--surface`, `--primary`, `--border`, `--radius`) to ensure fallback content feels intentionally designed and integrated rather than like an unstyled dumping ground.

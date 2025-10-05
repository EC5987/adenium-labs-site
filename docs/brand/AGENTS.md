Brand Guidelines — Working Notes

Scope
- Applies to this folder and any subfolders that reference these assets.

Design Tokens
- Source of truth is `tokens.css` (CSS variables in `:root`).
- Colors: `--teal`, `--blush`, `--cream`, `--charcoal`, `--slate`, `--offwhite`.
- Typography tokens: `--font` uses Chillax Variable with system fallbacks; weights: `--w-title:400`, `--w-body:400`, `--w-cta:500`.
- Radii: `--radius`, `--radius-sm`, `--pill`.
- Shadows: `--shadow`, `--shadow-soft`.
- Backgrounds: `--bg-light`, `--bg-dark`.
- Control tokens (light): `--toggle-*`, `--slider-*`.
- Control tokens (dark): `--d-*` variables.

Font
- Use Chillax Variable for all headings and body (`font-family: var(--font)`).
- Recommended weights: 400 for titles/body; 500 for CTAs; avoid heavy weights to maintain calm tone.
- Webfont is embedded as `Chillax-Variable.woff2` and referenced in `guidelines.html` via `@font-face`.
- If adding new pages, reuse the same `@font-face` block or reference a shared CSS that contains it.

Color Usage
- Teal (`--teal`) is the primary action color.
- Blush (`--blush`) is reserved for gradient accents, not solid UI fills.
- Off‑white surfaces (`--offwhite`) over gradient backgrounds; dark mode uses `--d-card` gradient surfaces.

Buttons and Controls
- Primary: teal gradient; Secondary: off‑white with teal border; Ghost: low‑emphasis outline (on dark surfaces, ghost uses off‑white outline/text).
- Toggles/sliders pull from the `--toggle-*` and `--slider-*` tokens; dark mode equivalents from `--d-*` tokens.

Print
- `guidelines.html` includes a print stylesheet targeting Letter (`@page size: Letter`) and hides code blocks for PDF export.

Implementation Notes
- Prefer relative asset paths (keep images and fonts next to the HTML).
- Do not rename token variables without updating `tokens.css` and all references.
- When adding new components, consume tokens and avoid hard‑coded colors/sizing.


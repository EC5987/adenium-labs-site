Sound Asleep — iOS Mapping (SwiftUI)

Purpose
- Map design tokens in this folder to iOS-native constructs for a calm, premium, and accessible UI.

Token sources
- Human: `guidelines.html`, `Adenium Labs — Brand Guidelines.pdf`
- Machine: `tokens.json` (generated from `tokens.css`)

Color mapping
- brandAccent → teal (#005579)
  - SwiftUI: `Color("AccentTeal")` if present in Assets, else from hex in code.
  - Usage: primary buttons, toggles, slider fill, icons.
- neutrals → charcoal/slate/offwhite
  - Text on light: #1E1E1E; Muted: #6B7C8F
  - Surfaces (light): offwhite (#F7F8F9) with subtle material/inner stroke.
- dark mode text → #f2f6f7; muted → #b9c7d1
- gradients
  - Background (light): radial cream glow + linear teal→slate→blush.
  - Background (dark): radial cream faint glow + linear deep teal→slate.
  - Cards (dark): linear #032f3e→#0b4e67 per tokens.

Assets recommendations
- Create named colors in Asset Catalog:
  - `AccentTeal`, `NeutralSlate`, `SurfaceOffwhite`, `TextPrimary`, `TextSecondary` with light/dark variants.
- Create gradient structs in code sourced from `tokens.json` to allow precise stops/angles.

Typography
- Family: Chillax Variable for titles/body; Synonym may remain for body if desired (current app includes both). Brand prefers lighter weights.
- Weights: Title 400, Body 400, CTA 500 (avoid heavy).
- Suggested sizes (Dynamic Type-friendly):
  - Display: 34–40, Title: 28/22, Headline: 18/17, Body: 16/15, Caption: 13.
- Implementation: `Font.custom("ChillaxVariable-…", size:)` with `.dynamicTypeSize(..)` support and minimum 4.5:1 contrast for text vs background.

Radii & elevation
- Corners: md 16, sm 10, pill 999.
- Shadows (light): use `shadows.shadow` composite; (dark): reduce or remove to avoid glow; prefer inner stroke.

Controls
- Toggle (light): trackOn gradient 135° (#0b6a8e→teal), off #d7dee6; knob offwhite.
- Toggle (dark): trackOn 135° (#12799f→#0a4e66), off #284b5a; knob offwhite.
- Slider (light): track #d9dfe6, fill 90° gradient; thumb offwhite.
- Slider (dark): track #274b5a, fill 90° gradient; thumb offwhite.
- Implementation: wrap SwiftUI `Toggle`/`Slider` in styles that apply `.tint(brandAccent)` and custom track/thumb drawing where needed.

Buttons
- Primary (filled gradient): teal gradient; 44pt min height; 12–16pt corner.
- Secondary (tonal/outline): offwhite surface, teal border; text/icon teal.
- Ghost: low-emphasis outline; in dark contexts invert to offwhite outline.
- Motion: subtle spring on press; `.symbolEffect(.bounce, .nonRepeating)` for key icons.

Background views
- `BrandBackgroundView`: compose radial + linear layers from `tokens.json` per color scheme.
- Apply subtle noise overlay (1–2%) to avoid banding.

Accessibility
- Respect `.accessibilityReduceMotion`: swap bouncy effects with opacity/scale.
- Respect `.colorSchemeContrast`: increase inner-stroke opacity, raise text contrast, use filled icons.
- Touch targets: min 44×44pt; spacing 12–16pt for section paddings.

Suggested Swift scaffolding (non-shipping here)
- `BrandTokens.swift`: Decodes `tokens.json` at dev-time or embeds constants.
- `BrandTheme.swift`: Exposes `brandAccent`, `background`, `radii`, `shadows`, `type` helpers.
- `BrandComponents.swift`: `PrimaryButtonStyle`, `Card`, `ToggleStyle`, `SliderStyle` wrappers.

Non-shipping guarantee
- This folder is not referenced by the Xcode project; keep it that way.
- Marker file `do-not-ship.txt` indicates docs-only; `.gitattributes` marks binaries.


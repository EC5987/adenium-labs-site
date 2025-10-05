Sound Asleep — Brand Guidelines (Developer Readme)

What’s here
- guidelines.html: Human-friendly brand overview (colors, backgrounds, controls, buttons).
- tokens.css: Source token definitions as CSS variables.
- tokens.json: Machine-readable tokens generated from tokens.css for tooling.
- ios-mapping.md: How tokens map to SwiftUI/HIG and accessibility on iOS.
- Adenium Labs — Brand Guidelines.pdf: Reference PDF.
- Fonts/Logos: Chillax variable font (woff2/ttf), app and brand logos.

Goals
- Keep this folder versioned in git for history.
- Keep it out of the app build (it is not referenced by the Xcode project).

Conventions
- Update tokens in tokens.css, then mirror changes in tokens.json.
- Avoid renaming token keys without updating both files.
- Prefer relative paths for assets used by guidelines.html.

Non-shipping marker
- See do-not-ship.txt. This folder is intentionally not included in build settings.


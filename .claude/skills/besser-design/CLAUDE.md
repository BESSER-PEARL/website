# BESSER — design notes for Claude Code

This project is the **BESSER design system**. When building anything visual
or front-end for BESSER (the open-source low-code platform), follow these
rules. Full detail lives in `README.md`; tokens in `colors_and_type.css`.

## Always
- **Canvas:** white. **Accent:** one blue — `brand-600 #2563eb` (hover `#1d4ed8`).
  **Neutrals:** slate `ink` scale; **no pure black** (darkest is `#0f172a`).
- **Type:** Space Grotesk (display/headings, tight `-0.02em`), Inter (body/UI),
  JetBrains Mono (code/URLs). Sentence case for headings & buttons.
- **Icons:** Lucide stroke icons, in 44px `brand-50` rounded-xl tiles with a
  `brand-600` glyph. **No emoji, ever.** Pin Lucide to `0.288.0` if you need
  the github/linkedin/youtube brand glyphs.
- **Shape:** `rounded-2xl` (16px) cards, `rounded-xl` buttons, full-pill chips,
  `rounded-3xl` banners. Soft, large, diffuse shadows — never hard/dark.
- **Motion:** scroll fade-up (opacity + 16px rise, ~0.5s ease-out, staggered),
  hover lift (cards −4px, buttons −2px). One ambient drift-blob in heroes.
- **Voice:** address the reader as "you", the team as "we". Confident,
  plainspoken, developer-to-developer. Em-dashes welcome. No hype, no `!`.
  Reinforce: open-source, free forever, no installation, model-driven.

## Don't
- No bluish-purple gradients, no emoji cards, no rounded-corner-+-colored-
  left-border cards. The logo's cyan→teal gradient is for the **wordmark only**
  (`--logo-*` tokens), not UI chrome.

## Where things are
- `colors_and_type.css` — import this first; all tokens live here.
- `assets/` — logo, favicon, team photos.
- `ui_kits/website/` — reusable `bz-*` components; lift these for new screens.
- `preview/` — visual reference cards.
- Source of truth: https://github.com/BESSER-PEARL/website

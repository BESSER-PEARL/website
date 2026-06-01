---
name: besser-design
description: Use this skill to generate well-branded interfaces and assets for BESSER, the open-source low-code platform, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## What's here
- `README.md` — product context, content & visual foundations, iconography, full manifest. **Start here.**
- `colors_and_type.css` — all design tokens (color scales, semantic roles, type styles, radii, shadows, spacing, motion). Import or copy values from this first.
- `assets/` — `besser_logo.webp`, `favicon.ico`, and `team/` headshots.
- `preview/` — design-system specimen cards (type, color, spacing, components, brand).
- `ui_kits/website/` — a high-fidelity, clickable recreation of the BESSER site. Lift its `bz-*` components and CSS.

## Quick rules of thumb
- White canvas, single blue accent (`brand-600 #2563eb`), slate `ink` neutrals, no pure black.
- Type: **Space Grotesk** (display/headings), **Inter** (body/UI), **JetBrains Mono** (code).
- **Lucide** stroke icons in 44px `brand-50` rounded tiles. No emoji, ever.
- Sentence case. Address the reader as "you", the team as "we". Em-dashes welcome.
- Soft diffuse shadows, `rounded-2xl` cards, scroll fade-up reveals, hover lift.

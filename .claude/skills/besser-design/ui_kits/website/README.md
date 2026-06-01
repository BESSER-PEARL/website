# BESSER Website — UI Kit

A high-fidelity, clickable recreation of the **BESSER** marketing + team
site ([besser-pearl.org](https://besser-pearl.org/)). Built from the
production source at https://github.com/BESSER-PEARL/website
(Vite + React + Tailwind + Framer Motion + Lucide).

## Run it
Open `index.html`. It's a single-page app with in-memory routing — click
the nav (Home, Features, Services, Research ▾, Team, Contact) to move
between pages. All external links (editor, docs, GitHub) point to the real
destinations; internal demo links are inert.

## Files
| File | Contents |
|------|----------|
| `index.html` | App shell, all CSS (`bz-*` classes mapped to the design tokens), simple router, mounts `<App/>`. |
| `data.jsx` | `window.BESSER_DATA` — features, services, stats, team, how-it-works (from `src/data/*`). |
| `components.jsx` | Shared components → `window`: `Icon` (Lucide-in-React), `Reveal` (scroll fade-up), `Button`, `Eyebrow`, `IconChip`, `FeatureCard`, `Nav`, `Footer`. |
| `pages.jsx` | Page components → `window`: `Home`, `Features`, `Services`, `Team`, `Contact`, `Research`, plus `CTABanner`. |

## What's recreated
- **Nav** — sticky, transparent→`white/80 backdrop-blur` on scroll, hover
  dropdowns (Research, Learn), mobile burger menu, "Try BESSER" CTA.
- **Hero** — gradient headline with one gradient-clipped accent word,
  grid + drifting blob backdrop, a browser-chrome product frame containing a
  small UML-class-diagram editor mock, and the tech-stack pill strip.
- **Feature band, stat strip, "how it works" steps, CTA banner.**
- **Features / Services** — icon-chip cards in responsive grids.
- **Team** — the full 23-person headshot grid with hover zoom.
- **Contact** — discussion / bug / email / location cards.
- **Research** — EU Horizon projects & publications cards.
- **Footer** — 4-column, social icons, MIT + FNR PEARL credit bar.

## Notes / fidelity
- Fonts via Google Fonts; icons via the **Lucide CDN pinned to `0.288.0`**
  (newer Lucide dropped the `github`/`linkedin`/`youtube` brand glyphs the
  site uses). The editor video on the real hero is replaced by a static
  UML editor mock (no video asset was vendored).
- Component implementations are simplified/cosmetic — this is a visual kit,
  not the production React app.

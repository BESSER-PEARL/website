# BESSER Design System

A design system distilled from the **BESSER** marketing/team website
([besser-pearl.org](https://besser-pearl.org/)). Use it to generate
well-branded interfaces, product pages, decks, and prototypes that look
and feel like BESSER.

---

## What is BESSER?

**BESSER** is an **open-source, AI-enhanced low-code platform for smart
software development**. Its tagline is **"better software faster."** From a
single model, BESSER generates working software — REST APIs, databases,
web apps, AI agents, neural networks, and full deployment manifests.

Core product pillars (straight from the site copy):

- **Model once, generate everything** — class diagrams, state machines,
  object diagrams, agents, and deployment specs in one tool.
- **15+ generators** — Python, FastAPI, Django, SQLAlchemy, SQL, Java,
  Terraform, PyTorch, Docker, and more.
- **AI-powered** — combines AI and low-code; includes an MCP server for
  "vibe modeling" with Claude Desktop, Cursor, and other agentic clients.
- **No installation** — a free browser-based online editor
  ([editor.besser-pearl.org](https://editor.besser-pearl.org)).
- **Free & open source** — MIT-licensed, no freemium, no hidden fees.

BESSER is **research-led**, built by a ~23-person team at the **Luxembourg
Institute of Science & Technology (LIST)** and **SnT / University of
Luxembourg**, funded by the **FNR PEARL** grant. The brand voice therefore
sits at the intersection of *serious academic credibility* and *friendly,
modern developer-tool marketing*.

### The ecosystem (surrounding products, for context)

The website links out to a broader BESSER ecosystem — useful to know, but
this design system is built from the **website** only:

- **BESSER** core platform (`BESSER-PEARL/BESSER`)
- **Web Modeling Editor** (`editor.besser-pearl.org`)
- **BESSER Agentic Framework (BAF)**, **MCP server**, **databot**, etc.
- **Docs** (besser.readthedocs.io), **Blog** (modeling-languages.com),
  **Book** (lowcode-book.com)

---

## Sources

This system was reverse-engineered from a single GitHub repository. The
reader is encouraged to explore it further to build more faithful designs:

- **Website source** — https://github.com/BESSER-PEARL/website
  *(Vite + React 18 + React Router 6 + Tailwind CSS + Framer Motion +
  Lucide icons; deployed to GitHub Pages.)*
  Key files read: `tailwind.config.js`, `src/index.css`,
  `src/pages/Home.jsx`, `src/components/Nav.jsx`, `src/components/Footer.jsx`,
  `src/pages/{Features,Services,Team,Contact}.jsx`,
  `src/data/{features,team,research}.js`.
- **Live site** — https://besser-pearl.org/
- **Org** — https://github.com/BESSER-PEARL (68 repos: core platform,
  editor, agentic framework, MCP server, datasets, research tools).

> No Figma file or slide deck was provided. The system is derived from
> production website code, which is the source of truth for all tokens
> below.

---

## CONTENT FUNDAMENTALS

**Voice:** confident, plainspoken, developer-to-developer. Markets a serious
research tool without academic stiffness. Short declarative sentences,
occasional em-dashes for rhythm.

- **Person:** addresses the reader as **"you"** ("Everything BESSER gives
  *you*"); the team is **"we"** ("*we* love a good problem statement",
  "*we* triage weekly"). Warm and direct.
- **Casing:** **Sentence case** for headings and buttons — *not* title case.
  ("See all features", "Read the docs", "Let's chat"). The wordmark
  **BESSER** is always all-caps.
- **Punctuation:** em-dashes used liberally to append a clause —
  ("Model once — generate APIs, databases, agents…"). Curly quotes and
  apostrophes (’ ’). Periods used decoratively in the hero
  ("Better software, **faster**.").
- **Tone markers:** lightly playful but never goofy — "we love a good
  problem statement", "Let's just have a chat. Tell us your problem — we'll
  tell you whether BESSER fits." No hype-speak, no exclamation marks.
- **Numbers as proof:** stats stated bluntly and big — "15+ generators",
  "31 peer-reviewed papers", "23 researchers & engineers", "2 EU Horizon
  projects". Specific over vague.
- **Emoji:** **none.** The brand uses zero emoji. Don't introduce them.
- **Headline pattern:** a punchy promise + a one-line lede that expands it.
  e.g. *"Model once. Generate everything."* / *"From a single, simple model —
  code, infrastructure, AI agents, and deployments fall out the other side."*
- **CTA verbs:** "Try BESSER", "Open the editor", "Read the docs",
  "Star on GitHub", "Get in touch", "Let's chat".
- **Always reinforce:** open-source, free forever, no installation, model-driven.

---

## VISUAL FOUNDATIONS

A **clean, airy, modern SaaS / developer-tool aesthetic** built on a white
canvas with a single confident blue accent. Restrained and professional —
the opposite of cluttered.

### Color
- **Neutral = `ink`**, a slate-blue gray scale (`#f8fafc` → `#0f172a`). All
  text, borders, and surfaces come from here. There is **no pure black**;
  `ink-900` `#0f172a` is the darkest.
- **Accent = `brand`**, a blue scale with **`brand-600 #2563eb`** as the
  primary action color and **`brand-700 #1d4ed8`** as hover. Soft tints
  (`brand-50`, `brand-100`) back icon tiles, eyebrows, and CTA bands.
- **Logo gradient** is a separate **cyan/teal → blue** ramp
  (≈ `#2bb3c0 → #1f6feb`) used *only* in the wordmark — do not use it for UI.
- **Gradient text:** the single emphasized hero word uses a
  `brand-500 → brand-700` clipped gradient ("faster", stat numbers). Used
  sparingly — one accent per view.

### Type
- **Display:** **Space Grotesk** (bold, tight tracking `-0.02em`) — hero,
  headings, stat numbers, eyebrows.
- **Body / UI:** **Inter** (with `ss01`, `cv11` font-features on).
- **Mono:** **JetBrains Mono** — code, URLs in window chrome, email
  addresses, the editor address bar.
- Hero scales to `text-7xl` (~72px); section H2 ~42px; body 14–18px.

### Backgrounds & texture
- Predominantly **white**. Section rhythm comes from alternating bands:
  white → `ink-50/40` (feature band) → white → soft brand-tinted CTA.
- **Faint grid texture** (`.grid-bg`): two 1px slate lines on a 56px grid at
  ~4% opacity, behind the hero — evokes a modeling canvas / blueprint.
- **Drifting gradient "blobs":** large blurred (`blur(60px)`) brand/sky
  radial shapes behind the hero, slowly animated (`drift` 14s, `drift-2`
  18s ease-in-out infinite). Subtle, never loud.
- **Soft gradient washes:** `from-white via-white to-brand-50/50`, and
  blurred brand halos behind product screenshots and CTA banners.

### Motion
- **Scroll reveal** (Framer Motion): elements fade up — `opacity 0→1`,
  `y 16→0`, `duration 0.5s`, `ease 'easeOut'`, triggered once when in view,
  staggered by `0.04–0.05s × index`.
- **Hover lift** on buttons & cards: `-translate-y-0.5` (buttons),
  `-translate-y-1` (cards), `transition` ~300ms.
- **Press:** buttons return to `translate-y-0` on `:active`.
- Blob drift is the only ambient/idle animation. No bounces, no parallax.

### Hover & press states
- **Primary button:** bg `brand-600 → brand-700`, lifts up 2px.
- **Secondary button:** border `ink-200 → ink-300`, bg `white → ink-50`.
- **Ghost button / nav item:** text `ink-600 → ink-900`, bg → `ink-100`.
- **Cards (`card-hover`):** lift 1px, border → `brand-300/70`, gain a large
  soft brand-tinted shadow, and a faint diagonal brand gradient sheen fades
  in via `::after`.
- **Icon links (social):** bg → `ink-100`, icon → `ink-900`.

### Borders, radii & shadows
- **Hairlines:** `ink-200` at ~70% opacity everywhere — `border-ink-200/70`.
- **Radii:** buttons/inputs/nav `rounded-xl` (12–16px); cards `rounded-2xl`
  (16px); CTA banners & product frames `rounded-3xl` / `rounded-[2.5rem]`;
  pills & eyebrows fully round.
- **Shadows:** `soft` = `0 8px 30px -6px rgba(15,23,42,0.08)` (default card);
  `ring` = `0 0 0 1px rgba(15,23,42,0.06)`; hover cards get a deep
  brand-tinted `0 24px 60px -18px rgba(37,99,235,0.25)`; product screenshots
  get `0 30px 80px -20px rgba(15,23,42,0.35)`. Soft, large, diffuse — never
  hard or dark.

### Transparency & blur
- Sticky nav becomes `bg-white/80 backdrop-blur` once scrolled (transparent
  at top).
- Blurred blobs and gradient halos use heavy blur; borders often use
  `/70`–`/80` alpha for softness.

### Imagery
- **Team photos:** consistent professional headshots, `4/5` aspect,
  `object-cover object-top`, in `ink-100` placeholder cards, gently zoom
  (`scale-1.04`) on hover.
- **Product:** a **browser-window-chrome mock** (traffic-light dots, mono
  URL bar) wrapping a dark `ink-900` editor video/screenshot.
- No stock photography, no illustration mascots. Imagery is the real
  product and the real people.

### Layout rules
- Centered containers: `max-w-6xl` (narrow) / `max-w-7xl` (wide), responsive
  side padding `px-5 sm:px-6 lg:px-8`.
- Generous vertical rhythm: sections `py-20`–`py-24`.
- Sticky top nav (h-16); 4-column footer on a `ink-50/60` band.
- Feature/stat grids: 2 → 4 columns responsive.

---

## ICONOGRAPHY

- **Library:** **[Lucide](https://lucide.dev)** exclusively (the React site
  imports `lucide-react`). Clean, consistent **stroke** icons,
  ~1.5–2px weight, rounded line caps.
- **Sizing:** `h-4 w-4` (16px) inline in buttons/links; `h-5 w-5` (20px) in
  nav, social, and feature icon tiles.
- **Feature/Contact pattern:** an icon sits in an **11×11 (44px) rounded-xl
  `brand-50` tile with `brand-600` icon** — the signature "icon chip".
- **Icons seen in use:** `ArrowRight, BookOpen, Github, PlayCircle, Menu, X,
  ExternalLink, ChevronDown, Cpu, Sparkles, ToyBrick, Layers, Code2, Rocket,
  TerminalSquare, Database, Boxes, Settings2, Shuffle, GraduationCap,
  MessageCircle, MessageSquare, Mail, MapPin, Linkedin, Youtube`.
- **No emoji, no unicode glyphs** used as icons. No custom/branded icon font
  beyond the logo mark itself.
- **This kit links Lucide from CDN** (`https://unpkg.com/lucide@0.288.0/dist/umd/lucide.min.js`) so
  the exact same icon set is available. ⚠️ *Substitution flag:* the icons are
  loaded from the Lucide CDN rather than vendored from the repo — visually
  identical to the production `lucide-react` set.

### The logo
`assets/besser_logo.webp` — the wordmark **BESSER** in a cyan→blue gradient,
preceded by a **UML class-box mark** (a two-row rectangle, like a class
diagram node) with a small **feedback-loop arrow** beneath it (the
model→generate→refine loop). Tagline **"better software faster"** in
`ink-900` below. Use on white/light backgrounds. Min clear height ~36px
(rendered at `h-9` in nav & footer).

---

## ⚠️ Caveats & substitutions

- **Fonts** (Inter, Space Grotesk, JetBrains Mono) are not vendored in the
  repo — they are loaded from **Google Fonts** here. These are the exact
  families specified in `tailwind.config.js`, so the substitution is
  faithful. *If you have licensed/self-hosted font files, drop them in
  `fonts/` and update `colors_and_type.css`.*
- **Icons** load from the **Lucide CDN** (the repo's `lucide-react` source).
- No Figma or decks were provided; everything derives from website code.

---

## Index / Manifest

Root files:

| File | What it is |
|------|------------|
| `README.md` | This file — context, content & visual foundations, iconography. |
| `colors_and_type.css` | All design tokens: color scales, semantic roles, type styles, radii, shadows, spacing, motion. Import this first. |
| `SKILL.md` | Agent-Skill manifest (Claude Code compatible). |
| `assets/besser_logo.webp` | Primary logo / wordmark. |
| `assets/favicon.ico` | Favicon. |
| `assets/team/*` | 23 team headshots (real product content). |
| `preview/*.html` | Design-system specimen cards (type, color, spacing, components, brand). |
| `ui_kits/website/` | High-fidelity recreation of the BESSER website. See its README. |

UI kits:

- **`ui_kits/website/`** — the BESSER marketing + team site. `index.html`
  is a clickable multi-page recreation (Home, Features, Services, Team,
  Contact) built from JSX components (Nav, Footer, Hero, FeatureCard,
  StatStrip, ProductFrame, TeamGrid, CTA banner, buttons).

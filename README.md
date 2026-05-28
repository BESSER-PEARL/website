# BESSER website

Source for [besser-pearl.org](https://besser-pearl.org/) — built with Astro + Tailwind, deployed to GitHub Pages.

## Stack

- **Astro 5** — static site generator (zero JS framework runtime shipped)
- **Tailwind CSS** — styling
- **astro-icon** + **@iconify-json/lucide** — icons
- Vanilla JS (in Astro `<script>` tags) for the nav dropdowns, mobile menu, and scroll-reveal

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the production build
```

## Project layout

```
public/                static assets (team photos, logo, favicon, video)
src/
  components/          Nav.astro, Footer.astro, Reveal.astro
  data/                team.js, features.js, research.js, publications.js — content lives here
  layouts/             Layout.astro — head + Nav + Footer shell
  pages/               index, features, services, research/{publications,projects}, team, contact, 404
  styles/              global.css — Tailwind base + component utilities
astro.config.mjs       integrations, base path, /research → /research/publications redirect
tailwind.config.js     theme + colour palette
scripts/
  fetch-publications.mjs   pulls recent DBLP entries → publications.js
.github/workflows/
  deploy.yml               GH Pages CI (build + publish on push to `main`)
  fetch-publications.yml   weekly DBLP pull → PR
```

## Editing content

- **Team members** → `src/data/team.js` (drop new photo in `public/team/`).
- **Features** → `src/data/features.js`. Icons reference Lucide names (kebab-case, e.g. `'cpu'`, `'toy-brick'`).
- **Research projects** → `src/data/research.js`.
- **Publications** → `src/data/publications.js` (auto-augmented; see below).

## Adding a page

1. Drop `something.astro` in `src/pages/`.
2. Wrap with `<Layout title="…">…</Layout>`.
3. Add a Nav entry in `src/components/Nav.astro` if it should appear in the header.

## Base path

`astro.config.mjs` honours a `BASE_PATH` env var. Default is `/website/` (for the gh-pages preview); the deploy workflow can set `BASE_PATH=/` once the custom domain is active.

## Publications auto-fetch

`.github/workflows/fetch-publications.yml` runs every Monday at 06:00 UTC (and via manual dispatch). It seeds off Jordi Cabot's DBLP page (PID `18/948`) — every BESSER paper has him as co-author — and opens a PR with any entries from the current and previous year that aren't yet in `publications.js`. DBLP also indexes Cabot's non-BESSER collaborations, so **the PR is the human filter** — review and prune before merging.

Run it locally with `npm run fetch-publications`.

> Repo setting: Settings → Actions → General → **Allow GitHub Actions to create and approve pull requests** must be enabled.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch via GitHub Pages. Astro emits a real `404.html` (from `src/pages/404.astro`), so no SPA-fallback copy is needed.

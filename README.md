# BESSER website

Source for [besser-pearl.org](https://besser-pearl.org/) — built with Vite + React + Tailwind, deployed to GitHub Pages.

## Stack

- **Vite** — bundler / dev server
- **React 18** + **React Router 6** — UI + routing
- **Tailwind CSS** — styling
- **Framer Motion** — scroll-reveal + micro-interactions
- **Lucide** — icons

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Project layout

```
public/                static assets (team photos, logo, favicon)
src/
  components/          Nav, Footer
  data/                team.js, features.js, research.js, publications.js — content lives here
  pages/               Home, Features, Services, Research, Team, Contact, NotFound
  App.jsx              layout shell with <Outlet/>
  main.jsx             router + render
  index.css            Tailwind base + component utilities
scripts/
  fetch-publications.mjs   pulls recent DBLP entries → publications.js
.github/workflows/
  deploy.yml               GH Pages CI (build + publish on push to `main`)
  fetch-publications.yml   weekly DBLP pull → PR
```

## Editing content

- **Team members** → `src/data/team.js` (drop new photo in `public/team/`).
- **Features** → `src/data/features.js`.
- **Research projects** → `src/data/research.js`.
- **Publications** → `src/data/publications.js` (auto-augmented; see below).

## Publications auto-fetch

`.github/workflows/fetch-publications.yml` runs every Monday at 06:00 UTC (and via manual dispatch). It seeds off Jordi Cabot's DBLP page (PID `18/948`) — every BESSER paper has him as co-author — and opens a PR with any entries from the current and previous year that aren't yet in `publications.js`. DBLP also indexes Cabot's non-BESSER collaborations, so **the PR is the human filter** — review and prune before merging.

Run it locally with `npm run fetch-publications`.

> Repo setting: Settings → Actions → General → **Allow GitHub Actions to create and approve pull requests** must be enabled.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch via GitHub Pages.

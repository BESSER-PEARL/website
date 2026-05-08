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
  data/                team.js, features.js, research.js — content lives here
  pages/               Home, Features, Research, Team, Contact, NotFound
  App.jsx              layout shell with <Outlet/>
  main.jsx             router + render
  index.css            Tailwind base + component utilities
.github/workflows/
  deploy.yml           GH Pages CI (build + publish on push to `redesign`)
```

## Editing content

- **Team members** → `src/data/team.js` (drop new photo in `public/team/`).
- **Features** → `src/data/features.js`.
- **Research projects** → `src/data/research.js`.

## Deployment

Pushing to the `redesign` branch triggers `.github/workflows/deploy.yml`, which builds the site and publishes the `dist/` folder via GitHub Pages.

When ready to go live, point the `besser-pearl.org` DNS at GitHub Pages and merge `redesign` → `main`.

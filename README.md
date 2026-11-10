# Villa Cavo — Haputale, Sri Lanka

Luxury villa website built with React, Tailwind CSS and Framer Motion.

This repository (`villacavo`) is the **public website only** (frontend). The admin panel is its own
git repository ([villacavo-admin](https://github.com/thisalkekirideniya-ui/villacavo-admin)) and its own
Vercel project. Locally it can sit in an `admin/` folder here, which `.gitignore` excludes, so it is never
part of this repo or the website deploy.

| Folder | Repo | What | Local address |
|---|---|---|---|
| `/` (this folder) | `villacavo` | Public website (frontend only) | http://localhost:5173 |
| `admin/` | `villacavo-admin` | Admin panel: its own frontend **and** backend | http://localhost:5174 |

## Run the website
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Run the admin panel
```bash
cd admin
npm install
npm run dev      # http://localhost:5174   (password "admin")
```
Run both at the same time (two terminals) to see admin changes on the local website.
See the admin folder's own README for deploying it.

## How the two connect
- The admin publishes content to its own storage (Vercel Blob) and serves it at `/api/content`.
- The website reads it from the address in the `VITE_CONTENT_URL` environment variable
  (e.g. `https://villacavo-admin.vercel.app/api/content`) and layers it over its built-in defaults
  in `src/data/site.js` and `src/data/content.js`. If the admin is unreachable, the website still
  works with its last loaded or built-in content.
- Website on Vercel: **Settings → Environment Variables** → add `VITE_CONTENT_URL`, then redeploy.

## Pages
Home · About · Rooms & Suites · Experiences (services & spa) · Dining · Gallery · Contact (map + FAQ) · Book (reservation request) · 404

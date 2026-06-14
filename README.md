# Trine Projects Website

React single-page website for Trine Projects, built with Vite, React, React Router, and a small Node server for editable content and uploads.

## Project Status

- Public website is implemented as a Vite React app.
- Marketing routes include home, project categories, services, visionary, plant and machinery, life at Trine, and careers.
- Admin panel is available at `/admin` for editing site content and uploading images.
- Runtime content is stored in `server/data/content.json`.
- Contact and career forms use the free Web3Forms browser API for email delivery.

See `Memory.md` for the latest project handoff notes and update log.

## Tech Stack

- Vite
- React
- React Router
- Node HTTP server
- Web3Forms email API
- ESLint

## Requirements

- Node.js 20+ recommended.
- npm.

Install dependencies:

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and fill in production-safe values:

```bash
ADMIN_PASSWORD=replace-with-a-long-password
VITE_WEB3FORMS_ACCESS_KEY=replace-with-web3forms-access-key
PORT=8787
```

Notes:

- `ADMIN_PASSWORD` protects `/admin` and admin API writes.
- `VITE_WEB3FORMS_ACCESS_KEY` is required for contact and career form emails.
- `PORT` is optional and defaults to `8787`.
- Get a free Web3Forms access key from `https://web3forms.com/`. It does not require verifying the `trineprojects.com` domain.
- Because this is a Vite client-side variable, the name must start with `VITE_`.

## Run Locally

Start the API server:

```bash
npm run dev:api
```

In another terminal, start the Vite frontend:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

During development, `vite.config.js` proxies `/api` and `/uploads` to `http://127.0.0.1:8787`.

After changing `.env`, restart `npm run dev` so Vite picks up `VITE_WEB3FORMS_ACCESS_KEY`. Restart `npm run dev:api` after changing backend values like `ADMIN_PASSWORD` or `PORT`.

## Scripts

```bash
npm run dev       # Start Vite development server
npm run dev:api   # Start API server with node --watch
npm run build     # Build frontend into dist
npm run preview   # Preview the built frontend with Vite
npm run lint      # Run ESLint
npm start         # Start production Node server
```

## Routes

- `/` - Home
- `/projects/:slug` - Project category detail pages
- `/services` - Services
- `/our-strength/visionary` - Visionary
- `/our-strength/plant-machinery` - Plant and machinery
- `/life-at-trine` - Life at Trine
- `/careers` - Careers
- `/admin` - Content admin panel

## Content And Admin

Default content is defined in `src/data/defaultContent.js`.

The frontend loads default content first, then tries to fetch saved content from `/api/content`. If the API is unavailable, the site still renders using bundled defaults.

The admin panel can update:

- Site text
- Clients and client logos
- Project categories and project cards
- Career roles
- Plant and machinery items
- Visionary profiles
- Life at Trine events
- Services, activities, and values

Saved content is written to `server/data/content.json`. Uploaded images are written to `public/uploads`.

Both paths are intentionally ignored by git because they are runtime data.

## Forms

Contact and career form submissions are sent through Web3Forms from the browser.

Free Web3Forms submissions support the form text fields. Resume file attachments are not included on the free setup; the career form sends the selected resume file name in the email instead.

## Production Build

Build the frontend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The production server:

- Serves the built app from `dist`.
- Serves uploaded files from `public/uploads`.
- Handles `/api/content` and `/api/admin/*`.
- Falls back to `dist/index.html` for client-side routes.

## Assets

- Logo: `public/trine-logo.jpeg`
- Symbol logos: `public/trine logo symbol.png`, `public/TRINE LOGO SYMBOL W.png`
- Hero image: `public/hero-building.png`
- Client logos: `public/clients` and `public/clients/colored`
- Social icons: `public/socialmedia`
- Design reference: `public/design-ref/page-1.png`

## Maintenance Notes

- Back up `server/data/content.json` before deployments or server moves.
- Back up `public/uploads` if admins have uploaded images.
- Keep `.env` private.
- Change `ADMIN_PASSWORD` before production use.
- Add a real `VITE_WEB3FORMS_ACCESS_KEY` before relying on public form submissions.

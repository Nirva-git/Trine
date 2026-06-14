# Project Memory

Last updated: 2026-06-15

This file records the current project state and important updates so future work can restart quickly.

## Project Overview

- Project name: Trine Projects Website.
- Purpose: React single-page website for Trine Projects, matching the Trine Web 02 design direction.
- Stack: Vite, React, React Router, plain CSS modules/files, Node HTTP server, Web3Forms.
- Main frontend entry: `src/main.jsx`.
- App routing: `src/App.jsx`.
- Production server: `server/server.js`.

## Current Features

- Public website pages:
  - Home page with hero, stats, portfolio/project categories, clients, contact, and careers sections.
  - Project category pages at `/projects/:slug`.
  - Services page at `/services`.
  - Visionary page at `/our-strength/visionary`.
  - Plant and machinery page at `/our-strength/plant-machinery`.
  - Life at Trine page at `/life-at-trine`.
  - Careers page at `/careers`.
- Admin panel:
  - Available at `/admin`.
  - Password-based login using `ADMIN_PASSWORD`.
  - Edits site text, clients, project categories/projects, careers, machinery, leaders, life events, and services.
  - Supports image uploads through `/api/admin/upload`.
  - Saves editable content through `/api/admin/content`.
- Content loading:
  - Frontend starts with `DEFAULT_CONTENT` from `src/data/defaultContent.js`.
  - When the API is available, `ContentProvider` fetches `/api/content` and replaces defaults with saved content.
  - Saved content lives in `server/data/content.json`.
- Forms:
  - Contact form sends through the free Web3Forms browser API.
  - Career form sends application details through the free Web3Forms browser API.
  - Free Web3Forms submissions do not include resume attachments; the selected resume file name is included in the email.
  - Email delivery requires `VITE_WEB3FORMS_ACCESS_KEY`.

## Important Files

- `README.md`: Setup, scripts, routes, admin, deployment, and maintenance notes.
- `Memory.md`: This living project update log.
- `.env.example`: Required environment variable names.
- `.gitignore`: Keeps `.env`, `server/data/content.json`, `dist`, `node_modules`, and uploaded files out of git.
- `vite.config.js`: Proxies `/api` and `/uploads` to `http://127.0.0.1:8787` during local frontend development.
- `server/server.js`: Serves API routes, uploaded files, and the built `dist` app.
- `src/context/ContentContext.jsx`: Loads live content from the API with fallback defaults.
- `src/data/defaultContent.js`: Default content and seeded project/client data.
- `src/pages/AdminPage.jsx`: Admin UI and content editing workflow.
- `public/uploads/.gitkeep`: Keeps the upload directory present while ignoring uploaded files.

## Assets

- Main logo: `public/trine-logo.jpeg`.
- Symbol logo variants:
  - `public/trine logo symbol.png`
  - `public/TRINE LOGO SYMBOL W.png`
  - `public/trine-contact-logo.png`
- Hero imagery:
  - `public/hero-building.png`
  - `public/Hero Page Image.png`
- Client logos:
  - Black and white logos in `public/clients`.
  - Colored logos in `public/clients/colored`.
- Social icons: `public/socialmedia`.
- Design reference image: `public/design-ref/page-1.png`.

## Local Development Notes

- Run the frontend with `npm run dev`.
- Run the API server with `npm run dev:api`.
- Vite dev server expects API traffic on port `8787`.
- The frontend can still render without the API because default content is bundled.
- To test admin saves locally, both the Vite server and API server should be running.

## Production Notes

- Build with `npm run build`.
- Start the production server with `npm start`.
- The Node server serves files from `dist`, handles API routes, and serves uploaded files from `public/uploads`.
- Required production env vars:
  - `ADMIN_PASSWORD`
  - `VITE_WEB3FORMS_ACCESS_KEY`
  - `PORT` optional, defaults to `8787`
- `server/data/content.json` is runtime data. Back it up before replacing or redeploying the server directory.
- `public/uploads` contains runtime uploads. Back it up along with content data.

## Update Log

### 2026-06-15

- Added this `Memory.md` project memory file.
- Expanded `README.md` with project overview, setup, scripts, routes, content/admin workflow, environment variables, deployment notes, and maintenance notes.
- Documented the current admin/content API behavior and runtime data locations.
- Updated API npm scripts to load `.env` with Node's `--env-file=.env`, so `ADMIN_PASSWORD` and email settings are available to `server/server.js`.
- Replaced Resend form delivery with free Web3Forms browser submissions to avoid domain verification errors.
- Fixed production static asset serving for URL-encoded filenames, so admin previews and static logos load correctly from `127.0.0.1:8787`.
- Refreshed the admin UI into a more branded content studio with improved navigation, cards, upload controls, image previews, and section guidance.
- Saved the uploaded service images into `server/data/content.json` and improved admin draft handling with unsaved-change status plus a sticky save bar.

## Known Follow-Ups

- Replace any placeholder service, machinery, leader, job, and life event images through the admin panel.
- Replace any placeholder biographies in `src/data/defaultContent.js` or through saved admin content.
- Review default copy for typos before launch.
- Confirm Resend sender domain and production email settings before enabling public forms.
- Consider adding automated tests for the content API and admin save/upload flows if this project continues to grow.

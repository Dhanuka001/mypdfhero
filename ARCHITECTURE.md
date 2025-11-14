# MyPDFHero – Phase 0 Architecture Plan

## 1. Goals & Principles
- Build a no-login PDF utility with three focused tools (compress, merge, JPG → PDF) prioritizing speed, privacy, and simple UX.
- Keep tech stack mainstream (Next.js + Express) for fast hiring/maintenance.
- Favor purple/black/white palette and typography pairing: **Anton** for hero/headlines, **Josefin Sans** for body/secondary text.
- Monetization-ready via AdSense placements on landing + tool pages without degrading UX.

## 2. Monorepo Layout
```
mypdfhero/
  frontend/     # Next.js (App Router) + Tailwind + shadcn-like shared UI primitives
  backend/      # Express + PDF-processing logic + file/temp utilities
  infra/        # Dockerfiles, docker-compose, Caddy config, CI/CD scripts
  ARCHITECTURE.md
```

## 3. Frontend Blueprint (`frontend/`)
- **Framework**: Next.js 14+ with App Router.
- **Styling**: Tailwind CSS, PostCSS, autoprefixer, CSS variables for brand palette.
- **Fonts**: Load Anton (headlines) + Josefin Sans (body) from Google Fonts via `next/font`.
- **State/Data**: API interactions via built-in `fetch` on server actions or client components per page segment.
- **Shared Layout**:
  - `components/Navbar.tsx` – brand + nav + CTA.
  - `components/Footer.tsx` – sitemap, privacy, contact.
  - `components/Container.tsx` – responsive width constraint.
  - `components/FileDropzone.tsx` – drag/drop + fallback button (uses `react-dropzone`).
- **Routes**:
  - `/` landing: hero, quick pitch, grid of three tools, monetization slots, FAQ.
  - `/tools/compress-pdf`
  - `/tools/merge-pdf`
  - `/tools/jpg-to-pdf`
- **Tool Page Sections**:
  1. Hero (Anton headline, subtext, CTA).
  2. Upload area (dropzone + file list, size/count limits).
  3. Result block (progress, download, stats).
  4. “How it works” 3–4 steps.
  5. FAQ / SEO copy.
- **Client → API**:
  - Use `FormData` POST to backend endpoints.
  - Handle JSON responses `{ downloadUrl, warnings, stats }`.
  - On success, initiate download via blob URLs.

## 4. Backend Blueprint (`backend/`)
- **Runtime**: Node.js 20 LTS, Express 4, TypeScript (ts-node-dev for dev).
- **Middleware**:
  - `multer` for multipart uploads (memory or disk storage).
  - `express-rate-limit` + simple auth key for internal health endpoints.
  - `helmet`, `cors` (whitelist frontend origin).
- **Routes**:
  - `POST /api/pdf/compress`
  - `POST /api/pdf/merge`
  - `POST /api/pdf/jpg-to-pdf`
- **Processing Libraries**:
  - `pdf-lib` for merging, metadata, compression assists.
  - `hummus-recipe` or `ghostscript` via child process if higher compression needed (feature-flagged).
  - `sharp` for image normalization (JPG/PNG → PDF) with temp directories.
- **Limits & Safety**:
  - Max file size 20 MB per upload, max 10 files; enforce via multer config and manual checks.
  - Sanitize filenames, store temp files under `/tmp/mypdfhero`.
  - Delete temp artifacts after response (use `finally` or queue cleanup).
  - Return standardized JSON errors `{ errorCode, message, hint }`.
- **Observability**:
  - Structured logging via `pino`.
  - Health endpoint `GET /healthz`.

## 5. Infra & DevOps (`infra/`)
- **Docker**:
  - `frontend/Dockerfile` – multi-stage: install deps, build, run with `next start`.
  - `backend/Dockerfile` – install, build TypeScript, run `node dist/server.js`.
- **docker-compose**:
  - `infra/docker-compose.dev.yml` – hot reload volumes.
  - `infra/docker-compose.prod.yml` – stack for VPS.
- **Reverse Proxy**:
  - Caddyfile terminates TLS for `mypdfhero.com`, routes `/api/*` → backend, rest → frontend.
  - Automatic HTTPS using Caddy’s ACME.
- **Deployment Flow**:
  1. VPS (Ubuntu 22.04, Docker + Compose installed).
  2. GitHub Actions (on push to `main`) runs:
     - Lint/tests for frontend/backend.
     - Build docker images (optional cache).
     - SSH to VPS, `git pull`.
     - `docker compose -f infra/docker-compose.prod.yml up -d --build --force-recreate`.
  3. `.env` files managed via VPS secrets or Docker secrets (never committed).

## 6. Phase 1–3 Preview (for alignment)
- **Phase 1 – Frontend MVP**: Scaffold Next.js app, global styles, responsive layout, static “tool” pages with stubbed API calls.
- **Phase 2 – Backend MVP**: Implement Express endpoints with in-memory / temp-file processing, integrate with frontend.
- **Phase 3 – Production Hardening**: Add analytics/ads, finalize docker + proxy configs, set up CI/CD, monitoring, and staging smoke tests.

This document is the source of truth for architecture decisions going into implementation.

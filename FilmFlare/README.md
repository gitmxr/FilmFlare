# FilmFlare

Movie and music discovery app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Data is powered by the TMDB and YouTube APIs via server-side API routes.

**Live:** https://film-flare.vercel.app

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand + SWR
- Framer Motion

## Prerequisites

- Node.js 20+
- npm 10+
- TMDB API key — https://www.themoviedb.org/settings/api
- YouTube Data API key — https://console.cloud.google.com/

## Local development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.local.example .env.local
```

3. Add your API keys to `.env.local`:

```env
TMDB_API_KEY=your_tmdb_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run type-check` | TypeScript validation |
| `npm run lint` | ESLint |
| `npm run test` | Run Vitest test suite |
| `npm run test:coverage` | Tests with coverage report |
| `npm run analyze` | Bundle analysis build |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TMDB_API_KEY` | Yes | Server-only TMDB API key |
| `YOUTUBE_API_KEY` | Yes | Server-only YouTube API key |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL for metadata (e.g. `https://filmflare.vercel.app`) |

Never commit `.env`, `.env.local`, or production secrets. Use `.env.local.example` and `.env.production.example` as templates.

## Deploy to Vercel

### 1. Connect repository

1. Push this project to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).

### 2. Configure environment variables

In Vercel → Project → Settings → Environment Variables, add:

| Name | Environments |
|------|----------------|
| `TMDB_API_KEY` | Production, Preview, Development |
| `YOUTUBE_API_KEY` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | Production (your production domain) |

### 3. Build settings

`vercel.json` runs quality checks before each deploy:

```bash
npm run type-check && npm run lint && npm run test && npm run build
```

### 4. Deploy

- **Production:** merge to `main` (or your default branch) with auto-deploy enabled.
- **Preview:** every pull request gets a preview URL.

### 5. Post-deploy checks

- [ ] Home page loads with movie sections
- [ ] Search works (movies + music)
- [ ] Movie detail pages show trailers
- [ ] Music detail pages embed YouTube
- [ ] `/api/health` returns `{ "status": "ok" }`
- [ ] Vercel Analytics dashboard shows traffic

### Health endpoint

```
GET /api/health
```

Returns `200` with `{ "status": "ok", "timestamp": "..." }` when API keys are configured, or `503` with `{ "status": "degraded" }` if missing.

### Rollback

If a deployment fails:

1. Vercel Dashboard → Deployments → select last working deployment → **Promote to Production**
2. Or revert the git commit and redeploy.

## Security

- API keys are server-only (never prefixed with `NEXT_PUBLIC_`)
- Security headers configured in `next.config.ts`
- `.env` files are gitignored

## Legacy Vite app

The original React + Vite codebase is preserved on the `legacy/react-vite` git branch for reference.

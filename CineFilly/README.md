# 🎬 CineFilly — Movie & Music Discovery

<p align="center">
  <img src="public/images/cinefilly_logo.webp" alt="CineFilly Logo" width="120" />
</p>

<p align="center">
  <strong>A modern full-stack web app for discovering movies, trailers, and music videos</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web-blue?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="Language" />
  <img src="https://img.shields.io/badge/Framework-Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white" alt="Framework" />
  <img src="https://img.shields.io/badge/UI-Tailwind%20CSS%20v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="UI" />
  <img src="https://img.shields.io/badge/Architecture-App%20Router-8B5CF6?style=flat-square" alt="Architecture" />
  <img src="https://img.shields.io/badge/License-Private-lightgrey?style=flat-square" alt="License" />
</p>

<p align="center">
  <a href="https://cine-filly.vercel.app"><strong>🌐 Live Demo</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/gitmxr/CineFilly">GitHub</a>
</p>

---

## ✨ Features

- 🎥 **Movie Discovery** — Browse trending, top-rated, Bollywood, and Hollywood movies
- 🔍 **Smart Search** — Debounced movie search with persistent search history
- 📄 **Movie Details** — Posters, ratings, runtime, overview, and YouTube trailers
- 🎶 **Music Discovery** — Indian, Pakistani, and English music video sections
- 🎧 **Music Search** — Search YouTube music videos with inline playback
- 📺 **Embedded Players** — Watch trailers and music videos without leaving the app
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side APIs** — TMDB and YouTube keys stay secure on the server
- 🔄 **ISR & Caching** — Fast pages with incremental static regeneration
- 🎨 **Smooth Animations** — Page transitions and card animations via Framer Motion
- ♿ **Accessible UI** — Skip links, ARIA labels, and reduced-motion support
- 🔒 **Security Hardened** — CSP headers, rate limiting, and input validation
- 📊 **Analytics Ready** — Vercel Analytics and Speed Insights integration
- 🧪 **Tested CI Pipeline** — Type-check, lint, 52+ tests, and build on every deploy

---

## 📱 Screenshots

> Add your screenshots to the `screenshots/` folder (e.g. `ss1.png`, `ss2.png`) and they will render below.

| **Home — Trending Movies** | **Movie Search** | **Movie Detail & Trailer** | **Music Page** |
| :---: | :---: | :---: | :---: |
| ![Home](screenshots/ss1.png) | ![Search](screenshots/ss2.png) | ![Movie Detail](screenshots/ss3.png) | ![Music](screenshots/ss4.png) |

| **Music Search** | **Music Detail** | **About Page** | **Contact Page** |
| :---: | :---: | :---: | :---: |
| ![Music Search](screenshots/ss5.png) | ![Music Detail](screenshots/ss6.png) | ![About](screenshots/ss7.png) | ![Contact](screenshots/ss8.png) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | React framework with App Router, SSR, SSG, and API routes |
| **React 19** | UI library with latest concurrent features |
| **TypeScript** | Type-safe development across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling and responsive layouts |
| **Zustand** | Lightweight client state (search, music, toasts) |
| **SWR** | Client-side data fetching and caching for movie search |
| **Framer Motion** | Page transitions and scroll-driven card animations |
| **Vitest** | Unit and integration testing |
| **Testing Library** | Component testing with user-event simulation |
| **TMDB API** | Movie data, posters, trailers, and similar films |
| **YouTube Data API** | Music video search, details, and embeds |
| **Vercel** | Production hosting, previews, and analytics |

---

## 🏗️ Architecture

```
CineFilly/
├── app/                          # Next.js App Router
│   ├── page.tsx                    # Home (movies + search + pagination)
│   ├── movie/[id]/               # Movie detail (ISR + metadata)
│   ├── music/                    # Music listing & detail pages
│   ├── about/                    # Static about page
│   ├── contact/                  # Contact form page
│   ├── api/                      # Server-side API routes
│   │   ├── movies/               # TMDB proxy (trending, search, detail…)
│   │   ├── music/                # YouTube proxy (search, detail)
│   │   └── health/               # Deployment health check
│   ├── layout.tsx                # Root layout, metadata, providers
│   ├── sitemap.ts                # SEO sitemap generation
│   └── robots.ts                 # Crawler rules
├── components/
│   ├── movies/                   # MovieCard, HomeContent, SearchBar…
│   ├── music/                    # MusicCard, MusicContent, MusicDetailView
│   ├── ui/                       # Header, Footer, Toast, LoadingSpinner
│   ├── contact/                  # ContactForm with validation
│   ├── animations/               # PageTransition
│   └── analytics/                # Web Vitals, Vercel Analytics
├── lib/
│   ├── api/                      # TMDB, YouTube, validation, rate-limit
│   ├── stores/                   # Zustand stores (movie, search, music, toast)
│   ├── hooks/                    # useSearch, useDebouncedValue
│   └── types/                    # Shared TypeScript interfaces
├── tests/                        # Vitest setup and mocks
├── middleware.ts                 # API rate limiting (60 req/min)
├── next.config.ts                # Images, security headers, CSP
└── vercel.json                   # CI build pipeline config
```

### Data flow

1. **Server pages** fetch movie/music data via `lib/api/tmdb.ts` and `lib/api/youtube.ts`
2. **Client components** handle search, pagination, and interactivity
3. **API routes** proxy external APIs so keys never reach the browser
4. **Middleware** rate-limits `/api/*` to protect quota and prevent abuse

---

## 🎨 Design Highlights

- **Cinematic Dark Theme** — Black/gray backgrounds with red and yellow accents
- **Gradient Search Headers** — Distinct blue and purple gradients for search results
- **Animated Cards** — Subtle hover and scroll-reveal effects (respects `prefers-reduced-motion`)
- **Optimized Images** — Next.js Image with AVIF/WebP and TMDB CDN patterns
- **Toast Notifications** — Non-blocking feedback on contact form actions
- **Breadcrumb Navigation** — Clear hierarchy on detail pages
- **Sticky Header** — Always-accessible navigation across routes

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20 or higher
- **npm** 10 or higher
- **TMDB API key** — [Get one here](https://www.themoviedb.org/settings/api)
- **YouTube Data API key** — [Google Cloud Console](https://console.cloud.google.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/gitmxr/CineFilly.git
cd CineFilly
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
TMDB_API_KEY=your_tmdb_api_key
YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run type-check` | TypeScript validation (`tsc --noEmit`) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript) |
| `npm run test` | Run Vitest test suite (52 tests) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Tests with V8 coverage report |
| `npm run analyze` | Bundle analysis build (`ANALYZE=true`) |

---

## 🌐 Deploy to Vercel

### 1. Connect repository

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (auto-detected)

### 2. Environment variables

| Name | Environments |
| --- | --- |
| `TMDB_API_KEY` | Production, Preview, Development |
| `YOUTUBE_API_KEY` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | Production (your domain) |

### 3. Build command

Vercel runs the full quality pipeline on every deploy:

```bash
npm run type-check && npm run lint && npm run test && npm run build
```

### 4. Post-deploy checklist

- [ ] Home page loads with all four movie sections
- [ ] Movie search returns results
- [ ] Movie detail pages show trailers
- [ ] Music page and search work
- [ ] `/api/health` returns `{ "status": "ok" }`

### Health endpoint

```
GET /api/health
```

| Status | Response |
| --- | --- |
| `200` | `{ "status": "ok", "timestamp": "..." }` |
| `503` | `{ "status": "degraded", "timestamp": "..." }` |

---

## 🔐 Security

- API keys are **server-only** (never `NEXT_PUBLIC_`)
- **Content-Security-Policy** and security headers in `next.config.ts`
- **Rate limiting** on API routes (60 requests/minute per IP)
- **Input validation** for movie IDs, video IDs, search queries, and pagination
- Sanitized error responses (no upstream API leaks)
- `.env` files are gitignored — never commit secrets

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Tests cover API routes, validation, rate limiting, Zustand stores, utilities, and core UI components.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure `npm run type-check`, `npm run lint`, and `npm run test` pass before submitting.

---

## 📜 Legacy Code

The original **React + Vite** app is preserved on the `legacy/react-vite` git branch for reference. The production app is **Next.js only**.

---

## 👨‍💻 Author

**Muhammad Riaz**

- GitHub: [@gitmxr](https://github.com/gitmxr)
- LinkedIn: [riazdev18](https://linkedin.com/in/riazdev18)
- Email: [riazdev18@gmail.com](mailto:riazdev18@gmail.com)

---

## ⭐ Show Your Support

If you find CineFilly useful, give the repo a **star** on GitHub!

---

<p align="center">
  Made with ❤️ using Next.js, React, and TypeScript
</p>

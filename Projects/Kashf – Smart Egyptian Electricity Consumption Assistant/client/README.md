# Kashf — AI-Powered Electricity Management

Egyptian households' smart electricity assistant: connect smart nodes, track Sheriha tiers in real time, forecast bills, and get personalized Arabic-language recommendations to save money every month.

## Features

- **Real-Time Embedded Monitoring** — Smart embedded system instant meter syncing via Kashf Smart Node
- **Sheriha Tier Tracking** — Real-time consumption monitoring with 48-hour cost forecasting
- **AI Energy Assistant** — Personalized recommendations in Egyptian Arabic
- **Progressive Web App** — Installable offline-first, works on iOS/Android/Windows/macOS without app store
- **Multi-language** — Full Dashboard UI in English & Arabic (RTL support)
- **Interactive UI** — Animated, scroll-triggered user interfaces with Framer Motion
- **Comprehensive Analytics** — Real-time meter gauges, historical consumption charts, and detailed reports
- **Billing Management** — Subscription tiers and payment tracking
- **Responsive Design** — Mobile-first, optimized for curved screens

## Tech Stack

- **React 19** + **React Compiler** (babel-plugin-react-compiler)
- **Vite 8** + **Rolldown** (Rust-based bundler)
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing with lazy loading
- **Redux Toolkit** — global state management (auth, meters, bills, alerts, simulations)
- **TanStack Query** — server state & caching
- **React Hook Form + Zod** — forms & validation
- **i18next** — internationalization (EN/AR)
- **Framer Motion** — complex scroll and spring animations
- **Recharts** — interactive data visualization
- **React Helmet Async** — dynamic document head management (titles, meta)
- **Lucide React** — icon system
- **vite-plugin-pwa** — PWA manifest + service worker
- **ESLint** — linting

## Project Structure

```
client/
├── public/                 # Static assets (avatars, favicon, PWA icons)
├── src/
│   ├── assets/images/      # Static images
│   ├── auth/               # Auth bootstrap, route guards, token/session utils
│   ├── components/
│   │   ├── about/          # About page sections (hero, story, team, FAQ)
│   │   ├── analytics/      # Analytics chart wrappers
│   │   ├── auth/           # LoginForm, RegisterForm, PasswordInput, etc.
│   │   ├── billing/        # Billing/subscription components
│   │   ├── bills/          # Bill-related components
│   │   ├── common/         # Shared UI (headers, footers, sidebar, logo, stat cards)
│   │   ├── dashboard/      # ConsumptionGauge, DashboardStats, TrendChart
│   │   ├── icons/          # Custom SVG icon components
│   │   ├── layout/         # Layout wrappers
│   │   ├── Loader/         # Loading spinner components
│   │   ├── meters/         # Meter-related UI
│   │   ├── premium/        # Premium feature components
│   │   ├── profile/        # Profile tabs (overview, security, subscription, etc.)
│   │   ├── simulations/    # Simulation sandbox UI
│   │   └── welcome/        # Landing page sections (hero, features, pricing, PWA, etc.)
│   ├── hooks/              # Custom React hooks (useAuth, useActivity, usePWAInstall)
│   ├── i18n/               # Internationalization
│   │   └── locales/        # en.json + ar.json
│   ├── layouts/            # AdminLayout, AppLayout, UserLayout
│   ├── pages/              # Route-level components
│   │   ├── admin/          # Admin dashboard pages (7 pages)
│   │   └── user/           # User-facing pages (Welcome, About, Auth, Dashboard, Profile)
│   │   ├── AiAdvisorPage.jsx
│   │   ├── AlertsPage.jsx
│   │   ├── BillingPage.jsx
│   │   ├── BillsPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ConsumptionAnalyticsPage.jsx
│   │   ├── MyMetersPage.jsx
│   │   ├── SimulationDashboardPage.jsx
│   │   └── SimulationOverviewPage.jsx
│   ├── routes/             # router.jsx + lazyPages.js
│   ├── schemas/            # Zod validation schemas (authSchemas.js)
│   ├── services/           # 13 API service modules (apiClient, auth, meters, etc.)
│   ├── store/              # Redux slices (auth, meters, bills, alerts, simulations)
│   ├── utils/              # cn.js (className merge), animations.js (Framer Motion)
│   ├── App.jsx             # Root: Redux Provider → AuthBootstrap → Router
│   └── main.jsx            # Entry: QueryClient, HelmetProvider, i18n init
├── index.html              # PWA-enabled entry HTML
├── Dockerfile              # Multi-stage build (node:20-alpine → nginx:alpine)
├── .dockerignore
├── .env.example
├── eslint.config.js
├── netlify.toml            # Netlify deployment config
├── vercel.json             # Vercel SPA configuration
├── package.json
└── vite.config.js          # Vite 8 config (React Compiler, Tailwind v4, PWA, Rolldown)
```

## Key Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Welcome (hero, features, pricing, PWA, testimonials) | Public |
| `/register` | Auth — Login / Register (tabbed) | Guest |
| `/about` | About — story, team, values, FAQ, CTA | Public |
| `/dashboard` | User dashboard (gauge, stats, trends) | User, Admin |
| `/meters` | My Meters — CRUD with Redux | User, Admin |
| `/meters/:id/simulation` | Meter simulation sandbox dashboard | User, Admin |
| `/simulation-overview/:id` | Simulation overview/details | User, Admin |
| `/analytics` | Consumption Analytics (charts, AI observations) | User, Admin |
| `/bills` | Bills — forecasts, history, breakdown | User, Admin |
| `/ai-advisor` | AI energy advisor | User, Admin |
| `/alerts` | Notification timeline | User, Admin |
| `/billing` | Subscription & payments | User, Admin |
| `/checkout/:planId` | Stripe subscription checkout | User, Admin |
| `/profile` | Profile (tabs: overview, meters, preferences, security, subscription) | User, Admin |
| `/admin/dashboard` | Admin KPIs | Admin |
| `/admin/users` | User management | Admin |
| `/admin/scans` | Smart Node / Device Management | Admin |
| `/admin/tiers` | Tier (Sheriha) management | Admin |
| `/admin/ai-logs` | AI activity logs | Admin |
| `/admin/notifications` | System notifications composer | Admin |
| `/admin/settings` | System settings | Admin |
| `*` | 404 Not Found | Public |

## Development

### With Docker (recommended)

From the project root:

```bash
docker-compose up --build
```

The client is served at http://localhost:8080 via Nginx, with API calls proxied to the server container.

### Manual (standalone)

```bash
# Install dependencies
npm install

# Start dev server (hot reload on port 5173)
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Preview production build
npm run preview
```

### Vite 8 & Dependency Optimization (Rolldown)

Vite 8 uses **Rolldown** (a Rust-based bundler) for dependency pre-bundling and optimization, replacing the deprecated `optimizeDeps.esbuildOptions`. 

To support packages like `recharts` that require custom shimming of sub-dependencies (specifically exporting `default` on `es-toolkit/compat` modules), the dependency optimization plugins are configured under `optimizeDeps.rolldownOptions.plugins` in `vite.config.js`.

Any new custom pre-bundling plugins should target `rolldownOptions` using Rollup-style `transform(code, id)` hooks rather than esbuild-specific loaders.

## Environment Variables

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

When using Docker Compose, `VITE_API_BASE_URL` is set to empty string (`""`) so the Nginx proxy routes `/api/` requests to the server container internally.

## Deployment

### Docker (containerized)

The `Dockerfile` produces a multi-stage production image:
1. **Stage 1 (builder):** `node:20-alpine` — `npm ci` + `npm run build`
2. **Stage 2 (runtime):** `nginx:alpine` — serves `dist/` and proxies `/api/` to the backend

Build: `docker build -t kashf-client .`

### Vercel (primary)

The `vercel.json` rewrites all routes to `index.html` for SPA routing. Connect the GitHub repo with root directory set to `client`.

### Netlify (fallback)

The `netlify.toml` provides zero-config deployment. Set base directory to `client` and add `VITE_API_BASE_URL` environment variable.

## Document Head Management

Each page sets its own `<title>` and `<meta name="description">` via `react-helmet-async`. The `HelmetProvider` wraps the app in `main.jsx`. Add `<Helmet>` to any new page to set its title and meta tags.

## Internationalization

Translations live in `src/i18n/locales/`:
- `en.json` — English
- `ar.json` — Arabic (RTL)

Add new keys to both files. Use `t('namespace.key')` in components.

## Navbar Scroll Sync

The marketing header uses `IntersectionObserver` to highlight the active section as you scroll. Sections tracked:
- Hero, Stats, Meter, Features, How It Works, PWA, Testimonials, Pricing

## Responsive Breakpoints

- Mobile: `< 640px` (px-4 → px-6 padding)
- Tablet: `640px–1023px`
- Desktop: `≥ 1024px` (burger menu hidden, full nav visible)

## License

ISC — Kashf Team
# Kashf — Team Task Board

**Last updated:** June 2026  
**Related:** [System Operations & Flows](./SYSTEM_OPERATIONS_AND_USER_FLOWS.md) · [Backend Services](./02-backend-services-and-middlewares.md) · [Sitemap & IA](./01-sitemap-and-information-architecture.md)

Use this file to track task ownership across all workstreams. Update status inline and commit the change in your PR.

**Status legend:** `🔴 Todo` · `🟡 In Progress` · `🟢 Done` · `⚪ Planned` · `🔵 Blocked`

---

## Frontend

### Profile & Account
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | PersonalInformation (view + edit) | — | Real PATCH /api/auth/profile |
| 🟢 Done | Profile picture upload | — | Cloudinary via PATCH /api/auth/profile/picture |
| 🟢 Done | NotificationPreferences (functional toggles) | — | Optimistic toggle, debounced PATCH |
| 🟢 Done | LanguageSelector (Navbar toggle) | — | EN/AR with RTL flip |
| 🟢 Done | SecuritySettings (password change) | — | |
| 🟢 Done | ThemeSelector (dark/light/system) | — | |

### Auth & Session
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Register page + form (React Hook Form + Zod) | — | |
| 🟢 Done | Login page + form | — | |
| 🟢 Done | AuthBootstrap: silent refresh on mount | — | |
| 🟢 Done | Session coordinator (token refresh + retry) | — | |
| 🟢 Done | Redux auth slice (user, accessToken, status) | — | Now includes consumptionGoals, notificationPreferences, phone, governorate, preferredLanguage, createdAt |
| 🟢 Done | Route guards (protected / public / admin) | — | |

### Welcome Page
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | HeroSection | — | |
| 🟢 Done | HowItWorksSection | — | |
| 🟢 Done | FeaturesSection | — | |
| 🟢 Done | ComparisonSection | — | |
| 🟢 Done | AIAssistantSection | — | |
| 🟢 Done | PricingSection | — | Translations in en.json + ar.json |
| 🟢 Done | PWASection (responsive, install prompt) | — | |
| 🟢 Done | TestimonialsSection | — | |
| 🟢 Done | CTASection | — | |
| 🟢 Done | Tabs equal width (grid layout) | — | |
| 🟢 Done | Toggle RTL fix | — | Negative translate in RTL |

### About Page
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | AboutHero (full-viewport, scroll indicator) | — | |
| 🟢 Done | AboutStory (2-col layout + timeline) | — | |
| 🟢 Done | AboutValues (4-card grid) | — | |
| 🟢 Done | AboutTeam (photo, name, title, LinkedIn) | — | |
| 🟢 Done | AboutFAQ (animated accordion) | — | |
| 🟢 Done | AboutCTA (Get Started + Contact Us) | — | |
| 🟢 Done | i18n translations (en + ar) | — | `about.*` namespace |

### i18n & Localization
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | i18next setup (en + ar) | — | |
| 🟢 Done | Language toggle (Navbar) | — | |
| 🟢 Done | RTL layout support | — | Tailwind logical properties |
| 🟢 Done | Pricing translations | — | |
| 🟢 Done | About page translations | — | |
| 🟢 Done | Dashboard translations | — | Done for all user modules |
| 🟢 Done | Bills page translations | — | |
| 🟢 Done | Tips page translations | — | |
| 🟢 Done | Global CSS Configuration | — | Added Tailwind v4 base styles (global cursor pointer) |
| 🔴 Todo | Admin panel translations | — | Lower priority |

### Dashboard (User)
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | PersonalInformation (view + edit profile form) | — | Real data from Redux, edit via PATCH /api/auth/profile, fallbacks for empty fields |
| 🟢 Done | NotificationPreferences (functional toggles) | — | Optimistic toggle, debounced PATCH /api/auth/notifications, RTL fix |
| 🟢 Done | AIAssistantPreferences | — | |
| 🟢 Done | ConsumptionGoals (real goals + edit) | — | Reads user.consumptionGoals, edit via PATCH /api/auth/goals, 0% progress until bills added |
| 🟢 Done | SecuritySettings | — | |
| 🟢 Done | ActivityHistory (real API data + semantic icons) | — | useActivity hook, 13-type icon map, relative time, skeleton, empty state, pagination |
| 🟢 Done | PWAStatus | — | |
| 🟢 Done | ProfileHeader (RTL avatar fix, real member since) | — | flex-row-reverse in RTL, real createdAt |
| 🟢 Done | AccountOverview (RTL icon fix) | — | Logical start alignment for icons |
| 🟢 Done | Subscription (real plan data + functional actions) | — | Plan-based feature lists, navigate to /pricing |
| 🟢 Done | ConsumptionAnalyticsPage | — | UI Mocked: Recharts integration for visual data |
| 🟢 Done | MyMetersPage | — | UI Mocked: View, manage, edit meters + AI Tips |
| 🟢 Done | BillsPage & BillingPage | — | UI Mocked: Billing history and subscription management |
| 🟢 Done | ReportsPage & AlertsPage | — | UI Mocked: Detailed exports and notification center |

### Meters
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | MyMetersPage (list, create, edit, delete) | — | CRUD via Redux, real API |
| 🟢 Done | Meter consumption derived from bills or synthetic trends | — | Controller generates trends when no bills exist |
| 🟢 Done | ConsumptionTimeline chart | — | |

### Tips & AI Advisor
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | PersonalizedTipsFeed | — | UI Mocked: Driven by dummy AI Advices integrated into My Meters |
| 🟢 Done | Simulation AI Advisor (POST /api/simulations/:id/advise) | — | Groq-powered tips in Egyptian Arabic |
| 🟢 Done | Simulation Chat (POST /api/simulations/:id/chat) | — | NLP intent classification via Groq |
| 🟢 Done | Simulation Recommendations (GET /api/simulations/:id/recommendations) | — | Deep analysis via Groq |

### Admin Panel
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | AdminLayout (sidebar + navbar) | — | Collapsible, RTL-aware |
| 🟢 Done | Admin Dashboard (KPI cards, charts) | — | Users, devices, bills KPIs |
| 🟢 Done | Users Management table | — | Search, pagination, toggle status, delete |
| 🟢 Done | Device/Meter Management | — | List, update status, delete |
| 🟢 Done | Tier Management (GET + PATCH) | — | View and update tier thresholds/rates |
| 🟢 Done | Notifications composer | — | Create, list, delete system notifications |
| 🟢 Done | System Settings form | — | Groq API key, OCR, upload limits, security |

---

## Backend

### Auth (Implemented ✅)
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | POST /api/auth/register | — | bcrypt, Cloudinary, JWT, cookies, logActivity(register) |
| 🟢 Done | POST /api/auth/login | — | logActivity(login) |
| 🟢 Done | POST /api/auth/logout | — | logActivity(logout) |
| 🟢 Done | POST /api/auth/refresh-token | — | rotating refresh tokens |
| 🟢 Done | GET /api/auth/me | — | isAuthenticated guard |
| 🟢 Done | PATCH /api/auth/profile/picture | — | Multer + Cloudinary, logActivity(picture_updated) |
| 🟢 Done | PATCH /api/auth/profile | — | Edit username, phone, governorate, preferredLanguage; logActivity(profile_updated) |
| 🟢 Done | PATCH /api/auth/goals | — | Update consumptionGoals; logActivity(goals_updated) |
| 🟢 Done | PATCH /api/auth/notifications | — | Partial update notificationPreferences; logActivity(notification_prefs_updated) |
| 🟢 Done | GET /api/activity | — | Paginated activity history for current user |
| 🟢 Done | User model (Mongoose) | — | Added: phone, governorate, preferredLanguage, consumptionGoals, notificationPreferences |
| 🟢 Done | Activity model (Mongoose) | — | userId, type enum (13 types), metadata, 90-day TTL |
| 🟢 Done | activity.service.js (logActivity + getUserActivity) | — | logActivity is non-critical (fire-and-forget) |
| 🟢 Done | User model (Mongoose) | — | username, email, password, role, picture |
| 🟢 Done | token.service.js (sign, verify, set/clear cookies) | — | |
| 🟢 Done | asyncHandler middleware | — | |
| 🟢 Done | isAuthenticated middleware | — | |
| 🟢 Done | isAdmin middleware | — | |
| 🟢 Done | validateRequestBody (Joi factory) | — | |
| 🟢 Done | uploadProfilePicture (Multer memory) | — | |
| 🟢 Done | CORS config (whitelist with localhost + production) | — | |
| 🟢 Done | Global error handler | — | |
| 🟢 Done | AppError utility | — | |
| 🟢 Done | userMapper (toPublicUser) | — | |
| 🟢 Done | Admin seed script | — | `npm run seed:admin` |

### Bills (Manual Entry)
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Bill model (Mongoose) | — | month, consumption, tier, amount, meter, status |
| 🟢 Done | POST /api/bills | — | Create bill with consumption reading |
| 🟢 Done | GET /api/bills | — | Paginated, filterable by status/year |
| 🟢 Done | PUT /api/bills/:id | — | Update bill entry |
| 🟢 Done | DELETE /api/bills/:id | — | Remove bill |
| 🟢 Done | Bills linked to meters | — | Meter controller derives consumption from bills |

### Meters
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Meter model (Mongoose) | — | name, number, type, status, consumption |
| 🟢 Done | GET /api/meters | — | Returns meters with consumption derived from bills or synthetic trends |
| 🟢 Done | POST /api/meters | — | Create meter (plan-limited: free=1, plus=2, family=5) |
| 🟢 Done | PUT /api/meters/:id | — | Update meter details |
| 🟢 Done | DELETE /api/meters/:id | — | Remove meter |

### Sheriha Tier System
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Tier model (thresholds, price/kWh, name) | — | Mongoose schema, 7 tiers |
| 🟢 Done | tier.constants.js (computeTier + computeBill) | — | Used by simulation engine, predictor, what-if, autopilot |
| 🟢 Done | Admin tier management (GET + PATCH /api/admin/tiers) | — | View and update rates/thresholds |
| 🟢 Done | Seed default Egyptian tariff tiers | — | Auto-seeds on startup via tier.seed.js |

### Dashboard API
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | GET /api/meters | — | Meters with consumption from bills or synthetic trends |
| 🟢 Done | GET /api/bills | — | Paginated bill history |
| 🟢 Done | GET /api/activity | — | Recent user activity log |
| 🟢 Done | GET /api/simulations | — | Simulation sandbox list with runtime state |

### Simulation Engine
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Simulation model (Mongoose) | — | Circuits, devices, auto-pilot config |
| 🟢 Done | CRUD: POST/GET/PATCH/DELETE /api/simulations | — | Full simulation lifecycle |
| 🟢 Done | Tier prediction (GET /api/simulations/:id/prediction) | — | Remaining kWh, hours-to-next-tier, warning level |
| 🟢 Done | What-if analysis (POST /api/simulations/:id/what-if) | — | Project kWh/bill/tier after device toggles |
| 🟢 Done | SSE stream (GET /api/simulations/:id/stream) | — | Real-time tick broadcast |
| 🟢 Done | Auto-pilot (start/stop) | — | Auto-disable non-essential devices when exceeding goal |

### Admin APIs
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | GET /api/admin/users | — | Search, pagination, status filter |
| 🟢 Done | PATCH /api/admin/users/:userId/status | — | Toggle isActive |
| 🟢 Done | DELETE /api/admin/users/:userId | — | Cascades to meters, bills, activities |
| 🟢 Done | GET /api/admin/dashboard/stats | — | User/device/bill counts, active rate |
| 🟢 Done | GET/PATCH /api/admin/tiers | — | View and update tier config |
| 🟢 Done | GET/POST/DELETE /api/admin/notifications | — | Full CRUD on system notifications |
| 🟢 Done | GET/PATCH /api/admin/settings | — | SystemConfig key-value store |
| 🟢 Done | GET /api/admin/devices | — | List all devices with search/filter |
| 🟢 Done | PATCH/DELETE /api/admin/devices/:deviceId | — | Update status, delete device |

### Infrastructure
| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | CORS config (whitelist with localhost + production) | — | `config/corsOptions.js` |
| 🟢 Done | cookie-parser (cookie-based auth) | — | HttpOnly, Secure, SameSite cookies |
| 🟢 Done | express.json() body parser | — | Standard JSON body parsing |
| 🟢 Done | Stripe webhook raw body parser | — | `express.raw()` before JSON parser |
| 🟢 Done | Global error handler | — | Catches all errors, returns JSON |

---

## AI (Groq Integration)

| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | groq.js config (OpenAI-compatible client) | — | Llama 3.3 70B via Groq API |
| 🟢 Done | Simulation Advisor (POST /:id/advise) | — | 3 personalized tips in Egyptian Arabic |
| 🟢 Done | Simulation Chat (POST /:id/chat) | — | NLP intent classification + action execution |
| 🟢 Done | Smart Recommender (POST /:id/recommend) | — | Deep consumption analysis |
| 🟢 Done | Tier Prediction (GET /:id/prediction) | — | Math-based, no AI call |
| 🟢 Done | What-If Analysis (POST /:id/what-if) | — | Project consumption after device changes |
| 🟢 Done | Auto-Pilot (start/stop auto-pilot) | — | Auto-toggle non-essential devices |
| 🟢 Done | SSE Stream (GET /:id/stream) | — | Real-time runtime state broadcast |
| 🟢 Done | Coin system for chat | — | 1 coin per message, plan-based limits |
| ⚪ Planned | Multi-language tip generation (AR + EN) | — | |

---

## PWA

| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | PWA install prompt section (welcome page) | — | |
| 🟢 Done | Responsive PWA section layout (mobile stack) | — | |
| 🟢 Done | `manifest.json` (name, icons, theme color) | — | Configured in vite.config.js |
| 🟢 Done | Service worker (offline caching) | — | Configured in vite.config.js using workbox |
| 🟢 Done | Offline fallback page | — | Handled via SPA shell architecture fallback |
| 🟢 Done | Background sync for bill uploads | — | Configured in Workbox backgroundSync for API caching |
| 🔴 Todo | Push notifications (tier warning alerts) | — | |
| 🟢 Done | App icon set (all sizes: 192, 512, maskable) | — | Icons present in public/ |
| 🔴 Todo | iOS / Android install testing | — | |
| ⚪ Planned | Periodic background sync (auto meter reminder) | — | |

---

## Payment (Stripe)

| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Stripe SDK integration (`stripe` v22) | — | Server dependency installed |
| 🟢 Done | Plan/subscription model (Free / Plus / Family) | — | Plus=49 EGP/150 coins, Family=99 EGP/300 coins |
| 🟢 Done | Stripe Checkout integration (server-side) | — | `POST /api/payments/pay-for-plan` |
| 🟢 Done | Stripe webhook handler | — | `POST /api/payments/webhook` with signature verification |
| 🟢 Done | Subscription status on User model | — | subscriptionPlan, stripeCustomerId, coins, rolloverCoins, renewalDate |
| 🟢 Done | Feature gating (plan-based meter limits) | — | free=1, plus=2, family=5 meters |
| 🟢 Done | Payment history endpoint | — | `GET /api/payments/history` |
| 🟢 Done | Checkout verification | — | `GET /api/payments/verify-checkout` |
| 🟢 Done | Cancel subscription | — | `POST /api/payments/cancel-subscription` |
| 🟢 Done | Frontend: PricingSection → Checkout flow | — | CheckoutPage.jsx with plan selection |
| 🟢 Done | Frontend: billing/subscription settings page | — | BillingPage.jsx with plan, history, payment method |
| 🟢 Done | Invoice / receipt emails | — | Stripe handles automatically |
| 🟢 Done | Free trial logic | — | |

---

## Docker & Hosting

| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Vercel deployment (client) | — | `client/vercel.json` |
| 🟢 Done | Vercel deployment (server) | — | `server/vercel.json` |
| 🟢 Done | CORS configured for Vercel + Netlify + localhost + Docker | — | `config/corsOptions.js` |
| 🟢 Done | `.env` removed from git tracking | — | `git rm --cached` |
| 🟢 Done | MongoDB Atlas (production cluster) | — | M0 free → M10 when usage grows |
| 🟢 Done | Dockerfile for client (multi-stage: node → nginx) | — | `client/Dockerfile` |
| 🟢 Done | Dockerfile for server (node:20-alpine production) | — | `server/Dockerfile` |
| 🟢 Done | Root Dockerfile (reference placeholder) | — | `Dockerfile` |
| 🟢 Done | `.dockerignore` for client + server | — | Excludes node_modules, .env, .git |
| 🟢 Done | `docker-compose.yml` (client + server orchestration) | — | `docker-compose up --build` |
| 🟢 Done | Nginx reverse proxy for API in client Dockerfile | — | Proxies `/api/` → `server:3000` |
| 🟢 Done | Docker docs in README + client/README |
| 🟢 Done | Monitoring & alerting (Sentry or Vercel analytics) | — | |

---

## Docs

| Status | Task | Owner | Notes |
|--------|------|-------|-------|
| 🟢 Done | Sitemap & Information Architecture | — | `docs/01-sitemap-and-information-architecture.md` |
| 🟢 Done | Backend Services & Middlewares | — | `docs/02-backend-services-and-middlewares.md` |
| 🟢 Done | Project Guidelines | — | `docs/03-project-guidelines.md` |
| 🟢 Done | Vercel Deployment Guide | — | `docs/VERCEL_DEPLOYMENT.md` |
| 🟢 Done | System Operations & User Flows | — | `docs/SYSTEM_OPERATIONS_AND_USER_FLOWS.md` |
| 🟢 Done | Team Task Board (this file) | — | `docs/teamTasks.md` |
| 🟢 Done | Database schema diagrams | — | Draw.io or Mermaid ER diagrams |
| 🟢 Done | Simulation + AI pipeline diagram | — | Added Mermaid flowcharts to docs/05-ai-agents.md |
| 🟢 Done | Update docs when dashboard/tips/bills implemented | — | Updated with current implementation |
| 🟢 Done | Docker documentation in README + docs | — | Added Docker Compose, Dockerfiles, architecture docs |

---

## Conventions

- **Status updates:** Change the emoji in your task row when you start or finish. Commit the change in the same PR as the implementation.
- **New tasks:** Add a new row under the correct section. Use `⚪ Planned` if it's future work with no active owner yet.
- **Blocked tasks:** Use `🔵 Blocked`, add a note explaining the dependency.
- **Owner field:** Put your GitHub username or initials. Leave `—` if unassigned.

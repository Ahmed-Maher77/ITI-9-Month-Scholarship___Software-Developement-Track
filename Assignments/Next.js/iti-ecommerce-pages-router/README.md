# ShopSphere — ITI E-Commerce

Next.js 16 App Router e-commerce app with MongoDB, CRUD API, search/filter/sort, SSR toasts, dark theme, React 19 hooks, and NextAuth (Google + Facebook).

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a remote `MONGODB_URL`)
- Google & Facebook OAuth apps (for sign-in)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables and fill in OAuth credentials:

```bash
cp .env.example .env.local
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

OAuth redirect URIs (adjust port if needed):

- Google: `http://localhost:3000/api/auth/callback/google`
- Facebook: `http://localhost:3000/api/auth/callback/facebook`

3. Seed the database (imports products from DummyJSON):

```bash
npm run seed
```

4. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

| Feature | Route / File |
|---------|----------------|
| Sign in (Google / Facebook) | `/login` |
| Product catalog | `/products` (guests: 3 products) |
| Search, filter, sort | `/products?q=&category=&sort=` (auth only) |
| Product detail | `/products/[id]` |
| Admin CRUD | `/admin/products` (auth only) |
| REST API | `/api/products`, `/api/products/[id]` |
| SSR news/quotes toasts | `layout.tsx` + `ToastHost` |
| Dark theme toggle | Navbar sun/moon button |

## Auth behavior

| Role | Catalog | Admin / CRUD |
|------|---------|--------------|
| Guest | 3 products, no search/filter | Blocked (redirect to `/login`) |
| Signed in | Full catalog + filters | Full access |

## API

```bash
# List products
GET /api/products?q=phone&category=smartphones&sort=price-asc&limit=10

# Create
POST /api/products

# Read / Update / Delete
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run seed` | Seed MongoDB with DummyJSON products |
| `npm run lint` | Run ESLint |

## Tech Stack

- Next.js 16 (App Router)
- React 19 (`useActionState`, `useTransition`, `useOptimistic`, `useDeferredValue`)
- MongoDB + Mongoose
- Tailwind CSS v4
- next-themes
- NextAuth.js v5 (Auth.js)

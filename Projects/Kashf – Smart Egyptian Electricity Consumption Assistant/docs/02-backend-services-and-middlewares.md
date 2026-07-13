# Backend Services & Middlewares Documentation

**Project:** Kashf Server (`kashf-server`)  
**Stack:** Node.js 20, Express 5, MongoDB (Mongoose 9), Joi, bcryptjs, JWT, Multer, Cloudinary, Groq AI (OpenAI SDK), Stripe, CORS, dotenv, node-cron, nodemailer  
**Source root:** `server/`  
**Last updated:** June 2026

---

## 1. Project Architecture Overview

### Folder structure

```
server/
├── Dockerfile                       # node:20-alpine production image
├── .dockerignore
├── .env.example                     # Required environment variables template
├── server.js                        # Entry point: app setup, route mounts, global middleware
├── vercel.json                      # Vercel deployment config (@vercel/node)
├── netlify.toml                     # Netlify Functions config (fallback)
├── bruno/                           # API testing collection
│   └── Simulation API/
├── config/
│   ├── corsOptions.js               # CORS origin whitelist (env-configurable)
│   └── startServerWithDB.js         # DB connect + app.listen with retry (max 5×5s)
├── database/
│   ├── dbConnect.js                 # Mongoose connection helper
│   ├── models/                      # 10 MongoDB models/schemas:
│   │   ├── activity.model.js        # Audit logs with 90-day TTL
│   │   ├── alert.model.js           # Multi-category user alerts with i18n
│   │   ├── bill.model.js            # Monthly bills (consumption, tier, EGP)
│   │   ├── meter.model.js           # Electric meters (derived trends)
│   │   ├── payment.model.js         # Stripe Checkout metadata
│   │   ├── session.model.js         # Active sessions with 7-day TTL
│   │   ├── simulation.model.js      # Virtual appliances configuration
│   │   ├── systemConfig.model.js    # Settings key-value store
│   │   ├── tier.model.js            # Billing tier constants/rules
│   │   └── user.model.js            # Accounts overview + goals
│   └── seed/                        # Database seed scripts
│       ├── systemConfig.seed.js
│       └── tier.seed.js
├── public/
│   └── views/
│       ├── home.html                # GET / static page
│       └── 404.html                 # Unmatched routes HTML response
├── scripts/
│   └── seedAdmin.js                 # One-time admin seed script
└── src/
    ├── config/
    │   ├── auth.constants.js        # Auth tokens, roles, and plan limits
    │   ├── activity.constants.js    # Activity event types enum (13 types)
    │   ├── cloudinary.js            # Cloudinary media upload helpers
    │   ├── groq.js                  # OpenAI-compatible Groq client (advice generation)
    │   └── tier.constants.js        # Egyptian Sheriha tier thresholds & bill computation
    ├── middlewares/
    │   ├── asyncHandler.js          # Wraps async controllers → next(err)
    │   ├── isAuthenticated.js       # JWT access-token guard → req.user
    │   ├── isAdmin.js               # Role guard: req.user.role === "admin"
    │   ├── uploadProfilePicture.js  # Multer memory-storage, image MIME filter
    │   └── validateRequestBody.js   # Joi body validation factory
    ├── modules/                     # Controllers, routes, and validation schemas:
    │   ├── activity.controller.js   # GET /api/activity
    │   ├── activity.routes.js
    │   ├── admin.controller.js      # /api/admin (dashboard stats, users, tiers, settings)
    │   ├── admin.routes.js
    │   ├── alert.controller.js      # /api/alerts (mark read, delete)
    │   ├── alert.routes.js
    │   ├── bill.controller.js       # /api/bills CRUD
    │   ├── bill.routes.js
    │   ├── meter.controller.js      # /api/meters CRUD
    │   ├── meter.routes.js
    │   ├── payment.controller.js    # /api/payments (checkout, webhook, history)
    │   ├── payment.routes.js
    │   ├── simulation.controller.js # /api/simulations (CRUD + engine + AI agents)
    │   ├── simulation.routes.js
    │   ├── simulation.validation.js # Joi schemas for simulation endpoints
    │   ├── user.controller.js       # /api/auth (login, register, profile, 2FA, security)
    │   ├── user.routes.js
    │   └── user.validation.js       # Joi schemas for auth endpoints
    ├── services/                    # 15 business logic services:
    │   ├── auth.service.js          # Hashing, token issuance, profile updates
    │   ├── activity.service.js      # Log action to DB
    │   ├── alert.service.js         # Notification creation, dismissal
    │   ├── coin.service.js          # Coin validation, rollover, monthly reset
    │   ├── email.service.js         # Nodemailer email sending
    │   ├── payment.service.js       # Stripe billing session, verification, refund
    │   ├── subscription.service.js  # Plan management and renewal logic
    │   ├── token.service.js         # JWT generation, verification, cookies
    │   ├── simulation.engine.js     # In-memory virtual meter runtime (1s tick loop)
    │   ├── simulation.broadcaster.js # Server-Sent Events SSE registry
    │   ├── simulation.advisor.js    # AI consumption advisor (Groq prompts)
    │   ├── simulation.autopilot.js  # Autonomous device management agent
    │   ├── simulation.chat.js       # Natural language chat agent (intent classification)
    │   ├── simulation.predictor.js  # Tier prediction & remaining time calculations
    │   ├── simulation.recommender.js # Passive recommendations engine
    │   └── simulation.whatif.js     # What-if scenario fast-forward engine
    └── utils/
        ├── AppError.js              # Custom HTTP error class
        ├── totp.js                  # TOTP 2FA secret generation & verification
        ├── userLock.js              # In-memory lock for serializing requests per user
        └── userMapper.js            # Sanitizes user responses (removes sensitive fields)
```

### Route organization

- API routes live under `src/modules/` as feature modules.
- Auth routes are mounted at `/api/auth` via `app.use("/api/auth", userRoutes)`.
- Admin routes are mounted at `/api/admin` via `app.use("/api/admin", adminRoutes)`.
- Activity routes are mounted at `/api/activity` via `app.use("/api/activity", activityRoutes)`.
- Meters routes are mounted at `/api/meters` via `app.use("/api/meters", meterRoutes)`.
- Bills routes are mounted at `/api/bills` via `app.use("/api/bills", billRoutes)`.
- Simulations routes are mounted at `/api/simulations` via `app.use("/api/simulations", simulationRoutes)`.
- Payments routes are mounted at `/api/payments` via `app.use("/api/payments", paymentRoutes)`.
- Alerts routes are mounted at `/api/alerts` via `app.use("/api/alerts", alertRoutes)`.
- `GET /` serves a static HTML home page; unmatched routes return `404.html`.

---

## 2. Registered API Endpoints

### Auth & User Routes (`/api/auth`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `POST` | `/api/auth/register` | No | `uploadProfilePicture`, `validateRequestBody(signupSchema)` | Register new user account |
| `POST` | `/api/auth/login` | No | `validateRequestBody(loginSchema)` | Authenticate user and set cookies |
| `POST` | `/api/auth/logout` | No | — | Clear authentication cookies |
| `GET`  | `/api/auth/me` | Yes (JWT) | `isAuthenticated` | Fetch current user profile |
| `PATCH`| `/api/auth/profile/picture` | Yes (JWT) | `isAuthenticated`, `uploadProfilePicture` | Update profile avatar (Cloudinary) |
| `POST` | `/api/auth/refresh-token` | No (cookie) | — | Refresh access and refresh tokens |
| `PATCH`| `/api/auth/profile` | Yes (JWT) | `isAuthenticated` | Update name, phone, locale, governorate |
| `PATCH`| `/api/auth/goals` | Yes (JWT) | `isAuthenticated` | Update consumption target thresholds |
| `PATCH`| `/api/auth/notifications` | Yes (JWT) | `isAuthenticated` | Update notification preferences |
| `POST` | `/api/auth/security/change-password` | Yes (JWT) | `isAuthenticated` | Change password with old/new validation |
| `POST` | `/api/auth/security/2fa/setup` | Yes (JWT) | `isAuthenticated` | Generate 2FA secret and QR code |
| `POST` | `/api/auth/security/2fa/enable` | Yes (JWT) | `isAuthenticated` | Verify token and enable 2FA on account |
| `POST` | `/api/auth/security/2fa/disable` | Yes (JWT) | `isAuthenticated` | Disable 2FA on account |
| `POST` | `/api/auth/security/2fa/verify` | No | — | Verify 2FA token on login step |
| `GET`  | `/api/auth/security/devices` | Yes (JWT) | `isAuthenticated` | Get active login sessions |
| `DELETE`| `/api/auth/security/devices/:id` | Yes (JWT) | `isAuthenticated` | Revoke specific session (logout device) |
| `GET`  | `/api/auth/security/login-history` | Yes (JWT) | `isAuthenticated` | Get paginated log of login events |
| `POST` | `/api/auth/security/delete-account` | Yes (JWT) | `isAuthenticated` | Soft/hard delete user account |

### Meters & Bills (`/api/meters`, `/api/bills`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `GET`  | `/api/meters` | Yes (JWT) | `isAuthenticated` | List meters with latest readings/trends |
| `POST` | `/api/meters` | Yes (JWT) | `isAuthenticated` | Create a new meter (free/plus/family limits) |
| `PUT`  | `/api/meters/:id` | Yes (JWT) | `isAuthenticated` | Edit meter details |
| `DELETE`| `/api/meters/:id` | Yes (JWT) | `isAuthenticated` | Remove meter |
| `GET`  | `/api/bills` | Yes (JWT) | `isAuthenticated` | Fetch paginated/filtered bill history |
| `POST` | `/api/bills` | Yes (JWT) | `isAuthenticated` | Manually log a meter bill reading |
| `PUT`  | `/api/bills/:id` | Yes (JWT) | `isAuthenticated` | Edit logged bill data |
| `DELETE`| `/api/bills/:id` | Yes (JWT) | `isAuthenticated` | Delete bill |

### Simulations & AI Sandbox (`/api/simulations`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `GET`  | `/api/simulations` | Yes (JWT) | `isAuthenticated` | List simulation sessions |
| `POST` | `/api/simulations` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(createSimulationSchema)` | Create or auto-generate smart home config |
| `GET`  | `/api/simulations/:id` | Yes (JWT) | `isAuthenticated` | Get simulation state & details |
| `DELETE`| `/api/simulations/:id` | Yes (JWT) | `isAuthenticated` | Remove simulation session |
| `POST` | `/api/simulations/:id/circuits` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(addCircuitSchema)` | Add room/circuit to simulation |
| `PATCH`| `/api/simulations/:id/circuits/:cid` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(updateCircuitSchema)` | Rename circuit |
| `DELETE`| `/api/simulations/:id/circuits/:cid` | Yes (JWT) | `isAuthenticated` | Delete circuit and its devices |
| `POST` | `/api/simulations/:id/devices` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(addDeviceSchema)` | Add virtual device |
| `PATCH`| `/api/simulations/:id/devices/:did` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(updateDeviceSchema)` | Toggle power state or modify wattage |
| `DELETE`| `/api/simulations/:id/devices/:did` | Yes (JWT) | `isAuthenticated` | Remove device |
| `POST` | `/api/simulations/:id/start` | Yes (JWT) | `isAuthenticated` | Start tick loop (accumulate energy) |
| `POST` | `/api/simulations/:id/pause` | Yes (JWT) | `isAuthenticated` | Pause tick loop |
| `POST` | `/api/simulations/:id/reset` | Yes (JWT) | `isAuthenticated` | Reset kWh usage to zero |
| `GET`  | `/api/simulations/:id/stream` | Yes (JWT) | `isAuthenticated` | Connect SSE live updates stream |
| `POST` | `/api/simulations/:id/advise` | Yes (JWT) | `isAuthenticated` | Generate 3 Arabic tips (Groq) |
| `GET`  | `/api/simulations/:id/prediction` | Yes (JWT) | `isAuthenticated` | Predict hours remaining to next tier |
| `POST` | `/api/simulations/:id/what-if` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(whatIfSchema)` | Project usage with changes |
| `POST` | `/api/simulations/:id/chat` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(chatSchema)` | Chat with AI advisor (consumes 1 coin) |
| `POST` | `/api/simulations/:id/auto-pilot/start` | Yes (JWT) | `isAuthenticated`, `validateRequestBody(startAutoPilotSchema)` | Enable automated appliance shutoff |
| `POST` | `/api/simulations/:id/auto-pilot/stop` | Yes (JWT) | `isAuthenticated` | Disable auto-pilot |
| `GET`  | `/api/simulations/:id/auto-pilot` | Yes (JWT) | `isAuthenticated` | Get auto-pilot stats and actions taken |
| `GET`  | `/api/simulations/:id/recommendations` | Yes (JWT) | `isAuthenticated` | Run passive observations recommendations |

### Payments & Stripe (`/api/payments`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `POST` | `/api/payments/pay-for-plan` | Yes (JWT) | `isAuthenticated` | Initialize Stripe subscription checkout |
| `GET`  | `/api/payments/history` | Yes (JWT) | `isAuthenticated` | Get subscription payment logs |
| `GET`  | `/api/payments/verify-checkout` | Yes (JWT) | `isAuthenticated` | Verify successful checkout session |
| `DELETE`| `/api/payments/payment-method` | Yes (JWT) | `isAuthenticated` | Remove payment method |
| `POST` | `/api/payments/cancel-subscription` | Yes (JWT) | `isAuthenticated` | Cancel plan subscription renewal |
| `POST` | `/api/payments/webhook` | No | `express.raw()` raw body | Stripe webhook event receiver |

### Activity & Alerts (`/api/activity`, `/api/alerts`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `GET`  | `/api/activity` | Yes (JWT) | `isAuthenticated` | Get current user's activity logs |
| `GET`  | `/api/alerts` | Yes (JWT) | `isAuthenticated` | List user notification alerts |
| `PUT`  | `/api/alerts/read-all` | Yes (JWT) | `isAuthenticated` | Mark all alerts as read |
| `PUT`  | `/api/alerts/:id/read` | Yes (JWT) | `isAuthenticated` | Mark specific alert as read |
| `DELETE`| `/api/alerts/:id` | Yes (JWT) | `isAuthenticated` | Dismiss alert |

### Admin Moderation (`/api/admin`)

| Method | Route | Auth Required | Middlewares | Description |
|--------|-------|--------------|-------------|-------------|
| `GET`  | `/api/admin/health` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Check admin panel system status |
| `GET`  | `/api/admin/dashboard/stats` | Yes (Admin) | `isAuthenticated`, `isAdmin` | KPI summaries (users, bills, active rate) |
| `GET`  | `/api/admin/users/recent` | Yes (Admin) | `isAuthenticated`, `isAdmin` | List newly registered accounts |
| `GET`  | `/api/admin/users` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Get paginated/searchable list of all users |
| `PATCH`| `/api/admin/users/:id/status` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Toggle account active/inactive |
| `DELETE`| `/api/admin/users/:id` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Delete user and related cascade docs |
| `GET`  | `/api/admin/devices` | Yes (Admin) | `isAuthenticated`, `isAdmin` | List all connected devices/meters |
| `PATCH`| `/api/admin/devices/:id/status` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Update device active/standby status |
| `DELETE`| `/api/admin/devices/:id` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Remove device from platform |
| `GET`  | `/api/admin/tiers` | Yes (Admin) | `isAuthenticated`, `isAdmin` | List current Sheriha rules |
| `PATCH`| `/api/admin/tiers/:id` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Edit tariff rate or threshold |
| `GET`  | `/api/admin/notifications` | Yes (Admin) | `isAuthenticated`, `isAdmin` | List system notifications |
| `POST` | `/api/admin/notifications` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Send/create system broadcast |
| `DELETE`| `/api/admin/notifications/:id` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Dismiss notification broadcast |
| `GET`  | `/api/admin/settings` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Fetch platform configs |
| `PATCH`| `/api/admin/settings` | Yes (Admin) | `isAuthenticated`, `isAdmin` | Update platform configs |

### Static & Fallbacks

| Method | Route | Handler | Description |
|--------|-------|---------|-------------|
| `GET`  | `/` | `public/views/home.html` | Base website home screen |
| `*`    | Any unmatched | `public/views/404.html` (404) | Fallback not found page |

---

## 3. Endpoint Details

### POST /api/auth/register

**Purpose:** Create a new user account, optionally with a profile picture.

**Request:**

| Part | Detail |
|------|--------|
| Body (`multipart/form-data`) | `username`, `email`, `password`, `repassword`, optional `picture` file |

**Middleware chain:** `uploadProfilePicture` → `validateRequestBody(signupSchema)` → `register` controller

**Business flow:**
1. Multer parses multipart body; image stored in memory buffer.
2. Joi validates `username`, `email`, `password`, `repassword`.
3. `authService.register` checks for duplicate email/username (409 if exists).
4. If file provided, uploads buffer to Cloudinary; stores URL.
5. Hashes password with bcrypt (10 rounds).
6. Creates `User` document in MongoDB.
7. Signs access + refresh JWTs.
8. Sets `accessToken` and `refreshToken` as `HttpOnly` cookies via `setAuthCookies`.
9. Returns `201` with `{ success: true, data: { user, accessToken } }`.

**Success response:**
```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "username": "...", "email": "...", "role": "user", "picture": "..." },
    "accessToken": "<jwt>"
  }
}
```

**Error responses:**

| Code | Cause |
|------|-------|
| 400 | Joi validation failure — `{ message: "Validation failed.", details: [...] }` |
| 409 | Email or username already in use — `{ error: "Email or username already in use." }` |
| 500 | Cloudinary upload failure or DB error |

---

### POST /api/auth/login

**Purpose:** Authenticate a user and issue tokens.

**Request:**

| Part | Detail |
|------|--------|
| Body (`application/json`) | `email`, `password` |

**Business flow:**
1. Joi validates `email` and `password`.
2. `authService.login` looks up user by email (with `+password` select).
3. If not found or password mismatch → 401.
4. Signs access + refresh JWTs.
5. Sets `HttpOnly` cookies.
6. Returns `200` with `{ success: true, data: { user, accessToken } }`.

**Error responses:**

| Code | Cause |
|------|-------|
| 400 | Validation failure |
| 401 | Invalid email or password |

---

### POST /api/auth/logout

**Purpose:** Clear auth cookies on the server side.

**Business flow:**
1. `authService.logout` calls `clearAuthCookies(res)`.
2. Returns `200 { success: true, message: "Logged out successfully." }`.

---

### GET /api/auth/me

**Purpose:** Return the currently authenticated user's profile.

**Auth:** `isAuthenticated` middleware verifies access token from cookie, attaches `req.user`.

**Business flow:**
1. `authService.getMe({ userId: req.user.id })` queries MongoDB.
2. Returns `200 { success: true, data: { user } }`.

**Error responses:**

| Code | Cause |
|------|-------|
| 401 | Missing or invalid access token |
| 404 | User not found (deleted after token was issued) |

---

### PATCH /api/auth/profile/picture

**Purpose:** Replace a user's profile picture.

**Auth:** `isAuthenticated` required.

**Business flow:**
1. Multer parses multipart body.
2. Uploads new image to Cloudinary.
3. Updates `user.picture` in MongoDB.
4. Deletes previous Cloudinary image (if any).
5. Returns `200 { success: true, data: { user } }`.

---

### POST /api/auth/refresh-token

**Purpose:** Exchange a valid refresh token (from cookie) for a new access token + refresh token pair.

**Business flow:**
1. Reads `refreshToken` from `req.cookies[AUTH_COOKIE_KEYS.REFRESH_TOKEN]`.
2. If missing → 401.
3. Verifies JWT signature and expiry.
4. Loads user from MongoDB.
5. Signs new access + refresh tokens.
6. Overwrites cookies.
7. Returns `200 { success: true, data: { accessToken } }`.

**Error responses:**

| Code | Cause |
|------|-------|
| 401 | Missing, invalid, or expired refresh token; user not found |

---

## 4. Middlewares

### asyncHandler

**File:** `src/middlewares/asyncHandler.js`  
**Purpose:** Wraps async controller functions and forwards any thrown error to `next(err)`.

```javascript
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

Used on **all** controllers — eliminates the need for try/catch in every handler.

---

### isAuthenticated

**File:** `src/middlewares/isAuthenticated.js`  
**Purpose:** Verifies the access JWT from the `Authorization: Bearer <token>` header or the access-token cookie. Attaches `req.user = { id, role }`.

**Failure:** Throws `AppError("Not authenticated.", 401)`.

---

### isAdmin

**File:** `src/middlewares/isAdmin.js`  
**Purpose:** After `isAuthenticated`, checks `req.user.role === "admin"`.

**Failure:** Throws `AppError("Admin access required.", 403)`.

---

### uploadProfilePicture

**File:** `src/middlewares/uploadProfilePicture.js`  
**Purpose:** Multer middleware configured with memory storage. Accepts a single `picture` field. Filters MIME types to `image/*` only.

**File available as:** `req.file.buffer` (passed to Cloudinary).

---

### validateRequestBody

**File:** `src/middlewares/validateRequestBody.js`  
**Purpose:** Factory that returns a middleware validating `req.body` against a Joi schema.

**Failure response (400):**
```json
{
  "message": "Validation failed.",
  "details": [
    { "field": "email", "message": "\"email\" must be a valid email" }
  ]
}
```

---

### CORS (corsOptions)

**File:** `config/corsOptions.js`  
**Origin whitelist:**

```javascript
const allowedOrigins = [
    "https://kashf-ai-electricity-assistant.vercel.app",
    "https://kashf-smart-electricity-assistant.netlify.app",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:8080",   // Docker Compose (nginx proxy)
];
```

`credentials: true` — cookies and Authorization headers allowed.

> When running via Docker Compose, the client at `localhost:8080` makes API calls through the nginx reverse proxy. The `http://localhost:8080` origin must be in the whitelist.

---

## 5. Services

### auth.service.js

| Export | Purpose |
|--------|---------|
| `register({ body, file, res })` | Full registration flow: duplicate check → Cloudinary upload → bcrypt → User.create → JWT → cookies |
| `login({ body, res })` | Credential check → JWT → cookies |
| `logout({ res })` | Clear auth cookies |
| `refreshToken({ refreshTokenValue, res })` | Verify refresh JWT → new token pair → cookies |
| `getMe({ userId })` | Fetch user by ID → `toPublicUser()` |
| `updateProfilePicture({ userId, file })` | Upload new image → update user → delete old image |
| `hashPasswordForSeed` | Exported alias for `hashPassword` (used by seed script) |

### token.service.js

| Export | Purpose |
|--------|---------|
| `signAccessToken(payload)` | Signs JWT with `JWT_SECRET`, expires in `JWT_ACCESS_EXPIRES_IN` |
| `signRefreshToken(payload)` | Signs JWT with `JWT_REFRESH_SECRET`, expires in `JWT_REFRESH_EXPIRES_IN` |
| `verifyRefreshToken(token)` | Verifies with `JWT_REFRESH_SECRET`; throws on invalid/expired |
| `setAuthCookies(res, { accessToken, refreshToken })` | Sets two `HttpOnly`, `SameSite=None`, `Secure` cookies |
| `clearAuthCookies(res)` | Clears both auth cookies |

### coin.service.js

| Export | Purpose |
|--------|---------|
| `checkAndResetCoins(user)` | Monthly reset check: rolls over remaining coins and resets base plan coins |
| `deductCoins(user, amount)` | Validates and deducts coins (from base, then rollover) and saves changes |

---

## 6. Database

### User model (`database/models/user.model.js`)

| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Required, unique |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, selected out by default (`select: false`) |
| `role` | String | `"user"` or `"admin"`, default `"user"` |
| `subscriptionPlan` | String | `"free"`, `"plus"`, `"family"`, default `"free"` |
| `subscriptionRenewalDate` | Date | Expiry date of the premium subscription |
| `stripeCustomerId` | String | Customer ID for Stripe billing integration |
| `hasPaymentMethod` | Boolean | Whether a payment card is configured |
| `picture` | String | Cloudinary URL or null |
| `coins` | Number | Active AI coin balance (min: 0, default 50) |
| `rolloverCoins` | Number | Accrued unused coins rolled over from previous cycles (min: 0) |
| `lastCoinResetDate` | Date | Date when the monthly coin balance was last reset |
| `phone` | String | User's phone number |
| `governorate` | String | Egyptian governorate (for localized analytics) |
| `preferredLanguage` | String | `"ar"` or `"en"`, default `"ar"` |
| `consumptionGoals` | Object | Target limits: `monthlyKwhLimit`, `targetBillEgp`, `targetSheriha` |
| `notificationPreferences` | Object | Toggles for warnings, forecast, AI advice, email, push, etc. |
| `isActive` | Boolean | Account status |
| `twoFactorEnabled` | Boolean | 2FA status |
| `twoFactorSecret` | String | Secret for TOTP authenticator |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

### Connection

- `database/dbConnect.js` connects via `process.env.MONGO_URI`.
- `config/startServerWithDB.js` retries connection **up to 5 times** with **5-second** delay before starting the HTTP server.

---

## 7. Error Handling

### Global error handler (`server.js`)

```json
{ "error": "<message>" }
```

HTTP status = `err.statusCode || 500`.

### AppError (`src/utils/AppError.js`)

```javascript
throw new AppError("Human-readable message", statusCode);
```

Constructor: `(message: string, statusCode: number = 500)`.

### Validation errors (`validateRequestBody`)

Returns `400` directly (not via global handler):
```json
{
  "message": "Validation failed.",
  "details": [{ "field": "email", "message": "..." }]
}
```

---

## 8. Environment Variables

| Variable | Used in | Required |
|----------|---------|----------|
| `MONGO_URI` | `database/dbConnect.js` | ✅ |
| `PORT` | `server.js` | Default: `3000` |
| `JWT_SECRET` | `token.service.js` | ✅ |
| `JWT_REFRESH_SECRET` | `token.service.js` | ✅ |
| `JWT_ACCESS_EXPIRES_IN` | `token.service.js` | Default: `15m` |
| `JWT_REFRESH_EXPIRES_IN` | `token.service.js` | Default: `7d` |
| `CLOUDINARY_CLOUD_NAME` | `src/config/cloudinary.js` | ✅ |
| `CLOUDINARY_API_KEY` | `src/config/cloudinary.js` | ✅ |
| `CLOUDINARY_API_SECRET` | `src/config/cloudinary.js` | ✅ |
| `GROQ_API_KEY` | `src/config/groq.js` | For AI features |
| `GROQ_MODEL` | `src/config/groq.js` | Default: `llama-3.3-70b-versatile` |
| `STRIPE_SECRET_KEY` | `payment.service.js` | For payments |
| `STRIPE_WEBHOOK_SECRET` | `payment.controller.js` | For payments |
| `ALLOWED_ORIGIN` | `config/corsOptions.js` | Optional — env override |

---

## 9. Server Startup Flow

```
server.js
 ├── load dotenv
 ├── create express app
 ├── Stripe webhook raw body middleware (BEFORE express.json)
 │    └── POST /api/payments/webhook → express.raw({ type: "application/json" })
 ├── register global middleware (express.json, cookieParser, cors)
 ├── mount static route (GET / → home.html)
 ├── mount API routes:
 │    ├── /api/auth        (user routes — login, register, profile, 2FA, security)
 │    ├── /api/admin       (admin dashboard, users, tiers, settings, notifications)
 │    ├── /api/activity    (activity logs)
 │    ├── /api/meters      (meter CRUD)
 │    ├── /api/bills       (bill CRUD)
 │    ├── /api/simulations (simulation CRUD, engine control, AI agents, SSE)
 │    ├── /api/payments    (checkout, history, webhook)
 │    └── /api/alerts      (notification alerts)
 ├── 404 handler (→ 404.html)
 ├── global error handler → { error: message }
 └── startServerWithDB(app, PORT)
       └── dbConnect() → mongoose.connect(MONGO_URI)
             ├── success → app.listen(PORT)
             └── failure → retry x5 @ 5s intervals
```

---

## 10. Planned / In Progress

| Feature | Status | Description |
|---------|--------|-------------|
| Rate limiting (`express-rate-limit`) | Planned | Protect API endpoints from DDoS |
| `helmet` security headers | Planned | Enable HTTP security headers |
| Structured logging | Planned | Integrate Winston/Morgan logging |

---

*This document reflects files under `server/` as of June 2026. Update when adding endpoints, middleware, or services.*

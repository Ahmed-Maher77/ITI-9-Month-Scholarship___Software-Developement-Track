# Kashf — Deployment Guide (Vercel)

**Last updated:** June 2026  
**Replaces:** `NETLIFY_DEPLOYMENT.md` (archived — Netlify config files kept for fallback reference)

Both the frontend client and the backend server are deployed as **separate Vercel projects** from the same monorepo.

---

## Architecture overview

```
GitHub repo (monorepo)
├── client/   →  Vercel Project A  (Vite + React, static)
└── server/   →  Vercel Project B  (Express via @vercel/node, serverless)
```

- The **client** builds to a static SPA; Vercel serves `dist/index.html` for every route.
- The **server** is wrapped by `@vercel/node`; `server.js` is the entry point.
- Both projects connect to **MongoDB Atlas** and **Cloudinary** — never use local services in production.

---

## Prerequisites

| Tool | Notes |
|------|-------|
| Vercel account | Free Hobby tier works |
| GitHub repo connected to Vercel | Required for auto-deploy on push |
| MongoDB Atlas cluster | Free M0 tier works for dev |
| Cloudinary account | Free tier for image uploads |

---

## Step 1 — Deploy the Server

### 1.1 Create the Vercel project

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo
3. Set **Root Directory** to `server`
4. Vercel auto-detects `vercel.json` — no build settings needed

### 1.2 Set environment variables

In the Vercel dashboard → **Settings → Environment Variables**, add:

| Variable | Example value | Notes |
|----------|---------------|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/kashf` | MongoDB Atlas connection string |
| `JWT_SECRET` | `<64+ char random string>` | Access token signing key |
| `JWT_REFRESH_SECRET` | `<different 64+ char string>` | Refresh token signing key |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | Access token lifetime |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Refresh token lifetime |
| `CLOUDINARY_CLOUD_NAME` | `your-cloud-name` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | `123456789012345` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | `<secret>` | From Cloudinary dashboard |
| `ALLOWED_ORIGIN` | `https://kashf-ai-electricity-assistant.vercel.app` | Set **after** client is deployed |

> `PORT` is **not needed** — Vercel ignores it for serverless functions.

### 1.3 Deploy

Click **Deploy**. Your server URL will be:
```
https://<project-name>.vercel.app
```

---

## Step 2 — Deploy the Client

### 2.1 Create the Vercel project

1. Go to Vercel → **Add New Project**
2. Import the same GitHub repo
3. Set **Root Directory** to `client`
4. Vercel auto-detects `vercel.json` — no build settings needed

### 2.2 Set environment variables

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | `https://<your-server-project>.vercel.app` |

> Must include `https://` — without the protocol prefix, requests go to `localhost:5173/<url>`.

### 2.3 Deploy

Click **Deploy**. Your client URL will be:
```
https://<project-name>.vercel.app
```

---

## Step 3 — Link the two projects

After both are deployed:

1. Copy the **client URL** (e.g. `https://kashf-ai-electricity-assistant.vercel.app`)
2. Go to the **server** Vercel project → Settings → Environment Variables
3. Set or update `ALLOWED_ORIGIN` to the client URL
4. **Redeploy** the server project (Settings → Deployments → Redeploy)

---

## CORS configuration

The server's CORS whitelist is in [`server/config/corsOptions.js`](../server/config/corsOptions.js):

```javascript
const allowedOrigins = [
    "https://kashf-ai-electricity-assistant.vercel.app",  // production
    "https://kashf-smart-electricity-assistant.netlify.app", // legacy fallback
    "http://localhost:5173",  // Vite dev
    "http://localhost:4173",  // Vite preview
];
```

Add any new deployment URL here **and redeploy the server**.

---

## Continuous deployment

Both projects are connected to GitHub. Every push to `main` triggers an automatic rebuild and deployment. No manual steps required after initial setup.

> **Important:** Changes to environment variables require a **manual redeploy** (Settings → Deployments → Redeploy) since Vercel does not auto-redeploy on env var changes.

---

## Local development

```bash
# Terminal 1 — Server (runs on port 3000)
cd server
cp .env.example .env   # fill in values
npm install
npm run dev

# Terminal 2 — Client (runs on port 5173)
cd client
# set VITE_API_BASE_URL=http://localhost:3000 in client/.env
npm install
npm run dev
```

The local client at `http://localhost:5173` is already in the server's `allowedOrigins` — no CORS changes needed during development.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `CORS: origin "..." is not allowed` | Client URL not in `allowedOrigins` | Add URL to `corsOptions.js` and redeploy server |
| URL resolves to `localhost:5173/<url>` | `VITE_API_BASE_URL` missing `https://` | Add protocol prefix to env var |
| `401 Unauthorized` on refresh-token | JWT secrets mismatch or cookies blocked | Verify `JWT_REFRESH_SECRET` matches between access/refresh; confirm `credentials: true` on client |
| `500` on any API call | Unhandled error in server + CORS blocks response header | Check Vercel function logs for the real error |
| MongoDB timeout | Atlas cluster paused (free tier) or IP not whitelisted | Wake cluster; whitelist `0.0.0.0/0` |

---

## Vercel config reference

### `client/vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `server/vercel.json`

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

---

*For team secrets management, use the Vercel dashboard per-project or a shared secrets manager. Never commit `.env` files.*

# Quick Start - Deploy in 10 Minutes

## TL;DR

1. **Backend (Railway):**
   - Push to GitHub
   - Deploy on Railway from repo
   - Set env vars: `ADDRESS`, `OPENAI_API_KEY`
   - Copy Railway URL

2. **Frontend (Vercel):**
   - Set `client/.env.production` with Railway URL
   - Deploy on Vercel from repo
   - Set env var: `VITE_API_BASE_URL`
   - Done!

---

## Step-by-Step

### Backend (5 minutes)

```bash
# 1. Push code
git push origin main

# 2. Railway Dashboard
# - Go to railway.app
# - New Project → Deploy from GitHub repo
# - Add environment variables:
#   ADDRESS=0xYourWalletAddress
#   OPENAI_API_KEY=sk-...
#   NETWORK=base-sepolia

# 3. Copy your Railway URL
# Example: https://your-app.railway.app
```

### Frontend (5 minutes)

```bash
# 1. Configure backend URL
echo "VITE_API_BASE_URL=https://your-app.railway.app" > client/.env.production
git add client/.env.production
git commit -m "Add production backend URL"
git push

# 2. Vercel Dashboard
# - Go to vercel.com
# - New Project → Import from GitHub
# - Add environment variable:
#   VITE_API_BASE_URL=https://your-app.railway.app
# - Deploy!
```

---

## Test It

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Connect wallet
3. Get a fortune for $0.01!

---

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide with troubleshooting.

---

## Local Development

```bash
# Terminal 1: Backend
cd server && npm install && npm run dev

# Terminal 2: Frontend
cd client && npm install && npm run dev
```

Visit http://localhost:5173

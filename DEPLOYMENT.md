# Deployment Guide

This guide walks you through deploying the AI Fortune Teller with a split architecture:
- Frontend on Vercel (static site)
- Backend on Railway (Hono server)

## Prerequisites

- GitHub account
- [Railway account](https://railway.app) (free tier works)
- [Vercel account](https://vercel.com) (free tier works)
- OpenAI API key
- Wallet address for receiving payments

---

## Part 1: Deploy Backend to Railway

Railway will host your Hono server with the x402 payment middleware.

### 1. Push Code to GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authenticate with GitHub
5. Select your repository
6. Railway will automatically detect the `railway.toml` configuration

### 3. Configure Environment Variables

In your Railway project dashboard, go to **Variables** and add:

```env
ADDRESS=0xYourWalletAddress
OPENAI_API_KEY=sk-your-openai-api-key-here
NETWORK=base-sepolia
FACILITATOR_URL=https://x402.org/facilitator
NODE_ENV=production
```

**Note:** Railway automatically sets the `PORT` variable.

### 4. Deploy

Railway will automatically build and deploy your server. Wait for deployment to complete.

### 5. Get Your Backend URL

Once deployed, Railway provides a public URL like:
```
https://your-app-name.up.railway.app
```

or
```
https://your-app.railway.app
```

Copy this URL - you'll need it for the frontend!

### 6. Test Your Backend

Visit these endpoints to verify:
- `https://your-app.railway.app/api/health` - Should return status OK
- `https://your-app.railway.app/api/stats` - Should return fortune stats

---

## Part 2: Deploy Frontend to Vercel

Vercel will host your React frontend, which connects to the Railway backend.

### 1. Update Frontend Configuration

Update the production environment file with your Railway backend URL:

```bash
# Replace with YOUR actual Railway URL
echo "VITE_API_BASE_URL=https://your-app.railway.app" > client/.env.production

git add client/.env.production
git commit -m "Configure production backend URL"
git push
```

### 2. Create Vercel Project

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the `vercel.json` configuration

### 3. Configure Environment Variables

In Vercel project settings, go to **Environment Variables** and add:

```env
VITE_API_BASE_URL=https://your-app.railway.app
```

Make sure to select all environments (Production, Preview, Development).

### 4. Deploy

Click "Deploy" and wait for Vercel to build and deploy your frontend.

### 5. Get Your Frontend URL

Vercel will provide a URL like:
```
https://your-app.vercel.app
```

---

## Part 3: Update CORS Configuration (Optional but Recommended)

To ensure proper CORS configuration, update your Railway backend with the Vercel frontend URL.

### 1. Add Frontend URL to Railway

Go back to your Railway project and add this environment variable:

```env
FRONTEND_URL=https://your-app.vercel.app
```

### 2. Redeploy

Railway will automatically redeploy with the new CORS settings.

---

## Testing Your Deployment

### 1. Visit Your Frontend

Open `https://your-app.vercel.app` in your browser.

### 2. Connect Wallet

Click the fortune button to connect your MetaMask or other Web3 wallet.

### 3. Get a Fortune

Select a category and click "Reveal My Fortune". You should:
1. See a wallet signature prompt
2. Approve the $0.01 USDC payment
3. Receive your AI-generated fortune

### 4. Check Stats

The stats bar should update with total fortunes and revenue.

---

## Troubleshooting

### Frontend Can't Connect to Backend

**Problem:** Network errors or CORS issues

**Solutions:**
1. Verify `VITE_API_BASE_URL` in Vercel environment variables
2. Check that Railway backend is running (visit `/api/health`)
3. Ensure CORS is configured with `FRONTEND_URL` in Railway
4. Check browser console for specific errors

### Payment Not Working

**Problem:** x402 payment flow fails

**Solutions:**
1. Ensure you have Base Sepolia ETH for gas ([faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))
2. Ensure you have USDC on Base Sepolia ([faucet](https://faucet.circle.com/))
3. Check that your wallet is on Base Sepolia network
4. Verify `ADDRESS` environment variable in Railway is correct

### Backend Errors

**Problem:** Server returning 500 errors

**Solutions:**
1. Check Railway logs for error messages
2. Verify `OPENAI_API_KEY` is set correctly
3. Verify `ADDRESS` is a valid Ethereum address
4. Check that all required environment variables are set

### Build Failures

**Railway Build Fails:**
- Check that `server/package.json` exists
- Verify TypeScript compiles: `cd server && npm run build`
- Check Railway build logs for specific errors

**Vercel Build Fails:**
- Check that `client/package.json` exists
- Verify React app builds: `cd client && npm run build`
- Check Vercel build logs for specific errors

---

## Local Development

To test locally before deploying:

### Terminal 1: Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your keys
npm run dev
```

Backend runs on `http://localhost:3001`

### Terminal 2: Frontend
```bash
cd client
npm install
# Make sure you're using local backend
echo "VITE_API_BASE_URL=http://localhost:3001" > .env.local
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables Reference

### Railway (Backend)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ADDRESS` | Yes | Your wallet address for receiving payments | `0x1234...` |
| `OPENAI_API_KEY` | Yes | OpenAI API key | `sk-...` |
| `NETWORK` | No | Blockchain network | `base-sepolia` |
| `FACILITATOR_URL` | No | x402 facilitator endpoint | `https://x402.org/facilitator` |
| `FRONTEND_URL` | Recommended | Vercel frontend URL for CORS | `https://your-app.vercel.app` |
| `NODE_ENV` | Recommended | Node environment | `production` |

### Vercel (Frontend)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Railway backend URL | `https://your-app.railway.app` |

---

## Cost Estimates

### Railway
- **Free Tier:** $5/month in credits (sufficient for testing)
- **Pro Tier:** $5/month minimum, pay-as-you-go

### Vercel
- **Hobby (Free):** Perfect for testing and demos
- **Pro:** $20/month for production apps

### Infrastructure
- **Base Sepolia (testnet):** Free (test ETH and USDC)
- **Base Mainnet:** ~$0.0001 per transaction in gas fees

---

## Next Steps

1. Test your deployment thoroughly
2. Switch to Base mainnet for production (update `NETWORK` env var)
3. Fund your testnet wallet to receive payments
4. Monitor Railway and Vercel logs
5. Share your app URL!

---

## Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [x402 Protocol](https://x402.org)
- [Base Network](https://base.org)
- [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- [USDC Faucet](https://faucet.circle.com/)

---

Good luck with your deployment! If you run into issues, check the troubleshooting section or open an issue on GitHub.

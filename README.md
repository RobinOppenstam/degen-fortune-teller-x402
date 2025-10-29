# 🔮 AI Fortune Teller – x402 Micropayments Demo

> **The sleeping beauty of the internet just woke up.** HTTP 402 "Payment Required" – reserved since 1997, never implemented – is now live. This is what the future of AI agent commerce looks like.

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-blue?style=for-the-badge)](https://your-vercel-url.vercel.app)
[![Built with x402](https://img.shields.io/badge/Built%20with-x402-purple?style=for-the-badge)](https://x402.org)
[![Base Sepolia](https://img.shields.io/badge/Network-Base%20Sepolia-green?style=for-the-badge)](https://base.org)

![Fortune Teller Banner](./docs/banner.png)

## 💎 What is This?

A **ridiculously simple** web app that demonstrates why everyone's losing their minds over x402:

- 🎲 Pick a fortune category (Love, Career, Wisdom, Random)
- 💰 Pay **$0.01 USDC** to unlock AI-generated degen wisdom
- ⚡ **Instant settlement** on Base (2 seconds, not 2 days)
- 🤖 **Zero friction** – no logins, no subscriptions, no API keys
- 🔗 **One-click wallet connect** – MetaMask, Coinbase Wallet, or any Web3 wallet

**This isn't just a demo. This is the foundation of the AI internet.**

---

## 🔥 Why Everyone's Freaking Out About x402

### The Old Way (Broken)
```
💳 Stripe/PayPal:  2.9% + $0.30 fee
   → $0.01 payment = 32% in fees 🤯
   → Minimum: ~$0.50 to be viable
   → Settlement: 2-7 days
   → Chargebacks: Constant headache
```

### The x402 Way (Future)
```
⚡ x402:  $0.0001 gas fee on Base
   → $0.01 payment = 1% in fees ✅
   → Minimum: $0.0001 (literally fractions of a cent)
   → Settlement: 2 seconds on-chain
   → Chargebacks: Cryptographically impossible
```

**This makes micropayments ACTUALLY VIABLE for the first time in internet history.**

---

## 🚀 The Numbers Don't Lie

- **43,000+ transactions** in the first month (Oct 2025)
- **10,000% growth** in x402 volume
- **$50,000+ settled** – and we're just getting started
- **300+ buyers, 190+ sellers** already building

**Giants already on board:**
- 🏦 Coinbase (creator), Circle (USDC), Visa
- 🤖 Google (Agent Payments Protocol), Anthropic, OpenAI
- ☁️ Cloudflare (20% of internet traffic), Vercel, AWS
- ⛓️ Base, Solana, Polygon, NEAR, Avalanche

---

## 🎯 Why This Changes Everything

### The AI Agent Economy Problem

AI agents can't use traditional payment rails:
- ❌ No credit cards for bots
- ❌ API keys don't scale to millions of agents
- ❌ Subscriptions are too rigid for usage-based needs
- ❌ Agents need to transact autonomously 24/7

### x402 Solves This

```typescript
// Backend: ONE LINE OF CODE
import { paymentMiddleware } from "x402-hono";
app.use(paymentMiddleware(/* config */));

// Frontend: Wrapped fetch
const fetchPaid = withPaymentInterceptor(axios, walletClient);
await fetchPaid.post("/api/fortune"); // Payment happens automatically! 🤯
```

**That's it. Your API is now paywalled with crypto micropayments.**

---

## 🏗️ Tech Stack

```
Frontend:  React + TypeScript + Viem
Backend:   Hono + x402-hono middleware
AI:        OpenAI GPT-4o-mini (crypto degen prompts)
Payments:  x402 protocol + USDC on Base Sepolia
Network:   Base (Coinbase L2) – instant finality
Deploy:    Vercel (serverless functions)
```

**Total build time: 15 minutes.**
**Lines of payment code: ~10.**

That's the power of x402.

---

## ⚡ Quick Start

### 1. Prerequisites

- Node.js 20+
- pnpm 10+
- MetaMask or Coinbase Wallet
- Base Sepolia testnet tokens:
  - [Get ETH](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet) (for gas)
  - [Get USDC](https://faucet.circle.com/) (for payments)

### 2. Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/x402-fortune-teller.git
cd x402-fortune-teller/payment-app

# Install dependencies
pnpm run install:all

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your values (see below)

# Run dev server
pnpm run dev
```

Visit http://localhost:5173 and start getting fortunes!

### 3. Environment Variables

Create `server/.env`:

```bash
# Your wallet address (receives payments)
ADDRESS=0xYourWalletAddressHere

# x402 facilitator (leave as-is for testnet)
FACILITATOR_URL=https://x402.org/facilitator
NETWORK=base-sepolia

# OpenAI API key (for AI-generated fortunes)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Port (optional)
PORT=3001
```

---

## 💡 How It Works (The Magic Explained)

### 1. User Clicks "Reveal My Fortune"

```javascript
// Client detects no wallet connected
if (!walletClient) {
  await connectWallet(); // Prompts MetaMask
}
```

### 2. x402 Payment Flow Triggers

```typescript
// Server responds with HTTP 402 Payment Required
{
  "statusCode": 402,
  "price": "0.01",
  "currency": "USDC",
  "network": "base-sepolia",
  "payTo": "0x39B617Af9f2b6012f129482D82daA1244fE05D65"
}
```

### 3. Client Auto-Handles Payment

```typescript
// x402-axios interceptor catches 402, prompts wallet signature
const response = await withPaymentInterceptor(axios, walletClient)
  .post("/api/fortune", { category: "random" });

// Payment sent on-chain (2 seconds)
// Server verifies transaction
// Fortune returned instantly
```

### 4. AI Generates Degen Wisdom

```typescript
// Server calls OpenAI with crypto-themed prompts
const fortune = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are a based crypto fortune teller who speaks to CT degens..."
    }
  ]
});

// Returns meme-tier wisdom like:
// "Your bags are heavy, but diamond hands will carry you through the bear market.
//  A 100x play awaits those who touch grass and build in silence. WAGMI."
```

---

## 🌟 What Makes x402 Groundbreaking

### Comparison Table

| Feature | Traditional Rails | Manual Crypto (Before) | x402 (Now) |
|---------|-------------------|------------------------|------------|
| **Minimum Payment** | ~$0.50 | Any amount | $0.0001 |
| **Settlement Time** | 2-7 days | 10-60 seconds | 2 seconds |
| **Fees** | 2.9% + $0.30 | Gas (~$0.0001) | Gas (~$0.0001) |
| **Chargebacks** | Yes (fraud risk) | Impossible | Impossible |
| **For AI Agents** | ❌ Needs human | ⚠️ Complex | ✅ Fully autonomous |
| **Integration** | Weeks of API work | Days of custom code | 1 line of code |
| **Code Complexity** | ~500 lines | ~250 lines | ~4 lines |
| **Account Required** | Yes (KYC, etc.) | No | No |
| **User Experience** | Forms & checkout | Copy/paste addresses | One-click approval |
| **Payment Verification** | Polling APIs | Polling blockchain | Instant (HTTP 402) |
| **Error Handling** | Complex | Very complex | Automatic |
| **Global** | Restricted | Permissionless | Permissionless |

### The Developer Experience Gap

**Before x402 (Manual Crypto Integration):**
```typescript
// Backend: ~200 lines
const paymentAddress = await generateAddress();
await db.users.update(userId, { paymentAddress });

// Poll blockchain every 10 seconds
setInterval(async () => {
  const balance = await checkBalance(paymentAddress);
  if (balance >= expectedAmount) {
    await db.payments.create({ userId, txHash, amount });
    await grantAccess(userId);
  }
}, 10000);

// Handle edge cases:
// - Wrong amount sent
// - Wrong token sent
// - Overpayments (refunds)
// - Underpayments
// - Double-spends
// - Chain reorgs
// + ~150 more lines...
```

**Frontend: ~50 lines**
```typescript
// User needs to manually copy/paste
const address = await fetch('/api/get-payment-address');
alert(`Send 0.01 USDC to: ${address}`);

// User goes to MetaMask
// Manually enters amount and address
// Clicks send, confirms transaction
// Waits... backend polls... user refreshes...
// + polling logic, status checking, error handling...
```

**With x402:**
```typescript
// Backend: 3 lines
import { paymentMiddleware } from "x402-hono";
app.use(paymentMiddleware(merchantAddress, {
  "GET /api/fortune": { price: "$0.01" }
}));

// Frontend: 1 line
const api = withPaymentInterceptor(axios, walletClient);
await api.post("/api/fortune"); // Done! 🤯
```

**The Difference:**
- **250 lines → 4 lines** (98% reduction)
- **Days of work → 15 minutes** (99% time savings)
- **Complex polling → Instant verification**
- **Copy/paste UX → One-click approval**
- **Error-prone → Bulletproof**

---

## 🎨 Use Cases (Beyond Fortune Tellers)

This pattern unlocks entirely new business models:

### AI & Automation
- 🤖 AI agents paying for API calls
- 🔍 Pay-per-query search/data services
- 💻 On-demand compute marketplaces
- 🎨 AI art generation (pay per image)
- 📊 Real-time analytics access

### Content & Media
- 📰 Micropayments for articles (no subscriptions!)
- 🎥 Pay-per-view videos
- 🎵 Stream-to-earn music
- 🎮 In-game item purchases
- 📚 Chapter-by-chapter book access

### Developer Tools
- 🔌 API rate limits with payment gates
- 🚀 Deploy credits (pay for CI/CD runs)
- 📦 NPM packages with premium features
- 🧪 Test environment access

### The Wild Stuff
- 🌐 **DePIN**: Machines paying machines for bandwidth, storage, compute
- 🏪 **Agent Marketplaces**: Autonomous agents buying/selling services
- 🤝 **M2M Commerce**: IoT devices transacting without humans
- 🌍 **Programmable Money**: The internet becomes a commerce layer

---

## 📈 Live Stats

Check out the stats bar in the app:
- **Total Fortunes Told**: Real-time counter
- **Total Revenue**: Sum of all payments received
- **Price Per Reading**: Fixed at $0.01

All tracked on-chain. All transparent. All autonomous.

---

## 🚢 Deploy to Production

This project uses a **split deployment architecture**:
- **Frontend** → Vercel (static React app)
- **Backend** → Railway (Hono server with x402)

### Step 1: Deploy Backend to Railway

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Create new project → Deploy from GitHub repo
   - Select your repository
   - Railway auto-detects the config from `railway.toml`

3. **Configure Environment Variables** in Railway:
   ```
   ADDRESS=0xYourWalletAddress
   OPENAI_API_KEY=sk-your-openai-api-key
   NETWORK=base-sepolia
   FACILITATOR_URL=https://x402.org/facilitator
   NODE_ENV=production
   ```

4. **Get your Railway URL** (e.g., `https://your-app.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Update frontend config** with your Railway backend URL:
   ```bash
   echo "VITE_API_BASE_URL=https://your-app.up.railway.app" > client/.env.production
   git add client/.env.production
   git commit -m "Configure production API URL"
   git push
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects the config from `vercel.json`
   - Add environment variable:
     ```
     VITE_API_BASE_URL=https://your-app.up.railway.app
     ```
   - Click Deploy

3. **Update CORS** (Optional but recommended):
   - Go back to Railway
   - Add environment variable:
     ```
     FRONTEND_URL=https://your-app.vercel.app
     ```

### Alternative: Local Testing

```bash
# Terminal 1: Start backend
cd server
npm install
npm run dev

# Terminal 2: Start frontend
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🤝 Contributing

Ideas to make this even better:

- [ ] Add more AI models (Claude, Gemini)
- [ ] Support multiple networks (Ethereum, Polygon, Solana)
- [ ] Admin dashboard for earnings tracking
- [ ] Rate limiting per wallet address
- [ ] NFT fortune receipts (proof of payment)
- [ ] Fortune history (on-chain log)

PRs welcome!

---

## 📚 Resources

- **x402 Protocol**: https://x402.org
- **Documentation**: https://docs.x402.org
- **GitHub**: https://github.com/coinbase/x402
- **Base Network**: https://base.org
- **Facilitator**: https://x402.org/facilitator
- **Faucets**:
  - [Base Sepolia ETH](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
  - [USDC](https://faucet.circle.com/)

---

## 📄 License

MIT – fork, build, ship. No permission needed.

---

## 🔮 Final Thoughts

This Fortune Teller? **Just the demo.**

The real game:
- Billions of AI agents
- Transacting autonomously
- Paying for services in real-time
- Building a programmable commerce layer on the internet

**That's the vision. And it's already happening.**

43,000 transactions in the first month.
Google, Visa, Cloudflare, AWS already building.
The sleeping beauty of HTTP 402 just woke up.

**What will YOU build on x402?**

---

⭐ **Star this repo if you believe in the future of autonomous agent commerce!**

Built with 💜 to showcase the future of micropayments.

**Let's build the AI internet. Together. 🚀**

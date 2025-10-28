import { config } from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { paymentMiddleware, Network, Resource } from "x402-hono";
import OpenAI from "openai";

config();

// Configuration from environment variables
const facilitatorUrl = process.env.FACILITATOR_URL as Resource || "https://x402.org/facilitator";
const payTo = process.env.ADDRESS as `0x${string}`;
const network = (process.env.NETWORK as Network) || "base-sepolia";
const port = parseInt(process.env.PORT || "3001");
const openaiApiKey = process.env.OPENAI_API_KEY;

// Validate environment variables (but don't exit in serverless mode)
const missingVars: string[] = [];
if (!payTo) missingVars.push("ADDRESS");
if (!openaiApiKey) missingVars.push("OPENAI_API_KEY");

if (missingVars.length > 0) {
  const errorMsg = `❌ Missing required environment variables: ${missingVars.join(", ")}`;
  console.error(errorMsg);

  // Only exit if running locally (not in Vercel serverless)
  if (process.env.VERCEL !== '1') {
    process.exit(1);
  }
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

const app = new Hono();

// Enable CORS for frontend
app.use("/*", cors({
  origin: (origin) => {
    // Allow all origins in production (Vercel deployment)
    // In production, same-origin requests work automatically
    return origin || '*';
  },
  credentials: true,
}));

// Track fortune stats (for showcasing)
let fortuneStats = {
  totalFortunes: 0,
  totalRevenue: 0,
  categories: {
    love: 0,
    career: 0,
    wisdom: 0,
    random: 0,
  }
};

// Configure x402 payment middleware - ONE ENDPOINT, ONE PRICE
app.use(
  paymentMiddleware(
    payTo,
    {
      // AI Fortune Teller - $0.01 per reading
      "/api/fortune": {
        price: "$0.01",
        network,
      },
    },
    {
      url: facilitatorUrl,
    },
  ),
);

// Free endpoint - health check
app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    message: "🔮 AI Fortune Teller is online",
    config: {
      network,
      payTo,
    },
  });
});

// Free endpoint - get stats (for showcasing)
app.get("/api/stats", (c) => {
  // Check if server is properly configured
  if (!payTo || !openaiApiKey) {
    return c.json({
      error: "Server configuration error",
      message: "Missing required environment variables. Please configure ADDRESS and OPENAI_API_KEY in Vercel settings.",
      missingVars: missingVars,
    }, 500);
  }

  return c.json({
    totalFortunes: fortuneStats.totalFortunes,
    totalRevenue: `$${fortuneStats.totalRevenue.toFixed(2)}`,
    categories: fortuneStats.categories,
  });
});

// Generate fortune using OpenAI
async function generateFortune(category: string, userInput?: string): Promise<string> {
  const prompts: Record<string, string> = {
    love: "You are a based crypto fortune teller who speaks to CT degens. Generate a short, meme-tier fortune about relationships/love but make it crypto-native (2-3 sentences). Use terms like 'wagmi', 'ngmi', 'bag holder', 'diamond hands'. Be funny but wise.",
    career: "You are a degen oracle predicting the futures of crypto builders and shitposters. Generate a short fortune about their career/bags (2-3 sentences). Reference airdrops, rugs, 100x plays, building, or touching grass. Be motivational but memey.",
    wisdom: "You are an ancient crypto sage who witnessed the Satoshi whitepaper. Share profound degen wisdom (2-3 sentences). Reference cycles, narratives, WAGMI/NGMI, bags, or touching grass. Be philosophical but based.",
    random: "You are a mystical degen oracle on CT. Generate a short fortune about life, bags, or the market (2-3 sentences). Mix wisdom with memes. Reference moon missions, rugs, diamond hands, or touching grass.",
  };

  const systemPrompt = prompts[category] || prompts.random;

  const userPrompt = userInput
    ? `The seeker asks: "${userInput}". Provide a fortune in response.`
    : "Provide a fortune for a curious seeker.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.9,
      max_tokens: 150,
    });

    return completion.choices[0].message.content || "The spirits are unclear... try again soon.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "The cosmic energies are disrupted. The oracle cannot see clearly at this moment.";
  }
}

// PAID ENDPOINT - Get AI Fortune ($0.01)
app.post("/api/fortune", async (c) => {
  try {
    // Check if server is properly configured
    if (!payTo || !openaiApiKey) {
      return c.json({
        error: "Server configuration error",
        message: "Missing required environment variables. Please configure ADDRESS and OPENAI_API_KEY in Vercel settings.",
        missingVars: missingVars,
      }, 500);
    }

    const body = await c.req.json().catch(() => ({}));
    const category = body.category || "random";
    const question = body.question || "";

    // Generate fortune using OpenAI
    const fortune = await generateFortune(category, question);

    // Update stats
    fortuneStats.totalFortunes++;
    fortuneStats.totalRevenue += 0.01;
    if (category in fortuneStats.categories) {
      fortuneStats.categories[category as keyof typeof fortuneStats.categories]++;
    }

    // Return the fortune with mystical flair
    return c.json({
      success: true,
      fortune,
      category,
      timestamp: new Date().toISOString(),
      fortuneNumber: fortuneStats.totalFortunes,
      message: "🔮 Your fortune has been revealed...",
    });
  } catch (error) {
    console.error("Fortune generation error:", error);
    return c.json({
      success: false,
      error: "Failed to generate fortune",
    }, 500);
  }
});

console.log(`
🔮 AI FORTUNE TELLER - x402 Micropayment Oracle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Accepting payments to: ${payTo}
🔗 Network: ${network}
🌐 Port: ${port}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Micropayment Model:
   - AI Fortune Reading: $0.01 USDC
   - Powered by OpenAI GPT-4
   - Instant payment, instant wisdom
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Categories: Love ❤️  | Career 💼 | Wisdom 🧠 | Random 🎲
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Perfect for:
   - AI Agent micropayments
   - Autonomous wisdom purchases
   - Showcasing x402 magic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  serve({
    fetch: app.fetch,
    port,
  });
}

// Export for Vercel serverless
export default app;

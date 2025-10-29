import axios from "axios";
import type { AxiosInstance } from "axios";
import type { WalletClient } from "viem";
import { withPaymentInterceptor } from "x402-axios";

// Use environment variable for API base URL
// In production (Vercel), this should point to your Railway backend
// In development, it defaults to localhost:3001
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

console.log('🌐 API Base URL:', API_BASE_URL);

// Base axios instance without payment interceptor
const baseApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// This will be dynamically set based on wallet connection
let apiClient: AxiosInstance = baseApiClient;

// Update the API client with a wallet
export function updateApiClient(walletClient: WalletClient | null) {
  if (walletClient && walletClient.account) {
    // Create axios instance with x402 payment interceptor
    apiClient = withPaymentInterceptor(baseApiClient, walletClient as any);
    console.log("💳 API client updated with wallet:", walletClient.account.address);
  } else {
    // No wallet connected - reset to base client
    apiClient = baseApiClient;
    console.log("⚠️ API client reset - no wallet connected");
  }
}

// API endpoints
export const api = {
  // Free endpoints
  getHealth: async () => {
    const response = await apiClient.get("/api/health");
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get("/api/stats");
    return response.data;
  },

  // Paid endpoint - Get AI Fortune ($0.01)
  getFortune: async (category: string, question?: string) => {
    console.log("🔮 Requesting fortune...");
    const response = await apiClient.post("/api/fortune", {
      category,
      question,
    });
    console.log("✅ Fortune received:", response.data);
    return response.data;
  },
};

// Types for API responses
export interface FortuneResponse {
  success: boolean;
  fortune: string;
  category: string;
  timestamp: string;
  fortuneNumber: number;
  message: string;
}

export interface StatsResponse {
  totalFortunes: number;
  totalRevenue: string;
  categories: {
    love: number;
    career: number;
    wisdom: number;
    random: number;
  };
} 
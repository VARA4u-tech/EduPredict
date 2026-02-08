import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  console.warn(
    "⚠️  Warning: OPENAI_API_KEY is not set in environment variables",
  );
}

// Debug Log for Config
console.log("----------------------------------------");
console.log("[OpenAI Config] Initializing Client...");
console.log(
  "[OpenAI Config] Base URL:",
  process.env.OPENAI_BASE_URL || "https://api.openai.com/v1 (Default)",
);
console.log(
  "[OpenAI Config] Key Prefix:",
  process.env.OPENAI_API_KEY
    ? process.env.OPENAI_API_KEY.substring(0, 8) + "..."
    : "Missing",
);
console.log(
  "[OpenAI Config] Model:",
  process.env.OPENAI_MODEL || "gpt-3.5-turbo",
);
console.log("----------------------------------------");

// Create OpenAI client instance
// Create OpenAI client instance (Compatible with OpenRouter)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173", // Site URL for rankings
    "X-Title": "EduPredict Student Success", // Site title for rankings
  },
});

export default openai;

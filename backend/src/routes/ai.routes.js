import express from "express";
import rateLimit from "express-rate-limit";
import { protect } from "../middlewares/auth.middleware.js";
import {
  generatePrediction,
  generateStudyAdvice,
  generateComicNarrative,
  chatWithAI,
} from "../controllers/ai.controller.js";

const router = express.Router();

// Rate limiter specific to AI routes (expensive OpenAI calls)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 AI requests per IP per window
  message: "Too many AI requests, please try again after 15 minutes",
});

// Generate student success prediction
router.post("/predict", protect, aiLimiter, generatePrediction);

// Generate personalized study advice
router.post("/study-advice", protect, aiLimiter, generateStudyAdvice);

// Generate comic narrative for student journey
router.post("/comic-narrative", protect, aiLimiter, generateComicNarrative);

// General AI chat endpoint
router.post("/chat", protect, aiLimiter, chatWithAI);

export default router;

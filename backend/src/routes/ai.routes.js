import express from "express";
import {
  generatePrediction,
  generateStudyAdvice,
  generateComicNarrative,
  chatWithAI,
} from "../controllers/ai.controller.js";

const router = express.Router();

// Generate student success prediction
router.post("/predict", generatePrediction);

// Generate personalized study advice
router.post("/study-advice", generateStudyAdvice);

// Generate comic narrative for student journey
router.post("/comic-narrative", generateComicNarrative);

// General AI chat endpoint
router.post("/chat", chatWithAI);

export default router;

import express from "express";
import {
  getStudentProfile,
  updateStudentData,
  getStudentProgress,
  getWhatIfScenario,
} from "../controllers/student.controller.js";

const router = express.Router();

// Get student profile
router.get("/:id", getStudentProfile);

// Update student data
router.put("/:id", updateStudentData);

// Get student progress/analytics
router.get("/:id/progress", getStudentProgress);

// "What If" scenario analysis
router.post("/:id/what-if", getWhatIfScenario);

export default router;

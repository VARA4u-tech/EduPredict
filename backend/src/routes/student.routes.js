import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getStudentProfile,
  updateStudentData,
  getStudentProgress,
  getWhatIfScenario,
  getStudentSubjects,
  updateStudentSubjects,
} from "../controllers/student.controller.js";

const router = express.Router();

// Get student profile
router.get("/:id", getStudentProfile);

// Update student data
router.put("/:id", protect, updateStudentData);

// Get student progress/analytics
router.get("/:id/progress", getStudentProgress);

// "What If" scenario analysis
router.post("/:id/what-if", getWhatIfScenario);

// Get student subjects/marks
router.get("/:id/subjects", protect, getStudentSubjects);

// Update student subjects/marks (for manual entry)
router.put("/:id/subjects", protect, updateStudentSubjects);

export default router;

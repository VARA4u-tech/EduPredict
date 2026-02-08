import openai from "../config/openai.config.js";

// Mock student database (replace with actual database in production)
const mockStudents = {
  1: {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    grade: "10th",
    attendance: 92,
    assignmentCompletion: 88,
    quizScores: 85,
    studyHours: 15,
    participation: 78,
    level: 5,
    xp: 2450,
    badges: ["Early Bird", "Quiz Master", "Consistent"],
  },
  2: {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    grade: "11th",
    attendance: 96,
    assignmentCompletion: 95,
    quizScores: 92,
    studyHours: 20,
    participation: 90,
    level: 8,
    xp: 4200,
    badges: ["Top Performer", "Perfect Attendance", "Study Champion"],
  },
};

/**
 * Get student profile by ID
 */
export const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = mockStudents[id];

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ success: true, student });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      error: "Failed to fetch student profile",
      details: error.message,
    });
  }
};

/**
 * Update student data
 */
export const updateStudentData = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mockStudents[id]) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update student data
    mockStudents[id] = { ...mockStudents[id], ...updates };

    res.json({
      success: true,
      message: "Student data updated successfully",
      student: mockStudents[id],
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: "Failed to update student data",
      details: error.message,
    });
  }
};

/**
 * Get student progress and analytics
 */
export const getStudentProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const student = mockStudents[id];

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Calculate progress metrics
    const overallScore =
      student.attendance * 0.2 +
      student.assignmentCompletion * 0.3 +
      student.quizScores * 0.3 +
      student.participation * 0.2;

    const progress = {
      studentId: id,
      name: student.name,
      overallScore: Math.round(overallScore),
      metrics: {
        attendance: { value: student.attendance, trend: "up", change: 3 },
        assignments: {
          value: student.assignmentCompletion,
          trend: "up",
          change: 5,
        },
        quizzes: { value: student.quizScores, trend: "stable", change: 0 },
        participation: { value: student.participation, trend: "up", change: 8 },
      },
      gamification: {
        level: student.level,
        xp: student.xp,
        xpToNextLevel: 1000 - (student.xp % 1000),
        badges: student.badges,
      },
      weeklyStudyHours: student.studyHours,
      successPrediction:
        overallScore >= 85
          ? "High"
          : overallScore >= 70
            ? "Medium"
            : "Needs Improvement",
    };

    res.json({ success: true, progress });
  } catch (error) {
    console.error("Progress error:", error);
    res.status(500).json({
      error: "Failed to fetch student progress",
      details: error.message,
    });
  }
};

/**
 * Generate "What If" scenario analysis
 */
export const getWhatIfScenario = async (req, res) => {
  try {
    const { id } = req.params;
    const { scenario } = req.body;

    const student = mockStudents[id];

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (!scenario) {
      return res
        .status(400)
        .json({ error: "Scenario description is required" });
    }

    const prompt = `Analyze this "What If" scenario for a student:

Current Student Stats:
- Name: ${student.name}
- Attendance: ${student.attendance}%
- Assignment Completion: ${student.assignmentCompletion}%
- Quiz Scores: ${student.quizScores}%
- Study Hours/Week: ${student.studyHours}

Scenario: "${scenario}"

Provide:
1. Predicted Impact (how this would affect their grades/success)
2. New Projected Scores (estimate new percentages)
3. Timeline (how long to see results)
4. Action Steps (what specifically they should do)
5. Potential Challenges (what might make this difficult)
6. Encouragement (motivational message)

Format as JSON with keys: impact, projectedScores, timeline, actionSteps, challenges, encouragement`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an educational advisor who analyzes hypothetical scenarios to help students understand the impact of their choices. Respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const responseText = completion.choices[0].message.content;

    try {
      const parsedResponse = JSON.parse(responseText);
      res.json({ success: true, scenario: parsedResponse });
    } catch {
      res.json({ success: true, scenario: responseText });
    }
  } catch (error) {
    console.error("What-if error:", error);
    res.status(500).json({
      error: error.message || "Failed to analyze scenario",
      details: error.stack,
    });
  }
};

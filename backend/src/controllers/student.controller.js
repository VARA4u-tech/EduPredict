import Student from "../models/student.model.js";
import openai from "../config/openai.config.js";

/**
 * Get student profile by ID
 */
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.params.id }).populate(
      "user",
      "name email",
    );

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
    const updates = req.body;

    // Allowed update fields (whitelist)
    const allowedUpdates = [
      "grade",
      "attendance",
      "assignmentCompletion",
      "quizScores",
      "studyHours",
      "participation",
    ];
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({ error: "No valid update fields provided" });
    }

    const student = await Student.findOneAndUpdate(
      { user: req.params.id },
      { $set: filteredUpdates },
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student data updated successfully",
      student,
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
    const student = await Student.findOne({ user: req.params.id }).populate(
      "user",
      "name rollNumber gender",
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if student has entered any subject data
    const hasSubjectData =
      student.subjects &&
      student.subjects.length > 0 &&
      student.subjects.some((s) => s.internalMarks > 0 || s.externalMarks > 0);

    // Calculate overall score from subjects if available
    let overallScore = 0;
    let subjectAverages = [];

    if (hasSubjectData) {
      subjectAverages = student.subjects.map((s) => ({
        name: s.name,
        internal: s.internalMarks,
        external: s.externalMarks,
        average: Math.round((s.internalMarks + s.externalMarks) / 2),
      }));

      const totalAvg =
        subjectAverages.reduce((acc, s) => acc + s.average, 0) /
        subjectAverages.length;
      overallScore = Math.round(totalAvg);
    } else {
      // Fall back to legacy calculation if no subject data
      overallScore =
        student.attendance * 0.2 +
        student.assignmentCompletion * 0.3 +
        student.quizScores * 0.3 +
        student.participation * 0.2;
    }

    const progress = {
      studentId: student._id,
      name: student.user.name,
      rollNumber: student.user.rollNumber,
      gender: student.user.gender,
      overallScore: Math.round(overallScore),
      hasSubjectData, // Flag for frontend to detect first-time users
      subjects: student.subjects || [],
      subjectAverages,
      metrics: {
        attendance: {
          value: hasSubjectData ? overallScore : student.attendance,
          trend: "up",
          change: 3,
        },
        assignments: {
          value: hasSubjectData ? overallScore : student.assignmentCompletion,
          trend: "up",
          change: 5,
        },
        quizzes: {
          value: hasSubjectData ? overallScore : student.quizScores,
          trend: "stable",
          change: 0,
        },
        participation: {
          value: hasSubjectData ? overallScore : student.participation,
          trend: "up",
          change: 8,
        },
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
            : overallScore >= 50
              ? "Average"
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
    const { scenario } = req.body;

    const student = await Student.findOne({ user: req.params.id }).populate(
      "user",
      "name",
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (!scenario || scenario.length > 500) {
      return res.status(400).json({
        error:
          "Scenario description is required and must be under 500 characters",
      });
    }

    // Basic sanitization (remove newlines if needed, though LLM handles it)
    const sanitizedScenario = scenario.replace(/[\r\n]+/g, " ");

    const prompt = `Analyze this "What If" scenario for a student:
    
Current Student Stats:
- Name: ${student.user.name}
- Attendance: ${student.attendance}%
- Assignment Completion: ${student.assignmentCompletion}%
- Quiz Scores: ${student.quizScores}%
- Study Hours/Week: ${student.studyHours}

Scenario: "${sanitizedScenario}"

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

/**
 * Get student subjects/marks
 */
export const getStudentSubjects = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.params.id }).populate(
      "user",
      "name rollNumber",
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      subjects: student.subjects || [],
      studentName: student.user?.name,
      rollNumber: student.user?.rollNumber,
    });
  } catch (error) {
    console.error("Get subjects error:", error);
    res.status(500).json({
      error: "Failed to fetch subjects",
      details: error.message,
    });
  }
};

/**
 * Update student subjects/marks
 */
export const updateStudentSubjects = async (req, res) => {
  try {
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ error: "Subjects array is required" });
    }

    // Validate each subject
    for (const subject of subjects) {
      if (!subject.name) {
        return res.status(400).json({ error: "Subject name is required" });
      }
      if (subject.internalMarks < 0 || subject.internalMarks > 100) {
        return res
          .status(400)
          .json({ error: "Internal marks must be between 0 and 100" });
      }
      if (subject.externalMarks < 0 || subject.externalMarks > 100) {
        return res
          .status(400)
          .json({ error: "External marks must be between 0 and 100" });
      }
    }

    const student = await Student.findOneAndUpdate(
      { user: req.params.id },
      { $set: { subjects: subjects } },
      { new: true },
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({
      success: true,
      message: "Subjects updated successfully",
      subjects: student.subjects,
    });
  } catch (error) {
    console.error("Update subjects error:", error);
    res.status(500).json({
      error: "Failed to update subjects",
      details: error.message,
    });
  }
};

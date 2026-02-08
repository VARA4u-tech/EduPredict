import openai from "../config/openai.config.js";

/**
 * Generate student success prediction using AI
 */
export const generatePrediction = async (req, res) => {
  try {
    const { studentData } = req.body;

    if (!studentData) {
      return res.status(400).json({ error: "Student data is required" });
    }

    const prompt = `Based on the following student data, provide a success prediction analysis:
    
Student Data:
- Attendance: ${studentData.attendance || "N/A"}%
- Assignment Completion: ${studentData.assignmentCompletion || "N/A"}%
- Quiz Scores Average: ${studentData.quizScores || "N/A"}%
- Study Hours Per Week: ${studentData.studyHours || "N/A"}
- Participation Score: ${studentData.participation || "N/A"}%

Provide:
1. Success Probability (as a percentage)
2. Key Strengths (2-3 points)
3. Areas for Improvement (2-3 points)
4. Personalized Recommendations (3-4 actionable tips)



Format the response as pure JSON without markdown. Do NOT include any text before or after JSON.
Keys: successProbability, strengths, improvements, recommendations`;

    console.log("[AI Debug] Calling OpenAI API for Prediction...");

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an educational analytics AI that helps predict and improve student success. Always respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const responseText = completion.choices[0].message.content;

    // Robust JSON Parsing
    try {
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      let parsedResponse;

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = responseText.slice(jsonStart, jsonEnd);
        parsedResponse = JSON.parse(cleanJson);
      } else {
        parsedResponse = JSON.parse(responseText);
      }

      res.json({ success: true, prediction: parsedResponse });
    } catch (e) {
      console.warn("JSON Parse Warning:", e.message);
      res.json({ success: true, prediction: responseText });
    }
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate prediction",
      details: error.stack,
    });
  }
};

/**
 * Generate personalized study advice
 */
export const generateStudyAdvice = async (req, res) => {
  try {
    const { subject, currentLevel, learningStyle, challenges } = req.body;

    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    const prompt = `Create personalized study advice for a student:
    
Subject: ${subject}
Current Level: ${currentLevel || "Intermediate"}
Learning Style: ${learningStyle || "Visual"}
Challenges: ${challenges || "None specified"}

Provide:
1. Study Strategy (tailored to their learning style)
2. Resource Recommendations (books, websites, videos)
3. Weekly Study Plan
4. Tips for Overcoming Challenges
5. Motivation Boost (encouragement message)

Make it engaging and actionable.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and encouraging study coach who provides practical, actionable study advice.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    res.json({
      success: true,
      advice: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Study advice error:", error);
    res.status(500).json({
      error: "Failed to generate study advice",
      details: error.message,
    });
  }
};

/**
 * Generate comic narrative for student journey
 */
export const generateComicNarrative = async (req, res) => {
  try {
    const { studentName, journey, achievements, challenges } = req.body;

    const prompt = `Create a 4-panel comic strip narrative for a student's success journey:

Student: ${studentName || "Alex"}
Journey: ${journey || "Improving grades over a semester"}
Achievements: ${achievements || "Raised GPA from 2.5 to 3.5"}
Challenges Overcome: ${challenges || "Time management, focus"}

Create 4 panels with:
- Panel 1: The Challenge (starting point)
- Panel 2: The Effort (hard work montage)
- Panel 3: The Breakthrough (turning point)
- Panel 4: The Victory (success achieved)

For each panel, provide:
1. Scene description (visual)
2. Dialogue/thought bubble
3. Emotion/mood



Format as pure JSON array without markdown. Do NOT include any text before or after JSON.
Array of objects: panel, scene, dialogue, mood`;

    console.log("[AI Debug] Calling OpenAI API for Comic...");

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative comic writer who creates inspiring, relatable student success stories. Respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 800,
    });

    const responseText = completion.choices[0].message.content;

    // Robust JSON Parsing for Array
    try {
      const jsonStart = responseText.indexOf("[");
      const jsonEnd = responseText.lastIndexOf("]") + 1;
      let parsedResponse;

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const cleanJson = responseText.slice(jsonStart, jsonEnd);
        parsedResponse = JSON.parse(cleanJson);
      } else {
        parsedResponse = JSON.parse(responseText);
      }

      res.json({ success: true, comic: parsedResponse });
    } catch (e) {
      console.warn("JSON Parse Warning:", e.message);
      res.json({ success: true, comic: responseText });
    }
  } catch (error) {
    console.error("Comic narrative error:", error);
    res.status(500).json({
      error: "Failed to generate comic narrative",
      details: error.message,
    });
  }
};

/**
 * General AI chat endpoint
 */
export const chatWithAI = async (req, res) => {
  try {
    console.log("[AI Debug] Request received.");
    console.log(
      "[AI Debug] Key Prefix:",
      process.env.OPENAI_API_KEY
        ? process.env.OPENAI_API_KEY.substring(0, 10) + "..."
        : "Missing",
    );
    console.log(
      "[AI Debug] Base URL:",
      process.env.OPENAI_BASE_URL || "Using OpenAI Default",
    );
    console.log(
      "[AI Debug] Model:",
      process.env.OPENAI_MODEL || "Using Default",
    );

    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt =
      context === "student"
        ? "You are EduPredict AI, a helpful educational assistant. You help students with study tips, motivation, and academic guidance. Be encouraging, practical, and supportive."
        : "You are EduPredict AI, an educational analytics assistant. You help educators and administrators understand student performance data and provide actionable insights.";

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    res.json({
      success: true,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: error.message || "Failed to process chat message",
      details: error.stack,
    });
  }
};

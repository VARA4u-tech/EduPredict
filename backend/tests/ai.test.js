import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/app.js";

// Mock openai
const mockCreate = jest.fn();

jest.unstable_mockModule("../src/config/openai.config.js", () => ({
  default: {
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  },
}));

// Import dynamically after mocking
const { default: mockOpenAi } = await import("../src/config/openai.config.js");

describe("AI API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/ai/predict", () => {
    it("should return parsed JSON prediction from OpenAI", async () => {
      const fakePrediction = {
        successProbability: 85,
        strengths: ["Math", "Attendance"],
        improvements: ["Participation", "Homework"],
        recommendations: ["Study more", "Ask questions", "Rest"]
      };

      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(fakePrediction)
            }
          }
        ]
      });

      const res = await request(app)
        .post("/api/v1/ai/predict")
        .send({ studentData: { attendance: 90, internalMarks: 80 } });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.prediction).toEqual(fakePrediction);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if studentData is invalid", async () => {
      const res = await request(app)
        .post("/api/v1/ai/predict")
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain("Valid student data is required");
    });
  });

  describe("POST /api/v1/ai/study-advice", () => {
    it("should generate study advice", async () => {
      const fakeAdvice = "Here is your advice...";
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: fakeAdvice
            }
          }
        ]
      });

      const res = await request(app)
        .post("/api/v1/ai/study-advice")
        .send({ subject: "Math", currentLevel: "Intermediate" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.advice).toEqual(fakeAdvice);
    });
  });

  describe("POST /api/v1/ai/comic", () => {
    it("should generate a comic scenario", async () => {
      const fakeComic = {
        panels: [
          { imagePrompt: "Draw this", text: "Hello", action: "Wave" }
        ]
      };
      
      mockCreate.mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(fakeComic)
            }
          }
        ]
      });

      const res = await request(app)
        .post("/api/v1/ai/comic")
        .send({ scenario: "Failed a test", studentProfile: {} });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.comic).toEqual(fakeComic);
    });
  });
});

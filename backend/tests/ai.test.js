/**
 * AI API Integration Tests
 *
 * Strategy: Import the real openai config module then spy/patch its
 * `chat.completions.create` method before each test. This avoids the
 * ES Module dynamic import ordering issues that prevent unstable_mockModule
 * from working, and ensures no real OpenRouter credits are consumed.
 */
import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/app.js";
import openai from "../src/config/openai.config.js";

let createSpy;

beforeEach(() => {
  createSpy = jest
    .spyOn(openai.chat.completions, "create")
    .mockImplementation(() => Promise.resolve({
      choices: [{ message: { content: "" } }]
    }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("AI API", () => {
  describe("POST /api/v1/ai/predict", () => {
    it("should return 200 and a prediction object", async () => {
      const fakePrediction = {
        successProbability: 85,
        strengths: ["Good attendance", "Strong internals"],
        improvements: ["Participation", "Study hours"],
        recommendations: ["Study more", "Ask questions", "Rest"],
      };

      createSpy.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(fakePrediction) } }],
      });

      const res = await request(app)
        .post("/api/v1/ai/predict")
        .send({ studentData: { attendance: 90, internalMarks: 80 } });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      // Use toMatchObject so minor AI response variation doesn't fail tests
      expect(res.body.prediction).toMatchObject({
        successProbability: expect.any(Number),
        strengths: expect.any(Array),
        improvements: expect.any(Array),
        recommendations: expect.any(Array),
      });
      expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if studentData is missing", async () => {
      const res = await request(app).post("/api/v1/ai/predict").send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain("Valid student data is required");
      // Should NOT call the AI for invalid input
      expect(createSpy).not.toHaveBeenCalled();
    });
  });

  describe("POST /api/v1/ai/study-advice", () => {
    it("should return 200 and advice text", async () => {
      const fakeAdvice = "Here is your personalized study plan...";

      createSpy.mockResolvedValue({
        choices: [{ message: { content: fakeAdvice } }],
      });

      const res = await request(app)
        .post("/api/v1/ai/study-advice")
        .send({ subject: "Math", currentLevel: "Intermediate" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.advice).toBe("string");
      expect(res.body.advice.length).toBeGreaterThan(0);
    });

    it("should return 400 if subject is missing", async () => {
      const res = await request(app)
        .post("/api/v1/ai/study-advice")
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain("Subject is required");
    });
  });

  describe("POST /api/v1/ai/comic-narrative", () => {
    it("should return 200 and a comic object", async () => {
      // The comic controller extracts and returns the panels array directly
      const fakePanels = [
        { imagePrompt: "Draw this", text: "Hello!", action: "Wave" },
      ];

      createSpy.mockResolvedValue({
        choices: [{ message: { content: JSON.stringify(fakePanels) } }],
      });

      const res = await request(app)
        .post("/api/v1/ai/comic-narrative")
        .send({ scenario: "Failed a test", studentProfile: {} });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      // The comic endpoint returns the panels array directly under res.body.comic
      expect(Array.isArray(res.body.comic)).toBe(true);
      expect(res.body.comic.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/v1/ai/chat", () => {
    it("should return 200 and a chat response", async () => {
      const fakeReply = "Here are some tips to improve your grades!";

      createSpy.mockResolvedValue({
        choices: [{ message: { content: fakeReply } }],
      });

      const res = await request(app)
        .post("/api/v1/ai/chat")
        .send({ message: "How can I improve?" });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.response).toBe("string");
    });

    it("should return 400 if message is missing", async () => {
      const res = await request(app)
        .post("/api/v1/ai/chat")
        .send({});

      expect(res.statusCode).toEqual(400);
    });
  });
});

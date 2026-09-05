import request from "supertest";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import Student from "../src/models/student.model.js";
import User from "../src/models/user.model.js";

// Mock the models
jest.unstable_mockModule("../src/models/student.model.js", () => ({
  default: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  }
}));

jest.unstable_mockModule("../src/models/user.model.js", () => ({
  default: {
    findById: jest.fn(),
  }
}));

// We need to import dynamically after mocking
const { default: mockStudentModel } = await import("../src/models/student.model.js");
const { default: mockUserModel } = await import("../src/models/user.model.js");

const mockUserId = "user123";
const mockStudentId = "student123";
const validToken = jwt.sign(
  { id: mockUserId },
  process.env.JWT_SECRET || "default_secret_key_change_me",
);

const mockUser = {
  _id: mockUserId,
  name: "Test Student",
  email: "test@student.com",
  role: "student",
};

const mockStudent = {
  _id: mockStudentId,
  user: mockUserId,
  grade: "10",
  attendance: 85,
  subjects: [
    { name: "Math", internalMarks: 80, externalMarks: 90, predictedScore: 85 }
  ],
  save: jest.fn().mockResolvedValue(true)
};

describe("Student API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/students/:id", () => {
    it("should fetch student profile successfully", async () => {
      mockStudentModel.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockStudent),
      });

      const res = await request(app).get(`/api/v1/students/${mockUserId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.student).toHaveProperty("grade", "10");
    });

    it("should return 404 if student not found", async () => {
      mockStudentModel.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      const res = await request(app).get("/api/v1/students/nonexistent");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("GET /api/v1/students/:id/progress", () => {
    it("should fetch student progress", async () => {
      mockStudentModel.findOne.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockStudent),
      });

      const res = await request(app).get(`/api/v1/students/${mockUserId}/progress`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.progress).toHaveProperty("hasSubjectData", true);
    });
  });

  describe("PUT /api/v1/students/:id/subjects", () => {
    it("should update subjects successfully (authenticated)", async () => {
      mockUserModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });
      
      const newSubjects = [{ name: "Science", internalMarks: 90, externalMarks: 95 }];
      mockStudentModel.findOneAndUpdate.mockResolvedValue({ ...mockStudent, subjects: newSubjects });

      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/subjects`)
        .set("Authorization", `Bearer ${validToken}`)
        .send({ subjects: newSubjects });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.subjects[0]).toHaveProperty("name", "Science");
    });

    it("should reject invalid marks", async () => {
      mockUserModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/subjects`)
        .set("Authorization", `Bearer ${validToken}`)
        .send({ subjects: [{ name: "Math", internalMarks: 150, externalMarks: 50 }] });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain("must be between 0 and 100");
    });
  });

  describe("PUT /api/v1/students/:id/reset", () => {
    it("should reset student progress metrics to default values", async () => {
      mockUserModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });
      
      const resetStudent = { ...mockStudent, attendance: 100, xp: 0, subjects: [] };
      mockStudentModel.findOneAndUpdate.mockResolvedValue(resetStudent);

      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/reset`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.student).toHaveProperty("attendance", 100);
      expect(res.body.student).toHaveProperty("xp", 0);
      expect(res.body.student.subjects).toHaveLength(0);
    });
  });
});

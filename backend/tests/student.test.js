
import request from "supertest";
import { jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import app from "../src/app.js";
import Student from "../src/models/student.model.js";
import User from "../src/models/user.model.js";

// Valid 24-char hex ObjectIds required by Mongoose ObjectId casting
const mockUserId = "aaaaaaaaaaaaaaaaaaaaaaaa";
const mockStudentId = "bbbbbbbbbbbbbbbbbbbbbbbb";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
const validToken = jwt.sign({ id: mockUserId }, JWT_SECRET);

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
    { name: "Math", internalMarks: 80, externalMarks: 90, predictedScore: 85 },
  ],
};

// Patch methods directly on the Mongoose model objects
let findOneSpy;
let findOneAndUpdateSpy;
let userFindByIdSpy;

beforeEach(() => {
  // Patch Student.findOne
  findOneSpy = jest
    .spyOn(Student, "findOne")
    .mockReturnValue({ populate: jest.fn().mockResolvedValue(mockStudent) });

  // Patch Student.findOneAndUpdate
  findOneAndUpdateSpy = jest
    .spyOn(Student, "findOneAndUpdate")
    .mockResolvedValue(mockStudent);

  // Patch User.findById for the auth middleware
  userFindByIdSpy = jest
    .spyOn(User, "findById")
    .mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Student API", () => {
  describe("GET /api/v1/students/:id", () => {
    it("should fetch student profile successfully", async () => {
      const res = await request(app).get(`/api/v1/students/${mockUserId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.student).toHaveProperty("grade", "10");
    });

    it("should return 404 if student not found", async () => {
      // Override to return null to simulate missing student
      findOneSpy.mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

      // Use a valid ObjectId that is simply not found
      const res = await request(app).get(`/api/v1/students/cccccccccccccccccccccccc`);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("GET /api/v1/students/:id/progress", () => {
    it("should fetch student progress", async () => {
      const res = await request(app).get(
        `/api/v1/students/${mockUserId}/progress`,
      );

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.progress).toHaveProperty("hasSubjectData", true);
    });
  });

  describe("PUT /api/v1/students/:id/subjects", () => {
    it("should update subjects successfully (authenticated)", async () => {
      const newSubjects = [
        { name: "Science", internalMarks: 90, externalMarks: 95 },
      ];
      findOneAndUpdateSpy.mockResolvedValue({
        ...mockStudent,
        subjects: newSubjects,
      });

      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/subjects`)
        .set("Authorization", `Bearer ${validToken}`)
        .send({ subjects: newSubjects });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.subjects[0]).toHaveProperty("name", "Science");
    });

    it("should reject marks over 100 (no auth needed to validate)", async () => {
      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/subjects`)
        .set("Authorization", `Bearer ${validToken}`)
        .send({
          subjects: [{ name: "Math", internalMarks: 150, externalMarks: 50 }],
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toContain("must be between 0 and 100");
    });

    it("should return 401 if no token provided", async () => {
      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/subjects`)
        .send({ subjects: [] });

      expect(res.statusCode).toEqual(401);
    });
  });

  describe("PUT /api/v1/students/:id/reset", () => {
    it("should reset student progress metrics to default values", async () => {
      const resetStudent = {
        ...mockStudent,
        attendance: 100,
        xp: 0,
        subjects: [],
        badges: [],
      };
      findOneAndUpdateSpy.mockResolvedValue(resetStudent);

      const res = await request(app)
        .put(`/api/v1/students/${mockUserId}/reset`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.student).toHaveProperty("attendance", 100);
      expect(res.body.student).toHaveProperty("xp", 0);
      expect(res.body.student.subjects).toHaveLength(0);
    });

    it("should return 401 if no token provided", async () => {
      const res = await request(app).put(
        `/api/v1/students/${mockUserId}/reset`,
      );
      expect(res.statusCode).toEqual(401);
    });
  });
});

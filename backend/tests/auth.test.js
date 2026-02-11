import request from "supertest";
import app from "../src/app.js";

describe("Auth Middleware", () => {
  it("should return 401 if no token provided", async () => {
    const res = await request(app).get("/api/students/123/subjects");
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 401 if token is invalid", async () => {
    const res = await request(app)
      .get("/api/students/123/subjects")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("error");
  });
});

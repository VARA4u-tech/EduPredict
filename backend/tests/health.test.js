import request from "supertest";
import app from "../src/app.js";

describe("Health Check API", () => {
  it("should return 200 OK and status message", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty(
      "message",
      "Student Success Comic API is running",
    );
    expect(res.body).toHaveProperty("timestamp");
  });
});

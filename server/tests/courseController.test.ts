import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/db";
import { generateToken } from "../utils/jwt";

beforeEach(async () => {
  const userRepository = AppDataSource.getRepository("User");
  const courseRepository = AppDataSource.getRepository("Course");

  const instructor = await userRepository.save({
    id: 1,
    email: "instructor@example.com",
    password: "hashed-password",
    firstName: "Instructor",
    lastName: "User",
    role: "instructor",
  });

  await courseRepository.save({
    title: "Course 1",
    description: "Description 1",
    instructor,
    isPublished: true,
  });
});

describe("Course Controller", () => {
  const validToken = generateToken({ id: 1, role: "instructor" }); // Valid instructor token

  it("should fetch all courses", async () => {
    const response = await request(app).get("/api/courses");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should create a new course", async () => {
    const response = await request(app)
      .post("/api/courses")
      .send({ title: "New Course", description: "A sample course", isPublished: true })
      .set("Authorization", `Bearer ${validToken}`); // Use valid token
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Course created successfully");
  });
});

import request from "supertest";
import app from "../app";
import { AppDataSource } from "../config/db";

beforeEach(async () => {
  const userRepository = AppDataSource.getRepository("User");

  await userRepository.save({
    email: "admin@example.com",
    password: "password123", // Pre-hashed password
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  });
});

describe("Auth Controller", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "newuser@example.com",
      password: "password123",
      firstName: "New",
      lastName: "User",
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "password123", // Correct password
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

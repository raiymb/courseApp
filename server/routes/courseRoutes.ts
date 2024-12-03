import express from "express";
import { getCourses, getCourse, createNewCourse } from "../controllers/courseController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { createCourseSchema } from "../utils/validators/courseValidator";

const router = express.Router();

// Get all courses (public)
router.get("/", getCourses);

// Get a specific course by ID (public)
router.get("/:id", getCourse);

// Create a new course (requires authentication)
router.post("/", authMiddleware, validationMiddleware(createCourseSchema), createNewCourse);

export default router;

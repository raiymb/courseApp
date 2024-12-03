import express from "express";
import { getAllUsers, getAllCoursesAdmin } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = express.Router();

// Get all users (admin only)
router.get("/users", authMiddleware, roleMiddleware(["admin"]), getAllUsers);

// Get all courses (admin only)
router.get("/courses", authMiddleware, roleMiddleware(["admin"]), getAllCoursesAdmin);

export default router;

import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { updateUserSchema } from "../utils/validators/userValidator";

const router = express.Router();

// Get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, validationMiddleware(updateUserSchema), updateUserProfile);

export default router;

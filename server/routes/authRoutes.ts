import express from "express";
import { register, login } from "../controllers/authController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { registerSchema, loginSchema } from "../utils/validators/authValidator";

const router = express.Router();

// Register a new user
router.post("/register", validationMiddleware(registerSchema), register);

// Login
router.post("/login", validationMiddleware(loginSchema), login);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});

export default router;

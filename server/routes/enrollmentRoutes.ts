import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollmentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const enrollmentRouter = Router();

enrollmentRouter.post("/enrollments", authMiddleware, EnrollmentController.enrollUser);
enrollmentRouter.get("/enrollments/user/:userId", authMiddleware, EnrollmentController.getEnrollmentsByUserId);

export default enrollmentRouter;
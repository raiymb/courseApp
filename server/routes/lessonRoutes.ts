import { Router } from "express";
import { LessonController } from "../controllers/lessonController";
import { authMiddleware } from "../middlewares/authMiddleware";

const lessonRouter = Router();

lessonRouter.get("/lessons/module/:moduleId", authMiddleware, LessonController.getLessonsByModule);
lessonRouter.post("/lessons/complete", authMiddleware, LessonController.completeLesson);

export default lessonRouter;
import { Router } from "express";
import { QuizController } from "../controllers/QuizController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const quizRouter = Router();

quizRouter.get("/quizzes/course/:courseId", authMiddleware, QuizController.getQuizzesByCourse);
quizRouter.get("/quizzes/:id", authMiddleware, QuizController.getQuizById);
quizRouter.post("/quizzes", authMiddleware, roleMiddleware(["instructor", "admin"]), QuizController.createQuiz);
quizRouter.put("/quizzes/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), QuizController.updateQuiz);
quizRouter.delete("/quizzes/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), QuizController.deleteQuiz);
quizRouter.post("/quizzes/submit", authMiddleware, QuizController.submitQuiz);

export default quizRouter;
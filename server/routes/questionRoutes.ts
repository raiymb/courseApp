import { Router } from "express";
import { QuestionController } from "../controllers/QuestionController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const questionRouter = Router();

questionRouter.get("/questions/quiz/:quizId", authMiddleware, QuestionController.getQuestionsByQuiz);
questionRouter.post("/questions", authMiddleware, roleMiddleware(["instructor", "admin"]), QuestionController.createQuestion);
questionRouter.put("/questions/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), QuestionController.updateQuestion);
questionRouter.delete("/questions/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), QuestionController.deleteQuestion);

export default questionRouter;
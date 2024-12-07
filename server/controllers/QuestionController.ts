import { Request, Response } from "express";
import { QuestionService } from "../services/questionService";

export class QuestionController {
  static async getQuestionsByQuiz(req: Request, res: Response): Promise<void> {
    try {
      const quizId = parseInt(req.params.quizId);
      const questions = await QuestionService.getQuestionsByQuiz(quizId);
      res.status(200).json(questions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error fetching questions", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async createQuestion(req: Request, res: Response): Promise<void> {
    try {
      const questionData = req.body;
      const question = await QuestionService.createQuestion(questionData);
      res.status(201).json(question);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error creating question", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async updateQuestion(req: Request, res: Response): Promise<void> {
    try {
      const questionId = parseInt(req.params.id);
      const updateData = req.body;
      const updatedQuestion = await QuestionService.updateQuestion(questionId, updateData);
      if (updatedQuestion) {
        res.status(200).json(updatedQuestion);
      } else {
        res.status(404).json({ message: "Question not found" });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error updating question", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async deleteQuestion(req: Request, res: Response): Promise<void> {
    try {
      const questionId = parseInt(req.params.id);
      await QuestionService.deleteQuestion(questionId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error deleting question", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }
}

import { Request, Response } from "express";
import { QuizService } from "../services/QuizService";

export class QuizController {
    static async getQuizzesByCourse(req: Request, res: Response): Promise<void> {
      try {
        const courseId = parseInt(req.params.courseId);
        const quizzes = await QuizService.getQuizzesByCourse(courseId);
        res.status(200).json(quizzes);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error fetching quizzes", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    static async getQuizById(req: Request, res: Response): Promise<void> {
      try {
        const quizId = parseInt(req.params.id);
        const quiz = await QuizService.getQuizById(quizId);
        if (quiz) {
          res.status(200).json(quiz);
        } else {
          res.status(404).json({ message: "Quiz not found" });
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error fetching quiz", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    static async createQuiz(req: Request, res: Response): Promise<void> {
      try {
        const quizData = req.body;
        const quiz = await QuizService.createQuiz(quizData);
        res.status(201).json(quiz);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error creating quiz", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    static async updateQuiz(req: Request, res: Response): Promise<void> {
      try {
        const quizId = parseInt(req.params.id);
        const updateData = req.body;
        const updatedQuiz = await QuizService.updateQuiz(quizId, updateData);
        if (updatedQuiz) {
          res.status(200).json(updatedQuiz);
        } else {
          res.status(404).json({ message: "Quiz not found" });
        }
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error updating quiz", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    static async deleteQuiz(req: Request, res: Response): Promise<void> {
      try {
        const quizId = parseInt(req.params.id);
        await QuizService.deleteQuiz(quizId);
        res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error deleting quiz", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  
    static async submitQuiz(req: Request, res: Response): Promise<void> {
      try {
        const quizSubmissionData = req.body;
        const quizSubmission = await QuizService.submitQuiz(quizSubmissionData);
        res.status(201).json(quizSubmission);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error submitting quiz", error: error.message });
        } else {
          res.status(500).json({ message: "Unknown error occurred" });
        }
      }
    }
  }
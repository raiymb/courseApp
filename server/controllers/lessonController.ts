import { LessonService } from "../services/lessonService";
import { Request, Response } from "express";
export class LessonController {
    static async getLessonsByModule(req: Request, res: Response): Promise<void> {
      try {
        const moduleId = parseInt(req.params.moduleId);
        const lessons = await LessonService.getLessonsByModule(moduleId);
        res.status(200).json(lessons);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "Error fetching lessons", error: errorMessage });
      }
    }
  
    static async completeLesson(req: Request, res: Response): Promise<void> {
      try {
        const { lessonId, userId } = req.body;
        await LessonService.completeLesson(lessonId, userId);
        res.status(200).json({ message: "Lesson completed successfully" });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          res.status(500).json({ message: "Error completing lesson", error: errorMessage });
        }
      }
    }
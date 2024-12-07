import { Request, Response } from "express";
import { EnrollmentService } from "../services/enrollmentService";

export class EnrollmentController {
    static async enrollUser(req: Request, res: Response): Promise<void> {
      try {
        const { courseId, userId } = req.body;
        const enrollment = await EnrollmentService.enrollUser(courseId, userId);
        res.status(201).json(enrollment);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error enrolling user", error: error.message });
        } else {
          res.status(500).json({ message: "Error enrolling user", error: String(error) });
        }
      }
    }
  
    static async getEnrollmentsByUserId(req: Request, res: Response): Promise<void> {
      try {
        const userId = parseInt(req.params.userId);
        const enrollments = await EnrollmentService.getEnrollmentsByUserId(userId);
        res.status(200).json(enrollments);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: "Error fetching enrollments", error: error.message });
        } else {
          res.status(500).json({ message: "Error fetching enrollments", error: String(error) });
        }
      }
    }
  }
import { Request, Response } from "express";
import { CourseService } from "../services/courseService";

export class CourseController {
  static async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error fetching courses", error: errorMessage });
    }
  }

  static async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const courseId = parseInt(req.params.id);
      const course = await CourseService.getCourseById(courseId);
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error fetching course", error: errorMessage });
    }
  }

  static async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseData = req.body;
      const course = await CourseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error creating course", error: errorMessage });
    }
  }

  static async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseId = parseInt(req.params.id);
      const updateData = req.body;
      const updatedCourse = await CourseService.updateCourse(courseId, updateData);
      if (updatedCourse) {
        res.status(200).json(updatedCourse);
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error updating course", error: errorMessage });
    }
  }

  static async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const courseId = parseInt(req.params.id);
      await CourseService.deleteCourse(courseId);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error deleting course", error: errorMessage });
    }
  }
}
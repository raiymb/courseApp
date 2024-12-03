import { Response } from "express";
import { IRequest } from "../interfaces/IRequest"; // Use custom IRequest type
import { createCourse, getAllCourses, getCourseById } from "../services/courseService";

export const getCourses = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const getCourse = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
      res.status(400).json({ message: "Invalid course ID" });
      return;
    }

    const course = await getCourseById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const createNewCourse = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const instructorId = req.user?.id; // Validate user is present
    if (!instructorId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const { title, description, isPublished } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const course = await createCourse({ title, description, isPublished }, instructorId);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};

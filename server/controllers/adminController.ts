import { Request, Response } from "express";
import { getAllCourses } from "../services/courseService";
import { getUserById } from "../services/userService";
import { IRequest } from "../interfaces/IRequest";

export const getAllUsers = async (req: IRequest, res: Response): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const users = await getUserById(req.user.id); // Simulated logic for fetching users
    res.status(200).json(users); // Send response
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};


export const getAllCoursesAdmin = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const courses = await getAllCourses(); // Simulated logic for fetching courses
    res.status(200).json(courses); // Send response
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

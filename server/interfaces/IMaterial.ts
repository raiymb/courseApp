import { Course } from "../models/Course";

export interface IMaterial {
  id: number;
  title: string;
  content: string;
  type: "video" | "document" | "quiz";
  course: Course;
  createdAt: Date;
  updatedAt: Date;
}
import { User } from "../models/User";
import { Course } from "../models/Course";

export interface IEnrollment {
  id: number;
  user: User;
  course: Course;
  progress: number;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
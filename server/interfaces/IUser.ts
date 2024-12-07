import { Enrollment } from "../models/Enrollment";
import { QuizSubmission } from "../models/QuizSubmission";
import { LessonProgress } from "../models/LessonProgress";
import { Course } from "../models/Course";
import { Payment } from "../models/Payment";

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor" | "admin";
  isActive: boolean;
  courses: Course[];
  enrollments: Enrollment[];
  payments: Payment[];
  quizSubmissions: QuizSubmission[];
  lessonProgress: LessonProgress[];
  createdAt: Date;
  updatedAt: Date;
}

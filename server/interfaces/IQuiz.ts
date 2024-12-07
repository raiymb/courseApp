import { QuizQuestion } from "../models/QuizQuestion";
import { QuizSubmission } from "../models/QuizSubmission";
import { Course } from "../models/Course";

export interface IQuiz {
    id: number;
    title: string;
    description: string;
    course: Course;
    questions: QuizQuestion[];
    submissions: QuizSubmission[];
    createdAt: Date;
    updatedAt: Date;
  }
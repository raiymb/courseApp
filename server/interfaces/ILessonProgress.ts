import { User } from "../models/User";
import { Lesson } from "../models/Lesson";

export interface ILessonProgress {
    id: number;
    user: User;
    lesson: Lesson;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
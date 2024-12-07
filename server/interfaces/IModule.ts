import { Lesson } from "../models/Lesson";
import { Course } from "../models/Course";

export interface IModule {
    id: number;
    title: string;
    order: number;
    course: Course;
    lessons: Lesson[];
    createdAt: Date;
    updatedAt: Date;
    calculateProgress(userId: number): number;
  }
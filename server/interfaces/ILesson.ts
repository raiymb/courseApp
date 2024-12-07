import { Module } from "../models/Module";
import { LessonProgress } from "../models/LessonProgress";

export interface ILesson {
    id: number;
    title: string;
    content: string;
    order: number;
    isUnlocked: boolean;
    module: Module;
    progress: LessonProgress[];
    type: "video" | "text" | "quiz";
    isPractical: boolean;
    createdAt: Date;
    updatedAt: Date;
    isCompletedByUser(userId: number): boolean;
    unlock(userId: number): void;
  }
  
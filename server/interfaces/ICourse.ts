import { User } from "../models/User";
import { Material } from "../models/Material";
import { Enrollment } from "../models/Enrollment";
import { Module } from "../models/Module";
import { Quiz } from "../models/Quiz";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  mainPhoto: string;
  price: number;
  durationHours: number;
  additionalInfo?: string;
  isPublished: boolean;
  categories: string[];
  tags: string[];
  instructor: User;
  materials: Material[];
  enrollments: Enrollment[];
  modules: Module[];
  quizzes: Quiz[];
  createdAt: Date;
  updatedAt: Date;
  calculateProgress(userId: number): number;
}
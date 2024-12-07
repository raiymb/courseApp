import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Material } from "../models/Material";
import { Enrollment } from "../models/Enrollment";
import { Payment } from "../models/Payment";
import { Quiz } from "../models/Quiz";
import { QuizQuestion } from "../models/QuizQuestion";
import { QuizSubmission } from "../models/QuizSubmission";
import { LessonProgress } from "../models/LessonProgress";
import { Lesson } from "../models/Lesson";
import { Module } from "../models/Module"; 


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "raimbek99",
  database: process.env.DB_NAME || "buchgalter",
  synchronize: process.env.NODE_ENV === "development", 
  logging: process.env.NODE_ENV === "development",
  entities: [
    User,
    Course,
    Lesson,
    Material,
    Enrollment,
    Payment,
    Quiz,
    QuizQuestion,
    QuizSubmission,
    LessonProgress,
    Module 
  ],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, 
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
  }
};

import { Quiz } from "../models/Quiz";

export interface IQuizQuestion {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
    quiz: Quiz;
    createdAt: Date;
    updatedAt: Date;
  }
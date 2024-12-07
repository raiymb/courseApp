import { User } from "../models/User";
import { Quiz } from "../models/Quiz";

export interface IQuizSubmission {
    id: number;
    quiz: Quiz;
    user: User;
    answers: { questionId: number; answer: string }[];
    score: number;
    createdAt: Date;
    updatedAt: Date;
    calculateScore(): number;
  }
  
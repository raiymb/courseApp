import { AppDataSource } from "../config/db";
import { IQuiz } from "../interfaces/IQuiz";
import { Quiz } from "../models/Quiz";
import { IQuizSubmission } from "../interfaces/IQuizSubmission";
import { QuizSubmission } from "../models/QuizSubmission";

export class QuizService {
  static async getQuizzesByCourse(courseId: number): Promise<IQuiz[]> {
    const quizRepository = AppDataSource.getRepository(Quiz);
    return await quizRepository.find({ where: { course: { id: courseId } }, relations: ["questions"] });
  }

  static async getQuizById(quizId: number): Promise<IQuiz | null> {
    const quizRepository = AppDataSource.getRepository(Quiz);
    return await quizRepository.findOne({ where: { id: quizId }, relations: ["questions"] });
  }

  static async createQuiz(quizData: Partial<IQuiz>): Promise<IQuiz> {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quiz = quizRepository.create(quizData);
    return await quizRepository.save(quiz);
  }

  static async updateQuiz(quizId: number, updateData: Partial<IQuiz>): Promise<IQuiz | null> {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quiz = await quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) return null;

    Object.assign(quiz, updateData);
    return await quizRepository.save(quiz);
  }

  static async deleteQuiz(quizId: number): Promise<void> {
    const quizRepository = AppDataSource.getRepository(Quiz);
    await quizRepository.delete(quizId);
  }

  static async submitQuiz(quizSubmissionData: Partial<IQuizSubmission>): Promise<IQuizSubmission> {
    const quizSubmissionRepository = AppDataSource.getRepository(QuizSubmission);
    const quizSubmission = quizSubmissionRepository.create(quizSubmissionData);

    const quizRepository = AppDataSource.getRepository(Quiz);
    const quiz = await quizRepository.findOne({ where: { id: quizSubmission.quiz.id }, relations: ["questions"] });
    if (!quiz) throw new Error("Quiz not found");

    let score = 0;
    quizSubmission.answers.forEach(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        score += 1;
      }
    });

    quizSubmission.score = (score / quiz.questions.length) * 100;
    return await quizSubmissionRepository.save(quizSubmission);
  }
}

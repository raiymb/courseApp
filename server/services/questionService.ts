import { AppDataSource } from "../config/db";
import { QuizQuestion } from "../models/QuizQuestion";
import { IQuizQuestion } from "../interfaces/IQuizQuestion";

export class QuestionService {
  static async getQuestionsByQuiz(quizId: number): Promise<IQuizQuestion[]> {
    const questionRepository = AppDataSource.getRepository(QuizQuestion);
    return await questionRepository.find({ where: { quiz: { id: quizId } } });
  }

  static async createQuestion(questionData: Partial<IQuizQuestion>): Promise<IQuizQuestion> {
    const questionRepository = AppDataSource.getRepository(QuizQuestion);
    const question = questionRepository.create(questionData);
    return await questionRepository.save(question);
  }

  static async updateQuestion(questionId: number, updateData: Partial<IQuizQuestion>): Promise<IQuizQuestion | null> {
    const questionRepository = AppDataSource.getRepository(QuizQuestion);
    const question = await questionRepository.findOne({ where: { id: questionId } });
    if (!question) return null;

    Object.assign(question, updateData);
    return await questionRepository.save(question);
  }

  static async deleteQuestion(questionId: number): Promise<void> {
    const questionRepository = AppDataSource.getRepository(QuizQuestion);
    await questionRepository.delete(questionId);
  }
}

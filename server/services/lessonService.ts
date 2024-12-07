import {Lesson} from "../models/Lesson";
import {ILesson} from "../interfaces/ILesson";
import {AppDataSource} from "../config/db";
import {LessonProgress} from "../models/LessonProgress";
import {User} from "../models/User";

export class LessonService {
    static async getLessonsByModule(moduleId: number): Promise<ILesson[]> {
      const lessonRepository = AppDataSource.getRepository(Lesson);
      return await lessonRepository.find({ where: { module: { id: moduleId } }, order: { order: "ASC" } });
    }
  
    static async completeLesson(lessonId: number, userId: number): Promise<void> {
      const lessonRepository = AppDataSource.getRepository(Lesson);
      const lesson = await lessonRepository.findOne({ where: { id: lessonId } });
      if (!lesson) return;
  
      const lessonProgressRepository = AppDataSource.getRepository(LessonProgress);
      const lessonProgress = lessonProgressRepository.create({ lesson, user: { id: userId } as User, isCompleted: true });
      await lessonProgressRepository.save(lessonProgress);
    }
  }
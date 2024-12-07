import { Course } from "../models/Course";
import { ICourse } from "../interfaces/ICourse";
import {AppDataSource} from "../config/db";

export class CourseService {
  static async getAllCourses(): Promise<ICourse[]> {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository.find({ relations: ["instructor", "lessons"] });
  }

  static async getCourseById(courseId: number): Promise<ICourse | null> {
    const courseRepository = AppDataSource.getRepository(Course);
    return await courseRepository.findOne({ where: { id: courseId }, relations: ["instructor", "lessons", "materials", "quizzes"] });
  }

  static async createCourse(courseData: Partial<ICourse>): Promise<ICourse> {
    const courseRepository = AppDataSource.getRepository(Course);
    const course = courseRepository.create(courseData);
    return await courseRepository.save(course);
  }

  static async updateCourse(courseId: number, updateData: Partial<ICourse>): Promise<ICourse | null> {
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id: courseId } });
    if (!course) return null;

    Object.assign(course, updateData);
    return await courseRepository.save(course);
  }

  static async deleteCourse(courseId: number): Promise<void> {
    const courseRepository = AppDataSource.getRepository(Course);
    await courseRepository.delete(courseId);
  }
}

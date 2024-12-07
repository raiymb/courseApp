import { AppDataSource } from "../config/db";
import { Enrollment } from "../models/Enrollment";
import { Course } from "../models/Course";
import { User } from "../models/User";
import { IEnrollment } from "../interfaces/IEnrollment";

export class EnrollmentService {
    static async enrollUser(courseId: number, userId: number): Promise<IEnrollment> {
      const enrollmentRepository = AppDataSource.getRepository(Enrollment);
      const enrollment = enrollmentRepository.create({ course: { id: courseId } as Course, user: { id: userId } as User });
      return await enrollmentRepository.save(enrollment);
    }
  
    static async getEnrollmentsByUserId(userId: number): Promise<IEnrollment[]> {
      const enrollmentRepository = AppDataSource.getRepository(Enrollment);
      return await enrollmentRepository.find({ where: { user: { id: userId } }, relations: ["course"] });
    }
  
    static async completeCourse(enrollmentId: number): Promise<IEnrollment | null> {
      const enrollmentRepository = AppDataSource.getRepository(Enrollment);
      const enrollment = await enrollmentRepository.findOne({ where: { id: enrollmentId } });
      if (!enrollment) return null;
  
      enrollment.isCompleted = true;
      return await enrollmentRepository.save(enrollment);
    }
  }
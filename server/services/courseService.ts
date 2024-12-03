import { AppDataSource } from "../config/db";
import { Course } from "../models/Course";
import { User } from "../models/User";
import { ICourse } from "../interfaces/ICourse";

export const createCourse = async (courseData: Partial<ICourse>, instructorId: number): Promise<ICourse> => {
  const courseRepository = AppDataSource.getRepository(Course);
  const userRepository = AppDataSource.getRepository(User);

  const instructor = await userRepository.findOneBy({ id: instructorId });
  if (!instructor || instructor.role !== "instructor") {
    throw new Error("Instructor not found or invalid");
  }

  const newCourse = courseRepository.create({ ...courseData, instructor });
  return courseRepository.save(newCourse);
};

export const getAllCourses = async (): Promise<ICourse[]> => {
  const courseRepository = AppDataSource.getRepository(Course);
  const courses = await courseRepository.find({ relations: ["instructor"] });
  return courses;
};

export const getCourseById = async (id: number): Promise<ICourse | null> => {
  const courseRepository = AppDataSource.getRepository(Course);
  const course = await courseRepository.findOne({ where: { id }, relations: ["instructor"] });
  return course;
};

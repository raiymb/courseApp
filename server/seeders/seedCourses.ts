import { AppDataSource } from "../config/db";
import { Course } from "../models/Course";

const seedCourses = async () => {
  try {
    await AppDataSource.initialize(); // Initialize database connection
    const courseRepository = AppDataSource.getRepository(Course);

    await courseRepository.save([
      { title: "Course 1", description: "Sample course 1", instructorId: 1 },
      { title: "Course 2", description: "Sample course 2", instructorId: 2 },
    ]);

    console.log("Courses seeded successfully");
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await AppDataSource.destroy(); // Ensure connection is closed
  }
};

seedCourses();

import { AppDataSource } from "../config/db";
import { User } from "../models/User";

const seedUsers = async () => {
  try {
    await AppDataSource.initialize(); // Initialize database connection
    const userRepository = AppDataSource.getRepository(User);

    await userRepository.save([
      {
        email: "admin@example.com",
        password: "hashed-password",
        role: "admin",
        firstName: "Admin",
        lastName: "User",
      },
      {
        email: "instructor@example.com",
        password: "hashed-password",
        role: "instructor",
        firstName: "Instructor",
        lastName: "User",
      },
      {
        email: "student@example.com",
        password: "hashed-password",
        role: "student",
        firstName: "Student",
        lastName: "User",
      },
    ]);

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await AppDataSource.destroy(); // Ensure connection is closed
  }
};

seedUsers();

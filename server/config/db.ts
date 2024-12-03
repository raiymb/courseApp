import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Course } from "../models/Course";
import { Material } from "../models/Material";
import { Enrollment } from "../models/Enrollment";
import { Payment } from "../models/Payment";

// Initialize TypeORM DataSource
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: "root",
  password: "raimbek99",
  database: "buchgalter",
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Course, Material, Enrollment, Payment],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit the app if the DB connection fails
  }
};

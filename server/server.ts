import app from "../server/app";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db"; // TypeORM DataSource

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 3000;

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
    process.exit(1); // Exit if database initialization fails
  });

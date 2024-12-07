import express from "express";
import router from "./routes";
import { initializeDatabase } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", router);

// Error Handling Middleware
app.use(errorHandler);

// Initialize Database
initializeDatabase();

export default app;
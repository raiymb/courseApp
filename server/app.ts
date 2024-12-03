import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import adminRoutes from "./routes/adminRoutes";
import materialRoutes from "./routes/materialRoutes";

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-origin requests
app.use(morgan("dev")); // Logging
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/materials", materialRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});

export default app;

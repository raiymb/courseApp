import { Router } from "express";
import { CourseController } from "../controllers/courseController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const courseRouter = Router();

courseRouter.get("/courses", authMiddleware, CourseController.getAllCourses);
courseRouter.get("/courses/:id", authMiddleware, CourseController.getCourseById);
courseRouter.post("/courses", authMiddleware, roleMiddleware(["instructor", "admin"]), CourseController.createCourse);
courseRouter.put("/courses/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), CourseController.updateCourse);
courseRouter.delete("/courses/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), CourseController.deleteCourse);

export default courseRouter;
import { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const adminRouter = Router();

adminRouter.get("/admin/users", authMiddleware, roleMiddleware(["admin"]), AdminController.getAllUsers);
adminRouter.delete("/admin/users/:id", authMiddleware, roleMiddleware(["admin"]), AdminController.deleteUser);

export default adminRouter;
import { Router } from "express";
import { MaterialController } from "../controllers/materialController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const materialRouter = Router();

materialRouter.get("/materials/course/:courseId", authMiddleware, MaterialController.getMaterialsByCourse);
materialRouter.post("/materials", authMiddleware, roleMiddleware(["instructor", "admin"]), MaterialController.createMaterial);
materialRouter.get("/materials/download/:fileName", authMiddleware, MaterialController.downloadMaterial);

export default materialRouter;
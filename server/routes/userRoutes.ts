import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const userRouter = Router();

userRouter.get("/users", authMiddleware, roleMiddleware(["admin"]), UserController.getAllUsers);
userRouter.get("/users/:id", authMiddleware, UserController.getUserById);
userRouter.post("/users", UserController.createUser);
userRouter.put("/users/:id", authMiddleware, UserController.updateUser);
userRouter.delete("/users/:id", authMiddleware, roleMiddleware(["admin"]), UserController.deleteUser);

export default userRouter;
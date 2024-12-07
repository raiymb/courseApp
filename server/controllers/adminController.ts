import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class AdminController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
      } else {
        res.status(500).json({ message: "Unknown error occurred" });
      }
    }
  }
}
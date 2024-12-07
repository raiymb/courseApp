import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
      res.status(500).json({ message: "Error fetching users", error: errorMessage });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
      res.status(500).json({ message: "Error fetching user", error: errorMessage });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
      res.status(500).json({ message: "Error creating user", error: errorMessage });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const updateData = req.body;
      const updatedUser = await UserService.updateUser(userId, updateData);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
      res.status(500).json({ message: "Error updating user", error: errorMessage });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
      res.status(500).json({ message: "Error deleting user", error: errorMessage });
    }
  }
}